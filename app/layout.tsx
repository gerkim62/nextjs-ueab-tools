import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Sidebar } from "./components/Sidebar";

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
      <body className={`${inter.className} flex`}>
        <div className="flex">
          <div className="h-screen overflow-y-auto w-full">
            <Sidebar />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
