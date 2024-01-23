import { Router } from "express";
//controller import
import {
  getCurrentUser,
  updateUser,
  getAppStats,
} from "../controllers/adminController.js";

//middleware import
import upload from "../middleware/multerMiddleware.js";

const router = Router();

//import validations
import { validateUpdateUser } from "../middleware/validationMiddleware.js";

//import authorization
import { authorizePermission } from "../middleware/authMiddleware.js";

router.get("/current-user", getCurrentUser);
//implement middleware
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUser,
  updateUser
);
router.get("/app-stats", [authorizePermission("admin"), getAppStats]); //only admin can access this.

export default router;
