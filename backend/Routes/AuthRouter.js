const router = require("express").Router();

const { signup, login, verification, logout, forgotPassword, resetPassword, checkAuth } = require("../Controllers/AuthController");
const {
	signupValidation,
	loginValidation,
} = require("../Middlewares/AuthValidation");
const { verifyToken } = require("../Middlewares/verifyToken");

// **********************GET api**************************//

//router for login
// router.get('/login', (req,res) =>{
//     res.send("This is Log in")
// });

router.get("/check-auth", verifyToken, checkAuth);

// **********************post api**************************//

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

router.post("/verification", verification);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.post("/logout", logout);


module.exports = router;
