import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import config from "config";
import dotenv from "dotenv";

import colors from "colors";

import mongoose from "mongoose";
import connectDB from "./config/db";
import authRoutes from "./routes/AuthRoutes";
import usersRoutes from "./routes/UserRoutes";
import callRoutes from "./routes/CallRoutes";
import { Server, Socket } from "socket.io";
dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/calls", callRoutes);

// Connect to MongoDB
connectDB();

const port = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust as needed for security
    methods: ["GET", "POST"],
  },
});
// Handle WebSocket Connections

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-call", (data) => {
    const { meetingId, userId } = data;
    socket.join(meetingId);
    io.to(meetingId).emit("user-joined", { userId, socketId: socket.id });
  });

  socket.on("offer", (data) => {
    socket.to(data.target).emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.to(data.target).emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.target).emit("ice-candidate", data.candidate);
  });

  socket.on("leave-call", ({ meetingId, userId }) => {
    socket.leave(meetingId);
    io.to(meetingId).emit("user-left", { userId });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("signal", (data) => {
    io.to(data.targetSocketId).emit("signal", {
      signal: data.signal,
      callerId: data.callerId,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
