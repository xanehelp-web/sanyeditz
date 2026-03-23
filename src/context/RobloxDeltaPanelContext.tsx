import React, { createContext, useContext, useState } from 'react';

interface RobloxDeltaPanelContextType {
  isRobloxDeltaOpen: boolean;
  openRobloxDeltaPanel: () => void;
  closeRobloxDeltaPanel: () => void;
}

const RobloxDeltaPanelContext = createContext<RobloxDeltaPanelContextType | undefined>(undefined);

export const RobloxDeltaPanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRobloxDeltaOpen, setIsRobloxDeltaOpen] = useState(false);

  const openRobloxDeltaPanel = () => setIsRobloxDeltaOpen(true);
  const closeRobloxDeltaPanel = () => setIsRobloxDeltaOpen(false);

  return (
    <RobloxDeltaPanelContext.Provider value={{ isRobloxDeltaOpen, openRobloxDeltaPanel, closeRobloxDeltaPanel }}>
      {children}
    </RobloxDeltaPanelContext.Provider>
  );
};

export const useRobloxDeltaPanel = () => {
  const context = useContext(RobloxDeltaPanelContext);
  if (context === undefined) {
    throw new Error('useRobloxDeltaPanel must be used within a RobloxDeltaPanelProvider');
  }
  return context;
};
