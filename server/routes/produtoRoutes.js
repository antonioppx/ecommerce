const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
  criarProduto,
  listarProdutos,
  getProdutoPorId,
  atualizarProduto,
  deletarProduto,
  adicionarAvaliacao
} = require('../controllers/produtoController');

// Rotas públicas
router.get('/', listarProdutos);
router.get('/:id', getProdutoPorId);

// Rotas protegidas
router.post('/:id/avaliar', auth, adicionarAvaliacao);

// Rotas de administrador
router.post('/', adminAuth, criarProduto);
router.put('/:id', adminAuth, atualizarProduto);
router.delete('/:id', adminAuth, deletarProduto);

module.exports = router;