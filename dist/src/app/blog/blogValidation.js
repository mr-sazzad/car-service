"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = void 0;
const zod_1 = __importDefault(require("zod"));
exports.create = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({ required_error: "Title is required" }),
        content: zod_1.default.string({ required_error: "Content is required" }),
        image: zod_1.default.string(),
    }),
});
exports.update = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string(),
        content: zod_1.default.string(),
        image: zod_1.default.string(),
    }),
});
