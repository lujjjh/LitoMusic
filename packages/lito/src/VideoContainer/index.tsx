import { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { useNowPlayingItem } from '../utils'

const Styles = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
  &.visible {
    opacity: 1;
    pointer-events: initial;
  }
  video {
    width: 100%;
    height: 100%;
    background-color: #000;
  }
`

const VideoContainer = () => {
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const instance = MusicKit.getInstance()
    if (elementRef.current) instance.videoContainerElement = elementRef.current
    return () => {
      instance.videoContainerElement = undefined
    }
  }, [])
  const mediaItem = useNowPlayingItem()
  const visible = useMemo(() => mediaItem && MusicKit.getPlayerType(mediaItem) === 'video', [mediaItem])
  return <Styles className={visible ? 'visible' : ''} ref={elementRef} />
}

export default VideoContainer
