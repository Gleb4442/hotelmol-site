"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";
import { cn } from "@/lib/utils";
import { ArrowRight, Building2, Hotel } from "lucide-react";
import Image from "next/image";

import PremiumBackground from "./PremiumBackground";

const SolutionsBlogSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"single" | "chain">("single");

  const tabs = [
    {
      id: "single",
      label: t("solutions.tab.single"),
      icon: Hotel,
    },
    {
      id: "chain",
      label: t("solutions.tab.chain"),
      icon: Building2,
    },
  ];

  const content = {
    single: {
      title: t("solutions.single.title"),
      description: t("solutions.single.description"),
      image: "/assets/independent_hotel.png",
      features: [
        t("solutions.single.feature1"),
        t("solutions.single.feature2"),
        t("solutions.single.feature3"),
      ],
    },
    chain: {
      title: t("solutions.chain.title"),
      description: t("solutions.chain.description"),
      image: "/assets/hotel_chain.png",
      features: [
        t("solutions.chain.feature1"),
        t("solutions.chain.feature2"),
        t("solutions.chain.feature3"),
      ],
    },
  };

  return (
    <section className="py-24 bg-[#F7F6F2] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[45px] font-bold text-slate-900 mb-6 font-serif"
          >
            {t("solutions.title")}
          </motion.h2>
          
          {/* Custom Segmented Control */}
          <div className="inline-flex p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "single" | "chain")}
                className={cn(
                  "relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                  activeTab === tab.id 
                    ? "text-white" 
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#0752A0] rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={cn("w-4 h-4 relative z-10", activeTab === tab.id ? "text-white" : "text-slate-500")} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image Column */}
              <div className="relative group">
                <div className="relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl">
                  <Image
                    src={content[activeTab].image}
                    alt={content[activeTab].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0752A0]/10 rounded-full blur-3xl -z-10" />
              </div>

              {/* Text Column */}
              <div className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold text-slate-900 mb-6 font-serif leading-tight">
                    {content[activeTab].title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {content[activeTab].description}
                  </p>
                  
                  <ul className="space-y-4 mb-10">
                    {content[activeTab].features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="flex items-center gap-3 text-slate-700 font-medium"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0752A0]/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0752A0]" />
                        </div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#0752A0] text-white rounded-full font-semibold hover:bg-[#064080] transition-all shadow-lg hover:shadow-xl group w-fit">
                    {t("blog.readMore")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PremiumBackground>
  );
};

export default SolutionsBlogSection;
