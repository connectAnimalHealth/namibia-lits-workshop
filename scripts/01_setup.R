# =============================================================================
# Namibia LITS Workshop - Script 1: Setup and Installation
# =============================================================================
# Run this script once to install all required packages

# Install required packages
install.packages(c(
  "tidyverse",   # Data manipulation and visualization (includes ggplot2, dplyr, etc.)
  "readxl",      # Read Excel files
  "sf",          # Spatial data handling
  "igraph",      # Network analysis
  "ggraph",      # Network visualization
  "lubridate",   # Date handling (part of tidyverse but good to be explicit)
  "viridis"      # Color palettes for maps
))

# Verify installation
cat("Checking package installation...\n\n")

packages <- c("tidyverse", "readxl", "sf", "igraph", "ggraph", "lubridate", "viridis")

for (pkg in packages) {
  if (require(pkg, character.only = TRUE, quietly = TRUE)) {
    cat(paste0("[OK] ", pkg, "\n"))
  } else {
    cat(paste0("[MISSING] ", pkg, " - please install manually\n"))
  }
}

cat("\nSetup complete! You're ready for the workshop.\n")
