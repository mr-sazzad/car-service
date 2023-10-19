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
exports.CartServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../libs/prisma"));
const apiErrors_1 = __importDefault(require("../errors/apiErrors"));
const addToCart = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.cart.findFirst({
        where: {
            service: data.service,
            userId: data.userId,
        },
        include: {
            user: true,
        },
    });
    if (isExist) {
        yield prisma_1.default.cart.update({
            where: {
                id: isExist.id,
            },
            data: {
                service: data.service,
                status: "in_progress",
                user: {
                    connect: {
                        id: data.userId,
                    },
                },
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                confirmedDate: data.confirmedDate,
            },
        });
        return isExist;
    }
    else {
        const result = yield prisma_1.default.cart.create({ data });
        if (!result)
            throw new apiErrors_1.default(400, "Bad request");
        return result;
    }
});
const getAllFromCart = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token)
        throw new apiErrors_1.default(400, "Bad request");
    const decodedToken = jsonwebtoken_1.default.decode(token);
    console.log(decodedToken);
    const { userId } = decodedToken;
    const user = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!user)
        throw new apiErrors_1.default(400, "Bad Request");
    const result = yield prisma_1.default.cart.findMany({
        where: {
            userId,
        },
    });
    if (result.length === 0) {
        throw new apiErrors_1.default(400, "Your cart is empty");
    }
    return result;
});
const getSingleFromCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findFirst({
        where: {
            service: id,
        },
    });
    return result;
});
const getSingleByCartId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findFirst({
        where: {
            id,
        },
    });
    return result;
});
const getAllPendingCarts = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token)
        throw new apiErrors_1.default(400, "Bad request");
    const decodedToken = jsonwebtoken_1.default.decode(token);
    const { userId } = decodedToken;
    const user = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!user)
        throw new apiErrors_1.default(400, "Bad Request");
    const result = yield prisma_1.default.cart.findMany({
        where: {
            status: {
                not: "in_progress",
            },
        },
    });
    return result;
});
const updateSingleCart = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.cart.findFirst({
        where: {
            id,
        },
    });
    if (!service)
        throw new apiErrors_1.default(404, "Service not found");
    const result = yield prisma_1.default.cart.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
exports.CartServices = {
    addToCart,
    getAllFromCart,
    getSingleFromCart,
    updateSingleCart,
    getAllPendingCarts,
    getSingleByCartId,
};
