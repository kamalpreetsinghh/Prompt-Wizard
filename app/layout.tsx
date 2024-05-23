import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/Provider";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/AppThemeProvider";
import "./globals.css";
import { poppins } from "./font";

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
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider>
          <SessionProvider>
            <div className="main">
              <div className="gradient"></div>
            </div>
            <div className="min-h-screen">
              <Navbar />
              <main className="app">{children}</main>
            </div>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
