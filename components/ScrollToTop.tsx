"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCookieBanner } from "@/lib/CookieBannerContext";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { isCookieBannerVisible } = useCookieBanner();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Only show on Blog Article pages (e.g. /blog/some-slug)
  const isBlogArticle = pathname.startsWith("/blog/") && pathname.length > "/blog/".length;

  if (!isBlogArticle) {
    return null;
  }

  // Hide button on Contact page (redundant check given the blog article check, but keeping for safety if logic changes)
  if (pathname === "/contact") {
    return null;
  }

  return (
    <>
      {isVisible && (
        <>
          {/* Mobile version - left bottom */}
          <button
            onClick={scrollToTop}
            data-testid="button-scroll-to-top-mobile"
            className="md:hidden fixed left-4 bottom-8 z-40 p-2 rounded-full transition-all duration-300 shadow-lg"
            style={{ backgroundColor: "#0752A0" }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </button>

          {/* Desktop version - MOVED TO LEFT to swap with AskAIWidget */}
          {!isCookieBannerVisible && (
            <button
              onClick={scrollToTop}
              data-testid="button-scroll-to-top-desktop"
              className="hidden md:flex fixed left-8 bottom-8 z-40 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg border border-white/20"
              style={{ backgroundColor: "#0752A0" }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-6 h-6 text-white" />
            </button>
          )}
        </>
      )}
    </>
  );
}
