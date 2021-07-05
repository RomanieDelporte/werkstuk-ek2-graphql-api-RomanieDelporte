/**
 * The GraphQL subscription
 *
 * @format
 */

const { gql } = require("apollo-server");

module.exports = gql`
	type Subscription {
		dummyItemAdded: DummyItem
	}
`;
