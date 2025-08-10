import './App.css'
import Home from './screens/Home'
import RecordsView from './screens/RecordsView'
import Header from './screens/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:formId/records" element={<RecordsView />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
