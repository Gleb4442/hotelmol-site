import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/TranslationContext";

export default function PresentationSection() {
  const { t } = useTranslation();
  const blockRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!blockRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1, rootMargin: "120px 0px" });

    observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div
            ref={blockRef}
            className={`px-8 py-4 rounded-2xl blue-shimmer-block ${isVisible ? "" : "animation-paused"}`}
          >
            <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              {t("presentation.title")}
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}
