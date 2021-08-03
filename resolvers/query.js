/** @format */

const { AuthenticationError } = require("apollo-server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Playlist, Album } = require("../mongo/model");

module.exports = {
	Query: {
		playlists: () => Playlist.find(),
		playlist: (parent, { id }) => Playlist.findOne({ _id: id }),
		albums: () => Album.find(),
		album: (parent, { id }) => Album.findOne({ _id: id }),
		login: async (parent, { user }, context) => {
			const { email, password } = user;

			const getUser = await User.findOne({ email });
			if (!getUser) throw new Error("user does not exist!");
			console.log(getUser);

			const isEquel = bcrypt.compareSync(password, getUser.password);
			if (!isEquel) throw new Error("Password is incorrect");

			const token = jwt.sign(
				{
					userId: getUser._id,
					email: getUser.email,
					isAdmin: getUser.isAdmin,
					firstname: getUser.firstname,
				},
				process.env.TOKEN_SALT,
				{ expiresIn: "1h" },
			);
			return {
				firstname: getUser.firstname,
				userId: getUser._id,
				token,
				isAdmin: getUser.isAdmin,
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
