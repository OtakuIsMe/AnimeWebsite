import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import AnimePage from './pages/AnimePage/AnimePage'
import WatchingPage from './pages/WatchingPage/WatchingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import SearchPage from './pages/SearchPage/SearchPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import FilterPage from './pages/FilterPage/FilterPage'

import { AuthProvider } from './components/Context/AuthContext'
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:animeName" element={<AnimePage />} />
            <Route path="/watch/:animeName" element={<WatchingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/profile/manage/' element={<ProfilePage />} />
            <Route path='/anime/type' element={<FilterPage/>}/>
          </Routes>
        <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
