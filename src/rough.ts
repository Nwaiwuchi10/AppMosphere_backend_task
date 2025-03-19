// import express from "express";
// import http from "http";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// import compression from "compression";
// import cors from "cors";

// import dotenv from "dotenv";

// import colors from "colors";

// import connectDB from "./config/db";
// import authRoutes from "./routes/AuthRoutes";
// import usersRoutes from "./routes/UserRoutes";
// import meetingRoutes from "./routes/MeetingRoutes";
// import { v4 as uuidv4 } from "uuid";
// import { Server, Socket } from "socket.io";
// import ShortUniqueId from "short-unique-id";
// import Meeting from "./models/Meeting";
// dotenv.config();

// const uid = new ShortUniqueId({ length: 10 });

// const port = process.env.PORT;
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Adjust this for production
//     methods: ["GET", "POST"],
//   },
// });
// connectDB();
// app.use(cors());
// app.use(compression());
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use("/api/auth", authRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/meetings", meetingRoutes);

// // Handle WebSocket Connections

// // Socket.io Signaling for WebRTC
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("create-meeting", async ({ userId }, callback) => {
//     try {
//       const meetingId = uid.rnd(); // Generate unique meeting ID
//       const roomId = uuidv4();

//       const meeting = new Meeting({
//         meetingId,
//         roomId,
//         owner: userId,
//         participants: [{ socketId: socket.id, userId }],
//       });

//       await meeting.save();
//       socket.join(roomId);

//       io.to(roomId).emit("meeting-created", { meetingId, owner: userId });

//       console.log(`Meeting ${meetingId} created by user ${userId}`);

//       // Ensure callback is called with the correct meeting ID
//       if (callback) {
//         callback({ meetingId });
//       }
//     } catch (error) {
//       console.error("Error creating meeting:", error);
//       if (callback) {
//         callback({ error: "Failed to create meeting" });
//       }
//     }
//   });
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
//       io.to(meetingId).emit("update-participants", meeting.participants);
//     }

//     io.to(socket.id).emit("participants-list", meeting.participants);
//   });

//   socket.on("joinyyyyy-room", async ({ meetingId, userId, peerId }) => {
//     const meeting = await Meeting.findOne({ meetingId });

//     if (!meeting) {
//       socket.emit("error", "Meeting not found");
//       return;
//     }

//     // Check if the user is already in the meeting

//     const isParticipant = meeting.participants.some(
//       (participant) => participant.userId === userId
//     );

//     if (!isParticipant) {
//       const participant = { socketId: socket.id, userId, peerId };
//       meeting.participants.push(participant);
//       await meeting.save();

//       socket.join(meetingId);
//       // io.to(meetingId).emit("update-participants", meeting.participants);
//       socket.broadcast.to(meetingId).emit("user-joined", participant);
//     }

//     // Send the updated participants list to the new user
//     io.to(socket.id).emit("participants-list", meeting.participants);
//   });

//   ///request to join a meeting

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
//       io.to(meeting.meetingId).emit(
//         "update-participants",
//         meeting.participants
//       );
//     }

//     console.log(`User Disconnected: ${socket.id}`);
//   });
//   socket.on("leave-room", async ({ meetingId, userId }) => {
//     await Meeting.updateOne(
//       { meetingId },
//       { $pull: { participants: { userId } } }
//     );
//     socket.leave(meetingId);
//     socket.broadcast.to(meetingId).emit("user-left", { userId });
//   });
// });
// server.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
