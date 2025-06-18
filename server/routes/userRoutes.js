const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  registrar,
  login,
  getPerfil,
  atualizarPerfil,
  gerenciarCarrinho
} = require('../controllers/userController');

// Rotas públicas
router.post('/registrar', registrar);
router.post('/login', login);

// Rotas protegidas
router.get('/perfil', auth, getPerfil);
router.put('/perfil', auth, atualizarPerfil);
router.post('/carrinho', auth, gerenciarCarrinho);

module.exports = router;