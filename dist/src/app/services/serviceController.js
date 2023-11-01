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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleService = exports.updateSingleService = exports.getSingleService = exports.getAllUpcomingServices = exports.getAllAvailableServices = exports.getAllServices = exports.createService = void 0;
const serviceServices_1 = require("./serviceServices");
const createService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const data = req.body;
        const result = yield serviceServices_1.ServiceServices.createService(token, data);
        res.status(201).json({
            status: 201,
            message: "Service created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createService = createService;
const getAllServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const result = yield serviceServices_1.ServiceServices.getAllServices(token);
        res.status(200).json({
            status: 200,
            message: "Services retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllServices = getAllServices;
const getAllAvailableServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield serviceServices_1.ServiceServices.getAllAvailableServices();
        res.status(200).json({
            status: 200,
            message: "Current Services retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllAvailableServices = getAllAvailableServices;
const getAllUpcomingServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield serviceServices_1.ServiceServices.getAllUpcomingServices();
        res.status(200).json({
            status: 200,
            message: "Upcoming Services retrieved",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUpcomingServices = getAllUpcomingServices;
const getSingleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield serviceServices_1.ServiceServices.getSingleService(id);
        res.status(200).json({
            status: 200,
            message: "Service retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleService = getSingleService;
const updateSingleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const { id } = req.params;
        const data = req.body;
        const result = yield serviceServices_1.ServiceServices.updateSingleService(token, id, data);
        res.status(200).json({
            status: 200,
            message: "Service updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSingleService = updateSingleService;
const deleteSingleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const { id } = req.params;
        const result = yield serviceServices_1.ServiceServices.deleteSingleService(token, id);
        res.status(200).json({
            status: 200,
            message: "Service deleted successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteSingleService = deleteSingleService;
