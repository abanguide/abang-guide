import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";

// import { BottomNavigation } from "./_components/BottomNavigation";
import { TRPCReactProvider } from "./providers";
import TopBar from "./TopBar";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Abang-guide",
  description: "Abang-guide",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <TRPCReactProvider headers={headers()}>
          <main className="flex min-h-screen flex-col">
            <TopBar />
            <div className="w-full flex-1">{props.children}</div>
          </main>
          {/* <aside className="fixed bottom-0 z-10 mb-4 flex w-full justify-center">
            <BottomNavigation />
          </aside> */}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
