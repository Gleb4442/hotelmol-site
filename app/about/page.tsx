"use client";

// Force static generation for better caching
export const dynamic = 'force-static';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SEO, { organizationSchema } from "@/components/SEO";
import { useTranslation } from "@/lib/TranslationContext";
import AiReviewSection from "@/components/AiReviewSection";
import ValueProposition from "@/components/ValueProposition";
import Image from "next/image";

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={t("about.seo.title")}
                description={t("about.seo.description")}
                structuredData={organizationSchema}
            />


            <section className="relative bg-background pt-[130px] pb-[110px] md:pt-48 md:pb-[132px] overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            {t("about.hero.title")}{" "}
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #0752A0, #0752A0)" }}>
                                {t("about.hero.titleAccent")}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                            {t("about.hero.subtitle")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-9 justify-center items-center">
                            <a
                                href="https://cal.com/gleb.gosha/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 bg-[#0752A0] text-white text-lg font-semibold rounded-full hover:bg-[#064080] transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
                            >
                                {t("about.hero.button.integration")}
                            </a>
                            <Link href="/roomie" className="w-full sm:w-auto text-center">
                                <button className="text-slate-600 hover:text-slate-900 transition-colors text-lg font-medium">
                                    {t("about.hero.button.meetRoomie")}
                                </button>
                            </Link>
                        </div>
                        <AiReviewSection />
                    </div>
                </div>
            </section>

            <ValueProposition />

            <section className="pt-[46px] pb-24 md:pb-12 min-h-[600px] flex flex-col justify-center" style={{ backgroundColor: "#F7F5F1" }}>
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <span className="text-lg font-semibold uppercase tracking-widest mb-4 block" style={{ color: "#0752A0" }}>
                            {t("about.dna.label")}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            {t("about.dna.title")}
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            {t("about.dna.description1")}
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            {t("about.dna.description2")}
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            {t("about.dna.description3")}
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed md:mb-[15px]">
                            {t("about.dna.description4")}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24" style={{ backgroundColor: "#20629B" }}>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center px-2">
                            <h3 className="text-3xl font-bold text-white mb-6">{t("about.mascot.title")}</h3>
                            <blockquote className="text-base md:text-lg lg:text-[21.6px] text-slate-300 leading-relaxed italic break-words whitespace-pre-wrap">
                                {t("about.mascot.quote")}
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
