"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";
import { User, Globe, Shield, TrendingUp, MessageCircle } from "lucide-react";

export default function MainFunctions() {
  const { t } = useTranslation();

  const features = [
    {
      key: "personalConcierge",
      icon: <User className="w-7 h-7" />,
      title: t("roomie.features.personalConcierge.title"),
      description: t("roomie.features.personalConcierge.description"),
      color: "from-blue-500/10 via-indigo-500/5 to-transparent",
      borderColor: "border-blue-100/50",
      large: true
    },
    {
      key: "multilingual",
      icon: <Globe className="w-6 h-6" />,
      title: t("roomie.features.multilingual.title"),
      description: t("roomie.features.multilingual.description"),
      color: "from-emerald-500/10 via-teal-500/5 to-transparent",
      borderColor: "border-emerald-100/50"
    },
    {
      key: "security",
      icon: <Shield className="w-6 h-6" />,
      title: t("roomie.features.security.title"),
      description: t("roomie.features.security.description"),
      color: "from-slate-500/10 via-slate-400/5 to-transparent",
      borderColor: "border-slate-200/50"
    },
    {
      key: "upsell",
      icon: <TrendingUp className="w-6 h-6" />,
      title: t("roomie.features.upsell.title"),
      description: t("roomie.features.upsell.description"),
      color: "from-purple-500/10 via-pink-500/5 to-transparent",
      borderColor: "border-purple-100/50"
    },
    {
      key: "conversations",
      icon: <MessageCircle className="w-6 h-6" />,
      title: t("roomie.features.conversations.title"),
      description: t("roomie.features.conversations.description"),
      color: "from-sky-500/10 via-blue-500/5 to-transparent",
      borderColor: "border-sky-100/50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  };

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-6xl font-bold mb-6 text-foreground"
          >
            {t("roomie.features.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("roomie.features.subtitle")}
          </motion.p>
        </div>

        <motion.div 
          className="flex flex-col items-center gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.key}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.015, 
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                transition: { duration: 0.2 }
              }}
              className={`
                relative w-full group
                rounded-full border shadow-sm
                bg-white/40 backdrop-blur-md
                ${feature.borderColor}
                px-8 md:px-12 py-10 md:py-12
                flex flex-col md:flex-row items-center gap-8 text-center md:text-left
                transition-all duration-300
                ${feature.large ? 'max-w-4xl' : 'max-w-3xl'}
              `}
            >
              {/* Inner Gradient for hover effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-r ${feature.color} -z-10`} />

              {/* Icon Container */}
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h3 className={`font-bold mb-3 text-foreground tracking-tight ${feature.large ? 'text-2xl' : 'text-xl'}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>

              {/* Animated reveal line */}
              <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-1/3 transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
