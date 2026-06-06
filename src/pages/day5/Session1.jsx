import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'

export default function Day5Session1() {
  const networkIntroCode = `# Load packages
library(tidyverse)
library(igraph)

# Load movement data
movements <- read_csv("data/namibia_movements.csv")

# Create edge list (connections between farms)
edges <- movements %>%
  select(from = origin_farm, to = destination_farm, weight = animals) %>%
  group_by(from, to) %>%
  summarize(
    movements = n(),
    total_animals = sum(weight),
    .groups = "drop"
  )

# Create the network graph
g <- graph_from_data_frame(edges, directed = TRUE)

# Basic network info
vcount(g)  # Number of farms (nodes)
ecount(g)  # Number of connections (edges)`

  const centralityCode = `# Calculate centrality measures

# In-degree: How many farms send animals TO this farm?
in_degree <- degree(g, mode = "in")

# Out-degree: How many farms does this farm send animals TO?
out_degree <- degree(g, mode = "out")

# Betweenness: How often is this farm on the shortest path between others?
# High betweenness = critical hub in the network
betweenness_scores <- betweenness(g, directed = TRUE)

# Create a summary dataframe
farm_centrality <- data.frame(
  farm = V(g)$name,
  in_degree = in_degree,
  out_degree = out_degree,
  betweenness = betweenness_scores
) %>%
  arrange(desc(betweenness))

# Top 10 most central farms
head(farm_centrality, 10)`

  const visualizeNetworkCode = `# Simple network visualization
plot(g,
     vertex.size = degree(g) * 2,
     vertex.label.cex = 0.6,
     edge.arrow.size = 0.3,
     main = "Namibia Livestock Movement Network")

# Better visualization with ggraph
library(ggraph)

ggraph(g, layout = "fr") +
  geom_edge_link(aes(alpha = total_animals),
                 arrow = arrow(length = unit(2, "mm")),
                 end_cap = circle(2, "mm")) +
  geom_node_point(aes(size = degree(g)), color = "#003580") +
  geom_node_text(aes(label = name), repel = TRUE, size = 2) +
  theme_void() +
  labs(title = "Livestock Movement Network",
       subtitle = "Node size = number of connections")`

  const riskAnalysisCode = `# Identify high-risk pathways

# Movements crossing the VCF (NCA to FMD-free)
vcf_crossings <- movements %>%
  filter(origin_zone == "NCA", destination_zone == "FMD_Free") %>%
  group_by(origin_farm, destination_farm) %>%
  summarize(
    crossings = n(),
    total_animals = sum(animals),
    .groups = "drop"
  ) %>%
  arrange(desc(total_animals))

# High-risk farms (high betweenness + in NCA)
high_risk_farms <- farm_centrality %>%
  left_join(farm_zones, by = "farm") %>%
  filter(zone == "NCA") %>%
  filter(betweenness > quantile(betweenness, 0.9))

print("High-risk farms for targeted surveillance:")
print(high_risk_farms)`

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

      <Exercise title="Final Exercise: Analyze Your Movement Network">
        <p className="mb-3">Using the complete synthetic LITS dataset:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Build the full movement network</li>
          <li>Calculate centrality measures for all farms</li>
          <li>Identify the top 5 farms by betweenness centrality</li>
          <li>Map the VCF-crossing movements</li>
          <li>Create a visualization highlighting high-risk farms</li>
          <li><strong>Discussion:</strong> How would you use this analysis to prioritize surveillance?</li>
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