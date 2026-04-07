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
      className="fixed bottom-4 left-4 right-4 md:bottom-6 md:right-8 md:left-auto z-[100] md:max-w-md animate-in fade-in slide-in-from-bottom-5 duration-700"
    >
      <Card className="p-5 md:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-white/20 bg-white/70 backdrop-blur-2xl rounded-[32px] md:rounded-[40px] relative overflow-hidden group">
        {/* Subtle decorative glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />

        <div className="relative z-10">
          <div className="mb-3 md:mb-4">
            <h3 className="font-serif text-lg md:text-xl font-bold tracking-tight text-slate-900">
              {t("cookie.banner.title")}
            </h3>
          </div>

          <p className="text-sm md:text-base text-slate-600/90 leading-relaxed mb-6 font-medium">
            {t("cookie.banner.description")}
          </p>

          {showCustomize && (
            <div className="space-y-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
              {/* Necessary — always on */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                <Checkbox
                  id="necessary"
                  checked={true}
                  disabled
                  className="mt-1 rounded-full border-slate-300 data-[state=checked]:bg-slate-400 data-[state=checked]:border-slate-400"
                />
                <div className="flex-1">
                  <label htmlFor="necessary" className="text-sm font-bold text-slate-800">
                    {t("cookie.banner.essential")}
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                    {t("cookie.banner.essentialDesc")}
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/50 border border-slate-100">
                <Checkbox
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, analytics: checked as boolean })
                  }
                  className="mt-1 rounded-full border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="flex-1">
                  <label htmlFor="analytics" className="text-sm font-bold text-slate-800">
                    {t("cookie.banner.analytics")}
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                    {t("cookie.banner.analyticsDesc")}
                  </p>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/50 border border-slate-100">
                <Checkbox
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, marketing: checked as boolean })
                  }
                  className="mt-1 rounded-full border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="flex-1">
                  <label htmlFor="marketing" className="text-sm font-bold text-slate-800">
                    {t("cookie.banner.marketing")}
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                    {t("cookie.banner.marketingDesc")}
                  </p>
                </div>
              </div>

              {/* Functional */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/50 border border-slate-100">
                <Checkbox
                  id="functional"
                  checked={preferences.functional}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, functional: checked as boolean })
                  }
                  className="mt-1 rounded-full border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="flex-1">
                  <label htmlFor="functional" className="text-sm font-bold text-slate-800">
                    {t("cookie.banner.functional")}
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                    {t("cookie.banner.functionalDesc")}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {showCustomize ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setShowCustomize(false)}
                  className="rounded-full h-12 px-6 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
                >
                  {t("common.back") || "\u2190 Back"}
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="flex-1 rounded-full h-12 px-8 text-sm font-extrabold bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10 transition-all active:scale-[0.98]"
                >
                  {t("cookie.banner.save")}
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <Button
                  onClick={handleAcceptAll}
                  className="w-full rounded-full h-14 px-10 text-base font-extrabold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all active:scale-[0.98] border-2 border-white/20"
                >
                  {t("cookie.banner.acceptAll")}
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowCustomize(true)}
                    className="flex-1 rounded-full h-10 px-5 text-xs font-bold border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 transition-all"
                  >
                    {t("cookie.banner.customize")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRejectNonEssential}
                    className="flex-1 rounded-full h-10 px-5 text-xs font-bold border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 transition-all"
                  >
                    {t("cookie.banner.rejectAll")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
