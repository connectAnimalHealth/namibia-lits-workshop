import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Day1Session1 from './pages/day1/Session1'
import Day1Session2 from './pages/day1/Session2'
import Day2Session1 from './pages/day2/Session1'
import Day2Session2 from './pages/day2/Session2'
import Day3Session1 from './pages/day3/Session1'
import Day3Session2 from './pages/day3/Session2'
import Day4Session1 from './pages/day4/Session1'
import Day5Session1 from './pages/day5/Session1'
import NamibiaContext from './pages/NamibiaContext'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="namibia-context" element={<NamibiaContext />} />
        <Route path="day1/session1" element={<Day1Session1 />} />
        <Route path="day1/session2" element={<Day1Session2 />} />
        <Route path="day2/session1" element={<Day2Session1 />} />
        <Route path="day2/session2" element={<Day2Session2 />} />
        <Route path="day3/session1" element={<Day3Session1 />} />
        <Route path="day3/session2" element={<Day3Session2 />} />
        <Route path="day4/session1" element={<Day4Session1 />} />
        <Route path="day5/session1" element={<Day5Session1 />} />
      </Route>
    </Routes>
  )
}

export default App