/** @format */

const mongoose = require("mongoose");
const SongSchema = require("./song");
const GenreSchema = require("./genre");

const AlbumSchema = new mongoose.Schema({
	title: String,
	author: String,
	ReleaseDate: String,
	lengthOfTime: Int,
	albumCover: String,
	addedOn: Date,
	song: [SongSchema],
	genre: [GenreSchema],
});

module.exports = AlbumSchema;
