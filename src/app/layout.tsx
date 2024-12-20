import CookieConsent from "@/components/cookie-consent";
import MainNav from "@/components/nav/main-nav";
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import { uploadRouter } from "@/uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { extractRouterConfig } from "uploadthing/server";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />
          <header className="flex h-header w-full shrink-0 items-center px-4 md:px-6">
            <SessionProvider>
              <MainNav items={siteConfig.mainNav} />
            </SessionProvider>
          </header>
          <ReactQueryClientProvider>
            <main className="flex-1 overflow-hidden">{children}</main>
          </ReactQueryClientProvider>
          <Toaster />
          <CookieConsent />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
