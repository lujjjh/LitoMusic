import { useEffect, useState } from 'react'

const useAuthorized = () => {
  const [authorized, setAuthorized] = useState<boolean>(false)
  useEffect(() => {
    const instance = MusicKit.getInstance()
    const handleAuthorizationStatusDidChange = () => {
      // set on the next tick as mediaUserToken might be not ready
      setTimeout(() => {
        setAuthorized(instance.isAuthorized)
      }, 0)
    }
    handleAuthorizationStatusDidChange()
    instance.addEventListener(MusicKit.Events.authorizationStatusDidChange, handleAuthorizationStatusDidChange)
    return () => {
      instance.removeEventListener(MusicKit.Events.authorizationStatusDidChange, handleAuthorizationStatusDidChange)
    }
  }, [])
  return authorized
}

export default useAuthorized
