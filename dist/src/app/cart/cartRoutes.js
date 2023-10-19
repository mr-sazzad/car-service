"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const types_1 = require("../../types");
const auth_1 = __importDefault(require("../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const cartController_1 = require("./cartController");
const cartValidation_1 = require("./cartValidation");
const router = (0, express_1.Router)();
router.post("/addToCart", (0, validateRequest_1.default)(cartValidation_1.create), cartController_1.addToCart); //auth(Roles.USER),
router.get("/", (0, auth_1.default)(types_1.Roles.ADMIN, types_1.Roles.SUPER_ADMIN, types_1.Roles.USER), cartController_1.getAllFromCart);
router.get("/pending", (0, auth_1.default)(types_1.Roles.ADMIN), cartController_1.getAllPendingCarts);
router.get("/cart-id/:id", cartController_1.getSingleByCartId);
router.get("/:id", cartController_1.getSingleFromCart);
router.patch("/:id", (0, validateRequest_1.default)(cartValidation_1.update), cartController_1.updateSingleCart);
exports.CartRoutes = router;
