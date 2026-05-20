"use client";
import { MessageSquare, Brain, Sparkles, TrendingUp, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { useEffect, useState, useRef } from "react";

import PremiumBackground from "./PremiumBackground";

export default function HowRoomieWorks() {
  const { t } = useTranslation();
  const [animState, setAnimState] = useState({ pos: 0, jump: false });

  const steps = [
    {
      icon: MessageSquare,
      title: t("home.howWorks.step1.title"),
      description: t("home.howWorks.step1.description"),
    },
    {
      icon: Brain,
      title: t("home.howWorks.step2.title"),
      description: t("home.howWorks.step2.description"),
    },
    {
      icon: Sparkles,
      title: t("home.howWorks.step3.title"),
      description: t("home.howWorks.step3.description"),
    },
    {
      icon: TrendingUp,
      title: t("home.howWorks.step4.title"),
      description: t("home.howWorks.step4.description"),
    },
    {
      icon: CheckCircle,
      title: t("home.howWorks.step5.title"),
      description: t("home.howWorks.step5.description"),
    },
  ];

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [progressLineWidth, setProgressLineWidth] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsSectionVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!progressLineRef.current) return;

    const updateWidth = () => {
      setProgressLineWidth(progressLineRef.current?.clientWidth ?? 0);
    };
    const observer = new ResizeObserver(updateWidth);

    updateWidth();
    observer.observe(progressLineRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleDesktop = () => {
      if (!isSectionVisible) return;
      const interval = setInterval(() => {
        setAnimState((prev) => {
          if (prev.pos === 4) {
            return { pos: 0, jump: true };
          }
          return { pos: prev.pos + 1, jump: false };
        });
      }, 2000);
      return () => clearInterval(interval);
    };

    const handleMobile = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setAnimState((prev) => ({ ...prev, pos: index, jump: false }));
            }
          }
        });
      }, { threshold: 1.0, rootMargin: "-15% 0px -45% 0px" });

      stepRefs.current.forEach((step) => {
        if (step) observer.observe(step);
      });

      return () => observer.disconnect();
    };

    let cleanup: (() => void) | undefined;

    const init = () => {
      if (cleanup) cleanup();
      if (mediaQuery.matches) {
        cleanup = handleDesktop();
      } else {
        cleanup = handleMobile();
      }
    };

    init();
    mediaQuery.addEventListener('change', init);

    return () => {
      if (cleanup) cleanup();
      mediaQuery.removeEventListener('change', init);
    };
  }, [isSectionVisible]);

  return (
    <PremiumBackground className="py-12 md:py-20 lg:py-28">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div className="text-center mb-20">

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[45px] font-bold mb-5 tracking-tight">
            {t("home.howWorks.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("home.howWorks.subtitle")}
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Progress Line */}
          <div ref={progressLineRef} className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 z-20">
            <div className="h-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {/* Animated Ball */}
            <div
              key="process-ball"
              className="absolute left-0 top-1/2 h-5 w-5 bg-primary rounded-full shadow-[0_0_20px_rgba(7,82,160,1)] z-40"
              style={{
                boxShadow: '0 0 15px rgba(7, 82, 160, 0.8), 0 0 30px rgba(7, 82, 160, 0.4)',
                transform: `translate3d(${progressLineWidth ? (progressLineWidth * animState.pos) / 4 - 10 : -10}px, -50%, 0)`,
                transition: animState.jump ? "none" : "transform 500ms ease-in-out",
              }}
            >
              <div className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = animState.pos === index;
              return (
                <div
                  key={index}
                  style={{
                    opacity: isActive ? 1 : 0.7,
                    transform: `scale(${isActive ? 1.05 : 1})`,
                  }}
                  className="relative flex flex-col items-center text-center group transition-[transform,opacity] duration-500 ease-out"
                  ref={(el) => { stepRefs.current[index] = el; }}
                >
                  <div className={`relative z-10 mb-4 lg:mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl transition-all duration-700 ${isActive ? 'shadow-[0_20px_50px_rgba(7,82,160,0.4)] ring-4 ring-primary/20' : 'group-hover:shadow-2xl'}`}>
                    <Icon className={`h-9 w-9 transition-all duration-700 ${isActive ? 'scale-110' : ''}`} />
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl scale-110 animate-in fade-in duration-300" />
                    )}
                  </div>
                  <div className="space-y-4 mt-2 lg:mt-8 px-4">
                    <div
                      className={`text-sm font-bold transition-colors duration-300 ${isActive ? "text-[#0752A0]" : "text-[#0752A0]/60"}`}
                    >
                      {t("home.howWorks.step")} {index + 1}
                    </div>
                    <h3 className="font-semibold text-base lg:text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed transition-opacity duration-500">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PremiumBackground>
  );
}
