"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Onboarding = dynamic(() => import("@/components/Onboarding"), {
  ssr: false,
});

export default function OnboardingGate() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    try {
      setShouldShow(!localStorage.getItem("onboarding_completed"));
    } catch {
      setShouldShow(false);
    }
  }, []);

  return shouldShow ? <Onboarding /> : null;
}
