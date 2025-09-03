import React from 'react'
import Hero from '../components/Hero.jsx'
import AiTools from '../components/AiTools.jsx'
import Plan from '../components/Plan.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer  from '../components/Footer.jsx'
const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <AiTools/>
      <Plan/>
      <Footer/>
    </>
  )
}

export default Home
