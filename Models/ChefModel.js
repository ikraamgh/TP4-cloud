const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    specialite: String,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
});

const ChefsModel = mongoose.model('Chef', chefSchema);

module.exports = ChefsModel;
