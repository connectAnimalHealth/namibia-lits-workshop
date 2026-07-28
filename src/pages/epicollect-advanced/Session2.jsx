import { Link } from 'react-router-dom'
import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'

export default function Day2Session2() {
  const authCode = `# Install packages if needed
packages <- c("httr", "jsonlite")
install_if_missing <- packages[!packages %in% installed.packages()[,"Package"]]
if(length(install_if_missing)) install.packages(install_if_missing)

# Load required packages
library(httr)
library(jsonlite)

# Your EpiCollect5 credentials (from Project Details > Developers)
client_id <- "YOUR_CLIENT_ID"
client_secret <- "YOUR_CLIENT_SECRET"
project_slug <- "your-project-slug"

# Get OAuth2 access token
res <- POST("https://five.epicollect.net/api/oauth/token",
            body = list(
              grant_type = "client_credentials",
              client_id = client_id,
              client_secret = client_secret
            ))

# Check if successful
http_status(res)

# Extract the token
token <- content(res)$access_token
print(paste("Token obtained:", substr(token, 1, 20), "..."))`

  const fetchEntriesCode = `# Construct the API URL
form_ref <- "YOUR_FORM_REF"  # From Project Details > Developers

url <- paste0(
  "https://five.epicollect.net/api/export/entries/",
  project_slug,
  "?map_index=0",
  "&form_ref=", form_ref,
  "&format=csv",
  "&headers=true"
)

# Make authenticated request
response <- GET(url, add_headers(
  "Authorization" = paste("Bearer", token)
))

# Check status
http_status(response)

# Parse CSV from response content (NOT from URL!)
# The API returns data in the response body, not as a downloadable file
csv_text <- content(response, "text", encoding = "UTF-8")
entries <- read.csv(text = csv_text)

# View the data
head(entries)
str(entries)`

  const jsonCode = `# Alternative: Get data as JSON (more detailed)
# (jsonlite already loaded from authentication step)

url_json <- paste0(
  "https://five.epicollect.net/api/export/entries/",
  project_slug,
  "?map_index=0",
  "&form_ref=", form_ref,
  "&format=json"
)

response_json <- GET(url_json, add_headers(
  "Authorization" = paste("Bearer", token)
))

# Parse JSON response
data <- fromJSON(rawToChar(content(response_json)))

# Access entries
entries_df <- data$data$entries
head(entries_df)

# Check pagination info
print(paste("Total entries:", data$meta$total))
print(paste("Current page:", data$meta$current_page))`

  const paginationCode = `# Handle pagination for large datasets
# Requires dplyr for bind_rows
library(dplyr)

fetch_all_entries <- function(project_slug, form_ref, token) {
  all_entries <- data.frame()
  page <- 1
  has_more <- TRUE
  
  while(has_more) {
    url <- paste0(
      "https://five.epicollect.net/api/export/entries/",
      project_slug,
      "?form_ref=", form_ref,
      "&format=json",
      "&per_page=50",
      "&page=", page
    )
    
    response <- GET(url, add_headers(
      "Authorization" = paste("Bearer", token)
    ))
    
    data <- fromJSON(rawToChar(content(response)))
    entries <- data$data$entries
    
    if(length(entries) > 0) {
      all_entries <- bind_rows(all_entries, entries)
      page <- page + 1
      has_more <- !is.null(data$links[["next"]])
      cat("Fetched page", page - 1, "- Total entries:", nrow(all_entries), "\n")
    } else {
      has_more <- FALSE
    }
  }
  
  return(all_entries)
}

# Use the function
all_data <- fetch_all_entries(project_slug, form_ref, token)`

  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Day 3 - Session 5</span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">EpiCollect5 API Integration</h1>
        <p className="text-gray-600">Fetching your collected data directly into R</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Use the API?</h2>
        <p className="text-gray-700 mb-4">
          While you can manually export data from the EpiCollect5 web interface, using the API allows you to:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Automate Data Retrieval</h3>
            <p className="text-sm text-gray-600">
              Schedule scripts to fetch latest data automatically without manual downloads.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Build Dashboards</h3>
            <p className="text-sm text-gray-600">
              Create live dashboards that update with new field data in real-time.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Reproducible Analysis</h3>
            <p className="text-sm text-gray-600">
              Your R scripts always work with the latest data - no manual file handling.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Integrate Systems</h3>
            <p className="text-sm text-gray-600">
              Connect EpiCollect data to other systems like LITS databases.
            </p>
          </div>
        </div>

        <Callout type="info" title="API Access">
          The EpiCollect5 API is <strong>read-only</strong>. You can fetch entries and media,
          but adding/editing data must be done through the official apps.
        </Callout>

        <KeyConcept title="API = Application Programming Interface">
          <p>
            An API is a way for programs to talk to each other. The EpiCollect5 API lets your R scripts
            "ask" the EpiCollect server for data. Instead of manually downloading CSV files, your script
            can fetch the latest entries automatically - perfect for dashboards or reports that need
            to stay up-to-date.
          </p>
        </KeyConcept>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 1: Get Your Credentials</h2>
        <p className="text-gray-700 mb-4">
          For private projects, you need to create API credentials:
        </p>
        
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Go to your project on <a href="https://five.epicollect.net" className="text-woah-orange underline" target="_blank">five.epicollect.net</a></li>
          <li>Click <strong>Project Details</strong> (gear icon)</li>
          <li>Go to the <strong>Developers</strong> tab</li>
          <li>Click <strong>Create Client App</strong></li>
          <li>Copy the <strong>Client ID</strong> and <strong>Client Secret</strong></li>
          <li>Also note the <strong>form_ref</strong> for your form</li>
        </ol>

        <Callout type="warning" title="Keep Secrets Safe">
          Never commit your client_secret to GitHub or share it publicly. 
          Use environment variables or a separate credentials file that's in .gitignore.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 2: Authenticate</h2>
        <CodeBlock code={authCode} language="r" title="Get OAuth2 token" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 3: Fetch Entries</h2>
        <CodeBlock code={fetchEntriesCode} language="r" title="Fetch entries as CSV" />

        <p className="text-gray-700 my-4">Or fetch as JSON for more control:</p>
        <CodeBlock code={jsonCode} language="r" title="Fetch entries as JSON" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 4: Handle Pagination</h2>
        <p className="text-gray-700 mb-4">
          EpiCollect5 returns maximum 50 entries per request. For larger datasets, 
          you need to paginate through all pages:
        </p>
        <CodeBlock code={paginationCode} language="r" title="Fetch all pages" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Data Formats</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Format</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Use Case</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Parameter</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-200 px-3 py-2">CSV</td><td className="border border-gray-200 px-3 py-2">Simple tabular data</td><td className="border border-gray-200 px-3 py-2 font-mono">format=csv</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-3 py-2">JSON</td><td className="border border-gray-200 px-3 py-2">Complex nested data, metadata</td><td className="border border-gray-200 px-3 py-2 font-mono">format=json</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Exercise title="Practical: Connect to Your EpiCollect Project" type="individual" duration="45 min">
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Create API credentials for your test project</li>
          <li>Store credentials securely (environment variables)</li>
          <li>Write an R script to authenticate and fetch entries</li>
          <li>Load the data into a dataframe</li>
          <li>Create a simple summary of your collected data</li>
        </ol>
        <p className="mt-4 text-sm text-gray-500 italic">
          This bridges data collection (Days 1-2) with analysis (Days 3-4).
        </p>
      </Exercise>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link to="/epicollect-advanced/session1" className="text-orange-500 hover:underline">
          ← Previous: Field Testing & QA
        </Link>
        <Link
          to="/analysis/session1"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Next: Network Analysis →
        </Link>
      </div>
    </div>
  )
}