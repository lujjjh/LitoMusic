import { useEffect } from 'react'
import { useLocalStorage, usePlayerEventCallback } from '../utils'

export const usePersistPlaybackStates = () => {
  const [volume, setVolume] = useLocalStorage<number>('player.volume', 1)
  usePlayerEventCallback(
    MusicKit.Events.playbackVolumeDidChange,
    () => {
      setVolume(MusicKit.getInstance().volume)
    },
    []
  )
  useEffect(() => {
    const instance = MusicKit.getInstance()
    instance.volume = volume
  }, [volume])
}
