import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";
import Script from "next/script";

import { BottomNavigation } from "./_components/BottomNavigation";
import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=78db97fad296256c4498faa49d235692&libraries=services,clusterer&autoload=false" />
        <TRPCReactProvider headers={headers()}>
          <main className="flex min-h-screen flex-col items-center">
            {props.children}
            <BottomNavigation />
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
