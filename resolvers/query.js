/** @format */

const { Playlist, Album, User, Genre, Song } = require("../mongo/models.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AuthenticationError } = require("apollo-server");

module.exports = {
	Query: {
		playlists: () => Playlist.find(),
		playlist: (parent, { id }) => Playlist.findOne({ _id: id }),
		albums: () => Album.find(),
		album: (parent, { id }) => Album.findOne({ _id: id }),
		genres: () => Genre.find(),
		genre: (parent, { id }) => Genre.findOne({ _id: id }),
		songs: () => Song.find(),
		song: (parent, { id }) => Song.findOne({ _id: id }),
		login: async (parent, { user }, context) => {
			const { email, password } = user;
			const userExists = await User.exists({ email });
			if (!userExists) throw new Error("User does not exist.");

			const getUser = await User.findOne({ email: email });

			const isCorrect = bcrypt.compareSync(password, getUser.password);
			if (!isCorrect) throw new Error("Password is incorrect, Try again.");

			const token = jwt.sign(
				{ userId: getUser._id, email: getUser.email },
				process.env.TOKEN_SALT,
				{ expiresIn: "1h" },
			);

			return {
				userId: getUser.id,
				token,
			};
		},

		users: (parent, params, context) => {
			if (context.userId === "")
				throw new AuthenticationError("Must authenticate");
			else return User.find();
		},
		user: (parent, { id }, context) => {
			if (context.userId === "")
				throw new AuthenticationError("Must authenticate");
			else return User.findOne({ _id: id });
		},
	},
};
