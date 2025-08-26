import "./globals.css"
import { ReactNode } from "react"

export const metadata = {
  title: "AstraCore App",
  description: "Interní aplikace AstraCore",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
