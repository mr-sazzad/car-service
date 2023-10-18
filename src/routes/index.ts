import { Router } from "express";
import { servicesRoutes } from "../app/services/serviceRoutes";
import { UserRoutes } from "../app/users/userRoutes";

const router = Router();

router.use("/users", UserRoutes);

router.use("/services", servicesRoutes);

export const globalRoutes = router;
