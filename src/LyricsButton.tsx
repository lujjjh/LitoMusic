import { useCallback } from 'react'
import styled from 'styled-components'
import { useLyricsContext } from './Lyrics'

const Wrapper = styled.div`
  position: relative;
  input[type='checkbox'] {
    width: 32px;
    height: 32px;
    margin: 0;
    appearance: none;
    & + svg {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.3;
      pointer-events: none;
    }
    &:active + svg,
    &:checked + svg {
      opacity: 1;
    }
  }
`

const LyricsButton = () => {
  const { visible, setVisible } = useLyricsContext()
  const handleChange = useCallback(() => {
    setVisible(!visible)
  }, [visible, setVisible])
  return (
    <Wrapper>
      <input type="checkbox" checked={visible} onChange={handleChange} />
      <svg width="32" height="32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M139.583 90.9479C139.583 99.4417 137.275 107.265 133.813 112.852C129.89 119.556 123.658 124.473 117.89 128.273C116.967 128.944 116.044 129.167 114.89 129.167C112.813 129.167 110.735 128.05 109.581 126.485C109.119 125.367 108.658 124.25 108.658 122.908C108.658 121.121 109.35 119.333 110.965 118.215C114.658 115.979 118.35 113.075 121.121 110.169C123.198 107.933 125.044 104.581 125.275 101.229V100.781C125.275 99.8875 124.813 99.6646 124.121 99.6646H123.429C122.044 99.8875 121.581 99.8875 120.89 99.8875C113.504 99.8875 106.81 94.3 106.81 85.5833C106.81 77.7625 112.352 70.8333 122.044 70.8333C131.506 70.8333 139.583 77.5375 139.583 90.9479ZM93.1875 90.9479C93.1875 99.4417 90.8813 107.265 87.4188 112.852C83.4958 119.556 77.2646 124.473 71.4938 128.273C70.5708 128.944 69.6479 129.167 68.4938 129.167C66.4167 129.167 64.3396 128.05 63.1854 126.485C62.725 125.367 62.2625 124.25 62.2625 122.908C62.2625 121.121 62.9563 119.333 64.5708 118.215C68.2625 115.979 71.9563 113.075 74.725 110.169C76.8021 107.933 78.6479 104.581 78.8792 101.229V100.781C78.8792 99.8875 78.4188 99.6646 77.725 99.6646H77.0333C75.6479 99.8875 75.1875 99.8875 74.4938 99.8875C67.1104 99.8875 60.4167 94.3 60.4167 85.5833C60.4167 77.7625 65.9563 70.8333 75.6479 70.8333C85.1104 70.8333 93.1896 77.5375 93.1896 90.9479H93.1875Z"
        />
      </svg>
    </Wrapper>
  )
}

export default LyricsButton