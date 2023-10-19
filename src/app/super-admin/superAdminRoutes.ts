import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import {
  createAdmin,
  getSuperAdmin,
  updateSuperAdmin,
} from "./superAdminController";

const router = Router();

router.post("/create-admin", auth(Roles.SUPER_ADMIN), createAdmin);

router.get("/:id", auth(Roles.SUPER_ADMIN), getSuperAdmin);

router.get("/:id", auth(Roles.SUPER_ADMIN), updateSuperAdmin);

export const SuperAdminRoutes = router;
