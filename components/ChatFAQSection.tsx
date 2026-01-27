
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

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section className="py-16 md:py-24 bg-slate-50/50">
            <script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                suppressHydrationWarning
            />
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
                                    <div className="flex gap-3 w-full flex-row-reverse">
                                        <div className="flex-shrink-0 w-[38px] h-[38px] rounded-full bg-primary flex items-center justify-center mt-1 text-white shadow-sm">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-9 h-9"
                                            >
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <path d="M12 17h.01" />
                                            </svg>
                                        </div>
                                        <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-md max-w-[85%] md:w-auto md:min-w-[40%] text-right">
                                            <p className="font-medium text-sm md:text-base leading-relaxed">{faq.question}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* System Answer (Left) */}
                                <div className="flex justify-start">
                                    <div className="flex gap-3 w-full">
                                        <div className="flex-shrink-0 w-[38px] h-[38px] rounded-full bg-primary flex items-center justify-center mt-1 text-white shadow-sm">
                                            <svg
                                                viewBox="0 0 203.18 203.18"
                                                className="w-9 h-9 fill-current"
                                                shapeRendering="geometricPrecision"
                                                textRendering="geometricPrecision"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                            >
                                                <defs>
                                                    <style type="text/css">
                                                        {`.fil0 {fill:none} .fil1 {fill:white}`}
                                                    </style>
                                                </defs>
                                                <g id="Слой_x0020_1">
                                                    <metadata id="CorelCorpID_0Corel-Layer" />
                                                    <g id="_2278661208240">
                                                        <path className="fil1" d="M106.13 53.03c22.55,2.08 40.65,19.52 43.75,41.75l-96.58 0c3.18,-22.75 22.05,-40.47 45.33,-41.87l0 -4.17 -2.36 0c-2.32,0 -4.23,-1.91 -4.23,-4.23l0 0c0,-2.33 1.91,-4.23 4.23,-4.23l12.4 0c2.33,0 4.23,1.9 4.23,4.23l0 0c0,2.32 -1.9,4.23 -4.23,4.23l-2.54 0 0 4.29zm15.16 63.75c1.5,-1.94 4.29,-2.3 6.23,-0.8 1.94,1.5 2.3,4.29 0.8,6.23 -3.14,4.07 -7.19,7.4 -11.86,9.7 -4.51,2.21 -9.56,3.46 -14.87,3.46 -5.31,0 -10.36,-1.25 -14.87,-3.46 -4.67,-2.3 -8.72,-5.63 -11.86,-9.7 -1.5,-1.94 -1.14,-4.73 0.8,-6.23 1.94,-1.5 4.73,-1.14 6.23,0.8 2.33,3.01 5.31,5.47 8.74,7.15 3.28,1.62 7,2.52 10.96,2.52 3.96,0 7.68,-0.9 10.96,-2.52 3.43,-1.68 6.41,-4.14 8.74,-7.15zm-10.04 39.85c-1.68,1.41 -4.25,2.17 -4.31,-1.17 -0.02,-0.99 -0.04,-1.26 -0.06,-2.26 -0.81,-2.45 -3.2,-2.84 -5.68,-2.84l0 -0.01c-25.76,-0.2 -46.76,-20.38 -48.29,-45.8l97.36 0c-0.71,11.75 -5.05,23.66 -13.15,30.44l-25.87 21.64z" />
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <motion.div
                                            className={cn(
                                                "group relative overflow-hidden bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 cursor-pointer transition-all duration-300 max-w-[90%]",
                                                !isRevealed && "hover:shadow-md hover:border-primary/20"
                                            )}
                                            onClick={() => toggleReveal(index)}
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
                                                    !isRevealed && "opacity-40 blur-[2px] select-none line-clamp-2 md:line-clamp-none"
                                                )}>
                                                    {faq.answer.includes("[PRICING_BTN]") ? (
                                                        faq.answer.split(/\[PRICING_BTN\](.*?)\[\/PRICING_BTN\]/g).map((part, i) => {
                                                            if (i % 2 === 1) {
                                                                return (
                                                                    <a
                                                                        key={i}
                                                                        href="https://pricing.hotelmol.com"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors mx-1 shadow-sm transform hover:scale-105 active:scale-95 duration-200"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        {part}
                                                                    </a>
                                                                );
                                                            }
                                                            return part;
                                                        })
                                                    ) : (
                                                        faq.answer
                                                    )}
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
