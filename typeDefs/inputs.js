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
		id: ID!
		title: String
		artist: String
		url: String
		played: String
		addedOn: Date
		genres: [GenreInput]
		albums: [AlbumInput]
	}

	input PlaylistInput {
		id: ID
		title: String
		addedOn: Date
		editedOn: Date
		owner: ID
		songs: [SongInput]
		image: String
		visible: Boolean
	}

	input GenreInput {
		title: String
		id: ID
	}

	input AlbumInput {
		id: ID
		title: String
		author: String
		addedOn: Date
		editedOn: Date
		songs: [SongInput]
		image: String
	}
`;
