import styled from 'styled-components'
import MediaItem from './MediaItem'
import { usePersistPlaybackStates } from './states'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 55px;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.88);
  backdrop-filter: saturate(50%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  --app-region: drag;
`

const Controls = styled.div`
  padding: 20px;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > * {
    --app-region: none;
  }
`

const VolumeControl = styled.div`
  padding: 0 20px;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  > * {
    --app-region: none;
  }
`

const Player = () => {
  usePersistPlaybackStates()
  return (
    <Wrapper>
      <Controls>
        <apple-music-playback-controls />
      </Controls>
      <MediaItem />
      <VolumeControl>
        <apple-music-volume />
      </VolumeControl>
    </Wrapper>
  )
}

export default Player
