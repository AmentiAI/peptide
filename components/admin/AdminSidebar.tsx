'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/sites', label: 'Sites', icon: '🌐' },
  { href: '/admin/products', label: 'Products', icon: '🧪' },
  { href: '/admin/guides', label: 'Guides', icon: '📖' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  return (
    <aside className="w-56 flex-shrink-0 bg-gray-900 text-white flex flex-col min-h-screen">
      <div className="px-4 py-5 border-b border-gray-700">
        <div className="font-bold text-lg">Admin Panel</div>
        <div className="text-xs text-gray-400 mt-0.5">Peptide Network</div>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                active
                  ? 'bg-gray-700 text-white font-medium'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full text-left text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  )
}
