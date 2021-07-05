/** @format */

const { ApolloError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcrypt");
const { User, Playlist } = require("../mongo/model");

module.exports = {
	Mutation: {
		register: async (parent, { user }, context) => {
			const { firstname, lastname, email, password, isAdmin } = user;

			const getUser = await User.findOne({ email });
			if (getUser) throw new Error("User already exists");

			const hashedPassword = bcrypt.hashSync(password, 12);

			const newUser = await User.create({
				firstname,
				lastname,
				email,
				password: hashedPassword,
				isAdmin: false,
			});

			newUser.password = null;

			return newUser;
		},
		addPlaylist: async (parent, { playlist }, context) => {
			try {
				return await Playlist.create({
					...playlist,
					addedOn: new Date(),
					editedOn: new Date(),
					songs: [],
				});
			} catch (e) {
				if (e.extensions.code === "UNAUTHENTICATED") throw e;
				else throw new ApolloError(e.message);
			}
		},
		addSongToPlaylist: async (parent, { playlistId, song }, context) => {
			try {
				const playlistExists = await Playlist.exists({ _id: playlistId });
				if (!playlistExists) throw new ApolloError("No Playlist was found");

				const playlist = await Playlist.findOne({ _id: playlistId });

				if (context.userId !== playlist.owner) {
					throw new AuthenticationError("User is not allowed to add songs");
				}

				playlist.songs.push(song);
				playlist.editedOn = new Date();
				const updatedPlaylist = await playlist.save();

				const newSong = updatedPlaylist.songs[updatedPlaylist.songs.length - 1];

				pubsub.publish("SONG_ADDED", { songAdded: newSong });

				return playlist;
			} catch (e) {
				if (e.extensions.code === "UNAUTHENTICATED") throw e;
				else throw new ApolloError(e.message);
			}
		},
	},
};
