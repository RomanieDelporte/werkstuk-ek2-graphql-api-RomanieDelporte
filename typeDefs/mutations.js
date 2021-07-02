/** @format */

const { gql } = require("apollo-server");

module.exports = gql`
	type Mutation {
		addPlaylist(playlist: PlaylistInput): Playlist
		addSongToPlaylist(playlistID: ID!, song: SongInput): Playlist
		register(user: UserInput): User
		setPlaylistOwner(userId: ID, playlistId: ID): Playlist
		addAlbum(album: AlbumInput): Album
		addGenreToSong(songId: ID!, genre: GenreInput): Song
	}
`;
