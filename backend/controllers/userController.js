import "express-async-errors"; //all controllers needs async error checker
import UserModel from "../models/UserModel.js";
import { ExpressError } from "../errors/customError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

//login user
//data will be coming from the req.body then comparing it to the database
//we will be implementiong JWT tokens and creating cookies once login is successfull.
//UPDATE: implementing  jwt
export const login = async (req, res) => {
  //look for the user using email
  const foundUser = await UserModel.findOne({ email: req.body.email });
  console.log(foundUser);
  if (!foundUser) {
    throw new ExpressError("incorrect email or password", 403);
  }
  //compare pwd from the req.body to the hashed password of the found user.
  const loggedUser = bcrypt.compareSync(req.body.password, foundUser.password); //returns boolean
  if (!loggedUser) {
    throw new ExpressError("incorrect email or password", 403);
  }
  //if foundUser passed compareSync(), proceed to implementing jwt
  //jwt will contain the userId(specific user) and role of the logged in user. provide the secret key which is saved in the env file then provide expiry
  const token = jwt.sign(
    { userId: foundUser._id, role: foundUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  //setting up cookies and using the token created as it's value
  //NOTE: res.cookie to setup a cookie, req.cookie to access cookie
  //cookie accepts the name to be given(userCookie), the data it will contain(token) , then object of options (exipry, httpOnly, secure)
  //http only prevents accessing of cookies by JS running in the server.
  //secure keeps cookies accessible only in https requests.
  res.cookie("userCookie", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //expires in 1 week (1000ms/min/hr/days)
    secure: process.env.NODE_ENV === "production", //sets to true if in production
  });

  res.status(201).json({ message: `user ${foundUser.name} is logged in` });
};

//logout user
//create a new cookie that will expire immediately. Remember to use the same name as the cookie we created during login (userCookie)
export const logout = (req, res) => {
  res.cookie("userCookie", "logout", {
    //'logout' or leave it blank.
    httpOnly: true,
    expires: new Date(Date.now()), //cookie that expires immediately..
  });
  res.status(200).json({ message: "user logged out" });
};
