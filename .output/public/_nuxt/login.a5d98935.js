import {
  i as y,
  j as h,
  a as i,
  b as f,
  r as g,
  o as p,
  e as _,
  k as I,
  v,
  u as a,
  f as u,
  l as w,
  m as x,
  t as L,
  h as k,
  p as E,
} from "./entry.e0843921.js";
import { n as c } from "./nhost.06efe5c8.js";
const m = y({
  id: "auth-store",
  state: () => ({ signInErrorMessage: "" }),
  actions: {},
  getters: {},
});
h();
const S = () => c.auth.isAuthenticated(),
  M = async (n) => {
    const { error: t, session: e } = await c.auth.signIn({
      email: n,
      securityKey: !0,
    });
    if (t) throw t;
    if (!e) throw (i("/auth/verify"), "User needs to verify email");
    return i("/"), e;
  },
  A = async (n) => {
    const { error: t, session: e } = await c.auth.signIn({ email: n });
    if (t) throw t;
    if (!e) throw (i("/auth/verify"), "User needs to verify email");
    return i("/"), e;
  },
  d = async (n, t) => {
    if (S()) return i("/"), "Successful login";
    let e;
    try {
      await M(n), console.log("ok");
      return;
    } catch (s) {
      console.log(s), (e = s);
    }
    try {
      await A(n);
      return;
    } catch (s) {
      e = s;
    }
    if (e) {
      const s = m();
      s.signInErrorMessage = e.message;
    }
  },
  F = { class: "login-form p-16 max-w-48 flex flex-col gap-4" },
  $ = { class: "text-white" },
  b = f({
    __name: "LoginForm",
    setup(n) {
      const t = g("");
      g("");
      const e = m(),
        { signInErrorMessage: s } = e;
      return (o, r) => (
        p(),
        _("div", F, [
          I(
            u(
              "input",
              {
                type: "email",
                name: "email",
                "onUpdate:modelValue":
                  r[0] || (r[0] = (l) => (w(t) ? (t.value = l) : null)),
                onKeyup:
                  r[1] ||
                  (r[1] = x(
                    (l) => ("signIn" in o ? o.signIn : a(d))(a(t)),
                    ["enter"]
                  )),
                autofocus: "",
                placeholder: "Epostadress",
                class: "px-4 py-2 rounded-lg",
              },
              null,
              544
            ),
            [[v, a(t)]]
          ),
          u(
            "button",
            {
              onClick:
                r[2] || (r[2] = (l) => ("signIn" in o ? o.signIn : a(d))(a(t))),
              class: "bg-slate-700 px-4 py-4 rounded-lg text-slate-50",
            },
            " Fortsätt "
          ),
          u("div", $, L(a(s)), 1),
        ])
      );
    },
  });
const B = k(b, [["__scopeId", "data-v-020f445a"]]),
  K = { class: "flex items-center justify-center h-screen" },
  j = f({
    __name: "login",
    setup(n) {
      return (
        (async () => {
          (await (() => c.auth.isAuthenticatedAsync())()) && i("/");
        })(),
        (e, s) => {
          const o = B;
          return p(), _("div", K, [E(o)]);
        }
      );
    },
  });
export { j as default };
