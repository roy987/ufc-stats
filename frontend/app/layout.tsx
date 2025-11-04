import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UFC Fighter Stats',
  description: 'View UFC fighter statistics, records, and fight history',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
