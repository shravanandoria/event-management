import { Request, Response } from "express";

import pool from "../db/db";
import { generateToken, hashPassword, comparePassword } from "../utils/auth";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await hashPassword(password);
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashed]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * from users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const valid = await comparePassword(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = await generateToken({ id: user.id, email: user.email });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Login Failed" });
  }
};
