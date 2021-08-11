/** @format */

const mongoose = require("mongoose");

const UserSchema = require("./schemas/user");
const PlaylistSchema = require("./schemas/playlist");
const SongSchema = require("./schemas/song");
const AlbumSchema = require("./schemas/album");
const GenreSchema = require("./schemas/genre");

const User = mongoose.model("User", UserSchema);
const Playlist = mongoose.model("Playlist", PlaylistSchema);
const Song = mongoose.model("Song", SongSchema);
const Album = mongoose.model("Album", AlbumSchema);
const Genre = mongoose.model("Genre", GenreSchema);

module.exports = {
	User,
	Playlist,
	Song,
	Album,
	Genre,
};
