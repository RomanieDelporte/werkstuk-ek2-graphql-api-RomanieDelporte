/** @format */

const { gql } = require("apollo-server");

module.exports = gql`
	type Mutation {
		register(user: UserInput): User
		addSongToPlaylist(playlistId: ID!, song: SongInput): Playlist
		addPlaylist(playlist: PlaylistInput):Playlist
		setPlaylistOwner(userId: ID, playlistId: ID): Playlist
		addAlbum(album: AlbumInput): Album
		addSongsToAlbum(albumId: ID, song: SongInput): Album
	}
`;
