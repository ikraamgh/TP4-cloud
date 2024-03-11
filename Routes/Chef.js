const express = require('express');
const router = express.Router();
const ChefModel = require('../Models/ChefsModel');
const RecettesModel = require('../Models/RecettesModel');

router.get('/all', (req, res) => {
    ChefModel.find({}, (err, chefs) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des chefs." });
        } else {
            res.status(200).json(chefs);
        }
    });
});

router.get('/names', (req, res) => {
    ChefModel.find({}, 'nom', (err, names) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des noms de chefs." });
        } else {
            res.status(200).json(names);
        }
    });
});

router.get('/recettes', (req, res) => {
    ChefModel.aggregate([
        { $lookup: { from: 'recettes', localField: '_id', foreignField: 'chef', as: 'recettes' } },
        { $project: { nom: 1, nombre_recettes: { $size: "$recettes" } } }
    ], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération du nombre de recettes par chef." });
        } else {
            res.status(200).json(result);
        }
    });
});

router.post('/add', (req, res) => {
    const newChef = new ChefModel(req.body);
    newChef.save((err, chef) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de l'ajout du chef." });
        } else {
            res.status(201).json(chef);
        }
    });
});

router.put('/update/:name', (req, res) => {
    const name = req.params.name;
    ChefModel.findOneAndUpdate({ nom: name }, req.body, { new: true }, (err, chef) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du chef." });
        } else {
            res.status(200).json(chef);
        }
    });
});

router.delete('/delete/:name', (req, res) => {
    const name = req.params.name;
    ChefModel.findOneAndDelete({ nom: name }, (err, chef) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la suppression du chef." });
        } else {
            res.status(200).json({ message: "Chef supprimé avec succès." });
        }
    });
});

module.exports = router;
