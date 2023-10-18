import { SuperAdmin, User } from "@prisma/client";
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

const getSuperAdmin = async (id: string): Promise<SuperAdmin | null> => {
  const result = await prisma.superAdmin.findUnique({
    where: {
      id,
    },
  });

  if (!result) throw new ApiError(409, "No SuperAdmin found");

  return result;
};

const updateSuperAdmin = async (
  id: string,
  data: Partial<SuperAdmin>
): Promise<SuperAdmin | null> => {
  const isSuperAdminExist = await prisma.superAdmin.findFirst({
    where: {
      id,
    },
  });

  if (!isSuperAdminExist) throw new ApiError(409, "Super Admin already exists");

  const result = await prisma.superAdmin.update({
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
