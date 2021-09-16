import useRequest from '@ahooksjs/use-request'
import styled from 'styled-components'
import Recommendation from './Recommendation'

const Wrapper = styled.div`
  flex: 1;
  min-width: 0;
  padding-bottom: 32px;
  overflow: overlay;
`

const Header = styled.div`
  margin: 32px 40px 16px;
  font-size: 34px;
  font-weight: 500;
`

const ListenNow = () => {
  const { data: recommendationList } = useRequest(async () => {
    const instance = MusicKit.getInstance()
    const offset = new Date().getTimezoneOffset(),
      o = Math.abs(offset)
    const tz = (offset < 0 ? '+' : '-') + ('00' + Math.floor(o / 60)).slice(-2) + ':' + ('00' + (o % 60)).slice(-2)
    const {
      data: { data },
    } = await instance.api.music(
      `v1/me/recommendations?timezone=${encodeURIComponent(
        tz
      )}&with=friendsMix%2Clibrary&name=listen-now&art%5Burl%5D=c%2Cf&omit%5Bresource%5D=autos&relate%5Beditorial-items%5D=contents&extend=editorialCard%2CeditorialVideo&extend%5Balbums%5D=artistUrl&extend%5Bplaylists%5D=artistNames%2CeditorialArtwork&extend%5Bsocial-profiles%5D=topGenreNames&include%5Balbums%5D=artists&include%5Bsongs%5D=artists&include%5Bmusic-videos%5D=artists&fields%5Balbums%5D=artistName%2CartistUrl%2Cartwork%2CcontentRating%2CeditorialArtwork%2CeditorialVideo%2Cname%2CplayParams%2CreleaseDate%2Curl&fields%5Bartists%5D=name%2Curl&extend%5Bstations%5D=airDate%2CsupportsAirTimeUpdates&meta%5Bstations%5D=inflectionPoints&types=artists%2Calbums%2Ceditorial-items%2Clibrary-albums%2Clibrary-playlists%2Cmusic-movies%2Cmusic-videos%2Cplaylists%2Cstations%2Cuploaded-audios%2Cuploaded-videos%2Cactivities%2Capple-curators%2Ccurators%2Ctv-shows&relate=catalog&platform=web`
    )
    return data
  })
  return (
    <Wrapper>
      <Header>Listen now</Header>
      {recommendationList?.map((value: any) => (
        <Recommendation key={value.id} value={value} />
      ))}
    </Wrapper>
  )
}

export default ListenNow
