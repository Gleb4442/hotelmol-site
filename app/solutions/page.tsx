"use client";

// Force static generation for better caching
export const dynamic = 'force-static';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


import { useTranslation } from "@/lib/TranslationContext";
import SEO, { organizationSchema } from "@/components/SEO";

import RoomieArchitecture from "@/components/RoomieArchitecture";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Solutions() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Hotel Management Solutions - Hotelmol"
                description="Tailored AI communication solutions for single hotels, hotel chains, and hostels."
                structuredData={organizationSchema}
            />



            <RoomieArchitecture />



            {/* Online Menu Stats Section */}

            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-serif text-4xl font-semibold mb-6">{t("solutions.consultation.title")}</h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            {t("solutions.consultation.subtitle")}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                size="lg"
                                asChild
                                className="!rounded-full"
                                style={{ borderRadius: "9999px" }}
                            >
                                <a href="https://cal.com/gleb.gosha/30min" target="_blank" rel="noopener noreferrer">
                                    {t("solutions.consultation.button")}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>


            {/* <DemoRequestModal open={demoModalOpen} onOpenChange={setDemoModalOpen} /> */}
        </div>
    );
}
