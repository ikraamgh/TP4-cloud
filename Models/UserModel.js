const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nom_complet: {
        type: String,
        required: true,
        minlength: 5
    },
    username: {
        type: String,
        required: true,
        minlength: 5
    },
    mdp: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;