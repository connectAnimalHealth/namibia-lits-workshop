import { Link } from 'react-router-dom'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'

export default function Day2Session1() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Day 3 - Session 4</span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">Field Testing & Quality Assurance</h1>
        <p className="text-gray-600">Testing your forms and ensuring data quality</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Field Testing Matters</h2>
        <p className="text-gray-700 mb-4">
          A form that looks perfect on your computer may fail in the field. Testing in realistic 
          conditions reveals issues with question wording, validation rules, and workflow.
        </p>
        
        <Callout type="warning" title="Common Field Issues">
          <ul className="list-disc list-inside space-y-1">
            <li>Dropdown options don't cover all real-world scenarios</li>
            <li>Required fields that can't always be answered</li>
            <li>Validation rules too strict for edge cases</li>
            <li>Form too long for busy field conditions</li>
          </ul>
        </Callout>

        <KeyConcept title="Test Like a User, Not a Developer">
          <p>
            When testing your form, pretend you're a busy Animal Health Technician at a crush pen
            with limited time and phone battery. Ask: Can I complete this form in 10 minutes? What
            happens if I make a mistake? Can I go back? What if the GPS signal is weak?
          </p>
        </KeyConcept>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Testing Checklist</h2>
        
        <div className="bg-white border rounded-lg p-4">
          <div className="space-y-3">
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <span><strong>Offline test:</strong> Turn off WiFi/data and complete a form</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <span><strong>GPS test:</strong> Verify location capture works outdoors</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <span><strong>Photo test:</strong> Test photo quality in bright sunlight</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <span><strong>Branching logic:</strong> Test all possible paths through the form</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <span><strong>Edge cases:</strong> Try unusual but valid inputs</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <span><strong>Time test:</strong> Measure how long a typical entry takes</span>
            </label>
          </div>
        </div>
      </section>

      <Exercise title="Practical: Field Test Your Form" type="pair" duration="20 min">
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Pair up with a colleague</li>
          <li>Exchange forms - test each other's creation</li>
          <li>Complete 3 test entries with different scenarios</li>
          <li>Document any issues or suggestions</li>
          <li>Discuss improvements together</li>
        </ol>
      </Exercise>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link to="/epicollect-basics/session3" className="text-orange-500 hover:underline">
          ← Previous: Building Forms
        </Link>
        <Link
          to="/epicollect-advanced/session2"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Next: EpiCollect5 API in R →
        </Link>
      </div>
    </div>
  )
}