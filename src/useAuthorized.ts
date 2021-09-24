import { useEffect, useState } from 'react'

const useAuthorized = () => {
  const [authorized, setAuthorized] = useState<boolean>(MusicKit.getInstance().isAuthorized)
  useEffect(() => {
    const instance = MusicKit.getInstance()
    const handleAuthorizationStatusDidChange = () => {
      setAuthorized(instance.isAuthorized)
    }
    instance.addEventListener(MusicKit.Events.authorizationStatusDidChange, handleAuthorizationStatusDidChange)
    return () => {
      instance.removeEventListener(MusicKit.Events.authorizationStatusDidChange, handleAuthorizationStatusDidChange)
    }
  }, [])
  return authorized
}

export default useAuthorized
