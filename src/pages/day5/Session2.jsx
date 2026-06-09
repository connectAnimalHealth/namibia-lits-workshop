import { Link } from 'react-router-dom'
import CodeBlock from '../../components/CodeBlock'
import Callout from '../../components/Callout'
import Exercise from '../../components/Exercise'
import KeyConcept from '../../components/KeyConcept'

export default function Day5Session2() {
  const exportShapefileCode = `# Load required packages
library(tidyverse)
library(sf)
library(readxl)

# Load constituency boundaries (already have coordinates)
constituencies <- st_read("data/spatial/nam_constituency_4326.geojson")

# Load movement data
movements <- read_excel("data/animal_movement_2023_rev3.xlsx")

# Aggregate movements by constituency pair
movement_flows <- movements %>%
  filter(!is.na(origin_constituency) & !is.na(destination_constituency)) %>%
  group_by(
    origin = origin_constituency,
    destination = destination_constituency
  ) %>%
  summarize(
    n_movements = n(),
    total_animals = sum(weight, na.rm = TRUE),
    .groups = "drop"
  ) %>%
  filter(origin != destination)  # Remove internal movements

# Get centroids of constituencies for line endpoints
centroids <- constituencies %>%
  st_centroid() %>%
  st_coordinates() %>%
  as.data.frame() %>%
  mutate(constituency = constituencies$const)

# Join coordinates to movement data
flows_with_coords <- movement_flows %>%
  left_join(centroids, by = c("origin" = "constituency")) %>%
  rename(origin_x = X, origin_y = Y) %>%
  left_join(centroids, by = c("destination" = "constituency")) %>%
  rename(dest_x = X, dest_y = Y) %>%
  filter(!is.na(origin_x) & !is.na(dest_x))

# Create line geometries for each movement flow
flow_lines <- flows_with_coords %>%
  rowwise() %>%
  mutate(
    geometry = st_sfc(
      st_linestring(matrix(c(origin_x, origin_y, dest_x, dest_y), ncol = 2, byrow = TRUE)),
      crs = 4326
    )
  ) %>%
  ungroup() %>%
  st_as_sf()

# Export as shapefile
st_write(flow_lines, "output/movement_flows.shp", delete_dsn = TRUE)

# Also export as GeoPackage (better format, single file)
st_write(flow_lines, "output/movement_flows.gpkg", delete_dsn = TRUE)

cat("Exported", nrow(flow_lines), "movement flows to shapefile\\n")`

  const nodeExportCode = `# Export constituency nodes with movement statistics
node_stats <- movements %>%
  # Outgoing movements
  group_by(constituency = origin_constituency) %>%
  summarize(
    out_movements = n(),
    out_animals = sum(weight, na.rm = TRUE),
    .groups = "drop"
  ) %>%
  full_join(
    # Incoming movements
    movements %>%
      group_by(constituency = destination_constituency) %>%
      summarize(
        in_movements = n(),
        in_animals = sum(weight, na.rm = TRUE),
        .groups = "drop"
      ),
    by = "constituency"
  ) %>%
  replace_na(list(out_movements = 0, out_animals = 0,
                  in_movements = 0, in_animals = 0)) %>%
  mutate(
    total_movements = out_movements + in_movements,
    net_flow = in_animals - out_animals,
    flow_balance = case_when(
      net_flow > 0 ~ "Net Importer",
      net_flow < 0 ~ "Net Exporter",
      TRUE ~ "Balanced"
    )
  )

# Join to constituency polygons
constituencies_with_stats <- constituencies %>%
  left_join(node_stats, by = c("const" = "constituency"))

# Export
st_write(constituencies_with_stats, "output/constituencies_movement_stats.gpkg",
         delete_dsn = TRUE)

cat("Exported constituency statistics\\n")`

  const filterExportCode = `# Export filtered movements (e.g., high-volume routes only)
high_volume_flows <- flow_lines %>%
  filter(total_animals >= 100)  # Only routes with 100+ animals

st_write(high_volume_flows, "output/high_volume_flows.gpkg", delete_dsn = TRUE)

# Export by movement type
slaughter_movements <- movements %>%
  filter(destination_establishment_type == "Abattoir") %>%
  # ... create flow lines as above

# Export temporal subset
jan_mar_movements <- movements %>%
  filter(month(movement_date) %in% c(1, 2, 3)) %>%
  # ... create flow lines as above`

  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">Day 4</span>
        <h1 className="text-3xl font-bold text-orange-500 mt-2 mb-2">Spatial Visualization with QGIS</h1>
        <p className="text-gray-600">Exporting movement networks and creating maps in QGIS</p>
      </div>

      <section className="bg-gradient-to-r from-orange-500 to-amber-400 p-6 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-3">Learning Objectives</h2>
        <p className="mb-3 text-white/90">By the end of this session, you will be able to:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
            <span>Export movement network data from R as shapefiles/GeoPackages</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
            <span>Import spatial data into QGIS and navigate the interface</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
            <span>Style movement flows by volume and filter data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">4</span>
            <span>Create a basic movement network map for reporting</span>
          </li>
        </ul>
      </section>

      <KeyConcept title="Why QGIS?">
        <p>
          While R is excellent for data analysis and can produce maps, <strong>QGIS</strong> provides
          an interactive environment for exploring spatial data. You can zoom, pan, click on features,
          filter dynamically, and compose publication-ready maps with legends and scale bars.
          It's also free and open-source - perfect for government veterinary services.
        </p>
      </KeyConcept>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Part 1: Exporting Movement Data from R</h2>

        <p className="text-gray-700 mb-4">
          Before we can visualize in QGIS, we need to export our movement network as spatial data.
          We'll create two types of files:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-800 mb-2">Flow Lines (Edges)</h3>
            <p className="text-sm text-gray-600">
              Lines connecting origin to destination constituencies, with attributes for
              number of movements and total animals moved.
            </p>
          </div>
          <div className="bg-white border-2 border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-2">Constituency Nodes</h3>
            <p className="text-sm text-gray-600">
              Constituency polygons with movement statistics - in-degree, out-degree,
              net flow balance.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">Creating Flow Lines</h3>
        <CodeBlock code={exportShapefileCode} language="r" title="Export movement flows as shapefile" />

        <KeyConcept title="GeoPackage vs Shapefile: Which Format?">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">GeoPackage (.gpkg) ✓ Recommended</h4>
              <ul className="text-sm text-green-900 space-y-1">
                <li>✓ <strong>Single file</strong> - easy to share and manage</li>
                <li>✓ <strong>No field name limits</strong> - use descriptive names</li>
                <li>✓ <strong>Multiple layers</strong> in one file</li>
                <li>✓ <strong>Larger file support</strong> - no 2GB limit</li>
                <li>✓ <strong>Better performance</strong> with spatial indexing</li>
                <li>✓ <strong>Open standard</strong> (OGC)</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <h4 className="font-bold text-amber-800 mb-2">Shapefile (.shp) - Legacy</h4>
              <ul className="text-sm text-amber-900 space-y-1">
                <li>✗ <strong>Multiple files</strong> required (.shp, .dbf, .shx, .prj)</li>
                <li>✗ <strong>10-char field names</strong> - often truncated</li>
                <li>✗ <strong>One layer</strong> per shapefile</li>
                <li>✗ <strong>2GB size limit</strong></li>
                <li>✓ Still widely supported</li>
                <li>✓ Good for legacy compatibility</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3 italic">
            We recommend GeoPackage for all new work. Only use Shapefile when required for compatibility
            with older software.
          </p>
        </KeyConcept>

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">Exporting Node Statistics</h3>
        <CodeBlock code={nodeExportCode} language="r" title="Export constituencies with movement stats" />

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">Filtered Exports</h3>
        <p className="text-gray-700 mb-4">
          You can export subsets of your data for specific analyses:
        </p>
        <CodeBlock code={filterExportCode} language="r" title="Export filtered subsets" />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Part 2: Introduction to QGIS</h2>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-green-800 mb-2">What is QGIS?</h3>
          <p className="text-sm text-green-700 mb-2">
            QGIS (Quantum GIS) is a free, open-source Geographic Information System that lets you
            visualize, edit, and analyze spatial data. It's used by governments, researchers, and
            organizations worldwide.
          </p>
          <a
            href="https://qgis.org/download/"
            target="_blank"
            rel="noreferrer"
            className="text-green-600 hover:underline text-sm font-medium"
          >
            Download QGIS →
          </a>
        </div>

        <KeyConcept title="Data Types in QGIS">
          <p className="mb-3">
            QGIS works with two main types of spatial data. Understanding the difference is essential
            for working with movement networks:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">Vector Data</h4>
              <p className="text-sm text-blue-900 mb-2">Precise geometric shapes with attributes:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li><strong>Points</strong> - Farm locations, market positions</li>
                <li><strong>Lines</strong> - Movement routes, roads, rivers</li>
                <li><strong>Polygons</strong> - Constituencies, regions, VCF zones</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Raster Data</h4>
              <p className="text-sm text-green-900 mb-2">Grid of cells (pixels) with values:</p>
              <ul className="text-sm text-green-800 space-y-1">
                <li><strong>Satellite imagery</strong> - Aerial photos</li>
                <li><strong>Elevation models</strong> - Terrain height</li>
                <li><strong>Climate data</strong> - Rainfall, temperature</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3 italic">
            For movement network analysis, we primarily work with <strong>vector data</strong> -
            lines for movement flows and polygons for administrative boundaries.
          </p>
        </KeyConcept>

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">QGIS Interface Overview</h3>

        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-blue-100 p-3 rounded">
              <p className="font-bold text-blue-800">Layers Panel</p>
              <p className="text-blue-700">Left side - shows all loaded layers, toggle visibility, access properties</p>
            </div>
            <div className="bg-green-100 p-3 rounded">
              <p className="font-bold text-green-800">Map Canvas</p>
              <p className="text-green-700">Center - the main map view, pan with middle mouse, scroll to zoom</p>
            </div>
            <div className="bg-purple-100 p-3 rounded">
              <p className="font-bold text-purple-800">Toolbars</p>
              <p className="text-purple-700">Top - navigation, selection, measurement, and editing tools</p>
            </div>
          </div>
        </div>

        <Callout type="warning" title="Layer Ordering Matters!">
          <p>
            Layers at the <strong>top</strong> of the Layers Panel are drawn <strong>on top</strong> of
            layers below them. If you can't see a layer, it might be hidden beneath another. Drag layers
            up/down to reorder them, or toggle visibility with the checkbox.
          </p>
        </Callout>

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">Navigation Toolbar</h3>
        <p className="text-gray-700 mb-4">
          The navigation toolbar provides essential tools for exploring your map. These are the tools
          you'll use constantly:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Tool</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Icon</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-medium">Pan</td>
                <td className="border border-gray-200 px-3 py-2">🖐️ Hand</td>
                <td className="border border-gray-200 px-3 py-2">Click and drag to move the map view</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-medium">Zoom In</td>
                <td className="border border-gray-200 px-3 py-2">🔍+ Magnifier</td>
                <td className="border border-gray-200 px-3 py-2">Click to zoom in, or draw rectangle to zoom to area</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-medium">Zoom Out</td>
                <td className="border border-gray-200 px-3 py-2">🔍- Magnifier</td>
                <td className="border border-gray-200 px-3 py-2">Click to zoom out from the map</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-medium">Zoom Full</td>
                <td className="border border-gray-200 px-3 py-2">🌍 Globe</td>
                <td className="border border-gray-200 px-3 py-2">Zoom to show all layers at once</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-medium">Zoom to Layer</td>
                <td className="border border-gray-200 px-3 py-2">📄 Page</td>
                <td className="border border-gray-200 px-3 py-2">Zoom to extent of selected layer</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-medium">Refresh</td>
                <td className="border border-gray-200 px-3 py-2">🔄 Arrows</td>
                <td className="border border-gray-200 px-3 py-2">Redraw the map (useful after style changes)</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-medium">Identify</td>
                <td className="border border-gray-200 px-3 py-2">ℹ️ Info</td>
                <td className="border border-gray-200 px-3 py-2">Click feature to see its attributes</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-medium">Measure</td>
                <td className="border border-gray-200 px-3 py-2">📏 Ruler</td>
                <td className="border border-gray-200 px-3 py-2">Measure distances and areas on the map</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-medium">Scale</td>
                <td className="border border-gray-200 px-3 py-2">1:50000</td>
                <td className="border border-gray-200 px-3 py-2">Set specific map scale (bottom status bar)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-blue-800 mb-2">Pro Tips: Quick Navigation</h4>
          <ul className="text-sm text-blue-900 space-y-1">
            <li>• <strong>Scroll wheel</strong> zooms in/out at cursor position</li>
            <li>• <strong>Middle mouse button + drag</strong> pans without selecting Pan tool</li>
            <li>• <strong>Spacebar + drag</strong> also pans (temporary pan mode)</li>
            <li>• <strong>Right-click layer → Zoom to Layer</strong> focuses on that layer's extent</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Part 3: Importing and Styling Movement Data</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">Methods for Adding Layers</h3>
        <p className="text-gray-700 mb-4">
          QGIS supports multiple ways to import spatial data. Here are the most common methods:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-800 mb-2">Vector Layers (Shapefile/GeoPackage)</h4>
            <ol className="text-sm text-gray-700 space-y-1">
              <li>1. <strong>Layer → Add Layer → Add Vector Layer</strong></li>
              <li>2. Click <strong>...</strong> to browse for file</li>
              <li>3. Select .gpkg or .shp file</li>
              <li>4. Click <strong>Add</strong></li>
            </ol>
            <p className="text-xs text-gray-500 mt-2">
              For GeoPackage, you may be asked to select which layer to add.
            </p>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-green-800 mb-2">CSV with Coordinates (Point Data)</h4>
            <ol className="text-sm text-gray-700 space-y-1">
              <li>1. <strong>Layer → Add Layer → Add Delimited Text Layer</strong></li>
              <li>2. Browse to your .csv file</li>
              <li>3. Set <strong>X field</strong> = longitude column</li>
              <li>4. Set <strong>Y field</strong> = latitude column</li>
              <li>5. Set <strong>CRS</strong> to EPSG:4326 (WGS84)</li>
              <li>6. Click <strong>Add</strong></li>
            </ol>
            <p className="text-xs text-gray-500 mt-2">
              Useful for farm locations exported from spreadsheets.
            </p>
          </div>
        </div>

        <Callout type="info" title="Coordinate Reference Systems (CRS)">
          <p>
            QGIS needs to know what coordinate system your data uses. For GPS coordinates (lat/long),
            use <strong>EPSG:4326 (WGS 84)</strong>. For Namibian data in meters, look for
            <strong>EPSG:32733</strong> (UTM Zone 33S). QGIS can reproject "on the fly" but it's best
            to ensure all layers use the same CRS.
          </p>
        </Callout>

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">Adding Our Movement Data</h3>

        <div className="space-y-4 mb-6">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
              <div>
                <h4 className="font-bold text-gray-800">Add the constituency layer</h4>
                <p className="text-sm text-gray-600">
                  Layer → Add Layer → Add Vector Layer → Browse to <code className="bg-gray-100 px-1 rounded">constituencies_movement_stats.gpkg</code>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
              <div>
                <h4 className="font-bold text-gray-800">Add the movement flows layer</h4>
                <p className="text-sm text-gray-600">
                  Layer → Add Layer → Add Vector Layer → Browse to <code className="bg-gray-100 px-1 rounded">movement_flows.gpkg</code>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
              <div>
                <h4 className="font-bold text-gray-800">Arrange layers (order matters!)</h4>
                <p className="text-sm text-gray-600">
                  Drag layers in the Layers Panel so <strong>flows (lines)</strong> are on top,
                  then <strong>constituencies (polygons)</strong>, then any basemap at bottom.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</span>
              <div>
                <h4 className="font-bold text-gray-800">Add a basemap (optional)</h4>
                <p className="text-sm text-gray-600">
                  Web → QuickMapServices → OSM → OSM Standard (requires QuickMapServices plugin)
                </p>
              </div>
            </div>
          </div>
        </div>

        <KeyConcept title="Symbology Types: Categorised vs Graduated">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="font-bold text-purple-800 mb-2">Categorised</h4>
              <p className="text-sm text-purple-900 mb-2">
                For <strong>discrete/categorical</strong> data - distinct groups or classes.
              </p>
              <ul className="text-sm text-purple-800">
                <li>• Flow balance: "Importer", "Exporter", "Balanced"</li>
                <li>• Establishment type: "Farm", "Auction", "Abattoir"</li>
                <li>• Region names</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="font-bold text-orange-800 mb-2">Graduated</h4>
              <p className="text-sm text-orange-900 mb-2">
                For <strong>continuous/numeric</strong> data - values that range smoothly.
              </p>
              <ul className="text-sm text-orange-800">
                <li>• Total animals moved (0 to 10,000+)</li>
                <li>• Number of movements</li>
                <li>• Net flow balance (negative to positive)</li>
              </ul>
            </div>
          </div>
        </KeyConcept>

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">Styling Flow Lines by Volume</h3>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-amber-800 mb-2">Graduated Symbology for Line Width</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-amber-900">
            <li>Double-click the movement_flows layer to open Properties</li>
            <li>Go to <strong>Symbology</strong> tab</li>
            <li>Change "Single Symbol" to <strong>"Graduated"</strong></li>
            <li>Set Value to <strong>total_animals</strong></li>
            <li>Click <strong>Classify</strong> to create classes</li>
            <li>Click on each symbol to change line width (e.g., 0.5, 1, 2, 4, 6 for each class)</li>
            <li>Optionally change color ramp to show intensity</li>
            <li>Click <strong>Apply</strong> to preview, <strong>OK</strong> to save</li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">Adding Arrows to Movement Lines</h3>
        <p className="text-gray-700 mb-4">
          Movement flows have direction - from origin to destination. Adding arrows makes this clear:
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-green-800 mb-2">Arrow Marker Symbology</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-green-900">
            <li>In Symbology tab, click on the line symbol to open Symbol Settings</li>
            <li>Click <strong>+ Add symbol layer</strong> at the bottom</li>
            <li>Change the new layer type from "Simple Line" to <strong>"Marker Line"</strong></li>
            <li>Click on the marker symbol, change to <strong>"Arrow"</strong> or <strong>"Filled Arrow"</strong></li>
            <li>Set <strong>Marker Placement</strong> to "on last vertex" (arrow at destination)</li>
            <li>Adjust arrow size to be proportional to line width</li>
            <li>Ensure the arrow points in the correct direction (check "Rotate marker to follow line")</li>
          </ol>
          <p className="text-sm text-green-700 mt-3 italic">
            Tip: For cleaner maps, only show arrows on major routes - too many arrows look cluttered.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">Styling Constituencies by Net Flow</h3>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-blue-800 mb-2">Diverging Color Scheme</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-900">
            <li>Double-click the constituencies layer to open Properties</li>
            <li>Go to <strong>Symbology</strong> tab</li>
            <li>Change to <strong>"Graduated"</strong></li>
            <li>Set Value to <strong>net_flow</strong></li>
            <li>Choose a diverging color ramp (e.g., RdYlGn - Red for exporters, Green for importers)</li>
            <li>Click <strong>Classify</strong></li>
            <li>Adjust transparency under <strong>Layer Rendering</strong> (e.g., 50%) to see basemap</li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">Categorised Symbology for Flow Balance</h3>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-purple-800 mb-2">Color by Category</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-purple-900">
            <li>Double-click the constituencies layer to open Properties</li>
            <li>Go to <strong>Symbology</strong> tab</li>
            <li>Change to <strong>"Categorised"</strong></li>
            <li>Set Value to <strong>flow_balance</strong></li>
            <li>Click <strong>Classify</strong> - this creates one symbol per unique value</li>
            <li>Double-click each color to customize:
              <ul className="ml-6 mt-1">
                <li>• <span className="text-green-600 font-bold">Green</span> for "Net Importer"</li>
                <li>• <span className="text-red-600 font-bold">Red</span> for "Net Exporter"</li>
                <li>• <span className="text-gray-500 font-bold">Gray</span> for "Balanced"</li>
              </ul>
            </li>
          </ol>
        </div>

        <Callout type="tip" title="Copy & Paste Styles">
          <p>
            Once you've created a good symbology, you can copy it to other projects:
            <br />Right-click layer → <strong>Styles → Copy Style → All Style Categories</strong>
            <br />Then right-click another layer → <strong>Styles → Paste Style</strong>
          </p>
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Part 4: Filtering and Querying</h2>

        <KeyConcept title="Filtering Without Losing Data">
          <p>
            QGIS filters hide features visually but keep all data intact. You can easily toggle filters
            on and off to explore different subsets of your movement data.
          </p>
        </KeyConcept>

        <h3 className="text-xl font-bold text-gray-800 mb-3">Quick Filter Examples</h3>

        <div className="space-y-3 mb-6">
          <div className="bg-gray-50 border rounded-lg p-3">
            <p className="font-mono text-sm text-gray-800 mb-1">"total_animals" &gt; 500</p>
            <p className="text-xs text-gray-600">Show only high-volume movement routes (500+ animals)</p>
          </div>
          <div className="bg-gray-50 border rounded-lg p-3">
            <p className="font-mono text-sm text-gray-800 mb-1">"origin" = 'Ondangwa' OR "destination" = 'Ondangwa'</p>
            <p className="text-xs text-gray-600">Show all movements to/from Ondangwa constituency</p>
          </div>
          <div className="bg-gray-50 border rounded-lg p-3">
            <p className="font-mono text-sm text-gray-800 mb-1">"flow_balance" = 'Net Exporter'</p>
            <p className="text-xs text-gray-600">Highlight constituencies that export more animals than they receive</p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-800 mb-2">How to Apply a Filter</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Right-click the layer → <strong>Filter...</strong></li>
            <li>Enter your filter expression in the box</li>
            <li>Click <strong>Test</strong> to see how many features match</li>
            <li>Click <strong>OK</strong> to apply</li>
            <li>To remove filter: Right-click → Filter... → <strong>Clear</strong></li>
          </ol>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Part 5: Creating a Map for Export</h2>

        <p className="text-gray-700 mb-4">
          QGIS has a powerful <strong>Print Layout</strong> feature for creating publication-ready maps
          with legends, scale bars, north arrows, and titles.
        </p>

        <div className="space-y-4 mb-6">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
              <div>
                <h4 className="font-bold text-gray-800">Create New Print Layout</h4>
                <p className="text-sm text-gray-600">
                  Project → New Print Layout → Enter a name (e.g., "NCA Movement Map")
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
              <div>
                <h4 className="font-bold text-gray-800">Add Map</h4>
                <p className="text-sm text-gray-600">
                  Add Item → Add Map → Draw a rectangle on the page → Adjust extent with "Set Map Extent to Match Main Canvas"
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
              <div>
                <h4 className="font-bold text-gray-800">Add Legend, Scale Bar, Title</h4>
                <p className="text-sm text-gray-600">
                  Add Item → Add Legend / Add Scale Bar / Add Label for title
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</span>
              <div>
                <h4 className="font-bold text-gray-800">Export</h4>
                <p className="text-sm text-gray-600">
                  Layout → Export as Image (PNG/JPG) or Export as PDF
                </p>
              </div>
            </div>
          </div>
        </div>

        <Callout type="tip" title="Quick Export Without Layout">
          <p>
            For quick exports without full map composition, use <strong>Project → Import/Export → Export Map to Image</strong>.
            This exports exactly what you see on the map canvas.
          </p>
        </Callout>
      </section>

      <Exercise title="Practical: Create a Movement Flow Map" type="individual" duration="30 min">
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Export the NCA movement data from R as a GeoPackage</li>
          <li>Import into QGIS along with constituency boundaries</li>
          <li>Style the flow lines by total animals moved</li>
          <li>Filter to show only the top 20% highest-volume routes</li>
          <li>Add constituency labels for the top 5 trading constituencies</li>
          <li>Create a simple print layout with title and legend</li>
          <li>Export as PNG for your report</li>
        </ol>
        <p className="mt-4 text-sm text-gray-500 italic">
          This map could be used in a surveillance report to show major livestock movement corridors.
        </p>
      </Exercise>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Adding the Veterinary Cordon Fence</h2>
        <p className="text-gray-700 mb-4">
          For FMD surveillance, it's essential to show the VCF boundary on your movement maps:
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-red-800 mb-2">Styling the VCF</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-red-900">
            <li>Add the VCF shapefile: Layer → Add Vector Layer → <code className="bg-red-100 px-1 rounded">VCF_2018.shp</code></li>
            <li>Double-click layer → Symbology</li>
            <li>Choose a <strong>distinctive line style</strong>:
              <ul className="ml-6 mt-1">
                <li>• Color: <span className="font-bold text-red-600">Red</span></li>
                <li>• Width: 1.5-2.0 mm</li>
                <li>• Style: Dashed or Dash-Dot</li>
              </ul>
            </li>
            <li>Move VCF layer <strong>above constituencies but below flows</strong></li>
          </ol>
        </div>

        <Callout type="warning" title="VCF Crossing Analysis">
          <p>
            Movements crossing the VCF are particularly important for FMD surveillance.
            You can visually identify these on your map, or use QGIS spatial analysis
            tools to select flows that intersect the VCF line.
          </p>
        </Callout>
      </section>

      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
        <h3 className="font-bold text-amber-800 mb-3">Summary: What You've Learned</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-amber-700 mb-2">R Export Skills</h4>
            <ul className="text-amber-900 space-y-1">
              <li>• Create line geometries from point coordinates</li>
              <li>• Export as GeoPackage (recommended) or Shapefile</li>
              <li>• Join attribute data to spatial features</li>
              <li>• Filter and subset spatial data</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-amber-700 mb-2">QGIS Skills</h4>
            <ul className="text-amber-900 space-y-1">
              <li>• Import vector and CSV layers</li>
              <li>• Navigate and explore spatial data</li>
              <li>• Apply graduated and categorised symbology</li>
              <li>• Add arrows to movement flows</li>
              <li>• Filter features by attribute</li>
              <li>• Create print layouts for reports</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link to="/day5/session1" className="text-orange-500 hover:underline">
          ← Previous: Network Analysis
        </Link>
        <Link
          to="/"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Workshop Complete! →
        </Link>
      </div>
    </div>
  )
}
