const express = require('express');
const router = express.Router();
const RestaurantModel = require('../Models/RestaurantModel');
const ChefModel = require('../Models/ChefsModel');
const RecetteModel = require('../Models/RecetteModel');

router.get('/all', (req, res) => {
    RestaurantModel.find({}, (err, restaurants) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des restaurants." });
        } else {
            res.status(200).json(restaurants);
        }
    });
});

router.get('/chefs/:restaurantname', (req, res) => {
    const restaurantName = req.params.restaurantname;
    ChefModel.find({ restaurant: restaurantName }, (err, chefs) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des chefs du restaurant." });
        } else {
            res.status(200).json(chefs);
        }
    });
});

router.get('/recettes/:restaurantname', (req, res) => {
    const restaurantName = req.params.restaurantname;
    RecetteModel.find({ restaurant: restaurantName }, (err, recettes) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des recettes du restaurant." });
        } else {
            res.status(200).json(recettes);
        }
    });
});

router.get('/listCategorie/:category', (req, res) => {
    const category = req.params.category;
    RestaurantModel.find({ categorie: category }, (err, restaurants) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des restaurants de la catégorie." });
        } else {
            res.status(200).json(restaurants);
        }
    });
});

router.get('/:annee1/:annee2', (req, res) => {
    const annee1 = req.params.annee1;
    const annee2 = req.params.annee2;
    RestaurantModel.find({ "annee_ouverture": { $gte: annee1, $lte: annee2 } }, (err, restaurants) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des restaurants ouverts entre les deux années." });
        } else {
            res.status(200).json(restaurants);
        }
    });
});

router.post('/add', (req, res) => {
    const newRestaurant = new RestaurantModel(req.body);
    newRestaurant.save((err, restaurant) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de l'ajout du restaurant." });
        } else {
            res.status(201).json(restaurant);
        }
    });
});

router.put('/update/:name', (req, res) => {
    const name = req.params.name;
    RestaurantModel.findOneAndUpdate({ nom: name }, req.body, { new: true }, (err, restaurant) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du restaurant." });
        } else {
            res.status(200).json(restaurant);
        }
    });
});

router.delete('/delete/:name', (req, res) => {
    const name = req.params.name;
    RestaurantModel.findOneAndDelete({ nom: name }, (err, restaurant) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la suppression du restaurant." });
        } else {
            res.status(200).json({ message: "Restaurant supprimé avec succès." });
        }
    });
});

module.exports = router;