import { RequestHandler } from "express";
import { BlogServices } from "./blogServices";

export const createBlog: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const data = req.body;
    const result = await BlogServices.createBlog(token, data);

    res.status(201).json({
      status: 201,
      message: "Blog created successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllBlogs: RequestHandler = async (req, res, next) => {
  try {
    const result = await BlogServices.getAllBlogs();

    res.status(201).json({
      status: 201,
      message: "Blogs retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleBlog: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BlogServices.getSingleBlog(id);

    res.status(201).json({
      status: 201,
      message: "Blog retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleBlog: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const { id } = req.params;
    const data = req.body;
    const result = await BlogServices.updateSingleBlog(token, id, data);

    res.status(201).json({
      status: 201,
      message: "Blog updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleBlog: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const { id } = req.params;
    const result = await BlogServices.deleteSingleBlog(token, id);

    res.status(201).json({
      status: 201,
      message: "Blog removed successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
