import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import {
  addToCart,
  getAllFromCart,
  getAllPendingCarts,
  getSingleByCartId,
  getSingleFromCart,
  updateSingleCart,
} from "./cartController";
import { create, update } from "./cartValidation";

const router = Router();

router.post("/addToCart", validateRequest(create), addToCart); //auth(Roles.USER),

router.get(
  "/",
  auth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER),
  getAllFromCart
);

router.get("/pending", auth(Roles.ADMIN), getAllPendingCarts);

router.get("/cart-id/:id", getSingleByCartId);

router.get("/:id", getSingleFromCart);

router.patch("/:id", validateRequest(update), updateSingleCart);

export const CartRoutes = router;
