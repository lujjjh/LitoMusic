import { useState } from 'react'
import { usePlayerEventCallback } from './utils'

const useNowPlayingItem = () => {
  const [value, setValue] = useState<MusicKit.MediaItem | undefined>()
  usePlayerEventCallback(
    MusicKit.Events.mediaItemStateDidChange,
    () => {
      setValue(MusicKit.getInstance().nowPlayingItem)
    },
    []
  )
  return value
}

export default useNowPlayingItem
