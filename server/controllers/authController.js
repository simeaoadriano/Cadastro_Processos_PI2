const bcrypt = require('bcrypt');
const { connectDB } = require('../config/db');

async function loginUser(req, res) {
    const { nome_usuario, senha } = req.body;

    // Verificar usuário no banco de dados
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM usuarios WHERE nome_usuario = ?', [nome_usuario]);

    if (rows.length > 0) {
        const user = rows[0];
        
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (isMatch) {
            
            return res.json({ message: 'Login bem-sucedido!' });
        }
    }
    return res.status(401).json({ message: 'Credenciais inválidas' });
}

async function registerUser(req, res) {
    const { nome_usuario, senha, nome, email } = req.body;

    
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM usuarios WHERE nome_usuario = ?', [nome_usuario]);

    if (rows[0].count > 0) {
        return res.status(400).json({ message: 'Nome de usuário já existe' });
    }

    
    const hashedPassword = await bcrypt.hash(senha, 10);
    await connection.execute('INSERT INTO usuarios (nome_usuario, senha, nome, email) VALUES (?, ?, ?, ?)', 
    [nome_usuario, hashedPassword, nome, email]);

    return res.json({ message: 'Usuário cadastrado com sucesso!' });
}

module.exports = { loginUser, registerUser };
