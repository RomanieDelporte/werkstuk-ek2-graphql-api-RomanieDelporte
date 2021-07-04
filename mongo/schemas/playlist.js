/** @format */

const mongoose = require("mongoose");

const SongSchema = require("./song");
const GenreSchema = require("./genre");

const PlaylistSchema = new mongoose.Schema({
	title: String,
	author: String,
	color: String,
	addedOn: Date,
	editedOn: Date,
	owner: String,
	song: [SongSchema],
	genre: [GenreSchema],
});

module.exports = PlaylistSchema;
