const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const UserSchema = new Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 	},
// 	password: {
// 		type: String,
// 		required: true,
// 	},
// });

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken:{
            type:String
        },
		resetPasswordExpiresAt:{
            type:Date
        } ,
		verificationToken:{
            type:String
        } ,
		verificationTokenExpiresAt:{
            type:Date
        } ,
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema); //(collection name ,attach with the schema)
module.exports = UserModel;
