const { Schema, model } = require('mongoose');

const Match = Schema({
    adWrapper: Array
})

module.exports = model('Match', Match);