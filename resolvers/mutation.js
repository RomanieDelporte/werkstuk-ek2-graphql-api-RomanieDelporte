/** @format */

const { Playlist, Album, User, Song } = require("../mongo/models.js");
const { ApolloError, AuthenticationError } = require("apollo-server");
const pubsub = require("./pubsub");
const bcrypt = require("bcrypt");

module.exports = {
	Mutation: {
		addPlaylist: async (parent, { playlist }, context) => {
			try {
				return await Playlist.create({
					...playlist,
					addedOn: new Date(),
					editedOn: new Date(),
					songs: [],
				});
			} catch (error) {
				if (error.extensions.code === "UNAUTHENTICATED") throw error;
				else throw new ApolloError(error.message);
			}
		},
		AddOwnerToPlaylist: async (parent, { userId, playlistId }, context) => {
			try {
				const playlistExists = await Playlist.exists({ _id: playlistId });
				if (!playlistExists) throw new ApolloError("No playlist was found");

				const playlist = await Playlist.findOne({ _id: playlistId });

				playlist.owner = userId;
				playlist.editedOn = new Date();

				return await playlist.save();
			} catch (error) {
				if (error.extensions.code === "UNAUTHENTICATED") throw error;
				else throw new ApolloError(error.message);
			}
		},
		addSongToPlaylist: async (parent, { playlistId, song }, context) => {
			// get and validate the playlist
			const playlistExists = await Playlist.exists({ _id: playlistId });
			if (!playlistExists) throw new ApolloError("No playlist was found");

			// get the playlist
			const playlist = await Playlist.findOne({ _id: playlistId });

			if (context.userId !== playlist.owner) {
				throw new AuthenticationError("User is not allowed to add songs");
			}

			// add a song to the playlist
			playlist.songs.push(song);
			playlist.editedOn = new Date();
			const updatedPlaylist = await playlist.save();

			// get the new song
			const newSong = updatedPlaylist.songs[updatedPlaylist.songs.length - 1];
			pubsub.publish("SONG_ADDED", { songAdded: newSong });

			return playlist;
		},
		addAlbum: async (parent, { album }, context) => {
			try {
				return await Album.create({
					...album,
					addedOn: new Date(),
					editedOn: new Date(),
					songs: [],
				});
			} catch (error) {
				if (error.extensions.code === "UNAUTHENTICATED") throw error;
				else throw new ApolloError(error.message);
			}
		},
		addGenreToSong: async (parent, { songId, genre }, context) => {
			const songExists = await Song.findOne({ _id: songId });
			if (!songExists) throw new ApolloError("No songs found");

			const song = await Song.findOne({ _id: songId });

			if (context.userId !== playlist.owner) {
				throw new AuthenticationError("User is not allowed to add songs");
			}

			song.genres.push(genre);
			song.editedOn = new Date();
			const updatedGenre = await song.save();

			// get the new song
			const newGenre = updatedGenre.songs[updatedGenre.songs.length - 1];
			pubsub.publish("GENRE_ADDED", { genreAdded: newGenre });

			return song;
		},
		register: async (parent, { user }, context) => {
			const { email, password, firstname, lastname, isAdmin } = user;

			const userExists = await User.exists({ email });
			if (!userExists) throw new Error("User already exists");

			const hashedPassword = bcrypt.hashSync(password, 12);
			const newUser = await User.create({
				email,
				password: hashedPassword,
				firstname,
				lastname,
				isAdmin: false,
			});

			newUser.password = null;

			return newUser;
		},
	},
};
