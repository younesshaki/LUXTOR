"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      stopInertiaOnNavigate: true,
      easing: (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
    });

    lenisRef.current = lenis;
    lenis.resize();

    return () => {
      lenis.stop();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    if (!lenis) {
      window.scrollTo(0, 0);
      return;
    }

    lenis.stop();

    const frameId = requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      lenis.resize();
      lenis.start();
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  return <>{children}</>;
}
