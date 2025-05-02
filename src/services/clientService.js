// Lista de planos de saúde disponíveis
export const healthPlans = [
  'AMPLA/Gama',
  'Assim',
  'Assim Memorial',
  'Cemeru',
  'NDI',
  'Health Med',
  'KLINI',
  'Klini Rede casa',
  'Sulamerica',
  'Unimed Leste',
  'Unimed Ferj',
  'Unimed SERRANO',
  'Unimed Nacional',
  'Unimed Nova Iguaçu',
  'Unimed Tres Rios',
  'Leve',
  'Med Senior',
  'Notrelife',
  'Amil',
  'Porto Saúde',
  'Bradesco Saúde',
  'Assim Saúde',
  'Notredame',
  'Ampla'
].sort();

// Lista inicial de clientes
const initialClients = [
  { 
    id: 1, 
    name: 'João Silva', 
    email: 'joao@email.com', 
    phone: '(11) 99999-9999', 
    status: 'Ativo',
    healthPlan: 'Unimed Leste',
    userId: 'admin'
  },
  { 
    id: 2, 
    name: 'Maria Santos', 
    email: 'maria@email.com', 
    phone: '(11) 98888-8888', 
    status: 'Ativo',
    healthPlan: 'Amil',
    userId: 'admin'
  },
  { 
    id: 3, 
    name: 'Pedro Oliveira', 
    email: 'pedro@email.com', 
    phone: '(11) 97777-7777', 
    status: 'Inativo',
    healthPlan: 'Sulamerica',
    userId: 'user1'
  },
  { 
    id: 4, 
    name: 'Ana Costa', 
    email: 'ana@email.com', 
    phone: '(11) 96666-6666', 
    status: 'Ativo',
    healthPlan: 'Notredame',
    userId: 'user1'
  },
  { 
    id: 5, 
    name: 'Carlos Souza', 
    email: 'carlos@email.com', 
    phone: '(11) 95555-5555', 
    status: 'Ativo',
    healthPlan: 'Bradesco Saúde',
    userId: 'user2'
  },
];

// Inicializa os clientes no localStorage se não existirem
if (!localStorage.getItem('clients')) {
  localStorage.setItem('clients', JSON.stringify(initialClients));
}

export const clientService = {
  // Buscar todos os clientes (admin) ou clientes do usuário específico
  getAllClients: (userId = null, isAdmin = false) => {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    if (isAdmin) {
      return clients;
    }
    return clients.filter(client => client.userId === userId);
  },

  // Buscar total de clientes (admin) ou total do usuário específico
  getClientCount: (userId = null, isAdmin = false) => {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    if (isAdmin) {
      return clients.length;
    }
    return clients.filter(client => client.userId === userId).length;
  },

  // Adicionar novo cliente
  addClient: (client, userId) => {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const newClient = {
      ...client,
      id: clients.length + 1,
      status: 'Ativo',
      userId: userId
    };
    clients.push(newClient);
    localStorage.setItem('clients', JSON.stringify(clients));
    return newClient;
  },

  // Atualizar cliente
  updateClient: (id, updatedClient, userId, isAdmin) => {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const index = clients.findIndex(client => client.id === id);
    
    // Verifica se o usuário tem permissão para editar o cliente
    if (index !== -1 && (isAdmin || clients[index].userId === userId)) {
      clients[index] = { 
        ...clients[index], 
        ...updatedClient
      };
      localStorage.setItem('clients', JSON.stringify(clients));
      return clients[index];
    }
    return null;
  },

  // Deletar cliente
  deleteClient: (id, userId, isAdmin) => {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const client = clients.find(c => c.id === id);
    
    // Verifica se o usuário tem permissão para deletar o cliente
    if (client && (isAdmin || client.userId === userId)) {
      const filteredClients = clients.filter(client => client.id !== id);
      localStorage.setItem('clients', JSON.stringify(filteredClients));
      return true;
    }
    return false;
  }
}; 