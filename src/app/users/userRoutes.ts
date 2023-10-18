import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import {
  createUser,
  getAllAdmins,
  getAllUsers,
  getSingleUser,
  loginUser,
  updateSingleUser,
} from "./userController";

const router = Router();

router.post("/sign-up", createUser);

router.post("/login", loginUser);

router.get("/admins", auth(Roles.SUPER_ADMIN), getAllAdmins);

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.patch("/:id", updateSingleUser);

export const UserRoutes = router;
