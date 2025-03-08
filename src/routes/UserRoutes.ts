import { protect } from "../middlewares/AuthMiddleware";
import { getAllUsers, getUser } from "../controllers/UserController";
import express from "express";
const router = express.Router();

router.get("/", protect, getAllUsers);

export default router;
