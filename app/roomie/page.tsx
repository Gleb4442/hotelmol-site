"use client";
import { MessageSquare, Brain, Zap, Shield, BarChart3, Globe2, ArrowRight, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import BookingShowcase from "@/components/BookingShowcase";
import SalesAIAgentSection from "@/components/SalesAIAgentSection";
import TaskManagementShowcase from "@/components/TaskManagementShowcase";
import ChatFAQSection from "@/components/ChatFAQSection";
import ConsultationForm from "@/components/ConsultationForm";
import { useTranslation } from "@/lib/TranslationContext";
import SEO, { productSchema } from "@/components/SEO";


export default function Roomie() {
    const { t } = useTranslation();



    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Roomie - AI Hotel Assistant - Hotelmol"
                description="Meet Roomie, the AI-powered assistant that automates hotel guest communication."
                structuredData={productSchema}
            />

            {/* === HERO SECTION === */}
            <section className="relative pt-[106px] pb-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16 mt-[25px]">
                        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-2">{t("roomie.title")}</h1>
                        <p className="text-2xl text-foreground mb-6">{t("roomie.titleTagline")}</p>
                        <p className="text-xl text-muted-foreground leading-relaxed">{t("roomie.subtitle")}</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Video Demo Placeholder */}
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 shadow-xl bg-slate-900 aspect-video flex items-center justify-center group cursor-pointer">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
                                
                                {/* Play button */}
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-white/80 text-sm font-medium">
                                        {t("roomie.hero.videoPlaceholder" as any)}
                                    </p>
                                </div>

                                {/* Roomie mascot (fallback image) */}
                                <img
                                    src="/assets/Gemini_Generated_Image_borpdeborpdeborp-Photoroom_1764493985974.png"
                                    alt="Roomie AI"
                                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                                />
                            </div>

                            {/* Platform icons */}
                            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                                {[
                                    { key: "website", icon: "🌐" },
                                    { key: "telegram", icon: "✈️" },
                                    { key: "whatsapp", icon: "💬", isSoon: true },
                                    { key: "messenger", icon: "🔵", isSoon: true },
                                    { key: "app", icon: "📱" },
                                ].map((platform) => (
                                    <div
                                        key={platform.key}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/60 shadow-sm text-xs font-medium text-slate-600 transition-all duration-300 hover:shadow-md"
                                    >
                                        <span>{platform.icon}</span>
                                        <span>{t(`roomie.platforms.${platform.key}` as any)}</span>
                                        {platform.isSoon && (
                                            <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                                                {t("roomie.platforms.soon" as any)}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* === BOOKING SHOWCASE === */}
            <BookingShowcase />

            {/* === AI SALES AGENT === */}
            <SalesAIAgentSection />

            {/* === TASK MANAGEMENT === */}
            <TaskManagementShowcase />

            {/* === FAQ === */}
            <ChatFAQSection variant="roomie" />

            {/* === CONSULTATION === */}
            <ConsultationForm />
        </div>
    );
}
