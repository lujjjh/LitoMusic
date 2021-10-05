import { useCallback, useMemo } from 'react'
import { matchPath, useHistory, useLocation } from 'react-router'
import styled from 'styled-components'

export interface NavButtonProps {
  to: string
  children?: React.ReactNode
}

const Button = styled.button`
  width: 100%;
  padding: 0 12px;
  line-height: 28px;
  border-radius: 5px;
  text-align: left;
  &,
  &:active {
    background-color: transparent;
  }
  &.active {
    background-color: rgba(60, 60, 67, 0.1);
  }
`

const NavButton = ({ to, children }: NavButtonProps) => {
  const { push } = useHistory()
  const { pathname } = useLocation()
  const handleClick = useCallback(() => {
    push(to)
  }, [push, to])
  const active = useMemo(() => matchPath(pathname, { path: to }), [pathname, to])
  return (
    <Button className={[active ? 'active' : ''].join(' ')} type="button" children={children} onClick={handleClick} />
  )
}

export default NavButton
