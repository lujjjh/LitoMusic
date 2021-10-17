import { useCallback } from 'react'
import styled from 'styled-components'
import { usePlaybackTargetAvailability } from '../utils'

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 28px;
  border-radius: 5px;
  padding: 0;
  background-color: transparent;
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  svg {
    width: 18px;
    height: 18px;
    opacity: 0.7;
  }
`

const AirPlayButton = () => {
  const available = usePlaybackTargetAvailability()
  const showPlaybackTargetPicker = useCallback(() => {
    const instance = MusicKit.getInstance()
    instance.showPlaybackTargetPicker()
  }, [])
  return (
    available && (
      <Button type="button" onClick={showPlaybackTargetPicker}>
        <svg viewBox="0 0 46 46">
          <clipPath id="B">
            <path
              id="A"
              d="M22.2 28.7L8.6 44.5c-.6.6-.2 1.5.6 1.5h27.5c.8 0 1.2-.9.7-1.5L23.8 28.7c-.2-.2-.5-.4-.8-.4-.3.1-.6.2-.8.4"
            />
          </clipPath>
          <path d="M1.9 22H44v30.4H1.9z" clipPath="url(#B)" />
          <clipPath id="D">
            <path
              id="C"
              d="M12.8 23c0 3.1 1.3 5.8 3.5 7.7.1.1.2.2.4.3.1.1.3.1.4 0s.2-.2.2-.3l1.1-1.3c.1-.1.1-.2 0-.3-1.8-1.4-3-3.6-3-6.1 0-4.2 3.4-7.7 7.7-7.7 4.2 0 7.7 3.4 7.7 7.7 0 2.5-1.2 4.7-3 6.1-.1.1-.1.2 0 .3.5.6.8 1 1.1 1.3.1.1.1.2.2.3s.2.1.4 0a1.38 1.38 0 0 0 .4-.3c2.1-1.9 3.5-4.6 3.5-7.7 0-5.6-4.6-10.2-10.2-10.2S12.8 17.4 12.8 23m-6.4 0c0 5.1 2.3 9.7 6 12.8l.1.1h0c.1.1.3.1.4 0v-.1c.5-.6.9-1 1.1-1.3 0-.1.1-.1.2-.2s.1-.2 0-.3l-.1-.1C11 31.3 9 27.4 9 23.1 9 15.3 15.3 9 23.1 9s14.1 6.3 14.1 14.1c0 4.3-2 8.2-5.1 10.8l-.2.2c-.1.1-.1.2 0 .3s.1.2.2.2c.3.3.6.8 1.1 1.3l.1.1h0c.1.1.2.1.3 0 .1 0 .1-.1.1-.1 3.7-3 6-7.6 6-12.8A16.56 16.56 0 0 0 23.1 6.5C13.9 6.5 6.4 13.8 6.4 23M0 23c0 7.1 3.2 13.4 8.2 17.6 0 0 .1 0 .1.1.1.1.3.1.4 0l.1-.1c.5-.6.9-1.1 1.2-1.4 0 0 0-.1.1-.1.1-.1.1-.3 0-.4-.1 0-.1-.1-.1-.1-4.6-3.7-7.4-9.3-7.4-15.6A20.36 20.36 0 0 1 23 2.6 20.36 20.36 0 0 1 43.4 23c0 6.3-2.9 12-7.4 15.7l-.1.1h0c-.1.1-.1.2 0 .3l.1.1a13.5 13.5 0 0 0 1.3 1.5c.1.1.2.1.3 0C42.8 36.5 46 30.1 46 23 46 10.3 35.7 0 23 0S0 10.3 0 23"
            />
          </clipPath>
          <path d="M-6.4-6.4h58.8v53.6H-6.4z" clipPath="url(#D)" />
        </svg>
      </Button>
    )
  )
}

export default AirPlayButton
