"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

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
    { name: t("nav.solutions"), href: "/solutions" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const cloudStyle = "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(7,82,160,0.4)] border border-white/20 rounded-full transition-all duration-300";

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
          <nav className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-2 lg:px-3 xl:px-5 py-2.5 rounded-full text-sm xl:text-base font-medium transition-all duration-300 flex items-center gap-2
                    ${isActive
                      ? "text-white"
                      : "text-slate-600 hover:text-[#0752A0] hover:bg-slate-100/50"
                    }
                  `}
                  data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill-desktop"
                      className="absolute inset-0 bg-[#0752A0] shadow-sm rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
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

          <Button
            size="default"
            asChild
            className="hidden md:inline-flex rounded-full bg-[#0752A0] hover:bg-[#064080] shadow-md hover:shadow-lg transition-all"
            data-testid="button-try-demo"
          >
            <a href="https://demo.hotelmol.com" target="_blank" rel="noopener noreferrer">
              {t("button.tryDemo")}
            </a>
          </Button>

        </div>
      </div>

      {/* --- MOBILE VIEW (Fixed Top Bar) --- */}
      <div className="md:hidden pointer-events-auto fixed top-0 left-0 right-0 h-[60px] bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm flex items-center justify-between px-4 z-[60] overflow-visible">

        {/* Mobile Left: Logo */}
        <Link href="/" className="flex items-center h-full relative w-[160px]" data-testid="link-home-mobile">
          <img src="/assets/hotelmol-logo-vector.svg" alt="HotelMol" className="h-[120px] object-contain absolute top-0 left-0" />
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
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm md:hidden"
            />

            {/* Menu Content (Bottom Sheet Style) */}
            <div className="fixed bottom-24 left-0 right-0 z-[101] flex flex-col items-end px-4 gap-3 md:hidden pointer-events-none">
              {/* Close Button (Optional, maybe not needed if backdrop closes, but good for accessibility/visuals) 
                    The user said "exactly like contact button", contact button turns into a close button.
                    The hamburger is at the top. Moving the close button to the bottom might be confusing or helpful.
                    For now, I'll rely on backdrop click to close, similar to standard bottom sheets, OR add a specific close pill at the bottom?
                    The contact menu has a trigger button in the same place that toggles.
                    The hamburger is far away.
                    Let's just show the links.
                */}

              <div className="flex flex-col gap-3 items-end w-full pointer-events-auto">
                {navigation.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      transition={{ delay: 0.05 * (navigation.length - 1 - idx) }} // Stagger from bottom? Or top? Let's stagger appearance.
                      className="w-full flex justify-end"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 pr-6 pl-6 py-3 rounded-full shadow-lg border font-bold text-sm transition-transform active:scale-95
                                    ${isActive
                            ? "bg-[#0752A0] text-white border-[#0752A0]/20"
                            : "bg-white text-[#0752A0] border-white/20"
                          }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-white shadow-lg border border-black/5 flex items-center justify-center mt-2 active:scale-95 transition-transform"
              >
                <X className="w-6 h-6 text-slate-400" />
              </motion.button>
            </div>

          </>
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
