"use client";

// Force static generation for better caching
export const dynamic = 'force-static';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Network, CheckCircle, ArrowRight } from "lucide-react";


import { useTranslation } from "@/lib/TranslationContext";
import SEO, { organizationSchema } from "@/components/SEO";

import RoomieArchitecture from "@/components/RoomieArchitecture";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
                                            className="!rounded-full"
                                            style={{ borderRadius: "9999px" }}
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
                                            className="!rounded-full"
                                            style={{ borderRadius: "9999px" }}
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

            {/* Online Menu Stats Section */}
            <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/3 opacity-20 pointer-events-none">
                    <div className="w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 opacity-20 pointer-events-none">
                    <div className="w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <h2 className="font-serif text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
                            Влияние онлайн-меню на выручку
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Реальные кейсы внедрения цифрового меню в отелях и ресторанах, доказывающие эффективность технологии.
                        </p>
                    </motion.div>

                    <div className="max-w-6xl mx-auto overflow-x-auto pb-6 custom-scrollbar">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-block min-w-full align-middle bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden"
                        >
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-muted/30 border-b border-border">
                                        <th className="p-5 font-semibold text-primary/80 uppercase tracking-wider text-sm whitespace-nowrap">Кейc / продукт</th>
                                        <th className="p-5 font-semibold text-primary/80 uppercase tracking-wider text-sm whitespace-nowrap">Где используется</th>
                                        <th className="p-5 font-semibold text-primary/80 uppercase tracking-wider text-sm whitespace-nowrap">Количество заказов</th>
                                        <th className="p-5 font-semibold text-primary/80 uppercase tracking-wider text-sm whitespace-nowrap">Средний чек / выручка</th>
                                        <th className="p-5 font-semibold text-primary/80 uppercase tracking-wider text-sm min-w-[250px]">Дополнительный эффект</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { case: "PlumQR (room‑service)", where: "Отели с QR‑меню в номерах", orders: "+45% заказов в номерах", revenue: "+15% к размеру заказа", effect: "78% гостей предпочли онлайн‑заказ" },
                                        { case: "Qrunch (hotel menu)", where: "Сети и независимые отели", orders: "До +250% к сумме заказов", revenue: "+20% к «ценности занятого номера»", effect: "−9 часов работы персонала в день" },
                                        { case: "Fairmont Doha (in‑room)", where: "5* отель, in‑room dining", orders: "+78,6% к объёму заказов", revenue: "+72,5% к выручке по in‑room dining", effect: "23–32% заказов через цифровое меню" },
                                        { case: "Общий тренд", where: "Рестораны и F&B‑зоны", orders: "Рост выручки до 30% после внедрения", revenue: "Рост чека за счёт авто‑upsell", effect: "Повышение оборачиваемости и снижение очередей" },
                                    ].map((row, index) => (
                                        <motion.tr
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                            whileHover={{ backgroundColor: "rgba(4, 75, 147, 0.03)" }}
                                            className="border-b border-border/50 transition-colors last:border-0 hover:bg-muted/20"
                                        >
                                            <td className="p-5 font-medium text-foreground whitespace-nowrap">{row.case}</td>
                                            <td className="p-5 text-muted-foreground whitespace-nowrap">{row.where}</td>
                                            <td className="p-5 font-semibold text-emerald-600 whitespace-nowrap">{row.orders}</td>
                                            <td className="p-5 font-semibold text-blue-600 whitespace-nowrap">{row.revenue}</td>
                                            <td className="p-5 text-muted-foreground">{row.effect}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
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
