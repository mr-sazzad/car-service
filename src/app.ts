import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { globalRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: 200,
    message: "Welcome from Assignment 9",
    author: "sazzad karim",
  });
});

app.use("/api/v1", globalRoutes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
