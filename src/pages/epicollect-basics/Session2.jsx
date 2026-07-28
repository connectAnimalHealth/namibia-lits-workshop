import { Link } from 'react-router-dom'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'
import { Smartphone, Wifi, WifiOff, DollarSign, Users, Lock, Globe, Database, Upload, Download, MapPin, Camera, Barcode, CheckCircle } from 'lucide-react'

export default function Day1Session2() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">Day 4 - Afternoon</span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">EpiCollect5 Overview</h1>
        <p className="text-gray-600">Mobile data collection for veterinary field work</p>
      </div>

      {/* Learning Objectives */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
        <h2 className="text-xl font-bold mb-3 text-orange-600">Learning Objectives</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
            <span>Understand the basics of EpiCollect5 and its applications in field data collection</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
            <span>Design and deploy data collection forms on mobile devices</span>
          </li>
        </ul>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What is EpiCollect5?</h2>
        <p className="text-gray-700 mb-4">
          EpiCollect5 is a <strong>free mobile and web application</strong> for easy data collection, developed by
          the Centre for Genomic Pathogen Surveillance at Imperial College London. It provides both web and
          mobile applications for creating forms (questionnaires) and freely hosted project websites for data collection.
        </p>

        <div className="bg-white border-2 border-woah-orange rounded-lg p-4 mb-6">
          <h3 className="font-bold text-woah-orange mb-3">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-2xl mb-2">1️⃣</div>
              <p><strong>Create</strong> projects using the web application at five.epicollect.net</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-2xl mb-2">2️⃣</div>
              <p><strong>Download</strong> the project to mobile devices for data collection</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-2xl mb-2">3️⃣</div>
              <p><strong>Sync</strong> data to the central server when internet is available</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white border rounded-lg p-4 text-center">
            <Smartphone className="h-8 w-8 mx-auto mb-2 text-woah-orange" />
            <h3 className="font-bold text-gray-800">Mobile First</h3>
            <p className="text-sm text-gray-600">Android (10+) and iOS (15+)</p>
          </div>
          <div className="bg-white border rounded-lg p-4 text-center">
            <WifiOff className="h-8 w-8 mx-auto mb-2 text-woah-green" />
            <h3 className="font-bold text-gray-800">Offline Capable</h3>
            <p className="text-sm text-gray-600">Collect data without internet</p>
          </div>
          <div className="bg-white border rounded-lg p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-woah-gold" />
            <h3 className="font-bold text-gray-800">Free to Use</h3>
            <p className="text-sm text-gray-600">No subscription or license fees</p>
          </div>
          <div className="bg-white border rounded-lg p-4 text-center">
            <Database className="h-8 w-8 mx-auto mb-2 text-woah-red" />
            <h3 className="font-bold text-gray-800">Cloud Hosted</h3>
            <p className="text-sm text-gray-600">Free server hosting included</p>
          </div>
        </div>
      </section>

      <KeyConcept title="Why EpiCollect5 for Veterinary Work?">
        <p>
          EpiCollect5 solves the key challenges of veterinary field data collection: it works <strong>offline</strong>
          in remote areas, captures <strong>GPS locations</strong> automatically, allows <strong>photo documentation</strong>,
          and most importantly - it <strong>standardises data at the point of collection</strong> through dropdowns
          and validation rules. This means cleaner data with less post-processing.
        </p>
      </KeyConcept>

      {/* Project Structure */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Structure</h2>
        <p className="text-gray-700 mb-4">
          Understanding how EpiCollect5 organizes data is essential for designing effective forms.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <div className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold text-center">
              PROJECT
              <div className="text-xs font-normal mt-1">e.g., "LITS Movement Inspection"</div>
            </div>
            <div className="text-2xl">→</div>
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-center">
              FORM(S)
              <div className="text-xs font-normal mt-1">Parent + optional Child forms</div>
            </div>
            <div className="text-2xl">→</div>
            <div className="bg-amber-500 text-white px-6 py-3 rounded-lg font-bold text-center">
              ENTRIES
              <div className="text-xs font-normal mt-1">Individual data records</div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Parent/Child Relationship:</strong> Projects can contain a parent form with up to 5 child forms,
            allowing multiple hierarchies of data. For example: ONE farm (parent) can have MANY animals (children).</p>
          </div>
        </div>
      </section>

      {/* Data Syncing */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Storage & Syncing</h2>

        <Callout type="warning" title="Hybrid Storage with Manual Syncing">
          Data is stored <strong>locally on your mobile device</strong> and must be <strong>manually uploaded</strong> to
          the server when you have internet access. This means:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Data is safe even if you lose connectivity in the field</li>
            <li>You control when data is uploaded (useful for reviewing entries first)</li>
            <li>You must remember to sync before clearing the app or switching devices</li>
          </ul>
        </Callout>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Download className="h-6 w-6 text-woah-orange" />
              <h3 className="font-bold text-gray-800">Download Project</h3>
            </div>
            <p className="text-sm text-gray-600">
              Projects you create are available on your mobile when logged in to the same account,
              or if you have been granted access to an existing project.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Upload className="h-6 w-6 text-woah-green" />
              <h3 className="font-bold text-gray-800">Upload Entries</h3>
            </div>
            <p className="text-sm text-gray-600">
              Manually upload entries when you have connectivity. Editing data on mobile
              and re-uploading will update the web data.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Settings */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Privacy & Access Control</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="border-2 border-red-300 bg-red-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-red-600" />
              <h3 className="font-bold text-red-800">Public Projects</h3>
            </div>
            <p className="text-sm text-gray-700">Anyone can see your data. <strong>Not recommended</strong> for veterinary data containing sensitive information.</p>
          </div>
          <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-green-600" />
              <h3 className="font-bold text-green-800">Private Projects (Recommended)</h3>
            </div>
            <p className="text-sm text-gray-700">Only people you grant access to can view data. <strong>Always use for DVS projects.</strong></p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Users sign in with Google, Apple, or generic email accounts. See the
          <a href="https://docs.epicollect.net/about/privacy-policy" className="text-woah-orange underline ml-1" target="_blank">
            EpiCollect5 privacy policy
          </a> for details.
        </p>
      </section>

      {/* User Roles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Roles & Permissions</h2>
        <p className="text-gray-700 mb-4">
          EpiCollect5 has five user roles with different levels of access. Understanding these is crucial for managing your DVS team.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Role</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-3 py-2 text-left">LITS Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-bold text-woah-orange">CREATOR</td>
                <td className="border border-gray-200 px-3 py-2">Full access including viewing, editing, deleting data and managing all user types except other creators</td>
                <td className="border border-gray-200 px-3 py-2">DVS IT Administrator</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-bold text-woah-orange">MANAGER</td>
                <td className="border border-gray-200 px-3 py-2">Full access to data, can alter project settings and add/remove curators and collectors</td>
                <td className="border border-gray-200 px-3 py-2">Regional Veterinary Officer</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-bold text-woah-orange">CURATOR</td>
                <td className="border border-gray-200 px-3 py-2">High access for viewing, editing, uploading data. Cannot alter settings or add users</td>
                <td className="border border-gray-200 px-3 py-2">State Veterinarian</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-bold text-woah-orange">COLLECTOR</td>
                <td className="border border-gray-200 px-3 py-2">Basic access - can only view and upload <strong>their own data</strong></td>
                <td className="border border-gray-200 px-3 py-2">Animal Health Technician</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-bold text-woah-orange">VIEWER</td>
                <td className="border border-gray-200 px-3 py-2">Read-only access to all data. Cannot make any changes</td>
                <td className="border border-gray-200 px-3 py-2">External Auditor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Form Builder</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Drag-and-drop interface for creating forms</li>
              <li>• Single form or multi-form surveys (up to 5 hierarchy forms)</li>
              <li>• Branching logic (show questions based on previous answers)</li>
              <li>• Groups (multiple questions on the same page)</li>
              <li>• Validation rules (required fields, regex patterns)</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Data Collection</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• GPS location capture with accuracy</li>
              <li>• Photo, video, and audio recording</li>
              <li>• Barcode/QR code scanning</li>
              <li>• Offline data storage with sync</li>
              <li>• Double entry verification for critical fields</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Data Management</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Web-based data viewing and editing</li>
              <li>• Export to CSV or JSON format</li>
              <li>• Built-in mapping of collected points</li>
              <li>• User management and access control</li>
              <li>• Project cloning and sharing</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Integration</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Data mapping to fit existing systems</li>
              <li>• Export data via REST API</li>
              <li>• CSV import for dropdown options</li>
              <li>• Bulk data uploads</li>
              <li>• Form import/export between projects</li>
            </ul>
          </div>
        </div>
      </section>

      <Callout type="tip" title="Perfect for Veterinary Field Work in Namibia">
        EpiCollect5 is ideal for veterinary field work in Namibia because:
        <ul className="list-disc list-inside mt-2">
          <li>Works offline in remote areas with no connectivity</li>
          <li>GPS capture helps map farm and checkpoint locations accurately</li>
          <li>Barcode scanning for animal tags and movement permits</li>
          <li>Photo capability for documenting clinical signs</li>
          <li>Free to use</li>
        </ul>
      </Callout>

      {/* Question Types */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Question Types (Input Types)</h2>
        <p className="text-gray-700 mb-4">
          Each field in your paper form must be mapped to an appropriate data type in EpiCollect5.
          By default, each input is shown on a single screen on the mobile app (use Groups for multiple questions per page).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-3 py-2 text-left">LITS Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Text</td><td className="border border-gray-200 px-3 py-2">Free-form text input (up to 255 chars)</td><td className="border border-gray-200 px-3 py-2">Farm owner name</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Numeric</td><td className="border border-gray-200 px-3 py-2">Numbers only with numeric keyboard</td><td className="border border-gray-200 px-3 py-2">Animal count</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Phone</td><td className="border border-gray-200 px-3 py-2">Phone keyboard layout (up to 255 chars)</td><td className="border border-gray-200 px-3 py-2">Owner contact number</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Text Box</td><td className="border border-gray-200 px-3 py-2">Multi-line text (up to 1000 chars)</td><td className="border border-gray-200 px-3 py-2">Clinical observations</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Dropdown</td><td className="border border-gray-200 px-3 py-2">Select single option from list</td><td className="border border-gray-200 px-3 py-2">Species, Region, FMD Zone</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Radio</td><td className="border border-gray-200 px-3 py-2">Single choice from visible options</td><td className="border border-gray-200 px-3 py-2">Movement type (In/Out)</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Checkbox</td><td className="border border-gray-200 px-3 py-2">Multiple selections allowed</td><td className="border border-gray-200 px-3 py-2">Diseases observed</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Search</td><td className="border border-gray-200 px-3 py-2">Searchable dropdown for long lists</td><td className="border border-gray-200 px-3 py-2">Breed selection</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Date</td><td className="border border-gray-200 px-3 py-2">Date picker (can default to current date)</td><td className="border border-gray-200 px-3 py-2">Movement date</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Time</td><td className="border border-gray-200 px-3 py-2">Time picker</td><td className="border border-gray-200 px-3 py-2">Inspection time</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Location</td><td className="border border-gray-200 px-3 py-2">GPS coordinates with accuracy</td><td className="border border-gray-200 px-3 py-2">Farm/checkpoint location</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Photo</td><td className="border border-gray-200 px-3 py-2">Capture or select image</td><td className="border border-gray-200 px-3 py-2">Ear tag photo, permit photo</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Audio</td><td className="border border-gray-200 px-3 py-2">Voice recording</td><td className="border border-gray-200 px-3 py-2">Verbal statement</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Video</td><td className="border border-gray-200 px-3 py-2">Video recording</td><td className="border border-gray-200 px-3 py-2">Clinical signs documentation</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Barcode</td><td className="border border-gray-200 px-3 py-2">Scan barcodes/QR codes</td><td className="border border-gray-200 px-3 py-2">Animal tag ID, permit number</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Branch</td><td className="border border-gray-200 px-3 py-2">Dynamic sub-list (multiple entries)</td><td className="border border-gray-200 px-3 py-2">List of animals per movement</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2 font-medium">Group</td><td className="border border-gray-200 px-3 py-2">Multiple questions on one page</td><td className="border border-gray-200 px-3 py-2">Owner details section</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2 font-medium">Readme</td><td className="border border-gray-200 px-3 py-2">Display-only instructions</td><td className="border border-gray-200 px-3 py-2">Section headers, guidance</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Data Quality Features */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Quality Features</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border-2 border-namibia-green rounded-lg p-4">
            <h3 className="font-bold text-woah-green mb-2">Validation with REGEX</h3>
            <p className="text-sm text-gray-700 mb-2">
              Use regular expressions to ensure data is captured correctly. For example:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Email format: <code className="bg-gray-100 px-1 rounded">^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$</code></li>
              <li>• Namibian ID: <code className="bg-gray-100 px-1 rounded">^[0-9]{11}$</code></li>
              <li>• Phone number: <code className="bg-gray-100 px-1 rounded">^(\+264|0)[0-9]{9}$</code></li>
            </ul>
          </div>

          <div className="bg-white border-2 border-woah-orange rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Double Entry Verification</h3>
            <p className="text-sm text-gray-700">
              For critical fields (like email addresses or ID numbers), require the user to enter the value twice.
              The entry cannot proceed until both values match. This catches typos before data is saved.
            </p>
          </div>

          <div className="bg-white border-2 border-namibia-gold rounded-lg p-4">
            <h3 className="font-bold text-woah-gold mb-2">Dropdown Standardisation</h3>
            <p className="text-sm text-gray-700">
              Use dropdowns instead of free text wherever possible to ensure standardized data.
              <strong> Always include an "Unknown" or "Other" option</strong> for edge cases.
              Options can be imported from CSV files for long lists.
            </p>
          </div>

          <div className="bg-white border-2 border-namibia-red rounded-lg p-4">
            <h3 className="font-bold text-woah-red mb-2">Required Fields</h3>
            <p className="text-sm text-gray-700">
              Mark essential fields as required to ensure data completeness.
              The form cannot be submitted until all required fields are completed.
              Use sparingly - only for truly essential data.
            </p>
          </div>
        </div>
      </section>

      {/* Form Builder Overview */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Form Builder Interface</h2>
        <p className="text-gray-700 mb-4">
          The form builder has three main sections:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-lg p-4 text-center">
            <div className="bg-gray-100 h-24 rounded mb-3 flex items-center justify-center text-gray-500">
              Left Column
            </div>
            <h3 className="font-bold text-gray-800">Available Inputs</h3>
            <p className="text-sm text-gray-600">All data types you can add to your form</p>
          </div>
          <div className="bg-white border rounded-lg p-4 text-center">
            <div className="bg-woah-orange/10 h-24 rounded mb-3 flex items-center justify-center text-gray-500">
              Middle Column
            </div>
            <h3 className="font-bold text-gray-800">Form Structure</h3>
            <p className="text-sm text-gray-600">Inputs added to your form in order</p>
          </div>
          <div className="bg-white border rounded-lg p-4 text-center">
            <div className="bg-woah-green/10 h-24 rounded mb-3 flex items-center justify-center text-gray-500">
              Right Column
            </div>
            <h3 className="font-bold text-gray-800">Input Settings</h3>
            <p className="text-sm text-gray-600">Configure the selected input</p>
          </div>
        </div>

        <Callout type="info" title="Input Settings">
          For each input, you can configure:
          <ul className="list-disc list-inside mt-2">
            <li><strong>Question:</strong> The prompt shown to the user</li>
            <li><strong>Answer is required:</strong> Whether the field must be completed</li>
            <li><strong>Use answer as title:</strong> Use this value to identify the entry</li>
            <li><strong>Initial answer:</strong> Pre-fill with a default value (data standardisation)</li>
            <li><strong>Jumps (IF-ELSE):</strong> Conditional logic based on answers</li>
          </ul>
        </Callout>
      </section>

      {/* Parent/Child Forms */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Parent & Child Forms</h2>
        <p className="text-gray-700 mb-4">
          For complex data relationships, use parent and child forms. This is essential for LITS data where
          ONE movement permit can contain MANY animals.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-3">Example: LITS Movement Structure</h3>
          <div className="space-y-2">
            <div className="bg-orange-500 text-white p-3 rounded">
              <strong>Parent Form: Movement Permit</strong>
              <p className="text-sm mt-1">Permit number, date, origin farm, destination farm, inspector details</p>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-gray-500">↓ One-to-Many ↓</span>
            </div>
            <div className="bg-green-600 text-white p-3 rounded">
              <strong>Child Form: Animal Details</strong>
              <p className="text-sm mt-1">Tag number, species, breed, sex, age - linked to parent permit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Export */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Accessing Your Data</h2>
        <p className="text-gray-700 mb-4">
          Data can be accessed through the web interface or exported for analysis in R or other tools.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">View Online</h3>
            <p className="text-sm text-gray-600">
              View data in tables, edit entries, see map of locations,
              filter and sort entries directly in the web interface.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Download CSV</h3>
            <p className="text-sm text-gray-600">
              Export data as CSV files for analysis in R or Excel.
              Parent and child forms are exported as separate CSV files in a ZIP archive.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">API Access</h3>
            <p className="text-sm text-gray-600">
              Use the REST API to programmatically fetch data into R scripts
              for automated reporting and dashboards. (Covered later in the course)
            </p>
          </div>
        </div>
      </section>

      <Exercise title="Hands-on: Create an EpiCollect5 Account" type="individual" duration="10 min">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Go to <a href="https://five.epicollect.net" className="text-woah-orange underline" target="_blank">five.epicollect.net</a></li>
          <li>Click "Sign Up" and create an account (use your work email)</li>
          <li>Download the EpiCollect5 app on your smartphone:
            <ul className="list-disc list-inside ml-6 mt-1 text-sm text-gray-600">
              <li>Android: Google Play Store</li>
              <li>iOS: Apple App Store</li>
            </ul>
          </li>
          <li>Log in to the app with your new account</li>
          <li>Explore the interface - note "My Projects", "Create Project", "Find Project"</li>
        </ol>
        <p className="mt-4 text-sm text-gray-500 italic">
          In the next session, we'll start building a cattle movement inspection form for livestock traceability.
        </p>
      </Exercise>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link to="/epicollect-basics/session1" className="text-orange-500 hover:underline">
          ← Previous: Data Management
        </Link>
        <Link
          to="/epicollect-basics/session3"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Next: Building Forms →
        </Link>
      </div>
    </div>
  )
}
