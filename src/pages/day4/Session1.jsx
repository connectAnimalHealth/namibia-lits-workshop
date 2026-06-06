import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'

export default function Day4Session1() {
  const loadDataCode = `# Load required packages
library(tidyverse)
library(lubridate)

# Load the synthetic LITS movement data
movements <- read_csv("data/namibia_movements.csv")

# First look at the data
head(movements)       # First 6 rows
glimpse(movements)    # Structure overview
summary(movements)    # Summary statistics`

  const dplyrCode = `# Filter: Keep only cattle movements
cattle_moves <- movements %>%
  filter(species == "Cattle")

# Select: Keep only certain columns
moves_simple <- movements %>%
  select(movement_id, origin_farm, destination_farm, animals, date)

# Mutate: Create new columns
movements <- movements %>%
  mutate(
    month = month(date, label = TRUE),
    year = year(date),
    large_movement = animals > 50
  )

# Summarize: Calculate statistics by group
monthly_summary <- movements %>%
  group_by(month, species) %>%
  summarize(
    total_movements = n(),
    total_animals = sum(animals),
    avg_animals = mean(animals)
  )`

  const ggplotBasicCode = `# Basic bar chart: Movements by region
ggplot(movements, aes(x = origin_region)) +
  geom_bar(fill = "#003580") +
  labs(
    title = "Livestock Movements by Origin Region",
    x = "Region",
    y = "Number of Movements"
  ) +
  theme_minimal()`

  const ggplotTimeCode = `# Time series: Movements over time
monthly_moves <- movements %>%
  mutate(month_year = floor_date(date, "month")) %>%
  group_by(month_year) %>%
  summarize(total = n())

ggplot(monthly_moves, aes(x = month_year, y = total)) +
  geom_line(color = "#003580", size = 1) +
  geom_point(color = "#C8102E", size = 2) +
  labs(
    title = "Monthly Movement Trends",
    x = "Date",
    y = "Number of Movements"
  ) +
  theme_minimal()`

  const ggplotMapCode = `# Load spatial packages
library(sf)

# If you have farm coordinates
farm_locations <- movements %>%
  distinct(origin_farm, origin_lat, origin_lon) %>%
  st_as_sf(coords = c("origin_lon", "origin_lat"), crs = 4326)

# Simple point map
ggplot(farm_locations) +
  geom_sf(color = "#C8102E", size = 2) +
  labs(title = "Farm Locations") +
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

      <Exercise title="Practical: Analyze LITS Movements">
        <p className="mb-3">Using the synthetic LITS data provided:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Load the movement data and explore its structure</li>
          <li>Filter to show only movements crossing the VCF</li>
          <li>Calculate the total animals moved per region per month</li>
          <li>Create a bar chart showing movements by species</li>
          <li>Create a time series of monthly movement volumes</li>
          <li><strong>Challenge:</strong> Which region has the most outgoing movements?</li>
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