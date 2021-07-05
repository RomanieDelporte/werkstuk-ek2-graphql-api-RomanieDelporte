/** @format */

const { gql } = require("apollo-server");

module.exports = gql`
	type Mutation {
		register(user: UserInput): User
	}
`;
