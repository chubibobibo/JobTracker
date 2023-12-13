//middlware to validate all input in routes

//express error validator that will be used to check the req.body for input forms
import { body, param, validationResult } from "express-validator";
import { ExpressError } from "../errors/customError.js"; //we need to throw an error if validation fails.
import { JOB_TYPE, JOB_STATUS } from "../utils/constants.js"; //these are objects that contains the choices for job status and job types that is used in the enum values in the JobModel.
import mongoose from "mongoose"; //used to compare params id to mongo  database id.
import { JobModel } from "../models/jobModel.js";

//NOTEL:::This part is reusable to other projects.

//create a function that will handle the error
//This function will accept an array (validateValues) of valeus to be validated.
//then this function will return the array we passed as an argument and an error response
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

//saving the function to handle validation errors to avariable that we can export.
//then pass the values from the req.body (jobInput) that needs validating.
//using body() we will specify the name of the input which are validating. then chaining different validations (refer to deocumentation)
//NOTE: for jobType and jobStatus we are using isIn() to check whether the input is one of the values that we created in the object constants.
//NOTE: custom() should always by async
export const validateJobInput = withValidationErrors([
  //company input field validation
  body("company")
    .notEmpty()
    .withMessage("company should not be empty")
    .isLength({ max: 15 })
    .withMessage("company name should not exceed 15 characters"),
  //position input field validation
  body("position")
    .notEmpty()
    .withMessage("position should not be empty")
    .isLength({ max: 15 })
    .withMessage("position should not exceed 15 characters"),
  //jobLocation input field validation
  body("jobLocation")
    .notEmpty()
    .withMessage("job location should not be empty"),
  //job status input field validation
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid job status value"),
  //job type input field validation
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid job type value"),
]);

//validation of params by comparing it to the mongoDb ids. (should import mongoose)
//we used custom() as a validator because we are going to execute a callback async function to check the validity of the id (params) using mongo queries(Object.Type.ObjectId())
//NOTE: remember to include param in the import of express-validator
export const validateParam = withValidationErrors([
  param("id").custom(async (value) => {
    const validMongoId = mongoose.Types.ObjectId.isValid(value); //checks the value (passed id) if valid mongoDb id
    //with the codes below checking for the validity of the id and if a job entry is found, we can now cleanup the jobController and get rid of the validation.
    if (!validMongoId) {
      throw new ExpressError("not a valid MongoDb id", 404);
    }
    const foundJob = await JobModel.findById(value);
    if (!foundJob) {
      throw new ExpressError("No job found", 404);
    }
  }),
]);
