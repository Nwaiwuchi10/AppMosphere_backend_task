"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const CallRoutes_1 = __importDefault(require("./routes/CallRoutes"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use("/api/auth", AuthRoutes_1.default);
app.use("/api/users", UserRoutes_1.default);
app.use("/api/calls", CallRoutes_1.default);
// Connect to MongoDB
(0, db_1.default)();
const port = process.env.PORT;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
//# sourceMappingURL=index.js.map