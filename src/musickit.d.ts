declare namespace MusicKit {
  interface API {
    music(request_uri: string): Promise<any>
  }

  interface Events {
    configured: unknown
    loaded: unknown
    audioTrackAdded: unknown
    audioTrackChanged: unknown
    audioTrackRemoved: unknown
    authorizationStatusDidChange: unknown
    authorizationStatusWillChange: unknown
    bufferedProgressDidChange: unknown
    capabilitiesChanged: unknown
    autoplayEnabledDidChange: unknown
    drmUnsupported: unknown
    eligibleForSubscribeView: unknown
    forcedTextTrackChanged: unknown
    mediaCanPlay: unknown
    mediaElementCreated: unknown
    mediaItemStateDidChange: unknown
    mediaItemStateWillChange: unknown
    mediaPlaybackError: unknown
    mediaSkipAvailable: unknown
    mediaRollEntered: unknown
    mediaUpNext: unknown
    metadataDidChange: unknown
    nowPlayingItemDidChange: unknown
    nowPlayingItemWillChange: unknown
    playbackBitrateDidChange: unknown
    playbackDurationDidChange: unknown
    playbackProgressDidChange: unknown
    playbackRateDidChange: unknown
    playbackStateDidChange: unknown
    playbackStateWillChange: unknown
    playbackTargetAvailableDidChange: unknown
    playbackTargetIsWirelessDidChange: unknown
    playbackTimeDidChange: unknown
    playbackVolumeDidChange: unknown
    playerTypeDidChange: unknown
    presentationModeDidChange: unknown
    primaryPlayerDidChange: unknown
    queueIsReady: unknown
    queueItemsDidChange: unknown
    queueItemForStartPosition: unknown
    queuePositionDidChange: unknown
    shuffleModeDidChange: unknown
    repeatModeDidChange: unknown
    storefrontCountryCodeDidChange: unknown
    storefrontIdentifierDidChange: unknown
    textTrackAdded: unknown
    textTrackChanged: unknown
    textTrackRemoved: unknown
    timedMetadataDidChange: unknown
    userTokenDidChange: unknown
    webComponentsLoaded: unknown
  }

  const Events: {
    [key in keyof Events]: key
  }

  interface MusicKitInstance {
    nowPlayingItem: MediaItem | undefined
  }
}

namespace JSX {
  interface IntrinsicElements {
    'apple-music-artwork': any
    'apple-music-playback-controls': any
    'apple-music-progress': any
    'apple-music-volume': any
  }
}
