export const fetcher = async (url: string) => {
  const {
    api,
    _bag: { store },
  } = MusicKit.getInstance() as any
  const { data } = await api.music(url.replace(/\{storefrontId\}/g, api.storefrontId))
  return store.populateDataRecords(data)
}
