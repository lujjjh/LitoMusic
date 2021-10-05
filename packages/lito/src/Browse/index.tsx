import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useMusics } from '../api/editorial'
import { Header } from '../components'
import Nothing from '../Nothing'
import EditorialElement from './EditorialElement'

const Wrapper = styled.div`
  padding-bottom: 32px;
`

const Browse = () => {
  const { t } = useTranslation()
  const { data, error } = useMusics()
  return (
    <Wrapper>
      <Header>{t('browse')}</Header>
      {error && <Nothing placeholder="fetchFailed" />}
      {data?.tabs?.[0]?.children
        ?.filter((element: any) => element.children || element.contents)
        ?.map((element: any) =>
          element.children
            ? {
                ...element,
                contents: [].concat.apply(
                  [],
                  element.children.map((element: any) => element.contents)
                ),
              }
            : element
        )
        .map((element: any) => (
          <EditorialElement key={element.id} value={element} />
        ))}
    </Wrapper>
  )
}

export default Browse
