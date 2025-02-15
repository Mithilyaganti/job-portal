import React from 'react'
import NavigationBar from'./NavigationBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <NavigationBar/>
        <div style={{minHeight:'80vh'}}>
        <Outlet />
        </div>

        <Footer/>

    </div>
  )
}

export default RootLayout