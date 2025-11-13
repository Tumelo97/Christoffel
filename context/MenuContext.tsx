// context/MenuContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { MenuItem } from '../types';

interface MenuContextType {
  menuItems: MenuItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addItem = (item: MenuItem) => {
    setMenuItems(prev => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addItem, removeItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within MenuProvider');
  }
  return context;
};