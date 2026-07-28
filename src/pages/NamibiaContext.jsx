import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Info, ExternalLink } from 'lucide-react'
import Callout from '../components/Callout'
import NCAMap from '../components/NCAMap'
import Modal from '../components/Modal'

export default function NamibiaContext() {
  const [showWoahMap, setShowWoahMap] = useState(false)
  const [showWoahFmdFree, setShowWoahFmdFree] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-woah-orange mb-2">Workshop Context</h1>
        <p className="text-gray-600">The Northern Communal Areas (NCA) region and context that we'll be focussing on during this workshop</p>
      </div>

      {/* Interactive Map */}
      <section id="map">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Northern Communal Areas (NCA) & Veterinary Cordon Fence</h2>
          <button
            onClick={() => setShowWoahMap(true)}
            className="flex items-center gap-1 text-sm text-woah-orange hover:text-woah-orange-dark transition-colors"
            title="View official WOAH FMD status map"
          >
            <Info className="h-5 w-5" />
            <span className="hidden sm:inline">WOAH Map</span>
          </button>
        </div>
        <NCAMap />

      {/* WOAH Map Modal */}
      <Modal
        isOpen={showWoahMap}
        onClose={() => setShowWoahMap(false)}
        title="WOAH Official FMD Status - Namibia"
      >
        <div className="space-y-4">
          <img
            src="https://www.woah.org/app/uploads/2026/06/fmd-namibia-en.png"
            alt="WOAH FMD Status Map - Namibia"
            className="w-full rounded-lg border"
          />
          <p className="text-sm text-gray-600">
            Official WOAH (World Organisation for Animal Health) FMD status map for Namibia,
            showing the disease-free zones, protection zones, and containment zones.
          </p>
          <a
            href="https://www.woah.org/en/disease/foot-and-mouth-disease/#ui-id-2"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-orange-500 hover:underline"
          >
            View on WOAH website <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </Modal>
        <p className="text-sm text-gray-500 mt-2 italic">
          Interactive map showing official FMD status zones, NCA constituency boundaries, and the Veterinary Cordon Fence.
          Hover over constituencies to see details.
        </p>

      </section>

      <section id="vcf">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Veterinary Cordon Fence (VCF)</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Callout type="info" title="VCF Today">
            <ul className="list-disc list-inside space-y-1">
              <li>Stretches approximately 1,500 km across northern Namibia</li>
              <li>Establishes an FMD-free zone in the South with large parts of the NCA making up the non FMD-free areas of Namibia </li>
              <li>All livestock movements across require permits and health certification</li>
              <li>Critical for maintaining EU export market access</li>
            </ul>
          </Callout>

          <Callout type="warning" title="Road Map to Freedom (2011-2012)">
            <p className="text-sm mb-2">
              DVS and MAWF developed a comprehensive roadmap towards declaring the NCA free from FMD and CBPP, addressing:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Movement control to prevent disease incursions</li>
              <li>Surveillance to demonstrate freedom</li>
              <li>Early detection of outbreaks</li>
              <li>Community engagement in disease surveillance</li>
            </ul>
          </Callout>
        </div>

      </section>

      <section id="fmd-zones">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">FMD Zones</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-green-800">FMD-Free Without Vaccination (South of VCF)</h3>
              <button
                onClick={() => setShowWoahFmdFree(true)}
                className="text-green-600 hover:text-green-800 transition-colors"
                title="View WOAH official status"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>Commercial farming areas</li>
              <li>EU-approved export eligibility</li>
              <li>Regular surveillance and testing</li>
              <li>Vaccination not practised</li>
            </ul>
            <p className="text-xs text-green-600 mt-2 italic">
              WOAH recognised since February 1997
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="font-bold text-red-800 mb-2">Northern Communal Areas (North of VCF)</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>Communal grazing lands with traditional livestock husbandry</li>
              <li>Porous borders with Angola, Zambia, Zimbabwe</li>
              <li>Cross-border livestock movements for grazing and cultural practices</li>
              <li>Vaccination campaigns conducted</li>
              <li>Export restrictions apply</li>
            </ul>
          </div>
        </div>

        {/* WOAH FMD-Free Zone Modal */}
        <Modal
          isOpen={showWoahFmdFree}
          onClose={() => setShowWoahFmdFree(false)}
          title="WOAH Official FMD-Free Status"
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">FMD-free zones</h4>
              <h5 className="text-lg font-semibold text-gray-700 mb-3">
                FMD-free zones<sup>(9)</sup> where vaccination is not practised
              </h5>
              <p className="text-gray-600 mb-4">
                Members having an <strong>FMD-free zone where vaccination is not practised</strong>, according
                to the provisions of Chapter 8.8. of the <em>Terrestrial Code</em>:
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b bg-green-50">
                    <td className="p-3 font-semibold text-green-800 border-r w-24">
                      Namibia<br/>
                      <a
                        href="https://www.woah.org/app/uploads/2026/06/fmd-namibia-en.png"
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-500 hover:underline text-xs"
                      >
                        Map
                      </a>
                    </td>
                    <td className="p-3 text-gray-700">
                      + one zone designated by the Delegate of Namibia in a document addressed to the
                      Director General in <strong>February 1997</strong>.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 italic">
              (9) For detailed information on the delimitation of zones of Members recognised as FMD-free,
              enquiries should be addressed to the Director General of WOAH.
            </p>

            <a
              href="https://www.woah.org/en/disease/foot-and-mouth-disease/#ui-id-2"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-orange-500 hover:underline"
            >
              View full list on WOAH website <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </Modal>

        <Callout type="warning" title="Regional FMD Context">
          <div className="space-y-2">
            <p><strong>FMD-Free Zone borders:</strong></p>
            <ul className="list-disc list-inside ml-2">
              <li><strong>Botswana</strong> - FMD-free without vaccination (in zones)</li>
              <li><strong>South Africa</strong> - Currently FMD infected with large-scale outbreak</li>
            </ul>
            <p className="mt-2"><strong>NCA borders:</strong></p>
            <ul className="list-disc list-inside ml-2">
              <li><strong>Angola</strong> - FMD infected</li>
              <li><strong>Zambia</strong> - FMD infected</li>
              <li><strong>Zimbabwe</strong> - FMD infected</li>
              <li><strong>Botswana</strong> - FMD-free without vaccination (in zones)</li>
            </ul>
          </div>
        </Callout>

        {/* Group Discussion */}
        <div className="mt-6 bg-woah-gold-lighter/30 border-2 border-woah-gold rounded-lg p-5">
          <div className="flex items-start gap-3">
            <div className="bg-amber-500 text-white p-2 rounded-lg flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-woah-gold-dark text-lg">Group Discussion: FMD Zones & Control</h3>
                <span className="text-sm bg-woah-gold/20 text-woah-gold-dark px-2 py-1 rounded">15 min</span>
              </div>
              <p className="text-gray-700 mb-3">
                As State Veterinarians, you have direct knowledge of FMD control in Namibia. Let's discuss:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">1.</span>
                  <div>
                    <span>What is the correct terminology for the <strong>"No Status" zone</strong> north of the VCF? Is it called a "Protection Zone", "Infected Zone", or something else?</span>
                    <p className="text-sm text-gray-600 mt-1">Does FMD occur in this area, and if so, how is it managed from a disease control perspective?</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">2.</span>
                  <span>Is the goal still to achieve <strong>FMD-free status</strong> for the area north of the VCF? What are the current priorities and challenges?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">3.</span>
                  <span>Some <strong>NCA constituencies appear to be intersected by the VCF</strong>. How does this affect their classification and disease management in practice?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">4.</span>
                  <span>Is the <strong>VCF line</strong> accurately positioned on the map?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">5.</span>
                  <span>Are there any <strong>recent changes</strong> to zone boundaries we should update?</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-white/50 rounded-lg">
                <p className="text-sm text-woah-charcoal">
                  <strong>Live Update:</strong> Any corrections identified will be updated directly in the
                  GeoJSON files during the workshop - demonstrating real-time spatial data management.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Movement Challenges */}
      <section id="movement-challenge">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Movement Challenge</h2>
        <p className="text-gray-700 mb-4">
          Understanding livestock movements is the most challenging aspect of disease control in the NCA.
          Traditional practices, cultural needs, and the search for grazing land drive complex movement patterns.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-woah-cream border border-woah-gold-lighter rounded-lg p-4">
            <h3 className="font-semibold text-woah-charcoal mb-2">Cross-Border Movements</h3>
            <p className="text-sm text-gray-600">
              Herds move across porous borders with neighbouring countries in search of grazing land.
              Land ownership, families and tribal groups are spread across the region with little heed
              paid to political borders.
            </p>
          </div>

          <div className="bg-woah-cream border border-woah-gold-lighter rounded-lg p-4">
            <h3 className="font-semibold text-woah-charcoal mb-2">Cultural Practices</h3>
            <p className="text-sm text-gray-600">
              Single animals may be brought from deep inside Angola as part of family funeral rituals.
              Traditional livestock husbandry methods and cultural values influence movement decisions.
            </p>
          </div>

          <div className="bg-woah-cream border border-woah-gold-lighter rounded-lg p-4">
            <h3 className="font-semibold text-woah-charcoal mb-2">Resource Pressure</h3>
            <p className="text-sm text-gray-600">
              The cattle population in the NCA has doubled in the last 20 years, leading to overgrazing
              and competition for feed that drives long-distance movements.
            </p>
          </div>
        </div>

        <Callout type="tip" title="Why This Workshop Matters">
          <p>
            Effective movement data management is critical for disease surveillance, early outbreak detection,
            and understanding transmission pathways. This workshop builds capacity in the tools and techniques
            needed to collect, analyse, and act on movement data for informed decision-making.
          </p>
        </Callout>

        {/* Group Discussion 2: Movement Rules */}
        <div className="mt-6 bg-woah-gold-lighter/30 border-2 border-woah-gold rounded-lg p-5">
          <div className="flex items-start gap-3">
            <div className="bg-amber-500 text-white p-2 rounded-lg flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-woah-gold-dark text-lg">Group Discussion: Movement Rules & Requirements</h3>
                <span className="text-sm bg-woah-gold/20 text-woah-gold-dark px-2 py-1 rounded">20 min</span>
              </div>
              <p className="text-gray-700 mb-3">
                Help us understand the veterinary requirements governing livestock movements in Namibia:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">1.</span>
                  <div>
                    <span><strong>Cross-border movements</strong> (international): What are the veterinary requirements for moving livestock from northern Namibia to neighbouring countries (Angola, Zambia, Zimbabwe, Botswana)?</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">2.</span>
                  <div>
                    <span><strong>NCA to FMD-free zone</strong>: What requirements must be met to move animals from the "No Status" area to the FMD-free zone south of the VCF?</span>
                    <p className="text-sm text-gray-600 mt-1">Quarantine periods? Testing? Vaccination requirements?</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">3.</span>
                  <div>
                    <span><strong>FMD-free to NCA</strong>: Are there restrictions on moving animals from the FMD-free zone into the NCA?</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">4.</span>
                  <div>
                    <span><strong>Slaughter rules</strong>: Can animals from the "No Status" area be slaughtered in abattoirs within the FMD-free zone? What conditions apply?</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">5.</span>
                  <div>
                    <span><strong>EU export certification</strong>: How does the certification process work for beef exports to the EU? Which animals/zones are eligible?</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-woah-gold font-bold">6.</span>
                  <div>
                    <span><strong>Permits and documentation</strong>: What permits are required for different movement types, and how is compliance monitored?</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>

      <section id="data-sources">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Workshop Data Sources</h2>
        <p className="text-gray-700 mb-4">
          This workshop focuses on the <strong>management, analysis, and recording of animal movement data
          for epidemiological purposes</strong>. We'll work with two complementary data sources:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-woah-orange mb-3">1. LITS Movement Data</h3>
            <p className="text-sm text-gray-600 mb-3">
              Historical <strong>2023 LITS movement records</strong> from the NCA containing approximately
              <strong> 35,970 movements</strong> between establishments.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Origin and destination establishments</li>
              <li>• Constituency and region information</li>
              <li>• Establishment types (Farm, Auction, Abattoir)</li>
              <li>• Number of animals moved</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-woah-orange mb-3">2. Cross-Border Movement Questionnaire</h3>
            <p className="text-sm text-gray-600 mb-3">
              Using <strong>EpiCollect5</strong>, we'll design and implement a questionnaire to capture
              information about <strong>potential cross-border movements</strong>.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Movement patterns across borders</li>
              <li>• Risk assessment data collection</li>
              <li>• Real-time field data capture</li>
              <li>• Integration with R for analysis</li>
            </ul>
          </div>
        </div>

        <div className="bg-woah-cream border border-woah-gold-lighter rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Spatial Reference Data</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-woah-charcoal">Constituencies</p>
              <p className="text-gray-600">75 NCA constituencies with unique GIDs</p>
            </div>
            <div>
              <p className="font-medium text-woah-charcoal">Boundaries</p>
              <p className="text-gray-600">Region boundaries and VCF location</p>
            </div>
            <div>
              <p className="font-medium text-woah-charcoal">Establishments</p>
              <p className="text-gray-600">Georeferenced establishment coordinates</p>
            </div>
          </div>
        </div>

      </section>

      <section id="learning-objectives">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Workshop Learning Objectives</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Callout type="tip" title="Data Management & Collection">
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Design effective movement questionnaires</li>
              <li>Build EpiCollect5 forms for field data capture</li>
              <li>Access data via API for automated workflows</li>
              <li>Clean and prepare movement data for analysis</li>
            </ul>
          </Callout>

          <Callout type="tip" title="Epidemiological Analysis">
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Link movement records to spatial reference data</li>
              <li>Visualise movement patterns across constituencies</li>
              <li>Build network graphs to identify high-risk pathways</li>
              <li>Calculate centrality measures for surveillance targeting</li>
            </ul>
          </Callout>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-orange-500 flex flex-col items-center gap-4">
          <p className="text-gray-700 text-center">Ready to start the workshop?</p>
          <Link
            to="/r-basics/session1"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium text-lg"
          >
            Begin Day 1: Introduction to R →
          </Link>
        </div>
      </section>
    </div>
  )
}
