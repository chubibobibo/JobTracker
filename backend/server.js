import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//image hosting
import cloudinary from "cloudinary";

import { ExpressError } from "./errors/customError.js";
import mongoose from "mongoose";
//routes
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

//serving public folder
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//middleware auth
import { authenticateUser } from "./middleware/authMiddleware.js";

//parsing cookies.
import cookieParser from "cookie-parser";

//serving public folder
const __dirname = dirname(fileURLToPath(import.meta.url));

import morgan from "morgan";
//limiting use of morgan only during development
if (process.env.NODE_ENV === "development") {
  //middlware to use morgan(http logger) using the dev option.
  app.use(morgan("dev"));
}

const app = express();

//CONFIGURING cloudinary env variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

//serving public folder. Then npm run build in the frontend to create the folder dist. Copy it's content to the public folder in backend.
app.use(express.static(path.resolve(__dirname, "./public")));
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

//access to index.html in frontend
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

//midlleware to handle error for pages not found.
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found!" });
});

//express error handler that will accept errors in all routes and requests.
app.use((err, req, res, next) => {
  //   const { status = 400, message = "Something went wrong" } = err;
  const status = err.status || 404;
  const message = err.message || "Something went wrong";
  console.log(err);
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
