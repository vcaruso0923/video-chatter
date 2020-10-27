import gql from 'graphql-tag';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
        }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser( $email: String!, $password: String!) {
        addUser( email: $email, password: $password) {
        token
        user {
            _id
        }
        }
    }
`;

export const CREATE_ROOM = gql`
    mutation createRoom($roomName: String!, $roomid: String!) {
        createRoom(roomName: $roomName, roomid: $roomid) {
            _id
            roomName
            roomid
            createdAt
            email
        }
    }
`;

export const ADD_FRIEND = gql`
    mutation addFriend($id: ID!) {
        addFriend(friendId: $id) {
        _id
        email
        friends {
            _id
            email
            }
        }
    }
`;