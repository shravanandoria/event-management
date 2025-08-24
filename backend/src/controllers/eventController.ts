import {
  getAllEvents,
  createEvent,
  getEventById,
  deleteEvent,
  updateEventById,
  filterEvents,
} from "../models/eventModel";
import { Request, Response } from "express";

export const handleGetEvents = async (req: Request, res: Response) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch events, please try again later" });
  }
};

export const handleGetEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const event = await getEventById(id);

    if (!event) return res.status(404).json({ error: "Cannot find the event" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch this event" });
  }
};

export const handleCreateEvent = async (req: Request, res: Response) => {
  try {
    const { name, description, date, location } = req.body;
    const newEvent = await createEvent({ name, description, date, location });
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create event, please try again later " });
  }
};

export const handleDeleteEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedEvent = await deleteEvent(id);
    if (!deletedEvent)
      return res.status(404).json({ error: "Cannot find this event" });

    res.json(deletedEvent);
  } catch (error) {
    res.status(500).json({ error: " somethi" });
  }
};

export const handleUpdateEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description, date, location } = req.body;
    const updatedEvent = await updateEventById(id, {
      name,
      description,
      date,
      location,
    });

    if (!updatedEvent)
      return res.status(404).json({ error: "Cannot find this event" });

    res.json(updatedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to update this event, please try again later" });
  }
};

export const handleFilterEvent = async (req: Request, res: Response) => {
  try {
    const { name, date, location, sort } = req.query;

    const events = await filterEvents({
      name: typeof name === "string" && name !== "undefined" ? name : undefined,
      date: typeof date === "string" && date !== "undefined" ? date : undefined,
      location:
        typeof location === "string" && location !== "undefined"
          ? location
          : undefined,
      sort:
        typeof sort === "string" && (sort === "asc" || sort === "desc")
          ? (sort as "asc" | "desc")
          : "asc",
    });
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to search the events, please try again later" });
  }
};
