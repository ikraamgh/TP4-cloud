const express = require('express');
const router = express.Router();
const RecetteModel = require('../Models/RecettesModel');

router.get('/all', (req, res) => {
    RecetteModel.find({}, (err, recettes) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des recettes." });
        } else {
            res.status(200).json(recettes);
        }
    });
});

router.get('/names', (req, res) => {
    RecetteModel.find({}, 'nom', (err, names) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des noms de recettes." });
        } else {
            res.status(200).json(names);
        }
    });
});

router.post('/add', (req, res) => {
    const newRecette = new RecetteModel(req.body);
    newRecette.save((err, recette) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de l'ajout de la recette." });
        } else {
            res.status(201).json(recette);
        }
    });
});

router.put('/update/:name', (req, res) => {
    const name = req.params.name;
    RecetteModel.findOneAndUpdate({ nom: name }, req.body, { new: true }, (err, recette) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de la recette." });
        } else {
            res.status(200).json(recette);
        }
    });
});

// Route pour supprimer une recette
router.delete('/delete/:name', (req, res) => {
    const name = req.params.name;
    RecetteModel.findOneAndDelete({ nom: name }, (err, recette) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la suppression de la recette." });
        } else {
            res.status(200).json({ message: "Recette supprimée avec succès." });
        }
    });
});

module.exports = router;