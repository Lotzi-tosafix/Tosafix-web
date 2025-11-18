




import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Nosafix from './pages/Nusafix';
import Developers from './pages/Developers';
import NotiForum from './pages/extensions/Noti';
import Yamina from './pages/extensions/Yamina';
import NetSkin from './pages/extensions/NetSkin';
import HebrewDate from './pages/extensions/HebrewDate';
import MyEmoji from './pages/extensions/MyEmoji';
import EdgeOpener from './pages/extensions/EdgeOpener';
import BackToTopButton from './components/BackToTopButton';
import TempleTimerPopup from './components/TempleTimerPopup';
import Cutfix from './pages/nosafix/Cutfix';
import LiveMusic from './pages/nosafix/LiveMusic';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';
import MiniMusicPlayer from './components/MiniMusicPlayer';

function AppContent() {
  const { language, isHebrew } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = isHebrew ? 'rtl' : 'ltr';
  }, [language, isHebrew]);
  
  // Scroll to top or to anchor on route change
  useEffect(() => {
    const { hash } = location;
    // A small delay is needed because the element might not have been rendered yet when the route changes.
    const timer = setTimeout(() => {
      if (hash) {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <div className="font-sans bg-bg-light text-text-dark dark:bg-bg-dark dark:text-text-light">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/nosafix" element={<Nosafix />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/nosafix/fix-remover" element={<Cutfix />} />
          <Route path="/nosafix/live-music" element={<LiveMusic />} />
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
      <MiniMusicPlayer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <MusicPlayerProvider>
        <AppContent />
      </MusicPlayerProvider>
    </HashRouter>
  );
}

export default App;