import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/clientes">Clientes</Link></li>
                <li><Link to="/auth">Usuários</Link></li>
                <li><Link to="/users">Consultar Clientes</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
