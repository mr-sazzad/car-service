import { Service } from "@prisma/client";
import prisma from "../../libs/prisma";
import ApiError from "../errors/apiErrors";

const createService = async (data: Service): Promise<Service | null> => {
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
  id: string,
  data: Partial<Service>
): Promise<Service | null> => {
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

const deleteSingleService = async (id: string): Promise<Service | null> => {
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
  getAllUpcomingServices,
  getSingleService,
  updateSingleService,
  deleteSingleService,
};
