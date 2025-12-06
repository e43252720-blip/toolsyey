import type { Metadata } from 'next'
import './globals.css'
import { NavBar } from '../components/NavBar'

export const metadata: Metadata = {
  title: 'Tools Mahasiswa FEB Indonesia',
  description: 'Dashboard tugas, tools belajar, dan helper tugas untuk mahasiswa FEB.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50">
        <NavBar />
        <main className="container-max py-8">{children}</main>
      </body>
    </html>
  )
}
