const express = require('express');
const router = express.Router();
const authMiddleware = require('./auth');

router.use(authMiddleware.verifyToken);

router.get('/books', (req, res) => {
    res.send('Liste des livres');
});

module.exports = router;
