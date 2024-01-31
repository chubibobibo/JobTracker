//middleware function for authenticating users.
//we will be verifying the cookies first then jwt.
//NOTE: To verify cookies we need the package cookie-parser. import it in the entry point of backend (server.js) then isntantiate it

import { ExpressError } from "../errors/customError.js";
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  //   console.log("hello world");
  //after importing and instantiating cookie parser as a middleware in server.js. We will now have access to the cookie object.
  //destructure the cookie (we named the cookie userCookie upon logging in)
  const { userCookie } = req.cookies;
  //to protect routes we can now check if the destructured cookie exists.
  if (!userCookie) {
    throw new ExpressError("user not authenticated", 401);
  }
  try {
    //req.user is an object that will contain the verified token (using jwt.verify())
    //req.user can be accessed anywahere
    //basically userCookie contains the token we created that contains the userId and the role of the logged in user.
    req.user = jwt.verify(userCookie, process.env.JWT_SECRET);
    //creating testUser having a boolean value if the userId is same as the test user saved in the database.
    const testUser = req.user.userId === "65b234185dd4a8e212eb8388"; //true or false
    //creating new property for test user in the req.user using the value of the boolean returned (testUser), we will need this property for the authentication of a testUser in the routes. This will be needed for to check if the user is a testUser
    req.user.testUser = testUser; //true=test user is logged in
  } catch (err) {
    console.log(err);
  }
  next();
};

//middleware to check if user is test user to restrict certain content
export const checkTestUser = async (req, res, next) => {
  if (req.user.testUser) {
    //boolean checking if true
    throw new ExpressError("Test user, Read Only.", 400);
  }
  next();
};

//authenticating users for role that is admin
// export const authorizePermission = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     throw new ExpressError("user is not authorized", 401);
//   }
//   next();
// };

//refactoired authorizePermission - more reusable
export const authorizePermission = (...role) => {
  //spreading it because sometimes we can pass the admin and user roles so that both of them will have access to a page.
  return (req, res, next) => {
    //callback function for the req,res that checks whether the role of the logged in user is included in the roles that we spread.
    if (!role.includes(req.user.role)) {
      throw new ExpressError("user not authorized", 401);
    }
    next();
  };
};
