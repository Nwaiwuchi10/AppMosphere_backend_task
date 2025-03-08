"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CallController_1 = require("../controllers/CallController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/start", CallController_1.startCall);
router.post("/end/:meetingId", CallController_1.stopCall);
router.get("/history/:userId", CallController_1.getCallHistoryHandler);
exports.default = router;
//# sourceMappingURL=CallRoutes.js.map