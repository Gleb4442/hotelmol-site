import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/TranslationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Download, Loader2, Check } from 'lucide-react';
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
            // We no longer check for 'hotelTrendsBannerClosed' so it shows on every page load/refresh
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

            // Using 768px breakpoint to distinguish mobile from desktop
            const isMobile = window.matchMedia('(max-width: 768px)').matches;

            // Desktop: Show always (regardless of cookie banner)
            if (!isMobile) {
                setIsOpen(true);
            }
            // Mobile: Show only if cookie banner is NOT visible (meaning consent is given)
            else if (!isCookieBannerVisible) {
                // Delay slightly on mobile to ensure smooth transition after cookie banner closes
                const timer = setTimeout(() => setIsOpen(true), 1000);
                return () => clearTimeout(timer);
            }
        };

        checkVisibility();

        // Add resize listener to handle orientation changes
        window.addEventListener('resize', checkVisibility);
        return () => window.removeEventListener('resize', checkVisibility);

    }, [isCookieBannerVisible]);

    // Dispatch visibility state for other components (e.g. MobileAIInput)
    useEffect(() => {
        const checkMobile = () => window.matchMedia('(max-width: 768px)').matches;
        // Only dispatch if on mobile, or just dispatch always and let receiver decide
        // Dispatching always is safer.
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
            handleClose(); // Close the main banner too if successful
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
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
                localStorage.setItem('hotelTrendsSubscribed', 'true');
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
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-0 right-0 md:right-auto md:bottom-4 md:left-4 z-40 w-full md:w-[400px] p-4 md:p-0"
                    >
                        <div className="relative overflow-hidden rounded-t-2xl md:rounded-2xl bg-gradient-to-br from-[#1E4B8E] to-[#4A90D9] shadow-2xl">
                            {/* Background Decoration */}
                            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

                            <button
                                onClick={handleClose}
                                className="absolute top-3 right-3 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <X size={16} />
                            </button>

                            <div className="p-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                                    <Download size={14} className="text-white" />
                                    <span className="text-[11px] font-bold tracking-widest text-white uppercase">
                                        {t('trends.badge')}
                                    </span>
                                </div>

                                <h2 className="text-[24px] font-extrabold text-white leading-tight mb-3">
                                    {t('trends.title')} <br />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-100">
                                        {t('trends.titleHighlight')}
                                    </span>
                                </h2>

                                <p className="text-blue-100/90 text-[14px] leading-relaxed mb-6">
                                    {t('trends.description')}
                                </p>

                                <div className="flex gap-6 mb-6 pb-6 border-b border-white/15">
                                    <div>
                                        <div className="text-2xl font-bold text-white">87</div>
                                        <div className="text-[10px] font-semibold text-blue-200 uppercase tracking-wide">{t('trends.stats.pages')}</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">12</div>
                                        <div className="text-[10px] font-semibold text-blue-200 uppercase tracking-wide">{t('trends.stats.chapters')}</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">50+</div>
                                        <div className="text-[10px] font-semibold text-blue-200 uppercase tracking-wide">{t('trends.stats.charts')}</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-white text-[#1E4B8E] rounded-full font-bold text-[15px] hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
                                >
                                    {t('trends.button.get')}
                                    <Download size={18} />
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
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl z-10"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {status === 'success' ? (
                                <div className="text-center py-4">
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <Check className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t('trends.success.title')}</h3>
                                    <p className="text-slate-500 mb-6 leading-relaxed">
                                        {t('trends.success.text')}
                                    </p>
                                    <Button
                                        onClick={() => window.open(downloadUrl, '_blank')}
                                        className="w-full rounded-full py-6 text-base font-bold bg-gradient-to-r from-[#1E4B8E] to-[#4A90D9] hover:shadow-lg hover:translate-y-[-1px] transition-all"
                                    >
                                        {t('trends.button.download')}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={closeModal}
                                        className="w-full mt-3 rounded-full"
                                    >
                                        {t('trends.button.close')}
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#1E4B8E] to-[#4A90D9] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/10">
                                        <Download className="w-7 h-7 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('trends.modal.title.get')}</h3>
                                    <p className="text-slate-500 mb-6 leading-relaxed">
                                        {t('trends.modal.text')}
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <Input
                                                type="email"
                                                placeholder={t('trends.placeholder.email')}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={status === 'loading'}
                                                className="h-12 px-4 rounded-xl border-slate-200 focus:border-[#2563EB] focus:ring-[#2563EB]/20 bg-slate-50"
                                            />
                                            {errorMessage && (
                                                <p className="text-red-500 text-xs mt-1.5 ml-1">{errorMessage}</p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full h-12 rounded-full font-bold bg-gradient-to-r from-[#1E4B8E] to-[#4A90D9] hover:shadow-lg hover:translate-y-[-1px] transition-all"
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    {t('trends.button.sending')}
                                                </>
                                            ) : (
                                                <>
                                                    {t('trends.button.submit')}
                                                    <Download className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </form>

                                    <p className="text-center text-xs text-slate-400 mt-4 leading-normal">
                                        {t('trends.privacy')} <a href="/privacy" className="text-blue-600 hover:underline font-medium">{t('trends.privacyLink')}</a>
                                    </p>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
