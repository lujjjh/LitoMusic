import { useEffect, useState } from 'react'

const useNowPlayingItem = () => {
  const [value, setValue] = useState<MusicKit.MediaItem | undefined>(MusicKit.getInstance().nowPlayingItem)
  useEffect(() => {
    let instance = MusicKit.getInstance()
    const handleMediaItemStateDidChange = () => {
      setValue(instance.nowPlayingItem)
    }
    instance.addEventListener(MusicKit.Events.mediaItemStateDidChange as any, handleMediaItemStateDidChange)
    return () => {
      instance.removeEventListener(MusicKit.Events.mediaItemStateDidChange, handleMediaItemStateDidChange)
    }
  }, [])
  return value
}

export default useNowPlayingItem
