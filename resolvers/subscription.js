/** @format */

const pubsub = require("./pubsub");

module.exports = {
	Subscription: {
		dummyItemAdded: {
			subscribe: () => pubsub.asyncIterator("DUMMYITEM_ADDED"),
		},
	},
};
