"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDollarSign, Users, UserRoundX } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function ProblemSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

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
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % problems.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [problems.length]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-destructive/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-6xl font-serif font-bold mb-6">
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
                    x: position * 220, 
                    scale: isActive ? 1.2 : 0.85,
                    zIndex: isActive ? 20 : 10,
                    opacity: isActive ? 1 : 0.4,
                    background: isActive 
                      ? "linear-gradient(135deg, rgba(239, 68, 68, 0.98) 0%, rgba(220, 38, 38, 0.95) 100%)" 
                      : "rgba(255, 255, 255, 0.7)",
                    color: isActive ? "#FFFFFF" : "#475569",
                    boxShadow: isActive 
                      ? "0 30px 60px -12px rgba(220, 38, 38, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.25)" 
                      : "0 10px 25px -5px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.3)",
                  }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.32, 0.72, 0, 1] 
                  }}
                  className={`absolute w-full max-w-[340px] p-10 rounded-[2.5rem] backdrop-blur-xl border border-white/40 flex flex-col items-center text-center cursor-pointer overflow-hidden group`}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Subtle inner glow for active card */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                  )}
                  
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${isActive ? "bg-white/20 shadow-inner" : "bg-red-500/10 shadow-sm"}`}>
                    <problem.icon className={`w-8 h-8 transition-transform duration-500 group-hover:scale-110 ${isActive ? "text-white" : "text-red-500"}`} />
                  </div>
                  <p className="text-xl lg:text-2xl font-serif font-bold leading-tight relative z-10">
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

      <style jsx>{`
        @media (max-width: 640px) {
          .relative > div > div {
            max-width: 280px;
          }
          .absolute {
             transform: scale(0.8);
          }
        }
      `}</style>
    </section>
  );
}
