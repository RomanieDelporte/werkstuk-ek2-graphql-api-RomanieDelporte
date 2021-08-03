/** @format */

const mongoose = require("mongoose");

const SongSchema = require("./song");
const PlaylistSchema = new mongoose.Schema({
	title: String,
	addedOn: Date,
	editedOn: Date,
	owner: String,
	image: String,
	songs: [SongSchema],
});

module.exports = PlaylistSchema;
