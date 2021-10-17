import { useCallback, useState } from 'react'
import { usePlayerEventCallback } from '.'

const getNowPlayingItem = (fallbackToQueue: boolean) => {
  const instance = MusicKit.getInstance()
  const mediaItem = instance.nowPlayingItem
  if (mediaItem) return mediaItem
  if (fallbackToQueue && instance.queue) {
    return instance.queue.item(Math.max(0, instance.queue.position))
  }
}

export const useNowPlayingItem = (fallbackToQueue = false) => {
  const [value, setValue] = useState<MusicKit.MediaItem | undefined>(() => getNowPlayingItem(fallbackToQueue))
  const update = useCallback(() => {
    setValue(getNowPlayingItem(fallbackToQueue))
  }, [fallbackToQueue])
  usePlayerEventCallback(MusicKit.Events.nowPlayingItemDidChange, update, [])
  usePlayerEventCallback(MusicKit.Events.queueItemsDidChange, update, [])
  return value
}

export const usePlaybackTargetAvailability = () => {
  const [value, setValue] = useState(() => MusicKit.getInstance().playbackTargetAvailable)
  const update = useCallback(() => {
    setValue(MusicKit.getInstance().playbackTargetAvailable)
  }, [])
  usePlayerEventCallback(MusicKit.Events.playbackTargetAvailableDidChange, update, [])
  return value
}
