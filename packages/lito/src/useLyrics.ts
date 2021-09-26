import { useMemo } from 'react'
import useSWRImmutable from 'swr/immutable'
import useNowPlayingItem from './useNowPlayingItem'

export interface Lyrics {
  lines: LyricsLine[]
}

export interface LyricsLine {
  begin: number
  end: number
  text: string
}

const parseLyrics = (xmlString: string): Lyrics => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(xmlString, 'application/xml')
  const lines = [...dom.querySelectorAll('body p')]
    .map((node) => ({
      begin: parseTime(String(node.getAttribute('begin'))),
      end: parseTime(String(node.getAttribute('end'))),
      text: node.textContent,
    }))
    .filter(({ begin, end }) => begin !== null && end !== null)
    .map((line) => line as LyricsLine)
  return { lines }
}

const parseTime = (timeString: string) => {
  const match = /^(?:(?:(\d+):)?(\d+):)?(\d+).(\d+)/.exec(timeString)
  if (!match) return null
  return +(match[1] || 0) * 60 * 60 * 1000 + +(match[2] || 0) * 60 * 1000 + +match[3] * 1000 + +match[4]
}

const useLyrics = () => {
  const nowPlayingItem = useNowPlayingItem()
  const id = useMemo(() => nowPlayingItem?.id, [nowPlayingItem])
  const { data, isValidating, error } = useSWRImmutable(
    () => {
      if (id === undefined) {
        return null
      }
      return `v1/catalog/${MusicKit.getInstance().api.storefrontId}/songs/${id}/lyrics`
    },
    {
      shouldRetryOnError: false,
    }
  )
  const lyrics = useMemo(() => {
    if (Array.isArray(data)) {
      const lyrics = data.find((item) => item?.type === 'lyrics')
      if (lyrics?.attributes?.ttml) return parseLyrics(String(lyrics.attributes.ttml))
    }
    return null
  }, [data])
  return { lyrics, isValidating, error }
}

export default useLyrics
