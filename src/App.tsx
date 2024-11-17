import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  )
}

export default App