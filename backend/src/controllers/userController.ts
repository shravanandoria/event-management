import { Request, Response } from "express";
import {
  addUserToEvent,
  cancelUserRegistration,
  getUsersByEvent,
} from "../models/userModel";

export const handleUserRegistration = async (req: Request, res: Response) => {
  try {
    const eventId = Number(req.params.id);
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({
        error: "name and email are required to register",
      });
    const newRegistration = await addUserToEvent(eventId, name, email);
    res.json(newRegistration);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to register user, please try again later" });
  }
};

export const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const eventId = Number(req.params.id);
    const users = await getUsersByEvent(eventId);
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const handleCancelUserRegistration = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.params.id);
    const { reason } = req.body;

    const cancelledRegistrationUser = await cancelUserRegistration(
      userId,
      reason
    );
    if (!cancelledRegistrationUser)
      return res.status(400).json({ error: "Cannot find this user" });

    res.json({
      message: "User registration cancelled",
      user: cancelledRegistrationUser,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
