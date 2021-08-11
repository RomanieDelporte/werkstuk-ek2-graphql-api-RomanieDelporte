/** @format */

const mongoose = require("mongoose");

const GenreSchema = require("./genre");
const SongSchema = new mongoose.Schema({
	title: String,
	artist: String,
	url: String,
	addedOn: Date,
	genres: [GenreSchema],
});

module.exports = SongSchema;
