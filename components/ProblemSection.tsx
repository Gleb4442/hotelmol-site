"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDollarSign, Users, UserRoundX } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

import PremiumBackground from './PremiumBackground';

export default function ProblemSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const problems = [
    {
      icon: CircleDollarSign,
      text: t("home.problem.point1"),
    },
    {
      icon: Users,
      text: t("home.problem.point2"),
    },
    {
      icon: UserRoundX,
      text: t("home.problem.point3"),
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.2 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % problems.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [problems.length, isInView]);

  return (
    <PremiumBackground className="py-24 overflow-hidden">

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-[45px] font-serif font-bold mb-6">
              {t("home.problem.title")}
            </h2>
          </motion.div>
        </div>

        <div className="relative h-[260px] sm:h-[300px] flex items-center justify-center max-w-5xl mx-auto mt-8 sm:mt-12 mb-14 sm:mb-20">
          <div className="relative flex items-center justify-center w-full">
            {problems.map((problem, index) => {
              // Calculate relative position (-1, 0, 1)
              let position = index - activeIndex;
              if (position < -1) position += problems.length;
              if (position > 1) position -= problems.length;

              const isActive = position === 0;
              const isLeft = position === -1;
              const isRight = position === 1;

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    x: position * (isMobile ? 112 : 200),
                    scale: isActive ? (isMobile ? 1 : 1.15) : (isMobile ? 0.82 : 0.85),
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  style={{ zIndex: isActive ? 20 : 10 }}
                  className={`absolute flex aspect-square w-[74vw] max-w-[256px] flex-col items-center justify-center rounded-[1.75rem] border border-black/5 p-6 text-center shadow-2xl transition-colors duration-500 sm:aspect-auto sm:w-full sm:max-w-[340px] sm:p-10 sm:rounded-[2.5rem] ${
                    isActive ? "bg-red-500 text-white" : "bg-white text-gray-800"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500 sm:mb-6 sm:h-16 sm:w-16 ${isActive ? "bg-white/20" : "bg-red-50"}`}>
                    <problem.icon className={`h-7 w-7 sm:h-8 sm:w-8 ${isActive ? "text-white" : "text-red-500"}`} />
                  </div>
                  <p className="text-[18px] font-serif font-bold leading-tight sm:text-xl lg:text-2xl">
                    {problem.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {problems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="h-2 w-10 rounded-full"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={`block h-full w-full rounded-full transition-[transform,background-color] duration-300 ${
                  activeIndex === index ? "scale-x-100 bg-red-500" : "scale-x-20 bg-slate-200"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

    </PremiumBackground>
  );
}
