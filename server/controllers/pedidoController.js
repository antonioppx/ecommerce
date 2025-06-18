const Pedido = require('../models/Pedido');
const Produto = require('../models/Produto');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Criar novo pedido
const criarPedido = async (req, res) => {
  try {
    const {
      itens,
      enderecoEntrega,
      formaPagamento,
      frete
    } = req.body;

    // Verificar estoque e calcular total
    let valorTotal = 0;
    for (const item of itens) {
      const produto = await Produto.findById(item.produto);
      if (!produto) {
        return res.status(404).json({ erro: `Produto ${item.produto} não encontrado` });
      }
      if (produto.estoque < item.quantidade) {
        return res.status(400).json({ erro: `Estoque insuficiente para ${produto.nome}` });
      }
      valorTotal += produto.preco * item.quantidade;
    }

    valorTotal += frete;

    // Criar pedido
    const pedido = await Pedido.create({
      usuario: req.user._id,
      itens,
      enderecoEntrega,
      formaPagamento,
      frete,
      valorTotal
    });

    // Atualizar estoque
    for (const item of itens) {
      const produto = await Produto.findById(item.produto);
      produto.estoque -= item.quantidade;
      await produto.save();
    }

    // Processar pagamento com Stripe
    if (formaPagamento === 'cartao') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: valorTotal * 100, // Stripe usa centavos
        currency: 'brl',
        metadata: { pedidoId: pedido._id.toString() }
      });

      pedido.stripePaymentIntentId = paymentIntent.id;
      await pedido.save();

      res.status(201).json({
        pedido,
        clientSecret: paymentIntent.client_secret
      });
    } else {
      res.status(201).json(pedido);
    }
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Listar pedidos do usuário
const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.user._id })
      .populate('itens.produto')
      .sort('-createdAt');
    res.json(pedidos);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Obter pedido por ID
const getPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate('itens.produto');

    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    if (pedido.usuario.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ erro: 'Não autorizado' });
    }

    res.json(pedido);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Atualizar status do pedido
const atualizarStatusPedido = async (req, res) => {
  try {
    const { status } = req.body;
    const pedido = await Pedido.findById(req.params.id);

    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ erro: 'Não autorizado' });
    }

    pedido.status = status;
    await pedido.save();

    res.json(pedido);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Cancelar pedido
const cancelarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);

    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    if (pedido.usuario.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ erro: 'Não autorizado' });
    }

    if (pedido.status !== 'pendente') {
      return res.status(400).json({ erro: 'Não é possível cancelar este pedido' });
    }

    // Restaurar estoque
    for (const item of pedido.itens) {
      const produto = await Produto.findById(item.produto);
      produto.estoque += item.quantidade;
      await produto.save();
    }

    pedido.status = 'cancelado';
    await pedido.save();

    res.json({ mensagem: 'Pedido cancelado com sucesso' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  criarPedido,
  listarPedidos,
  getPedidoPorId,
  atualizarStatusPedido,
  cancelarPedido
};