import express from "express";
import { z } from "zod";
import pool from "../db";

const router = express.Router();

const ContactSchema = z.object({
  customer_id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
  is_primary: z.boolean().default(false),
});

// Get all contacts
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, cu.name as customer_name
      FROM contacts c
      JOIN customers cu ON c.customer_id = cu.id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// Get contacts by customer ID
router.get("/customer/:customerId", async (req, res) => {
  try {
    const customerId = parseInt(req.params.customerId);
    if (isNaN(customerId)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    const result = await pool.query(
      "SELECT * FROM contacts WHERE customer_id = $1 ORDER BY is_primary DESC, created_at DESC",
      [customerId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customer contacts" });
  }
});

// Get contact by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const result = await pool.query("SELECT * FROM contacts WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

// Create contact
router.post("/", async (req, res) => {
  try {
    // const contact = ContactSchema.parse(req.body);
    const contact = req.body;

    // If this is a primary contact, update other contacts to non-primary
    if (contact.is_primary) {
      await pool.query(
        "UPDATE contacts SET is_primary = false WHERE customer_id = $1",
        [contact.customer_id]
      );
    }

    const result = await pool.query(
      `
      INSERT INTO contacts (customer_id, name, email, phone, position, is_primary)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
      [
        contact.customer_id,
        contact.name,
        contact.email,
        contact.phone,
        contact.position,
        contact.is_primary,
      ]
    );
    console.log(result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: "Invalid contact data" });
  }
});

// Update contact
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const contact = ContactSchema.parse(req.body);

    // If updating to primary, update other contacts to non-primary
    if (contact.is_primary) {
      await pool.query(
        "UPDATE contacts SET is_primary = false WHERE customer_id = $1 AND id != $2",
        [contact.customer_id, id]
      );
    }

    const result = await pool.query(
      `
      UPDATE contacts 
      SET customer_id = $1, name = $2, email = $3, phone = $4, position = $5, is_primary = $6
      WHERE id = $7
      RETURNING *
    `,
      [
        contact.customer_id,
        contact.name,
        contact.email,
        contact.phone,
        contact.position,
        contact.is_primary,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: "Invalid contact data" });
  }
});

// Delete contact
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const result = await pool.query(
      "DELETE FROM contacts WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

export default router;
