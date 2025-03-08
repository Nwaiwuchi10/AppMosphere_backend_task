"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = async () => {
    const users = await User_1.default.find();
    return users;
};
exports.getUsers = getUsers;
const getUserById = async (userId) => {
    return await User_1.default.findById(userId);
};
exports.getUserById = getUserById;
//# sourceMappingURL=Users.js.map