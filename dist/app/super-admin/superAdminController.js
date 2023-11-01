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
exports.getSuperAdmin = exports.updateSuperAdmin = exports.createAdmin = void 0;
const superAdminServices_1 = require("./superAdminServices");
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.body;
        const result = yield superAdminServices_1.SuperAdminServices.createAdmin(admin);
        res.status(201).json({
            status: 201,
            message: "Admin created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createAdmin = createAdmin;
const updateSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = yield superAdminServices_1.SuperAdminServices.updateSuperAdmin(id, data);
        res.status(201).json({
            status: 201,
            message: "super_admin Updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSuperAdmin = updateSuperAdmin;
const getSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield superAdminServices_1.SuperAdminServices.getSuperAdmin(id);
        res.status(201).json({
            status: 201,
            message: "super_admin retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSuperAdmin = getSuperAdmin;
