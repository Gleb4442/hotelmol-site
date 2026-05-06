"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/lib/TranslationContext";
import { useCookieBanner } from "@/lib/CookieBannerContext";
import type { Consents } from "@/hooks/useCookieConsent";

export default function CookieBanner() {
  const { t } = useTranslation();
  const {
    isCookieBannerVisible,
    setCookieBannerVisible,
    hasConsented,
    submitConsent,
  } = useCookieBanner();
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<Consents>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });
  const dialogRef = useRef<HTMLDivElement>(null);

  // Show banner after onboarding, if no valid consent exists
  useEffect(() => {
    try {
      const onboardingCompleted = localStorage.getItem("onboarding_completed");
      if (!hasConsented && onboardingCompleted === "true") {
        setCookieBannerVisible(true);
      }
    } catch (e) {
      console.error("Local storage access denied", e);
    }
  }, [hasConsented, setCookieBannerVisible]);

  // Trap focus inside the dialog when visible
  useEffect(() => {
    if (!isCookieBannerVisible) return;
    const el = dialogRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCookieBannerVisible, showCustomize]);

  const handleAcceptAll = async () => {
    const allAccepted: Consents = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    await submitConsent("accepted", allAccepted);
    setCookieBannerVisible(false);
  };

  const handleRejectNonEssential = async () => {
    const onlyNecessary: Consents = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    await submitConsent("rejected", onlyNecessary);
    setCookieBannerVisible(false);
  };

  const handleSavePreferences = async () => {
    const allOptionalTrue =
      preferences.analytics && preferences.marketing && preferences.functional;
    const allOptionalFalse =
      !preferences.analytics && !preferences.marketing && !preferences.functional;

    const action = allOptionalTrue
      ? "accepted"
      : allOptionalFalse
        ? "rejected"
        : "partial";

    await submitConsent(action as "accepted" | "rejected" | "partial", preferences);
    setCookieBannerVisible(false);
  };

  if (!isCookieBannerVisible) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("cookie.banner.title") as string}
      className={`fixed bottom-4 left-1/2 z-[100] w-[calc(100%-1.5rem)] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-500 sm:bottom-5 sm:w-[calc(100%-2rem)] ${
        showCustomize ? "max-w-[960px]" : "max-w-[840px]"
      }`}
    >
      <Card className="group relative overflow-hidden rounded-[36px] border border-white/55 bg-white/75 px-4 py-3.5 shadow-[0_18px_46px_rgba(15,23,42,0.16)] backdrop-blur-2xl sm:px-5">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -right-12 -top-14 h-32 w-52 rounded-full bg-primary/10 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
        <div className="pointer-events-none absolute -left-16 bottom-[-70px] h-28 w-44 rounded-full bg-sky-200/25 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-75"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,255,255,0.58)), radial-gradient(260px 120px at 100% 0%, rgba(7,82,160,0.10), transparent 72%)",
          }}
        />

        <div className={`relative z-10 ${showCustomize ? "" : "md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-4"}`}>
          <div className={`min-w-0 ${showCustomize ? "mb-2.5" : "mb-2 md:mb-0"}`}>
            <div className="mb-0.5 flex items-center gap-2">
              <h3 className="font-serif text-sm font-bold tracking-tight text-slate-900 md:text-[15px]">
                {t("cookie.banner.title")}
              </h3>
              <span className="hidden h-1 w-1 rounded-full bg-primary/40 sm:block" />
            </div>
            <p className="text-xs font-medium leading-snug text-slate-600/90 sm:line-clamp-1">
              {t("cookie.banner.description")}
            </p>
          </div>

          {showCustomize && (
            <div className="mb-2.5 grid gap-2 animate-in fade-in slide-in-from-top-2 duration-300 sm:grid-cols-2 lg:grid-cols-4">
              {/* Necessary — always on */}
              <div className="flex items-start gap-2 rounded-[18px] border border-slate-100/70 bg-slate-50/70 p-2">
                <Checkbox
                  id="necessary"
                  checked={true}
                  disabled
                  className="mt-0.5 rounded-full border-slate-300 data-[state=checked]:border-slate-400 data-[state=checked]:bg-slate-400"
                />
                <div className="flex-1">
                  <label htmlFor="necessary" className="text-xs font-bold text-slate-800">
                    {t("cookie.banner.essential")}
                  </label>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                    {t("cookie.banner.essentialDesc")}
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start gap-2 rounded-[18px] border border-slate-100 bg-white/60 p-2">
                <Checkbox
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, analytics: checked as boolean })
                  }
                  className="mt-0.5 rounded-full border-primary/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <div className="flex-1">
                  <label htmlFor="analytics" className="text-xs font-bold text-slate-800">
                    {t("cookie.banner.analytics")}
                  </label>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                    {t("cookie.banner.analyticsDesc")}
                  </p>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-start gap-2 rounded-[18px] border border-slate-100 bg-white/60 p-2">
                <Checkbox
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, marketing: checked as boolean })
                  }
                  className="mt-0.5 rounded-full border-primary/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <div className="flex-1">
                  <label htmlFor="marketing" className="text-xs font-bold text-slate-800">
                    {t("cookie.banner.marketing")}
                  </label>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                    {t("cookie.banner.marketingDesc")}
                  </p>
                </div>
              </div>

              {/* Functional */}
              <div className="flex items-start gap-2 rounded-[18px] border border-slate-100 bg-white/60 p-2">
                <Checkbox
                  id="functional"
                  checked={preferences.functional}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, functional: checked as boolean })
                  }
                  className="mt-0.5 rounded-full border-primary/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <div className="flex-1">
                  <label htmlFor="functional" className="text-xs font-bold text-slate-800">
                    {t("cookie.banner.functional")}
                  </label>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                    {t("cookie.banner.functionalDesc")}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end">
            {showCustomize ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setShowCustomize(false)}
                  className="h-9 rounded-full px-4 text-xs font-bold text-slate-500 transition-all hover:bg-white/70 hover:text-slate-800"
                >
                  {t("common.back") || "\u2190 Back"}
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="h-9 rounded-full bg-slate-900 px-5 text-xs font-extrabold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-[0.98] md:min-w-[154px]"
                >
                  {t("cookie.banner.save")}
                </Button>
              </>
            ) : (
              <div className="grid w-full grid-cols-2 gap-2 md:w-auto md:grid-cols-none md:flex md:items-center">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomize(true)}
                  className="h-9 rounded-full border-white/60 bg-white/60 px-3 text-xs font-bold text-slate-500 transition-all hover:border-slate-300 hover:bg-white hover:text-slate-700 md:px-4"
                >
                  {t("cookie.banner.customize")}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRejectNonEssential}
                  className="h-9 rounded-full border-white/60 bg-white/60 px-3 text-xs font-bold text-slate-500 transition-all hover:border-slate-300 hover:bg-white hover:text-slate-700 md:px-4"
                >
                  {t("cookie.banner.rejectAll")}
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="col-span-2 h-9 rounded-full border border-white/30 bg-primary px-5 text-xs font-extrabold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary/90 active:scale-[0.98] md:col-span-1 md:min-w-[140px]"
                >
                  {t("cookie.banner.acceptAll")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
