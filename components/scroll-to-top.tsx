"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    // Set scroll restoration to manual so the browser doesn't jump down
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    
    // Remove hash from URL if it exists, and scroll to absolute top
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
