const { Schema, model } = require('mongoose');

const Venues = Schema({
    venue: Array,
    appIndex: {
        seoTitle: String,
        webUrl: String
    }
})

module.exports = model('Venues', Venues);