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

  // Logic:
  // 1. Hide on Contact page
  // 2. Hide on About page
  // 3. Hide on Blog List page (/blog), but SHOW on Blog Article (/blog/slug)
  const isContact = pathname === "/contact";
  const isAbout = pathname === "/about";
  const isBlogList = pathname === "/blog";
  const isBlogArticle = pathname.startsWith("/blog/") && pathname.length > "/blog/".length;

  // If it's a blog article, allow showing (unless specifically excluded logic overrides, but here we just want to ensure it SHOWS on article)
  // But wait, the request is: "return button on all pages EXCEPT contact, about, and blog list".
  // So: Show if (!Contact && !About && !BlogList).
  // Note: Blog Article passes !BlogList.
  // Also need to consider Home, Solutions, etc. -> They pass all checks.

  if (isContact || isAbout || isBlogList) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <>
          {/* Mobile version - left bottom - Miniature and laconic */}
          <button
            onClick={scrollToTop}
            data-testid="button-scroll-to-top-mobile"
            className="md:hidden fixed right-[18px] bottom-10 z-[45] p-2.5 rounded-full transition-all duration-300 shadow-xl border border-white/10 backdrop-blur-md bg-[#0752A0]/80 hover:bg-[#0752A0]/90 active:scale-90"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>

          {/* Desktop version - left bottom - Miniature and elegant */}
          {!isCookieBannerVisible && (
            <button
              onClick={scrollToTop}
              data-testid="button-scroll-to-top-desktop"
              className="hidden md:flex fixed right-10 bottom-10 z-[45] p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl border border-white/10 backdrop-blur-md bg-[#0752A0]/80 hover:bg-[#0752A0]/90"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          )}
        </>
      )}
    </>
  );
}
