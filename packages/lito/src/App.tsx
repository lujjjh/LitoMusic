import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { useState } from 'react'
import { initReactI18next } from 'react-i18next'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr'
import { fetcher } from './api'
import Authorize from './Authorize'
import Browse from './Browse'
import ControlButtons from './ControlButtons'
import SetThemeContext from './GlobalThemeContext'
import resources from './i18n/resources.json'
import ListenNow from './ListenNow'
import Lyrics, { LyricsContext } from './Lyrics'
import Player from './Player'
import Radio from './Radio'
import Sidebar from './Sidebar'
import { lightTheme } from './themes'
import useAuthorized from './useAuthorized'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

const Wrapper = styled.div`
  color: ${({ theme }) => theme.textColor};
  height: 100vh;
  display: flex;
  overflow: hidden;
`

const MainScroll = styled.div`
  position: relative;
  background-color: #fff;
  flex: 1;
  min-width: 0;
`

const Main = styled.div`
  box-sizing: border-box;
  padding-top: 60px;
  height: 100%;
  overflow: overlay;
`

const App = () => {
  const [theme, setTheme] = useState(lightTheme)
  const authorized = useAuthorized()
  const [lyricsVisible, setLyricsVisible] = useState(false)
  return (
    <SetThemeContext.Provider value={setTheme}>
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{
            loadingTimeout: 10000,
            fetcher,
          }}
        >
          <LyricsContext.Provider value={{ visible: lyricsVisible, setVisible: setLyricsVisible }}>
            <Wrapper>
              <Router>
                <Sidebar />
                <MainScroll>
                  <Main>
                    {authorized ? (
                      <>
                        <Player />
                        <Switch>
                          <Route path="/" exact>
                            <Redirect to="/listen-now" />
                          </Route>
                          <Route path="/listen-now" component={ListenNow} />
                          <Route path="/browse" component={Browse} />
                          <Route path="/radio" component={Radio} />
                        </Switch>
                      </>
                    ) : (
                      <Authorize />
                    )}
                  </Main>
                </MainScroll>
              </Router>
              <ControlButtons />
              <Lyrics />
            </Wrapper>
          </LyricsContext.Provider>
        </SWRConfig>
      </ThemeProvider>
    </SetThemeContext.Provider>
  )
}

export default App
