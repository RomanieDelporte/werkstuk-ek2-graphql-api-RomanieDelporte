/** @format */

const mongoose = require("mongoose");

const GenreSchema = require("./genre");
const SongSchema = new mongoose.Schema({
	title: String,
	artist: String,
	url: String,
	genres: [GenreSchema],
});

module.exports = SongSchema;
