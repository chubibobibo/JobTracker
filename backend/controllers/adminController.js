//model imports
import UserModel from "../models/UserModel.js";
import { JobModel } from "../models/jobModel.js";

export const getCurrentUser = (req, res) => {
  res.status(201).json({ message: "get current user" });
};
