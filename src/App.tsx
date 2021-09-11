import { HashRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import Authorize from './Authorize'
import ListenNow from './ListenNow'
import Sidebar from './Sidebar'
import useAuthorized from './useAuthorized'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
`

const Main = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  background-color: #fff;
  overflow: auto;
`

const App = () => {
  const authorized = useAuthorized()
  return (
    <Wrapper>
      <Router>
        <Sidebar />
        <Main>
          {authorized ? (
            <>
              <Route path="/" component={ListenNow} />
            </>
          ) : (
            <Authorize />
          )}
        </Main>
      </Router>
    </Wrapper>
  )
}

export default App
