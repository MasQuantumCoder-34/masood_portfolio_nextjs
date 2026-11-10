import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import ClientProviders from "@/components/providers/client-providers"
// @ts-ignore: CSS module declarations not present in this environment
import "./globals.css"

const baseUrl = "https://masood-portfolio-nextjs.vercel.app"

export const metadata: Metadata = {
  title: {
    default: "Mohammed Masood Azhar V | Front-End Engineer",
    template: "%s | Mohammed Masood Azhar V",
  },
  description:
    "Front-End Engineer specializing in React, TypeScript, and modern Next.js. Building responsive, accessible UIs and optimizing state architecture.",
  keywords: [
    "Front-End Developer",
    "React Developer",
    "TypeScript",
    "Next.js",
    "UI Developer",
    "Mohammed Masood Azhar",
    "Mohammed Masood Azhar V",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Mohammed Masood Azhar V" }],
  creator: "Mohammed Masood Azhar V",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mohammed Masood Azhar V | Front-End Developer",
    description:
      "Front-End Engineer specializing in React, TypeScript, and Next.js. Building responsive, accessible web interfaces.",
    url: baseUrl,
    siteName: "Mohammed Masood Azhar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Masood Azhar V | Front-End Developer",
    description:
      "Front-End Engineer specializing in React, TypeScript, and Next.js.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ClientProviders>
            {children}
          </ClientProviders>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
