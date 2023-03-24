function Cs(e, t) {
  const r = Object.create(null),
    n = e.split(",");
  for (let i = 0; i < n.length; i++) r[n[i]] = !0;
  return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
}
function Ti(e) {
  if (ee(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r],
        i = Re(n) ? Oh(n) : Ti(n);
      if (i) for (const o in i) t[o] = i[o];
    }
    return t;
  } else {
    if (Re(e)) return e;
    if (ge(e)) return e;
  }
}
const _h = /;(?![^(]*\))/g,
  Eh = /:([^]+)/,
  Sh = /\/\*.*?\*\//gs;
function Oh(e) {
  const t = {};
  return (
    e
      .replace(Sh, "")
      .split(_h)
      .forEach((r) => {
        if (r) {
          const n = r.split(Eh);
          n.length > 1 && (t[n[0].trim()] = n[1].trim());
        }
      }),
    t
  );
}
function ki(e) {
  let t = "";
  if (Re(e)) t = e;
  else if (ee(e))
    for (let r = 0; r < e.length; r++) {
      const n = ki(e[r]);
      n && (t += n + " ");
    }
  else if (ge(e)) for (const r in e) e[r] && (t += r + " ");
  return t.trim();
}
function Nw(e) {
  if (!e) return null;
  let { class: t, style: r } = e;
  return t && !Re(t) && (e.class = ki(t)), r && (e.style = Ti(r)), e;
}
const Th =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  kh = Cs(Th);
function Du(e) {
  return !!e || e === "";
}
const Mw = (e) =>
    Re(e)
      ? e
      : e == null
      ? ""
      : ee(e) || (ge(e) && (e.toString === Lu || !ne(e.toString)))
      ? JSON.stringify(e, Nu, 2)
      : String(e),
  Nu = (e, t) =>
    t && t.__v_isRef
      ? Nu(e, t.value)
      : Ir(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (r, [n, i]) => ((r[`${n} =>`] = i), r),
            {}
          ),
        }
      : Mu(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ge(t) && !ee(t) && !ju(t)
      ? String(t)
      : t,
  ve = {},
  xr = [],
  dt = () => {},
  Rh = () => !1,
  Ch = /^on[^a-z]/,
  Fn = (e) => Ch.test(e),
  Ps = (e) => e.startsWith("onUpdate:"),
  Le = Object.assign,
  xs = (e, t) => {
    const r = e.indexOf(t);
    r > -1 && e.splice(r, 1);
  },
  Ph = Object.prototype.hasOwnProperty,
  ue = (e, t) => Ph.call(e, t),
  ee = Array.isArray,
  Ir = (e) => Dn(e) === "[object Map]",
  Mu = (e) => Dn(e) === "[object Set]",
  xh = (e) => Dn(e) === "[object RegExp]",
  ne = (e) => typeof e == "function",
  Re = (e) => typeof e == "string",
  Is = (e) => typeof e == "symbol",
  ge = (e) => e !== null && typeof e == "object",
  As = (e) => ge(e) && ne(e.then) && ne(e.catch),
  Lu = Object.prototype.toString,
  Dn = (e) => Lu.call(e),
  Ih = (e) => Dn(e).slice(8, -1),
  ju = (e) => Dn(e) === "[object Object]",
  Fs = (e) =>
    Re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  hn = Cs(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Ri = (e) => {
    const t = Object.create(null);
    return (r) => t[r] || (t[r] = e(r));
  },
  Ah = /-(\w)/g,
  Et = Ri((e) => e.replace(Ah, (t, r) => (r ? r.toUpperCase() : ""))),
  Fh = /\B([A-Z])/g,
  yr = Ri((e) => e.replace(Fh, "-$1").toLowerCase()),
  Ci = Ri((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Xi = Ri((e) => (e ? `on${Ci(e)}` : "")),
  Sn = (e, t) => !Object.is(e, t),
  Ar = (e, t) => {
    for (let r = 0; r < e.length; r++) e[r](t);
  },
  ci = (e, t, r) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: r });
  },
  Po = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  qu = (e) => {
    const t = Re(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let ka;
const Dh = () =>
  ka ||
  (ka =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let Ge;
class $u {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ge),
      !t && Ge && (this.index = (Ge.scopes || (Ge.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const r = Ge;
      try {
        return (Ge = this), t();
      } finally {
        Ge = r;
      }
    }
  }
  on() {
    Ge = this;
  }
  off() {
    Ge = this.parent;
  }
  stop(t) {
    if (this._active) {
      let r, n;
      for (r = 0, n = this.effects.length; r < n; r++) this.effects[r].stop();
      for (r = 0, n = this.cleanups.length; r < n; r++) this.cleanups[r]();
      if (this.scopes)
        for (r = 0, n = this.scopes.length; r < n; r++) this.scopes[r].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i &&
          i !== this &&
          ((this.parent.scopes[this.index] = i), (i.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Hu(e) {
  return new $u(e);
}
function Nh(e, t = Ge) {
  t && t.active && t.effects.push(e);
}
function Bu() {
  return Ge;
}
function Mh(e) {
  Ge && Ge.cleanups.push(e);
}
const Ds = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Qu = (e) => (e.w & Kt) > 0,
  Uu = (e) => (e.n & Kt) > 0,
  Lh = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Kt;
  },
  jh = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let r = 0;
      for (let n = 0; n < t.length; n++) {
        const i = t[n];
        Qu(i) && !Uu(i) ? i.delete(e) : (t[r++] = i),
          (i.w &= ~Kt),
          (i.n &= ~Kt);
      }
      t.length = r;
    }
  },
  ui = new WeakMap();
let un = 0,
  Kt = 1;
const xo = 30;
let ft;
const lr = Symbol(""),
  Io = Symbol("");
class Ns {
  constructor(t, r = null, n) {
    (this.fn = t),
      (this.scheduler = r),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Nh(this, n);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ft,
      r = Qt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ft),
        (ft = this),
        (Qt = !0),
        (Kt = 1 << ++un),
        un <= xo ? Lh(this) : Ra(this),
        this.fn()
      );
    } finally {
      un <= xo && jh(this),
        (Kt = 1 << --un),
        (ft = this.parent),
        (Qt = r),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ft === this
      ? (this.deferStop = !0)
      : this.active &&
        (Ra(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Ra(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let r = 0; r < t.length; r++) t[r].delete(e);
    t.length = 0;
  }
}
let Qt = !0;
const Vu = [];
function Yr() {
  Vu.push(Qt), (Qt = !1);
}
function Xr() {
  const e = Vu.pop();
  Qt = e === void 0 ? !0 : e;
}
function ze(e, t, r) {
  if (Qt && ft) {
    let n = ui.get(e);
    n || ui.set(e, (n = new Map()));
    let i = n.get(r);
    i || n.set(r, (i = Ds())), Wu(i);
  }
}
function Wu(e, t) {
  let r = !1;
  un <= xo ? Uu(e) || ((e.n |= Kt), (r = !Qu(e))) : (r = !e.has(ft)),
    r && (e.add(ft), ft.deps.push(e));
}
function Rt(e, t, r, n, i, o) {
  const s = ui.get(e);
  if (!s) return;
  let a = [];
  if (t === "clear") a = [...s.values()];
  else if (r === "length" && ee(e)) {
    const u = Number(n);
    s.forEach((c, l) => {
      (l === "length" || l >= u) && a.push(c);
    });
  } else
    switch ((r !== void 0 && a.push(s.get(r)), t)) {
      case "add":
        ee(e)
          ? Fs(r) && a.push(s.get("length"))
          : (a.push(s.get(lr)), Ir(e) && a.push(s.get(Io)));
        break;
      case "delete":
        ee(e) || (a.push(s.get(lr)), Ir(e) && a.push(s.get(Io)));
        break;
      case "set":
        Ir(e) && a.push(s.get(lr));
        break;
    }
  if (a.length === 1) a[0] && Ao(a[0]);
  else {
    const u = [];
    for (const c of a) c && u.push(...c);
    Ao(Ds(u));
  }
}
function Ao(e, t) {
  const r = ee(e) ? e : [...e];
  for (const n of r) n.computed && Ca(n);
  for (const n of r) n.computed || Ca(n);
}
function Ca(e, t) {
  (e !== ft || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function qh(e, t) {
  var r;
  return (r = ui.get(e)) === null || r === void 0 ? void 0 : r.get(t);
}
const $h = Cs("__proto__,__v_isRef,__isVue"),
  zu = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Is)
  ),
  Hh = Ms(),
  Bh = Ms(!1, !0),
  Qh = Ms(!0),
  Pa = Uh();
function Uh() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...r) {
        const n = ae(this);
        for (let o = 0, s = this.length; o < s; o++) ze(n, "get", o + "");
        const i = n[t](...r);
        return i === -1 || i === !1 ? n[t](...r.map(ae)) : i;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...r) {
        Yr();
        const n = ae(this)[t].apply(this, r);
        return Xr(), n;
      };
    }),
    e
  );
}
function Vh(e) {
  const t = ae(this);
  return ze(t, "has", e), t.hasOwnProperty(e);
}
function Ms(e = !1, t = !1) {
  return function (n, i, o) {
    if (i === "__v_isReactive") return !e;
    if (i === "__v_isReadonly") return e;
    if (i === "__v_isShallow") return t;
    if (i === "__v_raw" && o === (e ? (t ? ad : Xu) : t ? Yu : Gu).get(n))
      return n;
    const s = ee(n);
    if (!e) {
      if (s && ue(Pa, i)) return Reflect.get(Pa, i, o);
      if (i === "hasOwnProperty") return Vh;
    }
    const a = Reflect.get(n, i, o);
    return (Is(i) ? zu.has(i) : $h(i)) || (e || ze(n, "get", i), t)
      ? a
      : _e(a)
      ? s && Fs(i)
        ? a
        : a.value
      : ge(a)
      ? e
        ? Zu(a)
        : vt(a)
      : a;
  };
}
const Wh = Ku(),
  zh = Ku(!0);
function Ku(e = !1) {
  return function (r, n, i, o) {
    let s = r[n];
    if (hr(s) && _e(s) && !_e(i)) return !1;
    if (
      !e &&
      (!li(i) && !hr(i) && ((s = ae(s)), (i = ae(i))),
      !ee(r) && _e(s) && !_e(i))
    )
      return (s.value = i), !0;
    const a = ee(r) && Fs(n) ? Number(n) < r.length : ue(r, n),
      u = Reflect.set(r, n, i, o);
    return (
      r === ae(o) && (a ? Sn(i, s) && Rt(r, "set", n, i) : Rt(r, "add", n, i)),
      u
    );
  };
}
function Kh(e, t) {
  const r = ue(e, t);
  e[t];
  const n = Reflect.deleteProperty(e, t);
  return n && r && Rt(e, "delete", t, void 0), n;
}
function Jh(e, t) {
  const r = Reflect.has(e, t);
  return (!Is(t) || !zu.has(t)) && ze(e, "has", t), r;
}
function Gh(e) {
  return ze(e, "iterate", ee(e) ? "length" : lr), Reflect.ownKeys(e);
}
const Ju = { get: Hh, set: Wh, deleteProperty: Kh, has: Jh, ownKeys: Gh },
  Yh = {
    get: Qh,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Xh = Le({}, Ju, { get: Bh, set: zh }),
  Ls = (e) => e,
  Pi = (e) => Reflect.getPrototypeOf(e);
function $n(e, t, r = !1, n = !1) {
  e = e.__v_raw;
  const i = ae(e),
    o = ae(t);
  r || (t !== o && ze(i, "get", t), ze(i, "get", o));
  const { has: s } = Pi(i),
    a = n ? Ls : r ? $s : On;
  if (s.call(i, t)) return a(e.get(t));
  if (s.call(i, o)) return a(e.get(o));
  e !== i && e.get(t);
}
function Hn(e, t = !1) {
  const r = this.__v_raw,
    n = ae(r),
    i = ae(e);
  return (
    t || (e !== i && ze(n, "has", e), ze(n, "has", i)),
    e === i ? r.has(e) : r.has(e) || r.has(i)
  );
}
function Bn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ze(ae(e), "iterate", lr), Reflect.get(e, "size", e)
  );
}
function xa(e) {
  e = ae(e);
  const t = ae(this);
  return Pi(t).has.call(t, e) || (t.add(e), Rt(t, "add", e, e)), this;
}
function Ia(e, t) {
  t = ae(t);
  const r = ae(this),
    { has: n, get: i } = Pi(r);
  let o = n.call(r, e);
  o || ((e = ae(e)), (o = n.call(r, e)));
  const s = i.call(r, e);
  return (
    r.set(e, t), o ? Sn(t, s) && Rt(r, "set", e, t) : Rt(r, "add", e, t), this
  );
}
function Aa(e) {
  const t = ae(this),
    { has: r, get: n } = Pi(t);
  let i = r.call(t, e);
  i || ((e = ae(e)), (i = r.call(t, e))), n && n.call(t, e);
  const o = t.delete(e);
  return i && Rt(t, "delete", e, void 0), o;
}
function Fa() {
  const e = ae(this),
    t = e.size !== 0,
    r = e.clear();
  return t && Rt(e, "clear", void 0, void 0), r;
}
function Qn(e, t) {
  return function (n, i) {
    const o = this,
      s = o.__v_raw,
      a = ae(s),
      u = t ? Ls : e ? $s : On;
    return (
      !e && ze(a, "iterate", lr), s.forEach((c, l) => n.call(i, u(c), u(l), o))
    );
  };
}
function Un(e, t, r) {
  return function (...n) {
    const i = this.__v_raw,
      o = ae(i),
      s = Ir(o),
      a = e === "entries" || (e === Symbol.iterator && s),
      u = e === "keys" && s,
      c = i[e](...n),
      l = r ? Ls : t ? $s : On;
    return (
      !t && ze(o, "iterate", u ? Io : lr),
      {
        next() {
          const { value: f, done: h } = c.next();
          return h
            ? { value: f, done: h }
            : { value: a ? [l(f[0]), l(f[1])] : l(f), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function It(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Zh() {
  const e = {
      get(o) {
        return $n(this, o);
      },
      get size() {
        return Bn(this);
      },
      has: Hn,
      add: xa,
      set: Ia,
      delete: Aa,
      clear: Fa,
      forEach: Qn(!1, !1),
    },
    t = {
      get(o) {
        return $n(this, o, !1, !0);
      },
      get size() {
        return Bn(this);
      },
      has: Hn,
      add: xa,
      set: Ia,
      delete: Aa,
      clear: Fa,
      forEach: Qn(!1, !0),
    },
    r = {
      get(o) {
        return $n(this, o, !0);
      },
      get size() {
        return Bn(this, !0);
      },
      has(o) {
        return Hn.call(this, o, !0);
      },
      add: It("add"),
      set: It("set"),
      delete: It("delete"),
      clear: It("clear"),
      forEach: Qn(!0, !1),
    },
    n = {
      get(o) {
        return $n(this, o, !0, !0);
      },
      get size() {
        return Bn(this, !0);
      },
      has(o) {
        return Hn.call(this, o, !0);
      },
      add: It("add"),
      set: It("set"),
      delete: It("delete"),
      clear: It("clear"),
      forEach: Qn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = Un(o, !1, !1)),
        (r[o] = Un(o, !0, !1)),
        (t[o] = Un(o, !1, !0)),
        (n[o] = Un(o, !0, !0));
    }),
    [e, r, t, n]
  );
}
const [ed, td, rd, nd] = Zh();
function js(e, t) {
  const r = t ? (e ? nd : rd) : e ? td : ed;
  return (n, i, o) =>
    i === "__v_isReactive"
      ? !e
      : i === "__v_isReadonly"
      ? e
      : i === "__v_raw"
      ? n
      : Reflect.get(ue(r, i) && i in n ? r : n, i, o);
}
const id = { get: js(!1, !1) },
  od = { get: js(!1, !0) },
  sd = { get: js(!0, !1) },
  Gu = new WeakMap(),
  Yu = new WeakMap(),
  Xu = new WeakMap(),
  ad = new WeakMap();
function cd(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ud(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : cd(Ih(e));
}
function vt(e) {
  return hr(e) ? e : qs(e, !1, Ju, id, Gu);
}
function ld(e) {
  return qs(e, !1, Xh, od, Yu);
}
function Zu(e) {
  return qs(e, !0, Yh, sd, Xu);
}
function qs(e, t, r, n, i) {
  if (!ge(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = i.get(e);
  if (o) return o;
  const s = ud(e);
  if (s === 0) return e;
  const a = new Proxy(e, s === 2 ? n : r);
  return i.set(e, a), a;
}
function Ut(e) {
  return hr(e) ? Ut(e.__v_raw) : !!(e && e.__v_isReactive);
}
function hr(e) {
  return !!(e && e.__v_isReadonly);
}
function li(e) {
  return !!(e && e.__v_isShallow);
}
function el(e) {
  return Ut(e) || hr(e);
}
function ae(e) {
  const t = e && e.__v_raw;
  return t ? ae(t) : e;
}
function $r(e) {
  return ci(e, "__v_skip", !0), e;
}
const On = (e) => (ge(e) ? vt(e) : e),
  $s = (e) => (ge(e) ? Zu(e) : e);
function tl(e) {
  Qt && ft && ((e = ae(e)), Wu(e.dep || (e.dep = Ds())));
}
function rl(e, t) {
  e = ae(e);
  const r = e.dep;
  r && Ao(r);
}
function _e(e) {
  return !!(e && e.__v_isRef === !0);
}
function pt(e) {
  return nl(e, !1);
}
function Fo(e) {
  return nl(e, !0);
}
function nl(e, t) {
  return _e(e) ? e : new fd(e, t);
}
class fd {
  constructor(t, r) {
    (this.__v_isShallow = r),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = r ? t : ae(t)),
      (this._value = r ? t : On(t));
  }
  get value() {
    return tl(this), this._value;
  }
  set value(t) {
    const r = this.__v_isShallow || li(t) || hr(t);
    (t = r ? t : ae(t)),
      Sn(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = r ? t : On(t)), rl(this));
  }
}
function Ne(e) {
  return _e(e) ? e.value : e;
}
const hd = {
  get: (e, t, r) => Ne(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const i = e[t];
    return _e(i) && !_e(r) ? ((i.value = r), !0) : Reflect.set(e, t, r, n);
  },
};
function il(e) {
  return Ut(e) ? e : new Proxy(e, hd);
}
function dd(e) {
  const t = ee(e) ? new Array(e.length) : {};
  for (const r in e) t[r] = Hs(e, r);
  return t;
}
class pd {
  constructor(t, r, n) {
    (this._object = t),
      (this._key = r),
      (this._defaultValue = n),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return qh(ae(this._object), this._key);
  }
}
function Hs(e, t, r) {
  const n = e[t];
  return _e(n) ? n : new pd(e, t, r);
}
var ol;
class yd {
  constructor(t, r, n, i) {
    (this._setter = r),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[ol] = !1),
      (this._dirty = !0),
      (this.effect = new Ns(t, () => {
        this._dirty || ((this._dirty = !0), rl(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !i),
      (this.__v_isReadonly = n);
  }
  get value() {
    const t = ae(this);
    return (
      tl(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
ol = "__v_isReadonly";
function vd(e, t, r = !1) {
  let n, i;
  const o = ne(e);
  return (
    o ? ((n = e), (i = dt)) : ((n = e.get), (i = e.set)),
    new yd(n, i, o || !i, r)
  );
}
function Vt(e, t, r, n) {
  let i;
  try {
    i = n ? e(...n) : e();
  } catch (o) {
    Zr(o, t, r);
  }
  return i;
}
function it(e, t, r, n) {
  if (ne(e)) {
    const o = Vt(e, t, r, n);
    return (
      o &&
        As(o) &&
        o.catch((s) => {
          Zr(s, t, r);
        }),
      o
    );
  }
  const i = [];
  for (let o = 0; o < e.length; o++) i.push(it(e[o], t, r, n));
  return i;
}
function Zr(e, t, r, n = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const s = t.proxy,
      a = r;
    for (; o; ) {
      const c = o.ec;
      if (c) {
        for (let l = 0; l < c.length; l++) if (c[l](e, s, a) === !1) return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Vt(u, null, 10, [e, s, a]);
      return;
    }
  }
  md(e, r, i, n);
}
function md(e, t, r, n = !0) {
  console.error(e);
}
let Tn = !1,
  Do = !1;
const qe = [];
let _t = 0;
const Fr = [];
let Tt = null,
  sr = 0;
const sl = Promise.resolve();
let Bs = null;
function vr(e) {
  const t = Bs || sl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function gd(e) {
  let t = _t + 1,
    r = qe.length;
  for (; t < r; ) {
    const n = (t + r) >>> 1;
    kn(qe[n]) < e ? (t = n + 1) : (r = n);
  }
  return t;
}
function xi(e) {
  (!qe.length || !qe.includes(e, Tn && e.allowRecurse ? _t + 1 : _t)) &&
    (e.id == null ? qe.push(e) : qe.splice(gd(e.id), 0, e), al());
}
function al() {
  !Tn && !Do && ((Do = !0), (Bs = sl.then(ul)));
}
function bd(e) {
  const t = qe.indexOf(e);
  t > _t && qe.splice(t, 1);
}
function cl(e) {
  ee(e)
    ? Fr.push(...e)
    : (!Tt || !Tt.includes(e, e.allowRecurse ? sr + 1 : sr)) && Fr.push(e),
    al();
}
function Da(e, t = Tn ? _t + 1 : 0) {
  for (; t < qe.length; t++) {
    const r = qe[t];
    r && r.pre && (qe.splice(t, 1), t--, r());
  }
}
function fi(e) {
  if (Fr.length) {
    const t = [...new Set(Fr)];
    if (((Fr.length = 0), Tt)) {
      Tt.push(...t);
      return;
    }
    for (Tt = t, Tt.sort((r, n) => kn(r) - kn(n)), sr = 0; sr < Tt.length; sr++)
      Tt[sr]();
    (Tt = null), (sr = 0);
  }
}
const kn = (e) => (e.id == null ? 1 / 0 : e.id),
  wd = (e, t) => {
    const r = kn(e) - kn(t);
    if (r === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return r;
  };
function ul(e) {
  (Do = !1), (Tn = !0), qe.sort(wd);
  const t = dt;
  try {
    for (_t = 0; _t < qe.length; _t++) {
      const r = qe[_t];
      r && r.active !== !1 && Vt(r, null, 14);
    }
  } finally {
    (_t = 0),
      (qe.length = 0),
      fi(),
      (Tn = !1),
      (Bs = null),
      (qe.length || Fr.length) && ul();
  }
}
function _d(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || ve;
  let i = r;
  const o = t.startsWith("update:"),
    s = o && t.slice(7);
  if (s && s in n) {
    const l = `${s === "modelValue" ? "model" : s}Modifiers`,
      { number: f, trim: h } = n[l] || ve;
    h && (i = r.map((d) => (Re(d) ? d.trim() : d))), f && (i = r.map(Po));
  }
  let a,
    u = n[(a = Xi(t))] || n[(a = Xi(Et(t)))];
  !u && o && (u = n[(a = Xi(yr(t)))]), u && it(u, e, 6, i);
  const c = n[a + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), it(c, e, 6, i);
  }
}
function ll(e, t, r = !1) {
  const n = t.emitsCache,
    i = n.get(e);
  if (i !== void 0) return i;
  const o = e.emits;
  let s = {},
    a = !1;
  if (!ne(e)) {
    const u = (c) => {
      const l = ll(c, t, !0);
      l && ((a = !0), Le(s, l));
    };
    !r && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  return !o && !a
    ? (ge(e) && n.set(e, null), null)
    : (ee(o) ? o.forEach((u) => (s[u] = null)) : Le(s, o),
      ge(e) && n.set(e, s),
      s);
}
function Ii(e, t) {
  return !e || !Fn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      ue(e, t[0].toLowerCase() + t.slice(1)) || ue(e, yr(t)) || ue(e, t));
}
let Ye = null,
  Ai = null;
function hi(e) {
  const t = Ye;
  return (Ye = e), (Ai = (e && e.type.__scopeId) || null), t;
}
function Lw(e) {
  Ai = e;
}
function jw() {
  Ai = null;
}
function Qs(e, t = Ye, r) {
  if (!t || e._n) return e;
  const n = (...i) => {
    n._d && Va(-1);
    const o = hi(t);
    let s;
    try {
      s = e(...i);
    } finally {
      hi(o), n._d && Va(1);
    }
    return s;
  };
  return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function Zi(e) {
  const {
    type: t,
    vnode: r,
    proxy: n,
    withProxy: i,
    props: o,
    propsOptions: [s],
    slots: a,
    attrs: u,
    emit: c,
    render: l,
    renderCache: f,
    data: h,
    setupState: d,
    ctx: y,
    inheritAttrs: b,
  } = e;
  let w, m;
  const p = hi(e);
  try {
    if (r.shapeFlag & 4) {
      const _ = i || n;
      (w = tt(l.call(_, _, f, o, d, h, y))), (m = u);
    } else {
      const _ = t;
      (w = tt(
        _.length > 1 ? _(o, { attrs: u, slots: a, emit: c }) : _(o, null)
      )),
        (m = t.props ? u : Sd(u));
    }
  } catch (_) {
    (pn.length = 0), Zr(_, e, 1), (w = ke(ot));
  }
  let v = w;
  if (m && b !== !1) {
    const _ = Object.keys(m),
      { shapeFlag: S } = v;
    _.length && S & 7 && (s && _.some(Ps) && (m = Od(m, s)), (v = Ct(v, m)));
  }
  return (
    r.dirs && ((v = Ct(v)), (v.dirs = v.dirs ? v.dirs.concat(r.dirs) : r.dirs)),
    r.transition && (v.transition = r.transition),
    (w = v),
    hi(p),
    w
  );
}
function Ed(e) {
  let t;
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    if (Cn(n)) {
      if (n.type !== ot || n.children === "v-if") {
        if (t) return;
        t = n;
      }
    } else return;
  }
  return t;
}
const Sd = (e) => {
    let t;
    for (const r in e)
      (r === "class" || r === "style" || Fn(r)) && ((t || (t = {}))[r] = e[r]);
    return t;
  },
  Od = (e, t) => {
    const r = {};
    for (const n in e) (!Ps(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
    return r;
  };
function Td(e, t, r) {
  const { props: n, children: i, component: o } = e,
    { props: s, children: a, patchFlag: u } = t,
    c = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (r && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return n ? Na(n, s, c) : !!s;
    if (u & 8) {
      const l = t.dynamicProps;
      for (let f = 0; f < l.length; f++) {
        const h = l[f];
        if (s[h] !== n[h] && !Ii(c, h)) return !0;
      }
    }
  } else
    return (i || a) && (!a || !a.$stable)
      ? !0
      : n === s
      ? !1
      : n
      ? s
        ? Na(n, s, c)
        : !0
      : !!s;
  return !1;
}
function Na(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (t[o] !== e[o] && !Ii(r, o)) return !0;
  }
  return !1;
}
function Us({ vnode: e, parent: t }, r) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = r), (t = t.parent);
}
const fl = (e) => e.__isSuspense,
  kd = {
    name: "Suspense",
    __isSuspense: !0,
    process(e, t, r, n, i, o, s, a, u, c) {
      e == null ? Rd(t, r, n, i, o, s, a, u, c) : Cd(e, t, r, n, i, s, a, u, c);
    },
    hydrate: Pd,
    create: Vs,
    normalize: xd,
  },
  hl = kd;
function Rn(e, t) {
  const r = e.props && e.props[t];
  ne(r) && r();
}
function Rd(e, t, r, n, i, o, s, a, u) {
  const {
      p: c,
      o: { createElement: l },
    } = u,
    f = l("div"),
    h = (e.suspense = Vs(e, i, n, t, f, r, o, s, a, u));
  c(null, (h.pendingBranch = e.ssContent), f, null, n, h, o, s),
    h.deps > 0
      ? (Rn(e, "onPending"),
        Rn(e, "onFallback"),
        c(null, e.ssFallback, t, r, n, null, o, s),
        Dr(h, e.ssFallback))
      : h.resolve();
}
function Cd(e, t, r, n, i, o, s, a, { p: u, um: c, o: { createElement: l } }) {
  const f = (t.suspense = e.suspense);
  (f.vnode = t), (t.el = e.el);
  const h = t.ssContent,
    d = t.ssFallback,
    { activeBranch: y, pendingBranch: b, isInFallback: w, isHydrating: m } = f;
  if (b)
    (f.pendingBranch = h),
      ht(h, b)
        ? (u(b, h, f.hiddenContainer, null, i, f, o, s, a),
          f.deps <= 0
            ? f.resolve()
            : w && (u(y, d, r, n, i, null, o, s, a), Dr(f, d)))
        : (f.pendingId++,
          m ? ((f.isHydrating = !1), (f.activeBranch = b)) : c(b, i, f),
          (f.deps = 0),
          (f.effects.length = 0),
          (f.hiddenContainer = l("div")),
          w
            ? (u(null, h, f.hiddenContainer, null, i, f, o, s, a),
              f.deps <= 0
                ? f.resolve()
                : (u(y, d, r, n, i, null, o, s, a), Dr(f, d)))
            : y && ht(h, y)
            ? (u(y, h, r, n, i, f, o, s, a), f.resolve(!0))
            : (u(null, h, f.hiddenContainer, null, i, f, o, s, a),
              f.deps <= 0 && f.resolve()));
  else if (y && ht(h, y)) u(y, h, r, n, i, f, o, s, a), Dr(f, h);
  else if (
    (Rn(t, "onPending"),
    (f.pendingBranch = h),
    f.pendingId++,
    u(null, h, f.hiddenContainer, null, i, f, o, s, a),
    f.deps <= 0)
  )
    f.resolve();
  else {
    const { timeout: p, pendingId: v } = f;
    p > 0
      ? setTimeout(() => {
          f.pendingId === v && f.fallback(d);
        }, p)
      : p === 0 && f.fallback(d);
  }
}
function Vs(e, t, r, n, i, o, s, a, u, c, l = !1) {
  const {
      p: f,
      m: h,
      um: d,
      n: y,
      o: { parentNode: b, remove: w },
    } = c,
    m = e.props ? qu(e.props.timeout) : void 0,
    p = {
      vnode: e,
      parent: t,
      parentComponent: r,
      isSVG: s,
      container: n,
      hiddenContainer: i,
      anchor: o,
      deps: 0,
      pendingId: 0,
      timeout: typeof m == "number" ? m : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !0,
      isHydrating: l,
      isUnmounted: !1,
      effects: [],
      resolve(v = !1) {
        const {
          vnode: _,
          activeBranch: S,
          pendingBranch: k,
          pendingId: T,
          effects: O,
          parentComponent: M,
          container: L,
        } = p;
        if (p.isHydrating) p.isHydrating = !1;
        else if (!v) {
          const W = S && k.transition && k.transition.mode === "out-in";
          W &&
            (S.transition.afterLeave = () => {
              T === p.pendingId && h(k, L, I, 0);
            });
          let { anchor: I } = p;
          S && ((I = y(S)), d(S, M, p, !0)), W || h(k, L, I, 0);
        }
        Dr(p, k), (p.pendingBranch = null), (p.isInFallback = !1);
        let Q = p.parent,
          q = !1;
        for (; Q; ) {
          if (Q.pendingBranch) {
            Q.effects.push(...O), (q = !0);
            break;
          }
          Q = Q.parent;
        }
        q || cl(O), (p.effects = []), Rn(_, "onResolve");
      },
      fallback(v) {
        if (!p.pendingBranch) return;
        const {
          vnode: _,
          activeBranch: S,
          parentComponent: k,
          container: T,
          isSVG: O,
        } = p;
        Rn(_, "onFallback");
        const M = y(S),
          L = () => {
            p.isInFallback && (f(null, v, T, M, k, null, O, a, u), Dr(p, v));
          },
          Q = v.transition && v.transition.mode === "out-in";
        Q && (S.transition.afterLeave = L),
          (p.isInFallback = !0),
          d(S, k, null, !0),
          Q || L();
      },
      move(v, _, S) {
        p.activeBranch && h(p.activeBranch, v, _, S), (p.container = v);
      },
      next() {
        return p.activeBranch && y(p.activeBranch);
      },
      registerDep(v, _) {
        const S = !!p.pendingBranch;
        S && p.deps++;
        const k = v.vnode.el;
        v.asyncDep
          .catch((T) => {
            Zr(T, v, 0);
          })
          .then((T) => {
            if (v.isUnmounted || p.isUnmounted || p.pendingId !== v.suspenseId)
              return;
            v.asyncResolved = !0;
            const { vnode: O } = v;
            $o(v, T, !1), k && (O.el = k);
            const M = !k && v.subTree.el;
            _(v, O, b(k || v.subTree.el), k ? null : y(v.subTree), p, s, u),
              M && w(M),
              Us(v, O.el),
              S && --p.deps === 0 && p.resolve();
          });
      },
      unmount(v, _) {
        (p.isUnmounted = !0),
          p.activeBranch && d(p.activeBranch, r, v, _),
          p.pendingBranch && d(p.pendingBranch, r, v, _);
      },
    };
  return p;
}
function Pd(e, t, r, n, i, o, s, a, u) {
  const c = (t.suspense = Vs(
      t,
      n,
      r,
      e.parentNode,
      document.createElement("div"),
      null,
      i,
      o,
      s,
      a,
      !0
    )),
    l = u(e, (c.pendingBranch = t.ssContent), r, c, o, s);
  return c.deps === 0 && c.resolve(), l;
}
function xd(e) {
  const { shapeFlag: t, children: r } = e,
    n = t & 32;
  (e.ssContent = Ma(n ? r.default : r)),
    (e.ssFallback = n ? Ma(r.fallback) : ke(ot));
}
function Ma(e) {
  let t;
  if (ne(e)) {
    const r = Br && e._c;
    r && ((e._d = !1), Tr()), (e = e()), r && ((e._d = !0), (t = nt), Dl());
  }
  return (
    ee(e) && (e = Ed(e)),
    (e = tt(e)),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter((r) => r !== e)),
    e
  );
}
function dl(e, t) {
  t && t.pendingBranch
    ? ee(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : cl(e);
}
function Dr(e, t) {
  e.activeBranch = t;
  const { vnode: r, parentComponent: n } = e,
    i = (r.el = t.el);
  n && n.subTree === r && ((n.vnode.el = i), Us(n, i));
}
function Nr(e, t) {
  if (Oe) {
    let r = Oe.provides;
    const n = Oe.parent && Oe.parent.provides;
    n === r && (r = Oe.provides = Object.create(n)), (r[e] = t);
  }
}
function We(e, t, r = !1) {
  const n = Oe || Ye;
  if (n) {
    const i =
      n.parent == null
        ? n.vnode.appContext && n.vnode.appContext.provides
        : n.parent.provides;
    if (i && e in i) return i[e];
    if (arguments.length > 1) return r && ne(t) ? t.call(n.proxy) : t;
  }
}
function Id(e, t) {
  return Ws(e, null, t);
}
const Vn = {};
function Wt(e, t, r) {
  return Ws(e, t, r);
}
function Ws(
  e,
  t,
  { immediate: r, deep: n, flush: i, onTrack: o, onTrigger: s } = ve
) {
  const a = Bu() === (Oe == null ? void 0 : Oe.scope) ? Oe : null;
  let u,
    c = !1,
    l = !1;
  if (
    (_e(e)
      ? ((u = () => e.value), (c = li(e)))
      : Ut(e)
      ? ((u = () => e), (n = !0))
      : ee(e)
      ? ((l = !0),
        (c = e.some((v) => Ut(v) || li(v))),
        (u = () =>
          e.map((v) => {
            if (_e(v)) return v.value;
            if (Ut(v)) return ur(v);
            if (ne(v)) return Vt(v, a, 2);
          })))
      : ne(e)
      ? t
        ? (u = () => Vt(e, a, 2))
        : (u = () => {
            if (!(a && a.isUnmounted)) return f && f(), it(e, a, 3, [h]);
          })
      : (u = dt),
    t && n)
  ) {
    const v = u;
    u = () => ur(v());
  }
  let f,
    h = (v) => {
      f = m.onStop = () => {
        Vt(v, a, 4);
      };
    },
    d;
  if (Qr)
    if (
      ((h = dt),
      t ? r && it(t, a, 3, [u(), l ? [] : void 0, h]) : u(),
      i === "sync")
    ) {
      const v = Sp();
      d = v.__watcherHandles || (v.__watcherHandles = []);
    } else return dt;
  let y = l ? new Array(e.length).fill(Vn) : Vn;
  const b = () => {
    if (m.active)
      if (t) {
        const v = m.run();
        (n || c || (l ? v.some((_, S) => Sn(_, y[S])) : Sn(v, y))) &&
          (f && f(),
          it(t, a, 3, [v, y === Vn ? void 0 : l && y[0] === Vn ? [] : y, h]),
          (y = v));
      } else m.run();
  };
  b.allowRecurse = !!t;
  let w;
  i === "sync"
    ? (w = b)
    : i === "post"
    ? (w = () => De(b, a && a.suspense))
    : ((b.pre = !0), a && (b.id = a.uid), (w = () => xi(b)));
  const m = new Ns(u, w);
  t
    ? r
      ? b()
      : (y = m.run())
    : i === "post"
    ? De(m.run.bind(m), a && a.suspense)
    : m.run();
  const p = () => {
    m.stop(), a && a.scope && xs(a.scope.effects, m);
  };
  return d && d.push(p), p;
}
function Ad(e, t, r) {
  const n = this.proxy,
    i = Re(e) ? (e.includes(".") ? pl(n, e) : () => n[e]) : e.bind(n, n);
  let o;
  ne(t) ? (o = t) : ((o = t.handler), (r = t));
  const s = Oe;
  Jt(this);
  const a = Ws(i, o.bind(n), r);
  return s ? Jt(s) : zt(), a;
}
function pl(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < r.length && n; i++) n = n[r[i]];
    return n;
  };
}
function ur(e, t) {
  if (!ge(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), _e(e))) ur(e.value, t);
  else if (ee(e)) for (let r = 0; r < e.length; r++) ur(e[r], t);
  else if (Mu(e) || Ir(e))
    e.forEach((r) => {
      ur(r, t);
    });
  else if (ju(e)) for (const r in e) ur(e[r], t);
  return e;
}
function Fd() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    zs(() => {
      e.isMounted = !0;
    }),
    Di(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Ze = [Function, Array],
  Dd = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Ze,
      onEnter: Ze,
      onAfterEnter: Ze,
      onEnterCancelled: Ze,
      onBeforeLeave: Ze,
      onLeave: Ze,
      onAfterLeave: Ze,
      onLeaveCancelled: Ze,
      onBeforeAppear: Ze,
      onAppear: Ze,
      onAfterAppear: Ze,
      onAppearCancelled: Ze,
    },
    setup(e, { slots: t }) {
      const r = Zt(),
        n = Fd();
      let i;
      return () => {
        const o = t.default && ml(t.default(), !0);
        if (!o || !o.length) return;
        let s = o[0];
        if (o.length > 1) {
          for (const b of o)
            if (b.type !== ot) {
              s = b;
              break;
            }
        }
        const a = ae(e),
          { mode: u } = a;
        if (n.isLeaving) return eo(s);
        const c = La(s);
        if (!c) return eo(s);
        const l = No(c, a, n, r);
        di(c, l);
        const f = r.subTree,
          h = f && La(f);
        let d = !1;
        const { getTransitionKey: y } = c.type;
        if (y) {
          const b = y();
          i === void 0 ? (i = b) : b !== i && ((i = b), (d = !0));
        }
        if (h && h.type !== ot && (!ht(c, h) || d)) {
          const b = No(h, a, n, r);
          if ((di(h, b), u === "out-in"))
            return (
              (n.isLeaving = !0),
              (b.afterLeave = () => {
                (n.isLeaving = !1), r.update.active !== !1 && r.update();
              }),
              eo(s)
            );
          u === "in-out" &&
            c.type !== ot &&
            (b.delayLeave = (w, m, p) => {
              const v = vl(n, h);
              (v[String(h.key)] = h),
                (w._leaveCb = () => {
                  m(), (w._leaveCb = void 0), delete l.delayedLeave;
                }),
                (l.delayedLeave = p);
            });
        }
        return s;
      };
    },
  },
  yl = Dd;
function vl(e, t) {
  const { leavingVNodes: r } = e;
  let n = r.get(t.type);
  return n || ((n = Object.create(null)), r.set(t.type, n)), n;
}
function No(e, t, r, n) {
  const {
      appear: i,
      mode: o,
      persisted: s = !1,
      onBeforeEnter: a,
      onEnter: u,
      onAfterEnter: c,
      onEnterCancelled: l,
      onBeforeLeave: f,
      onLeave: h,
      onAfterLeave: d,
      onLeaveCancelled: y,
      onBeforeAppear: b,
      onAppear: w,
      onAfterAppear: m,
      onAppearCancelled: p,
    } = t,
    v = String(e.key),
    _ = vl(r, e),
    S = (O, M) => {
      O && it(O, n, 9, M);
    },
    k = (O, M) => {
      const L = M[1];
      S(O, M),
        ee(O) ? O.every((Q) => Q.length <= 1) && L() : O.length <= 1 && L();
    },
    T = {
      mode: o,
      persisted: s,
      beforeEnter(O) {
        let M = a;
        if (!r.isMounted)
          if (i) M = b || a;
          else return;
        O._leaveCb && O._leaveCb(!0);
        const L = _[v];
        L && ht(e, L) && L.el._leaveCb && L.el._leaveCb(), S(M, [O]);
      },
      enter(O) {
        let M = u,
          L = c,
          Q = l;
        if (!r.isMounted)
          if (i) (M = w || u), (L = m || c), (Q = p || l);
          else return;
        let q = !1;
        const W = (O._enterCb = (I) => {
          q ||
            ((q = !0),
            I ? S(Q, [O]) : S(L, [O]),
            T.delayedLeave && T.delayedLeave(),
            (O._enterCb = void 0));
        });
        M ? k(M, [O, W]) : W();
      },
      leave(O, M) {
        const L = String(e.key);
        if ((O._enterCb && O._enterCb(!0), r.isUnmounting)) return M();
        S(f, [O]);
        let Q = !1;
        const q = (O._leaveCb = (W) => {
          Q ||
            ((Q = !0),
            M(),
            W ? S(y, [O]) : S(d, [O]),
            (O._leaveCb = void 0),
            _[L] === e && delete _[L]);
        });
        (_[L] = e), h ? k(h, [O, q]) : q();
      },
      clone(O) {
        return No(O, t, r, n);
      },
    };
  return T;
}
function eo(e) {
  if (Nn(e)) return (e = Ct(e)), (e.children = null), e;
}
function La(e) {
  return Nn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function di(e, t) {
  e.shapeFlag & 6 && e.component
    ? di(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function ml(e, t = !1, r) {
  let n = [],
    i = 0;
  for (let o = 0; o < e.length; o++) {
    let s = e[o];
    const a = r == null ? s.key : String(r) + String(s.key != null ? s.key : o);
    s.type === et
      ? (s.patchFlag & 128 && i++, (n = n.concat(ml(s.children, t, a))))
      : (t || s.type !== ot) && n.push(a != null ? Ct(s, { key: a }) : s);
  }
  if (i > 1) for (let o = 0; o < n.length; o++) n[o].patchFlag = -2;
  return n;
}
function Xt(e) {
  return ne(e) ? { setup: e, name: e.name } : e;
}
const Mr = (e) => !!e.type.__asyncLoader;
function Nd(e) {
  ne(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: r,
    errorComponent: n,
    delay: i = 200,
    timeout: o,
    suspensible: s = !0,
    onError: a,
  } = e;
  let u = null,
    c,
    l = 0;
  const f = () => (l++, (u = null), h()),
    h = () => {
      let d;
      return (
        u ||
        (d = u =
          t()
            .catch((y) => {
              if (((y = y instanceof Error ? y : new Error(String(y))), a))
                return new Promise((b, w) => {
                  a(
                    y,
                    () => b(f()),
                    () => w(y),
                    l + 1
                  );
                });
              throw y;
            })
            .then((y) =>
              d !== u && u
                ? u
                : (y &&
                    (y.__esModule || y[Symbol.toStringTag] === "Module") &&
                    (y = y.default),
                  (c = y),
                  y)
            ))
      );
    };
  return Xt({
    name: "AsyncComponentWrapper",
    __asyncLoader: h,
    get __asyncResolved() {
      return c;
    },
    setup() {
      const d = Oe;
      if (c) return () => to(c, d);
      const y = (p) => {
        (u = null), Zr(p, d, 13, !n);
      };
      if ((s && d.suspense) || Qr)
        return h()
          .then((p) => () => to(p, d))
          .catch((p) => (y(p), () => (n ? ke(n, { error: p }) : null)));
      const b = pt(!1),
        w = pt(),
        m = pt(!!i);
      return (
        i &&
          setTimeout(() => {
            m.value = !1;
          }, i),
        o != null &&
          setTimeout(() => {
            if (!b.value && !w.value) {
              const p = new Error(`Async component timed out after ${o}ms.`);
              y(p), (w.value = p);
            }
          }, o),
        h()
          .then(() => {
            (b.value = !0),
              d.parent && Nn(d.parent.vnode) && xi(d.parent.update);
          })
          .catch((p) => {
            y(p), (w.value = p);
          }),
        () => {
          if (b.value && c) return to(c, d);
          if (w.value && n) return ke(n, { error: w.value });
          if (r && !m.value) return ke(r);
        }
      );
    },
  });
}
function to(e, t) {
  const { ref: r, props: n, children: i, ce: o } = t.vnode,
    s = ke(e, n, i);
  return (s.ref = r), (s.ce = o), delete t.vnode.ce, s;
}
const Nn = (e) => e.type.__isKeepAlive,
  Md = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(e, { slots: t }) {
      const r = Zt(),
        n = r.ctx;
      if (!n.renderer)
        return () => {
          const p = t.default && t.default();
          return p && p.length === 1 ? p[0] : p;
        };
      const i = new Map(),
        o = new Set();
      let s = null;
      const a = r.suspense,
        {
          renderer: {
            p: u,
            m: c,
            um: l,
            o: { createElement: f },
          },
        } = n,
        h = f("div");
      (n.activate = (p, v, _, S, k) => {
        const T = p.component;
        c(p, v, _, 0, a),
          u(T.vnode, p, v, _, T, a, S, p.slotScopeIds, k),
          De(() => {
            (T.isDeactivated = !1), T.a && Ar(T.a);
            const O = p.props && p.props.onVnodeMounted;
            O && Ve(O, T.parent, p);
          }, a);
      }),
        (n.deactivate = (p) => {
          const v = p.component;
          c(p, h, null, 1, a),
            De(() => {
              v.da && Ar(v.da);
              const _ = p.props && p.props.onVnodeUnmounted;
              _ && Ve(_, v.parent, p), (v.isDeactivated = !0);
            }, a);
        });
      function d(p) {
        ro(p), l(p, r, a, !0);
      }
      function y(p) {
        i.forEach((v, _) => {
          const S = Ho(v.type);
          S && (!p || !p(S)) && b(_);
        });
      }
      function b(p) {
        const v = i.get(p);
        !s || !ht(v, s) ? d(v) : s && ro(s), i.delete(p), o.delete(p);
      }
      Wt(
        () => [e.include, e.exclude],
        ([p, v]) => {
          p && y((_) => ln(p, _)), v && y((_) => !ln(v, _));
        },
        { flush: "post", deep: !0 }
      );
      let w = null;
      const m = () => {
        w != null && i.set(w, no(r.subTree));
      };
      return (
        zs(m),
        _l(m),
        Di(() => {
          i.forEach((p) => {
            const { subTree: v, suspense: _ } = r,
              S = no(v);
            if (p.type === S.type && p.key === S.key) {
              ro(S);
              const k = S.component.da;
              k && De(k, _);
              return;
            }
            d(p);
          });
        }),
        () => {
          if (((w = null), !t.default)) return null;
          const p = t.default(),
            v = p[0];
          if (p.length > 1) return (s = null), p;
          if (!Cn(v) || (!(v.shapeFlag & 4) && !(v.shapeFlag & 128)))
            return (s = null), v;
          let _ = no(v);
          const S = _.type,
            k = Ho(Mr(_) ? _.type.__asyncResolved || {} : S),
            { include: T, exclude: O, max: M } = e;
          if ((T && (!k || !ln(T, k))) || (O && k && ln(O, k)))
            return (s = _), v;
          const L = _.key == null ? S : _.key,
            Q = i.get(L);
          return (
            _.el && ((_ = Ct(_)), v.shapeFlag & 128 && (v.ssContent = _)),
            (w = L),
            Q
              ? ((_.el = Q.el),
                (_.component = Q.component),
                _.transition && di(_, _.transition),
                (_.shapeFlag |= 512),
                o.delete(L),
                o.add(L))
              : (o.add(L),
                M && o.size > parseInt(M, 10) && b(o.values().next().value)),
            (_.shapeFlag |= 256),
            (s = _),
            fl(v.type) ? v : _
          );
        }
      );
    },
  },
  Ld = Md;
function ln(e, t) {
  return ee(e)
    ? e.some((r) => ln(r, t))
    : Re(e)
    ? e.split(",").includes(t)
    : xh(e)
    ? e.test(t)
    : !1;
}
function gl(e, t) {
  wl(e, "a", t);
}
function bl(e, t) {
  wl(e, "da", t);
}
function wl(e, t, r = Oe) {
  const n =
    e.__wdc ||
    (e.__wdc = () => {
      let i = r;
      for (; i; ) {
        if (i.isDeactivated) return;
        i = i.parent;
      }
      return e();
    });
  if ((Fi(t, n, r), r)) {
    let i = r.parent;
    for (; i && i.parent; )
      Nn(i.parent.vnode) && jd(n, t, r, i), (i = i.parent);
  }
}
function jd(e, t, r, n) {
  const i = Fi(t, e, n, !0);
  El(() => {
    xs(n[t], i);
  }, r);
}
function ro(e) {
  (e.shapeFlag &= -257), (e.shapeFlag &= -513);
}
function no(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function Fi(e, t, r = Oe, n = !1) {
  if (r) {
    const i = r[e] || (r[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...s) => {
          if (r.isUnmounted) return;
          Yr(), Jt(r);
          const a = it(t, r, e, s);
          return zt(), Xr(), a;
        });
    return n ? i.unshift(o) : i.push(o), o;
  }
}
const xt =
    (e) =>
    (t, r = Oe) =>
      (!Qr || e === "sp") && Fi(e, (...n) => t(...n), r),
  qd = xt("bm"),
  zs = xt("m"),
  $d = xt("bu"),
  _l = xt("u"),
  Di = xt("bum"),
  El = xt("um"),
  Hd = xt("sp"),
  Bd = xt("rtg"),
  Qd = xt("rtc");
function Sl(e, t = Oe) {
  Fi("ec", e, t);
}
function qw(e, t) {
  const r = Ye;
  if (r === null) return e;
  const n = Mi(r) || r.proxy,
    i = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [s, a, u, c = ve] = t[o];
    s &&
      (ne(s) && (s = { mounted: s, updated: s }),
      s.deep && ur(a),
      i.push({
        dir: s,
        instance: n,
        value: a,
        oldValue: void 0,
        arg: u,
        modifiers: c,
      }));
  }
  return e;
}
function wt(e, t, r, n) {
  const i = e.dirs,
    o = t && t.dirs;
  for (let s = 0; s < i.length; s++) {
    const a = i[s];
    o && (a.oldValue = o[s].value);
    let u = a.dir[n];
    u && (Yr(), it(u, r, 8, [e.el, a, e, t]), Xr());
  }
}
const Ol = "components";
function $w(e, t) {
  return Vd(Ol, e, !0, t) || e;
}
const Ud = Symbol();
function Vd(e, t, r = !0, n = !1) {
  const i = Ye || Oe;
  if (i) {
    const o = i.type;
    if (e === Ol) {
      const a = Ho(o, !1);
      if (a && (a === t || a === Et(t) || a === Ci(Et(t)))) return o;
    }
    const s = ja(i[e] || o[e], t) || ja(i.appContext[e], t);
    return !s && n ? o : s;
  }
}
function ja(e, t) {
  return e && (e[t] || e[Et(t)] || e[Ci(Et(t))]);
}
const Mo = (e) => (e ? (ql(e) ? Mi(e) || e.proxy : Mo(e.parent)) : null),
  dn = Le(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Mo(e.parent),
    $root: (e) => Mo(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ks(e),
    $forceUpdate: (e) => e.f || (e.f = () => xi(e.update)),
    $nextTick: (e) => e.n || (e.n = vr.bind(e.proxy)),
    $watch: (e) => Ad.bind(e),
  }),
  io = (e, t) => e !== ve && !e.__isScriptSetup && ue(e, t),
  Wd = {
    get({ _: e }, t) {
      const {
        ctx: r,
        setupState: n,
        data: i,
        props: o,
        accessCache: s,
        type: a,
        appContext: u,
      } = e;
      let c;
      if (t[0] !== "$") {
        const d = s[t];
        if (d !== void 0)
          switch (d) {
            case 1:
              return n[t];
            case 2:
              return i[t];
            case 4:
              return r[t];
            case 3:
              return o[t];
          }
        else {
          if (io(n, t)) return (s[t] = 1), n[t];
          if (i !== ve && ue(i, t)) return (s[t] = 2), i[t];
          if ((c = e.propsOptions[0]) && ue(c, t)) return (s[t] = 3), o[t];
          if (r !== ve && ue(r, t)) return (s[t] = 4), r[t];
          Lo && (s[t] = 0);
        }
      }
      const l = dn[t];
      let f, h;
      if (l) return t === "$attrs" && ze(e, "get", t), l(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (r !== ve && ue(r, t)) return (s[t] = 4), r[t];
      if (((h = u.config.globalProperties), ue(h, t))) return h[t];
    },
    set({ _: e }, t, r) {
      const { data: n, setupState: i, ctx: o } = e;
      return io(i, t)
        ? ((i[t] = r), !0)
        : n !== ve && ue(n, t)
        ? ((n[t] = r), !0)
        : ue(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = r), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: r,
          ctx: n,
          appContext: i,
          propsOptions: o,
        },
      },
      s
    ) {
      let a;
      return (
        !!r[s] ||
        (e !== ve && ue(e, s)) ||
        io(t, s) ||
        ((a = o[0]) && ue(a, s)) ||
        ue(n, s) ||
        ue(dn, s) ||
        ue(i.config.globalProperties, s)
      );
    },
    defineProperty(e, t, r) {
      return (
        r.get != null
          ? (e._.accessCache[t] = 0)
          : ue(r, "value") && this.set(e, t, r.value, null),
        Reflect.defineProperty(e, t, r)
      );
    },
  };
let Lo = !0;
function zd(e) {
  const t = Ks(e),
    r = e.proxy,
    n = e.ctx;
  (Lo = !1), t.beforeCreate && qa(t.beforeCreate, e, "bc");
  const {
    data: i,
    computed: o,
    methods: s,
    watch: a,
    provide: u,
    inject: c,
    created: l,
    beforeMount: f,
    mounted: h,
    beforeUpdate: d,
    updated: y,
    activated: b,
    deactivated: w,
    beforeDestroy: m,
    beforeUnmount: p,
    destroyed: v,
    unmounted: _,
    render: S,
    renderTracked: k,
    renderTriggered: T,
    errorCaptured: O,
    serverPrefetch: M,
    expose: L,
    inheritAttrs: Q,
    components: q,
    directives: W,
    filters: I,
  } = t;
  if ((c && Kd(c, n, null, e.appContext.config.unwrapInjectedRef), s))
    for (const K in s) {
      const U = s[K];
      ne(U) && (n[K] = U.bind(r));
    }
  if (i) {
    const K = i.call(r, r);
    ge(K) && (e.data = vt(K));
  }
  if (((Lo = !0), o))
    for (const K in o) {
      const U = o[K],
        Ee = ne(U) ? U.bind(r, r) : ne(U.get) ? U.get.bind(r, r) : dt,
        te = !ne(U) && ne(U.set) ? U.set.bind(r) : dt,
        Se = $e({ get: Ee, set: te });
      Object.defineProperty(n, K, {
        enumerable: !0,
        configurable: !0,
        get: () => Se.value,
        set: (be) => (Se.value = be),
      });
    }
  if (a) for (const K in a) Tl(a[K], n, r, K);
  if (u) {
    const K = ne(u) ? u.call(r) : u;
    Reflect.ownKeys(K).forEach((U) => {
      Nr(U, K[U]);
    });
  }
  l && qa(l, e, "c");
  function z(K, U) {
    ee(U) ? U.forEach((Ee) => K(Ee.bind(r))) : U && K(U.bind(r));
  }
  if (
    (z(qd, f),
    z(zs, h),
    z($d, d),
    z(_l, y),
    z(gl, b),
    z(bl, w),
    z(Sl, O),
    z(Qd, k),
    z(Bd, T),
    z(Di, p),
    z(El, _),
    z(Hd, M),
    ee(L))
  )
    if (L.length) {
      const K = e.exposed || (e.exposed = {});
      L.forEach((U) => {
        Object.defineProperty(K, U, {
          get: () => r[U],
          set: (Ee) => (r[U] = Ee),
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === dt && (e.render = S),
    Q != null && (e.inheritAttrs = Q),
    q && (e.components = q),
    W && (e.directives = W);
}
function Kd(e, t, r = dt, n = !1) {
  ee(e) && (e = jo(e));
  for (const i in e) {
    const o = e[i];
    let s;
    ge(o)
      ? "default" in o
        ? (s = We(o.from || i, o.default, !0))
        : (s = We(o.from || i))
      : (s = We(o)),
      _e(s) && n
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (a) => (s.value = a),
          })
        : (t[i] = s);
  }
}
function qa(e, t, r) {
  it(ee(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function Tl(e, t, r, n) {
  const i = n.includes(".") ? pl(r, n) : () => r[n];
  if (Re(e)) {
    const o = t[e];
    ne(o) && Wt(i, o);
  } else if (ne(e)) Wt(i, e.bind(r));
  else if (ge(e))
    if (ee(e)) e.forEach((o) => Tl(o, t, r, n));
    else {
      const o = ne(e.handler) ? e.handler.bind(r) : t[e.handler];
      ne(o) && Wt(i, o, e);
    }
}
function Ks(e) {
  const t = e.type,
    { mixins: r, extends: n } = t,
    {
      mixins: i,
      optionsCache: o,
      config: { optionMergeStrategies: s },
    } = e.appContext,
    a = o.get(t);
  let u;
  return (
    a
      ? (u = a)
      : !i.length && !r && !n
      ? (u = t)
      : ((u = {}), i.length && i.forEach((c) => pi(u, c, s, !0)), pi(u, t, s)),
    ge(t) && o.set(t, u),
    u
  );
}
function pi(e, t, r, n = !1) {
  const { mixins: i, extends: o } = t;
  o && pi(e, o, r, !0), i && i.forEach((s) => pi(e, s, r, !0));
  for (const s in t)
    if (!(n && s === "expose")) {
      const a = Jd[s] || (r && r[s]);
      e[s] = a ? a(e[s], t[s]) : t[s];
    }
  return e;
}
const Jd = {
  data: $a,
  props: nr,
  emits: nr,
  methods: nr,
  computed: nr,
  beforeCreate: He,
  created: He,
  beforeMount: He,
  mounted: He,
  beforeUpdate: He,
  updated: He,
  beforeDestroy: He,
  beforeUnmount: He,
  destroyed: He,
  unmounted: He,
  activated: He,
  deactivated: He,
  errorCaptured: He,
  serverPrefetch: He,
  components: nr,
  directives: nr,
  watch: Yd,
  provide: $a,
  inject: Gd,
};
function $a(e, t) {
  return t
    ? e
      ? function () {
          return Le(
            ne(e) ? e.call(this, this) : e,
            ne(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Gd(e, t) {
  return nr(jo(e), jo(t));
}
function jo(e) {
  if (ee(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
    return t;
  }
  return e;
}
function He(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function nr(e, t) {
  return e ? Le(Le(Object.create(null), e), t) : t;
}
function Yd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = Le(Object.create(null), e);
  for (const n in t) r[n] = He(e[n], t[n]);
  return r;
}
function Xd(e, t, r, n = !1) {
  const i = {},
    o = {};
  ci(o, Ni, 1), (e.propsDefaults = Object.create(null)), kl(e, t, i, o);
  for (const s in e.propsOptions[0]) s in i || (i[s] = void 0);
  r ? (e.props = n ? i : ld(i)) : e.type.props ? (e.props = i) : (e.props = o),
    (e.attrs = o);
}
function Zd(e, t, r, n) {
  const {
      props: i,
      attrs: o,
      vnode: { patchFlag: s },
    } = e,
    a = ae(i),
    [u] = e.propsOptions;
  let c = !1;
  if ((n || s > 0) && !(s & 16)) {
    if (s & 8) {
      const l = e.vnode.dynamicProps;
      for (let f = 0; f < l.length; f++) {
        let h = l[f];
        if (Ii(e.emitsOptions, h)) continue;
        const d = t[h];
        if (u)
          if (ue(o, h)) d !== o[h] && ((o[h] = d), (c = !0));
          else {
            const y = Et(h);
            i[y] = qo(u, a, y, d, e, !1);
          }
        else d !== o[h] && ((o[h] = d), (c = !0));
      }
    }
  } else {
    kl(e, t, i, o) && (c = !0);
    let l;
    for (const f in a)
      (!t || (!ue(t, f) && ((l = yr(f)) === f || !ue(t, l)))) &&
        (u
          ? r &&
            (r[f] !== void 0 || r[l] !== void 0) &&
            (i[f] = qo(u, a, f, void 0, e, !0))
          : delete i[f]);
    if (o !== a)
      for (const f in o) (!t || !ue(t, f)) && (delete o[f], (c = !0));
  }
  c && Rt(e, "set", "$attrs");
}
function kl(e, t, r, n) {
  const [i, o] = e.propsOptions;
  let s = !1,
    a;
  if (t)
    for (let u in t) {
      if (hn(u)) continue;
      const c = t[u];
      let l;
      i && ue(i, (l = Et(u)))
        ? !o || !o.includes(l)
          ? (r[l] = c)
          : ((a || (a = {}))[l] = c)
        : Ii(e.emitsOptions, u) ||
          ((!(u in n) || c !== n[u]) && ((n[u] = c), (s = !0)));
    }
  if (o) {
    const u = ae(r),
      c = a || ve;
    for (let l = 0; l < o.length; l++) {
      const f = o[l];
      r[f] = qo(i, u, f, c[f], e, !ue(c, f));
    }
  }
  return s;
}
function qo(e, t, r, n, i, o) {
  const s = e[r];
  if (s != null) {
    const a = ue(s, "default");
    if (a && n === void 0) {
      const u = s.default;
      if (s.type !== Function && ne(u)) {
        const { propsDefaults: c } = i;
        r in c ? (n = c[r]) : (Jt(i), (n = c[r] = u.call(null, t)), zt());
      } else n = u;
    }
    s[0] &&
      (o && !a ? (n = !1) : s[1] && (n === "" || n === yr(r)) && (n = !0));
  }
  return n;
}
function Rl(e, t, r = !1) {
  const n = t.propsCache,
    i = n.get(e);
  if (i) return i;
  const o = e.props,
    s = {},
    a = [];
  let u = !1;
  if (!ne(e)) {
    const l = (f) => {
      u = !0;
      const [h, d] = Rl(f, t, !0);
      Le(s, h), d && a.push(...d);
    };
    !r && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  if (!o && !u) return ge(e) && n.set(e, xr), xr;
  if (ee(o))
    for (let l = 0; l < o.length; l++) {
      const f = Et(o[l]);
      Ha(f) && (s[f] = ve);
    }
  else if (o)
    for (const l in o) {
      const f = Et(l);
      if (Ha(f)) {
        const h = o[l],
          d = (s[f] = ee(h) || ne(h) ? { type: h } : Object.assign({}, h));
        if (d) {
          const y = Ua(Boolean, d.type),
            b = Ua(String, d.type);
          (d[0] = y > -1),
            (d[1] = b < 0 || y < b),
            (y > -1 || ue(d, "default")) && a.push(f);
        }
      }
    }
  const c = [s, a];
  return ge(e) && n.set(e, c), c;
}
function Ha(e) {
  return e[0] !== "$";
}
function Ba(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Qa(e, t) {
  return Ba(e) === Ba(t);
}
function Ua(e, t) {
  return ee(t) ? t.findIndex((r) => Qa(r, e)) : ne(t) && Qa(t, e) ? 0 : -1;
}
const Cl = (e) => e[0] === "_" || e === "$stable",
  Js = (e) => (ee(e) ? e.map(tt) : [tt(e)]),
  ep = (e, t, r) => {
    if (t._n) return t;
    const n = Qs((...i) => Js(t(...i)), r);
    return (n._c = !1), n;
  },
  Pl = (e, t, r) => {
    const n = e._ctx;
    for (const i in e) {
      if (Cl(i)) continue;
      const o = e[i];
      if (ne(o)) t[i] = ep(i, o, n);
      else if (o != null) {
        const s = Js(o);
        t[i] = () => s;
      }
    }
  },
  xl = (e, t) => {
    const r = Js(t);
    e.slots.default = () => r;
  },
  tp = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const r = t._;
      r ? ((e.slots = ae(t)), ci(t, "_", r)) : Pl(t, (e.slots = {}));
    } else (e.slots = {}), t && xl(e, t);
    ci(e.slots, Ni, 1);
  },
  rp = (e, t, r) => {
    const { vnode: n, slots: i } = e;
    let o = !0,
      s = ve;
    if (n.shapeFlag & 32) {
      const a = t._;
      a
        ? r && a === 1
          ? (o = !1)
          : (Le(i, t), !r && a === 1 && delete i._)
        : ((o = !t.$stable), Pl(t, i)),
        (s = t);
    } else t && (xl(e, t), (s = { default: 1 }));
    if (o) for (const a in i) !Cl(a) && !(a in s) && delete i[a];
  };
function Il() {
  return {
    app: null,
    config: {
      isNativeTag: Rh,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let np = 0;
function ip(e, t) {
  return function (n, i = null) {
    ne(n) || (n = Object.assign({}, n)), i != null && !ge(i) && (i = null);
    const o = Il(),
      s = new Set();
    let a = !1;
    const u = (o.app = {
      _uid: np++,
      _component: n,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: Ys,
      get config() {
        return o.config;
      },
      set config(c) {},
      use(c, ...l) {
        return (
          s.has(c) ||
            (c && ne(c.install)
              ? (s.add(c), c.install(u, ...l))
              : ne(c) && (s.add(c), c(u, ...l))),
          u
        );
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), u;
      },
      component(c, l) {
        return l ? ((o.components[c] = l), u) : o.components[c];
      },
      directive(c, l) {
        return l ? ((o.directives[c] = l), u) : o.directives[c];
      },
      mount(c, l, f) {
        if (!a) {
          const h = ke(n, i);
          return (
            (h.appContext = o),
            l && t ? t(h, c) : e(h, c, f),
            (a = !0),
            (u._container = c),
            (c.__vue_app__ = u),
            Mi(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, l) {
        return (o.provides[c] = l), u;
      },
    });
    return u;
  };
}
function yi(e, t, r, n, i = !1) {
  if (ee(e)) {
    e.forEach((h, d) => yi(h, t && (ee(t) ? t[d] : t), r, n, i));
    return;
  }
  if (Mr(n) && !i) return;
  const o = n.shapeFlag & 4 ? Mi(n.component) || n.component.proxy : n.el,
    s = i ? null : o,
    { i: a, r: u } = e,
    c = t && t.r,
    l = a.refs === ve ? (a.refs = {}) : a.refs,
    f = a.setupState;
  if (
    (c != null &&
      c !== u &&
      (Re(c)
        ? ((l[c] = null), ue(f, c) && (f[c] = null))
        : _e(c) && (c.value = null)),
    ne(u))
  )
    Vt(u, a, 12, [s, l]);
  else {
    const h = Re(u),
      d = _e(u);
    if (h || d) {
      const y = () => {
        if (e.f) {
          const b = h ? (ue(f, u) ? f[u] : l[u]) : u.value;
          i
            ? ee(b) && xs(b, o)
            : ee(b)
            ? b.includes(o) || b.push(o)
            : h
            ? ((l[u] = [o]), ue(f, u) && (f[u] = l[u]))
            : ((u.value = [o]), e.k && (l[e.k] = u.value));
        } else
          h
            ? ((l[u] = s), ue(f, u) && (f[u] = s))
            : d && ((u.value = s), e.k && (l[e.k] = s));
      };
      s ? ((y.id = -1), De(y, r)) : y();
    }
  }
}
let At = !1;
const Wn = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  zn = (e) => e.nodeType === 8;
function op(e) {
  const {
      mt: t,
      p: r,
      o: {
        patchProp: n,
        createText: i,
        nextSibling: o,
        parentNode: s,
        remove: a,
        insert: u,
        createComment: c,
      },
    } = e,
    l = (m, p) => {
      if (!p.hasChildNodes()) {
        r(null, m, p), fi(), (p._vnode = m);
        return;
      }
      (At = !1),
        f(p.firstChild, m, null, null, null),
        fi(),
        (p._vnode = m),
        At && console.error("Hydration completed but contains mismatches.");
    },
    f = (m, p, v, _, S, k = !1) => {
      const T = zn(m) && m.data === "[",
        O = () => b(m, p, v, _, S, T),
        { type: M, ref: L, shapeFlag: Q, patchFlag: q } = p;
      let W = m.nodeType;
      (p.el = m), q === -2 && ((k = !1), (p.dynamicChildren = null));
      let I = null;
      switch (M) {
        case Hr:
          W !== 3
            ? p.children === ""
              ? (u((p.el = i("")), s(m), m), (I = m))
              : (I = O())
            : (m.data !== p.children && ((At = !0), (m.data = p.children)),
              (I = o(m)));
          break;
        case ot:
          W !== 8 || T ? (I = O()) : (I = o(m));
          break;
        case ti:
          if ((T && ((m = o(m)), (W = m.nodeType)), W === 1 || W === 3)) {
            I = m;
            const Z = !p.children.length;
            for (let z = 0; z < p.staticCount; z++)
              Z && (p.children += I.nodeType === 1 ? I.outerHTML : I.data),
                z === p.staticCount - 1 && (p.anchor = I),
                (I = o(I));
            return T ? o(I) : I;
          } else O();
          break;
        case et:
          T ? (I = y(m, p, v, _, S, k)) : (I = O());
          break;
        default:
          if (Q & 1)
            W !== 1 || p.type.toLowerCase() !== m.tagName.toLowerCase()
              ? (I = O())
              : (I = h(m, p, v, _, S, k));
          else if (Q & 6) {
            p.slotScopeIds = S;
            const Z = s(m);
            if (
              (t(p, Z, null, v, _, Wn(Z), k),
              (I = T ? w(m) : o(m)),
              I && zn(I) && I.data === "teleport end" && (I = o(I)),
              Mr(p))
            ) {
              let z;
              T
                ? ((z = ke(et)),
                  (z.anchor = I ? I.previousSibling : Z.lastChild))
                : (z = m.nodeType === 3 ? jl("") : ke("div")),
                (z.el = m),
                (p.component.subTree = z);
            }
          } else
            Q & 64
              ? W !== 8
                ? (I = O())
                : (I = p.type.hydrate(m, p, v, _, S, k, e, d))
              : Q & 128 &&
                (I = p.type.hydrate(m, p, v, _, Wn(s(m)), S, k, e, f));
      }
      return L != null && yi(L, null, _, p), I;
    },
    h = (m, p, v, _, S, k) => {
      k = k || !!p.dynamicChildren;
      const { type: T, props: O, patchFlag: M, shapeFlag: L, dirs: Q } = p,
        q = (T === "input" && Q) || T === "option";
      if (q || M !== -1) {
        if ((Q && wt(p, null, v, "created"), O))
          if (q || !k || M & 48)
            for (const I in O)
              ((q && I.endsWith("value")) || (Fn(I) && !hn(I))) &&
                n(m, I, null, O[I], !1, void 0, v);
          else O.onClick && n(m, "onClick", null, O.onClick, !1, void 0, v);
        let W;
        if (
          ((W = O && O.onVnodeBeforeMount) && Ve(W, v, p),
          Q && wt(p, null, v, "beforeMount"),
          ((W = O && O.onVnodeMounted) || Q) &&
            dl(() => {
              W && Ve(W, v, p), Q && wt(p, null, v, "mounted");
            }, _),
          L & 16 && !(O && (O.innerHTML || O.textContent)))
        ) {
          let I = d(m.firstChild, p, m, v, _, S, k);
          for (; I; ) {
            At = !0;
            const Z = I;
            (I = I.nextSibling), a(Z);
          }
        } else
          L & 8 &&
            m.textContent !== p.children &&
            ((At = !0), (m.textContent = p.children));
      }
      return m.nextSibling;
    },
    d = (m, p, v, _, S, k, T) => {
      T = T || !!p.dynamicChildren;
      const O = p.children,
        M = O.length;
      for (let L = 0; L < M; L++) {
        const Q = T ? O[L] : (O[L] = tt(O[L]));
        if (m) m = f(m, Q, _, S, k, T);
        else {
          if (Q.type === Hr && !Q.children) continue;
          (At = !0), r(null, Q, v, null, _, S, Wn(v), k);
        }
      }
      return m;
    },
    y = (m, p, v, _, S, k) => {
      const { slotScopeIds: T } = p;
      T && (S = S ? S.concat(T) : T);
      const O = s(m),
        M = d(o(m), p, O, v, _, S, k);
      return M && zn(M) && M.data === "]"
        ? o((p.anchor = M))
        : ((At = !0), u((p.anchor = c("]")), O, M), M);
    },
    b = (m, p, v, _, S, k) => {
      if (((At = !0), (p.el = null), k)) {
        const M = w(m);
        for (;;) {
          const L = o(m);
          if (L && L !== M) a(L);
          else break;
        }
      }
      const T = o(m),
        O = s(m);
      return a(m), r(null, p, O, T, v, _, Wn(O), S), T;
    },
    w = (m) => {
      let p = 0;
      for (; m; )
        if (
          ((m = o(m)), m && zn(m) && (m.data === "[" && p++, m.data === "]"))
        ) {
          if (p === 0) return o(m);
          p--;
        }
      return m;
    };
  return [l, f];
}
const De = dl;
function sp(e) {
  return Al(e);
}
function ap(e) {
  return Al(e, op);
}
function Al(e, t) {
  const r = Dh();
  r.__VUE__ = !0;
  const {
      insert: n,
      remove: i,
      patchProp: o,
      createElement: s,
      createText: a,
      createComment: u,
      setText: c,
      setElementText: l,
      parentNode: f,
      nextSibling: h,
      setScopeId: d = dt,
      insertStaticContent: y,
    } = e,
    b = (
      g,
      E,
      C,
      x = null,
      A = null,
      j = null,
      B = !1,
      N = null,
      $ = !!E.dynamicChildren
    ) => {
      if (g === E) return;
      g && !ht(g, E) && ((x = H(g)), be(g, A, j, !0), (g = null)),
        E.patchFlag === -2 && (($ = !1), (E.dynamicChildren = null));
      const { type: F, ref: Y, shapeFlag: J } = E;
      switch (F) {
        case Hr:
          w(g, E, C, x);
          break;
        case ot:
          m(g, E, C, x);
          break;
        case ti:
          g == null && p(E, C, x, B);
          break;
        case et:
          q(g, E, C, x, A, j, B, N, $);
          break;
        default:
          J & 1
            ? S(g, E, C, x, A, j, B, N, $)
            : J & 6
            ? W(g, E, C, x, A, j, B, N, $)
            : (J & 64 || J & 128) && F.process(g, E, C, x, A, j, B, N, $, ce);
      }
      Y != null && A && yi(Y, g && g.ref, j, E || g, !E);
    },
    w = (g, E, C, x) => {
      if (g == null) n((E.el = a(E.children)), C, x);
      else {
        const A = (E.el = g.el);
        E.children !== g.children && c(A, E.children);
      }
    },
    m = (g, E, C, x) => {
      g == null ? n((E.el = u(E.children || "")), C, x) : (E.el = g.el);
    },
    p = (g, E, C, x) => {
      [g.el, g.anchor] = y(g.children, E, C, x, g.el, g.anchor);
    },
    v = ({ el: g, anchor: E }, C, x) => {
      let A;
      for (; g && g !== E; ) (A = h(g)), n(g, C, x), (g = A);
      n(E, C, x);
    },
    _ = ({ el: g, anchor: E }) => {
      let C;
      for (; g && g !== E; ) (C = h(g)), i(g), (g = C);
      i(E);
    },
    S = (g, E, C, x, A, j, B, N, $) => {
      (B = B || E.type === "svg"),
        g == null ? k(E, C, x, A, j, B, N, $) : M(g, E, A, j, B, N, $);
    },
    k = (g, E, C, x, A, j, B, N) => {
      let $, F;
      const { type: Y, props: J, shapeFlag: X, transition: re, dirs: oe } = g;
      if (
        (($ = g.el = s(g.type, j, J && J.is, J)),
        X & 8
          ? l($, g.children)
          : X & 16 &&
            O(g.children, $, null, x, A, j && Y !== "foreignObject", B, N),
        oe && wt(g, null, x, "created"),
        T($, g, g.scopeId, B, x),
        J)
      ) {
        for (const he in J)
          he !== "value" &&
            !hn(he) &&
            o($, he, null, J[he], j, g.children, x, A, D);
        "value" in J && o($, "value", null, J.value),
          (F = J.onVnodeBeforeMount) && Ve(F, x, g);
      }
      oe && wt(g, null, x, "beforeMount");
      const ye = (!A || (A && !A.pendingBranch)) && re && !re.persisted;
      ye && re.beforeEnter($),
        n($, E, C),
        ((F = J && J.onVnodeMounted) || ye || oe) &&
          De(() => {
            F && Ve(F, x, g),
              ye && re.enter($),
              oe && wt(g, null, x, "mounted");
          }, A);
    },
    T = (g, E, C, x, A) => {
      if ((C && d(g, C), x)) for (let j = 0; j < x.length; j++) d(g, x[j]);
      if (A) {
        let j = A.subTree;
        if (E === j) {
          const B = A.vnode;
          T(g, B, B.scopeId, B.slotScopeIds, A.parent);
        }
      }
    },
    O = (g, E, C, x, A, j, B, N, $ = 0) => {
      for (let F = $; F < g.length; F++) {
        const Y = (g[F] = N ? Lt(g[F]) : tt(g[F]));
        b(null, Y, E, C, x, A, j, B, N);
      }
    },
    M = (g, E, C, x, A, j, B) => {
      const N = (E.el = g.el);
      let { patchFlag: $, dynamicChildren: F, dirs: Y } = E;
      $ |= g.patchFlag & 16;
      const J = g.props || ve,
        X = E.props || ve;
      let re;
      C && er(C, !1),
        (re = X.onVnodeBeforeUpdate) && Ve(re, C, E, g),
        Y && wt(E, g, C, "beforeUpdate"),
        C && er(C, !0);
      const oe = A && E.type !== "foreignObject";
      if (
        (F
          ? L(g.dynamicChildren, F, N, C, x, oe, j)
          : B || U(g, E, N, null, C, x, oe, j, !1),
        $ > 0)
      ) {
        if ($ & 16) Q(N, E, J, X, C, x, A);
        else if (
          ($ & 2 && J.class !== X.class && o(N, "class", null, X.class, A),
          $ & 4 && o(N, "style", J.style, X.style, A),
          $ & 8)
        ) {
          const ye = E.dynamicProps;
          for (let he = 0; he < ye.length; he++) {
            const Ce = ye[he],
              ut = J[Ce],
              br = X[Ce];
            (br !== ut || Ce === "value") &&
              o(N, Ce, ut, br, A, g.children, C, x, D);
          }
        }
        $ & 1 && g.children !== E.children && l(N, E.children);
      } else !B && F == null && Q(N, E, J, X, C, x, A);
      ((re = X.onVnodeUpdated) || Y) &&
        De(() => {
          re && Ve(re, C, E, g), Y && wt(E, g, C, "updated");
        }, x);
    },
    L = (g, E, C, x, A, j, B) => {
      for (let N = 0; N < E.length; N++) {
        const $ = g[N],
          F = E[N],
          Y =
            $.el && ($.type === et || !ht($, F) || $.shapeFlag & 70)
              ? f($.el)
              : C;
        b($, F, Y, null, x, A, j, B, !0);
      }
    },
    Q = (g, E, C, x, A, j, B) => {
      if (C !== x) {
        if (C !== ve)
          for (const N in C)
            !hn(N) && !(N in x) && o(g, N, C[N], null, B, E.children, A, j, D);
        for (const N in x) {
          if (hn(N)) continue;
          const $ = x[N],
            F = C[N];
          $ !== F && N !== "value" && o(g, N, F, $, B, E.children, A, j, D);
        }
        "value" in x && o(g, "value", C.value, x.value);
      }
    },
    q = (g, E, C, x, A, j, B, N, $) => {
      const F = (E.el = g ? g.el : a("")),
        Y = (E.anchor = g ? g.anchor : a(""));
      let { patchFlag: J, dynamicChildren: X, slotScopeIds: re } = E;
      re && (N = N ? N.concat(re) : re),
        g == null
          ? (n(F, C, x), n(Y, C, x), O(E.children, C, Y, A, j, B, N, $))
          : J > 0 && J & 64 && X && g.dynamicChildren
          ? (L(g.dynamicChildren, X, C, A, j, B, N),
            (E.key != null || (A && E === A.subTree)) && Fl(g, E, !0))
          : U(g, E, C, Y, A, j, B, N, $);
    },
    W = (g, E, C, x, A, j, B, N, $) => {
      (E.slotScopeIds = N),
        g == null
          ? E.shapeFlag & 512
            ? A.ctx.activate(E, C, x, B, $)
            : I(E, C, x, A, j, B, $)
          : Z(g, E, $);
    },
    I = (g, E, C, x, A, j, B) => {
      const N = (g.component = vp(g, x, A));
      if ((Nn(g) && (N.ctx.renderer = ce), mp(N), N.asyncDep)) {
        if ((A && A.registerDep(N, z), !g.el)) {
          const $ = (N.subTree = ke(ot));
          m(null, $, E, C);
        }
        return;
      }
      z(N, g, E, C, A, j, B);
    },
    Z = (g, E, C) => {
      const x = (E.component = g.component);
      if (Td(g, E, C))
        if (x.asyncDep && !x.asyncResolved) {
          K(x, E, C);
          return;
        } else (x.next = E), bd(x.update), x.update();
      else (E.el = g.el), (x.vnode = E);
    },
    z = (g, E, C, x, A, j, B) => {
      const N = () => {
          if (g.isMounted) {
            let { next: Y, bu: J, u: X, parent: re, vnode: oe } = g,
              ye = Y,
              he;
            er(g, !1),
              Y ? ((Y.el = oe.el), K(g, Y, B)) : (Y = oe),
              J && Ar(J),
              (he = Y.props && Y.props.onVnodeBeforeUpdate) &&
                Ve(he, re, Y, oe),
              er(g, !0);
            const Ce = Zi(g),
              ut = g.subTree;
            (g.subTree = Ce),
              b(ut, Ce, f(ut.el), H(ut), g, A, j),
              (Y.el = Ce.el),
              ye === null && Us(g, Ce.el),
              X && De(X, A),
              (he = Y.props && Y.props.onVnodeUpdated) &&
                De(() => Ve(he, re, Y, oe), A);
          } else {
            let Y;
            const { el: J, props: X } = E,
              { bm: re, m: oe, parent: ye } = g,
              he = Mr(E);
            if (
              (er(g, !1),
              re && Ar(re),
              !he && (Y = X && X.onVnodeBeforeMount) && Ve(Y, ye, E),
              er(g, !0),
              J && ie)
            ) {
              const Ce = () => {
                (g.subTree = Zi(g)), ie(J, g.subTree, g, A, null);
              };
              he
                ? E.type.__asyncLoader().then(() => !g.isUnmounted && Ce())
                : Ce();
            } else {
              const Ce = (g.subTree = Zi(g));
              b(null, Ce, C, x, g, A, j), (E.el = Ce.el);
            }
            if ((oe && De(oe, A), !he && (Y = X && X.onVnodeMounted))) {
              const Ce = E;
              De(() => Ve(Y, ye, Ce), A);
            }
            (E.shapeFlag & 256 ||
              (ye && Mr(ye.vnode) && ye.vnode.shapeFlag & 256)) &&
              g.a &&
              De(g.a, A),
              (g.isMounted = !0),
              (E = C = x = null);
          }
        },
        $ = (g.effect = new Ns(N, () => xi(F), g.scope)),
        F = (g.update = () => $.run());
      (F.id = g.uid), er(g, !0), F();
    },
    K = (g, E, C) => {
      E.component = g;
      const x = g.vnode.props;
      (g.vnode = E),
        (g.next = null),
        Zd(g, E.props, x, C),
        rp(g, E.children, C),
        Yr(),
        Da(),
        Xr();
    },
    U = (g, E, C, x, A, j, B, N, $ = !1) => {
      const F = g && g.children,
        Y = g ? g.shapeFlag : 0,
        J = E.children,
        { patchFlag: X, shapeFlag: re } = E;
      if (X > 0) {
        if (X & 128) {
          te(F, J, C, x, A, j, B, N, $);
          return;
        } else if (X & 256) {
          Ee(F, J, C, x, A, j, B, N, $);
          return;
        }
      }
      re & 8
        ? (Y & 16 && D(F, A, j), J !== F && l(C, J))
        : Y & 16
        ? re & 16
          ? te(F, J, C, x, A, j, B, N, $)
          : D(F, A, j, !0)
        : (Y & 8 && l(C, ""), re & 16 && O(J, C, x, A, j, B, N, $));
    },
    Ee = (g, E, C, x, A, j, B, N, $) => {
      (g = g || xr), (E = E || xr);
      const F = g.length,
        Y = E.length,
        J = Math.min(F, Y);
      let X;
      for (X = 0; X < J; X++) {
        const re = (E[X] = $ ? Lt(E[X]) : tt(E[X]));
        b(g[X], re, C, null, A, j, B, N, $);
      }
      F > Y ? D(g, A, j, !0, !1, J) : O(E, C, x, A, j, B, N, $, J);
    },
    te = (g, E, C, x, A, j, B, N, $) => {
      let F = 0;
      const Y = E.length;
      let J = g.length - 1,
        X = Y - 1;
      for (; F <= J && F <= X; ) {
        const re = g[F],
          oe = (E[F] = $ ? Lt(E[F]) : tt(E[F]));
        if (ht(re, oe)) b(re, oe, C, null, A, j, B, N, $);
        else break;
        F++;
      }
      for (; F <= J && F <= X; ) {
        const re = g[J],
          oe = (E[X] = $ ? Lt(E[X]) : tt(E[X]));
        if (ht(re, oe)) b(re, oe, C, null, A, j, B, N, $);
        else break;
        J--, X--;
      }
      if (F > J) {
        if (F <= X) {
          const re = X + 1,
            oe = re < Y ? E[re].el : x;
          for (; F <= X; )
            b(null, (E[F] = $ ? Lt(E[F]) : tt(E[F])), C, oe, A, j, B, N, $),
              F++;
        }
      } else if (F > X) for (; F <= J; ) be(g[F], A, j, !0), F++;
      else {
        const re = F,
          oe = F,
          ye = new Map();
        for (F = oe; F <= X; F++) {
          const Ke = (E[F] = $ ? Lt(E[F]) : tt(E[F]));
          Ke.key != null && ye.set(Ke.key, F);
        }
        let he,
          Ce = 0;
        const ut = X - oe + 1;
        let br = !1,
          Sa = 0;
        const en = new Array(ut);
        for (F = 0; F < ut; F++) en[F] = 0;
        for (F = re; F <= J; F++) {
          const Ke = g[F];
          if (Ce >= ut) {
            be(Ke, A, j, !0);
            continue;
          }
          let bt;
          if (Ke.key != null) bt = ye.get(Ke.key);
          else
            for (he = oe; he <= X; he++)
              if (en[he - oe] === 0 && ht(Ke, E[he])) {
                bt = he;
                break;
              }
          bt === void 0
            ? be(Ke, A, j, !0)
            : ((en[bt - oe] = F + 1),
              bt >= Sa ? (Sa = bt) : (br = !0),
              b(Ke, E[bt], C, null, A, j, B, N, $),
              Ce++);
        }
        const Oa = br ? cp(en) : xr;
        for (he = Oa.length - 1, F = ut - 1; F >= 0; F--) {
          const Ke = oe + F,
            bt = E[Ke],
            Ta = Ke + 1 < Y ? E[Ke + 1].el : x;
          en[F] === 0
            ? b(null, bt, C, Ta, A, j, B, N, $)
            : br && (he < 0 || F !== Oa[he] ? Se(bt, C, Ta, 2) : he--);
        }
      }
    },
    Se = (g, E, C, x, A = null) => {
      const { el: j, type: B, transition: N, children: $, shapeFlag: F } = g;
      if (F & 6) {
        Se(g.component.subTree, E, C, x);
        return;
      }
      if (F & 128) {
        g.suspense.move(E, C, x);
        return;
      }
      if (F & 64) {
        B.move(g, E, C, ce);
        return;
      }
      if (B === et) {
        n(j, E, C);
        for (let J = 0; J < $.length; J++) Se($[J], E, C, x);
        n(g.anchor, E, C);
        return;
      }
      if (B === ti) {
        v(g, E, C);
        return;
      }
      if (x !== 2 && F & 1 && N)
        if (x === 0) N.beforeEnter(j), n(j, E, C), De(() => N.enter(j), A);
        else {
          const { leave: J, delayLeave: X, afterLeave: re } = N,
            oe = () => n(j, E, C),
            ye = () => {
              J(j, () => {
                oe(), re && re();
              });
            };
          X ? X(j, oe, ye) : ye();
        }
      else n(j, E, C);
    },
    be = (g, E, C, x = !1, A = !1) => {
      const {
        type: j,
        props: B,
        ref: N,
        children: $,
        dynamicChildren: F,
        shapeFlag: Y,
        patchFlag: J,
        dirs: X,
      } = g;
      if ((N != null && yi(N, null, C, g, !0), Y & 256)) {
        E.ctx.deactivate(g);
        return;
      }
      const re = Y & 1 && X,
        oe = !Mr(g);
      let ye;
      if ((oe && (ye = B && B.onVnodeBeforeUnmount) && Ve(ye, E, g), Y & 6))
        P(g.component, C, x);
      else {
        if (Y & 128) {
          g.suspense.unmount(C, x);
          return;
        }
        re && wt(g, null, E, "beforeUnmount"),
          Y & 64
            ? g.type.remove(g, E, C, A, ce, x)
            : F && (j !== et || (J > 0 && J & 64))
            ? D(F, E, C, !1, !0)
            : ((j === et && J & 384) || (!A && Y & 16)) && D($, E, C),
          x && at(g);
      }
      ((oe && (ye = B && B.onVnodeUnmounted)) || re) &&
        De(() => {
          ye && Ve(ye, E, g), re && wt(g, null, E, "unmounted");
        }, C);
    },
    at = (g) => {
      const { type: E, el: C, anchor: x, transition: A } = g;
      if (E === et) {
        ct(C, x);
        return;
      }
      if (E === ti) {
        _(g);
        return;
      }
      const j = () => {
        i(C), A && !A.persisted && A.afterLeave && A.afterLeave();
      };
      if (g.shapeFlag & 1 && A && !A.persisted) {
        const { leave: B, delayLeave: N } = A,
          $ = () => B(C, j);
        N ? N(g.el, j, $) : $();
      } else j();
    },
    ct = (g, E) => {
      let C;
      for (; g !== E; ) (C = h(g)), i(g), (g = C);
      i(E);
    },
    P = (g, E, C) => {
      const { bum: x, scope: A, update: j, subTree: B, um: N } = g;
      x && Ar(x),
        A.stop(),
        j && ((j.active = !1), be(B, g, E, C)),
        N && De(N, E),
        De(() => {
          g.isUnmounted = !0;
        }, E),
        E &&
          E.pendingBranch &&
          !E.isUnmounted &&
          g.asyncDep &&
          !g.asyncResolved &&
          g.suspenseId === E.pendingId &&
          (E.deps--, E.deps === 0 && E.resolve());
    },
    D = (g, E, C, x = !1, A = !1, j = 0) => {
      for (let B = j; B < g.length; B++) be(g[B], E, C, x, A);
    },
    H = (g) =>
      g.shapeFlag & 6
        ? H(g.component.subTree)
        : g.shapeFlag & 128
        ? g.suspense.next()
        : h(g.anchor || g.el),
    G = (g, E, C) => {
      g == null
        ? E._vnode && be(E._vnode, null, null, !0)
        : b(E._vnode || null, g, E, null, null, null, C),
        Da(),
        fi(),
        (E._vnode = g);
    },
    ce = {
      p: b,
      um: be,
      m: Se,
      r: at,
      mt: I,
      mc: O,
      pc: U,
      pbc: L,
      n: H,
      o: e,
    };
  let we, ie;
  return (
    t && ([we, ie] = t(ce)), { render: G, hydrate: we, createApp: ip(G, we) }
  );
}
function er({ effect: e, update: t }, r) {
  e.allowRecurse = t.allowRecurse = r;
}
function Fl(e, t, r = !1) {
  const n = e.children,
    i = t.children;
  if (ee(n) && ee(i))
    for (let o = 0; o < n.length; o++) {
      const s = n[o];
      let a = i[o];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = i[o] = Lt(i[o])), (a.el = s.el)),
        r || Fl(s, a)),
        a.type === Hr && (a.el = s.el);
    }
}
function cp(e) {
  const t = e.slice(),
    r = [0];
  let n, i, o, s, a;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const c = e[n];
    if (c !== 0) {
      if (((i = r[r.length - 1]), e[i] < c)) {
        (t[n] = i), r.push(n);
        continue;
      }
      for (o = 0, s = r.length - 1; o < s; )
        (a = (o + s) >> 1), e[r[a]] < c ? (o = a + 1) : (s = a);
      c < e[r[o]] && (o > 0 && (t[n] = r[o - 1]), (r[o] = n));
    }
  }
  for (o = r.length, s = r[o - 1]; o-- > 0; ) (r[o] = s), (s = t[s]);
  return r;
}
const up = (e) => e.__isTeleport,
  et = Symbol(void 0),
  Hr = Symbol(void 0),
  ot = Symbol(void 0),
  ti = Symbol(void 0),
  pn = [];
let nt = null;
function Tr(e = !1) {
  pn.push((nt = e ? null : []));
}
function Dl() {
  pn.pop(), (nt = pn[pn.length - 1] || null);
}
let Br = 1;
function Va(e) {
  Br += e;
}
function Nl(e) {
  return (
    (e.dynamicChildren = Br > 0 ? nt || xr : null),
    Dl(),
    Br > 0 && nt && nt.push(e),
    e
  );
}
function lp(e, t, r, n, i, o) {
  return Nl(Ll(e, t, r, n, i, o, !0));
}
function Kn(e, t, r, n, i) {
  return Nl(ke(e, t, r, n, i, !0));
}
function Cn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ht(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ni = "__vInternal",
  Ml = ({ key: e }) => e ?? null,
  ri = ({ ref: e, ref_key: t, ref_for: r }) =>
    e != null
      ? Re(e) || _e(e) || ne(e)
        ? { i: Ye, r: e, k: t, f: !!r }
        : e
      : null;
function Ll(
  e,
  t = null,
  r = null,
  n = 0,
  i = null,
  o = e === et ? 0 : 1,
  s = !1,
  a = !1
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ml(t),
    ref: t && ri(t),
    scopeId: Ai,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ye,
  };
  return (
    a
      ? (Gs(u, r), o & 128 && e.normalize(u))
      : r && (u.shapeFlag |= Re(r) ? 8 : 16),
    Br > 0 &&
      !s &&
      nt &&
      (u.patchFlag > 0 || o & 6) &&
      u.patchFlag !== 32 &&
      nt.push(u),
    u
  );
}
const ke = fp;
function fp(e, t = null, r = null, n = 0, i = null, o = !1) {
  if (((!e || e === Ud) && (e = ot), Cn(e))) {
    const a = Ct(e, t, !0);
    return (
      r && Gs(a, r),
      Br > 0 &&
        !o &&
        nt &&
        (a.shapeFlag & 6 ? (nt[nt.indexOf(e)] = a) : nt.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((_p(e) && (e = e.__vccOpts), t)) {
    t = hp(t);
    let { class: a, style: u } = t;
    a && !Re(a) && (t.class = ki(a)),
      ge(u) && (el(u) && !ee(u) && (u = Le({}, u)), (t.style = Ti(u)));
  }
  const s = Re(e) ? 1 : fl(e) ? 128 : up(e) ? 64 : ge(e) ? 4 : ne(e) ? 2 : 0;
  return Ll(e, t, r, n, i, s, o, !0);
}
function hp(e) {
  return e ? (el(e) || Ni in e ? Le({}, e) : e) : null;
}
function Ct(e, t, r = !1) {
  const { props: n, ref: i, patchFlag: o, children: s } = e,
    a = t ? dp(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Ml(a),
    ref:
      t && t.ref
        ? r && i
          ? ee(i)
            ? i.concat(ri(t))
            : [i, ri(t)]
          : ri(t)
        : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== et ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ct(e.ssContent),
    ssFallback: e.ssFallback && Ct(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function jl(e = " ", t = 0) {
  return ke(Hr, null, e, t);
}
function tt(e) {
  return e == null || typeof e == "boolean"
    ? ke(ot)
    : ee(e)
    ? ke(et, null, e.slice())
    : typeof e == "object"
    ? Lt(e)
    : ke(Hr, null, String(e));
}
function Lt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ct(e);
}
function Gs(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (ee(t)) r = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Gs(e, i()), i._c && (i._d = !0));
      return;
    } else {
      r = 32;
      const i = t._;
      !i && !(Ni in t)
        ? (t._ctx = Ye)
        : i === 3 &&
          Ye &&
          (Ye.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    ne(t)
      ? ((t = { default: t, _ctx: Ye }), (r = 32))
      : ((t = String(t)), n & 64 ? ((r = 16), (t = [jl(t)])) : (r = 8));
  (e.children = t), (e.shapeFlag |= r);
}
function dp(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = ki([t.class, n.class]));
      else if (i === "style") t.style = Ti([t.style, n.style]);
      else if (Fn(i)) {
        const o = t[i],
          s = n[i];
        s &&
          o !== s &&
          !(ee(o) && o.includes(s)) &&
          (t[i] = o ? [].concat(o, s) : s);
      } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function Ve(e, t, r, n = null) {
  it(e, t, 7, [r, n]);
}
const pp = Il();
let yp = 0;
function vp(e, t, r) {
  const n = e.type,
    i = (t ? t.appContext : e.appContext) || pp,
    o = {
      uid: yp++,
      vnode: e,
      type: n,
      parent: t,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new $u(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Rl(n, i),
      emitsOptions: ll(n, i),
      emit: null,
      emitted: null,
      propsDefaults: ve,
      inheritAttrs: n.inheritAttrs,
      ctx: ve,
      data: ve,
      props: ve,
      attrs: ve,
      slots: ve,
      refs: ve,
      setupState: ve,
      setupContext: null,
      suspense: r,
      suspenseId: r ? r.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = _d.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let Oe = null;
const Zt = () => Oe || Ye,
  Jt = (e) => {
    (Oe = e), e.scope.on();
  },
  zt = () => {
    Oe && Oe.scope.off(), (Oe = null);
  };
function ql(e) {
  return e.vnode.shapeFlag & 4;
}
let Qr = !1;
function mp(e, t = !1) {
  Qr = t;
  const { props: r, children: n } = e.vnode,
    i = ql(e);
  Xd(e, r, i, t), tp(e, n);
  const o = i ? gp(e, t) : void 0;
  return (Qr = !1), o;
}
function gp(e, t) {
  const r = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = $r(new Proxy(e.ctx, Wd)));
  const { setup: n } = r;
  if (n) {
    const i = (e.setupContext = n.length > 1 ? wp(e) : null);
    Jt(e), Yr();
    const o = Vt(n, e, 0, [e.props, i]);
    if ((Xr(), zt(), As(o))) {
      if ((o.then(zt, zt), t))
        return o
          .then((s) => {
            $o(e, s, t);
          })
          .catch((s) => {
            Zr(s, e, 0);
          });
      e.asyncDep = o;
    } else $o(e, o, t);
  } else $l(e, t);
}
function $o(e, t, r) {
  ne(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ge(t) && (e.setupState = il(t)),
    $l(e, r);
}
let Wa;
function $l(e, t, r) {
  const n = e.type;
  if (!e.render) {
    if (!t && Wa && !n.render) {
      const i = n.template || Ks(e).template;
      if (i) {
        const { isCustomElement: o, compilerOptions: s } = e.appContext.config,
          { delimiters: a, compilerOptions: u } = n,
          c = Le(Le({ isCustomElement: o, delimiters: a }, s), u);
        n.render = Wa(i, c);
      }
    }
    e.render = n.render || dt;
  }
  Jt(e), Yr(), zd(e), Xr(), zt();
}
function bp(e) {
  return new Proxy(e.attrs, {
    get(t, r) {
      return ze(e, "get", "$attrs"), t[r];
    },
  });
}
function wp(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  let r;
  return {
    get attrs() {
      return r || (r = bp(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Mi(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(il($r(e.exposed)), {
        get(t, r) {
          if (r in t) return t[r];
          if (r in dn) return dn[r](e);
        },
        has(t, r) {
          return r in t || r in dn;
        },
      }))
    );
}
function Ho(e, t = !0) {
  return ne(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function _p(e) {
  return ne(e) && "__vccOpts" in e;
}
const $e = (e, t) => vd(e, t, Qr);
function Hw(e) {
  const t = Zt();
  let r = e();
  return (
    zt(),
    As(r) &&
      (r = r.catch((n) => {
        throw (Jt(t), n);
      })),
    [r, () => Jt(t)]
  );
}
function yt(e, t, r) {
  const n = arguments.length;
  return n === 2
    ? ge(t) && !ee(t)
      ? Cn(t)
        ? ke(e, null, [t])
        : ke(e, t)
      : ke(e, null, t)
    : (n > 3
        ? (r = Array.prototype.slice.call(arguments, 2))
        : n === 3 && Cn(r) && (r = [r]),
      ke(e, t, r));
}
const Ep = Symbol(""),
  Sp = () => We(Ep),
  Ys = "3.2.47",
  Op = "http://www.w3.org/2000/svg",
  ar = typeof document < "u" ? document : null,
  za = ar && ar.createElement("template"),
  Tp = {
    insert: (e, t, r) => {
      t.insertBefore(e, r || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, r, n) => {
      const i = t
        ? ar.createElementNS(Op, e)
        : ar.createElement(e, r ? { is: r } : void 0);
      return (
        e === "select" &&
          n &&
          n.multiple != null &&
          i.setAttribute("multiple", n.multiple),
        i
      );
    },
    createText: (e) => ar.createTextNode(e),
    createComment: (e) => ar.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => ar.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, r, n, i, o) {
      const s = r ? r.previousSibling : t.lastChild;
      if (i && (i === o || i.nextSibling))
        for (
          ;
          t.insertBefore(i.cloneNode(!0), r),
            !(i === o || !(i = i.nextSibling));

        );
      else {
        za.innerHTML = n ? `<svg>${e}</svg>` : e;
        const a = za.content;
        if (n) {
          const u = a.firstChild;
          for (; u.firstChild; ) a.appendChild(u.firstChild);
          a.removeChild(u);
        }
        t.insertBefore(a, r);
      }
      return [
        s ? s.nextSibling : t.firstChild,
        r ? r.previousSibling : t.lastChild,
      ];
    },
  };
function kp(e, t, r) {
  const n = e._vtc;
  n && (t = (t ? [t, ...n] : [...n]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : r
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Rp(e, t, r) {
  const n = e.style,
    i = Re(r);
  if (r && !i) {
    if (t && !Re(t)) for (const o in t) r[o] == null && Bo(n, o, "");
    for (const o in r) Bo(n, o, r[o]);
  } else {
    const o = n.display;
    i ? t !== r && (n.cssText = r) : t && e.removeAttribute("style"),
      "_vod" in e && (n.display = o);
  }
}
const Ka = /\s*!important$/;
function Bo(e, t, r) {
  if (ee(r)) r.forEach((n) => Bo(e, t, n));
  else if ((r == null && (r = ""), t.startsWith("--"))) e.setProperty(t, r);
  else {
    const n = Cp(e, t);
    Ka.test(r)
      ? e.setProperty(yr(n), r.replace(Ka, ""), "important")
      : (e[n] = r);
  }
}
const Ja = ["Webkit", "Moz", "ms"],
  oo = {};
function Cp(e, t) {
  const r = oo[t];
  if (r) return r;
  let n = Et(t);
  if (n !== "filter" && n in e) return (oo[t] = n);
  n = Ci(n);
  for (let i = 0; i < Ja.length; i++) {
    const o = Ja[i] + n;
    if (o in e) return (oo[t] = o);
  }
  return t;
}
const Ga = "http://www.w3.org/1999/xlink";
function Pp(e, t, r, n, i) {
  if (n && t.startsWith("xlink:"))
    r == null
      ? e.removeAttributeNS(Ga, t.slice(6, t.length))
      : e.setAttributeNS(Ga, t, r);
  else {
    const o = kh(t);
    r == null || (o && !Du(r))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : r);
  }
}
function xp(e, t, r, n, i, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n && s(n, i, o), (e[t] = r ?? "");
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = r;
    const u = r ?? "";
    (e.value !== u || e.tagName === "OPTION") && (e.value = u),
      r == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (r === "" || r == null) {
    const u = typeof e[t];
    u === "boolean"
      ? (r = Du(r))
      : r == null && u === "string"
      ? ((r = ""), (a = !0))
      : u === "number" && ((r = 0), (a = !0));
  }
  try {
    e[t] = r;
  } catch {}
  a && e.removeAttribute(t);
}
function Er(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function Ip(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
function Ap(e, t, r, n, i = null) {
  const o = e._vei || (e._vei = {}),
    s = o[t];
  if (n && s) s.value = n;
  else {
    const [a, u] = Fp(t);
    if (n) {
      const c = (o[t] = Mp(n, i));
      Er(e, a, c, u);
    } else s && (Ip(e, a, s, u), (o[t] = void 0));
  }
}
const Ya = /(?:Once|Passive|Capture)$/;
function Fp(e) {
  let t;
  if (Ya.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(Ya)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : yr(e.slice(2)), t];
}
let so = 0;
const Dp = Promise.resolve(),
  Np = () => so || (Dp.then(() => (so = 0)), (so = Date.now()));
function Mp(e, t) {
  const r = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= r.attached) return;
    it(Lp(n, r.value), t, 5, [n]);
  };
  return (r.value = e), (r.attached = Np()), r;
}
function Lp(e, t) {
  if (ee(t)) {
    const r = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        r.call(e), (e._stopped = !0);
      }),
      t.map((n) => (i) => !i._stopped && n && n(i))
    );
  } else return t;
}
const Xa = /^on[a-z]/,
  jp = (e, t, r, n, i = !1, o, s, a, u) => {
    t === "class"
      ? kp(e, n, i)
      : t === "style"
      ? Rp(e, r, n)
      : Fn(t)
      ? Ps(t) || Ap(e, t, r, n, s)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : qp(e, t, n, i)
        )
      ? xp(e, t, n, o, s, a, u)
      : (t === "true-value"
          ? (e._trueValue = n)
          : t === "false-value" && (e._falseValue = n),
        Pp(e, t, n, i));
  };
function qp(e, t, r, n) {
  return n
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Xa.test(t) && ne(r))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Xa.test(t) && Re(r))
    ? !1
    : t in e;
}
const Ft = "transition",
  tn = "animation",
  Li = (e, { slots: t }) => yt(yl, $p(e), t);
Li.displayName = "Transition";
const Hl = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Li.props = Le({}, yl.props, Hl);
const tr = (e, t = []) => {
    ee(e) ? e.forEach((r) => r(...t)) : e && e(...t);
  },
  Za = (e) => (e ? (ee(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function $p(e) {
  const t = {};
  for (const q in e) q in Hl || (t[q] = e[q]);
  if (e.css === !1) return t;
  const {
      name: r = "v",
      type: n,
      duration: i,
      enterFromClass: o = `${r}-enter-from`,
      enterActiveClass: s = `${r}-enter-active`,
      enterToClass: a = `${r}-enter-to`,
      appearFromClass: u = o,
      appearActiveClass: c = s,
      appearToClass: l = a,
      leaveFromClass: f = `${r}-leave-from`,
      leaveActiveClass: h = `${r}-leave-active`,
      leaveToClass: d = `${r}-leave-to`,
    } = e,
    y = Hp(i),
    b = y && y[0],
    w = y && y[1],
    {
      onBeforeEnter: m,
      onEnter: p,
      onEnterCancelled: v,
      onLeave: _,
      onLeaveCancelled: S,
      onBeforeAppear: k = m,
      onAppear: T = p,
      onAppearCancelled: O = v,
    } = t,
    M = (q, W, I) => {
      rr(q, W ? l : a), rr(q, W ? c : s), I && I();
    },
    L = (q, W) => {
      (q._isLeaving = !1), rr(q, f), rr(q, d), rr(q, h), W && W();
    },
    Q = (q) => (W, I) => {
      const Z = q ? T : p,
        z = () => M(W, q, I);
      tr(Z, [W, z]),
        ec(() => {
          rr(W, q ? u : o), Dt(W, q ? l : a), Za(Z) || tc(W, n, b, z);
        });
    };
  return Le(t, {
    onBeforeEnter(q) {
      tr(m, [q]), Dt(q, o), Dt(q, s);
    },
    onBeforeAppear(q) {
      tr(k, [q]), Dt(q, u), Dt(q, c);
    },
    onEnter: Q(!1),
    onAppear: Q(!0),
    onLeave(q, W) {
      q._isLeaving = !0;
      const I = () => L(q, W);
      Dt(q, f),
        Up(),
        Dt(q, h),
        ec(() => {
          q._isLeaving && (rr(q, f), Dt(q, d), Za(_) || tc(q, n, w, I));
        }),
        tr(_, [q, I]);
    },
    onEnterCancelled(q) {
      M(q, !1), tr(v, [q]);
    },
    onAppearCancelled(q) {
      M(q, !0), tr(O, [q]);
    },
    onLeaveCancelled(q) {
      L(q), tr(S, [q]);
    },
  });
}
function Hp(e) {
  if (e == null) return null;
  if (ge(e)) return [ao(e.enter), ao(e.leave)];
  {
    const t = ao(e);
    return [t, t];
  }
}
function ao(e) {
  return qu(e);
}
function Dt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.add(r)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function rr(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const { _vtc: r } = e;
  r && (r.delete(t), r.size || (e._vtc = void 0));
}
function ec(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Bp = 0;
function tc(e, t, r, n) {
  const i = (e._endId = ++Bp),
    o = () => {
      i === e._endId && n();
    };
  if (r) return setTimeout(o, r);
  const { type: s, timeout: a, propCount: u } = Qp(e, t);
  if (!s) return n();
  const c = s + "end";
  let l = 0;
  const f = () => {
      e.removeEventListener(c, h), o();
    },
    h = (d) => {
      d.target === e && ++l >= u && f();
    };
  setTimeout(() => {
    l < u && f();
  }, a + 1),
    e.addEventListener(c, h);
}
function Qp(e, t) {
  const r = window.getComputedStyle(e),
    n = (y) => (r[y] || "").split(", "),
    i = n(`${Ft}Delay`),
    o = n(`${Ft}Duration`),
    s = rc(i, o),
    a = n(`${tn}Delay`),
    u = n(`${tn}Duration`),
    c = rc(a, u);
  let l = null,
    f = 0,
    h = 0;
  t === Ft
    ? s > 0 && ((l = Ft), (f = s), (h = o.length))
    : t === tn
    ? c > 0 && ((l = tn), (f = c), (h = u.length))
    : ((f = Math.max(s, c)),
      (l = f > 0 ? (s > c ? Ft : tn) : null),
      (h = l ? (l === Ft ? o.length : u.length) : 0));
  const d =
    l === Ft && /\b(transform|all)(,|$)/.test(n(`${Ft}Property`).toString());
  return { type: l, timeout: f, propCount: h, hasTransform: d };
}
function rc(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((r, n) => nc(r) + nc(e[n])));
}
function nc(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Up() {
  return document.body.offsetHeight;
}
const ic = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ee(t) ? (r) => Ar(t, r) : t;
};
function Vp(e) {
  e.target.composing = !0;
}
function oc(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Bw = {
    created(e, { modifiers: { lazy: t, trim: r, number: n } }, i) {
      e._assign = ic(i);
      const o = n || (i.props && i.props.type === "number");
      Er(e, t ? "change" : "input", (s) => {
        if (s.target.composing) return;
        let a = e.value;
        r && (a = a.trim()), o && (a = Po(a)), e._assign(a);
      }),
        r &&
          Er(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (Er(e, "compositionstart", Vp),
          Er(e, "compositionend", oc),
          Er(e, "change", oc));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: r, trim: n, number: i } },
      o
    ) {
      if (
        ((e._assign = ic(o)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (r ||
              (n && e.value.trim() === t) ||
              ((i || e.type === "number") && Po(e.value) === t))))
      )
        return;
      const s = t ?? "";
      e.value !== s && (e.value = s);
    },
  },
  Wp = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  Qw = (e, t) => (r) => {
    if (!("key" in r)) return;
    const n = yr(r.key);
    if (t.some((i) => i === n || Wp[i] === n)) return e(r);
  },
  Bl = Le({ patchProp: jp }, Tp);
let yn,
  sc = !1;
function zp() {
  return yn || (yn = sp(Bl));
}
function Kp() {
  return (yn = sc ? yn : ap(Bl)), (sc = !0), yn;
}
const Jp = (...e) => {
    const t = zp().createApp(...e),
      { mount: r } = t;
    return (
      (t.mount = (n) => {
        const i = Ql(n);
        if (!i) return;
        const o = t._component;
        !ne(o) && !o.render && !o.template && (o.template = i.innerHTML),
          (i.innerHTML = "");
        const s = r(i, !1, i instanceof SVGElement);
        return (
          i instanceof Element &&
            (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
          s
        );
      }),
      t
    );
  },
  Gp = (...e) => {
    const t = Kp().createApp(...e),
      { mount: r } = t;
    return (
      (t.mount = (n) => {
        const i = Ql(n);
        if (i) return r(i, !0, i instanceof SVGElement);
      }),
      t
    );
  };
function Ql(e) {
  return Re(e) ? document.querySelector(e) : e;
}
const Yp =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  Xp =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  Zp = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function ey(e, t) {
  if (
    e !== "__proto__" &&
    !(e === "constructor" && t && typeof t == "object" && "prototype" in t)
  )
    return t;
}
function Xs(e, t = {}) {
  if (typeof e != "string") return e;
  const r = e.toLowerCase().trim();
  if (r === "true") return !0;
  if (r === "false") return !1;
  if (r === "null") return null;
  if (r === "nan") return Number.NaN;
  if (r === "infinity") return Number.POSITIVE_INFINITY;
  if (r !== "undefined") {
    if (!Zp.test(e)) {
      if (t.strict) throw new SyntaxError("Invalid JSON");
      return e;
    }
    try {
      return Yp.test(e) || Xp.test(e) ? JSON.parse(e, ey) : JSON.parse(e);
    } catch (n) {
      if (t.strict) throw n;
      return e;
    }
  }
}
const ty = /#/g,
  ry = /&/g,
  ny = /=/g,
  Ul = /\+/g,
  iy = /%5e/gi,
  oy = /%60/gi,
  sy = /%7c/gi,
  ay = /%20/gi;
function cy(e) {
  return encodeURI("" + e).replace(sy, "|");
}
function Qo(e) {
  return cy(typeof e == "string" ? e : JSON.stringify(e))
    .replace(Ul, "%2B")
    .replace(ay, "+")
    .replace(ty, "%23")
    .replace(ry, "%26")
    .replace(oy, "`")
    .replace(iy, "^");
}
function co(e) {
  return Qo(e).replace(ny, "%3D");
}
function Vl(e = "") {
  try {
    return decodeURIComponent("" + e);
  } catch {
    return "" + e;
  }
}
function uy(e) {
  return Vl(e.replace(Ul, " "));
}
function ly(e = "") {
  const t = {};
  e[0] === "?" && (e = e.slice(1));
  for (const r of e.split("&")) {
    const n = r.match(/([^=]+)=?(.*)/) || [];
    if (n.length < 2) continue;
    const i = Vl(n[1]);
    if (i === "__proto__" || i === "constructor") continue;
    const o = uy(n[2] || "");
    typeof t[i] < "u"
      ? Array.isArray(t[i])
        ? t[i].push(o)
        : (t[i] = [t[i], o])
      : (t[i] = o);
  }
  return t;
}
function fy(e, t) {
  return (
    (typeof t == "number" || typeof t == "boolean") && (t = String(t)),
    t
      ? Array.isArray(t)
        ? t.map((r) => `${co(e)}=${Qo(r)}`).join("&")
        : `${co(e)}=${Qo(t)}`
      : co(e)
  );
}
function hy(e) {
  return Object.keys(e)
    .filter((t) => e[t] !== void 0)
    .map((t) => fy(t, e[t]))
    .join("&");
}
const dy = /^\w{2,}:([/\\]{1,2})/,
  py = /^\w{2,}:([/\\]{2})?/,
  yy = /^[/\\]{2}[^/\\]+/;
function Mn(e, t = {}) {
  return (
    typeof t == "boolean" && (t = { acceptRelative: t }),
    t.strict ? dy.test(e) : py.test(e) || (t.acceptRelative ? yy.test(e) : !1)
  );
}
const vy = /\/$|\/\?/;
function Uo(e = "", t = !1) {
  return t ? vy.test(e) : e.endsWith("/");
}
function Wl(e = "", t = !1) {
  if (!t) return (Uo(e) ? e.slice(0, -1) : e) || "/";
  if (!Uo(e, !0)) return e || "/";
  const [r, ...n] = e.split("?");
  return (r.slice(0, -1) || "/") + (n.length > 0 ? `?${n.join("?")}` : "");
}
function my(e = "", t = !1) {
  if (!t) return e.endsWith("/") ? e : e + "/";
  if (Uo(e, !0)) return e || "/";
  const [r, ...n] = e.split("?");
  return r + "/" + (n.length > 0 ? `?${n.join("?")}` : "");
}
function gy(e = "") {
  return e.startsWith("/");
}
function by(e = "") {
  return (gy(e) ? e.slice(1) : e) || "/";
}
function wy(e, t) {
  if (zl(t) || Mn(e)) return e;
  const r = Wl(t);
  return e.startsWith(r) ? e : ji(r, e);
}
function ac(e, t) {
  if (zl(t)) return e;
  const r = Wl(t);
  if (!e.startsWith(r)) return e;
  const n = e.slice(r.length);
  return n[0] === "/" ? n : "/" + n;
}
function _y(e, t) {
  const r = qi(e),
    n = { ...ly(r.search), ...t };
  return (r.search = hy(n)), Sy(r);
}
function zl(e) {
  return !e || e === "/";
}
function Ey(e) {
  return e && e !== "/";
}
function ji(e, ...t) {
  let r = e || "";
  for (const n of t.filter((i) => Ey(i))) r = r ? my(r) + by(n) : n;
  return r;
}
function qi(e = "", t) {
  if (!Mn(e, { acceptRelative: !0 })) return t ? qi(t + e) : cc(e);
  const [r = "", n, i = ""] = (
      e.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []
    ).splice(1),
    [o = "", s = ""] = (i.match(/([^#/?]*)(.*)?/) || []).splice(1),
    { pathname: a, search: u, hash: c } = cc(s.replace(/\/(?=[A-Za-z]:)/, ""));
  return {
    protocol: r,
    auth: n ? n.slice(0, Math.max(0, n.length - 1)) : "",
    host: o,
    pathname: a,
    search: u,
    hash: c,
  };
}
function cc(e = "") {
  const [t = "", r = "", n = ""] = (
    e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
  ).splice(1);
  return { pathname: t, search: r, hash: n };
}
function Sy(e) {
  const t =
    e.pathname +
    (e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : "") +
    e.hash;
  return e.protocol
    ? e.protocol + "//" + (e.auth ? e.auth + "@" : "") + e.host + t
    : t;
}
class Oy extends Error {
  constructor() {
    super(...arguments), (this.name = "FetchError");
  }
}
function Ty(e, t, r) {
  let n = "";
  t && (n = t.message),
    e && r
      ? (n = `${n} (${r.status} ${r.statusText} (${e.toString()}))`)
      : e && (n = `${n} (${e.toString()})`);
  const i = new Oy(n);
  return (
    Object.defineProperty(i, "request", {
      get() {
        return e;
      },
    }),
    Object.defineProperty(i, "response", {
      get() {
        return r;
      },
    }),
    Object.defineProperty(i, "data", {
      get() {
        return r && r._data;
      },
    }),
    Object.defineProperty(i, "status", {
      get() {
        return r && r.status;
      },
    }),
    Object.defineProperty(i, "statusText", {
      get() {
        return r && r.statusText;
      },
    }),
    Object.defineProperty(i, "statusCode", {
      get() {
        return r && r.status;
      },
    }),
    Object.defineProperty(i, "statusMessage", {
      get() {
        return r && r.statusText;
      },
    }),
    i
  );
}
const ky = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function uc(e = "GET") {
  return ky.has(e.toUpperCase());
}
function Ry(e) {
  if (e === void 0) return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean" || t === null
    ? !0
    : t !== "object"
    ? !1
    : Array.isArray(e)
    ? !0
    : (e.constructor && e.constructor.name === "Object") ||
      typeof e.toJSON == "function";
}
const Cy = new Set([
    "image/svg",
    "application/xml",
    "application/xhtml",
    "application/html",
  ]),
  Py = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function xy(e = "") {
  if (!e) return "json";
  const t = e.split(";").shift() || "";
  return Py.test(t)
    ? "json"
    : Cy.has(t) || t.startsWith("text/")
    ? "text"
    : "blob";
}
const Iy = new Set([408, 409, 425, 429, 500, 502, 503, 504]);
function Kl(e) {
  const { fetch: t, Headers: r } = e;
  function n(s) {
    const a = (s.error && s.error.name === "AbortError") || !1;
    if (s.options.retry !== !1 && !a) {
      let c;
      typeof s.options.retry == "number"
        ? (c = s.options.retry)
        : (c = uc(s.options.method) ? 0 : 1);
      const l = (s.response && s.response.status) || 500;
      if (c > 0 && Iy.has(l))
        return i(s.request, { ...s.options, retry: c - 1 });
    }
    const u = Ty(s.request, s.error, s.response);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, i), u);
  }
  const i = async function (a, u = {}) {
      const c = {
        request: a,
        options: { ...e.defaults, ...u },
        response: void 0,
        error: void 0,
      };
      c.options.onRequest && (await c.options.onRequest(c)),
        typeof c.request == "string" &&
          (c.options.baseURL && (c.request = wy(c.request, c.options.baseURL)),
          (c.options.query || c.options.params) &&
            (c.request = _y(c.request, {
              ...c.options.params,
              ...c.options.query,
            })),
          c.options.body &&
            uc(c.options.method) &&
            Ry(c.options.body) &&
            ((c.options.body =
              typeof c.options.body == "string"
                ? c.options.body
                : JSON.stringify(c.options.body)),
            (c.options.headers = new r(c.options.headers)),
            c.options.headers.has("content-type") ||
              c.options.headers.set("content-type", "application/json"),
            c.options.headers.has("accept") ||
              c.options.headers.set("accept", "application/json"))),
        (c.response = await t(c.request, c.options).catch(
          async (f) => (
            (c.error = f),
            c.options.onRequestError && (await c.options.onRequestError(c)),
            n(c)
          )
        ));
      const l =
        (c.options.parseResponse ? "json" : c.options.responseType) ||
        xy(c.response.headers.get("content-type") || "");
      if (l === "json") {
        const f = await c.response.text(),
          h = c.options.parseResponse || Xs;
        c.response._data = h(f);
      } else
        l === "stream"
          ? (c.response._data = c.response.body)
          : (c.response._data = await c.response[l]());
      return (
        c.options.onResponse && (await c.options.onResponse(c)),
        c.response.status >= 400 && c.response.status < 600
          ? (c.options.onResponseError && (await c.options.onResponseError(c)),
            n(c))
          : c.response
      );
    },
    o = function (a, u) {
      return i(a, u).then((c) => c._data);
    };
  return (
    (o.raw = i),
    (o.native = t),
    (o.create = (s = {}) => Kl({ ...e, defaults: { ...e.defaults, ...s } })),
    o
  );
}
const Jl = (function () {
    if (typeof globalThis < "u") return globalThis;
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof global < "u") return global;
    throw new Error("unable to locate global object");
  })(),
  Ay =
    Jl.fetch ||
    (() =>
      Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),
  Fy = Jl.Headers,
  Dy = Kl({ fetch: Ay, Headers: Fy }),
  Ny = Dy,
  My = () => {
    var e;
    return (
      ((e = window == null ? void 0 : window.__NUXT__) == null
        ? void 0
        : e.config) || {}
    );
  },
  vi = My().app,
  Ly = () => vi.baseURL,
  jy = () => vi.buildAssetsDir,
  qy = (...e) => ji(Gl(), jy(), ...e),
  Gl = (...e) => {
    const t = vi.cdnURL || vi.baseURL;
    return e.length ? ji(t, ...e) : t;
  };
(globalThis.__buildAssetsURL = qy), (globalThis.__publicAssetsURL = Gl);
function Vo(e, t = {}, r) {
  for (const n in e) {
    const i = e[n],
      o = r ? `${r}:${n}` : n;
    typeof i == "object" && i !== null
      ? Vo(i, t, o)
      : typeof i == "function" && (t[o] = i);
  }
  return t;
}
function $y(e, t) {
  return e.reduce(
    (r, n) => r.then(() => n.apply(void 0, t)),
    Promise.resolve()
  );
}
function Hy(e, t) {
  return Promise.all(e.map((r) => r.apply(void 0, t)));
}
function uo(e, t) {
  for (const r of e) r(t);
}
class By {
  constructor() {
    (this._hooks = {}),
      (this._before = void 0),
      (this._after = void 0),
      (this._deprecatedMessages = void 0),
      (this._deprecatedHooks = {}),
      (this.hook = this.hook.bind(this)),
      (this.callHook = this.callHook.bind(this)),
      (this.callHookWith = this.callHookWith.bind(this));
  }
  hook(t, r, n = {}) {
    if (!t || typeof r != "function") return () => {};
    const i = t;
    let o;
    for (; this._deprecatedHooks[t]; )
      (o = this._deprecatedHooks[t]), (t = o.to);
    if (o && !n.allowDeprecated) {
      let s = o.message;
      s ||
        (s =
          `${i} hook has been deprecated` +
          (o.to ? `, please use ${o.to}` : "")),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(s) ||
          (console.warn(s), this._deprecatedMessages.add(s));
    }
    return (
      (this._hooks[t] = this._hooks[t] || []),
      this._hooks[t].push(r),
      () => {
        r && (this.removeHook(t, r), (r = void 0));
      }
    );
  }
  hookOnce(t, r) {
    let n,
      i = (...o) => (
        typeof n == "function" && n(), (n = void 0), (i = void 0), r(...o)
      );
    return (n = this.hook(t, i)), n;
  }
  removeHook(t, r) {
    if (this._hooks[t]) {
      const n = this._hooks[t].indexOf(r);
      n !== -1 && this._hooks[t].splice(n, 1),
        this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, r) {
    this._deprecatedHooks[t] = typeof r == "string" ? { to: r } : r;
    const n = this._hooks[t] || [];
    this._hooks[t] = void 0;
    for (const i of n) this.hook(t, i);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const r in t) this.deprecateHook(r, t[r]);
  }
  addHooks(t) {
    const r = Vo(t),
      n = Object.keys(r).map((i) => this.hook(i, r[i]));
    return () => {
      for (const i of n.splice(0, n.length)) i();
    };
  }
  removeHooks(t) {
    const r = Vo(t);
    for (const n in r) this.removeHook(n, r[n]);
  }
  callHook(t, ...r) {
    return this.callHookWith($y, t, ...r);
  }
  callHookParallel(t, ...r) {
    return this.callHookWith(Hy, t, ...r);
  }
  callHookWith(t, r, ...n) {
    const i =
      this._before || this._after ? { name: r, args: n, context: {} } : void 0;
    this._before && uo(this._before, i);
    const o = t(this._hooks[r] || [], n);
    return o instanceof Promise
      ? o.finally(() => {
          this._after && i && uo(this._after, i);
        })
      : (this._after && i && uo(this._after, i), o);
  }
  beforeEach(t) {
    return (
      (this._before = this._before || []),
      this._before.push(t),
      () => {
        const r = this._before.indexOf(t);
        r !== -1 && this._before.splice(r, 1);
      }
    );
  }
  afterEach(t) {
    return (
      (this._after = this._after || []),
      this._after.push(t),
      () => {
        const r = this._after.indexOf(t);
        r !== -1 && this._after.splice(r, 1);
      }
    );
  }
}
function Yl() {
  return new By();
}
function Qy() {
  let e,
    t = !1;
  const r = (n) => {
    if (e && e !== n) throw new Error("Context conflict");
  };
  return {
    use: () => {
      if (e === void 0) throw new Error("Context is not available");
      return e;
    },
    tryUse: () => e,
    set: (n, i) => {
      i || r(n), (e = n), (t = !0);
    },
    unset: () => {
      (e = void 0), (t = !1);
    },
    call: (n, i) => {
      r(n), (e = n);
      try {
        return i();
      } finally {
        t || (e = void 0);
      }
    },
    async callAsync(n, i) {
      e = n;
      const o = () => {
          e = n;
        },
        s = () => (e === n ? o : void 0);
      Wo.add(s);
      try {
        const a = i();
        return t || (e = void 0), await a;
      } finally {
        Wo.delete(s);
      }
    },
  };
}
function Uy() {
  const e = {};
  return {
    get(t) {
      return e[t] || (e[t] = Qy()), e[t], e[t];
    },
  };
}
const mi =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof global < "u"
      ? global
      : typeof window < "u"
      ? window
      : {},
  lc = "__unctx__",
  Vy = mi[lc] || (mi[lc] = Uy()),
  Wy = (e) => Vy.get(e),
  fc = "__unctx_async_handlers__",
  Wo = mi[fc] || (mi[fc] = new Set());
function zo(e) {
  const t = [];
  for (const i of Wo) {
    const o = i();
    o && t.push(o);
  }
  const r = () => {
    for (const i of t) i();
  };
  let n = e();
  return (
    n &&
      typeof n == "object" &&
      "catch" in n &&
      (n = n.catch((i) => {
        throw (r(), i);
      })),
    [n, r]
  );
}
const Xl = Wy("nuxt-app"),
  zy = "__nuxt_plugin";
function Ky(e) {
  let t = 0;
  const r = {
    provide: void 0,
    globalName: "nuxt",
    payload: vt({ data: {}, state: {}, _errors: {}, ...window.__NUXT__ }),
    static: { data: {} },
    isHydrating: !0,
    deferHydration() {
      if (!r.isHydrating) return () => {};
      t++;
      let o = !1;
      return () => {
        if (!o && ((o = !0), t--, t === 0))
          return (r.isHydrating = !1), r.callHook("app:suspense:resolve");
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...e,
  };
  (r.hooks = Yl()),
    (r.hook = r.hooks.hook),
    (r.callHook = r.hooks.callHook),
    (r.provide = (o, s) => {
      const a = "$" + o;
      Jn(r, a, s), Jn(r.vueApp.config.globalProperties, a, s);
    }),
    Jn(r.vueApp, "$nuxt", r),
    Jn(r.vueApp.config.globalProperties, "$nuxt", r),
    window.addEventListener("nuxt.preloadError", (o) => {
      r.callHook("app:chunkError", { error: o.payload });
    });
  const n = vt(r.payload.config),
    i = new Proxy(n, {
      get(o, s) {
        return s === "public" ? o.public : o[s] ?? o.public[s];
      },
      set(o, s, a) {
        return s === "public" || s === "app"
          ? !1
          : ((o[s] = a), (o.public[s] = a), !0);
      },
    });
  return r.provide("config", i), r;
}
async function Jy(e, t) {
  if (typeof t != "function") return;
  const { provide: r } = (await kt(e, t, [e])) || {};
  if (r && typeof r == "object") for (const n in r) e.provide(n, r[n]);
}
async function Gy(e, t) {
  for (const r of t) await Jy(e, r);
}
function Yy(e) {
  return e
    .map((r) =>
      typeof r != "function" ? null : r.length > 1 ? (n) => r(n, n.provide) : r
    )
    .filter(Boolean);
}
function mr(e) {
  return (e[zy] = !0), e;
}
function kt(e, t, r) {
  const n = () => (r ? t(...r) : t());
  return Xl.set(e), n();
}
function je() {
  const e = Xl.tryUse();
  if (!e) {
    const t = Zt();
    if (!t) throw new Error("nuxt instance unavailable");
    return t.appContext.app.$nuxt;
  }
  return e;
}
function Zl() {
  return je().$config;
}
function Jn(e, t, r) {
  Object.defineProperty(e, t, { get: () => r });
}
const Xy = !1;
/*!
 * pinia v2.0.32
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ let ef;
const Ln = (e) => (ef = e),
  tf = Symbol();
function Ko(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var vn;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(vn || (vn = {}));
function Zy() {
  const e = Hu(!0),
    t = e.run(() => pt({}));
  let r = [],
    n = [];
  const i = $r({
    install(o) {
      Ln(i),
        (i._a = o),
        o.provide(tf, i),
        (o.config.globalProperties.$pinia = i),
        n.forEach((s) => r.push(s)),
        (n = []);
    },
    use(o) {
      return !this._a && !Xy ? n.push(o) : r.push(o), this;
    },
    _p: r,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return i;
}
const rf = () => {};
function hc(e, t, r, n = rf) {
  e.push(t);
  const i = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), n());
  };
  return !r && Bu() && Mh(i), i;
}
function wr(e, ...t) {
  e.slice().forEach((r) => {
    r(...t);
  });
}
function Jo(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((r, n) => e.set(n, r)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const r in t) {
    if (!t.hasOwnProperty(r)) continue;
    const n = t[r],
      i = e[r];
    Ko(i) && Ko(n) && e.hasOwnProperty(r) && !_e(n) && !Ut(n)
      ? (e[r] = Jo(i, n))
      : (e[r] = n);
  }
  return e;
}
const ev = Symbol();
function tv(e) {
  return !Ko(e) || !e.hasOwnProperty(ev);
}
const { assign: jt } = Object;
function rv(e) {
  return !!(_e(e) && e.effect);
}
function nv(e, t, r, n) {
  const { state: i, actions: o, getters: s } = t,
    a = r.state.value[e];
  let u;
  function c() {
    a || (r.state.value[e] = i ? i() : {});
    const l = dd(r.state.value[e]);
    return jt(
      l,
      o,
      Object.keys(s || {}).reduce(
        (f, h) => (
          (f[h] = $r(
            $e(() => {
              Ln(r);
              const d = r._s.get(e);
              return s[h].call(d, d);
            })
          )),
          f
        ),
        {}
      )
    );
  }
  return (
    (u = nf(e, c, t, r, n, !0)),
    (u.$reset = function () {
      const f = i ? i() : {};
      this.$patch((h) => {
        jt(h, f);
      });
    }),
    u
  );
}
function nf(e, t, r = {}, n, i, o) {
  let s;
  const a = jt({ actions: {} }, r),
    u = { deep: !0 };
  let c,
    l,
    f = $r([]),
    h = $r([]),
    d;
  const y = n.state.value[e];
  !o && !y && (n.state.value[e] = {}), pt({});
  let b;
  function w(T) {
    let O;
    (c = l = !1),
      typeof T == "function"
        ? (T(n.state.value[e]),
          (O = { type: vn.patchFunction, storeId: e, events: d }))
        : (Jo(n.state.value[e], T),
          (O = { type: vn.patchObject, payload: T, storeId: e, events: d }));
    const M = (b = Symbol());
    vr().then(() => {
      b === M && (c = !0);
    }),
      (l = !0),
      wr(f, O, n.state.value[e]);
  }
  const m = rf;
  function p() {
    s.stop(), (f = []), (h = []), n._s.delete(e);
  }
  function v(T, O) {
    return function () {
      Ln(n);
      const M = Array.from(arguments),
        L = [],
        Q = [];
      function q(Z) {
        L.push(Z);
      }
      function W(Z) {
        Q.push(Z);
      }
      wr(h, { args: M, name: T, store: S, after: q, onError: W });
      let I;
      try {
        I = O.apply(this && this.$id === e ? this : S, M);
      } catch (Z) {
        throw (wr(Q, Z), Z);
      }
      return I instanceof Promise
        ? I.then((Z) => (wr(L, Z), Z)).catch(
            (Z) => (wr(Q, Z), Promise.reject(Z))
          )
        : (wr(L, I), I);
    };
  }
  const _ = {
      _p: n,
      $id: e,
      $onAction: hc.bind(null, h),
      $patch: w,
      $reset: m,
      $subscribe(T, O = {}) {
        const M = hc(f, T, O.detached, () => L()),
          L = s.run(() =>
            Wt(
              () => n.state.value[e],
              (Q) => {
                (O.flush === "sync" ? l : c) &&
                  T({ storeId: e, type: vn.direct, events: d }, Q);
              },
              jt({}, u, O)
            )
          );
        return M;
      },
      $dispose: p,
    },
    S = vt(_);
  n._s.set(e, S);
  const k = n._e.run(() => ((s = Hu()), s.run(() => t())));
  for (const T in k) {
    const O = k[T];
    if ((_e(O) && !rv(O)) || Ut(O))
      o ||
        (y && tv(O) && (_e(O) ? (O.value = y[T]) : Jo(O, y[T])),
        (n.state.value[e][T] = O));
    else if (typeof O == "function") {
      const M = v(T, O);
      (k[T] = M), (a.actions[T] = O);
    }
  }
  return (
    jt(S, k),
    jt(ae(S), k),
    Object.defineProperty(S, "$state", {
      get: () => n.state.value[e],
      set: (T) => {
        w((O) => {
          jt(O, T);
        });
      },
    }),
    n._p.forEach((T) => {
      jt(
        S,
        s.run(() => T({ store: S, app: n._a, pinia: n, options: a }))
      );
    }),
    y && o && r.hydrate && r.hydrate(S.$state, y),
    (c = !0),
    (l = !0),
    S
  );
}
function Uw(e, t, r) {
  let n, i;
  const o = typeof t == "function";
  typeof e == "string" ? ((n = e), (i = o ? r : t)) : ((i = e), (n = e.id));
  function s(a, u) {
    const c = Zt();
    return (
      (a = a || (c && We(tf, null))),
      a && Ln(a),
      (a = ef),
      a._s.has(n) || (o ? nf(n, t, i, a) : nv(n, i, a)),
      a._s.get(n)
    );
  }
  return (s.$id = n), s;
}
const iv = decodeURIComponent,
  ov = encodeURIComponent,
  sv = /; */,
  Gn = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function av(e, t) {
  if (typeof e != "string")
    throw new TypeError("argument str must be a string");
  let r = {},
    n = t || {},
    i = e.split(sv),
    o = n.decode || iv;
  for (let s = 0; s < i.length; s++) {
    let a = i[s],
      u = a.indexOf("=");
    if (u < 0) continue;
    let c = a.substr(0, u).trim(),
      l = a.substr(++u, a.length).trim();
    l[0] == '"' && (l = l.slice(1, -1)), r[c] == null && (r[c] = cv(l, o));
  }
  return r;
}
function dc(e, t, r) {
  let n = r || {},
    i = n.encode || ov;
  if (typeof i != "function") throw new TypeError("option encode is invalid");
  if (!Gn.test(e)) throw new TypeError("argument name is invalid");
  let o = i(t);
  if (o && !Gn.test(o)) throw new TypeError("argument val is invalid");
  let s = e + "=" + o;
  if (n.maxAge != null) {
    let a = n.maxAge - 0;
    if (isNaN(a) || !isFinite(a))
      throw new TypeError("option maxAge is invalid");
    s += "; Max-Age=" + Math.floor(a);
  }
  if (n.domain) {
    if (!Gn.test(n.domain)) throw new TypeError("option domain is invalid");
    s += "; Domain=" + n.domain;
  }
  if (n.path) {
    if (!Gn.test(n.path)) throw new TypeError("option path is invalid");
    s += "; Path=" + n.path;
  }
  if (n.expires) {
    if (typeof n.expires.toUTCString != "function")
      throw new TypeError("option expires is invalid");
    s += "; Expires=" + n.expires.toUTCString();
  }
  if (
    (n.httpOnly && (s += "; HttpOnly"),
    n.secure && (s += "; Secure"),
    n.sameSite)
  )
    switch (
      typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite
    ) {
      case !0:
        s += "; SameSite=Strict";
        break;
      case "lax":
        s += "; SameSite=Lax";
        break;
      case "strict":
        s += "; SameSite=Strict";
        break;
      case "none":
        s += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  return s;
}
function cv(e, t) {
  try {
    return t(e);
  } catch {
    return e;
  }
}
function lo(e) {
  return e !== null && typeof e == "object";
}
function Go(e, t, r = ".", n) {
  if (!lo(t)) return Go(e, {}, r, n);
  const i = Object.assign({}, t);
  for (const o in e) {
    if (o === "__proto__" || o === "constructor") continue;
    const s = e[o];
    s != null &&
      ((n && n(i, o, s, r)) ||
        (Array.isArray(s) && Array.isArray(i[o])
          ? (i[o] = [...s, ...i[o]])
          : lo(s) && lo(i[o])
          ? (i[o] = Go(s, i[o], (r ? `${r}.` : "") + o.toString(), n))
          : (i[o] = s)));
  }
  return i;
}
function of(e) {
  return (...t) => t.reduce((r, n) => Go(r, n, "", e), {});
}
const uv = of(),
  lv = of((e, t, r) => {
    if (typeof e[t] < "u" && typeof r == "function")
      return (e[t] = r(e[t])), !0;
  });
class Yo extends Error {
  constructor() {
    super(...arguments),
      (this.statusCode = 500),
      (this.fatal = !1),
      (this.unhandled = !1),
      (this.statusMessage = void 0);
  }
  toJSON() {
    const t = { message: this.message, statusCode: this.statusCode };
    return (
      this.statusMessage && (t.statusMessage = this.statusMessage),
      this.data !== void 0 && (t.data = this.data),
      t
    );
  }
}
Yo.__h3_error__ = !0;
function Xo(e) {
  if (typeof e == "string") return new Yo(e);
  if (fv(e)) return e;
  const t = new Yo(
    e.message ?? e.statusMessage,
    e.cause ? { cause: e.cause } : void 0
  );
  if ("stack" in e)
    try {
      Object.defineProperty(t, "stack", {
        get() {
          return e.stack;
        },
      });
    } catch {
      try {
        t.stack = e.stack;
      } catch {}
    }
  return (
    e.data && (t.data = e.data),
    e.statusCode
      ? (t.statusCode = e.statusCode)
      : e.status && (t.statusCode = e.status),
    e.statusMessage
      ? (t.statusMessage = e.statusMessage)
      : e.statusText && (t.statusMessage = e.statusText),
    e.fatal !== void 0 && (t.fatal = e.fatal),
    e.unhandled !== void 0 && (t.unhandled = e.unhandled),
    t
  );
}
function fv(e) {
  var t;
  return (
    ((t = e == null ? void 0 : e.constructor) == null
      ? void 0
      : t.__h3_error__) === !0
  );
}
const $i = () => Hs(je().payload, "error"),
  kr = (e) => {
    const t = sf(e);
    try {
      je().callHook("app:error", t);
      const n = $i();
      n.value = n.value || t;
    } catch {
      throw t;
    }
    return t;
  },
  hv = async (e = {}) => {
    const t = je(),
      r = $i();
    t.callHook("app:error:cleared", e),
      e.redirect && (await t.$router.replace(e.redirect)),
      (r.value = null);
  },
  dv = (e) => !!(e && typeof e == "object" && "__nuxt_error" in e),
  sf = (e) => {
    const t = Xo(e);
    return (t.__nuxt_error = !0), t;
  };
function pv(...e) {
  const t = typeof e[e.length - 1] == "string" ? e.pop() : void 0;
  typeof e[0] != "string" && e.unshift(t);
  const [r, n] = e;
  if (!r || typeof r != "string")
    throw new TypeError("[nuxt] [useState] key must be a string: " + r);
  if (n !== void 0 && typeof n != "function")
    throw new Error("[nuxt] [useState] init must be a function: " + n);
  const i = "$s" + r,
    o = je(),
    s = Hs(o.payload.state, i);
  if (s.value === void 0 && n) {
    const a = n();
    if (_e(a)) return (o.payload.state[i] = a), a;
    s.value = a;
  }
  return s;
}
const Hi = () => {
    var e;
    return (e = je()) == null ? void 0 : e.$router;
  },
  af = () => (Zt() ? We("_route", je()._route) : je()._route),
  cf = (e) => e,
  yv = () => {
    try {
      if (je()._processingMiddleware) return !0;
    } catch {
      return !0;
    }
    return !1;
  },
  Vw = (e, t) => {
    e || (e = "/");
    const r = typeof e == "string" ? e : e.path || "/",
      n = Mn(r, !0);
    if (n && !(t != null && t.external))
      throw new Error(
        "Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`."
      );
    if (n && qi(r).protocol === "script:")
      throw new Error("Cannot navigate to an URL with script protocol.");
    if (!n && yv()) return e;
    const i = Hi();
    return n
      ? (t != null && t.replace ? location.replace(r) : (location.href = r),
        Promise.resolve())
      : t != null && t.replace
      ? i.replace(e)
      : i.push(e);
  };
function vv(e) {
  return Array.isArray(e) ? e : [e];
}
const mv = ["title", "script", "style", "noscript"],
  Zs = ["base", "meta", "link", "style", "script", "noscript"],
  gv = [
    "title",
    "titleTemplate",
    "base",
    "htmlAttrs",
    "bodyAttrs",
    "meta",
    "link",
    "style",
    "script",
    "noscript",
  ],
  bv = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"],
  wv = ["tagPosition", "tagPriority", "tagDuplicateStrategy"];
function uf(e, t) {
  const { props: r, tag: n } = e;
  if (bv.includes(n)) return n;
  if (n === "link" && r.rel === "canonical") return "canonical";
  if (r.charset) return "charset";
  const i = ["id"];
  n === "meta" && i.push("name", "property", "http-equiv");
  for (const o of i)
    if (typeof r[o] < "u") {
      const s = String(r[o]);
      return t && !t(s) ? !1 : `${n}:${o}:${s}`;
    }
  return !1;
}
const _v = (e) => {
  e = e || {};
  const t = e.dedupeKeys || ["hid", "vmid", "key"];
  return {
    hooks: {
      "tag:normalise": function ({ tag: r }) {
        t.forEach((i) => {
          r.props[i] && ((r.key = r.props[i]), delete r.props[i]);
        });
        const n = r.key ? `${r.tag}:${r.key}` : uf(r);
        n && (r._d = n);
      },
      "tags:resolve": function (r) {
        const n = {};
        r.tags.forEach((i) => {
          let o = i._d || i._p;
          const s = n[o];
          if (s) {
            let a = i == null ? void 0 : i.tagDuplicateStrategy;
            if (
              (!a &&
                (i.tag === "htmlAttrs" || i.tag === "bodyAttrs") &&
                (a = "merge"),
              a === "merge")
            ) {
              const c = s.props;
              ["class", "style"].forEach((l) => {
                i.props[l] &&
                  c[l] &&
                  (l === "style" && !c[l].endsWith(";") && (c[l] += ";"),
                  (i.props[l] = `${c[l]} ${i.props[l]}`));
              }),
                (n[o].props = { ...c, ...i.props });
              return;
            } else i._e === s._e && (o = i._d = `${o}:${i._p}`);
            const u = Object.keys(i.props).length;
            if (
              (u === 0 || (u === 1 && typeof i.props["data-h-key"] < "u")) &&
              !i.children
            ) {
              delete n[o];
              return;
            }
          }
          n[o] = i;
        }),
          (r.tags = Object.values(n));
      },
    },
  };
};
function lf(e) {
  let t = 9;
  for (let r = 0; r < e.length; ) t = Math.imul(t ^ e.charCodeAt(r++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
const Yn = (e, t) => {
  const { tag: r, $el: n } = e;
  n &&
    (Object.entries(r.props).forEach(([i, o]) => {
      o = String(o);
      const s = `attr:${i}`;
      if (i === "class") {
        if (!o) return;
        for (const a of o.split(" ")) {
          const u = `${s}:${a}`;
          t && t(e, u, () => n.classList.remove(a)),
            n.classList.contains(a) || n.classList.add(a);
        }
        return;
      }
      t && !i.startsWith("data-h-") && t(e, s, () => n.removeAttribute(i)),
        n.getAttribute(i) !== o && n.setAttribute(i, o);
    }),
    mv.includes(r.tag) &&
      n.innerHTML !== (r.children || "") &&
      (n.innerHTML = r.children || ""));
};
async function ff(e, t = {}) {
  var f, h;
  const r = { shouldRender: !0 };
  if ((await e.hooks.callHook("dom:beforeRender", r), !r.shouldRender)) return;
  const n = t.document || window.document,
    i = e._popSideEffectQueue();
  e.headEntries()
    .map((d) => d._sde)
    .forEach((d) => {
      Object.entries(d).forEach(([y, b]) => {
        i[y] = b;
      });
    });
  const o = async (d) => {
      const y = e.headEntries().find((w) => w._i === d._e),
        b = {
          renderId:
            d._d || lf(JSON.stringify({ ...d, _e: void 0, _p: void 0 })),
          $el: null,
          shouldRender: !0,
          tag: d,
          entry: y,
          staleSideEffects: i,
        };
      return await e.hooks.callHook("dom:beforeRenderTag", b), b;
    },
    s = [],
    a = { body: [], head: [] },
    u = (d, y, b) => {
      (y = `${d.renderId}:${y}`), d.entry && (d.entry._sde[y] = b), delete i[y];
    },
    c = (d) => {
      (e._elMap[d.renderId] = d.$el),
        s.push(d),
        u(d, "el", () => {
          var y;
          (y = d.$el) == null || y.remove(), delete e._elMap[d.renderId];
        });
    };
  for (const d of await e.resolveTags()) {
    const y = await o(d);
    if (!y.shouldRender) continue;
    const { tag: b } = y;
    if (b.tag === "title") {
      (n.title = b.children || ""), s.push(y);
      continue;
    }
    if (b.tag === "htmlAttrs" || b.tag === "bodyAttrs") {
      (y.$el = n[b.tag === "htmlAttrs" ? "documentElement" : "body"]),
        Yn(y, u),
        s.push(y);
      continue;
    }
    if (
      ((y.$el = e._elMap[y.renderId]),
      !y.$el &&
        b._hash &&
        (y.$el = n.querySelector(
          `${
            (f = b.tagPosition) != null && f.startsWith("body")
              ? "body"
              : "head"
          } > ${b.tag}[data-h-${b._hash}]`
        )),
      y.$el)
    ) {
      y.tag._d && Yn(y), c(y);
      continue;
    }
    (y.$el = n.createElement(b.tag)),
      Yn(y),
      a[
        (h = b.tagPosition) != null && h.startsWith("body") ? "body" : "head"
      ].push(y);
  }
  const l = { bodyClose: void 0, bodyOpen: void 0, head: void 0 };
  Object.entries(a).forEach(([d, y]) => {
    var w;
    if (!y.length) return;
    const b = (w = n == null ? void 0 : n[d]) == null ? void 0 : w.children;
    if (b) {
      for (const m of [...b].reverse()) {
        const p = m.tagName.toLowerCase();
        if (!Zs.includes(p)) continue;
        const v = uf({
            tag: p,
            props: m
              .getAttributeNames()
              .reduce((S, k) => ({ ...S, [k]: m.getAttribute(k) }), {}),
          }),
          _ = y.findIndex((S) => {
            var k;
            return (
              S &&
              (S.tag._d === v ||
                ((k = m.isEqualNode) == null ? void 0 : k.call(m, S.$el)))
            );
          });
        if (_ !== -1) {
          const S = y[_];
          (S.$el = m), Yn(S), c(S), delete y[_];
        }
      }
      y.forEach((m) => {
        const p = m.tag.tagPosition || "head";
        (l[p] = l[p] || n.createDocumentFragment()),
          l[p].appendChild(m.$el),
          c(m);
      });
    }
  }),
    l.head && n.head.appendChild(l.head),
    l.bodyOpen && n.body.insertBefore(l.bodyOpen, n.body.firstChild),
    l.bodyClose && n.body.appendChild(l.bodyClose);
  for (const d of s) await e.hooks.callHook("dom:renderTag", d);
  Object.values(i).forEach((d) => d());
}
let fo = null;
async function hf(e, t = {}) {
  function r() {
    return (fo = null), ff(e, t);
  }
  const n = t.delayFn || ((i) => setTimeout(i, 10));
  return (fo = fo || new Promise((i) => n(() => i(r()))));
}
const Ev = (e) => ({
    hooks: {
      "entries:updated": function (t) {
        if (
          typeof (e == null ? void 0 : e.document) > "u" &&
          typeof window > "u"
        )
          return;
        let r = e == null ? void 0 : e.delayFn;
        !r && typeof requestAnimationFrame < "u" && (r = requestAnimationFrame),
          hf(t, {
            document: (e == null ? void 0 : e.document) || window.document,
            delayFn: r,
          });
      },
    },
  }),
  pc = { critical: 2, high: 9, low: 12, base: -1, title: 1, meta: 10 };
function yc(e) {
  if (typeof e.tagPriority == "number") return e.tagPriority;
  if (e.tag === "meta") {
    if (e.props.charset) return -2;
    if (e.props["http-equiv"] === "content-security-policy") return 0;
  }
  const t = e.tagPriority || e.tag;
  return t in pc ? pc[t] : 10;
}
const Sv = [
  { prefix: "before:", offset: -1 },
  { prefix: "after:", offset: 1 },
];
function Ov() {
  return {
    hooks: {
      "tags:resolve": (e) => {
        const t = (r) => {
          var n;
          return (n = e.tags.find((i) => i._d === r)) == null ? void 0 : n._p;
        };
        for (const { prefix: r, offset: n } of Sv)
          for (const i of e.tags.filter(
            (o) =>
              typeof o.tagPriority == "string" && o.tagPriority.startsWith(r)
          )) {
            const o = t(i.tagPriority.replace(r, ""));
            typeof o < "u" && (i._p = o + n);
          }
        e.tags.sort((r, n) => r._p - n._p).sort((r, n) => yc(r) - yc(n));
      },
    },
  };
}
const vc = (e, t) =>
    e == null
      ? t || null
      : typeof e == "function"
      ? e(t)
      : e.replace("%s", t ?? ""),
  Tv = () => ({
    hooks: {
      "tags:resolve": (e) => {
        const { tags: t } = e;
        let r = t.findIndex((i) => i.tag === "titleTemplate");
        const n = t.findIndex((i) => i.tag === "title");
        if (n !== -1 && r !== -1) {
          const i = vc(t[r].children, t[n].children);
          i !== null ? (t[n].children = i || t[n].children) : delete t[n];
        } else if (r !== -1) {
          const i = vc(t[r].children);
          i !== null && ((t[r].children = i), (t[r].tag = "title"), (r = -1));
        }
        r !== -1 && delete t[r], (e.tags = t.filter(Boolean));
      },
    },
  }),
  kv = () => ({
    hooks: {
      "tag:normalise": function ({ tag: e }) {
        typeof e.props.body < "u" &&
          ((e.tagPosition = "bodyClose"), delete e.props.body);
      },
    },
  }),
  Rv = typeof window < "u",
  Cv = () => ({
    hooks: {
      "tag:normalise": (e) => {
        var i, o;
        const { tag: t, entry: r } = e,
          n = typeof t.props._dynamic < "u";
        !Zs.includes(t.tag) ||
          !t.key ||
          ((t._hash = lf(JSON.stringify({ tag: t.tag, key: t.key }))),
          !(
            Rv ||
            ((o = (i = pf()) == null ? void 0 : i.resolvedOptions) != null &&
              o.document)
          ) &&
            (r._m === "server" || n) &&
            (t.props[`data-h-${t._hash}`] = ""));
      },
      "tags:resolve": (e) => {
        e.tags = e.tags.map((t) => (delete t.props._dynamic, t));
      },
    },
  }),
  mc = ["script", "link", "bodyAttrs"],
  Pv = () => {
    const e = (t, r) => {
      const n = {},
        i = {};
      Object.entries(r.props).forEach(([s, a]) => {
        s.startsWith("on") && typeof a == "function" ? (i[s] = a) : (n[s] = a);
      });
      let o;
      return (
        t === "dom" &&
          r.tag === "script" &&
          typeof n.src == "string" &&
          typeof i.onload < "u" &&
          ((o = n.src), delete n.src),
        { props: n, eventHandlers: i, delayedSrc: o }
      );
    };
    return {
      hooks: {
        "ssr:render": function (t) {
          t.tags = t.tags.map(
            (r) => (
              !mc.includes(r.tag) ||
                !Object.entries(r.props).find(
                  ([n, i]) => n.startsWith("on") && typeof i == "function"
                ) ||
                (r.props = e("ssr", r).props),
              r
            )
          );
        },
        "dom:beforeRenderTag": function (t) {
          if (
            !mc.includes(t.tag.tag) ||
            !Object.entries(t.tag.props).find(
              ([o, s]) => o.startsWith("on") && typeof s == "function"
            )
          )
            return;
          const { props: r, eventHandlers: n, delayedSrc: i } = e("dom", t.tag);
          Object.keys(n).length &&
            ((t.tag.props = r),
            (t.tag._eventHandlers = n),
            (t.tag._delayedSrc = i));
        },
        "dom:renderTag": function (t) {
          const r = t.$el;
          if (!t.tag._eventHandlers || !r) return;
          const n =
            t.tag.tag === "bodyAttrs" && typeof window < "u" ? window : r;
          Object.entries(t.tag._eventHandlers).forEach(([i, o]) => {
            const s = `${t.tag._d || t.tag._p}:${i}`,
              a = i.slice(2).toLowerCase(),
              u = `data-h-${a}`;
            if ((delete t.staleSideEffects[s], r.hasAttribute(u))) return;
            const c = o;
            r.setAttribute(u, ""),
              n.addEventListener(a, c),
              t.entry &&
                (t.entry._sde[s] = () => {
                  n.removeEventListener(a, c), r.removeAttribute(u);
                });
          }),
            t.tag._delayedSrc && r.setAttribute("src", t.tag._delayedSrc);
        },
      },
    };
  };
let df;
const xv = (e) => (df = e),
  pf = () => df;
async function Iv(e, t) {
  const r = { tag: e, props: {} };
  return e === "title" || e === "titleTemplate"
    ? ((r.children = t instanceof Promise ? await t : t), r)
    : ((r.props = await Av({ ...t })),
      ["children", "innerHtml", "innerHTML"].forEach((n) => {
        typeof r.props[n] < "u" &&
          ((r.children = r.props[n]),
          typeof r.children == "object" &&
            (r.children = JSON.stringify(r.children)),
          delete r.props[n]);
      }),
      Object.keys(r.props)
        .filter((n) => wv.includes(n))
        .forEach((n) => {
          (r[n] = r.props[n]), delete r.props[n];
        }),
      typeof r.props.class == "object" &&
        !Array.isArray(r.props.class) &&
        (r.props.class = Object.keys(r.props.class).filter(
          (n) => r.props.class[n]
        )),
      Array.isArray(r.props.class) && (r.props.class = r.props.class.join(" ")),
      r.props.content && Array.isArray(r.props.content)
        ? r.props.content.map((n, i) => {
            const o = { ...r, props: { ...r.props } };
            return (
              (o.props.content = n),
              (o.key = `${r.props.name || r.props.property}:${i}`),
              o
            );
          })
        : r);
}
async function Av(e) {
  for (const t of Object.keys(e))
    e[t] instanceof Promise && (e[t] = await e[t]),
      String(e[t]) === "true"
        ? (e[t] = "")
        : String(e[t]) === "false" && delete e[t];
  return e;
}
const Fv = 10;
async function Dv(e) {
  const t = [];
  return (
    Object.entries(e.resolvedInput || e.input)
      .filter(([r, n]) => typeof n < "u" && gv.includes(r))
      .forEach(([r, n]) => {
        const i = vv(n);
        t.push(...i.map((o) => Iv(r, o)).flat());
      }),
    (await Promise.all(t))
      .flat()
      .map((r, n) => ((r._e = e._i), (r._p = (e._i << Fv) + n), r))
  );
}
const Nv = () => [_v(), Ov(), Tv(), Cv(), Pv(), kv()],
  Mv = (e = {}) => [
    Ev({
      document: e == null ? void 0 : e.document,
      delayFn: e == null ? void 0 : e.domDelayFn,
    }),
  ];
function Lv(e = {}) {
  const t = jv({
    ...e,
    plugins: [...Mv(e), ...((e == null ? void 0 : e.plugins) || [])],
  });
  return xv(t), t;
}
function jv(e = {}) {
  let t = [],
    r = {},
    n = 0;
  const i = Yl();
  e != null && e.hooks && i.addHooks(e.hooks),
    (e.plugins = [...Nv(), ...((e == null ? void 0 : e.plugins) || [])]),
    e.plugins.forEach((a) => a.hooks && i.addHooks(a.hooks));
  const o = () => i.callHook("entries:updated", s),
    s = {
      resolvedOptions: e,
      headEntries() {
        return t;
      },
      get hooks() {
        return i;
      },
      use(a) {
        a.hooks && i.addHooks(a.hooks);
      },
      push(a, u) {
        const c = { _i: n++, input: a, _sde: {} };
        return (
          u != null && u.mode && (c._m = u == null ? void 0 : u.mode),
          t.push(c),
          o(),
          {
            dispose() {
              t = t.filter((l) =>
                l._i !== c._i
                  ? !0
                  : ((r = { ...r, ...(l._sde || {}) }), (l._sde = {}), o(), !1)
              );
            },
            patch(l) {
              t = t.map(
                (f) => (f._i === c._i && ((c.input = f.input = l), o()), f)
              );
            },
          }
        );
      },
      async resolveTags() {
        const a = { tags: [], entries: [...t] };
        await i.callHook("entries:resolve", a);
        for (const u of a.entries)
          for (const c of await Dv(u)) {
            const l = { tag: c, entry: u };
            await i.callHook("tag:normalise", l), a.tags.push(l.tag);
          }
        return await i.callHook("tags:resolve", a), a.tags;
      },
      _elMap: {},
      _popSideEffectQueue() {
        const a = { ...r };
        return (r = {}), a;
      },
    };
  return s.hooks.callHook("init", s), s;
}
const qv = [
  "useHead",
  "useTagTitle",
  "useTagBase",
  "useTagMeta",
  "useTagMetaFlat",
  "useSeoMeta",
  "useTagLink",
  "useTagScript",
  "useTagStyle",
  "useTagNoscript",
  "useHtmlAttrs",
  "useBodyAttrs",
  "useTitleTemplate",
  "useServerHead",
  "useServerTagTitle",
  "useServerTagBase",
  "useServerTagMeta",
  "useServerTagMetaFlat",
  "useServerTagLink",
  "useServerTagScript",
  "useServerTagStyle",
  "useServerTagNoscript",
  "useServerHtmlAttrs",
  "useServerBodyAttrs",
  "useServerTitleTemplate",
];
function $v(e) {
  return typeof e == "function" ? e() : Ne(e);
}
function gi(e, t = "") {
  if (e instanceof Promise) return e;
  const r = $v(e);
  if (!e || !r) return r;
  if (Array.isArray(r)) return r.map((n) => gi(n, t));
  if (typeof r == "object") {
    let n = !1;
    const i = Object.fromEntries(
      Object.entries(r).map(([o, s]) =>
        o === "titleTemplate" || o.startsWith("on")
          ? [o, Ne(s)]
          : ((typeof s == "function" || _e(s)) && (n = !0), [o, gi(s, o)])
      )
    );
    return n && Zs.includes(String(t)) && (i._dynamic = !0), i;
  }
  return r;
}
const Hv = Ys.startsWith("3"),
  Bv = typeof window < "u",
  yf = "usehead";
function ea() {
  return (Zt() && We(yf)) || pf();
}
function Qv(e = {}) {
  const t = Lv({
      ...e,
      domDelayFn: (n) => setTimeout(() => vr(() => n()), 10),
      plugins: [Uv(), ...((e == null ? void 0 : e.plugins) || [])],
    }),
    r = {
      install(n) {
        Hv && ((n.config.globalProperties.$unhead = t), n.provide(yf, t));
      },
    };
  return (t.install = r.install), t;
}
const Uv = () => ({
  hooks: {
    "entries:resolve": function (e) {
      for (const t of e.entries) t.resolvedInput = gi(t.input);
    },
  },
});
function Vv(e, t = {}) {
  const r = ea(),
    n = pt(!1),
    i = pt({});
  Id(() => {
    i.value = n.value ? {} : gi(e);
  });
  const o = r.push(i.value, t);
  return (
    Wt(i, (a) => {
      o.patch(a);
    }),
    Zt() &&
      (Di(() => {
        o.dispose();
      }),
      bl(() => {
        n.value = !0;
      }),
      gl(() => {
        n.value = !1;
      })),
    o
  );
}
function Wv(e, t = {}) {
  return ea().push(e, t);
}
function vf(e, t = {}) {
  var n;
  const r = ea();
  if (r) {
    const i = Bv || !!((n = r.resolvedOptions) != null && n.document);
    return (t.mode === "server" && i) || (t.mode === "client" && !i)
      ? void 0
      : i
      ? Vv(e, t)
      : Wv(e, t);
  }
}
const zv = ["injectHead"];
[...zv, ...qv];
function Kv(e) {
  const t = Qv(),
    r = {
      unhead: t,
      install(n) {
        Ys.startsWith("3") &&
          ((n.config.globalProperties.$head = t), n.provide("usehead", t));
      },
      use(n) {
        t.use(n);
      },
      resolveTags() {
        return t.resolveTags();
      },
      headEntries() {
        return t.headEntries();
      },
      headTags() {
        return t.resolveTags();
      },
      push(n, i) {
        return t.push(n, i);
      },
      addEntry(n, i) {
        return t.push(n, i);
      },
      addHeadObjs(n, i) {
        return t.push(n, i);
      },
      addReactiveEntry(n, i) {
        const o = vf(n, i);
        return typeof o < "u" ? o.dispose : () => {};
      },
      removeHeadObjs() {},
      updateDOM(n, i) {
        i
          ? ff(t, { document: n })
          : hf(t, { delayFn: (o) => setTimeout(() => o(), 50), document: n });
      },
      internalHooks: t.hooks,
      hooks: { "before:dom": [], "resolved:tags": [], "resolved:entries": [] },
    };
  return (
    (t.addHeadObjs = r.addHeadObjs),
    (t.updateDOM = r.updateDOM),
    t.hooks.hook("dom:beforeRender", (n) => {
      for (const i of r.hooks["before:dom"])
        i() === !1 && (n.shouldRender = !1);
    }),
    e && r.addHeadObjs(e),
    r
  );
}
const Jv = {
  path: "/",
  watch: !0,
  decode: (e) => Xs(decodeURIComponent(e)),
  encode: (e) =>
    encodeURIComponent(typeof e == "string" ? e : JSON.stringify(e)),
};
function Zo(e, t) {
  var o;
  const r = { ...Jv, ...t },
    n = Gv(r) || {},
    i = pt(n[e] ?? ((o = r.default) == null ? void 0 : o.call(r)));
  {
    const s = () => {
      Xv(e, i.value, r);
    };
    r.watch ? Wt(i, s, { deep: r.watch !== "shallow" }) : s();
  }
  return i;
}
function Gv(e = {}) {
  return av(document.cookie, e);
}
function Yv(e, t, r = {}) {
  return t == null ? dc(e, t, { ...r, maxAge: -1 }) : dc(e, t, r);
}
function Xv(e, t, r = {}) {
  document.cookie = Yv(e, t, r);
}
const Zv = "modulepreload",
  em = function (e, t) {
    return e.startsWith(".") ? new URL(e, t).href : e;
  },
  gc = {},
  cr = function (t, r, n) {
    if (!r || r.length === 0) return t();
    const i = document.getElementsByTagName("link");
    return Promise.all(
      r.map((o) => {
        if (((o = em(o, n)), o in gc)) return;
        gc[o] = !0;
        const s = o.endsWith(".css"),
          a = s ? '[rel="stylesheet"]' : "";
        if (!!n)
          for (let l = i.length - 1; l >= 0; l--) {
            const f = i[l];
            if (f.href === o && (!s || f.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${o}"]${a}`)) return;
        const c = document.createElement("link");
        if (
          ((c.rel = s ? "stylesheet" : Zv),
          s || ((c.as = "script"), (c.crossOrigin = "")),
          (c.href = o),
          document.head.appendChild(c),
          s)
        )
          return new Promise((l, f) => {
            c.addEventListener("load", l),
              c.addEventListener("error", () =>
                f(new Error(`Unable to preload CSS for ${o}`))
              );
          });
      })
    ).then(() => t());
  };
function bc(e, t = {}) {
  const r = tm(e, t),
    n = je(),
    i = (n._payloadCache = n._payloadCache || {});
  return i[e] || (i[e] = rm(r).then((o) => o || (delete i[e], null))), i[e];
}
function tm(e, t = {}) {
  const r = new URL(e, "http://localhost");
  if (r.search)
    throw new Error("Payload URL cannot contain search params: " + e);
  if (r.host !== "localhost" || Mn(r.pathname, !0))
    throw new Error("Payload URL must not include hostname: " + e);
  const n = t.hash || (t.fresh ? Date.now() : "");
  return ji(
    Zl().app.baseURL,
    r.pathname,
    n ? `_payload.${n}.js` : "_payload.js"
  );
}
async function rm(e) {
  const t = await cr(() => import(e), [], import.meta.url).catch((r) => {
    console.warn("[nuxt] Cannot load payload ", e, r);
  });
  return (t == null ? void 0 : t.default) || null;
}
function nm() {
  return !!je().payload.prerenderedAt;
}
const im = {};
lv(im);
const om = mr((e) => {
    const t = Zy();
    return (
      e.vueApp.use(t),
      Ln(t),
      e.payload && e.payload.pinia && (t.state.value = e.payload.pinia),
      { provide: { pinia: t } }
    );
  }),
  ho = {},
  sm = mr((e) => {
    for (const t in ho)
      e.vueApp.component(t, ho[t]), e.vueApp.component("Lazy" + t, ho[t]);
  }),
  am = {
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { charset: "utf-8" },
    ],
    link: [],
    style: [],
    script: [],
    noscript: [],
  },
  cm = !1,
  es = !1,
  um = !1,
  lm = "__nuxt",
  fm = mr((e) => {
    const t = Kv();
    t.push(am), e.vueApp.use(t);
    {
      let r = !0;
      const n = () => {
        (r = !1), t.internalHooks.callHook("entries:updated", t.unhead);
      };
      t.internalHooks.hook("dom:beforeRender", (i) => {
        i.shouldRender = !r;
      }),
        e.hooks.hook("page:start", () => {
          r = !0;
        }),
        e.hooks.hook("page:finish", n),
        e.hooks.hook("app:mounted", n);
    }
    e._useHead = vf;
  });
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const Sr = typeof window < "u";
function hm(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const fe = Object.assign;
function po(e, t) {
  const r = {};
  for (const n in t) {
    const i = t[n];
    r[n] = mt(i) ? i.map(e) : e(i);
  }
  return r;
}
const mn = () => {},
  mt = Array.isArray,
  dm = /\/$/,
  pm = (e) => e.replace(dm, "");
function yo(e, t, r = "/") {
  let n,
    i = {},
    o = "",
    s = "";
  const a = t.indexOf("#");
  let u = t.indexOf("?");
  return (
    a < u && a >= 0 && (u = -1),
    u > -1 &&
      ((n = t.slice(0, u)),
      (o = t.slice(u + 1, a > -1 ? a : t.length)),
      (i = e(o))),
    a > -1 && ((n = n || t.slice(0, a)), (s = t.slice(a, t.length))),
    (n = gm(n ?? t, r)),
    { fullPath: n + (o && "?") + o + s, path: n, query: i, hash: s }
  );
}
function ym(e, t) {
  const r = t.query ? e(t.query) : "";
  return t.path + (r && "?") + r + (t.hash || "");
}
function wc(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function vm(e, t, r) {
  const n = t.matched.length - 1,
    i = r.matched.length - 1;
  return (
    n > -1 &&
    n === i &&
    Ur(t.matched[n], r.matched[i]) &&
    mf(t.params, r.params) &&
    e(t.query) === e(r.query) &&
    t.hash === r.hash
  );
}
function Ur(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function mf(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const r in e) if (!mm(e[r], t[r])) return !1;
  return !0;
}
function mm(e, t) {
  return mt(e) ? _c(e, t) : mt(t) ? _c(t, e) : e === t;
}
function _c(e, t) {
  return mt(t)
    ? e.length === t.length && e.every((r, n) => r === t[n])
    : e.length === 1 && e[0] === t;
}
function gm(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const r = t.split("/"),
    n = e.split("/");
  let i = r.length - 1,
    o,
    s;
  for (o = 0; o < n.length; o++)
    if (((s = n[o]), s !== "."))
      if (s === "..") i > 1 && i--;
      else break;
  return (
    r.slice(0, i).join("/") +
    "/" +
    n.slice(o - (o === n.length ? 1 : 0)).join("/")
  );
}
var Pn;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Pn || (Pn = {}));
var gn;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(gn || (gn = {}));
function bm(e) {
  if (!e)
    if (Sr) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), pm(e);
}
const wm = /^[^#]+#/;
function _m(e, t) {
  return e.replace(wm, "#") + t;
}
function Em(e, t) {
  const r = document.documentElement.getBoundingClientRect(),
    n = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: n.left - r.left - (t.left || 0),
    top: n.top - r.top - (t.top || 0),
  };
}
const Bi = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Sm(e) {
  let t;
  if ("el" in e) {
    const r = e.el,
      n = typeof r == "string" && r.startsWith("#"),
      i =
        typeof r == "string"
          ? n
            ? document.getElementById(r.slice(1))
            : document.querySelector(r)
          : r;
    if (!i) return;
    t = Em(i, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function Ec(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const ts = new Map();
function Om(e, t) {
  ts.set(e, t);
}
function Tm(e) {
  const t = ts.get(e);
  return ts.delete(e), t;
}
let km = () => location.protocol + "//" + location.host;
function gf(e, t) {
  const { pathname: r, search: n, hash: i } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let a = i.includes(e.slice(o)) ? e.slice(o).length : 1,
      u = i.slice(a);
    return u[0] !== "/" && (u = "/" + u), wc(u, "");
  }
  return wc(r, e) + n + i;
}
function Rm(e, t, r, n) {
  let i = [],
    o = [],
    s = null;
  const a = ({ state: h }) => {
    const d = gf(e, location),
      y = r.value,
      b = t.value;
    let w = 0;
    if (h) {
      if (((r.value = d), (t.value = h), s && s === y)) {
        s = null;
        return;
      }
      w = b ? h.position - b.position : 0;
    } else n(d);
    i.forEach((m) => {
      m(r.value, y, {
        delta: w,
        type: Pn.pop,
        direction: w ? (w > 0 ? gn.forward : gn.back) : gn.unknown,
      });
    });
  };
  function u() {
    s = r.value;
  }
  function c(h) {
    i.push(h);
    const d = () => {
      const y = i.indexOf(h);
      y > -1 && i.splice(y, 1);
    };
    return o.push(d), d;
  }
  function l() {
    const { history: h } = window;
    h.state && h.replaceState(fe({}, h.state, { scroll: Bi() }), "");
  }
  function f() {
    for (const h of o) h();
    (o = []),
      window.removeEventListener("popstate", a),
      window.removeEventListener("beforeunload", l);
  }
  return (
    window.addEventListener("popstate", a),
    window.addEventListener("beforeunload", l),
    { pauseListeners: u, listen: c, destroy: f }
  );
}
function Sc(e, t, r, n = !1, i = !1) {
  return {
    back: e,
    current: t,
    forward: r,
    replaced: n,
    position: window.history.length,
    scroll: i ? Bi() : null,
  };
}
function Cm(e) {
  const { history: t, location: r } = window,
    n = { value: gf(e, r) },
    i = { value: t.state };
  i.value ||
    o(
      n.value,
      {
        back: null,
        current: n.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function o(u, c, l) {
    const f = e.indexOf("#"),
      h =
        f > -1
          ? (r.host && document.querySelector("base") ? e : e.slice(f)) + u
          : km() + e + u;
    try {
      t[l ? "replaceState" : "pushState"](c, "", h), (i.value = c);
    } catch (d) {
      console.error(d), r[l ? "replace" : "assign"](h);
    }
  }
  function s(u, c) {
    const l = fe({}, t.state, Sc(i.value.back, u, i.value.forward, !0), c, {
      position: i.value.position,
    });
    o(u, l, !0), (n.value = u);
  }
  function a(u, c) {
    const l = fe({}, i.value, t.state, { forward: u, scroll: Bi() });
    o(l.current, l, !0);
    const f = fe({}, Sc(n.value, u, null), { position: l.position + 1 }, c);
    o(u, f, !1), (n.value = u);
  }
  return { location: n, state: i, push: a, replace: s };
}
function bf(e) {
  e = bm(e);
  const t = Cm(e),
    r = Rm(e, t.state, t.location, t.replace);
  function n(o, s = !0) {
    s || r.pauseListeners(), history.go(o);
  }
  const i = fe(
    { location: "", base: e, go: n, createHref: _m.bind(null, e) },
    t,
    r
  );
  return (
    Object.defineProperty(i, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(i, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    i
  );
}
function Pm(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ""),
    e.includes("#") || (e += "#"),
    bf(e)
  );
}
function xm(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function wf(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Nt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  _f = Symbol("");
var Oc;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(Oc || (Oc = {}));
function Vr(e, t) {
  return fe(new Error(), { type: e, [_f]: !0 }, t);
}
function St(e, t) {
  return e instanceof Error && _f in e && (t == null || !!(e.type & t));
}
const Tc = "[^/]+?",
  Im = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Am = /[.+*?^${}()[\]/\\]/g;
function Fm(e, t) {
  const r = fe({}, Im, t),
    n = [];
  let i = r.start ? "^" : "";
  const o = [];
  for (const c of e) {
    const l = c.length ? [] : [90];
    r.strict && !c.length && (i += "/");
    for (let f = 0; f < c.length; f++) {
      const h = c[f];
      let d = 40 + (r.sensitive ? 0.25 : 0);
      if (h.type === 0)
        f || (i += "/"), (i += h.value.replace(Am, "\\$&")), (d += 40);
      else if (h.type === 1) {
        const { value: y, repeatable: b, optional: w, regexp: m } = h;
        o.push({ name: y, repeatable: b, optional: w });
        const p = m || Tc;
        if (p !== Tc) {
          d += 10;
          try {
            new RegExp(`(${p})`);
          } catch (_) {
            throw new Error(
              `Invalid custom RegExp for param "${y}" (${p}): ` + _.message
            );
          }
        }
        let v = b ? `((?:${p})(?:/(?:${p}))*)` : `(${p})`;
        f || (v = w && c.length < 2 ? `(?:/${v})` : "/" + v),
          w && (v += "?"),
          (i += v),
          (d += 20),
          w && (d += -8),
          b && (d += -20),
          p === ".*" && (d += -50);
      }
      l.push(d);
    }
    n.push(l);
  }
  if (r.strict && r.end) {
    const c = n.length - 1;
    n[c][n[c].length - 1] += 0.7000000000000001;
  }
  r.strict || (i += "/?"), r.end ? (i += "$") : r.strict && (i += "(?:/|$)");
  const s = new RegExp(i, r.sensitive ? "" : "i");
  function a(c) {
    const l = c.match(s),
      f = {};
    if (!l) return null;
    for (let h = 1; h < l.length; h++) {
      const d = l[h] || "",
        y = o[h - 1];
      f[y.name] = d && y.repeatable ? d.split("/") : d;
    }
    return f;
  }
  function u(c) {
    let l = "",
      f = !1;
    for (const h of e) {
      (!f || !l.endsWith("/")) && (l += "/"), (f = !1);
      for (const d of h)
        if (d.type === 0) l += d.value;
        else if (d.type === 1) {
          const { value: y, repeatable: b, optional: w } = d,
            m = y in c ? c[y] : "";
          if (mt(m) && !b)
            throw new Error(
              `Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`
            );
          const p = mt(m) ? m.join("/") : m;
          if (!p)
            if (w)
              h.length < 2 &&
                (l.endsWith("/") ? (l = l.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${y}"`);
          l += p;
        }
    }
    return l || "/";
  }
  return { re: s, score: n, keys: o, parse: a, stringify: u };
}
function Dm(e, t) {
  let r = 0;
  for (; r < e.length && r < t.length; ) {
    const n = t[r] - e[r];
    if (n) return n;
    r++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Nm(e, t) {
  let r = 0;
  const n = e.score,
    i = t.score;
  for (; r < n.length && r < i.length; ) {
    const o = Dm(n[r], i[r]);
    if (o) return o;
    r++;
  }
  if (Math.abs(i.length - n.length) === 1) {
    if (kc(n)) return 1;
    if (kc(i)) return -1;
  }
  return i.length - n.length;
}
function kc(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Mm = { type: 0, value: "" },
  Lm = /[a-zA-Z0-9_]/;
function jm(e) {
  if (!e) return [[]];
  if (e === "/") return [[Mm]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(d) {
    throw new Error(`ERR (${r})/"${c}": ${d}`);
  }
  let r = 0,
    n = r;
  const i = [];
  let o;
  function s() {
    o && i.push(o), (o = []);
  }
  let a = 0,
    u,
    c = "",
    l = "";
  function f() {
    c &&
      (r === 0
        ? o.push({ type: 0, value: c })
        : r === 1 || r === 2 || r === 3
        ? (o.length > 1 &&
            (u === "*" || u === "+") &&
            t(
              `A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: c,
            regexp: l,
            repeatable: u === "*" || u === "+",
            optional: u === "*" || u === "?",
          }))
        : t("Invalid state to consume buffer"),
      (c = ""));
  }
  function h() {
    c += u;
  }
  for (; a < e.length; ) {
    if (((u = e[a++]), u === "\\" && r !== 2)) {
      (n = r), (r = 4);
      continue;
    }
    switch (r) {
      case 0:
        u === "/" ? (c && f(), s()) : u === ":" ? (f(), (r = 1)) : h();
        break;
      case 4:
        h(), (r = n);
        break;
      case 1:
        u === "("
          ? (r = 2)
          : Lm.test(u)
          ? h()
          : (f(), (r = 0), u !== "*" && u !== "?" && u !== "+" && a--);
        break;
      case 2:
        u === ")"
          ? l[l.length - 1] == "\\"
            ? (l = l.slice(0, -1) + u)
            : (r = 3)
          : (l += u);
        break;
      case 3:
        f(), (r = 0), u !== "*" && u !== "?" && u !== "+" && a--, (l = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return r === 2 && t(`Unfinished custom RegExp for param "${c}"`), f(), s(), i;
}
function qm(e, t, r) {
  const n = Fm(jm(e.path), r),
    i = fe(n, { record: e, parent: t, children: [], alias: [] });
  return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
}
function $m(e, t) {
  const r = [],
    n = new Map();
  t = Pc({ strict: !1, end: !0, sensitive: !1 }, t);
  function i(l) {
    return n.get(l);
  }
  function o(l, f, h) {
    const d = !h,
      y = Hm(l);
    y.aliasOf = h && h.record;
    const b = Pc(t, l),
      w = [y];
    if ("alias" in l) {
      const v = typeof l.alias == "string" ? [l.alias] : l.alias;
      for (const _ of v)
        w.push(
          fe({}, y, {
            components: h ? h.record.components : y.components,
            path: _,
            aliasOf: h ? h.record : y,
          })
        );
    }
    let m, p;
    for (const v of w) {
      const { path: _ } = v;
      if (f && _[0] !== "/") {
        const S = f.record.path,
          k = S[S.length - 1] === "/" ? "" : "/";
        v.path = f.record.path + (_ && k + _);
      }
      if (
        ((m = qm(v, f, b)),
        h
          ? h.alias.push(m)
          : ((p = p || m),
            p !== m && p.alias.push(m),
            d && l.name && !Cc(m) && s(l.name)),
        y.children)
      ) {
        const S = y.children;
        for (let k = 0; k < S.length; k++) o(S[k], m, h && h.children[k]);
      }
      (h = h || m),
        ((m.record.components && Object.keys(m.record.components).length) ||
          m.record.name ||
          m.record.redirect) &&
          u(m);
    }
    return p
      ? () => {
          s(p);
        }
      : mn;
  }
  function s(l) {
    if (wf(l)) {
      const f = n.get(l);
      f &&
        (n.delete(l),
        r.splice(r.indexOf(f), 1),
        f.children.forEach(s),
        f.alias.forEach(s));
    } else {
      const f = r.indexOf(l);
      f > -1 &&
        (r.splice(f, 1),
        l.record.name && n.delete(l.record.name),
        l.children.forEach(s),
        l.alias.forEach(s));
    }
  }
  function a() {
    return r;
  }
  function u(l) {
    let f = 0;
    for (
      ;
      f < r.length &&
      Nm(l, r[f]) >= 0 &&
      (l.record.path !== r[f].record.path || !Ef(l, r[f]));

    )
      f++;
    r.splice(f, 0, l), l.record.name && !Cc(l) && n.set(l.record.name, l);
  }
  function c(l, f) {
    let h,
      d = {},
      y,
      b;
    if ("name" in l && l.name) {
      if (((h = n.get(l.name)), !h)) throw Vr(1, { location: l });
      (b = h.record.name),
        (d = fe(
          Rc(
            f.params,
            h.keys.filter((p) => !p.optional).map((p) => p.name)
          ),
          l.params &&
            Rc(
              l.params,
              h.keys.map((p) => p.name)
            )
        )),
        (y = h.stringify(d));
    } else if ("path" in l)
      (y = l.path),
        (h = r.find((p) => p.re.test(y))),
        h && ((d = h.parse(y)), (b = h.record.name));
    else {
      if (((h = f.name ? n.get(f.name) : r.find((p) => p.re.test(f.path))), !h))
        throw Vr(1, { location: l, currentLocation: f });
      (b = h.record.name),
        (d = fe({}, f.params, l.params)),
        (y = h.stringify(d));
    }
    const w = [];
    let m = h;
    for (; m; ) w.unshift(m.record), (m = m.parent);
    return { name: b, path: y, params: d, matched: w, meta: Qm(w) };
  }
  return (
    e.forEach((l) => o(l)),
    {
      addRoute: o,
      resolve: c,
      removeRoute: s,
      getRoutes: a,
      getRecordMatcher: i,
    }
  );
}
function Rc(e, t) {
  const r = {};
  for (const n of t) n in e && (r[n] = e[n]);
  return r;
}
function Hm(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Bm(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function Bm(e) {
  const t = {},
    r = e.props || !1;
  if ("component" in e) t.default = r;
  else for (const n in e.components) t[n] = typeof r == "boolean" ? r : r[n];
  return t;
}
function Cc(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Qm(e) {
  return e.reduce((t, r) => fe(t, r.meta), {});
}
function Pc(e, t) {
  const r = {};
  for (const n in e) r[n] = n in t ? t[n] : e[n];
  return r;
}
function Ef(e, t) {
  return t.children.some((r) => r === e || Ef(e, r));
}
const Sf = /#/g,
  Um = /&/g,
  Vm = /\//g,
  Wm = /=/g,
  zm = /\?/g,
  Of = /\+/g,
  Km = /%5B/g,
  Jm = /%5D/g,
  Tf = /%5E/g,
  Gm = /%60/g,
  kf = /%7B/g,
  Ym = /%7C/g,
  Rf = /%7D/g,
  Xm = /%20/g;
function ta(e) {
  return encodeURI("" + e)
    .replace(Ym, "|")
    .replace(Km, "[")
    .replace(Jm, "]");
}
function Zm(e) {
  return ta(e).replace(kf, "{").replace(Rf, "}").replace(Tf, "^");
}
function rs(e) {
  return ta(e)
    .replace(Of, "%2B")
    .replace(Xm, "+")
    .replace(Sf, "%23")
    .replace(Um, "%26")
    .replace(Gm, "`")
    .replace(kf, "{")
    .replace(Rf, "}")
    .replace(Tf, "^");
}
function eg(e) {
  return rs(e).replace(Wm, "%3D");
}
function tg(e) {
  return ta(e).replace(Sf, "%23").replace(zm, "%3F");
}
function rg(e) {
  return e == null ? "" : tg(e).replace(Vm, "%2F");
}
function bi(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function ng(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let i = 0; i < n.length; ++i) {
    const o = n[i].replace(Of, " "),
      s = o.indexOf("="),
      a = bi(s < 0 ? o : o.slice(0, s)),
      u = s < 0 ? null : bi(o.slice(s + 1));
    if (a in t) {
      let c = t[a];
      mt(c) || (c = t[a] = [c]), c.push(u);
    } else t[a] = u;
  }
  return t;
}
function xc(e) {
  let t = "";
  for (let r in e) {
    const n = e[r];
    if (((r = eg(r)), n == null)) {
      n !== void 0 && (t += (t.length ? "&" : "") + r);
      continue;
    }
    (mt(n) ? n.map((o) => o && rs(o)) : [n && rs(n)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + r), o != null && (t += "=" + o));
    });
  }
  return t;
}
function ig(e) {
  const t = {};
  for (const r in e) {
    const n = e[r];
    n !== void 0 &&
      (t[r] = mt(n)
        ? n.map((i) => (i == null ? null : "" + i))
        : n == null
        ? n
        : "" + n);
  }
  return t;
}
const og = Symbol(""),
  Ic = Symbol(""),
  ra = Symbol(""),
  na = Symbol(""),
  ns = Symbol("");
function rn() {
  let e = [];
  function t(n) {
    return (
      e.push(n),
      () => {
        const i = e.indexOf(n);
        i > -1 && e.splice(i, 1);
      }
    );
  }
  function r() {
    e = [];
  }
  return { add: t, list: () => e, reset: r };
}
function qt(e, t, r, n, i) {
  const o = n && (n.enterCallbacks[i] = n.enterCallbacks[i] || []);
  return () =>
    new Promise((s, a) => {
      const u = (f) => {
          f === !1
            ? a(Vr(4, { from: r, to: t }))
            : f instanceof Error
            ? a(f)
            : xm(f)
            ? a(Vr(2, { from: t, to: f }))
            : (o &&
                n.enterCallbacks[i] === o &&
                typeof f == "function" &&
                o.push(f),
              s());
        },
        c = e.call(n && n.instances[i], t, r, u);
      let l = Promise.resolve(c);
      e.length < 3 && (l = l.then(u)), l.catch((f) => a(f));
    });
}
function vo(e, t, r, n) {
  const i = [];
  for (const o of e)
    for (const s in o.components) {
      let a = o.components[s];
      if (!(t !== "beforeRouteEnter" && !o.instances[s]))
        if (sg(a)) {
          const c = (a.__vccOpts || a)[t];
          c && i.push(qt(c, r, n, o, s));
        } else {
          let u = a();
          i.push(() =>
            u.then((c) => {
              if (!c)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${s}" at "${o.path}"`)
                );
              const l = hm(c) ? c.default : c;
              o.components[s] = l;
              const h = (l.__vccOpts || l)[t];
              return h && qt(h, r, n, o, s)();
            })
          );
        }
    }
  return i;
}
function sg(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Ac(e) {
  const t = We(ra),
    r = We(na),
    n = $e(() => t.resolve(Ne(e.to))),
    i = $e(() => {
      const { matched: u } = n.value,
        { length: c } = u,
        l = u[c - 1],
        f = r.matched;
      if (!l || !f.length) return -1;
      const h = f.findIndex(Ur.bind(null, l));
      if (h > -1) return h;
      const d = Fc(u[c - 2]);
      return c > 1 && Fc(l) === d && f[f.length - 1].path !== d
        ? f.findIndex(Ur.bind(null, u[c - 2]))
        : h;
    }),
    o = $e(() => i.value > -1 && lg(r.params, n.value.params)),
    s = $e(
      () =>
        i.value > -1 &&
        i.value === r.matched.length - 1 &&
        mf(r.params, n.value.params)
    );
  function a(u = {}) {
    return ug(u)
      ? t[Ne(e.replace) ? "replace" : "push"](Ne(e.to)).catch(mn)
      : Promise.resolve();
  }
  return {
    route: n,
    href: $e(() => n.value.href),
    isActive: o,
    isExactActive: s,
    navigate: a,
  };
}
const ag = Xt({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Ac,
    setup(e, { slots: t }) {
      const r = vt(Ac(e)),
        { options: n } = We(ra),
        i = $e(() => ({
          [Dc(e.activeClass, n.linkActiveClass, "router-link-active")]:
            r.isActive,
          [Dc(
            e.exactActiveClass,
            n.linkExactActiveClass,
            "router-link-exact-active"
          )]: r.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(r);
        return e.custom
          ? o
          : yt(
              "a",
              {
                "aria-current": r.isExactActive ? e.ariaCurrentValue : null,
                href: r.href,
                onClick: r.navigate,
                class: i.value,
              },
              o
            );
      };
    },
  }),
  cg = ag;
function ug(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function lg(e, t) {
  for (const r in t) {
    const n = t[r],
      i = e[r];
    if (typeof n == "string") {
      if (n !== i) return !1;
    } else if (!mt(i) || i.length !== n.length || n.some((o, s) => o !== i[s]))
      return !1;
  }
  return !0;
}
function Fc(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Dc = (e, t, r) => e ?? t ?? r,
  fg = Xt({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: r }) {
      const n = We(ns),
        i = $e(() => e.route || n.value),
        o = We(Ic, 0),
        s = $e(() => {
          let c = Ne(o);
          const { matched: l } = i.value;
          let f;
          for (; (f = l[c]) && !f.components; ) c++;
          return c;
        }),
        a = $e(() => i.value.matched[s.value]);
      Nr(
        Ic,
        $e(() => s.value + 1)
      ),
        Nr(og, a),
        Nr(ns, i);
      const u = pt();
      return (
        Wt(
          () => [u.value, a.value, e.name],
          ([c, l, f], [h, d, y]) => {
            l &&
              ((l.instances[f] = c),
              d &&
                d !== l &&
                c &&
                c === h &&
                (l.leaveGuards.size || (l.leaveGuards = d.leaveGuards),
                l.updateGuards.size || (l.updateGuards = d.updateGuards))),
              c &&
                l &&
                (!d || !Ur(l, d) || !h) &&
                (l.enterCallbacks[f] || []).forEach((b) => b(c));
          },
          { flush: "post" }
        ),
        () => {
          const c = i.value,
            l = e.name,
            f = a.value,
            h = f && f.components[l];
          if (!h) return Nc(r.default, { Component: h, route: c });
          const d = f.props[l],
            y = d
              ? d === !0
                ? c.params
                : typeof d == "function"
                ? d(c)
                : d
              : null,
            w = yt(
              h,
              fe({}, y, t, {
                onVnodeUnmounted: (m) => {
                  m.component.isUnmounted && (f.instances[l] = null);
                },
                ref: u,
              })
            );
          return Nc(r.default, { Component: w, route: c }) || w;
        }
      );
    },
  });
function Nc(e, t) {
  if (!e) return null;
  const r = e(t);
  return r.length === 1 ? r[0] : r;
}
const Cf = fg;
function hg(e) {
  const t = $m(e.routes, e),
    r = e.parseQuery || ng,
    n = e.stringifyQuery || xc,
    i = e.history,
    o = rn(),
    s = rn(),
    a = rn(),
    u = Fo(Nt);
  let c = Nt;
  Sr &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const l = po.bind(null, (P) => "" + P),
    f = po.bind(null, rg),
    h = po.bind(null, bi);
  function d(P, D) {
    let H, G;
    return (
      wf(P) ? ((H = t.getRecordMatcher(P)), (G = D)) : (G = P), t.addRoute(G, H)
    );
  }
  function y(P) {
    const D = t.getRecordMatcher(P);
    D && t.removeRoute(D);
  }
  function b() {
    return t.getRoutes().map((P) => P.record);
  }
  function w(P) {
    return !!t.getRecordMatcher(P);
  }
  function m(P, D) {
    if (((D = fe({}, D || u.value)), typeof P == "string")) {
      const g = yo(r, P, D.path),
        E = t.resolve({ path: g.path }, D),
        C = i.createHref(g.fullPath);
      return fe(g, E, {
        params: h(E.params),
        hash: bi(g.hash),
        redirectedFrom: void 0,
        href: C,
      });
    }
    let H;
    if ("path" in P) H = fe({}, P, { path: yo(r, P.path, D.path).path });
    else {
      const g = fe({}, P.params);
      for (const E in g) g[E] == null && delete g[E];
      (H = fe({}, P, { params: f(P.params) })), (D.params = f(D.params));
    }
    const G = t.resolve(H, D),
      ce = P.hash || "";
    G.params = l(h(G.params));
    const we = ym(n, fe({}, P, { hash: Zm(ce), path: G.path })),
      ie = i.createHref(we);
    return fe(
      { fullPath: we, hash: ce, query: n === xc ? ig(P.query) : P.query || {} },
      G,
      { redirectedFrom: void 0, href: ie }
    );
  }
  function p(P) {
    return typeof P == "string" ? yo(r, P, u.value.path) : fe({}, P);
  }
  function v(P, D) {
    if (c !== P) return Vr(8, { from: D, to: P });
  }
  function _(P) {
    return T(P);
  }
  function S(P) {
    return _(fe(p(P), { replace: !0 }));
  }
  function k(P) {
    const D = P.matched[P.matched.length - 1];
    if (D && D.redirect) {
      const { redirect: H } = D;
      let G = typeof H == "function" ? H(P) : H;
      return (
        typeof G == "string" &&
          ((G = G.includes("?") || G.includes("#") ? (G = p(G)) : { path: G }),
          (G.params = {})),
        fe(
          { query: P.query, hash: P.hash, params: "path" in G ? {} : P.params },
          G
        )
      );
    }
  }
  function T(P, D) {
    const H = (c = m(P)),
      G = u.value,
      ce = P.state,
      we = P.force,
      ie = P.replace === !0,
      g = k(H);
    if (g)
      return T(
        fe(p(g), {
          state: typeof g == "object" ? fe({}, ce, g.state) : ce,
          force: we,
          replace: ie,
        }),
        D || H
      );
    const E = H;
    E.redirectedFrom = D;
    let C;
    return (
      !we &&
        vm(n, G, H) &&
        ((C = Vr(16, { to: E, from: G })), te(G, G, !0, !1)),
      (C ? Promise.resolve(C) : M(E, G))
        .catch((x) => (St(x) ? (St(x, 2) ? x : Ee(x)) : K(x, E, G)))
        .then((x) => {
          if (x) {
            if (St(x, 2))
              return T(
                fe({ replace: ie }, p(x.to), {
                  state: typeof x.to == "object" ? fe({}, ce, x.to.state) : ce,
                  force: we,
                }),
                D || E
              );
          } else x = Q(E, G, !0, ie, ce);
          return L(E, G, x), x;
        })
    );
  }
  function O(P, D) {
    const H = v(P, D);
    return H ? Promise.reject(H) : Promise.resolve();
  }
  function M(P, D) {
    let H;
    const [G, ce, we] = dg(P, D);
    H = vo(G.reverse(), "beforeRouteLeave", P, D);
    for (const g of G)
      g.leaveGuards.forEach((E) => {
        H.push(qt(E, P, D));
      });
    const ie = O.bind(null, P, D);
    return (
      H.push(ie),
      _r(H)
        .then(() => {
          H = [];
          for (const g of o.list()) H.push(qt(g, P, D));
          return H.push(ie), _r(H);
        })
        .then(() => {
          H = vo(ce, "beforeRouteUpdate", P, D);
          for (const g of ce)
            g.updateGuards.forEach((E) => {
              H.push(qt(E, P, D));
            });
          return H.push(ie), _r(H);
        })
        .then(() => {
          H = [];
          for (const g of P.matched)
            if (g.beforeEnter && !D.matched.includes(g))
              if (mt(g.beforeEnter))
                for (const E of g.beforeEnter) H.push(qt(E, P, D));
              else H.push(qt(g.beforeEnter, P, D));
          return H.push(ie), _r(H);
        })
        .then(
          () => (
            P.matched.forEach((g) => (g.enterCallbacks = {})),
            (H = vo(we, "beforeRouteEnter", P, D)),
            H.push(ie),
            _r(H)
          )
        )
        .then(() => {
          H = [];
          for (const g of s.list()) H.push(qt(g, P, D));
          return H.push(ie), _r(H);
        })
        .catch((g) => (St(g, 8) ? g : Promise.reject(g)))
    );
  }
  function L(P, D, H) {
    for (const G of a.list()) G(P, D, H);
  }
  function Q(P, D, H, G, ce) {
    const we = v(P, D);
    if (we) return we;
    const ie = D === Nt,
      g = Sr ? history.state : {};
    H &&
      (G || ie
        ? i.replace(P.fullPath, fe({ scroll: ie && g && g.scroll }, ce))
        : i.push(P.fullPath, ce)),
      (u.value = P),
      te(P, D, H, ie),
      Ee();
  }
  let q;
  function W() {
    q ||
      (q = i.listen((P, D, H) => {
        if (!ct.listening) return;
        const G = m(P),
          ce = k(G);
        if (ce) {
          T(fe(ce, { replace: !0 }), G).catch(mn);
          return;
        }
        c = G;
        const we = u.value;
        Sr && Om(Ec(we.fullPath, H.delta), Bi()),
          M(G, we)
            .catch((ie) =>
              St(ie, 12)
                ? ie
                : St(ie, 2)
                ? (T(ie.to, G)
                    .then((g) => {
                      St(g, 20) &&
                        !H.delta &&
                        H.type === Pn.pop &&
                        i.go(-1, !1);
                    })
                    .catch(mn),
                  Promise.reject())
                : (H.delta && i.go(-H.delta, !1), K(ie, G, we))
            )
            .then((ie) => {
              (ie = ie || Q(G, we, !1)),
                ie &&
                  (H.delta && !St(ie, 8)
                    ? i.go(-H.delta, !1)
                    : H.type === Pn.pop && St(ie, 20) && i.go(-1, !1)),
                L(G, we, ie);
            })
            .catch(mn);
      }));
  }
  let I = rn(),
    Z = rn(),
    z;
  function K(P, D, H) {
    Ee(P);
    const G = Z.list();
    return (
      G.length ? G.forEach((ce) => ce(P, D, H)) : console.error(P),
      Promise.reject(P)
    );
  }
  function U() {
    return z && u.value !== Nt
      ? Promise.resolve()
      : new Promise((P, D) => {
          I.add([P, D]);
        });
  }
  function Ee(P) {
    return (
      z ||
        ((z = !P),
        W(),
        I.list().forEach(([D, H]) => (P ? H(P) : D())),
        I.reset()),
      P
    );
  }
  function te(P, D, H, G) {
    const { scrollBehavior: ce } = e;
    if (!Sr || !ce) return Promise.resolve();
    const we =
      (!H && Tm(Ec(P.fullPath, 0))) ||
      ((G || !H) && history.state && history.state.scroll) ||
      null;
    return vr()
      .then(() => ce(P, D, we))
      .then((ie) => ie && Sm(ie))
      .catch((ie) => K(ie, P, D));
  }
  const Se = (P) => i.go(P);
  let be;
  const at = new Set(),
    ct = {
      currentRoute: u,
      listening: !0,
      addRoute: d,
      removeRoute: y,
      hasRoute: w,
      getRoutes: b,
      resolve: m,
      options: e,
      push: _,
      replace: S,
      go: Se,
      back: () => Se(-1),
      forward: () => Se(1),
      beforeEach: o.add,
      beforeResolve: s.add,
      afterEach: a.add,
      onError: Z.add,
      isReady: U,
      install(P) {
        const D = this;
        P.component("RouterLink", cg),
          P.component("RouterView", Cf),
          (P.config.globalProperties.$router = D),
          Object.defineProperty(P.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Ne(u),
          }),
          Sr &&
            !be &&
            u.value === Nt &&
            ((be = !0), _(i.location).catch((ce) => {}));
        const H = {};
        for (const ce in Nt) H[ce] = $e(() => u.value[ce]);
        P.provide(ra, D), P.provide(na, vt(H)), P.provide(ns, u);
        const G = P.unmount;
        at.add(P),
          (P.unmount = function () {
            at.delete(P),
              at.size < 1 &&
                ((c = Nt),
                q && q(),
                (q = null),
                (u.value = Nt),
                (be = !1),
                (z = !1)),
              G();
          });
      },
    };
  return ct;
}
function _r(e) {
  return e.reduce((t, r) => t.then(() => r()), Promise.resolve());
}
function dg(e, t) {
  const r = [],
    n = [],
    i = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let s = 0; s < o; s++) {
    const a = t.matched[s];
    a && (e.matched.find((c) => Ur(c, a)) ? n.push(a) : r.push(a));
    const u = e.matched[s];
    u && (t.matched.find((c) => Ur(c, u)) || i.push(u));
  }
  return [r, n, i];
}
function pg() {
  return We(na);
}
const Mc = [
    {
      name: "index",
      path: "/",
      children: [],
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        cr(
          () => import("./index.ec5073f3.js"),
          [
            "./index.ec5073f3.js",
            "./nhost.06efe5c8.js",
            "./index.847b0713.css",
          ],
          import.meta.url
        ).then((e) => e.default || e),
    },
    {
      name: "login",
      path: "/login",
      children: [],
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        cr(
          () => import("./login.a5d98935.js"),
          [
            "./login.a5d98935.js",
            "./nhost.06efe5c8.js",
            "./login.03d9cf19.css",
          ],
          import.meta.url
        ).then((e) => e.default || e),
    },
    {
      name: "recipe-id",
      path: "/recipe/:id",
      children: [],
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        cr(() => import("./_id_.a0f6a39e.js"), [], import.meta.url).then(
          (e) => e.default || e
        ),
    },
    {
      name: "user",
      path: "/user",
      children: [],
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        cr(() => import("./user.d8ee0914.js"), [], import.meta.url).then(
          (e) => e.default || e
        ),
    },
    {
      name: "verify-email",
      path: "/auth/verify",
      children: [],
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        cr(() => import("./auth/verify.7d6a5ebc.js"), [], import.meta.url).then(
          (e) => e.default || e
        ),
    },
  ],
  yg = {
    scrollBehavior(e, t, r) {
      const n = je();
      let i = r || void 0;
      if (
        (!i &&
          t &&
          e &&
          e.meta.scrollToTop !== !1 &&
          vg(t, e) &&
          (i = { left: 0, top: 0 }),
        e.path === t.path)
      ) {
        if (t.hash && !e.hash) return { left: 0, top: 0 };
        if (e.hash) return { el: e.hash, top: Lc(e.hash) };
      }
      const o = (a) => !!(a.meta.pageTransition ?? es),
        s = o(t) && o(e) ? "page:transition:finish" : "page:finish";
      return new Promise((a) => {
        n.hooks.hookOnce(s, async () => {
          await vr(), e.hash && (i = { el: e.hash, top: Lc(e.hash) }), a(i);
        });
      });
    },
  };
function Lc(e) {
  try {
    const t = document.querySelector(e);
    if (t) return parseFloat(getComputedStyle(t).scrollMarginTop);
  } catch {}
  return 0;
}
function vg(e, t) {
  const r = e.matched[0] === t.matched[0];
  return !!(!r || (r && JSON.stringify(e.params) !== JSON.stringify(t.params)));
}
const mg = {},
  Ot = { ...mg, ...yg },
  gg = cf(async (e) => {
    var u;
    let t, r;
    if (!((u = e.meta) != null && u.validate)) return;
    const n = je(),
      i = Hi();
    if (
      (([t, r] = zo(() => Promise.resolve(e.meta.validate(e)))),
      (t = await t),
      r(),
      t) === !0
    )
      return;
    const s = sf({
        statusCode: 404,
        statusMessage: `Page Not Found: ${e.fullPath}`,
      }),
      a = i.beforeResolve((c) => {
        if ((a(), c === e)) {
          const l = i.afterEach(async () => {
            l(),
              await kt(n, kr, [s]),
              window.history.pushState({}, "", e.fullPath);
          });
          return !1;
        }
      });
  }),
  bg = cf(async (e, t) => {}),
  wg = [gg, bg],
  bn = {};
function _g(e, t) {
  const { pathname: r, search: n, hash: i } = t,
    o = e.indexOf("#");
  if (o > -1) {
    const a = i.includes(e.slice(o)) ? e.slice(o).length : 1;
    let u = i.slice(a);
    return u[0] !== "/" && (u = "/" + u), ac(u, "");
  }
  return ac(r, e) + n + i;
}
const Eg = mr(async (e) => {
    var y, b;
    let t,
      r,
      n = Zl().app.baseURL;
    Ot.hashMode && !n.includes("#") && (n += "#");
    const i =
        ((y = Ot.history) == null ? void 0 : y.call(Ot, n)) ??
        (Ot.hashMode ? Pm(n) : bf(n)),
      o = ((b = Ot.routes) == null ? void 0 : b.call(Ot, Mc)) ?? Mc,
      s = _g(n, window.location),
      a = hg({ ...Ot, history: i, routes: o });
    e.vueApp.use(a);
    const u = Fo(a.currentRoute.value);
    a.afterEach((w, m) => {
      u.value = m;
    }),
      Object.defineProperty(e.vueApp.config.globalProperties, "previousRoute", {
        get: () => u.value,
      });
    const c = Fo(a.resolve(s)),
      l = () => {
        c.value = a.currentRoute.value;
      };
    e.hook("page:finish", l),
      a.afterEach((w, m) => {
        var p, v, _, S;
        ((v = (p = w.matched[0]) == null ? void 0 : p.components) == null
          ? void 0
          : v.default) ===
          ((S = (_ = m.matched[0]) == null ? void 0 : _.components) == null
            ? void 0
            : S.default) && l();
      });
    const f = {};
    for (const w in c.value) f[w] = $e(() => c.value[w]);
    (e._route = vt(f)),
      (e._middleware = e._middleware || { global: [], named: {} });
    const h = $i();
    try {
      ([t, r] = zo(() => a.isReady())), await t, r();
    } catch (w) {
      ([t, r] = zo(() => kt(e, kr, [w]))), await t, r();
    }
    const d = pv("_layout");
    return (
      a.beforeEach(async (w, m) => {
        var v;
        (w.meta = vt(w.meta)),
          e.isHydrating &&
            d.value &&
            !hr(w.meta.layout) &&
            (w.meta.layout = d.value),
          (e._processingMiddleware = !0);
        const p = new Set([...wg, ...e._middleware.global]);
        for (const _ of w.matched) {
          const S = _.meta.middleware;
          if (S)
            if (Array.isArray(S)) for (const k of S) p.add(k);
            else p.add(S);
        }
        for (const _ of p) {
          const S =
            typeof _ == "string"
              ? e._middleware.named[_] ||
                (await ((v = bn[_]) == null
                  ? void 0
                  : v.call(bn).then((T) => T.default || T)))
              : _;
          if (!S) throw new Error(`Unknown route middleware: '${_}'.`);
          const k = await kt(e, S, [w, m]);
          if (
            !e.payload.serverRendered &&
            e.isHydrating &&
            (k === !1 || k instanceof Error)
          ) {
            const T =
              k ||
              Xo({ statusCode: 404, statusMessage: `Page Not Found: ${s}` });
            return await kt(e, kr, [T]), !1;
          }
          if (k || k === !1) return k;
        }
      }),
      a.afterEach(async (w) => {
        delete e._processingMiddleware,
          !e.isHydrating && h.value && (await kt(e, hv)),
          w.matched.length === 0 &&
            (await kt(e, kr, [
              Xo({
                statusCode: 404,
                fatal: !1,
                statusMessage: `Page not found: ${w.fullPath}`,
              }),
            ]));
      }),
      e.hooks.hookOnce("app:created", async () => {
        try {
          await a.replace({ ...a.resolve(s), name: void 0, force: !0 });
        } catch (w) {
          await kt(e, kr, [w]);
        }
      }),
      { provide: { router: a } }
    );
  }),
  Rr = {},
  Sg = mr(() => {
    const e = je(),
      t = Hi();
    e.hooks.hook("app:mounted", () => {
      t.beforeEach(async (r) => {
        var i;
        const n = (i = r == null ? void 0 : r.meta) == null ? void 0 : i.layout;
        n && typeof Rr[n] == "function" && (await Rr[n]());
      });
    }),
      e.hooks.hook("link:prefetch", (r) => {
        var s, a, u, c;
        if (Mn(r)) return;
        const n = t.resolve(r);
        if (!n) return;
        const i = (s = n == null ? void 0 : n.meta) == null ? void 0 : s.layout;
        let o = Array.isArray(
          (a = n == null ? void 0 : n.meta) == null ? void 0 : a.middleware
        )
          ? (u = n == null ? void 0 : n.meta) == null
            ? void 0
            : u.middleware
          : [(c = n == null ? void 0 : n.meta) == null ? void 0 : c.middleware];
        o = o.filter((l) => typeof l == "string");
        for (const l of o) typeof bn[l] == "function" && bn[l]();
        i && typeof Rr[i] == "function" && Rr[i]();
      });
  });
var is = function (e, t) {
  return (
    (is =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (r, n) {
          r.__proto__ = n;
        }) ||
      function (r, n) {
        for (var i in n)
          Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
      }),
    is(e, t)
  );
};
function Xe(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError(
      "Class extends value " + String(t) + " is not a constructor or null"
    );
  is(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype =
    t === null ? Object.create(t) : ((r.prototype = t.prototype), new r());
}
var R = function () {
  return (
    (R =
      Object.assign ||
      function (t) {
        for (var r, n = 1, i = arguments.length; n < i; n++) {
          r = arguments[n];
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
        }
        return t;
      }),
    R.apply(this, arguments)
  );
};
function dr(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) &&
      t.indexOf(n) < 0 &&
      (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++)
      t.indexOf(n[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
        (r[n[i]] = e[n[i]]);
  return r;
}
function $t(e, t, r, n) {
  function i(o) {
    return o instanceof r
      ? o
      : new r(function (s) {
          s(o);
        });
  }
  return new (r || (r = Promise))(function (o, s) {
    function a(l) {
      try {
        c(n.next(l));
      } catch (f) {
        s(f);
      }
    }
    function u(l) {
      try {
        c(n.throw(l));
      } catch (f) {
        s(f);
      }
    }
    function c(l) {
      l.done ? o(l.value) : i(l.value).then(a, u);
    }
    c((n = n.apply(e, t || [])).next());
  });
}
function Ht(e, t) {
  var r = {
      label: 0,
      sent: function () {
        if (o[0] & 1) throw o[1];
        return o[1];
      },
      trys: [],
      ops: [],
    },
    n,
    i,
    o,
    s;
  return (
    (s = { next: a(0), throw: a(1), return: a(2) }),
    typeof Symbol == "function" &&
      (s[Symbol.iterator] = function () {
        return this;
      }),
    s
  );
  function a(c) {
    return function (l) {
      return u([c, l]);
    };
  }
  function u(c) {
    if (n) throw new TypeError("Generator is already executing.");
    for (; s && ((s = 0), c[0] && (r = 0)), r; )
      try {
        if (
          ((n = 1),
          i &&
            (o =
              c[0] & 2
                ? i.return
                : c[0]
                ? i.throw || ((o = i.return) && o.call(i), 0)
                : i.next) &&
            !(o = o.call(i, c[1])).done)
        )
          return o;
        switch (((i = 0), o && (c = [c[0] & 2, o.value]), c[0])) {
          case 0:
          case 1:
            o = c;
            break;
          case 4:
            return r.label++, { value: c[1], done: !1 };
          case 5:
            r.label++, (i = c[1]), (c = [0]);
            continue;
          case 7:
            (c = r.ops.pop()), r.trys.pop();
            continue;
          default:
            if (
              ((o = r.trys),
              !(o = o.length > 0 && o[o.length - 1]) &&
                (c[0] === 6 || c[0] === 2))
            ) {
              r = 0;
              continue;
            }
            if (c[0] === 3 && (!o || (c[1] > o[0] && c[1] < o[3]))) {
              r.label = c[1];
              break;
            }
            if (c[0] === 6 && r.label < o[1]) {
              (r.label = o[1]), (o = c);
              break;
            }
            if (o && r.label < o[2]) {
              (r.label = o[2]), r.ops.push(c);
              break;
            }
            o[2] && r.ops.pop(), r.trys.pop();
            continue;
        }
        c = t.call(e, r);
      } catch (l) {
        (c = [6, l]), (i = 0);
      } finally {
        n = o = 0;
      }
    if (c[0] & 5) throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}
function wi(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, i = t.length, o; n < i; n++)
      (o || !(n in t)) &&
        (o || (o = Array.prototype.slice.call(t, 0, n)), (o[n] = t[n]));
  return e.concat(o || Array.prototype.slice.call(t));
}
var mo = "Invariant Violation",
  jc = Object.setPrototypeOf,
  Og =
    jc === void 0
      ? function (e, t) {
          return (e.__proto__ = t), e;
        }
      : jc,
  Qe = (function (e) {
    Xe(t, e);
    function t(r) {
      r === void 0 && (r = mo);
      var n =
        e.call(
          this,
          typeof r == "number"
            ? mo +
                ": " +
                r +
                " (see https://github.com/apollographql/invariant-packages)"
            : r
        ) || this;
      return (n.framesToPop = 1), (n.name = mo), Og(n, t.prototype), n;
    }
    return t;
  })(Error);
function le(e, t) {
  if (!e) throw new Qe(t);
}
var Pf = ["debug", "log", "warn", "error", "silent"],
  Tg = Pf.indexOf("log");
function Xn(e) {
  return function () {
    if (Pf.indexOf(e) >= Tg) {
      var t = console[e] || console.log;
      return t.apply(console, arguments);
    }
  };
}
(function (e) {
  (e.debug = Xn("debug")),
    (e.log = Xn("log")),
    (e.warn = Xn("warn")),
    (e.error = Xn("error"));
})(le || (le = {}));
function rt(e) {
  try {
    return e();
  } catch {}
}
const qc =
  rt(function () {
    return globalThis;
  }) ||
  rt(function () {
    return window;
  }) ||
  rt(function () {
    return self;
  }) ||
  rt(function () {
    return global;
  }) ||
  rt(function () {
    return rt.constructor("return this")();
  });
var $c = "__",
  Hc = [$c, $c].join("DEV");
function kg() {
  try {
    return Boolean(!1);
  } catch {
    return (
      Object.defineProperty(qc, Hc, {
        value:
          rt(function () {
            return "production";
          }) !== "production",
        enumerable: !1,
        configurable: !0,
        writable: !0,
      }),
      qc[Hc]
    );
  }
}
const Rg = kg();
function Bt(e) {
  try {
    return e();
  } catch {}
}
var os =
    Bt(function () {
      return globalThis;
    }) ||
    Bt(function () {
      return window;
    }) ||
    Bt(function () {
      return self;
    }) ||
    Bt(function () {
      return global;
    }) ||
    Bt(function () {
      return Bt.constructor("return this")();
    }),
  ss = !1;
function Cg() {
  os &&
    !Bt(function () {
      return "production";
    }) &&
    !Bt(function () {
      return process;
    }) &&
    (Object.defineProperty(os, "process", {
      value: { env: { NODE_ENV: "production" } },
      configurable: !0,
      enumerable: !1,
      writable: !0,
    }),
    (ss = !0));
}
Cg();
function Bc() {
  ss && (delete os.process, (ss = !1));
}
function ni(e, t) {
  if (!Boolean(e)) throw new Error(t);
}
class Ww {
  constructor(t, r, n) {
    (this.start = t.start),
      (this.end = r.end),
      (this.startToken = t),
      (this.endToken = r),
      (this.source = n);
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return { start: this.start, end: this.end };
  }
}
class zw {
  constructor(t, r, n, i, o, s) {
    (this.kind = t),
      (this.start = r),
      (this.end = n),
      (this.line = i),
      (this.column = o),
      (this.value = s),
      (this.prev = null),
      (this.next = null);
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column,
    };
  }
}
const xf = {
    Name: [],
    Document: ["definitions"],
    OperationDefinition: [
      "name",
      "variableDefinitions",
      "directives",
      "selectionSet",
    ],
    VariableDefinition: ["variable", "type", "defaultValue", "directives"],
    Variable: ["name"],
    SelectionSet: ["selections"],
    Field: ["alias", "name", "arguments", "directives", "selectionSet"],
    Argument: ["name", "value"],
    FragmentSpread: ["name", "directives"],
    InlineFragment: ["typeCondition", "directives", "selectionSet"],
    FragmentDefinition: [
      "name",
      "variableDefinitions",
      "typeCondition",
      "directives",
      "selectionSet",
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: ["values"],
    ObjectValue: ["fields"],
    ObjectField: ["name", "value"],
    Directive: ["name", "arguments"],
    NamedType: ["name"],
    ListType: ["type"],
    NonNullType: ["type"],
    SchemaDefinition: ["description", "directives", "operationTypes"],
    OperationTypeDefinition: ["type"],
    ScalarTypeDefinition: ["description", "name", "directives"],
    ObjectTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields",
    ],
    FieldDefinition: ["description", "name", "arguments", "type", "directives"],
    InputValueDefinition: [
      "description",
      "name",
      "type",
      "defaultValue",
      "directives",
    ],
    InterfaceTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields",
    ],
    UnionTypeDefinition: ["description", "name", "directives", "types"],
    EnumTypeDefinition: ["description", "name", "directives", "values"],
    EnumValueDefinition: ["description", "name", "directives"],
    InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
    DirectiveDefinition: ["description", "name", "arguments", "locations"],
    SchemaExtension: ["directives", "operationTypes"],
    ScalarTypeExtension: ["name", "directives"],
    ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
    InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
    UnionTypeExtension: ["name", "directives", "types"],
    EnumTypeExtension: ["name", "directives", "values"],
    InputObjectTypeExtension: ["name", "directives", "fields"],
  },
  Pg = new Set(Object.keys(xf));
function Qc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Pg.has(t);
}
var Uc;
(function (e) {
  (e.QUERY = "query"),
    (e.MUTATION = "mutation"),
    (e.SUBSCRIPTION = "subscription");
})(Uc || (Uc = {}));
var Ae;
(function (e) {
  (e.NAME = "Name"),
    (e.DOCUMENT = "Document"),
    (e.OPERATION_DEFINITION = "OperationDefinition"),
    (e.VARIABLE_DEFINITION = "VariableDefinition"),
    (e.SELECTION_SET = "SelectionSet"),
    (e.FIELD = "Field"),
    (e.ARGUMENT = "Argument"),
    (e.FRAGMENT_SPREAD = "FragmentSpread"),
    (e.INLINE_FRAGMENT = "InlineFragment"),
    (e.FRAGMENT_DEFINITION = "FragmentDefinition"),
    (e.VARIABLE = "Variable"),
    (e.INT = "IntValue"),
    (e.FLOAT = "FloatValue"),
    (e.STRING = "StringValue"),
    (e.BOOLEAN = "BooleanValue"),
    (e.NULL = "NullValue"),
    (e.ENUM = "EnumValue"),
    (e.LIST = "ListValue"),
    (e.OBJECT = "ObjectValue"),
    (e.OBJECT_FIELD = "ObjectField"),
    (e.DIRECTIVE = "Directive"),
    (e.NAMED_TYPE = "NamedType"),
    (e.LIST_TYPE = "ListType"),
    (e.NON_NULL_TYPE = "NonNullType"),
    (e.SCHEMA_DEFINITION = "SchemaDefinition"),
    (e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition"),
    (e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition"),
    (e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition"),
    (e.FIELD_DEFINITION = "FieldDefinition"),
    (e.INPUT_VALUE_DEFINITION = "InputValueDefinition"),
    (e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition"),
    (e.UNION_TYPE_DEFINITION = "UnionTypeDefinition"),
    (e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition"),
    (e.ENUM_VALUE_DEFINITION = "EnumValueDefinition"),
    (e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition"),
    (e.DIRECTIVE_DEFINITION = "DirectiveDefinition"),
    (e.SCHEMA_EXTENSION = "SchemaExtension"),
    (e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension"),
    (e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension"),
    (e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension"),
    (e.UNION_TYPE_EXTENSION = "UnionTypeExtension"),
    (e.ENUM_TYPE_EXTENSION = "EnumTypeExtension"),
    (e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension");
})(Ae || (Ae = {}));
function as(e) {
  return e === 9 || e === 32;
}
function xg(e) {
  return e >= 48 && e <= 57;
}
function If(e) {
  return (e >= 97 && e <= 122) || (e >= 65 && e <= 90);
}
function Kw(e) {
  return If(e) || e === 95;
}
function Jw(e) {
  return If(e) || xg(e) || e === 95;
}
function Gw(e) {
  var t;
  let r = Number.MAX_SAFE_INTEGER,
    n = null,
    i = -1;
  for (let s = 0; s < e.length; ++s) {
    var o;
    const a = e[s],
      u = Ig(a);
    u !== a.length &&
      ((n = (o = n) !== null && o !== void 0 ? o : s),
      (i = s),
      s !== 0 && u < r && (r = u));
  }
  return e
    .map((s, a) => (a === 0 ? s : s.slice(r)))
    .slice((t = n) !== null && t !== void 0 ? t : 0, i + 1);
}
function Ig(e) {
  let t = 0;
  for (; t < e.length && as(e.charCodeAt(t)); ) ++t;
  return t;
}
function Ag(e, t) {
  const r = e.replace(/"""/g, '\\"""'),
    n = r.split(/\r\n|[\n\r]/g),
    i = n.length === 1,
    o =
      n.length > 1 &&
      n.slice(1).every((d) => d.length === 0 || as(d.charCodeAt(0))),
    s = r.endsWith('\\"""'),
    a = e.endsWith('"') && !s,
    u = e.endsWith("\\"),
    c = a || u,
    l = !(t != null && t.minimize) && (!i || e.length > 70 || c || o || s);
  let f = "";
  const h = i && as(e.charCodeAt(0));
  return (
    ((l && !h) || o) &&
      (f += `
`),
    (f += r),
    (l || c) &&
      (f += `
`),
    '"""' + f + '"""'
  );
}
const Fg = 10,
  Af = 2;
function Ff(e) {
  return Qi(e, []);
}
function Qi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Dg(e, t);
    default:
      return String(e);
  }
}
function Dg(e, t) {
  if (e === null) return "null";
  if (t.includes(e)) return "[Circular]";
  const r = [...t, e];
  if (Ng(e)) {
    const n = e.toJSON();
    if (n !== e) return typeof n == "string" ? n : Qi(n, r);
  } else if (Array.isArray(e)) return Lg(e, r);
  return Mg(e, r);
}
function Ng(e) {
  return typeof e.toJSON == "function";
}
function Mg(e, t) {
  const r = Object.entries(e);
  return r.length === 0
    ? "{}"
    : t.length > Af
    ? "[" + jg(e) + "]"
    : "{ " + r.map(([i, o]) => i + ": " + Qi(o, t)).join(", ") + " }";
}
function Lg(e, t) {
  if (e.length === 0) return "[]";
  if (t.length > Af) return "[Array]";
  const r = Math.min(Fg, e.length),
    n = e.length - r,
    i = [];
  for (let o = 0; o < r; ++o) i.push(Qi(e[o], t));
  return (
    n === 1
      ? i.push("... 1 more item")
      : n > 1 && i.push(`... ${n} more items`),
    "[" + i.join(", ") + "]"
  );
}
function jg(e) {
  const t = Object.prototype.toString
    .call(e)
    .replace(/^\[object /, "")
    .replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const r = e.constructor.name;
    if (typeof r == "string" && r !== "") return r;
  }
  return t;
}
const qg = function (t, r) {
  return t instanceof r;
};
class Df {
  constructor(t, r = "GraphQL request", n = { line: 1, column: 1 }) {
    typeof t == "string" ||
      ni(!1, `Body must be a string. Received: ${Ff(t)}.`),
      (this.body = t),
      (this.name = r),
      (this.locationOffset = n),
      this.locationOffset.line > 0 ||
        ni(!1, "line in locationOffset is 1-indexed and must be positive."),
      this.locationOffset.column > 0 ||
        ni(!1, "column in locationOffset is 1-indexed and must be positive.");
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Yw(e) {
  return qg(e, Df);
}
function $g(e) {
  return `"${e.replace(Hg, Bg)}"`;
}
const Hg = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Bg(e) {
  return Qg[e.charCodeAt(0)];
}
const Qg = [
    "\\u0000",
    "\\u0001",
    "\\u0002",
    "\\u0003",
    "\\u0004",
    "\\u0005",
    "\\u0006",
    "\\u0007",
    "\\b",
    "\\t",
    "\\n",
    "\\u000B",
    "\\f",
    "\\r",
    "\\u000E",
    "\\u000F",
    "\\u0010",
    "\\u0011",
    "\\u0012",
    "\\u0013",
    "\\u0014",
    "\\u0015",
    "\\u0016",
    "\\u0017",
    "\\u0018",
    "\\u0019",
    "\\u001A",
    "\\u001B",
    "\\u001C",
    "\\u001D",
    "\\u001E",
    "\\u001F",
    "",
    "",
    '\\"',
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\\\",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\u007F",
    "\\u0080",
    "\\u0081",
    "\\u0082",
    "\\u0083",
    "\\u0084",
    "\\u0085",
    "\\u0086",
    "\\u0087",
    "\\u0088",
    "\\u0089",
    "\\u008A",
    "\\u008B",
    "\\u008C",
    "\\u008D",
    "\\u008E",
    "\\u008F",
    "\\u0090",
    "\\u0091",
    "\\u0092",
    "\\u0093",
    "\\u0094",
    "\\u0095",
    "\\u0096",
    "\\u0097",
    "\\u0098",
    "\\u0099",
    "\\u009A",
    "\\u009B",
    "\\u009C",
    "\\u009D",
    "\\u009E",
    "\\u009F",
  ],
  ia = Object.freeze({});
function Pt(e, t, r = xf) {
  const n = new Map();
  for (const m of Object.values(Ae)) n.set(m, Ug(t, m));
  let i,
    o = Array.isArray(e),
    s = [e],
    a = -1,
    u = [],
    c = e,
    l,
    f;
  const h = [],
    d = [];
  do {
    a++;
    const m = a === s.length,
      p = m && u.length !== 0;
    if (m) {
      if (
        ((l = d.length === 0 ? void 0 : h[h.length - 1]),
        (c = f),
        (f = d.pop()),
        p)
      )
        if (o) {
          c = c.slice();
          let _ = 0;
          for (const [S, k] of u) {
            const T = S - _;
            k === null ? (c.splice(T, 1), _++) : (c[T] = k);
          }
        } else {
          c = Object.defineProperties({}, Object.getOwnPropertyDescriptors(c));
          for (const [_, S] of u) c[_] = S;
        }
      (a = i.index), (s = i.keys), (u = i.edits), (o = i.inArray), (i = i.prev);
    } else if (f) {
      if (((l = o ? a : s[a]), (c = f[l]), c == null)) continue;
      h.push(l);
    }
    let v;
    if (!Array.isArray(c)) {
      var y, b;
      Qc(c) || ni(!1, `Invalid AST Node: ${Ff(c)}.`);
      const _ = m
        ? (y = n.get(c.kind)) === null || y === void 0
          ? void 0
          : y.leave
        : (b = n.get(c.kind)) === null || b === void 0
        ? void 0
        : b.enter;
      if (((v = _ == null ? void 0 : _.call(t, c, l, f, h, d)), v === ia))
        break;
      if (v === !1) {
        if (!m) {
          h.pop();
          continue;
        }
      } else if (v !== void 0 && (u.push([l, v]), !m))
        if (Qc(v)) c = v;
        else {
          h.pop();
          continue;
        }
    }
    if ((v === void 0 && p && u.push([l, c]), m)) h.pop();
    else {
      var w;
      (i = { inArray: o, index: a, keys: s, edits: u, prev: i }),
        (o = Array.isArray(c)),
        (s = o ? c : (w = r[c.kind]) !== null && w !== void 0 ? w : []),
        (a = -1),
        (u = []),
        f && d.push(f),
        (f = c);
    }
  } while (i !== void 0);
  return u.length !== 0 ? u[u.length - 1][1] : e;
}
function Ug(e, t) {
  const r = e[t];
  return typeof r == "object"
    ? r
    : typeof r == "function"
    ? { enter: r, leave: void 0 }
    : { enter: e.enter, leave: e.leave };
}
function Nf(e) {
  return Pt(e, Wg);
}
const Vg = 80,
  Wg = {
    Name: { leave: (e) => e.value },
    Variable: { leave: (e) => "$" + e.name },
    Document: {
      leave: (e) =>
        V(
          e.definitions,
          `

`
        ),
    },
    OperationDefinition: {
      leave(e) {
        const t = se("(", V(e.variableDefinitions, ", "), ")"),
          r = V([e.operation, V([e.name, t]), V(e.directives, " ")], " ");
        return (r === "query" ? "" : r + " ") + e.selectionSet;
      },
    },
    VariableDefinition: {
      leave: ({ variable: e, type: t, defaultValue: r, directives: n }) =>
        e + ": " + t + se(" = ", r) + se(" ", V(n, " ")),
    },
    SelectionSet: { leave: ({ selections: e }) => lt(e) },
    Field: {
      leave({
        alias: e,
        name: t,
        arguments: r,
        directives: n,
        selectionSet: i,
      }) {
        const o = se("", e, ": ") + t;
        let s = o + se("(", V(r, ", "), ")");
        return (
          s.length > Vg &&
            (s =
              o +
              se(
                `(
`,
                ii(
                  V(
                    r,
                    `
`
                  )
                ),
                `
)`
              )),
          V([s, V(n, " "), i], " ")
        );
      },
    },
    Argument: { leave: ({ name: e, value: t }) => e + ": " + t },
    FragmentSpread: {
      leave: ({ name: e, directives: t }) => "..." + e + se(" ", V(t, " ")),
    },
    InlineFragment: {
      leave: ({ typeCondition: e, directives: t, selectionSet: r }) =>
        V(["...", se("on ", e), V(t, " "), r], " "),
    },
    FragmentDefinition: {
      leave: ({
        name: e,
        typeCondition: t,
        variableDefinitions: r,
        directives: n,
        selectionSet: i,
      }) =>
        `fragment ${e}${se("(", V(r, ", "), ")")} on ${t} ${se(
          "",
          V(n, " "),
          " "
        )}` + i,
    },
    IntValue: { leave: ({ value: e }) => e },
    FloatValue: { leave: ({ value: e }) => e },
    StringValue: { leave: ({ value: e, block: t }) => (t ? Ag(e) : $g(e)) },
    BooleanValue: { leave: ({ value: e }) => (e ? "true" : "false") },
    NullValue: { leave: () => "null" },
    EnumValue: { leave: ({ value: e }) => e },
    ListValue: { leave: ({ values: e }) => "[" + V(e, ", ") + "]" },
    ObjectValue: { leave: ({ fields: e }) => "{" + V(e, ", ") + "}" },
    ObjectField: { leave: ({ name: e, value: t }) => e + ": " + t },
    Directive: {
      leave: ({ name: e, arguments: t }) => "@" + e + se("(", V(t, ", "), ")"),
    },
    NamedType: { leave: ({ name: e }) => e },
    ListType: { leave: ({ type: e }) => "[" + e + "]" },
    NonNullType: { leave: ({ type: e }) => e + "!" },
    SchemaDefinition: {
      leave: ({ description: e, directives: t, operationTypes: r }) =>
        se(
          "",
          e,
          `
`
        ) + V(["schema", V(t, " "), lt(r)], " "),
    },
    OperationTypeDefinition: {
      leave: ({ operation: e, type: t }) => e + ": " + t,
    },
    ScalarTypeDefinition: {
      leave: ({ description: e, name: t, directives: r }) =>
        se(
          "",
          e,
          `
`
        ) + V(["scalar", t, V(r, " ")], " "),
    },
    ObjectTypeDefinition: {
      leave: ({
        description: e,
        name: t,
        interfaces: r,
        directives: n,
        fields: i,
      }) =>
        se(
          "",
          e,
          `
`
        ) +
        V(["type", t, se("implements ", V(r, " & ")), V(n, " "), lt(i)], " "),
    },
    FieldDefinition: {
      leave: ({
        description: e,
        name: t,
        arguments: r,
        type: n,
        directives: i,
      }) =>
        se(
          "",
          e,
          `
`
        ) +
        t +
        (Vc(r)
          ? se(
              `(
`,
              ii(
                V(
                  r,
                  `
`
                )
              ),
              `
)`
            )
          : se("(", V(r, ", "), ")")) +
        ": " +
        n +
        se(" ", V(i, " ")),
    },
    InputValueDefinition: {
      leave: ({
        description: e,
        name: t,
        type: r,
        defaultValue: n,
        directives: i,
      }) =>
        se(
          "",
          e,
          `
`
        ) + V([t + ": " + r, se("= ", n), V(i, " ")], " "),
    },
    InterfaceTypeDefinition: {
      leave: ({
        description: e,
        name: t,
        interfaces: r,
        directives: n,
        fields: i,
      }) =>
        se(
          "",
          e,
          `
`
        ) +
        V(
          ["interface", t, se("implements ", V(r, " & ")), V(n, " "), lt(i)],
          " "
        ),
    },
    UnionTypeDefinition: {
      leave: ({ description: e, name: t, directives: r, types: n }) =>
        se(
          "",
          e,
          `
`
        ) + V(["union", t, V(r, " "), se("= ", V(n, " | "))], " "),
    },
    EnumTypeDefinition: {
      leave: ({ description: e, name: t, directives: r, values: n }) =>
        se(
          "",
          e,
          `
`
        ) + V(["enum", t, V(r, " "), lt(n)], " "),
    },
    EnumValueDefinition: {
      leave: ({ description: e, name: t, directives: r }) =>
        se(
          "",
          e,
          `
`
        ) + V([t, V(r, " ")], " "),
    },
    InputObjectTypeDefinition: {
      leave: ({ description: e, name: t, directives: r, fields: n }) =>
        se(
          "",
          e,
          `
`
        ) + V(["input", t, V(r, " "), lt(n)], " "),
    },
    DirectiveDefinition: {
      leave: ({
        description: e,
        name: t,
        arguments: r,
        repeatable: n,
        locations: i,
      }) =>
        se(
          "",
          e,
          `
`
        ) +
        "directive @" +
        t +
        (Vc(r)
          ? se(
              `(
`,
              ii(
                V(
                  r,
                  `
`
                )
              ),
              `
)`
            )
          : se("(", V(r, ", "), ")")) +
        (n ? " repeatable" : "") +
        " on " +
        V(i, " | "),
    },
    SchemaExtension: {
      leave: ({ directives: e, operationTypes: t }) =>
        V(["extend schema", V(e, " "), lt(t)], " "),
    },
    ScalarTypeExtension: {
      leave: ({ name: e, directives: t }) =>
        V(["extend scalar", e, V(t, " ")], " "),
    },
    ObjectTypeExtension: {
      leave: ({ name: e, interfaces: t, directives: r, fields: n }) =>
        V(
          ["extend type", e, se("implements ", V(t, " & ")), V(r, " "), lt(n)],
          " "
        ),
    },
    InterfaceTypeExtension: {
      leave: ({ name: e, interfaces: t, directives: r, fields: n }) =>
        V(
          [
            "extend interface",
            e,
            se("implements ", V(t, " & ")),
            V(r, " "),
            lt(n),
          ],
          " "
        ),
    },
    UnionTypeExtension: {
      leave: ({ name: e, directives: t, types: r }) =>
        V(["extend union", e, V(t, " "), se("= ", V(r, " | "))], " "),
    },
    EnumTypeExtension: {
      leave: ({ name: e, directives: t, values: r }) =>
        V(["extend enum", e, V(t, " "), lt(r)], " "),
    },
    InputObjectTypeExtension: {
      leave: ({ name: e, directives: t, fields: r }) =>
        V(["extend input", e, V(t, " "), lt(r)], " "),
    },
  };
function V(e, t = "") {
  var r;
  return (r = e == null ? void 0 : e.filter((n) => n).join(t)) !== null &&
    r !== void 0
    ? r
    : "";
}
function lt(e) {
  return se(
    `{
`,
    ii(
      V(
        e,
        `
`
      )
    ),
    `
}`
  );
}
function se(e, t, r = "") {
  return t != null && t !== "" ? e + t + r : "";
}
function ii(e) {
  return se(
    "  ",
    e.replace(
      /\n/g,
      `
  `
    )
  );
}
function Vc(e) {
  var t;
  return (t =
    e == null
      ? void 0
      : e.some((r) =>
          r.includes(`
`)
        )) !== null && t !== void 0
    ? t
    : !1;
}
function Wc(e) {
  return (
    e.kind === Ae.FIELD ||
    e.kind === Ae.FRAGMENT_SPREAD ||
    e.kind === Ae.INLINE_FRAGMENT
  );
}
function zg() {
  return Bc();
}
function Kg() {
  le(typeof Rg == "boolean", 39);
}
zg();
Kg();
function Ui(e, t) {
  var r = e.directives;
  return !r || !r.length
    ? !0
    : Yg(r).every(function (n) {
        var i = n.directive,
          o = n.ifArgument,
          s = !1;
        return (
          o.value.kind === "Variable"
            ? ((s = t && t[o.value.name.value]), le(s !== void 0, 40))
            : (s = o.value.value),
          i.name.value === "skip" ? !s : s
        );
      });
}
function oa(e, t, r) {
  var n = new Set(e),
    i = n.size;
  return (
    Pt(t, {
      Directive: function (o) {
        if (n.delete(o.name.value) && (!r || !n.size)) return ia;
      },
    }),
    r ? !n.size : n.size < i
  );
}
function Jg(e) {
  return e && oa(["client", "export"], e, !0);
}
function Gg(e) {
  var t = e.name.value;
  return t === "skip" || t === "include";
}
function Yg(e) {
  var t = [];
  return (
    e &&
      e.length &&
      e.forEach(function (r) {
        if (Gg(r)) {
          var n = r.arguments;
          r.name.value, le(n && n.length === 1, 41);
          var i = n[0];
          le(i.name && i.name.value === "if", 42);
          var o = i.value;
          le(o && (o.kind === "Variable" || o.kind === "BooleanValue"), 43),
            t.push({ directive: r, ifArgument: i });
        }
      }),
    t
  );
}
function Xg(e, t) {
  var r = t,
    n = [];
  e.definitions.forEach(function (o) {
    if (o.kind === "OperationDefinition") throw new Qe(44);
    o.kind === "FragmentDefinition" && n.push(o);
  }),
    typeof r > "u" && (le(n.length === 1, 45), (r = n[0].name.value));
  var i = R(R({}, e), {
    definitions: wi(
      [
        {
          kind: "OperationDefinition",
          operation: "query",
          selectionSet: {
            kind: "SelectionSet",
            selections: [
              { kind: "FragmentSpread", name: { kind: "Name", value: r } },
            ],
          },
        },
      ],
      e.definitions,
      !0
    ),
  });
  return i;
}
function sa(e) {
  e === void 0 && (e = []);
  var t = {};
  return (
    e.forEach(function (r) {
      t[r.name.value] = r;
    }),
    t
  );
}
function aa(e, t) {
  switch (e.kind) {
    case "InlineFragment":
      return e;
    case "FragmentSpread": {
      var r = e.name.value;
      if (typeof t == "function") return t(r);
      var n = t && t[r];
      return le(n, 46), n || null;
    }
    default:
      return null;
  }
}
function Pe(e) {
  return e !== null && typeof e == "object";
}
function Lr(e) {
  return { __ref: String(e) };
}
function me(e) {
  return Boolean(e && typeof e == "object" && typeof e.__ref == "string");
}
function Zg(e) {
  return Pe(e) && e.kind === "Document" && Array.isArray(e.definitions);
}
function eb(e) {
  return e.kind === "StringValue";
}
function tb(e) {
  return e.kind === "BooleanValue";
}
function rb(e) {
  return e.kind === "IntValue";
}
function nb(e) {
  return e.kind === "FloatValue";
}
function ib(e) {
  return e.kind === "Variable";
}
function ob(e) {
  return e.kind === "ObjectValue";
}
function sb(e) {
  return e.kind === "ListValue";
}
function ab(e) {
  return e.kind === "EnumValue";
}
function cb(e) {
  return e.kind === "NullValue";
}
function Wr(e, t, r, n) {
  if (rb(r) || nb(r)) e[t.value] = Number(r.value);
  else if (tb(r) || eb(r)) e[t.value] = r.value;
  else if (ob(r)) {
    var i = {};
    r.fields.map(function (s) {
      return Wr(i, s.name, s.value, n);
    }),
      (e[t.value] = i);
  } else if (ib(r)) {
    var o = (n || {})[r.name.value];
    e[t.value] = o;
  } else if (sb(r))
    e[t.value] = r.values.map(function (s) {
      var a = {};
      return Wr(a, t, s, n), a[t.value];
    });
  else if (ab(r)) e[t.value] = r.value;
  else if (cb(r)) e[t.value] = null;
  else throw new Qe(55);
}
function ub(e, t) {
  var r = null;
  e.directives &&
    ((r = {}),
    e.directives.forEach(function (i) {
      (r[i.name.value] = {}),
        i.arguments &&
          i.arguments.forEach(function (o) {
            var s = o.name,
              a = o.value;
            return Wr(r[i.name.value], s, a, t);
          });
    }));
  var n = null;
  return (
    e.arguments &&
      e.arguments.length &&
      ((n = {}),
      e.arguments.forEach(function (i) {
        var o = i.name,
          s = i.value;
        return Wr(n, o, s, t);
      })),
    ca(e.name.value, n, r)
  );
}
var lb = ["connection", "include", "skip", "client", "rest", "export"],
  ca = Object.assign(
    function (e, t, r) {
      if (t && r && r.connection && r.connection.key)
        if (r.connection.filter && r.connection.filter.length > 0) {
          var n = r.connection.filter ? r.connection.filter : [];
          n.sort();
          var i = {};
          return (
            n.forEach(function (a) {
              i[a] = t[a];
            }),
            "".concat(r.connection.key, "(").concat(nn(i), ")")
          );
        } else return r.connection.key;
      var o = e;
      if (t) {
        var s = nn(t);
        o += "(".concat(s, ")");
      }
      return (
        r &&
          Object.keys(r).forEach(function (a) {
            lb.indexOf(a) === -1 &&
              (r[a] && Object.keys(r[a]).length
                ? (o += "@".concat(a, "(").concat(nn(r[a]), ")"))
                : (o += "@".concat(a)));
          }),
        o
      );
    },
    {
      setStringify: function (e) {
        var t = nn;
        return (nn = e), t;
      },
    }
  ),
  nn = function (t) {
    return JSON.stringify(t, fb);
  };
function fb(e, t) {
  return (
    Pe(t) &&
      !Array.isArray(t) &&
      (t = Object.keys(t)
        .sort()
        .reduce(function (r, n) {
          return (r[n] = t[n]), r;
        }, {})),
    t
  );
}
function Vi(e, t) {
  if (e.arguments && e.arguments.length) {
    var r = {};
    return (
      e.arguments.forEach(function (n) {
        var i = n.name,
          o = n.value;
        return Wr(r, i, o, t);
      }),
      r
    );
  }
  return null;
}
function zr(e) {
  return e.alias ? e.alias.value : e.name.value;
}
function cs(e, t, r) {
  if (typeof e.__typename == "string") return e.__typename;
  for (var n = 0, i = t.selections; n < i.length; n++) {
    var o = i[n];
    if (pr(o)) {
      if (o.name.value === "__typename") return e[zr(o)];
    } else {
      var s = cs(e, aa(o, r).selectionSet, r);
      if (typeof s == "string") return s;
    }
  }
}
function pr(e) {
  return e.kind === "Field";
}
function hb(e) {
  return e.kind === "InlineFragment";
}
function Wi(e) {
  le(e && e.kind === "Document", 47);
  var t = e.definitions
    .filter(function (r) {
      return r.kind !== "FragmentDefinition";
    })
    .map(function (r) {
      if (r.kind !== "OperationDefinition") throw new Qe(48);
      return r;
    });
  return le(t.length <= 1, 49), e;
}
function jn(e) {
  return (
    Wi(e),
    e.definitions.filter(function (t) {
      return t.kind === "OperationDefinition";
    })[0]
  );
}
function us(e) {
  return (
    e.definitions
      .filter(function (t) {
        return t.kind === "OperationDefinition" && t.name;
      })
      .map(function (t) {
        return t.name.value;
      })[0] || null
  );
}
function ua(e) {
  return e.definitions.filter(function (t) {
    return t.kind === "FragmentDefinition";
  });
}
function db(e) {
  var t = jn(e);
  return le(t && t.operation === "query", 50), t;
}
function pb(e) {
  le(e.kind === "Document", 51), le(e.definitions.length <= 1, 52);
  var t = e.definitions[0];
  return le(t.kind === "FragmentDefinition", 53), t;
}
function zi(e) {
  Wi(e);
  for (var t, r = 0, n = e.definitions; r < n.length; r++) {
    var i = n[r];
    if (i.kind === "OperationDefinition") {
      var o = i.operation;
      if (o === "query" || o === "mutation" || o === "subscription") return i;
    }
    i.kind === "FragmentDefinition" && !t && (t = i);
  }
  if (t) return t;
  throw new Qe(54);
}
function la(e) {
  var t = Object.create(null),
    r = e && e.variableDefinitions;
  return (
    r &&
      r.length &&
      r.forEach(function (n) {
        n.defaultValue && Wr(t, n.variable.name, n.defaultValue);
      }),
    t
  );
}
var xe = Array.isArray;
function st(e) {
  return Array.isArray(e) && e.length > 0;
}
var zc = { kind: Ae.FIELD, name: { kind: Ae.NAME, value: "__typename" } };
function Mf(e, t) {
  return (
    !e ||
    e.selectionSet.selections.every(function (r) {
      return r.kind === Ae.FRAGMENT_SPREAD && Mf(t[r.name.value], t);
    })
  );
}
function yb(e) {
  return Mf(jn(e) || pb(e), sa(ua(e))) ? null : e;
}
function vb(e) {
  var t = new Set(),
    r = [];
  return (
    e.forEach(function (n) {
      n.name ? t.add(n.name) : n.test && r.push(n.test);
    }),
    function (n) {
      return (
        t.has(n.name.value) ||
        r.some(function (i) {
          return i(n);
        })
      );
    }
  );
}
function Kc(e) {
  var t = new Map();
  return function (n) {
    n === void 0 && (n = e);
    var i = t.get(n);
    return (
      i || t.set(n, (i = { variables: new Set(), fragmentSpreads: new Set() })),
      i
    );
  };
}
function Lf(e, t) {
  for (
    var r = Kc(""),
      n = Kc(""),
      i = function (p) {
        for (var v = 0, _ = void 0; v < p.length && (_ = p[v]); ++v)
          if (!xe(_)) {
            if (_.kind === Ae.OPERATION_DEFINITION)
              return r(_.name && _.name.value);
            if (_.kind === Ae.FRAGMENT_DEFINITION) return n(_.name.value);
          }
        return null;
      },
      o = 0,
      s = t.definitions.length - 1;
    s >= 0;
    --s
  )
    t.definitions[s].kind === Ae.OPERATION_DEFINITION && ++o;
  var a = vb(e),
    u = e.some(function (p) {
      return p.remove;
    }),
    c = function (p) {
      return u && p && p.some(a);
    },
    l = new Map(),
    f = !1,
    h = {
      enter: function (p) {
        if (c(p.directives)) return (f = !0), null;
      },
    },
    d = Pt(t, {
      Field: h,
      InlineFragment: h,
      VariableDefinition: {
        enter: function () {
          return !1;
        },
      },
      Variable: {
        enter: function (p, v, _, S, k) {
          var T = i(k);
          T && T.variables.add(p.name.value);
        },
      },
      FragmentSpread: {
        enter: function (p, v, _, S, k) {
          if (c(p.directives)) return (f = !0), null;
          var T = i(k);
          T && T.fragmentSpreads.add(p.name.value);
        },
      },
      FragmentDefinition: {
        enter: function (p, v, _, S) {
          l.set(JSON.stringify(S), p);
        },
        leave: function (p, v, _, S) {
          var k = l.get(JSON.stringify(S));
          if (p === k) return p;
          if (
            o > 0 &&
            p.selectionSet.selections.every(function (T) {
              return T.kind === Ae.FIELD && T.name.value === "__typename";
            })
          )
            return (n(p.name.value).removed = !0), (f = !0), null;
        },
      },
      Directive: {
        leave: function (p) {
          if (a(p)) return (f = !0), null;
        },
      },
    });
  if (!f) return t;
  var y = function (p) {
      return (
        p.transitiveVars ||
          ((p.transitiveVars = new Set(p.variables)),
          p.removed ||
            p.fragmentSpreads.forEach(function (v) {
              y(n(v)).transitiveVars.forEach(function (_) {
                p.transitiveVars.add(_);
              });
            })),
        p
      );
    },
    b = new Set();
  d.definitions.forEach(function (p) {
    p.kind === Ae.OPERATION_DEFINITION
      ? y(r(p.name && p.name.value)).fragmentSpreads.forEach(function (v) {
          b.add(v);
        })
      : p.kind === Ae.FRAGMENT_DEFINITION &&
        o === 0 &&
        !n(p.name.value).removed &&
        b.add(p.name.value);
  }),
    b.forEach(function (p) {
      y(n(p)).fragmentSpreads.forEach(function (v) {
        b.add(v);
      });
    });
  var w = function (p) {
      return !!(!b.has(p) || n(p).removed);
    },
    m = {
      enter: function (p) {
        if (w(p.name.value)) return null;
      },
    };
  return yb(
    Pt(d, {
      FragmentSpread: m,
      FragmentDefinition: m,
      OperationDefinition: {
        leave: function (p) {
          if (p.variableDefinitions) {
            var v = y(r(p.name && p.name.value)).transitiveVars;
            if (v.size < p.variableDefinitions.length)
              return R(R({}, p), {
                variableDefinitions: p.variableDefinitions.filter(function (_) {
                  return v.has(_.variable.name.value);
                }),
              });
          }
        },
      },
    })
  );
}
var jf = Object.assign(
    function (e) {
      return Pt(e, {
        SelectionSet: {
          enter: function (t, r, n) {
            if (!(n && n.kind === Ae.OPERATION_DEFINITION)) {
              var i = t.selections;
              if (i) {
                var o = i.some(function (a) {
                  return (
                    pr(a) &&
                    (a.name.value === "__typename" ||
                      a.name.value.lastIndexOf("__", 0) === 0)
                  );
                });
                if (!o) {
                  var s = n;
                  if (
                    !(
                      pr(s) &&
                      s.directives &&
                      s.directives.some(function (a) {
                        return a.name.value === "export";
                      })
                    )
                  )
                    return R(R({}, t), {
                      selections: wi(wi([], i, !0), [zc], !1),
                    });
                }
              }
            }
          },
        },
      });
    },
    {
      added: function (e) {
        return e === zc;
      },
    }
  ),
  mb = {
    test: function (e) {
      var t = e.name.value === "connection";
      return (
        t &&
          (!e.arguments ||
            e.arguments.some(function (r) {
              return r.name.value === "key";
            })),
        t
      );
    },
  };
function gb(e) {
  return Lf([mb], Wi(e));
}
function bb(e) {
  var t = zi(e),
    r = t.operation;
  if (r === "query") return e;
  var n = Pt(e, {
    OperationDefinition: {
      enter: function (i) {
        return R(R({}, i), { operation: "query" });
      },
    },
  });
  return n;
}
function wb(e) {
  Wi(e);
  var t = Lf(
    [
      {
        test: function (r) {
          return r.name.value === "client";
        },
        remove: !0,
      },
    ],
    e
  );
  return t;
}
var _b = Object.prototype.hasOwnProperty;
function Jc() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return fa(e);
}
function fa(e) {
  var t = e[0] || {},
    r = e.length;
  if (r > 1) for (var n = new Gt(), i = 1; i < r; ++i) t = n.merge(t, e[i]);
  return t;
}
var Eb = function (e, t, r) {
    return this.merge(e[r], t[r]);
  },
  Gt = (function () {
    function e(t) {
      t === void 0 && (t = Eb),
        (this.reconciler = t),
        (this.isObject = Pe),
        (this.pastCopies = new Set());
    }
    return (
      (e.prototype.merge = function (t, r) {
        for (var n = this, i = [], o = 2; o < arguments.length; o++)
          i[o - 2] = arguments[o];
        return Pe(r) && Pe(t)
          ? (Object.keys(r).forEach(function (s) {
              if (_b.call(t, s)) {
                var a = t[s];
                if (r[s] !== a) {
                  var u = n.reconciler.apply(n, wi([t, r, s], i, !1));
                  u !== a && ((t = n.shallowCopyForMerge(t)), (t[s] = u));
                }
              } else (t = n.shallowCopyForMerge(t)), (t[s] = r[s]);
            }),
            t)
          : r;
      }),
      (e.prototype.shallowCopyForMerge = function (t) {
        return (
          Pe(t) &&
            (this.pastCopies.has(t) ||
              (Array.isArray(t)
                ? (t = t.slice(0))
                : (t = R({ __proto__: Object.getPrototypeOf(t) }, t)),
              this.pastCopies.add(t))),
          t
        );
      }),
      e
    );
  })();
function Sb(e, t) {
  var r = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r) return (r = r.call(e)).next.bind(r);
  if (
    Array.isArray(e) ||
    (r = Ob(e)) ||
    (t && e && typeof e.length == "number")
  ) {
    r && (e = r);
    var n = 0;
    return function () {
      return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ob(e, t) {
  if (e) {
    if (typeof e == "string") return Gc(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Gc(e, t);
  }
}
function Gc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Yc(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function ha(e, t, r) {
  return (
    t && Yc(e.prototype, t),
    r && Yc(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
var da = function () {
    return typeof Symbol == "function";
  },
  pa = function (e) {
    return da() && Boolean(Symbol[e]);
  },
  ya = function (e) {
    return pa(e) ? Symbol[e] : "@@" + e;
  };
da() && !pa("observable") && (Symbol.observable = Symbol("observable"));
var Tb = ya("iterator"),
  ls = ya("observable"),
  qf = ya("species");
function _i(e, t) {
  var r = e[t];
  if (r != null) {
    if (typeof r != "function") throw new TypeError(r + " is not a function");
    return r;
  }
}
function on(e) {
  var t = e.constructor;
  return (
    t !== void 0 && ((t = t[qf]), t === null && (t = void 0)),
    t !== void 0 ? t : pe
  );
}
function kb(e) {
  return e instanceof pe;
}
function Kr(e) {
  Kr.log
    ? Kr.log(e)
    : setTimeout(function () {
        throw e;
      });
}
function oi(e) {
  Promise.resolve().then(function () {
    try {
      e();
    } catch (t) {
      Kr(t);
    }
  });
}
function $f(e) {
  var t = e._cleanup;
  if (t !== void 0 && ((e._cleanup = void 0), !!t))
    try {
      if (typeof t == "function") t();
      else {
        var r = _i(t, "unsubscribe");
        r && r.call(t);
      }
    } catch (n) {
      Kr(n);
    }
}
function fs(e) {
  (e._observer = void 0), (e._queue = void 0), (e._state = "closed");
}
function Rb(e) {
  var t = e._queue;
  if (t) {
    (e._queue = void 0), (e._state = "ready");
    for (
      var r = 0;
      r < t.length && (Hf(e, t[r].type, t[r].value), e._state !== "closed");
      ++r
    );
  }
}
function Hf(e, t, r) {
  e._state = "running";
  var n = e._observer;
  try {
    var i = _i(n, t);
    switch (t) {
      case "next":
        i && i.call(n, r);
        break;
      case "error":
        if ((fs(e), i)) i.call(n, r);
        else throw r;
        break;
      case "complete":
        fs(e), i && i.call(n);
        break;
    }
  } catch (o) {
    Kr(o);
  }
  e._state === "closed"
    ? $f(e)
    : e._state === "running" && (e._state = "ready");
}
function go(e, t, r) {
  if (e._state !== "closed") {
    if (e._state === "buffering") {
      e._queue.push({ type: t, value: r });
      return;
    }
    if (e._state !== "ready") {
      (e._state = "buffering"),
        (e._queue = [{ type: t, value: r }]),
        oi(function () {
          return Rb(e);
        });
      return;
    }
    Hf(e, t, r);
  }
}
var Cb = (function () {
    function e(r, n) {
      (this._cleanup = void 0),
        (this._observer = r),
        (this._queue = void 0),
        (this._state = "initializing");
      var i = new Pb(this);
      try {
        this._cleanup = n.call(void 0, i);
      } catch (o) {
        i.error(o);
      }
      this._state === "initializing" && (this._state = "ready");
    }
    var t = e.prototype;
    return (
      (t.unsubscribe = function () {
        this._state !== "closed" && (fs(this), $f(this));
      }),
      ha(e, [
        {
          key: "closed",
          get: function () {
            return this._state === "closed";
          },
        },
      ]),
      e
    );
  })(),
  Pb = (function () {
    function e(r) {
      this._subscription = r;
    }
    var t = e.prototype;
    return (
      (t.next = function (n) {
        go(this._subscription, "next", n);
      }),
      (t.error = function (n) {
        go(this._subscription, "error", n);
      }),
      (t.complete = function () {
        go(this._subscription, "complete");
      }),
      ha(e, [
        {
          key: "closed",
          get: function () {
            return this._subscription._state === "closed";
          },
        },
      ]),
      e
    );
  })(),
  pe = (function () {
    function e(r) {
      if (!(this instanceof e))
        throw new TypeError("Observable cannot be called as a function");
      if (typeof r != "function")
        throw new TypeError("Observable initializer must be a function");
      this._subscriber = r;
    }
    var t = e.prototype;
    return (
      (t.subscribe = function (n) {
        return (
          (typeof n != "object" || n === null) &&
            (n = { next: n, error: arguments[1], complete: arguments[2] }),
          new Cb(n, this._subscriber)
        );
      }),
      (t.forEach = function (n) {
        var i = this;
        return new Promise(function (o, s) {
          if (typeof n != "function") {
            s(new TypeError(n + " is not a function"));
            return;
          }
          function a() {
            u.unsubscribe(), o();
          }
          var u = i.subscribe({
            next: function (c) {
              try {
                n(c, a);
              } catch (l) {
                s(l), u.unsubscribe();
              }
            },
            error: s,
            complete: o,
          });
        });
      }),
      (t.map = function (n) {
        var i = this;
        if (typeof n != "function")
          throw new TypeError(n + " is not a function");
        var o = on(this);
        return new o(function (s) {
          return i.subscribe({
            next: function (a) {
              try {
                a = n(a);
              } catch (u) {
                return s.error(u);
              }
              s.next(a);
            },
            error: function (a) {
              s.error(a);
            },
            complete: function () {
              s.complete();
            },
          });
        });
      }),
      (t.filter = function (n) {
        var i = this;
        if (typeof n != "function")
          throw new TypeError(n + " is not a function");
        var o = on(this);
        return new o(function (s) {
          return i.subscribe({
            next: function (a) {
              try {
                if (!n(a)) return;
              } catch (u) {
                return s.error(u);
              }
              s.next(a);
            },
            error: function (a) {
              s.error(a);
            },
            complete: function () {
              s.complete();
            },
          });
        });
      }),
      (t.reduce = function (n) {
        var i = this;
        if (typeof n != "function")
          throw new TypeError(n + " is not a function");
        var o = on(this),
          s = arguments.length > 1,
          a = !1,
          u = arguments[1],
          c = u;
        return new o(function (l) {
          return i.subscribe({
            next: function (f) {
              var h = !a;
              if (((a = !0), !h || s))
                try {
                  c = n(c, f);
                } catch (d) {
                  return l.error(d);
                }
              else c = f;
            },
            error: function (f) {
              l.error(f);
            },
            complete: function () {
              if (!a && !s)
                return l.error(
                  new TypeError("Cannot reduce an empty sequence")
                );
              l.next(c), l.complete();
            },
          });
        });
      }),
      (t.concat = function () {
        for (
          var n = this, i = arguments.length, o = new Array(i), s = 0;
          s < i;
          s++
        )
          o[s] = arguments[s];
        var a = on(this);
        return new a(function (u) {
          var c,
            l = 0;
          function f(h) {
            c = h.subscribe({
              next: function (d) {
                u.next(d);
              },
              error: function (d) {
                u.error(d);
              },
              complete: function () {
                l === o.length
                  ? ((c = void 0), u.complete())
                  : f(a.from(o[l++]));
              },
            });
          }
          return (
            f(n),
            function () {
              c && (c.unsubscribe(), (c = void 0));
            }
          );
        });
      }),
      (t.flatMap = function (n) {
        var i = this;
        if (typeof n != "function")
          throw new TypeError(n + " is not a function");
        var o = on(this);
        return new o(function (s) {
          var a = [],
            u = i.subscribe({
              next: function (l) {
                if (n)
                  try {
                    l = n(l);
                  } catch (h) {
                    return s.error(h);
                  }
                var f = o.from(l).subscribe({
                  next: function (h) {
                    s.next(h);
                  },
                  error: function (h) {
                    s.error(h);
                  },
                  complete: function () {
                    var h = a.indexOf(f);
                    h >= 0 && a.splice(h, 1), c();
                  },
                });
                a.push(f);
              },
              error: function (l) {
                s.error(l);
              },
              complete: function () {
                c();
              },
            });
          function c() {
            u.closed && a.length === 0 && s.complete();
          }
          return function () {
            a.forEach(function (l) {
              return l.unsubscribe();
            }),
              u.unsubscribe();
          };
        });
      }),
      (t[ls] = function () {
        return this;
      }),
      (e.from = function (n) {
        var i = typeof this == "function" ? this : e;
        if (n == null) throw new TypeError(n + " is not an object");
        var o = _i(n, ls);
        if (o) {
          var s = o.call(n);
          if (Object(s) !== s) throw new TypeError(s + " is not an object");
          return kb(s) && s.constructor === i
            ? s
            : new i(function (a) {
                return s.subscribe(a);
              });
        }
        if (pa("iterator") && ((o = _i(n, Tb)), o))
          return new i(function (a) {
            oi(function () {
              if (!a.closed) {
                for (var u = Sb(o.call(n)), c; !(c = u()).done; ) {
                  var l = c.value;
                  if ((a.next(l), a.closed)) return;
                }
                a.complete();
              }
            });
          });
        if (Array.isArray(n))
          return new i(function (a) {
            oi(function () {
              if (!a.closed) {
                for (var u = 0; u < n.length; ++u)
                  if ((a.next(n[u]), a.closed)) return;
                a.complete();
              }
            });
          });
        throw new TypeError(n + " is not observable");
      }),
      (e.of = function () {
        for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++)
          i[o] = arguments[o];
        var s = typeof this == "function" ? this : e;
        return new s(function (a) {
          oi(function () {
            if (!a.closed) {
              for (var u = 0; u < i.length; ++u)
                if ((a.next(i[u]), a.closed)) return;
              a.complete();
            }
          });
        });
      }),
      ha(e, null, [
        {
          key: qf,
          get: function () {
            return this;
          },
        },
      ]),
      e
    );
  })();
da() &&
  Object.defineProperty(pe, Symbol("extensions"), {
    value: { symbol: ls, hostReportError: Kr },
    configurable: !0,
  });
function xb(e) {
  var t,
    r = e.Symbol;
  if (typeof r == "function")
    if (r.observable) t = r.observable;
    else {
      typeof r.for == "function"
        ? (t = r.for("https://github.com/benlesh/symbol-observable"))
        : (t = r("https://github.com/benlesh/symbol-observable"));
      try {
        r.observable = t;
      } catch {}
    }
  else t = "@@observable";
  return t;
}
var Or;
typeof self < "u"
  ? (Or = self)
  : typeof window < "u"
  ? (Or = window)
  : typeof global < "u"
  ? (Or = global)
  : typeof module < "u"
  ? (Or = module)
  : (Or = Function("return this")());
xb(Or);
var Xc = pe.prototype,
  Zc = "@@observable";
Xc[Zc] ||
  (Xc[Zc] = function () {
    return this;
  });
var Ib = Object.prototype.toString;
function Ab(e) {
  return hs(e);
}
function hs(e, t) {
  switch (Ib.call(e)) {
    case "[object Array]": {
      if (((t = t || new Map()), t.has(e))) return t.get(e);
      var r = e.slice(0);
      return (
        t.set(e, r),
        r.forEach(function (i, o) {
          r[o] = hs(i, t);
        }),
        r
      );
    }
    case "[object Object]": {
      if (((t = t || new Map()), t.has(e))) return t.get(e);
      var n = Object.create(Object.getPrototypeOf(e));
      return (
        t.set(e, n),
        Object.keys(e).forEach(function (i) {
          n[i] = hs(e[i], t);
        }),
        n
      );
    }
    default:
      return e;
  }
}
function wn(e, t, r) {
  var n = [];
  e.forEach(function (i) {
    return i[t] && n.push(i);
  }),
    n.forEach(function (i) {
      return i[t](r);
    });
}
function bo(e, t, r) {
  return new pe(function (n) {
    var i = n.next,
      o = n.error,
      s = n.complete,
      a = 0,
      u = !1,
      c = {
        then: function (d) {
          return new Promise(function (y) {
            return y(d());
          });
        },
      };
    function l(d, y) {
      return d
        ? function (b) {
            ++a;
            var w = function () {
              return d(b);
            };
            c = c
              .then(w, w)
              .then(
                function (m) {
                  --a, i && i.call(n, m), u && f.complete();
                },
                function (m) {
                  throw (--a, m);
                }
              )
              .catch(function (m) {
                o && o.call(n, m);
              });
          }
        : function (b) {
            return y && y.call(n, b);
          };
    }
    var f = {
        next: l(t, i),
        error: l(r, o),
        complete: function () {
          (u = !0), a || (s && s.call(n));
        },
      },
      h = e.subscribe(f);
    return function () {
      return h.unsubscribe();
    };
  });
}
var gr =
    typeof WeakMap == "function" &&
    rt(function () {
      return navigator.product;
    }) !== "ReactNative",
  Fb = typeof WeakSet == "function",
  Bf = typeof Symbol == "function" && typeof Symbol.for == "function",
  Ki = Bf && Symbol.asyncIterator;
rt(function () {
  return window.document.createElement;
});
rt(function () {
  return navigator.userAgent.indexOf("jsdom") >= 0;
});
function Qf(e) {
  function t(r) {
    Object.defineProperty(e, r, { value: pe });
  }
  return Bf && Symbol.species && t(Symbol.species), t("@@species"), e;
}
function eu(e) {
  return e && typeof e.then == "function";
}
var fn = (function (e) {
  Xe(t, e);
  function t(r) {
    var n =
      e.call(this, function (i) {
        return (
          n.addObserver(i),
          function () {
            return n.removeObserver(i);
          }
        );
      }) || this;
    return (
      (n.observers = new Set()),
      (n.promise = new Promise(function (i, o) {
        (n.resolve = i), (n.reject = o);
      })),
      (n.handlers = {
        next: function (i) {
          n.sub !== null &&
            ((n.latest = ["next", i]),
            n.notify("next", i),
            wn(n.observers, "next", i));
        },
        error: function (i) {
          var o = n.sub;
          o !== null &&
            (o &&
              setTimeout(function () {
                return o.unsubscribe();
              }),
            (n.sub = null),
            (n.latest = ["error", i]),
            n.reject(i),
            n.notify("error", i),
            wn(n.observers, "error", i));
        },
        complete: function () {
          var i = n,
            o = i.sub,
            s = i.sources,
            a = s === void 0 ? [] : s;
          if (o !== null) {
            var u = a.shift();
            u
              ? eu(u)
                ? u.then(function (c) {
                    return (n.sub = c.subscribe(n.handlers));
                  })
                : (n.sub = u.subscribe(n.handlers))
              : (o &&
                  setTimeout(function () {
                    return o.unsubscribe();
                  }),
                (n.sub = null),
                n.latest && n.latest[0] === "next"
                  ? n.resolve(n.latest[1])
                  : n.resolve(),
                n.notify("complete"),
                wn(n.observers, "complete"));
          }
        },
      }),
      (n.nextResultListeners = new Set()),
      (n.cancel = function (i) {
        n.reject(i), (n.sources = []), n.handlers.complete();
      }),
      n.promise.catch(function (i) {}),
      typeof r == "function" && (r = [new pe(r)]),
      eu(r)
        ? r.then(function (i) {
            return n.start(i);
          }, n.handlers.error)
        : n.start(r),
      n
    );
  }
  return (
    (t.prototype.start = function (r) {
      this.sub === void 0 &&
        ((this.sources = Array.from(r)), this.handlers.complete());
    }),
    (t.prototype.deliverLastMessage = function (r) {
      if (this.latest) {
        var n = this.latest[0],
          i = r[n];
        i && i.call(r, this.latest[1]),
          this.sub === null && n === "next" && r.complete && r.complete();
      }
    }),
    (t.prototype.addObserver = function (r) {
      this.observers.has(r) ||
        (this.deliverLastMessage(r), this.observers.add(r));
    }),
    (t.prototype.removeObserver = function (r) {
      this.observers.delete(r) &&
        this.observers.size < 1 &&
        this.handlers.complete();
    }),
    (t.prototype.notify = function (r, n) {
      var i = this.nextResultListeners;
      i.size &&
        ((this.nextResultListeners = new Set()),
        i.forEach(function (o) {
          return o(r, n);
        }));
    }),
    (t.prototype.beforeNext = function (r) {
      var n = !1;
      this.nextResultListeners.add(function (i, o) {
        n || ((n = !0), r(i, o));
      });
    }),
    t
  );
})(pe);
Qf(fn);
function jr(e) {
  return "incremental" in e;
}
function Db(e) {
  return "hasNext" in e && "data" in e;
}
function Nb(e) {
  return jr(e) || Db(e);
}
function Uf(e, t) {
  var r = e,
    n = new Gt();
  return (
    jr(t) &&
      st(t.incremental) &&
      t.incremental.forEach(function (i) {
        for (var o = i.data, s = i.path, a = s.length - 1; a >= 0; --a) {
          var u = s[a],
            c = !isNaN(+u),
            l = c ? [] : {};
          (l[u] = o), (o = l);
        }
        r = n.merge(r, o);
      }),
    r
  );
}
function si(e) {
  var t = ds(e);
  return st(t);
}
function ds(e) {
  var t = st(e.errors) ? e.errors.slice(0) : [];
  return (
    jr(e) &&
      st(e.incremental) &&
      e.incremental.forEach(function (r) {
        r.errors && t.push.apply(t, r.errors);
      }),
    t
  );
}
function Ji() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var r = Object.create(null);
  return (
    e.forEach(function (n) {
      n &&
        Object.keys(n).forEach(function (i) {
          var o = n[i];
          o !== void 0 && (r[i] = o);
        });
    }),
    r
  );
}
var tu = new Map();
function ru(e) {
  var t = tu.get(e) || 1;
  return (
    tu.set(e, t + 1),
    "".concat(e, ":").concat(t, ":").concat(Math.random().toString(36).slice(2))
  );
}
function wo(e, t) {
  return Ji(
    e,
    t,
    t.variables && { variables: R(R({}, e && e.variables), t.variables) }
  );
}
function nu(e) {
  return new pe(function (t) {
    t.error(e);
  });
}
var ps = function (e, t, r) {
  var n = new Error(r);
  throw (
    ((n.name = "ServerError"),
    (n.response = e),
    (n.statusCode = e.status),
    (n.result = t),
    n)
  );
};
function Mb(e) {
  for (
    var t = ["query", "operationName", "variables", "extensions", "context"],
      r = 0,
      n = Object.keys(e);
    r < n.length;
    r++
  ) {
    var i = n[r];
    if (t.indexOf(i) < 0) throw new Qe(27);
  }
  return e;
}
function Lb(e, t) {
  var r = R({}, e),
    n = function (o) {
      typeof o == "function" ? (r = R(R({}, r), o(r))) : (r = R(R({}, r), o));
    },
    i = function () {
      return R({}, r);
    };
  return (
    Object.defineProperty(t, "setContext", { enumerable: !1, value: n }),
    Object.defineProperty(t, "getContext", { enumerable: !1, value: i }),
    t
  );
}
function jb(e) {
  var t = {
    variables: e.variables || {},
    extensions: e.extensions || {},
    operationName: e.operationName,
    query: e.query,
  };
  return (
    t.operationName ||
      (t.operationName =
        typeof t.query != "string" ? us(t.query) || void 0 : ""),
    t
  );
}
function iu(e, t) {
  return t ? t(e) : pe.of();
}
function sn(e) {
  return typeof e == "function" ? new gt(e) : e;
}
function Zn(e) {
  return e.request.length <= 1;
}
(function (e) {
  Xe(t, e);
  function t(r, n) {
    var i = e.call(this, r) || this;
    return (i.link = n), i;
  }
  return t;
})(Error);
var gt = (function () {
    function e(t) {
      t && (this.request = t);
    }
    return (
      (e.empty = function () {
        return new e(function () {
          return pe.of();
        });
      }),
      (e.from = function (t) {
        return t.length === 0
          ? e.empty()
          : t.map(sn).reduce(function (r, n) {
              return r.concat(n);
            });
      }),
      (e.split = function (t, r, n) {
        var i = sn(r),
          o = sn(n || new e(iu));
        return Zn(i) && Zn(o)
          ? new e(function (s) {
              return t(s) ? i.request(s) || pe.of() : o.request(s) || pe.of();
            })
          : new e(function (s, a) {
              return t(s)
                ? i.request(s, a) || pe.of()
                : o.request(s, a) || pe.of();
            });
      }),
      (e.execute = function (t, r) {
        return t.request(Lb(r.context, jb(Mb(r)))) || pe.of();
      }),
      (e.concat = function (t, r) {
        var n = sn(t);
        if (Zn(n)) return n;
        var i = sn(r);
        return Zn(i)
          ? new e(function (o) {
              return (
                n.request(o, function (s) {
                  return i.request(s) || pe.of();
                }) || pe.of()
              );
            })
          : new e(function (o, s) {
              return (
                n.request(o, function (a) {
                  return i.request(a, s) || pe.of();
                }) || pe.of()
              );
            });
      }),
      (e.prototype.split = function (t, r, n) {
        return this.concat(e.split(t, r, n || new e(iu)));
      }),
      (e.prototype.concat = function (t) {
        return e.concat(this, t);
      }),
      (e.prototype.request = function (t, r) {
        throw new Qe(22);
      }),
      (e.prototype.onError = function (t, r) {
        if (r && r.error) return r.error(t), !1;
        throw t;
      }),
      (e.prototype.setOnError = function (t) {
        return (this.onError = t), this;
      }),
      e
    );
  })(),
  qb = gt.split,
  ys = gt.execute;
function Vf(e) {
  return new gt(function (t, r) {
    return new pe(function (n) {
      var i, o, s;
      try {
        i = r(t).subscribe({
          next: function (a) {
            if (
              a.errors &&
              ((s = e({
                graphQLErrors: a.errors,
                response: a,
                operation: t,
                forward: r,
              })),
              s)
            ) {
              o = s.subscribe({
                next: n.next.bind(n),
                error: n.error.bind(n),
                complete: n.complete.bind(n),
              });
              return;
            }
            n.next(a);
          },
          error: function (a) {
            if (
              ((s = e({
                operation: t,
                networkError: a,
                graphQLErrors: a && a.result && a.result.errors,
                forward: r,
              })),
              s)
            ) {
              o = s.subscribe({
                next: n.next.bind(n),
                error: n.error.bind(n),
                complete: n.complete.bind(n),
              });
              return;
            }
            n.error(a);
          },
          complete: function () {
            s || n.complete.bind(n)();
          },
        });
      } catch (a) {
        e({ networkError: a, operation: t, forward: r }), n.error(a);
      }
      return function () {
        i && i.unsubscribe(), o && i.unsubscribe();
      };
    });
  });
}
(function (e) {
  Xe(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return (n.link = Vf(r)), n;
  }
  return (
    (t.prototype.request = function (r, n) {
      return this.link.request(r, n);
    }),
    t
  );
})(gt);
var $b = "3.7.9";
function Hb(e) {
  return !!e.body;
}
function Bb(e) {
  return !!e.getReader;
}
function Qb(e) {
  return !!(Ki && e[Symbol.asyncIterator]);
}
function Ub(e) {
  return !!e.stream;
}
function Vb(e) {
  return !!e.arrayBuffer;
}
function Wb(e) {
  return !!e.pipe;
}
function zb(e) {
  var t,
    r = e[Symbol.asyncIterator]();
  return (
    (t = {
      next: function () {
        return r.next();
      },
    }),
    (t[Symbol.asyncIterator] = function () {
      return this;
    }),
    t
  );
}
function Kb(e) {
  var t = null,
    r = null,
    n = !1,
    i = [],
    o = [];
  function s(f) {
    if (!r) {
      if (o.length) {
        var h = o.shift();
        if (Array.isArray(h) && h[0]) return h[0]({ value: f, done: !1 });
      }
      i.push(f);
    }
  }
  function a(f) {
    r = f;
    var h = o.slice();
    h.forEach(function (d) {
      d[1](f);
    }),
      !t || t();
  }
  function u() {
    n = !0;
    var f = o.slice();
    f.forEach(function (h) {
      h[0]({ value: void 0, done: !0 });
    }),
      !t || t();
  }
  (t = function () {
    (t = null),
      e.removeListener("data", s),
      e.removeListener("error", a),
      e.removeListener("end", u),
      e.removeListener("finish", u),
      e.removeListener("close", u);
  }),
    e.on("data", s),
    e.on("error", a),
    e.on("end", u),
    e.on("finish", u),
    e.on("close", u);
  function c() {
    return new Promise(function (f, h) {
      if (r) return h(r);
      if (i.length) return f({ value: i.shift(), done: !1 });
      if (n) return f({ value: void 0, done: !0 });
      o.push([f, h]);
    });
  }
  var l = {
    next: function () {
      return c();
    },
  };
  return (
    Ki &&
      (l[Symbol.asyncIterator] = function () {
        return this;
      }),
    l
  );
}
function Jb(e) {
  var t = !1,
    r = {
      next: function () {
        return t
          ? Promise.resolve({ value: void 0, done: !0 })
          : ((t = !0),
            new Promise(function (n, i) {
              e.then(function (o) {
                n({ value: o, done: !1 });
              }).catch(i);
            }));
      },
    };
  return (
    Ki &&
      (r[Symbol.asyncIterator] = function () {
        return this;
      }),
    r
  );
}
function ou(e) {
  var t = {
    next: function () {
      return e.read();
    },
  };
  return (
    Ki &&
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
    t
  );
}
function Gb(e) {
  var t = e;
  if ((Hb(e) && (t = e.body), Qb(t))) return zb(t);
  if (Bb(t)) return ou(t.getReader());
  if (Ub(t)) return ou(t.stream().getReader());
  if (Vb(t)) return Jb(t.arrayBuffer());
  if (Wb(t)) return Kb(t);
  throw new Error(
    "Unknown body type for responseIterator. Please pass a streamable response."
  );
}
var su = Object.prototype.hasOwnProperty;
function Yb(e, t) {
  var r, n, i;
  return $t(this, void 0, void 0, function () {
    var o, s, a, u, c, l, f, h, d, y, b, w, m, p, v, _, S, k, T, O;
    return Ht(this, function (M) {
      switch (M.label) {
        case 0:
          if (TextDecoder === void 0)
            throw new Error(
              "TextDecoder must be defined in the environment: please import a polyfill."
            );
          (o = new TextDecoder("utf-8")),
            (s =
              (r = e.headers) === null || r === void 0
                ? void 0
                : r.get("content-type")),
            (a = "boundary="),
            (u =
              s != null && s.includes(a)
                ? s == null
                  ? void 0
                  : s
                      .substring((s == null ? void 0 : s.indexOf(a)) + a.length)
                      .replace(/['"]/g, "")
                      .replace(/\;(.*)/gm, "")
                      .trim()
                : "-"),
            (c = "--".concat(u)),
            (l = ""),
            (f = Gb(e)),
            (h = !0),
            (M.label = 1);
        case 1:
          return h ? [4, f.next()] : [3, 3];
        case 2:
          for (
            d = M.sent(),
              y = d.value,
              b = d.done,
              w = typeof y == "string" ? y : o.decode(y),
              h = !b,
              l += w,
              m = l.indexOf(c);
            m > -1;

          ) {
            if (
              ((p = void 0),
              (O = [l.slice(0, m), l.slice(m + c.length)]),
              (p = O[0]),
              (l = O[1]),
              p.trim())
            ) {
              if (
                ((v = p.indexOf(`\r
\r
`)),
                (_ = Xb(p.slice(0, v))),
                (S = _["content-type"]),
                S && S.toLowerCase().indexOf("application/json") === -1)
              )
                throw new Error(
                  "Unsupported patch content type: application/json is required."
                );
              k = p.slice(v);
              try {
                (T = Wf(
                  e,
                  k.replace(
                    `\r
`,
                    ""
                  )
                )),
                  (Object.keys(T).length > 1 ||
                    "data" in T ||
                    "incremental" in T ||
                    "errors" in T) &&
                    ((n = t.next) === null || n === void 0 || n.call(t, T));
              } catch (L) {
                va(L, t);
              }
            }
            m = l.indexOf(c);
          }
          return [3, 1];
        case 3:
          return (i = t.complete) === null || i === void 0 || i.call(t), [2];
      }
    });
  });
}
function Xb(e) {
  var t = {};
  return (
    e
      .split(
        `
`
      )
      .forEach(function (r) {
        var n = r.indexOf(":");
        if (n > -1) {
          var i = r.slice(0, n).trim().toLowerCase(),
            o = r.slice(n + 1).trim();
          t[i] = o;
        }
      }),
    t
  );
}
function Wf(e, t) {
  if (e.status >= 300) {
    var r = function () {
      try {
        return JSON.parse(t);
      } catch {
        return t;
      }
    };
    ps(
      e,
      r(),
      "Response not successful: Received status code ".concat(e.status)
    );
  }
  try {
    return JSON.parse(t);
  } catch (i) {
    var n = i;
    throw (
      ((n.name = "ServerParseError"),
      (n.response = e),
      (n.statusCode = e.status),
      (n.bodyText = t),
      n)
    );
  }
}
function va(e, t) {
  var r, n;
  e.name !== "AbortError" &&
    (e.result &&
      e.result.errors &&
      e.result.data &&
      ((r = t.next) === null || r === void 0 || r.call(t, e.result)),
    (n = t.error) === null || n === void 0 || n.call(t, e));
}
function Zb(e, t, r) {
  e0(t)(e)
    .then(function (n) {
      var i, o;
      (i = r.next) === null || i === void 0 || i.call(r, n),
        (o = r.complete) === null || o === void 0 || o.call(r);
    })
    .catch(function (n) {
      return va(n, r);
    });
}
function e0(e) {
  return function (t) {
    return t
      .text()
      .then(function (r) {
        return Wf(t, r);
      })
      .then(function (r) {
        return (
          t.status >= 300 &&
            ps(
              t,
              r,
              "Response not successful: Received status code ".concat(t.status)
            ),
          !Array.isArray(r) &&
            !su.call(r, "data") &&
            !su.call(r, "errors") &&
            ps(
              t,
              r,
              "Server response was missing for query '".concat(
                Array.isArray(e)
                  ? e.map(function (n) {
                      return n.operationName;
                    })
                  : e.operationName,
                "'."
              )
            ),
          r
        );
      });
  };
}
var vs = function (e, t) {
    var r;
    try {
      r = JSON.stringify(e);
    } catch (i) {
      var n = new Qe(24);
      throw ((n.parseError = i), n);
    }
    return r;
  },
  t0 = { includeQuery: !0, includeExtensions: !1, preserveHeaderCase: !1 },
  r0 = { accept: "*/*", "content-type": "application/json" },
  n0 = { method: "POST" },
  i0 = { http: t0, headers: r0, options: n0 },
  o0 = function (e, t) {
    return t(e);
  };
function s0(e, t) {
  for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
  var i = {},
    o = {};
  r.forEach(function (f) {
    (i = R(R(R({}, i), f.options), {
      headers: R(R({}, i.headers), f.headers),
    })),
      f.credentials && (i.credentials = f.credentials),
      (o = R(R({}, o), f.http));
  }),
    i.headers && (i.headers = a0(i.headers, o.preserveHeaderCase));
  var s = e.operationName,
    a = e.extensions,
    u = e.variables,
    c = e.query,
    l = { operationName: s, variables: u };
  return (
    o.includeExtensions && (l.extensions = a),
    o.includeQuery && (l.query = t(c, Nf)),
    { options: i, body: l }
  );
}
function a0(e, t) {
  if (!t) {
    var r = Object.create(null);
    return (
      Object.keys(Object(e)).forEach(function (o) {
        r[o.toLowerCase()] = e[o];
      }),
      r
    );
  }
  var n = Object.create(null);
  Object.keys(Object(e)).forEach(function (o) {
    n[o.toLowerCase()] = { originalName: o, value: e[o] };
  });
  var i = Object.create(null);
  return (
    Object.keys(n).forEach(function (o) {
      i[n[o].originalName] = n[o].value;
    }),
    i
  );
}
var c0 = function () {
    if (typeof AbortController > "u") return { controller: !1, signal: !1 };
    var e = new AbortController(),
      t = e.signal;
    return { controller: e, signal: t };
  },
  u0 = function (e, t) {
    var r = e.getContext(),
      n = r.uri;
    return n || (typeof t == "function" ? t(e) : t || "/graphql");
  };
function l0(e, t) {
  var r = [],
    n = function (f, h) {
      r.push("".concat(f, "=").concat(encodeURIComponent(h)));
    };
  if (
    ("query" in t && n("query", t.query),
    t.operationName && n("operationName", t.operationName),
    t.variables)
  ) {
    var i = void 0;
    try {
      i = vs(t.variables, "Variables map");
    } catch (f) {
      return { parseError: f };
    }
    n("variables", i);
  }
  if (t.extensions) {
    var o = void 0;
    try {
      o = vs(t.extensions, "Extensions map");
    } catch (f) {
      return { parseError: f };
    }
    n("extensions", o);
  }
  var s = "",
    a = e,
    u = e.indexOf("#");
  u !== -1 && ((s = e.substr(u)), (a = e.substr(0, u)));
  var c = a.indexOf("?") === -1 ? "?" : "&",
    l = a + c + r.join("&") + s;
  return { newURI: l };
}
var f0 = rt(function () {
    return fetch;
  }),
  zf = function (e) {
    e === void 0 && (e = {});
    var t = e.uri,
      r = t === void 0 ? "/graphql" : t,
      n = e.fetch,
      i = e.print,
      o = i === void 0 ? o0 : i,
      s = e.includeExtensions,
      a = e.preserveHeaderCase,
      u = e.useGETForQueries,
      c = e.includeUnusedVariables,
      l = c === void 0 ? !1 : c,
      f = dr(e, [
        "uri",
        "fetch",
        "print",
        "includeExtensions",
        "preserveHeaderCase",
        "useGETForQueries",
        "includeUnusedVariables",
      ]),
      h = {
        http: { includeExtensions: s, preserveHeaderCase: a },
        options: f.fetchOptions,
        credentials: f.credentials,
        headers: f.headers,
      };
    return new gt(function (d) {
      var y = u0(d, r),
        b = d.getContext(),
        w = {};
      if (b.clientAwareness) {
        var m = b.clientAwareness,
          p = m.name,
          v = m.version;
        p && (w["apollographql-client-name"] = p),
          v && (w["apollographql-client-version"] = v);
      }
      var _ = R(R({}, w), b.headers),
        S = {
          http: b.http,
          options: b.fetchOptions,
          credentials: b.credentials,
          headers: _,
        },
        k = s0(d, o, i0, h, S),
        T = k.options,
        O = k.body;
      if (O.variables && !l) {
        var M = new Set(Object.keys(O.variables));
        Pt(d.query, {
          Variable: function (U, Ee, te) {
            te && te.kind !== "VariableDefinition" && M.delete(U.name.value);
          },
        }),
          M.size &&
            ((O.variables = R({}, O.variables)),
            M.forEach(function (U) {
              delete O.variables[U];
            }));
      }
      var L;
      if (!T.signal) {
        var Q = c0(),
          q = Q.controller,
          W = Q.signal;
        (L = q), L && (T.signal = W);
      }
      var I = function (U) {
        return U.kind === "OperationDefinition" && U.operation === "mutation";
      };
      if (
        (u && !d.query.definitions.some(I) && (T.method = "GET"),
        oa(["defer"], d.query) &&
          ((T.headers = T.headers || {}),
          (T.headers.accept =
            "multipart/mixed; deferSpec=20220824, application/json")),
        T.method === "GET")
      ) {
        var Z = l0(y, O),
          z = Z.newURI,
          K = Z.parseError;
        if (K) return nu(K);
        y = z;
      } else
        try {
          T.body = vs(O, "Payload");
        } catch (U) {
          return nu(U);
        }
      return new pe(function (U) {
        var Ee =
          n ||
          rt(function () {
            return fetch;
          }) ||
          f0;
        return (
          Ee(y, T)
            .then(function (te) {
              var Se;
              d.setContext({ response: te });
              var be =
                (Se = te.headers) === null || Se === void 0
                  ? void 0
                  : Se.get("content-type");
              return be !== null && /^multipart\/mixed/i.test(be)
                ? Yb(te, U)
                : Zb(te, d, U);
            })
            .catch(function (te) {
              return va(te, U);
            }),
          function () {
            L && L.abort();
          }
        );
      });
    });
  },
  h0 = (function (e) {
    Xe(t, e);
    function t(r) {
      r === void 0 && (r = {});
      var n = e.call(this, zf(r).request) || this;
      return (n.options = r), n;
    }
    return t;
  })(gt),
  Kf = Object.prototype,
  au = Kf.toString,
  d0 = Kf.hasOwnProperty,
  cu = Function.prototype.toString,
  ms = new Map();
function Me(e, t) {
  try {
    return gs(e, t);
  } finally {
    ms.clear();
  }
}
function gs(e, t) {
  if (e === t) return !0;
  var r = au.call(e),
    n = au.call(t);
  if (r !== n) return !1;
  switch (r) {
    case "[object Array]":
      if (e.length !== t.length) return !1;
    case "[object Object]": {
      if (lu(e, t)) return !0;
      var i = uu(e),
        o = uu(t),
        s = i.length;
      if (s !== o.length) return !1;
      for (var a = 0; a < s; ++a) if (!d0.call(t, i[a])) return !1;
      for (var a = 0; a < s; ++a) {
        var u = i[a];
        if (!gs(e[u], t[u])) return !1;
      }
      return !0;
    }
    case "[object Error]":
      return e.name === t.name && e.message === t.message;
    case "[object Number]":
      if (e !== e) return t !== t;
    case "[object Boolean]":
    case "[object Date]":
      return +e == +t;
    case "[object RegExp]":
    case "[object String]":
      return e == "".concat(t);
    case "[object Map]":
    case "[object Set]": {
      if (e.size !== t.size) return !1;
      if (lu(e, t)) return !0;
      for (var c = e.entries(), l = r === "[object Map]"; ; ) {
        var f = c.next();
        if (f.done) break;
        var h = f.value,
          d = h[0],
          y = h[1];
        if (!t.has(d) || (l && !gs(y, t.get(d)))) return !1;
      }
      return !0;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      (e = new Uint8Array(e)), (t = new Uint8Array(t));
    case "[object DataView]": {
      var b = e.byteLength;
      if (b === t.byteLength) for (; b-- && e[b] === t[b]; );
      return b === -1;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      var w = cu.call(e);
      return w !== cu.call(t) ? !1 : !v0(w, y0);
    }
  }
  return !1;
}
function uu(e) {
  return Object.keys(e).filter(p0, e);
}
function p0(e) {
  return this[e] !== void 0;
}
var y0 = "{ [native code] }";
function v0(e, t) {
  var r = e.length - t.length;
  return r >= 0 && e.indexOf(t, r) === r;
}
function lu(e, t) {
  var r = ms.get(e);
  if (r) {
    if (r.has(t)) return !0;
  } else ms.set(e, (r = new Set()));
  return r.add(t), !1;
}
var m0 = function () {
    return Object.create(null);
  },
  Jf = Array.prototype,
  g0 = Jf.forEach,
  b0 = Jf.slice,
  qn = (function () {
    function e(t, r) {
      t === void 0 && (t = !0),
        r === void 0 && (r = m0),
        (this.weakness = t),
        (this.makeData = r);
    }
    return (
      (e.prototype.lookup = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return this.lookupArray(t);
      }),
      (e.prototype.lookupArray = function (t) {
        var r = this;
        return (
          g0.call(t, function (n) {
            return (r = r.getChildTrie(n));
          }),
          r.data || (r.data = this.makeData(b0.call(t)))
        );
      }),
      (e.prototype.getChildTrie = function (t) {
        var r =
            this.weakness && w0(t)
              ? this.weak || (this.weak = new WeakMap())
              : this.strong || (this.strong = new Map()),
          n = r.get(t);
        return n || r.set(t, (n = new e(this.weakness, this.makeData))), n;
      }),
      e
    );
  })();
function w0(e) {
  switch (typeof e) {
    case "object":
      if (e === null) break;
    case "function":
      return !0;
  }
  return !1;
}
var Fe = null,
  fu = {},
  _0 = 1,
  E0 = function () {
    return (function () {
      function e() {
        this.id = [
          "slot",
          _0++,
          Date.now(),
          Math.random().toString(36).slice(2),
        ].join(":");
      }
      return (
        (e.prototype.hasValue = function () {
          for (var t = Fe; t; t = t.parent)
            if (this.id in t.slots) {
              var r = t.slots[this.id];
              if (r === fu) break;
              return t !== Fe && (Fe.slots[this.id] = r), !0;
            }
          return Fe && (Fe.slots[this.id] = fu), !1;
        }),
        (e.prototype.getValue = function () {
          if (this.hasValue()) return Fe.slots[this.id];
        }),
        (e.prototype.withValue = function (t, r, n, i) {
          var o,
            s = ((o = { __proto__: null }), (o[this.id] = t), o),
            a = Fe;
          Fe = { parent: a, slots: s };
          try {
            return r.apply(i, n);
          } finally {
            Fe = a;
          }
        }),
        (e.bind = function (t) {
          var r = Fe;
          return function () {
            var n = Fe;
            try {
              return (Fe = r), t.apply(this, arguments);
            } finally {
              Fe = n;
            }
          };
        }),
        (e.noContext = function (t, r, n) {
          if (Fe) {
            var i = Fe;
            try {
              return (Fe = null), t.apply(n, r);
            } finally {
              Fe = i;
            }
          } else return t.apply(n, r);
        }),
        e
      );
    })();
  };
function hu(e) {
  try {
    return e();
  } catch {}
}
var _o = "@wry/context:Slot",
  S0 =
    hu(function () {
      return globalThis;
    }) ||
    hu(function () {
      return global;
    }) ||
    Object.create(null),
  du = S0,
  Gi =
    du[_o] ||
    Array[_o] ||
    (function (e) {
      try {
        Object.defineProperty(du, _o, {
          value: e,
          enumerable: !1,
          writable: !1,
          configurable: !0,
        });
      } finally {
        return e;
      }
    })(E0());
Gi.bind;
Gi.noContext;
function O0() {}
var T0 = (function () {
    function e(t, r) {
      t === void 0 && (t = 1 / 0),
        r === void 0 && (r = O0),
        (this.max = t),
        (this.dispose = r),
        (this.map = new Map()),
        (this.newest = null),
        (this.oldest = null);
    }
    return (
      (e.prototype.has = function (t) {
        return this.map.has(t);
      }),
      (e.prototype.get = function (t) {
        var r = this.getNode(t);
        return r && r.value;
      }),
      (e.prototype.getNode = function (t) {
        var r = this.map.get(t);
        if (r && r !== this.newest) {
          var n = r.older,
            i = r.newer;
          i && (i.older = n),
            n && (n.newer = i),
            (r.older = this.newest),
            (r.older.newer = r),
            (r.newer = null),
            (this.newest = r),
            r === this.oldest && (this.oldest = i);
        }
        return r;
      }),
      (e.prototype.set = function (t, r) {
        var n = this.getNode(t);
        return n
          ? (n.value = r)
          : ((n = { key: t, value: r, newer: null, older: this.newest }),
            this.newest && (this.newest.newer = n),
            (this.newest = n),
            (this.oldest = this.oldest || n),
            this.map.set(t, n),
            n.value);
      }),
      (e.prototype.clean = function () {
        for (; this.oldest && this.map.size > this.max; )
          this.delete(this.oldest.key);
      }),
      (e.prototype.delete = function (t) {
        var r = this.map.get(t);
        return r
          ? (r === this.newest && (this.newest = r.older),
            r === this.oldest && (this.oldest = r.newer),
            r.newer && (r.newer.older = r.older),
            r.older && (r.older.newer = r.newer),
            this.map.delete(t),
            this.dispose(r.value, t),
            !0)
          : !1;
      }),
      e
    );
  })(),
  Yi = new Gi(),
  Eo,
  k0 = Object.prototype.hasOwnProperty,
  ma =
    ((Eo = Array.from),
    Eo === void 0
      ? function (e) {
          var t = [];
          return (
            e.forEach(function (r) {
              return t.push(r);
            }),
            t
          );
        }
      : Eo);
function Ei(e) {
  var t = e.unsubscribe;
  typeof t == "function" && ((e.unsubscribe = void 0), t());
}
var xn = [],
  R0 = 100;
function Jr(e, t) {
  if (!e) throw new Error(t || "assertion failure");
}
function C0(e, t) {
  var r = e.length;
  return r > 0 && r === t.length && e[r - 1] === t[r - 1];
}
function Gf(e) {
  switch (e.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return e[0];
    case 2:
      throw e[1];
  }
}
function P0(e) {
  return e.slice(0);
}
var x0 = (function () {
  function e(t) {
    (this.fn = t),
      (this.parents = new Set()),
      (this.childValues = new Map()),
      (this.dirtyChildren = null),
      (this.dirty = !0),
      (this.recomputing = !1),
      (this.value = []),
      (this.deps = null),
      ++e.count;
  }
  return (
    (e.prototype.peek = function () {
      if (this.value.length === 1 && !Yt(this)) return pu(this), this.value[0];
    }),
    (e.prototype.recompute = function (t) {
      return (
        Jr(!this.recomputing, "already recomputing"),
        pu(this),
        Yt(this) ? I0(this, t) : Gf(this.value)
      );
    }),
    (e.prototype.setDirty = function () {
      this.dirty ||
        ((this.dirty = !0), (this.value.length = 0), Yf(this), Ei(this));
    }),
    (e.prototype.dispose = function () {
      var t = this;
      this.setDirty(),
        rh(this),
        ga(this, function (r, n) {
          r.setDirty(), nh(r, t);
        });
    }),
    (e.prototype.forget = function () {
      this.dispose();
    }),
    (e.prototype.dependOn = function (t) {
      t.add(this),
        this.deps || (this.deps = xn.pop() || new Set()),
        this.deps.add(t);
    }),
    (e.prototype.forgetDeps = function () {
      var t = this;
      this.deps &&
        (ma(this.deps).forEach(function (r) {
          return r.delete(t);
        }),
        this.deps.clear(),
        xn.push(this.deps),
        (this.deps = null));
    }),
    (e.count = 0),
    e
  );
})();
function pu(e) {
  var t = Yi.getValue();
  if (t)
    return (
      e.parents.add(t),
      t.childValues.has(e) || t.childValues.set(e, []),
      Yt(e) ? Zf(t, e) : eh(t, e),
      t
    );
}
function I0(e, t) {
  return rh(e), Yi.withValue(e, A0, [e, t]), D0(e, t) && F0(e), Gf(e.value);
}
function A0(e, t) {
  (e.recomputing = !0), (e.value.length = 0);
  try {
    e.value[0] = e.fn.apply(null, t);
  } catch (r) {
    e.value[1] = r;
  }
  e.recomputing = !1;
}
function Yt(e) {
  return e.dirty || !!(e.dirtyChildren && e.dirtyChildren.size);
}
function F0(e) {
  (e.dirty = !1), !Yt(e) && Xf(e);
}
function Yf(e) {
  ga(e, Zf);
}
function Xf(e) {
  ga(e, eh);
}
function ga(e, t) {
  var r = e.parents.size;
  if (r) for (var n = ma(e.parents), i = 0; i < r; ++i) t(n[i], e);
}
function Zf(e, t) {
  Jr(e.childValues.has(t)), Jr(Yt(t));
  var r = !Yt(e);
  if (!e.dirtyChildren) e.dirtyChildren = xn.pop() || new Set();
  else if (e.dirtyChildren.has(t)) return;
  e.dirtyChildren.add(t), r && Yf(e);
}
function eh(e, t) {
  Jr(e.childValues.has(t)), Jr(!Yt(t));
  var r = e.childValues.get(t);
  r.length === 0
    ? e.childValues.set(t, P0(t.value))
    : C0(r, t.value) || e.setDirty(),
    th(e, t),
    !Yt(e) && Xf(e);
}
function th(e, t) {
  var r = e.dirtyChildren;
  r &&
    (r.delete(t),
    r.size === 0 && (xn.length < R0 && xn.push(r), (e.dirtyChildren = null)));
}
function rh(e) {
  e.childValues.size > 0 &&
    e.childValues.forEach(function (t, r) {
      nh(e, r);
    }),
    e.forgetDeps(),
    Jr(e.dirtyChildren === null);
}
function nh(e, t) {
  t.parents.delete(e), e.childValues.delete(t), th(e, t);
}
function D0(e, t) {
  if (typeof e.subscribe == "function")
    try {
      Ei(e), (e.unsubscribe = e.subscribe.apply(null, t));
    } catch {
      return e.setDirty(), !1;
    }
  return !0;
}
var N0 = { setDirty: !0, dispose: !0, forget: !0 };
function ih(e) {
  var t = new Map(),
    r = e && e.subscribe;
  function n(i) {
    var o = Yi.getValue();
    if (o) {
      var s = t.get(i);
      s || t.set(i, (s = new Set())),
        o.dependOn(s),
        typeof r == "function" && (Ei(s), (s.unsubscribe = r(i)));
    }
  }
  return (
    (n.dirty = function (o, s) {
      var a = t.get(o);
      if (a) {
        var u = s && k0.call(N0, s) ? s : "setDirty";
        ma(a).forEach(function (c) {
          return c[u]();
        }),
          t.delete(o),
          Ei(a);
      }
    }),
    n
  );
}
function oh() {
  var e = new qn(typeof WeakMap == "function");
  return function () {
    return e.lookupArray(arguments);
  };
}
oh();
var So = new Set();
function Si(e, t) {
  t === void 0 && (t = Object.create(null));
  var r = new T0(t.max || Math.pow(2, 16), function (c) {
      return c.dispose();
    }),
    n = t.keyArgs,
    i = t.makeCacheKey || oh(),
    o = function () {
      var c = i.apply(null, n ? n.apply(null, arguments) : arguments);
      if (c === void 0) return e.apply(null, arguments);
      var l = r.get(c);
      l ||
        (r.set(c, (l = new x0(e))),
        (l.subscribe = t.subscribe),
        (l.forget = function () {
          return r.delete(c);
        }));
      var f = l.recompute(Array.prototype.slice.call(arguments));
      return (
        r.set(c, l),
        So.add(r),
        Yi.hasValue() ||
          (So.forEach(function (h) {
            return h.clean();
          }),
          So.clear()),
        f
      );
    };
  Object.defineProperty(o, "size", {
    get: function () {
      return r.map.size;
    },
    configurable: !1,
    enumerable: !1,
  });
  function s(c) {
    var l = r.get(c);
    l && l.setDirty();
  }
  (o.dirtyKey = s),
    (o.dirty = function () {
      s(i.apply(null, arguments));
    });
  function a(c) {
    var l = r.get(c);
    if (l) return l.peek();
  }
  (o.peekKey = a),
    (o.peek = function () {
      return a(i.apply(null, arguments));
    });
  function u(c) {
    return r.delete(c);
  }
  return (
    (o.forgetKey = u),
    (o.forget = function () {
      return u(i.apply(null, arguments));
    }),
    (o.makeCacheKey = i),
    (o.getKey = n
      ? function () {
          return i.apply(null, n.apply(null, arguments));
        }
      : i),
    Object.freeze(o)
  );
}
var M0 = (function () {
    function e() {
      this.getFragmentDoc = Si(Xg);
    }
    return (
      (e.prototype.batch = function (t) {
        var r = this,
          n =
            typeof t.optimistic == "string"
              ? t.optimistic
              : t.optimistic === !1
              ? null
              : void 0,
          i;
        return (
          this.performTransaction(function () {
            return (i = t.update(r));
          }, n),
          i
        );
      }),
      (e.prototype.recordOptimisticTransaction = function (t, r) {
        this.performTransaction(t, r);
      }),
      (e.prototype.transformDocument = function (t) {
        return t;
      }),
      (e.prototype.transformForLink = function (t) {
        return t;
      }),
      (e.prototype.identify = function (t) {}),
      (e.prototype.gc = function () {
        return [];
      }),
      (e.prototype.modify = function (t) {
        return !1;
      }),
      (e.prototype.readQuery = function (t, r) {
        return (
          r === void 0 && (r = !!t.optimistic),
          this.read(
            R(R({}, t), { rootId: t.id || "ROOT_QUERY", optimistic: r })
          )
        );
      }),
      (e.prototype.readFragment = function (t, r) {
        return (
          r === void 0 && (r = !!t.optimistic),
          this.read(
            R(R({}, t), {
              query: this.getFragmentDoc(t.fragment, t.fragmentName),
              rootId: t.id,
              optimistic: r,
            })
          )
        );
      }),
      (e.prototype.writeQuery = function (t) {
        var r = t.id,
          n = t.data,
          i = dr(t, ["id", "data"]);
        return this.write(
          Object.assign(i, { dataId: r || "ROOT_QUERY", result: n })
        );
      }),
      (e.prototype.writeFragment = function (t) {
        var r = t.id,
          n = t.data,
          i = t.fragment,
          o = t.fragmentName,
          s = dr(t, ["id", "data", "fragment", "fragmentName"]);
        return this.write(
          Object.assign(s, {
            query: this.getFragmentDoc(i, o),
            dataId: r,
            result: n,
          })
        );
      }),
      (e.prototype.updateQuery = function (t, r) {
        return this.batch({
          update: function (n) {
            var i = n.readQuery(t),
              o = r(i);
            return o == null ? i : (n.writeQuery(R(R({}, t), { data: o })), o);
          },
        });
      }),
      (e.prototype.updateFragment = function (t, r) {
        return this.batch({
          update: function (n) {
            var i = n.readFragment(t),
              o = r(i);
            return o == null
              ? i
              : (n.writeFragment(R(R({}, t), { data: o })), o);
          },
        });
      }),
      e
    );
  })(),
  sh = (function (e) {
    Xe(t, e);
    function t(r, n, i, o) {
      var s,
        a = e.call(this, r) || this;
      if (
        ((a.message = r),
        (a.path = n),
        (a.query = i),
        (a.variables = o),
        Array.isArray(a.path))
      ) {
        a.missing = a.message;
        for (var u = a.path.length - 1; u >= 0; --u)
          a.missing = ((s = {}), (s[a.path[u]] = a.missing), s);
      } else a.missing = a.path;
      return (a.__proto__ = t.prototype), a;
    }
    return t;
  })(Error),
  Ie = Object.prototype.hasOwnProperty;
function an(e) {
  return e == null;
}
function ah(e, t) {
  var r = e.__typename,
    n = e.id,
    i = e._id;
  if (
    typeof r == "string" &&
    (t && (t.keyObject = an(n) ? (an(i) ? void 0 : { _id: i }) : { id: n }),
    an(n) && !an(i) && (n = i),
    !an(n))
  )
    return ""
      .concat(r, ":")
      .concat(
        typeof n == "number" || typeof n == "string" ? n : JSON.stringify(n)
      );
}
var ch = {
  dataIdFromObject: ah,
  addTypename: !0,
  resultCaching: !0,
  canonizeResults: !1,
};
function L0(e) {
  return Ji(ch, e);
}
function uh(e) {
  var t = e.canonizeResults;
  return t === void 0 ? ch.canonizeResults : t;
}
var lh = /^[_a-z][_0-9a-z]*/i;
function Gr(e) {
  var t = e.match(lh);
  return t ? t[0] : e;
}
function bs(e, t, r) {
  return Pe(t)
    ? xe(t)
      ? t.every(function (n) {
          return bs(e, n, r);
        })
      : e.selections.every(function (n) {
          if (pr(n) && Ui(n, r)) {
            var i = zr(n);
            return (
              Ie.call(t, i) && (!n.selectionSet || bs(n.selectionSet, t[i], r))
            );
          }
          return !0;
        })
    : !1;
}
function Cr(e) {
  return Pe(e) && !me(e) && !xe(e);
}
function j0() {
  return new Gt();
}
function fh(e, t) {
  var r = sa(ua(e));
  return {
    fragmentMap: r,
    lookupFragment: function (n) {
      var i = r[n];
      return !i && t && (i = t.lookup(n)), i || null;
    },
  };
}
var ai = Object.create(null),
  Oo = function () {
    return ai;
  },
  yu = Object.create(null),
  In = (function () {
    function e(t, r) {
      var n = this;
      (this.policies = t),
        (this.group = r),
        (this.data = Object.create(null)),
        (this.rootIds = Object.create(null)),
        (this.refs = Object.create(null)),
        (this.getFieldValue = function (i, o) {
          return me(i) ? n.get(i.__ref, o) : i && i[o];
        }),
        (this.canRead = function (i) {
          return me(i) ? n.has(i.__ref) : typeof i == "object";
        }),
        (this.toReference = function (i, o) {
          if (typeof i == "string") return Lr(i);
          if (me(i)) return i;
          var s = n.policies.identify(i)[0];
          if (s) {
            var a = Lr(s);
            return o && n.merge(s, i), a;
          }
        });
    }
    return (
      (e.prototype.toObject = function () {
        return R({}, this.data);
      }),
      (e.prototype.has = function (t) {
        return this.lookup(t, !0) !== void 0;
      }),
      (e.prototype.get = function (t, r) {
        if ((this.group.depend(t, r), Ie.call(this.data, t))) {
          var n = this.data[t];
          if (n && Ie.call(n, r)) return n[r];
        }
        if (r === "__typename" && Ie.call(this.policies.rootTypenamesById, t))
          return this.policies.rootTypenamesById[t];
        if (this instanceof Mt) return this.parent.get(t, r);
      }),
      (e.prototype.lookup = function (t, r) {
        if ((r && this.group.depend(t, "__exists"), Ie.call(this.data, t)))
          return this.data[t];
        if (this instanceof Mt) return this.parent.lookup(t, r);
        if (this.policies.rootTypenamesById[t]) return Object.create(null);
      }),
      (e.prototype.merge = function (t, r) {
        var n = this,
          i;
        me(t) && (t = t.__ref), me(r) && (r = r.__ref);
        var o = typeof t == "string" ? this.lookup((i = t)) : t,
          s = typeof r == "string" ? this.lookup((i = r)) : r;
        if (s) {
          le(typeof i == "string", 1);
          var a = new Gt($0).merge(o, s);
          if (
            ((this.data[i] = a),
            a !== o && (delete this.refs[i], this.group.caching))
          ) {
            var u = Object.create(null);
            o || (u.__exists = 1),
              Object.keys(s).forEach(function (c) {
                if (!o || o[c] !== a[c]) {
                  u[c] = 1;
                  var l = Gr(c);
                  l !== c &&
                    !n.policies.hasKeyArgs(a.__typename, l) &&
                    (u[l] = 1),
                    a[c] === void 0 && !(n instanceof Mt) && delete a[c];
                }
              }),
              u.__typename &&
                !(o && o.__typename) &&
                this.policies.rootTypenamesById[i] === a.__typename &&
                delete u.__typename,
              Object.keys(u).forEach(function (c) {
                return n.group.dirty(i, c);
              });
          }
        }
      }),
      (e.prototype.modify = function (t, r) {
        var n = this,
          i = this.lookup(t);
        if (i) {
          var o = Object.create(null),
            s = !1,
            a = !0,
            u = {
              DELETE: ai,
              INVALIDATE: yu,
              isReference: me,
              toReference: this.toReference,
              canRead: this.canRead,
              readField: function (c, l) {
                return n.policies.readField(
                  typeof c == "string" ? { fieldName: c, from: l || Lr(t) } : c,
                  { store: n }
                );
              },
            };
          if (
            (Object.keys(i).forEach(function (c) {
              var l = Gr(c),
                f = i[c];
              if (f !== void 0) {
                var h = typeof r == "function" ? r : r[c] || r[l];
                if (h) {
                  var d =
                    h === Oo
                      ? ai
                      : h(
                          f,
                          R(R({}, u), {
                            fieldName: l,
                            storeFieldName: c,
                            storage: n.getStorage(t, c),
                          })
                        );
                  d === yu
                    ? n.group.dirty(t, c)
                    : (d === ai && (d = void 0),
                      d !== f && ((o[c] = d), (s = !0), (f = d)));
                }
                f !== void 0 && (a = !1);
              }
            }),
            s)
          )
            return (
              this.merge(t, o),
              a &&
                (this instanceof Mt
                  ? (this.data[t] = void 0)
                  : delete this.data[t],
                this.group.dirty(t, "__exists")),
              !0
            );
        }
        return !1;
      }),
      (e.prototype.delete = function (t, r, n) {
        var i,
          o = this.lookup(t);
        if (o) {
          var s = this.getFieldValue(o, "__typename"),
            a =
              r && n
                ? this.policies.getStoreFieldName({
                    typename: s,
                    fieldName: r,
                    args: n,
                  })
                : r;
          return this.modify(t, a ? ((i = {}), (i[a] = Oo), i) : Oo);
        }
        return !1;
      }),
      (e.prototype.evict = function (t, r) {
        var n = !1;
        return (
          t.id &&
            (Ie.call(this.data, t.id) &&
              (n = this.delete(t.id, t.fieldName, t.args)),
            this instanceof Mt &&
              this !== r &&
              (n = this.parent.evict(t, r) || n),
            (t.fieldName || n) &&
              this.group.dirty(t.id, t.fieldName || "__exists")),
          n
        );
      }),
      (e.prototype.clear = function () {
        this.replace(null);
      }),
      (e.prototype.extract = function () {
        var t = this,
          r = this.toObject(),
          n = [];
        return (
          this.getRootIdSet().forEach(function (i) {
            Ie.call(t.policies.rootTypenamesById, i) || n.push(i);
          }),
          n.length && (r.__META = { extraRootIds: n.sort() }),
          r
        );
      }),
      (e.prototype.replace = function (t) {
        var r = this;
        if (
          (Object.keys(this.data).forEach(function (o) {
            (t && Ie.call(t, o)) || r.delete(o);
          }),
          t)
        ) {
          var n = t.__META,
            i = dr(t, ["__META"]);
          Object.keys(i).forEach(function (o) {
            r.merge(o, i[o]);
          }),
            n && n.extraRootIds.forEach(this.retain, this);
        }
      }),
      (e.prototype.retain = function (t) {
        return (this.rootIds[t] = (this.rootIds[t] || 0) + 1);
      }),
      (e.prototype.release = function (t) {
        if (this.rootIds[t] > 0) {
          var r = --this.rootIds[t];
          return r || delete this.rootIds[t], r;
        }
        return 0;
      }),
      (e.prototype.getRootIdSet = function (t) {
        return (
          t === void 0 && (t = new Set()),
          Object.keys(this.rootIds).forEach(t.add, t),
          this instanceof Mt
            ? this.parent.getRootIdSet(t)
            : Object.keys(this.policies.rootTypenamesById).forEach(t.add, t),
          t
        );
      }),
      (e.prototype.gc = function () {
        var t = this,
          r = this.getRootIdSet(),
          n = this.toObject();
        r.forEach(function (s) {
          Ie.call(n, s) &&
            (Object.keys(t.findChildRefIds(s)).forEach(r.add, r), delete n[s]);
        });
        var i = Object.keys(n);
        if (i.length) {
          for (var o = this; o instanceof Mt; ) o = o.parent;
          i.forEach(function (s) {
            return o.delete(s);
          });
        }
        return i;
      }),
      (e.prototype.findChildRefIds = function (t) {
        if (!Ie.call(this.refs, t)) {
          var r = (this.refs[t] = Object.create(null)),
            n = this.data[t];
          if (!n) return r;
          var i = new Set([n]);
          i.forEach(function (o) {
            me(o) && (r[o.__ref] = !0),
              Pe(o) &&
                Object.keys(o).forEach(function (s) {
                  var a = o[s];
                  Pe(a) && i.add(a);
                });
          });
        }
        return this.refs[t];
      }),
      (e.prototype.makeCacheKey = function () {
        return this.group.keyMaker.lookupArray(arguments);
      }),
      e
    );
  })(),
  hh = (function () {
    function e(t, r) {
      r === void 0 && (r = null),
        (this.caching = t),
        (this.parent = r),
        (this.d = null),
        this.resetCaching();
    }
    return (
      (e.prototype.resetCaching = function () {
        (this.d = this.caching ? ih() : null), (this.keyMaker = new qn(gr));
      }),
      (e.prototype.depend = function (t, r) {
        if (this.d) {
          this.d(To(t, r));
          var n = Gr(r);
          n !== r && this.d(To(t, n)), this.parent && this.parent.depend(t, r);
        }
      }),
      (e.prototype.dirty = function (t, r) {
        this.d &&
          this.d.dirty(To(t, r), r === "__exists" ? "forget" : "setDirty");
      }),
      e
    );
  })();
function To(e, t) {
  return t + "#" + e;
}
function vu(e, t) {
  _n(e) && e.group.depend(t, "__exists");
}
(function (e) {
  var t = (function (r) {
    Xe(n, r);
    function n(i) {
      var o = i.policies,
        s = i.resultCaching,
        a = s === void 0 ? !0 : s,
        u = i.seed,
        c = r.call(this, o, new hh(a)) || this;
      return (
        (c.stump = new q0(c)),
        (c.storageTrie = new qn(gr)),
        u && c.replace(u),
        c
      );
    }
    return (
      (n.prototype.addLayer = function (i, o) {
        return this.stump.addLayer(i, o);
      }),
      (n.prototype.removeLayer = function () {
        return this;
      }),
      (n.prototype.getStorage = function () {
        return this.storageTrie.lookupArray(arguments);
      }),
      n
    );
  })(e);
  e.Root = t;
})(In || (In = {}));
var Mt = (function (e) {
    Xe(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, n.policies, o) || this;
      return (s.id = r), (s.parent = n), (s.replay = i), (s.group = o), i(s), s;
    }
    return (
      (t.prototype.addLayer = function (r, n) {
        return new t(r, this, n, this.group);
      }),
      (t.prototype.removeLayer = function (r) {
        var n = this,
          i = this.parent.removeLayer(r);
        return r === this.id
          ? (this.group.caching &&
              Object.keys(this.data).forEach(function (o) {
                var s = n.data[o],
                  a = i.lookup(o);
                a
                  ? s
                    ? s !== a &&
                      Object.keys(s).forEach(function (u) {
                        Me(s[u], a[u]) || n.group.dirty(o, u);
                      })
                    : (n.group.dirty(o, "__exists"),
                      Object.keys(a).forEach(function (u) {
                        n.group.dirty(o, u);
                      }))
                  : n.delete(o);
              }),
            i)
          : i === this.parent
          ? this
          : i.addLayer(this.id, this.replay);
      }),
      (t.prototype.toObject = function () {
        return R(R({}, this.parent.toObject()), this.data);
      }),
      (t.prototype.findChildRefIds = function (r) {
        var n = this.parent.findChildRefIds(r);
        return Ie.call(this.data, r)
          ? R(R({}, n), e.prototype.findChildRefIds.call(this, r))
          : n;
      }),
      (t.prototype.getStorage = function () {
        for (var r = this.parent; r.parent; ) r = r.parent;
        return r.getStorage.apply(r, arguments);
      }),
      t
    );
  })(In),
  q0 = (function (e) {
    Xe(t, e);
    function t(r) {
      return (
        e.call(
          this,
          "EntityStore.Stump",
          r,
          function () {},
          new hh(r.group.caching, r.group)
        ) || this
      );
    }
    return (
      (t.prototype.removeLayer = function () {
        return this;
      }),
      (t.prototype.merge = function () {
        return this.parent.merge.apply(this.parent, arguments);
      }),
      t
    );
  })(Mt);
function $0(e, t, r) {
  var n = e[r],
    i = t[r];
  return Me(n, i) ? n : i;
}
function _n(e) {
  return !!(e instanceof In && e.group.caching);
}
function H0(e) {
  return Pe(e)
    ? xe(e)
      ? e.slice(0)
      : R({ __proto__: Object.getPrototypeOf(e) }, e)
    : e;
}
var ws = (function () {
    function e() {
      (this.known = new (Fb ? WeakSet : Set)()),
        (this.pool = new qn(gr)),
        (this.passes = new WeakMap()),
        (this.keysByJSON = new Map()),
        (this.empty = this.admit({}));
    }
    return (
      (e.prototype.isKnown = function (t) {
        return Pe(t) && this.known.has(t);
      }),
      (e.prototype.pass = function (t) {
        if (Pe(t)) {
          var r = H0(t);
          return this.passes.set(r, t), r;
        }
        return t;
      }),
      (e.prototype.admit = function (t) {
        var r = this;
        if (Pe(t)) {
          var n = this.passes.get(t);
          if (n) return n;
          var i = Object.getPrototypeOf(t);
          switch (i) {
            case Array.prototype: {
              if (this.known.has(t)) return t;
              var o = t.map(this.admit, this),
                s = this.pool.lookupArray(o);
              return s.array || this.known.add((s.array = o)), s.array;
            }
            case null:
            case Object.prototype: {
              if (this.known.has(t)) return t;
              var a = Object.getPrototypeOf(t),
                u = [a],
                c = this.sortedKeys(t);
              u.push(c.json);
              var l = u.length;
              c.sorted.forEach(function (d) {
                u.push(r.admit(t[d]));
              });
              var s = this.pool.lookupArray(u);
              if (!s.object) {
                var f = (s.object = Object.create(a));
                this.known.add(f),
                  c.sorted.forEach(function (d, y) {
                    f[d] = u[l + y];
                  });
              }
              return s.object;
            }
          }
        }
        return t;
      }),
      (e.prototype.sortedKeys = function (t) {
        var r = Object.keys(t),
          n = this.pool.lookupArray(r);
        if (!n.keys) {
          r.sort();
          var i = JSON.stringify(r);
          (n.keys = this.keysByJSON.get(i)) ||
            this.keysByJSON.set(i, (n.keys = { sorted: r, json: i }));
        }
        return n.keys;
      }),
      e
    );
  })(),
  fr = Object.assign(
    function (e) {
      if (Pe(e)) {
        _s === void 0 && mu();
        var t = _s.admit(e),
          r = Es.get(t);
        return r === void 0 && Es.set(t, (r = JSON.stringify(t))), r;
      }
      return JSON.stringify(e);
    },
    { reset: mu }
  ),
  _s,
  Es;
function mu() {
  (_s = new ws()), (Es = new (gr ? WeakMap : Map)());
}
function gu(e) {
  return [
    e.selectionSet,
    e.objectOrReference,
    e.context,
    e.context.canonizeResults,
  ];
}
var B0 = (function () {
  function e(t) {
    var r = this;
    (this.knownResults = new (gr ? WeakMap : Map)()),
      (this.config = Ji(t, {
        addTypename: t.addTypename !== !1,
        canonizeResults: uh(t),
      })),
      (this.canon = t.canon || new ws()),
      (this.executeSelectionSet = Si(
        function (n) {
          var i,
            o = n.context.canonizeResults,
            s = gu(n);
          s[3] = !o;
          var a = (i = r.executeSelectionSet).peek.apply(i, s);
          return a
            ? o
              ? R(R({}, a), { result: r.canon.admit(a.result) })
              : a
            : (vu(n.context.store, n.enclosingRef.__ref),
              r.execSelectionSetImpl(n));
        },
        {
          max: this.config.resultCacheMaxSize,
          keyArgs: gu,
          makeCacheKey: function (n, i, o, s) {
            if (_n(o.store))
              return o.store.makeCacheKey(
                n,
                me(i) ? i.__ref : i,
                o.varString,
                s
              );
          },
        }
      )),
      (this.executeSubSelectedArray = Si(
        function (n) {
          return (
            vu(n.context.store, n.enclosingRef.__ref),
            r.execSubSelectedArrayImpl(n)
          );
        },
        {
          max: this.config.resultCacheMaxSize,
          makeCacheKey: function (n) {
            var i = n.field,
              o = n.array,
              s = n.context;
            if (_n(s.store)) return s.store.makeCacheKey(i, o, s.varString);
          },
        }
      ));
  }
  return (
    (e.prototype.resetCanon = function () {
      this.canon = new ws();
    }),
    (e.prototype.diffQueryAgainstStore = function (t) {
      var r = t.store,
        n = t.query,
        i = t.rootId,
        o = i === void 0 ? "ROOT_QUERY" : i,
        s = t.variables,
        a = t.returnPartialData,
        u = a === void 0 ? !0 : a,
        c = t.canonizeResults,
        l = c === void 0 ? this.config.canonizeResults : c,
        f = this.config.cache.policies;
      s = R(R({}, la(db(n))), s);
      var h = Lr(o),
        d = this.executeSelectionSet({
          selectionSet: zi(n).selectionSet,
          objectOrReference: h,
          enclosingRef: h,
          context: R(
            {
              store: r,
              query: n,
              policies: f,
              variables: s,
              varString: fr(s),
              canonizeResults: l,
            },
            fh(n, this.config.fragments)
          ),
        }),
        y;
      if (d.missing && ((y = [new sh(Q0(d.missing), d.missing, n, s)]), !u))
        throw y[0];
      return { result: d.result, complete: !y, missing: y };
    }),
    (e.prototype.isFresh = function (t, r, n, i) {
      if (_n(i.store) && this.knownResults.get(t) === n) {
        var o = this.executeSelectionSet.peek(n, r, i, this.canon.isKnown(t));
        if (o && t === o.result) return !0;
      }
      return !1;
    }),
    (e.prototype.execSelectionSetImpl = function (t) {
      var r = this,
        n = t.selectionSet,
        i = t.objectOrReference,
        o = t.enclosingRef,
        s = t.context;
      if (
        me(i) &&
        !s.policies.rootTypenamesById[i.__ref] &&
        !s.store.has(i.__ref)
      )
        return {
          result: this.canon.empty,
          missing: "Dangling reference to missing ".concat(i.__ref, " object"),
        };
      var a = s.variables,
        u = s.policies,
        c = s.store,
        l = c.getFieldValue(i, "__typename"),
        f = [],
        h,
        d = new Gt();
      this.config.addTypename &&
        typeof l == "string" &&
        !u.rootIdsByTypename[l] &&
        f.push({ __typename: l });
      function y(v, _) {
        var S;
        return (
          v.missing && (h = d.merge(h, ((S = {}), (S[_] = v.missing), S))),
          v.result
        );
      }
      var b = new Set(n.selections);
      b.forEach(function (v) {
        var _, S;
        if (Ui(v, a))
          if (pr(v)) {
            var k = u.readField(
                {
                  fieldName: v.name.value,
                  field: v,
                  variables: s.variables,
                  from: i,
                },
                s
              ),
              T = zr(v);
            k === void 0
              ? jf.added(v) ||
                (h = d.merge(
                  h,
                  ((_ = {}),
                  (_[T] = "Can't find field '"
                    .concat(v.name.value, "' on ")
                    .concat(
                      me(i)
                        ? i.__ref + " object"
                        : "object " + JSON.stringify(i, null, 2)
                    )),
                  _)
                ))
              : xe(k)
              ? (k = y(
                  r.executeSubSelectedArray({
                    field: v,
                    array: k,
                    enclosingRef: o,
                    context: s,
                  }),
                  T
                ))
              : v.selectionSet
              ? k != null &&
                (k = y(
                  r.executeSelectionSet({
                    selectionSet: v.selectionSet,
                    objectOrReference: k,
                    enclosingRef: me(k) ? k : o,
                    context: s,
                  }),
                  T
                ))
              : s.canonizeResults && (k = r.canon.pass(k)),
              k !== void 0 && f.push(((S = {}), (S[T] = k), S));
          } else {
            var O = aa(v, s.lookupFragment);
            if (!O && v.kind === Ae.FRAGMENT_SPREAD) throw new Qe(5);
            O &&
              u.fragmentMatches(O, l) &&
              O.selectionSet.selections.forEach(b.add, b);
          }
      });
      var w = fa(f),
        m = { result: w, missing: h },
        p = s.canonizeResults ? this.canon.admit(m) : m;
      return p.result && this.knownResults.set(p.result, n), p;
    }),
    (e.prototype.execSubSelectedArrayImpl = function (t) {
      var r = this,
        n = t.field,
        i = t.array,
        o = t.enclosingRef,
        s = t.context,
        a,
        u = new Gt();
      function c(l, f) {
        var h;
        return (
          l.missing && (a = u.merge(a, ((h = {}), (h[f] = l.missing), h))),
          l.result
        );
      }
      return (
        n.selectionSet && (i = i.filter(s.store.canRead)),
        (i = i.map(function (l, f) {
          return l === null
            ? null
            : xe(l)
            ? c(
                r.executeSubSelectedArray({
                  field: n,
                  array: l,
                  enclosingRef: o,
                  context: s,
                }),
                f
              )
            : n.selectionSet
            ? c(
                r.executeSelectionSet({
                  selectionSet: n.selectionSet,
                  objectOrReference: l,
                  enclosingRef: me(l) ? l : o,
                  context: s,
                }),
                f
              )
            : l;
        })),
        { result: s.canonizeResults ? this.canon.admit(i) : i, missing: a }
      );
    }),
    e
  );
})();
function Q0(e) {
  try {
    JSON.stringify(e, function (t, r) {
      if (typeof r == "string") throw r;
      return r;
    });
  } catch (t) {
    return t;
  }
}
var ba = new Gi(),
  bu = new WeakMap();
function En(e) {
  var t = bu.get(e);
  return t || bu.set(e, (t = { vars: new Set(), dep: ih() })), t;
}
function wu(e) {
  En(e).vars.forEach(function (t) {
    return t.forgetCache(e);
  });
}
function U0(e) {
  En(e).vars.forEach(function (t) {
    return t.attachCache(e);
  });
}
function V0(e) {
  var t = new Set(),
    r = new Set(),
    n = function (o) {
      if (arguments.length > 0) {
        if (e !== o) {
          (e = o),
            t.forEach(function (u) {
              En(u).dep.dirty(n), W0(u);
            });
          var s = Array.from(r);
          r.clear(),
            s.forEach(function (u) {
              return u(e);
            });
        }
      } else {
        var a = ba.getValue();
        a && (i(a), En(a).dep(n));
      }
      return e;
    };
  n.onNextChange = function (o) {
    return (
      r.add(o),
      function () {
        r.delete(o);
      }
    );
  };
  var i = (n.attachCache = function (o) {
    return t.add(o), En(o).vars.add(n), n;
  });
  return (
    (n.forgetCache = function (o) {
      return t.delete(o);
    }),
    n
  );
}
function W0(e) {
  e.broadcastWatches && e.broadcastWatches();
}
var _u = Object.create(null);
function wa(e) {
  var t = JSON.stringify(e);
  return _u[t] || (_u[t] = Object.create(null));
}
function Eu(e) {
  var t = wa(e);
  return (
    t.keyFieldsFn ||
    (t.keyFieldsFn = function (r, n) {
      var i = function (s, a) {
          return n.readField(a, s);
        },
        o = (n.keyObject = _a(e, function (s) {
          var a = qr(n.storeObject, s, i);
          return (
            a === void 0 &&
              r !== n.storeObject &&
              Ie.call(r, s[0]) &&
              (a = qr(r, s, ph)),
            le(a !== void 0, 2),
            a
          );
        }));
      return "".concat(n.typename, ":").concat(JSON.stringify(o));
    })
  );
}
function Su(e) {
  var t = wa(e);
  return (
    t.keyArgsFn ||
    (t.keyArgsFn = function (r, n) {
      var i = n.field,
        o = n.variables,
        s = n.fieldName,
        a = _a(e, function (c) {
          var l = c[0],
            f = l.charAt(0);
          if (f === "@") {
            if (i && st(i.directives)) {
              var h = l.slice(1),
                d = i.directives.find(function (m) {
                  return m.name.value === h;
                }),
                y = d && Vi(d, o);
              return y && qr(y, c.slice(1));
            }
            return;
          }
          if (f === "$") {
            var b = l.slice(1);
            if (o && Ie.call(o, b)) {
              var w = c.slice(0);
              return (w[0] = b), qr(o, w);
            }
            return;
          }
          if (r) return qr(r, c);
        }),
        u = JSON.stringify(a);
      return (r || u !== "{}") && (s += ":" + u), s;
    })
  );
}
function _a(e, t) {
  var r = new Gt();
  return dh(e).reduce(function (n, i) {
    var o,
      s = t(i);
    if (s !== void 0) {
      for (var a = i.length - 1; a >= 0; --a) s = ((o = {}), (o[i[a]] = s), o);
      n = r.merge(n, s);
    }
    return n;
  }, Object.create(null));
}
function dh(e) {
  var t = wa(e);
  if (!t.paths) {
    var r = (t.paths = []),
      n = [];
    e.forEach(function (i, o) {
      xe(i)
        ? (dh(i).forEach(function (s) {
            return r.push(n.concat(s));
          }),
          (n.length = 0))
        : (n.push(i), xe(e[o + 1]) || (r.push(n.slice(0)), (n.length = 0)));
    });
  }
  return t.paths;
}
function ph(e, t) {
  return e[t];
}
function qr(e, t, r) {
  return (
    (r = r || ph),
    yh(
      t.reduce(function n(i, o) {
        return xe(i)
          ? i.map(function (s) {
              return n(s, o);
            })
          : i && r(i, o);
      }, e)
    )
  );
}
function yh(e) {
  return Pe(e)
    ? xe(e)
      ? e.map(yh)
      : _a(Object.keys(e).sort(), function (t) {
          return qr(e, t);
        })
    : e;
}
ca.setStringify(fr);
function Ss(e) {
  return e.args !== void 0 ? e.args : e.field ? Vi(e.field, e.variables) : null;
}
var z0 = function () {},
  Ou = function (e, t) {
    return t.fieldName;
  },
  Tu = function (e, t, r) {
    var n = r.mergeObjects;
    return n(e, t);
  },
  ku = function (e, t) {
    return t;
  },
  K0 = (function () {
    function e(t) {
      (this.config = t),
        (this.typePolicies = Object.create(null)),
        (this.toBeAdded = Object.create(null)),
        (this.supertypeMap = new Map()),
        (this.fuzzySubtypes = new Map()),
        (this.rootIdsByTypename = Object.create(null)),
        (this.rootTypenamesById = Object.create(null)),
        (this.usingPossibleTypes = !1),
        (this.config = R({ dataIdFromObject: ah }, t)),
        (this.cache = this.config.cache),
        this.setRootTypename("Query"),
        this.setRootTypename("Mutation"),
        this.setRootTypename("Subscription"),
        t.possibleTypes && this.addPossibleTypes(t.possibleTypes),
        t.typePolicies && this.addTypePolicies(t.typePolicies);
    }
    return (
      (e.prototype.identify = function (t, r) {
        var n,
          i = this,
          o =
            (r &&
              (r.typename ||
                ((n = r.storeObject) === null || n === void 0
                  ? void 0
                  : n.__typename))) ||
            t.__typename;
        if (o === this.rootTypenamesById.ROOT_QUERY) return ["ROOT_QUERY"];
        for (
          var s = (r && r.storeObject) || t,
            a = R(R({}, r), {
              typename: o,
              storeObject: s,
              readField:
                (r && r.readField) ||
                function () {
                  var h = Ea(arguments, s);
                  return i.readField(h, {
                    store: i.cache.data,
                    variables: h.variables,
                  });
                },
            }),
            u,
            c = o && this.getTypePolicy(o),
            l = (c && c.keyFn) || this.config.dataIdFromObject;
          l;

        ) {
          var f = l(t, a);
          if (xe(f)) l = Eu(f);
          else {
            u = f;
            break;
          }
        }
        return (
          (u = u ? String(u) : void 0), a.keyObject ? [u, a.keyObject] : [u]
        );
      }),
      (e.prototype.addTypePolicies = function (t) {
        var r = this;
        Object.keys(t).forEach(function (n) {
          var i = t[n],
            o = i.queryType,
            s = i.mutationType,
            a = i.subscriptionType,
            u = dr(i, ["queryType", "mutationType", "subscriptionType"]);
          o && r.setRootTypename("Query", n),
            s && r.setRootTypename("Mutation", n),
            a && r.setRootTypename("Subscription", n),
            Ie.call(r.toBeAdded, n)
              ? r.toBeAdded[n].push(u)
              : (r.toBeAdded[n] = [u]);
        });
      }),
      (e.prototype.updateTypePolicy = function (t, r) {
        var n = this,
          i = this.getTypePolicy(t),
          o = r.keyFields,
          s = r.fields;
        function a(u, c) {
          u.merge =
            typeof c == "function"
              ? c
              : c === !0
              ? Tu
              : c === !1
              ? ku
              : u.merge;
        }
        a(i, r.merge),
          (i.keyFn =
            o === !1
              ? z0
              : xe(o)
              ? Eu(o)
              : typeof o == "function"
              ? o
              : i.keyFn),
          s &&
            Object.keys(s).forEach(function (u) {
              var c = n.getFieldPolicy(t, u, !0),
                l = s[u];
              if (typeof l == "function") c.read = l;
              else {
                var f = l.keyArgs,
                  h = l.read,
                  d = l.merge;
                (c.keyFn =
                  f === !1
                    ? Ou
                    : xe(f)
                    ? Su(f)
                    : typeof f == "function"
                    ? f
                    : c.keyFn),
                  typeof h == "function" && (c.read = h),
                  a(c, d);
              }
              c.read && c.merge && (c.keyFn = c.keyFn || Ou);
            });
      }),
      (e.prototype.setRootTypename = function (t, r) {
        r === void 0 && (r = t);
        var n = "ROOT_" + t.toUpperCase(),
          i = this.rootTypenamesById[n];
        r !== i &&
          (le(!i || i === t, 3),
          i && delete this.rootIdsByTypename[i],
          (this.rootIdsByTypename[r] = n),
          (this.rootTypenamesById[n] = r));
      }),
      (e.prototype.addPossibleTypes = function (t) {
        var r = this;
        (this.usingPossibleTypes = !0),
          Object.keys(t).forEach(function (n) {
            r.getSupertypeSet(n, !0),
              t[n].forEach(function (i) {
                r.getSupertypeSet(i, !0).add(n);
                var o = i.match(lh);
                (!o || o[0] !== i) && r.fuzzySubtypes.set(i, new RegExp(i));
              });
          });
      }),
      (e.prototype.getTypePolicy = function (t) {
        var r = this;
        if (!Ie.call(this.typePolicies, t)) {
          var n = (this.typePolicies[t] = Object.create(null));
          n.fields = Object.create(null);
          var i = this.supertypeMap.get(t);
          i &&
            i.size &&
            i.forEach(function (s) {
              var a = r.getTypePolicy(s),
                u = a.fields,
                c = dr(a, ["fields"]);
              Object.assign(n, c), Object.assign(n.fields, u);
            });
        }
        var o = this.toBeAdded[t];
        return (
          o &&
            o.length &&
            o.splice(0).forEach(function (s) {
              r.updateTypePolicy(t, s);
            }),
          this.typePolicies[t]
        );
      }),
      (e.prototype.getFieldPolicy = function (t, r, n) {
        if (t) {
          var i = this.getTypePolicy(t).fields;
          return i[r] || (n && (i[r] = Object.create(null)));
        }
      }),
      (e.prototype.getSupertypeSet = function (t, r) {
        var n = this.supertypeMap.get(t);
        return !n && r && this.supertypeMap.set(t, (n = new Set())), n;
      }),
      (e.prototype.fragmentMatches = function (t, r, n, i) {
        var o = this;
        if (!t.typeCondition) return !0;
        if (!r) return !1;
        var s = t.typeCondition.name.value;
        if (r === s) return !0;
        if (this.usingPossibleTypes && this.supertypeMap.has(s))
          for (
            var a = this.getSupertypeSet(r, !0),
              u = [a],
              c = function (d) {
                var y = o.getSupertypeSet(d, !1);
                y && y.size && u.indexOf(y) < 0 && u.push(y);
              },
              l = !!(n && this.fuzzySubtypes.size),
              f = 0;
            f < u.length;
            ++f
          ) {
            var h = u[f];
            if (h.has(s)) return a.has(s) || a.add(s), !0;
            h.forEach(c),
              l &&
                f === u.length - 1 &&
                bs(t.selectionSet, n, i) &&
                ((l = !1),
                this.fuzzySubtypes.forEach(function (d, y) {
                  var b = r.match(d);
                  b && b[0] === r && c(y);
                }));
          }
        return !1;
      }),
      (e.prototype.hasKeyArgs = function (t, r) {
        var n = this.getFieldPolicy(t, r, !1);
        return !!(n && n.keyFn);
      }),
      (e.prototype.getStoreFieldName = function (t) {
        var r = t.typename,
          n = t.fieldName,
          i = this.getFieldPolicy(r, n, !1),
          o,
          s = i && i.keyFn;
        if (s && r)
          for (
            var a = {
                typename: r,
                fieldName: n,
                field: t.field || null,
                variables: t.variables,
              },
              u = Ss(t);
            s;

          ) {
            var c = s(u, a);
            if (xe(c)) s = Su(c);
            else {
              o = c || n;
              break;
            }
          }
        return (
          o === void 0 &&
            (o = t.field ? ub(t.field, t.variables) : ca(n, Ss(t))),
          o === !1 ? n : n === Gr(o) ? o : n + ":" + o
        );
      }),
      (e.prototype.readField = function (t, r) {
        var n = t.from;
        if (n) {
          var i = t.field || t.fieldName;
          if (i) {
            if (t.typename === void 0) {
              var o = r.store.getFieldValue(n, "__typename");
              o && (t.typename = o);
            }
            var s = this.getStoreFieldName(t),
              a = Gr(s),
              u = r.store.getFieldValue(n, s),
              c = this.getFieldPolicy(t.typename, a, !1),
              l = c && c.read;
            if (l) {
              var f = Ru(
                this,
                n,
                t,
                r,
                r.store.getStorage(me(n) ? n.__ref : n, s)
              );
              return ba.withValue(this.cache, l, [u, f]);
            }
            return u;
          }
        }
      }),
      (e.prototype.getReadFunction = function (t, r) {
        var n = this.getFieldPolicy(t, r, !1);
        return n && n.read;
      }),
      (e.prototype.getMergeFunction = function (t, r, n) {
        var i = this.getFieldPolicy(t, r, !1),
          o = i && i.merge;
        return !o && n && ((i = this.getTypePolicy(n)), (o = i && i.merge)), o;
      }),
      (e.prototype.runMergeFunction = function (t, r, n, i, o) {
        var s = n.field,
          a = n.typename,
          u = n.merge;
        return u === Tu
          ? vh(i.store)(t, r)
          : u === ku
          ? r
          : (i.overwrite && (t = void 0),
            u(
              t,
              r,
              Ru(
                this,
                void 0,
                {
                  typename: a,
                  fieldName: s.name.value,
                  field: s,
                  variables: i.variables,
                },
                i,
                o || Object.create(null)
              )
            ));
      }),
      e
    );
  })();
function Ru(e, t, r, n, i) {
  var o = e.getStoreFieldName(r),
    s = Gr(o),
    a = r.variables || n.variables,
    u = n.store,
    c = u.toReference,
    l = u.canRead;
  return {
    args: Ss(r),
    field: r.field || null,
    fieldName: s,
    storeFieldName: o,
    variables: a,
    isReference: me,
    toReference: c,
    storage: i,
    cache: e.cache,
    canRead: l,
    readField: function () {
      return e.readField(Ea(arguments, t, a), n);
    },
    mergeObjects: vh(n.store),
  };
}
function Ea(e, t, r) {
  var n = e[0],
    i = e[1],
    o = e.length,
    s;
  return (
    typeof n == "string"
      ? (s = { fieldName: n, from: o > 1 ? i : t })
      : ((s = R({}, n)), Ie.call(s, "from") || (s.from = t)),
    s.variables === void 0 && (s.variables = r),
    s
  );
}
function vh(e) {
  return function (r, n) {
    if (xe(r) || xe(n)) throw new Qe(4);
    if (Pe(r) && Pe(n)) {
      var i = e.getFieldValue(r, "__typename"),
        o = e.getFieldValue(n, "__typename"),
        s = i && o && i !== o;
      if (s) return n;
      if (me(r) && Cr(n)) return e.merge(r.__ref, n), r;
      if (Cr(r) && me(n)) return e.merge(r, n.__ref), n;
      if (Cr(r) && Cr(n)) return R(R({}, r), n);
    }
    return n;
  };
}
function ko(e, t, r) {
  var n = "".concat(t).concat(r),
    i = e.flavors.get(n);
  return (
    i ||
      e.flavors.set(
        n,
        (i =
          e.clientOnly === t && e.deferred === r
            ? e
            : R(R({}, e), { clientOnly: t, deferred: r }))
      ),
    i
  );
}
var J0 = (function () {
    function e(t, r, n) {
      (this.cache = t), (this.reader = r), (this.fragments = n);
    }
    return (
      (e.prototype.writeToStore = function (t, r) {
        var n = this,
          i = r.query,
          o = r.result,
          s = r.dataId,
          a = r.variables,
          u = r.overwrite,
          c = jn(i),
          l = j0();
        a = R(R({}, la(c)), a);
        var f = R(
            R(
              {
                store: t,
                written: Object.create(null),
                merge: function (d, y) {
                  return l.merge(d, y);
                },
                variables: a,
                varString: fr(a),
              },
              fh(i, this.fragments)
            ),
            {
              overwrite: !!u,
              incomingById: new Map(),
              clientOnly: !1,
              deferred: !1,
              flavors: new Map(),
            }
          ),
          h = this.processSelectionSet({
            result: o || Object.create(null),
            dataId: s,
            selectionSet: c.selectionSet,
            mergeTree: { map: new Map() },
            context: f,
          });
        if (!me(h)) throw new Qe(7);
        return (
          f.incomingById.forEach(function (d, y) {
            var b = d.storeObject,
              w = d.mergeTree;
            d.fieldNodeSet;
            var m = Lr(y);
            if (w && w.map.size) {
              var p = n.applyMerges(w, m, b, f);
              if (me(p)) return;
              b = p;
            }
            t.merge(y, b);
          }),
          t.retain(h.__ref),
          h
        );
      }),
      (e.prototype.processSelectionSet = function (t) {
        var r = this,
          n = t.dataId,
          i = t.result,
          o = t.selectionSet,
          s = t.context,
          a = t.mergeTree,
          u = this.cache.policies,
          c = Object.create(null),
          l =
            (n && u.rootTypenamesById[n]) ||
            cs(i, o, s.fragmentMap) ||
            (n && s.store.get(n, "__typename"));
        typeof l == "string" && (c.__typename = l);
        var f = function () {
            var v = Ea(arguments, c, s.variables);
            if (me(v.from)) {
              var _ = s.incomingById.get(v.from.__ref);
              if (_) {
                var S = u.readField(R(R({}, v), { from: _.storeObject }), s);
                if (S !== void 0) return S;
              }
            }
            return u.readField(v, s);
          },
          h = new Set();
        this.flattenFields(o, i, s, l).forEach(function (v, _) {
          var S,
            k = zr(_),
            T = i[k];
          if ((h.add(_), T !== void 0)) {
            var O = u.getStoreFieldName({
                typename: l,
                fieldName: _.name.value,
                field: _,
                variables: v.variables,
              }),
              M = Cu(a, O),
              L = r.processFieldValue(
                T,
                _,
                _.selectionSet ? ko(v, !1, !1) : v,
                M
              ),
              Q = void 0;
            _.selectionSet && (me(L) || Cr(L)) && (Q = f("__typename", L));
            var q = u.getMergeFunction(l, _.name.value, Q);
            q ? (M.info = { field: _, typename: l, merge: q }) : Pu(a, O),
              (c = v.merge(c, ((S = {}), (S[O] = L), S)));
          }
        });
        try {
          var d = u.identify(i, {
              typename: l,
              selectionSet: o,
              fragmentMap: s.fragmentMap,
              storeObject: c,
              readField: f,
            }),
            y = d[0],
            b = d[1];
          (n = n || y), b && (c = s.merge(c, b));
        } catch (v) {
          if (!n) throw v;
        }
        if (typeof n == "string") {
          var w = Lr(n),
            m = s.written[n] || (s.written[n] = []);
          if (
            m.indexOf(o) >= 0 ||
            (m.push(o), this.reader && this.reader.isFresh(i, w, o, s))
          )
            return w;
          var p = s.incomingById.get(n);
          return (
            p
              ? ((p.storeObject = s.merge(p.storeObject, c)),
                (p.mergeTree = Os(p.mergeTree, a)),
                h.forEach(function (v) {
                  return p.fieldNodeSet.add(v);
                }))
              : s.incomingById.set(n, {
                  storeObject: c,
                  mergeTree: Oi(a) ? void 0 : a,
                  fieldNodeSet: h,
                }),
            w
          );
        }
        return c;
      }),
      (e.prototype.processFieldValue = function (t, r, n, i) {
        var o = this;
        return !r.selectionSet || t === null
          ? t
          : xe(t)
          ? t.map(function (s, a) {
              var u = o.processFieldValue(s, r, n, Cu(i, a));
              return Pu(i, a), u;
            })
          : this.processSelectionSet({
              result: t,
              selectionSet: r.selectionSet,
              context: n,
              mergeTree: i,
            });
      }),
      (e.prototype.flattenFields = function (t, r, n, i) {
        i === void 0 && (i = cs(r, t, n.fragmentMap));
        var o = new Map(),
          s = this.cache.policies,
          a = new qn(!1);
        return (
          (function u(c, l) {
            var f = a.lookup(c, l.clientOnly, l.deferred);
            f.visited ||
              ((f.visited = !0),
              c.selections.forEach(function (h) {
                if (Ui(h, n.variables)) {
                  var d = l.clientOnly,
                    y = l.deferred;
                  if (
                    (!(d && y) &&
                      st(h.directives) &&
                      h.directives.forEach(function (m) {
                        var p = m.name.value;
                        if ((p === "client" && (d = !0), p === "defer")) {
                          var v = Vi(m, n.variables);
                          (!v || v.if !== !1) && (y = !0);
                        }
                      }),
                    pr(h))
                  ) {
                    var b = o.get(h);
                    b && ((d = d && b.clientOnly), (y = y && b.deferred)),
                      o.set(h, ko(n, d, y));
                  } else {
                    var w = aa(h, n.lookupFragment);
                    if (!w && h.kind === Ae.FRAGMENT_SPREAD) throw new Qe(8);
                    w &&
                      s.fragmentMatches(w, i, r, n.variables) &&
                      u(w.selectionSet, ko(n, d, y));
                  }
                }
              }));
          })(t, n),
          o
        );
      }),
      (e.prototype.applyMerges = function (t, r, n, i, o) {
        var s,
          a = this;
        if (t.map.size && !me(n)) {
          var u = !xe(n) && (me(r) || Cr(r)) ? r : void 0,
            c = n;
          u && !o && (o = [me(u) ? u.__ref : u]);
          var l,
            f = function (h, d) {
              return xe(h)
                ? typeof d == "number"
                  ? h[d]
                  : void 0
                : i.store.getFieldValue(h, String(d));
            };
          t.map.forEach(function (h, d) {
            var y = f(u, d),
              b = f(c, d);
            if (b !== void 0) {
              o && o.push(d);
              var w = a.applyMerges(h, y, b, i, o);
              w !== b && ((l = l || new Map()), l.set(d, w)),
                o && le(o.pop() === d);
            }
          }),
            l &&
              ((n = xe(c) ? c.slice(0) : R({}, c)),
              l.forEach(function (h, d) {
                n[d] = h;
              }));
        }
        return t.info
          ? this.cache.policies.runMergeFunction(
              r,
              n,
              t.info,
              i,
              o && (s = i.store).getStorage.apply(s, o)
            )
          : n;
      }),
      e
    );
  })(),
  mh = [];
function Cu(e, t) {
  var r = e.map;
  return r.has(t) || r.set(t, mh.pop() || { map: new Map() }), r.get(t);
}
function Os(e, t) {
  if (e === t || !t || Oi(t)) return e;
  if (!e || Oi(e)) return t;
  var r = e.info && t.info ? R(R({}, e.info), t.info) : e.info || t.info,
    n = e.map.size && t.map.size,
    i = n ? new Map() : e.map.size ? e.map : t.map,
    o = { info: r, map: i };
  if (n) {
    var s = new Set(t.map.keys());
    e.map.forEach(function (a, u) {
      o.map.set(u, Os(a, t.map.get(u))), s.delete(u);
    }),
      s.forEach(function (a) {
        o.map.set(a, Os(t.map.get(a), e.map.get(a)));
      });
  }
  return o;
}
function Oi(e) {
  return !e || !(e.info || e.map.size);
}
function Pu(e, t) {
  var r = e.map,
    n = r.get(t);
  n && Oi(n) && (mh.push(n), r.delete(t));
}
var G0 = (function (e) {
  Xe(t, e);
  function t(r) {
    r === void 0 && (r = {});
    var n = e.call(this) || this;
    return (
      (n.watches = new Set()),
      (n.typenameDocumentCache = new Map()),
      (n.makeVar = V0),
      (n.txCount = 0),
      (n.config = L0(r)),
      (n.addTypename = !!n.config.addTypename),
      (n.policies = new K0({
        cache: n,
        dataIdFromObject: n.config.dataIdFromObject,
        possibleTypes: n.config.possibleTypes,
        typePolicies: n.config.typePolicies,
      })),
      n.init(),
      n
    );
  }
  return (
    (t.prototype.init = function () {
      var r = (this.data = new In.Root({
        policies: this.policies,
        resultCaching: this.config.resultCaching,
      }));
      (this.optimisticData = r.stump), this.resetResultCache();
    }),
    (t.prototype.resetResultCache = function (r) {
      var n = this,
        i = this.storeReader,
        o = this.config.fragments;
      (this.storeWriter = new J0(
        this,
        (this.storeReader = new B0({
          cache: this,
          addTypename: this.addTypename,
          resultCacheMaxSize: this.config.resultCacheMaxSize,
          canonizeResults: uh(this.config),
          canon: r ? void 0 : i && i.canon,
          fragments: o,
        })),
        o
      )),
        (this.maybeBroadcastWatch = Si(
          function (s, a) {
            return n.broadcastWatch(s, a);
          },
          {
            max: this.config.resultCacheMaxSize,
            makeCacheKey: function (s) {
              var a = s.optimistic ? n.optimisticData : n.data;
              if (_n(a)) {
                var u = s.optimistic,
                  c = s.id,
                  l = s.variables;
                return a.makeCacheKey(
                  s.query,
                  s.callback,
                  fr({ optimistic: u, id: c, variables: l })
                );
              }
            },
          }
        )),
        new Set([this.data.group, this.optimisticData.group]).forEach(function (
          s
        ) {
          return s.resetCaching();
        });
    }),
    (t.prototype.restore = function (r) {
      return this.init(), r && this.data.replace(r), this;
    }),
    (t.prototype.extract = function (r) {
      return (
        r === void 0 && (r = !1),
        (r ? this.optimisticData : this.data).extract()
      );
    }),
    (t.prototype.read = function (r) {
      var n = r.returnPartialData,
        i = n === void 0 ? !1 : n;
      try {
        return (
          this.storeReader.diffQueryAgainstStore(
            R(R({}, r), {
              store: r.optimistic ? this.optimisticData : this.data,
              config: this.config,
              returnPartialData: i,
            })
          ).result || null
        );
      } catch (o) {
        if (o instanceof sh) return null;
        throw o;
      }
    }),
    (t.prototype.write = function (r) {
      try {
        return ++this.txCount, this.storeWriter.writeToStore(this.data, r);
      } finally {
        !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
      }
    }),
    (t.prototype.modify = function (r) {
      if (Ie.call(r, "id") && !r.id) return !1;
      var n = r.optimistic ? this.optimisticData : this.data;
      try {
        return ++this.txCount, n.modify(r.id || "ROOT_QUERY", r.fields);
      } finally {
        !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
      }
    }),
    (t.prototype.diff = function (r) {
      return this.storeReader.diffQueryAgainstStore(
        R(R({}, r), {
          store: r.optimistic ? this.optimisticData : this.data,
          rootId: r.id || "ROOT_QUERY",
          config: this.config,
        })
      );
    }),
    (t.prototype.watch = function (r) {
      var n = this;
      return (
        this.watches.size || U0(this),
        this.watches.add(r),
        r.immediate && this.maybeBroadcastWatch(r),
        function () {
          n.watches.delete(r) && !n.watches.size && wu(n),
            n.maybeBroadcastWatch.forget(r);
        }
      );
    }),
    (t.prototype.gc = function (r) {
      fr.reset();
      var n = this.optimisticData.gc();
      return (
        r &&
          !this.txCount &&
          (r.resetResultCache
            ? this.resetResultCache(r.resetResultIdentities)
            : r.resetResultIdentities && this.storeReader.resetCanon()),
        n
      );
    }),
    (t.prototype.retain = function (r, n) {
      return (n ? this.optimisticData : this.data).retain(r);
    }),
    (t.prototype.release = function (r, n) {
      return (n ? this.optimisticData : this.data).release(r);
    }),
    (t.prototype.identify = function (r) {
      if (me(r)) return r.__ref;
      try {
        return this.policies.identify(r)[0];
      } catch {}
    }),
    (t.prototype.evict = function (r) {
      if (!r.id) {
        if (Ie.call(r, "id")) return !1;
        r = R(R({}, r), { id: "ROOT_QUERY" });
      }
      try {
        return ++this.txCount, this.optimisticData.evict(r, this.data);
      } finally {
        !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
      }
    }),
    (t.prototype.reset = function (r) {
      var n = this;
      return (
        this.init(),
        fr.reset(),
        r && r.discardWatches
          ? (this.watches.forEach(function (i) {
              return n.maybeBroadcastWatch.forget(i);
            }),
            this.watches.clear(),
            wu(this))
          : this.broadcastWatches(),
        Promise.resolve()
      );
    }),
    (t.prototype.removeOptimistic = function (r) {
      var n = this.optimisticData.removeLayer(r);
      n !== this.optimisticData &&
        ((this.optimisticData = n), this.broadcastWatches());
    }),
    (t.prototype.batch = function (r) {
      var n = this,
        i = r.update,
        o = r.optimistic,
        s = o === void 0 ? !0 : o,
        a = r.removeOptimistic,
        u = r.onWatchUpdated,
        c,
        l = function (h) {
          var d = n,
            y = d.data,
            b = d.optimisticData;
          ++n.txCount, h && (n.data = n.optimisticData = h);
          try {
            return (c = i(n));
          } finally {
            --n.txCount, (n.data = y), (n.optimisticData = b);
          }
        },
        f = new Set();
      return (
        u &&
          !this.txCount &&
          this.broadcastWatches(
            R(R({}, r), {
              onWatchUpdated: function (h) {
                return f.add(h), !1;
              },
            })
          ),
        typeof s == "string"
          ? (this.optimisticData = this.optimisticData.addLayer(s, l))
          : s === !1
          ? l(this.data)
          : l(),
        typeof a == "string" &&
          (this.optimisticData = this.optimisticData.removeLayer(a)),
        u && f.size
          ? (this.broadcastWatches(
              R(R({}, r), {
                onWatchUpdated: function (h, d) {
                  var y = u.call(this, h, d);
                  return y !== !1 && f.delete(h), y;
                },
              })
            ),
            f.size &&
              f.forEach(function (h) {
                return n.maybeBroadcastWatch.dirty(h);
              }))
          : this.broadcastWatches(r),
        c
      );
    }),
    (t.prototype.performTransaction = function (r, n) {
      return this.batch({ update: r, optimistic: n || n !== null });
    }),
    (t.prototype.transformDocument = function (r) {
      if (this.addTypename) {
        var n = this.typenameDocumentCache.get(r);
        return (
          n ||
            ((n = jf(r)),
            this.typenameDocumentCache.set(r, n),
            this.typenameDocumentCache.set(n, n)),
          n
        );
      }
      return r;
    }),
    (t.prototype.transformForLink = function (r) {
      var n = this.config.fragments;
      return n ? n.transform(r) : r;
    }),
    (t.prototype.broadcastWatches = function (r) {
      var n = this;
      this.txCount ||
        this.watches.forEach(function (i) {
          return n.maybeBroadcastWatch(i, r);
        });
    }),
    (t.prototype.broadcastWatch = function (r, n) {
      var i = r.lastDiff,
        o = this.diff(r);
      (n &&
        (r.optimistic &&
          typeof n.optimistic == "string" &&
          (o.fromOptimisticTransaction = !0),
        n.onWatchUpdated && n.onWatchUpdated.call(this, r, o, i) === !1)) ||
        ((!i || !Me(i.result, o.result)) && r.callback((r.lastDiff = o), i));
    }),
    t
  );
})(M0);
function Y0(e) {
  return e.hasOwnProperty("graphQLErrors");
}
var X0 = function (e) {
    var t = "";
    if (st(e.graphQLErrors) || st(e.clientErrors)) {
      var r = (e.graphQLErrors || []).concat(e.clientErrors || []);
      r.forEach(function (n) {
        var i = n ? n.message : "Error message not found.";
        t += "".concat(
          i,
          `
`
        );
      });
    }
    return (
      e.networkError &&
        (t += "".concat(
          e.networkError.message,
          `
`
        )),
      (t = t.replace(/\n$/, "")),
      t
    );
  },
  ir = (function (e) {
    Xe(t, e);
    function t(r) {
      var n = r.graphQLErrors,
        i = r.clientErrors,
        o = r.networkError,
        s = r.errorMessage,
        a = r.extraInfo,
        u = e.call(this, s) || this;
      return (
        (u.name = "ApolloError"),
        (u.graphQLErrors = n || []),
        (u.clientErrors = i || []),
        (u.networkError = o || null),
        (u.message = s || X0(u)),
        (u.extraInfo = a),
        (u.__proto__ = t.prototype),
        u
      );
    }
    return t;
  })(Error),
  de;
(function (e) {
  (e[(e.loading = 1)] = "loading"),
    (e[(e.setVariables = 2)] = "setVariables"),
    (e[(e.fetchMore = 3)] = "fetchMore"),
    (e[(e.refetch = 4)] = "refetch"),
    (e[(e.poll = 6)] = "poll"),
    (e[(e.ready = 7)] = "ready"),
    (e[(e.error = 8)] = "error");
})(de || (de = {}));
function An(e) {
  return e ? e < 7 : !1;
}
var Z0 = Object.assign,
  Ts = (function (e) {
    Xe(t, e);
    function t(r) {
      var n = r.queryManager,
        i = r.queryInfo,
        o = r.options,
        s =
          e.call(this, function (w) {
            try {
              var m = w._subscription._observer;
              m && !m.error && (m.error = ew);
            } catch {}
            var p = !s.observers.size;
            s.observers.add(w);
            var v = s.last;
            return (
              v && v.error
                ? w.error && w.error(v.error)
                : v && v.result && w.next && w.next(v.result),
              p && s.reobserve().catch(function () {}),
              function () {
                s.observers.delete(w) && !s.observers.size && s.tearDownQuery();
              }
            );
          }) || this;
      (s.observers = new Set()),
        (s.subscriptions = new Set()),
        (s.queryInfo = i),
        (s.queryManager = n),
        (s.isTornDown = !1);
      var a = n.defaultOptions.watchQuery,
        u = a === void 0 ? {} : a,
        c = u.fetchPolicy,
        l = c === void 0 ? "cache-first" : c,
        f = o.fetchPolicy,
        h = f === void 0 ? l : f,
        d = o.initialFetchPolicy,
        y = d === void 0 ? (h === "standby" ? l : h) : d;
      (s.options = R(R({}, o), { initialFetchPolicy: y, fetchPolicy: h })),
        (s.queryId = i.queryId || n.generateQueryId());
      var b = jn(s.query);
      return (s.queryName = b && b.name && b.name.value), s;
    }
    return (
      Object.defineProperty(t.prototype, "query", {
        get: function () {
          return this.queryManager.transform(this.options.query).document;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "variables", {
        get: function () {
          return this.options.variables;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.result = function () {
        var r = this;
        return new Promise(function (n, i) {
          var o = {
              next: function (a) {
                n(a),
                  r.observers.delete(o),
                  r.observers.size || r.queryManager.removeQuery(r.queryId),
                  setTimeout(function () {
                    s.unsubscribe();
                  }, 0);
              },
              error: i,
            },
            s = r.subscribe(o);
        });
      }),
      (t.prototype.getCurrentResult = function (r) {
        r === void 0 && (r = !0);
        var n = this.getLastResult(!0),
          i =
            this.queryInfo.networkStatus || (n && n.networkStatus) || de.ready,
          o = R(R({}, n), { loading: An(i), networkStatus: i }),
          s = this.options.fetchPolicy,
          a = s === void 0 ? "cache-first" : s;
        if (
          !(
            a === "network-only" ||
            a === "no-cache" ||
            a === "standby" ||
            this.queryManager.transform(this.options.query).hasForcedResolvers
          )
        ) {
          var u = this.queryInfo.getDiff();
          (u.complete || this.options.returnPartialData) && (o.data = u.result),
            Me(o.data, {}) && (o.data = void 0),
            u.complete
              ? (delete o.partial,
                u.complete &&
                  o.networkStatus === de.loading &&
                  (a === "cache-first" || a === "cache-only") &&
                  ((o.networkStatus = de.ready), (o.loading = !1)))
              : (o.partial = !0);
        }
        return r && this.updateLastResult(o), o;
      }),
      (t.prototype.isDifferentFromLastResult = function (r, n) {
        return (
          !this.last ||
          !Me(this.last.result, r) ||
          (n && !Me(this.last.variables, n))
        );
      }),
      (t.prototype.getLast = function (r, n) {
        var i = this.last;
        if (i && i[r] && (!n || Me(i.variables, this.variables))) return i[r];
      }),
      (t.prototype.getLastResult = function (r) {
        return this.getLast("result", r);
      }),
      (t.prototype.getLastError = function (r) {
        return this.getLast("error", r);
      }),
      (t.prototype.resetLastResults = function () {
        delete this.last, (this.isTornDown = !1);
      }),
      (t.prototype.resetQueryStoreErrors = function () {
        this.queryManager.resetErrors(this.queryId);
      }),
      (t.prototype.refetch = function (r) {
        var n = { pollInterval: 0 },
          i = this.options.fetchPolicy;
        return (
          i === "cache-and-network"
            ? (n.fetchPolicy = i)
            : i === "no-cache"
            ? (n.fetchPolicy = "no-cache")
            : (n.fetchPolicy = "network-only"),
          r &&
            !Me(this.options.variables, r) &&
            (n.variables = this.options.variables =
              R(R({}, this.options.variables), r)),
          this.queryInfo.resetLastWrite(),
          this.reobserve(n, de.refetch)
        );
      }),
      (t.prototype.fetchMore = function (r) {
        var n = this,
          i = R(
            R(
              {},
              r.query
                ? r
                : R(R(R(R({}, this.options), { query: this.query }), r), {
                    variables: R(R({}, this.options.variables), r.variables),
                  })
            ),
            { fetchPolicy: "no-cache" }
          ),
          o = this.queryManager.generateQueryId(),
          s = this.queryInfo,
          a = s.networkStatus;
        (s.networkStatus = de.fetchMore),
          i.notifyOnNetworkStatusChange && this.observe();
        var u = new Set();
        return this.queryManager
          .fetchQuery(o, i, de.fetchMore)
          .then(function (c) {
            return (
              n.queryManager.removeQuery(o),
              s.networkStatus === de.fetchMore && (s.networkStatus = a),
              n.queryManager.cache.batch({
                update: function (l) {
                  var f = r.updateQuery;
                  f
                    ? l.updateQuery(
                        {
                          query: n.query,
                          variables: n.variables,
                          returnPartialData: !0,
                          optimistic: !1,
                        },
                        function (h) {
                          return f(h, {
                            fetchMoreResult: c.data,
                            variables: i.variables,
                          });
                        }
                      )
                    : l.writeQuery({
                        query: i.query,
                        variables: i.variables,
                        data: c.data,
                      });
                },
                onWatchUpdated: function (l) {
                  u.add(l.query);
                },
              }),
              c
            );
          })
          .finally(function () {
            u.has(n.query) || gh(n);
          });
      }),
      (t.prototype.subscribeToMore = function (r) {
        var n = this,
          i = this.queryManager
            .startGraphQLSubscription({
              query: r.document,
              variables: r.variables,
              context: r.context,
            })
            .subscribe({
              next: function (o) {
                var s = r.updateQuery;
                s &&
                  n.updateQuery(function (a, u) {
                    var c = u.variables;
                    return s(a, { subscriptionData: o, variables: c });
                  });
              },
              error: function (o) {
                if (r.onError) {
                  r.onError(o);
                  return;
                }
              },
            });
        return (
          this.subscriptions.add(i),
          function () {
            n.subscriptions.delete(i) && i.unsubscribe();
          }
        );
      }),
      (t.prototype.setOptions = function (r) {
        return this.reobserve(r);
      }),
      (t.prototype.setVariables = function (r) {
        return Me(this.variables, r)
          ? this.observers.size
            ? this.result()
            : Promise.resolve()
          : ((this.options.variables = r),
            this.observers.size
              ? this.reobserve(
                  {
                    fetchPolicy: this.options.initialFetchPolicy,
                    variables: r,
                  },
                  de.setVariables
                )
              : Promise.resolve());
      }),
      (t.prototype.updateQuery = function (r) {
        var n = this.queryManager,
          i = n.cache.diff({
            query: this.options.query,
            variables: this.variables,
            returnPartialData: !0,
            optimistic: !1,
          }).result,
          o = r(i, { variables: this.variables });
        o &&
          (n.cache.writeQuery({
            query: this.options.query,
            data: o,
            variables: this.variables,
          }),
          n.broadcastQueries());
      }),
      (t.prototype.startPolling = function (r) {
        (this.options.pollInterval = r), this.updatePolling();
      }),
      (t.prototype.stopPolling = function () {
        (this.options.pollInterval = 0), this.updatePolling();
      }),
      (t.prototype.applyNextFetchPolicy = function (r, n) {
        if (n.nextFetchPolicy) {
          var i = n.fetchPolicy,
            o = i === void 0 ? "cache-first" : i,
            s = n.initialFetchPolicy,
            a = s === void 0 ? o : s;
          o === "standby" ||
            (typeof n.nextFetchPolicy == "function"
              ? (n.fetchPolicy = n.nextFetchPolicy(o, {
                  reason: r,
                  options: n,
                  observable: this,
                  initialFetchPolicy: a,
                }))
              : r === "variables-changed"
              ? (n.fetchPolicy = a)
              : (n.fetchPolicy = n.nextFetchPolicy));
        }
        return n.fetchPolicy;
      }),
      (t.prototype.fetch = function (r, n) {
        return (
          this.queryManager.setObservableQuery(this),
          this.queryManager.fetchQueryObservable(this.queryId, r, n)
        );
      }),
      (t.prototype.updatePolling = function () {
        var r = this;
        if (!this.queryManager.ssrMode) {
          var n = this,
            i = n.pollingInfo,
            o = n.options.pollInterval;
          if (!o) {
            i && (clearTimeout(i.timeout), delete this.pollingInfo);
            return;
          }
          if (!(i && i.interval === o)) {
            le(o, 13);
            var s = i || (this.pollingInfo = {});
            s.interval = o;
            var a = function () {
                r.pollingInfo &&
                  (An(r.queryInfo.networkStatus)
                    ? u()
                    : r
                        .reobserve(
                          {
                            fetchPolicy:
                              r.options.initialFetchPolicy === "no-cache"
                                ? "no-cache"
                                : "network-only",
                          },
                          de.poll
                        )
                        .then(u, u));
              },
              u = function () {
                var c = r.pollingInfo;
                c &&
                  (clearTimeout(c.timeout),
                  (c.timeout = setTimeout(a, c.interval)));
              };
            u();
          }
        }
      }),
      (t.prototype.updateLastResult = function (r, n) {
        return (
          n === void 0 && (n = this.variables),
          (this.last = R(R({}, this.last), {
            result: this.queryManager.assumeImmutableResults ? r : Ab(r),
            variables: n,
          })),
          st(r.errors) || delete this.last.error,
          this.last
        );
      }),
      (t.prototype.reobserve = function (r, n) {
        var i = this;
        this.isTornDown = !1;
        var o = n === de.refetch || n === de.fetchMore || n === de.poll,
          s = this.options.variables,
          a = this.options.fetchPolicy,
          u = Ji(this.options, r || {}),
          c = o ? u : Z0(this.options, u);
        o ||
          (this.updatePolling(),
          r &&
            r.variables &&
            !Me(r.variables, s) &&
            c.fetchPolicy !== "standby" &&
            c.fetchPolicy === a &&
            (this.applyNextFetchPolicy("variables-changed", c),
            n === void 0 && (n = de.setVariables)));
        var l = c.variables && R({}, c.variables),
          f = this.fetch(c, n),
          h = {
            next: function (d) {
              i.reportResult(d, l);
            },
            error: function (d) {
              i.reportError(d, l);
            },
          };
        return (
          o ||
            (this.concast &&
              this.observer &&
              this.concast.removeObserver(this.observer),
            (this.concast = f),
            (this.observer = h)),
          f.addObserver(h),
          f.promise
        );
      }),
      (t.prototype.observe = function () {
        this.reportResult(this.getCurrentResult(!1), this.variables);
      }),
      (t.prototype.reportResult = function (r, n) {
        var i = this.getLastError();
        (i || this.isDifferentFromLastResult(r, n)) &&
          ((i || !r.partial || this.options.returnPartialData) &&
            this.updateLastResult(r, n),
          wn(this.observers, "next", r));
      }),
      (t.prototype.reportError = function (r, n) {
        var i = R(R({}, this.getLastResult()), {
          error: r,
          errors: r.graphQLErrors,
          networkStatus: de.error,
          loading: !1,
        });
        this.updateLastResult(i, n),
          wn(this.observers, "error", (this.last.error = r));
      }),
      (t.prototype.hasObservers = function () {
        return this.observers.size > 0;
      }),
      (t.prototype.tearDownQuery = function () {
        this.isTornDown ||
          (this.concast &&
            this.observer &&
            (this.concast.removeObserver(this.observer),
            delete this.concast,
            delete this.observer),
          this.stopPolling(),
          this.subscriptions.forEach(function (r) {
            return r.unsubscribe();
          }),
          this.subscriptions.clear(),
          this.queryManager.stopQuery(this.queryId),
          this.observers.clear(),
          (this.isTornDown = !0));
      }),
      t
    );
  })(pe);
Qf(Ts);
function gh(e) {
  var t = e.options,
    r = t.fetchPolicy,
    n = t.nextFetchPolicy;
  return r === "cache-and-network" || r === "network-only"
    ? e.reobserve({
        fetchPolicy: "cache-first",
        nextFetchPolicy: function () {
          return (
            (this.nextFetchPolicy = n),
            typeof n == "function" ? n.apply(this, arguments) : r
          );
        },
      })
    : e.reobserve();
}
function ew(e) {}
var bh = (function () {
    function e(t) {
      var r = t.cache,
        n = t.client,
        i = t.resolvers,
        o = t.fragmentMatcher;
      (this.selectionsToResolveCache = new WeakMap()),
        (this.cache = r),
        n && (this.client = n),
        i && this.addResolvers(i),
        o && this.setFragmentMatcher(o);
    }
    return (
      (e.prototype.addResolvers = function (t) {
        var r = this;
        (this.resolvers = this.resolvers || {}),
          Array.isArray(t)
            ? t.forEach(function (n) {
                r.resolvers = Jc(r.resolvers, n);
              })
            : (this.resolvers = Jc(this.resolvers, t));
      }),
      (e.prototype.setResolvers = function (t) {
        (this.resolvers = {}), this.addResolvers(t);
      }),
      (e.prototype.getResolvers = function () {
        return this.resolvers || {};
      }),
      (e.prototype.runResolvers = function (t) {
        var r = t.document,
          n = t.remoteResult,
          i = t.context,
          o = t.variables,
          s = t.onlyRunForcedResolvers,
          a = s === void 0 ? !1 : s;
        return $t(this, void 0, void 0, function () {
          return Ht(this, function (u) {
            return r
              ? [
                  2,
                  this.resolveDocument(
                    r,
                    n.data,
                    i,
                    o,
                    this.fragmentMatcher,
                    a
                  ).then(function (c) {
                    return R(R({}, n), { data: c.result });
                  }),
                ]
              : [2, n];
          });
        });
      }),
      (e.prototype.setFragmentMatcher = function (t) {
        this.fragmentMatcher = t;
      }),
      (e.prototype.getFragmentMatcher = function () {
        return this.fragmentMatcher;
      }),
      (e.prototype.clientQuery = function (t) {
        return oa(["client"], t) && this.resolvers ? t : null;
      }),
      (e.prototype.serverQuery = function (t) {
        return wb(t);
      }),
      (e.prototype.prepareContext = function (t) {
        var r = this.cache;
        return R(R({}, t), {
          cache: r,
          getCacheKey: function (n) {
            return r.identify(n);
          },
        });
      }),
      (e.prototype.addExportedVariables = function (t, r, n) {
        return (
          r === void 0 && (r = {}),
          n === void 0 && (n = {}),
          $t(this, void 0, void 0, function () {
            return Ht(this, function (i) {
              return t
                ? [
                    2,
                    this.resolveDocument(
                      t,
                      this.buildRootValueFromCache(t, r) || {},
                      this.prepareContext(n),
                      r
                    ).then(function (o) {
                      return R(R({}, r), o.exportedVariables);
                    }),
                  ]
                : [2, R({}, r)];
            });
          })
        );
      }),
      (e.prototype.shouldForceResolvers = function (t) {
        var r = !1;
        return (
          Pt(t, {
            Directive: {
              enter: function (n) {
                if (
                  n.name.value === "client" &&
                  n.arguments &&
                  ((r = n.arguments.some(function (i) {
                    return (
                      i.name.value === "always" &&
                      i.value.kind === "BooleanValue" &&
                      i.value.value === !0
                    );
                  })),
                  r)
                )
                  return ia;
              },
            },
          }),
          r
        );
      }),
      (e.prototype.buildRootValueFromCache = function (t, r) {
        return this.cache.diff({
          query: bb(t),
          variables: r,
          returnPartialData: !0,
          optimistic: !1,
        }).result;
      }),
      (e.prototype.resolveDocument = function (t, r, n, i, o, s) {
        return (
          n === void 0 && (n = {}),
          i === void 0 && (i = {}),
          o === void 0 &&
            (o = function () {
              return !0;
            }),
          s === void 0 && (s = !1),
          $t(this, void 0, void 0, function () {
            var a, u, c, l, f, h, d, y, b, w, m;
            return Ht(this, function (p) {
              return (
                (a = zi(t)),
                (u = ua(t)),
                (c = sa(u)),
                (l = this.collectSelectionsToResolve(a, c)),
                (f = a.operation),
                (h = f ? f.charAt(0).toUpperCase() + f.slice(1) : "Query"),
                (d = this),
                (y = d.cache),
                (b = d.client),
                (w = {
                  fragmentMap: c,
                  context: R(R({}, n), { cache: y, client: b }),
                  variables: i,
                  fragmentMatcher: o,
                  defaultOperationType: h,
                  exportedVariables: {},
                  selectionsToResolve: l,
                  onlyRunForcedResolvers: s,
                }),
                (m = !1),
                [
                  2,
                  this.resolveSelectionSet(a.selectionSet, m, r, w).then(
                    function (v) {
                      return {
                        result: v,
                        exportedVariables: w.exportedVariables,
                      };
                    }
                  ),
                ]
              );
            });
          })
        );
      }),
      (e.prototype.resolveSelectionSet = function (t, r, n, i) {
        return $t(this, void 0, void 0, function () {
          var o,
            s,
            a,
            u,
            c,
            l = this;
          return Ht(this, function (f) {
            return (
              (o = i.fragmentMap),
              (s = i.context),
              (a = i.variables),
              (u = [n]),
              (c = function (h) {
                return $t(l, void 0, void 0, function () {
                  var d, y;
                  return Ht(this, function (b) {
                    return !r && !i.selectionsToResolve.has(h)
                      ? [2]
                      : Ui(h, a)
                      ? pr(h)
                        ? [
                            2,
                            this.resolveField(h, r, n, i).then(function (w) {
                              var m;
                              typeof w < "u" &&
                                u.push(((m = {}), (m[zr(h)] = w), m));
                            }),
                          ]
                        : (hb(h) ? (d = h) : ((d = o[h.name.value]), le(d, 11)),
                          d &&
                          d.typeCondition &&
                          ((y = d.typeCondition.name.value),
                          i.fragmentMatcher(n, y, s))
                            ? [
                                2,
                                this.resolveSelectionSet(
                                  d.selectionSet,
                                  r,
                                  n,
                                  i
                                ).then(function (w) {
                                  u.push(w);
                                }),
                              ]
                            : [2])
                      : [2];
                  });
                });
              }),
              [
                2,
                Promise.all(t.selections.map(c)).then(function () {
                  return fa(u);
                }),
              ]
            );
          });
        });
      }),
      (e.prototype.resolveField = function (t, r, n, i) {
        return $t(this, void 0, void 0, function () {
          var o,
            s,
            a,
            u,
            c,
            l,
            f,
            h,
            d,
            y = this;
          return Ht(this, function (b) {
            return n
              ? ((o = i.variables),
                (s = t.name.value),
                (a = zr(t)),
                (u = s !== a),
                (c = n[a] || n[s]),
                (l = Promise.resolve(c)),
                (!i.onlyRunForcedResolvers || this.shouldForceResolvers(t)) &&
                  ((f = n.__typename || i.defaultOperationType),
                  (h = this.resolvers && this.resolvers[f]),
                  h &&
                    ((d = h[u ? s : a]),
                    d &&
                      (l = Promise.resolve(
                        ba.withValue(this.cache, d, [
                          n,
                          Vi(t, o),
                          i.context,
                          { field: t, fragmentMap: i.fragmentMap },
                        ])
                      )))),
                [
                  2,
                  l.then(function (w) {
                    var m, p;
                    if (
                      (w === void 0 && (w = c),
                      t.directives &&
                        t.directives.forEach(function (_) {
                          _.name.value === "export" &&
                            _.arguments &&
                            _.arguments.forEach(function (S) {
                              S.name.value === "as" &&
                                S.value.kind === "StringValue" &&
                                (i.exportedVariables[S.value.value] = w);
                            });
                        }),
                      !t.selectionSet || w == null)
                    )
                      return w;
                    var v =
                      (p =
                        (m = t.directives) === null || m === void 0
                          ? void 0
                          : m.some(function (_) {
                              return _.name.value === "client";
                            })) !== null && p !== void 0
                        ? p
                        : !1;
                    if (Array.isArray(w))
                      return y.resolveSubSelectedArray(t, r || v, w, i);
                    if (t.selectionSet)
                      return y.resolveSelectionSet(
                        t.selectionSet,
                        r || v,
                        w,
                        i
                      );
                  }),
                ])
              : [2, null];
          });
        });
      }),
      (e.prototype.resolveSubSelectedArray = function (t, r, n, i) {
        var o = this;
        return Promise.all(
          n.map(function (s) {
            if (s === null) return null;
            if (Array.isArray(s)) return o.resolveSubSelectedArray(t, r, s, i);
            if (t.selectionSet)
              return o.resolveSelectionSet(t.selectionSet, r, s, i);
          })
        );
      }),
      (e.prototype.collectSelectionsToResolve = function (t, r) {
        var n = function (s) {
            return !Array.isArray(s);
          },
          i = this.selectionsToResolveCache;
        function o(s) {
          if (!i.has(s)) {
            var a = new Set();
            i.set(s, a),
              Pt(s, {
                Directive: function (u, c, l, f, h) {
                  u.name.value === "client" &&
                    h.forEach(function (d) {
                      n(d) && Wc(d) && a.add(d);
                    });
                },
                FragmentSpread: function (u, c, l, f, h) {
                  var d = r[u.name.value];
                  le(d, 12);
                  var y = o(d);
                  y.size > 0 &&
                    (h.forEach(function (b) {
                      n(b) && Wc(b) && a.add(b);
                    }),
                    a.add(u),
                    y.forEach(function (b) {
                      a.add(b);
                    }));
                },
              });
          }
          return i.get(s);
        }
        return o(t);
      }),
      e
    );
  })(),
  Pr = new (gr ? WeakMap : Map)();
function Ro(e, t) {
  var r = e[t];
  typeof r == "function" &&
    (e[t] = function () {
      return Pr.set(e, (Pr.get(e) + 1) % 1e15), r.apply(this, arguments);
    });
}
function xu(e) {
  e.notifyTimeout &&
    (clearTimeout(e.notifyTimeout), (e.notifyTimeout = void 0));
}
var Co = (function () {
  function e(t, r) {
    r === void 0 && (r = t.generateQueryId()),
      (this.queryId = r),
      (this.listeners = new Set()),
      (this.document = null),
      (this.lastRequestId = 1),
      (this.subscriptions = new Set()),
      (this.stopped = !1),
      (this.dirty = !1),
      (this.observableQuery = null);
    var n = (this.cache = t.cache);
    Pr.has(n) ||
      (Pr.set(n, 0), Ro(n, "evict"), Ro(n, "modify"), Ro(n, "reset"));
  }
  return (
    (e.prototype.init = function (t) {
      var r = t.networkStatus || de.loading;
      return (
        this.variables &&
          this.networkStatus !== de.loading &&
          !Me(this.variables, t.variables) &&
          (r = de.setVariables),
        Me(t.variables, this.variables) || (this.lastDiff = void 0),
        Object.assign(this, {
          document: t.document,
          variables: t.variables,
          networkError: null,
          graphQLErrors: this.graphQLErrors || [],
          networkStatus: r,
        }),
        t.observableQuery && this.setObservableQuery(t.observableQuery),
        t.lastRequestId && (this.lastRequestId = t.lastRequestId),
        this
      );
    }),
    (e.prototype.reset = function () {
      xu(this), (this.dirty = !1);
    }),
    (e.prototype.getDiff = function (t) {
      t === void 0 && (t = this.variables);
      var r = this.getDiffOptions(t);
      if (this.lastDiff && Me(r, this.lastDiff.options))
        return this.lastDiff.diff;
      this.updateWatch((this.variables = t));
      var n = this.observableQuery;
      if (n && n.options.fetchPolicy === "no-cache") return { complete: !1 };
      var i = this.cache.diff(r);
      return this.updateLastDiff(i, r), i;
    }),
    (e.prototype.updateLastDiff = function (t, r) {
      this.lastDiff = t
        ? { diff: t, options: r || this.getDiffOptions() }
        : void 0;
    }),
    (e.prototype.getDiffOptions = function (t) {
      var r;
      return (
        t === void 0 && (t = this.variables),
        {
          query: this.document,
          variables: t,
          returnPartialData: !0,
          optimistic: !0,
          canonizeResults:
            (r = this.observableQuery) === null || r === void 0
              ? void 0
              : r.options.canonizeResults,
        }
      );
    }),
    (e.prototype.setDiff = function (t) {
      var r = this,
        n = this.lastDiff && this.lastDiff.diff;
      this.updateLastDiff(t),
        !this.dirty &&
          !Me(n && n.result, t && t.result) &&
          ((this.dirty = !0),
          this.notifyTimeout ||
            (this.notifyTimeout = setTimeout(function () {
              return r.notify();
            }, 0)));
    }),
    (e.prototype.setObservableQuery = function (t) {
      var r = this;
      t !== this.observableQuery &&
        (this.oqListener && this.listeners.delete(this.oqListener),
        (this.observableQuery = t),
        t
          ? ((t.queryInfo = this),
            this.listeners.add(
              (this.oqListener = function () {
                var n = r.getDiff();
                n.fromOptimisticTransaction ? t.observe() : gh(t);
              })
            ))
          : delete this.oqListener);
    }),
    (e.prototype.notify = function () {
      var t = this;
      xu(this),
        this.shouldNotify() &&
          this.listeners.forEach(function (r) {
            return r(t);
          }),
        (this.dirty = !1);
    }),
    (e.prototype.shouldNotify = function () {
      if (!this.dirty || !this.listeners.size) return !1;
      if (An(this.networkStatus) && this.observableQuery) {
        var t = this.observableQuery.options.fetchPolicy;
        if (t !== "cache-only" && t !== "cache-and-network") return !1;
      }
      return !0;
    }),
    (e.prototype.stop = function () {
      if (!this.stopped) {
        (this.stopped = !0),
          this.reset(),
          this.cancel(),
          (this.cancel = e.prototype.cancel),
          this.subscriptions.forEach(function (r) {
            return r.unsubscribe();
          });
        var t = this.observableQuery;
        t && t.stopPolling();
      }
    }),
    (e.prototype.cancel = function () {}),
    (e.prototype.updateWatch = function (t) {
      var r = this;
      t === void 0 && (t = this.variables);
      var n = this.observableQuery;
      if (!(n && n.options.fetchPolicy === "no-cache")) {
        var i = R(R({}, this.getDiffOptions(t)), {
          watcher: this,
          callback: function (o) {
            return r.setDiff(o);
          },
        });
        (!this.lastWatch || !Me(i, this.lastWatch)) &&
          (this.cancel(),
          (this.cancel = this.cache.watch((this.lastWatch = i))));
      }
    }),
    (e.prototype.resetLastWrite = function () {
      this.lastWrite = void 0;
    }),
    (e.prototype.shouldWrite = function (t, r) {
      var n = this.lastWrite;
      return !(
        n &&
        n.dmCount === Pr.get(this.cache) &&
        Me(r, n.variables) &&
        Me(t.data, n.result.data)
      );
    }),
    (e.prototype.markResult = function (t, r, n, i) {
      var o = this,
        s = new Gt(),
        a = st(t.errors) ? t.errors.slice(0) : [];
      if ((this.reset(), "incremental" in t && st(t.incremental))) {
        var u = Uf(this.getDiff().result, t);
        t.data = u;
      } else if ("hasNext" in t && t.hasNext) {
        var c = this.getDiff();
        t.data = s.merge(c.result, t.data);
      }
      (this.graphQLErrors = a),
        n.fetchPolicy === "no-cache"
          ? this.updateLastDiff(
              { result: t.data, complete: !0 },
              this.getDiffOptions(n.variables)
            )
          : i !== 0 &&
            (ks(t, n.errorPolicy)
              ? this.cache.performTransaction(function (l) {
                  if (o.shouldWrite(t, n.variables))
                    l.writeQuery({
                      query: r,
                      data: t.data,
                      variables: n.variables,
                      overwrite: i === 1,
                    }),
                      (o.lastWrite = {
                        result: t,
                        variables: n.variables,
                        dmCount: Pr.get(o.cache),
                      });
                  else if (o.lastDiff && o.lastDiff.diff.complete) {
                    t.data = o.lastDiff.diff.result;
                    return;
                  }
                  var f = o.getDiffOptions(n.variables),
                    h = l.diff(f);
                  o.stopped || o.updateWatch(n.variables),
                    o.updateLastDiff(h, f),
                    h.complete && (t.data = h.result);
                })
              : (this.lastWrite = void 0));
    }),
    (e.prototype.markReady = function () {
      return (this.networkError = null), (this.networkStatus = de.ready);
    }),
    (e.prototype.markError = function (t) {
      return (
        (this.networkStatus = de.error),
        (this.lastWrite = void 0),
        this.reset(),
        t.graphQLErrors && (this.graphQLErrors = t.graphQLErrors),
        t.networkError && (this.networkError = t.networkError),
        t
      );
    }),
    e
  );
})();
function ks(e, t) {
  t === void 0 && (t = "none");
  var r = t === "ignore" || t === "all",
    n = !si(e);
  return !n && r && e.data && (n = !0), n;
}
var tw = Object.prototype.hasOwnProperty,
  rw = (function () {
    function e(t) {
      var r = t.cache,
        n = t.link,
        i = t.defaultOptions,
        o = t.queryDeduplication,
        s = o === void 0 ? !1 : o,
        a = t.onBroadcast,
        u = t.ssrMode,
        c = u === void 0 ? !1 : u,
        l = t.clientAwareness,
        f = l === void 0 ? {} : l,
        h = t.localState,
        d = t.assumeImmutableResults;
      (this.clientAwareness = {}),
        (this.queries = new Map()),
        (this.fetchCancelFns = new Map()),
        (this.transformCache = new (gr ? WeakMap : Map)()),
        (this.queryIdCounter = 1),
        (this.requestIdCounter = 1),
        (this.mutationIdCounter = 1),
        (this.inFlightLinkObservables = new Map()),
        (this.cache = r),
        (this.link = n),
        (this.defaultOptions = i || Object.create(null)),
        (this.queryDeduplication = s),
        (this.clientAwareness = f),
        (this.localState = h || new bh({ cache: r })),
        (this.ssrMode = c),
        (this.assumeImmutableResults = !!d),
        (this.onBroadcast = a) && (this.mutationStore = Object.create(null));
    }
    return (
      (e.prototype.stop = function () {
        var t = this;
        this.queries.forEach(function (r, n) {
          t.stopQueryNoBroadcast(n);
        }),
          this.cancelPendingFetches(new Qe(14));
      }),
      (e.prototype.cancelPendingFetches = function (t) {
        this.fetchCancelFns.forEach(function (r) {
          return r(t);
        }),
          this.fetchCancelFns.clear();
      }),
      (e.prototype.mutate = function (t) {
        var r,
          n,
          i = t.mutation,
          o = t.variables,
          s = t.optimisticResponse,
          a = t.updateQueries,
          u = t.refetchQueries,
          c = u === void 0 ? [] : u,
          l = t.awaitRefetchQueries,
          f = l === void 0 ? !1 : l,
          h = t.update,
          d = t.onQueryUpdated,
          y = t.fetchPolicy,
          b =
            y === void 0
              ? ((r = this.defaultOptions.mutate) === null || r === void 0
                  ? void 0
                  : r.fetchPolicy) || "network-only"
              : y,
          w = t.errorPolicy,
          m =
            w === void 0
              ? ((n = this.defaultOptions.mutate) === null || n === void 0
                  ? void 0
                  : n.errorPolicy) || "none"
              : w,
          p = t.keepRootFields,
          v = t.context;
        return $t(this, void 0, void 0, function () {
          var _, S, k, T, O, M;
          return Ht(this, function (L) {
            switch (L.label) {
              case 0:
                return (
                  le(i, 15),
                  le(b === "network-only" || b === "no-cache", 16),
                  (_ = this.generateMutationId()),
                  (S = this.transform(i)),
                  (k = S.document),
                  (T = S.hasClientExports),
                  (i = this.cache.transformForLink(k)),
                  (o = this.getVariables(i, o)),
                  T
                    ? [4, this.localState.addExportedVariables(i, o, v)]
                    : [3, 2]
                );
              case 1:
                (o = L.sent()), (L.label = 2);
              case 2:
                return (
                  (O =
                    this.mutationStore &&
                    (this.mutationStore[_] = {
                      mutation: i,
                      variables: o,
                      loading: !0,
                      error: null,
                    })),
                  s &&
                    this.markMutationOptimistic(s, {
                      mutationId: _,
                      document: i,
                      variables: o,
                      fetchPolicy: b,
                      errorPolicy: m,
                      context: v,
                      updateQueries: a,
                      update: h,
                      keepRootFields: p,
                    }),
                  this.broadcastQueries(),
                  (M = this),
                  [
                    2,
                    new Promise(function (Q, q) {
                      return bo(
                        M.getObservableFromLink(
                          i,
                          R(R({}, v), { optimisticResponse: s }),
                          o,
                          !1
                        ),
                        function (W) {
                          if (si(W) && m === "none")
                            throw new ir({ graphQLErrors: ds(W) });
                          O && ((O.loading = !1), (O.error = null));
                          var I = R({}, W);
                          return (
                            typeof c == "function" && (c = c(I)),
                            m === "ignore" && si(I) && delete I.errors,
                            M.markMutationResult({
                              mutationId: _,
                              result: I,
                              document: i,
                              variables: o,
                              fetchPolicy: b,
                              errorPolicy: m,
                              context: v,
                              update: h,
                              updateQueries: a,
                              awaitRefetchQueries: f,
                              refetchQueries: c,
                              removeOptimistic: s ? _ : void 0,
                              onQueryUpdated: d,
                              keepRootFields: p,
                            })
                          );
                        }
                      ).subscribe({
                        next: function (W) {
                          M.broadcastQueries(),
                            (!("hasNext" in W) || W.hasNext === !1) && Q(W);
                        },
                        error: function (W) {
                          O && ((O.loading = !1), (O.error = W)),
                            s && M.cache.removeOptimistic(_),
                            M.broadcastQueries(),
                            q(
                              W instanceof ir ? W : new ir({ networkError: W })
                            );
                        },
                      });
                    }),
                  ]
                );
            }
          });
        });
      }),
      (e.prototype.markMutationResult = function (t, r) {
        var n = this;
        r === void 0 && (r = this.cache);
        var i = t.result,
          o = [],
          s = t.fetchPolicy === "no-cache";
        if (!s && ks(i, t.errorPolicy)) {
          if (
            (jr(i) ||
              o.push({
                result: i.data,
                dataId: "ROOT_MUTATION",
                query: t.document,
                variables: t.variables,
              }),
            jr(i) && st(i.incremental))
          ) {
            var a = r.diff({
                id: "ROOT_MUTATION",
                query: this.transform(t.document).asQuery,
                variables: t.variables,
                optimistic: !1,
                returnPartialData: !0,
              }),
              u = void 0;
            a.result && (u = Uf(a.result, i)),
              typeof u < "u" &&
                ((i.data = u),
                o.push({
                  result: u,
                  dataId: "ROOT_MUTATION",
                  query: t.document,
                  variables: t.variables,
                }));
          }
          var c = t.updateQueries;
          c &&
            this.queries.forEach(function (f, h) {
              var d = f.observableQuery,
                y = d && d.queryName;
              if (!(!y || !tw.call(c, y))) {
                var b = c[y],
                  w = n.queries.get(h),
                  m = w.document,
                  p = w.variables,
                  v = r.diff({
                    query: m,
                    variables: p,
                    returnPartialData: !0,
                    optimistic: !1,
                  }),
                  _ = v.result,
                  S = v.complete;
                if (S && _) {
                  var k = b(_, {
                    mutationResult: i,
                    queryName: (m && us(m)) || void 0,
                    queryVariables: p,
                  });
                  k &&
                    o.push({
                      result: k,
                      dataId: "ROOT_QUERY",
                      query: m,
                      variables: p,
                    });
                }
              }
            });
        }
        if (
          o.length > 0 ||
          t.refetchQueries ||
          t.update ||
          t.onQueryUpdated ||
          t.removeOptimistic
        ) {
          var l = [];
          if (
            (this.refetchQueries({
              updateCache: function (f) {
                s ||
                  o.forEach(function (b) {
                    return f.write(b);
                  });
                var h = t.update,
                  d = !Nb(i) || (jr(i) && !i.hasNext);
                if (h) {
                  if (!s) {
                    var y = f.diff({
                      id: "ROOT_MUTATION",
                      query: n.transform(t.document).asQuery,
                      variables: t.variables,
                      optimistic: !1,
                      returnPartialData: !0,
                    });
                    y.complete &&
                      ((i = R(R({}, i), { data: y.result })),
                      "incremental" in i && delete i.incremental,
                      "hasNext" in i && delete i.hasNext);
                  }
                  d && h(f, i, { context: t.context, variables: t.variables });
                }
                !s &&
                  !t.keepRootFields &&
                  d &&
                  f.modify({
                    id: "ROOT_MUTATION",
                    fields: function (b, w) {
                      var m = w.fieldName,
                        p = w.DELETE;
                      return m === "__typename" ? b : p;
                    },
                  });
              },
              include: t.refetchQueries,
              optimistic: !1,
              removeOptimistic: t.removeOptimistic,
              onQueryUpdated: t.onQueryUpdated || null,
            }).forEach(function (f) {
              return l.push(f);
            }),
            t.awaitRefetchQueries || t.onQueryUpdated)
          )
            return Promise.all(l).then(function () {
              return i;
            });
        }
        return Promise.resolve(i);
      }),
      (e.prototype.markMutationOptimistic = function (t, r) {
        var n = this,
          i = typeof t == "function" ? t(r.variables) : t;
        return this.cache.recordOptimisticTransaction(function (o) {
          try {
            n.markMutationResult(R(R({}, r), { result: { data: i } }), o);
          } catch {}
        }, r.mutationId);
      }),
      (e.prototype.fetchQuery = function (t, r, n) {
        return this.fetchQueryObservable(t, r, n).promise;
      }),
      (e.prototype.getQueryStore = function () {
        var t = Object.create(null);
        return (
          this.queries.forEach(function (r, n) {
            t[n] = {
              variables: r.variables,
              networkStatus: r.networkStatus,
              networkError: r.networkError,
              graphQLErrors: r.graphQLErrors,
            };
          }),
          t
        );
      }),
      (e.prototype.resetErrors = function (t) {
        var r = this.queries.get(t);
        r && ((r.networkError = void 0), (r.graphQLErrors = []));
      }),
      (e.prototype.transform = function (t) {
        var r = this.transformCache;
        if (!r.has(t)) {
          var n = this.cache.transformDocument(t),
            i = gb(n),
            o = this.localState.clientQuery(n),
            s = i && this.localState.serverQuery(i),
            a = {
              document: n,
              hasClientExports: Jg(n),
              hasForcedResolvers: this.localState.shouldForceResolvers(n),
              clientQuery: o,
              serverQuery: s,
              defaultVars: la(jn(n)),
              asQuery: R(R({}, n), {
                definitions: n.definitions.map(function (c) {
                  return c.kind === "OperationDefinition" &&
                    c.operation !== "query"
                    ? R(R({}, c), { operation: "query" })
                    : c;
                }),
              }),
            },
            u = function (c) {
              c && !r.has(c) && r.set(c, a);
            };
          u(t), u(n), u(o), u(s);
        }
        return r.get(t);
      }),
      (e.prototype.getVariables = function (t, r) {
        return R(R({}, this.transform(t).defaultVars), r);
      }),
      (e.prototype.watchQuery = function (t) {
        (t = R(R({}, t), {
          variables: this.getVariables(t.query, t.variables),
        })),
          typeof t.notifyOnNetworkStatusChange > "u" &&
            (t.notifyOnNetworkStatusChange = !1);
        var r = new Co(this),
          n = new Ts({ queryManager: this, queryInfo: r, options: t });
        return (
          this.queries.set(n.queryId, r),
          r.init({
            document: n.query,
            observableQuery: n,
            variables: n.variables,
          }),
          n
        );
      }),
      (e.prototype.query = function (t, r) {
        var n = this;
        return (
          r === void 0 && (r = this.generateQueryId()),
          le(t.query, 17),
          le(t.query.kind === "Document", 18),
          le(!t.returnPartialData, 19),
          le(!t.pollInterval, 20),
          this.fetchQuery(r, t).finally(function () {
            return n.stopQuery(r);
          })
        );
      }),
      (e.prototype.generateQueryId = function () {
        return String(this.queryIdCounter++);
      }),
      (e.prototype.generateRequestId = function () {
        return this.requestIdCounter++;
      }),
      (e.prototype.generateMutationId = function () {
        return String(this.mutationIdCounter++);
      }),
      (e.prototype.stopQueryInStore = function (t) {
        this.stopQueryInStoreNoBroadcast(t), this.broadcastQueries();
      }),
      (e.prototype.stopQueryInStoreNoBroadcast = function (t) {
        var r = this.queries.get(t);
        r && r.stop();
      }),
      (e.prototype.clearStore = function (t) {
        return (
          t === void 0 && (t = { discardWatches: !0 }),
          this.cancelPendingFetches(new Qe(21)),
          this.queries.forEach(function (r) {
            r.observableQuery ? (r.networkStatus = de.loading) : r.stop();
          }),
          this.mutationStore && (this.mutationStore = Object.create(null)),
          this.cache.reset(t)
        );
      }),
      (e.prototype.getObservableQueries = function (t) {
        var r = this;
        t === void 0 && (t = "active");
        var n = new Map(),
          i = new Map(),
          o = new Set();
        return (
          Array.isArray(t) &&
            t.forEach(function (s) {
              typeof s == "string"
                ? i.set(s, !1)
                : Zg(s)
                ? i.set(r.transform(s).document, !1)
                : Pe(s) && s.query && o.add(s);
            }),
          this.queries.forEach(function (s, a) {
            var u = s.observableQuery,
              c = s.document;
            if (u) {
              if (t === "all") {
                n.set(a, u);
                return;
              }
              var l = u.queryName,
                f = u.options.fetchPolicy;
              if (f === "standby" || (t === "active" && !u.hasObservers()))
                return;
              (t === "active" || (l && i.has(l)) || (c && i.has(c))) &&
                (n.set(a, u), l && i.set(l, !0), c && i.set(c, !0));
            }
          }),
          o.size &&
            o.forEach(function (s) {
              var a = ru("legacyOneTimeQuery"),
                u = r
                  .getQuery(a)
                  .init({ document: s.query, variables: s.variables }),
                c = new Ts({
                  queryManager: r,
                  queryInfo: u,
                  options: R(R({}, s), { fetchPolicy: "network-only" }),
                });
              le(c.queryId === a), u.setObservableQuery(c), n.set(a, c);
            }),
          n
        );
      }),
      (e.prototype.reFetchObservableQueries = function (t) {
        var r = this;
        t === void 0 && (t = !1);
        var n = [];
        return (
          this.getObservableQueries(t ? "all" : "active").forEach(function (
            i,
            o
          ) {
            var s = i.options.fetchPolicy;
            i.resetLastResults(),
              (t || (s !== "standby" && s !== "cache-only")) &&
                n.push(i.refetch()),
              r.getQuery(o).setDiff(null);
          }),
          this.broadcastQueries(),
          Promise.all(n)
        );
      }),
      (e.prototype.setObservableQuery = function (t) {
        this.getQuery(t.queryId).setObservableQuery(t);
      }),
      (e.prototype.startGraphQLSubscription = function (t) {
        var r = this,
          n = t.query,
          i = t.fetchPolicy,
          o = t.errorPolicy,
          s = t.variables,
          a = t.context,
          u = a === void 0 ? {} : a;
        (n = this.transform(n).document), (s = this.getVariables(n, s));
        var c = function (f) {
          return r.getObservableFromLink(n, u, f).map(function (h) {
            if (
              (i !== "no-cache" &&
                (ks(h, o) &&
                  r.cache.write({
                    query: n,
                    result: h.data,
                    dataId: "ROOT_SUBSCRIPTION",
                    variables: f,
                  }),
                r.broadcastQueries()),
              si(h))
            )
              throw new ir({ graphQLErrors: h.errors });
            return h;
          });
        };
        if (this.transform(n).hasClientExports) {
          var l = this.localState.addExportedVariables(n, s, u).then(c);
          return new pe(function (f) {
            var h = null;
            return (
              l.then(function (d) {
                return (h = d.subscribe(f));
              }, f.error),
              function () {
                return h && h.unsubscribe();
              }
            );
          });
        }
        return c(s);
      }),
      (e.prototype.stopQuery = function (t) {
        this.stopQueryNoBroadcast(t), this.broadcastQueries();
      }),
      (e.prototype.stopQueryNoBroadcast = function (t) {
        this.stopQueryInStoreNoBroadcast(t), this.removeQuery(t);
      }),
      (e.prototype.removeQuery = function (t) {
        this.fetchCancelFns.delete(t),
          this.queries.has(t) &&
            (this.getQuery(t).stop(), this.queries.delete(t));
      }),
      (e.prototype.broadcastQueries = function () {
        this.onBroadcast && this.onBroadcast(),
          this.queries.forEach(function (t) {
            return t.notify();
          });
      }),
      (e.prototype.getLocalState = function () {
        return this.localState;
      }),
      (e.prototype.getObservableFromLink = function (t, r, n, i) {
        var o = this,
          s;
        i === void 0 &&
          (i =
            (s = r == null ? void 0 : r.queryDeduplication) !== null &&
            s !== void 0
              ? s
              : this.queryDeduplication);
        var a,
          u = this.transform(t).serverQuery;
        if (u) {
          var c = this,
            l = c.inFlightLinkObservables,
            f = c.link,
            h = {
              query: u,
              variables: n,
              operationName: us(u) || void 0,
              context: this.prepareContext(R(R({}, r), { forceFetch: !i })),
            };
          if (((r = h.context), i)) {
            var d = l.get(u) || new Map();
            l.set(u, d);
            var y = fr(n);
            if (((a = d.get(y)), !a)) {
              var b = new fn([ys(f, h)]);
              d.set(y, (a = b)),
                b.beforeNext(function () {
                  d.delete(y) && d.size < 1 && l.delete(u);
                });
            }
          } else a = new fn([ys(f, h)]);
        } else
          (a = new fn([pe.of({ data: {} })])), (r = this.prepareContext(r));
        var w = this.transform(t).clientQuery;
        return (
          w &&
            (a = bo(a, function (m) {
              return o.localState.runResolvers({
                document: w,
                remoteResult: m,
                context: r,
                variables: n,
              });
            })),
          a
        );
      }),
      (e.prototype.getResultsFromLink = function (t, r, n) {
        var i = (t.lastRequestId = this.generateRequestId()),
          o = this.cache.transformForLink(this.transform(t.document).document);
        return bo(
          this.getObservableFromLink(o, n.context, n.variables),
          function (s) {
            var a = ds(s),
              u = a.length > 0;
            if (i >= t.lastRequestId) {
              if (u && n.errorPolicy === "none")
                throw t.markError(new ir({ graphQLErrors: a }));
              t.markResult(s, o, n, r), t.markReady();
            }
            var c = { data: s.data, loading: !1, networkStatus: de.ready };
            return (
              u &&
                n.errorPolicy !== "ignore" &&
                ((c.errors = a), (c.networkStatus = de.error)),
              c
            );
          },
          function (s) {
            var a = Y0(s) ? s : new ir({ networkError: s });
            throw (i >= t.lastRequestId && t.markError(a), a);
          }
        );
      }),
      (e.prototype.fetchQueryObservable = function (t, r, n) {
        var i = this;
        n === void 0 && (n = de.loading);
        var o = this.transform(r.query).document,
          s = this.getVariables(o, r.variables),
          a = this.getQuery(t),
          u = this.defaultOptions.watchQuery,
          c = r.fetchPolicy,
          l = c === void 0 ? (u && u.fetchPolicy) || "cache-first" : c,
          f = r.errorPolicy,
          h = f === void 0 ? (u && u.errorPolicy) || "none" : f,
          d = r.returnPartialData,
          y = d === void 0 ? !1 : d,
          b = r.notifyOnNetworkStatusChange,
          w = b === void 0 ? !1 : b,
          m = r.context,
          p = m === void 0 ? {} : m,
          v = Object.assign({}, r, {
            query: o,
            variables: s,
            fetchPolicy: l,
            errorPolicy: h,
            returnPartialData: y,
            notifyOnNetworkStatusChange: w,
            context: p,
          }),
          _ = function (T) {
            v.variables = T;
            var O = i.fetchQueryByPolicy(a, v, n);
            return (
              v.fetchPolicy !== "standby" &&
                O.length > 0 &&
                a.observableQuery &&
                a.observableQuery.applyNextFetchPolicy("after-fetch", r),
              O
            );
          },
          S = function () {
            return i.fetchCancelFns.delete(t);
          };
        this.fetchCancelFns.set(t, function (T) {
          S(),
            setTimeout(function () {
              return k.cancel(T);
            });
        });
        var k = new fn(
          this.transform(v.query).hasClientExports
            ? this.localState
                .addExportedVariables(v.query, v.variables, v.context)
                .then(_)
            : _(v.variables)
        );
        return k.promise.then(S, S), k;
      }),
      (e.prototype.refetchQueries = function (t) {
        var r = this,
          n = t.updateCache,
          i = t.include,
          o = t.optimistic,
          s = o === void 0 ? !1 : o,
          a = t.removeOptimistic,
          u = a === void 0 ? (s ? ru("refetchQueries") : void 0) : a,
          c = t.onQueryUpdated,
          l = new Map();
        i &&
          this.getObservableQueries(i).forEach(function (h, d) {
            l.set(d, { oq: h, lastDiff: r.getQuery(d).getDiff() });
          });
        var f = new Map();
        return (
          n &&
            this.cache.batch({
              update: n,
              optimistic: (s && u) || !1,
              removeOptimistic: u,
              onWatchUpdated: function (h, d, y) {
                var b = h.watcher instanceof Co && h.watcher.observableQuery;
                if (b) {
                  if (c) {
                    l.delete(b.queryId);
                    var w = c(b, d, y);
                    return (
                      w === !0 && (w = b.refetch()), w !== !1 && f.set(b, w), w
                    );
                  }
                  c !== null &&
                    l.set(b.queryId, { oq: b, lastDiff: y, diff: d });
                }
              },
            }),
          l.size &&
            l.forEach(function (h, d) {
              var y = h.oq,
                b = h.lastDiff,
                w = h.diff,
                m;
              if (c) {
                if (!w) {
                  var p = y.queryInfo;
                  p.reset(), (w = p.getDiff());
                }
                m = c(y, w, b);
              }
              (!c || m === !0) && (m = y.refetch()),
                m !== !1 && f.set(y, m),
                d.indexOf("legacyOneTimeQuery") >= 0 &&
                  r.stopQueryNoBroadcast(d);
            }),
          u && this.cache.removeOptimistic(u),
          f
        );
      }),
      (e.prototype.fetchQueryByPolicy = function (t, r, n) {
        var i = this,
          o = r.query,
          s = r.variables,
          a = r.fetchPolicy,
          u = r.refetchWritePolicy,
          c = r.errorPolicy,
          l = r.returnPartialData,
          f = r.context,
          h = r.notifyOnNetworkStatusChange,
          d = t.networkStatus;
        t.init({
          document: this.transform(o).document,
          variables: s,
          networkStatus: n,
        });
        var y = function () {
            return t.getDiff(s);
          },
          b = function (_, S) {
            S === void 0 && (S = t.networkStatus || de.loading);
            var k = _.result,
              T = function (O) {
                return pe.of(
                  R(
                    { data: O, loading: An(S), networkStatus: S },
                    _.complete ? null : { partial: !0 }
                  )
                );
              };
            return k && i.transform(o).hasForcedResolvers
              ? i.localState
                  .runResolvers({
                    document: o,
                    remoteResult: { data: k },
                    context: f,
                    variables: s,
                    onlyRunForcedResolvers: !0,
                  })
                  .then(function (O) {
                    return T(O.data || void 0);
                  })
              : c === "none" && S === de.refetch && Array.isArray(_.missing)
              ? T(void 0)
              : T(k);
          },
          w = a === "no-cache" ? 0 : n === de.refetch && u !== "merge" ? 1 : 2,
          m = function () {
            return i.getResultsFromLink(t, w, {
              variables: s,
              context: f,
              fetchPolicy: a,
              errorPolicy: c,
            });
          },
          p = h && typeof d == "number" && d !== n && An(n);
        switch (a) {
          default:
          case "cache-first": {
            var v = y();
            return v.complete
              ? [b(v, t.markReady())]
              : l || p
              ? [b(v), m()]
              : [m()];
          }
          case "cache-and-network": {
            var v = y();
            return v.complete || l || p ? [b(v), m()] : [m()];
          }
          case "cache-only":
            return [b(y(), t.markReady())];
          case "network-only":
            return p ? [b(y()), m()] : [m()];
          case "no-cache":
            return p ? [b(t.getDiff()), m()] : [m()];
          case "standby":
            return [];
        }
      }),
      (e.prototype.getQuery = function (t) {
        return (
          t && !this.queries.has(t) && this.queries.set(t, new Co(this, t)),
          this.queries.get(t)
        );
      }),
      (e.prototype.prepareContext = function (t) {
        t === void 0 && (t = {});
        var r = this.localState.prepareContext(t);
        return R(R({}, r), { clientAwareness: this.clientAwareness });
      }),
      e
    );
  })(),
  nw = !1,
  iw = (function () {
    function e(t) {
      var r = this;
      (this.resetStoreCallbacks = []), (this.clearStoreCallbacks = []);
      var n = t.uri,
        i = t.credentials,
        o = t.headers,
        s = t.cache,
        a = t.ssrMode,
        u = a === void 0 ? !1 : a,
        c = t.ssrForceFetchDelay,
        l = c === void 0 ? 0 : c,
        f = t.connectToDevTools,
        h =
          f === void 0
            ? typeof window == "object" && !window.__APOLLO_CLIENT__ && !1
            : f,
        d = t.queryDeduplication,
        y = d === void 0 ? !0 : d,
        b = t.defaultOptions,
        w = t.assumeImmutableResults,
        m = w === void 0 ? !1 : w,
        p = t.resolvers,
        v = t.typeDefs,
        _ = t.fragmentMatcher,
        S = t.name,
        k = t.version,
        T = t.link;
      if (
        (T ||
          (T = n ? new h0({ uri: n, credentials: i, headers: o }) : gt.empty()),
        !s)
      )
        throw new Qe(9);
      if (
        ((this.link = T),
        (this.cache = s),
        (this.disableNetworkFetches = u || l > 0),
        (this.queryDeduplication = y),
        (this.defaultOptions = b || Object.create(null)),
        (this.typeDefs = v),
        l &&
          setTimeout(function () {
            return (r.disableNetworkFetches = !1);
          }, l),
        (this.watchQuery = this.watchQuery.bind(this)),
        (this.query = this.query.bind(this)),
        (this.mutate = this.mutate.bind(this)),
        (this.resetStore = this.resetStore.bind(this)),
        (this.reFetchObservableQueries =
          this.reFetchObservableQueries.bind(this)),
        h && typeof window == "object" && (window.__APOLLO_CLIENT__ = this),
        !nw &&
          h &&
          !1 &&
          typeof window < "u" &&
          window.document &&
          window.top === window.self &&
          !window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__)
      )
        var O, M;
      (this.version = $b),
        (this.localState = new bh({
          cache: s,
          client: this,
          resolvers: p,
          fragmentMatcher: _,
        })),
        (this.queryManager = new rw({
          cache: this.cache,
          link: this.link,
          defaultOptions: this.defaultOptions,
          queryDeduplication: y,
          ssrMode: u,
          clientAwareness: { name: S, version: k },
          localState: this.localState,
          assumeImmutableResults: m,
          onBroadcast: h
            ? function () {
                r.devToolsHookCb &&
                  r.devToolsHookCb({
                    action: {},
                    state: {
                      queries: r.queryManager.getQueryStore(),
                      mutations: r.queryManager.mutationStore || {},
                    },
                    dataWithOptimisticResults: r.cache.extract(!0),
                  });
              }
            : void 0,
        }));
    }
    return (
      (e.prototype.stop = function () {
        this.queryManager.stop();
      }),
      (e.prototype.watchQuery = function (t) {
        return (
          this.defaultOptions.watchQuery &&
            (t = wo(this.defaultOptions.watchQuery, t)),
          this.disableNetworkFetches &&
            (t.fetchPolicy === "network-only" ||
              t.fetchPolicy === "cache-and-network") &&
            (t = R(R({}, t), { fetchPolicy: "cache-first" })),
          this.queryManager.watchQuery(t)
        );
      }),
      (e.prototype.query = function (t) {
        return (
          this.defaultOptions.query && (t = wo(this.defaultOptions.query, t)),
          le(t.fetchPolicy !== "cache-and-network", 10),
          this.disableNetworkFetches &&
            t.fetchPolicy === "network-only" &&
            (t = R(R({}, t), { fetchPolicy: "cache-first" })),
          this.queryManager.query(t)
        );
      }),
      (e.prototype.mutate = function (t) {
        return (
          this.defaultOptions.mutate && (t = wo(this.defaultOptions.mutate, t)),
          this.queryManager.mutate(t)
        );
      }),
      (e.prototype.subscribe = function (t) {
        return this.queryManager.startGraphQLSubscription(t);
      }),
      (e.prototype.readQuery = function (t, r) {
        return r === void 0 && (r = !1), this.cache.readQuery(t, r);
      }),
      (e.prototype.readFragment = function (t, r) {
        return r === void 0 && (r = !1), this.cache.readFragment(t, r);
      }),
      (e.prototype.writeQuery = function (t) {
        this.cache.writeQuery(t), this.queryManager.broadcastQueries();
      }),
      (e.prototype.writeFragment = function (t) {
        this.cache.writeFragment(t), this.queryManager.broadcastQueries();
      }),
      (e.prototype.__actionHookForDevTools = function (t) {
        this.devToolsHookCb = t;
      }),
      (e.prototype.__requestRaw = function (t) {
        return ys(this.link, t);
      }),
      (e.prototype.resetStore = function () {
        var t = this;
        return Promise.resolve()
          .then(function () {
            return t.queryManager.clearStore({ discardWatches: !1 });
          })
          .then(function () {
            return Promise.all(
              t.resetStoreCallbacks.map(function (r) {
                return r();
              })
            );
          })
          .then(function () {
            return t.reFetchObservableQueries();
          });
      }),
      (e.prototype.clearStore = function () {
        var t = this;
        return Promise.resolve()
          .then(function () {
            return t.queryManager.clearStore({ discardWatches: !0 });
          })
          .then(function () {
            return Promise.all(
              t.clearStoreCallbacks.map(function (r) {
                return r();
              })
            );
          });
      }),
      (e.prototype.onResetStore = function (t) {
        var r = this;
        return (
          this.resetStoreCallbacks.push(t),
          function () {
            r.resetStoreCallbacks = r.resetStoreCallbacks.filter(function (n) {
              return n !== t;
            });
          }
        );
      }),
      (e.prototype.onClearStore = function (t) {
        var r = this;
        return (
          this.clearStoreCallbacks.push(t),
          function () {
            r.clearStoreCallbacks = r.clearStoreCallbacks.filter(function (n) {
              return n !== t;
            });
          }
        );
      }),
      (e.prototype.reFetchObservableQueries = function (t) {
        return this.queryManager.reFetchObservableQueries(t);
      }),
      (e.prototype.refetchQueries = function (t) {
        var r = this.queryManager.refetchQueries(t),
          n = [],
          i = [];
        r.forEach(function (s, a) {
          n.push(a), i.push(s);
        });
        var o = Promise.all(i);
        return (o.queries = n), (o.results = i), o.catch(function (s) {}), o;
      }),
      (e.prototype.getObservableQueries = function (t) {
        return (
          t === void 0 && (t = "active"),
          this.queryManager.getObservableQueries(t)
        );
      }),
      (e.prototype.extract = function (t) {
        return this.cache.extract(t);
      }),
      (e.prototype.restore = function (t) {
        return this.cache.restore(t);
      }),
      (e.prototype.addResolvers = function (t) {
        this.localState.addResolvers(t);
      }),
      (e.prototype.setResolvers = function (t) {
        this.localState.setResolvers(t);
      }),
      (e.prototype.getResolvers = function () {
        return this.localState.getResolvers();
      }),
      (e.prototype.setLocalStateFragmentMatcher = function (t) {
        this.localState.setFragmentMatcher(t);
      }),
      (e.prototype.setLink = function (t) {
        this.link = this.queryManager.link = t;
      }),
      e
    );
  })(),
  ow = Symbol("apollo-clients");
function sw(e) {
  return Pe(e) && "code" in e && "reason" in e;
}
var aw = (function (e) {
  Xe(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return (n.client = r), n;
  }
  return (
    (t.prototype.request = function (r) {
      var n = this;
      return new pe(function (i) {
        return n.client.subscribe(R(R({}, r), { query: Nf(r.query) }), {
          next: i.next.bind(i),
          complete: i.complete.bind(i),
          error: function (o) {
            return o instanceof Error
              ? i.error(o)
              : sw(o)
              ? i.error(
                  new Error(
                    "Socket closed with event "
                      .concat(o.code, " ")
                      .concat(o.reason || "")
                  )
                )
              : i.error(new ir({ graphQLErrors: Array.isArray(o) ? o : [o] }));
          },
        });
      });
    }),
    t
  );
})(gt);
function cw(e) {
  return new gt(function (t, r) {
    var n = dr(t, []);
    return new pe(function (i) {
      var o,
        s = !1;
      return (
        Promise.resolve(n)
          .then(function (a) {
            return e(a, t.getContext());
          })
          .then(t.setContext)
          .then(function () {
            s ||
              (o = r(t).subscribe({
                next: i.next.bind(i),
                error: i.error.bind(i),
                complete: i.complete.bind(i),
              }));
          })
          .catch(i.error.bind(i)),
        function () {
          (s = !0), o && o.unsubscribe();
        }
      );
    });
  });
}
function Ue(e) {
  return e === null ? "null" : Array.isArray(e) ? "array" : typeof e;
}
function or(e) {
  return Ue(e) === "object";
}
function uw(e) {
  return Array.isArray(e) && e.length > 0 && e.every((t) => "message" in t);
}
function Iu(e, t) {
  return e.length < 124 ? e : t;
}
const lw = "graphql-transport-ws";
var Je;
(function (e) {
  (e[(e.InternalServerError = 4500)] = "InternalServerError"),
    (e[(e.InternalClientError = 4005)] = "InternalClientError"),
    (e[(e.BadRequest = 4400)] = "BadRequest"),
    (e[(e.BadResponse = 4004)] = "BadResponse"),
    (e[(e.Unauthorized = 4401)] = "Unauthorized"),
    (e[(e.Forbidden = 4403)] = "Forbidden"),
    (e[(e.SubprotocolNotAcceptable = 4406)] = "SubprotocolNotAcceptable"),
    (e[(e.ConnectionInitialisationTimeout = 4408)] =
      "ConnectionInitialisationTimeout"),
    (e[(e.ConnectionAcknowledgementTimeout = 4504)] =
      "ConnectionAcknowledgementTimeout"),
    (e[(e.SubscriberAlreadyExists = 4409)] = "SubscriberAlreadyExists"),
    (e[(e.TooManyInitialisationRequests = 4429)] =
      "TooManyInitialisationRequests");
})(Je || (Je = {}));
var Te;
(function (e) {
  (e.ConnectionInit = "connection_init"),
    (e.ConnectionAck = "connection_ack"),
    (e.Ping = "ping"),
    (e.Pong = "pong"),
    (e.Subscribe = "subscribe"),
    (e.Next = "next"),
    (e.Error = "error"),
    (e.Complete = "complete");
})(Te || (Te = {}));
function wh(e) {
  if (!or(e))
    throw new Error(`Message is expected to be an object, but got ${Ue(e)}`);
  if (!e.type) throw new Error("Message is missing the 'type' property");
  if (typeof e.type != "string")
    throw new Error(
      `Message is expects the 'type' property to be a string, but got ${Ue(
        e.type
      )}`
    );
  switch (e.type) {
    case Te.ConnectionInit:
    case Te.ConnectionAck:
    case Te.Ping:
    case Te.Pong: {
      if ("payload" in e && !or(e.payload))
        throw new Error(
          `"${e.type}" message expects the 'payload' property to be an object or missing, but got "${e.payload}"`
        );
      break;
    }
    case Te.Subscribe: {
      if (typeof e.id != "string")
        throw new Error(
          `"${
            e.type
          }" message expects the 'id' property to be a string, but got ${Ue(
            e.id
          )}`
        );
      if (!e.id)
        throw new Error(
          `"${e.type}" message requires a non-empty 'id' property`
        );
      if (!or(e.payload))
        throw new Error(
          `"${
            e.type
          }" message expects the 'payload' property to be an object, but got ${Ue(
            e.payload
          )}`
        );
      if (typeof e.payload.query != "string")
        throw new Error(
          `"${
            e.type
          }" message payload expects the 'query' property to be a string, but got ${Ue(
            e.payload.query
          )}`
        );
      if (e.payload.variables != null && !or(e.payload.variables))
        throw new Error(
          `"${
            e.type
          }" message payload expects the 'variables' property to be a an object or nullish or missing, but got ${Ue(
            e.payload.variables
          )}`
        );
      if (
        e.payload.operationName != null &&
        Ue(e.payload.operationName) !== "string"
      )
        throw new Error(
          `"${
            e.type
          }" message payload expects the 'operationName' property to be a string or nullish or missing, but got ${Ue(
            e.payload.operationName
          )}`
        );
      if (e.payload.extensions != null && !or(e.payload.extensions))
        throw new Error(
          `"${
            e.type
          }" message payload expects the 'extensions' property to be a an object or nullish or missing, but got ${Ue(
            e.payload.extensions
          )}`
        );
      break;
    }
    case Te.Next: {
      if (typeof e.id != "string")
        throw new Error(
          `"${
            e.type
          }" message expects the 'id' property to be a string, but got ${Ue(
            e.id
          )}`
        );
      if (!e.id)
        throw new Error(
          `"${e.type}" message requires a non-empty 'id' property`
        );
      if (!or(e.payload))
        throw new Error(
          `"${
            e.type
          }" message expects the 'payload' property to be an object, but got ${Ue(
            e.payload
          )}`
        );
      break;
    }
    case Te.Error: {
      if (typeof e.id != "string")
        throw new Error(
          `"${
            e.type
          }" message expects the 'id' property to be a string, but got ${Ue(
            e.id
          )}`
        );
      if (!e.id)
        throw new Error(
          `"${e.type}" message requires a non-empty 'id' property`
        );
      if (!uw(e.payload))
        throw new Error(
          `"${
            e.type
          }" message expects the 'payload' property to be an array of GraphQL errors, but got ${JSON.stringify(
            e.payload
          )}`
        );
      break;
    }
    case Te.Complete: {
      if (typeof e.id != "string")
        throw new Error(
          `"${
            e.type
          }" message expects the 'id' property to be a string, but got ${Ue(
            e.id
          )}`
        );
      if (!e.id)
        throw new Error(
          `"${e.type}" message requires a non-empty 'id' property`
        );
      break;
    }
    default:
      throw new Error(`Invalid message 'type' property "${e.type}"`);
  }
  return e;
}
function fw(e, t) {
  return wh(typeof e == "string" ? JSON.parse(e, t) : e);
}
function cn(e, t) {
  return wh(e), JSON.stringify(e, t);
}
function hw(e) {
  const {
    url: t,
    connectionParams: r,
    lazy: n = !0,
    onNonLazyError: i = console.error,
    lazyCloseTimeout: o = 0,
    keepAlive: s = 0,
    disablePong: a,
    connectionAckWaitTimeout: u = 0,
    retryAttempts: c = 5,
    retryWait: l = async function (Z) {
      let z = 1e3;
      for (let K = 0; K < Z; K++) z *= 2;
      await new Promise((K) =>
        setTimeout(K, z + Math.floor(Math.random() * (3e3 - 300) + 300))
      );
    },
    shouldRetry: f = ei,
    isFatalConnectionProblem: h,
    on: d,
    webSocketImpl: y,
    generateID: b = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (Z) => {
        const z = (Math.random() * 16) | 0;
        return (Z == "x" ? z : (z & 3) | 8).toString(16);
      });
    },
    jsonMessageReplacer: w,
    jsonMessageReviver: m,
  } = e;
  let p;
  if (y) {
    if (!pw(y)) throw new Error("Invalid WebSocket implementation provided");
    p = y;
  } else
    typeof WebSocket < "u"
      ? (p = WebSocket)
      : typeof global < "u"
      ? (p = global.WebSocket || global.MozWebSocket)
      : typeof window < "u" && (p = window.WebSocket || window.MozWebSocket);
  if (!p)
    throw new Error(
      "WebSocket implementation missing; on Node you can `import WebSocket from 'ws';` and pass `webSocketImpl: WebSocket` to `createClient`"
    );
  const v = p,
    _ = (() => {
      const I = (() => {
          const z = {};
          return {
            on(K, U) {
              return (
                (z[K] = U),
                () => {
                  delete z[K];
                }
              );
            },
            emit(K) {
              var U;
              "id" in K &&
                ((U = z[K.id]) === null || U === void 0 || U.call(z, K));
            },
          };
        })(),
        Z = {
          connecting: d != null && d.connecting ? [d.connecting] : [],
          opened: d != null && d.opened ? [d.opened] : [],
          connected: d != null && d.connected ? [d.connected] : [],
          ping: d != null && d.ping ? [d.ping] : [],
          pong: d != null && d.pong ? [d.pong] : [],
          message: d != null && d.message ? [I.emit, d.message] : [I.emit],
          closed: d != null && d.closed ? [d.closed] : [],
          error: d != null && d.error ? [d.error] : [],
        };
      return {
        onMessage: I.on,
        on(z, K) {
          const U = Z[z];
          return (
            U.push(K),
            () => {
              U.splice(U.indexOf(K), 1);
            }
          );
        },
        emit(z, ...K) {
          for (const U of [...Z[z]]) U(...K);
        },
      };
    })();
  function S(I) {
    const Z = [
      _.on("error", (z) => {
        Z.forEach((K) => K()), I(z);
      }),
      _.on("closed", (z) => {
        Z.forEach((K) => K()), I(z);
      }),
    ];
  }
  let k,
    T = 0,
    O,
    M = !1,
    L = 0,
    Q = !1;
  async function q() {
    clearTimeout(O);
    const [I, Z] = await (k ??
      (k = new Promise((U, Ee) =>
        (async () => {
          if (M) {
            if ((await l(L), !T))
              return (
                (k = void 0),
                Ee({ code: 1e3, reason: "All Subscriptions Gone" })
              );
            L++;
          }
          _.emit("connecting");
          const te = new v(typeof t == "function" ? await t() : t, lw);
          let Se, be;
          function at() {
            isFinite(s) &&
              s > 0 &&
              (clearTimeout(be),
              (be = setTimeout(() => {
                te.readyState === v.OPEN &&
                  (te.send(cn({ type: Te.Ping })), _.emit("ping", !1, void 0));
              }, s)));
          }
          S((P) => {
            (k = void 0),
              clearTimeout(Se),
              clearTimeout(be),
              Ee(P),
              ei(P) &&
                P.code === 4499 &&
                (te.close(4499, "Terminated"),
                (te.onerror = null),
                (te.onclose = null));
          }),
            (te.onerror = (P) => _.emit("error", P)),
            (te.onclose = (P) => _.emit("closed", P)),
            (te.onopen = async () => {
              try {
                _.emit("opened", te);
                const P = typeof r == "function" ? await r() : r;
                if (te.readyState !== v.OPEN) return;
                te.send(
                  cn(
                    P
                      ? { type: Te.ConnectionInit, payload: P }
                      : { type: Te.ConnectionInit },
                    w
                  )
                ),
                  isFinite(u) &&
                    u > 0 &&
                    (Se = setTimeout(() => {
                      te.close(
                        Je.ConnectionAcknowledgementTimeout,
                        "Connection acknowledgement timeout"
                      );
                    }, u)),
                  at();
              } catch (P) {
                _.emit("error", P),
                  te.close(
                    Je.InternalClientError,
                    Iu(
                      P instanceof Error ? P.message : new Error(P).message,
                      "Internal client error"
                    )
                  );
              }
            });
          let ct = !1;
          te.onmessage = ({ data: P }) => {
            try {
              const D = fw(P, m);
              if (
                (_.emit("message", D), D.type === "ping" || D.type === "pong")
              ) {
                _.emit(D.type, !0, D.payload),
                  D.type === "pong"
                    ? at()
                    : a ||
                      (te.send(
                        cn(
                          D.payload
                            ? { type: Te.Pong, payload: D.payload }
                            : { type: Te.Pong }
                        )
                      ),
                      _.emit("pong", !1, D.payload));
                return;
              }
              if (ct) return;
              if (D.type !== Te.ConnectionAck)
                throw new Error(`First message cannot be of type ${D.type}`);
              clearTimeout(Se),
                (ct = !0),
                _.emit("connected", te, D.payload),
                (M = !1),
                (L = 0),
                U([te, new Promise((H, G) => S(G))]);
            } catch (D) {
              (te.onmessage = null),
                _.emit("error", D),
                te.close(
                  Je.BadResponse,
                  Iu(
                    D instanceof Error ? D.message : new Error(D).message,
                    "Bad response"
                  )
                );
            }
          };
        })()
      )));
    I.readyState === v.CLOSING && (await Z);
    let z = () => {};
    const K = new Promise((U) => (z = U));
    return [
      I,
      z,
      Promise.race([
        K.then(() => {
          if (!T) {
            const U = () => I.close(1e3, "Normal Closure");
            isFinite(o) && o > 0
              ? (O = setTimeout(() => {
                  I.readyState === v.OPEN && U();
                }, o))
              : U();
          }
        }),
        Z,
      ]),
    ];
  }
  function W(I) {
    if (
      ei(I) &&
      (dw(I.code) ||
        [
          Je.InternalServerError,
          Je.InternalClientError,
          Je.BadRequest,
          Je.BadResponse,
          Je.Unauthorized,
          Je.SubprotocolNotAcceptable,
          Je.SubscriberAlreadyExists,
          Je.TooManyInitialisationRequests,
        ].includes(I.code))
    )
      throw I;
    if (Q) return !1;
    if (ei(I) && I.code === 1e3) return T > 0;
    if (!c || L >= c || !f(I) || (h != null && h(I))) throw I;
    return (M = !0);
  }
  return (
    n ||
      (async () => {
        for (T++; ; )
          try {
            const [, , I] = await q();
            await I;
          } catch (I) {
            try {
              if (!W(I)) return;
            } catch (Z) {
              return i == null ? void 0 : i(Z);
            }
          }
      })(),
    {
      on: _.on,
      subscribe(I, Z) {
        const z = b(I);
        let K = !1,
          U = !1,
          Ee = () => {
            T--, (K = !0);
          };
        return (
          (async () => {
            for (T++; ; )
              try {
                const [te, Se, be] = await q();
                if (K) return Se();
                const at = _.onMessage(z, (ct) => {
                  switch (ct.type) {
                    case Te.Next: {
                      Z.next(ct.payload);
                      return;
                    }
                    case Te.Error: {
                      (U = !0), (K = !0), Z.error(ct.payload), Ee();
                      return;
                    }
                    case Te.Complete: {
                      (K = !0), Ee();
                      return;
                    }
                  }
                });
                te.send(cn({ id: z, type: Te.Subscribe, payload: I }, w)),
                  (Ee = () => {
                    !K &&
                      te.readyState === v.OPEN &&
                      te.send(cn({ id: z, type: Te.Complete }, w)),
                      T--,
                      (K = !0),
                      Se();
                  }),
                  await be.finally(at);
                return;
              } catch (te) {
                if (!W(te)) return;
              }
          })()
            .then(() => {
              U || Z.complete();
            })
            .catch((te) => {
              Z.error(te);
            }),
          () => {
            K || Ee();
          }
        );
      },
      async dispose() {
        if (((Q = !0), k)) {
          const [I] = await k;
          I.close(1e3, "Normal Closure");
        }
      },
      terminate() {
        k &&
          _.emit("closed", { code: 4499, reason: "Terminated", wasClean: !1 });
      },
    }
  );
}
function ei(e) {
  return or(e) && "code" in e && "reason" in e;
}
function dw(e) {
  return [1e3, 1001, 1006, 1005, 1012, 1013, 1013].includes(e)
    ? !1
    : e >= 1e3 && e <= 1999;
}
function pw(e) {
  return (
    typeof e == "function" &&
    "constructor" in e &&
    "CLOSED" in e &&
    "CLOSING" in e &&
    "CONNECTING" in e &&
    "OPEN" in e
  );
}
function yw(e) {
  let t = !1,
    r = () => {
      t = !0;
    };
  return {
    ...hw({
      ...e,
      on: {
        ...e.on,
        opened: (i) => {
          var o, s;
          (s = (o = e.on) == null ? void 0 : o.opened) == null || s.call(o, i),
            (r = () => {
              i.readyState === WebSocket.OPEN
                ? i.close(4205, "Client Restart")
                : (t = !0);
            }),
            t && ((t = !1), r());
        },
      },
    }),
    restart: () => r(),
  };
}
const Be = {
    proxyCookies: !0,
    clientAwareness: !1,
    cookieAttributes: { maxAge: 604800, secure: !0 },
    clients: {
      default: {
        httpEndpoint:
          "https://rzcywmsyykhpunfkygpk.graphql.eu-central-1.nhost.run/v1",
        authType: "Bearer",
        authHeader: "Authorization",
        tokenName: "apollo:default.token",
        tokenStorage: "cookie",
      },
    },
  },
  vw = () => {
    const e = je(),
      t = async (n) => {
        var a;
        n = n || "default";
        const i =
            (a = Be == null ? void 0 : Be.clients) == null ? void 0 : a[n],
          o = pt(null);
        if ((await e.callHook("apollo:auth", { token: o, client: n }), o.value))
          return o.value;
        const s = i.tokenName;
        return (i == null ? void 0 : i.tokenStorage) === "cookie"
          ? Zo(s).value
          : localStorage.getItem(s) || null;
      },
      r = async ({ token: n, client: i, mode: o, skipResetStore: s }) => {
        var c, l, f;
        i = i || "default";
        const a =
            (c = Be == null ? void 0 : Be.clients) == null ? void 0 : c[i],
          u = i && a.tokenName;
        if ((a == null ? void 0 : a.tokenStorage) === "cookie") {
          const h =
              (i && (a == null ? void 0 : a.cookieAttributes)) ||
              (Be == null ? void 0 : Be.cookieAttributes),
            d = Zo(u, h);
          if (!d.value && o === "logout") return;
          d.value = (o === "login" && n) || null;
        } else
          (a == null ? void 0 : a.tokenStorage) === "localStorage" &&
            (o === "login" && n
              ? localStorage.setItem(u, n)
              : o === "logout" && localStorage.removeItem(u));
        (l = e == null ? void 0 : e._apolloWsClients) != null &&
          l[i] &&
          e._apolloWsClients[i].restart(),
          !s &&
            (await ((f = e == null ? void 0 : e._apolloClients) == null
              ? void 0
              : f[i]
                  .resetStore()
                  .catch((h) =>
                    console.log(
                      "%cError on cache reset",
                      "color: orange;",
                      h.message
                    )
                  )));
      };
    return {
      getToken: t,
      clients: e == null ? void 0 : e._apolloClients,
      onLogin: (n, i, o) =>
        r({ token: n, client: i, skipResetStore: o, mode: "login" }),
      onLogout: (n, i) => r({ client: n, skipResetStore: i, mode: "logout" }),
    };
  },
  mw = mr((e) => {
    var i, o;
    const r = {};
    for (const [s, a] of Object.entries(Be.clients)) {
      const u = async () => {
          var p, v;
          const w = pt();
          return (
            await e.callHook("apollo:auth", { token: w, client: s }),
            !w.value &&
            (a.tokenStorage === "cookie"
              ? (w.value = Zo(a.tokenName).value)
              : a.tokenStorage === "localStorage" &&
                (w.value = localStorage.getItem(a.tokenName)),
            !w.value)
              ? void 0
              : !!(
                  (v =
                    (p = w.value) == null ? void 0 : p.match(/^[a-zA-Z]+\s/)) !=
                    null && v[0]
                ) || (a == null ? void 0 : a.authType) === null
              ? w.value
              : `${a == null ? void 0 : a.authType} ${w.value}`
          );
        },
        l = cw(async (w, { headers: m }) => {
          const p = await u();
          if (p) return { headers: { ...m, [a.authHeader]: p } };
        }).concat(
          zf({
            ...((a == null ? void 0 : a.httpLinkOptions) && a.httpLinkOptions),
            uri: a.browserHttpEndpoint || a.httpEndpoint,
            headers: {
              ...(((i = a == null ? void 0 : a.httpLinkOptions) == null
                ? void 0
                : i.headers) || {}),
            },
          })
        );
      let f = null;
      if (a.wsEndpoint) {
        const w = yw({
          ...a.wsLinkOptions,
          url: a.wsEndpoint,
          connectionParams: async () => {
            const m = await u();
            if (m) return { [a.authHeader]: m };
          },
        });
        (f = new aw(w)),
          (e._apolloWsClients = e._apolloWsClients || {}),
          (e._apolloWsClients[s] = w);
      }
      const h = Vf((w) => {
          e.callHook("apollo:error", w);
        }),
        d = gt.from([
          h,
          ...(f
            ? [
                ...(a != null && a.websocketsOnly
                  ? [f]
                  : [
                      qb(
                        ({ query: w }) => {
                          const m = zi(w);
                          return (
                            m.kind === "OperationDefinition" &&
                            m.operation === "subscription"
                          );
                        },
                        f,
                        l
                      ),
                    ]),
              ]
            : [l]),
        ]),
        y = new G0(a.inMemoryCacheOptions);
      (r[s] = new iw({
        link: d,
        cache: y,
        ...Be.clientAwareness,
        ssrForceFetchDelay: 100,
        connectToDevTools: a.connectToDevTools || !1,
        defaultOptions: a == null ? void 0 : a.defaultOptions,
      })),
        !(r != null && r.default) &&
          !((o = Be == null ? void 0 : Be.clients) != null && o.default) &&
          s === Object.keys(Be.clients)[0] &&
          (r.default = r[s]);
      const b = `_apollo:${s}`;
      e.hook("app:rendered", () => {
        e.payload.data[b] = y.extract();
      }),
        e.payload.data[b] && y.restore(Xs(JSON.stringify(e.payload.data[b])));
    }
    e.vueApp.provide(ow, r), (e._apolloClients = r);
    const n = r == null ? void 0 : r.default;
    return {
      provide: {
        apolloHelpers: vw(),
        apollo: { clients: r, defaultClient: n },
      },
    };
  }),
  gw = mr((e) => {
    nm() &&
      (e.hooks.hook("link:prefetch", (t) => {
        if (!qi(t).protocol) return bc(t);
      }),
      Hi().beforeResolve(async (t, r) => {
        if (t.path === r.path) return;
        const n = await bc(t.path);
        n && Object.assign(e.static.data, n.data);
      }));
  }),
  bw = [om, sm, fm, Eg, Sg, mw, gw],
  ww = (e, t) =>
    t.path
      .replace(/(:\w+)\([^)]+\)/g, "$1")
      .replace(/(:\w+)[?+*]/g, "$1")
      .replace(/:\w+/g, (r) => {
        var n;
        return (
          ((n = e.params[r.slice(1)]) == null ? void 0 : n.toString()) || ""
        );
      }),
  _w = (e, t) => {
    const r = e.route.matched.find((i) => {
        var o;
        return (
          ((o = i.components) == null ? void 0 : o.default) === e.Component.type
        );
      }),
      n = t ?? (r == null ? void 0 : r.meta.key) ?? (r && ww(e.route, r));
    return typeof n == "function" ? n(e.route) : n;
  },
  Ew = (e, t) => ({ default: () => (e ? yt(Ld, e === !0 ? {} : e, t) : t) }),
  Sw = Xt({
    name: "FragmentWrapper",
    setup(e, { slots: t }) {
      return () => {
        var r;
        return (r = t.default) == null ? void 0 : r.call(t);
      };
    },
  }),
  Rs = (e, t, r) => ({
    default: () => (t ? yt(e, t === !0 ? {} : t, r) : yt(Sw, {}, r)),
  }),
  Ow = Xt({
    name: "NuxtPage",
    inheritAttrs: !1,
    props: {
      name: { type: String },
      transition: { type: [Boolean, Object], default: void 0 },
      keepalive: { type: [Boolean, Object], default: void 0 },
      route: { type: Object },
      pageKey: { type: [Function, String], default: null },
    },
    setup(e, { attrs: t }) {
      const r = je();
      return () =>
        yt(
          Cf,
          { name: e.name, route: e.route, ...t },
          {
            default: (n) => {
              if (!n.Component) return;
              const i = _w(n, e.pageKey),
                o = r.deferHydration(),
                s = !!(e.transition ?? n.route.meta.pageTransition ?? es),
                a =
                  s &&
                  kw(
                    [
                      e.transition,
                      n.route.meta.pageTransition,
                      es,
                      {
                        onAfterLeave: () => {
                          r.callHook("page:transition:finish", n.Component);
                        },
                      },
                    ].filter(Boolean)
                  );
              return Rs(
                Li,
                s && a,
                Ew(
                  e.keepalive ?? n.route.meta.keepalive ?? um,
                  yt(
                    hl,
                    {
                      onPending: () => r.callHook("page:start", n.Component),
                      onResolve: () => {
                        vr(() =>
                          r.callHook("page:finish", n.Component).finally(o)
                        );
                      },
                    },
                    {
                      default: () =>
                        yt(Rw, {
                          key: i,
                          routeProps: n,
                          pageKey: i,
                          hasTransition: s,
                        }),
                    }
                  )
                )
              ).default();
            },
          }
        );
    },
  });
function Tw(e) {
  return Array.isArray(e) ? e : e ? [e] : [];
}
function kw(e) {
  const t = e.map((r) => ({ ...r, onAfterLeave: Tw(r.onAfterLeave) }));
  return uv(...t);
}
const Rw = Xt({
    name: "RouteProvider",
    props: ["routeProps", "pageKey", "hasTransition"],
    setup(e) {
      const t = e.pageKey,
        r = e.routeProps.route,
        n = {};
      for (const i in e.routeProps.route)
        n[i] = $e(() => (t === e.pageKey ? e.routeProps.route[i] : r[i]));
      return Nr("_route", vt(n)), () => yt(e.routeProps.Component);
    },
  }),
  Cw = Xt({
    name: "LayoutLoader",
    inheritAttrs: !1,
    props: { name: String },
    async setup(e, t) {
      const r = await Rr[e.name]().then((n) => n.default || n);
      return () => yt(r, t.attrs, t.slots);
    },
  }),
  Pw = Xt({
    name: "NuxtLayout",
    inheritAttrs: !1,
    props: { name: { type: [String, Boolean, Object], default: null } },
    setup(e, t) {
      const r = We("_route"),
        n = r === af() ? pg() : r,
        i = $e(() => Ne(e.name) ?? n.meta.layout ?? "default");
      return () => {
        const o = i.value && i.value in Rr,
          s = n.meta.layoutTransition ?? cm;
        return Rs(Li, o && s, {
          default: () =>
            Rs(
              Cw,
              o && { key: i.value, name: i.value, ...t.attrs },
              t.slots
            ).default(),
        }).default();
      };
    },
  }),
  xw = (e, t) => {
    const r = e.__vccOpts || e;
    for (const [n, i] of t) r[n] = i;
    return r;
  },
  Iw = {};
function Aw(e, t) {
  const r = Ow,
    n = Pw;
  return (
    Tr(), lp("div", null, [ke(n, null, { default: Qs(() => [ke(r)]), _: 1 })])
  );
}
const Fw = xw(Iw, [["render", Aw]]),
  Au = {
    __name: "nuxt-root",
    setup(e) {
      const t = Nd(() =>
          cr(
            () => import("./error-component.f55d0bd7.js"),
            [],
            import.meta.url
          ).then((a) => a.default || a)
        ),
        r = () => null,
        n = je(),
        i = n.deferHydration();
      Nr("_route", af()),
        n.hooks.callHookWith((a) => a.map((u) => u()), "vue:setup");
      const o = $i();
      Sl((a, u, c) => {
        n.hooks
          .callHook("vue:error", a, u, c)
          .catch((l) => console.error("[nuxt] Error in `vue:error` hook", l)),
          dv(a) && (a.fatal || a.unhandled) && kt(n, kr, [a]);
      });
      const { islandContext: s } = !1;
      return (a, u) => (
        Tr(),
        Kn(
          hl,
          { onResolve: Ne(i) },
          {
            default: Qs(() => [
              Ne(o)
                ? (Tr(),
                  Kn(Ne(t), { key: 0, error: Ne(o) }, null, 8, ["error"]))
                : Ne(s)
                ? (Tr(),
                  Kn(Ne(r), { key: 1, context: Ne(s) }, null, 8, ["context"]))
                : (Tr(), Kn(Ne(Fw), { key: 2 })),
            ]),
            _: 1,
          },
          8,
          ["onResolve"]
        )
      );
    },
  };
globalThis.$fetch || (globalThis.$fetch = Ny.create({ baseURL: Ly() }));
let Fu;
const Dw = Yy(bw);
(Fu = async function () {
  var i;
  const r = Boolean((i = window.__NUXT__) == null ? void 0 : i.serverRendered)
      ? Gp(Au)
      : Jp(Au),
    n = Ky({ vueApp: r });
  try {
    await Gy(n, Dw);
  } catch (o) {
    await n.callHook("app:error", o), (n.payload.error = n.payload.error || o);
  }
  try {
    await n.hooks.callHook("app:created", r),
      await n.hooks.callHook("app:beforeMount", r),
      r.mount("#" + lm),
      await n.hooks.callHook("app:mounted", r),
      await vr();
  } catch (o) {
    await n.callHook("app:error", o), (n.payload.error = n.payload.error || o);
  }
}),
  Fu().catch((e) => {
    console.error("Error while mounting app:", e);
  });
export {
  Nf as A,
  je as B,
  $e as C,
  Mn as D,
  zs as E,
  Di as F,
  yt as G,
  $w as H,
  Qs as I,
  jl as J,
  Ae as K,
  Ww as L,
  Lw as M,
  jw as N,
  Uc as O,
  Df as S,
  zw as T,
  cr as _,
  Vw as a,
  Xt as b,
  Kn as c,
  Nd as d,
  lp as e,
  Ll as f,
  hp as g,
  xw as h,
  Uw as i,
  Hi as j,
  qw as k,
  _e as l,
  Qw as m,
  Nw as n,
  Tr as o,
  ke as p,
  xg as q,
  pt as r,
  Kw as s,
  Mw as t,
  Ne as u,
  Bw as v,
  Hw as w,
  Gw as x,
  Jw as y,
  Yw as z,
};
