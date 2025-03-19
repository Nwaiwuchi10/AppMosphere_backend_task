import {
  getAllMeeting,
  getCallHistoryHandler,
  startCall,
  stopCall,
} from "../controllers/MeetingController";
import express from "express";

const router = express.Router();

router.post("/start", startCall);
router.post("/end/:meetingId", stopCall);
router.get("/", getAllMeeting);
router.get("/history/:userId", getCallHistoryHandler);
export default router;
// socket.on("joiny-roomy", async ({ meetingId, userId }) => {
//   try {
//     const meeting = await Meeting.findOne({ meetingId });

//     if (!meeting) {
//       return console.log("Meeting not found");
//     }

//     const existingParticipantIndex = meeting.participants.findIndex(
//       (participant: any) => participant.userId === userId
//     );

//     if (existingParticipantIndex !== -1) {
//       meeting.participants[existingParticipantIndex].socketId = socket.id;
//     } else {
//       meeting.participants.push({ socketId: socket.id, userId });
//     }

//     await meeting.save();

//     socket.join(meeting.roomId);

//     const participants = meeting.participants.map((p) => p.userId);

//     io.to(meeting.roomId).emit("update-participants", participants);

//     console.log(`User ${userId} joined meeting ${meetingId}`);
//   } catch (error) {
//     console.error("Error joining room:", error);
//   }
// });

// socket.on("join-room", async ({ meetingId, userId }) => {
//   const meeting = await Meeting.findOne({ meetingId });
//   if (!meeting) return;

//   const existingParticipant = meeting.participants.find(
//     (p) => p.userId === userId
//   );

//   if (!existingParticipant) {
//     meeting.participants.push({ socketId: socket.id, userId });
//     await meeting.save();
//   }

//   socket.join(meeting.meetingId);
//   socket.broadcast.to(meeting.meetingId).emit("new-user-joined", { userId });

//   // Emit the list of all participants to the newly joined user
//   const participants = meeting.participants.map((p:any) => p.userId);
//   io.to(socket.id).emit("update-participants", participants);
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);
//   socket.on("join-room", async ({ meetingId, userId, peerId }) => {
//     const meeting = await Meeting.findOne({ meetingId });

//     if (!meeting) {
//       socket.emit("error", "Meeting not found");
//       return;
//     }

//     const isParticipant = meeting.participants.some(
//       (participant) => participant.userId === userId
//     );

//     if (!isParticipant) {
//       const participant = { socketId: socket.id, userId, peerId };
//       meeting.participants.push(participant);
//       await meeting.save();

//       socket.join(meetingId);
//       // Send the new user to all other participants
//       socket.broadcast.to(meetingId).emit("user-joined", participant);
//     }

//     // Send the updated participant list to the user who joined
//     io.to(socket.id).emit("participants-list", meeting.participants);
//   });

//   socket.on("joiny-roomff", async ({ meetingId, userId }) => {
//     const meeting = await Meeting.findOne({ meetingId });

//     if (!meeting) {
//       socket.emit("error", "Meeting not found");
//       return;
//     }

//     const participant = { socketId: socket.id, userId };
//     meeting.participants.push(participant);
//     await meeting.save();

//     socket.join(meetingId);
//     socket.broadcast.to(meetingId).emit("user-joined", participant);

//     io.to(socket.id).emit("participants-list", meeting.participants);
//   });

//   socket.on("offer", ({ offer, targetSocketId }) => {
//     io.to(targetSocketId).emit("receive-offer", { offer, from: socket.id });
//   });

//   socket.on("answer", ({ answer, targetSocketId }) => {
//     io.to(targetSocketId).emit("receive-answer", { answer, from: socket.id });
//   });

//   socket.on("ice-candidate", ({ candidate, targetSocketId }) => {
//     io.to(targetSocketId).emit("receive-ice-candidate", {
//       candidate,
//       from: socket.id,
//     });
//   });

//   socket.on("disconnect", async () => {
//     const meeting = await Meeting.findOneAndUpdate(
//       { "participants.socketId": socket.id },
//       { $pull: { participants: { socketId: socket.id } } },
//       { new: true }
//     );

//     if (meeting) {
//       io.to(meeting.meetingId).emit("user-left", socket.id);
//       io.to(meeting.meetingId).emit("participants-list", meeting.participants);
//     }
//   });
// });

// socket.on("joiny-roomff", async ({ meetingId, userId }) => {
//   const meeting = await Meeting.findOne({ meetingId });

//   if (!meeting) {
//     socket.emit("error", "Meeting not found");
//     return;
//   }

//   const participant = { socketId: socket.id, userId };
//   meeting.participants.push(participant);
//   await meeting.save();

//   socket.join(meetingId);
//   socket.broadcast.to(meetingId).emit("user-joined", participant);

//   io.to(socket.id).emit("participants-list", meeting.participants);
// });
