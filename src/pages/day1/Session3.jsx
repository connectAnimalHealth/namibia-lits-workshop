import { Link } from 'react-router-dom'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'
import { Plus, Settings, Save, CheckCircle, AlertTriangle, ArrowRight, GitBranch, Users, MapPin, Truck, Shield, MessageSquare } from 'lucide-react'

export default function Day1Session3() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Day 3 - Session 3</span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">Building the NCA Movement Survey</h1>
        <p className="text-gray-600">Hands-on practical: Creating the Animal Movement Survey form for the Northern Communal Areas (NCA)</p>
      </div>

      {/* Learning Objectives */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 p-6 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-3">Session Objectives</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-woah-gold rounded-full mt-2"></span>
            <span>Build a comprehensive livestock movement survey form</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-woah-gold rounded-full mt-2"></span>
            <span>Implement conditional logic (jump rules) for complex questionnaires</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-woah-gold rounded-full mt-2"></span>
            <span>Use checkbox inputs for "select all that apply" questions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-woah-gold rounded-full mt-2"></span>
            <span>Capture cross-border movement patterns between Namibia and Angola</span>
          </li>
        </ul>
      </div>

      {/* Survey Overview */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Survey Structure Overview</h2>
        <p className="text-gray-700 mb-4">
          This survey aims to gather information on livestock movement patterns in the NCA to support
          disease prevention and control strategies. It has <strong>5 sections</strong> with conditional navigation:
        </p>

        <div className="grid md:grid-cols-5 gap-2 mb-4">
          <div className="bg-white border-2 border-woah-orange rounded-lg p-3 text-center">
            <Users className="h-6 w-6 text-woah-orange mx-auto mb-1" />
            <div className="text-xs font-bold text-woah-orange">Section 1</div>
            <div className="text-xs text-gray-600">General Info</div>
          </div>
          <div className="bg-white border-2 border-namibia-green rounded-lg p-3 text-center">
            <MapPin className="h-6 w-6 text-woah-green mx-auto mb-1" />
            <div className="text-xs font-bold text-woah-green">Section 2</div>
            <div className="text-xs text-gray-600">In-Country Movement</div>
          </div>
          <div className="bg-white border-2 border-namibia-red rounded-lg p-3 text-center">
            <Truck className="h-6 w-6 text-woah-red mx-auto mb-1" />
            <div className="text-xs font-bold text-woah-red">Section 3</div>
            <div className="text-xs text-gray-600">Cross-Border</div>
          </div>
          <div className="bg-white border-2 border-purple-500 rounded-lg p-3 text-center">
            <Shield className="h-6 w-6 text-purple-500 mx-auto mb-1" />
            <div className="text-xs font-bold text-purple-500">Section 4</div>
            <div className="text-xs text-gray-600">Disease Control</div>
          </div>
          <div className="bg-white border-2 border-gray-500 rounded-lg p-3 text-center">
            <MessageSquare className="h-6 w-6 text-gray-500 mx-auto mb-1" />
            <div className="text-xs font-bold text-gray-500">Section 5</div>
            <div className="text-xs text-gray-600">Challenges</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Conditional Navigation (Jump Rules)
          </h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• If consent = <strong>No</strong> → Stop (end survey)</li>
            <li>• If no livestock moved within NCA → <strong>Skip to Section 3</strong></li>
            <li>• If no cross-border movement → <strong>Stop</strong> (no Section 4-5)</li>
          </ul>
        </div>

        <KeyConcept title="Why Jump Rules Matter">
          <p>
            <strong>Jump rules</strong> (also called conditional logic or skip logic) make your survey smarter and faster.
            Without them, respondents who don't move livestock across borders would still have to answer 23 irrelevant
            questions about Angola. Jump rules save time for respondents and give you cleaner, more relevant data.
          </p>
        </KeyConcept>
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
                  <li><strong>Project name:</strong> NCA_Movement_Survey_YourName</li>
                  <li><strong>Small description:</strong> "Animal movement survey in the NCA, Namibia"</li>
                  <li><strong>Form name:</strong> movementSurvey</li>
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

        <Callout type="info" title="Survey Introduction">
          Consider adding a <strong>README</strong> input at the start of your form to display:
          <em className="block mt-2 text-sm">"This survey aims to gather information on livestock movement patterns to support
          disease prevention and control strategies. Your responses will remain confidential and will only be
          used for research and policy development purposes."</em>
        </Callout>
      </section>

      {/* Section 1: General Information */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-woah-orange">Section 1:</span> General Information
        </h2>

        <p className="text-gray-700 mb-4">
          This section captures consent, farmer demographics, location details, farming system, and herd sizes.
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
              <tr className="bg-red-50">
                <td className="border border-gray-200 px-3 py-2">1</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Do you consent to be interviewed?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No<br/><span className="text-red-600 font-bold">Jump: If No → END</span></td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">2</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Name of respondent (optional)</td>
                <td className="border border-gray-200 px-3 py-2">Text</td>
                <td className="border border-gray-200 px-3 py-2 text-center">No</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">-</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">3</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Phone number (optional)</td>
                <td className="border border-gray-200 px-3 py-2">Phone</td>
                <td className="border border-gray-200 px-3 py-2 text-center">No</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">-</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">4</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Are you the owner or caretaker?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Owner, Caretaker</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">5</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Age (years)</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">&lt;25, 25-40, 41-60, &gt;60</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">6</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Gender</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Male, Female</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">7</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Region name</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">NCA regions (see below)</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">8</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Constituency name</td>
                <td className="border border-gray-200 px-3 py-2">Text</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">-</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">9</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Village/Town name</td>
                <td className="border border-gray-200 px-3 py-2">Text</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">-</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">10</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Crush pen area name</td>
                <td className="border border-gray-200 px-3 py-2">Text</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">-</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">11</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">GPS Coordinates</td>
                <td className="border border-gray-200 px-3 py-2">Location</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Auto-captures lat/long</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">12</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Type of farming system</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Subsistence, Commercial, Mixed</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">13</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Main livestock species kept</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-center text-green-600">Yes</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Cattle, Sheep, Goats, Pigs, Other</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">14</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Herd size - Cattle</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-center">No</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">1-10, 11-50, 51-100, &gt;100</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">15</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Herd size - Goats</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-center">No</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">1-10, 11-50, 51-100, &gt;100</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">16</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Herd size - Sheep</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-center">No</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">1-10, 11-50, 51-100, &gt;100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">NCA Region Dropdown Options</h3>
            <div className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
              <div className="bg-gray-50 px-2 py-1 rounded">Kavango East</div>
              <div className="bg-gray-50 px-2 py-1 rounded">Kavango West</div>
              <div className="bg-gray-50 px-2 py-1 rounded">Kunene</div>
              <div className="bg-gray-50 px-2 py-1 rounded">Ohangwena</div>
              <div className="bg-gray-50 px-2 py-1 rounded">Omusati</div>
              <div className="bg-gray-50 px-2 py-1 rounded">Oshana</div>
              <div className="bg-gray-50 px-2 py-1 rounded">Oshikoto</div>
              <div className="bg-gray-50 px-2 py-1 rounded">Zambezi</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Focus on NCA regions only for this survey.</p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Setting Up Jump Rules</h3>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Select the consent question</li>
              <li>In right panel, find "Jumps"</li>
              <li>Click "+ ADD JUMP"</li>
              <li>When answer is "No" → Jump to "End of form"</li>
              <li>Save the jump rule</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Section 2: In-Country Movement */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-woah-green">Section 2:</span> In-Country Movement (within NCA)
        </h2>

        <p className="text-gray-700 mb-4">
          This section captures livestock movement patterns <strong>within Namibia's NCA regions</strong>.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Question</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Options/Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-yellow-50">
                <td className="border border-gray-200 px-3 py-2">17</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Do you move CATTLE to other regions in NCA?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No<br/><span className="text-blue-600">If Yes → show region dropdown</span></td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">18</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Region cattle moved to</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">NCA regions list</td>
              </tr>
              <tr className="bg-yellow-50">
                <td className="border border-gray-200 px-3 py-2">19</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Do you move GOATS to other regions?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">20</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Region goats moved to</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">NCA regions list</td>
              </tr>
              <tr className="bg-yellow-50">
                <td className="border border-gray-200 px-3 py-2">21</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Do you move SHEEP to other regions?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">22</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Region sheep moved to</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">NCA regions list</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">23</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Main reasons for movement</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Grazing, Water access, Market/sale, Breeding, Cultural/Traditional, Other</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">24</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Disease control measures before moving?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">25</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">If yes, what measures?</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Vaccination, Veterinary checkup, Movement permit, Other</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">26</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">How frequently do you move livestock?</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Daily, Weekly, Monthly, Seasonally, Occasionally</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">27</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Primary mode of transport</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Walking, Vehicle/Truck, Other</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">28</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Approximate distance moved</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">&lt;10km, 10-50km, 51-100km, &gt;100km</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">29</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Do you move the whole herd?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes whole herd, Only some</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">30</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">How long kept at destination?</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">1 week, 1 month, up to 3 months, 3-6 months, 6 months-1 year, &gt;1 year</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">31</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Sell via animal trader?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No we take ourselves</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">32</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Number of animal traders in village</td>
                <td className="border border-gray-200 px-3 py-2">Numeric</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Integer, min 0</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">33</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Names of animal traders in area</td>
                <td className="border border-gray-200 px-3 py-2">Text Box</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Optional, free text</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="Jump Logic for Section 2">
          If all three species movement questions (cattle, goats, sheep) are answered "No",
          use a jump rule to skip directly to <strong>Section 3</strong> (cross-border movement).
          This is complex and may require restructuring questions or using a summary question.
        </Callout>
      </section>

      {/* Section 3: Cross-Border Movement */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-woah-red">Section 3:</span> Cross-Border Movement (into Angola)
        </h2>

        <p className="text-gray-700 mb-4">
          This critical section captures <strong>transboundary movement patterns</strong> between Namibia and Angola,
          which is essential for FMD risk assessment.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Question</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Options/Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-red-50">
                <td className="border border-gray-200 px-3 py-2">34</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Do you move livestock across border into Angola?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No<br/><span className="text-red-600 font-bold">If No → END survey</span></td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">35</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Location/area in Angola</td>
                <td className="border border-gray-200 px-3 py-2">Text</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Free text for place name</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">36</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Species moved into Angola</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Cattle, Goat, Sheep</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">37</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Reasons for cross-border movement</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Grazing, Water access, Market/sale, Breeding, Cultural/Traditional, Other</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">38</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Frequency of cross-border movement</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Daily, Weekly, Monthly, Seasonally, Occasionally</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">39</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Transport mode to Angola</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Walking, Vehicle/Truck, Other</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">40</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Distance into Angola</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">&lt;10km, 10-50km, 51-100km, &gt;100km</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">41</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Time to reach grazing destination</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">1 day, 1 week, 2 weeks, 3 weeks, 1 month</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">42</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Move whole herd?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes whole herd, Only some</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">43</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Duration in Angola before return</td>
                <td className="border border-gray-200 px-3 py-2">Dropdown</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">1 week, 1 month, up to 3 months, 3-6 months, 6 months-1 year, &gt;1 year</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">44</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Month(s) animals moved to Angola</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">All 12 months as options</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">45</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Month(s) animals return to Namibia</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">All 12 months as options</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">46</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Grazing area type in Angola</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Separate/individual, Communal</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">47</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Animals mixed with other owners'?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No</td>
              </tr>
              <tr className="bg-yellow-50">
                <td className="border border-gray-200 px-3 py-2">48</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Animals mixed with wildlife?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No, Not sure<br/><span className="text-yellow-700">Important for FMD risk!</span></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">49</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Inform vet office before moving out?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No, Not a requirement</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">50</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Inform community leaders before?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No, Not a requirement</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">51</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Require movement permit?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No, Not a requirement</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">52</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Inform vet on return to Namibia?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No, Not a requirement</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">53</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Inform community leaders on return?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No, Not a requirement</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">54</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Reasons for reporting on arrival</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Vaccination, Vet checkup, When animal sick, Other</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">55</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Permit required in Angola?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">56</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Reasons for bringing animals back</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Vaccination, Vet checkup, Market/sale, Other</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Disease Control */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-purple-600">Section 4:</span> Disease Prevention and Control
        </h2>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Question</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2">57</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Disease control measures before crossing?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">58</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">If yes, what measures?</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Vaccination, Vet checkup, Other</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">59</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Disease outbreaks after moving to Angola?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No</td>
              </tr>
              <tr className="bg-yellow-50">
                <td className="border border-gray-200 px-3 py-2">60</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">If yes, which diseases?</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">FMD, CBPP, Other<br/><span className="text-yellow-700">Critical data point!</span></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">61</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Who do you report outbreaks to?</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">No one, Vet Officer, Local Authority, Other Farmers, Namibia Vet, Namibia Community Leaders</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">62</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Disease control at border on return?</td>
                <td className="border border-gray-200 px-3 py-2">Radio</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Yes, No</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">63</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">If yes, what measures?</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Vaccination, Quarantine, Vet checkup, Other</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">64</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">If no measures, why not?</td>
                <td className="border border-gray-200 px-3 py-2">Checkbox</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">No quarantine facilities, No vet office at border, Other</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Challenges */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-gray-600">Section 5:</span> Challenges and Suggestions
        </h2>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Question</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2">65</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Main problems while moving livestock into Angola?</td>
                <td className="border border-gray-200 px-3 py-2">Text Box</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Open-ended, optional</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">66</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">What should government do about movement issues?</td>
                <td className="border border-gray-200 px-3 py-2">Text Box</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Open-ended, optional</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">67</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">Any other comments or information?</td>
                <td className="border border-gray-200 px-3 py-2">Text Box</td>
                <td className="border border-gray-200 px-3 py-2 text-sm">Open-ended, optional</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation Tips */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Implementation Tips</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Using Checkbox vs Radio</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><strong>Radio:</strong> Use when only ONE answer is allowed (Yes/No, Male/Female)</li>
              <li><strong>Checkbox:</strong> Use for "Check all that apply" questions (multiple selection)</li>
              <li className="text-yellow-700">⚠️ "Main livestock species kept" uses Checkbox because farmers may keep multiple species</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Handling "Other" Options</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Add "Other" as a dropdown/checkbox option</li>
              <li>Use a <strong>Branch</strong> input to show a follow-up text field</li>
              <li>Or add a conditional text field that appears when "Other" is selected</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Month Selection</h3>
            <p className="text-sm text-gray-600 mb-2">
              For questions 44-45 (months animals move to/from Angola), use Checkbox with all 12 months:
            </p>
            <div className="flex flex-wrap gap-1 text-xs">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                <span key={m} className="bg-gray-100 px-2 py-0.5 rounded">{m}</span>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Three-Way Radio Options</h3>
            <p className="text-sm text-gray-600">
              Several questions use "Yes / No / Not a requirement" pattern. This captures regulatory context:
            </p>
            <div className="mt-2 space-y-1 text-xs">
              <div className="bg-green-50 px-2 py-1 rounded">Yes - Farmer does this</div>
              <div className="bg-red-50 px-2 py-1 rounded">No - Farmer doesn't do this</div>
              <div className="bg-gray-100 px-2 py-1 rounded">Not a requirement - No regulation exists</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testing */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Save and Test</h2>

        <Callout type="warning" title="Before Saving">
          With 67 questions, ensure <strong>ALL inputs have green checkmarks</strong> before saving.
          Check for missing question text, empty dropdown options, and invalid jump rules.
        </Callout>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Test Checklist</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> Consent "No" ends survey</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> Cross-border "No" ends survey</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> All checkboxes allow multiple selection</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> GPS location captures correctly</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> All dropdowns have correct options</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> Form can be completed offline</li>
              <li className="flex items-center gap-2"><input type="checkbox" readOnly /> Data uploads to server correctly</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Field Testing Notes</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Test with colleagues before field deployment</li>
              <li>• Time how long it takes to complete (target: 15-20 min)</li>
              <li>• Test GPS capture at actual crush pen locations</li>
              <li>• Verify form works in low/no connectivity</li>
              <li>• Test sync process after collecting multiple entries</li>
            </ul>
          </div>
        </div>
      </section>

      <Exercise title="Practical: Build the NCA Movement Survey" type="individual" duration="45 min">
        <p className="text-gray-700 mb-4">
          Build the complete NCA Animal Movement Survey in EpiCollect5. Due to the form's length (67 questions),
          focus on building key sections:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Section 1:</strong> Build all 16 general information questions including consent with jump rule</li>
          <li><strong>Section 3:</strong> Build the cross-border section (Questions 34-56) with the critical jump rule</li>
          <li><strong>Section 4:</strong> Add disease control questions including the FMD/CBPP checkbox</li>
          <li>Test the jump rules work correctly</li>
          <li>Download to mobile and collect 2-3 test entries</li>
        </ol>
        <div className="mt-4 p-3 bg-woah-gold/10 rounded">
          <p className="text-sm text-gray-600">
            <strong>Key success criteria:</strong> The form correctly ends when consent is "No" and when
            cross-border movement is "No". Wildlife contact question (Q48) is captured for FMD risk assessment.
          </p>
        </div>
      </Exercise>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link to="/day1/session2" className="text-orange-500 hover:underline">
          ← Previous: EpiCollect5 Overview
        </Link>
        <Link
          to="/day2/session1"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Next: Field Testing & QA →
        </Link>
      </div>
    </div>
  )
}
