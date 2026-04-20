
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Nosafix from './pages/Nusafix';
import Developers from './pages/Developers';
import ScripFix from './pages/ScripFix';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotiForum from './pages/extensions/Noti';
import Yamina from './pages/extensions/Yamina';
import GFD from './pages/extensions/GFD';
import NetSkin from './pages/extensions/NetSkin';
import HebrewDate from './pages/extensions/HebrewDate';
import MyEmoji from './pages/extensions/MyEmoji';
import EdgeOpener from './pages/extensions/EdgeOpener';
import NodeBBPlus from './pages/extensions/NodeBBPlus';
import NotFound from './pages/NotFound';
import BackToTopButton from './components/BackToTopButton';
import Cutfix from './pages/nosafix/Cutfix';
import LiveMusic from './pages/nosafix/LiveMusic';
import FixChecker from './pages/nosafix/FixChecker';
import QrFix from './pages/nosafix/QrFix';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';
import MiniMusicPlayer from './components/MiniMusicPlayer';
import KofiWidget from './components/KofiWidget';

function AppContent() {
  const { language, isHebrew } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = isHebrew ? 'rtl' : 'ltr';

    // Dynamic Title Update
    if (isHebrew) {
        document.title = 'תוספיקס - תוספי כרום שימושיים';
    } else {
        document.title = 'Tosafix - Useful Chrome Extensions';
    }
  }, [language, isHebrew]);
  
  // Scroll to top or to anchor on route change
  useEffect(() => {
    const { hash } = location;
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
    <div className="relative min-h-screen font-sans text-text-dark dark:text-text-light selection:bg-primary/30">
      {/* Global Animated Background (Aurora) */}
      <div className="fixed inset-0 -z-10 bg-bg-light dark:bg-bg-dark transition-colors duration-500">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-400/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-blue-400/30 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-pink-400/30 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
            <div className="absolute inset-0 opacity-20 mix-blend-soft-light" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
        </div>
      </div>

      <Header />
      
      <main className="relative z-0 pt-20 pb-10 min-h-[calc(100vh-200px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/nosafix" element={<Nosafix />} />
          <Route path="/scripfix" element={<ScripFix />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/nosafix/fix-remover" element={<Cutfix />} />
          <Route path="/nosafix/live-music" element={<LiveMusic />} />
          <Route path="/nosafix/fix-checker" element={<FixChecker />} />
          <Route path="/nosafix/qr-fix" element={<QrFix />} />
          <Route path="/extensions/notiforum" element={<NotiForum />} />
          <Route path="/extensions/yamina" element={<Yamina />} />
          <Route path="/extensions/gfd" element={<GFD />} />
          <Route path="/extensions/netskin" element={<NetSkin />} />
          <Route path="/extensions/hebrewdate" element={<HebrewDate />} />
          <Route path="/extensions/myemoji" element={<MyEmoji />} />
          <Route path="/extensions/edgeopener" element={<EdgeOpener />} />
          <Route path="/extensions/nodebbplus" element={<NodeBBPlus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      
      {location.pathname !== '/' && <BackToTopButton />}
      <MiniMusicPlayer />
      <KofiWidget />
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
