import { Link } from 'react-router-dom'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'
import { Database, CheckCircle, AlertTriangle, FileSpreadsheet } from 'lucide-react'

export default function Day1Session1() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Day 3 - Session 1</span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">Data Management Principles</h1>
        <p className="text-gray-600">Understanding the foundations of effective veterinary data collection</p>
      </div>

      {/* Learning Objectives */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 p-6 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-3">Learning Objectives</h2>
        <p className="mb-3 text-white/90">By the end of this session, you will be able to:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
            <span>Understand the data management lifecycle and its importance in veterinary epidemiology</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
            <span>Identify data quality dimensions and common challenges in field data collection</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
            <span>Apply best practices for data standardization in the LITS context</span>
          </li>
        </ul>
      </div>

      {/* Opening Quote */}
      <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-namibia-gold italic">
        <p className="text-lg text-gray-700">
          "Data is like garbage. You'd better know what you are going to do with it before you collect it."
        </p>
        <p className="text-sm text-gray-500 mt-2">— Mark Twain</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What is Data Management?</h2>

        <div className="bg-white border-2 border-woah-orange rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            <strong className="text-woah-orange">Data Management</strong> is the practice of collecting, storing,
            organizing, maintaining, and using data securely and efficiently. For veterinary epidemiologists,
            it encompasses the entire lifecycle of surveillance and disease control data.
          </p>
        </div>

        <p className="text-gray-700 mb-4">
          Good data management is the foundation of effective disease surveillance and control.
          As veterinarians, the data you collect in the field directly impacts policy decisions,
          resource allocation, and ultimately animal and public health outcomes.
        </p>

        <KeyConcept title="Garbage In, Garbage Out (GIGO)">
          <p>
            Even the most sophisticated analysis cannot compensate for poor quality data collection.
            Investing time in proper data management <strong>at the point of collection</strong> pays
            dividends throughout the entire surveillance chain. It's much easier to prevent data quality
            issues than to fix them later.
          </p>
        </KeyConcept>
      </section>

      {/* Why Collect Data */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Collect Epidemiologic Data?</h2>
        <p className="text-gray-700 mb-4">
          Understanding the purpose of data collection helps ensure we collect the right data in the right way:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Disease Freedom Verification</h3>
            <p className="text-sm text-gray-600">
              Demonstrating absence of disease for trade purposes (e.g., FMD-free status, OIE dossiers)
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Prevalence & Incidence</h3>
            <p className="text-sm text-gray-600">
              Measuring how common diseases are and tracking new cases over time
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Risk Assessment</h3>
            <p className="text-sm text-gray-600">
              Identifying high-risk areas, seasons, or practices for targeted interventions
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Risk Factor Analysis</h3>
            <p className="text-sm text-gray-600">
              Understanding what factors increase disease occurrence (movement patterns, husbandry)
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Treatment & Control Efficacy</h3>
            <p className="text-sm text-gray-600">
              Evaluating whether interventions are working and adjusting strategies
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Resource Prioritization</h3>
            <p className="text-sm text-gray-600">
              Allocating limited veterinary resources where they'll have the most impact
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Monitoring Programs</h3>
            <p className="text-sm text-gray-600">
              Tracking long-term trends and detecting emerging issues early
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">International Reporting</h3>
            <p className="text-sm text-gray-600">
              Meeting obligations to OIE/WOAH and trade partners
            </p>
          </div>
        </div>
      </section>

      {/* Data Quality Dimensions */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Quality Dimensions</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-2">Accuracy</h3>
            <p className="text-sm text-green-700">Data correctly represents reality. The GPS point is where the farm actually is.</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-800 mb-2">Completeness</h3>
            <p className="text-sm text-blue-700">All required fields are filled. No missing values where data should exist.</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-bold text-purple-800 mb-2">Consistency</h3>
            <p className="text-sm text-purple-700">Same format throughout. "Cattle" not "cattle" or "CATTLE" or "Bovine".</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-bold text-orange-800 mb-2">Timeliness</h3>
            <p className="text-sm text-orange-700">Data collected and available when needed. Real-time or near-real-time for outbreaks.</p>
          </div>
        </div>
      </section>

      {/* Data Management Lifecycle */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Data Management Lifecycle</h2>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['Collection', 'Storage', 'Processing', 'Analysis', 'Sharing', 'Security'].map((stage, i) => (
            <div key={stage} className="flex items-center">
              <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium">
                {stage}
              </div>
              {i < 5 && <span className="text-orange-500 text-2xl mx-2">→</span>}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">1. Data Collection</h3>
            <p className="text-sm text-gray-600 mb-2">
              The foundation of everything. Includes outbreak investigations, lab submissions, disease reporting,
              active surveillance, animal movement records, and regulatory inspections.
            </p>
            <p className="text-sm text-gray-500 italic">Tools: Paper forms, EpiCollect5, LITS system, lab information systems</p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">2. Data Storage</h3>
            <p className="text-sm text-gray-600 mb-2">
              Where and how data is kept. Options include local (spreadsheets, desktop databases),
              cloud (Google Sheets, EpiCollect servers), or hybrid approaches.
            </p>
            <p className="text-sm text-gray-500 italic">Considerations: Backup, access control, data sovereignty</p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">3. Data Processing</h3>
            <p className="text-sm text-gray-600 mb-2">
              Cleaning, validation, and transformation. Fixing typos, standardizing names,
              converting formats, merging datasets.
            </p>
            <p className="text-sm text-gray-500 italic">This is often 80% of the work!</p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">4. Data Analysis</h3>
            <p className="text-sm text-gray-600 mb-2">
              Extracting insights. Descriptive statistics, visualization, spatial analysis,
              network analysis, predictive modeling.
            </p>
            <p className="text-sm text-gray-500 italic">Tools: R, Excel, QGIS, SaTScan</p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">5. Data Sharing</h3>
            <p className="text-sm text-gray-600 mb-2">
              Getting insights to stakeholders. Reports, dashboards, APIs, presentations,
              publications.
            </p>
            <p className="text-sm text-gray-500 italic">Consider: Who needs what, when, and in what format?</p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">6. Data Security</h3>
            <p className="text-sm text-gray-600 mb-2">
              Protecting sensitive information throughout the lifecycle. Access controls,
              encryption, audit logs, retention policies.
            </p>
            <p className="text-sm text-gray-500 italic">LITS data contains farm locations and owner details - handle with care!</p>
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Common Data Collection Challenges</h2>

        <div className="space-y-3">
          <div className="flex gap-3 p-3 bg-red-50 rounded-lg">
            <span className="text-red-500 font-bold text-xl">✗</span>
            <div>
              <p className="font-medium text-red-800">Inconsistent naming conventions</p>
              <p className="text-sm text-red-700">"Windhoek Farm" vs "Windhoek" vs "WINDHOEK FARM" - looks like 3 different places!</p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-red-50 rounded-lg">
            <span className="text-red-500 font-bold text-xl">✗</span>
            <div>
              <p className="font-medium text-red-800">Free-text where dropdowns should be used</p>
              <p className="text-sm text-red-700">Spelling errors, inconsistent categories make analysis impossible</p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-red-50 rounded-lg">
            <span className="text-red-500 font-bold text-xl">✗</span>
            <div>
              <p className="font-medium text-red-800">Missing validation rules</p>
              <p className="text-sm text-red-700">Negative animal counts, future dates, GPS coordinates in the ocean</p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-red-50 rounded-lg">
            <span className="text-red-500 font-bold text-xl">✗</span>
            <div>
              <p className="font-medium text-red-800">No required field enforcement</p>
              <p className="text-sm text-red-700">Critical fields left blank because they weren't mandatory</p>
            </div>
          </div>
        </div>

        <Callout type="success" title="The Solution: Structured Data Collection">
          Using tools like EpiCollect5 allows us to enforce data quality at the point of collection
          through dropdown menus, validation rules, required fields, and standardized formats.
          <strong> Prevention is better than cleaning!</strong>
        </Callout>
      </section>

      {/* LITS Data Structure */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">LITS Data Structure</h2>
        <p className="text-gray-700 mb-4">
          The Namibian Livestock Identification and Traceability System (LITS) captures several key data elements for each movement:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Field</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Example</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Quality Consideration</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-200 px-3 py-2">Movement ID</td><td className="border border-gray-200 px-3 py-2">Text</td><td className="border border-gray-200 px-3 py-2">MOV-2025-00123</td><td className="border border-gray-200 px-3 py-2">Auto-generated, unique</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Origin Farm ID</td><td className="border border-gray-200 px-3 py-2">Text</td><td className="border border-gray-200 px-3 py-2">NAM-KHO-0456</td><td className="border border-gray-200 px-3 py-2">Must exist in farm registry</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Destination Farm ID</td><td className="border border-gray-200 px-3 py-2">Text</td><td className="border border-gray-200 px-3 py-2">NAM-WIN-0789</td><td className="border border-gray-200 px-3 py-2">Must exist in farm registry</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Movement Date</td><td className="border border-gray-200 px-3 py-2">Date</td><td className="border border-gray-200 px-3 py-2">2025-03-15</td><td className="border border-gray-200 px-3 py-2">Cannot be in future</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Species</td><td className="border border-gray-200 px-3 py-2">Category</td><td className="border border-gray-200 px-3 py-2">Cattle</td><td className="border border-gray-200 px-3 py-2">Dropdown, standardized</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Animal Count</td><td className="border border-gray-200 px-3 py-2">Number</td><td className="border border-gray-200 px-3 py-2">45</td><td className="border border-gray-200 px-3 py-2">Positive integer only</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Purpose</td><td className="border border-gray-200 px-3 py-2">Category</td><td className="border border-gray-200 px-3 py-2">Slaughter</td><td className="border border-gray-200 px-3 py-2">Dropdown, standardized</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Origin Zone</td><td className="border border-gray-200 px-3 py-2">Category</td><td className="border border-gray-200 px-3 py-2">FMD-Free</td><td className="border border-gray-200 px-3 py-2">Critical for VCF compliance</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Discussion Questions */}
      <Exercise title="Discussion Exercise" type="group" duration="10 min">
        <p className="mb-3">Discuss with your group:</p>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>
            <strong>Data Collection:</strong> What are the most common data quality issues you encounter
            in your current LITS workflow?
          </li>
          <li>
            <strong>Impact:</strong> How have these data quality issues affected your ability to trace
            animals during an outbreak investigation?
          </li>
          <li>
            <strong>Improvement:</strong> If you could change one thing about how movement data is
            collected in your region, what would it be?
          </li>
          <li>
            <strong>Barriers:</strong> What prevents better data collection practices in the field?
            (connectivity, time, training, tools?)
          </li>
        </ol>
        <p className="mt-4 text-sm text-gray-500 italic">
          Take 15 minutes to discuss, then we'll share key insights with the group.
        </p>
      </Exercise>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link to="/day4/session1" className="text-orange-500 hover:underline">
          ← Previous: Visualization (ggplot2)
        </Link>
        <Link
          to="/day1/session2"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Next: EpiCollect5 Overview →
        </Link>
      </div>
    </div>
  )
}
