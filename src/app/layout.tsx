import "./globals.css"

import AppNavigator from "@/components/AppNavigator"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Administrador de MB Peluqueria",
  description: "Administración del sitio web de turnos de MB Peluqueria.",
  keywords:
    "peluquería, peluquero, pelo, cortar, cortes, cortes de pelo, masculino, niños, barba, barberia, barbero",
  authors: [
    {
      name: "Gianluca Bredice Developer",
      url: "https://devbredicegian.site",
    },
  ],
  robots: "index",
  applicationName: "Administrador de MB Peluquería",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon512_rounded.png",
    icon: "/icon512_maskable.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-sm mx-auto`}>
        <AppNavigator>{children}</AppNavigator>
        <Toaster theme="dark" />
      </body>
    </html>
  )
}
