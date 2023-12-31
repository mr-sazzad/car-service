import { User } from "@prisma/client";
import prisma from "../../libs/prisma";
import ApiError from "../errors/apiErrors";

import bcrypt from "bcryptjs";

const createAdmin = async (admin: User): Promise<User | null> => {
  const email = admin.email;
  let password = admin.password;

  const isAdminExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (isAdminExist) throw new ApiError(409, "Admin already exists");

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await prisma.user.create({
    data: {
      ...admin,
      password: hashedPassword,
    },
  });

  return result;
};

const getSuperAdmin = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
      role: "super_admin",
    },
  });

  if (!result) throw new ApiError(409, "No SuperAdmin found");

  return result;
};

const updateSuperAdmin = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const isSuperAdminExist = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isSuperAdminExist) throw new ApiError(409, "Unable to find");

  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

export const SuperAdminServices = {
  createAdmin,
  getSuperAdmin,
  updateSuperAdmin,
};
