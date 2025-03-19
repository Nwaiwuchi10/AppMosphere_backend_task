import { Request, Response } from "express";
import {
  createCall,
  endCall,
  getAllMeetings,
  getCallHistory,
} from "../services/Meeting";
import ShortUniqueId from "short-unique-id";

export const startCall = async (req: Request, res: Response) => {
  try {
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const meetingId = randomUUID();
    const { title, participants } = req.body;

    const call = await createCall(meetingId, title, participants);
    res.status(201).json(call);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const stopCall = async (req: Request, res: Response) => {
  try {
    const { meetingId } = req.params;
    await endCall(meetingId);
    res.json({ message: "Call ended" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const getAllMeeting = async (req: Request, res: Response) => {
  try {
    const meetings = await getAllMeetings();
    res.status(201).json(meetings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCallHistoryHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const getHistory = await getCallHistory(userId);
    if (!getHistory) {
      res.status(404).json({ message: "Participants not found" });
    }
    res.status(200).json(getHistory);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
