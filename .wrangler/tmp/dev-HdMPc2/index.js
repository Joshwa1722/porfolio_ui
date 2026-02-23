var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// dist/worker/index.js
import gu from "util";
import yu from "crypto";
import bu from "async_hooks";
import Su from "stream";
var il = { exports: {} };
var Es = {};
var Wl;
function ku() {
  if (Wl) return Es;
  Wl = 1;
  var N = /* @__PURE__ */ Symbol.for("react.transitional.element"), q = /* @__PURE__ */ Symbol.for("react.fragment");
  function j(O, Q, B) {
    var ge = null;
    if (B !== void 0 && (ge = "" + B), Q.key !== void 0 && (ge = "" + Q.key), "key" in Q) {
      B = {};
      for (var we in Q) we !== "key" && (B[we] = Q[we]);
    } else B = Q;
    return Q = B.ref, { $$typeof: N, type: O, key: ge, ref: Q !== void 0 ? Q : null, props: B };
  }
  __name(j, "j");
  return Es.Fragment = q, Es.jsx = j, Es.jsxs = j, Es;
}
__name(ku, "ku");
var ll = { exports: {} };
var z = {};
var Ul;
function vu() {
  if (Ul) return z;
  Ul = 1;
  var N = /* @__PURE__ */ Symbol.for("react.transitional.element"), q = /* @__PURE__ */ Symbol.for("react.portal"), j = /* @__PURE__ */ Symbol.for("react.fragment"), O = /* @__PURE__ */ Symbol.for("react.strict_mode"), Q = /* @__PURE__ */ Symbol.for("react.profiler"), B = /* @__PURE__ */ Symbol.for("react.consumer"), ge = /* @__PURE__ */ Symbol.for("react.context"), we = /* @__PURE__ */ Symbol.for("react.forward_ref"), L = /* @__PURE__ */ Symbol.for("react.suspense"), P = /* @__PURE__ */ Symbol.for("react.memo"), oe = /* @__PURE__ */ Symbol.for("react.lazy"), Je = /* @__PURE__ */ Symbol.for("react.activity"), kt = Symbol.iterator;
  function Pt(S) {
    return S === null || typeof S != "object" ? null : (S = kt && S[kt] || S["@@iterator"], typeof S == "function" ? S : null);
  }
  __name(Pt, "Pt");
  var Ar = { isMounted: /* @__PURE__ */ __name(function() {
    return false;
  }, "isMounted"), enqueueForceUpdate: /* @__PURE__ */ __name(function() {
  }, "enqueueForceUpdate"), enqueueReplaceState: /* @__PURE__ */ __name(function() {
  }, "enqueueReplaceState"), enqueueSetState: /* @__PURE__ */ __name(function() {
  }, "enqueueSetState") }, $r = Object.assign, an = {};
  function _t(S, _, F) {
    this.props = S, this.context = _, this.refs = an, this.updater = F || Ar;
  }
  __name(_t, "_t");
  _t.prototype.isReactComponent = {}, _t.prototype.setState = function(S, _) {
    if (typeof S != "object" && typeof S != "function" && S != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, S, _, "setState");
  }, _t.prototype.forceUpdate = function(S) {
    this.updater.enqueueForceUpdate(this, S, "forceUpdate");
  };
  function xo() {
  }
  __name(xo, "xo");
  xo.prototype = _t.prototype;
  function Fr(S, _, F) {
    this.props = S, this.context = _, this.refs = an, this.updater = F || Ar;
  }
  __name(Fr, "Fr");
  var sn = Fr.prototype = new xo();
  sn.constructor = Fr, $r(sn, _t.prototype), sn.isPureReactComponent = true;
  var Or = Array.isArray;
  function ln() {
  }
  __name(ln, "ln");
  var K = { H: null, A: null, T: null, S: null }, ye = Object.prototype.hasOwnProperty;
  function ir(S, _, F) {
    var D = F.ref;
    return { $$typeof: N, type: S, key: _, ref: D !== void 0 ? D : null, props: F };
  }
  __name(ir, "ir");
  function Hn(S, _) {
    return ir(S.type, _, S.props);
  }
  __name(Hn, "Hn");
  function Nr(S) {
    return typeof S == "object" && S !== null && S.$$typeof === N;
  }
  __name(Nr, "Nr");
  function be(S) {
    var _ = { "=": "=0", ":": "=2" };
    return "$" + S.replace(/[=:]/g, function(F) {
      return _[F];
    });
  }
  __name(be, "be");
  var de = /\/+/g;
  function Nt(S, _) {
    return typeof S == "object" && S !== null && S.key != null ? be("" + S.key) : _.toString(36);
  }
  __name(Nt, "Nt");
  function x(S) {
    switch (S.status) {
      case "fulfilled":
        return S.value;
      case "rejected":
        throw S.reason;
      default:
        switch (typeof S.status == "string" ? S.then(ln, ln) : (S.status = "pending", S.then(function(_) {
          S.status === "pending" && (S.status = "fulfilled", S.value = _);
        }, function(_) {
          S.status === "pending" && (S.status = "rejected", S.reason = _);
        })), S.status) {
          case "fulfilled":
            return S.value;
          case "rejected":
            throw S.reason;
        }
    }
    throw S;
  }
  __name(x, "x");
  function M(S, _, F, D, V) {
    var ee = typeof S;
    (ee === "undefined" || ee === "boolean") && (S = null);
    var pe = false;
    if (S === null) pe = true;
    else switch (ee) {
      case "bigint":
      case "string":
      case "number":
        pe = true;
        break;
      case "object":
        switch (S.$$typeof) {
          case N:
          case q:
            pe = true;
            break;
          case oe:
            return pe = S._init, M(pe(S._payload), _, F, D, V);
        }
    }
    if (pe) return V = V(S), pe = D === "" ? "." + Nt(S, 0) : D, Or(V) ? (F = "", pe != null && (F = pe.replace(de, "$&/") + "/"), M(V, _, F, "", function(Le) {
      return Le;
    })) : V != null && (Nr(V) && (V = Hn(V, F + (V.key == null || S && S.key === V.key ? "" : ("" + V.key).replace(de, "$&/") + "/") + pe)), _.push(V)), 1;
    pe = 0;
    var dt = D === "" ? "." : D + ":";
    if (Or(S)) for (var Ge = 0; Ge < S.length; Ge++) D = S[Ge], ee = dt + Nt(D, Ge), pe += M(D, _, F, ee, V);
    else if (Ge = Pt(S), typeof Ge == "function") for (S = Ge.call(S), Ge = 0; !(D = S.next()).done; ) D = D.value, ee = dt + Nt(D, Ge++), pe += M(D, _, F, ee, V);
    else if (ee === "object") {
      if (typeof S.then == "function") return M(x(S), _, F, D, V);
      throw _ = String(S), Error("Objects are not valid as a React child (found: " + (_ === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : _) + "). If you meant to render a collection of children, use an array instead.");
    }
    return pe;
  }
  __name(M, "M");
  function le(S, _, F) {
    if (S == null) return S;
    var D = [], V = 0;
    return M(S, D, "", "", function(ee) {
      return _.call(F, ee, V++);
    }), D;
  }
  __name(le, "le");
  function Bn(S) {
    if (S._status === -1) {
      var _ = S._result;
      _ = _(), _.then(function(F) {
        (S._status === 0 || S._status === -1) && (S._status = 1, S._result = F);
      }, function(F) {
        (S._status === 0 || S._status === -1) && (S._status = 2, S._result = F);
      }), S._status === -1 && (S._status = 0, S._result = _);
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  __name(Bn, "Bn");
  var lr = typeof reportError == "function" ? reportError : function(S) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var _ = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof S == "object" && S !== null && typeof S.message == "string" ? String(S.message) : String(S), error: S });
      if (!window.dispatchEvent(_)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", S);
      return;
    }
    console.error(S);
  }, w = { map: le, forEach: /* @__PURE__ */ __name(function(S, _, F) {
    le(S, function() {
      _.apply(this, arguments);
    }, F);
  }, "forEach"), count: /* @__PURE__ */ __name(function(S) {
    var _ = 0;
    return le(S, function() {
      _++;
    }), _;
  }, "count"), toArray: /* @__PURE__ */ __name(function(S) {
    return le(S, function(_) {
      return _;
    }) || [];
  }, "toArray"), only: /* @__PURE__ */ __name(function(S) {
    if (!Nr(S)) throw Error("React.Children.only expected to receive a single React element child.");
    return S;
  }, "only") };
  return z.Activity = Je, z.Children = w, z.Component = _t, z.Fragment = j, z.Profiler = Q, z.PureComponent = Fr, z.StrictMode = O, z.Suspense = L, z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K, z.__COMPILER_RUNTIME = { __proto__: null, c: /* @__PURE__ */ __name(function(S) {
    return K.H.useMemoCache(S);
  }, "c") }, z.cache = function(S) {
    return function() {
      return S.apply(null, arguments);
    };
  }, z.cacheSignal = function() {
    return null;
  }, z.cloneElement = function(S, _, F) {
    if (S == null) throw Error("The argument must be a React element, but you passed " + S + ".");
    var D = $r({}, S.props), V = S.key;
    if (_ != null) for (ee in _.key !== void 0 && (V = "" + _.key), _) !ye.call(_, ee) || ee === "key" || ee === "__self" || ee === "__source" || ee === "ref" && _.ref === void 0 || (D[ee] = _[ee]);
    var ee = arguments.length - 2;
    if (ee === 1) D.children = F;
    else if (1 < ee) {
      for (var pe = Array(ee), dt = 0; dt < ee; dt++) pe[dt] = arguments[dt + 2];
      D.children = pe;
    }
    return ir(S.type, V, D);
  }, z.createContext = function(S) {
    return S = { $$typeof: ge, _currentValue: S, _currentValue2: S, _threadCount: 0, Provider: null, Consumer: null }, S.Provider = S, S.Consumer = { $$typeof: B, _context: S }, S;
  }, z.createElement = function(S, _, F) {
    var D, V = {}, ee = null;
    if (_ != null) for (D in _.key !== void 0 && (ee = "" + _.key), _) ye.call(_, D) && D !== "key" && D !== "__self" && D !== "__source" && (V[D] = _[D]);
    var pe = arguments.length - 2;
    if (pe === 1) V.children = F;
    else if (1 < pe) {
      for (var dt = Array(pe), Ge = 0; Ge < pe; Ge++) dt[Ge] = arguments[Ge + 2];
      V.children = dt;
    }
    if (S && S.defaultProps) for (D in pe = S.defaultProps, pe) V[D] === void 0 && (V[D] = pe[D]);
    return ir(S, ee, V);
  }, z.createRef = function() {
    return { current: null };
  }, z.forwardRef = function(S) {
    return { $$typeof: we, render: S };
  }, z.isValidElement = Nr, z.lazy = function(S) {
    return { $$typeof: oe, _payload: { _status: -1, _result: S }, _init: Bn };
  }, z.memo = function(S, _) {
    return { $$typeof: P, type: S, compare: _ === void 0 ? null : _ };
  }, z.startTransition = function(S) {
    var _ = K.T, F = {};
    K.T = F;
    try {
      var D = S(), V = K.S;
      V !== null && V(F, D), typeof D == "object" && D !== null && typeof D.then == "function" && D.then(ln, lr);
    } catch (ee) {
      lr(ee);
    } finally {
      _ !== null && F.types !== null && (_.types = F.types), K.T = _;
    }
  }, z.unstable_useCacheRefresh = function() {
    return K.H.useCacheRefresh();
  }, z.use = function(S) {
    return K.H.use(S);
  }, z.useActionState = function(S, _, F) {
    return K.H.useActionState(S, _, F);
  }, z.useCallback = function(S, _) {
    return K.H.useCallback(S, _);
  }, z.useContext = function(S) {
    return K.H.useContext(S);
  }, z.useDebugValue = function() {
  }, z.useDeferredValue = function(S, _) {
    return K.H.useDeferredValue(S, _);
  }, z.useEffect = function(S, _) {
    return K.H.useEffect(S, _);
  }, z.useEffectEvent = function(S) {
    return K.H.useEffectEvent(S);
  }, z.useId = function() {
    return K.H.useId();
  }, z.useImperativeHandle = function(S, _, F) {
    return K.H.useImperativeHandle(S, _, F);
  }, z.useInsertionEffect = function(S, _) {
    return K.H.useInsertionEffect(S, _);
  }, z.useLayoutEffect = function(S, _) {
    return K.H.useLayoutEffect(S, _);
  }, z.useMemo = function(S, _) {
    return K.H.useMemo(S, _);
  }, z.useOptimistic = function(S, _) {
    return K.H.useOptimistic(S, _);
  }, z.useReducer = function(S, _, F) {
    return K.H.useReducer(S, _, F);
  }, z.useRef = function(S) {
    return K.H.useRef(S);
  }, z.useState = function(S) {
    return K.H.useState(S);
  }, z.useSyncExternalStore = function(S, _, F) {
    return K.H.useSyncExternalStore(S, _, F);
  }, z.useTransition = function() {
    return K.H.useTransition();
  }, z.version = "19.2.4", z;
}
__name(vu, "vu");
var Tu = { exports: {} };
Tu.exports;
var zl;
function vi() {
  return zl || (zl = 1, ll.exports = vu()), ll.exports;
}
__name(vi, "vi");
var Kl;
function Cu() {
  return Kl || (Kl = 1, il.exports = ku()), il.exports;
}
__name(Cu, "Cu");
var f = Cu();
var on2 = {};
var Ps = {};
var ul = { exports: {} };
var ct = {};
var Yl;
function wu() {
  if (Yl) return ct;
  Yl = 1;
  var N = vi();
  function q(L) {
    var P = "https://react.dev/errors/" + L;
    if (1 < arguments.length) {
      P += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var oe = 2; oe < arguments.length; oe++) P += "&args[]=" + encodeURIComponent(arguments[oe]);
    }
    return "Minified React error #" + L + "; visit " + P + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  __name(q, "q");
  function j() {
  }
  __name(j, "j");
  var O = { d: { f: j, r: /* @__PURE__ */ __name(function() {
    throw Error(q(522));
  }, "r"), D: j, C: j, L: j, m: j, X: j, S: j, M: j }, p: 0, findDOMNode: null }, Q = /* @__PURE__ */ Symbol.for("react.portal");
  function B(L, P, oe) {
    var Je = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Q, key: Je == null ? null : "" + Je, children: L, containerInfo: P, implementation: oe };
  }
  __name(B, "B");
  var ge = N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function we(L, P) {
    if (L === "font") return "";
    if (typeof P == "string") return P === "use-credentials" ? P : "";
  }
  __name(we, "we");
  return ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = O, ct.createPortal = function(L, P) {
    var oe = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!P || P.nodeType !== 1 && P.nodeType !== 9 && P.nodeType !== 11) throw Error(q(299));
    return B(L, P, null, oe);
  }, ct.flushSync = function(L) {
    var P = ge.T, oe = O.p;
    try {
      if (ge.T = null, O.p = 2, L) return L();
    } finally {
      ge.T = P, O.p = oe, O.d.f();
    }
  }, ct.preconnect = function(L, P) {
    typeof L == "string" && (P ? (P = P.crossOrigin, P = typeof P == "string" ? P === "use-credentials" ? P : "" : void 0) : P = null, O.d.C(L, P));
  }, ct.prefetchDNS = function(L) {
    typeof L == "string" && O.d.D(L);
  }, ct.preinit = function(L, P) {
    if (typeof L == "string" && P && typeof P.as == "string") {
      var oe = P.as, Je = we(oe, P.crossOrigin), kt = typeof P.integrity == "string" ? P.integrity : void 0, Pt = typeof P.fetchPriority == "string" ? P.fetchPriority : void 0;
      oe === "style" ? O.d.S(L, typeof P.precedence == "string" ? P.precedence : void 0, { crossOrigin: Je, integrity: kt, fetchPriority: Pt }) : oe === "script" && O.d.X(L, { crossOrigin: Je, integrity: kt, fetchPriority: Pt, nonce: typeof P.nonce == "string" ? P.nonce : void 0 });
    }
  }, ct.preinitModule = function(L, P) {
    if (typeof L == "string") if (typeof P == "object" && P !== null) {
      if (P.as == null || P.as === "script") {
        var oe = we(P.as, P.crossOrigin);
        O.d.M(L, { crossOrigin: oe, integrity: typeof P.integrity == "string" ? P.integrity : void 0, nonce: typeof P.nonce == "string" ? P.nonce : void 0 });
      }
    } else P == null && O.d.M(L);
  }, ct.preload = function(L, P) {
    if (typeof L == "string" && typeof P == "object" && P !== null && typeof P.as == "string") {
      var oe = P.as, Je = we(oe, P.crossOrigin);
      O.d.L(L, oe, { crossOrigin: Je, integrity: typeof P.integrity == "string" ? P.integrity : void 0, nonce: typeof P.nonce == "string" ? P.nonce : void 0, type: typeof P.type == "string" ? P.type : void 0, fetchPriority: typeof P.fetchPriority == "string" ? P.fetchPriority : void 0, referrerPolicy: typeof P.referrerPolicy == "string" ? P.referrerPolicy : void 0, imageSrcSet: typeof P.imageSrcSet == "string" ? P.imageSrcSet : void 0, imageSizes: typeof P.imageSizes == "string" ? P.imageSizes : void 0, media: typeof P.media == "string" ? P.media : void 0 });
    }
  }, ct.preloadModule = function(L, P) {
    if (typeof L == "string") if (P) {
      var oe = we(P.as, P.crossOrigin);
      O.d.m(L, { as: typeof P.as == "string" && P.as !== "script" ? P.as : void 0, crossOrigin: oe, integrity: typeof P.integrity == "string" ? P.integrity : void 0 });
    } else O.d.m(L);
  }, ct.requestFormReset = function(L) {
    O.d.r(L);
  }, ct.unstable_batchedUpdates = function(L, P) {
    return L(P);
  }, ct.useFormState = function(L, P, oe) {
    return ge.H.useFormState(L, P, oe);
  }, ct.useFormStatus = function() {
    return ge.H.useHostTransitionStatus();
  }, ct.version = "19.2.4", ct;
}
__name(wu, "wu");
var Jl;
function tu() {
  if (Jl) return ul.exports;
  Jl = 1;
  function N() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(N);
    } catch (q) {
      console.error(q);
    }
  }
  __name(N, "N");
  return N(), ul.exports = wu(), ul.exports;
}
__name(tu, "tu");
var Gl;
function xu() {
  if (Gl) return Ps;
  Gl = 1;
  var N = vi(), q = tu(), j = /* @__PURE__ */ Symbol.for("react.transitional.element"), O = /* @__PURE__ */ Symbol.for("react.portal"), Q = /* @__PURE__ */ Symbol.for("react.fragment"), B = /* @__PURE__ */ Symbol.for("react.strict_mode"), ge = /* @__PURE__ */ Symbol.for("react.profiler"), we = /* @__PURE__ */ Symbol.for("react.consumer"), L = /* @__PURE__ */ Symbol.for("react.context"), P = /* @__PURE__ */ Symbol.for("react.forward_ref"), oe = /* @__PURE__ */ Symbol.for("react.suspense"), Je = /* @__PURE__ */ Symbol.for("react.suspense_list"), kt = /* @__PURE__ */ Symbol.for("react.memo"), Pt = /* @__PURE__ */ Symbol.for("react.lazy"), Ar = /* @__PURE__ */ Symbol.for("react.scope"), $r = /* @__PURE__ */ Symbol.for("react.activity"), an = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), _t = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), xo = /* @__PURE__ */ Symbol.for("react.view_transition"), Fr = Symbol.iterator;
  function sn(r) {
    return r === null || typeof r != "object" ? null : (r = Fr && r[Fr] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  __name(sn, "sn");
  var Or = Array.isArray;
  function ln(r, n) {
    var a = r.length & 3, i = r.length - a, u = n;
    for (n = 0; n < i; ) {
      var p = r.charCodeAt(n) & 255 | (r.charCodeAt(++n) & 255) << 8 | (r.charCodeAt(++n) & 255) << 16 | (r.charCodeAt(++n) & 255) << 24;
      ++n, p = 3432918353 * (p & 65535) + ((3432918353 * (p >>> 16) & 65535) << 16) & 4294967295, p = p << 15 | p >>> 17, p = 461845907 * (p & 65535) + ((461845907 * (p >>> 16) & 65535) << 16) & 4294967295, u ^= p, u = u << 13 | u >>> 19, u = 5 * (u & 65535) + ((5 * (u >>> 16) & 65535) << 16) & 4294967295, u = (u & 65535) + 27492 + (((u >>> 16) + 58964 & 65535) << 16);
    }
    switch (p = 0, a) {
      case 3:
        p ^= (r.charCodeAt(n + 2) & 255) << 16;
      case 2:
        p ^= (r.charCodeAt(n + 1) & 255) << 8;
      case 1:
        p ^= r.charCodeAt(n) & 255, p = 3432918353 * (p & 65535) + ((3432918353 * (p >>> 16) & 65535) << 16) & 4294967295, p = p << 15 | p >>> 17, u ^= 461845907 * (p & 65535) + ((461845907 * (p >>> 16) & 65535) << 16) & 4294967295;
    }
    return u ^= r.length, u ^= u >>> 16, u = 2246822507 * (u & 65535) + ((2246822507 * (u >>> 16) & 65535) << 16) & 4294967295, u ^= u >>> 13, u = 3266489909 * (u & 65535) + ((3266489909 * (u >>> 16) & 65535) << 16) & 4294967295, (u ^ u >>> 16) >>> 0;
  }
  __name(ln, "ln");
  var K = Object.assign, ye = Object.prototype.hasOwnProperty, ir = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Hn = {}, Nr = {};
  function be(r) {
    return ye.call(Nr, r) ? true : ye.call(Hn, r) ? false : ir.test(r) ? Nr[r] = true : (Hn[r] = true, false);
  }
  __name(be, "be");
  var de = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Nt = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), x = /["'&<>]/;
  function M(r) {
    if (typeof r == "boolean" || typeof r == "number" || typeof r == "bigint") return "" + r;
    r = "" + r;
    var n = x.exec(r);
    if (n) {
      var a = "", i, u = 0;
      for (i = n.index; i < r.length; i++) {
        switch (r.charCodeAt(i)) {
          case 34:
            n = "&quot;";
            break;
          case 38:
            n = "&amp;";
            break;
          case 39:
            n = "&#x27;";
            break;
          case 60:
            n = "&lt;";
            break;
          case 62:
            n = "&gt;";
            break;
          default:
            continue;
        }
        u !== i && (a += r.slice(u, i)), u = i + 1, a += n;
      }
      r = u !== i ? a + r.slice(u, i) : a;
    }
    return r;
  }
  __name(M, "M");
  var le = /([A-Z])/g, Bn = /^ms-/, lr = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function w(r) {
    return lr.test("" + r) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : r;
  }
  __name(w, "w");
  var S = N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _ = q.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = { pending: false, data: null, method: null, action: null }, D = _.d;
  _.d = { f: D.f, r: D.r, D: mt, C: wi, L: xa, m: Ls, X: xi, S: Hs, M: Ri };
  var V = [], ee = null, pe = /(<\/|<)(s)(cript)/gi;
  function dt(r, n, a, i) {
    return "" + n + (a === "s" ? "\\u0073" : "\\u0053") + i;
  }
  __name(dt, "dt");
  function Ge(r, n, a, i, u) {
    return { idPrefix: r === void 0 ? "" : r, nextFormID: 0, streamingFormat: 0, bootstrapScriptContent: a, bootstrapScripts: i, bootstrapModules: u, instructions: 0, hasBody: false, hasHtml: false, unknownResources: {}, dnsResources: {}, connectResources: { default: {}, anonymous: {}, credentials: {} }, imageResources: {}, styleResources: {}, scriptResources: {}, moduleUnknownResources: {}, moduleScriptResources: {} };
  }
  __name(Ge, "Ge");
  function Le(r, n, a, i) {
    return { insertionMode: r, selectedValue: n, tagScope: a, viewTransition: i };
  }
  __name(Le, "Le");
  function Y(r, n, a) {
    var i = r.tagScope & -25;
    switch (n) {
      case "noscript":
        return Le(2, null, i | 1, null);
      case "select":
        return Le(2, a.value != null ? a.value : a.defaultValue, i, null);
      case "svg":
        return Le(4, null, i, null);
      case "picture":
        return Le(2, null, i | 2, null);
      case "math":
        return Le(5, null, i, null);
      case "foreignObject":
        return Le(2, null, i, null);
      case "table":
        return Le(6, null, i, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return Le(7, null, i, null);
      case "colgroup":
        return Le(9, null, i, null);
      case "tr":
        return Le(8, null, i, null);
      case "head":
        if (2 > r.insertionMode) return Le(3, null, i, null);
        break;
      case "html":
        if (r.insertionMode === 0) return Le(1, null, i, null);
    }
    return 6 <= r.insertionMode || 2 > r.insertionMode ? Le(2, null, i, null) : r.tagScope !== i ? Le(r.insertionMode, r.selectedValue, i, null) : r;
  }
  __name(Y, "Y");
  function _s(r) {
    return r === null ? null : { update: r.update, enter: "none", exit: "none", share: r.update, name: r.autoName, autoName: r.autoName, nameIdx: 0 };
  }
  __name(_s, "_s");
  function ba(r, n) {
    return n.tagScope & 32 && (r.instructions |= 128), Le(n.insertionMode, n.selectedValue, n.tagScope | 12, _s(n.viewTransition));
  }
  __name(ba, "ba");
  function Ro(r, n) {
    r = _s(n.viewTransition);
    var a = n.tagScope | 16;
    return r !== null && r.share !== "none" && (a |= 64), Le(n.insertionMode, n.selectedValue, a, r);
  }
  __name(Ro, "Ro");
  var un = /* @__PURE__ */ new Map();
  function jr(r, n) {
    if (typeof n != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    var a = true, i;
    for (i in n) if (ye.call(n, i)) {
      var u = n[i];
      if (u != null && typeof u != "boolean" && u !== "") {
        if (i.indexOf("--") === 0) {
          var p = M(i);
          u = M(("" + u).trim());
        } else p = un.get(i), p === void 0 && (p = M(i.replace(le, "-$1").toLowerCase().replace(Bn, "-ms-")), un.set(i, p)), u = typeof u == "number" ? u === 0 || de.has(i) ? "" + u : u + "px" : M(("" + u).trim());
        a ? (a = false, r.push(' style="', p, ":", u)) : r.push(";", p, ":", u);
      }
    }
    a || r.push('"');
  }
  __name(jr, "jr");
  function Eo(r, n, a) {
    a && typeof a != "function" && typeof a != "symbol" && r.push(" ", n, '=""');
  }
  __name(Eo, "Eo");
  function Xe(r, n, a) {
    typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && r.push(" ", n, '="', M(a), '"');
  }
  __name(Xe, "Xe");
  var jt = M("javascript:throw new Error('React form unexpectedly submitted.')");
  function at(r, n) {
    this.push('<input type="hidden"'), Dr(r), Xe(this, "name", n), Xe(this, "value", r), this.push("/>");
  }
  __name(at, "at");
  function Dr(r) {
    if (typeof r != "string") throw Error("File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration.");
  }
  __name(Dr, "Dr");
  function Is(r, n) {
    if (typeof n.$$FORM_ACTION == "function") {
      var a = r.nextFormID++;
      r = r.idPrefix + a;
      try {
        var i = n.$$FORM_ACTION(r);
        if (i) {
          var u = i.data;
          u?.forEach(Dr);
        }
        return i;
      } catch (p) {
        if (typeof p == "object" && p !== null && typeof p.then == "function") throw p;
      }
    }
    return null;
  }
  __name(Is, "Is");
  function qn(r, n, a, i, u, p, h, v) {
    var g = null;
    if (typeof i == "function") {
      var T = Is(n, i);
      T !== null ? (v = T.name, i = T.action || "", u = T.encType, p = T.method, h = T.target, g = T.data) : (r.push(" ", "formAction", '="', jt, '"'), h = p = u = i = v = null, Sa(n, a));
    }
    return v != null && he(r, "name", v), i != null && he(r, "formAction", i), u != null && he(r, "formEncType", u), p != null && he(r, "formMethod", p), h != null && he(r, "formTarget", h), g;
  }
  __name(qn, "qn");
  function he(r, n, a) {
    switch (n) {
      case "className":
        Xe(r, "class", a);
        break;
      case "tabIndex":
        Xe(r, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Xe(r, n, a);
        break;
      case "style":
        jr(r, a);
        break;
      case "src":
      case "href":
        if (a === "") break;
      case "action":
      case "formAction":
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") break;
        a = w("" + a), r.push(" ", n, '="', M(a), '"');
        break;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "ref":
        break;
      case "autoFocus":
      case "multiple":
      case "muted":
        Eo(r, n.toLowerCase(), a);
        break;
      case "xlinkHref":
        if (typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") break;
        a = w("" + a), r.push(" ", "xlink:href", '="', M(a), '"');
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        typeof a != "function" && typeof a != "symbol" && r.push(" ", n, '="', M(a), '"');
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" && r.push(" ", n, '=""');
        break;
      case "capture":
      case "download":
        a === true ? r.push(" ", n, '=""') : a !== false && typeof a != "function" && typeof a != "symbol" && r.push(" ", n, '="', M(a), '"');
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a && r.push(" ", n, '="', M(a), '"');
        break;
      case "rowSpan":
      case "start":
        typeof a == "function" || typeof a == "symbol" || isNaN(a) || r.push(" ", n, '="', M(a), '"');
        break;
      case "xlinkActuate":
        Xe(r, "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Xe(r, "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Xe(r, "xlink:role", a);
        break;
      case "xlinkShow":
        Xe(r, "xlink:show", a);
        break;
      case "xlinkTitle":
        Xe(r, "xlink:title", a);
        break;
      case "xlinkType":
        Xe(r, "xlink:type", a);
        break;
      case "xmlBase":
        Xe(r, "xml:base", a);
        break;
      case "xmlLang":
        Xe(r, "xml:lang", a);
        break;
      case "xmlSpace":
        Xe(r, "xml:space", a);
        break;
      default:
        if ((!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Nt.get(n) || n, be(n))) {
          switch (typeof a) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              var i = n.toLowerCase().slice(0, 5);
              if (i !== "data-" && i !== "aria-") return;
          }
          r.push(" ", n, '="', M(a), '"');
        }
    }
  }
  __name(he, "he");
  function ht(r, n, a) {
    if (n != null) {
      if (a != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
      if (typeof n != "object" || !("__html" in n)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
      n = n.__html, n != null && r.push("" + n);
    }
  }
  __name(ht, "ht");
  function As(r) {
    var n = "";
    return N.Children.forEach(r, function(a) {
      a != null && (n += a);
    }), n;
  }
  __name(As, "As");
  function Sa(r, n) {
    if ((r.instructions & 16) === 0) {
      r.instructions |= 16;
      var a = n.preamble, i = n.bootstrapChunks;
      (a.htmlChunks || a.headChunks) && i.length === 0 ? (i.push(n.startInlineScript), Wn(i, r), i.push(">", `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`, "<\/script>")) : i.unshift(n.startInlineScript, ">", `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`, "<\/script>");
    }
  }
  __name(Sa, "Sa");
  function Ue(r, n) {
    r.push(te("link"));
    for (var a in n) if (ye.call(n, a)) {
      var i = n[a];
      if (i != null) switch (a) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error("link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        default:
          he(r, a, i);
      }
    }
    return r.push("/>"), null;
  }
  __name(Ue, "Ue");
  var ka = /(<\/|<)(s)(tyle)/gi;
  function $s(r, n, a, i) {
    return "" + n + (a === "s" ? "\\73 " : "\\53 ") + i;
  }
  __name($s, "$s");
  function ur(r, n, a) {
    r.push(te(a));
    for (var i in n) if (ye.call(n, i)) {
      var u = n[i];
      if (u != null) switch (i) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(a + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        default:
          he(r, i, u);
      }
    }
    return r.push("/>"), null;
  }
  __name(ur, "ur");
  function Po(r, n) {
    r.push(te("title"));
    var a = null, i = null, u;
    for (u in n) if (ye.call(n, u)) {
      var p = n[u];
      if (p != null) switch (u) {
        case "children":
          a = p;
          break;
        case "dangerouslySetInnerHTML":
          i = p;
          break;
        default:
          he(r, u, p);
      }
    }
    return r.push(">"), n = Array.isArray(a) ? 2 > a.length ? a[0] : null : a, typeof n != "function" && typeof n != "symbol" && n !== null && n !== void 0 && r.push(M("" + n)), ht(r, i, a), r.push(cr("title")), null;
  }
  __name(Po, "Po");
  function _o(r, n) {
    r.push(te("script"));
    var a = null, i = null, u;
    for (u in n) if (ye.call(n, u)) {
      var p = n[u];
      if (p != null) switch (u) {
        case "children":
          a = p;
          break;
        case "dangerouslySetInnerHTML":
          i = p;
          break;
        default:
          he(r, u, p);
      }
    }
    return r.push(">"), ht(r, i, a), typeof a == "string" && r.push(("" + a).replace(pe, dt)), r.push(cr("script")), null;
  }
  __name(_o, "_o");
  function va(r, n, a) {
    r.push(te(a));
    var i = a = null, u;
    for (u in n) if (ye.call(n, u)) {
      var p = n[u];
      if (p != null) switch (u) {
        case "children":
          a = p;
          break;
        case "dangerouslySetInnerHTML":
          i = p;
          break;
        default:
          he(r, u, p);
      }
    }
    return r.push(">"), ht(r, i, a), a;
  }
  __name(va, "va");
  function It(r, n, a) {
    r.push(te(a));
    var i = a = null, u;
    for (u in n) if (ye.call(n, u)) {
      var p = n[u];
      if (p != null) switch (u) {
        case "children":
          a = p;
          break;
        case "dangerouslySetInnerHTML":
          i = p;
          break;
        default:
          he(r, u, p);
      }
    }
    return r.push(">"), ht(r, i, a), typeof a == "string" ? (r.push(M(a)), null) : a;
  }
  __name(It, "It");
  var Io = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, cn = /* @__PURE__ */ new Map();
  function te(r) {
    var n = cn.get(r);
    if (n === void 0) {
      if (!Io.test(r)) throw Error("Invalid tag: " + r);
      n = "<" + r, cn.set(r, n);
    }
    return n;
  }
  __name(te, "te");
  function Ao(r, n, a, i, u, p, h, v, g) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
        break;
      case "a":
        r.push(te("a"));
        var T = null, E = null, R;
        for (R in a) if (ye.call(a, R)) {
          var $ = a[R];
          if ($ != null) switch (R) {
            case "children":
              T = $;
              break;
            case "dangerouslySetInnerHTML":
              E = $;
              break;
            case "href":
              $ === "" ? Xe(r, "href", "") : he(r, R, $);
              break;
            default:
              he(r, R, $);
          }
        }
        if (r.push(">"), ht(r, E, T), typeof T == "string") {
          r.push(M(T));
          var H = null;
        } else H = T;
        return H;
      case "g":
      case "p":
      case "li":
        break;
      case "select":
        r.push(te("select"));
        var re = null, J = null, G;
        for (G in a) if (ye.call(a, G)) {
          var W = a[G];
          if (W != null) switch (G) {
            case "children":
              re = W;
              break;
            case "dangerouslySetInnerHTML":
              J = W;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              he(r, G, W);
          }
        }
        return r.push(">"), ht(r, J, re), re;
      case "option":
        var X = v.selectedValue;
        r.push(te("option"));
        var ve = null, Pe = null, ae = null, ce = null, ne;
        for (ne in a) if (ye.call(a, ne)) {
          var it = a[ne];
          if (it != null) switch (ne) {
            case "children":
              ve = it;
              break;
            case "selected":
              ae = it;
              break;
            case "dangerouslySetInnerHTML":
              ce = it;
              break;
            case "value":
              Pe = it;
            default:
              he(r, ne, it);
          }
        }
        if (X != null) {
          var se = Pe !== null ? "" + Pe : As(ve);
          if (Or(X)) {
            for (var gt = 0; gt < X.length; gt++) if ("" + X[gt] === se) {
              r.push(' selected=""');
              break;
            }
          } else "" + X === se && r.push(' selected=""');
        } else ae && r.push(' selected=""');
        return r.push(">"), ht(r, ce, ve), ve;
      case "textarea":
        r.push(te("textarea"));
        var fe = null, Me = null, He = null, Te;
        for (Te in a) if (ye.call(a, Te)) {
          var nt = a[Te];
          if (nt != null) switch (Te) {
            case "children":
              He = nt;
              break;
            case "value":
              fe = nt;
              break;
            case "defaultValue":
              Me = nt;
              break;
            case "dangerouslySetInnerHTML":
              throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
            default:
              he(r, Te, nt);
          }
        }
        if (fe === null && Me !== null && (fe = Me), r.push(">"), He != null) {
          if (fe != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (Or(He)) {
            if (1 < He.length) throw Error("<textarea> can only have at most one child.");
            fe = "" + He[0];
          }
          fe = "" + He;
        }
        return typeof fe == "string" && fe[0] === `
` && r.push(`
`), fe !== null && r.push(M("" + fe)), null;
      case "input":
        r.push(te("input"));
        var Kr = null, yt = null, oo = null, vn = null, Qe = null, Ct = null, At = null, $t = null, Qt = null, yr;
        for (yr in a) if (ye.call(a, yr)) {
          var We = a[yr];
          if (We != null) switch (yr) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            case "name":
              Kr = We;
              break;
            case "formAction":
              yt = We;
              break;
            case "formEncType":
              oo = We;
              break;
            case "formMethod":
              vn = We;
              break;
            case "formTarget":
              Qe = We;
              break;
            case "defaultChecked":
              Qt = We;
              break;
            case "defaultValue":
              At = We;
              break;
            case "checked":
              $t = We;
              break;
            case "value":
              Ct = We;
              break;
            default:
              he(r, yr, We);
          }
        }
        var Yr = qn(r, i, u, yt, oo, vn, Qe, Kr);
        return $t !== null ? Eo(r, "checked", $t) : Qt !== null && Eo(r, "checked", Qt), Ct !== null ? he(r, "value", Ct) : At !== null && he(r, "value", At), r.push("/>"), Yr?.forEach(at, r), null;
      case "button":
        r.push(te("button"));
        var ao = null, Ja = null, Ga = null, Xa = null, li = null, Qa = null, so = null, io;
        for (io in a) if (ye.call(a, io)) {
          var Lt = a[io];
          if (Lt != null) switch (io) {
            case "children":
              ao = Lt;
              break;
            case "dangerouslySetInnerHTML":
              Ja = Lt;
              break;
            case "name":
              Ga = Lt;
              break;
            case "formAction":
              Xa = Lt;
              break;
            case "formEncType":
              li = Lt;
              break;
            case "formMethod":
              Qa = Lt;
              break;
            case "formTarget":
              so = Lt;
              break;
            default:
              he(r, io, Lt);
          }
        }
        var ra = qn(r, i, u, Xa, li, Qa, so, Ga);
        if (r.push(">"), ra?.forEach(at, r), ht(r, Ja, ao), typeof ao == "string") {
          r.push(M(ao));
          var Za = null;
        } else Za = ao;
        return Za;
      case "form":
        r.push(te("form"));
        var Ht = null, na = null, Bt = null, Tn = null, qt = null, lo = null, Cn;
        for (Cn in a) if (ye.call(a, Cn)) {
          var Vt = a[Cn];
          if (Vt != null) switch (Cn) {
            case "children":
              Ht = Vt;
              break;
            case "dangerouslySetInnerHTML":
              na = Vt;
              break;
            case "action":
              Bt = Vt;
              break;
            case "encType":
              Tn = Vt;
              break;
            case "method":
              qt = Vt;
              break;
            case "target":
              lo = Vt;
              break;
            default:
              he(r, Cn, Vt);
          }
        }
        var oa = null, uo = null;
        if (typeof Bt == "function") {
          var br = Is(i, Bt);
          br !== null ? (Bt = br.action || "", Tn = br.encType, qt = br.method, lo = br.target, oa = br.data, uo = br.name) : (r.push(" ", "action", '="', jt, '"'), lo = qt = Tn = Bt = null, Sa(i, u));
        }
        if (Bt != null && he(r, "action", Bt), Tn != null && he(r, "encType", Tn), qt != null && he(r, "method", qt), lo != null && he(r, "target", lo), r.push(">"), uo !== null && (r.push('<input type="hidden"'), Xe(r, "name", uo), r.push("/>"), oa?.forEach(at, r)), ht(r, na, Ht), typeof Ht == "string") {
          r.push(M(Ht));
          var wn = null;
        } else wn = Ht;
        return wn;
      case "menuitem":
        r.push(te("menuitem"));
        for (var Wt in a) if (ye.call(a, Wt)) {
          var es = a[Wt];
          if (es != null) switch (Wt) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
            default:
              he(r, Wt, es);
          }
        }
        return r.push(">"), null;
      case "object":
        r.push(te("object"));
        var Zt = null, xn = null, Jr;
        for (Jr in a) if (ye.call(a, Jr)) {
          var wt = a[Jr];
          if (wt != null) switch (Jr) {
            case "children":
              Zt = wt;
              break;
            case "dangerouslySetInnerHTML":
              xn = wt;
              break;
            case "data":
              var Sr = w("" + wt);
              if (Sr === "") break;
              r.push(" ", "data", '="', M(Sr), '"');
              break;
            default:
              he(r, Jr, wt);
          }
        }
        if (r.push(">"), ht(r, xn, Zt), typeof Zt == "string") {
          r.push(M(Zt));
          var aa = null;
        } else aa = Zt;
        return aa;
      case "title":
        var kr = v.tagScope & 1, Ze = v.tagScope & 4;
        if (v.insertionMode === 4 || kr || a.itemProp != null) var Gr = Po(r, a);
        else Ze ? Gr = null : (Po(u.hoistableChunks, a), Gr = void 0);
        return Gr;
      case "link":
        var et = v.tagScope & 1, ts = v.tagScope & 4, rs = a.rel, xt = a.href, co = a.precedence;
        if (v.insertionMode === 4 || et || a.itemProp != null || typeof rs != "string" || typeof xt != "string" || xt === "") {
          Ue(r, a);
          var Rn = null;
        } else if (a.rel === "stylesheet") if (typeof co != "string" || a.disabled != null || a.onLoad || a.onError) Rn = Ue(r, a);
        else {
          var Xr = u.styles.get(co), Qr = i.styleResources.hasOwnProperty(xt) ? i.styleResources[xt] : void 0;
          if (Qr !== null) {
            i.styleResources[xt] = null, Xr || (Xr = { precedence: M(co), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, u.styles.set(co, Xr));
            var Zr = { state: 0, props: K({}, a, { "data-precedence": a.precedence, precedence: null }) };
            if (Qr) {
              Qr.length === 2 && De(Zr.props, Qr);
              var lt = u.preloads.stylesheets.get(xt);
              lt && 0 < lt.length ? lt.length = 0 : Zr.state = 1;
            }
            Xr.sheets.set(xt, Zr), h && h.stylesheets.add(Zr);
          } else if (Xr) {
            var sa = Xr.sheets.get(xt);
            sa && h && h.stylesheets.add(sa);
          }
          g && r.push("<!-- -->"), Rn = null;
        }
        else a.onLoad || a.onError ? Rn = Ue(r, a) : (g && r.push("<!-- -->"), Rn = ts ? null : Ue(u.hoistableChunks, a));
        return Rn;
      case "script":
        var ns = v.tagScope & 1, ia = a.async;
        if (typeof a.src != "string" || !a.src || !ia || typeof ia == "function" || typeof ia == "symbol" || a.onLoad || a.onError || v.insertionMode === 4 || ns || a.itemProp != null) var la = _o(r, a);
        else {
          var En = a.src;
          if (a.type === "module") var po = i.moduleScriptResources, os = u.preloads.moduleScripts;
          else po = i.scriptResources, os = u.preloads.scripts;
          var Fe = po.hasOwnProperty(En) ? po[En] : void 0;
          if (Fe !== null) {
            po[En] = null;
            var as = a;
            if (Fe) {
              Fe.length === 2 && (as = K({}, a), De(as, Fe));
              var Pn = os.get(En);
              Pn && (Pn.length = 0);
            }
            var ua = [];
            u.scripts.add(ua), _o(ua, as);
          }
          g && r.push("<!-- -->"), la = null;
        }
        return la;
      case "style":
        var ca = v.tagScope & 1, _n = a.precedence, er = a.href, ho = a.nonce;
        if (v.insertionMode === 4 || ca || a.itemProp != null || typeof _n != "string" || typeof er != "string" || er === "") {
          r.push(te("style"));
          var Ft = null, tr = null, en;
          for (en in a) if (ye.call(a, en)) {
            var In = a[en];
            if (In != null) switch (en) {
              case "children":
                Ft = In;
                break;
              case "dangerouslySetInnerHTML":
                tr = In;
                break;
              default:
                he(r, en, In);
            }
          }
          r.push(">");
          var An = Array.isArray(Ft) ? 2 > Ft.length ? Ft[0] : null : Ft;
          typeof An != "function" && typeof An != "symbol" && An !== null && An !== void 0 && r.push(("" + An).replace(ka, $s)), ht(r, tr, Ft), r.push(cr("style"));
          var $n = null;
        } else {
          var Ut = u.styles.get(_n);
          if ((i.styleResources.hasOwnProperty(er) ? i.styleResources[er] : void 0) !== null) {
            i.styleResources[er] = null, Ut || (Ut = { precedence: M(_n), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, u.styles.set(_n, Ut));
            var Fn = u.nonce.style;
            if (!Fn || Fn === ho) {
              Ut.hrefs.push(M(er));
              var On = Ut.rules, vr = null, ss = null, mo;
              for (mo in a) if (ye.call(a, mo)) {
                var Nn = a[mo];
                if (Nn != null) switch (mo) {
                  case "children":
                    vr = Nn;
                    break;
                  case "dangerouslySetInnerHTML":
                    ss = Nn;
                }
              }
              var Tr = Array.isArray(vr) ? 2 > vr.length ? vr[0] : null : vr;
              typeof Tr != "function" && typeof Tr != "symbol" && Tr !== null && Tr !== void 0 && On.push(("" + Tr).replace(ka, $s)), ht(On, ss, vr);
            }
          }
          Ut && h && h.styles.add(Ut), g && r.push("<!-- -->"), $n = void 0;
        }
        return $n;
      case "meta":
        var Cr = v.tagScope & 1, Wi = v.tagScope & 4;
        if (v.insertionMode === 4 || Cr || a.itemProp != null) var wr = ur(r, a, "meta");
        else g && r.push("<!-- -->"), wr = Wi ? null : typeof a.charSet == "string" ? ur(u.charsetChunks, a, "meta") : a.name === "viewport" ? ur(u.viewportChunks, a, "meta") : ur(u.hoistableChunks, a, "meta");
        return wr;
      case "listing":
      case "pre":
        r.push(te(n));
        var bt = null, _e = null, xr;
        for (xr in a) if (ye.call(a, xr)) {
          var tn = a[xr];
          if (tn != null) switch (xr) {
            case "children":
              bt = tn;
              break;
            case "dangerouslySetInnerHTML":
              _e = tn;
              break;
            default:
              he(r, xr, tn);
          }
        }
        if (r.push(">"), _e != null) {
          if (bt != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof _e != "object" || !("__html" in _e)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
          var Rr = _e.__html;
          Rr != null && (typeof Rr == "string" && 0 < Rr.length && Rr[0] === `
` ? r.push(`
`, Rr) : r.push("" + Rr));
        }
        return typeof bt == "string" && bt[0] === `
` && r.push(`
`), bt;
      case "img":
        var ui = v.tagScope & 3, Be = a.src, Ke = a.srcSet;
        if (!(a.loading === "lazy" || !Be && !Ke || typeof Be != "string" && Be != null || typeof Ke != "string" && Ke != null || a.fetchPriority === "low" || ui) && (typeof Be != "string" || Be[4] !== ":" || Be[0] !== "d" && Be[0] !== "D" || Be[1] !== "a" && Be[1] !== "A" || Be[2] !== "t" && Be[2] !== "T" || Be[3] !== "a" && Be[3] !== "A") && (typeof Ke != "string" || Ke[4] !== ":" || Ke[0] !== "d" && Ke[0] !== "D" || Ke[1] !== "a" && Ke[1] !== "A" || Ke[2] !== "t" && Ke[2] !== "T" || Ke[3] !== "a" && Ke[3] !== "A")) {
          h !== null && v.tagScope & 64 && (h.suspenseyImages = true);
          var is = typeof a.sizes == "string" ? a.sizes : void 0, jn = Ke ? Ke + `
` + (is || "") : Be, pa = u.preloads.images, Er = pa.get(jn);
          if (Er) (a.fetchPriority === "high" || 10 > u.highImagePreloads.size) && (pa.delete(jn), u.highImagePreloads.add(Er));
          else if (!i.imageResources.hasOwnProperty(jn)) {
            i.imageResources[jn] = V;
            var e = a.crossOrigin, t = typeof e == "string" ? e === "use-credentials" ? e : "" : void 0, o = u.headers, s;
            o && 0 < o.remainingCapacity && typeof a.srcSet != "string" && (a.fetchPriority === "high" || 500 > o.highImagePreloads.length) && (s = Un(Be, "image", { imageSrcSet: a.srcSet, imageSizes: a.sizes, crossOrigin: t, integrity: a.integrity, nonce: a.nonce, type: a.type, fetchPriority: a.fetchPriority, referrerPolicy: a.refererPolicy }), 0 <= (o.remainingCapacity -= s.length + 2)) ? (u.resets.image[jn] = V, o.highImagePreloads && (o.highImagePreloads += ", "), o.highImagePreloads += s) : (Er = [], Ue(Er, { rel: "preload", as: "image", href: Ke ? void 0 : Be, imageSrcSet: Ke, imageSizes: is, crossOrigin: t, integrity: a.integrity, type: a.type, fetchPriority: a.fetchPriority, referrerPolicy: a.referrerPolicy }), a.fetchPriority === "high" || 10 > u.highImagePreloads.size ? u.highImagePreloads.add(Er) : (u.bulkPreloads.add(Er), pa.set(jn, Er)));
          }
        }
        return ur(r, a, "img");
      case "base":
      case "area":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "param":
      case "source":
      case "track":
      case "wbr":
        return ur(r, a, n);
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        break;
      case "head":
        if (2 > v.insertionMode) {
          var l = p || u.preamble;
          if (l.headChunks) throw Error("The `<head>` tag may only be rendered once.");
          p !== null && r.push("<!--head-->"), l.headChunks = [];
          var c = va(l.headChunks, a, "head");
        } else c = It(r, a, "head");
        return c;
      case "body":
        if (2 > v.insertionMode) {
          var d = p || u.preamble;
          if (d.bodyChunks) throw Error("The `<body>` tag may only be rendered once.");
          p !== null && r.push("<!--body-->"), d.bodyChunks = [];
          var y = va(d.bodyChunks, a, "body");
        } else y = It(r, a, "body");
        return y;
      case "html":
        if (v.insertionMode === 0) {
          var m = p || u.preamble;
          if (m.htmlChunks) throw Error("The `<html>` tag may only be rendered once.");
          p !== null && r.push("<!--html-->"), m.htmlChunks = [""];
          var b = va(m.htmlChunks, a, "html");
        } else b = It(r, a, "html");
        return b;
      default:
        if (n.indexOf("-") !== -1) {
          r.push(te(n));
          var k = null, C = null, I;
          for (I in a) if (ye.call(a, I)) {
            var A = a[I];
            if (A != null) {
              var ue = I;
              switch (I) {
                case "children":
                  k = A;
                  break;
                case "dangerouslySetInnerHTML":
                  C = A;
                  break;
                case "style":
                  jr(r, A);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "ref":
                  break;
                case "className":
                  ue = "class";
                default:
                  if (be(I) && typeof A != "function" && typeof A != "symbol" && A !== false) {
                    if (A === true) A = "";
                    else if (typeof A == "object") continue;
                    r.push(" ", ue, '="', M(A), '"');
                  }
              }
            }
          }
          return r.push(">"), ht(r, C, k), k;
        }
    }
    return It(r, a, n);
  }
  __name(Ao, "Ao");
  var Ta = /* @__PURE__ */ new Map();
  function cr(r) {
    var n = Ta.get(r);
    return n === void 0 && (n = "</" + r + ">", Ta.set(r, n)), n;
  }
  __name(cr, "cr");
  function $o(r, n) {
    r = r.preamble, r.htmlChunks === null && n.htmlChunks && (r.htmlChunks = n.htmlChunks), r.headChunks === null && n.headChunks && (r.headChunks = n.headChunks), r.bodyChunks === null && n.bodyChunks && (r.bodyChunks = n.bodyChunks);
  }
  __name($o, "$o");
  function Vn(r, n) {
    n = n.bootstrapChunks;
    for (var a = 0; a < n.length - 1; a++) r.push(n[a]);
    return a < n.length ? (a = n[a], n.length = 0, r.push(a)) : true;
  }
  __name(Vn, "Vn");
  function vt(r, n, a) {
    if (r.push('<!--$?--><template id="'), a === null) throw Error("An ID must have been assigned before we can complete the boundary.");
    return r.push(n.boundaryPrefix), n = a.toString(16), r.push(n), r.push('"></template>');
  }
  __name(vt, "vt");
  function Fs(r, n, a, i) {
    switch (a.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return r.push('<div hidden id="'), r.push(n.segmentPrefix), n = i.toString(16), r.push(n), r.push('">');
      case 4:
        return r.push('<svg aria-hidden="true" style="display:none" id="'), r.push(n.segmentPrefix), n = i.toString(16), r.push(n), r.push('">');
      case 5:
        return r.push('<math aria-hidden="true" style="display:none" id="'), r.push(n.segmentPrefix), n = i.toString(16), r.push(n), r.push('">');
      case 6:
        return r.push('<table hidden id="'), r.push(n.segmentPrefix), n = i.toString(16), r.push(n), r.push('">');
      case 7:
        return r.push('<table hidden><tbody id="'), r.push(n.segmentPrefix), n = i.toString(16), r.push(n), r.push('">');
      case 8:
        return r.push('<table hidden><tr id="'), r.push(n.segmentPrefix), n = i.toString(16), r.push(n), r.push('">');
      case 9:
        return r.push('<table hidden><colgroup id="'), r.push(n.segmentPrefix), n = i.toString(16), r.push(n), r.push('">');
      default:
        throw Error("Unknown insertion mode. This is a bug in React.");
    }
  }
  __name(Fs, "Fs");
  function Os(r, n) {
    switch (n.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return r.push("</div>");
      case 4:
        return r.push("</svg>");
      case 5:
        return r.push("</math>");
      case 6:
        return r.push("</table>");
      case 7:
        return r.push("</tbody></table>");
      case 8:
        return r.push("</tr></table>");
      case 9:
        return r.push("</colgroup></table>");
      default:
        throw Error("Unknown insertion mode. This is a bug in React.");
    }
  }
  __name(Os, "Os");
  var Ti = /[<\u2028\u2029]/g;
  function Ns(r) {
    return JSON.stringify(r).replace(Ti, function(n) {
      switch (n) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  __name(Ns, "Ns");
  var Ci = /[&><\u2028\u2029]/g;
  function pn(r) {
    return JSON.stringify(r).replace(Ci, function(n) {
      switch (n) {
        case "&":
          return "\\u0026";
        case ">":
          return "\\u003e";
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  __name(pn, "pn");
  var qe = false, st = true;
  function xe(r) {
    var n = r.rules, a = r.hrefs, i = 0;
    if (a.length) {
      for (this.push(ee.startInlineStyle), this.push(' media="not all" data-precedence="'), this.push(r.precedence), this.push('" data-href="'); i < a.length - 1; i++) this.push(a[i]), this.push(" ");
      for (this.push(a[i]), this.push('">'), i = 0; i < n.length; i++) this.push(n[i]);
      st = this.push("</style>"), qe = true, n.length = 0, a.length = 0;
    }
  }
  __name(xe, "xe");
  function Ca(r) {
    return r.state !== 2 ? qe = true : false;
  }
  __name(Ca, "Ca");
  function Fo(r, n, a) {
    return qe = false, st = true, ee = a, n.styles.forEach(xe, r), ee = null, n.stylesheets.forEach(Ca), qe && (a.stylesToHoist = true), st;
  }
  __name(Fo, "Fo");
  function Se(r) {
    for (var n = 0; n < r.length; n++) this.push(r[n]);
    r.length = 0;
  }
  __name(Se, "Se");
  var Yt = [];
  function js(r) {
    Ue(Yt, r.props);
    for (var n = 0; n < Yt.length; n++) this.push(Yt[n]);
    Yt.length = 0, r.state = 2;
  }
  __name(js, "js");
  function wa(r) {
    var n = 0 < r.sheets.size;
    r.sheets.forEach(js, this), r.sheets.clear();
    var a = r.rules, i = r.hrefs;
    if (!n || i.length) {
      if (this.push(ee.startInlineStyle), this.push(' data-precedence="'), this.push(r.precedence), r = 0, i.length) {
        for (this.push('" data-href="'); r < i.length - 1; r++) this.push(i[r]), this.push(" ");
        this.push(i[r]);
      }
      for (this.push('">'), r = 0; r < a.length; r++) this.push(a[r]);
      this.push("</style>"), a.length = 0, i.length = 0;
    }
  }
  __name(wa, "wa");
  function Ds(r) {
    if (r.state === 0) {
      r.state = 1;
      var n = r.props;
      for (Ue(Yt, { rel: "preload", as: "style", href: r.props.href, crossOrigin: n.crossOrigin, fetchPriority: n.fetchPriority, integrity: n.integrity, media: n.media, hrefLang: n.hrefLang, referrerPolicy: n.referrerPolicy }), r = 0; r < Yt.length; r++) this.push(Yt[r]);
      Yt.length = 0;
    }
  }
  __name(Ds, "Ds");
  function Ms(r) {
    r.sheets.forEach(Ds, this), r.sheets.clear();
  }
  __name(Ms, "Ms");
  function Wn(r, n) {
    (n.instructions & 32) === 0 && (n.instructions |= 32, r.push(' id="', M("_" + n.idPrefix + "R_"), '"'));
  }
  __name(Wn, "Wn");
  function me(r, n) {
    r.push("[");
    var a = "[";
    n.stylesheets.forEach(function(i) {
      if (i.state !== 2) if (i.state === 3) r.push(a), i = pn("" + i.props.href), r.push(i), r.push("]"), a = ",[";
      else {
        r.push(a);
        var u = i.props["data-precedence"], p = i.props, h = w("" + i.props.href);
        h = pn(h), r.push(h), u = "" + u, r.push(","), u = pn(u), r.push(u);
        for (var v in p) if (ye.call(p, v) && (u = p[v], u != null)) switch (v) {
          case "href":
          case "rel":
          case "precedence":
          case "data-precedence":
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error("link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
          default:
            Re(r, v, u);
        }
        r.push("]"), a = ",[", i.state = 3;
      }
    }), r.push("]");
  }
  __name(me, "me");
  function Re(r, n, a) {
    var i = n.toLowerCase();
    switch (typeof a) {
      case "function":
      case "symbol":
        return;
    }
    switch (n) {
      case "innerHTML":
      case "dangerouslySetInnerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "style":
      case "ref":
        return;
      case "className":
        i = "class", n = "" + a;
        break;
      case "hidden":
        if (a === false) return;
        n = "";
        break;
      case "src":
      case "href":
        a = w(a), n = "" + a;
        break;
      default:
        if (2 < n.length && (n[0] === "o" || n[0] === "O") && (n[1] === "n" || n[1] === "N") || !be(n)) return;
        n = "" + a;
    }
    r.push(","), i = pn(i), r.push(i), r.push(","), i = pn(n), r.push(i);
  }
  __name(Re, "Re");
  function Mr() {
    return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set(), suspenseyImages: false };
  }
  __name(Mr, "Mr");
  function mt(r) {
    var n = $e || null;
    if (n) {
      var a = n.resumableState, i = n.renderState;
      if (typeof r == "string" && r) {
        if (!a.dnsResources.hasOwnProperty(r)) {
          a.dnsResources[r] = null, a = i.headers;
          var u, p;
          (p = a && 0 < a.remainingCapacity) && (p = (u = "<" + ("" + r).replace(Oo, pr) + ">; rel=dns-prefetch", 0 <= (a.remainingCapacity -= u.length + 2))), p ? (i.resets.dns[r] = null, a.preconnects && (a.preconnects += ", "), a.preconnects += u) : (u = [], Ue(u, { href: r, rel: "dns-prefetch" }), i.preconnects.add(u));
        }
        zr(n);
      }
    } else D.D(r);
  }
  __name(mt, "mt");
  function wi(r, n) {
    var a = $e || null;
    if (a) {
      var i = a.resumableState, u = a.renderState;
      if (typeof r == "string" && r) {
        var p = n === "use-credentials" ? "credentials" : typeof n == "string" ? "anonymous" : "default";
        if (!i.connectResources[p].hasOwnProperty(r)) {
          i.connectResources[p][r] = null, i = u.headers;
          var h, v;
          if (v = i && 0 < i.remainingCapacity) {
            if (v = "<" + ("" + r).replace(Oo, pr) + ">; rel=preconnect", typeof n == "string") {
              var g = ("" + n).replace(No, Ra);
              v += '; crossorigin="' + g + '"';
            }
            v = (h = v, 0 <= (i.remainingCapacity -= h.length + 2));
          }
          v ? (u.resets.connect[p][r] = null, i.preconnects && (i.preconnects += ", "), i.preconnects += h) : (p = [], Ue(p, { rel: "preconnect", href: r, crossOrigin: n }), u.preconnects.add(p));
        }
        zr(a);
      }
    } else D.C(r, n);
  }
  __name(wi, "wi");
  function xa(r, n, a) {
    var i = $e || null;
    if (i) {
      var u = i.resumableState, p = i.renderState;
      if (n && r) {
        switch (n) {
          case "image":
            if (a) var h = a.imageSrcSet, v = a.imageSizes, g = a.fetchPriority;
            var T = h ? h + `
` + (v || "") : r;
            if (u.imageResources.hasOwnProperty(T)) return;
            u.imageResources[T] = V, u = p.headers;
            var E;
            u && 0 < u.remainingCapacity && typeof h != "string" && g === "high" && (E = Un(r, n, a), 0 <= (u.remainingCapacity -= E.length + 2)) ? (p.resets.image[T] = V, u.highImagePreloads && (u.highImagePreloads += ", "), u.highImagePreloads += E) : (u = [], Ue(u, K({ rel: "preload", href: h ? void 0 : r, as: n }, a)), g === "high" ? p.highImagePreloads.add(u) : (p.bulkPreloads.add(u), p.preloads.images.set(T, u)));
            break;
          case "style":
            if (u.styleResources.hasOwnProperty(r)) return;
            h = [], Ue(h, K({ rel: "preload", href: r, as: n }, a)), u.styleResources[r] = !a || typeof a.crossOrigin != "string" && typeof a.integrity != "string" ? V : [a.crossOrigin, a.integrity], p.preloads.stylesheets.set(r, h), p.bulkPreloads.add(h);
            break;
          case "script":
            if (u.scriptResources.hasOwnProperty(r)) return;
            h = [], p.preloads.scripts.set(r, h), p.bulkPreloads.add(h), Ue(h, K({ rel: "preload", href: r, as: n }, a)), u.scriptResources[r] = !a || typeof a.crossOrigin != "string" && typeof a.integrity != "string" ? V : [a.crossOrigin, a.integrity];
            break;
          default:
            if (u.unknownResources.hasOwnProperty(n)) {
              if (h = u.unknownResources[n], h.hasOwnProperty(r)) return;
            } else h = {}, u.unknownResources[n] = h;
            h[r] = V, (u = p.headers) && 0 < u.remainingCapacity && n === "font" && (T = Un(r, n, a), 0 <= (u.remainingCapacity -= T.length + 2)) ? (p.resets.font[r] = V, u.fontPreloads && (u.fontPreloads += ", "), u.fontPreloads += T) : (u = [], r = K({ rel: "preload", href: r, as: n }, a), Ue(u, r), n) === "font" ? p.fontPreloads.add(u) : p.bulkPreloads.add(u);
        }
        zr(i);
      }
    } else D.L(r, n, a);
  }
  __name(xa, "xa");
  function Ls(r, n) {
    var a = $e || null;
    if (a) {
      var i = a.resumableState, u = a.renderState;
      if (r) {
        var p = n && typeof n.as == "string" ? n.as : "script";
        switch (p) {
          case "script":
            if (i.moduleScriptResources.hasOwnProperty(r)) return;
            p = [], i.moduleScriptResources[r] = !n || typeof n.crossOrigin != "string" && typeof n.integrity != "string" ? V : [n.crossOrigin, n.integrity], u.preloads.moduleScripts.set(r, p);
            break;
          default:
            if (i.moduleUnknownResources.hasOwnProperty(p)) {
              var h = i.unknownResources[p];
              if (h.hasOwnProperty(r)) return;
            } else h = {}, i.moduleUnknownResources[p] = h;
            p = [], h[r] = V;
        }
        Ue(p, K({ rel: "modulepreload", href: r }, n)), u.bulkPreloads.add(p), zr(a);
      }
    } else D.m(r, n);
  }
  __name(Ls, "Ls");
  function Hs(r, n, a) {
    var i = $e || null;
    if (i) {
      var u = i.resumableState, p = i.renderState;
      if (r) {
        n = n || "default";
        var h = p.styles.get(n), v = u.styleResources.hasOwnProperty(r) ? u.styleResources[r] : void 0;
        v !== null && (u.styleResources[r] = null, h || (h = { precedence: M(n), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, p.styles.set(n, h)), n = { state: 0, props: K({ rel: "stylesheet", href: r, "data-precedence": n }, a) }, v && (v.length === 2 && De(n.props, v), (p = p.preloads.stylesheets.get(r)) && 0 < p.length ? p.length = 0 : n.state = 1), h.sheets.set(r, n), zr(i));
      }
    } else D.S(r, n, a);
  }
  __name(Hs, "Hs");
  function xi(r, n) {
    var a = $e || null;
    if (a) {
      var i = a.resumableState, u = a.renderState;
      if (r) {
        var p = i.scriptResources.hasOwnProperty(r) ? i.scriptResources[r] : void 0;
        p !== null && (i.scriptResources[r] = null, n = K({ src: r, async: true }, n), p && (p.length === 2 && De(n, p), r = u.preloads.scripts.get(r)) && (r.length = 0), r = [], u.scripts.add(r), _o(r, n), zr(a));
      }
    } else D.X(r, n);
  }
  __name(xi, "xi");
  function Ri(r, n) {
    var a = $e || null;
    if (a) {
      var i = a.resumableState, u = a.renderState;
      if (r) {
        var p = i.moduleScriptResources.hasOwnProperty(r) ? i.moduleScriptResources[r] : void 0;
        p !== null && (i.moduleScriptResources[r] = null, n = K({ src: r, type: "module", async: true }, n), p && (p.length === 2 && De(n, p), r = u.preloads.moduleScripts.get(r)) && (r.length = 0), r = [], u.scripts.add(r), _o(r, n), zr(a));
      }
    } else D.M(r, n);
  }
  __name(Ri, "Ri");
  function De(r, n) {
    r.crossOrigin == null && (r.crossOrigin = n[0]), r.integrity == null && (r.integrity = n[1]);
  }
  __name(De, "De");
  function Un(r, n, a) {
    r = ("" + r).replace(Oo, pr), n = ("" + n).replace(No, Ra), n = "<" + r + '>; rel=preload; as="' + n + '"';
    for (var i in a) ye.call(a, i) && (r = a[i], typeof r == "string" && (n += "; " + i.toLowerCase() + '="' + ("" + r).replace(No, Ra) + '"'));
    return n;
  }
  __name(Un, "Un");
  var Oo = /[<>\r\n]/g;
  function pr(r) {
    switch (r) {
      case "<":
        return "%3C";
      case ">":
        return "%3E";
      case `
`:
        return "%0A";
      case "\r":
        return "%0D";
      default:
        throw Error("escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  }
  __name(pr, "pr");
  var No = /["';,\r\n]/g;
  function Ra(r) {
    switch (r) {
      case '"':
        return "%22";
      case "'":
        return "%27";
      case ";":
        return "%3B";
      case ",":
        return "%2C";
      case `
`:
        return "%0A";
      case "\r":
        return "%0D";
      default:
        throw Error("escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  }
  __name(Ra, "Ra");
  function Ei(r) {
    this.styles.add(r);
  }
  __name(Ei, "Ei");
  function Pi(r) {
    this.stylesheets.add(r);
  }
  __name(Pi, "Pi");
  function Jt(r, n) {
    n.styles.forEach(Ei, r), n.stylesheets.forEach(Pi, r), n.suspenseyImages && (r.suspenseyImages = true);
  }
  __name(Jt, "Jt");
  function Ea(r, n) {
    var a = r.idPrefix, i = [], u = r.bootstrapScriptContent, p = r.bootstrapScripts, h = r.bootstrapModules;
    u !== void 0 && (i.push("<script"), Wn(i, r), i.push(">", ("" + u).replace(pe, dt), "<\/script>")), u = a + "P:";
    var v = a + "S:";
    a += "B:";
    var g = /* @__PURE__ */ new Set(), T = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Set(), R = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Set(), H = /* @__PURE__ */ new Set(), re = /* @__PURE__ */ new Set(), J = { images: /* @__PURE__ */ new Map(), stylesheets: /* @__PURE__ */ new Map(), scripts: /* @__PURE__ */ new Map(), moduleScripts: /* @__PURE__ */ new Map() };
    if (p !== void 0) for (var G = 0; G < p.length; G++) {
      var W = p[G], X, ve = void 0, Pe = void 0, ae = { rel: "preload", as: "script", fetchPriority: "low", nonce: void 0 };
      typeof W == "string" ? ae.href = X = W : (ae.href = X = W.src, ae.integrity = Pe = typeof W.integrity == "string" ? W.integrity : void 0, ae.crossOrigin = ve = typeof W == "string" || W.crossOrigin == null ? void 0 : W.crossOrigin === "use-credentials" ? "use-credentials" : ""), W = r;
      var ce = X;
      W.scriptResources[ce] = null, W.moduleScriptResources[ce] = null, W = [], Ue(W, ae), $.add(W), i.push('<script src="', M(X), '"'), typeof Pe == "string" && i.push(' integrity="', M(Pe), '"'), typeof ve == "string" && i.push(' crossorigin="', M(ve), '"'), Wn(i, r), i.push(' async=""><\/script>');
    }
    if (h !== void 0) for (p = 0; p < h.length; p++) ae = h[p], ve = X = void 0, Pe = { rel: "modulepreload", fetchPriority: "low", nonce: void 0 }, typeof ae == "string" ? Pe.href = G = ae : (Pe.href = G = ae.src, Pe.integrity = ve = typeof ae.integrity == "string" ? ae.integrity : void 0, Pe.crossOrigin = X = typeof ae == "string" || ae.crossOrigin == null ? void 0 : ae.crossOrigin === "use-credentials" ? "use-credentials" : ""), ae = r, W = G, ae.scriptResources[W] = null, ae.moduleScriptResources[W] = null, ae = [], Ue(ae, Pe), $.add(ae), i.push('<script type="module" src="', M(G), '"'), typeof ve == "string" && i.push(' integrity="', M(ve), '"'), typeof X == "string" && i.push(' crossorigin="', M(X), '"'), Wn(i, r), i.push(' async=""><\/script>');
    return { placeholderPrefix: u, segmentPrefix: v, boundaryPrefix: a, startInlineScript: "<script", startInlineStyle: "<style", preamble: { htmlChunks: null, headChunks: null, bodyChunks: null }, externalRuntimeScript: null, bootstrapChunks: i, importMapChunks: [], onHeaders: void 0, headers: null, resets: { font: {}, dns: {}, connect: { default: {}, anonymous: {}, credentials: {} }, image: {}, style: {} }, charsetChunks: [], viewportChunks: [], hoistableChunks: [], preconnects: g, fontPreloads: T, highImagePreloads: E, styles: R, bootstrapScripts: $, scripts: H, bulkPreloads: re, preloads: J, nonce: { script: void 0, style: void 0 }, stylesToHoist: false, generateStaticMarkup: n };
  }
  __name(Ea, "Ea");
  function zn(r, n, a, i) {
    return a.generateStaticMarkup ? (r.push(M(n)), false) : (n === "" ? r = i : (i && r.push("<!-- -->"), r.push(M(n)), r = true), r);
  }
  __name(zn, "zn");
  function Lr(r, n, a, i) {
    n.generateStaticMarkup || a && i && r.push("<!-- -->");
  }
  __name(Lr, "Lr");
  var _i = Function.prototype.bind, Bs = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Ie(r) {
    if (r == null) return null;
    if (typeof r == "function") return r.$$typeof === Bs ? null : r.displayName || r.name || null;
    if (typeof r == "string") return r;
    switch (r) {
      case Q:
        return "Fragment";
      case ge:
        return "Profiler";
      case B:
        return "StrictMode";
      case oe:
        return "Suspense";
      case Je:
        return "SuspenseList";
      case $r:
        return "Activity";
    }
    if (typeof r == "object") switch (r.$$typeof) {
      case O:
        return "Portal";
      case L:
        return r.displayName || "Context";
      case we:
        return (r._context.displayName || "Context") + ".Consumer";
      case P:
        var n = r.render;
        return r = r.displayName, r || (r = n.displayName || n.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
      case kt:
        return n = r.displayName || null, n !== null ? n : Ie(r.type) || "Memo";
      case Pt:
        n = r._payload, r = r._init;
        try {
          return Ie(r(n));
        } catch {
        }
    }
    return null;
  }
  __name(Ie, "Ie");
  var qs = {}, Hr = null;
  function Kn(r, n) {
    if (r !== n) {
      r.context._currentValue2 = r.parentValue, r = r.parent;
      var a = n.parent;
      if (r === null) {
        if (a !== null) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
      } else {
        if (a === null) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        Kn(r, a);
      }
      n.context._currentValue2 = n.value;
    }
  }
  __name(Kn, "Kn");
  function dr(r) {
    r.context._currentValue2 = r.parentValue, r = r.parent, r !== null && dr(r);
  }
  __name(dr, "dr");
  function Pa(r) {
    var n = r.parent;
    n !== null && Pa(n), r.context._currentValue2 = r.value;
  }
  __name(Pa, "Pa");
  function _a(r, n) {
    if (r.context._currentValue2 = r.parentValue, r = r.parent, r === null) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    r.depth === n.depth ? Kn(r, n) : _a(r, n);
  }
  __name(_a, "_a");
  function Vs(r, n) {
    var a = n.parent;
    if (a === null) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    r.depth === a.depth ? Kn(r, a) : Vs(r, a), n.context._currentValue2 = n.value;
  }
  __name(Vs, "Vs");
  function hr(r) {
    var n = Hr;
    n !== r && (n === null ? Pa(r) : r === null ? dr(n) : n.depth === r.depth ? Kn(n, r) : n.depth > r.depth ? _a(n, r) : Vs(n, r), Hr = r);
  }
  __name(hr, "hr");
  var Ws = { enqueueSetState: /* @__PURE__ */ __name(function(r, n) {
    r = r._reactInternals, r.queue !== null && r.queue.push(n);
  }, "enqueueSetState"), enqueueReplaceState: /* @__PURE__ */ __name(function(r, n) {
    r = r._reactInternals, r.replace = true, r.queue = [n];
  }, "enqueueReplaceState"), enqueueForceUpdate: /* @__PURE__ */ __name(function() {
  }, "enqueueForceUpdate") }, Ii = { id: 1, overflow: "" };
  function Br(r, n, a) {
    var i = r.id;
    r = r.overflow;
    var u = 32 - jo(i) - 1;
    i &= ~(1 << u), a += 1;
    var p = 32 - jo(n) + u;
    if (30 < p) {
      var h = u - u % 5;
      return p = (i & (1 << h) - 1).toString(32), i >>= h, u -= h, { id: 1 << 32 - jo(n) + u | a << u | i, overflow: p + r };
    }
    return { id: 1 << p | a << u | i, overflow: r };
  }
  __name(Br, "Br");
  var jo = Math.clz32 ? Math.clz32 : Fi, Ai = Math.log, $i = Math.LN2;
  function Fi(r) {
    return r >>>= 0, r === 0 ? 32 : 31 - (Ai(r) / $i | 0) | 0;
  }
  __name(Fi, "Fi");
  function tt() {
  }
  __name(tt, "tt");
  var ft = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`.");
  function Oi(r, n, a) {
    switch (a = r[a], a === void 0 ? r.push(n) : a !== n && (n.then(tt, tt), n = a), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw n.reason;
      default:
        switch (typeof n.status == "string" ? n.then(tt, tt) : (r = n, r.status = "pending", r.then(function(i) {
          if (n.status === "pending") {
            var u = n;
            u.status = "fulfilled", u.value = i;
          }
        }, function(i) {
          if (n.status === "pending") {
            var u = n;
            u.status = "rejected", u.reason = i;
          }
        })), n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw n.reason;
        }
        throw Do = n, ft;
    }
  }
  __name(Oi, "Oi");
  var Do = null;
  function Mo() {
    if (Do === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
    var r = Do;
    return Do = null, r;
  }
  __name(Mo, "Mo");
  function Us(r, n) {
    return r === n && (r !== 0 || 1 / r === 1 / n) || r !== r && n !== n;
  }
  __name(Us, "Us");
  var Ni = typeof Object.is == "function" ? Object.is : Us, Gt = null, Ia = null, Aa = null, $a = null, Lo = null, ke = null, Yn = false, Ho = false, Jn = 0, Gn = 0, Xn = -1, Bo = 0, dn = null, mr = null, qo = 0;
  function Xt() {
    if (Gt === null) throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    return Gt;
  }
  __name(Xt, "Xt");
  function zs() {
    if (0 < qo) throw Error("Rendered more hooks than during the previous render");
    return { memoizedState: null, queue: null, next: null };
  }
  __name(zs, "zs");
  function Fa() {
    return ke === null ? Lo === null ? (Yn = false, Lo = ke = zs()) : (Yn = true, ke = Lo) : ke.next === null ? (Yn = false, ke = ke.next = zs()) : (Yn = true, ke = ke.next), ke;
  }
  __name(Fa, "Fa");
  function hn() {
    var r = dn;
    return dn = null, r;
  }
  __name(hn, "hn");
  function Qn() {
    $a = Aa = Ia = Gt = null, Ho = false, Lo = null, qo = 0, ke = mr = null;
  }
  __name(Qn, "Qn");
  function Ks(r, n) {
    return typeof n == "function" ? n(r) : n;
  }
  __name(Ks, "Ks");
  function Ys(r, n, a) {
    if (Gt = Xt(), ke = Fa(), Yn) {
      var i = ke.queue;
      if (n = i.dispatch, mr !== null && (a = mr.get(i), a !== void 0)) {
        mr.delete(i), i = ke.memoizedState;
        do
          i = r(i, a.action), a = a.next;
        while (a !== null);
        return ke.memoizedState = i, [i, n];
      }
      return [ke.memoizedState, n];
    }
    return r = r === Ks ? typeof n == "function" ? n() : n : a !== void 0 ? a(n) : n, ke.memoizedState = r, r = ke.queue = { last: null, dispatch: null }, r = r.dispatch = ji.bind(null, Gt, r), [ke.memoizedState, r];
  }
  __name(Ys, "Ys");
  function Js(r, n) {
    if (Gt = Xt(), ke = Fa(), n = n === void 0 ? null : n, ke !== null) {
      var a = ke.memoizedState;
      if (a !== null && n !== null) {
        var i = a[1];
        e: if (i === null) i = false;
        else {
          for (var u = 0; u < i.length && u < n.length; u++) if (!Ni(n[u], i[u])) {
            i = false;
            break e;
          }
          i = true;
        }
        if (i) return a[0];
      }
    }
    return r = r(), ke.memoizedState = [r, n], r;
  }
  __name(Js, "Js");
  function ji(r, n, a) {
    if (25 <= qo) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
    if (r === Gt) if (Ho = true, r = { action: a, next: null }, mr === null && (mr = /* @__PURE__ */ new Map()), a = mr.get(n), a === void 0) mr.set(n, r);
    else {
      for (n = a; n.next !== null; ) n = n.next;
      n.next = r;
    }
  }
  __name(ji, "ji");
  function Di() {
    throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
  }
  __name(Di, "Di");
  function Mi() {
    throw Error("startTransition cannot be called during server rendering.");
  }
  __name(Mi, "Mi");
  function Gs() {
    throw Error("Cannot update optimistic state while rendering.");
  }
  __name(Gs, "Gs");
  function Xs(r, n, a) {
    Xt();
    var i = Gn++, u = Aa;
    if (typeof r.$$FORM_ACTION == "function") {
      var p = null, h = $a;
      u = u.formState;
      var v = r.$$IS_SIGNATURE_EQUAL;
      if (u !== null && typeof v == "function") {
        var g = u[1];
        v.call(r, u[2], u[3]) && (p = a !== void 0 ? "p" + a : "k" + ln(JSON.stringify([h, null, i]), 0), g === p && (Xn = i, n = u[0]));
      }
      var T = r.bind(null, n);
      return r = /* @__PURE__ */ __name(function(R) {
        T(R);
      }, "r"), typeof T.$$FORM_ACTION == "function" && (r.$$FORM_ACTION = function(R) {
        R = T.$$FORM_ACTION(R), a !== void 0 && (a += "", R.action = a);
        var $ = R.data;
        return $ && (p === null && (p = a !== void 0 ? "p" + a : "k" + ln(JSON.stringify([h, null, i]), 0)), $.append("$ACTION_KEY", p)), R;
      }), [n, r, false];
    }
    var E = r.bind(null, n);
    return [n, function(R) {
      E(R);
    }, false];
  }
  __name(Xs, "Xs");
  function Qs(r) {
    var n = Bo;
    return Bo += 1, dn === null && (dn = []), Oi(dn, r, n);
  }
  __name(Qs, "Qs");
  function Li() {
    throw Error("Cache cannot be refreshed during server rendering.");
  }
  __name(Li, "Li");
  var Zs = { readContext: /* @__PURE__ */ __name(function(r) {
    return r._currentValue2;
  }, "readContext"), use: /* @__PURE__ */ __name(function(r) {
    if (r !== null && typeof r == "object") {
      if (typeof r.then == "function") return Qs(r);
      if (r.$$typeof === L) return r._currentValue2;
    }
    throw Error("An unsupported type was passed to use(): " + String(r));
  }, "use"), useContext: /* @__PURE__ */ __name(function(r) {
    return Xt(), r._currentValue2;
  }, "useContext"), useMemo: Js, useReducer: Ys, useRef: /* @__PURE__ */ __name(function(r) {
    Gt = Xt(), ke = Fa();
    var n = ke.memoizedState;
    return n === null ? (r = { current: r }, ke.memoizedState = r) : n;
  }, "useRef"), useState: /* @__PURE__ */ __name(function(r) {
    return Ys(Ks, r);
  }, "useState"), useInsertionEffect: tt, useLayoutEffect: tt, useCallback: /* @__PURE__ */ __name(function(r, n) {
    return Js(function() {
      return r;
    }, n);
  }, "useCallback"), useImperativeHandle: tt, useEffect: tt, useDebugValue: tt, useDeferredValue: /* @__PURE__ */ __name(function(r, n) {
    return Xt(), n !== void 0 ? n : r;
  }, "useDeferredValue"), useTransition: /* @__PURE__ */ __name(function() {
    return Xt(), [false, Mi];
  }, "useTransition"), useId: /* @__PURE__ */ __name(function() {
    var r = Ia.treeContext, n = r.overflow;
    r = r.id, r = (r & ~(1 << 32 - jo(r) - 1)).toString(32) + n;
    var a = Vo;
    if (a === null) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
    return n = Jn++, r = "_" + a.idPrefix + "R_" + r, 0 < n && (r += "H" + n.toString(32)), r + "_";
  }, "useId"), useSyncExternalStore: /* @__PURE__ */ __name(function(r, n, a) {
    if (a === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
    return a();
  }, "useSyncExternalStore"), useOptimistic: /* @__PURE__ */ __name(function(r) {
    return Xt(), [r, Gs];
  }, "useOptimistic"), useActionState: Xs, useFormState: Xs, useHostTransitionStatus: /* @__PURE__ */ __name(function() {
    return Xt(), F;
  }, "useHostTransitionStatus"), useMemoCache: /* @__PURE__ */ __name(function(r) {
    for (var n = Array(r), a = 0; a < r; a++) n[a] = _t;
    return n;
  }, "useMemoCache"), useCacheRefresh: /* @__PURE__ */ __name(function() {
    return Li;
  }, "useCacheRefresh"), useEffectEvent: /* @__PURE__ */ __name(function() {
    return Di;
  }, "useEffectEvent") }, Vo = null, Hi = { getCacheForType: /* @__PURE__ */ __name(function() {
    throw Error("Not implemented.");
  }, "getCacheForType"), cacheSignal: /* @__PURE__ */ __name(function() {
    throw Error("Not implemented.");
  }, "cacheSignal") }, Oa, ei;
  function mn(r) {
    if (Oa === void 0) try {
      throw Error();
    } catch (a) {
      var n = a.stack.trim().match(/\n( *(at )?)/);
      Oa = n && n[1] || "", ei = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + Oa + r + ei;
  }
  __name(mn, "mn");
  var Na = false;
  function Wo(r, n) {
    if (!r || Na) return "";
    Na = true;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = { DetermineComponentFrameRoot: /* @__PURE__ */ __name(function() {
        try {
          if (n) {
            var R = /* @__PURE__ */ __name(function() {
              throw Error();
            }, "R");
            if (Object.defineProperty(R.prototype, "props", { set: /* @__PURE__ */ __name(function() {
              throw Error();
            }, "set") }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(R, []);
              } catch (H) {
                var $ = H;
              }
              Reflect.construct(r, [], R);
            } else {
              try {
                R.call();
              } catch (H) {
                $ = H;
              }
              r.call(R.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (H) {
              $ = H;
            }
            (R = r()) && typeof R.catch == "function" && R.catch(function() {
            });
          }
        } catch (H) {
          if (H && $ && typeof H.stack == "string") return [H.stack, $.stack];
        }
        return [null, null];
      }, "DetermineComponentFrameRoot") };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
      u && u.configurable && Object.defineProperty(i.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var p = i.DetermineComponentFrameRoot(), h = p[0], v = p[1];
      if (h && v) {
        var g = h.split(`
`), T = v.split(`
`);
        for (u = i = 0; i < g.length && !g[i].includes("DetermineComponentFrameRoot"); ) i++;
        for (; u < T.length && !T[u].includes("DetermineComponentFrameRoot"); ) u++;
        if (i === g.length || u === T.length) for (i = g.length - 1, u = T.length - 1; 1 <= i && 0 <= u && g[i] !== T[u]; ) u--;
        for (; 1 <= i && 0 <= u; i--, u--) if (g[i] !== T[u]) {
          if (i !== 1 || u !== 1) do
            if (i--, u--, 0 > u || g[i] !== T[u]) {
              var E = `
` + g[i].replace(" at new ", " at ");
              return r.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", r.displayName)), E;
            }
          while (1 <= i && 0 <= u);
          break;
        }
      }
    } finally {
      Na = false, Error.prepareStackTrace = a;
    }
    return (a = r ? r.displayName || r.name : "") ? mn(a) : "";
  }
  __name(Wo, "Wo");
  function ti(r) {
    if (typeof r == "string") return mn(r);
    if (typeof r == "function") return r.prototype && r.prototype.isReactComponent ? Wo(r, true) : Wo(r, false);
    if (typeof r == "object" && r !== null) {
      switch (r.$$typeof) {
        case P:
          return Wo(r.render, false);
        case kt:
          return Wo(r.type, false);
        case Pt:
          var n = r, a = n._payload;
          n = n._init;
          try {
            r = n(a);
          } catch {
            return mn("Lazy");
          }
          return ti(r);
      }
      if (typeof r.name == "string") {
        e: {
          a = r.name, n = r.env;
          var i = r.debugLocation;
          if (i != null && (r = Error.prepareStackTrace, Error.prepareStackTrace = void 0, i = i.stack, Error.prepareStackTrace = r, i.startsWith(`Error: react-stack-top-frame
`) && (i = i.slice(29)), r = i.indexOf(`
`), r !== -1 && (i = i.slice(r + 1)), r = i.indexOf("react_stack_bottom_frame"), r !== -1 && (r = i.lastIndexOf(`
`, r)), r = r !== -1 ? i = i.slice(0, r) : "", i = r.lastIndexOf(`
`), r = i === -1 ? r : r.slice(i + 1), r.indexOf(a) !== -1)) {
            a = `
` + r;
            break e;
          }
          a = mn(a + (n ? " [" + n + "]" : ""));
        }
        return a;
      }
    }
    switch (r) {
      case Je:
        return mn("SuspenseList");
      case oe:
        return mn("Suspense");
    }
    return "";
  }
  __name(ti, "ti");
  function fn(r, n) {
    return (500 < n.byteSize || false) && n.contentPreamble === null;
  }
  __name(fn, "fn");
  function Bi(r) {
    if (typeof r == "object" && r !== null && typeof r.environmentName == "string") {
      var n = r.environmentName;
      r = [r].slice(0), typeof r[0] == "string" ? r.splice(0, 1, "[%s] " + r[0], " " + n + " ") : r.splice(0, 0, "[%s]", " " + n + " "), r.unshift(console), n = _i.apply(console.error, r), n();
    } else console.error(r);
    return null;
  }
  __name(Bi, "Bi");
  function qi(r, n, a, i, u, p, h, v, g, T, E) {
    var R = /* @__PURE__ */ new Set();
    this.destination = null, this.flushScheduled = false, this.resumableState = r, this.renderState = n, this.rootFormatContext = a, this.progressiveChunkSize = i === void 0 ? 12800 : i, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.byteSize = 0, this.abortableTasks = R, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = u === void 0 ? Bi : u, this.onPostpone = T === void 0 ? tt : T, this.onAllReady = p === void 0 ? tt : p, this.onShellReady = h === void 0 ? tt : h, this.onShellError = v === void 0 ? tt : v, this.onFatalError = g === void 0 ? tt : g, this.formState = E === void 0 ? null : E;
  }
  __name(qi, "qi");
  function Vi(r, n, a, i, u, p, h, v, g, T, E, R) {
    return n = new qi(n, a, i, u, p, h, v, g, T, E, R), a = Dt(n, 0, null, i, false, false), a.parentFlushed = true, r = Uo(n, null, r, -1, null, a, null, null, n.abortableTasks, null, i, null, Ii, null, null), qr(r), n.pingedTasks.push(r), n;
  }
  __name(Vi, "Vi");
  var $e = null;
  function ri(r, n) {
    r.pingedTasks.push(n), r.pingedTasks.length === 1 && (r.flushScheduled = r.destination !== null, yn(r));
  }
  __name(ri, "ri");
  function ja(r, n, a, i, u) {
    return a = { status: 0, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, row: n, completedSegments: [], byteSize: 0, fallbackAbortableTasks: a, errorDigest: null, contentState: Mr(), fallbackState: Mr(), contentPreamble: i, fallbackPreamble: u, trackedContentKeyPath: null, trackedFallbackNode: null }, n !== null && (n.pendingTasks++, i = n.boundaries, i !== null && (r.allPendingTasks++, a.pendingTasks++, i.push(a)), r = n.inheritedHoistables, r !== null && Jt(a.contentState, r)), a;
  }
  __name(ja, "ja");
  function Uo(r, n, a, i, u, p, h, v, g, T, E, R, $, H, re) {
    r.allPendingTasks++, u === null ? r.pendingRootTasks++ : u.pendingTasks++, H !== null && H.pendingTasks++;
    var J = { replay: null, node: a, childIndex: i, ping: /* @__PURE__ */ __name(function() {
      return ri(r, J);
    }, "ping"), blockedBoundary: u, blockedSegment: p, blockedPreamble: h, hoistableState: v, abortSet: g, keyPath: T, formatContext: E, context: R, treeContext: $, row: H, componentStack: re, thenableState: n };
    return g.add(J), J;
  }
  __name(Uo, "Uo");
  function ni(r, n, a, i, u, p, h, v, g, T, E, R, $, H) {
    r.allPendingTasks++, p === null ? r.pendingRootTasks++ : p.pendingTasks++, $ !== null && $.pendingTasks++, a.pendingTasks++;
    var re = { replay: a, node: i, childIndex: u, ping: /* @__PURE__ */ __name(function() {
      return ri(r, re);
    }, "ping"), blockedBoundary: p, blockedSegment: null, blockedPreamble: null, hoistableState: h, abortSet: v, keyPath: g, formatContext: T, context: E, treeContext: R, row: $, componentStack: H, thenableState: n };
    return v.add(re), re;
  }
  __name(ni, "ni");
  function Dt(r, n, a, i, u, p) {
    return { status: 0, parentFlushed: false, id: -1, index: n, chunks: [], children: [], preambleChildren: [], parentFormatContext: i, boundary: a, lastPushedText: u, textEmbedded: p };
  }
  __name(Dt, "Dt");
  function qr(r) {
    var n = r.node;
    typeof n == "object" && n !== null && n.$$typeof === j && (r.componentStack = { parent: r.componentStack, type: n.type });
  }
  __name(qr, "qr");
  function Da(r) {
    return r === null ? null : { parent: r.parent, type: "Suspense Fallback" };
  }
  __name(Da, "Da");
  function fr(r) {
    var n = {};
    return r && Object.defineProperty(n, "componentStack", { configurable: true, enumerable: true, get: /* @__PURE__ */ __name(function() {
      try {
        var a = "", i = r;
        do
          a += ti(i.type), i = i.parent;
        while (i);
        var u = a;
      } catch (p) {
        u = `
Error generating stack: ` + p.message + `
` + p.stack;
      }
      return Object.defineProperty(n, "componentStack", { value: u }), u;
    }, "get") }), n;
  }
  __name(fr, "fr");
  function ze(r, n, a) {
    if (r = r.onError, n = r(n, a), n == null || typeof n == "string") return n;
  }
  __name(ze, "ze");
  function rt(r, n) {
    var a = r.onShellError, i = r.onFatalError;
    a(n), i(n), r.destination !== null ? (r.status = 14, r.destination.destroy(n)) : (r.status = 13, r.fatalError = n);
  }
  __name(rt, "rt");
  function Ee(r, n) {
    Ma(r, n.next, n.hoistables);
  }
  __name(Ee, "Ee");
  function Ma(r, n, a) {
    for (; n !== null; ) {
      a !== null && (Jt(n.hoistables, a), n.inheritedHoistables = a);
      var i = n.boundaries;
      if (i !== null) {
        n.boundaries = null;
        for (var u = 0; u < i.length; u++) {
          var p = i[u];
          a !== null && Jt(p.contentState, a), gr(r, p, null, null);
        }
      }
      if (n.pendingTasks--, 0 < n.pendingTasks) break;
      a = n.hoistables, n = n.next;
    }
  }
  __name(Ma, "Ma");
  function La(r, n) {
    var a = n.boundaries;
    if (a !== null && n.pendingTasks === a.length) {
      for (var i = true, u = 0; u < a.length; u++) {
        var p = a[u];
        if (p.pendingTasks !== 1 || p.parentFlushed || fn(r, p)) {
          i = false;
          break;
        }
      }
      i && Ma(r, n, n.hoistables);
    }
  }
  __name(La, "La");
  function Zn(r) {
    var n = { pendingTasks: 1, boundaries: null, hoistables: Mr(), inheritedHoistables: null, together: false, next: null };
    return r !== null && 0 < r.pendingTasks && (n.pendingTasks++, n.boundaries = [], r.next = n), n;
  }
  __name(Zn, "Zn");
  function Ha(r, n, a, i, u) {
    var p = n.keyPath, h = n.treeContext, v = n.row;
    n.keyPath = a, a = i.length;
    var g = null;
    if (n.replay !== null) {
      var T = n.replay.slots;
      if (T !== null && typeof T == "object") for (var E = 0; E < a; E++) {
        var R = u !== "backwards" && u !== "unstable_legacy-backwards" ? E : a - 1 - E, $ = i[R];
        n.row = g = Zn(g), n.treeContext = Br(h, a, R);
        var H = T[R];
        typeof H == "number" ? (Ko(r, n, H, $, R), delete T[R]) : Ve(r, n, $, R), --g.pendingTasks === 0 && Ee(r, g);
      }
      else for (T = 0; T < a; T++) E = u !== "backwards" && u !== "unstable_legacy-backwards" ? T : a - 1 - T, R = i[E], n.row = g = Zn(g), n.treeContext = Br(h, a, E), Ve(r, n, R, E), --g.pendingTasks === 0 && Ee(r, g);
    } else if (u !== "backwards" && u !== "unstable_legacy-backwards") for (u = 0; u < a; u++) T = i[u], n.row = g = Zn(g), n.treeContext = Br(h, a, u), Ve(r, n, T, u), --g.pendingTasks === 0 && Ee(r, g);
    else {
      for (u = n.blockedSegment, T = u.children.length, E = u.chunks.length, R = a - 1; 0 <= R; R--) {
        $ = i[R], n.row = g = Zn(g), n.treeContext = Br(h, a, R), H = Dt(r, E, null, n.formatContext, R === 0 ? u.lastPushedText : true, true), u.children.splice(T, 0, H), n.blockedSegment = H;
        try {
          Ve(r, n, $, R), Lr(H.chunks, r.renderState, H.lastPushedText, H.textEmbedded), H.status = 1, --g.pendingTasks === 0 && Ee(r, g);
        } catch (re) {
          throw H.status = r.status === 12 ? 3 : 4, re;
        }
      }
      n.blockedSegment = u, u.lastPushedText = false;
    }
    v !== null && g !== null && 0 < g.pendingTasks && (v.pendingTasks++, g.next = v), n.treeContext = h, n.row = v, n.keyPath = p;
  }
  __name(Ha, "Ha");
  function oi(r, n, a, i, u, p) {
    var h = n.thenableState;
    for (n.thenableState = null, Gt = {}, Ia = n, Aa = r, $a = a, Gn = Jn = 0, Xn = -1, Bo = 0, dn = h, r = i(u, p); Ho; ) Ho = false, Gn = Jn = 0, Xn = -1, Bo = 0, qo += 1, ke = null, r = i(u, p);
    return Qn(), r;
  }
  __name(oi, "oi");
  function ai(r, n, a, i, u, p, h) {
    var v = false;
    if (p !== 0 && r.formState !== null) {
      var g = n.blockedSegment;
      if (g !== null) {
        v = true, g = g.chunks;
        for (var T = 0; T < p; T++) T === h ? g.push("<!--F!-->") : g.push("<!--F-->");
      }
    }
    p = n.keyPath, n.keyPath = a, u ? (a = n.treeContext, n.treeContext = Br(a, 1, 0), Ve(r, n, i, -1), n.treeContext = a) : v ? Ve(r, n, i, -1) : Tt(r, n, i, -1), n.keyPath = p;
  }
  __name(ai, "ai");
  function zo(r, n, a, i, u, p) {
    if (typeof i == "function") if (i.prototype && i.prototype.isReactComponent) {
      var h = u;
      if ("ref" in u) {
        h = {};
        for (var v in u) v !== "ref" && (h[v] = u[v]);
      }
      var g = i.defaultProps;
      if (g) {
        h === u && (h = K({}, h, u));
        for (var T in g) h[T] === void 0 && (h[T] = g[T]);
      }
      u = h, h = qs, g = i.contextType, typeof g == "object" && g !== null && (h = g._currentValue2), h = new i(u, h);
      var E = h.state !== void 0 ? h.state : null;
      if (h.updater = Ws, h.props = u, h.state = E, g = { queue: [], replace: false }, h._reactInternals = g, p = i.contextType, h.context = typeof p == "object" && p !== null ? p._currentValue2 : qs, p = i.getDerivedStateFromProps, typeof p == "function" && (p = p(u, E), E = p == null ? E : K({}, E, p), h.state = E), typeof i.getDerivedStateFromProps != "function" && typeof h.getSnapshotBeforeUpdate != "function" && (typeof h.UNSAFE_componentWillMount == "function" || typeof h.componentWillMount == "function")) if (i = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), i !== h.state && Ws.enqueueReplaceState(h, h.state, null), g.queue !== null && 0 < g.queue.length) if (i = g.queue, p = g.replace, g.queue = null, g.replace = false, p && i.length === 1) h.state = i[0];
      else {
        for (g = p ? i[0] : h.state, E = true, p = p ? 1 : 0; p < i.length; p++) T = i[p], T = typeof T == "function" ? T.call(h, g, u, void 0) : T, T != null && (E ? (E = false, g = K({}, g, T)) : K(g, T));
        h.state = g;
      }
      else g.queue = null;
      if (i = h.render(), r.status === 12) throw null;
      u = n.keyPath, n.keyPath = a, Tt(r, n, i, -1), n.keyPath = u;
    } else {
      if (i = oi(r, n, a, i, u, void 0), r.status === 12) throw null;
      ai(r, n, a, i, Jn !== 0, Gn, Xn);
    }
    else if (typeof i == "string") if (h = n.blockedSegment, h === null) h = u.children, g = n.formatContext, E = n.keyPath, n.formatContext = Y(g, i, u), n.keyPath = a, Ve(r, n, h, -1), n.formatContext = g, n.keyPath = E;
    else {
      if (E = Ao(h.chunks, i, u, r.resumableState, r.renderState, n.blockedPreamble, n.hoistableState, n.formatContext, h.lastPushedText), h.lastPushedText = false, g = n.formatContext, p = n.keyPath, n.keyPath = a, (n.formatContext = Y(g, i, u)).insertionMode === 3) {
        a = Dt(r, 0, null, n.formatContext, false, false), h.preambleChildren.push(a), n.blockedSegment = a;
        try {
          a.status = 6, Ve(r, n, E, -1), Lr(a.chunks, r.renderState, a.lastPushedText, a.textEmbedded), a.status = 1;
        } finally {
          n.blockedSegment = h;
        }
      } else Ve(r, n, E, -1);
      n.formatContext = g, n.keyPath = p;
      e: {
        switch (n = h.chunks, r = r.resumableState, i) {
          case "title":
          case "style":
          case "script":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break e;
          case "body":
            if (1 >= g.insertionMode) {
              r.hasBody = true;
              break e;
            }
            break;
          case "html":
            if (g.insertionMode === 0) {
              r.hasHtml = true;
              break e;
            }
            break;
          case "head":
            if (1 >= g.insertionMode) break e;
        }
        n.push(cr(i));
      }
      h.lastPushedText = false;
    }
    else {
      switch (i) {
        case an:
        case B:
        case ge:
        case Q:
          i = n.keyPath, n.keyPath = a, Tt(r, n, u.children, -1), n.keyPath = i;
          return;
        case $r:
          i = n.blockedSegment, i === null ? u.mode !== "hidden" && (i = n.keyPath, n.keyPath = a, Ve(r, n, u.children, -1), n.keyPath = i) : u.mode !== "hidden" && (r.renderState.generateStaticMarkup || i.chunks.push("<!--&-->"), i.lastPushedText = false, h = n.keyPath, n.keyPath = a, Ve(r, n, u.children, -1), n.keyPath = h, r.renderState.generateStaticMarkup || i.chunks.push("<!--/&-->"), i.lastPushedText = false);
          return;
        case Je:
          e: {
            if (i = u.children, u = u.revealOrder, u === "forwards" || u === "backwards" || u === "unstable_legacy-backwards") {
              if (Or(i)) {
                Ha(r, n, a, i, u);
                break e;
              }
              if ((h = sn(i)) && (h = h.call(i))) {
                if (g = h.next(), !g.done) {
                  do
                    g = h.next();
                  while (!g.done);
                  Ha(r, n, a, i, u);
                }
                break e;
              }
            }
            u === "together" ? (u = n.keyPath, h = n.row, g = n.row = Zn(null), g.boundaries = [], g.together = true, n.keyPath = a, Tt(r, n, i, -1), --g.pendingTasks === 0 && Ee(r, g), n.keyPath = u, n.row = h, h !== null && 0 < g.pendingTasks && (h.pendingTasks++, g.next = h)) : (u = n.keyPath, n.keyPath = a, Tt(r, n, i, -1), n.keyPath = u);
          }
          return;
        case xo:
        case Ar:
          throw Error("ReactDOMServer does not yet support scope components.");
        case oe:
          e: if (n.replay !== null) {
            i = n.keyPath, h = n.formatContext, g = n.row, n.keyPath = a, n.formatContext = Ro(r.resumableState, h), n.row = null, a = u.children;
            try {
              Ve(r, n, a, -1);
            } finally {
              n.keyPath = i, n.formatContext = h, n.row = g;
            }
          } else {
            i = n.keyPath, p = n.formatContext;
            var R = n.row, $ = n.blockedBoundary;
            T = n.blockedPreamble;
            var H = n.hoistableState;
            v = n.blockedSegment;
            var re = u.fallback;
            u = u.children;
            var J = /* @__PURE__ */ new Set(), G = ja(r, n.row, J, null, null);
            r.trackedPostpones !== null && (G.trackedContentKeyPath = a);
            var W = Dt(r, v.chunks.length, G, n.formatContext, false, false);
            v.children.push(W), v.lastPushedText = false;
            var X = Dt(r, 0, null, n.formatContext, false, false);
            if (X.parentFlushed = true, r.trackedPostpones !== null) {
              h = n.componentStack, g = [a[0], "Suspense Fallback", a[2]], E = [g[1], g[2], [], null], r.trackedPostpones.workingMap.set(g, E), G.trackedFallbackNode = E, n.blockedSegment = W, n.blockedPreamble = G.fallbackPreamble, n.keyPath = g, n.formatContext = ba(r.resumableState, p), n.componentStack = Da(h), W.status = 6;
              try {
                Ve(r, n, re, -1), Lr(W.chunks, r.renderState, W.lastPushedText, W.textEmbedded), W.status = 1;
              } catch (ve) {
                throw W.status = r.status === 12 ? 3 : 4, ve;
              } finally {
                n.blockedSegment = v, n.blockedPreamble = T, n.keyPath = i, n.formatContext = p;
              }
              n = Uo(r, null, u, -1, G, X, G.contentPreamble, G.contentState, n.abortSet, a, Ro(r.resumableState, n.formatContext), n.context, n.treeContext, null, h), qr(n), r.pingedTasks.push(n);
            } else {
              n.blockedBoundary = G, n.blockedPreamble = G.contentPreamble, n.hoistableState = G.contentState, n.blockedSegment = X, n.keyPath = a, n.formatContext = Ro(r.resumableState, p), n.row = null, X.status = 6;
              try {
                if (Ve(r, n, u, -1), Lr(X.chunks, r.renderState, X.lastPushedText, X.textEmbedded), X.status = 1, ro(G, X), G.pendingTasks === 0 && G.status === 0) {
                  if (G.status = 1, !fn(r, G)) {
                    R !== null && --R.pendingTasks === 0 && Ee(r, R), r.pendingRootTasks === 0 && n.blockedPreamble && Vr(r);
                    break e;
                  }
                } else R !== null && R.together && La(r, R);
              } catch (ve) {
                G.status = 4, r.status === 12 ? (X.status = 3, h = r.fatalError) : (X.status = 4, h = ve), g = fr(n.componentStack), E = ze(r, h, g), G.errorDigest = E, eo(r, G);
              } finally {
                n.blockedBoundary = $, n.blockedPreamble = T, n.hoistableState = H, n.blockedSegment = v, n.keyPath = i, n.formatContext = p, n.row = R;
              }
              n = Uo(r, null, re, -1, $, W, G.fallbackPreamble, G.fallbackState, J, [a[0], "Suspense Fallback", a[2]], ba(r.resumableState, n.formatContext), n.context, n.treeContext, n.row, Da(n.componentStack)), qr(n), r.pingedTasks.push(n);
            }
          }
          return;
      }
      if (typeof i == "object" && i !== null) switch (i.$$typeof) {
        case P:
          if ("ref" in u) for (re in h = {}, u) re !== "ref" && (h[re] = u[re]);
          else h = u;
          i = oi(r, n, a, i.render, h, p), ai(r, n, a, i, Jn !== 0, Gn, Xn);
          return;
        case kt:
          zo(r, n, a, i.type, u, p);
          return;
        case L:
          if (g = u.children, h = n.keyPath, u = u.value, E = i._currentValue2, i._currentValue2 = u, p = Hr, Hr = i = { parent: p, depth: p === null ? 0 : p.depth + 1, context: i, parentValue: E, value: u }, n.context = i, n.keyPath = a, Tt(r, n, g, -1), r = Hr, r === null) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
          r.context._currentValue2 = r.parentValue, r = Hr = r.parent, n.context = r, n.keyPath = h;
          return;
        case we:
          u = u.children, i = u(i._context._currentValue2), u = n.keyPath, n.keyPath = a, Tt(r, n, i, -1), n.keyPath = u;
          return;
        case Pt:
          if (h = i._init, i = h(i._payload), r.status === 12) throw null;
          zo(r, n, a, i, u, p);
          return;
      }
      throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((i == null ? i : typeof i) + "."));
    }
  }
  __name(zo, "zo");
  function Ko(r, n, a, i, u) {
    var p = n.replay, h = n.blockedBoundary, v = Dt(r, 0, null, n.formatContext, false, false);
    v.id = a, v.parentFlushed = true;
    try {
      n.replay = null, n.blockedSegment = v, Ve(r, n, i, u), v.status = 1, h === null ? r.completedRootSegment = v : (ro(h, v), h.parentFlushed && r.partialBoundaries.push(h));
    } finally {
      n.replay = p, n.blockedSegment = null;
    }
  }
  __name(Ko, "Ko");
  function Tt(r, n, a, i) {
    n.replay !== null && typeof n.replay.slots == "number" ? Ko(r, n, n.replay.slots, a, i) : (n.node = a, n.childIndex = i, a = n.componentStack, qr(n), Yo(r, n), n.componentStack = a);
  }
  __name(Tt, "Tt");
  function Yo(r, n) {
    var a = n.node, i = n.childIndex;
    if (a !== null) {
      if (typeof a == "object") {
        switch (a.$$typeof) {
          case j:
            var u = a.type, p = a.key, h = a.props;
            a = h.ref;
            var v = a !== void 0 ? a : null, g = Ie(u), T = p ?? (i === -1 ? 0 : i);
            if (p = [n.keyPath, g, T], n.replay !== null) e: {
              var E = n.replay;
              for (i = E.nodes, a = 0; a < i.length; a++) {
                var R = i[a];
                if (T === R[1]) {
                  if (R.length === 4) {
                    if (g !== null && g !== R[0]) throw Error("Expected the resume to render <" + R[0] + "> in this slot but instead it rendered <" + g + ">. The tree doesn't match so React will fallback to client rendering.");
                    var $ = R[2];
                    g = R[3], T = n.node, n.replay = { nodes: $, slots: g, pendingTasks: 1 };
                    try {
                      if (zo(r, n, p, u, h, v), n.replay.pendingTasks === 1 && 0 < n.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                      n.replay.pendingTasks--;
                    } catch (ce) {
                      if (typeof ce == "object" && ce !== null && (ce === ft || typeof ce.then == "function")) throw n.node === T ? n.replay = E : i.splice(a, 1), ce;
                      n.replay.pendingTasks--, h = fr(n.componentStack), p = r, r = n.blockedBoundary, u = ce, h = ze(p, u, h), to(p, r, $, g, u, h);
                    }
                    n.replay = E;
                  } else {
                    if (u !== oe) throw Error("Expected the resume to render <Suspense> in this slot but instead it rendered <" + (Ie(u) || "Unknown") + ">. The tree doesn't match so React will fallback to client rendering.");
                    t: {
                      E = void 0, u = R[5], v = R[2], g = R[3], T = R[4] === null ? [] : R[4][2], R = R[4] === null ? null : R[4][3];
                      var H = n.keyPath, re = n.formatContext, J = n.row, G = n.replay, W = n.blockedBoundary, X = n.hoistableState, ve = h.children, Pe = h.fallback, ae = /* @__PURE__ */ new Set();
                      h = ja(r, n.row, ae, null, null), h.parentFlushed = true, h.rootSegmentID = u, n.blockedBoundary = h, n.hoistableState = h.contentState, n.keyPath = p, n.formatContext = Ro(r.resumableState, re), n.row = null, n.replay = { nodes: v, slots: g, pendingTasks: 1 };
                      try {
                        if (Ve(r, n, ve, -1), n.replay.pendingTasks === 1 && 0 < n.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                        if (n.replay.pendingTasks--, h.pendingTasks === 0 && h.status === 0) {
                          h.status = 1, r.completedBoundaries.push(h);
                          break t;
                        }
                      } catch (ce) {
                        h.status = 4, $ = fr(n.componentStack), E = ze(r, ce, $), h.errorDigest = E, n.replay.pendingTasks--, r.clientRenderedBoundaries.push(h);
                      } finally {
                        n.blockedBoundary = W, n.hoistableState = X, n.replay = G, n.keyPath = H, n.formatContext = re, n.row = J;
                      }
                      $ = ni(r, null, { nodes: T, slots: R, pendingTasks: 0 }, Pe, -1, W, h.fallbackState, ae, [p[0], "Suspense Fallback", p[2]], ba(r.resumableState, n.formatContext), n.context, n.treeContext, n.row, Da(n.componentStack)), qr($), r.pingedTasks.push($);
                    }
                  }
                  i.splice(a, 1);
                  break e;
                }
              }
            }
            else zo(r, n, p, u, h, v);
            return;
          case O:
            throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
          case Pt:
            if ($ = a._init, a = $(a._payload), r.status === 12) throw null;
            Tt(r, n, a, i);
            return;
        }
        if (Or(a)) {
          gn(r, n, a, i);
          return;
        }
        if (($ = sn(a)) && ($ = $.call(a))) {
          if (a = $.next(), !a.done) {
            h = [];
            do
              h.push(a.value), a = $.next();
            while (!a.done);
            gn(r, n, h, i);
          }
          return;
        }
        if (typeof a.then == "function") return n.thenableState = null, Tt(r, n, Qs(a), i);
        if (a.$$typeof === L) return Tt(r, n, a._currentValue2, i);
        throw i = Object.prototype.toString.call(a), Error("Objects are not valid as a React child (found: " + (i === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : i) + "). If you meant to render a collection of children, use an array instead.");
      }
      typeof a == "string" ? (i = n.blockedSegment, i !== null && (i.lastPushedText = zn(i.chunks, a, r.renderState, i.lastPushedText))) : (typeof a == "number" || typeof a == "bigint") && (i = n.blockedSegment, i !== null && (i.lastPushedText = zn(i.chunks, "" + a, r.renderState, i.lastPushedText)));
    }
  }
  __name(Yo, "Yo");
  function gn(r, n, a, i) {
    var u = n.keyPath;
    if (i !== -1 && (n.keyPath = [n.keyPath, "Fragment", i], n.replay !== null)) {
      for (var p = n.replay, h = p.nodes, v = 0; v < h.length; v++) {
        var g = h[v];
        if (g[1] === i) {
          i = g[2], g = g[3], n.replay = { nodes: i, slots: g, pendingTasks: 1 };
          try {
            if (gn(r, n, a, -1), n.replay.pendingTasks === 1 && 0 < n.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
            n.replay.pendingTasks--;
          } catch (R) {
            if (typeof R == "object" && R !== null && (R === ft || typeof R.then == "function")) throw R;
            n.replay.pendingTasks--, a = fr(n.componentStack);
            var T = n.blockedBoundary, E = R;
            a = ze(r, E, a), to(r, T, i, g, E, a);
          }
          n.replay = p, h.splice(v, 1);
          break;
        }
      }
      n.keyPath = u;
      return;
    }
    if (p = n.treeContext, h = a.length, n.replay !== null && (v = n.replay.slots, v !== null && typeof v == "object")) {
      for (i = 0; i < h; i++) g = a[i], n.treeContext = Br(p, h, i), T = v[i], typeof T == "number" ? (Ko(r, n, T, g, i), delete v[i]) : Ve(r, n, g, i);
      n.treeContext = p, n.keyPath = u;
      return;
    }
    for (v = 0; v < h; v++) i = a[v], n.treeContext = Br(p, h, v), Ve(r, n, i, v);
    n.treeContext = p, n.keyPath = u;
  }
  __name(gn, "gn");
  function Ba(r, n, a) {
    if (a.status = 5, a.rootSegmentID = r.nextSegmentId++, r = a.trackedContentKeyPath, r === null) throw Error("It should not be possible to postpone at the root. This is a bug in React.");
    var i = a.trackedFallbackNode, u = [], p = n.workingMap.get(r);
    return p === void 0 ? (a = [r[1], r[2], u, null, i, a.rootSegmentID], n.workingMap.set(r, a), Mt(a, r[0], n), a) : (p[4] = i, p[5] = a.rootSegmentID, p);
  }
  __name(Ba, "Ba");
  function Jo(r, n, a, i) {
    i.status = 5;
    var u = a.keyPath, p = a.blockedBoundary;
    if (p === null) i.id = r.nextSegmentId++, n.rootSlots = i.id, r.completedRootSegment !== null && (r.completedRootSegment.status = 5);
    else {
      if (p !== null && p.status === 0) {
        var h = Ba(r, n, p);
        if (p.trackedContentKeyPath === u && a.childIndex === -1) {
          i.id === -1 && (i.id = i.parentFlushed ? p.rootSegmentID : r.nextSegmentId++), h[3] = i.id;
          return;
        }
      }
      if (i.id === -1 && (i.id = i.parentFlushed && p !== null ? p.rootSegmentID : r.nextSegmentId++), a.childIndex === -1) u === null ? n.rootSlots = i.id : (a = n.workingMap.get(u), a === void 0 ? (a = [u[1], u[2], [], i.id], Mt(a, u[0], n)) : a[3] = i.id);
      else {
        if (u === null) {
          if (r = n.rootSlots, r === null) r = n.rootSlots = {};
          else if (typeof r == "number") throw Error("It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React.");
        } else if (p = n.workingMap, h = p.get(u), h === void 0) r = {}, h = [u[1], u[2], [], r], p.set(u, h), Mt(h, u[0], n);
        else if (r = h[3], r === null) r = h[3] = {};
        else if (typeof r == "number") throw Error("It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React.");
        r[a.childIndex] = i.id;
      }
    }
  }
  __name(Jo, "Jo");
  function eo(r, n) {
    r = r.trackedPostpones, r !== null && (n = n.trackedContentKeyPath, n !== null && (n = r.workingMap.get(n), n !== void 0 && (n.length = 4, n[2] = [], n[3] = null)));
  }
  __name(eo, "eo");
  function Go(r, n, a) {
    return ni(r, a, n.replay, n.node, n.childIndex, n.blockedBoundary, n.hoistableState, n.abortSet, n.keyPath, n.formatContext, n.context, n.treeContext, n.row, n.componentStack);
  }
  __name(Go, "Go");
  function si(r, n, a) {
    var i = n.blockedSegment, u = Dt(r, i.chunks.length, null, n.formatContext, i.lastPushedText, true);
    return i.children.push(u), i.lastPushedText = false, Uo(r, a, n.node, n.childIndex, n.blockedBoundary, u, n.blockedPreamble, n.hoistableState, n.abortSet, n.keyPath, n.formatContext, n.context, n.treeContext, n.row, n.componentStack);
  }
  __name(si, "si");
  function Ve(r, n, a, i) {
    var u = n.formatContext, p = n.context, h = n.keyPath, v = n.treeContext, g = n.componentStack, T = n.blockedSegment;
    if (T === null) {
      T = n.replay;
      try {
        return Tt(r, n, a, i);
      } catch ($) {
        if (Qn(), a = $ === ft ? Mo() : $, r.status !== 12 && typeof a == "object" && a !== null) {
          if (typeof a.then == "function") {
            i = $ === ft ? hn() : null, r = Go(r, n, i).ping, a.then(r, r), n.formatContext = u, n.context = p, n.keyPath = h, n.treeContext = v, n.componentStack = g, n.replay = T, hr(p);
            return;
          }
          if (a.message === "Maximum call stack size exceeded") {
            a = $ === ft ? hn() : null, a = Go(r, n, a), r.pingedTasks.push(a), n.formatContext = u, n.context = p, n.keyPath = h, n.treeContext = v, n.componentStack = g, n.replay = T, hr(p);
            return;
          }
        }
      }
    } else {
      var E = T.children.length, R = T.chunks.length;
      try {
        return Tt(r, n, a, i);
      } catch ($) {
        if (Qn(), T.children.length = E, T.chunks.length = R, a = $ === ft ? Mo() : $, r.status !== 12 && typeof a == "object" && a !== null) {
          if (typeof a.then == "function") {
            T = a, a = $ === ft ? hn() : null, r = si(r, n, a).ping, T.then(r, r), n.formatContext = u, n.context = p, n.keyPath = h, n.treeContext = v, n.componentStack = g, hr(p);
            return;
          }
          if (a.message === "Maximum call stack size exceeded") {
            T = $ === ft ? hn() : null, T = si(r, n, T), r.pingedTasks.push(T), n.formatContext = u, n.context = p, n.keyPath = h, n.treeContext = v, n.componentStack = g, hr(p);
            return;
          }
        }
      }
    }
    throw n.formatContext = u, n.context = p, n.keyPath = h, n.treeContext = v, hr(p), a;
  }
  __name(Ve, "Ve");
  function qa(r) {
    var n = r.blockedBoundary, a = r.blockedSegment;
    a !== null && (a.status = 3, gr(this, n, r.row, a));
  }
  __name(qa, "qa");
  function to(r, n, a, i, u, p) {
    for (var h = 0; h < a.length; h++) {
      var v = a[h];
      if (v.length === 4) to(r, n, v[2], v[3], u, p);
      else {
        v = v[5];
        var g = r, T = p, E = ja(g, null, /* @__PURE__ */ new Set(), null, null);
        E.parentFlushed = true, E.rootSegmentID = v, E.status = 4, E.errorDigest = T, E.parentFlushed && g.clientRenderedBoundaries.push(E);
      }
    }
    if (a.length = 0, i !== null) {
      if (n === null) throw Error("We should not have any resumable nodes in the shell. This is a bug in React.");
      if (n.status !== 4 && (n.status = 4, n.errorDigest = p, n.parentFlushed && r.clientRenderedBoundaries.push(n)), typeof i == "object") for (var R in i) delete i[R];
    }
  }
  __name(to, "to");
  function Va(r, n, a) {
    var i = r.blockedBoundary, u = r.blockedSegment;
    if (u !== null) {
      if (u.status === 6) return;
      u.status = 3;
    }
    var p = fr(r.componentStack);
    if (i === null) {
      if (n.status !== 13 && n.status !== 14) {
        if (i = r.replay, i === null) {
          n.trackedPostpones !== null && u !== null ? (i = n.trackedPostpones, ze(n, a, p), Jo(n, i, r, u), gr(n, null, r.row, u)) : (ze(n, a, p), rt(n, a));
          return;
        }
        i.pendingTasks--, i.pendingTasks === 0 && 0 < i.nodes.length && (u = ze(n, a, p), to(n, null, i.nodes, i.slots, a, u)), n.pendingRootTasks--, n.pendingRootTasks === 0 && Ua(n);
      }
    } else {
      var h = n.trackedPostpones;
      if (i.status !== 4) {
        if (h !== null && u !== null) return ze(n, a, p), Jo(n, h, r, u), i.fallbackAbortableTasks.forEach(function(v) {
          return Va(v, n, a);
        }), i.fallbackAbortableTasks.clear(), gr(n, i, r.row, u);
        i.status = 4, u = ze(n, a, p), i.status = 4, i.errorDigest = u, eo(n, i), i.parentFlushed && n.clientRenderedBoundaries.push(i);
      }
      i.pendingTasks--, u = i.row, u !== null && --u.pendingTasks === 0 && Ee(n, u), i.fallbackAbortableTasks.forEach(function(v) {
        return Va(v, n, a);
      }), i.fallbackAbortableTasks.clear();
    }
    r = r.row, r !== null && --r.pendingTasks === 0 && Ee(n, r), n.allPendingTasks--, n.allPendingTasks === 0 && Xo(n);
  }
  __name(Va, "Va");
  function Wa(r, n) {
    try {
      var a = r.renderState, i = a.onHeaders;
      if (i) {
        var u = a.headers;
        if (u) {
          a.headers = null;
          var p = u.preconnects;
          if (u.fontPreloads && (p && (p += ", "), p += u.fontPreloads), u.highImagePreloads && (p && (p += ", "), p += u.highImagePreloads), !n) {
            var h = a.styles.values(), v = h.next();
            e: for (; 0 < u.remainingCapacity && !v.done; v = h.next()) for (var g = v.value.sheets.values(), T = g.next(); 0 < u.remainingCapacity && !T.done; T = g.next()) {
              var E = T.value, R = E.props, $ = R.href, H = E.props, re = Un(H.href, "style", { crossOrigin: H.crossOrigin, integrity: H.integrity, nonce: H.nonce, type: H.type, fetchPriority: H.fetchPriority, referrerPolicy: H.referrerPolicy, media: H.media });
              if (0 <= (u.remainingCapacity -= re.length + 2)) a.resets.style[$] = V, p && (p += ", "), p += re, a.resets.style[$] = typeof R.crossOrigin == "string" || typeof R.integrity == "string" ? [R.crossOrigin, R.integrity] : V;
              else break e;
            }
          }
          i(p ? { Link: p } : {});
        }
      }
    } catch (J) {
      ze(r, J, {});
    }
  }
  __name(Wa, "Wa");
  function Ua(r) {
    r.trackedPostpones === null && Wa(r, true), r.trackedPostpones === null && Vr(r), r.onShellError = tt, r = r.onShellReady, r();
  }
  __name(Ua, "Ua");
  function Xo(r) {
    Wa(r, r.trackedPostpones === null ? true : r.completedRootSegment === null || r.completedRootSegment.status !== 5), Vr(r), r = r.onAllReady, r();
  }
  __name(Xo, "Xo");
  function ro(r, n) {
    if (n.chunks.length === 0 && n.children.length === 1 && n.children[0].boundary === null && n.children[0].id === -1) {
      var a = n.children[0];
      a.id = n.id, a.parentFlushed = true, a.status !== 1 && a.status !== 3 && a.status !== 4 || ro(r, a);
    } else r.completedSegments.push(n);
  }
  __name(ro, "ro");
  function gr(r, n, a, i) {
    if (a !== null && (--a.pendingTasks === 0 ? Ee(r, a) : a.together && La(r, a)), r.allPendingTasks--, n === null) {
      if (i !== null && i.parentFlushed) {
        if (r.completedRootSegment !== null) throw Error("There can only be one root segment. This is a bug in React.");
        r.completedRootSegment = i;
      }
      r.pendingRootTasks--, r.pendingRootTasks === 0 && Ua(r);
    } else if (n.pendingTasks--, n.status !== 4) if (n.pendingTasks === 0) {
      if (n.status === 0 && (n.status = 1), i !== null && i.parentFlushed && (i.status === 1 || i.status === 3) && ro(n, i), n.parentFlushed && r.completedBoundaries.push(n), n.status === 1) a = n.row, a !== null && Jt(a.hoistables, n.contentState), fn(r, n) || (n.fallbackAbortableTasks.forEach(qa, r), n.fallbackAbortableTasks.clear(), a !== null && --a.pendingTasks === 0 && Ee(r, a)), r.pendingRootTasks === 0 && r.trackedPostpones === null && n.contentPreamble !== null && Vr(r);
      else if (n.status === 5 && (n = n.row, n !== null)) {
        if (r.trackedPostpones !== null) {
          a = r.trackedPostpones;
          var u = n.next;
          if (u !== null && (i = u.boundaries, i !== null)) for (u.boundaries = null, u = 0; u < i.length; u++) {
            var p = i[u];
            Ba(r, a, p), gr(r, p, null, null);
          }
        }
        --n.pendingTasks === 0 && Ee(r, n);
      }
    } else i === null || !i.parentFlushed || i.status !== 1 && i.status !== 3 || (ro(n, i), n.completedSegments.length === 1 && n.parentFlushed && r.partialBoundaries.push(n)), n = n.row, n !== null && n.together && La(r, n);
    r.allPendingTasks === 0 && Xo(r);
  }
  __name(gr, "gr");
  function yn(r) {
    if (r.status !== 14 && r.status !== 13) {
      var n = Hr, a = S.H;
      S.H = Zs;
      var i = S.A;
      S.A = Hi;
      var u = $e;
      $e = r;
      var p = Vo;
      Vo = r.resumableState;
      try {
        var h = r.pingedTasks, v;
        for (v = 0; v < h.length; v++) {
          var g = h[v], T = r, E = g.blockedSegment;
          if (E === null) {
            var R = T;
            if (g.replay.pendingTasks !== 0) {
              hr(g.context);
              try {
                if (typeof g.replay.slots == "number" ? Ko(R, g, g.replay.slots, g.node, g.childIndex) : Yo(R, g), g.replay.pendingTasks === 1 && 0 < g.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                g.replay.pendingTasks--, g.abortSet.delete(g), gr(R, g.blockedBoundary, g.row, null);
              } catch (Te) {
                Qn();
                var $ = Te === ft ? Mo() : Te;
                if (typeof $ == "object" && $ !== null && typeof $.then == "function") {
                  var H = g.ping;
                  $.then(H, H), g.thenableState = Te === ft ? hn() : null;
                } else {
                  g.replay.pendingTasks--, g.abortSet.delete(g);
                  var re = fr(g.componentStack);
                  T = void 0;
                  var J = R, G = g.blockedBoundary, W = R.status === 12 ? R.fatalError : $, X = g.replay.nodes, ve = g.replay.slots;
                  T = ze(J, W, re), to(J, G, X, ve, W, T), R.pendingRootTasks--, R.pendingRootTasks === 0 && Ua(R), R.allPendingTasks--, R.allPendingTasks === 0 && Xo(R);
                }
              }
            }
          } else if (R = void 0, J = E, J.status === 0) {
            J.status = 6, hr(g.context);
            var Pe = J.children.length, ae = J.chunks.length;
            try {
              Yo(T, g), Lr(J.chunks, T.renderState, J.lastPushedText, J.textEmbedded), g.abortSet.delete(g), J.status = 1, gr(T, g.blockedBoundary, g.row, J);
            } catch (Te) {
              Qn(), J.children.length = Pe, J.chunks.length = ae;
              var ce = Te === ft ? Mo() : T.status === 12 ? T.fatalError : Te;
              if (T.status === 12 && T.trackedPostpones !== null) {
                var ne = T.trackedPostpones, it = fr(g.componentStack);
                g.abortSet.delete(g), ze(T, ce, it), Jo(T, ne, g, J), gr(T, g.blockedBoundary, g.row, J);
              } else if (typeof ce == "object" && ce !== null && typeof ce.then == "function") {
                J.status = 0, g.thenableState = Te === ft ? hn() : null;
                var se = g.ping;
                ce.then(se, se);
              } else {
                var gt = fr(g.componentStack);
                g.abortSet.delete(g), J.status = 4;
                var fe = g.blockedBoundary, Me = g.row;
                if (Me !== null && --Me.pendingTasks === 0 && Ee(T, Me), T.allPendingTasks--, R = ze(T, ce, gt), fe === null) rt(T, ce);
                else if (fe.pendingTasks--, fe.status !== 4) {
                  fe.status = 4, fe.errorDigest = R, eo(T, fe);
                  var He = fe.row;
                  He !== null && --He.pendingTasks === 0 && Ee(T, He), fe.parentFlushed && T.clientRenderedBoundaries.push(fe), T.pendingRootTasks === 0 && T.trackedPostpones === null && fe.contentPreamble !== null && Vr(T);
                }
                T.allPendingTasks === 0 && Xo(T);
              }
            }
          }
        }
        h.splice(0, v), r.destination !== null && kn(r, r.destination);
      } catch (Te) {
        ze(r, Te, {}), rt(r, Te);
      } finally {
        Vo = p, S.H = a, S.A = i, a === Zs && hr(n), $e = u;
      }
    }
  }
  __name(yn, "yn");
  function bn(r, n, a) {
    n.preambleChildren.length && a.push(n.preambleChildren);
    for (var i = false, u = 0; u < n.children.length; u++) i = Qo(r, n.children[u], a) || i;
    return i;
  }
  __name(bn, "bn");
  function Qo(r, n, a) {
    var i = n.boundary;
    if (i === null) return bn(r, n, a);
    var u = i.contentPreamble, p = i.fallbackPreamble;
    if (u === null || p === null) return false;
    switch (i.status) {
      case 1:
        if ($o(r.renderState, u), r.byteSize += i.byteSize, n = i.completedSegments[0], !n) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
        return bn(r, n, a);
      case 5:
        if (r.trackedPostpones !== null) return true;
      case 4:
        if (n.status === 1) return $o(r.renderState, p), bn(r, n, a);
      default:
        return true;
    }
  }
  __name(Qo, "Qo");
  function Vr(r) {
    if (r.completedRootSegment && r.completedPreambleSegments === null) {
      var n = [], a = r.byteSize, i = Qo(r, r.completedRootSegment, n), u = r.renderState.preamble;
      i === false || u.headChunks && u.bodyChunks ? r.completedPreambleSegments = n : r.byteSize = a;
    }
  }
  __name(Vr, "Vr");
  function Sn(r, n, a, i) {
    switch (a.parentFlushed = true, a.status) {
      case 0:
        a.id = r.nextSegmentId++;
      case 5:
        return i = a.id, a.lastPushedText = false, a.textEmbedded = false, r = r.renderState, n.push('<template id="'), n.push(r.placeholderPrefix), r = i.toString(16), n.push(r), n.push('"></template>');
      case 1:
        a.status = 2;
        var u = true, p = a.chunks, h = 0;
        a = a.children;
        for (var v = 0; v < a.length; v++) {
          for (u = a[v]; h < u.index; h++) n.push(p[h]);
          u = no(r, n, u, i);
        }
        for (; h < p.length - 1; h++) n.push(p[h]);
        return h < p.length && (u = n.push(p[h])), u;
      case 3:
        return true;
      default:
        throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
    }
  }
  __name(Sn, "Sn");
  var Wr = 0;
  function no(r, n, a, i) {
    var u = a.boundary;
    if (u === null) return Sn(r, n, a, i);
    if (u.parentFlushed = true, u.status === 4) {
      var p = u.row;
      return p !== null && --p.pendingTasks === 0 && Ee(r, p), r.renderState.generateStaticMarkup || (u = u.errorDigest, n.push("<!--$!-->"), n.push("<template"), u && (n.push(' data-dgst="'), u = M(u), n.push(u), n.push('"')), n.push("></template>")), Sn(r, n, a, i), r = r.renderState.generateStaticMarkup ? true : n.push("<!--/$-->"), r;
    }
    if (u.status !== 1) return u.status === 0 && (u.rootSegmentID = r.nextSegmentId++), 0 < u.completedSegments.length && r.partialBoundaries.push(u), vt(n, r.renderState, u.rootSegmentID), i && Jt(i, u.fallbackState), Sn(r, n, a, i), n.push("<!--/$-->");
    if (!Zo && fn(r, u) && Wr + u.byteSize > r.progressiveChunkSize) return u.rootSegmentID = r.nextSegmentId++, r.completedBoundaries.push(u), vt(n, r.renderState, u.rootSegmentID), Sn(r, n, a, i), n.push("<!--/$-->");
    if (Wr += u.byteSize, i && Jt(i, u.contentState), a = u.row, a !== null && fn(r, u) && --a.pendingTasks === 0 && Ee(r, a), r.renderState.generateStaticMarkup || n.push("<!--$-->"), a = u.completedSegments, a.length !== 1) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
    return no(r, n, a[0], i), r = r.renderState.generateStaticMarkup ? true : n.push("<!--/$-->"), r;
  }
  __name(no, "no");
  function za(r, n, a, i) {
    return Fs(n, r.renderState, a.parentFormatContext, a.id), no(r, n, a, i), Os(n, a.parentFormatContext);
  }
  __name(za, "za");
  function Ur(r, n, a) {
    Wr = a.byteSize;
    for (var i = a.completedSegments, u = 0; u < i.length; u++) Ka(r, n, a, i[u]);
    i.length = 0, i = a.row, i !== null && fn(r, a) && --i.pendingTasks === 0 && Ee(r, i), Fo(n, a.contentState, r.renderState), i = r.resumableState, r = r.renderState, u = a.rootSegmentID, a = a.contentState;
    var p = r.stylesToHoist;
    return r.stylesToHoist = false, n.push(r.startInlineScript), n.push(">"), p ? ((i.instructions & 4) === 0 && (i.instructions |= 4, n.push('$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};')), (i.instructions & 2) === 0 && (i.instructions |= 2, n.push(`$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`)), (i.instructions & 8) === 0 ? (i.instructions |= 8, n.push(`$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=e[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&$RM.set(b.getAttribute("href"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement("link");a.href=d;a.rel=
"stylesheet";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute("media");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=
"$~";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,"CSS failed to load"))};$RR("`)) : n.push('$RR("')) : ((i.instructions & 2) === 0 && (i.instructions |= 2, n.push(`$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`)), n.push('$RC("')), i = u.toString(16), n.push(r.boundaryPrefix), n.push(i), n.push('","'), n.push(r.segmentPrefix), n.push(i), p ? (n.push('",'), me(n, a)) : n.push('"'), a = n.push(")<\/script>"), Vn(n, r) && a;
  }
  __name(Ur, "Ur");
  function Ka(r, n, a, i) {
    if (i.status === 2) return true;
    var u = a.contentState, p = i.id;
    if (p === -1) {
      if ((i.id = a.rootSegmentID) === -1) throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
      return za(r, n, i, u);
    }
    return p === a.rootSegmentID ? za(r, n, i, u) : (za(r, n, i, u), a = r.resumableState, r = r.renderState, n.push(r.startInlineScript), n.push(">"), (a.instructions & 1) === 0 ? (a.instructions |= 1, n.push('$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')) : n.push('$RS("'), n.push(r.segmentPrefix), p = p.toString(16), n.push(p), n.push('","'), n.push(r.placeholderPrefix), n.push(p), n = n.push('")<\/script>'), n);
  }
  __name(Ka, "Ka");
  var Zo = false;
  function kn(r, n) {
    try {
      if (!(0 < r.pendingRootTasks)) {
        var a, i = r.completedRootSegment;
        if (i !== null) {
          if (i.status === 5) return;
          var u = r.completedPreambleSegments;
          if (u === null) return;
          Wr = r.byteSize;
          var p = r.resumableState, h = r.renderState, v = h.preamble, g = v.htmlChunks, T = v.headChunks, E;
          if (g) {
            for (E = 0; E < g.length; E++) n.push(g[E]);
            if (T) for (E = 0; E < T.length; E++) n.push(T[E]);
            else {
              var R = te("head");
              n.push(R), n.push(">");
            }
          } else if (T) for (E = 0; E < T.length; E++) n.push(T[E]);
          var $ = h.charsetChunks;
          for (E = 0; E < $.length; E++) n.push($[E]);
          $.length = 0, h.preconnects.forEach(Se, n), h.preconnects.clear();
          var H = h.viewportChunks;
          for (E = 0; E < H.length; E++) n.push(H[E]);
          H.length = 0, h.fontPreloads.forEach(Se, n), h.fontPreloads.clear(), h.highImagePreloads.forEach(Se, n), h.highImagePreloads.clear(), ee = h, h.styles.forEach(wa, n), ee = null;
          var re = h.importMapChunks;
          for (E = 0; E < re.length; E++) n.push(re[E]);
          re.length = 0, h.bootstrapScripts.forEach(Se, n), h.scripts.forEach(Se, n), h.scripts.clear(), h.bulkPreloads.forEach(Se, n), h.bulkPreloads.clear(), p.instructions |= 32;
          var J = h.hoistableChunks;
          for (E = 0; E < J.length; E++) n.push(J[E]);
          for (p = J.length = 0; p < u.length; p++) {
            var G = u[p];
            for (h = 0; h < G.length; h++) no(r, n, G[h], null);
          }
          var W = r.renderState.preamble, X = W.headChunks;
          if (W.htmlChunks || X) {
            var ve = cr("head");
            n.push(ve);
          }
          var Pe = W.bodyChunks;
          if (Pe) for (u = 0; u < Pe.length; u++) n.push(Pe[u]);
          no(r, n, i, null), r.completedRootSegment = null;
          var ae = r.renderState;
          if (r.allPendingTasks !== 0 || r.clientRenderedBoundaries.length !== 0 || r.completedBoundaries.length !== 0 || r.trackedPostpones !== null && (r.trackedPostpones.rootNodes.length !== 0 || r.trackedPostpones.rootSlots !== null)) {
            var ce = r.resumableState;
            if ((ce.instructions & 64) === 0) {
              if (ce.instructions |= 64, n.push(ae.startInlineScript), (ce.instructions & 32) === 0) {
                ce.instructions |= 32;
                var ne = "_" + ce.idPrefix + "R_";
                n.push(' id="');
                var it = M(ne);
                n.push(it), n.push('"');
              }
              n.push(">"), n.push("requestAnimationFrame(function(){$RT=performance.now()});"), n.push("<\/script>");
            }
          }
          Vn(n, ae);
        }
        var se = r.renderState;
        i = 0;
        var gt = se.viewportChunks;
        for (i = 0; i < gt.length; i++) n.push(gt[i]);
        gt.length = 0, se.preconnects.forEach(Se, n), se.preconnects.clear(), se.fontPreloads.forEach(Se, n), se.fontPreloads.clear(), se.highImagePreloads.forEach(Se, n), se.highImagePreloads.clear(), se.styles.forEach(Ms, n), se.scripts.forEach(Se, n), se.scripts.clear(), se.bulkPreloads.forEach(Se, n), se.bulkPreloads.clear();
        var fe = se.hoistableChunks;
        for (i = 0; i < fe.length; i++) n.push(fe[i]);
        fe.length = 0;
        var Me = r.clientRenderedBoundaries;
        for (a = 0; a < Me.length; a++) {
          var He = Me[a];
          se = n;
          var Te = r.resumableState, nt = r.renderState, Kr = He.rootSegmentID, yt = He.errorDigest;
          se.push(nt.startInlineScript), se.push(">"), (Te.instructions & 4) === 0 ? (Te.instructions |= 4, se.push('$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("')) : se.push('$RX("'), se.push(nt.boundaryPrefix);
          var oo = Kr.toString(16);
          if (se.push(oo), se.push('"'), yt) {
            se.push(",");
            var vn = Ns(yt || "");
            se.push(vn);
          }
          var Qe = se.push(")<\/script>");
          if (!Qe) {
            r.destination = null, a++, Me.splice(0, a);
            return;
          }
        }
        Me.splice(0, a);
        var Ct = r.completedBoundaries;
        for (a = 0; a < Ct.length; a++) if (!Ur(r, n, Ct[a])) {
          r.destination = null, a++, Ct.splice(0, a);
          return;
        }
        Ct.splice(0, a), Zo = true;
        var At = r.partialBoundaries;
        for (a = 0; a < At.length; a++) {
          var $t = At[a];
          e: {
            Me = r, He = n, Wr = $t.byteSize;
            var Qt = $t.completedSegments;
            for (Qe = 0; Qe < Qt.length; Qe++) if (!Ka(Me, He, $t, Qt[Qe])) {
              Qe++, Qt.splice(0, Qe);
              var yr = false;
              break e;
            }
            Qt.splice(0, Qe);
            var We = $t.row;
            We !== null && We.together && $t.pendingTasks === 1 && (We.pendingTasks === 1 ? Ma(Me, We, We.hoistables) : We.pendingTasks--), yr = Fo(He, $t.contentState, Me.renderState);
          }
          if (!yr) {
            r.destination = null, a++, At.splice(0, a);
            return;
          }
        }
        At.splice(0, a), Zo = false;
        var Yr = r.completedBoundaries;
        for (a = 0; a < Yr.length; a++) if (!Ur(r, n, Yr[a])) {
          r.destination = null, a++, Yr.splice(0, a);
          return;
        }
        Yr.splice(0, a);
      }
    } finally {
      Zo = false, r.allPendingTasks === 0 && r.clientRenderedBoundaries.length === 0 && r.completedBoundaries.length === 0 && (r.flushScheduled = false, a = r.resumableState, a.hasBody && (At = cr("body"), n.push(At)), a.hasHtml && (a = cr("html"), n.push(a)), r.status = 14, n.push(null), r.destination = null);
    }
  }
  __name(kn, "kn");
  function zr(r) {
    if (r.flushScheduled === false && r.pingedTasks.length === 0 && r.destination !== null) {
      r.flushScheduled = true;
      var n = r.destination;
      n ? kn(r, n) : r.flushScheduled = false;
    }
  }
  __name(zr, "zr");
  function ea(r, n) {
    if (r.status === 13) r.status = 14, n.destroy(r.fatalError);
    else if (r.status !== 14 && r.destination === null) {
      r.destination = n;
      try {
        kn(r, n);
      } catch (a) {
        ze(r, a, {}), rt(r, a);
      }
    }
  }
  __name(ea, "ea");
  function ii(r, n) {
    (r.status === 11 || r.status === 10) && (r.status = 12);
    try {
      var a = r.abortableTasks;
      if (0 < a.size) {
        var i = n === void 0 ? Error("The render was aborted by the server without a reason.") : typeof n == "object" && n !== null && typeof n.then == "function" ? Error("The render was aborted by the server with a promise.") : n;
        r.fatalError = i, a.forEach(function(u) {
          return Va(u, r, i);
        }), a.clear();
      }
      r.destination !== null && kn(r, r.destination);
    } catch (u) {
      ze(r, u, {}), rt(r, u);
    }
  }
  __name(ii, "ii");
  function Mt(r, n, a) {
    if (n === null) a.rootNodes.push(r);
    else {
      var i = a.workingMap, u = i.get(n);
      u === void 0 && (u = [n[1], n[2], [], null], i.set(n, u), Mt(u, n[0], a)), u[2].push(r);
    }
  }
  __name(Mt, "Mt");
  function ta() {
  }
  __name(ta, "ta");
  function Ya(r, n, a, i) {
    var u = false, p = null, h = "", v = false;
    if (n = Ge(n ? n.identifierPrefix : void 0), r = Vi(r, n, Ea(n, a), Le(0, null, 0, null), 1 / 0, ta, void 0, function() {
      v = true;
    }, void 0, void 0, void 0), r.flushScheduled = r.destination !== null, yn(r), r.status === 10 && (r.status = 11), r.trackedPostpones === null && Wa(r, r.pendingRootTasks === 0), ii(r, i), ea(r, { push: /* @__PURE__ */ __name(function(g) {
      return g !== null && (h += g), true;
    }, "push"), destroy: /* @__PURE__ */ __name(function(g) {
      u = true, p = g;
    }, "destroy") }), u && p !== i) throw p;
    if (!v) throw Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
    return h;
  }
  __name(Ya, "Ya");
  return Ps.renderToStaticMarkup = function(r, n) {
    return Ya(r, n, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server');
  }, Ps.renderToString = function(r, n) {
    return Ya(r, n, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server');
  }, Ps.version = "19.2.4", Ps;
}
__name(xu, "xu");
var sr = {};
var Xl;
function Ru() {
  if (Xl) return sr;
  Xl = 1;
  var N = gu, q = yu, j = bu, O = vi(), Q = tu(), B = Su, ge = /* @__PURE__ */ Symbol.for("react.transitional.element"), we = /* @__PURE__ */ Symbol.for("react.portal"), L = /* @__PURE__ */ Symbol.for("react.fragment"), P = /* @__PURE__ */ Symbol.for("react.strict_mode"), oe = /* @__PURE__ */ Symbol.for("react.profiler"), Je = /* @__PURE__ */ Symbol.for("react.consumer"), kt = /* @__PURE__ */ Symbol.for("react.context"), Pt = /* @__PURE__ */ Symbol.for("react.forward_ref"), Ar = /* @__PURE__ */ Symbol.for("react.suspense"), $r = /* @__PURE__ */ Symbol.for("react.suspense_list"), an = /* @__PURE__ */ Symbol.for("react.memo"), _t = /* @__PURE__ */ Symbol.for("react.lazy"), xo = /* @__PURE__ */ Symbol.for("react.scope"), Fr = /* @__PURE__ */ Symbol.for("react.activity"), sn = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Or = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), ln = /* @__PURE__ */ Symbol.for("react.view_transition"), K = Symbol.iterator;
  function ye(e) {
    return e === null || typeof e != "object" ? null : (e = K && e[K] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  __name(ye, "ye");
  var ir = Array.isArray, Hn = queueMicrotask;
  function Nr(e) {
    typeof e.flush == "function" && e.flush();
  }
  __name(Nr, "Nr");
  var be = null, de = 0, Nt = true;
  function x(e, t) {
    if (typeof t == "string") {
      if (t.length !== 0) if (2048 < 3 * t.length) 0 < de && (M(e, be.subarray(0, de)), be = new Uint8Array(2048), de = 0), M(e, t);
      else {
        var o = be;
        0 < de && (o = be.subarray(de)), o = lr.encodeInto(t, o);
        var s = o.read;
        de += o.written, s < t.length && (M(e, be.subarray(0, de)), be = new Uint8Array(2048), de = lr.encodeInto(t.slice(s), be).written), de === 2048 && (M(e, be), be = new Uint8Array(2048), de = 0);
      }
    } else t.byteLength !== 0 && (2048 < t.byteLength ? (0 < de && (M(e, be.subarray(0, de)), be = new Uint8Array(2048), de = 0), M(e, t)) : (o = be.length - de, o < t.byteLength && (o === 0 ? M(e, be) : (be.set(t.subarray(0, o), de), de += o, M(e, be), t = t.subarray(o)), be = new Uint8Array(2048), de = 0), be.set(t, de), de += t.byteLength, de === 2048 && (M(e, be), be = new Uint8Array(2048), de = 0)));
  }
  __name(x, "x");
  function M(e, t) {
    e = e.write(t), Nt = Nt && e;
  }
  __name(M, "M");
  function le(e, t) {
    return x(e, t), Nt;
  }
  __name(le, "le");
  function Bn(e) {
    be && 0 < de && e.write(be.subarray(0, de)), be = null, de = 0, Nt = true;
  }
  __name(Bn, "Bn");
  var lr = new N.TextEncoder();
  function w(e) {
    return lr.encode(e);
  }
  __name(w, "w");
  function S(e) {
    return typeof e == "string" ? Buffer.byteLength(e, "utf8") : e.byteLength;
  }
  __name(S, "S");
  var _ = Object.assign, F = Object.prototype.hasOwnProperty, D = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), V = {}, ee = {};
  function pe(e) {
    return F.call(ee, e) ? true : F.call(V, e) ? false : D.test(e) ? ee[e] = true : (V[e] = true, false);
  }
  __name(pe, "pe");
  var dt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Ge = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), Le = /["'&<>]/;
  function Y(e) {
    if (typeof e == "boolean" || typeof e == "number" || typeof e == "bigint") return "" + e;
    e = "" + e;
    var t = Le.exec(e);
    if (t) {
      var o = "", s, l = 0;
      for (s = t.index; s < e.length; s++) {
        switch (e.charCodeAt(s)) {
          case 34:
            t = "&quot;";
            break;
          case 38:
            t = "&amp;";
            break;
          case 39:
            t = "&#x27;";
            break;
          case 60:
            t = "&lt;";
            break;
          case 62:
            t = "&gt;";
            break;
          default:
            continue;
        }
        l !== s && (o += e.slice(l, s)), l = s + 1, o += t;
      }
      e = l !== s ? o + e.slice(l, s) : o;
    }
    return e;
  }
  __name(Y, "Y");
  var _s = /([A-Z])/g, ba = /^ms-/, Ro = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function un(e) {
    return Ro.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  __name(un, "un");
  var jr = O.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Eo = Q.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Xe = { pending: false, data: null, method: null, action: null }, jt = Eo.d;
  Eo.d = { f: jt.f, r: jt.r, D: to, C: Va, L: Wa, m: Ua, X: ro, S: Xo, M: gr };
  var at = [], Dr = null;
  w('"></template>');
  var Is = w("<script"), qn = w("<\/script>"), he = w('<script src="'), ht = w('<script type="module" src="'), As = w(' nonce="'), Sa = w(' integrity="'), Ue = w(' crossorigin="'), ka = w(' async=""><\/script>'), $s = w("<style"), ur = /(<\/|<)(s)(cript)/gi;
  function Po(e, t, o, s) {
    return "" + t + (o === "s" ? "\\u0073" : "\\u0053") + s;
  }
  __name(Po, "Po");
  var _o = w('<script type="importmap">'), va = w("<\/script>");
  function It(e, t, o, s, l, c) {
    o = typeof t == "string" ? t : t && t.script;
    var d = o === void 0 ? Is : w('<script nonce="' + Y(o) + '"'), y = typeof t == "string" ? void 0 : t && t.style, m = y === void 0 ? $s : w('<style nonce="' + Y(y) + '"'), b = e.idPrefix, k = [], C = e.bootstrapScriptContent, I = e.bootstrapScripts, A = e.bootstrapModules;
    if (C !== void 0 && (k.push(d), gn(k, e), k.push(Re, ("" + C).replace(ur, Po), qn)), C = [], s !== void 0 && (C.push(_o), C.push(("" + JSON.stringify(s)).replace(ur, Po)), C.push(va)), s = l ? { preconnects: "", fontPreloads: "", highImagePreloads: "", remainingCapacity: 2 + (typeof c == "number" ? c : 2e3) } : null, l = { placeholderPrefix: w(b + "P:"), segmentPrefix: w(b + "S:"), boundaryPrefix: w(b + "B:"), startInlineScript: d, startInlineStyle: m, preamble: cn(), externalRuntimeScript: null, bootstrapChunks: k, importMapChunks: C, onHeaders: l, headers: s, resets: { font: {}, dns: {}, connect: { default: {}, anonymous: {}, credentials: {} }, image: {}, style: {} }, charsetChunks: [], viewportChunks: [], hoistableChunks: [], preconnects: /* @__PURE__ */ new Set(), fontPreloads: /* @__PURE__ */ new Set(), highImagePreloads: /* @__PURE__ */ new Set(), styles: /* @__PURE__ */ new Map(), bootstrapScripts: /* @__PURE__ */ new Set(), scripts: /* @__PURE__ */ new Set(), bulkPreloads: /* @__PURE__ */ new Set(), preloads: { images: /* @__PURE__ */ new Map(), stylesheets: /* @__PURE__ */ new Map(), scripts: /* @__PURE__ */ new Map(), moduleScripts: /* @__PURE__ */ new Map() }, nonce: { script: o, style: y }, hoistableState: null, stylesToHoist: false }, I !== void 0) for (s = 0; s < I.length; s++) b = I[s], y = d = void 0, m = { rel: "preload", as: "script", fetchPriority: "low", nonce: t }, typeof b == "string" ? m.href = c = b : (m.href = c = b.src, m.integrity = y = typeof b.integrity == "string" ? b.integrity : void 0, m.crossOrigin = d = typeof b == "string" || b.crossOrigin == null ? void 0 : b.crossOrigin === "use-credentials" ? "use-credentials" : ""), b = e, C = c, b.scriptResources[C] = null, b.moduleScriptResources[C] = null, b = [], De(b, m), l.bootstrapScripts.add(b), k.push(he, Y(c), xe), o && k.push(As, Y(o), xe), typeof y == "string" && k.push(Sa, Y(y), xe), typeof d == "string" && k.push(Ue, Y(d), xe), gn(k, e), k.push(ka);
    if (A !== void 0) for (t = 0; t < A.length; t++) y = A[t], c = s = void 0, d = { rel: "modulepreload", fetchPriority: "low", nonce: o }, typeof y == "string" ? d.href = I = y : (d.href = I = y.src, d.integrity = c = typeof y.integrity == "string" ? y.integrity : void 0, d.crossOrigin = s = typeof y == "string" || y.crossOrigin == null ? void 0 : y.crossOrigin === "use-credentials" ? "use-credentials" : ""), y = e, m = I, y.scriptResources[m] = null, y.moduleScriptResources[m] = null, y = [], De(y, d), l.bootstrapScripts.add(y), k.push(ht, Y(I), xe), o && k.push(As, Y(o), xe), typeof c == "string" && k.push(Sa, Y(c), xe), typeof s == "string" && k.push(Ue, Y(s), xe), gn(k, e), k.push(ka);
    return l;
  }
  __name(It, "It");
  function Io(e, t, o, s, l) {
    return { idPrefix: e === void 0 ? "" : e, nextFormID: 0, streamingFormat: 0, bootstrapScriptContent: o, bootstrapScripts: s, bootstrapModules: l, instructions: 0, hasBody: false, hasHtml: false, unknownResources: {}, dnsResources: {}, connectResources: { default: {}, anonymous: {}, credentials: {} }, imageResources: {}, styleResources: {}, scriptResources: {}, moduleUnknownResources: {}, moduleScriptResources: {} };
  }
  __name(Io, "Io");
  function cn() {
    return { htmlChunks: null, headChunks: null, bodyChunks: null };
  }
  __name(cn, "cn");
  function te(e, t, o, s) {
    return { insertionMode: e, selectedValue: t, tagScope: o, viewTransition: s };
  }
  __name(te, "te");
  function Ao(e) {
    return te(e === "http://www.w3.org/2000/svg" ? 4 : e === "http://www.w3.org/1998/Math/MathML" ? 5 : 0, null, 0, null);
  }
  __name(Ao, "Ao");
  function Ta(e, t, o) {
    var s = e.tagScope & -25;
    switch (t) {
      case "noscript":
        return te(2, null, s | 1, null);
      case "select":
        return te(2, o.value != null ? o.value : o.defaultValue, s, null);
      case "svg":
        return te(4, null, s, null);
      case "picture":
        return te(2, null, s | 2, null);
      case "math":
        return te(5, null, s, null);
      case "foreignObject":
        return te(2, null, s, null);
      case "table":
        return te(6, null, s, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return te(7, null, s, null);
      case "colgroup":
        return te(9, null, s, null);
      case "tr":
        return te(8, null, s, null);
      case "head":
        if (2 > e.insertionMode) return te(3, null, s, null);
        break;
      case "html":
        if (e.insertionMode === 0) return te(1, null, s, null);
    }
    return 6 <= e.insertionMode || 2 > e.insertionMode ? te(2, null, s, null) : e.tagScope !== s ? te(e.insertionMode, e.selectedValue, s, null) : e;
  }
  __name(Ta, "Ta");
  function cr(e) {
    return e === null ? null : { update: e.update, enter: "none", exit: "none", share: e.update, name: e.autoName, autoName: e.autoName, nameIdx: 0 };
  }
  __name(cr, "cr");
  function $o(e, t) {
    return t.tagScope & 32 && (e.instructions |= 128), te(t.insertionMode, t.selectedValue, t.tagScope | 12, cr(t.viewTransition));
  }
  __name($o, "$o");
  function Vn(e, t) {
    e = cr(t.viewTransition);
    var o = t.tagScope | 16;
    return e !== null && e.share !== "none" && (o |= 64), te(t.insertionMode, t.selectedValue, o, e);
  }
  __name(Vn, "Vn");
  var vt = w("<!-- -->");
  function Fs(e, t, o, s) {
    return t === "" ? s : (s && e.push(vt), e.push(Y(t)), true);
  }
  __name(Fs, "Fs");
  var Os = /* @__PURE__ */ new Map(), Ti = w(' style="'), Ns = w(":"), Ci = w(";");
  function pn(e, t) {
    if (typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    var o = true, s;
    for (s in t) if (F.call(t, s)) {
      var l = t[s];
      if (l != null && typeof l != "boolean" && l !== "") {
        if (s.indexOf("--") === 0) {
          var c = Y(s);
          l = Y(("" + l).trim());
        } else c = Os.get(s), c === void 0 && (c = w(Y(s.replace(_s, "-$1").toLowerCase().replace(ba, "-ms-"))), Os.set(s, c)), l = typeof l == "number" ? l === 0 || dt.has(s) ? "" + l : l + "px" : Y(("" + l).trim());
        o ? (o = false, e.push(Ti, c, Ns, l)) : e.push(Ci, c, Ns, l);
      }
    }
    o || e.push(xe);
  }
  __name(pn, "pn");
  var qe = w(" "), st = w('="'), xe = w('"'), Ca = w('=""');
  function Fo(e, t, o) {
    o && typeof o != "function" && typeof o != "symbol" && e.push(qe, t, Ca);
  }
  __name(Fo, "Fo");
  function Se(e, t, o) {
    typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && e.push(qe, t, st, Y(o), xe);
  }
  __name(Se, "Se");
  var Yt = w(Y("javascript:throw new Error('React form unexpectedly submitted.')")), js = w('<input type="hidden"');
  function wa(e, t) {
    this.push(js), Ds(e), Se(this, "name", t), Se(this, "value", e), this.push(Mr);
  }
  __name(wa, "wa");
  function Ds(e) {
    if (typeof e != "string") throw Error("File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration.");
  }
  __name(Ds, "Ds");
  function Ms(e, t) {
    if (typeof t.$$FORM_ACTION == "function") {
      var o = e.nextFormID++;
      e = e.idPrefix + o;
      try {
        var s = t.$$FORM_ACTION(e);
        if (s) {
          var l = s.data;
          l?.forEach(Ds);
        }
        return s;
      } catch (c) {
        if (typeof c == "object" && c !== null && typeof c.then == "function") throw c;
      }
    }
    return null;
  }
  __name(Ms, "Ms");
  function Wn(e, t, o, s, l, c, d, y) {
    var m = null;
    if (typeof s == "function") {
      var b = Ms(t, s);
      b !== null ? (y = b.name, s = b.action || "", l = b.encType, c = b.method, d = b.target, m = b.data) : (e.push(qe, "formAction", st, Yt, xe), d = c = l = s = y = null, Hs(t, o));
    }
    return y != null && me(e, "name", y), s != null && me(e, "formAction", s), l != null && me(e, "formEncType", l), c != null && me(e, "formMethod", c), d != null && me(e, "formTarget", d), m;
  }
  __name(Wn, "Wn");
  function me(e, t, o) {
    switch (t) {
      case "className":
        Se(e, "class", o);
        break;
      case "tabIndex":
        Se(e, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Se(e, t, o);
        break;
      case "style":
        pn(e, o);
        break;
      case "src":
      case "href":
        if (o === "") break;
      case "action":
      case "formAction":
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") break;
        o = un("" + o), e.push(qe, t, st, Y(o), xe);
        break;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "ref":
        break;
      case "autoFocus":
      case "multiple":
      case "muted":
        Fo(e, t.toLowerCase(), o);
        break;
      case "xlinkHref":
        if (typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") break;
        o = un("" + o), e.push(qe, "xlink:href", st, Y(o), xe);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        typeof o != "function" && typeof o != "symbol" && e.push(qe, t, st, Y(o), xe);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        o && typeof o != "function" && typeof o != "symbol" && e.push(qe, t, Ca);
        break;
      case "capture":
      case "download":
        o === true ? e.push(qe, t, Ca) : o !== false && typeof o != "function" && typeof o != "symbol" && e.push(qe, t, st, Y(o), xe);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o && e.push(qe, t, st, Y(o), xe);
        break;
      case "rowSpan":
      case "start":
        typeof o == "function" || typeof o == "symbol" || isNaN(o) || e.push(qe, t, st, Y(o), xe);
        break;
      case "xlinkActuate":
        Se(e, "xlink:actuate", o);
        break;
      case "xlinkArcrole":
        Se(e, "xlink:arcrole", o);
        break;
      case "xlinkRole":
        Se(e, "xlink:role", o);
        break;
      case "xlinkShow":
        Se(e, "xlink:show", o);
        break;
      case "xlinkTitle":
        Se(e, "xlink:title", o);
        break;
      case "xlinkType":
        Se(e, "xlink:type", o);
        break;
      case "xmlBase":
        Se(e, "xml:base", o);
        break;
      case "xmlLang":
        Se(e, "xml:lang", o);
        break;
      case "xmlSpace":
        Se(e, "xml:space", o);
        break;
      default:
        if ((!(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (t = Ge.get(t) || t, pe(t))) {
          switch (typeof o) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              var s = t.toLowerCase().slice(0, 5);
              if (s !== "data-" && s !== "aria-") return;
          }
          e.push(qe, t, st, Y(o), xe);
        }
    }
  }
  __name(me, "me");
  var Re = w(">"), Mr = w("/>");
  function mt(e, t, o) {
    if (t != null) {
      if (o != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
      if (typeof t != "object" || !("__html" in t)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
      t = t.__html, t != null && e.push("" + t);
    }
  }
  __name(mt, "mt");
  function wi(e) {
    var t = "";
    return O.Children.forEach(e, function(o) {
      o != null && (t += o);
    }), t;
  }
  __name(wi, "wi");
  var xa = w(' selected=""'), Ls = w(`addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`);
  function Hs(e, t) {
    if ((e.instructions & 16) === 0) {
      e.instructions |= 16;
      var o = t.preamble, s = t.bootstrapChunks;
      (o.htmlChunks || o.headChunks) && s.length === 0 ? (s.push(t.startInlineScript), gn(s, e), s.push(Re, Ls, qn)) : s.unshift(t.startInlineScript, Re, Ls, qn);
    }
  }
  __name(Hs, "Hs");
  var xi = w("<!--F!-->"), Ri = w("<!--F-->");
  function De(e, t) {
    e.push(Ie("link"));
    for (var o in t) if (F.call(t, o)) {
      var s = t[o];
      if (s != null) switch (o) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error("link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        default:
          me(e, o, s);
      }
    }
    return e.push(Mr), null;
  }
  __name(De, "De");
  var Un = /(<\/|<)(s)(tyle)/gi;
  function Oo(e, t, o, s) {
    return "" + t + (o === "s" ? "\\73 " : "\\53 ") + s;
  }
  __name(Oo, "Oo");
  function pr(e, t, o) {
    e.push(Ie(o));
    for (var s in t) if (F.call(t, s)) {
      var l = t[s];
      if (l != null) switch (s) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(o + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        default:
          me(e, s, l);
      }
    }
    return e.push(Mr), null;
  }
  __name(pr, "pr");
  function No(e, t) {
    e.push(Ie("title"));
    var o = null, s = null, l;
    for (l in t) if (F.call(t, l)) {
      var c = t[l];
      if (c != null) switch (l) {
        case "children":
          o = c;
          break;
        case "dangerouslySetInnerHTML":
          s = c;
          break;
        default:
          me(e, l, c);
      }
    }
    return e.push(Re), t = Array.isArray(o) ? 2 > o.length ? o[0] : null : o, typeof t != "function" && typeof t != "symbol" && t !== null && t !== void 0 && e.push(Y("" + t)), mt(e, s, o), e.push(dr("title")), null;
  }
  __name(No, "No");
  var Ra = w("<!--head-->"), Ei = w("<!--body-->"), Pi = w("<!--html-->");
  function Jt(e, t) {
    e.push(Ie("script"));
    var o = null, s = null, l;
    for (l in t) if (F.call(t, l)) {
      var c = t[l];
      if (c != null) switch (l) {
        case "children":
          o = c;
          break;
        case "dangerouslySetInnerHTML":
          s = c;
          break;
        default:
          me(e, l, c);
      }
    }
    return e.push(Re), mt(e, s, o), typeof o == "string" && e.push(("" + o).replace(ur, Po)), e.push(dr("script")), null;
  }
  __name(Jt, "Jt");
  function Ea(e, t, o) {
    e.push(Ie(o));
    var s = o = null, l;
    for (l in t) if (F.call(t, l)) {
      var c = t[l];
      if (c != null) switch (l) {
        case "children":
          o = c;
          break;
        case "dangerouslySetInnerHTML":
          s = c;
          break;
        default:
          me(e, l, c);
      }
    }
    return e.push(Re), mt(e, s, o), o;
  }
  __name(Ea, "Ea");
  function zn(e, t, o) {
    e.push(Ie(o));
    var s = o = null, l;
    for (l in t) if (F.call(t, l)) {
      var c = t[l];
      if (c != null) switch (l) {
        case "children":
          o = c;
          break;
        case "dangerouslySetInnerHTML":
          s = c;
          break;
        default:
          me(e, l, c);
      }
    }
    return e.push(Re), mt(e, s, o), typeof o == "string" ? (e.push(Y(o)), null) : o;
  }
  __name(zn, "zn");
  var Lr = w(`
`), _i = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Bs = /* @__PURE__ */ new Map();
  function Ie(e) {
    var t = Bs.get(e);
    if (t === void 0) {
      if (!_i.test(e)) throw Error("Invalid tag: " + e);
      t = w("<" + e), Bs.set(e, t);
    }
    return t;
  }
  __name(Ie, "Ie");
  var qs = w("<!DOCTYPE html>");
  function Hr(e, t, o, s, l, c, d, y, m) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
        break;
      case "a":
        e.push(Ie("a"));
        var b = null, k = null, C;
        for (C in o) if (F.call(o, C)) {
          var I = o[C];
          if (I != null) switch (C) {
            case "children":
              b = I;
              break;
            case "dangerouslySetInnerHTML":
              k = I;
              break;
            case "href":
              I === "" ? Se(e, "href", "") : me(e, C, I);
              break;
            default:
              me(e, C, I);
          }
        }
        if (e.push(Re), mt(e, k, b), typeof b == "string") {
          e.push(Y(b));
          var A = null;
        } else A = b;
        return A;
      case "g":
      case "p":
      case "li":
        break;
      case "select":
        e.push(Ie("select"));
        var ue = null, Z = null, ie;
        for (ie in o) if (F.call(o, ie)) {
          var Oe = o[ie];
          if (Oe != null) switch (ie) {
            case "children":
              ue = Oe;
              break;
            case "dangerouslySetInnerHTML":
              Z = Oe;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              me(e, ie, Oe);
          }
        }
        return e.push(Re), mt(e, Z, ue), ue;
      case "option":
        var Ce = y.selectedValue;
        e.push(Ie("option"));
        var St = null, Ot = null, Pr = null, U = null, rr;
        for (rr in o) if (F.call(o, rr)) {
          var zt = o[rr];
          if (zt != null) switch (rr) {
            case "children":
              St = zt;
              break;
            case "selected":
              Pr = zt;
              break;
            case "dangerouslySetInnerHTML":
              U = zt;
              break;
            case "value":
              Ot = zt;
            default:
              me(e, rr, zt);
          }
        }
        if (Ce != null) {
          var Rt = Ot !== null ? "" + Ot : wi(St);
          if (ir(Ce)) {
            for (var nr = 0; nr < Ce.length; nr++) if ("" + Ce[nr] === Rt) {
              e.push(xa);
              break;
            }
          } else "" + Ce === Rt && e.push(xa);
        } else Pr && e.push(xa);
        return e.push(Re), mt(e, U, St), St;
      case "textarea":
        e.push(Ie("textarea"));
        var Ae = null, _r = null, Kt = null, Ye;
        for (Ye in o) if (F.call(o, Ye)) {
          var Et = o[Ye];
          if (Et != null) switch (Ye) {
            case "children":
              Kt = Et;
              break;
            case "value":
              Ae = Et;
              break;
            case "defaultValue":
              _r = Et;
              break;
            case "dangerouslySetInnerHTML":
              throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
            default:
              me(e, Ye, Et);
          }
        }
        if (Ae === null && _r !== null && (Ae = _r), e.push(Re), Kt != null) {
          if (Ae != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (ir(Kt)) {
            if (1 < Kt.length) throw Error("<textarea> can only have at most one child.");
            Ae = "" + Kt[0];
          }
          Ae = "" + Kt;
        }
        return typeof Ae == "string" && Ae[0] === `
` && e.push(Lr), Ae !== null && e.push(Y("" + Ae)), null;
      case "input":
        e.push(Ie("input"));
        var fo = null, go = null, rn = null, yo = null, ls = null, Ir = null, Dn = null, Ui = null, zi = null, us;
        for (us in o) if (F.call(o, us)) {
          var or = o[us];
          if (or != null) switch (us) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            case "name":
              fo = or;
              break;
            case "formAction":
              go = or;
              break;
            case "formEncType":
              rn = or;
              break;
            case "formMethod":
              yo = or;
              break;
            case "formTarget":
              ls = or;
              break;
            case "defaultChecked":
              zi = or;
              break;
            case "defaultValue":
              Dn = or;
              break;
            case "checked":
              Ui = or;
              break;
            case "value":
              Ir = or;
              break;
            default:
              me(e, us, or);
          }
        }
        var pl = Wn(e, s, l, go, rn, yo, ls, fo);
        return Ui !== null ? Fo(e, "checked", Ui) : zi !== null && Fo(e, "checked", zi), Ir !== null ? me(e, "value", Ir) : Dn !== null && me(e, "value", Dn), e.push(Mr), pl?.forEach(wa, e), null;
      case "button":
        e.push(Ie("button"));
        var cs = null, dl = null, hl = null, ml = null, fl = null, gl = null, yl = null, ps;
        for (ps in o) if (F.call(o, ps)) {
          var nn = o[ps];
          if (nn != null) switch (ps) {
            case "children":
              cs = nn;
              break;
            case "dangerouslySetInnerHTML":
              dl = nn;
              break;
            case "name":
              hl = nn;
              break;
            case "formAction":
              ml = nn;
              break;
            case "formEncType":
              fl = nn;
              break;
            case "formMethod":
              gl = nn;
              break;
            case "formTarget":
              yl = nn;
              break;
            default:
              me(e, ps, nn);
          }
        }
        var bl = Wn(e, s, l, ml, fl, gl, yl, hl);
        if (e.push(Re), bl?.forEach(wa, e), mt(e, dl, cs), typeof cs == "string") {
          e.push(Y(cs));
          var Sl = null;
        } else Sl = cs;
        return Sl;
      case "form":
        e.push(Ie("form"));
        var ds = null, kl = null, bo = null, hs = null, ms = null, fs = null, gs;
        for (gs in o) if (F.call(o, gs)) {
          var Mn = o[gs];
          if (Mn != null) switch (gs) {
            case "children":
              ds = Mn;
              break;
            case "dangerouslySetInnerHTML":
              kl = Mn;
              break;
            case "action":
              bo = Mn;
              break;
            case "encType":
              hs = Mn;
              break;
            case "method":
              ms = Mn;
              break;
            case "target":
              fs = Mn;
              break;
            default:
              me(e, gs, Mn);
          }
        }
        var Ki = null, Yi = null;
        if (typeof bo == "function") {
          var So = Ms(s, bo);
          So !== null ? (bo = So.action || "", hs = So.encType, ms = So.method, fs = So.target, Ki = So.data, Yi = So.name) : (e.push(qe, "action", st, Yt, xe), fs = ms = hs = bo = null, Hs(s, l));
        }
        if (bo != null && me(e, "action", bo), hs != null && me(e, "encType", hs), ms != null && me(e, "method", ms), fs != null && me(e, "target", fs), e.push(Re), Yi !== null && (e.push(js), Se(e, "name", Yi), e.push(Mr), Ki?.forEach(wa, e)), mt(e, kl, ds), typeof ds == "string") {
          e.push(Y(ds));
          var vl = null;
        } else vl = ds;
        return vl;
      case "menuitem":
        e.push(Ie("menuitem"));
        for (var ci in o) if (F.call(o, ci)) {
          var Tl = o[ci];
          if (Tl != null) switch (ci) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
            default:
              me(e, ci, Tl);
          }
        }
        return e.push(Re), null;
      case "object":
        e.push(Ie("object"));
        var ys = null, Cl = null, bs;
        for (bs in o) if (F.call(o, bs)) {
          var Ss = o[bs];
          if (Ss != null) switch (bs) {
            case "children":
              ys = Ss;
              break;
            case "dangerouslySetInnerHTML":
              Cl = Ss;
              break;
            case "data":
              var wl = un("" + Ss);
              if (wl === "") break;
              e.push(qe, "data", st, Y(wl), xe);
              break;
            default:
              me(e, bs, Ss);
          }
        }
        if (e.push(Re), mt(e, Cl, ys), typeof ys == "string") {
          e.push(Y(ys));
          var xl = null;
        } else xl = ys;
        return xl;
      case "title":
        var au = y.tagScope & 1, su = y.tagScope & 4;
        if (y.insertionMode === 4 || au || o.itemProp != null) var Ji = No(e, o);
        else su ? Ji = null : (No(l.hoistableChunks, o), Ji = void 0);
        return Ji;
      case "link":
        var iu = y.tagScope & 1, lu = y.tagScope & 4, uu = o.rel, Ln = o.href, pi = o.precedence;
        if (y.insertionMode === 4 || iu || o.itemProp != null || typeof uu != "string" || typeof Ln != "string" || Ln === "") {
          De(e, o);
          var ks = null;
        } else if (o.rel === "stylesheet") if (typeof pi != "string" || o.disabled != null || o.onLoad || o.onError) ks = De(e, o);
        else {
          var da = l.styles.get(pi), di = s.styleResources.hasOwnProperty(Ln) ? s.styleResources[Ln] : void 0;
          if (di !== null) {
            s.styleResources[Ln] = null, da || (da = { precedence: Y(pi), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, l.styles.set(pi, da));
            var hi = { state: 0, props: _({}, o, { "data-precedence": o.precedence, precedence: null }) };
            if (di) {
              di.length === 2 && yn(hi.props, di);
              var Gi = l.preloads.stylesheets.get(Ln);
              Gi && 0 < Gi.length ? Gi.length = 0 : hi.state = 1;
            }
            da.sheets.set(Ln, hi), d && d.stylesheets.add(hi);
          } else if (da) {
            var Rl = da.sheets.get(Ln);
            Rl && d && d.stylesheets.add(Rl);
          }
          m && e.push(vt), ks = null;
        }
        else o.onLoad || o.onError ? ks = De(e, o) : (m && e.push(vt), ks = lu ? null : De(l.hoistableChunks, o));
        return ks;
      case "script":
        var cu = y.tagScope & 1, Xi = o.async;
        if (typeof o.src != "string" || !o.src || !Xi || typeof Xi == "function" || typeof Xi == "symbol" || o.onLoad || o.onError || y.insertionMode === 4 || cu || o.itemProp != null) var El = Jt(e, o);
        else {
          var mi = o.src;
          if (o.type === "module") var fi = s.moduleScriptResources, Pl = l.preloads.moduleScripts;
          else fi = s.scriptResources, Pl = l.preloads.scripts;
          var gi = fi.hasOwnProperty(mi) ? fi[mi] : void 0;
          if (gi !== null) {
            fi[mi] = null;
            var Qi = o;
            if (gi) {
              gi.length === 2 && (Qi = _({}, o), yn(Qi, gi));
              var _l = Pl.get(mi);
              _l && (_l.length = 0);
            }
            var Il = [];
            l.scripts.add(Il), Jt(Il, Qi);
          }
          m && e.push(vt), El = null;
        }
        return El;
      case "style":
        var pu = y.tagScope & 1, yi = o.precedence, ha = o.href, du = o.nonce;
        if (y.insertionMode === 4 || pu || o.itemProp != null || typeof yi != "string" || typeof ha != "string" || ha === "") {
          e.push(Ie("style"));
          var ma = null, Al = null, vs;
          for (vs in o) if (F.call(o, vs)) {
            var bi = o[vs];
            if (bi != null) switch (vs) {
              case "children":
                ma = bi;
                break;
              case "dangerouslySetInnerHTML":
                Al = bi;
                break;
              default:
                me(e, vs, bi);
            }
          }
          e.push(Re);
          var Ts = Array.isArray(ma) ? 2 > ma.length ? ma[0] : null : ma;
          typeof Ts != "function" && typeof Ts != "symbol" && Ts !== null && Ts !== void 0 && e.push(("" + Ts).replace(Un, Oo)), mt(e, Al, ma), e.push(dr("style"));
          var $l = null;
        } else {
          var ko = l.styles.get(yi);
          if ((s.styleResources.hasOwnProperty(ha) ? s.styleResources[ha] : void 0) !== null) {
            s.styleResources[ha] = null, ko || (ko = { precedence: Y(yi), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, l.styles.set(yi, ko));
            var Fl = l.nonce.style;
            if (!Fl || Fl === du) {
              ko.hrefs.push(Y(ha));
              var Ol = ko.rules, fa = null, Nl = null, Si;
              for (Si in o) if (F.call(o, Si)) {
                var Zi = o[Si];
                if (Zi != null) switch (Si) {
                  case "children":
                    fa = Zi;
                    break;
                  case "dangerouslySetInnerHTML":
                    Nl = Zi;
                }
              }
              var Cs = Array.isArray(fa) ? 2 > fa.length ? fa[0] : null : fa;
              typeof Cs != "function" && typeof Cs != "symbol" && Cs !== null && Cs !== void 0 && Ol.push(("" + Cs).replace(Un, Oo)), mt(Ol, Nl, fa);
            }
          }
          ko && d && d.styles.add(ko), m && e.push(vt), $l = void 0;
        }
        return $l;
      case "meta":
        var hu = y.tagScope & 1, mu = y.tagScope & 4;
        if (y.insertionMode === 4 || hu || o.itemProp != null) var jl = pr(e, o, "meta");
        else m && e.push(vt), jl = mu ? null : typeof o.charSet == "string" ? pr(l.charsetChunks, o, "meta") : o.name === "viewport" ? pr(l.viewportChunks, o, "meta") : pr(l.hoistableChunks, o, "meta");
        return jl;
      case "listing":
      case "pre":
        e.push(Ie(t));
        var ws = null, xs = null, Rs;
        for (Rs in o) if (F.call(o, Rs)) {
          var ki = o[Rs];
          if (ki != null) switch (Rs) {
            case "children":
              ws = ki;
              break;
            case "dangerouslySetInnerHTML":
              xs = ki;
              break;
            default:
              me(e, Rs, ki);
          }
        }
        if (e.push(Re), xs != null) {
          if (ws != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof xs != "object" || !("__html" in xs)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
          var vo = xs.__html;
          vo != null && (typeof vo == "string" && 0 < vo.length && vo[0] === `
` ? e.push(Lr, vo) : e.push("" + vo));
        }
        return typeof ws == "string" && ws[0] === `
` && e.push(Lr), ws;
      case "img":
        var fu = y.tagScope & 3, ut = o.src, ot = o.srcSet;
        if (!(o.loading === "lazy" || !ut && !ot || typeof ut != "string" && ut != null || typeof ot != "string" && ot != null || o.fetchPriority === "low" || fu) && (typeof ut != "string" || ut[4] !== ":" || ut[0] !== "d" && ut[0] !== "D" || ut[1] !== "a" && ut[1] !== "A" || ut[2] !== "t" && ut[2] !== "T" || ut[3] !== "a" && ut[3] !== "A") && (typeof ot != "string" || ot[4] !== ":" || ot[0] !== "d" && ot[0] !== "D" || ot[1] !== "a" && ot[1] !== "A" || ot[2] !== "t" && ot[2] !== "T" || ot[3] !== "a" && ot[3] !== "A")) {
          d !== null && y.tagScope & 64 && (d.suspenseyImages = true);
          var Dl = typeof o.sizes == "string" ? o.sizes : void 0, ga = ot ? ot + `
` + (Dl || "") : ut, el = l.preloads.images, To = el.get(ga);
          if (To) (o.fetchPriority === "high" || 10 > l.highImagePreloads.size) && (el.delete(ga), l.highImagePreloads.add(To));
          else if (!s.imageResources.hasOwnProperty(ga)) {
            s.imageResources[ga] = at;
            var tl = o.crossOrigin, Ml = typeof tl == "string" ? tl === "use-credentials" ? tl : "" : void 0, Co = l.headers, rl;
            Co && 0 < Co.remainingCapacity && typeof o.srcSet != "string" && (o.fetchPriority === "high" || 500 > Co.highImagePreloads.length) && (rl = bn(ut, "image", { imageSrcSet: o.srcSet, imageSizes: o.sizes, crossOrigin: Ml, integrity: o.integrity, nonce: o.nonce, type: o.type, fetchPriority: o.fetchPriority, referrerPolicy: o.refererPolicy }), 0 <= (Co.remainingCapacity -= rl.length + 2)) ? (l.resets.image[ga] = at, Co.highImagePreloads && (Co.highImagePreloads += ", "), Co.highImagePreloads += rl) : (To = [], De(To, { rel: "preload", as: "image", href: ot ? void 0 : ut, imageSrcSet: ot, imageSizes: Dl, crossOrigin: Ml, integrity: o.integrity, type: o.type, fetchPriority: o.fetchPriority, referrerPolicy: o.referrerPolicy }), o.fetchPriority === "high" || 10 > l.highImagePreloads.size ? l.highImagePreloads.add(To) : (l.bulkPreloads.add(To), el.set(ga, To)));
          }
        }
        return pr(e, o, "img");
      case "base":
      case "area":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "param":
      case "source":
      case "track":
      case "wbr":
        return pr(e, o, t);
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        break;
      case "head":
        if (2 > y.insertionMode) {
          var nl = c || l.preamble;
          if (nl.headChunks) throw Error("The `<head>` tag may only be rendered once.");
          c !== null && e.push(Ra), nl.headChunks = [];
          var Ll = Ea(nl.headChunks, o, "head");
        } else Ll = zn(e, o, "head");
        return Ll;
      case "body":
        if (2 > y.insertionMode) {
          var ol = c || l.preamble;
          if (ol.bodyChunks) throw Error("The `<body>` tag may only be rendered once.");
          c !== null && e.push(Ei), ol.bodyChunks = [];
          var Hl = Ea(ol.bodyChunks, o, "body");
        } else Hl = zn(e, o, "body");
        return Hl;
      case "html":
        if (y.insertionMode === 0) {
          var al = c || l.preamble;
          if (al.htmlChunks) throw Error("The `<html>` tag may only be rendered once.");
          c !== null && e.push(Pi), al.htmlChunks = [qs];
          var Bl = Ea(al.htmlChunks, o, "html");
        } else Bl = zn(e, o, "html");
        return Bl;
      default:
        if (t.indexOf("-") !== -1) {
          e.push(Ie(t));
          var sl = null, ql = null, ya;
          for (ya in o) if (F.call(o, ya)) {
            var ar = o[ya];
            if (ar != null) {
              var Vl = ya;
              switch (ya) {
                case "children":
                  sl = ar;
                  break;
                case "dangerouslySetInnerHTML":
                  ql = ar;
                  break;
                case "style":
                  pn(e, ar);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "ref":
                  break;
                case "className":
                  Vl = "class";
                default:
                  if (pe(ya) && typeof ar != "function" && typeof ar != "symbol" && ar !== false) {
                    if (ar === true) ar = "";
                    else if (typeof ar == "object") continue;
                    e.push(qe, Vl, st, Y(ar), xe);
                  }
              }
            }
          }
          return e.push(Re), mt(e, ql, sl), sl;
        }
    }
    return zn(e, o, t);
  }
  __name(Hr, "Hr");
  var Kn = /* @__PURE__ */ new Map();
  function dr(e) {
    var t = Kn.get(e);
    return t === void 0 && (t = w("</" + e + ">"), Kn.set(e, t)), t;
  }
  __name(dr, "dr");
  function Pa(e, t) {
    e = e.preamble, e.htmlChunks === null && t.htmlChunks && (e.htmlChunks = t.htmlChunks), e.headChunks === null && t.headChunks && (e.headChunks = t.headChunks), e.bodyChunks === null && t.bodyChunks && (e.bodyChunks = t.bodyChunks);
  }
  __name(Pa, "Pa");
  function _a(e, t) {
    t = t.bootstrapChunks;
    for (var o = 0; o < t.length - 1; o++) x(e, t[o]);
    return o < t.length ? (o = t[o], t.length = 0, le(e, o)) : true;
  }
  __name(_a, "_a");
  var Vs = w("requestAnimationFrame(function(){$RT=performance.now()});"), hr = w('<template id="'), Ws = w('"></template>'), Ii = w("<!--&-->"), Br = w("<!--/&-->"), jo = w("<!--$-->"), Ai = w('<!--$?--><template id="'), $i = w('"></template>'), Fi = w("<!--$!-->"), tt = w("<!--/$-->"), ft = w("<template"), Oi = w('"'), Do = w(' data-dgst="');
  w(' data-msg="'), w(' data-stck="'), w(' data-cstck="');
  var Mo = w("></template>");
  function Us(e, t, o) {
    if (x(e, Ai), o === null) throw Error("An ID must have been assigned before we can complete the boundary.");
    return x(e, t.boundaryPrefix), x(e, o.toString(16)), le(e, $i);
  }
  __name(Us, "Us");
  var Ni = w('<div hidden id="'), Gt = w('">'), Ia = w("</div>"), Aa = w('<svg aria-hidden="true" style="display:none" id="'), $a = w('">'), Lo = w("</svg>"), ke = w('<math aria-hidden="true" style="display:none" id="'), Yn = w('">'), Ho = w("</math>"), Jn = w('<table hidden id="'), Gn = w('">'), Xn = w("</table>"), Bo = w('<table hidden><tbody id="'), dn = w('">'), mr = w("</tbody></table>"), qo = w('<table hidden><tr id="'), Xt = w('">'), zs = w("</tr></table>"), Fa = w('<table hidden><colgroup id="'), hn = w('">'), Qn = w("</colgroup></table>");
  function Ks(e, t, o, s) {
    switch (o.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return x(e, Ni), x(e, t.segmentPrefix), x(e, s.toString(16)), le(e, Gt);
      case 4:
        return x(e, Aa), x(e, t.segmentPrefix), x(e, s.toString(16)), le(e, $a);
      case 5:
        return x(e, ke), x(e, t.segmentPrefix), x(e, s.toString(16)), le(e, Yn);
      case 6:
        return x(e, Jn), x(e, t.segmentPrefix), x(e, s.toString(16)), le(e, Gn);
      case 7:
        return x(e, Bo), x(e, t.segmentPrefix), x(e, s.toString(16)), le(e, dn);
      case 8:
        return x(e, qo), x(e, t.segmentPrefix), x(e, s.toString(16)), le(e, Xt);
      case 9:
        return x(e, Fa), x(e, t.segmentPrefix), x(e, s.toString(16)), le(e, hn);
      default:
        throw Error("Unknown insertion mode. This is a bug in React.");
    }
  }
  __name(Ks, "Ks");
  function Ys(e, t) {
    switch (t.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return le(e, Ia);
      case 4:
        return le(e, Lo);
      case 5:
        return le(e, Ho);
      case 6:
        return le(e, Xn);
      case 7:
        return le(e, mr);
      case 8:
        return le(e, zs);
      case 9:
        return le(e, Qn);
      default:
        throw Error("Unknown insertion mode. This is a bug in React.");
    }
  }
  __name(Ys, "Ys");
  var Js = w('$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), ji = w('$RS("'), Di = w('","'), Mi = w('")<\/script>');
  w('<template data-rsi="" data-sid="'), w('" data-pid="');
  var Gs = w(`$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`), Xs = w('$RC("'), Qs = w(`$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=e[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&$RM.set(b.getAttribute("href"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement("link");a.href=d;a.rel=
"stylesheet";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute("media");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=
"$~";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,"CSS failed to load"))};$RR("`), Li = w('$RR("'), Zs = w('","'), Vo = w('",'), Hi = w('"'), Oa = w(")<\/script>");
  w('<template data-rci="" data-bid="'), w('<template data-rri="" data-bid="'), w('" data-sid="'), w('" data-sty="');
  var ei = w('$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};'), mn = w('$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'), Na = w('$RX("'), Wo = w('"'), ti = w(","), fn = w(")<\/script>");
  w('<template data-rxi="" data-bid="'), w('" data-dgst="'), w('" data-msg="'), w('" data-stck="'), w('" data-cstck="');
  var Bi = /[<\u2028\u2029]/g;
  function qi(e) {
    return JSON.stringify(e).replace(Bi, function(t) {
      switch (t) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  __name(qi, "qi");
  var Vi = /[&><\u2028\u2029]/g;
  function $e(e) {
    return JSON.stringify(e).replace(Vi, function(t) {
      switch (t) {
        case "&":
          return "\\u0026";
        case ">":
          return "\\u003e";
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  __name($e, "$e");
  var ri = w(' media="not all" data-precedence="'), ja = w('" data-href="'), Uo = w('">'), ni = w("</style>"), Dt = false, qr = true;
  function Da(e) {
    var t = e.rules, o = e.hrefs, s = 0;
    if (o.length) {
      for (x(this, Dr.startInlineStyle), x(this, ri), x(this, e.precedence), x(this, ja); s < o.length - 1; s++) x(this, o[s]), x(this, Ha);
      for (x(this, o[s]), x(this, Uo), s = 0; s < t.length; s++) x(this, t[s]);
      qr = le(this, ni), Dt = true, t.length = 0, o.length = 0;
    }
  }
  __name(Da, "Da");
  function fr(e) {
    return e.state !== 2 ? Dt = true : false;
  }
  __name(fr, "fr");
  function ze(e, t, o) {
    return Dt = false, qr = true, Dr = o, t.styles.forEach(Da, e), Dr = null, t.stylesheets.forEach(fr), Dt && (o.stylesToHoist = true), qr;
  }
  __name(ze, "ze");
  function rt(e) {
    for (var t = 0; t < e.length; t++) x(this, e[t]);
    e.length = 0;
  }
  __name(rt, "rt");
  var Ee = [];
  function Ma(e) {
    De(Ee, e.props);
    for (var t = 0; t < Ee.length; t++) x(this, Ee[t]);
    Ee.length = 0, e.state = 2;
  }
  __name(Ma, "Ma");
  var La = w(' data-precedence="'), Zn = w('" data-href="'), Ha = w(" "), oi = w('">'), ai = w("</style>");
  function zo(e) {
    var t = 0 < e.sheets.size;
    e.sheets.forEach(Ma, this), e.sheets.clear();
    var o = e.rules, s = e.hrefs;
    if (!t || s.length) {
      if (x(this, Dr.startInlineStyle), x(this, La), x(this, e.precedence), e = 0, s.length) {
        for (x(this, Zn); e < s.length - 1; e++) x(this, s[e]), x(this, Ha);
        x(this, s[e]);
      }
      for (x(this, oi), e = 0; e < o.length; e++) x(this, o[e]);
      x(this, ai), o.length = 0, s.length = 0;
    }
  }
  __name(zo, "zo");
  function Ko(e) {
    if (e.state === 0) {
      e.state = 1;
      var t = e.props;
      for (De(Ee, { rel: "preload", as: "style", href: e.props.href, crossOrigin: t.crossOrigin, fetchPriority: t.fetchPriority, integrity: t.integrity, media: t.media, hrefLang: t.hrefLang, referrerPolicy: t.referrerPolicy }), e = 0; e < Ee.length; e++) x(this, Ee[e]);
      Ee.length = 0;
    }
  }
  __name(Ko, "Ko");
  function Tt(e) {
    e.sheets.forEach(Ko, this), e.sheets.clear();
  }
  __name(Tt, "Tt");
  w('<link rel="expect" href="#'), w('" blocking="render"/>');
  var Yo = w(' id="');
  function gn(e, t) {
    (t.instructions & 32) === 0 && (t.instructions |= 32, e.push(Yo, Y("_" + t.idPrefix + "R_"), xe));
  }
  __name(gn, "gn");
  var Ba = w("["), Jo = w(",["), eo = w(","), Go = w("]");
  function si(e, t) {
    x(e, Ba);
    var o = Ba;
    t.stylesheets.forEach(function(s) {
      if (s.state !== 2) if (s.state === 3) x(e, o), x(e, $e("" + s.props.href)), x(e, Go), o = Jo;
      else {
        x(e, o);
        var l = s.props["data-precedence"], c = s.props, d = un("" + s.props.href);
        x(e, $e(d)), l = "" + l, x(e, eo), x(e, $e(l));
        for (var y in c) if (F.call(c, y) && (l = c[y], l != null)) switch (y) {
          case "href":
          case "rel":
          case "precedence":
          case "data-precedence":
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error("link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
          default:
            Ve(e, y, l);
        }
        x(e, Go), o = Jo, s.state = 3;
      }
    }), x(e, Go);
  }
  __name(si, "si");
  function Ve(e, t, o) {
    var s = t.toLowerCase();
    switch (typeof o) {
      case "function":
      case "symbol":
        return;
    }
    switch (t) {
      case "innerHTML":
      case "dangerouslySetInnerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "style":
      case "ref":
        return;
      case "className":
        s = "class", t = "" + o;
        break;
      case "hidden":
        if (o === false) return;
        t = "";
        break;
      case "src":
      case "href":
        o = un(o), t = "" + o;
        break;
      default:
        if (2 < t.length && (t[0] === "o" || t[0] === "O") && (t[1] === "n" || t[1] === "N") || !pe(t)) return;
        t = "" + o;
    }
    x(e, eo), x(e, $e(s)), x(e, eo), x(e, $e(t));
  }
  __name(Ve, "Ve");
  function qa() {
    return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set(), suspenseyImages: false };
  }
  __name(qa, "qa");
  function to(e) {
    var t = Wt();
    if (t) {
      var o = t.resumableState, s = t.renderState;
      if (typeof e == "string" && e) {
        if (!o.dnsResources.hasOwnProperty(e)) {
          o.dnsResources[e] = null, o = s.headers;
          var l, c;
          (c = o && 0 < o.remainingCapacity) && (c = (l = "<" + ("" + e).replace(Qo, Vr) + ">; rel=dns-prefetch", 0 <= (o.remainingCapacity -= l.length + 2))), c ? (s.resets.dns[e] = null, o.preconnects && (o.preconnects += ", "), o.preconnects += l) : (l = [], De(l, { href: e, rel: "dns-prefetch" }), s.preconnects.add(l));
        }
        wr(t);
      }
    } else jt.D(e);
  }
  __name(to, "to");
  function Va(e, t) {
    var o = Wt();
    if (o) {
      var s = o.resumableState, l = o.renderState;
      if (typeof e == "string" && e) {
        var c = t === "use-credentials" ? "credentials" : typeof t == "string" ? "anonymous" : "default";
        if (!s.connectResources[c].hasOwnProperty(e)) {
          s.connectResources[c][e] = null, s = l.headers;
          var d, y;
          if (y = s && 0 < s.remainingCapacity) {
            if (y = "<" + ("" + e).replace(Qo, Vr) + ">; rel=preconnect", typeof t == "string") {
              var m = ("" + t).replace(Sn, Wr);
              y += '; crossorigin="' + m + '"';
            }
            y = (d = y, 0 <= (s.remainingCapacity -= d.length + 2));
          }
          y ? (l.resets.connect[c][e] = null, s.preconnects && (s.preconnects += ", "), s.preconnects += d) : (c = [], De(c, { rel: "preconnect", href: e, crossOrigin: t }), l.preconnects.add(c));
        }
        wr(o);
      }
    } else jt.C(e, t);
  }
  __name(Va, "Va");
  function Wa(e, t, o) {
    var s = Wt();
    if (s) {
      var l = s.resumableState, c = s.renderState;
      if (t && e) {
        switch (t) {
          case "image":
            if (o) var d = o.imageSrcSet, y = o.imageSizes, m = o.fetchPriority;
            var b = d ? d + `
` + (y || "") : e;
            if (l.imageResources.hasOwnProperty(b)) return;
            l.imageResources[b] = at, l = c.headers;
            var k;
            l && 0 < l.remainingCapacity && typeof d != "string" && m === "high" && (k = bn(e, t, o), 0 <= (l.remainingCapacity -= k.length + 2)) ? (c.resets.image[b] = at, l.highImagePreloads && (l.highImagePreloads += ", "), l.highImagePreloads += k) : (l = [], De(l, _({ rel: "preload", href: d ? void 0 : e, as: t }, o)), m === "high" ? c.highImagePreloads.add(l) : (c.bulkPreloads.add(l), c.preloads.images.set(b, l)));
            break;
          case "style":
            if (l.styleResources.hasOwnProperty(e)) return;
            d = [], De(d, _({ rel: "preload", href: e, as: t }, o)), l.styleResources[e] = !o || typeof o.crossOrigin != "string" && typeof o.integrity != "string" ? at : [o.crossOrigin, o.integrity], c.preloads.stylesheets.set(e, d), c.bulkPreloads.add(d);
            break;
          case "script":
            if (l.scriptResources.hasOwnProperty(e)) return;
            d = [], c.preloads.scripts.set(e, d), c.bulkPreloads.add(d), De(d, _({ rel: "preload", href: e, as: t }, o)), l.scriptResources[e] = !o || typeof o.crossOrigin != "string" && typeof o.integrity != "string" ? at : [o.crossOrigin, o.integrity];
            break;
          default:
            if (l.unknownResources.hasOwnProperty(t)) {
              if (d = l.unknownResources[t], d.hasOwnProperty(e)) return;
            } else d = {}, l.unknownResources[t] = d;
            d[e] = at, (l = c.headers) && 0 < l.remainingCapacity && t === "font" && (b = bn(e, t, o), 0 <= (l.remainingCapacity -= b.length + 2)) ? (c.resets.font[e] = at, l.fontPreloads && (l.fontPreloads += ", "), l.fontPreloads += b) : (l = [], e = _({ rel: "preload", href: e, as: t }, o), De(l, e), t) === "font" ? c.fontPreloads.add(l) : c.bulkPreloads.add(l);
        }
        wr(s);
      }
    } else jt.L(e, t, o);
  }
  __name(Wa, "Wa");
  function Ua(e, t) {
    var o = Wt();
    if (o) {
      var s = o.resumableState, l = o.renderState;
      if (e) {
        var c = t && typeof t.as == "string" ? t.as : "script";
        switch (c) {
          case "script":
            if (s.moduleScriptResources.hasOwnProperty(e)) return;
            c = [], s.moduleScriptResources[e] = !t || typeof t.crossOrigin != "string" && typeof t.integrity != "string" ? at : [t.crossOrigin, t.integrity], l.preloads.moduleScripts.set(e, c);
            break;
          default:
            if (s.moduleUnknownResources.hasOwnProperty(c)) {
              var d = s.unknownResources[c];
              if (d.hasOwnProperty(e)) return;
            } else d = {}, s.moduleUnknownResources[c] = d;
            c = [], d[e] = at;
        }
        De(c, _({ rel: "modulepreload", href: e }, t)), l.bulkPreloads.add(c), wr(o);
      }
    } else jt.m(e, t);
  }
  __name(Ua, "Ua");
  function Xo(e, t, o) {
    var s = Wt();
    if (s) {
      var l = s.resumableState, c = s.renderState;
      if (e) {
        t = t || "default";
        var d = c.styles.get(t), y = l.styleResources.hasOwnProperty(e) ? l.styleResources[e] : void 0;
        y !== null && (l.styleResources[e] = null, d || (d = { precedence: Y(t), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, c.styles.set(t, d)), t = { state: 0, props: _({ rel: "stylesheet", href: e, "data-precedence": t }, o) }, y && (y.length === 2 && yn(t.props, y), (c = c.preloads.stylesheets.get(e)) && 0 < c.length ? c.length = 0 : t.state = 1), d.sheets.set(e, t), wr(s));
      }
    } else jt.S(e, t, o);
  }
  __name(Xo, "Xo");
  function ro(e, t) {
    var o = Wt();
    if (o) {
      var s = o.resumableState, l = o.renderState;
      if (e) {
        var c = s.scriptResources.hasOwnProperty(e) ? s.scriptResources[e] : void 0;
        c !== null && (s.scriptResources[e] = null, t = _({ src: e, async: true }, t), c && (c.length === 2 && yn(t, c), e = l.preloads.scripts.get(e)) && (e.length = 0), e = [], l.scripts.add(e), Jt(e, t), wr(o));
      }
    } else jt.X(e, t);
  }
  __name(ro, "ro");
  function gr(e, t) {
    var o = Wt();
    if (o) {
      var s = o.resumableState, l = o.renderState;
      if (e) {
        var c = s.moduleScriptResources.hasOwnProperty(e) ? s.moduleScriptResources[e] : void 0;
        c !== null && (s.moduleScriptResources[e] = null, t = _({ src: e, type: "module", async: true }, t), c && (c.length === 2 && yn(t, c), e = l.preloads.moduleScripts.get(e)) && (e.length = 0), e = [], l.scripts.add(e), Jt(e, t), wr(o));
      }
    } else jt.M(e, t);
  }
  __name(gr, "gr");
  function yn(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t[0]), e.integrity == null && (e.integrity = t[1]);
  }
  __name(yn, "yn");
  function bn(e, t, o) {
    e = ("" + e).replace(Qo, Vr), t = ("" + t).replace(Sn, Wr), t = "<" + e + '>; rel=preload; as="' + t + '"';
    for (var s in o) F.call(o, s) && (e = o[s], typeof e == "string" && (t += "; " + s.toLowerCase() + '="' + ("" + e).replace(Sn, Wr) + '"'));
    return t;
  }
  __name(bn, "bn");
  var Qo = /[<>\r\n]/g;
  function Vr(e) {
    switch (e) {
      case "<":
        return "%3C";
      case ">":
        return "%3E";
      case `
`:
        return "%0A";
      case "\r":
        return "%0D";
      default:
        throw Error("escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  }
  __name(Vr, "Vr");
  var Sn = /["';,\r\n]/g;
  function Wr(e) {
    switch (e) {
      case '"':
        return "%22";
      case "'":
        return "%27";
      case ";":
        return "%3B";
      case ",":
        return "%2C";
      case `
`:
        return "%0A";
      case "\r":
        return "%0D";
      default:
        throw Error("escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  }
  __name(Wr, "Wr");
  function no(e) {
    this.styles.add(e);
  }
  __name(no, "no");
  function za(e) {
    this.stylesheets.add(e);
  }
  __name(za, "za");
  function Ur(e, t) {
    t.styles.forEach(no, e), t.stylesheets.forEach(za, e), t.suspenseyImages && (e.suspenseyImages = true);
  }
  __name(Ur, "Ur");
  function Ka(e) {
    return 0 < e.stylesheets.size || e.suspenseyImages;
  }
  __name(Ka, "Ka");
  var Zo = Function.prototype.bind, kn = new j.AsyncLocalStorage(), zr = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ea(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.$$typeof === zr ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case L:
        return "Fragment";
      case oe:
        return "Profiler";
      case P:
        return "StrictMode";
      case Ar:
        return "Suspense";
      case $r:
        return "SuspenseList";
      case Fr:
        return "Activity";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case we:
        return "Portal";
      case kt:
        return e.displayName || "Context";
      case Je:
        return (e._context.displayName || "Context") + ".Consumer";
      case Pt:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case an:
        return t = e.displayName || null, t !== null ? t : ea(e.type) || "Memo";
      case _t:
        t = e._payload, e = e._init;
        try {
          return ea(e(t));
        } catch {
        }
    }
    return null;
  }
  __name(ea, "ea");
  var ii = {}, Mt = null;
  function ta(e, t) {
    if (e !== t) {
      e.context._currentValue = e.parentValue, e = e.parent;
      var o = t.parent;
      if (e === null) {
        if (o !== null) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
      } else {
        if (o === null) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        ta(e, o);
      }
      t.context._currentValue = t.value;
    }
  }
  __name(ta, "ta");
  function Ya(e) {
    e.context._currentValue = e.parentValue, e = e.parent, e !== null && Ya(e);
  }
  __name(Ya, "Ya");
  function r(e) {
    var t = e.parent;
    t !== null && r(t), e.context._currentValue = e.value;
  }
  __name(r, "r");
  function n(e, t) {
    if (e.context._currentValue = e.parentValue, e = e.parent, e === null) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    e.depth === t.depth ? ta(e, t) : n(e, t);
  }
  __name(n, "n");
  function a(e, t) {
    var o = t.parent;
    if (o === null) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    e.depth === o.depth ? ta(e, o) : a(e, o), t.context._currentValue = t.value;
  }
  __name(a, "a");
  function i(e) {
    var t = Mt;
    t !== e && (t === null ? r(e) : e === null ? Ya(t) : t.depth === e.depth ? ta(t, e) : t.depth > e.depth ? n(t, e) : a(t, e), Mt = e);
  }
  __name(i, "i");
  var u = { enqueueSetState: /* @__PURE__ */ __name(function(e, t) {
    e = e._reactInternals, e.queue !== null && e.queue.push(t);
  }, "enqueueSetState"), enqueueReplaceState: /* @__PURE__ */ __name(function(e, t) {
    e = e._reactInternals, e.replace = true, e.queue = [t];
  }, "enqueueReplaceState"), enqueueForceUpdate: /* @__PURE__ */ __name(function() {
  }, "enqueueForceUpdate") }, p = { id: 1, overflow: "" };
  function h(e, t, o) {
    var s = e.id;
    e = e.overflow;
    var l = 32 - v(s) - 1;
    s &= ~(1 << l), o += 1;
    var c = 32 - v(t) + l;
    if (30 < c) {
      var d = l - l % 5;
      return c = (s & (1 << d) - 1).toString(32), s >>= d, l -= d, { id: 1 << 32 - v(t) + l | o << l | s, overflow: c + e };
    }
    return { id: 1 << c | o << l | s, overflow: e };
  }
  __name(h, "h");
  var v = Math.clz32 ? Math.clz32 : E, g = Math.log, T = Math.LN2;
  function E(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (g(e) / T | 0) | 0;
  }
  __name(E, "E");
  function R() {
  }
  __name(R, "R");
  var $ = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`.");
  function H(e, t, o) {
    switch (o = e[o], o === void 0 ? e.push(t) : o !== t && (t.then(R, R), t = o), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw t.reason;
      default:
        switch (typeof t.status == "string" ? t.then(R, R) : (e = t, e.status = "pending", e.then(function(s) {
          if (t.status === "pending") {
            var l = t;
            l.status = "fulfilled", l.value = s;
          }
        }, function(s) {
          if (t.status === "pending") {
            var l = t;
            l.status = "rejected", l.reason = s;
          }
        })), t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw t.reason;
        }
        throw re = t, $;
    }
  }
  __name(H, "H");
  var re = null;
  function J() {
    if (re === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
    var e = re;
    return re = null, e;
  }
  __name(J, "J");
  function G(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  __name(G, "G");
  var W = typeof Object.is == "function" ? Object.is : G, X = null, ve = null, Pe = null, ae = null, ce = null, ne = null, it = false, se = false, gt = 0, fe = 0, Me = -1, He = 0, Te = null, nt = null, Kr = 0;
  function yt() {
    if (X === null) throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    return X;
  }
  __name(yt, "yt");
  function oo() {
    if (0 < Kr) throw Error("Rendered more hooks than during the previous render");
    return { memoizedState: null, queue: null, next: null };
  }
  __name(oo, "oo");
  function vn() {
    return ne === null ? ce === null ? (it = false, ce = ne = oo()) : (it = true, ne = ce) : ne.next === null ? (it = false, ne = ne.next = oo()) : (it = true, ne = ne.next), ne;
  }
  __name(vn, "vn");
  function Qe() {
    var e = Te;
    return Te = null, e;
  }
  __name(Qe, "Qe");
  function Ct() {
    ae = Pe = ve = X = null, se = false, ce = null, Kr = 0, ne = nt = null;
  }
  __name(Ct, "Ct");
  function At(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  __name(At, "At");
  function $t(e, t, o) {
    if (X = yt(), ne = vn(), it) {
      var s = ne.queue;
      if (t = s.dispatch, nt !== null && (o = nt.get(s), o !== void 0)) {
        nt.delete(s), s = ne.memoizedState;
        do
          s = e(s, o.action), o = o.next;
        while (o !== null);
        return ne.memoizedState = s, [s, t];
      }
      return [ne.memoizedState, t];
    }
    return e = e === At ? typeof t == "function" ? t() : t : o !== void 0 ? o(t) : t, ne.memoizedState = e, e = ne.queue = { last: null, dispatch: null }, e = e.dispatch = yr.bind(null, X, e), [ne.memoizedState, e];
  }
  __name($t, "$t");
  function Qt(e, t) {
    if (X = yt(), ne = vn(), t = t === void 0 ? null : t, ne !== null) {
      var o = ne.memoizedState;
      if (o !== null && t !== null) {
        var s = o[1];
        e: if (s === null) s = false;
        else {
          for (var l = 0; l < s.length && l < t.length; l++) if (!W(t[l], s[l])) {
            s = false;
            break e;
          }
          s = true;
        }
        if (s) return o[0];
      }
    }
    return e = e(), ne.memoizedState = [e, t], e;
  }
  __name(Qt, "Qt");
  function yr(e, t, o) {
    if (25 <= Kr) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
    if (e === X) if (se = true, e = { action: o, next: null }, nt === null && (nt = /* @__PURE__ */ new Map()), o = nt.get(t), o === void 0) nt.set(t, e);
    else {
      for (t = o; t.next !== null; ) t = t.next;
      t.next = e;
    }
  }
  __name(yr, "yr");
  function We() {
    throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
  }
  __name(We, "We");
  function Yr() {
    throw Error("startTransition cannot be called during server rendering.");
  }
  __name(Yr, "Yr");
  function ao() {
    throw Error("Cannot update optimistic state while rendering.");
  }
  __name(ao, "ao");
  function Ja(e, t, o) {
    return e !== void 0 ? "p" + e : (e = JSON.stringify([t, null, o]), t = q.createHash("md5"), t.update(e), "k" + t.digest("hex"));
  }
  __name(Ja, "Ja");
  function Ga(e, t, o) {
    yt();
    var s = fe++, l = Pe;
    if (typeof e.$$FORM_ACTION == "function") {
      var c = null, d = ae;
      l = l.formState;
      var y = e.$$IS_SIGNATURE_EQUAL;
      if (l !== null && typeof y == "function") {
        var m = l[1];
        y.call(e, l[2], l[3]) && (c = Ja(o, d, s), m === c && (Me = s, t = l[0]));
      }
      var b = e.bind(null, t);
      return e = /* @__PURE__ */ __name(function(C) {
        b(C);
      }, "e"), typeof b.$$FORM_ACTION == "function" && (e.$$FORM_ACTION = function(C) {
        C = b.$$FORM_ACTION(C), o !== void 0 && (o += "", C.action = o);
        var I = C.data;
        return I && (c === null && (c = Ja(o, d, s)), I.append("$ACTION_KEY", c)), C;
      }), [t, e, false];
    }
    var k = e.bind(null, t);
    return [t, function(C) {
      k(C);
    }, false];
  }
  __name(Ga, "Ga");
  function Xa(e) {
    var t = He;
    return He += 1, Te === null && (Te = []), H(Te, e, t);
  }
  __name(Xa, "Xa");
  function li() {
    throw Error("Cache cannot be refreshed during server rendering.");
  }
  __name(li, "li");
  var Qa = { readContext: /* @__PURE__ */ __name(function(e) {
    return e._currentValue;
  }, "readContext"), use: /* @__PURE__ */ __name(function(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Xa(e);
      if (e.$$typeof === kt) return e._currentValue;
    }
    throw Error("An unsupported type was passed to use(): " + String(e));
  }, "use"), useContext: /* @__PURE__ */ __name(function(e) {
    return yt(), e._currentValue;
  }, "useContext"), useMemo: Qt, useReducer: $t, useRef: /* @__PURE__ */ __name(function(e) {
    X = yt(), ne = vn();
    var t = ne.memoizedState;
    return t === null ? (e = { current: e }, ne.memoizedState = e) : t;
  }, "useRef"), useState: /* @__PURE__ */ __name(function(e) {
    return $t(At, e);
  }, "useState"), useInsertionEffect: R, useLayoutEffect: R, useCallback: /* @__PURE__ */ __name(function(e, t) {
    return Qt(function() {
      return e;
    }, t);
  }, "useCallback"), useImperativeHandle: R, useEffect: R, useDebugValue: R, useDeferredValue: /* @__PURE__ */ __name(function(e, t) {
    return yt(), t !== void 0 ? t : e;
  }, "useDeferredValue"), useTransition: /* @__PURE__ */ __name(function() {
    return yt(), [false, Yr];
  }, "useTransition"), useId: /* @__PURE__ */ __name(function() {
    var e = ve.treeContext, t = e.overflow;
    e = e.id, e = (e & ~(1 << 32 - v(e) - 1)).toString(32) + t;
    var o = so;
    if (o === null) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
    return t = gt++, e = "_" + o.idPrefix + "R_" + e, 0 < t && (e += "H" + t.toString(32)), e + "_";
  }, "useId"), useSyncExternalStore: /* @__PURE__ */ __name(function(e, t, o) {
    if (o === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
    return o();
  }, "useSyncExternalStore"), useOptimistic: /* @__PURE__ */ __name(function(e) {
    return yt(), [e, ao];
  }, "useOptimistic"), useActionState: Ga, useFormState: Ga, useHostTransitionStatus: /* @__PURE__ */ __name(function() {
    return yt(), Xe;
  }, "useHostTransitionStatus"), useMemoCache: /* @__PURE__ */ __name(function(e) {
    for (var t = Array(e), o = 0; o < e; o++) t[o] = Or;
    return t;
  }, "useMemoCache"), useCacheRefresh: /* @__PURE__ */ __name(function() {
    return li;
  }, "useCacheRefresh"), useEffectEvent: /* @__PURE__ */ __name(function() {
    return We;
  }, "useEffectEvent") }, so = null, io = { getCacheForType: /* @__PURE__ */ __name(function() {
    throw Error("Not implemented.");
  }, "getCacheForType"), cacheSignal: /* @__PURE__ */ __name(function() {
    throw Error("Not implemented.");
  }, "cacheSignal") };
  function Lt(e, t) {
    e = (e.name || "Error") + ": " + (e.message || "");
    for (var o = 0; o < t.length; o++) e += `
    at ` + t[o].toString();
    return e;
  }
  __name(Lt, "Lt");
  var ra, Za;
  function Ht(e) {
    if (ra === void 0) try {
      throw Error();
    } catch (o) {
      var t = o.stack.trim().match(/\n( *(at )?)/);
      ra = t && t[1] || "", Za = -1 < o.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < o.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + ra + e + Za;
  }
  __name(Ht, "Ht");
  var na = false;
  function Bt(e, t) {
    if (!e || na) return "";
    na = true;
    var o = Error.prepareStackTrace;
    Error.prepareStackTrace = Lt;
    try {
      var s = { DetermineComponentFrameRoot: /* @__PURE__ */ __name(function() {
        try {
          if (t) {
            var C = /* @__PURE__ */ __name(function() {
              throw Error();
            }, "C");
            if (Object.defineProperty(C.prototype, "props", { set: /* @__PURE__ */ __name(function() {
              throw Error();
            }, "set") }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(C, []);
              } catch (A) {
                var I = A;
              }
              Reflect.construct(e, [], C);
            } else {
              try {
                C.call();
              } catch (A) {
                I = A;
              }
              e.call(C.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (A) {
              I = A;
            }
            (C = e()) && typeof C.catch == "function" && C.catch(function() {
            });
          }
        } catch (A) {
          if (A && I && typeof A.stack == "string") return [A.stack, I.stack];
        }
        return [null, null];
      }, "DetermineComponentFrameRoot") };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var l = Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot, "name");
      l && l.configurable && Object.defineProperty(s.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var c = s.DetermineComponentFrameRoot(), d = c[0], y = c[1];
      if (d && y) {
        var m = d.split(`
`), b = y.split(`
`);
        for (l = s = 0; s < m.length && !m[s].includes("DetermineComponentFrameRoot"); ) s++;
        for (; l < b.length && !b[l].includes("DetermineComponentFrameRoot"); ) l++;
        if (s === m.length || l === b.length) for (s = m.length - 1, l = b.length - 1; 1 <= s && 0 <= l && m[s] !== b[l]; ) l--;
        for (; 1 <= s && 0 <= l; s--, l--) if (m[s] !== b[l]) {
          if (s !== 1 || l !== 1) do
            if (s--, l--, 0 > l || m[s] !== b[l]) {
              var k = `
` + m[s].replace(" at new ", " at ");
              return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), k;
            }
          while (1 <= s && 0 <= l);
          break;
        }
      }
    } finally {
      na = false, Error.prepareStackTrace = o;
    }
    return (o = e ? e.displayName || e.name : "") ? Ht(o) : "";
  }
  __name(Bt, "Bt");
  function Tn(e) {
    if (typeof e == "string") return Ht(e);
    if (typeof e == "function") return e.prototype && e.prototype.isReactComponent ? Bt(e, true) : Bt(e, false);
    if (typeof e == "object" && e !== null) {
      switch (e.$$typeof) {
        case Pt:
          return Bt(e.render, false);
        case an:
          return Bt(e.type, false);
        case _t:
          var t = e, o = t._payload;
          t = t._init;
          try {
            e = t(o);
          } catch {
            return Ht("Lazy");
          }
          return Tn(e);
      }
      if (typeof e.name == "string") {
        e: {
          o = e.name, t = e.env;
          var s = e.debugLocation;
          if (s != null && (e = Error.prepareStackTrace, Error.prepareStackTrace = Lt, s = s.stack, Error.prepareStackTrace = e, s.startsWith(`Error: react-stack-top-frame
`) && (s = s.slice(29)), e = s.indexOf(`
`), e !== -1 && (s = s.slice(e + 1)), e = s.indexOf("react_stack_bottom_frame"), e !== -1 && (e = s.lastIndexOf(`
`, e)), e = e !== -1 ? s = s.slice(0, e) : "", s = e.lastIndexOf(`
`), e = s === -1 ? e : e.slice(s + 1), e.indexOf(o) !== -1)) {
            o = `
` + e;
            break e;
          }
          o = Ht(o + (t ? " [" + t + "]" : ""));
        }
        return o;
      }
    }
    switch (e) {
      case $r:
        return Ht("SuspenseList");
      case Ar:
        return Ht("Suspense");
    }
    return "";
  }
  __name(Tn, "Tn");
  function qt(e, t) {
    return (500 < t.byteSize || Ka(t.contentState)) && t.contentPreamble === null;
  }
  __name(qt, "qt");
  function lo(e) {
    if (typeof e == "object" && e !== null && typeof e.environmentName == "string") {
      var t = e.environmentName;
      e = [e].slice(0), typeof e[0] == "string" ? e.splice(0, 1, "\x1B[0m\x1B[7m%c%s\x1B[0m%c " + e[0], "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", " " + t + " ", "") : e.splice(0, 0, "\x1B[0m\x1B[7m%c%s\x1B[0m%c", "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", " " + t + " ", ""), e.unshift(console), t = Zo.apply(console.error, e), t();
    } else console.error(e);
    return null;
  }
  __name(lo, "lo");
  function Cn(e, t, o, s, l, c, d, y, m, b, k) {
    var C = /* @__PURE__ */ new Set();
    this.destination = null, this.flushScheduled = false, this.resumableState = e, this.renderState = t, this.rootFormatContext = o, this.progressiveChunkSize = s === void 0 ? 12800 : s, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.byteSize = 0, this.abortableTasks = C, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = l === void 0 ? lo : l, this.onPostpone = b === void 0 ? R : b, this.onAllReady = c === void 0 ? R : c, this.onShellReady = d === void 0 ? R : d, this.onShellError = y === void 0 ? R : y, this.onFatalError = m === void 0 ? R : m, this.formState = k === void 0 ? null : k;
  }
  __name(Cn, "Cn");
  function Vt(e, t, o, s, l, c, d, y, m, b, k, C) {
    return t = new Cn(t, o, s, l, c, d, y, m, b, k, C), o = wt(t, 0, null, s, false, false), o.parentFlushed = true, e = xn(t, null, e, -1, null, o, null, null, t.abortableTasks, null, s, null, p, null, null), Sr(e), t.pingedTasks.push(e), t;
  }
  __name(Vt, "Vt");
  function oa(e, t, o, s, l, c, d, y, m, b, k) {
    return e = Vt(e, t, o, s, l, c, d, y, m, b, k, void 0), e.trackedPostpones = { workingMap: /* @__PURE__ */ new Map(), rootNodes: [], rootSlots: null }, e;
  }
  __name(oa, "oa");
  function uo(e, t, o, s, l, c, d, y, m) {
    return o = new Cn(t.resumableState, o, t.rootFormatContext, t.progressiveChunkSize, s, l, c, d, y, m, null), o.nextSegmentId = t.nextSegmentId, typeof t.replaySlots == "number" ? (s = wt(o, 0, null, t.rootFormatContext, false, false), s.parentFlushed = true, e = xn(o, null, e, -1, null, s, null, null, o.abortableTasks, null, t.rootFormatContext, null, p, null, null), Sr(e), o.pingedTasks.push(e), o) : (e = Jr(o, null, { nodes: t.replayNodes, slots: t.replaySlots, pendingTasks: 0 }, e, -1, null, null, o.abortableTasks, null, t.rootFormatContext, null, p, null, null), Sr(e), o.pingedTasks.push(e), o);
  }
  __name(uo, "uo");
  function br(e, t, o, s, l, c, d, y, m) {
    return e = uo(e, t, o, s, l, c, d, y, m), e.trackedPostpones = { workingMap: /* @__PURE__ */ new Map(), rootNodes: [], rootSlots: null }, e;
  }
  __name(br, "br");
  var wn = null;
  function Wt() {
    if (wn) return wn;
    var e = kn.getStore();
    return e || null;
  }
  __name(Wt, "Wt");
  function es(e, t) {
    e.pingedTasks.push(t), e.pingedTasks.length === 1 && (e.flushScheduled = e.destination !== null, e.trackedPostpones !== null || e.status === 10 ? Hn(function() {
      return en(e);
    }) : setImmediate(function() {
      return en(e);
    }));
  }
  __name(es, "es");
  function Zt(e, t, o, s, l) {
    return o = { status: 0, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, row: t, completedSegments: [], byteSize: 0, fallbackAbortableTasks: o, errorDigest: null, contentState: qa(), fallbackState: qa(), contentPreamble: s, fallbackPreamble: l, trackedContentKeyPath: null, trackedFallbackNode: null }, t !== null && (t.pendingTasks++, s = t.boundaries, s !== null && (e.allPendingTasks++, o.pendingTasks++, s.push(o)), e = t.inheritedHoistables, e !== null && Ur(o.contentState, e)), o;
  }
  __name(Zt, "Zt");
  function xn(e, t, o, s, l, c, d, y, m, b, k, C, I, A, ue) {
    e.allPendingTasks++, l === null ? e.pendingRootTasks++ : l.pendingTasks++, A !== null && A.pendingTasks++;
    var Z = { replay: null, node: o, childIndex: s, ping: /* @__PURE__ */ __name(function() {
      return es(e, Z);
    }, "ping"), blockedBoundary: l, blockedSegment: c, blockedPreamble: d, hoistableState: y, abortSet: m, keyPath: b, formatContext: k, context: C, treeContext: I, row: A, componentStack: ue, thenableState: t };
    return m.add(Z), Z;
  }
  __name(xn, "xn");
  function Jr(e, t, o, s, l, c, d, y, m, b, k, C, I, A) {
    e.allPendingTasks++, c === null ? e.pendingRootTasks++ : c.pendingTasks++, I !== null && I.pendingTasks++, o.pendingTasks++;
    var ue = { replay: o, node: s, childIndex: l, ping: /* @__PURE__ */ __name(function() {
      return es(e, ue);
    }, "ping"), blockedBoundary: c, blockedSegment: null, blockedPreamble: null, hoistableState: d, abortSet: y, keyPath: m, formatContext: b, context: k, treeContext: C, row: I, componentStack: A, thenableState: t };
    return y.add(ue), ue;
  }
  __name(Jr, "Jr");
  function wt(e, t, o, s, l, c) {
    return { status: 0, parentFlushed: false, id: -1, index: t, chunks: [], children: [], preambleChildren: [], parentFormatContext: s, boundary: o, lastPushedText: l, textEmbedded: c };
  }
  __name(wt, "wt");
  function Sr(e) {
    var t = e.node;
    typeof t == "object" && t !== null && t.$$typeof === ge && (e.componentStack = { parent: e.componentStack, type: t.type });
  }
  __name(Sr, "Sr");
  function aa(e) {
    return e === null ? null : { parent: e.parent, type: "Suspense Fallback" };
  }
  __name(aa, "aa");
  function kr(e) {
    var t = {};
    return e && Object.defineProperty(t, "componentStack", { configurable: true, enumerable: true, get: /* @__PURE__ */ __name(function() {
      try {
        var o = "", s = e;
        do
          o += Tn(s.type), s = s.parent;
        while (s);
        var l = o;
      } catch (c) {
        l = `
Error generating stack: ` + c.message + `
` + c.stack;
      }
      return Object.defineProperty(t, "componentStack", { value: l }), l;
    }, "get") }), t;
  }
  __name(kr, "kr");
  function Ze(e, t, o) {
    if (e = e.onError, t = e(t, o), t == null || typeof t == "string") return t;
  }
  __name(Ze, "Ze");
  function Gr(e, t) {
    var o = e.onShellError, s = e.onFatalError;
    o(t), s(t), e.destination !== null ? (e.status = 14, e.destination.destroy(t)) : (e.status = 13, e.fatalError = t);
  }
  __name(Gr, "Gr");
  function et(e, t) {
    ts(e, t.next, t.hoistables);
  }
  __name(et, "et");
  function ts(e, t, o) {
    for (; t !== null; ) {
      o !== null && (Ur(t.hoistables, o), t.inheritedHoistables = o);
      var s = t.boundaries;
      if (s !== null) {
        t.boundaries = null;
        for (var l = 0; l < s.length; l++) {
          var c = s[l];
          o !== null && Ur(c.contentState, o), tr(e, c, null, null);
        }
      }
      if (t.pendingTasks--, 0 < t.pendingTasks) break;
      o = t.hoistables, t = t.next;
    }
  }
  __name(ts, "ts");
  function rs(e, t) {
    var o = t.boundaries;
    if (o !== null && t.pendingTasks === o.length) {
      for (var s = true, l = 0; l < o.length; l++) {
        var c = o[l];
        if (c.pendingTasks !== 1 || c.parentFlushed || qt(e, c)) {
          s = false;
          break;
        }
      }
      s && ts(e, t, t.hoistables);
    }
  }
  __name(rs, "rs");
  function xt(e) {
    var t = { pendingTasks: 1, boundaries: null, hoistables: qa(), inheritedHoistables: null, together: false, next: null };
    return e !== null && 0 < e.pendingTasks && (t.pendingTasks++, t.boundaries = [], e.next = t), t;
  }
  __name(xt, "xt");
  function co(e, t, o, s, l) {
    var c = t.keyPath, d = t.treeContext, y = t.row;
    t.keyPath = o, o = s.length;
    var m = null;
    if (t.replay !== null) {
      var b = t.replay.slots;
      if (b !== null && typeof b == "object") for (var k = 0; k < o; k++) {
        var C = l !== "backwards" && l !== "unstable_legacy-backwards" ? k : o - 1 - k, I = s[C];
        t.row = m = xt(m), t.treeContext = h(d, o, C);
        var A = b[C];
        typeof A == "number" ? (Zr(e, t, A, I, C), delete b[C]) : Fe(e, t, I, C), --m.pendingTasks === 0 && et(e, m);
      }
      else for (b = 0; b < o; b++) k = l !== "backwards" && l !== "unstable_legacy-backwards" ? b : o - 1 - b, C = s[k], t.row = m = xt(m), t.treeContext = h(d, o, k), Fe(e, t, C, k), --m.pendingTasks === 0 && et(e, m);
    } else if (l !== "backwards" && l !== "unstable_legacy-backwards") for (l = 0; l < o; l++) b = s[l], t.row = m = xt(m), t.treeContext = h(d, o, l), Fe(e, t, b, l), --m.pendingTasks === 0 && et(e, m);
    else {
      for (l = t.blockedSegment, b = l.children.length, k = l.chunks.length, C = o - 1; 0 <= C; C--) {
        I = s[C], t.row = m = xt(m), t.treeContext = h(d, o, C), A = wt(e, k, null, t.formatContext, C === 0 ? l.lastPushedText : true, true), l.children.splice(b, 0, A), t.blockedSegment = A;
        try {
          Fe(e, t, I, C), A.lastPushedText && A.textEmbedded && A.chunks.push(vt), A.status = 1, Ft(e, t.blockedBoundary, A), --m.pendingTasks === 0 && et(e, m);
        } catch (ue) {
          throw A.status = e.status === 12 ? 3 : 4, ue;
        }
      }
      t.blockedSegment = l, l.lastPushedText = false;
    }
    y !== null && m !== null && 0 < m.pendingTasks && (y.pendingTasks++, m.next = y), t.treeContext = d, t.row = y, t.keyPath = c;
  }
  __name(co, "co");
  function Rn(e, t, o, s, l, c) {
    var d = t.thenableState;
    for (t.thenableState = null, X = {}, ve = t, Pe = e, ae = o, fe = gt = 0, Me = -1, He = 0, Te = d, e = s(l, c); se; ) se = false, fe = gt = 0, Me = -1, He = 0, Kr += 1, ne = null, e = s(l, c);
    return Ct(), e;
  }
  __name(Rn, "Rn");
  function Xr(e, t, o, s, l, c, d) {
    var y = false;
    if (c !== 0 && e.formState !== null) {
      var m = t.blockedSegment;
      if (m !== null) {
        y = true, m = m.chunks;
        for (var b = 0; b < c; b++) b === d ? m.push(xi) : m.push(Ri);
      }
    }
    c = t.keyPath, t.keyPath = o, l ? (o = t.treeContext, t.treeContext = h(o, 1, 0), Fe(e, t, s, -1), t.treeContext = o) : y ? Fe(e, t, s, -1) : lt(e, t, s, -1), t.keyPath = c;
  }
  __name(Xr, "Xr");
  function Qr(e, t, o, s, l, c) {
    if (typeof s == "function") if (s.prototype && s.prototype.isReactComponent) {
      var d = l;
      if ("ref" in l) {
        d = {};
        for (var y in l) y !== "ref" && (d[y] = l[y]);
      }
      var m = s.defaultProps;
      if (m) {
        d === l && (d = _({}, d, l));
        for (var b in m) d[b] === void 0 && (d[b] = m[b]);
      }
      l = d, d = ii, m = s.contextType, typeof m == "object" && m !== null && (d = m._currentValue), d = new s(l, d);
      var k = d.state !== void 0 ? d.state : null;
      if (d.updater = u, d.props = l, d.state = k, m = { queue: [], replace: false }, d._reactInternals = m, c = s.contextType, d.context = typeof c == "object" && c !== null ? c._currentValue : ii, c = s.getDerivedStateFromProps, typeof c == "function" && (c = c(l, k), k = c == null ? k : _({}, k, c), d.state = k), typeof s.getDerivedStateFromProps != "function" && typeof d.getSnapshotBeforeUpdate != "function" && (typeof d.UNSAFE_componentWillMount == "function" || typeof d.componentWillMount == "function")) if (s = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), s !== d.state && u.enqueueReplaceState(d, d.state, null), m.queue !== null && 0 < m.queue.length) if (s = m.queue, c = m.replace, m.queue = null, m.replace = false, c && s.length === 1) d.state = s[0];
      else {
        for (m = c ? s[0] : d.state, k = true, c = c ? 1 : 0; c < s.length; c++) b = s[c], b = typeof b == "function" ? b.call(d, m, l, void 0) : b, b != null && (k ? (k = false, m = _({}, m, b)) : _(m, b));
        d.state = m;
      }
      else m.queue = null;
      if (s = d.render(), e.status === 12) throw null;
      l = t.keyPath, t.keyPath = o, lt(e, t, s, -1), t.keyPath = l;
    } else {
      if (s = Rn(e, t, o, s, l, void 0), e.status === 12) throw null;
      Xr(e, t, o, s, gt !== 0, fe, Me);
    }
    else if (typeof s == "string") if (d = t.blockedSegment, d === null) d = l.children, m = t.formatContext, k = t.keyPath, t.formatContext = Ta(m, s, l), t.keyPath = o, Fe(e, t, d, -1), t.formatContext = m, t.keyPath = k;
    else {
      if (k = Hr(d.chunks, s, l, e.resumableState, e.renderState, t.blockedPreamble, t.hoistableState, t.formatContext, d.lastPushedText), d.lastPushedText = false, m = t.formatContext, c = t.keyPath, t.keyPath = o, (t.formatContext = Ta(m, s, l)).insertionMode === 3) {
        o = wt(e, 0, null, t.formatContext, false, false), d.preambleChildren.push(o), t.blockedSegment = o;
        try {
          o.status = 6, Fe(e, t, k, -1), o.lastPushedText && o.textEmbedded && o.chunks.push(vt), o.status = 1, Ft(e, t.blockedBoundary, o);
        } finally {
          t.blockedSegment = d;
        }
      } else Fe(e, t, k, -1);
      t.formatContext = m, t.keyPath = c;
      e: {
        switch (t = d.chunks, e = e.resumableState, s) {
          case "title":
          case "style":
          case "script":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break e;
          case "body":
            if (1 >= m.insertionMode) {
              e.hasBody = true;
              break e;
            }
            break;
          case "html":
            if (m.insertionMode === 0) {
              e.hasHtml = true;
              break e;
            }
            break;
          case "head":
            if (1 >= m.insertionMode) break e;
        }
        t.push(dr(s));
      }
      d.lastPushedText = false;
    }
    else {
      switch (s) {
        case sn:
        case P:
        case oe:
        case L:
          s = t.keyPath, t.keyPath = o, lt(e, t, l.children, -1), t.keyPath = s;
          return;
        case Fr:
          s = t.blockedSegment, s === null ? l.mode !== "hidden" && (s = t.keyPath, t.keyPath = o, Fe(e, t, l.children, -1), t.keyPath = s) : l.mode !== "hidden" && (s.chunks.push(Ii), s.lastPushedText = false, d = t.keyPath, t.keyPath = o, Fe(e, t, l.children, -1), t.keyPath = d, s.chunks.push(Br), s.lastPushedText = false);
          return;
        case $r:
          e: {
            if (s = l.children, l = l.revealOrder, l === "forwards" || l === "backwards" || l === "unstable_legacy-backwards") {
              if (ir(s)) {
                co(e, t, o, s, l);
                break e;
              }
              if ((d = ye(s)) && (d = d.call(s))) {
                if (m = d.next(), !m.done) {
                  do
                    m = d.next();
                  while (!m.done);
                  co(e, t, o, s, l);
                }
                break e;
              }
            }
            l === "together" ? (l = t.keyPath, d = t.row, m = t.row = xt(null), m.boundaries = [], m.together = true, t.keyPath = o, lt(e, t, s, -1), --m.pendingTasks === 0 && et(e, m), t.keyPath = l, t.row = d, d !== null && 0 < m.pendingTasks && (d.pendingTasks++, m.next = d)) : (l = t.keyPath, t.keyPath = o, lt(e, t, s, -1), t.keyPath = l);
          }
          return;
        case ln:
        case xo:
          throw Error("ReactDOMServer does not yet support scope components.");
        case Ar:
          e: if (t.replay !== null) {
            s = t.keyPath, d = t.formatContext, m = t.row, t.keyPath = o, t.formatContext = Vn(e.resumableState, d), t.row = null, o = l.children;
            try {
              Fe(e, t, o, -1);
            } finally {
              t.keyPath = s, t.formatContext = d, t.row = m;
            }
          } else {
            s = t.keyPath, c = t.formatContext;
            var C = t.row;
            b = t.blockedBoundary, y = t.blockedPreamble;
            var I = t.hoistableState, A = t.blockedSegment, ue = l.fallback;
            l = l.children;
            var Z = /* @__PURE__ */ new Set(), ie = 2 > t.formatContext.insertionMode ? Zt(e, t.row, Z, cn(), cn()) : Zt(e, t.row, Z, null, null);
            e.trackedPostpones !== null && (ie.trackedContentKeyPath = o);
            var Oe = wt(e, A.chunks.length, ie, t.formatContext, false, false);
            A.children.push(Oe), A.lastPushedText = false;
            var Ce = wt(e, 0, null, t.formatContext, false, false);
            if (Ce.parentFlushed = true, e.trackedPostpones !== null) {
              d = t.componentStack, m = [o[0], "Suspense Fallback", o[2]], k = [m[1], m[2], [], null], e.trackedPostpones.workingMap.set(m, k), ie.trackedFallbackNode = k, t.blockedSegment = Oe, t.blockedPreamble = ie.fallbackPreamble, t.keyPath = m, t.formatContext = $o(e.resumableState, c), t.componentStack = aa(d), Oe.status = 6;
              try {
                Fe(e, t, ue, -1), Oe.lastPushedText && Oe.textEmbedded && Oe.chunks.push(vt), Oe.status = 1, Ft(e, b, Oe);
              } catch (St) {
                throw Oe.status = e.status === 12 ? 3 : 4, St;
              } finally {
                t.blockedSegment = A, t.blockedPreamble = y, t.keyPath = s, t.formatContext = c;
              }
              t = xn(e, null, l, -1, ie, Ce, ie.contentPreamble, ie.contentState, t.abortSet, o, Vn(e.resumableState, t.formatContext), t.context, t.treeContext, null, d), Sr(t), e.pingedTasks.push(t);
            } else {
              t.blockedBoundary = ie, t.blockedPreamble = ie.contentPreamble, t.hoistableState = ie.contentState, t.blockedSegment = Ce, t.keyPath = o, t.formatContext = Vn(e.resumableState, c), t.row = null, Ce.status = 6;
              try {
                if (Fe(e, t, l, -1), Ce.lastPushedText && Ce.textEmbedded && Ce.chunks.push(vt), Ce.status = 1, Ft(e, ie, Ce), ho(ie, Ce), ie.pendingTasks === 0 && ie.status === 0) {
                  if (ie.status = 1, !qt(e, ie)) {
                    C !== null && --C.pendingTasks === 0 && et(e, C), e.pendingRootTasks === 0 && t.blockedPreamble && $n(e);
                    break e;
                  }
                } else C !== null && C.together && rs(e, C);
              } catch (St) {
                ie.status = 4, e.status === 12 ? (Ce.status = 3, d = e.fatalError) : (Ce.status = 4, d = St), m = kr(t.componentStack), k = Ze(e, d, m), ie.errorDigest = k, En(e, ie);
              } finally {
                t.blockedBoundary = b, t.blockedPreamble = y, t.hoistableState = I, t.blockedSegment = A, t.keyPath = s, t.formatContext = c, t.row = C;
              }
              t = xn(e, null, ue, -1, b, Oe, ie.fallbackPreamble, ie.fallbackState, Z, [o[0], "Suspense Fallback", o[2]], $o(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, aa(t.componentStack)), Sr(t), e.pingedTasks.push(t);
            }
          }
          return;
      }
      if (typeof s == "object" && s !== null) switch (s.$$typeof) {
        case Pt:
          if ("ref" in l) for (A in d = {}, l) A !== "ref" && (d[A] = l[A]);
          else d = l;
          s = Rn(e, t, o, s.render, d, c), Xr(e, t, o, s, gt !== 0, fe, Me);
          return;
        case an:
          Qr(e, t, o, s.type, l, c);
          return;
        case kt:
          if (m = l.children, d = t.keyPath, l = l.value, k = s._currentValue, s._currentValue = l, c = Mt, Mt = s = { parent: c, depth: c === null ? 0 : c.depth + 1, context: s, parentValue: k, value: l }, t.context = s, t.keyPath = o, lt(e, t, m, -1), e = Mt, e === null) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
          e.context._currentValue = e.parentValue, e = Mt = e.parent, t.context = e, t.keyPath = d;
          return;
        case Je:
          l = l.children, s = l(s._context._currentValue), l = t.keyPath, t.keyPath = o, lt(e, t, s, -1), t.keyPath = l;
          return;
        case _t:
          if (d = s._init, s = d(s._payload), e.status === 12) throw null;
          Qr(e, t, o, s, l, c);
          return;
      }
      throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((s == null ? s : typeof s) + "."));
    }
  }
  __name(Qr, "Qr");
  function Zr(e, t, o, s, l) {
    var c = t.replay, d = t.blockedBoundary, y = wt(e, 0, null, t.formatContext, false, false);
    y.id = o, y.parentFlushed = true;
    try {
      t.replay = null, t.blockedSegment = y, Fe(e, t, s, l), y.status = 1, Ft(e, d, y), d === null ? e.completedRootSegment = y : (ho(d, y), d.parentFlushed && e.partialBoundaries.push(d));
    } finally {
      t.replay = c, t.blockedSegment = null;
    }
  }
  __name(Zr, "Zr");
  function lt(e, t, o, s) {
    t.replay !== null && typeof t.replay.slots == "number" ? Zr(e, t, t.replay.slots, o, s) : (t.node = o, t.childIndex = s, o = t.componentStack, Sr(t), sa(e, t), t.componentStack = o);
  }
  __name(lt, "lt");
  function sa(e, t) {
    var o = t.node, s = t.childIndex;
    if (o !== null) {
      if (typeof o == "object") {
        switch (o.$$typeof) {
          case ge:
            var l = o.type, c = o.key, d = o.props;
            o = d.ref;
            var y = o !== void 0 ? o : null, m = ea(l), b = c ?? (s === -1 ? 0 : s);
            if (c = [t.keyPath, m, b], t.replay !== null) e: {
              var k = t.replay;
              for (s = k.nodes, o = 0; o < s.length; o++) {
                var C = s[o];
                if (b === C[1]) {
                  if (C.length === 4) {
                    if (m !== null && m !== C[0]) throw Error("Expected the resume to render <" + C[0] + "> in this slot but instead it rendered <" + m + ">. The tree doesn't match so React will fallback to client rendering.");
                    var I = C[2];
                    m = C[3], b = t.node, t.replay = { nodes: I, slots: m, pendingTasks: 1 };
                    try {
                      if (Qr(e, t, c, l, d, y), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                      t.replay.pendingTasks--;
                    } catch (U) {
                      if (typeof U == "object" && U !== null && (U === $ || typeof U.then == "function")) throw t.node === b ? t.replay = k : s.splice(o, 1), U;
                      t.replay.pendingTasks--, d = kr(t.componentStack), c = e, e = t.blockedBoundary, l = U, d = Ze(c, l, d), Pn(c, e, I, m, l, d);
                    }
                    t.replay = k;
                  } else {
                    if (l !== Ar) throw Error("Expected the resume to render <Suspense> in this slot but instead it rendered <" + (ea(l) || "Unknown") + ">. The tree doesn't match so React will fallback to client rendering.");
                    t: {
                      k = void 0, l = C[5], y = C[2], m = C[3], b = C[4] === null ? [] : C[4][2], C = C[4] === null ? null : C[4][3];
                      var A = t.keyPath, ue = t.formatContext, Z = t.row, ie = t.replay, Oe = t.blockedBoundary, Ce = t.hoistableState, St = d.children, Ot = d.fallback, Pr = /* @__PURE__ */ new Set();
                      d = 2 > t.formatContext.insertionMode ? Zt(e, t.row, Pr, cn(), cn()) : Zt(e, t.row, Pr, null, null), d.parentFlushed = true, d.rootSegmentID = l, t.blockedBoundary = d, t.hoistableState = d.contentState, t.keyPath = c, t.formatContext = Vn(e.resumableState, ue), t.row = null, t.replay = { nodes: y, slots: m, pendingTasks: 1 };
                      try {
                        if (Fe(e, t, St, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                        if (t.replay.pendingTasks--, d.pendingTasks === 0 && d.status === 0) {
                          d.status = 1, e.completedBoundaries.push(d);
                          break t;
                        }
                      } catch (U) {
                        d.status = 4, I = kr(t.componentStack), k = Ze(e, U, I), d.errorDigest = k, t.replay.pendingTasks--, e.clientRenderedBoundaries.push(d);
                      } finally {
                        t.blockedBoundary = Oe, t.hoistableState = Ce, t.replay = ie, t.keyPath = A, t.formatContext = ue, t.row = Z;
                      }
                      I = Jr(e, null, { nodes: b, slots: C, pendingTasks: 0 }, Ot, -1, Oe, d.fallbackState, Pr, [c[0], "Suspense Fallback", c[2]], $o(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, aa(t.componentStack)), Sr(I), e.pingedTasks.push(I);
                    }
                  }
                  s.splice(o, 1);
                  break e;
                }
              }
            }
            else Qr(e, t, c, l, d, y);
            return;
          case we:
            throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
          case _t:
            if (I = o._init, o = I(o._payload), e.status === 12) throw null;
            lt(e, t, o, s);
            return;
        }
        if (ir(o)) {
          ns(e, t, o, s);
          return;
        }
        if ((I = ye(o)) && (I = I.call(o))) {
          if (o = I.next(), !o.done) {
            d = [];
            do
              d.push(o.value), o = I.next();
            while (!o.done);
            ns(e, t, d, s);
          }
          return;
        }
        if (typeof o.then == "function") return t.thenableState = null, lt(e, t, Xa(o), s);
        if (o.$$typeof === kt) return lt(e, t, o._currentValue, s);
        throw s = Object.prototype.toString.call(o), Error("Objects are not valid as a React child (found: " + (s === "[object Object]" ? "object with keys {" + Object.keys(o).join(", ") + "}" : s) + "). If you meant to render a collection of children, use an array instead.");
      }
      typeof o == "string" ? (s = t.blockedSegment, s !== null && (s.lastPushedText = Fs(s.chunks, o, e.renderState, s.lastPushedText))) : (typeof o == "number" || typeof o == "bigint") && (s = t.blockedSegment, s !== null && (s.lastPushedText = Fs(s.chunks, "" + o, e.renderState, s.lastPushedText)));
    }
  }
  __name(sa, "sa");
  function ns(e, t, o, s) {
    var l = t.keyPath;
    if (s !== -1 && (t.keyPath = [t.keyPath, "Fragment", s], t.replay !== null)) {
      for (var c = t.replay, d = c.nodes, y = 0; y < d.length; y++) {
        var m = d[y];
        if (m[1] === s) {
          s = m[2], m = m[3], t.replay = { nodes: s, slots: m, pendingTasks: 1 };
          try {
            if (ns(e, t, o, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
            t.replay.pendingTasks--;
          } catch (C) {
            if (typeof C == "object" && C !== null && (C === $ || typeof C.then == "function")) throw C;
            t.replay.pendingTasks--, o = kr(t.componentStack);
            var b = t.blockedBoundary, k = C;
            o = Ze(e, k, o), Pn(e, b, s, m, k, o);
          }
          t.replay = c, d.splice(y, 1);
          break;
        }
      }
      t.keyPath = l;
      return;
    }
    if (c = t.treeContext, d = o.length, t.replay !== null && (y = t.replay.slots, y !== null && typeof y == "object")) {
      for (s = 0; s < d; s++) m = o[s], t.treeContext = h(c, d, s), b = y[s], typeof b == "number" ? (Zr(e, t, b, m, s), delete y[s]) : Fe(e, t, m, s);
      t.treeContext = c, t.keyPath = l;
      return;
    }
    for (y = 0; y < d; y++) s = o[y], t.treeContext = h(c, d, y), Fe(e, t, s, y);
    t.treeContext = c, t.keyPath = l;
  }
  __name(ns, "ns");
  function ia(e, t, o) {
    if (o.status = 5, o.rootSegmentID = e.nextSegmentId++, e = o.trackedContentKeyPath, e === null) throw Error("It should not be possible to postpone at the root. This is a bug in React.");
    var s = o.trackedFallbackNode, l = [], c = t.workingMap.get(e);
    return c === void 0 ? (o = [e[1], e[2], l, null, s, o.rootSegmentID], t.workingMap.set(e, o), xr(o, e[0], t), o) : (c[4] = s, c[5] = o.rootSegmentID, c);
  }
  __name(ia, "ia");
  function la(e, t, o, s) {
    s.status = 5;
    var l = o.keyPath, c = o.blockedBoundary;
    if (c === null) s.id = e.nextSegmentId++, t.rootSlots = s.id, e.completedRootSegment !== null && (e.completedRootSegment.status = 5);
    else {
      if (c !== null && c.status === 0) {
        var d = ia(e, t, c);
        if (c.trackedContentKeyPath === l && o.childIndex === -1) {
          s.id === -1 && (s.id = s.parentFlushed ? c.rootSegmentID : e.nextSegmentId++), d[3] = s.id;
          return;
        }
      }
      if (s.id === -1 && (s.id = s.parentFlushed && c !== null ? c.rootSegmentID : e.nextSegmentId++), o.childIndex === -1) l === null ? t.rootSlots = s.id : (o = t.workingMap.get(l), o === void 0 ? (o = [l[1], l[2], [], s.id], xr(o, l[0], t)) : o[3] = s.id);
      else {
        if (l === null) {
          if (e = t.rootSlots, e === null) e = t.rootSlots = {};
          else if (typeof e == "number") throw Error("It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React.");
        } else if (c = t.workingMap, d = c.get(l), d === void 0) e = {}, d = [l[1], l[2], [], e], c.set(l, d), xr(d, l[0], t);
        else if (e = d[3], e === null) e = d[3] = {};
        else if (typeof e == "number") throw Error("It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React.");
        e[o.childIndex] = s.id;
      }
    }
  }
  __name(la, "la");
  function En(e, t) {
    e = e.trackedPostpones, e !== null && (t = t.trackedContentKeyPath, t !== null && (t = e.workingMap.get(t), t !== void 0 && (t.length = 4, t[2] = [], t[3] = null)));
  }
  __name(En, "En");
  function po(e, t, o) {
    return Jr(e, o, t.replay, t.node, t.childIndex, t.blockedBoundary, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
  }
  __name(po, "po");
  function os(e, t, o) {
    var s = t.blockedSegment, l = wt(e, s.chunks.length, null, t.formatContext, s.lastPushedText, true);
    return s.children.push(l), s.lastPushedText = false, xn(e, o, t.node, t.childIndex, t.blockedBoundary, l, t.blockedPreamble, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
  }
  __name(os, "os");
  function Fe(e, t, o, s) {
    var l = t.formatContext, c = t.context, d = t.keyPath, y = t.treeContext, m = t.componentStack, b = t.blockedSegment;
    if (b === null) {
      b = t.replay;
      try {
        return lt(e, t, o, s);
      } catch (I) {
        if (Ct(), o = I === $ ? J() : I, e.status !== 12 && typeof o == "object" && o !== null) {
          if (typeof o.then == "function") {
            s = I === $ ? Qe() : null, e = po(e, t, s).ping, o.then(e, e), t.formatContext = l, t.context = c, t.keyPath = d, t.treeContext = y, t.componentStack = m, t.replay = b, i(c);
            return;
          }
          if (o.message === "Maximum call stack size exceeded") {
            o = I === $ ? Qe() : null, o = po(e, t, o), e.pingedTasks.push(o), t.formatContext = l, t.context = c, t.keyPath = d, t.treeContext = y, t.componentStack = m, t.replay = b, i(c);
            return;
          }
        }
      }
    } else {
      var k = b.children.length, C = b.chunks.length;
      try {
        return lt(e, t, o, s);
      } catch (I) {
        if (Ct(), b.children.length = k, b.chunks.length = C, o = I === $ ? J() : I, e.status !== 12 && typeof o == "object" && o !== null) {
          if (typeof o.then == "function") {
            b = o, o = I === $ ? Qe() : null, e = os(e, t, o).ping, b.then(e, e), t.formatContext = l, t.context = c, t.keyPath = d, t.treeContext = y, t.componentStack = m, i(c);
            return;
          }
          if (o.message === "Maximum call stack size exceeded") {
            b = I === $ ? Qe() : null, b = os(e, t, b), e.pingedTasks.push(b), t.formatContext = l, t.context = c, t.keyPath = d, t.treeContext = y, t.componentStack = m, i(c);
            return;
          }
        }
      }
    }
    throw t.formatContext = l, t.context = c, t.keyPath = d, t.treeContext = y, i(c), o;
  }
  __name(Fe, "Fe");
  function as(e) {
    var t = e.blockedBoundary, o = e.blockedSegment;
    o !== null && (o.status = 3, tr(this, t, e.row, o));
  }
  __name(as, "as");
  function Pn(e, t, o, s, l, c) {
    for (var d = 0; d < o.length; d++) {
      var y = o[d];
      if (y.length === 4) Pn(e, t, y[2], y[3], l, c);
      else {
        y = y[5];
        var m = e, b = c, k = Zt(m, null, /* @__PURE__ */ new Set(), null, null);
        k.parentFlushed = true, k.rootSegmentID = y, k.status = 4, k.errorDigest = b, k.parentFlushed && m.clientRenderedBoundaries.push(k);
      }
    }
    if (o.length = 0, s !== null) {
      if (t === null) throw Error("We should not have any resumable nodes in the shell. This is a bug in React.");
      if (t.status !== 4 && (t.status = 4, t.errorDigest = c, t.parentFlushed && e.clientRenderedBoundaries.push(t)), typeof s == "object") for (var C in s) delete s[C];
    }
  }
  __name(Pn, "Pn");
  function ua(e, t, o) {
    var s = e.blockedBoundary, l = e.blockedSegment;
    if (l !== null) {
      if (l.status === 6) return;
      l.status = 3;
    }
    var c = kr(e.componentStack);
    if (s === null) {
      if (t.status !== 13 && t.status !== 14) {
        if (s = e.replay, s === null) {
          t.trackedPostpones !== null && l !== null ? (s = t.trackedPostpones, Ze(t, o, c), la(t, s, e, l), tr(t, null, e.row, l)) : (Ze(t, o, c), Gr(t, o));
          return;
        }
        s.pendingTasks--, s.pendingTasks === 0 && 0 < s.nodes.length && (l = Ze(t, o, c), Pn(t, null, s.nodes, s.slots, o, l)), t.pendingRootTasks--, t.pendingRootTasks === 0 && _n(t);
      }
    } else {
      var d = t.trackedPostpones;
      if (s.status !== 4) {
        if (d !== null && l !== null) return Ze(t, o, c), la(t, d, e, l), s.fallbackAbortableTasks.forEach(function(y) {
          return ua(y, t, o);
        }), s.fallbackAbortableTasks.clear(), tr(t, s, e.row, l);
        s.status = 4, l = Ze(t, o, c), s.status = 4, s.errorDigest = l, En(t, s), s.parentFlushed && t.clientRenderedBoundaries.push(s);
      }
      s.pendingTasks--, l = s.row, l !== null && --l.pendingTasks === 0 && et(t, l), s.fallbackAbortableTasks.forEach(function(y) {
        return ua(y, t, o);
      }), s.fallbackAbortableTasks.clear();
    }
    e = e.row, e !== null && --e.pendingTasks === 0 && et(t, e), t.allPendingTasks--, t.allPendingTasks === 0 && er(t);
  }
  __name(ua, "ua");
  function ca(e, t) {
    try {
      var o = e.renderState, s = o.onHeaders;
      if (s) {
        var l = o.headers;
        if (l) {
          o.headers = null;
          var c = l.preconnects;
          if (l.fontPreloads && (c && (c += ", "), c += l.fontPreloads), l.highImagePreloads && (c && (c += ", "), c += l.highImagePreloads), !t) {
            var d = o.styles.values(), y = d.next();
            e: for (; 0 < l.remainingCapacity && !y.done; y = d.next()) for (var m = y.value.sheets.values(), b = m.next(); 0 < l.remainingCapacity && !b.done; b = m.next()) {
              var k = b.value, C = k.props, I = C.href, A = k.props, ue = bn(A.href, "style", { crossOrigin: A.crossOrigin, integrity: A.integrity, nonce: A.nonce, type: A.type, fetchPriority: A.fetchPriority, referrerPolicy: A.referrerPolicy, media: A.media });
              if (0 <= (l.remainingCapacity -= ue.length + 2)) o.resets.style[I] = at, c && (c += ", "), c += ue, o.resets.style[I] = typeof C.crossOrigin == "string" || typeof C.integrity == "string" ? [C.crossOrigin, C.integrity] : at;
              else break e;
            }
          }
          s(c ? { Link: c } : {});
        }
      }
    } catch (Z) {
      Ze(e, Z, {});
    }
  }
  __name(ca, "ca");
  function _n(e) {
    e.trackedPostpones === null && ca(e, true), e.trackedPostpones === null && $n(e), e.onShellError = R, e = e.onShellReady, e();
  }
  __name(_n, "_n");
  function er(e) {
    ca(e, e.trackedPostpones === null ? true : e.completedRootSegment === null || e.completedRootSegment.status !== 5), $n(e), e = e.onAllReady, e();
  }
  __name(er, "er");
  function ho(e, t) {
    if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null && t.children[0].id === -1) {
      var o = t.children[0];
      o.id = t.id, o.parentFlushed = true, o.status !== 1 && o.status !== 3 && o.status !== 4 || ho(e, o);
    } else e.completedSegments.push(t);
  }
  __name(ho, "ho");
  function Ft(e, t, o) {
    if (S !== null) {
      o = o.chunks;
      for (var s = 0, l = 0; l < o.length; l++) s += S(o[l]);
      t === null ? e.byteSize += s : t.byteSize += s;
    }
  }
  __name(Ft, "Ft");
  function tr(e, t, o, s) {
    if (o !== null && (--o.pendingTasks === 0 ? et(e, o) : o.together && rs(e, o)), e.allPendingTasks--, t === null) {
      if (s !== null && s.parentFlushed) {
        if (e.completedRootSegment !== null) throw Error("There can only be one root segment. This is a bug in React.");
        e.completedRootSegment = s;
      }
      e.pendingRootTasks--, e.pendingRootTasks === 0 && _n(e);
    } else if (t.pendingTasks--, t.status !== 4) if (t.pendingTasks === 0) {
      if (t.status === 0 && (t.status = 1), s !== null && s.parentFlushed && (s.status === 1 || s.status === 3) && ho(t, s), t.parentFlushed && e.completedBoundaries.push(t), t.status === 1) o = t.row, o !== null && Ur(o.hoistables, t.contentState), qt(e, t) || (t.fallbackAbortableTasks.forEach(as, e), t.fallbackAbortableTasks.clear(), o !== null && --o.pendingTasks === 0 && et(e, o)), e.pendingRootTasks === 0 && e.trackedPostpones === null && t.contentPreamble !== null && $n(e);
      else if (t.status === 5 && (t = t.row, t !== null)) {
        if (e.trackedPostpones !== null) {
          o = e.trackedPostpones;
          var l = t.next;
          if (l !== null && (s = l.boundaries, s !== null)) for (l.boundaries = null, l = 0; l < s.length; l++) {
            var c = s[l];
            ia(e, o, c), tr(e, c, null, null);
          }
        }
        --t.pendingTasks === 0 && et(e, t);
      }
    } else s === null || !s.parentFlushed || s.status !== 1 && s.status !== 3 || (ho(t, s), t.completedSegments.length === 1 && t.parentFlushed && e.partialBoundaries.push(t)), t = t.row, t !== null && t.together && rs(e, t);
    e.allPendingTasks === 0 && er(e);
  }
  __name(tr, "tr");
  function en(e) {
    if (e.status !== 14 && e.status !== 13) {
      var t = Mt, o = jr.H;
      jr.H = Qa;
      var s = jr.A;
      jr.A = io;
      var l = wn;
      wn = e;
      var c = so;
      so = e.resumableState;
      try {
        var d = e.pingedTasks, y;
        for (y = 0; y < d.length; y++) {
          var m = d[y], b = e, k = m.blockedSegment;
          if (k === null) {
            var C = b;
            if (m.replay.pendingTasks !== 0) {
              i(m.context);
              try {
                if (typeof m.replay.slots == "number" ? Zr(C, m, m.replay.slots, m.node, m.childIndex) : sa(C, m), m.replay.pendingTasks === 1 && 0 < m.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                m.replay.pendingTasks--, m.abortSet.delete(m), tr(C, m.blockedBoundary, m.row, null);
              } catch (Ye) {
                Ct();
                var I = Ye === $ ? J() : Ye;
                if (typeof I == "object" && I !== null && typeof I.then == "function") {
                  var A = m.ping;
                  I.then(A, A), m.thenableState = Ye === $ ? Qe() : null;
                } else {
                  m.replay.pendingTasks--, m.abortSet.delete(m);
                  var ue = kr(m.componentStack);
                  b = void 0;
                  var Z = C, ie = m.blockedBoundary, Oe = C.status === 12 ? C.fatalError : I, Ce = m.replay.nodes, St = m.replay.slots;
                  b = Ze(Z, Oe, ue), Pn(Z, ie, Ce, St, Oe, b), C.pendingRootTasks--, C.pendingRootTasks === 0 && _n(C), C.allPendingTasks--, C.allPendingTasks === 0 && er(C);
                }
              }
            }
          } else if (C = void 0, Z = k, Z.status === 0) {
            Z.status = 6, i(m.context);
            var Ot = Z.children.length, Pr = Z.chunks.length;
            try {
              sa(b, m), Z.lastPushedText && Z.textEmbedded && Z.chunks.push(vt), m.abortSet.delete(m), Z.status = 1, Ft(b, m.blockedBoundary, Z), tr(b, m.blockedBoundary, m.row, Z);
            } catch (Ye) {
              Ct(), Z.children.length = Ot, Z.chunks.length = Pr;
              var U = Ye === $ ? J() : b.status === 12 ? b.fatalError : Ye;
              if (b.status === 12 && b.trackedPostpones !== null) {
                var rr = b.trackedPostpones, zt = kr(m.componentStack);
                m.abortSet.delete(m), Ze(b, U, zt), la(b, rr, m, Z), tr(b, m.blockedBoundary, m.row, Z);
              } else if (typeof U == "object" && U !== null && typeof U.then == "function") {
                Z.status = 0, m.thenableState = Ye === $ ? Qe() : null;
                var Rt = m.ping;
                U.then(Rt, Rt);
              } else {
                var nr = kr(m.componentStack);
                m.abortSet.delete(m), Z.status = 4;
                var Ae = m.blockedBoundary, _r = m.row;
                if (_r !== null && --_r.pendingTasks === 0 && et(b, _r), b.allPendingTasks--, C = Ze(b, U, nr), Ae === null) Gr(b, U);
                else if (Ae.pendingTasks--, Ae.status !== 4) {
                  Ae.status = 4, Ae.errorDigest = C, En(b, Ae);
                  var Kt = Ae.row;
                  Kt !== null && --Kt.pendingTasks === 0 && et(b, Kt), Ae.parentFlushed && b.clientRenderedBoundaries.push(Ae), b.pendingRootTasks === 0 && b.trackedPostpones === null && Ae.contentPreamble !== null && $n(b);
                }
                b.allPendingTasks === 0 && er(b);
              }
            }
          }
        }
        d.splice(0, y), e.destination !== null && Tr(e, e.destination);
      } catch (Ye) {
        Ze(e, Ye, {}), Gr(e, Ye);
      } finally {
        so = c, jr.H = o, jr.A = s, o === Qa && i(t), wn = l;
      }
    }
  }
  __name(en, "en");
  function In(e, t, o) {
    t.preambleChildren.length && o.push(t.preambleChildren);
    for (var s = false, l = 0; l < t.children.length; l++) s = An(e, t.children[l], o) || s;
    return s;
  }
  __name(In, "In");
  function An(e, t, o) {
    var s = t.boundary;
    if (s === null) return In(e, t, o);
    var l = s.contentPreamble, c = s.fallbackPreamble;
    if (l === null || c === null) return false;
    switch (s.status) {
      case 1:
        if (Pa(e.renderState, l), e.byteSize += s.byteSize, t = s.completedSegments[0], !t) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
        return In(e, t, o);
      case 5:
        if (e.trackedPostpones !== null) return true;
      case 4:
        if (t.status === 1) return Pa(e.renderState, c), In(e, t, o);
      default:
        return true;
    }
  }
  __name(An, "An");
  function $n(e) {
    if (e.completedRootSegment && e.completedPreambleSegments === null) {
      var t = [], o = e.byteSize, s = An(e, e.completedRootSegment, t), l = e.renderState.preamble;
      s === false || l.headChunks && l.bodyChunks ? e.completedPreambleSegments = t : e.byteSize = o;
    }
  }
  __name($n, "$n");
  function Ut(e, t, o, s) {
    switch (o.parentFlushed = true, o.status) {
      case 0:
        o.id = e.nextSegmentId++;
      case 5:
        return s = o.id, o.lastPushedText = false, o.textEmbedded = false, e = e.renderState, x(t, hr), x(t, e.placeholderPrefix), e = s.toString(16), x(t, e), le(t, Ws);
      case 1:
        o.status = 2;
        var l = true, c = o.chunks, d = 0;
        o = o.children;
        for (var y = 0; y < o.length; y++) {
          for (l = o[y]; d < l.index; d++) x(t, c[d]);
          l = On(e, t, l, s);
        }
        for (; d < c.length - 1; d++) x(t, c[d]);
        return d < c.length && (l = le(t, c[d])), l;
      case 3:
        return true;
      default:
        throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
    }
  }
  __name(Ut, "Ut");
  var Fn = 0;
  function On(e, t, o, s) {
    var l = o.boundary;
    if (l === null) return Ut(e, t, o, s);
    if (l.parentFlushed = true, l.status === 4) {
      var c = l.row;
      c !== null && --c.pendingTasks === 0 && et(e, c), l = l.errorDigest, le(t, Fi), x(t, ft), l && (x(t, Do), x(t, Y(l)), x(t, Oi)), le(t, Mo), Ut(e, t, o, s);
    } else if (l.status !== 1) l.status === 0 && (l.rootSegmentID = e.nextSegmentId++), 0 < l.completedSegments.length && e.partialBoundaries.push(l), Us(t, e.renderState, l.rootSegmentID), s && Ur(s, l.fallbackState), Ut(e, t, o, s);
    else if (!Nn && qt(e, l) && (Fn + l.byteSize > e.progressiveChunkSize || Ka(l.contentState))) l.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(l), Us(t, e.renderState, l.rootSegmentID), Ut(e, t, o, s);
    else {
      if (Fn += l.byteSize, s && Ur(s, l.contentState), o = l.row, o !== null && qt(e, l) && --o.pendingTasks === 0 && et(e, o), le(t, jo), o = l.completedSegments, o.length !== 1) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
      On(e, t, o[0], s);
    }
    return le(t, tt);
  }
  __name(On, "On");
  function vr(e, t, o, s) {
    return Ks(t, e.renderState, o.parentFormatContext, o.id), On(e, t, o, s), Ys(t, o.parentFormatContext);
  }
  __name(vr, "vr");
  function ss(e, t, o) {
    Fn = o.byteSize;
    for (var s = o.completedSegments, l = 0; l < s.length; l++) mo(e, t, o, s[l]);
    s.length = 0, s = o.row, s !== null && qt(e, o) && --s.pendingTasks === 0 && et(e, s), ze(t, o.contentState, e.renderState), s = e.resumableState, e = e.renderState, l = o.rootSegmentID, o = o.contentState;
    var c = e.stylesToHoist;
    return e.stylesToHoist = false, x(t, e.startInlineScript), x(t, Re), c ? ((s.instructions & 4) === 0 && (s.instructions |= 4, x(t, ei)), (s.instructions & 2) === 0 && (s.instructions |= 2, x(t, Gs)), (s.instructions & 8) === 0 ? (s.instructions |= 8, x(t, Qs)) : x(t, Li)) : ((s.instructions & 2) === 0 && (s.instructions |= 2, x(t, Gs)), x(t, Xs)), s = l.toString(16), x(t, e.boundaryPrefix), x(t, s), x(t, Zs), x(t, e.segmentPrefix), x(t, s), c ? (x(t, Vo), si(t, o)) : x(t, Hi), o = le(t, Oa), _a(t, e) && o;
  }
  __name(ss, "ss");
  function mo(e, t, o, s) {
    if (s.status === 2) return true;
    var l = o.contentState, c = s.id;
    if (c === -1) {
      if ((s.id = o.rootSegmentID) === -1) throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
      return vr(e, t, s, l);
    }
    return c === o.rootSegmentID ? vr(e, t, s, l) : (vr(e, t, s, l), o = e.resumableState, e = e.renderState, x(t, e.startInlineScript), x(t, Re), (o.instructions & 1) === 0 ? (o.instructions |= 1, x(t, Js)) : x(t, ji), x(t, e.segmentPrefix), c = c.toString(16), x(t, c), x(t, Di), x(t, e.placeholderPrefix), x(t, c), t = le(t, Mi), t);
  }
  __name(mo, "mo");
  var Nn = false;
  function Tr(e, t) {
    be = new Uint8Array(2048), de = 0, Nt = true;
    try {
      if (!(0 < e.pendingRootTasks)) {
        var o, s = e.completedRootSegment;
        if (s !== null) {
          if (s.status === 5) return;
          var l = e.completedPreambleSegments;
          if (l === null) return;
          Fn = e.byteSize;
          var c = e.resumableState, d = e.renderState, y = d.preamble, m = y.htmlChunks, b = y.headChunks, k;
          if (m) {
            for (k = 0; k < m.length; k++) x(t, m[k]);
            if (b) for (k = 0; k < b.length; k++) x(t, b[k]);
            else x(t, Ie("head")), x(t, Re);
          } else if (b) for (k = 0; k < b.length; k++) x(t, b[k]);
          var C = d.charsetChunks;
          for (k = 0; k < C.length; k++) x(t, C[k]);
          C.length = 0, d.preconnects.forEach(rt, t), d.preconnects.clear();
          var I = d.viewportChunks;
          for (k = 0; k < I.length; k++) x(t, I[k]);
          I.length = 0, d.fontPreloads.forEach(rt, t), d.fontPreloads.clear(), d.highImagePreloads.forEach(rt, t), d.highImagePreloads.clear(), Dr = d, d.styles.forEach(zo, t), Dr = null;
          var A = d.importMapChunks;
          for (k = 0; k < A.length; k++) x(t, A[k]);
          A.length = 0, d.bootstrapScripts.forEach(rt, t), d.scripts.forEach(rt, t), d.scripts.clear(), d.bulkPreloads.forEach(rt, t), d.bulkPreloads.clear(), m || b || (c.instructions |= 32);
          var ue = d.hoistableChunks;
          for (k = 0; k < ue.length; k++) x(t, ue[k]);
          for (c = ue.length = 0; c < l.length; c++) {
            var Z = l[c];
            for (d = 0; d < Z.length; d++) On(e, t, Z[d], null);
          }
          var ie = e.renderState.preamble, Oe = ie.headChunks;
          (ie.htmlChunks || Oe) && x(t, dr("head"));
          var Ce = ie.bodyChunks;
          if (Ce) for (l = 0; l < Ce.length; l++) x(t, Ce[l]);
          On(e, t, s, null), e.completedRootSegment = null;
          var St = e.renderState;
          if (e.allPendingTasks !== 0 || e.clientRenderedBoundaries.length !== 0 || e.completedBoundaries.length !== 0 || e.trackedPostpones !== null && (e.trackedPostpones.rootNodes.length !== 0 || e.trackedPostpones.rootSlots !== null)) {
            var Ot = e.resumableState;
            if ((Ot.instructions & 64) === 0) {
              if (Ot.instructions |= 64, x(t, St.startInlineScript), (Ot.instructions & 32) === 0) {
                Ot.instructions |= 32;
                var Pr = "_" + Ot.idPrefix + "R_";
                x(t, Yo), x(t, Y(Pr)), x(t, xe);
              }
              x(t, Re), x(t, Vs), le(t, qn);
            }
          }
          _a(t, St);
        }
        var U = e.renderState;
        s = 0;
        var rr = U.viewportChunks;
        for (s = 0; s < rr.length; s++) x(t, rr[s]);
        rr.length = 0, U.preconnects.forEach(rt, t), U.preconnects.clear(), U.fontPreloads.forEach(rt, t), U.fontPreloads.clear(), U.highImagePreloads.forEach(rt, t), U.highImagePreloads.clear(), U.styles.forEach(Tt, t), U.scripts.forEach(rt, t), U.scripts.clear(), U.bulkPreloads.forEach(rt, t), U.bulkPreloads.clear();
        var zt = U.hoistableChunks;
        for (s = 0; s < zt.length; s++) x(t, zt[s]);
        zt.length = 0;
        var Rt = e.clientRenderedBoundaries;
        for (o = 0; o < Rt.length; o++) {
          var nr = Rt[o];
          U = t;
          var Ae = e.resumableState, _r = e.renderState, Kt = nr.rootSegmentID, Ye = nr.errorDigest;
          x(U, _r.startInlineScript), x(U, Re), (Ae.instructions & 4) === 0 ? (Ae.instructions |= 4, x(U, mn)) : x(U, Na), x(U, _r.boundaryPrefix), x(U, Kt.toString(16)), x(U, Wo), Ye && (x(U, ti), x(U, qi(Ye || "")));
          var Et = le(U, fn);
          if (!Et) {
            e.destination = null, o++, Rt.splice(0, o);
            return;
          }
        }
        Rt.splice(0, o);
        var fo = e.completedBoundaries;
        for (o = 0; o < fo.length; o++) if (!ss(e, t, fo[o])) {
          e.destination = null, o++, fo.splice(0, o);
          return;
        }
        fo.splice(0, o), Bn(t), be = new Uint8Array(2048), de = 0, Nn = Nt = true;
        var go = e.partialBoundaries;
        for (o = 0; o < go.length; o++) {
          var rn = go[o];
          e: {
            Rt = e, nr = t, Fn = rn.byteSize;
            var yo = rn.completedSegments;
            for (Et = 0; Et < yo.length; Et++) if (!mo(Rt, nr, rn, yo[Et])) {
              Et++, yo.splice(0, Et);
              var ls = false;
              break e;
            }
            yo.splice(0, Et);
            var Ir = rn.row;
            Ir !== null && Ir.together && rn.pendingTasks === 1 && (Ir.pendingTasks === 1 ? ts(Rt, Ir, Ir.hoistables) : Ir.pendingTasks--), ls = ze(nr, rn.contentState, Rt.renderState);
          }
          if (!ls) {
            e.destination = null, o++, go.splice(0, o);
            return;
          }
        }
        go.splice(0, o), Nn = false;
        var Dn = e.completedBoundaries;
        for (o = 0; o < Dn.length; o++) if (!ss(e, t, Dn[o])) {
          e.destination = null, o++, Dn.splice(0, o);
          return;
        }
        Dn.splice(0, o);
      }
    } finally {
      Nn = false, e.allPendingTasks === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 ? (e.flushScheduled = false, o = e.resumableState, o.hasBody && x(t, dr("body")), o.hasHtml && x(t, dr("html")), Bn(t), Nr(t), e.status = 14, t.end(), e.destination = null) : (Bn(t), Nr(t));
    }
  }
  __name(Tr, "Tr");
  function Cr(e) {
    e.flushScheduled = e.destination !== null, Hn(function() {
      return kn.run(e, en, e);
    }), setImmediate(function() {
      e.status === 10 && (e.status = 11), e.trackedPostpones === null && kn.run(e, Wi, e);
    });
  }
  __name(Cr, "Cr");
  function Wi(e) {
    ca(e, e.pendingRootTasks === 0);
  }
  __name(Wi, "Wi");
  function wr(e) {
    e.flushScheduled === false && e.pingedTasks.length === 0 && e.destination !== null && (e.flushScheduled = true, setImmediate(function() {
      var t = e.destination;
      t ? Tr(e, t) : e.flushScheduled = false;
    }));
  }
  __name(wr, "wr");
  function bt(e, t) {
    if (e.status === 13) e.status = 14, t.destroy(e.fatalError);
    else if (e.status !== 14 && e.destination === null) {
      e.destination = t;
      try {
        Tr(e, t);
      } catch (o) {
        Ze(e, o, {}), Gr(e, o);
      }
    }
  }
  __name(bt, "bt");
  function _e(e, t) {
    (e.status === 11 || e.status === 10) && (e.status = 12);
    try {
      var o = e.abortableTasks;
      if (0 < o.size) {
        var s = t === void 0 ? Error("The render was aborted by the server without a reason.") : typeof t == "object" && t !== null && typeof t.then == "function" ? Error("The render was aborted by the server with a promise.") : t;
        e.fatalError = s, o.forEach(function(l) {
          return ua(l, e, s);
        }), o.clear();
      }
      e.destination !== null && Tr(e, e.destination);
    } catch (l) {
      Ze(e, l, {}), Gr(e, l);
    }
  }
  __name(_e, "_e");
  function xr(e, t, o) {
    if (t === null) o.rootNodes.push(e);
    else {
      var s = o.workingMap, l = s.get(t);
      l === void 0 && (l = [t[1], t[2], [], null], s.set(t, l), xr(l, t[0], o)), l[2].push(e);
    }
  }
  __name(xr, "xr");
  function tn(e) {
    var t = e.trackedPostpones;
    if (t === null || t.rootNodes.length === 0 && t.rootSlots === null) return e.trackedPostpones = null;
    if (e.completedRootSegment === null || e.completedRootSegment.status !== 5 && e.completedPreambleSegments !== null) {
      var o = e.nextSegmentId, s = t.rootSlots, l = e.resumableState;
      l.bootstrapScriptContent = void 0, l.bootstrapScripts = void 0, l.bootstrapModules = void 0;
    } else {
      o = 0, s = -1, l = e.resumableState;
      var c = e.renderState;
      l.nextFormID = 0, l.hasBody = false, l.hasHtml = false, l.unknownResources = { font: c.resets.font }, l.dnsResources = c.resets.dns, l.connectResources = c.resets.connect, l.imageResources = c.resets.image, l.styleResources = c.resets.style, l.scriptResources = {}, l.moduleUnknownResources = {}, l.moduleScriptResources = {}, l.instructions = 0;
    }
    return { nextSegmentId: o, rootFormatContext: e.rootFormatContext, progressiveChunkSize: e.progressiveChunkSize, resumableState: e.resumableState, replayNodes: t.rootNodes, replaySlots: s };
  }
  __name(tn, "tn");
  function Rr() {
    var e = O.version;
    if (e !== "19.2.4") throw Error(`Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      ` + (e + `
  - react-dom:  19.2.4
Learn more: https://react.dev/warnings/version-mismatch`));
  }
  __name(Rr, "Rr");
  Rr();
  function ui(e, t) {
    return function() {
      return bt(t, e);
    };
  }
  __name(ui, "ui");
  function Be(e, t) {
    return function() {
      e.destination = null, _e(e, Error(t));
    };
  }
  __name(Be, "Be");
  function Ke(e, t) {
    var o = Io(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0);
    return Vt(e, o, It(o, t ? t.nonce : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, t ? t.onHeaders : void 0, t ? t.maxHeadersLength : void 0), Ao(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, t ? t.onAllReady : void 0, t ? t.onShellReady : void 0, t ? t.onShellError : void 0, void 0, t ? t.onPostpone : void 0, t ? t.formState : void 0);
  }
  __name(Ke, "Ke");
  function is(e) {
    return { write: /* @__PURE__ */ __name(function(t) {
      return typeof t == "string" && (t = lr.encode(t)), e.enqueue(t), true;
    }, "write"), end: /* @__PURE__ */ __name(function() {
      e.close();
    }, "end"), destroy: /* @__PURE__ */ __name(function(t) {
      typeof e.error == "function" ? e.error(t) : e.close();
    }, "destroy") };
  }
  __name(is, "is");
  function jn(e, t, o) {
    return uo(e, t, It(t.resumableState, o ? o.nonce : void 0, void 0, void 0, void 0, void 0), o ? o.onError : void 0, o ? o.onAllReady : void 0, o ? o.onShellReady : void 0, o ? o.onShellError : void 0, void 0, o ? o.onPostpone : void 0);
  }
  __name(jn, "jn");
  Rr();
  function pa(e) {
    return { write: /* @__PURE__ */ __name(function(t) {
      return typeof t == "string" && (t = lr.encode(t)), e.enqueue(t), true;
    }, "write"), end: /* @__PURE__ */ __name(function() {
      e.close();
    }, "end"), destroy: /* @__PURE__ */ __name(function(t) {
      typeof e.error == "function" ? e.error(t) : e.close();
    }, "destroy") };
  }
  __name(pa, "pa");
  function Er(e) {
    return { write: /* @__PURE__ */ __name(function(t) {
      return e.push(t);
    }, "write"), end: /* @__PURE__ */ __name(function() {
      e.push(null);
    }, "end"), destroy: /* @__PURE__ */ __name(function(t) {
      e.destroy(t);
    }, "destroy") };
  }
  __name(Er, "Er");
  return sr.prerender = function(e, t) {
    return new Promise(function(o, s) {
      var l = t ? t.onHeaders : void 0, c;
      l && (c = /* @__PURE__ */ __name(function(k) {
        l(new Headers(k));
      }, "c"));
      var d = Io(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), y = oa(e, d, It(d, void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, c, t ? t.maxHeadersLength : void 0), Ao(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, function() {
        var k, C = new ReadableStream({ type: "bytes", start: /* @__PURE__ */ __name(function(I) {
          k = pa(I);
        }, "start"), pull: /* @__PURE__ */ __name(function() {
          bt(y, k);
        }, "pull"), cancel: /* @__PURE__ */ __name(function(I) {
          y.destination = null, _e(y, I);
        }, "cancel") }, { highWaterMark: 0 });
        C = { postponed: tn(y), prelude: C }, o(C);
      }, void 0, void 0, s, t ? t.onPostpone : void 0);
      if (t && t.signal) {
        var m = t.signal;
        if (m.aborted) _e(y, m.reason);
        else {
          var b = /* @__PURE__ */ __name(function() {
            _e(y, m.reason), m.removeEventListener("abort", b);
          }, "b");
          m.addEventListener("abort", b);
        }
      }
      Cr(y);
    });
  }, sr.prerenderToNodeStream = function(e, t) {
    return new Promise(function(o, s) {
      var l = Io(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), c = oa(e, l, It(l, void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, t ? t.onHeaders : void 0, t ? t.maxHeadersLength : void 0), Ao(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, function() {
        var m = new B.Readable({ read: /* @__PURE__ */ __name(function() {
          bt(c, b);
        }, "read") }), b = Er(m);
        m = { postponed: tn(c), prelude: m }, o(m);
      }, void 0, void 0, s, t ? t.onPostpone : void 0);
      if (t && t.signal) {
        var d = t.signal;
        if (d.aborted) _e(c, d.reason);
        else {
          var y = /* @__PURE__ */ __name(function() {
            _e(c, d.reason), d.removeEventListener("abort", y);
          }, "y");
          d.addEventListener("abort", y);
        }
      }
      Cr(c);
    });
  }, sr.renderToPipeableStream = function(e, t) {
    var o = Ke(e, t), s = false;
    return Cr(o), { pipe: /* @__PURE__ */ __name(function(l) {
      if (s) throw Error("React currently only supports piping to one writable stream.");
      return s = true, ca(o, o.trackedPostpones === null || o.completedRootSegment === null ? o.pendingRootTasks === 0 : o.completedRootSegment.status !== 5), bt(o, l), l.on("drain", ui(l, o)), l.on("error", Be(o, "The destination stream errored while writing data.")), l.on("close", Be(o, "The destination stream closed early.")), l;
    }, "pipe"), abort: /* @__PURE__ */ __name(function(l) {
      _e(o, l);
    }, "abort") };
  }, sr.renderToReadableStream = function(e, t) {
    return new Promise(function(o, s) {
      var l, c, d = new Promise(function(A, ue) {
        c = A, l = ue;
      }), y = t ? t.onHeaders : void 0, m;
      y && (m = /* @__PURE__ */ __name(function(A) {
        y(new Headers(A));
      }, "m"));
      var b = Io(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), k = Vt(e, b, It(b, t ? t.nonce : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, m, t ? t.maxHeadersLength : void 0), Ao(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, c, function() {
        var A, ue = new ReadableStream({ type: "bytes", start: /* @__PURE__ */ __name(function(Z) {
          A = is(Z);
        }, "start"), pull: /* @__PURE__ */ __name(function() {
          bt(k, A);
        }, "pull"), cancel: /* @__PURE__ */ __name(function(Z) {
          k.destination = null, _e(k, Z);
        }, "cancel") }, { highWaterMark: 0 });
        ue.allReady = d, o(ue);
      }, function(A) {
        d.catch(function() {
        }), s(A);
      }, l, t ? t.onPostpone : void 0, t ? t.formState : void 0);
      if (t && t.signal) {
        var C = t.signal;
        if (C.aborted) _e(k, C.reason);
        else {
          var I = /* @__PURE__ */ __name(function() {
            _e(k, C.reason), C.removeEventListener("abort", I);
          }, "I");
          C.addEventListener("abort", I);
        }
      }
      Cr(k);
    });
  }, sr.resume = function(e, t, o) {
    return new Promise(function(s, l) {
      var c, d, y = new Promise(function(C, I) {
        d = C, c = I;
      }), m = uo(e, t, It(t.resumableState, o ? o.nonce : void 0, void 0, void 0, void 0, void 0), o ? o.onError : void 0, d, function() {
        var C, I = new ReadableStream({ type: "bytes", start: /* @__PURE__ */ __name(function(A) {
          C = is(A);
        }, "start"), pull: /* @__PURE__ */ __name(function() {
          bt(m, C);
        }, "pull"), cancel: /* @__PURE__ */ __name(function(A) {
          m.destination = null, _e(m, A);
        }, "cancel") }, { highWaterMark: 0 });
        I.allReady = y, s(I);
      }, function(C) {
        y.catch(function() {
        }), l(C);
      }, c, o ? o.onPostpone : void 0);
      if (o && o.signal) {
        var b = o.signal;
        if (b.aborted) _e(m, b.reason);
        else {
          var k = /* @__PURE__ */ __name(function() {
            _e(m, b.reason), b.removeEventListener("abort", k);
          }, "k");
          b.addEventListener("abort", k);
        }
      }
      Cr(m);
    });
  }, sr.resumeAndPrerender = function(e, t, o) {
    return new Promise(function(s, l) {
      var c = br(e, t, It(t.resumableState, void 0, void 0, void 0, void 0, void 0), o ? o.onError : void 0, function() {
        var m, b = new ReadableStream({ type: "bytes", start: /* @__PURE__ */ __name(function(k) {
          m = pa(k);
        }, "start"), pull: /* @__PURE__ */ __name(function() {
          bt(c, m);
        }, "pull"), cancel: /* @__PURE__ */ __name(function(k) {
          c.destination = null, _e(c, k);
        }, "cancel") }, { highWaterMark: 0 });
        b = { postponed: tn(c), prelude: b }, s(b);
      }, void 0, void 0, l, o ? o.onPostpone : void 0);
      if (o && o.signal) {
        var d = o.signal;
        if (d.aborted) _e(c, d.reason);
        else {
          var y = /* @__PURE__ */ __name(function() {
            _e(c, d.reason), d.removeEventListener("abort", y);
          }, "y");
          d.addEventListener("abort", y);
        }
      }
      Cr(c);
    });
  }, sr.resumeAndPrerenderToNodeStream = function(e, t, o) {
    return new Promise(function(s, l) {
      var c = br(e, t, It(t.resumableState, void 0, void 0, void 0, void 0, void 0), o ? o.onError : void 0, function() {
        var m = new B.Readable({ read: /* @__PURE__ */ __name(function() {
          bt(c, b);
        }, "read") }), b = Er(m);
        m = { postponed: tn(c), prelude: m }, s(m);
      }, void 0, void 0, l, o ? o.onPostpone : void 0);
      if (o && o.signal) {
        var d = o.signal;
        if (d.aborted) _e(c, d.reason);
        else {
          var y = /* @__PURE__ */ __name(function() {
            _e(c, d.reason), d.removeEventListener("abort", y);
          }, "y");
          d.addEventListener("abort", y);
        }
      }
      Cr(c);
    });
  }, sr.resumeToPipeableStream = function(e, t, o) {
    var s = jn(e, t, o), l = false;
    return Cr(s), { pipe: /* @__PURE__ */ __name(function(c) {
      if (l) throw Error("React currently only supports piping to one writable stream.");
      return l = true, bt(s, c), c.on("drain", ui(c, s)), c.on("error", Be(s, "The destination stream errored while writing data.")), c.on("close", Be(s, "The destination stream closed early.")), c;
    }, "pipe"), abort: /* @__PURE__ */ __name(function(c) {
      _e(s, c);
    }, "abort") };
  }, sr.version = "19.2.4", sr;
}
__name(Ru, "Ru");
var Ql;
function Eu() {
  if (Ql) return on2;
  Ql = 1;
  var N, q;
  return N = xu(), q = Ru(), on2.version = N.version, on2.renderToString = N.renderToString, on2.renderToStaticMarkup = N.renderToStaticMarkup, on2.renderToPipeableStream = q.renderToPipeableStream, on2.renderToReadableStream = q.renderToReadableStream, on2.resumeToPipeableStream = q.resumeToPipeableStream, on2.resume = q.resume, on2;
}
__name(Eu, "Eu");
var Pu = Eu();
var je = vi();
var _u = /* @__PURE__ */ new Set(["initial", "animate", "exit", "transition", "variants", "whileHover", "whileTap", "whileFocus", "whileDrag", "whileInView", "drag", "dragConstraints", "dragElastic", "dragMomentum", "onDragStart", "onDrag", "onDragEnd", "layout", "layoutId", "onAnimationStart", "onAnimationComplete"]);
function Iu(N) {
  let q = {};
  for (let j in N) _u.has(j) || (q[j] = N[j]);
  return q;
}
__name(Iu, "Iu");
var Au = { get(N, q) {
  return je.forwardRef((j, O) => je.createElement(q, { ...Iu(j), ref: O }));
} };
var Ne = new Proxy({}, Au);
function cl({ children: N }) {
  return N;
}
__name(cl, "cl");
var ru = je.createContext(false);
function $u({ children: N, isSSR: q = false }) {
  return f.jsx(ru.Provider, { value: q, children: N });
}
__name($u, "$u");
function wo() {
  return je.useContext(ru);
}
__name(wo, "wo");
var Zl = [{ label: "About", href: "#about" }, { label: "Skills", href: "#skills" }, { label: "Projects", href: "#projects" }, { label: "Experience", href: "#experience" }, { label: "Contact", href: "#contact" }];
function Fu() {
  let N = wo(), [q, j] = je.useState(false), [O, Q] = je.useState(false);
  return je.useEffect(() => {
    let B = /* @__PURE__ */ __name(() => j(window.scrollY > 20), "B");
    return window.addEventListener("scroll", B), () => window.removeEventListener("scroll", B);
  }, []), f.jsxs(Ne.nav, { initial: N ? false : { y: -80 }, animate: { y: 0 }, transition: { duration: 0.6, ease: "easeOut" }, className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${q ? "glass-strong shadow-lg shadow-black/30" : "bg-transparent"}`, children: [f.jsxs("div", { className: "container-main flex items-center justify-between h-16 md:h-18", children: [f.jsxs("a", { href: "#home", className: "font-heading text-xl font-bold text-white", children: ["Joshwa", f.jsx("span", { className: "gradient-text", children: "." })] }), f.jsxs("div", { className: "hidden md:flex items-center gap-8", children: [Zl.map((B) => f.jsx("a", { href: B.href, className: "relative text-sm text-slate-400 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-orange-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full", children: B.label }, B.href)), f.jsx("a", { href: "#contact", className: "text-sm font-medium text-white px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25", children: "Hire Me" })] }), f.jsx("button", { onClick: /* @__PURE__ */ __name(() => Q(!O), "onClick"), className: "md:hidden p-2 cursor-pointer", "aria-label": "Menu", children: f.jsxs("div", { className: "space-y-1.5", children: [f.jsx("span", { className: `block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${O ? "rotate-45 translate-y-2" : ""}` }), f.jsx("span", { className: `block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${O ? "opacity-0" : ""}` }), f.jsx("span", { className: `block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${O ? "-rotate-45 -translate-y-2" : ""}` })] }) })] }), f.jsx(cl, { children: O && f.jsx(Ne.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "md:hidden overflow-hidden glass-strong", children: f.jsxs("div", { className: "container-main flex flex-col gap-1 py-4", children: [Zl.map((B) => f.jsx("a", { href: B.href, onClick: /* @__PURE__ */ __name(() => Q(false), "onClick"), className: "text-sm text-slate-400 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/[0.04] transition-all", children: B.label }, B.href)), f.jsx("a", { href: "#contact", onClick: /* @__PURE__ */ __name(() => Q(false), "onClick"), className: "text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-2.5 rounded-lg text-center mt-2", children: "Hire Me" })] }) }) })] });
}
__name(Fu, "Fu");
var eu = ["React.js", "JavaScript", "API Integration", "AI & NLQ", "UI/UX Design"];
var Ou = [{ label: "React", svg: f.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-8 h-8", children: [f.jsx("circle", { cx: "12", cy: "12", r: "2.5" }), f.jsx("ellipse", { cx: "12", cy: "12", rx: "10", ry: "4" }), f.jsx("ellipse", { cx: "12", cy: "12", rx: "10", ry: "4", transform: "rotate(60 12 12)" }), f.jsx("ellipse", { cx: "12", cy: "12", rx: "10", ry: "4", transform: "rotate(120 12 12)" })] }), style: { top: "15%", right: "10%" }, duration: 6, delay: 0 }, { label: "JS", svg: f.jsx("span", { className: "font-mono font-bold text-lg", children: "JS" }), style: { top: "55%", right: "5%" }, duration: 7, delay: 1 }, { label: "API", svg: f.jsx("span", { className: "font-mono font-bold text-base", children: "{ }" }), style: { top: "35%", right: "18%" }, duration: 5, delay: 0.5 }, { label: "AI", svg: f.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-8 h-8", children: [f.jsx("path", { d: "M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" }), f.jsx("path", { d: "M8 14s-4 2-4 6h16c0-4-4-6-4-6" }), f.jsx("circle", { cx: "9", cy: "7", r: "0.5", fill: "currentColor" }), f.jsx("circle", { cx: "15", cy: "7", r: "0.5", fill: "currentColor" })] }), style: { top: "70%", right: "15%" }, duration: 8, delay: 1.5 }];
function Nu() {
  let N = wo(), [q, j] = je.useState(null), [O, Q] = je.useState(""), [B, ge] = je.useState(0), [we, L] = je.useState(false);
  return je.useEffect(() => {
    fetch("http://localhost:3001/api/views", { method: "POST" }).then((P) => P.json()).then((P) => j(P.views)).catch(() => {
    });
  }, []), je.useEffect(() => {
    let P = eu[B], oe = setTimeout(() => {
      we ? (Q(P.substring(0, O.length - 1)), O === "" && (L(false), ge((Je) => (Je + 1) % eu.length))) : (Q(P.substring(0, O.length + 1)), O === P && setTimeout(() => L(true), 2e3));
    }, we ? 40 : 80);
    return () => clearTimeout(oe);
  }, [O, we, B]), f.jsxs("section", { id: "home", className: "relative min-h-screen flex items-center overflow-hidden", children: [f.jsx("div", { className: "hidden lg:block", children: Ou.map((P) => f.jsx(Ne.div, { className: "absolute text-orange-400/20", style: P.style, animate: { y: [0, -20, 0], rotate: [0, 5, -5, 0] }, transition: { duration: P.duration, repeat: 1 / 0, ease: "easeInOut", delay: P.delay }, children: f.jsx("div", { className: "glass rounded-2xl p-4 hover:text-orange-400/40 transition-colors", children: P.svg }) }, P.label)) }), f.jsx("div", { className: "container-main", children: f.jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16", children: [f.jsxs("div", { className: "max-w-3xl flex-1", children: [f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "flex items-center gap-3 mb-8", children: [f.jsxs("div", { className: "flex items-center gap-2 glass rounded-full px-4 py-2", children: [f.jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [f.jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" }), f.jsx("span", { className: "relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" })] }), f.jsx("span", { className: "text-sm text-slate-400", children: "Available for work" })] }), f.jsx(cl, { children: q !== null && f.jsxs(Ne.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, className: "flex items-center gap-1.5 glass rounded-full px-3 py-2", children: [f.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-3.5 h-3.5 text-orange-400", children: [f.jsx("path", { d: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" }), f.jsx("path", { fillRule: "evenodd", d: "M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z", clipRule: "evenodd" })] }), f.jsx("span", { className: "text-xs text-slate-500", children: q })] }) })] }), f.jsxs(Ne.h1, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 }, className: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4", children: ["Hi, I'm", " ", f.jsx("span", { className: "gradient-text", children: "Joshwa" })] }), f.jsx(Ne.p, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.2 }, className: "text-xl md:text-2xl text-slate-400 mb-2", children: "Full Stack Developer | React Specialist" }), f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.3 }, className: "mb-10", children: [f.jsx("span", { className: "font-mono text-lg text-orange-400/80", children: O }), f.jsx("span", { className: "typing-cursor" })] }), f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.4 }, className: "flex flex-wrap gap-4", children: [f.jsx("a", { href: "#projects", className: "px-8 py-3.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/25 hover:scale-105", children: "View Projects" }), f.jsx("a", { href: "#contact", className: "px-8 py-3.5 text-sm font-medium text-slate-300 rounded-xl glass hover:bg-white/[0.06] hover:text-white hover:border-orange-500/30 transition-all duration-300 hover:scale-105", children: "Contact Me" })] })] }), f.jsx(Ne.div, { initial: N ? false : { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, delay: 0.3 }, className: "hidden lg:flex flex-shrink-0", children: f.jsxs("div", { className: "relative", children: [f.jsx("div", { className: "absolute -inset-3 rounded-full bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-500/20 blur-xl" }), f.jsx("div", { className: "absolute -inset-1 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 opacity-60" }), f.jsx("div", { className: "relative w-80 h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-2 border-white/10", children: f.jsx("img", { src: "/profile.jpg", alt: "Joshwa", className: "w-full h-full object-cover", style: { objectPosition: "60% 15%" } }) })] }) })] }) })] });
}
__name(Nu, "Nu");
var ju = [{ title: "MCA Graduate", desc: "Strong foundation in computer applications & software engineering.", icon: f.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-6 h-6", children: f.jsx("path", { d: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) }, { title: "React Developer", desc: "Building modern web apps with component-driven architecture.", icon: f.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-6 h-6", children: [f.jsx("circle", { cx: "12", cy: "12", r: "2.5" }), f.jsx("ellipse", { cx: "12", cy: "12", rx: "10", ry: "4" }), f.jsx("ellipse", { cx: "12", cy: "12", rx: "10", ry: "4", transform: "rotate(60 12 12)" }), f.jsx("ellipse", { cx: "12", cy: "12", rx: "10", ry: "4", transform: "rotate(120 12 12)" })] }) }, { title: "Connector Dev", desc: "Integrating third-party APIs like Hrone & Max Healthcare.", icon: f.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-6 h-6", children: f.jsx("path", { d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244", strokeLinecap: "round", strokeLinejoin: "round" }) }) }, { title: "CRM Experience", desc: "Built Manage User & Manage Plant modules with RBAC.", icon: f.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-6 h-6", children: f.jsx("path", { d: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21", strokeLinecap: "round", strokeLinejoin: "round" }) }) }];
function Du() {
  let N = wo(), q = je.useRef(null);
  return f.jsx("section", { id: "about", className: "py-24 md:py-32", children: f.jsxs("div", { className: "container-main", ref: q, children: [f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "mb-14", children: [f.jsx("p", { className: "text-sm font-medium text-orange-400 mb-3 tracking-wider uppercase", children: "About" }), f.jsx("h2", { className: "font-heading text-3xl md:text-4xl font-bold text-white mb-2", children: "A bit about me" }), f.jsx("div", { className: "section-line mb-6" }), f.jsx("p", { className: "text-slate-400 leading-relaxed max-w-2xl text-lg", children: "I'm a passionate Full Stack Developer with hands-on experience building modern web applications using React.js and Node.js. I specialize in creating intuitive interfaces, building RESTful APIs, and developing scalable CRM modules and third-party connectors." })] }), f.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: ju.map((j, O) => f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: O * 0.1 }, className: "glass rounded-2xl p-6 glow-card cursor-default group", children: [f.jsx("div", { className: "w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all", children: j.icon }), f.jsx("h3", { className: "font-semibold text-white mb-2 text-lg", children: j.title }), f.jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: j.desc })] }, j.title)) })] }) });
}
__name(Du, "Du");
var Mu = [{ title: "Frontend", color: "orange", skills: ["React.js", "JavaScript (ES6+)", "HTML5 & CSS3", "Swiper.js", "Tailwind CSS"] }, { title: "Forms & State", color: "pink", skills: ["React Hook Form", "State Management", "Form Validation", "Dynamic Forms"] }, { title: "API Integration", color: "purple", skills: ["RESTful APIs", "Axios / Fetch", "Third-Party Connectors", "Data Mapping"] }, { title: "UI/UX", color: "orange", skills: ["Responsive Design", "Mobile-First", "CSS Animations", "Modern Layouts"] }, { title: "NLQ & AI", color: "pink", skills: ["NLQ Integration", "AI Loader", "Smart Search", "Intelligent UI"] }];
var Lu = { orange: { bg: "bg-orange-500/10", text: "text-orange-400", badge: "bg-orange-500/10 text-orange-300" }, pink: { bg: "bg-pink-500/10", text: "text-pink-400", badge: "bg-pink-500/10 text-pink-300" }, purple: { bg: "bg-purple-500/10", text: "text-purple-400", badge: "bg-purple-500/10 text-purple-300" } };
function Hu({ children: N, className: q }) {
  let [j, O] = je.useState(""), Q = /* @__PURE__ */ __name((ge) => {
    let we = ge.currentTarget.getBoundingClientRect(), L = (ge.clientX - we.left) / we.width - 0.5, P = (ge.clientY - we.top) / we.height - 0.5;
    O(`perspective(600px) rotateY(${L * 8}deg) rotateX(${-P * 8}deg)`);
  }, "Q"), B = /* @__PURE__ */ __name(() => O(""), "B");
  return f.jsx("div", { className: q, onMouseMove: Q, onMouseLeave: B, style: { transform: j, transition: "transform 0.3s ease-out" }, children: N });
}
__name(Hu, "Hu");
function Bu() {
  let N = wo(), q = je.useRef(null);
  return f.jsx("section", { id: "skills", className: "py-24 md:py-32", children: f.jsxs("div", { className: "container-main", ref: q, children: [f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "mb-14", children: [f.jsx("p", { className: "text-sm font-medium text-orange-400 mb-3 tracking-wider uppercase", children: "Skills" }), f.jsx("h2", { className: "font-heading text-3xl md:text-4xl font-bold text-white mb-2", children: "What I work with" }), f.jsx("div", { className: "section-line" })] }), f.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: Mu.map((j, O) => {
    let Q = Lu[j.color];
    return f.jsx(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: O * 0.08 }, children: f.jsxs(Hu, { className: "glass rounded-2xl p-6 glow-card h-full cursor-default", children: [f.jsx("div", { className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${Q.bg} mb-4`, children: f.jsx("span", { className: `text-sm font-semibold ${Q.text}`, children: j.title }) }), f.jsx("div", { className: "flex flex-wrap gap-2", children: j.skills.map((B) => f.jsx("span", { className: `text-sm px-3 py-1.5 rounded-lg ${Q.badge} transition-all duration-300 hover:scale-105`, children: B }, B)) })] }) }, j.title);
  }) })] }) });
}
__name(Bu, "Bu");
var qu = [{ title: "Product Management System", description: "Dashboard with CRUD operations, filtering, pagination, and real-time data updates.", tech: ["React", "REST API", "React Hook Form"], gradient: "from-orange-600/20 to-pink-600/20", accent: "orange" }, { title: "CRM \u2014 Manage User & Plant", description: "CRM modules with role-based access, dynamic forms, and data management.", tech: ["React", "CRM", "RBAC"], gradient: "from-pink-600/20 to-purple-600/20", accent: "pink" }, { title: "Connector Integrations", description: "Third-party integrations for Hrone and Max Healthcare with automated data sync.", tech: ["API", "Hrone", "Max Healthcare"], gradient: "from-purple-600/20 to-orange-600/20", accent: "purple" }, { title: "NLQ AI Loader", description: "Natural Language Query integration with AI-powered search and data retrieval.", tech: ["NLQ", "AI", "React"], gradient: "from-orange-600/20 to-red-600/20", accent: "orange" }];
var Vu = { orange: { badge: "bg-orange-500/15 text-orange-300", line: "bg-gradient-to-r from-orange-500 to-pink-500" }, pink: { badge: "bg-pink-500/15 text-pink-300", line: "bg-gradient-to-r from-pink-500 to-purple-500" }, purple: { badge: "bg-purple-500/15 text-purple-300", line: "bg-gradient-to-r from-purple-500 to-orange-500" } };
function Wu() {
  let N = wo(), q = je.useRef(null);
  return f.jsx("section", { id: "projects", className: "py-24 md:py-32", children: f.jsxs("div", { className: "container-main", ref: q, children: [f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "mb-14", children: [f.jsx("p", { className: "text-sm font-medium text-orange-400 mb-3 tracking-wider uppercase", children: "Projects" }), f.jsx("h2", { className: "font-heading text-3xl md:text-4xl font-bold text-white mb-2", children: "What I've built" }), f.jsx("div", { className: "section-line" })] }), f.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: qu.map((j, O) => {
    let Q = Vu[j.accent];
    return f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: O * 0.1 }, className: "glass rounded-2xl overflow-hidden glow-card group", children: [f.jsxs("div", { className: `h-40 bg-gradient-to-br ${j.gradient} relative overflow-hidden`, children: [f.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" }), f.jsx("div", { className: "absolute inset-0 opacity-[0.03]", style: { backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" } })] }), f.jsxs("div", { className: "p-6", children: [f.jsx("div", { className: `w-12 h-0.5 ${Q.line} rounded mb-4 opacity-60` }), f.jsx("h3", { className: "font-heading font-semibold text-lg text-white mb-2 group-hover:text-orange-300 transition-colors", children: j.title }), f.jsx("p", { className: "text-sm text-slate-400 leading-relaxed mb-5", children: j.description }), f.jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: j.tech.map((B) => f.jsx("span", { className: `text-xs font-medium px-2.5 py-1 rounded-lg ${Q.badge}`, children: B }, B)) }), f.jsxs("div", { className: "flex gap-3", children: [f.jsxs("a", { href: "#", className: "flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.06] hover:border-orange-500/20 transition-all cursor-pointer", children: [f.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-4 h-4", children: f.jsx("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" }) }), "GitHub"] }), f.jsxs("a", { href: "#", className: "flex items-center gap-2 text-sm font-medium text-slate-300 px-4 py-2 rounded-lg hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer", children: [f.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-4 h-4", children: [f.jsx("path", { fillRule: "evenodd", d: "M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.47-.53a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06Z", clipRule: "evenodd" }), f.jsx("path", { fillRule: "evenodd", d: "M13 3.75A.75.75 0 0 1 13.75 3h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V4.5h-3.75A.75.75 0 0 1 13 3.75Z", clipRule: "evenodd" })] }), "Live Demo"] })] })] })] }, j.title);
  }) })] }) });
}
__name(Wu, "Wu");
var Uu = [{ year: "2024", title: "NLQ & AI Integration", desc: "Integrated NLQ with AI-powered loader for intelligent data retrieval in enterprise apps." }, { year: "2024", title: "Connector Development", desc: "Built Hrone & Max Healthcare connector integrations for seamless data synchronization." }, { year: "2023-24", title: "CRM Module Development", desc: "Developed Manage User & Manage Plant modules with RBAC and dynamic forms." }, { year: "2023", title: "Learning & MCA", desc: "Completed MCA and gained hands-on experience with React, APIs, and frontend development." }];
function zu() {
  let N = wo(), q = je.useRef(null);
  return f.jsx("section", { id: "experience", className: "py-24 md:py-32", children: f.jsxs("div", { className: "container-main", ref: q, children: [f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "mb-14", children: [f.jsx("p", { className: "text-sm font-medium text-orange-400 mb-3 tracking-wider uppercase", children: "Experience" }), f.jsx("h2", { className: "font-heading text-3xl md:text-4xl font-bold text-white mb-2", children: "My journey" }), f.jsx("div", { className: "section-line" })] }), f.jsxs("div", { className: "max-w-2xl relative", children: [f.jsx("div", { className: "absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-orange-500/40 via-pink-500/40 to-purple-500/40 rounded-full" }), Uu.map((j, O) => f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: O * 0.12 }, className: "relative pl-10 pb-10 last:pb-0 group", children: [f.jsx("div", { className: "absolute left-0 top-1.5", children: f.jsx("div", { className: "w-4 h-4 rounded-full bg-black border-2 border-orange-500/50 group-hover:border-orange-400 transition-colors relative", children: f.jsx("div", { className: "absolute inset-0 rounded-full bg-orange-500/20 animate-ping", style: { animationDuration: "3s" } }) }) }), f.jsxs("div", { className: "glass rounded-xl p-5 glow-card", children: [f.jsx("span", { className: "inline-block text-xs font-mono font-medium text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md mb-3", children: j.year }), f.jsx("h3", { className: "font-semibold text-white mb-1.5 text-lg", children: j.title }), f.jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: j.desc })] })] }, O))] })] }) });
}
__name(zu, "zu");
function Ku() {
  let N = wo(), q = je.useRef(null), [j, O] = je.useState(false), Q = /* @__PURE__ */ __name((B) => {
    B.preventDefault(), O(true), setTimeout(() => O(false), 3e3);
  }, "Q");
  return f.jsx("section", { id: "contact", className: "py-24 md:py-32", children: f.jsxs("div", { className: "container-main", ref: q, children: [f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "mb-14", children: [f.jsx("p", { className: "text-sm font-medium text-orange-400 mb-3 tracking-wider uppercase", children: "Contact" }), f.jsx("h2", { className: "font-heading text-3xl md:text-4xl font-bold text-white mb-2", children: "Get in touch" }), f.jsx("div", { className: "section-line mb-4" }), f.jsx("p", { className: "text-slate-400 max-w-md text-lg", children: "Have a project in mind? Let's work together." })] }), f.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl", children: [f.jsxs(Ne.form, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1 }, onSubmit: Q, className: "space-y-4", children: [f.jsx("input", { type: "text", required: true, placeholder: "Name", className: "w-full px-5 py-3.5 rounded-xl glass text-white placeholder-slate-500 outline-none input-glow" }), f.jsx("input", { type: "email", required: true, placeholder: "Email", className: "w-full px-5 py-3.5 rounded-xl glass text-white placeholder-slate-500 outline-none input-glow" }), f.jsx("textarea", { required: true, rows: 4, placeholder: "Message", className: "w-full px-5 py-3.5 rounded-xl glass text-white placeholder-slate-500 outline-none input-glow resize-none" }), f.jsx(Ne.button, { type: "submit", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: `w-full py-3.5 text-sm font-medium text-white rounded-xl cursor-pointer transition-all duration-500 ${j ? "bg-green-600 shadow-lg shadow-green-500/25" : "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 hover:shadow-lg hover:shadow-orange-500/25"}`, children: j ? "Sent!" : "Send Message" })] }), f.jsxs(Ne.div, { initial: N ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2 }, className: "space-y-8", children: [f.jsx("div", { className: "glass rounded-xl p-5 glow-card", children: f.jsxs("div", { className: "flex items-center gap-3", children: [f.jsx("div", { className: "w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400", children: f.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-5 h-5", children: [f.jsx("path", { d: "M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" }), f.jsx("path", { d: "m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" })] }) }), f.jsxs("div", { children: [f.jsx("h3", { className: "font-semibold text-white text-sm", children: "Email" }), f.jsx("p", { className: "text-sm text-slate-400", children: "joshwa@example.com" })] })] }) }), f.jsx("div", { className: "glass rounded-xl p-5 glow-card", children: f.jsxs("div", { className: "flex items-center gap-3", children: [f.jsx("div", { className: "w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400", children: f.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-5 h-5", children: f.jsx("path", { fillRule: "evenodd", d: "m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z", clipRule: "evenodd" }) }) }), f.jsxs("div", { children: [f.jsx("h3", { className: "font-semibold text-white text-sm", children: "Location" }), f.jsx("p", { className: "text-sm text-slate-400", children: "India" })] })] }) }), f.jsxs("div", { children: [f.jsx("h3", { className: "font-semibold text-white mb-4 text-sm tracking-wider uppercase", children: "Socials" }), f.jsx("div", { className: "flex gap-3", children: [{ label: "LinkedIn", href: "#", icon: f.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: f.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" }) }) }, { label: "GitHub", href: "#", icon: f.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: f.jsx("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" }) }) }, { label: "Email", href: "mailto:joshwa@example.com", icon: f.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-5 h-5", children: [f.jsx("path", { d: "M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" }), f.jsx("path", { d: "m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" })] }) }].map((B) => f.jsx("a", { href: B.href, "aria-label": B.label, className: "w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-orange-400 hover:bg-white/[0.06] hover:border-orange-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/10", children: B.icon }, B.label)) })] })] })] }), f.jsx("div", { className: "mt-24 pt-8 border-t border-white/[0.06] text-center", children: f.jsxs("p", { className: "text-sm text-slate-500", children: ["Designed & built by ", f.jsx("span", { className: "text-slate-400", children: "Joshwa" }), " \u2014 ", (/* @__PURE__ */ new Date()).getFullYear()] }) })] }) });
}
__name(Ku, "Ku");
function Yu() {
  let [N, q] = je.useState({ x: 0, y: 0 }), [j, O] = je.useState(false);
  return je.useEffect(() => {
    let Q = /* @__PURE__ */ __name((ge) => q({ x: ge.clientX, y: ge.clientY }), "Q"), B = /* @__PURE__ */ __name(() => O(window.scrollY > 500), "B");
    return window.addEventListener("mousemove", Q), window.addEventListener("scroll", B), () => {
      window.removeEventListener("mousemove", Q), window.removeEventListener("scroll", B);
    };
  }, []), f.jsxs(f.Fragment, { children: [f.jsx("div", { className: "gradient-bg" }), f.jsx("div", { className: "fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0 hidden md:block", style: { left: N.x - 200, top: N.y - 200, background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, rgba(236,72,153,0.03) 40%, transparent 70%)" } }), f.jsx(Fu, {}), f.jsxs("main", { className: "relative z-10", children: [f.jsx(Nu, {}), f.jsx(Du, {}), f.jsx(Bu, {}), f.jsx(Wu, {}), f.jsx(zu, {}), f.jsx(Ku, {})] }), f.jsx(cl, { children: j && f.jsx(Ne.button, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, onClick: /* @__PURE__ */ __name(() => window.scrollTo({ top: 0, behavior: "smooth" }), "onClick"), className: "fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center cursor-pointer hover:border-orange-500/30 transition-all group", children: f.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-5 h-5 text-slate-400 group-hover:text-orange-400 transition-colors", children: f.jsx("path", { fillRule: "evenodd", d: "M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z", clipRule: "evenodd" }) }) }) })] });
}
__name(Yu, "Yu");
function nu() {
  return Pu.renderToString(f.jsx($u, { isSSR: true, children: f.jsx(Yu, {}) }));
}
__name(nu, "nu");
var pt = { title: "Joshwa | Full Stack Developer", description: "Full Stack Developer specializing in React.js, JavaScript, API integration, and AI-powered applications. Building modern web experiences with clean code and intuitive design.", url: "https://joshwa.in", image: "https://joshwa.in/profile.jpg", author: "Joshwa", keywords: "Joshwa, Full Stack Developer, React Developer, JavaScript, API Integration, AI, NLQ, Web Developer, Frontend Developer, Portfolio", github: "https://github.com/Joshwa1722", linkedin: "https://www.linkedin.com/in/joshwa-m" };
function ou() {
  return `
    <meta name="description" content="${pt.description}" />
    <meta name="keywords" content="${pt.keywords}" />
    <meta name="author" content="${pt.author}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${pt.url}/" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${pt.url}/" />
    <meta property="og:title" content="${pt.title}" />
    <meta property="og:description" content="${pt.description}" />
    <meta property="og:image" content="${pt.image}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${pt.url}/" />
    <meta name="twitter:title" content="${pt.title}" />
    <meta name="twitter:description" content="${pt.description}" />
    <meta name="twitter:image" content="${pt.image}" />

    <!-- JSON-LD -->
    <script type="application/ld+json">
    ${JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Joshwa", url: pt.url, image: pt.image, jobTitle: "Full Stack Developer", knowsAbout: ["React.js", "JavaScript", "API Integration", "AI & NLQ", "CRM Development", "Web Development"], sameAs: [pt.github, pt.linkedin] })}
    <\/script>
  `;
}
__name(ou, "ou");
var Ju = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Joshwa | Full Stack Developer</title>
    <!--seo-head-->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    <script type="module" crossorigin src="/assets/index-CV5nCZUu.js"><\/script>
    <link rel="stylesheet" crossorigin href="/assets/index-3lDkoHXr.css">
  </head>
  <body>
    <div id="root"><!--ssr-outlet--></div>
  </body>
</html>
`;
var Gu = /googlebot|bingbot|yandexbot|duckduckbot|slurp|baiduspider|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|applebot|pinterestbot|redditbot|embedly|quora|showyoubot|outbrain|rogerbot|ia_archiver/i;
function Xu(N) {
  return Gu.test(N || "");
}
__name(Xu, "Xu");
var sc = { async fetch(N, q) {
  let j = new URL(N.url);
  if (j.pathname !== "/" && j.pathname !== "/index.html") return q.ASSETS.fetch(N);
  try {
    let O = Ju, Q = ou();
    O = O.replace("<!--seo-head-->", Q);
    let B = N.headers.get("user-agent") || "";
    if (Xu(B)) try {
      let ge = nu();
      O = O.replace("<!--ssr-outlet-->", ge);
    } catch (ge) {
      console.error("SSR render failed:", ge);
    }
    return new Response(O, { headers: { "content-type": "text/html;charset=UTF-8" } });
  } catch (O) {
    return console.error("Worker error:", O), q.ASSETS.fetch(N);
  }
} };

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-ssL9Xp/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = sc;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-ssL9Xp/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
