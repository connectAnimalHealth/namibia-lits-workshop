import Callout from '../components/Callout'

export default function NamibiaContext() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-namibia-blue mb-2">Namibia Veterinary Context</h1>
        <p className="text-gray-600">Understanding the regulatory framework for livestock movement in Namibia</p>
      </div>

      {/* Map placeholder */}
      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
        [Map: Namibia FMD Zones and Veterinary Cordon Fence]
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Veterinary Cordon Fence (VCF)</h2>
        <p className="text-gray-700 mb-4">
          The Veterinary Cordon Fence, also known as the "Red Line," is a critical disease control 
          infrastructure that separates the Northern Communal Areas (NCA) from the rest of Namibia. 
          Originally established during the German colonial period and expanded over time, it serves 
          as the primary barrier against Foot-and-Mouth Disease (FMD) transmission.
        </p>
        <Callout type="info" title="Key Points">
          <ul className="list-disc list-inside space-y-1">
            <li>Stretches approximately 1,500 km across northern Namibia</li>
            <li>Separates FMD-infected zones from FMD-free zones</li>
            <li>All livestock movements across the fence require permits and health certification</li>
            <li>Critical for maintaining Namibia's beef export status to the EU</li>
          </ul>
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">FMD Zones in Namibia</h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">FMD-Free Zone (South of VCF)</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Commercial farming areas</li>
              <li>• EU-approved export eligibility</li>
              <li>• Regular surveillance and testing</li>
              <li>• Vaccination prohibited</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="font-bold text-red-800 mb-2">NCA / Protection Zone (North of VCF)</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Communal farming areas</li>
              <li>• Higher FMD risk from wildlife interface</li>
              <li>• Vaccination campaigns conducted</li>
              <li>• Export restrictions apply</li>
            </ul>
          </div>
        </div>

        <Callout type="warning" title="Wildlife Interface">
          The NCA borders countries with endemic FMD and has significant wildlife populations 
          (buffalo) that serve as FMD reservoirs. This makes movement control critical.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">LITS - Livestock Identification and Traceability System</h2>
        <p className="text-gray-700 mb-4">
          Namibia's LITS is a comprehensive system for tracking livestock from birth to slaughter. 
          It is essential for disease control, movement monitoring, and maintaining export market access.
        </p>
        
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Key LITS Components</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-namibia-blue">Animal Identification</p>
              <ul className="text-gray-600 mt-1 space-y-1">
                <li>• Ear tags with unique identifiers</li>
                <li>• Brand marks for ownership</li>
                <li>• Electronic RFID (in some areas)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-namibia-blue">Movement Permits</p>
              <ul className="text-gray-600 mt-1 space-y-1">
                <li>• Required for all inter-farm movements</li>
                <li>• Issued by State Veterinarians</li>
                <li>• Recorded in central database</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-namibia-blue">Holding Registration</p>
              <ul className="text-gray-600 mt-1 space-y-1">
                <li>• All farms registered with unique IDs</li>
                <li>• GPS coordinates recorded</li>
                <li>• Owner details maintained</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-namibia-blue">Movement Records</p>
              <ul className="text-gray-600 mt-1 space-y-1">
                <li>• Origin and destination farms</li>
                <li>• Number and type of animals</li>
                <li>• Date and purpose of movement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Movement Control Regulations</h2>
        
        <Callout type="tip" title="Why Movement Data Matters">
          Understanding movement patterns allows us to:
          <ul className="list-disc list-inside mt-2">
            <li>Identify high-risk pathways for disease spread</li>
            <li>Target surveillance activities effectively</li>
            <li>Model outbreak scenarios</li>
            <li>Design risk-based interventions</li>
          </ul>
        </Callout>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Movement Permit Requirements</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Movement Type</th>
                <th className="text-left py-2">Requirements</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b">
                <td className="py-2">Within FMD-free zone</td>
                <td className="py-2">Movement permit, LITS registration</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">NCA to FMD-free zone</td>
                <td className="py-2">Quarantine (21 days), testing, vaccination history</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">To abattoir</td>
                <td className="py-2">Ante-mortem inspection, movement permit</td>
              </tr>
              <tr>
                <td className="py-2">Export</td>
                <td className="py-2">Full traceability, health certification, EU compliance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}