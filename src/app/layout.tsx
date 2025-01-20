import type { Metadata } from "next";

import "./globals.scss";
import Header from "@/components/common/Header";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "./react-query-provider";
import NextTopLoader from 'nextjs-toploader';


export const metadata: Metadata = {
  title: "Boon.ai - Job search",
  description: "Your next job destination"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html lang="en">
      <body>
      <NextTopLoader />
        <NextIntlClientProvider messages={messages}>
        <ReactQueryProvider>
          <Header />
          <Toaster position="top-center" />
          {children}</ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
