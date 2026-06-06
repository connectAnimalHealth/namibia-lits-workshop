import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'

export default function Day3Session1() {
  const installCode = `# Install required packages (run once)
install.packages(c(
  "tidyverse",   # Data manipulation and visualization
  "readxl",      # Read Excel files
  "sf",          # Spatial data
  "igraph",      # Network analysis
  "lubridate"    # Date handling
))`

  const basicRCode = `# R as a calculator
2 + 2
10 / 3
5^2

# Storing values in variables
x <- 10
y <- 5
x + y

# Creating vectors (lists of values)
animals <- c(45, 32, 67, 89, 23)
mean(animals)  # Average
sum(animals)   # Total`

  const dataTypesCode = `# Different data types

# Numeric
cattle_count <- 150

# Character (text)
farm_name <- "Okahandja Farm"
region <- "Khomas"

# Logical (TRUE/FALSE)
is_fmd_free <- TRUE
crossed_vcf <- FALSE

# Factor (categorical)
species <- factor(c("Cattle", "Goats", "Sheep", "Cattle"))
levels(species)  # Shows unique categories`

  const dataframeCode = `# Creating a dataframe (like a spreadsheet)
movements <- data.frame(
  movement_id = c("MOV001", "MOV002", "MOV003"),
  origin = c("Farm_A", "Farm_B", "Farm_A"),
  destination = c("Farm_C", "Farm_A", "Abattoir"),
  animals = c(45, 23, 67),
  date = as.Date(c("2025-01-15", "2025-01-16", "2025-01-17"))
)

# View the data
movements

# Access specific columns
movements$animals
movements$origin

# Summary statistics
summary(movements)`

  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-namibia-gold bg-namibia-blue/10 px-2 py-1 rounded">Day 3 - Session 1</span>
        <h1 className="text-3xl font-bold text-namibia-blue mt-2 mb-2">R and RStudio Setup</h1>
        <p className="text-gray-600">Getting started with R for epidemiological analysis</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why R?</h2>
        <p className="text-gray-700 mb-4">
          R is a free, open-source programming language designed for statistical analysis and 
          data visualization. It's widely used in epidemiology and veterinary science because:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">Advantages</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>✓ Free and open source</li>
              <li>✓ Excellent for statistics and visualization</li>
              <li>✓ Huge community and package ecosystem</li>
              <li>✓ Reproducible research workflows</li>
              <li>✓ Handles large datasets efficiently</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-2">Key Packages We'll Use</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li><strong>tidyverse:</strong> Data wrangling & viz</li>
              <li><strong>sf:</strong> Spatial analysis</li>
              <li><strong>igraph:</strong> Network analysis</li>
              <li><strong>lubridate:</strong> Date handling</li>
              <li><strong>readxl:</strong> Excel import</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">RStudio Interface</h2>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-white p-3 rounded border">
              <p className="font-bold text-namibia-blue">Source (Top Left)</p>
              <p className="text-gray-600">Write and save your R scripts</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="font-bold text-namibia-blue">Environment (Top Right)</p>
              <p className="text-gray-600">View your data and variables</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="font-bold text-namibia-blue">Console (Bottom Left)</p>
              <p className="text-gray-600">Run commands interactively</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="font-bold text-namibia-blue">Files/Plots (Bottom Right)</p>
              <p className="text-gray-600">View files, plots, help, packages</p>
            </div>
          </div>
        </div>
        
        <Callout type="tip" title="Pro Tip: Use Projects">
          Always work within an RStudio Project. This keeps your files organized and makes 
          your work portable. Go to File → New Project to create one.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Installing Packages</h2>
        <p className="text-gray-700 mb-4">
          Packages extend R's functionality. You only need to install them once, but load them 
          each session with <code className="bg-gray-100 px-1 rounded">library()</code>.
        </p>
        <CodeBlock code={installCode} language="r" title="Install packages (run once)" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">R Basics</h2>
        <CodeBlock code={basicRCode} language="r" title="R as a calculator" />
        
        <Callout type="info" title="The Assignment Operator">
          In R, we use <code className="bg-blue-100 px-1 rounded">&lt;-</code> to assign values to variables. 
          You can also use <code className="bg-blue-100 px-1 rounded">=</code> but <code className="bg-blue-100 px-1 rounded">&lt;-</code> is 
          the R convention. Keyboard shortcut: <strong>Alt + -</strong> (Windows) or <strong>Option + -</strong> (Mac).
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Types</h2>
        <CodeBlock code={dataTypesCode} language="r" title="R data types" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dataframes</h2>
        <p className="text-gray-700 mb-4">
          Dataframes are the most important data structure in R - they're like Excel spreadsheets 
          with rows (observations) and columns (variables).
        </p>
        <CodeBlock code={dataframeCode} language="r" title="Working with dataframes" />
      </section>

      <Exercise title="Hands-on: Your First R Script">
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Create a new RStudio Project called "LITS_Workshop"</li>
          <li>Create a new R script (File → New File → R Script)</li>
          <li>Type and run the code examples above</li>
          <li>Create your own dataframe with 5 farms and their cattle counts</li>
          <li>Calculate the mean and sum of cattle</li>
          <li>Save your script as "day3_basics.R"</li>
        </ol>
      </Exercise>

      <div className="flex justify-between">
        <a href="#/day2/session2" className="text-namibia-blue hover:underline">← Previous: EpiCollect5 API</a>
        <a href="#/day3/session2" className="bg-namibia-blue text-white px-6 py-2 rounded-lg hover:bg-namibia-blue/90">
          Next: Data Import & Cleaning →
        </a>
      </div>
    </div>
  )
}