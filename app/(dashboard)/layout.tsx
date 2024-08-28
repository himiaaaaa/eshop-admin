import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eshop-admin-dashboard",
  description: "admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Topbar />
        {children}
      </main>
    </div>
  );
}
