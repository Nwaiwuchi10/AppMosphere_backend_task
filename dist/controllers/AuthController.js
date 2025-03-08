"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const Auth_1 = require("../services/Auth");
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await (0, Auth_1.registerUser)(firstName, lastName, email, password);
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await (0, Auth_1.loginUser)(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.json({ message: "Login successful", user, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};
exports.logout = logout;
//# sourceMappingURL=AuthController.js.map