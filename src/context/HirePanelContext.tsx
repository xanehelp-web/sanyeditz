import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HirePanelContextType {
  isOpen: boolean;
  openHirePanel: () => void;
  closeHirePanel: () => void;
}

const HirePanelContext = createContext<HirePanelContextType | undefined>(undefined);

export const HirePanelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openHirePanel = () => setIsOpen(true);
  const closeHirePanel = () => setIsOpen(false);

  return (
    <HirePanelContext.Provider value={{ isOpen, openHirePanel, closeHirePanel }}>
      {children}
    </HirePanelContext.Provider>
  );
};

export const useHirePanel = () => {
  const context = useContext(HirePanelContext);
  if (context === undefined) {
    throw new Error('useHirePanel must be used within a HirePanelProvider');
  }
  return context;
};
