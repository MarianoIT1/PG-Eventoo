const { Router } = require("express");
const {
  register,
  login,
  verifyToken,
  test,
  resetPassword,
  forgotPassword,
  checkResetToken,
  changePassword,
  verifyEmailCode,
  resendEmailCode,
  modifyUser,
  googleAuth,
  getProfile,
} = require("../controllers/user");

const router = Router();

router.post("/register", register);
router.post("/auth", googleAuth);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:reset_token", checkResetToken);
router.get("/", verifyToken, getProfile);
router.put("/reset-password", resetPassword);
router.put("/change-password", verifyToken, changePassword);
router.post("/verify-email", verifyToken, verifyEmailCode);
router.post("/verify-email/resend", verifyToken, resendEmailCode);
router.put("/", verifyToken, modifyUser);



//probar token login
router.get("/test-token", test);

module.exports = router;
