import { Router } from "express";
//controller import
import {
  getCurrentUser,
  updateUser,
  getAppStats,
} from "../controllers/adminController.js";
const router = Router();

//import validations
import { validateUpdateUser } from "../middleware/validationMiddleware.js";

//import authorization
import { authorizePermission } from "../middleware/authMiddleware.js";

router.get("/current-user", getCurrentUser);
router.patch("/update-user", validateUpdateUser, updateUser);
router.get("/app-stats", authorizePermission, getAppStats);

export default router;
