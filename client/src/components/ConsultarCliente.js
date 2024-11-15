import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from 'react-modal'; 
import '../styles/ConsultaCliente.css';

Modal.setAppElement('#root');

const ConsultaCliente = () => {
    const [clientes, setClientes] = useState([]);
    const [numeroProcesso, setNumeroProcesso] = useState('');
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [clientesPerPage] = useState(5); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clienteEditando, setClienteEditando] = useState(null); // Cliente sendo editado

    // Função para buscar todos os clientes
    const fetchClientes = async () => {
        try {
            const response = await api.get('/clientes');
            setClientes(response.data);
            setFilteredClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    // Função para filtrar clientes pelo número do processo, CPF ou nome
    const handleSearch = () => {
        let filtered = clientes;

        if (numeroProcesso) {
            filtered = filtered.filter(cliente =>
                cliente.numero_processo.includes(numeroProcesso)
            );
        }
        if (cpf) {
            filtered = filtered.filter(cliente =>
                cliente.cnpj_cpf.includes(cpf)
            );
        }
        if (nome) {
            filtered = filtered.filter(cliente =>
                cliente.nome.toLowerCase().includes(nome.toLowerCase())
            );
        }

        setFilteredClientes(filtered);
    };

    // Função para abrir o modal de edição
    const handleEditCliente = (cliente) => {
        setClienteEditando(cliente); 
        setIsModalOpen(true); 
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setClienteEditando(null); 
    };

    // Função para salvar as alterações no cliente
    const handleSaveCliente = async () => {
        try {
            await api.put(`/clientes/${clienteEditando.id}`, clienteEditando);
            fetchClientes(); 
            handleCloseModal();
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
        }
    };

    // Função para excluir o cliente
    const handleDeleteCliente = async () => {
        try {
            await api.delete(`/clientes/${clienteEditando.id}`);
            fetchClientes(); 
            handleCloseModal();
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    };

    const paginateClientes = () => {
        const indexOfLastCliente = currentPage * clientesPerPage;
        const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
        return filteredClientes.slice(indexOfFirstCliente, indexOfLastCliente);
    };

    // Função para mudar de página
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    return (
        <div className="consulta-cliente-container">
            <h1>Consulta de Clientes</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por Número do Processo"
                    value={numeroProcesso}
                    onChange={(e) => setNumeroProcesso(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Buscar por CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Buscar por Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <button className="search-btn" onClick={handleSearch}>Buscar</button>
            </div>

            <ul className="clientes-list">
                {paginateClientes().map((cliente) => (
                    <li className="cliente-item" key={cliente.id}>
                        <div>{cliente.nome}</div>
                        <div>{cliente.cnpj_cpf}</div>
                        <div>{cliente.numero_processo}</div>
                        <button className="edit-btn" onClick={() => handleEditCliente(cliente)}>Editar</button>
                    </li>
                ))}
            </ul>

            {/* Paginação */}
            <div className="pagination">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage}</span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage * clientesPerPage >= filteredClientes.length}
                >
                    Próxima
                </button>
            </div>

            {/* Modal de Edição */}
            <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="Editar Cliente">
                <h2>Editar Cliente</h2>
                {clienteEditando && (
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={clienteEditando.nome}
                            onChange={(e) =>
                                setClienteEditando({ ...clienteEditando, nome: e.target.value })
                            }
                        />
                        <label>CNPJ/CPF:</label>
                        <input
                            type="text"
                            value={clienteEditando.cnpj_cpf}
                            onChange={(e) =>
                                setClienteEditando({ ...clienteEditando, cnpj_cpf: e.target.value })
                            }
                        />
                        <label>Número do Processo:</label>
                        <input
                            type="text"
                            value={clienteEditando.numero_processo}
                            onChange={(e) =>
                                setClienteEditando({ ...clienteEditando, numero_processo: e.target.value })
                            }
                        />
                        <div>
                            <button className="cancel-btn" onClick={handleCloseModal}>Cancelar</button>
                            <button className="save-btn" onClick={handleSaveCliente}>Salvar</button>
                            <button className="delete-btn" onClick={handleDeleteCliente}>Excluir</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ConsultaCliente;
