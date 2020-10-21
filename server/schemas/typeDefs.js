// import the gql tagged template function
const { gql } = require('apollo-server-express');


// create our typeDefs
const typeDefs = gql`
    type Rooms {
        _id: ID
        roomid: String
        createdAt: String
        userEmail: String
    }

    type User {
        _id: ID
        email: String
        rooms: [Rooms]
        friends: [User]
    }

    type Query {
        me: User
        users: [User]
        user(email: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
        addFriend(friendId: ID!): User
        createRoom(roomid: String!): Rooms
    }  

    type Auth {
        token: ID!
        user: User
    }
`;

// export the typeDefs
module.exports = typeDefs;