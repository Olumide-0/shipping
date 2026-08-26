import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import Nav from "../components/global/nav";
import Footer1 from "@/components/global/footer1";
import { ConvexClientProvider } from "@/components/convex-client-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ConvexClientProvider>
          <ThemeProvider>
            <Nav />
            {children}</ThemeProvider>
            <Footer1/>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
