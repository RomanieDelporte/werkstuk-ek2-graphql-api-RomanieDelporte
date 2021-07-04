/** @format */

const mongoose = require("mongoose");
const GenreSchema = require("./genre");

const SongSchema = new mongoose.Schema({
	id: ID,
	title: String,
	artist: String,
	url: String,
	played: String,
	addedOn: Date,
	genre: [GenreSchema],
});

module.exports = SongSchema;
