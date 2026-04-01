"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/lib/TranslationContext";
import { useCookieBanner } from "@/lib/CookieBannerContext";
import { apiRequest } from "@/lib/queryClient";

export default function CookieBanner() {
  const { t, language } = useTranslation();
  const { isCookieBannerVisible, setCookieBannerVisible } = useCookieBanner();
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem("cookieConsent");
        const onboardingCompleted = localStorage.getItem("onboarding_completed");
        
        // Show only if no consent AND (onboarding finished OR not on home page where onboarding exists)
        // Actually, simpler: show if no consent AND onboarding finished.
        if (!consent && onboardingCompleted === "true") {
          setCookieBannerVisible(true);
        }
      } catch (e) {
        console.error("Local storage access denied", e);
      }
    };

    checkConsent();
    
    // Listen for storage changes in case onboarding completes in another tab (unlikely but good practice)
    // and also we'll manually trigger it from Onboarding.tsx
  }, [setCookieBannerVisible]);

  const handleAcceptAll = async () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };

    await saveConsent(allAccepted);
  };

  const handleSavePreferences = async () => {
    await saveConsent(preferences);
  };

  const saveConsent = async (categories: typeof preferences) => {
    try {
      // Save to localStorage
      localStorage.setItem("cookieConsent", JSON.stringify(categories));

      // Send to backend
      const response = await fetch("/api/cookie-consents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          categories,
          path: window.location.pathname,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save consent");
      }

      setCookieBannerVisible(false);
    } catch (error) {
      console.error("Failed to save cookie consent:", error);
      // Still hide the banner even if backend fails
      setCookieBannerVisible(false);
    }
  };

  if (!isCookieBannerVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:right-8 md:left-auto z-[100] md:max-w-md animate-in fade-in slide-in-from-bottom-5 duration-700">
      <Card className="p-5 md:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-white/20 bg-white/70 backdrop-blur-2xl rounded-[32px] md:rounded-[40px] relative overflow-hidden group">
        {/* Subtle decorative glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
        
        <div className="relative z-10">
          <div className="mb-3 md:mb-4">
            <h3 className="font-serif text-lg md:text-xl font-bold tracking-tight text-slate-900">{t("cookie.banner.title")}</h3>
          </div>

          <p className="text-sm md:text-base text-slate-600/90 leading-relaxed mb-6 font-medium">
            {t("cookie.banner.description")}
          </p>

          {showCustomize && (
            <div className="space-y-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                <Checkbox
                  id="essential"
                  checked={true}
                  disabled
                  className="mt-1 rounded-full border-slate-300 data-[state=checked]:bg-slate-400 data-[state=checked]:border-slate-400"
                />
                <div className="flex-1">
                  <label htmlFor="essential" className="text-sm font-bold text-slate-800">
                    {t("cookie.banner.essential")}
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                    {t("cookie.banner.essentialDesc")}
                  </p>
                </div>
              </div>

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
                  {t("common.back") || "← Back"}
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="flex-1 rounded-full h-12 px-8 text-sm font-extrabold bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10 transition-all active:scale-[0.98]"
                >
                  {t("cookie.banner.save")}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowCustomize(true)}
                  className="rounded-full h-10 px-5 text-xs font-bold border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 transition-all"
                >
                  {t("cookie.banner.customize")}
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1 rounded-full h-14 px-10 text-base font-extrabold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all active:scale-[0.98] border-2 border-white/20"
                >
                  {t("cookie.banner.acceptAll")}
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
