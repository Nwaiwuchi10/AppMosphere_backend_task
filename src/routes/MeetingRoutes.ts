import {
  getCallHistoryHandler,
  startCall,
  stopCall,
} from "../controllers/MeetingController";
import express from "express";

const router = express.Router();

router.post("/start", startCall);
router.post("/end/:meetingId", stopCall);
router.get("/history/:userId", getCallHistoryHandler);
export default router;
