"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  className?: string;
  minHeight?: number;
  rootMargin?: string;
}

export default function DeferredSection({
  children,
  className = "",
  minHeight = 520,
  rootMargin = "700px 0px",
}: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (hasRendered || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRendered(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasRendered, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={hasRendered ? undefined : { minHeight }}
    >
      {hasRendered ? children : null}
    </div>
  );
}
