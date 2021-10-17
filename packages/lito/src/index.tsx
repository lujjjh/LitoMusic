import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle, css } from 'styled-components'
import App from './App'
import { getDeveloperToken } from './utils'

Sentry.init({
  dsn: 'https://0bcefbb4d3954ecc9505b4e6b31aa09e@o1022804.ingest.sentry.io/5992711',
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0,
})

const GlobalStyle = createGlobalStyle`${css`
  body {
    margin: 0;
    overflow: hidden;
    color: #333;
    font-size: 13px;
    font-family: system-ui;
    background-color: transparent;
  }

  input,
  textarea,
  button {
    --app-region: none;
  }

  :not(input):not(textarea) {
    cursor: default;
    user-select: none;
  }

  *:focus {
    outline: none;
  }

  button {
    height: 28px;
    padding: 0 10px;
    color: inherit;
    font: inherit;
    background-color: rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 5px;
    appearance: none;

    &:active {
      background-color: rgba(0, 0, 0, 0.15);
    }
  }

  #musickit-dialog-scrim {
    z-index: 1000;
  }
`}
`

;(async () => {
  const developerToken = await getDeveloperToken()
  await MusicKit.configure({
    developerToken,
  })

  ReactDOM.render(
    <React.StrictMode>
      <App />
      <GlobalStyle />
    </React.StrictMode>,
    document.getElementById('root')
  )
})()

document.addEventListener('mousedown', (e) => {
  if (e.button !== 1) return
  e.preventDefault()
  e.stopPropagation()
})
