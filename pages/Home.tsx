
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ExtensionsGrid from '../components/home/ExtensionsGrid';
import NosafixGrid from '../components/home/NusafixGrid';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExtensionsGrid />
      <NosafixGrid />
    </>
  );
}