"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";
import {
    Languages,
    ChevronRight,
    Sparkles,
    ShieldCheck,
    TrendingUp,
    Building2,
    Handshake
} from "lucide-react";
import { useCookieBanner } from "@/lib/CookieBannerContext";

export default function Onboarding() {
    const { t, language, setLanguage } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const { setCookieBannerVisible } = useCookieBanner();

    const languages = [
        { code: "en", label: "English" },
        { code: "ru", label: "Русский" },
        { code: "ua", label: "Українська" },
        { code: "pl", label: "Polski" },
        { code: "de", label: "Deutsch" },
    ] as const;

    const roles = [
        { id: "manager", label: t("onboarding.role.manager"), icon: ShieldCheck },
        { id: "marketer", label: t("onboarding.role.marketer"), icon: TrendingUp },
        { id: "owner", label: t("onboarding.role.owner"), icon: Building2 },
        { id: "company", label: t("onboarding.role.company"), icon: Handshake },
    ];

    const fullText = t("onboarding.welcome");

    useEffect(() => {
        const hasCompleted = localStorage.getItem("onboarding_completed");
        if (!hasCompleted) {
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < (fullText?.length || 0)) {
                setDisplayedText(fullText.slice(0, index + 1));
                index++;
            } else {
                setIsTypingComplete(true);
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [isVisible, fullText]);

    const trackOnboarding = async (roleId: string, isSkip: boolean = false) => {
        try {
            const role = roles.find(r => r.id === roleId)?.label || roleId;
            await fetch("/api/analytics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    role,
                    language,
                    userAgent: navigator.userAgent,
                    referrer: document.referrer,
                    path: window.location.pathname,
                    isSkip
                }),
            });
        } catch (e) {
            console.error("Failed to track onboarding", e);
        }
    };

    const handleComplete = (roleId: string, isSkip: boolean = false) => {
        trackOnboarding(roleId, isSkip);
        localStorage.setItem("onboarding_completed", "true");
        setIsVisible(false);
        
        // Show cookie banner after onboarding is closed, if consent not already given
        const consent = localStorage.getItem("cookie_consent_given");
        if (!consent) {
            setCookieBannerVisible(true);
        }
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-white text-slate-800 font-sans selection:bg-blue-600/10 overflow-y-auto"
            >
                {/* Background Mesh/Blur */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[#FAF9F6]" />
                    {/* Static Glows — motion imperceptible at 3-6% opacity behind 140-160px blur */}
                    <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[140px] opacity-[0.06]" />
                    <div className="absolute -bottom-40 -right-20 w-[700px] h-[700px] bg-indigo-500 rounded-full blur-[160px] opacity-[0.04]" />
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" 
                        style={{ 
                            backgroundImage: `linear-gradient(#044B93 1px, transparent 1px), linear-gradient(90deg, #044B93 1px, transparent 1px)`,
                            backgroundSize: '40px 40px' 
                        }}
                    />
                </div>

                {/* Header */}
                <header className="relative z-[110] flex items-center justify-end px-8 py-6 max-w-[1440px] mx-auto space-x-6">
                    <div className="relative">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-2xl border border-white/80 shadow-sm hover:bg-white transition-all group"
                        >
                            <Languages className="w-5 h-5 text-slate-600 group-hover:text-blue-700 transition-colors" />
                        </button>
                        
                        <AnimatePresence>
                            {isLangOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-40 bg-white/90 backdrop-blur-3xl border border-white/90 rounded-2xl shadow-2xl shadow-blue-900/10 overflow-hidden"
                                >
                                    <div className="py-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code as any);
                                                    setIsLangOpen(false);
                                                    setDisplayedText("");
                                                    setIsTypingComplete(false);
                                                }}
                                                className={`w-full px-5 py-3 text-left text-sm font-bold transition-colors flex items-center justify-between ${
                                                    language === lang.code 
                                                    ? "text-blue-700 bg-blue-50/50" 
                                                    : "text-slate-600 hover:bg-blue-50/30 hover:text-blue-700"
                                                }`}
                                            >
                                                {lang.label}
                                                {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-blue-700" />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={() => handleComplete("skip", true)}
                        className="text-[10px] font-bold text-slate-500 hover:text-blue-700 transition-colors uppercase tracking-[0.15em] flex items-center group bg-white/70 backdrop-blur-2xl border border-white/80 shadow-sm px-5 py-2.5 rounded-full"
                    >
                        {t("onboarding.skip")}
                        <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </header>

                {/* Main Content */}
                <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 pb-20">
                    <div className="max-w-4xl w-full flex flex-col items-center">

                        {/* Message Panel */}
                        <div className="w-full mb-16 relative">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/70 backdrop-blur-2xl border border-white/90 p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 relative overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-6 md:space-y-0 md:space-x-8">
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#044B93] via-[#0A63BD] to-[#2E8BF0] flex items-center justify-center shadow-2xl shadow-blue-900/30 relative overflow-hidden group/icon transition-transform hover:scale-105 duration-500">
                                            {/* Liquid Glass Effects */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-60"></div>
                                            <div className="absolute inset-0 shadow-[inset_0_4px_12px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.2)] rounded-[2rem]"></div>
                                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
                                            
                                            {/* Static shine highlight */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />

                                            <Sparkles className="w-10 h-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-10" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-xl md:text-2xl leading-relaxed font-semibold text-slate-800">
                                            {displayedText.split("Roomie").map((part, i, arr) => (
                                                <span key={i}>
                                                    {part}
                                                    {i < arr.length - 1 && <span className="text-[#044B93] font-extrabold">Roomie</span>}
                                                </span>
                                            ))}
                                            {!isTypingComplete && <span className="inline-block w-1.5 h-6 bg-blue-600 animate-pulse ml-1 align-middle" />}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Role Selection */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="w-full space-y-12"
                        >
                            <div className="flex items-center justify-center space-x-8">
                                <div className="h-[1px] w-12 bg-slate-200"></div>
                                <span className="text-xl font-black text-slate-900 tracking-[0.6em] uppercase">{t("onboarding.whoAreYou")}</span>
                                <div className="h-[1px] w-12 bg-slate-200"></div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        onClick={() => handleComplete(role.id)}
                                        className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white/40 backdrop-blur-2xl hover:bg-white transition-all duration-500 border border-white/60 hover:border-blue-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(4,75,147,0.12)] hover:-translate-y-2 flex flex-col items-center space-y-6 overflow-hidden"
                                    >
                                        {/* Hover Gradient Background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-blue-50/0 group-hover:from-blue-50/80 group-hover:via-transparent group-hover:to-blue-50/30 transition-all duration-700"></div>

                                        <div className="relative z-10 w-20 h-20 rounded-[1.75rem] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover:bg-[#044B93] group-hover:shadow-[0_15px_35px_rgba(4,75,147,0.35)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                                            <role.icon className="w-10 h-10 text-slate-400 group-hover:text-white transition-all duration-500" />
                                        </div>
                                        
                                        <span className="relative z-10 text-lg font-extrabold text-slate-600 group-hover:text-blue-900 tracking-tight transition-colors text-center leading-tight">
                                            {role.label}
                                        </span>

                                        {/* Subtle Border Glow on Hover */}
                                        <div className="absolute inset-0 border border-transparent group-hover:border-white/50 rounded-[2.5rem] transition-all duration-500 pointer-events-none"></div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </main>
            </motion.div>
        </AnimatePresence>
    );
}
