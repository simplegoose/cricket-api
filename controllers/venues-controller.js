const Venues = require('../models/venues-model');

exports.getVenues = async (req, res) => {
    const venues = await Venues.find({});
    res.send(venues[0]);
}