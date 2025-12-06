'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/assignments', label: 'Tugas' },
  { href: '/tools', label: 'Tools' },
  { href: '/helper', label: 'Helper Tugas' },
  { href: '/profile', label: 'Profil' }
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm">
      <nav className="container-max flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-bold text-blue-700">
          Tools Mahasiswa FEB
        </Link>
        <div className="flex items-center gap-2 text-sm">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 transition ${active ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-100'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
