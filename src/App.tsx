import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar, Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Services } from './components/Services';
import { Contact, Footer } from './components/Contact';
import { LoadingScreen } from './components/VisualEffects';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { CookiesPolicy } from './pages/CookiesPolicy';
import { AdminDashboard } from './pages/AdminDashboard';
import { SEO } from './components/SEO';
import { HirePanelProvider, useHirePanel } from './context/HirePanelContext';
import { HirePanel } from './components/HirePanel';
import { ModPacksPanelProvider, useModPacksPanel } from './context/ModPacksPanelContext';
import { ModPacksPanel } from './components/ModPacksPanel';
import { RobloxDeltaPanelProvider, useRobloxDeltaPanel } from './context/RobloxDeltaPanelContext';
import { RobloxDeltaPanel } from './components/RobloxDeltaPanel';
import { AuthProvider } from './context/AuthContext';

const Home = () => {
  const { isOpen, closeHirePanel } = useHirePanel();
  const { isModPacksOpen, closeModPacksPanel } = useModPacksPanel();
  const { isRobloxDeltaOpen, closeRobloxDeltaPanel } = useRobloxDeltaPanel();
  
  return (
    <div key="content">
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <HirePanel isOpen={isOpen} onClose={closeHirePanel} />
      <ModPacksPanel isOpen={isModPacksOpen} onClose={closeModPacksPanel} />
      <RobloxDeltaPanel isOpen={isRobloxDeltaOpen} onClose={closeRobloxDeltaPanel} />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Security measures
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+Shift+K
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'K'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        return false;
      }
      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        return false;
      }
      // Ctrl+P (Print)
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
    };
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <HirePanelProvider>
          <ModPacksPanelProvider>
            <RobloxDeltaPanelProvider>
              <HashRouter>
                <div className="min-h-screen">
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <LoadingScreen onComplete={() => setIsLoading(false)} />
                    ) : (
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsConditions />} />
                        <Route path="/cookies" element={<CookiesPolicy />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                      </Routes>
                    )}
                  </AnimatePresence>
                </div>
              </HashRouter>
            </RobloxDeltaPanelProvider>
          </ModPacksPanelProvider>
        </HirePanelProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
