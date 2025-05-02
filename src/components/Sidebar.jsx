import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'; // vamos criar esse css já já

function Sidebar() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('user');
  const isAdmin = currentUser === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Sistema</h2>
      </div>
      <nav className="sidebar-nav">
        <a href="/dashboard" className="nav-item">Dashboard</a>
        <a href="/clients" className="nav-item">Clientes</a>
        {isAdmin && (
          <>
            <a href="/users" className="nav-item">Usuários</a>
            <a href="/register" className="nav-item">Registrar Usuário</a>
          </>
        )}
      </nav>
      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
