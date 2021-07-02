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
		genre: [genreInput]
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
`;
