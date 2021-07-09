/** @format */

const mongoose = require("mongoose");

const UserSchema = require("./schemas/user");
const PlaylistSchema = require("./schemas/playlist");
const SongSchema = require("./schemas/song");

const User = mongoose.model("User", UserSchema);
const Playlist = mongoose.model("Playlist", PlaylistSchema);
const Song = mongoose.model("Song", SongSchema);

module.exports = {
	User,
	Playlist,
	Song,
};
