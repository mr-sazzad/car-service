"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = void 0;
const zod_1 = __importDefault(require("zod"));
exports.create = zod_1.default.object({
    body: zod_1.default.object({
        service: zod_1.default.string({ required_error: "Service Id is required" }),
        status: zod_1.default
            .enum(["in_progress", "pending", "cancelled", "completed"])
            .default("in_progress"),
        userId: zod_1.default.string({ required_error: "User Id is required" }),
        confirmedDate: zod_1.default.string().optional(),
    }),
});
exports.update = zod_1.default.object({
    body: zod_1.default.object({
        service: zod_1.default.string().optional(),
        status: zod_1.default
            .enum(["in_progress", "pending", "cancelled", "completed"])
            .default("in_progress"),
        userId: zod_1.default.string().optional(),
        confirmedDate: zod_1.default.string().optional(),
    }),
});
