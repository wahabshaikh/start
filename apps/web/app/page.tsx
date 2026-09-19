"use client";

import { ArrowRight02Icon, AnalyticsUpIcon, CustomerSupportIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@start/ui/components/button";
import { Crisp } from "crisp-sdk-web";
import { getAnalytics } from "../lib/analytics";

export default function HomePage() {
  async function trackStart() {
    const analytics = await getAnalytics();
    await analytics?.track("starter_cta_click");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20">
      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
          <HugeiconsIcon icon={AnalyticsUpIcon} size={16} />
          Cloudflare + Expo
        </div>

        <div className="space-y-4">
          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
            Ship web and iOS products from one starter.
          </h1>
          <p className="max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            vinext, Expo, Cloudflare, Better Auth, shadcn, Hugeicons, DataFast and Crisp are wired in.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={trackStart}>
            Start building
            <HugeiconsIcon icon={ArrowRight02Icon} size={18} />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) Crisp.chat.open();
            }}
          >
            <HugeiconsIcon icon={CustomerSupportIcon} size={18} />
            Support
          </Button>
        </div>
      </div>
    </main>
  );
}
