"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = void 0;
const zod_1 = __importDefault(require("zod"));
exports.create = zod_1.default.object({
    body: zod_1.default.object({
        userId: zod_1.default.string({ required_error: "User Id is required" }),
        suggestion: zod_1.default.string(),
        comment: zod_1.default.string(),
    }),
});
exports.update = zod_1.default.object({
    body: zod_1.default.object({
        userId: zod_1.default.string(),
        suggestion: zod_1.default.string(),
        comment: zod_1.default.string(),
    }),
});
