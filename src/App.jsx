import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientForm from './pages/ClientForm';
import Register from './pages/Register';
import Users from './pages/Users';
import './App.css';

// Componente para rotas privadas
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota raiz redireciona para login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rota de login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />
        <Route
          path="/client-form"
          element={
            <PrivateRoute>
              <ClientForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/client-form/:id"
          element={
            <PrivateRoute>
              <ClientForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
