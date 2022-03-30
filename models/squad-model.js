const { Schema, model } = require('mongoose');

const Squad = Schema({
    squadAnnouncedList: Array,
    appIndex: {
        seoTitle: String,
        webUrl: String,
    }
})

module.exports = model('Squad', Squad);