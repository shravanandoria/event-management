import express from "express";
import {
  handleUserRegistration,
  handleGetUsers,
  handleCancelUserRegistration,
} from "../controllers/userController";

const router = express.Router();

router.post("/events/:id/users", handleUserRegistration);
router.get("/events/:id/users", handleGetUsers);
router.delete("/users/:id", handleCancelUserRegistration);

export default router;
    