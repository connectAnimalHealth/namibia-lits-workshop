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
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 p-6 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-3">Learning Objectives</h2>
        <p className="mb-3 text-white/90">By the end of this session, you will be able to:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
            <span>Import data from CSV files, Excel spreadsheets, and the clipboard</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
            <span>Understand working directories and file paths in R</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
            <span>Inspect and explore data structure, dimensions, and content</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">4</span>
            <span>Use the tidyverse for data manipulation (filter, select, mutate, arrange)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">5</span>
            <span>Handle missing values and inconsistent data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">6</span>
            <span>Create summary statistics and counts using group_by and summarise</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">7</span>
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
# [1] "movements_2023.csv"    "lits_data.xlsx"    "regions.csv"`}
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

# Import a CSV file from your data folder
movements <- read_csv("data/movements_2023.csv")

# You'll see a message about column specifications:
# Rows: 35970 Columns: 12
# ── Column specification ────────────────────────────────────
# Delimiter: ","
# chr  (8): origin_region, origin_constituency, destination_region, ...
# dbl  (3): permit_number, num_cattle, num_goats
# date (1): movement_date
#
# ℹ Use spec() to retrieve the full column specification
# ℹ Specify the column types or set show_col_types = FALSE

# The data is now stored in 'movements'
movements
# # A tibble: 35,970 × 12
#    permit_number movement_date origin_region origin_constituency ...
#            <dbl> <date>        <chr>         <chr>               ...
#  1         10234 2023-01-03    Kunene        Epupa               ...
#  2         10235 2023-01-03    Kunene        Opuwo Rural         ...
#  3         10236 2023-01-04    Omusati       Outapi              ...
# # ℹ 35,967 more rows`}
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

        <CodeBlock
          code={`# Load the readxl package
library(readxl)

# Import an Excel file
lits_data <- read_excel("data/lits_data.xlsx")

# Specify which sheet to import (if multiple sheets)
sheet2_data <- read_excel("data/lits_data.xlsx", sheet = "Movements_2023")

# Or specify by sheet number
sheet2_data <- read_excel("data/lits_data.xlsx", sheet = 2)

# Skip header rows if needed (common in government reports)
data_skip <- read_excel("data/report.xlsx", skip = 3)

# View all sheet names in an Excel file
excel_sheets("data/lits_data.xlsx")
# [1] "Summary"   "Movements_2023"   "Movements_2024"   "Regions"`}
          language="r"
          title="Importing Excel Files"
        />

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
            <code>str()</code> immediately after import to verify the data structure, column types, and
            check for obvious problems. This 30-second check can save hours of debugging later.
          </p>
        </KeyConcept>

        <CodeBlock
          code={`# Load the tidyverse (if not already loaded)
library(tidyverse)

# Import our sample data
movements <- read_csv("data/movements_2023.csv")

# ESSENTIAL: First look at your data
glimpse(movements)
# Rows: 35,970
# Columns: 12
# $ permit_number          <dbl> 10234, 10235, 10236, 10237, 10238, ...
# $ movement_date          <date> 2023-01-03, 2023-01-03, 2023-01-04, ...
# $ origin_region          <chr> "Kunene", "Kunene", "Omusati", ...
# $ origin_constituency    <chr> "Epupa", "Opuwo Rural", "Outapi", ...
# $ destination_region     <chr> "Kunene", "Oshana", "Omusati", ...
# $ destination_constituency <chr> "Opuwo Urban", "Oshakati East", ...
# $ origin_type            <chr> "Farm", "Auction", "Farm", ...
# $ destination_type       <chr> "Auction", "Farm", "Abattoir", ...
# $ animal_species         <chr> "Cattle", "Cattle", "Goats", ...
# $ num_animals            <dbl> 15, 42, 8, 23, 5, 12, 67, 34, ...
# $ fmd_zone               <chr> "NCA", "NCA", "NCA", "NCA", ...
# $ vet_district           <chr> "Opuwo", "Opuwo", "Outapi", ...`}
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
# # A tibble: 10 × 12
#    permit_number movement_date origin_region ...
#            <dbl> <date>        <chr>         ...
#  1         10234 2023-01-03    Kunene        ...
#  2         10235 2023-01-03    Kunene        ...
# ... (8 more rows)

# Check dimensions
dim(movements)
# [1] 35970    12    <- 35,970 rows, 12 columns

# Get column names (useful for exact spelling)
names(movements)
# [1] "permit_number"           "movement_date"
# [3] "origin_region"           "origin_constituency"
# [5] "destination_region"      "destination_constituency"
# [7] "origin_type"             "destination_type"
# [9] "animal_species"          "num_animals"
# [11] "fmd_zone"               "vet_district"

# Summary statistics
summary(movements)
#  permit_number    movement_date        origin_region
#  Min.   : 10234   Min.   :2023-01-01   Length:35970
#  1st Qu.: 19218   1st Qu.:2023-04-02   Class :character
#  Median : 28202   Median :2023-07-02   Mode  :character
#  Mean   : 28202   Mean   :2023-07-02
#  3rd Qu.: 37185   3rd Qu.:2023-10-01
#  Max.   : 46169   Max.   :2023-12-31
#
#  num_animals       fmd_zone
#  Min.   :   1.0    Length:35970
#  1st Qu.:   5.0    Class :character
#  Median :  12.0    Mode  :character
#  Mean   :  23.7
#  3rd Qu.:  28.0
#  Max.   :1250.0
#  NA's   :   47     <- Note: 47 missing values!`}
          language="r"
          title="Essential Inspection Functions"
        />

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.2 Checking Unique Values</h3>

        <p className="text-gray-700 mb-3">
          For categorical variables, you should check what unique values exist. This often reveals
          data quality issues like inconsistent spelling.
        </p>

        <CodeBlock
          code={`# See unique values in a column
unique(movements$origin_region)
# [1] "Kunene"        "Omusati"       "Oshana"        "Ohangwena"
# [5] "Oshikoto"      "Kavango East"  "Kavango West"  "Zambezi"

# How many unique values?
length(unique(movements$origin_region))
# [1] 8

# Better: count occurrences of each value
movements %>%
  count(origin_region, sort = TRUE)
# # A tibble: 8 × 2
#   origin_region     n
#   <chr>         <int>
# 1 Omusati        8234
# 2 Oshana         7892
# 3 Kunene         6543
# 4 Oshikoto       5678
# 5 Ohangwena      4321
# 6 Kavango East   1876
# 7 Zambezi        1012
# 8 Kavango West    414

# Check animal species
movements %>%
  count(animal_species, sort = TRUE)
# # A tibble: 4 × 2
#   animal_species     n
#   <chr>          <int>
# 1 Cattle         28456
# 2 Goats           5234
# 3 Sheep           1876
# 4 Pigs             404`}
          language="r"
          title="Exploring Unique Values"
        />
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
  filter(animal_species == "Cattle")

# How many cattle movements?
nrow(cattle_movements)
# [1] 28456

# Filter for Kunene region in 2023
kunene_2023 <- movements %>%
  filter(origin_region == "Kunene",
         movement_date >= "2023-01-01",
         movement_date <= "2023-12-31")

# Multiple conditions with OR (|)
northern_regions <- movements %>%
  filter(origin_region == "Kunene" |
         origin_region == "Omusati" |
         origin_region == "Oshana")

# Shortcut for multiple OR conditions: %in%
northern_regions <- movements %>%
  filter(origin_region %in% c("Kunene", "Omusati", "Oshana"))

# Movements with more than 50 animals
large_movements <- movements %>%
  filter(num_animals > 50)

# Combine conditions: Cattle movements with 50+ animals from Kunene
specific_movements <- movements %>%
  filter(animal_species == "Cattle",
         num_animals > 50,
         origin_region == "Kunene")

nrow(specific_movements)
# [1] 342`}
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
  select(movement_date, origin_region, destination_region, num_animals)
# # A tibble: 35,970 × 4
#    movement_date origin_region destination_region num_animals
#    <date>        <chr>         <chr>                    <dbl>
#  1 2023-01-03    Kunene        Kunene                      15
#  2 2023-01-03    Kunene        Oshana                      42
#  3 2023-01-04    Omusati       Omusati                      8
# # ... more rows

# Select a range of columns
movements %>%
  select(permit_number:origin_constituency)

# Select all columns EXCEPT certain ones
movements %>%
  select(-permit_number, -vet_district)

# Select columns that start with "origin"
movements %>%
  select(starts_with("origin"))
# # A tibble: 35,970 × 3
#    origin_region origin_constituency origin_type
#    <chr>         <chr>               <chr>
#  1 Kunene        Epupa               Farm
#  2 Kunene        Opuwo Rural         Auction
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
          code={`# Add new columns
movements_enhanced <- movements %>%
  mutate(
    # Extract year and month from date
    year = year(movement_date),
    month = month(movement_date),
    month_name = month(movement_date, label = TRUE),

    # Categorize movement size
    size_category = case_when(
      num_animals <= 10  ~ "Small",
      num_animals <= 50  ~ "Medium",
      num_animals <= 100 ~ "Large",
      TRUE               ~ "Very Large"
    ),

    # Flag cross-region movements
    is_cross_region = origin_region != destination_region
  )

# Check our new columns
movements_enhanced %>%
  select(movement_date, year, month_name, num_animals, size_category, is_cross_region) %>%
  head(5)
# # A tibble: 5 × 6
#   movement_date  year month_name num_animals size_category is_cross_region
#   <date>        <dbl> <ord>            <dbl> <chr>         <lgl>
# 1 2023-01-03     2023 Jan                 15 Medium        FALSE
# 2 2023-01-03     2023 Jan                 42 Medium        TRUE
# 3 2023-01-04     2023 Jan                  8 Small         FALSE
# 4 2023-01-04     2023 Jan                 23 Medium        TRUE
# 5 2023-01-05     2023 Jan                  5 Small         TRUE`}
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
  arrange(movement_date) %>%
  head(3)
# # A tibble: 3 × 12
#   permit_number movement_date origin_region ...
#           <dbl> <date>        <chr>         ...
# 1         10234 2023-01-01    Kunene        ...
# 2         10235 2023-01-01    Omusati       ...
# 3         10236 2023-01-01    Oshana        ...

# Sort by date descending (newest first)
movements %>%
  arrange(desc(movement_date)) %>%
  head(3)
# # A tibble: 3 × 12
#   permit_number movement_date origin_region ...
#           <dbl> <date>        <chr>         ...
# 1         46167 2023-12-31    Kavango East  ...
# 2         46168 2023-12-31    Oshikoto      ...
# 3         46169 2023-12-31    Omusati       ...

# Sort by multiple columns
movements %>%
  arrange(origin_region, desc(num_animals)) %>%
  head()
# First sorts by region alphabetically, then within each region
# sorts by number of animals (highest first)`}
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
movements %>%
  group_by(origin_region) %>%
  summarise(
    n_movements = n(),                    # Count rows
    total_animals = sum(num_animals, na.rm = TRUE),  # Sum animals
    avg_animals = mean(num_animals, na.rm = TRUE),   # Average per movement
    max_animals = max(num_animals, na.rm = TRUE)     # Largest movement
  ) %>%
  arrange(desc(total_animals))
# # A tibble: 8 × 5
#   origin_region n_movements total_animals avg_animals max_animals
#   <chr>               <int>         <dbl>       <dbl>       <dbl>
# 1 Omusati              8234        234567        28.5        1250
# 2 Oshana               7892        198234        25.1         890
# 3 Kunene               6543        167890        25.7         756
# 4 Oshikoto             5678        145678        25.7         678
# 5 Ohangwena            4321        112345        26.0         543
# 6 Kavango East         1876         45678        24.3         432
# 7 Zambezi              1012         23456        23.2         234
# 8 Kavango West          414          8765        21.2         156

# Group by multiple variables
movements %>%
  group_by(origin_region, animal_species) %>%
  summarise(
    n_movements = n(),
    total_animals = sum(num_animals, na.rm = TRUE)
  )
# # A tibble: 32 × 4
# # Groups:   origin_region [8]
#   origin_region animal_species n_movements total_animals
#   <chr>         <chr>                <int>         <dbl>
# 1 Kavango East  Cattle                1543         38234
# 2 Kavango East  Goats                  234          5432
# 3 Kavango East  Pigs                    56          1234
# 4 Kavango East  Sheep                   43           778
# ...

# Monthly movement summary
movements %>%
  mutate(month = month(movement_date, label = TRUE)) %>%
  group_by(month) %>%
  summarise(
    n_movements = n(),
    total_animals = sum(num_animals, na.rm = TRUE)
  )
# # A tibble: 12 × 3
#   month n_movements total_animals
#   <ord>       <int>         <dbl>
# 1 Jan          2876         67543
# 2 Feb          2654         62345
# 3 Mar          3123         78234
# ...`}
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
  filter(animal_species == "Cattle",
         destination_constituency == "Oshakati East" |
         destination_constituency == "Oshakati West") %>%

  # Step 2: Group by source constituency
  group_by(origin_constituency) %>%

  # Step 3: Calculate summary statistics
  summarise(
    n_movements = n(),
    total_cattle = sum(num_animals, na.rm = TRUE),
    avg_per_movement = round(mean(num_animals, na.rm = TRUE), 1)
  ) %>%

  # Step 4: Sort by total cattle descending
  arrange(desc(total_cattle)) %>%

  # Step 5: Keep only top 5
  head(5)

# View results
top_sources_to_oshakati
# # A tibble: 5 × 4
#   origin_constituency n_movements total_cattle avg_per_movement
#   <chr>                     <int>        <dbl>            <dbl>
# 1 Outapi                      234         7890             33.7
# 2 Opuwo Urban                 198         5678             28.7
# 3 Oshakati East               187         4567             24.4
# 4 Ondangwa                    165         4123             25.0
# 5 Ongwediva                   143         3456             24.2`}
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
#      permit_number      movement_date      origin_region
#                  0                  0                  5
# origin_constituency destination_region        num_animals
#                 12                  3                 47

# Which columns have missing values?
movements %>%
  summarise(across(everything(), ~sum(is.na(.)))) %>%
  pivot_longer(everything(), names_to = "column", values_to = "n_missing") %>%
  filter(n_missing > 0)
# # A tibble: 4 × 2
#   column              n_missing
#   <chr>                   <int>
# 1 origin_region               5
# 2 origin_constituency        12
# 3 destination_region          3
# 4 num_animals                47

# Remove rows with ANY missing values (use with caution!)
movements_complete <- movements %>%
  drop_na()

nrow(movements)          # [1] 35970
nrow(movements_complete) # [1] 35907  <- Lost 63 rows

# Remove rows with missing values in specific columns
movements_clean <- movements %>%
  drop_na(num_animals, origin_region)

# Replace missing values
movements_filled <- movements %>%
  mutate(
    num_animals = replace_na(num_animals, 0),  # Replace NA with 0
    origin_region = replace_na(origin_region, "Unknown")
  )

# Filter to see only rows WITH missing values
movements %>%
  filter(is.na(num_animals)) %>%
  head()
# Shows rows where num_animals is missing`}
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
          code={`# Load the sf package for spatial data
library(sf)
library(tidyverse)

# Read the constituency GeoJSON
constituencies <- st_read("data/spatial/nam_constituency_4326.geojson")
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
# # A tibble: 4 × 1
#   origin_constituency
#   <chr>
# 1 Katima Mulilo Rural    <- No space issue? Check spelling
# 2 Kabbe North
# 3 Kabbe South
# 4 Judea Lyaboloma

# Check what names exist in the reference data that might match
const_lookup %>%
  filter(str_detect(constituency, "Katima|Kabbe|Judea|Lyaboloma"))
# # A tibble: 4 × 4
#   constituency        gid region   nca
#   <chr>             <int> <chr>    <lgl>
# 1 Katima Mulilo        42 Zambezi  TRUE
# 2 Kabbe                38 Zambezi  TRUE      <- Only one "Kabbe" in reference!
# 3 Judea                39 Zambezi  TRUE
# 4 Linyanti             43 Zambezi  TRUE

# The problem: Movement data has:
# - "Katima Mulilo Rural" but reference has "Katima Mulilo"
# - "Kabbe North" / "Kabbe South" but reference only has "Kabbe"
# - "Judea Lyaboloma" but reference has separate "Judea" and possibly "Lyaboloma"

# Solution: Create a manual mapping table for fixes
name_fixes <- tibble(
  movement_name = c("Katima Mulilo Rural", "Katima Mulilo Urban",
                    "Kabbe North", "Kabbe South",
                    "Judea Lyaboloma"),
  correct_name = c("Katima Mulilo", "Katima Mulilo",
                   "Kabbe", "Kabbe",
                   "Judea")
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

        <Callout type="tip" title="Fuzzy Matching for Many Mismatches">
          <p className="mb-2">
            If you have many mismatches, consider using the <code>stringdist</code> package for
            approximate matching:
          </p>
          <pre className="bg-white p-2 rounded text-sm font-mono mt-2 overflow-x-auto">
{`library(stringdist)
# Find closest match for each unmatched name
amatch(unmatched_names, const_lookup$constituency, maxDist = 3)`}
          </pre>
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
    total_animals = sum(weight),
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
              <li>Filter for cattle movements only</li>
              <li>Filter for movements with more than 100 animals</li>
              <li>Filter for movements from Kunene to Oshana</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-800 mb-2">Task 3: Summarising</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Calculate total animals moved per animal species</li>
              <li>Find the month with the most movements</li>
              <li>What's the average movement size by destination type (Farm, Auction, Abattoir)?</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 p-4 bg-woah-orange/10 rounded-lg">
          <h4 className="font-bold text-woah-orange mb-3">Expected Answers (Check Your Work)</h4>
          <div className="font-mono text-sm space-y-2 text-gray-700">
            <p><span className="text-gray-500"># Task 1.2:</span> 35,970 rows, 12 columns</p>
            <p><span className="text-gray-500"># Task 1.4:</span> 8 unique origin regions</p>
            <p><span className="text-gray-500"># Task 2.1:</span> ~28,456 cattle movements</p>
            <p><span className="text-gray-500"># Task 2.2:</span> ~2,134 movements &gt;100 animals</p>
            <p><span className="text-gray-500"># Task 3.1:</span> Cattle highest total, then goats</p>
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
        <Link to="/day3/session1" className="text-orange-500 hover:underline">
          ← Previous: Introduction to R
        </Link>
        <Link
          to="/day4/session1"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Next: Data Visualization →
        </Link>
      </div>
    </div>
  )
}
