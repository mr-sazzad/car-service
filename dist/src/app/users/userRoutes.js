"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const types_1 = require("../../types");
const auth_1 = __importDefault(require("../middlewares/auth"));
const userController_1 = require("./userController");
const router = (0, express_1.Router)();
router.post("/sign-up", userController_1.createUser);
router.post("/login", userController_1.loginUser);
router.get("/admins", (0, auth_1.default)(types_1.Roles.SUPER_ADMIN), userController_1.getAllAdmins);
router.get("/", userController_1.getAllUsers);
router.get("/:id", userController_1.getSingleUser);
router.patch("/:id", userController_1.updateSingleUser);
exports.UserRoutes = router;
