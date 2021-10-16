import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { isMacOS, isWindows, useNowPlayingItem } from '../utils'

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

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`

const WindowControls = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 134px;
  height: 30px;
  background-color: #fff;
`

const Clickable = styled.div`
  height: 100%;
`

const Controls = styled.div`
  position: absolute;
  top: ${isMacOS() ? '55px' : '0'};
  left: 0;
  right: 0;
  padding: 5px 10px;
  button {
    display: block;
    width: fit-content;
    height: fit-content;
    padding: 5px;
    background-color: transparent;
    border-radius: 50%;
    &:active {
      background-color: rgba(255, 255, 255, 0.2);
    }
    svg {
      display: block;
      width: 20px;
      height: 20px;
      fill: #fff;
    }
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
  const playOrPause = useCallback(() => {
    const instance = MusicKit.getInstance()
    switch (instance.playbackState as unknown as MusicKit.PlaybackStates) {
      case MusicKit.PlaybackStates.playing:
        instance.pause()
        break
      case MusicKit.PlaybackStates.paused:
        instance.play()
        break
    }
  }, [])
  const handleClose = useCallback(() => {
    const instance = MusicKit.getInstance()
    instance.stop()
  }, [])
  return (
    <Styles className={visible ? 'visible' : ''} ref={elementRef}>
      <Overlay>
        {isWindows() && <WindowControls />}
        <Clickable onClick={playOrPause} />
        <Controls>
          <button type="button" onClick={handleClose}>
            <svg viewBox="0 0 1024 1024">
              <path d="M800 480H268.8l233.6-233.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-284.8 288c-12.8 12.8-12.8 32 0 44.8h3.2l284.8 288c6.4 6.4 16 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6 12.8-12.8 12.8-32 0-44.8L272 544H800c19.2 0 32-12.8 32-32s-16-32-32-32z" />
            </svg>
          </button>
        </Controls>
      </Overlay>
    </Styles>
  )
}

export default VideoContainer
