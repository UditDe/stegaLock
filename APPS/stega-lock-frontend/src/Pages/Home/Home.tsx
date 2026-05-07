import React from 'react'
import "./Home.scss"
import ProfileSection from './components/ProfileSection'
import PasswordData from './components/PasswordDataTable'

const Home: React.FC = () => {
  return (
    <div className='homewrapper'>
      <ProfileSection />
      <PasswordData />
    </div>
  )
}

export default Home