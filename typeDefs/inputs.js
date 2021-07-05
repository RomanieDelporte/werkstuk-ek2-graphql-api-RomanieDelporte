/** @format */

const { gql } = require("apollo-server");

module.exports = gql`
	input UserInput {
		id: ID
		firstname: String
		lastname: String
		email: String
		password: String
		isAdmin: Boolean
	}

	input SongInput {
		id: ID
		title: String
		artist: String
		url: String
		played: String
		addedOn: Date
		genres: [GenreInput]
	}

	input PlaylistInput {
		id: ID
		title: String
		author: String
		addedOn: Date
		editedOn: Date
		owner: ID
		songs: [SongInput]
	}

	input GenreInput {
		title: String
		id: ID
	}

	input AlbumInput {
		id: ID
		title: String
		owner: String
		addedOn: Date
		editedOn: Date
		songs: [SongInput]
	}
`;
