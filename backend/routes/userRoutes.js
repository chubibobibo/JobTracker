import { Router } from "express";
const router = Router();

//import the user controllers
import { register } from "../controllers/userController.js";

//validation
import { validateRegisterUserInput } from "../middleware/validationMiddleware.js";

router.post("/register", validateRegisterUserInput, register);

export default router;
