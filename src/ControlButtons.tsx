import styled from 'styled-components'
import LyricsButton from './LyricsButton'

const AdditionalButtons = styled.div`
  position: fixed;
  right: 5px;
  top: 28px;
  z-index: 100;
  > * {
    -webkit-app-region: none;
  }
`
const ControlButtons = () => {
  return (
    <AdditionalButtons>
      <LyricsButton />
    </AdditionalButtons>
  )
}

export default ControlButtons
