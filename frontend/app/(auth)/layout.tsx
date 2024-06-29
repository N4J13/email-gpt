import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Email Gptfication",
  description: "Email Gptfication is a Next.js app that uses OpenAI's GPT to categorize emails.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className=" px-6 w-full flex justify-end items-center min-h-[100px] ">
            <ModeToggle />
          </nav>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
