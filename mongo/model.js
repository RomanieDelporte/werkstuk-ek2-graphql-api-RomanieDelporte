/** @format */

const mongoose = require("mongoose");

const UserSchema = require("./schemas/user");
const PlaylistSchema = require("./schemas/playlist");
const User = mongoose.model("User", UserSchema);
const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = {
	User,
	Playlist,
};
