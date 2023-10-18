import { RequestHandler } from "express";
import { SuperAdminServices } from "./superAdminServices";

export const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const admin = req.body;
    const result = await SuperAdminServices.createAdmin(admin);

    res.status(201).json({
      status: 201,
      message: "Admin created successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSuperAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await SuperAdminServices.updateSuperAdmin(id, data);

    res.status(201).json({
      status: 201,
      message: "super_admin Updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSuperAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SuperAdminServices.getSuperAdmin(id);

    res.status(201).json({
      status: 201,
      message: "super_admin retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
