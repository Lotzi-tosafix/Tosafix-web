
import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { commonTranslations } from '../translations/common';

declare global {
  interface Window {
    kofiWidgetOverlay: any;
  }
}

const KofiWidget: React.FC = () => {
  const { language, isHebrew } = useLanguage();
  const t = commonTranslations[language as keyof typeof commonTranslations];

  useEffect(() => {
    // Function to initialize or re-initialize the widget
    const initKofi = () => {
      if (window.kofiWidgetOverlay) {
        // Remove existing widget if any to avoid duplicates
        const existingWidget = document.getElementById('kofi-widget-overlay') || 
                               document.querySelector('.kofi-iframe-container');
        if (existingWidget) {
          existingWidget.remove();
        }

        window.kofiWidgetOverlay.draw('lotzi', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': t.supportMe,
          'floating-chat.donateButton.background-color': '#79C9E8', // Primary color
          'floating-chat.donateButton.text-color': '#fff'
        });

        // Adjust position based on language
        const styleId = 'kofi-custom-style';
        let styleElement = document.getElementById(styleId);
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = styleId;
          document.head.appendChild(styleElement);
        }

        styleElement.innerHTML = `
          .kofi-iframe-container {
            ${isHebrew ? 'left: 20px !important; right: auto !important;' : 'right: 20px !important; left: auto !important;'}
            bottom: 20px !important;
          }
          /* Adjust for mobile if needed */
          @media (max-width: 768px) {
            .kofi-iframe-container {
              ${isHebrew ? 'left: 10px !important; right: auto !important;' : 'right: 10px !important; left: auto !important;'}
              bottom: 10px !important;
            }
          }
        `;
      }
    };

    // Load script if not already loaded
    if (!document.querySelector('script[src*="ko-fi.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
      script.async = true;
      script.onload = initKofi;
      document.body.appendChild(script);
    } else {
      initKofi();
    }

    return () => {
      // Cleanup if necessary, though usually we want it to stay
    };
  }, [language, isHebrew, t.supportMe]);

  return null;
};

export default KofiWidget;
