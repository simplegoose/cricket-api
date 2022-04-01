const Players = require('../models/players-model');

exports.getPlayers = async (req, res) => {
    const players = await Players.find({});
    res.send(players);
}

exports.getPlayersWithId = async (req, res) => {
    const { id } = req.query;
    const players = await Players.find({ squadId: id});
    res.send(players);
}   