import { useEffect } from 'react'
import { useLocalStorage, usePlayerEventCallback } from '../utils'

export const usePersistPlaybackStates = () => {
  const [volume, setVolume] = useLocalStorage('player.volume', 1)
  usePlayerEventCallback(
    MusicKit.Events.playbackVolumeDidChange,
    () => {
      setVolume(MusicKit.getInstance().volume)
    },
    []
  )

  const [url, setURL] = useLocalStorage<string>('player.url')
  const [index, setIndex] = useLocalStorage<number>('player.index', 0)
  usePlayerEventCallback(
    MusicKit.Events.nowPlayingItemDidChange,
    () => {
      const instance = MusicKit.getInstance()
      const url = (instance.nowPlayingItem as any)?.container?.attributes?.url
      if (url) {
        setURL(url)
      }
      setIndex((instance as any).nowPlayingItemIndex || null)
    },
    []
  )

  useEffect(() => {
    const instance = MusicKit.getInstance()
    instance.volume = volume
    if (url) {
      instance.setQueue({ url, startPosition: index })
    }
  }, [])
}
