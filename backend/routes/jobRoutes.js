//routes for jobs
import { Router } from "express";

import {
  validateJobInput,
  validateParam,
} from "../middleware/validationMiddleware.js";

//importing test user middleware
import { checkTestUser } from "../middleware/authMiddleware.js";

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
router.post("/", checkTestUser, validateJobInput, createJob);
router.get("/:id", validateParam, getSingleJob);
router.patch("/:id", checkTestUser, validateParam, validateJobInput, updateJob);
router.delete("/:id", checkTestUser, validateParam, deleteJob);

export default router;
