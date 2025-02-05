import { Montserrat_Alternates } from 'next/font/google'

const montserrat = Montserrat_Alternates({
  weight: '400',
  subsets: ['latin'],

  variable: '--font-montserrat',
})

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextAuthProvider from "./providers/session-provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

export const metadata: Metadata = {
  title: "Anime Hub",
  description: "Watch Anime Online with AI Recommendations",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
      className={`${montserrat.className}`}
      >
        <ToastContainer />

        <NextAuthProvider >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
