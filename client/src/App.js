import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Clientes from './components/Clientes';
import Navbar from './components/Navbar';
import ConsultaCliente from './components/ConsultarCliente';
import './styles/App.css'; // Estilos atualizados da Home

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <div className="home-container">
                                <h1 className="title">Bem-vindo ao Sistema Jurídico</h1>
                                <p className="description">
                                    Gerencie e consulte clientes com processos jurídicos de maneira eficiente e organizada.
                                    Facilite o cadastro e análise de processos com um design simples e intuitivo.
                                </p>
                                <button className="cta-button">Comece Agora</button>
                            </div>
                        ) : (
                            <Navigate to="/auth" />
                        )
                    }
                />
                <Route path="/auth" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/clientes" element={isAuthenticated ? <Clientes /> : <Navigate to="/auth" />} />
                <Route path="/users" element={isAuthenticated ? <ConsultaCliente /> : <Navigate to="/auth" />} />
            </Routes>
        </Router>
    );
};

export default App;
