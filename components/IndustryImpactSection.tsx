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
        logo: "/assets/neutral/hilton.png",
        sections: [
            { key: "metrics", icon: TrendingUp },
        ]
    },
    {
        id: "marriott",
        nameKey: "industryImpact.marriott.name",
        logo: "/assets/neutral/marriott.png",
        sections: [
            { key: "metrics", icon: TrendingUp },
        ]
    },
    {
        id: "hyatt",
        nameKey: "industryImpact.hyatt.name",
        logo: "/assets/neutral/hyatt.png",
        sections: [
            { key: "metrics", icon: TrendingUp },
        ]
    },
    {
        id: "accor",
        nameKey: "industryImpact.accor.name",
        logo: "/assets/neutral/accor.png",
        sections: [
            { key: "metrics", icon: TrendingUp },
        ]
    },
    {
        id: "fourSeasons",
        nameKey: "industryImpact.fourSeasons.name",
        logo: "/assets/neutral/fourseasons.png",
        sections: [
            { key: "metrics", icon: TrendingUp },
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
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 lg:mb-24">
                    {hotelConfig.map((hotel) => (
                        <motion.button
                            key={hotel.id}
                            onClick={() => setActiveHotel(hotel)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "relative px-8 md:px-12 py-4 md:py-5 rounded-full flex items-center justify-center transition-all duration-500 border min-w-[160px] md:min-w-[200px]",
                                activeHotel.id === hotel.id
                                    ? "bg-[#F7F5F1] border-[#0752A0]/20 shadow-[0_20px_40px_rgba(7,82,160,0.12)] grayscale-0 opacity-100"
                                    : "bg-white border-slate-100 hover:border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] grayscale opacity-60 hover:opacity-100 hover:grayscale-0"
                            )}
                        >
                            <img
                                src={hotel.logo}
                                alt={t(hotel.nameKey as any)}
                                className="h-6 md:h-8 w-auto object-contain relative z-10"
                            />
                            {activeHotel.id === hotel.id && (
                                <motion.div
                                    layoutId="active-pill-shadow"
                                    className="absolute inset-0 rounded-full bg-gradient-to-b from-white/50 to-transparent pointer-events-none"
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeHotel.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="bg-slate-50/50 rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-slate-100 shadow-sm">
                                {activeHotel.sections.map((section, idx) => {
                                    const title = t(`industryImpact.${activeHotel.id}.${section.key}.title` as any);
                                    const items = t(`industryImpact.${activeHotel.id}.${section.key}.items` as any) as unknown as string[];
                                    const Icon = section.icon;

                                    if (!items || !Array.isArray(items)) return null;

                                    return (
                                        <div
                                            key={section.key}
                                            className="space-y-8"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary border border-slate-100">
                                                    <Icon size={28} />
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-bold font-serif">{title}</h3>
                                            </div>

                                            <ul className="space-y-5">
                                                {items.map((item, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.2 + i * 0.1 }}
                                                        className="flex gap-4 text-slate-600 leading-relaxed group"
                                                    >
                                                        <div className="mt-2.5 w-2 h-2 rounded-full bg-primary/40 shrink-0 group-hover:bg-primary transition-colors" />
                                                        <span className="text-lg md:text-xl font-medium text-slate-700">{item}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
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
