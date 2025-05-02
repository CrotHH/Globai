import React from 'react';

const mockClientes = [
  { nome: 'João da Silva', aniversario: '2025-04-10' },
  { nome: 'Maria Souza', aniversario: '2025-04-23' },
];

function Aniversarios() {
  return (
    <div>
      <h1>Aniversariantes</h1>
      <ul>
        {mockClientes.map((cliente, i) => (
          <li key={i}>
            {cliente.nome} — {new Date(cliente.aniversario).toLocaleDateString('pt-BR')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Aniversarios;

