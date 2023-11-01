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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../libs/prisma"));
const apiErrors_1 = __importDefault(require("../errors/apiErrors"));
const secret = process.env.JWT_SECRET;
const createFeedback = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new apiErrors_1.default(401, "Unauthorized");
    }
    const verify = jwtHelpers_1.jwtHelpers.verifyToken(token, secret);
    if (!verify) {
        throw new apiErrors_1.default(401, "Unauthorized");
    }
    const decode = jsonwebtoken_1.default.decode(token);
    const createData = Object.assign(Object.assign({}, data), { userId: decode === null || decode === void 0 ? void 0 : decode.userId });
    const result = yield prisma_1.default.feedback.create({ data: createData });
    return result;
});
const getAllFeedback = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.findMany({
        include: {
            user: true,
        },
    });
    return result;
});
exports.FeedbackServices = {
    createFeedback,
    getAllFeedback,
};
