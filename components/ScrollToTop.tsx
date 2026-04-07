"use client";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCookieBanner } from "@/lib/CookieBannerContext";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { isCookieBannerVisible } = useCookieBanner();

  useEffect(() => {
    const toggleVisibility = () => {
      const shouldBeVisible = window.scrollY > 300;
      setIsVisible(shouldBeVisible);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isContact = pathname === "/contact";
  const isBlogList = pathname === "/blog";

  if (isContact || isBlogList) {
    return null;
  }

  return (
    <>
      {isVisible && !isCookieBannerVisible && (
        <button
          onClick={scrollToTop}
          data-testid="button-scroll-to-top-desktop"
          className="fixed right-8 bottom-8 z-40 flex items-center justify-center w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-sm text-primary hover:bg-background hover:shadow-md hover:-translate-y-1 active:scale-95 transition-all duration-300 hidden md:flex"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
