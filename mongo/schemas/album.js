/** @format */

const mongoose = require("mongoose");
const SongSchema = require("./song");

const AlbumSchema = new mongoose.Schema({
	title: String,
	author: String,
	addedOn: Date,
	editedOn: Date,
	songs: [SongSchema],
	image: String,
});

module.exports = AlbumSchema;
