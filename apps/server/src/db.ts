import { Pool } from "pg";

// Configured from .env
export const pool = new Pool();

process.on("SIGINT", async () => await pool.end());
process.on("SIGTERM", async () => await pool.end());
