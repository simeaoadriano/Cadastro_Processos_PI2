const express = require('express');
const router = express.Router();
const usuariosPath = './usuarios.json';

// Rota para listar todos os usuários ou pesquisar por número de processo
router.get('/', async (req, res) => {
    const { numeroProcesso, cpf, nome } = req.query;

    try {
        const users = await readJSON(usuariosPath);

        let filteredUsers = users;

        // Filtra os usuários pelo número de processo, se fornecido
        if (numeroProcesso) {
            filteredUsers = filteredUsers.filter(user => user.numero_processo === numeroProcesso);
        }

        // Filtra os usuários pelo CPF, se fornecido
        if (cpf) {
            filteredUsers = filteredUsers.filter(user => user.cnpj_cpf === cpf);
        }

        // Filtra os usuários pelo nome, se fornecido
        if (nome) {
            filteredUsers = filteredUsers.filter(user => user.nome.toLowerCase().includes(nome.toLowerCase()));
        }

        // Retorna os usuários filtrados
        res.json(filteredUsers);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao ler os usuários', error: error.message });
    }
});

// Rota para editar um usuário específico pelo ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        let users = await readJSON(usuariosPath);

        // Encontra o usuário e atualiza seus dados
        const userIndex = users.findIndex(user => user.id == id);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        users[userIndex] = { ...users[userIndex], ...updates };
        await writeJSON(usuariosPath, users);

        res.json(users[userIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o usuário', error: error.message });
    }
});

// Rota para excluir um usuário específico pelo ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        let users = await readJSON(usuariosPath);

        // Filtra para remover o usuário com o ID especificado
        const filteredUsers = users.filter(user => user.id != id);

        if (filteredUsers.length === users.length) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        await writeJSON(usuariosPath, filteredUsers);
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir o usuário', error: error.message });
    }
});

module.exports = router;
