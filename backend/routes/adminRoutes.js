import { Router } from "express";
//controller import
import { getCurrentUser } from "../controllers/adminController.js";
const router = Router();

router.get("/current-user", getCurrentUser);

export default router;
