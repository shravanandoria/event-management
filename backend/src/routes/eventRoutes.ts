import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  handleCreateEvent,
  handleDeleteEvent,
  handleFilterEvent,
  handleGetEventById,
  handleGetEvents,
  handleUpdateEventById,
} from "../controllers/eventController";

const router = express.Router();

router.get("/events", handleGetEvents);
router.get("/events/search", handleFilterEvent);
router.get("/events/:id", handleGetEventById);
router.post("/events", authenticateToken, handleCreateEvent);
router.put("/events/:id", authenticateToken, handleUpdateEventById);
router.delete("/events/:id", authenticateToken, handleDeleteEvent);

export default router;
