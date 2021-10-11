import styled from 'styled-components'
import { useNowPlayingItem } from '../utils'
import ProgressControl from './ProgressControl'

const Wrapper = styled.div`
  flex: 4;
  min-width: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 2px;
  height: 100%;
  display: flex;
`

const Artwork = styled.div`
  img {
    display: block;
  }
`

const Meta = styled.dl`
  margin: 0;
  padding: 0 10px;
  flex: 1;
  min-width: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  dt,
  dd {
    margin: 0;
    overflow: hidden;
    line-height: 1.1em;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  dt {
    color: #000;
  }
  dd {
    margin-top: 2px;
    font-size: 12px;
    opacity: 0.6;
  }
  dd:nth-child(1) {
    opacity: 1;
  }
  dd:empty {
    display: none;
  }
  dd:not(:empty) + dd {
    display: none;
  }
`

const MediaItem = () => {
  const mediaItem = useNowPlayingItem(true)
  return (
    <Wrapper>
      <Artwork>
        <apple-music-artwork width="44" />
      </Artwork>
      <Meta>
        {mediaItem && (
          <>
            <dt>{mediaItem.title}</dt>
            <dd>
              {mediaItem.artistName} - {mediaItem.albumName}
            </dd>
            <ProgressControl />
          </>
        )}
      </Meta>
    </Wrapper>
  )
}

export default MediaItem
