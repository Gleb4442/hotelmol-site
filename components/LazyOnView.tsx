"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface LazyOnViewProps {
  children: ReactNode;
  className?: string;
  minHeight?: number;
  rootMargin?: string;
}

export default function LazyOnView({
  children,
  className,
  minHeight = 320,
  rootMargin = "700px 0px",
}: LazyOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const wrapperStyle: CSSProperties = {
    contentVisibility: "auto",
    containIntrinsicSize: `${minHeight}px`,
    ...(shouldRender ? {} : { minHeight }),
  };

  useEffect(() => {
    if (shouldRender || !ref.current) return;
    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldRender(true);
        observer.disconnect();
      }
    }, { rootMargin, threshold: 0.01 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={ref} className={className} style={wrapperStyle}>
      {shouldRender ? children : null}
    </div>
  );
}
