//contains logic for the routes
//creating functions that will contain the logic

//imports
import "express-async-errors";
import { JobModel } from "../models/jobModel.js";
import { ExpressError } from "../errors/customError.js";

//all job routes needs an authenticated user.
//get all jobs
export const getAllJobs = async (req, res) => {
  //search functionality
  //destructure the search key from req.query.
  //destructured the keys that we named the queries
  const { search, jobStatus, jobType, sort } = req.query;

  //object that will contain the default argument that we will pass to JobModel.find()
  const queryObj = {
    createdBy: req.user.userId,
  };

  //checking if there is a query named search. If it exists, then create new key (position, location, company) in the queryObj that will be used as argument for the JobModel.find() method.
  //we will be using $OR logical operator because we are going to compare the string from the query (search) against 3 different properties (company, location, position)
  //Then for the value of the key that we created in the queryObj, we  will be using $regex to comapre the string from the query (search) to the 3 properties (company, position, jobLocation) in our JobModel. 'i' is to ignore letter case.
  if (search) {
    queryObj.$or = [
      {
        position: { $regex: search, $options: "i" },
      },
      {
        company: { $regex: search, $options: "i" },
      },
      {
        jobLocation: { $regex: search, $options: "i" },
      },
    ];
  }

  //searching for jobStatus and jobType
  //check if jobStatus and jobtype exist and does not have a value of 'all', then create a new key-value pait in the queryObj having a value that comes  from the query (named jobStatus or jobType)
  if (jobStatus && jobStatus !== "all") {
    queryObj.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType;
  }

  //Sorting functionality dynamically
  //object that will contain the options for sorting
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  //access the value of the key using the string we obtained from the sort query (from req.query)
  const sortingKey = sortOptions[sort];

  const allJobs = await JobModel.find(queryObj).sort(sortingKey); //sorting the result of JobModel.find depending on the string from req.query
  console.log(allJobs);
  if (allJobs.length === 0) {
    // console.log(allJobs);
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

//add uploads folder
