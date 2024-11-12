import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Clientes.css';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [dataCadastro, setDataCadastro] = useState('');
    const [cnpjCpf, setCnpjCpf] = useState('');
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefone, setTelefone] = useState('');
    const [numeroProcesso, setNumeroProcesso] = useState('');
    const [email, setEmail] = useState('');


    const fetchClientes = async () => {
        try {
            const response = await api.get('/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddCliente = async (e) => {
        e.preventDefault();

        if (!dataCadastro || !cnpjCpf || !nome || !rua || !numero || !bairro || !cep || !cidade || !estado || !telefone || !numeroProcesso) {
            alert('Por favor, preencha todos os campos.');
            return;
        };
        const novoCliente = {
            data_cadastro: dataCadastro,
            cnpj_cpf: cnpjCpf,
            nome: nome,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            estado: estado,
            telefone: telefone,
            numero_processo: numeroProcesso,
            email: email
        };
        try {
            await api.post('/clientes', novoCliente);
            fetchClientes();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    return (
        <div className="clientes-container">
            <h1>Cadastro de Clientes</h1>
            <form className="clientes-form" onSubmit={handleAddCliente}>
                <label>Data do Cadastro:</label>
                <input
                    type="date"
                    value={dataCadastro}
                    onChange={(e) => setDataCadastro(e.target.value)}
                    required
                />

                <label>CNPJ/CPF:</label>
                <input
                    type="text"
                    value={cnpjCpf}
                    onChange={(e) => setCnpjCpf(e.target.value)}
                    required
                />

                <label>Nome:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <label>Rua:</label>
                <input
                    type="text"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                    required
                />

                <label>Número:</label>
                <input
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                />

                <label>Bairro:</label>
                <input
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    required
                />

                <label>CEP:</label>
                <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    required
                />

                <label>Cidade:</label>
                <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                />

                <label>Estado:</label>
                <input
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                />

                <label>Telefone:</label>
                <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                />

                <label>Número do Processo: <h3><a href="https://www.tjsp.jus.br/processos" target="_blank">Site tsj</a></h3></label> 
                
                <input
                    type="text"
                    value={numeroProcesso}
                    onChange={(e) => setNumeroProcesso(e.target.value)}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit">Gravar</button>
                <button type="button" onClick={() => window.location.href = 'index.html'}>Voltar</button>
            </form>

        </div>
    );
};

export default Clientes;
