"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = void 0;
const zod_1 = __importDefault(require("zod"));
exports.create = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({ required_error: "Title not provided" }),
        price: zod_1.default.string({ required_error: "Price not provided" }),
        status: zod_1.default.enum(["up_coming", "current"]).default("current"),
        description: zod_1.default.string({ required_error: "Description not provided" }),
        image: zod_1.default.string({ required_error: "Image not provided" }),
    }),
});
exports.update = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().optional(),
        price: zod_1.default.string().optional(),
        status: zod_1.default.enum(["up_coming", "current"]).default("current").optional(),
        description: zod_1.default.string().optional(),
        image: zod_1.default.string().optional(),
    }),
});
