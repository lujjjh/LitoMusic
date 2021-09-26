import React from 'react'
import { DefaultTheme } from 'styled-components'

const SetThemeContext = React.createContext((_theme: DefaultTheme) => {})

export const useSetTheme = () => React.useContext(SetThemeContext)

export default SetThemeContext
