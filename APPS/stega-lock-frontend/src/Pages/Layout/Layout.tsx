import React from 'react'
import "./Layout.scss"
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import Auth from '../Auth/Auth';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default Layout