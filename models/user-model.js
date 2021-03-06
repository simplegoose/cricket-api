const mongoose = require('mongoose');

const User = mongoose.Schema({
    email: {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phoneNumber: String,
    resetToken: String,
    expireToken: Date
});

module.exports = mongoose.model('User', User);