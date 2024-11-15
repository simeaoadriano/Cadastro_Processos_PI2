import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Auth.css';

const Auth = ({ onLoginSuccess }) => {
    const [nome_usuario, setNomeUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const response = await api.post('/auth/login', { nome_usuario, senha });
                alert(response.data.message);
                onLoginSuccess(); // Atualiza o estado de autenticação
                navigate('/'); // Redireciona para a página principal
            } else {
                const response = await api.post('/auth/register', { nome_usuario, senha, nome, email });
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>{isLogin ? 'Login' : 'Registro'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome de usuário"
                        value={nome_usuario}
                        onChange={(e) => setNomeUsuario(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <button type="submit">{isLogin ? 'Entrar' : 'Registrar'}</button>
                    <button type="button" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Criar uma conta' : 'Já tem uma conta?'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
