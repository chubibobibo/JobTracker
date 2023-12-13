//routes for jobs
import { Router } from "express";

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
router.post("/", createJob);
router.post("/:id", getSingleJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
