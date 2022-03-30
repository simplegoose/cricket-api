const Players = require('../models/players-model');

exports.getPlayers = async (req, res) => {
    const players = await Players.find({});
    res.send(players);
}