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
exports.ReviewServices = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const apiErrors_1 = __importDefault(require("../errors/apiErrors"));
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = data.userId;
    const user = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new apiErrors_1.default(404, `User ${userId} not found`);
    }
    const serviceId = data.serviceId;
    const service = yield prisma_1.default.service.findFirst({
        where: {
            id: serviceId,
        },
    });
    if (!service)
        throw new apiErrors_1.default(404, `Service ${serviceId} not found`);
    const result = yield prisma_1.default.review.create({ data });
    return result;
});
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        include: {
            user: true,
        },
    });
    return result;
});
exports.ReviewServices = {
    createReview,
    getAllReviews,
};
