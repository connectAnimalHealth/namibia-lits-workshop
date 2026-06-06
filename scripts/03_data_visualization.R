# =============================================================================
# Namibia LITS Workshop - Script 3: Data Wrangling and Visualization
# =============================================================================
# This script demonstrates data wrangling with dplyr and visualization with ggplot2

# Load packages
library(tidyverse)
library(readxl)
library(lubridate)
library(sf)
library(viridis)

# =============================================================================
# PART 1: Load and explore data
# =============================================================================

# Load cleaned movement data
movements <- read_excel("data/animal_movement_2023_rev3.xlsx")

cat("=== NCA 2023 MOVEMENT DATA ===\n")
cat("Total movements:", nrow(movements), "\n")
cat("Total animals:", sum(movements$weight), "\n")
cat("Date range:", as.character(min(movements$date)), "to", as.character(max(movements$date)), "\n\n")

glimpse(movements)

# =============================================================================
# PART 2: Data wrangling with dplyr
# =============================================================================

# Add useful columns
movements <- movements %>%
  mutate(
    month = month(date, label = TRUE),
    year = year(date),
    movement_type = paste(origin_establishment_type, "->", destination_establishment_type)
  )

# Summary by region
regional_summary <- movements %>%
  group_by(origin_region, destination_region) %>%
  summarize(
    movements = n(),
    total_animals = sum(weight),
    avg_batch_size = mean(weight),
    .groups = "drop"
  ) %>%
  arrange(desc(total_animals))

cat("\n=== REGIONAL MOVEMENT SUMMARY ===\n")
print(regional_summary)

# Summary by establishment type
type_summary <- movements %>%
  group_by(movement_type) %>%
  summarize(
    movements = n(),
    total_animals = sum(weight),
    .groups = "drop"
  ) %>%
  arrange(desc(movements))

cat("\n=== MOVEMENT TYPE SUMMARY ===\n")
print(type_summary)

# =============================================================================
# PART 3: Basic visualizations
# =============================================================================

# Bar chart: Movements by origin region
p1 <- ggplot(movements, aes(x = reorder(origin_region, origin_region, length))) +
  geom_bar(fill = "#003580") +
  coord_flip() +
  labs(
    title = "Livestock Movements by Origin Region (NCA 2023)",
    x = "Region",
    y = "Number of Movements"
  ) +
  theme_minimal()

print(p1)
ggsave("outputs/movements_by_region.png", p1, width = 10, height = 6)

# Bar chart: Movements by establishment type
p2 <- ggplot(movements, aes(x = origin_establishment_type, fill = destination_establishment_type)) +
  geom_bar(position = "dodge") +
  labs(
    title = "Movements by Establishment Type",
    x = "Origin Type",
    y = "Count",
    fill = "Destination Type"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
  scale_fill_viridis_d()

print(p2)
ggsave("outputs/movements_by_type.png", p2, width = 10, height = 6)

# =============================================================================
# PART 4: Time series analysis
# =============================================================================

# Monthly movements
monthly_moves <- movements %>%
  mutate(month_year = floor_date(date, "month")) %>%
  group_by(month_year) %>%
  summarize(
    movements = n(),
    total_animals = sum(weight),
    .groups = "drop"
  )

p3 <- ggplot(monthly_moves, aes(x = month_year, y = movements)) +
  geom_line(color = "#003580", linewidth = 1) +
  geom_point(color = "#C8102E", size = 2) +
  labs(
    title = "Monthly Movement Trends (NCA 2023)",
    x = "Date",
    y = "Number of Movements"
  ) +
  theme_minimal()

print(p3)
ggsave("outputs/monthly_trends.png", p3, width = 12, height = 6)

# By animal type
monthly_by_type <- movements %>%
  mutate(month_year = floor_date(date, "month")) %>%
  group_by(month_year, animal_type) %>%
  summarize(total = sum(weight), .groups = "drop")

p4 <- ggplot(monthly_by_type, aes(x = month_year, y = total, color = animal_type)) +
  geom_line(linewidth = 1) +
  labs(
    title = "Monthly Animals Moved by Type",
    x = "Date",
    y = "Number of Animals",
    color = "Animal Type"
  ) +
  theme_minimal() +
  scale_color_viridis_d()

print(p4)
ggsave("outputs/monthly_by_animal_type.png", p4, width = 12, height = 6)

# =============================================================================
# PART 5: Mapping with shapefiles
# =============================================================================

# Load shapefiles
constituencies <- st_read("data/shapefile/nca_const.shp")
regions <- st_read("data/shapefile/nam_adm_region.shp")
vcf <- st_read("data/shapefile/VCF_2018.shp")

# Summarize movements by constituency
const_summary <- movements %>%
  group_by(origin_constituency) %>%
  summarize(
    outgoing_movements = n(),
    animals_out = sum(weight),
    .groups = "drop"
  )

# Join to spatial data
constituencies_data <- constituencies %>%
  left_join(const_summary, by = c("NAME" = "origin_constituency"))

# Choropleth map
p5 <- ggplot() +
  geom_sf(data = constituencies_data, aes(fill = outgoing_movements)) +
  geom_sf(data = vcf, color = "red", linewidth = 1.5) +
  scale_fill_viridis_c(option = "plasma", na.value = "grey90") +
  labs(
    title = "Outgoing Livestock Movements by Constituency (NCA 2023)",
    fill = "Movements",
    caption = "Red line = Veterinary Cordon Fence"
  ) +
  theme_minimal()

print(p5)
ggsave("outputs/constituency_movements_map.png", p5, width = 12, height = 10)

cat("\n=== VISUALIZATIONS SAVED TO outputs/ FOLDER ===\n")

# Create outputs directory if it doesn't exist
dir.create("outputs", showWarnings = FALSE)
