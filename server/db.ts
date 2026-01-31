// import pg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const pool = new pg.Pool({
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_HOST,
//   database: process.env.POSTGRES_DB,
//   password: process.env.POSTGRES_PASSWORD,
//   port: parseInt(process.env.POSTGRES_PORT || "5432"),
// });
// pool ? "database is running" : "The database is not running";

// export default pool;

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

async function checkDatabaseConnection() {
  try {
    await pool.query("SELECT 1"); // Perform a simple query
    console.log("Database is connected");
  } catch (error) {
    console.error("Database connection failed", error);
  }
}

checkDatabaseConnection();

export default pool;
