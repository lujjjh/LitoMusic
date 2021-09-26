import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 10px;
  min-width: 200px;
  background-color: #fff4f4;
  color: #9e0606;
`

const SimpleErrorBoundary = ({ children }: React.PropsWithChildren<{}>) => (
  <ErrorBoundary
    children={children}
    fallbackRender={({ error }) => {
      return <Wrapper>{error.toString()}</Wrapper>
    }}
  />
)

export default SimpleErrorBoundary
