"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe, Menu } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import type { Language } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X } from "lucide-react";

const NavPill = ({ navigation, pathname }: { navigation: Array<{ name: string; href: string; badge?: string }>; pathname: string }) => {
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current) return;
      const activeLink = navRef.current.querySelector<HTMLAnchorElement>(`a[href="${pathname}"]`);
      if (activeLink) {
        setActiveRect({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1
        });
      } else {
        setActiveRect(prev => ({ ...prev, opacity: 0 }));
      }
    };

    // Initial update
    updatePill();

    // Update on resize
    window.addEventListener('resize', updatePill);

    // Tiny timeout to catch layout shifts if any (optional but safe)
    const timeout = setTimeout(updatePill, 50);

    return () => {
      window.removeEventListener('resize', updatePill);
      clearTimeout(timeout);
    };
  }, [pathname, navigation]);

  return (
    <nav className="relative flex items-center gap-1" ref={navRef}>
      <motion.span
        className="absolute top-0 bottom-0 bg-[#0752A0] shadow-sm rounded-full -z-10"
        initial={false}
        animate={{
          left: activeRect.left,
          width: activeRect.width,
          opacity: activeRect.opacity
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relative px-2 lg:px-2.5 xl:px-4 py-2 rounded-full text-sm xl:text-[15px] font-medium transition-all duration-300 flex items-center gap-2
              ${isActive
                ? "text-white"
                : "text-slate-600 hover:text-[#0752A0] hover:bg-slate-100/50"
              }
            `}
            data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {item.name}
              {item.badge && (
                <span className={`inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide rounded-full ml-1
                      ${isActive
                    ? "bg-white text-[#0752A0]"
                    : "bg-[#0752A0] text-white animate-gradient bg-gradient-to-r from-[#0752A0] via-blue-500 to-[#0752A0] bg-[length:200%_100%]"
                  }
                    `}>
                  {item.badge}
                </span>
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

interface HeaderProps {
  onDemoClick?: () => void;
}

export default function Header({ onDemoClick }: HeaderProps = {}) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigation: Array<{ name: string; href: string; badge?: string }> = [
    { name: t("nav.roomie"), href: "/roomie" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];
  const mobileMenuLinks = [
    ...navigation.map((item) => ({
      ...item,
      external: false,
    })),
    {
      name: t("button.talkToHuman"),
      href: "https://cal.com/gleb.gosha/30min",
      external: true,
    },
  ];

  const cloudStyle = "bg-[#F7F5F1]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(7,82,160,0.4)] border border-white/20 rounded-full transition-all duration-300";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none md:max-w-[1440px] md:mx-auto md:mt-4 md:px-6">

      {/* --- DESKTOP VIEW (Floating Clouds) --- */}
      <div className="hidden md:flex items-center justify-between">

        {/* 1. Left Cloud: Logo */}
        <div className={`pointer-events-auto flex items-center justify-center px-4 xl:px-6 h-[52px] ${cloudStyle} hide-on-menu-open`}>
          <Link href="/" className="flex items-center h-full" data-testid="link-home">
            <img src="/assets/hotelmol-logo-vector.svg" alt="HotelMol" className="h-[102px] mt-1 object-contain" />
          </Link>
        </div>

        {/* 2. Center Cloud: Navigation (Desktop Only) */}
        <div className={`hidden md:flex pointer-events-auto items-center justify-center px-2 lg:px-4 xl:px-[18px] h-[52px] ${cloudStyle}`}>
          <NavPill navigation={navigation} pathname={pathname} />
        </div>

        {/* 3. Right Cloud: Actions */}
        <div className={`pointer-events-auto flex items-center gap-2 xl:gap-3 px-3 xl:px-5 h-[52px] ${cloudStyle} hide-on-menu-open`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex rounded-full hover:bg-slate-100" data-testid="button-language">
                <Globe className="h-[22px] w-[22px] stroke-[1.5]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl">
              <DropdownMenuItem onClick={() => setLanguage("en" as Language)} className="rounded-xl" data-testid="option-en">
                English (EN) {language === "en" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ru" as Language)} className="rounded-xl" data-testid="option-ru">
                Русский (RU) {language === "ru" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ua" as Language)} className="rounded-xl" data-testid="option-ua">
                Українська (UA) {language === "ua" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("pl" as Language)} className="rounded-xl" data-testid="option-pl">
                Polski (PL) {language === "pl" && "✓"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="default"
            asChild
            className="hidden sm:inline-flex rounded-full border-slate-200 hover:border-[#0752A0] hover:text-[#0752A0]"
            data-testid="button-pricing"
          >
            <a href="https://pricing.hotelmol.com/#yearly" target="_blank" rel="noopener noreferrer">
              {t("button.pricing")}
            </a>
          </Button>


          <div className="relative hidden lg:inline-flex">
            <Button
              size="default"
              variant="ghost"
              className="relative rounded-full px-4 backdrop-blur-md bg-blue-500/10 border border-blue-400/30 text-[#0752A0] hover:bg-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all overflow-hidden group"
              asChild
              data-testid="button-app-tour-header"
            >
              <a href="https://tour.hotelmol.com" target="_blank" rel="noopener noreferrer">
                App tour
              </a>
            </Button>
            <span className="absolute -top-2 -right-2 z-10 bg-blue-500 text-white text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]">
              new
            </span>
          </div>

        </div>
      </div>

      {/* --- MOBILE VIEW (Fixed Top Bar) --- */}
      <div className="mobile-header-surface md:hidden pointer-events-auto fixed top-0 left-0 right-0 h-[52px] flex items-center justify-between px-4 z-[60] overflow-visible">

        {/* Mobile Left: Logo */}
        <Link href="/" className="flex items-center h-full relative w-[140px]" data-testid="link-home-mobile">
          <img src="/assets/hotelmol-logo-vector.svg" alt="HotelMol" className="h-[102px] object-contain absolute top-[-25px] left-0" />
        </Link>

        {/* Mobile Center title/placeholder if needed (optional) */}

        {/* Mobile Right: Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-slate-100 -mr-2"
          onClick={() => setIsMobileMenuOpen(true)}
          data-testid="button-mobile-menu"
        >
          <Menu className="!h-[24px] !w-[24px] stroke-[2] text-[#0752A0]" />
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[100] ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ease-out ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
        />

        <div className="absolute inset-x-0 bottom-24 px-4 flex justify-end">
          <div
            className={`mobile-menu-surface w-full max-w-[320px] rounded-[30px] border border-black/5 bg-[#F7F5F1] shadow-[0_12px_36px_rgba(15,23,42,0.14)] transition-[opacity,transform] duration-200 ease-out transform-gpu will-change-transform ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-slate-500 transition-colors hover:text-[#0752A0] active:scale-95"
                aria-label="Close mobile menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="px-3 pb-3">
              {mobileMenuLinks.map((item) => {
                const isActive = !item.external && pathname === item.href;
                const itemClasses = `flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors active:scale-[0.99] ${
                  isActive
                    ? "bg-[#0752A0] text-white"
                    : item.external
                      ? "bg-[#0752A0]/8 text-[#0752A0]"
                      : "text-slate-700 hover:bg-white"
                }`;

                if (item.external) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={itemClasses}
                    >
                      <span>{item.name}</span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={itemClasses}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}} />
    </header >
  );
}
