import pool from "../db/db";
import { Event } from "../interface/eventInterface";

export const getAllEvents = async () => {
  const result = await pool.query("SELECT * FROM events ORDER BY date ASC");
  return result.rows;
};

export const getEventById = async (id: Number) => {
  const result = await pool.query("SELECT * FROM events where id = $1", [id]);
  return result.rows[0];
};

export const createEvent = async ({
  name,
  description,
  date,
  location,
}: Event) => {
  const result = await pool.query(
    "INSERT INTO events (name, description, date, location) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, description, date, location]
  );
  return result.rows[0];
};

export const deleteEvent = async (id: Number) => {

  const result = await pool.query(
    "DELETE FROM events where id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const updateEventById = async (id: Number, data: Event) => {
  const { name, description, date, location } = data;
  const result = await pool.query(
    `
    UPDATE events
    SET name = $1, description = $2, date = $3, location = $4
    WHERE id = $5
    RETURNING *
    `,
    [name, description, date, location, id]
  );

  return result.rows[0];
};

export const filterEvents = async (filters: {
  name?: string;
  date?: string;
  location?: string;
  sort?: "asc" | "desc";
}) => {
  let query = `SELECT * FROM events WHERE 1=1`;
  const values: any[] = [];
  let idx = 1;
  if (filters.name && filters.name.trim() !== "") {
    query += ` AND LOWER(name) LIKE LOWER($${idx++})`;
    values.push(`%${filters.name.toLowerCase()}%`);
  }

  if (filters.date && filters.date.trim() !== "") {
    query += ` AND date = $${idx++}`;
    values.push(filters.date);
  }

  if (filters.location && filters.location.trim() !== "") {
    query += ` AND LOWER(location) LIKE LOWER($${idx++})`;
    values.push(`%${filters.location.toLowerCase()}%`);
  }

  const sortDirection = filters.sort?.toLowerCase() === "desc" ? "DESC" : "ASC";

  query += ` ORDER BY date ${sortDirection}`;

  const result = await pool.query(query, values);
  return result.rows;
};
