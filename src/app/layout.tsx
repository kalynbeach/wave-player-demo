import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StackProvider } from './wave-player/context/StackContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'wave-player-demo',
  description: 'A music player.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StackProvider>
          {children}
        </StackProvider>
      </body>
    </html>
  )
}
