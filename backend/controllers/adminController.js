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

//updating a current user
//This will be updating the user that is the same as the currently logged in user
//using findByIdAndUpdate to search the user that is logged in and update it
export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    req.body,
    { new: true }
  );
  if (!updatedUser) {
    throw new ExpressError("user cannot be updated", 401);
  }
  res
    .status(200)
    .json({ message: `user ${updatedUser.name} is updated`, updatedUser });
};
