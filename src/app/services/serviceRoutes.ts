import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import {
  createService,
  deleteSingleService,
  getAllAvailableServices,
  getAllServices,
  getAllUpcomingServices,
  getSingleService,
  updateSingleService,
} from "./serviceController";
import { create, update } from "./serviceValidation";

const router = Router();

router.post(
  "/create",
  auth(Roles.ADMIN),
  validateRequest(create),
  createService
);

router.get("/", getAllAvailableServices);

router.get("/all", auth(Roles.ADMIN), getAllServices);

router.get("/up-coming", getAllUpcomingServices);

router.get("/:id", getSingleService);

router.patch(
  "/:id",
  auth(Roles.ADMIN),
  validateRequest(update),
  updateSingleService
);

router.delete("/:id", auth(Roles.ADMIN), deleteSingleService);

export const servicesRoutes = router;
