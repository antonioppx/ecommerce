const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
  criarPedido,
  listarPedidos,
  getPedidoPorId,
  atualizarStatusPedido,
  cancelarPedido
} = require('../controllers/pedidoController');

// Rotas protegidas
router.post('/', auth, criarPedido);
router.get('/', auth, listarPedidos);
router.get('/:id', auth, getPedidoPorId);
router.post('/:id/cancelar', auth, cancelarPedido);

// Rotas de administrador
router.put('/:id/status', adminAuth, atualizarStatusPedido);

module.exports = router;