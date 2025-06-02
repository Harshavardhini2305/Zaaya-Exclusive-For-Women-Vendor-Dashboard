import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import "./App.css"
import {Routes , Route } from 'react-router-dom'
import NotFound from './vendorDashboard/components/NotFound'
import FrontPage from './vendorDashboard/components/FrontPage'

const App = () => {
  return (
    <div>
      <Routes>
       
        <Route path='/' element={<FrontPage/>}/>
        <Route path='/*' element={<LandingPage/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      
     </div>
  )
}
export default App