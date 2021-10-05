import { useEffect } from 'react'
import { useRouteMatch } from 'react-router'

export interface ScrollToTopProps<T extends HTMLElement> {
  scrollRef: React.RefObject<T>
}

export const ScrollToTop = <T extends HTMLElement>({ scrollRef }: ScrollToTopProps<T>) => {
  const route = useRouteMatch()
  useEffect(() => {
    void route
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [route])
  return null
}
