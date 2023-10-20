import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import { createFeedback, getAllFeedback } from "./feedbackController";

const router = Router();

router.post("/create", auth(Roles.USER), createFeedback);

router.get("/", getAllFeedback);

export const feedbackRoutes = router;
