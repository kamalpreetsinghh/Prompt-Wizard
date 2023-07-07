import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/Provider";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: "300", subsets: ["latin"] });

export const metadata = {
  title: "Prompt Wizard",
  description: "Discover and Share AI Prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
