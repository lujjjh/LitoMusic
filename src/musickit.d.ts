declare namespace MusicKit {
  interface API {
    music(request_uri: string): Promise<any>
  }

  interface Events {
    mediaItemStateDidChange: unknown
  }

  const Events: {
    [key in keyof Events]: key
  }

  interface MusicKitInstance {
    nowPlayingItem: MediaItem | undefined
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'apple-music-artwork': any
    'apple-music-playback-controls': any
    'apple-music-progress': any
    'apple-music-volume': any
  }
}
