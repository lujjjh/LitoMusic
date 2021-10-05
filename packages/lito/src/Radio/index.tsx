import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useRadios } from '../api/editorial'
import { Header, ResourceList } from '../components'
import Nothing from '../Nothing'

const Wrapper = styled.div`
  padding-bottom: 32px;
`

const Radio = () => {
  const { t } = useTranslation()
  const { data, error } = useRadios()
  return (
    <Wrapper>
      <Header>{t('radio')}</Header>
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
          <ResourceList key={element.id} title={element.name} resources={element.contents} />
        ))}
    </Wrapper>
  )
}

export default Radio
