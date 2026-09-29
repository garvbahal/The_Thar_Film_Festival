import { Router } from "express";
import { getAllNotifications, getBrochure } from "../controllers/Home";

const router = Router();

router.get("/getnotifications", getAllNotifications);
router.get("/brochure", getBrochure);

export default router;
