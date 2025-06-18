const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
        minlength: 6
    },
    endereco: {
        rua: String,
        numero: String,
        complemento: String,
        bairro: String,
        cidade: String,
        estado: String,
        cep: String
    },
    telefone: String,
    role: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    },
    carrinho: [{
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        },
        quantidade: {
            type: Number,
            default: 1
        }
    }],
    pedidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
    }]
}, {
    timestamps: true
});

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
    if (this.isModified('senha')) {
        this.senha = await bcrypt.hash(this.senha, 8);
    }
    next();
});

// Método para comparar senha
userSchema.methods.comparePassword = async function(senha) {
    return bcrypt.compare(senha, this.senha);
};

const User = mongoose.model('User', userSchema);

module.exports = User;