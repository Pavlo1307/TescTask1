const { Schema, model } = require('mongoose');

const { databaseTablesEnum: { user } } = require('../config');

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true });

module.exports = model(user, userSchema);
