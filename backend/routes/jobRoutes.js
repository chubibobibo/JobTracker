//routes for jobs
import { Router } from "express";

//invoke router and save it toa variable;
const router = Router();

//imports
import { getAllJobs } from "../controllers/jobController.js";

//Routes
router.get("/", getAllJobs);

export default router;
