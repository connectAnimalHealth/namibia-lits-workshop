import { Link } from 'react-router-dom'
import { MapPin, FileSpreadsheet, Code, Network, Calendar, Users, Target } from 'lucide-react'

const modules = [
  {
    day: 'Day 1-2',
    title: 'Data Collection & Management',
    description: 'EpiCollect5 questionnaire development for veterinary field data collection',
    icon: FileSpreadsheet,
    href: '/day1/session1',
    color: 'bg-namibia-blue'
  },
  {
    day: 'Day 3-4',
    title: 'Introduction to R',
    description: 'R basics, data wrangling, and visualization for epidemiological analysis',
    icon: Code,
    href: '/day3/session1',
    color: 'bg-namibia-green'
  },
  {
    day: 'Day 4.5',
    title: 'Movement Network Analysis',
    description: 'Analyzing LITS cattle movement data for disease risk assessment',
    icon: Network,
    href: '/day5/session1',
    color: 'bg-namibia-red'
  }
]

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-namibia-blue mb-4">
          Namibia LITS Data Workshop
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A 4.5-day intensive training on data management, R programming, and 
          livestock movement analysis for veterinary epidemiologists
        </p>
      </div>

      {/* Quick Info */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-3">
          <Calendar className="h-8 w-8 text-namibia-blue" />
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold">4.5 Days</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-3">
          <Users className="h-8 w-8 text-namibia-green" />
          <div>
            <p className="text-sm text-gray-500">Target Audience</p>
            <p className="font-semibold">State Veterinarians</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-3">
          <Target className="h-8 w-8 text-namibia-red" />
          <div>
            <p className="text-sm text-gray-500">Focus</p>
            <p className="font-semibold">LITS Movement Data</p>
          </div>
        </div>
      </div>

      {/* Namibia Context Link */}
      <Link 
        to="/namibia-context"
        className="block bg-gradient-to-r from-namibia-blue to-namibia-green text-white p-6 rounded-lg hover:opacity-90 transition"
      >
        <div className="flex items-center gap-4">
          <MapPin className="h-10 w-10" />
          <div>
            <h2 className="text-xl font-bold">Namibia Veterinary Context</h2>
            <p className="text-white/80">FMD zones, NCA, Veterinary Cordon Fence, and movement control regulations</p>
          </div>
        </div>
      </Link>

      {/* Modules */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Workshop Modules</h2>
        <div className="space-y-4">
          {modules.map((module) => (
            <Link
              key={module.day}
              to={module.href}
              className="block bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${module.color}`}>
                  <module.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-namibia-gold bg-namibia-blue/10 px-2 py-0.5 rounded">
                      {module.day}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
                  <p className="text-gray-600">{module.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Prerequisites</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-namibia-green rounded-full"></span>
            Laptop with R and RStudio installed
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-namibia-green rounded-full"></span>
            Smartphone with EpiCollect5 app
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-namibia-green rounded-full"></span>
            Basic understanding of livestock movement systems
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-namibia-green rounded-full"></span>
            No prior R experience required
          </li>
        </ul>
      </div>
    </div>
  )
}