import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModPacksPanelContextType {
  isModPacksOpen: boolean;
  openModPacksPanel: () => void;
  closeModPacksPanel: () => void;
}

const ModPacksPanelContext = createContext<ModPacksPanelContextType | undefined>(undefined);

export const ModPacksPanelProvider = ({ children }: { children: ReactNode }) => {
  const [isModPacksOpen, setIsModPacksOpen] = useState(false);

  const openModPacksPanel = () => setIsModPacksOpen(true);
  const closeModPacksPanel = () => setIsModPacksOpen(false);

  return (
    <ModPacksPanelContext.Provider value={{ isModPacksOpen, openModPacksPanel, closeModPacksPanel }}>
      {children}
    </ModPacksPanelContext.Provider>
  );
};

export const useModPacksPanel = () => {
  const context = useContext(ModPacksPanelContext);
  if (context === undefined) {
    throw new Error('useModPacksPanel must be used within a ModPacksPanelProvider');
  }
  return context;
};
