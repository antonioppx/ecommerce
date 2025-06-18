const Product = require('../models/Product');

// Obter todos os produtos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
    }
};

// Obter produtos em destaque
exports.getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ featured: true }).limit(8);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos em destaque', error: error.message });
    }
};

// Obter produto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
    }
};

// Criar novo produto
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar produto', error: error.message });
    }
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
};

// Deletar produto
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto', error: error.message });
    }
}; 