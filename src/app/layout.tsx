import "./globals.css"

import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Administrador de MB Peluqueria",
  description: "Administración del sitio web de turnos de MB Peluqueria.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-sm mx-auto`}>{children}</body>
    </html>
  )
}
