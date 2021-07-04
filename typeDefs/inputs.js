/** @format */

const { gql } = require("apollo-server");

module.exports = gql`
	input PlaylistInput {
		title: String
		author: String
		owner: ID
		songs: [SongInput]
	}

	input SongInput {
		title: String
		artist: String
		url: String
		played: String
		genres: [genreInput]
	}

	input Genre {
		id: ID!
		genre: String
	}

	input UserInput {
		id: ID
		firstname: String
		lastname: String
		email: String
		password: String
		isAdmin: Boolean
	}

	input AlbumInput {
		id: ID
		title: String
		author: String
		releaseDate: String
		albumCover: String
		addedOn: Date
		editedOn: Date
		genres: [genreInput]
		songs: [songsInput]
	}
`;
