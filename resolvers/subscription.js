/** @format */

const pubsub = require("./pubsub");

module.exports = {
	Subscription: {
		songAdded: { subscribe: () => pubsub.asyncIterator("SONG_ADDED") },
		genreAdded: { subscribe: () => pubsub.asyncIterator("GENRE_ADDED") },
	},
};
