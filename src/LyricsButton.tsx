import { useCallback } from 'react'
import styled from 'styled-components'
import LyricsIcon from './icons/lyrics.svg'
import { useLyricsContext } from './Lyrics'

const Input = styled.input`
  appearance: none;
  margin: 0;
  width: 32px;
  height: 32px;
  background: url(${LyricsIcon}) 50% 50% no-repeat;
  background-size: 32px 32px;
  opacity: 0.2;
  &:active,
  &:checked {
    opacity: 1;
  }
`

const LyricsButton = () => {
  const { visible, setVisible } = useLyricsContext()
  const handleChange = useCallback(() => {
    setVisible(!visible)
  }, [visible, setVisible])
  return <Input type="checkbox" checked={visible} onChange={handleChange} />
}

export default LyricsButton
