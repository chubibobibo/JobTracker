import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { ExpressError } from "./errors/customError.js";

import morgan from "morgan";
//limiting use of morgan only during development
if (process.env.NODE_ENV === "development") {
  //middlware to use morgan(http logger) using the dev option.
  app.use(morgan("dev"));
}

const app = express();

//middleware to parse JSON data
app.use(express.json());

//sample route
app.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ExpressError("Something went wrong", 401);
  }
  return res.status(200).json({ message: `${name}` });
});

//midlleware to handle error for pages not found.
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found!" });
});

//express error handler that will accept errors in all routes and requests.
app.use((err, req, res, next) => {
  //   const { status = 400, message = "Something went wrong" } = err;
  const status = err.status || 400;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
