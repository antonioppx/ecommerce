const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Middleware para proteger rotas
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obter token do header
            token = req.headers.authorization.split(' ')[1];

            // Verificar token
            const decoded = jwt.verify(token, config.jwtSecret);

            // Obter usuário do token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: 'Não autorizado, token inválido' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Não autorizado, token não fornecido' });
    }
};

// Middleware para verificar se é admin
exports.admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Não autorizado como administrador' });
    }
}; 