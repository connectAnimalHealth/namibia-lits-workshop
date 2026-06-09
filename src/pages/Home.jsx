import { Link } from 'react-router-dom'
import { MapPin, FileSpreadsheet, Code, Network, Calendar, Users, Target, Download, AlertTriangle, BookOpen, Database } from 'lucide-react'

const modules = [
  {
    day: 'Day 1-2',
    title: 'Introduction to R Programming',
    description: 'R basics, RStudio, data import & cleaning, wrangling with dplyr, and visualization with ggplot2',
    icon: Code,
    href: '/day3/session1',
    color: 'bg-blue-600',
    sessions: '3 sessions'
  },
  {
    day: 'Day 3',
    title: 'EpiCollect5 Data Collection',
    description: 'Data management principles, form design, building questionnaires, field testing, and API integration with R',
    icon: FileSpreadsheet,
    href: '/day1/session1',
    color: 'bg-green-600',
    sessions: '5 sessions'
  },
  {
    day: 'Day 4',
    title: 'Network Analysis & QGIS',
    description: 'Livestock movement network analysis and spatial visualization with QGIS',
    icon: Network,
    href: '/day5/session1',
    color: 'bg-amber-500',
    sessions: '2 sessions'
  }
]

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 bg-woah-orange/10 text-woah-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <BookOpen className="h-4 w-4" />
          WOAH Training Programme
        </div>
        <h1 className="text-4xl font-bold text-woah-charcoal mb-4">
          Namibia Livestock Movement Workshop
        </h1>
        <p className="text-xl text-woah-gray max-w-2xl mx-auto">
          A 4.5-day intensive training on data management, R programming, and
          livestock movement analysis for veterinary epidemiologists
        </p>
      </div>

      {/* Quick Info */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-woah-gray-light flex items-center gap-3">
          <div className="p-2 bg-woah-orange/10 rounded-lg">
            <Calendar className="h-6 w-6 text-woah-orange" />
          </div>
          <div>
            <p className="text-sm text-woah-gray">Duration</p>
            <p className="font-semibold text-woah-charcoal">4.5 Days</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-woah-gray-light flex items-center gap-3">
          <div className="p-2 bg-woah-green/10 rounded-lg">
            <Users className="h-6 w-6 text-woah-green" />
          </div>
          <div>
            <p className="text-sm text-woah-gray">Target Audience</p>
            <p className="font-semibold text-woah-charcoal">State Veterinarians</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-woah-gray-light flex items-center gap-3">
          <div className="p-2 bg-woah-gold/10 rounded-lg">
            <Target className="h-6 w-6 text-woah-gold" />
          </div>
          <div>
            <p className="text-sm text-woah-gray">Focus</p>
            <p className="font-semibold text-woah-charcoal">LITS Movement Data</p>
          </div>
        </div>
      </div>

      {/* Pre-Workshop Setup - CRITICAL */}
      <Link
        to="/pre-workshop"
        className="block bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg hover:opacity-95 transition shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Download className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wide">Required Before Workshop</span>
            </div>
            <h2 className="text-xl font-bold">Pre-Workshop Setup</h2>
            <p className="text-white/90">Install R, RStudio, required packages, and EpiCollect5 mobile app</p>
          </div>
        </div>
      </Link>

      {/* Namibia Context Link */}
      <Link
        to="/namibia-context"
        className="block bg-gradient-to-r from-gray-800 to-gray-600 text-white p-6 rounded-lg hover:opacity-95 transition shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="bg-woah-gold/20 p-3 rounded-lg">
            <MapPin className="h-8 w-8 text-woah-gold-light" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Namibia Veterinary Context</h2>
            <p className="text-white/80">FMD zones, NCA, Veterinary Cordon Fence, and movement control regulations</p>
          </div>
        </div>
      </Link>

      {/* Modules */}
      <div>
        <h2 className="text-2xl font-bold text-woah-charcoal mb-4">Workshop Modules</h2>
        <div className="space-y-4">
          {modules.map((module) => (
            <Link
              key={module.day}
              to={module.href}
              className="block bg-white p-6 rounded-lg shadow-sm border border-woah-gray-light hover:shadow-md hover:border-woah-orange/30 transition"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${module.color}`}>
                  <module.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-woah-orange bg-woah-orange/10 px-2 py-0.5 rounded">
                      {module.day}
                    </span>
                    <span className="text-xs text-gray-500">{module.sessions}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-woah-charcoal">{module.title}</h3>
                  <p className="text-woah-gray">{module.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      <div className="bg-woah-cream p-6 rounded-lg border border-woah-gold-lighter">
        <h2 className="text-xl font-bold text-woah-charcoal mb-3">Prerequisites</h2>
        <ul className="space-y-2 text-woah-charcoal">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-woah-green rounded-full"></span>
            Laptop with R and RStudio installed
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-woah-green rounded-full"></span>
            Smartphone with EpiCollect5 app
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-woah-green rounded-full"></span>
            Basic understanding of livestock movement systems
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-woah-green rounded-full"></span>
            No prior R experience required
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center py-4 border-t border-woah-gray-light">
        <p className="text-sm text-woah-gray">
          Developed by <span className="text-woah-gold font-medium">Connect Animal Health</span> for DVS Namibia
        </p>
      </div>
    </div>
  )
}
