import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { clientService } from '../services/clientService';
import './Clients.css';

function Clients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = localStorage.getItem('user');
  const isAdmin = currentUser === 'admin';

  useEffect(() => {
    const loadClients = () => {
      const allClients = clientService.getAllClients(currentUser, isAdmin);
      setClients(allClients);
      setLoading(false);
    };

    loadClients();
  }, [currentUser, isAdmin]);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      const success = clientService.deleteClient(id, currentUser, isAdmin);
      if (success) {
        setClients(clientService.getAllClients(currentUser, isAdmin));
      } else {
        alert('Você não tem permissão para excluir este cliente.');
      }
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="clients-container">
        <Sidebar />
        <div className="main-content">
          <div className="loading">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="clients-container">
      <Sidebar />
      <div className="main-content">
        <div className="header-actions">
          <h1>Clientes</h1>
          <button 
            className="add-button"
            onClick={() => navigate('/client-form')}
          >
            Adicionar Novo Cliente
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Plano de Saúde</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.healthPlan}</td>
                  <td>
                    <span className={`status-badge ${client.status.toLowerCase()}`}>
                      {client.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => navigate(`/client-form/${client.id}`)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(client.id)}
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clients; 