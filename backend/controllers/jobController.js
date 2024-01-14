//contains logic for the routes
//creating functions that will contain the logic

//imports
import "express-async-errors";
import { JobModel } from "../models/jobModel.js";
import { ExpressError } from "../errors/customError.js";

//all job routes needs an authenticated user.
//get all jobs
export const getAllJobs = async (req, res) => {
  const author = req.user.userId;
  const allJobs = await JobModel.find({ createdBy: author }); //search for job entries that have the createdBy property same as the req.user.userId.
  console.log(allJobs);
  if (allJobs.length === 0) {
    console.log(allJobs);
    return res.status(200).json({ message: "no jobs available", allJobs });
  }
  res.status(200).json({ message: "Jobs found", allJobs });
};

//create new job
export const createJob = async (req, res) => {
  //   const { company, position } = req.body;
  if (!req.body) {
    throw new ExpressError("No input provided", 401);
  }
  //implement the adding of createdBy property for job entries by using the userId in the cookies and adding it in the req.body before creating a new instance of job
  req.body.createdBy = req.user.userId;
  const newJob = await JobModel.create(req.body);
  res.status(200).json({ message: "New job created", newJob });
};

//get a single job
export const getSingleJob = async (req, res) => {
  //destructure params
  const { id } = req.params;
  const foundSingleJob = await JobModel.findById(id);

  //implmenting an if statement to check if user logged in is not an admin and not an author of the job entry (both true) will result to a thrown ExpressError. Else if one condition or both returns false then proceed to returnong the foundSingleJob.
  //Both conditions need s to be TRUE for the Expresserror to be thrown.
  if (
    req.user.role !== "admin" &&
    foundSingleJob.createdBy.toString() !== req.user.userId
  ) {
    throw new ExpressError("user is not authorized", 401);
  }
  //we have access to the whole job entry data because of foundSingleJob
  res
    .status(200)
    .json({ message: `job ${foundSingleJob._id} found`, foundSingleJob });
};

//Updating a job
export const updateJob = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    throw new ExpressError("no values provided", 400);
  }
  const updateJob = await JobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  }); //new: true reflects the changes immediately in the results.
  res.status(200).json({ message: `job ${id} is updated`, updateJob });
};

//deleting a job
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const deletedJob = await JobModel.findByIdAndDelete(id);
  if (!deletedJob) {
    throw new ExpressError(`no job deleted, job does not exist`);
  }
  res.status(200).json({ message: `job ${id} is deleted` });
};
