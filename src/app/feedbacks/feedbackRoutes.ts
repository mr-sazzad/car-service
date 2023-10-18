import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import { createFeedback, getAllFeedback } from "./feedbackController";
import { create } from "./feedbackValidation";

const router = Router();

router.post(
  "/create",
  validateRequest(create),
  auth(Roles.USER),
  createFeedback
);

router.get("/", getAllFeedback);

export const feedbackRoutes = router;
