import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useListenNow } from '../api'
import { Header } from '../components'
import Nothing from '../Nothing'
import Recommendation from './Recommendation'

const Wrapper = styled.div`
  padding-bottom: 32px;
`

const ListenNow = () => {
  const { t } = useTranslation()
  const { data: recommendationList, error } = useListenNow()
  return (
    <Wrapper>
      <Header>{t('listenNow')}</Header>
      {error && <Nothing placeholder="fetchFailed" />}
      {recommendationList?.map((value: any) => (
        <Recommendation key={value.id} value={value} />
      ))}
    </Wrapper>
  )
}

export default ListenNow
