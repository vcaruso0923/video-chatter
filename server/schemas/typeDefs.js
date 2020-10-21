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

    }

    type Mutation {

    }  

    type Auth {
        
    }
`;

// export the typeDefs
module.exports = typeDefs;