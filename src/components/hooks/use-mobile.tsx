"use client";

import * as React from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(
      `(max-width: ${breakpoint - 1}px)`,
    );

    const update = () => setIsMobile(mediaQueryList.matches);
    update();

    if (typeof mediaQueryList.addEventListener === "function") {
      mediaQueryList.addEventListener("change", update);
      return () => mediaQueryList.removeEventListener("change", update);
    }

    mediaQueryList.addListener(update);
    return () => mediaQueryList.removeListener(update);
  }, [breakpoint]);

  return isMobile;
}

