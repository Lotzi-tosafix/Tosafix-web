

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

const QrFix = () => {
    const { language, isHebrew } = useLanguage();
    const t = translations[language];
    const [qrType, setQrType] = useState<QrType>('url');
    
    // Form State
    const [formData, setFormData] = useState({
        url: 'https://www.google.com',
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
        text: 'Scan Me!',
        color: '#0d6efd'
    });

    // Accordion State
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const qrCodeRef = useRef<any>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Initialize QR Code
    useEffect(() => {
        qrCodeRef.current = new QRCodeStyling({
            width: 280,
            height: 280,
            type: "canvas", // Must be canvas for html2canvas to work properly
            data: "https://www.google.com",
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

        // 1. Build Data
        let data = "https://www.google.com";
        try {
            switch (qrType) {
                case 'url': data = formData.url; break;
                case 'text': data = formData.text || " "; break;
                case 'wifi': data = `WIFI:S:${formData.wifiSsid};T:${formData.wifiType};P:${formData.wifiPass};;`; break;
                case 'whatsapp': data = `https://wa.me/${formData.waPhone}?text=${encodeURIComponent(formData.waText)}`; break;
                case 'sms': data = `sms:${formData.smsPhone}?body=${encodeURIComponent(formData.smsBody)}`; break;
                case 'email': data = `mailto:${formData.emailAddr}?subject=${formData.emailSub}&body=${formData.emailBody}`; break;
                case 'vcard': data = `BEGIN:VCARD\nVERSION:3.0\nN:${formData.vLast};${formData.vFirst}\nFN:${formData.vFirst} ${formData.vLast}\nORG:${formData.vOrg}\nTEL:${formData.vPhone}\nEMAIL:${formData.vEmail}\nEND:VCARD`; break;
                case 'crypto': data = `${formData.cryptoType}:${formData.cryptoAddr}`; break;
            }
        } catch(e) { console.error("Data build error", e); }

        // 2. Build Dots Options (Color / Gradient)
        let dotsOptions: any = { type: design.dotsStyle };
        if (design.useGradient) {
            dotsOptions.gradient = {
                type: design.gradientType,
                rotation: design.gradientRotation * (Math.PI / 180),
                colorStops: [{ offset: 0, color: design.color1 }, { offset: 1, color: design.color2 }]
            };
        } else {
            dotsOptions.color = design.color1;
        }

        // 3. Update
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

        if (name in formData) {
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
        
        // Use html2canvas to capture the styled frame and QR
        html2canvas(element, {
            scale: 3, // Higher resolution
            backgroundColor: null,
            useCORS: true, // For external images if any
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

    // --- Frame Logic Styles ---
    // In React, we inject these specific styles for the frames
    const frameStyles = `
        /* Wrapper */
        #final-render-area {
            display: inline-block;
            transition: all 0.3s;
            background: transparent;
            padding: 10px;
        }

        /* Frame: Phone */
        .frame-phone {
            border: 12px solid #333;
            border-radius: 40px;
            padding: 40px 20px 60px 20px;
            background: #fff;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .frame-phone::before { content: ''; width: 60px; height: 6px; background: #333; position: absolute; top: 15px; left: 50%; transform: translateX(-50%); border-radius: 10px; }
        .frame-phone::after { content: ''; width: 40px; height: 40px; border: 4px solid #333; position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); border-radius: 50%; }

        /* Frame: Bubble Top */
        .frame-bubble-top {
            background: var(--frame-color, #0d6efd);
            padding: 15px;
            border-radius: 20px;
            padding-top: 50px;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .frame-bubble-top .frame-label {
            position: absolute;
            top: 15px;
            left: 0; right: 0;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
            text-transform: uppercase;
            text-align: center;
            font-family: sans-serif;
            display: block;
        }
        .frame-bubble-top-inner {
            background: white;
            padding: 10px;
            border-radius: 15px;
        }

        /* Frame: Polite */
        .frame-polite {
            border: 4px solid var(--frame-color, #000);
            border-radius: 15px;
            padding: 15px;
            padding-bottom: 45px;
            position: relative;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .frame-polite .frame-label {
            position: absolute;
            bottom: 10px;
            left: 0; right: 0;
            color: var(--frame-color, #000);
            font-size: 1.2rem;
            font-weight: bold;
            text-align: center;
            display: block;
        }
    `;

    return (
        <div className="min-h-screen py-20 px-4">
            <style>{frameStyles}</style>
            <div className="max-w-[1400px] mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-block p-4 rounded-[2rem] glass-card mb-6">
                        <QrCode className="w-12 h-12 text-primary mx-auto" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-text-dark dark:text-text-light font-rubik">
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t.qrFixPageTitle}</span>
                    </h1>
                    <p className="mt-4 text-xl text-text-dark/70 dark:text-text-light/70 font-light max-w-2xl mx-auto">{t.qrFixPageSubtitle}</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Sidebar: Settings (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* 1. Content Type Selector */}
                        <div className="glass-card rounded-[2rem] p-6 border border-white/40 dark:border-white/10">
                            <h3 className="text-lg font-bold text-text-dark dark:text-text-light mb-4">{t.qrSectionContent}</h3>
                            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                                {qrTypes.map((type) => {
                                    const Icon = type.icon;
                                    const isActive = qrType === type.id;
                                    return (
                                        <button
                                            key={type.id}
                                            onClick={() => setQrType(type.id as QrType)}
                                            className={`flex flex-col sm:flex-row items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 border ${
                                                isActive 
                                                ? 'bg-primary text-white shadow-lg border-primary scale-105 font-bold' 
                                                : 'bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-white/10 text-text-dark dark:text-text-light border-transparent hover:border-primary/20'
                                            }`}
                                        >
                                            <Icon size={20} />
                                            <span>{type.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2. Input Forms */}
                        <div className="glass-card rounded-[2rem] p-8 border border-white/40 dark:border-white/10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={qrType}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {qrType === 'url' && (
                                        <Input label={t.qrLabelUrl} name="url" value={formData.url} onChange={handleInputChange} placeholder={t.qrPlaceUrl} icon={LinkIcon} />
                                    )}
                                    {qrType === 'text' && (
                                        <TextArea label={t.qrLabelText} name="text" value={formData.text} onChange={handleInputChange} placeholder={t.qrPlaceText} />
                                    )}
                                    {qrType === 'wifi' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label={t.qrLabelSsid} name="wifiSsid" value={formData.wifiSsid} onChange={handleInputChange} />
                                            <Input label={t.qrLabelPassword} name="wifiPass" value={formData.wifiPass} onChange={handleInputChange} type="password" />
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label={t.qrLabelPhone} name="waPhone" value={formData.waPhone} onChange={handleInputChange} placeholder={t.qrPlacePhone} />
                                            <Input label={t.qrLabelMessage} name="waText" value={formData.waText} onChange={handleInputChange} placeholder={t.qrPlaceMessage} />
                                        </div>
                                    )}
                                    {qrType === 'sms' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label={t.qrLabelPhone} name="smsPhone" value={formData.smsPhone} onChange={handleInputChange} />
                                            <TextArea label={t.qrLabelMessage} name="smsBody" value={formData.smsBody} onChange={handleInputChange} className="md:col-span-2" />
                                        </div>
                                    )}
                                    {qrType === 'email' && (
                                        <div className="space-y-4">
                                            <Input label={t.qrLabelEmailAddr} name="emailAddr" value={formData.emailAddr} onChange={handleInputChange} type="email" />
                                            <Input label={t.qrLabelSubject} name="emailSub" value={formData.emailSub} onChange={handleInputChange} />
                                            <TextArea label={t.qrLabelBody} name="emailBody" value={formData.emailBody} onChange={handleInputChange} />
                                        </div>
                                    )}
                                    {qrType === 'vcard' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label={t.qrLabelFirstName} name="vFirst" value={formData.vFirst} onChange={handleInputChange} />
                                            <Input label={t.qrLabelLastName} name="vLast" value={formData.vLast} onChange={handleInputChange} />
                                            <Input label={t.qrLabelPhone} name="vPhone" value={formData.vPhone} onChange={handleInputChange} />
                                            <Input label={t.qrLabelEmailAddr} name="vEmail" value={formData.vEmail} onChange={handleInputChange} type="email" />
                                            <div className="md:col-span-2">
                                                <Input label={t.qrLabelOrg} name="vOrg" value={formData.vOrg} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    )}
                                    {qrType === 'crypto' && (
                                        <div className="space-y-4">
                                            <Select label={t.qrLabelCryptoType} name="cryptoType" value={formData.cryptoType} onChange={handleInputChange}>
                                                <option value="bitcoin">Bitcoin</option>
                                                <option value="ethereum">Ethereum</option>
                                            </Select>
                                            <Input label={t.qrLabelWallet} name="cryptoAddr" value={formData.cryptoAddr} onChange={handleInputChange} />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* 3. Advanced Design Accordion */}
                        <div className="glass-card rounded-[2rem] overflow-hidden border border-white/40 dark:border-white/10">
                            <h3 className="p-6 text-xl font-bold text-text-dark dark:text-text-light border-b border-gray-200 dark:border-gray-700/50 bg-white/20 dark:bg-black/10 backdrop-blur-sm">{t.qrSectionDesign}</h3>
                            
                            {/* Colors */}
                            <AccordionItem 
                                title={t.qrSectionColors} 
                                icon={Palette}
                                isOpen={openAccordion === 'colors'}
                                onClick={() => setOpenAccordion(openAccordion === 'colors' ? null : 'colors')}
                            >
                                <div className="space-y-6">
                                     <div className="flex items-center gap-3">
                                        <input type="checkbox" name="useGradient" id="useGradient" checked={design.useGradient} onChange={handleInputChange} className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300" />
                                        <label htmlFor="useGradient" className="text-md font-medium text-text-dark dark:text-text-light">{t.qrLabelUseGradient}</label>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <ColorPicker label={t.qrLabelColorStart} name="color1" value={design.color1} onChange={handleInputChange} />
                                        
                                        {design.useGradient && (
                                            <ColorPicker label={t.qrLabelColorEnd} name="color2" value={design.color2} onChange={handleInputChange} />
                                        )}
                                    </div>

                                    {design.useGradient && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-white/30 dark:bg-black/20 rounded-xl">
                                            <Select label={t.qrLabelGradientType} name="gradientType" value={design.gradientType} onChange={handleInputChange}>
                                                <option value="linear">{t.qrLabelLinear}</option>
                                                <option value="radial">{t.qrLabelRadial}</option>
                                            </Select>
                                            <Input label={t.qrLabelRotation} name="gradientRotation" type="number" value={design.gradientRotation} onChange={handleInputChange} />
                                        </div>
                                    )}
                                    
                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700/50">
                                         <ColorPicker label={t.qrLabelBgColor} name="bgColor" value={design.bgColor} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </AccordionItem>

                            {/* Shapes */}
                            <AccordionItem 
                                title={t.qrSectionShapes} 
                                icon={Shapes}
                                isOpen={openAccordion === 'shapes'}
                                onClick={() => setOpenAccordion(openAccordion === 'shapes' ? null : 'shapes')}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Select label={t.qrLabelDotsStyle} name="dotsStyle" value={design.dotsStyle} onChange={handleInputChange}>
                                        <option value="square">Square</option>
                                        <option value="dots">Dots</option>
                                        <option value="rounded">Rounded</option>
                                        <option value="extra-rounded">Extra Rounded</option>
                                        <option value="classy">Classy</option>
                                        <option value="classy-rounded">Classy Rounded</option>
                                    </Select>
                                    <Select label={t.qrLabelCornerSq} name="cornerSquareStyle" value={design.cornerSquareStyle} onChange={handleInputChange}>
                                        <option value="square">Square</option>
                                        <option value="dot">Dot</option>
                                        <option value="extra-rounded">Extra Rounded</option>
                                    </Select>
                                    <Select label={t.qrLabelCornerDot} name="cornerDotStyle" value={design.cornerDotStyle} onChange={handleInputChange}>
                                        <option value="square">Square</option>
                                        <option value="dot">Dot</option>
                                    </Select>
                                </div>
                            </AccordionItem>

                            {/* Logo */}
                            <AccordionItem 
                                title={t.qrSectionLogo} 
                                icon={ImageIcon}
                                isOpen={openAccordion === 'logo'}
                                onClick={() => setOpenAccordion(openAccordion === 'logo' ? null : 'logo')}
                            >
                                <div className="space-y-6">
                                    <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center bg-white/20 dark:bg-black/10">
                                        <label className="cursor-pointer block">
                                             <span className="block text-sm font-medium text-text-dark dark:text-text-light mb-2">{t.qrLabelUploadLogo}</span>
                                             <input type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90" />
                                        </label>
                                        <p className="text-xs text-text-dark/50 dark:text-text-light/50 mt-2">{t.qrLogoWarning}</p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                         <div className="flex-grow">
                                            <label className="block text-sm font-bold mb-2">{t.qrLabelLogoSize} ({Math.round(design.logoSize * 100)}%)</label>
                                            <input type="range" name="logoSize" min="0.1" max="0.5" step="0.05" value={design.logoSize} onChange={handleInputChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" />
                                         </div>
                                         <div className="flex items-center gap-2 pt-6">
                                             <input type="checkbox" id="hideDots" name="hideDots" checked={design.hideDots} onChange={handleInputChange} className="w-5 h-5 rounded text-primary focus:ring-primary" />
                                             <label htmlFor="hideDots" className="text-sm font-medium">{t.qrLabelHideDots}</label>
                                         </div>
                                    </div>
                                </div>
                            </AccordionItem>
                             
                            {/* Frames */}
                            <AccordionItem 
                                title={t.qrSectionFrames} 
                                icon={Smartphone}
                                isOpen={openAccordion === 'frames'}
                                onClick={() => setOpenAccordion(openAccordion === 'frames' ? null : 'frames')}
                            >
                                <div className="space-y-6">
                                     <Select label={t.qrLabelFrameStyle} name="type" value={frame.type} onChange={handleInputChange}>
                                        <option value="none">{t.qrFrameNone}</option>
                                        <option value="phone">{t.qrFramePhone}</option>
                                        <option value="bubble-top">{t.qrFrameBubble}</option>
                                        <option value="polite">{t.qrFramePolite}</option>
                                    </Select>

                                    {frame.type !== 'none' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                                            <Input label={t.qrLabelFrameText} name="text" value={frame.text} onChange={handleInputChange} />
                                            <ColorPicker label={t.qrLabelFrameColor} name="color" value={frame.color} onChange={handleInputChange} />
                                        </motion.div>
                                    )}
                                </div>
                            </AccordionItem>
                        </div>
                    </div>

                    {/* Right Sidebar: Preview (4 cols) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28">
                            <div className="glass-card rounded-[2.5rem] p-8 text-center border border-white/40 dark:border-white/10 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
                                <h3 className="text-2xl font-bold mb-8 text-text-dark dark:text-text-light font-rubik">{t.qrPreview}</h3>
                                
                                <div className="flex justify-center mb-10 overflow-visible">
                                     {/* Render Area for html2canvas */}
                                    <div 
                                        id="final-render-area" 
                                        className={frame.type !== 'none' ? `frame-${frame.type}` : ''}
                                        style={{ '--frame-color': frame.color } as React.CSSProperties}
                                    >
                                        {/* Top Label for bubble */}
                                        {frame.type === 'bubble-top' && <span className="frame-label">{frame.text}</span>}
                                        
                                        {/* Wrapper for bg of bubble */}
                                        <div className={frame.type === 'bubble-top' ? 'frame-bubble-top-inner' : ''}>
                                             <div ref={canvasRef} />
                                        </div>

                                        {/* Bottom Label for others */}
                                        {(frame.type === 'phone' || frame.type === 'polite') && (
                                            <span className={`frame-label ${frame.type === 'phone' ? 'hidden' : ''}`}>{frame.text}</span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={downloadFinalImage}
                                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <Download size={22} />
                                    {t.qrDownloadHighQuality}
                                </button>
                                <p className="text-sm text-text-dark/50 dark:text-text-light/50 mt-4">{t.qrScanHint}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---

const Input = ({ label, icon: Icon, className, ...props }: any) => (
    <div className={`w-full ${className}`}>
        <label className="block text-sm font-bold text-text-dark dark:text-text-light mb-2 ml-1">{label}</label>
        <div className="relative">
             {Icon && (
                 <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                     <Icon size={18} />
                 </div>
             )}
            <input className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition-all text-text-dark dark:text-text-light ${Icon ? 'pl-11' : ''}`} {...props} />
        </div>
    </div>
);

const TextArea = ({ label, className, ...props }: any) => (
    <div className={`w-full ${className}`}>
        <label className="block text-sm font-bold text-text-dark dark:text-text-light mb-2 ml-1">{label}</label>
        <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition-all text-text-dark dark:text-text-light resize-none" {...props} />
    </div>
);

const Select = ({ label, children, ...props }: any) => (
    <div className="w-full">
        <label className="block text-sm font-bold text-text-dark dark:text-text-light mb-2 ml-1">{label}</label>
        <div className="relative">
            <select className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition-all text-text-dark dark:text-text-light appearance-none cursor-pointer" {...props}>
                {children}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <ChevronDown size={18} />
            </div>
        </div>
    </div>
);

const ColorPicker = ({ label, ...props }: any) => (
    <div>
        <label className="block text-sm font-bold text-text-dark dark:text-text-light mb-2 ml-1">{label}</label>
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700">
            <input type="color" className="h-10 w-12 rounded-lg cursor-pointer border-none bg-transparent p-0" {...props} />
            <span className="text-sm font-mono opacity-70 flex-grow">{props.value}</span>
        </div>
    </div>
);

const AccordionItem = ({ title, icon: Icon, children, isOpen, onClick }: any) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700/50 last:border-0">
            <button
                onClick={onClick}
                className={`w-full flex items-center justify-between p-6 text-left transition-colors ${isOpen ? 'bg-primary/5' : 'hover:bg-white/10'}`}
            >
                <div className="flex items-center gap-3 font-bold text-lg text-text-dark dark:text-text-light">
                    <div className={`p-2 rounded-lg ${isOpen ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                        <Icon size={20} />
                    </div>
                    {title}
                </div>
                <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-gray-400'}`} />
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
                        <div className="p-6 pt-0">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QrFix;
