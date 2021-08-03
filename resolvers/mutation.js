/** @format */

const { ApolloError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcrypt");
const pubsub = require("./pubsub");
const { User, Playlist, Album } = require("../mongo/model");

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
		setPlaylistOwner: async (parent, { userId, playlistId }, context) => {
			try {
				const playlistExists = await Playlist.exists({ _id: playlistId });
				if (!playlistExists) throw new ApolloError("No Playlist was found");

				const playlist = await Playlist.findOne({ _id: playlistId });

				playlist.owner = userId;
				playlist.editedOn = new Date();

				return await playlist.save();
			} catch (e) {
				if (e.extensions.code === "UNAUTHENTICATED") throw e;
				else throw new ApolloError(e.message);
			}
		},
		addSongToPlaylist: async (parent, { playlistId, song }, context) => {
			try {
				const playlistExists = await Playlist.exists({ _id: playlistId });
				if (!playlistExists) throw new ApolloError("No playlist was found");

				const playlist = await Playlist.findOne({ _id: playlistId });

				if (context.userId !== playlist.owner) {
					throw new AuthenticationError("User is not allowed to add songs.");
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
		addSongsToAlbum: async (parent, { albumId, song }, context) => {
			try {
				const albumExists = await Album.exists({ _id: albumId });
				if (!albumExists) throw new ApolloError("No playlist was found");

				const album = await Album.findOne({ _id: albumId });

				if (context.userId !== playlist.owner) {
					throw new AuthenticationError("User is not allowed to add songs.");
				}

				album.songs.push(song);
				album.editedOn = new Date();
				const updatedAlbum = await album.save();

				const newAlbum = updatedAlbum.songs[updatedAlbum.songs.length - 1];

				pubsub.publish("SONG_ADDED", { albumAdded: newAlbum });

				return album;
			} catch (e) {
				if (e.extensions.code === "UNAUTHENTICATED") throw e;
				else throw new ApolloError(e.message);
			}
		},
		addAlbum: async (parent, { album }, context) => {
			try {
				return await Album.create({
					...album,
					addedOn: new Date(),
					editedOn: new Date(),
					songs: [],
				});
			} catch (e) {
				if (e.extensions.code === "UNAUTHENTICATED") throw e;
				else throw new ApolloError(e.message);
			}
		},
		deletePlaylist: async (parent, { id }, context) => {
			if (context.userId === "")
				throw new AuthenticationError("Must authenticate");
			if (context.admin) throw new AuthenticationError("Not authorized");

			const playlistsExists = await Playlist.exists({ _id: id });
			if (!playlistsExists) throw new Error("Playlist don't exists");

			const deletePlaylist = await Playlist.findByIdAndDelete(id);

			return `Deleted '${
				deletePlaylist.title ? deletePlaylist.title : "playlist"
			}' is succesfully ended.`;
		},
	},
};
