"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerUser = async (firstName, lastName, email, password) => {
    const userExists = await User_1.default.findOne({ email });
    if (userExists)
        throw new Error("User already exists");
    const user = await User_1.default.create({ firstName, lastName, email, password });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await User_1.default.findOne({ email });
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    return { user, token };
};
exports.loginUser = loginUser;
//# sourceMappingURL=Auth.js.map