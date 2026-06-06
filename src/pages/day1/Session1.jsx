import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'

export default function Day1Session1() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-namibia-gold bg-namibia-blue/10 px-2 py-1 rounded">Day 1 - Session 1</span>
        <h1 className="text-3xl font-bold text-namibia-blue mt-2 mb-2">Data Management Principles</h1>
        <p className="text-gray-600">Understanding the foundations of effective veterinary data collection</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Data Management Matters</h2>
        <p className="text-gray-700 mb-4">
          Good data management is the foundation of effective disease surveillance and control. 
          As veterinarians, the data you collect in the field directly impacts policy decisions, 
          resource allocation, and ultimately animal and public health outcomes.
        </p>
        
        <Callout type="info" title="The Data Quality Principle">
          <strong>Garbage in, garbage out.</strong> Even the most sophisticated analysis 
          cannot compensate for poor quality data collection. Investing time in proper 
          data management pays dividends throughout the entire surveillance chain.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Data Management Concepts</h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-namibia-blue mb-2">Data Types</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>Categorical:</strong> Species, disease status, zone</li>
              <li><strong>Numeric:</strong> Animal counts, GPS coordinates</li>
              <li><strong>Date/Time:</strong> Movement dates, sample collection</li>
              <li><strong>Text:</strong> Farm names, observations</li>
            </ul>
          </div>
          
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-namibia-blue mb-2">Data Quality Dimensions</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>Accuracy:</strong> Correct values recorded</li>
              <li><strong>Completeness:</strong> No missing required fields</li>
              <li><strong>Consistency:</strong> Same format throughout</li>
              <li><strong>Timeliness:</strong> Collected when needed</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Common Data Collection Challenges</h2>
        
        <div className="space-y-3">
          <div className="flex gap-3 p-3 bg-red-50 rounded-lg">
            <span className="text-red-500 font-bold">✗</span>
            <div>
              <p className="font-medium text-red-800">Inconsistent naming conventions</p>
              <p className="text-sm text-red-700">"Windhoek Farm" vs "Windhoek" vs "WINDHOEK FARM"</p>
            </div>
          </div>
          
          <div className="flex gap-3 p-3 bg-red-50 rounded-lg">
            <span className="text-red-500 font-bold">✗</span>
            <div>
              <p className="font-medium text-red-800">Free-text where dropdowns should be used</p>
              <p className="text-sm text-red-700">Spelling errors, inconsistent categories</p>
            </div>
          </div>
          
          <div className="flex gap-3 p-3 bg-red-50 rounded-lg">
            <span className="text-red-500 font-bold">✗</span>
            <div>
              <p className="font-medium text-red-800">Missing validation rules</p>
              <p className="text-sm text-red-700">Negative animal counts, future dates, impossible coordinates</p>
            </div>
          </div>
        </div>

        <Callout type="success" title="The Solution: Structured Data Collection">
          Using tools like EpiCollect5 allows us to enforce data quality at the point of collection 
          through dropdown menus, validation rules, and required fields.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">LITS Data Structure</h2>
        <p className="text-gray-700 mb-4">
          The Namibian LITS system captures several key data elements for each movement:
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-namibia-blue text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Field</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-200 px-3 py-2">Movement ID</td><td className="border border-gray-200 px-3 py-2">Text</td><td className="border border-gray-200 px-3 py-2">MOV-2025-00123</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Origin Farm ID</td><td className="border border-gray-200 px-3 py-2">Text</td><td className="border border-gray-200 px-3 py-2">NAM-KHO-0456</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Destination Farm ID</td><td className="border border-gray-200 px-3 py-2">Text</td><td className="border border-gray-200 px-3 py-2">NAM-WIN-0789</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Movement Date</td><td className="border border-gray-200 px-3 py-2">Date</td><td className="border border-gray-200 px-3 py-2">2025-03-15</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Species</td><td className="border border-gray-200 px-3 py-2">Category</td><td className="border border-gray-200 px-3 py-2">Cattle</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Animal Count</td><td className="border border-gray-200 px-3 py-2">Number</td><td className="border border-gray-200 px-3 py-2">45</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Purpose</td><td className="border border-gray-200 px-3 py-2">Category</td><td className="border border-gray-200 px-3 py-2">Slaughter</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Origin Zone</td><td className="border border-gray-200 px-3 py-2">Category</td><td className="border border-gray-200 px-3 py-2">FMD-Free</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Exercise title="Discussion Exercise">
        <p className="mb-3">In your experience with LITS data collection:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>What are the most common data quality issues you encounter?</li>
          <li>How do these issues affect your ability to trace animals during an outbreak?</li>
          <li>What improvements would you suggest for the current system?</li>
        </ol>
        <p className="mt-4 text-sm text-gray-500 italic">
          Take 10 minutes to discuss with your neighbor, then we'll share with the group.
        </p>
      </Exercise>

      <div className="flex justify-end">
        <a href="#/day1/session2" className="bg-namibia-blue text-white px-6 py-2 rounded-lg hover:bg-namibia-blue/90">
          Next: EpiCollect5 Overview →
        </a>
      </div>
    </div>
  )
}