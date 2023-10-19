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
exports.deleteSingleBlog = exports.updateSingleBlog = exports.getSingleBlog = exports.getAllBlogs = exports.createBlog = void 0;
const blogServices_1 = require("./blogServices");
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const data = req.body;
        const result = yield blogServices_1.BlogServices.createBlog(token, data);
        res.status(201).json({
            status: 201,
            message: "Blog created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createBlog = createBlog;
const getAllBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blogServices_1.BlogServices.getAllBlogs();
        res.status(201).json({
            status: 201,
            message: "Blogs retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllBlogs = getAllBlogs;
const getSingleBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield blogServices_1.BlogServices.getSingleBlog(id);
        res.status(201).json({
            status: 201,
            message: "Blog retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleBlog = getSingleBlog;
const updateSingleBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const { id } = req.params;
        const data = req.body;
        const result = yield blogServices_1.BlogServices.updateSingleBlog(token, id, data);
        res.status(201).json({
            status: 201,
            message: "Blog updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSingleBlog = updateSingleBlog;
const deleteSingleBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const { id } = req.params;
        const result = yield blogServices_1.BlogServices.deleteSingleBlog(token, id);
        res.status(201).json({
            status: 201,
            message: "Blog removed successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteSingleBlog = deleteSingleBlog;
