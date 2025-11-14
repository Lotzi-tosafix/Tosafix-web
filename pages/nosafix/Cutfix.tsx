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
                const response = await fetch('https://lotzi-my-awesome-remover.hf.space/api/remove-background', { method: 'POST', body: formData });
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
        event.currentTarget.classList.remove('border-primary', 'bg-primary/10');
        handleImageUpload(event.dataTransfer.files?.[0] || null);
    };

    const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.currentTarget.classList.add('border-primary', 'bg-primary/10');
    };
    
    const onDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-primary', 'bg-primary/10');
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light">
                      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t.cutfixPageTitle}</span>
                    </h1>
                    <p className="mt-4 text-lg text-text-dark/70 dark:text-text-light/70">{t.cutfixPageSubtitle}</p>
                </header>

                <main>
                    <AnimatePresence mode="wait">
                        {uiState === 'upload' && (
                            <motion.div key="upload" variants={pageVariants} initial="initial" animate="animate" exit="exit">
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
                                    className="w-full p-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 hover:border-primary hover:bg-primary/10"
                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                    onDragLeave={onDragLeave}
                                >
                                    <UploadCloud className="w-16 h-16 text-primary mb-4" />
                                    <span className="text-xl font-semibold text-text-dark dark:text-text-light">{t.selectImage}</span>
                                    <span className="text-sm text-text-dark/70 dark:text-text-light/70 mt-2">{t.supportedFiles}</span>
                                </label>
                            </motion.div>
                        )}
                        
                         {uiState === 'loading' && (
                            <motion.div key="loading" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center justify-center py-10">
                                <div className="relative w-full max-w-md mx-auto">
                                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-75 blur-2xl animate-pulse"></div>
                                    <div className="relative w-full aspect-square rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-gray-700 overflow-hidden shadow-lg border border-primary/20">
                                        {originalImageUrl ? (
                                            <img src={originalImageUrl} alt={t.processingImage} className="max-w-full max-h-full object-contain" />
                                        ) : (
                                            <ImageIcon className="w-24 h-24 text-gray-400" />
                                        )}
                                        <motion.div 
                                            className="absolute left-0 w-full h-1 bg-white/50"
                                            style={{ boxShadow: '0 0 10px #fff, 0 0 20px #fff' }}
                                            initial={{ top: '0%' }}
                                            animate={{ top: '100%' }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                        />
                                    </div>
                                </div>
                                <p className="mt-8 text-xl font-semibold text-text-dark dark:text-text-light">{loadingText}</p>
                            </motion.div>
                        )}


                        {uiState === 'results' && (
                             <motion.div key="results" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                <div className="flex justify-center mb-8">
                                    <div className="w-full max-w-lg">
                                        <ImageCard title={t.processedImage} imageUrl={processedImageUrl} isProcessed />
                                    </div>
                                </div>
                                <div className="text-center space-x-4 rtl:space-x-reverse">
                                     <a href={processedImageUrl || '#'} download="processed-image.png" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full text-white font-semibold transition-transform transform hover:scale-105 bg-gradient-to-r from-primary to-secondary">
                                        <Download size={20} />
                                        {t.downloadImage}
                                    </a>
                                    <button onClick={resetUI} className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-gray-200 dark:bg-gray-700 text-text-dark dark:text-text-light font-semibold transition-transform transform hover:scale-105">
                                        <RefreshCw size={20} />
                                        {t.uploadAnotherImage}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {uiState === 'error' && (
                             <motion.div key="error" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="text-center">
                                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg relative max-w-lg mx-auto flex items-center justify-center" role="alert">
                                    <AlertCircle className="h-6 w-6 me-3" />
                                    <span className="block sm:inline">{errorMessage}</span>
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
        <label htmlFor={id} className={`block w-full p-6 text-center border-2 rounded-2xl cursor-pointer transition-all duration-300 ${checked ? 'border-primary bg-primary/10 shadow-lg' : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'}`}>
            <Icon className={`w-10 h-10 mx-auto mb-3 transition-colors ${checked ? 'text-primary' : 'text-gray-400'}`} />
            <h3 className={`text-lg font-semibold transition-colors ${checked ? 'text-text-dark dark:text-text-light' : 'text-text-dark/80 dark:text-text-light/80'}`}>{title}</h3>
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
        : "bg-gray-100 dark:bg-gray-700";

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-primary/20">
            <h2 className="text-xl font-semibold text-center mb-4 text-text-dark dark:text-text-light">{title}</h2>
            <div className={`w-full aspect-square rounded-lg flex items-center justify-center ${bgClass}`}>
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain" />
                ) : (
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                )}
            </div>
        </div>
    );
}

export default Cutfix;