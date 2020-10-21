const { Schema, model } = require('mongoose');
const moment = require('moment');

const roomsSchema = new Schema(
    {
        roomid: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
        },
        userEmail: {
            type: String,
            required: true
        },
    },
);

const Rooms = model('Rooms', roomsSchema);

module.exports = Rooms;
