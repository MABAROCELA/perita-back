const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client',
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
