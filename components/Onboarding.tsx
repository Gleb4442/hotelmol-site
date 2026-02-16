"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Languages,
    ChevronRight,
    Sparkles,
    User,
    ShieldCheck,
    TrendingUp,
    Building2,
    Handshake
} from "lucide-react";

const roles = [
    { id: "guest", label: "Гость", icon: User },
    { id: "manager", label: "Управляющий", icon: ShieldCheck },
    { id: "marketer", label: "Маркетолог", icon: TrendingUp },
    { id: "owner", label: "Владелец", icon: Building2 },
    { id: "company", label: "Компания", icon: Handshake },
];

const fullText = "Привет! Я Roomie, AI-агент для отельеров и путешественников. Один вопрос и продолжим.";

export default function Onboarding() {
    const [isVisible, setIsVisible] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);

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
            if (index < fullText.length) {
                setDisplayedText(fullText.slice(0, index + 1));
                index++;
            } else {
                setIsTypingComplete(true);
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [isVisible]);

    const handleComplete = () => {
        localStorage.setItem("onboarding_completed", "true");
        setIsVisible(false);
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
                    <div className="absolute top-0 left-0 w-full h-full bg-[#fdfdfe]" />
                    <div className="absolute top-32 left-[10%] w-64 h-64 bg-blue-600/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-20 right-[5%] w-80 h-80 bg-blue-600/5 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(4,75,147,0.05)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(4,75,147,0.03)_0px,transparent_50%)]" />
                </div>

                {/* Header */}
                <header class="relative z-50 flex items-center justify-end px-8 py-6 max-w-[1440px] mx-auto space-x-6">
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-2xl border border-white/80 shadow-sm hover:bg-white transition-all group">
                        <Languages className="w-5 h-5 text-slate-600 group-hover:text-blue-700 transition-colors" />
                    </button>
                    <button
                        onClick={handleComplete}
                        className="text-[10px] font-bold text-slate-500 hover:text-blue-700 transition-colors uppercase tracking-[0.15em] flex items-center group bg-white/70 backdrop-blur-2xl border border-white/80 shadow-sm px-5 py-2.5 rounded-full"
                    >
                        Пропустить
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
                                        <div className="w-16 h-16 rounded-full bg-[#044B93] flex items-center justify-center shadow-lg shadow-blue-900/20 relative">
                                            <Sparkles className="w-8 h-8 text-white" />
                                            <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 border-[3px] border-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900/70">ИИ-агент Roomie</h2>
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
                                <span className="text-xl font-black text-slate-900 tracking-[0.6em] uppercase">Вы:</span>
                                <div className="h-[1px] w-12 bg-slate-200"></div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        onClick={handleComplete}
                                        className="group p-8 md:p-10 rounded-[1.5rem] bg-white/40 backdrop-blur-2xl hover:bg-white transition-all duration-300 border border-white/60 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1.5 flex flex-col items-center space-y-6"
                                    >
                                        <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#044B93] group-hover:shadow-blue-900/20 transition-all duration-300">
                                            <role.icon className="w-10 h-10 text-slate-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-lg font-extrabold text-slate-600 group-hover:text-blue-900 tracking-tight transition-colors text-center leading-tight">
                                            {role.label}
                                        </span>
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
