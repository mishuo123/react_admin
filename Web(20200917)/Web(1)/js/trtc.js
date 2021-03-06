!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).TRTC = t());
})(this, function () {
  var e =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};
  function t(e, t) {
    return e((t = { exports: {} }), t.exports), t.exports;
  }
  var n = function (e) {
      return e && e.Math == Math && e;
    },
    r =
      n("object" == typeof globalThis && globalThis) ||
      n("object" == typeof window && window) ||
      n("object" == typeof self && self) ||
      n("object" == typeof e && e) ||
      Function("return this")(),
    i = function (e) {
      try {
        return !!e();
      } catch (t) {
        return !0;
      }
    },
    o = !i(function () {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    }),
    a = {}.propertyIsEnumerable,
    s = Object.getOwnPropertyDescriptor,
    c = {
      f:
        s && !a.call({ 1: 2 }, 1)
          ? function (e) {
              var t = s(this, e);
              return !!t && t.enumerable;
            }
          : a,
    },
    u = function (e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t,
      };
    },
    d = {}.toString,
    l = function (e) {
      return d.call(e).slice(8, -1);
    },
    p = "".split,
    f = i(function () {
      return !Object("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return "String" == l(e) ? p.call(e, "") : Object(e);
        }
      : Object,
    h = function (e) {
      if (null == e) throw TypeError("Can't call method on " + e);
      return e;
    },
    m = function (e) {
      return f(h(e));
    },
    v = function (e) {
      return "object" == typeof e ? null !== e : "function" == typeof e;
    },
    g = function (e, t) {
      if (!v(e)) return e;
      var n, r;
      if (t && "function" == typeof (n = e.toString) && !v((r = n.call(e))))
        return r;
      if ("function" == typeof (n = e.valueOf) && !v((r = n.call(e)))) return r;
      if (!t && "function" == typeof (n = e.toString) && !v((r = n.call(e))))
        return r;
      throw TypeError("Can't convert object to primitive value");
    },
    _ = {}.hasOwnProperty,
    y = function (e, t) {
      return _.call(e, t);
    },
    S = r.document,
    b = v(S) && v(S.createElement),
    k = function (e) {
      return b ? S.createElement(e) : {};
    },
    R =
      !o &&
      !i(function () {
        return (
          7 !=
          Object.defineProperty(k("div"), "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      }),
    T = Object.getOwnPropertyDescriptor,
    w = {
      f: o
        ? T
        : function (e, t) {
            if (((e = m(e)), (t = g(t, !0)), R))
              try {
                return T(e, t);
              } catch (n) {}
            if (y(e, t)) return u(!c.f.call(e, t), e[t]);
          },
    },
    C = function (e) {
      if (!v(e)) throw TypeError(String(e) + " is not an object");
      return e;
    },
    E = Object.defineProperty,
    I = {
      f: o
        ? E
        : function (e, t, n) {
            if ((C(e), (t = g(t, !0)), C(n), R))
              try {
                return E(e, t, n);
              } catch (r) {}
            if ("get" in n || "set" in n)
              throw TypeError("Accessors not supported");
            return "value" in n && (e[t] = n.value), e;
          },
    },
    P = o
      ? function (e, t, n) {
          return I.f(e, t, u(1, n));
        }
      : function (e, t, n) {
          return (e[t] = n), e;
        },
    x = function (e, t) {
      try {
        P(r, e, t);
      } catch (n) {
        r[e] = t;
      }
      return t;
    },
    A = r["__core-js_shared__"] || x("__core-js_shared__", {}),
    O = Function.toString;
  "function" != typeof A.inspectSource &&
    (A.inspectSource = function (e) {
      return O.call(e);
    });
  var D,
    L,
    N,
    M = A.inspectSource,
    j = r.WeakMap,
    V = "function" == typeof j && /native code/.test(M(j)),
    U = t(function (e) {
      (e.exports = function (e, t) {
        return A[e] || (A[e] = void 0 !== t ? t : {});
      })("versions", []).push({
        version: "3.6.1",
        mode: "global",
        copyright: "?? 2019 Denis Pushkarev (zloirock.ru)",
      });
    }),
    F = 0,
    G = Math.random(),
    B = function (e) {
      return (
        "Symbol(" +
        String(void 0 === e ? "" : e) +
        ")_" +
        (++F + G).toString(36)
      );
    },
    H = U("keys"),
    z = function (e) {
      return H[e] || (H[e] = B(e));
    },
    W = {},
    J = r.WeakMap;
  if (V) {
    var q = new J(),
      K = q.get,
      $ = q.has,
      Y = q.set;
    (D = function (e, t) {
      return Y.call(q, e, t), t;
    }),
      (L = function (e) {
        return K.call(q, e) || {};
      }),
      (N = function (e) {
        return $.call(q, e);
      });
  } else {
    var Q = z("state");
    (W[Q] = !0),
      (D = function (e, t) {
        return P(e, Q, t), t;
      }),
      (L = function (e) {
        return y(e, Q) ? e[Q] : {};
      }),
      (N = function (e) {
        return y(e, Q);
      });
  }
  var X,
    Z,
    ee = {
      set: D,
      get: L,
      has: N,
      enforce: function (e) {
        return N(e) ? L(e) : D(e, {});
      },
      getterFor: function (e) {
        return function (t) {
          var n;
          if (!v(t) || (n = L(t)).type !== e)
            throw TypeError("Incompatible receiver, " + e + " required");
          return n;
        };
      },
    },
    te = t(function (e) {
      var t = ee.get,
        n = ee.enforce,
        i = String(String).split("String");
      (e.exports = function (e, t, o, a) {
        var s = !!a && !!a.unsafe,
          c = !!a && !!a.enumerable,
          u = !!a && !!a.noTargetGet;
        "function" == typeof o &&
          ("string" != typeof t || y(o, "name") || P(o, "name", t),
          (n(o).source = i.join("string" == typeof t ? t : ""))),
          e !== r
            ? (s ? !u && e[t] && (c = !0) : delete e[t],
              c ? (e[t] = o) : P(e, t, o))
            : c
            ? (e[t] = o)
            : x(t, o);
      })(Function.prototype, "toString", function () {
        return ("function" == typeof this && t(this).source) || M(this);
      });
    }),
    ne = r,
    re = function (e) {
      return "function" == typeof e ? e : void 0;
    },
    ie = function (e, t) {
      return arguments.length < 2
        ? re(ne[e]) || re(r[e])
        : (ne[e] && ne[e][t]) || (r[e] && r[e][t]);
    },
    oe = Math.ceil,
    ae = Math.floor,
    se = function (e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? ae : oe)(e);
    },
    ce = Math.min,
    ue = function (e) {
      return e > 0 ? ce(se(e), 9007199254740991) : 0;
    },
    de = Math.max,
    le = Math.min,
    pe = function (e, t) {
      var n = se(e);
      return n < 0 ? de(n + t, 0) : le(n, t);
    },
    fe = function (e) {
      return function (t, n, r) {
        var i,
          o = m(t),
          a = ue(o.length),
          s = pe(r, a);
        if (e && n != n) {
          for (; a > s; ) if ((i = o[s++]) != i) return !0;
        } else
          for (; a > s; s++)
            if ((e || s in o) && o[s] === n) return e || s || 0;
        return !e && -1;
      };
    },
    he = { includes: fe(!0), indexOf: fe(!1) },
    me = he.indexOf,
    ve = function (e, t) {
      var n,
        r = m(e),
        i = 0,
        o = [];
      for (n in r) !y(W, n) && y(r, n) && o.push(n);
      for (; t.length > i; ) y(r, (n = t[i++])) && (~me(o, n) || o.push(n));
      return o;
    },
    ge = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ],
    _e = ge.concat("length", "prototype"),
    ye = {
      f:
        Object.getOwnPropertyNames ||
        function (e) {
          return ve(e, _e);
        },
    },
    Se = { f: Object.getOwnPropertySymbols },
    be =
      ie("Reflect", "ownKeys") ||
      function (e) {
        var t = ye.f(C(e)),
          n = Se.f;
        return n ? t.concat(n(e)) : t;
      },
    ke = function (e, t) {
      for (var n = be(t), r = I.f, i = w.f, o = 0; o < n.length; o++) {
        var a = n[o];
        y(e, a) || r(e, a, i(t, a));
      }
    },
    Re = /#|\.prototype\./,
    Te = function (e, t) {
      var n = Ce[we(e)];
      return n == Ie || (n != Ee && ("function" == typeof t ? i(t) : !!t));
    },
    we = (Te.normalize = function (e) {
      return String(e).replace(Re, ".").toLowerCase();
    }),
    Ce = (Te.data = {}),
    Ee = (Te.NATIVE = "N"),
    Ie = (Te.POLYFILL = "P"),
    Pe = Te,
    xe = w.f,
    Ae = function (e, t) {
      var n,
        i,
        o,
        a,
        s,
        c = e.target,
        u = e.global,
        d = e.stat;
      if ((n = u ? r : d ? r[c] || x(c, {}) : (r[c] || {}).prototype))
        for (i in t) {
          if (
            ((a = t[i]),
            (o = e.noTargetGet ? (s = xe(n, i)) && s.value : n[i]),
            !Pe(u ? i : c + (d ? "." : "#") + i, e.forced) && void 0 !== o)
          ) {
            if (typeof a == typeof o) continue;
            ke(a, o);
          }
          (e.sham || (o && o.sham)) && P(a, "sham", !0), te(n, i, a, e);
        }
    },
    Oe =
      Array.isArray ||
      function (e) {
        return "Array" == l(e);
      },
    De = function (e) {
      return Object(h(e));
    },
    Le = function (e, t, n) {
      var r = g(t);
      r in e ? I.f(e, r, u(0, n)) : (e[r] = n);
    },
    Ne =
      !!Object.getOwnPropertySymbols &&
      !i(function () {
        return !String(Symbol());
      }),
    Me = Ne && !Symbol.sham && "symbol" == typeof Symbol.iterator,
    je = U("wks"),
    Ve = r.Symbol,
    Ue = Me ? Ve : (Ve && Ve.withoutSetter) || B,
    Fe = function (e) {
      return (
        y(je, e) ||
          (Ne && y(Ve, e) ? (je[e] = Ve[e]) : (je[e] = Ue("Symbol." + e))),
        je[e]
      );
    },
    Ge = Fe("species"),
    Be = function (e, t) {
      var n;
      return (
        Oe(e) &&
          ("function" != typeof (n = e.constructor) ||
          (n !== Array && !Oe(n.prototype))
            ? v(n) && null === (n = n[Ge]) && (n = void 0)
            : (n = void 0)),
        new (void 0 === n ? Array : n)(0 === t ? 0 : t)
      );
    },
    He = ie("navigator", "userAgent") || "",
    ze = r.process,
    We = ze && ze.versions,
    Je = We && We.v8;
  Je
    ? (Z = (X = Je.split("."))[0] + X[1])
    : He &&
      (!(X = He.match(/Edge\/(\d+)/)) || X[1] >= 74) &&
      (X = He.match(/Chrome\/(\d+)/)) &&
      (Z = X[1]);
  var qe = Z && +Z,
    Ke = Fe("species"),
    $e = function (e) {
      return (
        qe >= 51 ||
        !i(function () {
          var t = [];
          return (
            ((t.constructor = {})[Ke] = function () {
              return { foo: 1 };
            }),
            1 !== t[e](Boolean).foo
          );
        })
      );
    },
    Ye = Fe("isConcatSpreadable"),
    Qe =
      qe >= 51 ||
      !i(function () {
        var e = [];
        return (e[Ye] = !1), e.concat()[0] !== e;
      }),
    Xe = $e("concat"),
    Ze = function (e) {
      if (!v(e)) return !1;
      var t = e[Ye];
      return void 0 !== t ? !!t : Oe(e);
    };
  Ae(
    { target: "Array", proto: !0, forced: !Qe || !Xe },
    {
      concat: function (e) {
        var t,
          n,
          r,
          i,
          o,
          a = De(this),
          s = Be(a, 0),
          c = 0;
        for (t = -1, r = arguments.length; t < r; t++)
          if (((o = -1 === t ? a : arguments[t]), Ze(o))) {
            if (c + (i = ue(o.length)) > 9007199254740991)
              throw TypeError("Maximum allowed index exceeded");
            for (n = 0; n < i; n++, c++) n in o && Le(s, c, o[n]);
          } else {
            if (c >= 9007199254740991)
              throw TypeError("Maximum allowed index exceeded");
            Le(s, c++, o);
          }
        return (s.length = c), s;
      },
    }
  );
  var et = function (e) {
      if ("function" != typeof e)
        throw TypeError(String(e) + " is not a function");
      return e;
    },
    tt = function (e, t, n) {
      if ((et(e), void 0 === t)) return e;
      switch (n) {
        case 0:
          return function () {
            return e.call(t);
          };
        case 1:
          return function (n) {
            return e.call(t, n);
          };
        case 2:
          return function (n, r) {
            return e.call(t, n, r);
          };
        case 3:
          return function (n, r, i) {
            return e.call(t, n, r, i);
          };
      }
      return function () {
        return e.apply(t, arguments);
      };
    },
    nt = [].push,
    rt = function (e) {
      var t = 1 == e,
        n = 2 == e,
        r = 3 == e,
        i = 4 == e,
        o = 6 == e,
        a = 5 == e || o;
      return function (s, c, u, d) {
        for (
          var l,
            p,
            h = De(s),
            m = f(h),
            v = tt(c, u, 3),
            g = ue(m.length),
            _ = 0,
            y = d || Be,
            S = t ? y(s, g) : n ? y(s, 0) : void 0;
          g > _;
          _++
        )
          if ((a || _ in m) && ((p = v((l = m[_]), _, h)), e))
            if (t) S[_] = p;
            else if (p)
              switch (e) {
                case 3:
                  return !0;
                case 5:
                  return l;
                case 6:
                  return _;
                case 2:
                  nt.call(S, l);
              }
            else if (i) return !1;
        return o ? -1 : r || i ? i : S;
      };
    },
    it = {
      forEach: rt(0),
      map: rt(1),
      filter: rt(2),
      some: rt(3),
      every: rt(4),
      find: rt(5),
      findIndex: rt(6),
    },
    ot = it.filter,
    at = $e("filter"),
    st =
      at &&
      !i(function () {
        [].filter.call({ length: -1, 0: 1 }, function (e) {
          throw e;
        });
      });
  Ae(
    { target: "Array", proto: !0, forced: !at || !st },
    {
      filter: function (e) {
        return ot(this, e, arguments.length > 1 ? arguments[1] : void 0);
      },
    }
  );
  var ct = it.map,
    ut = $e("map"),
    dt =
      ut &&
      !i(function () {
        [].map.call({ length: -1, 0: 1 }, function (e) {
          throw e;
        });
      });
  function lt(e) {
    return (lt =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function pt(e, t, n, r, i, o, a) {
    try {
      var s = e[o](a),
        c = s.value;
    } catch (u) {
      return void n(u);
    }
    s.done ? t(c) : Promise.resolve(c).then(r, i);
  }
  function ft(e) {
    return function () {
      var t = this,
        n = arguments;
      return new Promise(function (r, i) {
        var o = e.apply(t, n);
        function a(e) {
          pt(o, r, i, a, s, "next", e);
        }
        function s(e) {
          pt(o, r, i, a, s, "throw", e);
        }
        a(void 0);
      });
    };
  }
  function ht(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function mt(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r);
    }
  }
  function vt(e, t, n) {
    return t && mt(e.prototype, t), n && mt(e, n), e;
  }
  function gt(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function _t(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {},
        r = Object.keys(n);
      "function" == typeof Object.getOwnPropertySymbols &&
        (r = r.concat(
          Object.getOwnPropertySymbols(n).filter(function (e) {
            return Object.getOwnPropertyDescriptor(n, e).enumerable;
          })
        )),
        r.forEach(function (t) {
          gt(e, t, n[t]);
        });
    }
    return e;
  }
  function yt(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError("Super expression must either be null or a function");
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, writable: !0, configurable: !0 },
    })),
      t && bt(e, t);
  }
  function St(e) {
    return (St = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
  }
  function bt(e, t) {
    return (bt =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
  }
  function kt(e, t, n) {
    return (kt = (function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    })()
      ? Reflect.construct
      : function (e, t, n) {
          var r = [null];
          r.push.apply(r, t);
          var i = new (Function.bind.apply(e, r))();
          return n && bt(i, n.prototype), i;
        }).apply(null, arguments);
  }
  function Rt(e) {
    var t = "function" == typeof Map ? new Map() : void 0;
    return (Rt = function (e) {
      if (
        null === e ||
        ((n = e), -1 === Function.toString.call(n).indexOf("[native code]"))
      )
        return e;
      var n;
      if ("function" != typeof e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      if (void 0 !== t) {
        if (t.has(e)) return t.get(e);
        t.set(e, r);
      }
      function r() {
        return kt(e, arguments, St(this).constructor);
      }
      return (
        (r.prototype = Object.create(e.prototype, {
          constructor: {
            value: r,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        bt(r, e)
      );
    })(e);
  }
  function Tt(e, t) {
    return !t || ("object" != typeof t && "function" != typeof t)
      ? (function (e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        })(e)
      : t;
  }
  function wt(e, t, n) {
    return (wt =
      "undefined" != typeof Reflect && Reflect.get
        ? Reflect.get
        : function (e, t, n) {
            var r = (function (e, t) {
              for (
                ;
                !Object.prototype.hasOwnProperty.call(e, t) &&
                null !== (e = St(e));

              );
              return e;
            })(e, t);
            if (r) {
              var i = Object.getOwnPropertyDescriptor(r, t);
              return i.get ? i.get.call(n) : i.value;
            }
          })(e, t, n || e);
  }
  function Ct(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n = [],
          r = !0,
          i = !1,
          o = void 0;
        try {
          for (
            var a, s = e[Symbol.iterator]();
            !(r = (a = s.next()).done) &&
            (n.push(a.value), !t || n.length !== t);
            r = !0
          );
        } catch (c) {
          (i = !0), (o = c);
        } finally {
          try {
            r || null == s.return || s.return();
          } finally {
            if (i) throw o;
          }
        }
        return n;
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      })()
    );
  }
  Ae(
    { target: "Array", proto: !0, forced: !ut || !dt },
    {
      map: function (e) {
        return ct(this, e, arguments.length > 1 ? arguments[1] : void 0);
      },
    }
  );
  t(function (e) {
    !(function (t) {
      var n,
        r = Object.prototype,
        i = r.hasOwnProperty,
        o = "function" == typeof Symbol ? Symbol : {},
        a = o.iterator || "@@iterator",
        s = o.asyncIterator || "@@asyncIterator",
        c = o.toStringTag || "@@toStringTag",
        u = t.regeneratorRuntime;
      if (u) e.exports = u;
      else {
        (u = t.regeneratorRuntime = e.exports).wrap = y;
        var d = "suspendedStart",
          l = "suspendedYield",
          p = "executing",
          f = "completed",
          h = {},
          m = {};
        m[a] = function () {
          return this;
        };
        var v = Object.getPrototypeOf,
          g = v && v(v(x([])));
        g && g !== r && i.call(g, a) && (m = g);
        var _ = (R.prototype = b.prototype = Object.create(m));
        (k.prototype = _.constructor = R),
          (R.constructor = k),
          (R[c] = k.displayName = "GeneratorFunction"),
          (u.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return (
              !!t &&
              (t === k || "GeneratorFunction" === (t.displayName || t.name))
            );
          }),
          (u.mark = function (e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, R)
                : ((e.__proto__ = R), c in e || (e[c] = "GeneratorFunction")),
              (e.prototype = Object.create(_)),
              e
            );
          }),
          (u.awrap = function (e) {
            return { __await: e };
          }),
          T(w.prototype),
          (w.prototype[s] = function () {
            return this;
          }),
          (u.AsyncIterator = w),
          (u.async = function (e, t, n, r) {
            var i = new w(y(e, t, n, r));
            return u.isGeneratorFunction(t)
              ? i
              : i.next().then(function (e) {
                  return e.done ? e.value : i.next();
                });
          }),
          T(_),
          (_[c] = "Generator"),
          (_[a] = function () {
            return this;
          }),
          (_.toString = function () {
            return "[object Generator]";
          }),
          (u.keys = function (e) {
            var t = [];
            for (var n in e) t.push(n);
            return (
              t.reverse(),
              function n() {
                for (; t.length; ) {
                  var r = t.pop();
                  if (r in e) return (n.value = r), (n.done = !1), n;
                }
                return (n.done = !0), n;
              }
            );
          }),
          (u.values = x),
          (P.prototype = {
            constructor: P,
            reset: function (e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = n),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = n),
                this.tryEntries.forEach(I),
                !e)
              )
                for (var t in this)
                  "t" === t.charAt(0) &&
                    i.call(this, t) &&
                    !isNaN(+t.slice(1)) &&
                    (this[t] = n);
            },
            stop: function () {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function (e) {
              if (this.done) throw e;
              var t = this;
              function r(r, i) {
                return (
                  (s.type = "throw"),
                  (s.arg = e),
                  (t.next = r),
                  i && ((t.method = "next"), (t.arg = n)),
                  !!i
                );
              }
              for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                var a = this.tryEntries[o],
                  s = a.completion;
                if ("root" === a.tryLoc) return r("end");
                if (a.tryLoc <= this.prev) {
                  var c = i.call(a, "catchLoc"),
                    u = i.call(a, "finallyLoc");
                  if (c && u) {
                    if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                    if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                  } else if (c) {
                    if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                  } else {
                    if (!u)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (e, t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (
                  r.tryLoc <= this.prev &&
                  i.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var o = r;
                  break;
                }
              }
              o &&
                ("break" === e || "continue" === e) &&
                o.tryLoc <= t &&
                t <= o.finallyLoc &&
                (o = null);
              var a = o ? o.completion : {};
              return (
                (a.type = e),
                (a.arg = t),
                o
                  ? ((this.method = "next"), (this.next = o.finallyLoc), h)
                  : this.complete(a)
              );
            },
            complete: function (e, t) {
              if ("throw" === e.type) throw e.arg;
              return (
                "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                h
              );
            },
            finish: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var n = this.tryEntries[t];
                if (n.finallyLoc === e)
                  return this.complete(n.completion, n.afterLoc), I(n), h;
              }
            },
            catch: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var n = this.tryEntries[t];
                if (n.tryLoc === e) {
                  var r = n.completion;
                  if ("throw" === r.type) {
                    var i = r.arg;
                    I(n);
                  }
                  return i;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (e, t, r) {
              return (
                (this.delegate = { iterator: x(e), resultName: t, nextLoc: r }),
                "next" === this.method && (this.arg = n),
                h
              );
            },
          });
      }
      function y(e, t, n, r) {
        var i = t && t.prototype instanceof b ? t : b,
          o = Object.create(i.prototype),
          a = new P(r || []);
        return (
          (o._invoke = (function (e, t, n) {
            var r = d;
            return function (i, o) {
              if (r === p) throw new Error("Generator is already running");
              if (r === f) {
                if ("throw" === i) throw o;
                return A();
              }
              for (n.method = i, n.arg = o; ; ) {
                var a = n.delegate;
                if (a) {
                  var s = C(a, n);
                  if (s) {
                    if (s === h) continue;
                    return s;
                  }
                }
                if ("next" === n.method) n.sent = n._sent = n.arg;
                else if ("throw" === n.method) {
                  if (r === d) throw ((r = f), n.arg);
                  n.dispatchException(n.arg);
                } else "return" === n.method && n.abrupt("return", n.arg);
                r = p;
                var c = S(e, t, n);
                if ("normal" === c.type) {
                  if (((r = n.done ? f : l), c.arg === h)) continue;
                  return { value: c.arg, done: n.done };
                }
                "throw" === c.type &&
                  ((r = f), (n.method = "throw"), (n.arg = c.arg));
              }
            };
          })(e, n, a)),
          o
        );
      }
      function S(e, t, n) {
        try {
          return { type: "normal", arg: e.call(t, n) };
        } catch (r) {
          return { type: "throw", arg: r };
        }
      }
      function b() {}
      function k() {}
      function R() {}
      function T(e) {
        ["next", "throw", "return"].forEach(function (t) {
          e[t] = function (e) {
            return this._invoke(t, e);
          };
        });
      }
      function w(e) {
        var t;
        this._invoke = function (n, r) {
          function o() {
            return new Promise(function (t, o) {
              !(function t(n, r, o, a) {
                var s = S(e[n], e, r);
                if ("throw" !== s.type) {
                  var c = s.arg,
                    u = c.value;
                  return u && "object" == typeof u && i.call(u, "__await")
                    ? Promise.resolve(u.__await).then(
                        function (e) {
                          t("next", e, o, a);
                        },
                        function (e) {
                          t("throw", e, o, a);
                        }
                      )
                    : Promise.resolve(u).then(function (e) {
                        (c.value = e), o(c);
                      }, a);
                }
                a(s.arg);
              })(n, r, t, o);
            });
          }
          return (t = t ? t.then(o, o) : o());
        };
      }
      function C(e, t) {
        var r = e.iterator[t.method];
        if (r === n) {
          if (((t.delegate = null), "throw" === t.method)) {
            if (
              e.iterator.return &&
              ((t.method = "return"),
              (t.arg = n),
              C(e, t),
              "throw" === t.method)
            )
              return h;
            (t.method = "throw"),
              (t.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return h;
        }
        var i = S(r, e.iterator, t.arg);
        if ("throw" === i.type)
          return (t.method = "throw"), (t.arg = i.arg), (t.delegate = null), h;
        var o = i.arg;
        return o
          ? o.done
            ? ((t[e.resultName] = o.value),
              (t.next = e.nextLoc),
              "return" !== t.method && ((t.method = "next"), (t.arg = n)),
              (t.delegate = null),
              h)
            : o
          : ((t.method = "throw"),
            (t.arg = new TypeError("iterator result is not an object")),
            (t.delegate = null),
            h);
      }
      function E(e) {
        var t = { tryLoc: e[0] };
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t);
      }
      function I(e) {
        var t = e.completion || {};
        (t.type = "normal"), delete t.arg, (e.completion = t);
      }
      function P(e) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          e.forEach(E, this),
          this.reset(!0);
      }
      function x(e) {
        if (e) {
          var t = e[a];
          if (t) return t.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var r = -1,
              o = function t() {
                for (; ++r < e.length; )
                  if (i.call(e, r)) return (t.value = e[r]), (t.done = !1), t;
                return (t.value = n), (t.done = !0), t;
              };
            return (o.next = o);
          }
        }
        return { next: A };
      }
      function A() {
        return { value: n, done: !0 };
      }
    })(
      (function () {
        return this;
      })() || Function("return this")()
    );
  });
  let Et = !0,
    It = !0;
  function Pt(e, t, n) {
    const r = e.match(t);
    return r && r.length >= n && parseInt(r[n], 10);
  }
  function xt(e, t, n) {
    if (!e.RTCPeerConnection) return;
    const r = e.RTCPeerConnection.prototype,
      i = r.addEventListener;
    r.addEventListener = function (e, r) {
      if (e !== t) return i.apply(this, arguments);
      const o = (e) => {
        const t = n(e);
        t && r(t);
      };
      return (
        (this._eventMap = this._eventMap || {}),
        (this._eventMap[r] = o),
        i.apply(this, [e, o])
      );
    };
    const o = r.removeEventListener;
    (r.removeEventListener = function (e, n) {
      if (e !== t || !this._eventMap || !this._eventMap[n])
        return o.apply(this, arguments);
      const r = this._eventMap[n];
      return delete this._eventMap[n], o.apply(this, [e, r]);
    }),
      Object.defineProperty(r, "on" + t, {
        get() {
          return this["_on" + t];
        },
        set(e) {
          this["_on" + t] &&
            (this.removeEventListener(t, this["_on" + t]),
            delete this["_on" + t]),
            e && this.addEventListener(t, (this["_on" + t] = e));
        },
        enumerable: !0,
        configurable: !0,
      });
  }
  function At(e) {
    return "boolean" != typeof e
      ? new Error("Argument type: " + typeof e + ". Please use a boolean.")
      : ((Et = e),
        e ? "adapter.js logging disabled" : "adapter.js logging enabled");
  }
  function Ot(e) {
    return "boolean" != typeof e
      ? new Error("Argument type: " + typeof e + ". Please use a boolean.")
      : ((It = !e),
        "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"));
  }
  function Dt() {
    if ("object" == typeof window) {
      if (Et) return;
      "undefined" != typeof console &&
        "function" == typeof console.log &&
        console.log.apply(console, arguments);
    }
  }
  function Lt(e, t) {
    It && console.warn(e + " is deprecated, please use " + t + " instead.");
  }
  function Nt(e) {
    const { navigator: t } = e,
      n = { browser: null, version: null };
    if (void 0 === e || !e.navigator) return (n.browser = "Not a browser."), n;
    if (t.mozGetUserMedia)
      (n.browser = "firefox"),
        (n.version = Pt(t.userAgent, /Firefox\/(\d+)\./, 1));
    else if (
      t.webkitGetUserMedia ||
      (!1 === e.isSecureContext &&
        e.webkitRTCPeerConnection &&
        !e.RTCIceGatherer)
    )
      (n.browser = "chrome"),
        (n.version = Pt(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2));
    else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/))
      (n.browser = "edge"),
        (n.version = Pt(t.userAgent, /Edge\/(\d+).(\d+)$/, 2));
    else {
      if (!e.RTCPeerConnection || !t.userAgent.match(/AppleWebKit\/(\d+)\./))
        return (n.browser = "Not a supported browser."), n;
      (n.browser = "safari"),
        (n.version = Pt(t.userAgent, /AppleWebKit\/(\d+)\./, 1)),
        (n.supportsUnifiedPlan =
          e.RTCRtpTransceiver &&
          "currentDirection" in e.RTCRtpTransceiver.prototype);
    }
    return n;
  }
  function Mt(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }
  function jt(e) {
    return Mt(e)
      ? Object.keys(e).reduce(function (t, n) {
          const r = Mt(e[n]),
            i = r ? jt(e[n]) : e[n],
            o = r && !Object.keys(i).length;
          return void 0 === i || o ? t : Object.assign(t, { [n]: i });
        }, {})
      : e;
  }
  function Vt(e, t, n) {
    const r = n ? "outbound-rtp" : "inbound-rtp",
      i = new Map();
    if (null === t) return i;
    const o = [];
    return (
      e.forEach((e) => {
        "track" === e.type && e.trackIdentifier === t.id && o.push(e);
      }),
      o.forEach((t) => {
        e.forEach((n) => {
          n.type === r &&
            n.trackId === t.id &&
            (function e(t, n, r) {
              n &&
                !r.has(n.id) &&
                (r.set(n.id, n),
                Object.keys(n).forEach((i) => {
                  i.endsWith("Id")
                    ? e(t, t.get(n[i]), r)
                    : i.endsWith("Ids") &&
                      n[i].forEach((n) => {
                        e(t, t.get(n), r);
                      });
                }));
            })(e, n, i);
        });
      }),
      i
    );
  }
  const Ut = Dt;
  function Ft(e) {
    const t = e && e.navigator;
    if (!t.mediaDevices) return;
    const n = Nt(e),
      r = function (e) {
        if ("object" != typeof e || e.mandatory || e.optional) return e;
        const t = {};
        return (
          Object.keys(e).forEach((n) => {
            if ("require" === n || "advanced" === n || "mediaSource" === n)
              return;
            const r = "object" == typeof e[n] ? e[n] : { ideal: e[n] };
            void 0 !== r.exact &&
              "number" == typeof r.exact &&
              (r.min = r.max = r.exact);
            const i = function (e, t) {
              return e
                ? e + t.charAt(0).toUpperCase() + t.slice(1)
                : "deviceId" === t
                ? "sourceId"
                : t;
            };
            if (void 0 !== r.ideal) {
              t.optional = t.optional || [];
              let e = {};
              "number" == typeof r.ideal
                ? ((e[i("min", n)] = r.ideal),
                  t.optional.push(e),
                  ((e = {})[i("max", n)] = r.ideal),
                  t.optional.push(e))
                : ((e[i("", n)] = r.ideal), t.optional.push(e));
            }
            void 0 !== r.exact && "number" != typeof r.exact
              ? ((t.mandatory = t.mandatory || {}),
                (t.mandatory[i("", n)] = r.exact))
              : ["min", "max"].forEach((e) => {
                  void 0 !== r[e] &&
                    ((t.mandatory = t.mandatory || {}),
                    (t.mandatory[i(e, n)] = r[e]));
                });
          }),
          e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
          t
        );
      },
      i = function (e, i) {
        if (n.version >= 61) return i(e);
        if ((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
          const t = function (e, t, n) {
            t in e && !(n in e) && ((e[n] = e[t]), delete e[t]);
          };
          t(
            (e = JSON.parse(JSON.stringify(e))).audio,
            "autoGainControl",
            "googAutoGainControl"
          ),
            t(e.audio, "noiseSuppression", "googNoiseSuppression"),
            (e.audio = r(e.audio));
        }
        if (e && "object" == typeof e.video) {
          let o = e.video.facingMode;
          o = o && ("object" == typeof o ? o : { ideal: o });
          const a = n.version < 66;
          if (
            o &&
            ("user" === o.exact ||
              "environment" === o.exact ||
              "user" === o.ideal ||
              "environment" === o.ideal) &&
            (!t.mediaDevices.getSupportedConstraints ||
              !t.mediaDevices.getSupportedConstraints().facingMode ||
              a)
          ) {
            let n;
            if (
              (delete e.video.facingMode,
              "environment" === o.exact || "environment" === o.ideal
                ? (n = ["back", "rear"])
                : ("user" !== o.exact && "user" !== o.ideal) || (n = ["front"]),
              n)
            )
              return t.mediaDevices.enumerateDevices().then((t) => {
                let a = (t = t.filter((e) => "videoinput" === e.kind)).find(
                  (e) => n.some((t) => e.label.toLowerCase().includes(t))
                );
                return (
                  !a && t.length && n.includes("back") && (a = t[t.length - 1]),
                  a &&
                    (e.video.deviceId = o.exact
                      ? { exact: a.deviceId }
                      : { ideal: a.deviceId }),
                  (e.video = r(e.video)),
                  Ut("chrome: " + JSON.stringify(e)),
                  i(e)
                );
              });
          }
          e.video = r(e.video);
        }
        return Ut("chrome: " + JSON.stringify(e)), i(e);
      },
      o = function (e) {
        return n.version >= 64
          ? e
          : {
              name:
                {
                  PermissionDeniedError: "NotAllowedError",
                  PermissionDismissedError: "NotAllowedError",
                  InvalidStateError: "NotAllowedError",
                  DevicesNotFoundError: "NotFoundError",
                  ConstraintNotSatisfiedError: "OverconstrainedError",
                  TrackStartError: "NotReadableError",
                  MediaDeviceFailedDueToShutdown: "NotAllowedError",
                  MediaDeviceKillSwitchOn: "NotAllowedError",
                  TabCaptureError: "AbortError",
                  ScreenCaptureError: "AbortError",
                  DeviceCaptureError: "AbortError",
                }[e.name] || e.name,
              message: e.message,
              constraint: e.constraint || e.constraintName,
              toString() {
                return this.name + (this.message && ": ") + this.message;
              },
            };
      };
    if (
      ((t.getUserMedia = function (e, n, r) {
        i(e, (e) => {
          t.webkitGetUserMedia(e, n, (e) => {
            r && r(o(e));
          });
        });
      }.bind(t)),
      t.mediaDevices.getUserMedia)
    ) {
      const e = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
      t.mediaDevices.getUserMedia = function (t) {
        return i(t, (t) =>
          e(t).then(
            (e) => {
              if (
                (t.audio && !e.getAudioTracks().length) ||
                (t.video && !e.getVideoTracks().length)
              )
                throw (
                  (e.getTracks().forEach((e) => {
                    e.stop();
                  }),
                  new DOMException("", "NotFoundError"))
                );
              return e;
            },
            (e) => Promise.reject(o(e))
          )
        );
      };
    }
  }
  function Gt(e) {
    e.MediaStream = e.MediaStream || e.webkitMediaStream;
  }
  function Bt(e) {
    if (
      "object" != typeof e ||
      !e.RTCPeerConnection ||
      "ontrack" in e.RTCPeerConnection.prototype
    )
      xt(
        e,
        "track",
        (e) => (
          e.transceiver ||
            Object.defineProperty(e, "transceiver", {
              value: { receiver: e.receiver },
            }),
          e
        )
      );
    else {
      Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
        get() {
          return this._ontrack;
        },
        set(e) {
          this._ontrack && this.removeEventListener("track", this._ontrack),
            this.addEventListener("track", (this._ontrack = e));
        },
        enumerable: !0,
        configurable: !0,
      });
      const t = e.RTCPeerConnection.prototype.setRemoteDescription;
      e.RTCPeerConnection.prototype.setRemoteDescription = function () {
        return (
          this._ontrackpoly ||
            ((this._ontrackpoly = (t) => {
              t.stream.addEventListener("addtrack", (n) => {
                let r;
                r = e.RTCPeerConnection.prototype.getReceivers
                  ? this.getReceivers().find(
                      (e) => e.track && e.track.id === n.track.id
                    )
                  : { track: n.track };
                const i = new Event("track");
                (i.track = n.track),
                  (i.receiver = r),
                  (i.transceiver = { receiver: r }),
                  (i.streams = [t.stream]),
                  this.dispatchEvent(i);
              }),
                t.stream.getTracks().forEach((n) => {
                  let r;
                  r = e.RTCPeerConnection.prototype.getReceivers
                    ? this.getReceivers().find(
                        (e) => e.track && e.track.id === n.id
                      )
                    : { track: n };
                  const i = new Event("track");
                  (i.track = n),
                    (i.receiver = r),
                    (i.transceiver = { receiver: r }),
                    (i.streams = [t.stream]),
                    this.dispatchEvent(i);
                });
            }),
            this.addEventListener("addstream", this._ontrackpoly)),
          t.apply(this, arguments)
        );
      };
    }
  }
  function Ht(e) {
    if (
      "object" == typeof e &&
      e.RTCPeerConnection &&
      !("getSenders" in e.RTCPeerConnection.prototype) &&
      "createDTMFSender" in e.RTCPeerConnection.prototype
    ) {
      const t = function (e, t) {
        return {
          track: t,
          get dtmf() {
            return (
              void 0 === this._dtmf &&
                ("audio" === t.kind
                  ? (this._dtmf = e.createDTMFSender(t))
                  : (this._dtmf = null)),
              this._dtmf
            );
          },
          _pc: e,
        };
      };
      if (!e.RTCPeerConnection.prototype.getSenders) {
        e.RTCPeerConnection.prototype.getSenders = function () {
          return (this._senders = this._senders || []), this._senders.slice();
        };
        const n = e.RTCPeerConnection.prototype.addTrack;
        e.RTCPeerConnection.prototype.addTrack = function (e, r) {
          let i = n.apply(this, arguments);
          return i || ((i = t(this, e)), this._senders.push(i)), i;
        };
        const r = e.RTCPeerConnection.prototype.removeTrack;
        e.RTCPeerConnection.prototype.removeTrack = function (e) {
          r.apply(this, arguments);
          const t = this._senders.indexOf(e);
          -1 !== t && this._senders.splice(t, 1);
        };
      }
      const n = e.RTCPeerConnection.prototype.addStream;
      e.RTCPeerConnection.prototype.addStream = function (e) {
        (this._senders = this._senders || []),
          n.apply(this, [e]),
          e.getTracks().forEach((e) => {
            this._senders.push(t(this, e));
          });
      };
      const r = e.RTCPeerConnection.prototype.removeStream;
      e.RTCPeerConnection.prototype.removeStream = function (e) {
        (this._senders = this._senders || []),
          r.apply(this, [e]),
          e.getTracks().forEach((e) => {
            const t = this._senders.find((t) => t.track === e);
            t && this._senders.splice(this._senders.indexOf(t), 1);
          });
      };
    } else if (
      "object" == typeof e &&
      e.RTCPeerConnection &&
      "getSenders" in e.RTCPeerConnection.prototype &&
      "createDTMFSender" in e.RTCPeerConnection.prototype &&
      e.RTCRtpSender &&
      !("dtmf" in e.RTCRtpSender.prototype)
    ) {
      const t = e.RTCPeerConnection.prototype.getSenders;
      (e.RTCPeerConnection.prototype.getSenders = function () {
        const e = t.apply(this, []);
        return e.forEach((e) => (e._pc = this)), e;
      }),
        Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
          get() {
            return (
              void 0 === this._dtmf &&
                ("audio" === this.track.kind
                  ? (this._dtmf = this._pc.createDTMFSender(this.track))
                  : (this._dtmf = null)),
              this._dtmf
            );
          },
        });
    }
  }
  function zt(e) {
    if (!e.RTCPeerConnection) return;
    const t = e.RTCPeerConnection.prototype.getStats;
    e.RTCPeerConnection.prototype.getStats = function () {
      const [e, n, r] = arguments;
      if (arguments.length > 0 && "function" == typeof e)
        return t.apply(this, arguments);
      if (0 === t.length && (0 === arguments.length || "function" != typeof e))
        return t.apply(this, []);
      const i = function (e) {
          const t = {};
          return (
            e.result().forEach((e) => {
              const n = {
                id: e.id,
                timestamp: e.timestamp,
                type:
                  {
                    localcandidate: "local-candidate",
                    remotecandidate: "remote-candidate",
                  }[e.type] || e.type,
              };
              e.names().forEach((t) => {
                n[t] = e.stat(t);
              }),
                (t[n.id] = n);
            }),
            t
          );
        },
        o = function (e) {
          return new Map(Object.keys(e).map((t) => [t, e[t]]));
        };
      if (arguments.length >= 2) {
        const r = function (e) {
          n(o(i(e)));
        };
        return t.apply(this, [r, e]);
      }
      return new Promise((e, n) => {
        t.apply(this, [
          function (t) {
            e(o(i(t)));
          },
          n,
        ]);
      }).then(n, r);
    };
  }
  function Wt(e) {
    if (
      !(
        "object" == typeof e &&
        e.RTCPeerConnection &&
        e.RTCRtpSender &&
        e.RTCRtpReceiver
      )
    )
      return;
    if (!("getStats" in e.RTCRtpSender.prototype)) {
      const t = e.RTCPeerConnection.prototype.getSenders;
      t &&
        (e.RTCPeerConnection.prototype.getSenders = function () {
          const e = t.apply(this, []);
          return e.forEach((e) => (e._pc = this)), e;
        });
      const n = e.RTCPeerConnection.prototype.addTrack;
      n &&
        (e.RTCPeerConnection.prototype.addTrack = function () {
          const e = n.apply(this, arguments);
          return (e._pc = this), e;
        }),
        (e.RTCRtpSender.prototype.getStats = function () {
          const e = this;
          return this._pc.getStats().then((t) => Vt(t, e.track, !0));
        });
    }
    if (!("getStats" in e.RTCRtpReceiver.prototype)) {
      const t = e.RTCPeerConnection.prototype.getReceivers;
      t &&
        (e.RTCPeerConnection.prototype.getReceivers = function () {
          const e = t.apply(this, []);
          return e.forEach((e) => (e._pc = this)), e;
        }),
        xt(e, "track", (e) => ((e.receiver._pc = e.srcElement), e)),
        (e.RTCRtpReceiver.prototype.getStats = function () {
          const e = this;
          return this._pc.getStats().then((t) => Vt(t, e.track, !1));
        });
    }
    if (
      !(
        "getStats" in e.RTCRtpSender.prototype &&
        "getStats" in e.RTCRtpReceiver.prototype
      )
    )
      return;
    const t = e.RTCPeerConnection.prototype.getStats;
    e.RTCPeerConnection.prototype.getStats = function () {
      if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
        const e = arguments[0];
        let t, n, r;
        return (
          this.getSenders().forEach((n) => {
            n.track === e && (t ? (r = !0) : (t = n));
          }),
          this.getReceivers().forEach(
            (t) => (t.track === e && (n ? (r = !0) : (n = t)), t.track === e)
          ),
          r || (t && n)
            ? Promise.reject(
                new DOMException(
                  "There are more than one sender or receiver for the track.",
                  "InvalidAccessError"
                )
              )
            : t
            ? t.getStats()
            : n
            ? n.getStats()
            : Promise.reject(
                new DOMException(
                  "There is no sender or receiver for the track.",
                  "InvalidAccessError"
                )
              )
        );
      }
      return t.apply(this, arguments);
    };
  }
  function Jt(e) {
    e.RTCPeerConnection.prototype.getLocalStreams = function () {
      return (
        (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
        Object.keys(this._shimmedLocalStreams).map(
          (e) => this._shimmedLocalStreams[e][0]
        )
      );
    };
    const t = e.RTCPeerConnection.prototype.addTrack;
    e.RTCPeerConnection.prototype.addTrack = function (e, n) {
      if (!n) return t.apply(this, arguments);
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      const r = t.apply(this, arguments);
      return (
        this._shimmedLocalStreams[n.id]
          ? -1 === this._shimmedLocalStreams[n.id].indexOf(r) &&
            this._shimmedLocalStreams[n.id].push(r)
          : (this._shimmedLocalStreams[n.id] = [n, r]),
        r
      );
    };
    const n = e.RTCPeerConnection.prototype.addStream;
    e.RTCPeerConnection.prototype.addStream = function (e) {
      (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
        e.getTracks().forEach((e) => {
          if (this.getSenders().find((t) => t.track === e))
            throw new DOMException(
              "Track already exists.",
              "InvalidAccessError"
            );
        });
      const t = this.getSenders();
      n.apply(this, arguments);
      const r = this.getSenders().filter((e) => -1 === t.indexOf(e));
      this._shimmedLocalStreams[e.id] = [e].concat(r);
    };
    const r = e.RTCPeerConnection.prototype.removeStream;
    e.RTCPeerConnection.prototype.removeStream = function (e) {
      return (
        (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
        delete this._shimmedLocalStreams[e.id],
        r.apply(this, arguments)
      );
    };
    const i = e.RTCPeerConnection.prototype.removeTrack;
    e.RTCPeerConnection.prototype.removeTrack = function (e) {
      return (
        (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
        e &&
          Object.keys(this._shimmedLocalStreams).forEach((t) => {
            const n = this._shimmedLocalStreams[t].indexOf(e);
            -1 !== n && this._shimmedLocalStreams[t].splice(n, 1),
              1 === this._shimmedLocalStreams[t].length &&
                delete this._shimmedLocalStreams[t];
          }),
        i.apply(this, arguments)
      );
    };
  }
  function qt(e) {
    if (!e.RTCPeerConnection) return;
    const t = Nt(e);
    if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return Jt(e);
    const n = e.RTCPeerConnection.prototype.getLocalStreams;
    e.RTCPeerConnection.prototype.getLocalStreams = function () {
      const e = n.apply(this);
      return (
        (this._reverseStreams = this._reverseStreams || {}),
        e.map((e) => this._reverseStreams[e.id])
      );
    };
    const r = e.RTCPeerConnection.prototype.addStream;
    e.RTCPeerConnection.prototype.addStream = function (t) {
      if (
        ((this._streams = this._streams || {}),
        (this._reverseStreams = this._reverseStreams || {}),
        t.getTracks().forEach((e) => {
          if (this.getSenders().find((t) => t.track === e))
            throw new DOMException(
              "Track already exists.",
              "InvalidAccessError"
            );
        }),
        !this._reverseStreams[t.id])
      ) {
        const n = new e.MediaStream(t.getTracks());
        (this._streams[t.id] = n), (this._reverseStreams[n.id] = t), (t = n);
      }
      r.apply(this, [t]);
    };
    const i = e.RTCPeerConnection.prototype.removeStream;
    function o(e, t) {
      let n = t.sdp;
      return (
        Object.keys(e._reverseStreams || []).forEach((t) => {
          const r = e._reverseStreams[t],
            i = e._streams[r.id];
          n = n.replace(new RegExp(i.id, "g"), r.id);
        }),
        new RTCSessionDescription({ type: t.type, sdp: n })
      );
    }
    function a(e, t) {
      let n = t.sdp;
      return (
        Object.keys(e._reverseStreams || []).forEach((t) => {
          const r = e._reverseStreams[t],
            i = e._streams[r.id];
          n = n.replace(new RegExp(r.id, "g"), i.id);
        }),
        new RTCSessionDescription({ type: t.type, sdp: n })
      );
    }
    (e.RTCPeerConnection.prototype.removeStream = function (e) {
      (this._streams = this._streams || {}),
        (this._reverseStreams = this._reverseStreams || {}),
        i.apply(this, [this._streams[e.id] || e]),
        delete this._reverseStreams[
          this._streams[e.id] ? this._streams[e.id].id : e.id
        ],
        delete this._streams[e.id];
    }),
      (e.RTCPeerConnection.prototype.addTrack = function (t, n) {
        if ("closed" === this.signalingState)
          throw new DOMException(
            "The RTCPeerConnection's signalingState is 'closed'.",
            "InvalidStateError"
          );
        const r = [].slice.call(arguments, 1);
        if (1 !== r.length || !r[0].getTracks().find((e) => e === t))
          throw new DOMException(
            "The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
            "NotSupportedError"
          );
        const i = this.getSenders().find((e) => e.track === t);
        if (i)
          throw new DOMException("Track already exists.", "InvalidAccessError");
        (this._streams = this._streams || {}),
          (this._reverseStreams = this._reverseStreams || {});
        const o = this._streams[n.id];
        if (o)
          o.addTrack(t),
            Promise.resolve().then(() => {
              this.dispatchEvent(new Event("negotiationneeded"));
            });
        else {
          const r = new e.MediaStream([t]);
          (this._streams[n.id] = r),
            (this._reverseStreams[r.id] = n),
            this.addStream(r);
        }
        return this.getSenders().find((e) => e.track === t);
      }),
      ["createOffer", "createAnswer"].forEach(function (t) {
        const n = e.RTCPeerConnection.prototype[t],
          r = {
            [t]() {
              const e = arguments;
              return arguments.length && "function" == typeof arguments[0]
                ? n.apply(this, [
                    (t) => {
                      const n = o(this, t);
                      e[0].apply(null, [n]);
                    },
                    (t) => {
                      e[1] && e[1].apply(null, t);
                    },
                    arguments[2],
                  ])
                : n.apply(this, arguments).then((e) => o(this, e));
            },
          };
        e.RTCPeerConnection.prototype[t] = r[t];
      });
    const s = e.RTCPeerConnection.prototype.setLocalDescription;
    e.RTCPeerConnection.prototype.setLocalDescription = function () {
      return arguments.length && arguments[0].type
        ? ((arguments[0] = a(this, arguments[0])), s.apply(this, arguments))
        : s.apply(this, arguments);
    };
    const c = Object.getOwnPropertyDescriptor(
      e.RTCPeerConnection.prototype,
      "localDescription"
    );
    Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
      get() {
        const e = c.get.apply(this);
        return "" === e.type ? e : o(this, e);
      },
    }),
      (e.RTCPeerConnection.prototype.removeTrack = function (e) {
        if ("closed" === this.signalingState)
          throw new DOMException(
            "The RTCPeerConnection's signalingState is 'closed'.",
            "InvalidStateError"
          );
        if (!e._pc)
          throw new DOMException(
            "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.",
            "TypeError"
          );
        if (!(e._pc === this))
          throw new DOMException(
            "Sender was not created by this connection.",
            "InvalidAccessError"
          );
        let t;
        (this._streams = this._streams || {}),
          Object.keys(this._streams).forEach((n) => {
            this._streams[n].getTracks().find((t) => e.track === t) &&
              (t = this._streams[n]);
          }),
          t &&
            (1 === t.getTracks().length
              ? this.removeStream(this._reverseStreams[t.id])
              : t.removeTrack(e.track),
            this.dispatchEvent(new Event("negotiationneeded")));
      });
  }
  function Kt(e) {
    const t = Nt(e);
    if (
      (!e.RTCPeerConnection &&
        e.webkitRTCPeerConnection &&
        (e.RTCPeerConnection = e.webkitRTCPeerConnection),
      !e.RTCPeerConnection)
    )
      return;
    t.version < 53 &&
      [
        "setLocalDescription",
        "setRemoteDescription",
        "addIceCandidate",
      ].forEach(function (t) {
        const n = e.RTCPeerConnection.prototype[t],
          r = {
            [t]() {
              return (
                (arguments[0] = new (
                  "addIceCandidate" === t
                    ? e.RTCIceCandidate
                    : e.RTCSessionDescription
                )(arguments[0])),
                n.apply(this, arguments)
              );
            },
          };
        e.RTCPeerConnection.prototype[t] = r[t];
      });
    const n = e.RTCPeerConnection.prototype.addIceCandidate;
    e.RTCPeerConnection.prototype.addIceCandidate = function () {
      return arguments[0]
        ? t.version < 78 && arguments[0] && "" === arguments[0].candidate
          ? Promise.resolve()
          : n.apply(this, arguments)
        : (arguments[1] && arguments[1].apply(null), Promise.resolve());
    };
  }
  function $t(e) {
    xt(e, "negotiationneeded", (e) => {
      if ("stable" === e.target.signalingState) return e;
    });
  }
  var Yt = Object.freeze({
    shimMediaStream: Gt,
    shimOnTrack: Bt,
    shimGetSendersWithDtmf: Ht,
    shimGetStats: zt,
    shimSenderReceiverGetStats: Wt,
    shimAddTrackRemoveTrackWithNative: Jt,
    shimAddTrackRemoveTrack: qt,
    shimPeerConnection: Kt,
    fixNegotiationNeeded: $t,
    shimGetUserMedia: Ft,
    shimGetDisplayMedia: function (e, t) {
      (e.navigator.mediaDevices &&
        "getDisplayMedia" in e.navigator.mediaDevices) ||
        (e.navigator.mediaDevices &&
          ("function" == typeof t
            ? (e.navigator.mediaDevices.getDisplayMedia = function (n) {
                return t(n).then((t) => {
                  const r = n.video && n.video.width,
                    i = n.video && n.video.height,
                    o = n.video && n.video.frameRate;
                  return (
                    (n.video = {
                      mandatory: {
                        chromeMediaSource: "desktop",
                        chromeMediaSourceId: t,
                        maxFrameRate: o || 3,
                      },
                    }),
                    r && (n.video.mandatory.maxWidth = r),
                    i && (n.video.mandatory.maxHeight = i),
                    e.navigator.mediaDevices.getUserMedia(n)
                  );
                });
              })
            : console.error(
                "shimGetDisplayMedia: getSourceId argument is not a function"
              )));
    },
  });
  var Qt = t(function (e) {
    var t = {
      generateIdentifier: function () {
        return Math.random().toString(36).substr(2, 10);
      },
    };
    (t.localCName = t.generateIdentifier()),
      (t.splitLines = function (e) {
        return e
          .trim()
          .split("\n")
          .map(function (e) {
            return e.trim();
          });
      }),
      (t.splitSections = function (e) {
        return e.split("\nm=").map(function (e, t) {
          return (t > 0 ? "m=" + e : e).trim() + "\r\n";
        });
      }),
      (t.getDescription = function (e) {
        var n = t.splitSections(e);
        return n && n[0];
      }),
      (t.getMediaSections = function (e) {
        var n = t.splitSections(e);
        return n.shift(), n;
      }),
      (t.matchPrefix = function (e, n) {
        return t.splitLines(e).filter(function (e) {
          return 0 === e.indexOf(n);
        });
      }),
      (t.parseCandidate = function (e) {
        for (
          var t,
            n = {
              foundation: (t =
                0 === e.indexOf("a=candidate:")
                  ? e.substring(12).split(" ")
                  : e.substring(10).split(" "))[0],
              component: parseInt(t[1], 10),
              protocol: t[2].toLowerCase(),
              priority: parseInt(t[3], 10),
              ip: t[4],
              address: t[4],
              port: parseInt(t[5], 10),
              type: t[7],
            },
            r = 8;
          r < t.length;
          r += 2
        )
          switch (t[r]) {
            case "raddr":
              n.relatedAddress = t[r + 1];
              break;
            case "rport":
              n.relatedPort = parseInt(t[r + 1], 10);
              break;
            case "tcptype":
              n.tcpType = t[r + 1];
              break;
            case "ufrag":
              (n.ufrag = t[r + 1]), (n.usernameFragment = t[r + 1]);
              break;
            default:
              n[t[r]] = t[r + 1];
          }
        return n;
      }),
      (t.writeCandidate = function (e) {
        var t = [];
        t.push(e.foundation),
          t.push(e.component),
          t.push(e.protocol.toUpperCase()),
          t.push(e.priority),
          t.push(e.address || e.ip),
          t.push(e.port);
        var n = e.type;
        return (
          t.push("typ"),
          t.push(n),
          "host" !== n &&
            e.relatedAddress &&
            e.relatedPort &&
            (t.push("raddr"),
            t.push(e.relatedAddress),
            t.push("rport"),
            t.push(e.relatedPort)),
          e.tcpType &&
            "tcp" === e.protocol.toLowerCase() &&
            (t.push("tcptype"), t.push(e.tcpType)),
          (e.usernameFragment || e.ufrag) &&
            (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)),
          "candidate:" + t.join(" ")
        );
      }),
      (t.parseIceOptions = function (e) {
        return e.substr(14).split(" ");
      }),
      (t.parseRtpMap = function (e) {
        var t = e.substr(9).split(" "),
          n = { payloadType: parseInt(t.shift(), 10) };
        return (
          (t = t[0].split("/")),
          (n.name = t[0]),
          (n.clockRate = parseInt(t[1], 10)),
          (n.channels = 3 === t.length ? parseInt(t[2], 10) : 1),
          (n.numChannels = n.channels),
          n
        );
      }),
      (t.writeRtpMap = function (e) {
        var t = e.payloadType;
        void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
        var n = e.channels || e.numChannels || 1;
        return (
          "a=rtpmap:" +
          t +
          " " +
          e.name +
          "/" +
          e.clockRate +
          (1 !== n ? "/" + n : "") +
          "\r\n"
        );
      }),
      (t.parseExtmap = function (e) {
        var t = e.substr(9).split(" ");
        return {
          id: parseInt(t[0], 10),
          direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
          uri: t[1],
        };
      }),
      (t.writeExtmap = function (e) {
        return (
          "a=extmap:" +
          (e.id || e.preferredId) +
          (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") +
          " " +
          e.uri +
          "\r\n"
        );
      }),
      (t.parseFmtp = function (e) {
        for (
          var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0;
          i < r.length;
          i++
        )
          n[(t = r[i].trim().split("="))[0].trim()] = t[1];
        return n;
      }),
      (t.writeFmtp = function (e) {
        var t = "",
          n = e.payloadType;
        if (
          (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
          e.parameters && Object.keys(e.parameters).length)
        ) {
          var r = [];
          Object.keys(e.parameters).forEach(function (t) {
            e.parameters[t] ? r.push(t + "=" + e.parameters[t]) : r.push(t);
          }),
            (t += "a=fmtp:" + n + " " + r.join(";") + "\r\n");
        }
        return t;
      }),
      (t.parseRtcpFb = function (e) {
        var t = e.substr(e.indexOf(" ") + 1).split(" ");
        return { type: t.shift(), parameter: t.join(" ") };
      }),
      (t.writeRtcpFb = function (e) {
        var t = "",
          n = e.payloadType;
        return (
          void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
          e.rtcpFeedback &&
            e.rtcpFeedback.length &&
            e.rtcpFeedback.forEach(function (e) {
              t +=
                "a=rtcp-fb:" +
                n +
                " " +
                e.type +
                (e.parameter && e.parameter.length ? " " + e.parameter : "") +
                "\r\n";
            }),
          t
        );
      }),
      (t.parseSsrcMedia = function (e) {
        var t = e.indexOf(" "),
          n = { ssrc: parseInt(e.substr(7, t - 7), 10) },
          r = e.indexOf(":", t);
        return (
          r > -1
            ? ((n.attribute = e.substr(t + 1, r - t - 1)),
              (n.value = e.substr(r + 1)))
            : (n.attribute = e.substr(t + 1)),
          n
        );
      }),
      (t.parseSsrcGroup = function (e) {
        var t = e.substr(13).split(" ");
        return {
          semantics: t.shift(),
          ssrcs: t.map(function (e) {
            return parseInt(e, 10);
          }),
        };
      }),
      (t.getMid = function (e) {
        var n = t.matchPrefix(e, "a=mid:")[0];
        if (n) return n.substr(6);
      }),
      (t.parseFingerprint = function (e) {
        var t = e.substr(14).split(" ");
        return { algorithm: t[0].toLowerCase(), value: t[1] };
      }),
      (t.getDtlsParameters = function (e, n) {
        return {
          role: "auto",
          fingerprints: t
            .matchPrefix(e + n, "a=fingerprint:")
            .map(t.parseFingerprint),
        };
      }),
      (t.writeDtlsParameters = function (e, t) {
        var n = "a=setup:" + t + "\r\n";
        return (
          e.fingerprints.forEach(function (e) {
            n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n";
          }),
          n
        );
      }),
      (t.getIceParameters = function (e, n) {
        var r = t.splitLines(e);
        return {
          usernameFragment: (r = r.concat(t.splitLines(n)))
            .filter(function (e) {
              return 0 === e.indexOf("a=ice-ufrag:");
            })[0]
            .substr(12),
          password: r
            .filter(function (e) {
              return 0 === e.indexOf("a=ice-pwd:");
            })[0]
            .substr(10),
        };
      }),
      (t.writeIceParameters = function (e) {
        return (
          "a=ice-ufrag:" +
          e.usernameFragment +
          "\r\na=ice-pwd:" +
          e.password +
          "\r\n"
        );
      }),
      (t.parseRtpParameters = function (e) {
        for (
          var n = {
              codecs: [],
              headerExtensions: [],
              fecMechanisms: [],
              rtcp: [],
            },
            r = t.splitLines(e)[0].split(" "),
            i = 3;
          i < r.length;
          i++
        ) {
          var o = r[i],
            a = t.matchPrefix(e, "a=rtpmap:" + o + " ")[0];
          if (a) {
            var s = t.parseRtpMap(a),
              c = t.matchPrefix(e, "a=fmtp:" + o + " ");
            switch (
              ((s.parameters = c.length ? t.parseFmtp(c[0]) : {}),
              (s.rtcpFeedback = t
                .matchPrefix(e, "a=rtcp-fb:" + o + " ")
                .map(t.parseRtcpFb)),
              n.codecs.push(s),
              s.name.toUpperCase())
            ) {
              case "RED":
              case "ULPFEC":
                n.fecMechanisms.push(s.name.toUpperCase());
            }
          }
        }
        return (
          t.matchPrefix(e, "a=extmap:").forEach(function (e) {
            n.headerExtensions.push(t.parseExtmap(e));
          }),
          n
        );
      }),
      (t.writeRtpDescription = function (e, n) {
        var r = "";
        (r += "m=" + e + " "),
          (r += n.codecs.length > 0 ? "9" : "0"),
          (r += " UDP/TLS/RTP/SAVPF "),
          (r +=
            n.codecs
              .map(function (e) {
                return void 0 !== e.preferredPayloadType
                  ? e.preferredPayloadType
                  : e.payloadType;
              })
              .join(" ") + "\r\n"),
          (r += "c=IN IP4 0.0.0.0\r\n"),
          (r += "a=rtcp:9 IN IP4 0.0.0.0\r\n"),
          n.codecs.forEach(function (e) {
            (r += t.writeRtpMap(e)),
              (r += t.writeFmtp(e)),
              (r += t.writeRtcpFb(e));
          });
        var i = 0;
        return (
          n.codecs.forEach(function (e) {
            e.maxptime > i && (i = e.maxptime);
          }),
          i > 0 && (r += "a=maxptime:" + i + "\r\n"),
          (r += "a=rtcp-mux\r\n"),
          n.headerExtensions &&
            n.headerExtensions.forEach(function (e) {
              r += t.writeExtmap(e);
            }),
          r
        );
      }),
      (t.parseRtpEncodingParameters = function (e) {
        var n,
          r = [],
          i = t.parseRtpParameters(e),
          o = -1 !== i.fecMechanisms.indexOf("RED"),
          a = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
          s = t
            .matchPrefix(e, "a=ssrc:")
            .map(function (e) {
              return t.parseSsrcMedia(e);
            })
            .filter(function (e) {
              return "cname" === e.attribute;
            }),
          c = s.length > 0 && s[0].ssrc,
          u = t.matchPrefix(e, "a=ssrc-group:FID").map(function (e) {
            return e
              .substr(17)
              .split(" ")
              .map(function (e) {
                return parseInt(e, 10);
              });
          });
        u.length > 0 && u[0].length > 1 && u[0][0] === c && (n = u[0][1]),
          i.codecs.forEach(function (e) {
            if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
              var t = {
                ssrc: c,
                codecPayloadType: parseInt(e.parameters.apt, 10),
              };
              c && n && (t.rtx = { ssrc: n }),
                r.push(t),
                o &&
                  (((t = JSON.parse(JSON.stringify(t))).fec = {
                    ssrc: c,
                    mechanism: a ? "red+ulpfec" : "red",
                  }),
                  r.push(t));
            }
          }),
          0 === r.length && c && r.push({ ssrc: c });
        var d = t.matchPrefix(e, "b=");
        return (
          d.length &&
            ((d =
              0 === d[0].indexOf("b=TIAS:")
                ? parseInt(d[0].substr(7), 10)
                : 0 === d[0].indexOf("b=AS:")
                ? 1e3 * parseInt(d[0].substr(5), 10) * 0.95 - 16e3
                : void 0),
            r.forEach(function (e) {
              e.maxBitrate = d;
            })),
          r
        );
      }),
      (t.parseRtcpParameters = function (e) {
        var n = {},
          r = t
            .matchPrefix(e, "a=ssrc:")
            .map(function (e) {
              return t.parseSsrcMedia(e);
            })
            .filter(function (e) {
              return "cname" === e.attribute;
            })[0];
        r && ((n.cname = r.value), (n.ssrc = r.ssrc));
        var i = t.matchPrefix(e, "a=rtcp-rsize");
        (n.reducedSize = i.length > 0), (n.compound = 0 === i.length);
        var o = t.matchPrefix(e, "a=rtcp-mux");
        return (n.mux = o.length > 0), n;
      }),
      (t.parseMsid = function (e) {
        var n,
          r = t.matchPrefix(e, "a=msid:");
        if (1 === r.length)
          return { stream: (n = r[0].substr(7).split(" "))[0], track: n[1] };
        var i = t
          .matchPrefix(e, "a=ssrc:")
          .map(function (e) {
            return t.parseSsrcMedia(e);
          })
          .filter(function (e) {
            return "msid" === e.attribute;
          });
        return i.length > 0
          ? { stream: (n = i[0].value.split(" "))[0], track: n[1] }
          : void 0;
      }),
      (t.generateSessionId = function () {
        return Math.random().toString().substr(2, 21);
      }),
      (t.writeSessionBoilerplate = function (e, n, r) {
        var i = void 0 !== n ? n : 2;
        return (
          "v=0\r\no=" +
          (r || "thisisadapterortc") +
          " " +
          (e || t.generateSessionId()) +
          " " +
          i +
          " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
        );
      }),
      (t.writeMediaSection = function (e, n, r, i) {
        var o = t.writeRtpDescription(e.kind, n);
        if (
          ((o += t.writeIceParameters(e.iceGatherer.getLocalParameters())),
          (o += t.writeDtlsParameters(
            e.dtlsTransport.getLocalParameters(),
            "offer" === r ? "actpass" : "active"
          )),
          (o += "a=mid:" + e.mid + "\r\n"),
          e.direction
            ? (o += "a=" + e.direction + "\r\n")
            : e.rtpSender && e.rtpReceiver
            ? (o += "a=sendrecv\r\n")
            : e.rtpSender
            ? (o += "a=sendonly\r\n")
            : e.rtpReceiver
            ? (o += "a=recvonly\r\n")
            : (o += "a=inactive\r\n"),
          e.rtpSender)
        ) {
          var a = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
          (o += "a=" + a),
            (o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + a),
            e.sendEncodingParameters[0].rtx &&
              ((o +=
                "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + a),
              (o +=
                "a=ssrc-group:FID " +
                e.sendEncodingParameters[0].ssrc +
                " " +
                e.sendEncodingParameters[0].rtx.ssrc +
                "\r\n"));
        }
        return (
          (o +=
            "a=ssrc:" +
            e.sendEncodingParameters[0].ssrc +
            " cname:" +
            t.localCName +
            "\r\n"),
          e.rtpSender &&
            e.sendEncodingParameters[0].rtx &&
            (o +=
              "a=ssrc:" +
              e.sendEncodingParameters[0].rtx.ssrc +
              " cname:" +
              t.localCName +
              "\r\n"),
          o
        );
      }),
      (t.getDirection = function (e, n) {
        for (var r = t.splitLines(e), i = 0; i < r.length; i++)
          switch (r[i]) {
            case "a=sendrecv":
            case "a=sendonly":
            case "a=recvonly":
            case "a=inactive":
              return r[i].substr(2);
          }
        return n ? t.getDirection(n) : "sendrecv";
      }),
      (t.getKind = function (e) {
        return t.splitLines(e)[0].split(" ")[0].substr(2);
      }),
      (t.isRejected = function (e) {
        return "0" === e.split(" ", 2)[1];
      }),
      (t.parseMLine = function (e) {
        var n = t.splitLines(e)[0].substr(2).split(" ");
        return {
          kind: n[0],
          port: parseInt(n[1], 10),
          protocol: n[2],
          fmt: n.slice(3).join(" "),
        };
      }),
      (t.parseOLine = function (e) {
        var n = t.matchPrefix(e, "o=")[0].substr(2).split(" ");
        return {
          username: n[0],
          sessionId: n[1],
          sessionVersion: parseInt(n[2], 10),
          netType: n[3],
          addressType: n[4],
          address: n[5],
        };
      }),
      (t.isValidSDP = function (e) {
        if ("string" != typeof e || 0 === e.length) return !1;
        for (var n = t.splitLines(e), r = 0; r < n.length; r++)
          if (n[r].length < 2 || "=" !== n[r].charAt(1)) return !1;
        return !0;
      }),
      (e.exports = t);
  });
  function Xt(e, t, n, r, i) {
    var o = Qt.writeRtpDescription(e.kind, t);
    if (
      ((o += Qt.writeIceParameters(e.iceGatherer.getLocalParameters())),
      (o += Qt.writeDtlsParameters(
        e.dtlsTransport.getLocalParameters(),
        "offer" === n ? "actpass" : i || "active"
      )),
      (o += "a=mid:" + e.mid + "\r\n"),
      e.rtpSender && e.rtpReceiver
        ? (o += "a=sendrecv\r\n")
        : e.rtpSender
        ? (o += "a=sendonly\r\n")
        : e.rtpReceiver
        ? (o += "a=recvonly\r\n")
        : (o += "a=inactive\r\n"),
      e.rtpSender)
    ) {
      var a = e.rtpSender._initialTrackId || e.rtpSender.track.id;
      e.rtpSender._initialTrackId = a;
      var s = "msid:" + (r ? r.id : "-") + " " + a + "\r\n";
      (o += "a=" + s),
        (o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + s),
        e.sendEncodingParameters[0].rtx &&
          ((o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + s),
          (o +=
            "a=ssrc-group:FID " +
            e.sendEncodingParameters[0].ssrc +
            " " +
            e.sendEncodingParameters[0].rtx.ssrc +
            "\r\n"));
    }
    return (
      (o +=
        "a=ssrc:" +
        e.sendEncodingParameters[0].ssrc +
        " cname:" +
        Qt.localCName +
        "\r\n"),
      e.rtpSender &&
        e.sendEncodingParameters[0].rtx &&
        (o +=
          "a=ssrc:" +
          e.sendEncodingParameters[0].rtx.ssrc +
          " cname:" +
          Qt.localCName +
          "\r\n"),
      o
    );
  }
  function Zt(e, t) {
    var n = { codecs: [], headerExtensions: [], fecMechanisms: [] },
      r = function (e, t) {
        e = parseInt(e, 10);
        for (var n = 0; n < t.length; n++)
          if (t[n].payloadType === e || t[n].preferredPayloadType === e)
            return t[n];
      },
      i = function (e, t, n, i) {
        var o = r(e.parameters.apt, n),
          a = r(t.parameters.apt, i);
        return o && a && o.name.toLowerCase() === a.name.toLowerCase();
      };
    return (
      e.codecs.forEach(function (r) {
        for (var o = 0; o < t.codecs.length; o++) {
          var a = t.codecs[o];
          if (
            r.name.toLowerCase() === a.name.toLowerCase() &&
            r.clockRate === a.clockRate
          ) {
            if (
              "rtx" === r.name.toLowerCase() &&
              r.parameters &&
              a.parameters.apt &&
              !i(r, a, e.codecs, t.codecs)
            )
              continue;
            ((a = JSON.parse(JSON.stringify(a))).numChannels = Math.min(
              r.numChannels,
              a.numChannels
            )),
              n.codecs.push(a),
              (a.rtcpFeedback = a.rtcpFeedback.filter(function (e) {
                for (var t = 0; t < r.rtcpFeedback.length; t++)
                  if (
                    r.rtcpFeedback[t].type === e.type &&
                    r.rtcpFeedback[t].parameter === e.parameter
                  )
                    return !0;
                return !1;
              }));
            break;
          }
        }
      }),
      e.headerExtensions.forEach(function (e) {
        for (var r = 0; r < t.headerExtensions.length; r++) {
          var i = t.headerExtensions[r];
          if (e.uri === i.uri) {
            n.headerExtensions.push(i);
            break;
          }
        }
      }),
      n
    );
  }
  function en(e, t, n) {
    return (
      -1 !==
      {
        offer: {
          setLocalDescription: ["stable", "have-local-offer"],
          setRemoteDescription: ["stable", "have-remote-offer"],
        },
        answer: {
          setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
          setRemoteDescription: ["have-local-offer", "have-remote-pranswer"],
        },
      }[t][e].indexOf(n)
    );
  }
  function tn(e, t) {
    var n = e.getRemoteCandidates().find(function (e) {
      return (
        t.foundation === e.foundation &&
        t.ip === e.ip &&
        t.port === e.port &&
        t.priority === e.priority &&
        t.protocol === e.protocol &&
        t.type === e.type
      );
    });
    return n || e.addRemoteCandidate(t), !n;
  }
  function nn(e, t) {
    var n = new Error(t);
    return (
      (n.name = e),
      (n.code = {
        NotSupportedError: 9,
        InvalidStateError: 11,
        InvalidAccessError: 15,
        TypeError: void 0,
        OperationError: void 0,
      }[e]),
      n
    );
  }
  var rn = function (e, t) {
    function n(t, n) {
      n.addTrack(t),
        n.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", { track: t }));
    }
    function r(t, n, r, i) {
      var o = new Event("track");
      (o.track = n),
        (o.receiver = r),
        (o.transceiver = { receiver: r }),
        (o.streams = i),
        e.setTimeout(function () {
          t._dispatchEvent("track", o);
        });
    }
    var i = function (n) {
      var r = this,
        i = document.createDocumentFragment();
      if (
        (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(
          function (e) {
            r[e] = i[e].bind(i);
          }
        ),
        (this.canTrickleIceCandidates = null),
        (this.needNegotiation = !1),
        (this.localStreams = []),
        (this.remoteStreams = []),
        (this._localDescription = null),
        (this._remoteDescription = null),
        (this.signalingState = "stable"),
        (this.iceConnectionState = "new"),
        (this.connectionState = "new"),
        (this.iceGatheringState = "new"),
        (n = JSON.parse(JSON.stringify(n || {}))),
        (this.usingBundle = "max-bundle" === n.bundlePolicy),
        "negotiate" === n.rtcpMuxPolicy)
      )
        throw nn(
          "NotSupportedError",
          "rtcpMuxPolicy 'negotiate' is not supported"
        );
      switch (
        (n.rtcpMuxPolicy || (n.rtcpMuxPolicy = "require"), n.iceTransportPolicy)
      ) {
        case "all":
        case "relay":
          break;
        default:
          n.iceTransportPolicy = "all";
      }
      switch (n.bundlePolicy) {
        case "balanced":
        case "max-compat":
        case "max-bundle":
          break;
        default:
          n.bundlePolicy = "balanced";
      }
      if (
        ((n.iceServers = (function (e, t) {
          var n = !1;
          return (e = JSON.parse(JSON.stringify(e))).filter(function (e) {
            if (e && (e.urls || e.url)) {
              var r = e.urls || e.url;
              e.url &&
                !e.urls &&
                console.warn(
                  "RTCIceServer.url is deprecated! Use urls instead."
                );
              var i = "string" == typeof r;
              return (
                i && (r = [r]),
                (r = r.filter(function (e) {
                  return 0 === e.indexOf("turn:") &&
                    -1 !== e.indexOf("transport=udp") &&
                    -1 === e.indexOf("turn:[") &&
                    !n
                    ? ((n = !0), !0)
                    : 0 === e.indexOf("stun:") &&
                        t >= 14393 &&
                        -1 === e.indexOf("?transport=udp");
                })),
                delete e.url,
                (e.urls = i ? r[0] : r),
                !!r.length
              );
            }
          });
        })(n.iceServers || [], t)),
        (this._iceGatherers = []),
        n.iceCandidatePoolSize)
      )
        for (var o = n.iceCandidatePoolSize; o > 0; o--)
          this._iceGatherers.push(
            new e.RTCIceGatherer({
              iceServers: n.iceServers,
              gatherPolicy: n.iceTransportPolicy,
            })
          );
      else n.iceCandidatePoolSize = 0;
      (this._config = n),
        (this.transceivers = []),
        (this._sdpSessionId = Qt.generateSessionId()),
        (this._sdpSessionVersion = 0),
        (this._dtlsRole = void 0),
        (this._isClosed = !1);
    };
    Object.defineProperty(i.prototype, "localDescription", {
      configurable: !0,
      get: function () {
        return this._localDescription;
      },
    }),
      Object.defineProperty(i.prototype, "remoteDescription", {
        configurable: !0,
        get: function () {
          return this._remoteDescription;
        },
      }),
      (i.prototype.onicecandidate = null),
      (i.prototype.onaddstream = null),
      (i.prototype.ontrack = null),
      (i.prototype.onremovestream = null),
      (i.prototype.onsignalingstatechange = null),
      (i.prototype.oniceconnectionstatechange = null),
      (i.prototype.onconnectionstatechange = null),
      (i.prototype.onicegatheringstatechange = null),
      (i.prototype.onnegotiationneeded = null),
      (i.prototype.ondatachannel = null),
      (i.prototype._dispatchEvent = function (e, t) {
        this._isClosed ||
          (this.dispatchEvent(t),
          "function" == typeof this["on" + e] && this["on" + e](t));
      }),
      (i.prototype._emitGatheringStateChange = function () {
        var e = new Event("icegatheringstatechange");
        this._dispatchEvent("icegatheringstatechange", e);
      }),
      (i.prototype.getConfiguration = function () {
        return this._config;
      }),
      (i.prototype.getLocalStreams = function () {
        return this.localStreams;
      }),
      (i.prototype.getRemoteStreams = function () {
        return this.remoteStreams;
      }),
      (i.prototype._createTransceiver = function (e, t) {
        var n = this.transceivers.length > 0,
          r = {
            track: null,
            iceGatherer: null,
            iceTransport: null,
            dtlsTransport: null,
            localCapabilities: null,
            remoteCapabilities: null,
            rtpSender: null,
            rtpReceiver: null,
            kind: e,
            mid: null,
            sendEncodingParameters: null,
            recvEncodingParameters: null,
            stream: null,
            associatedRemoteMediaStreams: [],
            wantReceive: !0,
          };
        if (this.usingBundle && n)
          (r.iceTransport = this.transceivers[0].iceTransport),
            (r.dtlsTransport = this.transceivers[0].dtlsTransport);
        else {
          var i = this._createIceAndDtlsTransports();
          (r.iceTransport = i.iceTransport),
            (r.dtlsTransport = i.dtlsTransport);
        }
        return t || this.transceivers.push(r), r;
      }),
      (i.prototype.addTrack = function (t, n) {
        if (this._isClosed)
          throw nn(
            "InvalidStateError",
            "Attempted to call addTrack on a closed peerconnection."
          );
        var r;
        if (
          this.transceivers.find(function (e) {
            return e.track === t;
          })
        )
          throw nn("InvalidAccessError", "Track already exists.");
        for (var i = 0; i < this.transceivers.length; i++)
          this.transceivers[i].track ||
            this.transceivers[i].kind !== t.kind ||
            (r = this.transceivers[i]);
        return (
          r || (r = this._createTransceiver(t.kind)),
          this._maybeFireNegotiationNeeded(),
          -1 === this.localStreams.indexOf(n) && this.localStreams.push(n),
          (r.track = t),
          (r.stream = n),
          (r.rtpSender = new e.RTCRtpSender(t, r.dtlsTransport)),
          r.rtpSender
        );
      }),
      (i.prototype.addStream = function (e) {
        var n = this;
        if (t >= 15025)
          e.getTracks().forEach(function (t) {
            n.addTrack(t, e);
          });
        else {
          var r = e.clone();
          e.getTracks().forEach(function (e, t) {
            var n = r.getTracks()[t];
            e.addEventListener("enabled", function (e) {
              n.enabled = e.enabled;
            });
          }),
            r.getTracks().forEach(function (e) {
              n.addTrack(e, r);
            });
        }
      }),
      (i.prototype.removeTrack = function (t) {
        if (this._isClosed)
          throw nn(
            "InvalidStateError",
            "Attempted to call removeTrack on a closed peerconnection."
          );
        if (!(t instanceof e.RTCRtpSender))
          throw new TypeError(
            "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender."
          );
        var n = this.transceivers.find(function (e) {
          return e.rtpSender === t;
        });
        if (!n)
          throw nn(
            "InvalidAccessError",
            "Sender was not created by this connection."
          );
        var r = n.stream;
        n.rtpSender.stop(),
          (n.rtpSender = null),
          (n.track = null),
          (n.stream = null),
          -1 ===
            this.transceivers
              .map(function (e) {
                return e.stream;
              })
              .indexOf(r) &&
            this.localStreams.indexOf(r) > -1 &&
            this.localStreams.splice(this.localStreams.indexOf(r), 1),
          this._maybeFireNegotiationNeeded();
      }),
      (i.prototype.removeStream = function (e) {
        var t = this;
        e.getTracks().forEach(function (e) {
          var n = t.getSenders().find(function (t) {
            return t.track === e;
          });
          n && t.removeTrack(n);
        });
      }),
      (i.prototype.getSenders = function () {
        return this.transceivers
          .filter(function (e) {
            return !!e.rtpSender;
          })
          .map(function (e) {
            return e.rtpSender;
          });
      }),
      (i.prototype.getReceivers = function () {
        return this.transceivers
          .filter(function (e) {
            return !!e.rtpReceiver;
          })
          .map(function (e) {
            return e.rtpReceiver;
          });
      }),
      (i.prototype._createIceGatherer = function (t, n) {
        var r = this;
        if (n && t > 0) return this.transceivers[0].iceGatherer;
        if (this._iceGatherers.length) return this._iceGatherers.shift();
        var i = new e.RTCIceGatherer({
          iceServers: this._config.iceServers,
          gatherPolicy: this._config.iceTransportPolicy,
        });
        return (
          Object.defineProperty(i, "state", { value: "new", writable: !0 }),
          (this.transceivers[t].bufferedCandidateEvents = []),
          (this.transceivers[t].bufferCandidates = function (e) {
            var n = !e.candidate || 0 === Object.keys(e.candidate).length;
            (i.state = n ? "completed" : "gathering"),
              null !== r.transceivers[t].bufferedCandidateEvents &&
                r.transceivers[t].bufferedCandidateEvents.push(e);
          }),
          i.addEventListener(
            "localcandidate",
            this.transceivers[t].bufferCandidates
          ),
          i
        );
      }),
      (i.prototype._gather = function (t, n) {
        var r = this,
          i = this.transceivers[n].iceGatherer;
        if (!i.onlocalcandidate) {
          var o = this.transceivers[n].bufferedCandidateEvents;
          (this.transceivers[n].bufferedCandidateEvents = null),
            i.removeEventListener(
              "localcandidate",
              this.transceivers[n].bufferCandidates
            ),
            (i.onlocalcandidate = function (e) {
              if (!(r.usingBundle && n > 0)) {
                var o = new Event("icecandidate");
                o.candidate = { sdpMid: t, sdpMLineIndex: n };
                var a = e.candidate,
                  s = !a || 0 === Object.keys(a).length;
                if (s)
                  ("new" !== i.state && "gathering" !== i.state) ||
                    (i.state = "completed");
                else {
                  "new" === i.state && (i.state = "gathering"),
                    (a.component = 1),
                    (a.ufrag = i.getLocalParameters().usernameFragment);
                  var c = Qt.writeCandidate(a);
                  (o.candidate = Object.assign(
                    o.candidate,
                    Qt.parseCandidate(c)
                  )),
                    (o.candidate.candidate = c),
                    (o.candidate.toJSON = function () {
                      return {
                        candidate: o.candidate.candidate,
                        sdpMid: o.candidate.sdpMid,
                        sdpMLineIndex: o.candidate.sdpMLineIndex,
                        usernameFragment: o.candidate.usernameFragment,
                      };
                    });
                }
                var u = Qt.getMediaSections(r._localDescription.sdp);
                (u[o.candidate.sdpMLineIndex] += s
                  ? "a=end-of-candidates\r\n"
                  : "a=" + o.candidate.candidate + "\r\n"),
                  (r._localDescription.sdp =
                    Qt.getDescription(r._localDescription.sdp) + u.join(""));
                var d = r.transceivers.every(function (e) {
                  return e.iceGatherer && "completed" === e.iceGatherer.state;
                });
                "gathering" !== r.iceGatheringState &&
                  ((r.iceGatheringState = "gathering"),
                  r._emitGatheringStateChange()),
                  s || r._dispatchEvent("icecandidate", o),
                  d &&
                    (r._dispatchEvent(
                      "icecandidate",
                      new Event("icecandidate")
                    ),
                    (r.iceGatheringState = "complete"),
                    r._emitGatheringStateChange());
              }
            }),
            e.setTimeout(function () {
              o.forEach(function (e) {
                i.onlocalcandidate(e);
              });
            }, 0);
        }
      }),
      (i.prototype._createIceAndDtlsTransports = function () {
        var t = this,
          n = new e.RTCIceTransport(null);
        n.onicestatechange = function () {
          t._updateIceConnectionState(), t._updateConnectionState();
        };
        var r = new e.RTCDtlsTransport(n);
        return (
          (r.ondtlsstatechange = function () {
            t._updateConnectionState();
          }),
          (r.onerror = function () {
            Object.defineProperty(r, "state", {
              value: "failed",
              writable: !0,
            }),
              t._updateConnectionState();
          }),
          { iceTransport: n, dtlsTransport: r }
        );
      }),
      (i.prototype._disposeIceAndDtlsTransports = function (e) {
        var t = this.transceivers[e].iceGatherer;
        t &&
          (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
        var n = this.transceivers[e].iceTransport;
        n &&
          (delete n.onicestatechange, delete this.transceivers[e].iceTransport);
        var r = this.transceivers[e].dtlsTransport;
        r &&
          (delete r.ondtlsstatechange,
          delete r.onerror,
          delete this.transceivers[e].dtlsTransport);
      }),
      (i.prototype._transceive = function (e, n, r) {
        var i = Zt(e.localCapabilities, e.remoteCapabilities);
        n &&
          e.rtpSender &&
          ((i.encodings = e.sendEncodingParameters),
          (i.rtcp = {
            cname: Qt.localCName,
            compound: e.rtcpParameters.compound,
          }),
          e.recvEncodingParameters.length &&
            (i.rtcp.ssrc = e.recvEncodingParameters[0].ssrc),
          e.rtpSender.send(i)),
          r &&
            e.rtpReceiver &&
            i.codecs.length > 0 &&
            ("video" === e.kind &&
              e.recvEncodingParameters &&
              t < 15019 &&
              e.recvEncodingParameters.forEach(function (e) {
                delete e.rtx;
              }),
            e.recvEncodingParameters.length
              ? (i.encodings = e.recvEncodingParameters)
              : (i.encodings = [{}]),
            (i.rtcp = { compound: e.rtcpParameters.compound }),
            e.rtcpParameters.cname && (i.rtcp.cname = e.rtcpParameters.cname),
            e.sendEncodingParameters.length &&
              (i.rtcp.ssrc = e.sendEncodingParameters[0].ssrc),
            e.rtpReceiver.receive(i));
      }),
      (i.prototype.setLocalDescription = function (e) {
        var t,
          n,
          r = this;
        if (-1 === ["offer", "answer"].indexOf(e.type))
          return Promise.reject(
            nn("TypeError", 'Unsupported type "' + e.type + '"')
          );
        if (!en("setLocalDescription", e.type, r.signalingState) || r._isClosed)
          return Promise.reject(
            nn(
              "InvalidStateError",
              "Can not set local " + e.type + " in state " + r.signalingState
            )
          );
        if ("offer" === e.type)
          (t = Qt.splitSections(e.sdp)),
            (n = t.shift()),
            t.forEach(function (e, t) {
              var n = Qt.parseRtpParameters(e);
              r.transceivers[t].localCapabilities = n;
            }),
            r.transceivers.forEach(function (e, t) {
              r._gather(e.mid, t);
            });
        else if ("answer" === e.type) {
          (t = Qt.splitSections(r._remoteDescription.sdp)), (n = t.shift());
          var i = Qt.matchPrefix(n, "a=ice-lite").length > 0;
          t.forEach(function (e, t) {
            var o = r.transceivers[t],
              a = o.iceGatherer,
              s = o.iceTransport,
              c = o.dtlsTransport,
              u = o.localCapabilities,
              d = o.remoteCapabilities;
            if (
              !(
                Qt.isRejected(e) &&
                0 === Qt.matchPrefix(e, "a=bundle-only").length
              ) &&
              !o.rejected
            ) {
              var l = Qt.getIceParameters(e, n),
                p = Qt.getDtlsParameters(e, n);
              i && (p.role = "server"),
                (r.usingBundle && 0 !== t) ||
                  (r._gather(o.mid, t),
                  "new" === s.state &&
                    s.start(a, l, i ? "controlling" : "controlled"),
                  "new" === c.state && c.start(p));
              var f = Zt(u, d);
              r._transceive(o, f.codecs.length > 0, !1);
            }
          });
        }
        return (
          (r._localDescription = { type: e.type, sdp: e.sdp }),
          "offer" === e.type
            ? r._updateSignalingState("have-local-offer")
            : r._updateSignalingState("stable"),
          Promise.resolve()
        );
      }),
      (i.prototype.setRemoteDescription = function (i) {
        var o = this;
        if (-1 === ["offer", "answer"].indexOf(i.type))
          return Promise.reject(
            nn("TypeError", 'Unsupported type "' + i.type + '"')
          );
        if (
          !en("setRemoteDescription", i.type, o.signalingState) ||
          o._isClosed
        )
          return Promise.reject(
            nn(
              "InvalidStateError",
              "Can not set remote " + i.type + " in state " + o.signalingState
            )
          );
        var a = {};
        o.remoteStreams.forEach(function (e) {
          a[e.id] = e;
        });
        var s = [],
          c = Qt.splitSections(i.sdp),
          u = c.shift(),
          d = Qt.matchPrefix(u, "a=ice-lite").length > 0,
          l = Qt.matchPrefix(u, "a=group:BUNDLE ").length > 0;
        o.usingBundle = l;
        var p = Qt.matchPrefix(u, "a=ice-options:")[0];
        return (
          (o.canTrickleIceCandidates =
            !!p && p.substr(14).split(" ").indexOf("trickle") >= 0),
          c.forEach(function (r, c) {
            var p = Qt.splitLines(r),
              f = Qt.getKind(r),
              h =
                Qt.isRejected(r) &&
                0 === Qt.matchPrefix(r, "a=bundle-only").length,
              m = p[0].substr(2).split(" ")[2],
              v = Qt.getDirection(r, u),
              g = Qt.parseMsid(r),
              _ = Qt.getMid(r) || Qt.generateIdentifier();
            if (
              h ||
              ("application" === f &&
                ("DTLS/SCTP" === m || "UDP/DTLS/SCTP" === m))
            )
              o.transceivers[c] = {
                mid: _,
                kind: f,
                protocol: m,
                rejected: !0,
              };
            else {
              var y, S, b, k, R, T, w, C, E;
              !h &&
                o.transceivers[c] &&
                o.transceivers[c].rejected &&
                (o.transceivers[c] = o._createTransceiver(f, !0));
              var I,
                P,
                x = Qt.parseRtpParameters(r);
              h ||
                ((I = Qt.getIceParameters(r, u)),
                ((P = Qt.getDtlsParameters(r, u)).role = "client")),
                (w = Qt.parseRtpEncodingParameters(r));
              var A = Qt.parseRtcpParameters(r),
                O = Qt.matchPrefix(r, "a=end-of-candidates", u).length > 0,
                D = Qt.matchPrefix(r, "a=candidate:")
                  .map(function (e) {
                    return Qt.parseCandidate(e);
                  })
                  .filter(function (e) {
                    return 1 === e.component;
                  });
              if (
                (("offer" === i.type || "answer" === i.type) &&
                  !h &&
                  l &&
                  c > 0 &&
                  o.transceivers[c] &&
                  (o._disposeIceAndDtlsTransports(c),
                  (o.transceivers[c].iceGatherer =
                    o.transceivers[0].iceGatherer),
                  (o.transceivers[c].iceTransport =
                    o.transceivers[0].iceTransport),
                  (o.transceivers[c].dtlsTransport =
                    o.transceivers[0].dtlsTransport),
                  o.transceivers[c].rtpSender &&
                    o.transceivers[c].rtpSender.setTransport(
                      o.transceivers[0].dtlsTransport
                    ),
                  o.transceivers[c].rtpReceiver &&
                    o.transceivers[c].rtpReceiver.setTransport(
                      o.transceivers[0].dtlsTransport
                    )),
                "offer" !== i.type || h)
              ) {
                if ("answer" === i.type && !h) {
                  (S = (y = o.transceivers[c]).iceGatherer),
                    (b = y.iceTransport),
                    (k = y.dtlsTransport),
                    (R = y.rtpReceiver),
                    (T = y.sendEncodingParameters),
                    (C = y.localCapabilities),
                    (o.transceivers[c].recvEncodingParameters = w),
                    (o.transceivers[c].remoteCapabilities = x),
                    (o.transceivers[c].rtcpParameters = A),
                    D.length &&
                      "new" === b.state &&
                      ((!d && !O) || (l && 0 !== c)
                        ? D.forEach(function (e) {
                            tn(y.iceTransport, e);
                          })
                        : b.setRemoteCandidates(D)),
                    (l && 0 !== c) ||
                      ("new" === b.state && b.start(S, I, "controlling"),
                      "new" === k.state && k.start(P)),
                    !Zt(
                      y.localCapabilities,
                      y.remoteCapabilities
                    ).codecs.filter(function (e) {
                      return "rtx" === e.name.toLowerCase();
                    }).length &&
                      y.sendEncodingParameters[0].rtx &&
                      delete y.sendEncodingParameters[0].rtx,
                    o._transceive(
                      y,
                      "sendrecv" === v || "recvonly" === v,
                      "sendrecv" === v || "sendonly" === v
                    ),
                    !R || ("sendrecv" !== v && "sendonly" !== v)
                      ? delete y.rtpReceiver
                      : ((E = R.track),
                        g
                          ? (a[g.stream] || (a[g.stream] = new e.MediaStream()),
                            n(E, a[g.stream]),
                            s.push([E, R, a[g.stream]]))
                          : (a.default || (a.default = new e.MediaStream()),
                            n(E, a.default),
                            s.push([E, R, a.default])));
                }
              } else {
                ((y = o.transceivers[c] || o._createTransceiver(f)).mid = _),
                  y.iceGatherer || (y.iceGatherer = o._createIceGatherer(c, l)),
                  D.length &&
                    "new" === y.iceTransport.state &&
                    (!O || (l && 0 !== c)
                      ? D.forEach(function (e) {
                          tn(y.iceTransport, e);
                        })
                      : y.iceTransport.setRemoteCandidates(D)),
                  (C = e.RTCRtpReceiver.getCapabilities(f)),
                  t < 15019 &&
                    (C.codecs = C.codecs.filter(function (e) {
                      return "rtx" !== e.name;
                    })),
                  (T = y.sendEncodingParameters || [
                    { ssrc: 1001 * (2 * c + 2) },
                  ]);
                var L,
                  N = !1;
                if ("sendrecv" === v || "sendonly" === v) {
                  if (
                    ((N = !y.rtpReceiver),
                    (R =
                      y.rtpReceiver ||
                      new e.RTCRtpReceiver(y.dtlsTransport, f)),
                    N)
                  )
                    (E = R.track),
                      (g && "-" === g.stream) ||
                        (g
                          ? (a[g.stream] ||
                              ((a[g.stream] = new e.MediaStream()),
                              Object.defineProperty(a[g.stream], "id", {
                                get: function () {
                                  return g.stream;
                                },
                              })),
                            Object.defineProperty(E, "id", {
                              get: function () {
                                return g.track;
                              },
                            }),
                            (L = a[g.stream]))
                          : (a.default || (a.default = new e.MediaStream()),
                            (L = a.default))),
                      L && (n(E, L), y.associatedRemoteMediaStreams.push(L)),
                      s.push([E, R, L]);
                } else
                  y.rtpReceiver &&
                    y.rtpReceiver.track &&
                    (y.associatedRemoteMediaStreams.forEach(function (t) {
                      var n = t.getTracks().find(function (e) {
                        return e.id === y.rtpReceiver.track.id;
                      });
                      n &&
                        (function (t, n) {
                          n.removeTrack(t),
                            n.dispatchEvent(
                              new e.MediaStreamTrackEvent("removetrack", {
                                track: t,
                              })
                            );
                        })(n, t);
                    }),
                    (y.associatedRemoteMediaStreams = []));
                (y.localCapabilities = C),
                  (y.remoteCapabilities = x),
                  (y.rtpReceiver = R),
                  (y.rtcpParameters = A),
                  (y.sendEncodingParameters = T),
                  (y.recvEncodingParameters = w),
                  o._transceive(o.transceivers[c], !1, N);
              }
            }
          }),
          void 0 === o._dtlsRole &&
            (o._dtlsRole = "offer" === i.type ? "active" : "passive"),
          (o._remoteDescription = { type: i.type, sdp: i.sdp }),
          "offer" === i.type
            ? o._updateSignalingState("have-remote-offer")
            : o._updateSignalingState("stable"),
          Object.keys(a).forEach(function (t) {
            var n = a[t];
            if (n.getTracks().length) {
              if (-1 === o.remoteStreams.indexOf(n)) {
                o.remoteStreams.push(n);
                var i = new Event("addstream");
                (i.stream = n),
                  e.setTimeout(function () {
                    o._dispatchEvent("addstream", i);
                  });
              }
              s.forEach(function (e) {
                var t = e[0],
                  i = e[1];
                n.id === e[2].id && r(o, t, i, [n]);
              });
            }
          }),
          s.forEach(function (e) {
            e[2] || r(o, e[0], e[1], []);
          }),
          e.setTimeout(function () {
            o &&
              o.transceivers &&
              o.transceivers.forEach(function (e) {
                e.iceTransport &&
                  "new" === e.iceTransport.state &&
                  e.iceTransport.getRemoteCandidates().length > 0 &&
                  (console.warn(
                    "Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"
                  ),
                  e.iceTransport.addRemoteCandidate({}));
              });
          }, 4e3),
          Promise.resolve()
        );
      }),
      (i.prototype.close = function () {
        this.transceivers.forEach(function (e) {
          e.iceTransport && e.iceTransport.stop(),
            e.dtlsTransport && e.dtlsTransport.stop(),
            e.rtpSender && e.rtpSender.stop(),
            e.rtpReceiver && e.rtpReceiver.stop();
        }),
          (this._isClosed = !0),
          this._updateSignalingState("closed");
      }),
      (i.prototype._updateSignalingState = function (e) {
        this.signalingState = e;
        var t = new Event("signalingstatechange");
        this._dispatchEvent("signalingstatechange", t);
      }),
      (i.prototype._maybeFireNegotiationNeeded = function () {
        var t = this;
        "stable" === this.signalingState &&
          !0 !== this.needNegotiation &&
          ((this.needNegotiation = !0),
          e.setTimeout(function () {
            if (t.needNegotiation) {
              t.needNegotiation = !1;
              var e = new Event("negotiationneeded");
              t._dispatchEvent("negotiationneeded", e);
            }
          }, 0));
      }),
      (i.prototype._updateIceConnectionState = function () {
        var e,
          t = {
            new: 0,
            closed: 0,
            checking: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0,
          };
        if (
          (this.transceivers.forEach(function (e) {
            e.iceTransport && !e.rejected && t[e.iceTransport.state]++;
          }),
          (e = "new"),
          t.failed > 0
            ? (e = "failed")
            : t.checking > 0
            ? (e = "checking")
            : t.disconnected > 0
            ? (e = "disconnected")
            : t.new > 0
            ? (e = "new")
            : t.connected > 0
            ? (e = "connected")
            : t.completed > 0 && (e = "completed"),
          e !== this.iceConnectionState)
        ) {
          this.iceConnectionState = e;
          var n = new Event("iceconnectionstatechange");
          this._dispatchEvent("iceconnectionstatechange", n);
        }
      }),
      (i.prototype._updateConnectionState = function () {
        var e,
          t = {
            new: 0,
            closed: 0,
            connecting: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0,
          };
        if (
          (this.transceivers.forEach(function (e) {
            e.iceTransport &&
              e.dtlsTransport &&
              !e.rejected &&
              (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++);
          }),
          (t.connected += t.completed),
          (e = "new"),
          t.failed > 0
            ? (e = "failed")
            : t.connecting > 0
            ? (e = "connecting")
            : t.disconnected > 0
            ? (e = "disconnected")
            : t.new > 0
            ? (e = "new")
            : t.connected > 0 && (e = "connected"),
          e !== this.connectionState)
        ) {
          this.connectionState = e;
          var n = new Event("connectionstatechange");
          this._dispatchEvent("connectionstatechange", n);
        }
      }),
      (i.prototype.createOffer = function () {
        var n = this;
        if (n._isClosed)
          return Promise.reject(
            nn("InvalidStateError", "Can not call createOffer after close")
          );
        var r = n.transceivers.filter(function (e) {
            return "audio" === e.kind;
          }).length,
          i = n.transceivers.filter(function (e) {
            return "video" === e.kind;
          }).length,
          o = arguments[0];
        if (o) {
          if (o.mandatory || o.optional)
            throw new TypeError(
              "Legacy mandatory/optional constraints not supported."
            );
          void 0 !== o.offerToReceiveAudio &&
            (r =
              !0 === o.offerToReceiveAudio
                ? 1
                : !1 === o.offerToReceiveAudio
                ? 0
                : o.offerToReceiveAudio),
            void 0 !== o.offerToReceiveVideo &&
              (i =
                !0 === o.offerToReceiveVideo
                  ? 1
                  : !1 === o.offerToReceiveVideo
                  ? 0
                  : o.offerToReceiveVideo);
        }
        for (
          n.transceivers.forEach(function (e) {
            "audio" === e.kind
              ? --r < 0 && (e.wantReceive = !1)
              : "video" === e.kind && --i < 0 && (e.wantReceive = !1);
          });
          r > 0 || i > 0;

        )
          r > 0 && (n._createTransceiver("audio"), r--),
            i > 0 && (n._createTransceiver("video"), i--);
        var a = Qt.writeSessionBoilerplate(
          n._sdpSessionId,
          n._sdpSessionVersion++
        );
        n.transceivers.forEach(function (r, i) {
          var o = r.track,
            a = r.kind,
            s = r.mid || Qt.generateIdentifier();
          (r.mid = s),
            r.iceGatherer ||
              (r.iceGatherer = n._createIceGatherer(i, n.usingBundle));
          var c = e.RTCRtpSender.getCapabilities(a);
          t < 15019 &&
            (c.codecs = c.codecs.filter(function (e) {
              return "rtx" !== e.name;
            })),
            c.codecs.forEach(function (e) {
              "H264" === e.name &&
                void 0 === e.parameters["level-asymmetry-allowed"] &&
                (e.parameters["level-asymmetry-allowed"] = "1"),
                r.remoteCapabilities &&
                  r.remoteCapabilities.codecs &&
                  r.remoteCapabilities.codecs.forEach(function (t) {
                    e.name.toLowerCase() === t.name.toLowerCase() &&
                      e.clockRate === t.clockRate &&
                      (e.preferredPayloadType = t.payloadType);
                  });
            }),
            c.headerExtensions.forEach(function (e) {
              (
                (r.remoteCapabilities &&
                  r.remoteCapabilities.headerExtensions) ||
                []
              ).forEach(function (t) {
                e.uri === t.uri && (e.id = t.id);
              });
            });
          var u = r.sendEncodingParameters || [{ ssrc: 1001 * (2 * i + 1) }];
          o &&
            t >= 15019 &&
            "video" === a &&
            !u[0].rtx &&
            (u[0].rtx = { ssrc: u[0].ssrc + 1 }),
            r.wantReceive &&
              (r.rtpReceiver = new e.RTCRtpReceiver(r.dtlsTransport, a)),
            (r.localCapabilities = c),
            (r.sendEncodingParameters = u);
        }),
          "max-compat" !== n._config.bundlePolicy &&
            (a +=
              "a=group:BUNDLE " +
              n.transceivers
                .map(function (e) {
                  return e.mid;
                })
                .join(" ") +
              "\r\n"),
          (a += "a=ice-options:trickle\r\n"),
          n.transceivers.forEach(function (e, t) {
            (a += Xt(e, e.localCapabilities, "offer", e.stream, n._dtlsRole)),
              (a += "a=rtcp-rsize\r\n"),
              !e.iceGatherer ||
                "new" === n.iceGatheringState ||
                (0 !== t && n.usingBundle) ||
                (e.iceGatherer.getLocalCandidates().forEach(function (e) {
                  (e.component = 1),
                    (a += "a=" + Qt.writeCandidate(e) + "\r\n");
                }),
                "completed" === e.iceGatherer.state &&
                  (a += "a=end-of-candidates\r\n"));
          });
        var s = new e.RTCSessionDescription({ type: "offer", sdp: a });
        return Promise.resolve(s);
      }),
      (i.prototype.createAnswer = function () {
        var n = this;
        if (n._isClosed)
          return Promise.reject(
            nn("InvalidStateError", "Can not call createAnswer after close")
          );
        if (
          "have-remote-offer" !== n.signalingState &&
          "have-local-pranswer" !== n.signalingState
        )
          return Promise.reject(
            nn(
              "InvalidStateError",
              "Can not call createAnswer in signalingState " + n.signalingState
            )
          );
        var r = Qt.writeSessionBoilerplate(
          n._sdpSessionId,
          n._sdpSessionVersion++
        );
        n.usingBundle &&
          (r +=
            "a=group:BUNDLE " +
            n.transceivers
              .map(function (e) {
                return e.mid;
              })
              .join(" ") +
            "\r\n"),
          (r += "a=ice-options:trickle\r\n");
        var i = Qt.getMediaSections(n._remoteDescription.sdp).length;
        n.transceivers.forEach(function (e, o) {
          if (!(o + 1 > i)) {
            if (e.rejected)
              return (
                "application" === e.kind
                  ? "DTLS/SCTP" === e.protocol
                    ? (r += "m=application 0 DTLS/SCTP 5000\r\n")
                    : (r +=
                        "m=application 0 " +
                        e.protocol +
                        " webrtc-datachannel\r\n")
                  : "audio" === e.kind
                  ? (r +=
                      "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n")
                  : "video" === e.kind &&
                    (r +=
                      "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"),
                void (r +=
                  "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n")
              );
            var a;
            if (e.stream)
              "audio" === e.kind
                ? (a = e.stream.getAudioTracks()[0])
                : "video" === e.kind && (a = e.stream.getVideoTracks()[0]),
                a &&
                  t >= 15019 &&
                  "video" === e.kind &&
                  !e.sendEncodingParameters[0].rtx &&
                  (e.sendEncodingParameters[0].rtx = {
                    ssrc: e.sendEncodingParameters[0].ssrc + 1,
                  });
            var s = Zt(e.localCapabilities, e.remoteCapabilities);
            !s.codecs.filter(function (e) {
              return "rtx" === e.name.toLowerCase();
            }).length &&
              e.sendEncodingParameters[0].rtx &&
              delete e.sendEncodingParameters[0].rtx,
              (r += Xt(e, s, "answer", e.stream, n._dtlsRole)),
              e.rtcpParameters &&
                e.rtcpParameters.reducedSize &&
                (r += "a=rtcp-rsize\r\n");
          }
        });
        var o = new e.RTCSessionDescription({ type: "answer", sdp: r });
        return Promise.resolve(o);
      }),
      (i.prototype.addIceCandidate = function (e) {
        var t,
          n = this;
        return e && void 0 === e.sdpMLineIndex && !e.sdpMid
          ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required"))
          : new Promise(function (r, i) {
              if (!n._remoteDescription)
                return i(
                  nn(
                    "InvalidStateError",
                    "Can not add ICE candidate without a remote description"
                  )
                );
              if (e && "" !== e.candidate) {
                var o = e.sdpMLineIndex;
                if (e.sdpMid)
                  for (var a = 0; a < n.transceivers.length; a++)
                    if (n.transceivers[a].mid === e.sdpMid) {
                      o = a;
                      break;
                    }
                var s = n.transceivers[o];
                if (!s)
                  return i(nn("OperationError", "Can not add ICE candidate"));
                if (s.rejected) return r();
                var c =
                  Object.keys(e.candidate).length > 0
                    ? Qt.parseCandidate(e.candidate)
                    : {};
                if ("tcp" === c.protocol && (0 === c.port || 9 === c.port))
                  return r();
                if (c.component && 1 !== c.component) return r();
                if (
                  (0 === o ||
                    (o > 0 &&
                      s.iceTransport !== n.transceivers[0].iceTransport)) &&
                  !tn(s.iceTransport, c)
                )
                  return i(nn("OperationError", "Can not add ICE candidate"));
                var u = e.candidate.trim();
                0 === u.indexOf("a=") && (u = u.substr(2)),
                  ((t = Qt.getMediaSections(n._remoteDescription.sdp))[o] +=
                    "a=" + (c.type ? u : "end-of-candidates") + "\r\n"),
                  (n._remoteDescription.sdp =
                    Qt.getDescription(n._remoteDescription.sdp) + t.join(""));
              } else for (var d = 0; d < n.transceivers.length && (n.transceivers[d].rejected || (n.transceivers[d].iceTransport.addRemoteCandidate({}), ((t = Qt.getMediaSections(n._remoteDescription.sdp))[d] += "a=end-of-candidates\r\n"), (n._remoteDescription.sdp = Qt.getDescription(n._remoteDescription.sdp) + t.join("")), !n.usingBundle)); d++);
              r();
            });
      }),
      (i.prototype.getStats = function (t) {
        if (t && t instanceof e.MediaStreamTrack) {
          var n = null;
          if (
            (this.transceivers.forEach(function (e) {
              e.rtpSender && e.rtpSender.track === t
                ? (n = e.rtpSender)
                : e.rtpReceiver &&
                  e.rtpReceiver.track === t &&
                  (n = e.rtpReceiver);
            }),
            !n)
          )
            throw nn("InvalidAccessError", "Invalid selector.");
          return n.getStats();
        }
        var r = [];
        return (
          this.transceivers.forEach(function (e) {
            [
              "rtpSender",
              "rtpReceiver",
              "iceGatherer",
              "iceTransport",
              "dtlsTransport",
            ].forEach(function (t) {
              e[t] && r.push(e[t].getStats());
            });
          }),
          Promise.all(r).then(function (e) {
            var t = new Map();
            return (
              e.forEach(function (e) {
                e.forEach(function (e) {
                  t.set(e.id, e);
                });
              }),
              t
            );
          })
        );
      });
    [
      "RTCRtpSender",
      "RTCRtpReceiver",
      "RTCIceGatherer",
      "RTCIceTransport",
      "RTCDtlsTransport",
    ].forEach(function (t) {
      var n = e[t];
      if (n && n.prototype && n.prototype.getStats) {
        var r = n.prototype.getStats;
        n.prototype.getStats = function () {
          return r.apply(this).then(function (e) {
            var t = new Map();
            return (
              Object.keys(e).forEach(function (n) {
                var r;
                (e[n].type =
                  {
                    inboundrtp: "inbound-rtp",
                    outboundrtp: "outbound-rtp",
                    candidatepair: "candidate-pair",
                    localcandidate: "local-candidate",
                    remotecandidate: "remote-candidate",
                  }[(r = e[n]).type] || r.type),
                  t.set(n, e[n]);
              }),
              t
            );
          });
        };
      }
    });
    var o = ["createOffer", "createAnswer"];
    return (
      o.forEach(function (e) {
        var t = i.prototype[e];
        i.prototype[e] = function () {
          var e = arguments;
          return "function" == typeof e[0] || "function" == typeof e[1]
            ? t.apply(this, [arguments[2]]).then(
                function (t) {
                  "function" == typeof e[0] && e[0].apply(null, [t]);
                },
                function (t) {
                  "function" == typeof e[1] && e[1].apply(null, [t]);
                }
              )
            : t.apply(this, arguments);
        };
      }),
      (o = [
        "setLocalDescription",
        "setRemoteDescription",
        "addIceCandidate",
      ]).forEach(function (e) {
        var t = i.prototype[e];
        i.prototype[e] = function () {
          var e = arguments;
          return "function" == typeof e[1] || "function" == typeof e[2]
            ? t.apply(this, arguments).then(
                function () {
                  "function" == typeof e[1] && e[1].apply(null);
                },
                function (t) {
                  "function" == typeof e[2] && e[2].apply(null, [t]);
                }
              )
            : t.apply(this, arguments);
        };
      }),
      ["getStats"].forEach(function (e) {
        var t = i.prototype[e];
        i.prototype[e] = function () {
          var e = arguments;
          return "function" == typeof e[1]
            ? t.apply(this, arguments).then(function () {
                "function" == typeof e[1] && e[1].apply(null);
              })
            : t.apply(this, arguments);
        };
      }),
      i
    );
  };
  function on(e) {
    const t = e && e.navigator,
      n = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
    t.mediaDevices.getUserMedia = function (e) {
      return n(e).catch((e) =>
        Promise.reject(
          (function (e) {
            return {
              name:
                { PermissionDeniedError: "NotAllowedError" }[e.name] || e.name,
              message: e.message,
              constraint: e.constraint,
              toString() {
                return this.name;
              },
            };
          })(e)
        )
      );
    };
  }
  function an(e) {
    "getDisplayMedia" in e.navigator &&
      e.navigator.mediaDevices &&
      ((e.navigator.mediaDevices &&
        "getDisplayMedia" in e.navigator.mediaDevices) ||
        (e.navigator.mediaDevices.getDisplayMedia =
          e.navigator.getDisplayMedia.bind(e.navigator)));
  }
  function sn(e) {
    const t = Nt(e);
    if (
      e.RTCIceGatherer &&
      (e.RTCIceCandidate ||
        (e.RTCIceCandidate = function (e) {
          return e;
        }),
      e.RTCSessionDescription ||
        (e.RTCSessionDescription = function (e) {
          return e;
        }),
      t.version < 15025)
    ) {
      const t = Object.getOwnPropertyDescriptor(
        e.MediaStreamTrack.prototype,
        "enabled"
      );
      Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
        set(e) {
          t.set.call(this, e);
          const n = new Event("enabled");
          (n.enabled = e), this.dispatchEvent(n);
        },
      });
    }
    !e.RTCRtpSender ||
      "dtmf" in e.RTCRtpSender.prototype ||
      Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
        get() {
          return (
            void 0 === this._dtmf &&
              ("audio" === this.track.kind
                ? (this._dtmf = new e.RTCDtmfSender(this))
                : "video" === this.track.kind && (this._dtmf = null)),
            this._dtmf
          );
        },
      }),
      e.RTCDtmfSender &&
        !e.RTCDTMFSender &&
        (e.RTCDTMFSender = e.RTCDtmfSender);
    const n = rn(e, t.version);
    (e.RTCPeerConnection = function (e) {
      return (
        e &&
          e.iceServers &&
          ((e.iceServers = (function (e, t) {
            let n = !1;
            return (e = JSON.parse(JSON.stringify(e))).filter((e) => {
              if (e && (e.urls || e.url)) {
                var t = e.urls || e.url;
                e.url && !e.urls && Lt("RTCIceServer.url", "RTCIceServer.urls");
                const r = "string" == typeof t;
                return (
                  r && (t = [t]),
                  (t = t.filter((e) => {
                    if (0 === e.indexOf("stun:")) return !1;
                    const t =
                      e.startsWith("turn") &&
                      !e.startsWith("turn:[") &&
                      e.includes("transport=udp");
                    return t && !n ? ((n = !0), !0) : t && !n;
                  })),
                  delete e.url,
                  (e.urls = r ? t[0] : t),
                  !!t.length
                );
              }
            });
          })(e.iceServers, t.version)),
          Dt("ICE servers after filtering:", e.iceServers)),
        new n(e)
      );
    }),
      (e.RTCPeerConnection.prototype = n.prototype);
  }
  function cn(e) {
    !e.RTCRtpSender ||
      "replaceTrack" in e.RTCRtpSender.prototype ||
      (e.RTCRtpSender.prototype.replaceTrack =
        e.RTCRtpSender.prototype.setTrack);
  }
  var un = Object.freeze({
    shimPeerConnection: sn,
    shimReplaceTrack: cn,
    shimGetUserMedia: on,
    shimGetDisplayMedia: an,
  });
  function dn(e) {
    const t = Nt(e),
      n = e && e.navigator,
      r = e && e.MediaStreamTrack;
    if (
      ((n.getUserMedia = function (e, t, r) {
        Lt("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"),
          n.mediaDevices.getUserMedia(e).then(t, r);
      }),
      !(
        t.version > 55 &&
        "autoGainControl" in n.mediaDevices.getSupportedConstraints()
      ))
    ) {
      const e = function (e, t, n) {
          t in e && !(n in e) && ((e[n] = e[t]), delete e[t]);
        },
        t = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
      if (
        ((n.mediaDevices.getUserMedia = function (n) {
          return (
            "object" == typeof n &&
              "object" == typeof n.audio &&
              ((n = JSON.parse(JSON.stringify(n))),
              e(n.audio, "autoGainControl", "mozAutoGainControl"),
              e(n.audio, "noiseSuppression", "mozNoiseSuppression")),
            t(n)
          );
        }),
        r && r.prototype.getSettings)
      ) {
        const t = r.prototype.getSettings;
        r.prototype.getSettings = function () {
          const n = t.apply(this, arguments);
          return (
            e(n, "mozAutoGainControl", "autoGainControl"),
            e(n, "mozNoiseSuppression", "noiseSuppression"),
            n
          );
        };
      }
      if (r && r.prototype.applyConstraints) {
        const t = r.prototype.applyConstraints;
        r.prototype.applyConstraints = function (n) {
          return (
            "audio" === this.kind &&
              "object" == typeof n &&
              ((n = JSON.parse(JSON.stringify(n))),
              e(n, "autoGainControl", "mozAutoGainControl"),
              e(n, "noiseSuppression", "mozNoiseSuppression")),
            t.apply(this, [n])
          );
        };
      }
    }
  }
  function ln(e) {
    "object" == typeof e &&
      e.RTCTrackEvent &&
      "receiver" in e.RTCTrackEvent.prototype &&
      !("transceiver" in e.RTCTrackEvent.prototype) &&
      Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
        get() {
          return { receiver: this.receiver };
        },
      });
  }
  function pn(e) {
    const t = Nt(e);
    if (
      "object" != typeof e ||
      (!e.RTCPeerConnection && !e.mozRTCPeerConnection)
    )
      return;
    !e.RTCPeerConnection &&
      e.mozRTCPeerConnection &&
      (e.RTCPeerConnection = e.mozRTCPeerConnection),
      t.version < 53 &&
        [
          "setLocalDescription",
          "setRemoteDescription",
          "addIceCandidate",
        ].forEach(function (t) {
          const n = e.RTCPeerConnection.prototype[t],
            r = {
              [t]() {
                return (
                  (arguments[0] = new (
                    "addIceCandidate" === t
                      ? e.RTCIceCandidate
                      : e.RTCSessionDescription
                  )(arguments[0])),
                  n.apply(this, arguments)
                );
              },
            };
          e.RTCPeerConnection.prototype[t] = r[t];
        });
    const n = e.RTCPeerConnection.prototype.addIceCandidate;
    e.RTCPeerConnection.prototype.addIceCandidate = function () {
      return arguments[0]
        ? t.version < 68 && arguments[0] && "" === arguments[0].candidate
          ? Promise.resolve()
          : n.apply(this, arguments)
        : (arguments[1] && arguments[1].apply(null), Promise.resolve());
    };
    const r = {
        inboundrtp: "inbound-rtp",
        outboundrtp: "outbound-rtp",
        candidatepair: "candidate-pair",
        localcandidate: "local-candidate",
        remotecandidate: "remote-candidate",
      },
      i = e.RTCPeerConnection.prototype.getStats;
    e.RTCPeerConnection.prototype.getStats = function () {
      const [e, n, o] = arguments;
      return i
        .apply(this, [e || null])
        .then((e) => {
          if (t.version < 53 && !n)
            try {
              e.forEach((e) => {
                e.type = r[e.type] || e.type;
              });
            } catch (i) {
              if ("TypeError" !== i.name) throw i;
              e.forEach((t, n) => {
                e.set(n, Object.assign({}, t, { type: r[t.type] || t.type }));
              });
            }
          return e;
        })
        .then(n, o);
    };
  }
  function fn(e) {
    if ("object" != typeof e || !e.RTCPeerConnection || !e.RTCRtpSender) return;
    if (e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype) return;
    const t = e.RTCPeerConnection.prototype.getSenders;
    t &&
      (e.RTCPeerConnection.prototype.getSenders = function () {
        const e = t.apply(this, []);
        return e.forEach((e) => (e._pc = this)), e;
      });
    const n = e.RTCPeerConnection.prototype.addTrack;
    n &&
      (e.RTCPeerConnection.prototype.addTrack = function () {
        const e = n.apply(this, arguments);
        return (e._pc = this), e;
      }),
      (e.RTCRtpSender.prototype.getStats = function () {
        return this.track
          ? this._pc.getStats(this.track)
          : Promise.resolve(new Map());
      });
  }
  function hn(e) {
    if ("object" != typeof e || !e.RTCPeerConnection || !e.RTCRtpSender) return;
    if (e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype) return;
    const t = e.RTCPeerConnection.prototype.getReceivers;
    t &&
      (e.RTCPeerConnection.prototype.getReceivers = function () {
        const e = t.apply(this, []);
        return e.forEach((e) => (e._pc = this)), e;
      }),
      xt(e, "track", (e) => ((e.receiver._pc = e.srcElement), e)),
      (e.RTCRtpReceiver.prototype.getStats = function () {
        return this._pc.getStats(this.track);
      });
  }
  function mn(e) {
    !e.RTCPeerConnection ||
      "removeStream" in e.RTCPeerConnection.prototype ||
      (e.RTCPeerConnection.prototype.removeStream = function (e) {
        Lt("removeStream", "removeTrack"),
          this.getSenders().forEach((t) => {
            t.track && e.getTracks().includes(t.track) && this.removeTrack(t);
          });
      });
  }
  function vn(e) {
    e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
  }
  var gn = Object.freeze({
    shimOnTrack: ln,
    shimPeerConnection: pn,
    shimSenderGetStats: fn,
    shimReceiverGetStats: hn,
    shimRemoveStream: mn,
    shimRTCDataChannel: vn,
    shimGetUserMedia: dn,
    shimGetDisplayMedia: function (e, t) {
      (e.navigator.mediaDevices &&
        "getDisplayMedia" in e.navigator.mediaDevices) ||
        (e.navigator.mediaDevices &&
          (e.navigator.mediaDevices.getDisplayMedia = function (n) {
            if (!n || !n.video) {
              const e = new DOMException(
                "getDisplayMedia without video constraints is undefined"
              );
              return (
                (e.name = "NotFoundError"), (e.code = 8), Promise.reject(e)
              );
            }
            return (
              !0 === n.video
                ? (n.video = { mediaSource: t })
                : (n.video.mediaSource = t),
              e.navigator.mediaDevices.getUserMedia(n)
            );
          }));
    },
  });
  function _n(e) {
    if ("object" == typeof e && e.RTCPeerConnection) {
      if (
        ("getLocalStreams" in e.RTCPeerConnection.prototype ||
          (e.RTCPeerConnection.prototype.getLocalStreams = function () {
            return (
              this._localStreams || (this._localStreams = []),
              this._localStreams
            );
          }),
        !("addStream" in e.RTCPeerConnection.prototype))
      ) {
        const t = e.RTCPeerConnection.prototype.addTrack;
        (e.RTCPeerConnection.prototype.addStream = function (e) {
          this._localStreams || (this._localStreams = []),
            this._localStreams.includes(e) || this._localStreams.push(e),
            e.getAudioTracks().forEach((n) => t.call(this, n, e)),
            e.getVideoTracks().forEach((n) => t.call(this, n, e));
        }),
          (e.RTCPeerConnection.prototype.addTrack = function (e) {
            const n = arguments[1];
            return (
              n &&
                (this._localStreams
                  ? this._localStreams.includes(n) || this._localStreams.push(n)
                  : (this._localStreams = [n])),
              t.apply(this, arguments)
            );
          });
      }
      "removeStream" in e.RTCPeerConnection.prototype ||
        (e.RTCPeerConnection.prototype.removeStream = function (e) {
          this._localStreams || (this._localStreams = []);
          const t = this._localStreams.indexOf(e);
          if (-1 === t) return;
          this._localStreams.splice(t, 1);
          const n = e.getTracks();
          this.getSenders().forEach((e) => {
            n.includes(e.track) && this.removeTrack(e);
          });
        });
    }
  }
  function yn(e) {
    if (
      "object" == typeof e &&
      e.RTCPeerConnection &&
      ("getRemoteStreams" in e.RTCPeerConnection.prototype ||
        (e.RTCPeerConnection.prototype.getRemoteStreams = function () {
          return this._remoteStreams ? this._remoteStreams : [];
        }),
      !("onaddstream" in e.RTCPeerConnection.prototype))
    ) {
      Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
        get() {
          return this._onaddstream;
        },
        set(e) {
          this._onaddstream &&
            (this.removeEventListener("addstream", this._onaddstream),
            this.removeEventListener("track", this._onaddstreampoly)),
            this.addEventListener("addstream", (this._onaddstream = e)),
            this.addEventListener(
              "track",
              (this._onaddstreampoly = (e) => {
                e.streams.forEach((e) => {
                  if (
                    (this._remoteStreams || (this._remoteStreams = []),
                    this._remoteStreams.includes(e))
                  )
                    return;
                  this._remoteStreams.push(e);
                  const t = new Event("addstream");
                  (t.stream = e), this.dispatchEvent(t);
                });
              })
            );
        },
      });
      const t = e.RTCPeerConnection.prototype.setRemoteDescription;
      e.RTCPeerConnection.prototype.setRemoteDescription = function () {
        const e = this;
        return (
          this._onaddstreampoly ||
            this.addEventListener(
              "track",
              (this._onaddstreampoly = function (t) {
                t.streams.forEach((t) => {
                  if (
                    (e._remoteStreams || (e._remoteStreams = []),
                    e._remoteStreams.indexOf(t) >= 0)
                  )
                    return;
                  e._remoteStreams.push(t);
                  const n = new Event("addstream");
                  (n.stream = t), e.dispatchEvent(n);
                });
              })
            ),
          t.apply(e, arguments)
        );
      };
    }
  }
  function Sn(e) {
    if ("object" != typeof e || !e.RTCPeerConnection) return;
    const t = e.RTCPeerConnection.prototype,
      n = t.createOffer,
      r = t.createAnswer,
      i = t.setLocalDescription,
      o = t.setRemoteDescription,
      a = t.addIceCandidate;
    (t.createOffer = function (e, t) {
      const r = arguments.length >= 2 ? arguments[2] : arguments[0],
        i = n.apply(this, [r]);
      return t ? (i.then(e, t), Promise.resolve()) : i;
    }),
      (t.createAnswer = function (e, t) {
        const n = arguments.length >= 2 ? arguments[2] : arguments[0],
          i = r.apply(this, [n]);
        return t ? (i.then(e, t), Promise.resolve()) : i;
      });
    let s = function (e, t, n) {
      const r = i.apply(this, [e]);
      return n ? (r.then(t, n), Promise.resolve()) : r;
    };
    (t.setLocalDescription = s),
      (s = function (e, t, n) {
        const r = o.apply(this, [e]);
        return n ? (r.then(t, n), Promise.resolve()) : r;
      }),
      (t.setRemoteDescription = s),
      (s = function (e, t, n) {
        const r = a.apply(this, [e]);
        return n ? (r.then(t, n), Promise.resolve()) : r;
      }),
      (t.addIceCandidate = s);
  }
  function bn(e) {
    const t = e && e.navigator;
    if (t.mediaDevices && t.mediaDevices.getUserMedia) {
      const e = t.mediaDevices,
        n = e.getUserMedia.bind(e);
      t.mediaDevices.getUserMedia = (e) => n(kn(e));
    }
    !t.getUserMedia &&
      t.mediaDevices &&
      t.mediaDevices.getUserMedia &&
      (t.getUserMedia = function (e, n, r) {
        t.mediaDevices.getUserMedia(e).then(n, r);
      }.bind(t));
  }
  function kn(e) {
    return e && void 0 !== e.video
      ? Object.assign({}, e, { video: jt(e.video) })
      : e;
  }
  function Rn(e) {
    const t = e.RTCPeerConnection;
    (e.RTCPeerConnection = function (e, n) {
      if (e && e.iceServers) {
        const t = [];
        for (let n = 0; n < e.iceServers.length; n++) {
          let r = e.iceServers[n];
          !r.hasOwnProperty("urls") && r.hasOwnProperty("url")
            ? (Lt("RTCIceServer.url", "RTCIceServer.urls"),
              ((r = JSON.parse(JSON.stringify(r))).urls = r.url),
              delete r.url,
              t.push(r))
            : t.push(e.iceServers[n]);
        }
        e.iceServers = t;
      }
      return new t(e, n);
    }),
      (e.RTCPeerConnection.prototype = t.prototype),
      "generateCertificate" in e.RTCPeerConnection &&
        Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
          get: () => t.generateCertificate,
        });
  }
  function Tn(e) {
    "object" == typeof e &&
      e.RTCTrackEvent &&
      "receiver" in e.RTCTrackEvent.prototype &&
      !("transceiver" in e.RTCTrackEvent.prototype) &&
      Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
        get() {
          return { receiver: this.receiver };
        },
      });
  }
  function wn(e) {
    const t = e.RTCPeerConnection.prototype.createOffer;
    e.RTCPeerConnection.prototype.createOffer = function (e) {
      if (e) {
        void 0 !== e.offerToReceiveAudio &&
          (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
        const t = this.getTransceivers().find(
          (e) => "audio" === e.receiver.track.kind
        );
        !1 === e.offerToReceiveAudio && t
          ? "sendrecv" === t.direction
            ? t.setDirection
              ? t.setDirection("sendonly")
              : (t.direction = "sendonly")
            : "recvonly" === t.direction &&
              (t.setDirection
                ? t.setDirection("inactive")
                : (t.direction = "inactive"))
          : !0 !== e.offerToReceiveAudio || t || this.addTransceiver("audio"),
          void 0 !== e.offerToReceiveVideo &&
            (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
        const n = this.getTransceivers().find(
          (e) => "video" === e.receiver.track.kind
        );
        !1 === e.offerToReceiveVideo && n
          ? "sendrecv" === n.direction
            ? n.setDirection
              ? n.setDirection("sendonly")
              : (n.direction = "sendonly")
            : "recvonly" === n.direction &&
              (n.setDirection
                ? n.setDirection("inactive")
                : (n.direction = "inactive"))
          : !0 !== e.offerToReceiveVideo || n || this.addTransceiver("video");
      }
      return t.apply(this, arguments);
    };
  }
  var Cn = Object.freeze({
    shimLocalStreamsAPI: _n,
    shimRemoteStreamsAPI: yn,
    shimCallbacksAPI: Sn,
    shimGetUserMedia: bn,
    shimConstraints: kn,
    shimRTCIceServerUrls: Rn,
    shimTrackEventTransceiver: Tn,
    shimCreateOfferLegacy: wn,
  });
  function En(e) {
    if (
      !e.RTCIceCandidate ||
      (e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)
    )
      return;
    const t = e.RTCIceCandidate;
    (e.RTCIceCandidate = function (e) {
      if (
        ("object" == typeof e &&
          e.candidate &&
          0 === e.candidate.indexOf("a=") &&
          ((e = JSON.parse(JSON.stringify(e))).candidate =
            e.candidate.substr(2)),
        e.candidate && e.candidate.length)
      ) {
        const n = new t(e),
          r = Qt.parseCandidate(e.candidate),
          i = Object.assign(n, r);
        return (
          (i.toJSON = function () {
            return {
              candidate: i.candidate,
              sdpMid: i.sdpMid,
              sdpMLineIndex: i.sdpMLineIndex,
              usernameFragment: i.usernameFragment,
            };
          }),
          i
        );
      }
      return new t(e);
    }),
      (e.RTCIceCandidate.prototype = t.prototype),
      xt(
        e,
        "icecandidate",
        (t) => (
          t.candidate &&
            Object.defineProperty(t, "candidate", {
              value: new e.RTCIceCandidate(t.candidate),
              writable: "false",
            }),
          t
        )
      );
  }
  function In(e) {
    if (!e.RTCPeerConnection) return;
    const t = Nt(e);
    "sctp" in e.RTCPeerConnection.prototype ||
      Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
        get() {
          return void 0 === this._sctp ? null : this._sctp;
        },
      });
    const n = function (e) {
        if (!e || !e.sdp) return !1;
        const t = Qt.splitSections(e.sdp);
        return (
          t.shift(),
          t.some((e) => {
            const t = Qt.parseMLine(e);
            return (
              t && "application" === t.kind && -1 !== t.protocol.indexOf("SCTP")
            );
          })
        );
      },
      r = function (e) {
        const t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
        if (null === t || t.length < 2) return -1;
        const n = parseInt(t[1], 10);
        return n != n ? -1 : n;
      },
      i = function (e) {
        let n = 65536;
        return (
          "firefox" === t.browser &&
            (n =
              t.version < 57
                ? -1 === e
                  ? 16384
                  : 2147483637
                : t.version < 60
                ? 57 === t.version
                  ? 65535
                  : 65536
                : 2147483637),
          n
        );
      },
      o = function (e, n) {
        let r = 65536;
        "firefox" === t.browser && 57 === t.version && (r = 65535);
        const i = Qt.matchPrefix(e.sdp, "a=max-message-size:");
        return (
          i.length > 0
            ? (r = parseInt(i[0].substr(19), 10))
            : "firefox" === t.browser && -1 !== n && (r = 2147483637),
          r
        );
      },
      a = e.RTCPeerConnection.prototype.setRemoteDescription;
    e.RTCPeerConnection.prototype.setRemoteDescription = function () {
      if (((this._sctp = null), "chrome" === t.browser && t.version >= 76)) {
        const { sdpSemantics: e } = this.getConfiguration();
        "plan-b" === e &&
          Object.defineProperty(this, "sctp", {
            get() {
              return void 0 === this._sctp ? null : this._sctp;
            },
            enumerable: !0,
            configurable: !0,
          });
      }
      if (n(arguments[0])) {
        const e = r(arguments[0]),
          t = i(e),
          n = o(arguments[0], e);
        let a;
        a =
          0 === t && 0 === n
            ? Number.POSITIVE_INFINITY
            : 0 === t || 0 === n
            ? Math.max(t, n)
            : Math.min(t, n);
        const s = {};
        Object.defineProperty(s, "maxMessageSize", { get: () => a }),
          (this._sctp = s);
      }
      return a.apply(this, arguments);
    };
  }
  function Pn(e) {
    if (
      !(
        e.RTCPeerConnection &&
        "createDataChannel" in e.RTCPeerConnection.prototype
      )
    )
      return;
    function t(e, t) {
      const n = e.send;
      e.send = function () {
        const r = arguments[0],
          i = r.length || r.size || r.byteLength;
        if ("open" === e.readyState && t.sctp && i > t.sctp.maxMessageSize)
          throw new TypeError(
            "Message too large (can send a maximum of " +
              t.sctp.maxMessageSize +
              " bytes)"
          );
        return n.apply(e, arguments);
      };
    }
    const n = e.RTCPeerConnection.prototype.createDataChannel;
    (e.RTCPeerConnection.prototype.createDataChannel = function () {
      const e = n.apply(this, arguments);
      return t(e, this), e;
    }),
      xt(e, "datachannel", (e) => (t(e.channel, e.target), e));
  }
  function xn(e) {
    if (
      !e.RTCPeerConnection ||
      "connectionState" in e.RTCPeerConnection.prototype
    )
      return;
    const t = e.RTCPeerConnection.prototype;
    Object.defineProperty(t, "connectionState", {
      get() {
        return (
          { completed: "connected", checking: "connecting" }[
            this.iceConnectionState
          ] || this.iceConnectionState
        );
      },
      enumerable: !0,
      configurable: !0,
    }),
      Object.defineProperty(t, "onconnectionstatechange", {
        get() {
          return this._onconnectionstatechange || null;
        },
        set(e) {
          this._onconnectionstatechange &&
            (this.removeEventListener(
              "connectionstatechange",
              this._onconnectionstatechange
            ),
            delete this._onconnectionstatechange),
            e &&
              this.addEventListener(
                "connectionstatechange",
                (this._onconnectionstatechange = e)
              );
        },
        enumerable: !0,
        configurable: !0,
      }),
      ["setLocalDescription", "setRemoteDescription"].forEach((e) => {
        const n = t[e];
        t[e] = function () {
          return (
            this._connectionstatechangepoly ||
              ((this._connectionstatechangepoly = (e) => {
                const t = e.target;
                if (t._lastConnectionState !== t.connectionState) {
                  t._lastConnectionState = t.connectionState;
                  const n = new Event("connectionstatechange", e);
                  t.dispatchEvent(n);
                }
                return e;
              }),
              this.addEventListener(
                "iceconnectionstatechange",
                this._connectionstatechangepoly
              )),
            n.apply(this, arguments)
          );
        };
      });
  }
  function An(e) {
    if (!e.RTCPeerConnection) return;
    const t = Nt(e);
    if ("chrome" === t.browser && t.version >= 71) return;
    const n = e.RTCPeerConnection.prototype.setRemoteDescription;
    e.RTCPeerConnection.prototype.setRemoteDescription = function (e) {
      return (
        e &&
          e.sdp &&
          -1 !== e.sdp.indexOf("\na=extmap-allow-mixed") &&
          (e.sdp = e.sdp
            .split("\n")
            .filter((e) => "a=extmap-allow-mixed" !== e.trim())
            .join("\n")),
        n.apply(this, arguments)
      );
    };
  }
  var On = Object.freeze({
    shimRTCIceCandidate: En,
    shimMaxMessageSize: In,
    shimSendThrowTypeError: Pn,
    shimConnectionState: xn,
    removeAllowExtmapMixed: An,
  });
  const Dn = (function (
    { window: e } = {},
    t = { shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0 }
  ) {
    const n = Dt,
      r = Nt(e),
      i = {
        browserDetails: r,
        commonShim: On,
        extractVersion: Pt,
        disableLog: At,
        disableWarnings: Ot,
      };
    switch (r.browser) {
      case "chrome":
        if (!Yt || !Kt || !t.shimChrome)
          return n("Chrome shim is not included in this adapter release."), i;
        n("adapter.js shimming chrome."),
          (i.browserShim = Yt),
          Ft(e),
          Gt(e),
          Kt(e),
          Bt(e),
          qt(e),
          Ht(e),
          zt(e),
          Wt(e),
          $t(e),
          En(e),
          xn(e),
          In(e),
          Pn(e),
          An(e);
        break;
      case "firefox":
        if (!gn || !pn || !t.shimFirefox)
          return n("Firefox shim is not included in this adapter release."), i;
        n("adapter.js shimming firefox."),
          (i.browserShim = gn),
          dn(e),
          pn(e),
          ln(e),
          mn(e),
          fn(e),
          hn(e),
          vn(e),
          En(e),
          xn(e),
          In(e),
          Pn(e);
        break;
      case "edge":
        if (!un || !sn || !t.shimEdge)
          return n("MS edge shim is not included in this adapter release."), i;
        n("adapter.js shimming edge."),
          (i.browserShim = un),
          on(e),
          an(e),
          sn(e),
          cn(e),
          In(e),
          Pn(e);
        break;
      case "safari":
        if (!Cn || !t.shimSafari)
          return n("Safari shim is not included in this adapter release."), i;
        n("adapter.js shimming safari."),
          (i.browserShim = Cn),
          Rn(e),
          wn(e),
          Sn(e),
          _n(e),
          yn(e),
          Tn(e),
          bn(e),
          En(e),
          In(e),
          Pn(e),
          An(e);
        break;
      default:
        n("Unsupported browser!");
    }
    return i;
  })({ window: window });
  var Ln = function (e, t) {
      var n = [][e];
      return (
        !n ||
        !i(function () {
          n.call(
            null,
            t ||
              function () {
                throw 1;
              },
            1
          );
        })
      );
    },
    Nn = he.indexOf,
    Mn = [].indexOf,
    jn = !!Mn && 1 / [1].indexOf(1, -0) < 0,
    Vn = Ln("indexOf");
  Ae(
    { target: "Array", proto: !0, forced: jn || Vn },
    {
      indexOf: function (e) {
        return jn
          ? Mn.apply(this, arguments) || 0
          : Nn(this, e, arguments.length > 1 ? arguments[1] : void 0);
      },
    }
  );
  var Un = Fe("species"),
    Fn = [].slice,
    Gn = Math.max;
  Ae(
    { target: "Array", proto: !0, forced: !$e("slice") },
    {
      slice: function (e, t) {
        var n,
          r,
          i,
          o = m(this),
          a = ue(o.length),
          s = pe(e, a),
          c = pe(void 0 === t ? a : t, a);
        if (
          Oe(o) &&
          ("function" != typeof (n = o.constructor) ||
          (n !== Array && !Oe(n.prototype))
            ? v(n) && null === (n = n[Un]) && (n = void 0)
            : (n = void 0),
          n === Array || void 0 === n)
        )
          return Fn.call(o, s, c);
        for (
          r = new (void 0 === n ? Array : n)(Gn(c - s, 0)), i = 0;
          s < c;
          s++, i++
        )
          s in o && Le(r, i, o[s]);
        return (r.length = i), r;
      },
    }
  );
  var Bn = [].slice,
    Hn = {},
    zn = function (e, t, n) {
      if (!(t in Hn)) {
        for (var r = [], i = 0; i < t; i++) r[i] = "a[" + i + "]";
        Hn[t] = Function("C,a", "return new C(" + r.join(",") + ")");
      }
      return Hn[t](e, n);
    },
    Wn =
      Function.bind ||
      function (e) {
        var t = et(this),
          n = Bn.call(arguments, 1),
          r = function () {
            var i = n.concat(Bn.call(arguments));
            return this instanceof r ? zn(t, i.length, i) : t.apply(e, i);
          };
        return v(t.prototype) && (r.prototype = t.prototype), r;
      };
  Ae({ target: "Function", proto: !0 }, { bind: Wn });
  var Jn = I.f,
    qn = Function.prototype,
    Kn = qn.toString,
    $n = /^\s*function ([^ (]*)/;
  !o ||
    "name" in qn ||
    Jn(qn, "name", {
      configurable: !0,
      get: function () {
        try {
          return Kn.call(this).match($n)[1];
        } catch (e) {
          return "";
        }
      },
    });
  var Yn = function () {
    var e = C(this),
      t = "";
    return (
      e.global && (t += "g"),
      e.ignoreCase && (t += "i"),
      e.multiline && (t += "m"),
      e.dotAll && (t += "s"),
      e.unicode && (t += "u"),
      e.sticky && (t += "y"),
      t
    );
  };
  function Qn(e, t) {
    return RegExp(e, t);
  }
  var Xn = {
      UNSUPPORTED_Y: i(function () {
        var e = Qn("a", "y");
        return (e.lastIndex = 2), null != e.exec("abcd");
      }),
      BROKEN_CARET: i(function () {
        var e = Qn("^r", "gy");
        return (e.lastIndex = 2), null != e.exec("str");
      }),
    },
    Zn = RegExp.prototype.exec,
    er = String.prototype.replace,
    tr = Zn,
    nr = (function () {
      var e = /a/,
        t = /b*/g;
      return (
        Zn.call(e, "a"), Zn.call(t, "a"), 0 !== e.lastIndex || 0 !== t.lastIndex
      );
    })(),
    rr = Xn.UNSUPPORTED_Y || Xn.BROKEN_CARET,
    ir = void 0 !== /()??/.exec("")[1];
  (nr || ir || rr) &&
    (tr = function (e) {
      var t,
        n,
        r,
        i,
        o = this,
        a = rr && o.sticky,
        s = Yn.call(o),
        c = o.source,
        u = 0,
        d = e;
      return (
        a &&
          (-1 === (s = s.replace("y", "")).indexOf("g") && (s += "g"),
          (d = String(e).slice(o.lastIndex)),
          o.lastIndex > 0 &&
            (!o.multiline || (o.multiline && "\n" !== e[o.lastIndex - 1])) &&
            ((c = "(?: " + c + ")"), (d = " " + d), u++),
          (n = new RegExp("^(?:" + c + ")", s))),
        ir && (n = new RegExp("^" + c + "$(?!\\s)", s)),
        nr && (t = o.lastIndex),
        (r = Zn.call(a ? n : o, d)),
        a
          ? r
            ? ((r.input = r.input.slice(u)),
              (r[0] = r[0].slice(u)),
              (r.index = o.lastIndex),
              (o.lastIndex += r[0].length))
            : (o.lastIndex = 0)
          : nr && r && (o.lastIndex = o.global ? r.index + r[0].length : t),
        ir &&
          r &&
          r.length > 1 &&
          er.call(r[0], n, function () {
            for (i = 1; i < arguments.length - 2; i++)
              void 0 === arguments[i] && (r[i] = void 0);
          }),
        r
      );
    });
  var or = tr;
  Ae({ target: "RegExp", proto: !0, forced: /./.exec !== or }, { exec: or });
  var ar = (function () {
    var e = function () {},
      t = "undefined",
      n = ["trace", "debug", "info", "warn", "error"];
    function r(e, t) {
      var n = e[t];
      if ("function" == typeof n.bind) return n.bind(e);
      try {
        return Function.prototype.bind.call(n, e);
      } catch (r) {
        return function () {
          return Function.prototype.apply.apply(n, [e, arguments]);
        };
      }
    }
    function i(t, r) {
      for (var i = 0; i < n.length; i++) {
        var o = n[i];
        this[o] = i < t ? e : this.methodFactory(o, t, r);
      }
      this.log = this.debug;
    }
    function o(e, n, r) {
      return function () {
        ("undefined" == typeof console ? "undefined" : lt(console)) !== t &&
          (i.call(this, n, r), this[e].apply(this, arguments));
      };
    }
    function a(n, i, a) {
      return (
        (function (n) {
          return (
            "debug" === n && (n = "log"),
            ("undefined" == typeof console ? "undefined" : lt(console)) !== t &&
              (void 0 !== console[n]
                ? r(console, n)
                : void 0 !== console.log
                ? r(console, "log")
                : e)
          );
        })(n) || o.apply(this, arguments)
      );
    }
    function s(e, r, o) {
      var s,
        c = this,
        u = "loglevel";
      function d() {
        var e;
        if (("undefined" == typeof window ? "undefined" : lt(window)) !== t) {
          try {
            e = window.localStorage[u];
          } catch (i) {}
          if (lt(e) === t)
            try {
              var n = window.document.cookie,
                r = n.indexOf(encodeURIComponent(u) + "=");
              -1 !== r && (e = /^([^;]+)/.exec(n.slice(r))[1]);
            } catch (i) {}
          return void 0 === c.levels[e] && (e = void 0), e;
        }
      }
      e && (u += ":" + e),
        (c.name = e),
        (c.levels = {
          TRACE: 0,
          DEBUG: 1,
          INFO: 2,
          WARN: 3,
          ERROR: 4,
          SILENT: 5,
        }),
        (c.methodFactory = o || a),
        (c.getLevel = function () {
          return s;
        }),
        (c.setLevel = function (r, o) {
          if (
            ("string" == typeof r &&
              void 0 !== c.levels[r.toUpperCase()] &&
              (r = c.levels[r.toUpperCase()]),
            !("number" == typeof r && r >= 0 && r <= c.levels.SILENT))
          )
            throw "log.setLevel() called with invalid level: " + r;
          if (
            ((s = r),
            !1 !== o &&
              (function (e) {
                var r = (n[e] || "silent").toUpperCase();
                if (
                  ("undefined" == typeof window ? "undefined" : lt(window)) !==
                  t
                ) {
                  try {
                    return void (window.localStorage[u] = r);
                  } catch (i) {}
                  try {
                    window.document.cookie =
                      encodeURIComponent(u) + "=" + r + ";";
                  } catch (i) {}
                }
              })(r),
            i.call(c, r, e),
            ("undefined" == typeof console ? "undefined" : lt(console)) === t &&
              r < c.levels.SILENT)
          )
            return "No console available for logging";
        }),
        (c.setDefaultLevel = function (e) {
          d() || c.setLevel(e, !1);
        }),
        (c.enableAll = function (e) {
          c.setLevel(c.levels.TRACE, e);
        }),
        (c.disableAll = function (e) {
          c.setLevel(c.levels.SILENT, e);
        });
      var l = d();
      null == l && (l = null == r ? "WARN" : r), c.setLevel(l, !1);
    }
    var c = new s(),
      u = {};
    c.getLogger = function (e) {
      if ("string" != typeof e || "" === e)
        throw new TypeError("You must supply a name when creating a logger.");
      var t = u[e];
      return t || (t = u[e] = new s(e, c.getLevel(), c.methodFactory)), t;
    };
    var d =
      ("undefined" == typeof window ? "undefined" : lt(window)) !== t
        ? window.log
        : void 0;
    return (
      (c.noConflict = function () {
        return (
          ("undefined" == typeof window ? "undefined" : lt(window)) !== t &&
            window.log === c &&
            (window.log = d),
          c
        );
      }),
      (c.getLoggers = function () {
        return u;
      }),
      c
    );
  })();
  Ae({ target: "Array", stat: !0 }, { isArray: Oe });
  var sr = [].join,
    cr = f != Object,
    ur = Ln("join", ",");
  Ae(
    { target: "Array", proto: !0, forced: cr || ur },
    {
      join: function (e) {
        return sr.call(m(this), void 0 === e ? "," : e);
      },
    }
  );
  var dr = it.some;
  Ae(
    { target: "Array", proto: !0, forced: Ln("some") },
    {
      some: function (e) {
        return dr(this, e, arguments.length > 1 ? arguments[1] : void 0);
      },
    }
  );
  var lr = Math.max,
    pr = Math.min;
  Ae(
    { target: "Array", proto: !0, forced: !$e("splice") },
    {
      splice: function (e, t) {
        var n,
          r,
          i,
          o,
          a,
          s,
          c = De(this),
          u = ue(c.length),
          d = pe(e, u),
          l = arguments.length;
        if (
          (0 === l
            ? (n = r = 0)
            : 1 === l
            ? ((n = 0), (r = u - d))
            : ((n = l - 2), (r = pr(lr(se(t), 0), u - d))),
          u + n - r > 9007199254740991)
        )
          throw TypeError("Maximum allowed length exceeded");
        for (i = Be(c, r), o = 0; o < r; o++)
          (a = d + o) in c && Le(i, o, c[a]);
        if (((i.length = r), n < r)) {
          for (o = d; o < u - r; o++)
            (s = o + n), (a = o + r) in c ? (c[s] = c[a]) : delete c[s];
          for (o = u; o > u - r + n; o--) delete c[o - 1];
        } else if (n > r)
          for (o = u - r; o > d; o--)
            (s = o + n - 1), (a = o + r - 1) in c ? (c[s] = c[a]) : delete c[s];
        for (o = 0; o < n; o++) c[o + d] = arguments[o + 2];
        return (c.length = u - r + n), i;
      },
    }
  );
  var fr =
      "".repeat ||
      function (e) {
        var t = String(h(this)),
          n = "",
          r = se(e);
        if (r < 0 || Infinity == r)
          throw RangeError("Wrong number of repetitions");
        for (; r > 0; (r >>>= 1) && (t += t)) 1 & r && (n += t);
        return n;
      },
    hr = Math.ceil,
    mr = function (e) {
      return function (t, n, r) {
        var i,
          o,
          a = String(h(t)),
          s = a.length,
          c = void 0 === r ? " " : String(r),
          u = ue(n);
        return u <= s || "" == c
          ? a
          : ((i = u - s),
            (o = fr.call(c, hr(i / c.length))).length > i &&
              (o = o.slice(0, i)),
            e ? a + o : o + a);
      };
    },
    vr = { start: mr(!1), end: mr(!0) }.start,
    gr = Math.abs,
    _r = Date.prototype,
    yr = _r.getTime,
    Sr = _r.toISOString,
    br =
      i(function () {
        return "0385-07-25T07:06:39.999Z" != Sr.call(new Date(-5e13 - 1));
      }) ||
      !i(function () {
        Sr.call(new Date(NaN));
      })
        ? function () {
            if (!isFinite(yr.call(this)))
              throw RangeError("Invalid time value");
            var e = this.getUTCFullYear(),
              t = this.getUTCMilliseconds(),
              n = e < 0 ? "-" : e > 9999 ? "+" : "";
            return (
              n +
              vr(gr(e), n ? 6 : 4, 0) +
              "-" +
              vr(this.getUTCMonth() + 1, 2, 0) +
              "-" +
              vr(this.getUTCDate(), 2, 0) +
              "T" +
              vr(this.getUTCHours(), 2, 0) +
              ":" +
              vr(this.getUTCMinutes(), 2, 0) +
              ":" +
              vr(this.getUTCSeconds(), 2, 0) +
              "." +
              vr(t, 3, 0) +
              "Z"
            );
          }
        : Sr;
  Ae(
    { target: "Date", proto: !0, forced: Date.prototype.toISOString !== br },
    { toISOString: br }
  );
  var kr = Date.prototype,
    Rr = kr.toString,
    Tr = kr.getTime;
  new Date(NaN) + "" != "Invalid Date" &&
    te(kr, "toString", function () {
      var e = Tr.call(this);
      return e == e ? Rr.call(this) : "Invalid Date";
    });
  var wr = w.f,
    Cr = i(function () {
      wr(1);
    });
  Ae(
    { target: "Object", stat: !0, forced: !o || Cr, sham: !o },
    {
      getOwnPropertyDescriptor: function (e, t) {
        return wr(m(e), t);
      },
    }
  );
  var Er = !i(function () {
      function e() {}
      return (
        (e.prototype.constructor = null),
        Object.getPrototypeOf(new e()) !== e.prototype
      );
    }),
    Ir = z("IE_PROTO"),
    Pr = Object.prototype,
    xr = Er
      ? Object.getPrototypeOf
      : function (e) {
          return (
            (e = De(e)),
            y(e, Ir)
              ? e[Ir]
              : "function" == typeof e.constructor && e instanceof e.constructor
              ? e.constructor.prototype
              : e instanceof Object
              ? Pr
              : null
          );
        },
    Ar = i(function () {
      xr(1);
    });
  Ae(
    { target: "Object", stat: !0, forced: Ar, sham: !Er },
    {
      getPrototypeOf: function (e) {
        return xr(De(e));
      },
    }
  );
  var Or = {};
  Or[Fe("toStringTag")] = "z";
  var Dr = "[object z]" === String(Or),
    Lr = Fe("toStringTag"),
    Nr =
      "Arguments" ==
      l(
        (function () {
          return arguments;
        })()
      ),
    Mr = Dr
      ? l
      : function (e) {
          var t, n, r;
          return void 0 === e
            ? "Undefined"
            : null === e
            ? "Null"
            : "string" ==
              typeof (n = (function (e, t) {
                try {
                  return e[t];
                } catch (n) {}
              })((t = Object(e)), Lr))
            ? n
            : Nr
            ? l(t)
            : "Object" == (r = l(t)) && "function" == typeof t.callee
            ? "Arguments"
            : r;
        },
    jr = Dr
      ? {}.toString
      : function () {
          return "[object " + Mr(this) + "]";
        };
  Dr || te(Object.prototype, "toString", jr, { unsafe: !0 });
  var Vr = RegExp.prototype,
    Ur = Vr.toString,
    Fr = i(function () {
      return "/a/b" != Ur.call({ source: "a", flags: "b" });
    }),
    Gr = "toString" != Ur.name;
  (Fr || Gr) &&
    te(
      RegExp.prototype,
      "toString",
      function () {
        var e = C(this),
          t = String(e.source),
          n = e.flags;
        return (
          "/" +
          t +
          "/" +
          String(
            void 0 === n && e instanceof RegExp && !("flags" in Vr)
              ? Yn.call(e)
              : n
          )
        );
      },
      { unsafe: !0 }
    );
  var Br = Fe("species"),
    Hr = !i(function () {
      var e = /./;
      return (
        (e.exec = function () {
          var e = [];
          return (e.groups = { a: "7" }), e;
        }),
        "7" !== "".replace(e, "$<a>")
      );
    }),
    zr = "$0" === "a".replace(/./, "$0"),
    Wr = !i(function () {
      var e = /(?:)/,
        t = e.exec;
      e.exec = function () {
        return t.apply(this, arguments);
      };
      var n = "ab".split(e);
      return 2 !== n.length || "a" !== n[0] || "b" !== n[1];
    }),
    Jr = function (e, t, n, r) {
      var o = Fe(e),
        a = !i(function () {
          var t = {};
          return (
            (t[o] = function () {
              return 7;
            }),
            7 != ""[e](t)
          );
        }),
        s =
          a &&
          !i(function () {
            var t = !1,
              n = /a/;
            return (
              "split" === e &&
                (((n = {}).constructor = {}),
                (n.constructor[Br] = function () {
                  return n;
                }),
                (n.flags = ""),
                (n[o] = /./[o])),
              (n.exec = function () {
                return (t = !0), null;
              }),
              n[o](""),
              !t
            );
          });
      if (
        !a ||
        !s ||
        ("replace" === e && (!Hr || !zr)) ||
        ("split" === e && !Wr)
      ) {
        var c = /./[o],
          u = n(
            o,
            ""[e],
            function (e, t, n, r, i) {
              return t.exec === or
                ? a && !i
                  ? { done: !0, value: c.call(t, n, r) }
                  : { done: !0, value: e.call(n, t, r) }
                : { done: !1 };
            },
            { REPLACE_KEEPS_$0: zr }
          ),
          d = u[0],
          l = u[1];
        te(String.prototype, e, d),
          te(
            RegExp.prototype,
            o,
            2 == t
              ? function (e, t) {
                  return l.call(e, this, t);
                }
              : function (e) {
                  return l.call(e, this);
                }
          );
      }
      r && P(RegExp.prototype[o], "sham", !0);
    },
    qr = function (e) {
      return function (t, n) {
        var r,
          i,
          o = String(h(t)),
          a = se(n),
          s = o.length;
        return a < 0 || a >= s
          ? e
            ? ""
            : void 0
          : (r = o.charCodeAt(a)) < 55296 ||
            r > 56319 ||
            a + 1 === s ||
            (i = o.charCodeAt(a + 1)) < 56320 ||
            i > 57343
          ? e
            ? o.charAt(a)
            : r
          : e
          ? o.slice(a, a + 2)
          : i - 56320 + ((r - 55296) << 10) + 65536;
      };
    },
    Kr = { codeAt: qr(!1), charAt: qr(!0) },
    $r = Kr.charAt,
    Yr = function (e, t, n) {
      return t + (n ? $r(e, t).length : 1);
    },
    Qr = function (e, t) {
      var n = e.exec;
      if ("function" == typeof n) {
        var r = n.call(e, t);
        if ("object" != typeof r)
          throw TypeError(
            "RegExp exec method returned something other than an Object or null"
          );
        return r;
      }
      if ("RegExp" !== l(e))
        throw TypeError("RegExp#exec called on incompatible receiver");
      return or.call(e, t);
    },
    Xr = Math.max,
    Zr = Math.min,
    ei = Math.floor,
    ti = /\$([$&'`]|\d\d?|<[^>]*>)/g,
    ni = /\$([$&'`]|\d\d?)/g;
  Jr("replace", 2, function (e, t, n, r) {
    return [
      function (n, r) {
        var i = h(this),
          o = null == n ? void 0 : n[e];
        return void 0 !== o ? o.call(n, i, r) : t.call(String(i), n, r);
      },
      function (e, o) {
        if (
          r.REPLACE_KEEPS_$0 ||
          ("string" == typeof o && -1 === o.indexOf("$0"))
        ) {
          var a = n(t, e, this, o);
          if (a.done) return a.value;
        }
        var s = C(e),
          c = String(this),
          u = "function" == typeof o;
        u || (o = String(o));
        var d = s.global;
        if (d) {
          var l = s.unicode;
          s.lastIndex = 0;
        }
        for (var p = []; ; ) {
          var f = Qr(s, c);
          if (null === f) break;
          if ((p.push(f), !d)) break;
          "" === String(f[0]) && (s.lastIndex = Yr(c, ue(s.lastIndex), l));
        }
        for (var h, m = "", v = 0, g = 0; g < p.length; g++) {
          f = p[g];
          for (
            var _ = String(f[0]),
              y = Xr(Zr(se(f.index), c.length), 0),
              S = [],
              b = 1;
            b < f.length;
            b++
          )
            S.push(void 0 === (h = f[b]) ? h : String(h));
          var k = f.groups;
          if (u) {
            var R = [_].concat(S, y, c);
            void 0 !== k && R.push(k);
            var T = String(o.apply(void 0, R));
          } else T = i(_, c, y, S, k, o);
          y >= v && ((m += c.slice(v, y) + T), (v = y + _.length));
        }
        return m + c.slice(v);
      },
    ];
    function i(e, n, r, i, o, a) {
      var s = r + e.length,
        c = i.length,
        u = ni;
      return (
        void 0 !== o && ((o = De(o)), (u = ti)),
        t.call(a, u, function (t, a) {
          var u;
          switch (a.charAt(0)) {
            case "$":
              return "$";
            case "&":
              return e;
            case "`":
              return n.slice(0, r);
            case "'":
              return n.slice(s);
            case "<":
              u = o[a.slice(1, -1)];
              break;
            default:
              var d = +a;
              if (0 === d) return t;
              if (d > c) {
                var l = ei(d / 10);
                return 0 === l
                  ? t
                  : l <= c
                  ? void 0 === i[l - 1]
                    ? a.charAt(1)
                    : i[l - 1] + a.charAt(1)
                  : t;
              }
              u = i[d - 1];
          }
          return void 0 === u ? "" : u;
        })
      );
    }
  });
  var ri = Fe("match"),
    ii = function (e) {
      var t;
      return v(e) && (void 0 !== (t = e[ri]) ? !!t : "RegExp" == l(e));
    },
    oi = Fe("species"),
    ai = function (e, t) {
      var n,
        r = C(e).constructor;
      return void 0 === r || null == (n = C(r)[oi]) ? t : et(n);
    },
    si = [].push,
    ci = Math.min,
    ui = !i(function () {
      return !RegExp(4294967295, "y");
    });
  Jr(
    "split",
    2,
    function (e, t, n) {
      var r;
      return (
        (r =
          "c" == "abbc".split(/(b)*/)[1] ||
          4 != "test".split(/(?:)/, -1).length ||
          2 != "ab".split(/(?:ab)*/).length ||
          4 != ".".split(/(.?)(.?)/).length ||
          ".".split(/()()/).length > 1 ||
          "".split(/.?/).length
            ? function (e, n) {
                var r = String(h(this)),
                  i = void 0 === n ? 4294967295 : n >>> 0;
                if (0 === i) return [];
                if (void 0 === e) return [r];
                if (!ii(e)) return t.call(r, e, i);
                for (
                  var o,
                    a,
                    s,
                    c = [],
                    u =
                      (e.ignoreCase ? "i" : "") +
                      (e.multiline ? "m" : "") +
                      (e.unicode ? "u" : "") +
                      (e.sticky ? "y" : ""),
                    d = 0,
                    l = new RegExp(e.source, u + "g");
                  (o = or.call(l, r)) &&
                  !(
                    (a = l.lastIndex) > d &&
                    (c.push(r.slice(d, o.index)),
                    o.length > 1 &&
                      o.index < r.length &&
                      si.apply(c, o.slice(1)),
                    (s = o[0].length),
                    (d = a),
                    c.length >= i)
                  );

                )
                  l.lastIndex === o.index && l.lastIndex++;
                return (
                  d === r.length
                    ? (!s && l.test("")) || c.push("")
                    : c.push(r.slice(d)),
                  c.length > i ? c.slice(0, i) : c
                );
              }
            : "0".split(void 0, 0).length
            ? function (e, n) {
                return void 0 === e && 0 === n ? [] : t.call(this, e, n);
              }
            : t),
        [
          function (t, n) {
            var i = h(this),
              o = null == t ? void 0 : t[e];
            return void 0 !== o ? o.call(t, i, n) : r.call(String(i), t, n);
          },
          function (e, i) {
            var o = n(r, e, this, i, r !== t);
            if (o.done) return o.value;
            var a = C(e),
              s = String(this),
              c = ai(a, RegExp),
              u = a.unicode,
              d =
                (a.ignoreCase ? "i" : "") +
                (a.multiline ? "m" : "") +
                (a.unicode ? "u" : "") +
                (ui ? "y" : "g"),
              l = new c(ui ? a : "^(?:" + a.source + ")", d),
              p = void 0 === i ? 4294967295 : i >>> 0;
            if (0 === p) return [];
            if (0 === s.length) return null === Qr(l, s) ? [s] : [];
            for (var f = 0, h = 0, m = []; h < s.length; ) {
              l.lastIndex = ui ? h : 0;
              var v,
                g = Qr(l, ui ? s : s.slice(h));
              if (
                null === g ||
                (v = ci(ue(l.lastIndex + (ui ? 0 : h)), s.length)) === f
              )
                h = Yr(s, h, u);
              else {
                if ((m.push(s.slice(f, h)), m.length === p)) return m;
                for (var _ = 1; _ <= g.length - 1; _++)
                  if ((m.push(g[_]), m.length === p)) return m;
                h = f = v;
              }
            }
            return m.push(s.slice(f)), m;
          },
        ]
      );
    },
    !ui
  );
  var di = [].slice,
    li = /MSIE .\./.test(He),
    pi = function (e) {
      return function (t, n) {
        var r = arguments.length > 2,
          i = r ? di.call(arguments, 2) : void 0;
        return e(
          r
            ? function () {
                ("function" == typeof t ? t : Function(t)).apply(this, i);
              }
            : t,
          n
        );
      };
    };
  Ae(
    { global: !0, bind: !0, forced: li },
    { setTimeout: pi(r.setTimeout), setInterval: pi(r.setInterval) }
  );
  var fi = function (e, t) {
      return function () {
        for (var n = new Array(arguments.length), r = 0; r < n.length; r++)
          n[r] = arguments[r];
        return e.apply(t, n);
      };
    },
    hi = Object.prototype.toString;
  function mi(e) {
    return "[object Array]" === hi.call(e);
  }
  function vi(e) {
    return null !== e && "object" == typeof e;
  }
  function gi(e) {
    return "[object Function]" === hi.call(e);
  }
  function _i(e, t) {
    if (null != e)
      if (("object" != typeof e && (e = [e]), mi(e)))
        for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
      else
        for (var i in e)
          Object.prototype.hasOwnProperty.call(e, i) &&
            t.call(null, e[i], i, e);
  }
  var yi = {
    isArray: mi,
    isArrayBuffer: function (e) {
      return "[object ArrayBuffer]" === hi.call(e);
    },
    isBuffer: function (e) {
      return (
        null != e &&
        null != e.constructor &&
        "function" == typeof e.constructor.isBuffer &&
        e.constructor.isBuffer(e)
      );
    },
    isFormData: function (e) {
      return "undefined" != typeof FormData && e instanceof FormData;
    },
    isArrayBufferView: function (e) {
      return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
        ? ArrayBuffer.isView(e)
        : e && e.buffer && e.buffer instanceof ArrayBuffer;
    },
    isString: function (e) {
      return "string" == typeof e;
    },
    isNumber: function (e) {
      return "number" == typeof e;
    },
    isObject: vi,
    isUndefined: function (e) {
      return void 0 === e;
    },
    isDate: function (e) {
      return "[object Date]" === hi.call(e);
    },
    isFile: function (e) {
      return "[object File]" === hi.call(e);
    },
    isBlob: function (e) {
      return "[object Blob]" === hi.call(e);
    },
    isFunction: gi,
    isStream: function (e) {
      return vi(e) && gi(e.pipe);
    },
    isURLSearchParams: function (e) {
      return (
        "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
      );
    },
    isStandardBrowserEnv: function () {
      return (
        ("undefined" == typeof navigator ||
          ("ReactNative" !== navigator.product &&
            "NativeScript" !== navigator.product &&
            "NS" !== navigator.product)) &&
        "undefined" != typeof window &&
        "undefined" != typeof document
      );
    },
    forEach: _i,
    merge: function e() {
      var t = {};
      function n(n, r) {
        "object" == typeof t[r] && "object" == typeof n
          ? (t[r] = e(t[r], n))
          : (t[r] = n);
      }
      for (var r = 0, i = arguments.length; r < i; r++) _i(arguments[r], n);
      return t;
    },
    deepMerge: function e() {
      var t = {};
      function n(n, r) {
        "object" == typeof t[r] && "object" == typeof n
          ? (t[r] = e(t[r], n))
          : (t[r] = "object" == typeof n ? e({}, n) : n);
      }
      for (var r = 0, i = arguments.length; r < i; r++) _i(arguments[r], n);
      return t;
    },
    extend: function (e, t, n) {
      return (
        _i(t, function (t, r) {
          e[r] = n && "function" == typeof t ? fi(t, n) : t;
        }),
        e
      );
    },
    trim: function (e) {
      return e.replace(/^\s*/, "").replace(/\s*$/, "");
    },
  };
  function Si(e) {
    return encodeURIComponent(e)
      .replace(/%40/gi, "@")
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+")
      .replace(/%5B/gi, "[")
      .replace(/%5D/gi, "]");
  }
  var bi = function (e, t, n) {
    if (!t) return e;
    var r;
    if (n) r = n(t);
    else if (yi.isURLSearchParams(t)) r = t.toString();
    else {
      var i = [];
      yi.forEach(t, function (e, t) {
        null != e &&
          (yi.isArray(e) ? (t += "[]") : (e = [e]),
          yi.forEach(e, function (e) {
            yi.isDate(e)
              ? (e = e.toISOString())
              : yi.isObject(e) && (e = JSON.stringify(e)),
              i.push(Si(t) + "=" + Si(e));
          }));
      }),
        (r = i.join("&"));
    }
    if (r) {
      var o = e.indexOf("#");
      -1 !== o && (e = e.slice(0, o)),
        (e += (-1 === e.indexOf("?") ? "?" : "&") + r);
    }
    return e;
  };
  function ki() {
    this.handlers = [];
  }
  (ki.prototype.use = function (e, t) {
    return (
      this.handlers.push({ fulfilled: e, rejected: t }),
      this.handlers.length - 1
    );
  }),
    (ki.prototype.eject = function (e) {
      this.handlers[e] && (this.handlers[e] = null);
    }),
    (ki.prototype.forEach = function (e) {
      yi.forEach(this.handlers, function (t) {
        null !== t && e(t);
      });
    });
  var Ri = ki,
    Ti = function (e, t, n) {
      return (
        yi.forEach(n, function (n) {
          e = n(e, t);
        }),
        e
      );
    },
    wi = function (e) {
      return !(!e || !e.__CANCEL__);
    },
    Ci =
      "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : "undefined" != typeof window
        ? window
        : {};
  function Ei() {
    throw new Error("setTimeout has not been defined");
  }
  function Ii() {
    throw new Error("clearTimeout has not been defined");
  }
  var Pi = Ei,
    xi = Ii;
  function Ai(e) {
    if (Pi === setTimeout) return setTimeout(e, 0);
    if ((Pi === Ei || !Pi) && setTimeout)
      return (Pi = setTimeout), setTimeout(e, 0);
    try {
      return Pi(e, 0);
    } catch (t) {
      try {
        return Pi.call(null, e, 0);
      } catch (t) {
        return Pi.call(this, e, 0);
      }
    }
  }
  "function" == typeof Ci.setTimeout && (Pi = setTimeout),
    "function" == typeof Ci.clearTimeout && (xi = clearTimeout);
  var Oi,
    Di = [],
    Li = !1,
    Ni = -1;
  function Mi() {
    Li &&
      Oi &&
      ((Li = !1),
      Oi.length ? (Di = Oi.concat(Di)) : (Ni = -1),
      Di.length && ji());
  }
  function ji() {
    if (!Li) {
      var e = Ai(Mi);
      Li = !0;
      for (var t = Di.length; t; ) {
        for (Oi = Di, Di = []; ++Ni < t; ) Oi && Oi[Ni].run();
        (Ni = -1), (t = Di.length);
      }
      (Oi = null),
        (Li = !1),
        (function (e) {
          if (xi === clearTimeout) return clearTimeout(e);
          if ((xi === Ii || !xi) && clearTimeout)
            return (xi = clearTimeout), clearTimeout(e);
          try {
            xi(e);
          } catch (t) {
            try {
              return xi.call(null, e);
            } catch (t) {
              return xi.call(this, e);
            }
          }
        })(e);
    }
  }
  function Vi(e, t) {
    (this.fun = e), (this.array = t);
  }
  Vi.prototype.run = function () {
    this.fun.apply(null, this.array);
  };
  function Ui() {}
  var Fi = Ui,
    Gi = Ui,
    Bi = Ui,
    Hi = Ui,
    zi = Ui,
    Wi = Ui,
    Ji = Ui;
  var qi = Ci.performance || {},
    Ki =
      qi.now ||
      qi.mozNow ||
      qi.msNow ||
      qi.oNow ||
      qi.webkitNow ||
      function () {
        return new Date().getTime();
      };
  var $i = new Date();
  var Yi = {
      nextTick: function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        Di.push(new Vi(e, t)), 1 !== Di.length || Li || Ai(ji);
      },
      title: "browser",
      browser: !0,
      env: {},
      argv: [],
      version: "",
      versions: {},
      on: Fi,
      addListener: Gi,
      once: Bi,
      off: Hi,
      removeListener: zi,
      removeAllListeners: Wi,
      emit: Ji,
      binding: function (e) {
        throw new Error("process.binding is not supported");
      },
      cwd: function () {
        return "/";
      },
      chdir: function (e) {
        throw new Error("process.chdir is not supported");
      },
      umask: function () {
        return 0;
      },
      hrtime: function (e) {
        var t = 0.001 * Ki.call(qi),
          n = Math.floor(t),
          r = Math.floor((t % 1) * 1e9);
        return e && ((n -= e[0]), (r -= e[1]) < 0 && (n--, (r += 1e9))), [n, r];
      },
      platform: "browser",
      release: {},
      config: {},
      uptime: function () {
        return (new Date() - $i) / 1e3;
      },
    },
    Qi = function (e, t) {
      yi.forEach(e, function (n, r) {
        r !== t &&
          r.toUpperCase() === t.toUpperCase() &&
          ((e[t] = n), delete e[r]);
      });
    },
    Xi = function (e, t, n, r, i) {
      return (function (e, t, n, r, i) {
        return (
          (e.config = t),
          n && (e.code = n),
          (e.request = r),
          (e.response = i),
          (e.isAxiosError = !0),
          (e.toJSON = function () {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: this.config,
              code: this.code,
            };
          }),
          e
        );
      })(new Error(e), t, n, r, i);
    },
    Zi = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent",
    ],
    eo = yi.isStandardBrowserEnv()
      ? (function () {
          var e,
            t = /(msie|trident)/i.test(navigator.userAgent),
            n = document.createElement("a");
          function r(e) {
            var r = e;
            return (
              t && (n.setAttribute("href", r), (r = n.href)),
              n.setAttribute("href", r),
              {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, "") : "",
                hash: n.hash ? n.hash.replace(/^#/, "") : "",
                hostname: n.hostname,
                port: n.port,
                pathname:
                  "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname,
              }
            );
          }
          return (
            (e = r(window.location.href)),
            function (t) {
              var n = yi.isString(t) ? r(t) : t;
              return n.protocol === e.protocol && n.host === e.host;
            }
          );
        })()
      : function () {
          return !0;
        },
    to = yi.isStandardBrowserEnv()
      ? {
          write: function (e, t, n, r, i, o) {
            var a = [];
            a.push(e + "=" + encodeURIComponent(t)),
              yi.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()),
              yi.isString(r) && a.push("path=" + r),
              yi.isString(i) && a.push("domain=" + i),
              !0 === o && a.push("secure"),
              (document.cookie = a.join("; "));
          },
          read: function (e) {
            var t = document.cookie.match(
              new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
            );
            return t ? decodeURIComponent(t[3]) : null;
          },
          remove: function (e) {
            this.write(e, "", Date.now() - 864e5);
          },
        }
      : {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        },
    no = function (e) {
      return new Promise(function (t, n) {
        var r = e.data,
          i = e.headers;
        yi.isFormData(r) && delete i["Content-Type"];
        var o = new XMLHttpRequest();
        if (e.auth) {
          var a = e.auth.username || "",
            s = e.auth.password || "";
          i.Authorization = "Basic " + btoa(a + ":" + s);
        }
        if (
          (o.open(
            e.method.toUpperCase(),
            bi(e.url, e.params, e.paramsSerializer),
            !0
          ),
          (o.timeout = e.timeout),
          (o.onreadystatechange = function () {
            if (
              o &&
              4 === o.readyState &&
              (0 !== o.status ||
                (o.responseURL && 0 === o.responseURL.indexOf("file:")))
            ) {
              var r =
                  "getAllResponseHeaders" in o
                    ? (function (e) {
                        var t,
                          n,
                          r,
                          i = {};
                        return e
                          ? (yi.forEach(e.split("\n"), function (e) {
                              if (
                                ((r = e.indexOf(":")),
                                (t = yi.trim(e.substr(0, r)).toLowerCase()),
                                (n = yi.trim(e.substr(r + 1))),
                                t)
                              ) {
                                if (i[t] && Zi.indexOf(t) >= 0) return;
                                i[t] =
                                  "set-cookie" === t
                                    ? (i[t] ? i[t] : []).concat([n])
                                    : i[t]
                                    ? i[t] + ", " + n
                                    : n;
                              }
                            }),
                            i)
                          : i;
                      })(o.getAllResponseHeaders())
                    : null,
                i = {
                  data:
                    e.responseType && "text" !== e.responseType
                      ? o.response
                      : o.responseText,
                  status: o.status,
                  statusText: o.statusText,
                  headers: r,
                  config: e,
                  request: o,
                };
              !(function (e, t, n) {
                var r = n.config.validateStatus;
                !r || r(n.status)
                  ? e(n)
                  : t(
                      Xi(
                        "Request failed with status code " + n.status,
                        n.config,
                        null,
                        n.request,
                        n
                      )
                    );
              })(t, n, i),
                (o = null);
            }
          }),
          (o.onabort = function () {
            o && (n(Xi("Request aborted", e, "ECONNABORTED", o)), (o = null));
          }),
          (o.onerror = function () {
            n(Xi("Network Error", e, null, o)), (o = null);
          }),
          (o.ontimeout = function () {
            n(
              Xi(
                "timeout of " + e.timeout + "ms exceeded",
                e,
                "ECONNABORTED",
                o
              )
            ),
              (o = null);
          }),
          yi.isStandardBrowserEnv())
        ) {
          var c = to,
            u =
              (e.withCredentials || eo(e.url)) && e.xsrfCookieName
                ? c.read(e.xsrfCookieName)
                : void 0;
          u && (i[e.xsrfHeaderName] = u);
        }
        if (
          ("setRequestHeader" in o &&
            yi.forEach(i, function (e, t) {
              void 0 === r && "content-type" === t.toLowerCase()
                ? delete i[t]
                : o.setRequestHeader(t, e);
            }),
          e.withCredentials && (o.withCredentials = !0),
          e.responseType)
        )
          try {
            o.responseType = e.responseType;
          } catch (d) {
            if ("json" !== e.responseType) throw d;
          }
        "function" == typeof e.onDownloadProgress &&
          o.addEventListener("progress", e.onDownloadProgress),
          "function" == typeof e.onUploadProgress &&
            o.upload &&
            o.upload.addEventListener("progress", e.onUploadProgress),
          e.cancelToken &&
            e.cancelToken.promise.then(function (e) {
              o && (o.abort(), n(e), (o = null));
            }),
          void 0 === r && (r = null),
          o.send(r);
      });
    },
    ro = { "Content-Type": "application/x-www-form-urlencoded" };
  function io(e, t) {
    !yi.isUndefined(e) &&
      yi.isUndefined(e["Content-Type"]) &&
      (e["Content-Type"] = t);
  }
  var oo = {
    adapter: (function () {
      var e;
      return (
        void 0 !== Yi &&
        "[object process]" === Object.prototype.toString.call(Yi)
          ? (e = no)
          : "undefined" != typeof XMLHttpRequest && (e = no),
        e
      );
    })(),
    transformRequest: [
      function (e, t) {
        return (
          Qi(t, "Accept"),
          Qi(t, "Content-Type"),
          yi.isFormData(e) ||
          yi.isArrayBuffer(e) ||
          yi.isBuffer(e) ||
          yi.isStream(e) ||
          yi.isFile(e) ||
          yi.isBlob(e)
            ? e
            : yi.isArrayBufferView(e)
            ? e.buffer
            : yi.isURLSearchParams(e)
            ? (io(t, "application/x-www-form-urlencoded;charset=utf-8"),
              e.toString())
            : yi.isObject(e)
            ? (io(t, "application/json;charset=utf-8"), JSON.stringify(e))
            : e
        );
      },
    ],
    transformResponse: [
      function (e) {
        if ("string" == typeof e)
          try {
            e = JSON.parse(e);
          } catch (t) {}
        return e;
      },
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    validateStatus: function (e) {
      return e >= 200 && e < 300;
    },
    headers: { common: { Accept: "application/json, text/plain, */*" } },
  };
  yi.forEach(["delete", "get", "head"], function (e) {
    oo.headers[e] = {};
  }),
    yi.forEach(["post", "put", "patch"], function (e) {
      oo.headers[e] = yi.merge(ro);
    });
  var ao = oo;
  function so(e) {
    e.cancelToken && e.cancelToken.throwIfRequested();
  }
  var co = function (e) {
      var t, n;
      return (
        so(e),
        e.baseURL &&
          !(function (e) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
          })(e.url) &&
          (e.url =
            ((t = e.baseURL),
            (n = e.url)
              ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "")
              : t)),
        (e.headers = e.headers || {}),
        (e.data = Ti(e.data, e.headers, e.transformRequest)),
        (e.headers = yi.merge(
          e.headers.common || {},
          e.headers[e.method] || {},
          e.headers || {}
        )),
        yi.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          function (t) {
            delete e.headers[t];
          }
        ),
        (e.adapter || ao.adapter)(e).then(
          function (t) {
            return (
              so(e), (t.data = Ti(t.data, t.headers, e.transformResponse)), t
            );
          },
          function (t) {
            return (
              wi(t) ||
                (so(e),
                t &&
                  t.response &&
                  (t.response.data = Ti(
                    t.response.data,
                    t.response.headers,
                    e.transformResponse
                  ))),
              Promise.reject(t)
            );
          }
        )
      );
    },
    uo = function (e, t) {
      t = t || {};
      var n = {};
      return (
        yi.forEach(["url", "method", "params", "data"], function (e) {
          void 0 !== t[e] && (n[e] = t[e]);
        }),
        yi.forEach(["headers", "auth", "proxy"], function (r) {
          yi.isObject(t[r])
            ? (n[r] = yi.deepMerge(e[r], t[r]))
            : void 0 !== t[r]
            ? (n[r] = t[r])
            : yi.isObject(e[r])
            ? (n[r] = yi.deepMerge(e[r]))
            : void 0 !== e[r] && (n[r] = e[r]);
        }),
        yi.forEach(
          [
            "baseURL",
            "transformRequest",
            "transformResponse",
            "paramsSerializer",
            "timeout",
            "withCredentials",
            "adapter",
            "responseType",
            "xsrfCookieName",
            "xsrfHeaderName",
            "onUploadProgress",
            "onDownloadProgress",
            "maxContentLength",
            "validateStatus",
            "maxRedirects",
            "httpAgent",
            "httpsAgent",
            "cancelToken",
            "socketPath",
          ],
          function (r) {
            void 0 !== t[r] ? (n[r] = t[r]) : void 0 !== e[r] && (n[r] = e[r]);
          }
        ),
        n
      );
    };
  function lo(e) {
    (this.defaults = e),
      (this.interceptors = { request: new Ri(), response: new Ri() });
  }
  (lo.prototype.request = function (e) {
    "string" == typeof e
      ? ((e = arguments[1] || {}).url = arguments[0])
      : (e = e || {}),
      ((e = uo(this.defaults, e)).method = e.method
        ? e.method.toLowerCase()
        : "get");
    var t = [co, void 0],
      n = Promise.resolve(e);
    for (
      this.interceptors.request.forEach(function (e) {
        t.unshift(e.fulfilled, e.rejected);
      }),
        this.interceptors.response.forEach(function (e) {
          t.push(e.fulfilled, e.rejected);
        });
      t.length;

    )
      n = n.then(t.shift(), t.shift());
    return n;
  }),
    (lo.prototype.getUri = function (e) {
      return (
        (e = uo(this.defaults, e)),
        bi(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
      );
    }),
    yi.forEach(["delete", "get", "head", "options"], function (e) {
      lo.prototype[e] = function (t, n) {
        return this.request(yi.merge(n || {}, { method: e, url: t }));
      };
    }),
    yi.forEach(["post", "put", "patch"], function (e) {
      lo.prototype[e] = function (t, n, r) {
        return this.request(yi.merge(r || {}, { method: e, url: t, data: n }));
      };
    });
  var po = lo;
  function fo(e) {
    this.message = e;
  }
  (fo.prototype.toString = function () {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }),
    (fo.prototype.__CANCEL__ = !0);
  var ho = fo;
  function mo(e) {
    if ("function" != typeof e)
      throw new TypeError("executor must be a function.");
    var t;
    this.promise = new Promise(function (e) {
      t = e;
    });
    var n = this;
    e(function (e) {
      n.reason || ((n.reason = new ho(e)), t(n.reason));
    });
  }
  (mo.prototype.throwIfRequested = function () {
    if (this.reason) throw this.reason;
  }),
    (mo.source = function () {
      var e;
      return {
        token: new mo(function (t) {
          e = t;
        }),
        cancel: e,
      };
    });
  var vo = mo;
  function go(e) {
    var t = new po(e),
      n = fi(po.prototype.request, t);
    return yi.extend(n, po.prototype, t), yi.extend(n, t), n;
  }
  var _o = go(ao);
  (_o.Axios = po),
    (_o.create = function (e) {
      return go(uo(_o.defaults, e));
    }),
    (_o.Cancel = ho),
    (_o.CancelToken = vo),
    (_o.isCancel = wi),
    (_o.all = function (e) {
      return Promise.all(e);
    }),
    (_o.spread = function (e) {
      return function (t) {
        return e.apply(null, t);
      };
    });
  var yo = _o,
    So = _o;
  yo.default = So;
  var bo,
    ko = yo,
    Ro = (new Date().getTime(), 0),
    To = function () {
      return new Date().getTime() + Ro;
    },
    wo = function () {
      var e = new Date();
      return e.setTime(To()), e.toLocaleString();
    };
  function Co(e) {
    try {
      return JSON.stringify(e);
    } catch (n) {
      if (!bo)
        try {
          var t = {};
          (t.a = t), JSON.stringify(t);
        } catch (r) {
          bo = r.message;
        }
      if (n.message === bo) return "[Circular]";
      throw n;
    }
  }
  function Eo(e) {
    var t = "",
      n = 0;
    return (
      e.length > 1 &&
        "string" == typeof e[0] &&
        ((t = (t = e[0].replace(/(%?)(%([sdjo]))/g, function (t, r, i, o) {
          if (!r) {
            var a = e[(n += 1)],
              s = "";
            switch (o) {
              case "s":
                s += a;
                break;
              case "d":
                s += +a;
                break;
              case "j":
                s = Co(a);
                break;
              case "o":
                var c = Co(a);
                "{" !== c[0] && "[" !== c[0] && (c = "<".concat(c, ">")),
                  (s =
                    (function (e) {
                      if (
                        !Object.getOwnPropertyDescriptor ||
                        !Object.getPrototypeOf
                      )
                        return Object.prototype.toString.call(e).slice(8, -1);
                      for (; e; ) {
                        var t = Object.getOwnPropertyDescriptor(
                          e,
                          "constructor"
                        );
                        if (
                          void 0 !== t &&
                          "function" == typeof t.value &&
                          "" !== t.value.name
                        )
                          return t.value.name;
                        e = Object.getPrototypeOf(e);
                      }
                      return "";
                    })(a) + c);
            }
            return s;
          }
          return t;
        })).replace(/%{2,2}/g, "%")),
        (n += 1)),
      e.length > n && (t && (t += " "), (t += e.slice(n).join(" "))),
      t
    );
  }
  var Io = Object.prototype.hasOwnProperty;
  function Po() {
    try {
      throw new Error();
    } catch (e) {
      return e.stack;
    }
  }
  function xo(e) {
    var t = this,
      n = [],
      r = [];
    (this.length = function () {
      return n.length;
    }),
      (this.sent = function () {
        return r.length;
      }),
      (this.push = function (t) {
        n.push(t), n.length > e && n.shift();
      }),
      (this.send = function () {
        return r.length || ((r = n), (n = [])), r;
      }),
      (this.confirm = function () {
        (r = []), (t.content = "");
      }),
      (this.fail = function () {
        var i = 1 + n.length + r.length - e;
        i > 0 && (r.splice(0, i), (n = r.concat(n)), t.confirm());
      });
  }
  var Ao,
    Oo,
    Do,
    Lo = !!Po();
  function No(e) {
    return "["
      .concat(e.timestamp, "] <")
      .concat(e.level.label.toUpperCase(), ">")
      .concat(e.logger ? " (".concat(e.logger, ")") : "", ": ")
      .concat(e.message)
      .concat(e.stacktrace ? "\n".concat(e.stacktrace) : "");
  }
  var Mo = {
      url: "https://yun.tim.qq.com/v5/AVQualityReportSvc/C2S?sdkappid=1&cmdtype=jssdk_log",
      interval: 1e3,
      level: "trace",
      capacity: 0,
      stacktrace: { levels: ["trace", "warn", "error"], depth: 3, excess: 0 },
      timestamp: function () {
        return new Date().toISOString();
      },
      format: No,
    },
    jo = -1,
    Vo = !1,
    Uo = "",
    Fo = "",
    Go = "",
    Bo = function (e) {
      Vo ||
        ((Uo = "".concat(e.sdkAppId)),
        (Fo = "".concat(e.userId)),
        (Go = "".concat(e.version)),
        (Vo = !0));
    },
    Ho = function (e, t) {
      if (!e || !e.getLogger)
        throw new TypeError("Argument is not a root loglevel object");
      if (Ao) throw new Error("You can assign a plugin only one time");
      Ao = e;
      var n = (function e() {
        for (var t = {}, n = 0; n < arguments.length; n += 1) {
          var r = Object(arguments[n]);
          for (var i in r)
            Io.call(r, i) &&
              (t[i] =
                "object" !== lt(r[i]) || Array.isArray(r[i])
                  ? r[i]
                  : e(t[i], r[i]));
        }
        return t;
      })(Mo, t);
      n.capacity = n.capacity || 500;
      var r,
        i = n.interval;
      jo = setInterval(function () {
        if (!Vo) return;
        if (!o.sent()) {
          if (!o.length()) return;
          var e = o.send();
          (o.content = r
            ? '{"logs":['.concat(e.join(","), "]}")
            : e.join("\n")),
            (function (e) {
              if (!Vo) return;
              var t = JSON.stringify({
                timestamp: wo(),
                sdkAppId: Uo,
                userId: Fo,
                version: Go,
                log: e,
              });
              ko.post(n.url, t)
                .then(function (e) {
                  o.confirm();
                })
                .catch(function (e) {
                  console.log(e), o.fail();
                });
            })(o.content);
        }
      }, i);
      var o = new xo(n.capacity);
      return (
        (Oo = e.methodFactory),
        (Do = function (e, t, i) {
          var a = Oo(e, t, i),
            s =
              Lo &&
              n.stacktrace.levels.some(function (t) {
                return t === e;
              }),
            c = Ao.levels[e.toUpperCase()],
            u = c >= Ao.levels[n.level.toUpperCase()];
          return function () {
            for (var t = arguments.length, d = new Array(t), l = 0; l < t; l++)
              d[l] = arguments[l];
            var p = Eo(d);
            if (u) {
              var f = wo(),
                h = s ? Po() : "";
              if (h) {
                var m = h.split("\n");
                m.splice(0, n.stacktrace.excess + 3);
                var v = n.stacktrace.depth;
                if (v && m.length !== v + 1) {
                  var g = m.splice(0, v);
                  (h = g.join("\n")),
                    m.length && (h += "\n    and ".concat(m.length, " more"));
                } else h = m.join("\n");
              }
              var _ = n.format({
                message: p,
                level: { label: e, value: c },
                logger: i || "",
                timestamp: f,
                stacktrace: h,
              });
              void 0 === r && (r = "string" != typeof _);
              var y = "";
              if (r)
                try {
                  y += JSON.stringify(_);
                } catch (R) {
                  return (
                    a.apply(void 0, d), void Ao.getLogger("logger").error(R)
                  );
                }
              else y += _;
              o.push(y);
            }
            var S = new Date();
            S.setTime(To());
            var b = S.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
              k = "[" + b + "] <" + e.toUpperCase() + "> " + p;
            a.apply(void 0, [k]);
          };
        }),
        (e.methodFactory = Do),
        e.setLevel(e.getLevel()),
        e
      );
    },
    zo = function () {
      if (!Ao) throw new Error("You can't disable a not appled plugin");
      if (Do !== Ao.methodFactory)
        throw new Error(
          "You can't disable a plugin after appling another plugin"
        );
      (Ao.methodFactory = Oo),
        Ao.setLevel(Ao.getLevel()),
        (Ao = void 0),
        clearInterval(jo);
    },
    Wo = !1;
  (ar.setConfig = function (e) {
    Bo(e);
  }),
    (ar.setLogLevel = function (e) {
      ar.info("TRTC LogLevel was set to: " + e), ar.setLevel(e);
    }),
    (ar.enableUploadLog = function () {
      Wo || (ar.info("enable upload log"), Ho(ar), (Wo = !0));
    }),
    (ar.disableUploadLog = function () {
      Wo &&
        (ar.warn(
          "disable upload log! Without log we are difficult to help you triage the issue you might run into!"
        ),
        zo(),
        (Wo = !1));
    }),
    ar.enableUploadLog(),
    ar.setLevel("INFO");
  var Jo,
    qo =
      Object.keys ||
      function (e) {
        return ve(e, ge);
      },
    Ko = o
      ? Object.defineProperties
      : function (e, t) {
          C(e);
          for (var n, r = qo(t), i = r.length, o = 0; i > o; )
            I.f(e, (n = r[o++]), t[n]);
          return e;
        },
    $o = ie("document", "documentElement"),
    Yo = z("IE_PROTO"),
    Qo = function () {},
    Xo = function (e) {
      return "<script>" + e + "</script>";
    },
    Zo = function () {
      try {
        Jo = document.domain && new ActiveXObject("htmlfile");
      } catch (r) {}
      var e, t;
      Zo = Jo
        ? (function (e) {
            e.write(Xo("")), e.close();
            var t = e.parentWindow.Object;
            return (e = null), t;
          })(Jo)
        : (((t = k("iframe")).style.display = "none"),
          $o.appendChild(t),
          (t.src = String("javascript:")),
          (e = t.contentWindow.document).open(),
          e.write(Xo("document.F=Object")),
          e.close(),
          e.F);
      for (var n = ge.length; n--; ) delete Zo.prototype[ge[n]];
      return Zo();
    };
  W[Yo] = !0;
  var ea =
      Object.create ||
      function (e, t) {
        var n;
        return (
          null !== e
            ? ((Qo.prototype = C(e)),
              (n = new Qo()),
              (Qo.prototype = null),
              (n[Yo] = e))
            : (n = Zo()),
          void 0 === t ? n : Ko(n, t)
        );
      },
    ta = ye.f,
    na = {}.toString,
    ra =
      "object" == typeof window && window && Object.getOwnPropertyNames
        ? Object.getOwnPropertyNames(window)
        : [],
    ia = {
      f: function (e) {
        return ra && "[object Window]" == na.call(e)
          ? (function (e) {
              try {
                return ta(e);
              } catch (t) {
                return ra.slice();
              }
            })(e)
          : ta(m(e));
      },
    },
    oa = { f: Fe },
    aa = I.f,
    sa = function (e) {
      var t = ne.Symbol || (ne.Symbol = {});
      y(t, e) || aa(t, e, { value: oa.f(e) });
    },
    ca = I.f,
    ua = Fe("toStringTag"),
    da = function (e, t, n) {
      e &&
        !y((e = n ? e : e.prototype), ua) &&
        ca(e, ua, { configurable: !0, value: t });
    },
    la = it.forEach,
    pa = z("hidden"),
    fa = Fe("toPrimitive"),
    ha = ee.set,
    ma = ee.getterFor("Symbol"),
    va = Object.prototype,
    ga = r.Symbol,
    _a = ie("JSON", "stringify"),
    ya = w.f,
    Sa = I.f,
    ba = ia.f,
    ka = c.f,
    Ra = U("symbols"),
    Ta = U("op-symbols"),
    wa = U("string-to-symbol-registry"),
    Ca = U("symbol-to-string-registry"),
    Ea = U("wks"),
    Ia = r.QObject,
    Pa = !Ia || !Ia.prototype || !Ia.prototype.findChild,
    xa =
      o &&
      i(function () {
        return (
          7 !=
          ea(
            Sa({}, "a", {
              get: function () {
                return Sa(this, "a", { value: 7 }).a;
              },
            })
          ).a
        );
      })
        ? function (e, t, n) {
            var r = ya(va, t);
            r && delete va[t], Sa(e, t, n), r && e !== va && Sa(va, t, r);
          }
        : Sa,
    Aa = function (e, t) {
      var n = (Ra[e] = ea(ga.prototype));
      return (
        ha(n, { type: "Symbol", tag: e, description: t }),
        o || (n.description = t),
        n
      );
    },
    Oa = Me
      ? function (e) {
          return "symbol" == typeof e;
        }
      : function (e) {
          return Object(e) instanceof ga;
        },
    Da = function (e, t, n) {
      e === va && Da(Ta, t, n), C(e);
      var r = g(t, !0);
      return (
        C(n),
        y(Ra, r)
          ? (n.enumerable
              ? (y(e, pa) && e[pa][r] && (e[pa][r] = !1),
                (n = ea(n, { enumerable: u(0, !1) })))
              : (y(e, pa) || Sa(e, pa, u(1, {})), (e[pa][r] = !0)),
            xa(e, r, n))
          : Sa(e, r, n)
      );
    },
    La = function (e, t) {
      C(e);
      var n = m(t),
        r = qo(n).concat(Va(n));
      return (
        la(r, function (t) {
          (o && !Na.call(n, t)) || Da(e, t, n[t]);
        }),
        e
      );
    },
    Na = function (e) {
      var t = g(e, !0),
        n = ka.call(this, t);
      return (
        !(this === va && y(Ra, t) && !y(Ta, t)) &&
        (!(n || !y(this, t) || !y(Ra, t) || (y(this, pa) && this[pa][t])) || n)
      );
    },
    Ma = function (e, t) {
      var n = m(e),
        r = g(t, !0);
      if (n !== va || !y(Ra, r) || y(Ta, r)) {
        var i = ya(n, r);
        return (
          !i || !y(Ra, r) || (y(n, pa) && n[pa][r]) || (i.enumerable = !0), i
        );
      }
    },
    ja = function (e) {
      var t = ba(m(e)),
        n = [];
      return (
        la(t, function (e) {
          y(Ra, e) || y(W, e) || n.push(e);
        }),
        n
      );
    },
    Va = function (e) {
      var t = e === va,
        n = ba(t ? Ta : m(e)),
        r = [];
      return (
        la(n, function (e) {
          !y(Ra, e) || (t && !y(va, e)) || r.push(Ra[e]);
        }),
        r
      );
    };
  if (
    (Ne ||
      (te(
        (ga = function () {
          if (this instanceof ga)
            throw TypeError("Symbol is not a constructor");
          var e =
              arguments.length && void 0 !== arguments[0]
                ? String(arguments[0])
                : void 0,
            t = B(e),
            n = function (e) {
              this === va && n.call(Ta, e),
                y(this, pa) && y(this[pa], t) && (this[pa][t] = !1),
                xa(this, t, u(1, e));
            };
          return o && Pa && xa(va, t, { configurable: !0, set: n }), Aa(t, e);
        }).prototype,
        "toString",
        function () {
          return ma(this).tag;
        }
      ),
      te(ga, "withoutSetter", function (e) {
        return Aa(B(e), e);
      }),
      (c.f = Na),
      (I.f = Da),
      (w.f = Ma),
      (ye.f = ia.f = ja),
      (Se.f = Va),
      (oa.f = function (e) {
        return Aa(Fe(e), e);
      }),
      o &&
        (Sa(ga.prototype, "description", {
          configurable: !0,
          get: function () {
            return ma(this).description;
          },
        }),
        te(va, "propertyIsEnumerable", Na, { unsafe: !0 }))),
    Ae({ global: !0, wrap: !0, forced: !Ne, sham: !Ne }, { Symbol: ga }),
    la(qo(Ea), function (e) {
      sa(e);
    }),
    Ae(
      { target: "Symbol", stat: !0, forced: !Ne },
      {
        for: function (e) {
          var t = String(e);
          if (y(wa, t)) return wa[t];
          var n = ga(t);
          return (wa[t] = n), (Ca[n] = t), n;
        },
        keyFor: function (e) {
          if (!Oa(e)) throw TypeError(e + " is not a symbol");
          if (y(Ca, e)) return Ca[e];
        },
        useSetter: function () {
          Pa = !0;
        },
        useSimple: function () {
          Pa = !1;
        },
      }
    ),
    Ae(
      { target: "Object", stat: !0, forced: !Ne, sham: !o },
      {
        create: function (e, t) {
          return void 0 === t ? ea(e) : La(ea(e), t);
        },
        defineProperty: Da,
        defineProperties: La,
        getOwnPropertyDescriptor: Ma,
      }
    ),
    Ae(
      { target: "Object", stat: !0, forced: !Ne },
      { getOwnPropertyNames: ja, getOwnPropertySymbols: Va }
    ),
    Ae(
      {
        target: "Object",
        stat: !0,
        forced: i(function () {
          Se.f(1);
        }),
      },
      {
        getOwnPropertySymbols: function (e) {
          return Se.f(De(e));
        },
      }
    ),
    _a)
  ) {
    var Ua =
      !Ne ||
      i(function () {
        var e = ga();
        return (
          "[null]" != _a([e]) || "{}" != _a({ a: e }) || "{}" != _a(Object(e))
        );
      });
    Ae(
      { target: "JSON", stat: !0, forced: Ua },
      {
        stringify: function (e, t, n) {
          for (var r, i = [e], o = 1; arguments.length > o; )
            i.push(arguments[o++]);
          if (((r = t), (v(t) || void 0 !== e) && !Oa(e)))
            return (
              Oe(t) ||
                (t = function (e, t) {
                  if (
                    ("function" == typeof r && (t = r.call(this, e, t)), !Oa(t))
                  )
                    return t;
                }),
              (i[1] = t),
              _a.apply(null, i)
            );
        },
      }
    );
  }
  ga.prototype[fa] || P(ga.prototype, fa, ga.prototype.valueOf),
    da(ga, "Symbol"),
    (W[pa] = !0);
  var Fa = I.f,
    Ga = r.Symbol;
  if (
    o &&
    "function" == typeof Ga &&
    (!("description" in Ga.prototype) || void 0 !== Ga().description)
  ) {
    var Ba = {},
      Ha = function () {
        var e =
            arguments.length < 1 || void 0 === arguments[0]
              ? void 0
              : String(arguments[0]),
          t = this instanceof Ha ? new Ga(e) : void 0 === e ? Ga() : Ga(e);
        return "" === e && (Ba[t] = !0), t;
      };
    ke(Ha, Ga);
    var za = (Ha.prototype = Ga.prototype);
    za.constructor = Ha;
    var Wa = za.toString,
      Ja = "Symbol(test)" == String(Ga("test")),
      qa = /^Symbol\((.*)\)[^)]+$/;
    Fa(za, "description", {
      configurable: !0,
      get: function () {
        var e = v(this) ? this.valueOf() : this,
          t = Wa.call(e);
        if (y(Ba, e)) return "";
        var n = Ja ? t.slice(7, -1) : t.replace(qa, "$1");
        return "" === n ? void 0 : n;
      },
    }),
      Ae({ global: !0, forced: !0 }, { Symbol: Ha });
  }
  sa("iterator");
  var Ka = it.forEach,
    $a = Ln("forEach")
      ? function (e) {
          return Ka(this, e, arguments.length > 1 ? arguments[1] : void 0);
        }
      : [].forEach;
  Ae({ target: "Array", proto: !0, forced: [].forEach != $a }, { forEach: $a });
  var Ya = Fe("unscopables"),
    Qa = Array.prototype;
  null == Qa[Ya] && I.f(Qa, Ya, { configurable: !0, value: ea(null) });
  var Xa,
    Za,
    es,
    ts = function (e) {
      Qa[Ya][e] = !0;
    },
    ns = {},
    rs = Fe("iterator"),
    is = !1;
  [].keys &&
    ("next" in (es = [].keys())
      ? (Za = xr(xr(es))) !== Object.prototype && (Xa = Za)
      : (is = !0)),
    null == Xa && (Xa = {}),
    y(Xa, rs) ||
      P(Xa, rs, function () {
        return this;
      });
  var os = { IteratorPrototype: Xa, BUGGY_SAFARI_ITERATORS: is },
    as = os.IteratorPrototype,
    ss = function () {
      return this;
    },
    cs =
      Object.setPrototypeOf ||
      ("__proto__" in {}
        ? (function () {
            var e,
              t = !1,
              n = {};
            try {
              (e = Object.getOwnPropertyDescriptor(
                Object.prototype,
                "__proto__"
              ).set).call(n, []),
                (t = n instanceof Array);
            } catch (r) {}
            return function (n, r) {
              return (
                C(n),
                (function (e) {
                  if (!v(e) && null !== e)
                    throw TypeError(
                      "Can't set " + String(e) + " as a prototype"
                    );
                })(r),
                t ? e.call(n, r) : (n.__proto__ = r),
                n
              );
            };
          })()
        : void 0),
    us = os.IteratorPrototype,
    ds = os.BUGGY_SAFARI_ITERATORS,
    ls = Fe("iterator"),
    ps = function () {
      return this;
    },
    fs = function (e, t, n, r, i, o, a) {
      !(function (e, t, n) {
        var r = t + " Iterator";
        (e.prototype = ea(as, { next: u(1, n) })), da(e, r, !1), (ns[r] = ss);
      })(n, t, r);
      var s,
        c,
        d,
        l = function (e) {
          if (e === i && v) return v;
          if (!ds && e in h) return h[e];
          switch (e) {
            case "keys":
            case "values":
            case "entries":
              return function () {
                return new n(this, e);
              };
          }
          return function () {
            return new n(this);
          };
        },
        p = t + " Iterator",
        f = !1,
        h = e.prototype,
        m = h[ls] || h["@@iterator"] || (i && h[i]),
        v = (!ds && m) || l(i),
        g = ("Array" == t && h.entries) || m;
      if (
        (g &&
          ((s = xr(g.call(new e()))),
          us !== Object.prototype &&
            s.next &&
            (xr(s) !== us &&
              (cs ? cs(s, us) : "function" != typeof s[ls] && P(s, ls, ps)),
            da(s, p, !0))),
        "values" == i &&
          m &&
          "values" !== m.name &&
          ((f = !0),
          (v = function () {
            return m.call(this);
          })),
        h[ls] !== v && P(h, ls, v),
        (ns[t] = v),
        i)
      )
        if (
          ((c = {
            values: l("values"),
            keys: o ? v : l("keys"),
            entries: l("entries"),
          }),
          a)
        )
          for (d in c) (!ds && !f && d in h) || te(h, d, c[d]);
        else Ae({ target: t, proto: !0, forced: ds || f }, c);
      return c;
    },
    hs = ee.set,
    ms = ee.getterFor("Array Iterator"),
    vs = fs(
      Array,
      "Array",
      function (e, t) {
        hs(this, { type: "Array Iterator", target: m(e), index: 0, kind: t });
      },
      function () {
        var e = ms(this),
          t = e.target,
          n = e.kind,
          r = e.index++;
        return !t || r >= t.length
          ? ((e.target = void 0), { value: void 0, done: !0 })
          : "keys" == n
          ? { value: r, done: !1 }
          : "values" == n
          ? { value: t[r], done: !1 }
          : { value: [r, t[r]], done: !1 };
      },
      "values"
    );
  (ns.Arguments = ns.Array), ts("keys"), ts("values"), ts("entries");
  var gs = !i(function () {
      return Object.isExtensible(Object.preventExtensions({}));
    }),
    _s = t(function (e) {
      var t = I.f,
        n = B("meta"),
        r = 0,
        i =
          Object.isExtensible ||
          function () {
            return !0;
          },
        o = function (e) {
          t(e, n, { value: { objectID: "O" + ++r, weakData: {} } });
        },
        a = (e.exports = {
          REQUIRED: !1,
          fastKey: function (e, t) {
            if (!v(e))
              return "symbol" == typeof e
                ? e
                : ("string" == typeof e ? "S" : "P") + e;
            if (!y(e, n)) {
              if (!i(e)) return "F";
              if (!t) return "E";
              o(e);
            }
            return e[n].objectID;
          },
          getWeakData: function (e, t) {
            if (!y(e, n)) {
              if (!i(e)) return !0;
              if (!t) return !1;
              o(e);
            }
            return e[n].weakData;
          },
          onFreeze: function (e) {
            return gs && a.REQUIRED && i(e) && !y(e, n) && o(e), e;
          },
        });
      W[n] = !0;
    }),
    ys = (_s.REQUIRED, _s.fastKey, _s.getWeakData, _s.onFreeze, Fe("iterator")),
    Ss = Array.prototype,
    bs = Fe("iterator"),
    ks = function (e, t, n, r) {
      try {
        return r ? t(C(n)[0], n[1]) : t(n);
      } catch (o) {
        var i = e.return;
        throw (void 0 !== i && C(i.call(e)), o);
      }
    },
    Rs = t(function (e) {
      var t = function (e, t) {
        (this.stopped = e), (this.result = t);
      };
      (e.exports = function (e, n, r, i, o) {
        var a,
          s,
          c,
          u,
          d,
          l,
          p,
          f,
          h = tt(n, r, i ? 2 : 1);
        if (o) a = e;
        else {
          if (
            "function" !=
            typeof (s = (function (e) {
              if (null != e) return e[bs] || e["@@iterator"] || ns[Mr(e)];
            })(e))
          )
            throw TypeError("Target is not iterable");
          if (void 0 !== (f = s) && (ns.Array === f || Ss[ys] === f)) {
            for (c = 0, u = ue(e.length); u > c; c++)
              if (
                (d = i ? h(C((p = e[c]))[0], p[1]) : h(e[c])) &&
                d instanceof t
              )
                return d;
            return new t(!1);
          }
          a = s.call(e);
        }
        for (l = a.next; !(p = l.call(a)).done; )
          if (
            "object" == typeof (d = ks(a, h, p.value, i)) &&
            d &&
            d instanceof t
          )
            return d;
        return new t(!1);
      }).stop = function (e) {
        return new t(!0, e);
      };
    }),
    Ts = function (e, t, n) {
      if (!(e instanceof t))
        throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
      return e;
    },
    ws = Fe("iterator"),
    Cs = !1;
  try {
    var Es = 0,
      Is = {
        next: function () {
          return { done: !!Es++ };
        },
        return: function () {
          Cs = !0;
        },
      };
    (Is[ws] = function () {
      return this;
    }),
      Array.from(Is, function () {
        throw 2;
      });
  } catch (bf) {}
  var Ps = function (e, t) {
      if (!t && !Cs) return !1;
      var n = !1;
      try {
        var r = {};
        (r[ws] = function () {
          return {
            next: function () {
              return { done: (n = !0) };
            },
          };
        }),
          e(r);
      } catch (bf) {}
      return n;
    },
    xs = function (e, t, n) {
      var r, i;
      return (
        cs &&
          "function" == typeof (r = t.constructor) &&
          r !== n &&
          v((i = r.prototype)) &&
          i !== n.prototype &&
          cs(e, i),
        e
      );
    },
    As = function (e, t, n) {
      for (var r in t) te(e, r, t[r], n);
      return e;
    },
    Os = Fe("species"),
    Ds = function (e) {
      var t = ie(e),
        n = I.f;
      o &&
        t &&
        !t[Os] &&
        n(t, Os, {
          configurable: !0,
          get: function () {
            return this;
          },
        });
    },
    Ls = I.f,
    Ns = _s.fastKey,
    Ms = ee.set,
    js = ee.getterFor,
    Vs =
      ((function (e, t, n) {
        var o = -1 !== e.indexOf("Map"),
          a = -1 !== e.indexOf("Weak"),
          s = o ? "set" : "add",
          c = r[e],
          u = c && c.prototype,
          d = c,
          l = {},
          p = function (e) {
            var t = u[e];
            te(
              u,
              e,
              "add" == e
                ? function (e) {
                    return t.call(this, 0 === e ? 0 : e), this;
                  }
                : "delete" == e
                ? function (e) {
                    return !(a && !v(e)) && t.call(this, 0 === e ? 0 : e);
                  }
                : "get" == e
                ? function (e) {
                    return a && !v(e) ? void 0 : t.call(this, 0 === e ? 0 : e);
                  }
                : "has" == e
                ? function (e) {
                    return !(a && !v(e)) && t.call(this, 0 === e ? 0 : e);
                  }
                : function (e, n) {
                    return t.call(this, 0 === e ? 0 : e, n), this;
                  }
            );
          };
        if (
          Pe(
            e,
            "function" != typeof c ||
              !(
                a ||
                (u.forEach &&
                  !i(function () {
                    new c().entries().next();
                  }))
              )
          )
        )
          (d = n.getConstructor(t, e, o, s)), (_s.REQUIRED = !0);
        else if (Pe(e, !0)) {
          var f = new d(),
            h = f[s](a ? {} : -0, 1) != f,
            m = i(function () {
              f.has(1);
            }),
            g = Ps(function (e) {
              new c(e);
            }),
            _ =
              !a &&
              i(function () {
                for (var e = new c(), t = 5; t--; ) e[s](t, t);
                return !e.has(-0);
              });
          g ||
            (((d = t(function (t, n) {
              Ts(t, d, e);
              var r = xs(new c(), t, d);
              return null != n && Rs(n, r[s], r, o), r;
            })).prototype = u),
            (u.constructor = d)),
            (m || _) && (p("delete"), p("has"), o && p("get")),
            (_ || h) && p(s),
            a && u.clear && delete u.clear;
        }
        (l[e] = d),
          Ae({ global: !0, forced: d != c }, l),
          da(d, e),
          a || n.setStrong(d, e, o);
      })(
        "Map",
        function (e) {
          return function () {
            return e(this, arguments.length ? arguments[0] : void 0);
          };
        },
        {
          getConstructor: function (e, t, n, r) {
            var i = e(function (e, a) {
                Ts(e, i, t),
                  Ms(e, {
                    type: t,
                    index: ea(null),
                    first: void 0,
                    last: void 0,
                    size: 0,
                  }),
                  o || (e.size = 0),
                  null != a && Rs(a, e[r], e, n);
              }),
              a = js(t),
              s = function (e, t, n) {
                var r,
                  i,
                  s = a(e),
                  u = c(e, t);
                return (
                  u
                    ? (u.value = n)
                    : ((s.last = u =
                        {
                          index: (i = Ns(t, !0)),
                          key: t,
                          value: n,
                          previous: (r = s.last),
                          next: void 0,
                          removed: !1,
                        }),
                      s.first || (s.first = u),
                      r && (r.next = u),
                      o ? s.size++ : e.size++,
                      "F" !== i && (s.index[i] = u)),
                  e
                );
              },
              c = function (e, t) {
                var n,
                  r = a(e),
                  i = Ns(t);
                if ("F" !== i) return r.index[i];
                for (n = r.first; n; n = n.next) if (n.key == t) return n;
              };
            return (
              As(i.prototype, {
                clear: function () {
                  for (var e = a(this), t = e.index, n = e.first; n; )
                    (n.removed = !0),
                      n.previous && (n.previous = n.previous.next = void 0),
                      delete t[n.index],
                      (n = n.next);
                  (e.first = e.last = void 0),
                    o ? (e.size = 0) : (this.size = 0);
                },
                delete: function (e) {
                  var t = a(this),
                    n = c(this, e);
                  if (n) {
                    var r = n.next,
                      i = n.previous;
                    delete t.index[n.index],
                      (n.removed = !0),
                      i && (i.next = r),
                      r && (r.previous = i),
                      t.first == n && (t.first = r),
                      t.last == n && (t.last = i),
                      o ? t.size-- : this.size--;
                  }
                  return !!n;
                },
                forEach: function (e) {
                  for (
                    var t,
                      n = a(this),
                      r = tt(
                        e,
                        arguments.length > 1 ? arguments[1] : void 0,
                        3
                      );
                    (t = t ? t.next : n.first);

                  )
                    for (r(t.value, t.key, this); t && t.removed; )
                      t = t.previous;
                },
                has: function (e) {
                  return !!c(this, e);
                },
              }),
              As(
                i.prototype,
                n
                  ? {
                      get: function (e) {
                        var t = c(this, e);
                        return t && t.value;
                      },
                      set: function (e, t) {
                        return s(this, 0 === e ? 0 : e, t);
                      },
                    }
                  : {
                      add: function (e) {
                        return s(this, (e = 0 === e ? 0 : e), e);
                      },
                    }
              ),
              o &&
                Ls(i.prototype, "size", {
                  get: function () {
                    return a(this).size;
                  },
                }),
              i
            );
          },
          setStrong: function (e, t, n) {
            var r = t + " Iterator",
              i = js(t),
              o = js(r);
            fs(
              e,
              t,
              function (e, t) {
                Ms(this, {
                  type: r,
                  target: e,
                  state: i(e),
                  kind: t,
                  last: void 0,
                });
              },
              function () {
                for (var e = o(this), t = e.kind, n = e.last; n && n.removed; )
                  n = n.previous;
                return e.target && (e.last = n = n ? n.next : e.state.first)
                  ? "keys" == t
                    ? { value: n.key, done: !1 }
                    : "values" == t
                    ? { value: n.value, done: !1 }
                    : { value: [n.key, n.value], done: !1 }
                  : ((e.target = void 0), { value: void 0, done: !0 });
              },
              n ? "entries" : "values",
              !n,
              !0
            ),
              Ds(t);
          },
        }
      ),
      "\t\n\v\f\r ???????????????????????????????????????????????\u2028\u2029\ufeff"),
    Us = "[" + Vs + "]",
    Fs = RegExp("^" + Us + Us + "*"),
    Gs = RegExp(Us + Us + "*$"),
    Bs = function (e) {
      return function (t) {
        var n = String(h(t));
        return (
          1 & e && (n = n.replace(Fs, "")), 2 & e && (n = n.replace(Gs, "")), n
        );
      };
    },
    Hs = { start: Bs(1), end: Bs(2), trim: Bs(3) },
    zs = ye.f,
    Ws = w.f,
    Js = I.f,
    qs = Hs.trim,
    Ks = r.Number,
    $s = Ks.prototype,
    Ys = "Number" == l(ea($s)),
    Qs = function (e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s,
        c,
        u = g(e, !1);
      if ("string" == typeof u && u.length > 2)
        if (43 === (t = (u = qs(u)).charCodeAt(0)) || 45 === t) {
          if (88 === (n = u.charCodeAt(2)) || 120 === n) return NaN;
        } else if (48 === t) {
          switch (u.charCodeAt(1)) {
            case 66:
            case 98:
              (r = 2), (i = 49);
              break;
            case 79:
            case 111:
              (r = 8), (i = 55);
              break;
            default:
              return +u;
          }
          for (a = (o = u.slice(2)).length, s = 0; s < a; s++)
            if ((c = o.charCodeAt(s)) < 48 || c > i) return NaN;
          return parseInt(o, r);
        }
      return +u;
    };
  if (Pe("Number", !Ks(" 0o1") || !Ks("0b1") || Ks("+0x1"))) {
    for (
      var Xs,
        Zs = function (e) {
          var t = arguments.length < 1 ? 0 : e,
            n = this;
          return n instanceof Zs &&
            (Ys
              ? i(function () {
                  $s.valueOf.call(n);
                })
              : "Number" != l(n))
            ? xs(new Ks(Qs(t)), n, Zs)
            : Qs(t);
        },
        ec = o
          ? zs(Ks)
          : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(
              ","
            ),
        tc = 0;
      ec.length > tc;
      tc++
    )
      y(Ks, (Xs = ec[tc])) && !y(Zs, Xs) && Js(Zs, Xs, Ws(Ks, Xs));
    (Zs.prototype = $s), ($s.constructor = Zs), te(r, "Number", Zs);
  }
  var nc = Math.floor;
  Ae(
    { target: "Number", stat: !0 },
    {
      isInteger: function (e) {
        return !v(e) && isFinite(e) && nc(e) === e;
      },
    }
  );
  var rc = Hs.trim,
    ic = r.parseInt,
    oc = /^[+-]?0[Xx]/,
    ac =
      8 !== ic(Vs + "08") || 22 !== ic(Vs + "0x16")
        ? function (e, t) {
            var n = rc(String(e));
            return ic(n, t >>> 0 || (oc.test(n) ? 16 : 10));
          }
        : ic;
  Ae({ global: !0, forced: parseInt != ac }, { parseInt: ac });
  var sc,
    cc,
    uc,
    dc = r.Promise,
    lc = /(iphone|ipod|ipad).*applewebkit/i.test(He),
    pc = r.location,
    fc = r.setImmediate,
    hc = r.clearImmediate,
    mc = r.process,
    vc = r.MessageChannel,
    gc = r.Dispatch,
    _c = 0,
    yc = {},
    Sc = function (e) {
      if (yc.hasOwnProperty(e)) {
        var t = yc[e];
        delete yc[e], t();
      }
    },
    bc = function (e) {
      return function () {
        Sc(e);
      };
    },
    kc = function (e) {
      Sc(e.data);
    },
    Rc = function (e) {
      r.postMessage(e + "", pc.protocol + "//" + pc.host);
    };
  (fc && hc) ||
    ((fc = function (e) {
      for (var t = [], n = 1; arguments.length > n; ) t.push(arguments[n++]);
      return (
        (yc[++_c] = function () {
          ("function" == typeof e ? e : Function(e)).apply(void 0, t);
        }),
        sc(_c),
        _c
      );
    }),
    (hc = function (e) {
      delete yc[e];
    }),
    "process" == l(mc)
      ? (sc = function (e) {
          mc.nextTick(bc(e));
        })
      : gc && gc.now
      ? (sc = function (e) {
          gc.now(bc(e));
        })
      : vc && !lc
      ? ((uc = (cc = new vc()).port2),
        (cc.port1.onmessage = kc),
        (sc = tt(uc.postMessage, uc, 1)))
      : !r.addEventListener ||
        "function" != typeof postMessage ||
        r.importScripts ||
        i(Rc)
      ? (sc =
          "onreadystatechange" in k("script")
            ? function (e) {
                $o.appendChild(k("script")).onreadystatechange = function () {
                  $o.removeChild(this), Sc(e);
                };
              }
            : function (e) {
                setTimeout(bc(e), 0);
              })
      : ((sc = Rc), r.addEventListener("message", kc, !1)));
  var Tc,
    wc,
    Cc,
    Ec,
    Ic,
    Pc,
    xc,
    Ac,
    Oc = { set: fc, clear: hc },
    Dc = w.f,
    Lc = Oc.set,
    Nc = r.MutationObserver || r.WebKitMutationObserver,
    Mc = r.process,
    jc = r.Promise,
    Vc = "process" == l(Mc),
    Uc = Dc(r, "queueMicrotask"),
    Fc = Uc && Uc.value;
  Fc ||
    ((Tc = function () {
      var e, t;
      for (Vc && (e = Mc.domain) && e.exit(); wc; ) {
        (t = wc.fn), (wc = wc.next);
        try {
          t();
        } catch (bf) {
          throw (wc ? Ec() : (Cc = void 0), bf);
        }
      }
      (Cc = void 0), e && e.enter();
    }),
    Vc
      ? (Ec = function () {
          Mc.nextTick(Tc);
        })
      : Nc && !lc
      ? ((Ic = !0),
        (Pc = document.createTextNode("")),
        new Nc(Tc).observe(Pc, { characterData: !0 }),
        (Ec = function () {
          Pc.data = Ic = !Ic;
        }))
      : jc && jc.resolve
      ? ((xc = jc.resolve(void 0)),
        (Ac = xc.then),
        (Ec = function () {
          Ac.call(xc, Tc);
        }))
      : (Ec = function () {
          Lc.call(r, Tc);
        }));
  var Gc,
    Bc,
    Hc,
    zc,
    Wc =
      Fc ||
      function (e) {
        var t = { fn: e, next: void 0 };
        Cc && (Cc.next = t), wc || ((wc = t), Ec()), (Cc = t);
      },
    Jc = function (e) {
      var t, n;
      (this.promise = new e(function (e, r) {
        if (void 0 !== t || void 0 !== n)
          throw TypeError("Bad Promise constructor");
        (t = e), (n = r);
      })),
        (this.resolve = et(t)),
        (this.reject = et(n));
    },
    qc = {
      f: function (e) {
        return new Jc(e);
      },
    },
    Kc = function (e, t) {
      if ((C(e), v(t) && t.constructor === e)) return t;
      var n = qc.f(e);
      return (0, n.resolve)(t), n.promise;
    },
    $c = function (e) {
      try {
        return { error: !1, value: e() };
      } catch (bf) {
        return { error: !0, value: bf };
      }
    },
    Yc = Oc.set,
    Qc = Fe("species"),
    Xc = "Promise",
    Zc = ee.get,
    eu = ee.set,
    tu = ee.getterFor(Xc),
    nu = dc,
    ru = r.TypeError,
    iu = r.document,
    ou = r.process,
    au = ie("fetch"),
    su = qc.f,
    cu = su,
    uu = "process" == l(ou),
    du = !!(iu && iu.createEvent && r.dispatchEvent),
    lu = Pe(Xc, function () {
      if (!(M(nu) !== String(nu))) {
        if (66 === qe) return !0;
        if (!uu && "function" != typeof PromiseRejectionEvent) return !0;
      }
      if (qe >= 51 && /native code/.test(nu)) return !1;
      var e = nu.resolve(1),
        t = function (e) {
          e(
            function () {},
            function () {}
          );
        };
      return (
        ((e.constructor = {})[Qc] = t), !(e.then(function () {}) instanceof t)
      );
    }),
    pu =
      lu ||
      !Ps(function (e) {
        nu.all(e).catch(function () {});
      }),
    fu = function (e) {
      var t;
      return !(!v(e) || "function" != typeof (t = e.then)) && t;
    },
    hu = function (e, t, n) {
      if (!t.notified) {
        t.notified = !0;
        var r = t.reactions;
        Wc(function () {
          for (var i = t.value, o = 1 == t.state, a = 0; r.length > a; ) {
            var s,
              c,
              u,
              d = r[a++],
              l = o ? d.ok : d.fail,
              p = d.resolve,
              f = d.reject,
              h = d.domain;
            try {
              l
                ? (o || (2 === t.rejection && _u(e, t), (t.rejection = 1)),
                  !0 === l
                    ? (s = i)
                    : (h && h.enter(), (s = l(i)), h && (h.exit(), (u = !0))),
                  s === d.promise
                    ? f(ru("Promise-chain cycle"))
                    : (c = fu(s))
                    ? c.call(s, p, f)
                    : p(s))
                : f(i);
            } catch (bf) {
              h && !u && h.exit(), f(bf);
            }
          }
          (t.reactions = []), (t.notified = !1), n && !t.rejection && vu(e, t);
        });
      }
    },
    mu = function (e, t, n) {
      var i, o;
      du
        ? (((i = iu.createEvent("Event")).promise = t),
          (i.reason = n),
          i.initEvent(e, !1, !0),
          r.dispatchEvent(i))
        : (i = { promise: t, reason: n }),
        (o = r["on" + e])
          ? o(i)
          : "unhandledrejection" === e &&
            (function (e, t) {
              var n = r.console;
              n &&
                n.error &&
                (1 === arguments.length ? n.error(e) : n.error(e, t));
            })("Unhandled promise rejection", n);
    },
    vu = function (e, t) {
      Yc.call(r, function () {
        var n,
          r = t.value;
        if (
          gu(t) &&
          ((n = $c(function () {
            uu
              ? ou.emit("unhandledRejection", r, e)
              : mu("unhandledrejection", e, r);
          })),
          (t.rejection = uu || gu(t) ? 2 : 1),
          n.error)
        )
          throw n.value;
      });
    },
    gu = function (e) {
      return 1 !== e.rejection && !e.parent;
    },
    _u = function (e, t) {
      Yc.call(r, function () {
        uu
          ? ou.emit("rejectionHandled", e)
          : mu("rejectionhandled", e, t.value);
      });
    },
    yu = function (e, t, n, r) {
      return function (i) {
        e(t, n, i, r);
      };
    },
    Su = function (e, t, n, r) {
      t.done ||
        ((t.done = !0),
        r && (t = r),
        (t.value = n),
        (t.state = 2),
        hu(e, t, !0));
    },
    bu = function (e, t, n, r) {
      if (!t.done) {
        (t.done = !0), r && (t = r);
        try {
          if (e === n) throw ru("Promise can't be resolved itself");
          var i = fu(n);
          i
            ? Wc(function () {
                var r = { done: !1 };
                try {
                  i.call(n, yu(bu, e, r, t), yu(Su, e, r, t));
                } catch (bf) {
                  Su(e, r, bf, t);
                }
              })
            : ((t.value = n), (t.state = 1), hu(e, t, !1));
        } catch (bf) {
          Su(e, { done: !1 }, bf, t);
        }
      }
    };
  lu &&
    ((nu = function (e) {
      Ts(this, nu, Xc), et(e), Gc.call(this);
      var t = Zc(this);
      try {
        e(yu(bu, this, t), yu(Su, this, t));
      } catch (bf) {
        Su(this, t, bf);
      }
    }),
    ((Gc = function (e) {
      eu(this, {
        type: Xc,
        done: !1,
        notified: !1,
        parent: !1,
        reactions: [],
        rejection: !1,
        state: 0,
        value: void 0,
      });
    }).prototype = As(nu.prototype, {
      then: function (e, t) {
        var n = tu(this),
          r = su(ai(this, nu));
        return (
          (r.ok = "function" != typeof e || e),
          (r.fail = "function" == typeof t && t),
          (r.domain = uu ? ou.domain : void 0),
          (n.parent = !0),
          n.reactions.push(r),
          0 != n.state && hu(this, n, !1),
          r.promise
        );
      },
      catch: function (e) {
        return this.then(void 0, e);
      },
    })),
    (Bc = function () {
      var e = new Gc(),
        t = Zc(e);
      (this.promise = e),
        (this.resolve = yu(bu, e, t)),
        (this.reject = yu(Su, e, t));
    }),
    (qc.f = su =
      function (e) {
        return e === nu || e === Hc ? new Bc(e) : cu(e);
      }),
    "function" == typeof dc &&
      ((zc = dc.prototype.then),
      te(
        dc.prototype,
        "then",
        function (e, t) {
          var n = this;
          return new nu(function (e, t) {
            zc.call(n, e, t);
          }).then(e, t);
        },
        { unsafe: !0 }
      ),
      "function" == typeof au &&
        Ae(
          { global: !0, enumerable: !0, forced: !0 },
          {
            fetch: function (e) {
              return Kc(nu, au.apply(r, arguments));
            },
          }
        ))),
    Ae({ global: !0, wrap: !0, forced: lu }, { Promise: nu }),
    da(nu, Xc, !1),
    Ds(Xc),
    (Hc = ie(Xc)),
    Ae(
      { target: Xc, stat: !0, forced: lu },
      {
        reject: function (e) {
          var t = su(this);
          return t.reject.call(void 0, e), t.promise;
        },
      }
    ),
    Ae(
      { target: Xc, stat: !0, forced: lu },
      {
        resolve: function (e) {
          return Kc(this, e);
        },
      }
    ),
    Ae(
      { target: Xc, stat: !0, forced: pu },
      {
        all: function (e) {
          var t = this,
            n = su(t),
            r = n.resolve,
            i = n.reject,
            o = $c(function () {
              var n = et(t.resolve),
                o = [],
                a = 0,
                s = 1;
              Rs(e, function (e) {
                var c = a++,
                  u = !1;
                o.push(void 0),
                  s++,
                  n.call(t, e).then(function (e) {
                    u || ((u = !0), (o[c] = e), --s || r(o));
                  }, i);
              }),
                --s || r(o);
            });
          return o.error && i(o.value), n.promise;
        },
        race: function (e) {
          var t = this,
            n = su(t),
            r = n.reject,
            i = $c(function () {
              var i = et(t.resolve);
              Rs(e, function (e) {
                i.call(t, e).then(n.resolve, r);
              });
            });
          return i.error && r(i.value), n.promise;
        },
      }
    );
  var ku = Kr.charAt,
    Ru = ee.set,
    Tu = ee.getterFor("String Iterator");
  fs(
    String,
    "String",
    function (e) {
      Ru(this, { type: "String Iterator", string: String(e), index: 0 });
    },
    function () {
      var e,
        t = Tu(this),
        n = t.string,
        r = t.index;
      return r >= n.length
        ? { value: void 0, done: !0 }
        : ((e = ku(n, r)), (t.index += e.length), { value: e, done: !1 });
    }
  ),
    Jr("match", 1, function (e, t, n) {
      return [
        function (t) {
          var n = h(this),
            r = null == t ? void 0 : t[e];
          return void 0 !== r ? r.call(t, n) : new RegExp(t)[e](String(n));
        },
        function (e) {
          var r = n(t, e, this);
          if (r.done) return r.value;
          var i = C(e),
            o = String(this);
          if (!i.global) return Qr(i, o);
          var a = i.unicode;
          i.lastIndex = 0;
          for (var s, c = [], u = 0; null !== (s = Qr(i, o)); ) {
            var d = String(s[0]);
            (c[u] = d),
              "" === d && (i.lastIndex = Yr(o, ue(i.lastIndex), a)),
              u++;
          }
          return 0 === u ? null : c;
        },
      ];
    });
  var wu,
    Cu = function (e) {
      if (ii(e))
        throw TypeError("The method doesn't accept regular expressions");
      return e;
    },
    Eu = Fe("match"),
    Iu = w.f,
    Pu = "".startsWith,
    xu = Math.min,
    Au = (function (e) {
      var t = /./;
      try {
        "/./"[e](t);
      } catch (n) {
        try {
          return (t[Eu] = !1), "/./"[e](t);
        } catch (r) {}
      }
      return !1;
    })("startsWith"),
    Ou = !(
      Au || ((wu = Iu(String.prototype, "startsWith")), !wu || wu.writable)
    );
  Ae(
    { target: "String", proto: !0, forced: !Ou && !Au },
    {
      startsWith: function (e) {
        var t = String(h(this));
        Cu(e);
        var n = ue(xu(arguments.length > 1 ? arguments[1] : void 0, t.length)),
          r = String(e);
        return Pu ? Pu.call(t, r, n) : t.slice(n, n + r.length) === r;
      },
    }
  );
  var Du = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0,
  };
  for (var Lu in Du) {
    var Nu = r[Lu],
      Mu = Nu && Nu.prototype;
    if (Mu && Mu.forEach !== $a)
      try {
        P(Mu, "forEach", $a);
      } catch (bf) {
        Mu.forEach = $a;
      }
  }
  var ju = Fe("iterator"),
    Vu = Fe("toStringTag"),
    Uu = vs.values;
  for (var Fu in Du) {
    var Gu = r[Fu],
      Bu = Gu && Gu.prototype;
    if (Bu) {
      if (Bu[ju] !== Uu)
        try {
          P(Bu, ju, Uu);
        } catch (bf) {
          Bu[ju] = Uu;
        }
      if ((Bu[Vu] || P(Bu, Vu, Fu), Du[Fu]))
        for (var Hu in vs)
          if (Bu[Hu] !== vs[Hu])
            try {
              P(Bu, Hu, vs[Hu]);
            } catch (bf) {
              Bu[Hu] = vs[Hu];
            }
    }
  }
  var zu = i(function () {
    qo(1);
  });
  Ae(
    { target: "Object", stat: !0, forced: zu },
    {
      keys: function (e) {
        return qo(De(e));
      },
    }
  );
  var Wu = c.f,
    Ju = function (e) {
      return function (t) {
        for (var n, r = m(t), i = qo(r), a = i.length, s = 0, c = []; a > s; )
          (n = i[s++]), (o && !Wu.call(r, n)) || c.push(e ? [n, r[n]] : r[n]);
        return c;
      };
    },
    qu = { entries: Ju(!0), values: Ju(!1) }.values;
  Ae(
    { target: "Object", stat: !0 },
    {
      values: function (e) {
        return qu(e);
      },
    }
  );
  var Ku = I.f,
    $u = ye.f,
    Yu = ee.set,
    Qu = Fe("match"),
    Xu = r.RegExp,
    Zu = Xu.prototype,
    ed = /a/g,
    td = /a/g,
    nd = new Xu(ed) !== ed,
    rd = Xn.UNSUPPORTED_Y;
  if (
    o &&
    Pe(
      "RegExp",
      !nd ||
        rd ||
        i(function () {
          return (
            (td[Qu] = !1), Xu(ed) != ed || Xu(td) == td || "/a/i" != Xu(ed, "i")
          );
        })
    )
  ) {
    for (
      var id = function (e, t) {
          var n,
            r = this instanceof id,
            i = ii(e),
            o = void 0 === t;
          if (!r && i && e.constructor === id && o) return e;
          nd
            ? i && !o && (e = e.source)
            : e instanceof id && (o && (t = Yn.call(e)), (e = e.source)),
            rd && (n = !!t && t.indexOf("y") > -1) && (t = t.replace(/y/g, ""));
          var a = xs(nd ? new Xu(e, t) : Xu(e, t), r ? this : Zu, id);
          return rd && n && Yu(a, { sticky: n }), a;
        },
        od = function (e) {
          (e in id) ||
            Ku(id, e, {
              configurable: !0,
              get: function () {
                return Xu[e];
              },
              set: function (t) {
                Xu[e] = t;
              },
            });
        },
        ad = $u(Xu),
        sd = 0;
      ad.length > sd;

    )
      od(ad[sd++]);
    (Zu.constructor = id), (id.prototype = Zu), te(r, "RegExp", id);
  }
  Ds("RegExp");
  var cd =
    Object.is ||
    function (e, t) {
      return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
    };
  Jr("search", 1, function (e, t, n) {
    return [
      function (t) {
        var n = h(this),
          r = null == t ? void 0 : t[e];
        return void 0 !== r ? r.call(t, n) : new RegExp(t)[e](String(n));
      },
      function (e) {
        var r = n(t, e, this);
        if (r.done) return r.value;
        var i = C(e),
          o = String(this),
          a = i.lastIndex;
        cd(a, 0) || (i.lastIndex = 0);
        var s = Qr(i, o);
        return (
          cd(i.lastIndex, a) || (i.lastIndex = a), null === s ? -1 : s.index
        );
      },
    ];
  });
  var ud = Hs.trim,
    dd = r.parseFloat,
    ld =
      1 / dd(Vs + "-0") != -Infinity
        ? function (e) {
            var t = ud(String(e)),
              n = dd(t);
            return 0 === n && "-" == t.charAt(0) ? -0 : n;
          }
        : dd;
  Ae({ global: !0, forced: parseFloat != ld }, { parseFloat: ld });
  var pd = (window.navigator && window.navigator.userAgent) || "",
    fd = /AppleWebKit\/([\d.]+)/i.exec(pd),
    hd = (fd && parseFloat(fd.pop()), /iPad/i.test(pd)),
    md = /iPhone/i.test(pd) && !hd,
    vd = /iPod/i.test(pd),
    gd = md || hd || vd,
    _d =
      ((function () {
        var e = pd.match(/OS (\d+)_/i);
        e && e[1] && e[1];
      })(),
      /Android/i.test(pd)),
    yd = (function () {
      var e = pd.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
      if (!e) return null;
      var t = e[1] && parseFloat(e[1]),
        n = e[2] && parseFloat(e[2]);
      return t && n ? parseFloat(e[1] + "." + e[2]) : t || null;
    })(),
    Sd = (_d && /webkit/i.test(pd), /Firefox/i.test(pd)),
    bd = /Edge/i.test(pd),
    kd = !bd && /Chrome/i.test(pd),
    Rd =
      ((function () {
        var e = pd.match(/Chrome\/(\d+)/);
        e && e[1] && parseFloat(e[1]);
      })(),
      (function () {
        var e = pd.match(/Chrome\/([\d.]+)/);
        return e && e[1] ? e[1] : null;
      })()),
    Td =
      (/MSIE\s8\.0/.test(pd),
      (function () {
        var e = /MSIE\s(\d+)\.\d/.exec(pd),
          t = e && parseFloat(e[1]);
        !t && /Trident\/7.0/i.test(pd) && /rv:11.0/.test(pd) && (t = 11);
      })(),
      /Safari/i.test(pd) && !kd && !_d && !bd),
    wd = (function () {
      var e = pd.match(/Version\/([\d.]+)/);
      return e && e[1] ? e[1] : null;
    })(),
    Cd = /TBS\/\d+/i.test(pd),
    Ed =
      ((function () {
        var e = pd.match(/TBS\/(\d+)/i);
        if (e && e[1]) e[1];
      })(),
      !Cd && /MQQBrowser\/\d+/i.test(pd)),
    Id =
      (!Cd && / QQBrowser\/\d+/i.test(pd),
      /(micromessenger|webbrowser)/i.test(pd),
      /Windows/i.test(pd)),
    Pd = /MAC OS X/i.test(pd),
    xd = /Linux/i.test(pd),
    Ad = (/MicroMessenger/i.test(pd), /UCBrowser/i.test(pd)),
    Od = /MiuiBrowser/i.test(pd),
    Dd = /HuaweiBrowser/i.test(pd),
    Ld = kd ? "Chrome/" + Rd : Td ? "Safari/" + wd : "NotSupportedBrowser",
    Nd = function (e) {
      var t = window.location.search.match(
        new RegExp("(\\?|&)" + e + "=([^&]*)(&|$)")
      );
      return t ? decodeURIComponent(t[2]) : "";
    },
    Md = function () {
      return Nd("trtc_env");
    },
    jd = function (e) {
      var t = e,
        n = Nd("trtc_env");
      return n && (t = "wss://" + n + ".rtc.qq.com:8687"), t;
    };
  var Vd = function (e) {
      if (
        !e ||
        "object" !== lt(e) ||
        "[object Object]" != Object.prototype.toString.call(e)
      )
        return !1;
      var t = Object.getPrototypeOf(e);
      if (null === t) return !0;
      var n =
        Object.prototype.hasOwnProperty.call(t, "constructor") && t.constructor;
      return (
        "function" == typeof n &&
        n instanceof n &&
        Function.prototype.toString.call(n) ===
          Function.prototype.toString.call(Object)
      );
    },
    Ud = Object.prototype.hasOwnProperty;
  function Fd(e) {
    if (null == e) return !0;
    if ("boolean" == typeof e) return !1;
    if ("number" == typeof e) return 0 === e;
    if ("string" == typeof e) return 0 === e.length;
    if ("function" == typeof e) return 0 === e.length;
    if (Array.isArray(e)) return 0 === e.length;
    if (e instanceof Error) return "" === e.message;
    if (Vd(e))
      switch (Object.prototype.toString.call(e)) {
        case "[object File]":
        case "[object Map]":
        case "[object Set]":
          return 0 === e.size;
        case "[object Object]":
          for (var t in e) if (Ud.call(e, t)) return !1;
          return !0;
      }
    return !1;
  }
  var Gd,
    Bd = t(function (e) {
      var t = Object.prototype.hasOwnProperty,
        n = "~";
      function r() {}
      function i(e, t, n) {
        (this.fn = e), (this.context = t), (this.once = n || !1);
      }
      function o(e, t, r, o, a) {
        if ("function" != typeof r)
          throw new TypeError("The listener must be a function");
        var s = new i(r, o || e, a),
          c = n ? n + t : t;
        return (
          e._events[c]
            ? e._events[c].fn
              ? (e._events[c] = [e._events[c], s])
              : e._events[c].push(s)
            : ((e._events[c] = s), e._eventsCount++),
          e
        );
      }
      function a(e, t) {
        0 == --e._eventsCount ? (e._events = new r()) : delete e._events[t];
      }
      function s() {
        (this._events = new r()), (this._eventsCount = 0);
      }
      Object.create &&
        ((r.prototype = Object.create(null)), new r().__proto__ || (n = !1)),
        (s.prototype.eventNames = function () {
          var e,
            r,
            i = [];
          if (0 === this._eventsCount) return i;
          for (r in (e = this._events))
            t.call(e, r) && i.push(n ? r.slice(1) : r);
          return Object.getOwnPropertySymbols
            ? i.concat(Object.getOwnPropertySymbols(e))
            : i;
        }),
        (s.prototype.listeners = function (e) {
          var t = n ? n + e : e,
            r = this._events[t];
          if (!r) return [];
          if (r.fn) return [r.fn];
          for (var i = 0, o = r.length, a = new Array(o); i < o; i++)
            a[i] = r[i].fn;
          return a;
        }),
        (s.prototype.listenerCount = function (e) {
          var t = n ? n + e : e,
            r = this._events[t];
          return r ? (r.fn ? 1 : r.length) : 0;
        }),
        (s.prototype.emit = function (e, t, r, i, o, a) {
          var s = n ? n + e : e;
          if (!this._events[s]) return !1;
          var c,
            u,
            d = this._events[s],
            l = arguments.length;
          if (d.fn) {
            switch ((d.once && this.removeListener(e, d.fn, void 0, !0), l)) {
              case 1:
                return d.fn.call(d.context), !0;
              case 2:
                return d.fn.call(d.context, t), !0;
              case 3:
                return d.fn.call(d.context, t, r), !0;
              case 4:
                return d.fn.call(d.context, t, r, i), !0;
              case 5:
                return d.fn.call(d.context, t, r, i, o), !0;
              case 6:
                return d.fn.call(d.context, t, r, i, o, a), !0;
            }
            for (u = 1, c = new Array(l - 1); u < l; u++)
              c[u - 1] = arguments[u];
            d.fn.apply(d.context, c);
          } else {
            var p,
              f = d.length;
            for (u = 0; u < f; u++)
              switch (
                (d[u].once && this.removeListener(e, d[u].fn, void 0, !0), l)
              ) {
                case 1:
                  d[u].fn.call(d[u].context);
                  break;
                case 2:
                  d[u].fn.call(d[u].context, t);
                  break;
                case 3:
                  d[u].fn.call(d[u].context, t, r);
                  break;
                case 4:
                  d[u].fn.call(d[u].context, t, r, i);
                  break;
                default:
                  if (!c)
                    for (p = 1, c = new Array(l - 1); p < l; p++)
                      c[p - 1] = arguments[p];
                  d[u].fn.apply(d[u].context, c);
              }
          }
          return !0;
        }),
        (s.prototype.on = function (e, t, n) {
          return o(this, e, t, n, !1);
        }),
        (s.prototype.once = function (e, t, n) {
          return o(this, e, t, n, !0);
        }),
        (s.prototype.removeListener = function (e, t, r, i) {
          var o = n ? n + e : e;
          if (!this._events[o]) return this;
          if (!t) return a(this, o), this;
          var s = this._events[o];
          if (s.fn)
            s.fn !== t ||
              (i && !s.once) ||
              (r && s.context !== r) ||
              a(this, o);
          else {
            for (var c = 0, u = [], d = s.length; c < d; c++)
              (s[c].fn !== t ||
                (i && !s[c].once) ||
                (r && s[c].context !== r)) &&
                u.push(s[c]);
            u.length
              ? (this._events[o] = 1 === u.length ? u[0] : u)
              : a(this, o);
          }
          return this;
        }),
        (s.prototype.removeAllListeners = function (e) {
          var t;
          return (
            e
              ? ((t = n ? n + e : e), this._events[t] && a(this, t))
              : ((this._events = new r()), (this._eventsCount = 0)),
            this
          );
        }),
        (s.prototype.off = s.prototype.removeListener),
        (s.prototype.addListener = s.prototype.on),
        (s.prefixed = n),
        (s.EventEmitter = s),
        (e.exports = s);
    }),
    Hd = "connection-state-changed",
    zd = "error",
    Wd = {
      DISCONNECTED: "DISCONNECTED",
      CONNECTING: "CONNECTING",
      RECONNECTING: "RECONNECTING",
      CONNECTED: "CONNECTED",
    },
    Jd = {
      NEW_REMOTE_SDP: 2,
      NEW_ICE_CANDIDATE: 4,
      CLINET_BANNDED: 8,
      CHANNEL_SETUP_SUCCESS: 19,
      CHANNEL_SETUP_FAILED: 80,
      CHANNEL_RECONNECT_RESULT: 514,
      JOIN_ROOM_RESULT: 20,
      PEER_JOIN: 16,
      PEER_LEAVE: 18,
      UPDATE_REMOTE_SDP: 48,
      UPDATE_AUDIO_SSRC: 50,
      UPDATE_VIDEO_SSRC: 52,
      UPDATE_REMOTE_MUTE_STAT: 23,
      CLOSE_PEER_ACK: 10,
      SUBSCRIBE_ACK: 26,
    },
    qd = {
      NEW_REMOTE_SDP: "new-remote-sdp",
      NEW_ICE_CANDIDATE: "new-ice-candidate",
      CLINET_BANNDED: "client-banned",
      CHANNEL_SETUP_SUCCESS: "channel-setup-success",
      CHANNEL_SETUP_FAILED: "channel-setup-failed",
      CHANNEL_RECONNECT_RESULT: "channel-reconnect-result",
      JOIN_ROOM_RESULT: "join-room-result",
      PEER_JOIN: "peer-join",
      PEER_LEAVE: "peer-leave",
      UPDATE_REMOTE_SDP: "update-remote-sdp",
      UPDATE_AUDIO_SSRC: "update-audio-ssrc",
      UPDATE_VIDEO_SSRC: "update-video-ssrc",
      UPDATE_REMOTE_MUTE_STAT: "update-remote-mute-stat",
      CLOSE_PEER_ACK: "close-peer-ack",
      SUBSCRIBE_ACK: "subscribe-ack",
      REQUEST_REBUILD_SESSION: "request-rebuild-session",
    },
    Kd = "on_peer_sdp",
    $d = "on_reexchange_sdp",
    Yd = "on_create_room",
    Qd = "on_close_peer",
    Xd = "on_quality_report",
    Zd = "on_rebuild_session",
    el = "on_change_av_state",
    tl = "on_subscribe",
    nl = "on_constraints_config",
    rl = "on_test_ws_broken",
    il = "on_recreate_down_peerc",
    ol = {
      INVALID_PARAMETER: 4096,
      INVALID_OPERATION: 4097,
      NOT_SUPPORTED: 4098,
      SIGNAL_CAHNNEL_SETUP_FAILED: 16385,
      SIGNAL_CHANNEL_ERROR: 16386,
      ICE_TRANSPORT_ERROR: 16387,
      JOIN_ROOM_FAILED: 16388,
      CREATE_OFFER_FAILED: 16389,
      CLIENT_BANNED: 16448,
      SERVER_TIMEOUT: 16449,
      SUBSCRIPTION_TIMEOUT: 16450,
      PLAY_NOT_ALLOWED: 16451,
      UNKOWN: 65535,
    },
    al = function (e) {
      return e === ol.INVALID_PARAMETER
        ? "INVALID_PARAMETER"
        : e === ol.INVALID_OPERATION
        ? "INVALID_OPERATION"
        : e === ol.CLIENT_BANNED
        ? "CLIENT_BANNED"
        : e === ol.CREATE_OFFER_FAILED
        ? "CREATE_OFFER_FAILED"
        : e === ol.JOIN_ROOM_FAILED
        ? "JOIN_ROOM_FAILED"
        : e === ol.ICE_TRANSPORT_ERROR
        ? "ICE_TRANSPORT_ERROR"
        : e === ol.PLAY_NOT_ALLOWED
        ? "PLAY_NOT_ALLOWED"
        : e === ol.NOT_SUPPORTED
        ? "NOT_SUPPORTED"
        : e === ol.SIGNAL_CAHNNEL_SETUP_FAILED
        ? "SIGNAL_CHANNEL_SETUP_FAILED"
        : e === ol.SIGNAL_CHANNEL_ERROR
        ? "SIGNAL_CAHNNEL_ERROR"
        : e === ol.SERVER_TIMEOUT
        ? "SERVER_TIMEOUT"
        : e === ol.SUBSCRIPTION_TIMEOUT
        ? "SUBSCRIPTION_TIMEOUT"
        : "UNKNOWN";
    },
    sl = (function (e) {
      function t(e) {
        var n,
          r = e.message,
          i = e.code,
          o = void 0 === i ? ol.UNKOWN : i,
          a = e.extraCode,
          s = void 0 === a ? 0 : a;
        return (
          ht(this, t),
          ((n = Tt(
            this,
            St(t).call(
              this,
              r +
                " <"
                  .concat(al(o), " 0x")
                  .concat(
                    o.toString(16),
                    "> https://trtc-1252463788.file.myqcloud.com/web/docs/module-ErrorCode.html"
                  )
            )
          )).code_ = o),
          (n.extraCode_ = s),
          (n.name = "RtcError"),
          (n.message_ = r),
          n
        );
      }
      return (
        yt(t, Rt(Error)),
        vt(t, [
          {
            key: "getCode",
            value: function () {
              return this.code_;
            },
          },
          {
            key: "getExtraCode",
            value: function () {
              return this.extraCode_;
            },
          },
        ]),
        t
      );
    })(),
    cl = { sdkAppId: "", userId: "", version: "", env: "qcloud" },
    ul = function (e) {
      (cl.sdkAppId = "".concat(e.sdkAppId)),
        (cl.version = "".concat(e.version)),
        (cl.env = e.env),
        (cl.userId = e.userId);
    },
    dl = function (e) {
      var t = JSON.stringify({
        timestamp: wo(),
        sdkAppId: cl.sdkAppId,
        userId: cl.userId,
        version: cl.version,
        log: e,
      });
      ko.post(
        "https://yun.tim.qq.com/v5/AVQualityReportSvc/C2S?sdkappid=1&cmdtype=jssdk_log",
        t
      )
        .then(function (e) {})
        .catch(function (e) {
          console.log(e);
        });
    },
    ll = function (e) {
      "qcloud" === cl.env &&
        (function (e) {
          var t = "stat-".concat(e.eventType, "-").concat(e.result);
          ("delta-join" !== e.eventType &&
            "delta-leave" !== e.eventType &&
            "delta-publish" !== e.eventType) ||
            (t = "".concat(e.eventType, ":").concat(e.delta)),
            dl(t),
            "join" === e.eventType &&
              "failed" === e.result &&
              ((t = "stat-"
                .concat(e.eventType, "-")
                .concat(e.result, "-")
                .concat(e.code)),
              dl(t));
        })(e);
      var t = _t({}, e, cl);
      ko.post(
        "https://yun.tim.qq.com/v5/AVQualityReportSvc/C2S?sdkappid=1&cmdtype=jssdk_event",
        JSON.stringify(t)
      )
        .then(function (e) {})
        .catch(function (e) {
          console.log(e);
        });
    },
    pl = 32768,
    fl = 32769,
    hl = 32770,
    ml = 32771,
    vl = 32772,
    gl = 32773,
    _l = 32774,
    yl = 32775,
    Sl = 32776,
    bl = 32777,
    kl = 32778,
    Rl = 32779,
    Tl = 32780,
    wl = 32781,
    Cl = 32782,
    El = 32783,
    Il = 32784,
    Pl = 32785,
    xl = 32786,
    Al = 32787,
    Ol = 32788,
    Dl = 32789,
    Ll = 32790,
    Nl = 32791,
    Ml = 32792,
    jl = 32793,
    Vl = new Map(),
    Ul = function (e, t) {
      var n = Vl.get(e);
      n || (Vl.set(e, []), (n = Vl.get(e))), n.push(t);
    },
    Fl = function (e) {
      var t = Vl.get(e);
      return t ? Vl.delete(e) : (t = []), t;
    },
    Gl = 3,
    Bl = (function () {
      function e(t) {
        ht(this, e),
          (this.sdkAppId_ = t.sdkAppId),
          (this.userId_ = t.userId),
          (this.userSig_ = t.userSig),
          (this.url_ = t.url),
          (this.backupUrl_ = t.backupUrl),
          (this.version_ = t.version),
          (this.urlWithParam_ = ""
            .concat(this.url_, "?sdkAppid=")
            .concat(this.sdkAppId_, "&identifier=")
            .concat(this.userId_, "&userSig=")
            .concat(this.userSig_)),
          (this.backupUrlWithParam_ = ""
            .concat(this.backupUrl_, "?sdkAppid=")
            .concat(this.sdkAppId_, "&identifier=")
            .concat(this.userId_, "&userSig=")
            .concat(this.userSig_)),
          (this.isConnected_ = !1),
          (this.isConnecting_ = !1),
          (this.tryCount_ = Gl),
          (this.socketInUse_ = null),
          (this.socket_ = null),
          (this.backupSocket_ = null),
          (this.backupTimer_ = -1),
          (this.reconnectTimer_ = -1),
          (this.signalInfo_ = {}),
          (this.currentState_ = Wd.DISCONNECTED),
          (this.emitter_ = new Bd());
      }
      return (
        vt(e, [
          {
            key: "connect",
            value: function () {
              var e = this;
              ar.info("connect to url: ".concat(this.urlWithParam_)),
                this.emitter_.emit(Hd, {
                  prevState: this.currentState_,
                  state: Wd.CONNECTING,
                }),
                (this.currentState_ = Wd.CONNECTING),
                (this.socket_ = new WebSocket(this.urlWithParam_)),
                this.bindSocket(this.socket_),
                (this.backupTimer_ = setTimeout(function () {
                  e.isConnected_ ||
                    (ar.info("trying to connect to backupUrl"),
                    e.tryConnectBackup());
                }, 1e3));
            },
          },
          {
            key: "tryConnectBackup",
            value: function () {
              this.backupSocket_ ||
                (ar.debug(
                  "try to connect to url: ".concat(this.backupUrlWithParam_)
                ),
                (this.backupSocket_ = new WebSocket(this.backupUrlWithParam_)),
                this.bindSocket(this.backupSocket_));
            },
          },
          {
            key: "bindSocket",
            value: function (e) {
              (e.onopen = this.onopen.bind(this)),
                (e.onclose = this.onclose.bind(this)),
                (e.onerror = this.onerror.bind(this)),
                (e.onmessage = this.onmessage.bind(this));
            },
          },
          {
            key: "unbindSocket",
            value: function (e) {
              (e.onopen = function () {}),
                (e.onclose = function () {}),
                (e.onerror = function () {}),
                (e.onmessage = function () {});
            },
          },
          {
            key: "unbindAndCloseSocket",
            value: function (e) {
              if ("main" === e) {
                if (this.socket_) {
                  this.unbindSocket(this.socket_);
                  try {
                    this.socket_.close(1e3);
                  } catch (t) {}
                  this.socket_ = null;
                }
              } else if (this.backupSocket_) {
                this.unbindSocket(this.backupSocket_);
                try {
                  this.backupSocket_.close(1e3);
                } catch (t) {}
                this.backupSocket_ = null;
              }
            },
          },
          {
            key: "clearBackupTimer",
            value: function () {
              -1 !== this.backupTimer_ &&
                (clearTimeout(this.backupTimer_), (this.backupTimer_ = -1));
            },
          },
          {
            key: "onopen",
            value: function (e) {
              if (!this.isConnected_) {
                this.isConnecting_
                  ? ll({
                      eventType: "websocketReconnectionState",
                      result: "success",
                    })
                  : ll({
                      eventType: "websocketConnectionState",
                      result: "success",
                    }),
                  (this.isConnected_ = !0),
                  (this.isConnecting_ = !1),
                  this.clearBackupTimer(),
                  e.target === this.socket_
                    ? (this.unbindAndCloseSocket("backup"),
                      (this.socketInUse_ = this.socket_))
                    : (this.unbindAndCloseSocket("main"),
                      (this.socketInUse_ = this.backupSocket_));
                var t = e.target.url;
                ar.info(
                  "["
                    .concat(this.userId_, "] websocket[")
                    .concat(t, "] is connected")
                ),
                  this.emitter_.emit(Hd, {
                    prevState: this.currentState_,
                    state: Wd.CONNECTED,
                  }),
                  (this.currentState_ = Wd.CONNECTED);
              }
            },
          },
          {
            key: "onclose",
            value: function (e) {
              var t = e.target.url,
                n = e.target === this.socketInUse_;
              ar.info(
                "["
                  .concat(this.userId_, "] websocket[")
                  .concat(t, " InUse: ")
                  .concat(n, "] is closed with code: ")
                  .concat(e.code)
              ),
                e.target === this.socketInUse_ &&
                  ((this.isConnected_ = !1),
                  this.addSignalEvent("disconnected"),
                  e.wasClean && 1e3 === e.code
                    ? (this.emitter_.emit(Hd, {
                        prevState: this.currentState_,
                        state: Wd.DISCONNECTED,
                      }),
                      (this.currentState_ = Wd.DISCONNECTED))
                    : (ar.warn(
                        "["
                          .concat(this.userId_, "] onclose code:")
                          .concat(e.code, " reason:")
                          .concat(e.reason)
                      ),
                      this.isConnecting_ && this.tryCount_ <= 0
                        ? ((this.isConnecting_ = !1),
                          (this.tryCount_ = Gl),
                          ar.error(
                            "[".concat(this.userId_, "] reconnect failed")
                          ),
                          this.emitter_.emit(Hd, {
                            prevState: this.currentState_,
                            state: Wd.DISCONNECTED,
                          }),
                          (this.currentState_ = Wd.DISCONNECTED),
                          ll({
                            eventType: "websocketReconnectionState",
                            result: "failed",
                          }),
                          this.emitter_.emit(
                            zd,
                            new sl({
                              code: ol.SIGNAL_CHANNEL_ERROR,
                              message: "WebSocket reconnection failed",
                            })
                          ))
                        : (ar.warn(
                            "close current websocket and schedule a reconnect timeout"
                          ),
                          (this.socketInUse_.onclose = function () {}),
                          this.socketInUse_.close(4011),
                          (this.socket_ =
                            this.backupSocket_ =
                            this.socketInUse_ =
                              null),
                          this.reconnect(t))));
            },
          },
          {
            key: "onerror",
            value: function (e) {
              var t = e.target.url;
              ar.error(
                "["
                  .concat(this.userId_, "] websocket[")
                  .concat(t, "] error observed")
              ),
                this.isConnected_
                  ? e.target === this.socketInUse_ &&
                    ((this.isConnected_ = !1),
                    this.unbindAndCloseSocket("main"),
                    this.unbindAndCloseSocket("backup"),
                    (this.socketInUse_ = null),
                    this.addSignalEvent("disconnected"),
                    this.emitter_.emit(
                      zd,
                      new sl({
                        code: ol.SIGNAL_CHANNEL_ERROR,
                        message: "WebSocket error observed",
                      })
                    ))
                  : (e.target == this.socket_
                      ? (this.unbindAndCloseSocket("main"),
                        this.isConnecting_ ||
                          (ar.warn(
                            "main socket error observed, try connecting to backup domain"
                          ),
                          this.tryConnectBackup()))
                      : this.unbindAndCloseSocket("backup"),
                    null === this.socket_ &&
                      null === this.backupSocket_ &&
                      (this.isConnecting_
                        ? ll({
                            eventType: "websocketReconnectionState",
                            result: "failed",
                          })
                        : ll({
                            eventType: "websocketConnectionState",
                            result: "failed",
                          }),
                      ar.error("SignalChannel setup failed"),
                      this.emitter_.emit(
                        zd,
                        new sl({
                          code: ol.SIGNAL_CHANNEL_ERROR,
                          message:
                            "failed to connect to remote server via websocket",
                        })
                      )));
            },
          },
          {
            key: "onmessage",
            value: function (e) {
              var t = this;
              if (this.isConnected_) {
                var n = JSON.parse(e.data),
                  r = n.cmd,
                  i = n.content,
                  o = Object.values(Jd),
                  a = Object.keys(Jd)[o.indexOf(r)],
                  s = qd[a];
                if (r !== Jd.UPDATE_REMOTE_MUTE_STAT) {
                  var c =
                    e.target == this.socket_ ? this.url_ : this.backupUrl_;
                  ar.debug(
                    "["
                      .concat(this.userId_, "] websocket[")
                      .concat(c, "] received message: ")
                      .concat(e.data)
                  ),
                    ar.info(
                      "["
                        .concat(this.userId_, "] Received event: [ ")
                        .concat(s, " ]")
                    );
                }
                switch (r) {
                  case Jd.CHANNEL_SETUP_SUCCESS:
                    (this.signalInfo_.relayIp = i.relayip),
                      (this.signalInfo_.relayInnerIp = i.innerip),
                      (this.signalInfo_.signalIp = i.signalip),
                      (this.signalInfo_.localIp = i.localip),
                      (this.signalInfo_.dataPort = i.dataport),
                      (this.signalInfo_.stunPort = i.stunport),
                      (this.signalInfo_.checkSigSeq = i.checkSigSeq),
                      (this.signalInfo_.socketId = i.socketid),
                      (this.signalInfo_.tinyId = i.tinyid),
                      (this.signalInfo_.openId = i.openid),
                      (this.signalInfo_.stunPortList = i.stunportList),
                      !i.stunportList || i.stunportList.length <= 0
                        ? (this.signalInfo_.stunServers =
                            "stun:" + i.relayip + ":" + i.stunport)
                        : ((this.signalInfo_.stunServers = []),
                          i.stunportList.forEach(function (e) {
                            var n = "stun:" + i.relayip + ":" + e;
                            t.signalInfo_.stunServers.push(n);
                          })),
                      i.cgiurl && (this.signalInfo_.logCgiUrl = i.cgiurl),
                      i.svrTime &&
                        (function (e) {
                          Ro = e - new Date().getTime();
                          var t = new Date();
                          t.setTime(e),
                            ar.info(
                              "baseTime from server: " + t + " offset: " + Ro
                            );
                        })(i.svrTime),
                      ar.info(
                        "ChannelSetup Success: signalIp:"
                          .concat(i.signalip, " relayIp:")
                          .concat(i.relayip, " checkSigSeq:")
                          .concat(i.checkSigSeq)
                      ),
                      1 === (i.rc || 0)
                        ? this.emitter_.emit(qd.REQUEST_REBUILD_SESSION, {
                            signalInfo: this.signalInfo_,
                          })
                        : this.emitter_.emit(s, {
                            signalInfo: this.signalInfo_,
                          }),
                      this.addSignalEvent("connected");
                    break;
                  case Jd.CHANNEL_SETUP_FAILED:
                    var u = "sdkAppId invalid",
                      d = "";
                    void 0 !== i.errorCode &&
                      ((u = i.errorCode), (d = i.errorMsg)),
                      this.emitter_.emit(
                        zd,
                        new sl({
                          code: ol.SIGNAL_CAHNNEL_SETUP_FAILED,
                          message: "SignalChannel setup failure: ('errorCode': "
                            .concat(u, ", 'errorMsg': ")
                            .concat(d, " })"),
                        })
                      );
                    break;
                  case Jd.CHANNEL_RECONNECT_RESULT:
                    -1 === i.result &&
                      (ar.error(
                        "SignalChannel reconnect failed for the user may have left the room from the perspective of remote relay server"
                      ),
                      ll({
                        eventType: "websocketReconnectionState",
                        result: "failed",
                      }),
                      this.addSignalEvent("disconnected"),
                      this.emitter_.emit(
                        zd,
                        new sl({
                          code: ol.SIGNAL_CAHNNEL_ERROR,
                          message: "SignalChannel reconnect failed",
                        })
                      ));
                    break;
                  default:
                    this.emitter_.emit(s, { data: n });
                }
              }
            },
          },
          {
            key: "addSignalEvent",
            value: function (e) {
              Ul(
                this.userId_,
                "connected" === e
                  ? {
                      eventId: Nl,
                      eventDesc: "signal channel is connected",
                      timestamp: To(),
                      userId: this.userId_,
                      tinyId: this.signalInfo_.tinyId,
                    }
                  : {
                      eventId: Ll,
                      eventDesc: "signal channel is disconnected",
                      timestamp: To(),
                      userId: this.userId_,
                      tinyId: this.signalInfo_.tinyId,
                    }
              );
            },
          },
          {
            key: "reconnect",
            value: function (e) {
              var t = this;
              this.reconnectTimer_ = setTimeout(function () {
                (t.isConnecting_ = !0), (t.tryCount_ -= 1);
                var n = e;
                Fd(t.signalInfo_) ||
                  -1 !== e.indexOf("&rc=1") ||
                  (n =
                    e +
                    "&iip=" +
                    t.signalInfo_.relayInnerIp +
                    "&dp=" +
                    t.signalInfo_.dataPort +
                    "&oip=" +
                    t.signalInfo_.relayIp +
                    "&sp=" +
                    t.signalInfo_.stunPort +
                    "&rc=1"),
                  t.emitter_.emit(Hd, {
                    prevState: t.currentState_,
                    state: Wd.RECONNECTING,
                  }),
                  (t.currentState_ = Wd.RECONNECTING),
                  (t.socket_ = new WebSocket(n)),
                  t.bindSocket(t.socket_);
              }, 3e3);
            },
          },
          {
            key: "isConnected",
            value: function () {
              return this.isConnected_;
            },
          },
          {
            key: "send",
            value: function (e) {
              var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "",
                n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : void 0;
              if (this.isConnected_) {
                var r = this.createSendMessage(e);
                (r.data = t),
                  void 0 !== n && (r.srctinyid = n),
                  this.socketInUse_.send(JSON.stringify(r));
              }
            },
          },
          {
            key: "sendWithReport",
            value: function (e) {
              var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "",
                n = arguments.length > 2 ? arguments[2] : void 0;
              if (this.isConnected_) {
                var r = this.createSendMessage(e);
                (r.data = t),
                  (r.report = n),
                  this.socketInUse_.send(JSON.stringify(r));
              }
            },
          },
          {
            key: "createSendMessage",
            value: function (e) {
              return {
                tag_key: e,
                data: "",
                openid: this.userId_,
                tinyid: this.signalInfo_.tinyId,
                version: this.version_,
                ua: navigator.userAgent,
              };
            },
          },
          {
            key: "close",
            value: function () {
              ar.info("close SignalChannel"),
                -1 !== this.reconnectTimer_ &&
                  (clearTimeout(this.reconnectTimer_),
                  (this.reconnectTimer_ = -1)),
                this.clearBackupTimer(),
                (this.isConnected_ = !1),
                (this.socketInUse_ = null),
                this.unbindAndCloseSocket("main"),
                this.unbindAndCloseSocket("backup");
            },
          },
          {
            key: "on",
            value: function (e, t, n) {
              this.emitter_.on(e, t, n);
            },
          },
          {
            key: "removeListener",
            value: function (e, t, n) {
              this.emitter_.removeListener(e, t, n);
            },
          },
          {
            key: "once",
            value: function (e, t) {
              this.emitter_.once(e, t);
            },
          },
        ]),
        e
      );
    })();
  window.addEventListener("message", function (e) {
    e.origin == window.location.origin &&
      (function (e) {
        if ("PermissionDeniedError" == e) {
          if (Gd) return Gd("PermissionDeniedError");
          throw new Error("PermissionDeniedError");
        }
        e.sourceId && Gd && Gd(e.sourceId, !0 === e.canRequestAudioTrack);
      })(e.data);
  });
  window.InstallTrigger;
  var Hl = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
    zl =
      (window.chrome,
      function () {
        var e = !1;
        return (
          [
            "RTCPeerConnection",
            "webkitRTCPeerConnection",
            "RTCIceGatherer",
          ].forEach(function (t) {
            t in window && (e = !0);
          }),
          e
        );
      }),
    Wl = (function () {
      var e = ft(
        regeneratorRuntime.mark(function e() {
          var t, n;
          return regeneratorRuntime.wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (t = new RTCPeerConnection()),
                      "",
                      (n = !1),
                      (e.prev = 3),
                      (e.next = 6),
                      t.createOffer({
                        offerToReceiveAudio: 1,
                        offerToReceiveVideo: 1,
                      })
                    );
                  case 6:
                    -1 !== e.sent.sdp.toLowerCase().indexOf("h264") && (n = !0),
                      (e.next = 12);
                    break;
                  case 10:
                    (e.prev = 10), (e.t0 = e.catch(3));
                  case 12:
                    return t.close(), e.abrupt("return", n);
                  case 14:
                  case "end":
                    return e.stop();
                }
            },
            e,
            null,
            [[3, 10]]
          );
        })
      );
      return function () {
        return e.apply(this, arguments);
      };
    })(),
    Jl = function () {
      if ("undefined" == typeof RTCRtpTransceiver) return !1;
      if (!("currentDirection" in RTCRtpTransceiver.prototype)) return !1;
      var e = new RTCPeerConnection(),
        t = !1;
      try {
        e.addTransceiver("audio"), (t = !0);
      } catch (n) {}
      return e.close(), t;
    },
    ql = !1,
    Kl = !0,
    $l = (function () {
      var e = ft(
        regeneratorRuntime.mark(function e() {
          var t, n, r;
          return regeneratorRuntime.wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (!ql) {
                    e.next = 2;
                    break;
                  }
                  return e.abrupt("return", Kl);
                case 2:
                  if (!(t = !(Sd || Ed || Ad || Od || Dd))) {
                    e.next = 14;
                    break;
                  }
                  if (((n = zl()), (r = !1), !n)) {
                    e.next = 10;
                    break;
                  }
                  return (e.next = 9), Wl();
                case 9:
                  r = e.sent;
                case 10:
                  (t = n && r) ||
                    ar.error(
                      ""
                        .concat(navigator.userAgent, " isWebRTCSupported: ")
                        .concat(n, " isH264Supported: ")
                        .concat(r)
                    ),
                    (e.next = 15);
                  break;
                case 14:
                  ar.error("blacklist: ".concat(navigator.userAgent));
                case 15:
                  return (ql = !0), (Kl = t), e.abrupt("return", t);
                case 18:
                case "end":
                  return e.stop();
              }
          }, e);
        })
      );
      return function () {
        return e.apply(this, arguments);
      };
    })(),
    Yl = function () {
      return !ql || Kl;
    };
  $l();
  var Ql = 1,
    Xl = 2,
    Zl = 20,
    ep = 21,
    tp = "5Y2wZK8nANNAoVw6dSAHVjNxrD1ObBM2kBPV",
    np = "224d130c-7b5c-415b-aaa2-79c2eb5a6df2",
    rp = 2,
    ip = 7,
    op = it.find,
    ap = !0;
  "find" in [] &&
    Array(1).find(function () {
      ap = !1;
    }),
    Ae(
      { target: "Array", proto: !0, forced: ap },
      {
        find: function (e) {
          return op(this, e, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    ),
    ts("find");
  var sp = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (e) {
          var t = (16 * Math.random()) | 0;
          return ("x" == e ? t : (3 & t) | 8).toString(16);
        }
      );
    },
    cp = "stream-added",
    up = "stream-removed",
    dp = "stream-updated",
    lp = "stream-published",
    pp = "stream-subscribed",
    fp = "error",
    hp = "connection-state-changed",
    mp = "stream-added",
    vp = "stream-removed",
    gp = "stream-updated",
    _p = "stream-subscribed",
    yp = "connection-state-changed",
    Sp = "peer-join",
    bp = "peer-leave",
    kp = "mute-audio",
    Rp = "mute-video",
    Tp = "unmute-audio",
    wp = "unmute-video",
    Cp = "client-banned",
    Ep = "error",
    Ip = "player-state-changed",
    Pp = "screen-sharing-stopped",
    xp = "player-state-changed",
    Ap = (1).toFixed,
    Op = Math.floor,
    Dp = function (e, t, n) {
      return 0 === t
        ? n
        : t % 2 == 1
        ? Dp(e, t - 1, n * e)
        : Dp(e * e, t / 2, n);
    },
    Lp =
      (Ap &&
        ("0.000" !== (8e-5).toFixed(3) ||
          "1" !== (0.9).toFixed(0) ||
          "1.25" !== (1.255).toFixed(2) ||
          "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0))) ||
      !i(function () {
        Ap.call({});
      });
  Ae(
    { target: "Number", proto: !0, forced: Lp },
    {
      toFixed: function (e) {
        var t,
          n,
          r,
          i,
          o = (function (e) {
            if ("number" != typeof e && "Number" != l(e))
              throw TypeError("Incorrect invocation");
            return +e;
          })(this),
          a = se(e),
          s = [0, 0, 0, 0, 0, 0],
          c = "",
          u = "0",
          d = function (e, t) {
            for (var n = -1, r = t; ++n < 6; )
              (r += e * s[n]), (s[n] = r % 1e7), (r = Op(r / 1e7));
          },
          p = function (e) {
            for (var t = 6, n = 0; --t >= 0; )
              (n += s[t]), (s[t] = Op(n / e)), (n = (n % e) * 1e7);
          },
          f = function () {
            for (var e = 6, t = ""; --e >= 0; )
              if ("" !== t || 0 === e || 0 !== s[e]) {
                var n = String(s[e]);
                t = "" === t ? n : t + fr.call("0", 7 - n.length) + n;
              }
            return t;
          };
        if (a < 0 || a > 20) throw RangeError("Incorrect fraction digits");
        if (o != o) return "NaN";
        if (o <= -1e21 || o >= 1e21) return String(o);
        if ((o < 0 && ((c = "-"), (o = -o)), o > 1e-21))
          if (
            ((n =
              (t =
                (function (e) {
                  for (var t = 0, n = e; n >= 4096; ) (t += 12), (n /= 4096);
                  for (; n >= 2; ) (t += 1), (n /= 2);
                  return t;
                })(o * Dp(2, 69, 1)) - 69) < 0
                ? o * Dp(2, -t, 1)
                : o / Dp(2, t, 1)),
            (n *= 4503599627370496),
            (t = 52 - t) > 0)
          ) {
            for (d(0, n), r = a; r >= 7; ) d(1e7, 0), (r -= 7);
            for (d(Dp(10, r, 1), 0), r = t - 1; r >= 23; )
              p(1 << 23), (r -= 23);
            p(1 << r), d(1, 1), p(2), (u = f());
          } else d(0, n), d(1 << -t, 0), (u = f() + fr.call("0", a));
        return (u =
          a > 0
            ? c +
              ((i = u.length) <= a
                ? "0." + fr.call("0", a - i) + u
                : u.slice(0, i - a) + "." + u.slice(i - a))
            : c + u);
      },
    }
  );
  var Np = window.AudioContext || window.webkitAudioContext,
    Mp = null,
    jp = (function () {
      function e() {
        var t = this;
        ht(this, e),
          Mp || (Mp = new Np()),
          (this.context_ = Mp),
          (this.instant_ = 0),
          (this.slow_ = 0),
          (this.clip_ = 0),
          (this.script_ = this.context_.createScriptProcessor(2048, 1, 1)),
          (this.script_.onaudioprocess = function (e) {
            var n,
              r = e.inputBuffer.getChannelData(0),
              i = 0,
              o = 0;
            for (n = 0; n < r.length; ++n)
              (i += r[n] * r[n]), Math.abs(r[n]) > 0.99 && (o += 1);
            (t.instant_ = Math.sqrt(i / r.length)),
              (t.slow_ = 0.95 * t.slow_ + 0.05 * t.instant_),
              (t.clip_ = o / r.length);
          });
      }
      return (
        vt(e, [
          {
            key: "connectToSource",
            value: function (e, t) {
              try {
                var n = new MediaStream();
                n.addTrack(e),
                  (this.mic_ = this.context_.createMediaStreamSource(n)),
                  this.mic_.connect(this.script_),
                  this.script_.connect(this.context_.destination),
                  void 0 !== t && t(null);
              } catch (r) {
                ar.error("soundMeter connectoToSource error: " + r),
                  void 0 !== t && t(r);
              }
            },
          },
          {
            key: "stop",
            value: function () {
              this.mic_.disconnect(), this.script_.disconnect();
            },
          },
          {
            key: "getVolume",
            value: function () {
              return this.instant_.toFixed(2);
            },
          },
        ]),
        e
      );
    })(),
    Vp = (function () {
      function e(t) {
        ht(this, e),
          (this.stream_ = t.stream),
          (this.userId_ = t.stream.getUserId()),
          (this.log_ = this.stream_.getIDLogger()),
          (this.track_ = t.track),
          (this.div_ = t.div),
          (this.muted_ = t.muted),
          (this.outputDeviceId_ = t.outputDeviceId),
          (this.volume_ = t.volume),
          (this.element_ = null),
          (this.emitter_ = new Bd()),
          (this.state_ = "NONE"),
          (this.soundMeter_ = null);
      }
      var t, n, r;
      return (
        vt(e, [
          {
            key: "play",
            value:
              ((r = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n, r;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((t = new MediaStream()).addTrack(this.track_),
                              ((n = document.createElement("audio")).srcObject =
                                t),
                              (n.muted = this.muted_),
                              n.setAttribute(
                                "id",
                                "audio_".concat(this.stream_.getId())
                              ),
                              n.setAttribute("autoplay", "autoplay"),
                              n.setAttribute("playsinline", "playsinline"),
                              this.div_.appendChild(n),
                              !this.outputDeviceId_)
                            ) {
                              e.next = 12;
                              break;
                            }
                            return (
                              (e.next = 12), n.setSinkId(this.outputDeviceId_)
                            );
                          case 12:
                            return (
                              (this.element_ = n),
                              this.setVolume(this.volume_),
                              this.handleEvents(),
                              (e.prev = 15),
                              (e.next = 18),
                              n.play()
                            );
                          case 18:
                            e.next = 26;
                            break;
                          case 20:
                            if (
                              ((e.prev = 20),
                              (e.t0 = e.catch(15)),
                              this.log_.warn("<audio> play() error: " + e.t0),
                              !(r = e.t0.toString() + " <audio>").startsWith(
                                "NotAllowedError"
                              ))
                            ) {
                              e.next = 26;
                              break;
                            }
                            throw new sl({
                              code: ol.PLAY_NOT_ALLOWED,
                              message: r,
                            });
                          case 26:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[15, 20]]
                  );
                })
              )),
              function () {
                return r.apply(this, arguments);
              }),
          },
          {
            key: "handleEvents",
            value: function () {
              var e = this;
              this.element_.addEventListener("playing", function (t) {
                e.log_.info("stream - audio player is starting playing"),
                  (e.state_ = "PLAYING"),
                  e.emitter_.emit(xp, { state: e.state_, reason: "playing" });
              }),
                this.element_.addEventListener("ended", function (t) {
                  e.log_.info("stream - audio player is ended"),
                    "STOPPED" !== e.state_ &&
                      ((e.state_ = "STOPPED"),
                      e.emitter_.emit(xp, {
                        state: e.state_,
                        reason: "ended",
                      }));
                }),
                this.element_.addEventListener("pause", function (t) {
                  e.log_.info("stream - audio player is paused"),
                    (e.state_ = "PAUSED"),
                    e.emitter_.emit(xp, { state: e.state_, reason: "pause" });
                }),
                this.track_.addEventListener("ended", function (t) {
                  e.log_.info("stream - audio player track is ended"),
                    "STOPPED" !== e.state_ &&
                      ((e.state_ = "STOPPED"),
                      e.emitter_.emit(xp, {
                        state: e.state_,
                        reason: "ended",
                      }));
                }),
                this.track_.addEventListener("mute", function (t) {
                  e.log_.info("stream - audio track is muted"),
                    "PAUSED" !== e.state_ &&
                      ((e.state_ = "PAUSED"),
                      e.emitter_.emit(xp, { state: e.state_, reason: "mute" }));
                }),
                this.track_.addEventListener("unmute", function (t) {
                  e.log_.info("stream - audio track is unmuted"),
                    "PAUSED" === e.state_ &&
                      ((e.state_ = "PLAYING"),
                      e.emitter_.emit(xp, {
                        state: e.state_,
                        reason: "unmute",
                      }));
                });
            },
          },
          {
            key: "setSinkId",
            value:
              ((n = ft(
                regeneratorRuntime.mark(function e(t) {
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (this.outputDeviceId_ === t) {
                              e.next = 4;
                              break;
                            }
                            return (e.next = 3), this.element_.setSinkId(t);
                          case 3:
                            this.outputDeviceId_ = t;
                          case 4:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return n.apply(this, arguments);
              }),
          },
          {
            key: "setVolume",
            value: function (e) {
              this.log_.info("stream - audioElement setVolume to : ".concat(e)),
                (this.element_.volume = e);
            },
          },
          {
            key: "getAudioLevel",
            value: function () {
              return (
                this.soundMeter_ ||
                  ((this.soundMeter_ = new jp()),
                  this.soundMeter_.connectToSource(this.track_)),
                this.soundMeter_.getVolume()
              );
            },
          },
          {
            key: "stop",
            value: function () {
              this.div_.removeChild(this.element_),
                (this.element_.srcObject = null),
                this.soundMeter_ &&
                  (this.soundMeter_.stop(), (this.soundMeter_ = null));
            },
          },
          {
            key: "resume",
            value:
              ((t = ft(
                regeneratorRuntime.mark(function e() {
                  var t;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0), (e.next = 3), this.element_.play()
                            );
                          case 3:
                            e.next = 11;
                            break;
                          case 5:
                            if (
                              ((e.prev = 5),
                              (e.t0 = e.catch(0)),
                              this.log_.warn("<audio> play() error: " + e.t0),
                              !(t = e.t0.toString() + " <audio>").startsWith(
                                "NotAllowedError"
                              ))
                            ) {
                              e.next = 11;
                              break;
                            }
                            throw new sl({
                              code: ol.PLAY_NOT_ALLOWED,
                              message: t,
                            });
                          case 11:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[0, 5]]
                  );
                })
              )),
              function () {
                return t.apply(this, arguments);
              }),
          },
          {
            key: "on",
            value: function (e, t) {
              this.emitter_.on(e, t);
            },
          },
        ]),
        e
      );
    })(),
    Up = (function () {
      function e(t) {
        ht(this, e),
          (this.stream_ = t.stream),
          (this.userId_ = t.stream.getUserId()),
          (this.log_ = this.stream_.getIDLogger()),
          (this.track_ = t.track),
          (this.div_ = t.div),
          (this.muted_ = t.muted),
          (this.objectFit_ = t.objectFit),
          (this.mirror_ = t.mirror),
          (this.element_ = null),
          (this.emitter_ = new Bd()),
          (this.state_ = "NONE");
      }
      var t, n;
      return (
        vt(e, [
          {
            key: "play",
            value:
              ((n = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n, r, i;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (t = new MediaStream()).addTrack(this.track_),
                              ((n = document.createElement("video")).srcObject =
                                t),
                              (n.muted = !0),
                              (r = 0),
                              this.mirror_ && (r = "180deg"),
                              n.setAttribute(
                                "id",
                                "video_".concat(this.stream_.getId())
                              ),
                              n.setAttribute(
                                "style",
                                "width: 100%; height: 100%; position: absolute; transform: rotateY("
                                  .concat(r, "); object-fit: ")
                                  .concat(this.objectFit_)
                              ),
                              n.setAttribute("autoplay", "autoplay"),
                              n.setAttribute("playsinline", "playsinline"),
                              this.div_.appendChild(n),
                              (this.element_ = n),
                              this.handleEvents(),
                              (e.prev = 14),
                              (e.next = 17),
                              n.play()
                            );
                          case 17:
                            e.next = 25;
                            break;
                          case 19:
                            if (
                              ((e.prev = 19),
                              (e.t0 = e.catch(14)),
                              this.log_.warn("<video> play() error: " + e.t0),
                              !(i = e.t0.toString() + " <video>").startsWith(
                                "NotAllowedError"
                              ))
                            ) {
                              e.next = 25;
                              break;
                            }
                            throw new sl({
                              code: ol.PLAY_NOT_ALLOWED,
                              message: i,
                            });
                          case 25:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[14, 19]]
                  );
                })
              )),
              function () {
                return n.apply(this, arguments);
              }),
          },
          {
            key: "handleEvents",
            value: function () {
              var e = this;
              this.element_.addEventListener("playing", function (t) {
                e.log_.info("stream - video player is starting playing"),
                  (e.state_ = "PLAYING"),
                  e.emitter_.emit(xp, { state: e.state_, reason: "playing" });
              }),
                this.element_.addEventListener("ended", function (t) {
                  e.log_.info("stream - video player is ended"),
                    "STOPPED" !== e.state_ &&
                      ((e.state_ = "STOPPED"),
                      e.emitter_.emit(xp, {
                        state: e.state_,
                        reason: "ended",
                      }));
                }),
                this.element_.addEventListener("pause", function (t) {
                  e.log_.info("stream - video player is paused"),
                    (e.state_ = "PAUSED"),
                    e.emitter_.emit(xp, { state: e.state_, reason: "pause" });
                }),
                this.track_.addEventListener("ended", function (t) {
                  e.log_.info("stream - video player track is ended"),
                    "STOPPED" !== e.state_ &&
                      ((e.state_ = "STOPPED"),
                      e.emitter_.emit(xp, {
                        state: e.state_,
                        reason: "ended",
                      }));
                }),
                this.track_.addEventListener("mute", function (t) {
                  e.log_.info("stream - video track is muted"),
                    "PAUSED" !== e.state_ &&
                      ((e.state_ = "PAUSED"),
                      e.emitter_.emit(xp, { state: e.state_, reason: "mute" }));
                }),
                this.track_.addEventListener("unmute", function (t) {
                  e.log_.info("stream - video track is unmuted"),
                    "PAUSED" === e.state_ &&
                      ((e.state_ = "PLAYING"),
                      e.emitter_.emit(xp, {
                        state: e.state_,
                        reason: "unmute",
                      }));
                });
            },
          },
          {
            key: "stop",
            value: function () {
              this.div_.removeChild(this.element_),
                (this.element_.srcObject = null);
            },
          },
          {
            key: "resume",
            value:
              ((t = ft(
                regeneratorRuntime.mark(function e() {
                  var t;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0), (e.next = 3), this.element_.play()
                            );
                          case 3:
                            e.next = 11;
                            break;
                          case 5:
                            if (
                              ((e.prev = 5),
                              (e.t0 = e.catch(0)),
                              this.log_.warn("<video> play() error: " + e.t0),
                              !(t = e.t0.toString() + " <video>").startsWith(
                                "NotAllowedError"
                              ))
                            ) {
                              e.next = 11;
                              break;
                            }
                            throw new sl({
                              code: ol.PLAY_NOT_ALLOWED,
                              message: t,
                            });
                          case 11:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[0, 5]]
                  );
                })
              )),
              function () {
                return t.apply(this, arguments);
              }),
          },
          {
            key: "getVideoFrame",
            value: function () {
              var e = document.createElement("canvas");
              return (
                (e.width = this.element_.videoWidth),
                (e.height = this.element_.videoHeight),
                e.getContext("2d").drawImage(this.element_, 0, 0),
                e.toDataURL("image/png")
              );
            },
          },
          {
            key: "on",
            value: function (e, t) {
              this.emitter_.on(e, t);
            },
          },
        ]),
        e
      );
    })(),
    Fp = (function () {
      function e(t) {
        ht(this, e),
          (this.id_ = t.id),
          (this.direction_ = t.direction),
          (this.type_ = t.type),
          (this.directionPrefix_ = "local" === this.direction_ ? "" : "*");
      }
      return (
        vt(e, [
          {
            key: "log",
            value: function (e, t) {
              ar[e](
                "["
                  .concat(this.directionPrefix_)
                  .concat(this.id_, "] ")
                  .concat(this.type_, " ")
                  .concat(t)
              );
            },
          },
          {
            key: "info",
            value: function (e) {
              this.log("info", e);
            },
          },
          {
            key: "debug",
            value: function (e) {
              this.log("debug", e);
            },
          },
          {
            key: "warn",
            value: function (e) {
              this.log("warn", e);
            },
          },
          {
            key: "error",
            value: function (e) {
              this.log("error", e);
            },
          },
        ]),
        e
      );
    })(),
    Gp = (function () {
      function e(t) {
        ht(this, e),
          (this.userId_ = t.userId),
          (this.isRemote_ = t.isRemote),
          (this.type_ = t.type),
          (this.log_ = new Fp({
            id: "s|" + this.userId_,
            direction: this.isRemote_ ? "remote" : "local",
            type: this.isRemote_ ? this.type_ : "",
          })),
          (this.mirror_ = !1),
          this.isRemote_ || (this.mirror_ = !0),
          void 0 !== t.mirror && (this.mirror_ = t.mirror),
          (this.client_ = null),
          void 0 !== t.client && (this.client_ = t.client),
          (this.mediaStream_ = null),
          (this.div_ = null),
          (this.isPlaying_ = !1),
          (this.connection_ = null),
          (this.hasAudio_ = !1),
          (this.hasVideo_ = !1),
          (this.audioPlayer_ = null),
          (this.videoPlayer_ = null),
          (this.muted_ = !1),
          (this.objectFit_ = "cover"),
          (this.id_ = sp()),
          (this.audioOutputDeviceId_ = 0),
          (this.audioVolume_ = 1),
          (this.emitter_ = new Bd());
      }
      var t, n, r, i, o;
      return (
        vt(e, [
          {
            key: "getType",
            value: function () {
              return this.type_;
            },
          },
          {
            key: "getIDLogger",
            value: function () {
              return this.log_;
            },
          },
          {
            key: "setConnection",
            value: function (e) {
              this.connection_ !== e && (this.connection_ = e);
            },
          },
          {
            key: "getConnection",
            value: function () {
              return this.connection_;
            },
          },
          {
            key: "play",
            value:
              ((o = ft(
                regeneratorRuntime.mark(function e(t, n) {
                  var r, i;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!this.isPlaying_) {
                              e.next = 2;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_OPERATION,
                              message:
                                "duplicated play() call observed, please stop() firstly",
                            });
                          case 2:
                            if (
                              ((this.isPlaying_ = !0),
                              this.log_.info(
                                "stream start to play with options: ".concat(
                                  JSON.stringify(n)
                                )
                              ),
                              (r = document.createElement("div")).setAttribute(
                                "id",
                                "player_".concat(this.id_)
                              ),
                              r.setAttribute(
                                "style",
                                "width: 100%; height: 100%; position: relative; background-color: black; overflow: hidden;"
                              ),
                              (i = t),
                              "object" !== lt(t) &&
                                (i = document.getElementById(t)),
                              i.appendChild(r),
                              (this.div_ = r),
                              this.isRemote_ || (this.muted_ = !0),
                              n &&
                                void 0 !== n.muted &&
                                (this.muted_ = n.muted),
                              this.isRemote_ &&
                                "auxiliary" === this.getType() &&
                                (this.objectFit_ = "cover"),
                              n &&
                                void 0 !== n.objectFit &&
                                (this.objectFit_ = n.objectFit),
                              !this.hasVideo_)
                            ) {
                              e.next = 18;
                              break;
                            }
                            return (e.next = 18), this.playVideo();
                          case 18:
                            if (!this.hasAudio_) {
                              e.next = 21;
                              break;
                            }
                            return (e.next = 21), this.playAudio();
                          case 21:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e, t) {
                return o.apply(this, arguments);
              }),
          },
          {
            key: "playAudio",
            value:
              ((i = ft(
                regeneratorRuntime.mark(function e() {
                  var t,
                    n = this;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((t = this.getAudioTrack()),
                              this.audioPlayer_ || !t)
                            ) {
                              e.next = 7;
                              break;
                            }
                            return (
                              this.log_.info(
                                "stream - create AudioPlayer and play"
                              ),
                              (this.audioPlayer_ = new Vp({
                                stream: this,
                                track: t,
                                div: this.div_,
                                muted: this.muted_,
                                outputDeviceId: this.audioOutputDeviceId_,
                                volume: this.audioVolume_,
                              })),
                              this.audioPlayer_.on(xp, function (e) {
                                n.emitter_.emit(Ip, {
                                  type: "audio",
                                  state: e.state,
                                  reason: e.reason,
                                });
                              }),
                              (e.next = 7),
                              this.audioPlayer_.play()
                            );
                          case 7:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function () {
                return i.apply(this, arguments);
              }),
          },
          {
            key: "playVideo",
            value:
              ((r = ft(
                regeneratorRuntime.mark(function e() {
                  var t,
                    n = this;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((t = this.getVideoTrack()),
                              this.videoPlayer_ || !t)
                            ) {
                              e.next = 7;
                              break;
                            }
                            return (
                              this.log_.info(
                                "stream - create VideoPlayer and play"
                              ),
                              (this.videoPlayer_ = new Up({
                                stream: this,
                                track: t,
                                div: this.div_,
                                muted: this.muted_,
                                objectFit: this.objectFit_,
                                mirror: this.mirror_,
                              })),
                              this.videoPlayer_.on(xp, function (e) {
                                n.emitter_.emit(Ip, {
                                  type: "video",
                                  state: e.state,
                                  reason: e.reason,
                                });
                              }),
                              (e.next = 7),
                              this.videoPlayer_.play()
                            );
                          case 7:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function () {
                return r.apply(this, arguments);
              }),
          },
          {
            key: "stopAudio",
            value: function () {
              this.audioPlayer_ &&
                (this.log_.info("stream - stop AudioPlayer"),
                this.audioPlayer_.stop(),
                (this.audioPlayer_ = null));
            },
          },
          {
            key: "stopVideo",
            value: function () {
              this.videoPlayer_ &&
                (this.log_.info("stream - stop VideoPlayer"),
                this.videoPlayer_.stop(),
                (this.videoPlayer_ = null));
            },
          },
          {
            key: "restartAudio",
            value: function () {
              this.isPlaying_ && (this.stopAudio(), this.playAudio());
            },
          },
          {
            key: "restartVideo",
            value: function () {
              this.isPlaying_ && (this.stopVideo(), this.playVideo());
            },
          },
          {
            key: "stop",
            value: function () {
              this.isPlaying_ &&
                ((this.isPlaying_ = !1),
                this.stopAudio(),
                this.stopVideo(),
                this.div_.parentNode.removeChild(this.div_));
            },
          },
          {
            key: "resume",
            value:
              ((n = ft(
                regeneratorRuntime.mark(function e() {
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (this.isPlaying_) {
                              e.next = 2;
                              break;
                            }
                            return e.abrupt("return");
                          case 2:
                            if (
                              (this.log_.info("stream - resume"),
                              !this.audioPlayer_)
                            ) {
                              e.next = 6;
                              break;
                            }
                            return (e.next = 6), this.audioPlayer_.resume();
                          case 6:
                            if (!this.videoPlayer_) {
                              e.next = 9;
                              break;
                            }
                            return (e.next = 9), this.videoPlayer_.resume();
                          case 9:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function () {
                return n.apply(this, arguments);
              }),
          },
          {
            key: "close",
            value: function () {
              this.isPlaying_ && this.stop(),
                this.mediaStream_ &&
                  ((this.mediaStream_.preventEvent = 1),
                  this.mediaStream_.getTracks().forEach(function (e) {
                    e.stop();
                  }),
                  (this.mediaStream_ = null));
            },
          },
          {
            key: "muteAudio",
            value: function () {
              return (
                this.addRemoteEvent(!0, "audio"),
                this.doEnableTrack("audio", !1)
              );
            },
          },
          {
            key: "muteVideo",
            value: function () {
              return (
                this.addRemoteEvent(!0, "video"),
                this.doEnableTrack("video", !1)
              );
            },
          },
          {
            key: "unmuteAudio",
            value: function () {
              return (
                this.addRemoteEvent(!1, "audio"),
                this.doEnableTrack("audio", !0)
              );
            },
          },
          {
            key: "unmuteVideo",
            value: function () {
              return (
                this.addRemoteEvent(!1, "video"),
                this.doEnableTrack("video", !0)
              );
            },
          },
          {
            key: "addRemoteEvent",
            value: function (e, t) {
              if (this.isRemote_ && this.client_) {
                var n = this.client_.getUserId(),
                  r = "".concat(e ? "mute" : "unmute", " remote ").concat(t);
                Ul(n, {
                  eventId: "audio" === t ? (e ? Pl : Al) : e ? Il : xl,
                  eventDesc: r,
                  timestamp: new Date().getTime(),
                  userId: n,
                  tinyId: this.client_.getTinyId(),
                  remoteUserId: this.userId_,
                  remoteTinyId: this.connection_.getTinyId(),
                });
              }
            },
          },
          {
            key: "doEnableTrack",
            value: function (e, t) {
              var n = !1;
              return (
                "audio" === e
                  ? this.mediaStream_.getAudioTracks().forEach(function (e) {
                      (n = !0), (e.enabled = t);
                    })
                  : this.mediaStream_.getVideoTracks().forEach(function (e) {
                      (n = !0), (e.enabled = t);
                    }),
                n
              );
            },
          },
          {
            key: "getId",
            value: function () {
              return this.id_;
            },
          },
          {
            key: "getUserId",
            value: function () {
              return this.userId_;
            },
          },
          {
            key: "isPlaying",
            value: function () {
              return this.isPlaying_;
            },
          },
          {
            key: "setAudioOutput",
            value:
              ((t = ft(
                regeneratorRuntime.mark(function e(t) {
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((this.audioOutputDeviceId_ = t),
                              !this.audioPlayer_)
                            ) {
                              e.next = 4;
                              break;
                            }
                            return (e.next = 4), this.audioPlayer_.setSinkId(t);
                          case 4:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return t.apply(this, arguments);
              }),
          },
          {
            key: "setAudioVolume",
            value: function (e) {
              (this.audioVolume_ = e),
                this.log_.info("setAudioVolume to ".concat(e)),
                this.audioPlayer_ && this.audioPlayer_.setVolume(e);
            },
          },
          {
            key: "getAudioLevel",
            value: function () {
              var e = 0;
              return (
                this.audioPlayer_ && (e = this.audioPlayer_.getAudioLevel()), e
              );
            },
          },
          {
            key: "hasAudio",
            value: function () {
              return this.hasAudio_;
            },
          },
          {
            key: "hasVideo",
            value: function () {
              return this.hasVideo_;
            },
          },
          {
            key: "getAudioTrack",
            value: function () {
              var e = null;
              if (this.mediaStream_) {
                var t = this.mediaStream_.getAudioTracks();
                t.length > 0 && (e = t[0]);
              }
              return e;
            },
          },
          {
            key: "getVideoTrack",
            value: function () {
              var e = null;
              if (this.mediaStream_) {
                var t = this.mediaStream_.getVideoTracks();
                t.length > 0 && (e = t[0]);
              }
              return e;
            },
          },
          {
            key: "getVideoFrame",
            value: function () {
              return this.videoPlayer_
                ? this.videoPlayer_.getVideoFrame()
                : null;
            },
          },
          {
            key: "getMediaStream",
            value: function () {
              return this.mediaStream_;
            },
          },
          {
            key: "setMediaStream",
            value: function (e) {
              e !== this.mediaStream_ &&
                (this.mediaStream_ &&
                  this.mediaStream_.getTracks().forEach(function (e) {
                    return e.stop();
                  }),
                (this.mediaStream_ = e));
            },
          },
          {
            key: "setHasVideo",
            value: function (e) {
              (this.hasVideo_ = e),
                this.isPlaying_ &&
                  (e
                    ? (this.log_.info("stream updated, play video"),
                      this.playVideo())
                    : (this.log_.info("stream updated, stop video"),
                      this.stopVideo()));
            },
          },
          {
            key: "setHasAudio",
            value: function (e) {
              (this.hasAudio_ = e),
                this.isPlaying_ &&
                  (e
                    ? (this.log_.info("stream updated, play audio"),
                      this.playAudio())
                    : (this.log_.info("stream updated, stop audio"),
                      this.stopAudio()));
            },
          },
          {
            key: "on",
            value: function (e, t) {
              this.emitter_.on(e, t);
            },
          },
          {
            key: "isRemote",
            value: function () {
              return this.isRemote_;
            },
          },
        ]),
        e
      );
    })(),
    Bp = (function (e) {
      function t(e) {
        var n;
        ht(this, t);
        var r = _t({}, e, { isRemote: !0, type: e.type });
        return (
          ((n = Tt(this, St(t).call(this, r))).isInSubscriptionCycle_ = !1), n
        );
      }
      return (
        yt(t, Gp),
        vt(t, [
          {
            key: "getType",
            value: function () {
              return wt(St(t.prototype), "getType", this).call(this);
            },
          },
          {
            key: "setInSubscriptionCycle",
            value: function (e) {
              this.isInSubscriptionCycle_ = e;
            },
          },
          {
            key: "isInSubscriptionCycle",
            value: function () {
              return this.isInSubscriptionCycle_;
            },
          },
        ]),
        t
      );
    })(),
    Hp = t(function (e) {
      var t = (e.exports = {
        v: [{ name: "version", reg: /^(\d*)$/ }],
        o: [
          {
            name: "origin",
            reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
            names: [
              "username",
              "sessionId",
              "sessionVersion",
              "netType",
              "ipVer",
              "address",
            ],
            format: "%s %s %d %s IP%d %s",
          },
        ],
        s: [{ name: "name" }],
        i: [{ name: "description" }],
        u: [{ name: "uri" }],
        e: [{ name: "email" }],
        p: [{ name: "phone" }],
        z: [{ name: "timezones" }],
        r: [{ name: "repeats" }],
        t: [
          {
            name: "timing",
            reg: /^(\d*) (\d*)/,
            names: ["start", "stop"],
            format: "%d %d",
          },
        ],
        c: [
          {
            name: "connection",
            reg: /^IN IP(\d) (\S*)/,
            names: ["version", "ip"],
            format: "IN IP%d %s",
          },
        ],
        b: [
          {
            push: "bandwidth",
            reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
            names: ["type", "limit"],
            format: "%s:%s",
          },
        ],
        m: [
          {
            reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
            names: ["type", "port", "protocol", "payloads"],
            format: "%s %d %s %s",
          },
        ],
        a: [
          {
            push: "rtp",
            reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
            names: ["payload", "codec", "rate", "encoding"],
            format: function (e) {
              return e.encoding
                ? "rtpmap:%d %s/%s/%s"
                : e.rate
                ? "rtpmap:%d %s/%s"
                : "rtpmap:%d %s";
            },
          },
          {
            push: "fmtp",
            reg: /^fmtp:(\d*) ([\S| ]*)/,
            names: ["payload", "config"],
            format: "fmtp:%d %s",
          },
          { name: "control", reg: /^control:(.*)/, format: "control:%s" },
          {
            name: "rtcp",
            reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
            names: ["port", "netType", "ipVer", "address"],
            format: function (e) {
              return null != e.address ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
            },
          },
          {
            push: "rtcpFbTrrInt",
            reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
            names: ["payload", "value"],
            format: "rtcp-fb:%d trr-int %d",
          },
          {
            push: "rtcpFb",
            reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
            names: ["payload", "type", "subtype"],
            format: function (e) {
              return null != e.subtype ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
            },
          },
          {
            push: "ext",
            reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
            names: ["value", "direction", "encrypt-uri", "uri", "config"],
            format: function (e) {
              return (
                "extmap:%d" +
                (e.direction ? "/%s" : "%v") +
                (e["encrypt-uri"] ? " %s" : "%v") +
                " %s" +
                (e.config ? " %s" : "")
              );
            },
          },
          {
            push: "crypto",
            reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
            names: ["id", "suite", "config", "sessionConfig"],
            format: function (e) {
              return null != e.sessionConfig
                ? "crypto:%d %s %s %s"
                : "crypto:%d %s %s";
            },
          },
          { name: "setup", reg: /^setup:(\w*)/, format: "setup:%s" },
          { name: "mid", reg: /^mid:([^\s]*)/, format: "mid:%s" },
          { name: "msid", reg: /^msid:(.*)/, format: "msid:%s" },
          { name: "ptime", reg: /^ptime:(\d*)/, format: "ptime:%d" },
          { name: "maxptime", reg: /^maxptime:(\d*)/, format: "maxptime:%d" },
          { name: "direction", reg: /^(sendrecv|recvonly|sendonly|inactive)/ },
          { name: "icelite", reg: /^(ice-lite)/ },
          { name: "iceUfrag", reg: /^ice-ufrag:(\S*)/, format: "ice-ufrag:%s" },
          { name: "icePwd", reg: /^ice-pwd:(\S*)/, format: "ice-pwd:%s" },
          {
            name: "fingerprint",
            reg: /^fingerprint:(\S*) (\S*)/,
            names: ["type", "hash"],
            format: "fingerprint:%s %s",
          },
          {
            push: "candidates",
            reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
            names: [
              "foundation",
              "component",
              "transport",
              "priority",
              "ip",
              "port",
              "type",
              "raddr",
              "rport",
              "tcptype",
              "generation",
              "network-id",
              "network-cost",
            ],
            format: function (e) {
              var t = "candidate:%s %d %s %d %s %d typ %s";
              return (
                (t += null != e.raddr ? " raddr %s rport %d" : "%v%v"),
                (t += null != e.tcptype ? " tcptype %s" : "%v"),
                null != e.generation && (t += " generation %d"),
                (t += null != e["network-id"] ? " network-id %d" : "%v"),
                (t += null != e["network-cost"] ? " network-cost %d" : "%v")
              );
            },
          },
          { name: "endOfCandidates", reg: /^(end-of-candidates)/ },
          {
            name: "remoteCandidates",
            reg: /^remote-candidates:(.*)/,
            format: "remote-candidates:%s",
          },
          {
            name: "iceOptions",
            reg: /^ice-options:(\S*)/,
            format: "ice-options:%s",
          },
          {
            push: "ssrcs",
            reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
            names: ["id", "attribute", "value"],
            format: function (e) {
              var t = "ssrc:%d";
              return (
                null != e.attribute &&
                  ((t += " %s"), null != e.value && (t += ":%s")),
                t
              );
            },
          },
          {
            push: "ssrcGroups",
            reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
            names: ["semantics", "ssrcs"],
            format: "ssrc-group:%s %s",
          },
          {
            name: "msidSemantic",
            reg: /^msid-semantic:\s?(\w*) (\S*)/,
            names: ["semantic", "token"],
            format: "msid-semantic: %s %s",
          },
          {
            push: "groups",
            reg: /^group:(\w*) (.*)/,
            names: ["type", "mids"],
            format: "group:%s %s",
          },
          { name: "rtcpMux", reg: /^(rtcp-mux)/ },
          { name: "rtcpRsize", reg: /^(rtcp-rsize)/ },
          {
            name: "sctpmap",
            reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
            names: ["sctpmapNumber", "app", "maxMessageSize"],
            format: function (e) {
              return null != e.maxMessageSize
                ? "sctpmap:%s %s %s"
                : "sctpmap:%s %s";
            },
          },
          {
            name: "xGoogleFlag",
            reg: /^x-google-flag:([^\s]*)/,
            format: "x-google-flag:%s",
          },
          {
            push: "rids",
            reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
            names: ["id", "direction", "params"],
            format: function (e) {
              return e.params ? "rid:%s %s %s" : "rid:%s %s";
            },
          },
          {
            push: "imageattrs",
            reg: new RegExp(
              "^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"
            ),
            names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
            format: function (e) {
              return "imageattr:%s %s %s" + (e.dir2 ? " %s %s" : "");
            },
          },
          {
            name: "simulcast",
            reg: new RegExp(
              "^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"
            ),
            names: ["dir1", "list1", "dir2", "list2"],
            format: function (e) {
              return "simulcast:%s %s" + (e.dir2 ? " %s %s" : "");
            },
          },
          {
            name: "simulcast_03",
            reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
            names: ["value"],
            format: "simulcast: %s",
          },
          {
            name: "framerate",
            reg: /^framerate:(\d+(?:$|\.\d+))/,
            format: "framerate:%s",
          },
          {
            name: "sourceFilter",
            reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
            names: [
              "filterMode",
              "netType",
              "addressTypes",
              "destAddress",
              "srcList",
            ],
            format: "source-filter: %s %s %s %s %s",
          },
          { name: "bundleOnly", reg: /^(bundle-only)/ },
          { name: "label", reg: /^label:(.+)/, format: "label:%s" },
          {
            name: "sctpPort",
            reg: /^sctp-port:(\d+)$/,
            format: "sctp-port:%s",
          },
          {
            name: "maxMessageSize",
            reg: /^max-message-size:(\d+)$/,
            format: "max-message-size:%s",
          },
          { push: "invalid", names: ["value"] },
        ],
      });
      Object.keys(t).forEach(function (e) {
        t[e].forEach(function (e) {
          e.reg || (e.reg = /(.*)/), e.format || (e.format = "%s");
        });
      });
    }),
    zp =
      (Hp.v,
      Hp.o,
      Hp.s,
      Hp.i,
      Hp.u,
      Hp.e,
      Hp.p,
      Hp.z,
      Hp.r,
      Hp.t,
      Hp.c,
      Hp.b,
      Hp.m,
      Hp.a,
      t(function (e, t) {
        var n = function (e) {
            return String(Number(e)) === e ? Number(e) : e;
          },
          r = function (e, t, r) {
            var i = e.name && e.names;
            e.push && !t[e.push]
              ? (t[e.push] = [])
              : i && !t[e.name] && (t[e.name] = {});
            var o = e.push ? {} : i ? t[e.name] : t;
            !(function (e, t, r, i) {
              if (i && !r) t[i] = n(e[1]);
              else
                for (var o = 0; o < r.length; o += 1)
                  null != e[o + 1] && (t[r[o]] = n(e[o + 1]));
            })(r.match(e.reg), o, e.names, e.name),
              e.push && t[e.push].push(o);
          },
          i = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
        t.parse = function (e) {
          var t = {},
            n = [],
            o = t;
          return (
            e
              .split(/(\r\n|\r|\n)/)
              .filter(i)
              .forEach(function (e) {
                var t = e[0],
                  i = e.slice(2);
                "m" === t &&
                  (n.push({ rtp: [], fmtp: [] }), (o = n[n.length - 1]));
                for (var a = 0; a < (Hp[t] || []).length; a += 1) {
                  var s = Hp[t][a];
                  if (s.reg.test(i)) return r(s, o, i);
                }
              }),
            (t.media = n),
            t
          );
        };
        var o = function (e, t) {
          var r = t.split(/=(.+)/, 2);
          return (
            2 === r.length
              ? (e[r[0]] = n(r[1]))
              : 1 === r.length && t.length > 1 && (e[r[0]] = void 0),
            e
          );
        };
        (t.parseParams = function (e) {
          return e.split(/;\s?/).reduce(o, {});
        }),
          (t.parseFmtpConfig = t.parseParams),
          (t.parsePayloads = function (e) {
            return e.toString().split(" ").map(Number);
          }),
          (t.parseRemoteCandidates = function (e) {
            for (
              var t = [], r = e.split(" ").map(n), i = 0;
              i < r.length;
              i += 3
            )
              t.push({ component: r[i], ip: r[i + 1], port: r[i + 2] });
            return t;
          }),
          (t.parseImageAttributes = function (e) {
            return e.split(" ").map(function (e) {
              return e
                .substring(1, e.length - 1)
                .split(",")
                .reduce(o, {});
            });
          }),
          (t.parseSimulcastStreamList = function (e) {
            return e.split(";").map(function (e) {
              return e.split(",").map(function (e) {
                var t,
                  r = !1;
                return (
                  "~" !== e[0]
                    ? (t = n(e))
                    : ((t = n(e.substring(1, e.length))), (r = !0)),
                  { scid: t, paused: r }
                );
              });
            });
          });
      })),
    Wp =
      (zp.parse,
      zp.parseParams,
      zp.parseFmtpConfig,
      zp.parsePayloads,
      zp.parseRemoteCandidates,
      zp.parseImageAttributes,
      zp.parseSimulcastStreamList,
      /%[sdv%]/g),
    Jp = function (e) {
      var t = 1,
        n = arguments,
        r = n.length;
      return e.replace(Wp, function (e) {
        if (t >= r) return e;
        var i = n[t];
        switch (((t += 1), e)) {
          case "%%":
            return "%";
          case "%s":
            return String(i);
          case "%d":
            return Number(i);
          case "%v":
            return "";
        }
      });
    },
    qp = function (e, t, n) {
      var r = [
        e +
          "=" +
          (t.format instanceof Function
            ? t.format(t.push ? n : n[t.name])
            : t.format),
      ];
      if (t.names)
        for (var i = 0; i < t.names.length; i += 1) {
          var o = t.names[i];
          t.name ? r.push(n[t.name][o]) : r.push(n[t.names[i]]);
        }
      else r.push(n[t.name]);
      return Jp.apply(null, r);
    },
    Kp = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"],
    $p = ["i", "c", "b", "a"],
    Yp = {
      write: function (e, t) {
        (t = t || {}),
          null == e.version && (e.version = 0),
          null == e.name && (e.name = " "),
          e.media.forEach(function (e) {
            null == e.payloads && (e.payloads = "");
          });
        var n = t.outerOrder || Kp,
          r = t.innerOrder || $p,
          i = [];
        return (
          n.forEach(function (t) {
            Hp[t].forEach(function (n) {
              n.name in e && null != e[n.name]
                ? i.push(qp(t, n, e))
                : n.push in e &&
                  null != e[n.push] &&
                  e[n.push].forEach(function (e) {
                    i.push(qp(t, n, e));
                  });
            });
          }),
          e.media.forEach(function (e) {
            i.push(qp("m", Hp.m[0], e)),
              r.forEach(function (t) {
                Hp[t].forEach(function (n) {
                  n.name in e && null != e[n.name]
                    ? i.push(qp(t, n, e))
                    : n.push in e &&
                      null != e[n.push] &&
                      e[n.push].forEach(function (e) {
                        i.push(qp(t, n, e));
                      });
                });
              });
          }),
          i.join("\r\n") + "\r\n"
        );
      },
      parse: zp.parse,
      parseFmtpConfig: zp.parseFmtpConfig,
      parseParams: zp.parseParams,
      parsePayloads: zp.parsePayloads,
      parseRemoteCandidates: zp.parseRemoteCandidates,
      parseImageAttributes: zp.parseImageAttributes,
      parseSimulcastStreamList: zp.parseSimulcastStreamList,
    },
    Qp = function (e) {
      return Yp.parse(e);
    },
    Xp = function (e) {
      return (e >> 16) & 255;
    },
    Zp = (function () {
      function e(t) {
        ht(this, e), (this.prevReport_ = {});
      }
      var t, n, r, i;
      return (
        vt(e, [
          {
            key: "getSenderStats",
            value:
              ((i = ft(
                regeneratorRuntime.mark(function e(t) {
                  var n, r;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((n = {
                                audio: {
                                  bytesSent: 0,
                                  packetsSent: 0,
                                  audioLevel: 0,
                                  totalAudioEnergy: 0,
                                },
                                video: {
                                  bytesSent: 0,
                                  packetsSent: 0,
                                  framesEncoded: 0,
                                  frameWidth: 0,
                                  frameHeight: 0,
                                  framesSent: 0,
                                },
                                rtt: 0,
                              }),
                              !(r = t.getPeerConnection()))
                            ) {
                              e.next = 13;
                              break;
                            }
                            return (e.prev = 3), (e.next = 6), r.getStats();
                          case 6:
                            e.sent.forEach(function (e) {
                              "outbound-rtp" === e.type
                                ? "video" === e.mediaType
                                  ? ((n.video.bytesSent = e.bytesSent),
                                    (n.video.packetsSent = e.packetsSent),
                                    (n.video.framesEncoded = e.framesEncoded))
                                  : "audio" === e.mediaType &&
                                    ((n.audio.bytesSent = e.bytesSent),
                                    (n.audio.packetsSent = e.packetsSent))
                                : "candidate-pair" === e.type
                                ? (n.rtt = 1e3 * e.currentRoundTripTime)
                                : "track" === e.type
                                ? ("undefined" !== e.frameWidth &&
                                    ((n.video.frameWidth = e.frameWidth),
                                    (n.video.frameHeight = e.frameHeight),
                                    (n.video.framesSent = e.framesSent)),
                                  void 0 !== e.audioLevel &&
                                    (n.audio.audioLevel = e.audioLevel || 0))
                                : "media-source" === e.type &&
                                  "audio" === e.kind &&
                                  ((n.audio.audioLevel = e.audioLevel || 0),
                                  (n.audio.totalAudioEnergy =
                                    e.totalAudioEnergy || 0));
                            }),
                              (e.next = 13);
                            break;
                          case 10:
                            (e.prev = 10),
                              (e.t0 = e.catch(3)),
                              ar.warn(
                                "failed to getStats on sender connection"
                              );
                          case 13:
                            return e.abrupt("return", n);
                          case 14:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[3, 10]]
                  );
                })
              )),
              function (e) {
                return i.apply(this, arguments);
              }),
          },
          {
            key: "getReceiverStats",
            value:
              ((r = ft(
                regeneratorRuntime.mark(function e(t) {
                  var n, r;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((n = {
                                tinyId: t.getTinyId(),
                                userId: t.getUserId(),
                                hasAudio: !1,
                                hasVideo: !1,
                                audio: {
                                  bytesReceived: 0,
                                  packetsReceived: 0,
                                  packetsLost: 0,
                                  jitter: 0,
                                  audioLevel: 0,
                                  totalAudioEnergy: 0,
                                },
                                video: {
                                  bytesReceived: 0,
                                  packetsReceived: 0,
                                  packetsLost: 0,
                                  framesDecoded: 0,
                                  frameWidth: 0,
                                  frameHeight: 0,
                                },
                              }),
                              !(r = t.getPeerConnection()))
                            ) {
                              e.next = 13;
                              break;
                            }
                            return (e.prev = 3), (e.next = 6), r.getStats();
                          case 6:
                            e.sent.forEach(function (e) {
                              "inbound-rtp" === e.type
                                ? "audio" === e.mediaType
                                  ? ((n.audio.packetsReceived =
                                      e.packetsReceived),
                                    (n.audio.bytesReceived = e.bytesReceived),
                                    (n.audio.packetsLost = e.packetsLost),
                                    (n.audio.jitter = e.jitter),
                                    (n.hasAudio = !0))
                                  : "video" === e.mediaType &&
                                    ((n.video.packetsReceived =
                                      e.packetsReceived),
                                    (n.video.bytesReceived = e.bytesReceived),
                                    (n.video.packetsLost = e.packetsLost),
                                    (n.video.framesDecoded = e.framesDecoded),
                                    (n.hasVideo = !0))
                                : "track" === e.type &&
                                  (void 0 !== e.frameWidth &&
                                    ((n.video.frameWidth = e.frameWidth),
                                    (n.video.frameHeight = e.frameHeight)),
                                  "audio" === e.kind &&
                                    ((n.audio.audioLevel = e.audioLevel || 0),
                                    (n.audio.totalAudioEnergy =
                                      e.totalAudioEnergy || 0)));
                            }),
                              (e.next = 13);
                            break;
                          case 10:
                            (e.prev = 10),
                              (e.t0 = e.catch(3)),
                              ar.warn(
                                "failed to getStats on receiver connection"
                              );
                          case 13:
                            return e.abrupt("return", n);
                          case 14:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[3, 10]]
                  );
                })
              )),
              function (e) {
                return r.apply(this, arguments);
              }),
          },
          {
            key: "getStats",
            value:
              ((n = ft(
                regeneratorRuntime.mark(function e(t, n) {
                  var r, i, o, a, s, c, u, d, l, p;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (((r = {}), !t)) {
                              e.next = 5;
                              break;
                            }
                            return (e.next = 4), this.getSenderStats(t);
                          case 4:
                            r = e.sent;
                          case 5:
                            (i = []),
                              (o = !0),
                              (a = !1),
                              (s = void 0),
                              (e.prev = 9),
                              (c = n[Symbol.iterator]());
                          case 11:
                            if ((o = (u = c.next()).done)) {
                              e.next = 20;
                              break;
                            }
                            return (
                              (d = Ct(u.value, 2))[0],
                              (l = d[1]),
                              (e.next = 15),
                              this.getReceiverStats(l)
                            );
                          case 15:
                            (p = e.sent), i.push(p);
                          case 17:
                            (o = !0), (e.next = 11);
                            break;
                          case 20:
                            e.next = 26;
                            break;
                          case 22:
                            (e.prev = 22),
                              (e.t0 = e.catch(9)),
                              (a = !0),
                              (s = e.t0);
                          case 26:
                            (e.prev = 26),
                              (e.prev = 27),
                              o || null == c.return || c.return();
                          case 29:
                            if (((e.prev = 29), !a)) {
                              e.next = 32;
                              break;
                            }
                            throw s;
                          case 32:
                            return e.finish(29);
                          case 33:
                            return e.finish(26);
                          case 34:
                            return e.abrupt("return", {
                              senderStats: r,
                              receiverStats: i,
                            });
                          case 35:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [
                      [9, 22, 26, 34],
                      [27, , 29, 33],
                    ]
                  );
                })
              )),
              function (e, t) {
                return n.apply(this, arguments);
              }),
          },
          {
            key: "prepareReport",
            value: function (e, t) {
              Fd(e.senderStats) ||
                ((t.uint32_delay = e.senderStats.rtt),
                (t.AudioReportState.sentAudioLevel =
                  e.senderStats.audio.audioLevel),
                (t.AudioReportState.sentAudioEnergy =
                  e.senderStats.audio.totalAudioEnergy),
                (t.AudioReportState.uint32_audio_enc_pkg_br =
                  e.senderStats.audio.bytesSent),
                (t.VideoReportState.uint32_video_snd_br =
                  e.senderStats.video.bytesSent),
                (t.VideoReportState.uint32_send_total_pkg =
                  e.senderStats.video.packetsSent),
                (t.VideoReportState.VideoEncState[0].uint32_enc_width =
                  e.senderStats.video.frameWidth),
                (t.VideoReportState.VideoEncState[0].uint32_enc_height =
                  e.senderStats.video.frameHeight),
                (t.VideoReportState.VideoEncState[0].uint32_enc_fps =
                  e.senderStats.video.framesSent)),
                e.receiverStats.forEach(function (e) {
                  e.hasAudio &&
                    (t.AudioReportState.AudioDecState.push({
                      uint32_audio_delay: 0,
                      uint32_audio_jitter: e.audio.jitter,
                      uint32_audio_real_recv_pkg: e.audio.packetsReceived,
                      uint32_audio_flow: e.audio.bytesReceived,
                      uint32_audio_real_recv_br: 0,
                      uint64_sender_uin: e.tinyId,
                      packetsLost: e.audio.packetsLost,
                      totalPacketsLost: e.audio.packetsLost,
                      audioLevel: e.audio.audioLevel,
                      audioEnergy: e.audio.totalAudioEnergy,
                    }),
                    (t.AudioReportState.uint32_audio_real_recv_pkg +=
                      e.audio.packetsReceived),
                    (t.AudioReportState.uint32_audio_flow +=
                      e.audio.bytesReceived),
                    (t.uint32_real_num += e.audio.packetsReceived)),
                    e.hasVideo &&
                      (t.VideoReportState.VideoDecState.push({
                        uint32_video_recv_fps: e.video.framesDecoded,
                        uint32_video_recv_br: e.video.bytesReceived,
                        uint32_video_real_recv_pkg: e.video.packetsReceived,
                        uint32_dec_height: e.video.frameHeight,
                        uint32_dec_width: e.video.frameWidth,
                        uint32_video_jitter: 0,
                        uint64_sender_uin: e.tinyId,
                        packetsLost: e.video.packetsLost,
                        totalPacketsLost: e.video.packetsLost,
                      }),
                      (t.VideoReportState.uint32_video_total_real_recv_pkg +=
                        e.video.packetsReceived),
                      (t.VideoReportState.uint32_video_rcv_br +=
                        e.video.bytesReceived));
                }),
                (t.uint64_end_utime = new Date().getTime());
              var n = this.prevReport_;
              if (((this.prevReport_ = JSON.parse(JSON.stringify(t))), Fd(n)))
                (t.AudioReportState.uint32_audio_enc_pkg_br =
                  (8 * t.AudioReportState.uint32_audio_enc_pkg_br) / 2),
                  (t.VideoReportState.uint32_video_rcv_br =
                    (8 * t.VideoReportState.uint32_video_rcv_br) / 2),
                  (t.VideoReportState.uint32_video_snd_br =
                    (8 * t.VideoReportState.uint32_video_snd_br) / 2),
                  t.VideoReportState.VideoDecState.forEach(function (e) {
                    (e.uint32_video_recv_br = (8 * e.uint32_video_recv_br) / 2),
                      (t.uint32_total_send_bps =
                        t.AudioReportState.uint32_audio_enc_pkg_br +
                        t.VideoReportState.uint32_video_snd_br);
                  });
              else {
                (t.uint64_begine_utime = n.uint64_end_utime),
                  (t.uint32_real_num -= n.uint32_real_num),
                  t.uint32_real_num <= 0 && (t.uint32_real_num = 0),
                  (t.AudioReportState.uint32_audio_real_recv_pkg -=
                    n.AudioReportState.uint32_audio_real_recv_pkg),
                  t.AudioReportState.uint32_audio_real_recv_pkg <= 0 &&
                    (t.AudioReportState.uint32_audio_real_recv_pkg = 0),
                  (t.AudioReportState.uint32_audio_enc_pkg_br -=
                    n.AudioReportState.uint32_audio_enc_pkg_br),
                  t.AudioReportState.uint32_audio_enc_pkg_br <= 0 &&
                    (t.AudioReportState.uint32_audio_enc_pkg_br = 0),
                  (t.AudioReportState.uint32_audio_enc_pkg_br =
                    (8 * t.AudioReportState.uint32_audio_enc_pkg_br) / 2),
                  (t.VideoReportState.uint32_video_snd_br -=
                    n.VideoReportState.uint32_video_snd_br),
                  t.VideoReportState.uint32_video_snd_br <= 0 &&
                    (t.VideoReportState.uint32_video_snd_br = 0),
                  (t.VideoReportState.uint32_video_snd_br =
                    (8 * t.VideoReportState.uint32_video_snd_br) / 2),
                  (t.AudioReportState.uint32_audio_flow -=
                    n.AudioReportState.uint32_audio_flow),
                  t.AudioReportState.uint32_audio_flow <= 0 &&
                    (t.AudioReportState.uint32_audio_flow = 0),
                  (t.VideoReportState.uint32_send_total_pkg -=
                    n.VideoReportState.uint32_send_total_pkg),
                  t.VideoReportState.uint32_send_total_pkg <= 0 &&
                    (t.VideoReportState.uint32_send_total_pkg = 0),
                  (t.VideoReportState.uint32_video_rcv_br -=
                    n.VideoReportState.uint32_video_rcv_br),
                  t.VideoReportState.uint32_video_rcv_br <= 0 &&
                    (t.VideoReportState.uint32_video_rcv_br = 0),
                  (t.VideoReportState.uint32_video_rcv_br =
                    (8 * t.VideoReportState.uint32_video_rcv_br) / 2),
                  (t.VideoReportState.uint32_video_total_real_recv_pkg -=
                    n.VideoReportState.uint32_video_total_real_recv_pkg),
                  t.VideoReportState.uint32_video_total_real_recv_pkg <= 0 &&
                    (t.VideoReportState.uint32_video_total_real_recv_pkg = 0),
                  (t.VideoReportState.VideoEncState[0].uint32_enc_fps -=
                    n.VideoReportState.VideoEncState[0].uint32_enc_fps),
                  t.VideoReportState.VideoEncState[0].uint32_enc_fps < 0 &&
                    (t.VideoReportState.VideoEncState[0].uint32_enc_fps = 0),
                  (t.VideoReportState.VideoEncState[0].uint32_enc_fps =
                    t.VideoReportState.VideoEncState[0].uint32_enc_fps / 2);
                for (
                  var r = t.VideoReportState.VideoDecState.length, i = 0;
                  i < r;
                  i++
                ) {
                  for (
                    var o = t.VideoReportState.VideoDecState[i],
                      a = o.uint64_sender_uin,
                      s = o.uint32_video_real_recv_pkg,
                      c = o.uint32_video_recv_br,
                      u = o.uint32_video_recv_fps,
                      d = 0;
                    d < n.VideoReportState.VideoDecState.length;
                    d++
                  ) {
                    var l = n.VideoReportState.VideoDecState[d];
                    if (l.uint64_sender_uin === a) {
                      (o.packetsLost = o.totalPacketsLost - l.totalPacketsLost),
                        (s -= l.uint32_video_real_recv_pkg) <= 0 && (s = 0),
                        (c -= l.uint32_video_recv_br) <= 0 && (c = 0),
                        (u -= l.uint32_video_recv_fps) < 0 && (u = 0);
                      break;
                    }
                  }
                  (t.VideoReportState.VideoDecState[
                    i
                  ].uint32_video_real_recv_pkg = s),
                    (t.VideoReportState.VideoDecState[i].uint32_video_recv_br =
                      (8 * c) / 2),
                    (t.VideoReportState.VideoDecState[i].uint32_video_recv_fps =
                      u / 2);
                }
                r = t.AudioReportState.AudioDecState.length;
                for (var p = 0; p < r; p++) {
                  for (
                    var f = t.AudioReportState.AudioDecState[p],
                      h = f.uint32_audio_real_recv_pkg,
                      m = f.uint32_audio_flow,
                      v = f.uint64_sender_uin,
                      g = 0;
                    g < n.AudioReportState.AudioDecState.length;
                    g++
                  ) {
                    var _ = n.AudioReportState.AudioDecState[g];
                    if (_.uint64_sender_uin === v) {
                      (f.packetsLost = f.totalPacketsLost - _.totalPacketsLost),
                        (h -= _.uint32_audio_real_recv_pkg) <= 0 && (h = 0),
                        (m -= _.uint32_audio_flow) <= 0 && (m = 0);
                      break;
                    }
                  }
                  (t.AudioReportState.AudioDecState[
                    p
                  ].uint32_audio_real_recv_pkg = h),
                    (t.AudioReportState.AudioDecState[p].uint32_audio_flow = m),
                    (t.AudioReportState.AudioDecState[
                      p
                    ].uint32_audio_real_recv_br = (8 * m) / 2);
                }
                (t.AudioReportState.uint32_audio_real_recv_br =
                  (8 * t.AudioReportState.uint32_audio_flow) / 2),
                  (t.uint32_real_num =
                    t.AudioReportState.uint32_audio_real_recv_pkg +
                    t.VideoReportState.uint32_video_total_real_recv_pkg),
                  (t.uint32_total_send_bps =
                    t.AudioReportState.uint32_audio_enc_pkg_br +
                    t.VideoReportState.uint32_video_snd_br),
                  (t.uint32_total_recv_bps =
                    t.AudioReportState.uint32_audio_real_recv_br +
                    t.VideoReportState.uint32_video_rcv_br);
              }
              return t;
            },
          },
          {
            key: "getStatsReport",
            value:
              ((t = ft(
                regeneratorRuntime.mark(function e(t, n) {
                  var r, i;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (r = {
                                uint64_begine_utime: new Date().getTime(),
                                uint64_end_utime: 0,
                                uint32_real_num: 0,
                                uint32_delay: 0,
                                uint32_CPU_curfreq: 0,
                                uint32_total_send_bps: 0,
                                uint32_total_recv_bps: 0,
                                AudioReportState: {
                                  uint32_audio_enc_pkg_br: 0,
                                  uint32_audio_real_recv_pkg: 0,
                                  uint32_audio_flow: 0,
                                  uint32_audio_real_recv_br: 0,
                                  uint32_audio_delay: 0,
                                  uint32_audio_jitter: 0,
                                  uint32_microphone_status: 1,
                                  sentAudioLevel: 0,
                                  sentAudioEnergy: 0,
                                  AudioDecState: [],
                                },
                                VideoReportState: {
                                  uint32_video_delay: 0,
                                  uint32_video_snd_br: 0,
                                  uint32_video_total_real_recv_pkg: 0,
                                  uint32_video_rcv_br: 0,
                                  uint32_send_total_pkg: 0,
                                  VideoEncState: [
                                    {
                                      uint32_enc_width: 0,
                                      uint32_enc_height: 0,
                                      uint32_capture_fps: 0,
                                      uint32_enc_fps: 0,
                                    },
                                  ],
                                  VideoDecState: [],
                                },
                              }),
                              (e.next = 3),
                              this.getStats(t, n)
                            );
                          case 3:
                            return (
                              (i = e.sent),
                              this.prepareReport(i, r),
                              e.abrupt("return", r)
                            );
                          case 6:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e, n) {
                return t.apply(this, arguments);
              }),
          },
        ]),
        e
      );
    })(),
    ef = { voiceActivityDetection: !1 },
    tf = (function () {
      function e(t) {
        ht(this, e),
          (this.userId_ = t.userId),
          (this.tinyId_ = t.tinyId),
          (this.client_ = t.client),
          (this.sdpSemantics_ = t.client.getSdpSemantics()),
          (this.isUplink_ = t.isUplink),
          (this.log_ = new Fp({
            id: "n|" + this.userId_,
            direction: this.isUplink_ ? "local" : "remote",
            type: "",
          })),
          (this.signalChannel_ = t.signalChannel),
          (this.peerConnection_ = null),
          (this.connectTimer_ = -1),
          (this.remoteStreams_ = new Map()),
          (this.localStream_ = null),
          (this.waitForUpdatedAnswer_ = !1),
          (this.isErrorObserved_ = !1),
          (this.mutedState_ = 0),
          (this.subscribeState_ = { audio: !0, video: !0, auxiliary: !0 }),
          (this.pendingSubscription_ = []),
          (this.pendingStreams_ = []),
          (this.subscriptionTimeout_ = -1),
          (this.subscriptionRetryCount_ = 0),
          (this.isSubscriptionPending_ = !1),
          (this.sentSubscriptionAfterConnected_ = !1),
          (this.emitter_ = new Bd()),
          (this.startTime_ = new Date()),
          (this.endTime_ = this.startTime_),
          (this.hasValidEndTime_ = !1),
          (this.hasVideo_ = !1);
      }
      var t, n, r, i, o, a, s;
      return (
        vt(e, [
          {
            key: "initialize",
            value: function () {
              var e = {
                iceServers: this.client_.getIceServers(),
                iceTransportPolicy: "all",
                sdpSemantics: this.sdpSemantics_,
                bundlePolicy: "max-bundle",
                rtcpMuxPolicy: "require",
                tcpCandidatePolicy: "disable",
                IceTransportsType: "nohost",
              };
              (this.peerConnection_ = new RTCPeerConnection(e)),
                (this.peerConnection_.onconnectionstatechange =
                  this.onConnectionStateChange.bind(this)),
                this.isUplink_ ||
                  (this.peerConnection_.ontrack = this.onTrack.bind(this)),
                this.installSignalChannelEvents();
            },
          },
          {
            key: "publish",
            value: function (e, t) {
              var n = this;
              this.localStream_ = e;
              var r = e.getMediaStream();
              this.log_.info("is publishing stream: ".concat(e.getId())),
                r.getTracks().forEach(function (e) {
                  "video" === e.kind && n.setVideoStats("start"),
                    n.peerConnection_.addTrack(e, r);
                }),
                this.updateMediaSettings(r),
                this.exchangeOffer(t);
            },
          },
          {
            key: "updateMediaSettings",
            value: function (e) {
              var t = this,
                n = {
                  EncVideoCodec: "H264",
                  EncVideoWidth: 0,
                  EncVideoHeight: 0,
                  EncVideoBr: "0",
                  EncVideoFps: 0,
                  EncAudioCodec: "opus",
                  EncAudioFS: 0,
                  EncAudioCh: 0,
                  EncAudioBr: "0",
                };
              "getSettings" in MediaStreamTrack.prototype
                ? e.getTracks().forEach(function (e) {
                    var r = e.getSettings();
                    if ("audio" === e.kind) {
                      var i = 1;
                      r.channelCount && (i = r.channelCount),
                        (n.EncAudioCh = i),
                        (n.EncAudioBr = "".concat(
                          1e3 * t.localStream_.getAudioBitrate()
                        )),
                        (n.EncAudioFS = r.sampleRate);
                    } else "video" === e.kind && ((n.EncVideoWidth = r.width), (n.EncVideoHeight = r.height), (n.EncVideoFps = r.frameRate), (n.EncVideoBr = "".concat(1e3 * t.localStream_.getVideoBitrate())));
                  })
                : (n = this.getMediaSettingsFromProfile(n)),
                this.log_.info("updateMediaSettings: " + JSON.stringify(n)),
                this.signalChannel_.send(nl, n);
            },
          },
          {
            key: "getMediaSettingsFromProfile",
            value: function (e) {
              var t = this.localStream_;
              if (t) {
                if (t.getAudioTrack()) {
                  var n = t.getAudioProfile();
                  (e.EncAudioCh = n.channelCount),
                    (e.EncAudioBr = "".concat(1e3 * n.bitrate)),
                    (e.EncAudioFS = n.sampleRate);
                }
                if (t.getVideoTrack()) {
                  var r = t.getVideoProfile();
                  (e.EncVideoWidth = r.width),
                    (e.EncVideoHeight = r.height),
                    (e.EncVideoFps = r.frameRate),
                    (e.EncVideoBr = "".concat(1e3 * r.bitrate));
                }
              }
              return e;
            },
          },
          {
            key: "replaceStream",
            value:
              ((s = ft(
                regeneratorRuntime.mark(function e(t) {
                  var n,
                    r,
                    i = this;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!this.peerConnection_) {
                              e.next = 8;
                              break;
                            }
                            return (
                              (n = t.getVideoTracks()),
                              (r = t.getAudioTracks()),
                              (this.peerConnection_.getSenders() || []).forEach(
                                function (e) {
                                  e.track &&
                                    ("video" === e.track.kind
                                      ? e.replaceTrack && n.length > 0
                                        ? e.replaceTrack(n[0])
                                        : (i.peerConnection_.removeTrack(e),
                                          n.length > 0 &&
                                            i.peerConnection_.addTrack(n[0], t))
                                      : "audio" === e.track.kind &&
                                        (e.replaceTrack && r.length > 0
                                          ? e.replaceTrack(r[0])
                                          : (i.peerConnection_.removeTrack(e),
                                            r.length > 0 &&
                                              i.peerConnection_.addTrack(
                                                r[0],
                                                t
                                              ))));
                                }
                              ),
                              this.updateMediaSettings(t),
                              (e.next = 8),
                              this.updateOffer()
                            );
                          case 8:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return s.apply(this, arguments);
              }),
          },
          {
            key: "addTrack",
            value:
              ((a = ft(
                regeneratorRuntime.mark(function e(t) {
                  var n;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!this.peerConnection_) {
                              e.next = 8;
                              break;
                            }
                            return (
                              this.log_.info(
                                "is adding ".concat(
                                  t.kind,
                                  " track to current published local stream"
                                )
                              ),
                              (n = this.localStream_.getMediaStream()),
                              this.peerConnection_.addTrack(t, n),
                              "video" === t.kind && this.setVideoStats("start"),
                              this.updateMediaSettings(n),
                              (e.next = 8),
                              this.updateOffer()
                            );
                          case 8:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return a.apply(this, arguments);
              }),
          },
          {
            key: "removeTrack",
            value:
              ((o = ft(
                regeneratorRuntime.mark(function e(t) {
                  var n;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!this.peerConnection_) {
                              e.next = 9;
                              break;
                            }
                            if (
                              (this.log_.info(
                                "is removing ".concat(
                                  t.kind,
                                  " track from current published local stream"
                                )
                              ),
                              !(n = this.peerConnection_
                                .getSenders()
                                .find(function (e) {
                                  return e.track === t;
                                })))
                            ) {
                              e.next = 9;
                              break;
                            }
                            return (
                              this.peerConnection_.removeTrack(n),
                              "video" === t.kind && this.setVideoStats("end"),
                              this.updateMediaSettings(
                                this.localStream_.getMediaStream()
                              ),
                              (e.next = 9),
                              this.updateOffer()
                            );
                          case 9:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return o.apply(this, arguments);
              }),
          },
          {
            key: "isReplaceTrackAvailable",
            value: function () {
              return (
                "RTCRtpSender" in window &&
                "replaceTrack" in window.RTCRtpSender.prototype
              );
            },
          },
          {
            key: "replaceTrack",
            value:
              ((i = ft(
                regeneratorRuntime.mark(function e(t) {
                  var n,
                    r = this;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (this.isReplaceTrackAvailable()) {
                              e.next = 2;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_OPERATION,
                              message:
                                "replaceTrack is not supported in this browser, please use switchDevice or addTrack instead",
                            });
                          case 2:
                            if (this.peerConnection_) {
                              e.next = 4;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_OPERATION,
                              message:
                                "replaceTrack() is only valid after the LocalStream has been published",
                            });
                          case 4:
                            if (
                              0 !==
                              (n = this.peerConnection_.getSenders()).length
                            ) {
                              e.next = 7;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_OPERATION,
                              message:
                                "replaceTrack() is only valid after the LocalStream has been published",
                            });
                          case 7:
                            n.forEach(function (e) {
                              e.track &&
                                e.track.kind === t.kind &&
                                (r.log_.info(
                                  "is replacing ".concat(
                                    t.kind,
                                    " track to current published local stream"
                                  )
                                ),
                                e.replaceTrack(t));
                            });
                          case 8:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return i.apply(this, arguments);
              }),
          },
          {
            key: "close",
            value: function () {
              var e = this;
              this.log_.info("closing connection"),
                -1 !== this.connectTimer_ &&
                  (clearTimeout(this.connectTimer_), (this.connectTimer_ = -1)),
                -1 !== this.subscriptionTimeout_ &&
                  (clearTimeout(this.subscriptionTimeout_),
                  (this.subscriptionTimeout_ = -1)),
                this.peerConnection_ &&
                  ((this.peerConnection_.onconnectionstatechange = function (
                    e
                  ) {}),
                  this.peerConnection_.close(),
                  (this.peerConnection_ = null)),
                this.isUplink_ ||
                  (this.remoteStreams_.forEach(function (t, n, r) {
                    var i = t;
                    i.setConnection(null), e.emitter_.emit(up, { stream: i });
                  }),
                  this.remoteStreams_.clear()),
                this.uninstallSignalChannelEvents();
            },
          },
          {
            key: "installSignalChannelEvents",
            value: function () {
              this.isUplink_ &&
                this.signalChannel_.on(
                  qd.NEW_REMOTE_SDP,
                  this.onNewRemoteSdp,
                  this
                ),
                this.isUplink_ ||
                  (this.signalChannel_.on(
                    qd.UPDATE_REMOTE_SDP,
                    this.onUpdateRemoteSdp,
                    this
                  ),
                  this.signalChannel_.on(
                    qd.UPDATE_AUDIO_SSRC,
                    this.onUpdateAudioSSRC,
                    this
                  ),
                  this.signalChannel_.on(
                    qd.UPDATE_VIDEO_SSRC,
                    this.onUpdateVideoSSRC,
                    this
                  ),
                  this.signalChannel_.on(
                    qd.SUBSCRIBE_ACK,
                    this.onSubscription,
                    this
                  ));
            },
          },
          {
            key: "uninstallSignalChannelEvents",
            value: function () {
              this.isUplink_ &&
                this.signalChannel_.removeListener(
                  qd.NEW_REMOTE_SDP,
                  this.onNewRemoteSdp,
                  this
                ),
                this.isUplink_ ||
                  (this.signalChannel_.removeListener(
                    qd.UPDATE_REMOTE_SDP,
                    this.onUpdateRemoteSdp,
                    this
                  ),
                  this.signalChannel_.removeListener(
                    qd.UPDATE_AUDIO_SSRC,
                    this.onUpdateAudioSSRC,
                    this
                  ),
                  this.signalChannel_.removeListener(
                    qd.UPDATE_VIDEO_SSRC,
                    this.onUpdateVideoSSRC,
                    this
                  ),
                  this.signalChannel_.removeListener(
                    qd.SUBSCRIBE_ACK,
                    this.onSubscription,
                    this
                  ));
            },
          },
          {
            key: "onNewRemoteSdp",
            value: function (e) {
              if (this.hitTest(e.data.srctinyid)) {
                var t = e.data.content;
                this.acceptAnswer(t);
              }
            },
          },
          {
            key: "onUpdateRemoteSdp",
            value: function (e) {
              var t = e.data.content;
              if (this.hitTest(t.srctinyid)) {
                this.log_.info("is updating remote sdp offer");
                var n = t.newSdp;
                this.updateRemoteDescription(n);
              }
            },
          },
          {
            key: "onUpdateAudioSSRC",
            value: function (e) {
              var t = e.data.content;
              if (this.hitTest(t.srctinyid)) {
                this.log_.info("is updating audio ssrc");
                var n = t.newSdp;
                this.updateRemoteDescription(n);
              }
            },
          },
          {
            key: "onUpdateVideoSSRC",
            value: function (e) {
              var t = e.data.content;
              if (this.hitTest(t.srctinyid)) {
                this.log_.info("is updating video ssrc");
                var n = t.newSdp;
                this.updateRemoteDescription(n);
              }
            },
          },
          {
            key: "onTrack",
            value: function (e) {
              var t = e.streams[0],
                n = e.track;
              if (
                (this.log_.info(
                  "ontrack() kind: "
                    .concat(n.kind, " id: ")
                    .concat(n.id, " streamId: ")
                    .concat(t.id)
                ),
                "unified-plan" === this.sdpSemantics_)
              ) {
                var r = (function (e) {
                  var t = Yp.parse(e),
                    n = { audio: [], video: [] };
                  return (
                    t.media.forEach(function (e) {
                      if (e.ssrcs) {
                        var t = (e.ssrcs[0].id >> 16) & 255;
                        if ("audio" === e.type) n.audio.push(tp);
                        else if ("video" == e.type) {
                          var r = t === rp ? tp : np;
                          n.video.push(r);
                        }
                      }
                    }),
                    n
                  );
                })(this.peerConnection_.remoteDescription.sdp);
                if ("audio" === n.kind) {
                  if (0 === r.audio.length || t.id !== tp)
                    return void this.log_.debug(
                      "skip this invalid audio track"
                    );
                } else if (-1 === r.video.indexOf(t.id))
                  return void this.log_.debug(
                    "skip this invalid video track: "
                      .concat(n.id, "  msid: ")
                      .concat(t.id)
                  );
              }
              ll({ eventType: "ontrack", kind: n.kind });
              var i = !1,
                o = this.remoteStreams_.get(t.id);
              if (void 0 === o) {
                var a = t.id === tp ? "main" : "auxiliary";
                (o = new Bp({
                  type: a,
                  userId: this.userId_,
                  client: this.client_,
                })).setConnection(this),
                  this.remoteStreams_.set(t.id, o),
                  (i = !0);
              }
              o.setMediaStream(t),
                "audio" === n.kind
                  ? (o.hasAudio() &&
                      o.isPlaying() &&
                      (this.log_.debug(
                        "already has an audio track, restart audio player with the new track"
                      ),
                      o.restartAudio()),
                    o.setHasAudio(!0))
                  : (this.setVideoStats("start"),
                    o.hasVideo() &&
                      o.isPlaying() &&
                      (this.log_.debug(
                        "already has an video track, restart video player with the new track"
                      ),
                      o.restartVideo()),
                    o.setHasVideo(!0)),
                i
                  ? this.emitter_.emit(cp, { stream: o })
                  : this.emitter_.emit(dp, { stream: o });
            },
          },
          {
            key: "isRtpSenderAvailable",
            value: function () {
              return (
                "RTCRtpSender" in window &&
                "setParameters" in window.RTCRtpSender.prototype
              );
            },
          },
          {
            key: "setBandwidth",
            value:
              ((r = ft(
                regeneratorRuntime.mark(function e(t, n) {
                  var r,
                    i,
                    o = this;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (this.isUplink_) {
                              e.next = 2;
                              break;
                            }
                            return e.abrupt("return");
                          case 2:
                            void 0 === n && (n = "video"),
                              this.isRtpSenderAvailable() &&
                                (r = this.peerConnection_
                                  .getSenders()
                                  .find(function (e) {
                                    return e.track && e.track.kind === n;
                                  })) &&
                                ((i = r.getParameters()).encodings ||
                                  (i.encodings = [{}]),
                                "unlimited" === t
                                  ? delete i.encodings[0].maxBitrate
                                  : (i.encodings[0].maxBitrate = 1e3 * t),
                                r
                                  .setParameters(i)
                                  .then(function () {
                                    o.log_.debug(
                                      n + " bandwidth was set to " + t + " kbps"
                                    );
                                  })
                                  .catch(function (e) {
                                    return o.log_.error(
                                      "failed to set bandwidth: " + e
                                    );
                                  }));
                          case 4:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e, t) {
                return r.apply(this, arguments);
              }),
          },
          {
            key: "updateVideoBandwidthRestriction",
            value: function (e, t) {
              return (e =
                -1 === e.indexOf("b=AS:")
                  ? e.replace(
                      /m=video (.*)\r\nc=IN (.*)\r\n/,
                      "m=video $1\r\nc=IN $2\r\nb=AS:" + t + "\r\n"
                    )
                  : e.replace(new RegExp("b=AS:.*\r\n"), "b=AS:" + t + "\r\n"));
            },
          },
          {
            key: "updateAudioBandwidthRestriction",
            value: function (e, t) {
              return (e = e.replace(
                /m=audio (.*)\r\nc=IN (.*)\r\n/,
                "m=audio $1\r\nc=IN $2\r\nb=AS:" + t + "\r\n"
              ));
            },
          },
          {
            key: "removeBandwidthRestriction",
            value: function (e) {
              return e.replace(/b=AS:.*\r\n/, "").replace(/b=TIAS:.*\r\n/, "");
            },
          },
          {
            key: "exchangeOffer",
            value: function (e) {
              var t = this;
              this.peerConnection_
                .createOffer(ef)
                .then(function (e) {
                  return t.peerConnection_.setLocalDescription(e);
                })
                .then(function () {
                  t.log_.info(
                    "createOffer success, sending offer to remote server"
                  );
                  var e = t.peerConnection_.localDescription;
                  t.log_.debug("sending sdp offer: " + e.sdp),
                    t.signalChannel_.send(Kd, e, 0),
                    ll({
                      eventType: "setLocalDescription",
                      kind: "offer",
                      result: "success",
                    });
                })
                .catch(function (n) {
                  ll({
                    eventType: "setLocalDescription",
                    kind: "offer",
                    result: "failed",
                  }),
                    t.log_.error("failed to create offer"),
                    e(
                      new sl({
                        code: ol.CREATE_OFFER_FAILED,
                        message: "failed to create offer",
                      })
                    );
                });
            },
          },
          {
            key: "updateOffer",
            value:
              ((n = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (t = ""),
                              (e.prev = 1),
                              (e.next = 4),
                              this.peerConnection_.createOffer(ef)
                            );
                          case 4:
                            return (
                              (t = e.sent),
                              (e.next = 7),
                              this.peerConnection_.setLocalDescription(t)
                            );
                          case 7:
                            (n = this.peerConnection_.localDescription),
                              this.log_.info(
                                "createOffer success, sending updated offer to remote server"
                              ),
                              this.log_.debug("updatedOffer: " + n.sdp),
                              this.signalChannel_.send($d, n, 0),
                              (this.waitForUpdatedAnswer_ = !0),
                              ll({
                                eventType: "setLocalDescription",
                                kind: "offer",
                                result: "success",
                              }),
                              (e.next = 20);
                            break;
                          case 15:
                            throw (
                              ((e.prev = 15),
                              (e.t0 = e.catch(1)),
                              ll({
                                eventType: "setLocalDescription",
                                kind: "offer",
                                result: "failed",
                              }),
                              this.log_.error(
                                "failed to create updated sdp offer"
                              ),
                              new sl({
                                code: ol.CREATE_OFFER_FAILED,
                                message: "failed to create updated sdp offer",
                              }))
                            );
                          case 20:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[1, 15]]
                  );
                })
              )),
              function () {
                return n.apply(this, arguments);
              }),
          },
          {
            key: "acceptAnswer",
            value: function (e) {
              var t = this,
                n = this.localStream_.getVideoBitrate(),
                r = this.updateVideoBandwidthRestriction(e.sdp, n),
                i = this.localStream_.getAudioBitrate();
              r = this.updateAudioBandwidthRestriction(r, i);
              var o = { type: e.type, sdp: r };
              this.peerConnection_.setRemoteDescription(o).then(
                function () {
                  t.log_.debug("accepted anwswer: " + r),
                    t.setBandwidth(i, "audio"),
                    t.setBandwidth(n, "video"),
                    t.waitForUpdatedAnswer_ ||
                      (t.log_.info(
                        "accepted remote answer, fired stream-published event"
                      ),
                      t.emitter_.emit(lp, { stream: t.localStream_ })),
                    t.waitForUpdatedAnswer_ && (t.waitForUpdatedAnswer_ = !1),
                    ll({
                      eventType: "setRemoteDescription",
                      kind: "answer",
                      result: "success",
                    });
                },
                function (e) {
                  ll({
                    eventType: "setRemoteDescription",
                    kind: "answer",
                    result: "failed",
                  }),
                    t.log_.error("failed to accept remote answer " + e);
                }
              );
            },
          },
          {
            key: "failIceConnectionForTest",
            value: function () {
              this.log_.warn("failIceConnectionForTest()"),
                this.emitter_.emit(
                  fp,
                  new sl({
                    message: "fake ICE failure fired",
                    code: ol.ICE_TRANSPORT_ERROR,
                  })
                );
            },
          },
          {
            key: "onConnectionStateChange",
            value: function (e) {
              var t = this;
              if (
                (this.log_.info(
                  "onConnectionStateChange() connectionState: " +
                    e.target.connectionState
                ),
                "connecting" === e.target.connectionState)
              ) {
                (this.connectTimer_ = setTimeout(function () {
                  var e = "DTLS Transport connection timeout (".concat(
                    10,
                    "s)"
                  );
                  ll({ eventType: "iceConnectionState", result: "failed" }),
                    t.log_.error(e),
                    t.addTransportEvent("disconnected"),
                    (t.isErrorObserved_ = !0),
                    t.emitter_.emit(
                      fp,
                      new sl({ message: e, code: ol.ICE_TRANSPORT_ERROR })
                    );
                }, 1e4)),
                  this.emitter_.emit(hp, { state: "connecting" });
              } else
                clearTimeout(this.connectTimer_), (this.connectTimer_ = -1);
              if (
                "failed" === e.target.connectionState ||
                "closed" === e.target.connectionState
              ) {
                var n = "ICE/DTLS Transport connection ".concat(
                  e.target.connectionState
                );
                ll({ eventType: "iceConnectionState", result: "failed" }),
                  this.log_.error(n),
                  this.isErrorObserved_ ||
                    (this.addTransportEvent("disconnected"),
                    this.emitter_.emit(
                      fp,
                      new sl({ message: n, code: ol.ICE_TRANSPORT_ERROR })
                    ));
              }
              if (
                "connected" === e.target.connectionState ||
                "completed" === e.target.connectionState
              ) {
                if (
                  (ll({ eventType: "iceConnectionState", result: "success" }),
                  this.addTransportEvent("connected"),
                  this.emitter_.emit(hp, { state: "connected" }),
                  !this.sentSubscriptionAfterConnected_ &&
                    this.pendingSubscription_.length > 0)
                ) {
                  this.log_.info(
                    "send pending subscription after RTCPeerConnection is connected"
                  );
                  var r = this.pendingSubscription_[0];
                  this.doSendSubscription(r.data, r.stream),
                    (this.sentSubscriptionAfterConnected_ = !0);
                }
              } else
                "disconnected" === e.target.connectionState &&
                  this.addTransportEvent("disconnected");
            },
          },
          {
            key: "hitTest",
            value: function (e) {
              return (
                ((0 === e || "0" === e) && this.isUplink_) || e === this.tinyId_
              );
            },
          },
          {
            key: "updateRemoteDescription",
            value: function (e) {
              var t = this;
              this.log_.debug("updateRemoteDescription() ".concat(e.sdp));
              var n = this.peerConnection_.remoteDescription.sdp;
              this.peerConnection_
                .setRemoteDescription(e)
                .then(function () {
                  if (
                    (ll({
                      eventType: "setRemoteDescription",
                      kind: "offer",
                      result: "success",
                    }),
                    t.log_.info("updateRemoteDescription success"),
                    "unified-plan" === t.sdpSemantics_)
                  ) {
                    var r = (function (e, t) {
                      var n = Yp.parse(e).media,
                        r = Yp.parse(t).media;
                      return {
                        added: r.filter(function (e) {
                          var t = n.find(function (t) {
                            return t.mid === e.mid;
                          });
                          return (
                            (void 0 === t || void 0 === t.ssrcs) && e.ssrcs
                          );
                        }),
                        removed: n.filter(function (e) {
                          var t = r.find(function (t) {
                            return t.mid === e.mid;
                          });
                          return (
                            (void 0 === t || void 0 === t.ssrcs) && e.ssrcs
                          );
                        }),
                      };
                    })(n, e.sdp);
                    t.addRemoteTrack(r.added), t.removeRemoteTrack(r.removed);
                  } else t.removeRemoteTrackLegacy(n, e.sdp);
                  var i = t.pendingStreams_.shift();
                  i &&
                    (t.log_.debug(
                      "mark ".concat(
                        i.getType(),
                        " stream exit subscription cycle"
                      )
                    ),
                    i.setInSubscriptionCycle(!1));
                })
                .catch(function (e) {
                  ll({
                    eventType: "setRemoteDescription",
                    kind: "offer",
                    result: "failed",
                  }),
                    t.log_.error("updateRemoteDescription failed ".concat(e));
                });
            },
          },
          {
            key: "addRemoteTrack",
            value: function (e) {
              var t = this;
              e.forEach(function (e) {
                var n = e.mid,
                  r = Xp(e.ssrcs[0].id) === ip ? np : tp,
                  i = t.peerConnection_.getReceivers()[n];
                if (i && i.track) {
                  t.log_.info(
                    "add ".concat(i.track.kind, " track ").concat(i.track.id)
                  );
                  var o = t.remoteStreams_.get(r);
                  if (o)
                    o.getMediaStream().addTrack(i.track),
                      "audio" === i.track.kind
                        ? o.setHasAudio(!0)
                        : (o.setHasVideo(!0), t.setVideoStats("start")),
                      t.emitter_.emit(dp, { stream: o });
                  else {
                    t.log_.debug(
                      "remoteStream for msid:".concat(r, " not exist")
                    );
                    var a = new MediaStream();
                    a.addTrack(i.track),
                      (o = new Bp({
                        type: r === tp ? "main" : "auxiliary",
                        userId: t.userId_,
                        client: t.client_,
                      })).setMediaStream(a),
                      o.setConnection(t),
                      t.remoteStreams_.set(r, o),
                      "audio" === i.track.kind
                        ? o.setHasAudio(!0)
                        : o.setHasVideo(!0),
                      t.emitter_.emit("stream-added", { stream: o });
                  }
                }
              });
            },
          },
          {
            key: "removeRemoteTrack",
            value: function (e) {
              var t = this;
              e.forEach(function (e) {
                var n = Xp(e.ssrcs[0].id),
                  r = n === rp ? "video" : n === ip ? "auxVideo" : "audio";
                t.log_.info("[".concat(r, "] track was removed"));
                var i = "auxVideo" === r ? np : tp,
                  o = t.remoteStreams_.get(i);
                o &&
                  ((i !== np && 0 !== o.getMediaStream().getTracks().length) ||
                  o.isInSubscriptionCycle()
                    ? ("audio" === r
                        ? o.setHasAudio(!1)
                        : (o.setHasVideo(!1), t.setVideoStats("end")),
                      t.emitter_.emit(dp, { stream: o }))
                    : (t.log_.info("remote stream ".concat(i, " removed")),
                      t.remoteStreams_.delete(i),
                      t.emitter_.emit(up, { stream: o })));
              });
            },
          },
          {
            key: "removeRemoteTrackLegacy",
            value: function (e, t) {
              var n = this,
                r = Qp(e).media,
                i = Qp(t).media;
              r.filter(function (e) {
                var t,
                  r = i.find(function (t) {
                    return t.type === e.type;
                  }),
                  o = rp;
                if ("audio" === e.type)
                  (void 0 !== r && void 0 !== r.ssrcs) ||
                    !e.ssrcs ||
                    (n.log_.info("[audio] track was removed"),
                    (t = n.remoteStreams_.get(o)) &&
                      (0 === t.getMediaStream().getTracks().length
                        ? t.isInSubscriptionCycle() ||
                          (n.log_.info("remote stream ".concat(o, " removed")),
                          n.remoteStreams_.delete(o),
                          n.emitter_.emit(up, { stream: t }))
                        : (t.setHasAudio(!1),
                          n.emitter_.emit(dp, { stream: t }))));
                else if (
                  ((void 0 === r || void 0 === r.ssrcs) && e.ssrcs) ||
                  (r.ssrcGroups &&
                    e.ssrcGroups &&
                    r.ssrcGroups.length < e.ssrcGroups.length)
                ) {
                  var a = !1,
                    s = !1;
                  void 0 === r.ssrcs && 2 === e.ssrcGroups.length
                    ? (n.log_.info("[main & aux video] tracks were removed"),
                      (a = !0),
                      (s = !0))
                    : void 0 === r.ssrcs && 1 === e.ssrcGroups.length
                    ? (n.log_.info("[main video] track was removed"), (a = !0))
                    : e.ssrcGroups.length > r.ssrcGroups.length &&
                      (n.log_.info("[auxiliary video] track was removed"),
                      (s = !0)),
                    s &&
                      ((o = np),
                      n.log_.info("remote stream ".concat(o, " removed")),
                      (t = n.remoteStreams_.get(o)) &&
                        !t.isInSubscriptionCycle() &&
                        (n.remoteStreams_.delete(o),
                        n.emitter_.emit(up, { stream: t }))),
                    a &&
                      ((o = tp),
                      (t = n.remoteStreams_.get(o)) &&
                        (0 === t.getMediaStream().getTracks().length
                          ? t.isInSubscriptionCycle() ||
                            (n.log_.info(
                              "remote stream ".concat(o, " removed")
                            ),
                            n.remoteStreams_.delete(o),
                            n.emitter_.emit(up, { stream: t }))
                          : (n.setVideoStats("end"),
                            t.setHasVideo(!1),
                            n.emitter_.emit(dp, { stream: t }))));
                }
              });
            },
          },
          {
            key: "setRemoteOffer",
            value: function (e) {
              var t = this;
              this.peerConnection_
                .setRemoteDescription(e)
                .then(function () {
                  return (
                    ll({
                      eventType: "setRemoteDescription",
                      kind: "offer",
                      result: "success",
                    }),
                    t.peerConnection_.createAnswer()
                  );
                })
                .then(function (e) {
                  return t.peerConnection_.setLocalDescription(e);
                })
                .then(function () {
                  var e = t.peerConnection_.localDescription;
                  t.signalChannel_.send(Kd, e, t.tinyId_),
                    t.log_.info(
                      "accepted remote offer and acknowledged answer"
                    );
                })
                .catch(function (e) {
                  ll({
                    eventType: "setRemoteDescription",
                    kind: "offer",
                    result: "failed",
                  }),
                    t.log_.error("failed to accept remote offer " + e);
                });
            },
          },
          {
            key: "setMutedState",
            value: function (e, t) {
              if (this.isUplink_) {
                "audio" === e
                  ? t
                    ? (this.mutedState_ |= 4)
                    : (this.mutedState_ &= -5)
                  : t
                  ? (this.mutedState_ |= 1)
                  : (this.mutedState_ &= -2);
                var n = {
                  srctinyid: 0,
                  userid: this.userId_,
                  flag: this.mutedState_,
                };
                this.log_.info(
                  "set "
                    .concat(e, " muted state: [")
                    .concat(t ? "mute" : "unmute", "]")
                ),
                  this.signalChannel_.send(el, n);
              }
            },
          },
          {
            key: "onSubscription",
            value: function (e) {
              var t = e.data.content,
                n = t.srctinyid;
              if (this.hitTest(n)) {
                var r = 0 === t.errCode,
                  i = this.pendingSubscription_.shift();
                if (void 0 !== i) {
                  (this.subscriptionRetryCount_ = 0),
                    (this.isSubscriptionPending_ = !1),
                    -1 !== this.subscriptionTimeout_ &&
                      (clearTimeout(this.subscriptionTimeout_),
                      (this.subscriptionTimeout_ = -1));
                  var o = i.stream;
                  this.log_.info(
                    ""
                      .concat(o.getType(), " stream ")
                      .concat(i.type, " result: ")
                      .concat(r ? "success" : "failure", " errCode: ")
                      .concat(t.errCode)
                  ),
                    i.callback(r),
                    ll({
                      eventType: i.type,
                      result: 0 === t.errCode ? "success" : "failed",
                    }),
                    r &&
                      "subscribe" === i.type &&
                      this.emitter_.emit(pp, { stream: o });
                }
                if (this.pendingSubscription_.length > 0) {
                  var a = this.pendingSubscription_[0];
                  this.log_.info("schedule a pending subscription"),
                    this.doSendSubscription(a.data, a.stream);
                }
              }
            },
          },
          {
            key: "subscribe",
            value: function (e, t) {
              var n = this;
              return new Promise(function (r, i) {
                if (
                  void 0 === t ||
                  ("main" === e.getType() &&
                    void 0 !== t.audio &&
                    void 0 !== t.video &&
                    t.audio === n.subscribeState_.audio &&
                    t.video === n.subscribeState_.video) ||
                  ("auxiliary" === e.getType() &&
                    void 0 !== t.video &&
                    n.subscribeState_.auxiliary === t.video)
                )
                  return n.emitter_.emit(pp, { stream: e, result: !0 }), r();
                var o, a;
                "main" === e.getType()
                  ? (void 0 !== t.audio && (n.subscribeState_.audio = t.audio),
                    void 0 !== t.video && (n.subscribeState_.video = t.video),
                    n.subscribeState_.audio
                      ? ((o = bl), (a = "subscribe audio"))
                      : ((o = Rl), (a = "unsubscribe audio")),
                    n.addEventInternal(o, a),
                    n.subscribeState_.video
                      ? ((o = Sl), (a = "subscribe video"))
                      : ((o = kl), (a = "unsubscribe video")),
                    n.addEventInternal(o, a))
                  : void 0 !== t.video &&
                    (n.subscribeState_.auxiliary = t.video);
                n.log_.info(
                  "subscribe "
                    .concat(e.getType(), " stream with options ")
                    .concat(JSON.stringify(t), " current state: ")
                    .concat(JSON.stringify(n.subscribeState_))
                ),
                  n.sendSubscription(e, "subscribe", function (e) {
                    if (e) r();
                    else {
                      var t = "failed to subscribe remote stream";
                      n.log_.error(t), i(new sl({ message: t }));
                    }
                  });
              });
            },
          },
          {
            key: "unsubscribe",
            value: function (e) {
              var t = this;
              return new Promise(function (n, r) {
                "main" === e.getType()
                  ? ((t.subscribeState_.audio = !1),
                    (t.subscribeState_.video = !1))
                  : (t.subscribeState_.auxiliary = !1),
                  t.log_.info(
                    "unsubscribe "
                      .concat(e.getType(), " stream with ")
                      .concat(JSON.stringify(t.subscribeState_))
                  ),
                  t.sendSubscription(e, "unsubscribe", function (e) {
                    if (e) n();
                    else {
                      var i = "failed to unsubscribe remote stream";
                      t.log_.error(i), r(new sl({ message: i }));
                    }
                  }),
                  t.addEventInternal(Rl, "unsubscribe audio"),
                  t.addEventInternal(kl, "unsubscribe video");
              });
            },
          },
          {
            key: "addEventInternal",
            value: function (e, t) {
              var n = this.client_.getUserId(),
                r = {
                  eventId: e,
                  eventDesc: t,
                  timestamp: To(),
                  userId: n,
                  tinyId: this.client_.getTinyId(),
                };
              this.isUplink_ ||
                ((r.remoteUserId = this.userId_),
                (r.remoteTinyId = this.tinyId_)),
                Ul(n, r);
            },
          },
          {
            key: "addTransportEvent",
            value: function (e) {
              "connected" === e
                ? this.addEventInternal(jl, "ice transport is connected")
                : this.addEventInternal(Ml, "ice transport is disconnected");
            },
          },
          {
            key: "sendSubscription",
            value: function (e, t, n) {
              var r = {
                srctinyid: this.tinyId_,
                userid: this.userId_,
                audio: this.subscribeState_.audio,
                bigVideo: this.subscribeState_.video,
                auxVideo: this.subscribeState_.auxiliary,
              };
              this.pendingSubscription_.length > 0
                ? this.log_.debug("queue the subscription for later handling")
                : this.doSendSubscription(r, e),
                this.pendingSubscription_.push({
                  stream: e,
                  type: t,
                  data: r,
                  callback: n,
                }),
                e.setInSubscriptionCycle(!0);
            },
          },
          {
            key: "doSendSubscription",
            value: function (e, t) {
              var n = this;
              "connected" === this.peerConnection_.connectionState ||
              "completed" === this.peerConnection_.connectionState
                ? (t && this.pendingStreams_.push(t),
                  this.log_.debug(
                    "doSendSubscription() send SUBSCRIBE command with data: ".concat(
                      JSON.stringify(e)
                    )
                  ),
                  this.signalChannel_.send(tl, e),
                  (this.isSubscriptionPending_ = !0),
                  (this.subscriptionTimeout_ = setTimeout(function () {
                    if (n.isSubscriptionPending_)
                      if (
                        (n.log_.debug("subscription timeout"),
                        (n.subscriptionRetryCount_ += 1),
                        n.subscriptionRetryCount_ <= 3)
                      ) {
                        n.log_.debug("resend subscription");
                        var e = n.pendingSubscription_[0].data;
                        n.doSendSubscription(e);
                      } else
                        n.log_.error(
                          "remote server not response to subscription"
                        ),
                          n.pendingSubscription_.shift(),
                          n.pendingStreams_.shift(),
                          (n.isSubscriptionPending_ = !1),
                          (n.subscriptionRetryCount_ = 0),
                          n.emitter_.emit(
                            fp,
                            new sl({
                              code: ol.SUBSCRIPTION_TIMEOUT,
                              message:
                                "remote server not response to subscription",
                            })
                          );
                  }, 5e3)))
                : this.log_.debug(
                    "try to send subscription when connectionState ".concat(
                      this.peerConnection_.connectionState
                    )
                  );
            },
          },
          {
            key: "getPeerConnection",
            value: function () {
              return this.peerConnection_;
            },
          },
          {
            key: "getUserId",
            value: function () {
              return this.userId_;
            },
          },
          {
            key: "getTinyId",
            value: function () {
              return this.tinyId_;
            },
          },
          {
            key: "setVideoStats",
            value: function (e) {
              "start" === e
                ? ((this.hasVideo_ = !0),
                  (this.startTime_ = new Date()),
                  (this.hasValidEndTime_ = !1))
                : ((this.hasVideo_ = !1),
                  (this.endTime_ = new Date()),
                  (this.hasValidEndTime_ = !0));
            },
          },
          {
            key: "getVideoHealthStats",
            value:
              ((t = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n, r, i, o, a;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              (this.hasValidEndTime_ ||
                                (this.endTime_ = new Date()),
                              (t = (this.endTime_ - this.startTime_) / 1e3),
                              (n = !1),
                              (r = 0),
                              (i = 0),
                              (o = 0),
                              !this.hasVideo_)
                            ) {
                              e.next = 21;
                              break;
                            }
                            if (((n = !0), !this.isUplink_)) {
                              e.next = 15;
                              break;
                            }
                            return (e.next = 11), new Zp().getSenderStats(this);
                          case 11:
                            (a = e.sent),
                              (r = a.video.framesSent / t),
                              (e.next = 19);
                            break;
                          case 15:
                            return (
                              (e.next = 17), new Zp().getReceiverStats(this)
                            );
                          case 17:
                            (a = e.sent), (r = a.video.framesDecoded / t);
                          case 19:
                            (i = a.video.frameWidth), (o = a.video.frameHeight);
                          case 21:
                            return e.abrupt("return", {
                              valid: n,
                              framerate: r,
                              duration: t,
                              width: i,
                              height: o,
                            });
                          case 22:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function () {
                return t.apply(this, arguments);
              }),
          },
          {
            key: "on",
            value: function (e, t) {
              this.emitter_.on(e, t);
            },
          },
        ]),
        e
      );
    })(),
    nf = (function () {
      function e(t) {
        if (
          (ht(this, e),
          (this.mode_ = t.mode),
          (this.sdpSemantics_ = "plan-b"),
          void 0 !== t.sdpSemantics
            ? (this.sdpSemantics_ = t.sdpSemantics)
            : Jl() && (this.sdpSemantics_ = "unified-plan"),
          (this.sdkAppId_ = t.sdkAppId),
          (this.userId_ = t.userId),
          (this.log_ = new Fp({
            id: "c|" + this.userId_,
            direction: "local",
            type: "",
          })),
          (this.userSig_ = t.userSig),
          (this.roomId_ = 0),
          (this.useStringRoomId_ = t.useStringRoomId),
          (this.recordId_ = null),
          (this.pureAudioPushMode_ = null),
          (this.version_ = t.version),
          this.log_.info("using sdpSemantics: " + this.sdpSemantics_),
          ar.setConfig({
            sdkAppId: this.sdkAppId_,
            userId: this.userId_,
            version: this.version_,
          }),
          void 0 !== t.recordId)
        ) {
          if (!Number.isInteger(Number(t.recordId)))
            throw new sl({
              code: ol.INVALID_PARAM,
              message: "recordId must be an integer number",
            });
          this.recordId_ = t.recordId;
        }
        if (void 0 !== t.pureAudioPushMode) {
          if (!Number.isInteger(Number(t.pureAudioPushMode)))
            throw new sl({
              code: ol.INVALID_PARAM,
              message: "pureAudioPushMode must be an integer number",
            });
          this.pureAudioPushMode_ = t.pureAudioPushMode;
        }
        var n;
        if (((this.bussinessInfo_ = t.bussinessInfo), void 0 !== t.streamId)) {
          if (
            !(
              "string" == typeof t.streamId &&
              String(t.streamId) &&
              String(t.streamId).length <= 64
            )
          )
            throw new sl({
              code: ol.INVALID_PARAMETER,
              message:
                "streamId must be a sting literal within 64 bytes, and not be empty",
            });
          n = { Str_uc_params: { userdefine_streamid_main: t.streamId } };
        }
        if (void 0 !== t.userDefineRecordId) {
          if (null === t.userDefineRecordId.match(/^[A-Za-z0-9_\-]{1,64}$/gi))
            throw new sl({
              code: ol.INVALID_PARAMETER,
              message:
                "userDefineRecordId must be a sting literal contains (a-zA-Z),(0-9), underline and hyphen, within 64 bytes, and not be empty",
            });
          n
            ? (n.Str_uc_params.userdefine_record_id = t.userDefineRecordId)
            : (n = {
                Str_uc_params: { userdefine_record_id: t.userDefineRecordId },
              });
        }
        if (void 0 !== t.userDefinePushArgs) {
          if (
            !(
              "string" == typeof t.userDefinePushArgs &&
              String(t.userDefinePushArgs) &&
              String(t.userDefinePushArgs).length <= 256
            )
          )
            throw new sl({
              code: ol.INVALID_PARAMETER,
              message:
                "userDefinePushArgs must be a sting literal within 256 bytes, and not be empty",
            });
          n
            ? (n.Str_uc_params.userdefine_push_args = t.userDefinePushArgs)
            : (n = {
                Str_uc_params: { userdefine_push_args: t.userDefinePushArgs },
              });
        }
        n && (this.bussinessInfo_ = JSON.stringify(n)),
          (this.disableReceiver_ = !1),
          (this.signalChannel_ = null),
          (this.isScreenShareOnly_ = 0),
          void 0 !== t.isScreenShareOnly &&
            (this.isScreenShareOnly_ = t.isScreenShareOnly ? 1 : 0),
          (this.role_ = "anchor"),
          (this.privateMapKey_ = ""),
          (this.tinyId_ = 0),
          (this.proxy_ = null),
          (this.turnServer_ = null),
          (this.connections_ = new Map()),
          (this.connectionsRefreshCount_ = new Map()),
          (this.pendingRefresh_ = new Map()),
          (this.mutedStates_ = new Map()),
          (this.localStream_ = null),
          (this.isPublishing_ = !1),
          (this.uplinkConnection_ = null),
          (this.emitter_ = new Bd()),
          (this.signalInfo_ = {}),
          (this.isInitialized_ = !1),
          (this.isJoined_ = !1),
          (this.heartbeat_ = -1),
          (this.stats_ = new Zp()),
          (this.joinTimeout_ = -1),
          (this.publishTimeout_ = -1),
          (this.unpublishTimeout_ = -1),
          (this.publishRetryCount_ = 0),
          (this.startJoinTimestamp_ = new Date()),
          (this.joinedTimestamp_ = new Date()),
          (this.downlinkVideoHealthStats_ = {}),
          (this.uplinkVideoHealthStats_ = {});
      }
      var t, n, r, i, o, a, s, c, u, d, l, p;
      return (
        vt(e, [
          {
            key: "setProxyServer",
            value: function (e) {
              if (!e.startsWith("wss://"))
                throw new sl({
                  code: ol.INVALID_PARAMETER,
                  message: 'proxy server url shall be started with "wss://"',
                });
              this.proxy_ = e;
            },
          },
          {
            key: "getUrl",
            value: function (e) {
              var t = jd(e);
              return !Md() && this.proxy_ && (t = this.proxy_), t;
            },
          },
          {
            key: "getBackupUrl",
            value: function () {
              return this.proxy_ ? this.proxy_ : jd("wss://bk.rtc.qq.com:8687");
            },
          },
          {
            key: "getUserId",
            value: function () {
              return this.userId_;
            },
          },
          {
            key: "getTinyId",
            value: function () {
              return this.tinyId_;
            },
          },
          {
            key: "setTurnServer",
            value: function (e) {
              (this.turnServer_ = {}),
                (this.turnServer_.urls = "turn:" + e.url),
                void 0 !== e.username &&
                  void 0 !== e.credential &&
                  ((this.turnServer_.username = e.username),
                  (this.turnServer_.credential = e.credential),
                  (this.turnServer_.credentialType = "password"),
                  void 0 !== e.credentialType &&
                    (this.turnServer_.credentialType = e.credentialType));
            },
          },
          {
            key: "initialize",
            value: function () {
              var e = this;
              return new Promise(function (t, n) {
                e.log_.info("setup signal channel"),
                  (e.signalChannel_ = new Bl({
                    sdkAppId: e.sdkAppId_,
                    userId: e.userId_,
                    userSig: e.userSig_,
                    url: e.getUrl("wss://qcloud.rtc.qq.com:8687"),
                    backupUrl: e.getUrl("wss://bk.rtc.qq.com:8687"),
                    version: e.version_,
                  })),
                  e.signalChannel_.on(Hd, function (t) {
                    e.log_.info(
                      "SignalChannel state changed from "
                        .concat(t.prevState, " to ")
                        .concat(t.state)
                    ),
                      e.emitter_.emit(yp, t);
                  }),
                  e.signalChannel_.on(zd, function (t) {
                    e.isInitialized_
                      ? (e.closeUplink(),
                        e.closeConnections(),
                        e.emitter_.emit(Ep, t))
                      : n(t);
                  }),
                  e.signalChannel_.on(qd.CHANNEL_SETUP_FAILED, function (t) {
                    e.log_.error("signal channel setup failed"), n(t);
                  }),
                  e.signalChannel_.on(qd.CHANNEL_SETUP_SUCCESS, function (n) {
                    (e.signalInfo_ = n.signalInfo),
                      (e.tinyId_ = e.signalInfo_.tinyId),
                      (e.isInitialized_ = !0),
                      t();
                  }),
                  e.signalChannel_.on(qd.PEER_JOIN, function (t) {
                    e.disableReceiver_ || e.onPeerJoin(t.data);
                  }),
                  e.signalChannel_.on(qd.PEER_LEAVE, function (t) {
                    e.onPeerLeave(t.data);
                  }),
                  e.signalChannel_.on(qd.UPDATE_REMOTE_MUTE_STAT, function (t) {
                    e.onUpdateRemoteMuteStat(t.data);
                  }),
                  e.signalChannel_.on(qd.CLINET_BANNDED, function (t) {
                    var n = t.data.content;
                    if (
                      (e.closeUplink(),
                      e.closeConnections(),
                      "banned" === n.type)
                    ) {
                      var r = "you got banned by account admin";
                      e.log_.error("user was banned because of " + r),
                        e.onClientBanned(r);
                    } else if ("kick" === n.type) {
                      var i = "duplicated userId joining the room";
                      e.log_.error("user was banned because of " + i),
                        e.onClientBanned(i);
                    } else
                      e.log_.error("Relay server timeout observed"),
                        e.emitter_.emit(
                          Ep,
                          new sl({
                            code: ol.SERVER_TIMEOUT,
                            message: "Relay server timeout observed",
                          })
                        );
                  }),
                  e.signalChannel_.on(qd.REQUEST_REBUILD_SESSION, function (t) {
                    e.signalInfo_ = t.signalInfo;
                    var n = [];
                    e.connections_ && n.push(0);
                    var r = [],
                      i = !0,
                      o = !1,
                      a = void 0;
                    try {
                      for (
                        var s, c = e.connections_[Symbol.iterator]();
                        !(i = (s = c.next()).done);
                        i = !0
                      ) {
                        var u = Ct(s.value, 2),
                          d = u[0],
                          l = u[1];
                        n.push(d);
                        var p = l.getPeerConnection().remoteDescription;
                        p && r.push(p.sdp);
                      }
                    } catch (h) {
                      (o = !0), (a = h);
                    } finally {
                      try {
                        i || null == c.return || c.return();
                      } finally {
                        if (o) throw a;
                      }
                    }
                    var f = {
                      socketid: e.signalInfo_.socketId,
                      tinyid: e.tinyId_,
                      appid: e.sdkAppId_,
                      openid: e.userId_,
                      sessionid: String(e.roomId_),
                      sids: n,
                      relayInfo: e.signalInfo_.relayInnerIp,
                      remotesdp: r,
                    };
                    try {
                      e.log_.info(
                        "reconnect - rebuild session with data: ".concat(
                          JSON.stringify(f)
                        )
                      ),
                        e.signalChannel_.send(Zd, f);
                    } catch (bf) {
                      e.log_.error(
                        "reconnect failed because rebuild session failed"
                      );
                    }
                  }),
                  e.signalChannel_.connect();
              });
            },
          },
          {
            key: "join",
            value:
              ((p = ft(
                regeneratorRuntime.mark(function e(t) {
                  var n, r, i, o, a;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (Yl()) {
                              e.next = 2;
                              break;
                            }
                            throw new sl({
                              code: ol.NOT_SUPPORTED,
                              message: "the browser does NOT support TRTC!",
                            });
                          case 2:
                            return (
                              (this.startJoinTimestamp_ = new Date()),
                              (n = Md()) ||
                                ((n = "qcloud"),
                                this.proxy_ &&
                                  this.proxy_.startsWith(
                                    "wss://trtc.rtc.qq.com"
                                  ) &&
                                  (n = "trtc")),
                              ul({
                                env: n,
                                sdkAppId: this.sdkAppId_,
                                userId: this.userId_,
                                version: this.version_,
                              }),
                              Ul(this.userId_, {
                                eventId: Ol,
                                eventDesc: "joining room",
                                timestamp: To(),
                                userId: this.userId_,
                                tinyId: this.tinyId_,
                              }),
                              (e.prev = 7),
                              (e.next = 10),
                              this.initialize()
                            );
                          case 10:
                            e.next = 17;
                            break;
                          case 12:
                            throw (
                              ((e.prev = 12),
                              (e.t0 = e.catch(7)),
                              (r = e.t0.getCode()),
                              ll({
                                eventType: "join",
                                result: "failed",
                                code: r,
                              }),
                              e.t0)
                            );
                          case 17:
                            return (e.prev = 17), (e.next = 20), this.doJoin(t);
                          case 20:
                            e.next = 28;
                            break;
                          case 22:
                            throw (
                              ((e.prev = 22),
                              (e.t1 = e.catch(17)),
                              (i = e.t1.getExtraCode()),
                              (o = 0 !== i ? i : e.t1.getCode()),
                              ll({
                                eventType: "join",
                                result: "failed",
                                code: o,
                              }),
                              e.t1)
                            );
                          case 28:
                            (this.joinedTimestamp_ = new Date()),
                              (a =
                                this.joinedTimestamp_ -
                                this.startJoinTimestamp_),
                              ll({
                                eventType: "delta-join",
                                result: "success",
                                delta: a,
                              }),
                              ll({ eventType: "join", result: "success" });
                          case 32:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [
                      [7, 12],
                      [17, 22],
                    ]
                  );
                })
              )),
              function (e) {
                return p.apply(this, arguments);
              }),
          },
          {
            key: "getVersion",
            value: function () {
              var e = this.version_.split(".");
              return (
                1e3 * parseInt(e[0]) + 100 * parseInt(e[1]) + parseInt(e[2])
              );
            },
          },
          {
            key: "doJoin",
            value: function (e) {
              var t = this;
              return new Promise(function (n, r) {
                if (!t.isInitialized_)
                  throw new sl({
                    code: ol.INVALID_OPERATION,
                    message: "SignalChannel is not ready yet",
                  });
                if (t.isJoined_)
                  throw new sl({
                    code: ol.INVALID_OPERATION,
                    message: "duplicate join() called",
                  });
                (t.roomId_ = e.roomId), void 0 !== e.role && (t.role_ = e.role);
                var i = "";
                void 0 !== e.privateMapKey && (i = e.privateMapKey),
                  (t.privateMapKey_ = i),
                  t.log_.info(
                    "Join() => joining room: "
                      .concat(e.roomId, " mode: ")
                      .concat(t.mode_, " role: ")
                      .concat(t.role_)
                  );
                var o,
                  a = t.signalInfo_,
                  s = {
                    openid: a.openId,
                    tinyid: a.tinyId,
                    peerconnectionport: "",
                    useStrRoomid: !!t.useStringRoomId_ && 1,
                    roomid: String(e.roomId),
                    sdkAppID: String(t.sdkAppId_),
                    socketid: a.socketId,
                    userSig: t.userSig_,
                    privMapEncrypt: i,
                    privMap: "",
                    relayip: a.relayInnerIp,
                    dataport: a.dataPort,
                    stunport: a.stunPort,
                    checkSigSeq: a.checkSigSeq,
                    pstnBizType: 0,
                    pstnPhoneNumber: null,
                    recordId: t.recordId_,
                    pureAudioPushMod: t.pureAudioPushMode_,
                    role: "user",
                    jsSdkVersion: String(t.getVersion()),
                    sdpSemantics: t.sdpSemantics_,
                    browserVersion: Ld,
                    closeLocalMedia: !0,
                    trtcscene: "live" === t.mode_ ? Xl : Ql,
                    trtcrole: "anchor" === t.role_ ? Zl : ep,
                    bussinessInfo: t.bussinessInfo_,
                    isAuxUser: t.isScreenShareOnly_,
                  };
                (t.joinTimeout_ = setTimeout(function () {
                  t.log_.error("join room timeout observed"),
                    r(
                      new sl({
                        code: ol.JOIN_ROOM_FAILED,
                        message: "join room timeout",
                      })
                    );
                }, 5e3)),
                  t.signalChannel_.sendWithReport(
                    Yd,
                    s,
                    ((o = 0),
                    navigator &&
                      navigator.connection &&
                      navigator.connection.effectiveType &&
                      (o = "4g" === navigator.connection.effectiveType ? 1 : 4),
                    navigator &&
                      navigator.connection &&
                      navigator.connection.type &&
                      ("wifi" === navigator.connection.type
                        ? (o = 1)
                        : "cellular" === navigator.connection.type && (o = 4)),
                    {
                      AbilityOption: {
                        GeneralLimit: {
                          CPULimit: {
                            uint32_CPU_num: String(
                              navigator.hardwareConcurrency || 0
                            ),
                            str_CPU_name: String(navigator.platform),
                            uint32_CPU_maxfreq: String(0),
                            model: "",
                            uint32_total_memory: String(0),
                          },
                          uint32_terminal_type: String(
                            _d
                              ? 4
                              : md
                              ? 2
                              : hd
                              ? 3
                              : Pd
                              ? 12
                              : Id
                              ? 5
                              : xd
                              ? 13
                              : 1
                          ),
                          uint32_device_type: String(0),
                          str_os_verion: _d
                            ? "Android"
                            : md
                            ? "iPhone"
                            : hd
                            ? "iPad"
                            : Pd
                            ? "Mac"
                            : Id
                            ? "Windows"
                            : xd
                            ? "Linux"
                            : "unknown",
                          uint32_link_type: String(1),
                          str_client_version: "4.3.14",
                          uint32_net_type: String(o),
                          ua: navigator.userAgent,
                          version: "",
                        },
                      },
                    })
                  ),
                  t.signalChannel_.once(qd.JOIN_ROOM_RESULT, function (e) {
                    clearTimeout(t.joinTimeout_), (t.joinTimeout_ = -1);
                    var i = e.data.content.ret;
                    i
                      ? (t.log_.error(
                          "Join room failed result: " +
                            i +
                            " error: " +
                            e.data.content.error
                        ),
                        r(
                          new sl({
                            code: ol.JOIN_ROOM_FAILED,
                            extraCode: i,
                            message:
                              "Failed to join room - " + e.data.content.error,
                          })
                        ))
                      : ((t.isJoined_ = !0),
                        t.log_.info("Join room success, start heartbeat"),
                        t.startHeartbeat(),
                        n());
                  });
              });
            },
          },
          {
            key: "leave",
            value:
              ((l = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n, r, i, o, a, s, c, u, d, l;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              Ul(this.userId_, {
                                eventId: Dl,
                                eventDesc: "leaving room",
                                timestamp: To(),
                                userId: this.userId_,
                                tinyId: this.tinyId_,
                              }),
                              (e.prev = 1),
                              (e.next = 4),
                              this.doHeartbeat()
                            );
                          case 4:
                            e.next = 8;
                            break;
                          case 6:
                            (e.prev = 6), (e.t0 = e.catch(1));
                          case 8:
                            (t = !1),
                              (n = !0),
                              (r = !1),
                              (i = void 0),
                              (e.prev = 12),
                              (o = this.connections_[Symbol.iterator]());
                          case 14:
                            if ((n = (a = o.next()).done)) {
                              e.next = 24;
                              break;
                            }
                            if (((s = Ct(a.value, 2))[0], (c = s[1]), t)) {
                              e.next = 21;
                              break;
                            }
                            return (e.next = 19), c.getVideoHealthStats();
                          case 19:
                            (u = e.sent).valid &&
                              ((t = !0), (this.downlinkVideoHealthStats_ = u));
                          case 21:
                            (n = !0), (e.next = 14);
                            break;
                          case 24:
                            e.next = 30;
                            break;
                          case 26:
                            (e.prev = 26),
                              (e.t1 = e.catch(12)),
                              (r = !0),
                              (i = e.t1);
                          case 30:
                            (e.prev = 30),
                              (e.prev = 31),
                              n || null == o.return || o.return();
                          case 33:
                            if (((e.prev = 33), !r)) {
                              e.next = 36;
                              break;
                            }
                            throw i;
                          case 36:
                            return e.finish(33);
                          case 37:
                            return e.finish(30);
                          case 38:
                            return (
                              (d = {
                                userAgent: navigator.userAgent,
                                uplink: this.uplinkVideoHealthStats_,
                                downlink: this.downlinkVideoHealthStats_,
                              }),
                              dl("healthstats-" + JSON.stringify(d)),
                              this.log_.info(
                                "HealthStats-" + JSON.stringify(d)
                              ),
                              (e.prev = 41),
                              (e.next = 44),
                              this.doLeave()
                            );
                          case 44:
                            e.next = 48;
                            break;
                          case 46:
                            (e.prev = 46), (e.t2 = e.catch(41));
                          case 48:
                            (this.isJoined_ = !1),
                              this.destroy(),
                              ll({ eventType: "leave", result: "success" }),
                              (l = Math.floor(
                                (new Date() - this.joinedTimestamp_) / 1e3
                              )),
                              ll({
                                eventType: "delta-leave",
                                result: "success",
                                delta: l,
                              });
                          case 53:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [
                      [1, 6],
                      [12, 26, 30, 38],
                      [31, , 33, 37],
                      [41, 46],
                    ]
                  );
                })
              )),
              function () {
                return l.apply(this, arguments);
              }),
          },
          {
            key: "doLeave",
            value: function () {
              var e = this;
              return new Promise(function (t, n) {
                return e.isJoined_
                  ? (e.log_.info("leave() => leaving room"),
                    e.stopHeartbeat(),
                    e.closeConnections(),
                    e.mutedStates_.clear(),
                    e.clearPublishTimeout(),
                    e.clearUnpublishTimeout(),
                    e.pendingRefresh_.clear(),
                    e.closeUplink(),
                    t())
                  : t();
              });
            },
          },
          {
            key: "clearPublishTimeout",
            value: function () {
              -1 !== this.publishTimeout_ &&
                (clearTimeout(this.publishTimeout_),
                (this.publishTimeout_ = -1));
            },
          },
          {
            key: "clearUnpublishTimeout",
            value: function () {
              this.unpublishTimeout_ &&
                (clearTimeout(this.unpublishTimeout_),
                (this.unpublishTimeout_ = -1));
            },
          },
          {
            key: "closeConnections",
            value: function () {
              this.connections_.forEach(function (e) {
                e.close();
              }),
                this.connections_.clear(),
                this.connectionsRefreshCount_.clear();
            },
          },
          {
            key: "destroy",
            value: function () {
              if (this.isJoined_)
                throw (
                  (this.log_.warn(
                    "please call leave() before destroy() client"
                  ),
                  new sl({
                    code: ol.INVALID_OPERATION,
                    message: "Please call leave() before destory() the client",
                  }))
                );
              this.log_.info("destroying SignalChannel"),
                this.signalChannel_ &&
                  (this.signalChannel_.close(), (this.signalChannel_ = null));
            },
          },
          {
            key: "publish",
            value: function (e) {
              var t = this;
              return new Promise(function (n, r) {
                if (!Yl())
                  throw new sl({
                    code: ol.NOT_SUPPORTED,
                    message: "the browser does NOT support TRTC!",
                  });
                if (!t.isJoined_)
                  throw new sl({
                    code: ol.INVALID_OPERATION,
                    message: "please call join() before publish()",
                  });
                if ("live" === t.mode_ && "audience" === t.role_)
                  throw new sl({
                    code: ol.INVALID_OPERATION,
                    message:
                      'no permission to publish() under live/audience, please call swithRole("anchor") firstly before publish()',
                  });
                if (t.localStream_)
                  throw new sl({
                    code: ol.INVALID_OPERATION,
                    message:
                      "duplicate publishing, please unpublish and then re-publish",
                  });
                if (t.isPublishing_)
                  throw new sl({
                    code: ol.INVALID_OPERATION,
                    message:
                      "previous publishing is ongoing, please avod re-publishing",
                  });
                t.isPublishing_ = !0;
                var i = new Date();
                t.log_.info("publish() => publishing local stream");
                var o = new tf({
                  userId: t.userId_,
                  tinyId: t.tinyId_,
                  client: t,
                  isUplink: !0,
                  signalChannel: t.signalChannel_,
                });
                o.initialize(),
                  (t.publishTimeout_ = setTimeout(function () {
                    (t.isPublishing_ = !1),
                      o.close(),
                      t.log_.error("failed to publish because of timeout"),
                      ll({ eventType: "publish", result: "failed" }),
                      r(
                        new sl({ code: ol.UNKNOWN, message: "publish timeout" })
                      );
                  }, 1e4)),
                  o.publish(e, function (e) {
                    t.clearPublishTimeout(),
                      (t.isPublishing_ = !1),
                      o.close(),
                      t.log_.error("failed to publish stream"),
                      ll({ eventType: "publish", result: "failed" }),
                      r(e);
                  }),
                  o.on(lp, function (r) {
                    t.clearPublishTimeout(),
                      (t.isPublishing_ = !1),
                      (t.localStream_ = r.stream),
                      t.localStream_.setConnection(o),
                      (t.uplinkConnection_ = o),
                      ll({ eventType: "publish", result: "success" });
                    var a = new Date();
                    ll({
                      eventType: "delta-publish",
                      result: "success",
                      delta: a - i,
                    }),
                      e.hasAudio() &&
                        Ul(t.userId_, {
                          eventId: fl,
                          eventDesc: "publish audio track",
                          timestamp: To(),
                          userId: t.userId_,
                          tinyId: t.tinyId_,
                        }),
                      e.hasVideo() &&
                        Ul(t.userId_, {
                          eventId: pl,
                          eventDesc: "publish video track",
                          timestamp: To(),
                          userId: t.userId_,
                          tinyId: t.tinyId_,
                        }),
                      n();
                  }),
                  o.on(hp, function (e) {
                    "connected" === e.state &&
                      t.publishRetryCount_ &&
                      ((t.publishRetryCount_ = 0),
                      t.log_.info("auto re-publish success"));
                  }),
                  o.on(fp, function (n) {
                    if (
                      n.getCode() === ol.ICE_TRANSPORT_ERROR &&
                      t.publishRetryCount_ < 3 &&
                      t.localStream_ === e
                    )
                      return (
                        (t.publishRetryCount_ += 1),
                        t.log_.warn(
                          "try to re-plublish the stream due to ice failure observed"
                        ),
                        void t
                          .unpublish(e)
                          .then(function () {
                            t.log_.warn("trying re-publish"),
                              t
                                .publish(e)
                                .then(function () {
                                  t.log_.info("auto re-publish is ongoing");
                                })
                                .catch(function (e) {
                                  t.log_.warn("auto re-publish failure"),
                                    (t.publishRetryCount_ = 0),
                                    t.emitter_.emit(Ep, n);
                                });
                          })
                          .catch(function (e) {
                            t.log_.error(
                              "re-plublish/unpublish failure observed"
                            ),
                              (t.publishRetryCount_ = 0),
                              t.emitter_.emit(Ep, n);
                          })
                      );
                    t.emitter_.emit(Ep, n);
                  });
              });
            },
          },
          {
            key: "unpublish",
            value: function (e) {
              var t = this;
              return new Promise(function (n, r) {
                if (t.isPublishing_)
                  throw new sl({
                    code: ol.INVALID_OPERATION,
                    message:
                      "unpublish() is being called during publish() is ongoing",
                  });
                if (e !== t.localStream_)
                  throw new sl({
                    code: ol.INVALID_PARAMETER,
                    message: "stream has not been published yet",
                  });
                t.log_.info("unpublish() => unpublishing local stream"),
                  t
                    .doUnpublish()
                    .then(function () {
                      ll({ eventType: "unpublish", result: "success" }), n();
                    })
                    .catch(function (e) {
                      ll({ eventType: "unpublish", result: "failed" }), r();
                    });
              });
            },
          },
          {
            key: "doUnpublish",
            value: function () {
              var e = this;
              return new Promise(function (t, n) {
                e.signalChannel_.send(Qd),
                  (e.unpublishTimeout_ = setTimeout(function () {
                    return (
                      e.log_.warn("unpublish() timeout observed"),
                      e.closeUplink(),
                      n()
                    );
                  }, 5e3)),
                  e.signalChannel_.once(qd.CLOSE_PEER_ACK, function (n) {
                    return (
                      e.clearUnpublishTimeout(),
                      e.log_.info(
                        "received CLOSE_PEER_ACK, close uplink connection"
                      ),
                      e.closeUplink(),
                      t()
                    );
                  });
              });
            },
          },
          {
            key: "closeUplink",
            value:
              ((d = ft(
                regeneratorRuntime.mark(function e() {
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!this.uplinkConnection_) {
                              e.next = 10;
                              break;
                            }
                            return (
                              (e.next = 3),
                              this.uplinkConnection_.getVideoHealthStats()
                            );
                          case 3:
                            (this.uplinkVideoHealthStats_ = e.sent),
                              this.uplinkConnection_.close(),
                              (this.uplinkConnection_ = null),
                              this.localStream_.hasAudio() &&
                                Ul(this.userId_, {
                                  eventId: ml,
                                  eventDesc: "unpublish audio track",
                                  timestamp: To(),
                                  userId: this.userId_,
                                  tinyId: this.tinyId_,
                                }),
                              this.localStream_.hasVideo() &&
                                Ul(this.userId_, {
                                  eventId: hl,
                                  eventDesc: "unpublish video track",
                                  timestamp: To(),
                                  userId: this.userId_,
                                  tinyId: this.tinyId_,
                                }),
                              this.localStream_.setConnection(null),
                              (this.localStream_ = null);
                          case 10:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function () {
                return d.apply(this, arguments);
              }),
          },
          {
            key: "subscribe",
            value:
              ((u = ft(
                regeneratorRuntime.mark(function e(t, n) {
                  var r;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (t.isRemote()) {
                              e.next = 2;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_PARAMETER,
                              message: "try to subscribe a local stream",
                            });
                          case 2:
                            return (
                              this.log_.info(
                                "subscribe() => subscribe to ["
                                  .concat(t.getUserId(), "] ")
                                  .concat(t.getType(), " stream with options: ")
                                  .concat(JSON.stringify(n))
                              ),
                              (r = t.getConnection()),
                              (e.next = 6),
                              r.subscribe(t, n)
                            );
                          case 6:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e, t) {
                return u.apply(this, arguments);
              }),
          },
          {
            key: "unsubscribe",
            value:
              ((c = ft(
                regeneratorRuntime.mark(function e(t) {
                  var n;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (t.isRemote()) {
                              e.next = 2;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_PARAMETER,
                              message: "try to unsubscribe a local stream",
                            });
                          case 2:
                            return (
                              this.log_.info(
                                "unsubscribe() => unsubscribe to ["
                                  .concat(t.getUserId(), "] ")
                                  .concat(t.getType(), " stream")
                              ),
                              (n = t.getConnection()),
                              (e.next = 6),
                              n.unsubscribe(t)
                            );
                          case 6:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return c.apply(this, arguments);
              }),
          },
          {
            key: "switchRole",
            value:
              ((s = ft(
                regeneratorRuntime.mark(function e(t) {
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if ("live" === this.mode_) {
                              e.next = 2;
                              break;
                            }
                            return e.abrupt("return");
                          case 2:
                            if (this.role_ === t) {
                              e.next = 11;
                              break;
                            }
                            if (
                              ((this.role_ = t),
                              this.log_.info(
                                "switchRole() => switch role to: " + t
                              ),
                              this.isJoined_)
                            ) {
                              e.next = 7;
                              break;
                            }
                            return e.abrupt("return");
                          case 7:
                            return (e.next = 9), this.leave();
                          case 9:
                            return (
                              (e.next = 11),
                              this.join({
                                role: t,
                                roomId: this.roomId_,
                                privateMapKey: this.privateMapKey_,
                              })
                            );
                          case 11:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return s.apply(this, arguments);
              }),
          },
          {
            key: "on",
            value: function (e, t) {
              this.emitter_.on(e, t);
            },
          },
          {
            key: "off",
            value: function (e, t) {
              "*" === e
                ? this.emitter_.removeAllListeners()
                : this.emitter_.off(e, t);
            },
          },
          {
            key: "getRemoteMutedState",
            value: function () {
              var e = this,
                t = [];
              return (
                this.mutedStates_.forEach(function (n, r, i) {
                  console.log(1673898793899, "e", e);
                  var o = e.connections_.get(r);
                  console.log(1673898793899, "o", o);
                  o && t.push(_t({ userId: o.getUserId() }, n));
                }),
                t
              );
            },
          },
          {
            key: "setDefaultMuteRemoteStreams",
            value: function (e) {
              this.log_.info("setDefaultMuteRemoteStreams muted: " + e),
                (this.disableReceiver_ = e);
            },
          },
          {
            key: "getTransportStats",
            value:
              ((a = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (((t = { rtt: 0 }), !this.uplinkConnection_)) {
                              e.next = 6;
                              break;
                            }
                            return (
                              (e.next = 4),
                              this.stats_.getSenderStats(this.uplinkConnection_)
                            );
                          case 4:
                            (n = e.sent), (t.rtt = n.rtt);
                          case 6:
                            return e.abrupt("return", t);
                          case 7:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function () {
                return a.apply(this, arguments);
              }),
          },
          {
            key: "getLocalAudioStats",
            value:
              ((o = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              (((t = {})[this.userId_] = {
                                bytesSent: 0,
                                packetsSent: 0,
                              }),
                              !this.uplinkConnection_)
                            ) {
                              e.next = 7;
                              break;
                            }
                            return (
                              (e.next = 5),
                              this.stats_.getSenderStats(this.uplinkConnection_)
                            );
                          case 5:
                            (n = e.sent),
                              (t[this.userId_] = {
                                bytesSent: n.audio.bytesSent,
                                packetsSent: n.audio.packetsSent,
                              });
                          case 7:
                            return e.abrupt("return", t);
                          case 8:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function () {
                return o.apply(this, arguments);
              }),
          },
          {
            key: "getLocalVideoStats",
            value:
              ((i = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              (((t = {})[this.userId_] = {
                                bytesSent: 0,
                                packetsSent: 0,
                                framesEncoded: 0,
                                framesSent: 0,
                                frameWidth: 0,
                                frameHeight: 0,
                              }),
                              !this.uplinkConnection_)
                            ) {
                              e.next = 7;
                              break;
                            }
                            return (
                              (e.next = 5),
                              this.stats_.getSenderStats(this.uplinkConnection_)
                            );
                          case 5:
                            (n = e.sent),
                              (t[this.userId_] = {
                                bytesSent: n.video.bytesSent,
                                packetsSent: n.video.packetsSent,
                                framesEncoded: n.video.framesEncoded,
                                framesSent: n.video.framesSent,
                                frameWidth: n.video.frameWidth,
                                frameHeight: n.video.frameHeight,
                              });
                          case 7:
                            return e.abrupt("return", t);
                          case 8:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function () {
                return i.apply(this, arguments);
              }),
          },
          {
            key: "getRemoteAudioStats",
            value:
              ((r = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n, r, i, o, a, s, c, u;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            (t = {}),
                              (n = !0),
                              (r = !1),
                              (i = void 0),
                              (e.prev = 4),
                              (o = this.connections_[Symbol.iterator]());
                          case 6:
                            if ((n = (a = o.next()).done)) {
                              e.next = 15;
                              break;
                            }
                            return (
                              (s = Ct(a.value, 2))[0],
                              (c = s[1]),
                              (e.next = 10),
                              this.stats_.getReceiverStats(c)
                            );
                          case 10:
                            (u = e.sent).hasAudio &&
                              (t[u.userId] = {
                                bytesReceived: u.audio.bytesReceived,
                                packetsReceived: u.audio.packetsReceived,
                                packetsLost: u.audio.packetsLost,
                              });
                          case 12:
                            (n = !0), (e.next = 6);
                            break;
                          case 15:
                            e.next = 21;
                            break;
                          case 17:
                            (e.prev = 17),
                              (e.t0 = e.catch(4)),
                              (r = !0),
                              (i = e.t0);
                          case 21:
                            (e.prev = 21),
                              (e.prev = 22),
                              n || null == o.return || o.return();
                          case 24:
                            if (((e.prev = 24), !r)) {
                              e.next = 27;
                              break;
                            }
                            throw i;
                          case 27:
                            return e.finish(24);
                          case 28:
                            return e.finish(21);
                          case 29:
                            return e.abrupt("return", t);
                          case 30:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [
                      [4, 17, 21, 29],
                      [22, , 24, 28],
                    ]
                  );
                })
              )),
              function () {
                return r.apply(this, arguments);
              }),
          },
          {
            key: "getRemoteVideoStats",
            value:
              ((n = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n, r, i, o, a, s, c, u;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            (t = {}),
                              (n = !0),
                              (r = !1),
                              (i = void 0),
                              (e.prev = 4),
                              (o = this.connections_[Symbol.iterator]());
                          case 6:
                            if ((n = (a = o.next()).done)) {
                              e.next = 15;
                              break;
                            }
                            return (
                              (s = Ct(a.value, 2))[0],
                              (c = s[1]),
                              (e.next = 10),
                              this.stats_.getReceiverStats(c)
                            );
                          case 10:
                            (u = e.sent).hasVideo &&
                              (t[u.userId] = {
                                bytesReceived: u.video.bytesReceived,
                                packetsReceived: u.video.packetsReceived,
                                packetsLost: u.video.packetsLost,
                                framesDecoded: u.video.framesDecoded,
                                frameWidth: u.video.frameWidth,
                                frameHeight: u.video.frameHeight,
                              });
                          case 12:
                            (n = !0), (e.next = 6);
                            break;
                          case 15:
                            e.next = 21;
                            break;
                          case 17:
                            (e.prev = 17),
                              (e.t0 = e.catch(4)),
                              (r = !0),
                              (i = e.t0);
                          case 21:
                            (e.prev = 21),
                              (e.prev = 22),
                              n || null == o.return || o.return();
                          case 24:
                            if (((e.prev = 24), !r)) {
                              e.next = 27;
                              break;
                            }
                            throw i;
                          case 27:
                            return e.finish(24);
                          case 28:
                            return e.finish(21);
                          case 29:
                            return e.abrupt("return", t);
                          case 30:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [
                      [4, 17, 21, 29],
                      [22, , 24, 28],
                    ]
                  );
                })
              )),
              function () {
                return n.apply(this, arguments);
              }),
          },
          {
            key: "getSdpSemantics",
            value: function () {
              return this.sdpSemantics_;
            },
          },
          {
            key: "getIceServers",
            value: function () {
              var e = [];
              return this.turnServer_ && e.push(this.turnServer_), e;
            },
          },
          {
            key: "startHeartbeat",
            value: function () {
              if (-1 === this.heartbeat_) {
                this.log_.info("startHeartbeat..."),
                  (this.heartbeat_ = setInterval(
                    this.doHeartbeat.bind(this),
                    2e3
                  ));
              }
            },
          },
          {
            key: "stopHeartbeat",
            value: function () {
              -1 !== this.heartbeat_ &&
                (this.log_.info("stopHeartbeat"),
                clearInterval(this.heartbeat_),
                (this.heartbeat_ = -1));
            },
          },
          {
            key: "doHeartbeat",
            value:
              ((t = ft(
                regeneratorRuntime.mark(function e() {
                  var t, n, r, i, o;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.next = 2),
                              this.stats_.getStatsReport(
                                this.uplinkConnection_,
                                this.connections_
                              )
                            );
                          case 2:
                            (t = e.sent),
                              (n = this.signalChannel_.isConnected()
                                ? Fl(this.userId_)
                                : []),
                              (r = {
                                WebRTCQualityReq: t,
                                eventList: n,
                                sdkAppId: this.sdkAppId_,
                                tinyid: this.tinyId_,
                                roomid: this.roomId_,
                                socketid: this.signalInfo_.socketId,
                                clientip: this.signalInfo_.localIp,
                                serverip: this.signalInfo_.relayIp,
                                cpunumber: navigator.hardwareConcurrency || 0,
                                cpudevice: navigator.platform,
                                devicename: navigator.platform,
                                ostype: navigator.platform,
                              }),
                              (i = 0),
                              this.localStream_ &&
                                this.localStream_.getMediaStream() &&
                                ((o = this.localStream_
                                  .getMediaStream()
                                  .getAudioTracks()),
                                (i = o.length > 0 && o[0].muted ? 3 : 1)),
                              (r.WebRTCQualityReq.AudioReportState.uint32_microphone_status =
                                i),
                              this.signalChannel_.send(Xd, r);
                          case 9:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function () {
                return t.apply(this, arguments);
              }),
          },
          {
            key: "onPeerJoin",
            value: function (e) {
              var t = this,
                n = e.content,
                r = n.srcopenid,
                i = n.srctinyid,
                o = n.remoteoffer,
                a = this.connections_.get(i);
              a &&
                (this.log_.warn(
                  "duplicated peer-join observed, rebuild the connection"
                ),
                this.log_.info("remote peer [".concat(r, "] is leaving")),
                this.emitter_.emit(bp, { userId: r }),
                a.close(),
                this.connections_.delete(i));
              var s = this.pendingRefresh_.get(i);
              s && (clearTimeout(s), this.pendingRefresh_.delete(i)),
                this.log_.info("remote peer [".concat(r, "] is online")),
                this.emitter_.emit(Sp, { userId: r });
              var c = new tf({
                userId: r,
                tinyId: i,
                client: this,
                isUplink: !1,
                signalChannel: this.signalChannel_,
              });
              this.connections_.set(i, c),
                c.initialize(),
                c.setRemoteOffer(o),
                c.on(cp, function (e) {
                  t.emitter_.emit(mp, { stream: e.stream });
                }),
                c.on(up, function (e) {
                  t.emitter_.emit(vp, { stream: e.stream });
                }),
                c.on(dp, function (e) {
                  t.emitter_.emit(gp, { stream: e.stream });
                }),
                c.on(pp, function (e) {
                  t.emitter_.emit(_p, { stream: e.stream });
                }),
                c.on(fp, function (e) {
                  var n = e.getCode(),
                    o = t.connectionsRefreshCount_.get(i);
                  if (n === ol.ICE_TRANSPORT_ERROR && o < 5) {
                    (o += 1),
                      t.connectionsRefreshCount_.set(i, o),
                      t.log_.warn(
                        "try to refresh remote peer [".concat(r, "]")
                      );
                    var a = { srctinyid: i };
                    t.signalChannel_.send(il, a);
                    var s = t.pendingRefresh_.get(i);
                    s && clearTimeout(s);
                    var c = t;
                    return (
                      (s = setTimeout(function () {
                        t.log_.warn("refresh remote peer timeout observed"),
                          c.emitter_.emit(Ep, e);
                      }, 1e4)),
                      void t.pendingRefresh_.set(i, s)
                    );
                  }
                  t.emitter_.emit(Ep, e);
                }),
                c.on(hp, function (e) {
                  "connected" === e.state &&
                    t.connectionsRefreshCount_.set(i, 0);
                });
            },
          },
          {
            key: "onPeerLeave",
            value: function (e) {
              var t = e.content,
                n = t.srctinyid,
                r = t.srcopenid,
                i = this.connections_.get(n);
              i &&
                (void 0 === r && (r = i.getUserId()),
                this.log_.info("remote peer [".concat(r, "] is leaving")),
                this.emitter_.emit(bp, { userId: r }),
                i.close(),
                this.connections_.delete(n),
                this.mutedStates_.delete(n),
                this.connectionsRefreshCount_.delete(n));
            },
          },
          {
            key: "onUpdateRemoteMuteStat",
            value: function (e) {
              var t = this,
                n = e.content;
              n.userlist.forEach(function (e) {
                var n = e.srctinyid,
                  r = e.userid;
                if (0 !== n && n !== t.tinyId_)
                  if (t.connections_.get(n)) {
                    var i = !!(1 & e.flag),
                      o = !!(8 & e.flag),
                      a = !!(64 & e.flag),
                      s = !!(16 & e.flag),
                      c = t.mutedStates_.get(n);
                    if (void 0 === c)
                      return (
                        t.mutedStates_.set(n, {
                          hasAudio: o,
                          hasVideo: i,
                          audioMuted: a,
                          videoMuted: s,
                        }),
                        i
                          ? s
                            ? t.emitter_.emit(Rp, { userId: r })
                            : t.emitter_.emit(wp, { userId: r })
                          : t.emitter_.emit(Rp, { userId: r }),
                        void (o
                          ? a
                            ? t.emitter_.emit(kp, { userId: r })
                            : t.emitter_.emit(Tp, { userId: r })
                          : t.emitter_.emit(kp, { userId: r }))
                      );
                    var u = !a && o;
                    (!c.audioMuted && c.hasAudio) !== u &&
                      (u
                        ? t.emitter_.emit(Tp, { userId: r })
                        : t.emitter_.emit(kp, { userId: r }));
                    var d = !s && i;
                    (!c.videoMuted && c.hasVideo) !== d &&
                      (d
                        ? t.emitter_.emit(wp, { userId: r })
                        : t.emitter_.emit(Rp, { userId: r })),
                      t.mutedStates_.set(n, {
                        hasAudio: o,
                        hasVideo: i,
                        audioMuted: a,
                        videoMuted: s,
                      });
                  } else t.mutedStates_.delete(n);
              });
            },
          },
          {
            key: "onClientBanned",
            value: function (e) {
              this.emitter_.emit(
                Cp,
                new sl({
                  code: ol.CLIENT_BANNED,
                  message: "client was banned because of " + e,
                })
              );
            },
          },
          {
            key: "triggerReconnectForTest",
            value: function (e) {
              var t = { exitcode: e };
              this.log_.warn("triggerReconnectForTest exitcode: " + e),
                this.signalChannel_.send(rl, t);
            },
          },
          {
            key: "setBandwidthForTest",
            value: function (e) {
              this.uplinkConnection_ && this.uplinkConnection_.setBandwidth(e);
            },
          },
        ]),
        e
      );
    })(),
    rf = (function () {
      var e = ft(
        regeneratorRuntime.mark(function e(t) {
          var n;
          return regeneratorRuntime.wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (navigator.mediaDevices) {
                    e.next = 3;
                    break;
                  }
                  return (
                    ar.error("navigator.mediaDevices is undefined"),
                    e.abrupt("return")
                  );
                case 3:
                  return (
                    (n = of(t)),
                    ar.info(
                      "getUserMedia with contraints: " + JSON.stringify(n)
                    ),
                    (e.next = 7),
                    navigator.mediaDevices.getUserMedia(n)
                  );
                case 7:
                  return e.abrupt("return", e.sent);
                case 8:
                case "end":
                  return e.stop();
              }
          }, e);
        })
      );
      return function (t) {
        return e.apply(this, arguments);
      };
    })();
  function of(e) {
    return {
      audio:
        !!e.audio &&
        (void 0 !== e.microphoneId
          ? {
              deviceId: { exact: e.microphoneId },
              sampleRate: e.sampleRate,
              channelCount: e.channelCount,
            }
          : { sampleRate: e.sampleRate, channelCount: e.channelCount }),
      video:
        void 0 !== e.facingMode && e.video
          ? {
              facingMode: e.facingMode,
              width: e.width,
              height: e.height,
              frameRate: e.frameRate,
            }
          : void 0 !== e.cameraId && e.video
          ? {
              deviceId: { exact: e.cameraId },
              width: e.width,
              height: e.height,
              frameRate: e.frameRate,
            }
          : !!e.video &&
            (void 0 === e.width || {
              width: e.width,
              height: e.height,
              frameRate: e.frameRate,
            }),
    };
  }
  var af = (function () {
    var e = ft(
      regeneratorRuntime.mark(function e(t) {
        var n, r, i, o;
        return regeneratorRuntime.wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                if (navigator.mediaDevices) {
                  e.next = 3;
                  break;
                }
                return (
                  ar.error("navigator.mediaDevices is undefined"),
                  e.abrupt("return")
                );
              case 3:
                if (((n = null), !t.audio)) {
                  e.next = 10;
                  break;
                }
                return (
                  (r = sf(t)),
                  ar.info(
                    "getUserMedia with constraints: " + JSON.stringify(r)
                  ),
                  (e.next = 9),
                  navigator.mediaDevices.getUserMedia(r)
                );
              case 9:
                n = e.sent;
              case 10:
                return (
                  (i = cf(t)),
                  ar.info(
                    "getDisplayMedia with contraints: " + JSON.stringify(i)
                  ),
                  (e.next = 14),
                  navigator.mediaDevices.getDisplayMedia(i)
                );
              case 14:
                return (
                  (o = e.sent),
                  n && o.addTrack(n.getAudioTracks()[0]),
                  e.abrupt("return", o)
                );
              case 17:
              case "end":
                return e.stop();
            }
        }, e);
      })
    );
    return function (t) {
      return e.apply(this, arguments);
    };
  })();
  function sf(e) {
    return {
      audio:
        void 0 !== e.microphoneId
          ? {
              deviceId: { exact: e.microphoneId },
              sampleRate: e.sampleRate,
              channelCount: e.channelCount,
            }
          : { sampleRate: e.sampleRate, channelCount: e.channelCount },
      video: !1,
    };
  }
  function cf(e) {
    var t = { width: e.width, height: e.height, frameRate: e.frameRate };
    return (
      void 0 !== e.screenSource && (t.displaySurface = e.screenSource),
      { video: t }
    );
  }
  var uf = new Map();
  uf.set("120p", { width: 160, height: 120, frameRate: 15, bitrate: 200 }),
    uf.set("180p", { width: 320, height: 180, frameRate: 15, bitrate: 350 }),
    uf.set("240p", { width: 320, height: 240, frameRate: 15, bitrate: 400 }),
    uf.set("360p", { width: 640, height: 360, frameRate: 15, bitrate: 800 }),
    uf.set("480p", { width: 640, height: 480, frameRate: 15, bitrate: 900 }),
    uf.set("720p", { width: 1280, height: 720, frameRate: 15, bitrate: 1500 }),
    uf.set("1080p", { width: 1920, height: 1080, frameRate: 15, bitrate: 2e3 }),
    uf.set("1440p", {
      width: 2560,
      height: 1440,
      frameRate: 30,
      bitrate: 4860,
    }),
    uf.set("4K", { width: 3840, height: 2160, frameRate: 30, bitrate: 9e3 });
  var df = new Map();
  df.set("480p", { width: 640, height: 480, frameRate: 5, bitrate: 900 }),
    df.set("480p_2", { width: 640, height: 480, frameRate: 30, bitrate: 1e3 }),
    df.set("720p", { width: 1280, height: 720, frameRate: 5, bitrate: 1200 }),
    df.set("720p_2", { width: 1280, height: 720, frameRate: 30, bitrate: 3e3 }),
    df.set("1080p", { width: 1920, height: 1080, frameRate: 5, bitrate: 1600 }),
    uf.set("1080p_2", {
      width: 1920,
      height: 1080,
      frameRate: 30,
      bitrate: 4e3,
    });
  var lf = new Map();
  lf.set("standard", { sampleRate: 48e3, channelCount: 1, bitrate: 40 }),
    lf.set("high", { sampleRate: 48e3, channelCount: 1, bitrate: 128 });
  var pf = (function (e) {
      function t(e) {
        var n;
        ht(this, t);
        var r = _t({}, e, { isRemote: !1, type: "local" });
        return (
          e.screen && (r.mirror = !1),
          ((n = Tt(this, St(t).call(this, r))).video_ = e.video),
          (n.audio_ = e.audio),
          (n.cameraId_ = e.cameraId),
          (n.facingMode_ = e.facingMode),
          (n.microphoneId_ = e.microphoneId),
          (n.videoSource_ = e.videoSource),
          (n.audioSource_ = e.audioSource),
          (n.screen_ = e.screen),
          (n.screenSource_ = e.screenSource),
          (n.audioProfile_ = {
            sampleRate: 48e3,
            channelCount: 1,
            bitrate: 40,
          }),
          (n.videoProfile_ = {
            width: 640,
            height: 480,
            frameRate: 15,
            bitrate: 900,
          }),
          (n.screenProfile_ = {
            width: 1920,
            height: 1080,
            frameRate: 5,
            bitrate: 1600,
          }),
          (n.videoBitrate_ = n.screen_ ? 1600 : 900),
          n
        );
      }
      var n, r, i, o;
      return (
        yt(t, Gp),
        vt(t, [
          {
            key: "initialize",
            value: function () {
              var e = this;
              return new Promise(function (t, n) {
                if (void 0 === e.audio_) {
                  var r = new MediaStream();
                  return (
                    void 0 !== e.audioSource_ &&
                      (r.addTrack(e.audioSource_), e.setHasAudio(!0)),
                    void 0 !== e.videoSource_ &&
                      (r.addTrack(e.videoSource_), e.setHasVideo(!0)),
                    e.setMediaStream(r),
                    ll({
                      eventType: "stream-initialize",
                      kind: "custom",
                      result: "success",
                    }),
                    t()
                  );
                }
                e.screen_
                  ? (e.log_.info(
                      "initialize stream audio: " +
                        e.audio_ +
                        " screen: " +
                        e.screen_
                    ),
                    af({
                      audio: e.audio_,
                      microphoneId: e.microphoneId_,
                      screenSource: e.screenSource_,
                      width: e.screenProfile_.width,
                      height: e.screenProfile_.height,
                      frameRate: e.screenProfile_.frameRate,
                      sampleRate: e.audioProfile_.sampleRate,
                      channelCount: e.audioProfile_.channelCount,
                    })
                      .catch(function (t) {
                        ll({
                          eventType: "stream-initialize",
                          kind: "getDisplayMedia",
                          result: "failed",
                        }),
                          e.log_.error("getDisplayMedia error observed " + t),
                          n(t);
                      })
                      .then(function (n) {
                        return (
                          e.setMediaStream(n),
                          e.setHasAudio(e.audio_),
                          e.setHasVideo(!0),
                          e.listenForScreenSharingStopped(e.getVideoTrack()),
                          e.setVideoContentHint("detail"),
                          ll({
                            eventType: "stream-initialize",
                            kind: "getDisplayMedia",
                            result: "success",
                          }),
                          t()
                        );
                      }))
                  : (e.log_.info(
                      "initialize stream audio: " +
                        e.audio_ +
                        " video: " +
                        e.video_
                    ),
                    rf({
                      audio: e.audio_,
                      video: e.video_,
                      facingMode: e.facingMode_,
                      cameraId: e.cameraId_,
                      microphoneId: e.microphoneId_,
                      width: e.videoProfile_.width,
                      height: e.videoProfile_.height,
                      frameRate: e.videoProfile_.frameRate,
                      sampleRate: e.audioProfile_.sampleRate,
                      channelCount: e.audioProfile_.channelCount,
                    })
                      .catch(function (t) {
                        ll({
                          eventType: "stream-initialize",
                          kind: "getUserMedia",
                          result: "failed",
                        }),
                          e.log_.error("getUserMedia error observed " + t),
                          n(t);
                      })
                      .then(function (n) {
                        return (
                          e.setMediaStream(n),
                          e.setHasAudio(e.audio_),
                          e.setHasVideo(e.video_),
                          e.log_.debug(
                            "gotStream hasAudio: " +
                              e.hasAudio_ +
                              " hasVideo: " +
                              e.hasVideo_
                          ),
                          ll({
                            eventType: "stream-initialize",
                            kind: "getUserMedia",
                            result: "success",
                          }),
                          t()
                        );
                      }));
              });
            },
          },
          {
            key: "listenForScreenSharingStopped",
            value: function (e) {
              var t = this;
              e.addEventListener("ended", function (e) {
                t.log_.info(
                  "screensharing was stopped because the video track is ended"
                ),
                  t.emitter_.emit(Pp);
              });
            },
          },
          {
            key: "muteAudio",
            value: function () {
              var e = wt(St(t.prototype), "muteAudio", this).call(this);
              if (e) {
                this.log_.info("localStream mute audio");
                var n = this.getConnection();
                if (n) {
                  n.setMutedState("audio", !0);
                  var r = n.getUserId(),
                    i = n.getTinyId();
                  Ul(r, {
                    eventId: vl,
                    eventDesc: "mute local audio track",
                    timestamp: To(),
                    userId: r,
                    tinyId: i,
                  });
                }
              }
              return e;
            },
          },
          {
            key: "muteVideo",
            value: function () {
              this.log_.info("localStream mute video");
              var e = wt(St(t.prototype), "muteVideo", this).call(this);
              if (e) {
                var n = this.getConnection();
                if (n) {
                  n.setMutedState("video", !0);
                  var r = n.getUserId(),
                    i = n.getTinyId();
                  Ul(r, {
                    eventId: gl,
                    eventDesc: "mute local video track",
                    timestamp: To(),
                    userId: r,
                    tinyId: i,
                  });
                }
              }
              return e;
            },
          },
          {
            key: "unmuteAudio",
            value: function () {
              var e = wt(St(t.prototype), "unmuteAudio", this).call(this);
              if (e) {
                this.log_.info("localStream unmute audio");
                var n = this.getConnection();
                if (n) {
                  n.setMutedState("audio", !1);
                  var r = n.getUserId(),
                    i = n.getTinyId();
                  Ul(r, {
                    eventId: _l,
                    eventDesc: "unmute local audio track",
                    timestamp: To(),
                    userId: r,
                    tinyId: i,
                  });
                }
              }
              return e;
            },
          },
          {
            key: "unmuteVideo",
            value: function () {
              this.log_.info("localStream unmute video");
              var e = wt(St(t.prototype), "unmuteVideo", this).call(this);
              if (e) {
                var n = this.getConnection();
                if (n) {
                  n.setMutedState("video", !1);
                  var r = n.getUserId(),
                    i = n.getTinyId();
                  Ul(r, {
                    eventId: yl,
                    eventDesc: "unmute local video track",
                    timestamp: To(),
                    userId: r,
                    tinyId: i,
                  });
                }
              }
              return e;
            },
          },
          {
            key: "setAudioProfile",
            value: function (e) {
              var t;
              "object" === lt(e)
                ? (t = e)
                : void 0 === (t = lf.get(e)) && (t = lf.get("standard")),
                this.log_.info("setAudioProfile: " + JSON.stringify(t)),
                (this.audioProfile_ = t);
            },
          },
          {
            key: "setVideoProfile",
            value: function (e) {
              var t;
              "object" === lt(e)
                ? (t = e)
                : void 0 === (t = uf.get(e)) && (t = uf.get("480p")),
                this.log_.info("setVideoProfile " + JSON.stringify(t)),
                (this.videoProfile_ = t),
                (this.videoBitrate_ = t.bitrate);
            },
          },
          {
            key: "getVideoBitrate",
            value: function () {
              return this.videoBitrate_;
            },
          },
          {
            key: "getAudioBitrate",
            value: function () {
              return this.audioProfile_.bitrate;
            },
          },
          {
            key: "setScreenProfile",
            value: function (e) {
              var t = e;
              "object" !== lt(e) &&
                void 0 === (t = df.get(e)) &&
                (t = df.get("1080p")),
                this.log_.info("setScreenProfile " + JSON.stringify(e)),
                (this.screenProfile_ = t),
                (this.videoBitrate_ = t.bitrate);
            },
          },
          {
            key: "getVideoProfile",
            value: function () {
              return this.screen_ ? this.screenProfile_ : this.videoProfile_;
            },
          },
          {
            key: "getAudioProfile",
            value: function () {
              return this.audioProfile_;
            },
          },
          {
            key: "setVideoContentHint",
            value: function (e) {
              var t = this.getVideoTrack();
              t &&
                "contentHint" in t &&
                (this.log_.info("set video track contentHint to: " + e),
                (t.contentHint = e),
                t.contentHint !== e &&
                  this.log_.warn("Invalid video track contentHint: " + e));
            },
          },
          {
            key: "switchDevice",
            value:
              ((o = ft(
                regeneratorRuntime.mark(function e(n, r) {
                  var i, o, a, s, c, u, d;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!this.screen_) {
                              e.next = 2;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_OPERATION,
                              message:
                                "switch device is not supported in screen sharing",
                            });
                          case 2:
                            if (
                              !(
                                ("audio" === n && this.microphoneId_ === r) ||
                                ("video" === n && this.cameraId_ === r) ||
                                this.audioSource_ ||
                                this.videoSource_
                              )
                            ) {
                              e.next = 4;
                              break;
                            }
                            return e.abrupt("return");
                          case 4:
                            if (
                              ("audio" === n &&
                                ((this.microphoneId_ = r),
                                this.audio_ || (this.audio_ = !0)),
                              "video" === n &&
                                ("user" === r || "environment" === r
                                  ? (this.facingMode_ = r)
                                  : (this.cameraId_ = r),
                                this.video_ || (this.video_ = !0)),
                              this.getMediaStream())
                            ) {
                              e.next = 8;
                              break;
                            }
                            return e.abrupt("return");
                          case 8:
                            return (
                              this.log_.info("switchDevice " + n + " to: " + r),
                              "video" === n &&
                                (_d || gd) &&
                                (i = this.getVideoTrack()) &&
                                i.stop(),
                              (e.next = 12),
                              rf({
                                audio: this.audio_,
                                video: this.video_,
                                facingMode: this.facingMode_,
                                cameraId: this.cameraId_,
                                microphoneId: this.microphoneId_,
                                width: this.videoProfile_.width,
                                height: this.videoProfile_.height,
                                frameRate: this.videoProfile_.frameRate,
                                sampleRate: this.audioProfile_.sampleRate,
                                channelCount: this.audioProfile_.channelCount,
                              })
                            );
                          case 12:
                            if (
                              ((o = e.sent),
                              this.setMediaStream(o),
                              !(a = this.getConnection()))
                            ) {
                              e.next = 24;
                              break;
                            }
                            return (e.next = 18), a.replaceStream(o);
                          case 18:
                            (s = a.getUserId()),
                              (c = a.getTinyId()),
                              (u = Tl),
                              (d = "switch camera"),
                              "audio" === n &&
                                ((u = wl), (d = "switch microphone")),
                              Ul(s, {
                                eventId: u,
                                eventDesc: d,
                                timestamp: To(),
                                userId: s,
                                tinyId: c,
                              });
                          case 24:
                            return (
                              this.log_.info(
                                "swichDevice - restart audio/video player"
                              ),
                              wt(St(t.prototype), "restartAudio", this).call(
                                this
                              ),
                              wt(St(t.prototype), "restartVideo", this).call(
                                this
                              ),
                              e.abrupt("return")
                            );
                          case 28:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e, t) {
                return o.apply(this, arguments);
              }),
          },
          {
            key: "addTrack",
            value:
              ((i = ft(
                regeneratorRuntime.mark(function e(t) {
                  var n, r, i, o, a, s, c;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if ((n = this.getMediaStream())) {
                              e.next = 3;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_OPERATION,
                              message:
                                "the local stream is not initialized yet",
                            });
                          case 3:
                            if (
                              !(
                                ("audio" === t.kind &&
                                  n.getAudioTracks().length > 0) ||
                                ("video" === t.kind &&
                                  n.getVideoTracks().length > 0)
                              )
                            ) {
                              e.next = 5;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_OPERATION,
                              message:
                                "A Stream has at most one audio track and one video track",
                            });
                          case 5:
                            if ("video" !== t.kind) {
                              e.next = 10;
                              break;
                            }
                            if (
                              !("getSettings" in MediaStreamTrack.prototype)
                            ) {
                              e.next = 10;
                              break;
                            }
                            if (
                              (r = t.getSettings()).width ===
                                this.videoProfile_.width &&
                              r.height === this.videoProfile_.height
                            ) {
                              e.next = 10;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_PARAMETER,
                              message: "video resolution of the track ("
                                .concat(r.width, " x ")
                                .concat(
                                  r.height,
                                  ") shall be kept the same as the one defined via setVideoProfile(): "
                                )
                                .concat(this.videoProfile_.width, " x ")
                                .concat(this.videoProfile_.height),
                            });
                          case 10:
                            if (
                              (n.addTrack(t),
                              "audio" === t.kind
                                ? this.setHasAudio(!0)
                                : this.setHasVideo(!0),
                              !(i = this.getConnection()))
                            ) {
                              e.next = 22;
                              break;
                            }
                            return (e.next = 16), i.addTrack(t);
                          case 16:
                            (o = i.getUserId()),
                              (a = i.getTinyId()),
                              (s = pl),
                              (c =
                                "add video track to current published stream"),
                              "audio" === t.kind &&
                                ((s = fl),
                                (c =
                                  "add audio track to current published stream")),
                              Ul(o, {
                                eventId: s,
                                eventDesc: c,
                                timestamp: To(),
                                userId: o,
                                tinyId: a,
                              });
                          case 22:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return i.apply(this, arguments);
              }),
          },
          {
            key: "removeTrack",
            value:
              ((r = ft(
                regeneratorRuntime.mark(function e(t) {
                  var n, r, i, o, a, s;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if ("audio" !== t.kind) {
                              e.next = 2;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_PARAMETER,
                              message: "remove audio track is not supported",
                            });
                          case 2:
                            if ((n = this.getMediaStream())) {
                              e.next = 5;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_OPERATION,
                              message:
                                "the local stream is not initialized yet",
                            });
                          case 5:
                            if (-1 !== n.getTracks().indexOf(t)) {
                              e.next = 7;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_PARAMETER,
                              message:
                                "the track to be removed is not being publishing",
                            });
                          case 7:
                            if (
                              (n.removeTrack(t),
                              "audio" === t.kind
                                ? this.setHasAudio(!1)
                                : this.setHasVideo(!1),
                              !(r = this.getConnection()))
                            ) {
                              e.next = 19;
                              break;
                            }
                            return (e.next = 13), r.removeTrack(t);
                          case 13:
                            (i = r.getUserId()),
                              (o = r.getTinyId()),
                              (a = hl),
                              (s =
                                "remove video track from current published stream"),
                              "audio" === t.kind &&
                                ((a = ml),
                                (s =
                                  "remove audio track from current published stream")),
                              Ul(i, {
                                eventId: a,
                                eventDesc: s,
                                timestamp: To(),
                                userId: i,
                                tinyId: o,
                              });
                          case 19:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return r.apply(this, arguments);
              }),
          },
          {
            key: "replaceTrack",
            value:
              ((n = ft(
                regeneratorRuntime.mark(function e(n) {
                  var r, i, o, a, s, c, u;
                  return regeneratorRuntime.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if ((r = this.getMediaStream())) {
                              e.next = 3;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_OPERATION,
                              message:
                                "the local stream is not initialized yet",
                            });
                          case 3:
                            if (
                              !(
                                ("audio" === n.kind &&
                                  r.getAudioTracks().length <= 0) ||
                                ("video" === n.kind &&
                                  r.getVideoTracks().length <= 0)
                              )
                            ) {
                              e.next = 5;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_PARAMETER,
                              message: "try to replace "
                                .concat(
                                  n.kind,
                                  " track but there's no previous "
                                )
                                .concat(n.kind, " being published"),
                            });
                          case 5:
                            if ("video" !== n.kind) {
                              e.next = 10;
                              break;
                            }
                            if (
                              !("getSettings" in MediaStreamTrack.prototype)
                            ) {
                              e.next = 10;
                              break;
                            }
                            if (
                              (i = n.getSettings()).width ===
                                this.videoProfile_.width &&
                              i.height === this.videoProfile_.height
                            ) {
                              e.next = 10;
                              break;
                            }
                            throw new sl({
                              code: ol.INVALID_PARAMETER,
                              message: "video resolution of the track ("
                                .concat(i.width, " x ")
                                .concat(
                                  i.height,
                                  ") shall be kept the same as the one defined via setVideoProfile(): "
                                )
                                .concat(this.videoProfile_.width, " x ")
                                .concat(this.videoProfile_.height),
                            });
                          case 10:
                            if (
                              ("audio" === n.kind
                                ? (r.removeTrack(r.getAudioTracks()[0]),
                                  r.addTrack(n),
                                  wt(
                                    St(t.prototype),
                                    "restartAudio",
                                    this
                                  ).call(this))
                                : (r.removeTrack(r.getVideoTracks()[0]),
                                  r.addTrack(n),
                                  wt(
                                    St(t.prototype),
                                    "restartVideo",
                                    this
                                  ).call(this)),
                              !(o = this.getConnection()))
                            ) {
                              e.next = 21;
                              break;
                            }
                            return (e.next = 15), o.replaceTrack(n);
                          case 15:
                            (a = o.getUserId()),
                              (s = o.getTinyId()),
                              (c = Cl),
                              (u =
                                "replace video track from current published stream"),
                              "audio" === n.kind &&
                                ((c = El),
                                (u =
                                  "replace audio track from current published stream")),
                              Ul(a, {
                                eventId: c,
                                eventDesc: u,
                                timestamp: To(),
                                userId: a,
                                tinyId: s,
                              });
                          case 21:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return n.apply(this, arguments);
              }),
          },
          {
            key: "setAudioVolume",
            value: function (e) {
              wt(St(t.prototype), "setAudioVolume", this).call(this, e);
            },
          },
        ]),
        t
      );
    })(),
    ff = (function () {
      function e() {
        ht(this, e), (this.cache = []), this.init();
      }
      return (
        vt(e, [
          {
            key: "report",
            value: function (e, t) {
              var n = this;
              try {
                window.MtaH5
                  ? (window.MtaH5.clickStat(e, t),
                    this.cache.forEach(function (e) {
                      var t = e.name,
                        r = e.param;
                      window.MtaH5.clickStat(t, r), n.cache.shift();
                    }))
                  : this.cache.push({ name: e, param: t });
              } catch (bf) {}
            },
          },
          {
            key: "stat",
            value: function () {
              try {
                window.MtaH5 && window.MtaH5.pgv();
              } catch (bf) {}
            },
          },
          {
            key: "init",
            value: function () {
              try {
                window._mtac = { autoReport: 1 };
                var e = document.createElement("script");
                (e.src = "https://pingjs.qq.com/h5/stats.js?v2.0.4"),
                  e.setAttribute("name", "MTAH5"),
                  e.setAttribute("sid", "500699039"),
                  e.setAttribute("cid", "500699088");
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t);
              } catch (bf) {}
            },
          },
        ]),
        e
      );
    })();
  console.log(
    "WebRTC-adapter "
      .concat(Dn.browserDetails.browser, "/")
      .concat(Dn.browserDetails.version)
  );
  var hf,
    mf,
    vf,
    gf,
    _f,
    yf = new ff(),
    Sf = {
      VERSION: "4.3.14",
      Logger: {
        LogLevel: { TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4, NONE: 5 },
        setLogLevel: function (e) {
          ar.setLogLevel(e);
        },
        enableUploadLog: function () {
          ar.enableUploadLog();
        },
        disableUploadLog: function () {
          ar.disableUploadLog();
        },
      },
      checkSystemRequirements:
        ((_f = ft(
          regeneratorRuntime.mark(function e() {
            return regeneratorRuntime.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), $l();
                  case 2:
                    return e.abrupt("return", e.sent);
                  case 3:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )),
        function () {
          return _f.apply(this, arguments);
        }),
      isScreenShareSupported: function () {
        return (
          (e = !1),
          navigator.mediaDevices &&
            navigator.mediaDevices.getDisplayMedia &&
            (e = !0),
          e
        );
        var e;
      },
      getDevices:
        ((gf = ft(
          regeneratorRuntime.mark(function e() {
            var t;
            return regeneratorRuntime.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (navigator.mediaDevices) {
                      e.next = 3;
                      break;
                    }
                    return (
                      ar.error("navigator.mediaDevices is undefined"),
                      e.abrupt("return", [])
                    );
                  case 3:
                    return (
                      (e.next = 5), navigator.mediaDevices.enumerateDevices()
                    );
                  case 5:
                    return (
                      (t = e.sent),
                      e.abrupt(
                        "return",
                        t.map(function (e, t) {
                          var n = e.label;
                          return (
                            e.label || (n = e.kind + "_" + t),
                            { label: n, deviceId: e.deviceId, kind: e.kind }
                          );
                        })
                      )
                    );
                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )),
        function () {
          return gf.apply(this, arguments);
        }),
      getCameras:
        ((vf = ft(
          regeneratorRuntime.mark(function e() {
            var t;
            return regeneratorRuntime.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (navigator.mediaDevices) {
                      e.next = 3;
                      break;
                    }
                    return (
                      ar.error("navigator.mediaDevices is undefined"),
                      e.abrupt("return", [])
                    );
                  case 3:
                    return (
                      (e.next = 5), navigator.mediaDevices.enumerateDevices()
                    );
                  case 5:
                    return (
                      (t = e.sent),
                      e.abrupt(
                        "return",
                        t
                          .filter(function (e) {
                            return "videoinput" === e.kind;
                          })
                          .map(function (e, t) {
                            var n = e.label;
                            return (
                              e.label || (n = "camera_" + t),
                              { label: n, deviceId: e.deviceId, kind: e.kind }
                            );
                          })
                      )
                    );
                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )),
        function () {
          return vf.apply(this, arguments);
        }),
      getMicrophones:
        ((mf = ft(
          regeneratorRuntime.mark(function e() {
            var t;
            return regeneratorRuntime.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (navigator.mediaDevices) {
                      e.next = 3;
                      break;
                    }
                    return (
                      ar.error("navigator.mediaDevices is undefined"),
                      e.abrupt("return", [])
                    );
                  case 3:
                    return (
                      (e.next = 5), navigator.mediaDevices.enumerateDevices()
                    );
                  case 5:
                    return (
                      (t = e.sent),
                      e.abrupt(
                        "return",
                        t
                          .filter(function (e) {
                            return "audioinput" === e.kind;
                          })
                          .map(function (e, t) {
                            var n = e.label;
                            return (
                              e.label || (n = "microphone_" + t),
                              { label: n, deviceId: e.deviceId, kind: e.kind }
                            );
                          })
                      )
                    );
                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )),
        function () {
          return mf.apply(this, arguments);
        }),
      getSpeakers:
        ((hf = ft(
          regeneratorRuntime.mark(function e() {
            var t;
            return regeneratorRuntime.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (e.next = 2), navigator.mediaDevices.enumerateDevices()
                    );
                  case 2:
                    return (
                      (t = e.sent),
                      e.abrupt(
                        "return",
                        t
                          .filter(function (e) {
                            return "audiooutput" === e.kind;
                          })
                          .map(function (e, t) {
                            var n = e.label;
                            return (
                              e.label || (n = "speaker_" + t),
                              { label: n, deviceId: e.deviceId, kind: e.kind }
                            );
                          })
                      )
                    );
                  case 4:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )),
        function () {
          return hf.apply(this, arguments);
        }),
      createClient: function (e) {
        yf.report("sdkAppID", { value: e.sdkAppId }),
          yf.report("version", { value: this.VERSION });
        var t = { version: this.VERSION };
        return new nf(_t({}, t, e));
      },
      createStream: function (e) {
        if (
          !(
            (void 0 === e.audio && void 0 === e.video) ||
            (void 0 === e.audioSource && void 0 === e.videoSource)
          )
        )
          throw new sl({
            code: ol.INVALID_PARAMETER,
            message:
              "LocalStream must be created by createStream() with either audio/video or audioSource/videoSourcebut can not be mixed with audio/video and audioSource/videoSource",
          });
        if (void 0 !== e.screen && !0 === e.screen && !0 === e.video)
          throw new sl({
            code: ol.INVALID_PARAMETER,
            message:
              "screen/video options are mutually exclusive, they can not be both true",
          });
        if (
          void 0 !== e.screen &&
          !0 === e.screen &&
          !this.isScreenShareSupported()
        )
          throw new sl({
            code: ol.INVALID_OPERATION,
            message:
              "screen capture is not supported, please use the latest chrome browser",
          });
        return new pf(e);
      },
    };
  return (
    console.info(
      "******************************************************************************"
    ),
    console.info("*   ???????????? TRTC Web SDK - ??????????????????????????????"),
    console.info(
      "*   API ?????????https://trtc-1252463788.file.myqcloud.com/web/docs/index.html"
    ),
    console.info(
      "*   ?????????????????????https://cloud.tencent.com/document/product/647/38958"
    ),
    console.info("*   ???????????????https://github.com/tencentyun/TRTCSDK/issues"),
    console.info(
      "******************************************************************************"
    ),
    ar.info("TRTC Web SDK Version: " + Sf.VERSION),
    ar.info("UserAgent: " + navigator.userAgent),
    ar.info("URL of current page: " + location.href),
    Sf
  );
});
