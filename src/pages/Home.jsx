import React from 'react'
import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import Categories from '../sections/Categories'
import FeaturedProducts from '../sections/FeaturedProducts'
import Promo from '../sections/Promo'
import Testimonials from '../sections/Testimonials'
import Footer from '../sections/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Categories/>
      <FeaturedProducts/>
      <Promo/>
      <Testimonials/>
      <Footer/>

    </div>
  )
}

export default Home
