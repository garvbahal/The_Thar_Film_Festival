const experss = require("express");
const router = experss.Router();

const { auth, isParticipant, isAdmin } = require("../middlewares/auth");
const { requestOTP, signup, login, logout } = require("../controllers/Auth");
const { verifyOtp } = require("../middlewares/verifyOTP");

const { submitLink, getTeamDetails } = require("../controllers/Submission");
const {
    getTeamDetailsAdmin,
    getAllSubmissions,
    getAllTeams,
    removeMemberFromTeam,
    sendNotification,
    uploadOrUpdateBrochure,
} = require("../controllers/Admin");

const { getAllNotifications, getBrochure } = require("../controllers/Home");

// Auth Routes
router.post("/signup/request_otp", requestOTP);
router.post("/signup/verifyOtp", verifyOtp, signup);
router.post("/login", login);
router.post("/logout", logout);

// Participant routes
router.get("/team", auth, isParticipant, getTeamDetails);
router.post("/submit", auth, isParticipant, submitLink);

// Admin Routes
router.get("/me", auth, (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
});
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

// Home routes
router.get("/getnotifications", getAllNotifications);
router.get("/brochure", getBrochure);

module.exports = router;
