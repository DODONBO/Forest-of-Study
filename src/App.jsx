import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './font.css'
import './style.css'
import TodayHabitPage from './pages/TodayHabitPage.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="study/:id/habit" element={<TodayHabitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
