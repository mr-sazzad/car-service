"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const types_1 = require("../../types");
const auth_1 = __importDefault(require("../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const blogController_1 = require("./blogController");
const blogValidation_1 = require("./blogValidation");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(types_1.Roles.ADMIN), (0, validateRequest_1.default)(blogValidation_1.create), blogController_1.createBlog);
router.get("/", blogController_1.getAllBlogs);
router.get("/:id", blogController_1.getSingleBlog);
router.patch("/:id", (0, auth_1.default)(types_1.Roles.ADMIN), (0, validateRequest_1.default)(blogValidation_1.update), blogController_1.updateSingleBlog);
router.delete("/:id", (0, auth_1.default)(types_1.Roles.ADMIN), blogController_1.deleteSingleBlog);
exports.BlogRoutes = router;
