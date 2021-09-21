!(function (e, s) {
  'object' == typeof exports && 'undefined' != typeof module
    ? s(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], s)
    : s(((e = 'undefined' != typeof globalThis ? globalThis : e || self).MusicKit = {}))
})(this, function (e) {
  'use strict'
  var s = void 0 !== typeof self ? self : this
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */ function __decorate$2(e, s, n, d) {
    var h,
      p = arguments.length,
      y = p < 3 ? s : null === d ? (d = Object.getOwnPropertyDescriptor(s, n)) : d
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) y = Reflect.decorate(e, s, n, d)
    else for (var m = e.length - 1; m >= 0; m--) (h = e[m]) && (y = (p < 3 ? h(y) : p > 3 ? h(s, n, y) : h(s, n)) || y)
    return p > 3 && y && Object.defineProperty(s, n, y), y
  }
  function __metadata$2(e, s) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata) return Reflect.metadata(e, s)
  }
  function __awaiter$4(e, s, n, d) {
    return new (n || (n = Promise))(function (h, p) {
      function fulfilled(e) {
        try {
          step(d.next(e))
        } catch (_t) {
          p(_t)
        }
      }
      function rejected(e) {
        try {
          step(d.throw(e))
        } catch (_t) {
          p(_t)
        }
      }
      function step(e) {
        var s
        e.done
          ? h(e.value)
          : ((s = e.value),
            s instanceof n
              ? s
              : new n(function (e) {
                  e(s)
                })).then(fulfilled, rejected)
      }
      step((d = d.apply(e, s || [])).next())
    })
  }
  function formatArtworkURL(e, s, n) {
    return (
      (s = s || e.height || 100),
      (n = n || e.width || 100),
      window.devicePixelRatio >= 1.5 && ((n *= 2), (s *= 2)),
      e.url
        .replace('{h}', '' + s)
        .replace('{w}', '' + n)
        .replace('{f}', 'jpeg')
    )
  }
  const K = () => {},
    asAsync = (e) => {
      e.then(K, K)
    },
    n = K
  function isLive(e) {
    return !!e && !!e.attributes && !!e.attributes.isLive
  }
  function isStream$2(e) {
    var s, n
    return (
      'stream' ===
      (null === (n = null === (s = null == e ? void 0 : e.attributes) || void 0 === s ? void 0 : s.playParams) ||
      void 0 === n
        ? void 0
        : n.format)
    )
  }
  function isLiveRadioStation(e) {
    return isLive(e) && isStream$2(e)
  }
  function isLiveRadioKind(e, s) {
    var n
    return isLiveRadioStation(e) && (null === (n = e.attributes) || void 0 === n ? void 0 : n.mediaKind) === s
  }
  function isBroadcastRadio(e) {
    return (
      isLive(e) &&
      isStream$2(e) &&
      void 0 !== e.attributes.stationProviderName &&
      'Shoutcast' === e.attributes.streamingRadioSubType
    )
  }
  function getFilterFromFlags(e) {
    const s = e.includes('radio-live'),
      n = e.includes('radio-aod'),
      d = e.includes('radio-broadcast')
    return (e) =>
      (!s || (s && !isLiveRadioStation(e))) &&
      (!n ||
        (n &&
          !(function (e) {
            return !isLive(e) && isStream$2(e) && 'Episode' === e.attributes.streamingRadioSubType
          })(e))) &&
      (!d || (d && !isBroadcastRadio(e)))
  }
  const d = { album: 'albums', albums: 'albums', artist: 'artists', artists: 'artists', song: 'songs', songs: 'songs' }
  function normalizeContentType(e) {
    let s = d[e]
    return (
      s ||
      ((s = e.replace(/_|[A-Z]/g, (e, s) => ('_' === e ? '-' : ((e = e.toLowerCase()), 0 === s ? e : '-' + e)))),
      e.endsWith('y') ? (s = s.substring(0, s.length - 1) + 'ies') : s.endsWith('s') || (s += 's'),
      (d[e] = s),
      s)
    )
  }
  const h = {
      400: 'REQUEST_ERROR',
      401: 'UNAUTHORIZED_ERROR',
      403: 'ACCESS_DENIED',
      404: 'NOT_FOUND',
      405: 'NOT_FOUND',
      413: 'REQUEST_ERROR',
      414: 'REQUEST_ERROR',
      429: 'QUOTA_EXCEEDED',
      500: 'SERVER_ERROR',
      501: 'NOT_FOUND',
      503: 'SERVICE_UNAVAILABLE',
    },
    p = {
      '-1004': 'DEVICE_LIMIT',
      1010: h[404],
      2002: 'AUTHORIZATION_ERROR',
      2034: 'TOKEN_EXPIRED',
      3059: 'DEVICE_LIMIT',
      3063: 'SUBSCRIPTION_ERROR',
      3076: 'CONTENT_UNAVAILABLE',
      3082: 'CONTENT_RESTRICTED',
      3084: 'STREAM_UPSELL',
      5002: h[500],
      180202: 'PLAYREADY_CBC_ENCRYPTION_ERROR',
      190121: 'WIDEVINE_CDM_EXPIRED',
    },
    y = [],
    m = new Set([
      'UNSUPPORTED_ERROR',
      'CONTENT_EQUIVALENT',
      'CONTENT_UNAVAILABLE',
      'CONTENT_UNSUPPORTED',
      'SERVER_ERROR',
      'SUBSCRIPTION_ERROR',
    ])
  class MKError extends Error {
    constructor(e, s) {
      super(),
        (this.errorCode = 'UNKNOWN_ERROR'),
        e && m.has(e)
          ? ((this.name = this.errorCode = e), (this.message = this.description = s || e))
          : s || 'string' != typeof e
          ? ((this.name = this.errorCode = e || 'UNKNOWN_ERROR'), s && (this.message = this.description = s))
          : ((this.name = this.errorCode = 'UNKNOWN_ERROR'), (this.message = this.description = e)),
        y.push(this),
        Error.captureStackTrace && Error.captureStackTrace(this, MKError)
    }
    static get errors() {
      return y
    }
    static playActivityError(e) {
      return new this('PLAY_ACTIVITY', e)
    }
    static parseError(e) {
      return new this('PARSE_ERROR', e)
    }
    static responseError(e) {
      let { status: s, statusText: n } = e
      const d = new this(h[s] || 'NETWORK_ERROR', n || '' + s)
      return (d.data = e), d
    }
    static serverError(e) {
      let { status: s, dialog: n, failureType: d, customerMessage: h, errorMessage: y, message: m } = e
      n && ((m = n.message || n.customerMessage || n.errorMessage), (n.message = m))
      let g = p[d] || p[s] || 'UNKNOWN_ERROR',
        v = new this(g, m || h || y)
      return (
        'STREAM_UPSELL' === g &&
          n &&
          n.okButtonAction &&
          n.okButtonAction.url &&
          (n.okButtonAction.url = n.okButtonAction.url.replace(
            /\&(?:challenge|key-system|uri|user-initiated)=[^\&]+/gim,
            ''
          )),
        (v.dialog = n),
        v
      )
    }
    static internalError(e) {
      return new this(MKError.INTERNAL_ERROR, e)
    }
  }
  ;(MKError.ACCESS_DENIED = h[403]),
    (MKError.AGE_VERIFICATION = 'AGE_VERIFICATION'),
    (MKError.AUTHORIZATION_ERROR = p[2002]),
    (MKError.CONFIGURATION_ERROR = 'CONFIGURATION_ERROR'),
    (MKError.CONTENT_EQUIVALENT = 'CONTENT_EQUIVALENT'),
    (MKError.CONTENT_RESTRICTED = p[3082]),
    (MKError.CONTENT_UNAVAILABLE = p[3076]),
    (MKError.CONTENT_UNSUPPORTED = 'CONTENT_UNSUPPORTED'),
    (MKError.DEVICE_LIMIT = p[3059]),
    (MKError.INVALID_ARGUMENTS = 'INVALID_ARGUMENTS'),
    (MKError.PLAYREADY_CBC_ENCRYPTION_ERROR = 'PLAYREADY_CBC_ENCRYPTION_ERROR'),
    (MKError.MEDIA_CERTIFICATE = 'MEDIA_CERTIFICATE'),
    (MKError.MEDIA_DESCRIPTOR = 'MEDIA_DESCRIPTOR'),
    (MKError.MEDIA_LICENSE = 'MEDIA_LICENSE'),
    (MKError.MEDIA_KEY = 'MEDIA_KEY'),
    (MKError.MEDIA_PLAYBACK = 'MEDIA_PLAYBACK'),
    (MKError.MEDIA_SESSION = 'MEDIA_SESSION'),
    (MKError.NETWORK_ERROR = 'NETWORK_ERROR'),
    (MKError.NOT_FOUND = p[1010]),
    (MKError.PARSE_ERROR = 'PARSE_ERROR'),
    (MKError.PLAY_ACTIVITY = 'PLAY_ACTIVITY'),
    (MKError.QUOTA_EXCEEDED = h[429]),
    (MKError.REQUEST_ERROR = h[400]),
    (MKError.SERVER_ERROR = p[5002]),
    (MKError.SERVICE_UNAVAILABLE = h[503]),
    (MKError.STREAM_UPSELL = p[3084]),
    (MKError.SUBSCRIPTION_ERROR = p[3063]),
    (MKError.TOKEN_EXPIRED = p[2034]),
    (MKError.UNAUTHORIZED_ERROR = h[401]),
    (MKError.UNKNOWN_ERROR = 'UNKNOWN_ERROR'),
    (MKError.UNSUPPORTED_ERROR = 'UNSUPPORTED_ERROR'),
    (MKError.INTERNAL_ERROR = 'INTERNAL_ERROR'),
    (MKError.OUTPUT_RESTRICTED = 'OUTPUT_RESTRICTED'),
    (MKError.WIDEVINE_CDM_EXPIRED = 'WIDEVINE_CDM_EXPIRED')
  class Notifications {
    constructor(e = [], s) {
      ;(this._eventRegistry = {}),
        e.forEach((e) => {
          this._eventRegistry[e] = []
        }),
        s && s.namespace && (this.dispatchNamespace = 'com.apple.' + s.namespace),
        this.shouldStorageDispatch &&
          ((this._handleGlobalStorageEvent = this._handleGlobalStorageEvent.bind(this)),
          window.addEventListener('storage', this._handleGlobalStorageEvent))
    }
    get shouldStorageDispatch() {
      return 'undefined' != typeof window && 'undefined' != typeof sessionStorage && this.dispatchNamespace
    }
    addEventListener(e, s) {
      Array.isArray(this._eventRegistry[e]) && this._eventRegistry[e].push(s)
    }
    dispatchEvent(e, s) {
      Array.isArray(this._eventRegistry[e]) && this._eventRegistry[e].forEach((e) => e(s))
    }
    dispatchDistributedEvent(e, s) {
      if ((this.dispatchEvent(e, s), this.shouldStorageDispatch)) {
        let n = `${this.dispatchNamespace}:${e}`
        sessionStorage.setItem(n, JSON.stringify(s))
      }
    }
    removeEventListener(e, s) {
      if (Array.isArray(this._eventRegistry[e])) {
        let n = this._eventRegistry[e].indexOf(s)
        this._eventRegistry[e].splice(n, 1)
      }
    }
    _handleGlobalStorageEvent(e) {
      var s
      if (
        this.dispatchNamespace &&
        (null === (s = e.key) || void 0 === s ? void 0 : s.startsWith(this.dispatchNamespace + ':'))
      ) {
        const s = e.key.substring(this.dispatchNamespace.length + 1)
        this.dispatchEvent(s, JSON.parse(e.newValue))
      }
    }
  }
  var g =
    'undefined' != typeof FastBoot
      ? FastBoot.require('buffer').Buffer
      : 'undefined' != typeof process && null !== process.versions && null !== process.versions.node
      ? Buffer
      : window.Buffer
  function memoize(e) {
    return function (...s) {
      let n = '',
        d = s.length
      for (; d--; ) {
        let h = s[d]
        ;(n += h === Object(h) ? JSON.stringify(h) : h), e._memoized || (e._memoized = {})
      }
      return n in e._memoized ? e._memoized[n] : (e._memoized[n] = e.apply(void 0, s))
    }
  }
  function generateUUID() {
    let e = strRandomizer() + strRandomizer()
    for (; e.length < 16; ) e += strRandomizer()
    return e.slice(0, 16)
  }
  function strRandomizer() {
    return Math.random().toString(16).substring(2)
  }
  const v = memoize((e) => /^[a|i|l|p]{1}\.[a-zA-Z0-9]+$/.test(e))
  function isNodeEnvironment$1(e) {
    const isDefined = (e) => null != e
    return (
      0 === arguments.length && 'undefined' != typeof process && (e = process),
      (isDefined(e) && isDefined(e.versions) && isDefined(e.versions.node)) || 'undefined' != typeof FastBoot
    )
  }
  const _ = memoize(isNodeEnvironment$1() ? (e) => g.from(e, 'base64').toString('binary') : (e) => window.atob(e))
  memoize(isNodeEnvironment$1() ? (e) => g.from(e).toString('base64') : (e) => window.btoa(e))
  const debounce = (e, s = 250, n = { isImmediate: !1 }) => {
      let d
      return function (...h) {
        const p = this,
          y = n.isImmediate && void 0 === d
        void 0 !== d && clearTimeout(d),
          (d = setTimeout(function () {
            ;(d = void 0), n.isImmediate || e.apply(p, h)
          }, s)),
          y && e.apply(p, h)
      }
    },
    exceptFields = (e, ...s) => {
      let n = {}
      return (
        Object.keys(e).forEach((d) => {
          s.includes(d) || (n[d] = e[d])
        }),
        n
      )
    },
    arrayEquals = (e, s) => !!e && !!s && [].every.call(e, (e, n) => e === s[n]),
    b = [
      'contributors',
      'Episode',
      'modalities',
      'Movie',
      'musicVideo',
      'podcast-episodes',
      'radioStation',
      'Show',
      'song',
      'uploaded-audios',
      'uploadedAudio',
      'uploaded-videos',
      'uploadedVideo',
      'Vod',
      'workouts',
      'workout-programs',
    ],
    T = { 'uploaded-videos': !0, uploadedVideo: !0, 'uploaded-audios': !0, uploadedAudio: !0, 'podcast-episodes': !0 },
    E = { mediaItemStateDidChange: 'mediaItemStateDidChange', mediaItemStateWillChange: 'mediaItemStateWillChange' },
    S = ['trace', 'debug', 'info', 'warn', 'error']
  class Nonsole {}
  S.forEach((e) => {
    Nonsole.prototype[e] = () => {}
  })
  const k = new Nonsole(),
    getConsole = () => ('undefined' == typeof console ? k : console),
    P = 'undefined' == typeof localStorage ? void 0 : localStorage,
    getConfiguredLevel = (e = 'mk-debug', s = S.length) => parseInt(A(e, s), 10),
    A = memoize((e, s) => {
      var n, d
      return null !== (d = null === (n = null == P ? void 0 : P.getItem) || void 0 === n ? void 0 : n.call(P, e)) &&
        void 0 !== d
        ? d
        : '' + s
    }),
    getAllowedLevels = (e) => (isNaN(e) || e < 0 ? [] : S.slice(e)),
    canLogTopic = (e, s) => {
      const n = ((e = 'mk-debug-topic', s = '*') => A(e, s))(s)
      return I(n).some((s) => s.test(e))
    },
    I = memoize((e) =>
      e.split(/[\s,]+/).map((e) => {
        const s = e.replace(/\*/g, '.*?')
        return new RegExp('^' + s + '$')
      })
    ),
    trace = (e, ...s) => logMessage(Object.assign({ level: 'trace' }, e), ...s),
    debug = (e, ...s) => logMessage(Object.assign({ level: 'debug' }, e), ...s),
    warn = (e, ...s) => logMessage(Object.assign({ level: 'warn' }, e), ...s),
    error$1 = (e, ...s) => logMessage(Object.assign({ level: 'error' }, e), ...s),
    log = (e, ...s) => logMessage(e, ...s),
    logMessage = (e, ...s) => {
      let { level: n, levelKey: d, topic: h, topicKey: p } = e
      if (((n = null != n ? n : 'debug'), !((e, s) => -1 !== getAllowedLevels(getConfiguredLevel(s)).indexOf(e))(n, d)))
        return
      if (!canLogTopic(h, p)) return
      const y = getConsole()
      if ('function' != typeof y[n]) return
      let [m, ...g] = s
      void 0 !== h && (m = `${h}: ${m}`), y[n](m, ...g)
    }
  class Logger$1 {
    constructor(e) {
      var s, n, d, h
      ;(this._levelFilterKey = 'mk-debug'),
        'string' == typeof e
          ? ((this._levelFilterKey = e), (this.level = getConfiguredLevel(this._levelFilterKey, 5)))
          : 'object' == typeof e
          ? ((this._levelFilterKey = null !== (s = e.levelFilterStorageKey) && void 0 !== s ? s : this._levelFilterKey),
            (this._topicFilterKey =
              null !== (n = e.topicFilterStorageKey) && void 0 !== n
                ? n
                : this.generateDefaultTopicFilterStorageKey(this._levelFilterKey)),
            (this.topic = e.topic),
            (this.level = null !== (d = e.level) && void 0 !== d ? d : getConfiguredLevel(this._levelFilterKey, 5)))
          : (this.level = null != e ? e : getConfiguredLevel(this._levelFilterKey, 5)),
        (this._topicFilterKey =
          null !== (h = this._topicFilterKey) && void 0 !== h
            ? h
            : this.generateDefaultTopicFilterStorageKey(this._levelFilterKey))
    }
    get enabled() {
      return this.level < 5
    }
    set enabled(e) {
      this.level = e ? 1 : 5
    }
    debug(e, ...s) {
      this.callLogMethod(debug, e, ...s)
    }
    error(e, ...s) {
      this.callLogMethod(error$1, e, ...s)
    }
    log(e, ...s) {
      this.callLogMethod(log, e, ...s)
    }
    trace(e, ...s) {
      this.callLogMethod(trace, e, ...s)
    }
    warn(e, ...s) {
      this.callLogMethod(warn, e, ...s)
    }
    callLogMethod(e, s, ...n) {
      var d, h
      const p = { levelKey: this._levelFilterKey, topicKey: this._topicFilterKey, topic: this.topic }
      let y = s
      var m
      'object' == typeof (m = s) &&
        null !== m &&
        'string' == typeof m.topic &&
        ((p.topic = null !== (d = s.topic) && void 0 !== d ? d : p.topic),
        (y = null !== (h = s.message) && void 0 !== h ? h : n.shift())),
        e(p, y, ...n)
    }
    generateDefaultTopicFilterStorageKey(e) {
      return e + '-topic'
    }
  }
  const w = new Logger$1(),
    R = new Logger$1()
  var O, C
  ;(e.PlaybackType = void 0),
    ((O = e.PlaybackType || (e.PlaybackType = {}))[(O.none = 0)] = 'none'),
    (O[(O.preview = 1)] = 'preview'),
    (O[(O.unencryptedFull = 2)] = 'unencryptedFull'),
    (O[(O.encryptedFull = 3)] = 'encryptedFull'),
    (function (e) {
      ;(e[(e.none = 0)] = 'none'),
        (e[(e.loading = 1)] = 'loading'),
        (e[(e.ready = 2)] = 'ready'),
        (e[(e.playing = 3)] = 'playing'),
        (e[(e.ended = 4)] = 'ended'),
        (e[(e.unavailable = 5)] = 'unavailable'),
        (e[(e.restricted = 6)] = 'restricted'),
        (e[(e.error = 7)] = 'error'),
        (e[(e.unsupported = 8)] = 'unsupported')
    })(C || (C = {}))
  const {
      none: M,
      loading: N,
      ready: D,
      playing: L,
      ended: x,
      unavailable: U,
      restricted: $,
      error: B,
      unsupported: F,
    } = C,
    j = {
      [M]: { allowed: [N], unknown: [x, U, $, B, F] },
      [N]: { allowed: [D, $, B, F], unknown: [] },
      [D]: { allowed: [L], unknown: [B] },
      [L]: { allowed: [x, B], unknown: [U, $, F] },
      [x]: { allowed: [], unknown: [] },
      [U]: { allowed: [], unknown: [] },
      [$]: { allowed: [], unknown: [] },
      [B]: { allowed: [], unknown: [] },
      [F]: { allowed: [], unknown: [] },
    },
    toName = (e) => C[e],
    createMediaItemStateGuard = (e = M) => {
      const s = {
        current: e,
        set(e) {
          const { current: n } = s
          if (!((e, s) => j[e].allowed.includes(s))(n, e)) {
            const s = ((e, s) => j[e].unknown.includes(s))(n, e)
            R.debug(
              `MediaItem.state was changed from ${toName(n)} to ${toName(e)}`,
              s ? 'but it is unknown whether it should be allowed or not.' : 'and it should not be happening'
            )
          }
          s.current = e
        },
      }
      return s
    }
  function isStringNotEmpty(e) {
    return !(function (e) {
      return void 0 === e || '' === e.trim()
    })(e)
  }
  const V = Object.prototype.hasOwnProperty
  function isEmpty(e) {
    if ('object' != typeof e) throw new TypeError('Source is not an Object')
    for (let s in e) if (V.call(e, s)) return !1
    return !0
  }
  function transform$8(e, s, n = !1) {
    return (
      n && (e = Object.keys(e).reduce((s, n) => ((s[e[n]] = n), s), {})),
      Object.keys(e).reduce((n, d) => {
        let h,
          p = e[d]
        return (
          (h =
            'function' == typeof p
              ? p()
              : (function (e, s) {
                  return s.split('.').reduce((e, s) => {
                    if (void 0 !== e) return e[s]
                  }, e)
                })(s, p)),
          h &&
            (function (e, s, n) {
              s.split('.').reduce((s, d, h, p) => {
                const y = h === p.length - 1,
                  m = s.hasOwnProperty(d),
                  g = s[d] instanceof Object,
                  v = null === s[d]
                if (!y && m && (!g || v))
                  throw new TypeError(`Value at ${p.slice(0, h + 1).join('.')} in keypath is not an Object.`)
                return y ? ((s[d] = n), e) : m ? s[d] : (s[d] = {})
              }, e)
            })(n, d, h),
          n
        )
      }, {})
    )
  }
  function transform$7(e) {
    return transform$8(
      {
        'attributes.albumName': 'metadata.playlistName',
        'attributes.artistName': 'metadata.artistName',
        'attributes.artwork'() {
          const s = null == e ? void 0 : e.artworkURL
          if (s)
            return (function (e) {
              const s = e.split('/').pop(),
                [n, d] = (!!s && s.match(/\d+/g)) || ['100', '100']
              return { width: parseInt(n, 10), height: parseInt(d, 10), url: e.replace(`${n}x${d}`, '{w}x{h}') }
            })(s)
        },
        'attributes.composerName': 'metadata.composerName',
        'attributes.contentRating'() {
          var s
          if (1 === (null === (s = null == e ? void 0 : e.metadata) || void 0 === s ? void 0 : s.explicit))
            return 'explicit'
        },
        'attributes.discNumber'() {
          var s
          return (null === (s = null == e ? void 0 : e.metadata) || void 0 === s ? void 0 : s.discNumber) || 1
        },
        'attributes.durationInMillis': 'metadata.duration',
        'attributes.genreNames'() {
          var s
          return [null === (s = null == e ? void 0 : e.metadata) || void 0 === s ? void 0 : s.genre]
        },
        'attributes.isrc'() {
          var s
          const n = null === (s = null == e ? void 0 : e.metadata) || void 0 === s ? void 0 : s.xid
          if (n) return n.replace(/^([^:]+):isrc:/, '$1')
        },
        'attributes.name': 'metadata.itemName',
        'attributes.playParams.id': 'metadata.itemId',
        'attributes.playParams.kind': 'metadata.kind',
        'attributes.previews': () => [{ url: null == e ? void 0 : e.previewURL }],
        'attributes.releaseDate': 'metadata.releaseDate',
        'attributes.trackNumber': 'metadata.trackNumber',
        assetURL: 'URL',
        cloudId: 'metadata.cloud-id',
        id() {
          var s
          return '' + (null === (s = null == e ? void 0 : e.metadata) || void 0 === s ? void 0 : s.itemId)
        },
        flavor: 'flavor',
        type: 'metadata.kind',
      },
      e
    )
  }
  const { mediaItemStateDidChange: Y, mediaItemStateWillChange: H } = E,
    W = { isEntitledToPlay: !0 }
  class MediaItem extends Notifications {
    constructor(s = {}) {
      super([Y, H]),
        (this.bingeWatching = !1),
        (this.hlsMetadata = {}),
        (this.playbackType = e.PlaybackType.none),
        (this._assets = []),
        (this._state = createMediaItemStateGuard()),
        R.debug('media-item: creating Media Item with options:', s)
      s.id && s.attributes
        ? (Object.keys(s).forEach((e) => {
            W.hasOwnProperty(e) || (this[e] = s[e])
          }),
          (this.type = this.playParams && this.playParams.kind ? this.playParams.kind : this.type || 'song'))
        : ((this.id = s.id || generateUUID()),
          (this.type = s.type || 'song'),
          (this.attributes = { playParams: { id: this.id, kind: this.type } })),
        (this._context = s.context || {}),
        s.container
          ? (this._container = s.container)
          : s.containerId && s.containerType && (this._container = { id: s.containerId, type: s.containerType })
    }
    get albumInfo() {
      const { albumName: e, artistName: s } = this,
        n = []
      return s && n.push(s), e && n.push(e), n.join(' - ')
    }
    get albumName() {
      return this.attributes.albumName
    }
    get artistName() {
      return this.attributes.genreNames &&
        this.attributes.genreNames.indexOf('Classical') > -1 &&
        this.attributes.composerName
        ? this.attributes.composerName
        : this.attributes.artistName
    }
    get artwork() {
      var e, s
      return null !== (e = this.attributes.artwork) && void 0 !== e
        ? e
        : null === (s = this.attributes.images) || void 0 === s
        ? void 0
        : s.coverArt16X9
    }
    get artworkURL() {
      if (this.artwork && this.artwork.url) return this.artwork.url
    }
    get assets() {
      return this._assets
    }
    get canPlay() {
      return this.isPlayable && this.isReady
    }
    get container() {
      return this._container
    }
    set container(e) {
      this._container = e
    }
    get contentRating() {
      return this.attributes.contentRating
    }
    get context() {
      return this._context
    }
    set context(e) {
      this._context = e
    }
    get discNumber() {
      return this.attributes.discNumber
    }
    get hasContainerArtwork() {
      return (
        this.container &&
        this.container.attributes &&
        this.container.attributes.artwork &&
        this.container.attributes.artwork.url
      )
    }
    get hasPlaylistContainer() {
      return this.container && 'playlists' === this.container.type && this.container.attributes
    }
    get isEntitledToPlay() {
      var e, s
      const { attributes: n, playables: d } = this
      return (
        null !==
          (s =
            n.isEntitledToPlay ||
            (null === (e = null == d ? void 0 : d[0]) || void 0 === e ? void 0 : e.isEntitledToPlay)) &&
        void 0 !== s &&
        s
      )
    }
    get isLiveRadioStation() {
      return isLiveRadioStation(this)
    }
    get isLiveAudioStation() {
      return isLiveRadioKind(this, 'audio')
    }
    get isLiveVideoStation() {
      return isLiveRadioKind(this, 'video')
    }
    get isSong() {
      return 'song' === this.type
    }
    get info() {
      return `${this.title} - ${this.albumInfo}`
    }
    get isCloudItem() {
      return (this.playParams && this.playParams.isLibrary) || v(this.id)
    }
    get isCloudUpload() {
      return -1 === this._songId
    }
    get isExplicitItem() {
      return 'explicit' === this.contentRating
    }
    get isLoading() {
      return this.state === C.loading
    }
    get isPlayableMediaType() {
      return -1 !== b.indexOf(this.type)
    }
    get isPlayable() {
      var e
      return (
        !!this.isPlayableMediaType &&
        (!(!this.isLiveRadioStation && !this.hasOffersHlsUrl) ||
          (this.needsPlayParams
            ? !!this.playParams
            : this.isUTS
            ? this.isEntitledToPlay
            : !!this.attributes.assetUrl ||
              !!(null === (e = this.attributes.previews) || void 0 === e ? void 0 : e.length)))
      )
    }
    get isPlaying() {
      return this.state === C.playing
    }
    get isPreparedToPlay() {
      if ('song' === this.type) return !!this._assets && !!this.keyURLs && !!this._songId
      if (this.isUTS) {
        const e = isStringNotEmpty(this.assetURL),
          s = !!(
            this.keyURLs &&
            isStringNotEmpty(this.keyURLs['hls-key-cert-url']) &&
            isStringNotEmpty(this.keyURLs['hls-key-server-url']) &&
            isStringNotEmpty(this.keyURLs['widevine-cert-url'])
          )
        return e && s
      }
      return !!isStringNotEmpty(this.assetURL) || (this.playRawAssetURL && !!isStringNotEmpty(this.attributes.assetUrl))
    }
    get isrc() {
      return this.attributes.isrc
    }
    get isReady() {
      return this.state === C.ready
    }
    get isRestricted() {
      return this.state === C.restricted
    }
    get isUTS() {
      return ['Episode', 'Movie', 'MusicMovie', 'Show', 'Vod'].includes(this.type)
    }
    get isUnavailable() {
      return this.state === C.unavailable
    }
    get needsPlayParams() {
      return ['musicVideo', 'song'].includes(this.type)
    }
    get normalizedType() {
      return normalizeContentType(this.type)
    }
    get offers() {
      return this.attributes.offers
    }
    get offersHlsUrl() {
      const { offers: e } = this,
        s =
          null == e
            ? void 0
            : e.find((e) => {
                var s
                return !!(null === (s = e.hlsUrl) || void 0 === s ? void 0 : s.length)
              })
      return null == s ? void 0 : s.hlsUrl
    }
    get hasOffersHlsUrl() {
      return isStringNotEmpty(this.offersHlsUrl)
    }
    set playbackData(e) {
      if (void 0 === e) return
      this.previewURL && (e.previewURL = this.previewURL)
      const s = transform$7(e)
      this.artwork && s.artwork && delete s.artwork,
        s.id !== this.id && delete s.id,
        this.playParams && s.attributes.playParams && (s.attributes.playParams = this.playParams),
        Object.assign(this, s),
        R.debug('media-item: item merged with playbackData', this),
        (this.state = C.ready)
    }
    get playbackDuration() {
      return this.attributes.durationInMillis || this.attributes.durationInMilliseconds
    }
    get playlistArtworkURL() {
      var e, s, n
      return this.hasPlaylistContainer && this.hasContainerArtwork
        ? null ===
            (n =
              null === (s = null === (e = this.container) || void 0 === e ? void 0 : e.attributes) || void 0 === s
                ? void 0
                : s.artwork) || void 0 === n
          ? void 0
          : n.url
        : this.artworkURL
    }
    get playlistName() {
      var e, s
      return this.hasPlaylistContainer
        ? null === (s = null === (e = this.container) || void 0 === e ? void 0 : e.attributes) || void 0 === s
          ? void 0
          : s.name
        : this.albumName
    }
    get playParams() {
      return this.attributes.playParams
    }
    get playRawAssetURL() {
      return this.offers ? this.offers.some((e) => 'STDQ' === e.type) : !(!this.isCloudUpload && !T[this.type])
    }
    get previewURL() {
      var e, s, n, d, h, p, y, m, g, v, _, b, T, E, S
      return (
        (null ===
          (n =
            null === (s = null === (e = this.attributes) || void 0 === e ? void 0 : e.previews) || void 0 === s
              ? void 0
              : s[0]) || void 0 === n
          ? void 0
          : n.url) ||
        (null ===
          (p =
            null === (h = null === (d = this.attributes) || void 0 === d ? void 0 : d.previews) || void 0 === h
              ? void 0
              : h[0]) || void 0 === p
          ? void 0
          : p.hlsUrl) ||
        (null ===
          (v =
            null ===
              (g =
                null === (m = null === (y = this.attributes) || void 0 === y ? void 0 : y.trailers) || void 0 === m
                  ? void 0
                  : m[0]) || void 0 === g
              ? void 0
              : g.assets) || void 0 === v
          ? void 0
          : v.hlsUrl) ||
        (null ===
          (T =
            null === (b = null === (_ = this.attributes) || void 0 === _ ? void 0 : _.movieClips) || void 0 === b
              ? void 0
              : b[0]) || void 0 === T
          ? void 0
          : T.hlsUrl) ||
        (null === (S = null === (E = this.attributes) || void 0 === E ? void 0 : E.video) || void 0 === S
          ? void 0
          : S.hlsUrl)
      )
    }
    get rating() {
      return this.attributes.rating
    }
    get releaseDate() {
      if (this._releaseDate) return this._releaseDate
      if (this.attributes && (this.attributes.releaseDate || this.attributes.releaseDateTime)) {
        const e = this.attributes.releaseDate || this.attributes.releaseDateTime
        return (this._releaseDate = /^\d{4}-\d{1,2}-\d{1,2}/.test(e) ? new Date(e) : void 0), this._releaseDate
      }
    }
    get songId() {
      return this._songId && -1 !== this._songId ? this._songId : this.id
    }
    get state() {
      return this._state.current
    }
    set state(e) {
      const s = { oldState: this._state.current, state: e }
      this._stateWillChange && this._stateWillChange(this),
        this.dispatchEvent(H, s),
        this._state.set(e),
        this._stateDidChange && this._stateDidChange(this),
        this.dispatchEvent(Y, s)
    }
    get title() {
      return this.attributes.name || this.attributes.title
    }
    get trackNumber() {
      return this.attributes.trackNumber
    }
    beginMonitoringStateDidChange(e) {
      this._stateDidChange = e
    }
    beginMonitoringStateWillChange(e) {
      this._stateWillChange = e
    }
    endMonitoringStateDidChange() {
      this._stateDidChange = void 0
    }
    endMonitoringStateWillChange() {
      this._stateWillChange = void 0
    }
    isEqual(e) {
      return this.id === e.id && this.type === e.type && this.attributes === e.attributes
    }
    resetState() {
      this.endMonitoringStateWillChange(), this.endMonitoringStateDidChange(), (this.state = C.none)
    }
    restrict() {
      this.isExplicitItem && ((this.state = C.restricted), this._removePlayableData())
    }
    notSupported() {
      ;(this.state = C.unsupported), this._removePlayableData()
    }
    updateFromLoadError(e) {
      switch (e.errorCode) {
        case MKError.CONTENT_RESTRICTED:
          this.state = C.restricted
          break
        case MKError.CONTENT_UNAVAILABLE:
          this.state = C.unavailable
          break
        default:
          this.state = C.error
      }
    }
    updateFromSongList(e) {
      'musicVideo' === this.type
        ? this.updateWithLoadedAssets(void 0, e['hls-playlist-url'])
        : this.updateWithLoadedAssets(e.assets),
        (this._songId = e.songId),
        this.updateWithLoadedKeys({
          'hls-key-cert-url': e['hls-key-cert-url'],
          'hls-key-server-url': e['hls-key-server-url'],
          'widevine-cert-url': e['widevine-cert-url'],
        })
    }
    updateWithLoadedKeys(e, s) {
      ;(this.keyURLs = e), s && (this.keyServerQueryParameters = s)
    }
    updateWithLoadedAssets(e, s) {
      e && (this._assets = e), s && (this.assetURL = s)
    }
    _removePlayableData() {
      var e, s, n
      null === (e = this.attributes) || void 0 === e || delete e.playParams,
        null === (s = this.attributes) || void 0 === s || delete s.previews,
        null === (n = this.attributes) || void 0 === n || delete n.trailers
    }
  }
  var G =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : void 0 !== s
      ? s
      : 'undefined' != typeof self
      ? self
      : {}
  function unwrapExports(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e
  }
  function createCommonjsModule(e, s) {
    return e((s = { exports: {} }), s.exports), s.exports
  }
  var z = createCommonjsModule(function (e) {
      var s = (e.exports =
        'undefined' != typeof window && window.Math == Math
          ? window
          : 'undefined' != typeof self && self.Math == Math
          ? self
          : Function('return this')())
      'number' == typeof __g && (__g = s)
    }),
    q = createCommonjsModule(function (e) {
      var s = (e.exports = { version: '2.6.11' })
      'number' == typeof __e && (__e = s)
    })
  q.version
  var _isObject = function (e) {
      return 'object' == typeof e ? null !== e : 'function' == typeof e
    },
    _anObject = function (e) {
      if (!_isObject(e)) throw TypeError(e + ' is not an object!')
      return e
    },
    _fails = function (e) {
      try {
        return !!e()
      } catch (_t) {
        return !0
      }
    },
    Q = !_fails(function () {
      return (
        7 !=
        Object.defineProperty({}, 'a', {
          get: function () {
            return 7
          },
        }).a
      )
    }),
    X = z.document,
    J = _isObject(X) && _isObject(X.createElement),
    Z =
      !Q &&
      !_fails(function () {
        return (
          7 !=
          Object.defineProperty(((e = 'div'), J ? X.createElement(e) : {}), 'a', {
            get: function () {
              return 7
            },
          }).a
        )
        var e
      }),
    ee = Object.defineProperty,
    te = {
      f: Q
        ? Object.defineProperty
        : function (e, s, n) {
            if (
              (_anObject(e),
              (s = (function (e, s) {
                if (!_isObject(e)) return e
                var n, d
                if (s && 'function' == typeof (n = e.toString) && !_isObject((d = n.call(e)))) return d
                if ('function' == typeof (n = e.valueOf) && !_isObject((d = n.call(e)))) return d
                if (!s && 'function' == typeof (n = e.toString) && !_isObject((d = n.call(e)))) return d
                throw TypeError("Can't convert object to primitive value")
              })(s, !0)),
              _anObject(n),
              Z)
            )
              try {
                return ee(e, s, n)
              } catch (_t) {}
            if ('get' in n || 'set' in n) throw TypeError('Accessors not supported!')
            return 'value' in n && (e[s] = n.value), e
          },
    },
    ie = Q
      ? function (e, s, n) {
          return te.f(
            e,
            s,
            (function (e, s) {
              return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: s }
            })(1, n)
          )
        }
      : function (e, s, n) {
          return (e[s] = n), e
        },
    re = {}.hasOwnProperty,
    _has = function (e, s) {
      return re.call(e, s)
    },
    se = 0,
    ne = Math.random(),
    _uid = function (e) {
      return 'Symbol('.concat(void 0 === e ? '' : e, ')_', (++se + ne).toString(36))
    },
    ae = createCommonjsModule(function (e) {
      var s = z['__core-js_shared__'] || (z['__core-js_shared__'] = {})
      ;(e.exports = function (e, n) {
        return s[e] || (s[e] = void 0 !== n ? n : {})
      })('versions', []).push({ version: q.version, mode: 'global', copyright: '© 2019 Denis Pushkarev (zloirock.ru)' })
    }),
    oe = ae('native-function-to-string', Function.toString),
    de = createCommonjsModule(function (e) {
      var s = _uid('src'),
        n = ('' + oe).split('toString')
      ;(q.inspectSource = function (e) {
        return oe.call(e)
      }),
        (e.exports = function (e, d, h, p) {
          var y = 'function' == typeof h
          y && (_has(h, 'name') || ie(h, 'name', d)),
            e[d] !== h &&
              (y && (_has(h, s) || ie(h, s, e[d] ? '' + e[d] : n.join(String(d)))),
              e === z ? (e[d] = h) : p ? (e[d] ? (e[d] = h) : ie(e, d, h)) : (delete e[d], ie(e, d, h)))
        })(Function.prototype, 'toString', function () {
          return ('function' == typeof this && this[s]) || oe.call(this)
        })
    }),
    _ctx = function (e, s, n) {
      if (
        ((function (e) {
          if ('function' != typeof e) throw TypeError(e + ' is not a function!')
        })(e),
        void 0 === s)
      )
        return e
      switch (n) {
        case 1:
          return function (n) {
            return e.call(s, n)
          }
        case 2:
          return function (n, d) {
            return e.call(s, n, d)
          }
        case 3:
          return function (n, d, h) {
            return e.call(s, n, d, h)
          }
      }
      return function () {
        return e.apply(s, arguments)
      }
    },
    $export = function (e, s, n) {
      var d,
        h,
        p,
        y,
        m = e & $export.F,
        g = e & $export.G,
        v = e & $export.S,
        _ = e & $export.P,
        b = e & $export.B,
        T = g ? z : v ? z[s] || (z[s] = {}) : (z[s] || {}).prototype,
        E = g ? q : q[s] || (q[s] = {}),
        S = E.prototype || (E.prototype = {})
      for (d in (g && (n = s), n))
        (p = ((h = !m && T && void 0 !== T[d]) ? T : n)[d]),
          (y = b && h ? _ctx(p, z) : _ && 'function' == typeof p ? _ctx(Function.call, p) : p),
          T && de(T, d, p, e & $export.U),
          E[d] != p && ie(E, d, y),
          _ && S[d] != p && (S[d] = p)
    }
  ;(z.core = q),
    ($export.F = 1),
    ($export.G = 2),
    ($export.S = 4),
    ($export.P = 8),
    ($export.B = 16),
    ($export.W = 32),
    ($export.U = 64),
    ($export.R = 128)
  var le,
    ce,
    ue = $export,
    he = {}.toString,
    pe = Object('z').propertyIsEnumerable(0)
      ? Object
      : function (e) {
          return 'String' ==
            (function (e) {
              return he.call(e).slice(8, -1)
            })(e)
            ? e.split('')
            : Object(e)
        },
    _defined = function (e) {
      if (null == e) throw TypeError("Can't call method on  " + e)
      return e
    },
    _toIobject = function (e) {
      return pe(_defined(e))
    },
    ye = Math.ceil,
    me = Math.floor,
    _toInteger = function (e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? me : ye)(e)
    },
    ge = Math.min,
    fe = Math.max,
    ve = Math.min,
    _e = ae('keys'),
    be =
      ((le = !1),
      function (e, s, n) {
        var d,
          h,
          p = _toIobject(e),
          y = (d = p.length) > 0 ? ge(_toInteger(d), 9007199254740991) : 0,
          m = (function (e, s) {
            return (e = _toInteger(e)) < 0 ? fe(e + s, 0) : ve(e, s)
          })(n, y)
        if (le && s != s) {
          for (; y > m; ) if ((h = p[m++]) != h) return !0
        } else for (; y > m; m++) if ((le || m in p) && p[m] === s) return le || m || 0
        return !le && -1
      }),
    Te = _e[(ce = 'IE_PROTO')] || (_e[ce] = _uid(ce)),
    Ee = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(','),
    Se =
      Object.keys ||
      function (e) {
        return (function (e, s) {
          var n,
            d = _toIobject(e),
            h = 0,
            p = []
          for (n in d) n != Te && _has(d, n) && p.push(n)
          for (; s.length > h; ) _has(d, (n = s[h++])) && (~be(p, n) || p.push(n))
          return p
        })(e, Ee)
      },
    ke = { f: Object.getOwnPropertySymbols },
    Pe = { f: {}.propertyIsEnumerable },
    _toObject = function (e) {
      return Object(_defined(e))
    },
    Ae = Object.assign,
    Ie =
      !Ae ||
      _fails(function () {
        var e = {},
          s = {},
          n = Symbol(),
          d = 'abcdefghijklmnopqrst'
        return (
          (e[n] = 7),
          d.split('').forEach(function (e) {
            s[e] = e
          }),
          7 != Ae({}, e)[n] || Object.keys(Ae({}, s)).join('') != d
        )
      })
        ? function (e, s) {
            for (var n = _toObject(e), d = arguments.length, h = 1, p = ke.f, y = Pe.f; d > h; )
              for (var m, g = pe(arguments[h++]), v = p ? Se(g).concat(p(g)) : Se(g), _ = v.length, b = 0; _ > b; )
                (m = v[b++]), (Q && !y.call(g, m)) || (n[m] = g[m])
            return n
          }
        : Ae
  ue(ue.S + ue.F, 'Object', { assign: Ie }), q.Object.assign
  var we =
      ('undefined' != typeof globalThis && globalThis) || ('undefined' != typeof self && self) || (void 0 !== we && we),
    Re = 'URLSearchParams' in we,
    Oe = 'Symbol' in we && 'iterator' in Symbol,
    Ce =
      'FileReader' in we &&
      'Blob' in we &&
      (function () {
        try {
          return new Blob(), !0
        } catch (_t) {
          return !1
        }
      })(),
    Me = 'FormData' in we,
    Ne = 'ArrayBuffer' in we
  if (Ne)
    var De = [
        '[object Int8Array]',
        '[object Uint8Array]',
        '[object Uint8ClampedArray]',
        '[object Int16Array]',
        '[object Uint16Array]',
        '[object Int32Array]',
        '[object Uint32Array]',
        '[object Float32Array]',
        '[object Float64Array]',
      ],
      Le =
        ArrayBuffer.isView ||
        function (e) {
          return e && De.indexOf(Object.prototype.toString.call(e)) > -1
        }
  function normalizeName(e) {
    if (('string' != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || '' === e))
      throw new TypeError('Invalid character in header field name: "' + e + '"')
    return e.toLowerCase()
  }
  function normalizeValue(e) {
    return 'string' != typeof e && (e = String(e)), e
  }
  function iteratorFor(e) {
    var s = {
      next: function () {
        var s = e.shift()
        return { done: void 0 === s, value: s }
      },
    }
    return (
      Oe &&
        (s[Symbol.iterator] = function () {
          return s
        }),
      s
    )
  }
  function Headers$1(e) {
    ;(this.map = {}),
      e instanceof Headers$1
        ? e.forEach(function (e, s) {
            this.append(s, e)
          }, this)
        : Array.isArray(e)
        ? e.forEach(function (e) {
            this.append(e[0], e[1])
          }, this)
        : e &&
          Object.getOwnPropertyNames(e).forEach(function (s) {
            this.append(s, e[s])
          }, this)
  }
  function consumed(e) {
    if (e.bodyUsed) return Promise.reject(new TypeError('Already read'))
    e.bodyUsed = !0
  }
  function fileReaderReady(e) {
    return new Promise(function (s, n) {
      ;(e.onload = function () {
        s(e.result)
      }),
        (e.onerror = function () {
          n(e.error)
        })
    })
  }
  function readBlobAsArrayBuffer(e) {
    var s = new FileReader(),
      n = fileReaderReady(s)
    return s.readAsArrayBuffer(e), n
  }
  function bufferClone(e) {
    if (e.slice) return e.slice(0)
    var s = new Uint8Array(e.byteLength)
    return s.set(new Uint8Array(e)), s.buffer
  }
  function Body() {
    return (
      (this.bodyUsed = !1),
      (this._initBody = function (e) {
        var s
        ;(this.bodyUsed = this.bodyUsed),
          (this._bodyInit = e),
          e
            ? 'string' == typeof e
              ? (this._bodyText = e)
              : Ce && Blob.prototype.isPrototypeOf(e)
              ? (this._bodyBlob = e)
              : Me && FormData.prototype.isPrototypeOf(e)
              ? (this._bodyFormData = e)
              : Re && URLSearchParams.prototype.isPrototypeOf(e)
              ? (this._bodyText = e.toString())
              : Ne && Ce && (s = e) && DataView.prototype.isPrototypeOf(s)
              ? ((this._bodyArrayBuffer = bufferClone(e.buffer)), (this._bodyInit = new Blob([this._bodyArrayBuffer])))
              : Ne && (ArrayBuffer.prototype.isPrototypeOf(e) || Le(e))
              ? (this._bodyArrayBuffer = bufferClone(e))
              : (this._bodyText = e = Object.prototype.toString.call(e))
            : (this._bodyText = ''),
          this.headers.get('content-type') ||
            ('string' == typeof e
              ? this.headers.set('content-type', 'text/plain;charset=UTF-8')
              : this._bodyBlob && this._bodyBlob.type
              ? this.headers.set('content-type', this._bodyBlob.type)
              : Re &&
                URLSearchParams.prototype.isPrototypeOf(e) &&
                this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8'))
      }),
      Ce &&
        ((this.blob = function () {
          var e = consumed(this)
          if (e) return e
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob)
          if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]))
          if (this._bodyFormData) throw new Error('could not read FormData body as blob')
          return Promise.resolve(new Blob([this._bodyText]))
        }),
        (this.arrayBuffer = function () {
          if (this._bodyArrayBuffer) {
            var e = consumed(this)
            return (
              e ||
              (ArrayBuffer.isView(this._bodyArrayBuffer)
                ? Promise.resolve(
                    this._bodyArrayBuffer.buffer.slice(
                      this._bodyArrayBuffer.byteOffset,
                      this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                    )
                  )
                : Promise.resolve(this._bodyArrayBuffer))
            )
          }
          return this.blob().then(readBlobAsArrayBuffer)
        })),
      (this.text = function () {
        var e,
          s,
          n,
          d = consumed(this)
        if (d) return d
        if (this._bodyBlob)
          return (e = this._bodyBlob), (s = new FileReader()), (n = fileReaderReady(s)), s.readAsText(e), n
        if (this._bodyArrayBuffer)
          return Promise.resolve(
            (function (e) {
              for (var s = new Uint8Array(e), n = new Array(s.length), d = 0; d < s.length; d++)
                n[d] = String.fromCharCode(s[d])
              return n.join('')
            })(this._bodyArrayBuffer)
          )
        if (this._bodyFormData) throw new Error('could not read FormData body as text')
        return Promise.resolve(this._bodyText)
      }),
      Me &&
        (this.formData = function () {
          return this.text().then(decode)
        }),
      (this.json = function () {
        return this.text().then(JSON.parse)
      }),
      this
    )
  }
  ;(Headers$1.prototype.append = function (e, s) {
    ;(e = normalizeName(e)), (s = normalizeValue(s))
    var n = this.map[e]
    this.map[e] = n ? n + ', ' + s : s
  }),
    (Headers$1.prototype.delete = function (e) {
      delete this.map[normalizeName(e)]
    }),
    (Headers$1.prototype.get = function (e) {
      return (e = normalizeName(e)), this.has(e) ? this.map[e] : null
    }),
    (Headers$1.prototype.has = function (e) {
      return this.map.hasOwnProperty(normalizeName(e))
    }),
    (Headers$1.prototype.set = function (e, s) {
      this.map[normalizeName(e)] = normalizeValue(s)
    }),
    (Headers$1.prototype.forEach = function (e, s) {
      for (var n in this.map) this.map.hasOwnProperty(n) && e.call(s, this.map[n], n, this)
    }),
    (Headers$1.prototype.keys = function () {
      var e = []
      return (
        this.forEach(function (s, n) {
          e.push(n)
        }),
        iteratorFor(e)
      )
    }),
    (Headers$1.prototype.values = function () {
      var e = []
      return (
        this.forEach(function (s) {
          e.push(s)
        }),
        iteratorFor(e)
      )
    }),
    (Headers$1.prototype.entries = function () {
      var e = []
      return (
        this.forEach(function (s, n) {
          e.push([n, s])
        }),
        iteratorFor(e)
      )
    }),
    Oe && (Headers$1.prototype[Symbol.iterator] = Headers$1.prototype.entries)
  var xe = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
  function Request(e, s) {
    if (!(this instanceof Request))
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    var n,
      d,
      h = (s = s || {}).body
    if (e instanceof Request) {
      if (e.bodyUsed) throw new TypeError('Already read')
      ;(this.url = e.url),
        (this.credentials = e.credentials),
        s.headers || (this.headers = new Headers$1(e.headers)),
        (this.method = e.method),
        (this.mode = e.mode),
        (this.signal = e.signal),
        h || null == e._bodyInit || ((h = e._bodyInit), (e.bodyUsed = !0))
    } else this.url = String(e)
    if (
      ((this.credentials = s.credentials || this.credentials || 'same-origin'),
      (!s.headers && this.headers) || (this.headers = new Headers$1(s.headers)),
      (this.method = ((n = s.method || this.method || 'GET'), (d = n.toUpperCase()), xe.indexOf(d) > -1 ? d : n)),
      (this.mode = s.mode || this.mode || null),
      (this.signal = s.signal || this.signal),
      (this.referrer = null),
      ('GET' === this.method || 'HEAD' === this.method) && h)
    )
      throw new TypeError('Body not allowed for GET or HEAD requests')
    if (
      (this._initBody(h),
      !(('GET' !== this.method && 'HEAD' !== this.method) || ('no-store' !== s.cache && 'no-cache' !== s.cache)))
    ) {
      var p = /([?&])_=[^&]*/
      if (p.test(this.url)) this.url = this.url.replace(p, '$1_=' + new Date().getTime())
      else {
        this.url += (/\?/.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
      }
    }
  }
  function decode(e) {
    var s = new FormData()
    return (
      e
        .trim()
        .split('&')
        .forEach(function (e) {
          if (e) {
            var n = e.split('='),
              d = n.shift().replace(/\+/g, ' '),
              h = n.join('=').replace(/\+/g, ' ')
            s.append(decodeURIComponent(d), decodeURIComponent(h))
          }
        }),
      s
    )
  }
  function Response(e, s) {
    if (!(this instanceof Response))
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    s || (s = {}),
      (this.type = 'default'),
      (this.status = void 0 === s.status ? 200 : s.status),
      (this.ok = this.status >= 200 && this.status < 300),
      (this.statusText = void 0 === s.statusText ? '' : '' + s.statusText),
      (this.headers = new Headers$1(s.headers)),
      (this.url = s.url || ''),
      this._initBody(e)
  }
  ;(Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit })
  }),
    Body.call(Request.prototype),
    Body.call(Response.prototype),
    (Response.prototype.clone = function () {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers$1(this.headers),
        url: this.url,
      })
    }),
    (Response.error = function () {
      var e = new Response(null, { status: 0, statusText: '' })
      return (e.type = 'error'), e
    })
  var Ue = [301, 302, 303, 307, 308]
  Response.redirect = function (e, s) {
    if (-1 === Ue.indexOf(s)) throw new RangeError('Invalid status code')
    return new Response(null, { status: s, headers: { location: e } })
  }
  var $e = we.DOMException
  try {
    new $e()
  } catch (Vo) {
    ;(($e = function (e, s) {
      ;(this.message = e), (this.name = s)
      var n = Error(e)
      this.stack = n.stack
    }).prototype = Object.create(Error.prototype)),
      ($e.prototype.constructor = $e)
  }
  function fetch$1(e, s) {
    return new Promise(function (n, d) {
      var h = new Request(e, s)
      if (h.signal && h.signal.aborted) return d(new $e('Aborted', 'AbortError'))
      var p = new XMLHttpRequest()
      function abortXhr() {
        p.abort()
      }
      ;(p.onload = function () {
        var e,
          s,
          d = {
            status: p.status,
            statusText: p.statusText,
            headers:
              ((e = p.getAllResponseHeaders() || ''),
              (s = new Headers$1()),
              e
                .replace(/\r?\n[\t ]+/g, ' ')
                .split('\r')
                .map(function (e) {
                  return 0 === e.indexOf('\n') ? e.substr(1, e.length) : e
                })
                .forEach(function (e) {
                  var n = e.split(':'),
                    d = n.shift().trim()
                  if (d) {
                    var h = n.join(':').trim()
                    s.append(d, h)
                  }
                }),
              s),
          }
        d.url = 'responseURL' in p ? p.responseURL : d.headers.get('X-Request-URL')
        var h = 'response' in p ? p.response : p.responseText
        setTimeout(function () {
          n(new Response(h, d))
        }, 0)
      }),
        (p.onerror = function () {
          setTimeout(function () {
            d(new TypeError('Network request failed'))
          }, 0)
        }),
        (p.ontimeout = function () {
          setTimeout(function () {
            d(new TypeError('Network request failed'))
          }, 0)
        }),
        (p.onabort = function () {
          setTimeout(function () {
            d(new $e('Aborted', 'AbortError'))
          }, 0)
        }),
        p.open(
          h.method,
          (function (e) {
            try {
              return '' === e && we.location.href ? we.location.href : e
            } catch (_t) {
              return e
            }
          })(h.url),
          !0
        ),
        'include' === h.credentials ? (p.withCredentials = !0) : 'omit' === h.credentials && (p.withCredentials = !1),
        'responseType' in p &&
          (Ce
            ? (p.responseType = 'blob')
            : Ne &&
              h.headers.get('Content-Type') &&
              -1 !== h.headers.get('Content-Type').indexOf('application/octet-stream') &&
              (p.responseType = 'arraybuffer')),
        !s || 'object' != typeof s.headers || s.headers instanceof Headers$1
          ? h.headers.forEach(function (e, s) {
              p.setRequestHeader(s, e)
            })
          : Object.getOwnPropertyNames(s.headers).forEach(function (e) {
              p.setRequestHeader(e, normalizeValue(s.headers[e]))
            }),
        h.signal &&
          (h.signal.addEventListener('abort', abortXhr),
          (p.onreadystatechange = function () {
            4 === p.readyState && h.signal.removeEventListener('abort', abortXhr)
          })),
        p.send(void 0 === h._bodyInit ? null : h._bodyInit)
    })
  }
  ;(fetch$1.polyfill = !0),
    we.fetch || ((we.fetch = fetch$1), (we.Headers = Headers$1), (we.Request = Request), (we.Response = Response))
  const addPathToURL = (e, s) =>
      void 0 === e || '' === e
        ? s || ''
        : void 0 === s
        ? e
        : (e.endsWith('/') && (e = e.slice(0, -1)), s.startsWith('/') && (s = s.slice(1)), `${e}/${s}`),
    addQueryParamsToURL = (e, s) => {
      const n = urlEncodeParameters(s)
      return '' === n
        ? e
        : e.endsWith('&') || e.endsWith('?')
        ? `${e}${n}`
        : e.includes('?')
        ? `${e}&${n}`
        : `${e}?${n}`
    },
    Be = 'undefined' != typeof Headers,
    headersToDict = (e) => {
      let s = {}
      var n
      return (
        (n = e),
        Be && n instanceof Headers
          ? e.forEach((e, n) => (s[n] = e))
          : Array.isArray(e)
          ? e.forEach(([e, n]) => (s[e] = n))
          : (s = e),
        s
      )
    },
    mergeFetchHeaders = (e = {}, s = {}) => Object.assign(Object.assign({}, headersToDict(e)), headersToDict(s)),
    mergeFetchOptions = (e, s) => {
      if (e || s)
        return (null == e ? void 0 : e.headers) && (null == s ? void 0 : s.headers)
          ? Object.assign(Object.assign(Object.assign({}, e), s), { headers: mergeFetchHeaders(e.headers, s.headers) })
          : Object.assign(Object.assign({}, e), s)
    }
  function parseQueryParams(e) {
    var s
    if (!e || (e.startsWith('http') && !e.includes('?'))) return {}
    try {
      return parseParams(null !== (s = e.split('?')[1]) && void 0 !== s ? s : e, '&', decodeURIComponent)
    } catch (n) {
      return {}
    }
  }
  function parseParams(e, s = '&', n = (e) => e) {
    return 'string' != typeof e
      ? {}
      : e
          .split(s)
          .map((e) => e.trim().split('=', 2))
          .reduce((e, s) => {
            const [d, h] = s
            return ('' === d && void 0 === h) || ((e[n(d)] = n(h)), void 0 === h && (e[n(d)] = void 0)), e
          }, {})
  }
  function getMaxAgeFromHeaders(e) {
    const s = (function (e, s) {
      if (void 0 !== s) return Be && s instanceof Headers ? s.get(e) : s[e]
    })('cache-control', e)
    if (s) {
      return ((e) => {
        const s = Number(e)
        if (Number.isFinite(s)) return s
      })(parseParams(s, ',')['max-age'])
    }
  }
  function rewriteLastUrlPath(e, s) {
    const n = e.split('/')
    return n.pop(), n.push(s), n.join('/')
  }
  const recursiveEncodeParameters = (e, s) =>
    Object.keys(e).reduce((n, d) => {
      const h = e[d],
        p = s ? `${s}[${encodeURIComponent(d)}]` : encodeURIComponent(d)
      return `${n}${n ? '&' : ''}${
        (function (e) {
          return !!e && 'object' == typeof e && !Array.isArray(e)
        })(h)
          ? recursiveEncodeParameters(h, p)
          : `${p}=${encodeURIComponent('' + h)}`
      }`
    }, '')
  function urlEncodeParameters(e) {
    return e ? recursiveEncodeParameters(e) : ''
  }
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */ function __awaiter$3(e, s, n, d) {
    return new (n || (n = Promise))(function (h, p) {
      function fulfilled(e) {
        try {
          step(d.next(e))
        } catch (_t) {
          p(_t)
        }
      }
      function rejected(e) {
        try {
          step(d.throw(e))
        } catch (_t) {
          p(_t)
        }
      }
      function step(e) {
        e.done
          ? h(e.value)
          : new n(function (s) {
              s(e.value)
            }).then(fulfilled, rejected)
      }
      step((d = d.apply(e, s || [])).next())
    })
  }
  const AsyncDebounce =
      (e = 100, s) =>
      (n, d, h) => {
        const p = h.value,
          y = asyncDebounce(p, e, s)
        h.value = y
      },
    asyncDebounce = (e, s = 250, n = { isImmediate: !1 }) => {
      let d, h
      function fulfill(e) {
        return n.hasOwnProperty('cancelledValue')
          ? null == e
            ? void 0
            : e.resolve(n.cancelledValue)
          : null == e
          ? void 0
          : e.reject(new Error('cancelled'))
      }
      const clearLastPromise = () => {
          d && (d.resolved || (fulfill(d), d.timeoutId && clearTimeout(d.timeoutId)), (d = void 0))
        },
        invokeFn = (s, n, h, p) => {
          e.apply(s, p)
            .then((e) => {
              n(e), d && (d.resolved = !0)
            })
            .catch(h)
        }
      return n.isImmediate
        ? function (...e) {
            const n = Date.now(),
              p = this
            return (
              h && n >= h && clearLastPromise(),
              (h = Date.now() + s),
              d
                ? fulfill(Promise)
                : new Promise((s, n) => {
                    ;(d = { resolve: s, reject: n }), invokeFn(p, s, n, e)
                  })
            )
          }
        : function (...e) {
            const n = this
            return (
              d && clearLastPromise(),
              new Promise(function (h, p) {
                const y = setTimeout(invokeFn.bind(void 0, n, h, p, e), s)
                d = { resolve: h, reject: p, timeoutId: y }
              })
            )
          }
    },
    Fe = isNodeEnvironment$1()
  class Browser {
    constructor(e) {
      var s
      e ||
        (e =
          'undefined' != typeof window &&
          (null === (s = null === window || void 0 === window ? void 0 : window.navigator) || void 0 === s
            ? void 0
            : s.userAgent)
            ? window.navigator.userAgent
            : '')
      let n = e.toLowerCase()
      ;(this.isEdge = /\sedge\//.test(n)),
        (this.isChrome = !this.isEdge && /chrome/.test(n)),
        (this.isSafari = !this.isEdge && !this.isChrome && /safari/.test(n)),
        (this.isFirefox = !this.isEdge && !this.isChrome && !this.isSafari && /firefox/.test(n)),
        (this.isIE = !this.isEdge && !this.isChrome && !this.isSafari && !this.isFirefox && /trident|msie/.test(n)),
        (this.isMobile = /mobile/.test(n)),
        (this.isAndroid = this.isMobile && /android/.test(n)),
        (this.isiOS = this.isMobile && /iphone|ipad|ipod/.test(n)),
        (this.isWebView =
          /(webview|(iphone|ipod|ipad)(?!.*safari\/)|android.*(wv|\.0\.0\.0)|\bfb[\w_]+\/(?:messenger)?|\binstagram|\btwitter)/.test(
            n
          )),
        this.isEdge
          ? (this.engineVersion = n.match(/(?:edge).(\d+)/))
          : ((this.version = n.match(/(?:chrome|version|firefox|msie|rv).(\d+)\.(\d+)/)),
            (this.engineVersion = n.match(/(?:applewebkit|gecko|trident).(\d+)/))),
        this.version &&
          ((this.majorVersion = parseInt(this.version[1], 10)), (this.minorVersion = parseInt(this.version[2], 10))),
        this.engineVersion && (this.engineMajorVersion = parseInt(this.engineVersion[1], 10))
    }
    static supportsEs6() {
      if ('undefined' == typeof Symbol) return !1
      try {
        new Function('"use strict";class Foo {}')(), new Function('"use strict";var bar = (x) => x+1')()
      } catch (_t) {
        return !1
      }
      return !0
    }
  }
  const je = new Browser(),
    Ke = {
      AFG: '143610',
      AGO: '143564',
      AIA: '143538',
      ALB: '143575',
      AND: '143611',
      ARE: '143481',
      ARG: '143505',
      ARM: '143524',
      ATG: '143540',
      AUS: '143460',
      AUT: '143445',
      AZE: '143568',
      BEL: '143446',
      BEN: '143576',
      BFA: '143578',
      BGD: '143490',
      BGR: '143526',
      BHR: '143559',
      BHS: '143539',
      BIH: '143612',
      BLR: '143565',
      BLZ: '143555',
      BMU: '143542',
      BOL: '143556',
      BRA: '143503',
      BRB: '143541',
      BRN: '143560',
      BTN: '143577',
      BWA: '143525',
      CAF: '143623',
      CAN: '143455',
      CHE: '143459',
      CHL: '143483',
      CHN: '143465',
      CIV: '143527',
      CMR: '143574',
      COD: '143613',
      COG: '143582',
      COL: '143501',
      CPV: '143580',
      CRI: '143495',
      CYM: '143544',
      CYP: '143557',
      CZE: '143489',
      DEU: '143443',
      DMA: '143545',
      DNK: '143458',
      DOM: '143508',
      DZA: '143563',
      ECU: '143509',
      EGY: '143516',
      ESP: '143454',
      EST: '143518',
      ETH: '143569',
      FIN: '143447',
      FJI: '143583',
      FRA: '143442',
      FSM: '143591',
      GAB: '143614',
      GBR: '143444',
      GEO: '143615',
      GHA: '143573',
      GIN: '143616',
      GMB: '143584',
      GNB: '143585',
      GRC: '143448',
      GRD: '143546',
      GTM: '143504',
      GUY: '143553',
      HKG: '143463',
      HND: '143510',
      HRV: '143494',
      HUN: '143482',
      IDN: '143476',
      IND: '143467',
      IRL: '143449',
      IRQ: '143617',
      ISL: '143558',
      ISR: '143491',
      ITA: '143450',
      JAM: '143511',
      JOR: '143528',
      JPN: '143462',
      KAZ: '143517',
      KEN: '143529',
      KGZ: '143586',
      KHM: '143579',
      KNA: '143548',
      KOR: '143466',
      KWT: '143493',
      LAO: '143587',
      LBN: '143497',
      LBR: '143588',
      LBY: '143567',
      LCA: '143549',
      LIE: '143522',
      LKA: '143486',
      LTU: '143520',
      LUX: '143451',
      LVA: '143519',
      MAC: '143515',
      MAR: '143620',
      MCO: '143618',
      MDA: '143523',
      MDG: '143531',
      MDV: '143488',
      MEX: '143468',
      MKD: '143530',
      MLI: '143532',
      MLT: '143521',
      MMR: '143570',
      MNE: '143619',
      MNG: '143592',
      MOZ: '143593',
      MRT: '143590',
      MSR: '143547',
      MUS: '143533',
      MWI: '143589',
      MYS: '143473',
      NAM: '143594',
      NER: '143534',
      NGA: '143561',
      NIC: '143512',
      NLD: '143452',
      NOR: '143457',
      NPL: '143484',
      NRU: '143606',
      NZL: '143461',
      OMN: '143562',
      PAK: '143477',
      PAN: '143485',
      PER: '143507',
      PHL: '143474',
      PLW: '143595',
      PNG: '143597',
      POL: '143478',
      PRT: '143453',
      PRY: '143513',
      PSE: '143596',
      QAT: '143498',
      ROU: '143487',
      RUS: '143469',
      RWA: '143621',
      SAU: '143479',
      SEN: '143535',
      SGP: '143464',
      SLB: '143601',
      SLE: '143600',
      SLV: '143506',
      SRB: '143500',
      STP: '143598',
      SUR: '143554',
      SVK: '143496',
      SVN: '143499',
      SWE: '143456',
      SWZ: '143602',
      SYC: '143599',
      TCA: '143552',
      TCD: '143581',
      THA: '143475',
      TJK: '143603',
      TKM: '143604',
      TON: '143608',
      TTO: '143551',
      TUN: '143536',
      TUR: '143480',
      TWN: '143470',
      TZA: '143572',
      UGA: '143537',
      UKR: '143492',
      URY: '143514',
      USA: '143441',
      UZB: '143566',
      VCT: '143550',
      VEN: '143502',
      VGB: '143543',
      VNM: '143471',
      VUT: '143609',
      WSM: '143607',
      XKX: '143624',
      YEM: '143571',
      ZAF: '143472',
      ZMB: '143622',
      ZWE: '143605',
    },
    Ve = memoize((e) => {
      let s = new Uint16Array(e),
        n = s.length,
        d = ''
      for (let h = 0; h < n; h++) d += String.fromCharCode(s[h])
      return d
    }),
    Ye = memoize((e) => {
      let s = _(e)
      return He(s)
    })
  function ensureArray(e = []) {
    return Array.isArray(e) ? e : [e]
  }
  const He = memoize((e) => {
      let s = e.length,
        n = new ArrayBuffer(s),
        d = new Uint8Array(n)
      for (let h = 0; h < s; h++) d[h] = e.charCodeAt(h)
      return d
    }),
    We = memoize((e) => {
      let s = e.length,
        n = new ArrayBuffer(2 * s),
        d = new Uint16Array(n)
      for (let h = 0; h < s; h++) d[h] = e.charCodeAt(h)
      return d
    }),
    Ge = memoize((e) => {
      let s,
        n,
        d,
        h,
        p,
        y,
        m,
        g = 0,
        v = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        _ = ''
      for (; g < e.length; )
        (s = e[g++]),
          (n = g < e.length ? e[g++] : Number.NaN),
          (d = g < e.length ? e[g++] : Number.NaN),
          (h = s >> 2),
          (p = ((3 & s) << 4) | (n >> 4)),
          (y = ((15 & n) << 2) | (d >> 6)),
          (m = 63 & d),
          isNaN(n) ? (y = m = 64) : isNaN(d) && (m = 64),
          (_ += v.charAt(h) + v.charAt(p) + v.charAt(y) + v.charAt(m))
      return _
    })
  let isMergeableObject = function (e) {
    return (
      (function (e) {
        return !!e && 'object' == typeof e
      })(e) &&
      !(function (e) {
        let s = Object.prototype.toString.call(e)
        return (
          '[object RegExp]' === s ||
          '[object Date]' === s ||
          (function (e) {
            return e.$$typeof === ze
          })(e)
        )
      })(e)
    )
  }
  let ze = 'function' == typeof Symbol && Symbol.for ? Symbol.for('react.element') : 60103
  function cloneUnlessOtherwiseSpecified(e, s) {
    return !1 !== s.clone && s.isMergeableObject(e) ? deepmerge(((n = e), Array.isArray(n) ? [] : {}), e, s) : e
    var n
  }
  function defaultArrayMerge(e, s, n) {
    return e.concat(s).map(function (e) {
      return cloneUnlessOtherwiseSpecified(e, n)
    })
  }
  function getKeys(e) {
    return Object.keys(e).concat(
      (function (e) {
        return Object.getOwnPropertySymbols
          ? Object.getOwnPropertySymbols(e).filter(function (s) {
              return e.propertyIsEnumerable(s)
            })
          : []
      })(e)
    )
  }
  function mergeObject(e, s, n) {
    let d = {}
    return (
      n.isMergeableObject(e) &&
        getKeys(e).forEach(function (s) {
          d[s] = cloneUnlessOtherwiseSpecified(e[s], n)
        }),
      getKeys(s).forEach(function (h) {
        n.isMergeableObject(s[h]) && e[h]
          ? (d[h] = (function (e, s) {
              if (!s.customMerge) return deepmerge
              let n = s.customMerge(e)
              return 'function' == typeof n ? n : deepmerge
            })(h, n)(e[h], s[h], n))
          : (d[h] = cloneUnlessOtherwiseSpecified(s[h], n))
      }),
      d
    )
  }
  function deepmerge(e, s, n) {
    ;((n = n || {}).arrayMerge = n.arrayMerge || defaultArrayMerge),
      (n.isMergeableObject = n.isMergeableObject || isMergeableObject)
    let d = Array.isArray(s)
    return d === Array.isArray(e)
      ? d
        ? n.arrayMerge(e, s, n)
        : mergeObject(e, s, n)
      : cloneUnlessOtherwiseSpecified(s, n)
  }
  var qe
  ;(deepmerge.all = function (e, s) {
    if (!Array.isArray(e)) throw new Error('first argument should be an array')
    return e.reduce(function (e, n) {
      return deepmerge(e, n, s)
    }, {})
  }),
    (function (e) {
      ;(e.dataRecordDidDelete = 'dataRecordDidDelete'),
        (e.dataRecordWillDelete = 'dataRecordWillDelete'),
        (e.dataRecordDidMaterialize = 'dataRecordDidMaterialize'),
        (e.dataRecordDidPopulate = 'dataRecordDidPopulate'),
        (e.dataRecordWillPopulate = 'dataRecordWillPopulate')
    })(qe || (qe = {}))
  const isDataRecord = (e) =>
    !(
      !e ||
      'function' != typeof e.hasAttributes ||
      'function' != typeof e.hasRelationships ||
      'function' != typeof e.hasViews ||
      'function' != typeof e.serialize
    )
  class DataRecord {
    constructor(e, s, n = {}) {
      ;(this.type = e),
        (this.id = s),
        (this._mjs = { attributes: [], relationships: [], views: [] }),
        (this._meta = {}),
        (this._mjs = Object.assign(Object.assign({}, this._mjs), n))
    }
    hasProperties(e) {
      return (
        !e ||
        (e.attributes || e.relationships || e.views
          ? !(e.attributes && !this.hasAttributes(e.attributes)) &&
            !(e.relationships && !this.hasRelationships(e.relationships)) &&
            !(e.views && !this.hasViews(e.views))
          : this.hasAttributes() || this.hasRelationships() || this.hasViews())
      )
    }
    hasAttributes(e) {
      return this._hasProperties(this._mjs.attributes, e)
    }
    hasRelationships(e) {
      return this._hasProperties(this._mjs.relationships, e)
    }
    hasViews(e) {
      return this._hasProperties(this._mjs.views, e)
    }
    meta(e) {
      return e ? this._meta[e] : this._meta
    }
    serialize(e = !0, s = {}, n = {}) {
      const d = { id: this.id, type: this.type }
      return s[`${this.type}-${this.id}`]
        ? d
        : ((s[`${this.type}-${this.id}`] = !0),
          this.hasAttributes() && (d.attributes = this._mjs.attributes.reduce((e, s) => ((e[s] = this[s]), e), {})),
          this._mjs.relationships.length > 0 &&
            (d.relationships = this._serializeRelatedData(this._mjs.relationships, s, n)),
          this._mjs.views.length > 0 && (d.views = this._serializeRelatedData(this._mjs.views, s, n)),
          e ? { data: d } : d)
    }
    setProperty(e, s, n = 'attributes', d = {}) {
      function isMergeableObject(e) {
        return !(!e || 'object' != typeof e || e instanceof DataRecord)
      }
      this.hasOwnProperty(e) || (this._mjs[n] || (this._mjs[n] = []), this._mjs[n].push(e))
      const setDescriptor = (e) => ({ value: e, writable: !0, configurable: !0, enumerable: !0 })
      this[e] && s && 'object' == typeof this[e] && 'object' == typeof s
        ? 'attributes' === n
          ? Object.defineProperty(
              this,
              e,
              setDescriptor(
                deepmerge(this[e], s, {
                  arrayMerge: function (e, s, n) {
                    return s
                  },
                  isMergeableObject: isMergeableObject,
                })
              )
            )
          : 'relationships' === n && Array.isArray(this[e]) && d.extendRelationships
          ? Object.defineProperty(
              this,
              e,
              setDescriptor(deepmerge(this[e], s, { isMergeableObject: isMergeableObject }))
            )
          : Object.defineProperty(this, e, setDescriptor(s))
        : Object.defineProperty(this, e, setDescriptor(s))
    }
    removeRelative(e, s) {
      this[e] && (Array.isArray(this[e]) ? (this[e] = this[e].filter((e) => e.id !== s)) : delete this[e])
    }
    setParent(e) {
      const s = this._mjs.parents,
        n = s && s.length > 0
      this._mjs.parents = n ? s.concat(e) : e
    }
    _hasProperties(e, s) {
      return !!e && (s ? ensureArray(s).every((s) => e.includes(s)) : e.length > 0)
    }
    _serializeRelatedData(e, s = {}, n = {}) {
      return e.reduce((e, d) => {
        if (n.excludeRelationships && n.excludeRelationships.has(d)) return e
        if (n.includeRelationships && !n.includeRelationships.has(d)) return e
        let h = this[d]
        return (
          Array.isArray(h)
            ? (e[d] = { data: h.map((e) => ('function' == typeof e.serialize ? e.serialize(!1, s, n) : e)) })
            : (e[d] = h && 'function' == typeof h.serialize ? h.serialize(!1, s, n) : h),
          e
        )
      }, {})
    }
  }
  class DataStore extends Notifications {
    constructor(e = {}) {
      super([
        qe.dataRecordDidDelete,
        qe.dataRecordWillDelete,
        qe.dataRecordDidMaterialize,
        qe.dataRecordWillPopulate,
        qe.dataRecordDidPopulate,
      ]),
        (this._removeOnExpiration = !1),
        (this._shouldDisableRecordReuse = !0),
        (this._records = {}),
        (this._expiryRecords = new Set()),
        (this._removeOnExpiration = !!e.removeOnExpiration),
        (this._mapping = e.mapping),
        (this._shouldDisableRecordReuse = !!e.shouldDisableRecordReuse),
        (this.filter = e.filter)
    }
    get mapping() {
      return this._mapping
    }
    set mapping(e) {
      this._mapping = e
    }
    clear() {
      ;(this._records = {}), (this._expiryRecords = new Set())
    }
    peek(e, s, n) {
      if ((this._checkForExpiredRecords(), !this._records[e])) return s ? null : []
      if (!s) return Object.values(this._records[e])
      if (Array.isArray(s))
        return s.map((s) => {
          let d = this._records[e][s]
          if (d && d.hasProperties(n)) return d
        })
      let d = this._records[e][s]
      return d && d.hasProperties(n) ? d : null
    }
    populateDataRecords(e, s = {}, n = {}) {
      if (!e.data) return []
      if (!Array.isArray(e.data)) return this.populateDataRecord(e.data, s, n)
      const d = []
      return (
        e.data.forEach((e, h) => {
          const p = Object.assign(Object.assign({}, n), {
            parents: n.parents ? [Object.assign(Object.assign({}, n.parents[0]), { position: h })] : [],
          })
          n.parents && (n.parents[0].position = h)
          const y = this.populateDataRecord(e, s, p)
          d.push(y)
        }),
        d
      )
    }
    populateDataRecord(e, s = {}, n) {
      const d = n.filter || this.filter,
        h = n.mapping || this.mapping
      if (d && !d(e)) return
      if (h) {
        let s = 'function' == typeof h ? h(e) : transform$8(h, e)
        Object.assign(e, s)
      }
      this._shouldDisableRecordReuse && (s = {})
      let p = this._materializeRecord(s, Object.assign({ id: e.id, type: e.type }, n))
      return (
        e.meta && (p._meta = e.meta),
        e.attributes &&
          e.attributes.cachingPolicy &&
          e.attributes.cachingPolicy.maxAge &&
          ((p._mjs.expiration = Date.now() + 1e3 * e.attributes.cachingPolicy.maxAge),
          this._removeOnExpiration && this._expiryRecords.add(p)),
        this._populateDataAttributes(e, p),
        'object' == typeof e.relationships &&
          Object.keys(e.relationships).forEach((d) => {
            let y = e.relationships[d]
            y &&
              'data' in y &&
              ((y = this.populateDataRecords(y, s, {
                mapping: h,
                parents: [{ relationshipName: d, parentType: p.type, parentId: p.id }],
              })),
              p.setProperty(d, y, 'relationships', n))
          }),
        'object' == typeof e.views &&
          Object.keys(e.views).forEach((n) => {
            let d = e.views[n]
            if (d.attributes || d.data) {
              let e = new DataRecord('view', n)
              if ((this._populateDataAttributes(d, e), d.data)) {
                let n = this.populateDataRecords(d, s, h)
                e.setProperty('data', n, 'relationships')
              }
              p.setProperty(n, e, 'views')
            }
          }),
        p
      )
    }
    query(e, s) {
      this._checkForExpiredRecords()
      let includeRecord = (e) => !1
      return (
        'string' == typeof e && s
          ? (includeRecord = (n) => (null == n ? void 0 : n[e]) === s)
          : 'function' == typeof e
          ? (includeRecord = (s) => {
              try {
                return e(s)
              } catch (_t) {
                return !1
              }
            })
          : 'object' == typeof e &&
            (includeRecord = (s) => {
              let n = Object.keys(e),
                d = 0
              return (
                n.forEach((n) => {
                  ;(null == s ? void 0 : s[n]) === e[n] && d++
                }),
                n.length === d
              )
            }),
        Object.values(this._records).reduce(
          (e, s) => (
            Object.values(s).forEach((s) => {
              includeRecord(s) && e.push(s)
            }),
            e
          ),
          []
        )
      )
    }
    remove(e, s) {
      setTimeout(this._checkForExpiredRecords.bind(this), 0)
      if (!this._records.hasOwnProperty(e)) return
      const n = this.peek(e, s)
      n &&
        (this.dispatchEvent(qe.dataRecordWillDelete, [e, s]),
        n._mjs.parents &&
          n._mjs.parents.length > 0 &&
          n._mjs.parents.forEach(({ relationshipName: e, parentType: s, parentId: d }) => {
            this.peek(s, d).removeRelative(e, n.id)
          }),
        delete this._records[e][s],
        this.dispatchEvent(qe.dataRecordDidDelete, [e, s]))
    }
    save(e, s = {}) {
      return setTimeout(this._checkForExpiredRecords.bind(this), 0), this.populateDataRecords(e, this._records, s)
    }
    _populateDataAttributes(e, s) {
      'object' == typeof e.attributes &&
        (this.dispatchEvent(qe.dataRecordWillPopulate, [s.type, s.id]),
        Object.keys(e.attributes).forEach((n) => {
          s.setProperty(n, e.attributes[n], 'attributes')
        }),
        this.dispatchEvent(qe.dataRecordDidPopulate, [s.type, s.id]))
    }
    _materializeRecord(e, s) {
      const { type: n, id: d } = s,
        h = (function (e, s) {
          var n = {}
          for (var d in e) Object.prototype.hasOwnProperty.call(e, d) && s.indexOf(d) < 0 && (n[d] = e[d])
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var h = 0
            for (d = Object.getOwnPropertySymbols(e); h < d.length; h++) s.indexOf(d[h]) < 0 && (n[d[h]] = e[d[h]])
          }
          return n
        })(s, ['type', 'id'])
      return (
        (e[n] = e[n] || {}),
        e[n][d] ? e[n][d].setParent(h.parents || []) : (e[n][d] = new DataRecord(n, d, h)),
        this.dispatchEvent(qe.dataRecordDidMaterialize, [n, d]),
        e[n][d]
      )
    }
    _checkForExpiredRecords() {
      const e = []
      this._expiryRecords.forEach((s) => {
        Date.now() > s._mjs.expiration && (e.push([s.type, s.id]), this._expiryRecords.delete(s))
      }),
        e.forEach((e) => {
          this.remove(...e)
        })
    }
  }
  const logDeprecation = (e, s = {}) => {
    if (w && w.enabled) {
      const n = []
      n.push('Deprecation warning:'),
        n.push(s.message || e + ' has been deprecated.'),
        void 0 !== s.until && n.push(`${e} will be removed in version ${s.until}.`),
        w.warn(n.join(' '))
    }
  }
  const Qe = {
    AW: 'ABW',
    AF: 'AFG',
    AO: 'AGO',
    AI: 'AIA',
    AX: 'ALA',
    AL: 'ALB',
    AD: 'AND',
    AE: 'ARE',
    AR: 'ARG',
    AM: 'ARM',
    AS: 'ASM',
    AQ: 'ATA',
    TF: 'ATF',
    AG: 'ATG',
    AU: 'AUS',
    AT: 'AUT',
    AZ: 'AZE',
    BI: 'BDI',
    BE: 'BEL',
    BJ: 'BEN',
    BQ: 'BES',
    BF: 'BFA',
    BD: 'BGD',
    BG: 'BGR',
    BH: 'BHR',
    BS: 'BHS',
    BA: 'BIH',
    BL: 'BLM',
    BY: 'BLR',
    BZ: 'BLZ',
    BM: 'BMU',
    BO: 'BOL',
    BR: 'BRA',
    BB: 'BRB',
    BN: 'BRN',
    BT: 'BTN',
    BV: 'BVT',
    BW: 'BWA',
    CF: 'CAF',
    CA: 'CAN',
    CC: 'CCK',
    CH: 'CHE',
    CL: 'CHL',
    CN: 'CHN',
    CI: 'CIV',
    CM: 'CMR',
    CD: 'COD',
    CG: 'COG',
    CK: 'COK',
    CO: 'COL',
    KM: 'COM',
    CV: 'CPV',
    CR: 'CRI',
    CU: 'CUB',
    CW: 'CUW',
    CX: 'CXR',
    KY: 'CYM',
    CY: 'CYP',
    CZ: 'CZE',
    DE: 'DEU',
    DJ: 'DJI',
    DM: 'DMA',
    DK: 'DNK',
    DO: 'DOM',
    DZ: 'DZA',
    EC: 'ECU',
    EG: 'EGY',
    ER: 'ERI',
    EH: 'ESH',
    ES: 'ESP',
    EE: 'EST',
    ET: 'ETH',
    FI: 'FIN',
    FJ: 'FJI',
    FK: 'FLK',
    FR: 'FRA',
    FO: 'FRO',
    FM: 'FSM',
    GA: 'GAB',
    GB: 'GBR',
    GE: 'GEO',
    GG: 'GGY',
    GH: 'GHA',
    GI: 'GIB',
    GN: 'GIN',
    GP: 'GLP',
    GM: 'GMB',
    GW: 'GNB',
    GQ: 'GNQ',
    GR: 'GRC',
    GD: 'GRD',
    GL: 'GRL',
    GT: 'GTM',
    GF: 'GUF',
    GU: 'GUM',
    GY: 'GUY',
    HK: 'HKG',
    HM: 'HMD',
    HN: 'HND',
    HR: 'HRV',
    HT: 'HTI',
    HU: 'HUN',
    ID: 'IDN',
    IM: 'IMN',
    IN: 'IND',
    IO: 'IOT',
    IE: 'IRL',
    IR: 'IRN',
    IQ: 'IRQ',
    IS: 'ISL',
    IL: 'ISR',
    IT: 'ITA',
    JM: 'JAM',
    JE: 'JEY',
    JO: 'JOR',
    JP: 'JPN',
    KZ: 'KAZ',
    KE: 'KEN',
    KG: 'KGZ',
    KH: 'KHM',
    KI: 'KIR',
    KN: 'KNA',
    KR: 'KOR',
    KW: 'KWT',
    LA: 'LAO',
    LB: 'LBN',
    LR: 'LBR',
    LY: 'LBY',
    LC: 'LCA',
    LI: 'LIE',
    LK: 'LKA',
    LS: 'LSO',
    LT: 'LTU',
    LU: 'LUX',
    LV: 'LVA',
    MO: 'MAC',
    MF: 'MAF',
    MA: 'MAR',
    MC: 'MCO',
    MD: 'MDA',
    MG: 'MDG',
    MV: 'MDV',
    MX: 'MEX',
    MH: 'MHL',
    MK: 'MKD',
    ML: 'MLI',
    MT: 'MLT',
    MM: 'MMR',
    ME: 'MNE',
    MN: 'MNG',
    MP: 'MNP',
    MZ: 'MOZ',
    MR: 'MRT',
    MS: 'MSR',
    MQ: 'MTQ',
    MU: 'MUS',
    MW: 'MWI',
    MY: 'MYS',
    YT: 'MYT',
    NA: 'NAM',
    NC: 'NCL',
    NE: 'NER',
    NF: 'NFK',
    NG: 'NGA',
    NI: 'NIC',
    NU: 'NIU',
    NL: 'NLD',
    NO: 'NOR',
    NP: 'NPL',
    NR: 'NRU',
    NZ: 'NZL',
    OM: 'OMN',
    PK: 'PAK',
    PA: 'PAN',
    PN: 'PCN',
    PE: 'PER',
    PH: 'PHL',
    PW: 'PLW',
    PG: 'PNG',
    PL: 'POL',
    PR: 'PRI',
    KP: 'PRK',
    PT: 'PRT',
    PY: 'PRY',
    PS: 'PSE',
    PF: 'PYF',
    QA: 'QAT',
    RE: 'REU',
    RO: 'ROU',
    RU: 'RUS',
    RW: 'RWA',
    SA: 'SAU',
    SD: 'SDN',
    SN: 'SEN',
    SG: 'SGP',
    GS: 'SGS',
    SH: 'SHN',
    SJ: 'SJM',
    SB: 'SLB',
    SL: 'SLE',
    SV: 'SLV',
    SM: 'SMR',
    SO: 'SOM',
    PM: 'SPM',
    RS: 'SRB',
    SS: 'SSD',
    ST: 'STP',
    SR: 'SUR',
    SK: 'SVK',
    SI: 'SVN',
    SE: 'SWE',
    SZ: 'SWZ',
    SX: 'SXM',
    SC: 'SYC',
    SY: 'SYR',
    TC: 'TCA',
    TD: 'TCD',
    TG: 'TGO',
    TH: 'THA',
    TJ: 'TJK',
    TK: 'TKL',
    TM: 'TKM',
    TL: 'TLS',
    TO: 'TON',
    TT: 'TTO',
    TN: 'TUN',
    TR: 'TUR',
    TV: 'TUV',
    TW: 'TWN',
    TZ: 'TZA',
    UG: 'UGA',
    UA: 'UKR',
    UM: 'UMI',
    UY: 'URY',
    US: 'USA',
    UZ: 'UZB',
    VA: 'VAT',
    VC: 'VCT',
    VE: 'VEN',
    VG: 'VGB',
    VI: 'VIR',
    VN: 'VNM',
    VU: 'VUT',
    WF: 'WLF',
    WS: 'WSM',
    XK: 'XKX',
    YE: 'YEM',
    ZA: 'ZAF',
    ZM: 'ZMB',
    ZW: 'ZWE',
  }
  class PubSub {
    constructor() {
      this.events = {}
    }
    publish(e, s) {
      const n = this.getSubscribersForType(e)
      void 0 !== n &&
        n.forEach((n) => {
          n(e, s)
        })
    }
    subscribe(e, s) {
      this.getSubscribersForType(e, !0).push(s)
    }
    subscribeOnce(e, s) {
      const onceCallback = (e, n) => {
        this.unsubscribe(e, onceCallback), s(e, n)
      }
      this.subscribe(e, onceCallback)
    }
    unsubscribe(e, s) {
      const n = this.getSubscribersForType(e)
      if (void 0 !== n)
        for (const d in n)
          if (n[d] === s) {
            delete n[d]
            break
          }
    }
    clear(e) {
      void 0 === e ? (this.events = {}) : delete this.events[e]
    }
    getSubscribersForType(e, s = !1) {
      return !this.events.hasOwnProperty(e) && s && (this.events[e] = []), this.events[e]
    }
  }
  const Xe = {},
    SerialAsync = (e) => {
      let s = Promise.resolve()
      return (n, d, h) => {
        const p = h.value
        return (
          (h.value = function (...n) {
            return __awaiter$3(this, void 0, void 0, function* () {
              return (
                e &&
                  (s = ((e) => {
                    let s = Xe[e]
                    return s || ((s = Promise.resolve()), (Xe[e] = s)), s
                  })(e)),
                (s = s.catch(() => {}).then(() => p.apply(this, n))),
                e && (Xe[e] = s),
                s
              )
            })
          }),
          h
        )
      }
    }
  var Je, Ze, et, tt, it, rt, st, nt, at
  ;(e.PlaybackBitrate = void 0),
    ((Je = e.PlaybackBitrate || (e.PlaybackBitrate = {}))[(Je.STANDARD = 64)] = 'STANDARD'),
    (Je[(Je.HIGH = 256)] = 'HIGH'),
    (function (e) {
      ;(e.apiStorefrontChanged = 'apiStorefrontChanged'),
        (e.hlsLevelUpdated = 'hlsLevelUpdated'),
        (e.mediaContentComplete = 'mediaContentComplete'),
        (e.playbackPause = 'playbackPause'),
        (e.playbackPlay = 'playbackPlay'),
        (e.playbackScrub = 'playbackScrub'),
        (e.playbackSeek = 'playbackSeek'),
        (e.playbackSkip = 'playbackSkip'),
        (e.playbackStop = 'playbackStop'),
        (e.playerActivate = 'playerActivate'),
        (e.playerExit = 'playerExit'),
        (e.queueModified = 'queueModified'),
        (e.userActivityIntent = 'userActivityIntent'),
        (e.applicationActivityIntent = 'applicationActivityIntent')
    })(Ze || (Ze = {})),
    (function (e) {
      ;(e.MUSICKIT = 'music_kit-integration'),
        (e.OTHER = 'other'),
        (e.MINI = 'mini'),
        (e.SONG = 'song'),
        (e.ALBUM = 'album'),
        (e.ALBUM_CLASSICAL = 'album-classical'),
        (e.ARTIST = 'artist'),
        (e.COMPILATION = 'compilation'),
        (e.COMPILATION_CLASSICAL = 'compilation-classical'),
        (e.PLAYLIST = 'playlist'),
        (e.PLAYLIST_CLASSICAL = 'playlist-classical'),
        (e.RADIO = 'radio'),
        (e.SEARCH = 'search'),
        (e.STATION = 'station')
    })(et || (et = {})),
    (function (e) {
      ;(e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
        (e[(e.RADIO = 1)] = 'RADIO'),
        (e[(e.PLAYLIST = 2)] = 'PLAYLIST'),
        (e[(e.ALBUM = 3)] = 'ALBUM'),
        (e[(e.ARTIST = 4)] = 'ARTIST')
    })(tt || (tt = {})),
    (e.PlayActivityEndReasonType = void 0),
    ((it = e.PlayActivityEndReasonType || (e.PlayActivityEndReasonType = {}))[(it.NOT_APPLICABLE = 0)] =
      'NOT_APPLICABLE'),
    (it[(it.OTHER = 1)] = 'OTHER'),
    (it[(it.TRACK_SKIPPED_FORWARDS = 2)] = 'TRACK_SKIPPED_FORWARDS'),
    (it[(it.PLAYBACK_MANUALLY_PAUSED = 3)] = 'PLAYBACK_MANUALLY_PAUSED'),
    (it[(it.PLAYBACK_SUSPENDED = 4)] = 'PLAYBACK_SUSPENDED'),
    (it[(it.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM = 5)] = 'MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM'),
    (it[(it.PLAYBACK_PAUSED_DUE_TO_INACTIVITY = 6)] = 'PLAYBACK_PAUSED_DUE_TO_INACTIVITY'),
    (it[(it.NATURAL_END_OF_TRACK = 7)] = 'NATURAL_END_OF_TRACK'),
    (it[(it.PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT = 8)] = 'PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT'),
    (it[(it.TRACK_BANNED = 9)] = 'TRACK_BANNED'),
    (it[(it.FAILED_TO_LOAD = 10)] = 'FAILED_TO_LOAD'),
    (it[(it.PAUSED_ON_TIMEOUT = 11)] = 'PAUSED_ON_TIMEOUT'),
    (it[(it.SCRUB_BEGIN = 12)] = 'SCRUB_BEGIN'),
    (it[(it.SCRUB_END = 13)] = 'SCRUB_END'),
    (it[(it.TRACK_SKIPPED_BACKWARDS = 14)] = 'TRACK_SKIPPED_BACKWARDS'),
    (it[(it.NOT_SUPPORTED_BY_CLIENT = 15)] = 'NOT_SUPPORTED_BY_CLIENT'),
    (it[(it.QUICK_PLAY = 16)] = 'QUICK_PLAY'),
    (it[(it.EXITED_APPLICATION = 17)] = 'EXITED_APPLICATION'),
    (function (e) {
      ;(e[(e.Manual = 0)] = 'Manual'), (e[(e.Interval = 1)] = 'Interval'), (e[(e.SkipIntro = 2)] = 'SkipIntro')
    })(rt || (rt = {})),
    (function (e) {
      ;(e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
        (e[(e.NO_RIGHTS = 1)] = 'NO_RIGHTS'),
        (e[(e.PURCHASED = 2)] = 'PURCHASED'),
        (e[(e.UPLOADED = 3)] = 'UPLOADED'),
        (e[(e.MATCHED = 4)] = 'MATCHED'),
        (e[(e.ADDED = 5)] = 'ADDED'),
        (e[(e.SUBSCRIBED = 6)] = 'SUBSCRIBED'),
        (e[(e.NOT_SUPPORTED = 7)] = 'NOT_SUPPORTED')
    })(st || (st = {})),
    (function (e) {
      ;(e[(e.NO_SELECTION_PLAY = 0)] = 'NO_SELECTION_PLAY'),
        (e[(e.RESUME_LAST_PLAYED_SONG = 1)] = 'RESUME_LAST_PLAYED_SONG'),
        (e[(e.RESUME_CURRENT_DEVICE_POSITION = 2)] = 'RESUME_CURRENT_DEVICE_POSITION')
    })(nt || (nt = {})),
    (function (e) {
      ;(e[(e.NOT_APPLICABLE = 0)] = 'NOT_APPLICABLE'),
        (e[(e.SIMILARITIES = 1)] = 'SIMILARITIES'),
        (e[(e.ESSENTIALS = 2)] = 'ESSENTIALS'),
        (e[(e.USER_LIBRARY = 3)] = 'USER_LIBRARY'),
        (e[(e.ALGO_HEATSEEKER = 4)] = 'ALGO_HEATSEEKER'),
        (e[(e.SEED_TRACK = 5)] = 'SEED_TRACK'),
        (e[(e.GN_1M_TEMPORARY = 6)] = 'GN_1M_TEMPORARY'),
        (e[(e.VECTOR = 8)] = 'VECTOR'),
        (e[(e.ARTIST_SIMILARITIES = 9)] = 'ARTIST_SIMILARITIES'),
        (e[(e.STORY_ALBUM_LISTENERS_ALSO_BOUGHT = 10)] = 'STORY_ALBUM_LISTENERS_ALSO_BOUGHT'),
        (e[(e.STORY_ALBUM_SALES_LEADER = 11)] = 'STORY_ALBUM_SALES_LEADER'),
        (e[(e.STORY_BILLBOARD = 12)] = 'STORY_BILLBOARD'),
        (e[(e.STORY_COMPLETE_MY_ALBUM = 13)] = 'STORY_COMPLETE_MY_ALBUM'),
        (e[(e.STORY_CRITICAL_PICK = 14)] = 'STORY_CRITICAL_PICK'),
        (e[(e.STORY_ITUNES_ESSENTIAL = 15)] = 'STORY_ITUNES_ESSENTIAL'),
        (e[(e.STORY_HEATSEEKER = 16)] = 'STORY_HEATSEEKER'),
        (e[(e.STORY_IDENTITY = 17)] = 'STORY_IDENTITY'),
        (e[(e.STORY_POWER_SONG = 18)] = 'STORY_POWER_SONG'),
        (e[(e.STORY_SONG_SALES_LEADER = 20)] = 'STORY_SONG_SALES_LEADER'),
        (e[(e.GENRE_SIMILARITIES = 21)] = 'GENRE_SIMILARITIES'),
        (e[(e.STORY_IMIX = 22)] = 'STORY_IMIX'),
        (e[(e.STORY_OTHER_MIX = 23)] = 'STORY_OTHER_MIX'),
        (e[(e.EDITORIAL = 24)] = 'EDITORIAL'),
        (e[(e.TOP_SONGS = 25)] = 'TOP_SONGS'),
        (e[(e.SUBFORMAT_SONGS = 26)] = 'SUBFORMAT_SONGS'),
        (e[(e.CRITICAL_PICKS = 27)] = 'CRITICAL_PICKS'),
        (e[(e.US_ARTIST_SIMS = 28)] = 'US_ARTIST_SIMS'),
        (e[(e.HEAVY_ROTATION = 29)] = 'HEAVY_ROTATION'),
        (e[(e.STORY_FORMAT_STATION_HEAVY_ROTATION = 30)] = 'STORY_FORMAT_STATION_HEAVY_ROTATION'),
        (e[(e.ARTIST_BASED_CORE_SIMILAR_ARTISTS = 31)] = 'ARTIST_BASED_CORE_SIMILAR_ARTISTS'),
        (e[(e.ARTIST_BASED_FAMILIAR_SIMILAR_ARTISTS = 32)] = 'ARTIST_BASED_FAMILIAR_SIMILAR_ARTISTS'),
        (e[(e.ARTIST_BASED_DISCOVERIES = 33)] = 'ARTIST_BASED_DISCOVERIES'),
        (e[(e.ARTIST_BASED_HOT_SONGS = 34)] = 'ARTIST_BASED_HOT_SONGS'),
        (e[(e.ARTIST_BASED_SEED_ARTIST = 35)] = 'ARTIST_BASED_SEED_ARTIST'),
        (e[(e.ARTIST_BASED_COMPOSER = 36)] = 'ARTIST_BASED_COMPOSER'),
        (e[(e.EDITORIAL_STATION_INTRO = 37)] = 'EDITORIAL_STATION_INTRO'),
        (e[(e.EDITORIAL_RELATIVE_REPEAT = 38)] = 'EDITORIAL_RELATIVE_REPEAT'),
        (e[(e.EDITORIAL_ABSOLUTE_REPEAT = 39)] = 'EDITORIAL_ABSOLUTE_REPEAT'),
        (e[(e.EDITORIAL_SCHEDULED = 40)] = 'EDITORIAL_SCHEDULED'),
        (e[(e.EDITORIAL_SUGGESTED_ARTIST = 41)] = 'EDITORIAL_SUGGESTED_ARTIST'),
        (e[(e.FOR_YOU_FAMILIAR = 42)] = 'FOR_YOU_FAMILIAR'),
        (e[(e.FOR_YOU_RECOMMENDED = 43)] = 'FOR_YOU_RECOMMENDED'),
        (e[(e.FOR_YOU_FAVORITE_ARTIST = 44)] = 'FOR_YOU_FAVORITE_ARTIST'),
        (e[(e.FOR_YOU_RECOMMENDED_ARTIST = 45)] = 'FOR_YOU_RECOMMENDED_ARTIST'),
        (e[(e.EDITORIAL_POSITIONAL = 46)] = 'EDITORIAL_POSITIONAL'),
        (e[(e.SIMILAR_SONGS = 47)] = 'SIMILAR_SONGS'),
        (e[(e.SONG_ATTRIBUTE_FAVORITE_ARTIST = 48)] = 'SONG_ATTRIBUTE_FAVORITE_ARTIST'),
        (e[(e.SONG_ATTRIBUTE_FAVORITE_ARTIST_DERIVED = 49)] = 'SONG_ATTRIBUTE_FAVORITE_ARTIST_DERIVED'),
        (e[(e.SONG_ATTRIBUTE_FAVORITE_ARTIST_EDITORIAL = 50)] = 'SONG_ATTRIBUTE_FAVORITE_ARTIST_EDITORIAL'),
        (e[(e.SONG_ATTRIBUTE_RECOMMENDED = 51)] = 'SONG_ATTRIBUTE_RECOMMENDED'),
        (e[(e.SONG_ATTRIBUTE_RECOMMENDED_DERIVED = 52)] = 'SONG_ATTRIBUTE_RECOMMENDED_DERIVED'),
        (e[(e.SONG_ATTRIBUTE_RECOMMENDED_EDITORIAL = 53)] = 'SONG_ATTRIBUTE_RECOMMENDED_EDITORIAL'),
        (e[(e.SONG_ATTRIBUTE_NON_PERSONALIZED = 54)] = 'SONG_ATTRIBUTE_NON_PERSONALIZED'),
        (e[(e.SONG_ATTRIBUTE_NON_PERSONALIZED_DERIVED = 55)] = 'SONG_ATTRIBUTE_NON_PERSONALIZED_DERIVED'),
        (e[(e.SONG_ATTRIBUTE_NON_PERSONALIZED_EDITORIAL = 56)] = 'SONG_ATTRIBUTE_NON_PERSONALIZED_EDITORIAL'),
        (e[(e.PERSONAL_STATION = 57)] = 'PERSONAL_STATION'),
        (e[(e.PERSONAL_STATION_FAVORITE_ARTIST = 58)] = 'PERSONAL_STATION_FAVORITE_ARTIST'),
        (e[(e.PERSONAL_STATION_RECOMMENDED = 59)] = 'PERSONAL_STATION_RECOMMENDED'),
        (e[(e.NEW_MUSIC_STATION = 60)] = 'NEW_MUSIC_STATION'),
        (e[(e.NEW_MUSIC_STATION_FAVORITE_ARTIST = 61)] = 'NEW_MUSIC_STATION_FAVORITE_ARTIST'),
        (e[(e.NEW_MUSIC_STATION_RECOMMENDED = 62)] = 'NEW_MUSIC_STATION_RECOMMENDED')
    })(at || (at = {}))
  var ot, dt, lt, ct, ut, ht, pt, yt, mt, gt, ft, vt
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
  function __rest(e, s) {
    var n = {}
    for (var d in e) Object.prototype.hasOwnProperty.call(e, d) && s.indexOf(d) < 0 && (n[d] = e[d])
    if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
      var h = 0
      for (d = Object.getOwnPropertySymbols(e); h < d.length; h++)
        s.indexOf(d[h]) < 0 && Object.prototype.propertyIsEnumerable.call(e, d[h]) && (n[d[h]] = e[d[h]])
    }
    return n
  }
  function __decorate$1(e, s, n, d) {
    var h,
      p = arguments.length,
      y = p < 3 ? s : null === d ? (d = Object.getOwnPropertyDescriptor(s, n)) : d
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) y = Reflect.decorate(e, s, n, d)
    else for (var m = e.length - 1; m >= 0; m--) (h = e[m]) && (y = (p < 3 ? h(y) : p > 3 ? h(s, n, y) : h(s, n)) || y)
    return p > 3 && y && Object.defineProperty(s, n, y), y
  }
  function __metadata$1(e, s) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata) return Reflect.metadata(e, s)
  }
  function __awaiter$2(e, s, n, d) {
    return new (n || (n = Promise))(function (h, p) {
      function fulfilled(e) {
        try {
          step(d.next(e))
        } catch (_t) {
          p(_t)
        }
      }
      function rejected(e) {
        try {
          step(d.throw(e))
        } catch (_t) {
          p(_t)
        }
      }
      function step(e) {
        var s
        e.done
          ? h(e.value)
          : ((s = e.value),
            s instanceof n
              ? s
              : new n(function (e) {
                  e(s)
                })).then(fulfilled, rejected)
      }
      step((d = d.apply(e, s || [])).next())
    })
  }
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ function t(e, s) {
    var n = 'function' == typeof Symbol && e[Symbol.iterator]
    if (!n) return e
    var d,
      h,
      p = n.call(e),
      y = []
    try {
      for (; (void 0 === s || s-- > 0) && !(d = p.next()).done; ) y.push(d.value)
    } catch (e) {
      h = { error: e }
    } finally {
      try {
        d && !d.done && (n = p.return) && n.call(p)
      } finally {
        if (h) throw h.error
      }
    }
    return y
  }
  !(function (e) {
    ;(e[(e.UNSPECIFIED = 0)] = 'UNSPECIFIED'), (e[(e.STATIC = 1)] = 'STATIC'), (e[(e.TIME_SYNCED = 2)] = 'TIME_SYNCED')
  })(ot || (ot = {})),
    (function (e) {
      ;(e[(e.REPEAT_UNKNOWN = 0)] = 'REPEAT_UNKNOWN'),
        (e[(e.REPEAT_OFF = 1)] = 'REPEAT_OFF'),
        (e[(e.REPEAT_ONE = 2)] = 'REPEAT_ONE'),
        (e[(e.REPEAT_ALL = 3)] = 'REPEAT_ALL')
    })(dt || (dt = {})),
    (function (e) {
      ;(e[(e.SHUFFLE_UNKNOWN = 0)] = 'SHUFFLE_UNKNOWN'),
        (e[(e.SHUFFLE_OFF = 1)] = 'SHUFFLE_OFF'),
        (e[(e.SHUFFLE_ON = 2)] = 'SHUFFLE_ON')
    })(lt || (lt = {})),
    (function (e) {
      ;(e[(e.AUTO_UNKNOWN = 0)] = 'AUTO_UNKNOWN'),
        (e[(e.AUTO_OFF = 1)] = 'AUTO_OFF'),
        (e[(e.AUTO_ON = 2)] = 'AUTO_ON'),
        (e[(e.AUTO_ON_CONTENT_UNSUPPORTED = 3)] = 'AUTO_ON_CONTENT_UNSUPPORTED')
    })(ct || (ct = {})),
    (function (e) {
      ;(e[(e.NOT_SPECIFIED = 0)] = 'NOT_SPECIFIED'), (e[(e.CONTAINER_CHANGED = 1)] = 'CONTAINER_CHANGED')
    })(ut || (ut = {})),
    (function (e) {
      ;(e[(e.PLAY_END = 0)] = 'PLAY_END'),
        (e[(e.PLAY_START = 1)] = 'PLAY_START'),
        (e[(e.LYRIC_DISPLAY = 2)] = 'LYRIC_DISPLAY')
    })(ht || (ht = {})),
    (function (e) {
      ;(e[(e.INVALID = 0)] = 'INVALID'),
        (e[(e.ITUNES_STORE_CONTENT = 1)] = 'ITUNES_STORE_CONTENT'),
        (e[(e.NON_SONG_CLIP = 2)] = 'NON_SONG_CLIP'),
        (e[(e.AD = 3)] = 'AD'),
        (e[(e.STREAM = 4)] = 'STREAM'),
        (e[(e.AUDIO_AD = 5)] = 'AUDIO_AD'),
        (e[(e.VIDEO_AD = 6)] = 'VIDEO_AD'),
        (e[(e.TIMED_METADATA_PING = 7)] = 'TIMED_METADATA_PING'),
        (e[(e.ARTIST_UPLOADED_CONTENT = 8)] = 'ARTIST_UPLOADED_CONTENT'),
        (e[(e.AGGREGATE_NON_CATALOG_PLAY_TIME = 9)] = 'AGGREGATE_NON_CATALOG_PLAY_TIME'),
        (e[(e.ORIGINAL_CONTENT_MOVIES = 10)] = 'ORIGINAL_CONTENT_MOVIES'),
        (e[(e.ORIGINAL_CONTENT_SHOWS = 11)] = 'ORIGINAL_CONTENT_SHOWS')
    })(pt || (pt = {})),
    (function (e) {
      ;(e[(e.AUDIO = 0)] = 'AUDIO'), (e[(e.VIDEO = 1)] = 'VIDEO')
    })(yt || (yt = {})),
    (function (e) {
      ;(e[(e.AUTO = 0)] = 'AUTO'), (e[(e.MANUAL = 1)] = 'MANUAL')
    })(mt || (mt = {})),
    (function (e) {
      ;(e[(e.WEBPLAYER = 8)] = 'WEBPLAYER'),
        (e[(e.MUSICKIT = 10)] = 'MUSICKIT'),
        (e[(e.AMAZON = 13)] = 'AMAZON'),
        (e[(e.THIRD_PARTY_TV = 18)] = 'THIRD_PARTY_TV')
    })(gt || (gt = {})),
    (function (e) {
      ;(e[(e.EPISODE = 1)] = 'EPISODE'), (e[(e.SHOUTCAST = 2)] = 'SHOUTCAST')
    })(ft || (ft = {})),
    (function (e) {
      ;(e[(e.NotStarted = 0)] = 'NotStarted'), (e[(e.Running = 1)] = 'Running'), (e[(e.Stopped = 2)] = 'Stopped')
    })(vt || (vt = {}))
  var _t = { type: 'xstate.init' }
  function r(e) {
    return void 0 === e ? [] : [].concat(e)
  }
  function o(e) {
    return { type: 'xstate.assign', assignment: e }
  }
  function i(e, s) {
    return 'string' == typeof (e = 'string' == typeof e && s && s[e] ? s[e] : e)
      ? { type: e }
      : 'function' == typeof e
      ? { type: e.name, exec: e }
      : e
  }
  function a(e) {
    return function (s) {
      return e === s
    }
  }
  function u(e) {
    return 'string' == typeof e ? { type: e } : e
  }
  function c(e, s) {
    return { value: e, context: s, actions: [], changed: !1, matches: a(e) }
  }
  function f(e, s, n) {
    var d = s,
      h = !1
    return [
      e.filter(function (e) {
        if ('xstate.assign' === e.type) {
          h = !0
          var s = Object.assign({}, d)
          return (
            'function' == typeof e.assignment
              ? (s = e.assignment(d, n))
              : Object.keys(e.assignment).forEach(function (h) {
                  s[h] = 'function' == typeof e.assignment[h] ? e.assignment[h](d, n) : e.assignment[h]
                }),
            (d = s),
            !1
          )
        }
        return !0
      }),
      d,
      h,
    ]
  }
  var l = function (e, s) {
    return e.actions.forEach(function (n) {
      var d = n.exec
      return d && d(e.context, s)
    })
  }
  function invoke(e) {
    return void 0 === e || ((e) => 'function' != typeof e)(e) ? e : e()
  }
  const bt = /(?:st|ra)\.([0-9]+)/,
    Tt = /st\.([0-9]+)/
  class PlayActivitySender {
    constructor(e) {
      var s, n, d, h
      ;(this.mode = mt.AUTO),
        (this._isQA = !1),
        (this._logInfo = !1),
        (this._preferDSID = !1),
        (this._accessToken = e.accessToken),
        (this._clientId = e.clientId),
        (this._eventType = e.eventType),
        (this._fetch = null !== (s = e.fetch) && void 0 !== s ? s : fetch),
        (this._fetchOptions = null !== (n = e.fetchOptions) && void 0 !== n ? n : {}),
        (this._headersClass = null !== (d = e.headersClass) && void 0 !== d ? d : Headers),
        (this._isQA = null !== (h = e.isQA) && void 0 !== h && h),
        (this._logInfo = e.logInfo || this._isQA),
        (this._musicUserToken = e.musicUserToken),
        (this._preferDSID = e.preferDSID),
        (this._sourceType = e.sourceType),
        (this._traceTag = e.traceTag)
    }
    get accessToken() {
      return invoke(this._accessToken)
    }
    get musicUserToken() {
      return invoke(this._musicUserToken)
    }
    get url() {
      return this._isQA
        ? 'https://universal-activity-service.itunes.apple.com/qa/play'
        : 'https://universal-activity-service.itunes.apple.com/play'
    }
    send(e) {
      return __awaiter$2(this, void 0, void 0, function* () {
        const s = { client_id: this._clientId, event_type: this._eventType, data: ensureArray(e) }
        if (0 === s.data.length) throw new Error('send() called without any data')
        const n = this._generateFetchOptions({ method: 'POST', body: JSON.stringify(s), headers: this.headers() }),
          d = yield this._fetch(this.url, n)
        return (
          yield d.text(),
          this._logInfo && console.info('play activity:', this._sourceType === gt.AMAZON ? JSON.stringify(s) : s),
          s
        )
      })
    }
    baseHeaders() {
      var e, s
      const n =
        null !== (s = null === (e = this._fetchOptions) || void 0 === e ? void 0 : e.headers) && void 0 !== s ? s : {}
      return n instanceof this._headersClass
        ? new this._headersClass(Array.from(n.entries()))
        : new this._headersClass(n)
    }
    headers() {
      const e = this._preferDSID ? 'X-Dsid' : 'media-user-token',
        s = this.baseHeaders()
      return (
        s.set('Authorization', 'Bearer ' + this.accessToken),
        s.set('Content-Type', 'application/json'),
        s.set(e, '' + this.musicUserToken),
        this._isQA && void 0 !== this._traceTag && s.set('Data-Trace-Tag', this._traceTag),
        s
      )
    }
    _generateFetchOptions(e) {
      return Object.assign(Object.assign({}, this._fetchOptions), e)
    }
  }
  const conditionalObject = (e, s, n) => (e ? { [s]: n } : {}),
    buildObject$1 = (e, s) => conditionalObject(void 0 !== s, e, s)
  const fullAppId = (e, s) => {
      if (void 0 === (null == s ? void 0 : s.name)) return 'MusicKitApp/1.0'
      if (void 0 !== e) return e
      return `${(function (e) {
        return e
          .toLowerCase()
          .replace(/[-_]+/g, ' ')
          .replace(/[^\w\s]/g, '')
          .replace(/\b./g, (e) => e.toUpperCase())
          .replace(/\s/g, '')
      })(s.name)}/${(null == s ? void 0 : s.version) || '1.0'}`
    },
    os = (e) => {
      var s, n, d
      const h = e.toLowerCase()
      let p,
        y = 'Unidentified OS'
      const m = /mobile/.test(h)
      m && /android|adr/.test(h)
        ? ((y = 'Android'), (p = h.match(/(?:android|adr)\ ((\d+[._])+\d+)/)))
        : m && /iphone|ipad|ipod/.test(h)
        ? ((y = 'iOS'), (p = h.match(/os\ ((\d+[._])+\d+)\ like\ mac\ os\ x/)))
        : /tizen/.test(h)
        ? ((y = 'Tizen'), (p = h.match(/tizen (.*)/)))
        : /web0s|webos/.test(h)
        ? ((y = 'WebOS'), (p = h.match(/[web0s|webos] (.*)/)))
        : !m && /cros/.test(h)
        ? (y = 'ChromeOS')
        : !m && /macintosh/.test(h)
        ? ((y = 'macOS'), (p = h.match(/os\ x\ ((\d+[._])+\d+)\b/)))
        : !m && /linux/.test(h)
        ? (y = 'Linux')
        : !m && /windows/.test(h) && ((y = 'Windows'), (p = h.match(/windows ([^\)]*)/)))
      return `${y}/${
        null !==
          (d =
            null === (n = null === (s = null == p ? void 0 : p[1]) || void 0 === s ? void 0 : s.replace) || void 0 === n
              ? void 0
              : n.call(s, /_/g, '.')) && void 0 !== d
          ? d
          : '0.0'
      }`
    },
    model = (e) => 'model/' + ((null == e ? void 0 : e.platform) || 'Unavailable'),
    build = (e) => {
      const s = null == e ? void 0 : e.build
      return void 0 === s || '' === s ? 'build/0.0.0' : 'build/' + s
    },
    Et = { platform: '', userAgent: '' }
  const St = ['uploadedVideo', 'uploadedAudio', 'uploaded-videos', 'uploaded-audios'],
    isAUC$1 = (e) => void 0 !== e && St.includes(e),
    isLiveStream$1 = (e) =>
      (({ itemType: e }) => e === pt.STREAM)(e) && !(({ descriptor: e }) => e.streamingKind === ft.EPISODE)(e),
    updatedDataByEventType = (e, s) => {
      switch (s['event-type']) {
        case ht.PLAY_START:
          return ((e) => {
            const s = {}
            return (
              isLiveStream$1(e) && (s['start-position-in-milliseconds'] = 0),
              !1 === e.previous && e.isAlexa
                ? (s['event-reason-hint-type'] = ut.NOT_SPECIFIED)
                : (s['event-reason-hint-type'] = e.containerChanged ? ut.CONTAINER_CHANGED : ut.NOT_SPECIFIED),
              s
            )
          })(e)
        case ht.PLAY_END:
          return ((e, s) => {
            var n
            const {
              descriptor: { endPositionInMilliseconds: d, startPositionInMilliseconds: h },
              previous: p,
            } = e
            if (p && void 0 === p.position) return {}
            const y = s['start-position-in-milliseconds'],
              m = { 'end-position-in-milliseconds': d || y, 'end-reason-type': e.endReasonType }
            if (isLiveStream$1(e))
              return Object.assign(Object.assign({}, m), {
                'media-duration-in-milliseconds': 0,
                'start-position-in-milliseconds': 0,
              })
            const g = y > s['media-duration-in-milliseconds'],
              v = p && void 0 !== p.position ? Math.round(1e3 * p.position) : 0
            return Object.assign(
              Object.assign(Object.assign({}, m), buildObject$1('media-duration-in-milliseconds', g ? y : void 0)),
              { 'start-position-in-milliseconds': null !== (n = null != h ? h : v) && void 0 !== n ? n : 0 }
            )
          })(e, s)
        default:
          return {}
      }
    },
    byEventType = ({ state: e, data: s }) => ({
      state: e,
      data: Object.assign(Object.assign({}, s), updatedDataByEventType(e, s)),
    }),
    byItemType = ({ data: e, state: s }) => {
      const { itemType: n } = s,
        d = Object.assign({}, e)
      return (
        isLiveStream$1(s) && (d['media-duration-in-milliseconds'] = 0),
        n === pt.AGGREGATE_NON_CATALOG_PLAY_TIME &&
          ((d['start-position-in-milliseconds'] = 0),
          (d['utc-offset-in-seconds'] = 0),
          delete d.ids,
          delete d['container-ids'],
          delete d['container-type'],
          delete d['reco-data'],
          delete d['feature-name'],
          d['play-mode'] &&
            (d['play-mode'] = {
              'auto-play-mode': ct.AUTO_UNKNOWN,
              'repeat-play-mode': dt.REPEAT_UNKNOWN,
              'shuffle-play-mode': lt.SHUFFLE_UNKNOWN,
            })),
        { state: s, data: d }
      )
    },
    buildContainerIds = (e, s) => {
      switch (e) {
        case tt.ALBUM:
          return ((e) => {
            const s = {}
            return (s['container-ids'] = v(e.id) ? { 'cloud-album-id': e.id } : { 'album-adam-id': e.id }), s
          })(s)
        case tt.PLAYLIST:
          return ((e) => {
            const s = {}
            return (
              e.isLibrary && (e.catalogId || e.globalId)
                ? ((s['container-ids'] = { 'global-playlist-id': e.catalogId || e.globalId }),
                  void 0 !== e.id && '' !== e.id && (s['container-ids']['universal-library-id'] = e.id))
                : (s['container-ids'] = v(e.id) ? { 'universal-library-id': e.id } : { 'global-playlist-id': e.id }),
              void 0 !== e.versionHash &&
                '' !== e.versionHash &&
                (s['container-ids']['playlist-version-hash'] = e.versionHash),
              s
            )
          })(s)
        case tt.RADIO:
          return ((e) => {
            const s = {}
            return (
              (s['container-ids'] = { 'station-id': e.id }),
              Tt.test(e.id) && (s['container-ids']['station-personalized-id'] = parseInt(e.id.replace(Tt, '$1'), 10)),
              void 0 !== e.stationHash && '' !== e.stationHash && (s['container-ids']['station-hash'] = e.stationHash),
              s
            )
          })(s)
        default:
          return {}
      }
    },
    buildDataByType = (e) => {
      const s = (({ type: e }) => {
        if ('number' == typeof e) return e
        switch (e) {
          case 'album':
          case 'albums':
          case 'library-albums':
            return tt.ALBUM
          case 'artist':
          case 'artists':
          case 'library-artists':
            return tt.ARTIST
          case 'playlist':
          case 'playlists':
          case 'library-playlists':
            return tt.PLAYLIST
          case 'radio':
          case 'radioStation':
          case 'station':
          case 'stations':
            return tt.RADIO
          default:
            return tt.UNKNOWN
        }
      })(e)
      return 0 === s ? {} : Object.assign({ 'container-type': s }, buildContainerIds(s, e))
    },
    updatedDataFromContainer = ({ descriptor: { container: e } }) => {
      if (void 0 === e) return {}
      return Object.assign({ 'feature-name': '' + (e.name || et.MUSICKIT) }, buildDataByType(e))
    },
    buildDataFromContainer = ({ data: e, state: s }) => ({
      state: s,
      data: Object.assign(Object.assign({}, e), updatedDataFromContainer(s)),
    }),
    kt = e.PlayActivityEndReasonType,
    Pt = {
      exit: kt.EXITED_APPLICATION,
      next: kt.TRACK_SKIPPED_FORWARDS,
      pause: kt.PLAYBACK_MANUALLY_PAUSED,
      playbackfinished: kt.NATURAL_END_OF_TRACK,
      playbackstopped: kt.PLAYBACK_MANUALLY_PAUSED,
      previous: kt.TRACK_SKIPPED_BACKWARDS,
      scrub_begin: kt.SCRUB_BEGIN,
      scrub_end: kt.SCRUB_END,
      stop: kt.NATURAL_END_OF_TRACK,
    },
    convertEventString = (e, s) => {
      const n = ((e) => e.toLowerCase())(e)
      return Object.assign(
        Object.assign(
          {},
          ((e) => ({ eventType: 'play' === e || 'playbackstarted' === e ? ht.PLAY_START : ht.PLAY_END }))(n)
        ),
        buildObject$1('endReasonType', ((e, s) => (null != s ? s : Pt[e]))(n, s))
      )
    }
  class DeveloperToken {
    constructor(e) {
      if (((this.token = e), !e || !/^[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}/i.test(e)))
        throw new Error('Invalid token.')
      let [s, n] = e.split('.'),
        { exp: d, iss: h } = this._decode(n)
      if (((this.expiration = 1e3 * d), this.isExpired)) throw new Error('Initialized with an expired token.')
      this.teamId = h
      let { kid: p } = this._decode(s)
      this.keyId = p
    }
    get isExpired() {
      return this.expiration < Date.now()
    }
    _decode(e) {
      return JSON.parse(_(e))
    }
  }
  class GenericStorage {
    constructor(e = {}) {
      this.data = e
    }
    get data() {
      return this._data
    }
    set data(e) {
      this._data = e
    }
    get length() {
      return this.keys.length
    }
    get keys() {
      return Object.keys(this.data)
    }
    getItem(e) {
      return this.data[e] || null
    }
    setItem(e, s) {
      this.data[e] = s
    }
    removeItem(e) {
      delete this.data[e]
    }
    clear() {
      this.keys.forEach((e) => this.removeItem(e))
    }
    key(e) {
      return this.keys[e] || null
    }
  }
  function getCookie(e = '', s = document.cookie) {
    let n = s.match(new RegExp(`(?:^|;\\s*)${e}=([^;]*)`))
    if (n) return n[1]
  }
  function setCookie(e, s, n = '', d = 14, h, p) {
    const y = new Date()
    h = null != h ? h : window
    const m =
      (p = null != p ? p : /\./.test(h.location.hostname) ? h.location.hostname : '').length > 0 ? `domain=${p}; ` : ''
    y.setTime(y.getTime() + 24 * d * 60 * 60 * 1e3)
    let g = ''
    'https:' === h.location.protocol && (g = '; secure'),
      (h.document.cookie = `${e}=${s}; expires=${y.toUTCString()}; ${m}path=${n}${g}`)
  }
  function removeCookie(e, s, n) {
    setCookie(e, '', '/', 0, s, n)
  }
  const DEFAULT_CACHE_KEY_FUNCTION = (e, s) => `${s}${e}`
  class NetworkCache {
    constructor(e = {}) {
      ;(this.storage = e.storage || new GenericStorage()),
        (this.prefix = e.prefix || ''),
        (this.ttl = e.ttl || 3e5),
        (this.cacheKeyFunction = e.cacheKeyFunction || DEFAULT_CACHE_KEY_FUNCTION)
    }
    getItem(e) {
      const s = this.cacheKeyForPath(e),
        n = this.storage.getItem(s)
      if (null !== n) {
        const { x: e, d: d } = JSON.parse(n)
        if (e > Date.now()) return d
        this.storage.removeItem(s)
      }
    }
    setItem(e, s, n = this.ttl) {
      const d = this.cacheKeyForPath(e)
      this.storage.setItem(d, JSON.stringify({ x: Date.now() + n, d: s }))
    }
    removeItem(e) {
      const s = this.cacheKeyForPath(e)
      this.storage.removeItem(s)
    }
    removeItemsMatching(e, s = !0) {
      const n = this.cacheKeyForPath(e)
      this.removeItemsMatchingCacheKey(n, s)
    }
    clear() {
      this.removeItemsMatchingCacheKey(this.prefix, !1)
    }
    removeItemsMatchingCacheKey(e, s) {
      const n = new RegExp(`^${e}${s ? '$' : ''}`)
      ;(this.storage instanceof GenericStorage ? this.storage.keys : Object.keys(this.storage)).forEach((e) => {
        e && n.test(e) && this.storage.removeItem(e)
      })
    }
    cacheKeyForPath(e) {
      return this.cacheKeyFunction(e, this.prefix)
    }
  }
  var At
  !(function (e) {
    ;(e.JSON = 'application/json'), (e.FORM = 'application/x-www-form-urlencoded')
  })(At || (At = {}))
  Date.now()
  isNodeEnvironment$1()
  const formatByte = (e) => ('0' + (255 & e).toString(16)).slice(-2),
    toHexString = (e, s = 8) => {
      if (!(e instanceof Uint8Array)) return ''
      const n = Array.prototype.map.call(e, formatByte).join('')
      return 0 === s ? n : n.replace(new RegExp(`(.{1,${s}})`, 'g'), '$1 ').trim()
    },
    defaultCatalogId = ({ catalogId: e, container: s }) => e || (s && s.catalogId),
    defaultMediaType = (e) => {
      const { kind: s, mediaType: n } = e
      if ('number' == typeof n) return n
      const d = 'string' == typeof n ? n : s
      return d && /video/i.test(d) ? yt.VIDEO : yt.AUDIO
    },
    defaultPrevious = (e, s) => {
      const n = s
      if (!1 !== n && e.eventType === ht.PLAY_END && void 0 === s)
        throw new Error('Cannot build() for PLAY_END descriptors without previous descriptors')
      return n
    },
    defaultItemType = ({ itemType: e, kind: s, format: n }) =>
      'stream' === n ? pt.STREAM : isAUC$1(s) ? pt.ARTIST_UPLOADED_CONTENT : void 0 !== e ? e : pt.ITUNES_STORE_CONTENT,
    initialBuildData = (s, n, d, h) => {
      const p = ((e) => {
        if (void 0 === e) throw new Error('build() called without a play activity descriptor')
        return 'string' != typeof e.eventType
          ? e
          : Object.assign(Object.assign({}, e), convertEventString(e.eventType, e.endReasonType))
      })(n)
      let y = ((e, s, n) => ({
        catalogId: defaultCatalogId(e),
        cloudId: e.cloudId,
        containerChanged: !1,
        descriptor: e,
        endReasonType: e.endReasonType,
        isAlexa: n,
        itemType: defaultItemType(e),
        mediaType: defaultMediaType(e),
        previous: defaultPrevious(e, s),
      }))(p, d, h)
      const { eventType: m = ht.PLAY_START } = p,
        { ids: g, newState: _ } = ((s) => {
          const { descriptor: n } = s,
            d = {},
            h = Object.assign({}, s),
            { container: p, eventType: y = ht.PLAY_START, id: m, isLibrary: g, purchasedId: _, reporting: b = !0 } = n
          if ('-1' !== m && b)
            bt.test(m) || (p && 'radioStation' === p.kind)
              ? (d['radio-adam-id'] = parseInt(m.replace(bt, '$1'), 10))
              : isAUC$1(n.kind)
              ? (d['auc-adam-id'] = n.id)
              : g && h.catalogId
              ? ((d['subscription-adam-id'] = h.catalogId), void 0 !== m && '' !== m && (h.cloudId = m))
              : g || v(m)
              ? (h.cloudId = m)
              : (d['subscription-adam-id'] = m)
          else
            switch (y) {
              case ht.PLAY_END:
                ;(h.endReasonType = e.PlayActivityEndReasonType.NOT_APPLICABLE),
                  (h.itemType = pt.AGGREGATE_NON_CATALOG_PLAY_TIME)
                break
              case ht.PLAY_START:
                '-1' === m ? (h.itemType = pt.INVALID) : void 0 !== m && '' !== m && (h.cloudId = m)
            }
          return (
            void 0 !== h.cloudId && (d['cloud-id'] = h.cloudId),
            void 0 !== _ && (d['purchased-adam-id'] = _),
            Object.keys(d).length > 0 ? { ids: d, newState: h } : { newState: h, ids: void 0 }
          )
        })(y)
      ;(y = _),
        (y.containerChanged = (({ container: e }, { previous: s }) =>
          void 0 !== e &&
          (void 0 === e.type && void 0 !== e.kind && (e.type = e.kind),
          void 0 === s || !1 === s || void 0 === s.container || s.container.id !== e.id))(p, y))
      return {
        data: Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(
                Object.assign(
                  Object.assign(
                    Object.assign(
                      Object.assign({}, s),
                      (({ duration: e = 0, position: s = 0, timestamp: n, startPositionInMilliseconds: d }) => ({
                        'media-duration-in-milliseconds': Math.round(1e3 * e),
                        'milliseconds-since-play': void 0 !== n ? Date.now() - n : 0,
                        'start-position-in-milliseconds': d || Math.round(1e3 * s),
                      }))(y.descriptor)
                    ),
                    (({ playMode: e }) => {
                      var s, n, d
                      const h = invoke(e)
                      return void 0 === h
                        ? {}
                        : {
                            'play-mode': {
                              'auto-play-mode': null !== (s = h.autoplayMode) && void 0 !== s ? s : 0,
                              'repeat-play-mode': null !== (n = h.repeatPlayMode) && void 0 !== n ? n : 0,
                              'shuffle-play-mode': null !== (d = h.shufflePlayMode) && void 0 !== d ? d : 0,
                            },
                          }
                    })(y.descriptor)
                  ),
                  buildObject$1('guid', y.descriptor.guid)
                ),
                buildObject$1('ids', g)
              ),
              buildObject$1('reco-data', y.descriptor.recoData)
            ),
            buildObject$1('track-info', y.descriptor.trackInfo)
          ),
          { 'event-type': m, 'media-type': y.mediaType, type: y.itemType }
        ),
        state: y,
      }
    },
    typeByTimedMetadata = ({ state: e }) => {
      const {
        descriptor: { itemType: s },
      } = e
      return s === pt.TIMED_METADATA_PING ? s : pt.STREAM
    },
    byTimedMetadata = ({ data: e, state: s }) => {
      const {
        descriptor: { timedMetadata: n },
      } = s
      if (void 0 === n) return { data: e, state: s }
      if (
        !(({ state: e }) => {
          const {
            descriptor: { eventType: s, itemType: n },
          } = e
          return n === pt.TIMED_METADATA_PING || s !== ht.LYRIC_DISPLAY
        })({ data: e, state: s })
      )
        return { data: e, state: s }
      return {
        state: s,
        data: Object.assign(Object.assign({}, e), {
          type: typeByTimedMetadata({ data: e, state: s }),
          'timed-metadata': toHexString(n, 0),
        }),
      }
    },
    It = [],
    getBreadcrumbs = () => It.slice(0),
    clearBreadcrumbs = () => (It.length = 0),
    Breadcrumb = (e, s, n) => {
      if ('function' != typeof n.value) return n
      const d = n.value
      return Object.assign(Object.assign({}, n), {
        value(...e) {
          return (
            ((e, ...s) => {
              It.push({ methodName: e, args: JSON.stringify(s) })
            })(s, ...e),
            d.apply(this, e)
          )
        },
      })
    },
    buildPlayActivityData$1 = (e, s, n, d = !1) => {
      if (void 0 === s) throw new Error('called without a play activity descriptor')
      const h = ((e, ...s) => s.reduce((e, s) => s(e), e))(
        initialBuildData(e.generateBaseActivityData(), s, n, d),
        byEventType,
        buildDataFromContainer,
        byItemType,
        byTimedMetadata
      )
      return clearBreadcrumbs(), h
    }
  var wt
  !(function (e) {
    e[(e.ALEXA = 13)] = 'ALEXA'
  })(wt || (wt = {}))
  const createHelper = (e, s) => (n, d, h) => {
    const { helpers: p } = h.cache
    return e in p || (p[e] = s(n, d, h)), p[e]
  }
  const returnAsField =
      (e, s) =>
      (...n) =>
        (function (e, s) {
          if (void 0 !== s) return { [e]: s }
        })(e, s(...n)),
    createFieldFn = (e, s) => {
      const normalizeReturnValue = (s) => (null == s ? void 0 : { [e]: s })
      return (n, d, h) => {
        const { fields: p } = h.cache
        return (
          e in p || (h.cache.fields = Object.assign(Object.assign({}, p), { [e]: normalizeReturnValue(s(n, d, h)) })),
          h.cache.fields[e]
        )
      }
    },
    createClientFieldFn = (e, s) => createFieldFn(e, (e, n, { client: d }) => d[s]),
    Rt = createClientFieldFn('build-version', 'buildVersion'),
    Ot = ['play', 'playbackstarted'],
    Ct = createFieldFn('event-type', (e, s, n) => {
      const d = e.eventType
      if (void 0 === d) return ht.PLAY_START
      if (e.itemType === pt.TIMED_METADATA_PING && void 0 !== e.timedMetadata) return ht.PLAY_END
      if ('string' != typeof d) return null != d ? d : ht.PLAY_START
      const h = d.toLowerCase()
      return Ot.includes(h) ? ht.PLAY_START : ht.PLAY_END
    }),
    Mt = ['uploadedVideo', 'uploadedAudio', 'uploaded-videos', 'uploaded-audios'],
    Nt = createHelper('is-auc', ({ kind: e }) => void 0 !== e && Mt.includes(e)),
    Dt = createHelper(
      'should-send-timed-metadata',
      ({ endReasonType: s, eventType: n, itemType: d, timedMetadata: h }) =>
        void 0 !== h &&
        (d === pt.TIMED_METADATA_PING ||
          n === ht.PLAY_START ||
          s === e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED)
    ),
    Lt = createFieldFn('type', (e, s, n) => {
      var d
      const { id: h, reporting: p } = e
      if ('-1' === h || !p)
        switch (null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) {
          case ht.PLAY_END:
            return pt.AGGREGATE_NON_CATALOG_PLAY_TIME
          case ht.PLAY_START:
            if ('-1' === h) return pt.INVALID
        }
      const { format: y, itemType: m } = e
      return Dt(e, s, n)
        ? m === pt.TIMED_METADATA_PING
          ? m
          : pt.STREAM
        : 'stream' === y
        ? pt.STREAM
        : Nt(e, s, n)
        ? pt.ARTIST_UPLOADED_CONTENT
        : null != m
        ? m
        : pt.ITUNES_STORE_CONTENT
    }),
    xt = createFieldFn('container-type', (e, s, n) => {
      var d, h
      if ((null === (d = Lt(e, s, n)) || void 0 === d ? void 0 : d.type) === pt.AGGREGATE_NON_CATALOG_PLAY_TIME) return
      const { container: p } = e
      if (void 0 === p) return tt.UNKNOWN
      const y = null !== (h = p.type) && void 0 !== h ? h : p.kind
      if ('number' == typeof y) return y
      switch (y) {
        case 'album':
        case 'albums':
        case 'library-albums':
          return tt.ALBUM
        case 'artist':
        case 'artists':
        case 'library-artists':
          return tt.ARTIST
        case 'playlist':
        case 'playlists':
        case 'library-playlists':
          return tt.PLAYLIST
        case 'radio':
        case 'radioStation':
        case 'station':
        case 'stations':
          return tt.RADIO
        default:
          return tt.UNKNOWN
      }
    }),
    Ut = [
      returnAsField('album-adam-id', (e, s, n) => {
        var d
        if ((null === (d = xt(e, s, n)) || void 0 === d ? void 0 : d['container-type']) !== tt.ALBUM) return
        const { container: h } = e,
          p = null == h ? void 0 : h.id
        return void 0 === p || v(p) ? void 0 : p
      }),
      returnAsField('cloud-album-id', (e, s, n) => {
        var d
        if ((null === (d = xt(e, s, n)) || void 0 === d ? void 0 : d['container-type']) !== tt.ALBUM) return
        const { container: h } = e,
          p = null == h ? void 0 : h.id
        return void 0 !== p && v(p) ? p : void 0
      }),
      returnAsField('global-playlist-id', (e, s, n) => {
        var d, h
        if ((null === (d = xt(e, s, n)) || void 0 === d ? void 0 : d['container-type']) !== tt.PLAYLIST) return
        const { container: p } = e,
          y = null !== (h = null == p ? void 0 : p.catalogId) && void 0 !== h ? h : null == p ? void 0 : p.globalId
        return (null == p ? void 0 : p.isLibrary) && y ? y : v(null == p ? void 0 : p.id) || null == p ? void 0 : p.id
      }),
      returnAsField('playlist-version-hash', (e, s, n) => {
        var d
        if ((null === (d = xt(e, s, n)) || void 0 === d ? void 0 : d['container-type']) !== tt.PLAYLIST) return
        const { container: h } = e,
          p = null == h ? void 0 : h.versionHash
        return void 0 !== p && '' !== p ? p : void 0
      }),
      returnAsField('station-hash', (e, s, n) => {
        var d, h
        if ((null === (d = xt(e, s, n)) || void 0 === d ? void 0 : d['container-type']) !== tt.RADIO) return
        const p = null === (h = e.container) || void 0 === h ? void 0 : h.stationHash
        return void 0 !== p && '' !== p ? p : void 0
      }),
      returnAsField('station-id', (e, s, n) => {
        var d, h
        if ((null === (d = xt(e, s, n)) || void 0 === d ? void 0 : d['container-type']) === tt.RADIO)
          return null === (h = e.container) || void 0 === h ? void 0 : h.id
      }),
      returnAsField('station-personalized-id', (e, s, n) => {
        var d, h
        if ((null === (d = xt(e, s, n)) || void 0 === d ? void 0 : d['container-type']) !== tt.RADIO) return
        const p = null === (h = e.container) || void 0 === h ? void 0 : h.id
        return void 0 !== p && Tt.test(p) ? parseInt(p.replace(Tt, '$1'), 10) : void 0
      }),
      returnAsField('universal-library-id', (e, s, n) => {
        var d, h
        if ((null === (d = xt(e, s, n)) || void 0 === d ? void 0 : d['container-type']) !== tt.PLAYLIST) return
        const { container: p } = e,
          y = null !== (h = null == p ? void 0 : p.catalogId) && void 0 !== h ? h : null == p ? void 0 : p.globalId,
          m = null == p ? void 0 : p.id
        if (void 0 !== m)
          if ((null == p ? void 0 : p.isLibrary) && y) {
            if ('' !== m) return m
          } else if (v(m)) return m
      }),
    ],
    $t = createFieldFn('container-ids', (e, s, n) => {
      var d
      if ((null === (d = Lt(e, s, n)) || void 0 === d ? void 0 : d.type) === pt.AGGREGATE_NON_CATALOG_PLAY_TIME) return
      const h = Ut.reduce((d, h) => Object.assign(Object.assign({}, d), h(e, s, n)), Object.create(null))
      return isEmpty(h) ? void 0 : h
    }),
    Bt = createClientFieldFn('developer-token', 'accessToken'),
    Ft = createClientFieldFn('device-name', 'deviceName'),
    jt = createHelper(
      'initial-start-position-in-milliseconds',
      ({ position: e = 0, startPositionInMilliseconds: s }) => s || Math.round(1e3 * e)
    ),
    Kt = createFieldFn('end-position-in-milliseconds', (e, s, n) => {
      var d
      switch (null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) {
        case ht.LYRIC_DISPLAY:
          return e.duration
        case ht.PLAY_START:
          return
        default:
          if (s && void 0 === s.position) return
          return e.endPositionInMilliseconds || jt(e, s, n)
      }
    }),
    Vt = createHelper('is-private', ({ id: e, reporting: s }) => '-1' === e || !s),
    Yt = e.PlayActivityEndReasonType,
    Ht = {
      exit: Yt.EXITED_APPLICATION,
      next: Yt.TRACK_SKIPPED_FORWARDS,
      pause: Yt.PLAYBACK_MANUALLY_PAUSED,
      playbackfinished: Yt.NATURAL_END_OF_TRACK,
      playbackstopped: Yt.PLAYBACK_MANUALLY_PAUSED,
      previous: Yt.TRACK_SKIPPED_BACKWARDS,
      scrub_begin: Yt.SCRUB_BEGIN,
      scrub_end: Yt.SCRUB_END,
      stop: Yt.NATURAL_END_OF_TRACK,
    },
    Wt = createFieldFn('end-reason-type', (s, n, d) => {
      var h
      const { eventType: p, endReasonType: y, timedMetadata: m } = s
      if (n && void 0 === n.position) return
      if ((null === (h = Lt(s, n, d)) || void 0 === h ? void 0 : h.type) === pt.TIMED_METADATA_PING && void 0 !== m)
        return e.PlayActivityEndReasonType.NOT_APPLICABLE
      if (Vt(s, n, d) && p === ht.PLAY_END) return e.PlayActivityEndReasonType.NOT_APPLICABLE
      if (void 0 !== y || 'string' != typeof p) return y
      const g = p.toLowerCase()
      return Ht[g]
    }),
    { CONTAINER_CHANGED: Gt, NOT_SPECIFIED: zt } = ut,
    qt = createFieldFn('event-reason-hint-type', (e, s, n) => {
      var d, h
      if ((null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) !== ht.PLAY_START) return
      const p = e.container
      return void 0 === p
        ? zt
        : !1 === s
        ? n.isAlexa
          ? zt
          : Gt
        : (null === (h = null == s ? void 0 : s.container) || void 0 === h ? void 0 : h.id) !== p.id
        ? Gt
        : zt
    }),
    Qt = createFieldFn('feature-name', (e, s, n) => {
      var d, h, p, y
      if ((null === (d = Lt(e, s, n)) || void 0 === d ? void 0 : d.type) === pt.AGGREGATE_NON_CATALOG_PLAY_TIME) return
      if ((null === (h = Ct(e, s, n)) || void 0 === h ? void 0 : h['event-type']) === ht.LYRIC_DISPLAY)
        return 'now_playing'
      const m =
        null !== (y = null === (p = e.container) || void 0 === p ? void 0 : p.name) && void 0 !== y ? y : et.MUSICKIT
      return 'string' == typeof m ? m : '' + m
    }),
    Xt = createClientFieldFn('guid', 'guid'),
    Jt = createHelper('should-have-auc-adam-id', Nt),
    Zt = createHelper(
      'should-have-radio-adam-id',
      ({ id: e, container: s }) => bt.test(e) || 'radioStation' === (null == s ? void 0 : s.kind)
    ),
    ei = createHelper('is-library-item-or-library-type', ({ id: e, isLibrary: s }, n, d) => s || v(e)),
    ti = createHelper('catalog-id', ({ catalogId: e, container: s }) =>
      null != e ? e : null == s ? void 0 : s.catalogId
    ),
    ii = createHelper('is-library-item-with-catalog-id', (e, s, n) => e.isLibrary && !!ti(e, s, n)),
    ri = [
      returnAsField('auc-adam-id', (e, s, n) => {
        var d
        if (
          (null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) !== ht.LYRIC_DISPLAY &&
          !Vt(e, s, n) &&
          !Zt(e, s, n)
        )
          return Jt(e, s, n) ? e.id : void 0
      }),
      returnAsField('cloud-id', (e, s, n) => {
        var d, h
        if ((null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) === ht.LYRIC_DISPLAY)
          return e.cloudId
        const { id: p } = e,
          y = void 0 !== p && '' !== p
        return Vt(e, s, n) &&
          (null === (h = Ct(e, s, n)) || void 0 === h ? void 0 : h['event-type']) === ht.PLAY_START &&
          y &&
          '-1' !== p
          ? p
          : Zt(e, s, n) || Jt(e, s, n)
          ? e.cloudId
          : (ii(e, s, n) && y) || ei(e, s, n)
          ? p
          : e.cloudId
      }),
      returnAsField('lyric-id', (e, s, n) => {
        var d, h
        if ((null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) === ht.LYRIC_DISPLAY)
          return null === (h = e.lyricDescriptor) || void 0 === h ? void 0 : h.id
      }),
      returnAsField('purchased-adam-id', (e, s, n) => {
        var d
        if ((null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) !== ht.LYRIC_DISPLAY)
          return e.purchasedId
      }),
      returnAsField('radio-adam-id', (e, s, n) => {
        var d
        if ((null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) === ht.LYRIC_DISPLAY || Vt(e, s, n))
          return
        const { id: h } = e
        return bt.test(h) ? parseInt(h.replace(bt, '$1'), 10) : void 0
      }),
      returnAsField('subscription-adam-id', (e, s, n) => {
        var d
        if (
          !(
            (null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) === ht.LYRIC_DISPLAY ||
            Vt(e, s, n) ||
            Zt(e, s, n) ||
            Jt(e, s, n)
          )
        ) {
          if (ii(e, s, n)) return ti(e, s, n)
          if (!ei(e, s, n)) return e.id
        }
      }),
    ],
    si = createFieldFn('ids', (e, s, n) => {
      var d
      if ((null === (d = Lt(e, s, n)) || void 0 === d ? void 0 : d.type) === pt.AGGREGATE_NON_CATALOG_PLAY_TIME) return
      const h = ri.reduce((d, h) => Object.assign(Object.assign({}, d), h(e, s, n)), Object.create(null))
      return isEmpty(h) ? void 0 : h
    }),
    ni = createClientFieldFn('internal-build', 'internalBuild'),
    ai = createHelper('has-episode-streaming-kind', ({ streamingKind: e }, s, n) => e === ft.EPISODE),
    oi = createHelper('is-stream', (e, s, n) => {
      var d
      return (null === (d = Lt(e, s, n)) || void 0 === d ? void 0 : d.type) === pt.STREAM
    }),
    di = createHelper('is-live-stream', (e, s, n) => oi(e, s, n) && !ai(e, s, n)),
    li = createFieldFn('media-duration-in-milliseconds', (e, s, n) => {
      var d, h, p
      const y = null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']
      if (y === ht.LYRIC_DISPLAY) return 0
      if (di(e, s, n)) return 0
      const m = 1e3 * e.duration
      if (y === ht.PLAY_START) return m
      const g =
        null !== (h = e.startPositionInMilliseconds) && void 0 !== h
          ? h
          : Math.round(1e3 * (null !== (p = e.position) && void 0 !== p ? p : 0))
      return g > 1e3 * e.duration ? g : m
    }),
    { AUDIO: ci, VIDEO: ui } = yt,
    hi = createFieldFn('media-type', (e, s, n) => {
      var d
      if ((null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) === ht.LYRIC_DISPLAY) return ci
      const { kind: h, mediaType: p } = e
      if ('number' == typeof p) return p
      const y = 'string' == typeof p ? p : h
      return y && /video/i.test(y) ? ui : ci
    }),
    pi = createClientFieldFn('metrics-client-id', 'metricsClientId'),
    yi = createFieldFn('milliseconds-since-play', ({ timestamp: e }, s, n) => (void 0 === e ? 0 : Date.now() - e)),
    mi = createFieldFn('offline', () => !1),
    gi = createFieldFn('persistent-id', () => generateUUID()),
    fi = createFieldFn('play-mode', (e, s, n) => {
      var d, h, p, y, m, g, v, _
      if (
        (null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) === ht.LYRIC_DISPLAY ||
        (null === (h = Lt(e, s, n)) || void 0 === h ? void 0 : h.type) === pt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return {
          'auto-play-mode': null !== (p = fi.autoplayMode) && void 0 !== p ? p : 0,
          'repeat-play-mode': null !== (y = fi.repeatPlayMode) && void 0 !== y ? y : 0,
          'shuffle-play-mode': null !== (m = fi.shufflePlayMode) && void 0 !== m ? m : 0,
        }
      const b = invoke(e.playMode)
      return void 0 !== b
        ? {
            'auto-play-mode': null !== (g = b.autoplayMode) && void 0 !== g ? g : 0,
            'repeat-play-mode': null !== (v = b.repeatPlayMode) && void 0 !== v ? v : 0,
            'shuffle-play-mode': null !== (_ = b.shufflePlayMode) && void 0 !== _ ? _ : 0,
          }
        : void 0
    }),
    vi = createClientFieldFn('private-enabled', 'privateEnabled'),
    _i = createFieldFn('reco-data', (e, s, n) => {
      var d, h
      if (
        (null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']) !== ht.LYRIC_DISPLAY &&
        (null === (h = Lt(e, s, n)) || void 0 === h ? void 0 : h.type) !== pt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return e.recoData
    }),
    bi = createClientFieldFn('sb-enabled', 'userIsSubscribed'),
    Ti = createClientFieldFn('siri-initiated', 'siriInitiated'),
    Ei = createClientFieldFn('source-type', 'sourceType'),
    Si = createFieldFn('start-position-in-milliseconds', (e, s, n) => {
      var d, h, p, y
      const m = null === (d = Ct(e, s, n)) || void 0 === d ? void 0 : d['event-type']
      return m === ht.LYRIC_DISPLAY ||
        (null === (h = Lt(e, s, n)) || void 0 === h ? void 0 : h.type) === pt.AGGREGATE_NON_CATALOG_PLAY_TIME ||
        di(e, s, n)
        ? 0
        : m === ht.PLAY_START
        ? jt(e, s, n)
        : null !== (y = null !== (p = e.startPositionInMilliseconds) && void 0 !== p ? p : previousPosition(s)) &&
          void 0 !== y
        ? y
        : 0
    }),
    previousPosition = (e) => (e && void 0 !== e.position ? Math.round(1e3 * e.position) : 0),
    ki = createClientFieldFn('store-front', 'storefrontId'),
    Pi = createFieldFn('timed-metadata', (e, s, n) => {
      const d = e.timedMetadata
      if (void 0 !== d && shouldSendTimedMetadata(e, s, n)) return toHexString(d, 0)
    }),
    shouldSendTimedMetadata = (e, s, n) => {
      var d, h
      return (
        (null === (d = Lt(e, s, n)) || void 0 === d ? void 0 : d.type) === pt.TIMED_METADATA_PING ||
        (null === (h = Ct(e, s, n)) || void 0 === h ? void 0 : h['event-type']) !== ht.LYRIC_DISPLAY
      )
    },
    Ai = createClientFieldFn('user-agent', 'userAgent'),
    Ii = createFieldFn('user-token', (e, s, { client: n }) => {
      if (!n.preferDSID) return n.musicUserToken
    }),
    wi = createFieldFn('utc-offset-in-seconds', (e, s, n) => {
      var d
      return (null === (d = Lt(e, s, n)) || void 0 === d ? void 0 : d.type) === pt.AGGREGATE_NON_CATALOG_PLAY_TIME
        ? 0
        : n.client.utcOffsetInSeconds
    }),
    Ri = {
      'build-version': Rt,
      'container-ids': $t,
      'container-type': xt,
      'developer-token': Bt,
      'device-name': Ft,
      'end-position-in-milliseconds': Kt,
      'end-reason-type': Wt,
      'event-reason-hint-type': qt,
      'event-type': Ct,
      'feature-name': Qt,
      guid: Xt,
      ids: si,
      'internal-build': ni,
      'media-duration-in-milliseconds': li,
      'media-type': hi,
      'metrics-client-id': pi,
      'milliseconds-since-play': yi,
      offline: mi,
      'persistent-id': gi,
      'play-mode': fi,
      'private-enabled': vi,
      'reco-data': _i,
      'sb-enabled': bi,
      'siri-initiated': Ti,
      'source-type': Ei,
      'start-position-in-milliseconds': Si,
      'store-front': ki,
      'timed-metadata': Pi,
      type: Lt,
      'user-agent': Ai,
      'user-token': Ii,
      'utc-offset-in-seconds': wi,
    }
  let Oi = 0
  const buildPlayActivityData = (e, s, n, d = !1) => {
      if (void 0 === s) throw new Error('called without a play activity descriptor')
      const h = ((e, ...s) =>
        Object.assign(Object.assign(Object.assign({}, e), Object.assign({}, ...s)), {
          cache: {
            fields: Object.assign(
              {},
              ...s.map((e) => {
                var s
                return null === (s = null == e ? void 0 : e.cache) || void 0 === s ? void 0 : s.fields
              })
            ),
            helpers: Object.assign(
              {},
              ...s.map((e) => {
                var s
                return null === (s = null == e ? void 0 : e.cache) || void 0 === s ? void 0 : s.helpers
              })
            ),
          },
        }))(
        'boolean' == typeof d
          ? ((e = {}, s) => Object.assign({ id: (Oi++).toFixed(0), client: s, isAlexa: !1 }, e))({ isAlexa: d }, e)
          : Object.assign(Object.assign({}, d), { client: e })
      )
      Object.assign(
        s,
        ((e) => {
          var s, n
          return {
            eventType: null !== (s = e.eventType) && void 0 !== s ? s : ht.PLAY_START,
            reporting: null === (n = e.reporting) || void 0 === n || n,
          }
        })(s)
      )
      const p = {
        state: {},
        data: Object.assign(
          {},
          Object.assign(Object.create(null), ...Object.values(Ri).map((e) => (null == e ? void 0 : e(s, n, h))))
        ),
      }
      return clearBreadcrumbs(), p
    },
    compareValue = (e, s) =>
      !!Object.is(e, s) ||
      ('object' == typeof e &&
        null !== e &&
        'object' == typeof s &&
        null !== s &&
        ((e, s) => {
          const n = Object.keys(e)
          return n.length === Object.keys(s).length && n.every((n) => compareValue(e[n], s[n]))
        })(e, s)),
    Ci = ['persistent-id', 'milliseconds-since-play'],
    Mi = [],
    report = (e, s) => {
      console.group('PAF differences report'),
        ((e) => {
          console.group('PAF stacktrace'),
            e.forEach(({ methodName: e, args: s }) => {
              console.log(e, s)
            }),
            console.groupEnd()
        })(s),
        ((e) => {
          console.group(`Differences (${e.length})`),
            e.forEach((e) => {
              var { type: s } = e,
                n = __rest(e, ['type'])
              console.log(s, n)
            }),
            console.groupEnd()
        })(e),
        console.groupEnd()
    },
    reportIfNeeded = (e, s, n) => {
      const d = ((e, s, n = []) => {
        const d = []
        return (
          [...Object.keys(e), ...n].forEach((n) => {
            const h = n in e,
              p = n in s
            h && p
              ? compareValue(e[n], s[n]) ||
                Ci.includes(n) ||
                d.push({
                  field: n,
                  type: 'field-does-not-match',
                  original: JSON.stringify(e[n]),
                  experimental: JSON.stringify(s[n]),
                })
              : h && !p
              ? d.push({ field: n, type: 'field-should-appear', original: JSON.stringify(e[n]) })
              : !h && p && d.push({ field: n, type: 'field-should-not-appear', experimental: JSON.stringify(s[n]) })
          }),
          d
        )
      })(e, s)
      if (0 !== d.length) {
        report(d, n)
        const e = generateCopyableReport(d, n)
        console.log(`PAF report failed. Run \`copyPafReport(${e})\` and open new radar with its content.`)
      }
    },
    diffToString = (e) => {
      switch (e.type) {
        case 'field-should-appear':
          return `Field ${e.field} should be present in the new system with value "${e.original}"`
        case 'field-should-not-appear':
          return `Field ${e.field} should not be present in the new system (currently present with value "${e.experimental}")`
        case 'field-does-not-match':
          return `Field ${e.field} has different values in the system. Value in old system: "${e.original}", value in new system "${e.experimental}"`
      }
    },
    diffToMiniString = (e) => {
      switch (e.type) {
        case 'field-should-appear':
          return '-' + e.field
        case 'field-should-not-appear':
          return '+' + e.field
        case 'field-does-not-match':
          return '!' + e.field
      }
    },
    generateCopyableReport = (e, s) =>
      Mi.push(
        `\n  Title: [PAF Refactor] ${e.map(diffToMiniString).join(', ')}\n\n  Some issues found:\n  ${e
          .map(diffToString)
          .join('\n')}\n\n  Stacktrace:\n  ${s.map((e) => `${e.methodName}(${e.args})`).join('\n')}\n  `
      ) - 1
  'undefined' != typeof window &&
    (window.copyPafReport = (e) => {
      e < Mi.length && copy(Mi[e])
    })
  const createCookieJar = (e) => {
      switch ((void 0 === e && (e = 'browser'), e)) {
        case 'browser':
          return { get: getCookie, set: setCookie }
        case 'memory':
          return ((e = {}) => ({
            get(s) {
              if (void 0 !== s) return e[s]
            },
            set(s, n) {
              e[s] = n
            },
          }))()
        default:
          return e
      }
    },
    empty = (e, s) => write(e, s, [], '/', 0),
    read = (e, s) => {
      const n = e.get(s)
      if (void 0 === n || '' === n) return []
      return ensureArray(JSON.parse(atob(n)))
    },
    write = (e, s, n, d, h, p) => e.set(s, btoa(JSON.stringify(n)), d, h, p),
    { AUTO: Ni } = mt
  class PlayActivityBatchableSender {
    constructor(e, s) {
      ;(this.sender = e), (this.jar = s), (this.mode = Ni)
    }
    flush() {
      return __awaiter$2(this, void 0, void 0, function* () {
        const e = read(this.jar, 'amupaee')
        if (void 0 !== e && 0 !== e.length)
          try {
            yield this.sender.send(e), empty(this.jar, 'amupaee')
          } catch ({ message: s }) {
            throw new Error('flush: ' + s)
          }
      })
    }
    send(s) {
      return __awaiter$2(this, void 0, void 0, function* () {
        if (
          this.mode === Ni &&
          (Array.isArray(s) || s['end-reason-type'] !== e.PlayActivityEndReasonType.EXITED_APPLICATION)
        )
          return this.sender.send(s)
        var n, d, h, p, y, m
        ;(n = this.jar), (h = s), (p = '/'), write(n, (d = 'amupaee'), [...read(n, d), h], p, y, m)
      })
    }
  }
  class Timeline {
    constructor() {
      ;(this._events = {}), (this._keys = [])
    }
    get events() {
      return this._events
    }
    get first() {
      return this.at(0)
    }
    get keys() {
      return this._keys
    }
    get last() {
      return this.at(this.length - 1)
    }
    get length() {
      return this._keys.length
    }
    get second() {
      return this.at(1)
    }
    at(e) {
      if (e > this.length - 1) throw new Error('Invalid timeline index')
      const s = this._keys[e]
      return this._events[s]
    }
    before(e) {
      if ('number' != typeof e) {
        const s = []
        for (const e in this._events) this._events.hasOwnProperty(e) && s.push(this._events[e])
        e = this._keys[s.indexOf(e)]
      }
      const s = this._keys.indexOf(e)
      if (-1 === s) throw new Error('Key not found')
      if (s > 0) return this._events[this._keys[s - 1]]
    }
    drain() {
      const e = this._keys.map((e) => this._events[e])
      return this.reset(), e
    }
    reset() {
      ;(this._events = {}), (this._keys = [])
    }
    pop() {
      return __awaiter$2(this, void 0, void 0, function* () {
        const e = this._keys.pop()
        if (void 0 === e) return Promise.reject('TIMELINE IS EMPTY')
        const s = this._events[e]
        return delete this._events[e], Promise.resolve(s)
      })
    }
    add(e, s) {
      return __awaiter$2(this, void 0, void 0, function* () {
        return this.push(e, s)
      })
    }
    push(e, s = Date.now()) {
      return __awaiter$2(this, void 0, void 0, function* () {
        for (; -1 !== this._keys.indexOf(s); ) s++
        return (this._events[s] = e), this._keys.push(s), Promise.resolve(s)
      })
    }
    shift() {
      return __awaiter$2(this, void 0, void 0, function* () {
        const e = this._keys.shift()
        if (void 0 === e) return Promise.reject('TIMELINE IS EMPTY')
        const s = this._events[e]
        return delete this._events[e], Promise.resolve(s)
      })
    }
    unshift(e, s = Date.now()) {
      return __awaiter$2(this, void 0, void 0, function* () {
        for (; -1 !== this._keys.indexOf(s); ) s++
        return (this._events[s] = e), this._keys.unshift(s), Promise.resolve(s)
      })
    }
  }
  const Di = new Logger$1()
  class TimedMetadataTracker {
    constructor(e, s) {
      ;(this.client = e), (this._currentValue = s)
    }
    get currentValue() {
      return this._currentValue
    }
    clear() {
      this._currentValue = void 0
    }
    ping(e, s) {
      return __awaiter$2(this, void 0, void 0, function* () {
        this.timedMetadataChanged(e) &&
          (void 0 !== this._currentValue && (yield this.client.pingTimedMetadata(s, this._currentValue)),
          (this._currentValue = void 0 === e ? void 0 : e.slice(0)))
      })
    }
    timedMetadataChanged(e) {
      const { _currentValue: s } = this
      return void 0 === s ? void 0 !== e : void 0 === e || e.length !== s.length || s.some((s, n) => s !== e[n])
    }
  }
  const fieldGetter = (e, s) => (n) => s in n ? n[s] : n[e],
    Li = fieldGetter('eventType', 'event-type'),
    xi = fieldGetter('endReasonType', 'end-reason-type'),
    Ui = fieldGetter('itemType', 'type'),
    createMPAFMachine = () =>
      (function (e, s) {
        void 0 === s && (s = {})
        var n = t(
            f(
              r(e.states[e.initial].entry).map(function (e) {
                return i(e, s.actions)
              }),
              e.context,
              _t
            ),
            2
          ),
          d = n[0],
          h = n[1],
          p = {
            config: e,
            _options: s,
            initialState: { value: e.initial, actions: d, context: h, matches: a(e.initial) },
            transition: function (s, n) {
              var d,
                h,
                y = 'string' == typeof s ? { value: s, context: e.context } : s,
                m = y.value,
                g = y.context,
                v = u(n),
                _ = e.states[m]
              if (_.on) {
                var b = r(_.on[v.type])
                try {
                  for (
                    var T = (function (e) {
                        var s = 'function' == typeof Symbol && Symbol.iterator,
                          n = s && e[s],
                          d = 0
                        if (n) return n.call(e)
                        if (e && 'number' == typeof e.length)
                          return {
                            next: function () {
                              return e && d >= e.length && (e = void 0), { value: e && e[d++], done: !e }
                            },
                          }
                        throw new TypeError(s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.')
                      })(b),
                      E = T.next();
                    !E.done;
                    E = T.next()
                  ) {
                    var S = E.value
                    if (void 0 === S) return c(m, g)
                    var k = 'string' == typeof S ? { target: S } : S,
                      P = k.target,
                      A = k.actions,
                      I = void 0 === A ? [] : A,
                      w = k.cond,
                      R =
                        void 0 === w
                          ? function () {
                              return !0
                            }
                          : w,
                      O = void 0 === P,
                      C = null != P ? P : m,
                      M = e.states[C]
                    if (R(g, v)) {
                      var N = t(
                          f(
                            (O
                              ? r(I)
                              : [].concat(_.exit, I, M.entry).filter(function (e) {
                                  return e
                                })
                            ).map(function (e) {
                              return i(e, p._options.actions)
                            }),
                            g,
                            v
                          ),
                          3
                        ),
                        D = N[0],
                        L = N[1],
                        x = N[2],
                        U = null != P ? P : m
                      return { value: U, context: L, actions: D, changed: P !== m || D.length > 0 || x, matches: a(U) }
                    }
                  }
                } catch (t) {
                  d = { error: t }
                } finally {
                  try {
                    E && !E.done && (h = T.return) && h.call(T)
                  } finally {
                    if (d) throw d.error
                  }
                }
              }
              return c(m, g)
            },
          }
        return p
      })(
        {
          id: 'mpaf',
          initial: 'idle',
          context: {},
          states: {
            error: {},
            idle: {
              on: {
                play: 'playing',
                scrubBegin: {
                  target: 'scrubbing',
                  actions: o((e) => Object.assign(Object.assign({}, e), { stateBeforeScrub: 'idle' })),
                },
                scrubEnd: { target: 'error', actions: ['clearStateBeforeScrub', 'setScrubEndError'] },
              },
            },
            playing: {
              on: {
                scrubBegin: {
                  target: 'scrubbing',
                  actions: o((e) => Object.assign(Object.assign({}, e), { stateBeforeScrub: 'playing' })),
                },
                stop: 'idle',
                scrubEnd: { target: 'error', actions: ['clearStateBeforeScrub', 'setScrubEndError'] },
              },
            },
            scrubbing: {
              on: {
                scrubEnd: [
                  {
                    target: 'idle',
                    cond: ({ stateBeforeScrub: e }) => 'idle' === e,
                    actions: ['clearStateBeforeScrub'],
                  },
                  { target: 'playing', actions: ['clearStateBeforeScrub'] },
                ],
              },
            },
          },
        },
        {
          actions: {
            clearStateBeforeScrub: o((e) => __rest(e, ['stateBeforeScrub'])),
            setScrubEndError: o((e) =>
              Object.assign(Object.assign({}, e), {
                errorMessage:
                  'The scrub() method was called with the SCRUB_END action without a previous SCRUB_START descriptor',
              })
            ),
          },
        }
      )
  class MPAFStateMachine {
    constructor() {
      ;(this.machine = createMPAFMachine()),
        (this.machineService = (function (e) {
          var s = e.initialState,
            n = vt.NotStarted,
            d = new Set(),
            h = {
              _machine: e,
              send: function (h) {
                n === vt.Running &&
                  ((s = e.transition(s, h)),
                  l(s, u(h)),
                  d.forEach(function (e) {
                    return e(s)
                  }))
              },
              subscribe: function (e) {
                return (
                  d.add(e),
                  e(s),
                  {
                    unsubscribe: function () {
                      return d.delete(e)
                    },
                  }
                )
              },
              start: function (d) {
                if (d) {
                  var p = 'object' == typeof d ? d : { context: e.config.context, value: d }
                  s = { value: p.value, actions: [], context: p.context, matches: a(p.value) }
                }
                return (n = vt.Running), l(s, _t), h
              },
              stop: function () {
                return (n = vt.Stopped), d.clear(), h
              },
              get state() {
                return s
              },
              get status() {
                return n
              },
            }
          return h
        })(this.machine).start())
    }
    canSendEvent(e) {
      var s
      return null !== (s = this.machine.transition(this.machineService.state, e).changed) && void 0 !== s && s
    }
    matches(e) {
      return this.machineService.state.matches(e)
    }
    send(s) {
      const n = ((s) => {
        const n = Li(s),
          d = xi(s)
        if (Ui(s) === pt.TIMED_METADATA_PING) return !1
        switch (n) {
          case ht.PLAY_START:
            return 'play'
          case ht.PLAY_END:
            switch (d) {
              case e.PlayActivityEndReasonType.SCRUB_BEGIN:
                return 'scrubBegin'
              case e.PlayActivityEndReasonType.SCRUB_END:
                return 'scrubEnd'
              case e.PlayActivityEndReasonType.EXITED_APPLICATION:
              case e.PlayActivityEndReasonType.NOT_APPLICABLE:
                return !1
              default:
                return 'stop'
            }
          default:
            return 'stop'
        }
      })(s)
      if (!1 !== n && (this.canSendEvent({ type: n }) && this.machineService.send({ type: n }), this.matches('error')))
        throw new Error(this.machineService.state.context.errorMessage)
    }
  }
  const $i = (() => {
    var e
    if ('undefined' == typeof localStorage) return 'old'
    return 'transition' ===
      (null === (e = localStorage.getItem('mk-paf-system')) || void 0 === e ? void 0 : e.toLocaleLowerCase())
      ? 'transition'
      : 'old'
  })()
  class StatelessPlayActivity extends class {
    constructor(e, s, n, d) {
      var h, p, y
      ;(this._accessToken = e),
        (this._musicUserToken = s),
        (this.storefrontId = n),
        (this.privateEnabled = !1),
        (this.siriInitiated = !1),
        (this.clientId = 'JSCLIENT'),
        (this.eventType = 'JSPLAY'),
        (this.internalBuild = !1),
        (this.preferDSID = !1),
        (this.sourceType = gt.MUSICKIT),
        (this._utcOffset = new Date().getTimezoneOffset()),
        (this._userIsSubscribed = !0),
        d &&
          ((this._appInfo = d.app),
          (this._navigator = d.navigator),
          (this._userAgent = d.userAgent),
          d.hasOwnProperty('utcOffset') && isNaN(d.utcOffset)
            ? (this._utcOffsetInSeconds = -1)
            : d.hasOwnProperty('utcOffset') && (this._utcOffset = d.utcOffset),
          (this.clientId = d.clientId || 'JSCLIENT'),
          (this._deviceName = d.deviceName),
          (this.guid = d.guid),
          (this.metricsClientId = d.metricsClientId),
          (this.preferDSID = null !== (h = d.preferDSID) && void 0 !== h && h),
          (this.sourceType = d.sourceType && 'number' == typeof d.sourceType ? d.sourceType : gt.MUSICKIT),
          (this._userIsSubscribed = null === (p = d.userIsSubscribed) || void 0 === p || p)),
        (this.buildVersion = ((e, s, n, d) => [fullAppId(e, s), os(d), model(n), build(s)].join(' '))(
          this._appId,
          this._appInfo,
          this.navigator,
          this.userAgent
        )),
        (this.sender = new PlayActivitySender({
          accessToken: this._accessToken,
          clientId: this.clientId,
          eventType: this.eventType,
          fetch: null == d ? void 0 : d.fetch,
          fetchOptions: null == d ? void 0 : d.fetchOptions,
          headersClass: null === (y = null == d ? void 0 : d.fetch) || void 0 === y ? void 0 : y.Headers,
          isQA: null == d ? void 0 : d.isQA,
          logInfo: null == d ? void 0 : d.logInfo,
          musicUserToken: this._musicUserToken,
          preferDSID: this.preferDSID,
          sourceType: this.sourceType,
          traceTag: null == d ? void 0 : d.traceTag,
        }))
    }
    get accessToken() {
      return invoke(this._accessToken)
    }
    get appID() {
      return void 0 === this._appId && (this._appId = fullAppId(this._appId, this._appInfo)), this._appId
    }
    get deviceName() {
      return this._deviceName
    }
    get musicUserToken() {
      return invoke(this._musicUserToken)
    }
    get navigator() {
      var e
      return null !== (e = this._navigator) && void 0 !== e ? e : 'undefined' == typeof navigator ? Et : navigator
    }
    get userAgent() {
      var e
      return null !== (e = this._userAgent) && void 0 !== e ? e : this.navigator.userAgent
    }
    get userIsSubscribed() {
      return invoke(this._userIsSubscribed)
    }
    get utcOffsetInSeconds() {
      if (void 0 === this._utcOffsetInSeconds && void 0 !== this._utcOffset && !isNaN(this._utcOffset)) {
        const e = 60 * this._utcOffset
        this._utcOffsetInSeconds = e <= 0 ? Math.abs(e) : -e
      }
      return void 0 === this._utcOffsetInSeconds || isNaN(this._utcOffsetInSeconds) ? -1 : this._utcOffsetInSeconds
    }
    send(e) {
      return __awaiter$2(this, void 0, void 0, function* () {
        return this.sender.send(e)
      })
    }
    buildDescriptorForPlayParams(e, s, n, d, h) {
      const p = 'stream' === e.format ? pt.STREAM : pt.ITUNES_STORE_CONTENT
      return Object.assign(
        Object.assign(Object.assign({}, e), { container: n, duration: null != d ? d : 0, eventType: s, itemType: p }),
        h
      )
    }
    buildForPlayParams(e, s, n, d = 0, h = {}, p = !1) {
      return this.build(this.buildDescriptorForPlayParams(e, s, n, d, h), p)
    }
    generateBaseActivityData() {
      return Object.assign(
        Object.assign(
          Object.assign(
            Object.assign(
              {
                'build-version': this.buildVersion,
                'container-type': tt.UNKNOWN,
                'developer-token': this.accessToken,
                'internal-build': this.internalBuild,
                offline: !1,
                'persistent-id': generateUUID(),
                'private-enabled': this.privateEnabled,
                'sb-enabled': this.userIsSubscribed,
                'siri-initiated': this.siriInitiated,
                'source-type': this.sourceType,
                'store-front': this.storefrontId,
                'user-agent': this.userAgent,
                'utc-offset-in-seconds': this.utcOffsetInSeconds,
              },
              conditionalObject(!this.preferDSID, 'user-token', this.musicUserToken)
            ),
            buildObject$1('device-name', this._deviceName)
          ),
          buildObject$1('guid', this.guid)
        ),
        buildObject$1('metrics-client-id', this.metricsClientId)
      )
    }
  } {
    constructor(e, s, n, d) {
      var h
      super(e, s, n, d), (this.system = null !== (h = null == d ? void 0 : d.builderSystem) && void 0 !== h ? h : $i)
    }
    build(e, s) {
      switch (this.system) {
        case 'old':
          return buildPlayActivityData$1(this, e, s, 'JSCLIENT' !== this.clientId).data
        case 'new':
          return buildPlayActivityData(this, e, s, 'JSCLIENT' !== this.clientId).data
        case 'transition':
          return ((e, s, n, d = !1) => {
            const h = getBreadcrumbs()
            clearBreadcrumbs()
            const p = buildPlayActivityData$1(e, s, n, d),
              y = buildPlayActivityData(e, s, n, d)
            return (
              setTimeout(() => {
                reportIfNeeded(p.data, y.data, h)
              }, 0),
              p
            )
          })(this, e, s, 'JSCLIENT' !== this.clientId).data
      }
    }
  }
  class PlayActivity$1 {
    constructor(e, s, n, d) {
      ;(this.timeline = new Timeline()),
        (this._paf = new StatelessPlayActivity(e, s, n, d)),
        (this._cookieJar = createCookieJar(null == d ? void 0 : d.cookieJar)),
        (this.sender = new PlayActivityBatchableSender(this._paf.sender, this._cookieJar)),
        (this._machine = new MPAFStateMachine()),
        (this._timedMetadataTracker = new TimedMetadataTracker(this))
    }
    get mode() {
      return this.sender.mode
    }
    set mode(e) {
      this.sender.mode = e
    }
    get privateEnabled() {
      return this._paf.privateEnabled
    }
    set privateEnabled(e) {
      this._paf.privateEnabled = e
    }
    get timedMetadata() {
      return this._timedMetadataTracker.currentValue
    }
    clearTimedMetadata() {
      return this._timedMetadataTracker.clear()
    }
    setTimedMetadata(e, s) {
      return this._timedMetadataTracker.ping(e, s)
    }
    activate(s = !1) {
      return __awaiter$2(this, void 0, void 0, function* () {
        if (s)
          try {
            yield this.flush()
          } catch (d) {
            if (
              !((e) =>
                ((e) => {
                  switch (typeof e) {
                    case 'string':
                      return e
                    case 'object':
                      return e.message ? ('string' != typeof e.message ? '' : e.message) : ''
                    default:
                      return ''
                  }
                })(e).includes('send() called without any data'))(d)
            )
              throw d
          }
        const n = this.timeline.last
        if (n && n.endReasonType === e.PlayActivityEndReasonType.EXITED_APPLICATION) return this.timeline.pop()
      })
    }
    exit(s = 0) {
      return __awaiter$2(this, void 0, void 0, function* () {
        return this.stop(s, e.PlayActivityEndReasonType.EXITED_APPLICATION)
      })
    }
    pause(s = 0) {
      return __awaiter$2(this, void 0, void 0, function* () {
        return this.stop(s, e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED)
      })
    }
    pingTimedMetadata(s, n, d = this._previousDescriptor()) {
      return __awaiter$2(this, void 0, void 0, function* () {
        yield this._addToTimeline(
          Object.assign(Object.assign({}, d), {
            position: s,
            endReasonType: e.PlayActivityEndReasonType.NOT_APPLICABLE,
            eventType: ht.PLAY_END,
            itemType: pt.TIMED_METADATA_PING,
            timedMetadata: n,
          })
        )
      })
    }
    play(e, s = 0) {
      return __awaiter$2(this, void 0, void 0, function* () {
        const n = this.timeline.length > 0
        if (void 0 === e) {
          if (!n) return
          const e = this._previousDescriptor()
          e.eventType === ht.PLAY_END && delete e.endReasonType
          const s = Object.assign(Object.assign({}, this.sanitizePreviousDescriptor(e)), { eventType: ht.PLAY_START })
          return this._addToTimeline(s)
        }
        if (n) {
          const e = this._previousDescriptor()
          if (
            this._machine.matches('playing') &&
            !(({ id: e, reporting: s = !0, eventType: n }) => ('-1' === e || !s) && n === ht.PLAY_END)(e)
          )
            return Promise.reject(new Error('The play() method was called without a previous stop() or pause() call.'))
        }
        const d = Object.assign(Object.assign({}, e), { eventType: ht.PLAY_START, position: s })
        return this._addToTimeline(d)
      })
    }
    scrub(s = 0, n = e.PlayActivityEndReasonType.SCRUB_BEGIN) {
      return __awaiter$2(this, void 0, void 0, function* () {
        const e = this._previousDescriptor(),
          d = Object.assign(Object.assign({}, this.sanitizePreviousDescriptor(e)), {
            eventType: ht.PLAY_END,
            endReasonType: n,
            position: s,
          })
        return this._addToTimeline(d)
      })
    }
    skip(s, n = e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS, d = 0) {
      return __awaiter$2(this, void 0, void 0, function* () {
        return yield this.stop(d, n), this.play(s)
      })
    }
    stop(s = 0, n = e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK) {
      return __awaiter$2(this, void 0, void 0, function* () {
        let d = this._previousDescriptor()
        if (
          (d.endReasonType === e.PlayActivityEndReasonType.EXITED_APPLICATION &&
            (yield this.timeline.pop(), empty(this._cookieJar, 'amupaee'), (d = this._previousDescriptor())),
          this._machine.matches('playing'))
        ) {
          const e = Object.assign(Object.assign({}, this.sanitizePreviousDescriptor(d)), {
            eventType: ht.PLAY_END,
            endReasonType: n,
            position: s,
            timedMetadata: this._timedMetadataTracker.currentValue,
          })
          return this._addToTimeline(e)
        }
        return Promise.reject(new Error('A play stop() method was called without a previous play() descriptor'))
      })
    }
    build(e, s) {
      if (
        (void 0 === e &&
          void 0 === s &&
          Di.warn(
            'You are calling build() from a stateful PAF client. Please, use a stateless client or exit(), pause(), play(), scrub(), skip() or stop() instead.'
          ),
        void 0 === e)
      ) {
        if (0 === this.timeline.length) throw new Error('build() called without a play activity descriptor')
        e = this.timeline.last
      }
      if (void 0 === s) {
        if (void 0 === (s = this.timeline.before(e)) && e.eventType === ht.PLAY_END)
          throw new Error('Cannot build() for PLAY_END descriptors without previous descriptors')
        s = null != s && s
      }
      return this._paf.build(Object.assign(Object.assign({}, e), { timedMetadata: this.timedMetadata }), s)
    }
    addForPlayParams(e, s, n, d = 0, h = {}) {
      const p = this.buildDescriptorForPlayParams(e, s, n, d, h)
      return this._addToTimeline(p)
    }
    buildDescriptorForPlayParams(e, s, n, d = 0, h = {}) {
      const p = 'stream' === e.format ? pt.STREAM : pt.ITUNES_STORE_CONTENT
      return Object.assign(
        Object.assign(Object.assign({}, e), { container: n, duration: d, eventType: s, itemType: p }),
        h
      )
    }
    flush() {
      return this.sender.flush()
    }
    _addToTimeline(e) {
      return __awaiter$2(this, void 0, void 0, function* () {
        const s = Object.assign(Object.assign({}, e), { timestamp: Date.now() }),
          n = this.timeline.length > 0 && this.timeline.last
        yield this.timeline.add(s)
        const d = this.build(s, n)
        yield this.send(d)
      })
    }
    _previousDescriptor() {
      const e = this.timeline.last
      if (void 0 === e) throw new Error('A method was called without a previous descriptor')
      return exceptFields(e, 'timestamp')
    }
    buildForPlayParams(e, s, n, d = 0, h = {}, p = !1) {
      return (
        Di.warn(
          'You are using buildsForPlayParams from a stateful PlayActivity. Please, use StatelessPlayActivity instead'
        ),
        this._paf.buildForPlayParams(e, s, n, d, h, p)
      )
    }
    send(e) {
      const s = ensureArray(e)
      return s.forEach((e) => this._machine.send(e)), this.sender.send(s)
    }
    sanitizePreviousDescriptor(e) {
      let s = (function deepClone(e) {
        if ('object' != typeof e || null === e) throw new TypeError('Source is not an Object')
        let s = Array.isArray(e) ? [] : {}
        for (let n in e)
          V.call(e, n) && ('object' == typeof e[n] && null !== e[n] ? (s[n] = deepClone(e[n])) : (s[n] = e[n]))
        return s
      })(e)
      return s.itemType === pt.TIMED_METADATA_PING && (s = exceptFields(s, 'itemType')), s
    }
  }
  __decorate$1(
    [
      Breadcrumb,
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', [Object]),
      __metadata$1('design:returntype', Promise),
    ],
    PlayActivity$1.prototype,
    'exit',
    null
  ),
    __decorate$1(
      [
        Breadcrumb,
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object]),
        __metadata$1('design:returntype', Promise),
      ],
      PlayActivity$1.prototype,
      'pause',
      null
    ),
    __decorate$1(
      [
        Breadcrumb,
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Number, Uint8Array, Object]),
        __metadata$1('design:returntype', Promise),
      ],
      PlayActivity$1.prototype,
      'pingTimedMetadata',
      null
    ),
    __decorate$1(
      [
        Breadcrumb,
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Object]),
        __metadata$1('design:returntype', Promise),
      ],
      PlayActivity$1.prototype,
      'play',
      null
    ),
    __decorate$1(
      [
        Breadcrumb,
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Number]),
        __metadata$1('design:returntype', Promise),
      ],
      PlayActivity$1.prototype,
      'scrub',
      null
    ),
    __decorate$1(
      [
        Breadcrumb,
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Number, Object]),
        __metadata$1('design:returntype', Promise),
      ],
      PlayActivity$1.prototype,
      'skip',
      null
    ),
    __decorate$1(
      [
        Breadcrumb,
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Number]),
        __metadata$1('design:returntype', Promise),
      ],
      PlayActivity$1.prototype,
      'stop',
      null
    ),
    __decorate$1(
      [
        Breadcrumb,
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Object]),
        __metadata$1('design:returntype', Object),
      ],
      PlayActivity$1.prototype,
      'build',
      null
    ),
    __decorate$1(
      [
        Breadcrumb,
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, String, Object, Object, Object]),
        __metadata$1('design:returntype', Promise),
      ],
      PlayActivity$1.prototype,
      'addForPlayParams',
      null
    ),
    __decorate$1(
      [
        Breadcrumb,
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, String, Object, Object, Object]),
        __metadata$1('design:returntype', Object),
      ],
      PlayActivity$1.prototype,
      'buildDescriptorForPlayParams',
      null
    ),
    __decorate$1(
      [
        Breadcrumb,
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, String, Object, Object, Object, Object]),
        __metadata$1('design:returntype', void 0),
      ],
      PlayActivity$1.prototype,
      'buildForPlayParams',
      null
    ),
    (e.version = '2.2136.9')
  const Bi = e.version.split('.')
  Bi[0]
  const Fi = Bi[Bi.length - 1]
  ;(Bi[0] = '3'), (Bi[Bi.length - 1] = Fi + '-prerelease'), (e.version = Bi.join('.'))
  const Bind = () => (e, s, n) => {
    if (void 0 === n || 'function' != typeof n.value)
      throw new TypeError(`Only methods can be decorated with @Bind, but ${s} is not a method.`)
    return {
      configurable: !0,
      get() {
        const e = n.value.bind(this)
        return Object.defineProperty(this, s, { value: e, configurable: !0, writable: !0 }), e
      },
    }
  }
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */ function __metadata(e, s) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata) return Reflect.metadata(e, s)
  }
  function __awaiter$1(e, s, n, d) {
    return new (n || (n = Promise))(function (h, p) {
      function fulfilled(e) {
        try {
          step(d.next(e))
        } catch (_t) {
          p(_t)
        }
      }
      function rejected(e) {
        try {
          step(d.throw(e))
        } catch (_t) {
          p(_t)
        }
      }
      function step(e) {
        e.done
          ? h(e.value)
          : new n(function (s) {
              s(e.value)
            }).then(fulfilled, rejected)
      }
      step((d = d.apply(e, s || [])).next())
    })
  }
  const ji = new RegExp(
      '^https://([a-z0-9]+-)?' +
        ('js-cdn.music.apple.com' + '/musickit/v3/'.replace(/v3/, '(v2|v3)')).replace(/[\.\/]/g, '\\$&'),
      'i'
    ),
    Ki = /^([a-z]+:)?\/\//
  function findScript(e) {
    return isNodeEnvironment$1() || !e ? null : document.querySelector(`script[src*="${e}"]`)
  }
  function determineCdnBasePrefix() {
    for (const e of 'undefined' != typeof document && document.querySelectorAll
      ? Array.from(document.querySelectorAll('script[src]'))
      : []) {
      const s = ji.exec(e.src)
      if (s) return s[1] || ''
    }
    return ''
  }
  function determineCdnBaseHost() {
    if (isNodeEnvironment$1()) return ''
    return `//${determineCdnBasePrefix()}js-cdn.music.apple.com`
  }
  function getHlsJsCdnConfig() {
    const e = { hls: '', rtc: '' }
    if (isNodeEnvironment$1()) return e
    const s = determineCdnBaseHost()
    let n = '2.15.20'
    return (
      'undefined' != typeof localStorage && (n = localStorage.getItem('mk-hlsjs-version') || n),
      (e.hls = `https:${s}/hls.js/${n}/hls.js/hls.js`),
      (e.rtc = `https:${s}/hls.js/${n}/rtc.js/rtc.min.js`),
      e
    )
  }
  function cdnBaseURL(e, s = window) {
    if (isNodeEnvironment$1()) return ''
    if (s.localStorage.mkCDNBaseURLOverride) return s.localStorage.mkCDNBaseURLOverride
    const n = findScript(e)
    return n ? n.getAttribute('src').replace(new RegExp(e + '$'), '') : determineCdnBaseHost() + '/musickit/v3/'
  }
  function loadScript(e, s) {
    return new Promise((n, d) => {
      isNodeEnvironment$1() && d('Dynamic script loading is unsupported in Node environments.')
      if (findScript(e)) return n()
      const h = document.createElement('script')
      let p
      if (
        (s &&
          Object.keys(s).forEach((e) => {
            h.setAttribute(e, s[e])
          }),
        (h.onload = () => {
          n()
        }),
        (h.onerror = (e) => {
          d(e)
        }),
        Ki.test(e))
      )
        p = e
      else {
        p = `${cdnBaseURL(e)}${e}`
      }
      ;(h.src = p), document.head.appendChild(h)
    })
  }
  const Vi = new Logger$1('sk-debug')
  class AuthBridgeApp extends class {
    constructor() {
      this._targetOrigin = '*'
    }
    init(e, s) {
      var n
      ;(this._receiveWindow = e),
        (this._sendWindow = s),
        (this.handleMessage = this.handleMessage.bind(this)),
        null === (n = this._receiveWindow) || void 0 === n || n.addEventListener('message', this.handleMessage)
    }
    sendMessage(e, s) {
      const n = { action: 'mediakit:' + e, data: s }
      this._sendWindow && this._sendWindow.postMessage(JSON.stringify(n), this._targetOrigin)
    }
    handleMessage(e) {
      if (!this._isOriginAllowed(e.origin)) return
      let s
      try {
        s = JSON.parse(e.data)
      } catch (_t) {}
      if (!s || !this._isNamespacedData(s)) return
      '*' === this._targetOrigin && (this._targetOrigin = e.origin), Vi.debug('auth-bridge: handleMessage', s)
      const n = s.action.replace('mediakit:', '')
      this[n] ? this[n](s.data) : Vi.debug('auth-bridge: unsupported method', n)
    }
    _isOriginAllowed(e) {
      if (!e) return !1
      const [s, n] = e.split('://')
      let d = ''
      return n && (d = n.split(':')[0]), 'https' === s && !!d && d.endsWith('.apple.com')
    }
    _isNamespacedData(e) {
      return e.action && -1 !== e.action.indexOf('mediakit:')
    }
  } {
    constructor() {
      super(),
        (this.whenFrameInited = new Promise((e) => (this._frameInitResolve = e))),
        (this.whenAuthCompleted = new Promise((e) => (this._authUpdateResolve = e))),
        (this.frame = document.createElement('iframe')),
        (this.frame.src = this._getIframeSrc()),
        (this.frame.style.display = 'none'),
        document.body.appendChild(this.frame),
        this.init(window, this.frame.contentWindow)
    }
    requestAuthUpdate() {
      this.whenFrameInited.then(() => this.sendMessage('requestAuthUpdate'))
    }
    setCookieItem(e, s) {
      this.whenFrameInited.then(() => this.sendMessage('setCookieItem', { name: e, value: s }))
    }
    clearAuth() {
      this.whenFrameInited.then(() => this.sendMessage('clearAuth'))
    }
    frameInit() {
      var e
      null === (e = this._frameInitResolve) || void 0 === e || e.call(this), this.requestAuthUpdate()
    }
    updateAuth(e) {
      if ((null == e ? void 0 : e.enabled) && (null == e ? void 0 : e.cookies)) {
        const s = e.cookies
        Object.keys(s).forEach((e) => {
          var n
          const d = null !== (n = s[e]) && void 0 !== n ? n : ''
          d ? setCookie(e, d, '/', 7) : removeCookie(e)
        })
      }
      this._authUpdateResolve && (this._authUpdateResolve(), (this._authUpdateResolve = void 0))
    }
    authClearedFromOtherFrame() {
      Vi.warn("Override auth-bridge/app's authClearedFromOtherFrame to trigger app-specific sign out behavior")
    }
    _getIframeSrc() {
      let e = determineCdnBasePrefix()
      return e && (e = '?env=' + e.substring(0, e.length - 1)), 'https://mediaauth.apple.com/auth-bridge/' + e
    }
  }
  const Yi = new Set([]),
    Hi = /\.apple\.com$/
  function getCommerceHostname(e, s) {
    !s && 'undefined' != typeof location && location.hostname && (s = location)
    let n = e + '.itunes.apple.com'
    if (!s) return n
    const d = (function (e) {
      if (!e || !Hi.test(e)) return
      const s = e.split('.')
      let n = s[s.length - 3]
      const d = n
      if (n && n.includes('-')) {
        const e = n.split('-')
        n = e[e.length - 1]
      }
      return Yi.has(n) ? d : void 0
    })(s.hostname)
    return d && (n = `${e}.${d}.apple.com`), n
  }
  var Wi
  function buildQueryParams(e = { app: Wi.APP, p: Wi.P }) {
    return (
      void 0 === e.app && (e.app = Wi.APP),
      void 0 === e.p && (e.p = Wi.P),
      Object.keys(e)
        .map((s) => `${encodeURIComponent(s)}=${encodeURIComponent(e[s])}`)
        .join('&')
    )
  }
  !(function (e) {
    ;(e.APP = 'music'), (e.P = 'subscribe')
  })(Wi || (Wi = {}))
  const Gi = { 2: 'com.apple.onboarding.tvapp', 0: 'com.apple.onboarding.applemusic' },
    zi = { 2: 'pltvcid', 0: 'pldfltcid' }
  var qi
  !(function (e) {
    ;(e[(e.ParseError = -32700)] = 'ParseError'),
      (e[(e.InvalidRequest = -32600)] = 'InvalidRequest'),
      (e[(e.MethodNotFound = -32601)] = 'MethodNotFound'),
      (e[(e.InvalidParams = -32602)] = 'InvalidParams'),
      (e[(e.InternalError = -32603)] = 'InternalError')
  })(qi || (qi = {}))
  class Dispatch {
    constructor(e = {}) {
      ;(this._registry = {}),
        (this._sequence = 0),
        (this.handle = (e) => {
          e.data &&
            '2.0' === e.data.jsonrpc &&
            (('*' !== this.origin && this.origin !== e.origin) ||
              (e.data.method && this.destination
                ? this.handleRequest(e.data).then((e) => {
                    this.send(this.destination, e)
                  })
                : (e.data.hasOwnProperty('result') || e.data.error) && this.handleResponse(e.data)))
        }),
        (this.destination = e.destination),
        (this.methods = e.methods || {}),
        (this.origin = e.origin || '*'),
        e.source && (this.source = e.source)
    }
    get source() {
      return this._source
    }
    set source(e) {
      if (!e && this._source)
        return this._source.removeEventListener('message', this.handle), void (this._source = void 0)
      e.addEventListener('message', this.handle), (this._source = e)
    }
    apply(e, s) {
      if (!this.destination) throw new Error('No destination')
      let n = this._sequence++,
        d = new Promise((e, s) => {
          this._registry[n] = { resolve: e, reject: s }
        })
      return this.send(this.destination, { jsonrpc: '2.0', id: n, method: e, params: s }), d
    }
    call(e, ...s) {
      return this.apply(e, s)
    }
    handleRequest(e) {
      return __awaiter$3(this, void 0, void 0, function* () {
        let s = { jsonrpc: '2.0', id: e.id },
          n = this.methods[e.method]
        if (!n) return Object.assign(s, { error: { code: qi.MethodNotFound, message: 'Method not found' } })
        try {
          let d = yield n.apply(null, ensureArray(e.params))
          return Object.assign(s, { result: d })
        } catch (B) {
          return Object.assign(s, { error: { code: B.code || qi.InternalError, message: B.message } })
        }
      })
    }
    handleResponse(e) {
      let s = this._registry[e.id]
      delete this._registry[e.id], s && (e.error ? s.reject(Object.assign(Error(), e.error)) : s.resolve(e.result))
    }
    send(e, s) {
      e.postMessage(s, e.window === e ? this.origin : void 0)
    }
  }
  var Qi
  function validateToken(e) {
    var s
    if ('string' != typeof e) return !1
    const n = e.match(/[a-zA-Z0-9=\/+]{32,}==$/)
    return null !== (s = n && n.length > 0) && void 0 !== s && s
  }
  !(function (e) {
    ;(e[(e.UNAVAILABLE = -1)] = 'UNAVAILABLE'),
      (e[(e.NOT_DETERMINED = 0)] = 'NOT_DETERMINED'),
      (e[(e.DENIED = 1)] = 'DENIED'),
      (e[(e.RESTRICTED = 2)] = 'RESTRICTED'),
      (e[(e.AUTHORIZED = 3)] = 'AUTHORIZED')
  })(Qi || (Qi = {}))
  const Xi = `https://${getCommerceHostname('buy')}/commerce/account/authenticateMusicKitRequest`,
    Ji = 'https://authorize.music.apple.com',
    Zi = /^https?:\/\/(.+\.)*(apple\.com|apps\.mzstatic\.com)(\/[\w\d]+)*$/
  var er, tr, ir, rr
  !(function (e) {
    ;(e[(e.AUTHORIZE = 0)] = 'AUTHORIZE'), (e[(e.SUBSCRIBE = 1)] = 'SUBSCRIBE')
  })(er || (er = {}))
  class ServiceSetupView {
    constructor(e, s = {}) {
      var n
      ;(this.developerToken = e),
        (this.authenticateMethod = 'GET'),
        (this.target = 'apple-music-service-view'),
        (this.deeplinkParameters = (s && s.deeplinkParameters) || {}),
        (this.iconURL = s && s.iconURL),
        (this.authenticateMethod = (s && s.authenticateMethod) || 'GET'),
        this.isServiceView &&
          window.opener !== window &&
          (this.dispatch = new Dispatch({
            destination: null !== (n = window.opener) && void 0 !== n ? n : void 0,
            origin: '*',
            source: window,
          }))
    }
    get isServiceView() {
      return (
        /(authorize\.(.+\.)*apple\.com)/i.test(window.location.hostname) ||
        (window && window.name === this.target) ||
        !1
      )
    }
    focus() {
      this._window && window.focus && this._window.focus()
    }
    load(e = { action: er.AUTHORIZE }) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return e.action === er.SUBSCRIBE ? this._subscribeAction(e.parameters) : this._authorizeAction(e.parameters)
      })
    }
    present(e = '', s) {
      const { height: n, left: d, top: h, width: p } = this._calculateClientDimensions(),
        y = { height: 650, menubar: 'no', resizable: 'no', scrollbars: 'no', status: 'no', toolbar: 'no', width: 650 },
        m = Object.assign(
          Object.assign(Object.assign({}, y), { left: p / 2 - y.width / 2 + d, top: n / 2 - y.height / 2 + h }),
          s
        ),
        g = Object.keys(m)
          .map((e) => `${e}=${m[e]}`)
          .join(',')
      return (
        /trident|msie/i.test(navigator.userAgent)
          ? ((this._window = window.open(window.location.href, this.target, g) || void 0),
            (this._window.location.href = e))
          : (this._window = window.open(e, this.target, g) || void 0),
        /\bedge\b/i.test(navigator.userAgent) && (this._window.opener = self),
        this.focus(),
        this._window
      )
    }
    _authorizeAction(e = {}) {
      var s
      return __awaiter$1(this, void 0, void 0, function* () {
        let n, d
        const h = (null === (s = window.location) || void 0 === s ? void 0 : s.href) || ''
        return (
          'GET' === this.authenticateMethod
            ? (d = `${Ji}/woa?${buildQueryParams(
                Object.assign(Object.assign({}, this.deeplinkParameters), {
                  a: btoa(this._thirdPartyInfo()),
                  referrer: h,
                })
              )}`)
            : ((n = this._buildFormElement(Xi)), document.body.appendChild(n)),
          new Promise((s, h) => {
            const p = this.present(d)
            ;(this.dispatch = new Dispatch({
              methods: {
                authorize(e, n, d) {
                  validateToken(e) ? s({ restricted: n && '1' === n, userToken: e, cid: d }) : h(Qi.NOT_DETERMINED)
                },
                close() {},
                decline() {
                  h(Qi.DENIED)
                },
                switchUserId() {
                  h(Qi.NOT_DETERMINED)
                },
                thirdPartyInfo: () =>
                  this._thirdPartyInfo(
                    this.developerToken,
                    Object.assign(Object.assign({}, this.deeplinkParameters), e)
                  ),
                unavailable() {
                  h(Qi.UNAVAILABLE)
                },
              },
              origin: Ji,
              source: window,
              destination: p,
            })),
              n && n.submit()
          })
        )
      })
    }
    _buildFormElement(e, s = this.target, n = this.developerToken) {
      const d = document.createElement('form')
      d.setAttribute('method', 'post'),
        d.setAttribute('action', e),
        d.setAttribute('target', s),
        (d.style.display = 'none')
      const h = document.createElement('input')
      h.setAttribute('name', 'jwtToken'), h.setAttribute('value', n), d.appendChild(h)
      const p = document.createElement('input')
      p.setAttribute('name', 'isWebPlayer'), p.setAttribute('value', 'true'), d.appendChild(p)
      const y = document.createElement('input')
      return y.setAttribute('name', 'LogoURL'), y.setAttribute('value', ''), d.appendChild(y), d
    }
    _calculateClientDimensions(e = window) {
      return {
        height: e.innerHeight
          ? e.innerHeight
          : document.documentElement.clientHeight
          ? document.documentElement.clientHeight
          : screen.height,
        left: e.screenLeft ? e.screenLeft : screen.availLeft || screen.left,
        top: e.screenTop ? e.screenTop : screen.availTop || screen.top,
        width: e.innerWidth
          ? e.innerWidth
          : document.documentElement.clientWidth
          ? document.documentElement.clientWidth
          : screen.width,
      }
    }
    _subscribeAction(e = {}) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return (
          Object.assign(e, this.deeplinkParameters),
          new Promise((s, n) => {
            const d = 'https://authorize.music.apple.com/upsell?' + buildQueryParams(e)
            this.present(d),
              window.addEventListener('message', ({ data: e, origin: d, source: h }) => {
                const { closeWindow: p, launchClient: y } = 'string' == typeof e ? JSON.parse(e) : e
                ;(d && !Zi.test(d)) ||
                  (y
                    ? 0 === y.supported
                      ? n('Unable to subscribe on this platform.')
                      : s(y)
                    : n('Subscribe action error.'))
              })
          })
        )
      })
    }
    _thirdPartyInfo(e = this.developerToken, s) {
      var n
      let d = this.iconURL
      const h = window.location.host || document.referrer,
        p = [
          ...[].slice.call(document.querySelectorAll('link[rel="apple-music-app-icon"]')),
          ...[].slice.call(document.querySelectorAll('link[rel="apple-touch-icon-precomposed"]')),
          ...[].slice.call(document.querySelectorAll('link[rel="apple-touch-icon"]')),
        ]
      if (p && p[0] && p[0].href) {
        const e = p.find((e) => !!e.sizes && '120x120' === e.sizes.value)
        d = null !== (n = null == e ? void 0 : e.href) && void 0 !== n ? n : p[0].href
      }
      return JSON.stringify({ thirdPartyIconURL: d, thirdPartyName: h, thirdPartyParameters: s, thirdPartyToken: e })
    }
  }
  !(function (e) {
    ;(e.ID = 'us'), (e.LANGUAGE_TAG = 'en-gb')
  })(tr || (tr = {}))
  !(function (e) {
    ;(e.DEFAULT_CID = 'pldfltcid'),
      (e.TV_CID = 'pltvcid'),
      (e.RESTRICTIONS_ENABLED = 'itre'),
      (e.STOREFRONT_COUNTRY_CODE = 'itua'),
      (e.USER_TOKEN = 'media-user-token')
  })(ir || (ir = {})),
    (function (e) {
      ;(e.authorizationStatusDidChange = 'authorizationStatusDidChange'),
        (e.authorizationStatusWillChange = 'authorizationStatusWillChange'),
        (e.eligibleForSubscribeView = 'eligibleForSubscribeView'),
        (e.storefrontCountryCodeDidChange = 'storefrontCountryCodeDidChange'),
        (e.storefrontIdentifierDidChange = 'storefrontIdentifierDidChange'),
        (e.userTokenDidChange = 'userTokenDidChange')
    })(rr || (rr = {})),
    ir.DEFAULT_CID
  const sr = 'https://' + getCommerceHostname('buy'),
    nr = `https://${getCommerceHostname('play')}/WebObjects/MZPlay.woa/wa`
  class StoreKit extends Notifications {
    constructor(e, s) {
      super([
        rr.authorizationStatusDidChange,
        rr.authorizationStatusWillChange,
        rr.eligibleForSubscribeView,
        rr.storefrontCountryCodeDidChange,
        rr.userTokenDidChange,
        rr.storefrontIdentifierDidChange,
      ]),
        (this.developerToken = e),
        (this.apiBase = 'https://api.music.apple.com/v1'),
        (this.iTunesBuyBase = sr),
        (this.persist = 'localstorage'),
        (this.playBase = nr),
        (this.prefix = 'music'),
        (this.realm = 0),
        (this.storage = window.localStorage),
        (this._authorizationStatus = Qi.NOT_DETERMINED),
        (this._dispatchedSubscribeView = !1),
        (this._me = null),
        (this._cids = {}),
        (this._dynamicUserToken = getCookie(ir.USER_TOKEN)),
        s &&
          (s.apiBase && (this.apiBase = s.apiBase),
          s.deeplink && (this.deeplinkParameters = s.deeplink),
          s.persist && (this.persist = s.persist),
          s.prefix && (this.prefix = s.prefix),
          void 0 !== s.realm && (this.realm = s.realm),
          (this.bundleId = Gi[this.realm])),
        (this.cidNamespace = zi[this.realm]),
        (this._developerToken = new DeveloperToken(e)),
        (this._serviceSetupView = new ServiceSetupView(e, {
          authenticateMethod: s && s.authenticateMethod,
          iconURL: s && s.iconURL,
          deeplinkParameters: this.deeplinkParameters,
        })),
        (this.storagePrefix = `${this.prefix}.${this._developerToken.teamId}`.toLocaleLowerCase())
      const n = this._getStorageItem(ir.USER_TOKEN)
      ;(this.userToken = n || void 0),
        this.developerToken && this.userTokenIsValid && (this._restrictedEnabled = this.restrictedEnabled),
        (this._storefrontCountryCode = this.storefrontCountryCode),
        (this.whenAuthCompleted = Promise.resolve()),
        isNodeEnvironment$1() ||
          (this._processLocationHash(window.location.hash),
          'cookie' !== this.persist ||
            (null == s ? void 0 : s.disableAuthBridge) ||
            ((this.authBridgeApp = new AuthBridgeApp()),
            (this.authBridgeApp.authClearedFromOtherFrame = this.revokeUserToken.bind(this)),
            (this.whenAuthCompleted = this.authBridgeApp.whenAuthCompleted.then(() => {
              this.userToken = this._getStorageItem(ir.USER_TOKEN) || void 0
            }))))
    }
    get authorizationStatus() {
      return this._authorizationStatus
    }
    set authorizationStatus(e) {
      this._authorizationStatus !== e &&
        (this._getIsActiveSubscription.updateCache(void 0),
        this.dispatchEvent(rr.authorizationStatusWillChange, {
          authorizationStatus: this._authorizationStatus,
          newAuthorizationStatus: e,
        }),
        (this._authorizationStatus = e),
        this.dispatchEvent(rr.authorizationStatusDidChange, { authorizationStatus: e }))
    }
    get cid() {
      if (!this._cids[this.cidNamespace]) {
        const e = this._getStorageItem(this.cidNamespace)
        this._cids[this.cidNamespace] = e || void 0
      }
      return this._cids[this.cidNamespace]
    }
    set cid(e) {
      e ? this._setStorageItem(this.cidNamespace, e) : this._removeStorageItem(this.cidNamespace),
        (this._cids[this.cidNamespace] = e)
    }
    eligibleForSubscribeView() {
      return __awaiter$1(this, void 0, void 0, function* () {
        const e = yield this.hasMusicSubscription()
        return (!this.hasAuthorized || (this.hasAuthorized && !e)) && !this._dispatchedSubscribeView
      })
    }
    get hasAuthorized() {
      return this.authorizationStatus > Qi.DENIED
    }
    get logoutURL() {
      return this.playBase + '/webPlayerLogout'
    }
    get _pldfltcid() {
      return this._cids[ir.DEFAULT_CID]
    }
    set _pldfltcid(e) {
      this._cids[ir.DEFAULT_CID] = e
    }
    get restrictedEnabled() {
      if (this.userToken && 'boolean' != typeof this._restrictedEnabled) {
        const e = this._getStorageItem(ir.RESTRICTIONS_ENABLED)
        if (e) this._restrictedEnabled = '0' !== e
        else if (this._storefrontCountryCode) {
          const e = ['br', 'ch', 'gt', 'hu', 'id', 'in', 'it', 'kr', 'la', 'lt', 'my', 'ru', 'sg', 'tr']
          this._restrictedEnabled = -1 !== e.indexOf(this._storefrontCountryCode) || void 0
        }
      }
      return this._restrictedEnabled
    }
    set restrictedEnabled(e) {
      this.userToken && void 0 !== e && this._setStorageItem(ir.RESTRICTIONS_ENABLED, e ? '1' : '0'),
        (this._restrictedEnabled = e),
        e && (this.authorizationStatus = Qi.RESTRICTED)
    }
    get storefrontCountryCode() {
      if (!this._storefrontCountryCode) {
        const e = this._getStorageItem(ir.STOREFRONT_COUNTRY_CODE)
        this._storefrontCountryCode = (null == e ? void 0 : e.toLowerCase()) || tr.ID
      }
      return this._storefrontCountryCode
    }
    set storefrontCountryCode(e) {
      e && this.userToken
        ? this._setStorageItem(ir.STOREFRONT_COUNTRY_CODE, e)
        : this._removeStorageItem(ir.STOREFRONT_COUNTRY_CODE),
        (this._storefrontCountryCode = e),
        this.dispatchEvent(rr.storefrontCountryCodeDidChange, { storefrontCountryCode: e })
    }
    get storefrontIdentifier() {
      return this._storefrontIdentifier
    }
    set storefrontIdentifier(e) {
      ;(this._storefrontIdentifier = e),
        this.dispatchEvent(rr.storefrontIdentifierDidChange, { storefrontIdentifier: e })
    }
    runTokenValidations(e, s = !0) {
      e && validateToken(e)
        ? (s && this._setStorageItem(ir.USER_TOKEN, e),
          (this.authorizationStatus = this.restrictedEnabled ? Qi.RESTRICTED : Qi.AUTHORIZED))
        : (this._removeStorageItem(ir.USER_TOKEN), (this.authorizationStatus = Qi.NOT_DETERMINED))
    }
    wrapDynamicUserTokenForChanges(e, s = invoke(e)) {
      if ('function' != typeof e) return e
      let n = s
      return () => {
        const s = invoke(e)
        return (
          n !== s &&
            ((n = s), this.runTokenValidations(s, !1), this.dispatchEvent(rr.userTokenDidChange, { userToken: s })),
          s || ''
        )
      }
    }
    get dynamicUserToken() {
      return this._dynamicUserToken
    }
    set dynamicUserToken(e) {
      const s = invoke(e)
      ;(this._dynamicUserToken = this.wrapDynamicUserTokenForChanges(e, s)),
        this.runTokenValidations(s, 'function' != typeof e),
        this.dispatchEvent(rr.userTokenDidChange, { userToken: s })
    }
    get userToken() {
      return invoke(this.dynamicUserToken)
    }
    set userToken(e) {
      this.dynamicUserToken = e
    }
    get userTokenIsValid() {
      return validateToken(this.userToken)
    }
    deeplinkURL(e = {}) {
      return (
        'https://finance-app.itunes.apple.com/deeplink?' +
        buildQueryParams((e = Object.assign(Object.assign({}, this.deeplinkParameters || {}), e)))
      )
    }
    itunesDeeplinkURL(e = { p: 'browse' }) {
      return (
        'https://itunes.apple.com/deeplink?' +
        buildQueryParams((e = Object.assign(Object.assign({}, this.deeplinkParameters || {}), e)))
      )
    }
    pldfltcid() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (!this._cids[ir.DEFAULT_CID])
          try {
            yield this.infoRefresh()
          } catch (tn) {
            return
          }
        return this._cids[ir.DEFAULT_CID]
      })
    }
    renewUserToken() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (!this.userToken) return this.requestUserToken()
        const e = new Headers({
            Authorization: 'Bearer ' + this.developerToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + this.userToken,
          }),
          s = yield fetch(this.playBase + '/renewMusicToken', { method: 'POST', headers: e })
        if (401 === s.status) return yield this.revokeUserToken(), Promise.reject(new Error('Renew token'))
        const n = yield s.json()
        return n['music-token'] && (this.userToken = n['music-token']), this.userToken
      })
    }
    requestStorefrontCountryCode() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this.authorizationStatus <= Qi.DENIED) return Promise.reject('Not authorized: ' + this.authorizationStatus)
        const e = new Headers({
            Authorization: 'Bearer ' + this.developerToken,
            'Music-User-Token': this.userToken || '',
          }),
          s = yield fetch(this.apiBase + '/me/storefront', { headers: e })
        if (s && !s.ok) return this._reset(), Promise.reject('Storefront Country Code error.')
        const n = yield s.json()
        if (n.errors) return Promise.reject(n.errors)
        const [d] = n.data
        return d && d.id
          ? ((this.storefrontCountryCode = d.id), this.storefrontCountryCode)
          : Promise.reject('Storefront Country Code error.')
      })
    }
    requestStorefrontIdentifier() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (!this.storefrontIdentifier) {
          const e = yield class {
            constructor(e, s, n) {
              ;(this.id = e),
                (this.attributes = s),
                (this.type = 'storefronts'),
                (this.href = n || `/v1/${this.type}/${e}`)
            }
            static inferFromLanguages(
              e,
              s = (function () {
                if ('undefined' == typeof navigator) return []
                if (navigator.languages) return navigator.languages
                const e = navigator.language || navigator.userLanguage
                return e ? [e] : []
              })()
            ) {
              return __awaiter$1(this, void 0, void 0, function* () {
                const n = yield (function (e, s = 'https://api.music.apple.com/v1') {
                    return __awaiter$1(this, void 0, void 0, function* () {
                      const n = new Headers({ Authorization: 'Bearer ' + e }),
                        d = yield fetch(s + '/storefronts', { headers: n }),
                        h = yield d.json()
                      return h.errors ? Promise.reject(h.errors) : h.data
                    })
                  })(e),
                  d = n.map((e) => e.id),
                  h = s[0] || 'en-US',
                  [p, y] = h.toLowerCase().split(/-|_/),
                  m = d.includes(y) ? y : 'us'
                return n.find((e) => e.id === m)
              })
            }
          }.inferFromLanguages(this.developerToken)
          this.storefrontIdentifier = e.id
        }
        return this.storefrontIdentifier
      })
    }
    requestUserToken() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._serviceSetupView.isServiceView) return this.userToken || ''
        try {
          const e = yield this._serviceSetupView.load({ action: er.AUTHORIZE })
          ;(this.cid = e.cid), (this.userToken = e.userToken), (this.restrictedEnabled = e.restricted)
        } catch (e) {
          return this._reset(), (this.authorizationStatus = e), Promise.reject(e)
        }
        return this.userToken
      })
    }
    revokeUserToken() {
      var e
      return __awaiter$1(this, void 0, void 0, function* () {
        try {
          yield this._webPlayerLogout()
        } catch (s) {}
        null === (e = this.authBridgeApp) || void 0 === e || e.clearAuth(),
          this.dispatchEvent(rr.authorizationStatusWillChange, {
            authorizationStatus: this.authorizationStatus,
            newAuthorizationStatus: Qi.NOT_DETERMINED,
          }),
          this._reset(),
          this.dispatchEvent(rr.authorizationStatusDidChange, { authorizationStatus: this.authorizationStatus }),
          this.dispatchEvent(rr.userTokenDidChange, { userToken: this.userToken })
      })
    }
    setCids(e) {
      ;(this._cids = Object.assign(Object.assign({}, this._cids), e)),
        Object.keys(this._cids).forEach((e) => {
          this._setStorageItem(e, this._cids[e])
        })
    }
    hasMusicSubscription() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return !!this.hasAuthorized && this._getIsActiveSubscription()
      })
    }
    _getIsActiveSubscription() {
      var e
      return __awaiter$1(this, void 0, void 0, function* () {
        const s = yield this.me()
        return !!(null === (e = s.subscription) || void 0 === e ? void 0 : e.active)
      })
    }
    resetSubscribeViewEligibility() {
      this._dispatchedSubscribeView = !1
    }
    presentSubscribeViewForEligibleUsers(e = {}, s = !0) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const n = yield this.eligibleForSubscribeView()
        if (!this._serviceSetupView.isServiceView && n) {
          if (!s) return this.dispatchEvent(rr.eligibleForSubscribeView, e), void (this._dispatchedSubscribeView = !0)
          try {
            const e = yield this._serviceSetupView.load({ action: er.SUBSCRIBE })
            return (this._dispatchedSubscribeView = !0), e
          } catch (d) {
            return this.revokeUserToken()
          }
        }
      })
    }
    infoRefresh() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this.authorizationStatus <= Qi.DENIED) return Promise.reject('Not authorized: ' + this.authorizationStatus)
        const e = new Headers({
          Authorization: 'Bearer ' + this.developerToken,
          'Music-User-Token': this.userToken || '',
        })
        try {
          const s = yield fetch(this.iTunesBuyBase + '/account/web/infoRefresh', {
              credentials: 'include',
              headers: e,
            }),
            n = yield s.json()
          this.setCids(n)
        } catch (tn) {}
      })
    }
    me() {
      return this.authorizationStatus <= Qi.DENIED
        ? Promise.reject('Not authorized: ' + this.authorizationStatus)
        : (this._me ||
            (this._me = new Promise((e, s) =>
              __awaiter$1(this, void 0, void 0, function* () {
                const n = new Headers({
                    Authorization: 'Bearer ' + this.developerToken,
                    'Music-User-Token': this.userToken || '',
                  }),
                  d = yield fetch(this.apiBase + '/me/account?meta=subscription', { headers: n })
                if (d && !d.ok) return 2 !== this.realm && this._reset(), s('Account error.')
                let h = yield d.json()
                if (h.errors) return s(h.errors)
                const { data: p, meta: y } = h
                if (!y || !y.subscription) return s('Account error.')
                this.storefrontCountryCode = y.subscription.storefront
                const m = { subscription: y.subscription }
                return p && p.length && (m.attributes = p[0].attributes), e(m)
              })
            )
              .then((e) => {
                var s
                return (
                  this._getIsActiveSubscription.updateCache(
                    (null === (s = e.subscription) || void 0 === s ? void 0 : s.active) || !1
                  ),
                  (this._me = null),
                  e
                )
              })
              .catch((e) => ((this._me = null), Promise.reject(e)))),
          this._me)
    }
    _getStorageItem(e) {
      if (e)
        return 'cookie' === this.persist
          ? getCookie(e)
          : 'localstorage' === this.persist
          ? this.storage.getItem(`${this.storagePrefix}.${e}`)
          : void 0
    }
    _processLocationHash(e) {
      const s = /^\#([a-zA-Z0-9+\/]{200,}={0,2})$/
      if (s.test(e)) {
        const n = e.replace(s, '$1')
        try {
          const { itre: e, musicUserToken: s, cid: d } = JSON.parse(atob(n))
          ;(this.restrictedEnabled = e && '1' === e), (this.userToken = s), (this.cid = d)
        } catch (tn) {}
        history.replaceState(null, document.title, ' ')
      }
    }
    _removeStorageItem(e) {
      if ('cookie' === this.persist) this._removeCookieFromDomains(e)
      else if ('localstorage' === this.persist) return this.storage.removeItem(`${this.storagePrefix}.${e}`)
    }
    _removeCookieFromDomains(e, s = window) {
      removeCookie(e)
      const { hostname: n } = s.location,
        d = n.split('.')
      if (d.length && (d.shift(), d.length > 2))
        for (let h = d.length; h > 2; h--) {
          const n = d.join('.')
          d.shift(), removeCookie(e, s, n)
        }
    }
    _reset(e = Qi.NOT_DETERMINED) {
      ;(this._authorizationStatus = e),
        (this._cids = {}),
        (this._dispatchedSubscribeView = !1),
        (this._restrictedEnabled = void 0),
        (this._storefrontCountryCode = void 0),
        this._getIsActiveSubscription.updateCache(void 0),
        Object.keys(zi).forEach((e) => {
          this._removeStorageItem(zi[e])
        }),
        this._removeStorageItem(ir.RESTRICTIONS_ENABLED),
        this._removeStorageItem(ir.USER_TOKEN),
        this._removeStorageItem(ir.STOREFRONT_COUNTRY_CODE),
        (this._dynamicUserToken = void 0),
        (this._me = null)
    }
    _setStorageItem(e, s) {
      var n
      return 'cookie' === this.persist
        ? (null === (n = this.authBridgeApp) || void 0 === n || n.setCookieItem(e, s), setCookie(e, s, '/', 180))
        : 'localstorage' === this.persist
        ? this.storage.setItem(`${this.storagePrefix}.${e}`, s)
        : void 0
    }
    _webPlayerLogout() {
      return __awaiter$1(this, void 0, void 0, function* () {
        const e = new Headers({
            Authorization: 'Bearer ' + this.developerToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + this.userToken,
          }),
          s = yield fetch(this.logoutURL, { method: 'POST', headers: e, credentials: 'same-origin' })
        return s && !s.ok ? Promise.reject(s.status) : s.json()
      })
    }
  }
  !(function (e, s, n, d) {
    var h,
      p = arguments.length,
      y = p < 3 ? s : null === d ? (d = Object.getOwnPropertyDescriptor(s, n)) : d
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) y = Reflect.decorate(e, s, n, d)
    else for (var m = e.length - 1; m >= 0; m--) (h = e[m]) && (y = (p < 3 ? h(y) : p > 3 ? h(s, n, y) : h(s, n)) || y)
    p > 3 && y && Object.defineProperty(s, n, y)
  })(
    [
      (
        (e = 300) =>
        (s, n, d) => {
          if (void 0 === d || 'function' != typeof d.value)
            throw new TypeError(`Only methods can be decorated with @CachedResult, but ${n} is not a method.`)
          return {
            configurable: !0,
            get() {
              const s = d.value,
                h = 1e3 * e
              let p,
                y = -1
              function cachedResultMethod(...e) {
                return __awaiter$3(this, void 0, void 0, function* () {
                  const n = Date.now()
                  return (
                    (void 0 === p || -1 === y || (y > 0 && n > y + h)) && ((y = n), (p = yield s.apply(this, e))), p
                  )
                })
              }
              return (
                (cachedResultMethod.updateCache = function (e) {
                  ;(y = Date.now()), (p = e)
                }),
                (cachedResultMethod.getCachedValue = () => p),
                Object.defineProperty(this, n, { value: cachedResultMethod, configurable: !0, writable: !0 }),
                cachedResultMethod
              )
            },
          }
        }
      )(900),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', Promise),
    ],
    StoreKit.prototype,
    '_getIsActiveSubscription',
    null
  )
  const ar = {
      audioTrackAdded: 'audioTrackAdded',
      audioTrackChanged: 'audioTrackChanged',
      audioTrackRemoved: 'audioTrackRemoved',
      bufferedProgressDidChange: 'bufferedProgressDidChange',
      drmUnsupported: 'drmUnsupported',
      forcedTextTrackChanged: 'forcedTextTrackChanged',
      mediaCanPlay: 'mediaCanPlay',
      mediaElementCreated: 'mediaElementCreated',
      mediaPlaybackError: 'mediaPlaybackError',
      nowPlayingItemDidChange: 'nowPlayingItemDidChange',
      nowPlayingItemWillChange: 'nowPlayingItemWillChange',
      metadataDidChange: 'metadataDidChange',
      playbackBitrateDidChange: 'playbackBitrateDidChange',
      playbackDurationDidChange: 'playbackDurationDidChange',
      playbackProgressDidChange: 'playbackProgressDidChange',
      playbackRateDidChange: 'playbackRateDidChange',
      playbackStateDidChange: 'playbackStateDidChange',
      playbackStateWillChange: 'playbackStateWillChange',
      playbackTargetAvailableDidChange: 'playbackTargetAvailableDidChange',
      playbackTargetIsWirelessDidChange: 'playbackTargetIsWirelessDidChange',
      playbackTimeDidChange: 'playbackTimeDidChange',
      playbackVolumeDidChange: 'playbackVolumeDidChange',
      playerTypeDidChange: 'playerTypeDidChange',
      presentationModeDidChange: 'presentationModeDidChange',
      primaryPlayerDidChange: 'primaryPlayerDidChange',
      textTrackAdded: 'textTrackAdded',
      textTrackChanged: 'textTrackChanged',
      textTrackRemoved: 'textTrackRemoved',
      timedMetadataDidChange: 'timedMetadataDidChange',
    },
    or = {
      configured: 'musickitconfigured',
      loaded: 'musickitloaded',
      audioTrackAdded: ar.audioTrackAdded,
      audioTrackChanged: ar.audioTrackChanged,
      audioTrackRemoved: ar.audioTrackRemoved,
      authorizationStatusDidChange: rr.authorizationStatusDidChange,
      authorizationStatusWillChange: rr.authorizationStatusWillChange,
      bufferedProgressDidChange: ar.bufferedProgressDidChange,
      capabilitiesChanged: 'capabilitiesChanged',
      autoplayEnabledDidChange: 'autoplayEnabledDidChange',
      drmUnsupported: ar.drmUnsupported,
      eligibleForSubscribeView: rr.eligibleForSubscribeView,
      forcedTextTrackChanged: ar.forcedTextTrackChanged,
      mediaCanPlay: ar.mediaCanPlay,
      mediaElementCreated: ar.mediaElementCreated,
      mediaItemStateDidChange: E.mediaItemStateDidChange,
      mediaItemStateWillChange: E.mediaItemStateWillChange,
      mediaPlaybackError: ar.mediaPlaybackError,
      mediaSkipAvailable: 'mediaSkipAvailable',
      mediaRollEntered: 'mediaRollEntered',
      mediaUpNext: 'mediaUpNext',
      metadataDidChange: ar.metadataDidChange,
      nowPlayingItemDidChange: ar.nowPlayingItemDidChange,
      nowPlayingItemWillChange: ar.nowPlayingItemWillChange,
      playbackBitrateDidChange: ar.playbackBitrateDidChange,
      playbackDurationDidChange: ar.playbackDurationDidChange,
      playbackProgressDidChange: ar.playbackProgressDidChange,
      playbackRateDidChange: ar.playbackRateDidChange,
      playbackStateDidChange: ar.playbackStateDidChange,
      playbackStateWillChange: ar.playbackStateWillChange,
      playbackTargetAvailableDidChange: ar.playbackTargetAvailableDidChange,
      playbackTargetIsWirelessDidChange: ar.playbackTargetIsWirelessDidChange,
      playbackTimeDidChange: ar.playbackTimeDidChange,
      playbackVolumeDidChange: ar.playbackVolumeDidChange,
      playerTypeDidChange: ar.playerTypeDidChange,
      presentationModeDidChange: ar.presentationModeDidChange,
      primaryPlayerDidChange: ar.primaryPlayerDidChange,
      queueIsReady: 'queueIsReady',
      queueItemsDidChange: 'queueItemsDidChange',
      queueItemForStartPosition: 'queueItemForStartPosition',
      queuePositionDidChange: 'queuePositionDidChange',
      shuffleModeDidChange: 'shuffleModeDidChange',
      repeatModeDidChange: 'repeatModeDidChange',
      storefrontCountryCodeDidChange: rr.storefrontCountryCodeDidChange,
      storefrontIdentifierDidChange: rr.storefrontIdentifierDidChange,
      textTrackAdded: ar.textTrackAdded,
      textTrackChanged: ar.textTrackChanged,
      textTrackRemoved: ar.textTrackRemoved,
      timedMetadataDidChange: ar.timedMetadataDidChange,
      userTokenDidChange: rr.userTokenDidChange,
      webComponentsLoaded: 'musickitwebcomponentsloaded',
    }
  var dr, lr
  function formattedSeconds(e) {
    return { hours: Math.floor(e / 3600), minutes: Math.floor((e % 3600) / 60) }
  }
  ;(e.PlaybackStates = void 0),
    ((dr = e.PlaybackStates || (e.PlaybackStates = {}))[(dr.none = 0)] = 'none'),
    (dr[(dr.loading = 1)] = 'loading'),
    (dr[(dr.playing = 2)] = 'playing'),
    (dr[(dr.paused = 3)] = 'paused'),
    (dr[(dr.stopped = 4)] = 'stopped'),
    (dr[(dr.ended = 5)] = 'ended'),
    (dr[(dr.seeking = 6)] = 'seeking'),
    (dr[(dr.waiting = 8)] = 'waiting'),
    (dr[(dr.stalled = 9)] = 'stalled'),
    (dr[(dr.completed = 10)] = 'completed'),
    (e.PresentationMode = void 0),
    ((lr = e.PresentationMode || (e.PresentationMode = {}))[(lr.pictureinpicture = 0)] = 'pictureinpicture'),
    (lr[(lr.inline = 1)] = 'inline')
  const cr = 'mk-player-tsid',
    ur = ['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen'],
    hr = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'],
    pr = ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'],
    noop = () => Promise.resolve(),
    yr = ((e) => {
      if (void 0 === e) return noop
      const s = ur.find((s) => 'function' == typeof e.prototype[s])
      return 'string' != typeof s
        ? noop
        : (e = self.document) => {
            var n
            return null === (n = null == e ? void 0 : e[s]) || void 0 === n ? void 0 : n.call(e)
          }
    })(HTMLDocument),
    mr = ((e) => {
      if (void 0 === e) return () => !1
      const s = hr.find((s) => s in e.prototype)
      return 'string' != typeof s ? () => !1 : (e = self.document) => !!e[s]
    })(HTMLDocument),
    gr = ((e) => {
      if (void 0 === e) return noop
      const s = pr.find((s) => 'function' == typeof e.prototype[s])
      return 'string' != typeof s ? noop : (e) => (null == e ? void 0 : e[s]())
    })(HTMLElement)
  class Fullscreen {
    constructor(e) {
      this.player = e
    }
    exit() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this.isInFullscreen()) return this.stopDispatchingEvents(() => this.exitFullscreen())
      })
    }
    request(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (void 0 !== e) return this.stopDispatchingEvents(() => this.requestFullscreenForElement(e))
      })
    }
    stopDispatchingEvents(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this.player.windowHandlers.stopListeningToVisibilityChanges(e)
      })
    }
    exitFullscreen() {
      return yr()
    }
    isInFullscreen() {
      return mr()
    }
    requestFullscreenForElement(e) {
      return gr(e)
    }
  }
  class UnsupportedSeeker {
    constructor() {
      this.ended = !1
    }
    start() {
      w.warn('seeker.start is not supported in this playback method')
    }
    end() {
      w.warn('seeker.end is not supported in this playback method')
    }
    seekToTime(e) {
      return w.warn('seekToTime is not supported in this playback method'), Promise.resolve()
    }
  }
  class PlayerSeeker {
    constructor(e) {
      ;(this._ended = !1),
        (this._lastSeekedTime = -1),
        (this._startTime = -1),
        w.debug('seeker: new'),
        (this._player = e)
    }
    get ended() {
      return this._ended
    }
    get isEngagedInPlayback() {
      return this._player.isEngagedInPlayback
    }
    get stillPlayingSameItem() {
      return this._currentItem === this._player.nowPlayingItem
    }
    end() {
      w.debug('seeker: end'),
        -1 !== this._startTime
          ? this._ended
            ? w.warn('seeker: Cannot end the same seeker twice.')
            : (this.dispatchStartEvent(), this.dispatchEndEvent())
          : w.warn('seeker: Cannot end a seeker before starting it.')
    }
    seekToTime(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        var s
        if ((w.debug('seeker: seekToTime', e), !this.ended))
          return (
            this.stillPlayingSameItem || ((this._currentItem = this._player.nowPlayingItem), (this._startTime = 0)),
            (this._lastSeekedTime = e),
            (s = this._player.seekToTime(e)),
            __awaiter$3(void 0, void 0, void 0, function* () {
              try {
                return yield s
              } catch (_t) {
                if ('cancelled' !== _t.message) throw _t
              }
            })
          )
        w.warn('seeker: Cannot seek once the seeker has ended')
      })
    }
    start() {
      w.debug('seeker: start'),
        -1 === this._startTime
          ? ((this._currentItem = this._player.nowPlayingItem),
            (this._startTime = this._player.currentPlaybackTime),
            (this._lastSeekedTime = this._startTime))
          : w.warn('seeker: Cannot start same seeker twice')
    }
    dispatch(e, s) {
      this.isEngagedInPlayback
        ? (w.debug('seeker: dispatch', e), this._player.dispatch(e, s))
        : w.debug('seeker: do not dispatch because isEngagedInPlayback', this.isEngagedInPlayback)
    }
    dispatchStartEvent() {
      this.stillPlayingSameItem || ((this._startTime = 0), (this._lastSeekedTime = 0)),
        this.dispatch(Ze.playbackScrub, { position: this._startTime })
    }
    dispatchEndEvent() {
      ;(this._ended = !0),
        this.dispatch(Ze.playbackScrub, {
          position: this._lastSeekedTime,
          endReasonType: e.PlayActivityEndReasonType.SCRUB_END,
        })
    }
  }
  const {
    visibilityChangeEvent: fr,
    visibilityState: vr,
    unloadEventName: _r,
  } = (() => {
    let e = 'visibilitychange',
      s = 'visibilityState'
    void 0 !== document.mozHidden
      ? ((e = 'mozvisibilitychange'), (s = 'mozVisibilityState'))
      : void 0 !== document.msHidden
      ? ((e = 'msvisibilitychange'), (s = 'msVisibilityState'))
      : document.webkitHidden && ((e = 'webkitvisibilitychange'), (s = 'webkitVisibilityState'))
    return {
      visibilityChangeEvent: e,
      visibilityState: s,
      unloadEventName: 'onpagehide' in window ? 'pagehide' : 'unload',
    }
  })()
  class WindowHandlers {
    constructor(e, s = je) {
      ;(this.browser = s), (this.dispatchVisibilityChanges = !0), (this.player = e)
    }
    activate(e = self, s = self.document) {
      s.addEventListener(fr, this.visibilityChanged),
        e.addEventListener('storage', this.storage, !1),
        e.addEventListener(_r, this.windowUnloaded)
    }
    deactivate() {
      document.removeEventListener(fr, this.visibilityChanged),
        window.removeEventListener('storage', this.storage),
        window.addEventListener(_r, this.windowUnloaded)
    }
    stopListeningToVisibilityChanges(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        this.dispatchVisibilityChanges = !1
        const s = yield e()
        return (this.dispatchVisibilityChanges = !0), s
      })
    }
    dispatch(e, s = {}) {
      this.player.dispatch(e, s)
    }
    storage({ key: e, newValue: s }) {
      e === cr && this.player.tsidChanged(s)
    }
    visibilityChanged(e) {
      const s = e.target[vr]
      w.log('dc visibilityState', s, e, mr()),
        this.browser.isiOS &&
          this.dispatchVisibilityChanges &&
          ('hidden' === s
            ? this.dispatch(Ze.playerExit, { position: this.player.currentPlaybackTime })
            : 'visible' === s && this.dispatch(Ze.playerActivate))
    }
    windowUnloaded() {
      this.player.isPlaying && this.dispatch(Ze.playerExit, { position: this.player.currentPlaybackTime })
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object]),
      __metadata$2('design:returntype', void 0),
    ],
    WindowHandlers.prototype,
    'storage',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Event]),
        __metadata$2('design:returntype', void 0),
      ],
      WindowHandlers.prototype,
      'visibilityChanged',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', void 0),
      ],
      WindowHandlers.prototype,
      'windowUnloaded',
      null
    )
  const {
      bufferedProgressDidChange: br,
      mediaCanPlay: Tr,
      mediaElementCreated: Er,
      mediaPlaybackError: Sr,
      nowPlayingItemDidChange: kr,
      nowPlayingItemWillChange: Pr,
      metadataDidChange: Ar,
      primaryPlayerDidChange: Ir,
      playbackDurationDidChange: wr,
      playbackProgressDidChange: Rr,
      playbackStateDidChange: Or,
      playbackRateDidChange: Cr,
      playbackStateWillChange: Mr,
      playbackTargetAvailableDidChange: Nr,
      playbackTargetIsWirelessDidChange: Dr,
      playbackTimeDidChange: Lr,
      playbackVolumeDidChange: xr,
    } = ar,
    Ur = [
      'canplay',
      'durationchange',
      'ended',
      'error',
      'loadedmetadata',
      'loadstart',
      'pause',
      'play',
      'playing',
      'progress',
      'ratechange',
      'seeked',
      'seeking',
      'timeupdate',
      'volumechange',
      'waiting',
    ],
    { ended: $r, loading: Br, paused: Fr, playing: jr, seeking: Kr, stopped: Vr, waiting: Yr } = e.PlaybackStates
  class BasePlayer {
    constructor(s) {
      ;(this.privateEnabled = !1),
        (this.siriInitiated = !1),
        (this.previewOnly = !1),
        (this._currentBufferedProgress = 0),
        (this._paused = !1),
        (this._playbackState = e.PlaybackStates.none),
        (this._stopped = !1),
        (this._playbackDidStart = !1),
        (this._currentPlaybackProgress = 0),
        (this._hasSmartPlayed = !1),
        (this._isPrimaryPlayer = !0),
        (this._playbackTargetAvailable = !1),
        (this._playbackTargetIsWireless = !1),
        (this._serial = Date.now().toString()),
        (this._isDestroyed = !1),
        (this._dispatcher = s.services.dispatcher),
        (this._timing = s.services.timing),
        (this._context = s.context || {}),
        (this.privateEnabled = s.privateEnabled || !1),
        (this.siriInitiated = s.siriInitiated || !1),
        (this._bitrateCalculator = s.services.bitrateCalculator),
        (this.windowHandlers = new WindowHandlers(this)),
        (this.fullscreen = new Fullscreen(this)),
        localStorage.setItem(cr, this._serial)
    }
    get bitrate() {
      return this._bitrateCalculator.bitrate
    }
    get currentBufferedProgress() {
      return this._currentBufferedProgress
    }
    set currentBufferedProgress(e) {
      this._currentBufferedProgress !== e &&
        ((this._currentBufferedProgress = e), this._dispatcher.publish(br, { progress: e }))
    }
    get _currentDuration() {
      return this._targetElement.duration
    }
    get _currentTime() {
      var e
      const s = this._targetElement.currentTime,
        n = this._buffer
      return s - (null !== (e = null == n ? void 0 : n.currentTimestampOffset) && void 0 !== e ? e : 0)
    }
    get currentPlaybackDuration() {
      const s = this.nowPlayingItem,
        n =
          (null == s ? void 0 : s.playbackType) === e.PlaybackType.encryptedFull ||
          (null == s ? void 0 : s.playbackType) === e.PlaybackType.unencryptedFull,
        d = null == s ? void 0 : s.playbackDuration
      return n && d ? this._timing.time(d / 1e3) : this._timing.time(this._currentDuration)
    }
    get currentPlaybackTime() {
      const e =
        void 0 === this.nowPlayingItem || void 0 === this.nowPlayingItem.playEvent || this._hasSmartPlayed
          ? this._currentTime
          : this.nowPlayingItem.playEvent.playCursorInSeconds
      return this._timing.time(e)
    }
    get currentPlaybackTimeRemaining() {
      return this.currentPlaybackDuration - this.currentPlaybackTime
    }
    get currentPlaybackProgress() {
      return this._currentPlaybackProgress || 0
    }
    set currentPlaybackProgress(e) {
      this._currentPlaybackProgress !== e &&
        ((this._currentPlaybackProgress = e), this._dispatcher.publish(Rr, { progress: e }))
    }
    get formattedCurrentPlaybackDuration() {
      return formattedSeconds(this.currentPlaybackDuration)
    }
    get hasMediaElement() {
      return this._targetElement instanceof HTMLElement && null !== this._targetElement.parentNode
    }
    get isEngagedInPlayback() {
      return !this._stopped && !this.isPaused()
    }
    get isPlaying() {
      return this.playbackState === jr
    }
    get isPrimaryPlayer() {
      return this._isPrimaryPlayer
    }
    set isPrimaryPlayer(e) {
      e !== this._isPrimaryPlayer &&
        ((this._isPrimaryPlayer = e),
        this._isPrimaryPlayer
          ? localStorage.setItem(cr, this._serial)
          : (this._dispatcher.publish(Ir, { target: this }), this.pause({ userInitiated: !1 })))
    }
    get isReady() {
      return 0 !== this._targetElement.readyState
    }
    get nowPlayingItem() {
      return this._nowPlayingItem
    }
    set nowPlayingItem(e) {
      this._hasSmartPlayed = !1
      const s = this._dispatcher
      if (void 0 === e) return (this._nowPlayingItem = e), void s.publish(kr, { item: e })
      const n = this._nowPlayingItem,
        d = this._buffer
      ;(null == n ? void 0 : n.isEqual(e)) ||
        (s.publish(Pr, { item: e }),
        this.isPlaying && (null == d ? void 0 : d.currentItem) !== e && this._pauseMedia(),
        n &&
          (w.debug('setting state to ended on ', n.title),
          (n.state = C.ended),
          n.endMonitoringStateDidChange(),
          n.endMonitoringStateWillChange()),
        (this._nowPlayingItem = e),
        w.debug('setting state to playing on ', e.title),
        (e.state = C.playing),
        e && e.info && this._setTargetElementTitle(e.info),
        s.publish(kr, { item: e }),
        s.publish(wr, {
          currentTarget: this._targetElement,
          duration: this.currentPlaybackDuration,
          target: this._targetElement,
          type: 'durationchange',
        }))
    }
    get playbackRate() {
      return this._targetElement.playbackRate
    }
    set playbackRate(e) {
      this._targetElement.playbackRate = e
    }
    get playbackState() {
      return this._playbackState
    }
    set playbackState(e) {
      const s = this._playbackState
      if (e === s) return
      const n = {
        oldState: s,
        state: e,
        nowPlayingItem: this.nowPlayingItem ? { id: this.nowPlayingItem.id, type: this.nowPlayingItem.type } : void 0,
      }
      w.debug('BasePlayer.playbackState is changing', n),
        this._dispatcher.publish(Mr, n),
        (this._playbackState = e),
        this._dispatcher.publish(Or, n)
    }
    get playbackTargetAvailable() {
      return void 0 !== window.WebKitPlaybackTargetAvailabilityEvent && this._playbackTargetAvailable
    }
    set playbackTargetAvailable(e) {
      e !== this._playbackTargetAvailable &&
        ((this._playbackTargetAvailable = e), this._dispatcher.publish(Nr, { available: e }))
    }
    get playbackTargetIsWireless() {
      return void 0 !== window.WebKitPlaybackTargetAvailabilityEvent && this._playbackTargetIsWireless
    }
    set playbackTargetIsWireless(e) {
      e !== this._playbackTargetIsWireless &&
        ((this._playbackTargetIsWireless = e), this._dispatcher.publish(Dr, { playing: e }))
    }
    get volume() {
      return this._targetElement.volume
    }
    set volume(e) {
      this._targetElement.volume = e
    }
    get isDestroyed() {
      return this._isDestroyed
    }
    clearNextManifest() {
      var e
      null === (e = this._buffer) || void 0 === e || e.clearNextManifest()
    }
    initialize() {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('BasePlayer.initialize'),
          this.isPlayerSupported()
            ? (yield this.initializeMediaElement(),
              yield this.initializeExtension(),
              this.initializeEventHandlers(),
              this._dispatcher.publish(Er, this._targetElement))
            : w.warn('{this.constructor.name} not supported')
      })
    }
    initializeEventHandlers() {
      if ((this.windowHandlers.activate(), !this.hasMediaElement)) return
      const e = this._targetElement
      window.WebKitPlaybackTargetAvailabilityEvent &&
        (e.addEventListener('webkitplaybacktargetavailabilitychanged', (e) => {
          this.playbackTargetAvailable = 'available' === e.availability
        }),
        e.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', (e) => {
          this.playbackTargetIsWireless = e.target === this._targetElement && !this.playbackTargetIsWireless
        })),
        Ur.forEach((s) => e.addEventListener(s, this)),
        this.dispatch(Ze.playerActivate, { isPlaying: this.isPlaying })
    }
    removeEventHandlers() {
      Ur.forEach((e) => this._targetElement.removeEventListener(e, this)), this.windowHandlers.deactivate()
    }
    isPaused() {
      return this._paused
    }
    exitFullscreen() {
      return this.fullscreen.exit()
    }
    requestFullscreen(e) {
      return this.fullscreen.request(e)
    }
    seekToTime(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const s = this._buffer
        if (s) {
          w.debug('Doing buffer seek to', e)
          if (!(yield s.seek(e))) return
        } else w.debug('Doing media element seek to', e), (this._targetElement.currentTime = e)
      })
    }
    newSeeker() {
      var e
      return (
        null === (e = this._seeker) || void 0 === e || e.end(), (this._seeker = new PlayerSeeker(this)), this._seeker
      )
    }
    stop(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('BasePlayer.stop', e),
          yield this._waitForPendingPlay(),
          this.isPlaying &&
            this.dispatch(
              Ze.playbackStop,
              Object.assign({ position: this.currentPlaybackTime, startPosition: this._initialBufferPosition || 0 }, e)
            ),
          yield this.stopMediaAndCleanup()
      })
    }
    stopMediaAndCleanup(e = Vr) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('stopMediaAndCleanup'),
          yield this._stopMediaElement(),
          (this._stopped = !0),
          (this._paused = !1),
          (this.nowPlayingItem = void 0),
          (this._initialBufferPosition = void 0),
          (this.playbackState = e)
      })
    }
    _calculatePlaybackProgress() {
      this.currentPlaybackProgress =
        Math.round(100 * (this.currentPlaybackTime / this.currentPlaybackDuration || 0)) / 100
    }
    destroy() {
      var e, s
      if ((w.debug('BasePlayer.destroy'), (this._isDestroyed = !0), !this.hasMediaElement)) return
      const n = this._targetElement
      null === (e = this.extension) || void 0 === e || e.destroy(n),
        this.removeEventHandlers(),
        this.cleanupElement(),
        null === (s = n.parentNode) || void 0 === s || s.removeChild(n)
    }
    handleEvent(s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        switch (
          ('timeupdate' !== s.type && w.debug('BasePlayer.handleEvent: ', s.type, s, this.isPaused(), this._stopped),
          s.type)
        ) {
          case 'canplay':
            this._dispatcher.publish(Tr, s),
              this.handleSmartPlay(),
              this._playbackState !== e.PlaybackStates.waiting ||
                this._targetElement.paused ||
                (this.playbackState = e.PlaybackStates.playing)
            break
          case 'durationchange':
            this._targetElement.duration !== 1 / 0 &&
              ((s.duration = this.currentPlaybackDuration),
              this._dispatcher.publish(wr, s),
              this._calculatePlaybackProgress())
            break
          case 'ended': {
            if ((w.debug('media element "ended" event'), this.isElementCleaned())) {
              w.debug('media element already cleaned, ignoring "ended" event')
              break
            }
            const s = this._targetElement.currentTime
            yield this.stopMediaAndCleanup($r),
              this.dispatch(Ze.playbackStop, {
                position: s,
                endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
              })
            break
          }
          case 'error':
            w.error('Playback Error', s),
              this._dispatcher.publish(Sr, new MKError(MKError.MEDIA_PLAYBACK, 'Playback Error'))
            break
          case 'loadedmetadata':
            this._dispatcher.publish(Ar, s)
            break
          case 'loadstart':
            this.playbackState = Br
            break
          case 'pause':
            this.playbackState = this._stopped ? Vr : Fr
            break
          case 'play':
          case 'playing':
            ;(this._paused = !1), (this._stopped = !1), (this.isPrimaryPlayer = !0), (this.playbackState = jr)
            break
          case 'progress': {
            const e = this._targetElement.buffered
            this.handleBufferStart(),
              1 === e.length &&
                0 === e.start(0) &&
                (this.currentBufferedProgress = Math.round((e.end(0) / this.currentPlaybackDuration) * 100))
            break
          }
          case 'ratechange':
            this._dispatcher.publish(Cr, s)
            break
          case 'seeked':
            this._stopped
              ? (this.playbackState = Vr)
              : this._paused
              ? (this.playbackState = Fr)
              : this.playbackState !== $r && (this.playbackState = jr)
            break
          case 'seeking':
            this.playbackState === Fr ? (this._paused = !0) : this.playbackState === Vr && (this._stopped = !0),
              this.playbackState !== $r && (this.playbackState = Kr)
            break
          case 'timeupdate': {
            this._dispatcher.publish(Lr, {
              currentPlaybackDuration: this.currentPlaybackDuration,
              currentPlaybackTime: this.currentPlaybackTime,
              currentPlaybackTimeRemaining: this.currentPlaybackTimeRemaining,
            }),
              this._calculatePlaybackProgress()
            const e = this._buffer
            e && (e.currentTime = this.currentPlaybackTime)
            break
          }
          case 'volumechange':
            this._dispatcher.publish(xr, s)
            break
          case 'waiting':
            this.playbackState = Yr
        }
      })
    }
    handleBufferStart() {
      const { _targetElement: e } = this
      void 0 !== this._initialBufferPosition ||
        e.paused ||
        0 === e.buffered.length ||
        ((this._initialBufferPosition = e.buffered.start(0)),
        w.debug('BasePlayer.handleBufferStart: setting initial buffer position ', this._initialBufferPosition))
    }
    handleSmartPlay() {
      if (!this._targetElement || !this.nowPlayingItem) return
      const e = this.nowPlayingItem
      e &&
        e.playEvent &&
        !e.playEvent.isDone &&
        !this._hasSmartPlayed &&
        (w.debug('BasePlayer.handleSmartPlay is resuming playCursor'),
        (this._targetElement.currentTime = e.playEvent.playCursorInSeconds)),
        (this._hasSmartPlayed = !0)
    }
    pause(e = {}) {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this._waitForPendingPlay(),
          this.isPlaying &&
            (yield this._pauseMedia(),
            (this._paused = !0),
            this.dispatch(Ze.playbackPause, Object.assign({ position: this.currentPlaybackTime }, e)))
      })
    }
    play(e = !0) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if ((w.debug('BasePlayer.play()'), this.nowPlayingItem))
          try {
            const afterPlay = () => {
              w.debug('BasePlayer.play dispatching playbackPlay'),
                this.dispatch(Ze.playbackPlay, { userInitiated: e, position: this.currentPlaybackTime })
            }
            yield this._playMedia(afterPlay)
          } catch (_t) {
            return void (
              ('NotAllowedError' !== _t.name && 'NotSupportedError' !== _t.name) ||
              w.error('BasePlayer.play() rejected due to', _t)
            )
          }
      })
    }
    preload() {
      return this._loadMedia()
    }
    showPlaybackTargetPicker() {
      this.playbackTargetAvailable && this._targetElement.webkitShowPlaybackTargetPicker()
    }
    dispatch(e, s = {}) {
      void 0 === s.item && (s.item = this.nowPlayingItem),
        void 0 === s.position && (s.position = this.currentPlaybackTime),
        (s.isPlaying = this.isPlaying),
        this._dispatcher.publish(e, s)
    }
    tsidChanged(e) {
      void 0 !== e && '' !== e && (this.isPrimaryPlayer = e === this._serial)
    }
    _waitForPendingPlay() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._playPromise)
          try {
            yield this._playPromise
          } catch (_t) {
            w.error('BasePlayer._waitForPendingPlay playPromise rejected', _t)
          } finally {
            this._playPromise = void 0
          }
      })
    }
    _loadMedia() {
      return w.debug('BasePlayer._loadMedia', this._targetElement), this._targetElement.load(), Promise.resolve()
    }
    _pauseMedia() {
      return this._targetElement.pause(), Promise.resolve()
    }
    _playAssetURL(e, s) {
      w.debug('BasePlayer._playAssetURL', e), (this._targetElement.src = e)
      const n = this._loadMedia()
      return s ? (w.debug('BasePlayer.loadOnly'), n) : this._playMedia()
    }
    playItemFromUnencryptedSource(e, s, n) {
      return (null == n ? void 0 : n.startTime) && (e += '#t=' + n.startTime), this._playAssetURL(e, s)
    }
    _playMedia(e = n) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('BasePlayer._playMedia', this._targetElement, this.extension)
        const s = this._targetElement.play().then((e) => ((this._playbackDidStart = !0), e))
        ;(this._playPromise = s.then(e)), yield s
      })
    }
    _setTargetElementTitle(e) {
      this.hasMediaElement && (this._targetElement.title = e)
    }
    _licenseError() {
      this._playPromise = void 0
    }
    _stopMediaElement() {
      return __awaiter$4(this, void 0, void 0, function* () {
        this.hasMediaElement && (this._targetElement.pause(), this.cleanupElement())
      })
    }
    cleanupElement() {
      const e = this._targetElement
      e && !this.isElementCleaned() && ((e.currentTime = 0), e.removeAttribute('src'), e.removeAttribute('title'))
    }
    isElementCleaned() {
      const e = this._targetElement
      return !e || (0 === e.currentTime && '' === e.src && '' === e.title)
    }
  }
  __decorate$2(
    [
      AsyncDebounce(250),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Number]),
      __metadata$2('design:returntype', Promise),
    ],
    BasePlayer.prototype,
    'seekToTime',
    null
  )
  const Hr = { app: {}, features: {}, urls: {} }
  var Wr, Gr
  !(function (e) {
    ;(e.playbackLicenseError = 'playbackLicenseError'),
      (e.playbackSessionError = 'playbackSessionError'),
      (e.manifestParsed = 'manifestParsed'),
      (e.audioCodecIdentified = 'audioCodecIdentified'),
      (e.audioTracksSwitched = 'audioTracksSwitched'),
      (e.audioTracksUpdated = 'audioTracksUpdated'),
      (e.textTracksSwitched = 'textTracksSwitched'),
      (e.textTracksUpdated = 'textTracksUpdated'),
      (e.levelUpdated = 'levelUpdated')
  })(Wr || (Wr = {})),
    (function (e) {
      ;(e.MP4 = 'audio/mp4'), (e.AVC1 = 'video/mp4')
    })(Gr || (Gr = {}))
  const zr = 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed'
  function restoreSelectedTrack(e, s) {
    w.debug('MEDIA_TRACKS restoreSelectedTrack')
    const n = e.getPersistedTrack(),
      d = e.fields,
      h = s.currentTrack
    if (!n) return void w.debug('MEDIA_TRACKS no persisted track')
    if (h && trackEquals(h, n, d))
      return void w.debug('MEDIA_TRACKS persisted track is equal to current track, not setting')
    const p = s.tracks
    if (p && p.length)
      for (let y = 0; y < p.length; y++) {
        const e = p[y]
        if (
          (w.debug(`MEDIA_TRACKS testing track ${e.label} against persisted track ${JSON.stringify(n)}`),
          trackEquals(e, n, d))
        ) {
          w.debug('MEDIA_TRACKS found matching track ' + e.label), (s.currentTrack = e)
          break
        }
      }
  }
  function trackEquals(e, s, n) {
    let d = !0
    for (let h = 0; h < n.length; h++) {
      const p = n[h]
      if (e[p] !== s[p]) {
        d = !1
        break
      }
    }
    return d
  }
  class TrackPersistence {
    constructor(e, s) {
      ;(this.storageKey = e), (this.fields = s)
    }
    getPersistedTrack() {
      if (!window || !window.localStorage) return !1
      const e = window.localStorage.getItem(this.storageKey) || ''
      try {
        return JSON.parse(e)
      } catch (_t) {
        return w.warn('MEDIA_TRACK could not parse persisted value ' + e), !1
      }
    }
    setPersistedTrack(e) {
      if (!window || !window.localStorage) return
      if ((w.debug(`MEDIA_TRACK setPersistedTrack ${e.language},${e.label},${e.kind} with keys ${this.fields}`), !e))
        return void window.localStorage.setItem(this.storageKey, '')
      const s = JSON.stringify(this.extractFieldValuesFromTrack(e))
      w.debug('MEDIA_TRACK Extracted values ' + s), window.localStorage.setItem(this.storageKey, s)
    }
    extractFieldValuesFromTrack(e) {
      const s = {}
      return (
        this.fields.forEach((n) => {
          const d = e[n]
          null == d && w.warn(`MEDIA_TRACK No value for field ${n} on track ${JSON.stringify(e)}`), (s[n] = d)
        }),
        s
      )
    }
  }
  const { audioTrackAdded: qr, audioTrackChanged: Qr, audioTrackRemoved: Xr } = ar,
    { audioTracksSwitched: Jr, audioTracksUpdated: Zr } = Wr
  class AudioTrackManager {
    constructor(e, s, n) {
      if (
        ((this.mediaElement = e),
        (this.dispatcher = s),
        (this.extensionTracks = n),
        (this._extensionTracks = []),
        (this.trackPersistence = new TrackPersistence('mk-audio-track', ['label', 'language', 'kind'])),
        this.extensionTracks)
      ) {
        w.debug('MEDIA_TRACK Initializing audio track manager for hls track events'),
          (this.onExtensionAudioTracksUpdated = this.onExtensionAudioTracksUpdated.bind(this)),
          (this.onExtensionAudioTrackSwitched = this.onExtensionAudioTrackSwitched.bind(this))
        const e = this.extensionTracks
        e.addEventListener(Zr, this.onExtensionAudioTracksUpdated),
          e.addEventListener(Jr, this.onExtensionAudioTrackSwitched)
      } else {
        if (!e.audioTracks) return
        w.debug('MEDIA_TRACK Initializing audio track manager for native track events'),
          (this.onAudioTrackAdded = this.onAudioTrackAdded.bind(this)),
          (this.onAudioTrackChanged = this.onAudioTrackChanged.bind(this)),
          (this.onAudioTrackRemoved = this.onAudioTrackRemoved.bind(this)),
          e.audioTracks.addEventListener('addtrack', this.onAudioTrackAdded),
          e.audioTracks.addEventListener('change', this.onAudioTrackChanged),
          e.audioTracks.addEventListener('removetrack', this.onAudioTrackRemoved)
      }
    }
    get currentTrack() {
      return this.tracks.find((e) => e.enabled)
    }
    set currentTrack(e) {
      e &&
        (w.debug('MEDIA_TRACK Setting audio track ' + e.label),
        this.extensionTracks
          ? (w.debug(`MEDIA_TRACK Setting track on extension ${e.id}-${e.label}`),
            (this.extensionTracks.audioTrack = e))
          : (e.enabled = !0),
        this.trackPersistence.setPersistedTrack(e))
    }
    get tracks() {
      return this.extensionTracks
        ? this._extensionTracks || this.extensionTracks.audioTracks || []
        : Array.from(this.mediaElement.audioTracks)
    }
    destroy() {
      if (this.extensionTracks) {
        const e = this.extensionTracks
        e.removeEventListener(Zr, this.onExtensionAudioTracksUpdated),
          e.removeEventListener(Jr, this.onExtensionAudioTrackSwitched)
      } else {
        if (!this.mediaElement.audioTracks) return
        this.mediaElement.audioTracks.removeEventListener('addtrack', this.onAudioTrackAdded),
          this.mediaElement.audioTracks.removeEventListener('change', this.onAudioTrackChanged),
          this.mediaElement.audioTracks.removeEventListener('removetrack', this.onAudioTrackRemoved)
      }
    }
    restoreSelectedTrack() {
      return restoreSelectedTrack(this.trackPersistence, this)
    }
    onExtensionAudioTracksUpdated(e) {
      w.debug('MEDIA_TRACK Extension audio tracks updated ' + JSON.stringify(e)),
        (this._extensionTracks = e),
        this.restoreSelectedTrack(),
        this.dispatcher.publish(qr, e)
    }
    onExtensionAudioTrackSwitched(e) {
      if ((w.debug('MEDIA_TRACK Extension audio track switched ' + JSON.stringify(e)), this._extensionTracks)) {
        const preserveSelectedTrack = (s) => {
          s.enabled = e.selectedId === s.id
        }
        this._extensionTracks.forEach(preserveSelectedTrack)
      }
      this.dispatcher.publish(Qr, e)
    }
    onAudioTrackAdded(e) {
      !(function (e, s, n) {
        const d = s.getPersistedTrack()
        d &&
          trackEquals(e, d, s.fields) &&
          (w.debug('MEDIA_TRACK onTrackAdded with track that matches persisted track ' + e.label), (n.currentTrack = e))
      })(e.track, this.trackPersistence, this),
        this.dispatcher.publish(qr, e)
    }
    onAudioTrackChanged(e) {
      this.dispatcher.publish(Qr, e)
    }
    onAudioTrackRemoved(e) {
      this.dispatcher.publish(Xr, e)
    }
  }
  const es = document.createElement('video'),
    ts = [],
    is = []
  function deferPlayback() {
    fillAvailableElements('audio', is),
      fillAvailableElements('video', ts),
      w.debug(
        `dom-helpers: defer playback called.  There are ${ts.length} available video elements and ${is.length} available audio elements.`
      )
  }
  function fillAvailableElements(e, s) {
    let n = 100 - s.length
    for (; n > 0; ) {
      const d = document.createElement(e)
      d.load(), s.push(d), n--
    }
  }
  var rs = createCommonjsModule(function (e, s) {
    Object.defineProperty(s, '__esModule', { value: !0 }),
      (s.isValidPercentValue = function (e) {
        return 'number' == typeof e && e >= 0 && e <= 100
      }),
      (s.isValidAlignSetting = function (e) {
        return 'string' == typeof e && ['start', 'center', 'end', 'left', 'right', 'middle'].includes(e)
      }),
      (s.isValidDirectionSetting = function (e) {
        return 'string' == typeof e && ['', 'rl', 'lr'].includes(e)
      }),
      (s.isValidLineAndPositionSetting = function (e) {
        return 'number' == typeof e || 'auto' === e
      }),
      (s.isValidLineAlignSetting = function (e) {
        return 'string' == typeof e && ['start', 'center', 'end'].includes(e)
      }),
      (s.isValidPositionAlignSetting = function (e) {
        return (
          'string' == typeof e &&
          ['line-left', 'center', 'line-right', 'auto', 'left', 'start', 'middle', 'end', 'right'].includes(e)
        )
      }),
      (s.isValidScrollSetting = function (e) {
        return ['', 'up'].includes(e)
      })
  })
  unwrapExports(rs),
    rs.isValidPercentValue,
    rs.isValidAlignSetting,
    rs.isValidDirectionSetting,
    rs.isValidLineAndPositionSetting,
    rs.isValidLineAlignSetting,
    rs.isValidPositionAlignSetting,
    rs.isValidScrollSetting
  var ss = createCommonjsModule(function (e, s) {
    Object.defineProperty(s, '__esModule', { value: !0 })
    const n = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&lrm;': '‎', '&rlm;': '‏', '&nbsp;': ' ' },
      d = { c: 'span', i: 'i', b: 'b', u: 'u', ruby: 'ruby', rt: 'rt', v: 'span', lang: 'span' },
      h = { v: 'title', lang: 'lang' },
      p = { rt: 'ruby' },
      y = { 'text-combine-upright': '-webkit-text-combine:horizontal; text-orientation: mixed;' }
    class ParserUtility {
      static parseTimeStamp(e) {
        function computeSeconds(e) {
          const [s, n, d, h] = e.map((e) => (e ? parseInt('' + e) : 0))
          return 3600 * s + 60 * n + d + h / 1e3
        }
        const s = /^(\d+):(\d{2})(:\d{2})?\.(\d{3})/.exec(e)
        return s
          ? s[3]
            ? computeSeconds([s[1], s[2], s[3].substring(1), s[4]])
            : parseInt(s[1]) > 59
            ? computeSeconds([s[1], s[2], null, s[4]])
            : computeSeconds([null, s[1], s[2], s[4]])
          : null
      }
      static parseContent(e, s, m) {
        let g = s.text
        function nextToken() {
          if (!g) return null
          const e = /^([^<]*)(<[^>]+>?)?/.exec(g)
          return (s = e[1] ? e[1] : e[2]), (g = g.substr(s.length)), s
          var s
        }
        function unescape1(e) {
          return n[e]
        }
        function unescape(e) {
          return e.replace(/&(amp|lt|gt|lrm|rlm|nbsp);/g, unescape1)
        }
        function shouldAdd(e, s) {
          return !p[s.dataset.localName] || p[s.dataset.localName] === e.dataset.localName
        }
        function createElement(s, n, p) {
          const g = d[s]
          if (!g) return null
          const v = e.document.createElement(g)
          v.dataset.localName = g
          const _ = h[s]
          if ((_ && p && (v[_] = p.trim()), n))
            if (m[n]) {
              const e = (function (e) {
                let s = ''
                for (const n in e) s += y[n] ? y[n] : n + ':' + e[n] + ';'
                return s
              })(m[n])
              v.setAttribute('style', e)
            } else console.info(`WebVTT: parseContent: Style referenced, but no style defined for '${n}'!`)
          return v
        }
        const v = e.document.createElement('div'),
          _ = []
        let b,
          T,
          E = v
        for (; null !== (b = nextToken()); )
          if ('<' !== b[0]) E.appendChild(e.document.createTextNode(unescape(b)))
          else {
            if ('/' === b[1]) {
              _.length && _[_.length - 1] === b.substr(2).replace('>', '') && (_.pop(), (E = E.parentNode))
              continue
            }
            const s = ParserUtility.parseTimeStamp(b.substr(1, b.length - 2))
            let n
            if (s) {
              ;(n = e.document.createProcessingInstruction('timestamp', s.toString())), E.appendChild(n)
              continue
            }
            if (((T = /^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/.exec(b)), !T)) continue
            if (((n = createElement(T[1], T[2], T[3])), !n)) continue
            if (!shouldAdd(E, n)) continue
            T[2], _.push(T[1]), E.appendChild(n), (E = n)
          }
        return v
      }
    }
    s.default = ParserUtility
  })
  unwrapExports(ss)
  var ns = createCommonjsModule(function (e, s) {
    var n =
      (G && G.__decorate) ||
      function (e, s, n, d) {
        var h,
          p = arguments.length,
          y = p < 3 ? s : null === d ? (d = Object.getOwnPropertyDescriptor(s, n)) : d
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) y = Reflect.decorate(e, s, n, d)
        else
          for (var m = e.length - 1; m >= 0; m--) (h = e[m]) && (y = (p < 3 ? h(y) : p > 3 ? h(s, n, y) : h(s, n)) || y)
        return p > 3 && y && Object.defineProperty(s, n, y), y
      }
    Object.defineProperty(s, '__esModule', { value: !0 })
    let d = class {
      constructor(e, s, n) {
        ;(this._id = ''),
          (this._pauseOnExit = !1),
          (this._region = null),
          (this._vertical = ''),
          (this._snapToLines = !0),
          (this._line = 'auto'),
          (this._lineAlign = 'start'),
          (this._position = 50),
          (this._positionAlign = 'center'),
          (this._size = 50),
          (this._align = 'center'),
          (this.hasBeenReset = !1),
          (this._startTime = e),
          (this._endTime = s),
          (this._text = n)
      }
      get id() {
        return this._id
      }
      set id(e) {
        this._id = '' + e
      }
      get pauseOnExit() {
        return this._pauseOnExit
      }
      set pauseOnExit(e) {
        this._pauseOnExit = !!e
      }
      get startTime() {
        return this._startTime
      }
      set startTime(e) {
        if ('number' != typeof e) throw new TypeError('Start time must be set to a number: ' + e)
        ;(this._startTime = e), (this.hasBeenReset = !0)
      }
      get endTime() {
        return this._endTime
      }
      set endTime(e) {
        if ('number' != typeof e) throw new TypeError('End time must be set to a number: ' + e)
        ;(this._endTime = e), (this.hasBeenReset = !0)
      }
      get text() {
        return this._text
      }
      set text(e) {
        ;(this._text = '' + e), (this.hasBeenReset = !0)
      }
      get region() {
        return this._region
      }
      set region(e) {
        ;(this._region = e), (this.hasBeenReset = !0)
      }
      get vertical() {
        return this._vertical
      }
      set vertical(e) {
        if (!rs.isValidDirectionSetting(e))
          throw new SyntaxError('An invalid or illegal string was specified for vertical: ' + e)
        ;(this._vertical = e), (this.hasBeenReset = !0)
      }
      get snapToLines() {
        return this._snapToLines
      }
      set snapToLines(e) {
        ;(this._snapToLines = !!e), (this.hasBeenReset = !0)
      }
      get line() {
        return this._line
      }
      set line(e) {
        if (!rs.isValidLineAndPositionSetting(e))
          throw new SyntaxError('An invalid number or illegal string was specified for line: ' + e)
        ;(this._line = e), (this.hasBeenReset = !0)
      }
      get lineAlign() {
        return this._lineAlign
      }
      set lineAlign(e) {
        if (!rs.isValidLineAlignSetting(e))
          throw new SyntaxError('An invalid or illegal string was specified for lineAlign: ' + e)
        ;(this._lineAlign = e), (this.hasBeenReset = !0)
      }
      get position() {
        return this._position
      }
      set position(e) {
        if (!rs.isValidLineAndPositionSetting(e)) throw new Error('Position must be between 0 and 100 or auto: ' + e)
        ;(this._position = e), (this.hasBeenReset = !0)
      }
      get positionAlign() {
        return this._positionAlign
      }
      set positionAlign(e) {
        if (!rs.isValidPositionAlignSetting(e))
          throw new SyntaxError('An invalid or illegal string was specified for positionAlign: ' + e)
        ;(this._positionAlign = e), (this.hasBeenReset = !0)
      }
      get size() {
        return this._size
      }
      set size(e) {
        if (e < 0 || e > 100) throw new Error('Size must be between 0 and 100: ' + e)
        ;(this._size = e), (this.hasBeenReset = !0)
      }
      get align() {
        return this._align
      }
      set align(e) {
        if (!rs.isValidAlignSetting(e))
          throw new SyntaxError('An invalid or illegal string was specified for align: ' + e)
        ;(this._align = e), (this.hasBeenReset = !0)
      }
      getCueAsHTML() {
        return ss.default.parseContent(window, this, {})
      }
      static create(e) {
        if (!e.hasOwnProperty('startTime') || !e.hasOwnProperty('endTime') || !e.hasOwnProperty('text'))
          throw new Error('You must at least have start time, end time, and text.')
        const s = new this(e.startTime, e.endTime, e.text)
        return (
          Object.keys(e).forEach((n) => {
            s.hasOwnProperty(n) && (s[n] = e[n])
          }),
          s
        )
      }
      static fromJSON(e) {
        return this.create(JSON.parse(e))
      }
      toJSON() {
        const e = {}
        return (
          Object.keys(this).forEach((s) => {
            this.hasOwnProperty(s) &&
              'getCueAsHTML' !== s &&
              'hasBeenReset' !== s &&
              'displayState' !== s &&
              (e[s] = this[s])
          }),
          e
        )
      }
    }
    ;(d = n(
      [
        function (e) {
          let s = e
          'undefined' != typeof window &&
            null != window.VTTCue &&
            ((s = window.VTTCue),
            (s.create = e.create),
            (s.fromJSON = e.fromJSON),
            (s.prototype.toJSON = e.prototype.toJSON))
          return s
        },
      ],
      d
    )),
      (s.VTTCue = d)
  })
  unwrapExports(ns), ns.VTTCue
  var as = createCommonjsModule(function (e, s) {
    var n =
      (G && G.__decorate) ||
      function (e, s, n, d) {
        var h,
          p = arguments.length,
          y = p < 3 ? s : null === d ? (d = Object.getOwnPropertyDescriptor(s, n)) : d
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) y = Reflect.decorate(e, s, n, d)
        else
          for (var m = e.length - 1; m >= 0; m--) (h = e[m]) && (y = (p < 3 ? h(y) : p > 3 ? h(s, n, y) : h(s, n)) || y)
        return p > 3 && y && Object.defineProperty(s, n, y), y
      }
    Object.defineProperty(s, '__esModule', { value: !0 })
    let d = class {
      constructor() {
        ;(this._id = ''),
          (this._lines = 3),
          (this._regionAnchorX = 0),
          (this._regionAnchorY = 100),
          (this._scroll = ''),
          (this._viewportAnchorX = 0),
          (this._viewportAnchorY = 100),
          (this._width = 100)
      }
      get id() {
        return this._id
      }
      set id(e) {
        if ('string' != typeof e) throw new Error('ID must be a string.')
        this._id = e
      }
      get lines() {
        return this._lines
      }
      set lines(e) {
        if ('number' != typeof e) throw new TypeError('Lines must be set to a number.')
        this._lines = e
      }
      get regionAnchorX() {
        return this._regionAnchorX
      }
      set regionAnchorX(e) {
        if (!rs.isValidPercentValue(e)) throw new TypeError('RegionAnchorX must be between 0 and 100.')
        this._regionAnchorX = e
      }
      get regionAnchorY() {
        return this._regionAnchorY
      }
      set regionAnchorY(e) {
        if (!rs.isValidPercentValue(e)) throw new TypeError('RegionAnchorY must be between 0 and 100.')
        this._regionAnchorY = e
      }
      get scroll() {
        return this._scroll
      }
      set scroll(e) {
        if ('string' == typeof e) {
          const s = e.toLowerCase()
          if (rs.isValidScrollSetting(s)) return void (this._scroll = s)
        }
        throw new SyntaxError('An invalid or illegal string was specified.')
      }
      get viewportAnchorX() {
        return this._viewportAnchorX
      }
      set viewportAnchorX(e) {
        if (!rs.isValidPercentValue(e)) throw new TypeError('ViewportAnchorX must be between 0 and 100.')
        this._viewportAnchorX = e
      }
      get viewportAnchorY() {
        return this._viewportAnchorY
      }
      set viewportAnchorY(e) {
        if (!rs.isValidPercentValue(e)) throw new TypeError('ViewportAnchorY must be between 0 and 100.')
        this._viewportAnchorY = e
      }
      get width() {
        return this._width
      }
      set width(e) {
        if (!rs.isValidPercentValue(e)) throw new TypeError('Width must be between 0 and 100.')
        this._lines = e
      }
      toJSON() {
        const e = {}
        return (
          Object.keys(this).forEach((s) => {
            this.hasOwnProperty(s) && (e[s] = this[s])
          }),
          e
        )
      }
      static create(e) {
        const s = new this()
        return (
          Object.keys(e).forEach((n) => {
            s.hasOwnProperty(n) && (s[n] = e[n])
          }),
          s
        )
      }
      static fromJSON(e) {
        return this.create(JSON.parse(e))
      }
    }
    ;(d = n(
      [
        function (e) {
          let s = e
          'undefined' != typeof window &&
            null != window.VTTRegion &&
            ((s = window.VTTRegion),
            (s.create = e.create),
            (s.fromJSON = e.fromJSON),
            (s.prototype.toJSON = e.prototype.toJSON))
          return s
        },
      ],
      d
    )),
      (s.VTTRegion = d)
  })
  unwrapExports(as), as.VTTRegion
  var ds = createCommonjsModule(function (e, s) {
    Object.defineProperty(s, '__esModule', { value: !0 }), (s.VTTCue = ns.VTTCue), (s.VTTRegion = as.VTTRegion)
    class ParsingError extends Error {
      constructor(e, s) {
        super(),
          (this.name = 'ParsingError'),
          (this.code = 'number' == typeof e ? e : e.code),
          s ? (this.message = s) : e instanceof ParsingError && (this.message = e.message)
      }
    }
    ;(s.ParsingError = ParsingError),
      (ParsingError.Errors = {
        BadSignature: new ParsingError(0, 'Malformed WebVTT signature.'),
        BadTimeStamp: new ParsingError(1, 'Malformed time stamp.'),
      })
    class Settings {
      constructor() {
        this.values = {}
      }
      set(e, s) {
        this.get(e) || '' === s || (this.values[e] = s)
      }
      get(e, s, n) {
        return 'object' == typeof s && 'string' == typeof n
          ? this.has(e)
            ? this.values[e]
            : s[n]
          : this.has(e)
          ? this.values[e]
          : s
      }
      has(e) {
        return e in this.values
      }
      alt(e, s, n) {
        for (let d = 0; d < n.length; ++d)
          if (s === n[d]) {
            this.set(e, s)
            break
          }
      }
      integer(e, s) {
        ;/^-?\d+$/.test(s) && this.set(e, parseInt(s, 10))
      }
      percent(e, s) {
        if (s.match(/^([\d]{1,3})(\.[\d]*)?%$/))
          try {
            const n = parseFloat(s)
            if (n >= 0 && n <= 100) return this.set(e, n), !0
          } catch (Vo) {
            return !1
          }
        return !1
      }
    }
    class WebVTTParser {
      constructor(e, s, n) {
        ;(this.window = e),
          (this.state = 'INITIAL'),
          (this.buffer = ''),
          (this.decoder = s || new TextDecoder('utf8')),
          (this.regionList = []),
          (this.onStylesParsedCallback = n),
          (this._styles = {})
      }
      static StringDecoder() {
        return {
          decode: (e) => {
            if (!e) return ''
            if ('string' != typeof e) throw new Error('Error - expected string data.')
            return decodeURIComponent(encodeURIComponent(e))
          },
        }
      }
      reportOrThrowError(e) {
        if (!(e instanceof ParsingError && 'function' == typeof this.onparsingerror)) throw e
        this.onparsingerror(e)
      }
      parseOptions(e, s, n, d) {
        const h = d ? e.split(d) : [e]
        for (const p of h) {
          if ('string' != typeof p) continue
          const e = p.split(n)
          if (2 !== e.length) continue
          s(e[0], e[1])
        }
      }
      parseCue(e, s, n) {
        const d = e,
          consumeTimeStamp = () => {
            const s = ss.default.parseTimeStamp(e)
            if (null === s) throw new ParsingError(ParsingError.Errors.BadTimeStamp, 'Malformed timestamp: ' + d)
            return (e = e.replace(/^[^\sa-zA-Z-]+/, '')), s
          },
          skipWhitespace = () => {
            e = e.replace(/^\s+/, '')
          }
        if ((skipWhitespace(), (s.startTime = consumeTimeStamp()), skipWhitespace(), '--\x3e' !== e.substr(0, 3)))
          throw new ParsingError(
            ParsingError.Errors.BadTimeStamp,
            "Malformed time stamp (time stamps must be separated by '--\x3e'): " + d
          )
        ;(e = e.substr(3)),
          skipWhitespace(),
          (s.endTime = consumeTimeStamp()),
          skipWhitespace(),
          ((e, s) => {
            const d = new Settings()
            this.parseOptions(
              e,
              (e, s) => {
                let h, p
                switch (e) {
                  case 'region':
                    for (let h = n.length - 1; h >= 0; h--)
                      if (n[h].id === s) {
                        d.set(e, n[h].region)
                        break
                      }
                    break
                  case 'vertical':
                    d.alt(e, s, ['rl', 'lr'])
                    break
                  case 'line':
                    ;(h = s.split(',')),
                      (p = h[0]),
                      d.integer(e, p),
                      d.percent(e, p) && d.set('snapToLines', !1),
                      d.alt(e, p, ['auto']),
                      2 === h.length && d.alt('lineAlign', h[1], ['start', 'center', 'end'])
                    break
                  case 'position':
                    if (((h = s.split(',')), d.percent(e, h[0]), 2 === h.length)) {
                      let e = ['line-left', 'line-right', 'center', 'auto', 'left', 'start', 'middle', 'end', 'right']
                      d.alt('positionAlign', h[1], e)
                    }
                    break
                  case 'size':
                    d.percent(e, s)
                    break
                  case 'align':
                    let y = ['start', 'center', 'end', 'left', 'right', 'middle']
                    d.alt(e, s, y)
                }
              },
              /:/,
              /\s/
            ),
              (s.region = d.get('region', null)),
              (s.vertical = d.get('vertical', '')),
              (s.line = d.get('line', void 0 === s.line ? 'auto' : s.line)),
              (s.lineAlign = d.get('lineAlign', 'start')),
              (s.snapToLines = d.get('snapToLines', !0)),
              (s.size = d.get('size', 100))
            let h = d.get('align', 'center')
            ;(s.align = 'middle' === h ? 'center' : h), (s.position = d.get('position', 'auto'))
            let p = d.get(
              'positionAlign',
              { start: 'start', left: 'start', center: 'center', right: 'end', end: 'end' },
              s.align
            )
            s.positionAlign = {
              start: 'start',
              'line-left': 'start',
              left: 'start',
              center: 'center',
              middle: 'center',
              'line-right': 'end',
              right: 'end',
              end: 'end',
            }[p]
          })(e, s)
      }
      parseRegion(e) {
        const s = new Settings()
        if (
          (this.parseOptions(
            e,
            (e, n) => {
              switch (e) {
                case 'id':
                  s.set(e, n)
                  break
                case 'width':
                  s.percent(e, n)
                  break
                case 'lines':
                  s.integer(e, n)
                  break
                case 'regionanchor':
                case 'viewportanchor': {
                  const d = n.split(',')
                  if (2 !== d.length) break
                  const h = new Settings()
                  if ((h.percent('x', d[0]), h.percent('y', d[1]), !h.has('x') || !h.has('y'))) break
                  s.set(e + 'X', h.get('x')), s.set(e + 'Y', h.get('y'))
                  break
                }
                case 'scroll':
                  s.alt(e, n, ['up'])
              }
            },
            /=/,
            /\s/
          ),
          s.has('id'))
        ) {
          const e = new as.VTTRegion()
          ;(e.width = s.get('width', 100)),
            (e.lines = s.get('lines', 3)),
            (e.regionAnchorX = s.get('regionanchorX', 0)),
            (e.regionAnchorY = s.get('regionanchorY', 100)),
            (e.viewportAnchorX = s.get('viewportanchorX', 0)),
            (e.viewportAnchorY = s.get('viewportanchorY', 100)),
            (e.scroll = s.get('scroll', '')),
            this.onregion && this.onregion(e),
            this.regionList.push({ id: s.get('id'), region: e })
        }
      }
      parseStyle(e) {
        const parseStyles = (e) => {
            const s = {},
              n = e.split(';')
            for (let d = 0; d < n.length; d++) {
              const e = n[d].split(':', 2),
                h = e[0].trim(),
                p = e[1].trim()
              '' !== h && '' !== p && (s[h] = p)
            }
            return s
          },
          s = e.replace(' ', '').split('}')
        s.pop()
        for (const n of s) {
          let e = null,
            s = null
          const d = n.split('{')
          d[0] && (e = d[0].trim()), d[1] && (s = parseStyles(d[1])), e && s && (this._styles[e] = s)
        }
        this.onStylesParsedCallback && this.onStylesParsedCallback(this._styles)
      }
      parseHeader(e) {
        this.parseOptions(
          e,
          function (e, s) {
            switch (e) {
              case 'Region':
                this.parseRegion(s)
            }
          },
          /:/
        )
      }
      parse(e) {
        e && (this.buffer += this.decoder.decode(e, { stream: !0 }))
        const collectNextLine = () => {
          const e = this.buffer
          let s = 0
          const calculateBreakPosition = (e, s) => {
            const n = { start: -1, length: -1 }
            if ('\r' === e[s]) (n.start = s), (n.length = 1)
            else if ('\n' === e[s]) (n.start = s), (n.length = 1)
            else if ('<' === e[s] && s + 1 < e.length && 'b' === e[s + 1] && s + 2 < e.length && 'r' === e[s + 2]) {
              let d = s + 2
              for (; d < e.length && '>' !== e[d++]; );
              ;(n.start = s), (n.length = d - s)
            }
            return n
          }
          let n = { start: e.length, length: 0 }
          for (; s < e.length; ) {
            const d = calculateBreakPosition(e, s)
            if (d.length > 0) {
              n = d
              break
            }
            ++s
          }
          const d = e.substr(0, n.start)
          return (this.buffer = e.substr(n.start + n.length)), d
        }
        try {
          let e
          if (((this.styleCollector = ''), 'INITIAL' === this.state)) {
            if (!/\r\n|\n/.test(this.buffer)) return this
            e = collectNextLine()
            const s = /^(ï»¿)?WEBVTT([ \t].*)?$/.exec(e)
            if (!s || !s[0]) throw new ParsingError(ParsingError.Errors.BadSignature)
            this.state = 'HEADER'
          }
          let s = !1
          for (; this.buffer; ) {
            if (!/\r\n|\n/.test(this.buffer)) return this
            switch ((s ? (s = !1) : (e = collectNextLine()), this.state)) {
              case 'HEADER':
                e.includes(':') ? this.parseHeader(e) : e || (this.state = 'ID')
                continue
              case 'NOTE':
                e || (this.state = 'ID')
                continue
              case 'STYLE':
                e
                  ? (this.styleCollector += e)
                  : (this.parseStyle(this.styleCollector), (this.state = 'ID'), (this.styleCollector = ''))
                continue
              case 'ID':
                if (/^NOTE($|[ \t])/.test(e)) {
                  this.state = 'NOTE'
                  break
                }
                if (/^STYLE($|[ \t])/.test(e)) {
                  this.state = 'STYLE'
                  break
                }
                if (!e) continue
                if (((this.cue = new ns.VTTCue(0, 0, '')), (this.state = 'CUE'), !e.includes('--\x3e'))) {
                  this.cue.id = e
                  continue
                }
              case 'CUE':
                try {
                  this.parseCue(e, this.cue, this.regionList)
                } catch (_t) {
                  this.reportOrThrowError(_t), (this.cue = null), (this.state = 'BADCUE')
                  continue
                }
                this.state = 'CUETEXT'
                continue
              case 'CUETEXT': {
                const n = e.includes('--\x3e')
                if (!e || n) {
                  ;(s = !0), this.oncue && this.oncue(this.cue), (this.cue = null), (this.state = 'ID')
                  continue
                }
                this.cue.text && (this.cue.text += '\n'), (this.cue.text += e)
                continue
              }
              case 'BADCUE':
                e || (this.state = 'ID')
                continue
            }
          }
        } catch (_t) {
          this.reportOrThrowError(_t),
            'CUETEXT' === this.state && this.cue && this.oncue && this.oncue(this.cue),
            (this.cue = null),
            (this.state = 'INITIAL' === this.state ? 'BADWEBVTT' : 'BADCUE')
        }
        return this
      }
      flush() {
        try {
          if (
            ((this.buffer += this.decoder.decode()),
            (this.cue || 'HEADER' === this.state) && ((this.buffer += '\n\n'), this.parse()),
            'INITIAL' === this.state)
          )
            throw new ParsingError(ParsingError.Errors.BadSignature)
        } catch (_t) {
          this.reportOrThrowError(_t)
        }
        return this.onflush && this.onflush(), this
      }
      styles() {
        return this._styles
      }
    }
    ;(s.default = WebVTTParser), (s.WebVTTParser = WebVTTParser)
  })
  unwrapExports(ds), ds.VTTCue, ds.VTTRegion, ds.ParsingError, ds.WebVTTParser
  var ls = createCommonjsModule(function (e, s) {
    Object.defineProperty(s, '__esModule', { value: !0 }), (s.VTTCue = ns.VTTCue)
    const n = [/^(::cue\()(\..*)(\))/, /^(::cue\()(#.*)(\))/, /^(::cue\()(c|i|b|u|ruby|rt|v|lang)(\))/],
      d = [
        [1470, 1470],
        [1472, 1472],
        [1475, 1475],
        [1478, 1478],
        [1488, 1514],
        [1520, 1524],
        [1544, 1544],
        [1547, 1547],
        [1549, 1549],
        [1563, 1563],
        [1566, 1610],
        [1645, 1647],
        [1649, 1749],
        [1765, 1766],
        [1774, 1775],
        [1786, 1805],
        [1807, 1808],
        [1810, 1839],
        [1869, 1957],
        [1969, 1969],
        [1984, 2026],
        [2036, 2037],
        [2042, 2042],
        [2048, 2069],
        [2074, 2074],
        [2084, 2084],
        [2088, 2088],
        [2096, 2110],
        [2112, 2136],
        [2142, 2142],
        [2208, 2208],
        [2210, 2220],
        [8207, 8207],
        [64285, 64285],
        [64287, 64296],
        [64298, 64310],
        [64312, 64316],
        [64318, 64318],
        [64320, 64321],
        [64323, 64324],
        [64326, 64449],
        [64467, 64829],
        [64848, 64911],
        [64914, 64967],
        [65008, 65020],
        [65136, 65140],
        [65142, 65276],
        [67584, 67589],
        [67592, 67592],
        [67594, 67637],
        [67639, 67640],
        [67644, 67644],
        [67647, 67669],
        [67671, 67679],
        [67840, 67867],
        [67872, 67897],
        [67903, 67903],
        [67968, 68023],
        [68030, 68031],
        [68096, 68096],
        [68112, 68115],
        [68117, 68119],
        [68121, 68147],
        [68160, 68167],
        [68176, 68184],
        [68192, 68223],
        [68352, 68405],
        [68416, 68437],
        [68440, 68466],
        [68472, 68479],
        [68608, 68680],
        [126464, 126467],
        [126469, 126495],
        [126497, 126498],
        [126500, 126500],
        [126503, 126503],
        [126505, 126514],
        [126516, 126519],
        [126521, 126521],
        [126523, 126523],
        [126530, 126530],
        [126535, 126535],
        [126537, 126537],
        [126539, 126539],
        [126541, 126543],
        [126545, 126546],
        [126548, 126548],
        [126551, 126551],
        [126553, 126553],
        [126555, 126555],
        [126557, 126557],
        [126559, 126559],
        [126561, 126562],
        [126564, 126564],
        [126567, 126570],
        [126572, 126578],
        [126580, 126583],
        [126585, 126588],
        [126590, 126590],
        [126592, 126601],
        [126603, 126619],
        [126625, 126627],
        [126629, 126633],
        [126635, 126651],
        [1114109, 1114109],
      ]
    class StyleBox {
      applyStyles(e, s) {
        s = s || this.div
        for (const n in e) e.hasOwnProperty(n) && (s.style[n] = e[n])
      }
      formatStyle(e, s) {
        return 0 === e ? '0' : e + s
      }
    }
    s.StyleBox = StyleBox
    class CueStyleBox extends StyleBox {
      constructor(e, s, n, d, h) {
        super(), (this.cue = s)
        let p = {
          textAlign:
            {
              start: 'left',
              'line-left': 'left',
              left: 'left',
              center: 'center',
              middle: 'center',
              'line-right': 'right',
              right: 'right',
              end: 'right',
            }[s.positionAlign] || s.align,
          whiteSpace: 'pre-line',
          position: 'absolute',
        }
        ;(p.direction = this.determineBidi(this.cueDiv)),
          (p.writingMode = this.directionSettingToWritingMode(s.vertical)),
          (p.unicodeBidi = 'plaintext'),
          (this.div = e.document.createElement('div')),
          this.applyStyles(p),
          (p = { backgroundColor: d.backgroundColor, display: 'inline-block' }),
          this.parseOpacity(p.backgroundColor) && ((p.padding = '5px'), (p.borderRadius = '5px')),
          (this.backgroundDiv = e.document.createElement('div')),
          this.applyStyles(p, this.backgroundDiv),
          (p = {
            color: n.color,
            backgroundColor: n.backgroundColor,
            textShadow: n.textShadow,
            fontSize: n.fontSize,
            fontFamily: n.fontFamily,
            position: 'relative',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            display: 'inline-block',
            textOrientation: 'upright',
          }),
          (p.writingMode = this.directionSettingToWritingMode(s.vertical)),
          (p.unicodeBidi = 'plaintext'),
          (this.cueDiv = ss.default.parseContent(e, s, h)),
          this.applyStyles(p, this.cueDiv),
          this.backgroundDiv.appendChild(this.cueDiv),
          this.div.appendChild(this.backgroundDiv)
        let y = 0
        if ('number' == typeof s.position) {
          let e = s.positionAlign || s.align
          if (e)
            switch (e) {
              case 'start':
              case 'left':
                y = s.position
                break
              case 'center':
              case 'middle':
                y = s.position - s.size / 2
                break
              case 'end':
              case 'right':
                y = s.position - s.size
            }
        }
        '' === s.vertical
          ? this.applyStyles({ left: this.formatStyle(y, '%'), width: this.formatStyle(s.size, '%') })
          : this.applyStyles({ top: this.formatStyle(y, '%'), height: this.formatStyle(s.size, '%') })
      }
      determineBidi(e) {
        let s,
          n = [],
          h = ''
        if (!e || !e.childNodes) return 'ltr'
        function pushNodes(e, s) {
          for (let n = s.childNodes.length - 1; n >= 0; n--) e.push(s.childNodes[n])
        }
        function nextTextNode(e) {
          if (!e || !e.length) return null
          let s = e.pop(),
            n = s.textContent || s.innerText
          if (n) {
            const s = /^.*(\n|\r)/.exec(n)
            return s ? ((e.length = 0), s[0]) : n
          }
          return 'ruby' === s.tagName ? nextTextNode(e) : s.childNodes ? (pushNodes(e, s), nextTextNode(e)) : void 0
        }
        function isContainedInCharacterList(e, s) {
          for (const n of s) if (e >= n[0] && e <= n[1]) return !0
          return !1
        }
        for (pushNodes(n, e); (h = nextTextNode(n)); )
          for (let e = 0; e < h.length; e++) if (((s = h.charCodeAt(e)), isContainedInCharacterList(s, d))) return 'rtl'
        return 'ltr'
      }
      parseOpacity(e) {
        if (!e || 'string' != typeof e) return null
        const s = (e = e.replace(/ /g, '').replace('rgba(', '').replace(')', '')).split(',')
        return s && s.length >= 4 ? s[3] : null
      }
      directionSettingToWritingMode(e) {
        return '' === e ? 'horizontal-tb' : 'lr' === e ? 'vertical-lr' : 'vertical-rl'
      }
      move(e) {
        this.applyStyles({
          top: this.formatStyle(e.top, 'px'),
          bottom: this.formatStyle(e.bottom, 'px'),
          left: this.formatStyle(e.left, 'px'),
          right: this.formatStyle(e.right, 'px'),
          height: this.formatStyle(e.height, 'px'),
          width: this.formatStyle(e.width, 'px'),
        })
      }
    }
    s.CueStyleBox = CueStyleBox
    class BoxPosition {
      constructor(e) {
        var s
        let n, d, h, p, y, m
        if (
          (e instanceof CueStyleBox && e.cue
            ? (s = e.cue) && '' !== s.vertical
              ? (this.property = 'width')
              : (this.property = 'height')
            : e instanceof BoxPosition && (this.property = e.property || 'height'),
          e instanceof CueStyleBox && e.div)
        ) {
          ;(h = e.div.offsetHeight), (p = e.div.offsetWidth), (y = e.div.offsetTop)
          const s = e.div.firstChild
          if (
            ((m = s ? s.getBoundingClientRect() : e.div.getBoundingClientRect()),
            (n = (m && m[this.property]) || null),
            s && s.firstChild)
          ) {
            const e = s.firstChild
            if (e && 'string' == typeof e.textContent) {
              d = n / this.calculateNewLines(e.textContent)
            }
          }
        } else e instanceof BoxPosition && (m = e)
        ;(this.left = m.left),
          (this.right = m.right),
          (this.top = m.top || y),
          (this.height = m.height || h),
          (this.bottom = m.bottom || y + (m.height || h)),
          (this.width = m.width || p),
          (this.lineHeight = null !== n ? n : m.lineHeight),
          (this.singleLineHeight = null !== d ? d : m.singleLineHeight),
          this.singleLineHeight || (this.singleLineHeight = 41)
      }
      calculateNewLines(e) {
        let s = 1
        for (let n = 0; n < e.length; n++) '\n' === e[n] && s++
        return s
      }
      move(e, s) {
        switch (((s = void 0 !== s ? s : this.singleLineHeight), e)) {
          case '+x':
            ;(this.left += s), (this.right += s)
            break
          case '-x':
            ;(this.left -= s), (this.right -= s)
            break
          case '+y':
            ;(this.top += s), (this.bottom += s)
            break
          case '-y':
            ;(this.top -= s), (this.bottom -= s)
        }
      }
      overlaps(e) {
        return this.left < e.right && this.right > e.left && this.top < e.bottom && this.bottom > e.top
      }
      overlapsAny(e) {
        for (const s of e) if (this.overlaps(s)) return !0
        return !1
      }
      within(e) {
        return this.top >= e.top && this.bottom <= e.bottom && this.left >= e.left && this.right <= e.right
      }
      moveIfOutOfBounds(e, s) {
        switch (s) {
          case '+x':
            this.left < e.left && ((this.left = e.left), (this.right = this.left + this.width))
            break
          case '-x':
            this.right > e.right && ((this.right = e.right), (this.left = this.right - this.width))
            break
          case '+y':
            this.top < e.top && ((this.top = e.top), (this.bottom = this.top + this.height))
            break
          case '-y':
            this.bottom > e.bottom && ((this.bottom = e.bottom), (this.top = this.bottom - this.height))
        }
      }
      toCSSCompatValues(e) {
        return {
          top: this.top - e.top,
          bottom: e.bottom - this.bottom,
          left: this.left - e.left,
          right: e.right - this.right,
          height: this.height,
          width: this.width,
        }
      }
      static getSimpleBoxPosition(e) {
        let s = null
        e instanceof StyleBox && e.div ? (s = e.div) : e instanceof HTMLElement && (s = e)
        let n = s.offsetHeight || 0,
          d = s.offsetWidth || 0,
          h = s.offsetTop || 0,
          p = h + n,
          y = s.getBoundingClientRect()
        const { left: m, right: g } = y
        return (
          y.top && (h = y.top),
          y.height && (n = y.height),
          y.width && (d = y.width),
          y.bottom && (p = y.bottom),
          { left: m, right: g, top: h, height: n, bottom: p, width: d }
        )
      }
      static getBoxPosition(e, s) {
        if (e && e.length > 0) {
          let n = 0,
            d = e[0][s]
          for (let h = 0; h < e.length; h++)
            s in ['top', 'right']
              ? e[h][s] > d && ((n = h), (d = e[h][s]))
              : s in ['bottom', 'left'] && e[h][s] < d && ((n = h), (d = e[h][s]))
          return e[n]
        }
        return null
      }
      static moveToMinimumDistancePlacement(e, s, n) {
        'height' === e.property
          ? '+y' === s
            ? ((e.top = n.topMostBoxPosition.bottom + 0), (e.bottom = e.top + e.height))
            : '-y' === s && ((e.bottom = n.bottomMostBoxPosition.top - 0), (e.top = e.bottom - e.height))
          : 'width' === e.property &&
            ('+x' === s
              ? ((e.left = n.rightMostBoxPosition.right + 0), (e.right = e.left + e.width))
              : '-x' === s && ((e.right = n.leftMostBoxPosition.left - 0), (e.left = e.right - e.width)))
      }
      static moveBoxToLinePosition(e, s, n) {
        const d = e.cue
        let h,
          p = new BoxPosition(e),
          y = (function (e) {
            if ('number' == typeof e.line && (e.snapToLines || (e.line >= 0 && e.line <= 100))) return e.line
            if (!e.track || !e.track.textTrackList || !e.track.textTrackList.mediaElement) return -1
            let s = 0
            const n = e.track,
              d = n.textTrackList
            for (let h = 0; h < d.length && d[h] !== n; h++) 'showing' === d[h].mode && s++
            return -1 * ++s
          })(d),
          m = []
        if (d.snapToLines) {
          let e = 0
          switch (d.vertical) {
            case '':
              ;(m = ['+y', '-y']), (h = 'height')
              break
            case 'rl':
              ;(m = ['+x', '-x']), (h = 'width')
              break
            case 'lr':
              ;(m = ['-x', '+x']), (h = 'width')
          }
          const n = p.lineHeight,
            g = s[h] + n,
            v = m[0]
          if (y < 0) {
            let h = 0
            switch (d.vertical) {
              case '':
                h = s.height - n - 0.05 * s.height
                break
              case 'rl':
              case 'lr':
                h = -s.width + n + 0.05 * s.width
            }
            ;(e = h), (m = m.reverse())
          } else {
            switch (d.vertical) {
              case '':
                e = n * Math.round(y)
                break
              case 'rl':
                e = s.width - n * Math.round(y)
                break
              case 'lr':
                e = n * Math.round(y)
            }
            Math.abs(e) > g && ((e = e < 0 ? -1 : 1), (e *= Math.ceil(g / n) * n))
          }
          p.move(v, e)
        } else {
          const n = '' === d.vertical ? s.height : s.width,
            h = (p.lineHeight / n) * 100
          switch (d.lineAlign) {
            case 'center':
              y -= h / 2
              break
            case 'end':
              y -= h
          }
          switch (d.vertical) {
            case '':
              e.applyStyles({ top: e.formatStyle(y, '%') })
              break
            case 'rl':
              e.applyStyles({ right: e.formatStyle(y, '%') })
              break
            case 'lr':
              e.applyStyles({ left: e.formatStyle(y, '%') })
          }
          ;(m = ['+y', '-y', '+x', '-x']),
            '+y' === d.axis ? (m = ['+y', '-y', '+x', '-x']) : '-y' === d.axis && (m = ['-y', '+y', '+x', '-x']),
            (p = new BoxPosition(e))
        }
        const g = (function (e, d) {
          let h
          for (let p = 0; p < d.length; p++) {
            e.moveIfOutOfBounds(s, d[p])
            let y = 0,
              m = !1
            for (; e.overlapsAny(n) && !(y > 9); )
              m
                ? e.move(d[p])
                : (n &&
                    n.length > 0 &&
                    (h ||
                      (h = {
                        topMostBoxPosition: BoxPosition.getBoxPosition(n, 'top'),
                        bottomMostBoxPosition: BoxPosition.getBoxPosition(n, 'bottom'),
                        leftMostBoxPosition: BoxPosition.getBoxPosition(n, 'left'),
                        rightMostBoxPosition: BoxPosition.getBoxPosition(n, 'right'),
                      }),
                    BoxPosition.moveToMinimumDistancePlacement(e, d[p], h)),
                  (m = !0)),
                y++
          }
          return e
        })(p, m)
        e.move(g.toCSSCompatValues(s))
      }
    }
    s.BoxPosition = BoxPosition
    class WebVTTRenderer {
      constructor(e, s, n = !0) {
        if (!e) return null
        ;(this.window = e),
          (this.overlay = s),
          (this.loggingEnabled = n),
          (this.foregroundStyleOptions = {
            fontFamily: 'Helvetica',
            fontSize: '36px',
            color: 'rgba(255, 255, 255, 1)',
            textShadow: '',
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }),
          (this.backgroundStyleOptions = { backgroundColor: 'rgba(0, 0, 0, 0.5)' }),
          (this.globalStyleCollection = {})
        const d = e.document.createElement('div')
        ;(d.style.position = 'absolute'),
          (d.style.left = '0'),
          (d.style.right = '0'),
          (d.style.top = '0'),
          (d.style.bottom = '0'),
          (d.style.margin = '1.5%'),
          (this.paddedOverlay = d),
          s.appendChild(this.paddedOverlay),
          this.initSubtitleCSS()
      }
      initSubtitleCSS() {
        const e = [new ns.VTTCue(0, 0, "String to init CSS - Won't be visible to user")]
        ;(this.paddedOverlay.style.opacity = '0'),
          this.processCues(e),
          this.processCues([]),
          (this.paddedOverlay.style.opacity = '1')
      }
      convertCueToDOMTree(e) {
        return e ? ss.default.parseContent(this.window, e, this.globalStyleCollection) : null
      }
      setStyles(e) {
        function applyStyles(e, s, n) {
          for (const d in s) s.hasOwnProperty(d) && ((!0 === n && void 0 !== e[d]) || !1 === n) && (e[d] = s[d])
        }
        for (const s in e) {
          let d = !1,
            h = null
          '::cue' === s
            ? ((h = this.foregroundStyleOptions), (d = !0))
            : '::-webkit-media-text-track-display' === s && ((h = this.backgroundStyleOptions), (d = !0))
          const p = e[s]
          if (!0 === d) applyStyles(h, p, d)
          else
            for (let e = 0; e < n.length; e++) {
              const h = n[e].exec(s)
              if (h && 4 === h.length) {
                const e = h[2],
                  s = {}
                applyStyles(s, p, d), (this.globalStyleCollection[e] = s)
              }
            }
        }
        this.initSubtitleCSS(),
          this.loggingEnabled &&
            (console.log(
              'WebVTTRenderer setStyles foregroundStyleOptions: ' + JSON.stringify(this.foregroundStyleOptions)
            ),
            console.log(
              'WebVTTRenderer setStyles backgroundStyleOptions: ' + JSON.stringify(this.backgroundStyleOptions)
            ),
            console.log(
              'WebVTTRenderer setStyles globalStyleCollection: ' + JSON.stringify(this.globalStyleCollection)
            ))
      }
      processCues(e) {
        if (!e) return
        for (; this.paddedOverlay.firstChild; ) this.paddedOverlay.removeChild(this.paddedOverlay.firstChild)
        if (
          !(function (e) {
            for (let s = 0; s < e.length; s++) if (e[s].hasBeenReset || !e[s].displayState) return !0
            return !1
          })(e)
        ) {
          for (let s = 0; s < e.length; s++) this.paddedOverlay.appendChild(e[s].displayState)
          return
        }
        const s = [],
          n = BoxPosition.getSimpleBoxPosition(this.paddedOverlay)
        e.length > 1 &&
          (e = (function (e) {
            const s = []
            let n = 0
            for (let d = 0; d < e.length; d++) {
              let h = e[d]
              if ('number' != typeof h.line) return e
              ;(n += h.line), s.push(h)
            }
            return (
              (n /= e.length),
              n > 50
                ? (s.forEach(function (e) {
                    e.axis = '-y'
                  }),
                  s.sort((e, s) => s.line - e.line))
                : (s.forEach(function (e) {
                    e.axis = '+y'
                  }),
                  s.sort((e, s) => e.line - s.line)),
              s
            )
          })(e))
        for (let d = 0; d < e.length; d++) {
          let h = e[d],
            p = new CueStyleBox(
              this.window,
              h,
              this.foregroundStyleOptions,
              this.backgroundStyleOptions,
              this.globalStyleCollection
            )
          this.paddedOverlay.appendChild(p.div),
            BoxPosition.moveBoxToLinePosition(p, n, s),
            (h.displayState = p.div),
            s.push(BoxPosition.getSimpleBoxPosition(p))
        }
      }
      setSize(e, s) {
        e && (this.overlay.style.width = e + 'px'), s && (this.overlay.style.height = s + 'px')
      }
      getOverlay() {
        return this.overlay
      }
    }
    ;(s.default = WebVTTRenderer), (s.WebVTTRenderer = WebVTTRenderer)
  })
  unwrapExports(ls), ls.VTTCue, ls.StyleBox, ls.CueStyleBox, ls.BoxPosition, ls.WebVTTRenderer
  var cs = createCommonjsModule(function (e, s) {
    function __export(e) {
      for (var n in e) s.hasOwnProperty(n) || (s[n] = e[n])
    }
    Object.defineProperty(s, '__esModule', { value: !0 }), __export(ds), __export(ls)
  })
  unwrapExports(cs)
  var us = cs.WebVTTRenderer
  class TrackManagerStub {
    get currentTrack() {
      return {}
    }
    set currentTrack(e) {}
    get tracks() {
      return []
    }
    destroy() {}
    restoreSelectedTrack() {}
  }
  const {
      audioTrackAdded: hs,
      audioTrackChanged: ps,
      forcedTextTrackChanged: ys,
      textTrackAdded: ms,
      textTrackChanged: gs,
      textTrackRemoved: fs,
    } = ar,
    { textTracksSwitched: vs, textTracksUpdated: _s } = Wr
  class TextTrackManager {
    constructor(e, s, n) {
      ;(this.mediaElement = e),
        (this.dispatcher = s),
        (this.extensionTracks = n),
        (this._tracks = []),
        (this.trackPersistence = new TrackPersistence('mk-text-track', ['label', 'language', 'kind']))
      const d = this.trackPersistence.getPersistedTrack()
      if (
        (this._tracks.push(
          {
            id: -2,
            label: 'Off',
            language: '',
            kind: 'subtitles',
            mode: d && 'Off' === d.label ? 'showing' : 'disabled',
          },
          {
            id: -1,
            label: 'Auto',
            language: '',
            kind: 'subtitles',
            mode: d && 'Auto' !== d.label ? 'disabled' : 'showing',
          }
        ),
        this.extensionTracks)
      ) {
        w.debug('MEDIA_TRACK Initializing text track manager for HLS.js track events')
        const s = e.parentElement
        ;(this.renderer = new us(window, s, !1)),
          this.renderer.setStyles({ '::cue': { fontSize: 'calc(1vw + 1em)' } }),
          (this.onExtensionTextTracksAdded = this.onExtensionTextTracksAdded.bind(this)),
          (this.onExtensionTextTrackSwitched = this.onExtensionTextTrackSwitched.bind(this)),
          (this.onCueChange = this.onCueChange.bind(this))
        const n = this.extensionTracks
        n.addEventListener(_s, this.onExtensionTextTracksAdded),
          n.addEventListener(vs, this.onExtensionTextTrackSwitched)
      } else w.debug('MEDIA_TRACK Initializing text track manager for native track events'), (this.onTextTrackAdded = this.onTextTrackAdded.bind(this)), (this.onTextTrackChanged = this.onTextTrackChanged.bind(this)), (this.onTextTrackRemoved = this.onTextTrackRemoved.bind(this)), (this.onPlayStart = this.onPlayStart.bind(this)), e.textTracks.addEventListener('addtrack', this.onTextTrackAdded), e.textTracks.addEventListener('change', this.onTextTrackChanged), e.textTracks.addEventListener('removetrack', this.onTextTrackRemoved), e.addEventListener('playing', this.onPlayStart)
      ;(this.onAudioTrackAddedOrChanged = debounce(this.onAudioTrackAddedOrChanged.bind(this))),
        s.subscribe(ps, this.onAudioTrackAddedOrChanged),
        s.subscribe(hs, this.onAudioTrackAddedOrChanged)
    }
    get currentTrack() {
      return this.tracks.find((e) => 'showing' === e.mode)
    }
    set currentTrack(e) {
      if (!e) return
      let s
      this.trackPersistence.setPersistedTrack(e),
        this.extensionTracks
          ? (w.debug('MEDIA_TRACK Setting track on extension ' + e.label),
            'Auto' === e.label
              ? (this.clearCurrentlyPlayingTrack(),
                (s = this.extensionTracks.selectForcedTrack()),
                void 0 === s && this.onExtensionTextTrackSwitched({ track: e }))
              : (this.extensionTracks.textTrack = e))
          : (w.debug('MEDIA_TRACK Setting track on element ' + e.label),
            this._tracks.forEach((s) => {
              s !== e && 'showing' === s.mode && (s.mode = 'disabled')
            }),
            e &&
              (w.debug('MEDIA_TRACK setting track mode to showing for ' + e.label),
              'Auto' === e.label
                ? ((this._tracks[1].mode = 'showing'),
                  (s = this.selectNativeForcedTrack(this.mediaElement.audioTracks)))
                : 'Off' === e.label
                ? (this._tracks[0].mode = 'showing')
                : (e.mode = 'showing'))),
        this.dispatcher.publish(ar.forcedTextTrackChanged, s)
    }
    get tracks() {
      return this._tracks
    }
    destroy() {
      if ((this.clearCurrentlyPlayingTrack(), this.extensionTracks)) {
        const e = this.extensionTracks
        e.removeEventListener(_s, this.onExtensionTextTracksAdded),
          e.removeEventListener(vs, this.onExtensionTextTrackSwitched)
      } else this.mediaElement.textTracks.removeEventListener('addtrack', this.onTextTrackAdded), this.mediaElement.textTracks.removeEventListener('change', this.onTextTrackChanged), this.mediaElement.textTracks.removeEventListener('removetrack', this.onTextTrackRemoved), this.mediaElement.removeEventListener('playing', this.onPlayStart)
      this.dispatcher.unsubscribe(ps, this.onAudioTrackAddedOrChanged),
        this.dispatcher.unsubscribe(hs, this.onAudioTrackAddedOrChanged)
    }
    restoreSelectedTrack() {
      return restoreSelectedTrack(this.trackPersistence, this)
    }
    onExtensionTextTracksAdded(e) {
      w.debug('MEDIA_TRACK Extension text tracks updated ' + JSON.stringify(e)),
        this._tracks.push(...e),
        this.restoreSelectedTrack(),
        this.dispatcher.publish(ms, e)
    }
    onExtensionTextTrackSwitched(e) {
      if ((w.debug('MEDIA_TRACKS Extension text track switched ' + e), this.handleVTT(e), this._tracks)) {
        const preserveSelectedTrack = (s) => {
          e.track
            ? (e.track.forced && 'Auto' === s.label) || ('Auto' === e.track.label && 'Auto' === s.label)
              ? (s.mode = 'showing')
              : (s.mode = e.track.persistentID === s.id ? 'showing' : 'disabled')
            : (s.mode = 'Off' === s.label ? 'showing' : 'disabled')
        }
        this._tracks.forEach(preserveSelectedTrack)
      }
      this.dispatcher.publish(gs, e)
    }
    handleVTT(e) {
      const s = e && e.track && e.track.id
      if (void 0 !== s && s >= 0) {
        const e = this.filterSelectableTextTracks(this.mediaElement.textTracks)[s]
        this.onNativeTrackChange(e)
      } else this.clearCurrentlyPlayingTrack()
    }
    onAudioTrackAddedOrChanged(e, s) {
      if ((w.debug('MEDIA_TRACKS text track manager detects audio track change'), this.shouldForceSubtitle()))
        if (this.extensionTracks) {
          w.debug('MEDIA_TRACKS selecting forced text track via extension')
          const e = this.extensionTracks.selectForcedTrack()
          e ? this.dispatcher.publish(ys, e) : this.clearCurrentlyPlayingTrack()
        } else w.debug('MEDIA_TRACKS selecting forced text track natively'), (this.currentTrack = this._tracks[1])
    }
    onTextTrackAdded(e) {
      this._tracks.push(e.track), this.dispatcher.publish(ms, e)
    }
    onPlayStart() {
      this.restoreSelectedTrack()
    }
    onTextTrackRemoved(e) {
      this.dispatcher.publish(fs, e)
    }
    onTextTrackChanged(e) {
      const s = this.findNativeSelectedTextTrack()
      let n = this.trackPersistence.getPersistedTrack()
      if ((n || (n = this._tracks[1]), s && !trackEquals(s, n, this.trackPersistence.fields)))
        if ('Off' === n.label || ('Auto' === n.label && 'forced' !== s.kind)) this.currentTrack = n
        else {
          const e = this.findNativeTrack(n)
          e && (this.currentTrack = e)
        }
      else this.dispatcher.publish(gs, e)
    }
    findNativeSelectedTextTrack() {
      for (let e = 0; e < this.mediaElement.textTracks.length; e++) {
        const s = this.mediaElement.textTracks[e]
        if ('showing' === s.mode) return s
      }
    }
    findNativeTrack(e) {
      for (let s = 0; s < this.mediaElement.textTracks.length; s++) {
        const n = this.mediaElement.textTracks[s]
        if (trackEquals(n, e, this.trackPersistence.fields)) return n
      }
    }
    selectNativeForcedTrack(e) {
      for (let s = 0; s < e.length; s++) {
        const n = e[s]
        if (n.enabled) {
          const e = this.findNativeForcedTrack(n)
          return e && 'showing' !== e.mode && (e.mode = 'showing'), e
        }
      }
    }
    findNativeForcedTrack(e) {
      const s = this.mediaElement.textTracks
      for (let n = 0; n < s.length; n++) {
        const d = s[n]
        if ('forced' === d.kind && d.language === e.language) return d
      }
    }
    onNativeTrackChange(e) {
      this.clearCurrentlyPlayingTrack(),
        (this._currentlyPlayingTrack = e),
        e.addEventListener('cuechange', this.onCueChange)
    }
    clearCurrentlyPlayingTrack() {
      var e
      void 0 !== this._currentlyPlayingTrack &&
        'string' == typeof (e = this._currentlyPlayingTrack).id &&
        'removeEventListener' in e &&
        (this._currentlyPlayingTrack.removeEventListener('cuechange', this.onCueChange),
        this.renderer.processCues({}),
        delete this._currentlyPlayingTrack)
    }
    onCueChange(e) {
      const s = e && e.target && e.target.activeCues
      s && this.renderer.processCues(s)
    }
    filterSelectableTextTracks(e) {
      const s = Array()
      for (let n = 0; n < e.length; n++) {
        const d = e[n]
        ;('captions' === d.kind || 'subtitles' === d.kind || ('metadata' === d.kind && d.customTextTrackCueRenderer)) &&
          s.push(d)
      }
      return s
    }
    shouldForceSubtitle() {
      w.debug('MEDIA_TRACKS Determining whether to select forced text track')
      const e = this.trackPersistence.getPersistedTrack()
      return !e || 'Auto' === e.label
    }
  }
  const bs = { 'picture-in-picture': e.PresentationMode.pictureinpicture, inline: e.PresentationMode.inline },
    Ts = {}
  ;(Ts[e.PresentationMode.pictureinpicture] = 'picture-in-picture'), (Ts[e.PresentationMode.inline] = 'inline')
  const { presentationModeDidChange: Es } = ar,
    { playbackLicenseError: Ss } = Wr,
    { stopped: ks } = e.PlaybackStates
  class VideoPlayer extends BasePlayer {
    constructor(e) {
      super(e),
        (this.mediaPlayerType = 'video'),
        (this._textTrackManager = new TrackManagerStub()),
        (this._audioTrackManager = new TrackManagerStub()),
        (this.userInitiated = !1),
        (this.restrictPlatforms = !('restrict-platforms' in Hr.features) || Hr.features['restrict-platforms']),
        (this.pipEventHandler = this.pipEventHandler.bind(this))
    }
    get audioTracks() {
      return this._audioTrackManager.tracks
    }
    get containerElement() {
      return this._context.videoContainerElement
        ? this._context.videoContainerElement
        : document.getElementById('apple-music-video-container')
    }
    get currentAudioTrack() {
      return this._audioTrackManager.currentTrack
    }
    set currentAudioTrack(e) {
      this._audioTrackManager.currentTrack = e
    }
    get currentTextTrack() {
      return this._textTrackManager.currentTrack
    }
    set currentTextTrack(e) {
      this._textTrackManager.currentTrack = e
    }
    get _targetElement() {
      return this.video || Object.assign({}, document.createElement('video'))
    }
    get textTracks() {
      return this._textTrackManager.tracks
    }
    initializeExtension() {
      return __awaiter$4(this, void 0, void 0, function* () {
        this.restrictPlatforms && je.isAndroid
          ? w.warn('videoPlayer.initializeExtension Not supported on the current platform')
          : this.video || w.warn('videoPlayer.initializeExtension No video element, not initializing extension')
      })
    }
    onPlaybackLicenseError(e) {
      this._licenseError(), this._dispatcher.publish(Ss, e)
    }
    setupTrackManagers(e) {
      var s, n, d, h
      null === (n = null === (s = this._textTrackManager) || void 0 === s ? void 0 : s.destroy) ||
        void 0 === n ||
        n.call(s),
        (this._textTrackManager = new TextTrackManager(this._targetElement, this._dispatcher, e)),
        null === (h = null === (d = this._audioTrackManager) || void 0 === d ? void 0 : d.destroy) ||
          void 0 === h ||
          h.call(d),
        (this._audioTrackManager = new AudioTrackManager(this._targetElement, this._dispatcher, e))
    }
    destroy() {
      this._textTrackManager.destroy(), this._audioTrackManager.destroy(), super.destroy()
    }
    initializeEventHandlers() {
      const e = Object.create(null, { initializeEventHandlers: { get: () => super.initializeEventHandlers } })
      return __awaiter$4(this, void 0, void 0, function* () {
        e.initializeEventHandlers.call(this),
          this.hasMediaElement &&
            (this._targetElement.addEventListener('webkitpresentationmodechanged', this.pipEventHandler),
            this._targetElement.addEventListener('enterpictureinpicture', this.pipEventHandler),
            this._targetElement.addEventListener('leavepictureinpicture', this.pipEventHandler))
      })
    }
    removeEventHandlers() {
      if ((super.removeEventHandlers(), !this.hasMediaElement)) return
      const { _targetElement: e } = this
      e.removeEventListener('webkitpresentationmodechanged', this.pipEventHandler),
        e.removeEventListener('enterpictureinpicture', this.pipEventHandler),
        e.removeEventListener('leavepictureinpicture', this.pipEventHandler)
    }
    initializeMediaElement() {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('videoPlayer.initializeMediaElement Initializing media element')
        const e = this.containerElement
        e
          ? ((this.video = (function () {
              let e = ts.pop()
              return (
                e
                  ? w.debug(`dom-helpers: retrieving video tag, ${ts.length} remain`)
                  : (w.debug('dom-helpers: no available video tags, creating one'),
                    (e = document.createElement('video'))),
                e
              )
            })()),
            (this.video.autoplay = !1),
            (this.video.controls = !1),
            (this.video.playsInline = !0),
            (this.video.id = 'apple-music-video-player'),
            e.appendChild(this.video))
          : w.warn('videoPlayer.initializeMediaElement No video element; no container defined')
      })
    }
    isPlayerSupported() {
      return Browser.supportsEs6()
    }
    _stopMediaElement() {
      const e = Object.create(null, { _stopMediaElement: { get: () => super._stopMediaElement } })
      return __awaiter$4(this, void 0, void 0, function* () {
        yield e._stopMediaElement.call(this), this.destroy()
      })
    }
    pipEventHandler(s) {
      switch (s.type) {
        case 'enterpictureinpicture':
          this._dispatcher.publish(Es, { mode: e.PresentationMode.pictureinpicture })
          break
        case 'leavepictureinpicture':
          this._dispatcher.publish(Es, { mode: e.PresentationMode.inline })
          break
        case 'webkitpresentationmodechanged': {
          const e = this._targetElement
          this._dispatcher.publish(Es, { mode: this._translateStringToPresentationMode(e.webkitPresentationMode) })
          break
        }
      }
    }
    playItemFromEncryptedSource(s, n = !1, d) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('videoPlayer.playItemFromEncryptedSource', s, n),
          this.playbackState !== ks
            ? ((s.playbackType = e.PlaybackType.encryptedFull),
              (this.nowPlayingItem = s),
              (s.state = C.loading),
              (this.userInitiated = n),
              this.playHlsStream(s.assetURL, s))
            : w.debug('video-player.playItemFromEncryptedSource aborting playback because player is stopped')
      })
    }
    playItemFromUnencryptedSource(e, s, n) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if ((w.debug('videoPlayer.playItemFromUnencryptedSource', e, s), this.playbackState === ks))
          return void w.debug('videoPlayer.playItemFromUnencryptedSource aborting playback because player is stopped')
        const [n] = e.split('?')
        return n.endsWith('m3u') || n.endsWith('m3u8') ? void this.playHlsStream(e) : this._playAssetURL(e, s)
      })
    }
    setPresentationMode(s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = this._targetElement
        if (n.webkitSupportsPresentationMode && 'function' == typeof n.webkitSetPresentationMode)
          return n.webkitSetPresentationMode(this._translatePresentationModeToString(s))
        if (n.requestPictureInPicture && document.exitPictureInPicture) {
          if (s === e.PresentationMode.pictureinpicture) return n.requestPictureInPicture()
          if (s === e.PresentationMode.inline) return document.exitPictureInPicture()
        }
      })
    }
    _translateStringToPresentationMode(s) {
      let n = bs[s]
      return (
        void 0 === n &&
          (w.warn(
            `videoPlayer._translateStringToPresentationMode ${s} is not a valid presentation mode, setting to inline`
          ),
          (n = e.PresentationMode.inline)),
        n
      )
    }
    _translatePresentationModeToString(e) {
      let s = Ts[e]
      return (
        void 0 === s &&
          (w.warn(
            `videoPlayer._translatePresentationModeToString ${e} is not a valid presentation mode, setting to inline`
          ),
          (s = 'inline')),
        s
      )
    }
    setNextGaplessItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object]),
      __metadata$2('design:returntype', void 0),
    ],
    VideoPlayer.prototype,
    'onPlaybackLicenseError',
    null
  )
  var Ps
  !(function (e) {
    ;(e.NONE = 'none'),
      (e.FAIRPLAY = 'com.apple.fps'),
      (e.PLAYREADY = 'com.microsoft.playready'),
      (e.WIDEVINE = 'com.widevine.alpha')
  })(Ps || (Ps = {}))
  const hasSessionStorage = () => 'undefined' != typeof window && window.sessionStorage
  function findMediaKeySystemAccess(e, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      for (let n = 0; n < e.length; n++)
        try {
          const d = e[n]
          return [d, yield navigator.requestMediaKeySystemAccess(d, s)]
        } catch (tn) {}
      return []
    })
  }
  let As
  const { NONE: Is, FAIRPLAY: ws, WIDEVINE: Rs, PLAYREADY: Os } = Ps
  function supportsDrm() {
    if (!As) throw new Error('findKeySystemPreference has not been invoked')
    return As !== Is
  }
  function potentialKeySystemsForAccess() {
    return hasSessionStorage() && 'true' === window.sessionStorage.getItem('mk-playready-cbcs-unsupported')
      ? [Rs]
      : Hr.features['prefer-playready']
      ? [Os, Rs]
      : [Rs, Os]
  }
  function findKeySystemPreference() {
    var e, s
    return __awaiter$4(this, void 0, void 0, function* () {
      if (!Fe) {
        if (null === (e = window.WebKitMediaKeys) || void 0 === e ? void 0 : e.isTypeSupported(ws + '.1_0', Gr.AVC1))
          As = ws
        else if (null === (s = window.MSMediaKeys) || void 0 === s ? void 0 : s.isTypeSupported(Os, Gr.AVC1)) As = Os
        else {
          const e = es
          if (
            hasMediaKeySupport() &&
            e.canPlayType('video/mp4;codecs="avc1.42E01E"') &&
            e.canPlayType('audio/mp4;codecs="mp4a.40.2"')
          ) {
            const e = [
                {
                  videoCapabilities: [
                    { contentType: 'video/mp4;codecs="avc1.42E01E"', robustness: 'SW_SECURE_CRYPTO' },
                  ],
                  audioCapabilities: [{ contentType: 'audio/mp4;codecs="mp4a.40.2"' }],
                },
              ],
              s = potentialKeySystemsForAccess(),
              [n] = yield findMediaKeySystemAccess(s, e)
            As = n
          }
        }
        return (As = null != As ? As : Is), As
      }
      As = Is
    })
  }
  function hasMediaKeySupport() {
    return !!(navigator && navigator.requestMediaKeySystemAccess && window.MediaKeys && window.MediaKeySystemAccess)
  }
  let Cs = { developerToken: 'developerTokenNotSet', musicUserToken: 'musicUserTokenNotSet' }
  function createHlsOffersLicenseChallengeBody(e) {
    return { 'adam-id': e.id, id: 1 }
  }
  function createLicenseChallengeBody(e, s, n, d, h) {
    let p
    const y = { challenge: n.challenge || Ge(n.licenseChallenge), 'key-system': d, uri: n.keyuri }
    return (
      (p = s.isUTS
        ? Object.assign(
            Object.assign({}, y),
            (function (e, s = 'start') {
              return { 'extra-server-parameters': e.keyServerQueryParameters, 'license-action': s }
            })(s, e)
          )
        : s.isLiveRadioStation
        ? Object.assign(Object.assign({}, y), { event: 'beats1' })
        : s.hasOffersHlsUrl
        ? { 'license-requests': [Object.assign(Object.assign({}, y), createHlsOffersLicenseChallengeBody(s))] }
        : Object.assign(
            Object.assign({}, y),
            (function (e, s = !1) {
              return { adamId: e.songId, isLibrary: e.isCloudItem, 'user-initiated': s }
            })(s, h)
          )),
      p
    )
  }
  class License {
    fetch(e) {
      const s = {
        Authorization: 'Bearer ' + Cs.developerToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Apple-Music-User-Token': '' + Cs.musicUserToken,
      }
      this.keySystem === Ps.WIDEVINE && (s['X-Apple-Renewal'] = !0)
      const n = new Headers(s)
      return fetch(this.licenseUrl, { method: 'POST', body: JSON.stringify(e), headers: n })
    }
    reset() {
      ;(this.licenseUrl = void 0),
        (this.mediaItem = void 0),
        (this.data = void 0),
        (this.initiated = void 0),
        (this.keySystem = void 0),
        (this.startResponse = void 0)
    }
    start(e, s, n, d, h = !1) {
      var p, y
      return __awaiter$4(this, void 0, void 0, function* () {
        ;(this.licenseUrl = e), (this.mediaItem = s), (this.data = n), (this.keySystem = d), (this.initiated = h)
        const m = n.isRenewalRequest ? 'renew' : 'start',
          g = createLicenseChallengeBody(m, s, n, d, h)
        s.hasOffersHlsUrl && (this.licenseUrl += '/' + m), (this.startResponse = this.fetch(g))
        try {
          const e = yield this.startResponse
          if (!e.ok) {
            let s
            try {
              s = yield e.json()
            } catch (_t) {}
            s && s.errorCode && (s.status = s.errorCode), this.processJsonError(s)
          }
          const s = yield e.json(),
            n = (null === (p = s['license-responses']) || void 0 === p ? void 0 : p.length)
              ? s['license-responses'][0]
              : s
          return (
            (n.status = null !== (y = n.status) && void 0 !== y ? y : n.errorCode),
            0 !== n.status && this.processJsonError(n),
            n
          )
        } catch (B) {
          throw ((this.startResponse = void 0), B)
        }
      })
    }
    processJsonError(e) {
      let s = new MKError(MKError.MEDIA_LICENSE, 'Error acquiring license')
      if (e && 0 !== e.status) {
        if (!e.message)
          switch (e.status) {
            case -1004:
              e.message = MKError.DEVICE_LIMIT
              break
            default:
              e.message = MKError.MEDIA_LICENSE
          }
        ;(s = MKError.serverError(e)),
          (s.data = e),
          s.errorCode === MKError.PLAYREADY_CBC_ENCRYPTION_ERROR &&
            hasSessionStorage() &&
            window.sessionStorage.setItem('mk-playready-cbcs-unsupported', 'true')
      }
      throw s
    }
    stop() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this.startResponse)
          try {
            yield this.startResponse
          } catch (B) {}
        if (!this.mediaItem || !this.data) return
        if (!this.mediaItem.isUTS) return
        const e = createLicenseChallengeBody('stop', this.mediaItem, this.data, this.keySystem, this.initiated),
          s = this.fetch(e)
        this.reset()
        try {
          yield s
        } catch (B) {
          w.warn('license.stop request error', B)
        }
      })
    }
  }
  const Ms = /max-age=(\d+)/i
  function shouldThrowLicenseError(e, s) {
    if (e.errorCode === MKError.WIDEVINE_CDM_EXPIRED) return !1
    const n = e.errorCode === MKError.PLAYREADY_CBC_ENCRYPTION_ERROR
    return s && !n
  }
  class KeySession extends Notifications {
    constructor() {
      super([Wr.playbackLicenseError, Wr.playbackSessionError]),
        (this.initiated = !0),
        (this.isLibrary = !1),
        (this.keySystem = Ps.FAIRPLAY),
        (this._storage = window.sessionStorage),
        (this.boundDispatchKeyError = this.dispatchKeyError.bind(this)),
        (this.boundDispatchSessionError = this.dispatchSessionError.bind(this)),
        (this.boundHandleSessionCreation = this.handleSessionCreation.bind(this)),
        (this.boundStartLicenseSession = this.startLicenseSession.bind(this)),
        (this.license = new License())
    }
    get extID() {
      if (this.extURI) return this.extURI.replace('data:;base64,', '')
    }
    get isFairplay() {
      return this.keySystem === Ps.FAIRPLAY
    }
    get isPlayReady() {
      return this.keySystem === Ps.PLAYREADY
    }
    get isWidevine() {
      return this.keySystem === Ps.WIDEVINE
    }
    acquirePlaybackLicense(e, s, n = this.initiated) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this.keyServerURL && this.developerToken && this.userToken)
          try {
            return yield this.license.start(
              this.keyServerURL,
              this.item,
              { challenge: s, keyuri: e },
              this.keySystem,
              this.initiated
            )
          } catch (_t) {
            if (shouldThrowLicenseError(_t, n)) throw _t
            this.dispatchEvent(Wr.playbackLicenseError, _t)
          }
      })
    }
    startLicenseSession(e) {
      let s
      w.debug('Starting License Session', e)
      const { message: n, target: d } = e
      if (this.isPlayReady) {
        const e = String.fromCharCode.apply(null, new Uint16Array(n.buffer || n)),
          d = new DOMParser().parseFromString(e, 'application/xml')
        s = d.getElementsByTagName('Challenge')[0].childNodes[0].nodeValue
      } else s = Ge(new Uint8Array(n))
      return this.acquirePlaybackLicense(d.extURI || this.extURI, s).then((e) => this.handleLicenseJson(e, d, s))
    }
    setKeyURLs(e) {
      ;(this.keyCertURL = e[this.isFairplay ? 'hls-key-cert-url' : 'widevine-cert-url']),
        (this.keyServerURL = e['hls-key-server-url'])
    }
    dispatchKeyError(e) {
      console.error(MKError.MEDIA_KEY + ' error in dispatchKeyError:', e),
        this.dispatchEvent(Wr.playbackSessionError, new MKError(MKError.MEDIA_KEY, e))
    }
    dispatchSessionError(e) {
      this.dispatchEvent(Wr.playbackSessionError, new MKError(MKError.MEDIA_SESSION, e))
    }
    loadCertificateBuffer() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!this.keyCertURL) return Promise.reject(new MKError(MKError.MEDIA_SESSION, 'No certificate URL'))
        const e = document.createElement('a')
        e.href = this.keyCertURL
        const s = Date.now(),
          n = `${e.hostname}${e.pathname}`.replace(/[^a-z0-9.]/gi, '.'),
          d = this._storage.getItem(n),
          h = parseInt(this._storage.getItem('com.ai.mk.vmcc.exp') || '', 10)
        if (d && h && h > s) {
          const e = new Uint8Array(d.length)
          for (let s = d.length; s--; ) e[s] = d.charCodeAt(s)
          return e.buffer
        }
        const p = yield fetch(`${this.keyCertURL}?t=${Date.now()}`),
          y = p.headers.get('cache-control')
        let m = 86400
        if (y && Ms.test(y)) {
          const e = y.match(Ms)
          e && e[1] && (m = parseInt(e[1], 10))
        }
        const g = yield p.arrayBuffer(),
          v = String.fromCharCode.apply(String, new Uint8Array(g))
        return /^\<\?xml/.test(v)
          ? Promise.reject(new MKError(MKError.MEDIA_CERTIFICATE, 'Invalid certificate.'))
          : (this._storage.setItem(n, v), this._storage.setItem('com.ai.mk.vmcc.exp', (s + 1e3 * m).toString()), g)
      })
    }
    handleSessionCreation(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this.createSession(e).catch((e) => {
          this.dispatchSessionError(e)
        })
      })
    }
    handleLicenseJson(e, s, n) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if ((w.debug('handleLicenseResponse', e), null == e ? void 0 : e.license)) {
          const n = Ye(e.license)
          try {
            yield s.update(n)
          } catch (_t) {
            w.error('Failed to updated media keys', _t), this.dispatchKeyError(_t)
          }
        }
      })
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object]),
      __metadata$2('design:returntype', void 0),
    ],
    KeySession.prototype,
    'startLicenseSession',
    null
  )
  class FairplayEncryptedSession extends KeySession {
    constructor() {
      super(...arguments), (this._mediaKeySessions = {}), (this._mediaKeySessionRenewals = {})
    }
    attachMedia(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        ;(this.keySystem = s.keySystem),
          (this._keySystemAccess = s),
          e.addEventListener('encrypted', this.boundHandleSessionCreation, !1)
      })
    }
    detachMedia(e) {
      e.removeEventListener('encrypted', this.boundHandleSessionCreation)
      const s = this._mediaKeySessions,
        n = this._mediaKeySessionRenewals
      Object.values(s).forEach((e) => {
        e.removeEventListener('message', this.boundStartLicenseSession), asAsync(e.close())
      }),
        (this._mediaKeySessions = {}),
        Object.values(n).forEach((e) => clearTimeout(e)),
        (this._mediaKeySessionRenewals = {})
    }
    createSession(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('Encrypted createSession', e)
        const s = this._keySystemAccess
        if (!s) return
        const { initData: n, target: d, initDataType: h } = e
        this._mediaKeysPromise ||
          (this._mediaKeysPromise = new Promise((e, n) =>
            __awaiter$4(this, void 0, void 0, function* () {
              const n = yield s.createMediaKeys(),
                h = yield this.loadCertificateBuffer()
              yield n.setServerCertificate(h), yield d.setMediaKeys(n), e(n)
            })
          ))
        const p = yield this._mediaKeysPromise,
          y = new Uint8Array(n),
          m = String.fromCharCode.apply(void 0, Array.from(y)),
          g = p.createSession()
        ;(g.extURI = this.extURI || m),
          yield g.generateRequest(h, n),
          (this._mediaKeySessions[g.sessionId] = g),
          g.addEventListener('message', this.boundStartLicenseSession)
      })
    }
    handleLicenseJson(e, s, n) {
      const d = Object.create(null, { handleLicenseJson: { get: () => super.handleLicenseJson } })
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!e) return
        yield d.handleLicenseJson.call(this, e, s, n)
        const h = e['renew-after']
        if (e.license && h) {
          const e = this._mediaKeySessionRenewals,
            n = e[s.sessionId]
          n && clearTimeout(n)
          const d = setTimeout(() => s.update(He('renew')), 1e3 * h)
          e[s.sessionId] = d
        }
      })
    }
    loadKeys(e) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    clearSessions() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
  }
  const Ns = /^(?:.*)(skd:\/\/.+)$/i
  class WebKitSession extends KeySession {
    attachMedia(e, s) {
      return (
        (this.target = e),
        e.addEventListener('webkitneedkey', this.boundHandleSessionCreation, !1),
        e.addEventListener('webkitkeyerror', this.boundDispatchKeyError),
        e
      )
    }
    detachMedia(e) {
      e &&
        (e.removeEventListener('webkitneedkey', this.boundHandleSessionCreation, !1),
        e.removeEventListener('webkitkeyerror', this.boundDispatchKeyError))
    }
    destroy() {
      w.debug('FPS destroy'),
        this.detachMedia(this.target),
        this.session &&
          (this.session.removeEventListener('webkitkeyerror', this.boundDispatchKeyError),
          this.session.removeEventListener('webkitkeymessage', this.boundStartLicenseSession))
    }
    createSession(e) {
      w.debug('FPS createSession', e)
      const { initData: s, target: n } = e,
        d = this._extractAssetId(s)
      if ((w.debug('extURI', d), !n.webkitKeys)) {
        const e = new window.WebKitMediaKeys(this.keySystem)
        n.webkitSetMediaKeys(e)
      }
      return this.loadCertificateBuffer().then((e) => {
        const h = this._concatInitDataIdAndCertificate(s, d, e),
          p = 'VIDEO' === n.tagName ? Gr.AVC1 : Gr.MP4,
          y = n.webkitKeys.createSession(p, h)
        ;(this.session = y),
          (y.extURI = d),
          y.addEventListener('webkitkeyerror', this.boundDispatchKeyError),
          y.addEventListener('webkitkeymessage', this.boundStartLicenseSession)
      })
    }
    _extractAssetId(e) {
      let s = String.fromCharCode.apply(null, new Uint16Array(e.buffer || e))
      const n = s.match(Ns)
      return n && n.length >= 2 && (s = n[1]), w.debug('Extracted assetId from EXT-X-KEY URI', s), s
    }
    _concatInitDataIdAndCertificate(e, s, n) {
      'string' == typeof s && (s = We(s)), (n = new Uint8Array(n))
      let d = 0
      const h = new ArrayBuffer(e.byteLength + 4 + s.byteLength + 4 + n.byteLength),
        p = new DataView(h)
      new Uint8Array(h, d, e.byteLength).set(e), (d += e.byteLength), p.setUint32(d, s.byteLength, !0), (d += 4)
      const y = new Uint8Array(h, d, s.byteLength)
      y.set(s), (d += y.byteLength), p.setUint32(d, n.byteLength, !0), (d += 4)
      return new Uint8Array(h, d, n.byteLength).set(n), new Uint8Array(h, 0, h.byteLength)
    }
    loadKeys(e) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    clearSessions() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
  }
  class MSSession extends KeySession {
    attachMedia(e, s) {
      return (
        (this.keySystem = s.keySystem),
        e.addEventListener('msneedkey', this.boundHandleSessionCreation, !1),
        e.addEventListener('mskeyerror', this.boundDispatchKeyError),
        e
      )
    }
    detachMedia(e) {
      e.removeEventListener('msneedkey', this.boundHandleSessionCreation, !1),
        e.removeEventListener('mskeyerror', this.boundDispatchKeyError)
    }
    createSession(e) {
      const { initData: s, target: n } = e
      if (!n.msKeys) {
        const e = new MSMediaKeys(this.keySystem)
        n.msSetMediaKeys(e)
      }
      const d = n.msKeys.createSession(Gr.MP4, s)
      return (
        d.addEventListener('mskeyerror', this.dispatchKeyError),
        d.addEventListener('mskeymessage', this.startLicenseSession.bind(this)),
        d
      )
    }
    loadKeys(e) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    clearSessions() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
  }
  const Ds = isNodeEnvironment$1() ? require('util').TextDecoder : self.TextDecoder
  function encodedArrayToString(e, s = 'utf-8') {
    if ('iso-8859-1' === s) return String.fromCharCode(...e)
    return new Ds(s).decode(e)
  }
  function readNullTerminatedString(e, s = 0, n) {
    const d = []
    n = null != n ? n : e.length
    for (let h = s; h < n; h++) {
      const s = e[h]
      if ('\0' === String.fromCharCode(s)) break
      d.push(String.fromCharCode(s))
    }
    return [d.join(''), d.length]
  }
  function isBitAtPositionOn(e, s) {
    return 0 != (e & (1 << s))
  }
  class BaseMp4Box {
    constructor(e, s, n, d) {
      ;(this.id = e), (this.data = s), (this.start = n), (this.end = d)
    }
    get size() {
      return this.end - this.start
    }
    get rawBytes() {
      return this.data.slice(this.start, this.end)
    }
  }
  const Ls = [237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237]
  class PsshBox extends BaseMp4Box {
    constructor(e, s, n) {
      super('pssh', e, s, n), (this.view = new DataView(e.buffer, s))
    }
    get systemId() {
      const { data: e, start: s } = this,
        n = s + 12
      return e.slice(n, n + 16)
    }
    get dataSize() {
      return this.view.getUint32(28)
    }
    get psshData() {
      const { data: e, start: s, dataSize: n } = this,
        d = s + 32
      return e.slice(d, d + n)
    }
    get keyBytes() {
      const { psshData: e } = this
      return e.slice(2, 18)
    }
    get isWidevine() {
      return arrayEquals(this.systemId, Ls)
    }
  }
  class TencBox extends BaseMp4Box {
    constructor(e, s, n) {
      super('tenc', e, s, n), (this.data = e), (this.start = s), (this.end = n)
    }
    get isProtected() {
      const { data: e, start: s } = this
      return e[s + 14]
    }
    get defaultKeyId() {
      const { data: e, start: s } = this
      return e.slice(s + 16, s + 32)
    }
    set defaultKeyId(e) {
      const { data: s, start: n } = this
      for (let d = 0; d < e.length; d++) s[d + n + 16] = e[d]
    }
  }
  function findBox(e, s, n = []) {
    for (let d = s; d < e.length; ) {
      if (0 === n.length) return
      const s = new DataView(e.buffer, d).getUint32(0),
        h = encodedArrayToString(e.subarray(d + 4, d + 8)),
        p = d + s
      if (1 === n.length && h === n[0]) return new BaseMp4Box(h, e, d, p)
      if (h === n[0]) return findBox(e, d + 8, n.slice(1))
      d += s
    }
  }
  function findPsshBoxesInInitData(e) {
    const s = [],
      n = new DataView(e.buffer)
    for (let d = 0; d < e.length; ) {
      const h = n.getUint32(d)
      s.push(new PsshBox(e, d, d + h)), (d += h)
    }
    return s
  }
  const extractDataFromUri = (e) => {
    const [s, n] = e.split(',')
    return n
  }
  class SideLoadingEncryptedSession extends KeySession {
    constructor() {
      super(...arguments), (this._sessions = {}), (this._sessionRemovalTimeouts = {})
    }
    attachMedia(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        ;(this.keySystem = s.keySystem), (this._keySystemAccess = s), (this._target = e)
      })
    }
    detachMedia() {
      asAsync(this.clearSessions())
    }
    createSession(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('side-loaded createSession', e)
        const s = this._keySystemAccess
        if (!s) return
        const { initData: n, initDataType: d } = e
        return (
          this._mediaKeysPromise ||
            (this._mediaKeysPromise = new Promise((e, n) =>
              __awaiter$4(this, void 0, void 0, function* () {
                var d
                const h = yield s.createMediaKeys()
                try {
                  yield null === (d = this._target) || void 0 === d ? void 0 : d.setMediaKeys(h), (this._mediaKeys = h)
                } catch (B) {
                  this.dispatchKeyError(B), n(B)
                }
                const p = yield this.loadCertificateBuffer()
                yield h.setServerCertificate(p), (this._mediaKeysServerCertificate = p), e(h)
              })
            )),
          yield this._mediaKeysPromise,
          this._mediaKeysServerCertificate ? this._createSession(n, d) : void 0
        )
      })
    }
    generatePSSH(e) {
      const s = new Uint8Array([
        0, 0, 0, 52, 112, 115, 115, 104, 0, 0, 0, 0, 237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29,
        33, 237, 0, 0, 0, 20, 8, 1, 18, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ])
      for (let n = 0; n < e.length; n++) s[s.length - 16 + n] = e[n]
      return w.debug('generatePSSH', s), s
    }
    _createSession(e, s) {
      var n
      const d = null === (n = this._mediaKeys) || void 0 === n ? void 0 : n.createSession(),
        { item: h } = this
      if (!h || !d) return
      ;(this._sessions[Ge(e)] = d), w.debug('created media key session', d)
      let p
      if (this.isWidevine && h.isSong) (d.extURI = 'data:;base64,' + Ge(e)), (p = this.generatePSSH(e))
      else {
        const s = findPsshBoxesInInitData(new Uint8Array(e)).find((e) => e.isWidevine),
          n = null == s ? void 0 : s.rawBytes,
          h = Ge(n)
        w.debug('extracted uri', h), (d.extURI = h), (p = e)
      }
      return (
        d.addEventListener('message', this.startLicenseSession),
        d.generateRequest(s, p).catch((e) => {
          if (e.message.match(/generateRequest.*\(75\)/)) return d.generateRequest(s, p)
          throw e
        })
      )
    }
    loadKeys(e) {
      var s
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = e.filter((e) => e.keyFormat === zr)
        for (const e of n) {
          const { dataUri: s } = e,
            n = extractDataFromUri(s)
          this._sessions[n] ||
            (w.debug('about to create session for', n),
            yield this.createSession({ initData: Ye(n), initDataType: 'cenc' }))
        }
        if (null === (s = this.item) || void 0 === s ? void 0 : s.isLiveAudioStation) {
          const e = Object.keys(this._sessions),
            s = n.reduce((e, s) => ((e[extractDataFromUri(s.dataUri)] = !0), e), {})
          for (const n of e) s[n] || (yield this._scheduleRemoveSession(n))
        }
      })
    }
    clearSessions(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const s = this._sessions
        if (null == e ? void 0 : e.length) {
          const s = e.filter((e) => e.keyFormat === zr)
          for (const e of s) {
            const s = extractDataFromUri(e.dataUri)
            clearTimeout(this._sessionRemovalTimeouts[s]), yield this._removeSessionImmediately(s)
          }
        } else {
          Object.values(this._sessionRemovalTimeouts).forEach((e) => clearTimeout(e)),
            w.debug('clearing key sessions', s)
          for (const e of Object.keys(s)) yield this._removeSessionImmediately(e)
        }
      })
    }
    _scheduleRemoveSession(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!this._sessions[e]) return void w.warn('no session for dataUri, not scheduling remove', e)
        if (this._sessionRemovalTimeouts[e]) return
        const s = setTimeout(() => {
          asAsync(this._removeSessionImmediately(e))
        }, 6e4)
        w.debug('deferring removal of keysession for dataUri', e), (this._sessionRemovalTimeouts[e] = s)
      })
    }
    _removeSessionImmediately(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const s = this._sessions[e]
        if (s) {
          w.debug('removing keysession for', e),
            delete this._sessions[e],
            s.removeEventListener('message', this.startLicenseSession)
          try {
            yield s.remove()
          } catch (_t) {
            w.warn('Error invoking session.remove()', _t)
          } finally {
            try {
              yield s.close()
            } catch (_t) {
              w.warn('Error invoking session.close()', _t)
            }
          }
        } else w.warn('no session for dataUri, not removing', e)
      })
    }
  }
  class MediaExtension extends Notifications {
    constructor(e, s) {
      super([Wr.playbackLicenseError, Wr.playbackSessionError]),
        (this.audio = e),
        (this.contentType = s),
        je.isIE || (je.isSafari && je.engineMajorVersion)
    }
    get hasMediaKeySupport() {
      return hasMediaKeySupport()
    }
    get hasMediaSession() {
      return void 0 !== this._session
    }
    get isFairplay() {
      return this._session.isFairplay
    }
    set extURI(e) {
      this._session.extURI = e
    }
    set initiated(e) {
      this._session.initiated = e
    }
    get session() {
      return this._session
    }
    clearSessions(e) {
      var s
      return __awaiter$4(this, void 0, void 0, function* () {
        return null === (s = this.session) || void 0 === s ? void 0 : s.clearSessions(e)
      })
    }
    initializeKeySystem() {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this._attachSession()
        const { _session: e } = this
        e &&
          [Wr.playbackLicenseError, Wr.playbackSessionError].forEach((s) => {
            e.addEventListener(s, (e) => {
              this.dispatchEvent(s, e)
            })
          })
      })
    }
    _attachSession() {
      var e, s, n
      return __awaiter$4(this, void 0, void 0, function* () {
        const { audio: d, contentType: h } = this
        if (
          null === (e = window.WebKitMediaKeys) || void 0 === e
            ? void 0
            : e.isTypeSupported(Ps.FAIRPLAY + '.1_0', Gr.MP4)
        ) {
          let e
          if (
            !!(null === localStorage || void 0 === localStorage
              ? void 0
              : localStorage.getItem('mk-safari-modern-eme')) &&
            this.hasMediaKeySupport
          ) {
            const s = [
                {
                  initDataTypes: ['skd'],
                  audioCapabilities: [{ contentType: h, robustness: '' }],
                  distinctiveIdentifier: 'not-allowed',
                  persistentState: 'not-allowed',
                  sessionTypes: ['temporary'],
                },
              ],
              [, n] = yield findMediaKeySystemAccess([Ps.FAIRPLAY], s)
            e = n
          }
          e
            ? (w.warn('media-extension: Using Fairplay modern EME'),
              (this._session = new FairplayEncryptedSession()),
              this._session.attachMedia(d, e))
            : (w.warn('media-extension: Using Fairplay legacy EME'),
              (this._session = new WebKitSession()),
              this._session.attachMedia(d, { keySystem: Ps.FAIRPLAY }))
        } else if (null === (s = window.MSMediaKeys) || void 0 === s ? void 0 : s.isTypeSupported(Ps.PLAYREADY, Gr.MP4))
          (this._session = new MSSession()), this._session.attachMedia(d, { keySystem: Ps.PLAYREADY })
        else if (this.hasMediaKeySupport && d.canPlayType(h)) {
          this._session = new SideLoadingEncryptedSession()
          const e = [
              {
                initDataTypes: ['cenc', 'keyids'],
                audioCapabilities: [{ contentType: h }],
                distinctiveIdentifier: 'optional',
                persistentState: 'required',
              },
            ],
            s = potentialKeySystemsForAccess(),
            [, p] = yield findMediaKeySystemAccess(s, e)
          p
            ? null === (n = this._session) || void 0 === n || n.attachMedia(d, p)
            : w.warn('media-extension: No keysystem detected!')
        }
      })
    }
    setMediaItem(e) {
      !(function (e, s) {
        s.keyURLs &&
          ((e.developerToken = Cs.developerToken),
          (e.userToken = Cs.musicUserToken),
          (e.item = s),
          (e.adamId = s.songId),
          (e.isLibrary = s.isCloudItem),
          e.setKeyURLs(s.keyURLs))
      })(this._session, e)
    }
    destroy(e) {
      this._session && this._session.detachMedia(e)
    }
  }
  const shouldForceAudioMse = () =>
    'true' === (null === localStorage || void 0 === localStorage ? void 0 : localStorage.getItem('mk-force-audio-mse'))
  class ByteRangeSegment {
    constructor({ url: e, startByte: s, length: n, isInitSegment: d = !1 }) {
      ;(this.url = e),
        (this.isInitSegment = d),
        (this.startByte = parseInt(s, 10)),
        (this.length = parseInt(n, 10)),
        (this.endByte = this.startByte + this.length - 1),
        (this.range = `bytes=${this.startByte}-${this.endByte}`)
    }
    load() {
      return __awaiter$4(this, void 0, void 0, function* () {
        const { url: e, range: s } = this
        if (!e) return new Uint8Array()
        const n = new Headers()
        n.append('Range', s)
        const d = yield fetch(e, { headers: n }),
          h = yield d.arrayBuffer()
        return new Uint8Array(h)
      })
    }
  }
  class ContinuousSegment {
    constructor(e, s = !1) {
      ;(this.url = e), (this.isInitSegment = s)
    }
    load() {
      return __awaiter$4(this, void 0, void 0, function* () {
        const { url: e } = this
        if (!e) return new Uint8Array()
        w.debug('radio-segment: loading', e)
        const s = yield fetch(e),
          n = yield s.arrayBuffer()
        return new Uint8Array(n)
      })
    }
  }
  const xs = /^#EXT-X-BYTERANGE:([^\n]+)\n/gim,
    Us = /^#EXT-X-MAP:([^\n]+)\n/im,
    $s = /#EXTINF:\d*\.\d*\,[\n](.+)|^#EXT-X-MAP:URI="([^"]*)"/gim,
    Bs = /#EXTINF:\d*\.\d*,\s*#EXT-X-BITRATE:\d{1,3}[\n](.+)|^#EXT-X-MAP:URI="([^"]*)"/gim
  class SegmentList {
    constructor() {
      ;(this._segments = []), (this._addedSegments = {})
    }
    get segments() {
      return this._segments
    }
    addSegment(e, s) {
      this._addedSegments[s] || (w.debug('Adding segment', s), this._segments.push(e), (this._addedSegments[s] = !0))
    }
    extractLiveRadioSegments(e, s) {
      this._extractContinuousSegments($s, e, s)
    }
    extractHlsOffersSegments(e, s) {
      this._extractContinuousSegments(Bs, e, s)
    }
    _extractContinuousSegments(e, s, n) {
      if (!s || !e.test(s)) return
      let d
      for (e.lastIndex = 0; (d = e.exec(s)); ) {
        const e = d[0].startsWith('#EXT-X-MAP') ? d[2] : d[1],
          s = rewriteLastUrlPath(n, e),
          h = d[0].startsWith('#EXT-X-MAP')
        this.addSegment(new ContinuousSegment(s, h), e)
      }
    }
    extractByteRangeSegments(e, s) {
      var n, d
      if (!e || !xs.test(e)) return
      const h = (function (e) {
          if (!e || !Us.test(e)) return
          const [, s] = e.match(Us)
          return s.split(',').reduce((e, s) => {
            const [n, d] = s.split('=')
            return (e[n.toLowerCase()] = d.replace(/\"/gi, '')), e
          }, {})
        })(e),
        p = null !== (n = s.split('/').pop()) && void 0 !== n ? n : '',
        y = s.replace(p, h.uri),
        [m, g] = h.byterange.split('@'),
        v = new ByteRangeSegment({ url: y, startByte: g, length: m })
      this.addSegment(v, v.range),
        (null !== (d = e.match(xs)) && void 0 !== d ? d : []).forEach((e) => {
          const [, s, n] = e.match(/^#EXT-X-BYTERANGE:(\d+)@(\d+)\n/),
            d = new ByteRangeSegment({ url: y, startByte: n, length: s })
          this.addSegment(d, d.range)
        })
    }
  }
  var Fs
  !(function (e) {
    e.keysParsed = 'keysParsed'
  })(Fs || (Fs = {}))
  const js = /^#EXT-X-TARGETDURATION:(\d+)/im,
    Ks = /^#EXT-X-KEY:[^\n]+URI="([^"]+)"/im,
    Vs = /^#EXT-X-KEY:[^\n]+URI="([^"]+)",KEYFORMAT="([^"]+)"/gim
  function loadManifestData(e) {
    return __awaiter$4(this, void 0, void 0, function* () {
      return (yield fetch(e)).text()
    })
  }
  class Manifest extends Notifications {
    constructor(e, s, n) {
      super([Wr.manifestParsed, Fs.keysParsed]),
        (this._downlink = 0),
        (this._segmentList = new SegmentList()),
        (this._data = e),
        (this._item = s),
        (this._url = s.assetURL)
    }
    parse() {
      const e = this._item,
        s = this._data
      if (As !== Ps.FAIRPLAY || shouldForceAudioMse())
        if ((this._detectKeyTags(), e.hasOffersHlsUrl)) this._segmentList.extractHlsOffersSegments(s, e.assetURL)
        else if (e.isLiveRadioStation) {
          this._segmentList.extractLiveRadioSegments(s, e.assetURL)
          const [, n] = this._data.match(js)
          w.debug(`manifest: setting up manifest refresh interval at ${n} seconds`)
          const d = 1e3 * parseInt(n, 10)
          this._manifestRefreshInterval = setInterval(this.liveRadioRefresh, d)
        } else this._segmentList.extractByteRangeSegments(s, e.assetURL)
    }
    static load(e, s = !0) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('loading manifest for item', e.title)
        const n = e.assetURL
        let d
        const h = !!window.sessionStorage && s
        if (h && ((d = window.sessionStorage.getItem(n)), d)) return new this(d, e)
        const p = new Date().getTime()
        d = yield loadManifestData(n)
        const y = new this(d, e)
        return (
          (y.downlink = (function (e, s) {
            return (8 * s.length) / ((new Date().getTime() - e) / 1e3) / 1024
          })(p, d)),
          h && window.sessionStorage.setItem(n, d),
          Promise.resolve(y)
        )
      })
    }
    get downlink() {
      return this._downlink
    }
    set downlink(e) {
      this._downlink = e
    }
    get mediaItem() {
      return this._item
    }
    liveRadioRefresh() {
      return __awaiter$4(this, void 0, void 0, function* () {
        const e = yield loadManifestData(this._url)
        ;(this._data = e),
          this._detectKeyTags(),
          this._segmentList.extractLiveRadioSegments(e, this._url),
          this.dispatchEvent(Wr.manifestParsed)
      })
    }
    segmentsForTimeRange(e) {
      const s = Math.floor(e.start / 10) + 1,
        n = Math.floor(e.end / 10) + 1,
        { segments: d } = this
      return [d[0], ...d.slice(s, n + 1)]
    }
    get segments() {
      return this._segmentList.segments
    }
    get extURI() {
      if (!this._extURI) {
        const e = this._data.match(Ks)
        w.debug('manifest: EXT_X_KEY_URI matches', e), (this._extURI = (e && e[1]) || void 0)
      }
      return this._extURI
    }
    get keyValues() {
      let e = this._modernKeys
      return e.length || (e = this._legacyKeys), e
    }
    _detectKeyTags() {
      const e = this.keyValues
      e.length && this.dispatchEvent(Fs.keysParsed, { keys: e })
    }
    get _legacyKeys() {
      const e = this._data.match(Ks)
      w.debug('manifest: EXT_X_KEY_URI matches', e)
      const s = (e && e[1]) || void 0
      this._extURI = s
      const n = []
      return s && n.push({ keyFormat: zr, dataUri: s }), n
    }
    get _modernKeys() {
      let e
      Vs.lastIndex = 0
      const s = []
      for (; (e = Vs.exec(this._data)); ) {
        const [n, d, h] = e
        s.push({ keyFormat: h, dataUri: d })
      }
      return s
    }
    stop() {
      this._manifestRefreshInterval && clearInterval(this._manifestRefreshInterval)
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', []),
      __metadata$2('design:returntype', Promise),
    ],
    Manifest.prototype,
    'liveRadioRefresh',
    null
  )
  const Ys = 'gaplessTransition',
    Hs = 'bufferTimedMetadataDidChange',
    rewriteDefaultKid = (e) => {
      const s = (function (e) {
        const s = findBox(e, 0, ['moov', 'trak', 'mdia', 'minf', 'stbl', 'stsd'])
        if (!s) return
        let n
        n = findBox(e, s.start + 16, ['enca'])
        let d = 36
        if ((n || ((n = findBox(e, s.start + 16, ['encv'])), (d = 86)), !n)) return
        const h = findBox(e, n.start + d, ['sinf', 'schi', 'tenc'])
        return h ? new TencBox(h.data, h.start, h.end) : void 0
      })(e)
      if (!s) return
      const n = (function (e) {
        const s = findBox(e, 0, ['moov']),
          n = []
        if (!s) return n
        const d = new DataView(e.buffer, 0)
        for (let h = s.start + 8; h < s.size; ) {
          const s = d.getUint32(h)
          'pssh' === encodedArrayToString(e.subarray(h + 4, h + 8)) && n.push(new PsshBox(e, h, h + s)), (h += s)
        }
        return n
      })(e).find((e) => e.isWidevine)
      n && (s.defaultKeyId = n.keyBytes)
    }
  function readSynchSafeUint32(e) {
    return 2097152 * (127 & e[0]) + 16384 * (127 & e[1]) + 128 * (127 & e[2]) + (127 & e[3])
  }
  const Ws = { 0: 'iso-8859-1', 1: 'utf-16', 2: 'utf-16be', 3: 'utf-8' },
    Gs = { TPE1: !0, TIT2: !0, WXXX: !0, PRIV: !0, TALB: !0, CHAP: !0 }
  class ID3 {
    constructor(e) {
      ;(this.frames = []),
        (this.unsynchronized = !1),
        (this.hasExtendedHeader = !1),
        (this.hasFooter = !1),
        (this.isExperimental = !1)
      let s = 0
      const n = Ve(e.subarray(s, s + 3))
      if (((s += 3), 'ID3' !== n)) return
      ;(this.minor = e[s++]), (this.revision = e[s++])
      const d = e[s++]
      this._parseID3Flags(d)
      const h = readSynchSafeUint32(e.subarray(s, s + 4))
      ;(s += 4), (this.frameLength = h)
      const p = s + h
      if (((this.endPos = p), this.hasExtendedHeader)) {
        s += readSynchSafeUint32(e.subarray(s, s + 4))
      }
      this.minor > 2 && this._parseID3Frames(this, e, s, p)
    }
    _parseID3Flags(e) {
      ;(this.unsynchronized = isBitAtPositionOn(e, 7)),
        (this.hasExtendedHeader = isBitAtPositionOn(e, 6)),
        (this.isExperimental = isBitAtPositionOn(e, 5)),
        (this.hasFooter = isBitAtPositionOn(e, 4))
    }
    _parseID3Frames(e, s, n, d) {
      const h = new DataView(s.buffer, 0, d),
        { minor: p } = this
      for (; n + 8 <= d; ) {
        const y = Ve(s.subarray(n, n + 4))
        n += 4
        const m = 4 === p ? readSynchSafeUint32(s.subarray(n, n + 4)) : h.getUint32(n)
        if (((n += 4), s[n++], s[n++], Gs[y])) {
          const h = n,
            p = this._extractID3FramePayload(s, y, m, h, d)
          if (p) {
            const s = this.decodeID3Frame(p)
            s && e.frames.push(s)
          }
          n += m
        } else n += m
      }
    }
    _extractID3FramePayload(e, s, n, d, h) {
      const p = d + n
      let y
      return p <= h && (y = { type: s, size: n, data: e.slice(d, p) }), y
    }
    decodeID3Frame(e) {
      if ('TXXX' !== e.type)
        return 'WXXX' === e.type
          ? this.decodeWxxxFrame(e)
          : 'PRIV' === e.type
          ? this.decodePrivFrame(e)
          : 'CHAP' === e.type
          ? this.decodeChapFrame(e)
          : 'T' === e.type[0]
          ? this.decodeTextFrame(e)
          : { key: e.type, data: e.data }
    }
    decodeChapFrame(e) {
      const { data: s } = e,
        n = new DataView(s.buffer),
        d = { key: 'CHAP', frames: [] }
      let [h, p] = readNullTerminatedString(s, 0, s.length)
      return (
        (d.id = h),
        p++,
        (d.startTime = n.getUint32(p)),
        (p += 4),
        (d.endTime = n.getUint32(p)),
        (p += 4),
        (p += 4),
        (p += 4),
        this._parseID3Frames(d, s, p, s.length),
        d
      )
    }
    decodeTextFrame(e) {
      const { data: s } = e,
        n = Ws[s[0]],
        d = encodedArrayToString(s.subarray(1), n)
      return { key: e.type, text: d }
    }
    decodeWxxxFrame(e) {
      const { data: s } = e,
        n = Ws[s[0]]
      let d = 1,
        h = encodedArrayToString(s.subarray(d), n)
      d += h.length + 1
      return { key: 'WXXX', description: h, text: encodedArrayToString(s.subarray(d)) }
    }
    decodePrivFrame(e) {
      const s = encodedArrayToString(e.data)
      if (!s) return
      return { key: 'PRIV', info: s, data: e.data.slice(s.length + 1) }
    }
  }
  function checkBoxName(e, s, n) {
    return !(s + 4 > e.length) && e[s] === n[0] && e[s + 1] === n[1] && e[s + 2] === n[2] && e[s + 3] === n[3]
  }
  function findEmsgs(e) {
    const s = e.length,
      n = []
    if (
      (function (e) {
        return (null == e ? void 0 : e.length) >= 8 && checkBoxName(e, 4, [102, 116, 121, 112])
      })(e)
    )
      return n
    for (let d = 0; d < s; d++) {
      if (checkBoxName(e, d, [109, 111, 111, 102])) return n
      if (checkBoxName(e, d, [101, 109, 115, 103])) {
        const s = d - 4,
          h = new DataView(e.buffer, s).getUint32(0),
          p = e.subarray(s, s + h)
        ;(d = d + h - 1), n.push(p)
      }
    }
    return n
  }
  const zs = { TALB: 'album', TIT2: 'title', TPE1: 'performer' },
    qs = ['performer', 'title', 'album']
  class TimedMetadata {
    constructor(e) {
      ;(this.links = []),
        (this.storefrontToIds = {}),
        e.forEach((e) => {
          var s, n
          const { key: d } = e,
            h = zs[d]
          if (h) this[h] = null === (s = e.text) || void 0 === s ? void 0 : s.replace(/\0/g, '')
          else if ('WXXX' === e.key) {
            if (e.description) {
              const [s, n] = e.description.split('\0')
              this.links.push({ description: s, url: n })
            }
          } else if ('PRIV' === e.key) {
            const s = null === (n = e.info) || void 0 === n ? void 0 : n.split('\0')
            if (s && s.length && s[0].startsWith('com.apple.radio.adamid')) {
              s[1].split(',').forEach((e) => {
                const [s, n] = e.split(':')
                s && n && '0' !== n && !this.storefrontToIds.hasOwnProperty(s) && (this.storefrontToIds[s] = n)
              })
            }
          }
        })
    }
    resolveAdamIdFromStorefront(e) {
      const s = this.storefrontToIds[e]
      this._adamId = s
    }
    get adamId() {
      return this._adamId
    }
    equals(e) {
      if (!qs.every((s) => this[s] === e[s])) return !1
      const { links: s } = this,
        n = e.links
      if (s.length !== n.length) return !1
      for (let d = 0; d < s.length; d++) {
        const e = s[d].description === n[d].description,
          h = s[d].url === n[d].url
        if (!e || !h) return !1
      }
      return !0
    }
  }
  class Emsg {
    constructor(e) {
      this.data = e
      const s = new DataView(e.buffer)
      let n = 8
      if (1 !== e[n]) return
      ;(n += 4), (this.timeScale = s.getUint32(n)), (n += 4)
      const d = s.getUint32(n)
      n += 4
      const h = s.getUint32(n)
      if (((n += 4), (this.presentationTime = Math.pow(2, 32) * d + h), !Number.isSafeInteger(this.presentationTime)))
        throw ((this.presentationTime = Number.MAX_SAFE_INTEGER), new Error('Failed to create 64 bit integer'))
      ;(this.eventDuration = s.getUint32(n)), (n += 4), (this.id = s.getUint32(n)), (n += 4)
      const [p, y] = readNullTerminatedString(e, n)
      ;(n += y + 1), (this.schemeIdUri = p)
      const [m, g] = readNullTerminatedString(e, n)
      ;(n += g + 1), (this.payload = e.subarray(n, e.byteLength)), (this.id3 = new ID3(this.payload))
    }
    get length() {
      return this.data.length
    }
    get elementPresentationTime() {
      const { presentationTime: e, timeScale: s } = this
      return e && s ? Math.round(e / s) : NaN
    }
    get timedMetadata() {
      var e
      if (this._timedMetadata) return this._timedMetadata
      const s = null === (e = this.id3) || void 0 === e ? void 0 : e.frames
      return s ? ((this._timedMetadata = new TimedMetadata(s)), this._timedMetadata) : void 0
    }
  }
  class TimedMetadataManager {
    constructor(e, s) {
      ;(this._currentTime = e),
        (this._onDidChange = s),
        (this._emsgLookup = {}),
        (this._getCurrentEmsg = this._getCurrentEmsg.bind(this))
    }
    processEmsgs(e) {
      const s = findEmsgs(e)
      s.length &&
        (this._currentEmsgInterval || (this._currentEmsgInterval = setInterval(this._getCurrentEmsg, 1e3)),
        s.forEach((e) => {
          const s = new Emsg(e)
          this._emsgLookup[s.elementPresentationTime] = s
        }))
    }
    stop() {
      const { _currentEmsgInterval: e } = this
      e && clearInterval(e)
    }
    _getCurrentEmsg() {
      const { _currentTime: e, _emsgLookup: s } = this,
        n = Math.round(e()),
        d = [],
        h = Object.keys(s)
      for (let y = 0; y < h.length; y++) {
        const e = parseInt(h[y], 10)
        if (!(e < n)) break
        d.push(e)
      }
      const p = d.pop()
      if (p) {
        const e = s[p]
        if (!e) return
        const { _currentEmsg: n, _onDidChange: d } = this,
          h = null == n ? void 0 : n.payload,
          y = e.payload
        ;(h && arrayEquals(h, y)) || ((this._currentEmsg = e), d(e)), this._cleanupEmsgs(p)
      }
    }
    _cleanupEmsgs(e) {
      const { _emsgLookup: s } = this
      Object.keys(s).forEach((n) => {
        parseInt(n, 10) < e && delete s[n]
      })
    }
  }
  class SegmentProcessor {
    constructor(e, s, n) {
      ;(this._item = e),
        (this._timedMetadataManager = new TimedMetadataManager(
          () => s.currentTime,
          (e) => {
            n.publish(Hs, e.timedMetadata)
          }
        ))
    }
    process(e, s) {
      const { _item: n } = this
      try {
        n.isLiveRadioStation
          ? this._processLiveRadioSegment(s)
          : n.hasOffersHlsUrl && this._processHlsOffersSegment(e, s)
      } catch (_t) {
        w.error('Error processing segment', _t)
      }
    }
    stop() {
      this._timedMetadataManager.stop()
    }
    _processHlsOffersSegment(e, s) {
      e.isInitSegment && rewriteDefaultKid(s)
    }
    _processLiveRadioSegment(e) {
      this._timedMetadataManager.processEmsgs(e)
    }
  }
  const Qs = new Logger$1({ levelFilterStorageKey: 'mk-mse-buffer', topic: 'mse-buffer' }),
    Xs = !!localStorage.getItem('mk-mse-buffer'),
    { manifestParsed: Js } = Wr
  class MseBuffer {
    constructor({ dispatcher: e, element: s, manifest: n, currentTime: d, duration: h, clip: p }) {
      ;(this.firstSegmentLoadPromise = Promise.resolve()),
        (this.hasKickstarted = !1),
        (this.segmentIndexToFetch = -1),
        (this.timeToTrim = 10),
        (this.isAtEndOfStream = !1),
        (this.isFullyBuffered = !1),
        (this.deferredRemoves = []),
        (this.currentTimestampOffset = 0),
        (this.dispatcher = e),
        (this.clip = p),
        (this.element = s),
        (this.mediaSource = new MediaSource()),
        this.mediaSource.addEventListener('sourceopen', this.onSourceOpen),
        (this.segmentProcessor = new SegmentProcessor(n.mediaItem, s, e)),
        (this.playbackTimeline = { current: { manifest: n } }),
        n.addEventListener(Js, this.onManifestParsed),
        (this._currentTime = d || 0),
        (this.duration = h),
        (window.mseBuffer = this)
    }
    onSourceOpen() {
      Qs.debug('mediaSource open handler')
      const { mediaSource: e } = this
      if (e.activeSourceBuffers.length > 0) return void Qs.debug('not adding new source buffer')
      Qs.debug('adding new source buffer')
      const s = e.addSourceBuffer('audio/mp4;codecs="mp4a.40.2"')
      ;(this.sourceBuffer = s), s.addEventListener('updateend', this.updateEndHandler)
      const { clip: n, hasAppendWindowSupport: d } = this
      n &&
        (d
          ? (Qs.debug('appendWindowStart/End', n.start, n.end),
            (s.appendWindowStart = n.start),
            (s.appendWindowEnd = n.end))
          : (Qs.debug('seeking for clip', n.start), asAsync(this.seek(n.start)))),
        this.updateSegmentToFetch(0, !0)
    }
    setNextManifest(e) {
      Qs.debug('setting next manifest for ', e.mediaItem.title),
        (this.playbackTimeline.next = { manifest: e }),
        this.isFullyBuffered &&
          (Qs.debug('current song is fully buffered, beginning transition to next'), this.transitionToNextManifest())
    }
    isItemPlaying(e) {
      var s, n
      const { playbackTimeline: d } = this,
        h = this.nextGaplessTransition
          ? null === (s = d.previous) || void 0 === s
            ? void 0
            : s.manifest.mediaItem
          : null === (n = d.current) || void 0 === n
          ? void 0
          : n.manifest.mediaItem
      return !!h && (Qs.debug(`isItemPlaying ${e.title}, ${h.title}, ${e.id === h.id}`), e.id === h.id)
    }
    get currentItem() {
      return this.manifest.mediaItem
    }
    get playableUrl() {
      let e = this._playableUrl
      return (
        e ||
        ((e = window.URL.createObjectURL(this.mediaSource)), Qs.debug('created url', e), (this._playableUrl = e), e)
      )
    }
    get segments() {
      const { manifest: e, clip: s } = this
      return s ? e.segmentsForTimeRange(s) : e.segments || []
    }
    get currentTime() {
      return this._currentTime
    }
    set currentTime(e) {
      var s, n
      if (((e += this.currentTimestampOffset), this._currentTime === e)) return
      const { nextGaplessTransition: d } = this
      if (d && e >= d) {
        ;(this.currentTimestampOffset = this.nextGaplessTransition || 0),
          (this.nextGaplessTransition = void 0),
          (this.duration = this.manifest.mediaItem.playbackDuration / 1e3)
        const e = {
          previous:
            null === (n = null === (s = this.playbackTimeline.previous) || void 0 === s ? void 0 : s.manifest) ||
            void 0 === n
              ? void 0
              : n.mediaItem,
          current: this.manifest.mediaItem,
        }
        Qs.debug('dispatching gapless transition', e), this.dispatcher.publish(Ys, e)
      }
      this._currentTime = e
      const { isOverBufferLimit: h, timeToTrim: p } = this,
        y = e > this.timeToTrim
      h && y && (Qs.debug('buffer over limit, trimming to ', p), this.removeToTime(p), (this.timeToTrim += 10))
    }
    get hasAppendWindowSupport() {
      var e
      return void 0 !== (null === (e = this.sourceBuffer) || void 0 === e ? void 0 : e.appendWindowStart)
    }
    seek(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const { duration: s, seekWhenUpdated: n, sourceBuffer: d } = this
        if ((this.resolveSeekPromise(!1), Qs.debug('seek to ', e), this.revertGaplessTransition(), (e = +e) > s || !d))
          return !1
        if (d.updating)
          return (
            Qs.debug('sourcebuffer updating, deferring seek'),
            new Promise((s) => {
              n && n.resolve(!1), (this.seekWhenUpdated = { seek: this.seek.bind(this, e), resolve: s })
            })
          )
        ;(this.currentlyLoadingSegmentIndex = void 0),
          this.updateSegmentToFetch(0, !0),
          this.removeToTime(e),
          (this.timeToTrim = 10 * Math.floor(e / 10))
        const h = this.getSegmentForTime(e)
        0 !== h && (yield this.firstSegmentLoadPromise),
          Qs.debug('seeking to', e, 'segment', h),
          this.updateSegmentToFetch(h, !0)
        const p = new Promise((s) => {
          this.seekResolver = { time: e, resolve: s }
        })
        return this.checkSeekBuffered(), p
      })
    }
    clearNextManifest() {
      this.revertGaplessTransition(!0), (this.playbackTimeline.next = void 0)
    }
    revertGaplessTransition(e = !1) {
      const { playbackTimeline: s, nextGaplessTransition: n } = this
      if (!n || !s.previous) return void Qs.debug('no need to revert, no transition')
      ;(this.isAtEndOfStream = e),
        Qs.debug('reverting gapless transition with discardNextManifest', e),
        e ? this.clearBufferToEnd(n) : this.clearBuffer(),
        Qs.debug('abandoning transition to ' + this.manifest.mediaItem.title),
        (s.next = e ? void 0 : s.current),
        (s.current = s.previous),
        (s.previous = void 0)
      const d = this.manifest.mediaItem
      Qs.debug('current item reverted to ' + d.title),
        (this.nextGaplessTransition = void 0),
        (this.timestampOffsetAdjustment = 0),
        (this.currentTimestampOffset = 0),
        (this.duration = d.playbackDuration / 1e3),
        Qs.debug('reverted timestampOffset to 0 and duration to ' + this.duration),
        (this.segmentIndexToFetch = -1)
    }
    get streamHasEnding() {
      return !this.manifest.mediaItem.isLiveRadioStation
    }
    stop() {
      this.segmentProcessor.stop(), this.setEndOfStream(), this.remove()
    }
    remove() {
      var e
      Qs.debug('removing sourceBuffer and mediaSource')
      const { sourceBuffer: s, mediaSource: n } = this
      null === (e = this.seekResolver) || void 0 === e || e.resolve(!1),
        this.manifest.removeEventListener(Js, this.onManifestParsed)
      const d = this._playableUrl
      d && (Qs.debug('revoking url', d), window.URL.revokeObjectURL(d)),
        n.removeEventListener('sourceopen', this.onSourceOpen),
        s && (s.removeEventListener('updateend', this.updateEndHandler), (this.sourceBuffer = void 0))
    }
    onManifestParsed() {
      const e = this.segmentIndexToFetch + 1
      Qs.debug('manifestParsed, loading segment', e), this.updateSegmentToFetch(e, !0)
    }
    updateEndHandler() {
      if ((this.kickstartBuffer(), this.clearDeferredRemove())) return
      if ((Qs.debug('update end', this.seekWhenUpdated), this.seekWhenUpdated)) {
        Qs.debug('updateEndHandler resolving seekWhenUpdated')
        const { seekWhenUpdated: e } = this
        return asAsync(e.seek().then(e.resolve)), void (this.seekWhenUpdated = void 0)
      }
      this.checkSeekBuffered()
      const { clip: e, sourceBuffer: s, hasAppendWindowSupport: n } = this
      if (e && s && !n) {
        const { buffered: n } = s
        if (this.isTimeBuffered(e.end + 1)) {
          const d = n.end(n.length - 1)
          return Qs.debug('clipping sourcebuffer to', e.end, d), void s.remove(e.end, d)
        }
      }
      if (this.isAtEndOfStream)
        return (
          this.streamHasEnding &&
            (Qs.debug('isAtEndOfStream, not fetching any more segments'),
            this.setEndOfStream(),
            this.transitionToNextManifest()),
          void (this.isAtEndOfStream = !1)
        )
      Qs.debug('updateEndHandler invoking loadSegment'), asAsync(this.loadSegment())
    }
    clearDeferredRemove() {
      var e
      if (0 === this.deferredRemoves.length) return !1
      const s = this.deferredRemoves.shift()
      return null === (e = this.sourceBuffer) || void 0 === e || e.remove(s.start, s.end), !0
    }
    transitionToNextManifest() {
      var e
      Qs.debug('beginning transition to next manifest')
      const { playbackTimeline: s, sourceBuffer: n } = this
      if (!s.next || !n) return void Qs.debug('no next manifest')
      const d = this.endOfBufferTime || this.currentTimestampOffset
      Qs.debug('setting gapless transition at', d),
        (this.nextGaplessTransition = d),
        (this.timestampOffsetAdjustment = d),
        (this.playbackTimeline.current.endTime = d),
        (s.previous = s.current),
        Qs.debug(
          'previous manifest set to',
          null === (e = s.previous) || void 0 === e ? void 0 : e.manifest.mediaItem.title
        ),
        (s.current = s.next),
        Qs.debug('current manifest set to', s.current.manifest.mediaItem.title),
        (s.next = void 0),
        this.updateSegmentToFetch(0, !0)
    }
    updateSegmentToFetch(e, s = !1) {
      this.segments.length &&
        e < this.segments.length &&
        e !== this.segmentIndexToFetch &&
        ((this.segmentIndexToFetch = e),
        s && (Qs.debug('updateSegmentToFetch invoking loadSegment'), asAsync(this.loadSegment())))
    }
    loadSegment() {
      return __awaiter$4(this, void 0, void 0, function* () {
        const e = this.segmentIndexToFetch,
          s = this.segments[e]
        if (e !== this.currentlyLoadingSegmentIndex) {
          if (s)
            try {
              Qs.debug('begin loadSegment ' + e), (this.currentlyLoadingSegmentIndex = e)
              const d = s.load()
              0 === e && (this.firstSegmentLoadPromise = d)
              const h = yield d
              if (0 !== e && e !== this.segmentIndexToFetch)
                return void Qs.debug('load segment index to fetch changed, not processing bytes for segment', e)
              this.segmentProcessor.process(s, h), Qs.debug('loadSegment processed: ' + e)
              const { sourceBuffer: p, timestampOffsetAdjustment: y } = this
              if (!p) return
              try {
                'number' == typeof y &&
                  (Qs.debug('adjusting timestampOffset of sourcebuffer to', y),
                  (p.timestampOffset = y),
                  (this.timestampOffsetAdjustment = void 0)),
                  p.appendBuffer(h),
                  (this.isFullyBuffered = !1),
                  (this.isOverBufferLimit = !1),
                  Qs.debug('appended to buffer', h.length),
                  this.printBufferTimes(),
                  e === this.segments.length - 1
                    ? (this.isAtEndOfStream = !0)
                    : e === this.segmentIndexToFetch &&
                      (Qs.debug('loadSegment bumping segment index to fetch to ', e + 1),
                      this.updateSegmentToFetch(e + 1))
              } catch (n) {
                'QuotaExceededError' === n.name
                  ? ((this.isOverBufferLimit = !0), Qs.debug('reached buffer limit'))
                  : Qs.warn('Error appending to source buffer', n)
              }
            } catch (_t) {
              Qs.error('Error loading segment', _t)
            } finally {
              this.currentlyLoadingSegmentIndex = void 0
            }
        } else Qs.debug(`segment ${e} is currently loading, not loading it again`)
      })
    }
    setEndOfStream() {
      const { sourceBuffer: e, mediaSource: s } = this
      e &&
        'ended' !== s.readyState &&
        (e.updating || 'open' !== s.readyState
          ? Qs.error('Could not end of stream (updating, readyState)', e.updating, s.readyState)
          : (Qs.debug('mediaSource.endOfStream'), s.endOfStream(), (this.isFullyBuffered = !0)))
    }
    removeToTime(e) {
      Qs.debug('removing to time', e),
        e > 0 && (this.isTimeBuffered(e) || this.isOverBufferLimit) && this.safeSourceBufferRemove(0, e)
    }
    safeSourceBufferRemove(e, s) {
      const { sourceBuffer: n } = this
      n && (n.updating ? this.deferredRemoves.push({ start: e, end: s }) : n.remove(e, s))
    }
    get previousOffset() {
      var e, s
      return (
        (null === (s = null === (e = this.playbackTimeline) || void 0 === e ? void 0 : e.previous) || void 0 === s
          ? void 0
          : s.endTime) || 0
      )
    }
    get manifest() {
      var e
      return null === (e = this.playbackTimeline.current) || void 0 === e ? void 0 : e.manifest
    }
    checkSeekBuffered() {
      const { seekResolver: e, currentTimestampOffset: s } = this
      if (!e) return
      const { time: n } = e,
        d = n + s,
        h = this.isTimeBuffered(d)
      Qs.debug('resolving seek for time, adjustedTime, isBuffered', n, d, h),
        this.printBufferTimes(),
        h &&
          (Qs.debug('resolving seek to true for time:', d), (this.element.currentTime = d), this.resolveSeekPromise(!0))
    }
    resolveSeekPromise(e) {
      this.seekResolver && (this.seekResolver.resolve(e), (this.seekResolver = void 0))
    }
    get endOfBufferTime() {
      var e
      const s = null === (e = this.sourceBuffer) || void 0 === e ? void 0 : e.buffered
      return !(!s || !s.length) && s.end(s.length - 1)
    }
    isTimeBuffered(e) {
      var s
      const n = null === (s = this.sourceBuffer) || void 0 === s ? void 0 : s.buffered
      if (!n) return !1
      for (let d = 0; d < n.length; d++)
        if ((Qs.debug('isTimeBuffered', n.start(d), e, n.end(d)), e >= n.start(d) && e <= n.end(d))) return !0
      return !1
    }
    clearBufferToEnd(e) {
      const { sourceBuffer: s } = this
      if (!s || !s.buffered) return
      const n = s.buffered.end(s.buffered.length - 1)
      this.safeSourceBufferRemove(e, n)
    }
    clearBuffer() {
      const { sourceBuffer: e } = this
      if (!e || !e.buffered) return
      const s = e.buffered
      for (let n = 0; n < s.length; n++) this.safeSourceBufferRemove(s.start(n), s.end(n))
    }
    printBufferTimes() {
      var e
      if (!Xs) return
      const s = null === (e = this.sourceBuffer) || void 0 === e ? void 0 : e.buffered
      if (!s) return
      const n = []
      for (let d = 0; d < s.length; d++) n.push(`start ${s.start(d)} end: ${s.end(d)}`)
      Qs.debug('buffer times', n.join(','))
    }
    getSegmentForTime(e) {
      return Math.floor(e / 10) + 1
    }
    kickstartBuffer() {
      const { hasKickstarted: e, element: s, clip: n } = this,
        { buffered: d } = s
      e ||
        (this.manifest.mediaItem.isSong
          ? n && this.isTimeBuffered(n.start) && ((s.currentTime = n.start), (this.hasKickstarted = !0))
          : d.length && ((s.currentTime = d.start(0)), (this.hasKickstarted = !0)))
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', []),
      __metadata$2('design:returntype', void 0),
    ],
    MseBuffer.prototype,
    'onSourceOpen',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', void 0),
      ],
      MseBuffer.prototype,
      'onManifestParsed',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', void 0),
      ],
      MseBuffer.prototype,
      'updateEndHandler',
      null
    )
  const { mediaPlaybackError: Zs } = ar
  class AudioPlayer extends BasePlayer {
    constructor(e) {
      var s
      super(e),
        (this.currentAudioTrack = void 0),
        (this.currentTextTrack = void 0),
        (this.textTracks = []),
        (this.audioTracks = []),
        (this.isGaplessEnabled = !1),
        (this.mediaPlayerType = 'audio'),
        (this.isGaplessEnabled = !!(null === (s = null == e ? void 0 : e.bag) || void 0 === s
          ? void 0
          : s.features['enable-gapless'])),
        (window.audioPlayer = this)
    }
    get _targetElement() {
      return this.audio
    }
    initializeExtension() {
      return __awaiter$4(this, void 0, void 0, function* () {
        ;(this.extension = new MediaExtension(this.audio, 'audio/mp4;codecs="mp4a.40.2"')),
          yield this.extension.initializeKeySystem(),
          this.extension.addEventListener(Wr.playbackLicenseError, (e) => {
            this._licenseError(), this._dispatcher.publish(Zs, e)
          }),
          this.extension.addEventListener(Wr.playbackSessionError, (e) => {
            this._dispatcher.publish(Zs, new MKError(MKError.MEDIA_SESSION, e))
          })
      })
    }
    initializeMediaElement() {
      return __awaiter$4(this, void 0, void 0, function* () {
        const e = (function () {
          let e = is.pop()
          return (
            e
              ? w.debug(`dom-helpers: retrieving audio tag, ${is.length} remain`)
              : (w.debug('dom-helpers: no available audio tags, creating one'), (e = document.createElement('audio'))),
            e
          )
        })()
        ;(e.autoplay = !1),
          (e.id = 'apple-music-player'),
          (e.controls = !1),
          (e.muted = !1),
          (e.playbackRate = 1),
          (e.preload = 'metadata'),
          (e.volume = 1),
          (this.audio = e),
          document.body.appendChild(e),
          w.debug('initializedMediaElement', e)
      })
    }
    isPlayerSupported() {
      return !0
    }
    _stopMediaElement() {
      const e = Object.create(null, { _stopMediaElement: { get: () => super._stopMediaElement } })
      var s
      return __awaiter$4(this, void 0, void 0, function* () {
        yield e._stopMediaElement.call(this),
          yield this.tearDownManifests(),
          null === (s = this._buffer) || void 0 === s || s.stop(),
          (this._buffer = void 0)
      })
    }
    setNextGaplessItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const { extension: s } = this,
          n = this._buffer
        if (!n || !s) return
        w.debug('player preparing next manifest for', e.title)
        const d = yield this.loadAndParseManifest(e)
        n.setNextManifest(d), s.setMediaItem(e), (s.extURI = d.extURI), (this.nextManifest = d)
      })
    }
    playItemFromEncryptedSource(s, n = !1, d) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const h = this._paused && !n
        if (s.playRawAssetURL)
          return (
            (s.playbackType = e.PlaybackType.unencryptedFull),
            (this.nowPlayingItem = s),
            this._playAssetURL(s.assetURL, h)
          )
        const { extension: p } = this
        if (!p) return
        ;(p.initiated = n),
          p.setMediaItem(s),
          (s.playbackType = e.PlaybackType.encryptedFull),
          (this.nowPlayingItem = s),
          (s.state = C.loading)
        const y = yield this.getManifestForItem(s)
        this.manifest = y
        const m = shouldForceAudioMse()
        if (((s.isSong || (p.isFairplay && m)) && (p.extURI = y.extURI), (s.state = C.ready), p.isFairplay && !m)) {
          let e = s.assetURL
          return (null == d ? void 0 : d.startTime) && (e += '#t=' + d.startTime), this._playAssetURL(e, h)
        }
        {
          const e = this._buffer
          if (!(e && this.isGaplessEnabled && e.isItemPlaying(y.mediaItem))) return this.beginNewBufferForItem(h, y, d)
          w.debug('already have buffer, continuing playback')
        }
      })
    }
    getManifestForItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('reconciling item to play against playing item')
        const { nextManifest: s, manifest: n, isGaplessEnabled: d } = this,
          h = this._buffer
        if (!h || !n)
          return (
            w.debug('no buffer or manifest, creating manifest [title, buffer, manifest]', e.title, !!h, !!n),
            this.loadAndParseManifest(e)
          )
        if (!d)
          return (
            w.debug('gapless disabled, stopping and creating manifest for', e.title),
            yield this.tearDownManifests(),
            this.loadAndParseManifest(e)
          )
        const p = !h.isItemPlaying(e)
        let y
        return (
          w.debug('itemMismatch', p),
          s && !p
            ? (w.debug(`replacing manifest for ${n.mediaItem.title} with next manifest ${s.mediaItem.title}`),
              (y = s),
              (this.nextManifest = void 0),
              w.debug('cease listening for keys on manifest for', n.mediaItem.title),
              yield this.tearDownManifest(n))
            : p
            ? (w.debug(
                `item to play ${e.title} does not match playing item ${
                  null == s ? void 0 : s.mediaItem.title
                }, stopping playback`
              ),
              yield this.tearDownManifests(),
              (y = yield this.loadAndParseManifest(e)))
            : (w.debug('item is already playing, returning existing manifest'), (y = n)),
          y
        )
      })
    }
    tearDownManifests() {
      return __awaiter$4(this, void 0, void 0, function* () {
        ;(this.manifest = yield this.tearDownManifest(this.manifest)),
          (this.nextManifest = yield this.tearDownManifest(this.nextManifest))
      })
    }
    tearDownManifest(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const { extension: s } = this
        e &&
          (w.debug('tearing down manifest for', e.mediaItem.title),
          e.stop(),
          s && (yield s.clearSessions(e.keyValues)),
          e.removeEventListener(Fs.keysParsed, this.loadKeysHandler))
      })
    }
    loadAndParseManifest(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('will load and parse manifest for', e.title)
        const s = yield Manifest.load(e, !1)
        return s.addEventListener(Fs.keysParsed, this.loadKeysHandler), s.parse(), s
      })
    }
    loadKeysHandler(e) {
      var s, n
      null === (n = null === (s = this.extension) || void 0 === s ? void 0 : s.session) ||
        void 0 === n ||
        n.loadKeys(e.keys)
    }
    beginNewBufferForItem(e, s, n) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (
          (w.debug('creating new MseBuffer for item', s.mediaItem.title, e),
          this._buffer && (w.debug('stopping old buffer'), this._buffer.stop()),
          (this._buffer = new MseBuffer({
            dispatcher: this._dispatcher,
            element: this._targetElement,
            duration: s.mediaItem.playbackDuration / 1e3,
            manifest: s,
          })),
          yield this._playAssetURL(this._buffer.playableUrl, !0),
          !e)
        ) {
          let e = Promise.resolve()
          return (
            (null == n ? void 0 : n.startTime) && (e = this.seekToTime(n.startTime)), e.then(() => this._playMedia())
          )
        }
      })
    }
    setPresentationMode(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return Promise.resolve()
      })
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object]),
      __metadata$2('design:returntype', void 0),
    ],
    AudioPlayer.prototype,
    'loadKeysHandler',
    null
  )
  class EncryptedSession extends KeySession {
    attachMedia(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        ;(this.keySystem = s.keySystem),
          (this._keySystemAccess = s),
          e.addEventListener('encrypted', this.boundHandleSessionCreation, !1)
      })
    }
    detachMedia(e) {
      e.removeEventListener('encrypted', this.boundHandleSessionCreation)
    }
    createSession(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('Encrypted createSession', e)
        const s = this._keySystemAccess
        if (!s) return
        const { initData: n, initDataType: d, target: h } = e
        return (
          this._mediaKeysPromise ||
            (this._mediaKeysPromise = new Promise((e, n) =>
              __awaiter$4(this, void 0, void 0, function* () {
                const d = yield s.createMediaKeys()
                try {
                  yield h.setMediaKeys(d)
                } catch (B) {
                  this.dispatchKeyError(B), n(B)
                }
                const p = yield this.loadCertificateBuffer()
                yield d.setServerCertificate(p), (this._mediaKeysServerCertificate = p), e(d)
              })
            )),
          yield this._mediaKeysPromise,
          this._mediaKeysServerCertificate ? this._createSession(h, n, d) : void 0
        )
      })
    }
    generatePSSH(e) {
      const s = new Uint8Array([
          0, 0, 0, 52, 112, 115, 115, 104, 0, 0, 0, 0, 237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213,
          29, 33, 237, 0, 0, 0, 20, 8, 1, 18, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]),
        n = Ye(e)
      for (let d = 0; d < n.length; d++) s[s.length - 16 + d] = n[d]
      return w.debug('generatePSSH', s), s
    }
    _createSession(e, s, n) {
      const d = e.mediaKeys.createSession(),
        { item: h } = this
      if (!h) return
      this._teardownCurrentSession(), w.debug('creating media key session', d)
      let p
      if (this.isWidevine && h.isSong) p = this.generatePSSH(this.extID)
      else {
        const e = findPsshBoxesInInitData(new Uint8Array(s)).find((e) => e.isWidevine),
          n = null == e ? void 0 : e.rawBytes,
          h = Ge(n)
        w.debug('extracted uri', h), (d.extURI = h), (p = s)
      }
      return (
        d.addEventListener('message', this.startLicenseSession),
        (this._currentSession = d),
        d.generateRequest(n, p).catch((e) => {
          if (e.message.match(/generateRequest.*\(75\)/)) return d.generateRequest(n, p)
          throw e
        })
      )
    }
    _teardownCurrentSession() {
      this._currentSession &&
        (w.debug('tearing down media key session', this._currentSession),
        this._currentSession.removeEventListener('message', this.startLicenseSession),
        (this._currentSession = void 0))
    }
    loadKeys(e) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    clearSessions() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
  }
  class MediaExtensionStub extends Notifications {
    constructor(e) {
      super(e),
        (this.audioTracks = []),
        (this.textTracks = []),
        (this.extURI = ''),
        (this.hasMediaKeySupport = !0),
        (this.initiated = !0),
        (this.isFairplay = !0),
        (this.hasMediaKeySupport = !0),
        (this.hasMediaSession = !0)
    }
    destroy(e) {}
    setMediaItem(e) {}
    initializeKeySystem() {
      return __awaiter$4(this, void 0, void 0, function* () {
        this.session = new EncryptedSession()
      })
    }
    clearSessions() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
  }
  class PlayerStub {
    constructor(s) {
      ;(this.bitrate = e.PlaybackBitrate.STANDARD),
        (this.audioTracks = []),
        (this.currentBufferedProgress = 0),
        (this.currentPlaybackDuration = 0),
        (this.currentPlaybackProgress = 0),
        (this.currentPlaybackTime = 0),
        (this.currentPlaybackTimeRemaining = 0),
        (this.formattedCurrentPlaybackDuration = { hours: 0, minutes: 0 }),
        (this.isPlaying = !1),
        (this.isPrimaryPlayer = !0),
        (this.isReady = !1),
        (this.paused = !1),
        (this.playbackState = e.PlaybackStates.none),
        (this.playbackTargetAvailable = !1),
        (this.playbackTargetIsWireless = !1),
        (this.previewOnly = !1),
        (this.textTracks = []),
        (this.extension = new MediaExtensionStub([])),
        (this.hasAuthorization = !0),
        (this.isDestroyed = !1),
        (this._volume = 1),
        (this._playbackRate = 1),
        (this._dispatcher = s.services.dispatcher),
        (this.windowHandlers = new WindowHandlers(this))
    }
    get hasMediaElement() {
      return !0
    }
    get isEngagedInPlayback() {
      return !this.paused
    }
    get playbackRate() {
      return this._playbackRate
    }
    set playbackRate(e) {
      ;(this._playbackRate = e), this._dispatcher.publish(ar.playbackRateDidChange, new Event('ratechange'))
    }
    get volume() {
      return this._volume
    }
    set volume(e) {
      ;(this._volume = e), this._dispatcher.publish(ar.playbackVolumeDidChange, new Event('volumeChange'))
    }
    destroy() {}
    dispatch() {}
    exitFullscreen() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    initialize() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    isPaused() {
      return this.paused
    }
    clearNextManifest() {}
    mute() {}
    newSeeker() {
      return new PlayerSeeker(this)
    }
    pause(e) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    play() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    playItemFromEncryptedSource(e, s, n) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    playItemFromUnencryptedSource(e, s, n) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    preload() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    prepareToPlay(e, s, n) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    seekToTime(e) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    requestFullscreen() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    setPresentationMode(e) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    showPlaybackTargetPicker() {}
    stop(e) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    stopMediaAndCleanup() {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
    supportsPictureInPicture() {
      return !1
    }
    tsidChanged() {}
    setNextGaplessItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {})
    }
  }
  const parseSkipItems = (e) => {
      const s = parseInt(e.hlsMetadata['skip.count'], 10),
        n = []
      if (isNaN(s) || 0 === s) return n
      for (let d = 0; d < s; d++)
        n.push({
          start: parseFloat(e.hlsMetadata[`skip.${d}.start`]),
          duration: parseFloat(e.hlsMetadata[`skip.${d}.duration`]),
          target: parseFloat(e.hlsMetadata[`skip.${d}.target`]),
          label: e.hlsMetadata[`skip.${d}.label`],
        })
      return n
    },
    parseRollItems = (e, s = ['pre-roll', 'mid-roll', 'post-roll']) => {
      if (void 0 === e.hlsMetadata) return []
      const n = []
      return (
        s.forEach((s) => {
          const d = parseInt(e.hlsMetadata[s + '.count'], 10)
          if (!isNaN(d))
            for (let h = 0; h < d; h++) {
              const d = `${s}.${h}`
              n.push({
                index: h,
                type: s,
                skippable: 'true' === e.hlsMetadata[d + '.skippable'],
                'adam-id': e.hlsMetadata[d + '.adam-id'],
                start: Math.round(parseFloat(e.hlsMetadata[d + '.start'])),
                duration: Math.round(parseFloat(e.hlsMetadata[d + '.duration'])),
              })
            }
        }),
        n
      )
    }
  class PlaybackMonitor {
    constructor(e) {
      ;(this.isActive = !1),
        (this.isMonitoring = !1),
        (this.watchers = []),
        (this.handlePlaybackThreshold = this.handlePlaybackThreshold.bind(this)),
        (this.playbackController = e.controller),
        (this.dispatcher = e.services.dispatcher),
        this.dispatcher.subscribe(or.nowPlayingItemDidChange, this.handleMediaItemChange),
        (this.apiManager = e.services.apiManager)
    }
    activate() {
      ;(this.isActive = !0), this.startMonitor()
    }
    deactivate() {
      ;(this.isActive = !1), this.clearMonitor()
    }
    clearMonitor() {
      this.isMonitoring && (this.watchers.forEach((e) => e.stopMonitor()), (this.isMonitoring = !1))
    }
    shouldMonitor() {
      return this.isActive
    }
    startMonitor() {
      this.shouldMonitor() && (this.watchers.forEach((e) => e.startMonitor()), (this.isMonitoring = !0))
    }
    handleMediaItemChange() {
      this.isActive && (this.clearMonitor(), this.shouldMonitor() && this.startMonitor())
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', []),
      __metadata$2('design:returntype', void 0),
    ],
    PlaybackMonitor.prototype,
    'handleMediaItemChange',
    null
  )
  class SpanWatcher {
    constructor(e, s, n, d, h = !1) {
      ;(this.dispatcher = e),
        (this.callback = s),
        (this.start = n),
        (this.stop = d),
        (this.allowMultiple = h),
        (this.inWatchSpan = !1)
    }
    startMonitor() {
      this.dispatcher.unsubscribe(or.playbackTimeDidChange, this.handleTimeChange),
        this.dispatcher.subscribe(or.playbackTimeDidChange, this.handleTimeChange)
    }
    stopMonitor() {
      this.dispatcher.unsubscribe(or.playbackTimeDidChange, this.handleTimeChange)
    }
    handleTimeChange(e, { currentPlaybackTime: s }) {
      return __awaiter$4(this, void 0, void 0, function* () {
        !Number.isFinite(s) || s < this.start || s > this.stop
          ? (this.inWatchSpan = !1)
          : this.inWatchSpan ||
            (this.allowMultiple || this.stopMonitor(), (this.inWatchSpan = !0), yield this.callback(s, this))
      })
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object, Object]),
      __metadata$2('design:returntype', Promise),
    ],
    SpanWatcher.prototype,
    'handleTimeChange',
    null
  )
  class RollMonitor extends PlaybackMonitor {
    constructor(e) {
      super(e), (this.rollMap = new Map())
    }
    handlePlaybackThreshold(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!this.rollMap.has(s)) return
        const e = this.rollMap.get(s)
        this.dispatcher.publish(or.mediaRollEntered, e), this.rollMap.delete(s)
      })
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return !1
      return this.getRollMetadata().length > 0
    }
    startMonitor() {
      this.setupWatchers(this.getRollMetadata()), super.startMonitor()
    }
    getRollMetadata() {
      const e = this.playbackController.nowPlayingItem
      return void 0 === e ? [] : parseRollItems(e, ['pre-roll', 'post-roll'])
    }
    setupWatchers(e) {
      const s = []
      e.forEach((e) => {
        const { start: n, duration: d } = e,
          h = new SpanWatcher(this.dispatcher, this.handlePlaybackThreshold, n, n + d)
        s.push(h), this.rollMap.set(h, e)
      }),
        (this.watchers = s)
    }
  }
  class SkipAvailable extends PlaybackMonitor {
    constructor(e) {
      super(e), (this.skipMap = new Map())
    }
    handlePlaybackThreshold(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!this.skipMap.has(s)) return
        const e = this.skipMap.get(s)
        this.dispatcher.publish(or.mediaSkipAvailable, e), this.skipMap.delete(s)
      })
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return !1
      return this.getNowPlayingMetadata().length > 0
    }
    startMonitor() {
      this.setupWatchers(this.getNowPlayingMetadata()), super.startMonitor()
    }
    getNowPlayingMetadata() {
      const e = this.playbackController.nowPlayingItem
      return void 0 === e ? [] : parseSkipItems(e)
    }
    setupWatchers(e) {
      const s = []
      e.forEach((e) => {
        const { start: n, duration: d } = e,
          h = new SpanWatcher(this.dispatcher, this.handlePlaybackThreshold, n, n + d)
        s.push(h), this.skipMap.set(h, e)
      }),
        (this.watchers = s)
    }
  }
  const en = new Logger$1(),
    getUpNextStart = (e) => parseFloat(e.hlsMetadata['up-next.start']),
    getWatchedTime = (e) => parseFloat(e.hlsMetadata['watched.time']),
    fetchHLSMetadata = (e) =>
      __awaiter$4(void 0, void 0, void 0, function* () {
        if (e.isUTS && e.assetURL)
          try {
            const s = (yield fetch(e.assetURL).then((e) => e.text())).match(
              /^(?:#EXT-X-SESSION-DATA:?)DATA\-ID="([^"]+)".+VALUE="([^"]+)".*$/gm
            )
            s &&
              s.forEach((s) => {
                const n = s.split(',')[0].split('com.apple.hls.')[1].replace(/"/g, ''),
                  d = s.split(',')[1].split('VALUE=')[1].replace(/"/g, '')
                e.hlsMetadata[n] = d
              })
          } catch (Vo) {
            en.log(Vo)
          }
      })
  class UpNextMonitor extends PlaybackMonitor {
    constructor(e) {
      super(e)
      const s = this.handlePlaybackThreshold
      this.watchers = [
        {
          startMonitor: () => {
            this.dispatcher.unsubscribe(Ze.mediaContentComplete, s),
              this.dispatcher.subscribe(Ze.mediaContentComplete, s)
          },
          stopMonitor: () => {
            this.dispatcher.unsubscribe(Ze.mediaContentComplete, s)
          },
        },
      ]
    }
    handlePlaybackThreshold() {
      var e, s, n, d
      return __awaiter$4(this, void 0, void 0, function* () {
        const h = this.playbackController.nowPlayingItem
        if ('Episode' === (null == h ? void 0 : h.type)) {
          let n
          try {
            n = yield null === (e = this.apiManager.utsAPI) || void 0 === e
              ? void 0
              : e.showEpisodeNextepisode({
                  showId: null === (s = null == h ? void 0 : h.attributes) || void 0 === s ? void 0 : s.showId,
                  episodeId: null == h ? void 0 : h.id,
                })
          } catch (m) {}
          if (n && this.isAppleOriginal(n))
            return void this.dispatcher.publish(or.mediaUpNext, { item: n, isNextEpisode: !0 })
        }
        let p = yield null === (n = this.apiManager.utsAPI) || void 0 === n
          ? void 0
          : n.getPostPlayShelf(null == h ? void 0 : h.id)
        if (
          ((null == p ? void 0 : p.items) ||
            (p = yield null === (d = this.apiManager.utsAPI) || void 0 === d ? void 0 : d.watchlistContinueWatching()),
          !(null == p ? void 0 : p.items) || !Array.isArray(p.items))
        )
          return
        const y = p.items.find((e) => this.isAppleOriginal(e) && 'Show' !== e.type)
        y && this.dispatcher.publish(or.mediaUpNext, { item: y })
      })
    }
    shouldMonitor() {
      return (
        !!super.shouldMonitor() &&
        void 0 !== this.playbackController.nowPlayingItem &&
        ((e = this.playbackController.nowPlayingItem), !isNaN(getUpNextStart(e)) && !isNaN(getWatchedTime(e)))
      )
      var e
    }
    isAppleOriginal(e) {
      var s
      return e.isAppleOriginal || (null === (s = e.content) || void 0 === s ? void 0 : s.isAppleOriginal)
    }
  }
  var tn
  const rn = getHlsJsCdnConfig(),
    sn = {
      app: {},
      autoplay: { maxQueueSizeForAutoplay: 50, maxQueueSizeInRequest: 10, maxUpcomingTracksToMaintain: 10 },
      features: { xtrick: !0, isWeb: !0, bookmarking: !1, 'enable-gapless': !1 },
      urls: {
        hls: rn.hls,
        rtc: rn.rtc,
        mediaApi: 'https://api.music.apple.com/v1',
        webPlayback: `https://${getCommerceHostname('play')}/WebObjects/MZPlay.woa/wa/webPlayback`,
      },
    }
  if ('undefined' != typeof localStorage)
    try {
      const e = null !== (tn = localStorage.getItem('mk-offers-key-urls')) && void 0 !== tn ? tn : void 0
      isStringNotEmpty(e) && (sn.urls.hlsOffersKeyUrls = JSON.parse(e))
    } catch (_t) {}
  let nn
  class Store {
    constructor(e, s = {}) {
      ;(this._hasAuthorized = !1),
        (this._providedRequestUserToken = !1),
        (this._dispatcher = s.services.dispatcher),
        s.precache && (this.precache = s.precache),
        s.storefrontId && (this.storefrontId = s.storefrontId),
        (this._defaultStorefrontCountryCode = s.storefrontCountryCode),
        (s.affiliateToken || s.campaignToken) &&
          (s.linkParameters = Object.assign(Object.assign({}, s.linkParameters || {}), {
            at: s.affiliateToken,
            ct: s.campaignToken,
          })),
        (this.storekit = new StoreKit(e, {
          apiBase: sn.urls.mediaApi,
          authenticateMethod: sn.features['legacy-authenticate-method'] ? 'POST' : 'GET',
          deeplink: s.linkParameters,
          disableAuthBridge: s.disableAuthBridge,
          iconURL: sn.app.icon,
          persist: s.persist,
          realm: s.realm || 0,
        })),
        this.storekit.addEventListener(or.authorizationStatusDidChange, (e) => {
          const { authorizationStatus: s } = e
          this._hasAuthorized = [Qi.AUTHORIZED, Qi.RESTRICTED].includes(s)
        })
    }
    get authorizationStatus() {
      return this.storekit.authorizationStatus
    }
    get cid() {
      return this.storekit.cid
    }
    get developerToken() {
      return this.storekit.developerToken
    }
    get hasAuthorized() {
      return this._hasAuthorized
    }
    get isAuthorized() {
      return this.storekit.hasAuthorized
    }
    get isRestricted() {
      return this.storekit.authorizationStatus === Qi.RESTRICTED
    }
    get metricsClientId() {
      return this._metricsClientId
    }
    set metricsClientId(e) {
      this._metricsClientId = e
    }
    get musicUserToken() {
      return this.storekit.userToken
    }
    set musicUserToken(e) {
      this.storekit.userToken = e
    }
    set dynamicMusicUserToken(e) {
      this.storekit.dynamicUserToken = e
    }
    get realm() {
      return this.storekit.realm
    }
    set requestUserToken(e) {
      ;(this._providedRequestUserToken = !0), (this.storekit.requestUserToken = e)
    }
    get restrictedEnabled() {
      return this.storekit.restrictedEnabled
    }
    get storefrontCountryCode() {
      var e
      return this.isAuthorized
        ? this.storekit.storefrontCountryCode
        : null !== (e = this._defaultStorefrontCountryCode) && void 0 !== e
        ? e
        : this.storekit.storefrontCountryCode
    }
    get storefrontId() {
      return this._apiStorefrontId || this.storekit.storefrontCountryCode
    }
    set storefrontId(e) {
      e && (e = e.toLowerCase()),
        e !== this._apiStorefrontId &&
          ((this._apiStorefrontId = e), this._dispatcher.publish(Ze.apiStorefrontChanged, { storefrontId: e }))
    }
    get subscribeURL() {
      return this.storekit.deeplinkURL({ p: 'subscribe' })
    }
    get subscribeFamilyURL() {
      return this.storekit.deeplinkURL({ p: 'subscribe-family' })
    }
    get subscribeIndividualURL() {
      return this.storekit.deeplinkURL({ p: 'subscribe-individual' })
    }
    get subscribeStudentURL() {
      return this.storekit.deeplinkURL({ p: 'subscribe-student' })
    }
    get userToken() {
      return this.musicUserToken
    }
    authorize() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this.storekit.userTokenIsValid) return this.storekit.userToken
        let e
        try {
          e = yield this.storekit.requestUserToken()
        } catch (B) {
          try {
            yield this.unauthorize()
          } catch (_t) {}
          throw new MKError(MKError.AUTHORIZATION_ERROR, 'Unauthorized')
        }
        return (
          this._providedRequestUserToken && (this.storekit.userToken = e),
          this.storekit.userTokenIsValid
            ? (yield this.storekit.requestStorefrontCountryCode().catch((e) =>
                __awaiter$4(this, void 0, void 0, function* () {
                  return yield this.unauthorize(), Promise.reject(e)
                })
              ),
              e)
            : void 0
        )
      })
    }
    unauthorize() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this.storekit.revokeUserToken()
      })
    }
  }
  const an =
    /\/([a-z]{2})\/(album|artist|episode|movie|music-video|playlist|podcast|post|show|song|station)\/(?:[^\/]*\/)?(?:id)?(\d+|[a-z]{2}\.[a-z0-9\-]+|umc.cmc.[a-zA-Z0-9]+)(?:.*(?:[\?|\&]i=(\d+)).*)?.*$/i
  function formattedMediaURL(e) {
    if (!an.test(e)) throw new TypeError('Invalid Media URL: ' + e)
    let [, s, n, d, h] = e.match(an)
    return (
      'music-video' === n && (n = 'musicVideo'),
      -1 !== ['album', 'playlist'].indexOf(n) && h
        ? ((n = 'song'), (d = h))
        : 'podcast' === n && h && ((n = 'episode'), (d = h)),
      { storefrontId: s, kind: n, contentId: d, isUTS: !!d && d.startsWith('umc.') }
    )
  }
  function hasAuthorization(e) {
    return void 0 === e && (e = nn && nn.storekit), void 0 !== e && e.hasAuthorized && e.userTokenIsValid
  }
  function hasMusicSubscription(e) {
    return __awaiter$4(this, void 0, void 0, function* () {
      return void 0 === e && (e = nn && nn.storekit), e.hasMusicSubscription()
    })
  }
  class MediaSessionManager {
    constructor(e, s) {
      ;(this.capabilities = e),
        (this.dispatcher = s),
        (this.session = navigator.mediaSession),
        this.session &&
          (this.dispatcher.subscribe(or.nowPlayingItemDidChange, this.onNowPlayingItemDidChange),
          this.dispatcher.subscribe(or.capabilitiesChanged, this.onCapabilitiesChanged),
          this._setMediaSessionHandlers())
    }
    onCapabilitiesChanged() {
      this._resetHandlers(), this._setMediaSessionHandlers()
    }
    onNowPlayingItemDidChange(e, { item: s }) {
      this._setMediaSessionMetadata(s)
    }
    _setMediaSessionMetadata(e) {
      var s, n
      this.session &&
        'MediaMetadata' in window &&
        e &&
        (this.session.metadata = new window.MediaMetadata({
          title: e.title,
          artist:
            null !== (s = e.artistName) && void 0 !== s
              ? s
              : null === (n = e.attributes) || void 0 === n
              ? void 0
              : n.showTitle,
          album: e.albumName,
          artwork: e.artwork
            ? [96, 128, 192, 256, 384, 512].map((s) => ({
                src: formatArtworkURL(e.artwork, s, s),
                sizes: `${s}x${s}`,
                type: 'image/jpeg',
              }))
            : [],
        }))
    }
    _setMediaSessionHandlers() {
      this.session &&
        (this._resetHandlers(),
        this.session.setActionHandler('play', () => {
          var e
          return null === (e = this.controller) || void 0 === e ? void 0 : e.play()
        }),
        this.capabilities.canPause
          ? this.session.setActionHandler('pause', () => {
              var e
              return null === (e = this.controller) || void 0 === e ? void 0 : e.pause()
            })
          : this.session.setActionHandler('pause', () => {
              var e
              return null === (e = this.controller) || void 0 === e ? void 0 : e.stop()
            }),
        this.capabilities.canSeek &&
          (this.session.setActionHandler('seekforward', () => {
            var e
            return null === (e = this.controller) || void 0 === e ? void 0 : e.seekForward()
          }),
          this.session.setActionHandler('seekbackward', () => {
            var e
            return null === (e = this.controller) || void 0 === e ? void 0 : e.seekBackward()
          })),
        this.capabilities.canSkipToNextItem &&
          this.session.setActionHandler('nexttrack', () => {
            var e
            return null === (e = this.controller) || void 0 === e ? void 0 : e.skipToNextItem()
          }),
        this.capabilities.canSkipToPreviousItem &&
          this.session.setActionHandler('previoustrack', () => {
            var e
            return null === (e = this.controller) || void 0 === e ? void 0 : e.skipToPreviousItem()
          }))
    }
    _resetHandlers() {
      this.session &&
        (this.session.setActionHandler('play', void 0),
        this.session.setActionHandler('pause', void 0),
        this.session.setActionHandler('seekforward', void 0),
        this.session.setActionHandler('seekbackward', void 0),
        this.session.setActionHandler('nexttrack', void 0),
        this.session.setActionHandler('previoustrack', void 0))
    }
  }
  var on
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', []),
      __metadata$2('design:returntype', void 0),
    ],
    MediaSessionManager.prototype,
    'onCapabilitiesChanged',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', void 0),
      ],
      MediaSessionManager.prototype,
      'onNowPlayingItemDidChange',
      null
    ),
    (function (e) {
      ;(e[(e.PAUSE = 0)] = 'PAUSE'),
        (e[(e.EDIT_QUEUE = 1)] = 'EDIT_QUEUE'),
        (e[(e.SEEK = 2)] = 'SEEK'),
        (e[(e.REPEAT = 3)] = 'REPEAT'),
        (e[(e.SHUFFLE = 4)] = 'SHUFFLE'),
        (e[(e.SKIP_NEXT = 5)] = 'SKIP_NEXT'),
        (e[(e.SKIP_PREVIOUS = 6)] = 'SKIP_PREVIOUS'),
        (e[(e.SKIP_TO_ITEM = 7)] = 'SKIP_TO_ITEM')
    })(on || (on = {}))
  class Capabilities {
    constructor(e) {
      ;(this._dispatcher = e),
        (this._checkCapability = (e) => !1),
        (this._mediaSession = new MediaSessionManager(this, e))
    }
    set controller(e) {
      this._mediaSession.controller = e
    }
    updateChecker(e) {
      this._checkCapability !== e && ((this._checkCapability = e), this._dispatcher.publish(or.capabilitiesChanged))
    }
    get canEditPlaybackQueue() {
      return this._checkCapability(on.EDIT_QUEUE)
    }
    get canPause() {
      return this._checkCapability(on.PAUSE)
    }
    get canSeek() {
      return this._checkCapability(on.SEEK)
    }
    get canSetRepeatMode() {
      return this._checkCapability(on.REPEAT)
    }
    get canSetShuffleMode() {
      return this._checkCapability(on.SHUFFLE)
    }
    get canSkipToNextItem() {
      return this._checkCapability(on.SKIP_NEXT)
    }
    get canSkipToMediaItem() {
      return this._checkCapability(on.SKIP_TO_ITEM)
    }
    get canSkipToPreviousItem() {
      return this._checkCapability(on.SKIP_PREVIOUS)
    }
  }
  const dn = { condition: () => !0, toOptions: (e, s, n) => [Object.assign(Object.assign({}, e), { context: n })] },
    ln = {
      condition: (e) => {
        var s
        return 'stations' === e.type && (null === (s = e.attributes) || void 0 === s ? void 0 : s.isLive)
      },
      toOptions: (e, s, n) => [
        Object.assign(Object.assign({}, e), {
          context: n,
          container: { attributes: e.attributes, id: e.id, type: e.type, name: null == n ? void 0 : n.featureName },
        }),
      ],
    },
    typeIs =
      (...e) =>
      ({ type: s }) =>
        e.includes(s),
    withBagPrefix = (e) => {
      if (void 0 === e || '' === e) return
      const { prefix: s } = Hr
      return s ? `${s}:${e}` : e
    },
    getContainerName$1 = (e, s) => {
      var n, d
      return null !==
        (d = null != s ? s : null === (n = null == e ? void 0 : e.container) || void 0 === n ? void 0 : n.name) &&
        void 0 !== d
        ? d
        : et.SONG
    },
    cn = {
      toOptions: (e, s, n) => {
        const d = Object.assign(Object.assign({ id: e.id }, s), {
          name: withBagPrefix(getContainerName$1(e, null == n ? void 0 : n.featureName)),
        })
        return [
          {
            relationships: e.relationships,
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            container: d,
            context: n,
          },
        ]
      },
      condition: typeIs('songs', 'library-songs', 'music-videos'),
    },
    parseAssets = ({ type: e, attributes: { assetTokens: s } }) =>
      e.includes('udio')
        ? ((e) => {
            if (void 0 === e) return
            const [s] = Object.keys(e)
            return e[s]
          })(s)
        : ((e) => {
            if (void 0 === e) return
            const s = Object.keys(e)
            return e[s[s.length - 1]]
          })(s),
    un = {
      condition: typeIs('uploaded-audios', 'uploadedAudio', 'uploaded-videos', 'uploadedVideo'),
      toOptions: (e, s, n) => {
        var d, h
        const p = Object.assign(Object.assign({}, e), {
          context: n,
          attributes: Object.assign(Object.assign({}, e.attributes), {
            assetUrl: parseAssets(e),
            playParams:
              null !== (h = null === (d = null == e ? void 0 : e.attributes) || void 0 === d ? void 0 : d.playParams) &&
              void 0 !== h
                ? h
                : { id: e.id, kind: e.type },
          }),
        })
        return (
          void 0 !== s && (p.container = s),
          void 0 !== (null == n ? void 0 : n.featureName) &&
            (p.container = Object.assign(Object.assign({}, p.container), { name: null == n ? void 0 : n.featureName })),
          [p]
        )
      },
    }
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
  function __awaiter(e, s, n, d) {
    return new (n || (n = Promise))(function (h, p) {
      function fulfilled(e) {
        try {
          step(d.next(e))
        } catch (_t) {
          p(_t)
        }
      }
      function rejected(e) {
        try {
          step(d.throw(e))
        } catch (_t) {
          p(_t)
        }
      }
      function step(e) {
        e.done
          ? h(e.value)
          : new n(function (s) {
              s(e.value)
            }).then(fulfilled, rejected)
      }
      step((d = d.apply(e, s || [])).next())
    })
  }
  const getFeatureName = (e, s) => {
    if (s) return s
    const n = (function (e = []) {
      return (
        0 !== e.length &&
        e.filter(({ attributes: e }) => !!e && (e.workName || e.movementName || e.movementCount || e.movementNumber))
          .length > 0
      )
    })(e.relationships.tracks.data)
    return 'albums' === e.type || 'library-albums' === e.type
      ? n
        ? et.ALBUM_CLASSICAL
        : et.ALBUM
      : 'playlists' === e.type || 'library-playlists' === e.type
      ? n
        ? et.PLAYLIST_CLASSICAL
        : et.PLAYLIST
      : void 0
  }
  var hn
  const pn = [
      {
        toOptions: (e, s, n) => {
          const d = {
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            name: withBagPrefix(getFeatureName(e, null == n ? void 0 : n.featureName)),
          }
          return e.relationships.tracks.data.map((e) => ({
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            container: d,
            context: n,
          }))
        },
        condition:
          ((hn = 'tracks'),
          (e) => {
            var s, n
            return !!(null === (n = null === (s = e.relationships) || void 0 === s ? void 0 : s[hn]) || void 0 === n
              ? void 0
              : n.data)
          }),
        requiredRelationships: ['tracks'],
      },
      cn,
      ln,
      un,
    ],
    yn = pn.reduce((e, s) => {
      const n = s.requiredRelationships
      return n && e.push(...n), e
    }, []),
    mn = new Set(yn),
    isArrayOf = (e, s) => Array.isArray(e) && (0 === e.length || s(e[0])),
    isMediaAPIResource = (e) => e && void 0 !== e.id && void 0 !== e.type,
    isMediaItem = (e) => e && void 0 !== e.id,
    isMPMediaItem = (e) =>
      e &&
      void 0 !== e.contentId &&
      void 0 !== e.metadata &&
      void 0 !== e.metadata.itemId &&
      void 0 !== e.metadata.itemType,
    isQueueItems = (e) => e && e.items && Array.isArray(e.items),
    isQueueLoaded = (e) => e && e.loaded,
    isQueueURLOption = (e) => e && e.url,
    descriptorToMediaItems = (e) => {
      if (!isQueueItems(e) && !isQueueLoaded(e)) return []
      let s
      return (
        (s = isQueueLoaded(e) ? loadedDescriptorToMediaItem(e) : unloadedDescriptorToMediaItem(e)),
        s.forEach((s) => (s.context = Object.assign(Object.assign({}, e.context), s.context))),
        s
      )
    },
    unloadedDescriptorToMediaItem = ({ items: e }) =>
      isArrayOf(e, isMPMediaItem)
        ? e.map(
            (e) =>
              new MediaItem(
                (function (e) {
                  const s = transform$8(
                    {
                      id: 'metadata.itemId',
                      type: 'metadata.itemType',
                      'attributes.contentRating'() {
                        var s
                        if (
                          1 === (null === (s = null == e ? void 0 : e.metadata) || void 0 === s ? void 0 : s.isExplicit)
                        )
                          return 'explicit'
                      },
                      'attributes.playParams'() {
                        var s, n, d
                        return (
                          0 !==
                            (null === (s = null == e ? void 0 : e.metadata) || void 0 === s
                              ? void 0
                              : s.isPlayable) && {
                            id: null === (n = null == e ? void 0 : e.metadata) || void 0 === n ? void 0 : n.itemId,
                            kind: null === (d = null == e ? void 0 : e.metadata) || void 0 === d ? void 0 : d.itemType,
                          }
                        )
                      },
                      'container.id': 'metadata.containerId',
                      'container.name': 'metadata.containerName',
                      'container.type': 'metadata.containerType',
                    },
                    e
                  )
                  return Object.assign({ attributes: {} }, s)
                })(e)
              )
          )
        : isArrayOf(e, isMediaItem)
        ? e.map((e) => new MediaItem(e))
        : [],
    loadedDescriptorToMediaItem = (e) => {
      const s = [],
        { loaded: n, container: d, context: h } = e
      return void 0 === n
        ? []
        : isArrayOf(n, isDataRecord)
        ? (n.forEach((e) => {
            s.push(...dataRecordToMediaItems(e, d, h))
          }),
          s)
        : isArrayOf(n, isMediaAPIResource)
        ? (n.forEach((e) => {
            s.push(...resourceToMediaItem(e, d, h))
          }),
          s)
        : isDataRecord(n)
        ? dataRecordToMediaItems(n, d, h)
        : isMediaAPIResource(n)
        ? resourceToMediaItem(n, d, h)
        : []
    },
    dataRecordToMediaItems = (e, s, n = {}) => {
      const { data: d } = e.serialize(!0, void 0, { includeRelationships: mn })
      return resourceToMediaItem(d, s, n)
    },
    resourceToMediaItem = (e, s, n = {}) => (
      w.debug('_resourceToMediaItem', e),
      ((e, s, n = {}) => {
        var d, h, p, y
        s =
          null !==
            (p =
              null === (h = null === (d = s) || void 0 === d ? void 0 : d.serialize) || void 0 === h
                ? void 0
                : h.call(d).data) && void 0 !== p
            ? p
            : s
        return (null !== (y = pn.find((d) => d.condition(e, s, n))) && void 0 !== y ? y : dn)
          .toOptions(e, s, n)
          .map((e) => new MediaItem(e))
      })(e, s, n)
    )
  class BaseModifiableQueue {
    constructor() {
      this.canModifyQueue = !1
    }
    append(e) {
      en.warn('Append is not supported for this type of playback')
    }
    clear() {
      en.warn('Clear is not supported for this type of playback')
    }
    insertAt(e, s) {
      en.warn('InsertAt is not supported for this type of playback')
    }
    prepend(e, s = !1) {
      en.warn('Prepend is not supported for this type of playback')
    }
  }
  class ModifiableQueue {
    constructor(e, s) {
      ;(this.canModifyQueue = !0), (this.queue = e), (this._mediaItemPlayback = s)
    }
    append(e) {
      const s = descriptorToMediaItems(e)
      this.queue.splice(this.queue.appendTargetIndex, 0, s)
    }
    clear() {
      this.queue.length && (this.queue.splice(0, this.queue.length), this.queue.reset())
    }
    insertAt(e, s) {
      const n = descriptorToMediaItems(s)
      this.queue.splice(e, 0, n)
    }
    prepend(e, s = !1) {
      const n = descriptorToMediaItems(e),
        d = this.prependIndex()
      s && this.queue.splice(d, this.queue.length), this.queue.splice(d, 0, n)
    }
    prependIndex() {
      const { _mediaItemPlayback: e } = this,
        { position: s } = this.queue
      return (void 0 === e.nowPlayingItem && 0 === s) || s < 0 ? 0 : s + 1
    }
  }
  var gn
  ;(e.PlayerRepeatMode = void 0),
    ((gn = e.PlayerRepeatMode || (e.PlayerRepeatMode = {}))[(gn.none = 0)] = 'none'),
    (gn[(gn.one = 1)] = 'one'),
    (gn[(gn.all = 2)] = 'all')
  class BaseRepeatable {
    constructor() {
      this.canSetRepeatMode = !1
    }
    get repeatMode() {
      return e.PlayerRepeatMode.none
    }
    set repeatMode(e) {
      e !== this.repeatMode && en.warn('setting repeatMode is not supported in this playback method')
    }
  }
  class Repeatable {
    constructor(s) {
      ;(this.dispatcher = s), (this.canSetRepeatMode = !0), (this._mode = e.PlayerRepeatMode.none)
    }
    get repeatMode() {
      return this._mode
    }
    set repeatMode(s) {
      s in e.PlayerRepeatMode &&
        s !== this._mode &&
        ((this._mode = s), this.dispatcher.publish(or.repeatModeDidChange, this._mode))
    }
  }
  class QueueItem {
    constructor(e, s) {
      var n
      ;(this.isAutoplay = !1),
        (this.item = e),
        (this.isAutoplay = null !== (n = null == s ? void 0 : s.isAutoplay) && void 0 !== n && n)
    }
    restrict() {
      return this.item.restrict()
    }
  }
  function toQueueItems(e, s) {
    return e.map((e) => new QueueItem(e, s))
  }
  function toMediaItems(e) {
    return e.map((e) => e.item)
  }
  const parseQueueURLOption = (e) => {
      if (!isQueueURLOption(e)) return e
      const { url: s } = e,
        n = (function (e, s) {
          var n = {}
          for (var d in e) Object.prototype.hasOwnProperty.call(e, d) && s.indexOf(d) < 0 && (n[d] = e[d])
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var h = 0
            for (d = Object.getOwnPropertySymbols(e); h < d.length; h++)
              s.indexOf(d[h]) < 0 && Object.prototype.propertyIsEnumerable.call(e, d[h]) && (n[d[h]] = e[d[h]])
          }
          return n
        })(e, ['url']),
        { contentId: d, kind: h, storefrontId: p } = formattedMediaURL(s)
      return (n[h] = d), (nn.storefrontId = p), w.debug('parseQueueURLOption', n), n
    },
    { queueItemsDidChange: fn, queuePositionDidChange: vn } = or
  class Queue {
    constructor(e) {
      ;(this._itemIDs = []),
        (this._queueItems = []),
        (this._isRestricted = !1),
        (this._nextPlayableItemIndex = -1),
        (this._position = -1),
        (this._dispatcher = e.services.dispatcher),
        e.descriptor &&
          ((this._queueItems = toQueueItems(descriptorToMediaItems(e.descriptor))),
          this._reindex(),
          (this.position = this._getStartItemPosition(e.descriptor.startWith)))
    }
    get isEmpty() {
      return 0 === this.length
    }
    set isRestricted(e) {
      ;(this._isRestricted = e),
        this._isRestricted &&
          this._queueItems &&
          this._queueItems.forEach((e) => {
            e.restrict()
          })
    }
    get isRestricted() {
      return this._isRestricted
    }
    get appendTargetIndex() {
      let e = this.length
      const s = this._queueItems.findIndex((e) => e.isAutoplay)
      return -1 !== s && this.position < s && (e = s), e
    }
    get items() {
      return toMediaItems(this._queueItems)
    }
    get autoplayItems() {
      return toMediaItems(this._queueItems.filter((e) => e.isAutoplay))
    }
    get unplayedAutoplayItems() {
      return toMediaItems(this._unplayedQueueItems.filter((e) => e.isAutoplay))
    }
    get userAddedItems() {
      return toMediaItems(this._queueItems.filter((e) => !e.isAutoplay))
    }
    get unplayedUserItems() {
      return toMediaItems(this._unplayedQueueItems.filter((e) => !e.isAutoplay))
    }
    get length() {
      return this._queueItems.length
    }
    get nextPlayableItem() {
      if (-1 !== this.nextPlayableItemIndex) return this.item(this.nextPlayableItemIndex)
    }
    get nextPlayableItemIndex() {
      return (this._nextPlayableItemIndex = this._getNextPlayableItemIndex()), this._nextPlayableItemIndex
    }
    get position() {
      return this._position
    }
    set position(e) {
      this._updatePosition(e)
    }
    get previousPlayableItem() {
      if (void 0 !== this.previousPlayableItemIndex) return this.item(this.previousPlayableItemIndex)
    }
    get previousPlayableItemIndex() {
      if (void 0 === this._previousPlayableItemIndex) {
        let e = this.position - 1
        for (; e > -1; ) {
          const s = this.item(e)
          if (this._isItemPlayable(s)) {
            this._previousPlayableItemIndex = e
            break
          }
          e--
        }
      }
      return this._previousPlayableItemIndex
    }
    removeQueueItems(e) {
      for (let s = this.length - 1; s >= 0; s--) e(this.queueItem(s), s) && this.spliceQueueItems(s, 1)
    }
    indexForItem(e) {
      return ('string' == typeof e ? this._itemIDs : this.items).indexOf(e)
    }
    item(e) {
      var s
      return null === (s = this.queueItem(e)) || void 0 === s ? void 0 : s.item
    }
    queueItem(e) {
      var s
      return null === (s = this._queueItems) || void 0 === s ? void 0 : s[e]
    }
    remove(e) {
      if ((logDeprecation('remove', { message: 'The queue remove function has been deprecated' }), e === this.position))
        throw new MKError(MKError.INVALID_ARGUMENTS)
      this.splice(e, 1)
    }
    append(e = []) {
      return this.appendQueueItems(toQueueItems(e))
    }
    appendQueueItems(e = []) {
      return this.spliceQueueItems(this.appendTargetIndex, 0, e)
    }
    splice(e, s, n = []) {
      return toMediaItems(this.spliceQueueItems(e, s, toQueueItems(n)))
    }
    spliceQueueItems(e, s, n = []) {
      const d = this._queueItems.splice(e, s, ...n)
      return (
        this._itemIDs.splice(e, s, ...n.map((e) => e.item.id)),
        this._dispatcher.publish(Ze.queueModified, { start: e, added: toMediaItems(n), removed: toMediaItems(d) }),
        this._dispatcher.publish(fn, this.items),
        d
      )
    }
    replaceQueueItems(e, s = !0) {
      this._isSameItems(e)
        ? ((this._queueItems = toQueueItems(e)), this._reindex(), s && this._dispatcher.publish(fn, e))
        : w.warn('Cannot use replaceQueueItems with different items.')
    }
    reset() {
      const e = this.position
      ;(this._position = -1), this._dispatcher.publish(vn, { oldPosition: e, position: this.position })
    }
    _isSameItems(e) {
      if (e.length !== this.length) return !1
      const s = e.map((e) => e.id).sort(),
        n = [...this._itemIDs].sort()
      let d, h
      try {
        ;(d = JSON.stringify(s)), (h = JSON.stringify(n))
      } catch (_t) {
        return !1
      }
      return d === h
    }
    _reindex() {
      this._queueItems && (this._itemIDs = this._queueItems.map((e) => e.item.id))
    }
    _updatePosition(e) {
      if (e === this._position) return
      const s = this._position
      ;(this._position = this._getNextPlayableItemIndex(e)),
        (this._previousPlayableItemIndex = void 0),
        this._dispatcher.publish(vn, { oldPosition: s, position: this._position })
    }
    _getNextPlayableItemIndex(s = this.position + 1) {
      var n
      let d = s
      for (; d < this.length; ) {
        const e = this.item(d)
        if (this._isItemPlayable(e)) return d
        d++
      }
      if ((null === (n = this.repeatable) || void 0 === n ? void 0 : n.repeatMode) === e.PlayerRepeatMode.all)
        for (d = 0; d <= s; ) {
          const e = this.item(d)
          if (this._isItemPlayable(e)) return d
          d++
        }
      return -1
    }
    get _unplayedQueueItems() {
      const e = this.position < 0 ? 0 : this.position
      return this._queueItems.slice(e)
    }
    _getStartItemPosition(e) {
      if (void 0 === e) return -1
      if (('object' == typeof e && 'id' in e && (e = e.id), 'string' == typeof e)) return this.indexForItem(e)
      const s = parseInt('' + e, 10)
      return s >= 0 && s < this.length ? s : -1
    }
    _isItemPlayable(e) {
      return (null == e ? void 0 : e.isPlayable) || (null == e ? void 0 : e.previewURL)
    }
  }
  const _n = ['library-songs', 'songs'],
    isAutoplaySupportedForType = (e) => _n.includes(e),
    normalizeTypeForAutoplay = (e, s) =>
      (v(e) && !(null != s ? s : '').startsWith('library-') ? 'library-' : '') + normalizeContentType(s)
  class AutoplayTrackLoader {
    constructor(e, s, { dispatcher: n, logger: d, apiManager: h }, p = {}) {
      ;(this.queue = e),
        (this.repeatable = s),
        (this.context = p),
        (this.isActive = !1),
        (this.errorIds = new Set()),
        (this.dispatcher = n),
        (this.logger = d),
        (this.apiManager = h)
    }
    activate() {
      this.isActive ||
        (this.dispatcher.unsubscribe(or.queuePositionDidChange, this.onQueueChanged),
        this.dispatcher.subscribe(or.queuePositionDidChange, this.onQueueChanged),
        this.dispatcher.unsubscribe(or.repeatModeDidChange, this.onRepeatableChanged),
        this.dispatcher.subscribe(or.repeatModeDidChange, this.onRepeatableChanged),
        (this.isActive = !0))
    }
    deactivate() {
      this.isActive &&
        (this.dispatcher.unsubscribe(or.queuePositionDidChange, this.onQueueChanged),
        this.dispatcher.unsubscribe(or.repeatModeDidChange, this.onRepeatableChanged),
        (this.isActive = !1),
        (this.station = void 0))
    }
    start() {
      if (!this.isActive) return this.activate(), this.loadNextTracks()
    }
    stop() {
      this.isActive && (this.deactivate(), this.cleanupQueue())
    }
    onRepeatableChanged() {
      this.repeatable.repeatMode === e.PlayerRepeatMode.none ? this.checkLoadMore() : this.cleanupQueue()
    }
    onQueueChanged() {
      if (!(this.queue.nextPlayableItemIndex >= 0)) return this.checkLoadMore()
    }
    checkLoadMore() {
      var e
      const s = null !== (e = this.queue.unplayedAutoplayItems.length) && void 0 !== e ? e : 0,
        n = sn.autoplay.maxUpcomingTracksToMaintain
      if (!(this.queue.isEmpty || this.queue.unplayedUserItems.length > sn.autoplay.maxQueueSizeForAutoplay))
        return s < n ? this.loadNextTracks(n - s) : this.loadNextTracks()
    }
    cleanupQueue() {
      this.queue.removeQueueItems((e, s) => !(s <= this.queue.position) && !!e.isAutoplay)
    }
    loadNextTracks(s = sn.autoplay.maxUpcomingTracksToMaintain) {
      var n, d
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this.repeatable.repeatMode !== e.PlayerRepeatMode.none) return
        let h,
          { station: p } = this
        if (this.station) {
          try {
            h = yield null === (n = this.apiManager.mediaAPI) || void 0 === n
              ? void 0
              : n.nextStationTracks(this.station.id, { limit: s })
          } catch (_t) {
            return
          }
          if (!this.isActive) return
        } else {
          const e = yield this.startStation(s)
          if (!e || !this.isActive) return
          ;(p = this.station = e.station),
            (h = e.tracks),
            (null === (d = null == e ? void 0 : e.tracks) || void 0 === d ? void 0 : d.length) ||
              this.logger.warn('No track data is available for the current station', {
                stationId: null == p ? void 0 : p.id,
              })
        }
        const y = descriptorToMediaItems({
          context: Object.assign(Object.assign({}, this.context), { featureName: 'now_playing' }),
          loaded: h,
          container: p,
        })
        this.queue.appendQueueItems(toQueueItems(y, { isAutoplay: !0 }))
      })
    }
    startStation(e) {
      var s, n
      return __awaiter$4(this, void 0, void 0, function* () {
        const { userAddedItems: d } = this.queue,
          h = null !== (s = d[d.length - 2]) && void 0 !== s ? s : d[d.length - 1],
          p = null == h ? void 0 : h.container,
          y = p ? { container: { id: p.id, type: p.type } } : void 0,
          m = this.queue.items.slice(-1 * sn.autoplay.maxQueueSizeInRequest).reduce((e, { id: s, type: n }) => {
            const d = normalizeTypeForAutoplay(s, n)
            return isAutoplaySupportedForType(d) && !this.errorIds.has(s) && e.push({ id: s, type: d, meta: y }), e
          }, [])
        if (0 === m.length) return
        const g = { data: m }
        let v
        try {
          v = yield null === (n = this.apiManager.mediaAPI) || void 0 === n
            ? void 0
            : n.continuousStation(g, { 'limit[results:tracks]': e, with: ['tracks'] })
        } catch (_t) {
          m.forEach((e) => this.errorIds.add(e.id))
        }
        return v
      })
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', []),
      __metadata$2('design:returntype', void 0),
    ],
    AutoplayTrackLoader.prototype,
    'onRepeatableChanged',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', void 0),
      ],
      AutoplayTrackLoader.prototype,
      'onQueueChanged',
      null
    ),
    __decorate$2(
      [
        (e, s, n) => {
          const d = n.value,
            h = '_singlePromise_' + s,
            p = 'undefined' != typeof Symbol ? Symbol(h) : h
          return (
            (n.value = function (...e) {
              if (this[p]) return this[p]
              const s = (this[p] = d.apply(this, e)),
                reset = () => {
                  this[p] = void 0
                }
              return s.then(reset, reset), s
            }),
            n
          )
        },
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Number]),
        __metadata$2('design:returntype', Promise),
      ],
      AutoplayTrackLoader.prototype,
      'loadNextTracks',
      null
    )
  const shuffleCollection = (e) => {
    const s = [...e],
      { length: n } = s
    for (let d = 0; d < n; ++d) {
      const e = d + Math.floor(Math.random() * (n - d)),
        h = s[e]
      ;(s[e] = s[d]), (s[d] = h)
    }
    return s
  }
  var bn
  !(function (e) {
    ;(e[(e.off = 0)] = 'off'), (e[(e.songs = 1)] = 'songs')
  })(bn || (bn = {}))
  const Tn = 'Shuffling is not supported in this playback method.'
  class BaseShuffler {
    constructor() {
      this.canSetShuffleMode = !1
    }
    set shuffle(e) {
      en.warn(Tn)
    }
    get shuffleMode() {
      return bn.off
    }
    set shuffleMode(e) {
      en.warn(Tn)
    }
    checkAndReshuffle(e) {
      en.warn(Tn)
    }
  }
  class Shuffler {
    constructor(e, { dispatcher: s }) {
      ;(this.controller = e),
        (this.canSetShuffleMode = !0),
        (this.mode = bn.off),
        (this._unshuffledIDs = []),
        (this.dispatcher = s),
        this.dispatcher.subscribe(Ze.queueModified, this.queueModifiedHandler),
        (this._queue = e.queue)
    }
    get queue() {
      return this._queue
    }
    set queue(e) {
      ;(this._queue = e), (this._unshuffledIDs = e.items.map((e) => e.id)), this.checkAndReshuffle(!1)
    }
    queueModifiedHandler(e, s) {
      const { start: n, added: d, removed: h } = s
      if (h.length > 0) {
        const e = h.map((e) => e.id)
        this._unshuffledIDs = this._unshuffledIDs.filter((s) => !e.includes(s))
      }
      d.length > 0 && this._unshuffledIDs.splice(n, 0, ...d.map((e) => e.id))
    }
    set shuffle(e) {
      this.shuffleMode = e ? bn.songs : bn.off
    }
    get shuffleMode() {
      return this.mode
    }
    set shuffleMode(e) {
      e !== this.shuffleMode &&
        e in bn &&
        (en.debug(`mk: set shuffleMode from ${this.shuffleMode} to ${e}`),
        (this.mode = e),
        this.mode === bn.songs ? this.shuffleQueue() : this.unshuffleQueue(),
        this.controller.nowPlayingItem &&
          (this._queue.position = this._queue.indexForItem(this.controller.nowPlayingItem.id)),
        this.dispatcher.publish(or.shuffleModeDidChange, this.shuffleMode))
    }
    checkAndReshuffle(e = !1) {
      this.shuffleMode === bn.songs && this.shuffleQueue(e)
    }
    shuffleQueue(e = !0) {
      const { items: s } = this._queue
      if (s.length <= 1) return s
      const n = s.slice(0),
        d = this._queue.position > -1 ? n.splice(this._queue.position, 1) : []
      let h = []
      do {
        h = shuffleCollection(n)
      } while (arrayEquals(h, n))
      const p = [...d, ...h]
      this._queue.replaceQueueItems(p, e)
    }
    unshuffleQueue(e = !0) {
      let s = []
      const n = this._unshuffledIDs.reduce((e, s, n) => ((e[s] = n), e), {}),
        d = []
      this._queue.items.forEach((e) => {
        const h = n[e.id]
        void 0 === h && d.push(e), (s[h] = e)
      }),
        (s = s.filter(Boolean)),
        this._queue.replaceQueueItems(s.concat(d), e)
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [String, Object]),
      __metadata$2('design:returntype', void 0),
    ],
    Shuffler.prototype,
    'queueModifiedHandler',
    null
  )
  const typeRequiresItem = (e) => [Ze.playbackPlay, Ze.playbackSkip].includes(e),
    itemIsRequired = (e, s) => void 0 !== s && typeRequiresItem(e),
    cleanContainer = (e) => {
      const s = Object.assign({}, e)
      return delete s.attributes, s
    },
    computeContainer = (e, s) => {
      var n, d
      const h = ((e, s) => {
          var n
          return (
            (itemIsRequired(e, s) &&
              (null === (n = null == s ? void 0 : s.container) || void 0 === n ? void 0 : n.name)) ||
            null
          )
        })(e, s),
        p = itemIsRequired(e, s)
          ? Object.assign(
              Object.assign({}, null == s ? void 0 : s.container),
              null === (d = null === (n = null == s ? void 0 : s.container) || void 0 === n ? void 0 : n.attributes) ||
                void 0 === d
                ? void 0
                : d.playParams
            )
          : null
      if (null !== h || null !== p)
        return { container: cleanContainer(Object.assign(Object.assign({}, p), null !== h ? { name: h } : {})) }
    },
    En = {
      [e.PlayerRepeatMode.all]: dt.REPEAT_ALL,
      [e.PlayerRepeatMode.none]: dt.REPEAT_OFF,
      [e.PlayerRepeatMode.one]: dt.REPEAT_ONE,
    },
    Sn = { [bn.off]: lt.SHUFFLE_OFF, [bn.songs]: lt.SHUFFLE_ON },
    descriptorFromInstance = (e) =>
      e && e.playbackActions
        ? {
            playMode() {
              let s = dt.REPEAT_UNKNOWN,
                n = lt.SHUFFLE_UNKNOWN,
                d = ct.AUTO_UNKNOWN
              const { playbackActions: h } = e
              return (
                h &&
                  (h.includes('REPEAT') && (s = En[e.repeatMode]),
                  h.includes('SHUFFLE') && (n = Sn[e.shuffleMode]),
                  h.includes('AUTOPLAY') &&
                    (d = e.autoplayEnabled
                      ? ((e) => {
                          var s
                          return (
                            (null === (s = e.autoplayItems) || void 0 === s ? void 0 : s.length) > 0 &&
                            e.items.some((e) => {
                              const { id: s, type: n, container: d } = e
                              if (d && 'stations' === d.type && d.name === et.RADIO) return !1
                              const h = normalizeTypeForAutoplay(s, n)
                              return isAutoplaySupportedForType(h)
                            })
                          )
                        })(e.queue)
                        ? ct.AUTO_ON
                        : ct.AUTO_ON_CONTENT_UNSUPPORTED
                      : ct.AUTO_OFF)),
                { repeatPlayMode: s, shufflePlayMode: n, autoplayMode: d }
              )
            },
          }
        : {},
    generateItemDescriptorForPAF = (e, s, n) => {
      const d = Object.assign(
        Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(
                Object.assign({}, descriptorFromInstance(s)),
                ((e, s) => {
                  var n
                  if (!typeRequiresItem(e)) return {}
                  if (void 0 === s) return {}
                  const d = null === (n = s.attributes) || void 0 === n ? void 0 : n.mediaKind
                  return Object.assign(Object.assign({}, void 0 !== d ? { mediaType: d } : {}), s.playParams)
                })(e, n)
              ),
              ((e, s) => {
                if (!typeRequiresItem(e) || void 0 === s) return {}
                const { context: n = {} } = s
                return { recoData: n.reco_id }
              })(e, n)
            ),
            ((e, s) => {
              if (!typeRequiresItem(e) || void 0 === s) return {}
              const n = s.playbackDuration
              return n ? { duration: n / 1e3 } : {}
            })(e, n)
          ),
          computeContainer(e, n)
        ),
        { trackInfo: null == n ? void 0 : n.trackInfo }
      )
      return en.trace('PAF descriptor', d), d
    },
    asCode = (s) => {
      switch (typeof s) {
        case 'string':
          return s
        case 'undefined':
          return 'undefined'
        default:
          return 'PlayActivityEndReasonType.' + e.PlayActivityEndReasonType[s]
      }
    }
  class PAFTrackerAPI {
    get apiService() {
      if (void 0 === this.service)
        throw new MKError(MKError.CONFIGURATION_ERROR, 'Play Activity service was called before configuration.')
      return this.service
    }
    configure(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return (
          (this.instance = e),
          (this.service = new PlayActivity$1(e.developerToken, e.musicUserToken, e.storefrontCountryCode, {
            app: { build: sn.app.build, name: sn.app.name, version: sn.app.version },
            fetch: !Fe && fetch.bind(window),
            logInfo: en.enabled,
            sourceType: e.sourceType,
            services: s.services,
            userIsSubscribed: () => e.isAuthorized && nn.storekit._getIsActiveSubscription.getCachedValue(),
          })),
          this
        )
      })
    }
    cleanup() {}
    shouldConfigure(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return void 0 !== e.musicUserToken
      })
    }
    activate(e = {}) {
      return this.apiService.activate(e.flush)
    }
    exit(e = {}) {
      return en.debug('PAF debug', `client.exit(${e.position})`), this.apiService.exit(e.position)
    }
    pause(e, s = {}) {
      return 'number' == typeof s.endReasonType
        ? (en.debug('PAF debug', `client.stop(${s.position}, ${s.endReasonType})`),
          this.apiService.stop(s.position, s.endReasonType))
        : (en.debug('PAF debug', `client.pause(${s.position})`), this.apiService.pause(s.position))
    }
    play(e, s = {}) {
      const n = generateItemDescriptorForPAF(Ze.playbackPlay, this.instance, e)
      return (
        en.debug('PAF debug', `client.play(${JSON.stringify(n)}, ${s.position})`), this.apiService.play(n, s.position)
      )
    }
    scrub(e, s = {}) {
      return (
        en.debug('PAF debug', `client.scrub(${s.position}, ${asCode(s.endReasonType)})`),
        this.apiService.scrub(s.position, s.endReasonType)
      )
    }
    seek(s, n = {}) {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this.scrub(s, { position: n.startPosition, endReasonType: e.PlayActivityEndReasonType.SCRUB_BEGIN }),
          yield this.scrub(s, { position: n.position, endReasonType: e.PlayActivityEndReasonType.SCRUB_END })
      })
    }
    skip(e, s = {}) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = generateItemDescriptorForPAF(Ze.playbackSkip, this.instance, e)
        en.debug('PAF debug', `client.skip(${JSON.stringify(n)}, ${asCode(s.direction)}, ${s.position})`)
        try {
          yield this.apiService.skip(n, s.direction, s.position)
        } catch (_t) {
          if ('A play stop() method was called without a previous play() descriptor' !== _t.message)
            return Promise.reject(_t)
          yield this.play(e, s)
        }
      })
    }
    stop(s, n = {}) {
      var d
      return (
        (null == s ? void 0 : s.isLiveRadioStation) && n.position && (n.position = n.position - n.startPosition),
        (null == s ? void 0 : s.isLiveRadioStation) &&
          (n.endReasonType =
            null !== (d = n.endReasonType) && void 0 !== d ? d : e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED),
        en.debug('PAF debug', `client.stop(${n.position}, ${asCode(n.endReasonType)})`),
        this.apiService.stop(n.position, n.endReasonType)
      )
    }
    shouldTrackPlayActivity(s, n) {
      const d = hasAuthorization(),
        h = !n || n.playbackType !== e.PlaybackType.preview,
        p = this.alwaysSendForActivityType(s),
        y = !n || (n && this.mediaRequiresPlayActivity(n))
      return !(!d || !h || (!p && !y))
    }
    alwaysSendForActivityType(e) {
      return e === Ze.playerActivate || e === Ze.playerExit
    }
    mediaRequiresPlayActivity(e) {
      return isAUC$1(e.type) || -1 !== ['musicVideo', 'song', 'radioStation'].indexOf(e.type)
    }
  }
  const kn = [
      Ze.playbackPause,
      Ze.playbackPlay,
      Ze.playbackScrub,
      Ze.playbackSeek,
      Ze.playbackSkip,
      Ze.playbackStop,
      Ze.playerActivate,
      Ze.playerExit,
      or.nowPlayingItemWillChange,
    ],
    Pn = {
      [Ze.playbackPause]: 'pause',
      [Ze.playbackPlay]: 'play',
      [Ze.playbackScrub]: 'scrub',
      [Ze.playbackSeek]: 'seek',
      [Ze.playbackSkip]: 'skip',
      [Ze.playbackStop]: 'stop',
      [Ze.playerActivate]: 'activate',
      [Ze.playerExit]: 'exit',
    }
  class PlayActivityService {
    constructor(e, s) {
      ;(this.isBuffering = !1), (this.apis = Array.isArray(e) ? e : [e]), (this.dispatcher = s)
    }
    cleanup() {
      ;(this.currentItem = void 0), this.teardownWatchers(), this.apis.forEach((e) => e.cleanup())
    }
    configure(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = yield Promise.all(this.apis.map((s) => s.shouldConfigure(e))),
          d = this.apis.filter((e, s) => n[s])
        if (0 === d.length) return
        this.cleanup(), (this.instance = e)
        const h = d.map((n) => n.configure(e, s))
        try {
          yield Promise.all(h)
        } catch (_t) {
          en.error('Error configuring a play activity service', _t)
        } finally {
          this.setupWatchers(), this.clearIntention()
        }
      })
    }
    getTrackerByType(e) {
      return this.apis.find((s) => s instanceof e)
    }
    handleEvent(e, s = {}) {
      const { item: n } = s
      void 0 !== n && (this.currentItem = n), en.debug(e, s)
      const d = Pn[e]
      if (void 0 === d) return
      const h = this.addIntention(e, s)
      switch ((delete h.item, e)) {
        case Ze.playbackPause:
        case Ze.playbackPlay:
        case Ze.playbackScrub:
        case Ze.playbackSeek:
        case Ze.playbackSkip:
        case Ze.playbackStop:
          return this.callApis(e, d, this.currentItem, h)
        case Ze.playerActivate:
          h.flush = 'boolean' == typeof s.isPlaying ? !s.isPlaying : void 0
        case Ze.playerExit:
          return this.callApis(e, d, h)
        case or.nowPlayingItemWillChange:
          this.currentItem = n
      }
    }
    addIntention(e, s) {
      let n = Object.assign({}, s)
      return this.shouldAddIntention(e)
        ? ((n = Object.assign(Object.assign(Object.assign({}, this.lastUserIntent), this.lastApplicationIntent), n)),
          this.clearIntention(),
          n)
        : n
    }
    callApis(e, s, ...n) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const d = this.apis.map((d) => {
          if ('function' == typeof d[s] && d.shouldTrackPlayActivity(e, this.currentItem)) return d[s](...n)
        })
        return Promise.all(d)
      })
    }
    clearIntention() {
      ;(this.lastUserIntent = void 0), (this.lastApplicationIntent = void 0)
    }
    onPlaybackStateChange(s, n) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const { state: s } = n,
          d = { position: this.instance.currentPlaybackTime }
        return s === e.PlaybackStates.waiting
          ? ((this.isBuffering = !0), this.callApis('bufferStart', 'bufferStart', this.currentItem, d))
          : s === e.PlaybackStates.playing && this.isBuffering
          ? ((this.isBuffering = !1), this.callApis('bufferEnd', 'bufferEnd', this.currentItem, d))
          : void 0
      })
    }
    recordApplicationIntent(e, s) {
      this.lastApplicationIntent = s
    }
    recordUserIntent(e, s) {
      this.lastUserIntent = s
    }
    shouldAddIntention(e) {
      return [Ze.playbackPause, Ze.playbackStop].includes(e)
    }
    setupWatchers() {
      kn.forEach((e) => {
        this.dispatcher.subscribe(e, this.handleEvent)
      }),
        this.dispatcher.subscribe(Ze.userActivityIntent, this.recordUserIntent),
        this.dispatcher.subscribe(Ze.applicationActivityIntent, this.recordApplicationIntent),
        this.dispatcher.subscribe(or.playbackStateDidChange, this.onPlaybackStateChange)
    }
    teardownWatchers() {
      kn.forEach((e) => {
        this.dispatcher.unsubscribe(e, this.handleEvent)
      }),
        this.dispatcher.unsubscribe(Ze.userActivityIntent, this.recordUserIntent),
        this.dispatcher.unsubscribe(Ze.applicationActivityIntent, this.recordApplicationIntent),
        this.dispatcher.unsubscribe(or.playbackStateDidChange, this.onPlaybackStateChange)
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [String, Object]),
      __metadata$2('design:returntype', void 0),
    ],
    PlayActivityService.prototype,
    'handleEvent',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', Promise),
      ],
      PlayActivityService.prototype,
      'onPlaybackStateChange',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', void 0),
      ],
      PlayActivityService.prototype,
      'recordApplicationIntent',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', void 0),
      ],
      PlayActivityService.prototype,
      'recordUserIntent',
      null
    )
  var An = { setDelegate: !0 }
  function isDefinedNonNull(e) {
    return (
      (function (e) {
        return void 0 !== e
      })(e) && null !== e
    )
  }
  function isFunction(e) {
    return 'function' == typeof e
  }
  function isNumber(e) {
    return 'number' == typeof e
  }
  function isInteger(e) {
    return isNumber(e) && e % 1 == 0
  }
  function isArray(e) {
    return e && e.constructor === Array
  }
  function extend(e) {
    var s = [!0, !0, !0].concat(Array.prototype.slice.call(arguments))
    return copyKeysAndValues.apply(null, s)
  }
  function copyKeysAndValues(e, s, n, d) {
    for (var h, p = (n && d) || {}, y = 3; y < arguments.length; y++)
      for (var m in (h = arguments[y]))
        if (Object.prototype.hasOwnProperty.call(h, m)) {
          var g = h[m]
          ;(e || null != g) && (s || 'function' != typeof g) && (p[m] = g)
        }
    return p
  }
  function attachDelegate(e, s) {
    var n = !1
    if (e && s && e !== s) {
      var d = {}
      Object.keys(s).forEach(function (s) {
        e[s] || (d[s] = !0)
      }),
        extend(d, An),
        (n = attachMethods(e, s, null, d))
    }
    return n
  }
  function attachMethods(e, s, n, d) {
    var h = !1
    if (e && s) {
      ;(d = d || {}), (n = n || s)
      var captureFunction = function (e, s, n, d) {
        var returnValue = function () {
          return n[d].apply(e, arguments)
        }
        return s && (returnValue.origFunction = s), returnValue
      }
      for (var p in s)
        if (!(p in d) && s[p] && isFunction(s[p])) {
          var y = e[p],
            m = y && isFunction(y) ? y.bind(e) : null
          ;(e[p] = captureFunction(n, m, s, p)), (h = !0)
        }
    }
    return h
  }
  function setDelegates(e, s) {
    var n = {}
    for (var d in e) s[d] && isFunction(e[d].setDelegate) && (n[d] = e[d].setDelegate(s[d]))
    return n
  }
  function exceptionString(e, s) {
    return (
      'The function ' +
      e +
      '.' +
      s +
      "() must be overridden with a platform-specific delegate function.If you have no data for this function, have your delegate return null or undefined (no 'return')"
    )
  }
  var In = {
      flagArguments: {
        INCLUDE_CALL_STACK: new (function () {})(),
        MIRROR_TO_SERVER: new (function () {})(),
        SUPPRESS_CLIENT_OUTPUT: new (function () {})(),
      },
      setDelegate: function (e) {
        return attachDelegate(this, e)
      },
      execute: function (e, s, n) {
        var d = e.levelStringToIntMap[s]
        if (e.level() !== e.NONE && e.level() <= d) {
          var h = Array.prototype.slice.call(n),
            p = In.nonFlagLogArguments(h),
            y = In.logOptions(e, d, h),
            m = y.includeCallStack ? new Error().stack : null,
            g = m ? p.concat('\n' + m) : p
          if (((e[s]._lastLog = g), y.mirrorToServer, y.throwInsteadOfPrint)) throw new Error(p.toString())
          y.suppressClientOutput || (console[s] ? console[s].apply(console, g) : console.log.apply(console, g))
        }
      },
      isFlagObject: function (e) {
        return e && e === In.flagArguments[e.constructor.name]
      },
      nonFlagLogArguments: function (e) {
        return e.filter(function (e) {
          return !In.isFlagObject(e)
        })
      },
      logOptions: function (e, s, n) {
        var d,
          h = {}
        return (
          n.forEach(function (e) {
            In.isFlagObject(e) &&
              ((d = (function (e, s) {
                var n = ''
                if (e)
                  for (var d, h = e.toLowerCase().split('_'), p = 0; p < h.length; p++)
                    (d = h[p][0]), (0 !== p || s) && (d = d.toUpperCase()), (n += d + h[p].slice(1))
                return n
              })(e.constructor.name)),
              (h[d] = !0))
          }),
          isFunction(e.mirrorToServerLevel) &&
            e.mirrorToServerLevel() !== e.NONE &&
            e.mirrorToServerLevel() <= s &&
            (h.mirrorToServer = !0),
          e.throwLevel() !== e.NONE && e.throwLevel() <= s && (h.throwInsteadOfPrint = !0),
          h
        )
      },
      sendToServer: function (e, s, n, d) {},
    },
    wn = {
      MIN_LEVEL: 0,
      NONE: 0,
      DEBUG: 1,
      INFO: 2,
      WARN: 3,
      ERROR: 4,
      MAX_LEVEL: 4,
      levelIntToStringMap: { 0: 'none', 1: 'debug', 2: 'info', 3: 'warn', 4: 'error' },
      levelStringToIntMap: { none: 0, debug: 1, info: 2, warn: 3, error: 4 },
    },
    Rn = { loggerName: 'defaultLogger', level: wn.INFO, throwLevel: wn.NONE },
    On = !1,
    Cn = {}
  function Logger(e) {
    ;(this._loggerName = e),
      this._level,
      this._throwLevel,
      On || ((On = !0), extend(Logger.prototype, wn), extend(Logger.prototype, In.flagArguments))
  }
  function loggerNamed(e) {
    var s = Cn[(e = e || Rn.loggerName)]
    return s || ((s = new Logger(e)), (Cn[e] = s)), s
  }
  ;(Logger.level = function () {
    return Rn.level
  }),
    (Logger.throwLevel = function () {
      return Rn.throwLevel
    }),
    (Logger.prototype.setDelegate = function (e) {
      return attachDelegate(this, e)
    }),
    (Logger.prototype.loggerName = function () {
      return this._loggerName
    }),
    (Logger.prototype.levelParameterAsInt = function (e) {
      var s,
        n,
        d = null
      return (
        'string' == typeof (n = e) || n instanceof String
          ? (s = this.levelStringToIntMap[e.toLowerCase()])
          : isNumber(e) && (s = e),
        s >= this.MIN_LEVEL && s <= this.MAX_LEVEL && (d = s),
        d
      )
    }),
    (Logger.prototype.setLevel = function (e) {
      var s = this.levelParameterAsInt(e)
      null !== s && (this._level = s)
    }),
    (Logger.prototype.setThrowLevel = function (e) {
      var s = this.levelParameterAsInt(e)
      null !== s && (this._throwLevel = s)
    }),
    (Logger.prototype.level = function () {
      var e = this._level
      return isNumber(e) ? e : Logger.level()
    }),
    (Logger.prototype.levelString = function () {
      return this.levelIntToStringMap[this.level()]
    }),
    (Logger.prototype.throwLevel = function () {
      var e = this._throwLevel
      return isNumber(e) ? e : Logger.throwLevel()
    }),
    (Logger.prototype.debug = function () {
      In.execute(this, 'debug', arguments)
    }),
    (Logger.prototype.info = function () {
      In.execute(this, 'info', arguments)
    }),
    (Logger.prototype.warn = function () {
      In.execute(this, 'warn', arguments)
    }),
    (Logger.prototype.error = function () {
      In.execute(this, 'error', arguments)
    }),
    (Logger.prototype.lastLog = function (e) {
      return this[e] ? this[e]._lastLog : null
    })
  var Mn = { LOCAL_STORAGE: 'localStorage', SESSION_STORAGE: 'sessionStorage' },
    _storageObject = function (e) {
      var s = null,
        n = !1
      return function () {
        return (
          e
            ? (s = e)
            : (n ||
                (console.error(
                  'storageObject: storage object not found. Override this function if there is a platform-specific implementation'
                ),
                (n = !0)),
              s ||
                (s = {
                  storage: {},
                  getItem: function (e) {
                    return this.storage[e]
                  },
                  setItem: function (e, s) {
                    this.storage[e] = s
                  },
                  removeItem: function (e) {
                    delete this.storage[e]
                  },
                })),
          s
        )
      }
    }
  function _defaultStorageObject(e) {
    var s = null,
      n = e === Mn.LOCAL_STORAGE
    try {
      s = 'undefined' !== (n ? typeof localStorage : typeof sessionStorage) ? (n ? localStorage : sessionStorage) : null
    } catch (_t) {
      ;(s = null), console.error('_utils.storage._defaultStorageObject: Unable to retrieve storage object: ' + _t)
    }
    return s
  }
  var Nn = _storageObject(_defaultStorageObject(Mn.LOCAL_STORAGE)),
    Dn = _storageObject(_defaultStorageObject(Mn.SESSION_STORAGE))
  function saveObjectToStorage(e, s, n) {
    var d = null
    if (n)
      try {
        e.setItem(s, JSON.stringify(n)), (d = n)
      } catch (_t) {}
    else d = e.removeItem(s)
    return d
  }
  function objectFromStorage(e, s) {
    var n = null,
      d = e.getItem(s)
    if (d)
      try {
        n = JSON.parse(d)
      } catch (_t) {
        n = void 0
      }
    return n
  }
  var Ln = { maxWait: 1500, initialDelay: 100, factor: 2 },
    ExponentialStrategy = function (e, s, n) {
      ;(this.delay = e || Ln.initialDelay),
        (this.maxWait = isNumber(s) ? s : Ln.maxWait),
        (this.factor = n || Ln.factor),
        (this.timeWaited = 0)
    }
  function exponentialBackoff(e, s, n, d, h, p) {
    !(function _backoff(e, s, n, d) {
      s.call(s, n, function () {
        var h = e.nextDelay()
        h ? setTimeout(_backoff.bind(null, e, s, n, d), h) : d.apply(d, arguments)
      })
    })(new ExponentialStrategy(d, h, p), e, s, n)
  }
  function _valueForKeyPath(e, s, n) {
    var d = s
    if (e && s)
      for (var h = e.split('.'), p = 0; d && p < h.length; p++) {
        var y = h[p]
        !(y in d) && n && (d[y] = {}), (d = y in d ? d[y] : null)
      }
    return d
  }
  function valueForKeyPath(e) {
    var s = null
    if (e && arguments.length > 1)
      for (var n = sourcesArray(Array.prototype.slice.call(arguments, 1)), d = n.length - 1; d >= 0; d--) {
        var h = n[d]
        if (isDefinedNonNull((s = _valueForKeyPath(e, h)))) break
      }
    return s
  }
  function sourcesArray(e) {
    var s = [],
      n = []
    ;(n = n.concat(e)), arguments && arguments.length > 1 && (n = n.concat(Array.prototype.slice.call(arguments, 1)))
    for (var d = 0; d < n.length; d++) {
      var h = n[d]
      s = s.concat(h)
    }
    return s
  }
  function makeAjaxRequest(e, s, n, d, h, p) {
    var y = new XMLHttpRequest()
    ;(n = n || void 0),
      (p = p || {}),
      (d = isFunction(d) ? d : function () {}),
      (h = isFunction(h) ? h : function () {})
    var m = !1 !== p.async
    p.timeout && m && (y.timeout = p.timeout),
      (y.onload = function () {
        y.status >= 200 && y.status < 300
          ? d(y.response)
          : h(new Error('XHR error: server responded with status ' + y.status + ' ' + y.statusText), y.status)
      }),
      (y.onerror = function () {
        h(new Error('XHR error'))
      }),
      y.open(s, e, m),
      (y.withCredentials = !0),
      y.setRequestHeader('Content-type', 'application/json'),
      y.send(n)
  }
  ExponentialStrategy.prototype.nextDelay = function () {
    var e = null,
      s = this.maxWait - this.timeWaited
    return (
      s > 0 && ((this.delay = Math.min(this.delay, s)), (this.timeWaited += this.delay)),
      (0 === this.maxWait || s > 0) && ((e = this.delay), (this.delay = this.delay * this.factor)),
      e
    )
  }
  var xn = {
      setDelegate: function (e) {
        return attachDelegate(this, e)
      },
      localStorageObject: Nn,
      sessionStorageObject: Dn,
    },
    Un = {
      setDelegate: function (e) {
        return attachDelegate(this, e)
      },
      makeAjaxRequest: makeAjaxRequest,
    },
    $n = {
      blacklistedFields: [
        'capacitySystem',
        'capacitySystemAvailable',
        'capacityDisk',
        'capacityData',
        'capacityDataAvailable',
      ],
      compoundSeparator: '_',
      configBaseUrl: 'https://xp.apple.com/config/1/report',
      constraints: {
        profiles: {
          AMPWeb: {
            precedenceOrderedRules: [
              {
                filters: 'any',
                fieldConstraints: {
                  clientId: { generateValue: !0, namespace: 'AMPWeb_isSignedOut', expirationPeriod: 864e5 },
                },
              },
              {
                filters: { valueMatches: { isSignedIn: [!0] } },
                fieldConstraints: {
                  clientId: { generateValue: !0, namespace: 'AMPWeb_isSignedIn', expirationPeriod: 15552e6 },
                },
              },
            ],
          },
          strict: {
            precedenceOrderedRules: [
              {
                filters: 'any',
                fieldConstraints: {
                  clientId: {
                    generateValue: !0,
                    scopeFieldName: 'parentPageUrl',
                    scopeStrategy: 'mainDomain',
                    expirationPeriod: 864e5,
                  },
                  consumerId: { blacklisted: !0 },
                  dsId: { blacklisted: !0 },
                  parentPageUrl: { scope: 'hostname' },
                },
              },
              {
                filters: { valueMatches: { eventType: ['click'], actionType: ['signUp'] } },
                fieldConstraints: { parentPageUrl: { scope: 'fullWithoutParams' } },
              },
              {
                filters: { valueMatches: { eventType: ['dialog'], dialogType: ['upsell'], result: ['upsell'] } },
                fieldConstraints: { parentPageUrl: { scope: 'fullWithoutParams' } },
              },
              {
                filters: { valueMatches: { userType: ['signedIn'] } },
                fieldConstraints: { clientId: { scopeStrategy: 'all' } },
              },
              {
                filters: {
                  valueMatches: { userType: ['signedIn'], eventType: ['click', 'dialog', 'media', 'search'] },
                },
                fieldConstraints: {
                  clientId: { blacklisted: !0 },
                  consumerId: { blacklisted: !1 },
                  dsId: { blacklisted: !1 },
                },
              },
              {
                filters: {
                  valueMatches: { userType: ['signedIn'], eventType: ['page', 'impressions'] },
                  nonEmptyFields: ['pageHistory'],
                },
                fieldConstraints: {
                  clientId: { blacklisted: !0 },
                  consumerId: { blacklisted: !1 },
                  dsId: { blacklisted: !1 },
                },
              },
            ],
          },
        },
      },
      fieldsMap: {
        cookies: ['itcCt', 'itscc'],
        custom: {
          impressions: ['id', 'adamId', 'link.type', 'station-hash'],
          location: [
            'id',
            'adamId',
            'dataSetId',
            'name',
            'fcKind',
            'kindIds',
            'type',
            'link.type',
            'station-hash',
            'core-seed-name',
          ],
        },
        single: {
          targetId: [
            'id',
            'adamId',
            'contentId',
            'type',
            'link.type',
            'fcId',
            'userPreference',
            'label',
            'station-hash',
            'linkIdentifier',
          ],
        },
      },
      metricsUrl: 'https://xp.apple.com/report',
      postFrequency: 6e4,
      postFrequencyLowLatency: 5e3,
      tokenSeparator: '|',
    },
    Bn = {},
    _appendSectionAndSubsectionToConfigSources = function (e, s, n) {
      if (n) {
        e.push(n)
        var d = n[s]
        d &&
          (function (e) {
            for (var s in e) if (e.hasOwnProperty(s)) return !0
          })(d) &&
          e.push(d)
      }
    },
    Config = function (e) {
      ;(this._topic = e),
        (this._debugSource = null),
        (this._cachedSource = null),
        (this._serviceSource = null),
        (this._initCalled = !1),
        (this._initialized = !1),
        (this._showedDebugWarning = !1),
        (this._showedNoProvidedSourceWarning = !1),
        (this._keyPathsThatSuppressWarning = { configBaseUrl: !0 }),
        (this.DEBUG_SOURCE_KEY = 'mtClientConfig_debugSource' + $n.compoundSeparator + this._topic),
        (this.CACHED_SOURCE_KEY = 'mtClientConfig_cachedSource' + $n.compoundSeparator + this._topic)
    }
  function disabled(e) {
    return !!this.value('disabled', e)
  }
  function blacklistedEvents(e) {
    return this.value('blacklistedEvents', e) || []
  }
  function blacklistedFields(e) {
    return this.value('blacklistedFields', e) || []
  }
  function removeBlacklistedFields(e, s) {
    if (e)
      for (var n = blacklistedFields.call(this, s), d = 0; d < n.length; d++) {
        var h = n[d]
        h && h in e && delete e[h]
      }
    return e
  }
  function metricsDisabledOrBlacklistedEvent(e, s) {
    return disabled.call(this, s) || (!!e && blacklistedEvents.call(this, s).indexOf(e) > -1)
  }
  ;(Config.createConfig = function (e, s, n, d) {
    var h = Config.getConfig(e)
    return e && 'noTopicConfig' !== e && !h._initCalled && h.init(s, n, d), h
  }),
    (Config.getConfig = function (e) {
      var s = Bn[(e = e || 'noTopicConfig')]
      return s || ((s = new Config(e)), (Bn[e] = s)), s
    }),
    (Config.defaultConfig = function () {
      return Config.getConfig()
    }),
    (Config.value = function (e, s) {
      var n = (s && Bn[s]) || Config.defaultConfig()
      return n.value.call(n, e)
    }),
    (Config.environment = xn),
    (Config.logger = loggerNamed('mt-client-config')),
    (Config.network = Un),
    (Config.prototype._defaults = function () {
      return $n
    }),
    (Config.prototype._setInitialized = function (e) {
      this._initialized = e
    }),
    (Config.prototype._setInitCalled = function (e) {
      this._initCalled = e
    }),
    (Config.prototype._setShowedDebugWarning = function (e) {
      this._showedDebugWarning = e
    }),
    (Config.prototype._setShowedNoProvidedSourceWarning = function (e) {
      this._showedNoProvidedSourceWarning = e
    }),
    (Config.prototype.setDelegate = function (e) {
      return attachDelegate(this, e)
    }),
    (Config.prototype.topic = function () {
      return this._topic
    }),
    (Config.prototype.configHostname = function () {}),
    (Config.prototype.configUrl = function () {
      var e,
        s = this.configHostname()
      return (
        (e = s ? 'https://' + s + '/config/1/report' : this.value('configBaseUrl')),
        'noTopicConfig' !== this._topic
          ? (e += '/' + this.topic())
          : Config.logger.error('config.configUrl(): Topic must be provided'),
        e
      )
    }),
    (Config.prototype.sources = function () {}),
    (Config.prototype.value = function (e) {
      var s,
        n = this.cachedSource(),
        d = this.serviceSource(),
        h = this.sources(),
        p = this.debugSource(),
        y = n || d || h || p
      return (
        h ||
          d ||
          e in this._keyPathsThatSuppressWarning ||
          this._showedNoProvidedSourceWarning ||
          ((this._showedNoProvidedSourceWarning = !0),
          Config.logger.warn(
            'Metrics config: No config provided via delegate or fetched via init(), using default/cached config values.'
          )),
        p &&
          (this._showedDebugWarning ||
            ((this._showedDebugWarning = !0),
            Config.logger.warn(
              '"debugSource" found.\nThis will override any same-named client-supplied configSource fields.\nThis setting "sticks" across session, use "setDebugSource(null)" to clear'
            ))),
        isArray(h) || (h = [h]),
        (s = 0 === e.indexOf('blacklisted') ? (y ? [n, d, h, p] : [$n]) : [$n, n, d, h, p]),
        (s = this.configSourcesWithOverrides(s, this.topic())),
        valueForKeyPath.apply(null, [e].concat(s))
      )
    }),
    (Config.prototype.configSourcesWithOverrides = function (e, s) {
      var n = e
      if (e && e.length && s) {
        n = []
        for (var d = 0; d < e.length; d++) {
          var h = e[d]
          if (h)
            if (isArray(h) && h.length) {
              for (var p = [], y = 0; y < h.length; y++) _appendSectionAndSubsectionToConfigSources(p, s, h[y])
              n.push(p)
            } else _appendSectionAndSubsectionToConfigSources(n, s, h)
        }
      }
      return n
    }),
    (Config.prototype.setDebugSource = function (e) {
      return (
        (this._debugSource = e || null),
        saveObjectToStorage(xn.localStorageObject(), this.DEBUG_SOURCE_KEY, this._debugSource)
      )
    }),
    (Config.prototype.debugSource = function () {
      return (
        this._debugSource || (this._debugSource = objectFromStorage(xn.localStorageObject(), this.DEBUG_SOURCE_KEY)),
        this._debugSource
      )
    }),
    (Config.prototype.setCachedSource = function (e) {
      return (
        (this._cachedSource = e || null),
        saveObjectToStorage(xn.localStorageObject(), this.CACHED_SOURCE_KEY, this._cachedSource)
      )
    }),
    (Config.prototype.cachedSource = function () {
      return (
        this._cachedSource || (this._cachedSource = objectFromStorage(xn.localStorageObject(), this.CACHED_SOURCE_KEY)),
        this._cachedSource
      )
    }),
    (Config.prototype.setServiceSource = function (e) {
      return (this._serviceSource = e), this._serviceSource
    }),
    (Config.prototype.serviceSource = function () {
      return this._serviceSource
    }),
    (Config.prototype.fetchConfig = function (e, s, n) {
      n = n || function () {}
      exponentialBackoff(
        Un.makeAjaxRequest.bind(Un, e, 'GET', null),
        function (e) {
          var d
          try {
            ;(e = JSON.parse(e)), (d = !0)
          } catch (_t) {
            n.call(n, _t)
          }
          d && s && s.call(s, e)
        },
        n
      )
    }),
    (Config.prototype.init = function (e, s, n) {
      if (!this._initCalled) {
        ;(this._initCalled = !0), (s = s || function () {})
        var d = function () {
          ;(this._initialized = !0), s.call(s)
        }.bind(this)
        if (e) this.setDelegate({ sources: e }), d()
        else {
          this.setCachedSource(this.cachedSource())
          var h = this.configUrl(),
            p = function (e) {
              this.setCachedSource(e), this.setServiceSource(e), d()
            }.bind(this)
          this.fetchConfig(h, p, n)
        }
      }
    }),
    (Config.prototype.initialize = function (e, s, n) {
      return this.init.apply(this, Array.prototype.slice.call(arguments))
    }),
    (Config.prototype.initialized = function () {
      return this._initialized
    })
  function recordEvent(e, s, n) {
    var d = null
    return (
      n &&
        !metricsDisabledOrBlacklistedEvent.call(Config, n.eventType, s) &&
        (removeBlacklistedFields.call(Config, n, s), e.apply(null, Array.prototype.slice.call(arguments, 1)), (d = n)),
      d
    )
  }
  var Fn = 1e4,
    jn = 'events',
    Kn = '1.0',
    Vn = 2
  function enrichAndSerializeEvents(e) {
    var s = null
    if (e && e.length) {
      var n = {}
      ;(n.deliveryVersion = Kn), (n.postTime = Date.now()), (n[jn] = e)
      try {
        s = JSON.stringify(n)
      } catch (_t) {
        loggerNamed('mt-event-queue').error('Error stringifying events as JSON: ' + _t)
      }
    }
    return s
  }
  function _immediateRecordEvent(e, s) {
    var n = enrichAndSerializeEvents([s])
    n &&
      makeAjaxRequest(
        (function (e) {
          return Config.value('metricsUrl', e) + '/' + Vn + '/' + e
        })(e),
        'POST',
        n,
        null,
        null,
        {
          timeout: (function (e) {
            var s = Config.value('requestTimeout', e) || Fn
            return (s = Math.min(s, Config.value('postFrequency', e)))
          })(e),
        }
      )
  }
  var Yn,
    Hn,
    Wn,
    Gn = {
      recordEvent: function (e, s) {
        return recordEvent.apply(null, [_immediateRecordEvent].concat(Array.prototype.slice.call(arguments)))
      },
      sendMethod: function () {
        return 'javascript'
      },
    },
    zn = {
      _document: function () {
        if ('undefined' != typeof document) return document
        throw "metricskit-delegates-html.environment HTML delegate 'document' object not found"
      },
      _window: function () {
        if ('undefined' != typeof window) return window
        throw "metricskit-delegates-html.environment HTML delegate 'window' object not found"
      },
      cookie: function () {
        return zn._window().document.cookie
      },
      pageUrl: function () {
        return zn._window().location.href
      },
      parentPageUrl: function () {
        var e,
          s = zn._window(),
          n = s.parent
        if (n !== s)
          try {
            e = n.location.href
          } catch (_t) {
            e = zn._document().referrer
          }
        return e
      },
      pixelRatio: function () {
        return zn._window().devicePixelRatio
      },
      screenHeight: function () {
        return zn._window().screen.height
      },
      screenWidth: function () {
        return zn._window().screen.width
      },
      userAgent: function () {
        return zn._window().navigator.userAgent
      },
      windowInnerHeight: function () {
        return zn._window().innerHeight
      },
      windowInnerWidth: function () {
        return zn._window().innerWidth
      },
      windowOuterHeight: function () {
        return zn._window().outerHeight
      },
      windowOuterWidth: function () {
        return zn._window().outerWidth
      },
      timeOriginOffset: function () {
        var e = null,
          s = zn._window().performance
        return s && s.timing && (e = s.timing.navigationStart), e
      },
      app: function () {},
      appVersion: function () {},
      capacityData: function () {},
      capacityDataAvailable: function () {},
      capacityDisk: function () {},
      capacitySystem: function () {},
      capacitySystemAvailable: function () {},
      connectionType: function () {},
      dsId: function () {},
      hardwareBrand: function () {},
      hardwareFamily: function () {},
      hardwareModel: function () {},
      hostApp: function () {},
      hostAppVersion: function () {},
      os: function () {},
      osBuildNumber: function () {},
      osLanguages: function () {},
      osVersion: function () {},
      resourceRevNum: function () {},
      storeFrontCountryCode: function () {},
      storeFrontHeader: function () {},
      userType: function () {},
    }
  function mergeAndCleanEventFields(e) {
    for (var s = [!1, !1, !1].concat(Array.prototype.slice.call(arguments)), n = [], d = 0; d < s.length; d++) {
      var h = s[d]
      if (h && h.constructor === Array) for (var p = 0; p < h.length; p++) n.push(h[p])
      else n.push(h)
    }
    return copyKeysAndValues.apply(null, n)
  }
  function processMetricsData(e, s, n, d) {
    var h = mergeAndCleanEventFields(d),
      p = h
    if (e && s) {
      var y = {}
      if (
        (n ||
          (s = s.filter(function (e) {
            return e in h
          })),
        s.length)
      )
        for (var m = 0; m < s.length; m++) {
          var g = s[m],
            v = e[g]
          isFunction(v) && (y[g] = v.call(e, h))
        }
      p = mergeAndCleanEventFields(p, y)
    }
    return p
  }
  function applyFieldsMap$1(e, s, n, d) {
    var h, p, y, m
    if (e && s && n) {
      var g, v
      if (((p = {}), (h = valueForKeyPath(s, n, n.custom))))
        if (isArray(h)) for (g = 0; g < h.length; ++g) isDefinedNonNull((v = e[h[g]])) && (p[h[g]] = v)
        else if ((m = h) && m.constructor === Object) {
          for (var _ in h)
            for (g = 0; g < h[_].length; ++g)
              if (isDefinedNonNull((v = valueForKeyPath(h[_][g], e)))) {
                p[_] = v
                break
              }
        } else y = 'metrics: incorrect data type provided to applyFieldsMap (only accepts objects and Arrays)'
      else y = 'metrics: unable to get ' + s + ' section from fieldsMap'
    } else {
      var b = []
      e || b.push('data'),
        s || b.push('sectionName'),
        n || b.push('fieldsMap'),
        (y = 'metrics: missing argument(s): ' + b.join(',') + ' not provided to applyFieldsMap')
    }
    return y && isFunction(d) && d(y), p
  }
  function environmentBaseFieldNames() {
    return (
      Hn ||
        (Hn = [
          'app',
          'appVersion',
          'hardwareFamily',
          'hardwareModel',
          'os',
          'osBuildNumber',
          'osLanguages',
          'osVersion',
          'resourceRevNum',
          'screenHeight',
          'screenWidth',
          'userAgent',
        ].concat(['delegateApp', 'hardwareBrand', 'storeFrontCountryCode', 'storeFrontHeader'])),
      Hn
    )
  }
  function Base$1(e) {
    this.setDelegate({ topic: e }),
      Wn ||
        ((Wn = !0),
        environmentBaseFieldNames().forEach(
          function (e) {
            Base$1.prototype[e] = function (s) {
              return s && s.hasOwnProperty(e) ? s[e] : this.environment()[e]()
            }.bind(this)
          }.bind(this)
        ))
  }
  ;(Base$1._className = 'eventHandlers.base'),
    (Base$1.prototype.setDelegate = function (e) {
      return attachDelegate(this, e)
    }),
    (Base$1.prototype.topic = function () {
      throw exceptionString(Base$1._className, 'topic')
    }),
    (Base$1.prototype.environment = function () {
      throw exceptionString(Base$1._className, 'environment')
    }),
    (Base$1.prototype.eventRecorder = function () {
      throw exceptionString(Base$1._className, 'eventRecorder')
    }),
    (Base$1.prototype.metricsData = function () {
      throw exceptionString(Base$1._className, 'metricsData')
    }),
    (Base$1.prototype.processMetricsData = function () {
      throw exceptionString(Base$1._className, 'processMetricsData')
    }),
    (Base$1.prototype.knownFields = function () {
      return (
        Yn ||
          (Yn = environmentBaseFieldNames().concat([
            'baseVersion',
            'clientEventId',
            'connection',
            'eventTime',
            'eventType',
            'eventVersion',
            'timezoneOffset',
            'xpPostFrequency',
            'xpSendMethod',
          ])),
        Yn
      )
    }),
    (Base$1.prototype.baseVersion = function () {
      return 1
    }),
    (Base$1.prototype.clientEventId = function (e) {
      return (
        (e && e.clientEventId) ||
        (function (e) {
          var n
          if (16777215 == Math.floor(4294967295 / 256)) {
            var d,
              h,
              p,
              y,
              m,
              g = s.crypto || s.msCrypto
            if (g && g.getRandomValues)
              (d = g.getRandomValues(new Uint32Array(16 / Uint32Array.BYTES_PER_ELEMENT))), (m = !0)
            else if (g && g.randomBytes) {
              var v = g.randomBytes(16)
              ;(d = new Uint32Array(v.buffer, v.byteOffset, v.byteLength / Uint32Array.BYTES_PER_ELEMENT)), (m = !0)
            } else
              for (d = new Uint32Array(16 / Uint32Array.BYTES_PER_ELEMENT), h = 0; h < d.length; h++)
                d[h] = Math.floor(Math.random() * Math.floor(4294967295))
            if (d) {
              for (n = '', h = 0; h < d.length; h++)
                for (y = d[h], p = 0; p < 6; p++)
                  (n += '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[y % 62]),
                    (y = Math.floor(y / 62))
              e && (n = '1_' + (m ? '1' : '2') + '_' + n)
            }
          }
          return n
        })(!0)
      )
    }),
    (Base$1.prototype.connection = function (e) {
      return (e && e.connection) || this.environment().connectionType()
    }),
    (Base$1.prototype.dsId = function (e) {
      return (e && e.dsId) || this.environment().dsId()
    }),
    (Base$1.prototype.eventTime = function (e) {
      return (e && e.eventTime) || Date.now()
    }),
    (Base$1.prototype.eventVersion = function (e) {
      return (e && e.eventVersion) || null
    }),
    (Base$1.prototype.timezoneOffset = function (e) {
      return (e && e.timezoneOffset) || new Date().getTimezoneOffset()
    }),
    (Base$1.prototype.xpPostFrequency = function (e) {
      return (e && e.xpPostFrequency) || Config.value('postFrequency', this.topic())
    }),
    (Base$1.prototype.xpSendMethod = function (e) {
      return (e && e.xpSendMethod) || this.eventRecorder().sendMethod()
    })
  var qn = Base$1
  function MetricsData$2() {
    this._eventData = {}
  }
  MetricsData$2.prototype.updateData = function () {
    extend.apply(null, [this._eventData].concat(Array.prototype.slice.call(arguments)))
  }
  var Qn,
    Xn,
    Jn = MetricsData$2
  function Environment() {
    Qn ||
      ((Qn = !0),
      [
        'app',
        'appVersion',
        'hardwareFamily',
        'hardwareModel',
        'os',
        'osBuildNumber',
        'osLanguages',
        'osVersion',
        'resourceRevNum',
        'screenHeight',
        'screenWidth',
        'userAgent',
      ].forEach(function (e) {
        Environment.prototype[e] = function () {
          throw exceptionString(Environment._className, e)
        }
      }),
      ['delegateApp', 'hardwareBrand', 'storeFrontCountryCode', 'storeFrontHeader'].forEach(function (e) {
        Environment.prototype[e] = function () {}
      }))
  }
  function topic() {
    return Xn
  }
  ;(Environment._className = 'system.environment'),
    (Environment.prototype.setDelegate = function (e) {
      return attachDelegate(this, e)
    }),
    (Environment.prototype.connectionType = function () {
      throw exceptionString(Environment._className, 'connectionType')
    }),
    (Environment.prototype.dsId = function () {}),
    (Environment.prototype.localStorageObject = Nn),
    (Environment.prototype.sessionStorageObject = Dn)
  var Zn = 'unknown',
    ea = 'next',
    ta = 'previous',
    ia = 'location',
    ra = 'interval',
    sa = 'playhead',
    na = 'scrub',
    aa = 'transition',
    oa = 'interruption',
    da = 'buffering',
    la = 'play',
    ca = 'seek',
    ua = 'skipIntro',
    ha = 'actionType',
    pa = 'consumerId',
    ya = 'consumerNs',
    ma = 'dsId',
    ga = 'eventType',
    fa = 'eventVersion',
    va = 'isOffline',
    _a = 'videoViewportHeight',
    ba = 'videoViewportWidth',
    Ta = {
      TYPE: { MANUAL: 'manual', AUTOMATIC: 'automatic', UNKNOWN: Zn },
      PLAY_START_REASON: {
        PLAY: la,
        UNPAUSE: 'unpause',
        NEXT: ea,
        PREVIOUS: ta,
        SEEK: ca,
        TRANSITION: aa,
        INTERRUPTION: oa,
        FOREGROUND: 'foreground',
        FOCUS: 'focus',
        BUFFERING: da,
        UNKNOWN: Zn,
      },
      PLAY_START_REASON_TYPE: { SKIP_INTRO: ua },
      PLAY_STOP_REASON: {
        COMPLETE: 'complete',
        TRANSITION: aa,
        PLAY_OTHER: 'playOther',
        PAUSE: 'pause',
        SEEK: ca,
        NEXT: ea,
        INTERRUPTION: oa,
        BACKGROUND: 'background',
        EXIT: 'exit',
        INACTIVITY: 'inactivity',
        BUFFERING: da,
        ERROR: 'error',
        FAILURE: 'failure',
        UNKNOWN: Zn,
        CLOSE_PLAYER: 'closePlayer',
      },
      PLAY_STOP_REASON_TYPE: { SKIP_INTRO: ua },
      SEEK_START_REASON: {
        NEXT: ea,
        PREVIOUS: ta,
        LOCATION: ia,
        INTERVAL: ra,
        PLAYHEAD: sa,
        SCRUB: na,
        UNKNOWN: Zn,
        SKIP_INTRO: ua,
      },
      SEEK_STOP_REASON: {
        NEXT: ea,
        PREVIOUS: ta,
        LOCATION: ia,
        INTERVAL: ra,
        PLAYHEAD: sa,
        SCRUB: na,
        UNKNOWN: Zn,
        SKIP_INTRO: ua,
      },
    },
    Ea = {
      ACTIVITY_TYPE: { PLAY: la, SEEK: ca },
      ACTION_TYPE: { START: 'start', STOP: 'stop' },
      EVENT_TYPE: { PLAY_ACTIVITY: 'playActivity', SEEK_ACTIVITY: 'seekActivity' },
    },
    Sa = { INCLUDES_START_POSITIONS: 'includesStartPositions', INCLUDES_END_POSITIONS: 'includesEndPositions' }
  function VPAFKitEnvironment() {
    Environment.apply(this, arguments)
  }
  ;(VPAFKitEnvironment.prototype = new Environment()),
    (VPAFKitEnvironment.prototype.constructor = VPAFKitEnvironment),
    (VPAFKitEnvironment.prototype.consumerId = function () {}),
    (VPAFKitEnvironment.prototype.consumerNs = function () {}),
    (VPAFKitEnvironment.prototype.isOffline = function () {}),
    (VPAFKitEnvironment.prototype.videoViewportHeight = function () {}),
    (VPAFKitEnvironment.prototype.videoViewportWidth = function () {})
  var ka = {
      setDelegate: function (e) {
        return attachDelegate(this, e)
      },
      recordEvent: function (e, s) {
        throw exceptionString('system.eventRecorder', 'recordEvent')
      },
      sendMethod: function () {
        throw exceptionString('system.eventRecorder', 'sendMethod')
      },
      flushUnreportedEvents: function (e) {},
    },
    Pa = {}
  ;(Pa.environment = new VPAFKitEnvironment()), (Pa.eventRecorder = ka), (Pa.logger = loggerNamed('mt-vpafkit'))
  var Aa = qn,
    VPAFKitBase = function () {
      Aa.apply(this, arguments)
    }
  ;((VPAFKitBase.prototype = new Aa()).constructor = VPAFKitBase),
    (VPAFKitBase.prototype.environment = function () {
      return Pa.environment
    }),
    (VPAFKitBase.prototype.eventRecorder = function () {
      return Pa.eventRecorder
    }),
    (VPAFKitBase.prototype.knownFields = function () {
      var e = Aa.prototype.knownFields().concat([ha, pa, ya, ma, va, _a, ba])
      return e
    }),
    (VPAFKitBase.prototype.consumerId = function (e) {
      var s = pa
      return e && s in e ? e[s] : this.environment().consumerId()
    }),
    (VPAFKitBase.prototype.consumerNs = function (e) {
      var s = ya
      return e && s in e ? e[s] : this.environment().consumerNs()
    }),
    (VPAFKitBase.prototype.isOffline = function (e) {
      var s = va
      return e && s in e ? e[s] : this.environment().isOffline()
    }),
    (VPAFKitBase.prototype.videoViewportHeight = function (e) {
      var s = _a
      return e && s in e ? e[s] : this.environment().videoViewportHeight()
    }),
    (VPAFKitBase.prototype.videoViewportWidth = function (e) {
      var s = ba
      return e && s in e ? e[s] : this.environment().videoViewportWidth()
    })
  var Ia = new VPAFKitBase(function () {
    return topic()
  })
  ;(Ia.metricsData = function () {
    return Ia.processMetricsData.apply(Ia, [null].concat(Array.prototype.slice.call(arguments)))
  }),
    (Ia.processMetricsData = function (e) {
      var s = null
      if (!Config.metricsDisabledOrBlacklistedEvent(e, topic())) {
        var n = Array.prototype.slice.call(arguments, 1)
        if (this !== Ia) {
          var d = Ia.metricsData.apply(Ia, n)
          n = [d].concat(n)
        }
        s = processMetricsData(this, this.knownFields(), !0, n)
      }
      return Config.removeBlacklistedFields(s, topic()), s
    })
  var MediaActivity = function (e, s) {
    ;(this._defaultEventType = e), (this._reasonConstants = s), this._defaultActionType
  }
  extend(MediaActivity, Ea),
    Object.defineProperties(MediaActivity.prototype, {
      TYPE: {
        get: function () {
          return Ta.TYPE
        },
      },
      REASON: {
        get: function () {
          return this._reasonConstants
        },
      },
    }),
    (MediaActivity.prototype.setDelegate = function (e) {
      return attachDelegate(this, e)
    }),
    (MediaActivity.prototype.knownFields = function () {
      var e = [ha, ga, fa]
      return e
    }),
    (MediaActivity.prototype.eventType = function (e) {
      return this._defaultEventType
    }),
    (MediaActivity.prototype.eventVersion = function (e) {
      var s = Ia.eventVersion(e)
      return null !== s ? s : 1
    }),
    (MediaActivity.prototype.actionType = function (e) {
      return this._defaultActionType
    })
  var StartMediaActivity = function (e, s) {
    MediaActivity.apply(this, arguments), (this._defaultActionType = MediaActivity.ACTION_TYPE.START)
  }
  ;((StartMediaActivity.prototype = new MediaActivity()).constructor = StartMediaActivity),
    (StartMediaActivity.prototype.metricsData = function (e, s, n, d) {
      var h = this.eventType(),
        p = { position: e, overallPosition: s, startType: n, startReason: d },
        y = Array.prototype.slice.call(arguments, 4)
      return Ia.processMetricsData.apply(this, [h, p].concat(y))
    })
  var StopMediaActivity = function (e, s) {
    MediaActivity.apply(this, arguments), (this._defaultActionType = MediaActivity.ACTION_TYPE.STOP)
  }
  ;((StopMediaActivity.prototype = new MediaActivity()).constructor = StopMediaActivity),
    (StopMediaActivity.prototype.metricsData = function (e, s, n, d, h) {
      var p = this.eventType(),
        y = {
          position: e,
          overallPosition: s,
          stopType: n,
          stopReason: d,
          startPosition: (h = h || {}).position,
          startOverallPosition: h.overallPosition,
          startTime: h.eventTime,
          startType: h.startType,
          startReason: h.startReason,
          startReasonType: h.startReasonType,
        }
      p === MediaActivity.EVENT_TYPE.SEEK_ACTIVITY && (y.startAssetId = h.assetId)
      var m = Array.prototype.slice.call(arguments, 5)
      return Ia.processMetricsData.apply(this, [p, y].concat(m))
    })
  var wa = new StartMediaActivity(MediaActivity.EVENT_TYPE.PLAY_ACTIVITY, Ta.PLAY_START_REASON),
    Ra = new StopMediaActivity(MediaActivity.EVENT_TYPE.PLAY_ACTIVITY, Ta.PLAY_STOP_REASON),
    Oa = new StartMediaActivity(MediaActivity.EVENT_TYPE.SEEK_ACTIVITY, Ta.SEEK_START_REASON),
    Ca = new StopMediaActivity(MediaActivity.EVENT_TYPE.SEEK_ACTIVITY, Ta.SEEK_STOP_REASON),
    Ma = Object.freeze({ __proto__: null, base: Ia, playStart: wa, playStop: Ra, seekStart: Oa, seekStop: Ca }),
    MediaActivity$1 = function (e) {
      ;(this._activityType = e), (this._startMetricsData = null), (this._isStopped = !1)
    }
  ;(MediaActivity$1.ACTIVITY_TYPE = Ea.ACTIVITY_TYPE),
    Object.defineProperties(MediaActivity$1.prototype, {
      isStopped: {
        get: function () {
          return this._isStopped
        },
      },
      type: {
        get: function () {
          return this._activityType
        },
      },
      startOverallPosition: {
        get: function () {
          return this._startMetricsData ? this._startMetricsData.overallPosition : null
        },
      },
    }),
    extend(MediaActivity$1.prototype, Ta),
    (MediaActivity$1.prototype.started = function (e, s, n, d) {
      var h = this._startEventHandler()
      h &&
        ((this._startMetricsData = h.metricsData.apply(h, arguments)),
        this.type != MediaActivity$1.ACTIVITY_TYPE.SEEK && ka.recordEvent(topic(), this._startMetricsData))
    }),
    (MediaActivity$1.prototype.stopped = function (e, s, n, d) {
      var h = this._stopEventHandler()
      if (h) {
        this._isStopped = !0
        var p = [e, s, n, d, this._startMetricsData].concat(Array.prototype.slice.call(arguments, 4)),
          y = h.metricsData.apply(h, p)
        ka.recordEvent(topic(), y)
      }
    }),
    (MediaActivity$1.prototype._startEventHandler = function () {
      var e
      switch (this.type) {
        case MediaActivity$1.ACTIVITY_TYPE.PLAY:
          e = wa
          break
        case MediaActivity$1.ACTIVITY_TYPE.SEEK:
          e = Oa
      }
      return e
    }),
    (MediaActivity$1.prototype._stopEventHandler = function () {
      var e
      switch (this.type) {
        case MediaActivity$1.ACTIVITY_TYPE.PLAY:
          e = Ra
          break
        case MediaActivity$1.ACTIVITY_TYPE.SEEK:
          e = Ca
      }
      return e
    })
  var TimeTracker = function (e, s) {
    ;(this._date = new Date()), (this._position = s), this._validatePlaybackRate(e), (this._playbackRate = e)
  }
  Object.defineProperties(TimeTracker.prototype, {
    playbackRate: {
      get: function () {
        return this._playbackRate
      },
    },
  }),
    (TimeTracker.prototype.update = function (e, s) {
      ;(this._date = new Date()), (this._position = s), this._validatePlaybackRate(e), (this._playbackRate = e)
    }),
    (TimeTracker.prototype.estimatedTime = function (e) {
      var s
      isInteger(e) ? (s = e) : (Pa.logger.error('VPAFKit error: position should be an integer'), (s = Math.round(e)))
      var n = (s - this._position) / (0 == this.playbackRate ? 1 : this.playbackRate)
      return this._date.getTime() + Math.round(n)
    }),
    (TimeTracker.prototype._validatePlaybackRate = function (e) {
      0 == e && Pa.logger.error('VPAFKit error: playbackRate should not be zero.')
    })
  var Na = Jn,
    Da = Sa.INCLUDES_START_POSITIONS,
    La = Sa.INCLUDES_END_POSITIONS,
    MediaActivityTracker = function (e) {
      Na.apply(this, arguments),
        (this._playlist = e),
        (this._playActivity = null),
        (this._playStartPlaylistItem = null),
        (this._seekActivity = null),
        (this._timeTracker = null),
        (this._shouldGenerateTransitions = !0)
    }
  ;((MediaActivityTracker.prototype = new Na()).constructor = MediaActivityTracker),
    extend(MediaActivityTracker.prototype, Ta),
    Object.defineProperties(MediaActivityTracker.prototype, {
      shouldGenerateTransitions: {
        get: function () {
          return this._shouldGenerateTransitions
        },
        set: function (e) {
          this._shouldGenerateTransitions = e
        },
      },
    }),
    (MediaActivityTracker.prototype.setDelegate = function (e) {
      return attachDelegate(this, e)
    }),
    (MediaActivityTracker.prototype.playStarted = function (e, s, n) {
      return this.playStartedWithPlaybackRate.apply(this, [1].concat(Array.prototype.slice.call(arguments)))
    }),
    (MediaActivityTracker.prototype.playStartedWithPlaybackRate = function (e, s, n, d) {
      if (this._hasUnstoppedActivity(this._playActivity))
        this._error('inconsistent state: did you forget to call playStopped?')
      else {
        var h = this._playlistItem(s, Da)
        h &&
          (this._playStarted.apply(this, [h].concat(Array.prototype.slice.call(arguments, 1))),
          this.shouldGenerateTransitions && (this._timeTracker = new TimeTracker(e, s)))
      }
    }),
    (MediaActivityTracker.prototype.playStopped = function (e, s, n) {
      this._generatePlaylistTransitionsIfNecessary(e),
        this._hasUnstoppedActivity(this._playActivity)
          ? this._playStopped.apply(this, Array.prototype.slice.call(arguments))
          : this._error('inconsistent state: did you forget to call playStarted?'),
        (this._playStartPlaylistItem = null),
        (this._timeTracker = null)
    }),
    (MediaActivityTracker.prototype.playTransitioned = function (e) {
      this.playStopped.apply(
        this,
        [e, this.TYPE.AUTOMATIC, this.PLAY_STOP_REASON.TRANSITION].concat(Array.prototype.slice.call(arguments, 1))
      ),
        this.playStarted.apply(
          this,
          [e, this.TYPE.AUTOMATIC, this.PLAY_START_REASON.TRANSITION].concat(Array.prototype.slice.call(arguments, 1))
        )
    }),
    (MediaActivityTracker.prototype.seekStarted = function (e, s, n) {
      if (this._hasUnstoppedActivity(this._seekActivity))
        this._error('inconsistent state: did you forget to call seekStopped?')
      else {
        var d = this._playlistItem(e, Da)
        if (d) {
          var h = this._activityArguments.apply(this, [d].concat(Array.prototype.slice.call(arguments)))
          ;(this._seekActivity = new MediaActivity$1(MediaActivity$1.ACTIVITY_TYPE.SEEK)),
            this._seekActivity.started.apply(this._seekActivity, h)
        }
      }
    }),
    (MediaActivityTracker.prototype.seekStopped = function (e, s, n) {
      var d = this._playlistItem(e, La)
      if (d && this._hasUnstoppedActivity(this._seekActivity)) {
        var h = this._activityArguments.apply(this, [d].concat(Array.prototype.slice.call(arguments)))
        this._seekActivity.stopped.apply(this._seekActivity, h)
      } else this._error('inconsistent state: did you forget to call seekStarted?')
    }),
    (MediaActivityTracker.prototype.synchronize = function (e, s) {
      if (this.shouldGenerateTransitions) {
        var n = e > 0,
          d = this._hasUnstoppedActivity(this._playActivity)
        d && n
          ? (this._generatePlaylistTransitionsIfNecessary(s), this._timeTracker.update(e, s))
          : d && !n
          ? this._error('inconsistent state: did you forget to call playStopped?')
          : !d && n && this._error('inconsistent state: did you forget to call playStarted?')
      }
    }),
    (MediaActivityTracker.prototype._playStarted = function (e, s, n, d) {
      var h = this._activityArguments.apply(this, [e].concat(Array.prototype.slice.call(arguments, 1)))
      ;(this._playStartPlaylistItem = e),
        (this._playActivity = new MediaActivity$1(MediaActivity$1.ACTIVITY_TYPE.PLAY)),
        this._playActivity.started.apply(this._playActivity, h)
    }),
    (MediaActivityTracker.prototype._playStopped = function (e, s, n) {
      var d = this._playStartPlaylistItem,
        h = this._activityArguments.apply(this, [d].concat(Array.prototype.slice.call(arguments)))
      this._playActivity.stopped.apply(this._playActivity, h)
    }),
    (MediaActivityTracker.prototype._playlistItem = function (e, s) {
      var n
      return (
        this._playlist && isFunction(this._playlist.getItem) && (n = this._playlist.getItem(e, s)),
        n || this._error('unable to get item from playlist'),
        n
      )
    }),
    (MediaActivityTracker.prototype._playlistItems = function (e, s) {
      var n = []
      return (
        this._playlist && isFunction(this._playlist.getItems)
          ? (n = this._playlist.getItems(e, s))
          : this._error('unable to get items from playlist'),
        n
      )
    }),
    (MediaActivityTracker.prototype._relativePosition = function (e, s) {
      var n
      return (
        (s = s || this._playlistItem(e)) &&
          isNumber(s.startOverallPosition) &&
          (n = e - s.startOverallPosition + (s.startPosition || 0)),
        n
      )
    }),
    (MediaActivityTracker.prototype._combineEventData = function (e, s) {
      var n = this._playlist ? this._playlist.eventData : null,
        d = e ? e.eventData : null,
        h = []
      return n && h.push(n), d && h.push(d), this._eventData && h.push(this._eventData), s && (h = h.concat(s)), h
    }),
    (MediaActivityTracker.prototype._activityArguments = function (e, s, n, d) {
      var h = this._relativePosition(s, e),
        p = this._combineEventData(e, Array.prototype.slice.call(arguments, 4)),
        y = [h, s, n, d].concat(p)
      return y
    }),
    (MediaActivityTracker.prototype._generatePlaylistTransitionsIfNecessary = function (e) {
      if (this.shouldGenerateTransitions && this._hasUnstoppedActivity(this._playActivity)) {
        var s,
          n,
          d,
          h = this._playActivity.startOverallPosition || 0,
          p = this._playlistItems(h, e)
        this._playlist._returnsOrderedItems || p.sort(this._playlistItemComparator)
        for (var y = 0; y + 1 < p.length; y++)
          if (!((s = (n = p[y + 1]).startOverallPosition) <= h)) {
            if (s >= e) break
            ;(d = { eventTime: this._timeTracker ? this._timeTracker.estimatedTime(s) : null }),
              this._playStopped(s, this.TYPE.AUTOMATIC, this.PLAY_STOP_REASON.TRANSITION, d),
              this._playStarted(n, s, this.TYPE.AUTOMATIC, this.PLAY_START_REASON.TRANSITION, d)
          }
      }
    }),
    (MediaActivityTracker.prototype._hasUnstoppedActivity = function (e) {
      return e && !e.isStopped
    }),
    (MediaActivityTracker.prototype._error = function (e) {
      Pa.logger.error(this.constructor.name + ' error: ' + e)
    }),
    (MediaActivityTracker.prototype._playlistItemComparator = function (e, s) {
      return e.startOverallPosition == s.startOverallPosition
        ? 0
        : e.startOverallPosition < s.startOverallPosition
        ? -1
        : 1
    })
  var xa = Jn,
    MediaPlaylistItem = function (e) {
      xa.apply(this, arguments), (this._startOverallPosition = e), (this._startPosition = 0)
    }
  ;((MediaPlaylistItem.prototype = new xa()).constructor = MediaPlaylistItem),
    Object.defineProperties(MediaPlaylistItem.prototype, {
      startOverallPosition: {
        get: function () {
          return this._startOverallPosition
        },
      },
      startPosition: {
        get: function () {
          return this._startPosition
        },
        set: function (e) {
          this._startPosition = e
        },
      },
      eventData: {
        get: function () {
          return this._eventData
        },
      },
    })
  var HLSRollItem = function (e, s) {
    MediaPlaylistItem.apply(this, arguments), (this._duration = s)
  }
  ;((HLSRollItem.prototype = new MediaPlaylistItem()).constructor = HLSRollItem),
    Object.defineProperties(HLSRollItem.prototype, {
      duration: {
        get: function () {
          return this._duration
        },
      },
      endOverallPosition: {
        get: function () {
          return this.startOverallPosition + this.duration
        },
      },
    }),
    (HLSRollItem.prototype.containsOverallPosition = function (e) {
      return this.startOverallPosition <= e && this.endOverallPosition > e
    })
  var MediaPlaylist = function () {}
  ;(MediaPlaylist.prototype.RANGE_OPTIONS = Sa),
    Object.defineProperties(MediaPlaylist.prototype, { eventData: { get: function () {} } }),
    (MediaPlaylist.prototype.getItem = function (e, s) {}),
    (MediaPlaylist.prototype.getItems = function (e, s) {})
  var HLSVideoPlaylist = function (e) {
    MediaPlaylist.apply(this, arguments),
      (this._startPosition = e),
      (this._mainFeatureMetricsData = copyKeysAndValues.apply(
        null,
        [!1, !1, !1, null].concat(Array.prototype.slice.call(arguments, 1))
      )),
      (this._rollItems = [])
  }
  ;((HLSVideoPlaylist.prototype = new MediaPlaylist()).constructor = HLSVideoPlaylist),
    (HLSVideoPlaylist.prototype.setDelegate = function (e) {
      return attachDelegate(this, e)
    }),
    (HLSVideoPlaylist.prototype.addRollInfoItems = function (e) {
      e &&
        e.length &&
        e.forEach(function (e) {
          this.addRollInfoItem(e)
        }, this)
    }),
    (HLSVideoPlaylist.prototype.addRollInfoItem = function (e) {
      e && this.addRollItem(1e3 * e.start, 1e3 * e.duration, e.metricsData)
    }),
    (HLSVideoPlaylist.prototype.addRollItem = function (e, s) {
      var n = new HLSRollItem(e, s)
      n.updateData.apply(n, Array.prototype.slice.call(arguments, 2)), this._addRollItem(n)
    }),
    (HLSVideoPlaylist.prototype.updateMainFeatureMetricsData = function () {
      extend.apply(null, [this._mainFeatureMetricsData].concat(Array.prototype.slice.call(arguments)))
    }),
    (HLSVideoPlaylist.prototype.getItem = function (e, s) {
      var n,
        d = this._indexOfLastRollItemWithStartBeforePosition(e)
      if (isInteger(d)) {
        for (
          ;
          s != this.RANGE_OPTIONS.INCLUDES_START_POSITIONS && this._rollItems[d].startOverallPosition == e && d > 0;

        )
          d--
        ;(n = this._rollItems[d]).containsOverallPosition(e) ||
          (s == this.RANGE_OPTIONS.INCLUDES_END_POSITIONS && n.endOverallPosition == e) ||
          (n = this._mainFeatureItemWithStartOverallPosition(n.endOverallPosition))
      } else n = this._mainFeatureItemWithStartOverallPosition(this._startPosition)
      return n
    }),
    (HLSVideoPlaylist.prototype.getItems = function (e, s) {
      var n = []
      if (this._rollItems.length) {
        var d = this._indexOfLastRollItemWithStartBeforePosition(e)
        for (
          isInteger(d) || (n.push(this._mainFeatureItemWithStartOverallPosition(this._startPosition)), (d = 0));
          d < this._rollItems.length;

        ) {
          var h = this._rollItems[d]
          if (h.startOverallPosition > s) break
          if ((h.endOverallPosition >= e && n.push(h), d++, h.endOverallPosition < s))
            if (d < this._rollItems.length) {
              var p = this._rollItems[d]
              p.startOverallPosition &&
                p.startOverallPosition > h.endOverallPosition &&
                n.push(this._mainFeatureItemWithStartOverallPosition(h.endOverallPosition))
            } else n.push(this._mainFeatureItemWithStartOverallPosition(h.endOverallPosition))
        }
      } else n.push(this._mainFeatureItemWithStartOverallPosition(this._startPosition))
      return n
    }),
    (HLSVideoPlaylist.prototype._addRollItem = function (e) {
      if (e) {
        var s = this._insertionIndexForItemWithPosition(e.startOverallPosition)
        this._rollItems.splice(s, 0, e)
      }
    }),
    (HLSVideoPlaylist.prototype._indexOfLastRollItemWithStartBeforePosition = function (e) {
      var s,
        n = this._rollItems[0]
      return n && isInteger(e) && n.startOverallPosition <= e && (s = this._insertionIndexForItemWithPosition(e) - 1), s
    }),
    (HLSVideoPlaylist.prototype._insertionIndexForItemWithPosition = function (e) {
      for (var s = 0, n = this._rollItems.length; s < n; ) {
        var d = Math.floor((s + n) / 2)
        this._rollItems[d].startOverallPosition > e ? (n = d) : (s = d + 1)
      }
      return s
    }),
    (HLSVideoPlaylist.prototype._mainFeatureItemWithStartOverallPosition = function (e) {
      var s = new MediaPlaylistItem(e)
      return (s.startPosition = this._featurePlayheadProgress(e)), s.updateData(this._mainFeatureMetricsData), s
    }),
    (HLSVideoPlaylist.prototype._featurePlayheadProgress = function (e) {
      e = e || 0
      var s,
        n,
        d = this._indexOfLastRollItemWithStartBeforePosition(e),
        h = this._startPosition || 0
      isInteger(d) || (d = -1)
      for (var p = d; p >= 0; p--)
        (s = this._rollItems[p]),
          0 === p
            ? (h += s.startOverallPosition)
            : ((n = this._rollItems[p - 1]), (h += s.startOverallPosition - n.endOverallPosition))
      return h
    })
  var Ua = Object.freeze({
    __proto__: null,
    createTracker: function (e) {
      var s = new MediaActivityTracker(e)
      return s.updateData.apply(s, Array.prototype.slice.call(arguments, 1)), s
    },
    createHLSVideoPlaylist: function (e) {
      var s = new HLSVideoPlaylist(e)
      return s.updateMainFeatureMetricsData.apply(s, Array.prototype.slice.call(arguments, 1)), s
    },
  })
  var $a = Object.freeze({
      __proto__: null,
      applyFieldsMap: function (e, s) {
        return applyFieldsMap$1(e, s, Config.value('fieldsMap', topic()))
      },
    }),
    Ba = Object.freeze({ __proto__: null, eventFields: $a })
  function PlayActivity() {
    ;(this.config = Config.defaultConfig()), (this._initCalled = !1)
  }
  ;(PlayActivity.prototype._utReset = function () {
    ;(this.config = Config.defaultConfig()), (this._initCalled = !1)
  }),
    (PlayActivity.prototype.init = function (e, s, n, d, h) {
      if (!this._initCalled) {
        ;(this._initCalled = !0),
          n && (setDelegates(Ma, n), setDelegates(Pa, n)),
          (function (e) {
            Xn = e
          })(e)
        var p = Config.getConfig(e),
          y = {
            metricsDisabledOrBlacklistedEvent: metricsDisabledOrBlacklistedEvent,
            removeBlacklistedFields: removeBlacklistedFields,
          }
        attachMethods(p, y, p),
          attachMethods(Config, y, Config),
          (function (e, s) {
            var n = null
            if (e && s && s.setDelegate) {
              var d,
                h = {}
              for (d in e) isFunction(e[d]) && e[d].origFunction && (h[d] = e[d])
              n = s.setDelegate(h)
            }
          })(this.config, p),
          p.init(s, d, h),
          (this.config = p)
      }
    }),
    (PlayActivity.prototype.system = Pa),
    (PlayActivity.prototype.eventHandlers = Ma),
    (PlayActivity.prototype.mediaActivityTracker = Ua),
    (PlayActivity.prototype.utils = Ba)
  var Fa = new PlayActivity()
  const ja = {
      'ac-3': 'AC3',
      'mp4a.a5': 'AC3',
      alac: 'Apple Lossless',
      'ec-3': 'EC3',
      'mp4a.a6': 'EC3',
      flac: 'Free Lossless',
      'mp4a.40.2': 'AAC',
      'mp4a.40.5': 'AAC',
      'mp4a.40.29': 'AAC',
      'mp4a.40.34': 'MP3',
      'mp4a.40.42': 'AAC',
    },
    Ka = /^[0-9]+\/JOC$/,
    isAtmos = (e, s) => 'EC3' === ja[e] && ((e) => Ka.test(e))(s),
    Va = ['dvh1.05.01', 'dvhe.05.06'],
    Ya = { PQ: 'HDR', HLG: 'HDR', SDH: 'SDH' },
    convertToVideoColorRange = (e, s) =>
      ((e) => -1 !== Va.indexOf(e))(e)
        ? 'DolbyVision'
        : ((e) => {
            var s
            return null !== (s = Ya[e]) && void 0 !== s ? s : e
          })(s),
    getDefaultPlayable = (e) => {
      if (hasPlayables(e)) return e.playables[0]
    },
    hasPlayables = (e) => void 0 !== e.playables && Array.isArray(e.playables) && e.playables.length > 0,
    Ha = {
      initial: 'idle',
      states: {
        idle: { on: { PLAY: { target: 'playing', context: { reason: 'PLAY', manual: 'MANUAL' } } } },
        binging: { on: { PLAY: { target: 'playing', context: { reason: 'NEXT', manual: '~~previous~~' } } } },
        playing: {
          on: {
            BUFFER_START: { target: 'buffering', context: { reason: 'BUFFERING', manual: 'AUTOMATIC' } },
            EXIT: { target: 'idle', context: { reason: 'EXIT' } },
            PAUSE: { target: 'paused', context: { reason: 'PAUSE' } },
            STOP: { target: 'idle', context: {} },
            NEXT: { target: 'binging', context: { reason: 'NEXT' } },
            NEW: { target: 'idle', context: {} },
          },
        },
        paused: {
          on: { PLAY: { target: 'playing', context: { reason: 'UNPAUSE' } }, NEW: { target: 'idle', context: {} } },
        },
        buffering: {
          on: { BUFFER_STOP: { target: 'playing', context: { reason: 'BUFFERING', manual: 'AUTOMATIC' } } },
        },
      },
    },
    Wa = { manual: 'UNKNOWN', reason: 'UNKNOWN' }
  class VPAFStateMachine {
    constructor() {
      ;(this.currentState = Ha.initial), (this.currentContext = Wa)
    }
    isAllowedTransition(e) {
      return void 0 !== this.getNextState(e)
    }
    transition(e, s = {}) {
      const n = this.getNextState(e)
      if (!n) return
      const d = {}
      return (
        s.hasOwnProperty('manual') &&
          (void 0 !== s.manual ? (d.manual = s.manual ? 'MANUAL' : 'AUTOMATIC') : (d.manual = 'UNKNOWN')),
        void 0 !== s.reason && (d.reason = s.reason),
        (this.currentContext = Object.assign(
          Object.assign(Object.assign(Object.assign({}, Wa), n.context), d),
          this.preservePreviousContext(n.context)
        )),
        (this.currentState = n.target),
        this.currentContext
      )
    }
    reset() {
      ;(this.currentState = Ha.initial), (this.currentContext = Wa)
    }
    getNextState(e) {
      return Ha.states[this.currentState].on[e]
    }
    preservePreviousContext(e) {
      const s = {}
      return (
        ['manual', 'reason', 'reasonType'].forEach((n) => {
          '~~previous~~' === e[n] && (s[n] = this.currentContext[n])
        }),
        s
      )
    }
  }
  const Ga = Object.assign(Object.assign({}, { NEXT_ITEM: 'NEXT' }), e.PlayActivityEndReasonType),
    za = { [Ze.playbackPause]: 'PAUSE', [Ze.playbackPlay]: 'PLAY', [Ze.playbackStop]: 'STOP', [Ze.playerExit]: 'EXIT' },
    qa = {
      [e.PlayActivityEndReasonType.EXITED_APPLICATION]: 'EXIT',
      [e.PlayActivityEndReasonType.FAILED_TO_LOAD]: 'FAILURE',
      [e.PlayActivityEndReasonType.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM]: 'PLAY_OTHER',
      [e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK]: 'COMPLETE',
      [e.PlayActivityEndReasonType.PLAYBACK_PAUSED_DUE_TO_INACTIVITY]: 'INACTIVITY',
      [e.PlayActivityEndReasonType.SCRUB_BEGIN]: 'SEEK',
      [e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS]: 'SEEK',
      [e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS]: 'SEEK',
      [Ga.NEXT_ITEM]: 'NEXT',
    },
    Qa = { captions: 'closedCaptionLocale', subtitles: 'subtitleLocale' },
    Xa = {
      [e.PresentationMode.pictureinpicture]: 'pictureInPicture',
      [e.PresentationMode.inline]: 'foreground',
      _default: 'foreground',
    }
  class VPAFTrackerAPI {
    constructor() {
      ;(this.isScrubbing = !1),
        (this.vpafKitInited = !1),
        (this.state = new VPAFStateMachine()),
        Fa.config.setDelegate({ configHostname: () => 'daf.xp.apple.com' })
    }
    get currentItem() {
      return this._currentItem
    }
    set currentItem(e) {
      ;(this._currentItem = e), (this.currentSkipItems = e ? parseSkipItems(e) : void 0)
    }
    configure(e, s) {
      var n, d
      return __awaiter$4(this, void 0, void 0, function* () {
        if (((this.instance = e), (this.dispatcher = s.services.dispatcher), !nn.storekit.cid))
          try {
            yield nn.storekit.infoRefresh()
          } catch (_t) {}
        const h =
          null === (d = null === (n = s.services.apiManager) || void 0 === n ? void 0 : n.utsAPI) || void 0 === d
            ? void 0
            : d.config
        return new Promise((e, s) => {
          let n = []
          navigator.languages
            ? (n = navigator.languages)
            : navigator.language
            ? (n = [navigator.language])
            : navigator.userLanguage && (n = [navigator.userLanguage])
          const onSuccess = () => (
            Fa.system.environment.setDelegate({
              app: () => 'com.apple.tv',
              appVersion: () => '1.0',
              consumerId: () => nn.storekit.cid,
              consumerNs: () => 'TV',
              isOffline: () => !1,
              delegateApp: () => 'web-tv-player',
              osLanguages: () => n,
              resourceRevNum: () => sn.app.build,
              storeFrontCountryCode() {
                var e, s
                return null !==
                  (s = null === (e = null == h ? void 0 : h.userProps) || void 0 === e ? void 0 : e.country) &&
                  void 0 !== s
                  ? s
                  : ''
              },
            }),
            this.setupListeners(),
            (this.vpafKitInited = !0),
            e(this)
          )
          if (this.vpafKitInited) return onSuccess()
          const d = { environment: zn, eventRecorder: Gn }
          Fa.init('xp_amp_tv_vpaf', null, d, onSuccess, (e) => {
            s(e)
          })
        })
      })
    }
    cleanup() {
      ;(this.tracker = void 0),
        (this.isScrubbing = !1),
        (this.scrubStopPosition = void 0),
        this.teardownListeners(),
        this.stopSynchronizing()
    }
    shouldConfigure(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return !0
      })
    }
    shouldTrackPlayActivity(e, s) {
      if (!s) return !1
      const n = getDefaultPlayable(s)
      if (!n || !n.vpafMetrics) return !1
      const d = za[e]
      return void 0 === d || this.state.isAllowedTransition(d)
    }
    activate(e = {}) {
      return Promise.resolve()
    }
    bufferStart(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (
          ((void 0 !== this.currentItem && this.isCurrentItem(e)) || (yield this.play(e, s)),
          !(yield this.shouldTrack(e)))
        )
          return
        const n = this.adjustedPosition(s)
        this.state.transition('BUFFER_START'), this.trackEvent('playStopped', n)
      })
    }
    bufferEnd(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!(yield this.shouldTrack(e))) return
        const n = this.adjustedPosition(s)
        this.state.transition('BUFFER_STOP'), this.trackEvent('playStarted', n)
      })
    }
    exit(e = {}) {
      return __awaiter$4(this, void 0, void 0, function* () {
        ;(yield this.shouldTrack()) &&
          (this.state.transition('EXIT'),
          this.trackEvent('playStopped', this.adjustedPosition(e)),
          this.stopSynchronizing())
      })
    }
    pause(e, s = {}) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = this.adjustedPosition(s)
        if (!(yield this.shouldTrack(e))) return
        const d = s.endReasonType === Ga.NEXT_ITEM ? 'NEXT' : 'PAUSE'
        this.state.transition(d, this.getExplicitStateContext(s)), this.trackEvent('playStopped', n)
      })
    }
    play(e, s = {}) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = this.adjustedPosition(s),
          d = void 0 !== n ? n : 0
        ;(yield this.shouldTrack(e)) &&
          (this.state.transition('PLAY', this.getExplicitStateContext(s)), this.trackEvent('playStarted', d))
      })
    }
    scrub(e, s = {}) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (void 0 === e || void 0 === s.position) return
        const n = this.adjustedPosition(s)
        this.isScrubbing && void 0 === s.endReasonType
          ? (this.scrubStopPosition = n)
          : this.isScrubbing && this.scrubEnd(e, n)
      })
    }
    seek(e, s = {}) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (void 0 !== e && void 0 !== s.startPosition && void 0 !== s.position) {
          if (this.isSkippingIntro(s) || this.isSeekingInterval(s)) {
            let n
            if (this.isSkippingIntro(s)) {
              const e = this.getSkipActionName(s.position)
              e && (n = { actionName: e })
            }
            return (
              this.trackSeekStart(e, Object.assign(Object.assign({}, s), { position: s.startPosition }), n),
              void this.trackSeekStop(e, s, n)
            )
          }
          yield this.scrubStart(e, this.convertTime(s.startPosition)), this.scrubEnd(e, this.convertTime(s.position))
        }
      })
    }
    skip(e, s = {}) {
      return Promise.resolve()
    }
    stop(e, s = {}) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!(yield this.shouldTrack(e))) return
        const n = this.adjustedPosition(s)
        this.state.transition('STOP', this.getExplicitStateContext(s)),
          this.trackEvent('playStopped', n),
          this.stopSynchronizing()
      })
    }
    adjustedPosition(e) {
      return void 0 === e.position ? void 0 : this.convertTime(e.position)
    }
    calculateOverallLength(e, s, n) {
      const d = parseFloat(e.hlsMetadata['feature.duration'])
      if (isNaN(d)) return this.convertTime(s.duration)
      const h = n.reduce((e, s) => e + s.duration, d)
      return this.convertTime(h)
    }
    convertTime(e) {
      return Math.round(1e3 * e)
    }
    createTracker(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (void 0 === e || this.isCurrentItem(e)) return
        this.state.transition('NEW'), (this.currentItem = e)
        const s = getDefaultPlayable(e)
        if (void 0 === s) return
        const n = this.getMainFeatureData(e, s),
          d = this.transformRollItems(e)
        en.debug('VPAF: Creating HLS Playlist', n)
        const h = Fa.mediaActivityTracker.createHLSVideoPlaylist(0, n)
        en.debug('VPAF: adding roll items', d), h.addRollInfoItems(d)
        const p = Fa.utils.eventFields.applyFieldsMap(s, 'utsVpafPlayable'),
          y = Fa.utils.eventFields.applyFieldsMap(e.attributes, 'utsVpafContent'),
          m = s.vpafMetrics,
          g = this.getAdditionalTrackingData(s)
        return (
          (g.overallLength = this.calculateOverallLength(e, s, d)),
          en.debug('VPAF: creating tracker with', [p, y, m, g]),
          (this.tracker = Fa.mediaActivityTracker.createTracker(h, p, y, m, g)),
          this.startSynchronizing(),
          this.tracker
        )
      })
    }
    getCurrentAudioSelection() {
      var e, s, n, d
      const h =
        null === (s = null === (e = this.instance) || void 0 === e ? void 0 : e.currentAudioTrack) || void 0 === s
          ? void 0
          : s.language
      if (void 0 === h) return
      const p =
        'description' ===
        (null === (d = null === (n = this.instance) || void 0 === n ? void 0 : n.currentAudioTrack) || void 0 === d
          ? void 0
          : d.kind)
          ? 'audioDescriptionLocale'
          : 'audioLocale'
      return { [p]: h, ['audioLocale' === p ? 'audioDescriptionLocale' : 'audioLocale']: void 0 }
    }
    getMainFeatureData(e, s) {
      var n
      const d = null === (n = null == e ? void 0 : e.hlsMetadata) || void 0 === n ? void 0 : n['feature.adam-id'],
        h = { url: e.attributes.url, assetPlacement: 'feature', assetId: d }
      return !0 === e.attributes.isAdultContent && (h.sensitiveContentType = 'adult'), h
    }
    transformRollItems(e) {
      return parseRollItems(e).map((e) => ({
        start: e.start,
        duration: e.duration,
        metricsData: { assetPlacement: e.type.replace('-', ''), assetId: e['adam-id'], isSkippable: e.skippable },
      }))
    }
    getMappedStopReason(e) {
      if (void 0 !== e.endReasonType) return qa[e.endReasonType]
    }
    getExplicitStateContext(e) {
      return { manual: e.userInitiated, reason: this.getMappedStopReason(e) }
    }
    handleLevelUpdated(e, s) {
      var n
      const { level: d, channels: h } = s
      if (!d) return
      const { audioCodec: p, videoRange: y, videoCodec: m } = d
      if (!((p && h) || (y && m))) return
      const g = {}
      p &&
        h &&
        (g.audioFormat = ((e, s) => {
          var n, d
          const h = null !== (n = null == e ? void 0 : e.toLowerCase()) && void 0 !== n ? n : ''
          return isAtmos(h, s) ? 'Atmos' : null !== (d = ja[h]) && void 0 !== d ? d : e
        })(p, h)),
        y && m && (g.videoColorRange = convertToVideoColorRange(m, y)),
        null === (n = this.tracker) || void 0 === n || n.updateData(g)
    }
    handleAudioTrackChange() {
      const { tracker: e } = this
      if (void 0 === e) return
      const s = this.getCurrentAudioSelection()
      s && e.updateData(s)
    }
    handleForcedTextTrackChange(e, s) {
      var n
      null === (n = this.tracker) ||
        void 0 === n ||
        n.updateData({ forcedSubtitleLocale: null == s ? void 0 : s.language })
    }
    handlePresentationModeChange(e, { mode: s }) {
      var n, d
      const h = null !== (n = Xa[s]) && void 0 !== n ? n : Xa._default
      null === (d = this.tracker) || void 0 === d || d.updateData({ playbackFocus: h })
    }
    handleTargetWirelessChange() {
      var e
      null === (e = this.tracker) || void 0 === e || e.updateData({ delegatedPlayback: this.getDelegatedPlayback() })
    }
    handleTextTrackChange() {
      var e
      const { tracker: s } = this
      if (void 0 === s) return
      const n = null === (e = this.instance) || void 0 === e ? void 0 : e.currentTextTrack
      if (!n || ('captions' !== n.kind && 'subtitles' !== (null == n ? void 0 : n.kind))) return
      const d = '' === n.language ? void 0 : n.language,
        h = {
          closedCaptionLocale: 'captions' === n.kind ? d : void 0,
          subtitleLocale: 'subtitles' === n.kind ? d : void 0,
        }
      s.updateData(h)
    }
    isSkippingIntro(e) {
      return e.seekReasonType === rt.SkipIntro
    }
    isSeekingInterval(e) {
      return e.seekReasonType === rt.Interval
    }
    shouldTrack(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return yield this.createTracker(e), void 0 !== this.tracker
      })
    }
    isCurrentItem(e) {
      return void 0 !== this.currentItem && void 0 !== e && this.currentItem.id === e.id
    }
    getAdditionalTrackingData(e) {
      var s, n, d
      const { instance: h } = this,
        p =
          null === (s = null == h ? void 0 : h.videoContainerElement) || void 0 === s
            ? void 0
            : s.querySelector('video'),
        y = null === (n = e.primaryLocale) || void 0 === n ? void 0 : n.locale,
        m = null !== (d = this.getCurrentAudioSelection()) && void 0 !== d ? d : void 0 !== y ? { audioLocale: y } : {},
        g = null == h ? void 0 : h.currentTextTrack,
        v = {
          programmingType: 'videoOnDemand',
          downloadState: 'streaming',
          videoViewportHeight: null == p ? void 0 : p.clientHeight,
          videoViewportWidth: null == p ? void 0 : p.clientWidth,
          playbackFocus: Xa._default,
          delegatedPlayback: this.getDelegatedPlayback(),
        }
      if (g) {
        const e = Qa[g.kind]
        e && g.language && (v[e] = g.language)
      }
      return Object.assign(Object.assign({}, v), m)
    }
    getDelegatedPlayback() {
      var e
      return (null === (e = this.instance) || void 0 === e ? void 0 : e.playbackTargetIsWireless) ? 'Airplay' : 'None'
    }
    getSkipActionName(e) {
      var s
      const n = (null !== (s = this.currentSkipItems) && void 0 !== s ? s : []).find((s) => s.target === e)
      return null == n ? void 0 : n.label
    }
    onVideoComponentScrubStart(e) {
      return this.scrubStart(this.currentItem, this.convertTime(e.detail.currentSeconds))
    }
    setupListeners() {
      void 0 !== this.dispatcher &&
        (this.dispatcher.subscribe(or.audioTrackChanged, this.handleAudioTrackChange),
        this.dispatcher.subscribe(or.textTrackChanged, this.handleTextTrackChange),
        this.dispatcher.subscribe(or.forcedTextTrackChanged, this.handleForcedTextTrackChange),
        this.dispatcher.subscribe(Ze.hlsLevelUpdated, this.handleLevelUpdated),
        this.dispatcher.subscribe(or.playbackTargetIsWirelessDidChange, this.handleTargetWirelessChange),
        this.dispatcher.subscribe(or.presentationModeDidChange, this.handlePresentationModeChange)),
        Fe || window.addEventListener('triggerSeekStart', this.onVideoComponentScrubStart)
    }
    teardownListeners() {
      void 0 !== this.dispatcher &&
        (this.dispatcher.unsubscribe(or.audioTrackChanged, this.handleAudioTrackChange),
        this.dispatcher.unsubscribe(or.textTrackChanged, this.handleTextTrackChange),
        this.dispatcher.unsubscribe(or.forcedTextTrackChanged, this.handleForcedTextTrackChange),
        this.dispatcher.unsubscribe(Ze.hlsLevelUpdated, this.handleLevelUpdated),
        this.dispatcher.unsubscribe(or.playbackTargetIsWirelessDidChange, this.handleTargetWirelessChange),
        this.dispatcher.unsubscribe(or.presentationModeDidChange, this.handlePresentationModeChange)),
        Fe || window.removeEventListener('triggerSeekStart', this.onVideoComponentScrubStart)
    }
    scrubEnd(e, s) {
      this.trackEvent('seekStopped', s, this.tracker.TYPE.MANUAL, this.tracker.SEEK_STOP_REASON.SCRUB),
        'playing' === this.state.currentState &&
          (this.trackEvent(
            'playStopped',
            this.scrubStopPosition,
            this.tracker.TYPE.AUTOMATIC,
            this.tracker.PLAY_STOP_REASON.SEEK
          ),
          this.trackEvent('playStarted', s, this.tracker.TYPE.AUTOMATIC, this.tracker.PLAY_START_REASON.SEEK)),
        (this.isScrubbing = !1),
        (this.scrubStopPosition = void 0)
    }
    scrubStart(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        ;(yield this.shouldTrack(e)) &&
          ((this.isScrubbing = !0),
          (this.scrubStopPosition = s),
          this.trackEvent('seekStarted', s, this.tracker.TYPE.MANUAL, this.tracker.SEEK_START_REASON.SCRUB))
      })
    }
    startSynchronizing() {
      void 0 === this.synchronizeTimeout && (this.synchronizeTimeout = setInterval(this.synchronize, 6e4))
    }
    stopSynchronizing() {
      void 0 !== this.synchronizeTimeout && (clearInterval(this.synchronizeTimeout), (this.synchronizeTimeout = void 0))
    }
    synchronize() {
      if (void 0 === this.tracker || void 0 === this.instance) return void this.stopSynchronizing()
      const e = 'paused' === this.state.currentState,
        { playbackRate: s, currentPlaybackTime: n } = this.instance,
        d = e ? 0 : s,
        h = Math.round(1e3 * n)
      en.debug(`VPAF: synchronize rate: ${d} and current time: ${h}`), this.tracker.synchronize(d, h)
    }
    trackSeekStart(e, s, n = {}) {
      const d =
          s.seekReasonType === rt.SkipIntro
            ? this.tracker.SEEK_START_REASON.SKIP_INTRO
            : this.tracker.SEEK_START_REASON.INTERVAL,
        h = this.adjustedPosition(s),
        p = this.tracker.TYPE.MANUAL
      if ((this.trackEvent('seekStarted', h, p, d, n), 'playing' === this.state.currentState)) {
        const e = this.isSkippingIntro(s)
          ? Object.assign(Object.assign({}, n), { stopReasonType: this.tracker.PLAY_STOP_REASON_TYPE.SKIP_INTRO })
          : n
        this.trackEvent('playStopped', h, p, this.tracker.PLAY_STOP_REASON.SEEK, e)
      }
    }
    trackSeekStop(e, s, n = {}) {
      const d = this.isSeekingInterval(s)
          ? this.tracker.SEEK_STOP_REASON.INTERVAL
          : this.tracker.SEEK_STOP_REASON.SKIP_INTRO,
        h = this.adjustedPosition(s),
        p = this.tracker.TYPE.AUTOMATIC
      if ((this.trackEvent('seekStopped', h, p, d, n), 'playing' === this.state.currentState)) {
        const e = this.isSkippingIntro(s)
          ? Object.assign(Object.assign({}, n), { startReasonType: this.tracker.PLAY_START_REASON_TYPE.SKIP_INTRO })
          : n
        this.trackEvent('playStarted', h, p, this.tracker.PLAY_START_REASON.SEEK, e)
      }
    }
    trackEvent(e, s, n, d, h) {
      void 0 === n && (n = this.tracker.TYPE[this.state.currentContext.manual]),
        void 0 === d &&
          (d =
            'playStarted' === e
              ? this.tracker.PLAY_START_REASON[this.state.currentContext.reason]
              : this.tracker.PLAY_STOP_REASON[this.state.currentContext.reason]),
        en.debug('VPAF: ' + e, s, n, d, h),
        this.tracker[e].call(this.tracker, Math.round(s), n, d, h)
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object, Object]),
      __metadata$2('design:returntype', void 0),
    ],
    VPAFTrackerAPI.prototype,
    'handleLevelUpdated',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', void 0),
      ],
      VPAFTrackerAPI.prototype,
      'handleAudioTrackChange',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', void 0),
      ],
      VPAFTrackerAPI.prototype,
      'handleForcedTextTrackChange',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', void 0),
      ],
      VPAFTrackerAPI.prototype,
      'handlePresentationModeChange',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', void 0),
      ],
      VPAFTrackerAPI.prototype,
      'handleTargetWirelessChange',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', void 0),
      ],
      VPAFTrackerAPI.prototype,
      'handleTextTrackChange',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [CustomEvent]),
        __metadata$2('design:returntype', void 0),
      ],
      VPAFTrackerAPI.prototype,
      'onVideoComponentScrubStart',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', void 0),
      ],
      VPAFTrackerAPI.prototype,
      'synchronize',
      null
    )
  const asyncNoop = () => __awaiter$4(void 0, void 0, void 0, function* () {})
  class BaseSeekable {
    constructor(e) {
      ;(this.mediaItemPlayback = e), (this.canSeek = !1)
    }
    getSeekSeconds(e) {
      return (
        en.warn('Seeking by predetermined amounts are not supported in this playback method'), { BACK: 0, FORWARD: 0 }
      )
    }
    seekBackward(e = asyncNoop) {
      en.warn('seekBackward is not supported in this playback method')
    }
    seekForward(e = asyncNoop) {
      en.warn('seekForward is not supported in this playback method')
    }
    seekToTime(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        en.warn('seekToTime is not supported in this playback method')
      })
    }
  }
  class Seekable {
    constructor(e, s) {
      ;(this._dispatcher = e), (this.mediaItemPlayback = s), (this.canSeek = !0)
    }
    getSeekSeconds(e) {
      return ((e) => {
        switch (e.type) {
          case 'musicVideo':
            return { FORWARD: 10, BACK: 10 }
          default:
            return { FORWARD: 30, BACK: 15 }
        }
      })(e)
    }
    seekBackward(e = this._seekToBeginning) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (void 0 === this.mediaItemPlayback.nowPlayingItem)
          return void en.warn('Cannot seekBackward when nowPlayingItem is not yet set.')
        const s =
          this.mediaItemPlayback.currentPlaybackTime - this.getSeekSeconds(this.mediaItemPlayback.nowPlayingItem).BACK
        s < 0 ? yield e.call(this) : yield this.seekToTime(s, rt.Interval)
      })
    }
    seekForward(e = this._seekToEnd) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (void 0 === this.mediaItemPlayback.nowPlayingItem)
          return void en.warn('Cannot seekForward when nowPlayingItem is not yet set.')
        const s =
          this.mediaItemPlayback.currentPlaybackTime +
          this.getSeekSeconds(this.mediaItemPlayback.nowPlayingItem).FORWARD
        s > this.mediaItemPlayback.currentPlaybackDuration ? yield e.call(this) : yield this.seekToTime(s, rt.Interval)
      })
    }
    seekToTime(e, s = rt.Manual) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = this.mediaItemPlayback.currentPlaybackTime,
          d = Math.min(Math.max(0, e), this.mediaItemPlayback.currentPlaybackDuration - 1)
        yield this.mediaItemPlayback.seekToTime(d, s),
          this._dispatcher.publish(Ze.playbackSeek, { startPosition: n, position: d, seekReasonType: s })
      })
    }
    _seekToBeginning() {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this.seekToTime(0, rt.Interval)
      })
    }
    _seekToEnd() {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this.seekToTime(this.mediaItemPlayback.currentPlaybackDuration, rt.Interval)
      })
    }
  }
  var Ja
  !(function (e) {
    ;(e.continuous = 'continuous'), (e.serial = 'serial')
  })(Ja || (Ja = {}))
  const { queueItemsDidChange: Za } = or
  class PlaybackController {
    constructor(e) {
      var s
      ;(this._context = {}),
        (this.onPlaybackStateDidChange = this.onPlaybackStateDidChange.bind(this)),
        (this._autoplayEnabled = null !== (s = null == e ? void 0 : e.autoplayEnabled) && void 0 !== s && s),
        (this._services = e.services),
        (this._playerOptions = e),
        (this.storekit = e.storekit),
        (this._skipIntro = new SkipAvailable({ controller: this, services: e.services })),
        (this._upNext = new UpNextMonitor({ controller: this, services: e.services })),
        (this._rollMonitor = new RollMonitor({ controller: this, services: e.services })),
        (this._queueModifier = new BaseModifiableQueue()),
        (this._shuffler = new BaseShuffler()),
        (this._seekable = new BaseSeekable(this._mediaItemPlayback)),
        (this._repeatable = new BaseRepeatable()),
        this._dispatcher.subscribe(or.autoplayEnabledDidChange, this.updateAutoplay)
    }
    updateAutoplay(e, s) {
      this.autoplayEnabled = s
    }
    get context() {
      return this._context
    }
    get continuous() {
      return this._continuous || this.hasAuthorization
    }
    set continuous(e) {
      this._continuous = e
    }
    get autoplayEnabled() {
      return this._autoplayEnabled
    }
    set autoplayEnabled(e) {
      this._autoplayEnabled = e
    }
    get currentBufferedProgress() {
      return this._mediaItemPlayback.currentBufferedProgress
    }
    set currentBufferedProgress(e) {
      this._mediaItemPlayback.currentBufferedProgress = e
    }
    set currentPlaybackProgress(e) {
      this._mediaItemPlayback.currentPlaybackProgress = e
    }
    get _dispatcher() {
      return this._services.dispatcher
    }
    get formattedCurrentPlaybackDuration() {
      return this._mediaItemPlayback.formattedCurrentPlaybackDuration
    }
    get hasAuthorization() {
      return hasAuthorization(this.storekit)
    }
    get isPlaying() {
      return this._mediaItemPlayback.isPlaying
    }
    get isPrimaryPlayer() {
      return this._mediaItemPlayback.isPrimaryPlayer
    }
    set isPrimaryPlayer(e) {
      this._mediaItemPlayback.isPrimaryPlayer = e
    }
    get isReady() {
      return this._mediaItemPlayback.isReady
    }
    get _mediaItemPlayback() {
      return this._services.mediaItemPlayback
    }
    get nowPlayingItem() {
      return this._mediaItemPlayback.nowPlayingItem
    }
    get nowPlayingItemIndex() {
      return this.queue ? this.queue.position : -1
    }
    get queue() {
      return this._queue
    }
    set queue(e) {
      this._prepareQueue(e),
        (this._queue = e),
        (this._shuffler.queue = this._queue),
        (this._queueModifier.queue = this._queue),
        this._dispatcher.publish(Za, e.items)
    }
    get repeatMode() {
      return this._repeatable.repeatMode
    }
    set repeatMode(e) {
      this._repeatable.repeatMode = e
    }
    get seekSeconds() {
      const { nowPlayingItem: e } = this
      if (void 0 !== e) return this._seekable.getSeekSeconds(e)
    }
    set shuffle(e) {
      this._shuffler.shuffle = e
    }
    get shuffleMode() {
      return this._shuffler.shuffleMode
    }
    set shuffleMode(e) {
      this._shuffler.shuffleMode = e
    }
    get storekit() {
      return this._storekit
    }
    set storekit(s) {
      s &&
        (s.addEventListener(rr.authorizationStatusWillChange, ({ authorizationStatus: s, newAuthorizationStatus: n }) =>
          __awaiter$4(this, void 0, void 0, function* () {
            this.isPlaying &&
              (s > Qi.DENIED && n < Qi.RESTRICTED
                ? yield this.stop({ endReasonType: e.PlayActivityEndReasonType.PLAYBACK_SUSPENDED, userInitiated: !1 })
                : yield this.stop({ userInitiated: !1 }))
          })
        ),
        (this._storekit = s))
    }
    append(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const s = yield this._dataForQueueOptions(e)
        return this._queueModifier.append(s), this.queue
      })
    }
    insertAt(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = yield this._dataForQueueOptions(s)
        return this._queueModifier.insertAt(e, n), this.queue
      })
    }
    _dataForQueueOptions(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return Object.assign(Object.assign({}, e), { context: this.context })
      })
    }
    clear() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._queueModifier.clear(), this.queue
      })
    }
    changeToMediaAtIndex(e = 0) {
      var s, n, d
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this.stop()
        const h = null === (s = this.queue.item(e)) || void 0 === s ? void 0 : s.id,
          p =
            null === (d = null === (n = this._mediaItemPlayback) || void 0 === n ? void 0 : n.playOptions) ||
            void 0 === d
              ? void 0
              : d.get(h)
        let y = (null == p ? void 0 : p.startTime) || 0
        const m = yield this._changeToMediaAtIndex(e, !0)
        m && (m.id !== h && (y = 0), this._dispatcher.publish(Ze.playbackPlay, { item: m, position: y }))
      })
    }
    changeToMediaItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const s = this.queue.indexForItem(e)
        return -1 === s ? Promise.reject(new MKError(MKError.MEDIA_DESCRIPTOR)) : this.changeToMediaAtIndex(s)
      })
    }
    activate() {
      en.debug('mk: base controller - activate'),
        this._dispatcher.unsubscribe(or.playbackStateDidChange, this.onPlaybackStateDidChange),
        this._dispatcher.subscribe(or.playbackStateDidChange, this.onPlaybackStateDidChange),
        this._skipIntro.activate(),
        this._upNext.activate(),
        this._rollMonitor.activate()
    }
    deactivate() {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this.stop(),
          this._dispatcher.unsubscribe(or.playbackStateDidChange, this.onPlaybackStateDidChange),
          this._skipIntro.deactivate(),
          this._upNext.deactivate(),
          this._rollMonitor.deactivate()
      })
    }
    destroy() {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this.deactivate(), this._dispatcher.unsubscribe(or.autoplayEnabledDidChange, this.updateAutoplay)
      })
    }
    hasCapabilities(e) {
      switch (e) {
        case on.SEEK:
          return this._seekable.canSeek
        case on.REPEAT:
          return this._repeatable.canSetRepeatMode
        case on.SHUFFLE:
          return this._shuffler.canSetShuffleMode
        case on.EDIT_QUEUE:
          return this._queueModifier.canModifyQueue
        case on.PAUSE:
        case on.SKIP_NEXT:
        case on.SKIP_TO_ITEM:
          return !0
        case on.SKIP_PREVIOUS:
        default:
          return !1
      }
    }
    pause(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._mediaItemPlayback.pause(e)
      })
    }
    play() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this.nowPlayingItem) return this._mediaItemPlayback.play()
        if (!this._queue || this._queue.isEmpty) return
        if (this.nowPlayingItemIndex >= 0) return this.changeToMediaAtIndex(this.nowPlayingItemIndex)
        const { queue: e } = this
        if (-1 !== e.nextPlayableItemIndex) return this.changeToMediaAtIndex(e.nextPlayableItemIndex)
        e.isRestricted &&
          e.items.every((e) => e.isRestricted) &&
          this._dispatcher.publish(or.mediaPlaybackError, new MKError(MKError.CONTENT_RESTRICTED, 'Content restricted'))
      })
    }
    playSingleMediaItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield fetchHLSMetadata(e), this._dispatcher.publish(or.queueItemsDidChange, [e])
        const s = yield this._mediaItemPlayback.startMediaItemPlayback(e, !0)
        s && this._dispatcher.publish(Ze.playbackPlay, { item: s, position: 0, userInitiated: !0 })
      })
    }
    onPlaybackStateDidChange(s, n) {
      return __awaiter$4(this, void 0, void 0, function* () {
        n.state === e.PlaybackStates.ended &&
          (this.continuous || this.repeatMode === e.PlayerRepeatMode.one) &&
          (en.debug('controller detected track ended event, moving to next item.'),
          this._dispatcher.publish(Ze.applicationActivityIntent, {
            endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            userInitiated: !1,
          }),
          yield this._next())
      })
    }
    preload() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._mediaItemPlayback.preload()
      })
    }
    prepend(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = yield this._dataForQueueOptions(e)
        return this._queueModifier.prepend(n, s), this.queue
      })
    }
    prepareToPlay(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._mediaItemPlayback.prepareToPlay(e)
      })
    }
    showPlaybackTargetPicker() {
      this._mediaItemPlayback.showPlaybackTargetPicker()
    }
    seekBackward() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._seekable.seekBackward()
      })
    }
    seekForward() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._seekable.seekForward(this.skipToNextItem.bind(this))
      })
    }
    skipToNextItem() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._next(!0)
      })
    }
    getNewSeeker() {
      return this._mediaItemPlayback.getNewSeeker()
    }
    seekToTime(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this._seekable.seekToTime(e, s)
      })
    }
    setQueue(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return yield this.extractGlobalValues(e), yield this._mediaItemPlayback.stop(), this.returnQueueForOptions(e)
      })
    }
    extractGlobalValues(e) {
      var s
      return __awaiter$4(this, void 0, void 0, function* () {
        this._context = null !== (s = e.context) && void 0 !== s ? s : {}
        const n = e.featureName
        void 0 !== n && (en.warn('featureName is deprecated, pass it inside context'), (this._context.featureName = n))
      })
    }
    stop(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this._mediaItemPlayback.stop(e)
      })
    }
    _changeToMediaAtIndex(e = 0, s = !1) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this.queue.isEmpty) return
        this.queue.position = e
        const n = this.queue.item(this.queue.position)
        if (!n) return
        const d = yield this._mediaItemPlayback.startMediaItemPlayback(n, s)
        if (d || n.state !== C.unsupported) return d
        yield this.skipToNextItem()
      })
    }
    _next(s = !1, n = !1) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this.queue.isEmpty) return
        const { _mediaItemPlayback: d } = this
        if (this.queue.nextPlayableItemIndex < 0)
          return (
            en.debug('controller/index._next no next item available, stopping playback'),
            yield this.stop({ userInitiated: s }),
            void (d.playbackState = e.PlaybackStates.completed)
          )
        const h = this.isPlaying,
          p = d.currentPlaybackTime,
          y = yield this._changeToMediaAtIndex(this.queue.nextPlayableItemIndex, s)
        return (
          this._notifySkip(h, y, n, {
            userInitiated: s,
            position: p,
            direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
          }),
          y
        )
      })
    }
    _notifySkip(s, n, d, h) {
      const { userInitiated: p, direction: y, position: m } = h,
        g = this._dispatcher
      d
        ? (en.debug('gapless transition, PAF play'),
          g.publish(Ze.playbackPlay, {
            item: n,
            position: 0,
            endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
          }))
        : s
        ? n
          ? g.publish(Ze.playbackSkip, { item: n, userInitiated: p, direction: y, position: m })
          : g.publish(Ze.playbackStop, { userInitiated: p, position: m })
        : n &&
          g.publish(
            Ze.playbackPlay,
            Object.assign(
              { item: n, position: 0 },
              p ? { endReasonType: e.PlayActivityEndReasonType.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM } : {}
            )
          )
    }
    _prepareQueue(e) {
      en.debug('mk: _prepareQueue'),
        this.hasAuthorization && (e.isRestricted = this.storekit.restrictedEnabled || !1),
        (e.repeatable = this._repeatable)
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [String, Boolean]),
      __metadata$2('design:returntype', void 0),
    ],
    PlaybackController.prototype,
    'updateAutoplay',
    null
  )
  function rejectOnLast() {
    return Promise.reject('The last middleware in the stack should not call next')
  }
  function processMiddleware(e, ...s) {
    return e.length
      ? (function createNextFunction([e, ...s]) {
          return (...n) => e(createNextFunction(s), ...n)
        })([...e, rejectOnLast])(...s)
      : Promise.reject('processMiddleware requires at mimimum one middleware function')
  }
  function parameterizeString(e, s) {
    return (function (e) {
      try {
        return (function recursiveTokenizeParameterizedString(e, s = []) {
          if (e.startsWith('{{')) {
            const n = e.indexOf('}}')
            if (-1 === n) throw new Error('UNCLOSED_PARAMETER')
            const d = { type: eo.Parameter, value: e.slice(2, n) }
            return n + 2 < e.length ? recursiveTokenizeParameterizedString(e.slice(n + 2), [...s, d]) : [...s, d]
          }
          {
            const n = e.indexOf('{{')
            return -1 === n
              ? [...s, { type: eo.Static, value: e }]
              : recursiveTokenizeParameterizedString(e.slice(n), [...s, { type: eo.Static, value: e.slice(0, n) }])
          }
        })(e)
      } catch (B) {
        if ('UNCLOSED_PARAMETER' === B.message) throw new Error(`Unclosed parameter in path: "${e}"`)
        throw B
      }
    })(e)
      .map((e) => {
        switch (e.type) {
          case eo.Parameter:
            return e.value in s ? encodeURIComponent('' + s[e.value]) : `{{${e.value}}}`
          case eo.Static:
          default:
            return e.value
        }
      })
      .join('')
  }
  var eo
  function constructUrlMiddleware(e, s) {
    let n = s.url
    return (
      n || (n = addPathToURL(s.baseUrl, s.path)),
      s.urlParameters && (n = parameterizeString(n, s.urlParameters)),
      s.queryParameters && (n = addQueryParamsToURL(n, s.queryParameters)),
      e(Object.assign(Object.assign({}, s), { url: n }))
    )
  }
  function unwrapJSONFromResponse(e) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        return yield e.json()
      } catch (B) {
        return
      }
    })
  }
  function fetchMiddlewareFactory(e) {
    return function (s, n) {
      return __awaiter$3(this, void 0, void 0, function* () {
        const s = yield e(n.url, n.fetchOptions),
          d = { request: n, response: s, data: yield unwrapJSONFromResponse(s) }
        if (!s.ok) throw MKError.responseError(s)
        return d
      })
    }
  }
  !(function (e) {
    ;(e[(e.Static = 0)] = 'Static'), (e[(e.Parameter = 1)] = 'Parameter')
  })(eo || (eo = {}))
  const to = fetchMiddlewareFactory(
    'undefined' != typeof fetch
      ? fetch
      : () => {
          throw new Error('window.fetch is not defined')
        }
  )
  var io
  !(function (e) {
    ;(e.Replace = 'REPLACE'), (e.Merge = 'MERGE')
  })(io || (io = {}))
  const ro = ['url']
  class APISession {
    constructor(e) {
      this.reconfigure(e)
    }
    get config() {
      return this._config
    }
    request(e, s = {}, n = {}) {
      var d
      return processMiddleware(
        this.middlewareStack,
        Object.assign(Object.assign(Object.assign({}, this.config.defaultOptions), n), {
          baseUrl: this.config.url,
          path: e,
          fetchOptions: mergeFetchOptions(
            null === (d = this.config.defaultOptions) || void 0 === d ? void 0 : d.fetchOptions,
            n.fetchOptions
          ),
          queryParameters: Object.assign(Object.assign({}, this.config.defaultQueryParameters), s),
          urlParameters: Object.assign(Object.assign({}, this.config.defaultUrlParameters), n.urlParameters),
        })
      )
    }
    reconfigure(e, s = io.Replace) {
      s === io.Merge && (e = deepmerge(this.config, e)),
        ro.forEach((s) => {
          if (void 0 === e[s]) throw new Error(`Session requires a valid SessionConfig, missing "${s}"`)
        }),
        (this._config = e),
        (this.middlewareStack = this.createMiddlewareStack())
    }
    createMiddlewareStack() {
      return Array.isArray(this.config.middleware)
        ? [constructUrlMiddleware, ...this.config.middleware, this.makeFetchMiddleware()]
        : [constructUrlMiddleware, this.makeFetchMiddleware()]
    }
    makeFetchMiddleware() {
      return 'function' == typeof this.config.fetchFunction ? fetchMiddlewareFactory(this.config.fetchFunction) : to
    }
  }
  const so = { music: { url: 'https://amp-api.music.apple.com' } }
  class MediaAPIV3 {
    constructor(e) {
      for (const s in so) this.configure(s, deepmerge(so[s], e))
    }
    configure(e, s, n = io.Merge) {
      var d
      this.storefrontId = s.storefrontId
      const h = (function (e) {
        let s = {}
        e.url && (s.url = e.url)
        e.storefrontId && (s.defaultUrlParameters = { storefrontId: e.storefrontId })
        e.mediaUserToken && (s.defaultOptions = { fetchOptions: { headers: { 'Media-User-Token': e.mediaUserToken } } })
        e.developerToken &&
          (s = deepmerge(s, {
            defaultOptions: { fetchOptions: { headers: { Authorization: 'Bearer ' + e.developerToken } } },
          }))
        e.options && (s = deepmerge(s, e.options))
        return s
      })(s)
      if (this[e]) this[e].session.reconfigure(h, n)
      else {
        const s = new APISession(h),
          n = s.request.bind(s)
        n.session = s
        const p =
          'undefined' != typeof process && 'test' === (null === (d = process.env) || void 0 === d ? void 0 : d.NODE_ENV)
        Object.defineProperty(this, e, { value: n, writable: p, enumerable: !0 })
      }
    }
  }
  class StationTrackLoader {
    constructor(e, s, { dispatcher: n, logger: d, apiManager: h }, p = {}) {
      ;(this.queue = e),
        (this.station = s),
        (this.context = p),
        (this.isActive = !1),
        (this.dispatcher = n),
        (this.logger = d),
        (this.apiManager = h)
    }
    activate() {
      this.dispatcher.unsubscribe(or.queuePositionDidChange, this.checkLoadMore),
        this.dispatcher.subscribe(or.queuePositionDidChange, this.checkLoadMore),
        (this.isActive = !0)
    }
    deactivate() {
      this.dispatcher.unsubscribe(or.queuePositionDidChange, this.checkLoadMore), (this.isActive = !1)
    }
    start() {
      return this.isActive || this.activate(), this.loadNextTracks()
    }
    checkLoadMore() {
      if (!(this.queue.isEmpty || this.queue.nextPlayableItemIndex >= 0)) return this.loadNextTracks()
    }
    loadNextTracks() {
      var e, s, n
      return __awaiter$4(this, void 0, void 0, function* () {
        let d = []
        const { apiManager: h } = this
        if ((null == h ? void 0 : h.api) instanceof MediaAPIV3) {
          const s = yield h.api.music('v1/me/stations/next-tracks/' + this.station.id, void 0, {
            fetchOptions: { method: 'POST' },
          })
          d = null === (e = null == s ? void 0 : s.data) || void 0 === e ? void 0 : e.data
        } else d = null !== (n = yield null === (s = h.mediaAPI) || void 0 === s ? void 0 : s.nextStationTracks(this.station.id)) && void 0 !== n ? n : []
        if (0 === d.length)
          throw (
            (this.logger.warn('No track data is available for the current station', { stationId: this.station.id }),
            new MKError(MKError.CONTENT_UNAVAILABLE, 'No track data is available for the current station.'))
          )
        const p = descriptorToMediaItems({ context: this.context, loaded: d, container: this.station })
        this.queue.splice(this.queue.length, 0, p)
      })
    }
  }
  var no
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', []),
      __metadata$2('design:returntype', void 0),
    ],
    StationTrackLoader.prototype,
    'checkLoadMore',
    null
  ),
    (function (e) {
      ;(e.artist = 'artist'), (e.song = 'song'), (e.station = 'station'), (e.radioStation = 'radioStation')
    })(no || (no = {}))
  const isIdentityQueue = (e) => e && void 0 !== e.identity,
    { queueIsReady: ao } = or
  class ContinuousPlaybackController extends PlaybackController {
    constructor(e) {
      super(e), (this.type = Ja.continuous), (this._isLive = !1), (this._continuous = !0)
    }
    get continuous() {
      return !0
    }
    set continuous(e) {
      if (!0 !== e)
        throw new MKError(MKError.UNSUPPORTED_ERROR, 'Continuous playback cannot be disabled for station queues.')
    }
    get context() {
      return Object.assign({ featureName: et.STATION }, this._context)
    }
    get isLive() {
      return this._isLive
    }
    set isLive(e) {
      e !== this._isLive && ((this._isLive = e), this._dispatcher.publish(or.capabilitiesChanged))
    }
    changeToMediaItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        this.generateMethodNotAvailable('changeToMediaItem')
      })
    }
    hasCapabilities(e) {
      switch (e) {
        case on.PAUSE:
        case on.SKIP_NEXT:
          return !this.isLive
        case on.SKIP_PREVIOUS:
        case on.SKIP_TO_ITEM:
          return !1
        default:
          return super.hasCapabilities(e)
      }
    }
    pause(e) {
      const s = Object.create(null, { pause: { get: () => super.pause } })
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!this.isLive) return s.pause.call(this, e)
        this.generateMethodNotAvailable('pause')
      })
    }
    skipToPreviousItem() {
      return __awaiter$4(this, void 0, void 0, function* () {
        this.generateMethodNotAvailable('skipToPreviousItem')
      })
    }
    _dataForQueueOptions(e) {
      const s = Object.create(null, { _dataForQueueOptions: { get: () => super._dataForQueueOptions } })
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = yield s._dataForQueueOptions.call(this, e)
        return this.isLive && (n.loaded = this.station), n
      })
    }
    returnQueueForOptions(e) {
      var s
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = isIdentityQueue(e)
          ? yield this.loadStationByIdentity(e.identity)
          : yield this.loadStationByStationId(this.generateStationId(e))
        if (void 0 === n) return Promise.reject(new MKError(MKError.UNSUPPORTED_ERROR, 'Cannot load requested station'))
        ;(this.station = n),
          (this.isLive =
            isIdentityQueue(e) ||
            !!(null == n ? void 0 : n.isLive) ||
            !!(null === (s = null == n ? void 0 : n.attributes) || void 0 === s ? void 0 : s.isLive))
        const d = { services: { dispatcher: this._dispatcher }, descriptor: yield this._dataForQueueOptions(e) }
        return (
          (this.queue = new Queue(d)),
          this.isLive ||
            ((this.trackLoader = new StationTrackLoader(
              this.queue,
              n,
              { dispatcher: this._dispatcher, logger: en, apiManager: this._services.apiManager },
              this.context
            )),
            yield this.trackLoader.start()),
          (this._seekable = this.isLive
            ? new BaseSeekable(this._mediaItemPlayback)
            : new Seekable(this._dispatcher, this._mediaItemPlayback)),
          this._dispatcher.publish(ao, this.queue.items),
          this.queue
        )
      })
    }
    getNewSeeker() {
      return this.hasCapabilities(on.SEEK) ? super.getNewSeeker() : new UnsupportedSeeker()
    }
    skipToNextItem() {
      const e = Object.create(null, { skipToNextItem: { get: () => super.skipToNextItem } })
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!this.isLive) return e.skipToNextItem.call(this)
        this.generateMethodNotAvailable('skipToNextItem')
      })
    }
    generateMethodNotAvailable(e) {
      en.warn(e + ' is not supported for this type of playback')
    }
    generateStationId(e) {
      let s
      if (isQueueURLOption(e)) {
        const { contentId: n, kind: d, storefrontId: h } = formattedMediaURL(e.url)
        ;(e[d] = n), (nn.storefrontId = h), (s = d)
      }
      const n = e
      if (n.artist) return 'ra.' + n.artist
      if (n.song) return 'ra.' + n.song
      if (n.station) return n.station
      if (n.radioStation) return n.radioStation
      throw new MKError(
        MKError.UNSUPPORTED_ERROR,
        s
          ? s + ' is not a supported option. Use setQueue instead.'
          : 'Unsupported options specified for setStationQueue. You may want setQueue instead.'
      )
    }
    loadStationByIdentity(e) {
      var s, n, d
      return __awaiter$4(this, void 0, void 0, function* () {
        const { apiManager: h } = this._services
        if ((null == h ? void 0 : h.api) instanceof MediaAPIV3) {
          const d = yield h.api.music('v1/catalog/{{storefrontId}}/stations', { filter: { identity: e } })
          return null === (n = null === (s = null == d ? void 0 : d.data) || void 0 === s ? void 0 : s.data) ||
            void 0 === n
            ? void 0
            : n[0]
        }
        const p = yield null === (d = null == h ? void 0 : h.mediaAPI) || void 0 === d
          ? void 0
          : d.stations(void 0, { filter: { identity: e } })
        return p && p[0]
      })
    }
    loadStationByStationId(e) {
      var s, n, d
      return __awaiter$4(this, void 0, void 0, function* () {
        const { apiManager: h } = this._services
        if ((null == h ? void 0 : h.api) instanceof MediaAPIV3) {
          const d = yield h.api.music('v1/catalog/{{storefrontId}}/stations/' + e)
          return null === (n = null === (s = null == d ? void 0 : d.data) || void 0 === s ? void 0 : s.data) ||
            void 0 === n
            ? void 0
            : n[0]
        }
        return null === (d = null == h ? void 0 : h.mediaAPI) || void 0 === d ? void 0 : d.station(e)
      })
    }
    activate() {
      super.activate(), this.trackLoader && this.trackLoader.activate()
    }
    deactivate() {
      const e = Object.create(null, { deactivate: { get: () => super.deactivate } })
      return __awaiter$4(this, void 0, void 0, function* () {
        yield e.deactivate.call(this), this.trackLoader && this.trackLoader.deactivate()
      })
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Number]),
      __metadata$2('design:returntype', Boolean),
    ],
    ContinuousPlaybackController.prototype,
    'hasCapabilities',
    null
  )
  class PercentageWatcher {
    constructor(e, s, n) {
      ;(this.dispatcher = e), (this.callback = s), (this.percentage = n), (this.threshold = -1)
    }
    startMonitor() {
      this.dispatcher.unsubscribe(or.playbackDurationDidChange, this.updateThreshold),
        this.dispatcher.unsubscribe(or.playbackTimeDidChange, this.handleTimeChange),
        this.dispatcher.subscribe(or.playbackDurationDidChange, this.updateThreshold),
        this.dispatcher.subscribe(or.playbackTimeDidChange, this.handleTimeChange)
    }
    stopMonitor() {
      this.dispatcher.unsubscribe(or.playbackDurationDidChange, this.updateThreshold),
        this.dispatcher.unsubscribe(or.playbackTimeDidChange, this.handleTimeChange),
        (this.threshold = -1)
    }
    handleTimeChange(e, { currentPlaybackDuration: s, currentPlaybackTime: n }) {
      return __awaiter$4(this, void 0, void 0, function* () {
        this.threshold < 0 && this.updateThreshold(e, { duration: s }),
          n < this.threshold || (this.stopMonitor(), yield this.callback(n, this))
      })
    }
    updateThreshold(e, { duration: s }) {
      this.threshold = s * this.percentage
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object, Object]),
      __metadata$2('design:returntype', Promise),
    ],
    PercentageWatcher.prototype,
    'handleTimeChange',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', void 0),
      ],
      PercentageWatcher.prototype,
      'updateThreshold',
      null
    )
  class Preloader extends PlaybackMonitor {
    constructor(e) {
      super(e),
        (this.isGaplessEnabled = !1),
        (this.watchers = [new PercentageWatcher(this.dispatcher, this.handlePlaybackThreshold, 0.3)]),
        (this.isGaplessEnabled = sn.features['enable-gapless'])
    }
    handlePlaybackThreshold() {
      return __awaiter$4(this, void 0, void 0, function* () {
        const e = this.getNextPlayableItem()
        e && (yield this.playbackController.prepareToPlay(e, !0))
      })
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return !1
      if (!this.playbackController.hasAuthorization) return !1
      const e = this.getNextPlayableItem(),
        s = void 0 !== e
      return this.isGaplessEnabled ? s : s && !(null == e ? void 0 : e.isPreparedToPlay)
    }
    getNextPlayableItem() {
      return this.playbackController.queue.nextPlayableItem
    }
  }
  const recursiveRelationshipLoad = (e, s, n) =>
      __awaiter$4(void 0, void 0, void 0, function* () {
        const [d, h, p] = s,
          y = n.length
        if (y > 0 && y < p.limit + p.offset) return n
        const m = Object.assign({}, p)
        let g
        m.offset = y
        try {
          g = yield e(d, h, m)
        } catch (_t) {
          return n
        }
        return n.push(...g), g.length < m.limit ? n : recursiveRelationshipLoad(e, s, n)
      }),
    getNamedQueueOptions = (e, s) => {
      const n = [],
        d = e.namedQueueOptions
      for (const h in s) Object.keys(d).includes(h) && n.push([h, d[h]])
      return n
    },
    loadNamedQueueData = (e, s, n) =>
      __awaiter$4(void 0, void 0, void 0, function* () {
        const [d, h] = n,
          p = s[d],
          y = Array.isArray(p),
          m = y ? '' + p[0] : '' + p,
          g = yield e.getAPIForItem(m)
        if (g instanceof MediaAPIV3) {
          let e = d
            .replace(/([A-Z])/g, '-$1')
            .replace(/[-_\s]+/g, '-')
            .toLowerCase()
          e.endsWith('s') || (e += 's')
          const s = (v(m) ? 'v1/me/library/' : 'v1/catalog/{{storefrontId}}/') + e + (y ? '' : '/{{id}}'),
            n = {}
          y && (n.ids = p)
          const h = yield g.music(s, n, { urlParameters: { id: p } })
          return y ? h.data.data : h.data.data[0]
        }
        const _ = yield g[h.apiMethod](p, s.parameters)
        return (
          y ||
            (yield (function (e, s, n, d = {}) {
              return __awaiter$4(this, void 0, void 0, function* () {
                if (void 0 === s) return n
                void 0 === d.limit && (d.limit = 100), void 0 === d.offset && (d.offset = 0)
                const { relationship: h, method: p } = s,
                  y = e[p].bind(e)
                let m
                return (
                  isDataRecord(n)
                    ? (void 0 === n[h] && n.setProperty(h, [], 'relationships'), (m = n[h]))
                    : ((n.relationships = n.relationships || {}),
                      void 0 === n.relationships[h] &&
                        Object.defineProperty(n.relationships, h, { value: { data: [] }, enumerable: !0 }),
                      (m = n.relationships[h].data)),
                  yield recursiveRelationshipLoad(y, [n.id, h, d], m),
                  n
                )
              })
            })(g, h.relationshipMethod, _)),
          _
        )
      }),
    { queueIsReady: oo } = or
  var lo, co
  !(function (e) {
    ;(e.album = 'album'), (e.musicVideo = 'musicVideo'), (e.playlist = 'playlist'), (e.song = 'song')
  })(lo || (lo = {})),
    (function (e) {
      ;(e.albums = 'albums'), (e.musicVideos = 'musicVideos'), (e.playlists = 'playlists'), (e.songs = 'songs')
    })(co || (co = {}))
  class SerialPlaybackController extends PlaybackController {
    constructor(e) {
      super(e),
        (this.type = Ja.serial),
        (this._queue = new Queue(e)),
        (this._repeatable = new Repeatable(this._dispatcher))
      const s = { controller: this, services: e.services }
      ;(this._seekable = new Seekable(this._dispatcher, this._mediaItemPlayback)),
        (this._preloader = new Preloader(s)),
        (this._shuffler = new Shuffler(this, { dispatcher: this._dispatcher })),
        (this._queueModifier = new ModifiableQueue(this._queue, this._mediaItemPlayback))
    }
    get autoplayEnabled() {
      return this._autoplayEnabled
    }
    set autoplayEnabled(e) {
      var s
      this._autoplayEnabled = e
      const n = e ? 'start' : 'stop'
      null === (s = this._autoplayTrackLoader) || void 0 === s || s[n]()
    }
    activate() {
      super.activate(), this._preloader.activate(), this._dispatcher.subscribe(Ys, this.onGaplessTransition)
    }
    deactivate() {
      const e = Object.create(null, { deactivate: { get: () => super.deactivate } })
      return __awaiter$4(this, void 0, void 0, function* () {
        yield e.deactivate.call(this),
          this._preloader.deactivate(),
          this._dispatcher.unsubscribe(Ys, this.onGaplessTransition)
      })
    }
    onGaplessTransition(s, n) {
      en.debug('controller handling gapless transition, PAF stop', n),
        this._dispatcher.publish(Ze.playbackStop, {
          endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
          position: n.previous.playbackDuration / 1e3,
          isPlaying: !1,
        }),
        asAsync(this._next(!1, !0))
    }
    hasCapabilities(e) {
      return e === on.SKIP_PREVIOUS || super.hasCapabilities(e)
    }
    prepareToPlay(s, n = !1) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if ((en.debug('mk: SerialController - prepareToPlay - ', { item: s, preload: n }), s.isPlayable))
          return this._mediaItemPlayback.prepareToPlay(s).catch((s) => {
            const d = !n && -1 === [MKError.DEVICE_LIMIT, MKError.STREAM_UPSELL].indexOf(s.errorCode)
            if (this.continuous && d)
              return (
                this._dispatcher.publish(Ze.applicationActivityIntent, {
                  endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
                  userInitiated: !1,
                }),
                this._next()
              )
            throw s
          })
      })
    }
    returnQueueForOptions(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        void 0 !== (e = parseQueueURLOption(e)).startPosition &&
          (logDeprecation('startPosition', { message: 'startPosition has been deprecated in favor of startWith' }),
          void 0 === e.startWith && (e.startWith = e.startPosition))
        const s = yield this._dataForQueueOptions(e),
          n = { services: { dispatcher: this._dispatcher, mediaItemPlayback: this._mediaItemPlayback }, descriptor: s }
        if (
          (void 0 !== e.shuffleMode && (this.shuffleMode = e.shuffleMode),
          (this.queue = new Queue(n)),
          'number' == typeof e.startTime)
        ) {
          const s = this.queue.nextPlayableItem
          s && this._mediaItemPlayback.playOptions.set(s.id, { startTime: e.startTime })
        }
        if (0 === this.queue.length)
          throw (
            (en.warn('No item data is available for the current media queue', e),
            new MKError(MKError.CONTENT_UNAVAILABLE, 'No item data is available for the current media queue.'))
          )
        return (
          this._autoplayTrackLoader && this._autoplayTrackLoader.deactivate(),
          (this._autoplayTrackLoader = new AutoplayTrackLoader(
            this.queue,
            this._repeatable,
            { dispatcher: this._dispatcher, logger: en, apiManager: this._services.apiManager },
            this._context
          )),
          this.autoplayEnabled && this._autoplayTrackLoader.start(),
          this._dispatcher.publish(oo, this.queue.items),
          this.queue
        )
      })
    }
    skipToPreviousItem() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._previous(!0)
      })
    }
    _dataForQueueOptions(e) {
      const s = Object.create(null, { _dataForQueueOptions: { get: () => super._dataForQueueOptions } })
      return __awaiter$4(this, void 0, void 0, function* () {
        const n = e,
          d = ((e, s) => {
            const n = getNamedQueueOptions(e, s)
            if (n.length > 1)
              throw new MKError(MKError.UNSUPPORTED_ERROR, 'Queues with multiple media types are not supported.')
            if (0 === n.length) return
            const [d] = n,
              [h, p] = d
            if (Array.isArray(s[h]) !== p.isPlural)
              throw new MKError(
                MKError.UNSUPPORTED_ERROR,
                p.isPlural
                  ? `Queue option ${h} must be an array of id values`
                  : `Queue option ${h} must be a single id value`
              )
            return d
          })(this._services.apiManager.apiService, e)
        return (
          void 0 === d || (n.loaded = yield loadNamedQueueData(this._services.apiManager.apiService, e, d)),
          Object.assign(Object.assign({}, yield s._dataForQueueOptions.call(this, e)), n)
        )
      })
    }
    _next(s = !1, n = !1) {
      const d = Object.create(null, { _next: { get: () => super._next } })
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!this.queue.isEmpty && this.repeatMode === e.PlayerRepeatMode.one) {
          const e = yield this._changeToMediaAtIndex(this.nowPlayingItemIndex, s)
          return (
            e && this._dispatcher.publish(Ze.playbackPlay, { item: e, userInitiated: s, position: 0 }),
            this.nowPlayingItem
          )
        }
        return d._next.call(this, s, n)
      })
    }
    _previous(s = !1) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this.queue.isEmpty) return
        const n = this.queue
        if (-1 === n.previousPlayableItemIndex) return
        const d = this.isPlaying,
          h = this._mediaItemPlayback.currentPlaybackTime,
          p = yield this._changeToMediaAtIndex(n.previousPlayableItemIndex, s)
        return (
          this._notifySkip(d, p, !1, {
            userInitiated: s,
            direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
            position: h,
          }),
          p
        )
      })
    }
    _prepareQueue(e) {
      super._prepareQueue(e), this._shuffler.checkAndReshuffle()
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object, Object]),
      __metadata$2('design:returntype', void 0),
    ],
    SerialPlaybackController.prototype,
    'onGaplessTransition',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Number]),
        __metadata$2('design:returntype', Boolean),
      ],
      SerialPlaybackController.prototype,
      'hasCapabilities',
      null
    )
  class MKDialog {
    constructor(e, s = '') {
      ;(this._message = e),
        (this._explanation = s),
        (this.id = 'musickit-dialog'),
        (this.scrimId = this.id + '-scrim'),
        (this.styleId = this.id + '-style'),
        (this._okButtonString = 'OK'),
        [this.id, this.scrimId, this.styleId].forEach((e) => {
          try {
            const s = document.getElementById(e)
            s.parentElement.removeChild(s)
          } catch (tn) {}
        }),
        this._appendStyle(
          '\n#musickit-dialog {\n  --mk-dialog-background: rgba(255, 255, 255, 1);\n  --mk-dialog-text: rgba(0, 0, 0, 0.95);\n  --mk-dialog-border: rgba(0, 0, 0, 0.07);\n  --mk-dialog-scrim: rgba(255, 255, 255, 0.8);\n  --mk-dialog-primary: rgba(0, 122, 255, 1);\n}\n\n@media (prefers-color-scheme: dark) {\n  #musickit-dialog {\n      --mk-dialog-background: rgba(30, 30, 30, 1);\n      --mk-dialog-text: rgba(255, 255, 255, 0.85);\n      --mk-dialog-border: rgba(255, 255, 255, 0.1);\n      --mk-dialog-scrim: rgba(38, 38, 38, 0.8);\n      --mk-dialog-primary: rgba(8, 132, 255, 1);\n  }\n}\n\n#musickit-dialog-scrim {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.35);\n}\n\n#musickit-dialog * {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -ms-touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, sans-serif;\n  font-size: 15px;\n  line-height: 20px;\n}\n\n#musickit-dialog *:focus { outline: 0; }\n\n#musickit-dialog {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  flex-direction: column;\n  -webkit-justify-content: space-between;\n  -moz-justify-content: space-between;\n  justify-content: space-between;\n  min-width: 277px;\n  max-width: 290px;\n  min-height: 109px;\n  background: var(--mk-dialog-background);\n  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.18);\n  border-radius: 10px;\n  color: var(--mk-dialog-text);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  margin-left: -142px;\n  margin-top: -67px;\n  z-index: 9999999999999999999999999;\n}\n\n#musickit-dialog #mk-dialog-body {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  flex-direction: column;\n  flex-grow: 1;\n  -webkit-justify-content: space-evenly;\n  -moz-justify-content: space-evenly;\n  justify-content: space-evenly;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  padding: 10px 20px;\n  min-height: 74px;\n  text-align: center;\n}\n\n#musickit-dialog .mk-dialog h5 {\n  font-weight: 500;\n  line-height: 20px;\n  margin: 7px 0 0 0;\n  padding: 0;\n}\n\n#musickit-dialog .mk-dialog p {\n  margin: 0 0 7px 0;\n  padding: 0;\n  paddin-top: 3px;\n  line-height: 18px;\n  font-size: 13px;\n  font-weight: 300;\n}\n\n#musickit-dialog #mk-dialog-actions {\n  border-top: 1px solid var(--mk-dialog-border);\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n  -moz-flex-direction: colrowumn;\n  flex-direction: row;\n  max-height: 41px;\n  min-height: 34px;\n  -webkit-justify-self: flex-end;\n  -moz-justify-self: flex-end;\n  justify-self: flex-end;\n}\n\n#musickit-dialog #mk-dialog-actions button {\n  flex-grow: 1;\n  border: 0;\n  background: none;\n  color: var(--mk-dialog-primary);\n  padding: 0;\n  margin: 0;\n  min-height: 34px;\n  height: 41px;\n  text-align: center;\n}\n\n#musickit-dialog #mk-dialog-actions *:nth-child(2) {\n  border-left: 1px solid var(--mk-dialog-border);\n  font-weight: 500;\n}\n'
        )
    }
    static presentError(e) {
      const s = e.dialog
      void 0 !== s ? MKDialog.serverDialog(s).present() : new MKDialog(e.message).present()
    }
    static serverDialog(e) {
      const s = new this(e.message, e.explanation)
      return (
        e.okButtonAction && e.okButtonAction.url && (s._okButtonActionURL = e.okButtonAction.url),
        e.okButtonString && (s._okButtonString = e.okButtonString),
        e.cancelButtonString && (s._cancelButtonString = e.cancelButtonString),
        s
      )
    }
    static clientDialog(e) {
      const s = new this(e.message, e.explanation)
      return (
        e.okButtonAction && (s._okButtonAction = e.okButtonAction),
        e.cancelButtonAction && (s._cancelButtonAction = e.cancelButtonAction),
        e.okButtonString && (s._okButtonString = e.okButtonString),
        e.cancelButtonString && (s._cancelButtonString = e.cancelButtonString),
        s
      )
    }
    get actions() {
      return this.cancelButton
        ? `<div id="mk-dialog-actions">${this.cancelButton}${this.okButton}</div>`
        : `<div id="mk-dialog-actions">${this.okButton}</div>`
    }
    get cancelButton() {
      if ('string' == typeof this._cancelButtonString)
        return `<button type="button">${this._cancelButtonString}</button>`
    }
    set cancelButton(e) {
      this._cancelButtonString = e
    }
    get explanation() {
      return `<p id="mk-dialog-explanation">${this._explanation}</p>`
    }
    get hasOKButtonAction() {
      return !!this._okButtonActionURL || !!this._okButtonAction
    }
    get message() {
      return `<h5 id="mk-dialog-title">${this._message}</h5>`
    }
    get okButton() {
      return this.hasOKButtonAction && this._okButtonActionURL
        ? `<button type="button" data-ok-action-url='${this._okButtonActionURL}'>${this._okButtonString}</button>`
        : `<button type="button">${this._okButtonString}</button>`
    }
    present() {
      const e = document.createDocumentFragment(),
        s = document.createElement('div')
      ;(s.id = this.scrimId), e.appendChild(s)
      const n = document.createElement('div')
      ;(n.id = this.id),
        n.classList.add('mk-dialog'),
        n.setAttribute('role', 'alertDialog'),
        n.setAttribute('aria-modal', 'true'),
        n.setAttribute('aria-labeledby', 'mk-dialog-title'),
        n.setAttribute('aria-describedby', 'mk-dialog-explanation')
      let d = `\n      <div id="mk-dialog-body">\n        ${this.message}\n        ${this.explanation}\n      </div>`
      ;(d = `\n      ${d}\n      ${this.actions}\n    `),
        (n.innerHTML = d),
        e.appendChild(n),
        document.body.appendChild(e),
        document.querySelector(`#${n.id} #mk-dialog-actions *:first-child`).focus(),
        setTimeout(() => {
          document.querySelector(`#${n.id} #mk-dialog-actions *:first-child`).addEventListener('click', () => {
            this._cancelButtonAction && this._cancelButtonAction(),
              n.parentElement.removeChild(n),
              s.parentElement.removeChild(s)
          }),
            this.hasOKButtonAction &&
              (this._okButtonActionURL
                ? document.querySelector(`#${n.id} #mk-dialog-actions *:last-child`).addEventListener('click', (e) => {
                    window.open(e.target.dataset.okActionUrl, '_blank'),
                      n.parentElement.removeChild(n),
                      s.parentElement.removeChild(s)
                  })
                : this._okButtonAction &&
                  document.querySelector(`#${n.id} #mk-dialog-actions *:last-child`).addEventListener('click', (e) => {
                    this._okButtonAction(), n.parentElement.removeChild(n), s.parentElement.removeChild(s)
                  }))
        })
    }
    _appendStyle(e) {
      const s = document.createElement('style')
      ;(s.id = this.styleId),
        s.styleSheet ? (s.styleSheet.cssText = e) : (s.innerHTML = e),
        document.body.appendChild(s)
    }
  }
  function getPlayerType(e) {
    var s, n
    switch (null == e ? void 0 : e.type) {
      case 'contributors':
      case 'modalities':
      case 'movie':
      case 'musicVideo':
      case 'musicMovie':
      case 'trailer':
      case 'tvEpisode':
      case 'uploadedVideo':
      case 'uploaded-videos':
      case 'music-videos':
      case 'music-movies':
      case 'tv-episodes':
      case 'workouts':
        return 'video'
      case 'podcast-episodes':
        return 'audio'
      default:
        return null !== (n = null === (s = null == e ? void 0 : e.attributes) || void 0 === s ? void 0 : s.mediaKind) &&
          void 0 !== n
          ? n
          : 'audio'
    }
  }
  const { audioTracksSwitched: uo, audioTracksUpdated: ho, textTracksSwitched: po, textTracksUpdated: yo } = Wr
  class HlsJsTracks extends Notifications {
    constructor(e) {
      super([uo, ho, po, yo]),
        (this.session = e),
        (this._audioTracks = []),
        (this._textTracks = []),
        this.session.on(window.Hls.Events.MANIFEST_LOADED, this.handleManifestLoaded.bind(this)),
        this.session.on(window.Hls.Events.AUDIO_TRACK_SWITCHED, this.handleAudioTrackSwitched.bind(this)),
        this.session.on(window.Hls.Events.SUBTITLE_TRACK_SWITCH, this.handleSubtitleTrackSwitch.bind(this))
    }
    get audioTracks() {
      return this._audioTracks
    }
    get textTracks() {
      return this._textTracks
    }
    set audioTrack(e) {
      this.session && e && e.id && (this.session.audioSelectedPersistentID = e.id)
    }
    set textTrack(e) {
      var s
      this.session.subtitleSelectedPersistentID = null !== (s = null == e ? void 0 : e.id) && void 0 !== s ? s : -1
    }
    selectForcedTrack() {
      const { session: e } = this
      if (!(null == e ? void 0 : e.audioTracks)) return
      const s = this.session.audioTracks.filter((s) => s.id === e.audioTrack),
        n = s && s.length && s[0]
      if (!n) return
      const d = e.subtitleMediaOptions.filter(
          (e) =>
            0 === e.MediaSelectionOptionsDisplaysNonForcedSubtitles &&
            e.MediaSelectionOptionsExtendedLanguageTag === n.lang
        ),
        h = null == d ? void 0 : d[0]
      let p
      return (
        h
          ? (w.debug('hlsjsTracks: found forced track for ' + h.MediaSelectionOptionsExtendedLanguageTag),
            (e.subtitleSelectedPersistentID = h.MediaSelectionOptionsPersistentID),
            (p = this.normalizeTextTrack(h)))
          : (e.subtitleSelectedPersistentID = -1),
        p
      )
    }
    audioTracksUpdated(e, s) {
      const n = (s && s.audioMediaSelectionGroup && s.audioMediaSelectionGroup.MediaSelectionGroupOptions) || []
      window.hlsSession = this.session
      const d = n.map(this.normalizeAudioTrack, this)
      ;(this._audioTracks = d), this.dispatchEvent(ho, d)
    }
    handleAudioTrackSwitched() {
      this.dispatchEvent(uo, { selectedId: this.session.audioSelectedPersistentID })
    }
    handleManifestLoaded(e, s) {
      this.audioTracksUpdated(e, s), this.subtitleTracksUpdated(e, s)
    }
    handleSubtitleTrackSwitch(e, s) {
      this.dispatchEvent(po, s)
    }
    subtitleTracksUpdated(e, s) {
      const n = (s && s.subtitleMediaSelectionGroup && s.subtitleMediaSelectionGroup.MediaSelectionGroupOptions) || [],
        d = Array()
      n.forEach((e) => {
        0 !== e.MediaSelectionOptionsDisplaysNonForcedSubtitles && d.push(this.normalizeTextTrack(e))
      }),
        (this._textTracks = d),
        this.dispatchEvent(yo, d)
    }
    normalizeAudioTrack(e) {
      var s
      const n =
        'public.accessibility.describes-video' ===
        (null === (s = e.MediaSelectionOptionsTaggedMediaCharacteristics) || void 0 === s ? void 0 : s[0])
          ? 'description'
          : 'main'
      return Object.assign(Object.assign({}, this.normalizeSelectionOption(e)), { enabled: !1, kind: n })
    }
    normalizeTextTrack(e) {
      var s
      let n
      return (
        (n =
          (null === (s = e.MediaSelectionOptionsTaggedMediaCharacteristics) || void 0 === s
            ? void 0
            : s.includes('public.accessibility.describes-music-and-sound')) ||
          'clcp' === e.MediaSelectionOptionsMediaType
            ? 'captions'
            : 'subtitles'),
        Object.assign(Object.assign({}, this.normalizeSelectionOption(e)), { mode: 'disabled', kind: n })
      )
    }
    normalizeSelectionOption(e) {
      return {
        id: e.MediaSelectionOptionsPersistentID,
        label: e.MediaSelectionOptionsName,
        language: e.MediaSelectionOptionsExtendedLanguageTag,
      }
    }
  }
  const mo = { keySystemGenericError: 'keySystemGenericError' },
    go = {}
  ;(go[Ps.FAIRPLAY] = 'fairplaystreaming'), (go[Ps.PLAYREADY] = 'playready'), (go[Ps.WIDEVINE] = 'widevine')
  let fo = !1
  'undefined' != typeof localStorage && (fo = !!localStorage.getItem('mk-hlsjs-debug')),
    fo || (window.globalHlsLogConfig = fo)
  class HlsJsVideoPlayer extends VideoPlayer {
    constructor(e) {
      var s
      super(e),
        (this._channelsByGroup = {}),
        (this._rtcTracker =
          null === (s = null == e ? void 0 : e.playbackServices) || void 0 === s ? void 0 : s.getRTCStreamingTracker()),
        (this._license = new License())
    }
    get shouldDispatchErrors() {
      return !this.userInitiated || this._playbackDidStart
    }
    initializeExtension() {
      return __awaiter$4(this, void 0, void 0, function* () {
        this._keySystem = yield findKeySystemPreference()
        try {
          if (!Hr.urls.hls) throw new Error('bag.urls.hls is not configured')
          yield loadScript(Hr.urls.hls)
        } catch (_t) {
          throw (w.error('hlsjs-video-player failed to load script ' + Hr.urls.hls, _t), _t)
        }
      })
    }
    destroy() {
      w.debug('hlsjs-video-player.destroy')
      const { _hls: e } = this
      e && (e.stopLoad(), e.detachMedia(), e.destroy()), super.destroy(), asAsync(this._license.stop())
    }
    playHlsStream(e, s) {
      w.debug('hlsjs-video-player.playHlsStream', e, s)
      const { _keySystem: n } = this
      if (!n) return
      let d, h
      this.createHlsPlayer(),
        n === Ps.WIDEVINE &&
          ((d = 'WIDEVINE_SOFTWARE'),
          (h = { initDataTypes: ['cenc', 'keyids'], distinctiveIdentifier: 'optional', persistentState: 'required' }))
      const p = {
          platformInfo: { requiresCDMAttachOnStart: !0, maxSecurityLevel: d, keySystemConfig: h },
          appData: { serviceName: Hr.app.name },
        },
        { _rtcTracker: y, _hls: m } = this
      if (y) {
        const e = y.prepareReportingAgent(s)
        void 0 !== e && (p.appData.reportingAgent = e)
      }
      w.debug('RTC: loadSource with load options', p),
        m.loadSource(e, p),
        m.attachMedia(this.video),
        s &&
          ((this._licenseServerUrl = s.keyURLs['hls-key-server-url']),
          n === Ps.FAIRPLAY
            ? m.setProtectionData({ fairplaystreaming: { serverCertUrl: s.keyURLs['hls-key-cert-url'] } })
            : m.setProtectionData({ widevine: { serverCertUrl: s.keyURLs['widevine-cert-url'] } }))
    }
    createHlsPlayer() {
      const { _keySystem: e } = this,
        { Hls: s } = window,
        n = {
          clearMediaKeysOnPromise: !1,
          customTextTrackCueRenderer: !0,
          debug: fo,
          enablePerformanceLogging: fo,
          enablePlayReadyKeySystem: !0,
          enableRtcReporting: void 0 !== this._rtcTracker,
          keySystemPreference: go[e],
          useMediaKeySystemAccessFilter: !0,
        }
      ;((e) => {
        const { Hls: s } = window,
          n = localStorage.getItem('mk-block-report-cdn-server')
        if (s && !!n) {
          const n = Object.assign({}, s.DefaultConfig.fragLoadPolicy)
          ;(n.default = Object.assign({}, s.DefaultConfig.fragLoadPolicy.default)),
            (n.customURL = Object.assign({}, s.DefaultConfig.fragLoadPolicy.customURL)),
            (n.default.reportCDNServer = !1),
            (n.customURL.reportCDNServer = !1),
            (e.fragLoadPolicy = n)
        }
      })(n)
      const d = new s(n),
        {
          ERROR: h,
          INTERNAL_ERROR: p,
          MANIFEST_PARSED: y,
          KEY_REQUEST_STARTED: m,
          LICENSE_CHALLENGE_CREATED: g,
          LEVEL_SWITCHED: v,
        } = s.Events
      d.on(h, this.handleHlsError),
        d.on(p, this.handleHlsError),
        d.on(y, this.handleManifestParsed),
        d.on(m, this.handleKeyRequestStarted),
        d.on(g, this.handleLicenseChallengeCreated),
        d.on(v, this.handleLevelSwitched),
        (this._hls = d),
        this.setupTrackManagers(new HlsJsTracks(d))
    }
    handleLevelSwitched(e, s) {
      var n, d
      const { level: h } = s
      if (!h) return
      const p = null === (n = this._levels) || void 0 === n ? void 0 : n.find((e) => e.persistentId === h)
      if (
        !p ||
        (null === (d = this._currentLevel) || void 0 === d ? void 0 : d.persistentId) ===
          (null == p ? void 0 : p.persistentId)
      )
        return
      this._currentLevel = p
      const y = void 0 !== p.audioGroupId ? this._channelsByGroup[p.audioGroupId] : void 0
      this._dispatcher.publish(Ze.hlsLevelUpdated, { level: p, channels: y })
    }
    handleHlsError(e, s) {
      w.warn('HLS.js error', s)
      let n = new MKError(MKError.UNSUPPORTED_ERROR, s.reason)
      n.data = s
      const { keySystemGenericError: d } = mo
      if (s.details !== d) {
        if (('output-restricted' === s.reason && (n = new MKError(MKError.OUTPUT_RESTRICTED, s.reason)), s.fatal)) {
          if ((this._hls.destroy(), !this.shouldDispatchErrors)) throw n
          this._dispatcher.publish(ar.mediaPlaybackError, n)
        }
      } else this._dispatcher.publish(d, n)
    }
    handleManifestParsed(e, s) {
      var n, d
      ;(this._levels = null !== (n = s.levels) && void 0 !== n ? n : []),
        (this.nowPlayingItem.state = C.ready),
        (this._channelsByGroup = (null !== (d = s.audioTracks) && void 0 !== d ? d : []).reduce(
          (e, s) => ((e[s.groupId] = s.channels), e),
          {}
        )),
        asAsync(this._playMedia())
    }
    handleKeyRequestStarted(e, s) {
      w.debug('hlsjs-video.handleKeyRequestStarted'), this._hls.generateKeyRequest(s.keyuri, {})
    }
    handleLicenseChallengeCreated(e, s) {
      var n
      return __awaiter$4(this, void 0, void 0, function* () {
        const { _licenseServerUrl: e, nowPlayingItem: d, _keySystem: h, userInitiated: p } = this
        try {
          const y = yield null === (n = this._license) || void 0 === n ? void 0 : n.start(e, d, s, h, p),
            m = { statusCode: y.status }
          ;(null == y ? void 0 : y.license) &&
            (h === Ps.FAIRPLAY ? (m.ckc = Ye(y.license)) : (m.license = Ye(y.license)))
          const g = y['renew-after']
          g && (m.renewalDate = new Date(Date.now() + 1e3 * g)), this._hls.setLicenseResponse(s.keyuri, m)
        } catch (_t) {
          const n = shouldThrowLicenseError(_t, p),
            d = _t.data,
            h = {}
          if (
            (void 0 !== (null == d ? void 0 : d.status) && (h.statusCode = +d.status),
            w.warn('Passing license response error to Hls.js', h),
            this._hls.setLicenseResponse(s.keyuri, h),
            n)
          )
            throw _t
          this.onPlaybackLicenseError(_t)
        }
      })
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object, Object]),
      __metadata$2('design:returntype', void 0),
    ],
    HlsJsVideoPlayer.prototype,
    'handleLevelSwitched',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', void 0),
      ],
      HlsJsVideoPlayer.prototype,
      'handleHlsError',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', void 0),
      ],
      HlsJsVideoPlayer.prototype,
      'handleManifestParsed',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', void 0),
      ],
      HlsJsVideoPlayer.prototype,
      'handleKeyRequestStarted',
      null
    ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', Promise),
      ],
      HlsJsVideoPlayer.prototype,
      'handleLicenseChallengeCreated',
      null
    )
  const { mediaPlaybackError: vo } = ar,
    { playbackLicenseError: _o, playbackSessionError: bo } = Wr
  class NativeSafariVideoPlayer extends VideoPlayer {
    initializeExtension() {
      return __awaiter$4(this, void 0, void 0, function* () {
        const e = new MediaExtension(this.video, 'video/mp4;codecs="avc1.42E01E"')
        ;(this.extension = e),
          yield e.initializeKeySystem(),
          e.addEventListener(_o, this.onPlaybackLicenseError),
          e.addEventListener(bo, this.onPlaybackSessionError)
      })
    }
    destroy() {
      w.debug('native-safari-video-player.destroy')
      const { extension: e } = this
      e &&
        (e.removeEventListener(_o, this.onPlaybackLicenseError),
        e.removeEventListener(bo, this.onPlaybackSessionError),
        this.video.removeEventListener('loadedmetadata', this.onMetadataLoaded),
        super.destroy())
    }
    playHlsStream(e) {
      var s
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('native-safari-video-player.playHlsStream', e), this.setupTrackManagers(), (this.video.src = e)
        const { nowPlayingItem: n } = this
        n && (null === (s = this.extension) || void 0 === s || s.setMediaItem(n)),
          this.video.addEventListener('loadedmetadata', this.onMetadataLoaded)
      })
    }
    onPlaybackSessionError(e) {
      this._dispatcher.publish(vo, new MKError(MKError.MEDIA_SESSION, e))
    }
    onMetadataLoaded() {
      w.debug('native-safari-video-player.onMetadataLoaded')
      const { nowPlayingItem: e } = this
      e && (e.state = C.ready), asAsync(this._playMedia())
    }
  }
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object]),
      __metadata$2('design:returntype', void 0),
    ],
    NativeSafariVideoPlayer.prototype,
    'onPlaybackSessionError',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', void 0),
      ],
      NativeSafariVideoPlayer.prototype,
      'onMetadataLoaded',
      null
    )
  class Factory {
    constructor(e) {
      ;(this._playersByType = {}), (this._playerOptions = e)
    }
    getPlayerForMediaItem(e, s, n) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('mk: getPlayerForMediaItem', e, s)
        const d = getPlayerType(e)
        let h = this._playersByType[d]
        if (
          ((null == h ? void 0 : h.isDestroyed) &&
            (w.debug('mk: existingPlayer was previously destroyed. Removing from factory.'),
            (h = void 0),
            delete this._playersByType[d]),
          h && h === n)
        )
          return n
        if (h) return this._applyPlayerState(h, s), h
        const { _playerOptions: p } = this
        let y
        switch (d) {
          case 'audio':
            ;(y = new AudioPlayer(p)), (this._playersByType[d] = y)
            break
          case 'video':
            y = (yield this._playerOptions.playbackServices.requiresHlsJs())
              ? new HlsJsVideoPlayer(p)
              : new NativeSafariVideoPlayer(p)
            break
          default:
            throw new Error('Invalid player type requested: ' + d)
        }
        return yield y.initialize(), this._applyPlayerState(y, s), y
      })
    }
    _applyPlayerState(e, s) {
      return s
        ? (w.debug('_applyPlayerState', s),
          Object.keys(s).forEach((n) => {
            void 0 !== e[n] && (e[n] = s[n])
          }),
          e)
        : e
    }
    destroy() {
      Object.values(this._playersByType).forEach((e) => e.destroy())
    }
  }
  const { mediaPlaybackError: To, playerTypeDidChange: Eo } = ar,
    { playbackLicenseError: So } = Wr,
    { keySystemGenericError: ko } = mo
  let Po = !1
  class MediaItemPlayback {
    constructor(e) {
      ;(this.playerState = { playbackRate: 1, volume: 1 }), (this.playOptions = new Map()), (this._previewOnly = !1)
      const { playbackServices: s } = e
      var n, d
      ;(this.hasMusicSubscription = s.hasMusicSubscription),
        (this.playMediaItem = s.playMediaItem),
        (this.prepareForEncryptedPlayback = s.prepareForEncryptedPlayback),
        (n = e.tokens),
        (Cs = n),
        e.bag && ((d = e.bag), Object.assign(Hr, d)),
        (this._dispatcher = e.services.dispatcher),
        (this._playerFactory = new Factory(e)),
        (this._currentPlayer = new PlayerStub(e)),
        this._dispatcher.subscribe(So, this.onPlaybackLicenseError),
        this._dispatcher.subscribe(ko, this.onKeySystemGenericError)
    }
    get currentPlaybackTime() {
      return this._currentPlayer.currentPlaybackTime
    }
    get currentPlaybackTimeRemaining() {
      return this._currentPlayer.currentPlaybackTimeRemaining
    }
    get audioTracks() {
      return this._currentPlayer.audioTracks
    }
    get currentAudioTrack() {
      return this._currentPlayer.currentAudioTrack
    }
    set currentAudioTrack(e) {
      this._currentPlayer.currentAudioTrack = e
    }
    get currentPlaybackDuration() {
      return this._currentPlayer.currentPlaybackDuration
    }
    get currentBufferedProgress() {
      return this._currentPlayer.currentBufferedProgress
    }
    set currentBufferedProgress(e) {
      this._currentPlayer.currentBufferedProgress = e
    }
    get currentPlaybackProgress() {
      return this._currentPlayer.currentPlaybackProgress
    }
    set currentPlaybackProgress(e) {
      this._currentPlayer.currentPlaybackProgress = e
    }
    get currentTextTrack() {
      return this._currentPlayer.currentTextTrack
    }
    set currentTextTrack(e) {
      this._currentPlayer.currentTextTrack = e
    }
    get previewOnly() {
      return this._previewOnly
    }
    set previewOnly(e) {
      ;(this._previewOnly = e), this._currentPlayer && (this._currentPlayer.previewOnly = e)
    }
    get formattedCurrentPlaybackDuration() {
      return this._currentPlayer.formattedCurrentPlaybackDuration
    }
    get isPlaying() {
      return this._currentPlayer.isPlaying
    }
    get isPrimaryPlayer() {
      return this._currentPlayer.isPrimaryPlayer
    }
    set isPrimaryPlayer(e) {
      this._currentPlayer.isPrimaryPlayer = e
    }
    get isReady() {
      return this._currentPlayer.isReady
    }
    get nowPlayingItem() {
      return this._currentPlayer.nowPlayingItem
    }
    get playbackRate() {
      return this._currentPlayer.playbackRate
    }
    set playbackRate(e) {
      this._updatePlayerState('playbackRate', e)
    }
    get playbackState() {
      return this._currentPlayer.playbackState
    }
    set playbackState(e) {
      this._currentPlayer.playbackState = e
    }
    get playbackTargetAvailable() {
      return this._currentPlayer.playbackTargetAvailable
    }
    get playbackTargetIsWireless() {
      return this._currentPlayer.playbackTargetIsWireless
    }
    get textTracks() {
      return this._currentPlayer.textTracks
    }
    get volume() {
      return this._currentPlayer.volume
    }
    set volume(e) {
      this._updatePlayerState('volume', e)
    }
    clearNextManifest() {
      this._currentPlayer.clearNextManifest()
    }
    destroy() {
      var e, s
      this._playerFactory.destroy(),
        null === (e = this._dispatcher) || void 0 === e || e.unsubscribe(So, this.onPlaybackLicenseError),
        null === (s = this._dispatcher) || void 0 === s || s.unsubscribe(ko, this.onKeySystemGenericError)
    }
    exitFullscreen() {
      return this._currentPlayer.exitFullscreen()
    }
    getNewSeeker() {
      return this._currentPlayer.newSeeker()
    }
    mute() {
      ;(this._volumeAtMute = this.volume), (this.volume = 0)
    }
    pause(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._currentPlayer.pause(e)
      })
    }
    play() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._currentPlayer.play()
      })
    }
    preload() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._currentPlayer.preload()
      })
    }
    prepareToPlay(e) {
      var s
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('invoking prepareToPlay for ', e.title)
        const n = yield this.prepareForEncryptedPlayback(e, this._currentPlayer),
          d = null === (s = this._currentPlayback) || void 0 === s ? void 0 : s.item,
          h = Hr.features['enable-gapless'],
          p = 'song' === (null == d ? void 0 : d.type) && 'song' === e.type
        return (
          h &&
            p &&
            (w.debug(`setting ${e.title} for gapless transition`), yield this._currentPlayer.setNextGaplessItem(e)),
          n
        )
      })
    }
    requestFullscreen(e) {
      return this._currentPlayer.requestFullscreen(e)
    }
    showPlaybackTargetPicker() {
      this._currentPlayer.showPlaybackTargetPicker()
    }
    seekToTime(e, s = rt.Manual) {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this._currentPlayer.seekToTime(e, s)
      })
    }
    setPresentationMode(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._currentPlayer.setPresentationMode(e)
      })
    }
    startMediaItemPlayback(e, s = !1) {
      var n, d, h
      return __awaiter$4(this, void 0, void 0, function* () {
        if (
          (w.debug('MediaItemPlayback: startMediaItemPlayback', e),
          e.resetState(),
          null === (d = null === (n = e.container) || void 0 === n ? void 0 : n.attributes) || void 0 === d
            ? void 0
            : d.requiresSubscription)
        ) {
          if (!(yield this.hasMusicSubscription())) {
            const s = new MKError(MKError.SUBSCRIPTION_ERROR)
            throw ((s.data = e), s)
          }
        }
        const p = yield this._getPlayerForMediaItem(e)
        if (
          (yield this.setCurrentPlayer(p),
          !(null === (h = this._currentPlayer) || void 0 === h ? void 0 : h.hasMediaElement))
        )
          return (
            w.warn(
              `MediaItemPlayback: Could not play media of type ${e.type}, marking item as unsupported and skipping.`
            ),
            void e.notSupported()
          )
        try {
          e.beginMonitoringStateDidChange((e) => {
            var s
            return null === (s = this._dispatcher) || void 0 === s ? void 0 : s.publish(E.mediaItemStateDidChange, e)
          }),
            e.beginMonitoringStateWillChange((e) => {
              var s
              return null === (s = this._dispatcher) || void 0 === s ? void 0 : s.publish(E.mediaItemStateWillChange, e)
            })
          const n = this.playOptions.get(e.id)
          n && this.playOptions.delete(e.id)
          const d = yield this.playMediaItem(e, this._currentPlayer, s, n)
          return (this._currentPlayback = { item: e, userInitiated: s }), d
        } catch (B) {
          throw (w.error(B), B)
        }
      })
    }
    stop(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this._currentPlayer.stop(e)
      })
    }
    unmute() {
      this.volume > 0 || ((this.volume = this._volumeAtMute || 1), (this._volumeAtMute = void 0))
    }
    _getPlayerForMediaItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        w.debug('MediaItemPlayback:  _getPlayerForMediaItem', e.id)
        const s = yield this._playerFactory.getPlayerForMediaItem(e, this.playerState, this._currentPlayer)
        return (s.previewOnly = this._previewOnly), s
      })
    }
    setCurrentPlayer(e) {
      var s
      return __awaiter$4(this, void 0, void 0, function* () {
        this._currentPlayer !== e &&
          (w.debug('MediaItemPlayback: setting currentPlayer', e),
          yield this._currentPlayer.stop(),
          (this._currentPlayer = e),
          null === (s = this._dispatcher) || void 0 === s || s.publish(Eo, { player: e }))
      })
    }
    onKeySystemGenericError(e, s) {
      var n
      return __awaiter$4(this, void 0, void 0, function* () {
        Po
          ? null === (n = this._dispatcher) || void 0 === n || n.publish(To, s)
          : ((Po = !0), w.warn('Retrying playback after keysystemGenericError'), yield this.restartPlayback())
      })
    }
    onPlaybackLicenseError(e, s) {
      var n
      return __awaiter$4(this, void 0, void 0, function* () {
        s.errorCode === MKError.PLAYREADY_CBC_ENCRYPTION_ERROR
          ? (w.warn('MediaItemPlayback: PLAYREADY_CBC_ENCRYPTION_ERROR...retrying with different key system'),
            yield this.restartPlayback())
          : null === (n = this._dispatcher) || void 0 === n || n.publish(To, s)
      })
    }
    restartPlayback() {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this.stop()
        const { _currentPlayback: e } = this
        if (e) {
          const { item: s, userInitiated: n } = e
          s.resetState(), yield this.startMediaItemPlayback(s, n)
        }
      })
    }
    _updatePlayerState(e, s) {
      ;(this.playerState[e] = s), (this._currentPlayer[e] = s)
    }
  }
  var Ao
  __decorate$2(
    [
      Bind(),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object, Object]),
      __metadata$2('design:returntype', Promise),
    ],
    MediaItemPlayback.prototype,
    'onKeySystemGenericError',
    null
  ),
    __decorate$2(
      [
        Bind(),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', [Object, Object]),
        __metadata$2('design:returntype', Promise),
      ],
      MediaItemPlayback.prototype,
      'onPlaybackLicenseError',
      null
    ),
    (function (e) {
      ;(e.UTS = 'uts-api'), (e.MEDIA = 'media-api')
    })(Ao || (Ao = {}))
  class APIServiceManager {
    constructor(e, s) {
      ;(this.store = e), (this._dispatcher = s), (this._apisByType = {})
    }
    get api() {
      return this.getApiByType(this._defaultAPI)
    }
    get apiService() {
      if (void 0 !== this._defaultAPI) return this._apisByType[this._defaultAPI]
      en.error('There is no API instance configured')
    }
    get mediaAPI() {
      return this.getApiByType(Ao.MEDIA)
    }
    get utsAPI() {
      return this.getApiByType(Ao.UTS)
    }
    getApiByType(e) {
      let s
      if ((void 0 !== e && (s = this._apisByType[e]), void 0 === s || void 0 === s.api))
        throw new MKError(
          MKError.CONFIGURATION_ERROR,
          'There is no API instance configured for the requested type: ' + e
        )
      return s.api
    }
    set defaultApiType(e) {
      this._defaultAPI = e
    }
    registerAPIService(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        const { apiType: s, configureFn: n, options: d } = e,
          h = d.apiOptions || {}
        void 0 === this._defaultAPI && (this._defaultAPI = s),
          (this._apisByType[s] = yield n.call(this, { apiOptions: h, store: this.store, dispatcher: this._dispatcher }))
      })
    }
  }
  class BitrateCalculator {
    constructor(s, n = e.PlaybackBitrate.STANDARD) {
      var d, h
      ;(this._downlinkSamples = []),
        (this._bitrate = n),
        (this._dispatcher = s),
        void 0 !==
          (null ===
            (h =
              null === (d = null === window || void 0 === window ? void 0 : window.navigator) || void 0 === d
                ? void 0
                : d.connection) || void 0 === h
            ? void 0
            : h.downlink) && this._recalculateBitrate(100 * (window.navigator.connection.downlink || 0))
    }
    get bitrate() {
      return this._bitrate
    }
    set bitrate(e) {
      this._bitrate !== e &&
        ((this._bitrate = e), this._dispatcher.publish(or.playbackBitrateDidChange, { bitrate: e }))
    }
    _calculateAverageDownlink() {
      return 0 === this._downlinkSamples.length
        ? 0
        : this._downlinkSamples.reduce((e, s) => e + s, 0) / this._downlinkSamples.length || 0
    }
    _recalculateBitrate(s) {
      en.debug('_recalculateBitrate', s), this._downlinkSamples.push(s)
      this._calculateAverageDownlink() > e.PlaybackBitrate.STANDARD
        ? (en.debug('setting bitrate to', e.PlaybackBitrate.HIGH), (this.bitrate = e.PlaybackBitrate.HIGH))
        : (en.debug('setting bitrate to', e.PlaybackBitrate.STANDARD), (this.bitrate = e.PlaybackBitrate.STANDARD))
    }
  }
  const Io = {}
  function adaptAddEventListener(e, s, n, d = {}) {
    const { once: h } = d,
      p = (function (e, s) {
        const n = getCallbacksForName(e),
          wrappedCallback = (e, n) => {
            s(n)
          }
        return n.push([s, wrappedCallback]), wrappedCallback
      })(s, n)
    !0 === h ? e.subscribeOnce(s, p) : e.subscribe(s, p)
  }
  function getCallbacksForName(e) {
    let s = Io[e]
    return s || ((s = []), (Io[e] = s)), s
  }
  function requiresHlsJs(e) {
    return __awaiter$4(this, void 0, void 0, function* () {
      const s = null != e ? e : yield findKeySystemPreference(),
        n = !(
          'true' !==
            (null === localStorage || void 0 === localStorage
              ? void 0
              : localStorage.getItem('mk-force-safari-hlsjs')) || 0 === nn.realm
        )
      return supportsDrm() && (s !== Ps.FAIRPLAY || n)
    })
  }
  class RTCStreamingTracker {
    constructor(e) {
      this.options = e
    }
    configure(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (((this.instance = e), !sn.urls.rtc)) throw new Error('bag.urls.rtc is not configured')
        return yield loadScript(sn.urls.rtc), this
      })
    }
    prepareReportingAgent(e) {
      var s
      this.clearReportingAgent()
      const n = e || this.instance.nowPlayingItem,
        d = n ? getDefaultPlayable(n) : void 0,
        {
          Sender: h,
          ClientName: p,
          ServiceName: y,
          ApplicationName: m,
          ReportingStoreBag: g,
          DeviceName: v,
        } = window.rtc.RTCReportingAgentConfigKeys,
        _ = { firmwareVersion: this.generateBrowserVersion(), model: this.options.browserName }
      d &&
        ((null === (s = d.mediaMetrics) || void 0 === s ? void 0 : s.MediaIdentifier) &&
          (_.MediaIdentifier = d.mediaMetrics.MediaIdentifier),
        d.channelId && (_.ContentProvider = d.channelId)),
        void 0 === this._storeBag && (this._storeBag = this.generateStoreBag())
      const b = {
        [h]: 'HLSJS',
        [p]: this.options.clientName,
        [y]: this.options.serviceName,
        [m]: this.options.applicationName,
        [g]: this._storeBag,
        [v]: this.options.osVersion,
        userInfoDict: _,
      }
      return (
        en.debug('RTC: creating reporting agent with config', b),
        (this.reportingAgent = new window.rtc.RTCReportingAgent(b)),
        en.debug('RTC: created reporting agent', this.reportingAgent),
        this.reportingAgent
      )
    }
    shouldConfigure(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return requiresHlsJs()
      })
    }
    shouldTrackPlayActivity(e, s) {
      return !0
    }
    cleanup() {
      this.clearReportingAgent()
    }
    clearReportingAgent() {
      void 0 !== this.reportingAgent &&
        (this.reportingAgent.destroy(),
        en.debug('RTC: called destroy on reporting agent', this.reportingAgent),
        (this.reportingAgent = void 0))
    }
    generateBrowserVersion() {
      return this.options.browserMajorVersion
        ? `${this.options.browserMajorVersion}.${this.options.browserMinorVersion || 0}`
        : 'unknown'
    }
    generateStoreBag() {
      var e
      const { storeBagURL: s, clientName: n, applicationName: d, serviceName: h, browserName: p } = this.options,
        y = {
          HLSJSVersion:
            null === (e = null === window || void 0 === window ? void 0 : window.Hls) || void 0 === e
              ? void 0
              : e.version,
        },
        m = new window.rtc.RTCStorebag.RTCReportingStoreBag(s, n, h, d, p, y)
      return en.debug('RTC: created store bag', m), m
    }
  }
  var wo
  !(function (e) {
    ;(e[(e.ACCURATE = 0)] = 'ACCURATE'), (e[(e.ROUND = 1)] = 'ROUND')
  })(wo || (wo = {}))
  class TimingAccuracy {
    constructor(e = !1) {
      this.mode = e ? wo.ACCURATE : wo.ROUND
    }
    time(e = 0) {
      return this.mode === wo.ROUND ? Math.round(e) : e
    }
  }
  const loadLiveRadioAssets = (e, s, n) =>
      __awaiter$4(void 0, void 0, void 0, function* () {
        var d, h
        const p = new Headers({
            Authorization: 'Bearer ' + s,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + n,
          }),
          y = urlEncodeParameters(Object.assign(Object.assign({}, e.playParams), { keyFormat: 'web' })),
          m = `${sn.urls.mediaApi}/play/assets?${y}`,
          g = yield fetch(m, { method: 'GET', headers: p })
        if (500 === g.status) {
          const s = new MKError(MKError.SERVER_ERROR)
          throw ((s.data = e), s)
        }
        if (403 === g.status) {
          let s
          try {
            ;(s = yield g.json()), (s = null === (d = null == s ? void 0 : s.errors) || void 0 === d ? void 0 : d[0])
          } catch (_t) {}
          const n = '40303' === (null == s ? void 0 : s.code) ? MKError.SUBSCRIPTION_ERROR : MKError.ACCESS_DENIED,
            p = new MKError(
              n,
              null !== (h = null == s ? void 0 : s.title) && void 0 !== h ? h : null == s ? void 0 : s.detail
            )
          throw ((p.data = e), p)
        }
        if (!g.ok) {
          const s = new MKError(MKError.CONTENT_UNAVAILABLE)
          throw ((s.data = e), s)
        }
        const v = (yield g.json()).results
        return en.debug(`media-item: loaded data from ${m}: ${JSON.stringify(v)}`), v
      }),
    prepareOffersHlsUrlForEncryptedPlayback = (e) =>
      __awaiter$4(void 0, void 0, void 0, function* () {
        const s = sn.urls.hlsOffersKeyUrls
        if (!s) throw new MKError(MKError.CONTENT_UNSUPPORTED, 'HLS OFFERS')
        e.updateWithLoadedKeys(s), yield fetchMasterManifestUrl(e, e.offersHlsUrl)
      }),
    prepareLiveRadioForEncryptedPlayback = (e, s, n) =>
      __awaiter$4(void 0, void 0, void 0, function* () {
        if (
          !sn.features['playready-live-radio'] &&
          As === Ps.PLAYREADY &&
          'video' !== e.attributes.mediaKind &&
          !sn.features['mse-live-radio']
        )
          throw new MKError(MKError.CONTENT_UNSUPPORTED, 'LIVE_RADIO')
        const d = (yield loadLiveRadioAssets(e, s, n)).assets[0]
        e.updateWithLoadedKeys({
          'hls-key-cert-url': d.fairPlayKeyCertificateUrl,
          'hls-key-server-url': d.keyServerUrl,
          'widevine-cert-url': d.widevineKeyCertificateUrl,
        }),
          filterUnavailableLiveRadioUrls(d, e),
          e.isLiveVideoStation ? (e.assetURL = d.url) : yield fetchMasterManifestUrl(e, d.url)
      }),
    fetchMasterManifestUrl = (e, s) =>
      __awaiter$4(void 0, void 0, void 0, function* () {
        let n
        try {
          n = yield fetch(s)
        } catch (_t) {
          throw makeContentUnavailableError(e)
        }
        const d = yield n.text()
        extractAssetsFromMasterManifest(d, s, e)
      }),
    extractAssetsFromMasterManifest = (e, s, n) => {
      const d = /^#EXT-X-STREAM-INF:.*BANDWIDTH=(\d+),CODECS="(.*)"\s*\n(.*$)/gim
      let h
      for (; (h = d.exec(e)); ) {
        let [e, d, p, y] = h
        ;/^http(s)?:\/\//.test(y) || (y = rewriteLastUrlPath(s, y)),
          n.assets.push({ bandwidth: Number(d), codec: p, URL: y })
      }
    },
    filterUnavailableLiveRadioUrls = (e, s) => {
      const n = new URL(e.url),
        d = 'true' === localStorage.getItem('mk-enable-live-music-video-domains')
      if (!(n.host.endsWith('.apple.com') || (d && n.host.endsWith('.applemusic.com'))))
        throw makeContentUnavailableError(s)
    },
    makeContentUnavailableError = (e) => {
      const s = new MKError(MKError.CONTENT_UNAVAILABLE)
      return (s.data = e), s
    },
    prepareItemWithMZPlay = (e, s, n) =>
      __awaiter$4(void 0, void 0, void 0, function* () {
        if ((en.debug('mk: loadWithMZPlay', e.playParams), 'podcast-episodes' === e.type))
          return void (e.assetURL = e.attributes.assetUrl)
        if (!(yield hasMusicSubscription())) return
        const d = e.playParams.id,
          h = new Headers({
            Authorization: 'Bearer ' + s,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + n,
          })
        let p = { salableAdamId: d }
        if (e.isCloudItem) {
          ;(p = {}),
            e.playParams.purchasedId && (p.purchaseAdamId = e.playParams.purchasedId),
            e.playParams.catalogId && (p.subscriptionAdamId = e.playParams.catalogId)
          const s = /^a\.(\d+)$/
          s.test(d) ? (p.subscriptionAdamId = d.replace(s, '$1')) : v(d) && (p.universalLibraryId = d)
        }
        if (!sn.urls.webPlayback) throw new Error('bag.urls.webPlayback is not configured')
        const y = yield fetch(sn.urls.webPlayback, { method: 'POST', body: JSON.stringify(p), headers: h }),
          m = yield y.text(),
          g = JSON.parse(m)
        if (!g || !g.songList) {
          const s = MKError.serverError(g)
          return (
            e.updateFromLoadError(s), en.debug('mk: prepareItemWithMZPlay - rejecting with error', s), Promise.reject(s)
          )
        }
        const [_] = g.songList
        e.updateFromSongList(_)
      })
  function playMediaItem(s, n, d, h, p) {
    return __awaiter$4(this, void 0, void 0, function* () {
      const y = d.isPaused() && !h
      en.debug('playMediaItem', n, y)
      const m = yield (function (e, s) {
        return __awaiter$4(this, void 0, void 0, function* () {
          return (
            !!e.previewURL &&
            (!!s.previewOnly ||
              (!e.playRawAssetURL &&
                ((!e.isUTS && !(yield hasMusicSubscription())) ||
                  !hasAuthorization() ||
                  !supportsDrm() ||
                  !e.isPlayable)))
          )
        })
      })(n, d)
      if ((en.debug('mk: shouldPreview', m), m))
        return (
          supportsDrm() || d.dispatch(or.drmUnsupported, { item: n }),
          (n.playbackType = e.PlaybackType.preview),
          (d.nowPlayingItem = n),
          yield d.playItemFromUnencryptedSource(n.previewURL, y),
          n
        )
      if (
        (function (e) {
          return !(!e.playRawAssetURL || !e.attributes.assetUrl)
        })(n)
      )
        return (
          en.debug('shouldPlayRawAsset', n),
          (n.playbackType = e.PlaybackType.unencryptedFull),
          (d.nowPlayingItem = n),
          yield d.playItemFromUnencryptedSource(n.attributes.assetUrl, y, p),
          n
        )
      if (isBroadcastRadio(n)) {
        if (!sn.features['broadcast-radio']) {
          const e = new MKError(MKError.CONTENT_UNAVAILABLE)
          throw ((e.data = n), e)
        }
        const h = yield loadLiveRadioAssets(n, s.store.developerToken, s.store.userToken),
          p = h.assets[0]
        return (
          (n.playbackType = e.PlaybackType.unencryptedFull),
          (n.trackInfo = h['track-info']),
          (d.nowPlayingItem = n),
          yield d.playItemFromUnencryptedSource(p.url, y),
          n
        )
      }
      if (!n || !n.isPlayable) return Promise.reject(new MKError(MKError.MEDIA_PLAYBACK, 'Not Playable'))
      try {
        yield prepareForEncryptedPlayback(s, n, d)
      } catch (B) {
        return (
          en.error('prepareForEncryptedPlayback Error: userInitiated ' + h),
          h ? Promise.reject(B) : void d.dispatch(or.mediaPlaybackError, B)
        )
      }
      return (
        yield (function (e) {
          return new Promise((s, n) => {
            const { ageGatePolicy: d } = e
            if (!d || !d.age || !d.frequencyInMinutes)
              return en.debug('No ageGatePolicy. Resolving handleAgeGate()'), s(void 0)
            const h = window.localStorage.ageGatePolicyAge,
              p = window.localStorage.ageGatePolicyExpiration
            if (h && p && parseInt(p, 10) > Date.now() && parseInt(h, 10) >= d.age) return s(void 0)
            MKDialog.clientDialog({
              okButtonString: 'Yes',
              okButtonAction: () => (
                localStorage.setItem('ageGatePolicyAge', d.age.toString()),
                localStorage.setItem(
                  'ageGatePolicyExpiration',
                  (Date.now() + 60 * d.frequencyInMinutes * 1e3).toString()
                ),
                s(void 0)
              ),
              cancelButtonString: 'No',
              cancelButtonAction: () => n(new MKError('AGE_GATE', 'Age Gate Declined')),
              explanation: `This content may not be appropriate for ages younger than ${d.age}.`,
              message: `Are you ${d.age} or older?`,
            }).present()
          })
        })(n),
        en.debug('About to play item as encrypted', n),
        yield d.playItemFromEncryptedSource(n, h, p),
        n
      )
    })
  }
  function prepareToPlayMediaItem(e, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      const { developerToken: n, userToken: d } = e.store
      if (void 0 === n || void 0 === d)
        return Promise.reject(new MKError(MKError.AUTHORIZATION_ERROR, 'Unable to prepare media item for play.'))
      s.isPreparedToPlay
        ? en.warn('media-item: item is prepared to play')
        : (en.debug('media-item: item.prepareToPlay playParams', s.playParams),
          (s.state = C.loading),
          s.isUTS
            ? yield ((e, s) =>
                __awaiter$4(void 0, void 0, void 0, function* () {
                  var n, d
                  const h = yield s.viewProductPersonalized({ id: e.id, reload: !0 })
                  if (
                    ((e.playables =
                      null !== (n = null == h ? void 0 : h.playables) && void 0 !== n
                        ? n
                        : null === (d = null == h ? void 0 : h.currentEpisode) || void 0 === d
                        ? void 0
                        : d.playables),
                    (e.channels = null == h ? void 0 : h.channels),
                    !hasPlayables(e))
                  )
                    return
                  const p = getDefaultPlayable(e)
                  void 0 !== p && ((e.ageGatePolicy = p.ageGatePolicy), (e.playEvent = p.playEvent))
                  const y = e.playables.reduce((e, s) => (void 0 !== s.assets && e.push(s.assets), e), [])
                  if (0 === y.length) return
                  const [m] = y
                  let { hlsUrl: g } = m
                  sn.features.xtrick && (g = addQueryParamsToURL(g, { xtrick: !0 })),
                    sn.features.isWeb && (g = addQueryParamsToURL(g, { webbrowser: !0 })),
                    e.bingeWatching && ((g = addQueryParamsToURL(g, { bingeWatching: !0 })), (e.bingeWatching = !1)),
                    e.updateWithLoadedAssets(y, g),
                    e.updateWithLoadedKeys(
                      {
                        'hls-key-cert-url': m.fpsCertificateUrl,
                        'hls-key-server-url': m.fpsKeyServerUrl,
                        'widevine-cert-url': m.wideVineCertificateUrl,
                      },
                      m.fpsKeyServerQueryParameters
                    ),
                    yield fetchHLSMetadata(e),
                    (e.state = C.ready)
                }))(s, e.utsAPI)
            : yield ((e, s, n) =>
                __awaiter$4(void 0, void 0, void 0, function* () {
                  e.hasOffersHlsUrl
                    ? yield prepareOffersHlsUrlForEncryptedPlayback(e)
                    : e.isLiveRadioStation
                    ? yield prepareLiveRadioForEncryptedPlayback(e, s, n)
                    : yield prepareItemWithMZPlay(e, s, n)
                }))(s, n, d))
    })
  }
  function prepareForEncryptedPlayback(e, s, n) {
    return __awaiter$4(this, void 0, void 0, function* () {
      if ((en.debug('prepareForEncryptedPlayback'), !hasAuthorization()))
        return n.destroy(), Promise.reject(new MKError(MKError.AUTHORIZATION_ERROR, 'Unable to prepare for playback.'))
      try {
        yield prepareToPlayMediaItem(e, s)
      } catch (B) {
        if ([MKError.AUTHORIZATION_ERROR].includes(B.errorCode)) yield e.store.storekit.revokeUserToken()
        else if (B.errorCode === MKError.TOKEN_EXPIRED)
          try {
            return (
              yield e.store.storekit.renewUserToken(),
              yield prepareToPlayMediaItem(e, s),
              (s.playbackData = _playbackDataForItem(s, n)),
              s
            )
          } catch (tn) {}
        if (B) return n.destroy(), Promise.reject(B)
      }
      return (s.playbackData = _playbackDataForItem(s, n)), s
    })
  }
  function _playbackDataForItem(s, n) {
    if ((en.debug('mk: _playbackDataForItem', s), s.isCloudUpload)) return s.assets[0]
    if ('musicVideo' !== s.type && !s.isLiveVideoStation) {
      if (!s.isLiveRadioStation && !s.hasOffersHlsUrl) {
        const [e] = s.assets.filter((e) => {
          var s
          if (!('flavor' in e)) return !1
          const d = new RegExp(`\\d{1,2}\\:(c${n.extension.isFairplay ? 'bc' : 'tr'}p)(\\d{2,3})`, 'i'),
            h = d.test(e.flavor),
            p = null !== (s = e.flavor.match(d)) && void 0 !== s ? s : []
          return h && parseInt(p[2], 0) <= n.bitrate
        })
        return e
      }
      {
        const d = s.assets.reduce((e, s) => {
            const n = s.bandwidth
            return e[n] || (e[n] = []), e[n].push(s), e
          }, {}),
          h = Object.keys(d).sort((e, s) => parseInt(e, 10) - parseInt(s, 10)),
          p = n.bitrate === e.PlaybackBitrate.STANDARD ? h[0] : h[h.length - 1]
        s.assetURL = d[p][0].URL
      }
    }
  }
  const Ro = [
    MKError.AGE_VERIFICATION,
    MKError.CONTENT_EQUIVALENT,
    MKError.CONTENT_RESTRICTED,
    MKError.CONTENT_UNAVAILABLE,
    MKError.CONTENT_UNSUPPORTED,
    MKError.SERVER_ERROR,
    MKError.SUBSCRIPTION_ERROR,
    MKError.UNSUPPORTED_ERROR,
  ]
  var Oo
  ;(e.PlaybackMode = void 0),
    ((Oo = e.PlaybackMode || (e.PlaybackMode = {}))[(Oo.PREVIEW_ONLY = 0)] = 'PREVIEW_ONLY'),
    (Oo[(Oo.MIXED_CONTENT = 1)] = 'MIXED_CONTENT'),
    (Oo[(Oo.FULL_PLAYBACK_ONLY = 2)] = 'FULL_PLAYBACK_ONLY')
  class MKInstance {
    constructor(s, n = {}) {
      if (
        ((this._autoplayEnabled = !1),
        (this.privateEnabled = !1),
        (this.siriInitiated = !1),
        (this.sourceType = gt.MUSICKIT),
        (this.version = e.version),
        (this._bag = sn),
        (this._playbackControllers = {}),
        (this._playbackErrorDialog = !0),
        (this._playbackMode = e.PlaybackMode.MIXED_CONTENT),
        (this._whenConfigured = void 0),
        'string' != typeof s)
      )
        throw new Error('MusicKit was initialized without an developerToken.')
      Object.assign(
        sn.features,
        (function (e = []) {
          let s = {}
          return (
            e.forEach((e) => {
              '-' === e.charAt(0) ? ((e = e.substr(1)), (s[e] = !1)) : (s[e] = !0)
            }),
            s
          )
        })(n.features)
      ),
        Object.assign(sn.autoplay, n.autoplay),
        (this.context = {})
      const d = new PubSub()
      ;(this.capabilities = new Capabilities(d)), n.playbackActions && (this.playbackActions = n.playbackActions)
      const h = new TimingAccuracy(!!sn.features['player-accurate-timing']),
        p = new BitrateCalculator(d, n.bitrate)
      ;(this._services = { dispatcher: d, timing: h, bitrateCalculator: p }),
        void 0 !== n.playActivityAPI && (this._services.playActivity = new PlayActivityService(n.playActivityAPI, d)),
        (n.services = this._services),
        this._configureLogger(n),
        (sn.app = n.app || {}),
        (sn.store = new DataStore({
          filter: getFilterFromFlags(n.storeFilterTypes || []),
          shouldDisableRecordReuse: !!sn.features['disable-data-store-record-reuse'],
        })),
        Object.assign(sn.urls, n.urls || {})
      const y = (function (e, s) {
        return (nn = new Store(e, s)), nn
      })(s, n)
      this._services.apiManager = new APIServiceManager(y, d)
      const m = new MediaItemPlayback(this._createPlayerControllerOptions())
      ;(this._services.mediaItemPlayback = m),
        n.sourceType && (this.sourceType = n.sourceType),
        this._initializeEventHandling(),
        n.bitrate && (this.bitrate = n.bitrate),
        n.prefix && /^(?:web|preview)$/.test(n.prefix) && (this.prefix = sn.prefix = n.prefix),
        n.suppressErrorDialog && (this._playbackErrorDialog = !n.suppressErrorDialog),
        void 0 !== n.playbackMode && (this.playbackMode = n.playbackMode),
        (this.privateEnabled = n.privateEnabled || !1),
        (this.siriInitiated = n.siriInitiated || !1),
        (this.id = generateUUID()),
        en.log('MusicKit JS Version: ' + this.version),
        en.debug('Link Parameters', n.linkParameters),
        en.log('InstanceId', this.id),
        sn.app && en.debug('App', sn.app)
    }
    get developerToken() {
      return nn.developerToken
    }
    get api() {
      return this._services.apiManager.api
    }
    get audioTracks() {
      return this._mediaItemPlayback.audioTracks
    }
    get authorizationStatus() {
      return nn.authorizationStatus
    }
    get bitrate() {
      return this._services.bitrateCalculator.bitrate
    }
    set bitrate(e) {
      this._services.bitrateCalculator.bitrate = e
    }
    get browserSupportsPictureInPicture() {
      return (function () {
        if (Fe) return w.warn('dom-helpers: Browser checks are not supported in Node environments'), !1
        const e = es,
          s = e && e.webkitSupportsPresentationMode && 'function' == typeof e.webkitSetPresentationMode,
          n = document.pictureInPictureEnabled
        return !(!s && !n)
      })()
    }
    get browserSupportsVideoDrm() {
      return supportsDrm()
    }
    get cid() {
      return (2 === this.realm || this.sourceType !== gt.MUSICKIT) && nn.cid
    }
    get continuous() {
      return this._playbackController.continuous
    }
    set continuous(e) {
      this._playbackController.continuous = e
    }
    get autoplayEnabled() {
      return this._autoplayEnabled
    }
    set autoplayEnabled(e) {
      0 !== this.realm && (e = !1),
        e !== this.autoplayEnabled &&
          ((this._autoplayEnabled = e),
          this._services.dispatcher.publish(or.autoplayEnabledDidChange, this.autoplayEnabled))
    }
    get currentAudioTrack() {
      return this._mediaItemPlayback.currentAudioTrack
    }
    set currentAudioTrack(e) {
      this._mediaItemPlayback.currentAudioTrack = e
    }
    get currentPlaybackDuration() {
      return this._mediaItemPlayback.currentPlaybackDuration
    }
    get currentPlaybackProgress() {
      return this._mediaItemPlayback.currentPlaybackProgress
    }
    get currentPlaybackTime() {
      return this._mediaItemPlayback.currentPlaybackTime
    }
    get currentPlaybackTimeRemaining() {
      return this._mediaItemPlayback.currentPlaybackTimeRemaining
    }
    get currentTextTrack() {
      return this._mediaItemPlayback.currentTextTrack
    }
    set currentTextTrack(e) {
      this._mediaItemPlayback.currentTextTrack = e
    }
    get isAuthorized() {
      return nn.isAuthorized
    }
    get isPlaying() {
      return this._playbackController.isPlaying
    }
    get isRestricted() {
      return nn.isRestricted
    }
    get metricsClientId() {
      return nn.metricsClientId
    }
    set metricsClientId(e) {
      nn.metricsClientId = e
    }
    get musicUserToken() {
      return nn.musicUserToken
    }
    set musicUserToken(e) {
      ;(e && nn.musicUserToken === e) || (nn.musicUserToken = e)
    }
    get nowPlayingItem() {
      return this._mediaItemPlayback.nowPlayingItem
    }
    get nowPlayingItemIndex() {
      return this._playbackController.nowPlayingItemIndex
    }
    get playbackMode() {
      return this._playbackMode
    }
    set playbackMode(s) {
      if (-1 === Object.values(e.PlaybackMode).indexOf(s)) return
      this._playbackMode = s
      const n = s === e.PlaybackMode.PREVIEW_ONLY,
        d = this._services.mediaItemPlayback
      d && (d.previewOnly = n)
    }
    get playbackRate() {
      return this._mediaItemPlayback.playbackRate
    }
    set playbackRate(e) {
      this._mediaItemPlayback.playbackRate = e
    }
    get playbackState() {
      return this._mediaItemPlayback.playbackState
    }
    get playbackTargetAvailable() {
      return this._mediaItemPlayback.playbackTargetAvailable
    }
    get playbackTargetIsWireless() {
      return this._mediaItemPlayback.playbackTargetIsWireless
    }
    get previewOnly() {
      return this.playbackMode === e.PlaybackMode.PREVIEW_ONLY
    }
    set previewOnly(s) {
      this.playbackMode = s ? e.PlaybackMode.PREVIEW_ONLY : e.PlaybackMode.MIXED_CONTENT
    }
    get queue() {
      return this._playbackController.queue
    }
    get queueIsEmpty() {
      return this._playbackController.queue.isEmpty
    }
    get realm() {
      return nn.realm
    }
    get repeatMode() {
      return this._playbackController.repeatMode
    }
    set repeatMode(e) {
      this._playbackController.repeatMode = e
    }
    set requestUserToken(e) {
      nn.requestUserToken = e
    }
    get restrictedEnabled() {
      return nn.restrictedEnabled
    }
    get seekSeconds() {
      return this._playbackController.seekSeconds
    }
    get services() {
      return this._services
    }
    set shuffle(e) {
      this._playbackController.shuffle = e
    }
    get shuffleMode() {
      return this._playbackController.shuffleMode
    }
    set shuffleMode(e) {
      this._playbackController.shuffleMode = e
    }
    get storefrontCountryCode() {
      return nn.storefrontCountryCode
    }
    get subscribeURL() {
      return nn.subscribeURL
    }
    get subscribeFamilyURL() {
      return nn.subscribeFamilyURL
    }
    get subscribeIndividualURL() {
      return nn.subscribeIndividualURL
    }
    get subscribeStudentURL() {
      return nn.subscribeStudentURL
    }
    get textTracks() {
      return this._mediaItemPlayback.textTracks
    }
    get videoContainerElement() {
      return this.context.videoContainerElement
    }
    set videoContainerElement(e) {
      this.context.videoContainerElement = e
    }
    get volume() {
      return this._mediaItemPlayback.volume
    }
    set volume(e) {
      this._mediaItemPlayback.volume = e
    }
    get storefrontId() {
      return nn.storefrontId
    }
    set storefrontId(e) {
      nn.storefrontId = e
    }
    get _mediaItemPlayback() {
      return this._services.mediaItemPlayback
    }
    get _playbackController() {
      if (void 0 !== this._playbackControllerInternal) return this._playbackControllerInternal
      en.debug('setting _playbackController')
      const e = this._getPlaybackControllerByType(Ja.serial)
      return (this._playbackController = e), e
    }
    set _playbackController(e) {
      ;(this._playbackControllerInternal = e),
        (this._playbackControllerInternal.autoplayEnabled = this._autoplayEnabled),
        this._playbackControllerInternal.activate(),
        this.capabilities.updateChecker(this._playbackControllerInternal.hasCapabilities),
        (this.capabilities.controller = this._playbackControllerInternal)
    }
    addEventListener(e, s, n = {}) {
      adaptAddEventListener(this._services.dispatcher, e, s, n)
    }
    authorize() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this.deferPlayback(), nn.authorize()
      })
    }
    canAuthorize() {
      return supportsDrm() && !this.isAuthorized
    }
    canUnauthorize() {
      return supportsDrm() && this.isAuthorized
    }
    changeToMediaAtIndex(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        this._isPlaybackSupported() &&
          (yield this._validateAuthorization(),
          this._signalChangeItemIntent(),
          yield this._playbackController.changeToMediaAtIndex(e))
      })
    }
    changeToMediaItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        en.debug('instance.changeToMediaItem', e),
          this._isPlaybackSupported() &&
            (yield this._validateAuthorization(),
            this._signalChangeItemIntent(),
            yield this._playbackController.changeToMediaItem(e))
      })
    }
    changeUserStorefront(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        this.storefrontId = e
      })
    }
    cleanup() {
      var s
      return __awaiter$4(this, void 0, void 0, function* () {
        null === (s = this._services.mediaItemPlayback) || void 0 === s || s.destroy(),
          this._signalIntent({ endReasonType: e.PlayActivityEndReasonType.EXITED_APPLICATION })
        const n = Object.keys(this._playbackControllers).map((e) => this._playbackControllers[e].destroy())
        try {
          yield Promise.all(n)
        } catch (_t) {
          en.error('Error cleaning up controller', _t)
        }
        this._services.dispatcher.clear()
      })
    }
    configure(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return (this._whenConfigured = this._configure(e)), this._whenConfigured
      })
    }
    _configure(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield nn.storekit.whenAuthCompleted
        const s = e.map(this._services.apiManager.registerAPIService, this._services.apiManager)
        yield Promise.all(s), yield this._configurePlayActivity()
      })
    }
    deferPlayback() {
      en.debug('deferPlayback', this._playbackControllerInternal), deferPlayback()
    }
    me() {
      return __awaiter$4(this, void 0, void 0, function* () {
        try {
          return yield nn.storekit.me()
        } catch (_t) {
          return Promise.reject(new MKError(MKError.AUTHORIZATION_ERROR, 'Unauthorized'))
        }
      })
    }
    hasMusicSubscription() {
      return hasMusicSubscription(nn.storekit)
    }
    mute() {
      return this._mediaItemPlayback.mute()
    }
    pause(s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          try {
            this._signalIntent({ endReasonType: e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED }),
              yield this._playbackController.pause(s)
          } catch (B) {
            this._handlePlaybackError(B)
          }
          return Promise.resolve()
        }
      })
    }
    play() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if ((en.debug('instance.play()'), this._isPlaybackSupported())) {
          yield this._validateAuthorization()
          try {
            yield this._playbackController.play()
          } catch (B) {
            this._handlePlaybackError(B)
          }
          return Promise.resolve()
        }
      })
    }
    playMediaItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return en.debug('mk: playMediaItem', e), this.deferPlayback(), this._playbackController.playSingleMediaItem(e)
      })
    }
    playNext(e, s = !1) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported())
          return this._playbackController.queue
            ? (this.deferPlayback(), this._playbackController.prepend(e, s))
            : this.setQueue(e)
      })
    }
    playLater(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported())
          return this._playbackController.queue
            ? (this.deferPlayback(), this._playbackController.append(e))
            : this.setQueue(e)
      })
    }
    playAt(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported())
          return this._playbackController.queue
            ? (this.deferPlayback(), this._playbackController.insertAt(e, s))
            : this.setQueue(s)
      })
    }
    clearQueue() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._mediaItemPlayback.clearNextManifest(), this._playbackController.clear()
      })
    }
    removeEventListener(e, s) {
      !(function (e, s, n) {
        const d = getCallbacksForName(s)
        let h
        for (let p = d.length - 1; p >= 0; p--) {
          const [e, s] = d[p]
          if (e === n) {
            ;(h = s), d.splice(p, 1)
            break
          }
        }
        h && e.unsubscribe(s, h)
      })(this._services.dispatcher, e, s)
    }
    exitFullscreen() {
      return this._mediaItemPlayback.exitFullscreen()
    }
    requestFullscreen(e) {
      return this._mediaItemPlayback.requestFullscreen(e)
    }
    getNewSeeker() {
      return this._playbackController.getNewSeeker()
    }
    seekToTime(e, s = rt.Manual) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          yield this._validateAuthorization()
          try {
            yield this._playbackController.seekToTime(e, s)
          } catch (B) {
            this._handlePlaybackError(B)
          }
          return Promise.resolve()
        }
      })
    }
    setQueue(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        let s
        if ((en.debug('instance.setQueue()', e), this._isPlaybackSupported()))
          return this._isStationQueueOptions(e)
            ? (en.warn('setQueue options contained a station queue request. Changing to setStationQueue mode.'),
              this.setStationQueue(e))
            : (this._signalChangeItemIntent(),
              this.deferPlayback(),
              yield this._updatePlaybackController(this._getPlaybackControllerByType(Ja.serial)),
              (s = yield this._playbackController.setQueue(e)),
              void 0 !== e.repeatMode && (this._playbackController.repeatMode = e.repeatMode),
              void 0 !== e.autoplay &&
                (logDeprecation('autoplay', { message: 'autoplay has been deprecated, use startPlaying instead' }),
                void 0 === e.startPlaying && (e.startPlaying = e.autoplay)),
              e.startPlaying && (yield this.play()),
              s)
        en.warn('Playback is not supported')
      })
    }
    setStationQueue(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (!this._isPlaybackSupported()) return
        yield this._validateAuthorization(!0),
          this._signalChangeItemIntent(),
          this.deferPlayback(),
          (e = parseQueueURLOption(e)),
          yield this._updatePlaybackController(this._getPlaybackControllerByType(Ja.continuous))
        const s = this._playbackController.setQueue(e)
        return (
          void 0 !== e.autoplay &&
            (logDeprecation('autoplay', { message: 'autoplay has been deprecated, use startPlaying instead' }),
            void 0 === e.startPlaying && (e.startPlaying = e.autoplay)),
          e.startPlaying && (yield this.play()),
          s
        )
      })
    }
    setPresentationMode(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._mediaItemPlayback.setPresentationMode(e)
      })
    }
    skipToNextItem() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          yield this._validateAuthorization(),
            this._signalIntent({
              endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            })
          try {
            yield this._playbackController.skipToNextItem()
          } catch (B) {
            this._handlePlaybackError(B)
          }
        }
      })
    }
    skipToPreviousItem() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          yield this._validateAuthorization(),
            this._signalIntent({
              endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
            })
          try {
            yield this._playbackController.skipToPreviousItem()
          } catch (B) {
            this._handlePlaybackError(B)
          }
        }
      })
    }
    seekForward() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          yield this._validateAuthorization()
          try {
            this._signalIntent({
              endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            }),
              yield this._playbackController.seekForward()
          } catch (B) {
            this._handlePlaybackError(B)
          }
        }
      })
    }
    seekBackward() {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          yield this._validateAuthorization()
          try {
            yield this._playbackController.seekBackward()
          } catch (B) {
            this._handlePlaybackError(B)
          }
        }
      })
    }
    showPlaybackTargetPicker() {
      this._playbackController.showPlaybackTargetPicker()
    }
    stop(e) {
      var s
      return __awaiter$4(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          this._signalIntent({
            endReasonType: null == e ? void 0 : e.endReasonType,
            userInitiated: null === (s = null == e ? void 0 : e.userInitiated) || void 0 === s || s,
          })
          try {
            yield this._playbackController.stop(e)
          } catch (B) {
            this._handlePlaybackError(B)
          }
        }
      })
    }
    unauthorize() {
      return __awaiter$4(this, void 0, void 0, function* () {
        return nn.unauthorize()
      })
    }
    unmute() {
      return this._mediaItemPlayback.unmute()
    }
    _createPlayerControllerOptions() {
      return {
        tokens: nn,
        bag: sn,
        playbackServices: {
          getRTCStreamingTracker: () => {
            var e
            return null === (e = this._services.playActivity) || void 0 === e
              ? void 0
              : e.getTrackerByType(RTCStreamingTracker)
          },
          hasMusicSubscription: hasMusicSubscription,
          playMediaItem: (e, s, n, d) => playMediaItem(this._services.apiManager, e, s, n, d),
          prepareForEncryptedPlayback: (e, s) => prepareForEncryptedPlayback(this._services.apiManager, e, s),
          requiresHlsJs: requiresHlsJs,
        },
        services: this._services,
        context: this.context,
        autoplayEnabled: this.autoplayEnabled,
        privateEnabled: this.privateEnabled,
        siriInitiated: this.siriInitiated,
        storekit: null == nn ? void 0 : nn.storekit,
      }
    }
    _getPlaybackControllerByType(e) {
      const s = this._playbackControllers[e]
      if (s) return s
      let n
      switch (e) {
        case Ja.serial:
          n = new SerialPlaybackController(this._createPlayerControllerOptions())
          break
        case Ja.continuous:
          n = new ContinuousPlaybackController(this._createPlayerControllerOptions())
          break
        default:
          throw new MKError(MKError.UNSUPPORTED_ERROR, 'Unsupported controller requested: ' + e)
      }
      return (this._playbackControllers[e] = n), n
    }
    _handlePlaybackError(e) {
      if ((en.error('mediaPlaybackError', e), Ro.includes(e.name))) throw e
      this._playbackErrorDialog && !Fe && MKDialog.presentError(e)
    }
    _initializeEventHandling() {
      ;[
        or.authorizationStatusDidChange,
        or.storefrontCountryCodeDidChange,
        or.storefrontIdentifierDidChange,
        or.userTokenDidChange,
        or.eligibleForSubscribeView,
      ].forEach((e) => {
        nn.storekit.addEventListener(e, (s) => this._services.dispatcher.publish(e, s))
      }),
        nn.storekit.addEventListener(or.userTokenDidChange, () => {
          this._whenConfigured &&
            this._whenConfigured
              .then(() => {
                this._configurePlayActivity().catch()
              })
              .catch()
        })
      const s = this._services.dispatcher
      s.subscribe(or.mediaPlaybackError, (e, s) => this._handlePlaybackError(s)),
        s.subscribe(or.playbackStateDidChange, (s, n) => {
          n.state === e.PlaybackStates.paused &&
            (en.debug('mk: playbackStateDidChange callback - calling storekit.presentSubscribeViewForEligibleUsers'),
            nn.storekit.presentSubscribeViewForEligibleUsers({ state: n.state, item: this.nowPlayingItem }, !1))
        })
      const n = Qe[this.storefrontId.toUpperCase()],
        d = Ke[n]
      s.subscribe(Hs, (e, n) => {
        n.resolveAdamIdFromStorefront(d), s.publish(or.timedMetadataDidChange, n)
      })
    }
    _configureLogger(e) {
      e.debug && ((en.enabled = !0), (en.level = parseInt(e.logLevel, 10) || 1))
    }
    _configurePlayActivity() {
      return __awaiter$4(this, void 0, void 0, function* () {
        void 0 !== this._services.playActivity &&
          (yield this._services.playActivity.configure(this, { services: this._services }))
      })
    }
    _isPlaybackSupported() {
      return !Fe || (en.warn('Media playback is not supported in Node environments.'), !1)
    }
    _isStationQueueOptions(e) {
      return !(
        !((e) =>
          !!e && (!!isIdentityQueue(e) || !!isQueueURLOption(e) || Object.keys(no).some((s) => void 0 !== e[s])))(
          (e = parseQueueURLOption(e))
        ) ||
        ((e) => {
          if (!e) return !1
          if (isQueueURLOption(e)) return !0
          if (isQueueItems(e)) return !0
          return Object.keys(lo)
            .concat(Object.keys(co))
            .some((s) => void 0 !== e[s])
        })(e)
      )
    }
    _updatePlaybackController(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        en.debug('mk: _updatePlaybackController', e),
          this._playbackControllerInternal !== e &&
            (this._playbackControllerInternal && (yield this._playbackControllerInternal.deactivate()),
            (this._playbackController = e))
      })
    }
    _signalChangeItemIntent() {
      this._signalIntent({ endReasonType: e.PlayActivityEndReasonType.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM })
    }
    _signalIntent(e) {
      this.services.dispatcher.publish(Ze.userActivityIntent, Object.assign({ userInitiated: !0 }, e))
    }
    _validateAuthorization(s = !1) {
      return __awaiter$4(this, void 0, void 0, function* () {
        ;(s || this.playbackMode === e.PlaybackMode.FULL_PLAYBACK_ONLY) &&
          ((void 0 !== this._playbackControllerInternal && this._playbackControllerInternal.isReady) ||
            (yield this.authorize()))
      })
    }
  }
  function dispatchDocumentEvent(e) {
    if (Fe) return
    const s = new Event(e, { bubbles: !0, cancelable: !0 })
    setTimeout(() => document.dispatchEvent(s))
  }
  __decorate$2(
    [
      AsyncDebounce(250, { isImmediate: !0, cancelledValue: void 0 }),
      __metadata$2('design:type', Function),
      __metadata$2('design:paramtypes', [Object]),
      __metadata$2('design:returntype', Promise),
    ],
    MKInstance.prototype,
    'pause',
    null
  ),
    __decorate$2(
      [
        AsyncDebounce(250, { isImmediate: !0, cancelledValue: void 0 }),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', Promise),
      ],
      MKInstance.prototype,
      'play',
      null
    ),
    __decorate$2(
      [
        SerialAsync('skip'),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', Promise),
      ],
      MKInstance.prototype,
      'skipToNextItem',
      null
    ),
    __decorate$2(
      [
        SerialAsync('skip'),
        __metadata$2('design:type', Function),
        __metadata$2('design:paramtypes', []),
        __metadata$2('design:returntype', Promise),
      ],
      MKInstance.prototype,
      'skipToPreviousItem',
      null
    )
  const Co = 'undefined' != typeof window && 'undefined' != typeof document
  let Mo = !1
  const No = []
  function configure$2(e, s = MKInstance, n) {
    return __awaiter$4(this, void 0, void 0, function* () {
      if (!e) throw new MKError(MKError.INVALID_ARGUMENTS, 'configuration required')
      const d = {},
        { developerToken: h, mergeQueryParams: p } = e
      if (!h) throw new MKError(MKError.CONFIGURATION_ERROR, 'Missing developer token')
      p &&
        Co &&
        window.location &&
        (d.linkParameters = Object.assign(
          Object.assign({}, e.linkParameters || {}),
          parseQueryParams(window.location.href)
        )),
        yield findKeySystemPreference()
      const y = new s(h, Object.assign(Object.assign({}, e), d))
      return (
        Mo ||
          (yield (function () {
            return __awaiter$4(this, void 0, void 0, function* () {
              const e = No.map((e) => e.cleanup())
              yield Promise.all(e), No.splice(0, No.length)
            })
          })()),
        n && (yield n(y)),
        No.push(y),
        dispatchDocumentEvent(or.configured),
        y
      )
    })
  }
  function getInstances() {
    return No
  }
  function transformStoreData(e) {
    const s = Object.assign({}, e),
      { href: n } = s
    return (
      void 0 !== n && (delete s.href, (s.attributes = Object.assign(Object.assign({}, s.attributes), { href: n }))), s
    )
  }
  Co &&
    (asAsync(
      (function () {
        var e
        return __awaiter$4(this, void 0, void 0, function* () {
          if (Fe) return
          const s = findScript('musickit.js')
          if ('' !== (null === (e = null == s ? void 0 : s.dataset) || void 0 === e ? void 0 : e.webComponents)) return
          const n = 'noModule' in s,
            d = `components/musickit-components/musickit-components${n ? '.esm' : ''}.js`,
            h = /* 'https:' + cdnBaseURL(d) + */ location.protocol + '//' + location.host + '/' + d,
            p = {}
          n && (p.type = 'module'),
            s.hasAttribute('async') && (p.async = ''),
            s.hasAttribute('defer') && (p.defer = ''),
            yield loadScript(h, p),
            dispatchDocumentEvent(or.webComponentsLoaded)
        })
      })()
    ),
    dispatchDocumentEvent(or.loaded))
  const Do = ['extend', 'include', 'l', 'platform', 'views']
  class LocalDataStore {
    constructor(e = {}) {
      this.enableDataStore = !1
      let s = !1
      e.features &&
        e.features.hasOwnProperty('api-data-store') &&
        (this.enableDataStore = !!e.features['api-data-store']),
        e.features &&
          e.features.hasOwnProperty('disable-data-store-record-reuse') &&
          (s = !!e.features['disable-data-store-record-reuse']),
        this.enableDataStore &&
          ((this._store = e.store || new DataStore({ shouldDisableRecordReuse: s })),
          (this._store.mapping = transformStoreData))
    }
    get hasDataStore() {
      return this.enableDataStore && void 0 !== this._store
    }
    delete(e, s) {
      this.hasDataStore && this._store.remove(e, s)
    }
    read(e, s, n, d) {
      d || 'function' != typeof n || ((d = n), (n = void 0))
      const h = {}
      let p = !1
      if (
        (n &&
          ((p = Object.keys(n).some((e) => /^(fields|extend)/.test(e))),
          n.views && (h.views = n.views),
          n.include && (h.relationships = n.include)),
        this.hasDataStore && !p)
      ) {
        let d,
          p = []
        if (
          (n && (p = Object.keys(n).reduce((e, s) => (-1 === Do.indexOf(s) && e.push([s, n[s]]), e), p)),
          (d = p && 1 === p.length ? this._store.query(p[0][0], p[0][1]) : this._store.peek(e, s, h)),
          Array.isArray(d))
        ) {
          if (!n && d.length) return d
        } else if (d) return d
      }
      if ('function' == typeof d) return d()
    }
    write(e) {
      return this._prepareDataForDataStore(e, (e) => this._store.save(e))
    }
    parse(e) {
      return this._prepareDataForDataStore(e, (e) => this._store.populateDataRecords(e, {}))
    }
    _prepareDataForDataStore(e, s) {
      return this.hasDataStore
        ? Array.isArray(e)
          ? s({ data: e })
          : Object.keys(e).reduce((n, d) => {
              let h = e[d]
              return h.hasOwnProperty('data') && (n[d] = s({ data: h.data })), 'meta' === d && (n[d] = e[d]), n
            }, {})
        : e
    }
  }
  var Lo, xo
  !(function (e) {
    ;(e[(e.Global = 0)] = 'Global'),
      (e.Catalog = 'catalog'),
      (e.Personalized = 'me'),
      (e.Editorial = 'editorial'),
      (e.Engagement = 'engagement'),
      (e.Social = 'social')
  })(Lo || (Lo = {})),
    (function (e) {
      ;(e.songs = 'songs'),
        (e.albums = 'albums'),
        (e.playlists = 'playlists'),
        (e.stations = 'stations'),
        (e['music-videos'] = 'music-videos'),
        (e['library-music-videos'] = 'library-music-videos'),
        (e['library-playlists'] = 'library-playlists'),
        (e['library-songs'] = 'library-songs')
    })(xo || (xo = {}))
  class API extends class extends class {
    constructor(e, s) {
      var n
      if (((this.prefix = ''), (this.method = 'GET'), (this.url = e), (s = s || {}).storage && s.underlyingStorage))
        throw new Error('only pass storage OR underlyingStorage in sessionOptions to URLSession')
      const d = s.underlyingStorage || {}
      if (
        ((this.storage = s.storage || new GenericStorage(d)),
        (this.networkCache = new NetworkCache({
          storage: this.storage,
          prefix: this.prefix,
          cacheKeyFunction: this._key.bind(this),
        })),
        (this.ttl = s.ttl || 3e5),
        (this._fetchOptions = Object.assign({}, s.fetchOptions)),
        'function' != typeof s.fetch && 'function' != typeof fetch)
      )
        throw new Error('window.fetch is not defined')
      ;(this._fetchFunction = null !== (n = s.fetch) && void 0 !== n ? n : fetch.bind(window)),
        (this.headers = this._fetchOptions.headers || new Headers()),
        delete this._fetchOptions.headers
    }
    clearCacheForRequest(e, s) {
      'object' == typeof e && ((s = e), (e = void 0))
      const n = this.constructURL(e, s)
      this.networkCache.removeItemsMatching(n)
    }
    request(e, s, n) {
      var d
      return __awaiter$3(this, void 0, void 0, function* () {
        n || 'object' != typeof e || ((n = s || {}), (s = e), (e = void 0))
        let h = {}
        'object' ==
        typeof (n = Object.assign(
          Object.assign({ method: this.method, headers: this.headers, reload: !1 }, this._fetchOptions),
          n
        )).queryParameters
          ? ((h = n.queryParameters), delete n.queryParameters)
          : ('GET' !== n.method && 'DELETE' !== n.method) || (h = s)
        const p = this.constructURL(e, h)
        let { method: y, reload: m = !1, useRawResponse: g } = n
        if (((n.headers = this.buildHeaders(n)), delete n.reload, delete n.useRawResponse, 'GET' === y && !m)) {
          let e = this.getCacheItem(p)
          if (e) return Promise.resolve(e)
        }
        s &&
          Object.keys(s).length &&
          ('POST' === y || 'PUT' === y) &&
          ((n.body = n.body || s),
          n.contentType === At.FORM
            ? ((n.body = urlEncodeParameters(n.body)), n.headers.set('Content-Type', At.FORM))
            : ((n.body = JSON.stringify(n.body)), n.headers.set('Content-Type', At.JSON)))
        const v = yield this._fetchFunction(p, n)
        if (!v.ok) return Promise.reject(v)
        let _
        try {
          _ = yield v.json()
        } catch (T) {
          _ = {}
        }
        if (_.errors) return Promise.reject(_.errors)
        let b = g ? _ : _.results || _.data || _
        if ('GET' === y) {
          const e = null !== (d = getMaxAgeFromHeaders(v.headers)) && void 0 !== d ? d : this.ttl
          this.setCacheItem(p, b, e)
        }
        return b
      })
    }
    buildHeaders({ headers: e, reload: s = !1 } = {}) {
      void 0 === e && (e = this.headers)
      const n = ((e) => new e.constructor(e))(e)
      return s && n.set('Cache-Control', 'no-cache'), n
    }
    constructURL(e, s) {
      return (n = this.url), (d = s), addQueryParamsToURL(addPathToURL(n, e), d)
      var n, d
    }
    getCacheItem(e) {
      const s = this.networkCache.storage,
        n = `${this.prefix}${this.prefix}cache-mut`,
        d = s.getItem(n) || null,
        h = this.headers.get('Music-User-Token') || this.headers.get('Media-User-Token') || null
      return (
        h !== d && (this.networkCache.clear(), null === h ? s.removeItem(n) : s.setItem(n, h)),
        this.networkCache.getItem(e)
      )
    }
    setCacheItem(e, s, n = this.ttl) {
      this.networkCache.setItem(e, s, n)
    }
    clearNetworkCache() {
      this.networkCache.clear()
    }
    _key(e, s) {
      let n = (function (e) {
        try {
          const [s, n] = e.split('?', 2)
          if (void 0 === n) return s
          const d = n.split('&').map((e) => e.split('=', 2)),
            h = [...Array(d.length).keys()]
          h.sort((e, s) => {
            const n = d[e],
              h = d[s]
            return n < h ? -1 : n > h ? 1 : e - s
          })
          const p = h.map((e) => d[e])
          return `${s}?${p.map(([e, s]) => (void 0 !== s ? `${e}=${s}` : e)).join('&')}`
        } catch (tn) {
          return e
        }
      })(e)
        .toLowerCase()
        .replace(this.url, '')
      return `${this.prefix}${n.replace(/[^-_0-9a-z]{1,}/g, '.')}`
    }
  } {
    constructor(e, s, n) {
      super(e, n),
        (this._developerToken = new DeveloperToken(s)),
        this.headers.set('Authorization', 'Bearer ' + this.developerToken),
        (n = n || {}),
        (this.userToken = n.userToken),
        this.userToken && this.headers.set('Media-User-Token', this.userToken)
    }
    get developerToken() {
      return this._developerToken.token
    }
  } {
    constructor(e, s, n, d, h, p, y = {}, m) {
      super(e, s, Object.assign(Object.assign({}, m), { userToken: d, storage: p })),
        (this.storefrontId = tr.ID),
        (this.resourceRelatives = {
          artists: { albums: { include: 'tracks' }, playlists: { include: 'tracks' }, songs: null },
        }),
        (this.defaultIncludePaginationMetadata = y.features && y.features.hasOwnProperty('api-pagination-metadata')),
        (this._store = new LocalDataStore(y)),
        n && (this.storefrontId = n.toLowerCase()),
        d && h && (this.userStorefrontId = h.toLowerCase()),
        (this.v3 = new MediaAPIV3({ developerToken: s, mediaUserToken: d, storefrontId: n }))
    }
    get needsEquivalents() {
      const { userStorefrontId: e } = this
      return void 0 !== e && '' !== e && e !== this.storefrontId
    }
  }
  let Uo
  const configure$1 = (e, s = !1) =>
      __awaiter$4(void 0, void 0, void 0, function* () {
        if (Uo && !s) {
          if (void 0 === e.storefrontId || e.storefrontId === Uo.storefrontId) return Uo
          Uo.clear()
        }
        return (Uo = new MediaAPIService(e.dispatcher)), Uo.configure(e)
      }),
    $o = {
      album: {
        isPlural: !1,
        apiMethod: 'album',
        relationshipMethod: { method: 'albumRelationship', relationship: 'tracks' },
      },
      albums: { isPlural: !0, apiMethod: 'albums' },
      musicVideo: { isPlural: !1, apiMethod: 'musicVideo' },
      musicVideos: { isPlural: !0, apiMethod: 'musicVideos' },
      musicMovie: { isPlural: !1, apiMethod: 'musicMovie' },
      musicMovies: { isPlural: !0, apiMethod: 'musicMovies' },
      playlist: {
        isPlural: !1,
        apiMethod: 'playlist',
        relationshipMethod: { method: 'playlistRelationship', relationship: 'tracks' },
      },
      playlists: { isPlural: !0, apiMethod: 'playlists' },
      song: { isPlural: !1, apiMethod: 'song' },
      songs: { isPlural: !0, apiMethod: 'songs' },
    }
  class MediaAPIService {
    constructor(e) {
      if (((this._dispatcher = e), !sn.urls.mediaApi)) throw new Error('bag.urls.mediaApi is not configured')
      ;(this.url = sn.urls.mediaApi),
        (this.namedQueueOptions = $o),
        this._dispatcher.subscribe(Ze.apiStorefrontChanged, (e, { storefrontId: s }) =>
          __awaiter$4(this, void 0, void 0, function* () {
            yield this._updateStorefrontId(s)
          })
        )
    }
    get api() {
      if (void 0 === this._api)
        throw new MKError(MKError.CONFIGURATION_ERROR, 'The API cannot be accessed before it is configured.')
      return this._api
    }
    get storefrontId() {
      return this.store && this.store.storefrontId
    }
    configure(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        if (void 0 !== e.store)
          return (
            (this.store = e.store),
            [or.userTokenDidChange, or.storefrontIdentifierDidChange].forEach((e) => {
              this.store.storekit.addEventListener(e, () => this.resetAPI())
            }),
            this._initializeAPI(e),
            this
          )
      })
    }
    clear() {
      this.api && this.api.clearNetworkCache && this.api.clearNetworkCache()
    }
    getAPIForItem(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        return v(e) ? (yield this.store.authorize(), this.api.library || this.api) : this.api
      })
    }
    resetAPI() {
      return __awaiter$4(this, void 0, void 0, function* () {
        this.clear(), this._initializeAPI()
      })
    }
    _initializeAPI(e) {
      if (void 0 !== (null == e ? void 0 : e.api)) return void (this._api = e.api)
      const s = (e && e.store) || this.store
      if (void 0 === s) return
      const n = sn.features['api-session-storage'] ? sessionStorage : void 0,
        d = (e && e.storefrontId) || s.storefrontId,
        h = new API(
          this.url,
          s.developerToken,
          d,
          s.storekit.userToken,
          s.storekit.storefrontCountryCode,
          n,
          sn,
          e && e.apiOptions && e.apiOptions.sessionOptions
        )
      this._api = h.v3
    }
    _updateStorefrontId(e) {
      return __awaiter$4(this, void 0, void 0, function* () {
        ;(this.api && e === this.api.storefrontId) ||
          (yield this.configure({ dispatcher: this._dispatcher, store: this.store, storefrontId: e }))
      })
    }
  }
  function filterLinks(e) {
    return __awaiter(this, void 0, void 0, function* () {
      const s = yield (function () {
          return __awaiter(this, void 0, void 0, function* () {
            const e = [
              {
                feature: 'album-song',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/albums?/(?:[^/]+/)?(?<album>\\d+)$',
                requiredQueryParams: { i: '(?<identifier>\\d+)' },
                mediaAPI: { resources: ['songs'] },
              },
              {
                feature: 'albums',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/albums?/(?:[^/]+/)?(?<identifier>\\d+)$',
                mediaAPI: { resources: ['albums'] },
              },
              {
                feature: 'algo-stations',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/stations?/(?:[^/]+/)?(?<identifier>(?:ra|st).\\d+)',
                mediaAPI: { resources: ['stations'] },
              },
              {
                feature: 'artist-default-playable-content',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/artists?/(?:[^/]+/)?(?<identifier>\\d+)$',
                mediaAPI: { resources: ['artists', 'default-playable-content'] },
              },
              {
                feature: 'genre-stations',
                regex: 'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/genre-stations?',
                mediaAPI: {
                  resources: ['stations'],
                  parameterMapping: {
                    genres: 'filter[genres]',
                    eras: 'filter[eras]',
                    tags: 'filter[tags]',
                    moods: 'filter[moods]',
                  },
                },
              },
              {
                feature: 'library-albums',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/library/albums?/(?:[^/]+/)?(?<identifier>(?:l).[a-zA-Z0-9-]+)$',
                mediaAPI: { resources: ['albums'] },
              },
              {
                feature: 'library-album-song',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/library/albums?/(?:[^/]+/)?(?<album>(?:l).[a-zA-Z0-9-]+)$',
                requiredQueryParams: { i: '(?<identifier>i\\.[a-zA-Z0-9-]+)' },
                mediaAPI: { resources: ['songs'] },
              },
              {
                feature: 'library-playlists',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/library/playlists?/(?:[^/]+/)?(?<identifier>(?:p).[a-zA-Z0-9-]+)$',
                mediaAPI: { resources: ['playlists'] },
              },
              {
                feature: 'music-videos',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/music-videos?/(?:[^/]+/)?(?<identifier>\\d+)$',
                mediaAPI: { resources: ['musicVideos'] },
              },
              {
                feature: 'personal-general-radio',
                regex: 'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/stations?/me$',
                mediaAPI: { resources: ['stations'], parameters: { 'filter[identity]': 'personal' } },
              },
              {
                feature: 'personal-mixes',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/(?:personal-)?mix/(?:[^/]+/)?(?<identifier>mx.(?:\\d{1,2}|rp-\\d{4}))$',
                mediaAPI: { resources: ['playlists'] },
              },
              {
                feature: 'playlists',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/playlists?/(?:[^/]+/)?(?<identifier>(?:pl).[a-zA-Z0-9-]+)$',
                mediaAPI: { resources: ['playlists'] },
              },
              {
                feature: 'steering-request',
                regex: 'http(?:s)?://(?<realm>itunes|music).apple.com/me/stations?/change-station/?$',
                mediaAPI: { resources: ['stations'] },
              },
            ].map(
              (e) => (
                (e.regex = new RegExp(e.regex)),
                e.requiredQueryParams &&
                  (e.requiredQueryParams = Object.keys(e.requiredQueryParams).reduce(
                    (s, n) => ((s[n] = new RegExp(e.requiredQueryParams[n])), s),
                    {}
                  )),
                e
              )
            )
            return Promise.resolve(e)
          })
        })(),
        n = parseQueryParams(e)
      return s.reduce((s, d) => {
        if (
          (function (e, s, n = {}) {
            const [d] = e.split(/\?|\#|\&/),
              h = s.regex.test(d)
            return h && s.requiredQueryParams
              ? Object.keys(s.requiredQueryParams).every((e) => {
                  const d = n[e]
                  return s.requiredQueryParams[e].test(d)
                })
              : h
          })(e, d, n)
        ) {
          if (s.length > 0)
            if (d.requiredQueryParams) s = s.filter((e) => e.requiredQueryParams)
            else if (s.some((e) => e.requiredQueryParams)) return s
          d.requiredQueryParams
            ? (d.mediaAPI.parameters = Object.keys(d.requiredQueryParams).reduce((e, s) => ((e[s] = n[s]), e), {}))
            : d.mediaAPI.parameterMapping && (d.mediaAPI.parameters = transform$8(d.mediaAPI.parameterMapping, n, !0)),
            s.push(d)
        }
        return s
      }, [])
    })
  }
  const Bo = /^http(?:s)?\:\/\/(?:itunes|(embed\.)?(music|podcasts|tv))\.apple\.com/i,
    Fo = [
      'allow-forms',
      'allow-popups',
      'allow-same-origin',
      'allow-scripts',
      'allow-storage-access-by-user-activation',
      'allow-top-navigation-by-user-activation',
    ],
    jo = ['autoplay *', 'encrypted-media *', 'fullscreen *']
  const Ko = MKError.errors
  class MusicKitInstance extends MKInstance {
    addToLibrary(e, s) {
      return __awaiter$4(this, void 0, void 0, function* () {
        yield this.authorize(), s || (s = /[a-z]{2}\.[a-z0-9\-]+/i.test(e) ? 'playlists' : 'albums')
        let n
        return (
          this.api.music &&
            (n = this.api.music('/v1/me/library', { [`ids[${s}]`]: e }, { fetchOptions: { method: 'POST' } })),
          n
        )
      })
    }
    changeToMediaItem(e) {
      const s = Object.create(null, { changeToMediaItem: { get: () => super.changeToMediaItem } })
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._checkNeedsEquivalent(), s.changeToMediaItem.call(this, e)
      })
    }
    play() {
      const e = Object.create(null, { play: { get: () => super.play } })
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._checkNeedsEquivalent(), e.play.call(this)
      })
    }
    playMediaItem(e) {
      const s = Object.create(null, { playMediaItem: { get: () => super.playMediaItem } })
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._checkNeedsEquivalent(), s.playMediaItem.call(this, e)
      })
    }
    setQueue(e) {
      const s = Object.create(null, { setQueue: { get: () => super.setQueue } })
      return __awaiter$4(this, void 0, void 0, function* () {
        return this._checkNeedsEquivalent(), s.setQueue.call(this, e)
      })
    }
    _checkNeedsEquivalent() {
      var e
      if (!this.previewOnly && (null === (e = this.api) || void 0 === e ? void 0 : e.needsEquivalents))
        throw new MKError(MKError.CONTENT_EQUIVALENT)
    }
  }
  function configure(e) {
    return __awaiter$4(this, void 0, void 0, function* () {
      const s = new PAFTrackerAPI()
      e.playActivityAPI = s
      return yield configure$2(e, MusicKitInstance, (s) =>
        __awaiter$4(this, void 0, void 0, function* () {
          const n = { apiType: Ao.MEDIA, configureFn: configure$1, options: {} }
          yield s.configure([n]),
            e.declarativeMarkup &&
              'undefined' != typeof console &&
              console.warn &&
              console.warn('The declarativeMarkup configuration option has been removed in MusicKit JS V3')
        })
      )
    })
  }
  if (Co) {
    const e = (function () {
        function meta(e) {
          if (Fe) return
          const s = document.head.querySelector(`meta[name=${e}]`)
          return (null == s ? void 0 : s.content) || void 0
        }
        const e = meta('apple-music-developer-token') || meta('JWT'),
          s = meta('apple-music-app-build') || meta('version'),
          n = meta('apple-music-app-name'),
          d = meta('apple-music-app-version')
        let h
        return (
          (e || s || n || d) &&
            ((h = {}),
            e && (h.developerToken = e),
            (s || n || d) && ((h.app = {}), s && (h.app.build = s), n && (h.app.name = n), d && (h.app.version = d))),
          h
        )
      })(),
      s = /interactive|complete|loaded/.test(document.readyState)
    e &&
      e.developerToken &&
      0 === getInstances().length &&
      (s ? asAsync(configure(e)) : document.addEventListener('DOMContentLoaded', () => configure(e)))
  }
  ;(e.Events = or),
    (e.MKError = MKError),
    (e.MediaItem = MediaItem),
    (e.MusicKitInstance = MusicKitInstance),
    (e.VideoTypes = {
      movie: !0,
      musicVideo: !0,
      musicMovie: !0,
      trailer: !0,
      tvEpisode: !0,
      uploadedVideo: !0,
      'uploaded-videos': !0,
      'music-videos': !0,
      'music-movies': !0,
      'tv-episodes': !0,
      Episode: !0,
      Movie: !0,
      Show: !0,
      Vod: !0,
      EditorialVideoClip: !0,
      RealityVideo: !0,
    }),
    (e.configure = configure),
    (e.enableMultipleInstances = function () {
      Mo = !0
    }),
    (e.errors = Ko),
    (e.formatArtworkURL = formatArtworkURL),
    (e.formatMediaTime = function (e, s = ':') {
      const { hours: n, minutes: d } = formattedSeconds(e)
      e = Math.floor((e % 3600) % 60)
      const h = []
      return (
        n ? (h.push('' + n), h.push(d < 10 ? '0' + d : '' + d)) : h.push('' + d),
        h.push(e < 10 ? '0' + e : '' + e),
        h.join(s)
      )
    }),
    (e.formattedMediaURL = formattedMediaURL),
    (e.formattedMilliseconds = function (e) {
      return formattedSeconds(e / 1e3)
    }),
    (e.formattedSeconds = formattedSeconds),
    (e.generateEmbedCode = function (e, s = { height: '450', width: '660' }) {
      var n, d
      if (!Bo.test(e)) throw new Error('Invalid content url')
      let h = null !== (n = s.height) && void 0 !== n ? n : '450',
        p = null !== (d = s.width) && void 0 !== d ? d : '660'
      const { kind: y, isUTS: m } = formattedMediaURL(e)
      'song' === y
        ? (h = '150')
        : 'episode' === y
        ? (h = '175')
        : 'post' === y && (h = '' + Math.round(0.5625 * parseInt(p, 10))),
        (h = ('' + h).replace(/(\d+)px/i, '$1')),
        (p = ('' + p).replace(/^(\d+)(?!px)%?$/i, '$1px'))
      const g = `width:100%;${p ? 'max-width:' + p : ''};overflow:hidden;background:transparent;`,
        v = window.localStorage.getItem('mk-generate-swizzle') || 'https://embed.music.apple.com'
      return `<iframe ${[
        `allow="${jo.join('; ')}"`,
        'frameborder="0"',
        h ? `height="${h}"` : '',
        `style="${g}"`,
        `sandbox="${Fo.join(' ')}"`,
        `src="${e.replace(Bo, v)}"`,
      ].join(' ')}></iframe>`
    }),
    (e.getHlsJsCdnConfig = getHlsJsCdnConfig),
    (e.getInstance = function (e) {
      if (0 !== No.length) return void 0 === e ? No[No.length - 1] : No.find((s) => s.id === e)
    }),
    (e.getInstances = getInstances),
    (e.getPlayerType = getPlayerType),
    (e.resolveCanonical = function (e) {
      return __awaiter(this, void 0, void 0, function* () {
        return {
          results: { links: yield filterLinks(e) },
          meta: { originalUrl: e, originalQueryParams: parseQueryParams(e) },
        }
      })
    }),
    Object.defineProperty(e, '__esModule', { value: !0 })
})
