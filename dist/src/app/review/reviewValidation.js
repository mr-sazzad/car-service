"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const zod_1 = __importDefault(require("zod"));
exports.create = zod_1.default.object({
    body: zod_1.default.object({
        rating: zod_1.default.number({ required_error: "Rating must be a number" }),
        review: zod_1.default
            .string({
            required_error: "Review must be a string and more than ten characters",
        })
            .min(10),
        userId: zod_1.default.string({ required_error: "UserId must be a string" }),
        serviceId: zod_1.default.string({ required_error: "ServiceId must be a string" }),
    }),
});
