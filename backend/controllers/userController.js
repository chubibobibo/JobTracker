import UserModel from "../models/UserModel.js";
import { ExpressError } from "../errors/customError.js";
import "express-async-errors"; //all controllers needs async error checker
import bcrypt from "bcrypt";

//functions that will handle the req,res logic of a route

//creating a user
export const register = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("no data provided", 400);
  }
  const isAdmin = (await UserModel.countDocuments()) === 0; //checks whether the user entry is the first in the UserModel.
  req.body.role = isAdmin ? "admin" : "user";
  //hashing password
  const salt = bcrypt.genSaltSync(12);
  const hashedPwd = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hashedPwd;
  const newUser = await UserModel.create(req.body);
  if (!newUser) {
    throw new ExpressError("registration unsuccessful", 400);
  }
  res.status(200).json({ message: "user registered", newUser });
  //   const isAdmin = (await UserModel.countDocuments()) === 0; //checks whether the user entry is the first in the UserModel.
  //   newUser.role = isAdmin ? "admin" : "user";
  //   newUser.save();
};
