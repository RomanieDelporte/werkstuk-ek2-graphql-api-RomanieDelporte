/** @format */

const { gql } = require("apollo-server");

module.exports = gql`
	input UserInput {
		id: ID
		firstname: String
		lastname: String
		email: String
		password: String
		isAdmin: Boolean
	}
`;
