/** @format */

const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
	title: String,
});

module.exports = GenreSchema;
