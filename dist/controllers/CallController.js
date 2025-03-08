"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallHistoryHandler = exports.stopCall = exports.startCall = void 0;
const Call_1 = require("../services/Call");
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const startCall = async (req, res) => {
    try {
        const { randomUUID } = new short_unique_id_1.default({ length: 10 });
        const meetingId = randomUUID();
        const { title, participants } = req.body;
        const call = await (0, Call_1.createCall)(meetingId, title, participants);
        res.status(201).json(call);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.startCall = startCall;
const stopCall = async (req, res) => {
    try {
        const { meetingId } = req.params;
        await (0, Call_1.endCall)(meetingId);
        res.json({ message: "Call ended" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.stopCall = stopCall;
const getCallHistoryHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const getHistory = await (0, Call_1.getCallHistory)(userId);
        if (!getHistory) {
            res.status(404).json({ message: "Participants not found" });
        }
        res.status(200).json(getHistory);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getCallHistoryHandler = getCallHistoryHandler;
//# sourceMappingURL=CallController.js.map