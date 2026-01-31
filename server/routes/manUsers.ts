import express from "express";
import pool from "../db"; // Your PostgreSQL connection pool
import { authenticateJWT } from "../middleware/authenticate"; // JWT middleware
import { authorizeRole } from "../middleware/authorizeRole"; // Role-based access middleware

const router = express.Router();
// Fetch all users (admin only)
router.get(
  "/users",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const users = await pool.query(
        "SELECT id, email, name, role, manager_id FROM users"
      );
      res.json(users.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Fetch users under a specific manager
router.get("/users/manager/:managerId", authenticateJWT, async (req, res) => {
  const { managerId } = req.params;
  try {
    const users = await pool.query(
      "SELECT id, email, name, role FROM users WHERE manager_id = $1",
      [managerId]
    );
    res.json(users.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a user (admin only)
router.put(
  "/users/:id",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    const { id } = req.params;
    const { name, role, manager_id } = req.body;

    try {
      const updatedUser = await pool.query(
        "UPDATE users SET name = $1, role = $2, manager_id = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, email, name, role",
        [name, role, manager_id, id]
      );

      res.json(updatedUser.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

const router = express.Router();
