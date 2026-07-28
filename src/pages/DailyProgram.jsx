import { Clock, Coffee, Utensils, Sun, Moon } from 'lucide-react'

const schedule = [
  { time: '08:30 - 10:00', label: 'Morning Session 1', type: 'session' },
  { time: '10:00 - 10:30', label: 'Tea Break', type: 'break', icon: Coffee },
  { time: '10:30 - 13:00', label: 'Morning Session 2', type: 'session' },
  { time: '13:00 - 14:00', label: 'Lunch', type: 'lunch', icon: Utensils },
  { time: '14:00 - 15:30', label: 'Afternoon Session 1', type: 'session' },
  { time: '15:30 - 16:00', label: 'Tea Break', type: 'break', icon: Coffee },
  { time: '16:00 - 17:00', label: 'Afternoon Session 2', type: 'session' },
]

const dailyContent = [
  {
    day: 'Monday 22 June',
    dayNum: 1,
    theme: 'Context & R Fundamentals',
    color: 'blue',
    sessions: [
      { slot: '08:30 - 10:00', title: 'Welcome & Namibia Veterinary Context', description: 'FMD zones, NCA, VCF, and movement control regulations' },
      { slot: '10:30 - 13:00', title: 'Introduction to R & RStudio', description: 'R basics, data types, vectors, and the RStudio interface' },
      { slot: '14:00 - 15:30', title: 'Data Import & Cleaning', description: 'Reading CSV/Excel files, handling missing data, data types' },
      { slot: '16:00 - 17:00', title: 'Data Wrangling with dplyr', description: 'filter(), select(), mutate(), summarize(), group_by()' },
    ],
    special: {
      time: '19:00',
      event: 'Workshop Dinner',
      location: 'Workshop Venue',
      icon: Moon
    }
  },
  {
    day: 'Tuesday 23 June',
    dayNum: 2,
    theme: 'Visualization & RMarkdown',
    color: 'green',
    sessions: [
      { slot: '08:30 - 10:00', title: 'Data Visualization with ggplot2', description: 'Grammar of graphics, geoms, aesthetics, and themes' },
      { slot: '10:30 - 13:00', title: 'RMarkdown Reports', description: 'Creating reproducible reports with tables and visualizations' },
      { slot: '14:00 - 17:00', title: 'Practical: Movement Data Analysis', description: 'Apply skills to analyze NCA LITS movement patterns' },
    ]
  },
  {
    day: 'Wednesday 24 June',
    dayNum: 3,
    theme: 'Movement Network Analysis',
    color: 'amber',
    sessions: [
      { slot: '08:30 - 10:00', title: 'Network Analysis Fundamentals', description: 'Graph theory, nodes, edges, and network construction' },
      { slot: '10:30 - 13:00', title: 'Centrality Measures', description: 'In-degree, out-degree, betweenness, closeness, and interpretation' },
      { slot: '14:00 - 15:30', title: 'Network Visualization', description: 'ggraph plots, geographic flow maps, and interactive leaflet maps' },
      { slot: '16:00 - 17:00', title: 'Risk-Based Analysis', description: 'High-risk pathways, auction point analysis, surveillance targeting' },
    ]
  },
  {
    day: 'Thursday 25 June',
    dayNum: 4,
    theme: 'QGIS & EpiCollect5',
    color: 'purple',
    sessions: [
      { slot: '08:30 - 10:00', title: 'Exporting Data for QGIS', description: 'Creating shapefiles and GeoPackages from R' },
      { slot: '10:30 - 13:00', title: 'QGIS Visualization', description: 'Importing data, styling layers, and creating flow maps' },
      { slot: '14:00 - 15:30', title: 'EpiCollect5 Overview & Forms', description: 'Platform intro, creating accounts, form design' },
      { slot: '16:00 - 17:00', title: 'Wrap-up & Closing', description: 'Review, Q&A, and next steps' },
    ]
  }
]

const colorClasses = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', badge: 'bg-blue-600' },
  green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', badge: 'bg-green-600' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-700', badge: 'bg-amber-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700', badge: 'bg-purple-600' },
}

export default function DailyProgram() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-sm font-medium text-woah-gold bg-woah-orange/10 px-2 py-1 rounded">
          Workshop Schedule
        </span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">
          Daily Program
        </h1>
        <p className="text-gray-600">
          Monday 22 June - Thursday 25 June 2025
        </p>
      </div>

      {/* Standard Daily Schedule */}
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-woah-orange" />
          Daily Schedule
        </h2>
        <div className="grid gap-2">
          {schedule.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                item.type === 'break' ? 'bg-amber-50' :
                item.type === 'lunch' ? 'bg-green-50' :
                'bg-gray-50'
              }`}
            >
              <span className="font-mono text-sm text-gray-600 w-28">{item.time}</span>
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className={`h-4 w-4 ${
                  item.type === 'break' ? 'text-amber-600' : 'text-green-600'
                }`} />}
                <span className={`font-medium ${
                  item.type === 'break' ? 'text-amber-700' :
                  item.type === 'lunch' ? 'text-green-700' :
                  'text-gray-800'
                }`}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Details */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Session Details by Day</h2>

        {dailyContent.map((day) => {
          const colors = colorClasses[day.color]
          return (
            <div key={day.dayNum} className={`${colors.bg} border-l-4 ${colors.border} rounded-r-lg p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className={`${colors.badge} text-white text-xs font-bold px-2 py-1 rounded`}>
                    Day {day.dayNum}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">{day.day}</h3>
                  <p className={`${colors.text} font-medium`}>{day.theme}</p>
                </div>
              </div>

              <div className="space-y-3">
                {day.sessions.map((session, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                        {session.slot}
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-800">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Event */}
              {day.special && (
                <div className="mt-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <day.special.icon className="h-6 w-6 text-amber-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-amber-300">{day.special.time}</span>
                        <span className="font-bold">{day.special.event}</span>
                      </div>
                      <p className="text-sm text-gray-300">{day.special.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </section>

      {/* Notes */}
      <section className="bg-woah-cream border border-woah-gold-lighter rounded-lg p-6">
        <h3 className="font-bold text-woah-charcoal mb-3">Important Notes</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-woah-orange rounded-full mt-1.5 flex-shrink-0"></span>
            <span>Please arrive 10 minutes before the first session each day</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-woah-orange rounded-full mt-1.5 flex-shrink-0"></span>
            <span>Bring your laptop and smartphone to all sessions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-woah-orange rounded-full mt-1.5 flex-shrink-0"></span>
            <span>Tea, coffee, and refreshments will be provided during breaks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-woah-orange rounded-full mt-1.5 flex-shrink-0"></span>
            <span><strong>WiFi:</strong> Network: <code className="bg-gray-200 px-1 rounded">Continental Hotel AP</code> | Password: <code className="bg-gray-200 px-1 rounded">Continental@1</code></span>
          </li>
        </ul>
      </section>
    </div>
  )
}
