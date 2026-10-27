import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./QueryProvider";
import { Suspense } from "react";


const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});


export const metadata: Metadata = {
  title: "Project Management Dashboard - Obsidian Labs",
  description: "Project Management Dashboard - Obsidian Labs",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
