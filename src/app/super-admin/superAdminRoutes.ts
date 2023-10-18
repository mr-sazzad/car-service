import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import {
  createAdmin,
  getSuperAdmin,
  updateSuperAdmin,
} from "./superAdminController";
import { update } from "./superAdminValidation";

const router = Router();

router.post(
  "/create-admin",
  auth(Roles.SUPER_ADMIN),
  // validateRequest(create),
  createAdmin
);

router.get("/:id", auth(Roles.SUPER_ADMIN), getSuperAdmin);

router.get(
  "/:id",
  auth(Roles.SUPER_ADMIN),
  validateRequest(update),
  updateSuperAdmin
);

export const SuperAdminRoutes = router;
