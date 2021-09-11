import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  border-right: 1px solid #e1e0df;
  box-sizing: border-box;

  .draggable {
    height: 50px;
    -webkit-app-region: drag;
  }

  ul {
    flex: 1;
    min-height: 0;
    overflow: auto;
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
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`

const Sidebar = () => (
  <Wrapper>
    <div className="draggable"></div>
    <ul>
      <li>
        <NavLink to="/">Listen now</NavLink>
      </li>
    </ul>
  </Wrapper>
)

export default Sidebar
