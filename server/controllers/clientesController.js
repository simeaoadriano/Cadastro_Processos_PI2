const { connectDB } = require('../config/db');

async function getClientes(req, res) {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM clientes');
    return res.json(rows);
}

async function createCliente(req, res) {

    
    const {
        data_cadastro,
        cnpj_cpf,
        nome,
        rua,
        numero,
        bairro,
        cep,
        cidade,
        estado,
        telefone,
        numero_processo,
        email
    } = req.body;

    // Verificando se todos os campos obrigatórios foram enviados
    if (!data_cadastro || !cnpj_cpf || !nome || !rua || !numero || !bairro || !cep || !cidade || !estado || !telefone || !numero_processo || !email) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const formattedDataCadastro = new Date(data_cadastro).toISOString().split('T')[0]; // Para DATE
        const connection = await connectDB();
        await connection.execute(
            `INSERT INTO clientes 
                (data_cadastro, cnpj_cpf, nome, rua, numero, bairro, cep, cidade, estado, telefone, numero_processo, email) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [formattedDataCadastro, cnpj_cpf, nome, rua, numero, bairro, cep, cidade, estado, telefone, numero_processo, email]
        );
        
        return res.status(201).json({ message: 'Cliente criado com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar cliente. Tente novamente.' });
    }
}

async function updateCliente(req, res) {
    const { id } = req.params;
    
    const {
        data_cadastro,
        cnpj_cpf,
        nome,
        rua,
        numero,
        bairro,
        cep,
        cidade,
        estado,
        telefone,
        numero_processo,
        email
    } = req.body;

    // Verificando se todos os campos obrigatórios foram enviados
    if (!data_cadastro || !cnpj_cpf || !nome || !rua || !numero || !bairro || !cep || !cidade || !estado || !telefone || !numero_processo || !email) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const formattedDataCadastro = new Date(data_cadastro).toISOString().split('T')[0];
        const connection = await connectDB();
        await connection.execute(
            `UPDATE clientes 
            SET data_cadastro = ?, cnpj_cpf = ?, nome = ?, rua = ?, numero = ?, bairro = ?, cep = ?, 
                cidade = ?, estado = ?, telefone = ?, numero_processo = ?, email = ? 
            WHERE id = ?`,
            [formattedDataCadastro, cnpj_cpf, nome, rua, numero, bairro, cep, cidade, estado, telefone, numero_processo, email, id]
        );
        
        return res.json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar cliente. Tente novamente.' });
    }
}

async function deleteCliente(req, res) {
    const { id } = req.params;

    const connection = await connectDB();
    await connection.execute('DELETE FROM clientes WHERE id = ?', [id]);
    
    return res.json({ message: 'Cliente deletado com sucesso!' });
}

module.exports = { getClientes, createCliente, updateCliente, deleteCliente };
