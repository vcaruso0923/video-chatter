const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Rooms } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('rooms')
                    .populate('friends')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('rooms');
        },
        // get a user by email
        user: async (parent, { email }) => {
            return User.findOne({ email })
                .select('-__v -password')
                .populate('friends')
                .populate('rooms');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true })
                .populate('friends')
                .populate('rooms');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        createRoom: async (parent, args, context) => {
            if (context.user) {
                const rooms = await Rooms.create({ ...args, email: context.user.email });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { rooms: rooms._id } },
                    { new: true }
                );
                return rooms;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;