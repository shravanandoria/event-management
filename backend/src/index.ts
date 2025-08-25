import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/db";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins (you can restrict to frontend domain if needed)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`DB name is ${result.rows[0].current_database}`);
});

app.use("/api", authRoutes);
app.use("/api", eventRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("App is running on port ", PORT));
