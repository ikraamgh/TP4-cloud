const express = require('express');
const router = express.Router();
const UserModel = require('../Models/UserModel');

router.get('/all', (req, res) => {
    UserModel.find({}, (err, users) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
        } else {
            res.status(200).json(users);
        }
    });
});

router.get('/names', (req, res) => {
    UserModel.find({}, 'nom_complet', (err, names) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des noms d'utilisateurs." });
        } else {
            res.status(200).json(names);
        }
    });
});

router.post('/add', (req, res) => {
    const newUser = new UserModel(req.body);
    newUser.save((err, user) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur." });
        } else {
            res.status(201).json(user);
        }
    });
});

router.put('/update/:name', (req, res) => {
    const name = req.params.name;
    UserModel.findOneAndUpdate({ nom_complet: name }, req.body, { new: true }, (err, user) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur." });
        } else {
            res.status(200).json(user);
        }
    });
});

router.delete('/delete/:name', (req, res) => {
    const name = req.params.name;
    UserModel.findOneAndDelete({ nom_complet: name }, (err, user) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur." });
        } else {
            res.status(200).json({ message: "Utilisateur supprimé avec succès." });
        }
    });
});

module.exports = router;
