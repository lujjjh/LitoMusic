import styled from 'styled-components'
import { useLyricsContext } from '../Lyrics'
import { isMacOS } from '../utils'
import AirPlayButton from './AirPlayButton'
import LyricsButton from './LyricsButton'

const Styles = styled.div`
  position: fixed;
  right: 10px;
  top: 0;
  height: 55px;
  display: flex;
  align-items: ${isMacOS() ? 'center' : 'flex-end'};
  z-index: 100;
  fill: var(--fill);
  --app-region: drag;
  > * {
    margin-left: 2px;
  }
`

const ControlButtons = () => {
  const { visible } = useLyricsContext()
  return (
    <Styles
      style={
        {
          '--fill': visible ? '#fff' : '#000',
        } as React.CSSProperties
      }
    >
      <AirPlayButton />
      <LyricsButton />
    </Styles>
  )
}

export default ControlButtons
