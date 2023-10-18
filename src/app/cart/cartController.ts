import { RequestHandler } from "express";
import { CartServices } from "./cartServices";

export const addToCart: RequestHandler = async (req, res, next) => {
  try {
    const result = await CartServices.addToCart(req.body);

    res.status(201).json({
      status: 201,
      message: "Cart added successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllFromCart: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const result = await CartServices.getAllFromCart(token as string);

    res.status(200).json({
      status: 200,
      message: "Cart retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllPendingCarts: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const result = await CartServices.getAllPendingCarts(token as string);

    res.status(200).json({
      status: 200,
      message: "Cart retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleFromCart: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CartServices.getSingleFromCart(id);

    res.status(201).json({
      status: 201,
      message: "Cart retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleByCartId: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CartServices.getSingleByCartId(id);

    res.status(201).json({
      status: 201,
      message: "Cart retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleCart: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(id, "ID", data, "Data");

    const result = await CartServices.updateSingleCart(id, data);

    res.status(201).json({
      status: 201,
      message: "Cart Updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
