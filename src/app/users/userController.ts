import { RequestHandler } from "express";
import { UserServices } from "./userServices";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    const user = req.body;
    const result = await UserServices.createUser(token, user);

    res.status(201).json({
      status: 201,
      message: "User Created Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const credentials = req.body;
    const result = await UserServices.loginUser(credentials);

    const { refreshToken, accessToken } = result;

    res.status(201).json({
      status: 201,
      message: "User loggedIn Successfully",
      data: accessToken,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getSingleUser(id);

    res.status(200).json({
      status: 200,
      message: "User retrieved Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.getAllUsers();

    res.status(201).json({
      status: 201,
      message: "User retrieved Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const result = await UserServices.getAllAdmins(token as string);

    res.status(201).json({
      status: 201,
      message: "Admins retrieved Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(req.body, "Data");

    const result = await UserServices.updateSingleUser(id, data);

    res.status(201).json({
      status: 201,
      message: "User Updated Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
