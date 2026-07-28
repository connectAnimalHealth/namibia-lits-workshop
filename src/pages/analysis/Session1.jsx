import { Link } from 'react-router-dom'
import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'
import NetworkDataCollector from '../../components/NetworkDataCollector'

export default function Day5Session1() {
  const dvsNetworkCode = `# DVS Reporting Network - Built from YOUR responses!

# Install packages if not already installed
packages <- c("tidyverse", "httr", "jsonlite", "igraph", "ggraph")
install_if_missing <- packages[!packages %in% installed.packages()[,"Package"]]
if(length(install_if_missing)) install.packages(install_if_missing)

# Load packages
library(tidyverse)
library(httr)
library(jsonlite)
library(igraph)
library(ggraph)

# ============================================
# OPTION 1: Fetch live data from JSONBin.io
# ============================================
JSONBIN_BIN_ID <- "6a2e2b57f5f4af5e29ee8b01"
JSONBIN_API_KEY <- "$2a$10$ipV/tMP6D6kr/M.RsIdMy.T6mr3cwNMJ8/Oj/4xZW6eKjh9rH.XZ2"

response <- GET(
  paste0("https://api.jsonbin.io/v3/b/", JSONBIN_BIN_ID, "/latest"),
  add_headers("X-Access-Key" = JSONBIN_API_KEY)
)

data <- fromJSON(content(response, "text"))
dvs_reports <- as_tibble(data$record) %>%
  select(from, to)  # Keep just the edge columns

# ============================================
# OPTION 2: Manual entry (backup)
# ============================================
# dvs_reports <- tibble(
#   from = c("State Vet Kunene", "State Vet Omusati", "Regional Director"),
#   to = c("Regional Director", "Regional Director", "CVO")
# )

# View our reporting structure
print(dvs_reports)

# Build the network
g_dvs <- graph_from_data_frame(dvs_reports, directed = TRUE)

cat("Nodes (people):", vcount(g_dvs), "\\n")
cat("Edges (reporting lines):", ecount(g_dvs), "\\n")

# Who is most central in the reporting network?
dvs_centrality <- data.frame(
  person = V(g_dvs)$name,
  in_degree = degree(g_dvs, mode = "in"),   # How many report TO them?
  out_degree = degree(g_dvs, mode = "out"), # Who do THEY report to?
  betweenness = round(betweenness(g_dvs, directed = TRUE), 1),
  closeness = round(closeness(g_dvs, mode = "all") * 100, 2)  # Scaled for readability
) %>%
  arrange(desc(in_degree))

cat("\\nMost central people (by reports received):\\n")
print(dvs_centrality)

cat("\\nInterpretation:")
cat("\\n- High IN-DEGREE: Receives reports from many people (information hub)")
cat("\\n- High OUT-DEGREE: Reports to many people (rare in hierarchies)")
cat("\\n- High BETWEENNESS: Information must flow through them (bottleneck)")
cat("\\n- High CLOSENESS: Can reach everyone quickly (central position)\\n")

# Visualize the reporting hierarchy
ggraph(g_dvs, layout = "sugiyama") +  # Hierarchical layout
  geom_edge_link(arrow = arrow(length = unit(3, "mm"), type = "closed"),
                 color = "grey50") +
  geom_node_point(aes(size = degree(g_dvs, mode = "in") + 1),
                  color = "#C8102E") +
  geom_node_text(aes(label = name), repel = TRUE, size = 3) +
  scale_size_continuous(range = c(4, 15), guide = "none") +
  theme_void() +
  labs(title = "DVS FMD Reporting Network",
       subtitle = "Arrow = 'reports to', Node size = number reporting to them")`

  const networkIntroCode = `# Install packages if not already installed
packages <- c("tidyverse", "readxl", "igraph")
install_if_missing <- packages[!packages %in% installed.packages()[,"Package"]]
if(length(install_if_missing)) install.packages(install_if_missing)

# Load packages
library(tidyverse)
library(igraph)
library(sf)

# Disable s2 for shapefile compatibility
sf_use_s2(FALSE)

# Load constituencies (for NCA filter)
constituencies <- st_read("data/nam_constituency_4326.geojson")

# Load the CLEAN movement data (from Session 2 - has GIDs already!)
# If you don't have this file, go back to Session 2 (Section 7.4) and save it first!
movements <- read_csv("data/movements_2023_clean.csv")

# Check we have the GID columns
names(movements)
# Should include: origin_gid, destination_gid

# Network at CONSTITUENCY level (75 constituencies in NCA)
# Create edge list aggregated by constituency - use GIDs for reliable joins!
const_edges <- movements %>%
  filter(!is.na(origin_constituency) & !is.na(destination_constituency)) %>%
  group_by(
    from = origin_constituency,
    to = destination_constituency,
    from_gid = origin_gid,
    to_gid = destination_gid
  ) %>%
  summarize(
    movements = n(),
    total_animals = sum(weight),
    .groups = "drop"
  ) %>%
  # Remove self-loops (movements within same constituency)
  filter(from != to)

# Filter for NCA only (both origin AND destination must be in NCA)
nca_gids <- constituencies %>%
  st_drop_geometry() %>%
  filter(nca == TRUE) %>%
  pull(gid)

const_edges <- const_edges %>%
  filter(from_gid %in% nca_gids & to_gid %in% nca_gids)

cat("NCA-only edges:", nrow(const_edges), "\\n")

# View the edge list structure - this is what a network needs!
head(const_edges, 10)
# # A tibble: 10 × 4
#    from              to                movements total_animals
#    <chr>             <chr>                 <int>         <dbl>
#  1 Eenhana           Engela                   45           312
#  2 Eenhana           Okongo                   12            89
#  3 Eenhana           Oshakati East           156          1204
#  ...

# Create the network graph from edge list
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
  ) %>%
  # Remove self-loops (animals staying at same establishment)
  filter(from != to)

# View establishment edge list
head(est_edges, 5)

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

# Closeness: How quickly can disease reach/spread from this constituency?
# Higher = more central, can reach others faster
closeness_scores <- closeness(g_const, mode = "all")

# Weighted versions (accounting for animal numbers)
strength_in <- strength(g_const, mode = "in", weights = E(g_const)$total_animals)
strength_out <- strength(g_const, mode = "out", weights = E(g_const)$total_animals)

# Create summary dataframe
const_centrality <- data.frame(
  constituency = V(g_const)$name,
  in_degree = in_degree,
  out_degree = out_degree,
  betweenness = round(betweenness_scores, 1),
  closeness = round(closeness_scores * 100, 2),  # Scaled for readability
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

# Top by closeness (fastest spread potential)
cat("\\nTop 5 by closeness (disease would spread fastest from here):\\n")
const_centrality %>% arrange(desc(closeness)) %>% head(5)

# Net importers vs exporters
cat("\\nTop net importers (receive more than send):\\n")
const_centrality %>% arrange(desc(net_flow)) %>% head(5)

cat("\\nTop net exporters (send more than receive):\\n")
const_centrality %>% arrange(net_flow) %>% head(5)`

  const visualizeNetworkCode = `# Network visualization with ggraph
packages <- c("ggraph", "sf")
install_if_missing <- packages[!packages %in% installed.packages()[,"Package"]]
if(length(install_if_missing)) install.packages(install_if_missing)

library(ggraph)
library(sf)

# Disable s2 spherical geometry (avoids errors with some shapefiles)
sf_use_s2(FALSE)

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
# (constituencies already loaded above, but reload if running this section alone)
constituencies <- st_read("data/nam_constituency_4326.geojson")
vcf <- st_read("data/vcf_4326.geojson")

# Filter to NCA constituencies only for mapping
constituencies_nca <- constituencies %>% filter(nca == TRUE)

# Calculate centroids for NCA constituencies - use GID for reliable joins!
centroids <- constituencies_nca %>%
  st_centroid() %>%
  mutate(
    lon = st_coordinates(.)[,1],
    lat = st_coordinates(.)[,2]
  ) %>%
  st_drop_geometry() %>%
  select(gid, const, lon, lat)

# Check structure
head(centroids)
# Should have: gid, const, lon, lat

# View centroid data
head(centroids)

# Join centrality data to centroids
centroids_data <- centroids %>%
  left_join(const_centrality, by = c("const" = "constituency"))

# Create flow lines for top 200 movements - JOIN BY GID!
top_flows <- const_edges %>%
  arrange(desc(total_animals)) %>%
  head(200) %>%
  left_join(centroids, by = c("from_gid" = "gid")) %>%
  rename(x_from = lon, y_from = lat, from_const = const) %>%
  left_join(centroids, by = c("to_gid" = "gid")) %>%
  rename(x_to = lon, y_to = lat, to_const = const)

# Check joins worked
cat("Flow lines with valid coordinates:", sum(!is.na(top_flows$x_from) & !is.na(top_flows$x_to)), "/ 200\\n")

# View the flow data structure
head(top_flows)

# Geographic flow map (NCA only)
ggplot() +
  geom_sf(data = constituencies_nca, fill = "grey95", color = "grey70") +
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
       subtitle = "Top 200 movement pathways by animal count",
       caption = "Node size = betweenness centrality, Red dashed = VCF") +
  theme_minimal()

# ============================================
# INTERACTIVE MAP WITH LEAFLET
# ============================================
if(!"leaflet" %in% installed.packages()[,"Package"]) install.packages("leaflet")
library(leaflet)

# Join centrality data to NCA constituencies for choropleth
constituencies_centrality <- constituencies_nca %>%
  left_join(const_centrality, by = c("const" = "constituency"))

# Color palette for betweenness
pal <- colorNumeric("YlOrRd", domain = constituencies_centrality$betweenness, na.color = "grey90")

# Create interactive map
leaflet() %>%
  addProviderTiles(providers$CartoDB.Positron) %>%

  # Constituency polygons colored by betweenness
  addPolygons(
    data = constituencies_centrality,
    fillColor = ~pal(betweenness),
    fillOpacity = 0.7,
    color = "white",
    weight = 1,
    popup = ~paste0(
      "<strong>", const, "</strong><br>",
      "In-degree: ", in_degree, "<br>",
      "Out-degree: ", out_degree, "<br>",
      "Betweenness: ", round(betweenness, 1), "<br>",
      "Animals in: ", animals_in, "<br>",
      "Animals out: ", animals_out
    ),
    highlightOptions = highlightOptions(
      weight = 3, color = "#C8102E", fillOpacity = 0.9
    )
  ) %>%

  # VCF line
  addPolylines(
    data = vcf,
    color = "red",
    weight = 3,
    dashArray = "10,10",
    popup = "Veterinary Cordon Fence"
  ) %>%

  # Flow lines for top movements (filter out any with missing coordinates)
  addPolylines(
    data = top_flows %>%
      filter(!is.na(x_from) & !is.na(y_from) & !is.na(x_to) & !is.na(y_to)) %>%
      rowwise() %>%
      mutate(geometry = st_sfc(st_linestring(matrix(c(x_from, y_from, x_to, y_to), ncol = 2, byrow = TRUE)), crs = 4326)) %>%
      st_as_sf(),
    color = "#003580",
    weight = ~sqrt(total_animals) / 8 + 1,
    opacity = 0.5,
    popup = ~paste0(from, " → ", to, "<br>", format(total_animals, big.mark = ","), " animals")
  ) %>%

  # Arrow heads at 80% along the line (near destination) - shows direction clearly
  addCircleMarkers(
    data = top_flows %>%
      filter(!is.na(x_from) & !is.na(y_from) & !is.na(x_to) & !is.na(y_to)) %>%
      mutate(
        arrow_lng = x_from + 0.8 * (x_to - x_from),
        arrow_lat = y_from + 0.8 * (y_to - y_from)
      ),
    lng = ~arrow_lng, lat = ~arrow_lat,
    radius = 3,
    color = "#003580",
    weight = 2,
    fillColor = "#C8102E",
    fillOpacity = 1,
    popup = ~paste0(from, " → ", to, "<br>", format(total_animals, big.mark = ","), " animals")
  ) %>%

  # Destination markers (larger, at endpoint)
  addCircleMarkers(
    data = top_flows %>%
      filter(!is.na(x_to) & !is.na(y_to)),
    lng = ~x_to, lat = ~y_to,
    radius = 5,
    color = "white",
    weight = 2,
    fillColor = "#28a745",
    fillOpacity = 0.8,
    popup = ~paste0("<strong>ORIGIN: ", from, "</strong><br>To: ", to, "<br>", total_animals, " animals")
  ) %>%

  # Centrality points at centroids (smaller, semi-transparent to not cover flow markers)
  addCircleMarkers(
    data = centroids_data %>% filter(!is.na(betweenness)),
    lng = ~lon, lat = ~lat,
    radius = ~sqrt(betweenness) / 4 + 2,
    color = "#C8102E",
    fillColor = "#C8102E",
    fillOpacity = 0.4,
    weight = 1,
    popup = ~paste0(
      "<strong>", const, "</strong><br>",
      "Betweenness: ", round(betweenness, 1)
    )
  ) %>%

  # Legend
  addLegend(
    position = "bottomright",
    pal = pal,
    values = constituencies_centrality$betweenness,
    title = "Betweenness<br>Centrality",
    na.label = "No data"
  )`

  const highBetweennessEgoCode = `# ============================================
# INVESTIGATE: Movements to/from highest betweenness constituency
# ============================================

# Find the constituency with the highest betweenness centrality
top_betweenness <- const_centrality %>%
  arrange(desc(betweenness)) %>%
  slice(1)

cat("Constituency with highest betweenness:", top_betweenness$constituency, "\\n")
cat("Betweenness score:", round(top_betweenness$betweenness, 1), "\\n")

# Extract all movements involving this constituency (ego network)
hub_name <- top_betweenness$constituency

hub_movements <- const_edges %>%
  filter(from == hub_name | to == hub_name)

cat("\\nMovements involving", hub_name, ":", nrow(hub_movements), "\\n")
cat("As origin:", sum(hub_movements$from == hub_name), "\\n")
cat("As destination:", sum(hub_movements$to == hub_name), "\\n")

# Create ego network (subgraph centered on hub)
ego_edges <- hub_movements %>%
  select(from, to, movements, total_animals)

g_ego <- graph_from_data_frame(ego_edges, directed = TRUE)

# Visualize the ego network
ggraph(g_ego, layout = "star") +
  geom_edge_link(
    aes(width = total_animals, alpha = movements),
    arrow = arrow(length = unit(3, "mm"), type = "closed"),
    end_cap = circle(4, "mm"),
    color = "#003580"
  ) +
  geom_node_point(
    aes(size = ifelse(name == hub_name, 20, 8)),
    color = ifelse(V(g_ego)$name == hub_name, "#C8102E", "#FF8C00")
  ) +
  geom_node_text(aes(label = name), repel = TRUE, size = 3) +
  scale_edge_width_continuous(range = c(0.5, 3), name = "Animals") +
  scale_edge_alpha_continuous(range = c(0.3, 0.9), name = "Movements") +
  scale_size_identity() +
  theme_void() +
  labs(
    title = paste("Ego Network:", hub_name),
    subtitle = "All constituencies directly connected to the highest betweenness hub"
  )

# Geographic visualization of hub connections
hub_flows <- const_edges %>%
  filter(from == hub_name | to == hub_name) %>%
  left_join(centroids, by = c("from_gid" = "gid")) %>%
  rename(x_from = lon, y_from = lat) %>%
  left_join(centroids, by = c("to_gid" = "gid")) %>%
  rename(x_to = lon, y_to = lat)

# Get hub centroid for highlighting
hub_centroid <- centroids_data %>% filter(const == hub_name)

ggplot() +
  geom_sf(data = constituencies_nca, fill = "grey95", color = "grey70") +
  geom_sf(data = vcf, color = "red", linewidth = 1.5, linetype = "dashed") +
  geom_segment(
    data = hub_flows,
    aes(x = x_from, y = y_from, xend = x_to, yend = y_to,
        linewidth = total_animals, alpha = movements),
    color = "#003580",
    arrow = arrow(length = unit(2, "mm"), type = "closed")
  ) +
  geom_point(
    data = hub_centroid,
    aes(x = lon, y = lat),
    color = "#C8102E", size = 8
  ) +
  geom_text(
    data = hub_centroid,
    aes(x = lon, y = lat, label = const),
    vjust = -1.5, fontface = "bold", size = 4
  ) +
  scale_linewidth_continuous(range = c(0.5, 3)) +
  scale_alpha_continuous(range = c(0.4, 0.9)) +
  labs(
    title = paste("Movement Connections:", hub_name),
    subtitle = "Highest betweenness constituency - critical for disease spread",
    caption = "Red point = hub constituency, Red dashed = VCF"
  ) +
  theme_minimal()`

  const regionNetworkCode = `# ============================================
# REGION-LEVEL NETWORK ANALYSIS
# ============================================

# Aggregate constituencies to regions using spatial data
# Filter to NCA only so centroids fall within NCA boundaries

# Dissolve NCA constituencies into regions
regions <- constituencies %>%
  filter(nca == TRUE) %>%
  group_by(region) %>%
  summarise(geometry = st_union(geometry)) %>%
  ungroup()

# Calculate region centroids
region_centroids <- regions %>%
  st_centroid() %>%
  mutate(
    lon = st_coordinates(.)[,1],
    lat = st_coordinates(.)[,2]
  ) %>%
  st_drop_geometry()

cat("NCA Regions found:", nrow(region_centroids), "\\n")
print(region_centroids)

# Create region-level edge list from movement data
# Filter to only include NCA regions
nca_regions <- unique(region_centroids$region)

region_edges <- movements %>%
  filter(!is.na(origin_region) & !is.na(destination_region)) %>%
  filter(origin_region %in% nca_regions & destination_region %in% nca_regions) %>%
  group_by(from = origin_region, to = destination_region) %>%
  summarise(
    movements = n(),
    total_animals = sum(weight, na.rm = TRUE)
  ) %>%
  filter(from != to)  # Remove self-loops

cat("\\nInter-regional connections:", nrow(region_edges), "\\n")
print(region_edges)

# Build the region network
g_region <- graph_from_data_frame(region_edges, directed = TRUE)

cat("\\nRegion network summary:\\n")
cat("Nodes (regions):", vcount(g_region), "\\n")
cat("Edges (connections):", ecount(g_region), "\\n")

# Region centrality analysis
region_centrality <- data.frame(
  region = V(g_region)$name,
  in_degree = degree(g_region, mode = "in"),
  out_degree = degree(g_region, mode = "out"),
  betweenness = round(betweenness(g_region, directed = TRUE), 1),
  animals_in = strength(g_region, mode = "in", weights = E(g_region)$total_animals),
  animals_out = strength(g_region, mode = "out", weights = E(g_region)$total_animals)
) %>%
  mutate(net_flow = animals_in - animals_out) %>%
  arrange(desc(betweenness))

cat("\\nRegion centrality (sorted by betweenness):\\n")
print(region_centrality)

# Visualize region network
ggraph(g_region, layout = "fr") +
  geom_edge_link(
    aes(width = total_animals, alpha = movements),
    arrow = arrow(length = unit(4, "mm"), type = "closed"),
    end_cap = circle(8, "mm"),
    color = "#003580"
  ) +
  geom_node_point(
    aes(size = degree(g_region, mode = "all")),
    color = "#C8102E"
  ) +
  geom_node_text(aes(label = name), repel = TRUE, size = 4, fontface = "bold") +
  scale_edge_width_continuous(range = c(1, 5), name = "Animals") +
  scale_edge_alpha_continuous(range = c(0.3, 0.9), name = "Movements") +
  scale_size_continuous(range = c(8, 20), name = "Connections") +
  theme_void() +
  labs(
    title = "Inter-Regional Livestock Movement Network (NCA 2023)",
    subtitle = "Node size = total connections, Edge width = animals moved"
  )

# Geographic region flow map
region_flows <- region_edges %>%
  left_join(region_centroids, by = c("from" = "region")) %>%
  rename(x_from = lon, y_from = lat) %>%
  left_join(region_centroids, by = c("to" = "region")) %>%
  rename(x_to = lon, y_to = lat)

# Join centrality to centroids for sizing
region_centroids_data <- region_centroids %>%
  left_join(region_centrality, by = "region")

ggplot() +
  geom_sf(data = regions, fill = "grey95", color = "grey50", linewidth = 0.8) +
  geom_sf(data = vcf, color = "red", linewidth = 2, linetype = "dashed") +
  geom_segment(
    data = region_flows,
    aes(x = x_from, y = y_from, xend = x_to, yend = y_to,
        linewidth = total_animals, alpha = movements),
    color = "#003580",
    arrow = arrow(length = unit(4, "mm"), type = "closed")
  ) +
  geom_point(
    data = region_centroids_data,
    aes(x = lon, y = lat, size = betweenness),
    color = "#C8102E", alpha = 0.8
  ) +
  geom_text(
    data = region_centroids_data,
    aes(x = lon, y = lat, label = region),
    vjust = -1.5, fontface = "bold", size = 3.5
  ) +
  scale_linewidth_continuous(range = c(1, 6), name = "Animals") +
  scale_alpha_continuous(range = c(0.4, 0.9), name = "Movements") +
  scale_size_continuous(range = c(4, 15), name = "Betweenness") +
  labs(
    title = "Inter-Regional Livestock Flows (NCA 2023)",
    subtitle = "Aggregated from constituency-level movements",
    caption = "Node size = betweenness centrality, Red dashed = VCF"
  ) +
  theme_minimal()

# ============================================
# INTERACTIVE LEAFLET MAP - Region Network
# ============================================
library(leaflet)

# Join centrality data to regions for choropleth
regions_centrality <- regions %>%
  left_join(region_centrality, by = "region")

# Color palette for betweenness
pal_region <- colorNumeric("YlOrRd", domain = regions_centrality$betweenness, na.color = "grey90")

# Create flow lines as sf objects
region_flow_lines <- region_flows %>%
  filter(!is.na(x_from) & !is.na(y_from) & !is.na(x_to) & !is.na(y_to)) %>%
  rowwise() %>%
  mutate(geometry = st_sfc(st_linestring(matrix(c(x_from, y_from, x_to, y_to), ncol = 2, byrow = TRUE)), crs = 4326)) %>%
  st_as_sf()

# Build interactive map
leaflet() %>%
  addProviderTiles(providers$CartoDB.Positron) %>%

  # Region polygons colored by betweenness

  addPolygons(
    data = regions_centrality,
    fillColor = ~pal_region(betweenness),
    fillOpacity = 0.6,
    color = "white",
    weight = 2,
    popup = ~paste0(
      "<strong>", region, "</strong><br>",
      "In-degree: ", in_degree, "<br>",
      "Out-degree: ", out_degree, "<br>",
      "Betweenness: ", round(betweenness, 1), "<br>",
      "Animals in: ", format(animals_in, big.mark = ","), "<br>",
      "Animals out: ", format(animals_out, big.mark = ","), "<br>",
      "Net flow: ", format(net_flow, big.mark = ",")
    ),
    highlightOptions = highlightOptions(
      weight = 4, color = "#C8102E", fillOpacity = 0.8
    )
  ) %>%

  # VCF line
  addPolylines(
    data = vcf,
    color = "red",
    weight = 3,
    dashArray = "10,10",
    popup = "Veterinary Cordon Fence"
  ) %>%

  # Flow lines between regions
  addPolylines(
    data = region_flow_lines,
    color = "#003580",
    weight = ~sqrt(total_animals) / 15 + 2,
    opacity = 0.6,
    popup = ~paste0(
      "<strong>", from, " → ", to, "</strong><br>",
      "Movements: ", format(movements, big.mark = ","), "<br>",
      "Animals: ", format(total_animals, big.mark = ",")
    )
  ) %>%

  # Arrow heads at 80% along the line (near destination)
  # Calculate position 80% of the way from origin to destination
  addCircleMarkers(
    data = region_flows %>%
      filter(!is.na(x_from) & !is.na(y_from) & !is.na(x_to) & !is.na(y_to)) %>%
      mutate(
        arrow_lng = x_from + 0.8 * (x_to - x_from),
        arrow_lat = y_from + 0.8 * (y_to - y_from)
      ),
    lng = ~arrow_lng, lat = ~arrow_lat,
    radius = 4,
    color = "#003580",
    weight = 2,
    fillColor = "#003580",
    fillOpacity = 1,
    popup = ~paste0(from, " → ", to)
  ) %>%

  # Region centroids with betweenness sizing
  addCircleMarkers(
    data = region_centroids_data %>% filter(!is.na(betweenness)),
    lng = ~lon, lat = ~lat,
    radius = ~sqrt(betweenness) + 5,
    color = "#C8102E",
    fillColor = "#C8102E",
    fillOpacity = 0.5,
    weight = 2,
    popup = ~paste0(
      "<strong>", region, "</strong><br>",
      "Betweenness: ", round(betweenness, 1)
    )
  ) %>%

  # Legend
  addLegend(
    position = "bottomright",
    pal = pal_region,
    values = regions_centrality$betweenness,
    title = "Region<br>Betweenness",
    na.label = "No data"
  )`

  const missingConstituenciesCode = `# ============================================
# INVESTIGATION: Why are some constituencies missing from the network?
# ============================================

# Which NCA constituencies have NO movement data?
# (They appear grey on the map with NA values)

# Get all NCA constituency names from the GeoJSON
nca_constituencies <- constituencies %>%
  st_drop_geometry() %>%
  filter(nca == TRUE) %>%
  select(const, gid)

cat("Total NCA constituencies:", nrow(nca_constituencies), "\\n")

# Which constituencies appear in our movement network?
network_constituencies <- unique(c(const_edges$from, const_edges$to))
cat("Constituencies in network:", length(network_constituencies), "\\n")

# Find the MISSING ones
missing_from_network <- nca_constituencies %>%
  filter(!const %in% network_constituencies)

cat("\\n=== CONSTITUENCIES WITH NO RECORDED MOVEMENTS ===\\n")
print(missing_from_network)

# Let's check if these names exist in the raw movement data (maybe spelling issue?)
cat("\\n=== Checking raw movement data for these names ===\\n")
for(name in missing_from_network$const) {
  # Check exact match
  exact_match <- sum(movements$origin_constituency == name |
                     movements$destination_constituency == name, na.rm = TRUE)

  # Check partial match (case insensitive)
  partial_match <- sum(grepl(name, movements$origin_constituency, ignore.case = TRUE) |
                       grepl(name, movements$destination_constituency, ignore.case = TRUE),
                       na.rm = TRUE)

  cat(name, ": exact=", exact_match, ", partial=", partial_match, "\\n")
}

# Discussion questions:
# 1. Are these constituencies genuinely isolated (no livestock trade)?
# 2. Is this a data collection gap?
# 3. Do the names not match between movement data and GeoJSON?
# 4. What are the implications for disease surveillance?`

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
  filter(origin_establishment_type == "Auction Point") %>%
  group_by(origin_establishment, destination_region) %>%
  summarize(
    movements = n(),
    animals = sum(weight),
    .groups = "drop"
  ) %>%
  arrange(desc(animals))

cat("\\nWhere do animals from Auction Points go?\\n")
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
        <span className="text-sm font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">Day 3</span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">Movement Network Analysis</h1>
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
            <h3 className="font-bold text-woah-orange mb-2">Identify High-Risk Nodes</h3>
            <p className="text-sm text-gray-600">
              Farms that receive animals from many sources or serve as hubs between regions 
              are critical points for surveillance.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Trace Outbreak Pathways</h3>
            <p className="text-sm text-gray-600">
              During an outbreak, network analysis helps identify which farms may have been 
              exposed through direct or indirect contact.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Target Interventions</h3>
            <p className="text-sm text-gray-600">
              Focus limited resources on the most connected farms where interventions will 
              have the greatest impact.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-woah-orange mb-2">Model Disease Spread</h3>
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
              <p className="font-bold text-woah-orange">Nodes (Vertices)</p>
              <p className="text-gray-600">Individual farms or holdings in the network</p>
            </div>
            <div>
              <p className="font-bold text-woah-orange">Edges (Links)</p>
              <p className="text-gray-600">Movements between farms</p>
            </div>
            <div>
              <p className="font-bold text-woah-orange">Degree</p>
              <p className="text-gray-600">Number of connections a farm has</p>
            </div>
            <div>
              <p className="font-bold text-woah-orange">Betweenness</p>
              <p className="text-gray-600">How often a farm lies on paths between others</p>
            </div>
          </div>
        </div>
        
        <Callout type="info" title="Directed vs Undirected">
          Livestock movement networks are <strong>directed</strong> - movements go FROM one farm TO another.
          This matters because a farm receiving many animals (high in-degree) has different risk than
          one sending many animals (high out-degree).
        </Callout>

        <KeyConcept title="In-Degree = Disease Introduction Risk">
          <p>
            <strong>In-degree</strong> counts how many different sources send animals TO a node. Nodes with
            high in-degree receive animals from many locations, making them high-risk for disease introduction.
            If any of their suppliers is infected, they're exposed. <em>Examples: feedlots, abattoirs,
            large commercial farms, and auction points acting as buyers</em>. These should be priority targets
            for <strong>passive surveillance</strong> and <strong>pre-movement testing requirements</strong>.
          </p>
        </KeyConcept>

        <KeyConcept title="Out-Degree = Disease Dissemination Risk">
          <p>
            <strong>Out-degree</strong> counts how many different destinations receive animals FROM a node.
            Nodes with high out-degree can spread disease widely if infected - they act as "super-spreaders"
            in the network. <em>Examples: breeding farms, auction points acting as sellers, quarantine stations,
            and large commercial operations supplying multiple buyers</em>. These should be priority targets
            for <strong>active surveillance</strong>, <strong>vaccination programs</strong>, and
            <strong>movement restrictions</strong> during outbreaks.
          </p>
        </KeyConcept>

        <KeyConcept title="Betweenness Centrality = Disease Spread Risk">
          <p>
            <strong>Betweenness centrality</strong> measures how often a node lies on the shortest path between
            other nodes. In disease epidemiology, nodes with high betweenness are critical control points -
            they act as "bridges" connecting otherwise separate parts of the network. If disease enters a
            high-betweenness node, it can rapidly spread to many others. <em>Examples: auction points,
            feedlots, trading hubs, and quarantine stations that connect different regions</em>. These are
            your priority surveillance targets.
          </p>
        </KeyConcept>

        <KeyConcept title="Closeness Centrality = Speed of Spread">
          <p>
            <strong>Closeness centrality</strong> measures how quickly a node can reach (or be reached by)
            all other nodes in the network. Nodes with high closeness are "close" to everyone - disease
            originating there would spread fastest across the network. Conversely, these nodes would also
            be reached quickly if disease started elsewhere. <em>Examples: centrally located markets,
            major auction points, and establishments in high-traffic trading corridors</em>. These are
            priority targets for <strong> early warning systems</strong> and <strong> sentinel surveillance</strong>.
          </p>
        </KeyConcept>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Interactive Exercise: DVS Reporting Network</h2>
        <p className="text-gray-700 mb-4">
          Before we analyze livestock movements, let's build a network you know well - <strong>your own
          reporting structure</strong>. This will make network concepts concrete.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-800 font-semibold text-lg">
            "If you detected a suspected FMD outbreak right now, who would you immediately report to?"
          </p>
          <p className="text-red-700 text-sm mt-1">
            You can name more than one person/role - separate with commas.
          </p>
        </div>

        <NetworkDataCollector title="Submit Your Response" />

        <Exercise title="Analyze the DVS Reporting Network" type="group" duration="15 min">
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Everyone submit your response using the form above</li>
            <li>Run the R code below to build the network from our responses</li>
            <li>See who emerges as most central in the communication network</li>
            <li><strong>Discussion:</strong> Are the most central people also the busiest? What happens if they're unavailable?</li>
          </ol>
        </Exercise>

        <CodeBlock code={dvsNetworkCode} language="r" title="DVS Reporting Network Analysis" />

        <Callout type="tip" title="Key Insight">
          The person with the highest <strong>in-degree</strong> receives reports from the most people -
          they're a communication bottleneck. High <strong>betweenness</strong> means information must flow
          through them. This same logic applies to livestock movements and disease spread!
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Building the Livestock Movement Network</h2>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Investigating the Highest Betweenness Constituency</h2>
        <p className="text-gray-700 mb-4">
          Let's zoom in on the constituency with the <strong>highest betweenness centrality</strong> -
          this is the most critical node for disease spread. We'll visualize all its connections
          as an "ego network" to understand why it's so important.
        </p>
        <CodeBlock code={highBetweennessEgoCode} language="r" title="Ego network of highest betweenness constituency" />

        <Callout type="warning" title="Surveillance Priority">
          The constituency with highest betweenness sits on many shortest paths between other constituencies.
          If disease enters here, it can spread rapidly in multiple directions. This should be a
          <strong> top priority for active surveillance</strong> and movement monitoring.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Region-Level Network Analysis</h2>
        <p className="text-gray-700 mb-4">
          While constituency-level analysis gives us detail, sometimes we need the <strong>bigger picture</strong>.
          Let's aggregate our network to the <strong>region level</strong> by dissolving constituencies
          into their parent regions and analyzing inter-regional flows.
        </p>
        <CodeBlock code={regionNetworkCode} language="r" title="Region-level network construction and visualization" />

        <Callout type="info" title="Why Region-Level Analysis?">
          Region-level networks are useful for:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Strategic planning</strong> - Allocate resources across regional offices</li>
            <li><strong>Cross-border coordination</strong> - Identify which regions need to coordinate</li>
            <li><strong>Simplified communication</strong> - Easier to explain to policymakers</li>
            <li><strong>Detecting macro patterns</strong> - See the forest, not just the trees</li>
          </ul>
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Investigating Missing Constituencies</h2>
        <p className="text-gray-700 mb-4">
          When you view the interactive map, you may notice some NCA constituencies appear <strong>grey with NA values</strong> -
          they're not showing up in the network at all. Why? This exercise investigates the data gaps.
        </p>

        <Exercise title="Data Detective: Find the Missing Constituencies" type="individual" duration="15 min">
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Run the code below to identify which NCA constituencies have <strong>no recorded movements</strong></li>
            <li>Check if the constituency names appear in the raw movement data (possible spelling mismatch?)</li>
            <li>Discuss with your group:
              <ul className="list-disc list-inside ml-4 mt-1 text-gray-600">
                <li>Are these constituencies genuinely isolated (no livestock trade)?</li>
                <li>Is this a data collection gap in LITS?</li>
                <li>What are the implications for disease surveillance in these areas?</li>
              </ul>
            </li>
            <li><strong>Challenge:</strong> If a constituency has no recorded movements, how would you track disease spread there?</li>
          </ol>
        </Exercise>

        <CodeBlock code={missingConstituenciesCode} language="r" title="Investigate missing constituencies" />

        <Callout type="warning" title="Data Quality Matters">
          Missing constituencies in the network could represent either <strong>genuine isolation</strong> (no livestock trade)
          or <strong>data gaps</strong> in the LITS system. Both have implications for disease surveillance -
          isolated areas may be low risk but also lack monitoring, while data gaps could hide significant movement activity.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Risk-Based Analysis</h2>
        <CodeBlock code={riskAnalysisCode} language="r" title="Identify high-risk pathways" />
      </section>

      <Exercise title="Final Exercise: Auction Network Analysis for Surveillance" type="individual" duration="30 min">
        <p className="mb-3">
          Auctions are critical aggregation points where animals from many sources mix - making them
          high-risk for disease transmission. Let's analyze the <strong>auction movement network</strong> specifically:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Filter the movement data to include only <strong>auction-related movements</strong> (where origin OR destination establishment type is "Auction Point")</li>
          <li>Build a <strong>constituency-level network</strong> from these auction movements</li>
          <li>Calculate centrality measures (in-degree, out-degree, betweenness) for constituencies in the auction network</li>
          <li>Identify which <strong>auction points</strong> have the highest:
            <ul className="list-disc list-inside ml-4 mt-1 text-gray-600">
              <li>In-degree (receive animals from most sources)</li>
              <li>Out-degree (distribute to most destinations)</li>
              <li>Total throughput (animals in + animals out)</li>
            </ul>
          </li>
          <li>Create a geographic flow map showing auction connections</li>
          <li><strong>Recommendation:</strong> Select the <strong>top 3 auctions</strong> you would prioritize for active disease surveillance and explain why</li>
        </ol>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
          <p className="text-sm text-amber-800">
            <strong>Hint:</strong> Use <code className="bg-white px-1 rounded">filter(origin_establishment_type == "Auction Point" | destination_establishment_type == "Auction Point")</code> to get auction-related movements.
          </p>
        </div>
      </Exercise>

      {/* Exercise Answers Section */}
      <section className="bg-green-50 p-6 rounded-lg border border-green-200 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">ANSWERS</span>
          Auction Network Analysis Solutions
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
library(igraph)
library(ggraph)
library(sf)
library(leaflet)

sf_use_s2(FALSE)

# ============================================
# 1. Filter for auction-related movements
# ============================================
movements <- read_csv("data/movements_2023_clean.csv")
constituencies <- st_read("data/nam_constituency_4326.geojson")
vcf <- st_read("data/vcf_4326.geojson")

auction_movements <- movements %>%
  filter(
    origin_establishment_type == "Auction Point" |
    destination_establishment_type == "Auction Point"
  )

cat("Total movements:", nrow(movements), "\\n")
cat("Auction-related movements:", nrow(auction_movements), "\\n")
cat("Percentage:", round(100 * nrow(auction_movements) / nrow(movements), 1), "%\\n")

# ============================================
# 2. Build constituency-level auction network
# ============================================
nca_gids <- constituencies %>%
  st_drop_geometry() %>%
  filter(nca == TRUE) %>%
  pull(gid)

auction_const_edges <- auction_movements %>%
  filter(!is.na(origin_constituency) & !is.na(destination_constituency)) %>%
  filter(origin_gid %in% nca_gids & destination_gid %in% nca_gids) %>%
  group_by(
    from = origin_constituency,
    to = destination_constituency,
    from_gid = origin_gid,
    to_gid = destination_gid
  ) %>%
  summarise(
    movements = n(),
    total_animals = sum(weight, na.rm = TRUE)
  ) %>%
  filter(from != to)

g_auction <- graph_from_data_frame(auction_const_edges, directed = TRUE)

cat("\\nAuction network summary:\\n")
cat("Constituencies involved:", vcount(g_auction), "\\n")
cat("Connections:", ecount(g_auction), "\\n")

# ============================================
# 3. Calculate centrality measures
# ============================================
auction_centrality <- data.frame(
  constituency = V(g_auction)$name,
  in_degree = degree(g_auction, mode = "in"),
  out_degree = degree(g_auction, mode = "out"),
  betweenness = round(betweenness(g_auction, directed = TRUE), 1),
  animals_in = strength(g_auction, mode = "in", weights = E(g_auction)$total_animals),
  animals_out = strength(g_auction, mode = "out", weights = E(g_auction)$total_animals)
) %>%
  mutate(total_degree = in_degree + out_degree) %>%
  arrange(desc(betweenness))

cat("\\nTop 10 constituencies by betweenness (auction network):\\n")
print(head(auction_centrality, 10))

# ============================================
# 4. Analyze individual auction points
# ============================================

# Auctions as DESTINATIONS (animals flowing IN)
auction_inflow <- auction_movements %>%
  filter(destination_establishment_type == "Auction Point") %>%
  group_by(auction = destination_establishment) %>%
  summarise(
    sources = n_distinct(origin_establishment),
    movements_in = n(),
    animals_in = sum(weight, na.rm = TRUE)
  ) %>%
  arrange(desc(sources))

cat("\\nTop auctions by IN-DEGREE (receiving from most sources):\\n")
print(head(auction_inflow, 10))

# Auctions as ORIGINS (animals flowing OUT)
auction_outflow <- auction_movements %>%
  filter(origin_establishment_type == "Auction Point") %>%
  group_by(auction = origin_establishment) %>%
  summarise(
    destinations = n_distinct(destination_establishment),
    movements_out = n(),
    animals_out = sum(weight, na.rm = TRUE)
  ) %>%
  arrange(desc(destinations))

cat("\\nTop auctions by OUT-DEGREE (distributing to most destinations):\\n")
print(head(auction_outflow, 10))

# ============================================
# 5. Geographic flow map of auction network
# ============================================
constituencies_nca <- constituencies %>% filter(nca == TRUE)

centroids <- constituencies_nca %>%
  st_centroid() %>%
  mutate(lon = st_coordinates(.)[,1], lat = st_coordinates(.)[,2]) %>%
  st_drop_geometry() %>%
  select(gid, const, lon, lat)

auction_flows <- auction_const_edges %>%
  arrange(desc(total_animals)) %>%
  head(100) %>%
  left_join(centroids, by = c("from_gid" = "gid")) %>%
  rename(x_from = lon, y_from = lat) %>%
  left_join(centroids, by = c("to_gid" = "gid")) %>%
  rename(x_to = lon, y_to = lat)

centroids_data <- centroids %>%
  left_join(auction_centrality, by = c("const" = "constituency"))

ggplot() +
  geom_sf(data = constituencies_nca, fill = "grey95", color = "grey70") +
  geom_sf(data = vcf, color = "red", linewidth = 1.5, linetype = "dashed") +
  geom_segment(
    data = auction_flows,
    aes(x = x_from, y = y_from, xend = x_to, yend = y_to,
        alpha = total_animals, linewidth = movements),
    color = "#FFD100",
    arrow = arrow(length = unit(2, "mm"), type = "closed")
  ) +
  geom_point(
    data = centroids_data %>% filter(!is.na(betweenness)),
    aes(x = lon, y = lat, size = betweenness),
    color = "#C8102E", alpha = 0.7
  ) +
  scale_linewidth_continuous(range = c(0.5, 3)) +
  scale_alpha_continuous(range = c(0.3, 0.9)) +
  scale_size_continuous(range = c(2, 10)) +
  labs(
    title = "Auction-Related Movement Network (NCA 2023)",
    subtitle = "Top 100 auction movement pathways",
    caption = "Node size = betweenness, Yellow lines = auction movements"
  ) +
  theme_minimal()

# ============================================
# 6. RECOMMENDATION: Top 3 Auctions for Surveillance
# ============================================
cat("\\n========================================\\n")
cat("RECOMMENDED AUCTIONS FOR SURVEILLANCE\\n")
cat("========================================\\n\\n")

# Combine inflow and outflow for risk assessment
auction_risk <- auction_inflow %>%
  full_join(auction_outflow, by = "auction") %>%
  replace_na(list(sources = 0, animals_in = 0, destinations = 0, animals_out = 0)) %>%
  mutate(total_animals = animals_in + animals_out) %>%
  arrange(desc(total_animals))

cat("Top 3 Priority Auctions:\\n\\n")

for(i in 1:min(3, nrow(auction_risk))) {
  auction <- auction_risk[i,]
  cat(i, ". ", auction$auction, "\\n", sep = "")
  cat("   - Sources (in-degree): ", auction$sources, "\\n", sep = "")
  cat("   - Destinations (out-degree): ", auction$destinations, "\\n", sep = "")
  cat("   - Animals IN: ", format(auction$animals_in, big.mark = ","), "\\n", sep = "")
  cat("   - Animals OUT: ", format(auction$animals_out, big.mark = ","), "\\n", sep = "")
  cat("\\n")
}

cat("\\nSURVEILLANCE RECOMMENDATIONS:\\n")
cat("- Permanent veterinary presence at these locations\\n")
cat("- Pre-movement testing for animals entering\\n")
cat("- Holding period before animals can be sold\\n")
cat("- Enhanced buyer/seller record-keeping\\n")
cat("- Use as sentinel surveillance sites\\n")`}
              language="r"
              title="Complete Exercise Answers"
            />
          </div>
        </details>
      </section>

      {/* Bonus: Temporal Tracing */}
      <section className="bg-purple-50 p-6 rounded-lg border border-purple-200 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm">BONUS</span>
          Temporal Disease Tracing
        </h2>

        <p className="text-gray-700 mb-4">
          During an outbreak investigation, you need to trace movements <strong>through time</strong> to identify
          potentially exposed establishments. This involves two directions:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border-2 border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-2">Trace Forward (Spread Risk)</h3>
            <p className="text-sm text-gray-600">
              From an infected establishment, where could disease have spread TO?
              Follow movements <strong>after</strong> the infection date.
            </p>
            <p className="text-xs text-red-600 mt-2 font-mono">
              Infected Farm → Market (Day 3) → Farm B (Day 7) → Farm C (Day 12)...
            </p>
          </div>
          <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-800 mb-2">Trace Back (Source Finding)</h3>
            <p className="text-sm text-gray-600">
              Where did the infection come FROM? Follow movements <strong>before</strong>
              the detection date back to potential sources.
            </p>
            <p className="text-xs text-blue-600 mt-2 font-mono">
              ...Farm X (Day -14) → Market (Day -10) → Infected Farm (Day -5)
            </p>
          </div>
        </div>

        <details className="bg-white rounded-lg border border-purple-300 mb-4">
          <summary className="px-4 py-3 cursor-pointer text-purple-700 hover:text-purple-900 font-semibold">
            Trace Forward Code (where could disease spread TO?)
          </summary>
          <div className="px-4 pb-4">
            <CodeBlock
              code={`# ============================================================
# TRACE FORWARD: Where could disease spread TO?
# ============================================================
# Choose an infected establishment and date, then trace forward
# to see where disease could have spread through movements.
# ============================================================

library(tidyverse)
library(readxl)

# Load movement data with dates
movements <- read_excel("data/animal_movement_2023_rev3.xlsx") %>%
  filter(!is.na(date)) %>%
  arrange(date) %>%
  mutate(
    movement_id = row_number(),
    date = as.Date(date)
  )

# ============================================================
# FIND GOOD CANDIDATE ESTABLISHMENTS
# ============================================================
candidates <- movements %>%
  group_by(origin_establishment) %>%
  summarise(out_moves = n()) %>%
  rename(establishment = origin_establishment) %>%
  full_join(
    movements %>%
      group_by(destination_establishment) %>%
      summarise(in_moves = n()) %>%
      rename(establishment = destination_establishment),
    by = "establishment"
  ) %>%
  replace_na(list(out_moves = 0, in_moves = 0)) %>%
  mutate(
    total_moves = out_moves + in_moves,
    chain_potential = pmin(in_moves, out_moves)
  ) %>%
  arrange(desc(chain_potential))

cat("Top 20 establishments for tracing (need both IN and OUT moves):\\n")
print(candidates %>% slice_head(n = 20))

# ============================================================
# CHOOSE YOUR STARTING POINT
# ============================================================
start_establishment <- candidates$establishment[1]  # Or set manually
start_date <- as.Date("2023-01-01")  # Infection/detection date
max_gap_days <- 21  # Max days between movements (FMD incubation)

# ============================================================
# TRACE FORWARD FUNCTION
# ============================================================
trace_forward <- function(movements_df, start_estab, start_dt, max_gap = 21) {

  initial_moves <- movements_df %>%
    filter(origin_establishment == start_estab, date >= start_dt)

  if (nrow(initial_moves) == 0) {
    cat("No outgoing movements from", start_estab, "after", as.character(start_dt), "\\n")
    return(NULL)
  }

  cat("Found", nrow(initial_moves), "initial movements from", start_estab, "\\n")

  all_pathways <- list()

  for (i in 1:nrow(initial_moves)) {
    start_mov <- initial_moves[i, ]

    pathway <- tibble(
      step = 1,
      date = start_mov$date,
      origin = start_mov$origin_establishment,
      destination = start_mov$destination_establishment
    )

    current_establishment <- start_mov$destination_establishment
    current_date <- start_mov$date

    while (TRUE) {
      next_move <- movements_df %>%
        filter(
          origin_establishment == current_establishment,
          date > current_date,
          date <= current_date + max_gap
        ) %>%
        arrange(date) %>%
        slice(1)

      if (nrow(next_move) == 0) break

      pathway <- pathway %>%
        bind_rows(tibble(
          step = max(pathway$step) + 1,
          date = next_move$date,
          origin = next_move$origin_establishment,
          destination = next_move$destination_establishment
        ))

      current_establishment <- next_move$destination_establishment
      current_date <- next_move$date
    }

    pathway$pathway_id <- i
    pathway$pathway_length <- nrow(pathway)
    pathway$total_days <- as.numeric(max(pathway$date) - min(pathway$date))
    all_pathways[[i]] <- pathway
  }

  bind_rows(all_pathways)
}

# ============================================================
# RUN TRACE FORWARD
# ============================================================
cat("\\nTracing FORWARD from", start_establishment, "starting", as.character(start_date), "\\n")
forward_paths <- trace_forward(movements, start_establishment, start_date, max_gap_days)

if (!is.null(forward_paths)) {
  # Summarize pathways
  forward_summary <- forward_paths %>%
    filter(pathway_length >= 2) %>%
    group_by(pathway_id) %>%
    summarise(
      steps = first(pathway_length),
      days = first(total_days),
      route = paste(c(origin, last(destination)), collapse = " → ")
    ) %>%
    arrange(desc(steps))

  cat("\\nFound", nrow(forward_summary), "forward pathways\\n")
  cat("Longest pathway:", max(forward_summary$steps), "steps\\n\\n")

  cat("Top 10 forward pathways:\\n")
  print(forward_summary %>% slice_head(n = 10))

  # All potentially exposed establishments
  exposed <- unique(c(forward_paths$origin, forward_paths$destination))
  cat("\\n", length(exposed), "establishments potentially exposed\\n")
}

# ============================================================
# PRINT FINAL RESULTS
# ============================================================
cat("\\n")
cat("========================================\\n")
cat("TRACE FORWARD RESULTS\\n")
cat("========================================\\n")
cat("Starting from:", start_establishment, "\\n")
cat("Start date:", as.character(start_date), "\\n")
cat("Max gap between movements:", max_gap_days, "days\\n")
cat("\\n")

if (nrow(forward_summary) > 0) {
  cat("PATHWAYS FOUND:", nrow(forward_summary), "\\n\\n")

  for (i in 1:min(10, nrow(forward_summary))) {
    p <- forward_summary[i, ]
    cat("Pathway", i, ":\\n")
    cat("  Route:", p$route, "\\n")
    cat("  Steps:", p$steps, "| Days:", p$days, "\\n\\n")
  }

  cat("POTENTIALLY EXPOSED ESTABLISHMENTS:\\n")
  cat(paste("-", exposed), sep = "\\n")
} else {
  cat("No pathways found. Try a different start establishment or increase max_gap_days.\\n")
}

# Export
write_csv(forward_summary, "output/trace_forward_pathways.csv")
cat("\\nResults saved to: output/trace_forward_pathways.csv\\n")`}
              language="r"
              title="Trace Forward - Disease Spread Risk"
            />
          </div>
        </details>

        <details className="bg-white rounded-lg border border-purple-300">
          <summary className="px-4 py-3 cursor-pointer text-purple-700 hover:text-purple-900 font-semibold">
            Trace Back Code (where did disease come FROM?)
          </summary>
          <div className="px-4 pb-4">
            <CodeBlock
              code={`# ============================================================
# TRACE BACK: Where did disease come FROM?
# ============================================================
# Choose an infected establishment and detection date, then trace
# BACKWARDS to find potential sources of infection.
# ============================================================

library(tidyverse)
library(readxl)

# Load movement data
movements <- read_excel("data/animal_movement_2023_rev3.xlsx") %>%
  filter(!is.na(date)) %>%
  arrange(date) %>%
  mutate(
    movement_id = row_number(),
    date = as.Date(date)
  )

# ============================================================
# FIND GOOD CANDIDATES FOR TRACE BACK
# ============================================================
# Look for establishments that RECEIVED animals (have incoming movements)
# and also sent animals onwards (for deeper traces)

traceback_candidates <- movements %>%
  group_by(destination_establishment) %>%
  summarise(
    in_moves = n(),
    last_incoming = max(date)
  ) %>%
  rename(establishment = destination_establishment) %>%
  left_join(
    movements %>%
      group_by(origin_establishment) %>%
      summarise(out_moves = n()) %>%
      rename(establishment = origin_establishment),
    by = "establishment"
  ) %>%
  replace_na(list(out_moves = 0)) %>%
  # Good candidates have incoming movements AND their sources also have incoming
  arrange(desc(in_moves))

cat("Top establishments for trace-back testing (most incoming movements):\\n")
print(traceback_candidates %>% slice_head(n = 20))

# ============================================================
# CHOOSE YOUR INFECTED ESTABLISHMENT
# ============================================================
# Pick one with recent incoming movements
infected_establishment <- traceback_candidates$establishment[1]  # Or set manually
detection_date <- traceback_candidates$last_incoming[1] + 7  # A week after last incoming
max_lookback_days <- 30  # How far back to trace (increase if needed)

cat("\\nSelected:", infected_establishment, "\\n")
cat("Detection date:", as.character(detection_date), "\\n")
cat("Looking back", max_lookback_days, "days\\n")

# ============================================================
# TRACE BACK FUNCTION
# ============================================================
trace_back <- function(movements_df, infected_estab, detect_dt, max_lookback = 21) {

  # Find movements INTO the infected establishment BEFORE detection
  incoming_moves <- movements_df %>%
    filter(
      destination_establishment == infected_estab,
      date >= detect_dt - max_lookback,
      date <= detect_dt
    )

  if (nrow(incoming_moves) == 0) {
    cat("No incoming movements to", infected_estab, "in the", max_lookback, "days before detection\\n")
    return(NULL)
  }

  cat("Found", nrow(incoming_moves), "incoming movements to", infected_estab, "before detection\\n")

  all_pathways <- list()

  # For each incoming movement, trace back further
  for (i in 1:nrow(incoming_moves)) {
    incoming <- incoming_moves[i, ]

    pathway <- tibble(
      step = 1,
      date = incoming$date,
      origin = incoming$origin_establishment,
      destination = incoming$destination_establishment
    )

    current_establishment <- incoming$origin_establishment
    current_date <- incoming$date

    # Trace BACKWARDS in time
    while (TRUE) {
      prev_move <- movements_df %>%
        filter(
          destination_establishment == current_establishment,
          date < current_date,
          date >= current_date - max_lookback
        ) %>%
        arrange(desc(date)) %>%  # Most recent first (closest in time)
        slice(1)

      if (nrow(prev_move) == 0) break

      pathway <- pathway %>%
        bind_rows(tibble(
          step = max(pathway$step) + 1,
          date = prev_move$date,
          origin = prev_move$origin_establishment,
          destination = prev_move$destination_establishment
        ))

      current_establishment <- prev_move$origin_establishment
      current_date <- prev_move$date
    }

    pathway$pathway_id <- i
    pathway$pathway_length <- nrow(pathway)
    pathway$total_days <- as.numeric(max(pathway$date) - min(pathway$date))
    all_pathways[[i]] <- pathway
  }

  bind_rows(all_pathways)
}

# ============================================================
# RUN TRACE BACK
# ============================================================
cat("\\nTracing BACK from", infected_establishment, "detected", as.character(detection_date), "\\n")
back_paths <- trace_back(movements, infected_establishment, detection_date, max_lookback_days)

if (!is.null(back_paths)) {
  # Summarize - include final step to infected establishment
  back_summary <- back_paths %>%
    group_by(pathway_id) %>%
    arrange(pathway_id, date) %>%  # Chronological order
    summarise(
      steps = first(pathway_length),
      days = first(total_days),
      earliest_date = min(date),
      potential_source = first(origin),  # Earliest in chain = potential source
      # Include the infected establishment as final destination
      route = paste(c(origin, infected_establishment), collapse = " → ")
    ) %>%
    arrange(desc(steps))
}

# ============================================================
# PRINT FINAL RESULTS
# ============================================================
cat("\\n")
cat("========================================\\n")
cat("TRACE BACK RESULTS\\n")
cat("========================================\\n")
cat("Infected establishment:", infected_establishment, "\\n")
cat("Detection date:", as.character(detection_date), "\\n")
cat("Looking back:", max_lookback_days, "days\\n")
cat("\\n")

if (!is.null(back_paths) && nrow(back_summary) > 0) {
  cat("PATHWAYS FOUND:", nrow(back_summary), "\\n\\n")

  for (i in 1:min(10, nrow(back_summary))) {
    p <- back_summary[i, ]
    cat("Pathway", i, ":\\n")
    cat("  Route:", p$route, "\\n")
    cat("  Potential source:", p$potential_source, "\\n")
    cat("  Steps:", p$steps, "| Days:", p$days, "\\n\\n")
  }

  # Unique potential sources
  sources <- unique(back_summary$potential_source)
  cat("POTENTIAL SOURCE ESTABLISHMENTS TO INVESTIGATE:\\n")
  cat(paste("-", sources), sep = "\\n")

  # Priority ranking
  source_priority <- back_summary %>%
    group_by(potential_source) %>%
    summarise(pathways_to_here = n()) %>%
    arrange(desc(pathways_to_here))

  cat("\\n\\nPRIORITY RANKING (by number of pathways):\\n")
  for (i in 1:nrow(source_priority)) {
    s <- source_priority[i, ]
    cat(i, ". ", s$potential_source, " (", s$pathways_to_here, " pathways)\\n", sep = "")
  }
} else {
  cat("No pathways found.\\n")
  cat("Try: increase max_lookback_days or choose an establishment with more incoming movements.\\n")
}

# Export
write_csv(back_summary, "output/trace_back_pathways.csv")
cat("\\nResults saved to: output/trace_back_pathways.csv\\n")`}
              language="r"
              title="Trace Back - Source Finding"
            />
          </div>
        </details>

        <Callout type="warning" title="Outbreak Investigation">
          <p>
            During a real outbreak, you would run <strong>both traces</strong>:
          </p>
          <ul className="list-disc list-inside mt-2 text-sm">
            <li><strong>Trace back</strong> to find the source and other potentially infected premises</li>
            <li><strong>Trace forward</strong> to find premises that may have been exposed and need surveillance</li>
          </ul>
          <p className="mt-2 text-sm">
            The <code>max_gap_days</code> parameter should match the disease's incubation + infectious period
            (e.g., 14-21 days for FMD).
          </p>
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Workshop Summary</h2>
        <div className="bg-woah-orange/5 border border-woah-orange/20 rounded-lg p-6">
          <h3 className="font-bold text-woah-orange mb-3">What You've Learned</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-800">Day 1: R Fundamentals</p>
              <ul className="text-gray-600 mt-1">
                <li>R/RStudio basics</li>
                <li>Data import & cleaning</li>
                <li>Data wrangling (dplyr)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Day 2: Visualization</p>
              <ul className="text-gray-600 mt-1">
                <li>ggplot2 graphics</li>
                <li>RMarkdown reports</li>
                <li>Movement data analysis</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Day 3: Networks</p>
              <ul className="text-gray-600 mt-1">
                <li>Network fundamentals</li>
                <li>Centrality measures</li>
                <li>Risk-based surveillance</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Day 4: GIS & EpiCollect5</p>
              <ul className="text-gray-600 mt-1">
                <li>QGIS flow maps</li>
                <li>EpiCollect5 forms</li>
                <li>Mobile data collection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link to="/r-viz/session1" className="text-orange-500 hover:underline">
          ← Previous: Data Visualization
        </Link>
        <Link
          to="/analysis/session2"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Next: Day 4 - QGIS Visualization →
        </Link>
      </div>
    </div>
  )
}