import type { Metadata } from "next";

import "./globals.scss";
import Header from "@/components/common/Header";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "./react-query-provider";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Boon.ai - Job search",
  description: "Your next job destination",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <head>
        {/* Meta Title & Description */}
        <title>Find Gulf Jobs for Indians | Boon.ai Job Board</title>
        <meta
          name="description"
          content="Explore top Gulf jobs for Indians & freshers. Use BoonIndia, a trusted job board & job search website to land your dream Gulf job."
        />
        {/* Canonical Tag */}
        <link rel="canonical" href="https://boonindia.ai/" />
        {/* Structured Data: Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Website",
              name: "BoonIndia",
              url: "https://boonindia.ai/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://boonindia.ai/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* Structured Data: Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BoonIndia",
              url: "https://boonindia.ai/",
              logo: "https://www.boonindia.ai/_next/image?url=%2Flogo.png&w=384&q=75",
              sameAs: [],
              description:
                "Boon.ai is a job board helping Indian job seekers find Gulf jobs, including options for freshers. Discover top Gulf job listings today.",
            }),
          }}
        />
      </head>
      <body>
        <NextTopLoader />
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <Header />
            <Toaster position="top-center" />
            {children}
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
      {/* Only render GoogleAnalytics if gaId is present */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
