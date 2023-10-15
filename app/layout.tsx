"Use client"

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UEAB Tools - Created by developer.gerison",
  description: "Cool UEAB Tools created by Developer Gerison",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen w-[100vw]`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="flex flex-grow w-[100vw] ">
          <div className="">
            <Sidebar />
          </div>
          <div
            className="relative z-5 flex-1 flex-grow min"
            style={{ minHeight: "calc(100vh - 270px)" }}
          >
            <Toaster/>
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
