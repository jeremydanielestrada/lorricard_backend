import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

//DB attirbutes
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:rejectUnauthorized: process.env.NODE_ENV === "production" ? {rejectUnauthorized: false} : false,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,  
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Unexpected error ", err);
});

export default pool;
