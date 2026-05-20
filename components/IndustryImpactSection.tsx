"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/TranslationContext";
import { cn } from "@/lib/utils";

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
    }[];
}

const hotelConfig: HotelData[] = [
    {
        id: "hilton",
        nameKey: "industryImpact.hilton.name",
        logo: "/assets/neutral/hilton.png",
        sections: [
            { key: "metrics" },
        ]
    },
    {
        id: "marriott",
        nameKey: "industryImpact.marriott.name",
        logo: "/assets/neutral/marriott.png",
        sections: [
            { key: "metrics" },
        ]
    },
    {
        id: "hyatt",
        nameKey: "industryImpact.hyatt.name",
        logo: "/assets/neutral/hyatt.png",
        sections: [
            { key: "metrics" },
        ]
    },
    {
        id: "accor",
        nameKey: "industryImpact.accor.name",
        logo: "/assets/neutral/accor.png",
        sections: [
            { key: "metrics" },
        ]
    },
    {
        id: "fourSeasons",
        nameKey: "industryImpact.fourSeasons.name",
        logo: "/assets/neutral/fourseasons.png",
        sections: [
            { key: "metrics" },
        ]
    },
];

import PremiumBackground from './PremiumBackground';

export default function IndustryImpactSection() {
    const { t } = useTranslation();
    const [activeHotel, setActiveHotel] = useState<HotelData>(hotelConfig[0]);

    return (
        <PremiumBackground className="py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <h2
                        className="font-serif text-2xl md:text-3xl lg:text-[45px] font-bold tracking-tight mb-5"
                    >
                        {t("industryImpact.title")}
                    </h2>
                    <p
                        className="text-base md:text-lg text-muted-foreground leading-relaxed"
                    >
                        {t("industryImpact.subtitle")}
                    </p>
                </div>

                {/* Logo Navigation */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 lg:mb-24">
                    {hotelConfig.map((hotel) => (
                        <button
                            key={hotel.id}
                            onClick={() => setActiveHotel(hotel)}
                            className={cn(
                                "relative w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden hover:scale-[1.04] active:scale-95",
                                activeHotel.id === hotel.id
                                    ? "bg-white shadow-[0_20px_40px_rgba(7,82,160,0.08)] opacity-100"
                                    : "bg-white/50 hover:bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] opacity-60 hover:opacity-100"
                            )}
                        >
                            <img
                                src={hotel.logo}
                                alt={t(hotel.nameKey as any)}
                                loading="lazy"
                                decoding="async"
                                className={cn(
                                    "w-[60px] md:w-[77.2px] h-auto object-contain relative z-10 mix-blend-multiply grayscale brightness-0 opacity-80",
                                    hotel.id === "fourSeasons" && "translate-y-[-2px]"
                                )}
                            />
                            {activeHotel.id === hotel.id && (
                                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="relative min-h-[400px]">
                        <div
                            key={activeHotel.id}
                            className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-300"
                        >
                            <div className="relative overflow-hidden bg-white/70 rounded-[48px] p-8 md:p-12 lg:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(7,82,160,0.05),transparent_32%),radial-gradient(circle_at_0%_100%,rgba(7,82,160,0.04),transparent_30%)] pointer-events-none" />
                                
                                {activeHotel.sections.map((section, idx) => {
                                    const title = t(`industryImpact.${activeHotel.id}.${section.key}.title` as any);
                                    const items = t(`industryImpact.${activeHotel.id}.${section.key}.items` as any) as unknown as string[];

                                    if (!items || !Array.isArray(items)) return null;

                                    return (
                                        <div
                                            key={section.key}
                                            className="space-y-10"
                                        >
                                            <h3 className="text-2xl md:text-3xl font-bold font-serif tracking-tight">{title}</h3>

                                            <ul className="space-y-6">
                                                {items.map((item, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex gap-5 text-slate-600 leading-relaxed group"
                                                    >
                                                        <div className="mt-3 w-5 h-[1.5px] bg-gradient-to-r from-[#0752A0]/40 to-transparent shrink-0 group-hover:from-[#0752A0] transition-all duration-500" />
                                                        <span className="text-lg md:text-xl font-medium text-slate-700/90 tracking-tight">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                </div>
            </div>
        </PremiumBackground>
    );
}
