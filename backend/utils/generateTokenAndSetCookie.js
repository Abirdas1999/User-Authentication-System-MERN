const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
	const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "24h",
	});
	res.cookie("jwtToken", jwtToken, {
		httpOnly: true, //that cant not acceable by javascript and prevent XSS attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", //prevent attack of csrf
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
	return jwtToken;
};
module.exports = generateTokenAndSetCookie;
