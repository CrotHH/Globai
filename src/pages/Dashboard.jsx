import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { clientService } from '../services/clientService';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [clientCount, setClientCount] = useState(0);
  const currentUser = localStorage.getItem('user');
  const isAdmin = currentUser === 'admin';

  useEffect(() => {
    const count = clientService.getClientCount(currentUser, isAdmin);
    setClientCount(count);
  }, [currentUser, isAdmin]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Dashboard</h1>
        <div className="dashboard-cards">
          <div className="card">
            <h2>Total de Clientes</h2>
            <p className="count">{clientCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 