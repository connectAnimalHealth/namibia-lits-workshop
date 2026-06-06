# =============================================================================
# Namibia LITS Workshop - Script 4: Network Analysis
# =============================================================================
# This script performs Social Network Analysis (SNA) on livestock movement data

# Load packages
library(tidyverse)
library(readxl)
library(igraph)
library(ggraph)
library(sf)
library(viridis)

# Create outputs directory
dir.create("outputs", showWarnings = FALSE)

# =============================================================================
# PART 1: Load and prepare data
# =============================================================================

movements <- read_excel("data/animal_movement_2023_rev3.xlsx")

cat("=== NCA 2023 MOVEMENT DATA ===\n")
cat("Total movements:", nrow(movements), "\n")
cat("Total animals:", sum(movements$weight), "\n\n")

# =============================================================================
# PART 2: Create constituency-level network
# =============================================================================

# Aggregate movements by constituency
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

# Create network graph
g_const <- graph_from_data_frame(const_edges, directed = TRUE)

cat("=== CONSTITUENCY NETWORK ===\n")
cat("Nodes (constituencies):", vcount(g_const), "\n")
cat("Edges (connections):", ecount(g_const), "\n")
cat("Density:", edge_density(g_const), "\n\n")

# =============================================================================
# PART 3: Calculate centrality measures
# =============================================================================

# In-degree: How many constituencies send animals TO this constituency?
in_degree <- degree(g_const, mode = "in")

# Out-degree: How many constituencies does this send animals TO?
out_degree <- degree(g_const, mode = "out")

# Betweenness: How often is this constituency on shortest paths?
betweenness_scores <- betweenness(g_const, directed = TRUE)

# Weighted versions (accounting for animal numbers)
strength_in <- strength(g_const, mode = "in", weights = E(g_const)$total_animals)
strength_out <- strength(g_const, mode = "out", weights = E(g_const)$total_animals)

# Create summary dataframe
const_centrality <- data.frame(
  constituency = V(g_const)$name,
  in_degree = in_degree,
  out_degree = out_degree,
  total_degree = in_degree + out_degree,
  betweenness = betweenness_scores,
  animals_in = strength_in,
  animals_out = strength_out,
  net_flow = strength_in - strength_out  # Positive = net importer
) %>%
  arrange(desc(betweenness))

cat("=== TOP 10 CONSTITUENCIES BY BETWEENNESS ===\n")
print(head(const_centrality, 10))

cat("\n=== NET IMPORTERS (receive more than send) ===\n")
print(head(const_centrality %>% arrange(desc(net_flow)), 5))

cat("\n=== NET EXPORTERS (send more than receive) ===\n")
print(head(const_centrality %>% arrange(net_flow), 5))

# Save centrality results
write_csv(const_centrality, "outputs/constituency_centrality.csv")

# =============================================================================
# PART 4: Establishment-level network
# =============================================================================

est_edges <- movements %>%
  filter(!is.na(origin_establishment) & !is.na(destination_establishment)) %>%
  group_by(
    from = origin_establishment,
    to = destination_establishment
  ) %>%
  summarize(
    movements = n(),
    total_animals = sum(weight),
    .groups = "drop"
  ) %>%
  filter(from != to)

g_est <- graph_from_data_frame(est_edges, directed = TRUE)

cat("\n=== ESTABLISHMENT NETWORK ===\n")
cat("Nodes (establishments):", vcount(g_est), "\n")
cat("Edges (connections):", ecount(g_est), "\n")

# Top establishments by betweenness
est_centrality <- data.frame(
  establishment = V(g_est)$name,
  in_degree = degree(g_est, mode = "in"),
  out_degree = degree(g_est, mode = "out"),
  betweenness = betweenness(g_est, directed = TRUE)
) %>%
  arrange(desc(betweenness))

cat("\n=== TOP 10 ESTABLISHMENTS BY BETWEENNESS ===\n")
print(head(est_centrality, 10))

write_csv(est_centrality, "outputs/establishment_centrality.csv")

# =============================================================================
# PART 5: Movement patterns by establishment type
# =============================================================================

movement_patterns <- movements %>%
  group_by(origin_establishment_type, destination_establishment_type) %>%
  summarize(
    movements = n(),
    total_animals = sum(weight),
    .groups = "drop"
  ) %>%
  arrange(desc(movements))

cat("\n=== MOVEMENT PATTERNS BY ESTABLISHMENT TYPE ===\n")
print(movement_patterns)

write_csv(movement_patterns, "outputs/movement_patterns.csv")

# =============================================================================
# PART 6: Network visualization
# =============================================================================

# Simple network plot
p1 <- ggraph(g_const, layout = "fr") +
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

print(p1)
ggsave("outputs/network_constituency.png", p1, width = 14, height = 12)

# =============================================================================
# PART 7: Geographic network map
# =============================================================================

# Load shapefiles
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
  rename(x_to = lon, y_to = lat) %>%
  filter(!is.na(x_from) & !is.na(x_to))

# Geographic flow map
p2 <- ggplot() +
  geom_sf(data = constituencies, fill = "grey95", color = "grey70") +
  geom_sf(data = vcf, color = "red", linewidth = 1.5, linetype = "dashed") +
  geom_segment(data = top_flows,
               aes(x = x_from, y = y_from, xend = x_to, yend = y_to,
                   alpha = total_animals, linewidth = movements),
               color = "#003580",
               arrow = arrow(length = unit(2, "mm"), type = "closed")) +
  geom_point(data = centroids_data %>% filter(!is.na(betweenness)),
             aes(x = lon, y = lat, size = betweenness),
             color = "#C8102E", alpha = 0.7) +
  scale_size_continuous(range = c(1, 8)) +
  scale_alpha_continuous(range = c(0.3, 0.9)) +
  scale_linewidth_continuous(range = c(0.3, 2)) +
  labs(title = "Livestock Movement Flows (NCA 2023)",
       subtitle = "Top 50 movement pathways by animal count",
       caption = "Node size = betweenness centrality, Red dashed = VCF") +
  theme_minimal()

print(p2)
ggsave("outputs/geographic_network_map.png", p2, width = 14, height = 12)

# =============================================================================
# PART 8: Summary statistics
# =============================================================================

cat("\n\n=== NETWORK ANALYSIS SUMMARY ===\n")
cat("Files saved to outputs/ folder:\n")
cat("  - constituency_centrality.csv\n")
cat("  - establishment_centrality.csv\n")
cat("  - movement_patterns.csv\n")
cat("  - network_constituency.png\n")
cat("  - geographic_network_map.png\n")
cat("\nKey findings:\n")
cat("  - Most central constituency (betweenness):", const_centrality$constituency[1], "\n")
cat("  - Most central establishment:", est_centrality$establishment[1], "\n")
cat("  - Most common movement pattern:",
    paste(movement_patterns$origin_establishment_type[1], "->",
          movement_patterns$destination_establishment_type[1]), "\n")
