
"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/TranslationContext";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
    question: string;
    answer: string;
}

export default function ChatFAQSection() {
    const { t } = useTranslation();
    const [revealedAnswers, setRevealedAnswers] = useState<number[]>([]);

    // We'll likely fetch these from translations, but defining structure here
    const faqs: FAQItem[] = [
        { question: t("home.faq.q1"), answer: t("home.faq.a1") },
        { question: t("home.faq.q2"), answer: t("home.faq.a2") },
        { question: t("home.faq.q3"), answer: t("home.faq.a3") },
        { question: t("home.faq.q4"), answer: t("home.faq.a4") },
        { question: t("home.faq.q5"), answer: t("home.faq.a5") },
        { question: t("home.faq.q6"), answer: t("home.faq.a6") },
        { question: t("home.faq.q7"), answer: t("home.faq.a7") },
        { question: t("home.faq.q8"), answer: t("home.faq.a8") },
        { question: t("home.faq.q9"), answer: t("home.faq.a9") }
    ];

    const toggleReveal = (index: number) => {
        if (revealedAnswers.includes(index)) {
            setRevealedAnswers(prev => prev.filter(i => i !== index));
        } else {
            setRevealedAnswers(prev => [...prev, index]);
        }
    };

    return (
        <section className="py-16 md:py-24 bg-slate-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        {t("home.faq.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("home.faq.subtitle")}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                    {faqs.map((faq, index) => {
                        const isRevealed = revealedAnswers.includes(index);

                        return (
                            <div key={index} className="space-y-4">
                                {/* User Question (Right) */}
                                <div className="flex justify-end">
                                    <div className="flex gap-3 max-w-[85%] md:max-w-[75%] flex-row-reverse">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                                            <HelpCircle className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="bg-primary text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md">
                                            <p className="font-medium text-sm md:text-base leading-relaxed">{faq.question}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* System Answer (Left) */}
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[85%] md:max-w-[75%]">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mt-1">
                                            <MessageCircle className="w-4 h-4 text-slate-600" />
                                        </div>
                                        <motion.div
                                            className={cn(
                                                "group relative overflow-hidden bg-white px-5 py-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 cursor-pointer transition-all duration-300",
                                                !isRevealed && "hover:shadow-md hover:border-primary/20"
                                            )}
                                            onClick={() => !isRevealed && toggleReveal(index)}
                                        >
                                            <div className="relative">
                                                {/* Blurred Overlay */}
                                                <AnimatePresence>
                                                    {!isRevealed && (
                                                        <motion.div
                                                            initial={{ opacity: 1, backdropFilter: "blur(8px)" }}
                                                            exit={{
                                                                opacity: 0,
                                                                backdropFilter: "blur(0px)",
                                                                transition: { duration: 0.8, ease: "easeInOut" }
                                                            }}
                                                            className="absolute inset-0 z-10 flex items-center justify-center bg-white/40"
                                                            style={{ backdropFilter: "blur(6px)" }}
                                                        >
                                                            <span className="text-xs font-medium uppercase tracking-widest text-primary/80 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                                                                Tap to Reveal
                                                            </span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Actual Content */}
                                                <p className={cn(
                                                    "text-sm md:text-base text-slate-700 leading-relaxed transition-all duration-700 whitespace-pre-line",
                                                    !isRevealed && "opacity-40 blur-[2px] select-none"
                                                )}>
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
