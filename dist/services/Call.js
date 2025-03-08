"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallHistory = exports.endCall = exports.createCall = void 0;
const Call_1 = __importDefault(require("../models/Call"));
const createCall = async (meetingId, title, participants = []) => {
    const existingCall = await Call_1.default.findOne({ meetingId });
    if (existingCall) {
        throw new Error("Meeting ID already exists");
    }
    const newCall = new Call_1.default({
        meetingId,
        title: title || "Untitled Call", // Default title if not provided
        participants,
    });
    await newCall.save();
    return newCall;
};
exports.createCall = createCall;
const endCall = async (meetingId) => {
    const call = await Call_1.default.findOne({ meetingId });
    if (!call)
        return null;
    call.endedAt = new Date();
    call.duration = (call.endedAt.getTime() - call.startedAt.getTime()) / 1000;
    call.status = "ended";
    return await call.save();
};
exports.endCall = endCall;
const getCallHistory = async (userId) => {
    return await Call_1.default.find({ participants: userId })
        .populate("participants")
        .sort({ createdAt: -1 });
};
exports.getCallHistory = getCallHistory;
//# sourceMappingURL=Call.js.map