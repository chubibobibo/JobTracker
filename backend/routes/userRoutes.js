import { Router } from "express";
const router = Router();

//import the user controllers
import { register } from "../controllers/userController.js";

router.post("/register", register);

export default router;
