const Match = require('../models/matches-model');

exports.getMatch = async (req, res) => {
    const matches = await Match.find({})
    res.send(matches[0]);
}