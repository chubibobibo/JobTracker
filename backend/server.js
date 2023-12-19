import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { ExpressError } from "./errors/customError.js";
import mongoose from "mongoose";
//routes
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

//middleware auth
import { authenticateUser } from "./middleware/authMiddleware.js";

//parsing cookies.
import cookieParser from "cookie-parser";

import morgan from "morgan";
//limiting use of morgan only during development
if (process.env.NODE_ENV === "development") {
  //middlware to use morgan(http logger) using the dev option.
  app.use(morgan("dev"));
}

const app = express();

app.use(cors());
//middleware to parse JSON data
app.use(express.json());
//middleware to parse cookies
app.use(cookieParser());

//connecting to database
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

//middleware to use routes
app.use("/api/jobs", authenticateUser, jobRouter); //specifies a prefix then the router exported.
app.use("/api/users", userRouter);
app.use("/api/admin", authenticateUser, adminRouter);

//midlleware to handle error for pages not found.
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found!" });
});

//express error handler that will accept errors in all routes and requests.
app.use((err, req, res, next) => {
  //   const { status = 400, message = "Something went wrong" } = err;
  const status = err.status || 400;
  const message = err.message || "Something went wrong";
  console.log(err);
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
