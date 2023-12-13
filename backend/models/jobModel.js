import mongoose from "mongoose";
import { JOB_TYPE, JOB_STATUS } from "../utils/constants.js"; //objects that contains the choices for the enum of job status and job type.

const { Schema } = mongoose;
const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      required: true,
      default: "pending",
    },

    jobtype: {
      type: String,
      enum: Object.values(JOB_TYPE),
      required: true,
      default: "part-time",
    },

    jobLocation: {
      type: String,
      required: true,
      default: "Default location",
    },

    createdBy: {
      type: Schema.Types.ObjectId, //destructured mongoose to Schema at top level
      ref: "UserSchema",
    },
  },
  { timestamps: true } //creates a created at and updated at property whenever an instance of job is created.
);

export const JobModel = mongoose.model("JobModel", JobSchema);
