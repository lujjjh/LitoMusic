import styled from 'styled-components'
import useNowPlayingItem from '../useNowPlayingItem'
import ProgressControl from './ProgressControl'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 60px;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.88);
  backdrop-filter: saturate(50%) blur(20px);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(0, 0, 0, 0.07) 0px 1px 3px 0px,
    rgba(255, 255, 255, 0.45) 0px 1px 1px 0px inset;
  &,
  & * {
    -webkit-app-region: drag;
  }
`

const Controls = styled.div`
  padding: 20px;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > * {
    -webkit-app-region: none;
  }
`

const MediaItem = styled.div`
  flex: 4;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 2px;
  height: 100%;
  display: flex;
`

const Artwork = styled.div`
  img {
    display: block;
  }
`

const Meta = styled.dl`
  margin: 0;
  padding: 0 10px;
  flex: 1;
  min-width: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  dt,
  dd {
    margin: 0;
    overflow: hidden;
    line-height: 1.1em;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  dt {
    color: #000;
  }
  dd {
    margin-top: 2px;
    font-size: 12px;
    opacity: 0.6;
  }
`

const VolumeControl = styled.div`
  padding: 0 20px;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  > * {
    -webkit-app-region: none;
  }
`

const Player = () => {
  const mediaItem = useNowPlayingItem()
  return (
    <Wrapper>
      <Controls>
        <apple-music-playback-controls />
      </Controls>
      <MediaItem>
        <Artwork>
          <apple-music-artwork width="50" />
        </Artwork>
        <Meta>
          {mediaItem && (
            <>
              <dt>{mediaItem.title}</dt>
              <dd>
                {mediaItem.artistName} - {mediaItem.albumName}
              </dd>
              <ProgressControl />
            </>
          )}
        </Meta>
      </MediaItem>
      <VolumeControl>
        <apple-music-volume />
      </VolumeControl>
    </Wrapper>
  )
}

export default Player
