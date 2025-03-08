import {
  getCallHistoryHandler,
  startCall,
  stopCall,
} from "../controllers/CallController";
import express from "express";

const router = express.Router();

router.post("/start", startCall);
router.post("/end/:meetingId", stopCall);
router.get("/history/:userId", getCallHistoryHandler);
export default router;
