import gql from 'graphql-tag';

export const QUERY_ME = gql`
    {
        me {
        _id
        email
        rooms {
            _id
            roomid
            roomName
            createdAt
            email
        }
        friends {
            _id
            email
            rooms {
                _id
                roomid
                roomName
                createdAt
                email
            }
        }
        }
    }
`;

export const QUERY_USER = gql`
    query user($email: String!) {
        user(email: $email) {
        _id
        }
    }
`;