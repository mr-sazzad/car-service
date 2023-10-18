import { Router } from "express";
import { Roles } from "../../types";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import {
  createBlog,
  deleteSingleBlog,
  getAllBlogs,
  getSingleBlog,
  updateSingleBlog,
} from "./blogController";
import { create, update } from "./blogValidation";

const router = Router();

router.post("/create", auth(Roles.ADMIN), validateRequest(create), createBlog);

router.get("/", getAllBlogs);

router.get("/:id", getSingleBlog);

router.patch(
  "/:id",
  auth(Roles.ADMIN),
  validateRequest(update),
  updateSingleBlog
);

router.delete("/:id", auth(Roles.ADMIN), deleteSingleBlog);

export const BlogRoutes = router;
