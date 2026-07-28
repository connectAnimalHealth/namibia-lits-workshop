import { Link } from 'react-router-dom'
import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'
import { FileSpreadsheet, FileSearch, Wrench, AlertTriangle, Table, Filter, ArrowDownUp } from 'lucide-react'

export default function Day3Session2() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded">Day 1-2 - Session 2</span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">Data Import, Inspection & Wrangling</h1>
        <p className="text-gray-600">Getting data into R and preparing it for analysis</p>
      </div>

      {/* Learning Objectives */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
        <h2 className="text-xl font-bold mb-3 text-orange-600">Learning Objectives</h2>
        <p className="mb-3 text-gray-700">By the end of this session, you will be able to:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
            <span>Import data from CSV files, Excel spreadsheets, and the clipboard</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
            <span>Understand working directories and file paths in R</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
            <span>Inspect and explore data structure, dimensions, and content</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">4</span>
            <span>Use the tidyverse for data manipulation (filter, select, mutate, arrange)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">5</span>
            <span>Handle missing values and inconsistent data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">6</span>
            <span>Create summary statistics and counts using group_by and summarise</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">7</span>
            <span>Join datasets and clean inconsistent naming (e.g., matching constituency names to GIDs)</span>
          </li>
        </ul>
      </div>

      {/* Working Directory Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <FileSpreadsheet className="h-7 w-7 text-woah-orange" />
          1. Working Directory and File Paths
        </h2>

        <p className="text-gray-700 mb-4">
          Before importing data, R needs to know <strong>where to look for files</strong>. The working directory
          is the default location where R looks for files and saves output. If you're using an RStudio Project
          (which you should be!), your working directory is automatically set to the project folder.
        </p>

        <KeyConcept title="Working Directory">
          <p>
            The <strong>working directory</strong> is R's "home base" - the folder where R looks for files
            when you don't specify a full path. When you use RStudio Projects, your working directory is
            automatically set to the project folder, making file management much simpler.
          </p>
        </KeyConcept>

        <CodeBlock
          code={`# Check your current working directory
getwd()
# [1] "/Users/yourname/Projects/namibia-lits-workshop"

# If using an RStudio Project, this should be your project folder!

# List files in your working directory
list.files()
# [1] "data"           "namibia-lits.Rproj"  "scripts"

# List files in the data subfolder
list.files("data")
# [1] "animal_movement_2023_rev3.xlsx"    "lits_data.xlsx"    "regions.csv"`}
          language="r"
          title="Working Directory Commands"
        />

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-800">Windows File Path Warning</h4>
              <p className="text-amber-700 text-sm mt-1">
                Windows uses backslashes (<code>\</code>) in file paths, but R uses forward slashes (<code>/</code>).
              </p>
              <div className="mt-2 bg-white p-2 rounded text-sm font-mono">
                <span className="text-red-600"># Wrong: "C:\Users\john\data.csv"</span><br/>
                <span className="text-green-600"># Correct: "C:/Users/john/data.csv"</span><br/>
                <span className="text-green-600"># Or use double backslash: "C:\\Users\\john\\data.csv"</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Importing Data Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <FileSpreadsheet className="h-7 w-7 text-woah-orange" />
          2. Importing Data into R
        </h2>

        <p className="text-gray-700 mb-4">
          R can import data from many formats. The most common in veterinary work are CSV files
          (comma-separated values) and Excel spreadsheets. We'll also cover importing from the clipboard
          for quick copy-paste operations.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Importing CSV Files</h3>

        <p className="text-gray-700 mb-3">
          CSV (Comma-Separated Values) files are simple text files where data is separated by commas.
          They're universally compatible and ideal for sharing data.
        </p>

        <CodeBlock
          code={`# Load the readr package (part of tidyverse)
library(tidyverse)

# Import the farms CSV file
farms <- read_csv("data/farms.csv")

# You'll see a message about column specifications:
# Rows: 23 Columns: 8
# ── Column specification ────────────────────────────────────
# Delimiter: ","
# chr (5): farm_id, farm_name, region, zone, owner_type
# dbl (3): latitude, longitude, herd_size
#
# ℹ Use spec() to retrieve the full column specification

# View the data
farms
# # A tibble: 23 × 8
#    farm_id  farm_name       region    zone  owner_type latitude longitude herd_size
#    <chr>    <chr>           <chr>     <chr> <chr>         <dbl>     <dbl>     <dbl>
#  1 FM001    Okahandja Farm  Otjozon…  Free  Commercial   -21.98     16.92       450
#  2 FM002    Etosha Ranch    Kunene    NCA   Communal     -18.85     15.91       120
#  3 FM003    Waterberg Est   Otjozon…  Free  Commercial   -20.50     17.28       680
# # ℹ 20 more rows`}
          language="r"
          title="Importing CSV Files"
        />

        <KeyConcept title="What is a Tibble?">
          <p>
            When you use <code>read_csv()</code> from the tidyverse, data is stored as a <strong>tibble</strong> -
            a modern version of a dataframe. Tibbles print more nicely (showing only the first 10 rows
            and fitting columns to your screen), and they don't silently change your data types.
          </p>
        </KeyConcept>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Importing Excel Files</h3>

        <p className="text-gray-700 mb-3">
          Excel files require the <code>readxl</code> package. This is often necessary when working
          with data from government systems like LITS.
        </p>

        <Callout type="warning" title="Excel Import is Silent!">
          <p>
            Unlike <code>read_csv()</code>, the <code>read_excel()</code> function doesn't automatically
            show column specifications. You need to use <code>glimpse()</code> or <code>str()</code> to
            inspect your data after importing.
          </p>
        </Callout>

        <CodeBlock
          code={`# Load required packages
library(readxl)  # For reading Excel files
library(dplyr)   # For data manipulation (includes glimpse)

# Import the workshop movement data
movements <- read_excel("data/animal_movement_2023_rev3.xlsx")

# IMPORTANT: read_excel() is silent - no output shown!
# Always inspect your data after importing:
glimpse(movements)
# Rows: 35,970
# Columns: 11
# $ date                         <dttm> 2023-12-12, 2023-12-10, ...
# $ origin_region                <chr> "Oshikoto", "Oshikoto", ...
# $ origin_constituency          <chr> "Nehale LyaMpingana", "Guinas", ...
# $ origin_establishment         <chr> "Okathitu Ka Maimbo", "Onandjaba", ...
# $ origin_establishment_type    <chr> "Farm", "Communal", ...
# $ animal_type                  <chr> "Cattle", "Cattle", ...
# $ weight                       <dbl> 15, 42, 8, 23, 5, 12, ...
# $ destination_region           <chr> "Oshikoto", "Oshikoto", ...
# $ destination_constituency     <chr> "Nehale LyaMpingana", "Guinas", ...
# $ destination_establishment    <chr> "Farm B", "Auction Yard", ...
# $ destination_establishment_type <chr> "Farm", "Auction", ...

# View all sheet names in an Excel file
excel_sheets("data/animal_movement_2023_rev3.xlsx")

# Import a specific sheet by name
# movements <- read_excel("data/file.xlsx", sheet = "Sheet1")

# Or by sheet number
# movements <- read_excel("data/file.xlsx", sheet = 2)

# Skip header rows if needed (common in government reports)
# data <- read_excel("data/report.xlsx", skip = 3)`}
          language="r"
          title="Importing Excel Files"
        />

        <Callout type="info" title="About the 'weight' Column">
          <p>
            In this LITS dataset, the <code>weight</code> column represents the <strong>number of
            animals</strong> moved, not a physical weight in kilograms. This naming comes from the
            cleaned LITS database provided. When you see <code>sum(weight)</code> or <code>total_animals</code>
            in our analysis, we're counting total animals moved.
          </p>
        </Callout>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.3 Importing from Clipboard</h3>

        <p className="text-gray-700 mb-3">
          Sometimes you just want to quickly copy data from Excel or a website. The clipboard method
          is perfect for this.
        </p>

        <CodeBlock
          code={`# Copy some data from Excel (Ctrl+C / Cmd+C), then:

# On Windows:
quick_data <- read.delim("clipboard")

# On Mac:
quick_data <- read.delim(pipe("pbpaste"))

# For tab-separated data (common from Excel):
quick_data <- read.delim("clipboard", header = TRUE)

# This is great for:
# - Quick analysis of data someone emails you
# - Testing code before importing full files
# - Copying example data from websites`}
          language="r"
          title="Importing from Clipboard"
        />

        <Callout type="tip" title="RStudio Import Wizard">
          <p className="mb-2">
            RStudio has a point-and-click import wizard that can help you import data:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Go to <strong>File → Import Dataset → From Excel</strong> (or From Text/CSV)</li>
            <li>Browse to select your file</li>
            <li>Preview the data and adjust settings</li>
            <li>Click "Import" - the code will appear in your console</li>
            <li><strong>Copy that code to your script!</strong> for reproducibility</li>
          </ol>
        </Callout>
      </section>

      {/* Inspecting Data Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <FileSearch className="h-7 w-7 text-woah-orange" />
          3. Inspecting Your Data
        </h2>

        <p className="text-gray-700 mb-4">
          After importing data, <strong>always inspect it</strong> before analysis. You need to understand
          what you're working with: How many rows? What columns? Any missing values? What are the data types?
        </p>

        <KeyConcept title="The First Thing After Import">
          <p>
            <strong>Never assume your data imported correctly.</strong> Always run <code>glimpse()</code> or
            <code> str()</code> immediately after import to verify the data structure, column types, and
            check for obvious problems. This 30-second check can save hours of debugging later.
          </p>
        </KeyConcept>

        <CodeBlock
          code={`# Load required packages
library(tidyverse)
library(readxl)

# Import the workshop movement data
movements <- read_excel("data/animal_movement_2023_rev3.xlsx")

# ESSENTIAL: First look at your data (read_excel is silent!)
glimpse(movements)
# Rows: 35,970
# Columns: 11
# $ date                         <dttm> 2023-12-12, 2023-12-10, ...
# $ origin_region                <chr> "Oshikoto", "Oshikoto", ...
# $ origin_constituency          <chr> "Nehale LyaMpingana", "Guinas", ...
# $ origin_establishment         <chr> "Okathitu Ka Maimbo", "Onandjaba", ...
# $ origin_establishment_type    <chr> "Farm", "Communal", ...
# $ animal_type                  <chr> "Cattle", "Cattle", ...
# $ weight                       <dbl> 15, 42, 8, 23, 5, 12, ...
# $ destination_region           <chr> "Oshikoto", "Oshikoto", ...
# $ destination_constituency     <chr> "Nehale LyaMpingana", "Guinas", ...
# $ destination_establishment    <chr> "Farm B", "Auction Yard", ...
# $ destination_establishment_type <chr> "Farm", "Auction", ...`}
          language="r"
          title="Using glimpse() - Your Best Friend"
        />

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.1 Essential Inspection Functions</h3>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Function</th>
                <th className="px-4 py-3 text-left font-semibold">What it Shows</th>
                <th className="px-4 py-3 text-left font-semibold">When to Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 font-mono text-sm">glimpse(data)</td>
                <td className="px-4 py-3">Rows, columns, types, sample values</td>
                <td className="px-4 py-3">First thing after import - quick overview</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">head(data, n)</td>
                <td className="px-4 py-3">First n rows (default 6)</td>
                <td className="px-4 py-3">See actual data values</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sm">tail(data, n)</td>
                <td className="px-4 py-3">Last n rows</td>
                <td className="px-4 py-3">Check data completeness at end</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">nrow(data)</td>
                <td className="px-4 py-3">Number of rows</td>
                <td className="px-4 py-3">Total record count</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sm">ncol(data)</td>
                <td className="px-4 py-3">Number of columns</td>
                <td className="px-4 py-3">Total variable count</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">dim(data)</td>
                <td className="px-4 py-3">Both dimensions [rows, cols]</td>
                <td className="px-4 py-3">Quick size check</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sm">names(data)</td>
                <td className="px-4 py-3">Column names</td>
                <td className="px-4 py-3">Get exact column spellings</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">summary(data)</td>
                <td className="px-4 py-3">Statistics for each column</td>
                <td className="px-4 py-3">Check ranges, find missing values</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock
          code={`# See the first 10 rows
head(movements, 10)
# # A tibble: 10 × 11
#    date                origin_region origin_constituency origin_establishment ...
#    <dttm>              <chr>         <chr>               <chr>                ...
#  1 2023-12-12 00:00:00 Oshikoto      Nehale LyaMpingana  Okathitu Ka Maimbo   ...
#  2 2023-12-10 00:00:00 Oshikoto      Guinas              Onandjaba            ...
# ... (8 more rows)

# Check dimensions
dim(movements)
# [1] 35970    11    <- 35,970 rows, 11 columns

# Get column names (useful for exact spelling)
names(movements)
# [1] "date"                           "origin_region"
# [3] "origin_constituency"            "origin_establishment"
# [5] "origin_establishment_type"      "animal_type"
# [7] "weight"                         "destination_region"
# [9] "destination_constituency"       "destination_establishment"
# [11] "destination_establishment_type"

# Summary statistics
summary(movements)
#       date                     origin_region      origin_constituency
#  Min.   :2023-01-01 00:00:00   Length:35970       Length:35970
#  1st Qu.:2023-04-11 00:00:00   Class :character   Class :character
#  Median :2023-07-04 00:00:00   Mode  :character   Mode  :character
#  Mean   :2023-07-04 16:09:24
#  3rd Qu.:2023-09-28 00:00:00
#  Max.   :2023-12-31 00:00:00
#
#  origin_establishment       weight        animal_type
#  Length:35970           Min.   :   1.0   Length:35970
#  Class :character       1st Qu.:   1.0   Class :character
#  Mode  :character       Median :   2.0   Mode  :character
#                         Mean   :   6.2
#                         3rd Qu.:   4.0
#                         Max.   :4015.0`}
          language="r"
          title="Essential Inspection Functions"
        />

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.2 Checking Unique Values</h3>

        <p className="text-gray-700 mb-3">
          For categorical variables, you should check what unique values exist. This often reveals
          data quality issues like inconsistent spelling.
        </p>

        <Callout type="info" title="Load dplyr for Piping">
          <p>
            This section introduces the pipe operator (<code>%&gt;%</code>) and <code>count()</code> function.
            Make sure you have dplyr loaded:
          </p>
          <code className="block bg-white p-2 rounded mt-2">library(dplyr)</code>
        </Callout>

        <CodeBlock
          code={`# Make sure dplyr is loaded
library(dplyr)

# See unique values in a column
unique(movements$origin_region)
# [1] "Oshikoto"     "Oshana"       "Kavango West" "Kavango East" "Kunene"
# [6] "Zambezi"      "Ohangwena"    "Omusati"      "Otjozondjupa"

# How many unique values?
length(unique(movements$origin_region))
# [1] 9

# Better: count occurrences of each value
movements %>%
  count(origin_region, sort = TRUE)
# # A tibble: 9 × 2
#   origin_region     n
#   <chr>         <int>
# 1 Kavango West   9331
# 2 Oshikoto       8100
# 3 Ohangwena      4515
# 4 Omusati        3253
# 5 Kunene         2796
# 6 Kavango East   2598
# 7 Oshana         2591
# 8 Zambezi        2369
# 9 Otjozondjupa    417

# Check animal types
movements %>%
  count(animal_type, sort = TRUE)
# # A tibble: 4 × 2
#   animal_type     n
#   <chr>       <int>
# 1 Cattle      32010
# 2 Goat         2836
# 3 Sheep        1120
# 4 Pig             4`}
          language="r"
          title="Exploring Unique Values"
        />

        <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Exercise: Finding Most Common Auction Destinations</h4>

        <p className="text-gray-700 mb-3">
          Let's explore which establishments receive the most animals from auctions. This combines
          several techniques: checking data structure, exploring unique values, filtering, and counting.
        </p>

        <CodeBlock
          code={`# Step 1: Check the structure of our data
str(movements)

# Step 2: What destination establishment types exist?
unique(movements$destination_establishment_type)
# [1] "Farm"    "Communal"    "Auction Point"    "Quarantine"    ...

# Step 3: Filter to only auction movements
auction_movements <- movements[movements$destination_establishment_type == 'Auction Point', ]

# Step 4: Count which destinations receive the most auction animals
auction_movements %>%
  count(destination_establishment, sort = TRUE)
# This shows which specific auction points receive the most animals
# Very useful for understanding trade patterns and disease surveillance priorities!`}
          language="r"
          title="Auction Destination Analysis"
        />

        <Callout type="success" title="Epidemiological Insight">
          <p>
            Identifying high-volume auction points is critical for disease surveillance.
            These locations represent concentration points where animals from many sources
            mix - making them both high-risk for disease spread and high-value for
            surveillance activities.
          </p>
        </Callout>
      </section>

      {/* Tidyverse Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <Wrench className="h-7 w-7 text-woah-orange" />
          4. The Tidyverse: Data Wrangling Made Easy
        </h2>

        <p className="text-gray-700 mb-4">
          The <strong>tidyverse</strong> is a collection of R packages designed for data science.
          The most important for data wrangling is <code>dplyr</code>, which provides intuitive
          "verbs" for manipulating data.
        </p>

        <KeyConcept title="The Pipe Operator: %>%">
          <p>
            The pipe <code>%&gt;%</code> (keyboard shortcut: <strong>Ctrl+Shift+M</strong> or <strong>Cmd+Shift+M</strong>)
            passes the result of one function to the next. Read it as <strong>"then"</strong>:
          </p>
          <div className="bg-white p-3 rounded mt-2 font-mono text-sm">
            data %&gt;% filter(...) %&gt;% select(...) %&gt;% arrange(...)<br/>
            <span className="text-gray-500"># "Take data, THEN filter, THEN select, THEN arrange"</span>
          </div>
          <p className="mt-2">
            This makes code readable like a sentence, flowing from left to right.
          </p>
        </KeyConcept>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1 The Five Essential dplyr Verbs</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 flex items-center gap-2">
              <Filter className="h-4 w-4" /> filter()
            </h4>
            <p className="text-sm text-gray-600 mt-1">Pick rows based on conditions</p>
            <p className="text-xs text-gray-500 mt-1 italic">"Show me only cattle movements"</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 flex items-center gap-2">
              <Table className="h-4 w-4" /> select()
            </h4>
            <p className="text-sm text-gray-600 mt-1">Pick columns by name</p>
            <p className="text-xs text-gray-500 mt-1 italic">"I only need date and region"</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
            <h4 className="font-bold text-purple-800">mutate()</h4>
            <p className="text-sm text-gray-600 mt-1">Create or modify columns</p>
            <p className="text-xs text-gray-500 mt-1 italic">"Add a month column"</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
            <h4 className="font-bold text-orange-800 flex items-center gap-2">
              <ArrowDownUp className="h-4 w-4" /> arrange()
            </h4>
            <p className="text-sm text-gray-600 mt-1">Sort rows</p>
            <p className="text-xs text-gray-500 mt-1 italic">"Order by date, newest first"</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
            <h4 className="font-bold text-red-800">summarise()</h4>
            <p className="text-sm text-gray-600 mt-1">Collapse to summary statistics</p>
            <p className="text-xs text-gray-500 mt-1 italic">"Total animals per region"</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-500">
            <h4 className="font-bold text-teal-800">group_by()</h4>
            <p className="text-sm text-gray-600 mt-1">Group data for operations</p>
            <p className="text-xs text-gray-500 mt-1 italic">"Calculate for each region"</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">4.2 filter() - Subset Rows</h3>

        <p className="text-gray-700 mb-3">
          Use <code>filter()</code> to keep only rows that meet certain conditions.
        </p>

        <CodeBlock
          code={`# Filter for cattle movements only
cattle_movements <- movements %>%
  filter(animal_type == "Cattle")

# How many cattle movements?
nrow(cattle_movements)
# [1] 32010

# Filter for Kunene region in 2023
kunene_2023 <- movements %>%
  filter(origin_region == "Kunene",
         date >= "2023-01-01",
         date <= "2023-12-31")

# Multiple conditions with OR (|)
northern_regions <- movements %>%
  filter(origin_region == "Kunene" |
         origin_region == "Omusati" |
         origin_region == "Oshana")

# Shortcut for multiple OR conditions: %in%
northern_regions <- movements %>%
  filter(origin_region %in% c("Kunene", "Omusati", "Oshana"))

# Movements with more than 50 animals (weight > 50)
large_movements <- movements %>%
  filter(weight > 50)

# Combine conditions: Cattle movements with weight > 50 from Kunene
specific_movements <- movements %>%
  filter(animal_type == "Cattle",
         weight > 50,
         origin_region == "Kunene")

nrow(specific_movements)
# [1] 23`}
          language="r"
          title="filter() Examples"
        />

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg my-4">
          <h4 className="font-bold text-blue-800">Comparison Operators for filter()</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-sm">
            <div><code>==</code> Equal to</div>
            <div><code>!=</code> Not equal to</div>
            <div><code>&gt;</code> Greater than</div>
            <div><code>&lt;</code> Less than</div>
            <div><code>&gt;=</code> Greater or equal</div>
            <div><code>&lt;=</code> Less or equal</div>
            <div><code>%in%</code> Is in a list</div>
            <div><code>&amp;</code> AND</div>
            <div><code>|</code> OR</div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">4.3 select() - Choose Columns</h3>

        <CodeBlock
          code={`# Select specific columns
movements %>%
  select(date, origin_region, destination_region, weight)
# # A tibble: 35,970 × 4
#    date                origin_region destination_region weight
#    <dttm>              <chr>         <chr>               <dbl>
#  1 2023-12-12 00:00:00 Oshikoto      Oshikoto               15
#  2 2023-12-10 00:00:00 Oshikoto      Oshikoto               42
#  3 2023-12-08 00:00:00 Omusati       Omusati                 8
# # ... more rows

# Select a range of columns
movements %>%
  select(date:origin_establishment)

# Select all columns EXCEPT certain ones
movements %>%
  select(-origin_establishment, -destination_establishment)

# Select columns that start with "origin"
movements %>%
  select(starts_with("origin"))
# # A tibble: 35,970 × 4
#    origin_region origin_constituency origin_establishment origin_establishment_type
#    <chr>         <chr>               <chr>                <chr>
#  1 Oshikoto      Nehale LyaMpingana  Okathitu Ka Maimbo   Farm
#  2 Oshikoto      Guinas              Onandjaba            Communal
# ...

# Other helper functions:
# ends_with("region")     - columns ending with "region"
# contains("date")        - columns containing "date"
# matches("^[A-Z]")       - columns matching a pattern`}
          language="r"
          title="select() Examples"
        />

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">4.4 mutate() - Create New Columns</h3>

        <CodeBlock
          code={`# Load required packages for date manipulation
library(dplyr)     # For mutate, case_when, etc.
library(lubridate) # For year(), month() date functions

# Add new columns
movements_enhanced <- movements %>%
  mutate(
    # Extract year and month from date
    year = year(date),
    month = month(date),
    month_name = month(date, label = TRUE),

    # Categorize movement size
    size_category = case_when(
      weight <= 5   ~ "Small",
      weight <= 20  ~ "Medium",
      weight <= 100 ~ "Large",
      TRUE          ~ "Very Large"
    ),

    # Flag cross-region movements
    is_cross_region = origin_region != destination_region
  )

# Check our new columns
movements_enhanced %>%
  select(date, year, month_name, weight, size_category, is_cross_region) %>%
  head(5)
# # A tibble: 5 × 6
#   date                 year month_name weight size_category is_cross_region
#   <dttm>              <dbl> <ord>       <dbl> <chr>         <lgl>
# 1 2023-12-12 00:00:00  2023 Dec            15 Medium        FALSE
# 2 2023-12-10 00:00:00  2023 Dec            42 Large         FALSE
# 3 2023-12-08 00:00:00  2023 Dec             8 Medium        FALSE
# 4 2023-12-05 00:00:00  2023 Dec            23 Large         TRUE
# 5 2023-12-03 00:00:00  2023 Dec             5 Small         TRUE`}
          language="r"
          title="mutate() Examples"
        />

        <KeyConcept title="case_when() for Conditional Logic">
          <p>
            <code>case_when()</code> is like a series of if-else statements. Each condition is followed
            by <code>~</code> and the value to assign if true. <code>TRUE ~</code> at the end catches
            everything else (like "else").
          </p>
        </KeyConcept>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">4.5 arrange() - Sort Data</h3>

        <CodeBlock
          code={`# Sort by date (oldest first - ascending is default)
movements %>%
  arrange(date) %>%
  head(3)
# # A tibble: 3 × 11
#   date                origin_region origin_constituency ...
#   <dttm>              <chr>         <chr>               ...
# 1 2023-01-01 00:00:00 Kunene        Epupa               ...
# 2 2023-01-01 00:00:00 Omusati       Outapi              ...
# 3 2023-01-01 00:00:00 Oshana        Oshakati East       ...

# Sort by date descending (newest first)
movements %>%
  arrange(desc(date)) %>%
  head(3)
# # A tibble: 3 × 11
#   date                origin_region origin_constituency ...
#   <dttm>              <chr>         <chr>               ...
# 1 2023-12-31 00:00:00 Kavango East  Rundu Urban         ...
# 2 2023-12-31 00:00:00 Oshikoto      Guinas              ...
# 3 2023-12-31 00:00:00 Omusati       Outapi              ...

# Sort by multiple columns
movements %>%
  arrange(origin_region, desc(weight)) %>%
  head()
# First sorts by region alphabetically, then within each region
# sorts by weight (highest first)`}
          language="r"
          title="arrange() Examples"
        />

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">4.6 group_by() + summarise() - Aggregate Data</h3>

        <p className="text-gray-700 mb-3">
          This is where the magic happens. <code>group_by()</code> splits your data into groups,
          then <code>summarise()</code> calculates statistics for each group.
        </p>

        <CodeBlock
          code={`# Total animals moved per region
# Remember: "weight" column = number of animals moved
movements %>%
  group_by(origin_region) %>%
  summarise(
    n_movements = n(),                    # Count of movement records
    total_animals = sum(weight, na.rm = TRUE),  # Total animals moved
    avg_animals = mean(weight, na.rm = TRUE),   # Avg animals per movement
    max_animals = max(weight, na.rm = TRUE)     # Largest single movement
  ) %>%
  arrange(desc(n_movements))
# # A tibble: 9 × 5
#   origin_region n_movements total_animals avg_animals max_animals
#   <chr>               <int>         <dbl>       <dbl>       <dbl>
# 1 Kavango West         9331        50822        5.4        643
# 2 Oshikoto             8100        45714        5.6       1101
# 3 Ohangwena            4515        23952        5.3        415
# 4 Omusati              3253        15956        4.9        595
# 5 Kunene               2796        21439        7.7        550
# 6 Kavango East         2598        25897       10.0       4015
# 7 Oshana               2591        11640        4.5        247
# 8 Zambezi              2369        25209       10.6        666
# 9 Otjozondjupa          417         2385        5.7        248

# Group by multiple variables
movements %>%
  group_by(origin_region, animal_type) %>%
  summarise(
    n_movements = n(),
    total_animals = sum(weight, na.rm = TRUE)
  )
# # A tibble: 32 × 4
# # Groups:   origin_region [9]
#   origin_region animal_type n_movements total_animals
#   <chr>         <chr>             <int>        <dbl>
# 1 Kavango East  Cattle             2516        21193
# 2 Kavango East  Goat                 71         4529
# 3 Kavango East  Sheep                11          175
# 4 Kavango West  Cattle             8916        47791
# ...

# Monthly movement summary (requires lubridate for month())
movements %>%
  mutate(month = month(date, label = TRUE)) %>%
  group_by(month) %>%
  summarise(
    n_movements = n(),
    total_animals = sum(weight, na.rm = TRUE)
  )
# # A tibble: 12 × 3
#   month n_movements total_animals
#   <ord>       <int>        <dbl>
# 1 Jan          2698        ...
# 2 Feb          2468        ...
# 3 Mar          3059        ...
# ...  (Dec has the most with 3895 movements)`}
          language="r"
          title="group_by() + summarise() Examples"
        />

        <Callout type="warning" title="na.rm = TRUE">
          When using summary functions like <code>sum()</code>, <code>mean()</code>, <code>max()</code>,
          always add <code>na.rm = TRUE</code> to handle missing values. Otherwise, if ANY value is
          missing (NA), the entire result will be NA.
        </Callout>
      </section>

      {/* Chaining Operations Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Chaining Operations Together</h2>

        <p className="text-gray-700 mb-4">
          The real power of dplyr comes from chaining multiple operations together. Here's a realistic
          example that answers the question: "What are the top 5 source constituencies for cattle movements
          to Oshakati?"
        </p>

        <CodeBlock
          code={`# Complete analysis in one pipeline
top_sources_to_oshakati <- movements %>%
  # Step 1: Filter for cattle going to Oshakati
  filter(animal_type == "Cattle",
         destination_constituency == "Oshakati East" |
         destination_constituency == "Oshakati West") %>%

  # Step 2: Group by source constituency
  group_by(origin_constituency) %>%

  # Step 3: Calculate summary statistics
  summarise(
    n_movements = n(),
    total_animals = sum(weight, na.rm = TRUE),
    avg_per_movement = round(mean(weight, na.rm = TRUE), 1)
  ) %>%

  # Step 4: Sort by total animals descending
  arrange(desc(total_animals)) %>%

  # Step 5: Keep only top 5
  head(5)

# View results
top_sources_to_oshakati
# # A tibble: 5 × 4
#   origin_constituency n_movements total_animals avg_per_movement
#   <chr>                     <int>        <dbl>            <dbl>
# 1 Mpungu                      310          761              2.5
# 2 Nkurenkure                  105          609              5.8
# 3 Nehale LyaMpingana           93          591              6.4
# 4 Mashare                     206          543              2.6
# 5 Tondoro                     138          366              2.7`}
          language="r"
          title="Complete Analysis Pipeline"
        />
      </section>

      {/* Missing Values Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Handling Missing Values</h2>

        <p className="text-gray-700 mb-4">
          Real-world data often has missing values. In R, missing values are represented as <code>NA</code>
          (Not Available). Understanding how to identify and handle them is crucial.
        </p>

        <CodeBlock
          code={`# Count missing values in each column
colSums(is.na(movements))
#                           date                  origin_region
#                              0                              0
#            origin_constituency           origin_establishment
#                              0                             10
#      origin_establishment_type                    animal_type
#                              0                              0
#                         weight             destination_region
#                              0                              0
#       destination_constituency      destination_establishment
#                              0                              0
# destination_establishment_type
#                              0

# Which columns have missing values?
movements %>%
  summarise(across(everything(), ~sum(is.na(.)))) %>%
  pivot_longer(everything(), names_to = "column", values_to = "n_missing") %>%
  filter(n_missing > 0)
# # A tibble: 1 × 2
#   column               n_missing
#   <chr>                    <int>
# 1 origin_establishment        10

# Remove rows with ANY missing values (use with caution!)
movements_complete <- movements %>%
  drop_na()

nrow(movements)          # [1] 35970
nrow(movements_complete) # [1] 35960  <- Lost 10 rows

# Remove rows with missing values in specific columns
movements_clean <- movements %>%
  drop_na(origin_establishment, origin_region)

# Replace missing values
movements_filled <- movements %>%
  mutate(
    origin_establishment = replace_na(origin_establishment, "Unknown"),
    origin_region = replace_na(origin_region, "Unknown")
  )

# Filter to see only rows WITH missing values
movements %>%
  filter(is.na(origin_establishment)) %>%
  head()
# Shows rows where origin_establishment is missing`}
          language="r"
          title="Working with Missing Values"
        />

        <Callout type="info" title="When to Remove vs Replace Missing Values">
          <ul className="mt-2 space-y-2">
            <li><strong>Remove</strong> when missing values represent data that shouldn't be analyzed
            (e.g., cancelled permits, test records)</li>
            <li><strong>Replace with a value</strong> when you know the true value or have a sensible
            default (e.g., 0 for optional counts)</li>
            <li><strong>Keep as NA</strong> when you want to preserve the "unknown" status for
            transparent reporting</li>
          </ul>
        </Callout>
      </section>

      {/* Joining Datasets Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Joining Datasets and Data Cleaning</h2>

        <p className="text-gray-700 mb-4">
          A common real-world task is joining data from different sources. Here we'll match constituency
          names from our movement data to a spatial reference file to get standardised IDs (GIDs). This
          is crucial for mapping and database work.
        </p>

        <KeyConcept title="Why Use Integer IDs Instead of Names?">
          <p>
            Text names are prone to inconsistencies: "Opuwo Rural" vs "Opuwo rural", "Oshakati East" vs
            "Oshakati-East", or typos like "Enghela" instead of "Engela". Integer IDs (GIDs) are
            <strong> unambiguous, faster for joins, and smaller to store</strong>. Once you link names
            to GIDs, all subsequent analysis uses the reliable integer ID.
          </p>
        </KeyConcept>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.1 Load the Spatial Reference Data</h3>

        <p className="text-gray-700 mb-3">
          We have a GeoJSON file with all Namibian constituencies. Let's extract a lookup table
          of constituency names and their GIDs.
        </p>

        <CodeBlock
          code={`# Load required packages
library(sf)
library(tidyverse)
library(readxl)

# Read the constituency GeoJSON
constituencies <- st_read("data/nam_constituency_4326.geojson")
# Reading layer 'nam_constituency_4326' from data source
# Simple feature collection with 121 features and 5 fields
# Geometry type: MULTIPOLYGON

# Look at the structure
glimpse(constituencies)
# Rows: 121
# Columns: 6
# $ region     <chr> "Ohangwena", "Ohangwena", "Ohangwena", ...
# $ const      <chr> "Engela", "Eenhana", "Epembe", ...
# $ population <chr> "23808", "18656", "15342", ...
# $ nca        <lgl> TRUE, TRUE, TRUE, FALSE, ...
# $ gid        <int> 1, 2, 3, 4, 5, 6, ...
# $ geometry   <MULTIPOLYGON [°]>

# Quick plot to visualize the constituencies
plot(constituencies["region"])  # Color by region

# Create a lookup table (drop the geometry, we just need the table)
const_lookup <- constituencies %>%
  st_drop_geometry() %>%          # Remove spatial data
  select(const, gid, region, nca) %>%  # Keep only what we need
  rename(constituency = const)    # Rename for clarity

head(const_lookup)
# # A tibble: 6 × 4
#   constituency   gid region       nca
#   <chr>        <int> <chr>        <lgl>
# 1 Engela           1 Ohangwena    TRUE
# 2 Eenhana          2 Ohangwena    TRUE
# 3 Epembe           3 Ohangwena    TRUE
# 4 Omulonga         4 Ohangwena    TRUE
# 5 Okatana          5 Oshana       TRUE
# 6 Berseba          6 !Karas       FALSE

# How many NCA constituencies?
const_lookup %>%
  filter(nca == TRUE) %>%
  nrow()
# [1] 74`}
          language="r"
          title="Load Constituency Reference Data"
        />

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.2 Join Movement Data to Get GIDs</h3>

        <p className="text-gray-700 mb-3">
          Now let's join our movement data to the lookup table to add GIDs for both origin and
          destination constituencies.
        </p>

        <CodeBlock
          code={`# Load the movement data
movements <- read_excel("data/animal_movement_2023_rev3.xlsx")

# Check unique constituency names in movements
move_constituencies <- movements %>%
  select(origin_constituency, destination_constituency) %>%
  pivot_longer(everything(), values_to = "constituency") %>%
  distinct(constituency) %>%
  arrange(constituency)

nrow(move_constituencies)
# [1] 71 unique constituencies in movement data

# Join to get origin_gid
movements_with_gid <- movements %>%
  left_join(
    const_lookup %>% select(constituency, gid),
    by = c("origin_constituency" = "constituency")
  ) %>%
  rename(origin_gid = gid) %>%
  # Join again for destination_gid
  left_join(
    const_lookup %>% select(constituency, gid),
    by = c("destination_constituency" = "constituency")
  ) %>%
  rename(destination_gid = gid)

# Check the result
movements_with_gid %>%
  select(origin_constituency, origin_gid,
         destination_constituency, destination_gid) %>%
  head()
# # A tibble: 6 × 4
#   origin_constituency origin_gid destination_constituency destination_gid
#   <chr>                    <int> <chr>                              <int>
# 1 Engela                       1 Eenhana                                2
# 2 Epupa                       11 Opuwo Rural                           58
# 3 Outapi                      60 Oshakati East                         47
# ...`}
          language="r"
          title="Join to Add GIDs"
        />

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.3 Find and Fix Mismatches</h3>

        <p className="text-gray-700 mb-3">
          When names don't match exactly, the join produces <code>NA</code>. Let's find these
          mismatches and fix them.
        </p>

        <CodeBlock
          code={`# Find movements where origin didn't match
origin_mismatches <- movements_with_gid %>%
  filter(is.na(origin_gid)) %>%
  distinct(origin_constituency)

print(origin_mismatches)
# # A tibble: 1 × 1
#   origin_constituency
#   <chr>
# 1 Opuwo

# Check what names exist in the reference data that might match
const_lookup %>%
  filter(str_detect(constituency, "Opuwo"))
# # A tibble: 2 × 4
#   constituency   gid region nca
#   <chr>        <int> <chr>  <lgl>
# 1 Opuwo Urban     64 Kunene TRUE
# 2 Opuwo Rural     66 Kunene TRUE

# The problem: Movement data has "Opuwo" but reference has
# "Opuwo Urban" and "Opuwo Rural" - we need to decide which one!
# For this example, we'll map to "Opuwo Rural" (more common for livestock)

# Solution: Create a manual mapping table for fixes
name_fixes <- tibble(
  movement_name = c("Opuwo"),
  correct_name = c("Opuwo Rural")  # Decision: map to Rural
)

# Apply fixes to the movement data
movements_fixed <- movements %>%
  # Fix origin constituency names
  left_join(name_fixes, by = c("origin_constituency" = "movement_name")) %>%
  mutate(origin_constituency_clean = coalesce(correct_name, origin_constituency)) %>%
  select(-correct_name) %>%
  # Fix destination constituency names
  left_join(name_fixes, by = c("destination_constituency" = "movement_name")) %>%
  mutate(destination_constituency_clean = coalesce(correct_name, destination_constituency)) %>%
  select(-correct_name)

# Now join again with cleaned names
movements_final <- movements_fixed %>%
  left_join(
    const_lookup %>% select(constituency, gid),
    by = c("origin_constituency_clean" = "constituency")
  ) %>%
  rename(origin_gid = gid) %>%
  left_join(
    const_lookup %>% select(constituency, gid),
    by = c("destination_constituency_clean" = "constituency")
  ) %>%
  rename(destination_gid = gid)

# Check: Any remaining mismatches?
movements_final %>%
  filter(is.na(origin_gid) | is.na(destination_gid)) %>%
  nrow()
# [1] 0    <- All matched!

# Final check
movements_final %>%
  select(origin_constituency, origin_constituency_clean, origin_gid) %>%
  distinct() %>%
  arrange(origin_constituency) %>%
  head(10)`}
          language="r"
          title="Find and Fix Name Mismatches"
        />

        <Callout type="warning" title="Manual Review is Usually Best">
          <p>
            For a small number of mismatches, <strong>manual review is more reliable</strong> than
            automated fuzzy matching. Fuzzy matching (e.g., <code>stringdist</code> package) can
            suggest wrong matches - for example, it might match "Opuwo" to "Epupa" instead of
            "Opuwo Rural" because the string lengths differ. Always verify automated suggestions!
          </p>
        </Callout>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.4 Save the Cleaned Data</h3>

        <CodeBlock
          code={`# Select and reorder columns for the final clean dataset
movements_clean <- movements_final %>%
  select(
    date,
    origin_region, origin_constituency, origin_gid,
    origin_establishment, origin_establishment_type,
    destination_region, destination_constituency, destination_gid,
    destination_establishment, destination_establishment_type,
    animal_type, weight
  )

# Save to CSV for future use
write_csv(movements_clean, "data/movements_2023_clean.csv")

# Summary: movements by GID pairs
movements_clean %>%
  group_by(origin_gid, destination_gid) %>%
  summarise(
    n_movements = n(),
    total_animals = sum(weight, na.rm = TRUE),
    .groups = "drop"
  ) %>%
  arrange(desc(total_animals)) %>%
  head(10)
# Now you have clean integer IDs for mapping and network analysis!`}
          language="r"
          title="Save Clean Data"
        />

        <KeyConcept title="Data Cleaning Workflow">
          <p>
            This exercise demonstrates a common data cleaning pattern:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li><strong>Join</strong> your data to a reference table</li>
            <li><strong>Identify</strong> non-matching records (where join produces NA)</li>
            <li><strong>Investigate</strong> why they don't match (spelling, different naming conventions)</li>
            <li><strong>Create</strong> a mapping table to fix the mismatches</li>
            <li><strong>Apply</strong> fixes and re-join</li>
            <li><strong>Verify</strong> all records now match</li>
          </ol>
          <p className="mt-2">
            Document your fixes! The mapping table serves as a record of decisions made.
          </p>
        </KeyConcept>
      </section>

      {/* Practical Exercise */}
      <Exercise title="Practical Exercise: LITS Movement Analysis" type="individual" duration="25 min">
        <p className="mb-4">
          Using the movements data, complete the following tasks. Write your code in your R script
          and check your answers below.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-800 mb-2">Task 1: Data Inspection</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Load the movements data</li>
              <li>How many rows and columns are there?</li>
              <li>What are the column names?</li>
              <li>How many unique origin regions are there?</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-800 mb-2">Task 2: Filtering</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Filter for cattle movements only (use animal_type column)</li>
              <li>Filter for movements with more than 50 animals (weight &gt; 50)</li>
              <li>Filter for movements from Kunene to Oshana</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-800 mb-2">Task 3: Summarising</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Calculate total animals moved per animal type (sum of weight column)</li>
              <li>Find the month with the most movements</li>
              <li>What's the average number of animals per movement by destination establishment type?</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 p-4 bg-woah-orange/10 rounded-lg">
          <h4 className="font-bold text-woah-orange mb-3">Expected Answers (Check Your Work)</h4>
          <div className="font-mono text-sm space-y-2 text-gray-700">
            <p><span className="text-gray-500"># Task 1.2:</span> 35,970 rows, 11 columns</p>
            <p><span className="text-gray-500"># Task 1.4:</span> 9 unique origin regions</p>
            <p><span className="text-gray-500"># Task 2.1:</span> 32,010 cattle movements</p>
            <p><span className="text-gray-500"># Task 2.2:</span> 741 movements with &gt;50 animals</p>
            <p><span className="text-gray-500"># Task 3.1:</span> Cattle highest total, then Goat, Sheep, Pig</p>
          </div>
        </div>
      </Exercise>

      {/* Summary Section */}
      <section className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Session Summary</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What We Covered</h3>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>✅ Working directories and file paths</li>
              <li>✅ Importing CSV and Excel files</li>
              <li>✅ Data inspection functions (glimpse, head, summary)</li>
              <li>✅ The pipe operator (%&gt;%)</li>
              <li>✅ The five dplyr verbs</li>
              <li>✅ Chaining operations together</li>
              <li>✅ Handling missing values</li>
              <li>✅ Joining datasets and fixing name mismatches</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Key Functions</h3>
            <ul className="space-y-1 text-gray-700 text-sm font-mono">
              <li>read_csv(), read_excel()</li>
              <li>glimpse(), head(), summary()</li>
              <li>filter(), select(), mutate()</li>
              <li>arrange(), group_by(), summarise()</li>
              <li>count(), n(), sum(), mean()</li>
              <li>is.na(), drop_na(), replace_na()</li>
              <li>left_join(), st_read(), st_drop_geometry()</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link to="/r-basics/session1" className="text-orange-500 hover:underline">
          ← Previous: Introduction to R
        </Link>
        <Link
          to="/r-viz/session1"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Next: Data Visualization →
        </Link>
      </div>
    </div>
  )
}
