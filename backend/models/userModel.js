const e = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor agrega un nombre"]
    },
    email: {
        type: String,
        required: [true, "Por favor agrega un email"],
    },
    password: {
        type: String,
        required: [true, "Por favor agrega una contraseña"],
    },
    esAdmin: {
        type: Boolean,
        default: false
    },
        timestamps: true,
});

module.exports = mongoose.model('User', userSchema);