const { Schema, model } = require('mongoose');
const moment = require('moment');

const roomsSchema = new Schema(
    {
        roomid: {
            type: String,
            required: true,
            unique: true,
        },
        roomName: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
        },
        email: {
            type: String,
            required: true
        },
    },
);

const Rooms = model('Rooms', roomsSchema);

module.exports = Rooms;
