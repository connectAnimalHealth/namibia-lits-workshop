import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Component to fit map bounds to data
function FitBounds({ bounds }) {
  const map = useMap()
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [20, 20] })
    }
  }, [bounds, map])
  return null
}

export default function NCAMap() {
  const [constituencies, setConstituencies] = useState(null)
  const [freeZones, setFreeZones] = useState(null)
  const [vcf, setVcf] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [hoveredConstituency, setHoveredConstituency] = useState(null)
  const [activeLayer, setActiveLayer] = useState('both') // 'fmd', 'nca', or 'both'

  useEffect(() => {
    // Load GeoJSON data
    Promise.all([
      fetch('/namibia-lits-workshop/data/nam_constituency_4326.geojson').then(r => r.json()),
      fetch('/namibia-lits-workshop/data/nam_free_4326.geojson').then(r => r.json()),
      fetch('/namibia-lits-workshop/data/vcf_4326.geojson').then(r => r.json())
    ]).then(([constData, freeData, vcfData]) => {
      setConstituencies(constData)
      setFreeZones(freeData)
      setVcf(vcfData)

      // Calculate bounds from free zones
      const coords = []
      freeData.features.forEach(f => {
        if (f.geometry.type === 'MultiPolygon') {
          f.geometry.coordinates.forEach(poly => {
            poly.forEach(ring => {
              ring.forEach(coord => coords.push([coord[1], coord[0]]))
            })
          })
        } else if (f.geometry.type === 'Polygon') {
          f.geometry.coordinates.forEach(ring => {
            ring.forEach(coord => coords.push([coord[1], coord[0]]))
          })
        }
      })
      if (coords.length > 0) {
        const lats = coords.map(c => c[0])
        const lngs = coords.map(c => c[1])
        setBounds([
          [Math.min(...lats), Math.min(...lngs)],
          [Math.max(...lats), Math.max(...lngs)]
        ])
      }
    })
  }, [])

  // Style for official FMD zones
  const freeZoneStyle = (feature) => {
    const isFree = feature.properties.zone === 'FMD free'
    return {
      fillColor: isFree ? '#c8e6c9' : '#ffcccb',
      weight: 3,
      opacity: 1,
      color: isFree ? '#2e7d32' : '#c62828',
      fillOpacity: activeLayer === 'fmd' ? 0.5 : 0.3
    }
  }

  // Style for NCA constituencies
  const constituencyStyle = (feature) => {
    const isNCA = feature.properties.nca === true || feature.properties.nca === 'true'
    return {
      fillColor: isNCA ? '#ff9800' : '#2196f3',
      weight: 1,
      opacity: 0.8,
      color: '#333',
      fillOpacity: activeLayer === 'nca' ? 0.5 : 0.3
    }
  }

  // Style for VCF line
  const vcfStyle = {
    color: '#c8102e',
    weight: 4,
    opacity: 1,
    dashArray: '10, 5'
  }

  // Hover handlers for constituencies
  const onEachConstituency = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target
        layer.setStyle({
          weight: 3,
          color: '#ff4815',
          fillOpacity: 0.6
        })
        layer.bringToFront()
        setHoveredConstituency(feature.properties)
      },
      mouseout: (e) => {
        const layer = e.target
        layer.setStyle(constituencyStyle(feature))
        setHoveredConstituency(null)
      }
    })
  }

  if (!freeZones) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Layer toggle buttons */}
      <div className="absolute top-4 left-16 z-[1000] bg-white rounded-lg shadow-md p-2 flex gap-1">
        <button
          onClick={() => setActiveLayer('both')}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            activeLayer === 'both'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          Both
        </button>
        <button
          onClick={() => setActiveLayer('fmd')}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            activeLayer === 'fmd'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          FMD Status
        </button>
        <button
          onClick={() => setActiveLayer('nca')}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            activeLayer === 'nca'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          NCA
        </button>
      </div>

      <div className="h-96 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
        <MapContainer
          center={[-18.5, 17.5]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Official FMD zones layer */}
          {freeZones && (activeLayer === 'both' || activeLayer === 'fmd') && (
            <GeoJSON
              key={`fmd-${activeLayer}`}
              data={freeZones}
              style={freeZoneStyle}
            />
          )}
          {/* NCA constituency layer */}
          {constituencies && (activeLayer === 'both' || activeLayer === 'nca') && (
            <GeoJSON
              key={`nca-${activeLayer}`}
              data={constituencies}
              style={constituencyStyle}
              onEachFeature={onEachConstituency}
            />
          )}
          {/* VCF line */}
          {vcf && (
            <GeoJSON data={vcf} style={vcfStyle} />
          )}
          {bounds && <FitBounds bounds={bounds} />}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md text-sm z-[1000]">
        {(activeLayer === 'both' || activeLayer === 'fmd') && (
          <div className="mb-3">
            <div className="font-semibold mb-1 text-gray-700">FMD Status (Official)</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#c8e6c9', border: '2px solid #2e7d32' }}></div>
              <span>FMD-Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ffcccb', border: '2px solid #c62828' }}></div>
              <span>No Status</span>
            </div>
          </div>
        )}
        {(activeLayer === 'both' || activeLayer === 'nca') && (
          <div className={activeLayer === 'both' ? 'border-t pt-2' : ''}>
            <div className="font-semibold mb-1 text-gray-700">NCA Constituencies</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ff9800', border: '1px solid #333' }}></div>
              <span>NCA (Northern Communal Areas)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#2196f3', border: '1px solid #333' }}></div>
              <span>Non-NCA</span>
            </div>
          </div>
        )}
        <div className="border-t pt-2 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0 border-t-2 border-dashed" style={{ borderColor: '#c8102e' }}></div>
            <span>Veterinary Cordon Fence</span>
          </div>
        </div>
      </div>

      {/* Hover info */}
      {hoveredConstituency && (
        <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md text-sm z-[1000] min-w-48">
          <div className="font-semibold text-woah-orange">{hoveredConstituency.const}</div>
          <div className="text-gray-600">Region: {hoveredConstituency.region}</div>
          <div className="text-gray-600">Population: {Number(hoveredConstituency.population).toLocaleString()}</div>
          <div className={`font-medium ${hoveredConstituency.nca ? 'text-orange-600' : 'text-blue-600'}`}>
            {hoveredConstituency.nca ? 'NCA Constituency' : 'Non-NCA Constituency'}
          </div>
        </div>
      )}
    </div>
  )
}
