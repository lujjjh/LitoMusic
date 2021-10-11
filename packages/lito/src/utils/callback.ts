import { useEffect } from 'react'

export const usePlayerEventCallback = <T extends keyof MusicKit.Events>(
  name: T,
  callback: (event: MusicKit.Events[T]) => any,
  deps?: React.DependencyList
) => {
  useEffect(() => {
    const instance = MusicKit.getInstance()
    instance.addEventListener(name, callback)
    return () => {
      instance.removeEventListener(name, callback as () => any)
    }
  }, deps)
}
