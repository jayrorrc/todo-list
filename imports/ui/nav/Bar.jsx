import React from 'react';

import { useAuth } from "/imports/hooks/use-auth"

export const Bar = () => {

  const { currentUser, singout } = useAuth()

  if (currentUser)
    return (
      <div className="user" onClick={singout}>
        { currentUser.username } 🚪
      </div>
    )
}
