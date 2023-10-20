import { Cart } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../libs/prisma";
import ApiError from "../errors/apiErrors";

const addToCart = async (data: Cart) => {
  const isExist = await prisma.cart.findFirst({
    where: {
      service: data.service,
      userId: data.userId,
    },
    include: {
      user: true,
    },
  });

  if (isExist) {
    await prisma.cart.update({
      where: {
        id: isExist.id,
      },
      data: {
        service: data.service,
        status: "in_progress",
        user: {
          connect: {
            id: data.userId,
          },
        },
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        confirmedDate: data.confirmedDate,
      },
    });
    return isExist;
  } else {
    const result = await prisma.cart.create({ data });
    if (!result) throw new ApiError(400, "Bad request");
    return result;
  }
};

const getAllFromCart = async (token: string): Promise<Cart[] | null> => {
  if (!token) throw new ApiError(400, "Bad request");

  const decodedToken = jwt.decode(token);
  console.log(decodedToken);

  const { userId } = decodedToken as JwtPayload;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) throw new ApiError(400, "Bad Request");

  const result = await prisma.cart.findMany({
    where: {
      userId,
    },
  });

  if (result.length === 0) {
    throw new ApiError(400, "Your cart is empty");
  }

  return result;
};

const getSingleFromCart = async (
  token: string,
  id: string
): Promise<Cart | null> => {
  if (!token) throw new ApiError(400, "Bad request");

  const decodedToken = jwt.decode(token);

  const { userId } = decodedToken as JwtPayload;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) throw new ApiError(400, "Bad Request");

  const result = await prisma.cart.findFirst({
    where: {
      service: id,
      userId,
    },
  });

  return result;
};

const getSingleByCartId = async (id: string): Promise<Cart | null> => {
  const result = await prisma.cart.findFirst({
    where: {
      id,
    },
  });

  return result;
};

const getAllPendingCarts = async (token: string): Promise<Cart[] | null> => {
  if (!token) throw new ApiError(400, "Bad request");

  const decodedToken = jwt.decode(token);

  const { userId } = decodedToken as JwtPayload;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) throw new ApiError(400, "Bad Request");
  const result = await prisma.cart.findMany({
    where: {
      status: {
        not: "in_progress",
      },
    },
  });
  return result;
};

const updateSingleCart = async (
  id: string,
  data: Partial<Cart>
): Promise<Cart> => {
  const service = await prisma.cart.findFirst({
    where: {
      id,
    },
  });

  if (!service) throw new ApiError(404, "Service not found");

  const result = await prisma.cart.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

export const CartServices = {
  addToCart,
  getAllFromCart,
  getSingleFromCart,
  updateSingleCart,
  getAllPendingCarts,
  getSingleByCartId,
};
