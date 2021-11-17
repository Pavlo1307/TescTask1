const { Schema, model } = require('mongoose');

const { databaseTablesEnum: { user }, userRoles: { DRIVER, ADMIN } } = require('../config');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
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
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: DRIVER,
        enum: [
            DRIVER,
            ADMIN
        ]
    },

}, { timestamps: true });

module.exports = model(user, userSchema);
