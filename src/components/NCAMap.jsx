import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Color scale for outbreak years
const yearColors = {
  2007: '#d62728',
  2008: '#ff7f0e',
  2010: '#2ca02c',
  2011: '#1f77b4',
  2013: '#9467bd',
  2014: '#8c564b',
  2015: '#e377c2',
  2017: '#7f7f7f',
  2019: '#bcbd22',
  2020: '#17becf',
  2021: '#ff6347',
  2022: '#9932cc'
}

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
  const [fmdOutbreaks, setFmdOutbreaks] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [hoveredConstituency, setHoveredConstituency] = useState(null)
  const [showFmdZones, setShowFmdZones] = useState(true)
  const [showNca, setShowNca] = useState(true)
  const [showOutbreaks, setShowOutbreaks] = useState(true)

  useEffect(() => {
    // Load GeoJSON data
    Promise.all([
      fetch('/namibia-lits-workshop/data/nam_constituency_4326.geojson').then(r => r.json()),
      fetch('/namibia-lits-workshop/data/nam_free_4326.geojson').then(r => r.json()),
      fetch('/namibia-lits-workshop/data/vcf_4326.geojson').then(r => r.json()),
      fetch('/namibia-lits-workshop/data/nam_fmd_4326.geojson').then(r => r.json())
    ]).then(([constData, freeData, vcfData, fmdData]) => {
      setConstituencies(constData)
      setFreeZones(freeData)
      setVcf(vcfData)
      setFmdOutbreaks(fmdData)

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
      fillOpacity: 0.4
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
      fillOpacity: 0.4
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
          onClick={() => setShowFmdZones(!showFmdZones)}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            showFmdZones
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          FMD Zones
        </button>
        <button
          onClick={() => setShowNca(!showNca)}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            showNca
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          NCA
        </button>
        <button
          onClick={() => setShowOutbreaks(!showOutbreaks)}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            showOutbreaks
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          Outbreaks
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
          {freeZones && showFmdZones && (
            <GeoJSON
              key={`fmd-${showFmdZones}`}
              data={freeZones}
              style={freeZoneStyle}
            />
          )}
          {/* NCA constituency layer */}
          {constituencies && showNca && (
            <GeoJSON
              key={`nca-${showNca}`}
              data={constituencies}
              style={constituencyStyle}
              onEachFeature={onEachConstituency}
            />
          )}
          {/* VCF line */}
          {vcf && (
            <GeoJSON data={vcf} style={vcfStyle} />
          )}
          {/* FMD Outbreak points */}
          {fmdOutbreaks && showOutbreaks && fmdOutbreaks.features.map((feature, idx) => {
            const coords = feature.geometry.coordinates
            const year = feature.properties.outbreakYear
            const color = yearColors[year] || '#666'
            return (
              <CircleMarker
                key={`fmd-${idx}`}
                center={[coords[1], coords[0]]}
                radius={6}
                fillColor={color}
                color="#fff"
                weight={1}
                fillOpacity={0.8}
              >
                <Popup>
                  <div className="text-sm">
                    <div className="font-bold text-red-600">{feature.properties.Disease}</div>
                    <div><strong>Year:</strong> {year}</div>
                    <div><strong>Location:</strong> {feature.properties.Locality}</div>
                    <div><strong>Species:</strong> {feature.properties.Species_Name}</div>
                    <div><strong>Cases:</strong> {feature.properties.Cases}</div>
                    <div><strong>Susceptible:</strong> {feature.properties.Susceptible}</div>
                    <div><strong>Status:</strong> {feature.properties.Event_Status}</div>
                  </div>
                </Popup>
              </CircleMarker>
            )
          })}
          {bounds && <FitBounds bounds={bounds} />}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md text-sm z-[1000]">
        {showFmdZones && (
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
        {showNca && (
          <div className={showFmdZones ? 'border-t pt-2' : ''}>
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
        <div className={(showFmdZones || showNca) ? 'border-t pt-2 mt-2' : ''}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0 border-t-2 border-dashed" style={{ borderColor: '#c8102e' }}></div>
            <span>Veterinary Cordon Fence</span>
          </div>
        </div>
        {showOutbreaks && (
          <div className={(showFmdZones || showNca) ? 'border-t pt-2 mt-2' : ''}>
            <div className="font-semibold mb-1 text-gray-700">FMD Outbreaks by Year</div>
            <div className="grid grid-cols-3 gap-1 text-xs">
              {Object.entries(yearColors).map(([year, color]) => (
                <div key={year} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                  <span>{year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
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
