import { Link } from 'react-router-dom'
import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'
import InlineCode from '../../components/InlineCode'

export default function Day4Session1() {
  const loadDataCode = `# Install packages if needed
packages <- c("tidyverse", "readxl", "lubridate")
install_if_missing <- packages[!packages %in% installed.packages()[,"Package"]]
if(length(install_if_missing)) install.packages(install_if_missing)

# Load required packages
library(tidyverse)
library(readxl)
library(lubridate)

# Load the NCA LITS movement data (cleaned version)
movements <- read_excel("data/animal_movement_2023_rev3.xlsx")

# First look at the data
head(movements)       # First 6 rows
glimpse(movements)    # Structure overview
summary(movements)    # Summary statistics

# The data has these columns:
# - date: Date of movement
# - origin_region, origin_constituency, origin_establishment, origin_establishment_type
# - destination_region, destination_constituency, destination_establishment, destination_establishment_type
# - animal_type, weight (number of animals)`

  const prepDataCode = `# Prepare data for visualization
# (Using skills from Session 2 - Data Import & Wrangling)

# Add useful columns for our plots
movements <- movements %>%
  mutate(
    month = month(date, label = TRUE),
    year = year(date),
    month_year = floor_date(date, "month"),
    movement_type = paste(origin_establishment_type, "->", destination_establishment_type)
  )`

  const ggplotBasicCode = `# Bar chart: Movements by origin region
ggplot(movements, aes(x = reorder(origin_region, origin_region, length))) +
  geom_bar(fill = "#003580") +
  coord_flip() +  # Horizontal bars for readability
  labs(
    title = "Livestock Movements by Origin Region (NCA 2023)",
    x = "Region",
    y = "Number of Movements"
  ) +
  theme_minimal()

# By establishment type
ggplot(movements, aes(x = origin_establishment_type, fill = destination_establishment_type)) +
  geom_bar(position = "dodge") +
  labs(
    title = "Movements by Establishment Type",
    x = "Origin Type",
    y = "Count",
    fill = "Destination Type"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))`

  const ggplotTimeCode = `# Time series: Movements over time
monthly_moves <- movements %>%
  mutate(month_year = floor_date(date, "month")) %>%
  group_by(month_year) %>%
  summarize(
    total = n(),
    total_animals = sum(weight)
  )

ggplot(monthly_moves, aes(x = month_year, y = total)) +
  geom_line(color = "#003580", linewidth = 1) +
  geom_point(color = "#C8102E", size = 2) +
  labs(
    title = "Monthly Movement Trends (NCA 2023)",
    x = "Date",
    y = "Number of Movements"
  ) +
  theme_minimal()

# By animal type
monthly_by_type <- movements %>%
  mutate(month_year = floor_date(date, "month")) %>%
  group_by(month_year, animal_type) %>%
  summarize(total = sum(weight), .groups = "drop")

ggplot(monthly_by_type, aes(x = month_year, y = total, color = animal_type)) +
  geom_line(linewidth = 1) +
  labs(
    title = "Monthly Animals Moved by Type",
    x = "Date",
    y = "Number of Animals",
    color = "Animal Type"
  ) +
  theme_minimal()`

  const ggplotMapCode = `# Install sf if needed (may require system dependencies on some systems)
if(!"sf" %in% installed.packages()[,"Package"]) install.packages("sf")

# Load spatial packages and shapefiles
library(sf)

# Disable s2 spherical geometry (avoids errors with some shapefiles)
sf_use_s2(FALSE)

# Load Namibia spatial data
constituencies <- st_read("data/nam_constituency_4326.geojson")
vcf <- st_read("data/vcf_4326.geojson")

# Summarize movements by constituency
const_summary <- movements %>%
  group_by(origin_constituency) %>%
  summarize(
    outgoing = n(),
    animals_out = sum(weight)
  )

# Join to spatial data
constituencies_data <- constituencies %>%
  left_join(const_summary, by = c("const" = "origin_constituency"))

# Choropleth map of outgoing movements
ggplot() +
  geom_sf(data = constituencies_data, aes(fill = outgoing)) +
  geom_sf(data = vcf, color = "red", linewidth = 1.5) +
  scale_fill_viridis_c(option = "plasma", na.value = "grey90") +
  labs(
    title = "Outgoing Livestock Movements by Constituency (NCA 2023)",
    fill = "Movements",
    caption = "Red line = Veterinary Cordon Fence"
  ) +
  theme_minimal()`

  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded">Day 1-2 - Session 3</span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">Data Visualization with ggplot2</h1>
        <p className="text-gray-600">Creating effective visualizations of LITS movement data</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading Data</h2>
        <CodeBlock code={loadDataCode} language="r" title="Load and inspect data" />
        
        <Callout type="info" title="The Pipe Operator: %>%">
          The pipe <InlineCode>{"%>%"}</InlineCode> takes the output of one function and
          passes it as input to the next. Read it as "then". Keyboard shortcut: <strong>Ctrl+Shift+M</strong>.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Preparing Data for Visualization</h2>

        <Callout type="tip" title="Building on Session 2">
          You've already learned the key dplyr verbs (<InlineCode>filter</InlineCode>, <InlineCode>mutate</InlineCode>,
          <InlineCode>group_by</InlineCode>, <InlineCode>summarize</InlineCode>) in the previous session.
          Here we'll use them to prepare data for our plots.
        </Callout>

        <p className="text-gray-700 mb-4">
          Before creating visualizations, we often need to add columns or reshape data. Run this code to
          add useful columns for our plots:
        </p>

        <CodeBlock code={prepDataCode} language="r" title="Prepare data for visualization" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Visualization with ggplot2</h2>

        <KeyConcept title="The Grammar of Graphics">
          <p>
            Just as language has grammar rules, <strong>ggplot2</strong> has a "grammar of graphics" - a systematic
            way to build any visualization from the same building blocks. Every plot has <strong>data</strong>,
            <strong>aesthetic mappings</strong> (what variables map to x, y, color, size), and <strong>geometric
            objects</strong> (points, lines, bars). Once you understand these principles, you can create any
            visualization - from simple bar charts to complex multi-panel figures - using the same consistent syntax.
          </p>
        </KeyConcept>

        <p className="text-gray-700 mb-4 mt-4">
          Build plots layer by layer using this structure:
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-4 font-mono text-sm">
          <span className="text-purple-600">ggplot</span>(data, <span className="text-blue-600">aes</span>(x, y)) +<br/>
          &nbsp;&nbsp;<span className="text-green-600">geom_*</span>() +<br/>
          &nbsp;&nbsp;<span className="text-orange-600">labs</span>() +<br/>
          &nbsp;&nbsp;<span className="text-red-600">theme_*</span>()
        </div>

        <CodeBlock code={ggplotBasicCode} language="r" title="Bar chart example" />
        <CodeBlock code={ggplotTimeCode} language="r" title="Time series plot" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mapping Movement Data</h2>
        <CodeBlock code={ggplotMapCode} language="r" title="Simple map with sf" />
        
     
      </section>

      <Exercise title="Practical: Analyze NCA LITS Movements" type="individual" duration="45 min">
        <p className="mb-3">Using the real NCA 2023 movement data:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Load the movement data and explore its structure (glimpse, summary)</li>
          <li>Filter to show only cattle movements</li>
          <li>Calculate total animals moved per region per month</li>
          <li>Create a bar chart showing movements by establishment type</li>
          <li>Analyze the most common movement pathways (e.g., Auction → Holding)</li>
          <li>Create a time series of monthly movement volumes by animal type</li>
          <li><strong>Challenge:</strong> Which constituency has the highest outgoing cattle movements?</li>
        </ol>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-bold text-woah-orange mb-2">Bonus: Map Inter-Constituency Movements</h4>
          <p className="text-gray-700 text-sm mb-3">
            Create a choropleth map showing <strong>destination constituencies</strong> within the NCA,
            but exclude movements where the origin and destination are the same constituency
            (i.e., only show movements that actually crossed constituency boundaries).
          </p>

          <details className="bg-gray-50 rounded-lg">
            <summary className="px-4 py-2 cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium">
              Click to reveal hint code
            </summary>
            <div className="px-4 pb-4">
              <pre className="bg-gray-800 text-gray-100 p-4 rounded text-xs overflow-x-auto mt-2">
{`# Filter for inter-constituency movements only
inter_const_moves <- movements %>%
  filter(origin_constituency != destination_constituency)

# Summarize by destination constituency
dest_summary <- inter_const_moves %>%
  group_by(destination_constituency) %>%
  summarize(
    incoming = n(),
    animals_in = sum(weight)
  )

# Join to spatial data and map
constituencies_dest <- constituencies %>%
  filter(nca == TRUE) %>%  # NCA only
  left_join(dest_summary, by = c("const" = "destination_constituency"))

ggplot() +
  geom_sf(data = constituencies_dest, aes(fill = incoming)) +
  geom_sf(data = vcf, color = "red", linewidth = 1.5) +
  scale_fill_viridis_c(option = "plasma", na.value = "grey90") +
  labs(
    title = "Incoming Inter-Constituency Movements (NCA 2023)",
    subtitle = "Excluding within-constituency movements",
    fill = "Movements"
  ) +
  theme_minimal()`}
              </pre>
            </div>
          </details>
        </div>
      </Exercise>

      {/* Exercise Answers Section */}
      <section className="bg-green-50 p-6 rounded-lg border border-green-200 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">ANSWERS</span>
          Exercise Solutions
        </h2>

        <details className="bg-white rounded-lg border border-green-300">
          <summary className="px-4 py-3 cursor-pointer text-green-700 hover:text-green-900 font-semibold">
            Click to reveal complete answers
          </summary>
          <div className="px-4 pb-4">
            <CodeBlock
              code={`# ============================================
# REQUIRED PACKAGES
# ============================================
library(tidyverse)
library(readxl)
library(lubridate)
library(sf)

# ============================================
# 1. Load and explore the data
# ============================================
movements <- read_excel("data/animal_movement_2023_rev3.xlsx")

glimpse(movements)
summary(movements)

# ============================================
# 2. Filter to show only cattle movements
# ============================================
cattle_movements <- movements %>%
  filter(animal_type == "Cattle")

cattle_movements

# ============================================
# 3. Total animals moved per region per month
# ============================================
region_month_summary <- movements %>%
  mutate(month = as.Date(floor_date(date, "month"))) %>%
  group_by(origin_region, month) %>%
  summarise(total_animals = sum(weight, na.rm = TRUE)) %>%
  arrange(origin_region, month)

region_month_summary

# ============================================
# 4. Bar chart: movements by establishment type
# ============================================
ggplot(movements, aes(x = origin_establishment_type, fill = destination_establishment_type)) +
  geom_bar(position = "dodge") +
  labs(
    title = "Movements by Establishment Type",
    x = "Origin Establishment Type",
    y = "Number of Movements",
    fill = "Destination Type"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

# Alternative using facet_wrap (one panel per origin type)
ggplot(movements, aes(x = destination_establishment_type)) +
  geom_bar(fill = "#003580") +
  facet_wrap(~origin_establishment_type, scales = "free_y") +
  labs(
    title = "Destination Types by Origin Establishment",
    x = "Destination Type",
    y = "Number of Movements"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

# ============================================
# 5. Most common movement pathways
# ============================================
pathway_analysis <- movements %>%
  mutate(pathway = paste(origin_establishment_type, "→", destination_establishment_type)) %>%
  count(pathway, sort = TRUE) %>%
  head(10)

pathway_analysis

ggplot(pathway_analysis, aes(x = reorder(pathway, n), y = n)) +
  geom_col(fill = "#003580") +
  coord_flip() +
  labs(
    title = "Top 10 Movement Pathways",
    x = NULL,
    y = "Number of Movements"
  ) +
  theme_minimal()

# ============================================
# 6. Time series: monthly volumes by animal type
# ============================================
monthly_by_animal <- movements %>%
  mutate(month = as.Date(floor_date(date, "month"))) %>%
  group_by(month, animal_type) %>%
  summarise(total_animals = sum(weight, na.rm = TRUE))

ggplot(monthly_by_animal, aes(x = month, y = total_animals, color = animal_type)) +
  geom_line(linewidth = 1) +
  geom_point(size = 2) +
  scale_x_date(date_labels = "%b %Y", date_breaks = "1 month") +
  labs(
    title = "Monthly Movement Volumes by Animal Type",
    x = NULL,
    y = "Number of Animals",
    color = "Animal Type"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

# ============================================
# 7. CHALLENGE: Constituency with highest
#    outgoing cattle movements
# ============================================
cattle_by_constituency <- movements %>%
  filter(animal_type == "Cattle") %>%
  group_by(origin_constituency) %>%
  summarise(
    total_movements = n(),
    total_animals = sum(weight, na.rm = TRUE)
  ) %>%
  arrange(desc(total_animals))

cattle_by_constituency

top_constituency <- cattle_by_constituency %>%
  slice(1)

top_constituency

# ============================================
# 8. BONUS: Map Inter-Constituency Movements
# ============================================
sf_use_s2(FALSE)

constituencies <- st_read("data/nam_constituency_4326.geojson")
vcf <- st_read("data/vcf_4326.geojson")

inter_const_moves <- movements %>%
  filter(origin_constituency != destination_constituency)

dest_summary <- inter_const_moves %>%
  group_by(destination_constituency) %>%
  summarise(
    incoming_movements = n(),
    incoming_animals = sum(weight, na.rm = TRUE)
  ) %>%
  ungroup()

constituencies_dest <- constituencies %>%
  filter(nca == TRUE) %>%
  left_join(dest_summary, by = c("const" = "destination_constituency"))

ggplot() +
  geom_sf(data = constituencies_dest, aes(fill = incoming_movements)) +
  geom_sf(data = vcf, color = "red", linewidth = 1.5) +
  scale_fill_viridis_c(option = "plasma", na.value = "grey90") +
  labs(
    title = "Incoming Inter-Constituency Movements (NCA 2023)",
    subtitle = "Excluding within-constituency movements",
    fill = "Movements",
    caption = "Red line = Veterinary Cordon Fence"
  ) +
  theme_minimal()`}
              language="r"
              title="Complete Exercise Answers"
            />
          </div>
        </details>
      </section>

      {/* Bonus Material Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-purple-500 text-white px-3 py-1 rounded text-sm">BONUS</span>
          Your First RMarkdown Report
        </h2>

        <p className="text-gray-700 mb-4">
          Now that you've learned data wrangling and visualization, let's put it all
          together in an <strong>RMarkdown report</strong>. Copy the code below into a new file called
          <code className="bg-white px-2 py-1 rounded mx-1">movements_report.Rmd</code> and click "Knit" to
          generate a professional HTML report with tables AND graphs.
        </p>

        <Callout type="tip" title="How to Create an RMarkdown File">
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>In RStudio: <strong>File → New File → R Markdown...</strong></li>
            <li>Give it a title and click OK</li>
            <li>Delete all the template content</li>
            <li>Paste the code below</li>
            <li>Save as <code>movements_report.Rmd</code> in your project folder</li>
            <li>Click the <strong>"Knit"</strong> button to generate the report</li>
          </ol>
        </Callout>

        <CodeBlock
          code={`---
title: "Namibia LITS Movement Analysis 2023"
subtitle: "Northern Communal Areas Livestock Traceability Report"
author: "Directorate of Veterinary Services"
date: "\`r format(Sys.Date(), '%d %B %Y')\`"
output:
  html_document:
    toc: true
    toc_float:
      collapsed: false
    theme: flatly
---

\`\`\`{r setup, include=FALSE}
knitr::opts_chunk$set(echo = FALSE, message = FALSE, warning = FALSE, fig.width = 10, fig.height = 6)

# Load required packages
library(tidyverse)
library(readxl)
library(lubridate)
library(kableExtra)

# Import the movement data
movements <- read_excel("data/animal_movement_2023_rev3.xlsx")
\`\`\`

## Executive Summary {.tabset}

This report presents an analysis of **\`r format(nrow(movements), big.mark = ",")\` livestock movement records** from Namibia's Livestock Identification and Traceability System (LITS) for 2023, representing a total of **\`r format(sum(movements$weight, na.rm = TRUE), big.mark = ",")\` animals** moved across the Northern Communal Areas.

---

## Movements by Region

\`\`\`{r by-region}
region_summary <- movements %>%
  group_by(origin_region) %>%
  summarise(
    \`Movement Records\` = n(),
    \`Total Animals\` = sum(weight, na.rm = TRUE),
    \`Avg per Movement\` = round(mean(weight, na.rm = TRUE), 1)
  ) %>%
  arrange(desc(\`Total Animals\`)) %>%
  rename(Region = origin_region)

region_summary %>%
  kbl(caption = "Movement Summary by Origin Region", format.args = list(big.mark = ",")) %>%
  kable_styling(bootstrap_options = c("striped", "hover", "condensed"), full_width = FALSE) %>%
  row_spec(1, bold = TRUE, background = "#e6f3ff")
\`\`\`

\`\`\`{r region-plot, fig.height=5}
ggplot(region_summary, aes(x = reorder(Region, \`Total Animals\`), y = \`Total Animals\`)) +
  geom_col(fill = "#003580", width = 0.7) +
  geom_text(aes(label = format(\`Total Animals\`, big.mark = ",")), hjust = -0.1, size = 3.5) +
  coord_flip() +
  scale_y_continuous(labels = scales::comma, expand = expansion(mult = c(0, 0.15))) +
  labs(x = NULL, y = "Number of Animals") +
  theme_minimal(base_size = 12) +
  theme(
    panel.grid.major.y = element_blank(),
    panel.grid.minor = element_blank()
  )
\`\`\`

---

## Movements by Animal Type

\`\`\`{r by-animal-type}
animal_summary <- movements %>%
  group_by(animal_type) %>%
  summarise(
    \`Movement Records\` = n(),
    \`Total Animals\` = sum(weight, na.rm = TRUE),
    \`Percentage\` = paste0(round(100 * sum(weight, na.rm = TRUE) / sum(movements$weight, na.rm = TRUE), 1), "%")
  ) %>%
  arrange(desc(\`Total Animals\`)) %>%
  rename(\`Animal Type\` = animal_type)

animal_summary %>%
  kbl(caption = "Animals Moved by Species", format.args = list(big.mark = ",")) %>%
  kable_styling(bootstrap_options = c("striped", "hover", "condensed"), full_width = FALSE)
\`\`\`

\`\`\`{r animal-pie, fig.height=4, fig.width=6}
ggplot(animal_summary, aes(x = "", y = \`Total Animals\`, fill = \`Animal Type\`)) +
  geom_col(width = 1, color = "white") +
  coord_polar("y") +
  scale_fill_manual(values = c("Cattle" = "#003580", "Goat" = "#C8102E", "Sheep" = "#FFD100", "Pig" = "#6c757d")) +
  labs(fill = NULL) +
  theme_void(base_size = 12) +
  theme(legend.position = "right")
\`\`\`

---

## Monthly Trends

\`\`\`{r monthly-trends, fig.height=5}
monthly_summary <- movements %>%
  mutate(month = as.Date(floor_date(date, "month"))) %>%
  group_by(month) %>%
  summarise(total_animals = sum(weight, na.rm = TRUE))

ggplot(monthly_summary, aes(x = month, y = total_animals)) +
  geom_area(fill = "#003580", alpha = 0.3) +
  geom_line(color = "#003580", linewidth = 1.2) +
  geom_point(color = "#C8102E", size = 3) +
  scale_x_date(date_labels = "%b %Y", date_breaks = "1 month") +
  scale_y_continuous(labels = scales::comma) +
  labs(x = NULL, y = "Number of Animals Moved") +
  theme_minimal(base_size = 12) +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1),
    panel.grid.minor = element_blank()
  )
\`\`\`

---

## Top Auction Points

\`\`\`{r auction-analysis}
auction_movements <- movements %>%
  filter(destination_establishment_type == "Auction Point") %>%
  group_by(destination_establishment) %>%
  summarise(
    \`Movements\` = n(),
    \`Animals\` = sum(weight, na.rm = TRUE)
  ) %>%
  arrange(desc(\`Movements\`)) %>%
  head(10) %>%
  rename(\`Auction Point\` = destination_establishment)

auction_movements %>%
  kbl(caption = "Top 10 Auction Destinations", format.args = list(big.mark = ",")) %>%
  kable_styling(bootstrap_options = c("striped", "hover", "condensed"), full_width = FALSE) %>%
  row_spec(1:3, bold = TRUE)
\`\`\`

\`\`\`{r auction-chart, fig.height=5}
ggplot(auction_movements, aes(x = reorder(\`Auction Point\`, \`Movements\`), y = \`Movements\`)) +
  geom_col(fill = "#FFD100", width = 0.7) +
  geom_text(aes(label = format(\`Movements\`, big.mark = ",")), hjust = -0.1, size = 3.5) +
  coord_flip() +
  scale_y_continuous(expand = expansion(mult = c(0, 0.15))) +
  labs(x = NULL, y = "Number of Movements") +
  theme_minimal(base_size = 12) +
  theme(
    panel.grid.major.y = element_blank(),
    panel.grid.minor = element_blank()
  )
\`\`\`

---

## Movement Pathways

\`\`\`{r establishment-flow}
flow_summary <- movements %>%
  count(origin_establishment_type, destination_establishment_type, sort = TRUE) %>%
  head(10) %>%
  mutate(Pathway = paste(origin_establishment_type, "→", destination_establishment_type)) %>%
  select(Pathway, \`Movements\` = n)

flow_summary %>%
  kbl(caption = "Top 10 Movement Pathways", format.args = list(big.mark = ",")) %>%
  kable_styling(bootstrap_options = c("striped", "hover", "condensed"), full_width = FALSE)
\`\`\`

\`\`\`{r flow-chart, fig.height=5}
ggplot(flow_summary, aes(x = reorder(Pathway, \`Movements\`), y = \`Movements\`)) +
  geom_col(fill = "#003580", width = 0.7) +
  geom_text(aes(label = format(\`Movements\`, big.mark = ",")), hjust = -0.1, size = 3.5) +
  coord_flip() +
  scale_y_continuous(expand = expansion(mult = c(0, 0.15))) +
  labs(x = NULL, y = "Number of Movements") +
  theme_minimal(base_size = 12) +
  theme(
    panel.grid.major.y = element_blank(),
    panel.grid.minor = element_blank()
  )
\`\`\`

---

## Key Findings

\`\`\`{r findings, results='asis'}
cat(paste0(
  "- **", region_summary$Region[1], "** region recorded the highest volume with ",
  format(region_summary$\`Total Animals\`[1], big.mark = ","), " animals moved\\n",
  "- **Cattle** account for the majority of all livestock movements\\n",
  "- **", auction_movements$\`Auction Point\`[1], "** is the busiest auction point\\n",
  "- The most common pathway is **", flow_summary$Pathway[1], "**"
))
\`\`\`

---

<br>

<div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px; margin-top: 30px;">

<img src="http://www.namlits.com/images/index_01.gif" style="width: 200px; margin-bottom: 15px;">

<p style="margin: 5px 0; color: #666;">Report generated on \`r format(Sys.Date(), '%d %B %Y')\`</p>

<p style="margin: 5px 0; font-weight: bold; color: #003580;">Directorate of Veterinary Services</p>
<p style="margin: 5px 0; color: #666;">Ministry of Agriculture, Water and Land Reform</p>

</div>`}
          language="markdown"
          title="Complete RMarkdown Template with Graphs - Copy This!"
        />

        <div className="mt-4 p-4 bg-white rounded-lg border">
          <h4 className="font-semibold text-gray-800 mb-2">What This Report Includes:</h4>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
            <li>✅ Table of contents (floating)</li>
            <li>✅ Data import with readxl</li>
            <li>✅ Data inspection with glimpse()</li>
            <li>✅ Summary statistics tables</li>
            <li>✅ Bar charts (horizontal & vertical)</li>
            <li>✅ Pie chart for distributions</li>
            <li>✅ Time series line chart</li>
            <li>✅ Movement pathway analysis</li>
            <li>✅ Dynamic text with inline R code</li>
            <li>✅ Professional formatting</li>
          </ul>
        </div>

        <Callout type="success" title="Reproducible Research">
          <p>
            RMarkdown combines your code, results, and narrative in one document. When your data
            updates, just click "Knit" again and all your tables, graphs, and numbers update automatically.
            This is the foundation of reproducible epidemiological reporting!
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link to="/r-basics/session2" className="text-orange-500 hover:underline">
          ← Previous: Data Import & Wrangling
        </Link>
        <Link
          to="/analysis/session1"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Next: Day 3 - Network Analysis →
        </Link>
      </div>
    </div>
  )
}