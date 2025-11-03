import './globals.dev.css'
import type { PropsWithChildren } from 'react'
import Shell from '../components/Shell'

export const metadata = {
  title: 'BokTalent',
  description: 'Talent platform scaffold'
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
