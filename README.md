# Namibia LITS Data Management & Analysis Workshop

A 4.5-day intensive training on data management, R programming, and livestock movement network analysis for veterinary epidemiologists.

## Workshop Overview

| Days | Module | Topics |
|------|--------|--------|
| 1-2 | Data Collection | EpiCollect5 questionnaire development, field testing, QA |
| 3-4 | R Introduction | R basics, data wrangling (dplyr), visualization (ggplot2) |
| 4.5 | Movement Analysis | Network analysis, centrality measures, risk assessment |

## Target Audience

- State Veterinarians (DVS Namibia)
- Veterinary epidemiologists
- No prior R experience required

## Prerequisites

- Laptop with R and RStudio installed
- Smartphone with EpiCollect5 app
- Basic understanding of LITS and livestock movement systems

## Getting Started

### View the Workshop Materials

Visit the live site: **[namibia-lits-workshop](https://connectanimalhealth.github.io/namibia-lits-workshop/)**

### Run Locally

```bash
# Clone the repository
git clone https://github.com/connectAnimalHealth/namibia-lits-workshop.git
cd namibia-lits-workshop

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Workshop Content

### Day 1-2: Data Collection with EpiCollect5
- Data management principles
- Introduction to EpiCollect5
- Building veterinary inspection forms
- Branching logic and validation
- Field testing and quality assurance

### Day 3-4: Introduction to R
- R/RStudio setup and workflow
- Data types and structures
- Data wrangling with dplyr
- Visualization with ggplot2
- Working with LITS movement data

### Day 4.5: Movement Network Analysis
- Network concepts (nodes, edges, centrality)
- Building movement networks with igraph
- Identifying high-risk farms and pathways
- Risk-based surveillance targeting

## Namibia Context

The workshop includes specific content on:
- Veterinary Cordon Fence (VCF) / "Red Line"
- FMD zones and movement control
- Northern Communal Areas (NCA) regulations
- LITS system structure and data

## Data

The `data/` folder contains synthetic livestock movement data based on realistic Namibian movement patterns. This data is for training purposes only.

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Syntax Highlighter** - Code blocks

## Contributing

This workshop was developed by Connect Animal Health for DVS Namibia.

## License

MIT License - See LICENSE file for details.
