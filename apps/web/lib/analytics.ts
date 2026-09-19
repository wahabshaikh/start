"use client";

import { initDataFast } from "datafast";

type DataFastClient = Awaited<ReturnType<typeof initDataFast>>;

let client: Promise<DataFastClient | null> | null = null;

export function getAnalytics() {
  if (client) return client;

  const websiteId = process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID;
  if (!websiteId) return Promise.resolve(null);

  client = initDataFast({
    websiteId,
    domain: process.env.NEXT_PUBLIC_DATAFAST_DOMAIN,
    autoCapturePageviews: true,
  });

  return client;
}
