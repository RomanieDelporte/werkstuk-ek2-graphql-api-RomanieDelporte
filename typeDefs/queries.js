/** @format */

const { gql } = require("apollo-server");

module.exports = gql`
	type Query {
		users: [User]
		user(id: ID): User
		login(user: UserInput): AuthData
		playlists: [Playlist]
		playlist(id: ID): Playlist
		albums: [Album]
		album(id: ID): Album
		songs: [Song]
		song(id: ID): Song
		genres: [Genre]
		genre(id: ID): Genre
	}
`;
