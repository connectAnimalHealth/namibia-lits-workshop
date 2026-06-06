import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'

export default function Day4Session1() {
  const loadDataCode = `# Load required packages
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

  const dplyrCode = `# Filter: Keep only cattle movements
cattle_moves <- movements %>%
  filter(animal_type == "Cattle")

# Select: Keep only certain columns
moves_simple <- movements %>%
  select(date, origin_region, origin_constituency,
         destination_region, destination_constituency,
         animal_type, weight)

# Mutate: Create new columns
movements <- movements %>%
  mutate(
    month = month(date, label = TRUE),
    year = year(date),
    large_movement = weight > 50,
    # Create movement type (e.g., "Auction -> Holding")
    movement_type = paste(origin_establishment_type, "->", destination_establishment_type)
  )

# Summarize: Calculate statistics by group
regional_summary <- movements %>%
  group_by(origin_region, destination_region) %>%
  summarize(
    total_movements = n(),
    total_animals = sum(weight),
    avg_animals = mean(weight),
    .groups = "drop"
  )

# Most common movement types
movement_types <- movements %>%
  group_by(movement_type) %>%
  summarize(count = n(), total_animals = sum(weight)) %>%
  arrange(desc(count))`

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

  const ggplotMapCode = `# Load spatial packages and shapefiles
library(sf)

# Load NCA shapefiles
constituencies <- st_read("data/shapefile/nca_const.shp")
regions <- st_read("data/shapefile/nam_adm_region.shp")
vcf <- st_read("data/shapefile/VCF_2018.shp")

# Summarize movements by constituency
const_summary <- movements %>%
  group_by(origin_constituency) %>%
  summarize(
    outgoing = n(),
    animals_out = sum(weight)
  )

# Join to spatial data
constituencies_data <- constituencies %>%
  left_join(const_summary, by = c("NAME" = "origin_constituency"))

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
        <span className="text-sm font-medium text-namibia-gold bg-namibia-blue/10 px-2 py-1 rounded">Day 4 - Session 1</span>
        <h1 className="text-3xl font-bold text-namibia-blue mt-2 mb-2">Data Wrangling & Visualization</h1>
        <p className="text-gray-600">Transforming and visualizing LITS movement data</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading Data</h2>
        <CodeBlock code={loadDataCode} language="r" title="Load and inspect data" />
        
        <Callout type="info" title="The Pipe Operator: %>%">
          The pipe <code className="bg-blue-100 px-1 rounded">%&gt;%</code> takes the output of one function and 
          passes it as input to the next. Read it as "then". Keyboard shortcut: <strong>Ctrl+Shift+M</strong>.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Wrangling with dplyr</h2>
        <p className="text-gray-700 mb-4">
          The <code className="bg-gray-100 px-1 rounded">dplyr</code> package provides intuitive verbs for 
          data manipulation:
        </p>
        
        <div className="grid md:grid-cols-2 gap-3 mb-4 text-sm">
          <div className="bg-white border rounded p-3">
            <code className="text-namibia-blue font-bold">filter()</code>
            <p className="text-gray-600">Keep rows that match conditions</p>
          </div>
          <div className="bg-white border rounded p-3">
            <code className="text-namibia-blue font-bold">select()</code>
            <p className="text-gray-600">Keep or drop columns</p>
          </div>
          <div className="bg-white border rounded p-3">
            <code className="text-namibia-blue font-bold">mutate()</code>
            <p className="text-gray-600">Create or modify columns</p>
          </div>
          <div className="bg-white border rounded p-3">
            <code className="text-namibia-blue font-bold">summarize()</code>
            <p className="text-gray-600">Calculate summary statistics</p>
          </div>
          <div className="bg-white border rounded p-3">
            <code className="text-namibia-blue font-bold">group_by()</code>
            <p className="text-gray-600">Group data for summarization</p>
          </div>
          <div className="bg-white border rounded p-3">
            <code className="text-namibia-blue font-bold">arrange()</code>
            <p className="text-gray-600">Sort rows</p>
          </div>
        </div>
        
        <CodeBlock code={dplyrCode} language="r" title="dplyr in action" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Visualization with ggplot2</h2>
        <p className="text-gray-700 mb-4">
          ggplot2 uses a "grammar of graphics" - you build plots layer by layer:
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
        
        <Callout type="tip" title="Namibia-Specific Maps">
          For proper Namibia maps with regions and the VCF, you'll need shapefiles from DVS or 
          public sources. We'll work with these in the exercises.
        </Callout>
      </section>

      <Exercise title="Practical: Analyze NCA LITS Movements">
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
      </Exercise>

      <div className="flex justify-between">
        <a href="#/day3/session1" className="text-namibia-blue hover:underline">← Previous: R Basics</a>
        <a href="#/day5/session1" className="bg-namibia-blue text-white px-6 py-2 rounded-lg hover:bg-namibia-blue/90">
          Next: Network Analysis →
        </a>
      </div>
    </div>
  )
}