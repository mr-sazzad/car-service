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
exports.updateSingleCart = exports.getSingleByCartId = exports.getSingleFromCart = exports.getAllPendingCarts = exports.getAllFromCart = exports.addToCart = void 0;
const cartServices_1 = require("./cartServices");
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cartServices_1.CartServices.addToCart(req.body);
        res.status(201).json({
            status: 201,
            message: "Cart added successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.addToCart = addToCart;
const getAllFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const result = yield cartServices_1.CartServices.getAllFromCart(token);
        res.status(200).json({
            status: 200,
            message: "Cart retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllFromCart = getAllFromCart;
const getAllPendingCarts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const result = yield cartServices_1.CartServices.getAllPendingCarts(token);
        res.status(200).json({
            status: 200,
            message: "Cart retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllPendingCarts = getAllPendingCarts;
const getSingleFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield cartServices_1.CartServices.getSingleFromCart(id);
        res.status(201).json({
            status: 201,
            message: "Cart retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleFromCart = getSingleFromCart;
const getSingleByCartId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield cartServices_1.CartServices.getSingleByCartId(id);
        res.status(201).json({
            status: 201,
            message: "Cart retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleByCartId = getSingleByCartId;
const updateSingleCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        console.log(id, "ID", data, "Data");
        const result = yield cartServices_1.CartServices.updateSingleCart(id, data);
        res.status(201).json({
            status: 201,
            message: "Cart Updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSingleCart = updateSingleCart;
