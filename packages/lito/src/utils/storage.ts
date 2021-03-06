import { useCallback, useEffect, useMemo, useState } from 'react'

interface CustomStorageEvent extends CustomEvent {
  detail: {
    storageArea: Storage
    key: string
    newValue: string | null
  }
}

declare global {
  interface WindowEventMap {
    customstorage: CustomStorageEvent
  }
}

const _useStorage = (storage: Storage, key: string) => {
  const [value, _setValue] = useState(() => storage.getItem(key))
  useEffect(() => {
    const handleStorage = (e: StorageEvent | CustomStorageEvent) => {
      const detail = 'detail' in e ? e.detail : e
      if (detail.storageArea === storage && detail.key === key) {
        _setValue(detail.newValue)
      }
    }
    addEventListener('storage', handleStorage)
    addEventListener('customstorage', handleStorage)
    return () => {
      removeEventListener('storage', handleStorage)
      removeEventListener('customstorage', handleStorage)
    }
  }, [storage, key])
  const setValue = useCallback(
    (value: string | null) => {
      if (value === null) {
        storage.removeItem(key)
      } else {
        storage.setItem(key, value)
      }
      const detail = {
        storageArea: storage,
        key,
        newValue: value,
      }
      dispatchEvent(new CustomEvent('customstorage', { detail }))
    },
    [storage, key]
  )
  return [value, setValue] as const
}

const createUseStorage = (storage: Storage) => {
  function useStorage<T>(key: string): [T | null, (value: T | null) => void]
  function useStorage<T>(key: string, fallbackValue: T): [T, (value: T | null) => void]
  function useStorage<T>(key: string, fallbackValue?: T) {
    const [_value, _setValue] = _useStorage(storage, key)
    const value = useMemo(() => {
      if (_value === null && fallbackValue !== undefined) {
        return fallbackValue
      }
      if (_value !== null) {
        try {
          return JSON.parse(_value) as T
        } catch {}
      }
      return fallbackValue ?? null
    }, [_value])
    const setValue = (value: T | null) => {
      let _value = null
      if (value !== null) {
        _value = JSON.stringify(value)
      }
      _setValue(_value)
    }
    return [value, setValue] as const
  }
  return useStorage
}

export const useLocalStorage = createUseStorage(window.localStorage)
export const useSessionStorage = createUseStorage(window.sessionStorage)
