import React from 'react'
import UpperBanner from '../components/UpperBanner/UpperBanner'
import AboutComponent from '../components/About/AboutComponent'
import ServicesComponent from '../components/Services/ServicesComponent'
import FeaturesComponent from '../components/Features/FeaturesComponent'
import WhyChooseComponent from '../components/WhyChoose/WhyChooseComponent'
import VideoSectionComponent from '../components/VideoSection/VideoSectionComponent'
import CTAComponent from '../components/CTA/CTAComponent'

const Home = () => {
  return (
    <>
      <UpperBanner/>
      <AboutComponent/>
      <ServicesComponent/>
      <FeaturesComponent/>
      <WhyChooseComponent/>
      <VideoSectionComponent/>
      <CTAComponent/>
    </>
  )
}

export default Home