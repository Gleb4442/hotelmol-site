"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/TranslationContext";

export default function AskAIWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="hidden md:flex fixed bottom-8 left-8 z-50 flex-col items-start gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-[350px] h-[450px] bg-background border rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 origin-bottom-left"
                    >
                        <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        width="100%"
                                        height="100%"
                                        version="1.1"
                                        viewBox="0 0 203.18 203.18"
                                        className="w-5 h-5"
                                        style={{
                                            shapeRendering: "geometricPrecision",
                                            textRendering: "geometricPrecision",
                                            fillRule: "evenodd",
                                            clipRule: "evenodd",
                                        }}
                                    >
                                        <g id="Layer_1">
                                            <circle fill="none" cx="101.59" cy="101.59" r="101.6" />
                                            <path
                                                fill="currentColor"
                                                d="M106.13 53.03c22.55,2.08 40.65,19.52 43.75,41.75l-96.58 0c3.18,-22.75 22.05,-40.47 45.33,-41.87l0 -4.17 -2.36 0c-2.32,0 -4.23,-1.91 -4.23,-4.23l0 0c0,-2.33 1.91,-4.23 4.23,-4.23l12.4 0c2.33,0 4.23,1.9 4.23,4.23l0 0c0,2.32 -1.9,4.23 -4.23,4.23l-2.54 0 0 4.29zm15.16 63.75c1.5,-1.94 4.29,-2.3 6.23,-0.8 1.94,1.5 2.3,4.29 0.8,6.23 -3.14,4.07 -7.19,7.4 -11.86,9.7 -4.51,2.21 -9.56,3.46 -14.87,3.46 -5.31,0 -10.36,-1.25 -14.87,-3.46 -4.67,-2.3 -8.72,-5.63 -11.86,-9.7 -1.5,-1.94 -1.14,-4.73 0.8,-6.23 1.94,-1.5 4.73,-1.14 6.23,0.8 2.33,3.01 5.31,5.47 8.74,7.15 3.28,1.62 7,2.52 10.96,2.52 3.96,0 7.68,-0.9 10.96,-2.52 3.43,-1.68 6.41,-4.14 8.74,-7.15zm-10.04 39.85c-1.68,1.41 -4.25,2.17 -4.31,-1.17 -0.02,-0.99 -0.04,-1.26 -0.06,-2.26 -0.81,-2.45 -3.2,-2.84 -5.68,-2.84l0 -0.01c-25.76,-0.2 -46.76,-20.38 -48.29,-45.8l97.36 0c-0.71,11.75 -5.05,23.66 -13.15,30.44l-25.87 21.64z"
                                            />
                                        </g>
                                    </svg>
                                </div>
                                <span className="font-semibold">HotelMol AI</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-white/20 text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto bg-muted/20">
                            <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%] text-sm mb-4">
                                {t("aiWidget.welcome") || "Привет! Я ИИ-ассистент. Чем могу помочь?"}
                            </div>
                        </div>

                        <div className="p-4 border-t bg-background">
                            <div className="flex gap-2">
                                <Input placeholder="Message..." className="flex-1" />
                                <Button size="icon">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-3 pl-2 pr-6 py-2 bg-white dark:bg-slate-900 rounded-full shadow-lg border border-slate-200 dark:border-slate-800"
            >
                {/* Border Beam Animation */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_3s_linear_infinite]"
                        style={{ content: '""' }}
                    />
                    <div className="absolute inset-[1px] rounded-full bg-white dark:bg-slate-900" />

                    {/* Blue beam */}
                    <span className="absolute top-0 left-0 h-full w-full rounded-full border-2 border-transparent border-t-blue-500 border-l-blue-500 rounded-full animate-[spin_3s_linear_infinite] shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-[#0752A0] flex items-center justify-center text-white overflow-hidden animate-pulse-slow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlSpace="preserve"
                            width="24"
                            height="24"
                            version="1.1"
                            viewBox="0 0 203.18 203.18"
                            style={{
                                shapeRendering: "geometricPrecision",
                                textRendering: "geometricPrecision",
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                            }}
                        >
                            <g id="Layer_1">
                                <circle fill="none" cx="101.59" cy="101.59" r="101.6" />
                                <path
                                    className="fill-white"
                                    d="M106.13 53.03c22.55,2.08 40.65,19.52 43.75,41.75l-96.58 0c3.18,-22.75 22.05,-40.47 45.33,-41.87l0 -4.17 -2.36 0c-2.32,0 -4.23,-1.91 -4.23,-4.23l0 0c0,-2.33 1.91,-4.23 4.23,-4.23l12.4 0c2.33,0 4.23,1.9 4.23,4.23l0 0c0,2.32 -1.9,4.23 -4.23,4.23l-2.54 0 0 4.29zm15.16 63.75c1.5,-1.94 4.29,-2.3 6.23,-0.8 1.94,1.5 2.3,4.29 0.8,6.23 -3.14,4.07 -7.19,7.4 -11.86,9.7 -4.51,2.21 -9.56,3.46 -14.87,3.46 -5.31,0 -10.36,-1.25 -14.87,-3.46 -4.67,-2.3 -8.72,-5.63 -11.86,-9.7 -1.5,-1.94 -1.14,-4.73 0.8,-6.23 1.94,-1.5 4.73,-1.14 6.23,0.8 2.33,3.01 5.31,5.47 8.74,7.15 3.28,1.62 7,2.52 10.96,2.52 3.96,0 7.68,-0.9 10.96,-2.52 3.43,-1.68 6.41,-4.14 8.74,-7.15zm-10.04 39.85c-1.68,1.41 -4.25,2.17 -4.31,-1.17 -0.02,-0.99 -0.04,-1.26 -0.06,-2.26 -0.81,-2.45 -3.2,-2.84 -5.68,-2.84l0 -0.01c-25.76,-0.2 -46.76,-20.38 -48.29,-45.8l97.36 0c-0.71,11.75 -5.05,23.66 -13.15,30.44l-25.87 21.64z"
                                />
                            </g>
                        </svg>
                    </div>
                    <span className="font-medium text-sm text-foreground">Спросить ИИ</span>
                </div>

                <style jsx>{`
            .animate-pulse-slow {
                animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: .7; }
            }
        `}</style>
            </motion.button>
        </div>
    );
}
