import type { Metadata } from 'next'
import clsx from 'clsx'
import './globals.css'
import { Source_Sans_3 } from 'next/font/google'
import { Providers } from '@app/ui/components/providers'

const sourceSans = Source_Sans_3({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | RailHub',
    default: 'RailHub',
  },
  description: 'RailHub',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={clsx(sourceSans.className, 'h-screen antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
