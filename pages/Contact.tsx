import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, User, MessageSquare, AlertCircle, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

// Mock function to simulate sending an email
const SendEmail = (formData: any): Promise<{ success: boolean }> => {
  console.log("Sending email with data:", formData);
  return new Promise(resolve => {
    setTimeout(() => {
      // Simulate a random success or failure
      // const success = Math.random() > 0.2; 
      const success = true; // Let's make it always succeed for demo
      resolve({ success });
    }, 1500);
  });
};

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setShowSuccessMessage(false);

    const result = await SendEmail(formData);

    if (result.success) {
      setShowSuccessMessage(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    } else {
      setError(t.errorMessage);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-bg-light min-h-screen py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
          <h1 className="text-4xl text-text-dark sm:text-5xl font-assistant font-bold">{t.contactTitle}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">{t.contactSubtitle}</p>
        </motion.div>
        
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="py-12 px-6 sm:p-12 lg:p-16">
            <h2 className="text-2xl font-bold text-text-dark font-assistant">{t.contactInfo}</h2>
            <div className="mt-6 text-gray-600 space-y-4">
              <p className="flex items-center">
                <Mail className="flex-shrink-0 h-6 w-6 text-primary me-3" />
                <span>support@tosafix.com</span>
              </p>
            </div>
          </div>

          <div className="py-12 px-6 sm:p-12 lg:p-16 bg-gray-50/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">{t.nameLabel}</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} placeholder={t.nameLabel} className="block w-full rounded-md border-gray-300 ps-10 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3" />
                </div>
              </div>
              <div>
                 <label htmlFor="phone" className="sr-only">{t.phoneLabel}</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} placeholder={t.phoneLabel} className="block w-full rounded-md border-gray-300 ps-10 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3" />
                </div>
              </div>
              <div>
                 <label htmlFor="email" className="sr-only">{t.emailLabel}</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} placeholder={t.emailLabel} className="block w-full rounded-md border-gray-300 ps-10 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3" />
                </div>
              </div>
              <div>
                 <label htmlFor="message" className="sr-only">{t.messageLabel}</label>
                 <div className="relative">
                   <div className="pointer-events-none absolute top-3 left-0 flex items-center ps-3">
                     <MessageSquare className="h-5 w-5 text-gray-400" />
                   </div>
                   <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleInputChange} placeholder={t.messageLabel} className="block w-full rounded-md border-gray-300 ps-10 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3" />
                </div>
              </div>
              
              <div className="pt-2">
                <AnimatePresence>
                  {showSuccessMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center"
                      role="alert"
                    >
                      <CheckCircle className="h-5 w-5 me-2" />
                      <span className="block sm:inline">{t.successMessage}</span>
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center"
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
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-text-dark bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary/50 disabled:cursor-not-allowed font-assistant"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 me-3 border-2 border-white border-t-transparent rounded-full"
                      ></motion.div>
                      {t.submittingButton}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 me-3" />
                      {t.submitButton}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}