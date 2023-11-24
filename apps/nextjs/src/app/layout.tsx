import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { FurnitureFreeFormProvider, ShowListProvider } from "./hook";
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

const _width = 1920;
const _height = 1080;

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <TRPCReactProvider headers={headers()}>
          <ShowListProvider>
            <main className="flex min-h-screen flex-col">
              <TopBar />
              <FurnitureFreeFormProvider>
                <div className="w-full flex-1">{props.children}</div>
              </FurnitureFreeFormProvider>
            </main>
          </ShowListProvider>
          {/* <aside className="fixed bottom-0 z-10 mb-4 flex w-full justify-center">
            <BottomNavigation />
          </aside> */}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
