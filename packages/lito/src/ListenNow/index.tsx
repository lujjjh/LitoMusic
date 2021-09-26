import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import useSWR from 'swr'
import Nothing from '../Nothing'
import Recommendation from './Recommendation'

const Wrapper = styled.div`
  padding-bottom: 32px;
`

const Header = styled.div`
  margin: 32px 40px 16px;
  font-size: 34px;
  font-weight: 500;
`

const ListenNow = () => {
  const { t } = useTranslation()
  const { data: recommendationList, error } = useSWR(
    () => {
      const offset = new Date().getTimezoneOffset(),
        o = Math.abs(offset)
      const tz = (offset < 0 ? '+' : '-') + ('00' + Math.floor(o / 60)).slice(-2) + ':' + ('00' + (o % 60)).slice(-2)
      const qs = new URLSearchParams()
      qs.set('timezone', tz)
      qs.set('platform', 'web')
      qs.set('name', 'listen-now')
      qs.set('types', 'albums,playlists,stations')
      return `v1/me/recommendations?${qs.toString()}`
    },
    {
      refreshInterval: 7200000,
    }
  )
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
