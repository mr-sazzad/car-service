"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRoutes = void 0;
const express_1 = require("express");
const types_1 = require("../../types");
const auth_1 = __importDefault(require("../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const reviewController_1 = require("./reviewController");
const reviewValidation_1 = require("./reviewValidation");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(types_1.Roles.USER), (0, validateRequest_1.default)(reviewValidation_1.create), reviewController_1.createReview);
router.get("/", reviewController_1.getAllReviews);
exports.ReviewsRoutes = router;
