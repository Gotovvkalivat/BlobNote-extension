"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = Symbol.for("react.element");
      var n = Symbol.for("react.portal");
      var p = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r2 = Symbol.for("react.profiler");
      var t = Symbol.for("react.provider");
      var u = Symbol.for("react.context");
      var v = Symbol.for("react.forward_ref");
      var w = Symbol.for("react.suspense");
      var x = Symbol.for("react.memo");
      var y = Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a) return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g) c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
          c.children = f;
        }
        if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
        if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
        else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a) return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status) return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X2() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r2;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X2;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = X2;
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k(a) {
        if (0 === a.length) return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
            var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
            if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
            else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
            else break a;
          }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      var r2 = [];
      var t = [];
      var u = 1;
      var v = null;
      var y = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a) {
        for (var b = h(t); null !== b; ) {
          if (null === b.callback) k(t);
          else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r2, b);
          else break;
          b = h(t);
        }
      }
      function H(a) {
        B = false;
        G(a);
        if (!A) if (null !== h(r2)) A = true, I(J);
        else {
          var b = h(t);
          null !== b && K(H, b.startTime - a);
        }
      }
      function J(a, b) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c = y;
        try {
          G(b);
          for (v = h(r2); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r2) && k(r2);
              G(b);
            } else k(r2);
            v = h(r2);
          }
          if (null !== v) var w = true;
          else {
            var m = h(t);
            null !== m && K(H, m.startTime - b);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c, z = false;
        }
      }
      var N = false;
      var O = null;
      var L = -1;
      var P = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a = exports.unstable_now();
          Q = a;
          var b = true;
          try {
            b = O(true, a);
          } finally {
            b ? S() : (N = false, O = null);
          }
        } else N = false;
      }
      var S;
      if ("function" === typeof F) S = function() {
        F(R);
      };
      else if ("undefined" !== typeof MessageChannel) {
        T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else S = function() {
        D(R, 0);
      };
      var T;
      var U;
      function I(a) {
        O = a;
        N || (N = true, S());
      }
      function K(a, b) {
        L = D(function() {
          a(exports.unstable_now());
        }, b);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h(r2);
      };
      exports.unstable_next = function(a) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y;
        }
        var c = y;
        y = b;
        try {
          return a();
        } finally {
          y = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y;
        y = a;
        try {
          return b();
        } finally {
          y = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f(t, a), null === h(r2) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r2, a), A || z || (A = true, I(J)));
        return a;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a) {
        var b = y;
        return function() {
          var c = y;
          y = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y = c;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ca = require_scheduler();
      function p(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a, b) {
        ha(a, b);
        ha(a + "Capture", b);
      }
      function ha(a, b) {
        ea[a] = b;
        for (a = 0; a < b.length; a++) da.add(b[a]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a) {
        if (ja.call(ma, a)) return true;
        if (ja.call(la, a)) return false;
        if (ka.test(a)) return ma[a] = true;
        la[a] = true;
        return false;
      }
      function pa(a, b, c, d) {
        if (null !== c && 0 === c.type) return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d) return false;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function qa(a, b, c, d) {
        if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
        if (d) return false;
        if (null !== c) switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
        return false;
      }
      function v(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        z[a] = new v(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        z[b] = new v(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        z[a] = new v(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        z[a] = new v(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        z[a] = new v(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        z[a] = new v(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          ra,
          sa
        );
        z[b] = new v(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function ta(a, b, c, d) {
        var e = z.hasOwnProperty(b) ? z[b] : null;
        if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = Symbol.for("react.element");
      var wa = Symbol.for("react.portal");
      var ya = Symbol.for("react.fragment");
      var za = Symbol.for("react.strict_mode");
      var Aa = Symbol.for("react.profiler");
      var Ba = Symbol.for("react.provider");
      var Ca = Symbol.for("react.context");
      var Da = Symbol.for("react.forward_ref");
      var Ea = Symbol.for("react.suspense");
      var Fa = Symbol.for("react.suspense_list");
      var Ga = Symbol.for("react.memo");
      var Ha = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      Symbol.for("react.debug_trace_mode");
      var Ia = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.cache");
      Symbol.for("react.tracing_marker");
      var Ja = Symbol.iterator;
      function Ka(a) {
        if (null === a || "object" !== typeof a) return null;
        a = Ja && a[Ja] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var A = Object.assign;
      var La;
      function Ma(a) {
        if (void 0 === La) try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          La = b && b[1] || "";
        }
        return "\n" + La + a;
      }
      var Na = false;
      function Oa(a, b) {
        if (!a || Na) return "";
        Na = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b) if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (l) {
              var d = l;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (l) {
              d = l;
            }
            a.call(b.prototype);
          }
          else {
            try {
              throw Error();
            } catch (l) {
              d = l;
            }
            a();
          }
        } catch (l) {
          if (l && d && "string" === typeof l.stack) {
            for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
            for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) {
                    var k = "\n" + e[g].replace(" at new ", " at ");
                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                    return k;
                  }
                while (1 <= g && 0 <= h);
              }
              break;
            }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
      }
      function Pa(a) {
        switch (a.tag) {
          case 5:
            return Ma(a.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Oa(a.type, false), a;
          case 11:
            return a = Oa(a.type.render, false), a;
          case 1:
            return a = Oa(a.type, true), a;
          default:
            return "";
        }
      }
      function Qa(a) {
        if (null == a) return null;
        if ("function" === typeof a) return a.displayName || a.name || null;
        if ("string" === typeof a) return a;
        switch (a) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a) switch (a.$$typeof) {
          case Ca:
            return (a.displayName || "Context") + ".Consumer";
          case Ba:
            return (a._context.displayName || "Context") + ".Provider";
          case Da:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case Ga:
            return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
          case Ha:
            b = a._payload;
            a = a._init;
            try {
              return Qa(a(b));
            } catch (c) {
            }
        }
        return null;
      }
      function Ra(a) {
        var b = a.type;
        switch (a.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b.displayName || "Context") + ".Consumer";
          case 10:
            return (b._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b);
          case 8:
            return b === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b) return b.displayName || b.name || null;
            if ("string" === typeof b) return b;
        }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a;
          case "object":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a) return false;
        var b = a._valueTracker;
        if (!b) return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a) return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function ab(a, b) {
        b = b.checked;
        null != b && ta(a, "checked", b, false);
      }
      function bb(a, b) {
        ab(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c) if ("number" === d) {
          if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
        } else a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function db(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function cb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      var eb = Array.isArray;
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
        return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b) throw Error(p(92));
            if (eb(c)) {
              if (1 < c.length) throw Error(p(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      function kb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var mb;
      var nb = function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      }(function(a, b) {
        if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
          for (; b.firstChild; ) a.appendChild(b.firstChild);
        }
      });
      function ob(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a) {
        qb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          pb[b] = pb[a];
        });
      });
      function rb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
      }
      function sb(a, b) {
        a = a.style;
        for (var c in b) if (b.hasOwnProperty(c)) {
          var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
          "float" === c && (c = "cssFloat");
          d ? a.setProperty(c, e) : a[c] = e;
        }
      }
      var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a, b) {
        if (b) {
          if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children) throw Error(p(60));
            if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
          }
          if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
        }
      }
      function vb(a, b) {
        if (-1 === a.indexOf("-")) return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb) throw Error(p(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a, b, c) {
        if (Ib) return a(b, c);
        Ib = true;
        try {
          return Gb(a, b, c);
        } finally {
          if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
        }
      }
      function Kb(a, b) {
        var c = a.stateNode;
        if (null === c) return null;
        var d = Db(c);
        if (null === d) return null;
        c = d[b];
        a: switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
          default:
            a = false;
        }
        if (a) return null;
        if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
        return c;
      }
      var Lb = false;
      if (ia) try {
        Mb = {};
        Object.defineProperty(Mb, "passive", { get: function() {
          Lb = true;
        } });
        window.addEventListener("test", Mb, Mb);
        window.removeEventListener("test", Mb, Mb);
      } catch (a) {
        Lb = false;
      }
      var Mb;
      function Nb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (m) {
          this.onError(m);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a) {
        Ob = true;
        Pb = a;
      } };
      function Tb(a, b, c, d, e, f, g, h, k) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a, b, c, d, e, f, g, h, k) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l = Pb;
            Ob = false;
            Pb = null;
          } else throw Error(p(198));
          Qb || (Qb = true, Rb = l);
        }
      }
      function Vb(a) {
        var b = a, c = a;
        if (a.alternate) for (; b.return; ) b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function Wb(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b) return b.dehydrated;
        }
        return null;
      }
      function Xb(a) {
        if (Vb(a) !== a) throw Error(p(188));
      }
      function Yb(a) {
        var b = a.alternate;
        if (!b) {
          b = Vb(a);
          if (null === b) throw Error(p(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e) break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c) return Xb(e), a;
              if (f === d) return Xb(e), b;
              f = f.sibling;
            }
            throw Error(p(188));
          }
          if (c.return !== d.return) c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g) throw Error(p(189));
            }
          }
          if (c.alternate !== d) throw Error(p(190));
        }
        if (3 !== c.tag) throw Error(p(188));
        return c.stateNode.current === c ? a : b;
      }
      function Zb(a) {
        a = Yb(a);
        return null !== a ? $b(a) : null;
      }
      function $b(a) {
        if (5 === a.tag || 6 === a.tag) return a;
        for (a = a.child; null !== a; ) {
          var b = $b(a);
          if (null !== b) return b;
          a = a.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a) {
        if (lc && "function" === typeof lc.onCommitFiberRoot) try {
          lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
        } catch (b) {
        }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a) {
        a >>>= 0;
        return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a) {
        switch (a & -a) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a;
        }
      }
      function uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c) return 0;
        var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
        if (0 !== g) {
          var h = g & ~e;
          0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
        } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
        if (0 === d) return 0;
        if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
        0 !== (d & 4) && (d |= c & 16);
        b = a.entangledLanes;
        if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function vc(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 4:
            return b + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a, b) {
        for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
          var g = 31 - oc(f), h = 1 << g, k = e[g];
          if (-1 === k) {
            if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
          } else k <= b && (a.expiredLanes |= h);
          f &= ~h;
        }
      }
      function xc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a;
      }
      function zc(a) {
        for (var b = [], c = 0; 31 > c; c++) b.push(a);
        return b;
      }
      function Ac(a, b, c) {
        a.pendingLanes |= b;
        536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
        a = a.eventTimes;
        b = 31 - oc(b);
        a[b] = c;
      }
      function Bc(a, b) {
        var c = a.pendingLanes & ~b;
        a.pendingLanes = b;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= b;
        a.mutableReadLanes &= b;
        a.entangledLanes &= b;
        b = a.entanglements;
        var d = a.eventTimes;
        for (a = a.expirationTimes; 0 < c; ) {
          var e = 31 - oc(c), f = 1 << e;
          b[e] = 0;
          d[e] = -1;
          a[e] = -1;
          c &= ~f;
        }
      }
      function Cc(a, b) {
        var c = a.entangledLanes |= b;
        for (a = a.entanglements; c; ) {
          var d = 31 - oc(c), e = 1 << d;
          e & b | a[d] & b && (a[d] |= b);
          c &= ~e;
        }
      }
      var C = 0;
      function Dc(a) {
        a &= -a;
        return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b.pointerId);
        }
      }
      function Tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function Uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return Lc = Tc(Lc, a, b, c, d, e), true;
          case "dragenter":
            return Mc = Tc(Mc, a, b, c, d, e), true;
          case "mouseover":
            return Nc = Tc(Nc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function Vc(a) {
        var b = Wc(a.target);
        if (null !== b) {
          var c = Vb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = Wb(c), null !== b) {
                a.blockedOn = b;
                Ic(a.priority, function() {
                  Gc(c);
                });
                return;
              }
            } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function Xc(a) {
        if (null !== a.blockedOn) return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null === c) {
            c = a.nativeEvent;
            var d = new c.constructor(c.type, c);
            wb = d;
            c.target.dispatchEvent(d);
            wb = null;
          } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function Zc(a, b, c) {
        Xc(a) && c.delete(b);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a, b) {
        a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a) {
        function b(b2) {
          return ad(b2, a);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a);
          for (var c = 1; c < Kc.length; c++) {
            var d = Kc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a);
        null !== Mc && ad(Mc, a);
        null !== Nc && ad(Nc, a);
        Oc.forEach(b);
        Pc.forEach(b);
        for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 1, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function gd(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 4, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function fd(a, b, c, d) {
        if (dd) {
          var e = Yc(a, b, c, d);
          if (null === e) hd(a, b, d, id, c), Sc(a, d);
          else if (Uc(e, a, b, c, d)) d.stopPropagation();
          else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
            for (; null !== e; ) {
              var f = Cb(e);
              null !== f && Ec(f);
              f = Yc(a, b, c, d);
              null === f && hd(a, b, d, id, c);
              if (f === e) break;
              e = f;
            }
            null !== e && d.stopPropagation();
          } else hd(a, b, d, null, c);
        }
      }
      var id = null;
      function Yc(a, b, c, d) {
        id = null;
        a = xb(d);
        a = Wc(a);
        if (null !== a) if (b = Vb(a), null === b) a = null;
        else if (c = b.tag, 13 === c) {
          a = Wb(b);
          if (null !== a) return a;
          a = null;
        } else if (3 === c) {
          if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
          a = null;
        } else b !== a && (a = null);
        id = a;
        return null;
      }
      function jd(a) {
        switch (a) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md) return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++) ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a) return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b) return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which) return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length) return b.char;
              if (b.which) return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b)) return a;
      }
      function ve(a, b) {
        if ("change" === a) return b;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          Jb(re, b);
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a) return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a) return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a, b) {
        if (He(a, b)) return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length) return false;
        for (d = 0; d < c.length; d++) {
          var e = c[d];
          if (!ja.call(b, e) || !He(a[e], b[e])) return false;
        }
        return true;
      }
      function Je(a) {
        for (; a && a.firstChild; ) a = a.firstChild;
        return a;
      }
      function Ke(a, b) {
        var c = Je(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b) return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Je(c);
        }
      }
      function Le(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Me() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c) a = b.contentWindow;
          else break;
          b = Xa(a.document);
        }
        return b;
      }
      function Ne(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      function Oe(a) {
        var b = Me(), c = a.focusedElem, d = a.selectionRange;
        if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
          if (null !== d && Ne(c)) {
            if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
            else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
              a = a.getSelection();
              var e = c.textContent.length, f = Math.min(d.start, e);
              d = void 0 === d.end ? f : Math.min(d.end, e);
              !a.extend && f > d && (e = d, d = f, f = e);
              e = Ke(c, f);
              var g = Ke(
                c,
                d
              );
              e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
            }
          }
          b = [];
          for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
          "function" === typeof c.focus && c.focus();
          for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      function Ve(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a) {
        if (Xe[a]) return Xe[a];
        if (!We[a]) return a;
        var b = We[a], c;
        for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
        return a;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a, b) {
        df.set(a, b);
        fa(b, [a]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Ub(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b) for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
            else for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
          }
        }
        if (Qb) throw a = Rb, Qb = false, Rb = null, a;
      }
      function D(a, b) {
        var c = b[of];
        void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
        var d = a + "__bubble";
        c.has(d) || (pf(b, a, 2, false), c.add(d));
      }
      function qf(a, b, c) {
        var d = 0;
        b && (d |= 4);
        pf(c, a, d, b);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a) {
        if (!a[rf]) {
          a[rf] = true;
          da.forEach(function(b2) {
            "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
          });
          var b = 9 === a.nodeType ? a : a.ownerDocument;
          null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
        }
      }
      function pf(a, b, c, d) {
        switch (jd(b)) {
          case 1:
            var e = ed;
            break;
          case 4:
            e = gd;
            break;
          default:
            e = fd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function hd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
          if (null === d) return;
          var g = d.tag;
          if (3 === g || 4 === g) {
            var h = d.stateNode.containerInfo;
            if (h === e || 8 === h.nodeType && h.parentNode === e) break;
            if (4 === g) for (g = d.return; null !== g; ) {
              var k = g.tag;
              if (3 === k || 4 === k) {
                if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
              }
              g = g.return;
            }
            for (; null !== h; ) {
              g = Wc(h);
              if (null === g) return;
              k = g.tag;
              if (5 === k || 6 === k) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
        Jb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = df.get(a);
            if (void 0 !== h2) {
              var k2 = td, n = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c)) break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  n = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  n = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k2 = Hd;
                  break;
                case cf:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
              t = [];
              for (var w = d2, u; null !== w; ) {
                u = w;
                var F = u.stateNode;
                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                if (J) break;
                w = w.return;
              }
              0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
                } else k2 = null, n = d2;
                if (k2 !== n) {
                  t = Bd;
                  F = "onMouseLeave";
                  x = "onMouseEnter";
                  w = "mouse";
                  if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                  J = null == k2 ? h2 : ue(k2);
                  u = null == n ? h2 : ue(n);
                  h2 = new t(F, w + "leave", k2, c, e2);
                  h2.target = J;
                  h2.relatedTarget = u;
                  F = null;
                  Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                  J = F;
                  if (k2 && n) b: {
                    t = k2;
                    x = n;
                    w = 0;
                    for (u = t; u; u = vf(u)) w++;
                    u = 0;
                    for (F = x; F; F = vf(F)) u++;
                    for (; 0 < w - u; ) t = vf(t), w--;
                    for (; 0 < u - w; ) x = vf(x), u--;
                    for (; w--; ) {
                      if (t === x || null !== x && t === x.alternate) break b;
                      t = vf(t);
                      x = vf(x);
                    }
                    t = null;
                  }
                  else t = null;
                  null !== k2 && wf(g2, h2, k2, t, false);
                  null !== n && null !== J && wf(g2, J, n, t, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
              else if (me(h2)) if (we) na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
              else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
              if (na && (na = na(a, d2))) {
                ne(g2, na, c, e2);
                break a;
              }
              xa && xa(a, h2, d2);
              "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
            }
            xa = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe) break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var $a;
            if (ae) b: {
              switch (a) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
            else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
          }
          se(g2, b);
        });
      }
      function tf(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function vf(a) {
        if (null === a) return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function wf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d) break;
          5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a) {
        return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
      }
      function Af(a, b, c) {
        b = zf(b);
        if (zf(a) !== b && c) throw Error(p(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a, b) {
        return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
        return Hf.resolve(null).then(a).catch(If);
      } : Ff;
      function If(a) {
        setTimeout(function() {
          throw a;
        });
      }
      function Kf(a, b) {
        var c = b, d = 0;
        do {
          var e = c.nextSibling;
          a.removeChild(c);
          if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
            if (0 === d) {
              a.removeChild(e);
              bd(b);
              return;
            }
            d--;
          } else "$" !== c && "$?" !== c && "$!" !== c || d++;
          c = e;
        } while (c);
        bd(b);
      }
      function Lf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b) break;
          if (8 === b) {
            b = a.data;
            if ("$" === b || "$!" === b || "$?" === b) break;
            if ("/$" === b) return null;
          }
        }
        return a;
      }
      function Mf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b) return a;
              b--;
            } else "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a) {
        var b = a[Of];
        if (b) return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[uf] || c[Of]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
              if (c = a[Of]) return c;
              a = Mf(a);
            }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[Of] || a[uf];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag) return a.stateNode;
        throw Error(p(33));
      }
      function Db(a) {
        return a[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a) {
        return { current: a };
      }
      function E(a) {
        0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a, b) {
        Tf++;
        Sf[Tf] = a.current;
        a.current = b;
      }
      var Vf = {};
      var H = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a, b) {
        var c = a.type.contextTypes;
        if (!c) return Vf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c) e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Zf(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function $f() {
        E(Wf);
        E(H);
      }
      function ag(a, b, c) {
        if (H.current !== Vf) throw Error(p(168));
        G(H, b);
        G(Wf, c);
      }
      function bg(a, b, c) {
        var d = a.stateNode;
        b = b.childContextTypes;
        if ("function" !== typeof d.getChildContext) return c;
        d = d.getChildContext();
        for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
        return A({}, c, d);
      }
      function cg(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H.current;
        G(H, a);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a, b, c) {
        var d = a.stateNode;
        if (!d) throw Error(p(169));
        c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
        G(Wf, c);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a) {
        null === eg ? eg = [a] : eg.push(a);
      }
      function ig(a) {
        fg = true;
        hg(a);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a = 0, b = C;
          try {
            var c = eg;
            for (C = 1; a < c.length; a++) {
              var d = c[a];
              do
                d = d(true);
              while (null !== d);
            }
            eg = null;
            fg = false;
          } catch (e) {
            throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
          } finally {
            C = b, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a, b) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a;
        ng = b;
      }
      function ug(a, b, c) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a;
        var d = rg;
        a = sg;
        var e = 32 - oc(d) - 1;
        d &= ~(1 << e);
        c += 1;
        var f = 32 - oc(b) + e;
        if (30 < f) {
          var g = e - e % 5;
          f = (d & (1 << g) - 1).toString(32);
          d >>= g;
          e -= g;
          rg = 1 << 32 - oc(b) + e | c << e | d;
          sg = f + a;
        } else rg = 1 << f | c << e | d, sg = a;
      }
      function vg(a) {
        null !== a.return && (tg(a, 1), ug(a, 1, 0));
      }
      function wg(a) {
        for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I = false;
      var zg = null;
      function Ag(a, b) {
        var c = Bg(5, null, null, 0);
        c.elementType = "DELETED";
        c.stateNode = b;
        c.return = a;
        b = a.deletions;
        null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
      }
      function Cg(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
          case 13:
            return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a) {
        return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
      }
      function Eg(a) {
        if (I) {
          var b = yg;
          if (b) {
            var c = b;
            if (!Cg(a, b)) {
              if (Dg(a)) throw Error(p(418));
              b = Lf(c.nextSibling);
              var d = xg;
              b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
            }
          } else {
            if (Dg(a)) throw Error(p(418));
            a.flags = a.flags & -4097 | 2;
            I = false;
            xg = a;
          }
        }
      }
      function Fg(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
        xg = a;
      }
      function Gg(a) {
        if (a !== xg) return false;
        if (!I) return Fg(a), I = true, false;
        var b;
        (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
        if (b && (b = yg)) {
          if (Dg(a)) throw Hg(), Error(p(418));
          for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
        }
        Fg(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a) throw Error(p(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    yg = Lf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            yg = null;
          }
        } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a = yg; a; ) a = Lf(a.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I = false;
      }
      function Jg(a) {
        null === zg ? zg = [a] : zg.push(a);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag) throw Error(p(309));
              var d = c.stateNode;
            }
            if (!d) throw Error(p(147, a));
            var e = d, f = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
            b = function(a2) {
              var b2 = e.refs;
              null === a2 ? delete b2[f] : b2[f] = a2;
            };
            b._stringRef = f;
            return b;
          }
          if ("string" !== typeof a) throw Error(p(284));
          if (!c._owner) throw Error(p(290, a));
        }
        return a;
      }
      function Mg(a, b) {
        a = Object.prototype.toString.call(b);
        throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
      }
      function Ng(a) {
        var b = a._init;
        return b(a._payload);
      }
      function Og(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.deletions;
            null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
          }
        }
        function c(c2, d2) {
          if (!a) return null;
          for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Pg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a) return b2.flags |= 1048576, c2;
          d2 = b2.alternate;
          if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
          b2.flags |= 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags |= 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          var f2 = c2.type;
          if (f2 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
          if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
          d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Lg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function m(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function q(a2, b2, c2) {
          if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case va:
                return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
              case wa:
                return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
              case Ha:
                var d2 = b2._init;
                return q(a2, d2(b2._payload), c2);
            }
            if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
            Mg(a2, b2);
          }
          return null;
        }
        function r2(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case va:
                return c2.key === e2 ? k(a2, b2, c2, d2) : null;
              case wa:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
              case Ha:
                return e2 = c2._init, r2(
                  a2,
                  b2,
                  e2(c2._payload),
                  d2
                );
            }
            if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
            Mg(a2, c2);
          }
          return null;
        }
        function y(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case va:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
              case wa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
              case Ha:
                var f2 = d2._init;
                return y(a2, b2, c2, f2(d2._payload), e2);
            }
            if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
            Mg(b2, d2);
          }
          return null;
        }
        function n(e2, g2, h2, k2) {
          for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
            u.index > w ? (x = u, u = null) : x = u.sibling;
            var n2 = r2(e2, u, h2[w], k2);
            if (null === n2) {
              null === u && (u = x);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, w);
            null === m2 ? l2 = n2 : m2.sibling = n2;
            m2 = n2;
            u = x;
          }
          if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
          if (null === u) {
            for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
            I && tg(e2, w);
            return l2;
          }
          for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function t(e2, g2, h2, k2) {
          var l2 = Ka(h2);
          if ("function" !== typeof l2) throw Error(p(150));
          h2 = l2.call(h2);
          if (null == h2) throw Error(p(151));
          for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
            m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
            var t2 = r2(e2, m2, n2.value, k2);
            if (null === t2) {
              null === m2 && (m2 = x);
              break;
            }
            a && m2 && null === t2.alternate && b(e2, m2);
            g2 = f(t2, g2, w);
            null === u ? l2 = t2 : u.sibling = t2;
            u = t2;
            m2 = x;
          }
          if (n2.done) return c(
            e2,
            m2
          ), I && tg(e2, w), l2;
          if (null === m2) {
            for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
            I && tg(e2, w);
            return l2;
          }
          for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          a && m2.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function J(a2, d2, f2, h2) {
          "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
          if ("object" === typeof f2 && null !== f2) {
            switch (f2.$$typeof) {
              case va:
                a: {
                  for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                    if (l2.key === k2) {
                      k2 = f2.type;
                      if (k2 === ya) {
                        if (7 === l2.tag) {
                          c(a2, l2.sibling);
                          d2 = e(l2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                      } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props);
                        d2.ref = Lg(a2, l2, f2);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                      c(a2, l2);
                      break;
                    } else b(a2, l2);
                    l2 = l2.sibling;
                  }
                  f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case wa:
                a: {
                  for (l2 = f2.key; null !== d2; ) {
                    if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                    else b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Sg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
              case Ha:
                return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
            }
            if (eb(f2)) return n(a2, d2, f2, h2);
            if (Ka(f2)) return t(a2, d2, f2, h2);
            Mg(a2, f2);
          }
          return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a) {
        var b = Wg.current;
        E(Wg);
        a._currentValue = b;
      }
      function bh(a, b, c) {
        for (; null !== a; ) {
          var d = a.alternate;
          (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
          if (a === c) break;
          a = a.return;
        }
      }
      function ch(a, b) {
        Xg = a;
        Zg = Yg = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
      }
      function eh(a) {
        var b = a._currentValue;
        if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
          if (null === Xg) throw Error(p(308));
          Yg = a;
          Xg.dependencies = { lanes: 0, firstContext: a };
        } else Yg = Yg.next = a;
        return b;
      }
      var fh = null;
      function gh(a) {
        null === fh ? fh = [a] : fh.push(a);
      }
      function hh(a, b, c, d) {
        var e = b.interleaved;
        null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
        b.interleaved = c;
        return ih(a, d);
      }
      function ih(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      var jh = false;
      function kh(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function mh(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a, b, c) {
        var d = a.updateQueue;
        if (null === d) return null;
        d = d.shared;
        if (0 !== (K & 2)) {
          var e = d.pending;
          null === e ? b.next = b : (b.next = e.next, e.next = b);
          d.pending = b;
          return ih(a, c);
        }
        e = d.interleaved;
        null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
        d.interleaved = b;
        return ih(a, c);
      }
      function oh(a, b, c) {
        b = b.updateQueue;
        if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      function ph(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function qh(a, b, c, d) {
        var e = a.updateQueue;
        jh = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var m = a.alternate;
          null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
        }
        if (null !== f) {
          var q = e.baseState;
          g = 0;
          m = l = k = null;
          h = f;
          do {
            var r2 = h.lane, y = h.eventTime;
            if ((d & r2) === r2) {
              null !== m && (m = m.next = {
                eventTime: y,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null
              });
              a: {
                var n = a, t = h;
                r2 = b;
                y = c;
                switch (t.tag) {
                  case 1:
                    n = t.payload;
                    if ("function" === typeof n) {
                      q = n.call(y, q, r2);
                      break a;
                    }
                    q = n;
                    break a;
                  case 3:
                    n.flags = n.flags & -65537 | 128;
                  case 0:
                    n = t.payload;
                    r2 = "function" === typeof n ? n.call(y, q, r2) : n;
                    if (null === r2 || void 0 === r2) break a;
                    q = A({}, q, r2);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
            } else y = { eventTime: y, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r2;
            h = h.next;
            if (null === h) if (h = e.shared.pending, null === h) break;
            else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
          } while (1);
          null === m && (k = q);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = m;
          b = e.shared.interleaved;
          if (null !== b) {
            e = b;
            do
              g |= e.lane, e = e.next;
            while (e !== b);
          } else null === f && (e.shared.lanes = 0);
          rh |= g;
          a.lanes = g;
          a.memoizedState = q;
        }
      }
      function sh(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a) for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e) throw Error(p(191, e));
            e.call(d);
          }
        }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a) {
        if (a === th) throw Error(p(174));
        return a;
      }
      function yh(a, b) {
        G(wh, b);
        G(vh, a);
        G(uh, th);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
        }
        E(uh);
        G(uh, b);
      }
      function zh() {
        E(uh);
        E(vh);
        E(wh);
      }
      function Ah(a) {
        xh(wh.current);
        var b = xh(uh.current);
        var c = lb(b, a.type);
        b !== c && (G(vh, a), G(uh, c));
      }
      function Bh(a) {
        vh.current === a && (E(uh), E(vh));
      }
      var L = Uf(0);
      function Ch(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 128)) return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M = null;
      var N = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P() {
        throw Error(p(321));
      }
      function Mh(a, b) {
        if (null === b) return false;
        for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
        return true;
      }
      function Nh(a, b, c, d, e, f) {
        Hh = f;
        M = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
        a = c(d, e);
        if (Jh) {
          f = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f) throw Error(p(301));
            f += 1;
            O = N = null;
            b.updateQueue = null;
            Fh.current = Qh;
            a = c(d, e);
          } while (Jh);
        }
        Fh.current = Rh;
        b = null !== N && null !== N.next;
        Hh = 0;
        O = N = M = null;
        Ih = false;
        if (b) throw Error(p(300));
        return a;
      }
      function Sh() {
        var a = 0 !== Kh;
        Kh = 0;
        return a;
      }
      function Th() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
        return O;
      }
      function Uh() {
        if (null === N) {
          var a = M.alternate;
          a = null !== a ? a.memoizedState : null;
        } else a = N.next;
        var b = null === O ? M.memoizedState : O.next;
        if (null !== b) O = b, N = a;
        else {
          if (null === a) throw Error(p(310));
          N = a;
          a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          null === O ? M.memoizedState = O = a : O = O.next = a;
        }
        return O;
      }
      function Vh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Wh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = N, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          f = e.next;
          d = d.baseState;
          var h = g = null, k = null, l = f;
          do {
            var m = l.lane;
            if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
            else {
              var q = {
                lane: m,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
              };
              null === k ? (h = k = q, g = d) : k = k.next = q;
              M.lanes |= m;
              rh |= m;
            }
            l = l.next;
          } while (null !== l && l !== f);
          null === k ? g = d : k.next = h;
          He(d, b.memoizedState) || (dh = true);
          b.memoizedState = d;
          b.baseState = g;
          b.baseQueue = k;
          c.lastRenderedState = d;
        }
        a = c.interleaved;
        if (null !== a) {
          e = a;
          do
            f = e.lane, M.lanes |= f, rh |= f, e = e.next;
          while (e !== a);
        } else null === e && (c.lanes = 0);
        return [b.memoizedState, c.dispatch];
      }
      function Xh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (dh = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Yh() {
      }
      function Zh(a, b) {
        var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
        f && (d.memoizedState = e, dh = true);
        d = d.queue;
        $h(ai.bind(null, c, d, a), [a]);
        if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
          c.flags |= 2048;
          bi(9, ci.bind(null, c, d, e, b), void 0, null);
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(c, b, e);
        }
        return e;
      }
      function di(a, b, c) {
        a.flags |= 16384;
        a = { getSnapshot: b, value: c };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
      }
      function ci(a, b, c, d) {
        b.value = c;
        b.getSnapshot = d;
        ei(b) && fi(a);
      }
      function ai(a, b, c) {
        return c(function() {
          ei(b) && fi(a);
        });
      }
      function ei(a) {
        var b = a.getSnapshot;
        a = a.value;
        try {
          var c = b();
          return !He(a, c);
        } catch (d) {
          return true;
        }
      }
      function fi(a) {
        var b = ih(a, 1);
        null !== b && gi(b, a, 1, -1);
      }
      function hi(a) {
        var b = Th();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
        b.queue = a;
        a = a.dispatch = ii.bind(null, M, a);
        return [b.memoizedState, a];
      }
      function bi(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a, b, c, d) {
        var e = Th();
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function li(a, b, c, d) {
        var e = Uh();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== N) {
          var g = N.memoizedState;
          f = g.destroy;
          if (null !== d && Mh(d, g.deps)) {
            e.memoizedState = bi(b, c, f, d);
            return;
          }
        }
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, f, d);
      }
      function mi(a, b) {
        return ki(8390656, 8, a, b);
      }
      function $h(a, b) {
        return li(2048, 8, a, b);
      }
      function ni(a, b) {
        return li(4, 2, a, b);
      }
      function oi(a, b) {
        return li(4, 4, a, b);
      }
      function pi(a, b) {
        if ("function" === typeof b) return a = a(), b(a), function() {
          b(null);
        };
        if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
          b.current = null;
        };
      }
      function qi(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return li(4, 4, pi.bind(null, b, a), c);
      }
      function ri() {
      }
      function si(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ti(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function ui(a, b, c) {
        if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
        He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
        return b;
      }
      function vi(a, b) {
        var c = C;
        C = 0 !== c && 4 > c ? c : 4;
        a(true);
        var d = Gh.transition;
        Gh.transition = {};
        try {
          a(false), b();
        } finally {
          C = c, Gh.transition = d;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a, b, c) {
        var d = yi(a);
        c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, c);
        else if (c = hh(a, b, c, d), null !== c) {
          var e = R();
          gi(c, a, d, e);
          Bi(c, b, d);
        }
      }
      function ii(a, b, c) {
        var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, e);
        else {
          var f = a.alternate;
          if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
            var g = b.lastRenderedState, h = f(g, c);
            e.hasEagerState = true;
            e.eagerState = h;
            if (He(h, g)) {
              var k = b.interleaved;
              null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
              b.interleaved = e;
              return;
            }
          } catch (l) {
          } finally {
          }
          c = hh(a, b, e, d);
          null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
        }
      }
      function zi(a) {
        var b = a.alternate;
        return a === M || null !== b && b === M;
      }
      function Ai(a, b) {
        Jh = Ih = true;
        var c = a.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
      function Bi(a, b, c) {
        if (0 !== (c & 4194240)) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a, b) {
        Th().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b, a),
          c
        );
      }, useLayoutEffect: function(a, b) {
        return ki(4194308, 4, a, b);
      }, useInsertionEffect: function(a, b) {
        return ki(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Th();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Th();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        d.queue = a;
        a = a.dispatch = xi.bind(null, M, a);
        return [d.memoizedState, a];
      }, useRef: function(a) {
        var b = Th();
        a = { current: a };
        return b.memoizedState = a;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
        return Th().memoizedState = a;
      }, useTransition: function() {
        var a = hi(false), b = a[0];
        a = vi.bind(null, a[1]);
        Th().memoizedState = a;
        return [b, a];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a, b, c) {
        var d = M, e = Th();
        if (I) {
          if (void 0 === c) throw Error(p(407));
          c = c();
        } else {
          c = b();
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(d, b, c);
        }
        e.memoizedState = c;
        var f = { value: c, getSnapshot: b };
        e.queue = f;
        mi(ai.bind(
          null,
          d,
          f,
          a
        ), [a]);
        d.flags |= 2048;
        bi(9, ci.bind(null, d, f, c, b), void 0, null);
        return c;
      }, useId: function() {
        var a = Th(), b = Q.identifierPrefix;
        if (I) {
          var c = sg;
          var d = rg;
          c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Kh++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a) {
          var b = Uh();
          return ui(b, N.memoizedState, a);
        },
        useTransition: function() {
          var a = Wh(Vh)[0], b = Uh().memoizedState;
          return [a, b];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a) {
        var b = Uh();
        return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
      }, useTransition: function() {
        var a = Xh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a, b) {
        if (a && a.defaultProps) {
          b = A({}, b);
          a = a.defaultProps;
          for (var c in a) void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      function Di(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : A({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Ei = { isMounted: function(a) {
        return (a = a._reactInternals) ? Vb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = R(), d = yi(a), e = mh(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        b = nh(a, e, d);
        null !== b && (gi(b, a, d, c), oh(b, a, d));
      } };
      function Fi(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
      }
      function Gi(a, b, c) {
        var d = false, e = Vf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Ei;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Hi(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
      }
      function Ii(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = {};
        kh(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4194308);
      }
      function Ji(a, b) {
        try {
          var c = "", d = b;
          do
            c += Pa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e, digest: null };
      }
      function Ki(a, b, c) {
        return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
      }
      function Li(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Oi || (Oi = true, Pi = d);
          Li(a, b);
        };
        return c;
      }
      function Qi(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            return d(e);
          };
          c.callback = function() {
            Li(a, b);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          Li(a, b);
          "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      function Si(a, b, c) {
        var d = a.pingCache;
        if (null === d) {
          d = a.pingCache = new Mi();
          var e = /* @__PURE__ */ new Set();
          d.set(b, e);
        } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
        e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
      }
      function Ui(a) {
        do {
          var b;
          if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
          if (b) return a;
          a = a.return;
        } while (null !== a);
        return null;
      }
      function Vi(a, b, c, d, e) {
        if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
        a.flags |= 65536;
        a.lanes = e;
        return a;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a, b, c, d) {
        b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
      }
      function Yi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        ch(b, e);
        d = Nh(a, b, c, d, f, e);
        c = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && c && vg(b);
        b.flags |= 1;
        Xi(a, b, d, e);
        return b.child;
      }
      function $i(a, b, c, d, e) {
        if (null === a) {
          var f = c.type;
          if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
          a = Rg(c.type, null, d, b, b.mode, e);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        f = a.child;
        if (0 === (a.lanes & e)) {
          var g = f.memoizedProps;
          c = c.compare;
          c = null !== c ? c : Ie;
          if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
        }
        b.flags |= 1;
        a = Pg(f, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function bj(a, b, c, d, e) {
        if (null !== a) {
          var f = a.memoizedProps;
          if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
          else return b.lanes = a.lanes, Zi(a, b, e);
        }
        return cj(a, b, c, d, e);
      }
      function dj(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
        else {
          if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
          d = null !== f ? f.baseLanes : c;
          G(ej, fj);
          fj |= d;
        }
        else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
        Xi(a, b, e, c);
        return b.child;
      }
      function gj(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
      }
      function cj(a, b, c, d, e) {
        var f = Zf(c) ? Xf : H.current;
        f = Yf(b, f);
        ch(b, e);
        c = Nh(a, b, c, d, f, e);
        d = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && d && vg(b);
        b.flags |= 1;
        Xi(a, b, c, e);
        return b.child;
      }
      function hj(a, b, c, d, e) {
        if (Zf(c)) {
          var f = true;
          cg(b);
        } else f = false;
        ch(b, e);
        if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
          var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
          q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
          jh = false;
          var r2 = b.memoizedState;
          g.state = r2;
          qh(b, d, g, e);
          k = b.memoizedState;
          h !== d || r2 !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
        } else {
          g = b.stateNode;
          lh(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : Ci(b.type, h);
          g.props = l;
          q = b.pendingProps;
          r2 = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
          var y = c.getDerivedStateFromProps;
          (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r2 !== k) && Hi(b, g, d, k);
          jh = false;
          r2 = b.memoizedState;
          g.state = r2;
          qh(b, d, g, e);
          var n = b.memoizedState;
          h !== q || r2 !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r2, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
        }
        return jj(a, b, c, d, f, e);
      }
      function jj(a, b, c, d, e, f) {
        gj(a, b);
        var g = 0 !== (b.flags & 128);
        if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
        d = b.stateNode;
        Wi.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
        b.memoizedState = d.state;
        e && dg(b, c, true);
        return b.child;
      }
      function kj(a) {
        var b = a.stateNode;
        b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
        yh(a, b.containerInfo);
      }
      function lj(a, b, c, d, e) {
        Ig();
        Jg(e);
        b.flags |= 256;
        Xi(a, b, c, d);
        return b.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a) {
        return { baseLanes: a, cachePool: null, transitions: null };
      }
      function oj(a, b, c) {
        var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
        (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        if (h) f = true, b.flags &= -129;
        else if (null === a || null !== a.memoizedState) e |= 1;
        G(L, e & 1);
        if (null === a) {
          Eg(b);
          a = b.memoizedState;
          if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
          g = d.children;
          a = d.fallback;
          return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
        }
        e = a.memoizedState;
        if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
        if (f) {
          f = d.fallback;
          g = b.mode;
          e = a.child;
          h = e.sibling;
          var k = { mode: "hidden", children: d.children };
          0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
          null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
          f.return = b;
          d.return = b;
          d.sibling = f;
          b.child = d;
          d = f;
          f = b.child;
          g = a.child.memoizedState;
          g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
          f.memoizedState = g;
          f.childLanes = a.childLanes & ~c;
          b.memoizedState = mj;
          return d;
        }
        f = a.child;
        a = f.sibling;
        d = Pg(f, { mode: "visible", children: d.children });
        0 === (b.mode & 1) && (d.lanes = c);
        d.return = b;
        d.sibling = null;
        null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
        b.child = d;
        b.memoizedState = null;
        return d;
      }
      function qj(a, b) {
        b = pj({ mode: "visible", children: b }, a.mode, 0, null);
        b.return = a;
        return a.child = b;
      }
      function sj(a, b, c, d) {
        null !== d && Jg(d);
        Ug(b, a.child, null, c);
        a = qj(b, b.pendingProps.children);
        a.flags |= 2;
        b.memoizedState = null;
        return a;
      }
      function rj(a, b, c, d, e, f, g) {
        if (c) {
          if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
          if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
          f = d.fallback;
          e = b.mode;
          d = pj({ mode: "visible", children: d.children }, e, 0, null);
          f = Tg(f, e, g, null);
          f.flags |= 2;
          d.return = b;
          f.return = b;
          d.sibling = f;
          b.child = d;
          0 !== (b.mode & 1) && Ug(b, a.child, null, g);
          b.child.memoizedState = nj(g);
          b.memoizedState = mj;
          return f;
        }
        if (0 === (b.mode & 1)) return sj(a, b, g, null);
        if ("$!" === e.data) {
          d = e.nextSibling && e.nextSibling.dataset;
          if (d) var h = d.dgst;
          d = h;
          f = Error(p(419));
          d = Ki(f, d, void 0);
          return sj(a, b, g, d);
        }
        h = 0 !== (g & a.childLanes);
        if (dh || h) {
          d = Q;
          if (null !== d) {
            switch (g & -g) {
              case 4:
                e = 2;
                break;
              case 16:
                e = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e = 32;
                break;
              case 536870912:
                e = 268435456;
                break;
              default:
                e = 0;
            }
            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
          }
          tj();
          d = Ki(Error(p(421)));
          return sj(a, b, g, d);
        }
        if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
        a = f.treeContext;
        yg = Lf(e.nextSibling);
        xg = b;
        I = true;
        zg = null;
        null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
        b = qj(b, d.children);
        b.flags |= 4096;
        return b;
      }
      function vj(a, b, c) {
        a.lanes |= b;
        var d = a.alternate;
        null !== d && (d.lanes |= b);
        bh(a.return, b, c);
      }
      function wj(a, b, c, d, e) {
        var f = a.memoizedState;
        null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
      }
      function xj(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        Xi(a, b, d.children, c);
        d = L.current;
        if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
        else {
          if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
            if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
            else if (19 === a.tag) vj(a, c, b);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b) break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b) break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
          d &= 1;
        }
        G(L, d);
        if (0 === (b.mode & 1)) b.memoizedState = null;
        else switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            wj(b, false, e, c, f);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; null !== e; ) {
              a = e.alternate;
              if (null !== a && null === Ch(a)) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            wj(b, true, c, null, f);
            break;
          case "together":
            wj(b, false, null, null, void 0);
            break;
          default:
            b.memoizedState = null;
        }
        return b.child;
      }
      function ij(a, b) {
        0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      }
      function Zi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        rh |= b.lanes;
        if (0 === (c & b.childLanes)) return null;
        if (null !== a && b.child !== a.child) throw Error(p(153));
        if (null !== b.child) {
          a = b.child;
          c = Pg(a, a.pendingProps);
          b.child = c;
          for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      function yj(a, b, c) {
        switch (b.tag) {
          case 3:
            kj(b);
            Ig();
            break;
          case 5:
            Ah(b);
            break;
          case 1:
            Zf(b.type) && cg(b);
            break;
          case 4:
            yh(b, b.stateNode.containerInfo);
            break;
          case 10:
            var d = b.type._context, e = b.memoizedProps.value;
            G(Wg, d._currentValue);
            d._currentValue = e;
            break;
          case 13:
            d = b.memoizedState;
            if (null !== d) {
              if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
              if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
              G(L, L.current & 1);
              a = Zi(a, b, c);
              return null !== a ? a.sibling : null;
            }
            G(L, L.current & 1);
            break;
          case 19:
            d = 0 !== (c & b.childLanes);
            if (0 !== (a.flags & 128)) {
              if (d) return xj(a, b, c);
              b.flags |= 128;
            }
            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            G(L, L.current);
            if (d) break;
            else return null;
          case 22:
          case 23:
            return b.lanes = 0, dj(a, b, c);
        }
        return Zi(a, b, c);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b) return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          xh(uh.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "select":
              e = A({}, e, { value: void 0 });
              d = A({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
          }
          ub(c, d);
          var g;
          c = null;
          for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
            var h = e[l];
            for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
              for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else c || (f || (f = []), f.push(
              l,
              c
            )), c = k;
            else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
          }
          c && (f = f || []).push("style", c);
          var l = f;
          if (b.updateQueue = l) b.flags |= 4;
        }
      };
      Cj = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Dj(a, b) {
        if (!I) switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
      }
      function S(a) {
        var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
        if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
        else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
        a.subtreeFlags |= d;
        a.childLanes = c;
        return b;
      }
      function Ej(a, b, c) {
        var d = b.pendingProps;
        wg(b);
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S(b), null;
          case 1:
            return Zf(b.type) && $f(), S(b), null;
          case 3:
            d = b.stateNode;
            zh();
            E(Wf);
            E(H);
            Eh();
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a, b);
            S(b);
            return null;
          case 5:
            Bh(b);
            var e = xh(wh.current);
            c = b.type;
            if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            else {
              if (!d) {
                if (null === b.stateNode) throw Error(p(166));
                S(b);
                return null;
              }
              a = xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[Of] = b;
                d[Pf] = f;
                a = 0 !== (b.mode & 1);
                switch (c) {
                  case "dialog":
                    D("cancel", d);
                    D("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], d);
                    break;
                  case "source":
                    D("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d
                    );
                    D("load", d);
                    break;
                  case "details":
                    D("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    D("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    D("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), D("invalid", d);
                }
                ub(c, f);
                e = null;
                for (var g in f) if (f.hasOwnProperty(g)) {
                  var h = f[g];
                  "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                    d.textContent,
                    h,
                    a
                  ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                }
                switch (c) {
                  case "input":
                    Va(d);
                    db(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = Bf);
                }
                d = e;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[Of] = b;
                a[Pf] = d;
                zj(a, b, false, false);
                b.stateNode = a;
                a: {
                  g = vb(c, d);
                  switch (c) {
                    case "dialog":
                      D("cancel", a);
                      D("close", a);
                      e = d;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a);
                      e = d;
                      break;
                    case "video":
                    case "audio":
                      for (e = 0; e < lf.length; e++) D(lf[e], a);
                      e = d;
                      break;
                    case "source":
                      D("error", a);
                      e = d;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a
                      );
                      D("load", a);
                      e = d;
                      break;
                    case "details":
                      D("toggle", a);
                      e = d;
                      break;
                    case "input":
                      Za(a, d);
                      e = Ya(a, d);
                      D("invalid", a);
                      break;
                    case "option":
                      e = d;
                      break;
                    case "select":
                      a._wrapperState = { wasMultiple: !!d.multiple };
                      e = A({}, d, { value: void 0 });
                      D("invalid", a);
                      break;
                    case "textarea":
                      hb(a, d);
                      e = gb(a, d);
                      D("invalid", a);
                      break;
                    default:
                      e = d;
                  }
                  ub(c, e);
                  h = e;
                  for (f in h) if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                  }
                  switch (c) {
                    case "input":
                      Va(a);
                      db(a, d, false);
                      break;
                    case "textarea":
                      Va(a);
                      jb(a);
                      break;
                    case "option":
                      null != d.value && a.setAttribute("value", "" + Sa(d.value));
                      break;
                    case "select":
                      a.multiple = !!d.multiple;
                      f = d.value;
                      null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                        a,
                        !!d.multiple,
                        d.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e.onClick && (a.onclick = Bf);
                  }
                  switch (c) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d = !!d.autoFocus;
                      break a;
                    case "img":
                      d = true;
                      break a;
                    default:
                      d = false;
                  }
                }
                d && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            }
            S(b);
            return null;
          case 6:
            if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
              c = xh(wh.current);
              xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.memoizedProps;
                d[Of] = b;
                if (f = d.nodeValue !== c) {
                  if (a = xg, null !== a) switch (a.tag) {
                    case 3:
                      Af(d.nodeValue, c, 0 !== (a.mode & 1));
                      break;
                    case 5:
                      true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  }
                }
                f && (b.flags |= 4);
              } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
            }
            S(b);
            return null;
          case 13:
            E(L);
            d = b.memoizedState;
            if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
              if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
              else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                if (null === a) {
                  if (!f) throw Error(p(318));
                  f = b.memoizedState;
                  f = null !== f ? f.dehydrated : null;
                  if (!f) throw Error(p(317));
                  f[Of] = b;
                } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
                S(b);
                f = false;
              } else null !== zg && (Fj(zg), zg = null), f = true;
              if (!f) return b.flags & 65536 ? b : null;
            }
            if (0 !== (b.flags & 128)) return b.lanes = c, b;
            d = null !== d;
            d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
            null !== b.updateQueue && (b.flags |= 4);
            S(b);
            return null;
          case 4:
            return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
          case 10:
            return ah(b.type._context), S(b), null;
          case 17:
            return Zf(b.type) && $f(), S(b), null;
          case 19:
            E(L);
            f = b.memoizedState;
            if (null === f) return S(b), null;
            d = 0 !== (b.flags & 128);
            g = f.rendering;
            if (null === g) if (d) Dj(f, false);
            else {
              if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
                g = Ch(a);
                if (null !== g) {
                  b.flags |= 128;
                  Dj(f, false);
                  d = g.updateQueue;
                  null !== d && (b.updateQueue = d, b.flags |= 4);
                  b.subtreeFlags = 0;
                  d = c;
                  for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                  G(L, L.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
              null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
            }
            else {
              if (!d) if (a = Ch(g), null !== a) {
                if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
              } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
              f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
            }
            if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
            S(b);
            return null;
          case 22:
          case 23:
            return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p(156, b.tag));
      }
      function Ij(a, b) {
        wg(b);
        switch (b.tag) {
          case 1:
            return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 3:
            return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
          case 5:
            return Bh(b), null;
          case 13:
            E(L);
            a = b.memoizedState;
            if (null !== a && null !== a.dehydrated) {
              if (null === b.alternate) throw Error(p(340));
              Ig();
            }
            a = b.flags;
            return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 19:
            return E(L), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V = null;
      function Lj(a, b) {
        var c = a.ref;
        if (null !== c) if ("function" === typeof c) try {
          c(null);
        } catch (d) {
          W(a, b, d);
        }
        else c.current = null;
      }
      function Mj(a, b, c) {
        try {
          c();
        } catch (d) {
          W(a, b, d);
        }
      }
      var Nj = false;
      function Oj(a, b) {
        Cf = dd;
        a = Me();
        if (Ne(a)) {
          if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
          else a: {
            c = (c = a.ownerDocument) && c.defaultView || window;
            var d = c.getSelection && c.getSelection();
            if (d && 0 !== d.rangeCount) {
              c = d.anchorNode;
              var e = d.anchorOffset, f = d.focusNode;
              d = d.focusOffset;
              try {
                c.nodeType, f.nodeType;
              } catch (F) {
                c = null;
                break a;
              }
              var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r2 = null;
              b: for (; ; ) {
                for (var y; ; ) {
                  q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                  q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                  3 === q.nodeType && (g += q.nodeValue.length);
                  if (null === (y = q.firstChild)) break;
                  r2 = q;
                  q = y;
                }
                for (; ; ) {
                  if (q === a) break b;
                  r2 === c && ++l === e && (h = g);
                  r2 === f && ++m === d && (k = g);
                  if (null !== (y = q.nextSibling)) break;
                  q = r2;
                  r2 = q.parentNode;
                }
                q = y;
              }
              c = -1 === h || -1 === k ? null : { start: h, end: k };
            } else c = null;
          }
          c = c || { start: 0, end: 0 };
        } else c = null;
        Df = { focusedElem: a, selectionRange: c };
        dd = false;
        for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
        else for (; null !== V; ) {
          b = V;
          try {
            var n = b.alternate;
            if (0 !== (b.flags & 1024)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n) {
                  var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                  x.__reactInternalSnapshotBeforeUpdate = w;
                }
                break;
              case 3:
                var u = b.stateNode.containerInfo;
                1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
          } catch (F) {
            W(b, b.return, F);
          }
          a = b.sibling;
          if (null !== a) {
            a.return = b.return;
            V = a;
            break;
          }
          V = b.return;
        }
        n = Nj;
        Nj = false;
        return n;
      }
      function Pj(a, b, c) {
        var d = b.updateQueue;
        d = null !== d ? d.lastEffect : null;
        if (null !== d) {
          var e = d = d.next;
          do {
            if ((e.tag & a) === a) {
              var f = e.destroy;
              e.destroy = void 0;
              void 0 !== f && Mj(b, c, f);
            }
            e = e.next;
          } while (e !== d);
        }
      }
      function Qj(a, b) {
        b = b.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.create;
              c.destroy = d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Rj(a) {
        var b = a.ref;
        if (null !== b) {
          var c = a.stateNode;
          switch (a.tag) {
            case 5:
              a = c;
              break;
            default:
              a = c;
          }
          "function" === typeof b ? b(a) : b.current = a;
        }
      }
      function Sj(a) {
        var b = a.alternate;
        null !== b && (a.alternate = null, Sj(b));
        a.child = null;
        a.deletions = null;
        a.sibling = null;
        5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
        a.stateNode = null;
        a.return = null;
        a.dependencies = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.stateNode = null;
        a.updateQueue = null;
      }
      function Tj(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function Uj(a) {
        a: for (; ; ) {
          for (; null === a.sibling; ) {
            if (null === a.return || Tj(a.return)) return null;
            a = a.return;
          }
          a.sibling.return = a.return;
          for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
            if (a.flags & 2) continue a;
            if (null === a.child || 4 === a.tag) continue a;
            else a.child.return = a, a = a.child;
          }
          if (!(a.flags & 2)) return a.stateNode;
        }
      }
      function Vj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
        else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
      }
      function Wj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
      }
      var X2 = null;
      var Xj = false;
      function Yj(a, b, c) {
        for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
      }
      function Zj(a, b, c) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
          lc.onCommitFiberUnmount(kc, c);
        } catch (h) {
        }
        switch (c.tag) {
          case 5:
            U || Lj(c, b);
          case 6:
            var d = X2, e = Xj;
            X2 = null;
            Yj(a, b, c);
            X2 = d;
            Xj = e;
            null !== X2 && (Xj ? (a = X2, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X2.removeChild(c.stateNode));
            break;
          case 18:
            null !== X2 && (Xj ? (a = X2, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X2, c.stateNode));
            break;
          case 4:
            d = X2;
            e = Xj;
            X2 = c.stateNode.containerInfo;
            Xj = true;
            Yj(a, b, c);
            X2 = d;
            Xj = e;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
              e = d = d.next;
              do {
                var f = e, g = f.destroy;
                f = f.tag;
                void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
                e = e.next;
              } while (e !== d);
            }
            Yj(a, b, c);
            break;
          case 1:
            if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
              d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
            } catch (h) {
              W(c, b, h);
            }
            Yj(a, b, c);
            break;
          case 21:
            Yj(a, b, c);
            break;
          case 22:
            c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
            break;
          default:
            Yj(a, b, c);
        }
      }
      function ak(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Kj());
          b.forEach(function(b2) {
            var d = bk.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function ck(a, b) {
        var c = b.deletions;
        if (null !== c) for (var d = 0; d < c.length; d++) {
          var e = c[d];
          try {
            var f = a, g = b, h = g;
            a: for (; null !== h; ) {
              switch (h.tag) {
                case 5:
                  X2 = h.stateNode;
                  Xj = false;
                  break a;
                case 3:
                  X2 = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
                case 4:
                  X2 = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
              }
              h = h.return;
            }
            if (null === X2) throw Error(p(160));
            Zj(f, g, e);
            X2 = null;
            Xj = false;
            var k = e.alternate;
            null !== k && (k.return = null);
            e.return = null;
          } catch (l) {
            W(e, b, l);
          }
        }
        if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
      }
      function dk(a, b) {
        var c = a.alternate, d = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b, a);
            ek(a);
            if (d & 4) {
              try {
                Pj(3, a, a.return), Qj(3, a);
              } catch (t) {
                W(a, a.return, t);
              }
              try {
                Pj(5, a, a.return);
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 1:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            break;
          case 5:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            if (a.flags & 32) {
              var e = a.stateNode;
              try {
                ob(e, "");
              } catch (t) {
                W(a, a.return, t);
              }
            }
            if (d & 4 && (e = a.stateNode, null != e)) {
              var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
              a.updateQueue = null;
              if (null !== k) try {
                "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                vb(h, g);
                var l = vb(h, f);
                for (g = 0; g < k.length; g += 2) {
                  var m = k[g], q = k[g + 1];
                  "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                }
                switch (h) {
                  case "input":
                    bb(e, f);
                    break;
                  case "textarea":
                    ib(e, f);
                    break;
                  case "select":
                    var r2 = e._wrapperState.wasMultiple;
                    e._wrapperState.wasMultiple = !!f.multiple;
                    var y = f.value;
                    null != y ? fb(e, !!f.multiple, y, false) : r2 !== !!f.multiple && (null != f.defaultValue ? fb(
                      e,
                      !!f.multiple,
                      f.defaultValue,
                      true
                    ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                }
                e[Pf] = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 6:
            ck(b, a);
            ek(a);
            if (d & 4) {
              if (null === a.stateNode) throw Error(p(162));
              e = a.stateNode;
              f = a.memoizedProps;
              try {
                e.nodeValue = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 3:
            ck(b, a);
            ek(a);
            if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
              bd(b.containerInfo);
            } catch (t) {
              W(a, a.return, t);
            }
            break;
          case 4:
            ck(b, a);
            ek(a);
            break;
          case 13:
            ck(b, a);
            ek(a);
            e = a.child;
            e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
            d & 4 && ak(a);
            break;
          case 22:
            m = null !== c && null !== c.memoizedState;
            a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
            ek(a);
            if (d & 8192) {
              l = null !== a.memoizedState;
              if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
                for (q = V = m; null !== V; ) {
                  r2 = V;
                  y = r2.child;
                  switch (r2.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pj(4, r2, r2.return);
                      break;
                    case 1:
                      Lj(r2, r2.return);
                      var n = r2.stateNode;
                      if ("function" === typeof n.componentWillUnmount) {
                        d = r2;
                        c = r2.return;
                        try {
                          b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                        } catch (t) {
                          W(d, c, t);
                        }
                      }
                      break;
                    case 5:
                      Lj(r2, r2.return);
                      break;
                    case 22:
                      if (null !== r2.memoizedState) {
                        gk(q);
                        continue;
                      }
                  }
                  null !== y ? (y.return = r2, V = y) : gk(q);
                }
                m = m.sibling;
              }
              a: for (m = null, q = a; ; ) {
                if (5 === q.tag) {
                  if (null === m) {
                    m = q;
                    try {
                      e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                    } catch (t) {
                      W(a, a.return, t);
                    }
                  }
                } else if (6 === q.tag) {
                  if (null === m) try {
                    q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                  } catch (t) {
                    W(a, a.return, t);
                  }
                } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                  q.child.return = q;
                  q = q.child;
                  continue;
                }
                if (q === a) break a;
                for (; null === q.sibling; ) {
                  if (null === q.return || q.return === a) break a;
                  m === q && (m = null);
                  q = q.return;
                }
                m === q && (m = null);
                q.sibling.return = q.return;
                q = q.sibling;
              }
            }
            break;
          case 19:
            ck(b, a);
            ek(a);
            d & 4 && ak(a);
            break;
          case 21:
            break;
          default:
            ck(
              b,
              a
            ), ek(a);
        }
      }
      function ek(a) {
        var b = a.flags;
        if (b & 2) {
          try {
            a: {
              for (var c = a.return; null !== c; ) {
                if (Tj(c)) {
                  var d = c;
                  break a;
                }
                c = c.return;
              }
              throw Error(p(160));
            }
            switch (d.tag) {
              case 5:
                var e = d.stateNode;
                d.flags & 32 && (ob(e, ""), d.flags &= -33);
                var f = Uj(a);
                Wj(a, f, e);
                break;
              case 3:
              case 4:
                var g = d.stateNode.containerInfo, h = Uj(a);
                Vj(a, h, g);
                break;
              default:
                throw Error(p(161));
            }
          } catch (k) {
            W(a, a.return, k);
          }
          a.flags &= -3;
        }
        b & 4096 && (a.flags &= -4097);
      }
      function hk(a, b, c) {
        V = a;
        ik(a, b, c);
      }
      function ik(a, b, c) {
        for (var d = 0 !== (a.mode & 1); null !== V; ) {
          var e = V, f = e.child;
          if (22 === e.tag && d) {
            var g = null !== e.memoizedState || Jj;
            if (!g) {
              var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
              h = Jj;
              var l = U;
              Jj = g;
              if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
              for (; null !== f; ) V = f, ik(f, b, c), f = f.sibling;
              V = e;
              Jj = h;
              U = l;
            }
            kk(a, b, c);
          } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
        }
      }
      function kk(a) {
        for (; null !== V; ) {
          var b = V;
          if (0 !== (b.flags & 8772)) {
            var c = b.alternate;
            try {
              if (0 !== (b.flags & 8772)) switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  U || Qj(5, b);
                  break;
                case 1:
                  var d = b.stateNode;
                  if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                  else {
                    var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                  }
                  var f = b.updateQueue;
                  null !== f && sh(b, f, d);
                  break;
                case 3:
                  var g = b.updateQueue;
                  if (null !== g) {
                    c = null;
                    if (null !== b.child) switch (b.child.tag) {
                      case 5:
                        c = b.child.stateNode;
                        break;
                      case 1:
                        c = b.child.stateNode;
                    }
                    sh(b, g, c);
                  }
                  break;
                case 5:
                  var h = b.stateNode;
                  if (null === c && b.flags & 4) {
                    c = h;
                    var k = b.memoizedProps;
                    switch (b.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k.autoFocus && c.focus();
                        break;
                      case "img":
                        k.src && (c.src = k.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (null === b.memoizedState) {
                    var l = b.alternate;
                    if (null !== l) {
                      var m = l.memoizedState;
                      if (null !== m) {
                        var q = m.dehydrated;
                        null !== q && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p(163));
              }
              U || b.flags & 512 && Rj(b);
            } catch (r2) {
              W(b, b.return, r2);
            }
          }
          if (b === a) {
            V = null;
            break;
          }
          c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function gk(a) {
        for (; null !== V; ) {
          var b = V;
          if (b === a) {
            V = null;
            break;
          }
          var c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function jk(a) {
        for (; null !== V; ) {
          var b = V;
          try {
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                var c = b.return;
                try {
                  Qj(4, b);
                } catch (k) {
                  W(b, c, k);
                }
                break;
              case 1:
                var d = b.stateNode;
                if ("function" === typeof d.componentDidMount) {
                  var e = b.return;
                  try {
                    d.componentDidMount();
                  } catch (k) {
                    W(b, e, k);
                  }
                }
                var f = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, f, k);
                }
                break;
              case 5:
                var g = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, g, k);
                }
            }
          } catch (k) {
            W(b, b.return, k);
          }
          if (b === a) {
            V = null;
            break;
          }
          var h = b.sibling;
          if (null !== h) {
            h.return = b.return;
            V = h;
            break;
          }
          V = b.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z = 0;
      var fj = 0;
      var ej = Uf(0);
      var T = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R() {
        return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
      }
      function yi(a) {
        if (0 === (a.mode & 1)) return 1;
        if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
        if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
        a = C;
        if (0 !== a) return a;
        a = window.event;
        a = void 0 === a ? 16 : jd(a.type);
        return a;
      }
      function gi(a, b, c, d) {
        if (50 < yk) throw yk = 0, zk = null, Error(p(185));
        Ac(a, c, d);
        if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
      }
      function Dk(a, b) {
        var c = a.callbackNode;
        wc(a, b);
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
        else if (b = d & -d, a.callbackPriority !== b) {
          null != c && bc(c);
          if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
            0 === (K & 6) && jg();
          }), c = null;
          else {
            switch (Dc(d)) {
              case 1:
                c = fc;
                break;
              case 4:
                c = gc;
                break;
              case 16:
                c = hc;
                break;
              case 536870912:
                c = jc;
                break;
              default:
                c = hc;
            }
            c = Fk(c, Gk.bind(null, a));
          }
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Gk(a, b) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6)) throw Error(p(327));
        var c = a.callbackNode;
        if (Hk() && a.callbackNode !== c) return null;
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) return null;
        if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
        else {
          b = d;
          var e = K;
          K |= 2;
          var f = Jk();
          if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
          do
            try {
              Lk();
              break;
            } catch (h) {
              Mk(a, h);
            }
          while (1);
          $g();
          mk.current = f;
          K = e;
          null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
        }
        if (0 !== b) {
          2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
          if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          if (6 === b) Ck(a, d);
          else {
            e = a.current.alternate;
            if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
            a.finishedWork = e;
            a.finishedLanes = d;
            switch (b) {
              case 0:
              case 1:
                throw Error(p(345));
              case 2:
                Pk(a, tk, uk);
                break;
              case 3:
                Ck(a, d);
                if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                  if (0 !== uc(a, 0)) break;
                  e = a.suspendedLanes;
                  if ((e & d) !== d) {
                    R();
                    a.pingedLanes |= a.suspendedLanes & e;
                    break;
                  }
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 4:
                Ck(a, d);
                if ((d & 4194240) === d) break;
                b = a.eventTimes;
                for (e = -1; 0 < d; ) {
                  var g = 31 - oc(d);
                  f = 1 << g;
                  g = b[g];
                  g > e && (e = g);
                  d &= ~f;
                }
                d = e;
                d = B() - d;
                d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                if (10 < d) {
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 5:
                Pk(a, tk, uk);
                break;
              default:
                throw Error(p(329));
            }
          }
        }
        Dk(a, B());
        return a.callbackNode === c ? Gk.bind(null, a) : null;
      }
      function Nk(a, b) {
        var c = sk;
        a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
        a = Ik(a, b);
        2 !== a && (b = tk, tk = c, null !== b && Fj(b));
        return a;
      }
      function Fj(a) {
        null === tk ? tk = a : tk.push.apply(tk, a);
      }
      function Ok(a) {
        for (var b = a; ; ) {
          if (b.flags & 16384) {
            var c = b.updateQueue;
            if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
              var e = c[d], f = e.getSnapshot;
              e = e.value;
              try {
                if (!He(f(), e)) return false;
              } catch (g) {
                return false;
              }
            }
          }
          c = b.child;
          if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
          else {
            if (b === a) break;
            for (; null === b.sibling; ) {
              if (null === b.return || b.return === a) return true;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return true;
      }
      function Ck(a, b) {
        b &= ~rk;
        b &= ~qk;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - oc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Ek(a) {
        if (0 !== (K & 6)) throw Error(p(327));
        Hk();
        var b = uc(a, 0);
        if (0 === (b & 1)) return Dk(a, B()), null;
        var c = Ik(a, b);
        if (0 !== a.tag && 2 === c) {
          var d = xc(a);
          0 !== d && (b = d, c = Nk(a, d));
        }
        if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
        if (6 === c) throw Error(p(345));
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Pk(a, tk, uk);
        Dk(a, B());
        return null;
      }
      function Qk(a, b) {
        var c = K;
        K |= 1;
        try {
          return a(b);
        } finally {
          K = c, 0 === K && (Gj = B() + 500, fg && jg());
        }
      }
      function Rk(a) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b = K;
        K |= 1;
        var c = ok.transition, d = C;
        try {
          if (ok.transition = null, C = 1, a) return a();
        } finally {
          C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E(ej);
      }
      function Kk(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, Gf(c));
        if (null !== Y) for (c = Y.return; null !== c; ) {
          var d = c;
          wg(d);
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              null !== d && void 0 !== d && $f();
              break;
            case 3:
              zh();
              E(Wf);
              E(H);
              Eh();
              break;
            case 5:
              Bh(d);
              break;
            case 4:
              zh();
              break;
            case 13:
              E(L);
              break;
            case 19:
              E(L);
              break;
            case 10:
              ah(d.type._context);
              break;
            case 22:
            case 23:
              Hj();
          }
          c = c.return;
        }
        Q = a;
        Y = a = Pg(a.current, null);
        Z = fj = b;
        T = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
            c.interleaved = null;
            var e = d.next, f = c.pending;
            if (null !== f) {
              var g = f.next;
              f.next = e;
              d.next = g;
            }
            c.pending = d;
          }
          fh = null;
        }
        return a;
      }
      function Mk(a, b) {
        do {
          var c = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d = M.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N = M = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c || null === c.return) {
              T = 1;
              pk = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = Z;
              h.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k, m = h, q = m.tag;
                if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r2 = m.alternate;
                  r2 ? (m.updateQueue = r2.updateQueue, m.memoizedState = r2.memoizedState, m.lanes = r2.lanes) : (m.updateQueue = null, m.memoizedState = null);
                }
                var y = Ui(g);
                if (null !== y) {
                  y.flags &= -257;
                  Vi(y, g, h, f, b);
                  y.mode & 1 && Si(f, l, b);
                  b = y;
                  k = l;
                  var n = b.updateQueue;
                  if (null === n) {
                    var t = /* @__PURE__ */ new Set();
                    t.add(k);
                    b.updateQueue = t;
                  } else n.add(k);
                  break a;
                } else {
                  if (0 === (b & 1)) {
                    Si(f, l, b);
                    tj();
                    break a;
                  }
                  k = Error(p(426));
                }
              } else if (I && h.mode & 1) {
                var J = Ui(g);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g, h, f, b);
                  Jg(Ji(k, h));
                  break a;
                }
              }
              f = k = Ji(k, h);
              4 !== T && (T = 2);
              null === sk ? sk = [f] : sk.push(f);
              f = g;
              do {
                switch (f.tag) {
                  case 3:
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var x = Ni(f, k, b);
                    ph(f, x);
                    break a;
                  case 1:
                    h = k;
                    var w = f.type, u = f.stateNode;
                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                      f.flags |= 65536;
                      b &= -b;
                      f.lanes |= b;
                      var F = Qi(f, h, b);
                      ph(f, F);
                      break a;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Sk(c);
          } catch (na) {
            b = na;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a = mk.current;
        mk.current = Rh;
        return null === a ? Rh : a;
      }
      function tj() {
        if (0 === T || 3 === T || 2 === T) T = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
      }
      function Ik(a, b) {
        var c = K;
        K |= 2;
        var d = Jk();
        if (Q !== a || Z !== b) uk = null, Kk(a, b);
        do
          try {
            Tk();
            break;
          } catch (e) {
            Mk(a, e);
          }
        while (1);
        $g();
        K = c;
        mk.current = d;
        if (null !== Y) throw Error(p(261));
        Q = null;
        Z = 0;
        return T;
      }
      function Tk() {
        for (; null !== Y; ) Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); ) Uk(Y);
      }
      function Uk(a) {
        var b = Vk(a.alternate, a, fj);
        a.memoizedProps = a.pendingProps;
        null === b ? Sk(a) : Y = b;
        nk.current = null;
      }
      function Sk(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 32768)) {
            if (c = Ej(c, b, fj), null !== c) {
              Y = c;
              return;
            }
          } else {
            c = Ij(c, b);
            if (null !== c) {
              c.flags &= 32767;
              Y = c;
              return;
            }
            if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
            else {
              T = 6;
              Y = null;
              return;
            }
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === T && (T = 5);
      }
      function Pk(a, b, c) {
        var d = C, e = ok.transition;
        try {
          ok.transition = null, C = 1, Wk(a, b, c, d);
        } finally {
          ok.transition = e, C = d;
        }
        return null;
      }
      function Wk(a, b, c, d) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6)) throw Error(p(327));
        c = a.finishedWork;
        var e = a.finishedLanes;
        if (null === c) return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current) throw Error(p(177));
        a.callbackNode = null;
        a.callbackPriority = 0;
        var f = c.lanes | c.childLanes;
        Bc(a, f);
        a === Q && (Y = Q = null, Z = 0);
        0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f = 0 !== (c.flags & 15990);
        if (0 !== (c.subtreeFlags & 15990) || f) {
          f = ok.transition;
          ok.transition = null;
          var g = C;
          C = 1;
          var h = K;
          K |= 4;
          nk.current = null;
          Oj(a, c);
          dk(c, a);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a.current = c;
          hk(c, a, e);
          dc();
          K = h;
          C = g;
          ok.transition = f;
        } else a.current = c;
        vk && (vk = false, wk = a, xk = e);
        f = a.pendingLanes;
        0 === f && (Ri = null);
        mc(c.stateNode, d);
        Dk(a, B());
        if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
        if (Oi) throw Oi = false, a = Pi, Pi = null, a;
        0 !== (xk & 1) && 0 !== a.tag && Hk();
        f = a.pendingLanes;
        0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a = Dc(xk), b = ok.transition, c = C;
          try {
            ok.transition = null;
            C = 16 > a ? 16 : a;
            if (null === wk) var d = false;
            else {
              a = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6)) throw Error(p(331));
              var e = K;
              K |= 4;
              for (V = a.current; null !== V; ) {
                var f = V, g = f.child;
                if (0 !== (V.flags & 16)) {
                  var h = f.deletions;
                  if (null !== h) {
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k];
                      for (V = l; null !== V; ) {
                        var m = V;
                        switch (m.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m, f);
                        }
                        var q = m.child;
                        if (null !== q) q.return = m, V = q;
                        else for (; null !== V; ) {
                          m = V;
                          var r2 = m.sibling, y = m.return;
                          Sj(m);
                          if (m === l) {
                            V = null;
                            break;
                          }
                          if (null !== r2) {
                            r2.return = y;
                            V = r2;
                            break;
                          }
                          V = y;
                        }
                      }
                    }
                    var n = f.alternate;
                    if (null !== n) {
                      var t = n.child;
                      if (null !== t) {
                        n.child = null;
                        do {
                          var J = t.sibling;
                          t.sibling = null;
                          t = J;
                        } while (null !== t);
                      }
                    }
                    V = f;
                  }
                }
                if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
                else b: for (; null !== V; ) {
                  f = V;
                  if (0 !== (f.flags & 2048)) switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f, f.return);
                  }
                  var x = f.sibling;
                  if (null !== x) {
                    x.return = f.return;
                    V = x;
                    break b;
                  }
                  V = f.return;
                }
              }
              var w = a.current;
              for (V = w; null !== V; ) {
                g = V;
                var u = g.child;
                if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
                else b: for (g = w; null !== V; ) {
                  h = V;
                  if (0 !== (h.flags & 2048)) try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h);
                    }
                  } catch (na) {
                    W(h, h.return, na);
                  }
                  if (h === g) {
                    V = null;
                    break b;
                  }
                  var F = h.sibling;
                  if (null !== F) {
                    F.return = h.return;
                    V = F;
                    break b;
                  }
                  V = h.return;
                }
              }
              K = e;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
                lc.onPostCommitFiberRoot(kc, a);
              } catch (na) {
              }
              d = true;
            }
            return d;
          } finally {
            C = c, ok.transition = b;
          }
        }
        return false;
      }
      function Xk(a, b, c) {
        b = Ji(c, b);
        b = Ni(a, b, 1);
        a = nh(a, b, 1);
        b = R();
        null !== a && (Ac(a, 1, b), Dk(a, b));
      }
      function W(a, b, c) {
        if (3 === a.tag) Xk(a, a, c);
        else for (; null !== b; ) {
          if (3 === b.tag) {
            Xk(b, a, c);
            break;
          } else if (1 === b.tag) {
            var d = b.stateNode;
            if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
              a = Ji(c, a);
              a = Qi(b, a, 1);
              b = nh(b, a, 1);
              a = R();
              null !== b && (Ac(b, 1, a), Dk(b, a));
              break;
            }
          }
          b = b.return;
        }
      }
      function Ti(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = R();
        a.pingedLanes |= a.suspendedLanes & c;
        Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
        Dk(a, b);
      }
      function Yk(a, b) {
        0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c = R();
        a = ih(a, b);
        null !== a && (Ac(a, b, c), Dk(a, c));
      }
      function uj(a) {
        var b = a.memoizedState, c = 0;
        null !== b && (c = b.retryLane);
        Yk(a, c);
      }
      function bk(a, b) {
        var c = 0;
        switch (a.tag) {
          case 13:
            var d = a.stateNode;
            var e = a.memoizedState;
            null !== e && (c = e.retryLane);
            break;
          case 19:
            d = a.stateNode;
            break;
          default:
            throw Error(p(314));
        }
        null !== d && d.delete(b);
        Yk(a, c);
      }
      var Vk;
      Vk = function(a, b, c) {
        if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
        else {
          if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
          dh = 0 !== (a.flags & 131072) ? true : false;
        }
        else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            var d = b.type;
            ij(a, b);
            a = b.pendingProps;
            var e = Yf(b, H.current);
            ch(b, c);
            e = Nh(null, b, d, a, e, c);
            var f = Sh();
            b.flags |= 1;
            "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
            return b;
          case 16:
            d = b.elementType;
            a: {
              ij(a, b);
              a = b.pendingProps;
              e = d._init;
              d = e(d._payload);
              b.type = d;
              e = b.tag = Zk(d);
              a = Ci(d, a);
              switch (e) {
                case 0:
                  b = cj(null, b, d, a, c);
                  break a;
                case 1:
                  b = hj(null, b, d, a, c);
                  break a;
                case 11:
                  b = Yi(null, b, d, a, c);
                  break a;
                case 14:
                  b = $i(null, b, d, Ci(d.type, a), c);
                  break a;
              }
              throw Error(p(
                306,
                d,
                ""
              ));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
          case 3:
            a: {
              kj(b);
              if (null === a) throw Error(p(387));
              d = b.pendingProps;
              f = b.memoizedState;
              e = f.element;
              lh(a, b);
              qh(b, d, null, c);
              var g = b.memoizedState;
              d = g.element;
              if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                e = Ji(Error(p(423)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else if (d !== e) {
                e = Ji(Error(p(424)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
              else {
                Ig();
                if (d === e) {
                  b = Zi(a, b, c);
                  break a;
                }
                Xi(a, b, d, c);
              }
              b = b.child;
            }
            return b;
          case 5:
            return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
          case 6:
            return null === a && Eg(b), null;
          case 13:
            return oj(a, b, c);
          case 4:
            return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
          case 7:
            return Xi(a, b, b.pendingProps, c), b.child;
          case 8:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              f = b.memoizedProps;
              g = e.value;
              G(Wg, d._currentValue);
              d._currentValue = g;
              if (null !== f) if (He(f.value, g)) {
                if (f.children === e.children && !Wf.current) {
                  b = Zi(a, b, c);
                  break a;
                }
              } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                var h = f.dependencies;
                if (null !== h) {
                  g = f.child;
                  for (var k = h.firstContext; null !== k; ) {
                    if (k.context === d) {
                      if (1 === f.tag) {
                        k = mh(-1, c & -c);
                        k.tag = 2;
                        var l = f.updateQueue;
                        if (null !== l) {
                          l = l.shared;
                          var m = l.pending;
                          null === m ? k.next = k : (k.next = m.next, m.next = k);
                          l.pending = k;
                        }
                      }
                      f.lanes |= c;
                      k = f.alternate;
                      null !== k && (k.lanes |= c);
                      bh(
                        f.return,
                        c,
                        b
                      );
                      h.lanes |= c;
                      break;
                    }
                    k = k.next;
                  }
                } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
                else if (18 === f.tag) {
                  g = f.return;
                  if (null === g) throw Error(p(341));
                  g.lanes |= c;
                  h = g.alternate;
                  null !== h && (h.lanes |= c);
                  bh(g, c, b);
                  g = f.sibling;
                } else g = f.child;
                if (null !== g) g.return = f;
                else for (g = f; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f = g.sibling;
                  if (null !== f) {
                    f.return = g.return;
                    g = f;
                    break;
                  }
                  g = g.return;
                }
                f = g;
              }
              Xi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
          case 14:
            return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
          case 15:
            return bj(a, b, b.type, b.pendingProps, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
          case 19:
            return xj(a, b, c);
          case 22:
            return dj(a, b, c);
        }
        throw Error(p(156, b.tag));
      };
      function Fk(a, b) {
        return ac(a, b);
      }
      function $k(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a, b, c, d) {
        return new $k(a, b, c, d);
      }
      function aj(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function Zk(a) {
        if ("function" === typeof a) return aj(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Da) return 11;
          if (a === Ga) return 14;
        }
        return 2;
      }
      function Pg(a, b) {
        var c = a.alternate;
        null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
        c.flags = a.flags & 14680064;
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Rg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a) aj(a) && (g = 1);
        else if ("string" === typeof a) g = 5;
        else a: switch (a) {
          case ya:
            return Tg(c.children, e, f, b);
          case za:
            g = 8;
            e |= 8;
            break;
          case Aa:
            return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
          case Ea:
            return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
          case Fa:
            return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
          case Ia:
            return pj(c, e, f, b);
          default:
            if ("object" === typeof a && null !== a) switch (a.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
            throw Error(p(130, null == a ? a : typeof a, ""));
        }
        b = Bg(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Tg(a, b, c, d) {
        a = Bg(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function pj(a, b, c, d) {
        a = Bg(22, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        a.stateNode = { isHidden: false };
        return a;
      }
      function Qg(a, b, c) {
        a = Bg(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Sg(a, b, c) {
        b = Bg(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function al(a, b, c, d, e) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d;
        this.onRecoverableError = e;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a, b, c, d, e, f, g, h, k) {
        a = new al(a, b, c, h, k);
        1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
        f = Bg(3, null, null, b);
        a.current = f;
        f.stateNode = a;
        f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f);
        return a;
      }
      function cl(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function dl(a) {
        if (!a) return Vf;
        a = a._reactInternals;
        a: {
          if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
          var b = a;
          do {
            switch (b.tag) {
              case 3:
                b = b.stateNode.context;
                break a;
              case 1:
                if (Zf(b.type)) {
                  b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b = b.return;
          } while (null !== b);
          throw Error(p(171));
        }
        if (1 === a.tag) {
          var c = a.type;
          if (Zf(c)) return bg(a, c, b);
        }
        return b;
      }
      function el(a, b, c, d, e, f, g, h, k) {
        a = bl(c, d, true, a, e, f, g, h, k);
        a.context = dl(null);
        c = a.current;
        d = R();
        e = yi(c);
        f = mh(d, e);
        f.callback = void 0 !== b && null !== b ? b : null;
        nh(c, f, e);
        a.current.lanes = e;
        Ac(a, e, d);
        Dk(a, d);
        return a;
      }
      function fl(a, b, c, d) {
        var e = b.current, f = R(), g = yi(e);
        c = dl(c);
        null === b.context ? b.context = c : b.pendingContext = c;
        b = mh(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        a = nh(e, b, g);
        null !== a && (gi(a, e, g, f), oh(a, e, g));
        return g;
      }
      function gl(a) {
        a = a.current;
        if (!a.child) return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function hl(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function il(a, b) {
        hl(a, b);
        (a = a.alternate) && hl(a, b);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a) {
        console.error(a);
      };
      function ll(a) {
        this._internalRoot = a;
      }
      ml.prototype.render = ll.prototype.render = function(a) {
        var b = this._internalRoot;
        if (null === b) throw Error(p(409));
        fl(a, b, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a = this._internalRoot;
        if (null !== a) {
          this._internalRoot = null;
          var b = a.containerInfo;
          Rk(function() {
            fl(null, a, null, null);
          });
          b[uf] = null;
        }
      };
      function ml(a) {
        this._internalRoot = a;
      }
      ml.prototype.unstable_scheduleHydration = function(a) {
        if (a) {
          var b = Hc();
          a = { blockedOn: null, target: a, priority: b };
          for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
          Qc.splice(c, 0, a);
          0 === c && Vc(a);
        }
      };
      function nl(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
      }
      function ol(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function pl() {
      }
      function ql(a, b, c, d, e) {
        if (e) {
          if ("function" === typeof d) {
            var f = d;
            d = function() {
              var a2 = gl(g);
              f.call(a2);
            };
          }
          var g = el(b, d, a, 0, null, false, false, "", pl);
          a._reactRootContainer = g;
          a[uf] = g.current;
          sf(8 === a.nodeType ? a.parentNode : a);
          Rk();
          return g;
        }
        for (; e = a.lastChild; ) a.removeChild(e);
        if ("function" === typeof d) {
          var h = d;
          d = function() {
            var a2 = gl(k);
            h.call(a2);
          };
        }
        var k = bl(a, 0, false, null, null, false, false, "", pl);
        a._reactRootContainer = k;
        a[uf] = k.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk(function() {
          fl(b, k, c, d);
        });
        return k;
      }
      function rl(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = gl(g);
              h.call(a2);
            };
          }
          fl(b, g, a, e);
        } else g = ql(c, b, a, e, d);
        return gl(g);
      }
      Ec = function(a) {
        switch (a.tag) {
          case 3:
            var b = a.stateNode;
            if (b.current.memoizedState.isDehydrated) {
              var c = tc(b.pendingLanes);
              0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b2 = ih(a, 1);
              if (null !== b2) {
                var c2 = R();
                gi(b2, a, 1, c2);
              }
            }), il(a, 1);
        }
      };
      Fc = function(a) {
        if (13 === a.tag) {
          var b = ih(a, 134217728);
          if (null !== b) {
            var c = R();
            gi(b, a, 134217728, c);
          }
          il(a, 134217728);
        }
      };
      Gc = function(a) {
        if (13 === a.tag) {
          var b = yi(a), c = ih(a, b);
          if (null !== c) {
            var d = R();
            gi(c, a, b, d);
          }
          il(a, b);
        }
      };
      Hc = function() {
        return C;
      };
      Ic = function(a, b) {
        var c = C;
        try {
          return C = a, b();
        } finally {
          C = c;
        }
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            bb(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; ) c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e) throw Error(p(90));
                  Wa(d);
                  bb(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = Zb(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber) try {
          kc = vl.inject(ul), lc = vl;
        } catch (a) {
        }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b)) throw Error(p(200));
        return cl(a, b, null, c);
      };
      exports.createRoot = function(a, b) {
        if (!nl(a)) throw Error(p(299));
        var c = false, d = "", e = kl;
        null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
        b = bl(a, 1, false, null, null, c, false, d, e);
        a[uf] = b.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        return new ll(b);
      };
      exports.findDOMNode = function(a) {
        if (null == a) return null;
        if (1 === a.nodeType) return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render) throw Error(p(188));
          a = Object.keys(a).join(",");
          throw Error(p(268, a));
        }
        a = Zb(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a) {
        return Rk(a);
      };
      exports.hydrate = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, true, c);
      };
      exports.hydrateRoot = function(a, b, c) {
        if (!nl(a)) throw Error(p(405));
        var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
        null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
        b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
        a[uf] = b.current;
        sf(a);
        if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
          c,
          e
        );
        return new ml(b);
      };
      exports.render = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!ol(a)) throw Error(p(40));
        return a._reactRootContainer ? (Rk(function() {
          rl(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!ol(c)) throw Error(p(200));
        if (null == a || void 0 === a._reactInternals) throw Error(p(38));
        return rl(a, b, c, false, d);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m = require_react_dom();
      if (true) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      var f = require_react();
      var k = Symbol.for("react.element");
      var l = Symbol.for("react.fragment");
      var m = Object.prototype.hasOwnProperty;
      var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p = { key: true, ref: true, __self: true, __source: true };
      function q(c, a, g) {
        var b, d = {}, e = null, h = null;
        void 0 !== g && (e = "" + g);
        void 0 !== a.key && (e = "" + a.key);
        void 0 !== a.ref && (h = a.ref);
        for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
        if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
        return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
      }
      exports.Fragment = l;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
  var require_use_sync_external_store_shim_production = __commonJS({
    "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js"(exports) {
      "use strict";
      var React37 = require_react();
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = "function" === typeof Object.is ? Object.is : is;
      var useState9 = React37.useState;
      var useEffect11 = React37.useEffect;
      var useLayoutEffect3 = React37.useLayoutEffect;
      var useDebugValue2 = React37.useDebugValue;
      function useSyncExternalStore$2(subscribe, getSnapshot) {
        var value = getSnapshot(), _useState = useState9({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
        useLayoutEffect3(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe, value, getSnapshot]
        );
        useEffect11(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe]
        );
        useDebugValue2(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
      }
      var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports.useSyncExternalStore = void 0 !== React37.useSyncExternalStore ? React37.useSyncExternalStore : shim;
    }
  });

  // node_modules/use-sync-external-store/shim/index.js
  var require_shim = __commonJS({
    "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_use_sync_external_store_shim_production();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
  var require_with_selector_production = __commonJS({
    "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js"(exports) {
      "use strict";
      var React37 = require_react();
      var shim = require_shim();
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = "function" === typeof Object.is ? Object.is : is;
      var useSyncExternalStore = shim.useSyncExternalStore;
      var useRef11 = React37.useRef;
      var useEffect11 = React37.useEffect;
      var useMemo5 = React37.useMemo;
      var useDebugValue2 = React37.useDebugValue;
      exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef11(null);
        if (null === instRef.current) {
          var inst = { hasValue: false, value: null };
          instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo5(
          function() {
            function memoizedSelector(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                nextSnapshot = selector(nextSnapshot);
                if (void 0 !== isEqual && inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, nextSnapshot))
                    return memoizedSelection = currentSelection;
                }
                return memoizedSelection = nextSnapshot;
              }
              currentSelection = memoizedSelection;
              if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
              var nextSelection = selector(nextSnapshot);
              if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
                return memoizedSnapshot = nextSnapshot, currentSelection;
              memoizedSnapshot = nextSnapshot;
              return memoizedSelection = nextSelection;
            }
            var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
              function() {
                return memoizedSelector(getSnapshot());
              },
              null === maybeGetServerSnapshot ? void 0 : function() {
                return memoizedSelector(maybeGetServerSnapshot());
              }
            ];
          },
          [getSnapshot, getServerSnapshot, selector, isEqual]
        );
        var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
        useEffect11(
          function() {
            inst.hasValue = true;
            inst.value = value;
          },
          [value]
        );
        useDebugValue2(value);
        return value;
      };
    }
  });

  // node_modules/use-sync-external-store/shim/with-selector.js
  var require_with_selector = __commonJS({
    "node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_with_selector_production();
      } else {
        module.exports = null;
      }
    }
  });

  // src/content/index.tsx
  var import_react14 = __toESM(require_react(), 1);
  var import_client = __toESM(require_client(), 1);

  // src/content/FloatingPanel.tsx
  var import_react3 = __toESM(require_react(), 1);

  // src/components/ui/button.tsx
  var React3 = __toESM(require_react());

  // node_modules/@radix-ui/react-slot/dist/index.mjs
  var React2 = __toESM(require_react(), 1);

  // node_modules/@radix-ui/react-compose-refs/dist/index.mjs
  var React = __toESM(require_react(), 1);
  function setRef(ref, value) {
    if (typeof ref === "function") {
      return ref(value);
    } else if (ref !== null && ref !== void 0) {
      ref.current = value;
    }
  }
  function composeRefs(...refs) {
    return (node) => {
      let hasCleanup = false;
      const cleanups = refs.map((ref) => {
        const cleanup = setRef(ref, node);
        if (!hasCleanup && typeof cleanup == "function") {
          hasCleanup = true;
        }
        return cleanup;
      });
      if (hasCleanup) {
        return () => {
          for (let i = 0; i < cleanups.length; i++) {
            const cleanup = cleanups[i];
            if (typeof cleanup == "function") {
              cleanup();
            } else {
              setRef(refs[i], null);
            }
          }
        };
      }
    };
  }
  function useComposedRefs(...refs) {
    return React.useCallback(composeRefs(...refs), refs);
  }

  // node_modules/@radix-ui/react-slot/dist/index.mjs
  // @__NO_SIDE_EFFECTS__
  function createSlot(ownerName) {
    const Slot2 = React2.forwardRef((props, forwardedRef) => {
      let { children, ...slotProps } = props;
      let slottableElement = null;
      let hasSlottable = false;
      const newChildren = [];
      if (isLazyComponent(children) && typeof use === "function") {
        children = use(children._payload);
      }
      React2.Children.forEach(children, (maybeSlottable) => {
        if (isSlottable(maybeSlottable)) {
          hasSlottable = true;
          const slottable = maybeSlottable;
          let child = "child" in slottable.props ? slottable.props.child : slottable.props.children;
          if (isLazyComponent(child) && typeof use === "function") {
            child = use(child._payload);
          }
          slottableElement = getSlottableElementFromSlottable(slottable, child);
          newChildren.push(slottableElement?.props?.children);
        } else {
          newChildren.push(maybeSlottable);
        }
      });
      if (slottableElement) {
        slottableElement = React2.cloneElement(slottableElement, void 0, newChildren);
      } else if (
        // A `Slottable` was found but it didn't resolve to a single element (e.g.
        // it wrapped multiple elements, text, or a render-prop `child` that
        // wasn't an element). Don't fall back to treating the `Slottable` wrapper
        // itself as the slot target — throw a descriptive error below instead.
        !hasSlottable && React2.Children.count(children) === 1 && React2.isValidElement(children)
      ) {
        slottableElement = children;
      }
      const slottableElementRef = slottableElement ? getElementRef(slottableElement) : void 0;
      const composedRef = useComposedRefs(forwardedRef, slottableElementRef);
      if (!slottableElement) {
        if (children || children === 0) {
          throw new Error(
            hasSlottable ? createSlottableError(ownerName) : createSlotError(ownerName)
          );
        }
        return children;
      }
      const mergedProps = mergeProps(slotProps, slottableElement.props ?? {});
      if (slottableElement.type !== React2.Fragment) {
        mergedProps.ref = forwardedRef ? composedRef : slottableElementRef;
      }
      return React2.cloneElement(slottableElement, mergedProps);
    });
    Slot2.displayName = `${ownerName}.Slot`;
    return Slot2;
  }
  var Slot = /* @__PURE__ */ createSlot("Slot");
  var SLOTTABLE_IDENTIFIER = Symbol.for("radix.slottable");
  var getSlottableElementFromSlottable = (slottable, child) => {
    if ("child" in slottable.props) {
      const child2 = slottable.props.child;
      if (!React2.isValidElement(child2)) return null;
      return React2.cloneElement(child2, void 0, slottable.props.children(child2.props.children));
    }
    return React2.isValidElement(child) ? child : null;
  };
  function mergeProps(slotProps, childProps) {
    const overrideProps = { ...childProps };
    for (const propName in childProps) {
      const slotPropValue = slotProps[propName];
      const childPropValue = childProps[propName];
      const isHandler = /^on[A-Z]/.test(propName);
      if (isHandler) {
        if (slotPropValue && childPropValue) {
          overrideProps[propName] = (...args) => {
            const result = childPropValue(...args);
            slotPropValue(...args);
            return result;
          };
        } else if (slotPropValue) {
          overrideProps[propName] = slotPropValue;
        }
      } else if (propName === "style") {
        overrideProps[propName] = { ...slotPropValue, ...childPropValue };
      } else if (propName === "className") {
        overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
      }
    }
    return { ...slotProps, ...overrideProps };
  }
  function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.props.ref;
    }
    return element.props.ref || element.ref;
  }
  function isSlottable(child) {
    return React2.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
  }
  var REACT_LAZY_TYPE = Symbol.for("react.lazy");
  function isLazyComponent(element) {
    return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
  }
  function isPromiseLike(value) {
    return typeof value === "object" && value !== null && "then" in value;
  }
  var createSlotError = (ownerName) => {
    return `${ownerName} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`;
  };
  var createSlottableError = (ownerName) => {
    return `${ownerName} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`;
  };
  var use = React2[" use ".trim().toString()];

  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // node_modules/class-variance-authority/dist/index.mjs
  var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
  var cx = clsx;
  var cva = (base, config) => (props) => {
    var _config_compoundVariants;
    if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    const { variants, defaultVariants } = config;
    const getVariantClassNames = Object.keys(variants).map((variant) => {
      const variantProp = props === null || props === void 0 ? void 0 : props[variant];
      const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
      if (variantProp === null) return null;
      const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
      return variants[variant][variantKey];
    });
    const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
      let [key, value] = param;
      if (value === void 0) {
        return acc;
      }
      acc[key] = value;
      return acc;
    }, {});
    const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
      let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
      return Object.entries(compoundVariantOptions).every((param2) => {
        let [key, value] = param2;
        return Array.isArray(value) ? value.includes({
          ...defaultVariants,
          ...propsWithoutUndefined
        }[key]) : {
          ...defaultVariants,
          ...propsWithoutUndefined
        }[key] === value;
      }) ? [
        ...acc,
        cvClass,
        cvClassName
      ] : acc;
    }, []);
    return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  };

  // node_modules/tailwind-merge/dist/bundle-mjs.mjs
  var CLASS_PART_SEPARATOR = "-";
  var createClassGroupUtils = (config) => {
    const classMap = createClassMap(config);
    const {
      conflictingClassGroups,
      conflictingClassGroupModifiers
    } = config;
    const getClassGroupId = (className) => {
      const classParts = className.split(CLASS_PART_SEPARATOR);
      if (classParts[0] === "" && classParts.length !== 1) {
        classParts.shift();
      }
      return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
    };
    const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
      const conflicts = conflictingClassGroups[classGroupId] || [];
      if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
        return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
      }
      return conflicts;
    };
    return {
      getClassGroupId,
      getConflictingClassGroupIds
    };
  };
  var getGroupRecursive = (classParts, classPartObject) => {
    if (classParts.length === 0) {
      return classPartObject.classGroupId;
    }
    const currentClassPart = classParts[0];
    const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
    const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
    if (classGroupFromNextClassPart) {
      return classGroupFromNextClassPart;
    }
    if (classPartObject.validators.length === 0) {
      return void 0;
    }
    const classRest = classParts.join(CLASS_PART_SEPARATOR);
    return classPartObject.validators.find(({
      validator
    }) => validator(classRest))?.classGroupId;
  };
  var arbitraryPropertyRegex = /^\[(.+)\]$/;
  var getGroupIdForArbitraryProperty = (className) => {
    if (arbitraryPropertyRegex.test(className)) {
      const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
      const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
      if (property) {
        return "arbitrary.." + property;
      }
    }
  };
  var createClassMap = (config) => {
    const {
      theme,
      prefix
    } = config;
    const classMap = {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    };
    const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
    prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
      processClassesRecursively(classGroup, classMap, classGroupId, theme);
    });
    return classMap;
  };
  var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
    classGroup.forEach((classDefinition) => {
      if (typeof classDefinition === "string") {
        const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
        classPartObjectToEdit.classGroupId = classGroupId;
        return;
      }
      if (typeof classDefinition === "function") {
        if (isThemeGetter(classDefinition)) {
          processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
          return;
        }
        classPartObject.validators.push({
          validator: classDefinition,
          classGroupId
        });
        return;
      }
      Object.entries(classDefinition).forEach(([key, classGroup2]) => {
        processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
      });
    });
  };
  var getPart = (classPartObject, path) => {
    let currentClassPartObject = classPartObject;
    path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
      if (!currentClassPartObject.nextPart.has(pathPart)) {
        currentClassPartObject.nextPart.set(pathPart, {
          nextPart: /* @__PURE__ */ new Map(),
          validators: []
        });
      }
      currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
    });
    return currentClassPartObject;
  };
  var isThemeGetter = (func) => func.isThemeGetter;
  var getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
    if (!prefix) {
      return classGroupEntries;
    }
    return classGroupEntries.map(([classGroupId, classGroup]) => {
      const prefixedClassGroup = classGroup.map((classDefinition) => {
        if (typeof classDefinition === "string") {
          return prefix + classDefinition;
        }
        if (typeof classDefinition === "object") {
          return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
        }
        return classDefinition;
      });
      return [classGroupId, prefixedClassGroup];
    });
  };
  var createLruCache = (maxCacheSize) => {
    if (maxCacheSize < 1) {
      return {
        get: () => void 0,
        set: () => {
        }
      };
    }
    let cacheSize = 0;
    let cache = /* @__PURE__ */ new Map();
    let previousCache = /* @__PURE__ */ new Map();
    const update = (key, value) => {
      cache.set(key, value);
      cacheSize++;
      if (cacheSize > maxCacheSize) {
        cacheSize = 0;
        previousCache = cache;
        cache = /* @__PURE__ */ new Map();
      }
    };
    return {
      get(key) {
        let value = cache.get(key);
        if (value !== void 0) {
          return value;
        }
        if ((value = previousCache.get(key)) !== void 0) {
          update(key, value);
          return value;
        }
      },
      set(key, value) {
        if (cache.has(key)) {
          cache.set(key, value);
        } else {
          update(key, value);
        }
      }
    };
  };
  var IMPORTANT_MODIFIER = "!";
  var createParseClassName = (config) => {
    const {
      separator,
      experimentalParseClassName
    } = config;
    const isSeparatorSingleCharacter = separator.length === 1;
    const firstSeparatorCharacter = separator[0];
    const separatorLength = separator.length;
    const parseClassName = (className) => {
      const modifiers = [];
      let bracketDepth = 0;
      let modifierStart = 0;
      let postfixModifierPosition;
      for (let index = 0; index < className.length; index++) {
        let currentCharacter = className[index];
        if (bracketDepth === 0) {
          if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
            modifiers.push(className.slice(modifierStart, index));
            modifierStart = index + separatorLength;
            continue;
          }
          if (currentCharacter === "/") {
            postfixModifierPosition = index;
            continue;
          }
        }
        if (currentCharacter === "[") {
          bracketDepth++;
        } else if (currentCharacter === "]") {
          bracketDepth--;
        }
      }
      const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
      const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
      const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
      const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
      return {
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition
      };
    };
    if (experimentalParseClassName) {
      return (className) => experimentalParseClassName({
        className,
        parseClassName
      });
    }
    return parseClassName;
  };
  var sortModifiers = (modifiers) => {
    if (modifiers.length <= 1) {
      return modifiers;
    }
    const sortedModifiers = [];
    let unsortedModifiers = [];
    modifiers.forEach((modifier) => {
      const isArbitraryVariant = modifier[0] === "[";
      if (isArbitraryVariant) {
        sortedModifiers.push(...unsortedModifiers.sort(), modifier);
        unsortedModifiers = [];
      } else {
        unsortedModifiers.push(modifier);
      }
    });
    sortedModifiers.push(...unsortedModifiers.sort());
    return sortedModifiers;
  };
  var createConfigUtils = (config) => ({
    cache: createLruCache(config.cacheSize),
    parseClassName: createParseClassName(config),
    ...createClassGroupUtils(config)
  });
  var SPLIT_CLASSES_REGEX = /\s+/;
  var mergeClassList = (classList, configUtils) => {
    const {
      parseClassName,
      getClassGroupId,
      getConflictingClassGroupIds
    } = configUtils;
    const classGroupsInConflict = [];
    const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
    let result = "";
    for (let index = classNames.length - 1; index >= 0; index -= 1) {
      const originalClassName = classNames[index];
      const {
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition
      } = parseClassName(originalClassName);
      let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
      let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
      if (!classGroupId) {
        if (!hasPostfixModifier) {
          result = originalClassName + (result.length > 0 ? " " + result : result);
          continue;
        }
        classGroupId = getClassGroupId(baseClassName);
        if (!classGroupId) {
          result = originalClassName + (result.length > 0 ? " " + result : result);
          continue;
        }
        hasPostfixModifier = false;
      }
      const variantModifier = sortModifiers(modifiers).join(":");
      const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
      const classId = modifierId + classGroupId;
      if (classGroupsInConflict.includes(classId)) {
        continue;
      }
      classGroupsInConflict.push(classId);
      const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
      for (let i = 0; i < conflictGroups.length; ++i) {
        const group = conflictGroups[i];
        classGroupsInConflict.push(modifierId + group);
      }
      result = originalClassName + (result.length > 0 ? " " + result : result);
    }
    return result;
  };
  function twJoin() {
    let index = 0;
    let argument;
    let resolvedValue;
    let string = "";
    while (index < arguments.length) {
      if (argument = arguments[index++]) {
        if (resolvedValue = toValue(argument)) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  }
  var toValue = (mix) => {
    if (typeof mix === "string") {
      return mix;
    }
    let resolvedValue;
    let string = "";
    for (let k = 0; k < mix.length; k++) {
      if (mix[k]) {
        if (resolvedValue = toValue(mix[k])) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  };
  function createTailwindMerge(createConfigFirst, ...createConfigRest) {
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall = initTailwindMerge;
    function initTailwindMerge(classList) {
      const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
      configUtils = createConfigUtils(config);
      cacheGet = configUtils.cache.get;
      cacheSet = configUtils.cache.set;
      functionToCall = tailwindMerge;
      return tailwindMerge(classList);
    }
    function tailwindMerge(classList) {
      const cachedResult = cacheGet(classList);
      if (cachedResult) {
        return cachedResult;
      }
      const result = mergeClassList(classList, configUtils);
      cacheSet(classList, result);
      return result;
    }
    return function callTailwindMerge() {
      return functionToCall(twJoin.apply(null, arguments));
    };
  }
  var fromTheme = (key) => {
    const themeGetter = (theme) => theme[key] || [];
    themeGetter.isThemeGetter = true;
    return themeGetter;
  };
  var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
  var fractionRegex = /^\d+\/\d+$/;
  var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
  var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
  var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
  var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
  var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
  var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
  var isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
  var isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
  var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
  var isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
  var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
  var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
  var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
  var isTshirtSize = (value) => tshirtUnitRegex.test(value);
  var sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
  var isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
  var isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
  var imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
  var isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
  var isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
  var isAny = () => true;
  var getIsArbitraryValue = (value, label, testValue) => {
    const result = arbitraryValueRegex.exec(value);
    if (result) {
      if (result[1]) {
        return typeof label === "string" ? result[1] === label : label.has(result[1]);
      }
      return testValue(result[2]);
    }
    return false;
  };
  var isLengthOnly = (value) => (
    // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
    // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
    // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
    lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
  );
  var isNever = () => false;
  var isShadow = (value) => shadowRegex.test(value);
  var isImage = (value) => imageRegex.test(value);
  var getDefaultConfig = () => {
    const colors = fromTheme("colors");
    const spacing = fromTheme("spacing");
    const blur = fromTheme("blur");
    const brightness = fromTheme("brightness");
    const borderColor = fromTheme("borderColor");
    const borderRadius = fromTheme("borderRadius");
    const borderSpacing = fromTheme("borderSpacing");
    const borderWidth = fromTheme("borderWidth");
    const contrast = fromTheme("contrast");
    const grayscale = fromTheme("grayscale");
    const hueRotate = fromTheme("hueRotate");
    const invert = fromTheme("invert");
    const gap = fromTheme("gap");
    const gradientColorStops = fromTheme("gradientColorStops");
    const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
    const inset = fromTheme("inset");
    const margin = fromTheme("margin");
    const opacity = fromTheme("opacity");
    const padding = fromTheme("padding");
    const saturate = fromTheme("saturate");
    const scale = fromTheme("scale");
    const sepia = fromTheme("sepia");
    const skew = fromTheme("skew");
    const space = fromTheme("space");
    const translate2 = fromTheme("translate");
    const getOverscroll = () => ["auto", "contain", "none"];
    const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
    const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
    const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
    const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
    const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
    const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
    const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
    const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
    const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
    const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
    const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
    const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [isAny],
        spacing: [isLength, isArbitraryLength],
        blur: ["none", "", isTshirtSize, isArbitraryValue],
        brightness: getNumberAndArbitrary(),
        borderColor: [colors],
        borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
        borderSpacing: getSpacingWithArbitrary(),
        borderWidth: getLengthWithEmptyAndArbitrary(),
        contrast: getNumberAndArbitrary(),
        grayscale: getZeroAndEmpty(),
        hueRotate: getNumberAndArbitrary(),
        invert: getZeroAndEmpty(),
        gap: getSpacingWithArbitrary(),
        gradientColorStops: [colors],
        gradientColorStopPositions: [isPercent, isArbitraryLength],
        inset: getSpacingWithAutoAndArbitrary(),
        margin: getSpacingWithAutoAndArbitrary(),
        opacity: getNumberAndArbitrary(),
        padding: getSpacingWithArbitrary(),
        saturate: getNumberAndArbitrary(),
        scale: getNumberAndArbitrary(),
        sepia: getZeroAndEmpty(),
        skew: getNumberAndArbitrary(),
        space: getSpacingWithArbitrary(),
        translate: getSpacingWithArbitrary()
      },
      classGroups: {
        // Layout
        /**
         * Aspect Ratio
         * @see https://tailwindcss.com/docs/aspect-ratio
         */
        aspect: [{
          aspect: ["auto", "square", "video", isArbitraryValue]
        }],
        /**
         * Container
         * @see https://tailwindcss.com/docs/container
         */
        container: ["container"],
        /**
         * Columns
         * @see https://tailwindcss.com/docs/columns
         */
        columns: [{
          columns: [isTshirtSize]
        }],
        /**
         * Break After
         * @see https://tailwindcss.com/docs/break-after
         */
        "break-after": [{
          "break-after": getBreaks()
        }],
        /**
         * Break Before
         * @see https://tailwindcss.com/docs/break-before
         */
        "break-before": [{
          "break-before": getBreaks()
        }],
        /**
         * Break Inside
         * @see https://tailwindcss.com/docs/break-inside
         */
        "break-inside": [{
          "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
        }],
        /**
         * Box Decoration Break
         * @see https://tailwindcss.com/docs/box-decoration-break
         */
        "box-decoration": [{
          "box-decoration": ["slice", "clone"]
        }],
        /**
         * Box Sizing
         * @see https://tailwindcss.com/docs/box-sizing
         */
        box: [{
          box: ["border", "content"]
        }],
        /**
         * Display
         * @see https://tailwindcss.com/docs/display
         */
        display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
        /**
         * Floats
         * @see https://tailwindcss.com/docs/float
         */
        float: [{
          float: ["right", "left", "none", "start", "end"]
        }],
        /**
         * Clear
         * @see https://tailwindcss.com/docs/clear
         */
        clear: [{
          clear: ["left", "right", "both", "none", "start", "end"]
        }],
        /**
         * Isolation
         * @see https://tailwindcss.com/docs/isolation
         */
        isolation: ["isolate", "isolation-auto"],
        /**
         * Object Fit
         * @see https://tailwindcss.com/docs/object-fit
         */
        "object-fit": [{
          object: ["contain", "cover", "fill", "none", "scale-down"]
        }],
        /**
         * Object Position
         * @see https://tailwindcss.com/docs/object-position
         */
        "object-position": [{
          object: [...getPositions(), isArbitraryValue]
        }],
        /**
         * Overflow
         * @see https://tailwindcss.com/docs/overflow
         */
        overflow: [{
          overflow: getOverflow()
        }],
        /**
         * Overflow X
         * @see https://tailwindcss.com/docs/overflow
         */
        "overflow-x": [{
          "overflow-x": getOverflow()
        }],
        /**
         * Overflow Y
         * @see https://tailwindcss.com/docs/overflow
         */
        "overflow-y": [{
          "overflow-y": getOverflow()
        }],
        /**
         * Overscroll Behavior
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        overscroll: [{
          overscroll: getOverscroll()
        }],
        /**
         * Overscroll Behavior X
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        "overscroll-x": [{
          "overscroll-x": getOverscroll()
        }],
        /**
         * Overscroll Behavior Y
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        "overscroll-y": [{
          "overscroll-y": getOverscroll()
        }],
        /**
         * Position
         * @see https://tailwindcss.com/docs/position
         */
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        /**
         * Top / Right / Bottom / Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        inset: [{
          inset: [inset]
        }],
        /**
         * Right / Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-x": [{
          "inset-x": [inset]
        }],
        /**
         * Top / Bottom
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-y": [{
          "inset-y": [inset]
        }],
        /**
         * Start
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        start: [{
          start: [inset]
        }],
        /**
         * End
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        end: [{
          end: [inset]
        }],
        /**
         * Top
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        top: [{
          top: [inset]
        }],
        /**
         * Right
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        right: [{
          right: [inset]
        }],
        /**
         * Bottom
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        bottom: [{
          bottom: [inset]
        }],
        /**
         * Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        left: [{
          left: [inset]
        }],
        /**
         * Visibility
         * @see https://tailwindcss.com/docs/visibility
         */
        visibility: ["visible", "invisible", "collapse"],
        /**
         * Z-Index
         * @see https://tailwindcss.com/docs/z-index
         */
        z: [{
          z: ["auto", isInteger, isArbitraryValue]
        }],
        // Flexbox and Grid
        /**
         * Flex Basis
         * @see https://tailwindcss.com/docs/flex-basis
         */
        basis: [{
          basis: getSpacingWithAutoAndArbitrary()
        }],
        /**
         * Flex Direction
         * @see https://tailwindcss.com/docs/flex-direction
         */
        "flex-direction": [{
          flex: ["row", "row-reverse", "col", "col-reverse"]
        }],
        /**
         * Flex Wrap
         * @see https://tailwindcss.com/docs/flex-wrap
         */
        "flex-wrap": [{
          flex: ["wrap", "wrap-reverse", "nowrap"]
        }],
        /**
         * Flex
         * @see https://tailwindcss.com/docs/flex
         */
        flex: [{
          flex: ["1", "auto", "initial", "none", isArbitraryValue]
        }],
        /**
         * Flex Grow
         * @see https://tailwindcss.com/docs/flex-grow
         */
        grow: [{
          grow: getZeroAndEmpty()
        }],
        /**
         * Flex Shrink
         * @see https://tailwindcss.com/docs/flex-shrink
         */
        shrink: [{
          shrink: getZeroAndEmpty()
        }],
        /**
         * Order
         * @see https://tailwindcss.com/docs/order
         */
        order: [{
          order: ["first", "last", "none", isInteger, isArbitraryValue]
        }],
        /**
         * Grid Template Columns
         * @see https://tailwindcss.com/docs/grid-template-columns
         */
        "grid-cols": [{
          "grid-cols": [isAny]
        }],
        /**
         * Grid Column Start / End
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-start-end": [{
          col: ["auto", {
            span: ["full", isInteger, isArbitraryValue]
          }, isArbitraryValue]
        }],
        /**
         * Grid Column Start
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-start": [{
          "col-start": getNumberWithAutoAndArbitrary()
        }],
        /**
         * Grid Column End
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-end": [{
          "col-end": getNumberWithAutoAndArbitrary()
        }],
        /**
         * Grid Template Rows
         * @see https://tailwindcss.com/docs/grid-template-rows
         */
        "grid-rows": [{
          "grid-rows": [isAny]
        }],
        /**
         * Grid Row Start / End
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-start-end": [{
          row: ["auto", {
            span: [isInteger, isArbitraryValue]
          }, isArbitraryValue]
        }],
        /**
         * Grid Row Start
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-start": [{
          "row-start": getNumberWithAutoAndArbitrary()
        }],
        /**
         * Grid Row End
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-end": [{
          "row-end": getNumberWithAutoAndArbitrary()
        }],
        /**
         * Grid Auto Flow
         * @see https://tailwindcss.com/docs/grid-auto-flow
         */
        "grid-flow": [{
          "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
        }],
        /**
         * Grid Auto Columns
         * @see https://tailwindcss.com/docs/grid-auto-columns
         */
        "auto-cols": [{
          "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
        }],
        /**
         * Grid Auto Rows
         * @see https://tailwindcss.com/docs/grid-auto-rows
         */
        "auto-rows": [{
          "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
        }],
        /**
         * Gap
         * @see https://tailwindcss.com/docs/gap
         */
        gap: [{
          gap: [gap]
        }],
        /**
         * Gap X
         * @see https://tailwindcss.com/docs/gap
         */
        "gap-x": [{
          "gap-x": [gap]
        }],
        /**
         * Gap Y
         * @see https://tailwindcss.com/docs/gap
         */
        "gap-y": [{
          "gap-y": [gap]
        }],
        /**
         * Justify Content
         * @see https://tailwindcss.com/docs/justify-content
         */
        "justify-content": [{
          justify: ["normal", ...getAlign()]
        }],
        /**
         * Justify Items
         * @see https://tailwindcss.com/docs/justify-items
         */
        "justify-items": [{
          "justify-items": ["start", "end", "center", "stretch"]
        }],
        /**
         * Justify Self
         * @see https://tailwindcss.com/docs/justify-self
         */
        "justify-self": [{
          "justify-self": ["auto", "start", "end", "center", "stretch"]
        }],
        /**
         * Align Content
         * @see https://tailwindcss.com/docs/align-content
         */
        "align-content": [{
          content: ["normal", ...getAlign(), "baseline"]
        }],
        /**
         * Align Items
         * @see https://tailwindcss.com/docs/align-items
         */
        "align-items": [{
          items: ["start", "end", "center", "baseline", "stretch"]
        }],
        /**
         * Align Self
         * @see https://tailwindcss.com/docs/align-self
         */
        "align-self": [{
          self: ["auto", "start", "end", "center", "stretch", "baseline"]
        }],
        /**
         * Place Content
         * @see https://tailwindcss.com/docs/place-content
         */
        "place-content": [{
          "place-content": [...getAlign(), "baseline"]
        }],
        /**
         * Place Items
         * @see https://tailwindcss.com/docs/place-items
         */
        "place-items": [{
          "place-items": ["start", "end", "center", "baseline", "stretch"]
        }],
        /**
         * Place Self
         * @see https://tailwindcss.com/docs/place-self
         */
        "place-self": [{
          "place-self": ["auto", "start", "end", "center", "stretch"]
        }],
        // Spacing
        /**
         * Padding
         * @see https://tailwindcss.com/docs/padding
         */
        p: [{
          p: [padding]
        }],
        /**
         * Padding X
         * @see https://tailwindcss.com/docs/padding
         */
        px: [{
          px: [padding]
        }],
        /**
         * Padding Y
         * @see https://tailwindcss.com/docs/padding
         */
        py: [{
          py: [padding]
        }],
        /**
         * Padding Start
         * @see https://tailwindcss.com/docs/padding
         */
        ps: [{
          ps: [padding]
        }],
        /**
         * Padding End
         * @see https://tailwindcss.com/docs/padding
         */
        pe: [{
          pe: [padding]
        }],
        /**
         * Padding Top
         * @see https://tailwindcss.com/docs/padding
         */
        pt: [{
          pt: [padding]
        }],
        /**
         * Padding Right
         * @see https://tailwindcss.com/docs/padding
         */
        pr: [{
          pr: [padding]
        }],
        /**
         * Padding Bottom
         * @see https://tailwindcss.com/docs/padding
         */
        pb: [{
          pb: [padding]
        }],
        /**
         * Padding Left
         * @see https://tailwindcss.com/docs/padding
         */
        pl: [{
          pl: [padding]
        }],
        /**
         * Margin
         * @see https://tailwindcss.com/docs/margin
         */
        m: [{
          m: [margin]
        }],
        /**
         * Margin X
         * @see https://tailwindcss.com/docs/margin
         */
        mx: [{
          mx: [margin]
        }],
        /**
         * Margin Y
         * @see https://tailwindcss.com/docs/margin
         */
        my: [{
          my: [margin]
        }],
        /**
         * Margin Start
         * @see https://tailwindcss.com/docs/margin
         */
        ms: [{
          ms: [margin]
        }],
        /**
         * Margin End
         * @see https://tailwindcss.com/docs/margin
         */
        me: [{
          me: [margin]
        }],
        /**
         * Margin Top
         * @see https://tailwindcss.com/docs/margin
         */
        mt: [{
          mt: [margin]
        }],
        /**
         * Margin Right
         * @see https://tailwindcss.com/docs/margin
         */
        mr: [{
          mr: [margin]
        }],
        /**
         * Margin Bottom
         * @see https://tailwindcss.com/docs/margin
         */
        mb: [{
          mb: [margin]
        }],
        /**
         * Margin Left
         * @see https://tailwindcss.com/docs/margin
         */
        ml: [{
          ml: [margin]
        }],
        /**
         * Space Between X
         * @see https://tailwindcss.com/docs/space
         */
        "space-x": [{
          "space-x": [space]
        }],
        /**
         * Space Between X Reverse
         * @see https://tailwindcss.com/docs/space
         */
        "space-x-reverse": ["space-x-reverse"],
        /**
         * Space Between Y
         * @see https://tailwindcss.com/docs/space
         */
        "space-y": [{
          "space-y": [space]
        }],
        /**
         * Space Between Y Reverse
         * @see https://tailwindcss.com/docs/space
         */
        "space-y-reverse": ["space-y-reverse"],
        // Sizing
        /**
         * Width
         * @see https://tailwindcss.com/docs/width
         */
        w: [{
          w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
        }],
        /**
         * Min-Width
         * @see https://tailwindcss.com/docs/min-width
         */
        "min-w": [{
          "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
        }],
        /**
         * Max-Width
         * @see https://tailwindcss.com/docs/max-width
         */
        "max-w": [{
          "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
            screen: [isTshirtSize]
          }, isTshirtSize]
        }],
        /**
         * Height
         * @see https://tailwindcss.com/docs/height
         */
        h: [{
          h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
        }],
        /**
         * Min-Height
         * @see https://tailwindcss.com/docs/min-height
         */
        "min-h": [{
          "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
        }],
        /**
         * Max-Height
         * @see https://tailwindcss.com/docs/max-height
         */
        "max-h": [{
          "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
        }],
        /**
         * Size
         * @see https://tailwindcss.com/docs/size
         */
        size: [{
          size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
        }],
        // Typography
        /**
         * Font Size
         * @see https://tailwindcss.com/docs/font-size
         */
        "font-size": [{
          text: ["base", isTshirtSize, isArbitraryLength]
        }],
        /**
         * Font Smoothing
         * @see https://tailwindcss.com/docs/font-smoothing
         */
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        /**
         * Font Style
         * @see https://tailwindcss.com/docs/font-style
         */
        "font-style": ["italic", "not-italic"],
        /**
         * Font Weight
         * @see https://tailwindcss.com/docs/font-weight
         */
        "font-weight": [{
          font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
        }],
        /**
         * Font Family
         * @see https://tailwindcss.com/docs/font-family
         */
        "font-family": [{
          font: [isAny]
        }],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-normal": ["normal-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-ordinal": ["ordinal"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-slashed-zero": ["slashed-zero"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        /**
         * Letter Spacing
         * @see https://tailwindcss.com/docs/letter-spacing
         */
        tracking: [{
          tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
        }],
        /**
         * Line Clamp
         * @see https://tailwindcss.com/docs/line-clamp
         */
        "line-clamp": [{
          "line-clamp": ["none", isNumber, isArbitraryNumber]
        }],
        /**
         * Line Height
         * @see https://tailwindcss.com/docs/line-height
         */
        leading: [{
          leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
        }],
        /**
         * List Style Image
         * @see https://tailwindcss.com/docs/list-style-image
         */
        "list-image": [{
          "list-image": ["none", isArbitraryValue]
        }],
        /**
         * List Style Type
         * @see https://tailwindcss.com/docs/list-style-type
         */
        "list-style-type": [{
          list: ["none", "disc", "decimal", isArbitraryValue]
        }],
        /**
         * List Style Position
         * @see https://tailwindcss.com/docs/list-style-position
         */
        "list-style-position": [{
          list: ["inside", "outside"]
        }],
        /**
         * Placeholder Color
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/placeholder-color
         */
        "placeholder-color": [{
          placeholder: [colors]
        }],
        /**
         * Placeholder Opacity
         * @see https://tailwindcss.com/docs/placeholder-opacity
         */
        "placeholder-opacity": [{
          "placeholder-opacity": [opacity]
        }],
        /**
         * Text Alignment
         * @see https://tailwindcss.com/docs/text-align
         */
        "text-alignment": [{
          text: ["left", "center", "right", "justify", "start", "end"]
        }],
        /**
         * Text Color
         * @see https://tailwindcss.com/docs/text-color
         */
        "text-color": [{
          text: [colors]
        }],
        /**
         * Text Opacity
         * @see https://tailwindcss.com/docs/text-opacity
         */
        "text-opacity": [{
          "text-opacity": [opacity]
        }],
        /**
         * Text Decoration
         * @see https://tailwindcss.com/docs/text-decoration
         */
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        /**
         * Text Decoration Style
         * @see https://tailwindcss.com/docs/text-decoration-style
         */
        "text-decoration-style": [{
          decoration: [...getLineStyles(), "wavy"]
        }],
        /**
         * Text Decoration Thickness
         * @see https://tailwindcss.com/docs/text-decoration-thickness
         */
        "text-decoration-thickness": [{
          decoration: ["auto", "from-font", isLength, isArbitraryLength]
        }],
        /**
         * Text Underline Offset
         * @see https://tailwindcss.com/docs/text-underline-offset
         */
        "underline-offset": [{
          "underline-offset": ["auto", isLength, isArbitraryValue]
        }],
        /**
         * Text Decoration Color
         * @see https://tailwindcss.com/docs/text-decoration-color
         */
        "text-decoration-color": [{
          decoration: [colors]
        }],
        /**
         * Text Transform
         * @see https://tailwindcss.com/docs/text-transform
         */
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        /**
         * Text Overflow
         * @see https://tailwindcss.com/docs/text-overflow
         */
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        /**
         * Text Wrap
         * @see https://tailwindcss.com/docs/text-wrap
         */
        "text-wrap": [{
          text: ["wrap", "nowrap", "balance", "pretty"]
        }],
        /**
         * Text Indent
         * @see https://tailwindcss.com/docs/text-indent
         */
        indent: [{
          indent: getSpacingWithArbitrary()
        }],
        /**
         * Vertical Alignment
         * @see https://tailwindcss.com/docs/vertical-align
         */
        "vertical-align": [{
          align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
        }],
        /**
         * Whitespace
         * @see https://tailwindcss.com/docs/whitespace
         */
        whitespace: [{
          whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
        }],
        /**
         * Word Break
         * @see https://tailwindcss.com/docs/word-break
         */
        break: [{
          break: ["normal", "words", "all", "keep"]
        }],
        /**
         * Hyphens
         * @see https://tailwindcss.com/docs/hyphens
         */
        hyphens: [{
          hyphens: ["none", "manual", "auto"]
        }],
        /**
         * Content
         * @see https://tailwindcss.com/docs/content
         */
        content: [{
          content: ["none", isArbitraryValue]
        }],
        // Backgrounds
        /**
         * Background Attachment
         * @see https://tailwindcss.com/docs/background-attachment
         */
        "bg-attachment": [{
          bg: ["fixed", "local", "scroll"]
        }],
        /**
         * Background Clip
         * @see https://tailwindcss.com/docs/background-clip
         */
        "bg-clip": [{
          "bg-clip": ["border", "padding", "content", "text"]
        }],
        /**
         * Background Opacity
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/background-opacity
         */
        "bg-opacity": [{
          "bg-opacity": [opacity]
        }],
        /**
         * Background Origin
         * @see https://tailwindcss.com/docs/background-origin
         */
        "bg-origin": [{
          "bg-origin": ["border", "padding", "content"]
        }],
        /**
         * Background Position
         * @see https://tailwindcss.com/docs/background-position
         */
        "bg-position": [{
          bg: [...getPositions(), isArbitraryPosition]
        }],
        /**
         * Background Repeat
         * @see https://tailwindcss.com/docs/background-repeat
         */
        "bg-repeat": [{
          bg: ["no-repeat", {
            repeat: ["", "x", "y", "round", "space"]
          }]
        }],
        /**
         * Background Size
         * @see https://tailwindcss.com/docs/background-size
         */
        "bg-size": [{
          bg: ["auto", "cover", "contain", isArbitrarySize]
        }],
        /**
         * Background Image
         * @see https://tailwindcss.com/docs/background-image
         */
        "bg-image": [{
          bg: ["none", {
            "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isArbitraryImage]
        }],
        /**
         * Background Color
         * @see https://tailwindcss.com/docs/background-color
         */
        "bg-color": [{
          bg: [colors]
        }],
        /**
         * Gradient Color Stops From Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-from-pos": [{
          from: [gradientColorStopPositions]
        }],
        /**
         * Gradient Color Stops Via Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-via-pos": [{
          via: [gradientColorStopPositions]
        }],
        /**
         * Gradient Color Stops To Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-to-pos": [{
          to: [gradientColorStopPositions]
        }],
        /**
         * Gradient Color Stops From
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-from": [{
          from: [gradientColorStops]
        }],
        /**
         * Gradient Color Stops Via
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-via": [{
          via: [gradientColorStops]
        }],
        /**
         * Gradient Color Stops To
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-to": [{
          to: [gradientColorStops]
        }],
        // Borders
        /**
         * Border Radius
         * @see https://tailwindcss.com/docs/border-radius
         */
        rounded: [{
          rounded: [borderRadius]
        }],
        /**
         * Border Radius Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-s": [{
          "rounded-s": [borderRadius]
        }],
        /**
         * Border Radius End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-e": [{
          "rounded-e": [borderRadius]
        }],
        /**
         * Border Radius Top
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-t": [{
          "rounded-t": [borderRadius]
        }],
        /**
         * Border Radius Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-r": [{
          "rounded-r": [borderRadius]
        }],
        /**
         * Border Radius Bottom
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-b": [{
          "rounded-b": [borderRadius]
        }],
        /**
         * Border Radius Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-l": [{
          "rounded-l": [borderRadius]
        }],
        /**
         * Border Radius Start Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-ss": [{
          "rounded-ss": [borderRadius]
        }],
        /**
         * Border Radius Start End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-se": [{
          "rounded-se": [borderRadius]
        }],
        /**
         * Border Radius End End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-ee": [{
          "rounded-ee": [borderRadius]
        }],
        /**
         * Border Radius End Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-es": [{
          "rounded-es": [borderRadius]
        }],
        /**
         * Border Radius Top Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-tl": [{
          "rounded-tl": [borderRadius]
        }],
        /**
         * Border Radius Top Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-tr": [{
          "rounded-tr": [borderRadius]
        }],
        /**
         * Border Radius Bottom Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-br": [{
          "rounded-br": [borderRadius]
        }],
        /**
         * Border Radius Bottom Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-bl": [{
          "rounded-bl": [borderRadius]
        }],
        /**
         * Border Width
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w": [{
          border: [borderWidth]
        }],
        /**
         * Border Width X
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-x": [{
          "border-x": [borderWidth]
        }],
        /**
         * Border Width Y
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-y": [{
          "border-y": [borderWidth]
        }],
        /**
         * Border Width Start
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-s": [{
          "border-s": [borderWidth]
        }],
        /**
         * Border Width End
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-e": [{
          "border-e": [borderWidth]
        }],
        /**
         * Border Width Top
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-t": [{
          "border-t": [borderWidth]
        }],
        /**
         * Border Width Right
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-r": [{
          "border-r": [borderWidth]
        }],
        /**
         * Border Width Bottom
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-b": [{
          "border-b": [borderWidth]
        }],
        /**
         * Border Width Left
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-l": [{
          "border-l": [borderWidth]
        }],
        /**
         * Border Opacity
         * @see https://tailwindcss.com/docs/border-opacity
         */
        "border-opacity": [{
          "border-opacity": [opacity]
        }],
        /**
         * Border Style
         * @see https://tailwindcss.com/docs/border-style
         */
        "border-style": [{
          border: [...getLineStyles(), "hidden"]
        }],
        /**
         * Divide Width X
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-x": [{
          "divide-x": [borderWidth]
        }],
        /**
         * Divide Width X Reverse
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-x-reverse": ["divide-x-reverse"],
        /**
         * Divide Width Y
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-y": [{
          "divide-y": [borderWidth]
        }],
        /**
         * Divide Width Y Reverse
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-y-reverse": ["divide-y-reverse"],
        /**
         * Divide Opacity
         * @see https://tailwindcss.com/docs/divide-opacity
         */
        "divide-opacity": [{
          "divide-opacity": [opacity]
        }],
        /**
         * Divide Style
         * @see https://tailwindcss.com/docs/divide-style
         */
        "divide-style": [{
          divide: getLineStyles()
        }],
        /**
         * Border Color
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color": [{
          border: [borderColor]
        }],
        /**
         * Border Color X
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-x": [{
          "border-x": [borderColor]
        }],
        /**
         * Border Color Y
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-y": [{
          "border-y": [borderColor]
        }],
        /**
         * Border Color S
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-s": [{
          "border-s": [borderColor]
        }],
        /**
         * Border Color E
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-e": [{
          "border-e": [borderColor]
        }],
        /**
         * Border Color Top
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-t": [{
          "border-t": [borderColor]
        }],
        /**
         * Border Color Right
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-r": [{
          "border-r": [borderColor]
        }],
        /**
         * Border Color Bottom
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-b": [{
          "border-b": [borderColor]
        }],
        /**
         * Border Color Left
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-l": [{
          "border-l": [borderColor]
        }],
        /**
         * Divide Color
         * @see https://tailwindcss.com/docs/divide-color
         */
        "divide-color": [{
          divide: [borderColor]
        }],
        /**
         * Outline Style
         * @see https://tailwindcss.com/docs/outline-style
         */
        "outline-style": [{
          outline: ["", ...getLineStyles()]
        }],
        /**
         * Outline Offset
         * @see https://tailwindcss.com/docs/outline-offset
         */
        "outline-offset": [{
          "outline-offset": [isLength, isArbitraryValue]
        }],
        /**
         * Outline Width
         * @see https://tailwindcss.com/docs/outline-width
         */
        "outline-w": [{
          outline: [isLength, isArbitraryLength]
        }],
        /**
         * Outline Color
         * @see https://tailwindcss.com/docs/outline-color
         */
        "outline-color": [{
          outline: [colors]
        }],
        /**
         * Ring Width
         * @see https://tailwindcss.com/docs/ring-width
         */
        "ring-w": [{
          ring: getLengthWithEmptyAndArbitrary()
        }],
        /**
         * Ring Width Inset
         * @see https://tailwindcss.com/docs/ring-width
         */
        "ring-w-inset": ["ring-inset"],
        /**
         * Ring Color
         * @see https://tailwindcss.com/docs/ring-color
         */
        "ring-color": [{
          ring: [colors]
        }],
        /**
         * Ring Opacity
         * @see https://tailwindcss.com/docs/ring-opacity
         */
        "ring-opacity": [{
          "ring-opacity": [opacity]
        }],
        /**
         * Ring Offset Width
         * @see https://tailwindcss.com/docs/ring-offset-width
         */
        "ring-offset-w": [{
          "ring-offset": [isLength, isArbitraryLength]
        }],
        /**
         * Ring Offset Color
         * @see https://tailwindcss.com/docs/ring-offset-color
         */
        "ring-offset-color": [{
          "ring-offset": [colors]
        }],
        // Effects
        /**
         * Box Shadow
         * @see https://tailwindcss.com/docs/box-shadow
         */
        shadow: [{
          shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
        }],
        /**
         * Box Shadow Color
         * @see https://tailwindcss.com/docs/box-shadow-color
         */
        "shadow-color": [{
          shadow: [isAny]
        }],
        /**
         * Opacity
         * @see https://tailwindcss.com/docs/opacity
         */
        opacity: [{
          opacity: [opacity]
        }],
        /**
         * Mix Blend Mode
         * @see https://tailwindcss.com/docs/mix-blend-mode
         */
        "mix-blend": [{
          "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
        }],
        /**
         * Background Blend Mode
         * @see https://tailwindcss.com/docs/background-blend-mode
         */
        "bg-blend": [{
          "bg-blend": getBlendModes()
        }],
        // Filters
        /**
         * Filter
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/filter
         */
        filter: [{
          filter: ["", "none"]
        }],
        /**
         * Blur
         * @see https://tailwindcss.com/docs/blur
         */
        blur: [{
          blur: [blur]
        }],
        /**
         * Brightness
         * @see https://tailwindcss.com/docs/brightness
         */
        brightness: [{
          brightness: [brightness]
        }],
        /**
         * Contrast
         * @see https://tailwindcss.com/docs/contrast
         */
        contrast: [{
          contrast: [contrast]
        }],
        /**
         * Drop Shadow
         * @see https://tailwindcss.com/docs/drop-shadow
         */
        "drop-shadow": [{
          "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
        }],
        /**
         * Grayscale
         * @see https://tailwindcss.com/docs/grayscale
         */
        grayscale: [{
          grayscale: [grayscale]
        }],
        /**
         * Hue Rotate
         * @see https://tailwindcss.com/docs/hue-rotate
         */
        "hue-rotate": [{
          "hue-rotate": [hueRotate]
        }],
        /**
         * Invert
         * @see https://tailwindcss.com/docs/invert
         */
        invert: [{
          invert: [invert]
        }],
        /**
         * Saturate
         * @see https://tailwindcss.com/docs/saturate
         */
        saturate: [{
          saturate: [saturate]
        }],
        /**
         * Sepia
         * @see https://tailwindcss.com/docs/sepia
         */
        sepia: [{
          sepia: [sepia]
        }],
        /**
         * Backdrop Filter
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/backdrop-filter
         */
        "backdrop-filter": [{
          "backdrop-filter": ["", "none"]
        }],
        /**
         * Backdrop Blur
         * @see https://tailwindcss.com/docs/backdrop-blur
         */
        "backdrop-blur": [{
          "backdrop-blur": [blur]
        }],
        /**
         * Backdrop Brightness
         * @see https://tailwindcss.com/docs/backdrop-brightness
         */
        "backdrop-brightness": [{
          "backdrop-brightness": [brightness]
        }],
        /**
         * Backdrop Contrast
         * @see https://tailwindcss.com/docs/backdrop-contrast
         */
        "backdrop-contrast": [{
          "backdrop-contrast": [contrast]
        }],
        /**
         * Backdrop Grayscale
         * @see https://tailwindcss.com/docs/backdrop-grayscale
         */
        "backdrop-grayscale": [{
          "backdrop-grayscale": [grayscale]
        }],
        /**
         * Backdrop Hue Rotate
         * @see https://tailwindcss.com/docs/backdrop-hue-rotate
         */
        "backdrop-hue-rotate": [{
          "backdrop-hue-rotate": [hueRotate]
        }],
        /**
         * Backdrop Invert
         * @see https://tailwindcss.com/docs/backdrop-invert
         */
        "backdrop-invert": [{
          "backdrop-invert": [invert]
        }],
        /**
         * Backdrop Opacity
         * @see https://tailwindcss.com/docs/backdrop-opacity
         */
        "backdrop-opacity": [{
          "backdrop-opacity": [opacity]
        }],
        /**
         * Backdrop Saturate
         * @see https://tailwindcss.com/docs/backdrop-saturate
         */
        "backdrop-saturate": [{
          "backdrop-saturate": [saturate]
        }],
        /**
         * Backdrop Sepia
         * @see https://tailwindcss.com/docs/backdrop-sepia
         */
        "backdrop-sepia": [{
          "backdrop-sepia": [sepia]
        }],
        // Tables
        /**
         * Border Collapse
         * @see https://tailwindcss.com/docs/border-collapse
         */
        "border-collapse": [{
          border: ["collapse", "separate"]
        }],
        /**
         * Border Spacing
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing": [{
          "border-spacing": [borderSpacing]
        }],
        /**
         * Border Spacing X
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing-x": [{
          "border-spacing-x": [borderSpacing]
        }],
        /**
         * Border Spacing Y
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing-y": [{
          "border-spacing-y": [borderSpacing]
        }],
        /**
         * Table Layout
         * @see https://tailwindcss.com/docs/table-layout
         */
        "table-layout": [{
          table: ["auto", "fixed"]
        }],
        /**
         * Caption Side
         * @see https://tailwindcss.com/docs/caption-side
         */
        caption: [{
          caption: ["top", "bottom"]
        }],
        // Transitions and Animation
        /**
         * Tranisition Property
         * @see https://tailwindcss.com/docs/transition-property
         */
        transition: [{
          transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
        }],
        /**
         * Transition Duration
         * @see https://tailwindcss.com/docs/transition-duration
         */
        duration: [{
          duration: getNumberAndArbitrary()
        }],
        /**
         * Transition Timing Function
         * @see https://tailwindcss.com/docs/transition-timing-function
         */
        ease: [{
          ease: ["linear", "in", "out", "in-out", isArbitraryValue]
        }],
        /**
         * Transition Delay
         * @see https://tailwindcss.com/docs/transition-delay
         */
        delay: [{
          delay: getNumberAndArbitrary()
        }],
        /**
         * Animation
         * @see https://tailwindcss.com/docs/animation
         */
        animate: [{
          animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
        }],
        // Transforms
        /**
         * Transform
         * @see https://tailwindcss.com/docs/transform
         */
        transform: [{
          transform: ["", "gpu", "none"]
        }],
        /**
         * Scale
         * @see https://tailwindcss.com/docs/scale
         */
        scale: [{
          scale: [scale]
        }],
        /**
         * Scale X
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-x": [{
          "scale-x": [scale]
        }],
        /**
         * Scale Y
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-y": [{
          "scale-y": [scale]
        }],
        /**
         * Rotate
         * @see https://tailwindcss.com/docs/rotate
         */
        rotate: [{
          rotate: [isInteger, isArbitraryValue]
        }],
        /**
         * Translate X
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-x": [{
          "translate-x": [translate2]
        }],
        /**
         * Translate Y
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-y": [{
          "translate-y": [translate2]
        }],
        /**
         * Skew X
         * @see https://tailwindcss.com/docs/skew
         */
        "skew-x": [{
          "skew-x": [skew]
        }],
        /**
         * Skew Y
         * @see https://tailwindcss.com/docs/skew
         */
        "skew-y": [{
          "skew-y": [skew]
        }],
        /**
         * Transform Origin
         * @see https://tailwindcss.com/docs/transform-origin
         */
        "transform-origin": [{
          origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
        }],
        // Interactivity
        /**
         * Accent Color
         * @see https://tailwindcss.com/docs/accent-color
         */
        accent: [{
          accent: ["auto", colors]
        }],
        /**
         * Appearance
         * @see https://tailwindcss.com/docs/appearance
         */
        appearance: [{
          appearance: ["none", "auto"]
        }],
        /**
         * Cursor
         * @see https://tailwindcss.com/docs/cursor
         */
        cursor: [{
          cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
        }],
        /**
         * Caret Color
         * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
         */
        "caret-color": [{
          caret: [colors]
        }],
        /**
         * Pointer Events
         * @see https://tailwindcss.com/docs/pointer-events
         */
        "pointer-events": [{
          "pointer-events": ["none", "auto"]
        }],
        /**
         * Resize
         * @see https://tailwindcss.com/docs/resize
         */
        resize: [{
          resize: ["none", "y", "x", ""]
        }],
        /**
         * Scroll Behavior
         * @see https://tailwindcss.com/docs/scroll-behavior
         */
        "scroll-behavior": [{
          scroll: ["auto", "smooth"]
        }],
        /**
         * Scroll Margin
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-m": [{
          "scroll-m": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin X
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mx": [{
          "scroll-mx": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Y
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-my": [{
          "scroll-my": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Start
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-ms": [{
          "scroll-ms": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin End
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-me": [{
          "scroll-me": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Top
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mt": [{
          "scroll-mt": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Right
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mr": [{
          "scroll-mr": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Bottom
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mb": [{
          "scroll-mb": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Left
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-ml": [{
          "scroll-ml": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-p": [{
          "scroll-p": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding X
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-px": [{
          "scroll-px": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Y
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-py": [{
          "scroll-py": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Start
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-ps": [{
          "scroll-ps": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding End
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pe": [{
          "scroll-pe": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Top
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pt": [{
          "scroll-pt": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Right
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pr": [{
          "scroll-pr": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Bottom
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pb": [{
          "scroll-pb": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Left
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pl": [{
          "scroll-pl": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Snap Align
         * @see https://tailwindcss.com/docs/scroll-snap-align
         */
        "snap-align": [{
          snap: ["start", "end", "center", "align-none"]
        }],
        /**
         * Scroll Snap Stop
         * @see https://tailwindcss.com/docs/scroll-snap-stop
         */
        "snap-stop": [{
          snap: ["normal", "always"]
        }],
        /**
         * Scroll Snap Type
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        "snap-type": [{
          snap: ["none", "x", "y", "both"]
        }],
        /**
         * Scroll Snap Type Strictness
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        "snap-strictness": [{
          snap: ["mandatory", "proximity"]
        }],
        /**
         * Touch Action
         * @see https://tailwindcss.com/docs/touch-action
         */
        touch: [{
          touch: ["auto", "none", "manipulation"]
        }],
        /**
         * Touch Action X
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-x": [{
          "touch-pan": ["x", "left", "right"]
        }],
        /**
         * Touch Action Y
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-y": [{
          "touch-pan": ["y", "up", "down"]
        }],
        /**
         * Touch Action Pinch Zoom
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-pz": ["touch-pinch-zoom"],
        /**
         * User Select
         * @see https://tailwindcss.com/docs/user-select
         */
        select: [{
          select: ["none", "text", "all", "auto"]
        }],
        /**
         * Will Change
         * @see https://tailwindcss.com/docs/will-change
         */
        "will-change": [{
          "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
        }],
        // SVG
        /**
         * Fill
         * @see https://tailwindcss.com/docs/fill
         */
        fill: [{
          fill: [colors, "none"]
        }],
        /**
         * Stroke Width
         * @see https://tailwindcss.com/docs/stroke-width
         */
        "stroke-w": [{
          stroke: [isLength, isArbitraryLength, isArbitraryNumber]
        }],
        /**
         * Stroke
         * @see https://tailwindcss.com/docs/stroke
         */
        stroke: [{
          stroke: [colors, "none"]
        }],
        // Accessibility
        /**
         * Screen Readers
         * @see https://tailwindcss.com/docs/screen-readers
         */
        sr: ["sr-only", "not-sr-only"],
        /**
         * Forced Color Adjust
         * @see https://tailwindcss.com/docs/forced-color-adjust
         */
        "forced-color-adjust": [{
          "forced-color-adjust": ["auto", "none"]
        }]
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"]
      },
      conflictingClassGroupModifiers: {
        "font-size": ["leading"]
      }
    };
  };
  var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

  // src/lib/utils.ts
  function cn(...inputs) {
    return twMerge(clsx(inputs));
  }
  function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }
  function replaceDateVariable(text) {
    return text.replace(/\{\{date\}\}/gi, formatDate(/* @__PURE__ */ new Date()));
  }
  function extractVariables(text) {
    const matches = text.match(/\{\{([^}]+)\}\}/g) || [];
    return matches.map((m) => m.slice(2, -2).trim()).filter((v) => v.toLowerCase() !== "date");
  }

  // src/components/ui/button.tsx
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
          outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
          accent: "bg-amber-500 text-white shadow hover:bg-amber-600"
        },
        size: {
          default: "h-8 px-3 py-1.5",
          sm: "h-7 rounded-lg px-2.5 text-xs",
          lg: "h-9 rounded-lg px-4",
          icon: "h-8 w-8"
        }
      },
      defaultVariants: {
        variant: "default",
        size: "default"
      }
    }
  );
  var Button = React3.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : "button";
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Comp,
        {
          className: cn(buttonVariants({ variant, size, className })),
          ref,
          ...props
        }
      );
    }
  );
  Button.displayName = "Button";

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var import_react2 = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/shared/src/utils.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");

  // node_modules/lucide-react/dist/esm/Icon.js
  var import_react = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var Icon = (0, import_react.forwardRef)(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    }, ref) => {
      return (0, import_react.createElement)(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
          className: mergeClasses("lucide", className),
          ...rest
        },
        [
          ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react2.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
        ...props
      })
    );
    Component.displayName = `${iconName}`;
    return Component;
  };

  // node_modules/lucide-react/dist/esm/icons/alarm-clock.js
  var AlarmClock = createLucideIcon("AlarmClock", [
    ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
    ["path", { d: "M12 9v4l2 2", key: "1c63tq" }],
    ["path", { d: "M5 3 2 6", key: "18tl5t" }],
    ["path", { d: "m22 6-3-3", key: "1opdir" }],
    ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
    ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/at-sign.js
  var AtSign = createLucideIcon("AtSign", [
    ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
    ["path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8", key: "7n84p3" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/book-open.js
  var BookOpen = createLucideIcon("BookOpen", [
    ["path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", key: "vv98re" }],
    ["path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", key: "1cyq3y" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/braces.js
  var Braces = createLucideIcon("Braces", [
    [
      "path",
      { d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1", key: "ezmyqa" }
    ],
    [
      "path",
      {
        d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
        key: "e1hn23"
      }
    ]
  ]);

  // node_modules/lucide-react/dist/esm/icons/calendar-clock.js
  var CalendarClock = createLucideIcon("CalendarClock", [
    ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M3 10h5", key: "r794hk" }],
    ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
    ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/check.js
  var Check = createLucideIcon("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);

  // node_modules/lucide-react/dist/esm/icons/chevron-down.js
  var ChevronDown = createLucideIcon("ChevronDown", [
    ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/circle-check.js
  var CircleCheck = createLucideIcon("CircleCheck", [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/circle.js
  var Circle = createLucideIcon("Circle", [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/clipboard-list.js
  var ClipboardList = createLucideIcon("ClipboardList", [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
    [
      "path",
      {
        d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
        key: "116196"
      }
    ],
    ["path", { d: "M12 11h4", key: "1jrz19" }],
    ["path", { d: "M12 16h4", key: "n85exb" }],
    ["path", { d: "M8 11h.01", key: "1dfujw" }],
    ["path", { d: "M8 16h.01", key: "18s6g9" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/copy.js
  var Copy = createLucideIcon("Copy", [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/database.js
  var Database = createLucideIcon("Database", [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
    ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
    ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/download.js
  var Download = createLucideIcon("Download", [
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
    ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/eraser.js
  var Eraser = createLucideIcon("Eraser", [
    [
      "path",
      {
        d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21",
        key: "182aya"
      }
    ],
    ["path", { d: "M22 21H7", key: "t4ddhn" }],
    ["path", { d: "m5 11 9 9", key: "1mo9qw" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/file-text.js
  var FileText = createLucideIcon("FileText", [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/flag.js
  var Flag = createLucideIcon("Flag", [
    ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
    ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/info.js
  var Info = createLucideIcon("Info", [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/languages.js
  var Languages = createLucideIcon("Languages", [
    ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
    ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
    ["path", { d: "M2 5h12", key: "or177f" }],
    ["path", { d: "M7 2h1", key: "1t2jsx" }],
    ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
    ["path", { d: "M14 18h6", key: "1m8k6r" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/layout-grid.js
  var LayoutGrid = createLucideIcon("LayoutGrid", [
    ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
    ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
    ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
    ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/list-todo.js
  var ListTodo = createLucideIcon("ListTodo", [
    ["rect", { x: "3", y: "5", width: "6", height: "6", rx: "1", key: "1defrl" }],
    ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
    ["path", { d: "M13 6h8", key: "15sg57" }],
    ["path", { d: "M13 12h8", key: "h98zly" }],
    ["path", { d: "M13 18h8", key: "oe0vm4" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/moon.js
  var Moon = createLucideIcon("Moon", [
    ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/palette.js
  var Palette = createLucideIcon("Palette", [
    ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
    ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
    ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
    ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
    [
      "path",
      {
        d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
        key: "12rzf8"
      }
    ]
  ]);

  // node_modules/lucide-react/dist/esm/icons/panel-top-open.js
  var PanelTopOpen = createLucideIcon("PanelTopOpen", [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M3 9h18", key: "1pudct" }],
    ["path", { d: "m15 14-3 3-3-3", key: "g215vf" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/pencil.js
  var Pencil = createLucideIcon("Pencil", [
    ["path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z", key: "5qss01" }],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/plus.js
  var Plus = createLucideIcon("Plus", [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/rotate-ccw.js
  var RotateCcw = createLucideIcon("RotateCcw", [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/save.js
  var Save = createLucideIcon("Save", [
    [
      "path",
      {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
        key: "1c8476"
      }
    ],
    ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
    ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/search.js
  var Search = createLucideIcon("Search", [
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
    ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/send.js
  var Send = createLucideIcon("Send", [
    ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
    ["path", { d: "M22 2 11 13", key: "nzbqef" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/star.js
  var Star = createLucideIcon("Star", [
    [
      "polygon",
      {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
        key: "8f66p6"
      }
    ]
  ]);

  // node_modules/lucide-react/dist/esm/icons/tags.js
  var Tags = createLucideIcon("Tags", [
    ["path", { d: "m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19", key: "1cbfv1" }],
    [
      "path",
      {
        d: "M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z",
        key: "135mg7"
      }
    ],
    ["circle", { cx: "6.5", cy: "9.5", r: ".5", fill: "currentColor", key: "5pm5xn" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/trash-2.js
  var Trash2 = createLucideIcon("Trash2", [
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
    ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/upload.js
  var Upload = createLucideIcon("Upload", [
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
    ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/wand-sparkles.js
  var WandSparkles = createLucideIcon("WandSparkles", [
    [
      "path",
      {
        d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
        key: "ul74o6"
      }
    ],
    ["path", { d: "m14 7 3 3", key: "1r5n42" }],
    ["path", { d: "M5 6v4", key: "ilb8ba" }],
    ["path", { d: "M19 14v4", key: "blhpug" }],
    ["path", { d: "M10 2v2", key: "7u0qdc" }],
    ["path", { d: "M7 8H3", key: "zfb6yr" }],
    ["path", { d: "M21 16h-4", key: "1cnmox" }],
    ["path", { d: "M11 3H9", key: "1obp7u" }]
  ]);

  // node_modules/lucide-react/dist/esm/icons/x.js
  var X = createLucideIcon("X", [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]);

  // src/lib/i18n.ts
  var LANGUAGE_OPTIONS = [
    { value: "ru", label: "RU" },
    { value: "en", label: "EN" }
  ];
  var ru = {
    appName: "BlobNote",
    baseSubtitle: "\u0411\u0430\u0437\u0430 \u0437\u0430\u043C\u0435\u0442\u043E\u043A",
    answersSubtitle: "\u0411\u0430\u0437\u0430 \u043E\u0442\u0432\u0435\u0442\u043E\u0432",
    darkTheme: "\u0422\u0451\u043C\u043D\u0430\u044F",
    atSearch: "\u043F\u043E\u0438\u0441\u043A",
    panel: "\u041F\u0430\u043D\u0435\u043B\u044C",
    clipboard: "\u0411\u0443\u0444\u0435\u0440",
    variables: "\u041F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435",
    tasks: "\u0417\u0430\u0434\u0430\u0447\u0438",
    notesAndTemplates: "\u0417\u0430\u043C\u0435\u0442\u043A\u0438 \u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u044B",
    base: "\u0411\u0430\u0437\u0430",
    settings: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    help: "\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F",
    appearance: "\u0412\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434",
    behavior: "\u041F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435",
    dataManagement: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u043C\u0438",
    language: "\u042F\u0437\u044B\u043A",
    trigger: "\u0421\u0438\u043C\u0432\u043E\u043B \u043F\u043E\u0438\u0441\u043A\u0430",
    openBaseCurrent: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0431\u0430\u0437\u0443 \u043D\u0430 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435",
    openBaseTab: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u043E\u0439",
    quickInsertHint: "\u0414\u043B\u044F \u0431\u044B\u0441\u0442\u0440\u043E\u0439 \u0432\u0441\u0442\u0430\u0432\u043A\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043F\u043B\u0430\u0432\u0430\u044E\u0449\u0443\u044E \u043F\u0430\u043D\u0435\u043B\u044C \u0443 \u043F\u043E\u043B\u044F, {{trigger}}-\u043F\u043E\u0438\u0441\u043A \u0438\u043B\u0438 Ctrl+Space. \u0411\u0430\u0437\u0430 \u043F\u043E\u0432\u0435\u0440\u0445 \u0441\u0430\u0439\u0442\u0430 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0447\u0435\u0440\u0435\u0437 Ctrl+Shift+Space.",
    allowlistOnly: "\u0420\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0441\u0430\u0439\u0442\u0430\u0445",
    enableForSite: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u0441\u0430\u0439\u0442\u0430",
    disableForSite: "\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u0441\u0430\u0439\u0442\u0430",
    atSearchInInput: "{{trigger}}-\u043F\u043E\u0438\u0441\u043A \u0432 \u043F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430",
    floatingPanelNearField: "\u041F\u043B\u0430\u0432\u0430\u044E\u0449\u0430\u044F \u043F\u0430\u043D\u0435\u043B\u044C \u0443 \u043F\u043E\u043B\u044F",
    clipboardInPanel: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 \u0431\u0443\u0444\u0435\u0440\u0430 \u043E\u0431\u043C\u0435\u043D\u0430 \u0432 \u043F\u0430\u043D\u0435\u043B\u0438",
    variablesTab: "\u0412\u043A\u043B\u0430\u0434\u043A\u0430 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445",
    tasksTab: "\u0412\u043A\u043B\u0430\u0434\u043A\u0430 \u0437\u0430\u0434\u0430\u0447",
    export: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442",
    import: "\u0418\u043C\u043F\u043E\u0440\u0442",
    triggerMenuTitle: "{{trigger}}-\u043C\u0435\u043D\u044E",
    triggerMenuHelp: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 {{trigger}} \u0432 \u043F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430 \u0438 \u043D\u0430\u0447\u043D\u0438\u0442\u0435 \u043F\u0435\u0447\u0430\u0442\u0430\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438.",
    floatingPanel: "\u041F\u043B\u0430\u0432\u0430\u044E\u0449\u0430\u044F \u043F\u0430\u043D\u0435\u043B\u044C",
    floatingPanelHelp: "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u0431\u0443\u0444\u0435\u0440\u0430 \u043F\u043E\u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0440\u044F\u0434\u043E\u043C \u0441 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u043C \u043F\u043E\u043B\u0435\u043C. \u041A\u043D\u043E\u043F\u043A\u0430 \u201C\u0411\u0430\u0437\u0430\u201D \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u043F\u043E\u043B\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043F\u043E\u0432\u0435\u0440\u0445 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B.",
    variablesHelp: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 {{example}}. \u0417\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043C\u043E\u0436\u043D\u043E \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0432\u043E \u0432\u043A\u043B\u0430\u0434\u043A\u0435 \u201C\u041F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435\u201D \u0432 \u0431\u0430\u0437\u0435.",
    onboardingTitle: "\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u0441\u0442\u0430\u0440\u0442",
    onboardingSubtitle: "\u0422\u0440\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F, \u0447\u0442\u043E\u0431\u044B BlobNote \u0441\u0440\u0430\u0437\u0443 \u043D\u0430\u0447\u0430\u043B \u043F\u043E\u043C\u043E\u0433\u0430\u0442\u044C \u0432 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0435.",
    onboardingStepBase: "1. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0430\u0437\u0443 \u0438 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0441\u0432\u043E\u0438 \u0447\u0430\u0441\u0442\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B.",
    onboardingStepSearch: "2. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 {{trigger}} \u0432 \u043F\u043E\u043B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0439\u0442\u0438 \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u0431\u0435\u0437 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432\u043A\u043B\u0430\u0434\u043E\u043A.",
    onboardingStepPanel: "3. \u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043F\u043B\u0430\u0432\u0430\u044E\u0449\u0443\u044E \u043F\u0430\u043D\u0435\u043B\u044C \u0434\u043B\u044F \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u0437 \u0431\u0443\u0444\u0435\u0440\u0430 \u043E\u0431\u043C\u0435\u043D\u0430.",
    gotIt: "\u041F\u043E\u043D\u044F\u0442\u043D\u043E",
    templatesExported: "\u0417\u0430\u043C\u0435\u0442\u043A\u0438 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u044B",
    templatesImported: "\u0417\u0430\u043C\u0435\u0442\u043A\u0438 \u0438\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u044B",
    jsonParseError: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0430\u0440\u0441\u0438\u043D\u0433\u0430 JSON",
    loadFailed: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",
    openBaseFailed: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0431\u0430\u0437\u0443 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435: ",
    refreshTab: "\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443",
    gridCols2: "2 \u043A\u043E\u043B\u043E\u043D\u043A\u0438",
    gridCols3: "3 \u043A\u043E\u043B\u043E\u043D\u043A\u0438",
    gridCols4: "4 \u043A\u043E\u043B\u043E\u043D\u043A\u0438",
    gridCols5: "5 \u043A\u043E\u043B\u043E\u043D\u043E\u043A",
    cardHeight: "\u0412\u044B\u0441\u043E\u0442\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
    columnsCount: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u043E\u043B\u043E\u043D\u043E\u043A",
    auto: "\u0410\u0432\u0442\u043E",
    cardPresets: "\u0413\u043E\u0442\u043E\u0432\u044B\u0435 \u043F\u0440\u0435\u0441\u0435\u0442\u044B \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
    resetCards: "\u0421\u0431\u0440\u043E\u0441",
    searchNotesPlaceholder: "\u041F\u043E\u0438\u0441\u043A \u0437\u0430\u043C\u0435\u0442\u043E\u043A \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E, \u0442\u0435\u0433\u0443 \u0438\u043B\u0438 \u0442\u0435\u043A\u0441\u0442\u0443...",
    favorites: "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435",
    createNote: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443",
    clearAllTags: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u0441\u0435 \u0442\u0435\u0433\u0438",
    tags: "\u0422\u0435\u0433\u0438",
    clearTagFilter: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440",
    emptyBase: "\u0411\u0430\u0437\u0430 \u0437\u0430\u043C\u0435\u0442\u043E\u043A \u043F\u0443\u0441\u0442\u0430. \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0432\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443.",
    nothingFoundCriteria: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u0434\u0430\u043D\u043D\u044B\u043C \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u044F\u043C.",
    addStarterNotes: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0431\u0430\u0437\u043E\u0432\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",
    editNote: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",
    newNote: "\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430",
    editorNoShift: "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u043D\u0435 \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 \u043C\u0435\u0441\u0442\u043E \u0432 \u0431\u0430\u0437\u0435 \u0438 \u043D\u0435 \u0441\u0434\u0432\u0438\u0433\u0430\u0435\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438.",
    noteUpdated: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430",
    noteCreated: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0430",
    starterAdded: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B \u0431\u0430\u0437\u043E\u0432\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",
    noteDeleted: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0430",
    textCopied: "\u0422\u0435\u043A\u0441\u0442 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D",
    deleteNoteQuestion: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C "{{title}}"?',
    presetLagoon: "\u041B\u0430\u0433\u0443\u043D\u0430",
    presetOrchid: "\u041E\u0440\u0445\u0438\u0434\u0435\u044F",
    presetGraphite: "\u0413\u0440\u0430\u0444\u0438\u0442",
    selectedNoteHint: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u0434\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438\u043B\u0438 \u0441\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043D\u043E\u0432\u0443\u044E",
    fillNoteFields: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0442\u0435\u043A\u0441\u0442 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",
    noteTitlePlaceholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438...",
    tagPlaceholder: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F / \u0422\u0435\u0433...",
    noteTextPlaceholder: "\u0422\u0435\u043A\u0441\u0442 \u0437\u0430\u043C\u0435\u0442\u043A\u0438...",
    charsShort: "\u0441\u0438\u043C\u0432.",
    create: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C",
    save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
    cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
    insertVariable: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u0443\u044E",
    previewHint: "\u041C\u043E\u0436\u043D\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0437\u0434\u0435\u0441\u044C, \u0437\u0430\u043C\u0435\u0442\u043A\u0430 \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0441\u044F",
    copy: "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
    insert: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C",
    insertAndSend: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C",
    inputNotFound: "\u041F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E. \u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0432 \u043F\u043E\u043B\u0435 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435.",
    quickReplies: "\u0411\u044B\u0441\u0442\u0440\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B",
    clear: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C",
    noFavorites: "\u041D\u0435\u0442 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0437\u0430\u043C\u0435\u0442\u043E\u043A",
    clipboardHistory: "\u0411\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430",
    clipboardEmpty: "\u0411\u0443\u0444\u0435\u0440 \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442",
    smartSearchTitle: "\u0423\u043C\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A \u0437\u0430\u043C\u0435\u0442\u043E\u043A",
    smartSearchPlaceholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435, \u0442\u0435\u0433 \u0438\u043B\u0438 \u0442\u0435\u043A\u0441\u0442...",
    nothingFound: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
    navigation: "\u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F",
    insertVerb: "\u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044C",
    insertAndSendVerb: "\u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C",
    todoTitle: "\u0417\u0430\u0434\u0430\u0447\u0438 \u043F\u043E \u0431\u0430\u0437\u0435 \u0437\u0430\u043C\u0435\u0442\u043E\u043A",
    todoDescription: "\u041C\u0438\u043D\u0438-\u043F\u043B\u0430\u043D\u0435\u0440 \u0434\u043B\u044F \u0437\u0430\u043C\u0435\u0442\u043E\u043A: \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u044B, \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F \u0438 \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u044B \u0440\u044F\u0434\u043E\u043C \u0441 \u0431\u0430\u0437\u043E\u0439.",
    clearDone: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0433\u043E\u0442\u043E\u0432\u044B\u0435",
    todoPlaceholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043F\u0440\u043E \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443",
    deadline: "\u0414\u0435\u0434\u043B\u0430\u0439\u043D",
    remind: "\u041D\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C",
    low: "\u041D\u0438\u0437\u043A\u0438\u0439",
    normal: "\u041E\u0431\u044B\u0447\u043D\u044B\u0439",
    high: "\u0412\u0430\u0436\u043D\u044B\u0439",
    add: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
    all: "\u0412\u0441\u0435",
    active: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435",
    overdue: "\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043E",
    reminders: "\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F",
    done: "\u0413\u043E\u0442\u043E\u0432\u043E",
    todoEmpty: "\u0417\u0434\u0435\u0441\u044C \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u043E. \u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0434\u043E\u0445\u043D\u0443\u0442\u044C \u043D\u0430 \u0434\u0432\u0435 \u0441\u0435\u043A\u0443\u043D\u0434\u044B.",
    reminderReady: "\u041D\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C: ",
    reminderAt: "\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435: ",
    deleteTask: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443",
    variablesTitle: "\u041F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043F\u043E\u0434\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438",
    variablesDescription: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043E\u0434\u0438\u043D \u0440\u0430\u0437, \u0430 \u0432 \u0437\u0430\u043C\u0435\u0442\u043A\u0430\u0445 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0444\u043E\u0440\u043C\u0430\u0442 {{example}}.",
    found: "\u041D\u0430\u0439\u0434\u0435\u043D\u043E",
    variableValuePlaceholder: "\u0410\u043D\u043D\u0430",
    variablesFoundTitle: "\u041F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435, \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u0432 \u0437\u0430\u043C\u0435\u0442\u043A\u0430\u0445",
    variablesFoundDescription: "\u041F\u043E\u043B\u0435\u0437\u043D\u043E \u043F\u043E\u0441\u043B\u0435 \u0438\u043C\u043F\u043E\u0440\u0442\u0430: \u0441\u0440\u0430\u0437\u0443 \u0432\u0438\u0434\u043D\u043E, \u043A\u0430\u043A\u0438\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0435\u0449\u0451 \u043D\u0443\u0436\u043D\u043E \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C.",
    createMissing: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u044E\u0449\u0438\u0435",
    noVariablesInNotes: "\u0412 \u0437\u0430\u043C\u0435\u0442\u043A\u0430\u0445 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u0432\u0438\u0434\u0430 {{example}}.",
    noSavedVariables: "\u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0445 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442.",
    deleteVariable: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u0443\u044E"
  };
  var en = {
    appName: "BlobNote",
    baseSubtitle: "Notes base",
    answersSubtitle: "Reply base",
    darkTheme: "Dark",
    atSearch: "search",
    panel: "Panel",
    clipboard: "Clipboard",
    variables: "Variables",
    tasks: "Tasks",
    notesAndTemplates: "Notes and templates",
    base: "Base",
    settings: "Settings",
    help: "Guide",
    appearance: "Appearance",
    behavior: "Behavior",
    dataManagement: "Data",
    language: "Language",
    trigger: "Search trigger",
    openBaseCurrent: "Open base on this page",
    openBaseTab: "Open in a separate tab",
    quickInsertHint: "For quick insert, use the floating panel near the field, {{trigger}} search, or Ctrl+Space. Open the base over the site with Ctrl+Shift+Space.",
    allowlistOnly: "Work only on selected sites",
    enableForSite: "Enable for this site",
    disableForSite: "Disable for this site",
    atSearchInInput: "{{trigger}} search in input fields",
    floatingPanelNearField: "Floating panel near fields",
    clipboardInPanel: "Show recent clipboard entries in the panel",
    variablesTab: "Variables tab",
    tasksTab: "Tasks tab",
    export: "Export",
    import: "Import",
    triggerMenuTitle: "{{trigger}} menu",
    triggerMenuHelp: "Type {{trigger}} in an input field and start typing a note title.",
    floatingPanel: "Floating panel",
    floatingPanelHelp: "Favorite notes and recent clipboard entries appear next to the active field. The \u201CBase\u201D button opens the full view over the page.",
    variablesHelp: "Use {{example}}. Values can be filled in the \u201CVariables\u201D tab in the base.",
    onboardingTitle: "Quick start",
    onboardingSubtitle: "Three steps to make BlobNote useful right away.",
    onboardingStepBase: "1. Open the base and add your frequent replies.",
    onboardingStepSearch: "2. Type {{trigger}} in a message field to find a note without changing tabs.",
    onboardingStepPanel: "3. Enable the floating panel for favorites and recent clipboard entries.",
    gotIt: "Got it",
    templatesExported: "Notes exported",
    templatesImported: "Notes imported",
    jsonParseError: "JSON parse error",
    loadFailed: "Could not load",
    openBaseFailed: "Could not open the base on the page: ",
    refreshTab: "refresh the tab",
    gridCols2: "2 columns",
    gridCols3: "3 columns",
    gridCols4: "4 columns",
    gridCols5: "5 columns",
    cardHeight: "Card height",
    columnsCount: "Column count",
    auto: "Auto",
    cardPresets: "Card presets",
    resetCards: "Reset",
    searchNotesPlaceholder: "Search notes by title, tag, or text...",
    favorites: "Favorites",
    createNote: "Create note",
    clearAllTags: "Clear all tags",
    tags: "Tags",
    clearTagFilter: "Clear filter",
    emptyBase: "The notes base is empty. Create the first note.",
    nothingFoundCriteria: "Nothing matches these filters.",
    addStarterNotes: "Add starter notes",
    editNote: "Edit note",
    newNote: "New note",
    editorNoShift: "The editor opens over the base and does not move cards.",
    noteUpdated: "Note updated",
    noteCreated: "Note created",
    starterAdded: "Starter notes added",
    noteDeleted: "Note deleted",
    textCopied: "Text copied",
    deleteNoteQuestion: 'Delete "{{title}}"?',
    presetLagoon: "Lagoon",
    presetOrchid: "Orchid",
    presetGraphite: "Graphite",
    selectedNoteHint: "Select a note to edit or create a new one",
    fillNoteFields: "Fill in the note title and text",
    noteTitlePlaceholder: "Note title...",
    tagPlaceholder: "Category / Tag...",
    noteTextPlaceholder: "Note text...",
    charsShort: "chars",
    create: "Create",
    save: "Save",
    cancel: "Cancel",
    insertVariable: "Insert variable",
    previewHint: "You can edit the text here; the note will not change",
    copy: "Copy",
    insert: "Insert",
    insertAndSend: "Insert and send",
    inputNotFound: "Input field not found. Click the field on the page and try again.",
    quickReplies: "Quick replies",
    clear: "Clear",
    noFavorites: "No favorite notes",
    clipboardHistory: "Clipboard",
    clipboardEmpty: "Clipboard is empty",
    smartSearchTitle: "Smart note search",
    smartSearchPlaceholder: "Type a title, tag, or text...",
    nothingFound: "Nothing found",
    navigation: "navigation",
    insertVerb: "insert",
    insertAndSendVerb: "insert and send",
    todoTitle: "Base tasks",
    todoDescription: "A small planner for notes: deadlines, reminders, and priorities next to the base.",
    clearDone: "Clear done",
    todoPlaceholder: "Example: update the delivery note",
    deadline: "Deadline",
    remind: "Remind",
    low: "Low",
    normal: "Normal",
    high: "High",
    add: "Add",
    all: "All",
    active: "Active",
    overdue: "Overdue",
    reminders: "Reminders",
    done: "Done",
    todoEmpty: "Nothing here yet. A clean slate, for once.",
    reminderReady: "Remind: ",
    reminderAt: "Reminder: ",
    deleteTask: "Delete task",
    variablesTitle: "Substitution variables",
    variablesDescription: "Fill values once, then use {{example}} in notes.",
    found: "Found",
    variableValuePlaceholder: "Anna",
    variablesFoundTitle: "Variables found in notes",
    variablesFoundDescription: "Useful after import: see which values still need to be filled.",
    createMissing: "Create missing",
    noVariablesInNotes: "No variables like {{example}} found in notes yet.",
    noSavedVariables: "No saved variables yet.",
    deleteVariable: "Delete variable"
  };
  var dictionaries = { ru, en };
  function translate(language, key, params = {}) {
    const dictionary = dictionaries[language || "ru"] || dictionaries.ru;
    const template = dictionary[key] || dictionaries.ru[key] || key;
    return Object.entries(params).reduce(
      (value, [name, replacement]) => value.split(`{{${name}}}`).join(String(replacement)),
      template
    );
  }
  function isLanguage(value) {
    return value === "ru" || value === "en";
  }

  // src/lib/templateRuntime.ts
  var lastEditableElement = null;
  var cachedVariables = [];
  var cachedVariablesEnabled = true;
  var variableListenerAttached = false;
  var defaults = {
    templates: [],
    variables: [],
    customBindings: {},
    theme: "light",
    uiLanguage: "ru",
    atMenuEnabled: true,
    floatingPanelEnabled: true,
    clipboardPanelEnabled: false,
    searchTrigger: "/",
    showVariablesTab: true,
    activationMode: "all",
    enabledHosts: []
  };
  function hasChromeStorage() {
    return typeof chrome !== "undefined" && Boolean(chrome.storage?.sync);
  }
  function readRuntimeSnapshot() {
    attachVariableCacheListener();
    if (!hasChromeStorage()) {
      return Promise.resolve({
        templates: [],
        bindings: [],
        variables: cachedVariablesEnabled ? cachedVariables : [],
        theme: "light",
        uiLanguage: "ru",
        atMenuEnabled: true,
        floatingPanelEnabled: true,
        clipboardPanelEnabled: false,
        searchTrigger: "/",
        showVariablesTab: true,
        activationMode: "all",
        enabledHosts: []
      });
    }
    return new Promise((resolve) => {
      chrome.storage.sync.get(defaults, (items) => {
        const data = items;
        const variablesEnabled = data.showVariablesTab ?? true;
        const variables = normalizeVariables(data.variables);
        cachedVariablesEnabled = variablesEnabled;
        cachedVariables = variablesEnabled ? variables : [];
        resolve({
          templates: normalizeTemplates(data.templates),
          bindings: bindingsFromMap(data.customBindings),
          variables: variablesEnabled ? variables : [],
          theme: data.theme === "dark" ? "dark" : "light",
          uiLanguage: isLanguage(data.uiLanguage) ? data.uiLanguage : "ru",
          atMenuEnabled: data.atMenuEnabled ?? true,
          floatingPanelEnabled: data.floatingPanelEnabled ?? true,
          clipboardPanelEnabled: data.clipboardPanelEnabled ?? false,
          searchTrigger: data.searchTrigger === "@" ? "@" : "/",
          showVariablesTab: variablesEnabled,
          activationMode: data.activationMode || "all",
          enabledHosts: Array.isArray(data.enabledHosts) ? data.enabledHosts : []
        });
      });
    });
  }
  function isHostEnabled(snapshot, host = window.location.hostname) {
    if (snapshot.activationMode === "all") return true;
    return snapshot.enabledHosts.includes(host);
  }
  function attachVariableCacheListener() {
    if (variableListenerAttached || typeof chrome === "undefined" || !chrome.storage?.onChanged) return;
    variableListenerAttached = true;
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "sync") return;
      if (changes.showVariablesTab) cachedVariablesEnabled = changes.showVariablesTab.newValue ?? true;
      if (changes.variables || changes.showVariablesTab) {
        cachedVariables = cachedVariablesEnabled ? normalizeVariables(changes.variables?.newValue || cachedVariables) : [];
      }
    });
  }
  function normalizeTemplates(templates = []) {
    return templates.map((template, order) => ({
      id: template.id || `${Date.now()}-${order}`,
      title: String(template.title || "").trim() || "\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F",
      text: String(template.text || ""),
      tag: template.tag ? String(template.tag) : null,
      color: template.color ? String(template.color) : null,
      favorite: Boolean(template.favorite),
      createdAt: template.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: template.updatedAt || (/* @__PURE__ */ new Date()).toISOString(),
      order: typeof template.order === "number" ? template.order : order
    })).sort((a, b) => a.order - b.order);
  }
  function normalizeVariables(variables = []) {
    return variables.map((variable) => ({
      id: variable.id || `${Date.now()}-${variable.name || "variable"}`,
      name: String(variable.name || "").trim(),
      value: String(variable.value || ""),
      createdAt: variable.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: variable.updatedAt || (/* @__PURE__ */ new Date()).toISOString()
    })).filter((variable) => variable.name);
  }
  function bindingsFromMap(map = {}) {
    return Object.entries(map).map(([domain, binding]) => ({
      id: domain,
      domain,
      textareaSelector: binding.textareaSelector || binding.textarea || "",
      sendBtnSelector: binding.sendBtnSelector ?? binding.sendBtn ?? null,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    })).filter((binding) => binding.textareaSelector);
  }
  function isEditableElement(element) {
    if (!(element instanceof HTMLElement)) return false;
    if (element.tagName === "TEXTAREA") return true;
    if (element.tagName === "INPUT") {
      const input = element;
      return ["text", "search", "email", "tel", "url", ""].includes(input.type);
    }
    return element.isContentEditable || element.getAttribute("contenteditable") === "true";
  }
  function isInsideExtensionUi(element) {
    if (!(element instanceof HTMLElement)) return false;
    if (element.closest("#opspost-content-host, #opspost-content-root")) return true;
    const root = element.getRootNode();
    return root instanceof ShadowRoot && root.host instanceof HTMLElement && root.host.id === "opspost-content-host";
  }
  function rememberEditableElement(element) {
    if (isInsideExtensionUi(element)) return;
    if (isEditableElement(element)) lastEditableElement = element;
  }
  function getActiveEditableElement() {
    if (!isInsideExtensionUi(document.activeElement) && isEditableElement(document.activeElement)) {
      lastEditableElement = document.activeElement;
      return document.activeElement;
    }
    if (lastEditableElement && document.contains(lastEditableElement)) return lastEditableElement;
    return null;
  }
  function installEditableTracker() {
    void readRuntimeSnapshot();
    const rememberFromEvent = (event) => rememberEditableElement(event.target);
    const rememberSelection = () => rememberEditableElement(document.activeElement);
    document.addEventListener("focusin", rememberFromEvent, true);
    document.addEventListener("input", rememberFromEvent, true);
    document.addEventListener("selectionchange", rememberSelection, true);
    return () => {
      document.removeEventListener("focusin", rememberFromEvent, true);
      document.removeEventListener("input", rememberFromEvent, true);
      document.removeEventListener("selectionchange", rememberSelection, true);
    };
  }
  function editableValue(element) {
    if ("value" in element) return element.value || "";
    return element.textContent || "";
  }
  function editableSelection(element) {
    if ("selectionStart" in element && typeof element.selectionStart === "number") {
      return {
        start: element.selectionStart || 0,
        end: element.selectionEnd || element.selectionStart || 0
      };
    }
    const value = editableValue(element);
    return { start: value.length, end: value.length };
  }
  function setNativeValue(element, value) {
    if ("value" in element) {
      const isTextArea = element.tagName === "TEXTAREA";
      const proto = isTextArea ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      const valueSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
      const previousValue = element.value;
      if (valueSetter) valueSetter.call(element, value);
      else element.value = value;
      const tracked = element;
      tracked._valueTracker?.setValue(previousValue);
    } else {
      element.textContent = value;
    }
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }
  function insertTextIntoEditable(element, text) {
    const currentValue = editableValue(element);
    const { start, end } = editableSelection(element);
    const nextValue = currentValue.substring(0, start) + text + currentValue.substring(end);
    setNativeValue(element, nextValue);
    const cursorPosition = start + text.length;
    if ("setSelectionRange" in element) element.setSelectionRange(cursorPosition, cursorPosition);
    element.focus();
  }
  function resolveTemplateText(text, variables = cachedVariables) {
    if (!cachedVariablesEnabled || variables === null) return text;
    let result = replaceDateVariable(text);
    const placeholders = Array.from(new Set(extractVariables(result)));
    for (const placeholder of placeholders) {
      const savedVariable = variables.find((variable) => variable.name.toLowerCase() === placeholder.toLowerCase());
      const value = savedVariable?.value || window.prompt(`\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u043B\u044F "${placeholder}":`, "");
      if (value === null) return null;
      result = result.replace(new RegExp(`\\{\\{\\s*${escapeRegExp(placeholder)}\\s*\\}\\}`, "gi"), value);
    }
    return result;
  }
  function findLikelySendButton(element) {
    const root = element?.closest("form") || element?.parentElement;
    const selectors = ['button[type="submit"]', 'input[type="submit"]', "button:not([disabled])", '[role="button"]'];
    for (const selector of selectors) {
      const button = root?.querySelector(selector);
      if (button) return button;
    }
    return document.querySelector('button[type="submit"], input[type="submit"]');
  }
  function insertTextToActiveField(text, autoSend = false) {
    const target = getActiveEditableElement();
    if (!target) return false;
    insertTextIntoEditable(target, text);
    if (autoSend) {
      window.setTimeout(() => {
        const button = findLikelySendButton(target);
        if (button && !("disabled" in button && button.disabled)) button.click();
      }, 150);
    }
    return true;
  }
  function insertTemplate(template, options = {}) {
    const resolvedText = resolveTemplateText(template.text);
    if (resolvedText === null) return false;
    const target = options.crm?.textarea() || getActiveEditableElement();
    if (!target) return false;
    insertTextIntoEditable(target, resolvedText);
    if (options.autoSend) {
      window.setTimeout(() => {
        const button = options.crm?.sendBtn() || findLikelySendButton(target);
        if (button && !("disabled" in button && button.disabled)) button.click();
      }, 150);
    }
    return true;
  }
  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // src/content/FloatingPanel.tsx
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
  function FloatingPanel({ onOpenBase }) {
    const [visible, setVisible] = import_react3.default.useState(false);
    const [favorites, setFavorites] = import_react3.default.useState([]);
    const [clipboardItems, setClipboardItems] = import_react3.default.useState([]);
    const [position, setPosition] = import_react3.default.useState({ top: 0, left: 0, width: 300 });
    const [enabled, setEnabled] = import_react3.default.useState(true);
    const [clipboardEnabled, setClipboardEnabled] = import_react3.default.useState(false);
    const [language, setLanguage] = import_react3.default.useState("ru");
    const panelRef = import_react3.default.useRef(null);
    const t = import_react3.default.useCallback((key) => translate(language, key), [language]);
    import_react3.default.useEffect(() => {
      let mounted = true;
      const loadSnapshot = async () => {
        const snapshot = await readRuntimeSnapshot();
        if (!mounted) return;
        setFavorites(snapshot.templates.filter((template) => template.favorite));
        setEnabled(snapshot.floatingPanelEnabled);
        setClipboardEnabled(snapshot.clipboardPanelEnabled);
        setLanguage(snapshot.uiLanguage);
        document.documentElement.classList.toggle("dark", snapshot.theme === "dark");
      };
      void loadSnapshot();
      const handleStorage = (changes, area) => {
        if (area === "sync" && (changes.templates || changes.theme || changes.floatingPanelEnabled || changes.clipboardPanelEnabled || changes.uiLanguage)) {
          void loadSnapshot();
        }
      };
      chrome.storage?.onChanged?.addListener(handleStorage);
      return () => {
        mounted = false;
        chrome.storage?.onChanged?.removeListener(handleStorage);
      };
    }, []);
    import_react3.default.useEffect(() => {
      if (!enabled) {
        setVisible(false);
        return;
      }
      const checkFocus = () => {
        const target2 = getActiveEditableElement();
        if (!target2 || !document.contains(target2)) {
          setVisible(false);
          return;
        }
        const panelHovered = Boolean(panelRef.current?.matches(":hover"));
        const editableFocused = isEditableElement(document.activeElement);
        if (editableFocused || panelHovered) {
          const rect = target2.getBoundingClientRect();
          const estimatedHeight = panelRef.current?.offsetHeight || (favorites.length > 0 || clipboardItems.length > 0 ? 168 : 78);
          const placeAbove = rect.top > estimatedHeight + 12;
          const top = placeAbove ? rect.top - estimatedHeight - 8 : Math.min(window.innerHeight - estimatedHeight - 8, rect.bottom + 8);
          const width = Math.min(Math.max(320, rect.width), window.innerWidth - 16);
          const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
          setPosition({
            top: Math.max(8, top),
            left,
            width
          });
          setVisible(true);
          return;
        }
        window.setTimeout(() => {
          if (!panelRef.current?.matches(":hover")) setVisible(false);
        }, 150);
      };
      document.addEventListener("focusin", checkFocus, true);
      document.addEventListener("focusout", checkFocus, true);
      document.addEventListener("input", checkFocus, true);
      const interval = window.setInterval(checkFocus, 700);
      return () => {
        document.removeEventListener("focusin", checkFocus, true);
        document.removeEventListener("focusout", checkFocus, true);
        document.removeEventListener("input", checkFocus, true);
        window.clearInterval(interval);
      };
    }, [enabled, favorites.length, clipboardItems.length]);
    import_react3.default.useEffect(() => {
      if (!enabled || !clipboardEnabled) {
        setClipboardItems([]);
        return;
      }
      let cancelled = false;
      let lastText = "";
      const readClipboard = async () => {
        try {
          const text = (await navigator.clipboard.readText()).trim();
          if (cancelled || !text || text === lastText) return;
          lastText = text;
          setClipboardItems((items) => [text, ...items.filter((item) => item !== text)].slice(0, 5));
        } catch {
        }
      };
      void readClipboard();
      const interval = window.setInterval(readClipboard, 1800);
      return () => {
        cancelled = true;
        window.clearInterval(interval);
      };
    }, [clipboardEnabled, enabled]);
    if (!enabled || !visible) return null;
    const target = getActiveEditableElement();
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        ref: panelRef,
        style: {
          position: "fixed",
          top: position.top,
          left: position.left,
          width: position.width,
          maxWidth: "calc(100vw - 16px)",
          zIndex: 2147483640
        },
        className: "overflow-hidden rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-2xl",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: t("quickReplies") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "h-6 text-xs text-destructive",
                  onMouseDown: (event) => event.preventDefault(),
                  onClick: () => {
                    if (target) {
                      setNativeValue(target, "");
                      target.focus();
                    }
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Eraser, { className: "mr-1 h-3 w-3" }),
                    t("clear")
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                Button,
                {
                  size: "sm",
                  variant: "default",
                  className: "h-6 text-xs",
                  onMouseDown: (event) => event.preventDefault(),
                  onClick: onOpenBase,
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Database, { className: "mr-1 h-3 w-3" }),
                    t("base")
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex max-h-[96px] flex-wrap gap-1 overflow-y-auto overflow-x-hidden pr-1", children: favorites.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-[10px] italic text-muted-foreground", children: t("noFavorites") }) : favorites.map((template) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-6 min-w-0 max-w-[180px] rounded-md text-[10px]",
                onMouseDown: (event) => event.preventDefault(),
                onClick: () => insertTemplate(template),
                title: template.title,
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block min-w-0 truncate", children: template.title })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              Button,
              {
                size: "icon",
                variant: "secondary",
                className: "h-6 w-6 rounded-md",
                title: t("insertAndSend"),
                onMouseDown: (event) => event.preventDefault(),
                onClick: () => insertTemplate(template, { autoSend: true }),
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Send, { className: "h-3 w-3" })
              }
            )
          ] }, template.id)) }),
          clipboardEnabled && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-2 border-t pt-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ClipboardList, { className: "h-3 w-3" }),
              t("clipboardHistory")
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex max-h-[112px] flex-col gap-1 overflow-y-auto overflow-x-hidden pr-1", children: clipboardItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-[10px] italic text-muted-foreground", children: t("clipboardEmpty") }) : clipboardItems.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 w-full min-w-0 justify-start overflow-hidden rounded-md px-2 py-1 text-left text-[10px] leading-snug",
                title: item,
                onMouseDown: (event) => event.preventDefault(),
                onClick: () => {
                  const activeTarget = getActiveEditableElement();
                  if (!activeTarget) return;
                  insertTextIntoEditable(activeTarget, item);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block min-w-0 truncate", children: item })
              },
              item
            )) })
          ] })
        ]
      }
    );
  }

  // src/content/AtMenu.tsx
  var import_react4 = __toESM(require_react(), 1);
  var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
  function AtMenu() {
    const [active, setActive] = import_react4.default.useState(false);
    const [templates, setTemplates] = import_react4.default.useState([]);
    const [filtered, setFiltered] = import_react4.default.useState([]);
    const [selectedIndex, setSelectedIndex] = import_react4.default.useState(0);
    const [inputElement, setInputElement] = import_react4.default.useState(null);
    const [triggerPos, setTriggerPos] = import_react4.default.useState(-1);
    const [searchText, setSearchText] = import_react4.default.useState("");
    const [position, setPosition] = import_react4.default.useState({
      top: 0,
      left: 0,
      placement: "above"
    });
    const [enabled, setEnabled] = import_react4.default.useState(true);
    const [trigger, setTrigger] = import_react4.default.useState("/");
    import_react4.default.useEffect(() => {
      let mounted = true;
      const loadData = async () => {
        const snapshot = await readRuntimeSnapshot();
        if (!mounted) return;
        setTemplates(snapshot.templates);
        setEnabled(snapshot.atMenuEnabled);
        setTrigger(snapshot.searchTrigger);
      };
      void loadData();
      const handleStorage = (changes, area) => {
        if (area === "sync" && (changes.templates || changes.atMenuEnabled || changes.searchTrigger)) void loadData();
      };
      chrome.storage?.onChanged?.addListener(handleStorage);
      return () => {
        mounted = false;
        chrome.storage?.onChanged?.removeListener(handleStorage);
      };
    }, []);
    import_react4.default.useEffect(() => {
      const handleInput = (event) => {
        if (isInsideExtensionUi(event.target)) return;
        if (!enabled || !isEditableElement(event.target)) return;
        const input = event.target;
        const value = editableValue(input);
        const cursorPos = "selectionStart" in input && typeof input.selectionStart === "number" ? input.selectionStart || 0 : value.length;
        let triggerPosition = -1;
        for (let index = cursorPos - 1; index >= 0; index -= 1) {
          if (value.slice(index, index + trigger.length) === trigger) {
            triggerPosition = index;
            break;
          }
          if (/\s/.test(value[index])) break;
        }
        if (triggerPosition === -1) {
          setActive(false);
          return;
        }
        const search = value.substring(triggerPosition + trigger.length, cursorPos);
        if (search.includes(" ")) {
          setActive(false);
          return;
        }
        const matching = templates.filter((template) => {
          const query = search.toLowerCase();
          return template.title.toLowerCase().includes(query) || Boolean(template.tag?.toLowerCase().includes(query));
        });
        if (matching.length === 0) {
          setActive(false);
          return;
        }
        const rect = input.getBoundingClientRect();
        setInputElement(input);
        setTriggerPos(triggerPosition);
        setSearchText(search);
        setFiltered(matching);
        setSelectedIndex(0);
        const estimatedHeight = Math.min(250, Math.max(44, matching.length * 34));
        const placeAbove = rect.top > estimatedHeight + 12;
        const menuWidth = 240;
        setPosition({
          top: placeAbove ? rect.top - 8 : Math.min(window.innerHeight - estimatedHeight - 8, rect.bottom + 8),
          left: Math.min(Math.max(8, rect.left), window.innerWidth - menuWidth - 8),
          placement: placeAbove ? "above" : "below"
        });
        setActive(true);
      };
      const handleKeydown = (event) => {
        if (!active) return;
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setSelectedIndex((index) => (index + 1) % filtered.length);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setSelectedIndex((index) => (index - 1 + filtered.length) % filtered.length);
        } else if (event.key === "Enter") {
          event.preventDefault();
          const template = filtered[selectedIndex];
          if (template) insertAtTemplate(template);
        } else if (event.key === "Escape") {
          event.preventDefault();
          setActive(false);
        }
      };
      const handleClick = (event) => {
        const target = event.target;
        if (active && !target?.closest("[data-opspost-at-menu]")) setActive(false);
      };
      document.addEventListener("input", handleInput);
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("input", handleInput);
        document.removeEventListener("keydown", handleKeydown);
        document.removeEventListener("click", handleClick);
      };
    }, [active, enabled, filtered, selectedIndex, templates, trigger]);
    const insertAtTemplate = (template) => {
      if (!inputElement) return;
      const resolvedText = resolveTemplateText(template.text);
      if (resolvedText === null) return;
      const value = editableValue(inputElement);
      const before = value.substring(0, triggerPos);
      const after = value.substring(triggerPos + trigger.length + searchText.length);
      const newValue = before + resolvedText + after;
      setNativeValue(inputElement, newValue);
      const cursorPosition = before.length + resolvedText.length;
      if ("setSelectionRange" in inputElement) inputElement.setSelectionRange(cursorPosition, cursorPosition);
      inputElement.focus();
      setActive(false);
    };
    if (!active || !enabled) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        "data-opspost-at-menu": true,
        className: "fixed z-[2147483647] max-h-[250px] min-w-[220px] overflow-y-auto rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl",
        style: {
          top: position.top,
          left: position.left,
          transform: position.placement === "above" ? "translateY(-100%)" : "none"
        },
        children: filtered.map((template, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            type: "button",
            className: cn(
              "flex w-full items-center justify-between px-2 py-1.5 cursor-pointer text-xs border-b last:border-b-0 text-left",
              index === selectedIndex ? "bg-muted" : "hover:bg-muted"
            ),
            onMouseDown: (event) => event.preventDefault(),
            onClick: () => insertAtTemplate(template),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "font-medium", children: template.title }),
              template.tag && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-[10px] bg-muted px-1.5 py-0.5 rounded ml-2", children: template.tag })
            ]
          },
          template.id
        ))
      }
    );
  }

  // src/content/SmartSearch.tsx
  var import_react5 = __toESM(require_react(), 1);

  // src/components/ui/input.tsx
  var React6 = __toESM(require_react());
  var import_jsx_runtime4 = __toESM(require_jsx_runtime());
  var Input = React6.forwardRef(
    ({ className, type, ...props }, ref) => {
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type,
          className: cn(
            "flex h-8 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          ),
          ref,
          ...props
        }
      );
    }
  );
  Input.displayName = "Input";

  // src/components/ui/badge.tsx
  var import_jsx_runtime5 = __toESM(require_jsx_runtime());
  var badgeVariants = cva(
    "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      variants: {
        variant: {
          default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
          secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
          destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
          outline: "text-foreground"
        }
      },
      defaultVariants: {
        variant: "default"
      }
    }
  );
  function Badge({ className, variant, ...props }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: cn(badgeVariants({ variant }), className), ...props });
  }

  // src/content/SmartSearch.tsx
  var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
  function SmartSearch({ open, onOpenChange }) {
    const [templates, setTemplates] = import_react5.default.useState([]);
    const [language, setLanguage] = import_react5.default.useState("ru");
    const [query, setQuery] = import_react5.default.useState("");
    const [selectedIndex, setSelectedIndex] = import_react5.default.useState(0);
    const inputRef = import_react5.default.useRef(null);
    import_react5.default.useEffect(() => {
      if (!open) return;
      let mounted = true;
      readRuntimeSnapshot().then((snapshot) => {
        if (!mounted) return;
        setTemplates(snapshot.templates);
        setLanguage(snapshot.uiLanguage);
        setSelectedIndex(0);
        window.setTimeout(() => inputRef.current?.focus(), 0);
      });
      return () => {
        mounted = false;
      };
    }, [open]);
    const filtered = import_react5.default.useMemo(() => {
      const normalizedQuery = query.toLowerCase().trim();
      return templates.filter((template) => {
        if (!normalizedQuery) return true;
        return template.title.toLowerCase().includes(normalizedQuery) || template.text.toLowerCase().includes(normalizedQuery) || Boolean(template.tag?.toLowerCase().includes(normalizedQuery));
      });
    }, [query, templates]);
    import_react5.default.useEffect(() => {
      setSelectedIndex(0);
    }, [query]);
    if (!open) return null;
    const t = (key) => translate(language, key);
    const chooseTemplate = async (template, autoSend = false) => {
      insertTemplate(template, { autoSend });
      onOpenChange(false);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed inset-0 z-[2147483646] bg-slate-950/35 backdrop-blur-sm flex items-start justify-center pt-[12vh] text-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-[min(720px,calc(100vw-32px))] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-3 border-b px-4 py-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "font-semibold text-sm flex-1", children: t("smartSearchTitle") }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: () => onOpenChange(false), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          Input,
          {
            ref: inputRef,
            value: query,
            placeholder: t("smartSearchPlaceholder"),
            onChange: (event) => setQuery(event.target.value),
            onKeyDown: (event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setSelectedIndex((index) => (index + 1) % Math.max(filtered.length, 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setSelectedIndex((index) => (index - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
              } else if (event.key === "Enter") {
                event.preventDefault();
                const template = filtered[selectedIndex];
                if (template) void chooseTemplate(template, event.ctrlKey);
              } else if (event.key === "Escape") {
                event.preventDefault();
                onOpenChange(false);
              }
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mt-3 max-h-[380px] overflow-y-auto rounded-lg border", children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "py-10 text-center text-sm text-muted-foreground", children: t("nothingFound") }) : filtered.map((template, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "button",
          {
            type: "button",
            className: cn(
              "w-full text-left px-3 py-2 border-b last:border-b-0 hover:bg-muted transition-colors",
              index === selectedIndex && "bg-muted"
            ),
            onMouseEnter: () => setSelectedIndex(index),
            onClick: () => void chooseTemplate(template),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-sm font-medium truncate", children: template.title }),
                template.tag && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Badge, { variant: "secondary", className: "text-[10px] shrink-0", children: template.tag })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mt-1 text-xs text-muted-foreground line-clamp-2 whitespace-pre-wrap", children: template.text })
            ]
          },
          template.id
        )) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mt-3 flex items-center gap-2 text-[11px] text-muted-foreground", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("kbd", { className: "px-1.5 py-0.5 rounded bg-muted", children: "\u2191" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("kbd", { className: "px-1.5 py-0.5 rounded bg-muted", children: "\u2193" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: t("navigation") }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("kbd", { className: "px-1.5 py-0.5 rounded bg-muted", children: "Enter" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: t("insertVerb") }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("kbd", { className: "px-1.5 py-0.5 rounded bg-muted", children: "Ctrl+Enter" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: t("insertAndSendVerb") })
        ] })
      ] })
    ] }) });
  }

  // src/content/BaseModal.tsx
  var import_react13 = __toESM(require_react(), 1);

  // src/base/KnowledgeBase.tsx
  var import_react12 = __toESM(require_react());

  // node_modules/zustand/esm/vanilla.mjs
  var import_meta = {};
  var createStoreImpl = (createState) => {
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        const previousState = state;
        state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
        listeners.forEach((listener) => listener(state, previousState));
      }
    };
    const getState2 = () => state;
    const getInitialState = () => initialState;
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    const destroy = () => {
      if ((import_meta.env ? import_meta.env.MODE : void 0) !== "production") {
        console.warn(
          "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
        );
      }
      listeners.clear();
    };
    const api = { setState, getState: getState2, getInitialState, subscribe, destroy };
    const initialState = state = createState(setState, getState2, api);
    return api;
  };
  var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

  // node_modules/zustand/esm/index.mjs
  var import_react6 = __toESM(require_react(), 1);
  var import_with_selector = __toESM(require_with_selector(), 1);
  var import_meta2 = {};
  var { useDebugValue } = import_react6.default;
  var { useSyncExternalStoreWithSelector } = import_with_selector.default;
  var didWarnAboutEqualityFn = false;
  var identity = (arg) => arg;
  function useStore(api, selector = identity, equalityFn) {
    if ((import_meta2.env ? import_meta2.env.MODE : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
      console.warn(
        "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
      );
      didWarnAboutEqualityFn = true;
    }
    const slice = useSyncExternalStoreWithSelector(
      api.subscribe,
      api.getState,
      api.getServerState || api.getInitialState,
      selector,
      equalityFn
    );
    useDebugValue(slice);
    return slice;
  }
  var createImpl = (createState) => {
    if ((import_meta2.env ? import_meta2.env.MODE : void 0) !== "production" && typeof createState !== "function") {
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
      );
    }
    const api = typeof createState === "function" ? createStore(createState) : createState;
    const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
    Object.assign(useBoundStore, api);
    return useBoundStore;
  };
  var create = (createState) => createState ? createImpl(createState) : createImpl;

  // src/lib/cardPresets.ts
  var CARD_PRESETS = {
    light: {
      lagoon: {
        cardPreset: "lagoon",
        defaultCardColor: "#eef7ff",
        favoriteCardColor: "#e9f9f1",
        cardTextColor: "#102033",
        cardFontFamily: "inherit"
      },
      orchid: {
        cardPreset: "orchid",
        defaultCardColor: "#f7f0ff",
        favoriteCardColor: "#e8f7ff",
        cardTextColor: "#221835",
        cardFontFamily: "Trebuchet MS, sans-serif"
      },
      graphite: {
        cardPreset: "graphite",
        defaultCardColor: "#f6f7f9",
        favoriteCardColor: "#edf6f2",
        cardTextColor: "#111827",
        cardFontFamily: "Georgia, serif"
      }
    },
    dark: {
      lagoon: {
        cardPreset: "lagoon",
        defaultCardColor: "#172338",
        favoriteCardColor: "#173529",
        cardTextColor: "#f3f8ff",
        cardFontFamily: "inherit"
      },
      orchid: {
        cardPreset: "orchid",
        defaultCardColor: "#251c33",
        favoriteCardColor: "#173044",
        cardTextColor: "#f8f4ff",
        cardFontFamily: "Trebuchet MS, sans-serif"
      },
      graphite: {
        cardPreset: "graphite",
        defaultCardColor: "#171b22",
        favoriteCardColor: "#1c2c28",
        cardTextColor: "#f8fafc",
        cardFontFamily: "Georgia, serif"
      }
    }
  };
  function normalizeCardPreset(value) {
    return value === "orchid" || value === "graphite" ? value : "lagoon";
  }
  function cardPresetFor(theme, preset) {
    return CARD_PRESETS[theme][normalizeCardPreset(preset)];
  }

  // src/store/index.ts
  var defaultSettings = {
    theme: "light",
    uiLanguage: "ru",
    atMenuEnabled: true,
    floatingPanelEnabled: true,
    clipboardPanelEnabled: false,
    searchTrigger: "/",
    activationMode: "all",
    enabledHosts: [],
    ...cardPresetFor("light", "lagoon"),
    showVariablesTab: true,
    showTodoTab: true,
    lastBaseTab: "templates",
    gridCols: 3,
    gridHeight: "240px",
    onboardingCompleted: false
  };
  var defaultSnapshot = {
    templates: [],
    variables: [],
    todos: [],
    customBindings: {},
    ...defaultSettings
  };
  var storageListenerAttached = false;
  var initialHydrateStarted = false;
  function hasChromeStorage2() {
    return typeof chrome !== "undefined" && Boolean(chrome.storage?.sync);
  }
  function chromeGet(defaults2) {
    if (!hasChromeStorage2()) return Promise.resolve(defaults2);
    return new Promise((resolve) => {
      chrome.storage.sync.get(defaults2, (items) => {
        resolve(items);
      });
    });
  }
  function chromeSet(items) {
    if (!hasChromeStorage2()) return;
    chrome.storage.sync.set(items);
  }
  function normalizeTemplate(template, index) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    return {
      id: template.id || generateId(),
      title: String(template.title || "").trim() || "\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F",
      text: String(template.text || ""),
      tag: template.tag ? String(template.tag) : null,
      color: template.color ? String(template.color) : null,
      favorite: Boolean(template.favorite),
      createdAt: template.createdAt || now,
      updatedAt: template.updatedAt || now,
      order: typeof template.order === "number" ? template.order : index
    };
  }
  function normalizeTemplates2(templates = []) {
    return templates.map(normalizeTemplate).sort((a, b) => a.order - b.order);
  }
  function normalizeVariable(variable) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    return {
      id: variable.id || generateId(),
      name: String(variable.name || "").trim(),
      value: String(variable.value || ""),
      createdAt: variable.createdAt || now,
      updatedAt: variable.updatedAt || now
    };
  }
  function normalizeVariables2(variables = []) {
    return variables.map(normalizeVariable).filter((variable) => variable.name);
  }
  function normalizeTodo(todo) {
    return {
      id: todo.id || generateId(),
      text: String(todo.text || "").trim(),
      done: Boolean(todo.done),
      dueAt: todo.dueAt ? String(todo.dueAt) : null,
      reminderAt: todo.reminderAt ? String(todo.reminderAt) : null,
      priority: todo.priority === "low" || todo.priority === "high" ? todo.priority : "normal",
      createdAt: todo.createdAt || (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  function normalizeTodos(todos = []) {
    return todos.map(normalizeTodo).filter((todo) => todo.text);
  }
  function bindingsFromMap2(map = {}) {
    return Object.entries(map).map(([domain, binding]) => ({
      id: domain,
      domain,
      textareaSelector: binding.textareaSelector || binding.textarea || "",
      sendBtnSelector: binding.sendBtnSelector ?? binding.sendBtn ?? null,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    })).filter((binding) => binding.textareaSelector);
  }
  function mapFromBindings(bindings) {
    return bindings.reduce((acc, binding) => {
      acc[binding.domain] = {
        textarea: binding.textareaSelector,
        sendBtn: binding.sendBtnSelector
      };
      return acc;
    }, {});
  }
  function snapshotToState(snapshot) {
    const theme = snapshot.theme === "dark" ? "dark" : "light";
    const cardPreset = normalizeCardPreset(snapshot.cardPreset);
    const searchTrigger = snapshot.searchTrigger === "@" ? "@" : "/";
    return {
      templates: normalizeTemplates2(snapshot.templates),
      variables: normalizeVariables2(snapshot.variables),
      todos: normalizeTodos(snapshot.todos),
      bindings: bindingsFromMap2(snapshot.customBindings),
      settings: {
        theme,
        uiLanguage: isLanguage(snapshot.uiLanguage) ? snapshot.uiLanguage : defaultSettings.uiLanguage,
        atMenuEnabled: snapshot.atMenuEnabled ?? defaultSettings.atMenuEnabled,
        floatingPanelEnabled: snapshot.floatingPanelEnabled ?? defaultSettings.floatingPanelEnabled,
        clipboardPanelEnabled: snapshot.clipboardPanelEnabled ?? defaultSettings.clipboardPanelEnabled,
        searchTrigger,
        activationMode: snapshot.activationMode || defaultSettings.activationMode,
        enabledHosts: Array.isArray(snapshot.enabledHosts) ? snapshot.enabledHosts : defaultSettings.enabledHosts,
        ...cardPresetFor(theme, cardPreset),
        showVariablesTab: snapshot.showVariablesTab ?? defaultSettings.showVariablesTab,
        showTodoTab: snapshot.showTodoTab ?? defaultSettings.showTodoTab,
        lastBaseTab: snapshot.lastBaseTab || defaultSettings.lastBaseTab,
        gridCols: snapshot.gridCols || defaultSettings.gridCols,
        gridHeight: snapshot.gridHeight || defaultSettings.gridHeight,
        onboardingCompleted: snapshot.onboardingCompleted ?? defaultSettings.onboardingCompleted
      },
      hydrated: true
    };
  }
  function attachStorageListener() {
    if (storageListenerAttached || typeof chrome === "undefined" || !chrome.storage?.onChanged) return;
    storageListenerAttached = true;
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "sync") return;
      const state = useAppStore.getState();
      const nextSettings = { ...state.settings };
      let settingsChanged = false;
      const patch = {};
      if (changes.templates) patch.templates = normalizeTemplates2(changes.templates.newValue || []);
      if (changes.variables) patch.variables = normalizeVariables2(changes.variables.newValue || []);
      if (changes.todos) patch.todos = normalizeTodos(changes.todos.newValue || []);
      if (changes.customBindings) patch.bindings = bindingsFromMap2(changes.customBindings.newValue || {});
      let cardPresetChanged = false;
      if (changes.theme) {
        nextSettings.theme = changes.theme.newValue === "dark" ? "dark" : "light";
        settingsChanged = true;
        cardPresetChanged = true;
      }
      if (changes.uiLanguage) {
        nextSettings.uiLanguage = isLanguage(changes.uiLanguage.newValue) ? changes.uiLanguage.newValue : defaultSettings.uiLanguage;
        settingsChanged = true;
      }
      if (changes.atMenuEnabled) {
        nextSettings.atMenuEnabled = changes.atMenuEnabled.newValue ?? defaultSettings.atMenuEnabled;
        settingsChanged = true;
      }
      if (changes.floatingPanelEnabled) {
        nextSettings.floatingPanelEnabled = changes.floatingPanelEnabled.newValue ?? defaultSettings.floatingPanelEnabled;
        settingsChanged = true;
      }
      if (changes.clipboardPanelEnabled) {
        nextSettings.clipboardPanelEnabled = changes.clipboardPanelEnabled.newValue ?? defaultSettings.clipboardPanelEnabled;
        settingsChanged = true;
      }
      if (changes.searchTrigger) {
        nextSettings.searchTrigger = changes.searchTrigger.newValue === "@" ? "@" : "/";
        settingsChanged = true;
      }
      if (changes.cardPreset) {
        nextSettings.cardPreset = normalizeCardPreset(changes.cardPreset.newValue);
        settingsChanged = true;
        cardPresetChanged = true;
      }
      if (changes.activationMode) {
        nextSettings.activationMode = changes.activationMode.newValue || defaultSettings.activationMode;
        settingsChanged = true;
      }
      if (changes.enabledHosts) {
        nextSettings.enabledHosts = Array.isArray(changes.enabledHosts.newValue) ? changes.enabledHosts.newValue : [];
        settingsChanged = true;
      }
      if (changes.defaultCardColor) {
        nextSettings.defaultCardColor = changes.defaultCardColor.newValue || defaultSettings.defaultCardColor;
        settingsChanged = true;
      }
      if (changes.favoriteCardColor) {
        nextSettings.favoriteCardColor = changes.favoriteCardColor.newValue || defaultSettings.favoriteCardColor;
        settingsChanged = true;
      }
      if (changes.cardTextColor) {
        nextSettings.cardTextColor = changes.cardTextColor.newValue || defaultSettings.cardTextColor;
        settingsChanged = true;
      }
      if (changes.cardFontFamily) {
        nextSettings.cardFontFamily = changes.cardFontFamily.newValue || defaultSettings.cardFontFamily;
        settingsChanged = true;
      }
      if (changes.showVariablesTab) {
        nextSettings.showVariablesTab = changes.showVariablesTab.newValue ?? defaultSettings.showVariablesTab;
        settingsChanged = true;
      }
      if (changes.showTodoTab) {
        nextSettings.showTodoTab = changes.showTodoTab.newValue ?? defaultSettings.showTodoTab;
        settingsChanged = true;
      }
      if (changes.lastBaseTab) {
        nextSettings.lastBaseTab = changes.lastBaseTab.newValue || defaultSettings.lastBaseTab;
        settingsChanged = true;
      }
      if (changes.gridCols) {
        nextSettings.gridCols = changes.gridCols.newValue || defaultSettings.gridCols;
        settingsChanged = true;
      }
      if (changes.gridHeight) {
        nextSettings.gridHeight = changes.gridHeight.newValue || defaultSettings.gridHeight;
        settingsChanged = true;
      }
      if (changes.onboardingCompleted) {
        nextSettings.onboardingCompleted = Boolean(changes.onboardingCompleted.newValue);
        settingsChanged = true;
      }
      if (cardPresetChanged) Object.assign(nextSettings, cardPresetFor(nextSettings.theme, nextSettings.cardPreset));
      if (settingsChanged) patch.settings = nextSettings;
      if (Object.keys(patch).length > 0) useAppStore.setState(patch);
    });
  }
  async function hydrateFromStorage() {
    attachStorageListener();
    const snapshot = await chromeGet(defaultSnapshot);
    useAppStore.setState(snapshotToState(snapshot));
  }
  var useAppStore = create()((set, get) => ({
    templates: [],
    bindings: [],
    variables: [],
    todos: [],
    settings: defaultSettings,
    toasts: [],
    hydrated: false,
    hydrate: async () => {
      await hydrateFromStorage();
    },
    addTemplate: (template) => set((state) => {
      const templates = [...state.templates, {
        ...template,
        id: generateId(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        order: state.templates.length
      }];
      chromeSet({ templates });
      return { templates };
    }),
    updateTemplate: (id, updates) => set((state) => {
      const templates = state.templates.map(
        (template) => template.id === id ? { ...template, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : template
      );
      chromeSet({ templates });
      return { templates };
    }),
    deleteTemplate: (id) => set((state) => {
      const templates = state.templates.filter((template) => template.id !== id).map((template, order) => ({ ...template, order }));
      chromeSet({ templates });
      return { templates };
    }),
    reorderTemplates: (templateIds) => set((state) => {
      const reordered = templateIds.map((id, order) => {
        const template = state.templates.find((item) => item.id === id);
        return template ? { ...template, order } : null;
      }).filter(Boolean);
      const rest = state.templates.filter((template) => !templateIds.includes(template.id));
      const templates = [...reordered, ...rest].map((template, order) => ({ ...template, order }));
      chromeSet({ templates });
      return { templates };
    }),
    toggleFavorite: (id) => set((state) => {
      const templates = state.templates.map(
        (template) => template.id === id ? { ...template, favorite: !template.favorite, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : template
      );
      chromeSet({ templates });
      return { templates };
    }),
    addVariable: (variable) => set((state) => {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const variables = [...state.variables, { ...variable, id: generateId(), createdAt: now, updatedAt: now }];
      chromeSet({ variables });
      return { variables };
    }),
    updateVariable: (id, updates) => set((state) => {
      const variables = state.variables.map(
        (variable) => variable.id === id ? { ...variable, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : variable
      );
      chromeSet({ variables });
      return { variables };
    }),
    deleteVariable: (id) => set((state) => {
      const variables = state.variables.filter((variable) => variable.id !== id);
      chromeSet({ variables });
      return { variables };
    }),
    addTodo: (todo) => set((state) => {
      const payload = typeof todo === "string" ? { text: todo } : todo;
      const trimmed = payload.text.trim();
      if (!trimmed) return {};
      const todos = [
        ...state.todos,
        {
          id: generateId(),
          text: trimmed,
          done: false,
          dueAt: payload.dueAt || null,
          reminderAt: payload.reminderAt || null,
          priority: payload.priority || "normal",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      ];
      chromeSet({ todos });
      return { todos };
    }),
    updateTodo: (id, updates) => set((state) => {
      const todos = state.todos.map((todo) => todo.id === id ? { ...todo, ...updates } : todo);
      chromeSet({ todos });
      return { todos };
    }),
    toggleTodo: (id) => set((state) => {
      const todos = state.todos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo);
      chromeSet({ todos });
      return { todos };
    }),
    deleteTodo: (id) => set((state) => {
      const todos = state.todos.filter((todo) => todo.id !== id);
      chromeSet({ todos });
      return { todos };
    }),
    clearDoneTodos: () => set((state) => {
      const todos = state.todos.filter((todo) => !todo.done);
      chromeSet({ todos });
      return { todos };
    }),
    addBinding: (binding) => set((state) => {
      const nextBinding = {
        ...binding,
        id: binding.domain,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const bindings = [
        ...state.bindings.filter((item) => item.domain !== binding.domain),
        nextBinding
      ];
      chromeSet({ customBindings: mapFromBindings(bindings) });
      return { bindings };
    }),
    deleteBinding: (id) => set((state) => {
      const bindings = state.bindings.filter((binding) => binding.id !== id && binding.domain !== id);
      chromeSet({ customBindings: mapFromBindings(bindings) });
      return { bindings };
    }),
    updateSettings: (settings) => set((state) => {
      const theme = settings.theme === "dark" ? "dark" : settings.theme === "light" ? "light" : state.settings.theme;
      const cardPreset = normalizeCardPreset(settings.cardPreset ?? state.settings.cardPreset);
      const nextSettings = {
        ...state.settings,
        ...settings,
        theme,
        uiLanguage: isLanguage(settings.uiLanguage) ? settings.uiLanguage : state.settings.uiLanguage,
        searchTrigger: settings.searchTrigger === "@" ? "@" : settings.searchTrigger === "/" ? "/" : state.settings.searchTrigger,
        ...cardPresetFor(theme, cardPreset)
      };
      chromeSet({
        theme: nextSettings.theme,
        uiLanguage: nextSettings.uiLanguage,
        atMenuEnabled: nextSettings.atMenuEnabled,
        floatingPanelEnabled: nextSettings.floatingPanelEnabled,
        clipboardPanelEnabled: nextSettings.clipboardPanelEnabled,
        searchTrigger: nextSettings.searchTrigger,
        cardPreset: nextSettings.cardPreset,
        activationMode: nextSettings.activationMode,
        enabledHosts: nextSettings.enabledHosts,
        defaultCardColor: nextSettings.defaultCardColor,
        favoriteCardColor: nextSettings.favoriteCardColor,
        cardTextColor: nextSettings.cardTextColor,
        cardFontFamily: nextSettings.cardFontFamily,
        showVariablesTab: nextSettings.showVariablesTab,
        showTodoTab: nextSettings.showTodoTab,
        lastBaseTab: nextSettings.lastBaseTab,
        gridCols: nextSettings.gridCols,
        gridHeight: nextSettings.gridHeight,
        onboardingCompleted: nextSettings.onboardingCompleted
      });
      return { settings: nextSettings };
    }),
    addToast: (toast) => {
      const id = generateId();
      set((state) => ({
        toasts: [...state.toasts, { ...toast, id }]
      }));
      window.setTimeout(() => get().removeToast(id), 4e3);
    },
    removeToast: (id) => set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    })),
    importTemplates: (incomingTemplates) => set((state) => {
      const existingTitles = new Set(state.templates.map((template) => template.title.toLowerCase()));
      const normalized = normalizeTemplates2(incomingTemplates);
      const newTemplates = normalized.filter((template) => !existingTitles.has(template.title.toLowerCase()));
      const templates = [...state.templates, ...newTemplates].map((template, order) => ({ ...template, order }));
      chromeSet({ templates });
      return { templates };
    })
  }));
  function hydrateStoreOnce() {
    if (!initialHydrateStarted) {
      initialHydrateStarted = true;
      void hydrateFromStorage();
    }
  }
  hydrateStoreOnce();

  // src/components/ui/switch.tsx
  var React15 = __toESM(require_react());

  // node_modules/@radix-ui/react-switch/dist/index.mjs
  var React14 = __toESM(require_react(), 1);

  // node_modules/@radix-ui/primitive/dist/index.mjs
  var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
  function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
    return function handleEvent(event) {
      originalEventHandler?.(event);
      if (checkForDefaultPrevented === false || !event.defaultPrevented) {
        return ourEventHandler?.(event);
      }
    };
  }

  // node_modules/@radix-ui/react-context/dist/index.mjs
  var React8 = __toESM(require_react(), 1);
  var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
  function createContextScope(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext3(rootComponentName, defaultContext) {
      const BaseContext = React8.createContext(defaultContext);
      BaseContext.displayName = rootComponentName + "Context";
      const index = defaultContexts.length;
      defaultContexts = [...defaultContexts, defaultContext];
      const Provider = (props) => {
        const { scope, children, ...context } = props;
        const Context = scope?.[scopeName]?.[index] || BaseContext;
        const value = React8.useMemo(() => context, Object.values(context));
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Context.Provider, { value, children });
      };
      Provider.displayName = rootComponentName + "Provider";
      function useContext22(consumerName, scope) {
        const Context = scope?.[scopeName]?.[index] || BaseContext;
        const context = React8.useContext(Context);
        if (context) return context;
        if (defaultContext !== void 0) return defaultContext;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
      }
      return [Provider, useContext22];
    }
    const createScope = () => {
      const scopeContexts = defaultContexts.map((defaultContext) => {
        return React8.createContext(defaultContext);
      });
      return function useScope(scope) {
        const contexts = scope?.[scopeName] || scopeContexts;
        return React8.useMemo(
          () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
          [scope, contexts]
        );
      };
    };
    createScope.scopeName = scopeName;
    return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
  }
  function composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope = () => {
      const scopeHooks = scopes.map((createScope2) => ({
        useScope: createScope2(),
        scopeName: createScope2.scopeName
      }));
      return function useComposedScopes(overrideScopes) {
        const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
          const scopeProps = useScope(overrideScopes);
          const currentScope = scopeProps[`__scope${scopeName}`];
          return { ...nextScopes2, ...currentScope };
        }, {});
        return React8.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
      };
    };
    createScope.scopeName = baseScope.scopeName;
    return createScope;
  }

  // node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
  var React10 = __toESM(require_react(), 1);

  // node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
  var React9 = __toESM(require_react(), 1);
  var useLayoutEffect2 = globalThis?.document ? React9.useLayoutEffect : () => {
  };

  // node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
  var React22 = __toESM(require_react(), 1);
  var useInsertionEffect = React10[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
  function useControllableState({
    prop,
    defaultProp,
    onChange = () => {
    },
    caller
  }) {
    const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
      defaultProp,
      onChange
    });
    const isControlled = prop !== void 0;
    const value = isControlled ? prop : uncontrolledProp;
    if (true) {
      const isControlledRef = React10.useRef(prop !== void 0);
      React10.useEffect(() => {
        const wasControlled = isControlledRef.current;
        if (wasControlled !== isControlled) {
          const from = wasControlled ? "controlled" : "uncontrolled";
          const to = isControlled ? "controlled" : "uncontrolled";
          console.warn(
            `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
          );
        }
        isControlledRef.current = isControlled;
      }, [isControlled, caller]);
    }
    const setValue = React10.useCallback(
      (nextValue) => {
        if (isControlled) {
          const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
          if (value2 !== prop) {
            onChangeRef.current?.(value2);
          }
        } else {
          setUncontrolledProp(nextValue);
        }
      },
      [isControlled, prop, setUncontrolledProp, onChangeRef]
    );
    return [value, setValue];
  }
  function useUncontrolledState({
    defaultProp,
    onChange
  }) {
    const [value, setValue] = React10.useState(defaultProp);
    const prevValueRef = React10.useRef(value);
    const onChangeRef = React10.useRef(onChange);
    useInsertionEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);
    React10.useEffect(() => {
      if (prevValueRef.current !== value) {
        onChangeRef.current?.(value);
        prevValueRef.current = value;
      }
    }, [value, prevValueRef]);
    return [value, setValue, onChangeRef];
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  var SYNC_STATE = Symbol("RADIX:SYNC_STATE");

  // node_modules/@radix-ui/react-use-previous/dist/index.mjs
  var React11 = __toESM(require_react(), 1);
  function usePrevious(value) {
    const ref = React11.useRef({ value, previous: value });
    return React11.useMemo(() => {
      if (ref.current.value !== value) {
        ref.current.previous = ref.current.value;
        ref.current.value = value;
      }
      return ref.current.previous;
    }, [value]);
  }

  // node_modules/@radix-ui/react-use-size/dist/index.mjs
  var React12 = __toESM(require_react(), 1);
  function useSize(element) {
    const [size, setSize] = React12.useState(void 0);
    useLayoutEffect2(() => {
      if (element) {
        setSize({ width: element.offsetWidth, height: element.offsetHeight });
        const resizeObserver = new ResizeObserver((entries) => {
          if (!Array.isArray(entries)) {
            return;
          }
          if (!entries.length) {
            return;
          }
          const entry = entries[0];
          let width;
          let height;
          if ("borderBoxSize" in entry) {
            const borderSizeEntry = entry["borderBoxSize"];
            const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
            width = borderSize["inlineSize"];
            height = borderSize["blockSize"];
          } else {
            width = element.offsetWidth;
            height = element.offsetHeight;
          }
          setSize({ width, height });
        });
        resizeObserver.observe(element, { box: "border-box" });
        return () => resizeObserver.unobserve(element);
      } else {
        setSize(void 0);
      }
    }, [element]);
    return size;
  }

  // node_modules/@radix-ui/react-primitive/dist/index.mjs
  var React13 = __toESM(require_react(), 1);
  var ReactDOM = __toESM(require_react_dom(), 1);
  var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
  var NODES = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
  ];
  var Primitive = NODES.reduce((primitive, node) => {
    const Slot2 = createSlot(`Primitive.${node}`);
    const Node2 = React13.forwardRef((props, forwardedRef) => {
      const { asChild, ...primitiveProps } = props;
      const Comp = asChild ? Slot2 : node;
      if (typeof window !== "undefined") {
        window[Symbol.for("radix-ui")] = true;
      }
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Comp, { ...primitiveProps, ref: forwardedRef });
    });
    Node2.displayName = `Primitive.${node}`;
    return { ...primitive, [node]: Node2 };
  }, {});

  // node_modules/@radix-ui/react-switch/dist/index.mjs
  var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
  var SWITCH_NAME = "Switch";
  var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
  var [SwitchProviderImpl, useSwitchContext] = createSwitchContext(SWITCH_NAME);
  function SwitchProvider(props) {
    const {
      __scopeSwitch,
      checked: checkedProp,
      children,
      defaultChecked,
      disabled,
      form,
      name,
      onCheckedChange,
      required,
      value = "on",
      // @ts-expect-error
      internal_do_not_use_render
    } = props;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    const [control, setControl] = React14.useState(null);
    const [bubbleInput, setBubbleInput] = React14.useState(null);
    const hasConsumerStoppedPropagationRef = React14.useRef(false);
    const isFormControl = control ? !!form || !!control.closest("form") : (
      // We set this to true by default so that events bubble to forms without JS (SSR)
      true
    );
    const context = {
      checked,
      setChecked,
      disabled,
      control,
      setControl,
      name,
      form,
      value,
      hasConsumerStoppedPropagationRef,
      required,
      defaultChecked,
      isFormControl,
      bubbleInput,
      setBubbleInput
    };
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SwitchProviderImpl, { scope: __scopeSwitch, ...context, children: isFunction2(internal_do_not_use_render) ? internal_do_not_use_render(context) : children });
  }
  var TRIGGER_NAME = "SwitchTrigger";
  var SwitchTrigger = React14.forwardRef(
    ({ __scopeSwitch, onClick, ...switchProps }, forwardedRef) => {
      const {
        value,
        disabled,
        checked,
        required,
        setControl,
        setChecked,
        hasConsumerStoppedPropagationRef,
        isFormControl,
        bubbleInput
      } = useSwitchContext(TRIGGER_NAME, __scopeSwitch);
      const composedRefs = useComposedRefs(forwardedRef, setControl);
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (bubbleInput && isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      );
    }
  );
  SwitchTrigger.displayName = TRIGGER_NAME;
  var Switch = React14.forwardRef(
    (props, forwardedRef) => {
      const {
        __scopeSwitch,
        name,
        checked,
        defaultChecked,
        required,
        disabled,
        value,
        onCheckedChange,
        form,
        ...switchProps
      } = props;
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        SwitchProvider,
        {
          __scopeSwitch,
          checked,
          defaultChecked,
          disabled,
          required,
          onCheckedChange,
          name,
          form,
          value,
          internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              SwitchTrigger,
              {
                ...switchProps,
                ref: forwardedRef,
                __scopeSwitch
              }
            ),
            isFormControl && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              SwitchBubbleInput,
              {
                __scopeSwitch
              }
            )
          ] })
        }
      );
    }
  );
  Switch.displayName = SWITCH_NAME;
  var THUMB_NAME = "SwitchThumb";
  var SwitchThumb = React14.forwardRef(
    (props, forwardedRef) => {
      const { __scopeSwitch, ...thumbProps } = props;
      const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        Primitive.span,
        {
          "data-state": getState(context.checked),
          "data-disabled": context.disabled ? "" : void 0,
          ...thumbProps,
          ref: forwardedRef
        }
      );
    }
  );
  SwitchThumb.displayName = THUMB_NAME;
  var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
  var SwitchBubbleInput = React14.forwardRef(
    ({ __scopeSwitch, ...props }, forwardedRef) => {
      const {
        control,
        hasConsumerStoppedPropagationRef,
        checked,
        defaultChecked,
        required,
        disabled,
        name,
        value,
        form,
        bubbleInput,
        setBubbleInput
      } = useSwitchContext(BUBBLE_INPUT_NAME, __scopeSwitch);
      const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
      const prevChecked = usePrevious(checked);
      const controlSize = useSize(control);
      React14.useEffect(() => {
        const input = bubbleInput;
        if (!input) return;
        const inputProto = window.HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          "checked"
        );
        const setChecked = descriptor.set;
        const bubbles = !hasConsumerStoppedPropagationRef.current;
        if (prevChecked !== checked && setChecked) {
          const event = new Event("click", { bubbles });
          setChecked.call(input, checked);
          input.dispatchEvent(event);
        }
      }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
      const defaultCheckedRef = React14.useRef(checked);
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        Primitive.input,
        {
          type: "checkbox",
          "aria-hidden": true,
          defaultChecked: defaultChecked ?? defaultCheckedRef.current,
          required,
          disabled,
          name,
          value,
          form,
          ...props,
          tabIndex: -1,
          ref: composedRefs,
          style: {
            ...props.style,
            ...controlSize,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0,
            // We transform because the input is absolutely positioned but we have
            // rendered it **after** the button. This pulls it back to sit on top
            // of the button.
            transform: "translateX(-100%)"
          }
        }
      );
    }
  );
  SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
  function isFunction2(value) {
    return typeof value === "function";
  }
  function getState(checked) {
    return checked ? "checked" : "unchecked";
  }

  // src/components/ui/switch.tsx
  var import_jsx_runtime10 = __toESM(require_jsx_runtime());
  var Switch2 = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    Switch,
    {
      className: cn(
        "peer inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      ),
      ...props,
      ref,
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        SwitchThumb,
        {
          className: cn(
            "pointer-events-none block h-3 w-3 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  ));
  Switch2.displayName = Switch.displayName;

  // src/components/ui/tabs.tsx
  var React26 = __toESM(require_react());

  // node_modules/@radix-ui/react-tabs/dist/index.mjs
  var React25 = __toESM(require_react(), 1);

  // node_modules/@radix-ui/react-roving-focus/dist/index.mjs
  var React20 = __toESM(require_react(), 1);

  // node_modules/@radix-ui/react-collection/dist/index.mjs
  var React16 = __toESM(require_react(), 1);
  var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
  var React23 = __toESM(require_react(), 1);
  var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
  function createCollection(name) {
    const PROVIDER_NAME = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
    const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
      PROVIDER_NAME,
      { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
    );
    const CollectionProvider = (props) => {
      const { scope, children } = props;
      const ref = React16.useRef(null);
      const itemMap = React16.useRef(/* @__PURE__ */ new Map()).current;
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
    };
    CollectionProvider.displayName = PROVIDER_NAME;
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
    const CollectionSlot = React16.forwardRef(
      (props, forwardedRef) => {
        const { scope, children } = props;
        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
        return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(CollectionSlotImpl, { ref: composedRefs, children });
      }
    );
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
    const CollectionItemSlot = React16.forwardRef(
      (props, forwardedRef) => {
        const { scope, children, ...itemData } = props;
        const ref = React16.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        const context = useCollectionContext(ITEM_SLOT_NAME, scope);
        React16.useEffect(() => {
          context.itemMap.set(ref, { ref, ...itemData });
          return () => void context.itemMap.delete(ref);
        });
        return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
      }
    );
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useCollection2(scope) {
      const context = useCollectionContext(name + "CollectionConsumer", scope);
      const getItems = React16.useCallback(() => {
        const collectionNode = context.collectionRef.current;
        if (!collectionNode) return [];
        const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
        const items = Array.from(context.itemMap.values());
        const orderedItems = items.sort(
          (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
        );
        return orderedItems;
      }, [context.collectionRef, context.itemMap]);
      return getItems;
    }
    return [
      { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
      useCollection2,
      createCollectionScope2
    ];
  }

  // node_modules/@radix-ui/react-id/dist/index.mjs
  var React17 = __toESM(require_react(), 1);
  var useReactId = React17[" useId ".trim().toString()] || (() => void 0);
  var count = 0;
  function useId(deterministicId) {
    const [id, setId] = React17.useState(useReactId());
    useLayoutEffect2(() => {
      if (!deterministicId) setId((reactId) => reactId ?? String(count++));
    }, [deterministicId]);
    return deterministicId || (id ? `radix-${id}` : "");
  }

  // node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
  var React18 = __toESM(require_react(), 1);
  function useCallbackRef(callback) {
    const callbackRef = React18.useRef(callback);
    React18.useEffect(() => {
      callbackRef.current = callback;
    });
    return React18.useMemo(() => (...args) => callbackRef.current?.(...args), []);
  }

  // node_modules/@radix-ui/react-direction/dist/index.mjs
  var React19 = __toESM(require_react(), 1);
  var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
  var DirectionContext = React19.createContext(void 0);
  function useDirection(localDir) {
    const globalDir = React19.useContext(DirectionContext);
    return localDir || globalDir || "ltr";
  }

  // node_modules/@radix-ui/react-roving-focus/dist/index.mjs
  var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
  var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
  var EVENT_OPTIONS = { bubbles: false, cancelable: true };
  var GROUP_NAME = "RovingFocusGroup";
  var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
  var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
    GROUP_NAME,
    [createCollectionScope]
  );
  var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
  var RovingFocusGroup = React20.forwardRef(
    (props, forwardedRef) => {
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
    }
  );
  RovingFocusGroup.displayName = GROUP_NAME;
  var RovingFocusGroupImpl = React20.forwardRef((props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      orientation,
      loop = false,
      dir,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      onCurrentTabStopIdChange,
      onEntryFocus,
      preventScrollOnEntryFocus = false,
      ...groupProps
    } = props;
    const ref = React20.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const direction = useDirection(dir);
    const [currentTabStopId, setCurrentTabStopId] = useControllableState({
      prop: currentTabStopIdProp,
      defaultProp: defaultCurrentTabStopId ?? null,
      onChange: onCurrentTabStopIdChange,
      caller: GROUP_NAME
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = React20.useState(false);
    const handleEntryFocus = useCallbackRef(onEntryFocus);
    const getItems = useCollection(__scopeRovingFocusGroup);
    const isClickFocusRef = React20.useRef(false);
    const [focusableItemsCount, setFocusableItemsCount] = React20.useState(0);
    React20.useEffect(() => {
      const node = ref.current;
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
      }
    }, [handleEntryFocus]);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      RovingFocusProvider,
      {
        scope: __scopeRovingFocusGroup,
        orientation,
        dir: direction,
        loop,
        currentTabStopId,
        onItemFocus: React20.useCallback(
          (tabStopId) => setCurrentTabStopId(tabStopId),
          [setCurrentTabStopId]
        ),
        onItemShiftTab: React20.useCallback(() => setIsTabbingBackOut(true), []),
        onFocusableItemAdd: React20.useCallback(
          () => setFocusableItemsCount((prevCount) => prevCount + 1),
          []
        ),
        onFocusableItemRemove: React20.useCallback(
          () => setFocusableItemsCount((prevCount) => prevCount - 1),
          []
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          Primitive.div,
          {
            tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
            "data-orientation": orientation,
            ...groupProps,
            ref: composedRefs,
            style: { outline: "none", ...props.style },
            onMouseDown: composeEventHandlers(props.onMouseDown, () => {
              isClickFocusRef.current = true;
            }),
            onFocus: composeEventHandlers(props.onFocus, (event) => {
              const isKeyboardFocus = !isClickFocusRef.current;
              if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
                event.currentTarget.dispatchEvent(entryFocusEvent);
                if (!entryFocusEvent.defaultPrevented) {
                  const items = getItems().filter((item) => item.focusable);
                  const activeItem = items.find((item) => item.active);
                  const currentItem = items.find((item) => item.id === currentTabStopId);
                  const candidateItems = [activeItem, currentItem, ...items].filter(
                    Boolean
                  );
                  const candidateNodes = candidateItems.map((item) => item.ref.current);
                  focusFirst(candidateNodes, preventScrollOnEntryFocus);
                }
              }
              isClickFocusRef.current = false;
            }),
            onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
          }
        )
      }
    );
  });
  var ITEM_NAME = "RovingFocusGroupItem";
  var RovingFocusGroupItem = React20.forwardRef(
    (props, forwardedRef) => {
      const {
        __scopeRovingFocusGroup,
        focusable = true,
        active = false,
        tabStopId,
        children,
        ...itemProps
      } = props;
      const autoId = useId();
      const id = tabStopId || autoId;
      const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
      const isCurrentTabStop = context.currentTabStopId === id;
      const getItems = useCollection(__scopeRovingFocusGroup);
      const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
      React20.useEffect(() => {
        if (focusable) {
          onFocusableItemAdd();
          return () => onFocusableItemRemove();
        }
      }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        Collection.ItemSlot,
        {
          scope: __scopeRovingFocusGroup,
          id,
          focusable,
          active,
          children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            Primitive.span,
            {
              tabIndex: isCurrentTabStop ? 0 : -1,
              "data-orientation": context.orientation,
              ...itemProps,
              ref: forwardedRef,
              onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
                if (!focusable) event.preventDefault();
                else context.onItemFocus(id);
              }),
              onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
              onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                if (event.key === "Tab" && event.shiftKey) {
                  context.onItemShiftTab();
                  return;
                }
                if (event.target !== event.currentTarget) return;
                const focusIntent = getFocusIntent(event, context.orientation, context.dir);
                if (focusIntent !== void 0) {
                  if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                  event.preventDefault();
                  const items = getItems().filter((item) => item.focusable);
                  let candidateNodes = items.map((item) => item.ref.current);
                  if (focusIntent === "last") candidateNodes.reverse();
                  else if (focusIntent === "prev" || focusIntent === "next") {
                    if (focusIntent === "prev") candidateNodes.reverse();
                    const currentIndex = candidateNodes.indexOf(event.currentTarget);
                    candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                  }
                  setTimeout(() => focusFirst(candidateNodes));
                }
              }),
              children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
            }
          )
        }
      );
    }
  );
  RovingFocusGroupItem.displayName = ITEM_NAME;
  var MAP_KEY_TO_FOCUS_INTENT = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
  };
  function getDirectionAwareKey(key, dir) {
    if (dir !== "rtl") return key;
    return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
  }
  function getFocusIntent(event, orientation, dir) {
    const key = getDirectionAwareKey(event.key, dir);
    if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
    if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
    return MAP_KEY_TO_FOCUS_INTENT[key];
  }
  function focusFirst(candidates, preventScroll = false) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates) {
      if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
      candidate.focus({ preventScroll });
      if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
  }
  function wrapArray(array, startIndex) {
    return array.map((_, index) => array[(startIndex + index) % array.length]);
  }
  var Root = RovingFocusGroup;
  var Item = RovingFocusGroupItem;

  // node_modules/@radix-ui/react-presence/dist/index.mjs
  var React24 = __toESM(require_react(), 1);
  var React21 = __toESM(require_react(), 1);
  function useStateMachine(initialState, machine) {
    return React21.useReducer((state, event) => {
      const nextState = machine[state][event];
      return nextState ?? state;
    }, initialState);
  }
  var Presence = (props) => {
    const { present, children } = props;
    const presence = usePresence(present);
    const child = typeof children === "function" ? children({ present: presence.isPresent }) : React24.Children.only(children);
    const ref = useStableComposedRefs(presence.ref, getElementRef2(child));
    const forceMount = typeof children === "function";
    return forceMount || presence.isPresent ? React24.cloneElement(child, { ref }) : null;
  };
  Presence.displayName = "Presence";
  function usePresence(present) {
    const [node, setNode] = React24.useState();
    const stylesRef = React24.useRef(null);
    const prevPresentRef = React24.useRef(present);
    const prevAnimationNameRef = React24.useRef("none");
    const initialState = present ? "mounted" : "unmounted";
    const [state, send] = useStateMachine(initialState, {
      mounted: {
        UNMOUNT: "unmounted",
        ANIMATION_OUT: "unmountSuspended"
      },
      unmountSuspended: {
        MOUNT: "mounted",
        ANIMATION_END: "unmounted"
      },
      unmounted: {
        MOUNT: "mounted"
      }
    });
    React24.useEffect(() => {
      const currentAnimationName = getAnimationName(stylesRef.current);
      prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
    }, [state]);
    useLayoutEffect2(() => {
      const styles = stylesRef.current;
      const wasPresent = prevPresentRef.current;
      const hasPresentChanged = wasPresent !== present;
      if (hasPresentChanged) {
        const prevAnimationName = prevAnimationNameRef.current;
        const currentAnimationName = getAnimationName(styles);
        if (present) {
          send("MOUNT");
        } else if (currentAnimationName === "none" || styles?.display === "none") {
          send("UNMOUNT");
        } else {
          const isAnimating = prevAnimationName !== currentAnimationName;
          if (wasPresent && isAnimating) {
            send("ANIMATION_OUT");
          } else {
            send("UNMOUNT");
          }
        }
        prevPresentRef.current = present;
      }
    }, [present, send]);
    useLayoutEffect2(() => {
      if (node) {
        let timeoutId;
        const ownerWindow = node.ownerDocument.defaultView ?? window;
        const handleAnimationEnd = (event) => {
          const currentAnimationName = getAnimationName(stylesRef.current);
          const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
          if (event.target === node && isCurrentAnimation) {
            send("ANIMATION_END");
            if (!prevPresentRef.current) {
              const currentFillMode = node.style.animationFillMode;
              node.style.animationFillMode = "forwards";
              timeoutId = ownerWindow.setTimeout(() => {
                if (node.style.animationFillMode === "forwards") {
                  node.style.animationFillMode = currentFillMode;
                }
              });
            }
          }
        };
        const handleAnimationStart = (event) => {
          if (event.target === node) {
            prevAnimationNameRef.current = getAnimationName(stylesRef.current);
          }
        };
        node.addEventListener("animationstart", handleAnimationStart);
        node.addEventListener("animationcancel", handleAnimationEnd);
        node.addEventListener("animationend", handleAnimationEnd);
        return () => {
          ownerWindow.clearTimeout(timeoutId);
          node.removeEventListener("animationstart", handleAnimationStart);
          node.removeEventListener("animationcancel", handleAnimationEnd);
          node.removeEventListener("animationend", handleAnimationEnd);
        };
      } else {
        send("ANIMATION_END");
      }
    }, [node, send]);
    return {
      isPresent: ["mounted", "unmountSuspended"].includes(state),
      ref: React24.useCallback((node2) => {
        stylesRef.current = node2 ? getComputedStyle(node2) : null;
        setNode(node2);
      }, [])
    };
  }
  function setRef2(ref, value) {
    if (typeof ref === "function") {
      return ref(value);
    } else if (ref !== null && ref !== void 0) {
      ref.current = value;
    }
  }
  function useStableComposedRefs(...refs) {
    const refsRef = React24.useRef(refs);
    refsRef.current = refs;
    return React24.useCallback((node) => {
      const currentRefs = refsRef.current;
      let hasCleanup = false;
      const cleanups = currentRefs.map((ref) => {
        const cleanup = setRef2(ref, node);
        if (!hasCleanup && typeof cleanup === "function") {
          hasCleanup = true;
        }
        return cleanup;
      });
      if (hasCleanup) {
        return () => {
          for (let i = 0; i < cleanups.length; i++) {
            const cleanup = cleanups[i];
            if (typeof cleanup === "function") {
              cleanup();
            } else {
              setRef2(currentRefs[i], null);
            }
          }
        };
      }
    }, []);
  }
  function getAnimationName(styles) {
    return styles?.animationName || "none";
  }
  function getElementRef2(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.props.ref;
    }
    return element.props.ref || element.ref;
  }

  // node_modules/@radix-ui/react-tabs/dist/index.mjs
  var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
  var TABS_NAME = "Tabs";
  var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
    createRovingFocusGroupScope
  ]);
  var useRovingFocusGroupScope = createRovingFocusGroupScope();
  var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
  var Tabs = React25.forwardRef(
    (props, forwardedRef) => {
      const {
        __scopeTabs,
        value: valueProp,
        onValueChange,
        defaultValue,
        orientation = "horizontal",
        dir,
        activationMode = "automatic",
        ...tabsProps
      } = props;
      const direction = useDirection(dir);
      const [value, setValue] = useControllableState({
        prop: valueProp,
        onChange: onValueChange,
        defaultProp: defaultValue ?? "",
        caller: TABS_NAME
      });
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        TabsProvider,
        {
          scope: __scopeTabs,
          baseId: useId(),
          value,
          onValueChange: setValue,
          orientation,
          dir: direction,
          activationMode,
          children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            Primitive.div,
            {
              dir: direction,
              "data-orientation": orientation,
              ...tabsProps,
              ref: forwardedRef
            }
          )
        }
      );
    }
  );
  Tabs.displayName = TABS_NAME;
  var TAB_LIST_NAME = "TabsList";
  var TabsList = React25.forwardRef(
    (props, forwardedRef) => {
      const { __scopeTabs, loop = true, ...listProps } = props;
      const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
      const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        Root,
        {
          asChild: true,
          ...rovingFocusGroupScope,
          orientation: context.orientation,
          dir: context.dir,
          loop,
          children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            Primitive.div,
            {
              role: "tablist",
              "aria-orientation": context.orientation,
              ...listProps,
              ref: forwardedRef
            }
          )
        }
      );
    }
  );
  TabsList.displayName = TAB_LIST_NAME;
  var TRIGGER_NAME2 = "TabsTrigger";
  var TabsTrigger = React25.forwardRef(
    (props, forwardedRef) => {
      const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
      const context = useTabsContext(TRIGGER_NAME2, __scopeTabs);
      const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
      const triggerId = makeTriggerId(context.baseId, value);
      const contentId = makeContentId(context.baseId, value);
      const isSelected = value === context.value;
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        Item,
        {
          asChild: true,
          ...rovingFocusGroupScope,
          focusable: !disabled,
          active: isSelected,
          children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            Primitive.button,
            {
              type: "button",
              role: "tab",
              "aria-selected": isSelected,
              "aria-controls": contentId,
              "data-state": isSelected ? "active" : "inactive",
              "data-disabled": disabled ? "" : void 0,
              disabled,
              id: triggerId,
              ...triggerProps,
              ref: forwardedRef,
              onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
                if (!disabled && event.button === 0 && event.ctrlKey === false) {
                  context.onValueChange(value);
                } else {
                  event.preventDefault();
                }
              }),
              onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
              }),
              onFocus: composeEventHandlers(props.onFocus, () => {
                const isAutomaticActivation = context.activationMode !== "manual";
                if (!isSelected && !disabled && isAutomaticActivation) {
                  context.onValueChange(value);
                }
              })
            }
          )
        }
      );
    }
  );
  TabsTrigger.displayName = TRIGGER_NAME2;
  var CONTENT_NAME = "TabsContent";
  var TabsContent = React25.forwardRef(
    (props, forwardedRef) => {
      const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
      const context = useTabsContext(CONTENT_NAME, __scopeTabs);
      const triggerId = makeTriggerId(context.baseId, value);
      const contentId = makeContentId(context.baseId, value);
      const isSelected = value === context.value;
      const isMountAnimationPreventedRef = React25.useRef(isSelected);
      React25.useEffect(() => {
        const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
        return () => cancelAnimationFrame(rAF);
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        Primitive.div,
        {
          "data-state": isSelected ? "active" : "inactive",
          "data-orientation": context.orientation,
          role: "tabpanel",
          "aria-labelledby": triggerId,
          hidden: !present,
          id: contentId,
          tabIndex: 0,
          ...contentProps,
          ref: forwardedRef,
          style: {
            ...props.style,
            animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
          },
          children: present && children
        }
      ) });
    }
  );
  TabsContent.displayName = CONTENT_NAME;
  function makeTriggerId(baseId, value) {
    return `${baseId}-trigger-${value}`;
  }
  function makeContentId(baseId, value) {
    return `${baseId}-content-${value}`;
  }
  var Root2 = Tabs;
  var List = TabsList;
  var Trigger = TabsTrigger;
  var Content = TabsContent;

  // src/components/ui/tabs.tsx
  var import_jsx_runtime16 = __toESM(require_jsx_runtime());
  var Tabs2 = Root2;
  var TabsList2 = React26.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    List,
    {
      ref,
      className: cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      ),
      ...props
    }
  ));
  TabsList2.displayName = List.displayName;
  var TabsTrigger2 = React26.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    Trigger,
    {
      ref,
      className: cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      ),
      ...props
    }
  ));
  TabsTrigger2.displayName = Trigger.displayName;
  var TabsContent2 = React26.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    Content,
    {
      ref,
      className: cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=inactive]:hidden",
        className
      ),
      ...props
    }
  ));
  TabsContent2.displayName = Content.displayName;

  // src/components/ui/toast.tsx
  var React27 = __toESM(require_react());
  var import_jsx_runtime17 = __toESM(require_jsx_runtime());
  function Toast({ toast }) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
      "div",
      {
        className: cn(
          "flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right transition-all",
          toast.type === "success" && "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
          toast.type === "error" && "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-100",
          toast.type === "info" && "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100"
        ),
        children: [
          toast.type === "success" && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(CircleCheck, { className: "h-4 w-4" }),
          toast.type === "error" && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Circle, { className: "h-4 w-4" }),
          toast.type === "info" && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Info, { className: "h-4 w-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "text-sm font-medium", children: toast.message })
        ]
      }
    );
  }
  function ToastContainer() {
    const [toasts, setToasts] = React27.useState([]);
    React27.useEffect(() => {
      const handleToast = (e) => {
        setToasts((prev) => [...prev, e.detail]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== e.detail.id));
        }, 4e3);
      };
      window.addEventListener("opspost-toast", handleToast);
      return () => window.removeEventListener("opspost-toast", handleToast);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "fixed bottom-4 right-4 z-[2147483647] flex flex-col gap-2", children: toasts.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Toast, { toast, onRemove: () => setToasts((prev) => prev.filter((t) => t.id !== toast.id)) }, toast.id)) });
  }
  function showToast(message, type = "info") {
    const toast = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message,
      type
    };
    window.dispatchEvent(new CustomEvent("opspost-toast", { detail: toast }));
  }

  // src/components/base/TemplateCard.tsx
  var import_jsx_runtime18 = __toESM(require_jsx_runtime());
  function TemplateCard({
    template,
    onEdit,
    onDelete,
    onToggleFavorite,
    onCopy,
    onOpen,
    showFullText = false,
    className,
    color,
    textColor,
    fontFamily,
    cardStyle,
    draggable,
    onDragStart,
    onDragOver,
    onDrop
  }) {
    const paletteColor = {
      amber: "#fffbeb",
      green: "#ecfdf5",
      blue: "#eff6ff",
      rose: "#fff1f2",
      slate: "#f8fafc"
    }[template.color || ""];
    const resolvedColor = color || paletteColor;
    const accentColor = deriveCardAccent(resolvedColor);
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
      "div",
      {
        draggable,
        onDragStart,
        onDragOver,
        onDrop,
        style: {
          ...cardStyle,
          backgroundColor: resolvedColor,
          color: textColor || void 0,
          fontFamily: fontFamily === "inherit" ? void 0 : fontFamily,
          borderColor: accentColor || void 0
        },
        className: cn(
          "relative flex flex-col overflow-hidden rounded-lg border p-3 text-slate-900 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer",
          draggable && "active:cursor-grabbing",
          className,
          !resolvedColor && template.favorite ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800" : !resolvedColor && "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "absolute inset-y-0 left-0 w-1.5 bg-primary/70", style: { backgroundColor: accentColor || void 0 } }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex justify-between gap-2 mb-2 shrink-0 pl-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex items-center gap-1.5 min-w-0 opacity-80", children: [
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(FileText, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-[10px] uppercase tracking-wide truncate", children: template.tag || "\u0417\u0430\u043C\u0435\u0442\u043A\u0430" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Button, { size: "icon", variant: "ghost", className: "h-6 w-6", onClick: (event) => {
                event.stopPropagation();
                onCopy();
              }, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Copy, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: cn("h-6 w-6", template.favorite && "text-amber-500"),
                  onClick: (event) => {
                    event.stopPropagation();
                    onToggleFavorite();
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Star, { className: cn("h-3 w-3", template.favorite && "fill-current") })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Button, { size: "icon", variant: "ghost", className: "h-6 w-6", onClick: (event) => {
                event.stopPropagation();
                onEdit();
              }, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Pencil, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Button, { size: "icon", variant: "ghost", className: "h-6 w-6 hover:text-destructive", onClick: (event) => {
                event.stopPropagation();
                onDelete();
              }, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Trash2, { className: "h-3 w-3" }) })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex-1 overflow-hidden pl-1.5", onClick: onOpen, children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "font-semibold text-sm mb-1 truncate", children: template.title }),
            template.tag && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Badge, { variant: "secondary", className: "text-[10px] py-0 mb-2", children: template.tag }),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              "div",
              {
                className: cn(
                  "text-xs whitespace-pre-wrap leading-relaxed opacity-90",
                  showFullText ? "" : "line-clamp-4"
                ),
                children: template.text
              }
            )
          ] })
        ]
      }
    );
  }
  function deriveCardAccent(color) {
    if (!color || !color.startsWith("#")) return void 0;
    const hex = color.replace("#", "");
    const normalized = hex.length === 3 ? hex.split("").map((char) => char + char).join("") : hex;
    if (normalized.length !== 6) return void 0;
    const red = parseInt(normalized.slice(0, 2), 16);
    const green = parseInt(normalized.slice(2, 4), 16);
    const blue = parseInt(normalized.slice(4, 6), 16);
    if ([red, green, blue].some((value) => Number.isNaN(value))) return void 0;
    const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
    const mix = luminance < 96 ? (value) => Math.min(255, Math.round(value * 0.62 + 255 * 0.22)) : (value) => Math.max(0, Math.round(value * 0.58));
    return `rgb(${mix(red)}, ${mix(green)}, ${mix(blue)})`;
  }

  // src/components/base/TemplateEditor.tsx
  var import_react7 = __toESM(require_react());

  // src/components/ui/textarea.tsx
  var React28 = __toESM(require_react());
  var import_jsx_runtime19 = __toESM(require_jsx_runtime());
  var Textarea = React28.forwardRef(
    ({ className, ...props }, ref) => {
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        "textarea",
        {
          className: cn(
            "flex min-h-[60px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          ),
          ref,
          ...props
        }
      );
    }
  );
  Textarea.displayName = "Textarea";

  // src/components/base/TemplateEditor.tsx
  var import_jsx_runtime20 = __toESM(require_jsx_runtime());
  function TemplateEditor({
    template,
    isNew,
    onSave,
    onCancel,
    allTags,
    variables,
    language
  }) {
    const [title, setTitle] = import_react7.default.useState(template?.title || "");
    const [text, setText] = import_react7.default.useState(template?.text || "");
    const [tag, setTag] = import_react7.default.useState(template?.tag || "");
    const [showTagDropdown, setShowTagDropdown] = import_react7.default.useState(false);
    const titleRef = import_react7.default.useRef(null);
    const textRef = import_react7.default.useRef(null);
    const t = import_react7.default.useCallback((key) => translate(language, key), [language]);
    import_react7.default.useEffect(() => {
      if (isNew || template) {
        setTitle(template?.title || "");
        setText(template?.text || "");
        setTag(template?.tag || "");
        window.setTimeout(() => titleRef.current?.focus(), 100);
      }
    }, [template, isNew]);
    if (!isNew && !template) {
      return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "py-6 text-center text-xs text-muted-foreground", children: t("selectedNoteHint") });
    }
    const handleSubmit = () => {
      if (!title.trim() || !text.trim()) {
        alert(t("fillNoteFields"));
        return;
      }
      onSave({
        title: title.trim(),
        text: text.trim(),
        tag: tag.trim() || null,
        color: null,
        favorite: template?.favorite || false
      });
    };
    const filteredTags = allTags.filter((item) => item.toLowerCase().includes(tag.toLowerCase()));
    const insertVariableAtCursor = (variableName) => {
      const token = `{{${variableName}}}`;
      const textarea = textRef.current;
      if (!textarea) {
        setText((current) => `${current}${current.endsWith(" ") || current.length === 0 ? "" : " "}${token}`);
        return;
      }
      const start = textarea.selectionStart ?? text.length;
      const end = textarea.selectionEnd ?? start;
      const nextText = text.slice(0, start) + token + text.slice(end);
      setText(nextText);
      window.requestAnimationFrame(() => {
        textarea.focus();
        const cursor = start + token.length;
        textarea.setSelectionRange(cursor, cursor);
      });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("h3", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: isNew ? t("newNote") : t("editNote") }),
        template && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Button, { size: "icon", variant: "ghost", className: "h-6 w-6", onClick: onCancel, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(X, { className: "h-3 w-3" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            Input,
            {
              ref: titleRef,
              placeholder: t("noteTitlePlaceholder"),
              value: title,
              onChange: (event) => setTitle(event.target.value),
              maxLength: 50,
              className: "h-10 text-base"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "mt-0.5 text-right text-[10px] text-muted-foreground", children: [
            50 - title.length,
            " ",
            t("charsShort")
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            Input,
            {
              placeholder: t("tagPlaceholder"),
              value: tag,
              onChange: (event) => {
                setTag(event.target.value);
                setShowTagDropdown(true);
              },
              onFocus: () => setShowTagDropdown(true),
              onBlur: () => window.setTimeout(() => setShowTagDropdown(false), 200),
              className: "h-10 text-base"
            }
          ),
          showTagDropdown && filteredTags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "absolute left-0 right-0 top-full z-10 mt-1 max-h-[120px] overflow-y-auto rounded-md border bg-background shadow-lg", children: filteredTags.map((item) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            "button",
            {
              className: "w-full px-2 py-1.5 text-left text-xs hover:bg-muted",
              onMouseDown: () => {
                setTag(item);
                setShowTagDropdown(false);
              },
              children: item
            },
            item
          )) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          Textarea,
          {
            ref: textRef,
            placeholder: t("noteTextPlaceholder"),
            value: text,
            onChange: (event) => setText(event.target.value),
            rows: 14,
            className: "min-h-[300px] resize-y text-base leading-relaxed"
          }
        ),
        variables.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "rounded-md border bg-muted/30 p-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "mb-2 text-[10px] uppercase tracking-wide text-muted-foreground", children: t("insertVariable") }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "flex flex-wrap gap-1", children: variables.map((variable) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              className: "h-6 text-[11px]",
              onMouseDown: (event) => event.preventDefault(),
              onClick: () => insertVariableAtCursor(variable.name),
              children: `{{${variable.name}}}`
            },
            variable.id
          )) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(Button, { size: "sm", className: "flex-1", onClick: handleSubmit, children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Save, { className: "mr-1 h-3 w-3" }),
            isNew ? t("create") : t("save")
          ] }),
          template && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Button, { size: "sm", variant: "outline", onClick: onCancel, children: t("cancel") })
        ] })
      ] })
    ] });
  }

  // src/components/base/TagFilter.tsx
  var import_react8 = __toESM(require_react());
  var import_jsx_runtime21 = __toESM(require_jsx_runtime());
  function TagFilter({ tags, selected, language, onChange }) {
    const [open, setOpen] = import_react8.default.useState(false);
    const dropdownRef = import_react8.default.useRef(null);
    const t = import_react8.default.useCallback((key) => translate(language, key), [language]);
    import_react8.default.useEffect(() => {
      const handleClick = (event) => {
        const path = event.composedPath();
        if (dropdownRef.current && !path.includes(dropdownRef.current)) {
          setOpen(false);
        }
      };
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }, []);
    if (tags.length === 0) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { ref: dropdownRef, className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(Button, { size: "sm", variant: "outline", onClick: () => setOpen((value) => !value), children: [
        t("tags"),
        selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "ml-1.5 rounded bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground", children: selected.length }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(ChevronDown, { className: "ml-1 h-3 w-3" })
      ] }),
      open && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "absolute left-0 top-full z-50 mt-1 max-h-[220px] min-w-[200px] overflow-y-auto rounded-lg border bg-popover text-popover-foreground shadow-xl", children: [
        selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          "button",
          {
            type: "button",
            className: "w-full border-b px-3 py-2 text-left text-xs font-medium text-destructive hover:bg-muted",
            onClick: () => onChange([]),
            children: t("clearTagFilter")
          }
        ),
        tags.map((tag) => {
          const active = selected.includes(tag);
          return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
            "button",
            {
              type: "button",
              className: cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left text-xs hover:bg-muted",
                active && "bg-muted"
              ),
              onClick: () => {
                onChange(active ? selected.filter((item) => item !== tag) : [...selected, tag]);
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                  "span",
                  {
                    className: cn(
                      "flex h-3.5 w-3.5 items-center justify-center rounded border",
                      active && "border-primary bg-primary text-primary-foreground"
                    ),
                    children: active && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Check, { className: "h-2.5 w-2.5" })
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "min-w-0 truncate", children: tag })
              ]
            },
            tag
          );
        })
      ] })
    ] });
  }

  // src/components/base/TemplatePreviewModal.tsx
  var import_react9 = __toESM(require_react());
  var import_jsx_runtime22 = __toESM(require_jsx_runtime());
  function TemplatePreviewModal({ template, variables, language, allowInsert, onInserted, onClose }) {
    const [text, setText] = import_react9.default.useState("");
    const t = import_react9.default.useCallback((key) => translate(language, key), [language]);
    import_react9.default.useEffect(() => {
      if (!template) return;
      const resolved = resolveTemplateText(template.text, variables);
      setText(resolved ?? template.text);
    }, [template, variables]);
    if (!template) return null;
    const copyText = () => {
      navigator.clipboard.writeText(text);
      showToast(t("textCopied"), "success");
    };
    const insertText = (autoSend = false) => {
      const success = insertTextToActiveField(text, autoSend);
      if (!success) {
        showToast(t("inputNotFound"), "error");
        return;
      }
      onClose();
      onInserted?.(autoSend);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "fixed inset-0 z-[2147483647] bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 text-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "w-[min(760px,calc(100vw-32px))] max-h-[calc(100vh-48px)] bg-background border rounded-lg shadow-2xl overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center gap-3 border-b px-4 py-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "font-semibold text-sm truncate", children: template.title }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "text-[11px] text-muted-foreground", children: t("previewHint") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Button, { size: "icon", variant: "ghost", className: "h-8 w-8", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "p-4 flex-1 overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Textarea,
        {
          value: text,
          onChange: (event) => setText(event.target.value),
          className: "min-h-[320px] max-h-[60vh] resize-y text-base leading-relaxed"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center justify-between gap-2 border-t px-4 py-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Button, { variant: "outline", onClick: copyText, children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Copy, { className: "h-4 w-4 mr-2" }),
          t("copy")
        ] }),
        allowInsert && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Button, { variant: "secondary", onClick: () => insertText(false), children: t("insert") }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Button, { onClick: () => insertText(true), children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Send, { className: "h-4 w-4 mr-2" }),
            t("insertAndSend")
          ] })
        ] })
      ] })
    ] }) });
  }

  // src/components/base/TodoPanel.tsx
  var import_react10 = __toESM(require_react());
  var import_jsx_runtime23 = __toESM(require_jsx_runtime());
  function TodoPanel() {
    const todos = useAppStore((state) => state.todos);
    const language = useAppStore((state) => state.settings.uiLanguage);
    const addTodo = useAppStore((state) => state.addTodo);
    const updateTodo = useAppStore((state) => state.updateTodo);
    const toggleTodo = useAppStore((state) => state.toggleTodo);
    const deleteTodo = useAppStore((state) => state.deleteTodo);
    const clearDoneTodos = useAppStore((state) => state.clearDoneTodos);
    const [text, setText] = import_react10.default.useState("");
    const [dueAt, setDueAt] = import_react10.default.useState("");
    const [reminderAt, setReminderAt] = import_react10.default.useState("");
    const [priority, setPriority] = import_react10.default.useState("normal");
    const [filter, setFilter] = import_react10.default.useState("all");
    const t = import_react10.default.useCallback((key) => translate(language, key), [language]);
    const now = Date.now();
    const doneCount = todos.filter((todo) => todo.done).length;
    const activeCount = todos.length - doneCount;
    const dueCount = todos.filter((todo) => isOverdue(todo, now)).length;
    const reminderCount = todos.filter((todo) => isReminderReady(todo, now)).length;
    const sortedTodos = import_react10.default.useMemo(() => {
      return [...todos].sort((left, right) => {
        if (left.done !== right.done) return left.done ? 1 : -1;
        const leftDate = left.dueAt ? new Date(left.dueAt).getTime() : Number.POSITIVE_INFINITY;
        const rightDate = right.dueAt ? new Date(right.dueAt).getTime() : Number.POSITIVE_INFINITY;
        if (leftDate !== rightDate) return leftDate - rightDate;
        return priorityWeight(right.priority) - priorityWeight(left.priority);
      });
    }, [todos]);
    const filteredTodos = sortedTodos.filter((todo) => {
      if (filter === "active") return !todo.done;
      if (filter === "due") return isOverdue(todo, now);
      if (filter === "reminders") return isReminderReady(todo, now);
      if (filter === "done") return todo.done;
      return true;
    });
    const handleAdd = () => {
      addTodo({
        text,
        dueAt: dueAt || null,
        reminderAt: reminderAt || null,
        priority
      });
      setText("");
      setDueAt("");
      setReminderAt("");
      setPriority("normal");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "bg-background p-5", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex w-full flex-col gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("section", { className: "rounded-lg border bg-card p-4 shadow-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("h3", { className: "flex items-center gap-2 text-sm font-semibold", children: [
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ListTodo, { className: "h-4 w-4 text-primary" }),
              t("todoTitle")
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "text-xs text-muted-foreground", children: t("todoDescription") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Button, { size: "sm", variant: "outline", onClick: clearDoneTodos, disabled: doneCount === 0, children: t("clearDone") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mt-4 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            Input,
            {
              placeholder: t("todoPlaceholder"),
              value: text,
              onChange: (event) => setText(event.target.value),
              onKeyDown: (event) => {
                if (event.key === "Enter") handleAdd();
              },
              className: "min-w-[240px] flex-1"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Input, { className: "w-[180px]", type: "datetime-local", value: dueAt, onChange: (event) => setDueAt(event.target.value), title: t("deadline") }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Input, { className: "w-[180px]", type: "datetime-local", value: reminderAt, onChange: (event) => setReminderAt(event.target.value), title: t("remind") }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
            "select",
            {
              className: "h-8 w-[132px] rounded-lg border border-input bg-background px-3 text-sm shadow-sm",
              value: priority,
              onChange: (event) => setPriority(event.target.value),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("option", { value: "low", children: t("low") }),
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("option", { value: "normal", children: t("normal") }),
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("option", { value: "high", children: t("high") })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(Button, { onClick: handleAdd, children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Plus, { className: "mr-1 h-4 w-4" }),
            t("add")
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mt-4 flex flex-wrap gap-2 text-xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(FilterButton, { active: filter === "all", onClick: () => setFilter("all"), children: [
            t("all"),
            ": ",
            todos.length
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(FilterButton, { active: filter === "active", onClick: () => setFilter("active"), children: [
            t("active"),
            ": ",
            activeCount
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(FilterButton, { active: filter === "due", danger: dueCount > 0, onClick: () => setFilter("due"), children: [
            t("overdue"),
            ": ",
            dueCount
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(FilterButton, { active: filter === "reminders", onClick: () => setFilter("reminders"), children: [
            t("reminders"),
            ": ",
            reminderCount
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(FilterButton, { active: filter === "done", onClick: () => setFilter("done"), children: [
            t("done"),
            ": ",
            doneCount
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("section", { className: "space-y-2", children: filteredTodos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground", children: t("todoEmpty") }) : filteredTodos.map((todo) => {
        const overdue = isOverdue(todo, now);
        const reminderReady = isReminderReady(todo, now);
        return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "article",
          {
            className: cn(
              "rounded-lg border bg-card p-3 shadow-sm transition-colors",
              overdue && "border-destructive/50 bg-destructive/5",
              reminderReady && !overdue && "border-amber-500/50 bg-amber-500/5"
            ),
            children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("button", { type: "button", onClick: () => toggleTodo(todo.id), className: "mt-1 text-primary", children: todo.done ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(CircleCheck, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Circle, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "min-w-0 flex-1 space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                  Input,
                  {
                    value: todo.text,
                    onChange: (event) => updateTodo(todo.id, { text: event.target.value }),
                    className: cn("font-medium", todo.done && "line-through text-muted-foreground")
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Input, { className: "w-[180px]", type: "datetime-local", value: todo.dueAt || "", onChange: (event) => updateTodo(todo.id, { dueAt: event.target.value || null }), title: t("deadline") }),
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Input, { className: "w-[180px]", type: "datetime-local", value: todo.reminderAt || "", onChange: (event) => updateTodo(todo.id, { reminderAt: event.target.value || null }), title: t("remind") }),
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
                    "select",
                    {
                      className: "h-8 w-[132px] rounded-lg border border-input bg-background px-3 text-sm shadow-sm",
                      value: todo.priority,
                      onChange: (event) => updateTodo(todo.id, { priority: event.target.value }),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("option", { value: "low", children: t("low") }),
                        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("option", { value: "normal", children: t("normal") }),
                        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("option", { value: "high", children: t("high") })
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex min-w-[220px] flex-1 flex-wrap items-center gap-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(PriorityBadge, { priority: todo.priority, language }),
                    todo.dueAt && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(Badge, { variant: overdue ? "destructive" : "secondary", className: "gap-1", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(CalendarClock, { className: "h-3 w-3" }),
                      overdue ? `${t("overdue")}: ` : `${t("deadline")}: `,
                      formatDate2(todo.dueAt, language)
                    ] }),
                    todo.reminderAt && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(Badge, { variant: reminderReady ? "default" : "outline", className: "gap-1", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(AlarmClock, { className: "h-3 w-3" }),
                      reminderReady ? t("reminderReady") : t("reminderAt"),
                      formatDate2(todo.reminderAt, language)
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-destructive", onClick: () => deleteTodo(todo.id), title: t("deleteTask"), children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Trash2, { className: "h-4 w-4" }) })
            ] })
          },
          todo.id
        );
      }) })
    ] }) });
  }
  function FilterButton({
    active,
    danger,
    onClick,
    children
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      "button",
      {
        type: "button",
        onClick,
        className: cn(
          "rounded-full border px-3 py-1 transition-colors",
          active ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted",
          danger && !active && "border-destructive/50 text-destructive"
        ),
        children
      }
    );
  }
  function PriorityBadge({ priority, language }) {
    const label = priority === "high" ? translate(language, "high") : priority === "low" ? translate(language, "low") : translate(language, "normal");
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(Badge, { variant: priority === "high" ? "destructive" : "outline", className: "gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Flag, { className: "h-3 w-3" }),
      label
    ] });
  }
  function isOverdue(todo, now) {
    return Boolean(!todo.done && todo.dueAt && new Date(todo.dueAt).getTime() < now);
  }
  function isReminderReady(todo, now) {
    return Boolean(!todo.done && todo.reminderAt && new Date(todo.reminderAt).getTime() < now);
  }
  function priorityWeight(priority) {
    if (priority === "high") return 3;
    if (priority === "normal") return 2;
    return 1;
  }
  function formatDate2(value, language) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(language === "en" ? "en-US" : "ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  // src/components/base/VariablesPanel.tsx
  var import_react11 = __toESM(require_react());
  var import_jsx_runtime24 = __toESM(require_jsx_runtime());
  function VariablesPanel() {
    const templates = useAppStore((state) => state.templates);
    const variables = useAppStore((state) => state.variables);
    const language = useAppStore((state) => state.settings.uiLanguage);
    const addVariable = useAppStore((state) => state.addVariable);
    const updateVariable = useAppStore((state) => state.updateVariable);
    const deleteVariable = useAppStore((state) => state.deleteVariable);
    const [name, setName] = import_react11.default.useState("");
    const [value, setValue] = import_react11.default.useState("");
    const t = import_react11.default.useCallback(
      (key, params) => translate(language, key, params),
      [language]
    );
    const savedNames = import_react11.default.useMemo(
      () => new Set(variables.map((variable) => variable.name.toLowerCase())),
      [variables]
    );
    const foundVariables = import_react11.default.useMemo(() => {
      const map = /* @__PURE__ */ new Map();
      const variablePattern = /\{\{\s*([\w.-]+)\s*\}\}/g;
      templates.forEach((template) => {
        for (const match of template.text.matchAll(variablePattern)) {
          const rawName = match[1]?.trim();
          if (!rawName || rawName.toLowerCase() === "date") continue;
          const key = rawName.toLowerCase();
          const existing = map.get(key);
          map.set(key, {
            name: existing?.name || rawName,
            count: (existing?.count || 0) + 1
          });
        }
      });
      return [...map.values()].sort((left, right) => left.name.localeCompare(right.name));
    }, [templates]);
    const missingVariables = foundVariables.filter((variable) => !savedNames.has(variable.name.toLowerCase()));
    const handleAdd = (nextName = name, nextValue = value) => {
      const normalizedName = nextName.trim().replace(/\s+/g, "_");
      if (!normalizedName) return;
      addVariable({ name: normalizedName, value: nextValue });
      setName("");
      setValue("");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "bg-background p-5", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex w-full flex-col gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("section", { className: "rounded-lg border bg-card p-4 shadow-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("h3", { className: "flex items-center gap-2 text-sm font-semibold", children: [
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Braces, { className: "h-4 w-4 text-primary" }),
              t("variablesTitle")
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-xs text-muted-foreground", children: t("variablesDescription", { example: "{{agent_name}}" }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(Badge, { variant: missingVariables.length > 0 ? "destructive" : "secondary", children: [
            t("found"),
            ": ",
            foundVariables.length
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "mt-4 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Input, { className: "min-w-[180px] flex-1", placeholder: "agent_name", value: name, onChange: (event) => setName(event.target.value) }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Input, { className: "min-w-[220px] flex-[1.4]", placeholder: t("variableValuePlaceholder"), value, onChange: (event) => setValue(event.target.value) }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(Button, { onClick: () => handleAdd(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Plus, { className: "mr-1 h-4 w-4" }),
            t("add")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("section", { className: "rounded-lg border bg-card p-4 shadow-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "mb-3 flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("h3", { className: "flex items-center gap-2 text-sm font-semibold", children: [
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Search, { className: "h-4 w-4 text-primary" }),
              t("variablesFoundTitle")
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "mt-1 text-xs text-muted-foreground", children: t("variablesFoundDescription") })
          ] }),
          missingVariables.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(Button, { size: "sm", variant: "outline", onClick: () => missingVariables.forEach((variable) => handleAdd(variable.name, "")), children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(WandSparkles, { className: "mr-1.5 h-3.5 w-3.5" }),
            t("createMissing")
          ] })
        ] }),
        foundVariables.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground", children: t("noVariablesInNotes", { example: "{{agent_name}}" }) }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "flex flex-wrap gap-2", children: foundVariables.map((variable) => {
          const saved = savedNames.has(variable.name.toLowerCase());
          return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
            "button",
            {
              type: "button",
              className: cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors",
                saved ? "bg-emerald-500/10 border-emerald-500/30" : "bg-amber-500/10 border-amber-500/40 hover:bg-amber-500/20"
              ),
              onClick: () => {
                if (!saved) handleAdd(variable.name, "");
              },
              children: [
                saved ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Plus, { className: "h-3.5 w-3.5 text-amber-500" }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { children: `{{${variable.name}}}` }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("span", { className: "text-muted-foreground", children: [
                  "x",
                  variable.count
                ] })
              ]
            },
            variable.name
          );
        }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("section", { className: "space-y-2", children: variables.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground", children: t("noSavedVariables") }) : variables.map((variable) => /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex flex-wrap gap-2 rounded-lg border bg-card p-3 shadow-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Input, { className: "min-w-[180px] flex-1", value: variable.name, onChange: (event) => updateVariable(variable.id, { name: event.target.value.trim().replace(/\s+/g, "_") }) }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Input, { className: "min-w-[220px] flex-[1.4]", value: variable.value, onChange: (event) => updateVariable(variable.id, { value: event.target.value }) }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Button, { size: "icon", variant: "ghost", className: "text-destructive", onClick: () => deleteVariable(variable.id), title: t("deleteVariable"), children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Trash2, { className: "h-4 w-4" }) })
      ] }, variable.id)) })
    ] }) });
  }

  // src/base/KnowledgeBase.tsx
  var import_jsx_runtime25 = __toESM(require_jsx_runtime());
  var CARD_PRESET_NAMES = {
    lagoon: "presetLagoon",
    orchid: "presetOrchid",
    graphite: "presetGraphite"
  };
  function KnowledgeBase({ embedded = false, onAfterInsert } = {}) {
    const {
      templates,
      variables,
      settings,
      updateSettings,
      addTemplate,
      updateTemplate,
      deleteTemplate,
      reorderTemplates,
      toggleFavorite,
      importTemplates
    } = useAppStore();
    const [searchQuery, setSearchQuery] = import_react12.default.useState("");
    const [showFavorites, setShowFavorites] = import_react12.default.useState(false);
    const [selectedTags, setSelectedTags] = import_react12.default.useState([]);
    const [editingTemplate, setEditingTemplate] = import_react12.default.useState(null);
    const [isCreating, setIsCreating] = import_react12.default.useState(false);
    const [draggingTemplateId, setDraggingTemplateId] = import_react12.default.useState(null);
    const [previewTemplate, setPreviewTemplate] = import_react12.default.useState(null);
    const fileInputRef = import_react12.default.useRef(null);
    const t = import_react12.default.useCallback(
      (key, params) => translate(settings.uiLanguage, key, params),
      [settings.uiLanguage]
    );
    const activeTab = getVisibleTab(settings);
    const editorOpen = isCreating || Boolean(editingTemplate);
    import_react12.default.useEffect(() => {
      document.documentElement.classList.toggle("dark", settings.theme === "dark");
    }, [settings.theme]);
    import_react12.default.useEffect(() => {
      const nextTab = getVisibleTab(settings);
      if (nextTab !== settings.lastBaseTab) updateSettings({ lastBaseTab: nextTab });
    }, [settings, updateSettings]);
    const allTags = import_react12.default.useMemo(() => {
      return [...new Set(templates.map((template) => template.tag).filter(Boolean))];
    }, [templates]);
    const filteredTemplates = import_react12.default.useMemo(() => {
      return templates.filter((template) => {
        if (showFavorites && !template.favorite) return false;
        if (selectedTags.length > 0 && (!template.tag || !selectedTags.includes(template.tag))) return false;
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return template.title.toLowerCase().includes(query) || template.text.toLowerCase().includes(query) || Boolean(template.tag?.toLowerCase().includes(query));
        }
        return true;
      }).sort((a, b) => a.order - b.order);
    }, [templates, searchQuery, showFavorites, selectedTags]);
    const masonryColumns = import_react12.default.useMemo(() => {
      const columnCount = Math.max(1, settings.gridCols);
      const columns = Array.from({ length: columnCount }, () => ({ height: 0, items: [] }));
      filteredTemplates.forEach((template) => {
        const shortestColumn = columns.reduce((shortest, column, index) => column.height < columns[shortest].height ? index : shortest, 0);
        columns[shortestColumn].items.push(template);
        columns[shortestColumn].height += 120 + template.text.length * 0.45 + template.title.length * 0.8;
      });
      return columns.map((column) => column.items);
    }, [filteredTemplates, settings.gridCols]);
    const handleExport = () => {
      const blob = new Blob([JSON.stringify(templates, null, 2)], { type: "application/json" });
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blob);
      anchor.download = `blobnote_backup_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
      anchor.click();
      showToast(t("templatesExported"), "success");
    };
    const handleImport = (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result);
          if (Array.isArray(data)) {
            importTemplates(data);
            showToast(t("templatesImported"), "success");
          }
        } catch {
          showToast(t("jsonParseError"), "error");
        }
      };
      reader.readAsText(file);
    };
    const handleDropTemplate = (targetId) => {
      if (!draggingTemplateId || draggingTemplateId === targetId) return;
      const templateIds = filteredTemplates.map((template) => template.id);
      const fromIndex = templateIds.indexOf(draggingTemplateId);
      const toIndex = templateIds.indexOf(targetId);
      if (fromIndex === -1 || toIndex === -1) return;
      const nextIds = [...templateIds];
      const [movedId] = nextIds.splice(fromIndex, 1);
      nextIds.splice(toIndex, 0, movedId);
      reorderTemplates(nextIds);
      setDraggingTemplateId(null);
    };
    const handleSaveTemplate = (data) => {
      if (editingTemplate) {
        updateTemplate(editingTemplate.id, data);
        showToast(t("noteUpdated"), "success");
      } else {
        addTemplate(data);
        showToast(t("noteCreated"), "success");
      }
      closeEditor();
    };
    const closeEditor = () => {
      setEditingTemplate(null);
      setIsCreating(false);
    };
    const addStarterTemplates = () => {
      [
        {
          title: "\u041F\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435",
          tag: "\u0421\u0442\u0430\u0440\u0442",
          favorite: true,
          color: "blue",
          text: "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u041C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 {{agent_name}}. \u0423\u0436\u0435 \u0441\u043C\u043E\u0442\u0440\u044E \u0432\u0430\u0448 \u0432\u043E\u043F\u0440\u043E\u0441 \u0438 \u0441\u043A\u043E\u0440\u043E \u0432\u0435\u0440\u043D\u0443\u0441\u044C \u0441 \u043E\u0442\u0432\u0435\u0442\u043E\u043C."
        },
        {
          title: "\u0423\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445",
          tag: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430",
          favorite: true,
          color: "amber",
          text: "\u041F\u043E\u0434\u0441\u043A\u0430\u0436\u0438\u0442\u0435, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430 \u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0431\u044B\u043B \u0443\u043A\u0430\u0437\u0430\u043D \u043F\u0440\u0438 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0438. \u0422\u0430\u043A \u044F \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u043D\u0430\u0439\u0434\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E."
        },
        {
          title: "\u041F\u0430\u0443\u0437\u0430 \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443",
          tag: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430",
          favorite: false,
          color: "slate",
          text: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E, \u0432\u0437\u044F\u043B(\u0430) \u0432 \u0440\u0430\u0431\u043E\u0442\u0443. \u041C\u043D\u0435 \u043F\u043E\u043D\u0430\u0434\u043E\u0431\u0438\u0442\u0441\u044F \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D\u0443\u0442, \u0447\u0442\u043E\u0431\u044B \u0432\u0441\u0451 \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C."
        },
        {
          title: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0435",
          tag: "\u0424\u0438\u043D\u0430\u043B",
          favorite: false,
          color: "green",
          text: "\u0420\u0430\u0434(\u0430), \u0447\u0442\u043E \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043C\u043E\u0447\u044C. \u0415\u0441\u043B\u0438 \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u0435\u0449\u0451 \u0432\u043E\u043F\u0440\u043E\u0441\u044B, \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C \u0432 \u043B\u044E\u0431\u043E\u0435 \u0432\u0440\u0435\u043C\u044F."
        }
      ].forEach((template) => addTemplate(template));
      showToast(t("starterAdded"), "success");
    };
    const applyPreset = (preset) => {
      updateSettings({
        cardPreset: preset.cardPreset,
        defaultCardColor: preset.defaultCardColor,
        favoriteCardColor: preset.favoriteCardColor,
        cardTextColor: preset.cardTextColor,
        cardFontFamily: preset.cardFontFamily
      });
    };
    const resetAppearance = () => applyPreset(CARD_PRESETS[settings.theme].lagoon);
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: `${embedded ? "h-full" : "h-screen"} ${settings.theme === "dark" ? "dark" : ""} flex flex-col overflow-hidden bg-background text-foreground`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("header", { className: `z-30 flex shrink-0 flex-wrap items-center justify-between gap-4 border-b bg-background px-4 py-2 shadow-sm ${embedded ? "pr-16" : ""}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("h1", { className: "flex shrink-0 items-center gap-3 text-sm font-semibold", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(BrandLogo, { title: t("appName") }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "sr-only", children: t("appName") }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "hidden whitespace-nowrap text-muted-foreground sm:inline", children: t("baseSubtitle") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-wrap items-center justify-end gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
            SettingSelect,
            {
              icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Languages, { className: "h-3.5 w-3.5" }),
              label: t("language"),
              value: settings.uiLanguage,
              onChange: (value) => updateSettings({ uiLanguage: value }),
              options: LANGUAGE_OPTIONS
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(SettingSwitch, { icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Moon, { className: "h-3.5 w-3.5" }), label: t("darkTheme"), checked: settings.theme === "dark", onCheckedChange: (checked) => updateSettings({ theme: checked ? "dark" : "light" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
            SettingSelect,
            {
              icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(AtSign, { className: "h-3.5 w-3.5" }),
              label: t("trigger"),
              value: settings.searchTrigger,
              onChange: (value) => updateSettings({ searchTrigger: value }),
              options: [{ value: "/", label: "/" }, { value: "@", label: "@" }]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(SettingSwitch, { icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(AtSign, { className: "h-3.5 w-3.5" }), label: `${settings.searchTrigger}-${t("atSearch")}`, checked: settings.atMenuEnabled, onCheckedChange: (checked) => updateSettings({ atMenuEnabled: checked }) }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(SettingSwitch, { icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(PanelTopOpen, { className: "h-3.5 w-3.5" }), label: t("panel"), checked: settings.floatingPanelEnabled, onCheckedChange: (checked) => updateSettings({ floatingPanelEnabled: checked }) }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(SettingSwitch, { icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ClipboardList, { className: "h-3.5 w-3.5" }), label: t("clipboard"), checked: settings.clipboardPanelEnabled, onCheckedChange: (checked) => updateSettings({ clipboardPanelEnabled: checked }) }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(SettingSwitch, { icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(BookOpen, { className: "h-3.5 w-3.5" }), label: t("variables"), checked: settings.showVariablesTab, onCheckedChange: (checked) => updateSettings({ showVariablesTab: checked }) }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(SettingSwitch, { icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(FileText, { className: "h-3.5 w-3.5" }), label: t("tasks"), checked: settings.showTodoTab, onCheckedChange: (checked) => updateSettings({ showTodoTab: checked }) }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("select", { className: "h-8 rounded-md border bg-background px-2 text-xs", value: settings.gridCols, onChange: (event) => updateSettings({ gridCols: parseInt(event.target.value, 10) }), title: t("columnsCount"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("option", { value: 2, children: t("gridCols2") }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("option", { value: 3, children: t("gridCols3") }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("option", { value: 4, children: t("gridCols4") }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("option", { value: 5, children: t("gridCols5") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("select", { className: "h-8 rounded-md border bg-background px-2 text-xs", value: settings.gridHeight, onChange: (event) => updateSettings({ gridHeight: event.target.value }), title: t("cardHeight"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("option", { value: "180px", children: "180px" }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("option", { value: "240px", children: "240px" }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("option", { value: "320px", children: "320px" }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("option", { value: "max-content", children: t("auto") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Button, { size: "icon", variant: "outline", onClick: handleExport, title: t("export"), children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Download, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Button, { size: "icon", variant: "outline", onClick: () => fileInputRef.current?.click(), title: t("import"), children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Upload, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("input", { ref: fileInputRef, type: "file", accept: ".json", className: "hidden", onChange: (event) => {
            const file = event.target.files?.[0];
            if (file) handleImport(file);
          } })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("main", { className: "flex min-h-0 flex-1 flex-col overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Tabs2, { value: activeTab, onValueChange: (value) => updateSettings({ lastBaseTab: value }), className: "flex min-h-0 flex-1 flex-col overflow-hidden", children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "z-20 shrink-0 border-b bg-background px-5 py-3 shadow-sm", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(TabsList2, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(TabsTrigger2, { value: "templates", children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(FileText, { className: "mr-1.5 h-3.5 w-3.5" }),
              t("notesAndTemplates")
            ] }),
            settings.showVariablesTab && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(TabsTrigger2, { value: "variables", children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(BookOpen, { className: "mr-1.5 h-3.5 w-3.5" }),
              t("variables")
            ] }),
            settings.showTodoTab && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(TabsTrigger2, { value: "todo", children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(LayoutGrid, { className: "mr-1.5 h-3.5 w-3.5" }),
              t("tasks")
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(PresetStrip, { theme: settings.theme, language: settings.uiLanguage, onApply: applyPreset }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Button, { size: "sm", variant: "outline", onClick: resetAppearance, title: t("resetCards"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(RotateCcw, { className: "mr-1.5 h-3.5 w-3.5" }),
              t("resetCards")
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(TabsContent2, { value: "templates", className: "m-0 flex min-h-0 flex-1 flex-col overflow-hidden", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "shrink-0 border-b bg-background px-5 py-3 shadow-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "relative min-w-[260px] flex-1 max-w-xl", children: [
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Input, { placeholder: t("searchNotesPlaceholder"), className: "pl-9", value: searchQuery, onChange: (event) => setSearchQuery(event.target.value) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TagFilter, { tags: allTags, selected: selectedTags, language: settings.uiLanguage, onChange: setSelectedTags }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Button, { size: "sm", variant: showFavorites ? "accent" : "outline", onClick: () => setShowFavorites(!showFavorites), children: [
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Star, { className: `mr-1.5 h-3.5 w-3.5 ${showFavorites ? "fill-current" : ""}` }),
                t("favorites")
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Button, { size: "sm", onClick: () => {
                setIsCreating(true);
                setEditingTemplate(null);
              }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }),
                t("createNote")
              ] })
            ] }),
            selectedTags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Button, { size: "sm", variant: "ghost", className: "h-7 text-xs", onClick: () => setSelectedTags([]), children: t("clearAllTags") }),
              selectedTags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Badge, { variant: "secondary", className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground", onClick: () => setSelectedTags(selectedTags.filter((item) => item !== tag)), children: [
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Tags, { className: "mr-1 h-3 w-3" }),
                tag,
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(X, { className: "ml-1 h-3 w-3" })
              ] }, tag))
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "min-h-0 flex-1 overflow-y-auto p-5", children: filteredTemplates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "mx-auto mt-16 max-w-md rounded-lg border border-dashed p-8 text-center text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { children: templates.length === 0 ? t("emptyBase") : t("nothingFoundCriteria") }),
            templates.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Button, { size: "sm", variant: "outline", className: "mt-4", onClick: addStarterTemplates, children: t("addStarterNotes") })
          ] }) : settings.gridHeight === "max-content" ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "grid gap-4", style: { gridTemplateColumns: `repeat(${settings.gridCols}, minmax(0, 1fr))` }, children: masonryColumns.map((column, columnIndex) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "flex min-w-0 flex-col gap-4", children: column.map((template) => renderTemplateCard(template, true)) }, columnIndex)) }) : /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "grid gap-4", style: { gridTemplateColumns: `repeat(${settings.gridCols}, minmax(0, 1fr))` }, children: filteredTemplates.map((template) => renderTemplateCard(template, false)) }) })
        ] }),
        settings.showVariablesTab && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TabsContent2, { value: "variables", className: "m-0 min-h-0 flex-1 overflow-y-auto bg-background", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(VariablesPanel, {}) }),
        settings.showTodoTab && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TabsContent2, { value: "todo", className: "m-0 min-h-0 flex-1 overflow-y-auto bg-background", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TodoPanel, {}) })
      ] }) }),
      editorOpen && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "fixed inset-0 z-[2147483647] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "max-h-[calc(100vh-48px)] w-[min(760px,calc(100vw-32px))] overflow-y-auto rounded-lg border bg-background p-5 text-foreground shadow-2xl", children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "mb-4 flex items-center justify-between gap-3 border-b pb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "text-sm font-semibold", children: editingTemplate ? t("editNote") : t("newNote") }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "text-xs text-muted-foreground", children: t("editorNoShift") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Button, { size: "icon", variant: "ghost", onClick: closeEditor, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(X, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          TemplateEditor,
          {
            template: editingTemplate,
            isNew: isCreating,
            onSave: handleSaveTemplate,
            onCancel: closeEditor,
            allTags,
            variables: settings.showVariablesTab ? variables : [],
            language: settings.uiLanguage
          }
        )
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ToastContainer, {}),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        TemplatePreviewModal,
        {
          template: previewTemplate,
          variables: settings.showVariablesTab ? variables : null,
          language: settings.uiLanguage,
          allowInsert: embedded,
          onInserted: onAfterInsert,
          onClose: () => setPreviewTemplate(null)
        }
      )
    ] });
    function renderTemplateCard(template, showFullText) {
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        TemplateCard,
        {
          template,
          color: template.favorite ? settings.favoriteCardColor : settings.defaultCardColor,
          textColor: settings.cardTextColor,
          fontFamily: settings.cardFontFamily,
          showFullText,
          onOpen: () => setPreviewTemplate(template),
          onEdit: () => {
            setEditingTemplate(template);
            setIsCreating(false);
          },
          onDelete: () => {
            if (confirm(t("deleteNoteQuestion", { title: template.title }))) {
              deleteTemplate(template.id);
              showToast(t("noteDeleted"), "success");
            }
          },
          onToggleFavorite: () => toggleFavorite(template.id),
          onCopy: () => {
            navigator.clipboard.writeText(template.text);
            showToast(t("textCopied"), "success");
          },
          cardStyle: showFullText ? void 0 : { height: settings.gridHeight },
          draggable: !showFullText,
          onDragStart: () => setDraggingTemplateId(template.id),
          onDragOver: (event) => event.preventDefault(),
          onDrop: (event) => {
            event.preventDefault();
            handleDropTemplate(template.id);
          }
        },
        template.id
      );
    }
  }
  function BrandLogo({ title }) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { className: "inline-flex items-center gap-2 text-foreground", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
        "svg",
        {
          "aria-hidden": "true",
          className: "h-8 w-8 shrink-0",
          viewBox: "0 0 64 64",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("defs", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("linearGradient", { id: "blobnote-mark-gradient", x1: "10", y1: "8", x2: "54", y2: "58", gradientUnits: "userSpaceOnUse", children: [
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("stop", { stopColor: "#09B8F5" }),
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("stop", { offset: "0.55", stopColor: "#2C6DF6" }),
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("stop", { offset: "1", stopColor: "#7037F4" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("linearGradient", { id: "blobnote-line-gradient", x1: "22", y1: "28", x2: "43", y2: "43", gradientUnits: "userSpaceOnUse", children: [
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("stop", { stopColor: "#16B7F3" }),
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("stop", { offset: "1", stopColor: "#6E3DF4" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "path",
              {
                d: "M12.5 38.5C7.8 28.7 12.7 15.3 23.4 10.2C32 6.1 42.7 8.3 48.9 15.7C54.8 22.8 56.2 34.8 50.8 43.6C44.7 53.5 30.9 57.8 20.9 52.4C14.9 49.2 10.8 43.6 12.5 38.5Z",
                fill: "url(#blobnote-mark-gradient)"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("circle", { cx: "51.5", cy: "14.5", r: "4.5", fill: "#2D74F7" }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("circle", { cx: "11", cy: "50", r: "3.8", fill: "#6D38F3" }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "path",
              {
                d: "M21 19.5C21 16.5 23.5 14 26.5 14H38.5L48 23.5V41.5C48 45.1 45.1 48 41.5 48H26.5C23.5 48 21 45.5 21 42.5V19.5Z",
                fill: "white"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", { d: "M38.5 14V23.5H48", fill: "#C9F3FF" }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", { d: "M38.5 14V21.5C38.5 22.6 39.4 23.5 40.5 23.5H48", stroke: "#18AEEB", strokeWidth: "2", strokeLinejoin: "round" }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", { d: "M27 29.5H38.5", stroke: "url(#blobnote-line-gradient)", strokeWidth: "3.2", strokeLinecap: "round" }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", { d: "M27 36H42", stroke: "url(#blobnote-line-gradient)", strokeWidth: "3.2", strokeLinecap: "round" }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", { d: "M27 42.5H37", stroke: "url(#blobnote-line-gradient)", strokeWidth: "3.2", strokeLinecap: "round" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "text-base font-bold leading-none text-foreground", children: title })
    ] });
  }
  function SettingSwitch({
    icon,
    label,
    checked,
    onCheckedChange
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("label", { className: "flex h-8 min-w-[150px] shrink-0 items-center justify-between gap-2 rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground shadow-sm", children: [
      icon,
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "min-w-0 truncate", children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Switch2, { checked, onCheckedChange })
    ] });
  }
  function SettingSelect({
    icon,
    label,
    value,
    options,
    onChange
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("label", { className: "flex h-8 min-w-[170px] shrink-0 items-center justify-between gap-2 rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground shadow-sm", children: [
      icon,
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "min-w-0 truncate", children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("select", { className: "h-6 min-w-[48px] rounded border bg-background px-1 text-xs text-foreground", value, onChange: (event) => onChange(event.target.value), children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("option", { value: option.value, children: option.label }, option.value)) })
    ] });
  }
  function PresetStrip({
    theme,
    language,
    onApply
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex items-center gap-1 rounded-md border bg-background px-2 py-1", title: translate(language, "cardPresets"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Palette, { className: "h-3.5 w-3.5 text-muted-foreground" }),
      Object.values(CARD_PRESETS[theme]).map((preset) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        "button",
        {
          type: "button",
          className: "h-6 rounded-md border px-2 text-[11px] hover:bg-muted",
          onClick: () => onApply(preset),
          style: { background: preset.defaultCardColor, color: preset.cardTextColor },
          children: translate(language, CARD_PRESET_NAMES[preset.cardPreset])
        },
        preset.cardPreset
      ))
    ] });
  }
  function getVisibleTab(settings) {
    if (settings.lastBaseTab === "variables" && !settings.showVariablesTab) return "templates";
    if (settings.lastBaseTab === "todo" && !settings.showTodoTab) return "templates";
    return settings.lastBaseTab;
  }

  // src/content/BaseModal.tsx
  var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
  function BaseModal({ open, onOpenChange }) {
    import_react13.default.useEffect(() => {
      if (!open) return;
      const handleKeydown = (event) => {
        if (event.key === "Escape") onOpenChange(false);
      };
      document.addEventListener("keydown", handleKeydown);
      return () => document.removeEventListener("keydown", handleKeydown);
    }, [open, onOpenChange]);
    if (!open) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "fixed inset-0 z-[2147483646] bg-slate-950/45 backdrop-blur-sm p-4 text-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "relative h-full w-full overflow-hidden rounded-lg border bg-background shadow-2xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "absolute right-3 top-3 z-[2147483647]", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Button, { size: "icon", variant: "secondary", className: "h-9 w-9 rounded-lg shadow", onClick: () => onOpenChange(false), children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(X, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(KnowledgeBase, { embedded: true, onAfterInsert: (autoSend) => {
        if (autoSend) onOpenChange(false);
      } })
    ] }) });
  }

  // src/content/index.tsx
  var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
  var SHADOW_THEME_STYLE = `
  :host {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 202 100% 36%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215 18% 34%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214 24% 86%;
    --input: 214 24% 86%;
    --ring: 204 94% 38%;
    --radius: 0.5rem;
    color-scheme: light;
  }

  #opspost-content-root {
    color: hsl(var(--foreground));
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 1.5;
  }

  #opspost-content-root .dark {
    --background: 222 44% 7%;
    --foreground: 210 40% 98%;
    --card: 222 38% 8%;
    --card-foreground: 210 40% 98%;
    --popover: 222 38% 8%;
    --popover-foreground: 210 40% 98%;
    --primary: 199 96% 48%;
    --primary-foreground: 210 40% 98%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217 28% 18%;
    --muted-foreground: 214 24% 74%;
    --accent: 217 28% 18%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217 26% 24%;
    --input: 217 26% 24%;
    --ring: 199 96% 48%;
    color-scheme: dark;
  }

  #opspost-content-root *,
  #opspost-content-root *::before,
  #opspost-content-root *::after {
    box-sizing: border-box;
  }

  #opspost-content-root button,
  #opspost-content-root input,
  #opspost-content-root select,
  #opspost-content-root textarea {
    color: inherit;
    font: inherit;
    letter-spacing: 0;
  }
`;
  function createRootContainer(id) {
    let host = document.getElementById(id);
    if (!host) {
      host = document.createElement("div");
      host.id = id;
      document.documentElement.appendChild(host);
    }
    const shadow = host.shadowRoot || host.attachShadow({ mode: "open" });
    if (!shadow.querySelector("style[data-blobnote-shadow-theme]")) {
      const style = document.createElement("style");
      style.dataset.blobnoteShadowTheme = "true";
      style.textContent = SHADOW_THEME_STYLE;
      shadow.appendChild(style);
    }
    if (!shadow.querySelector("link[data-opspost-styles]")) {
      const link = document.createElement("link");
      link.dataset.opspostStyles = "true";
      link.rel = "stylesheet";
      link.href = chrome.runtime.getURL("assets/globals.css");
      shadow.appendChild(link);
    }
    let root = shadow.getElementById("opspost-content-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "opspost-content-root";
      shadow.appendChild(root);
    }
    return root;
  }
  function ContentApp() {
    const [showSmartSearch, setShowSmartSearch] = import_react14.default.useState(false);
    const [showBase, setShowBase] = import_react14.default.useState(false);
    const [enabledForHost, setEnabledForHost] = import_react14.default.useState(true);
    const [theme, setTheme] = import_react14.default.useState("light");
    import_react14.default.useEffect(() => {
      const uninstallTracker = installEditableTracker();
      const loadActivation = async () => {
        const snapshot = await readRuntimeSnapshot();
        setEnabledForHost(isHostEnabled(snapshot));
        setTheme(snapshot.theme);
      };
      void loadActivation();
      const handleStorage = (changes, area) => {
        if (area === "sync" && (changes.activationMode || changes.enabledHosts || changes.theme)) void loadActivation();
      };
      const handleKeydown = (event) => {
        if (event.ctrlKey && event.shiftKey && event.code === "Space") {
          event.preventDefault();
          setShowBase(true);
          return;
        }
        if (!enabledForHost) return;
        if (event.ctrlKey && event.code === "Space") {
          event.preventDefault();
          setShowSmartSearch(true);
        }
      };
      const handleMessage = (request, _sender, sendResponse) => {
        if (request.type === "OPEN_SMART_SEARCH" || request.type === "OPEN_MEGA_MODAL") {
          setShowSmartSearch(true);
          sendResponse({ success: true });
          return true;
        }
        if (request.type === "OPEN_BASE_MODAL") {
          setShowBase(true);
          sendResponse({ success: true });
          return true;
        }
        if (request.type === "INSERT_TEMPLATE" && request.template) {
          const success = insertTemplate(request.template, { autoSend: Boolean(request.autoSend) });
          sendResponse(success ? { success: true } : { success: false, error: "\u041F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" });
          return true;
        }
        return false;
      };
      document.addEventListener("keydown", handleKeydown);
      chrome.storage?.onChanged?.addListener(handleStorage);
      chrome.runtime?.onMessage?.addListener(handleMessage);
      return () => {
        uninstallTracker();
        document.removeEventListener("keydown", handleKeydown);
        chrome.storage?.onChanged?.removeListener(handleStorage);
        chrome.runtime?.onMessage?.removeListener(handleMessage);
      };
    }, [enabledForHost]);
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react14.default.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: theme === "dark" ? "dark" : "", children: [
      enabledForHost && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(FloatingPanel, { onOpenBase: () => setShowBase(true) }),
      enabledForHost && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(AtMenu, {}),
      enabledForHost && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(SmartSearch, { open: showSmartSearch, onOpenChange: setShowSmartSearch }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(BaseModal, { open: showBase, onOpenChange: setShowBase })
    ] }) });
  }
  function init() {
    const root = createRootContainer("opspost-content-host");
    if (root.dataset.reactMounted === "true") return;
    root.dataset.reactMounted = "true";
    import_client.default.createRoot(root).render(/* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ContentApp, {}));
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim.production.js:
  (**
   * @license React
   * use-sync-external-store-shim.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/shared/src/utils.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/Icon.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/alarm-clock.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/at-sign.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/book-open.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/braces.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/calendar-clock.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/check.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/chevron-down.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/circle-check.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/circle.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/clipboard-list.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/copy.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/database.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/download.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/eraser.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/file-text.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/flag.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/info.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/languages.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/layout-grid.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/list-todo.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/moon.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/palette.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/panel-top-open.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/pencil.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/plus.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/rotate-ccw.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/save.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/search.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/send.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/star.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/tags.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/trash-2.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/upload.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/wand-sparkles.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/x.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.378.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
