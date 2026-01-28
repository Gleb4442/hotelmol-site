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


                {/* Main Button */}
                <div className={`w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center transition-all duration-500 border border-[#0752A0]/10 ${isOpen
                    ? "bg-white text-[#0752A0] rotate-[360deg]"
                    : "bg-[#0752A0] text-white"
                    }`}>
                    {isOpen ? (
                        <Plus className="w-8 h-8 rotate-45" />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlSpace="preserve"
                            width="24px"
                            height="24px"
                            version="1.1"
                            style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", fillRule: "evenodd", clipRule: "evenodd" }}
                            viewBox="0 0 203.18 203.18"
                            className="w-7 h-7 fill-current"
                        >
                            <defs>
                                <style type="text/css">
                                    {`
                                    .fil0 {fill:none}
                                    .fil1 {fill:currentColor}
                                `}
                                </style>
                            </defs>
                            <g>
                                <circle className="fil0" cx="101.59" cy="101.59" r="101.6" />
                                <path className="fil1" d="M106.13 53.03c22.55,2.08 40.65,19.52 43.75,41.75l-96.58 0c3.18,-22.75 22.05,-40.47 45.33,-41.87l0 -4.17 -2.36 0c-2.32,0 -4.23,-1.91 -4.23,-4.23l0 0c0,-2.33 1.91,-4.23 4.23,-4.23l12.4 0c2.33,0 4.23,1.9 4.23,4.23l0 0c0,2.32 -1.9,4.23 -4.23,4.23l-2.54 0 0 4.29zm15.16 63.75c1.5,-1.94 4.29,-2.3 6.23,-0.8 1.94,1.5 2.3,4.29 0.8,6.23 -3.14,4.07 -7.19,7.4 -11.86,9.7 -4.51,2.21 -9.56,3.46 -14.87,3.46 -5.31,0 -10.36,-1.25 -14.87,-3.46 -4.67,-2.3 -8.72,-5.63 -11.86,-9.7 -1.5,-1.94 -1.14,-4.73 0.8,-6.23 1.94,-1.5 4.73,-1.14 6.23,0.8 2.33,3.01 5.31,5.47 8.74,7.15 3.28,1.62 7,2.52 10.96,2.52 3.96,0 7.68,-0.9 10.96,-2.52 3.43,-1.68 6.41,-4.14 8.74,-7.15zm-10.04 39.85c-1.68,1.41 -4.25,2.17 -4.31,-1.17 -0.02,-0.99 -0.04,-1.26 -0.06,-2.26 -0.81,-2.45 -3.2,-2.84 -5.68,-2.84l0 -0.01c-25.76,-0.2 -46.76,-20.38 -48.29,-45.8l97.36 0c-0.71,11.75 -5.05,23.66 -13.15,30.44l-25.87 21.64z" />
                            </g>
                        </svg>
                    )}
                </div>
            </button>
        </div>
    );
}
