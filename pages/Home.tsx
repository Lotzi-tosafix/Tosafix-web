
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ExtensionsGrid from '../components/home/ExtensionsGrid';
import NosafixGrid from '../components/home/NusafixGrid';

export default function Home() {
  const { language } = useLanguage();
  const title = language === 'he' ? 'Tosafix - תוספי כרום שימושיים' : 'Tosafix - Useful Chrome Extensions';
  const description = language === 'he' ? 'גלו קולקציה של תוספי כרום חכמים ושימושיים. הורדה קלה מחנות כרום.' : 'Discover a collection of smart and useful Chrome extensions. Easy download from Chrome Web Store.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <HeroSection />
      <AboutSection />
      <ExtensionsGrid />
      <NosafixGrid />
    </>
  );
}