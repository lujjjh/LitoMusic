import { useEffect, useState } from 'react'

const useAuthorized = () => {
  const instance = MusicKit.getInstance()
  const [authorized, setAuthorized] = useState<boolean>(instance.isAuthorized)
  useEffect(() => {
    const rawAuthorize = instance.authorize
    instance.authorize = function () {
      return rawAuthorize.apply(this, arguments).then(() => setAuthorized(instance.isAuthorized))
    }
    return () => {
      instance.authorize = rawAuthorize
    }
  })
  return authorized
}

export default useAuthorized
