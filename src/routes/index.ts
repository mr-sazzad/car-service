import { Router } from "express";
import { BlogRoutes } from "../app/blog/blogRoutes";
import { CartRoutes } from "../app/cart/cartRoutes";
import { feedbackRoutes } from "../app/feedbacks/feedbackRoutes";
import { ReviewsRoutes } from "../app/review/reviewRoutes";
import { servicesRoutes } from "../app/services/serviceRoutes";
import { SuperAdminRoutes } from "../app/super-admin/superAdminRoutes";
import { UserRoutes } from "../app/users/userRoutes";

const router = Router();

router.use("/users", UserRoutes);

router.use("/services", servicesRoutes);

router.use("/cart", CartRoutes);

router.use("/reviews", ReviewsRoutes);

router.use("/feedbacks", feedbackRoutes);

router.use("/blogs", BlogRoutes);

router.use("/super-admin", SuperAdminRoutes);

export const globalRoutes = router;
