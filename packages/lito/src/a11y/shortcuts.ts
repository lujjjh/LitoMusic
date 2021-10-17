import { useEffect } from 'react'
import { isInputLike } from '.'
import { isMacOS } from '../utils'

enum ModifierKey {
  Alt = 1 << 0,
  Accel = 1 << 1, // Ctrl on Windows, Command on macOS
  Shift = 1 << 2,
}

const getModifierKey = (e: KeyboardEvent) => {
  let value = 0
  if (e.altKey) value |= ModifierKey.Alt
  if (isMacOS()) {
    if (e.metaKey) value |= ModifierKey.Accel
  } else {
    if (e.ctrlKey) value |= ModifierKey.Accel
  }
  if (e.shiftKey) value |= ModifierKey.Shift
  return value
}

interface KeyboardShortcutDescriptor {
  code: string
  modifier?: number
  allowRepeat?: boolean
  allowInInput?: boolean
}

const matchKeyboardShortcut = (
  e: KeyboardEvent,
  { code, modifier = 0, allowRepeat = false, allowInInput = modifier !== 0 }: KeyboardShortcutDescriptor
) => {
  if (e.code === code && getModifierKey(e) === modifier) {
    if (allowRepeat || !e.repeat) {
      if (allowInInput || !isInputLike(e.target)) {
        e.preventDefault()
        return true
      }
    }
  }
  return false
}

export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.isComposing) return
      const instance = MusicKit.getInstance()
      switch (true) {
        case matchKeyboardShortcut(e, { code: 'Space' }):
          switch (instance.playbackState as unknown as MusicKit.PlaybackStates) {
            case MusicKit.PlaybackStates.playing:
              instance.pause()
              break
            case MusicKit.PlaybackStates.paused:
            case MusicKit.PlaybackStates.stopped:
              instance.play()
              break
          }
          break
        case matchKeyboardShortcut(e, { code: 'Enter' }):
          if (instance.nowPlayingItem) {
            instance.seekToTime(0)
            instance.play()
          }
          break
        case matchKeyboardShortcut(e, { code: 'ArrowLeft', modifier: ModifierKey.Alt | ModifierKey.Accel }):
          instance.skipToPreviousItem()
          break
        case matchKeyboardShortcut(e, { code: 'ArrowRight', modifier: ModifierKey.Alt | ModifierKey.Accel }):
          instance.skipToNextItem()
          break
        case matchKeyboardShortcut(e, { code: 'Period', modifier: ModifierKey.Accel }):
          instance.stop()
          break
      }
    }
    addEventListener('keydown', handleKeyDown)
    return () => {
      removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}
