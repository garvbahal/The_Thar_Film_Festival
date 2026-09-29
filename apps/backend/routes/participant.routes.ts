import { Router } from "express";
import { auth, isParticipant } from "../middlewares/Auth";
import { getTeamDetails, submitLink } from "../controllers/Submission";

const router = Router();

router.get("/team", auth, isParticipant, getTeamDetails);
router.post("/submit", auth, isParticipant, submitLink);

export default router;
