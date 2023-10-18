import { Review } from "@prisma/client";
import prisma from "../../libs/prisma";
import ApiError from "../errors/apiErrors";

const createReview = async (data: Review): Promise<Review | null> => {
  const userId = data.userId;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, `User ${userId} not found`);
  }

  const serviceId = data.serviceId;

  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
    },
  });

  if (!service) throw new ApiError(404, `Service ${serviceId} not found`);

  const result = await prisma.review.create({ data });

  return result;
};

const getAllReviews = async (): Promise<Review[] | null> => {
  const result = await prisma.review.findMany({
    include: {
      user: true,
    },
  });

  return result;
};
export const ReviewServices = {
  createReview,
  getAllReviews,
};
