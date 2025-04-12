import React from 'react'
import MainContent from './common/MainContent'
import Sidebar from './common/Sidebar'

const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
    </div>
  )
}

export default HomePage
