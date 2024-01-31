//import the both models
import { JobModel } from "./models/jobModel.js";
import UserModel from "./models/UserModel.js";

//import filessystem to access the file MOCK-DATA.json from utils
import { readFile } from "fs/promises";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

try {
  //connect ot the database
  mongoose.connect(process.env.MONGO_URL);
  //search for the test user using it's email to use it's id in the createdBy property of each new job entry. This will allow us to restrict which job entries the test user can see.
  const foundTestUser = await UserModel.findOne({ email: "admin@gmail.com" });
  console.log(foundTestUser._id);
  //obtain the MOCK_DATA that we created in the utils folder and parse it as json file.
  const jsonJobs = await JSON.parse(
    await readFile(new URL("./utils/MOCK_DATA.json", import.meta.url))
  );
  //iterate all the job entires from mock data then provide a new property (createdBy) and use the foundTestUser id
  const testUserData = jsonJobs.map((newJsonJobs) => {
    return { ...newJsonJobs, createdBy: foundTestUser._id };
  });
  //delete all existing job entries of the test user (having createdBy: foundTestUser._id)
  await JobModel.deleteMany({ createdBy: foundTestUser._id });
  //create a new instance of jobMOdel after clearing
  console.log(testUserData);
  await JobModel.create(testUserData);
  console.log("success");
  process.exit(0);
} catch (err) {
  console.log(err);
  //   process.exit(1);
}
