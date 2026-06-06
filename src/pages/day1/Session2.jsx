import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'

export default function Day1Session2() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-namibia-gold bg-namibia-blue/10 px-2 py-1 rounded">Day 1 - Session 2</span>
        <h1 className="text-3xl font-bold text-namibia-blue mt-2 mb-2">EpiCollect5 Overview</h1>
        <p className="text-gray-600">Mobile data collection for veterinary field work</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What is EpiCollect5?</h2>
        <p className="text-gray-700 mb-4">
          EpiCollect5 is a free, mobile data collection platform developed by Imperial College London. 
          It allows you to create custom data collection forms that work offline on smartphones and tablets, 
          with automatic synchronization when internet connectivity is available.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-bold text-gray-800">Mobile First</h3>
            <p className="text-sm text-gray-600">Works on iOS and Android devices</p>
          </div>
          <div className="bg-white border rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📡</div>
            <h3 className="font-bold text-gray-800">Offline Capable</h3>
            <p className="text-sm text-gray-600">Collect data without internet</p>
          </div>
          <div className="bg-white border rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🆓</div>
            <h3 className="font-bold text-gray-800">Free to Use</h3>
            <p className="text-sm text-gray-600">No subscription or license fees</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-namibia-blue mb-2">Form Builder</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Drag-and-drop interface for creating forms</li>
              <li>• Multiple question types: text, numbers, dropdowns, photos, GPS</li>
              <li>• Branching logic (show questions based on previous answers)</li>
              <li>• Validation rules (required fields, min/max values, regex patterns)</li>
            </ul>
          </div>
          
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-namibia-blue mb-2">Data Collection</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Automatic GPS capture</li>
              <li>• Photo and audio recording</li>
              <li>• Barcode/QR code scanning</li>
              <li>• Offline data storage with sync</li>
            </ul>
          </div>
          
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-namibia-blue mb-2">Data Management</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Web-based data viewing and export</li>
              <li>• Export to CSV, JSON for analysis</li>
              <li>• Built-in mapping of collected points</li>
              <li>• User management and access control</li>
            </ul>
          </div>
        </div>
      </section>

      <Callout type="tip" title="Perfect for Namibia">
        EpiCollect5 is ideal for veterinary field work in Namibia because:
        <ul className="list-disc list-inside mt-2">
          <li>Works offline in remote areas with no connectivity</li>
          <li>GPS capture helps map farm locations accurately</li>
          <li>Photo capability for documenting clinical signs</li>
          <li>Free - no ongoing costs for DVS</li>
        </ul>
      </Callout>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Question Types</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-namibia-blue text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Use Case</th>
                <th className="border border-gray-300 px-3 py-2 text-left">LITS Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Text</td><td className="border border-gray-200 px-3 py-2">Free-form input</td><td className="border border-gray-200 px-3 py-2">Farm owner name</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Number</td><td className="border border-gray-200 px-3 py-2">Numeric values</td><td className="border border-gray-200 px-3 py-2">Animal count</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Dropdown</td><td className="border border-gray-200 px-3 py-2">Select from list</td><td className="border border-gray-200 px-3 py-2">Species, Region</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Radio</td><td className="border border-gray-200 px-3 py-2">Single choice</td><td className="border border-gray-200 px-3 py-2">FMD zone status</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Checkbox</td><td className="border border-gray-200 px-3 py-2">Multiple choice</td><td className="border border-gray-200 px-3 py-2">Diseases observed</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Date</td><td className="border border-gray-200 px-3 py-2">Date picker</td><td className="border border-gray-200 px-3 py-2">Movement date</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Location</td><td className="border border-gray-200 px-3 py-2">GPS coordinates</td><td className="border border-gray-200 px-3 py-2">Farm location</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Photo</td><td className="border border-gray-200 px-3 py-2">Image capture</td><td className="border border-gray-200 px-3 py-2">Ear tag photo</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Barcode</td><td className="border border-gray-200 px-3 py-2">Scan codes</td><td className="border border-gray-200 px-3 py-2">Animal tag ID</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Exercise title="Hands-on: Create an EpiCollect5 Account">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Go to <a href="https://five.epicollect.net" className="text-namibia-blue underline" target="_blank">five.epicollect.net</a></li>
          <li>Click "Sign Up" and create an account (use your work email)</li>
          <li>Download the EpiCollect5 app on your smartphone</li>
          <li>Log in to the app with your new account</li>
        </ol>
        <p className="mt-4 text-sm text-gray-500 italic">
          In the next session, we'll start building a cattle movement inspection form.
        </p>
      </Exercise>

      <div className="flex justify-between">
        <a href="#/day1/session1" className="text-namibia-blue hover:underline">← Previous: Data Management</a>
        <a href="#/day2/session1" className="bg-namibia-blue text-white px-6 py-2 rounded-lg hover:bg-namibia-blue/90">
          Next: Field Testing & QA →
        </a>
      </div>
    </div>
  )
}