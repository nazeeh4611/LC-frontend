"use client";

import { ElementType, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveal — wraps content in a subtle scroll-triggered fade/rise.
 * Pure IntersectionObserver, no animation library required.
 * Respects prefers-reduced-motion globally via styles/globals.css.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: 1 | 2 | 3 | 4;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "reveal",
        delay && `reveal-delay-${delay}`,
        visible && "is-visible",
        className
      )}
    >
      {children}
    </Tag>
  );
}
