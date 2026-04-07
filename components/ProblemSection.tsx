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

        <div className="relative h-[300px] flex items-center justify-center max-w-5xl mx-auto mt-12 mb-20">
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
                    x: position * 200,
                    scale: isActive ? 1.15 : 0.85,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  style={{ zIndex: isActive ? 20 : 10 }}
                  className={`absolute w-full max-w-[340px] p-10 rounded-[2.5rem] shadow-2xl border border-black/5 flex flex-col items-center text-center cursor-pointer transition-colors duration-500 ${
                    isActive ? "bg-red-500 text-white" : "bg-white text-gray-800"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${isActive ? "bg-white/20" : "bg-red-50"}`}>
                    <problem.icon className={`w-8 h-8 ${isActive ? "text-white" : "text-red-500"}`} />
                  </div>
                  <p className="text-xl lg:text-2xl font-serif font-bold leading-tight">
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
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-10 bg-red-500" : "w-2 bg-slate-200"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

    </PremiumBackground>
  );
}
