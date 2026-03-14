/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CreditsContext = createContext();

export const useCredits = () => useContext(CreditsContext);

export const CreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(() => {
    const saved = localStorage.getItem('ps_credits');
    return saved ? parseInt(saved, 10) : 50; // Start with 50 sparks
  });

  useEffect(() => {
    localStorage.setItem('ps_credits', credits.toString());
  }, [credits]);

  const spendCredits = (amount, toolName) => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      return true;
    } else {
      toast.error(`Energie erschöpft für ${toolName}! Lade neue Sparks ⚡ auf.`, { icon: '⚡', style: { background: '#1e293b', color: '#fff', border: '1px solid #ef4444' } });
      return false;
    }
  };

  const addCredits = (amount) => {
    setCredits(prev => prev + amount);
    toast.success(`+${amount} Sparks ⚡ transferiert!`, { icon: '⚡', style: { background: '#1e293b', color: '#10b981', border: '1px solid #10b981' } });
  };

  return (
    <CreditsContext.Provider value={{ credits, spendCredits, addCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};
