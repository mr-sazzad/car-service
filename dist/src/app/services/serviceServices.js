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
exports.ServiceServices = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const apiErrors_1 = __importDefault(require("../errors/apiErrors"));
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.create({
        data,
    });
    if (!result) {
        throw new apiErrors_1.default(401, "Bad Request");
    }
    return result;
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
        include: {
            Reviews: true,
        },
    });
    if (!result) {
        throw new apiErrors_1.default(401, "Bad Request");
    }
    return result;
});
const getAllAvailableServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findMany({
        where: {
            status: "current",
        },
    });
    if (!result) {
        throw new apiErrors_1.default(401, "Bad Request");
    }
    return result;
});
const getAllUpcomingServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findMany({
        where: {
            status: "up_coming",
        },
    });
    if (!result) {
        throw new apiErrors_1.default(401, "Bad Request");
    }
    return result;
});
const updateSingleService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.update({
        where: {
            id: id,
        },
        data,
    });
    if (!result) {
        throw new apiErrors_1.default(401, "Bad Request");
    }
    return result;
});
const deleteSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.delete({
        where: {
            id,
        },
    });
    if (!result)
        throw new apiErrors_1.default(401, `Service ${id} not found`);
    return result;
});
exports.ServiceServices = {
    createService,
    getAllAvailableServices,
    getAllUpcomingServices,
    getSingleService,
    updateSingleService,
    deleteSingleService,
};
