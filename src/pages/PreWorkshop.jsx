import { Link } from 'react-router-dom'
import Callout from '../components/Callout'
import KeyConcept from '../components/KeyConcept'
import InlineCode from '../components/InlineCode'
import CodeBlock from '../components/CodeBlock'
import { Download, Monitor, Smartphone, CheckCircle, AlertTriangle, ExternalLink, Settings, Package, FolderOpen, Map } from 'lucide-react'

const installPackagesCode = `# Install packages only if not already installed
packages <- c("tidyverse", "readxl", "sf", "igraph", "lubridate", "httr", "jsonlite")
new_packages <- packages[!(packages %in% installed.packages()[,"Package"])]
if(length(new_packages)) install.packages(new_packages)`

const verifyPackagesCode = `# Load all packages to verify installation
library(tidyverse)
library(readxl)
library(sf)
library(igraph)
library(lubridate)
library(httr)
library(jsonlite)`

export default function PreWorkshop() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-sm font-medium text-woah-gold bg-woah-orange/10 px-2 py-1 rounded">
          Pre-Workshop
        </span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">
          Pre-Workshop Setup Requirements
        </h1>
        <p className="text-gray-600">
          Complete these installations before the workshop begins
        </p>
      </div>

      {/* Critical Warning */}
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-800 text-lg mb-2">IMPORTANT: Complete Before Workshop</h3>
            <p className="text-red-700">
              Please complete <strong>ALL</strong> software installations <strong>BEFORE</strong> the workshop begins.
              This will ensure we can start promptly and focus on learning rather than troubleshooting installations.
              If you encounter any issues, please contact <strong>John Grewar</strong> at least 48 hours before the start date:
              <a href="mailto:john@jdata.co.za" className="underline ml-1">john@jdata.co.za</a> or
              <a href="tel:+27836420610" className="underline ml-1">+27 83 642 0610</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Software Overview</h2>
        <p className="text-gray-700 mb-4">
          This workshop requires four main software components. Each serves a specific purpose:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border-2 border-blue-500 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Monitor className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-600">R</h3>
            </div>
            <p className="text-sm text-gray-600">
              Statistical programming language for data analysis and visualization
            </p>
          </div>

          <div className="bg-white border-2 border-green-500 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-green-600">RStudio</h3>
            </div>
            <p className="text-sm text-gray-600">
              Integrated development environment (IDE) that makes R easier to use
            </p>
          </div>

          <div className="bg-white border-2 border-amber-500 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Smartphone className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-amber-600">EpiCollect5</h3>
            </div>
            <p className="text-sm text-gray-600">
              Mobile data collection app for field surveys with offline capability
            </p>
          </div>

          <div className="bg-white border-2 border-purple-500 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Map className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-purple-600">QGIS</h3>
            </div>
            <p className="text-sm text-gray-600">
              Geographic Information System for spatial visualization and mapping
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Install R */}
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
          Install R
        </h2>

        <KeyConcept title="What is R?">
          <p className="mb-3">
            R is a <strong>free and open-source</strong> programming language and software environment for statistical computing
            and graphics. It is widely used among statisticians, data scientists, and researchers for data analysis,
            visualization, and modeling.
          </p>
          <p className="mb-3">
            R supports a vast ecosystem of over 20,000 packages that extend its capabilities, including specialized tools for
            epidemiology (<code className="bg-gray-100 px-1 rounded">epitools</code>, <code className="bg-gray-100 px-1 rounded">epiR</code>),
            spatial analysis (<code className="bg-gray-100 px-1 rounded">sf</code>, <code className="bg-gray-100 px-1 rounded">terra</code>),
            and network analysis (<code className="bg-gray-100 px-1 rounded">igraph</code>).
          </p>
          <p className="text-sm text-gray-500 italic">
            <strong>Citation:</strong> R Core Team (2024). R: A language and environment for statistical computing.
            R Foundation for Statistical Computing, Vienna, Austria.
            <a href="https://www.R-project.org/" className="text-orange-500 hover:underline ml-1" target="_blank" rel="noreferrer">
              https://www.R-project.org/
            </a>
          </p>
        </KeyConcept>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Download R</h3>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">🪟 Windows</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Visit <a href="https://cran.r-project.org/bin/windows/base/" className="text-orange-500 hover:underline font-medium" target="_blank" rel="noreferrer">
                  https://cran.r-project.org/bin/windows/base/ <ExternalLink className="inline h-3 w-3" />
                </a>
              </li>
              <li>Click "Download R-4.x.x for Windows" (the latest version)</li>
              <li>Run the downloaded <code className="bg-gray-200 px-1 rounded">.exe</code> file</li>
              <li>Accept all default installation options</li>
              <li>Click "Finish" when installation completes</li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">🍎 macOS</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Visit <a href="https://cran.r-project.org/bin/macosx/" className="text-orange-500 hover:underline font-medium" target="_blank" rel="noreferrer">
                  https://cran.r-project.org/bin/macosx/ <ExternalLink className="inline h-3 w-3" />
                </a>
              </li>
              <li>
                Download the appropriate version:
                <ul className="list-disc list-inside ml-4 mt-1 text-sm">
                  <li><strong>Apple Silicon (M1/M2/M3):</strong> R-4.x.x-arm64.pkg</li>
                  <li><strong>Intel Mac:</strong> R-4.x.x-x86_64.pkg</li>
                </ul>
              </li>
              <li>Open the downloaded <code className="bg-gray-200 px-1 rounded">.pkg</code> file</li>
              <li>Follow the installation wizard, accepting defaults</li>
            </ol>
            <Callout type="tip" title="Not sure which Mac you have?">
              Click the Apple menu () → "About This Mac". If you see "Chip: Apple M1/M2/M3", download the ARM version.
              If you see "Processor: Intel", download the Intel version.
            </Callout>
          </div>
        </div>

        <Callout type="success" title="Verify R Installation">
          <ol className="list-decimal list-inside space-y-1">
            <li>Open R (search for "R" in your applications)</li>
            <li>Type <InlineCode>2 + 2</InlineCode> and press Enter</li>
            <li>You should see <code className="bg-green-100 px-1 rounded">[1] 4</code> as the result</li>
          </ol>
          <p className="mt-2 font-medium">✓ If this works, R is installed correctly!</p>
        </Callout>
      </section>

      {/* Section 2: Install RStudio */}
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
          Install RStudio
        </h2>

        <KeyConcept title="What is RStudio?">
          <p className="mb-3">
            RStudio is an <strong>Integrated Development Environment (IDE)</strong> for R. While R itself can run from a basic
            command line, RStudio provides a much more user-friendly interface with:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li><strong>Script editor</strong> with syntax highlighting and code completion</li>
            <li><strong>Console</strong> for running R commands</li>
            <li><strong>Environment pane</strong> to see your data and variables</li>
            <li><strong>Plots pane</strong> for visualizations</li>
            <li><strong>Help system</strong> integrated directly into the interface</li>
          </ul>
          <p className="text-sm text-gray-600">
            Think of R as the engine and RStudio as the dashboard - you need both, but RStudio makes driving much easier.
          </p>
        </KeyConcept>

        <Callout type="warning" title="Important: Install R First!">
          RStudio requires R to be installed first. If you haven't installed R yet, go back to Step 1 before continuing.
        </Callout>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Download RStudio Desktop (Free)</h3>

        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>
            Visit <a href="https://posit.co/download/rstudio-desktop/" className="text-orange-500 hover:underline font-medium" target="_blank" rel="noreferrer">
              https://posit.co/download/rstudio-desktop/ <ExternalLink className="inline h-3 w-3" />
            </a>
          </li>
          <li>
            Scroll down to "All Installers and Tarballs" if the automatic download doesn't work
          </li>
          <li>
            Download the appropriate version for your operating system:
            <ul className="list-disc list-inside ml-4 mt-2 text-sm space-y-1">
              <li><strong>Windows 10/11:</strong> RStudio-2024.xx.x-xxx.exe</li>
              <li><strong>macOS 12+ (Apple Silicon):</strong> RStudio-2024.xx.x-xxx-arm64.dmg</li>
              <li><strong>macOS 12+ (Intel):</strong> RStudio-2024.xx.x-xxx.dmg</li>
            </ul>
          </li>
          <li>Run the installer and accept defaults</li>
        </ol>

        <Callout type="success" title="Verify RStudio Installation">
          <ol className="list-decimal list-inside space-y-1">
            <li>Open RStudio (NOT R - they are different applications)</li>
            <li>You should see a window with 4 panels</li>
            <li>In the Console (bottom-left), type <InlineCode>R.version.string</InlineCode> and press Enter</li>
            <li>You should see something like <code className="bg-green-100 px-1 rounded">"R version 4.4.0 (2024-04-24)"</code></li>
          </ol>
          <p className="mt-2 font-medium">✓ If this works, RStudio is connected to R correctly!</p>
        </Callout>

        {/* RStudio Interface */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Understanding the RStudio Interface</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white p-4 rounded border-2 border-blue-300">
                <p className="font-bold text-blue-700 mb-1">📝 Source Panel (Top-Left)</p>
                <p className="text-gray-600 text-xs mb-2">Write and edit your R scripts here. Think of it as a Word document for code.</p>
                <p className="text-xs text-blue-600">Shortcut: Ctrl+Shift+N (new script)</p>
              </div>
              <div className="bg-white p-4 rounded border-2 border-green-300">
                <p className="font-bold text-green-700 mb-1">📊 Environment Panel (Top-Right)</p>
                <p className="text-gray-600 text-xs mb-2">Shows all your data and variables. Click on a dataset to view it.</p>
                <p className="text-xs text-green-600">Lists: data frames, vectors, functions</p>
              </div>
              <div className="bg-white p-4 rounded border-2 border-orange-300">
                <p className="font-bold text-orange-700 mb-1">💻 Console Panel (Bottom-Left)</p>
                <p className="text-gray-600 text-xs mb-2">Run commands and see results. Red text = errors. Blue text = messages.</p>
                <p className="text-xs text-orange-600">Shortcut: Ctrl+Enter (run selected code)</p>
              </div>
              <div className="bg-white p-4 rounded border-2 border-purple-300">
                <p className="font-bold text-purple-700 mb-1">📁 Files/Plots/Help (Bottom-Right)</p>
                <p className="text-gray-600 text-xs mb-2">Browse files, view plots, read help documentation, manage packages.</p>
                <p className="text-xs text-purple-600">Tabs: Files, Plots, Packages, Help, Viewer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Install R Packages */}
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
          Install Required R Packages
        </h2>

        <KeyConcept title="What are R Packages?">
          <p className="mb-3">
            R packages are <strong>collections of functions, data, and documentation</strong> that extend R's capabilities.
            Think of them like apps on your phone - the base R installation is like a new phone with basic apps,
            and packages are additional apps you install for specific tasks.
          </p>
          <p>
            Packages only need to be <strong>installed once</strong>, but must be <strong>loaded each session</strong> using
            <InlineCode>library(packagename)</InlineCode>.
          </p>
        </KeyConcept>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Required Packages for This Workshop</h3>

        <CodeBlock code={installPackagesCode} language="r" title="Install required packages" />

        <Callout type="info" title="Installation Takes Time">
          Package installation can take 5-15 minutes depending on your internet connection. You'll see lots of
          text scrolling by - this is normal. Wait until you see the <code className="bg-blue-100 px-1 rounded">&gt;</code> prompt
          again before continuing.
        </Callout>

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-3 py-2 text-left">Package</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Purpose</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Key Functions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-blue-600">tidyverse</td>
                <td className="border border-gray-200 px-3 py-2">Collection of data science packages</td>
                <td className="border border-gray-200 px-3 py-2 text-xs">ggplot2, dplyr, tidyr, readr, stringr, forcats, tibble, purrr</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-green-600">readxl</td>
                <td className="border border-gray-200 px-3 py-2">Import Excel files (.xlsx, .xls)</td>
                <td className="border border-gray-200 px-3 py-2 text-xs">read_excel(), excel_sheets()</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-purple-600">sf</td>
                <td className="border border-gray-200 px-3 py-2">Spatial data (maps, coordinates)</td>
                <td className="border border-gray-200 px-3 py-2 text-xs">st_read(), st_transform(), st_crs()</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-orange-600">igraph</td>
                <td className="border border-gray-200 px-3 py-2">Network analysis</td>
                <td className="border border-gray-200 px-3 py-2 text-xs">graph_from_data_frame(), degree(), betweenness()</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-red-600">lubridate</td>
                <td className="border border-gray-200 px-3 py-2">Date/time manipulation</td>
                <td className="border border-gray-200 px-3 py-2 text-xs">ymd(), dmy(), year(), month(), interval()</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-cyan-600">httr</td>
                <td className="border border-gray-200 px-3 py-2">HTTP requests for APIs</td>
                <td className="border border-gray-200 px-3 py-2 text-xs">GET(), POST(), content(), add_headers()</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-pink-600">jsonlite</td>
                <td className="border border-gray-200 px-3 py-2">Parse JSON data</td>
                <td className="border border-gray-200 px-3 py-2 text-xs">fromJSON(), toJSON()</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="success" title="Verify Package Installation">
          <p className="mb-2">Run this code in RStudio Console to verify all packages installed correctly. If you see no error messages (Warnings/Conflicts are OK), all packages are installed correctly!</p>
        </Callout>
        <CodeBlock code={verifyPackagesCode} language="r" title="Verify package installation" />
      </section>

      {/* Section 4: EpiCollect5 */}
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
          Install EpiCollect5 Mobile App
        </h2>

        <KeyConcept title="What is EpiCollect5?">
          <p className="mb-3">
            EpiCollect5 is a <strong>free data collection platform</strong> developed by the Centre for Genomic
            Pathogen Surveillance at the Big Data Institute, University of Oxford. It can be used both as a
            <strong> mobile app</strong> and through a <strong>web browser</strong>. It allows you to:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>Create custom questionnaire forms with various input types</li>
            <li>Collect data <strong>offline</strong> on mobile - perfect for field work without internet</li>
            <li>Capture GPS locations, photos, audio, and video</li>
            <li>Sync data to a central server when online</li>
            <li>Export data as CSV or JSON for analysis in R</li>
            <li><strong>Design and manage projects online</strong> via the web interface</li>
          </ul>
          <p className="text-sm text-gray-600 mb-3">
            We'll use EpiCollect5 to illustrate how to design a questionnaire for capturing animal movement data in the NCA.
            <strong> During the workshop, we'll primarily use the web browser interface</strong> to create and manage our project.
          </p>
          <p className="text-sm text-gray-500">
            <strong>Website:</strong>{' '}
            <a href="https://five.epicollect.net/" className="text-orange-500 hover:underline" target="_blank" rel="noreferrer">
              https://five.epicollect.net/ <ExternalLink className="inline h-3 w-3" />
            </a>
          </p>
        </KeyConcept>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🤖</span> Android
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Open <strong>Google Play Store</strong></li>
              <li>Search for <strong>"EpiCollect5"</strong></li>
              <li>Look for the app by "Centre for Genomic Pathogen Surveillance"</li>
              <li>Tap <strong>Install</strong></li>
              <li>Accept permissions (camera, location, storage)</li>
            </ol>
            <a
              href="https://play.google.com/store/apps/details?id=uk.ac.imperial.epicollect.five"
              className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
              target="_blank"
              rel="noreferrer"
            >
              Open in Play Store →
            </a>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🍎</span> iPhone/iPad
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Open <strong>App Store</strong></li>
              <li>Search for <strong>"EpiCollect5"</strong></li>
              <li>Look for the app by "Imperial College London"</li>
              <li>Tap <strong>Get</strong> to install</li>
              <li>Accept permissions when prompted</li>
            </ol>
            <a
              href="https://apps.apple.com/app/epicollect5/id1183858199"
              className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
              target="_blank"
              rel="noreferrer"
            >
              Open in App Store →
            </a>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Create an EpiCollect5 Account</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Open the EpiCollect5 app on your phone</li>
          <li>Tap <strong>"Sign Up"</strong> or <strong>"Login"</strong></li>
          <li>Sign in with your <strong>Google account</strong> (recommended - easiest option)</li>
          <li>Alternatively, create a new account with email and password</li>
        </ol>

        <Callout type="info" title="Using Google Sign-In">
          We recommend using Google sign-in as it's the most reliable method and you won't need to remember another password.
          Your Google account is only used for authentication - EpiCollect doesn't access your emails or other Google data.
        </Callout>

        <Callout type="success" title="Verify EpiCollect5 Installation">
          <ol className="list-decimal list-inside space-y-1">
            <li>Open the EpiCollect5 app</li>
            <li>Sign in with your account</li>
            <li>You should see the main screen with "Add Project" option</li>
            <li>Tap "Add Project" → Search for "ec5-demo" (a test project)</li>
            <li>Try adding a test entry</li>
          </ol>
          <p className="mt-2 font-medium">✓ If you can add an entry, EpiCollect5 is working correctly!</p>
        </Callout>
      </section>

      {/* Section 5: Install QGIS */}
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
          Install QGIS
        </h2>

        <KeyConcept title="What is QGIS?">
          <p className="mb-3">
            QGIS (Quantum GIS) is a <strong>free and open-source Geographic Information System</strong> that allows you to
            create, edit, visualize, and analyze spatial data. It's used by governments, researchers, and organizations
            worldwide for mapping and spatial analysis.
          </p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>View and style shapefiles, GeoPackages, and other spatial formats</li>
            <li>Create publication-quality maps with legends, scale bars, and north arrows</li>
            <li>Filter and query spatial data interactively</li>
            <li>Perform spatial analysis and overlay operations</li>
          </ul>
          <p className="text-sm text-gray-600">
            We'll use QGIS to visualize livestock movement networks exported from R, creating maps that show
            movement flows between constituencies.
          </p>
        </KeyConcept>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Download QGIS (Long Term Release)</h3>

        <Callout type="info" title="Which Version?">
          We recommend the <strong>Long Term Release (LTR)</strong> version as it's the most stable.
          The "Latest Release" has newer features but may have bugs.
        </Callout>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">🪟 Windows</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Visit <a href="https://qgis.org/download/" className="text-orange-500 hover:underline font-medium" target="_blank" rel="noreferrer">
                  https://qgis.org/download/ <ExternalLink className="inline h-3 w-3" />
                </a>
              </li>
              <li>Click <strong>"Download for Windows"</strong></li>
              <li>Choose the <strong>Long Term Release (most stable)</strong> version</li>
              <li>Download the <strong>Standalone installer</strong> (not the OSGeo4W network installer)</li>
              <li>Run the downloaded <code className="bg-gray-200 px-1 rounded">.msi</code> file</li>
              <li>Accept all default installation options</li>
              <li>Installation may take 5-10 minutes</li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">🍎 macOS</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Visit <a href="https://qgis.org/download/" className="text-orange-500 hover:underline font-medium" target="_blank" rel="noreferrer">
                  https://qgis.org/download/ <ExternalLink className="inline h-3 w-3" />
                </a>
              </li>
              <li>Click <strong>"Download for macOS"</strong></li>
              <li>Choose the <strong>Long Term Release</strong></li>
              <li>Download the <code className="bg-gray-200 px-1 rounded">.dmg</code> file</li>
              <li>Open the downloaded file and drag QGIS to your Applications folder</li>
              <li>
                <strong>First launch:</strong> Right-click QGIS → "Open" (required due to macOS security)
              </li>
            </ol>
            <Callout type="tip" title="macOS Security Warning">
              On first launch, macOS may warn that QGIS is from an "unidentified developer".
              Right-click the app and select "Open" to bypass this, or go to System Preferences → Security & Privacy
              and click "Open Anyway".
            </Callout>
          </div>
        </div>

        <Callout type="success" title="Verify QGIS Installation">
          <ol className="list-decimal list-inside space-y-1">
            <li>Open QGIS (search for "QGIS Desktop" in your applications)</li>
            <li>You should see the main QGIS window with a blank map canvas</li>
            <li>Look for the Layers panel on the left and toolbars at the top</li>
            <li>Try: <strong>Layer → Add Layer → Add Vector Layer</strong> to verify menus work</li>
          </ol>
          <p className="mt-2 font-medium">✓ If QGIS opens without errors, it's installed correctly!</p>
        </Callout>
      </section>

      {/* Section 6: Create Workshop Folder */}
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">6</span>
          Prepare Your Workshop Folder
        </h2>

        <p className="text-gray-700 mb-4">
          Organize your files before the workshop by creating a dedicated folder structure:
        </p>

        <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm mb-4">
          <div className="text-gray-400 mb-2"># Recommended folder structure</div>
          <div className="space-y-1">
            <div><span className="text-yellow-400">📁</span> Livestock_Movement_Workshop/</div>
            <div className="ml-4"><span className="text-yellow-400">📁</span> data/           <span className="text-gray-500"># Raw data files</span></div>
            <div className="ml-4"><span className="text-yellow-400">📁</span> scripts/        <span className="text-gray-500"># Your R scripts</span></div>
            <div className="ml-4"><span className="text-yellow-400">📁</span> outputs/        <span className="text-gray-500"># Results, plots, exports</span></div>
            <div className="ml-4"><span className="text-blue-400">📄</span> Livestock_Movement_Workshop.Rproj <span className="text-gray-500"># RStudio project file</span></div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-3">Create an RStudio Project</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Open RStudio</li>
          <li>Go to <strong>File → New Project</strong></li>
          <li>Select <strong>"New Directory"</strong></li>
          <li>Choose <strong>"New Project"</strong></li>
          <li>Enter directory name: <code className="bg-gray-100 px-1 rounded">Livestock_Movement_Workshop</code></li>
          <li>Browse to where you want to save it (e.g., Documents)</li>
          <li>Click <strong>"Create Project"</strong></li>
        </ol>

        <Callout type="tip" title="Why Use RStudio Projects?">
          RStudio Projects keep all your work organized in one place and set the working directory automatically.
          This means your scripts will work without needing to specify full file paths, and you can easily share your
          work with others.
        </Callout>
      </section>

      {/* Section 7: Download Workshop Data */}
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">7</span>
          Download Workshop Data
        </h2>

        <p className="text-gray-700 mb-4">
          All workshop data files are hosted online and can be downloaded directly into R. Run this code
          in RStudio to download all required files to your project's <code className="bg-gray-100 px-1 rounded">data/</code> folder.
        </p>

        <CodeBlock
          code={`# Workshop data base URL
base_url <- "https://connectanimalhealth.github.io/namibia-lits-workshop/data/"

# Create data folder if it doesn't exist
if (!dir.exists("data")) dir.create("data")

# Download movement data (Excel)
download.file(
  paste0(base_url, "animal_movement_2023_rev3.xlsx"),
  "data/animal_movement_2023_rev3.xlsx",
  mode = "wb"
)

# Download spatial data (GeoJSON - can be read directly by sf)
download.file(
  paste0(base_url, "nam_constituency_4326.geojson"),
  "data/nam_constituency_4326.geojson",
  mode = "wb"
)

download.file(
  paste0(base_url, "vcf_4326.geojson"),
  "data/vcf_4326.geojson",
  mode = "wb"
)

download.file(
  paste0(base_url, "nam_free_4326.geojson"),
  "data/nam_free_4326.geojson",
  mode = "wb"
)

# Download sample CSV files
download.file(
  paste0(base_url, "farms.csv"),
  "data/farms.csv"
)

download.file(
  paste0(base_url, "namibia_movements.csv"),
  "data/namibia_movements.csv"
)

cat("✓ All workshop data downloaded successfully!\\n")
list.files("data")`}
          language="r"
          title="Download all workshop data"
        />

        <Callout type="info" title="Alternative: Read Directly from URL">
          <p className="mb-2">For CSV and GeoJSON files, you can also read directly from the URL without downloading:</p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`# Read CSV directly from URL
farms <- read_csv("https://connectanimalhealth.github.io/namibia-lits-workshop/data/farms.csv")

# Read GeoJSON directly from URL
constituencies <- st_read("https://connectanimalhealth.github.io/namibia-lits-workshop/data/nam_constituency_4326.geojson")`}
          </pre>
          <p className="mt-2 text-sm text-gray-600">
            Note: Excel files (.xlsx) must be downloaded first - <code>readxl</code> doesn't support URLs directly.
          </p>
        </Callout>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Available Data Files</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-3 py-2 text-left">File</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Description</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Format</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono text-xs">animal_movement_2023_rev3.xlsx</td>
                <td className="border border-gray-200 px-3 py-2">NCA livestock movement records (35,970 movements)</td>
                <td className="border border-gray-200 px-3 py-2">Excel</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-mono text-xs">nam_constituency_4326.geojson</td>
                <td className="border border-gray-200 px-3 py-2">Namibia constituency boundaries (NCA region)</td>
                <td className="border border-gray-200 px-3 py-2">GeoJSON</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono text-xs">vcf_4326.geojson</td>
                <td className="border border-gray-200 px-3 py-2">Veterinary Cordon Fence boundary</td>
                <td className="border border-gray-200 px-3 py-2">GeoJSON</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-mono text-xs">nam_free_4326.geojson</td>
                <td className="border border-gray-200 px-3 py-2">FMD-free zone boundary</td>
                <td className="border border-gray-200 px-3 py-2">GeoJSON</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono text-xs">farms.csv</td>
                <td className="border border-gray-200 px-3 py-2">Sample farm locations</td>
                <td className="border border-gray-200 px-3 py-2">CSV</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-mono text-xs">namibia_movements.csv</td>
                <td className="border border-gray-200 px-3 py-2">Sample movement data for exercises</td>
                <td className="border border-gray-200 px-3 py-2">CSV</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Final Checklist */}
      <section className="bg-woah-orange/5 rounded-lg border-2 border-woah-orange p-6">
        <h2 className="text-2xl font-bold text-woah-orange mb-4 flex items-center gap-3">
          <CheckCircle className="h-7 w-7" />
          Pre-Workshop Checklist
        </h2>

        <p className="text-gray-700 mb-4">
          Before the workshop begins, confirm you have completed all of the following:
        </p>

        <div className="space-y-3">
          {[
            { label: 'R installed and working', detail: 'Can run 2+2 in R' },
            { label: 'RStudio installed and connected to R', detail: 'Can see R version in Console' },
            { label: 'All required R packages installed', detail: 'tidyverse, readxl, sf, igraph, lubridate, httr, jsonlite' },
            { label: 'EpiCollect5 app installed on phone', detail: 'Signed in with Google or email account' },
            { label: 'QGIS installed and working', detail: 'QGIS Desktop opens and shows map canvas' },
            { label: 'Workshop project folder created', detail: 'With data/, scripts/, outputs/ subfolders' },
            { label: 'Workshop data downloaded', detail: 'Movement data and spatial files in data/ folder' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg border">
              <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300" />
              <div>
                <p className="font-medium text-gray-800">{item.label}</p>
                <p className="text-sm text-gray-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <Callout type="warning" title="Need Help?">
          If you encounter any issues with installation, please contact <strong>John Grewar</strong> at least
          <strong> 48 hours before</strong> the workshop starts. Provide details about the error message and your
          operating system (Windows/Mac version).
          <div className="mt-2">
            <strong>Email:</strong> <a href="mailto:john@jdata.co.za" className="text-orange-500 hover:underline">john@jdata.co.za</a><br/>
            <strong>Phone:</strong> <a href="tel:+27836420610" className="text-orange-500 hover:underline">+27 83 642 0610</a>
          </div>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link to="/" className="text-orange-500 hover:underline">← Back to Home</Link>
        <Link to="/day3/session1" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
          Start Workshop: R Basics →
        </Link>
      </div>
    </div>
  )
}
