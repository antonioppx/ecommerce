const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itens: [{
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto',
      required: true
    },
    quantidade: {
      type: Number,
      required: true,
      min: 1
    },
    precoUnitario: {
      type: Number,
      required: true
    }
  }],
  enderecoEntrega: {
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String
  },
  status: {
    type: String,
    enum: ['pendente', 'confirmado', 'em_preparacao', 'enviado', 'entregue', 'cancelado'],
    default: 'pendente'
  },
  formaPagamento: {
    type: String,
    enum: ['cartao', 'boleto', 'pix'],
    required: true
  },
  statusPagamento: {
    type: String,
    enum: ['pendente', 'aprovado', 'recusado', 'reembolsado'],
    default: 'pendente'
  },
  valorTotal: {
    type: Number,
    required: true
  },
  frete: {
    type: Number,
    required: true
  },
  codigoRastreamento: String,
  observacoes: String,
  dataEntrega: Date
}, {
  timestamps: true
});

// Método para calcular o valor total do pedido
pedidoSchema.methods.calcularTotal = function() {
  const subtotal = this.itens.reduce((total, item) => {
    return total + (item.precoUnitario * item.quantidade);
  }, 0);
  this.valorTotal = subtotal + this.frete;
  return this.valorTotal;
};

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;