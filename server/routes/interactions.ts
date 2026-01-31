// import express from "express";
// import { z } from "zod";
// import pool from "../db";

// const router = express.Router();

// const InteractionSchema = z.object({
//   customer_id: z.number().int().positive(),
//   user_id: z.number().int().positive(),
//   type: z.string(),
//   notes: z.string().optional(),
// });

// // Get all interactions
// router.get("/", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT i.*,
//              c.name as customer_name,
//              u.name as user_name
//       FROM interactions i
//       JOIN customers c ON i.customer_id = c.id
//       JOIN users u ON i.user_id = u.id
//       ORDER BY i.created_at DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch interactions" });
//   }
// });

// // Get interactions by customer ID
// router.get("/customer/:customerId", async (req, res) => {
//   try {
//     const customerId = parseInt(req.params.customerId);
//     if (isNaN(customerId)) {
//       return res.status(400).json({ error: "Invalid customer ID" });
//     }

//     const result = await pool.query(
//       `
//       SELECT i.*, u.name as user_name
//       FROM interactions i
//       JOIN users u ON i.user_id = u.id
//       WHERE i.customer_id = $1
//       ORDER BY i.created_at DESC
//     `,
//       [customerId]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch customer interactions" });
//   }
// });

// // Get interaction by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) {
//       return res.status(400).json({ error: "Invalid ID" });
//     }

//     const result = await pool.query(
//       `
//       SELECT i.*,
//              c.name as customer_name,
//              u.name as user_name
//       FROM interactions i
//       JOIN customers c ON i.customer_id = c.id
//       JOIN users u ON i.user_id = u.id
//       WHERE i.id = $1
//     `,
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Interaction not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch interaction" });
//   }
// });

// // Create interaction
// router.post("/", async (req, res) => {
//   try {
//     const interaction = InteractionSchema.parse(req.body);
//     const result = await pool.query(
//       `
//       INSERT INTO interactions (customer_id, user_id, type, notes)
//       VALUES ($1, $2, $3, $4)
//       RETURNING *
//     `,
//       [
//         interaction.customer_id,
//         interaction.user_id,
//         interaction.type,
//         interaction.notes,
//       ]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(400).json({ error: "Invalid interaction data" });
//   }
// });

// // Update interaction
// router.put("/:id", async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) {
//       return res.status(400).json({ error: "Invalid ID" });
//     }

//     const interaction = InteractionSchema.parse(req.body);

//     const result = await pool.query(
//       `
//       UPDATE interactions
//       SET customer_id = $1, user_id = $2, type = $3, notes = $4
//       WHERE id = $5
//       RETURNING *
//     `,
//       [
//         interaction.customer_id,
//         interaction.user_id,
//         interaction.type,
//         interaction.notes,
//         id,
//       ]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Interaction not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(400).json({ error: "Invalid interaction data" });
//   }
// });

// // Delete interaction
// router.delete("/:id", async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) {
//       return res.status(400).json({ error: "Invalid ID" });
//     }

//     const result = await pool.query(
//       "DELETE FROM interactions WHERE id = $1 RETURNING *",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Interaction not found" });
//     }

//     res.json({ message: "Interaction deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete interaction" });
//   }
// });

import express from "express";
import { z } from "zod";
import pool from "../db";
const router = express.Router();

// Zod schema for validation
const InteractionSchema = z.object({
  customer_id: z.number().int(),
  user_id: z.number().int(),
  type: z.string().min(1, "Type is required"),
  notes: z.string().optional(),
  ceated_at: z.string().optional(),
});

// Middleware to validate request body
const validateInteraction = (req: any, res: any, next: any) => {
  try {
    req.body = InteractionSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: "Unexpected server error" });
  }
};

// Get all interactions for a specific customer
router.get("/interactions/customer/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const interactions = await pool.query(
      "SELECT * FROM interactions WHERE customer_id = $1 ORDER BY created_at DESC",
      [customerId]
    );
    // console.log(interactions.rows);
    res.json(interactions.rows);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({ err: "Server error" });
    }
  }
});

// Create a new interaction
// router.post("/interactions", validateInteraction, async (req, res) => {
//   try {
//     const { customer_id, user_id, type, notes } = req.body;
//     const newInteraction = await pool.query(
//       "INSERT INTO interactions (customer_id, user_id, type, notes) VALUES ($1, $2, $3, $4) RETURNING *",
//       [customer_id, user_id, type, notes]
//     );
//     res.status(201).json(newInteraction.rows[0]);
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error(err.message);
//       res.status(500).json({ err: "Server error" });
//     }
//   }
// });

// router.post("/interactions", validateInteraction, async (req, res) => {
//   try {
//     const { customer_id, user_id, type, notes } = req.body;

//     console.log("Processing new interaction:", {
//       customer_id,
//       user_id,
//       type,
//       notes,
//     });

//     const newInteraction = await pool.query(
//       "INSERT INTO interactions (customer_id, user_id, type, notes) VALUES ($1, $2, $3, $4) RETURNING *",
//       [customer_id, user_id, type, notes]
//     );

//     console.log("New Interaction Created:", newInteraction.rows[0]);

//     res.status(201).json(newInteraction.rows[0]);
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error("Error details:", err.message);
//       res.status(500).json({ err: "Server error", details: err.message });
//     }
//   }
// });

router.post("/interactions", async (req, res) => {
  try {
    const { customer_id, user_id, type, notes } = req.body;

    // Check if user_id exists
    const userExists = await pool.query("SELECT id FROM users WHERE id = $1", [
      user_id,
    ]);
    if (userExists.rows.length === 0) {
      return res
        .status(400)
        .json({ err: "Invalid user_id", details: "User does not exist" });
    }

    // Check if customer_id exists
    const customerExists = await pool.query(
      "SELECT id FROM customers WHERE id = $1",
      [customer_id]
    );
    if (customerExists.rows.length === 0) {
      return res.status(400).json({
        err: "Invalid customer_id",
        details: "Customer does not exist",
      });
    }

    // Insert into interactions table
    const newInteraction = await pool.query(
      "INSERT INTO interactions (customer_id, user_id, type, notes) VALUES ($1, $2, $3, $4) RETURNING *",
      [customer_id, user_id, type, notes]
    );

    res.status(201).json(newInteraction.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({ err: "Server error", details: err.message });
    }
  }
});

// Update an interaction
router.put("/interactions/:id", validateInteraction, async (req, res) => {
  try {
    const { id } = req.params;
    const { type, notes } = req.body;
    const updatedInteraction = await pool.query(
      "UPDATE interactions SET type = $1, notes = $2 WHERE id = $3 RETURNING *",
      [type, notes, id]
    );
    if (updatedInteraction.rows.length === 0) {
      return res.status(404).json({ error: "Interaction not found" });
    }
    res.json(updatedInteraction.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({ err: "Server error" });
    }
  }
});

// Delete an interaction
router.delete("/interactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM interactions WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Interaction not found" });
    }
    res.json({ message: "Interaction deleted", interaction: result.rows[0] });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({ err: "Server error" });
    }
  }
});

export default router;
