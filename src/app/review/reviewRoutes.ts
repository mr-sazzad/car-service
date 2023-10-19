import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import { createReview, getAllReviews } from "./reviewController";
import { create } from "./reviewValidation";

const router = Router();

router.post("/create", auth(Roles.USER), validateRequest(create), createReview);

router.get("/", getAllReviews);

export const ReviewsRoutes = router;
