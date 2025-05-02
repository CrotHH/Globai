import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterUser.css';

function RegisterUser() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber && password.length <= 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePassword(formData.password)) {
      setError('A senha deve conter pelo menos 1 letra e 1 número, e não pode ter mais que 10 caracteres');
      return;
    }

    // Aqui você pode adicionar a lógica para salvar o usuário
    // Por enquanto, vamos apenas simular salvando no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    
    setFormData({ username: '', email: '', password: '' });
    setError('');
    alert('Usuário registrado com sucesso!');
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registrar Novo Usuário</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome de Usuário:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
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
            <label>Senha:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Registrar</button>
            <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser; 