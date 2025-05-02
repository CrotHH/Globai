import React, { useState } from 'react';
import './HealthPlanSelector.css';

const healthPlans = {
  adesao: [
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
    'Unimed Tres Rios'
  ],
  pf: [
    'Assim MEMORIAL',
    'Leve',
    'Med Senior',
    'Notrelife'
  ],
  pme: [
    'Amil',
    'Sulamérica',
    'Porto Saúde',
    'Bradesco Saúde',
    'Assim Saúde',
    'Notredame',
    'Ampla'
  ]
};

function HealthPlanSelector({ onSelect }) {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedPlan('');
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    if (onSelect) {
      onSelect(plan);
    }
  };

  return (
    <div className="health-plan-selector">
      <select 
        className="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Selecione uma categoria</option>
        <option value="adesao">🟣 ADESÃO</option>
        <option value="pf">🔺 PF</option>
        <option value="pme">🔹 PME</option>
      </select>

      {selectedCategory && (
        <select 
          className="plan-select"
          value={selectedPlan}
          onChange={(e) => handlePlanChange(e.target.value)}
        >
          <option value="">Selecione um plano</option>
          {healthPlans[selectedCategory].map((plan) => (
            <option key={plan} value={plan}>
              ☑ {plan}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default HealthPlanSelector; 