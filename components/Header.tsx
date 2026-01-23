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

  const { data: blogEnabledData } = useQuery<{ key: string; value: string | null }>({
    queryKey: ["/api/settings/blogEnabled"],
  });

  const blogEnabled = blogEnabledData?.value !== "false";

  const allNavigation: Array<{ name: string; href: string; badge?: string }> = [
    { name: t("nav.roomie"), href: "/roomie" },
    { name: t("nav.solutions"), href: "/solutions" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const navigation = allNavigation.filter(item =>
    item.href !== "/blog" || blogEnabled
  );

  const cloudStyle = "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(7,82,160,0.4)] border border-white/20 rounded-full transition-all duration-300";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full max-w-[1440px] mx-auto mt-2 md:mt-4 px-4 md:px-6 pointer-events-none">
      <div className="flex items-center justify-between">

        {/* 1. Left Cloud: Logo */}
        <div className={`pointer-events-auto flex items-center justify-center px-3 md:px-6 h-[56px] md:h-[72px] ${cloudStyle} hide-on-menu-open`}>
          <Link href="/" className="flex items-center h-full" data-testid="link-home">
            <img src="/assets/hotelmol-logo-vector.svg" alt="HotelMol" className="h-[130px] md:h-[150px] mt-1 object-contain" />
          </Link>
        </div>

        {/* 2. Center Cloud: Navigation (Desktop Only) */}
        <div className={`hidden md:flex pointer-events-auto items-center justify-center px-[18px] h-[72px] ${cloudStyle}`}>
          <nav className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 flex items-center gap-2
                    ${isActive
                      ? "text-white"
                      : "text-slate-600 hover:text-[#0752A0] hover:bg-slate-100/50"
                    }
                  `}
                  data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
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

        {/* 3. Right Cloud: Actions & Mobile Menu */}
        <div className={`pointer-events-auto flex items-center gap-3 px-3 md:px-5 h-[56px] md:h-[72px] ${cloudStyle} hide-on-menu-open`}>
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

          {/* Mobile Menu Button - integrated into the right cloud */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-slate-100"
            onClick={() => setIsMobileMenuOpen(true)}
            data-testid="button-mobile-menu"
          >
            <Menu className="!h-[28px] !w-[28px] stroke-[3] text-[#0752A0]" />
          </Button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden pointer-events-auto">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute top-[10px] bottom-[10px] left-[16px] right-[16px] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-[32px] border border-white/20 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="grid grid-cols-[56px_1fr_56px] items-center p-4 border-b border-white/10 min-h-[80px]">
                <div />
                <h2 className="text-2xl font-extrabold text-[#0752A0] uppercase tracking-[0.2em] font-serif text-center whitespace-nowrap">
                  {t("menu.title")}
                </h2>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full bg-black/5 hover:bg-black/10 transition-colors h-11 w-11"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-3 items-stretch px-6 py-6">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`w-full py-4 px-6 rounded-2xl text-center font-bold shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2 ${isActive ? "bg-[#0752A0] text-white ring-2 ring-white/50" : "bg-white text-[#0752A0] border border-slate-100"}`}
                      >
                        {item.name}
                        {item.badge && (
                          <span className="inline-block px-2 py-0.5 text-[10px] font-semibold text-[#0752A0] bg-slate-100 rounded-full ml-1">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="px-6 py-6 mt-auto">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Button variant="outline" className="w-full rounded-xl border-[#0752A0]/20 text-[#0752A0]" asChild>
                      <a href="https://pricing.hotelmol.com" target="_blank">{t("button.pricing")}</a>
                    </Button>
                    <Button className="w-full rounded-xl bg-[#0752A0]" asChild>
                      <a href="https://demo.hotelmol.com" target="_blank">{t("button.tryDemo")}</a>
                    </Button>
                  </div>

                  <p className="text-sm font-medium text-muted-foreground mb-4 text-center opacity-60">
                    {language === "en" ? "Select Language" : language === "ru" ? "Выберите язык" : language === "ua" ? "Оберіть мову" : "Wybierz język"}
                  </p>
                  <div className="grid grid-cols-4 gap-2 pb-6">
                    {(["en", "ru", "ua", "pl"] as const).map((lang) => (
                      <Button
                        key={lang}
                        variant={language === lang ? "default" : "ghost"}
                        size="sm"
                        onClick={() => {
                          setLanguage(lang);
                        }}
                        className={`w-full rounded-xl h-10 font-medium ${language === lang ? "bg-[#0752A0]" : "bg-slate-50"}`}
                      >
                        {lang.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
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
    </header>
  );
}
