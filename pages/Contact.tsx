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

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowSuccessMessage(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setShowSuccessMessage(false), 5000);
    
    setIsSubmitting(false);
  };

  return (
    <main className="flex-1">
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark dark:text-text-light mb-6 font-rubik">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t.contactTitle}</span>
            </h1>
            <p className="text-xl text-text-dark/70 dark:text-text-light/70 max-w-2xl mx-auto leading-relaxed font-light glass-card p-4 rounded-2xl inline-block">{t.contactSubtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card rounded-[2.5rem] border border-white/50 dark:border-white/10 overflow-hidden shadow-2xl">
              <div className="flex flex-col space-y-1.5 p-8 text-center pb-8 bg-gradient-to-b from-white/20 to-transparent">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold tracking-tight text-2xl text-text-dark dark:text-text-light font-rubik">{t.contactFormTitle}</h3>
                <p className="text-sm text-text-dark/70 dark:text-text-light/70 font-light">{t.contactFormSubtitle}</p>
              </div>
              <div className="p-8 md:p-12 pt-0">
                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold leading-none text-text-dark dark:text-text-light flex items-center gap-2" htmlFor="name">
                        <User className="w-4 h-4 text-primary" />{t.nameLabel}
                      </label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} placeholder={t.namePlaceholder} className="flex h-12 w-full rounded-xl border bg-white/40 dark:bg-black/20 border-gray-200 dark:border-gray-700 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all backdrop-blur-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold leading-none text-text-dark dark:text-text-light flex items-center gap-2" htmlFor="phone">
                        <Phone className="w-4 h-4 text-primary" />{t.phoneLabel}
                      </label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t.phonePlaceholder} className="flex h-12 w-full rounded-xl border bg-white/40 dark:bg-black/20 border-gray-200 dark:border-gray-700 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all backdrop-blur-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold leading-none text-text-dark dark:text-text-light flex items-center gap-2" htmlFor="email">
                      <Mail className="w-4 h-4 text-primary" />{t.emailLabel}
                    </label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder={t.emailPlaceholder} className="flex h-12 w-full rounded-xl border bg-white/40 dark:bg-black/20 border-gray-200 dark:border-gray-700 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all backdrop-blur-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold leading-none text-text-dark dark:text-text-light flex items-center gap-2" htmlFor="message">
                      <MessageSquare className="w-4 h-4 text-primary" />{t.messageLabel}
                    </label>
                    <textarea id="message" name="message" required value={formData.message} onChange={handleInputChange} rows={5} placeholder={t.messagePlaceholder} className="flex min-h-[100px] w-full rounded-xl border bg-white/40 dark:bg-black/20 border-gray-200 dark:border-gray-700 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all resize-none backdrop-blur-sm"></textarea>
                  </div>
                  
                  <div className="pt-4">
                     <AnimatePresence>
                      {showSuccessMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-4 bg-green-100/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-xl relative flex items-center backdrop-blur-sm"
                          role="alert"
                        >
                          <CheckCircle className="h-5 w-5 me-2" />
                          <span className="block sm:inline font-medium">{t.successMessage}</span>
                        </motion.div>
                      )}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-4 bg-red-100/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative flex items-center backdrop-blur-sm"
                          role="alert"
                        >
                          <AlertCircle className="h-5 w-5 me-2" />
                          <span className="block sm:inline font-medium">{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 w-full h-14 px-4 py-2 rounded-xl text-lg font-bold text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/40 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
                      style={{ 
                          background: 'linear-gradient(135deg, #79C9E8 0%, #B18BE8 100%)',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-6 h-6 me-2 border-2 border-white border-t-transparent rounded-full"
                          ></motion.div>
                          {t.submittingButton}
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6 rtl:ms-2 ltr:me-2" />
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