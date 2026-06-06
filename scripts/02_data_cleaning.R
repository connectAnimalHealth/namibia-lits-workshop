# =============================================================================
# Namibia LITS Workshop - Script 2: Data Import and Cleaning
# =============================================================================
# This script demonstrates data cleaning techniques using NCA 2023 movement data

# Load packages
library(tidyverse)
library(readxl)
library(lubridate)

# Set working directory to workshop folder (adjust path as needed)
# setwd("/path/to/namibia-lits-workshop")

# =============================================================================
# PART 1: Explore the messy data
# =============================================================================

# Load the original "messy" data
messy_data <- read_excel("data/data2023.xlsx")

# First look at the data
cat("=== MESSY DATA OVERVIEW ===\n")
cat("Dimensions:", nrow(messy_data), "rows,", ncol(messy_data), "columns\n")
cat("Column names:", paste(names(messy_data), collapse = ", "), "\n\n")

glimpse(messy_data)

# =============================================================================
# PART 2: Identify data quality issues
# =============================================================================

cat("\n=== DATA QUALITY ISSUES ===\n\n")

# Check for missing values
cat("Missing values by column:\n")
print(colSums(is.na(messy_data)))

# Check unique values in key columns - look for inconsistencies
cat("\n\nUnique regions:\n")
print(sort(unique(messy_data$origin_region)))

cat("\n\nUnique establishment types:\n")
print(sort(unique(messy_data$origin_establishment_type)))

cat("\n\nUnique animal types:\n")
print(sort(unique(messy_data$animal_type)))

# =============================================================================
# PART 3: Clean the data step by step
# =============================================================================

clean_data <- messy_data

# Step 1: Standardize column names (lowercase, underscores)
clean_data <- clean_data %>%
  rename_with(tolower) %>%
  rename_with(~str_replace_all(., " ", "_"))

# Step 2: Standardize text fields (trim whitespace, consistent case)
clean_data <- clean_data %>%
  mutate(
    across(where(is.character), ~str_trim(.)),
    origin_region = str_to_title(origin_region),
    destination_region = str_to_title(destination_region),
    origin_constituency = str_to_title(origin_constituency),
    destination_constituency = str_to_title(destination_constituency),
    animal_type = str_to_title(animal_type),
    origin_establishment_type = str_to_title(origin_establishment_type),
    destination_establishment_type = str_to_title(destination_establishment_type)
  )

# Step 3: Standardize establishment types
clean_data <- clean_data %>%
  mutate(
    origin_establishment_type = case_when(
      str_detect(origin_establishment_type, regex("auction", ignore_case = TRUE)) ~ "Auction",
      str_detect(origin_establishment_type, regex("hold", ignore_case = TRUE)) ~ "Holding",
      str_detect(origin_establishment_type, regex("farm", ignore_case = TRUE)) ~ "Farm",
      str_detect(origin_establishment_type, regex("abattoir|slaughter", ignore_case = TRUE)) ~ "Abattoir",
      TRUE ~ origin_establishment_type
    ),
    destination_establishment_type = case_when(
      str_detect(destination_establishment_type, regex("auction", ignore_case = TRUE)) ~ "Auction",
      str_detect(destination_establishment_type, regex("hold", ignore_case = TRUE)) ~ "Holding",
      str_detect(destination_establishment_type, regex("farm", ignore_case = TRUE)) ~ "Farm",
      str_detect(destination_establishment_type, regex("abattoir|slaughter", ignore_case = TRUE)) ~ "Abattoir",
      TRUE ~ destination_establishment_type
    )
  )

# Step 4: Handle dates
clean_data <- clean_data %>%
  mutate(
    date = as.Date(date),
    year = year(date),
    month = month(date, label = TRUE)
  )

# Step 5: Handle numeric fields and remove invalid records
clean_data <- clean_data %>%
  mutate(weight = as.numeric(weight)) %>%
  filter(!is.na(weight), weight > 0)

# =============================================================================
# PART 4: Validate cleaning results
# =============================================================================

cat("\n=== CLEANING VALIDATION ===\n\n")

cat("Original rows:", nrow(messy_data), "\n")
cat("Cleaned rows:", nrow(clean_data), "\n")
cat("Removed:", nrow(messy_data) - nrow(clean_data), "\n\n")

cat("Unique regions after cleaning:\n")
print(sort(unique(clean_data$origin_region)))

cat("\nUnique establishment types after cleaning:\n")
print(sort(unique(clean_data$origin_establishment_type)))

# =============================================================================
# PART 5: Compare with professionally cleaned data
# =============================================================================

cat("\n=== COMPARISON WITH DVS CLEANED DATA ===\n\n")

# Load the professionally cleaned version
professional_clean <- read_excel("data/animal_movement_2023_rev3.xlsx")

cat("Our cleaning:", nrow(clean_data), "rows\n")
cat("Professional cleaning:", nrow(professional_clean), "rows\n")

# Use the professionally cleaned data for analysis
movements <- professional_clean
cat("\nUsing professionally cleaned data for subsequent analysis\n")
cat("Final shape:", nrow(movements), "rows x", ncol(movements), "columns\n")

# Quick summary
cat("\nData summary:\n")
cat("Date range:", as.character(min(movements$date)), "to", as.character(max(movements$date)), "\n")
cat("Total animals moved:", sum(movements$weight), "\n")
cat("Regions covered:", paste(unique(movements$origin_region), collapse = ", "), "\n")
