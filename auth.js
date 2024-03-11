const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    // Vérifier si le token est présent
    if (!token) {
        return res.status(403).json({ message: "Le token est obligatoire pour l'authentification." });
    }

    try {
        // Vérifier le token
        const decoded = jwt.verify(token, process.env.TOKEN);
        req.user = decoded; // Stocker les informations de l'utilisateur décodées dans req.user
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Token invalide." });
    }
}

module.exports = {
    verifyToken
};