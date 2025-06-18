const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Gerar token JWT
const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Registrar novo usuário
const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    const usuario = await User.create({
      nome,
      email,
      senha
    });

    res.status(201).json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      token: gerarToken(usuario._id)
    });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Login de usuário
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario || !(await usuario.comparePassword(senha))) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    res.json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      token: gerarToken(usuario._id)
    });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Obter perfil do usuário
const getPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.user._id).select('-senha');
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Atualizar perfil do usuário
const atualizarPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.user._id);

    if (usuario) {
      usuario.nome = req.body.nome || usuario.nome;
      usuario.email = req.body.email || usuario.email;
      usuario.endereco = req.body.endereco || usuario.endereco;
      usuario.telefone = req.body.telefone || usuario.telefone;

      if (req.body.senha) {
        usuario.senha = req.body.senha;
      }

      const usuarioAtualizado = await usuario.save();

      res.json({
        _id: usuarioAtualizado._id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        role: usuarioAtualizado.role,
        token: gerarToken(usuarioAtualizado._id)
      });
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Gerenciar carrinho
const gerenciarCarrinho = async (req, res) => {
  try {
    const { acao, produtoId, quantidade } = req.body;
    const usuario = await User.findById(req.user._id);

    if (acao === 'adicionar') {
      const itemExistente = usuario.carrinho.find(
        item => item.produto.toString() === produtoId
      );

      if (itemExistente) {
        itemExistente.quantidade += quantidade;
      } else {
        usuario.carrinho.push({ produto: produtoId, quantidade });
      }
    } else if (acao === 'remover') {
      usuario.carrinho = usuario.carrinho.filter(
        item => item.produto.toString() !== produtoId
      );
    } else if (acao === 'atualizar') {
      const item = usuario.carrinho.find(
        item => item.produto.toString() === produtoId
      );
      if (item) {
        item.quantidade = quantidade;
      }
    }

    await usuario.save();
    res.json(usuario.carrinho);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  registrar,
  login,
  getPerfil,
  atualizarPerfil,
  gerenciarCarrinho
};