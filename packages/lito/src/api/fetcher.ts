export const fetcher = async (url: string) => {
  const instance = MusicKit.getInstance()
  const {
    api,
    _bag: { store },
  } = instance as any
  try {
    const { data } = await api.music(url)
    return store.populateDataRecords(data)
  } catch (error) {
    if (error instanceof MusicKit.MKError && error.errorCode === MusicKit.MKError.ACCESS_DENIED) {
      instance.unauthorize()
    }
    throw error
  }
}
