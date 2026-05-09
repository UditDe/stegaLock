import React from 'react'
import "./Layout.scss"
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Layout