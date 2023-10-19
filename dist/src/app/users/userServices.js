"use strict";
// User service Page
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
exports.UserServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../libs/prisma"));
const apiErrors_1 = __importDefault(require("../errors/apiErrors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// environment variables
const SECRET = process.env.JWT_SECRET;
const EXP = process.env.EXPIRE_TIME;
const createUser = (token, user) => __awaiter(void 0, void 0, void 0, function* () {
    const email = user.email;
    if (user.role === "admin") {
        if (!token) {
            throw new apiErrors_1.default(409, "Unauthorized access");
        }
        const verify = jwtHelpers_1.jwtHelpers.verifyToken(token, SECRET);
        if (!verify) {
            throw new apiErrors_1.default(409, "Unauthorized access");
        }
        const decodeToken = jsonwebtoken_1.default.decode(token);
        if ((decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.role) === "super_admin") {
            throw new apiErrors_1.default(409, "Unauthorized access");
        }
    }
    if (user.role === "super_admin") {
        throw new apiErrors_1.default(409, "Unauthorized access");
    }
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (isUserExist)
        throw new apiErrors_1.default(409, "Conflict Credentials");
    user.password = yield bcryptjs_1.default.hash(user.password, 12);
    const result = yield prisma_1.default.user.create({
        data: user,
    });
    if (!result)
        throw new apiErrors_1.default(500, "Internal Server Error");
    return result;
});
const loginUser = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const email = credentials.email;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new apiErrors_1.default(404, `User ${credentials.email} does not exist`);
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(credentials.password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new apiErrors_1.default(409, "Invalid Credentials");
    }
    const { id: userId, role } = isUserExist;
    console.log(userId, role);
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, SECRET, EXP);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, SECRET, EXP);
    return {
        accessToken,
        refreshToken,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        include: {
            Cart: true,
        },
    });
    if (!user)
        throw new apiErrors_1.default(404, "User not found");
    return user;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({});
    if (!result)
        throw new apiErrors_1.default(404, "User not found");
    return result;
});
const getAllAdmins = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new apiErrors_1.default(409, "Unauthorized access");
    }
    const verify = jwtHelpers_1.jwtHelpers.verifyToken(token, SECRET);
    if (!verify) {
        throw new apiErrors_1.default(409, "Unauthorized access");
    }
    const decodeToken = jsonwebtoken_1.default.decode(token);
    if ((decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.role) === "super_admin") {
        throw new apiErrors_1.default(409, "Unauthorized access");
    }
    const result = yield prisma_1.default.user.findMany({
        where: {
            role: "admin",
        },
    });
    if (!result)
        throw new apiErrors_1.default(404, "User not found");
    return result;
});
const updateSingleUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data,
    });
    if (!result)
        throw new apiErrors_1.default(404, "User not found");
    return result;
});
exports.UserServices = {
    createUser,
    loginUser,
    getSingleUser,
    getAllUsers,
    updateSingleUser,
    getAllAdmins,
};
