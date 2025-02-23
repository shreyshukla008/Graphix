import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Playground from './pages/Playground'
import Landing from './pages/Landing'
import './App.css'

function App() {

  return (
    

    <div className='bg-slate-900'>

        <Router>
          <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          </Routes>
        </Router>

    </div>


  )
}

export default App
