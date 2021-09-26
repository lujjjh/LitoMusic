import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  font-size: 24px;
  opacity: 0.5;
`

export interface NothingProps {
  placeholder?: string
}

const Nothing = ({ placeholder = 'nothing' }: NothingProps) => {
  const { t } = useTranslation()
  return <Wrapper>{t(placeholder)}</Wrapper>
}

export default Nothing
