"use client";
import { motion } from "framer-motion";
import { CircleDollarSign, Users, UserRoundX } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function ProblemSection() {
  const { t } = useTranslation();

  const problems = [
    {
      icon: CircleDollarSign,
      text: t("home.problem.point1"),
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      icon: Users,
      text: t("home.problem.point2"),
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: UserRoundX,
      text: t("home.problem.point3"),
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-destructive/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl font-serif font-semibold mb-6">
              {t("home.problem.title")}
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-7 rounded-2xl bg-secondary/50 border border-border/50 backdrop-blur-sm hover:border-destructive/30 hover:bg-secondary/80 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${problem.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <problem.icon className={`w-7 h-7 ${problem.color}`} />
              </div>
              <p className="text-lg lg:text-xl font-serif leading-tight">
                {problem.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
