import { useState, useEffect, useRef } from 'react'
import { Network } from 'vis-network'
import { DataSet } from 'vis-data'

// JSONBin.io configuration - WOAH Training Namibia
const JSONBIN_API_KEY = '$2a$10$ipV/tMP6D6kr/M.RsIdMy.T6mr3cwNMJ8/Oj/4xZW6eKjh9rH.XZ2'
const JSONBIN_BIN_ID = '6a2e2b57f5f4af5e29ee8b01'

export default function NetworkDataCollector({ title = "DVS Reporting Network" }) {
  const [name, setName] = useState('')
  const [reportsTo, setReportsTo] = useState('')
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false) // Track if data was successfully loaded
  const [submitted, setSubmitted] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editFrom, setEditFrom] = useState('')
  const [editTo, setEditTo] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showGraph, setShowGraph] = useState(true)

  // Network visualization ref
  const networkContainer = useRef(null)
  const networkInstance = useRef(null)

  // Build network visualization when entries change
  useEffect(() => {
    if (!networkContainer.current || entries.length === 0) return

    // Extract unique nodes from entries
    const nodeNames = new Set()
    entries.forEach(entry => {
      nodeNames.add(entry.from)
      nodeNames.add(entry.to)
    })

    const nodes = new DataSet(
      Array.from(nodeNames).map((name, i) => ({
        id: name,
        label: name,
        color: {
          background: name.startsWith('CVO') || name.includes('Dir') ? '#C8102E' : '#FF8C00',
          border: '#003580',
          highlight: { background: '#FFB347', border: '#003580' }
        },
        font: { color: '#333', size: 14, face: 'Arial' }
      }))
    )

    const edges = new DataSet(
      entries.map((entry, i) => ({
        id: i,
        from: entry.from,
        to: entry.to,
        arrows: 'to',
        color: { color: '#003580', highlight: '#C8102E' },
        width: 2
      }))
    )

    const options = {
      layout: {
        hierarchical: {
          enabled: false
        }
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -3000,
          springLength: 150,
          springConstant: 0.04
        },
        stabilization: { iterations: 100 }
      },
      interaction: {
        hover: true,
        dragNodes: true,
        zoomView: true,
        dragView: true
      },
      nodes: {
        shape: 'box',
        margin: 10,
        borderWidth: 2,
        shadow: true
      },
      edges: {
        smooth: {
          type: 'curvedCW',
          roundness: 0.2
        }
      }
    }

    // Destroy previous instance if exists
    if (networkInstance.current) {
      networkInstance.current.destroy()
    }

    networkInstance.current = new Network(networkContainer.current, { nodes, edges }, options)

    return () => {
      if (networkInstance.current) {
        networkInstance.current.destroy()
      }
    }
  }, [entries])

  // Fetch existing entries on load
  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    if (JSONBIN_BIN_ID.includes('xxxx')) {
      setError('JSONBin not configured - see component for setup instructions')
      return
    }

    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Access-Key': JSONBIN_API_KEY
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      setEntries(data.record || [])
      setDataLoaded(true)
    } catch (err) {
      console.error('Failed to fetch entries:', err)
      // IMPORTANT: Don't clear entries on error - this was causing data loss!
      setError('Failed to load data. Please refresh the page before submitting.')
      setDataLoaded(false)
    }
  }

  // Fetch fresh data from server (used before saving to avoid race conditions)
  const fetchFreshEntries = async () => {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Access-Key': JSONBIN_API_KEY
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      return data.record || []
    } catch (err) {
      console.error('Failed to fetch fresh entries:', err)
      return null // Return null to indicate failure
    }
  }

  const saveToJsonBin = async (updatedEntries, existingCount, allowReduction = false) => {
    try {
      // CRITICAL SAFETY CHECK: Never allow saving fewer entries than currently exist
      // Unless explicitly allowed (e.g., user confirmed deletion)
      if (!allowReduction && updatedEntries.length < existingCount) {
        console.error(`BLOCKED: Attempted to save ${updatedEntries.length} entries but ${existingCount} exist on server. This would cause data loss.`)
        return { ok: false, error: 'DATA_LOSS_PREVENTED' }
      }

      // Double-check by fetching current count from server right before save (skip if allowing reduction)
      if (!allowReduction) {
        const serverData = await fetchFreshEntries()
        if (serverData !== null && updatedEntries.length < serverData.length) {
          console.error(`BLOCKED: Server has ${serverData.length} entries, attempted to save ${updatedEntries.length}. This would cause data loss.`)
          return { ok: false, error: 'DATA_LOSS_PREVENTED' }
        }
      }

      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(updatedEntries)
      })
      return { ok: response.ok, error: null }
    } catch (err) {
      console.error('Failed to save:', err)
      return { ok: false, error: err.message }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !reportsTo.trim()) return

    setLoading(true)
    setError(null)

    // SAFETY CHECK: Ensure we have loaded data before allowing submission
    if (!dataLoaded) {
      setError('Data not loaded. Please refresh the page and try again.')
      setLoading(false)
      return
    }

    // Split multiple "reports to" entries by comma
    const reportsToList = reportsTo.split(',').map(r => r.trim()).filter(r => r)

    const newEntries = reportsToList.map(reportTo => ({
      from: name.trim(),
      to: reportTo,
      timestamp: new Date().toISOString()
    }))

    // IMPORTANT: Fetch fresh data from server before saving to avoid race conditions
    const freshEntries = await fetchFreshEntries()
    if (freshEntries === null) {
      setError('Could not connect to server. Please check your internet and try again.')
      setLoading(false)
      return
    }

    const updatedEntries = [...freshEntries, ...newEntries]

    const saveResult = await saveToJsonBin(updatedEntries, freshEntries.length)
    if (saveResult.ok) {
      setEntries(updatedEntries)
      setName('')
      setReportsTo('')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } else if (saveResult.error === 'DATA_LOSS_PREVENTED') {
      setError('Save blocked: Would have caused data loss. Please refresh and try again.')
    } else {
      setError('Failed to save response. Please try again.')
    }

    setLoading(false)
  }

  const startEdit = (index, entry) => {
    setEditingIndex(index)
    setEditFrom(entry.from)
    setEditTo(entry.to)
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditFrom('')
    setEditTo('')
  }

  const saveEdit = async (index) => {
    setLoading(true)
    setError(null)

    // Fetch fresh data from server to avoid conflicts
    const freshEntries = await fetchFreshEntries()
    if (freshEntries === null) {
      setError('Could not connect to server. Please check your internet and try again.')
      setLoading(false)
      return
    }

    // Find the entry we're editing by matching the original values
    const originalEntry = entries[index]
    const serverIndex = freshEntries.findIndex(
      e => e.from === originalEntry.from && e.to === originalEntry.to
    )

    if (serverIndex === -1) {
      setError('Entry was modified or deleted by someone else. Please refresh.')
      setLoading(false)
      return
    }

    // Apply the edit to the fresh server data
    const updatedEntries = freshEntries.map((entry, i) =>
      i === serverIndex ? { ...entry, from: editFrom.trim(), to: editTo.trim() } : entry
    )

    // Save with allowReduction=true since we're working with fresh data
    const saveResult = await saveToJsonBin(updatedEntries, freshEntries.length, true)
    if (saveResult.ok) {
      setEntries(updatedEntries)
      setEditingIndex(null)
      setEditFrom('')
      setEditTo('')
    } else {
      setError('Failed to save changes.')
    }
    setLoading(false)
  }

  const deleteEntry = async (index) => {
    if (!confirm('Delete this entry?')) return

    const updatedEntries = entries.filter((_, i) => i !== index)

    setLoading(true)
    // allowReduction = true because user explicitly confirmed deletion
    const saveResult = await saveToJsonBin(updatedEntries, entries.length, true)
    if (saveResult.ok) {
      setEntries(updatedEntries)
    } else {
      setError('Failed to delete entry.')
    }
    setLoading(false)
  }

  const clearAll = async () => {
    if (!confirm('Delete ALL entries? This cannot be undone.')) return

    setLoading(true)
    // allowReduction = true because user explicitly confirmed deletion
    const saveResult = await saveToJsonBin([], entries.length, true)
    if (saveResult.ok) {
      setEntries([])
    } else {
      setError('Failed to clear entries.')
    }
    setLoading(false)
  }

  // Generate R code for fetching and analyzing the network
  const rCode = `# ============================================
# DVS Reporting Network - Centrality Analysis
# ============================================

# Install packages if needed
packages <- c("tidyverse", "httr", "jsonlite", "igraph")
install_if_missing <- packages[!packages %in% installed.packages()[,"Package"]]
if(length(install_if_missing)) install.packages(install_if_missing)

library(tidyverse)
library(httr)
library(jsonlite)
library(igraph)

# --------------------------------------------
# 1. Fetch data from JSONBin
# --------------------------------------------
response <- GET(
  "https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest",
  add_headers("X-Access-Key" = "${JSONBIN_API_KEY}")
)

data <- fromJSON(content(response, "text"))
dvs_edges <- as_tibble(data$record) %>%
  select(from, to)

# View the edge list (who reports to whom)
print(dvs_edges)

# --------------------------------------------
# 2. Build the network
# --------------------------------------------
g <- graph_from_data_frame(dvs_edges, directed = TRUE)

cat("\\n=== NETWORK SUMMARY ===\\n")
cat("Nodes (people):", vcount(g), "\\n")
cat("Edges (reporting links):", ecount(g), "\\n")

# --------------------------------------------
# 3. DEGREE CENTRALITY
# --------------------------------------------
# In-degree: How many people report TO this person?
# High in-degree = receives many reports = key decision maker

in_deg <- degree(g, mode = "in")
cat("\\n=== IN-DEGREE (Most reported to) ===\\n")
cat("Who receives the most outbreak reports?\\n\\n")
sort(in_deg, decreasing = TRUE) %>% head(5) %>% print()

# Out-degree: How many people does this person report to?
# High out-degree = reports to many people = wide communication

out_deg <- degree(g, mode = "out")
cat("\\n=== OUT-DEGREE (Reports to most people) ===\\n")
cat("Who reports to the most people?\\n\\n")
sort(out_deg, decreasing = TRUE) %>% head(5) %>% print()

# --------------------------------------------
# 4. BETWEENNESS CENTRALITY
# --------------------------------------------
# Betweenness: How often is this person on the shortest path?
# High betweenness = bridge/broker = critical for information flow
# If removed, communication breaks down

betw <- betweenness(g, directed = TRUE)
cat("\\n=== BETWEENNESS CENTRALITY (Information brokers) ===\\n")
cat("Who are the critical bridges in the network?\\n")
cat("(If removed, information flow would be disrupted)\\n\\n")
sort(betw, decreasing = TRUE) %>% head(5) %>% print()

# --------------------------------------------
# 5. Summary table
# --------------------------------------------
centrality_summary <- tibble(
  name = V(g)$name,
  in_degree = in_deg,
  out_degree = out_deg,
  betweenness = round(betw, 1)
) %>%
  arrange(desc(in_degree))

cat("\\n=== FULL CENTRALITY TABLE ===\\n")
print(centrality_summary)

# --------------------------------------------
# 6. Key insights
# --------------------------------------------
cat("\\n=== KEY INSIGHTS ===\\n")
cat("Top receiver of reports:", names(which.max(in_deg)),
    "(", max(in_deg), "incoming)\\n")
cat("Most connected reporter:", names(which.max(out_deg)),
    "(", max(out_deg), "outgoing)\\n")
cat("Critical bridge:", names(which.max(betw)),
    "(betweenness:", round(max(betw), 1), ")\\n")

# Check for isolated nodes (no connections)
isolated <- which(degree(g) == 0)
if(length(isolated) > 0) {
  cat("\\nWARNING: Isolated nodes found:", names(isolated), "\\n")
}`

  return (
    <div className="bg-white border-2 border-orange-200 rounded-lg p-6 my-6">
      <h3 className="text-xl font-bold text-woah-orange mb-4">{title}</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {submitted && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          Response recorded! Thank you.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Designation & Region/Area
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., SV Kunene, AHT Omusati, Dir NCA, Dep Dir"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Use abbreviations: SV (State Vet), AHT (Animal Health Technician), Dir (Director), Dep Dir (Deputy Director)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Who would you report an FMD outbreak to?
          </label>
          <input
            type="text"
            value={reportsTo}
            onChange={(e) => setReportsTo(e.target.value)}
            placeholder="e.g., Dir NCA, CVO, Dep Dir"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Use same abbreviations as above. Separate multiple people with commas.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Response'}
        </button>
      </form>

      {/* Network Visualization */}
      {entries.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">
              Live Network Graph ({new Set([...entries.map(e => e.from), ...entries.map(e => e.to)]).size} people, {entries.length} connections)
            </h4>
            <button
              onClick={() => setShowGraph(!showGraph)}
              className="text-xs text-gray-600 hover:text-gray-800 px-2 py-1 border border-gray-300 rounded"
            >
              {showGraph ? 'Hide Graph' : 'Show Graph'}
            </button>
          </div>
          {showGraph && (
            <div
              ref={networkContainer}
              className="border-2 border-orange-200 rounded-lg bg-gray-50"
              style={{ height: '400px', width: '100%' }}
            />
          )}
          <p className="text-xs text-gray-500 mt-2">
            Drag nodes to rearrange. Scroll to zoom. Arrows show reporting direction.
          </p>
        </div>
      )}

      {/* Current responses */}
      {entries.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-gray-800">
              Responses Collected ({entries.length} connections)
            </h4>
            <button
              onClick={clearAll}
              className="text-xs text-red-600 hover:text-red-800 px-2 py-1 border border-red-300 rounded hover:bg-red-50"
            >
              Clear All
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left">From</th>
                  <th className="px-3 py-2 text-left">Reports To</th>
                  <th className="px-3 py-2 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {entries.map((entry, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {editingIndex === i ? (
                      <>
                        <td className="px-2 py-1">
                          <input
                            type="text"
                            value={editFrom}
                            onChange={(e) => setEditFrom(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                        </td>
                        <td className="px-2 py-1">
                          <input
                            type="text"
                            value={editTo}
                            onChange={(e) => setEditTo(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                        </td>
                        <td className="px-2 py-1 text-right">
                          <button
                            onClick={() => saveEdit(i)}
                            className="text-green-600 hover:text-green-800 mr-2 text-xs"
                            disabled={loading}
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 hover:text-gray-800 text-xs"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-2">{entry.from}</td>
                        <td className="px-3 py-2">{entry.to}</td>
                        <td className="px-3 py-2 text-right">
                          <button
                            onClick={() => startEdit(i, entry)}
                            className="text-blue-600 hover:text-blue-800 mr-2 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteEntry(i)}
                            className="text-red-600 hover:text-red-800 text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* R code to fetch data */}
      <details className="mt-4 bg-gray-50 rounded-lg">
        <summary className="px-4 py-2 cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium">
          R code to fetch this data
        </summary>
        <pre className="px-4 pb-4 text-xs overflow-x-auto bg-gray-800 text-gray-100 rounded-b-lg p-4 mt-2">
          {rCode}
        </pre>
      </details>
    </div>
  )
}
