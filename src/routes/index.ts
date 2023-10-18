import { Router } from "express";
import { CartRoutes } from "../app/cart/cartRoutes";
import { ReviewsRoutes } from "../app/review/reviewRoutes";
import { servicesRoutes } from "../app/services/serviceRoutes";
import { UserRoutes } from "../app/users/userRoutes";

const router = Router();

router.use("/users", UserRoutes);

router.use("/services", servicesRoutes);

router.use("/cart", CartRoutes);

router.use("/reviews", ReviewsRoutes);

export const globalRoutes = router;
