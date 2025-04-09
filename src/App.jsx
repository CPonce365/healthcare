import React from 'react';
import { Hero, Navbar,Companies, Feedback, Footer } from './components';
import './App.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Companies/>
      <Feedback />
      <Footer />
    </div>
  )
}

export default App