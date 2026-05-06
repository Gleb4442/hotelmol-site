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
      className="fixed bottom-3 left-1/2 z-[100] w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-500 sm:bottom-4 sm:w-[calc(100%-2rem)]"
    >
      <Card className="relative overflow-hidden rounded-[28px] border-white/60 bg-white/95 px-3 py-2.5 shadow-[0_14px_36px_rgba(15,23,42,0.12)] sm:px-4">
        {/* Subtle decorative glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(260px 120px at 100% 0%, rgba(7,82,160,0.06), transparent 70%)",
          }}
        />

        <div className={`relative z-10 ${showCustomize ? "" : "md:flex md:items-center md:gap-5"}`}>
          <div className={`flex min-w-0 flex-col gap-0.5 ${showCustomize ? "mb-2" : "mb-2 md:mb-0 md:flex-1"}`}>
            <h3 className="font-serif text-sm font-bold tracking-tight text-slate-900 md:text-base">
              {t("cookie.banner.title")}
            </h3>
            <p className="text-[11px] font-medium leading-snug text-slate-600/90 md:text-xs">
              {t("cookie.banner.description")}
            </p>
          </div>

          {showCustomize && (
            <div className="mb-2 grid gap-2 animate-in fade-in slide-in-from-top-2 duration-300 sm:grid-cols-2 lg:grid-cols-4">
              {/* Necessary — always on */}
              <div className="flex items-start gap-2 rounded-2xl border border-slate-100/70 bg-slate-50/70 p-2">
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
              <div className="flex items-start gap-2 rounded-2xl border border-slate-100 bg-white/60 p-2">
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
              <div className="flex items-start gap-2 rounded-2xl border border-slate-100 bg-white/60 p-2">
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
              <div className="flex items-start gap-2 rounded-2xl border border-slate-100 bg-white/60 p-2">
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
                  className="h-8 rounded-full px-4 text-[11px] font-bold text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-800"
                >
                  {t("common.back") || "\u2190 Back"}
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="h-8 rounded-full bg-slate-900 px-5 text-[11px] font-extrabold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-[0.98] md:min-w-[150px]"
                >
                  {t("cookie.banner.save")}
                </Button>
              </>
            ) : (
              <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomize(true)}
                  className="h-8 rounded-full border-slate-200 px-4 text-[11px] font-bold text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                >
                  {t("cookie.banner.customize")}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRejectNonEssential}
                  className="h-8 rounded-full border-slate-200 px-4 text-[11px] font-bold text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                >
                  {t("cookie.banner.rejectAll")}
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="h-8 rounded-full border border-white/20 bg-primary px-5 text-[11px] font-extrabold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] md:min-w-[140px]"
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
