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
exports.SuperAdminServices = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const apiErrors_1 = __importDefault(require("../errors/apiErrors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    const email = admin.email;
    let password = admin.password;
    const isAdminExist = yield prisma_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (isAdminExist)
        throw new apiErrors_1.default(409, "Admin already exists");
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    const result = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, admin), { password: hashedPassword }),
    });
    return result;
});
const getSuperAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.superAdmin.findUnique({
        where: {
            id,
        },
    });
    if (!result)
        throw new apiErrors_1.default(409, "No SuperAdmin found");
    return result;
});
const updateSuperAdmin = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isSuperAdminExist = yield prisma_1.default.superAdmin.findFirst({
        where: {
            id,
        },
    });
    if (!isSuperAdminExist)
        throw new apiErrors_1.default(409, "Super Admin already exists");
    const result = yield prisma_1.default.superAdmin.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
exports.SuperAdminServices = {
    createAdmin,
    getSuperAdmin,
    updateSuperAdmin,
};
