"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const UserController_1 = require("../controllers/UserController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", AuthMiddleware_1.protect, UserController_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map