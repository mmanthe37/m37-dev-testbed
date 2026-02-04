/**
 * Main application component with routing for all OmniSphere hubs
 */
import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import OmniFi from './pages/OmniFi'
import OmniTrade from './pages/OmniTrade'
import OmniAgent from './pages/OmniAgent'
import OmniPool from './pages/OmniPool'
import Navigation from './components/Navigation'
import './styles/globals.css'

function App() {
  return (
    <div className="min-h-screen bg-primary text-off-white">
      <HashRouter>
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/omnifi" element={<OmniFi />} />
            <Route path="/omnitrade" element={<OmniTrade />} />
            <Route path="/omniagent" element={<OmniAgent />} />
            <Route path="/omnipool" element={<OmniPool />} />
          </Routes>
        </main>
      </HashRouter>
    </div>
  )
}

export default App
