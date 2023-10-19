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
exports.updateSingleUser = exports.getAllAdmins = exports.getAllUsers = exports.getSingleUser = exports.loginUser = exports.createUser = void 0;
const userServices_1 = require("./userServices");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const user = req.body;
        const result = yield userServices_1.UserServices.createUser(token, user);
        res.status(201).json({
            status: 201,
            message: "User Created Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = req.body;
        const result = yield userServices_1.UserServices.loginUser(credentials);
        const { refreshToken, accessToken } = result;
        res.status(201).json({
            status: 201,
            message: "User loggedIn Successfully",
            data: accessToken,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.loginUser = loginUser;
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield userServices_1.UserServices.getSingleUser(id);
        res.status(200).json({
            status: 200,
            message: "User retrieved Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleUser = getSingleUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userServices_1.UserServices.getAllUsers();
        res.status(201).json({
            status: 201,
            message: "User retrieved Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUsers = getAllUsers;
const getAllAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const result = yield userServices_1.UserServices.getAllAdmins(token);
        res.status(201).json({
            status: 201,
            message: "Admins retrieved Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllAdmins = getAllAdmins;
const updateSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        console.log(req.body, "Data");
        const result = yield userServices_1.UserServices.updateSingleUser(id, data);
        res.status(201).json({
            status: 201,
            message: "User Updated Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSingleUser = updateSingleUser;
