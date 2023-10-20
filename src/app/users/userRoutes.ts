import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import {
  createAdmin,
  createUser,
  getAllAdmins,
  getAllUsers,
  getSingleUser,
  loginUser,
  updateSingleUser,
} from "./userController";
import { create, update } from "./userValidation";

const router = Router();

router.post("/sign-up", validateRequest(create), createUser);

router.post("/create-admin", validateRequest(create), createAdmin);

router.post("/login", loginUser);

router.get("/admins", auth(Roles.SUPER_ADMIN), getAllAdmins);

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.patch("/:id", validateRequest(update), updateSingleUser);

export const UserRoutes = router;
