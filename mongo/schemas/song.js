/** @format */

const mongoose = require("mongoose");
const AlbumSchema = require("./album");

const GenreSchema = require("./genre");
const SongSchema = new mongoose.Schema({
	title: String,
	artist: String,
	url: String,
	addedOn: Date,
	albums: [AlbumSchema],
	genres: [GenreSchema],
});

module.exports = SongSchema;
