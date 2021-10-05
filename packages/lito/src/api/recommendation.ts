import { useMemo } from 'react'
import useSWR from 'swr'

const refreshInterval = 2 * 3600 * 1000

const getTz = () => {
  const offset = new Date().getTimezoneOffset()
  const offsetAbs = Math.abs(offset)
  const pad2 = (n: number) => String(n).padStart(2, '0')
  return (offset < 0 ? '+' : '-') + pad2(Math.floor(offsetAbs / 60)) + ':' + pad2(offsetAbs % 60)
}

export const useListenNow = () => {
  const tz = useMemo(() => getTz(), [])
  const qs = useMemo(() => {
    const qs = new URLSearchParams()
    qs.set('timezone', tz)
    qs.set('platform', 'web')
    qs.set('name', 'listen-now')
    qs.set('types', 'albums,playlists,stations')
    return qs.toString()
  }, [tz])
  return useSWR(`v1/me/recommendations?${qs}`, { refreshInterval })
}
