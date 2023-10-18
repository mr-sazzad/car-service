import { Blog } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import prisma from "../../libs/prisma";
import ApiError from "../errors/apiErrors";

const secret = process.env.JWT_SECRET;

const createBlog = async (token: string, data: Blog): Promise<Blog | null> => {
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

  const result = await prisma.blog.create({ data });

  return result;
};

const getAllBlogs = async (): Promise<Blog[] | null> => {
  const result = await prisma.blog.findMany({});

  return result;
};

const getSingleBlog = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleBlog = async (
  token: string,
  id: string,
  data: Partial<Blog>
): Promise<Blog | null> => {
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

  const result = await prisma.blog.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteSingleBlog = async (
  token: string,
  id: string
): Promise<Blog | null> => {
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

  const result = await prisma.blog.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateSingleBlog,
  deleteSingleBlog,
};
