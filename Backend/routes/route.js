const experss = require("express");
const router = experss.Router();

const { auth, isParticipant, isAdmin } = require("../middlewares/auth");
const { signUpLeader, memberSignUp, login } = require("../controllers/Auth");

const { submitLink, getTeamDetails } = require("../controllers/Submission");
const {
    getTeamDetailsAdmin,
    getAllSubmissions,
    getAllTeams,
    removeMemberFromTeam,
    sendNotification,
    uploadOrUpdateBrochure,
} = require("../controllers/Admin");

// Auth Routes
router.post("/signup/leader", signUpLeader);
router.post("/signup/member", memberSignUp);
router.post("/login", login);

// Participant routes
router.get("/team", auth, isParticipant, getTeamDetails);
router.post("/submit", auth, isParticipant, submitLink);

// Admin Routes
router.get("/admin/teams", auth, isAdmin, getAllTeams);
router.get("/admin/team/:teamId", auth, isAdmin, getTeamDetailsAdmin);
router.get("/admin/submissions", auth, isAdmin, getAllSubmissions);
router.delete(
    "/admin/team/:teamId/member/:userId",
    auth,
    isAdmin,
    removeMemberFromTeam
);
router.post("/admin/notification", auth, isAdmin, sendNotification);
router.post("/admin/brochure", auth, isAdmin, uploadOrUpdateBrochure);

module.exports = router;
