const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Rooms } = require('../models');

const resolvers = {
}

module.exports = resolvers;