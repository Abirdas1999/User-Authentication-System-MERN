const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserModel = require("../Models/User");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetcookie");
const {
	SendverificationToken,
	SendwelcomeEmail,
	SendPasswordResetEmail,
	SendPasswordResetSuccessEmail,
} = require("../Middlewares/nodemail.config.js");
const { date } = require("joi");

const signup = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const userAlreadyExists = await UserModel.findOne({ email });
		// console.log(userAlreadyExists);

		if (userAlreadyExists) {
			return res.status(409).json({
				message: "User is already exist, you can login",
				success: false,
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const verificationToken = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		const userModel = new UserModel({
			name,
			email,
			password: hashedPassword,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24hour
		});

		await userModel.save();
		SendverificationToken(userModel.email, verificationToken);

		// jwt
		generateTokenAndSetCookie(res, userModel._id);

		res.status(201).json({
			message: "Signup successfully...",
			success: true,
			userModel: {
				...userModel._doc,
				password: undefined,
			},
		});
	} catch (err) {
		res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });
		const errorMsg = "Auth failed email or password is wrong";

		if (!user) {
			return res.status(403).json({ message: errorMsg, success: false });
		}

		const isPassEqual = await bcrypt.compare(password, user.password);
		if (!isPassEqual) {
			return res.status(403).json({ message: errorMsg, success: false });
		}
		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			message: "Login Success",
			success: true,
			name: user.name,
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (err) {
		console.log("Error to login", err);
		res.status(500).json({
			message: "Internal server errror",
			success: false,
		});
	}
};

const verification = async (req, res) => {
	try {
		const { code } = req.body;
		const user = await UserModel.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "Inavlid or Expired Code" });
		}
		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();
		await SendwelcomeEmail(user.email, user.name);
		return res.status(200).json({
			success: true,
			message: "Email Verifed Successfully",
			user: { ...user._doc, password: undefined },
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "internal server error" });
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await UserModel.findOne({
			email,
		});
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "User Not Found" });
		}

		//generate reset token

		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpireAt = Date.now() + 10 * 60 * 1000; //10minit

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpireAt;

		await user.save();

		//send email
		await SendPasswordResetEmail(
			user.email,
			`${process.env.CLINT_URL}/reset-password/${resetToken}`
		);
		//${process.env.CLINT_URL}/reset-password/${resetToken}===> this is reset url

		return res.status(200).json({
			success: true,
			message: "Reset Lint Send to Your Email Successfully",
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "internal server error" });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await UserModel.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid or expired Reset token" });
		}

		//update password
		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;

		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;

		await user.save();

		//send email
		await SendPasswordResetSuccessEmail(user.email);
		//${process.env.CLINT_URL}/reset-password/${resetToken}===> this is reset url

		return res.status(200).json({
			success: true,
			message: "Password Reset Successfully",
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "internal server error" });
	}
};

const logout = async (req, res) => {
	res.clearCookie("jwtToken");
	res.status(200).json({ success: true, message: "Logged out Successfully" });
};

const checkAuth = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId).select("-password");
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

module.exports = {
	signup,
	login,
	verification,
	logout,
	forgotPassword,
	resetPassword,
	checkAuth,
};
