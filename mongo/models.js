/** @format */

const mongoose = require("mongoose");

const UserSchema = require("./schemas/user");
const PlaylistSchema = require("./schemas/playlist");
const AlbumSchema = require("./schemas/album");
const GenreSchema = require("./schemas/genre");
const SongSchema = require("./schemas/song");

const Playlist = mongoose.model("Playlist", PlaylistSchema);
const User = mongoose.model("User", UserSchema);
const Album = mongoose.model("Album", AlbumSchema);
const Genre = mongoose.model("Genre", GenreSchema);
const Song = mongoose.model("Song", SongSchema);

module.exports = {
	Playlist,
	User,
	Album,
	Genre,
	Song,
};
