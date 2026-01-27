"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, DollarSign, Play } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
    const { language, setLanguage, t } = useTranslation();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Hide on contact page if needed
    if (pathname === "/contact") return null;

    const languages = [
        { code: "en", label: "English" },
        { code: "ru", label: "Русский" },
        { code: "ua", label: "Українська" },
        { code: "pl", label: "Polski" },
    ] as const;

    return (
        <div className="md:hidden fixed bottom-6 right-4 z-50 pointer-events-auto flex flex-col items-end gap-3">

            {/* Backdrop for Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    />
                )}
            </AnimatePresence>

            {/* Menu Items */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="flex flex-col gap-3 items-end mb-2 z-50 relative"
                    >
                        {/* Pricing */}
                        <motion.a
                            href="https://pricing.hotelmol.com/#yearly"
                            target="_blank"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-2 bg-white text-[#0752A0] pr-4 pl-3 py-2 rounded-full shadow-lg border border-[#0752A0]/10 font-bold"
                        >
                            <span className="text-sm">{t("button.pricing")}</span>
                            <div className="bg-[#0752A0]/10 p-1.5 rounded-full">
                                <DollarSign className="w-4 h-4" />
                            </div>
                        </motion.a>

                        {/* Demo */}
                        <motion.a
                            href="https://demo.hotelmol.com"
                            target="_blank"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.05 }}
                            className="flex items-center gap-2 bg-[#0752A0] text-white pr-4 pl-3 py-2 rounded-full shadow-lg border border-[#0752A0]/10 font-bold"
                        >
                            <span className="text-sm">{t("button.tryDemo")}</span>
                            <div className="bg-white/20 p-1.5 rounded-full">
                                <Play className="w-4 h-4" />
                            </div>
                        </motion.a>

                        {/* Language Selector (Mini Menu) */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden p-1 flex flex-col gap-1 w-32"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                    }}
                                    className={`text-xs font-bold py-2 px-3 rounded-xl text-left transition-colors flex items-center justify-between ${language === lang.code
                                            ? "bg-[#0752A0] text-white"
                                            : "hover:bg-slate-100 text-slate-600"
                                        }`}
                                >
                                    {lang.label}
                                    {language === lang.code && "✓"}
                                </button>
                            ))}
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95 ${isOpen
                        ? "bg-white text-[#0752A0] rotate-45 border-2 border-[#0752A0]"
                        : "bg-[#0752A0] text-white"
                    }`}
                aria-label="Toggle Menu"
            >
                <Plus className="w-8 h-8 stroke-[3px]" />
            </button>
        </div>
    );
}
