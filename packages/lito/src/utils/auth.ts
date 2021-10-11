import { useState } from 'react'
import { usePlayerEventCallback } from '.'

export const useAuthorized = () => {
  const [authorized, setAuthorized] = useState(() => MusicKit.getInstance().isAuthorized)
  usePlayerEventCallback(
    MusicKit.Events.authorizationStatusDidChange,
    () => {
      // set on the next tick as mediaUserToken might be not ready
      setTimeout(() => {
        setAuthorized(MusicKit.getInstance().isAuthorized)
      }, 0)
    },
    []
  )
  return authorized
}
