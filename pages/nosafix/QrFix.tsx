
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';
// @ts-ignore
import QRCodeStyling from 'qr-code-styling';
// @ts-ignore
import html2canvas from 'html2canvas';
import { QrCode, Link as LinkIcon, FileText, Wifi, Smartphone, Mail, User, Bitcoin, Download, Palette, Shapes, Image as ImageIcon, ChevronDown, MessageSquare } from 'lucide-react';

type QrType = 'url' | 'text' | 'wifi' | 'whatsapp' | 'email' | 'vcard' | 'crypto' | 'sms';
type FrameType = 'none' | 'phone' | 'bubble-top' | 'polite';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ElementType;
}

const Input: React.FC<InputProps> = ({ label, icon: Icon, className, ...props }) => (
    <div className={`space-y-1.5 ${className || ''}`}>
        <label className="block text-xs font-bold text-text-dark dark:text-text-light">{label}</label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
            )}
            <input 
                className={`block w-full p-3 ${Icon ? 'ps-9' : ''} text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary transition-all shadow-sm`} 
                {...props} 
            />
        </div>
    </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, className, ...props }) => (
    <div className={`space-y-1.5 ${className || ''}`}>
        <label className="block text-xs font-bold text-text-dark dark:text-text-light">{label}</label>
        <textarea 
            rows={3}
            className={`block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary transition-all shadow-sm resize-none ${className || ''}`}
            {...props} 
        />
    </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
}

const Select: React.FC<SelectProps> = ({ label, children, ...props }) => (
    <div className="space-y-1.5">
        <label className="block text-xs font-bold text-text-dark dark:text-text-light">{label}</label>
        <select 
            className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary transition-all shadow-sm appearance-none" 
            {...props}
        >
            {children}
        </select>
    </div>
);

interface ColorPickerProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, name, value, onChange }) => (
    <div className="space-y-1.5">
        <label className="block text-xs font-bold text-text-dark dark:text-text-light">{label}</label>
        <div className="flex items-center gap-3 p-1.5 bg-white/50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-700">
            <input 
                type="color" 
                name={name}
                value={value} 
                onChange={onChange}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent" 
            />
            <span className="text-xs font-mono text-gray-500 uppercase">{value}</span>
        </div>
    </div>
);

interface AccordionItemProps {
    title: string;
    icon: React.ElementType;
    isOpen: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon: Icon, isOpen, onClick, children }) => (
    <div className="border-b border-gray-200 dark:border-gray-700/50 last:border-0">
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between p-4 transition-colors ${isOpen ? 'bg-primary/5' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${isOpen ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                    <Icon size={18} />
                </div>
                <span className={`text-sm font-bold ${isOpen ? 'text-primary' : 'text-text-dark dark:text-text-light'}`}>{title}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-gray-400'}`} />
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="p-4 pt-0">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const QrFix = () => {
    const { language, isHebrew } = useLanguage();
    const t = translations[language];
    const [qrType, setQrType] = useState<QrType>('url');
    
    // Defaults for Placeholders & Fallback logic
    const defaults = {
        url: 'https://www.google.com',
        text: 'Hello World',
        wifiSsid: 'MyWiFi',
        wifiPass: 'password123',
        waPhone: '972500000000',
        waText: 'Hello!',
        smsPhone: '972500000000',
        smsBody: 'Hello!',
        emailAddr: 'example@mail.com',
        emailSub: 'Subject',
        emailBody: 'Message...',
        vFirst: 'Israel',
        vLast: 'Israeli',
        vPhone: '0500000000',
        vEmail: 'israel@example.com',
        vOrg: 'Tosafix',
        cryptoAddr: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        frameText: 'Scan Me!'
    };

    // Form State - Initialize as empty to show placeholders
    const [formData, setFormData] = useState({
        url: '',
        text: '',
        wifiSsid: '',
        wifiPass: '',
        wifiType: 'WPA',
        waPhone: '',
        waText: '',
        smsPhone: '',
        smsBody: '',
        emailAddr: '',
        emailSub: '',
        emailBody: '',
        vFirst: '',
        vLast: '',
        vPhone: '',
        vEmail: '',
        vOrg: '',
        cryptoType: 'bitcoin',
        cryptoAddr: ''
    });

    // Design State
    const [design, setDesign] = useState({
        useGradient: false,
        color1: '#000000',
        color2: '#0d6efd',
        gradientType: 'linear',
        gradientRotation: 45,
        bgColor: '#ffffff',
        dotsStyle: 'square',
        cornerSquareStyle: 'square',
        cornerDotStyle: 'square',
        logo: null as string | null,
        logoSize: 0.4,
        hideDots: true
    });

    // Frame State
    const [frame, setFrame] = useState({
        type: 'none' as FrameType,
        labelText: '', // Empty to use placeholder default
        color: '#0d6efd'
    });

    // Accordion State
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const qrCodeRef = useRef<any>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Initialize QR Code
    useEffect(() => {
        qrCodeRef.current = new QRCodeStyling({
            width: 260,
            height: 260,
            type: "canvas", 
            data: defaults.url,
            image: "",
            dotsOptions: { color: "#000000", type: "square" },
            backgroundOptions: { color: "#ffffff" },
            imageOptions: { crossOrigin: "anonymous", margin: 10 }
        });
        if (canvasRef.current) {
            canvasRef.current.innerHTML = '';
            qrCodeRef.current.append(canvasRef.current);
        }
    }, []);

    // Update QR Code on changes
    useEffect(() => {
        if (!qrCodeRef.current) return;

        let data = defaults.url;
        try {
            switch (qrType) {
                case 'url': data = formData.url || defaults.url; break;
                case 'text': data = formData.text || defaults.text; break;
                case 'wifi': data = `WIFI:S:${formData.wifiSsid || defaults.wifiSsid};T:${formData.wifiType};P:${formData.wifiPass || defaults.wifiPass};;`; break;
                case 'whatsapp': data = `https://wa.me/${formData.waPhone || defaults.waPhone}?text=${encodeURIComponent(formData.waText || defaults.waText)}`; break;
                case 'sms': data = `sms:${formData.smsPhone || defaults.smsPhone}?body=${encodeURIComponent(formData.smsBody || defaults.smsBody)}`; break;
                case 'email': data = `mailto:${formData.emailAddr || defaults.emailAddr}?subject=${formData.emailSub || defaults.emailSub}&body=${formData.emailBody || defaults.emailBody}`; break;
                case 'vcard': data = `BEGIN:VCARD\nVERSION:3.0\nN:${formData.vLast || defaults.vLast};${formData.vFirst || defaults.vFirst}\nFN:${formData.vFirst || defaults.vFirst} ${formData.vLast || defaults.vLast}\nORG:${formData.vOrg || defaults.vOrg}\nTEL:${formData.vPhone || defaults.vPhone}\nEMAIL:${formData.vEmail || defaults.vEmail}\nEND:VCARD`; break;
                case 'crypto': data = `${formData.cryptoType}:${formData.cryptoAddr || defaults.cryptoAddr}`; break;
            }
        } catch(e) { console.error("Data build error", e); }

        let dotsOptions: any = { type: design.dotsStyle };
        
        if (design.useGradient) {
            dotsOptions.gradient = {
                type: design.gradientType,
                rotation: design.gradientRotation * (Math.PI / 180),
                colorStops: [{ offset: 0, color: design.color1 }, { offset: 1, color: design.color2 }]
            };
        } else {
            dotsOptions.color = design.color1;
            dotsOptions.gradient = null; 
        }

        qrCodeRef.current.update({
            data: data,
            dotsOptions: dotsOptions,
            backgroundOptions: { color: design.bgColor },
            cornersSquareOptions: { type: design.cornerSquareStyle, color: design.color1 },
            cornersDotOptions: { type: design.cornerDotStyle, color: design.color1 },
            image: design.logo,
            imageOptions: {
                hideBackgroundDots: design.hideDots,
                imageSize: design.logoSize,
                margin: 5
            }
        });

    }, [formData, design, qrType]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // @ts-ignore
        const checked = e.target.checked;

        if (name === 'labelText') {
             setFrame(prev => ({ ...prev, labelText: value }));
        } else if (name in formData) {
            setFormData({ ...formData, [name]: value });
        } else if (name in design) {
             setDesign(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
             }));
        } else if (name in frame) {
            setFrame(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setDesign(prev => ({ ...prev, logo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        } else {
            setDesign(prev => ({ ...prev, logo: null }));
        }
    };

    const downloadFinalImage = () => {
        const element = document.getElementById('final-render-area');
        if(!element) return;
        
        html2canvas(element, {
            scale: 3, 
            backgroundColor: null,
            useCORS: true, 
            logging: false
        }).then((canvas: HTMLCanvasElement) => {
            const link = document.createElement('a');
            link.download = `tosafix-qr-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };

    const qrTypes = [
        { id: 'url', label: t.qrTypeUrl, icon: LinkIcon },
        { id: 'text', label: t.qrTypeText, icon: FileText },
        { id: 'wifi', label: t.qrTypeWifi, icon: Wifi },
        { id: 'whatsapp', label: t.qrTypeWhatsapp, icon: Smartphone },
        { id: 'sms', label: t.qrTypeSms, icon: MessageSquare },
        { id: 'email', label: t.qrTypeEmail, icon: Mail },
        { id: 'vcard', label: t.qrTypeVcard, icon: User },
        { id: 'crypto', label: t.qrTypeCrypto, icon: Bitcoin },
    ];

    const frameStyles = `
        #final-render-area {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            background: transparent;
            padding: 15px;
        }
        .frame-phone {
            border: 10px solid var(--frame-color, #222);
            border-radius: 40px;
            padding: 50px 20px 60px 20px !important;
            background: #fff !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            position: relative;
        }
        .frame-phone::before { 
            content: ''; width: 50px; height: 5px; 
            background: var(--frame-color, #222);
            opacity: 0.3;
            position: absolute; top: 20px; left: 50%; transform: translateX(-50%); 
            border-radius: 10px; 
        }
        .frame-phone::after { 
            content: ''; width: 35px; height: 35px; 
            border: 3px solid var(--frame-color, #222);
            opacity: 0.3;
            position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); 
            border-radius: 50%; 
        }
        .frame-phone .frame-label {
            color: var(--frame-color, #222);
            font-size: 1.25rem;
            font-weight: 800;
            margin-bottom: 15px;
        }
        .frame-bubble-top {
            background: var(--frame-color, #0d6efd) !important;
            padding: 0 !important;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            overflow: hidden;
            min-width: 300px;
        }
        .frame-bubble-top .frame-label-container {
            padding: 12px;
        }
        .frame-bubble-top .frame-label {
            color: white;
            font-weight: 800;
            font-size: 1.2rem;
        }
        .frame-bubble-top-inner {
            background: white;
            margin: 0 8px 8px 8px;
            border-radius: 18px;
            padding: 15px;
            display: flex;
            justify-content: center;
        }
        .frame-polite {
            background: white !important;
            border: 5px solid var(--frame-color, #000);
            border-radius: 18px;
            padding: 15px !important;
            box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }
        .frame-polite .frame-label {
            color: var(--frame-color, #000);
            font-size: 1.25rem;
            font-weight: 800;
            margin-top: 12px;
        }
    `;

    return (
        <div className="py-10 px-4">
            <style>{frameStyles}</style>
            <div className="max-w-[1300px] mx-auto">
                <header className="text-center mb-10">
                    <div className="inline-block p-3 rounded-[1.5rem] glass-card mb-4 shadow-sm">
                        <QrCode className="w-10 h-10 text-primary mx-auto" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-text-dark dark:text-text-light font-rubik">
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t.qrFixPageTitle}</span>
                    </h1>
                    <div className="max-w-xl mx-auto mt-4 glass-card p-3 rounded-2xl border border-white/40 shadow-sm">
                        <p className="text-sm text-text-dark/70 dark:text-text-light/70 font-light">{t.qrFixPageSubtitle}</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="glass-card rounded-[2rem] p-5 border border-white/40 dark:border-white/10 shadow-sm">
                            <h3 className="text-sm font-bold text-text-dark dark:text-text-light mb-4">{t.qrSectionContent}</h3>
                            <div className="flex flex-wrap gap-2">
                                {qrTypes.map((type) => {
                                    const Icon = type.icon;
                                    const isActive = qrType === type.id;
                                    return (
                                        <button
                                            key={type.id}
                                            onClick={() => setQrType(type.id as QrType)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 border text-xs ${
                                                isActive 
                                                ? 'bg-primary text-white shadow-md border-primary font-bold' 
                                                : 'bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-white/10 text-text-dark dark:text-text-light border-transparent'
                                            }`}
                                        >
                                            <Icon size={16} />
                                            <span>{type.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="glass-card rounded-[2rem] p-6 border border-white/40 dark:border-white/10 shadow-sm">
                            <AnimatePresence mode="wait">
                                <motion.div key={qrType} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                                    {qrType === 'url' && (
                                        <Input label={t.qrLabelUrl} name="url" value={formData.url} onChange={handleInputChange} placeholder={defaults.url} icon={LinkIcon} />
                                    )}
                                    {qrType === 'text' && (
                                        <TextArea label={t.qrLabelText} name="text" value={formData.text} onChange={handleInputChange} placeholder={defaults.text} />
                                    )}
                                    {qrType === 'wifi' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input label={t.qrLabelSsid} name="wifiSsid" value={formData.wifiSsid} onChange={handleInputChange} placeholder={defaults.wifiSsid} />
                                            <Input label={t.qrLabelPassword} name="wifiPass" value={formData.wifiPass} onChange={handleInputChange} type="password" placeholder={defaults.wifiPass} />
                                            <div className="md:col-span-2">
                                                <Select label={t.qrLabelEncryption} name="wifiType" value={formData.wifiType} onChange={handleInputChange}>
                                                    <option value="WPA">WPA/WPA2</option>
                                                    <option value="WEP">WEP</option>
                                                    <option value="nopass">None</option>
                                                </Select>
                                            </div>
                                        </div>
                                    )}
                                    {qrType === 'whatsapp' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input label={t.qrLabelPhone} name="waPhone" value={formData.waPhone} onChange={handleInputChange} placeholder={defaults.waPhone} />
                                            <Input label={t.qrLabelMessage} name="waText" value={formData.waText} onChange={handleInputChange} placeholder={defaults.waText} />
                                        </div>
                                    )}
                                    {qrType === 'sms' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input label={t.qrLabelPhone} name="smsPhone" value={formData.smsPhone} onChange={handleInputChange} placeholder={defaults.smsPhone} />
                                            <TextArea label={t.qrLabelMessage} name="smsBody" value={formData.smsBody} onChange={handleInputChange} className="md:col-span-2" placeholder={defaults.smsBody} />
                                        </div>
                                    )}
                                    {qrType === 'email' && (
                                        <div className="space-y-3">
                                            <Input label={t.qrLabelEmailAddr} name="emailAddr" value={formData.emailAddr} onChange={handleInputChange} type="email" placeholder={defaults.emailAddr} />
                                            <Input label={t.qrLabelSubject} name="emailSub" value={formData.emailSub} onChange={handleInputChange} placeholder={defaults.emailSub} />
                                            <TextArea label={t.qrLabelBody} name="emailBody" value={formData.emailBody} onChange={handleInputChange} placeholder={defaults.emailBody} />
                                        </div>
                                    )}
                                    {qrType === 'vcard' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input label={t.qrLabelFirstName} name="vFirst" value={formData.vFirst} onChange={handleInputChange} placeholder={defaults.vFirst} />
                                            <Input label={t.qrLabelLastName} name="vLast" value={formData.vLast} onChange={handleInputChange} placeholder={defaults.vLast} />
                                            <Input label={t.qrLabelPhone} name="vPhone" value={formData.vPhone} onChange={handleInputChange} placeholder={defaults.vPhone} />
                                            <Input label={t.qrLabelEmailAddr} name="vEmail" value={formData.vEmail} onChange={handleInputChange} type="email" placeholder={defaults.vEmail} />
                                            <div className="md:col-span-2">
                                                <Input label={t.qrLabelOrg} name="vOrg" value={formData.vOrg} onChange={handleInputChange} placeholder={defaults.vOrg} />
                                            </div>
                                        </div>
                                    )}
                                    {qrType === 'crypto' && (
                                        <div className="space-y-3">
                                            <Select label={t.qrLabelCryptoType} name="cryptoType" value={formData.cryptoType} onChange={handleInputChange}>
                                                <option value="bitcoin">Bitcoin</option>
                                                <option value="ethereum">Ethereum</option>
                                            </Select>
                                            <Input label={t.qrLabelWallet} name="cryptoAddr" value={formData.cryptoAddr} onChange={handleInputChange} placeholder={defaults.cryptoAddr} />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="glass-card rounded-[2rem] overflow-hidden border border-white/40 dark:border-white/10 shadow-sm">
                            <h3 className="p-4 text-base font-bold text-text-dark dark:text-text-light border-b border-gray-200 dark:border-gray-700/50 bg-white/20 dark:bg-black/10 backdrop-blur-sm">{t.qrSectionDesign}</h3>
                            <AccordionItem title={t.qrSectionColors} icon={Palette} isOpen={openAccordion === 'colors'} onClick={() => setOpenAccordion(openAccordion === 'colors' ? null : 'colors')}>
                                <div className="space-y-4">
                                     <div className="flex items-center gap-2">
                                        <input type="checkbox" name="useGradient" id="useGradient" checked={design.useGradient} onChange={handleInputChange} className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300" />
                                        <label htmlFor="useGradient" className="text-sm font-medium">{t.qrLabelUseGradient}</label>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <ColorPicker label={t.qrLabelColorStart} name="color1" value={design.color1} onChange={handleInputChange} />
                                        {design.useGradient && <ColorPicker label={t.qrLabelColorEnd} name="color2" value={design.color2} onChange={handleInputChange} />}
                                    </div>
                                    {design.useGradient && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-white/30 dark:bg-black/20 rounded-xl">
                                            <Select label={t.qrLabelGradientType} name="gradientType" value={design.gradientType} onChange={handleInputChange}>
                                                <option value="linear">{t.qrLabelLinear}</option>
                                                <option value="radial">{t.qrLabelRadial}</option>
                                            </Select>
                                            <Input label={t.qrLabelRotation} name="gradientRotation" type="number" value={design.gradientRotation} onChange={handleInputChange} />
                                        </div>
                                    )}
                                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700/50">
                                         <ColorPicker label={t.qrLabelBgColor} name="bgColor" value={design.bgColor} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </AccordionItem>
                            <AccordionItem title={t.qrSectionShapes} icon={Shapes} isOpen={openAccordion === 'shapes'} onClick={() => setOpenAccordion(openAccordion === 'shapes' ? null : 'shapes')}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Select label={t.qrLabelDotsStyle} name="dotsStyle" value={design.dotsStyle} onChange={handleInputChange}>
                                        <option value="square">Square</option>
                                        <option value="dots">Dots</option>
                                        <option value="rounded">Rounded</option>
                                        <option value="classy">Classy</option>
                                    </Select>
                                    <Select label={t.qrLabelCornerSq} name="cornerSquareStyle" value={design.cornerSquareStyle} onChange={handleInputChange}>
                                        <option value="square">Square</option>
                                        <option value="dot">Dot</option>
                                    </Select>
                                    <Select label={t.qrLabelCornerDot} name="cornerDotStyle" value={design.cornerDotStyle} onChange={handleInputChange}>
                                        <option value="square">Square</option>
                                        <option value="dot">Dot</option>
                                    </Select>
                                </div>
                            </AccordionItem>
                            <AccordionItem title={t.qrSectionLogo} icon={ImageIcon} isOpen={openAccordion === 'logo'} onClick={() => setOpenAccordion(openAccordion === 'logo' ? null : 'logo')}>
                                <div className="space-y-4">
                                    <div className="p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center bg-white/20 dark:bg-black/10">
                                        <label className="cursor-pointer block">
                                             <span className="block text-xs font-medium mb-1">{t.qrLabelUploadLogo}</span>
                                             <input type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-xs text-gray-500 file:me-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white" />
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-4">
                                         <div className="flex-grow">
                                            <label className="block text-xs font-bold mb-1">{t.qrLabelLogoSize}</label>
                                            <input type="range" name="logoSize" min="0.1" max="0.5" step="0.05" value={design.logoSize} onChange={handleInputChange} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" />
                                         </div>
                                         <div className="flex items-center gap-2 pt-3">
                                             <input type="checkbox" id="hideDots" name="hideDots" checked={design.hideDots} onChange={handleInputChange} className="w-4 h-4 rounded text-primary" />
                                             <label htmlFor="hideDots" className="text-xs font-medium">{t.qrLabelHideDots}</label>
                                         </div>
                                    </div>
                                </div>
                            </AccordionItem>
                            <AccordionItem title={t.qrSectionFrames} icon={Smartphone} isOpen={openAccordion === 'frames'} onClick={() => setOpenAccordion(openAccordion === 'frames' ? null : 'frames')}>
                                <div className="space-y-4">
                                     <Select label={t.qrLabelFrameStyle} name="type" value={frame.type} onChange={handleInputChange}>
                                        <option value="none">{t.qrFrameNone}</option>
                                        <option value="phone">{t.qrFramePhone}</option>
                                        <option value="bubble-top">{t.qrFrameBubble}</option>
                                        <option value="polite">{t.qrFramePolite}</option>
                                    </Select>
                                    {frame.type !== 'none' && (
                                        <div className="space-y-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
                                            <Input label={t.qrLabelFrameText} name="labelText" value={frame.labelText} onChange={handleInputChange} placeholder={defaults.frameText} />
                                            <ColorPicker label={t.qrLabelFrameColor} name="color" value={frame.color} onChange={handleInputChange} />
                                        </div>
                                    )}
                                </div>
                            </AccordionItem>
                        </div>
                    </div>

                    <div className="lg:col-span-4 sticky top-28 z-20">
                        <div className="glass-card rounded-[2rem] p-6 text-center border border-white/40 dark:border-white/10 shadow-xl overflow-hidden">
                            <h3 className="text-xl font-bold mb-6 text-text-dark dark:text-text-light font-rubik">{t.qrPreview}</h3>
                            <div className="flex justify-center mb-6 scale-90 sm:scale-100">
                                <div id="final-render-area" className={frame.type !== 'none' ? `frame-${frame.type}` : ''} style={{ '--frame-color': frame.color } as React.CSSProperties}>
                                    {frame.type === 'bubble-top' && <div className="frame-label-container"><span className="frame-label">{frame.labelText || defaults.frameText}</span></div>}
                                    {frame.type === 'phone' && <span className="frame-label">{frame.labelText || defaults.frameText}</span>}
                                    <div className={frame.type === 'bubble-top' ? 'frame-bubble-top-inner' : ''}><div ref={canvasRef} /></div>
                                    {frame.type === 'polite' && <span className="frame-label">{frame.labelText || defaults.frameText}</span>}
                                </div>
                            </div>
                            <button onClick={downloadFinalImage} className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-base shadow-lg transition-all transform hover:-translate-y-1">
                                <Download size={20} /> {t.qrDownloadHighQuality}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrFix;
