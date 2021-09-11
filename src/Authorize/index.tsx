import { useCallback } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const Authorize = () => {
  const authorize = useCallback(() => {
    MusicKit.getInstance().authorize()
  }, [])
  return (
    <Wrapper>
      <button type="button" onClick={authorize}>
        Connect to Apple Music
      </button>
    </Wrapper>
  )
}

export default Authorize
