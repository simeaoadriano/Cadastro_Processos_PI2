import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Clientes from './components/Clientes';
import Navbar from './components/Navbar';
import ConsultaCliente from './components/ConsultarCliente';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>            
                <Route path="/" element={<h1>Bem-vindo ao Sistema</h1>} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/users" element={<ConsultaCliente/>}/>
            </Routes>
        </Router>
    );  
};

export default App;

