/** @format */

const { gql } = require("apollo-server");

module.exports = gql`
	scalar Date

	type User {
		id: ID!
		firstname: String
		lastname: String
		email: String
		password: String
		isAdmin: Boolean
	}
	type AuthData {
		userId: ID
		token: String
		firstname: String
		isAdmin: Boolean
	}

	type Playlist {
		id: ID
		title: String
		author: String
		addedOn: Date
		editedOn: Date
		owner: ID
		songs: [Song]
	}

	type Song {
		id: ID!
		title: String
		artist: String
		url: String
		played: String
		addedOn: Date
		genres: [Genre]
	}

	type Genre {
		title: String
		id: ID!
	}
`;
