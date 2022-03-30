const { Schema, model } = require('mongoose');

const Table = Schema({
    pointsTable: Array,
    appIndex: {
        seoTitle: String,
        webUrl: String
    }
})

module.exports = model('Table', Table);