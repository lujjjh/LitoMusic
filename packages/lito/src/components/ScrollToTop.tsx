import { useEffect } from 'react'
import { useHistory } from 'react-router'

export interface ScrollToTopProps<T extends HTMLElement> {
  scrollRef: React.RefObject<T>
}

export const ScrollToTop = <T extends HTMLElement>({ scrollRef }: ScrollToTopProps<T>) => {
  const history = useHistory()
  useEffect(() => {
    return history.listen(() => {
      scrollRef.current?.scrollTo(0, 0)
    })
  }, [history])
  return null
}
