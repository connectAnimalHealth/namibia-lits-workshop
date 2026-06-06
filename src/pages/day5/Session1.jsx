import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'

export default function Day5Session1() {
  const networkIntroCode = `# Load packages
library(tidyverse)
library(readxl)
library(igraph)

# Load NCA movement data
movements <- read_excel("data/animal_movement_2023_rev3.xlsx")

# Network at CONSTITUENCY level (75 constituencies in NCA)
# Create edge list aggregated by constituency
const_edges <- movements %>%
  filter(!is.na(origin_constituency) & !is.na(destination_constituency)) %>%
  group_by(
    from = origin_constituency,
    to = destination_constituency
  ) %>%
  summarize(
    movements = n(),
    total_animals = sum(weight),
    .groups = "drop"
  ) %>%
  filter(from != to)  # Remove self-loops

# Create the network graph
g_const <- graph_from_data_frame(const_edges, directed = TRUE)

# Basic network info
cat("Number of constituencies (nodes):", vcount(g_const), "\\n")
cat("Number of connections (edges):", ecount(g_const), "\\n")

# Network at ESTABLISHMENT level
est_edges <- movements %>%
  filter(!is.na(origin_establishment) & !is.na(destination_establishment)) %>%
  group_by(
    from = origin_establishment,
    to = destination_establishment,
    movement_type = paste(origin_establishment_type, "->", destination_establishment_type)
  ) %>%
  summarize(
    movements = n(),
    total_animals = sum(weight),
    .groups = "drop"
  )

g_est <- graph_from_data_frame(est_edges, directed = TRUE)
cat("Number of establishments (nodes):", vcount(g_est), "\\n")
cat("Number of connections (edges):", ecount(g_est), "\\n")`

  const centralityCode = `# Calculate centrality measures for constituencies
# In-degree: How many constituencies send animals TO this constituency?
in_degree <- degree(g_const, mode = "in")

# Out-degree: How many constituencies does this send animals TO?
out_degree <- degree(g_const, mode = "out")

# Betweenness: How often is this constituency on shortest path?
# High betweenness = critical hub for disease spread
betweenness_scores <- betweenness(g_const, directed = TRUE)

# Weighted versions (accounting for animal numbers)
strength_in <- strength(g_const, mode = "in", weights = E(g_const)$total_animals)
strength_out <- strength(g_const, mode = "out", weights = E(g_const)$total_animals)

# Create summary dataframe
const_centrality <- data.frame(
  constituency = V(g_const)$name,
  in_degree = in_degree,
  out_degree = out_degree,
  betweenness = betweenness_scores,
  animals_in = strength_in,
  animals_out = strength_out
) %>%
  mutate(
    total_degree = in_degree + out_degree,
    net_flow = animals_in - animals_out  # Positive = net importer
  ) %>%
  arrange(desc(betweenness))

# Top 10 most central constituencies
cat("Top 10 constituencies by betweenness centrality:\\n")
head(const_centrality, 10)

# Net importers vs exporters
cat("\\nTop net importers (receive more than send):\\n")
const_centrality %>% arrange(desc(net_flow)) %>% head(5)

cat("\\nTop net exporters (send more than receive):\\n")
const_centrality %>% arrange(net_flow) %>% head(5)`

  const visualizeNetworkCode = `# Network visualization with ggraph
library(ggraph)
library(sf)

# Simple network plot
ggraph(g_const, layout = "fr") +
  geom_edge_link(aes(alpha = total_animals, width = movements),
                 arrow = arrow(length = unit(2, "mm"), type = "closed"),
                 end_cap = circle(3, "mm")) +
  geom_node_point(aes(size = degree(g_const, mode = "all")),
                  color = "#003580") +
  geom_node_text(aes(label = name), repel = TRUE, size = 2.5) +
  scale_edge_alpha_continuous(range = c(0.2, 0.8)) +
  scale_edge_width_continuous(range = c(0.3, 2)) +
  theme_void() +
  labs(title = "NCA Constituency Movement Network (2023)",
       subtitle = "Node size = connections, Edge opacity = animals moved")

# Geographic network using centroids
constituencies <- st_read("data/shapefile/nca_const.shp")
vcf <- st_read("data/shapefile/VCF_2018.shp")

# Calculate centroids
centroids <- constituencies %>%
  st_centroid() %>%
  mutate(
    lon = st_coordinates(.)[,1],
    lat = st_coordinates(.)[,2]
  ) %>%
  st_drop_geometry() %>%
  select(NAME, lon, lat)

# Join centrality data
centroids_data <- centroids %>%
  left_join(const_centrality, by = c("NAME" = "constituency"))

# Create flow lines for top movements
top_flows <- const_edges %>%
  arrange(desc(total_animals)) %>%
  head(50) %>%
  left_join(centroids, by = c("from" = "NAME")) %>%
  rename(x_from = lon, y_from = lat) %>%
  left_join(centroids, by = c("to" = "NAME")) %>%
  rename(x_to = lon, y_to = lat)

# Geographic flow map
ggplot() +
  geom_sf(data = constituencies, fill = "grey95", color = "grey70") +
  geom_sf(data = vcf, color = "red", linewidth = 1.5, linetype = "dashed") +
  geom_segment(data = top_flows,
               aes(x = x_from, y = y_from, xend = x_to, yend = y_to,
                   alpha = total_animals, linewidth = movements),
               color = "#003580",
               arrow = arrow(length = unit(2, "mm"), type = "closed")) +
  geom_point(data = centroids_data,
             aes(x = lon, y = lat, size = betweenness),
             color = "#C8102E", alpha = 0.7) +
  scale_size_continuous(range = c(1, 8)) +
  scale_alpha_continuous(range = c(0.3, 0.9)) +
  labs(title = "Livestock Movement Flows (NCA 2023)",
       subtitle = "Top 50 movement pathways by animal count",
       caption = "Node size = betweenness centrality, Red dashed = VCF") +
  theme_minimal()`

  const riskAnalysisCode = `# Analyze movement patterns by establishment type
# Key question: Where do animals flow from auctions?

# Movement patterns
movement_patterns <- movements %>%
  group_by(origin_establishment_type, destination_establishment_type) %>%
  summarize(
    movements = n(),
    total_animals = sum(weight),
    .groups = "drop"
  ) %>%
  arrange(desc(movements))

cat("Top movement patterns by establishment type:\\n")
print(movement_patterns)

# Auction analysis - key aggregation points
auction_origins <- movements %>%
  filter(origin_establishment_type == "Auction") %>%
  group_by(origin_establishment, destination_region) %>%
  summarize(
    movements = n(),
    animals = sum(weight),
    .groups = "drop"
  ) %>%
  arrange(desc(animals))

cat("\\nWhere do animals from auctions go?\\n")
print(head(auction_origins, 10))

# High-risk establishments (high betweenness)
est_centrality <- data.frame(
  establishment = V(g_est)$name,
  in_degree = degree(g_est, mode = "in"),
  out_degree = degree(g_est, mode = "out"),
  betweenness = betweenness(g_est, directed = TRUE)
) %>%
  arrange(desc(betweenness))

cat("\\nTop 10 establishments by betweenness (disease spread risk):\\n")
print(head(est_centrality, 10))

# Regional connectivity
regional_edges <- movements %>%
  group_by(origin_region, destination_region) %>%
  summarize(movements = n(), animals = sum(weight), .groups = "drop") %>%
  filter(origin_region != destination_region)

cat("\\nInter-regional movement summary:\\n")
print(regional_edges)`

  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-namibia-gold bg-namibia-blue/10 px-2 py-1 rounded">Day 4.5 - Session 1</span>
        <h1 className="text-3xl font-bold text-namibia-blue mt-2 mb-2">Movement Network Analysis</h1>
        <p className="text-gray-600">Understanding disease spread risk through livestock movement networks</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Network Analysis?</h2>
        <p className="text-gray-700 mb-4">
          Livestock movements create a network where farms are connected by animal transfers. 
          Understanding this network helps us:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-namibia-blue mb-2">Identify High-Risk Nodes</h3>
            <p className="text-sm text-gray-600">
              Farms that receive animals from many sources or serve as hubs between regions 
              are critical points for surveillance.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-namibia-blue mb-2">Trace Outbreak Pathways</h3>
            <p className="text-sm text-gray-600">
              During an outbreak, network analysis helps identify which farms may have been 
              exposed through direct or indirect contact.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-namibia-blue mb-2">Target Interventions</h3>
            <p className="text-sm text-gray-600">
              Focus limited resources on the most connected farms where interventions will 
              have the greatest impact.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-namibia-blue mb-2">Model Disease Spread</h3>
            <p className="text-sm text-gray-600">
              Simulate how a disease might spread through the network to prepare response 
              strategies.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Network Concepts</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-bold text-namibia-blue">Nodes (Vertices)</p>
              <p className="text-gray-600">Individual farms or holdings in the network</p>
            </div>
            <div>
              <p className="font-bold text-namibia-blue">Edges (Links)</p>
              <p className="text-gray-600">Movements between farms</p>
            </div>
            <div>
              <p className="font-bold text-namibia-blue">Degree</p>
              <p className="text-gray-600">Number of connections a farm has</p>
            </div>
            <div>
              <p className="font-bold text-namibia-blue">Betweenness</p>
              <p className="text-gray-600">How often a farm lies on paths between others</p>
            </div>
          </div>
        </div>
        
        <Callout type="info" title="Directed vs Undirected">
          Livestock movement networks are <strong>directed</strong> - movements go FROM one farm TO another. 
          This matters because a farm receiving many animals (high in-degree) has different risk than 
          one sending many animals (high out-degree).
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Building the Network</h2>
        <CodeBlock code={networkIntroCode} language="r" title="Create network from movement data" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Centrality Analysis</h2>
        <p className="text-gray-700 mb-4">
          Centrality measures help identify the most important farms in the network:
        </p>
        <CodeBlock code={centralityCode} language="r" title="Calculate farm centrality" />
        
        <Callout type="warning" title="For FMD Control">
          Farms with high betweenness centrality in the NCA are critical surveillance points - 
          they connect many other farms and could rapidly spread disease if infected.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Visualizing the Network</h2>
        <CodeBlock code={visualizeNetworkCode} language="r" title="Network visualization" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Risk-Based Analysis</h2>
        <CodeBlock code={riskAnalysisCode} language="r" title="Identify high-risk pathways" />
      </section>

      <Exercise title="Final Exercise: Analyze NCA Movement Network">
        <p className="mb-3">Using the real NCA 2023 LITS data (35,970 movements):</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Build the constituency-level movement network</li>
          <li>Calculate centrality measures (in-degree, out-degree, betweenness)</li>
          <li>Identify the top 5 constituencies by betweenness centrality</li>
          <li>Analyze movement patterns by establishment type (Auction → Holding, etc.)</li>
          <li>Create a geographic flow map using constituency centroids</li>
          <li>Identify net importers vs exporters of livestock</li>
          <li><strong>Discussion:</strong> Which establishments would you prioritize for disease surveillance? Why?</li>
        </ol>
      </Exercise>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Workshop Summary</h2>
        <div className="bg-namibia-blue/5 border border-namibia-blue/20 rounded-lg p-6">
          <h3 className="font-bold text-namibia-blue mb-3">What You've Learned</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-800">Days 1-2: Data Collection</p>
              <ul className="text-gray-600 mt-1">
                <li>• Data management principles</li>
                <li>• EpiCollect5 form design</li>
                <li>• Field testing & QA</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Days 3-4: R Programming</p>
              <ul className="text-gray-600 mt-1">
                <li>• R/RStudio basics</li>
                <li>• Data wrangling (dplyr)</li>
                <li>• Visualization (ggplot2)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Day 4.5: Network Analysis</p>
              <ul className="text-gray-600 mt-1">
                <li>• Movement networks</li>
                <li>• Centrality measures</li>
                <li>• Risk-based surveillance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-between">
        <a href="#/day4/session1" className="text-namibia-blue hover:underline">← Previous: Data Visualization</a>
        <a href="#/" className="bg-namibia-green text-white px-6 py-2 rounded-lg hover:bg-namibia-green/90">
          ✓ Complete - Return Home
        </a>
      </div>
    </div>
  )
}