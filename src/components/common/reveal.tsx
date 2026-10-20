"use client";

import * as React from "react";
import { cn } from "cn";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);


  /* eslint-disable react-hooks/set-state-in-effect -- fetch on mount */
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    } else {
      setIsVisible(true);
    }
  }, []); 
/* eslint-enable react-hooks/set-state-in-effect */
  

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 motion-reduce:translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
