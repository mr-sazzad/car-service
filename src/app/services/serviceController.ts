import { RequestHandler } from "express";
import { ServiceServices } from "./serviceServices";

export const createService: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const data = req.body;
    const result = await ServiceServices.createService(token, data);

    res.status(201).json({
      status: 201,
      message: "Service created successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllServices: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const result = await ServiceServices.getAllServices(token);

    res.status(200).json({
      status: 200,
      message: "Services retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllAvailableServices: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const result = await ServiceServices.getAllAvailableServices();

    res.status(200).json({
      status: 200,
      message: "Current Services retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUpcomingServices: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const result = await ServiceServices.getAllUpcomingServices();

    res.status(200).json({
      status: 200,
      message: "Upcoming Services retrieved",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleService: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ServiceServices.getSingleService(id);

    res.status(200).json({
      status: 200,
      message: "Service retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleService: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const { id } = req.params;
    const data = req.body;
    const result = await ServiceServices.updateSingleService(token, id, data);

    res.status(200).json({
      status: 200,
      message: "Service updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleService: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const { id } = req.params;
    const result = await ServiceServices.deleteSingleService(token, id);

    res.status(200).json({
      status: 200,
      message: "Service deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
