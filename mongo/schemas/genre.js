/** @format */

const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
	id: ID,
	title: String,
});

module.exports = GenreSchema;
