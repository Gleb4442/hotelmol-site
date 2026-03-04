"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/TranslationContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Building2,
    TrendingUp,
    Wallet,
    Target,
    MessageSquare,
    Globe,
    Smartphone,
    CheckCircle2,
    Award,
    Zap
} from "lucide-react";

interface CaseStudySection {
    title: string;
    items: string[];
}

interface HotelData {
    id: string;
    nameKey: string;
    logo: string;
    sections: {
        key: string;
        icon: any;
    }[];
}

const hotelConfig: HotelData[] = [
    {
        id: "hilton",
        nameKey: "industryImpact.hilton.name",
        logo: "/assets/hilton-logo.svg",
        sections: [
            { key: "scale", icon: Building2 },
            { key: "results", icon: CheckCircle2 },
            { key: "financials", icon: Wallet },
            { key: "conversion", icon: Target },
            { key: "messaging", icon: MessageSquare },
        ]
    },
    {
        id: "marriott",
        nameKey: "industryImpact.marriott.name",
        logo: "/assets/marriott-logo.png",
        sections: [
            { key: "scale", icon: Building2 },
            { key: "regional", icon: Globe },
            { key: "channels", icon: Smartphone },
            { key: "operational", icon: Zap },
            { key: "strategic", icon: Award },
        ]
    },
    {
        id: "hyatt",
        nameKey: "industryImpact.hyatt.name",
        logo: "/assets/hyatt-logo.png",
        sections: [
            { key: "scale", icon: Building2 },
            { key: "influence", icon: TrendingUp },
            { key: "case", icon: Target },
            { key: "channels", icon: Smartphone },
            { key: "digitalKey", icon: Zap },
        ]
    },
    {
        id: "hyattInclusive",
        nameKey: "industryImpact.hyattInclusive.name",
        logo: "/assets/hyatt-logo.png", // Reusing Hyatt logo
        sections: [
            { key: "adaptation", icon: Building2 },
            { key: "results", icon: Wallet },
            { key: "efficiency", icon: Zap },
        ]
    },
    {
        id: "accor",
        nameKey: "industryImpact.accor.name",
        logo: "/assets/accor-logo.png",
        sections: [
            { key: "scale", icon: Building2 },
            { key: "financials", icon: Wallet },
            { key: "loyalty", icon: Award },
            { key: "ecosystem", icon: Globe },
            { key: "lifecycle", icon: Zap },
        ]
    },
    {
        id: "fourSeasons",
        nameKey: "industryImpact.fourSeasons.name",
        logo: "/assets/fourseasons-logo.png",
        sections: [
            { key: "app", icon: Smartphone },
            { key: "features", icon: Zap },
            { key: "covid", icon: Globe },
            { key: "residential", icon: Building2 },
        ]
    },
];

export default function IndustryImpactSection() {
    const { t } = useTranslation();
    const [activeHotel, setActiveHotel] = useState<HotelData>(hotelConfig[0]);

    return (
        <section className="py-20 md:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        {t("industryImpact.title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                    >
                        {t("industryImpact.subtitle")}
                    </motion.p>
                </div>

                {/* Logo Navigation */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 lg:mb-24">
                    {hotelConfig.map((hotel) => (
                        <motion.button
                            key={hotel.id}
                            onClick={() => setActiveHotel(hotel)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "p-4 md:p-6 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 grayscale hover:grayscale-0",
                                activeHotel.id === hotel.id
                                    ? "bg-slate-50 border-primary grayscale-0 shadow-lg shadow-primary/5"
                                    : "bg-white border-transparent hover:bg-slate-50/50"
                            )}
                        >
                            <img
                                src={hotel.logo}
                                alt={t(hotel.nameKey as any)}
                                className="h-8 md:h-12 w-auto object-contain"
                            />
                        </motion.button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeHotel.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="bg-slate-50/50 rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-slate-100"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
                                {activeHotel.sections.map((section, idx) => {
                                    const title = t(`industryImpact.${activeHotel.id}.${section.key}.title` as any);
                                    const items = t(`industryImpact.${activeHotel.id}.${section.key}.items` as any) as unknown as string[];
                                    const Icon = section.icon;

                                    if (!items || !Array.isArray(items)) return null;

                                    return (
                                        <motion.div
                                            key={section.key}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary border border-slate-100">
                                                    <Icon size={24} />
                                                </div>
                                                <h3 className="text-xl font-bold font-serif">{title}</h3>
                                            </div>

                                            <ul className="space-y-4">
                                                {items.map((item, i) => (
                                                    <li key={i} className="flex gap-3 text-slate-600 leading-relaxed group">
                                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 group-hover:bg-primary transition-colors" />
                                                        <span className="text-[15px] md:text-base">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
