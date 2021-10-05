import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import logo from './logo.svg'
import NavButton from './NavButton'
import { isMacOS } from './utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: ${isMacOS() ? 'transparent' : `rgba(249, 249, 249, 0.96)`};

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
  background: url(${logo}) center center no-repeat;
  background-size: 30px 30px;
  height: 60px;
  --app-region: drag;
  margin-bottom: 10px;
  color: #000;
  opacity: ${isMacOS() ? 0 : 1};
`

const Sidebar = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Logo />
      <ul>
        <li>
          <NavButton to="/listen-now">{t('listenNow')}</NavButton>
        </li>
        <li>
          <NavButton to="/browse">{t('browse')}</NavButton>
        </li>
      </ul>
    </Wrapper>
  )
}

export default Sidebar
