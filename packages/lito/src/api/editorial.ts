import { useMemo } from 'react'
import useSWR from 'swr'

export const useGroupings = (qs: string | URLSearchParams) =>
  useSWR(`v1/editorial/{storefrontId}/groupings?${qs.toString()}`)

export const useMusics = () => {
  const qs = useMemo(() => {
    const qs = new URLSearchParams()
    qs.set('platform', 'web')
    qs.set('name', 'music')
    qs.set('omit[resource:artists]', 'relationships')
    qs.set('include[albums]', 'artists')
    qs.set('include[songs]', 'artists')
    qs.set('extend', 'editorialArtwork,artistUrl')
    qs.set('fields[artists]', 'name,url,artwork,editorialArtwork,genreNames,editorialNotes')
    qs.set('art[url]', 'f')
    return qs.toString()
  }, [])
  const { data, ...props } = useGroupings(qs)
  return {
    data: data?.[0],
    ...props,
  }
}
