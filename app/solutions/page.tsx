"use client";

// Force static generation for better caching
export const dynamic = 'force-static';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Network, CheckCircle, ArrowRight } from "lucide-react";


import { useTranslation } from "@/lib/TranslationContext";
import SEO, { organizationSchema } from "@/components/SEO";
import AiCDP_App from "@/components/AiCDP_bar/AiCDP_App";
import RoomieArchitecture from "@/components/RoomieArchitecture";

export default function Solutions() {
    const { t } = useTranslation();


    const singleHotelFeatures = [
        t("solutions.single.feature1"),
        t("solutions.single.feature2"),
        t("solutions.single.feature3"),
        t("solutions.single.feature4"),
        t("solutions.single.feature5"),
        t("solutions.single.feature6"),
    ];

    const chainFeatures = [
        t("solutions.chain.feature1"),
        t("solutions.chain.feature2"),
        t("solutions.chain.feature3"),
        t("solutions.chain.feature4"),
        t("solutions.chain.feature5"),
        t("solutions.chain.feature6"),
    ];

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Hotel Management Solutions - Hotelmol"
                description="Tailored AI communication solutions for single hotels, hotel chains, and hostels."
                structuredData={organizationSchema}
            />

            <RoomieArchitecture />

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h1 className="font-serif text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
                            {t("solutions.title")}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {t("solutions.subtitle")}
                        </p>
                    </div>

                    <Tabs defaultValue="chain" className="max-w-5xl mx-auto">
                        <TabsList className="grid w-full grid-cols-2 mb-12 gap-4">
                            <TabsTrigger value="chain" className="gap-2 border-2 border-solid border-primary/30 rounded-lg data-[state=active]:border-primary data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/10 data-[state=active]:to-primary/5 data-[state=active]:shadow-md transition-all duration-200">
                                <Network className="w-4 h-4" />
                                {t("solutions.tab.chain")}
                            </TabsTrigger>
                            <TabsTrigger value="single" className="gap-2 border-2 border-solid border-primary/30 rounded-lg data-[state=active]:border-primary data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/10 data-[state=active]:to-primary/5 data-[state=active]:shadow-md transition-all duration-200">
                                <Building2 className="w-4 h-4" />
                                {t("solutions.tab.single")}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="single" className="space-y-12">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="font-serif text-3xl font-semibold mb-4">{t("solutions.single.title")}</h2>
                                    <p className="text-lg text-muted-foreground mb-8">
                                        {t("solutions.single.description")}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Button
                                            size="lg"
                                            asChild
                                        >
                                            <a href="https://cal.com/gleb.gosha/30min" target="_blank" rel="noopener noreferrer">
                                                {t("button.requestDemo")}
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>

                                <div className="relative p-3 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/15 rounded-xl shadow-xl border border-primary/20">
                                    <div className="overflow-hidden rounded-lg bg-white">
                                        <img
                                            src="/assets/solutions-single.jpg"
                                            alt="Luxury hotel with ocean view"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="chain" className="space-y-12">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="font-serif text-3xl font-semibold mb-4">{t("solutions.chain.title")}</h2>
                                    <p className="text-lg text-muted-foreground mb-6">
                                        {t("solutions.chain.description")}
                                    </p>
                                    <div className="space-y-3 mb-8">
                                        {chainFeatures.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <Button
                                            size="lg"
                                            asChild
                                        >
                                            <a href="https://cal.com/gleb.gosha/30min" target="_blank" rel="noopener noreferrer">
                                                {t("button.requestDemo")}
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>

                                <div className="relative p-3 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/15 rounded-xl shadow-xl border border-primary/20">
                                    <div className="overflow-hidden rounded-lg bg-white">
                                        <img
                                            src="/assets/solutions-chains.jpg"
                                            alt="Modern hotel chain buildings"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <section className="py-20 bg-background border-t border-border/50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="font-serif text-4xl font-semibold mb-6">Interactive AI Concierge</h2>
                        <p className="text-xl text-muted-foreground">
                            Try our hotel dashboard directly to see how our AI communication solutions work in practice.
                        </p>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-border shadow-2xl h-[800px]">
                        <AiCDP_App />
                    </div>
                </div>
            </section>

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
