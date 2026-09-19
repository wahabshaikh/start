"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect, type ReactNode } from "react";
import { getAnalytics } from "../lib/analytics";

let crispConfigured = false;

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    void getAnalytics();

    const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
    if (websiteId && !crispConfigured) {
      Crisp.configure(websiteId);
      crispConfigured = true;
    }
  }, []);

  return children;
}
