import { Router } from "express";
import { login, logout, requestOTP, signup } from "../controllers/Auth";
import { auth } from "../middlewares/Auth";

const router = Router();

router.post("/signup/request_otp", requestOTP);
router.post("/signup/verifyOtp", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", auth, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
