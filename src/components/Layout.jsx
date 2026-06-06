import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Home, MapPin, FileSpreadsheet, Code, BarChart3, Network, ChevronDown, ChevronRight, Database } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Namibia Context', href: '/namibia-context', icon: MapPin },
  {
    name: 'Day 1-2: Data Collection',
    icon: FileSpreadsheet,
    children: [
      { name: '1.1 Data Management Principles', href: '/day1/session1' },
      { name: '1.2 EpiCollect5 Overview', href: '/day1/session2' },
      { name: '2.1 Field Testing & QA', href: '/day2/session1' },
      { name: '2.2 EpiCollect5 API', href: '/day2/session2' },
    ]
  },
  {
    name: 'Day 3-4: R Introduction',
    icon: Code,
    children: [
      { name: '3.1 R/RStudio Setup', href: '/day3/session1' },
      { name: '3.2 Data Import & Cleaning', href: '/day3/session2' },
      { name: '4.1 Data Wrangling & Visualization', href: '/day4/session1' },
    ]
  },
  {
    name: 'Day 4.5: Movement Analysis',
    icon: Network,
    children: [
      { name: '5.1 Network Analysis', href: '/day5/session1' },
    ]
  },
]

function NavItem({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  
  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-namibia-blue/10 rounded-lg"
        >
          <span className="flex items-center gap-3">
            <item.icon className="h-5 w-5 text-namibia-blue" />
            {item.name}
          </span>
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {isOpen && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child) => (
              <NavLink
                key={child.href}
                to={child.href}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm rounded-lg ${isActive ? 'bg-namibia-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`
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
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm rounded-lg ${isActive ? 'bg-namibia-blue text-white' : 'text-gray-700 hover:bg-namibia-blue/10'}`
      }
    >
      <item.icon className="h-5 w-5" />
      {item.name}
    </NavLink>
  )
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-lg transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b bg-namibia-blue text-white">
            <h1 className="text-xl font-bold">Namibia LITS Workshop</h1>
            <p className="text-sm text-namibia-gold mt-1">Data Management & R Analysis</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t text-xs text-gray-500">
            <p>Connect Animal Health</p>
            <p>DVS Namibia Workshop 2025</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="max-w-4xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}