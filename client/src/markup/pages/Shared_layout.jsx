import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import HeaderTop from '../components/HeaderTop/HeaderTop'

const Shared_layout = () => {
  return (
     <>
     <HeaderTop/>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default Shared_layout