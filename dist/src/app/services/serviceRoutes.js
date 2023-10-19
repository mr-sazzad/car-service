"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesRoutes = void 0;
const express_1 = require("express");
const types_1 = require("../../types");
const auth_1 = __importDefault(require("../middlewares/auth"));
const serviceController_1 = require("./serviceController");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(types_1.Roles.ADMIN, types_1.Roles.SUPER_ADMIN), serviceController_1.createService);
router.get("/", serviceController_1.getAllAvailableServices);
router.get("/up-coming", serviceController_1.getAllUpcomingServices);
router.get("/:id", serviceController_1.getSingleService);
router.patch("/:id", serviceController_1.updateSingleService);
router.delete("/:id", serviceController_1.deleteSingleService);
exports.servicesRoutes = router;
