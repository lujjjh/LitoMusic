import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import NavButton from './NavButton'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: rgba(249, 249, 249, 0.96);

  ul {
    flex: 1;
    min-height: 0;
    overflow: overlay;
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0 10px;
  }

  a {
    display: block;
    padding: 0 12px;
    color: inherit;
    font: inherit;
    line-height: 28px;
    text-decoration: none;
    border-radius: 5px;
    &.active {
      background-color: rgba(60, 60, 67, 0.1);
    }
  }
`

const Logo = styled.div`
  height: 60px;
  line-height: 60px;
  -webkit-app-region: drag;
  padding: 0 22px;
  margin-bottom: 10px;
  font-size: 15px;
  color: #000;
`

const Sidebar = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Logo>Lito Music</Logo>
      <ul>
        <li>
          <NavButton to="/">{t('listenNow')}</NavButton>
        </li>
      </ul>
    </Wrapper>
  )
}

export default Sidebar
