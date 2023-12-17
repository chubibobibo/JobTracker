//model imports
import UserModel from "../models/UserModel.js";
import { JobModel } from "../models/jobModel.js";
import { ExpressError } from "../errors/customError.js";

//getCurrentUser will be used whenver we wnat to verify the current user logged in.
export const getCurrentUser = async (req, res) => {
  //not implementing if statement to check whether req.user exist. we will pass the authMiddleware to it's route.
  //did not implement the removal of password in the response json of currentUser.
  console.log(req.user);
  const currentUser = await UserModel.findById(req.user.userId);
  res.status(201).json({ currentUser });
};

//updating a user
export const updateUser = async (req, res) => {
  const foundUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: `user ${foundUser.name} is updated` });
};
