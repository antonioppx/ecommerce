const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Gerar token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d'
    });
};

// Registrar novo usuário
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar se o usuário já existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Criar novo usuário
        const user = await User.create({
            name,
            email,
            password
        });

        // Gerar token
        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token
        });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
};

// Login de usuário
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        // Verificar senha
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        // Gerar token
        const token = generateToken(user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token
        });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao fazer login', error: error.message });
    }
};

// Obter perfil do usuário
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar perfil', error: error.message });
    }
}; 