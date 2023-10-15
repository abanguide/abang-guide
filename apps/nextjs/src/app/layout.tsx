import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";
import Script from "next/script";

import { BottomNavigation } from "./_components/BottomNavigation";
import { TRPCReactProvider } from "./providers";
import TopBar from "./TopBar";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ajou Life",
  description: "Ajou Life",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f1494ad8df2a9262259940f691221ac9&libraries=services,clusterer&autoload=false" />
        <TRPCReactProvider headers={headers()}>
          <main className="flex flex-col">
            <TopBar />
            <div className="w-full flex-1">{props.children}</div>
          </main>
          <aside className="fixed bottom-0 z-10 mb-4 flex w-full justify-center">
            <BottomNavigation />
          </aside>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
