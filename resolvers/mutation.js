/** @format */

const bcrypt = require("bcrypt");
const { User } = require("../mongo/model");

module.exports = {
	Mutation: {
		register: async (parent, { user }, context) => {
			const { firstname, lastname, email, password, isAdmin } = user;

			const getUser = await User.findOne({ email });
			if (getUser) throw new Error("User already exists");

			const hashedPassword = bcrypt.hashSync(password, 12);

			const newUser = await User.create({
				firstname,
				lastname,
				email,
				password: hashedPassword,
				isAdmin: false,
			});

			newUser.password = null;

			return newUser;
		},
	},
};
