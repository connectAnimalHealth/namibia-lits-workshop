import { useState } from 'react'
import { MessageSquare, Send, CheckCircle, Star, AlertCircle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

// JSONBin configuration
const JSONBIN_BIN_ID = '6a3e2fd5da38895dfe017e5d'
const JSONBIN_API_KEY = '$2a$10$ipV/tMP6D6kr/M.RsIdMy.T6mr3cwNMJ8/Oj/4xZW6eKjh9rH.XZ2'

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    overallRating: 0,
    contentRating: 0,
    paceRating: 0,
    mostValuable: '',
    leastValuable: '',
    improvements: '',
    wouldRecommend: '',
    additionalComments: '',
    submittedAt: ''
  })

  const handleRating = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const submission = {
      ...formData,
      submittedAt: new Date().toISOString()
    }

    try {
      // First, get existing data
      const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Access-Key': JSONBIN_API_KEY
        }
      })

      let existingData = []
      if (getResponse.ok) {
        const json = await getResponse.json()
        existingData = json.record.responses || []
      }

      // Add new submission
      const updatedData = {
        responses: [...existingData, submission]
      }

      // Update bin
      const putResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(updatedData)
      })

      if (putResponse.ok) {
        setSubmitted(true)
      } else {
        throw new Error('Failed to submit feedback')
      }
    } catch (err) {
      setError('Failed to submit feedback. Please try again.')
      console.error('Submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const StarRating = ({ field, value, label }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRating(field, star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`h-8 w-8 ${
                star <= value
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-500 self-center">
          {value > 0 ? `${value}/5` : 'Click to rate'}
        </span>
      </div>
    </div>
  )

  if (submitted) {
    return (
      <div className="space-y-8">
        <div>
          <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Thank You!</span>
          <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">Feedback Submitted</h1>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Thank you for your feedback!</h2>
          <p className="text-green-700">
            Your anonymous feedback has been recorded and will help us improve future workshops.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">Anonymous</span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">Workshop Feedback</h1>
        <p className="text-gray-600">Help us improve future workshops with your anonymous feedback</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800">Your feedback is anonymous</h3>
            <p className="text-sm text-blue-700">
              No personal information is collected. Your honest feedback helps us improve the workshop for future participants.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Ratings Section */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Overall Ratings</h2>

          <StarRating
            field="overallRating"
            value={formData.overallRating}
            label="Overall Workshop Experience"
          />

          <StarRating
            field="contentRating"
            value={formData.contentRating}
            label="Quality of Content & Materials"
          />

          <StarRating
            field="paceRating"
            value={formData.paceRating}
            label="Pace of the Workshop"
          />
        </div>

        {/* Sessions Section */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Workshop Sessions</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Which session was most valuable to you?
            </label>
            <select
              name="mostValuable"
              value={formData.mostValuable}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select a session...</option>
              <option value="r-intro">R Introduction & Basics</option>
              <option value="data-wrangling">Data Import & Wrangling</option>
              <option value="visualization">Data Visualization (ggplot2)</option>
              <option value="network-analysis">Network Analysis</option>
              <option value="qgis">QGIS Visualization</option>
              <option value="epicollect-overview">EpiCollect5 Overview</option>
              <option value="epicollect-forms">Building EpiCollect5 Forms</option>
              <option value="namibia-context">Namibia Veterinary Context</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Which session was least valuable or needs improvement?
            </label>
            <select
              name="leastValuable"
              value={formData.leastValuable}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select a session...</option>
              <option value="none">None - all were valuable</option>
              <option value="r-intro">R Introduction & Basics</option>
              <option value="data-wrangling">Data Import & Wrangling</option>
              <option value="visualization">Data Visualization (ggplot2)</option>
              <option value="network-analysis">Network Analysis</option>
              <option value="qgis">QGIS Visualization</option>
              <option value="epicollect-overview">EpiCollect5 Overview</option>
              <option value="epicollect-forms">Building EpiCollect5 Forms</option>
              <option value="namibia-context">Namibia Veterinary Context</option>
            </select>
          </div>
        </div>

        {/* Improvements Section */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Improvements</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What could be improved in future workshops?
            </label>
            <textarea
              name="improvements"
              value={formData.improvements}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Share your suggestions for improvement..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Would you recommend this workshop to colleagues?
            </label>
            <div className="flex gap-4">
              {['Definitely', 'Probably', 'Maybe', 'Probably not', 'No'].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="wouldRecommend"
                    value={option}
                    checked={formData.wouldRecommend === option}
                    onChange={handleChange}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Comments */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Additional Comments</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Any other feedback or comments?
            </label>
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Share any additional thoughts..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting || formData.overallRating === 0}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-colors ${
              submitting || formData.overallRating === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {submitting ? (
              <>
                <span className="animate-spin">⏳</span>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Feedback
              </>
            )}
          </button>
        </div>

        {formData.overallRating === 0 && (
          <p className="text-center text-sm text-gray-500">
            Please provide at least an overall rating to submit
          </p>
        )}
      </form>

      {/* R Code for Fetching Responses */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded mr-2">For Facilitators</span>
          Retrieve Feedback in R
        </h2>

        <p className="text-gray-600 mb-4">
          Use the following R code to retrieve and analyze workshop feedback:
        </p>

        <CodeBlock
          title="Fetch Feedback from JSONBin"
          language="r"
          code={`# Load packages
library(httr)
library(jsonlite)

# JSONBin configuration
bin_id <- "6a3e2fd5da38895dfe017e5d"
api_key <- "$2a$10$ipV/tMP6D6kr/M.RsIdMy.T6mr3cwNMJ8/Oj/4xZW6eKjh9rH.XZ2"

# Fetch feedback data
response <- GET(
 paste0("https://api.jsonbin.io/v3/b/", bin_id, "/latest"),
 add_headers("X-Access-Key" = api_key)
)

# Parse JSON response
data <- content(response, "text", encoding = "UTF-8")
feedback <- fromJSON(data)

# Extract responses
responses <- feedback$record$responses

# View feedback
View(responses)

# Summary statistics
cat("Total responses:", nrow(responses), "\\n")
cat("Average overall rating:", mean(responses$overallRating, na.rm = TRUE), "\\n")
cat("Average content rating:", mean(responses$contentRating, na.rm = TRUE), "\\n")
cat("Average pace rating:", mean(responses$paceRating, na.rm = TRUE), "\\n")

# Most valuable sessions
table(responses$mostValuable)

# Would recommend
table(responses$wouldRecommend)`}
        />
      </div>
    </div>
  )
}
