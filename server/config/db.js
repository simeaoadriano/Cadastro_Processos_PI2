const mysql = require('mysql2/promise');

async function connectDB() {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '2205', 
            database: 'adv' 
        });
        console.log('Conectado ao banco de dados');
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error; 
    }
}

module.exports = { connectDB };