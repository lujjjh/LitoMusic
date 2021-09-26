import { useCallback } from 'react'
import styled from 'styled-components'
import SimpleErrorBoundary from '../SimpleErrorBoundary'

export interface RecommendationProps {
  value: PersonalRecommendation
}

export interface PersonalRecommendation {
  id: string
  type: string
  href: string
  attributes: PersonalRecommendation.Attributes
  relationships: PersonalRecommendation.Relationships
}

export namespace PersonalRecommendation {
  export interface Attributes {
    kind: string
    nextUpdateDate: string
    reason: Attributes.Reason
    resourceTypes: string[]
    title: Attributes.Title
  }

  export namespace Attributes {
    export interface Reason {
      stringForDisplay: string
    }

    export interface Title {
      stringForDisplay: string
    }
  }

  export interface Relationships {
    contents: Relationships.PersonalRecommendationContentsRelationship
  }

  export namespace Relationships {
    export interface PersonalRecommendationContentsRelationship {
      href: string
      next: string
      data: any[]
    }
  }
}

const Wrapper = styled.div`
  margin-bottom: 12px;
  padding: 0 40px;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  padding: 13px 0;
  font-size: 17px;
  line-height: 1.29412;
`

const ResourceListScroll = styled.div`
  margin: -15px;
  overflow: hidden;
  &:hover {
    overflow: overlay;
  }
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

const ResourceList = styled.div`
  padding: 15px;
  display: grid;
  grid-row: 1;
  width: fit-content;
  gap: 20px;
  grid-auto-flow: column;
`

const Recommendation = ({ value }: RecommendationProps) => {
  return (
    <Wrapper>
      <Header>{value.attributes.title?.stringForDisplay}</Header>
      <SimpleErrorBoundary>
        <ResourceListScroll>
          <ResourceList>
            {value.relationships.contents.data.map((value) => (
              <Resource key={value.id} value={value} />
            ))}
          </ResourceList>
        </ResourceListScroll>
      </SimpleErrorBoundary>
    </Wrapper>
  )
}

export default Recommendation

interface ResourceProps {
  value: any
}

const ResourceWrapper = styled.div`
  position: relative;
  background-color: var(--background-color);
  width: 160px;
  height: 160px;
  border-radius: 6px;
  box-shadow: 0 4px 14px rgb(0 0 0 / 10%);
  overflow: hidden;
`

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(51, 51, 51, 0.3);
  opacity: 0;
  transition: opacity 0.1s ease;
  &:hover {
    opacity: 1;
  }
`

const PlayButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  appearance: none;
  border: 0 none;
  padding: 0;
  background: none;
  position: relative;
  width: 60px;
  height: 60px;
  fill: #fff;
  backdrop-filter: blur(5px);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    background-color: #e63e44;
  }
`

const Resource = ({ value }: ResourceProps) => {
  const { attributes } = value
  if (!attributes) {
    throw new Error(`attributes not found in resource: ${JSON.stringify(value)}`)
  }
  const { artwork, url } = attributes
  // TODO: some resource's artwork is optional, fallback to render the title?
  if (!artwork) {
    throw new Error(`artwork not found in resource: ${JSON.stringify(value)}`)
  }
  if (!url) {
    throw new Error(`url not found in resource: ${JSON.stringify(value)}`)
  }
  const artworkUrl = artwork.url.replace('{w}', '320').replace('{h}', '320').replace('{c}', 'cc').replace('{f}', 'webp')
  const play = useCallback(async () => {
    const music = MusicKit.getInstance()
    await music.setQueue({ url })
    await music.play()
  }, [])
  return (
    <ResourceWrapper
      style={
        {
          '--background-color': `#${artwork.bgColor}`,
        } as React.CSSProperties
      }
    >
      <img src={artworkUrl} loading="lazy" width="100%" height="100%" alt="" />
      <Overlay>
        <PlayButton type="button" onClick={play}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27">
            <path d="M11.3545232,18.4180929 L18.4676039,14.242665 C19.0452323,13.9290954 19.0122249,13.1204156 18.4676039,12.806846 L11.3545232,8.63141809 C10.7603912,8.26833741 9.98471883,8.54889976 9.98471883,9.19254279 L9.98471883,17.8404645 C9.98471883,18.5006112 10.7108802,18.7976773 11.3545232,18.4180929 Z"></path>
          </svg>
        </PlayButton>
      </Overlay>
    </ResourceWrapper>
  )
}
