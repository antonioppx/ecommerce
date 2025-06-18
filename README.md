# E-commerce Avançado

Um e-commerce completo construído com React, Node.js e MongoDB.

## Funcionalidades

- 🛍️ Vitrine de produtos
- 🔍 Busca e filtros
- ⭐ Sistema de avaliações
- 🛒 Carrinho de compras
- 👤 Autenticação de usuários
- 💳 Integração com pagamentos
- 📱 Design responsivo

## Tecnologias Utilizadas

- Frontend: React.js, SASS
- Backend: Node.js, Express
- Banco de Dados: MongoDB
- Autenticação: JWT
- Pagamentos: Stripe

## Instalação

1. Clone o repositório
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências do backend
```bash
npm install
```

3. Instale as dependências do frontend
```bash
cd client
npm install
```

4. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
MONGODB_URI=sua_url_do_mongodb
JWT_SECRET=seu_segredo_jwt
STRIPE_SECRET_KEY=sua_chave_do_stripe
```

5. Inicie o servidor de desenvolvimento
```bash
npm run dev:full
```

## Estrutura do Projeto

```
ecommerce-avancado/
├── client/                 # Frontend React
├── server/                 # Backend Node.js
│   ├── controllers/       # Controladores
│   ├── models/           # Modelos do MongoDB
│   ├── routes/           # Rotas da API
│   └── middleware/       # Middlewares
└── package.json
``` 