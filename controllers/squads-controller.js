const Squads = require('../models/squad-model');

exports.getSquads = async (req, res) => {
    const squads = await Squads.find({});
    res.send(squads[0]);
}