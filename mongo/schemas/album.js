/** @format */

const mongoose = require("mongoose");
const SongSchema = require("./song");

const AlbumSchema = new mongoose.Schema({
	title: String,
	owner: String,
	addedOn: String,
	editedOn: String,
	songs: [SongSchema],
});

module.exports = SongSchema;
