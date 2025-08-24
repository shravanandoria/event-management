import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    requestCert: true, // force SSL
    rejectUnauthorized: false, // allow AWS RDS self-signed certs
  },
});

pool.on("connect", () => console.log("Connection pool established"));

export default pool;
