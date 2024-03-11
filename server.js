const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const authMiddleware = require('./auth');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.URL_MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion à MongoDB :'));
db.once('open', () => console.log('Connexion à MongoDB réussie'));

// Middleware pour gérer l'authentification avec JWT
app.use(authMiddleware.verifyToken);

const userRoutes = require('./Routes/User');
const chefRoutes = require('./Routes/Chef');
const recetteRoutes = require('./Routes/Recette');
const restaurantRoutes = require('./Routes/Restaurant');

app.use('/users', userRoutes);
app.use('/chefs', chefRoutes);
app.use('/recettes', recetteRoutes);
app.use('/restaurants', restaurantRoutes);

app.get('/', (req, res) => {
    res.send('Bonjour, l\'application fonctionne correctement !');
});

app.post('/register', async (req, res) => {
    res.send('REGISTER')
});

app.post('/login', async (req, res) => {
    // app.send('HIIIIII');
    try{
        let token = await authController.login(req.body.email, req.body.password);
        return res.status(200).send({token: token});
    }catch(e){
        return res.status(400).send(e.message);
    }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Le serveur est démarré sur le port ${PORT}`);
});
