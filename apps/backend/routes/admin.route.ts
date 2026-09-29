import { Router } from "express";
import { auth, isAdmin } from "../middlewares/Auth";
import {
  getAllSubmissions,
  getAllTeams,
  removeMemberFromTeam,
  sendNotification,
  uploadOrUpdateBrochure,
} from "../controllers/Admin";
import { getTeamDetails } from "../controllers/Submission";

const router = Router();

router.get("/admin/teams", auth, isAdmin, getAllTeams);
router.get("/admin/team/:teamId", auth, isAdmin, getTeamDetails);
router.get("/admin/submissions", auth, isAdmin, getAllSubmissions);
router.delete(
  "/admin/team/:teamId/member/:userId",
  auth,
  isAdmin,
  removeMemberFromTeam,
);
router.post("/admin/notification", auth, isAdmin, sendNotification);
router.post("/admin/brochure", auth, isAdmin, uploadOrUpdateBrochure);

export default router;
