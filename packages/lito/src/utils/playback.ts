import { useState } from 'react'
import { usePlayerEventCallback } from '.'

export const useNowPlayingItem = () => {
  const [value, setValue] = useState<MusicKit.MediaItem | undefined>(() => MusicKit.getInstance().nowPlayingItem)
  usePlayerEventCallback(
    MusicKit.Events.nowPlayingItemDidChange,
    () => {
      setValue(MusicKit.getInstance().nowPlayingItem)
    },
    []
  )
  return value
}

export const useNextPlayableItem = () => {
  const [value, setValue] = useState<MusicKit.MediaItem | undefined>(
    () => (MusicKit.getInstance() as any).queue.nextPlayableItem
  )
  usePlayerEventCallback(
    MusicKit.Events.queueItemsDidChange,
    () => {
      setValue((MusicKit.getInstance() as any).queue.nextPlayableItem)
    },
    []
  )
  return value
}

export const useNowPlayingItemOrNextPlayableItem = () => {
  const nowPlayingItem = useNowPlayingItem()
  const nextPlayableItem = useNextPlayableItem()
  return nowPlayingItem || nextPlayableItem
}
