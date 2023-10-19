// User service Page

import { User } from "@prisma/client";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import prisma from "../../libs/prisma";
import ApiError from "../errors/apiErrors";

import bcryptjs from "bcryptjs";
import { ICredentials } from "../../types";

// environment variables
const SECRET = process.env.JWT_SECRET;
const EXP = process.env.EXPIRE_TIME;

const createUser = async (token: string, user: User): Promise<User | null> => {
  const email = user.email;

  if (user.role === "admin") {
    if (!token) {
      throw new ApiError(409, "Unauthorized access");
    }
    const verify = jwtHelpers.verifyToken(token, SECRET as string);

    if (!verify) {
      throw new ApiError(409, "Unauthorized access");
    }

    const decodeToken = jwt.decode(token) as JwtPayload;

    if (decodeToken?.role !== "super_admin") {
      throw new ApiError(409, "Unauthorized access");
    }
  }

  if (user.role === "super_admin") {
    throw new ApiError(409, "Unauthorized access");
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) throw new ApiError(409, "Conflict Credentials");

  user.password = await bcryptjs.hash(user.password, 12);

  const result = await prisma.user.create({
    data: user,
  });

  if (!result) throw new ApiError(500, "Internal Server Error");

  return result;
};

const loginUser = async (credentials: ICredentials) => {
  const email = credentials.email;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist?.isBanned) {
    throw new ApiError(403, `User ${credentials.email} is Banned`);
  }

  if (!isUserExist) {
    throw new ApiError(404, `User ${credentials.email} does not exist`);
  }

  const isPasswordMatched = await bcryptjs.compare(
    credentials.password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(409, "Invalid Credentials");
  }

  const { id: userId, role } = isUserExist;

  console.log(userId, role);

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    SECRET as Secret,
    EXP as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    SECRET as Secret,
    EXP as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getSingleUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      Cart: true,
    },
  });

  if (!user) throw new ApiError(404, "User not found");

  return user;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({});

  if (!result) throw new ApiError(404, "User not found");

  return result;
};

const getAllAdmins = async (token: string) => {
  if (!token) {
    throw new ApiError(409, "Unauthorized access");
  }
  const verify = jwtHelpers.verifyToken(token, SECRET as string);

  if (!verify) {
    throw new ApiError(409, "Unauthorized access");
  }

  const decodeToken = jwt.decode(token) as JwtPayload;

  if (decodeToken?.role !== "super_admin") {
    throw new ApiError(409, "Unauthorized access");
  }

  const result = await prisma.user.findMany({
    where: {
      role: "admin",
    },
  });

  if (!result) throw new ApiError(404, "User not found");

  return result;
};

const updateSingleUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  if (!result) throw new ApiError(404, "User not found");

  return result;
};

export const UserServices = {
  createUser,
  loginUser,
  getSingleUser,
  getAllUsers,
  updateSingleUser,
  getAllAdmins,
};
