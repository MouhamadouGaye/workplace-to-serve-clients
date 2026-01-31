// import express from 'express';
// import { z } from 'zod';
// import pool from '../db';

// const router = express.Router();

// const DealSchema = z.object({
//   customer_id: z.number().int().positive(),
//   user_id: z.number().int().positive(),
//   title: z.string(),
//   amount: z.number().min(0),
//   status: z.string(),
//   stage: z.string(),
//   expected_close_date: z.string().optional(),
// });

// // Get all deals
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT d.*,
//              c.name as customer_name,
//              u.name as user_name
//       FROM deals d
//       JOIN customers c ON d.customer_id = c.id
//       JOIN users u ON d.user_id = u.id
//       ORDER BY d.created_at DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch deals' });
//   }
// });

// // Get deals by customer ID
// router.get('/customer/:customerId', async (req, res) => {
//   try {
//     const customerId = parseInt(req.params.customerId);
//     if (isNaN(customerId)) {
//       return res.status(400).json({ error: 'Invalid customer ID' });
//     }

//     const result = await pool.query(`
//       SELECT d.*, u.name as user_name
//       FROM deals d
//       JOIN users u ON d.user_id = u.id
//       WHERE d.customer_id = $1
//       ORDER BY d.created_at DESC
//     `, [customerId]);
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch customer deals' });
//   }
// });

// // Get deal by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) {
//       return res.status(400).json({ error: 'Invalid ID' });
//     }

//     const result = await pool.query(`
//       SELECT d.*,
//              c.name as customer_name,
//              u.name as user_name
//       FROM deals d
//       JOIN customers c ON d.customer_id = c.id
//       JOIN users u ON d.user_id = u.id
//       WHERE d.id = $1
//     `, [id]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Deal not found' });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch deal' });
//   }
// });

// // Create deal
// router.post('/', async (req, res) => {
//   try {
//     const deal = DealSchema.parse(req.body);
//     const result = await pool.query(`
//       INSERT INTO deals (
//         customer_id, user_id, title, amount,
//         status, stage, expected_close_date
//       )
//       VALUES ($1, $2, $3, $4, $5, $6, $7)
//       RETURNING *
//     `, [
//       deal.customer_id,
//       deal.user_id,
//       deal.title,
//       deal.amount,
//       deal.status,
//       deal.stage,
//       deal.expected_close_date
//     ]);

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(400).json({ error: 'Invalid deal data' });
//   }
// });

// // Update deal
// router.put('/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) {
//       return res.status(400).json({ error: 'Invalid ID' });
//     }

//     const deal = DealSchema.parse(req.body);

//     const result = await pool.query(`
//       UPDATE deals
//       SET customer_id = $1, user_id = $2, title = $3,
//           amount = $4, status = $5, stage = $6,
//           expected_close_date = $7
//       WHERE id = $8
//       RETURNING *
//     `, [
//       deal.customer_id,
//       deal.user_id,
//       deal.title,
//       deal.amount,
//       deal.status,
//       deal.stage,
//       deal.expected_close_date,
//       id
//     ]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Deal not found' });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(400).json({ error: 'Invalid deal data' });
//   }
// });

// // Delete deal
// router.delete('/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) {
//       return res.status(400).json({ error: 'Invalid ID' });
//     }

//     const result = await pool.query('DELETE FROM deals WHERE id = $1 RETURNING *', [id]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Deal not found' });
//     }

//     res.json({ message: 'Deal deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete deal' });
//   }
// });

// export default router;

import express, { Request, Response } from "express";
import pool from "../db";

const router = express.Router();

// // Configure PostgreSQL pool
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // Ensure this is set in your .env file
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
// });

// Get all deals
router.get("/deals", async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM deals ORDER BY created_at DESC"
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

// Get a single deal by ID
router.get("/deals/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM deals WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch deal" });
  }
});

// Create a new deal
router.post("/deals", async (req: Request, res: Response) => {
  const {
    customer_id,
    user_id,
    title,
    amount,
    status,
    stage,
    expected_close_date,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO deals (customer_id, user_id, title, amount, status, stage, expected_close_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        customer_id,
        user_id,
        title,
        amount,
        status || "open",
        stage || "initial",
        expected_close_date,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create deal" });
  }
});

// Update a deal
router.put("/deals/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, amount, status, stage, expected_close_date } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE deals
       SET title = $1, amount = $2, status = $3, stage = $4, expected_close_date = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [title, amount, status, stage, expected_close_date, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update deal" });
  }
});

// Delete a deal
router.delete("/deals/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query("DELETE FROM deals WHERE id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete deal" });
  }
});

export default router;

// Create an event
export const createEvent = async (req: Request, res: Response) => {
  const {
    user_id,
    contact_id,
    title,
    description,
    start_time,
    end_time,
    location,
    reminder_time,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO events (user_id, contact_id, title, description, start_time, end_time, location, reminder_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        user_id,
        contact_id,
        title,
        description,
        start_time,
        end_time,
        location,
        reminder_time,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get events for a specific user
export const getEventsForUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE user_id = $1 ORDER BY start_time",
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Update an event
export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, start_time, end_time, location, reminder_time } =
    req.body;
  try {
    const result = await pool.query(
      `UPDATE events SET title = $1, description = $2, start_time = $3, end_time = $4, location = $5, reminder_time = $6
      WHERE id = $7 RETURNING *`,
      [title, description, start_time, end_time, location, reminder_time, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM events WHERE id = $1", [id]);
    res.status(204).send("Event deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
