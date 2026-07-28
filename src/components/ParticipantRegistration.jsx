import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Users, MapPin, RefreshCw, Camera, X } from 'lucide-react'

// JSONBin.io configuration - Workshop Participants
// Using same API key, separate bin for participant data
const JSONBIN_API_KEY = '$2a$10$ipV/tMP6D6kr/M.RsIdMy.T6mr3cwNMJ8/Oj/4xZW6eKjh9rH.XZ2'
const JSONBIN_BIN_ID = '6a2e3c84f5f4af5e29eeb141' // Workshop participants bin

// All Namibia Constituencies organized by region
const ALL_CONSTITUENCIES = [
  // Ohangwena
  "Eenhana", "Endola", "Engela", "Epembe", "Ohangwena", "Okongo", "Omulonga", "Ondobe", "Ongenga", "Oshikango", "Oshikunde", "Omundaungilo",
  // Oshikoto
  "Eengondi", "Guinas", "Nehale LyaMpingana", "Okankolo", "Olukonda", "Omuntele", "Omuthiyagwiipundi", "Onayena", "Oniipa", "Onyaanya", "Tsumeb",
  // Oshana
  "Okatana", "Okaku", "Ompundja", "Ondangwa Rural", "Ondangwa Urban", "Ongwediva", "Oshakati East", "Oshakati West", "Uukwiyu", "Uuvudhiya",
  // Omusati
  "Anamulenge", "Elim", "Etayi", "Ogongo", "Okahao", "Okalongo", "Onesi", "Oshikuku", "Otamanzi", "Outapi", "Ruacana", "Tsandi",
  // Kunene
  "Epupa", "Kamanjab", "Khorixas", "Opuwo Rural", "Opuwo Urban", "Outjo", "Sesfontein",
  // Kavango West
  "Kapako", "Mankumpi", "Mpungu", "Musese", "Ncamagoro", "Ncuncuni", "Nkurenkure", "Tondoro",
  // Kavango East
  "Mashare", "Mukwe", "Ndiyona", "Ndonga Linena", "Rundu Rural", "Rundu Urban",
  // Zambezi
  "Judea Lyaboloma", "Kabbe North", "Kabbe South", "Katima Mulilo Rural", "Katima Mulilo Urban", "Kongola", "Linyanti", "Sibbinda",
  // Otjozondjupa
  "Grootfontein", "Okahandja", "Okakarara", "Omatako", "Otavi", "Otjiwarongo", "Tsumkwe",
  // Erongo
  "Arandis", "Daures", "Karibib", "Omaruru", "Swakopmund", "Walvis Bay Rural", "Walvis Bay Urban",
  // Khomas
  "John Pandeni", "Katutura Central", "Katutura East", "Khomasdal", "Moses ||GaroÃ«b", "Samora Machel", "Tobias Hainyeko", "Windhoek East", "Windhoek Rural", "Windhoek West",
  // Omaheke
  "Aminuis", "Epukiro", "Gobabis", "Kalahari", "Okarukambe", "Otjinene", "Otjombinde",
  // Hardap
  "Aranos", "Daweb", "Gibeon", "Mariental Rural", "Mariental Urban", "Rehoboth East Urban", "Rehoboth Rural", "Rehoboth West Urban",
  // //Karas
  "!Nami?NÃ¼s", "Berseba", "Karasburg East", "Karasburg West", "Keetmanshoop Rural", "Keetmanshoop Urban", "Orangemund", "Okatyali"
].sort()

export default function ParticipantRegistration({ title = "Workshop Participants", showTable = true, showForm = true }) {
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [selectedConstituencies, setSelectedConstituencies] = useState([])
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [showAllOption, setShowAllOption] = useState(false)
  const [isNA, setIsNA] = useState(false)
  const [photo, setPhoto] = useState(null) // base64 string
  const [dataLoaded, setDataLoaded] = useState(false) // Track if data was successfully loaded
  const fileInputRef = useRef(null)

  // Editing state
  const [editingIndex, setEditingIndex] = useState(null)
  const [editName, setEditName] = useState('')
  const [editOrganization, setEditOrganization] = useState('')
  const [editConstituencies, setEditConstituencies] = useState('')
  const [editPhoto, setEditPhoto] = useState(null)
  const editFileInputRef = useRef(null)

  // Fetch existing participants on load
  useEffect(() => {
    fetchParticipants()
  }, [])

  const fetchParticipants = async () => {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Access-Key': JSONBIN_API_KEY
        }
      })

      if (response.status === 404) {
        // Bin doesn't exist yet - that's OK, we'll create on first save
        setParticipants([])
        setDataLoaded(true)
        return
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      setParticipants(data.record || [])
      setDataLoaded(true)
    } catch (err) {
      console.error('Failed to fetch participants:', err)
      // IMPORTANT: Don't clear participants on error - this was causing data loss!
      // Keep existing state and show error to user
      setError('Failed to load participant list. Please refresh the page before registering.')
      setDataLoaded(false)
    }
  }

  // Fetch fresh data from server (used before saving to avoid race conditions)
  const fetchFreshParticipants = async () => {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Access-Key': JSONBIN_API_KEY
        }
      })

      if (response.status === 404) {
        return [] // Bin doesn't exist yet
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      return data.record || []
    } catch (err) {
      console.error('Failed to fetch fresh participants:', err)
      return null // Return null to indicate failure
    }
  }

  const saveToJsonBin = async (updatedParticipants, existingCount, allowReduction = false) => {
    try {
      // CRITICAL SAFETY CHECK: Never allow saving fewer participants than currently exist
      // Unless explicitly allowed (e.g., user confirmed deletion)
      if (!allowReduction && updatedParticipants.length < existingCount) {
        console.error(`BLOCKED: Attempted to save ${updatedParticipants.length} participants but ${existingCount} exist on server. This would cause data loss.`)
        return { ok: false, error: 'DATA_LOSS_PREVENTED' }
      }

      // Double-check by fetching current count from server right before save (skip if allowing reduction)
      if (!allowReduction) {
        const serverData = await fetchFreshParticipants()
        if (serverData !== null && updatedParticipants.length < serverData.length) {
          console.error(`BLOCKED: Server has ${serverData.length} participants, attempted to save ${updatedParticipants.length}. This would cause data loss.`)
          return { ok: false, error: 'DATA_LOSS_PREVENTED' }
        }
      }

      // Try to update existing bin
      let response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(updatedParticipants)
      })

      // If bin doesn't exist (404), create it
      if (response.status === 404) {
        response = await fetch('https://api.jsonbin.io/v3/b', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': JSONBIN_API_KEY,
            'X-Bin-Name': 'namibia-lits-workshop-participants'
          },
          body: JSON.stringify(updatedParticipants)
        })
      }

      return { ok: response.ok, error: null }
    } catch (err) {
      console.error('Failed to save:', err)
      return { ok: false, error: err.message }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !organization.trim()) return

    setLoading(true)
    setError(null)

    // SAFETY CHECK: Ensure we have loaded data before allowing registration
    // This prevents overwriting existing data if fetch failed
    if (!dataLoaded) {
      setError('Participant list not loaded. Please refresh the page and try again.')
      setLoading(false)
      return
    }

    let constituencies
    if (isNA) {
      constituencies = ['N/A (Facilitator/Observer)']
    } else if (showAllOption) {
      constituencies = ['All Constituencies']
    } else if (selectedConstituencies.length === 0) {
      setError('Please select at least one constituency, "All", or "N/A"')
      setLoading(false)
      return
    } else {
      constituencies = selectedConstituencies
    }

    const newParticipant = {
      name: name.trim(),
      organization: organization.trim(),
      constituencies: constituencies,
      photo: photo || null,
      timestamp: new Date().toISOString()
    }

    // IMPORTANT: Fetch fresh data from server before saving to avoid race conditions
    // This ensures we don't overwrite registrations made by others
    const freshParticipants = await fetchFreshParticipants()
    if (freshParticipants === null) {
      setError('Could not connect to server. Please check your internet and try again.')
      setLoading(false)
      return
    }

    // Check if participant already exists (by name) in FRESH data
    const existingIndex = freshParticipants.findIndex(p =>
      p.name.toLowerCase() === name.trim().toLowerCase()
    )

    let updatedParticipants
    if (existingIndex >= 0) {
      // Update existing
      updatedParticipants = freshParticipants.map((p, i) =>
        i === existingIndex ? newParticipant : p
      )
    } else {
      // Add new
      updatedParticipants = [...freshParticipants, newParticipant]
    }

    const saveResult = await saveToJsonBin(updatedParticipants, freshParticipants.length)
    if (saveResult.ok) {
      setParticipants(updatedParticipants)
      setName('')
      setOrganization('')
      setSelectedConstituencies([])
      setShowAllOption(false)
      setIsNA(false)
      setPhoto(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } else if (saveResult.error === 'DATA_LOSS_PREVENTED') {
      setError('Save blocked: Would have caused data loss. Please refresh and try again.')
    } else {
      setError('Failed to save. Please try again.')
    }

    setLoading(false)
  }

  const handleConstituencyToggle = (constituency) => {
    setSelectedConstituencies(prev =>
      prev.includes(constituency)
        ? prev.filter(c => c !== constituency)
        : [...prev, constituency]
    )
  }

  // Handle photo upload - compress and convert to base64
  const handlePhotoChange = (e, isEdit = false) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file size (max 2MB before compression)
    if (file.size > 2 * 1024 * 1024) {
      setError('Photo must be less than 2MB')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      // Create image to resize
      const img = new Image()
      img.onload = () => {
        // Resize to max 200x200 for avatar
        const canvas = document.createElement('canvas')
        const MAX_SIZE = 200
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width
            width = MAX_SIZE
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height
            height = MAX_SIZE
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to base64 with compression
        const base64 = canvas.toDataURL('image/jpeg', 0.7)

        if (isEdit) {
          setEditPhoto(base64)
        } else {
          setPhoto(base64)
        }
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  const clearPhoto = (isEdit = false) => {
    if (isEdit) {
      setEditPhoto(null)
      if (editFileInputRef.current) editFileInputRef.current.value = ''
    } else {
      setPhoto(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const deleteParticipant = async (index) => {
    if (!confirm('Remove this participant?')) return

    const updatedParticipants = participants.filter((_, i) => i !== index)
    setLoading(true)
    if (await saveToJsonBin(updatedParticipants)) {
      setParticipants(updatedParticipants)
    } else {
      setError('Failed to delete.')
    }
    setLoading(false)
  }

  const startEdit = (index, participant) => {
    setEditingIndex(index)
    setEditName(participant.name)
    setEditOrganization(participant.organization)
    // Convert constituencies array to comma-separated string for simple editing
    const constStr = Array.isArray(participant.constituencies)
      ? participant.constituencies.join(', ')
      : ''
    setEditConstituencies(constStr)
    setEditPhoto(participant.photo || null)
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditName('')
    setEditOrganization('')
    setEditConstituencies('')
    setEditPhoto(null)
    if (editFileInputRef.current) editFileInputRef.current.value = ''
  }

  const saveEdit = async (index) => {
    if (!editName.trim() || !editOrganization.trim()) return

    // Parse constituencies - could be "All NCA", "N/A", or comma-separated list
    let constituencies
    const constTrimmed = editConstituencies.trim()
    if (constTrimmed.toLowerCase().includes('all')) {
      constituencies = ['All Constituencies']
    } else if (constTrimmed.toLowerCase().includes('n/a') || constTrimmed === '') {
      constituencies = ['N/A (Facilitator/Observer)']
    } else {
      constituencies = constTrimmed.split(',').map(c => c.trim()).filter(c => c)
    }

    const updatedParticipants = participants.map((p, i) =>
      i === index
        ? {
            ...p,
            name: editName.trim(),
            organization: editOrganization.trim(),
            constituencies: constituencies,
            photo: editPhoto
          }
        : p
    )

    setLoading(true)
    const saveResult = await saveToJsonBin(updatedParticipants, participants.length)
    if (saveResult.ok) {
      setParticipants(updatedParticipants)
      cancelEdit()
    } else if (saveResult.error === 'DATA_LOSS_PREVENTED') {
      setError('Save blocked: Would have caused data loss. Please refresh and try again.')
    } else {
      setError('Failed to save changes.')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Registration Form */}
      {showForm && (
      <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-woah-orange mb-4 flex items-center gap-2">
          <Users className="h-6 w-6" />
          {title}
        </h3>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {submitted && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            ✓ Registration saved! Welcome to the workshop.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John Grewar"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization / Role *
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g., DVS - State Vet Kunene"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Camera className="inline h-4 w-4 mr-1" />
              Photo (optional)
            </label>
            <div className="flex items-center gap-4">
              {photo ? (
                <div className="relative">
                  <img
                    src={photo}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-300"
                  />
                  <button
                    type="button"
                    onClick={() => clearPhoto(false)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <Camera className="h-6 w-6" />
                </div>
              )}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(e, false)}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded border border-gray-300"
                >
                  {photo ? 'Change Photo' : 'Upload Photo'}
                </label>
                <p className="text-xs text-gray-500 mt-1">Max 2MB, will be resized to 200x200</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Constituencies you work with *
            </label>

            {/* Quick options */}
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAllOption}
                  onChange={(e) => {
                    setShowAllOption(e.target.checked)
                    if (e.target.checked) {
                      setIsNA(false)
                      setSelectedConstituencies([])
                    }
                  }}
                  className="h-4 w-4 text-orange-500 rounded"
                />
                <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded">
                  All Constituencies
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNA}
                  onChange={(e) => {
                    setIsNA(e.target.checked)
                    if (e.target.checked) {
                      setShowAllOption(false)
                      setSelectedConstituencies([])
                    }
                  }}
                  className="h-4 w-4 text-orange-500 rounded"
                />
                <span className="text-sm font-medium text-gray-700 bg-gray-200 px-2 py-0.5 rounded">
                  N/A (Facilitator / Observer)
                </span>
              </label>
            </div>

            {/* Individual constituency selection */}
            {!showAllOption && !isNA && (
              <div className="border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto bg-gray-50">
                <p className="text-xs text-gray-500 mb-2">
                  Select all that apply (or use quick options above):
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {ALL_CONSTITUENCIES.map(constituency => (
                    <label key={constituency} className="flex items-center gap-1.5 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={selectedConstituencies.includes(constituency)}
                        onChange={() => handleConstituencyToggle(constituency)}
                        className="h-3.5 w-3.5 text-orange-500 rounded"
                      />
                      <span className="text-gray-700 truncate">{constituency}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {selectedConstituencies.length > 0 && !showAllOption && !isNA && (
              <p className="text-sm text-orange-600 mt-2">
                Selected: {selectedConstituencies.length} constituencies
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Register for Workshop'}
          </button>
        </form>
      </div>
      )}

      {/* Participants Table */}
      {showTable && participants.length === 0 && !showForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-500">
          <Users className="h-10 w-10 mx-auto mb-2 text-gray-400" />
          <p>No participants registered yet.</p>
          <Link to="/pre-workshop" className="text-orange-500 hover:underline text-sm mt-1 inline-block">
            Register in Pre-Workshop Setup →
          </Link>
        </div>
      )}
      {showTable && participants.length > 0 && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-orange-500 text-white px-4 py-3 flex justify-between items-center">
            <h4 className="font-bold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Workshop Participants ({participants.length})
            </h4>
            <button
              onClick={fetchParticipants}
              className="text-white/80 hover:text-white p-1"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold w-16"></th>
                  <th className="px-4 py-2 text-left font-semibold">Name</th>
                  <th className="px-4 py-2 text-left font-semibold">Organization / Role</th>
                  <th className="px-4 py-2 text-left font-semibold">Constituencies</th>
                  <th className="px-4 py-2 text-right font-semibold w-24"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {participants.map((participant, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {editingIndex === i ? (
                      <>
                        <td className="px-2 py-1">
                          <div className="flex items-center gap-2">
                            {editPhoto ? (
                              <div className="relative">
                                <img src={editPhoto} alt="" className="w-10 h-10 rounded-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => clearPhoto(true)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                                >
                                  <X className="h-2 w-2" />
                                </button>
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <Camera className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                            <input
                              type="file"
                              ref={editFileInputRef}
                              accept="image/*"
                              onChange={(e) => handlePhotoChange(e, true)}
                              className="hidden"
                              id={`edit-photo-${i}`}
                            />
                            <label
                              htmlFor={`edit-photo-${i}`}
                              className="cursor-pointer text-xs text-blue-500 hover:text-blue-700"
                            >
                              {editPhoto ? '↻' : '+'}
                            </label>
                          </div>
                        </td>
                        <td className="px-2 py-1">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="Name"
                          />
                        </td>
                        <td className="px-2 py-1">
                          <input
                            type="text"
                            value={editOrganization}
                            onChange={(e) => setEditOrganization(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="Organization"
                          />
                        </td>
                        <td className="px-2 py-1">
                          <input
                            type="text"
                            value={editConstituencies}
                            onChange={(e) => setEditConstituencies(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="All, N/A, or comma-separated"
                          />
                        </td>
                        <td className="px-2 py-1 text-right whitespace-nowrap">
                          <button
                            onClick={() => saveEdit(i)}
                            className="text-xs text-green-600 hover:text-green-800 mr-2"
                            disabled={loading}
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-xs text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2">
                          {participant.photo ? (
                            <img
                              src={participant.photo}
                              alt={participant.name}
                              className="w-10 h-10 rounded-full object-cover border border-gray-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                              {participant.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-800">
                          {participant.name}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {participant.organization}
                        </td>
                        <td className="px-4 py-2">
                          {Array.isArray(participant.constituencies) ? (
                            participant.constituencies.length === 1 ? (
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                participant.constituencies[0].includes('All')
                                  ? 'bg-green-100 text-green-700'
                                  : participant.constituencies[0].includes('N/A')
                                    ? 'bg-gray-200 text-gray-600'
                                    : 'bg-blue-100 text-blue-700'
                              }`}>
                                {participant.constituencies[0]}
                              </span>
                            ) : (
                              <span className="text-xs text-gray-600">
                                {participant.constituencies.slice(0, 3).join(', ')}
                                {participant.constituencies.length > 3 && (
                                  <span className="text-gray-400"> +{participant.constituencies.length - 3} more</span>
                                )}
                              </span>
                            )
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-right whitespace-nowrap">
                          <button
                            onClick={() => startEdit(i, participant)}
                            className="text-xs text-blue-500 hover:text-blue-700 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteParticipant(i)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            Remove
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
    </div>
  )
}
