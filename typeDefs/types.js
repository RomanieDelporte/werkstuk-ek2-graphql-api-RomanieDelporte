/** @format */

const { gql } = require("apollo-server");

module.exports = gql`
	scalar Date

	type User {
		id: ID
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
		addedOn: Date
		editedOn: Date
		owner: ID
		songs: [Song]
		image: String
		visible: Boolean
	}

	type Song {
		id: ID
		title: String
		artist: String
		url: String
		played: String
		addedOn: Date
		genres: [Genre]
		albums: [Album]
	}

	type Genre {
		title: String
		id: ID!
	}

	type Album {
		id: ID
		title: String
		author: String
		addedOn: Date
		editedOn: Date
		songs: [Song]
		image: String
	}
`;
