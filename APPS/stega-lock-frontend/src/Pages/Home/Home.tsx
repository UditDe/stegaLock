import React, { useEffect } from 'react'
import "./Home.scss"
import ProfileSection from './components/ProfileSection'
import PasswordData from './components/PasswordDataTable'
import { useAuth0 } from '@auth0/auth0-react'

const Home: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);
  return (
    <div className='homewrapper'>
      <ProfileSection />
      <PasswordData />
    </div>
  )
}

export default Home