import './globals.css'
import type { PropsWithChildren } from 'react'
import Shell from '../components/Shell'

export const metadata = {
  title: 'BokTalent',
  description: 'The premier platform connecting players, scouts, and schools in the world of sports'
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
