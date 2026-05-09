import React from 'react'
import "./Auth.scss"
import { useAuth0 } from '@auth0/auth0-react';

const Auth: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <button onClick={() => loginWithRedirect()} >Log in</button>
    </div>
  )
}

export default Auth