import express from "express";
import { z } from "zod";
import pool from "../db";

const router = express.Router();

// const CustomerSchema = z.object({
//   name: z.string(),
//   email: z.string().email().optional(),
//   phone: z.string().optional(),
//   company: z.string().optional(),
//   status: z.string(),
//   assigned_to: z.string().uuid().optional(),
// });

const CustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  company: z.string(),
  status: z.string(),
  // assigned_to: z.string().optional(), // or z.nullable() if it can be null
  assigned_to: z.string().nullable(), // Accepts null
});

// Get all customers
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, u.name as assigned_to_name 
      FROM customers c 
      LEFT JOIN users u ON c.assigned_to = u.id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// Get customer by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});

// Endpoint to add a new customer
router.post("/", async (req, res) => {
  const { name, email, phone, company, status, assigned_to } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO customers (name, email, phone, company, status, assigned_to) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, email, phone, company, status, assigned_to, created_at`,
      [name, email, phone, company, status, assigned_to]
    );
    console.log(result.rows);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding customer:", err);
    res
      .status(500)
      .json({ error: "Failed to add customer. Please try again." });
  }
});

// // Update customer
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const customer = CustomerSchema.parse(req.body);

//     const result = await pool.query(
//       `
//       UPDATE customers
//       SET name = $1, email = $2, phone = $3, company = $4, status = $5, assigned_to = $6
//       WHERE id = $7
//       RETURNING *
//     `,
//       [
//         customer.name,
//         customer.email,
//         customer.phone,
//         customer.company,
//         customer.status,
//         customer.assigned_to,
//         id,
//       ]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Customer not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("Error updating customer:", err.message);
//     res.status(400).json({ error: "Invalid customer data" });
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = CustomerSchema.parse(req.body);

    const result = await pool.query(
      `
      UPDATE customers 
      SET name = $1, email = $2, phone = $3, company = $4, status = $5, assigned_to = $6
      WHERE id = $7
      RETURNING *
    `,
      [
        customer.name,
        customer.email,
        customer.phone,
        customer.company,
        customer.status,
        customer.assigned_to,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error updating customer:", err.message);
      res.status(400).json({ error: err.message });
    } else {
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

// Delete customer
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM customers WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
});

export default router;
