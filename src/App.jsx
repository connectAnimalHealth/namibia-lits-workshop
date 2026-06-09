import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Day1Session1 from './pages/day1/Session1'
import Day1Session2 from './pages/day1/Session2'
import Day1Session3 from './pages/day1/Session3'
import Day2Session1 from './pages/day2/Session1'
import Day2Session2 from './pages/day2/Session2'
import Day3Session1 from './pages/day3/Session1'
import Day3Session2 from './pages/day3/Session2'
import Day4Session1 from './pages/day4/Session1'
import Day5Session1 from './pages/day5/Session1'
import Day5Session2 from './pages/day5/Session2'
import NamibiaContext from './pages/NamibiaContext'
import PreWorkshop from './pages/PreWorkshop'

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
          <Route path="day1/session1" element={<Day1Session1 />} />
          <Route path="day1/session2" element={<Day1Session2 />} />
          <Route path="day1/session3" element={<Day1Session3 />} />
          <Route path="day2/session1" element={<Day2Session1 />} />
          <Route path="day2/session2" element={<Day2Session2 />} />
          <Route path="day3/session1" element={<Day3Session1 />} />
          <Route path="day3/session2" element={<Day3Session2 />} />
          <Route path="day4/session1" element={<Day4Session1 />} />
          <Route path="day5/session1" element={<Day5Session1 />} />
          <Route path="day5/session2" element={<Day5Session2 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
