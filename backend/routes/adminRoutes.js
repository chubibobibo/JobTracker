import { Router } from "express";
//controller import
import { getCurrentUser, updateUser } from "../controllers/adminController.js";
const router = Router();

//import validations
import { validateUpdateUser } from "../middleware/validationMiddleware.js";

router.get("/current-user", getCurrentUser);
router.patch("/update-user", validateUpdateUser, updateUser);

export default router;
