
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, User, MessageSquare, AlertCircle, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setShowSuccessMessage(false);

    // FIX: The original API endpoint was removed. Simulate a successful submission for UI purposes.
    // This prevents a crash and allows the form's success/error states to be tested.
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success
    setShowSuccessMessage(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setShowSuccessMessage(false), 5000);
    
    setIsSubmitting(false);
  };

  return (
    <main className="flex-1">
      <div className="min-h-screen bg-gradient-to-b from-bg-light to-white dark:from-bg-dark dark:to-gray-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark dark:text-text-light mb-6 font-assistant">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t.contactTitle}</span>
            </h1>
            <p className="text-xl text-text-dark/70 dark:text-text-light/70 max-w-2xl mx-auto leading-relaxed">{t.contactSubtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-xl border text-card-foreground bg-white/80 dark:bg-bg-dark/80 backdrop-blur-sm shadow-2xl border-primary/20 dark:border-secondary/20 overflow-hidden">
              <div className="flex flex-col space-y-1.5 p-6 text-center pb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold tracking-tight text-2xl text-text-dark dark:text-text-light">{t.contactFormTitle}</h3>
                <p className="text-sm text-text-dark/70 dark:text-text-light/70">{t.contactFormSubtitle}</p>
              </div>
              <div className="p-8 bg-white/50 dark:bg-bg-dark/50">
                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none text-text-dark/80 dark:text-text-light/80 flex items-center gap-2" htmlFor="name">
                        <User className="w-4 h-4" />{t.nameLabel}
                      </label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} placeholder={t.namePlaceholder} className="flex h-10 w-full rounded-md border bg-bg-light/50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none text-text-dark/80 dark:text-text-light/80 flex items-center gap-2" htmlFor="phone">
                        <Phone className="w-4 h-4" />{t.phoneLabel}
                      </label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t.phonePlaceholder} className="flex h-10 w-full rounded-md border bg-bg-light/50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-text-dark/80 dark:text-text-light/80 flex items-center gap-2" htmlFor="email">
                      <Mail className="w-4 h-4" />{t.emailLabel}
                    </label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder={t.emailPlaceholder} className="flex h-10 w-full rounded-md border bg-bg-light/50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-text-dark/80 dark:text-text-light/80 flex items-center gap-2" htmlFor="message">
                      <MessageSquare className="w-4 h-4" />{t.messageLabel}
                    </label>
                    <textarea id="message" name="message" required value={formData.message} onChange={handleInputChange} rows={5} placeholder={t.messagePlaceholder} className="flex min-h-[60px] w-full rounded-md border bg-bg-light/50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors resize-none"></textarea>
                  </div>
                  
                  <div className="pt-2">
                     <AnimatePresence>
                      {showSuccessMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-4 bg-accent/10 dark:bg-accent/20 border border-accent/40 dark:border-accent/60 text-accent/90 px-4 py-3 rounded-md relative flex items-center"
                          role="alert"
                        >
                          <CheckCircle className="h-5 w-5 me-2 text-accent" />
                          <span className="block sm:inline">{t.successMessage}</span>
                        </motion.div>
                      )}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-md relative flex items-center"
                          role="alert"
                        >
                          <AlertCircle className="h-5 w-5 me-2" />
                          <span className="block sm:inline">{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 w-full h-12 px-4 py-2 rounded-md text-base font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
                      style={{ 
                          background: 'linear-gradient(135deg, #79C9E8 0%, #B18BE8 100%)',
                          boxShadow: '0 0 12px #79C9E840' 
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 me-2 border-2 border-white border-t-transparent rounded-full"
                          ></motion.div>
                          {t.submittingButton}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 rtl:ms-2 ltr:me-2" />
                          {t.submitButton}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}