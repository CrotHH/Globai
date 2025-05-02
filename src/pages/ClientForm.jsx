import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { clientService, healthPlans } from '../services/clientService';
import './ClientForm.css';

function ClientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const currentUser = localStorage.getItem('user');
  const isAdmin = currentUser === 'admin';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Ativo',
    healthPlan: ''
  });

  useEffect(() => {
    if (isEditing) {
      const client = clientService.getAllClients(currentUser, isAdmin)
        .find(c => c.id === parseInt(id));
      if (client) {
        setFormData(client);
      }
    }
  }, [id, isEditing, currentUser, isAdmin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      const success = clientService.updateClient(parseInt(id), formData, currentUser, isAdmin);
      if (!success) {
        alert('Você não tem permissão para editar este cliente.');
        return;
      }
    } else {
      clientService.addClient(formData, currentUser);
    }
    
    navigate('/clients');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="client-form-container">
      <Sidebar />
      <div className="main-content">
        <h1>{isEditing ? 'Editar Cliente' : 'Novo Cliente'}</h1>
        
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="form-group">
              <label>Plano de Saúde:</label>
              <select
                name="healthPlan"
                value={formData.healthPlan}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um plano</option>
                {healthPlans.map(plan => (
                  <option key={plan} value={plan}>
                    ☑ {plan}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            <div className="button-group">
              <button type="submit" className="submit-button">
                {isEditing ? 'Salvar Alterações' : 'Cadastrar Cliente'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/clients')}
                className="cancel-button"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientForm; 