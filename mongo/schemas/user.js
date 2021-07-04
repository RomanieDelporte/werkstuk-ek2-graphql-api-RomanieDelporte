/** @format */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	password: String,
	isAdmin: Boolean,
});

module.exports = UserSchema;
