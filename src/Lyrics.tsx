import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Nothing from './Nothing'
import { usePlaybackState, usePlayerRef } from './Player/ProgressControl'
import useLyrics from './useLyrics'
import useNowPlayingItem from './useNowPlayingItem'

export const LyricsContext = React.createContext({ visible: false, setVisible(value: boolean) {} })

export const useLyricsContext = () => React.useContext(LyricsContext)

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-color: #fff;
  z-index: 10;
  transition: opacity 0.1s ease;
  opacity: 0;
  pointer-events: none;
  &.visible {
    opacity: 1;
    pointer-events: initial;
  }
`

const BlurWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(300px);
  -webkit-app-region: drag;
  overflow: auto;
  font-weight: bold;
  padding: 50vh 0;
  font-size: 24px;
  p {
    width: fit-content;
    margin: 1.5em 20vw;
    color: #fff;
    line-height: 1.5em;
    background-clip: text;
    opacity: 0.4;
    transition: opacity 0.3s ease, filter 0.3s ease;
    -webkit-app-region: none;
  }
  &.blur-behind p {
    filter: blur(1px);
  }
  p:hover,
  p.active {
    opacity: 1;
    filter: none;
  }
`

const Lyrics = () => {
  const { visible } = useLyricsContext()
  const nowPlayingItem = useNowPlayingItem()
  const playerRef = usePlayerRef()
  const { currentTime } = usePlaybackState()
  const { lyrics, error } = useLyrics()
  // TODO: Algorithm should be optimized.
  const currentTimeInMs = useMemo(() => {
    if (!visible) return undefined
    if (currentTime === undefined) return undefined
    return currentTime * 1000 + 200
  }, [visible, currentTime])
  const activeIndex = useMemo(() => {
    if (currentTimeInMs === undefined) return undefined
    const lineIndex = lyrics?.lines.findIndex(({ begin, end }) => begin <= currentTimeInMs && currentTimeInMs <= end)
    if (lineIndex === -1) return undefined
    return lineIndex
  }, [currentTimeInMs])
  const ref = useRef<HTMLDivElement>(null)
  const [lastScrollAt, setLastScrollAt] = useState(0)
  const blurBehindDelayAfterScroll = 500
  const [blurBehind, setBlurBehind] = useState(true)
  useEffect(() => {
    if (activeIndex === undefined) return
    const wrapper = ref.current
    if (!wrapper) return
    const line = wrapper.getElementsByTagName('p')[activeIndex]
    if (line) {
      line.scrollIntoView({ block: 'center', behavior: 'smooth' })
      if (Date.now() - lastScrollAt >= blurBehindDelayAfterScroll) {
        setBlurBehind(true)
      }
    }
  }, [activeIndex, lastScrollAt])
  const handleWheel = useCallback(() => {
    setLastScrollAt(Math.floor(Date.now() / 100) * 100)
    setBlurBehind(false)
  }, [])
  const handleClick = useCallback(
    (index: number) => {
      if (!playerRef) return
      const line = lyrics?.lines[index]
      if (!line) return
      playerRef.currentTime = line.begin / 1000
    },
    [lyrics, playerRef]
  )
  return (
    <Wrapper
      className={visible ? 'visible' : ''}
      ref={ref}
      style={{
        backgroundImage: nowPlayingItem?.artworkURL
          ? `url('${nowPlayingItem.artworkURL
              .replace('{w}', '256')
              .replace('{h}', '256')
              .replace('{c}', 'cc')
              .replace('{f}', 'webp')}'`
          : 'none',
      }}
    >
      <BlurWrapper className={blurBehind ? 'blur-behind' : ''} onWheel={handleWheel}>
        {error && <Nothing />}
        {lyrics?.lines.map((line, index) => {
          return (
            <p key={index} className={index === activeIndex ? 'active' : ''} onClick={() => handleClick(index)}>
              {line.text}
            </p>
          )
        })}
      </BlurWrapper>
    </Wrapper>
  )
}

export default Lyrics
