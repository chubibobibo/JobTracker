//model imports
import UserModel from "../models/UserModel.js";
import { JobModel } from "../models/jobModel.js";
import { ExpressError } from "../errors/customError.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs"; //fs=filesystem, this will be used to remove the images saved in public/uploads using fs.unlink.

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
  console.log(obj);
  //updateUser is relying on the req.body for data to update. we need to check if req.file exist (from multer) to use it's value for the avatarUrl and avatarPublicId properties of the UserModel..
  if (req.file) {
    //uploading to cloudinary, remeber to await it takes time for cloudinary
    const response = await cloudinary.v2.uploader.upload(req.file.path); //.path indicates the location of the image in locally (public/uploads)
    await fs.unlink(req.file.path); //removes the image in the public/uploads folder once upload to cloudinary succeed.
    //setting values to the properties in the req.body (we destructured to obj) with data coming from the response of cloudinary.
    obj.avatarUrl = response.secure_url; //secure_url=link of image provided by cloudinary
    obj.avatarPublicId = response.public_id; //public_id of photo from cloudinary
    //NOTE: public_id from cloudinary will be needed to destroy when we upload a new image
  }
  const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, obj, {
    new: true,
  });
  if (!updatedUser) {
    throw new ExpressError("user cannot be updated", 401);
  }
  res
    .status(200)
    .json({ message: `user ${updatedUser.name} is updated`, updatedUser });
};

//obtain number of users and jobs entries in the app
export const getAppStats = async (req, res) => {
  const totalUsers = await UserModel.countDocuments();
  const totalJobs = await JobModel.countDocuments();
  res.status(201).json({ totalUsers, totalJobs });
};
