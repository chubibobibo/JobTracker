import { Router } from "express";
const router = Router();

//import the user controllers
import { register, login } from "../controllers/userController.js";

//validation
import {
  validateRegisterUserInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

router.post("/register", validateRegisterUserInput, register);
router.post("/login", validateLoginInput, login);

export default router;
