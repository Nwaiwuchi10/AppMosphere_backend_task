"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getAllUsers = void 0;
const Users_1 = require("../services/Users");
const User_1 = __importDefault(require("../models/User"));
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, Users_1.getUsers)();
        res.status(201).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const getUser = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getUser = getUser;
//# sourceMappingURL=UserController.js.map