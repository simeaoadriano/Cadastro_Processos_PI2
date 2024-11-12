const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db'); // Conexão com o banco de dados
const authRoutes = require('./routes/auth'); // Importando as rotas de autenticação
const clientesRoutes = require('./routes/clientes'); // Importando as rotas de clientes
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

(async () => {
    try {
        await connectDB();
        console.log('Conexão com o banco de dados bem-sucedida');

        // Rotas de autenticação
        app.use('/api/auth', authRoutes);

        app.use('/api/users', usersRoutes);

        // Rotas de clientes
        app.use('/api/clientes', clientesRoutes);

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Falha ao conectar ao banco de dados:', error);
    }
})();
