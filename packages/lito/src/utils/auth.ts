import { useState } from 'react'
import { usePlayerEventCallback } from '.'
import { developerToken } from '../../../../token.json'

export const getDeveloperToken = async () => {
  const key = 'developer_token'
  const token = localStorage.getItem(key) || developerToken
  const exp = (() => {
    try {
      const exp = JSON.parse(atob(token.split('.')[1] || 'null'))?.exp
      if (typeof exp === 'number') return exp
    } catch {}
  })()
  const now = Math.floor(Date.now() / 1000)
  const shouldUpdate = !exp || exp - now <= 30 * 24 * 3600
  if (shouldUpdate) {
    const updateDeveloperToken = async () => {
      const response = await fetch('https://api.litomusic.org/token')
      if (!response.ok) throw new Error(`unexpected status: ${response.status}`)
      const { developerToken } = await response.json()
      if (typeof developerToken !== 'string') throw new Error('failed to parse developerToken')
      localStorage.setItem(key, developerToken)
      return developerToken
    }
    const promise = updateDeveloperToken()
    const expired = !exp || exp <= now
    if (expired) return promise
  }
  return token
}

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
