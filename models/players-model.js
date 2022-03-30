const { Schema, model } = require('mongoose');

const Player = Schema({
    squadId: Number,
    players: Array
})

module.exports = model('Player', Player);