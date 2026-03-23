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
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <HirePanelProvider>
          <ModPacksPanelProvider>
            <RobloxDeltaPanelProvider>
              <HashRouter>
                <div className="min-h-screen selection:bg-primary selection:text-dark">
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
