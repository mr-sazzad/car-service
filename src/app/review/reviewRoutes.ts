import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import { createReview, getAllReviews } from "./reviewController";

const router = Router();

router.post("/create", auth(Roles.USER), createReview);

router.get("/", getAllReviews);

export const ReviewsRoutes = router;
