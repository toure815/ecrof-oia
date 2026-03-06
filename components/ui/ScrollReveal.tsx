"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the animation starts (applied as transition-delay) */
  delay?: number;
  /** Which animation class to use */
  animation?: "fade-in" | "fade-in-left" | "fade-in-scale";
  /** HTML tag to render */
  as?: "div" | "section" | "span";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  animation = "fade-in",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <Tag ref={ref} className={`${animation} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
