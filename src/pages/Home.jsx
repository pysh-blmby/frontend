import React, { useEffect, useState } from 'react'
import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import Categories from '../sections/Categories'
import FeaturedProducts from '../sections/FeaturedProducts'
import Promo from '../sections/Promo'
import Testimonials from '../sections/Testimonials'
import Footer from '../sections/Footer'

const Home = () => {

  const [homeData, setHomeData] = useState(null)

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/homepage`)
        const data = await res.json()
        console.log("Homepage API data:", data)
        setHomeData(data)
      } catch (err) {
        console.error("Failed to fetch homepage", err)
      }
    }

    fetchHomePage()
  }, [])

  return (
    <div>
      <Navbar/>

      <Hero 
        heroData={homeData?.hero}
      />

      <Categories 
        categoriesData={homeData?.categories}
      />

      <FeaturedProducts 
        products={homeData?.featuredProducts}
      />

      <Promo 
        promoData={homeData?.promo}
      />

      <Testimonials 
        testimonialsData={homeData?.testimonials}
      />

      <Footer/>
    </div>
  )
}

export default Home
