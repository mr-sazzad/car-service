import { Service } from "@prisma/client";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import prisma from "../../libs/prisma";
import ApiError from "../errors/apiErrors";

import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const createService = async (
  token: string,
  data: Service
): Promise<Service | null> => {
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const verify = jwtHelpers.verifyToken(token, secret as string);

  if (!verify) {
    throw new ApiError(401, "Unauthorized");
  }

  const decodeToken = jwt.decode(token) as JwtPayload;

  if (decodeToken?.role !== "admin") {
    throw new ApiError(401, "Unauthorized");
  }
  const result = await prisma.service.create({
    data,
  });
  if (!result) {
    throw new ApiError(401, "Bad Request");
  }

  return result;
};

const getSingleService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      Reviews: true,
    },
  });
  if (!result) {
    throw new ApiError(401, "Bad Request");
  }

  return result;
};

const getAllServices = async (token: string): Promise<Service[] | null> => {
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const verify = jwtHelpers.verifyToken(token, secret as string);

  if (!verify) {
    throw new ApiError(401, "Unauthorized");
  }

  const decodeToken = jwt.decode(token) as JwtPayload;

  if (decodeToken?.role !== "admin") {
    throw new ApiError(401, "Unauthorized");
  }

  const result = await prisma.service.findMany({});
  if (!result) {
    throw new ApiError(401, "Bad Request");
  }

  return result;
};

const getAllAvailableServices = async (): Promise<Service[] | null> => {
  const result = await prisma.service.findMany({
    where: {
      status: "current",
    },
  });
  if (!result) {
    throw new ApiError(401, "Bad Request");
  }

  return result;
};

const getAllUpcomingServices = async (): Promise<Service[] | null> => {
  const result = await prisma.service.findMany({
    where: {
      status: "up_coming",
    },
  });
  if (!result) {
    throw new ApiError(401, "Bad Request");
  }

  return result;
};

const updateSingleService = async (
  token: string,
  id: string,
  data: Partial<Service>
): Promise<Service | null> => {
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const verify = jwtHelpers.verifyToken(token, secret as string);

  if (!verify) {
    throw new ApiError(401, "Unauthorized");
  }

  const decodeToken = jwt.decode(token) as JwtPayload;

  if (decodeToken?.role !== "admin") {
    throw new ApiError(401, "Unauthorized");
  }
  const result = await prisma.service.update({
    where: {
      id: id,
    },
    data,
  });
  if (!result) {
    throw new ApiError(401, "Bad Request");
  }

  return result;
};

const deleteSingleService = async (
  token: string,
  id: string
): Promise<Service | null> => {
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const verify = jwtHelpers.verifyToken(token, secret as string);

  if (!verify) {
    throw new ApiError(401, "Unauthorized");
  }

  const decodeToken = jwt.decode(token) as JwtPayload;

  if (decodeToken?.role !== "admin") {
    throw new ApiError(401, "Unauthorized");
  }
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });

  if (!result) throw new ApiError(401, `Service ${id} not found`);

  return result;
};

export const ServiceServices = {
  createService,
  getAllAvailableServices,
  getAllServices,
  getAllUpcomingServices,
  getSingleService,
  updateSingleService,
  deleteSingleService,
};
