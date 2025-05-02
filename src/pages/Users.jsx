import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Users.css';

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    // Carrega os usuários do localStorage
    const loadUsers = () => {
      const storedUsers = localStorage.getItem('users');
      const usersList = storedUsers ? JSON.parse(storedUsers) : [];
      setUsers(usersList);
      setLoading(false);
    };

    loadUsers();
  }, []);

  const handleDelete = (username) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      const updatedUsers = users.filter(user => user.username !== username);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      username: user.username,
      email: user.email || '',
      password: ''
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(user => {
      if (user.username === editingUser.username) {
        return {
          ...user,
          ...editForm,
          password: editForm.password || user.password // mantém a senha antiga se não foi alterada
        };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setEditingUser(null);
    setEditForm({ username: '', email: '', password: '' });
  };

  const handleEditCancel = () => {
    setEditingUser(null);
    setEditForm({ username: '', email: '', password: '' });
  };

  if (loading) {
    return (
      <div className="users-container">
        <Sidebar />
        <div className="main-content">
          <div className="loading">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <Sidebar />
      <div className="main-content">
        <div className="header-actions">
          <h1>Usuários</h1>
          <button 
            className="add-button"
            onClick={() => navigate('/register')}
          >
            Adicionar Novo Usuário
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Email</th>
                <th>Tipo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{user.email || '-'}</td>
                  <td>
                    <span className={`type-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
                      {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(user)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(user.username)}
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

        {editingUser && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Editar Usuário</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>Usuário:</label>
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Nova Senha (deixe em branco para manter a atual):</label>
                  <input
                    type="password"
                    value={editForm.password}
                    onChange={(e) => setEditForm({...editForm, password: e.target.value})}
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="save-button">Salvar</button>
                  <button type="button" className="cancel-button" onClick={handleEditCancel}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users; 