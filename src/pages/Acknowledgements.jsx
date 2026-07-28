import { User, Building2, Globe, ExternalLink } from 'lucide-react'

export default function Acknowledgements() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-sm font-medium text-woah-gold bg-woah-orange/10 px-2 py-1 rounded">
          Credits
        </span>
        <h1 className="text-3xl font-bold text-woah-orange mt-2 mb-2">
          Acknowledgements
        </h1>
        <p className="text-gray-600">
          The organizations and individuals who made this workshop possible
        </p>
      </div>

      {/* Facilitator Bio */}
      <section className="bg-white rounded-lg border-2 border-orange-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-woah-orange" />
          Workshop Facilitator
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src="https://equinesurveillance.org/landing/images/john.jpg"
              alt="Dr John Grewar"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Dr John Grewar</h3>
            <p className="text-woah-orange font-medium mb-4">BVSc, MSc, PhD - Specialist Veterinary Epidemiologist</p>

            <div className="prose prose-sm text-gray-700 space-y-3">
              <p>
                John Grewar is a registered specialist veterinary epidemiologist. He obtained his BVSc, MSc, and PhD
                from the University of Pretoria in 2006, 2009, and 2020 respectively, with his post-graduate studies
                focussed on veterinary epidemiology. His PhD specifically evaluated African horse sickness surveillance
                programs undertaken in South Africa's AHS controlled area.
              </p>
              <p>
                He is currently the Research and Innovation Manager at South African Equine Health and Protocols NPC,
                a company involved with equine health controls in South Africa. He is the director of JDATA Pty (Ltd)
                where he works with partners in the UK, South Africa, and Australia on animal health data systems.
              </p>
              <p>
                John is affiliated with the University of Pretoria as an extraordinary lecturer in the Production
                Animal Studies department. He also coordinated the Community of Practice for Sanitary and
                Phytosanitary Risk Assessment for the University of Pretoria.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="mailto:john@saehp.com"
                className="inline-flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-gray-700"
              >
                john@saehp.com
              </a>
              <a
                href="tel:+27836420610"
                className="inline-flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-gray-700"
              >
                +27 83 642 0610
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Organizations */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-woah-orange" />
          Supporting Organizations
        </h2>

        <div className="grid gap-6">
          {/* OHRT Project */}
          <div className="bg-white rounded-lg border-2 border-woah-gold-lighter p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-center gap-6 pb-4 border-b border-gray-100">
                <img
                  src="/namibia-lits-workshop/ack01.png"
                  alt="OHRT Project Logo"
                  className="h-20 w-auto"
                />
                <img
                  src="/namibia-lits-workshop/ack02.png"
                  alt="BMZ Logo"
                  className="h-20 w-auto"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  One Health Approach towards Rabies and Transboundary Animal Diseases Control Project (OHRT)
                </h3>
                <p className="text-woah-orange font-medium text-sm mb-3">Partial Workshop Funding</p>

                <p className="text-gray-700 mb-3">
                  The OHRT is a five-year project (2022-2026) funded by the German Federal Ministry for Economic
                  Cooperation and Development (BMZ) to strengthen Veterinary Services and increase food security
                  in Cameroon and Namibia. WOAH implements this project as part of its commitment to building
                  veterinary capacity in the region.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Project Outputs include:</h4>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Comprehensive rabies elimination program in the Northern Communal Area (NCA) of Namibia</li>
                    <li>Strengthened TADs surveillance and movement control in the NCA of Namibia</li>
                    <li>Support for global rabies and PPR control and eradication strategies</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* SAEHP */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <img
                  src="https://saehp.com/wp-content/uploads/2022/07/logo-2.png"
                  alt="SAEHP Logo"
                  className="h-20 w-auto"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  South African Equine Health & Protocols (NPC)
                </h3>
                <p className="text-green-700 font-medium text-sm mb-3">Primary Employer & Sponsor</p>

                <p className="text-gray-700 mb-3">
                  SAEHP is a team of professionals working in partnership with Government to protect the health
                  of the national equine herd and open export routes to the world. They administer movement control
                  regulations for horses in the African Horse Sickness (AHS) control zones and manage vaccination
                  applications for AHS within these zones.
                </p>

                <p className="text-sm text-gray-600 italic mb-3">
                  SAEHP supported John's participation in this workshop by contributing his time and availability.
                </p>

                <a
                  href="https://www.saehp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg text-green-700 font-medium"
                >
                  <Globe className="h-4 w-4" />
                  Visit SAEHP Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* JDATA */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <img
                  src="https://jdata.co.za/wp-content/uploads/2025/04/cropped-JData-Logo-new_high-res_blank-120x56.png"
                  alt="JDATA Logo"
                  className="h-14 w-auto"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  JDATA Pty (Ltd)
                </h3>
                <p className="text-blue-700 font-medium text-sm mb-3">Veterinary Epidemiology Consultancy</p>

                <p className="text-gray-700 mb-3">
                  JDATA is a veterinary consultancy firm specializing in animal health surveillance and epidemiology.
                  They leverage technology to enhance disease monitoring globally, having implemented advanced programs
                  across South Africa, Botswana, the UK, and Australia. Their services include data management and
                  analysis training, surveillance program development, and quantitative risk assessments.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:john@jdata.co.za"
                    className="inline-flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 font-medium"
                  >
                    john@jdata.co.za
                  </a>
                  <a
                    href="https://www.jdata.co.za"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-blue-700 font-medium"
                  >
                    <Globe className="h-4 w-4" />
                    Visit JDATA Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Acknowledgements */}
      <section className="bg-woah-cream border border-woah-gold-lighter rounded-lg p-6">
        <h3 className="font-bold text-woah-charcoal mb-4 text-lg">Acknowledgements</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Organizations</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-woah-orange rounded-full mt-1.5 flex-shrink-0"></span>
                <span><strong>Directorate of Veterinary Services, Namibia</strong> - For organizing and hosting this training workshop</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-woah-orange rounded-full mt-1.5 flex-shrink-0"></span>
                <span><strong>World Organisation for Animal Health (WOAH)</strong> - For supporting veterinary capacity building in the region</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Individuals</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-woah-orange rounded-full mt-1.5 flex-shrink-0"></span>
                <span><strong>Dr Tenzin Tenzin</strong> (WOAH) - For coordinating and enabling this workshop</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-woah-orange rounded-full mt-1.5 flex-shrink-0"></span>
                <span><strong>Dr Reinhold Haimbodi</strong> (Namibia Veterinary Services, TADs Coordinator) - For organizing and facilitating this training</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-woah-orange rounded-full mt-1.5 flex-shrink-0"></span>
                <span><strong>All Workshop Participants</strong> - For your dedication to improving animal health surveillance in Namibia</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
