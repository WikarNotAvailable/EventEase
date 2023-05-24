import { Pool } from "pg";

const pool: Pool = new Pool({
  user: "postgres",
  password: "postgres",
  database: "eventease_database",
  host: "localhost",
  port: 5432
});

export default pool;
