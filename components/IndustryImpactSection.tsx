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
        <section className="py-16 md:py-24 bg-[#F7F6F2] overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-2xl md:text-3xl lg:text-[45px] font-bold tracking-tight mb-5"
                    >
                        {t("industryImpact.title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg text-muted-foreground leading-relaxed"
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
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "relative w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden",
                                activeHotel.id === hotel.id
                                    ? "bg-white shadow-[0_20px_40px_rgba(7,82,160,0.08)] opacity-100"
                                    : "bg-white/50 hover:bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] opacity-60 hover:opacity-100"
                            )}
                        >
                            <img
                                src={hotel.logo}
                                alt={t(hotel.nameKey as any)}
                                className={cn(
                                    "w-[60px] md:w-[77.2px] h-auto object-contain relative z-10 mix-blend-multiply grayscale brightness-0 opacity-80",
                                    hotel.id === "fourSeasons" && "translate-y-[-2px]"
                                )}
                            />
                            {activeHotel.id === hotel.id && (
                                <motion.div
                                    layoutId="active-pill-shadow"
                                    className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"
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
                            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="relative bg-white/30 backdrop-blur-xl rounded-[48px] p-8 md:p-12 lg:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]">
                                {/* Subtle decorative glow */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                                
                                {activeHotel.sections.map((section, idx) => {
                                    const title = t(`industryImpact.${activeHotel.id}.${section.key}.title` as any);
                                    const items = t(`industryImpact.${activeHotel.id}.${section.key}.items` as any) as unknown as string[];
                                    const Icon = section.icon;

                                    if (!items || !Array.isArray(items)) return null;

                                    return (
                                        <div
                                            key={section.key}
                                            className="space-y-10"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center text-primary">
                                                    <Icon size={32} />
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-bold font-serif tracking-tight">{title}</h3>
                                            </div>

                                            <ul className="space-y-6">
                                                {items.map((item, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                        transition={{ 
                                                            delay: 0.3 + i * 0.1,
                                                            duration: 0.5,
                                                            ease: "easeOut"
                                                        }}
                                                        className="flex gap-5 text-slate-600 leading-relaxed group"
                                                    >
                                                        <div className="mt-3 w-2 h-2 rounded-full bg-primary/30 shrink-0 group-hover:bg-primary transition-all duration-300 group-hover:scale-125" />
                                                        <span className="text-lg md:text-xl font-medium text-slate-700/90 tracking-tight">{item}</span>
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
