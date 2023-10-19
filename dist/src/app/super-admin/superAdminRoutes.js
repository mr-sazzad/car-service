"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRoutes = void 0;
const express_1 = require("express");
const types_1 = require("../../types");
const auth_1 = __importDefault(require("../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const superAdminController_1 = require("./superAdminController");
const superAdminValidation_1 = require("./superAdminValidation");
const router = (0, express_1.Router)();
router.post("/create-admin", (0, auth_1.default)(types_1.Roles.SUPER_ADMIN), 
// validateRequest(create),
superAdminController_1.createAdmin);
router.get("/:id", (0, auth_1.default)(types_1.Roles.SUPER_ADMIN), superAdminController_1.getSuperAdmin);
router.get("/:id", (0, auth_1.default)(types_1.Roles.SUPER_ADMIN), (0, validateRequest_1.default)(superAdminValidation_1.update), superAdminController_1.updateSuperAdmin);
exports.SuperAdminRoutes = router;
