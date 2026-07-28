import { Link } from 'react-router-dom'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'
import CodeBlock from '../../components/CodeBlock'
import { Plus, Settings, Save, CheckCircle, AlertTriangle, ArrowRight, GitBranch, Tag, Barcode, User, Calendar, RefreshCw } from 'lucide-react'

export default function Day1Session3() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">Day 4 - Afternoon</span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">Building the LITS Cattle Registration Form</h1>
        <p className="text-gray-600">Hands-on practical: Creating a digital form for individual cattle registration in NAMLITS</p>
      </div>

      {/* Learning Objectives */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
        <h2 className="text-xl font-bold mb-3">Session Objectives</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
            <span>Build a cattle registration form matching the LITS registration card</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
            <span>Use barcode scanning for eartag capture</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
            <span>Implement conditional logic for replacement tag scenarios</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
            <span>Link registrations to livestock keepers and establishments</span>
          </li>
        </ul>
      </div>

      {/* Form Overview */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Form Structure Overview</h2>
        <p className="text-gray-700 mb-4">
          This form digitizes the <strong>LITS Registration Card</strong> for registering individual cattle.
          Each animal gets a unique eartag and is linked to a livestock keeper and their establishment.
        </p>

        <div className="grid md:grid-cols-4 gap-2 mb-4">
          <div className="bg-white border-2 border-woah-orange rounded-lg p-3 text-center">
            <Tag className="h-6 w-6 text-woah-orange mx-auto mb-1" />
            <div className="text-xs font-bold text-woah-orange">Section 1</div>
            <div className="text-xs text-gray-600">Animal Details</div>
          </div>
          <div className="bg-white border-2 border-namibia-green rounded-lg p-3 text-center">
            <Barcode className="h-6 w-6 text-woah-green mx-auto mb-1" />
            <div className="text-xs font-bold text-woah-green">Section 2</div>
            <div className="text-xs text-gray-600">Eartag & ID</div>
          </div>
          <div className="bg-white border-2 border-blue-500 rounded-lg p-3 text-center">
            <User className="h-6 w-6 text-blue-500 mx-auto mb-1" />
            <div className="text-xs font-bold text-blue-500">Section 3</div>
            <div className="text-xs text-gray-600">Owner & Location</div>
          </div>
          <div className="bg-white border-2 border-purple-500 rounded-lg p-3 text-center">
            <RefreshCw className="h-6 w-6 text-purple-500 mx-auto mb-1" />
            <div className="text-xs font-bold text-purple-500">Section 4</div>
            <div className="text-xs text-gray-600">Replacement Tag</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Conditional Navigation (Jump Rules)
          </h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• If <strong>"Is this a replacement tag?"</strong> = <strong>No</strong> → Skip Section 4 (End form)</li>
            <li>• If <strong>"Is this a replacement tag?"</strong> = <strong>Yes</strong> → Show old tag capture section</li>
            <li>• If replacement but <strong>"Old tag available?"</strong> = <strong>No</strong> → Treated as new registration</li>
          </ul>
        </div>

      </section>

      {/* Step 1: Create Project */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 1: Create a New Project</h2>

        <div className="bg-white border-2 border-woah-orange rounded-lg p-4 mb-4">
          <h3 className="font-bold text-woah-orange mb-3 flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Creating Your Project
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span>Go to <a href="https://five.epicollect.net" className="text-woah-orange underline" target="_blank" rel="noreferrer">five.epicollect.net</a> and log in</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <span>Click <strong>"Create Project"</strong> in the top navigation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <span>Enter project details:
                <ul className="list-disc list-inside ml-4 mt-1 text-sm text-gray-600">
                  <li><strong>Project name:</strong> LITS_Cattle_Registration_YourName</li>
                  <li><strong>Small description:</strong> "Individual cattle registration for NAMLITS"</li>
                  <li><strong>Form name:</strong> cattleRegistration</li>
                </ul>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
              <span>Set <strong>Access</strong> to <strong>Private</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
              <span>Click <strong>CREATE</strong></span>
            </li>
          </ol>
        </div>

        <Callout type="info" title="Form Introduction">
          Consider adding a <strong>README</strong> input at the start of your form to display:
          <em className="block mt-2 text-sm">"LITS Cattle Registration Form - Use this form to register individual cattle with new eartags. Scan the eartag barcode and enter animal details."</em>
        </Callout>
      </section>

      {/* Section 1: Animal Details */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-woah-orange">Section 1:</span> Animal Details
        </h2>

        <p className="text-gray-700 mb-4">
          This section captures the basic information about the animal being registered.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Question</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Required</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Options/Settings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2">1</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Animal Type</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Beef, Dairy</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">2</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Class (Sex)</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Bull, Cow, Heifer, Steer, Calf (Male), Calf (Female)</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">3</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Breed</td>
                <td className="border border-gray-200 px-3 py-2">Search</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Searchable list (see breed list below)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">4</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Date of Birth</td>
                <td className="border border-gray-200 px-3 py-2">Date</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Cannot be future date</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Class Options Explained</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>Bull:</strong> Intact adult male</div>
              <div><strong>Cow:</strong> Adult female that has calved</div>
              <div><strong>Heifer:</strong> Young female, not yet calved</div>
              <div><strong>Steer:</strong> Castrated male</div>
              <div><strong>Calf (Male/Female):</strong> Young animal &lt; 12 months</div>
            </div>
          </div>

          <div className="bg-white border-2 border-amber-400 rounded-lg p-4">
            <h3 className="font-bold text-amber-700 mb-2">Importing Breeds from CSV</h3>
            <p className="text-sm text-gray-600 mb-2">
              Instead of typing 30+ breeds manually, import from a CSV file!
            </p>
            <p className="text-xs text-gray-500">
              Download the breeds list and import into your dropdown.
            </p>
          </div>
        </div>

        {/* CSV Import Section */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
          <h3 className="font-bold text-amber-800 mb-3">Importing Dropdown Options from CSV</h3>

          <p className="text-gray-700 mb-3">
            For long lists like breeds, you can import options from a CSV file instead of typing them one by one.
            We've prepared a breeds list for you:
          </p>

          <div className="bg-white rounded p-3 mb-4">
            <p className="text-sm text-gray-600 mb-1"><strong>Breeds CSV URL:</strong></p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded block overflow-x-auto">
              https://d3d5ylilft9tmx.cloudfront.net/namibia-lits-workshop/data/cattle_breeds.csv
            </code>
          </div>

          <h4 className="font-bold text-amber-700 mb-2">How to Import:</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Download the CSV file from the link above (or create your own)</li>
            <li>In your EpiCollect5 form, add a <strong>Dropdown</strong> or <strong>Search</strong> input</li>
            <li>In the input settings (right panel), find <strong>"Possible Answers"</strong></li>
            <li>Click the <strong>Import</strong> button (upload icon)</li>
            <li>Select your CSV file - options will be populated automatically</li>
          </ol>

          <div className="mt-4 p-3 bg-white rounded border border-amber-200">
            <p className="text-sm text-gray-600">
              <strong>CSV Format:</strong> Simple single-column CSV with a header row. Each row is one dropdown option.
            </p>
            <pre className="bg-gray-800 text-gray-100 p-2 rounded mt-2 text-xs">
{`breed_name
Afrikaner
Bonsmara
Brahman
...`}
            </pre>
          </div>
        </div>
      </section>

      {/* Section 2: Eartag & ID */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-woah-green">Section 2:</span> Eartag & Identification
        </h2>

        <p className="text-gray-700 mb-4">
          This section captures the unique eartag identifier using <strong>barcode scanning</strong>.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Question</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Required</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Options/Settings</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-50">
                <td className="border border-gray-200 px-3 py-2">5</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Card Number</td>
                <td className="border border-gray-200 px-3 py-2">Text</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">e.g., HQ132077<br/><span className="text-blue-600">Regex: <code className="bg-gray-100 px-1">^HQ\d{'{6}'}$</code></span></td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">6</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Eartag Barcode</td>
                <td className="border border-gray-200 px-3 py-2">Barcode</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Scans barcode on eartag card</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">7</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Registration Date</td>
                <td className="border border-gray-200 px-3 py-2">Date</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Default to today's date</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="tip" title="Barcode Scanning Best Practices">
          <ul className="list-disc list-inside space-y-1">
            <li>Hold the phone steady, 15-20cm from the barcode</li>
            <li>Ensure good lighting - avoid shadows on the barcode</li>
            <li>If scan fails, you can manually type the number</li>
            <li>The barcode captures the full eartag number automatically</li>
          </ul>
        </Callout>
      </section>

      {/* Section 3: Owner & Location */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-blue-600">Section 3:</span> Owner & Location
        </h2>

        <p className="text-gray-700 mb-4">
          Links the animal to its owner (livestock keeper) and the establishment where it is registered.
          Note: A livestock keeper may own multiple establishments.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Question</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Required</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Options/Settings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2">8</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Livestock Keeper</td>
                <td className="border border-gray-200 px-3 py-2">Text</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Name or LITS keeper ID</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">9</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Farm/Establishment Name</td>
                <td className="border border-gray-200 px-3 py-2">Text</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Where animal is when registered</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-800 mb-2">Livestock Keeper</h3>
          <p className="text-sm text-blue-700">
            Enter the name or ID of the animal owner as shown on the registration card.
            In a production system, this could be a <strong>Search</strong> input that looks up
            existing keepers from the LITS database.
          </p>
        </div>
      </section>

      {/* Section 4: Replacement Tag */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-purple-600">Section 4:</span> Replacement Tag (Conditional)
        </h2>

        <p className="text-gray-700 mb-4">
          This section only appears if the registration is for a <strong>replacement tag</strong> (e.g., lost or damaged tag).
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Question</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Required</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Options/Settings</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-yellow-50">
                <td className="border border-gray-200 px-3 py-2">10</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Is this a replacement tag?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No<br/><span className="text-blue-600 font-bold">Jump: If No → END</span></td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">11</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Old Tag Number</td>
                <td className="border border-gray-200 px-3 py-2">Barcode</td>
                <td className="border border-gray-200 px-3 py-2 text-center">Conditional</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Scan or type old eartag number</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">12</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Reason (Tag not used)</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Damaged, Lost, Faulty (select all that apply)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-bold text-purple-800 mb-2">Replacement Scenarios</h3>
            <ul className="text-sm text-purple-700 space-y-2">
              <li><strong>Damaged:</strong> Tag is physically broken or unreadable</li>
              <li><strong>Lost:</strong> Tag fell off or was removed - animal has no tag</li>
              <li><strong>Faulty:</strong> Tag was defective from purchase</li>
            </ul>
            <p className="text-xs text-purple-600 mt-2">Multiple reasons can be selected if applicable.</p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Setting Up Jump Rules</h3>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Select "Is this a replacement tag?"</li>
              <li>In right panel, find "Jumps"</li>
              <li>Click "+ ADD JUMP"</li>
              <li>When answer is "No" → Jump to "End of form"</li>
              <li>This skips the old tag questions entirely</li>
            </ol>
          </div>
        </div>

        <Callout type="warning" title="Important: Replacement Without Old Tag">
          If a farmer requests a replacement tag but <strong>cannot provide the old tag number</strong>,
          the registration is treated as a <strong>new registration</strong>. This is important for
          traceability - we cannot assume which animal had the lost tag.
        </Callout>
      </section>

      {/* Complete Form Summary */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Form Summary</h2>

        <div className="bg-white border-2 border-woah-orange rounded-lg p-4 mb-4">
          <h3 className="font-bold text-woah-orange mb-3">All 12 Fields at a Glance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-2 py-1 text-left">#</th>
                  <th className="border border-gray-200 px-2 py-1 text-left">Field</th>
                  <th className="border border-gray-200 px-2 py-1 text-left">Type</th>
                  <th className="border border-gray-200 px-2 py-1 text-left">Section</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr><td className="border border-gray-200 px-2 py-1">1</td><td className="border border-gray-200 px-2 py-1">Animal Type</td><td className="border border-gray-200 px-2 py-1">Radio</td><td className="border border-gray-200 px-2 py-1 text-orange-600">Animal Details</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-200 px-2 py-1">2</td><td className="border border-gray-200 px-2 py-1">Class (Sex)</td><td className="border border-gray-200 px-2 py-1">Dropdown</td><td className="border border-gray-200 px-2 py-1 text-orange-600">Animal Details</td></tr>
                <tr><td className="border border-gray-200 px-2 py-1">3</td><td className="border border-gray-200 px-2 py-1">Breed</td><td className="border border-gray-200 px-2 py-1">Search</td><td className="border border-gray-200 px-2 py-1 text-orange-600">Animal Details</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-200 px-2 py-1">4</td><td className="border border-gray-200 px-2 py-1">Date of Birth</td><td className="border border-gray-200 px-2 py-1">Date</td><td className="border border-gray-200 px-2 py-1 text-orange-600">Animal Details</td></tr>
                <tr className="bg-green-50"><td className="border border-gray-200 px-2 py-1">5</td><td className="border border-gray-200 px-2 py-1">Card Number</td><td className="border border-gray-200 px-2 py-1">Text</td><td className="border border-gray-200 px-2 py-1 text-green-600">Eartag & ID</td></tr>
                <tr className="bg-green-50"><td className="border border-gray-200 px-2 py-1">6</td><td className="border border-gray-200 px-2 py-1">Eartag Barcode</td><td className="border border-gray-200 px-2 py-1">Barcode</td><td className="border border-gray-200 px-2 py-1 text-green-600">Eartag & ID</td></tr>
                <tr className="bg-green-50"><td className="border border-gray-200 px-2 py-1">7</td><td className="border border-gray-200 px-2 py-1">Registration Date</td><td className="border border-gray-200 px-2 py-1">Date</td><td className="border border-gray-200 px-2 py-1 text-green-600">Eartag & ID</td></tr>
                <tr className="bg-blue-50"><td className="border border-gray-200 px-2 py-1">8</td><td className="border border-gray-200 px-2 py-1">Livestock Keeper</td><td className="border border-gray-200 px-2 py-1">Text</td><td className="border border-gray-200 px-2 py-1 text-blue-600">Owner & Location</td></tr>
                <tr className="bg-blue-50"><td className="border border-gray-200 px-2 py-1">9</td><td className="border border-gray-200 px-2 py-1">Farm/Establishment</td><td className="border border-gray-200 px-2 py-1">Text</td><td className="border border-gray-200 px-2 py-1 text-blue-600">Owner & Location</td></tr>
                <tr className="bg-purple-50"><td className="border border-gray-200 px-2 py-1">10</td><td className="border border-gray-200 px-2 py-1">Is Replacement Tag?</td><td className="border border-gray-200 px-2 py-1">Radio</td><td className="border border-gray-200 px-2 py-1 text-purple-600">Replacement</td></tr>
                <tr className="bg-purple-50"><td className="border border-gray-200 px-2 py-1">11</td><td className="border border-gray-200 px-2 py-1">Old Tag Number</td><td className="border border-gray-200 px-2 py-1">Barcode</td><td className="border border-gray-200 px-2 py-1 text-purple-600">Replacement</td></tr>
                <tr className="bg-purple-50"><td className="border border-gray-200 px-2 py-1">12</td><td className="border border-gray-200 px-2 py-1">Reason (Tag not used)</td><td className="border border-gray-200 px-2 py-1">Checkbox</td><td className="border border-gray-200 px-2 py-1 text-purple-600">Replacement</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* BONUS: Downloading Data via API */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded mr-2">BONUS</span>
          Downloading Data via the EpiCollect5 API
        </h2>

        <p className="text-gray-700 mb-4">
          Instead of manually downloading CSV files from the web interface, you can use R to fetch data directly from EpiCollect5.
          This allows for <strong>automated reports</strong> and <strong>live dashboards</strong>.
        </p>

        <div className="bg-white border-2 border-green-500 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-green-700 mb-3">Step 1: Get Your API Credentials</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Go to your project on <a href="https://five.epicollect.net" className="text-woah-orange underline" target="_blank" rel="noreferrer">five.epicollect.net</a></li>
            <li>Click <strong>Project Details</strong> (gear icon)</li>
            <li>Go to the <strong>Developers</strong> tab</li>
            <li>Click <strong>Create Client App</strong></li>
            <li>Copy the <strong>Client ID</strong>, <strong>Client Secret</strong>, and <strong>form_ref</strong></li>
          </ol>
        </div>

        <CodeBlock
          title="Step 2: Authenticate and Fetch Data"
          language="r"
          code={`# Load packages
library(httr)
library(jsonlite)

# Your credentials (keep these secret!)
client_id <- "YOUR_CLIENT_ID"
client_secret <- "YOUR_CLIENT_SECRET"
project_slug <- "your-project-slug"
form_ref <- "YOUR_FORM_REF"

# Get access token
res <- POST("https://five.epicollect.net/api/oauth/token",
            body = list(
              grant_type = "client_credentials",
              client_id = client_id,
              client_secret = client_secret
            ))

token <- content(res)$access_token

# Fetch entries as CSV (uses your project's default mapping)
url <- paste0(
  "https://five.epicollect.net/api/export/entries/",
  project_slug,
  "?form_ref=", form_ref,
  "&format=csv",
  "&headers=true"
)
# Note: Add &map_index=0 for EC5_AUTO, or &map_index=1,2,... for custom mappings

response <- GET(url, add_headers(
  "Authorization" = paste("Bearer", token)
))

# Parse the CSV data
csv_text <- content(response, "text", encoding = "UTF-8")
entries <- read.csv(text = csv_text, check.names = FALSE)

# View your data!
head(entries)
str(entries)`}
        />

        <Callout type="tip" title="Avoid 'X' Prefix on Column Names">
          Use <code className="bg-gray-100 px-1 rounded">check.names = FALSE</code> in <code className="bg-gray-100 px-1 rounded">read.csv()</code> to prevent R from adding "X" to columns that start with numbers (e.g., "X2_Livestock_Keeper" instead of "2_Livestock_Keeper").
        </Callout>

        <Callout type="warning" title="Keep Secrets Safe">
          Never commit your <code>client_secret</code> to GitHub or share it publicly.
          Store credentials in a separate file that's in your <code>.gitignore</code>.
        </Callout>
      </section>

      {/* API Field Mapping - BONUS */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="bg-amber-100 text-amber-800 text-sm px-2 py-1 rounded mr-2">BONUS</span>
          API Field Mapping
        </h2>

        <p className="text-gray-700 mb-4">
          When you download data from EpiCollect5, the column names are based on your field names
          but formatted as "slugs". You can <strong>create custom mappings</strong> in EpiCollect5 to get friendlier column names.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-green-800 mb-2">Custom Mapping in EpiCollect5</h3>
          <p className="text-sm text-green-700 mb-2">
            Instead of dealing with auto-generated column names like <code className="bg-white px-1 rounded">1_animal_type</code>,
            create a custom mapping with your own column names and value codes!
          </p>
          <ol className="list-decimal list-inside text-sm text-green-700 space-y-1">
            <li>Go to <strong>Map Data</strong> in the left menu</li>
            <li>Click <strong>"Add mapping +"</strong> to create a new mapping</li>
            <li>For each field, edit the <strong>"Mapping To"</strong> column with your preferred name</li>
            <li>For dropdowns/radio buttons, you can also map <strong>values</strong> (e.g., Yes → 1, No → 0)</li>
            <li>Click <strong>MAKE DEFAULT</strong> to use this mapping when downloading data</li>
            <li>Click <strong>UPDATE</strong> to save your changes</li>
          </ol>
          <div className="mt-3 p-2 bg-white rounded border border-green-200 text-xs text-green-700">
            <strong>Example:</strong> Map "Date of vaccination" → "vac_date", "Dogs Vaccinated" → "dog_count"
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          Here's an example of default mapping (column names generated by EpiCollect5):
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Form Field (Human)</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Default API Column Name</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Example Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-200 px-3 py-2">Animal Type</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">1_animal_type</td><td className="border border-gray-200 px-3 py-2 text-gray-600">Beef</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Class (Sex)</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">2_class_sex</td><td className="border border-gray-200 px-3 py-2 text-gray-600">Cow</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Breed</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">3_breed</td><td className="border border-gray-200 px-3 py-2 text-gray-600">Brahman</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Date of Birth</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">4_date_of_birth</td><td className="border border-gray-200 px-3 py-2 text-gray-600">2022-03-15</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Card Number</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">5_card_number</td><td className="border border-gray-200 px-3 py-2 text-gray-600">HQ132077</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Eartag Barcode</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">6_eartag_barcode</td><td className="border border-gray-200 px-3 py-2 text-gray-600">097562458</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Registration Date</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">7_registration_date</td><td className="border border-gray-200 px-3 py-2 text-gray-600">2026-03-18</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Livestock Keeper</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">8_livestock_keeper</td><td className="border border-gray-200 px-3 py-2 text-gray-600">KAPUTU CHRISTOPH</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Farm/Establishment</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">9_farm_establishment</td><td className="border border-gray-200 px-3 py-2 text-gray-600">Tutara</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Is Replacement Tag?</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">10_is_replacement_tag</td><td className="border border-gray-200 px-3 py-2 text-gray-600">No</td></tr>
              <tr><td className="border border-gray-200 px-3 py-2">Old Tag Number</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">11_old_tag_number</td><td className="border border-gray-200 px-3 py-2 text-gray-600">097500123</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">Reason (Tag not used)</td><td className="border border-gray-200 px-3 py-2 font-mono text-xs">12_reason_tag_not_used</td><td className="border border-gray-200 px-3 py-2 text-gray-600">Damaged, Lost</td></tr>
            </tbody>
          </table>
        </div>

        <Callout type="tip" title="Alternative: Renaming Columns in R">
          If you prefer to keep the default mapping and rename in your code, use <code className="bg-gray-100 px-1 rounded">rename()</code>:
          <pre className="bg-gray-800 text-gray-100 p-3 rounded mt-2 text-xs overflow-x-auto">
{`registrations <- registrations %>%
  rename(
    animal_type = \`1_animal_type\`,
    sex = \`2_class_sex\`,
    breed = \`3_breed\`,
    dob = \`4_date_of_birth\`,
    card_no = \`5_card_number\`,
    eartag = \`6_eartag_barcode\`,
    keeper = \`8_livestock_keeper\`,
    farm = \`9_farm_establishment\`
  )`}
          </pre>
        </Callout>
      </section>

      {/* Testing */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Save and Test</h2>

        <Callout type="warning" title="Before Saving">
          Ensure <strong>ALL inputs have green checkmarks</strong> before saving.
          Check for missing question text, empty dropdown options, and invalid jump rules.
        </Callout>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Test Checklist</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> Barcode scanner captures eartag correctly</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> Card number regex validates (HQ + 6 digits)</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> "No" to replacement skips old tag questions</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> Breed search dropdown works</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> Reason checkboxes allow multiple selection</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> Form can be completed offline</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> Data uploads to server correctly</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Field Testing Notes</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Test barcode scan in good and poor lighting</li>
              <li>• Time how long it takes (target: 2-3 min per animal)</li>
              <li>• Test at actual crush pen with real eartags</li>
              <li>• Verify form works in low/no connectivity</li>
              <li>• Test sync process after collecting multiple entries</li>
            </ul>
          </div>
        </div>
      </section>

      <Exercise title="Practical: Build Your Own EpiCollect5 Form" type="individual" duration="30 min">
        <p className="text-gray-700 mb-4">
          Create your own EpiCollect5 project and practice building forms:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Choose a topic:</strong> Pick something relevant to your work (e.g., cattle registration, farm inspection, disease reporting)</li>
          <li><strong>Create a new project:</strong> Give it a descriptive name and set it to Private</li>
          <li><strong>Build your form:</strong> Include at least 2-3 different input types (e.g., Text, Dropdown, Date, Barcode, Photo, Location)</li>
          <li><strong>Add a jump rule:</strong> Create at least one conditional question (e.g., "If Yes, show follow-up question")</li>
          <li><strong>Test on mobile:</strong> Download to your phone and collect 2-3 test entries</li>
          <li><strong>Download data:</strong> Export your entries as CSV from the web interface and view in Excel/R</li>
        </ol>
        <div className="mt-4 p-3 bg-woah-gold/10 rounded">
          <p className="text-sm text-gray-600">
            <strong>Key success criteria:</strong> You can create a project, build a form with multiple input types,
            collect entries on mobile, and download your data from the server.
          </p>
        </div>
      </Exercise>

      {/* Optional Considerations */}
      <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Optional Considerations (For Home Thought)</h2>
        <p className="text-gray-600 mb-4">
          As you continue working with digital data collection, consider these questions:
        </p>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span><strong>Data Collection:</strong> What are the most common data quality issues you encounter in your current LITS workflow?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span><strong>Impact:</strong> How have these data quality issues affected your ability to trace animals during an outbreak investigation?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span><strong>Improvement:</strong> If you could change one thing about how movement data is collected in your region, what would it be?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span><strong>Barriers:</strong> What prevents better data collection practices in the field? (connectivity, time, training, tools?)</span>
          </li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link to="/epicollect-basics/session2" className="text-orange-500 hover:underline">
          ← Previous: EpiCollect5 Overview
        </Link>
        <Link
          to="/"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Workshop Complete! →
        </Link>
      </div>
    </div>
  )
}
