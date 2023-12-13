//contains logic for the routes
//creating functions that will contain the logic

//imports
import "express-async-errors";
import { JobModel } from "../models/jobModel.js";
import { ExpressError } from "../errors/customError.js";

//get all jobs
export const getAllJobs = async (req, res) => {
  const allJobs = await JobModel.find({}); //search for eveything.
  //   console.log(allJobs);
  if (allJobs.length === 0) {
    return res.status(200).json({ message: "no jobs available" });
  }
  res.status(200).json({ message: "Jobs found", allJobs });
};

//create new job
export const createJob = async (req, res) => {
  //   const { company, position } = req.body;
  if (!req.body) {
    throw new ExpressError("No input provided", 401);
  }
  const newJob = await JobModel.create(req.body);
  res.status(200).json({ message: "New job created", newJob });
};

//get a single job
export const getSingleJob = async (req, res) => {
  //destructure params
  const { id } = req.params;
  const foundSingleJob = await JobModel.findById(id);
  if (!foundSingleJob) {
    return res.status(404).json({ message: "Job does not exist" });
  }
  res
    .status(200)
    .json({ message: `job ${foundSingleJob._id} found`, foundSingleJob });
};

//Updating a job
export const updateJob = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    return res.status(404).json({ message: "no input provided" });
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
    return res.status(404).json({ message: "no job exist" });
  }
  res.status(200).json({ message: `job ${id} is deleted` });
};
