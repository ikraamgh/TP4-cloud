const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: String,
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef'
    },
    temps_preparation: Number,
    difficulte: String
});

const RecettesModel = mongoose.model('Recette', recetteSchema);

module.exports = RecettesModel;