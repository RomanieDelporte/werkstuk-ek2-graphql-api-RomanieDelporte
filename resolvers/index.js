/** @format */
const scalars = require("./scalars");
const query = require("./query");
const mutation = require("./mutation");
// const subscription = require("./subscription");
const pubsub = require("./pubsub");

module.exports = [scalars, query, mutation, pubsub];
