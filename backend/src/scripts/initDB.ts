import pool from "../db/db";
const schema = `
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'active',   
  cancel_reason TEXT,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  password_hash TEXT NOT NULL
);
`;

(async () => {
  try {
    await pool.query(schema); // ✅ SQL runs inside Postgres
    console.log("Tables created");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    pool.end();
  }
})();
