import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
// @ts-ignore: CSS module declarations not present in this environment
import "./globals.css"

const baseUrl = "https://masood-portfolio-nextjs.vercel.app"

export const metadata: Metadata = {
  title: {
    default: "Mohammed Azhar | Front-End Developer",
    template: "%s | Mohammed Azhar",
  },
  description:
    "Associate Software Developer specializing in React, TypeScript, and Next.js. Building responsive UIs and optimizing state management for healthcare and enterprise applications.",
  keywords: [
    "Front-End Developer",
    "React Developer",
    "TypeScript",
    "Next.js",
    "UI Developer",
    "Mohammed Azhar",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Mohammed Masood Azhar" }],
  creator: "Mohammed Masood Azhar",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mohammed Azhar | Front-End Developer",
    description:
      "Associate Software Developer specializing in React, TypeScript, and Next.js. Building responsive UIs for healthcare and enterprise applications.",
    url: baseUrl,
    siteName: "Mohammed Azhar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Azhar | Front-End Developer",
    description:
      "Associate Software Developer specializing in React, TypeScript, and Next.js.",
  },
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
