"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/TranslationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Download, Loader2, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieBanner } from '@/lib/CookieBannerContext';

export default function HotelTrendsBanner() {
    const { t, language } = useTranslation();
    const { isCookieBannerVisible } = useCookieBanner();
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');

    // Check if banner should be shown
    useEffect(() => {
        const checkVisibility = () => {
            let alreadySubscribed = null;
            let dismissCount = 0;
            try {
                alreadySubscribed = localStorage.getItem('hotelTrendsSubscribed');
                const count = localStorage.getItem('hotelTrendsDismissCount');
                dismissCount = count ? parseInt(count, 10) : 0;
            } catch (e) {
                console.error("Local storage access denied", e);
            }

            if (alreadySubscribed || dismissCount >= 2) {
                return;
            }

            const isMobile = window.matchMedia('(max-width: 768px)').matches;

            if (!isMobile) {
                setIsOpen(true);
            }
            else if (!isCookieBannerVisible) {
                const timer = setTimeout(() => setIsOpen(true), 1000);
                return () => clearTimeout(timer);
            }
        };

        checkVisibility();

        window.addEventListener('resize', checkVisibility);
        return () => window.removeEventListener('resize', checkVisibility);

    }, [isCookieBannerVisible]);

    useEffect(() => {
        const event = new CustomEvent('hotel-trends-banner-state', {
            detail: { visible: isOpen && !isModalOpen }
        });
        window.dispatchEvent(event);
    }, [isOpen, isModalOpen]);

    const handleClose = () => {
        setIsOpen(false);
        try {
            const currentCount = parseInt(localStorage.getItem('hotelTrendsDismissCount') || '0', 10);
            localStorage.setItem('hotelTrendsDismissCount', (currentCount + 1).toString());
        } catch (e) {
            console.error("Local storage access denied", e);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (status === 'success') {
            handleClose();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage(t('trends.error.email'));
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('https://n8n.myn8napp.online/webhook/hotel-report-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    report_type: 'hotel_trends_2026',
                    language,
                    timestamp: new Date().toISOString()
                })
            });

            const data = await response.json();

            if (data.success || response.ok) {
                setStatus('success');
                setDownloadUrl(data.download_url || '#');
                try {
                    localStorage.setItem('hotelTrendsSubscribed', 'true');
                } catch (e) {
                    console.error("Local storage access denied", e);
                }
            } else {
                setStatus('error');
                setErrorMessage(data.message || t('trends.error.general'));
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(t('trends.error.general'));
        }
    };

    if (!isOpen && !isModalOpen) return null;

    return (
        <>
            {/* Floating Banner */}
            <AnimatePresence>
                {isOpen && !isModalOpen && (
                    <motion.div
                        initial={{ y: 100, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 100, opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 z-40 w-auto max-w-[420px]"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl ring-1 ring-white/5 group">

                            {/* Animated Background Gradients */}
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-500" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-500" />

                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"
                            >
                                <X size={14} />
                            </button>

                            <div className="p-6 md:p-7 relative z-0">
                                {/* Header Badge (Optional branding, keeping it clean or adding small icon) */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p-1 rounded-md bg-gradient-to-br from-blue-500 to-purple-600">
                                        <Sparkles size={12} className="text-white" />
                                    </div>
                                    <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">{t('trends.title')}</span>
                                </div>

                                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2 tracking-tight">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
                                        {t('trends.titleHighlight')}
                                    </span>
                                </h2>

                                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                                    {t('trends.description')}
                                </p>

                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full group relative flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-500/25"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <span className="relative flex items-center gap-2">
                                        {t('trends.button.get')}
                                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", bounce: 0.3 }}
                            className="relative w-full max-w-sm overflow-hidden rounded-[32px] bg-[#0F172A] border border-white/10 shadow-2xl"
                        >
                            {/* Modal Background Effects */}
                            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                            <button
                                onClick={closeModal}
                                className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 relative z-10">
                                {status === 'success' ? (
                                    <div className="text-center py-6">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center ring-1 ring-green-500/50"
                                        >
                                            <Check className="w-10 h-10 text-green-400" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{t('trends.success.title')}</h3>
                                        <p className="text-slate-400 mb-8 leading-relaxed">
                                            {t('trends.success.text')}
                                        </p>
                                        <Button
                                            onClick={() => window.open(downloadUrl, '_blank')}
                                            className="w-full h-14 rounded-2xl text-base font-bold bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-lg shadow-white/5"
                                        >
                                            {t('trends.button.download')}
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20 mx-auto">
                                            <Download className="w-8 h-8 text-white" />
                                        </div>

                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-white mb-3">{t('trends.modal.title.get')}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                {t('trends.modal.text')}
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="relative">
                                                <Input
                                                    type="email"
                                                    placeholder={t('trends.placeholder.email')}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    disabled={status === 'loading'}
                                                    className="h-14 px-6 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 transition-all text-base"
                                                />
                                                {errorMessage && (
                                                    <p className="absolute -bottom-6 left-2 text-red-400 text-xs">{errorMessage}</p>
                                                )}
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                className="w-full h-14 rounded-2xl font-bold text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25 transition-all mt-6"
                                            >
                                                {status === 'loading' ? (
                                                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                                                ) : (
                                                    <span className="flex items-center gap-2">
                                                        {t('trends.button.submit')}
                                                        <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                )}
                                            </Button>
                                        </form>

                                        <p className="text-center text-xs text-slate-500 mt-6">
                                            {t('trends.privacy')} <a href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">{t('trends.privacyLink')}</a>
                                        </p>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
