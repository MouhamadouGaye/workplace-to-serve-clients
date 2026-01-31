// import express from "express";
// import { z } from "zod";
// import pool from "../db";
// import { User, TypedRequest, UserRequestBody } from "../../src/types";
// import { Request, Response } from "express";

// const router = express.Router();

// const UserSchema = z.object({
//   email: z.string().email(),
//   name: z.string(),
//   role: z.string(),
// });

// // Get all users
// router.get("/", async (_req: Request, res: Response<User[]>) => {
//   try {
//     const result = await pool.query<User>(
//       "SELECT * FROM users ORDER BY name ASC"
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch users" } as any);
//   }
// });

// // Get user by ID
// router.get(
//   "/:id",
//   async (req: Request<{ id: string }>, res: Response<User>) => {
//     try {
//       const id = parseInt(req.params.id);
//       if (isNaN(id)) {
//         return res.status(400).json({ error: "Invalid ID" } as any);
//       }

//       const result = await pool.query<User>(
//         "SELECT * FROM users WHERE id = $1",
//         [id]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "User not found" } as any);
//       }

//       res.json(result.rows[0]);
//     } catch (err) {
//       res.status(500).json({ error: "Failed to fetch user" } as any);
//     }
//   }
// );

// // Create user
// router.post(
//   "/",
//   async (req: TypedRequest<UserRequestBody>, res: Response<User>) => {
//     try {
//       const user = UserSchema.parse(req.body);

//       // Check if email already exists
//       const existingUser = await pool.query(
//         "SELECT id FROM users WHERE email = $1",
//         [user.email]
//       );
//       if (existingUser.rows.length > 0) {
//         return res.status(400).json({ error: "Email already exists" } as any);
//       }

//       const result = await pool.query<User>(
//         `
//       INSERT INTO users (email, name, role)
//       VALUES ($1, $2, $3)
//       RETURNING *
//     `,
//         [user.email, user.name, user.role]
//       );

//       res.status(201).json(result.rows[0]);
//     } catch (err) {
//       res.status(400).json({ error: "Invalid user data" } as any);
//     }
//   }
// );

// // Update user
// router.put(
//   "/:id",
//   async (
//     req: TypedRequest<UserRequestBody> & { params: { id: string } },
//     res: Response<User>
//   ) => {
//     try {
//       const id = parseInt(req.params.id);
//       if (isNaN(id)) {
//         return res.status(400).json({ error: "Invalid ID" } as any);
//       }

//       const user = UserSchema.parse(req.body);

//       // Check if email already exists for other users
//       const existingUser = await pool.query(
//         "SELECT id FROM users WHERE email = $1 AND id != $2",
//         [user.email, id]
//       );
//       if (existingUser.rows.length > 0) {
//         return res.status(400).json({ error: "Email already exists" } as any);
//       }

//       const result = await pool.query<User>(
//         `
//       UPDATE users
//       SET email = $1, name = $2, role = $3
//       WHERE id = $4
//       RETURNING *
//     `,
//         [user.email, user.name, user.role, id]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "User not found" } as any);
//       }

//       res.json(result.rows[0]);
//     } catch (err) {
//       res.status(400).json({ error: "Invalid user data" } as any);
//     }
//   }
// );

// // Delete user
// router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) {
//       return res.status(400).json({ error: "Invalid ID" });
//     }

//     const result = await pool.query<User>(
//       "DELETE FROM users WHERE id = $1 RETURNING *",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete user" });
//   }
// });

// export default router;

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import pool from "../db";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Validation schema for user input
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(["admin", "manager", "user"]),
  manager_id: z.number().optional(),
});

// Register a new user
router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, name, role, manager_id } = UserSchema.parse(
      req.body
    );

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await pool.query(
      `INSERT INTO users (email, name, password, role, manager_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, role, created_at`,
      [email, name, hashedPassword, role, manager_id]
    );
    console.log(newUser);
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
});

// Login a user
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const userData = user.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: userData.id, email: userData.email, role: userData.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
