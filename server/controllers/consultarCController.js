const User = require('../routes/users');

// Rota para obter todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};

// Rota para buscar usuário por número de processo
exports.getUserByProcesso = async (req, res) => {
    const { numeroProcesso } = req.params;
    try {
        const user = await User.findOne({ numero_processo: numeroProcesso });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
};

// Rota para editar um usuário pelo ID
exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};

// Rota para excluir um usuário pelo ID
exports.deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.json({ message: 'Usuário excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
};
