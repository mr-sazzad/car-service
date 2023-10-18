import { RequestHandler } from "express";
import { FeedbackServices } from "./feedbackServices";

export const createFeedback: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;

    const feedback = req.body;
    const result = await FeedbackServices.createFeedback(token, feedback);

    res.status(201).json({
      status: 201,
      message: "feedback created successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllFeedback: RequestHandler = async (req, res, next) => {
  try {
    const result = await FeedbackServices.getAllFeedback();

    res.status(201).json({
      status: 201,
      message: "feedbacks retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
