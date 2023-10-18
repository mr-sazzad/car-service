import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import {
  createService,
  deleteSingleService,
  getAllAvailableServices,
  getAllUpcomingServices,
  getSingleService,
  updateSingleService,
} from "./serviceController";

const router = Router();

router.post("/create", auth(Roles.ADMIN, Roles.SUPER_ADMIN), createService);

router.get("/", getAllAvailableServices);

router.get("/up-coming", getAllUpcomingServices);

router.get("/:id", getSingleService);

router.patch("/:id", updateSingleService);

router.delete("/:id", deleteSingleService);

export const servicesRoutes = router;
