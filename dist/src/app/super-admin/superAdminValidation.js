"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = void 0;
const zod_1 = __importDefault(require("zod"));
exports.create = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({ required_error: "Name filed is required" }),
        email: zod_1.default.string({ required_error: "Email filed is required" }).email(),
        password: zod_1.default.string({ required_error: "Password filed is required" }),
        age: zod_1.default.string({ required_error: "Age filed is required" }),
        address: zod_1.default.string({ required_error: "Address filed is required" }),
        role: zod_1.default.enum(["admin", "user", "super_admin"], {
            required_error: "Role filed is required",
        }),
        profileImage: zod_1.default.string({
            required_error: "Profile image filed is required",
        }),
    }),
});
exports.update = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        email: zod_1.default.string().email(),
        password: zod_1.default.string(),
        age: zod_1.default.string(),
        address: zod_1.default.string(),
        role: zod_1.default.enum(["admin", "user", "super_admin"]),
        profileImage: zod_1.default.string(),
    }),
});
