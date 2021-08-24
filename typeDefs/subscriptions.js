/** @format */

const { gql } = require("apollo-server");

module.exports = gql`
	type Subscription {
		songAdded: Song
		albumAdded: Album
	}
`;
