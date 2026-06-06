import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'

export default function Day3Session2() {
  const loadMessyCode = `# Load packages
library(tidyverse)
library(readxl)

# Load the original "messy" data
messy_data <- read_excel("data/data2023.xlsx")

# First look - what problems do we see?
glimpse(messy_data)
head(messy_data, 20)

# Check for issues
cat("Dimensions:", nrow(messy_data), "rows,", ncol(messy_data), "columns\\n")
cat("Column names:", names(messy_data), "\\n")

# Check unique values in key columns
unique(messy_data$animal_type)
unique(messy_data$origin_region)`

  const commonProblemsCode = `# Common data quality issues to look for:

# 1. Missing values
colSums(is.na(messy_data))

# 2. Inconsistent naming (same thing spelled differently)
messy_data %>%
  count(origin_region) %>%
  arrange(origin_region)
# Watch for: "Kunene" vs "kunene" vs "KUNENE" vs "Kunene Region"

# 3. Inconsistent establishment types
messy_data %>%
  count(origin_establishment_type) %>%
  arrange(origin_establishment_type)
# Watch for: "Auction" vs "auction" vs "Auction Yard" vs "AUC"

# 4. Date format issues
class(messy_data$date)
head(messy_data$date)
# Watch for: text dates, mixed formats, invalid dates

# 5. Numeric fields stored as text
class(messy_data$weight)
# Watch for: "50" vs 50, "N/A", empty strings`

  const cleaningStepsCode = `# CLEANING STEP BY STEP

# Step 1: Standardize column names (lowercase, no spaces)
clean_data <- messy_data %>%
  rename_with(tolower) %>%
  rename_with(~str_replace_all(., " ", "_"))

# Step 2: Standardize text fields (trim whitespace, consistent case)
clean_data <- clean_data %>%
  mutate(
    origin_region = str_trim(origin_region) %>% str_to_title(),
    destination_region = str_trim(destination_region) %>% str_to_title(),
    origin_constituency = str_trim(origin_constituency) %>% str_to_title(),
    destination_constituency = str_trim(destination_constituency) %>% str_to_title(),
    animal_type = str_trim(animal_type) %>% str_to_title(),
    origin_establishment_type = str_trim(origin_establishment_type) %>% str_to_title(),
    destination_establishment_type = str_trim(destination_establishment_type) %>% str_to_title()
  )

# Step 3: Fix specific inconsistencies
clean_data <- clean_data %>%
  mutate(
    # Standardize establishment types
    origin_establishment_type = case_when(
      str_detect(origin_establishment_type, regex("auction", ignore_case = TRUE)) ~ "Auction",
      str_detect(origin_establishment_type, regex("hold", ignore_case = TRUE)) ~ "Holding",
      str_detect(origin_establishment_type, regex("farm", ignore_case = TRUE)) ~ "Farm",
      str_detect(origin_establishment_type, regex("abattoir|slaughter", ignore_case = TRUE)) ~ "Abattoir",
      TRUE ~ origin_establishment_type
    )
  )

# Step 4: Handle dates
clean_data <- clean_data %>%
  mutate(
    date = as.Date(date),
    year = year(date),
    month = month(date, label = TRUE)
  )

# Step 5: Handle numeric fields
clean_data <- clean_data %>%
  mutate(
    weight = as.numeric(weight)
  ) %>%
  filter(!is.na(weight), weight > 0)  # Remove invalid weights`

  const validationCode = `# VALIDATION: Compare messy vs clean

cat("=== DATA QUALITY COMPARISON ===\\n\\n")

# Row counts
cat("Original rows:", nrow(messy_data), "\\n")
cat("Cleaned rows:", nrow(clean_data), "\\n")
cat("Removed:", nrow(messy_data) - nrow(clean_data), "\\n\\n")

# Check standardization worked
cat("Origin regions (before):", length(unique(messy_data$origin_region)), "unique\\n")
cat("Origin regions (after):", length(unique(clean_data$origin_region)), "unique\\n\\n")

cat("Establishment types (before):", length(unique(messy_data$origin_establishment_type)), "unique\\n")
cat("Establishment types (after):", length(unique(clean_data$origin_establishment_type)), "unique\\n\\n")

# Summary statistics
cat("Weight summary (cleaned):\\n")
summary(clean_data$weight)

# Save cleaned data
write_csv(clean_data, "data/movements_cleaned.csv")
cat("\\nCleaned data saved to: data/movements_cleaned.csv")`

  const compareCleanedCode = `# COMPARE WITH PROFESSIONALLY CLEANED DATA

# Load the cleaned version provided by DVS
professional_clean <- read_excel("data/animal_movement_2023_rev3.xlsx")

# Compare our cleaning to theirs
cat("Our cleaning:", nrow(clean_data), "rows\\n")
cat("Professional cleaning:", nrow(professional_clean), "rows\\n")

# Check for matching structure
cat("\\nColumn comparison:\\n")
cat("Our columns:", paste(names(clean_data), collapse = ", "), "\\n")
cat("Professional columns:", paste(names(professional_clean), collapse = ", "), "\\n")

# Key insight: Professional cleaning often includes:
# - Domain expert review of edge cases
# - Verification against master lists
# - Cross-referencing with other data sources
# - Handling of special cases (quarantine, VCF permits, etc.)

# For analysis, use the professionally cleaned version:
movements <- professional_clean
cat("\\nUsing professionally cleaned data for analysis\\n")
cat("Shape:", nrow(movements), "rows x", ncol(movements), "columns\\n")`

  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-namibia-gold bg-namibia-blue/10 px-2 py-1 rounded">Day 3 - Session 2</span>
        <h1 className="text-3xl font-bold text-namibia-blue mt-2 mb-2">Data Import & Cleaning</h1>
        <p className="text-gray-600">From messy field data to analysis-ready datasets</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Data Cleaning Matters</h2>
        <p className="text-gray-700 mb-4">
          Real-world data is rarely clean. The LITS system captures movements from multiple sources,
          with different users entering data in different ways. Before analysis, we need to:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="font-bold text-red-800 mb-2">Common Problems</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>Inconsistent spelling</li>
              <li>Mixed case (CATTLE vs Cattle)</li>
              <li>Missing values</li>
              <li>Invalid dates</li>
              <li>Text in numeric fields</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h3 className="font-bold text-yellow-800 mb-2">The Dangers</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>Split categories</li>
              <li>Undercounting</li>
              <li>Failed joins</li>
              <li>Incorrect totals</li>
              <li>Misleading results</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">The Solution</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>Standardize text</li>
              <li>Validate against lists</li>
              <li>Handle missing data</li>
              <li>Document changes</li>
              <li>Reproducible scripts</li>
            </ul>
          </div>
        </div>
      </section>

      <Callout type="info" title="Two Data Files">
        We have two versions of the 2023 NCA movement data:
        <ul className="mt-2 space-y-1">
          <li><strong>data2023.xlsx</strong> - Original messy data from LITS</li>
          <li><strong>animal_movement_2023_rev3.xlsx</strong> - Cleaned by DVS (35,970 movements)</li>
        </ul>
        We'll learn cleaning techniques using the messy data, then use the cleaned version for analysis.
      </Callout>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Exploring Messy Data</h2>
        <CodeBlock code={loadMessyCode} language="r" title="Load and explore raw data" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Common Data Quality Issues</h2>
        <CodeBlock code={commonProblemsCode} language="r" title="Identifying problems" />

        <Callout type="warning" title="Namibia-Specific Issues">
          Watch for inconsistent naming of constituencies and regions. For example:
          "Otjozondjupa" vs "Otjozondjupa Region" or "Grootfontein" vs "GROOTFONTEIN".
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Step-by-Step Cleaning</h2>
        <CodeBlock code={cleaningStepsCode} language="r" title="Data cleaning workflow" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Validation & Comparison</h2>
        <CodeBlock code={validationCode} language="r" title="Validate your cleaning" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Using Professionally Cleaned Data</h2>
        <CodeBlock code={compareCleanedCode} language="r" title="Compare with expert cleaning" />

        <Callout type="tip" title="Best Practice">
          When professionally cleaned data is available (like from DVS), use it for analysis.
          But understanding the cleaning process helps you:
          <ul className="mt-2 space-y-1">
            <li>Spot remaining issues</li>
            <li>Clean future datasets</li>
            <li>Communicate with data providers</li>
          </ul>
        </Callout>
      </section>

      <Exercise title="Practical: Clean Your Own Data">
        <p className="mb-3">Using the messy data2023.xlsx file:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Load the messy data and identify at least 3 quality issues</li>
          <li>Count unique values in region and establishment_type columns</li>
          <li>Standardize the establishment types to: Auction, Holding, Farm, Abattoir</li>
          <li>Check for and handle missing values</li>
          <li>Compare your row count to the cleaned version (35,970)</li>
          <li><strong>Challenge:</strong> What might explain any differences?</li>
        </ol>
      </Exercise>

      <div className="flex justify-between">
        <a href="#/day3/session1" className="text-namibia-blue hover:underline">← Previous: R Basics</a>
        <a href="#/day4/session1" className="bg-namibia-blue text-white px-6 py-2 rounded-lg hover:bg-namibia-blue/90">
          Next: Data Visualization →
        </a>
      </div>
    </div>
  )
}
