
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NotiForum from './pages/extensions/Noti';
import Yamina from './pages/extensions/Yamina';
import NetSkin from './pages/extensions/NetSkin';
import HebrewDate from './pages/extensions/HebrewDate';
import MyEmoji from './pages/extensions/MyEmoji';
import EdgeOpener from './pages/extensions/EdgeOpener';
import BackToTopButton from './components/BackToTopButton';
import TempleTimerPopup from './components/TempleTimerPopup';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function AppContent() {
  const { language, isHebrew } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = isHebrew ? 'rtl' : 'ltr';
  }, [language, isHebrew]);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="font-sans bg-bg-light text-text-dark dark:bg-bg-dark dark:text-text-light">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/extensions/notiforum" element={<NotiForum />} />
          <Route path="/extensions/yamina" element={<Yamina />} />
          <Route path="/extensions/netskin" element={<NetSkin />} />
          <Route path="/extensions/hebrewdate" element={<HebrewDate />} />
          <Route path="/extensions/myemoji" element={<MyEmoji />} />
          <Route path="/extensions/edgeopener" element={<EdgeOpener />} />
        </Routes>
      </main>
      <Footer />
      {location.pathname !== '/' && <BackToTopButton />}
      <TempleTimerPopup />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;