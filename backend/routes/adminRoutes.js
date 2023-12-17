import { Router } from "express";
//controller import
import { getCurrentUser, updateUser } from "../controllers/adminController.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.patch("/update-user", updateUser);

export default router;
