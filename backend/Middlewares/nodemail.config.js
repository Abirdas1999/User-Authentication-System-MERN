const nodemailer = require("nodemailer");
const {
	Verification_Email_Template,
	Welcome_Email_Template,
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("../mail/EmailTemplate");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // true for port 465, false for other ports
	auth: {
		user: "abirbanti527@gmail.com",
		pass: "hqlynfnfpxzesivr",
	},
});
const SendverificationToken = async (email, verificationToken) => {
	try {
		const response = await transporter.sendMail({
			from: '"💻Random Private Limited💻" <abirbanti527@gmail.com>', // sender address
			to: email, // list of receivers
			subject: "Verify Email", // Subject line
			text: "Verify Email", // plain text body
			html: Verification_Email_Template.replace(
				"{verificationCode}",
				verificationToken
			), // html body
		});
		console.log("Email Send Successfully");
		// console.log(response);
	} catch (error) {
		console.log(error);
	}
};

const SendwelcomeEmail = async (email, name) => {
	try {
		const response = await transporter.sendMail({
			from: '"💻Random Private Limited💻" <abirbanti527@gmail.com>', // sender address
			to: email, // list of receivers
			subject: "Welcome", // Subject line
			text: "Welcome", // plain text body
			html: Welcome_Email_Template.replace("{name}", name),
		});
		console.log("Email send Successfully", response);
	} catch (error) {
		console.log("Email error", error);
	}
};

const SendPasswordResetEmail = async (email, resetURL) => {
	try {
		const response = await transporter.sendMail({
			from: '"💻Random Private Limited💻" <abirbanti527@gmail.com>', // sender address
			to: email, // list of receivers
			subject: "Reset your password", // Subject line
			text: "Password Reset", // plain text body
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
		});
		console.log("Email send Successfully", response);
	} catch (error) {
		console.log("Email error", error);
		throw new Error(`Error to sending password reset email: ${error}`);
	}
};


const SendPasswordResetSuccessEmail = async (email) => {
	try {
		const response = await transporter.sendMail({
			from: '"💻Random Private Limited💻" <abirbanti527@gmail.com>', // sender address
			to: email, // list of receivers
			subject: "Password Reset Successful", // Subject line
			text: "Password Reset", // plain text body
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
		});
		console.log("Password Reset Successful", response);
	} catch (error) {
		console.log("Email error", error);
		throw new Error(`Error to sending password reset email: ${error}`);
	}
};
// SendverificationToken();

module.exports = {
	SendverificationToken,
	SendwelcomeEmail,
	SendPasswordResetEmail,
	SendPasswordResetSuccessEmail,
};
