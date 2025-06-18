const Produto = require('../models/Produto');

// Criar novo produto
const criarProduto = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Listar todos os produtos
const listarProdutos = async (req, res) => {
  try {
    const { categoria, busca, ordenar, pagina = 1, limite = 10 } = req.query;
    const query = {};

    if (categoria) {
      query.categoria = categoria;
    }

    if (busca) {
      query.$or = [
        { nome: { $regex: busca, $options: 'i' } },
        { descricao: { $regex: busca, $options: 'i' } }
      ];
    }

    const opcoesOrdenacao = {
      'preco-asc': { preco: 1 },
      'preco-desc': { preco: -1 },
      'mais-vendidos': { vendas: -1 },
      'mais-avaliados': { mediaAvaliacoes: -1 }
    };

    const ordenacao = opcoesOrdenacao[ordenar] || { createdAt: -1 };

    const produtos = await Produto.find(query)
      .sort(ordenacao)
      .limit(limite * 1)
      .skip((pagina - 1) * limite)
      .exec();

    const total = await Produto.countDocuments(query);

    res.json({
      produtos,
      totalPaginas: Math.ceil(total / limite),
      paginaAtual: pagina
    });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Obter produto por ID
const getProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ erro: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Atualizar produto
const atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (produto) {
      Object.assign(produto, req.body);
      const produtoAtualizado = await produto.save();
      res.json(produtoAtualizado);
    } else {
      res.status(404).json({ erro: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Deletar produto
const deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (produto) {
      await produto.remove();
      res.json({ mensagem: 'Produto removido' });
    } else {
      res.status(404).json({ erro: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Adicionar avaliação
const adicionarAvaliacao = async (req, res) => {
  try {
    const { nota, comentario } = req.body;
    const produto = await Produto.findById(req.params.id);

    if (produto) {
      const jaAvaliou = produto.avaliacoes.find(
        a => a.usuario.toString() === req.user._id.toString()
      );

      if (jaAvaliou) {
        return res.status(400).json({ erro: 'Produto já avaliado' });
      }

      const avaliacao = {
        usuario: req.user._id,
        nome: req.user.nome,
        nota: Number(nota),
        comentario
      };

      produto.avaliacoes.push(avaliacao);
      produto.calcularMediaAvaliacoes();
      await produto.save();

      res.status(201).json({ mensagem: 'Avaliação adicionada' });
    } else {
      res.status(404).json({ erro: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  criarProduto,
  listarProdutos,
  getProdutoPorId,
  atualizarProduto,
  deletarProduto,
  adicionarAvaliacao
};