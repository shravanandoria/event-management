import pool from "../db/db";
export const addUserToEvent = async (
  eventId: number,
  name: string,
  email: string
) => {
  const result = await pool.query(
    `
            INSERT INTO users (event_id, name, email)
            VALUES ($1, $2, $3)
            RETURNING *        
        `,
    [eventId, name, email]
  );

  return result.rows[0];
};

export const getUsersByEvent = async (eventId: number) => {
  const result = await pool.query("SELECT * FROM users WHERE event_id = $1", [
    eventId,
  ]);

  return result.rows;
};

export const cancelUserRegistration = async (
  userId: number,
  reason: string
) => {
  const result = await pool.query(
    `
            UPDATE users
            SET status = 'cancelled', cancel_reason = $1, cancelled_at = now()
            WHERE id = $2
            RETURNING *        
        `,
    [reason, userId]
  );

  return result.rows[0];
};
