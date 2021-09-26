import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  --app-region: drag;
`

const Authorize = () => {
  const { t } = useTranslation()
  const authorize = useCallback(() => {
    MusicKit.getInstance().authorize()
  }, [])
  return (
    <Wrapper>
      <button type="button" onClick={authorize}>
        {t('connectToAppleMusic')}
      </button>
    </Wrapper>
  )
}

export default Authorize
