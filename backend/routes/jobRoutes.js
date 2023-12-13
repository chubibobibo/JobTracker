//routes for jobs
import { Router } from "express";

import {
  validateJobInput,
  validateParam,
} from "../middleware/validationMiddleware.js";

//invoke router and save it toa variable;
const router = Router();

//imports
import {
  getAllJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

//Routes: accepts path and the controller to be used.
router.get("/", getAllJobs);
router.post("/", validateJobInput, createJob);
router.get("/:id", validateParam, getSingleJob);
router.patch("/:id", validateParam, validateJobInput, updateJob);
router.delete("/:id", validateParam, deleteJob);

export default router;
