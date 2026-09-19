import type { Metadata } from "next";
import "@start/ui/globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Start",
  description: "Cloudflare + Expo starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
