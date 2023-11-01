"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = void 0;
const zod_1 = __importDefault(require("zod"));
exports.create = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({ required_error: "Name not provided" }),
        role: zod_1.default.enum(["user", "admin", "super_admin"]).default("user"),
        email: zod_1.default.string({ required_error: "Email not provided" }).email(),
        password: zod_1.default.string({ required_error: "Password not provided" }),
        contactNo: zod_1.default.string().optional(),
        gender: zod_1.default.enum(["Male", "Female", "Others"]).optional(),
        bloodGroup: zod_1.default
            .enum(["O+", "B+", "B-", "AB+", "AB-", "O-", "A+", "A-"])
            .optional(),
        profileImage: zod_1.default.string().optional(),
        isBanned: zod_1.default.boolean().default(false),
    }),
});
exports.update = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        role: zod_1.default.enum(["user", "admin", "super_admin"]).optional(),
        email: zod_1.default.string().email().optional(),
        password: zod_1.default.string().optional(),
        contactNo: zod_1.default.string().optional(),
        gender: zod_1.default.enum(["Male", "Female", "Others"]).optional(),
        bloodGroup: zod_1.default
            .enum(["O+", "B+", "B-", "AB+", "AB-", "O-", "A+", "A-"])
            .optional(),
        profileImage: zod_1.default.string().optional(),
        isBanned: zod_1.default.boolean().optional(),
    }),
});
