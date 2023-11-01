"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRoutes = void 0;
const express_1 = require("express");
const types_1 = require("../../types");
const auth_1 = __importDefault(require("../middlewares/auth"));
const feedbackController_1 = require("./feedbackController");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(types_1.Roles.USER), feedbackController_1.createFeedback);
router.get("/", feedbackController_1.getAllFeedback);
exports.feedbackRoutes = router;
