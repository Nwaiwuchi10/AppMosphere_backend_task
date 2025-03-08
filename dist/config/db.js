"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log(colors_1.default.green("✅ MongoDB Connected Successfully!"));
    }
    catch (error) {
        console.log(colors_1.default.red("❌ MongoDB Connection Error:"), error);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map