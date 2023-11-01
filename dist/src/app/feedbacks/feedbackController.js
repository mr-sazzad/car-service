"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFeedback = exports.createFeedback = void 0;
const feedbackServices_1 = require("./feedbackServices");
const createFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const feedback = req.body;
        const result = yield feedbackServices_1.FeedbackServices.createFeedback(token, feedback);
        res.status(201).json({
            status: 201,
            message: "feedback created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createFeedback = createFeedback;
const getAllFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield feedbackServices_1.FeedbackServices.getAllFeedback();
        res.status(201).json({
            status: 201,
            message: "feedbacks retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllFeedback = getAllFeedback;
