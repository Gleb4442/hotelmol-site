import { ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/TranslationContext";

export default function ProblemSolutionSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1, rootMargin: "120px 0px" });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const blocks = [
    {
      problem: t("about.problemSolution.1.problem"),
      solution: t("about.problemSolution.1.solution"),
    },
    {
      problem: t("about.problemSolution.2.problem"),
      solution: t("about.problemSolution.2.solution"),
    },
    {
      problem: t("about.problemSolution.3.problem"),
      solution: t("about.problemSolution.3.solution"),
    },
  ];

  return (
    <section ref={sectionRef} className={`py-24 bg-gradient-to-b from-background via-muted/20 to-background ${isVisible ? "" : "animation-paused"}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Headers */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12 px-8 lg:px-12">
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-destructive">
                {t("about.problemSolution.problem")}
              </h2>
            </div>
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-primary">
                {t("about.problemSolution.solution")}
              </h2>
            </div>
          </div>

          <div className="space-y-12">
            {blocks.map((block, index) => (
              <div 
                key={index} 
                className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-6"
                style={{
                  animation: `fadeInUp 0.8s ease-out forwards`,
                  animationDelay: `${index * 200}ms`,
                  opacity: 0,
                }}
              >
                {/* Problem Block */}
                <div
                  className="flex-1 w-full px-4 lg:px-0"
                  style={{
                    animation: `slideInLeft 0.8s ease-out forwards`,
                    animationDelay: `${index * 200 + 100}ms`,
                    opacity: 0,
                  }}
                >
                  <div className="h-full p-5 lg:p-10 rounded-xl bg-gradient-to-br from-destructive/5 to-destructive/10 border-2 border-destructive/20 hover:border-destructive/40 transition-all duration-300 hover:shadow-lg hover:shadow-destructive/10 flex flex-col">
                    <div className="flex items-center justify-center mb-4 lg:mb-6">
                      <div className="p-2.5 lg:p-3 rounded-lg bg-destructive/15">
                        <AlertCircle className="w-6 h-6 lg:w-8 lg:h-8 text-destructive flex-shrink-0" />
                      </div>
                    </div>
                    <p className="text-sm lg:text-lg text-muted-foreground leading-relaxed text-center flex-1 flex items-center justify-center">
                      {block.problem}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex justify-center items-center">
                  <div 
                    style={{
                      animation: `arrowPulse 2s ease-in-out infinite`,
                      animationDelay: `${index * 200 + 400}ms`,
                    }}
                  >
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Solution Block */}
                <div
                  className="flex-1 w-full px-4 lg:px-0"
                  style={{
                    animation: `slideInRight 0.8s ease-out forwards`,
                    animationDelay: `${index * 200 + 200}ms`,
                    opacity: 0,
                  }}
                >
                  <div className="h-full p-5 lg:p-10 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
                    <div className="flex items-center justify-center gap-3 mb-4 lg:mb-6">
                      <div className="p-2.5 lg:p-3 rounded-lg bg-primary/15">
                        <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-primary flex-shrink-0" />
                      </div>
                      <h3 className="font-semibold text-base lg:text-lg text-foreground">Roomie</h3>
                    </div>
                    <p className="text-sm lg:text-lg text-muted-foreground leading-relaxed text-center flex-1 flex items-center justify-center">
                      {block.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes arrowPulse {
          0%, 100% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(8px);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
}
