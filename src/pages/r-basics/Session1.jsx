import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'
import InlineCode from '../../components/InlineCode'
import { Link } from 'react-router-dom'

export default function Day3Session1() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-sm font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded">
          Day 1-2 - Session 1
        </span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">
          Introduction to R and RStudio
        </h1>
        <p className="text-gray-600">
          Getting started with R for epidemiological data analysis
        </p>
      </div>

      {/* Learning Objectives */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
        <h2 className="text-xl font-bold mb-3 text-orange-600">Learning Objectives</h2>
        <p className="mb-3 text-gray-700">By the end of this session, you will be able to:</p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Navigate the RStudio interface and understand each panel's purpose</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Create and manage RStudio Projects for reproducible workflows</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Write basic R code: arithmetic, variables, vectors, and functions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Understand R's core data types: numeric, character, logical, and factor</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Create and manipulate dataframes (R's equivalent of spreadsheets)</span>
          </li>
        </ul>
      </div>

      {/* Pre-requisites check */}
      <Callout type="warning" title="Before You Begin">
        <p className="mb-2">Ensure you have completed the <Link to="/pre-workshop" className="text-blue-600 underline font-medium">Pre-Workshop Setup</Link>:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>R installed and working</li>
          <li>RStudio installed and connected to R</li>
          <li>Required packages installed (tidyverse, readxl, sf, igraph, lubridate, httr, jsonlite)</li>
        </ul>
      </Callout>

      {/* Section 1: RStudio Interface */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. The RStudio Interface</h2>

        <p className="text-gray-700 mb-4">
          When you open RStudio, you'll see a window divided into <strong>four panels</strong>. Each panel serves
          a specific purpose in your workflow. Let's explore each one:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
              <h3 className="font-bold text-blue-800 mb-2">📝 Source Panel (Top-Left)</h3>
              <p className="text-gray-700 mb-2">
                This is where you write and save your R scripts. Think of it like a Word document for code.
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Create new scripts: <kbd className="bg-gray-200 px-1 rounded">Ctrl+Shift+N</kbd></li>
                <li>• Save scripts: <kbd className="bg-gray-200 px-1 rounded">Ctrl+S</kbd></li>
                <li>• Run current line: <kbd className="bg-gray-200 px-1 rounded">Ctrl+Enter</kbd></li>
                <li>• Run entire script: <kbd className="bg-gray-200 px-1 rounded">Ctrl+Shift+Enter</kbd></li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <h3 className="font-bold text-green-800 mb-2">📊 Environment Panel (Top-Right)</h3>
              <p className="text-gray-700 mb-2">
                Shows all your data objects, variables, and functions currently in memory.
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Click on a dataframe to view it in a spreadsheet-like viewer</li>
                <li>• See variable types and sizes at a glance</li>
                <li>• Use the "Import Dataset" button for CSV/Excel files</li>
                <li>• The "History" tab shows recent commands</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-300">
              <h3 className="font-bold text-orange-800 mb-2">💻 Console Panel (Bottom-Left)</h3>
              <p className="text-gray-700 mb-2">
                The R interpreter. Commands run here, and output appears here.
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• <span className="text-blue-600">&gt;</span> means R is ready for input</li>
                <li>• <span className="text-blue-600">+</span> means R is waiting for more input (incomplete command)</li>
                <li>• <span className="text-red-600">Error:</span> something went wrong</li>
                <li>• <span className="text-orange-600">Warning:</span> worth noting but code ran</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
              <h3 className="font-bold text-purple-800 mb-2">📁 Files/Plots/Help (Bottom-Right)</h3>
              <p className="text-gray-700 mb-2">
                Multi-purpose panel with several tabs:
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• <strong>Files:</strong> Browse and open files in your project</li>
                <li>• <strong>Plots:</strong> View visualizations you create</li>
                <li>• <strong>Packages:</strong> Manage installed packages</li>
                <li>• <strong>Help:</strong> Access R documentation</li>
              </ul>
            </div>
          </div>
        </div>

        <KeyConcept title="The Console vs. Scripts">
          <p className="mb-2">
            You can run R code in two ways:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div className="bg-white p-3 rounded border">
              <h4 className="font-bold text-gray-800 mb-1">Console (Interactive)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Type directly and press Enter</li>
                <li>• Good for quick tests and exploration</li>
                <li>• Commands are NOT saved</li>
                <li>• History lost when RStudio closes</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border">
              <h4 className="font-bold text-gray-800 mb-1">Scripts (Saved Code)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Write in Source panel, run with Ctrl+Enter</li>
                <li>• <strong>Best practice: Always use scripts!</strong></li>
                <li>• Code is saved and reproducible</li>
                <li>• Can share with others or rerun later</li>
              </ul>
            </div>
          </div>
        </KeyConcept>
      </section>

      {/* Section 2: R Projects */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Working with RStudio Projects</h2>

        <KeyConcept title="What is an RStudio Project?">
          <p className="mb-3">
            An RStudio Project is a folder that contains all the files for your analysis, plus a special
            <code className="bg-gray-100 px-1 rounded mx-1">.Rproj</code> file that tells RStudio to use this folder as the
            <strong> working directory</strong>.
          </p>
          <p className="mb-3">
            The <strong>working directory</strong> is where R looks for files when you try to read data, and where it saves
            files when you export results. Using Projects means you never have to type long file paths or worry about
            <code className="bg-gray-100 px-1 rounded mx-1">setwd()</code>.
          </p>
          <p className="text-green-700 font-medium">
            Rule: Always use Projects! Never use <InlineCode>setwd()</InlineCode>.
          </p>
        </KeyConcept>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Creating Your Workshop Project (a reminder)</h3>

        <div className="bg-white border rounded-lg p-4 mb-4">
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <span>In RStudio, go to <strong>File → New Project</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <span>Select <strong>New Directory → New Project</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <span>Directory name: <code className="bg-gray-100 px-1 rounded">Livestock_Movement_Workshop</code></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <span>Browse to your Documents folder (or where you want to save)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
              <span>Click <strong>Create Project</strong></span>
            </li>
          </ol>
        </div>

        <Callout type="success" title="How to Know You're in a Project">
          Look at the top-right corner of RStudio. You should see the project name (e.g., "Livestock_Movement_Workshop").
          If it says "Project: (None)", you're not in a project!
        </Callout>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Create Your First R Script</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Go to <strong>File → New File → R Script</strong> (or press <kbd className="bg-gray-200 px-1 rounded">Ctrl+Shift+N</kbd>)</li>
          <li>A blank script opens in the Source panel</li>
          <li>Save it immediately: <strong>File → Save</strong> (or <kbd className="bg-gray-200 px-1 rounded">Ctrl+S</kbd>)</li>
          <li>Name it <code className="bg-gray-100 px-1 rounded">01_r_basics.R</code></li>
          <li>Take note in the <code className="bg-gray-100 px-1 rounded">File Explorer</code> in the bottom right panel where you will see the file saved</li>
        </ol>
      </section>

      {/* Section 3: R as a Calculator */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. R as a Calculator</h2>

        <p className="text-gray-700 mb-4">
          At its simplest, R works as a powerful calculator. Let's start with basic arithmetic. Paste the code below into your new script and run it to see how R handles calculations. Save your script after running the code!
        </p>

        <CodeBlock
          title="Basic arithmetic in R"
          language="r"
          code={`# Addition
2 + 2
## [1] 4

# Subtraction
10 - 3
## [1] 7

# Multiplication
5 * 4
## [1] 20

# Division
15 / 3
## [1] 5

# Exponentiation (power)
2^3    # 2 to the power of 3
## [1] 8

# Square root
sqrt(16)
## [1] 4

# Natural logarithm
log(10)
## [1] 2.302585`}
        />

        <Callout type="info" title="Understanding R Output">
          <p className="mb-2">When R prints a result, it shows <code className="bg-blue-100 px-1 rounded">[1]</code> at the start.
          This is the <strong>index</strong> - it tells you this is the first element of the result.</p>
          <p>For longer outputs, you'll see <code className="bg-blue-100 px-1 rounded">[1]</code>, <code className="bg-blue-100 px-1 rounded">[11]</code>,
          <code className="bg-blue-100 px-1 rounded">[21]</code>, etc., showing where each row starts.</p>
        </Callout>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Order of Operations</h3>
        <p className="text-gray-700 mb-4">
          R follows standard mathematical order: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction (PEMDAS).
        </p>

        <CodeBlock
          title="Order of operations"
          language="r"
          code={`# Without parentheses
2 + 3 * 4
## [1] 14   # Multiplication first: 3*4=12, then 2+12=14

# With parentheses
(2 + 3) * 4
## [1] 20   # Parentheses first: 2+3=5, then 5*4=20

# More complex example
(10 - 2)^2 / 4
## [1] 16   # (10-2)=8, 8^2=64, 64/4=16`}
        />
      </section>

      {/* Section 4: Variables and Assignment */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Variables and Assignment</h2>

        <KeyConcept title="What is a Variable?">
          <p className="mb-3">
            A <strong>variable</strong> is a named container that stores a value. Instead of typing
            <code className="bg-gray-100 px-1 rounded mx-1">150</code> every time you need to refer to the number of cattle,
            you can store it in a variable called <code className="bg-gray-100 px-1 rounded mx-1">cattle_count</code>.
          </p>
          <p>
            In R, we use the <strong>assignment operator</strong> <code className="bg-gray-100 px-1 rounded mx-1">&lt;-</code>
            (less-than followed by minus) to assign values to variables.
          </p>
          <p>
            Variables, once created, are available to view in the <code className="bg-gray-100 px-1 rounded mx-1">Environment panel</code> and can be used in calculations, just like the original value.
          </p>
        </KeyConcept>

        <CodeBlock
          title="Creating and using variables"
          language="r"
          code={`# Store the number of cattle in a variable
cattle_count <- 150

# Now we can use this variable
cattle_count
## [1] 150

# Use it in calculations
cattle_count * 2
## [1] 300

# Create more variables
goat_count <- 75
sheep_count <- 200

# Calculate total livestock
total_animals <- cattle_count + goat_count + sheep_count
total_animals
## [1] 425

# Update a variable (overwrites the old value)
cattle_count <- 175
cattle_count
## [1] 175`}
        />

        <Callout type="tip" title="Variable Naming Rules">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Must start with a letter</strong> - <code className="bg-purple-100 px-1 rounded">cattle1</code> ✓ but not <code className="bg-red-100 px-1 rounded">1cattle</code> ✗</li>
            <li><strong>Can contain letters, numbers, underscores, dots</strong> - <code className="bg-purple-100 px-1 rounded">cattle_count</code>, <code className="bg-purple-100 px-1 rounded">cattle.count</code>, <code className="bg-purple-100 px-1 rounded">cattle2</code></li>
            <li><strong>No spaces allowed</strong> - use underscores: <code className="bg-purple-100 px-1 rounded">cattle_count</code> not <code className="bg-red-100 px-1 rounded">cattle count</code></li>
            <li><strong>Case-sensitive</strong> - <code className="bg-purple-100 px-1 rounded">Cattle</code> and <code className="bg-purple-100 px-1 rounded">cattle</code> are different variables</li>
            <li><strong>Use descriptive names</strong> - <code className="bg-purple-100 px-1 rounded">total_animals</code> is better than <code className="bg-red-100 px-1 rounded">x</code></li>
          </ul>
        </Callout>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mt-4">
          <h4 className="font-bold text-yellow-800 mb-2">💡 Keyboard Shortcut for &lt;-</h4>
          <p className="text-yellow-800">
            Instead of typing <code className="bg-yellow-100 px-1 rounded">&lt;</code> and <code className="bg-yellow-100 px-1 rounded">-</code> separately, use:
          </p>
          <ul className="mt-2 space-y-1 text-yellow-800">
            <li><strong>Windows:</strong> <kbd className="bg-yellow-200 px-2 py-0.5 rounded">Alt</kbd> + <kbd className="bg-yellow-200 px-2 py-0.5 rounded">-</kbd></li>
            <li><strong>Mac:</strong> <kbd className="bg-yellow-200 px-2 py-0.5 rounded">Option</kbd> + <kbd className="bg-yellow-200 px-2 py-0.5 rounded">-</kbd></li>
          </ul>
        </div>
      </section>

      {/* Section 5: Vectors */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Vectors: Working with Multiple Values</h2>

        <KeyConcept title="What is a Vector?">
          <p className="mb-3">
            A <strong>vector</strong> is R's fundamental data structure - it's an ordered collection of values
            <strong> of the same type</strong>. Think of it as a column in a spreadsheet.
          </p>
          <p>
            We create vectors using the <InlineCode>c()</InlineCode> function (c stands for "combine" or "concatenate").
          </p>
        </KeyConcept>

        <CodeBlock
          title="Creating and using vectors"
          language="r"
          code={`# Vector of cattle counts from 5 farms
cattle <- c(45, 67, 23, 89, 54)
cattle
## [1] 45 67 23 89 54

# Vector of farm names
farm_names <- c("Farm A", "Farm B", "Farm C", "Farm D", "Farm E")
farm_names
## [1] "Farm A" "Farm B" "Farm C" "Farm D" "Farm E"

# Quick ways to create numeric sequences
1:10
## [1]  1  2  3  4  5  6  7  8  9 10

seq(0, 100, by = 10)
## [1]   0  10  20  30  40  50  60  70  80  90 100

# Repeat values
rep("Cattle", 3)
## [1] "Cattle" "Cattle" "Cattle"`}
        />

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Vector Operations</h3>

        <CodeBlock
          title="Common vector operations"
          language="r"
          code={`cattle <- c(45, 67, 23, 89, 54)

# Summary statistics
length(cattle)    # How many elements
## [1] 5

sum(cattle)       # Total
## [1] 278

mean(cattle)      # Average
## [1] 55.6

median(cattle)    # Middle value
## [1] 54

min(cattle)       # Smallest
## [1] 23

max(cattle)       # Largest
## [1] 89

range(cattle)     # Min and max
## [1] 23 89

sd(cattle)        # Standard deviation
## [1] 24.96

# Arithmetic on entire vectors
cattle * 2        # Double each value
## [1]  90 134  46 178 108

# Access specific elements (R uses 1-based indexing!)
cattle[1]         # First element
## [1] 45

cattle[3]         # Third element
## [1] 23

cattle[c(1, 3, 5)]  # First, third, and fifth
## [1] 45 23 54

range(cattle)[2] # Max value using range()
## [1] 89`
}
        />

        <Callout type="warning" title="R Uses 1-Based Indexing">
          Unlike Python and many other languages that start counting at 0, <strong>R starts counting at 1</strong>.
          The first element is <code className="bg-yellow-100 px-1 rounded">x[1]</code>, not <code className="bg-yellow-100 px-1 rounded">x[0]</code>.
        </Callout>
      </section>

      {/* Section 6: Data Types */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Data Types in R</h2>

        <p className="text-gray-700 mb-4">
          R has several fundamental data types. Understanding these is crucial because they determine what
          operations you can perform on your data.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Examples</th>
                <th className="border border-gray-300 px-3 py-2 text-left">LITS Use Cases</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-blue-600">numeric</td>
                <td className="border border-gray-200 px-3 py-2">Numbers (integers and decimals)</td>
                <td className="border border-gray-200 px-3 py-2"><code>42</code>, <code>3.14</code>, <code>-17.5</code></td>
                <td className="border border-gray-200 px-3 py-2">Cattle counts, distances, GPS coordinates</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-green-600">character</td>
                <td className="border border-gray-200 px-3 py-2">Text strings (in quotes)</td>
                <td className="border border-gray-200 px-3 py-2"><code>"Farm A"</code>, <code>"Khomas"</code></td>
                <td className="border border-gray-200 px-3 py-2">Farm names, regions, permit IDs</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-purple-600">logical</td>
                <td className="border border-gray-200 px-3 py-2">TRUE or FALSE values</td>
                <td className="border border-gray-200 px-3 py-2"><code>TRUE</code>, <code>FALSE</code></td>
                <td className="border border-gray-200 px-3 py-2">Is FMD-free? Crossed VCF?</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-orange-600">factor</td>
                <td className="border border-gray-200 px-3 py-2">Categorical data with fixed levels</td>
                <td className="border border-gray-200 px-3 py-2"><code>factor(c("Low", "Med", "High"))</code></td>
                <td className="border border-gray-200 px-3 py-2">FMD zones, species, regions</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono font-bold text-red-600">Date</td>
                <td className="border border-gray-200 px-3 py-2">Calendar dates</td>
                <td className="border border-gray-200 px-3 py-2"><code>as.Date("2025-06-08")</code></td>
                <td className="border border-gray-200 px-3 py-2">Movement dates, inspection dates</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock
          title="Working with data types"
          language="r"
          code={`# Numeric
cattle_count <- 150
distance_km <- 45.7

# Character (text) - always use quotes!
farm_name <- "Okahandja Farm"
region <- "Khomas"

# Logical (TRUE/FALSE) - no quotes, case-sensitive
is_fmd_free <- TRUE
crossed_vcf <- FALSE

# Check data types with class()
class(cattle_count)
## [1] "numeric"

class(farm_name)
## [1] "character"

class(is_fmd_free)
## [1] "logical"

# Factor for categorical data
fmd_zone <- factor(c("FMD-Free", "NCA", "Protection", "FMD-Free"))
fmd_zone
## [1] FMD-Free   NCA        Protection FMD-Free
## Levels: FMD-Free NCA Protection

levels(fmd_zone)
## [1] "FMD-Free" "NCA" "Protection"`}
        />

        <KeyConcept title="Why Use Factors?">
          <p className="mb-2">
            Factors are essential for categorical data because they:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Ensure only valid categories can be entered (no typos like "Kahttle" instead of "Cattle")</li>
            <li>Control the order of categories in plots and tables</li>
            <li>Enable proper statistical analysis (R treats factors as categorical, not text)</li>
            <li>Use memory efficiently for repeated values</li>
          </ul>
        </KeyConcept>

        <Callout type="tip" title="See It In Action: Ordered Factors">
          <p className="mb-2">
            Run this code to see why ordered factors matter. Notice how the age groups appear in the plots -
            without factors, R sorts alphabetically which rarely makes sense for categorical data!
          </p>
        </Callout>

        <CodeBlock
          code={`# Check and install required packages
packages <- c("ggplot2", "patchwork")
new_packages <- packages[!(packages %in% installed.packages()[,"Package"])]
if(length(new_packages)) install.packages(new_packages)

# Sample animal data with age categories
set.seed(42)  # For reproducibility
animals <- data.frame(
  id = 1:30,
  age_text = sample(c("Juvenile", "Youth", "Adult"), 30, replace = TRUE),
  weight = c(runif(10, 50, 150), runif(10, 100, 250), runif(10, 200, 500))
)

# Plot 1: Using character/text (alphabetical order - wrong!)
library(ggplot2)
p1 <- ggplot(animals, aes(x = age_text, y = weight, fill = age_text)) +
  geom_boxplot() +
  scale_fill_manual(values = c("Adult" = "#e74c3c", "Juvenile" = "#3498db", "Youth" = "#2ecc71")) +
  labs(title = "WITHOUT Factor",
       subtitle = "Alphabetical: Adult, Juvenile, Youth",
       x = "Age Category", y = "Weight (kg)") +
  theme_minimal() +
  theme(legend.position = "none")

# Convert to ORDERED factor with correct life-stage sequence
animals$age_factor <- factor(
  animals$age_text,
  levels = c("Juvenile", "Youth", "Adult"),  # Logical biological order!
  ordered = TRUE
)

# Plot 2: Using ordered factor (correct biological order)
p2 <- ggplot(animals, aes(x = age_factor, y = weight, fill = age_factor)) +
  geom_boxplot() +
  scale_fill_manual(values = c("Juvenile" = "#3498db", "Youth" = "#2ecc71", "Adult" = "#e74c3c")) +
  labs(title = "WITH Ordered Factor",
       subtitle = "Logical: Juvenile → Youth → Adult",
       x = "Age Category", y = "Weight (kg)") +
  theme_minimal() +
  theme(legend.position = "none")

# Display both plots side by side
library(patchwork)
p1 + p2`}
          language="r"
          title="Demonstration: Character vs Ordered Factor in Plots"
        />

        <div className="mt-4 bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Key insight:</strong> Without factors, R sorts alphabetically (Adult, Juvenile, Youth) -
            which makes no biological sense! With an ordered factor, you control the sequence. This is essential for:
          </p>
          <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
            <li>Life stages (Calf → Weaner → Adult)</li>
            <li>Disease severity (Mild → Moderate → Severe)</li>
            <li>Risk levels (Low → Medium → High)</li>
            <li>Age categories (Juvenile → Youth → Adult)</li>
          </ul>
        </div>
      </section>

      {/* Section 7: Dataframes */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Dataframes: The Heart of R Data Analysis</h2>

        <KeyConcept title="What is a Dataframe?">
          <p className="mb-3">
            A <strong>dataframe</strong> is R's equivalent of a spreadsheet or database table. It's a two-dimensional
            structure with:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li><strong>Rows</strong> = observations (e.g., individual movements, farms, animals)</li>
            <li><strong>Columns</strong> = variables (e.g., date, origin, destination, count)</li>
          </ul>
          <p>
            Each column is a vector, so each column must contain values of the same type, but different columns can have
            different types. This is exactly like Excel - you can have text in one column and numbers in another.
          </p>
        </KeyConcept>

        <CodeBlock
          title="Creating and exploring a dataframe"
          language="r"
          code={`# Create a dataframe of livestock movements
movements <- data.frame(
  movement_id = c("MOV001", "MOV002", "MOV003", "MOV004", "MOV005"),
  origin = c("Farm A", "Farm B", "Farm A", "Farm C", "Farm B"),
  destination = c("Abattoir", "Farm D", "Market", "Farm A", "Abattoir"),
  cattle = c(45, 23, 67, 12, 89),
  date = as.Date(c("2025-01-15", "2025-01-16", "2025-01-17", "2025-01-18", "2025-01-19"))
)

# View the dataframe
movements
##   movement_id origin destination cattle       date
## 1      MOV001 Farm A    Abattoir     45 2025-01-15
## 2      MOV002 Farm B      Farm D     23 2025-01-16
## 3      MOV003 Farm A      Market     67 2025-01-17
## 4      MOV004 Farm C      Farm A     12 2025-01-18
## 5      MOV005 Farm B    Abattoir     89 2025-01-19

# Dimensions: rows x columns
dim(movements)
## [1] 5 5

# Number of rows
nrow(movements)
## [1] 5

# Number of columns
ncol(movements)
## [1] 5

# Column names
names(movements)
## [1] "movement_id" "origin"      "destination" "cattle"      "date"

# Structure - very useful!
str(movements)
## 'data.frame':	5 obs. of  5 variables:
##  $ movement_id: chr  "MOV001" "MOV002" "MOV003" "MOV004" ...
##  $ origin     : chr  "Farm A" "Farm B" "Farm A" "Farm C" ...
##  $ destination: chr  "Abattoir" "Farm D" "Market" "Farm A" ...
##  $ cattle     : num  45 23 67 12 89
##  $ date       : Date, format: "2025-01-15" "2025-01-16" ...`}
        />

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Accessing Data in a Dataframe</h3>

        <CodeBlock
          title="Selecting rows and columns"
          language="r"
          code={`# Access a single column with $
movements$cattle
## [1] 45 23 67 12 89

movements$origin
## [1] "Farm A" "Farm B" "Farm A" "Farm C" "Farm B"

# Calculate statistics on a column
sum(movements$cattle)
## [1] 236

mean(movements$cattle)
## [1] 47.2

# Access by position: dataframe[rows, columns]
movements[1, ]        # First row, all columns
movements[, 2]        # All rows, second column
movements[1, 2]       # First row, second column
movements[1:3, ]      # First 3 rows

# Access by name
movements[, "cattle"]
movements[, c("origin", "destination")]

# Filtering: select rows that meet a condition
movements[movements$cattle > 50, ]
##   movement_id origin destination cattle       date
## 3      MOV003 Farm A      Market     67 2025-01-17
## 5      MOV005 Farm B    Abattoir     89 2025-01-19

movements[movements$origin == "Farm A", ]
##   movement_id origin destination cattle       date
## 1      MOV001 Farm A    Abattoir     45 2025-01-15
## 3      MOV003 Farm A      Market     67 2025-01-17`}
        />

        <Callout type="info" title="The summary() Function">
          <p className="mb-2">
            The <InlineCode>summary()</InlineCode> function gives a quick overview of your dataframe:
          </p>
          <pre className="bg-gray-100 p-2 rounded text-xs mt-2 overflow-x-auto">
{`summary(movements)
 movement_id           origin          destination            cattle           date
 Length:5           Length:5           Length:5           Min.   :12.00   Min.   :2025-01-15
 Class :character   Class :character   Class :character   1st Qu.:23.00   1st Qu.:2025-01-16
 Mode  :character   Mode  :character   Mode  :character   Median :45.00   Median :2025-01-17
                                                          Mean   :47.20   Mean   :2025-01-17
                                                          3rd Qu.:67.00   3rd Qu.:2025-01-18
                                                          Max.   :89.00   Max.   :2025-01-19`}
          </pre>
        </Callout>
      </section>

      {/* Exercise */}
      <Exercise title="Practical Exercise: Your First R Script" type="individual" duration="25 min">
        <p className="text-gray-700 mb-4">
          Create an R script that analyzes livestock data from 5 farms in the Khomas region:
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-gray-800 mb-2">Farm Data</h4>
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1 text-left">Farm</th>
                <th className="px-2 py-1 text-left">Cattle</th>
                <th className="px-2 py-1 text-left">Goats</th>
                <th className="px-2 py-1 text-left">FMD Zone</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-2 py-1">Okahandja Farm</td><td className="px-2 py-1">150</td><td className="px-2 py-1">45</td><td className="px-2 py-1">FMD-Free</td></tr>
              <tr className="bg-gray-100"><td className="px-2 py-1">Windhoek Ranch</td><td className="px-2 py-1">230</td><td className="px-2 py-1">0</td><td className="px-2 py-1">FMD-Free</td></tr>
              <tr><td className="px-2 py-1">Hosea Kutako</td><td className="px-2 py-1">87</td><td className="px-2 py-1">120</td><td className="px-2 py-1">Protection</td></tr>
              <tr className="bg-gray-100"><td className="px-2 py-1">Dordabis</td><td className="px-2 py-1">310</td><td className="px-2 py-1">55</td><td className="px-2 py-1">FMD-Free</td></tr>
              <tr><td className="px-2 py-1">Gobabis Road</td><td className="px-2 py-1">175</td><td className="px-2 py-1">200</td><td className="px-2 py-1">Protection</td></tr>
            </tbody>
          </table>
        </div>

        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Create a new R script called <code className="bg-gray-100 px-1 rounded">01_farm_analysis.R</code></li>
          <li>Create a dataframe called <code className="bg-gray-100 px-1 rounded">farms</code> with the data above</li>
          <li>
            Calculate:
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>Total cattle across all farms</li>
              <li>Average goat count per farm</li>
              <li>Farm with the most cattle</li>
            </ul>
          </li>
          <li>Create a new column <code className="bg-gray-100 px-1 rounded">total_animals</code> = cattle + goats</li>
          <li>Filter to show only farms in the "Protection" zone</li>
          <li>Save your script</li>
        </ol>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-sm text-green-800">
            <strong>Expected outputs:</strong> Total cattle = 952, Average goats = 84, Most cattle = Dordabis (310)
          </p>
        </div>
      </Exercise>

      {/* Answer Section */}
      <details className="bg-amber-50 border border-amber-200 rounded-lg mb-8">
        <summary className="px-4 py-3 cursor-pointer font-medium text-amber-800 hover:bg-amber-100 rounded-lg">
          Click to reveal answer
        </summary>
        <div className="px-4 pb-4">
          <CodeBlock
            code={`# 01_farm_analysis.R
# Livestock data analysis for Khomas region farms

# Step 1: Create the farms dataframe
farms <- data.frame(
  farm = c("Okahandja Farm", "Windhoek Ranch", "Hosea Kutako", "Dordabis", "Gobabis Road"),
  cattle = c(150, 230, 87, 310, 175),
  goats = c(45, 0, 120, 55, 200),
  fmd_zone = c("FMD-Free", "FMD-Free", "Protection", "FMD-Free", "Protection")
)

# View the dataframe
farms

# Step 2: Calculate total cattle across all farms
total_cattle <- sum(farms$cattle)
print(paste("Total cattle:", total_cattle))
# Output: 952

# Step 3: Calculate average goat count per farm
avg_goats <- mean(farms$goats)
print(paste("Average goats per farm:", avg_goats))
# Output: 84

# Step 4: Find farm with the most cattle
# Method A: Find the max value, then filter for that row
max_cattle_count <- max(farms$cattle)
max_cattle_farm <- farms[farms$cattle == max_cattle_count, ]
print(max_cattle_farm)
# Shows the full row for Dordabis

# Method B (alternative): Use which.max() to get the row index directly
max_cattle_farm <- farms$farm[which.max(farms$cattle)]
print(paste("Farm with most cattle:", max_cattle_farm, "-", max_cattle_count, "cattle"))
# Output: Dordabis - 310 cattle

# Step 5: Create total_animals column
farms$total_animals <- farms$cattle + farms$goats
farms

# Step 6: Filter to show only Protection zone farms
protection_farms <- farms[farms$fmd_zone == "Protection", ]
protection_farms
# Shows: Hosea Kutako and Gobabis Road`}
            language="r"
            title="Solution: 01_farm_analysis.R"
          />
        </div>
      </details>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link to="/pre-workshop" className="text-orange-500 hover:underline">← Previous: Pre-Workshop Setup</Link>
        <Link to="/r-basics/session2" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
          Next: Data Import & Wrangling →
        </Link>
      </div>
    </div>
  )
}
