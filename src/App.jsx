import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import EpiCollectBasicsSession1 from './pages/epicollect-basics/Session1'
import EpiCollectBasicsSession2 from './pages/epicollect-basics/Session2'
import EpiCollectBasicsSession3 from './pages/epicollect-basics/Session3'
import EpiCollectAdvancedSession1 from './pages/epicollect-advanced/Session1'
import EpiCollectAdvancedSession2 from './pages/epicollect-advanced/Session2'
import RBasicsSession1 from './pages/r-basics/Session1'
import RBasicsSession2 from './pages/r-basics/Session2'
import RVizSession1 from './pages/r-viz/Session1'
import AnalysisSession1 from './pages/analysis/Session1'
import AnalysisSession2 from './pages/analysis/Session2'
import NamibiaContext from './pages/NamibiaContext'
import PreWorkshop from './pages/PreWorkshop'
import DailyProgram from './pages/DailyProgram'
import Feedback from './pages/Feedback'
import Acknowledgements from './pages/Acknowledgements'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pre-workshop" element={<PreWorkshop />} />
          <Route path="namibia-context" element={<NamibiaContext />} />
          <Route path="epicollect-basics/session1" element={<EpiCollectBasicsSession1 />} />
          <Route path="epicollect-basics/session2" element={<EpiCollectBasicsSession2 />} />
          <Route path="epicollect-basics/session3" element={<EpiCollectBasicsSession3 />} />
          <Route path="epicollect-advanced/session1" element={<EpiCollectAdvancedSession1 />} />
          <Route path="epicollect-advanced/session2" element={<EpiCollectAdvancedSession2 />} />
          <Route path="r-basics/session1" element={<RBasicsSession1 />} />
          <Route path="r-basics/session2" element={<RBasicsSession2 />} />
          <Route path="r-viz/session1" element={<RVizSession1 />} />
          <Route path="analysis/session1" element={<AnalysisSession1 />} />
          <Route path="analysis/session2" element={<AnalysisSession2 />} />
          <Route path="daily-program" element={<DailyProgram />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="acknowledgements" element={<Acknowledgements />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
