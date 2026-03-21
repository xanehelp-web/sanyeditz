import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar, Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Services } from './components/Services';
import { Contact, Footer } from './components/Contact';
import { LoadingScreen, CustomCursor } from './components/VisualEffects';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { CookiesPolicy } from './pages/CookiesPolicy';
import { SEO } from './components/SEO';
import { HirePanelProvider, useHirePanel } from './context/HirePanelContext';
import { HirePanel } from './components/HirePanel';

const Home = () => {
  const { isOpen, closeHirePanel } = useHirePanel();
  
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
      <HirePanelProvider>
        <BrowserRouter>
          <div className="min-h-screen selection:bg-primary selection:text-dark">
            <CustomCursor />
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingScreen onComplete={() => setIsLoading(false)} />
              ) : (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsConditions />} />
                  <Route path="/cookies" element={<CookiesPolicy />} />
                </Routes>
              )}
            </AnimatePresence>
          </div>
        </BrowserRouter>
      </HirePanelProvider>
    </HelmetProvider>
  );
}

export default App;
