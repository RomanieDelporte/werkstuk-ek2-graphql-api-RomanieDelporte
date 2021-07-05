/** @format */

const { AuthenticationError } = require("apollo-server");
const bcrypt = require("bcrypt");
const { isEqualType } = require("graphql");
const jwt = require("jsonwebtoken");
const { User } = require("../mongo/model");

module.exports = {
	Query: {
		login: async (parent, { user }, context) => {
			const { email, password } = user;

			const getUser = await User.findOne({ email });
			if (!getUser) throw new Error("user does not exist!");

			const isEqual = bcrypt.compareSync(password, getUser.password);
			if (!isEqual) throw new Error("Password is incorrect");

			const token = jwt.sign(
				{
					userId: getUser._id,
					email: getUser.email,
					firstname: getUser.firstname,
					isAdmin: getUser.isAdmin,
				},
				process.env.TOKEN_SALT,
				{ expiresIn: "1h" },
			);
			return {
				firstname: getUser.firstname,
				userId: getUser._id,
				token,
				isAdmin: getUser.isAdmin,
			};
		},
		users: (parent, params, context) => {
			if (context.userId === "")
				throw new AuthenticationError("Must authenticate");
			else return User.find();
		},
		user: (parent, { id }, context) => {
			if (context.userId === "")
				throw new AuthenticationError("Must authenticate");
			else return User.findOne({ _id: id });
		},
	},
};
