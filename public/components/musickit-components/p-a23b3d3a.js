const e = 'musickit-components'
let t,
  n,
  l,
  s = !1,
  o = !1,
  i = !1,
  r = !1,
  c = null,
  a = !1
const f = 'undefined' != typeof window ? window : {},
  u = f.document || { head: {} },
  d = {
    t: 0,
    l: '',
    jmp: (e) => e(),
    raf: (e) => requestAnimationFrame(e),
    ael: (e, t, n, l) => e.addEventListener(t, n, l),
    rel: (e, t, n, l) => e.removeEventListener(t, n, l),
    ce: (e, t) => new CustomEvent(e, t),
  },
  $ = (e) => Promise.resolve(e),
  p = (() => {
    try {
      return new CSSStyleSheet(), 'function' == typeof new CSSStyleSheet().replace
    } catch (e) {}
    return !1
  })(),
  m = (e, t, n) => {
    n &&
      n.map(([n, l, s]) => {
        const o = h(e, n),
          i = w(t, s),
          r = y(n)
        d.ael(o, l, i, r), (t.o = t.o || []).push(() => d.rel(o, l, i, r))
      })
  },
  w = (e, t) => (n) => {
    try {
      256 & e.t ? e.i[t](n) : (e.u = e.u || []).push([t, n])
    } catch (l) {
      pe(l)
    }
  },
  h = (e, t) => (4 & t ? u : 8 & t ? f : e),
  y = (e) => 0 != (2 & e),
  b = 'http://www.w3.org/1999/xlink',
  g = new WeakMap(),
  k = (e) => 'sc-' + e.$,
  v = {},
  S = (e) => 'object' == (e = typeof e) || 'function' === e,
  j = (e, t, ...n) => {
    let l = null,
      s = null,
      o = null,
      i = !1,
      r = !1,
      c = []
    const a = (t) => {
      for (let n = 0; n < t.length; n++)
        (l = t[n]),
          Array.isArray(l)
            ? a(l)
            : null != l &&
              'boolean' != typeof l &&
              ((i = 'function' != typeof e && !S(l)) && (l += ''),
              i && r ? (c[c.length - 1].p += l) : c.push(i ? O(null, l) : l),
              (r = i))
    }
    if ((a(n), t)) {
      t.key && (s = t.key), t.name && (o = t.name)
      {
        const e = t.className || t.class
        e &&
          (t.class =
            'object' != typeof e
              ? e
              : Object.keys(e)
                  .filter((t) => e[t])
                  .join(' '))
      }
    }
    const f = O(e, null)
    return (f.m = t), c.length > 0 && (f.h = c), (f.g = s), (f.k = o), f
  },
  O = (e, t) => ({ t: 0, v: e, p: t, S: null, h: null, m: null, g: null, k: null }),
  C = {},
  M = (e, t, n, l, s, o) => {
    if (n !== l) {
      let r = $e(e, t),
        c = t.toLowerCase()
      if ('class' === t) {
        const t = e.classList,
          s = x(n),
          o = x(l)
        t.remove(...s.filter((e) => e && !o.includes(e))), t.add(...o.filter((e) => e && !s.includes(e)))
      } else if ('style' === t) {
        for (const t in n) (l && null != l[t]) || (t.includes('-') ? e.style.removeProperty(t) : (e.style[t] = ''))
        for (const t in l)
          (n && l[t] === n[t]) || (t.includes('-') ? e.style.setProperty(t, l[t]) : (e.style[t] = l[t]))
      } else if ('key' === t);
      else if ('ref' === t) l && l(e)
      else if (r || 'o' !== t[0] || 'n' !== t[1]) {
        const a = S(l)
        if ((r || (a && null !== l)) && !s)
          try {
            if (e.tagName.includes('-')) e[t] = l
            else {
              let s = null == l ? '' : l
              'list' === t ? (r = !1) : (null != n && e[t] == s) || (e[t] = s)
            }
          } catch (i) {}
        let f = !1
        c !== (c = c.replace(/^xlink\:?/, '')) && ((t = c), (f = !0)),
          null == l || !1 === l
            ? (!1 === l && '' !== e.getAttribute(t)) || (f ? e.removeAttributeNS(b, t) : e.removeAttribute(t))
            : (!r || 4 & o || s) &&
              !a &&
              ((l = !0 === l ? '' : l), f ? e.setAttributeNS(b, t, l) : e.setAttribute(t, l))
      } else
        (t = '-' === t[2] ? t.slice(3) : $e(f, c) ? c.slice(2) : c[2] + t.slice(3)),
          n && d.rel(e, t, n, !1),
          l && d.ael(e, t, l, !1)
    }
  },
  R = /\s/,
  x = (e) => (e ? e.split(R) : []),
  T = (e, t, n, l) => {
    const s = 11 === t.S.nodeType && t.S.host ? t.S.host : t.S,
      o = (e && e.m) || v,
      i = t.m || v
    for (l in o) l in i || M(s, l, o[l], void 0, n, t.t)
    for (l in i) M(s, l, o[l], i[l], n, t.t)
  },
  L = (e, o, c, a) => {
    let f,
      d,
      $,
      p = o.h[c],
      m = 0
    if ((s || ((i = !0), 'slot' === p.v && (t && a.classList.add(t + '-s'), (p.t |= p.h ? 2 : 1))), null !== p.p))
      f = p.S = u.createTextNode(p.p)
    else if (1 & p.t) f = p.S = u.createTextNode('')
    else {
      if (
        (r || (r = 'svg' === p.v),
        (f = p.S =
          u.createElementNS(
            r ? 'http://www.w3.org/2000/svg' : 'http://www.w3.org/1999/xhtml',
            2 & p.t ? 'slot-fb' : p.v
          )),
        r && 'foreignObject' === p.v && (r = !1),
        T(null, p, r),
        null != t && f['s-si'] !== t && f.classList.add((f['s-si'] = t)),
        p.h)
      )
        for (m = 0; m < p.h.length; ++m) (d = L(e, p, m, f)), d && f.appendChild(d)
      'svg' === p.v ? (r = !1) : 'foreignObject' === f.tagName && (r = !0)
    }
    return (
      (f['s-hn'] = l),
      3 & p.t &&
        ((f['s-sr'] = !0),
        (f['s-cr'] = n),
        (f['s-sn'] = p.k || ''),
        ($ = e && e.h && e.h[c]),
        $ && $.v === p.v && e.S && P(e.S, !1)),
      f
    )
  },
  P = (e, t) => {
    d.t |= 1
    const n = e.childNodes
    for (let s = n.length - 1; s >= 0; s--) {
      const e = n[s]
      e['s-hn'] !== l && e['s-ol'] && (N(e).insertBefore(e, E(e)), e['s-ol'].remove(), (e['s-ol'] = void 0), (i = !0)),
        t && P(e, t)
    }
    d.t &= -2
  },
  U = (e, t, n, s, o, i) => {
    let r,
      c = (e['s-cr'] && e['s-cr'].parentNode) || e
    for (c.shadowRoot && c.tagName === l && (c = c.shadowRoot); o <= i; ++o)
      s[o] && ((r = L(null, n, o, e)), r && ((s[o].S = r), c.insertBefore(r, E(t))))
  },
  D = (e, t, n, l, s) => {
    for (; t <= n; ++t) (l = e[t]) && ((s = l.S), V(l), (o = !0), s['s-ol'] ? s['s-ol'].remove() : P(s, !0), s.remove())
  },
  W = (e, t) => e.v === t.v && ('slot' === e.v ? e.k === t.k : e.g === t.g),
  E = (e) => (e && e['s-ol']) || e,
  N = (e) => (e['s-ol'] ? e['s-ol'] : e).parentNode,
  A = (e, t) => {
    const n = (t.S = e.S),
      l = e.h,
      s = t.h,
      o = t.v,
      i = t.p
    let c
    null === i
      ? ((r = 'svg' === o || ('foreignObject' !== o && r)),
        'slot' === o || T(e, t, r),
        null !== l && null !== s
          ? ((e, t, n, l) => {
              let s,
                o,
                i = 0,
                r = 0,
                c = 0,
                a = 0,
                f = t.length - 1,
                u = t[0],
                d = t[f],
                $ = l.length - 1,
                p = l[0],
                m = l[$]
              for (; i <= f && r <= $; )
                if (null == u) u = t[++i]
                else if (null == d) d = t[--f]
                else if (null == p) p = l[++r]
                else if (null == m) m = l[--$]
                else if (W(u, p)) A(u, p), (u = t[++i]), (p = l[++r])
                else if (W(d, m)) A(d, m), (d = t[--f]), (m = l[--$])
                else if (W(u, m))
                  ('slot' !== u.v && 'slot' !== m.v) || P(u.S.parentNode, !1),
                    A(u, m),
                    e.insertBefore(u.S, d.S.nextSibling),
                    (u = t[++i]),
                    (m = l[--$])
                else if (W(d, p))
                  ('slot' !== u.v && 'slot' !== m.v) || P(d.S.parentNode, !1),
                    A(d, p),
                    e.insertBefore(d.S, u.S),
                    (d = t[--f]),
                    (p = l[++r])
                else {
                  for (c = -1, a = i; a <= f; ++a)
                    if (t[a] && null !== t[a].g && t[a].g === p.g) {
                      c = a
                      break
                    }
                  c >= 0
                    ? ((o = t[c]),
                      o.v !== p.v ? (s = L(t && t[r], n, c, e)) : (A(o, p), (t[c] = void 0), (s = o.S)),
                      (p = l[++r]))
                    : ((s = L(t && t[r], n, r, e)), (p = l[++r])),
                    s && N(u.S).insertBefore(s, E(u.S))
                }
              i > f ? U(e, null == l[$ + 1] ? null : l[$ + 1].S, n, l, r, $) : r > $ && D(t, i, f)
            })(n, l, t, s)
          : null !== s
          ? (null !== e.p && (n.textContent = ''), U(n, null, t, s, 0, s.length - 1))
          : null !== l && D(l, 0, l.length - 1),
        r && 'svg' === o && (r = !1))
      : (c = n['s-cr'])
      ? (c.parentNode.textContent = i)
      : e.p !== i && (n.data = i)
  },
  B = (e) => {
    let t,
      n,
      l,
      s,
      o,
      i,
      r = e.childNodes
    for (n = 0, l = r.length; n < l; n++)
      if (((t = r[n]), 1 === t.nodeType)) {
        if (t['s-sr'])
          for (o = t['s-sn'], t.hidden = !1, s = 0; s < l; s++)
            if (((i = r[s].nodeType), r[s]['s-hn'] !== t['s-hn'] || '' !== o)) {
              if (1 === i && o === r[s].getAttribute('slot')) {
                t.hidden = !0
                break
              }
            } else if (1 === i || (3 === i && '' !== r[s].textContent.trim())) {
              t.hidden = !0
              break
            }
        B(t)
      }
  },
  F = [],
  H = (e) => {
    let t,
      n,
      l,
      s,
      i,
      r,
      c = 0,
      a = e.childNodes,
      f = a.length
    for (; c < f; c++) {
      if (((t = a[c]), t['s-sr'] && (n = t['s-cr']) && n.parentNode))
        for (l = n.parentNode.childNodes, s = t['s-sn'], r = l.length - 1; r >= 0; r--)
          (n = l[r]),
            n['s-cn'] ||
              n['s-nr'] ||
              n['s-hn'] === t['s-hn'] ||
              (q(n, s)
                ? ((i = F.find((e) => e.j === n)),
                  (o = !0),
                  (n['s-sn'] = n['s-sn'] || s),
                  i ? (i.O = t) : F.push({ O: t, j: n }),
                  n['s-sr'] &&
                    F.map((e) => {
                      q(e.j, n['s-sn']) && ((i = F.find((e) => e.j === n)), i && !e.O && (e.O = i.O))
                    }))
                : F.some((e) => e.j === n) || F.push({ j: n }))
      1 === t.nodeType && H(t)
    }
  },
  q = (e, t) =>
    1 === e.nodeType
      ? (null === e.getAttribute('slot') && '' === t) || e.getAttribute('slot') === t
      : e['s-sn'] === t || '' === t,
  V = (e) => {
    e.m && e.m.ref && e.m.ref(null), e.h && e.h.map(V)
  },
  _ = (e) => fe(e).C,
  z = (e, t, n) => {
    const l = _(e)
    return { emit: (e) => G(l, t, { bubbles: !!(4 & n), composed: !!(2 & n), cancelable: !!(1 & n), detail: e }) }
  },
  G = (e, t, n) => {
    const l = d.ce(t, n)
    return e.dispatchEvent(l), l
  },
  I = (e, t) => {
    t && !e.M && t['s-p'] && t['s-p'].push(new Promise((t) => (e.M = t)))
  },
  J = (e, t) => {
    if (((e.t |= 16), !(4 & e.t))) return I(e, e.R), je(() => K(e, t))
    e.t |= 512
  },
  K = (e, t) => {
    const n = e.i
    let l
    return (
      t
        ? ((e.t |= 256), e.u && (e.u.map(([e, t]) => ne(n, e, t)), (e.u = null)), (l = ne(n, 'componentWillLoad')))
        : (l = ne(n, 'componentWillUpdate')),
      le(l, () => Q(e, n, t))
    )
  },
  Q = async (e, t, n) => {
    const l = e.C,
      s = l['s-rc']
    n &&
      ((e) => {
        const t = e.T,
          n = e.C,
          l = t.t,
          s = ((e, t) => {
            let n = k(t),
              l = he.get(n)
            if (((e = 11 === e.nodeType ? e : u), l))
              if ('string' == typeof l) {
                let t,
                  s = g.get((e = e.head || e))
                s || g.set(e, (s = new Set())),
                  s.has(n) ||
                    ((t = u.createElement('style')),
                    (t.innerHTML = l),
                    e.insertBefore(t, e.querySelector('link')),
                    s && s.add(n))
              } else e.adoptedStyleSheets.includes(l) || (e.adoptedStyleSheets = [...e.adoptedStyleSheets, l])
            return n
          })(n.shadowRoot ? n.shadowRoot : n.getRootNode(), t)
        10 & l && ((n['s-sc'] = s), n.classList.add(s + '-h'), 2 & l && n.classList.add(s + '-s'))
      })(e)
    X(e, t), s && (s.map((e) => e()), (l['s-rc'] = void 0))
    {
      const t = l['s-p'],
        n = () => Z(e)
      0 === t.length ? n() : (Promise.all(t).then(n), (e.t |= 4), (t.length = 0))
    }
  },
  X = (e, r) => {
    try {
      ;(c = r),
        (r = r.render()),
        (e.t &= -17),
        (e.t |= 2),
        ((e, r) => {
          const c = e.C,
            a = e.T,
            f = e.L || O(null, null),
            $ = ((e) => e && e.v === C)(r) ? r : j(null, null, r)
          if (
            ((l = c.tagName),
            a.P && (($.m = $.m || {}), a.P.map(([e, t]) => ($.m[t] = c[e]))),
            ($.v = null),
            ($.t |= 4),
            (e.L = $),
            ($.S = f.S = c.shadowRoot || c),
            (t = c['s-sc']),
            (n = c['s-cr']),
            (s = 0 != (1 & a.t)),
            (o = !1),
            A(f, $),
            (d.t |= 1),
            i)
          ) {
            let e, t, n, l, s, o
            H($.S)
            let i = 0
            for (; i < F.length; i++)
              (e = F[i]),
                (t = e.j),
                t['s-ol'] ||
                  ((n = u.createTextNode('')), (n['s-nr'] = t), t.parentNode.insertBefore((t['s-ol'] = n), t))
            for (i = 0; i < F.length; i++)
              if (((e = F[i]), (t = e.j), e.O)) {
                for (l = e.O.parentNode, s = e.O.nextSibling, n = t['s-ol']; (n = n.previousSibling); )
                  if (
                    ((o = n['s-nr']),
                    o && o['s-sn'] === t['s-sn'] && l === o.parentNode && ((o = o.nextSibling), !o || !o['s-nr']))
                  ) {
                    s = o
                    break
                  }
                ;((!s && l !== t.parentNode) || t.nextSibling !== s) &&
                  t !== s &&
                  (!t['s-hn'] && t['s-ol'] && (t['s-hn'] = t['s-ol'].parentNode.nodeName), l.insertBefore(t, s))
              } else 1 === t.nodeType && (t.hidden = !0)
          }
          o && B($.S), (d.t &= -2), (F.length = 0)
        })(e, r)
    } catch (a) {
      pe(a, e.C)
    }
    return (c = null), null
  },
  Y = () => c,
  Z = (e) => {
    const t = e.C,
      n = e.i,
      l = e.R
    ne(n, 'componentDidRender'),
      64 & e.t ? ne(n, 'componentDidUpdate') : ((e.t |= 64), se(t), ne(n, 'componentDidLoad'), e.U(t), l || te()),
      e.D(t),
      e.M && (e.M(), (e.M = void 0)),
      512 & e.t && Se(() => J(e, !1)),
      (e.t &= -517)
  },
  ee = (e) => {
    {
      const t = fe(e),
        n = t.C.isConnected
      return n && 2 == (18 & t.t) && J(t, !1), n
    }
  },
  te = () => {
    se(u.documentElement), Se(() => G(f, 'appload', { detail: { namespace: 'musickit-components' } }))
  },
  ne = (e, t, n) => {
    if (e && e[t])
      try {
        return e[t](n)
      } catch (l) {
        pe(l)
      }
  },
  le = (e, t) => (e && e.then ? e.then(t) : t()),
  se = (e) => e.setAttribute('hydrated', ''),
  oe = (e, t, n) => {
    if (t.W) {
      e.watchers && (t.N = e.watchers)
      const l = Object.entries(t.W),
        s = e.prototype
      if (
        (l.map(([e, [l]]) => {
          31 & l || (2 & n && 32 & l)
            ? Object.defineProperty(s, e, {
                get() {
                  return ((e, t) => fe(this).A.get(t))(0, e)
                },
                set(n) {
                  ;((e, t, n, l) => {
                    const s = fe(e),
                      o = s.C,
                      i = s.A.get(t),
                      r = s.t,
                      c = s.i
                    if (
                      ((n = ((e, t) =>
                        null == e || S(e)
                          ? e
                          : 4 & t
                          ? 'false' !== e && ('' === e || !!e)
                          : 2 & t
                          ? parseFloat(e)
                          : 1 & t
                          ? e + ''
                          : e)(n, l.W[t][0])),
                      !((8 & r && void 0 !== i) || n === i) && (s.A.set(t, n), c))
                    ) {
                      if (l.N && 128 & r) {
                        const e = l.N[t]
                        e &&
                          e.map((e) => {
                            try {
                              c[e](n, i, t)
                            } catch (l) {
                              pe(l, o)
                            }
                          })
                      }
                      if (2 == (18 & r)) {
                        if (c.componentShouldUpdate && !1 === c.componentShouldUpdate(n, i, t)) return
                        J(s, !1)
                      }
                    }
                  })(this, e, n, t)
                },
                configurable: !0,
                enumerable: !0,
              })
            : 1 & n &&
              64 & l &&
              Object.defineProperty(s, e, {
                value(...t) {
                  const n = fe(this)
                  return n.B.then(() => n.i[e](...t))
                },
              })
        }),
        1 & n)
      ) {
        const n = new Map()
        ;(s.attributeChangedCallback = function (e, t, l) {
          d.jmp(() => {
            const t = n.get(e)
            this[t] = (null !== l || 'boolean' != typeof this[t]) && l
          })
        }),
          (e.observedAttributes = l
            .filter(([e, t]) => 15 & t[0])
            .map(([e, l]) => {
              const s = l[1] || e
              return n.set(s, e), 512 & l[0] && t.P.push([e, s]), s
            }))
      }
    }
    return e
  },
  ie = (e) => {
    ne(e, 'connectedCallback')
  },
  re = (e, t = {}) => {
    const n = [],
      l = t.exclude || [],
      s = f.customElements,
      o = u.head,
      i = o.querySelector('meta[charset]'),
      r = u.createElement('style'),
      c = []
    let a,
      $ = !0
    Object.assign(d, t),
      (d.l = new URL(t.resourcesUrl || './', u.baseURI).href),
      e.map((e) =>
        e[1].map((t) => {
          const o = { t: t[0], $: t[1], W: t[2], F: t[3] }
          ;(o.W = t[2]), (o.F = t[3]), (o.P = []), (o.N = {})
          const i = o.$,
            r = class extends HTMLElement {
              constructor(e) {
                super(e), de((e = this), o), 1 & o.t && e.attachShadow({ mode: 'open' })
              }
              connectedCallback() {
                a && (clearTimeout(a), (a = null)),
                  $
                    ? c.push(this)
                    : d.jmp(() =>
                        ((e) => {
                          if (0 == (1 & d.t)) {
                            const t = fe(e),
                              n = t.T,
                              l = () => {}
                            if (1 & t.t) m(e, t, n.F), ie(t.i)
                            else {
                              ;(t.t |= 1),
                                12 & n.t &&
                                  ((e) => {
                                    const t = (e['s-cr'] = u.createComment(''))
                                    ;(t['s-cn'] = !0), e.insertBefore(t, e.firstChild)
                                  })(e)
                              {
                                let n = e
                                for (; (n = n.parentNode || n.host); )
                                  if (n['s-p']) {
                                    I(t, (t.R = n))
                                    break
                                  }
                              }
                              n.W &&
                                Object.entries(n.W).map(([t, [n]]) => {
                                  if (31 & n && e.hasOwnProperty(t)) {
                                    const n = e[t]
                                    delete e[t], (e[t] = n)
                                  }
                                }),
                                (async (e, t, n, l, s) => {
                                  if (0 == (32 & t.t)) {
                                    {
                                      if (((t.t |= 32), (s = we(n)).then)) {
                                        const e = () => {}
                                        ;(s = await s), e()
                                      }
                                      s.isProxied || ((n.N = s.watchers), oe(s, n, 2), (s.isProxied = !0))
                                      const e = () => {}
                                      t.t |= 8
                                      try {
                                        new s(t)
                                      } catch (r) {
                                        pe(r)
                                      }
                                      ;(t.t &= -9), (t.t |= 128), e(), ie(t.i)
                                    }
                                    if (s.style) {
                                      let e = s.style
                                      const t = k(n)
                                      if (!he.has(t)) {
                                        const l = () => {}
                                        ;((e, t, n) => {
                                          let l = he.get(e)
                                          p && n ? ((l = l || new CSSStyleSheet()), l.replace(t)) : (l = t),
                                            he.set(e, l)
                                        })(t, e, !!(1 & n.t)),
                                          l()
                                      }
                                    }
                                  }
                                  const o = t.R,
                                    i = () => J(t, !0)
                                  o && o['s-rc'] ? o['s-rc'].push(i) : i()
                                })(0, t, n)
                            }
                            l()
                          }
                        })(this)
                      )
              }
              disconnectedCallback() {
                d.jmp(() =>
                  (() => {
                    if (0 == (1 & d.t)) {
                      const e = fe(this),
                        t = e.i
                      e.o && (e.o.map((e) => e()), (e.o = void 0)), ne(t, 'disconnectedCallback')
                    }
                  })()
                )
              }
              componentOnReady() {
                return fe(this).H
              }
            }
          ;(o.q = e[0]), l.includes(i) || s.get(i) || (n.push(i), s.define(i, oe(r, o, 1)))
        })
      ),
      (r.innerHTML = n + '{visibility:hidden}[hydrated]{visibility:inherit}'),
      r.setAttribute('data-styles', ''),
      o.insertBefore(r, i ? i.nextSibling : o.firstChild),
      ($ = !1),
      c.length ? c.map((e) => e.connectedCallback()) : d.jmp(() => (a = setTimeout(te, 30)))
  },
  ce = (e) => {
    const t = new URL(e, d.l)
    return t.origin !== f.location.origin ? t.href : t.pathname
  },
  ae = new WeakMap(),
  fe = (e) => ae.get(e),
  ue = (e, t) => ae.set((t.i = e), t),
  de = (e, t) => {
    const n = { t: 0, C: e, T: t, A: new Map() }
    return (
      (n.B = new Promise((e) => (n.D = e))),
      (n.H = new Promise((e) => (n.U = e))),
      (e['s-p'] = []),
      (e['s-rc'] = []),
      m(e, n, t.F),
      ae.set(e, n)
    )
  },
  $e = (e, t) => t in e,
  pe = (e, t) => (0, console.error)(e, t),
  me = new Map(),
  we = (e) => {
    const t = e.$.replace(/-/g, '_'),
      n = e.q,
      l = me.get(n)
    return l ? l[t] : import(`./${n}.entry.js`).then((e) => (me.set(n, e), e[t]), pe)
  },
  he = new Map(),
  ye = [],
  be = [],
  ge = (e, t) => (n) => {
    e.push(n), a || ((a = !0), t && 4 & d.t ? Se(ve) : d.raf(ve))
  },
  ke = (e) => {
    for (let n = 0; n < e.length; n++)
      try {
        e[n](performance.now())
      } catch (t) {
        pe(t)
      }
    e.length = 0
  },
  ve = () => {
    ke(ye), ke(be), (a = ye.length > 0) && d.raf(ve)
  },
  Se = (e) => $().then(e),
  je = ge(be, !0),
  Oe = { isDev: !1, isBrowser: !0, isServer: !1, isTesting: !1 }
export {
  Oe as B,
  C as H,
  e as N,
  Y as a,
  re as b,
  z as c,
  u as d,
  ce as e,
  ee as f,
  _ as g,
  j as h,
  $ as p,
  ue as r,
  f as w,
}
