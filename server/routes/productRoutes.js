const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rotas públicas
router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/:id', productController.getProductById);

// Rotas protegidas (requerem autenticação)
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router; 