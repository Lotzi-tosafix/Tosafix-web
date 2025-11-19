import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Scissors, Sparkles, Image as ImageIcon, Download, AlertCircle, RefreshCw } from 'lucide-react';

type UiState = 'upload' | 'loading' | 'results' | 'error';
type Action = 'remove-bg' | 'trim-only';

const Cutfix: React.FC = () => {
    const { language } = useLanguage();
    const t = translations[language];

    const [uiState, setUiState] = useState<UiState>('upload');
    const [action, setAction] = useState<Action>('remove-bg');
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loadingText, setLoadingText] = useState<string>('');

    const imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (originalImageUrl) URL.revokeObjectURL(originalImageUrl);
            if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
        };
    }, [originalImageUrl, processedImageUrl]);

    const resetUI = () => {
        setUiState('upload');
        if (imageInputRef.current) imageInputRef.current.value = '';
        if (originalImageUrl) URL.revokeObjectURL(originalImageUrl);
        if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
        setOriginalImageUrl(null);
        setProcessedImageUrl(null);
        setErrorMessage('');
    };

    const showError = (message: string) => {
        setUiState('error');
        setErrorMessage(message);
    };

    const trimTransparency = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return canvas;
        const { width, height } = canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        const { data } = imageData;
        let top = height, bottom = -1, left = width, right = -1;
        const alphaThreshold = 10;
        for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
            if (data[(y * width + x) * 4 + 3] > alphaThreshold) {
                if (y < top) top = y; if (y > bottom) bottom = y;
                if (x < left) left = x; if (x > right) right = x;
            }
        }
        if (left > right || top > bottom) {
            const emptyCanvas = document.createElement('canvas');
            emptyCanvas.width = 1; emptyCanvas.height = 1;
            return emptyCanvas;
        }
        const trimWidth = right - left + 1, trimHeight = bottom - top + 1;
        const trimmedCanvas = document.createElement('canvas');
        trimmedCanvas.width = trimWidth; trimmedCanvas.height = trimHeight;
        const trimmedCtx = trimmedCanvas.getContext('2d');
        if (!trimmedCtx) return canvas;
        trimmedCtx.drawImage(canvas, left, top, trimWidth, trimHeight, 0, 0, trimWidth, trimHeight);
        return trimmedCanvas;
    };

    const handleImageUpload = async (file: File | null) => {
        if (!file) return;
        const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            showError(t.unsupportedFileType);
            return;
        }
        const maxSizeMB = 10;
        if (file.size > maxSizeMB * 1024 * 1024) {
            showError(t.fileTooLarge(maxSizeMB));
            return;
        }

        setUiState('loading');
        setOriginalImageUrl(URL.createObjectURL(file));

        try {
            let imageBlobToProcess: Blob;
            if (action === 'trim-only') {
                setLoadingText(t.trimmingEdges);
                imageBlobToProcess = file;
            } else {
                setLoadingText(t.processingImage);
                const formData = new FormData();
                formData.append('file', file);
                const response = await fetch('https://lotzi-fix-remover.hf.space/api/remove-background', { method: 'POST', body: formData });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(t.serverError(response.status, errorText));
                }
                imageBlobToProcess = await response.blob();
            }

            const imageElement = await new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = URL.createObjectURL(imageBlobToProcess);
            });
            const canvas = document.createElement('canvas');
            canvas.width = imageElement.width; canvas.height = imageElement.height;
            canvas.getContext('2d')?.drawImage(imageElement, 0, 0);
            const trimmedCanvas = trimTransparency(canvas);
            const finalImageBlob = await new Promise<Blob | null>(resolve => trimmedCanvas.toBlob(resolve, 'image/png'));
            if (!finalImageBlob) throw new Error("Canvas to Blob conversion failed");
            setProcessedImageUrl(URL.createObjectURL(finalImageBlob));
            setUiState('results');
        } catch (error) {
            console.error('Error during image processing:', error);
            showError(t.processingError);
        }
    };
    
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       handleImageUpload(event.target.files?.[0] || null);
    };

    const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-primary', 'bg-primary/20');
        handleImageUpload(event.dataTransfer.files?.[0] || null);
    };

    const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.currentTarget.classList.add('border-primary', 'bg-primary/20');
    };
    
    const onDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-primary', 'bg-primary/20');
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-16">
                    <div className="inline-block p-4 rounded-[2rem] glass-card mb-6">
                        <Scissors className="w-12 h-12 text-secondary mx-auto" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-text-dark dark:text-text-light font-rubik">
                      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t.cutfixPageTitle}</span>
                    </h1>
                    <p className="mt-4 text-xl text-text-dark/70 dark:text-text-light/70 font-light">{t.cutfixPageSubtitle}</p>
                </header>

                <main className="glass-card rounded-[3rem] p-8 md:p-12 border border-white/40 dark:border-white/10 relative overflow-hidden">
                    {/* Decorative glow inside card */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

                    <AnimatePresence mode="wait">
                        {uiState === 'upload' && (
                            <motion.div key="upload" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="relative z-10">
                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <ActionCard 
                                        id="action-remove-bg"
                                        title={t.removeBgAndTrim}
                                        description={t.removeBgAndTrimDesc}
                                        icon={Sparkles}
                                        checked={action === 'remove-bg'}
                                        onChange={() => setAction('remove-bg')}
                                    />
                                    <ActionCard 
                                        id="action-trim-only"
                                        title={t.trimOnly}
                                        description={t.trimOnlyDesc}
                                        icon={Scissors}
                                        checked={action === 'trim-only'}
                                        onChange={() => setAction('trim-only')}
                                    />
                                </div>
                                <input type="file" id="image-input" accept="image/png, image/jpeg, image/webp" hidden ref={imageInputRef} onChange={onFileChange}/>
                                <label 
                                    htmlFor="image-input" 
                                    className="w-full p-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-[2rem] flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 bg-white/30 dark:bg-black/20"
                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                    onDragLeave={onDragLeave}
                                >
                                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                                        <UploadCloud className="w-10 h-10 text-primary" />
                                    </div>
                                    <span className="text-2xl font-bold text-text-dark dark:text-text-light">{t.selectImage}</span>
                                    <span className="text-md text-text-dark/60 dark:text-text-light/60 mt-2">{t.supportedFiles}</span>
                                </label>
                            </motion.div>
                        )}
                        
                         {uiState === 'loading' && (
                            <motion.div key="loading" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center justify-center py-10 relative z-10">
                                <div className="relative w-full max-w-md mx-auto">
                                    <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-primary to-secondary opacity-50 blur-xl animate-pulse"></div>
                                    <div className="relative w-full aspect-square rounded-[2rem] flex items-center justify-center bg-white/80 dark:bg-gray-900/80 overflow-hidden shadow-2xl border border-white/20">
                                        {originalImageUrl ? (
                                            <img src={originalImageUrl} alt={t.processingImage} className="max-w-full max-h-full object-contain p-4" />
                                        ) : (
                                            <ImageIcon className="w-24 h-24 text-gray-400" />
                                        )}
                                        <motion.div 
                                            className="absolute left-0 w-full h-1 bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                            initial={{ top: '0%' }}
                                            animate={{ top: '100%' }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                        />
                                    </div>
                                </div>
                                <p className="mt-10 text-2xl font-bold text-text-dark dark:text-text-light animate-pulse">{loadingText}</p>
                            </motion.div>
                        )}


                        {uiState === 'results' && (
                             <motion.div key="results" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="relative z-10">
                                <div className="flex justify-center mb-10">
                                    <div className="w-full max-w-lg relative">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2.5rem] blur-xl"></div>
                                        <ImageCard title={t.processedImage} imageUrl={processedImageUrl} isProcessed />
                                    </div>
                                </div>
                                <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                                     <a href={processedImageUrl || '#'} download="processed-image.png" className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full text-white font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-primary/50 bg-gradient-to-r from-primary to-secondary w-full sm:w-auto">
                                        <Download size={22} />
                                        {t.downloadImage}
                                    </a>
                                    <button onClick={resetUI} className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-white/50 dark:bg-white/10 border border-white/20 text-text-dark dark:text-text-light font-bold transition-all transform hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/20 w-full sm:w-auto backdrop-blur-md">
                                        <RefreshCw size={22} />
                                        {t.uploadAnotherImage}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {uiState === 'error' && (
                             <motion.div key="error" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="text-center relative z-10">
                                <div className="bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 px-8 py-6 rounded-2xl relative max-w-xl mx-auto flex flex-col items-center justify-center backdrop-blur-sm" role="alert">
                                    <AlertCircle className="h-10 w-10 mb-4 text-red-500" />
                                    <span className="block text-lg font-medium">{errorMessage}</span>
                                </div>
                                <button onClick={resetUI} className="mt-8 inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-gray-200 dark:bg-gray-700 text-text-dark dark:text-text-light font-semibold transition-transform transform hover:scale-105">
                                    <RefreshCw size={20} />
                                    {t.uploadAnotherImage}
                                </button>
                             </motion.div>
                        )}

                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

interface ActionCardProps {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    checked: boolean;
    onChange: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ id, title, description, icon: Icon, checked, onChange }) => (
    <div className="relative">
        <input type="radio" id={id} name="action-type" className="hidden" checked={checked} onChange={onChange} />
        <label htmlFor={id} className={`block w-full p-6 text-center border rounded-2xl cursor-pointer transition-all duration-300 ${checked ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:bg-white/40 dark:hover:bg-white/5 bg-white/20 dark:bg-black/20'}`}>
            <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-colors ${checked ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                 <Icon className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold transition-colors mb-1 ${checked ? 'text-text-dark dark:text-text-light' : 'text-text-dark/80 dark:text-text-light/80'}`}>{title}</h3>
            <p className="text-sm text-text-dark/60 dark:text-text-light/60">{description}</p>
        </label>
    </div>
);

interface ImageCardProps {
    title: string;
    imageUrl: string | null;
    isProcessed?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl, isProcessed = false }) => {
    const bgClass = isProcessed
        ? "bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] [background-size:20px_20px] [background-position:0_0,0_10px,10px_-10px,-10px_0px]"
        : "bg-gray-100 dark:bg-gray-800";

    return (
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-white/40 dark:border-white/10 relative">
            <h2 className="text-xl font-bold text-center mb-4 text-text-dark dark:text-text-light">{title}</h2>
            <div className={`w-full aspect-square rounded-2xl flex items-center justify-center ${bgClass} overflow-hidden shadow-inner`}>
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain" />
                ) : (
                    <ImageIcon className="w-16 h-16 text-gray-400 opacity-50" />
                )}
            </div>
        </div>
    );
}

export default Cutfix;