const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  descricao: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true,
    min: 0
  },
  categoria: {
    type: String,
    required: true,
    trim: true
  },
  imagens: [{
    type: String,
    required: true
  }],
  estoque: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  avaliacoes: [{
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    nota: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comentario: String,
    data: {
      type: Date,
      default: Date.now
    }
  }],
  mediaAvaliacoes: {
    type: Number,
    default: 0
  },
  destaque: {
    type: Boolean,
    default: false
  },
  tags: [String],
  caracteristicas: [{
    nome: String,
    valor: String
  }]
}, {
  timestamps: true
});

// Método para calcular a média das avaliações
produtoSchema.methods.calcularMediaAvaliacoes = function() {
  if (this.avaliacoes.length === 0) return 0;
  const soma = this.avaliacoes.reduce((acc, item) => acc + item.nota, 0);
  this.mediaAvaliacoes = soma / this.avaliacoes.length;
  return this.mediaAvaliacoes;
};

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;