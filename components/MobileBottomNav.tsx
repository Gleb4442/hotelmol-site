"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, DollarSign, Play } from "lucide-react";
import { FaTelegram, FaWhatsapp, FaViber } from "react-icons/fa";
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

    const messengers = [
        { name: "Telegram", icon: FaTelegram, color: "#2AABEE", href: "https://t.me/hotelmolmanager" },
        { name: "WhatsApp", icon: FaWhatsapp, color: "#25D366", href: "https://wa.me/380931603830" },
        { name: "Viber", icon: FaViber, color: "#7360f2", href: "viber://chat?number=%2B380931603830" },
    ];

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
                        className="flex flex-col gap-3 items-end mb-4 z-50 relative"
                    >
                        {/* Messengers in Menu */}
                        <div className="flex flex-col gap-2 items-end w-full">
                            {messengers.map((app, idx) => (
                                <motion.a
                                    key={app.name}
                                    href={app.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.05 * idx }}
                                    className="flex items-center gap-3 bg-white pr-4 pl-3 py-2 rounded-full shadow-lg border border-black/5"
                                >
                                    <span className="text-sm font-medium text-slate-700">{app.name}</span>
                                    <app.icon className="w-5 h-5" style={{ color: app.color }} />
                                </motion.a>
                            ))}
                        </div>

                        <div className="w-full h-px bg-white/30 my-1" />

                        {/* Pricing */}
                        <motion.a
                            href="https://pricing.hotelmol.com/#yearly"
                            target="_blank"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
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
                            transition={{ delay: 0.25 }}
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
                            transition={{ delay: 0.3 }}
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

            {/* Custom TRIGGER */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 flex items-center gap-3 group active:scale-95 transition-transform duration-200"
                aria-label="Contact Menu"
            >
                {/* Overlapping Icons */}
                <div className="flex items-center flex-row-reverse">
                    {/* Reverse row to make the right-most on top? Or normal row with negative margins? 
                        User said "icons to the side of button". Button is in bottom right. So icons to the LEFT.
                        They should overlap.
                    */}
                    {messengers.map((app, idx) => (
                        <div
                            key={app.name}
                            className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm -mr-3 last:mr-0 z-[${10 - idx}] transition-colors duration-300 ${isOpen ? '' : 'filter grayscale'}`}
                        >
                            <app.icon className={`w-4 h-4 ${isOpen ? '' : 'text-slate-500'}`} style={{ color: isOpen ? app.color : undefined }} />
                        </div>
                    ))}
                </div>

                {/* Main Button */}
                <div className={`h-12 px-5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center transition-all duration-300 border border-[#0752A0]/10 ${isOpen
                    ? "bg-white text-[#0752A0]"
                    : "bg-[#0752A0] text-white"
                    }`}>
                    <span className="font-bold text-sm tracking-wide">
                        {isOpen ? <Plus className="w-6 h-6 rotate-45" /> : t("nav.contact")}
                    </span>
                </div>
            </button>
        </div>
    );
}
