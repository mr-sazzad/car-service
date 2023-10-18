import { RequestHandler } from "express";
import { ReviewServices } from "./reviewServices";

export const createReview: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await ReviewServices.createReview(data);

    res.status(201).json({
      status: 201,
      message: "Review created successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllReviews: RequestHandler = async (req, res, next) => {
  try {
    const result = await ReviewServices.getAllReviews();

    res.status(201).json({
      status: 201,
      message: "Reviews Retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
