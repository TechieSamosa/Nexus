import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { TerminalProvider } from "@/components/TerminalProvider";
import GlobalTerminal from "@/components/GlobalTerminal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Khamitkar | AI & ML Engineer",
  description: "Developer portfolio for Aditya Khamitkar - AI & ML Engineer, Deep Learning Researcher.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-space-900 text-white font-sans selection:bg-neon-purple/30 selection:text-white transition-colors duration-500">
        <TerminalProvider>
          {children}
          <GlobalTerminal />
        </TerminalProvider>
      </body>
    </html>
  );
}
