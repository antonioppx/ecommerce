require('dotenv').config();
const config = require('./server/config/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Importar rotas
const userRoutes = require('./server/routes/userRoutes');
const produtoRoutes = require('./server/routes/produtoRoutes');
const pedidoRoutes = require('./server/routes/pedidoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/usuarios', userRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);

// Servir arquivos estáticos em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Algo deu errado!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});