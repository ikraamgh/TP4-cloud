const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true
    },
    annee_ouverture: Number,
    capacite: Number
});

const RestaurantsModel = mongoose.model('Restaurant', restaurantSchema);

module.exports = RestaurantsModel;
