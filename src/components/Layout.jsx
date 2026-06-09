import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Home, MapPin, FileSpreadsheet, Code, Network, ChevronDown, ChevronRight, Database, Settings, BookOpen } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Pre-Workshop Setup', href: '/pre-workshop', icon: Settings },
  { name: 'Workshop Context', href: '/namibia-context', icon: MapPin },
  {
    name: 'Day 1-2: R Programming',
    icon: Code,
    children: [
      { name: 'Session 1: Introduction to R', href: '/day3/session1' },
      { name: 'Session 2: Data Import & Wrangling', href: '/day3/session2' },
      { name: 'Session 3: Visualization (ggplot2)', href: '/day4/session1' },
    ]
  },
  {
    name: 'Day 3: EpiCollect5',
    icon: FileSpreadsheet,
    children: [
      { name: 'Session 1: Data Management', href: '/day1/session1' },
      { name: 'Session 2: EpiCollect5 Overview', href: '/day1/session2' },
      { name: 'Session 3: Building Forms', href: '/day1/session3' },
      { name: 'Session 4: Field Testing & QA', href: '/day2/session1' },
      { name: 'Session 5: EpiCollect5 API in R', href: '/day2/session2' },
    ]
  },
  { name: 'Day 4: Network Analysis', href: '/day5/session1', icon: Network },
  { name: 'Day 4: QGIS Visualization', href: '/day5/session2', icon: MapPin },
]

function NavItem({ item, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
        >
          <span className="flex items-center gap-3">
            <item.icon className="h-5 w-5 text-orange-500" />
            {item.name}
          </span>
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {isOpen && (
          <div className="ml-8 mt-1 space-y-1 border-l-2 border-woah-gold-lighter pl-4">
            {item.children.map((child) => (
              <NavLink
                key={child.href}
                to={child.href}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-500 text-white font-medium'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-gray-800'
                  }`
                }
              >
                {child.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <NavLink
      to={item.href}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? 'bg-orange-500 text-white'
            : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
        }`
      }
    >
      <item.icon className="h-5 w-5" />
      {item.name}
    </NavLink>
  )
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavigate = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-woah-gray-lighter">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md border border-woah-gray-light hover:bg-woah-cream transition-colors"
        >
          {sidebarOpen ? <X className="h-6 w-6 text-woah-charcoal" /> : <Menu className="h-6 w-6 text-woah-charcoal" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          {/* Header with WOAH Logo */}
          <div className="p-5 border-b border-woah-gray-light bg-white">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/namibia-lits-workshop/woah-primary-logo-english-orange-black.png"
                alt="WOAH Logo"
                className="h-12 w-auto"
              />
            </div>
            <div className="border-t border-woah-gold-lighter pt-4">
              <h1 className="text-lg font-bold text-woah-charcoal">Namibia Livestock Movement Workshop</h1>
              <p className="text-sm text-woah-gray mt-1">Data Management & R Programming</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} onNavigate={handleNavigate} />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-woah-gray-light bg-woah-cream">
            <div className="flex items-center gap-2 text-xs text-woah-gray">
              <BookOpen className="h-4 w-4" />
              <span>DVS Namibia Training 2025</span>
            </div>
            <p className="text-xs text-woah-gold-dark mt-1">Connect Animal Health</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-80">
        <div className="max-w-5xl mx-auto px-6 py-8 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
