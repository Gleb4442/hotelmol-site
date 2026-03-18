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
        <div className={`pointer-events-auto flex items-center justify-center px-4 xl:px-6 h-[72px] ${cloudStyle} hide-on-menu-open`}>
          <Link href="/" className="flex items-center h-full" data-testid="link-home">
            <img src="/assets/hotelmol-logo-vector.svg" alt="HotelMol" className="h-[130px] md:h-[150px] mt-1 object-contain" />
          </Link>
        </div>

        {/* 2. Center Cloud: Navigation (Desktop Only) */}
        <div className={`hidden md:flex pointer-events-auto items-center justify-center px-2 lg:px-4 xl:px-[18px] h-[72px] ${cloudStyle}`}>
          <NavPill navigation={navigation} pathname={pathname} />
        </div>

        {/* 3. Right Cloud: Actions */}
        <div className={`pointer-events-auto flex items-center gap-2 xl:gap-3 px-3 xl:px-5 h-[72px] ${cloudStyle} hide-on-menu-open`}>
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
      <div className="mobile-header-surface md:hidden pointer-events-auto fixed top-0 left-0 right-0 h-[60px] flex items-center justify-between px-4 z-[60] overflow-visible">

        {/* Mobile Left: Logo */}
        <Link href="/" className="flex items-center h-full relative w-[160px]" data-testid="link-home-mobile">
          <img src="/assets/hotelmol-logo-vector.svg" alt="HotelMol" className="h-[120px] object-contain absolute top-[-30px] left-0" />
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[100] flex flex-col items-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[calc(100%-48px)] max-w-md bg-[#F7F5F1] rounded-[32px] mt-24 p-8 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-2 text-slate-900">
                  <div className="w-5 h-5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <span className="font-serif font-bold text-lg">Hotelmol</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-6 mb-16">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-serif text-[32px] font-bold text-slate-800 hover:text-[#0752A0] transition-colors leading-tight"
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                  href="https://cal.com/gleb.gosha/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-serif text-[32px] font-bold text-slate-800 hover:text-[#0752A0] transition-colors leading-tight"
                >
                  {t("button.talkToHuman")}
                </a>
              </nav>

              {/* Modal Footer */}
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#0752A0] mb-4">
                    {t("nav.connect")}
                  </h4>
                  <div className="space-y-2">
                    <a href="#" className="block text-[#111111] font-serif text-lg">{t("nav.social.linkedin")}</a>
                    <a href="#" className="block text-[#111111] font-serif text-lg">{t("nav.social.twitter")}</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#0752A0] mb-4">
                    {t("nav.locations")}
                  </h4>
                  <div className="space-y-2">
                    <span className="block text-[#111111] font-serif text-lg">{t("nav.location.newyork")}</span>
                    <span className="block text-[#111111] font-serif text-lg">{t("nav.location.london")}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Book Demo Button below Modal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1 }}
              className="mt-8"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDemoClick?.();
                }}
                className="flex items-center gap-3 bg-[#A3A26F] text-[#424128] font-bold px-8 py-4 rounded-full shadow-lg active:scale-95 transition-all text-xs uppercase tracking-widest"
              >
                <div className="w-2 h-2 rounded-full bg-[#111111]" />
                {t("button.requestDemo")}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
