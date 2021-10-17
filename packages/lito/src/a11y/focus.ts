import { useEffect } from 'react'

export const useBlurAfterClick = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('a, button, input[type=button], input[type=checkbox]')) {
        e.target.blur()
      }
    }
    addEventListener('click', handleClick)
    return () => {
      removeEventListener('click', handleClick)
    }
  }, [])
}
