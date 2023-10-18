import { Feedback } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import prisma from "../../libs/prisma";
import ApiError from "../errors/apiErrors";

const secret = process.env.JWT_SECRET;

const createFeedback = async (token: string, data: Feedback) => {
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const verify = jwtHelpers.verifyToken(token, secret as string);

  if (!verify) {
    throw new ApiError(401, "Unauthorized");
  }

  const decode = jwt.decode(token) as JwtPayload;

  const createData: Feedback = {
    ...data,
    userId: decode?.userId,
  };

  const result = await prisma.feedback.create({ data: createData });

  return result;
};

const getAllFeedback = async (): Promise<Feedback[]> => {
  const result = await prisma.feedback.findMany({
    include: {
      user: true,
    },
  });

  return result;
};

export const FeedbackServices = {
  createFeedback,
  getAllFeedback,
};
