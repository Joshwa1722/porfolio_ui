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
import Eu from "util";
import Pu from "crypto";
import _u from "async_hooks";
import Iu from "stream";
var ml = { exports: {} };
var $s = {};
var Jl;
function Au() {
  if (Jl) return $s;
  Jl = 1;
  var O = /* @__PURE__ */ Symbol.for("react.transitional.element"), M = /* @__PURE__ */ Symbol.for("react.fragment");
  function N(F, V, D) {
    var xe = null;
    if (D !== void 0 && (xe = "" + D), V.key !== void 0 && (xe = "" + V.key), "key" in V) {
      D = {};
      for (var qe in V) qe !== "key" && (D[qe] = V[qe]);
    } else D = V;
    return V = D.ref, { $$typeof: O, type: F, key: xe, ref: V !== void 0 ? V : null, props: D };
  }
  __name(N, "N");
  return $s.Fragment = M, $s.jsx = N, $s.jsxs = N, $s;
}
__name(Au, "Au");
var fl = { exports: {} };
var K = {};
var Xl;
function $u() {
  if (Xl) return K;
  Xl = 1;
  var O = /* @__PURE__ */ Symbol.for("react.transitional.element"), M = /* @__PURE__ */ Symbol.for("react.portal"), N = /* @__PURE__ */ Symbol.for("react.fragment"), F = /* @__PURE__ */ Symbol.for("react.strict_mode"), V = /* @__PURE__ */ Symbol.for("react.profiler"), D = /* @__PURE__ */ Symbol.for("react.consumer"), xe = /* @__PURE__ */ Symbol.for("react.context"), qe = /* @__PURE__ */ Symbol.for("react.forward_ref"), q = /* @__PURE__ */ Symbol.for("react.suspense"), _ = /* @__PURE__ */ Symbol.for("react.memo"), ue = /* @__PURE__ */ Symbol.for("react.lazy"), at = /* @__PURE__ */ Symbol.for("react.activity"), Tt = Symbol.iterator;
  function At(S) {
    return S === null || typeof S != "object" ? null : (S = Tt && S[Tt] || S["@@iterator"], typeof S == "function" ? S : null);
  }
  __name(At, "At");
  var Nr = { isMounted: /* @__PURE__ */ __name(function() {
    return false;
  }, "isMounted"), enqueueForceUpdate: /* @__PURE__ */ __name(function() {
  }, "enqueueForceUpdate"), enqueueReplaceState: /* @__PURE__ */ __name(function() {
  }, "enqueueReplaceState"), enqueueSetState: /* @__PURE__ */ __name(function() {
  }, "enqueueSetState") }, jr = Object.assign, cn = {};
  function $t(S, P, j) {
    this.props = S, this.context = P, this.refs = cn, this.updater = j || Nr;
  }
  __name($t, "$t");
  $t.prototype.isReactComponent = {}, $t.prototype.setState = function(S, P) {
    if (typeof S != "object" && typeof S != "function" && S != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, S, P, "setState");
  }, $t.prototype.forceUpdate = function(S) {
    this.updater.enqueueForceUpdate(this, S, "forceUpdate");
  };
  function Io() {
  }
  __name(Io, "Io");
  Io.prototype = $t.prototype;
  function Dr(S, P, j) {
    this.props = S, this.context = P, this.refs = cn, this.updater = j || Nr;
  }
  __name(Dr, "Dr");
  var pn = Dr.prototype = new Io();
  pn.constructor = Dr, jr(pn, $t.prototype), pn.isPureReactComponent = true;
  var Mr = Array.isArray;
  function dn() {
  }
  __name(dn, "dn");
  var Y = { H: null, A: null, T: null, S: null }, ge = Object.prototype.hasOwnProperty;
  function cr(S, P, j) {
    var L = j.ref;
    return { $$typeof: O, type: S, key: P, ref: L !== void 0 ? L : null, props: j };
  }
  __name(cr, "cr");
  function Un(S, P) {
    return cr(S.type, P, S.props);
  }
  __name(Un, "Un");
  function Lr(S) {
    return typeof S == "object" && S !== null && S.$$typeof === O;
  }
  __name(Lr, "Lr");
  function ye(S) {
    var P = { "=": "=0", ":": "=2" };
    return "$" + S.replace(/[=:]/g, function(j) {
      return P[j];
    });
  }
  __name(ye, "ye");
  var de = /\/+/g;
  function Mt(S, P) {
    return typeof S == "object" && S !== null && S.key != null ? ye("" + S.key) : P.toString(36);
  }
  __name(Mt, "Mt");
  function w(S) {
    switch (S.status) {
      case "fulfilled":
        return S.value;
      case "rejected":
        throw S.reason;
      default:
        switch (typeof S.status == "string" ? S.then(dn, dn) : (S.status = "pending", S.then(function(P) {
          S.status === "pending" && (S.status = "fulfilled", S.value = P);
        }, function(P) {
          S.status === "pending" && (S.status = "rejected", S.reason = P);
        })), S.status) {
          case "fulfilled":
            return S.value;
          case "rejected":
            throw S.reason;
        }
    }
    throw S;
  }
  __name(w, "w");
  function H(S, P, j, L, W) {
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
          case O:
          case M:
            pe = true;
            break;
          case ue:
            return pe = S._init, H(pe(S._payload), P, j, L, W);
        }
    }
    if (pe) return W = W(S), pe = L === "" ? "." + Mt(S, 0) : L, Mr(W) ? (j = "", pe != null && (j = pe.replace(de, "$&/") + "/"), H(W, P, j, "", function(Le) {
      return Le;
    })) : W != null && (Lr(W) && (W = Un(W, j + (W.key == null || S && S.key === W.key ? "" : ("" + W.key).replace(de, "$&/") + "/") + pe)), P.push(W)), 1;
    pe = 0;
    var mt = L === "" ? "." : L + ":";
    if (Mr(S)) for (var Je = 0; Je < S.length; Je++) L = S[Je], ee = mt + Mt(L, Je), pe += H(L, P, j, ee, W);
    else if (Je = At(S), typeof Je == "function") for (S = Je.call(S), Je = 0; !(L = S.next()).done; ) L = L.value, ee = mt + Mt(L, Je++), pe += H(L, P, j, ee, W);
    else if (ee === "object") {
      if (typeof S.then == "function") return H(w(S), P, j, L, W);
      throw P = String(S), Error("Objects are not valid as a React child (found: " + (P === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : P) + "). If you meant to render a collection of children, use an array instead.");
    }
    return pe;
  }
  __name(H, "H");
  function ie(S, P, j) {
    if (S == null) return S;
    var L = [], W = 0;
    return H(S, L, "", "", function(ee) {
      return P.call(j, ee, W++);
    }), L;
  }
  __name(ie, "ie");
  function zn(S) {
    if (S._status === -1) {
      var P = S._result;
      P = P(), P.then(function(j) {
        (S._status === 0 || S._status === -1) && (S._status = 1, S._result = j);
      }, function(j) {
        (S._status === 0 || S._status === -1) && (S._status = 2, S._result = j);
      }), S._status === -1 && (S._status = 0, S._result = P);
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  __name(zn, "zn");
  var pr = typeof reportError == "function" ? reportError : function(S) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var P = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof S == "object" && S !== null && typeof S.message == "string" ? String(S.message) : String(S), error: S });
      if (!window.dispatchEvent(P)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", S);
      return;
    }
    console.error(S);
  }, x = { map: ie, forEach: /* @__PURE__ */ __name(function(S, P, j) {
    ie(S, function() {
      P.apply(this, arguments);
    }, j);
  }, "forEach"), count: /* @__PURE__ */ __name(function(S) {
    var P = 0;
    return ie(S, function() {
      P++;
    }), P;
  }, "count"), toArray: /* @__PURE__ */ __name(function(S) {
    return ie(S, function(P) {
      return P;
    }) || [];
  }, "toArray"), only: /* @__PURE__ */ __name(function(S) {
    if (!Lr(S)) throw Error("React.Children.only expected to receive a single React element child.");
    return S;
  }, "only") };
  return K.Activity = at, K.Children = x, K.Component = $t, K.Fragment = N, K.Profiler = V, K.PureComponent = Dr, K.StrictMode = F, K.Suspense = q, K.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y, K.__COMPILER_RUNTIME = { __proto__: null, c: /* @__PURE__ */ __name(function(S) {
    return Y.H.useMemoCache(S);
  }, "c") }, K.cache = function(S) {
    return function() {
      return S.apply(null, arguments);
    };
  }, K.cacheSignal = function() {
    return null;
  }, K.cloneElement = function(S, P, j) {
    if (S == null) throw Error("The argument must be a React element, but you passed " + S + ".");
    var L = jr({}, S.props), W = S.key;
    if (P != null) for (ee in P.key !== void 0 && (W = "" + P.key), P) !ge.call(P, ee) || ee === "key" || ee === "__self" || ee === "__source" || ee === "ref" && P.ref === void 0 || (L[ee] = P[ee]);
    var ee = arguments.length - 2;
    if (ee === 1) L.children = j;
    else if (1 < ee) {
      for (var pe = Array(ee), mt = 0; mt < ee; mt++) pe[mt] = arguments[mt + 2];
      L.children = pe;
    }
    return cr(S.type, W, L);
  }, K.createContext = function(S) {
    return S = { $$typeof: xe, _currentValue: S, _currentValue2: S, _threadCount: 0, Provider: null, Consumer: null }, S.Provider = S, S.Consumer = { $$typeof: D, _context: S }, S;
  }, K.createElement = function(S, P, j) {
    var L, W = {}, ee = null;
    if (P != null) for (L in P.key !== void 0 && (ee = "" + P.key), P) ge.call(P, L) && L !== "key" && L !== "__self" && L !== "__source" && (W[L] = P[L]);
    var pe = arguments.length - 2;
    if (pe === 1) W.children = j;
    else if (1 < pe) {
      for (var mt = Array(pe), Je = 0; Je < pe; Je++) mt[Je] = arguments[Je + 2];
      W.children = mt;
    }
    if (S && S.defaultProps) for (L in pe = S.defaultProps, pe) W[L] === void 0 && (W[L] = pe[L]);
    return cr(S, ee, W);
  }, K.createRef = function() {
    return { current: null };
  }, K.forwardRef = function(S) {
    return { $$typeof: qe, render: S };
  }, K.isValidElement = Lr, K.lazy = function(S) {
    return { $$typeof: ue, _payload: { _status: -1, _result: S }, _init: zn };
  }, K.memo = function(S, P) {
    return { $$typeof: _, type: S, compare: P === void 0 ? null : P };
  }, K.startTransition = function(S) {
    var P = Y.T, j = {};
    Y.T = j;
    try {
      var L = S(), W = Y.S;
      W !== null && W(j, L), typeof L == "object" && L !== null && typeof L.then == "function" && L.then(dn, pr);
    } catch (ee) {
      pr(ee);
    } finally {
      P !== null && j.types !== null && (P.types = j.types), Y.T = P;
    }
  }, K.unstable_useCacheRefresh = function() {
    return Y.H.useCacheRefresh();
  }, K.use = function(S) {
    return Y.H.use(S);
  }, K.useActionState = function(S, P, j) {
    return Y.H.useActionState(S, P, j);
  }, K.useCallback = function(S, P) {
    return Y.H.useCallback(S, P);
  }, K.useContext = function(S) {
    return Y.H.useContext(S);
  }, K.useDebugValue = function() {
  }, K.useDeferredValue = function(S, P) {
    return Y.H.useDeferredValue(S, P);
  }, K.useEffect = function(S, P) {
    return Y.H.useEffect(S, P);
  }, K.useEffectEvent = function(S) {
    return Y.H.useEffectEvent(S);
  }, K.useId = function() {
    return Y.H.useId();
  }, K.useImperativeHandle = function(S, P, j) {
    return Y.H.useImperativeHandle(S, P, j);
  }, K.useInsertionEffect = function(S, P) {
    return Y.H.useInsertionEffect(S, P);
  }, K.useLayoutEffect = function(S, P) {
    return Y.H.useLayoutEffect(S, P);
  }, K.useMemo = function(S, P) {
    return Y.H.useMemo(S, P);
  }, K.useOptimistic = function(S, P) {
    return Y.H.useOptimistic(S, P);
  }, K.useReducer = function(S, P, j) {
    return Y.H.useReducer(S, P, j);
  }, K.useRef = function(S) {
    return Y.H.useRef(S);
  }, K.useState = function(S) {
    return Y.H.useState(S);
  }, K.useSyncExternalStore = function(S, P, j) {
    return Y.H.useSyncExternalStore(S, P, j);
  }, K.useTransition = function() {
    return Y.H.useTransition();
  }, K.version = "19.2.4", K;
}
__name($u, "$u");
var Fu = { exports: {} };
Fu.exports;
var Ql;
function Pi() {
  return Ql || (Ql = 1, fl.exports = $u()), fl.exports;
}
__name(Pi, "Pi");
var Zl;
function Ou() {
  return Zl || (Zl = 1, ml.exports = Au()), ml.exports;
}
__name(Ou, "Ou");
var m = Ou();
var un = {};
var Fs = {};
var gl = { exports: {} };
var pt = {};
var eu;
function Nu() {
  if (eu) return pt;
  eu = 1;
  var O = Pi();
  function M(q) {
    var _ = "https://react.dev/errors/" + q;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var ue = 2; ue < arguments.length; ue++) _ += "&args[]=" + encodeURIComponent(arguments[ue]);
    }
    return "Minified React error #" + q + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  __name(M, "M");
  function N() {
  }
  __name(N, "N");
  var F = { d: { f: N, r: /* @__PURE__ */ __name(function() {
    throw Error(M(522));
  }, "r"), D: N, C: N, L: N, m: N, X: N, S: N, M: N }, p: 0, findDOMNode: null }, V = /* @__PURE__ */ Symbol.for("react.portal");
  function D(q, _, ue) {
    var at = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: V, key: at == null ? null : "" + at, children: q, containerInfo: _, implementation: ue };
  }
  __name(D, "D");
  var xe = O.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function qe(q, _) {
    if (q === "font") return "";
    if (typeof _ == "string") return _ === "use-credentials" ? _ : "";
  }
  __name(qe, "qe");
  return pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F, pt.createPortal = function(q, _) {
    var ue = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11) throw Error(M(299));
    return D(q, _, null, ue);
  }, pt.flushSync = function(q) {
    var _ = xe.T, ue = F.p;
    try {
      if (xe.T = null, F.p = 2, q) return q();
    } finally {
      xe.T = _, F.p = ue, F.d.f();
    }
  }, pt.preconnect = function(q, _) {
    typeof q == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, F.d.C(q, _));
  }, pt.prefetchDNS = function(q) {
    typeof q == "string" && F.d.D(q);
  }, pt.preinit = function(q, _) {
    if (typeof q == "string" && _ && typeof _.as == "string") {
      var ue = _.as, at = qe(ue, _.crossOrigin), Tt = typeof _.integrity == "string" ? _.integrity : void 0, At = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      ue === "style" ? F.d.S(q, typeof _.precedence == "string" ? _.precedence : void 0, { crossOrigin: at, integrity: Tt, fetchPriority: At }) : ue === "script" && F.d.X(q, { crossOrigin: at, integrity: Tt, fetchPriority: At, nonce: typeof _.nonce == "string" ? _.nonce : void 0 });
    }
  }, pt.preinitModule = function(q, _) {
    if (typeof q == "string") if (typeof _ == "object" && _ !== null) {
      if (_.as == null || _.as === "script") {
        var ue = qe(_.as, _.crossOrigin);
        F.d.M(q, { crossOrigin: ue, integrity: typeof _.integrity == "string" ? _.integrity : void 0, nonce: typeof _.nonce == "string" ? _.nonce : void 0 });
      }
    } else _ == null && F.d.M(q);
  }, pt.preload = function(q, _) {
    if (typeof q == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var ue = _.as, at = qe(ue, _.crossOrigin);
      F.d.L(q, ue, { crossOrigin: at, integrity: typeof _.integrity == "string" ? _.integrity : void 0, nonce: typeof _.nonce == "string" ? _.nonce : void 0, type: typeof _.type == "string" ? _.type : void 0, fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0, referrerPolicy: typeof _.referrerPolicy == "string" ? _.referrerPolicy : void 0, imageSrcSet: typeof _.imageSrcSet == "string" ? _.imageSrcSet : void 0, imageSizes: typeof _.imageSizes == "string" ? _.imageSizes : void 0, media: typeof _.media == "string" ? _.media : void 0 });
    }
  }, pt.preloadModule = function(q, _) {
    if (typeof q == "string") if (_) {
      var ue = qe(_.as, _.crossOrigin);
      F.d.m(q, { as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0, crossOrigin: ue, integrity: typeof _.integrity == "string" ? _.integrity : void 0 });
    } else F.d.m(q);
  }, pt.requestFormReset = function(q) {
    F.d.r(q);
  }, pt.unstable_batchedUpdates = function(q, _) {
    return q(_);
  }, pt.useFormState = function(q, _, ue) {
    return xe.H.useFormState(q, _, ue);
  }, pt.useFormStatus = function() {
    return xe.H.useHostTransitionStatus();
  }, pt.version = "19.2.4", pt;
}
__name(Nu, "Nu");
var tu;
function pu() {
  if (tu) return gl.exports;
  tu = 1;
  function O() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(O);
    } catch (M) {
      console.error(M);
    }
  }
  __name(O, "O");
  return O(), gl.exports = Nu(), gl.exports;
}
__name(pu, "pu");
var ru;
function ju() {
  if (ru) return Fs;
  ru = 1;
  var O = Pi(), M = pu(), N = /* @__PURE__ */ Symbol.for("react.transitional.element"), F = /* @__PURE__ */ Symbol.for("react.portal"), V = /* @__PURE__ */ Symbol.for("react.fragment"), D = /* @__PURE__ */ Symbol.for("react.strict_mode"), xe = /* @__PURE__ */ Symbol.for("react.profiler"), qe = /* @__PURE__ */ Symbol.for("react.consumer"), q = /* @__PURE__ */ Symbol.for("react.context"), _ = /* @__PURE__ */ Symbol.for("react.forward_ref"), ue = /* @__PURE__ */ Symbol.for("react.suspense"), at = /* @__PURE__ */ Symbol.for("react.suspense_list"), Tt = /* @__PURE__ */ Symbol.for("react.memo"), At = /* @__PURE__ */ Symbol.for("react.lazy"), Nr = /* @__PURE__ */ Symbol.for("react.scope"), jr = /* @__PURE__ */ Symbol.for("react.activity"), cn = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), $t = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Io = /* @__PURE__ */ Symbol.for("react.view_transition"), Dr = Symbol.iterator;
  function pn(r) {
    return r === null || typeof r != "object" ? null : (r = Dr && r[Dr] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  __name(pn, "pn");
  var Mr = Array.isArray;
  function dn(r, n) {
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
  __name(dn, "dn");
  var Y = Object.assign, ge = Object.prototype.hasOwnProperty, cr = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Un = {}, Lr = {};
  function ye(r) {
    return ge.call(Lr, r) ? true : ge.call(Un, r) ? false : cr.test(r) ? Lr[r] = true : (Un[r] = true, false);
  }
  __name(ye, "ye");
  var de = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Mt = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), w = /["'&<>]/;
  function H(r) {
    if (typeof r == "boolean" || typeof r == "number" || typeof r == "bigint") return "" + r;
    r = "" + r;
    var n = w.exec(r);
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
  __name(H, "H");
  var ie = /([A-Z])/g, zn = /^ms-/, pr = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function x(r) {
    return pr.test("" + r) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : r;
  }
  __name(x, "x");
  var S = O.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = M.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = { pending: false, data: null, method: null, action: null }, L = P.d;
  P.d = { f: L.f, r: L.r, D: gt, C: Ai, L: Ia, m: Us, X: $i, S: zs, M: Fi };
  var W = [], ee = null, pe = /(<\/|<)(s)(cript)/gi;
  function mt(r, n, a, i) {
    return "" + n + (a === "s" ? "\\u0073" : "\\u0053") + i;
  }
  __name(mt, "mt");
  function Je(r, n, a, i, u) {
    return { idPrefix: r === void 0 ? "" : r, nextFormID: 0, streamingFormat: 0, bootstrapScriptContent: a, bootstrapScripts: i, bootstrapModules: u, instructions: 0, hasBody: false, hasHtml: false, unknownResources: {}, dnsResources: {}, connectResources: { default: {}, anonymous: {}, credentials: {} }, imageResources: {}, styleResources: {}, scriptResources: {}, moduleUnknownResources: {}, moduleScriptResources: {} };
  }
  __name(Je, "Je");
  function Le(r, n, a, i) {
    return { insertionMode: r, selectedValue: n, tagScope: a, viewTransition: i };
  }
  __name(Le, "Le");
  function G(r, n, a) {
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
  __name(G, "G");
  function Ns(r) {
    return r === null ? null : { update: r.update, enter: "none", exit: "none", share: r.update, name: r.autoName, autoName: r.autoName, nameIdx: 0 };
  }
  __name(Ns, "Ns");
  function Ca(r, n) {
    return n.tagScope & 32 && (r.instructions |= 128), Le(n.insertionMode, n.selectedValue, n.tagScope | 12, Ns(n.viewTransition));
  }
  __name(Ca, "Ca");
  function Ao(r, n) {
    r = Ns(n.viewTransition);
    var a = n.tagScope | 16;
    return r !== null && r.share !== "none" && (a |= 64), Le(n.insertionMode, n.selectedValue, a, r);
  }
  __name(Ao, "Ao");
  var hn = /* @__PURE__ */ new Map();
  function Hr(r, n) {
    if (typeof n != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    var a = true, i;
    for (i in n) if (ge.call(n, i)) {
      var u = n[i];
      if (u != null && typeof u != "boolean" && u !== "") {
        if (i.indexOf("--") === 0) {
          var p = H(i);
          u = H(("" + u).trim());
        } else p = hn.get(i), p === void 0 && (p = H(i.replace(ie, "-$1").toLowerCase().replace(zn, "-ms-")), hn.set(i, p)), u = typeof u == "number" ? u === 0 || de.has(i) ? "" + u : u + "px" : H(("" + u).trim());
        a ? (a = false, r.push(' style="', p, ":", u)) : r.push(";", p, ":", u);
      }
    }
    a || r.push('"');
  }
  __name(Hr, "Hr");
  function $o(r, n, a) {
    a && typeof a != "function" && typeof a != "symbol" && r.push(" ", n, '=""');
  }
  __name($o, "$o");
  function Xe(r, n, a) {
    typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && r.push(" ", n, '="', H(a), '"');
  }
  __name(Xe, "Xe");
  var Lt = H("javascript:throw new Error('React form unexpectedly submitted.')");
  function st(r, n) {
    this.push('<input type="hidden"'), Br(r), Xe(this, "name", n), Xe(this, "value", r), this.push("/>");
  }
  __name(st, "st");
  function Br(r) {
    if (typeof r != "string") throw Error("File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration.");
  }
  __name(Br, "Br");
  function js(r, n) {
    if (typeof n.$$FORM_ACTION == "function") {
      var a = r.nextFormID++;
      r = r.idPrefix + a;
      try {
        var i = n.$$FORM_ACTION(r);
        if (i) {
          var u = i.data;
          u?.forEach(Br);
        }
        return i;
      } catch (p) {
        if (typeof p == "object" && p !== null && typeof p.then == "function") throw p;
      }
    }
    return null;
  }
  __name(js, "js");
  function Kn(r, n, a, i, u, p, h, v) {
    var g = null;
    if (typeof i == "function") {
      var T = js(n, i);
      T !== null ? (v = T.name, i = T.action || "", u = T.encType, p = T.method, h = T.target, g = T.data) : (r.push(" ", "formAction", '="', Lt, '"'), h = p = u = i = v = null, xa(n, a));
    }
    return v != null && he(r, "name", v), i != null && he(r, "formAction", i), u != null && he(r, "formEncType", u), p != null && he(r, "formMethod", p), h != null && he(r, "formTarget", h), g;
  }
  __name(Kn, "Kn");
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
        Hr(r, a);
        break;
      case "src":
      case "href":
        if (a === "") break;
      case "action":
      case "formAction":
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") break;
        a = x("" + a), r.push(" ", n, '="', H(a), '"');
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
        $o(r, n.toLowerCase(), a);
        break;
      case "xlinkHref":
        if (typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") break;
        a = x("" + a), r.push(" ", "xlink:href", '="', H(a), '"');
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        typeof a != "function" && typeof a != "symbol" && r.push(" ", n, '="', H(a), '"');
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
        a === true ? r.push(" ", n, '=""') : a !== false && typeof a != "function" && typeof a != "symbol" && r.push(" ", n, '="', H(a), '"');
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a && r.push(" ", n, '="', H(a), '"');
        break;
      case "rowSpan":
      case "start":
        typeof a == "function" || typeof a == "symbol" || isNaN(a) || r.push(" ", n, '="', H(a), '"');
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
        if ((!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Mt.get(n) || n, ye(n))) {
          switch (typeof a) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              var i = n.toLowerCase().slice(0, 5);
              if (i !== "data-" && i !== "aria-") return;
          }
          r.push(" ", n, '="', H(a), '"');
        }
    }
  }
  __name(he, "he");
  function ft(r, n, a) {
    if (n != null) {
      if (a != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
      if (typeof n != "object" || !("__html" in n)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
      n = n.__html, n != null && r.push("" + n);
    }
  }
  __name(ft, "ft");
  function Ds(r) {
    var n = "";
    return O.Children.forEach(r, function(a) {
      a != null && (n += a);
    }), n;
  }
  __name(Ds, "Ds");
  function xa(r, n) {
    if ((r.instructions & 16) === 0) {
      r.instructions |= 16;
      var a = n.preamble, i = n.bootstrapChunks;
      (a.htmlChunks || a.headChunks) && i.length === 0 ? (i.push(n.startInlineScript), Gn(i, r), i.push(">", `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`, "<\/script>")) : i.unshift(n.startInlineScript, ">", `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`, "<\/script>");
    }
  }
  __name(xa, "xa");
  function ze(r, n) {
    r.push(te("link"));
    for (var a in n) if (ge.call(n, a)) {
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
  __name(ze, "ze");
  var wa = /(<\/|<)(s)(tyle)/gi;
  function Ms(r, n, a, i) {
    return "" + n + (a === "s" ? "\\73 " : "\\53 ") + i;
  }
  __name(Ms, "Ms");
  function dr(r, n, a) {
    r.push(te(a));
    for (var i in n) if (ge.call(n, i)) {
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
  __name(dr, "dr");
  function Fo(r, n) {
    r.push(te("title"));
    var a = null, i = null, u;
    for (u in n) if (ge.call(n, u)) {
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
    return r.push(">"), n = Array.isArray(a) ? 2 > a.length ? a[0] : null : a, typeof n != "function" && typeof n != "symbol" && n !== null && n !== void 0 && r.push(H("" + n)), ft(r, i, a), r.push(hr("title")), null;
  }
  __name(Fo, "Fo");
  function Oo(r, n) {
    r.push(te("script"));
    var a = null, i = null, u;
    for (u in n) if (ge.call(n, u)) {
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
    return r.push(">"), ft(r, i, a), typeof a == "string" && r.push(("" + a).replace(pe, mt)), r.push(hr("script")), null;
  }
  __name(Oo, "Oo");
  function Ra(r, n, a) {
    r.push(te(a));
    var i = a = null, u;
    for (u in n) if (ge.call(n, u)) {
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
    return r.push(">"), ft(r, i, a), a;
  }
  __name(Ra, "Ra");
  function Ft(r, n, a) {
    r.push(te(a));
    var i = a = null, u;
    for (u in n) if (ge.call(n, u)) {
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
    return r.push(">"), ft(r, i, a), typeof a == "string" ? (r.push(H(a)), null) : a;
  }
  __name(Ft, "Ft");
  var No = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, mn = /* @__PURE__ */ new Map();
  function te(r) {
    var n = mn.get(r);
    if (n === void 0) {
      if (!No.test(r)) throw Error("Invalid tag: " + r);
      n = "<" + r, mn.set(r, n);
    }
    return n;
  }
  __name(te, "te");
  function jo(r, n, a, i, u, p, h, v, g) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
        break;
      case "a":
        r.push(te("a"));
        var T = null, E = null, R;
        for (R in a) if (ge.call(a, R)) {
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
        if (r.push(">"), ft(r, E, T), typeof T == "string") {
          r.push(H(T));
          var B = null;
        } else B = T;
        return B;
      case "g":
      case "p":
      case "li":
        break;
      case "select":
        r.push(te("select"));
        var re = null, J = null, X;
        for (X in a) if (ge.call(a, X)) {
          var U = a[X];
          if (U != null) switch (X) {
            case "children":
              re = U;
              break;
            case "dangerouslySetInnerHTML":
              J = U;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              he(r, X, U);
          }
        }
        return r.push(">"), ft(r, J, re), re;
      case "option":
        var Q = v.selectedValue;
        r.push(te("option"));
        var ve = null, Pe = null, oe = null, ce = null, ne;
        for (ne in a) if (ge.call(a, ne)) {
          var lt = a[ne];
          if (lt != null) switch (ne) {
            case "children":
              ve = lt;
              break;
            case "selected":
              oe = lt;
              break;
            case "dangerouslySetInnerHTML":
              ce = lt;
              break;
            case "value":
              Pe = lt;
            default:
              he(r, ne, lt);
          }
        }
        if (Q != null) {
          var ae = Pe !== null ? "" + Pe : Ds(ve);
          if (Mr(Q)) {
            for (var bt = 0; bt < Q.length; bt++) if ("" + Q[bt] === ae) {
              r.push(' selected=""');
              break;
            }
          } else "" + Q === ae && r.push(' selected=""');
        } else oe && r.push(' selected=""');
        return r.push(">"), ft(r, ce, ve), ve;
      case "textarea":
        r.push(te("textarea"));
        var fe = null, Me = null, He = null, Te;
        for (Te in a) if (ge.call(a, Te)) {
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
          if (Mr(He)) {
            if (1 < He.length) throw Error("<textarea> can only have at most one child.");
            fe = "" + He[0];
          }
          fe = "" + He;
        }
        return typeof fe == "string" && fe[0] === `
` && r.push(`
`), fe !== null && r.push(H("" + fe)), null;
      case "input":
        r.push(te("input"));
        var Xr = null, St = null, uo = null, wn = null, Qe = null, wt = null, Ot = null, Nt = null, tr = null, kr;
        for (kr in a) if (ge.call(a, kr)) {
          var Ue = a[kr];
          if (Ue != null) switch (kr) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            case "name":
              Xr = Ue;
              break;
            case "formAction":
              St = Ue;
              break;
            case "formEncType":
              uo = Ue;
              break;
            case "formMethod":
              wn = Ue;
              break;
            case "formTarget":
              Qe = Ue;
              break;
            case "defaultChecked":
              tr = Ue;
              break;
            case "defaultValue":
              Ot = Ue;
              break;
            case "checked":
              Nt = Ue;
              break;
            case "value":
              wt = Ue;
              break;
            default:
              he(r, kr, Ue);
          }
        }
        var Qr = Kn(r, i, u, St, uo, wn, Qe, Xr);
        return Nt !== null ? $o(r, "checked", Nt) : tr !== null && $o(r, "checked", tr), wt !== null ? he(r, "value", wt) : Ot !== null && he(r, "value", Ot), r.push("/>"), Qr?.forEach(st, r), null;
      case "button":
        r.push(te("button"));
        var co = null, es = null, ts = null, rs = null, mi = null, ns = null, po = null, ho;
        for (ho in a) if (ge.call(a, ho)) {
          var qt = a[ho];
          if (qt != null) switch (ho) {
            case "children":
              co = qt;
              break;
            case "dangerouslySetInnerHTML":
              es = qt;
              break;
            case "name":
              ts = qt;
              break;
            case "formAction":
              rs = qt;
              break;
            case "formEncType":
              mi = qt;
              break;
            case "formMethod":
              ns = qt;
              break;
            case "formTarget":
              po = qt;
              break;
            default:
              he(r, ho, qt);
          }
        }
        var ia = Kn(r, i, u, rs, mi, ns, po, ts);
        if (r.push(">"), ia?.forEach(st, r), ft(r, es, co), typeof co == "string") {
          r.push(H(co));
          var os = null;
        } else os = co;
        return os;
      case "form":
        r.push(te("form"));
        var Vt = null, la = null, Wt = null, Rn = null, Ut = null, mo = null, En;
        for (En in a) if (ge.call(a, En)) {
          var zt = a[En];
          if (zt != null) switch (En) {
            case "children":
              Vt = zt;
              break;
            case "dangerouslySetInnerHTML":
              la = zt;
              break;
            case "action":
              Wt = zt;
              break;
            case "encType":
              Rn = zt;
              break;
            case "method":
              Ut = zt;
              break;
            case "target":
              mo = zt;
              break;
            default:
              he(r, En, zt);
          }
        }
        var ua = null, fo = null;
        if (typeof Wt == "function") {
          var vr = js(i, Wt);
          vr !== null ? (Wt = vr.action || "", Rn = vr.encType, Ut = vr.method, mo = vr.target, ua = vr.data, fo = vr.name) : (r.push(" ", "action", '="', Lt, '"'), mo = Ut = Rn = Wt = null, xa(i, u));
        }
        if (Wt != null && he(r, "action", Wt), Rn != null && he(r, "encType", Rn), Ut != null && he(r, "method", Ut), mo != null && he(r, "target", mo), r.push(">"), fo !== null && (r.push('<input type="hidden"'), Xe(r, "name", fo), r.push("/>"), ua?.forEach(st, r)), ft(r, la, Vt), typeof Vt == "string") {
          r.push(H(Vt));
          var Pn = null;
        } else Pn = Vt;
        return Pn;
      case "menuitem":
        r.push(te("menuitem"));
        for (var Kt in a) if (ge.call(a, Kt)) {
          var as = a[Kt];
          if (as != null) switch (Kt) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
            default:
              he(r, Kt, as);
          }
        }
        return r.push(">"), null;
      case "object":
        r.push(te("object"));
        var rr = null, _n = null, Zr;
        for (Zr in a) if (ge.call(a, Zr)) {
          var Rt = a[Zr];
          if (Rt != null) switch (Zr) {
            case "children":
              rr = Rt;
              break;
            case "dangerouslySetInnerHTML":
              _n = Rt;
              break;
            case "data":
              var Tr = x("" + Rt);
              if (Tr === "") break;
              r.push(" ", "data", '="', H(Tr), '"');
              break;
            default:
              he(r, Zr, Rt);
          }
        }
        if (r.push(">"), ft(r, _n, rr), typeof rr == "string") {
          r.push(H(rr));
          var ca = null;
        } else ca = rr;
        return ca;
      case "title":
        var Cr = v.tagScope & 1, Ze = v.tagScope & 4;
        if (v.insertionMode === 4 || Cr || a.itemProp != null) var en = Fo(r, a);
        else Ze ? en = null : (Fo(u.hoistableChunks, a), en = void 0);
        return en;
      case "link":
        var et = v.tagScope & 1, ss = v.tagScope & 4, is = a.rel, Et = a.href, go = a.precedence;
        if (v.insertionMode === 4 || et || a.itemProp != null || typeof is != "string" || typeof Et != "string" || Et === "") {
          ze(r, a);
          var In = null;
        } else if (a.rel === "stylesheet") if (typeof go != "string" || a.disabled != null || a.onLoad || a.onError) In = ze(r, a);
        else {
          var tn = u.styles.get(go), rn = i.styleResources.hasOwnProperty(Et) ? i.styleResources[Et] : void 0;
          if (rn !== null) {
            i.styleResources[Et] = null, tn || (tn = { precedence: H(go), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, u.styles.set(go, tn));
            var nn = { state: 0, props: Y({}, a, { "data-precedence": a.precedence, precedence: null }) };
            if (rn) {
              rn.length === 2 && De(nn.props, rn);
              var ut = u.preloads.stylesheets.get(Et);
              ut && 0 < ut.length ? ut.length = 0 : nn.state = 1;
            }
            tn.sheets.set(Et, nn), h && h.stylesheets.add(nn);
          } else if (tn) {
            var pa = tn.sheets.get(Et);
            pa && h && h.stylesheets.add(pa);
          }
          g && r.push("<!-- -->"), In = null;
        }
        else a.onLoad || a.onError ? In = ze(r, a) : (g && r.push("<!-- -->"), In = ss ? null : ze(u.hoistableChunks, a));
        return In;
      case "script":
        var ls = v.tagScope & 1, da = a.async;
        if (typeof a.src != "string" || !a.src || !da || typeof da == "function" || typeof da == "symbol" || a.onLoad || a.onError || v.insertionMode === 4 || ls || a.itemProp != null) var ha = Oo(r, a);
        else {
          var An = a.src;
          if (a.type === "module") var yo = i.moduleScriptResources, us = u.preloads.moduleScripts;
          else yo = i.scriptResources, us = u.preloads.scripts;
          var Ne = yo.hasOwnProperty(An) ? yo[An] : void 0;
          if (Ne !== null) {
            yo[An] = null;
            var cs = a;
            if (Ne) {
              Ne.length === 2 && (cs = Y({}, a), De(cs, Ne));
              var $n = us.get(An);
              $n && ($n.length = 0);
            }
            var ma = [];
            u.scripts.add(ma), Oo(ma, cs);
          }
          g && r.push("<!-- -->"), ha = null;
        }
        return ha;
      case "style":
        var fa = v.tagScope & 1, Fn = a.precedence, nr = a.href, bo = a.nonce;
        if (v.insertionMode === 4 || fa || a.itemProp != null || typeof Fn != "string" || typeof nr != "string" || nr === "") {
          r.push(te("style"));
          var jt = null, or = null, on2;
          for (on2 in a) if (ge.call(a, on2)) {
            var On = a[on2];
            if (On != null) switch (on2) {
              case "children":
                jt = On;
                break;
              case "dangerouslySetInnerHTML":
                or = On;
                break;
              default:
                he(r, on2, On);
            }
          }
          r.push(">");
          var Nn = Array.isArray(jt) ? 2 > jt.length ? jt[0] : null : jt;
          typeof Nn != "function" && typeof Nn != "symbol" && Nn !== null && Nn !== void 0 && r.push(("" + Nn).replace(wa, Ms)), ft(r, or, jt), r.push(hr("style"));
          var jn = null;
        } else {
          var Yt = u.styles.get(Fn);
          if ((i.styleResources.hasOwnProperty(nr) ? i.styleResources[nr] : void 0) !== null) {
            i.styleResources[nr] = null, Yt || (Yt = { precedence: H(Fn), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, u.styles.set(Fn, Yt));
            var Dn = u.nonce.style;
            if (!Dn || Dn === bo) {
              Yt.hrefs.push(H(nr));
              var Mn = Yt.rules, xr = null, ps = null, So;
              for (So in a) if (ge.call(a, So)) {
                var Ln = a[So];
                if (Ln != null) switch (So) {
                  case "children":
                    xr = Ln;
                    break;
                  case "dangerouslySetInnerHTML":
                    ps = Ln;
                }
              }
              var wr = Array.isArray(xr) ? 2 > xr.length ? xr[0] : null : xr;
              typeof wr != "function" && typeof wr != "symbol" && wr !== null && wr !== void 0 && Mn.push(("" + wr).replace(wa, Ms)), ft(Mn, ps, xr);
            }
          }
          Yt && h && h.styles.add(Yt), g && r.push("<!-- -->"), jn = void 0;
        }
        return jn;
      case "meta":
        var Rr = v.tagScope & 1, Xi = v.tagScope & 4;
        if (v.insertionMode === 4 || Rr || a.itemProp != null) var Er = dr(r, a, "meta");
        else g && r.push("<!-- -->"), Er = Xi ? null : typeof a.charSet == "string" ? dr(u.charsetChunks, a, "meta") : a.name === "viewport" ? dr(u.viewportChunks, a, "meta") : dr(u.hoistableChunks, a, "meta");
        return Er;
      case "listing":
      case "pre":
        r.push(te(n));
        var kt = null, _e = null, Pr;
        for (Pr in a) if (ge.call(a, Pr)) {
          var an = a[Pr];
          if (an != null) switch (Pr) {
            case "children":
              kt = an;
              break;
            case "dangerouslySetInnerHTML":
              _e = an;
              break;
            default:
              he(r, Pr, an);
          }
        }
        if (r.push(">"), _e != null) {
          if (kt != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof _e != "object" || !("__html" in _e)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
          var _r = _e.__html;
          _r != null && (typeof _r == "string" && 0 < _r.length && _r[0] === `
` ? r.push(`
`, _r) : r.push("" + _r));
        }
        return typeof kt == "string" && kt[0] === `
` && r.push(`
`), kt;
      case "img":
        var fi = v.tagScope & 3, Be = a.src, Ye = a.srcSet;
        if (!(a.loading === "lazy" || !Be && !Ye || typeof Be != "string" && Be != null || typeof Ye != "string" && Ye != null || a.fetchPriority === "low" || fi) && (typeof Be != "string" || Be[4] !== ":" || Be[0] !== "d" && Be[0] !== "D" || Be[1] !== "a" && Be[1] !== "A" || Be[2] !== "t" && Be[2] !== "T" || Be[3] !== "a" && Be[3] !== "A") && (typeof Ye != "string" || Ye[4] !== ":" || Ye[0] !== "d" && Ye[0] !== "D" || Ye[1] !== "a" && Ye[1] !== "A" || Ye[2] !== "t" && Ye[2] !== "T" || Ye[3] !== "a" && Ye[3] !== "A")) {
          h !== null && v.tagScope & 64 && (h.suspenseyImages = true);
          var ds = typeof a.sizes == "string" ? a.sizes : void 0, Hn = Ye ? Ye + `
` + (ds || "") : Be, ga = u.preloads.images, Ir = ga.get(Hn);
          if (Ir) (a.fetchPriority === "high" || 10 > u.highImagePreloads.size) && (ga.delete(Hn), u.highImagePreloads.add(Ir));
          else if (!i.imageResources.hasOwnProperty(Hn)) {
            i.imageResources[Hn] = W;
            var e = a.crossOrigin, t = typeof e == "string" ? e === "use-credentials" ? e : "" : void 0, o = u.headers, s;
            o && 0 < o.remainingCapacity && typeof a.srcSet != "string" && (a.fetchPriority === "high" || 500 > o.highImagePreloads.length) && (s = Jn(Be, "image", { imageSrcSet: a.srcSet, imageSizes: a.sizes, crossOrigin: t, integrity: a.integrity, nonce: a.nonce, type: a.type, fetchPriority: a.fetchPriority, referrerPolicy: a.refererPolicy }), 0 <= (o.remainingCapacity -= s.length + 2)) ? (u.resets.image[Hn] = W, o.highImagePreloads && (o.highImagePreloads += ", "), o.highImagePreloads += s) : (Ir = [], ze(Ir, { rel: "preload", as: "image", href: Ye ? void 0 : Be, imageSrcSet: Ye, imageSizes: ds, crossOrigin: t, integrity: a.integrity, type: a.type, fetchPriority: a.fetchPriority, referrerPolicy: a.referrerPolicy }), a.fetchPriority === "high" || 10 > u.highImagePreloads.size ? u.highImagePreloads.add(Ir) : (u.bulkPreloads.add(Ir), ga.set(Hn, Ir)));
          }
        }
        return dr(r, a, "img");
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
        return dr(r, a, n);
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
          var c = Ra(l.headChunks, a, "head");
        } else c = Ft(r, a, "head");
        return c;
      case "body":
        if (2 > v.insertionMode) {
          var d = p || u.preamble;
          if (d.bodyChunks) throw Error("The `<body>` tag may only be rendered once.");
          p !== null && r.push("<!--body-->"), d.bodyChunks = [];
          var y = Ra(d.bodyChunks, a, "body");
        } else y = Ft(r, a, "body");
        return y;
      case "html":
        if (v.insertionMode === 0) {
          var f = p || u.preamble;
          if (f.htmlChunks) throw Error("The `<html>` tag may only be rendered once.");
          p !== null && r.push("<!--html-->"), f.htmlChunks = [""];
          var b = Ra(f.htmlChunks, a, "html");
        } else b = Ft(r, a, "html");
        return b;
      default:
        if (n.indexOf("-") !== -1) {
          r.push(te(n));
          var k = null, C = null, I;
          for (I in a) if (ge.call(a, I)) {
            var A = a[I];
            if (A != null) {
              var le = I;
              switch (I) {
                case "children":
                  k = A;
                  break;
                case "dangerouslySetInnerHTML":
                  C = A;
                  break;
                case "style":
                  Hr(r, A);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "ref":
                  break;
                case "className":
                  le = "class";
                default:
                  if (ye(I) && typeof A != "function" && typeof A != "symbol" && A !== false) {
                    if (A === true) A = "";
                    else if (typeof A == "object") continue;
                    r.push(" ", le, '="', H(A), '"');
                  }
              }
            }
          }
          return r.push(">"), ft(r, C, k), k;
        }
    }
    return Ft(r, a, n);
  }
  __name(jo, "jo");
  var Ea = /* @__PURE__ */ new Map();
  function hr(r) {
    var n = Ea.get(r);
    return n === void 0 && (n = "</" + r + ">", Ea.set(r, n)), n;
  }
  __name(hr, "hr");
  function Do(r, n) {
    r = r.preamble, r.htmlChunks === null && n.htmlChunks && (r.htmlChunks = n.htmlChunks), r.headChunks === null && n.headChunks && (r.headChunks = n.headChunks), r.bodyChunks === null && n.bodyChunks && (r.bodyChunks = n.bodyChunks);
  }
  __name(Do, "Do");
  function Yn(r, n) {
    n = n.bootstrapChunks;
    for (var a = 0; a < n.length - 1; a++) r.push(n[a]);
    return a < n.length ? (a = n[a], n.length = 0, r.push(a)) : true;
  }
  __name(Yn, "Yn");
  function Ct(r, n, a) {
    if (r.push('<!--$?--><template id="'), a === null) throw Error("An ID must have been assigned before we can complete the boundary.");
    return r.push(n.boundaryPrefix), n = a.toString(16), r.push(n), r.push('"></template>');
  }
  __name(Ct, "Ct");
  function Ls(r, n, a, i) {
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
  __name(Ls, "Ls");
  function Hs(r, n) {
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
  __name(Hs, "Hs");
  var _i = /[<\u2028\u2029]/g;
  function Bs(r) {
    return JSON.stringify(r).replace(_i, function(n) {
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
  __name(Bs, "Bs");
  var Ii = /[&><\u2028\u2029]/g;
  function fn(r) {
    return JSON.stringify(r).replace(Ii, function(n) {
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
  __name(fn, "fn");
  var Ve = false, it = true;
  function we(r) {
    var n = r.rules, a = r.hrefs, i = 0;
    if (a.length) {
      for (this.push(ee.startInlineStyle), this.push(' media="not all" data-precedence="'), this.push(r.precedence), this.push('" data-href="'); i < a.length - 1; i++) this.push(a[i]), this.push(" ");
      for (this.push(a[i]), this.push('">'), i = 0; i < n.length; i++) this.push(n[i]);
      it = this.push("</style>"), Ve = true, n.length = 0, a.length = 0;
    }
  }
  __name(we, "we");
  function Pa(r) {
    return r.state !== 2 ? Ve = true : false;
  }
  __name(Pa, "Pa");
  function Mo(r, n, a) {
    return Ve = false, it = true, ee = a, n.styles.forEach(we, r), ee = null, n.stylesheets.forEach(Pa), Ve && (a.stylesToHoist = true), it;
  }
  __name(Mo, "Mo");
  function be(r) {
    for (var n = 0; n < r.length; n++) this.push(r[n]);
    r.length = 0;
  }
  __name(be, "be");
  var Xt = [];
  function qs(r) {
    ze(Xt, r.props);
    for (var n = 0; n < Xt.length; n++) this.push(Xt[n]);
    Xt.length = 0, r.state = 2;
  }
  __name(qs, "qs");
  function _a(r) {
    var n = 0 < r.sheets.size;
    r.sheets.forEach(qs, this), r.sheets.clear();
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
  __name(_a, "_a");
  function Vs(r) {
    if (r.state === 0) {
      r.state = 1;
      var n = r.props;
      for (ze(Xt, { rel: "preload", as: "style", href: r.props.href, crossOrigin: n.crossOrigin, fetchPriority: n.fetchPriority, integrity: n.integrity, media: n.media, hrefLang: n.hrefLang, referrerPolicy: n.referrerPolicy }), r = 0; r < Xt.length; r++) this.push(Xt[r]);
      Xt.length = 0;
    }
  }
  __name(Vs, "Vs");
  function Ws(r) {
    r.sheets.forEach(Vs, this), r.sheets.clear();
  }
  __name(Ws, "Ws");
  function Gn(r, n) {
    (n.instructions & 32) === 0 && (n.instructions |= 32, r.push(' id="', H("_" + n.idPrefix + "R_"), '"'));
  }
  __name(Gn, "Gn");
  function me(r, n) {
    r.push("[");
    var a = "[";
    n.stylesheets.forEach(function(i) {
      if (i.state !== 2) if (i.state === 3) r.push(a), i = fn("" + i.props.href), r.push(i), r.push("]"), a = ",[";
      else {
        r.push(a);
        var u = i.props["data-precedence"], p = i.props, h = x("" + i.props.href);
        h = fn(h), r.push(h), u = "" + u, r.push(","), u = fn(u), r.push(u);
        for (var v in p) if (ge.call(p, v) && (u = p[v], u != null)) switch (v) {
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
        a = x(a), n = "" + a;
        break;
      default:
        if (2 < n.length && (n[0] === "o" || n[0] === "O") && (n[1] === "n" || n[1] === "N") || !ye(n)) return;
        n = "" + a;
    }
    r.push(","), i = fn(i), r.push(i), r.push(","), i = fn(n), r.push(i);
  }
  __name(Re, "Re");
  function qr() {
    return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set(), suspenseyImages: false };
  }
  __name(qr, "qr");
  function gt(r) {
    var n = Oe || null;
    if (n) {
      var a = n.resumableState, i = n.renderState;
      if (typeof r == "string" && r) {
        if (!a.dnsResources.hasOwnProperty(r)) {
          a.dnsResources[r] = null, a = i.headers;
          var u, p;
          (p = a && 0 < a.remainingCapacity) && (p = (u = "<" + ("" + r).replace(Lo, mr) + ">; rel=dns-prefetch", 0 <= (a.remainingCapacity -= u.length + 2))), p ? (i.resets.dns[r] = null, a.preconnects && (a.preconnects += ", "), a.preconnects += u) : (u = [], ze(u, { href: r, rel: "dns-prefetch" }), i.preconnects.add(u));
        }
        Jr(n);
      }
    } else L.D(r);
  }
  __name(gt, "gt");
  function Ai(r, n) {
    var a = Oe || null;
    if (a) {
      var i = a.resumableState, u = a.renderState;
      if (typeof r == "string" && r) {
        var p = n === "use-credentials" ? "credentials" : typeof n == "string" ? "anonymous" : "default";
        if (!i.connectResources[p].hasOwnProperty(r)) {
          i.connectResources[p][r] = null, i = u.headers;
          var h, v;
          if (v = i && 0 < i.remainingCapacity) {
            if (v = "<" + ("" + r).replace(Lo, mr) + ">; rel=preconnect", typeof n == "string") {
              var g = ("" + n).replace(Ho, Aa);
              v += '; crossorigin="' + g + '"';
            }
            v = (h = v, 0 <= (i.remainingCapacity -= h.length + 2));
          }
          v ? (u.resets.connect[p][r] = null, i.preconnects && (i.preconnects += ", "), i.preconnects += h) : (p = [], ze(p, { rel: "preconnect", href: r, crossOrigin: n }), u.preconnects.add(p));
        }
        Jr(a);
      }
    } else L.C(r, n);
  }
  __name(Ai, "Ai");
  function Ia(r, n, a) {
    var i = Oe || null;
    if (i) {
      var u = i.resumableState, p = i.renderState;
      if (n && r) {
        switch (n) {
          case "image":
            if (a) var h = a.imageSrcSet, v = a.imageSizes, g = a.fetchPriority;
            var T = h ? h + `
` + (v || "") : r;
            if (u.imageResources.hasOwnProperty(T)) return;
            u.imageResources[T] = W, u = p.headers;
            var E;
            u && 0 < u.remainingCapacity && typeof h != "string" && g === "high" && (E = Jn(r, n, a), 0 <= (u.remainingCapacity -= E.length + 2)) ? (p.resets.image[T] = W, u.highImagePreloads && (u.highImagePreloads += ", "), u.highImagePreloads += E) : (u = [], ze(u, Y({ rel: "preload", href: h ? void 0 : r, as: n }, a)), g === "high" ? p.highImagePreloads.add(u) : (p.bulkPreloads.add(u), p.preloads.images.set(T, u)));
            break;
          case "style":
            if (u.styleResources.hasOwnProperty(r)) return;
            h = [], ze(h, Y({ rel: "preload", href: r, as: n }, a)), u.styleResources[r] = !a || typeof a.crossOrigin != "string" && typeof a.integrity != "string" ? W : [a.crossOrigin, a.integrity], p.preloads.stylesheets.set(r, h), p.bulkPreloads.add(h);
            break;
          case "script":
            if (u.scriptResources.hasOwnProperty(r)) return;
            h = [], p.preloads.scripts.set(r, h), p.bulkPreloads.add(h), ze(h, Y({ rel: "preload", href: r, as: n }, a)), u.scriptResources[r] = !a || typeof a.crossOrigin != "string" && typeof a.integrity != "string" ? W : [a.crossOrigin, a.integrity];
            break;
          default:
            if (u.unknownResources.hasOwnProperty(n)) {
              if (h = u.unknownResources[n], h.hasOwnProperty(r)) return;
            } else h = {}, u.unknownResources[n] = h;
            h[r] = W, (u = p.headers) && 0 < u.remainingCapacity && n === "font" && (T = Jn(r, n, a), 0 <= (u.remainingCapacity -= T.length + 2)) ? (p.resets.font[r] = W, u.fontPreloads && (u.fontPreloads += ", "), u.fontPreloads += T) : (u = [], r = Y({ rel: "preload", href: r, as: n }, a), ze(u, r), n) === "font" ? p.fontPreloads.add(u) : p.bulkPreloads.add(u);
        }
        Jr(i);
      }
    } else L.L(r, n, a);
  }
  __name(Ia, "Ia");
  function Us(r, n) {
    var a = Oe || null;
    if (a) {
      var i = a.resumableState, u = a.renderState;
      if (r) {
        var p = n && typeof n.as == "string" ? n.as : "script";
        switch (p) {
          case "script":
            if (i.moduleScriptResources.hasOwnProperty(r)) return;
            p = [], i.moduleScriptResources[r] = !n || typeof n.crossOrigin != "string" && typeof n.integrity != "string" ? W : [n.crossOrigin, n.integrity], u.preloads.moduleScripts.set(r, p);
            break;
          default:
            if (i.moduleUnknownResources.hasOwnProperty(p)) {
              var h = i.unknownResources[p];
              if (h.hasOwnProperty(r)) return;
            } else h = {}, i.moduleUnknownResources[p] = h;
            p = [], h[r] = W;
        }
        ze(p, Y({ rel: "modulepreload", href: r }, n)), u.bulkPreloads.add(p), Jr(a);
      }
    } else L.m(r, n);
  }
  __name(Us, "Us");
  function zs(r, n, a) {
    var i = Oe || null;
    if (i) {
      var u = i.resumableState, p = i.renderState;
      if (r) {
        n = n || "default";
        var h = p.styles.get(n), v = u.styleResources.hasOwnProperty(r) ? u.styleResources[r] : void 0;
        v !== null && (u.styleResources[r] = null, h || (h = { precedence: H(n), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, p.styles.set(n, h)), n = { state: 0, props: Y({ rel: "stylesheet", href: r, "data-precedence": n }, a) }, v && (v.length === 2 && De(n.props, v), (p = p.preloads.stylesheets.get(r)) && 0 < p.length ? p.length = 0 : n.state = 1), h.sheets.set(r, n), Jr(i));
      }
    } else L.S(r, n, a);
  }
  __name(zs, "zs");
  function $i(r, n) {
    var a = Oe || null;
    if (a) {
      var i = a.resumableState, u = a.renderState;
      if (r) {
        var p = i.scriptResources.hasOwnProperty(r) ? i.scriptResources[r] : void 0;
        p !== null && (i.scriptResources[r] = null, n = Y({ src: r, async: true }, n), p && (p.length === 2 && De(n, p), r = u.preloads.scripts.get(r)) && (r.length = 0), r = [], u.scripts.add(r), Oo(r, n), Jr(a));
      }
    } else L.X(r, n);
  }
  __name($i, "$i");
  function Fi(r, n) {
    var a = Oe || null;
    if (a) {
      var i = a.resumableState, u = a.renderState;
      if (r) {
        var p = i.moduleScriptResources.hasOwnProperty(r) ? i.moduleScriptResources[r] : void 0;
        p !== null && (i.moduleScriptResources[r] = null, n = Y({ src: r, type: "module", async: true }, n), p && (p.length === 2 && De(n, p), r = u.preloads.moduleScripts.get(r)) && (r.length = 0), r = [], u.scripts.add(r), Oo(r, n), Jr(a));
      }
    } else L.M(r, n);
  }
  __name(Fi, "Fi");
  function De(r, n) {
    r.crossOrigin == null && (r.crossOrigin = n[0]), r.integrity == null && (r.integrity = n[1]);
  }
  __name(De, "De");
  function Jn(r, n, a) {
    r = ("" + r).replace(Lo, mr), n = ("" + n).replace(Ho, Aa), n = "<" + r + '>; rel=preload; as="' + n + '"';
    for (var i in a) ge.call(a, i) && (r = a[i], typeof r == "string" && (n += "; " + i.toLowerCase() + '="' + ("" + r).replace(Ho, Aa) + '"'));
    return n;
  }
  __name(Jn, "Jn");
  var Lo = /[<>\r\n]/g;
  function mr(r) {
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
  __name(mr, "mr");
  var Ho = /["';,\r\n]/g;
  function Aa(r) {
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
  __name(Aa, "Aa");
  function Oi(r) {
    this.styles.add(r);
  }
  __name(Oi, "Oi");
  function Ni(r) {
    this.stylesheets.add(r);
  }
  __name(Ni, "Ni");
  function Qt(r, n) {
    n.styles.forEach(Oi, r), n.stylesheets.forEach(Ni, r), n.suspenseyImages && (r.suspenseyImages = true);
  }
  __name(Qt, "Qt");
  function $a(r, n) {
    var a = r.idPrefix, i = [], u = r.bootstrapScriptContent, p = r.bootstrapScripts, h = r.bootstrapModules;
    u !== void 0 && (i.push("<script"), Gn(i, r), i.push(">", ("" + u).replace(pe, mt), "<\/script>")), u = a + "P:";
    var v = a + "S:";
    a += "B:";
    var g = /* @__PURE__ */ new Set(), T = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Set(), R = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Set(), B = /* @__PURE__ */ new Set(), re = /* @__PURE__ */ new Set(), J = { images: /* @__PURE__ */ new Map(), stylesheets: /* @__PURE__ */ new Map(), scripts: /* @__PURE__ */ new Map(), moduleScripts: /* @__PURE__ */ new Map() };
    if (p !== void 0) for (var X = 0; X < p.length; X++) {
      var U = p[X], Q, ve = void 0, Pe = void 0, oe = { rel: "preload", as: "script", fetchPriority: "low", nonce: void 0 };
      typeof U == "string" ? oe.href = Q = U : (oe.href = Q = U.src, oe.integrity = Pe = typeof U.integrity == "string" ? U.integrity : void 0, oe.crossOrigin = ve = typeof U == "string" || U.crossOrigin == null ? void 0 : U.crossOrigin === "use-credentials" ? "use-credentials" : ""), U = r;
      var ce = Q;
      U.scriptResources[ce] = null, U.moduleScriptResources[ce] = null, U = [], ze(U, oe), $.add(U), i.push('<script src="', H(Q), '"'), typeof Pe == "string" && i.push(' integrity="', H(Pe), '"'), typeof ve == "string" && i.push(' crossorigin="', H(ve), '"'), Gn(i, r), i.push(' async=""><\/script>');
    }
    if (h !== void 0) for (p = 0; p < h.length; p++) oe = h[p], ve = Q = void 0, Pe = { rel: "modulepreload", fetchPriority: "low", nonce: void 0 }, typeof oe == "string" ? Pe.href = X = oe : (Pe.href = X = oe.src, Pe.integrity = ve = typeof oe.integrity == "string" ? oe.integrity : void 0, Pe.crossOrigin = Q = typeof oe == "string" || oe.crossOrigin == null ? void 0 : oe.crossOrigin === "use-credentials" ? "use-credentials" : ""), oe = r, U = X, oe.scriptResources[U] = null, oe.moduleScriptResources[U] = null, oe = [], ze(oe, Pe), $.add(oe), i.push('<script type="module" src="', H(X), '"'), typeof ve == "string" && i.push(' integrity="', H(ve), '"'), typeof Q == "string" && i.push(' crossorigin="', H(Q), '"'), Gn(i, r), i.push(' async=""><\/script>');
    return { placeholderPrefix: u, segmentPrefix: v, boundaryPrefix: a, startInlineScript: "<script", startInlineStyle: "<style", preamble: { htmlChunks: null, headChunks: null, bodyChunks: null }, externalRuntimeScript: null, bootstrapChunks: i, importMapChunks: [], onHeaders: void 0, headers: null, resets: { font: {}, dns: {}, connect: { default: {}, anonymous: {}, credentials: {} }, image: {}, style: {} }, charsetChunks: [], viewportChunks: [], hoistableChunks: [], preconnects: g, fontPreloads: T, highImagePreloads: E, styles: R, bootstrapScripts: $, scripts: B, bulkPreloads: re, preloads: J, nonce: { script: void 0, style: void 0 }, stylesToHoist: false, generateStaticMarkup: n };
  }
  __name($a, "$a");
  function Xn(r, n, a, i) {
    return a.generateStaticMarkup ? (r.push(H(n)), false) : (n === "" ? r = i : (i && r.push("<!-- -->"), r.push(H(n)), r = true), r);
  }
  __name(Xn, "Xn");
  function Vr(r, n, a, i) {
    n.generateStaticMarkup || a && i && r.push("<!-- -->");
  }
  __name(Vr, "Vr");
  var ji = Function.prototype.bind, Ks = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Ie(r) {
    if (r == null) return null;
    if (typeof r == "function") return r.$$typeof === Ks ? null : r.displayName || r.name || null;
    if (typeof r == "string") return r;
    switch (r) {
      case V:
        return "Fragment";
      case xe:
        return "Profiler";
      case D:
        return "StrictMode";
      case ue:
        return "Suspense";
      case at:
        return "SuspenseList";
      case jr:
        return "Activity";
    }
    if (typeof r == "object") switch (r.$$typeof) {
      case F:
        return "Portal";
      case q:
        return r.displayName || "Context";
      case qe:
        return (r._context.displayName || "Context") + ".Consumer";
      case _:
        var n = r.render;
        return r = r.displayName, r || (r = n.displayName || n.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
      case Tt:
        return n = r.displayName || null, n !== null ? n : Ie(r.type) || "Memo";
      case At:
        n = r._payload, r = r._init;
        try {
          return Ie(r(n));
        } catch {
        }
    }
    return null;
  }
  __name(Ie, "Ie");
  var Ys = {}, Wr = null;
  function Qn(r, n) {
    if (r !== n) {
      r.context._currentValue2 = r.parentValue, r = r.parent;
      var a = n.parent;
      if (r === null) {
        if (a !== null) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
      } else {
        if (a === null) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        Qn(r, a);
      }
      n.context._currentValue2 = n.value;
    }
  }
  __name(Qn, "Qn");
  function fr(r) {
    r.context._currentValue2 = r.parentValue, r = r.parent, r !== null && fr(r);
  }
  __name(fr, "fr");
  function Fa(r) {
    var n = r.parent;
    n !== null && Fa(n), r.context._currentValue2 = r.value;
  }
  __name(Fa, "Fa");
  function Oa(r, n) {
    if (r.context._currentValue2 = r.parentValue, r = r.parent, r === null) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    r.depth === n.depth ? Qn(r, n) : Oa(r, n);
  }
  __name(Oa, "Oa");
  function Gs(r, n) {
    var a = n.parent;
    if (a === null) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    r.depth === a.depth ? Qn(r, a) : Gs(r, a), n.context._currentValue2 = n.value;
  }
  __name(Gs, "Gs");
  function gr(r) {
    var n = Wr;
    n !== r && (n === null ? Fa(r) : r === null ? fr(n) : n.depth === r.depth ? Qn(n, r) : n.depth > r.depth ? Oa(n, r) : Gs(n, r), Wr = r);
  }
  __name(gr, "gr");
  var Js = { enqueueSetState: /* @__PURE__ */ __name(function(r, n) {
    r = r._reactInternals, r.queue !== null && r.queue.push(n);
  }, "enqueueSetState"), enqueueReplaceState: /* @__PURE__ */ __name(function(r, n) {
    r = r._reactInternals, r.replace = true, r.queue = [n];
  }, "enqueueReplaceState"), enqueueForceUpdate: /* @__PURE__ */ __name(function() {
  }, "enqueueForceUpdate") }, Di = { id: 1, overflow: "" };
  function Ur(r, n, a) {
    var i = r.id;
    r = r.overflow;
    var u = 32 - Bo(i) - 1;
    i &= ~(1 << u), a += 1;
    var p = 32 - Bo(n) + u;
    if (30 < p) {
      var h = u - u % 5;
      return p = (i & (1 << h) - 1).toString(32), i >>= h, u -= h, { id: 1 << 32 - Bo(n) + u | a << u | i, overflow: p + r };
    }
    return { id: 1 << p | a << u | i, overflow: r };
  }
  __name(Ur, "Ur");
  var Bo = Math.clz32 ? Math.clz32 : Hi, Mi = Math.log, Li = Math.LN2;
  function Hi(r) {
    return r >>>= 0, r === 0 ? 32 : 31 - (Mi(r) / Li | 0) | 0;
  }
  __name(Hi, "Hi");
  function tt() {
  }
  __name(tt, "tt");
  var yt = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`.");
  function Bi(r, n, a) {
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
        throw qo = n, yt;
    }
  }
  __name(Bi, "Bi");
  var qo = null;
  function Vo() {
    if (qo === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
    var r = qo;
    return qo = null, r;
  }
  __name(Vo, "Vo");
  function Xs(r, n) {
    return r === n && (r !== 0 || 1 / r === 1 / n) || r !== r && n !== n;
  }
  __name(Xs, "Xs");
  var qi = typeof Object.is == "function" ? Object.is : Xs, Zt = null, Na = null, ja = null, Da = null, Wo = null, Se = null, Zn = false, Uo = false, eo = 0, to = 0, ro = -1, zo = 0, gn = null, yr = null, Ko = 0;
  function er() {
    if (Zt === null) throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    return Zt;
  }
  __name(er, "er");
  function Qs() {
    if (0 < Ko) throw Error("Rendered more hooks than during the previous render");
    return { memoizedState: null, queue: null, next: null };
  }
  __name(Qs, "Qs");
  function Ma() {
    return Se === null ? Wo === null ? (Zn = false, Wo = Se = Qs()) : (Zn = true, Se = Wo) : Se.next === null ? (Zn = false, Se = Se.next = Qs()) : (Zn = true, Se = Se.next), Se;
  }
  __name(Ma, "Ma");
  function yn() {
    var r = gn;
    return gn = null, r;
  }
  __name(yn, "yn");
  function no() {
    Da = ja = Na = Zt = null, Uo = false, Wo = null, Ko = 0, Se = yr = null;
  }
  __name(no, "no");
  function Zs(r, n) {
    return typeof n == "function" ? n(r) : n;
  }
  __name(Zs, "Zs");
  function ei(r, n, a) {
    if (Zt = er(), Se = Ma(), Zn) {
      var i = Se.queue;
      if (n = i.dispatch, yr !== null && (a = yr.get(i), a !== void 0)) {
        yr.delete(i), i = Se.memoizedState;
        do
          i = r(i, a.action), a = a.next;
        while (a !== null);
        return Se.memoizedState = i, [i, n];
      }
      return [Se.memoizedState, n];
    }
    return r = r === Zs ? typeof n == "function" ? n() : n : a !== void 0 ? a(n) : n, Se.memoizedState = r, r = Se.queue = { last: null, dispatch: null }, r = r.dispatch = Vi.bind(null, Zt, r), [Se.memoizedState, r];
  }
  __name(ei, "ei");
  function ti(r, n) {
    if (Zt = er(), Se = Ma(), n = n === void 0 ? null : n, Se !== null) {
      var a = Se.memoizedState;
      if (a !== null && n !== null) {
        var i = a[1];
        e: if (i === null) i = false;
        else {
          for (var u = 0; u < i.length && u < n.length; u++) if (!qi(n[u], i[u])) {
            i = false;
            break e;
          }
          i = true;
        }
        if (i) return a[0];
      }
    }
    return r = r(), Se.memoizedState = [r, n], r;
  }
  __name(ti, "ti");
  function Vi(r, n, a) {
    if (25 <= Ko) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
    if (r === Zt) if (Uo = true, r = { action: a, next: null }, yr === null && (yr = /* @__PURE__ */ new Map()), a = yr.get(n), a === void 0) yr.set(n, r);
    else {
      for (n = a; n.next !== null; ) n = n.next;
      n.next = r;
    }
  }
  __name(Vi, "Vi");
  function Wi() {
    throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
  }
  __name(Wi, "Wi");
  function Ui() {
    throw Error("startTransition cannot be called during server rendering.");
  }
  __name(Ui, "Ui");
  function ri() {
    throw Error("Cannot update optimistic state while rendering.");
  }
  __name(ri, "ri");
  function ni(r, n, a) {
    er();
    var i = to++, u = ja;
    if (typeof r.$$FORM_ACTION == "function") {
      var p = null, h = Da;
      u = u.formState;
      var v = r.$$IS_SIGNATURE_EQUAL;
      if (u !== null && typeof v == "function") {
        var g = u[1];
        v.call(r, u[2], u[3]) && (p = a !== void 0 ? "p" + a : "k" + dn(JSON.stringify([h, null, i]), 0), g === p && (ro = i, n = u[0]));
      }
      var T = r.bind(null, n);
      return r = /* @__PURE__ */ __name(function(R) {
        T(R);
      }, "r"), typeof T.$$FORM_ACTION == "function" && (r.$$FORM_ACTION = function(R) {
        R = T.$$FORM_ACTION(R), a !== void 0 && (a += "", R.action = a);
        var $ = R.data;
        return $ && (p === null && (p = a !== void 0 ? "p" + a : "k" + dn(JSON.stringify([h, null, i]), 0)), $.append("$ACTION_KEY", p)), R;
      }), [n, r, false];
    }
    var E = r.bind(null, n);
    return [n, function(R) {
      E(R);
    }, false];
  }
  __name(ni, "ni");
  function oi(r) {
    var n = zo;
    return zo += 1, gn === null && (gn = []), Bi(gn, r, n);
  }
  __name(oi, "oi");
  function zi() {
    throw Error("Cache cannot be refreshed during server rendering.");
  }
  __name(zi, "zi");
  var ai = { readContext: /* @__PURE__ */ __name(function(r) {
    return r._currentValue2;
  }, "readContext"), use: /* @__PURE__ */ __name(function(r) {
    if (r !== null && typeof r == "object") {
      if (typeof r.then == "function") return oi(r);
      if (r.$$typeof === q) return r._currentValue2;
    }
    throw Error("An unsupported type was passed to use(): " + String(r));
  }, "use"), useContext: /* @__PURE__ */ __name(function(r) {
    return er(), r._currentValue2;
  }, "useContext"), useMemo: ti, useReducer: ei, useRef: /* @__PURE__ */ __name(function(r) {
    Zt = er(), Se = Ma();
    var n = Se.memoizedState;
    return n === null ? (r = { current: r }, Se.memoizedState = r) : n;
  }, "useRef"), useState: /* @__PURE__ */ __name(function(r) {
    return ei(Zs, r);
  }, "useState"), useInsertionEffect: tt, useLayoutEffect: tt, useCallback: /* @__PURE__ */ __name(function(r, n) {
    return ti(function() {
      return r;
    }, n);
  }, "useCallback"), useImperativeHandle: tt, useEffect: tt, useDebugValue: tt, useDeferredValue: /* @__PURE__ */ __name(function(r, n) {
    return er(), n !== void 0 ? n : r;
  }, "useDeferredValue"), useTransition: /* @__PURE__ */ __name(function() {
    return er(), [false, Ui];
  }, "useTransition"), useId: /* @__PURE__ */ __name(function() {
    var r = Na.treeContext, n = r.overflow;
    r = r.id, r = (r & ~(1 << 32 - Bo(r) - 1)).toString(32) + n;
    var a = Yo;
    if (a === null) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
    return n = eo++, r = "_" + a.idPrefix + "R_" + r, 0 < n && (r += "H" + n.toString(32)), r + "_";
  }, "useId"), useSyncExternalStore: /* @__PURE__ */ __name(function(r, n, a) {
    if (a === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
    return a();
  }, "useSyncExternalStore"), useOptimistic: /* @__PURE__ */ __name(function(r) {
    return er(), [r, ri];
  }, "useOptimistic"), useActionState: ni, useFormState: ni, useHostTransitionStatus: /* @__PURE__ */ __name(function() {
    return er(), j;
  }, "useHostTransitionStatus"), useMemoCache: /* @__PURE__ */ __name(function(r) {
    for (var n = Array(r), a = 0; a < r; a++) n[a] = $t;
    return n;
  }, "useMemoCache"), useCacheRefresh: /* @__PURE__ */ __name(function() {
    return zi;
  }, "useCacheRefresh"), useEffectEvent: /* @__PURE__ */ __name(function() {
    return Wi;
  }, "useEffectEvent") }, Yo = null, Ki = { getCacheForType: /* @__PURE__ */ __name(function() {
    throw Error("Not implemented.");
  }, "getCacheForType"), cacheSignal: /* @__PURE__ */ __name(function() {
    throw Error("Not implemented.");
  }, "cacheSignal") }, La, si;
  function bn(r) {
    if (La === void 0) try {
      throw Error();
    } catch (a) {
      var n = a.stack.trim().match(/\n( *(at )?)/);
      La = n && n[1] || "", si = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + La + r + si;
  }
  __name(bn, "bn");
  var Ha = false;
  function Go(r, n) {
    if (!r || Ha) return "";
    Ha = true;
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
              } catch (B) {
                var $ = B;
              }
              Reflect.construct(r, [], R);
            } else {
              try {
                R.call();
              } catch (B) {
                $ = B;
              }
              r.call(R.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (B) {
              $ = B;
            }
            (R = r()) && typeof R.catch == "function" && R.catch(function() {
            });
          }
        } catch (B) {
          if (B && $ && typeof B.stack == "string") return [B.stack, $.stack];
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
      Ha = false, Error.prepareStackTrace = a;
    }
    return (a = r ? r.displayName || r.name : "") ? bn(a) : "";
  }
  __name(Go, "Go");
  function ii(r) {
    if (typeof r == "string") return bn(r);
    if (typeof r == "function") return r.prototype && r.prototype.isReactComponent ? Go(r, true) : Go(r, false);
    if (typeof r == "object" && r !== null) {
      switch (r.$$typeof) {
        case _:
          return Go(r.render, false);
        case Tt:
          return Go(r.type, false);
        case At:
          var n = r, a = n._payload;
          n = n._init;
          try {
            r = n(a);
          } catch {
            return bn("Lazy");
          }
          return ii(r);
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
          a = bn(a + (n ? " [" + n + "]" : ""));
        }
        return a;
      }
    }
    switch (r) {
      case at:
        return bn("SuspenseList");
      case ue:
        return bn("Suspense");
    }
    return "";
  }
  __name(ii, "ii");
  function Sn(r, n) {
    return (500 < n.byteSize || false) && n.contentPreamble === null;
  }
  __name(Sn, "Sn");
  function Yi(r) {
    if (typeof r == "object" && r !== null && typeof r.environmentName == "string") {
      var n = r.environmentName;
      r = [r].slice(0), typeof r[0] == "string" ? r.splice(0, 1, "[%s] " + r[0], " " + n + " ") : r.splice(0, 0, "[%s]", " " + n + " "), r.unshift(console), n = ji.apply(console.error, r), n();
    } else console.error(r);
    return null;
  }
  __name(Yi, "Yi");
  function Gi(r, n, a, i, u, p, h, v, g, T, E) {
    var R = /* @__PURE__ */ new Set();
    this.destination = null, this.flushScheduled = false, this.resumableState = r, this.renderState = n, this.rootFormatContext = a, this.progressiveChunkSize = i === void 0 ? 12800 : i, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.byteSize = 0, this.abortableTasks = R, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = u === void 0 ? Yi : u, this.onPostpone = T === void 0 ? tt : T, this.onAllReady = p === void 0 ? tt : p, this.onShellReady = h === void 0 ? tt : h, this.onShellError = v === void 0 ? tt : v, this.onFatalError = g === void 0 ? tt : g, this.formState = E === void 0 ? null : E;
  }
  __name(Gi, "Gi");
  function Ji(r, n, a, i, u, p, h, v, g, T, E, R) {
    return n = new Gi(n, a, i, u, p, h, v, g, T, E, R), a = Ht(n, 0, null, i, false, false), a.parentFlushed = true, r = Jo(n, null, r, -1, null, a, null, null, n.abortableTasks, null, i, null, Di, null, null), zr(r), n.pingedTasks.push(r), n;
  }
  __name(Ji, "Ji");
  var Oe = null;
  function li(r, n) {
    r.pingedTasks.push(n), r.pingedTasks.length === 1 && (r.flushScheduled = r.destination !== null, vn(r));
  }
  __name(li, "li");
  function Ba(r, n, a, i, u) {
    return a = { status: 0, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, row: n, completedSegments: [], byteSize: 0, fallbackAbortableTasks: a, errorDigest: null, contentState: qr(), fallbackState: qr(), contentPreamble: i, fallbackPreamble: u, trackedContentKeyPath: null, trackedFallbackNode: null }, n !== null && (n.pendingTasks++, i = n.boundaries, i !== null && (r.allPendingTasks++, a.pendingTasks++, i.push(a)), r = n.inheritedHoistables, r !== null && Qt(a.contentState, r)), a;
  }
  __name(Ba, "Ba");
  function Jo(r, n, a, i, u, p, h, v, g, T, E, R, $, B, re) {
    r.allPendingTasks++, u === null ? r.pendingRootTasks++ : u.pendingTasks++, B !== null && B.pendingTasks++;
    var J = { replay: null, node: a, childIndex: i, ping: /* @__PURE__ */ __name(function() {
      return li(r, J);
    }, "ping"), blockedBoundary: u, blockedSegment: p, blockedPreamble: h, hoistableState: v, abortSet: g, keyPath: T, formatContext: E, context: R, treeContext: $, row: B, componentStack: re, thenableState: n };
    return g.add(J), J;
  }
  __name(Jo, "Jo");
  function ui(r, n, a, i, u, p, h, v, g, T, E, R, $, B) {
    r.allPendingTasks++, p === null ? r.pendingRootTasks++ : p.pendingTasks++, $ !== null && $.pendingTasks++, a.pendingTasks++;
    var re = { replay: a, node: i, childIndex: u, ping: /* @__PURE__ */ __name(function() {
      return li(r, re);
    }, "ping"), blockedBoundary: p, blockedSegment: null, blockedPreamble: null, hoistableState: h, abortSet: v, keyPath: g, formatContext: T, context: E, treeContext: R, row: $, componentStack: B, thenableState: n };
    return v.add(re), re;
  }
  __name(ui, "ui");
  function Ht(r, n, a, i, u, p) {
    return { status: 0, parentFlushed: false, id: -1, index: n, chunks: [], children: [], preambleChildren: [], parentFormatContext: i, boundary: a, lastPushedText: u, textEmbedded: p };
  }
  __name(Ht, "Ht");
  function zr(r) {
    var n = r.node;
    typeof n == "object" && n !== null && n.$$typeof === N && (r.componentStack = { parent: r.componentStack, type: n.type });
  }
  __name(zr, "zr");
  function qa(r) {
    return r === null ? null : { parent: r.parent, type: "Suspense Fallback" };
  }
  __name(qa, "qa");
  function br(r) {
    var n = {};
    return r && Object.defineProperty(n, "componentStack", { configurable: true, enumerable: true, get: /* @__PURE__ */ __name(function() {
      try {
        var a = "", i = r;
        do
          a += ii(i.type), i = i.parent;
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
  __name(br, "br");
  function Ke(r, n, a) {
    if (r = r.onError, n = r(n, a), n == null || typeof n == "string") return n;
  }
  __name(Ke, "Ke");
  function rt(r, n) {
    var a = r.onShellError, i = r.onFatalError;
    a(n), i(n), r.destination !== null ? (r.status = 14, r.destination.destroy(n)) : (r.status = 13, r.fatalError = n);
  }
  __name(rt, "rt");
  function Ee(r, n) {
    Va(r, n.next, n.hoistables);
  }
  __name(Ee, "Ee");
  function Va(r, n, a) {
    for (; n !== null; ) {
      a !== null && (Qt(n.hoistables, a), n.inheritedHoistables = a);
      var i = n.boundaries;
      if (i !== null) {
        n.boundaries = null;
        for (var u = 0; u < i.length; u++) {
          var p = i[u];
          a !== null && Qt(p.contentState, a), Sr(r, p, null, null);
        }
      }
      if (n.pendingTasks--, 0 < n.pendingTasks) break;
      a = n.hoistables, n = n.next;
    }
  }
  __name(Va, "Va");
  function Wa(r, n) {
    var a = n.boundaries;
    if (a !== null && n.pendingTasks === a.length) {
      for (var i = true, u = 0; u < a.length; u++) {
        var p = a[u];
        if (p.pendingTasks !== 1 || p.parentFlushed || Sn(r, p)) {
          i = false;
          break;
        }
      }
      i && Va(r, n, n.hoistables);
    }
  }
  __name(Wa, "Wa");
  function oo(r) {
    var n = { pendingTasks: 1, boundaries: null, hoistables: qr(), inheritedHoistables: null, together: false, next: null };
    return r !== null && 0 < r.pendingTasks && (n.pendingTasks++, n.boundaries = [], r.next = n), n;
  }
  __name(oo, "oo");
  function Ua(r, n, a, i, u) {
    var p = n.keyPath, h = n.treeContext, v = n.row;
    n.keyPath = a, a = i.length;
    var g = null;
    if (n.replay !== null) {
      var T = n.replay.slots;
      if (T !== null && typeof T == "object") for (var E = 0; E < a; E++) {
        var R = u !== "backwards" && u !== "unstable_legacy-backwards" ? E : a - 1 - E, $ = i[R];
        n.row = g = oo(g), n.treeContext = Ur(h, a, R);
        var B = T[R];
        typeof B == "number" ? (Qo(r, n, B, $, R), delete T[R]) : We(r, n, $, R), --g.pendingTasks === 0 && Ee(r, g);
      }
      else for (T = 0; T < a; T++) E = u !== "backwards" && u !== "unstable_legacy-backwards" ? T : a - 1 - T, R = i[E], n.row = g = oo(g), n.treeContext = Ur(h, a, E), We(r, n, R, E), --g.pendingTasks === 0 && Ee(r, g);
    } else if (u !== "backwards" && u !== "unstable_legacy-backwards") for (u = 0; u < a; u++) T = i[u], n.row = g = oo(g), n.treeContext = Ur(h, a, u), We(r, n, T, u), --g.pendingTasks === 0 && Ee(r, g);
    else {
      for (u = n.blockedSegment, T = u.children.length, E = u.chunks.length, R = a - 1; 0 <= R; R--) {
        $ = i[R], n.row = g = oo(g), n.treeContext = Ur(h, a, R), B = Ht(r, E, null, n.formatContext, R === 0 ? u.lastPushedText : true, true), u.children.splice(T, 0, B), n.blockedSegment = B;
        try {
          We(r, n, $, R), Vr(B.chunks, r.renderState, B.lastPushedText, B.textEmbedded), B.status = 1, --g.pendingTasks === 0 && Ee(r, g);
        } catch (re) {
          throw B.status = r.status === 12 ? 3 : 4, re;
        }
      }
      n.blockedSegment = u, u.lastPushedText = false;
    }
    v !== null && g !== null && 0 < g.pendingTasks && (v.pendingTasks++, g.next = v), n.treeContext = h, n.row = v, n.keyPath = p;
  }
  __name(Ua, "Ua");
  function ci(r, n, a, i, u, p) {
    var h = n.thenableState;
    for (n.thenableState = null, Zt = {}, Na = n, ja = r, Da = a, to = eo = 0, ro = -1, zo = 0, gn = h, r = i(u, p); Uo; ) Uo = false, to = eo = 0, ro = -1, zo = 0, Ko += 1, Se = null, r = i(u, p);
    return no(), r;
  }
  __name(ci, "ci");
  function pi(r, n, a, i, u, p, h) {
    var v = false;
    if (p !== 0 && r.formState !== null) {
      var g = n.blockedSegment;
      if (g !== null) {
        v = true, g = g.chunks;
        for (var T = 0; T < p; T++) T === h ? g.push("<!--F!-->") : g.push("<!--F-->");
      }
    }
    p = n.keyPath, n.keyPath = a, u ? (a = n.treeContext, n.treeContext = Ur(a, 1, 0), We(r, n, i, -1), n.treeContext = a) : v ? We(r, n, i, -1) : xt(r, n, i, -1), n.keyPath = p;
  }
  __name(pi, "pi");
  function Xo(r, n, a, i, u, p) {
    if (typeof i == "function") if (i.prototype && i.prototype.isReactComponent) {
      var h = u;
      if ("ref" in u) {
        h = {};
        for (var v in u) v !== "ref" && (h[v] = u[v]);
      }
      var g = i.defaultProps;
      if (g) {
        h === u && (h = Y({}, h, u));
        for (var T in g) h[T] === void 0 && (h[T] = g[T]);
      }
      u = h, h = Ys, g = i.contextType, typeof g == "object" && g !== null && (h = g._currentValue2), h = new i(u, h);
      var E = h.state !== void 0 ? h.state : null;
      if (h.updater = Js, h.props = u, h.state = E, g = { queue: [], replace: false }, h._reactInternals = g, p = i.contextType, h.context = typeof p == "object" && p !== null ? p._currentValue2 : Ys, p = i.getDerivedStateFromProps, typeof p == "function" && (p = p(u, E), E = p == null ? E : Y({}, E, p), h.state = E), typeof i.getDerivedStateFromProps != "function" && typeof h.getSnapshotBeforeUpdate != "function" && (typeof h.UNSAFE_componentWillMount == "function" || typeof h.componentWillMount == "function")) if (i = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), i !== h.state && Js.enqueueReplaceState(h, h.state, null), g.queue !== null && 0 < g.queue.length) if (i = g.queue, p = g.replace, g.queue = null, g.replace = false, p && i.length === 1) h.state = i[0];
      else {
        for (g = p ? i[0] : h.state, E = true, p = p ? 1 : 0; p < i.length; p++) T = i[p], T = typeof T == "function" ? T.call(h, g, u, void 0) : T, T != null && (E ? (E = false, g = Y({}, g, T)) : Y(g, T));
        h.state = g;
      }
      else g.queue = null;
      if (i = h.render(), r.status === 12) throw null;
      u = n.keyPath, n.keyPath = a, xt(r, n, i, -1), n.keyPath = u;
    } else {
      if (i = ci(r, n, a, i, u, void 0), r.status === 12) throw null;
      pi(r, n, a, i, eo !== 0, to, ro);
    }
    else if (typeof i == "string") if (h = n.blockedSegment, h === null) h = u.children, g = n.formatContext, E = n.keyPath, n.formatContext = G(g, i, u), n.keyPath = a, We(r, n, h, -1), n.formatContext = g, n.keyPath = E;
    else {
      if (E = jo(h.chunks, i, u, r.resumableState, r.renderState, n.blockedPreamble, n.hoistableState, n.formatContext, h.lastPushedText), h.lastPushedText = false, g = n.formatContext, p = n.keyPath, n.keyPath = a, (n.formatContext = G(g, i, u)).insertionMode === 3) {
        a = Ht(r, 0, null, n.formatContext, false, false), h.preambleChildren.push(a), n.blockedSegment = a;
        try {
          a.status = 6, We(r, n, E, -1), Vr(a.chunks, r.renderState, a.lastPushedText, a.textEmbedded), a.status = 1;
        } finally {
          n.blockedSegment = h;
        }
      } else We(r, n, E, -1);
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
        n.push(hr(i));
      }
      h.lastPushedText = false;
    }
    else {
      switch (i) {
        case cn:
        case D:
        case xe:
        case V:
          i = n.keyPath, n.keyPath = a, xt(r, n, u.children, -1), n.keyPath = i;
          return;
        case jr:
          i = n.blockedSegment, i === null ? u.mode !== "hidden" && (i = n.keyPath, n.keyPath = a, We(r, n, u.children, -1), n.keyPath = i) : u.mode !== "hidden" && (r.renderState.generateStaticMarkup || i.chunks.push("<!--&-->"), i.lastPushedText = false, h = n.keyPath, n.keyPath = a, We(r, n, u.children, -1), n.keyPath = h, r.renderState.generateStaticMarkup || i.chunks.push("<!--/&-->"), i.lastPushedText = false);
          return;
        case at:
          e: {
            if (i = u.children, u = u.revealOrder, u === "forwards" || u === "backwards" || u === "unstable_legacy-backwards") {
              if (Mr(i)) {
                Ua(r, n, a, i, u);
                break e;
              }
              if ((h = pn(i)) && (h = h.call(i))) {
                if (g = h.next(), !g.done) {
                  do
                    g = h.next();
                  while (!g.done);
                  Ua(r, n, a, i, u);
                }
                break e;
              }
            }
            u === "together" ? (u = n.keyPath, h = n.row, g = n.row = oo(null), g.boundaries = [], g.together = true, n.keyPath = a, xt(r, n, i, -1), --g.pendingTasks === 0 && Ee(r, g), n.keyPath = u, n.row = h, h !== null && 0 < g.pendingTasks && (h.pendingTasks++, g.next = h)) : (u = n.keyPath, n.keyPath = a, xt(r, n, i, -1), n.keyPath = u);
          }
          return;
        case Io:
        case Nr:
          throw Error("ReactDOMServer does not yet support scope components.");
        case ue:
          e: if (n.replay !== null) {
            i = n.keyPath, h = n.formatContext, g = n.row, n.keyPath = a, n.formatContext = Ao(r.resumableState, h), n.row = null, a = u.children;
            try {
              We(r, n, a, -1);
            } finally {
              n.keyPath = i, n.formatContext = h, n.row = g;
            }
          } else {
            i = n.keyPath, p = n.formatContext;
            var R = n.row, $ = n.blockedBoundary;
            T = n.blockedPreamble;
            var B = n.hoistableState;
            v = n.blockedSegment;
            var re = u.fallback;
            u = u.children;
            var J = /* @__PURE__ */ new Set(), X = Ba(r, n.row, J, null, null);
            r.trackedPostpones !== null && (X.trackedContentKeyPath = a);
            var U = Ht(r, v.chunks.length, X, n.formatContext, false, false);
            v.children.push(U), v.lastPushedText = false;
            var Q = Ht(r, 0, null, n.formatContext, false, false);
            if (Q.parentFlushed = true, r.trackedPostpones !== null) {
              h = n.componentStack, g = [a[0], "Suspense Fallback", a[2]], E = [g[1], g[2], [], null], r.trackedPostpones.workingMap.set(g, E), X.trackedFallbackNode = E, n.blockedSegment = U, n.blockedPreamble = X.fallbackPreamble, n.keyPath = g, n.formatContext = Ca(r.resumableState, p), n.componentStack = qa(h), U.status = 6;
              try {
                We(r, n, re, -1), Vr(U.chunks, r.renderState, U.lastPushedText, U.textEmbedded), U.status = 1;
              } catch (ve) {
                throw U.status = r.status === 12 ? 3 : 4, ve;
              } finally {
                n.blockedSegment = v, n.blockedPreamble = T, n.keyPath = i, n.formatContext = p;
              }
              n = Jo(r, null, u, -1, X, Q, X.contentPreamble, X.contentState, n.abortSet, a, Ao(r.resumableState, n.formatContext), n.context, n.treeContext, null, h), zr(n), r.pingedTasks.push(n);
            } else {
              n.blockedBoundary = X, n.blockedPreamble = X.contentPreamble, n.hoistableState = X.contentState, n.blockedSegment = Q, n.keyPath = a, n.formatContext = Ao(r.resumableState, p), n.row = null, Q.status = 6;
              try {
                if (We(r, n, u, -1), Vr(Q.chunks, r.renderState, Q.lastPushedText, Q.textEmbedded), Q.status = 1, io(X, Q), X.pendingTasks === 0 && X.status === 0) {
                  if (X.status = 1, !Sn(r, X)) {
                    R !== null && --R.pendingTasks === 0 && Ee(r, R), r.pendingRootTasks === 0 && n.blockedPreamble && Kr(r);
                    break e;
                  }
                } else R !== null && R.together && Wa(r, R);
              } catch (ve) {
                X.status = 4, r.status === 12 ? (Q.status = 3, h = r.fatalError) : (Q.status = 4, h = ve), g = br(n.componentStack), E = Ke(r, h, g), X.errorDigest = E, ao(r, X);
              } finally {
                n.blockedBoundary = $, n.blockedPreamble = T, n.hoistableState = B, n.blockedSegment = v, n.keyPath = i, n.formatContext = p, n.row = R;
              }
              n = Jo(r, null, re, -1, $, U, X.fallbackPreamble, X.fallbackState, J, [a[0], "Suspense Fallback", a[2]], Ca(r.resumableState, n.formatContext), n.context, n.treeContext, n.row, qa(n.componentStack)), zr(n), r.pingedTasks.push(n);
            }
          }
          return;
      }
      if (typeof i == "object" && i !== null) switch (i.$$typeof) {
        case _:
          if ("ref" in u) for (re in h = {}, u) re !== "ref" && (h[re] = u[re]);
          else h = u;
          i = ci(r, n, a, i.render, h, p), pi(r, n, a, i, eo !== 0, to, ro);
          return;
        case Tt:
          Xo(r, n, a, i.type, u, p);
          return;
        case q:
          if (g = u.children, h = n.keyPath, u = u.value, E = i._currentValue2, i._currentValue2 = u, p = Wr, Wr = i = { parent: p, depth: p === null ? 0 : p.depth + 1, context: i, parentValue: E, value: u }, n.context = i, n.keyPath = a, xt(r, n, g, -1), r = Wr, r === null) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
          r.context._currentValue2 = r.parentValue, r = Wr = r.parent, n.context = r, n.keyPath = h;
          return;
        case qe:
          u = u.children, i = u(i._context._currentValue2), u = n.keyPath, n.keyPath = a, xt(r, n, i, -1), n.keyPath = u;
          return;
        case At:
          if (h = i._init, i = h(i._payload), r.status === 12) throw null;
          Xo(r, n, a, i, u, p);
          return;
      }
      throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((i == null ? i : typeof i) + "."));
    }
  }
  __name(Xo, "Xo");
  function Qo(r, n, a, i, u) {
    var p = n.replay, h = n.blockedBoundary, v = Ht(r, 0, null, n.formatContext, false, false);
    v.id = a, v.parentFlushed = true;
    try {
      n.replay = null, n.blockedSegment = v, We(r, n, i, u), v.status = 1, h === null ? r.completedRootSegment = v : (io(h, v), h.parentFlushed && r.partialBoundaries.push(h));
    } finally {
      n.replay = p, n.blockedSegment = null;
    }
  }
  __name(Qo, "Qo");
  function xt(r, n, a, i) {
    n.replay !== null && typeof n.replay.slots == "number" ? Qo(r, n, n.replay.slots, a, i) : (n.node = a, n.childIndex = i, a = n.componentStack, zr(n), Zo(r, n), n.componentStack = a);
  }
  __name(xt, "xt");
  function Zo(r, n) {
    var a = n.node, i = n.childIndex;
    if (a !== null) {
      if (typeof a == "object") {
        switch (a.$$typeof) {
          case N:
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
                      if (Xo(r, n, p, u, h, v), n.replay.pendingTasks === 1 && 0 < n.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                      n.replay.pendingTasks--;
                    } catch (ce) {
                      if (typeof ce == "object" && ce !== null && (ce === yt || typeof ce.then == "function")) throw n.node === T ? n.replay = E : i.splice(a, 1), ce;
                      n.replay.pendingTasks--, h = br(n.componentStack), p = r, r = n.blockedBoundary, u = ce, h = Ke(p, u, h), so(p, r, $, g, u, h);
                    }
                    n.replay = E;
                  } else {
                    if (u !== ue) throw Error("Expected the resume to render <Suspense> in this slot but instead it rendered <" + (Ie(u) || "Unknown") + ">. The tree doesn't match so React will fallback to client rendering.");
                    t: {
                      E = void 0, u = R[5], v = R[2], g = R[3], T = R[4] === null ? [] : R[4][2], R = R[4] === null ? null : R[4][3];
                      var B = n.keyPath, re = n.formatContext, J = n.row, X = n.replay, U = n.blockedBoundary, Q = n.hoistableState, ve = h.children, Pe = h.fallback, oe = /* @__PURE__ */ new Set();
                      h = Ba(r, n.row, oe, null, null), h.parentFlushed = true, h.rootSegmentID = u, n.blockedBoundary = h, n.hoistableState = h.contentState, n.keyPath = p, n.formatContext = Ao(r.resumableState, re), n.row = null, n.replay = { nodes: v, slots: g, pendingTasks: 1 };
                      try {
                        if (We(r, n, ve, -1), n.replay.pendingTasks === 1 && 0 < n.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                        if (n.replay.pendingTasks--, h.pendingTasks === 0 && h.status === 0) {
                          h.status = 1, r.completedBoundaries.push(h);
                          break t;
                        }
                      } catch (ce) {
                        h.status = 4, $ = br(n.componentStack), E = Ke(r, ce, $), h.errorDigest = E, n.replay.pendingTasks--, r.clientRenderedBoundaries.push(h);
                      } finally {
                        n.blockedBoundary = U, n.hoistableState = Q, n.replay = X, n.keyPath = B, n.formatContext = re, n.row = J;
                      }
                      $ = ui(r, null, { nodes: T, slots: R, pendingTasks: 0 }, Pe, -1, U, h.fallbackState, oe, [p[0], "Suspense Fallback", p[2]], Ca(r.resumableState, n.formatContext), n.context, n.treeContext, n.row, qa(n.componentStack)), zr($), r.pingedTasks.push($);
                    }
                  }
                  i.splice(a, 1);
                  break e;
                }
              }
            }
            else Xo(r, n, p, u, h, v);
            return;
          case F:
            throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
          case At:
            if ($ = a._init, a = $(a._payload), r.status === 12) throw null;
            xt(r, n, a, i);
            return;
        }
        if (Mr(a)) {
          kn(r, n, a, i);
          return;
        }
        if (($ = pn(a)) && ($ = $.call(a))) {
          if (a = $.next(), !a.done) {
            h = [];
            do
              h.push(a.value), a = $.next();
            while (!a.done);
            kn(r, n, h, i);
          }
          return;
        }
        if (typeof a.then == "function") return n.thenableState = null, xt(r, n, oi(a), i);
        if (a.$$typeof === q) return xt(r, n, a._currentValue2, i);
        throw i = Object.prototype.toString.call(a), Error("Objects are not valid as a React child (found: " + (i === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : i) + "). If you meant to render a collection of children, use an array instead.");
      }
      typeof a == "string" ? (i = n.blockedSegment, i !== null && (i.lastPushedText = Xn(i.chunks, a, r.renderState, i.lastPushedText))) : (typeof a == "number" || typeof a == "bigint") && (i = n.blockedSegment, i !== null && (i.lastPushedText = Xn(i.chunks, "" + a, r.renderState, i.lastPushedText)));
    }
  }
  __name(Zo, "Zo");
  function kn(r, n, a, i) {
    var u = n.keyPath;
    if (i !== -1 && (n.keyPath = [n.keyPath, "Fragment", i], n.replay !== null)) {
      for (var p = n.replay, h = p.nodes, v = 0; v < h.length; v++) {
        var g = h[v];
        if (g[1] === i) {
          i = g[2], g = g[3], n.replay = { nodes: i, slots: g, pendingTasks: 1 };
          try {
            if (kn(r, n, a, -1), n.replay.pendingTasks === 1 && 0 < n.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
            n.replay.pendingTasks--;
          } catch (R) {
            if (typeof R == "object" && R !== null && (R === yt || typeof R.then == "function")) throw R;
            n.replay.pendingTasks--, a = br(n.componentStack);
            var T = n.blockedBoundary, E = R;
            a = Ke(r, E, a), so(r, T, i, g, E, a);
          }
          n.replay = p, h.splice(v, 1);
          break;
        }
      }
      n.keyPath = u;
      return;
    }
    if (p = n.treeContext, h = a.length, n.replay !== null && (v = n.replay.slots, v !== null && typeof v == "object")) {
      for (i = 0; i < h; i++) g = a[i], n.treeContext = Ur(p, h, i), T = v[i], typeof T == "number" ? (Qo(r, n, T, g, i), delete v[i]) : We(r, n, g, i);
      n.treeContext = p, n.keyPath = u;
      return;
    }
    for (v = 0; v < h; v++) i = a[v], n.treeContext = Ur(p, h, v), We(r, n, i, v);
    n.treeContext = p, n.keyPath = u;
  }
  __name(kn, "kn");
  function za(r, n, a) {
    if (a.status = 5, a.rootSegmentID = r.nextSegmentId++, r = a.trackedContentKeyPath, r === null) throw Error("It should not be possible to postpone at the root. This is a bug in React.");
    var i = a.trackedFallbackNode, u = [], p = n.workingMap.get(r);
    return p === void 0 ? (a = [r[1], r[2], u, null, i, a.rootSegmentID], n.workingMap.set(r, a), Bt(a, r[0], n), a) : (p[4] = i, p[5] = a.rootSegmentID, p);
  }
  __name(za, "za");
  function ea(r, n, a, i) {
    i.status = 5;
    var u = a.keyPath, p = a.blockedBoundary;
    if (p === null) i.id = r.nextSegmentId++, n.rootSlots = i.id, r.completedRootSegment !== null && (r.completedRootSegment.status = 5);
    else {
      if (p !== null && p.status === 0) {
        var h = za(r, n, p);
        if (p.trackedContentKeyPath === u && a.childIndex === -1) {
          i.id === -1 && (i.id = i.parentFlushed ? p.rootSegmentID : r.nextSegmentId++), h[3] = i.id;
          return;
        }
      }
      if (i.id === -1 && (i.id = i.parentFlushed && p !== null ? p.rootSegmentID : r.nextSegmentId++), a.childIndex === -1) u === null ? n.rootSlots = i.id : (a = n.workingMap.get(u), a === void 0 ? (a = [u[1], u[2], [], i.id], Bt(a, u[0], n)) : a[3] = i.id);
      else {
        if (u === null) {
          if (r = n.rootSlots, r === null) r = n.rootSlots = {};
          else if (typeof r == "number") throw Error("It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React.");
        } else if (p = n.workingMap, h = p.get(u), h === void 0) r = {}, h = [u[1], u[2], [], r], p.set(u, h), Bt(h, u[0], n);
        else if (r = h[3], r === null) r = h[3] = {};
        else if (typeof r == "number") throw Error("It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React.");
        r[a.childIndex] = i.id;
      }
    }
  }
  __name(ea, "ea");
  function ao(r, n) {
    r = r.trackedPostpones, r !== null && (n = n.trackedContentKeyPath, n !== null && (n = r.workingMap.get(n), n !== void 0 && (n.length = 4, n[2] = [], n[3] = null)));
  }
  __name(ao, "ao");
  function ta(r, n, a) {
    return ui(r, a, n.replay, n.node, n.childIndex, n.blockedBoundary, n.hoistableState, n.abortSet, n.keyPath, n.formatContext, n.context, n.treeContext, n.row, n.componentStack);
  }
  __name(ta, "ta");
  function di(r, n, a) {
    var i = n.blockedSegment, u = Ht(r, i.chunks.length, null, n.formatContext, i.lastPushedText, true);
    return i.children.push(u), i.lastPushedText = false, Jo(r, a, n.node, n.childIndex, n.blockedBoundary, u, n.blockedPreamble, n.hoistableState, n.abortSet, n.keyPath, n.formatContext, n.context, n.treeContext, n.row, n.componentStack);
  }
  __name(di, "di");
  function We(r, n, a, i) {
    var u = n.formatContext, p = n.context, h = n.keyPath, v = n.treeContext, g = n.componentStack, T = n.blockedSegment;
    if (T === null) {
      T = n.replay;
      try {
        return xt(r, n, a, i);
      } catch ($) {
        if (no(), a = $ === yt ? Vo() : $, r.status !== 12 && typeof a == "object" && a !== null) {
          if (typeof a.then == "function") {
            i = $ === yt ? yn() : null, r = ta(r, n, i).ping, a.then(r, r), n.formatContext = u, n.context = p, n.keyPath = h, n.treeContext = v, n.componentStack = g, n.replay = T, gr(p);
            return;
          }
          if (a.message === "Maximum call stack size exceeded") {
            a = $ === yt ? yn() : null, a = ta(r, n, a), r.pingedTasks.push(a), n.formatContext = u, n.context = p, n.keyPath = h, n.treeContext = v, n.componentStack = g, n.replay = T, gr(p);
            return;
          }
        }
      }
    } else {
      var E = T.children.length, R = T.chunks.length;
      try {
        return xt(r, n, a, i);
      } catch ($) {
        if (no(), T.children.length = E, T.chunks.length = R, a = $ === yt ? Vo() : $, r.status !== 12 && typeof a == "object" && a !== null) {
          if (typeof a.then == "function") {
            T = a, a = $ === yt ? yn() : null, r = di(r, n, a).ping, T.then(r, r), n.formatContext = u, n.context = p, n.keyPath = h, n.treeContext = v, n.componentStack = g, gr(p);
            return;
          }
          if (a.message === "Maximum call stack size exceeded") {
            T = $ === yt ? yn() : null, T = di(r, n, T), r.pingedTasks.push(T), n.formatContext = u, n.context = p, n.keyPath = h, n.treeContext = v, n.componentStack = g, gr(p);
            return;
          }
        }
      }
    }
    throw n.formatContext = u, n.context = p, n.keyPath = h, n.treeContext = v, gr(p), a;
  }
  __name(We, "We");
  function Ka(r) {
    var n = r.blockedBoundary, a = r.blockedSegment;
    a !== null && (a.status = 3, Sr(this, n, r.row, a));
  }
  __name(Ka, "Ka");
  function so(r, n, a, i, u, p) {
    for (var h = 0; h < a.length; h++) {
      var v = a[h];
      if (v.length === 4) so(r, n, v[2], v[3], u, p);
      else {
        v = v[5];
        var g = r, T = p, E = Ba(g, null, /* @__PURE__ */ new Set(), null, null);
        E.parentFlushed = true, E.rootSegmentID = v, E.status = 4, E.errorDigest = T, E.parentFlushed && g.clientRenderedBoundaries.push(E);
      }
    }
    if (a.length = 0, i !== null) {
      if (n === null) throw Error("We should not have any resumable nodes in the shell. This is a bug in React.");
      if (n.status !== 4 && (n.status = 4, n.errorDigest = p, n.parentFlushed && r.clientRenderedBoundaries.push(n)), typeof i == "object") for (var R in i) delete i[R];
    }
  }
  __name(so, "so");
  function Ya(r, n, a) {
    var i = r.blockedBoundary, u = r.blockedSegment;
    if (u !== null) {
      if (u.status === 6) return;
      u.status = 3;
    }
    var p = br(r.componentStack);
    if (i === null) {
      if (n.status !== 13 && n.status !== 14) {
        if (i = r.replay, i === null) {
          n.trackedPostpones !== null && u !== null ? (i = n.trackedPostpones, Ke(n, a, p), ea(n, i, r, u), Sr(n, null, r.row, u)) : (Ke(n, a, p), rt(n, a));
          return;
        }
        i.pendingTasks--, i.pendingTasks === 0 && 0 < i.nodes.length && (u = Ke(n, a, p), so(n, null, i.nodes, i.slots, a, u)), n.pendingRootTasks--, n.pendingRootTasks === 0 && Ja(n);
      }
    } else {
      var h = n.trackedPostpones;
      if (i.status !== 4) {
        if (h !== null && u !== null) return Ke(n, a, p), ea(n, h, r, u), i.fallbackAbortableTasks.forEach(function(v) {
          return Ya(v, n, a);
        }), i.fallbackAbortableTasks.clear(), Sr(n, i, r.row, u);
        i.status = 4, u = Ke(n, a, p), i.status = 4, i.errorDigest = u, ao(n, i), i.parentFlushed && n.clientRenderedBoundaries.push(i);
      }
      i.pendingTasks--, u = i.row, u !== null && --u.pendingTasks === 0 && Ee(n, u), i.fallbackAbortableTasks.forEach(function(v) {
        return Ya(v, n, a);
      }), i.fallbackAbortableTasks.clear();
    }
    r = r.row, r !== null && --r.pendingTasks === 0 && Ee(n, r), n.allPendingTasks--, n.allPendingTasks === 0 && ra(n);
  }
  __name(Ya, "Ya");
  function Ga(r, n) {
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
              var E = T.value, R = E.props, $ = R.href, B = E.props, re = Jn(B.href, "style", { crossOrigin: B.crossOrigin, integrity: B.integrity, nonce: B.nonce, type: B.type, fetchPriority: B.fetchPriority, referrerPolicy: B.referrerPolicy, media: B.media });
              if (0 <= (u.remainingCapacity -= re.length + 2)) a.resets.style[$] = W, p && (p += ", "), p += re, a.resets.style[$] = typeof R.crossOrigin == "string" || typeof R.integrity == "string" ? [R.crossOrigin, R.integrity] : W;
              else break e;
            }
          }
          i(p ? { Link: p } : {});
        }
      }
    } catch (J) {
      Ke(r, J, {});
    }
  }
  __name(Ga, "Ga");
  function Ja(r) {
    r.trackedPostpones === null && Ga(r, true), r.trackedPostpones === null && Kr(r), r.onShellError = tt, r = r.onShellReady, r();
  }
  __name(Ja, "Ja");
  function ra(r) {
    Ga(r, r.trackedPostpones === null ? true : r.completedRootSegment === null || r.completedRootSegment.status !== 5), Kr(r), r = r.onAllReady, r();
  }
  __name(ra, "ra");
  function io(r, n) {
    if (n.chunks.length === 0 && n.children.length === 1 && n.children[0].boundary === null && n.children[0].id === -1) {
      var a = n.children[0];
      a.id = n.id, a.parentFlushed = true, a.status !== 1 && a.status !== 3 && a.status !== 4 || io(r, a);
    } else r.completedSegments.push(n);
  }
  __name(io, "io");
  function Sr(r, n, a, i) {
    if (a !== null && (--a.pendingTasks === 0 ? Ee(r, a) : a.together && Wa(r, a)), r.allPendingTasks--, n === null) {
      if (i !== null && i.parentFlushed) {
        if (r.completedRootSegment !== null) throw Error("There can only be one root segment. This is a bug in React.");
        r.completedRootSegment = i;
      }
      r.pendingRootTasks--, r.pendingRootTasks === 0 && Ja(r);
    } else if (n.pendingTasks--, n.status !== 4) if (n.pendingTasks === 0) {
      if (n.status === 0 && (n.status = 1), i !== null && i.parentFlushed && (i.status === 1 || i.status === 3) && io(n, i), n.parentFlushed && r.completedBoundaries.push(n), n.status === 1) a = n.row, a !== null && Qt(a.hoistables, n.contentState), Sn(r, n) || (n.fallbackAbortableTasks.forEach(Ka, r), n.fallbackAbortableTasks.clear(), a !== null && --a.pendingTasks === 0 && Ee(r, a)), r.pendingRootTasks === 0 && r.trackedPostpones === null && n.contentPreamble !== null && Kr(r);
      else if (n.status === 5 && (n = n.row, n !== null)) {
        if (r.trackedPostpones !== null) {
          a = r.trackedPostpones;
          var u = n.next;
          if (u !== null && (i = u.boundaries, i !== null)) for (u.boundaries = null, u = 0; u < i.length; u++) {
            var p = i[u];
            za(r, a, p), Sr(r, p, null, null);
          }
        }
        --n.pendingTasks === 0 && Ee(r, n);
      }
    } else i === null || !i.parentFlushed || i.status !== 1 && i.status !== 3 || (io(n, i), n.completedSegments.length === 1 && n.parentFlushed && r.partialBoundaries.push(n)), n = n.row, n !== null && n.together && Wa(r, n);
    r.allPendingTasks === 0 && ra(r);
  }
  __name(Sr, "Sr");
  function vn(r) {
    if (r.status !== 14 && r.status !== 13) {
      var n = Wr, a = S.H;
      S.H = ai;
      var i = S.A;
      S.A = Ki;
      var u = Oe;
      Oe = r;
      var p = Yo;
      Yo = r.resumableState;
      try {
        var h = r.pingedTasks, v;
        for (v = 0; v < h.length; v++) {
          var g = h[v], T = r, E = g.blockedSegment;
          if (E === null) {
            var R = T;
            if (g.replay.pendingTasks !== 0) {
              gr(g.context);
              try {
                if (typeof g.replay.slots == "number" ? Qo(R, g, g.replay.slots, g.node, g.childIndex) : Zo(R, g), g.replay.pendingTasks === 1 && 0 < g.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                g.replay.pendingTasks--, g.abortSet.delete(g), Sr(R, g.blockedBoundary, g.row, null);
              } catch (Te) {
                no();
                var $ = Te === yt ? Vo() : Te;
                if (typeof $ == "object" && $ !== null && typeof $.then == "function") {
                  var B = g.ping;
                  $.then(B, B), g.thenableState = Te === yt ? yn() : null;
                } else {
                  g.replay.pendingTasks--, g.abortSet.delete(g);
                  var re = br(g.componentStack);
                  T = void 0;
                  var J = R, X = g.blockedBoundary, U = R.status === 12 ? R.fatalError : $, Q = g.replay.nodes, ve = g.replay.slots;
                  T = Ke(J, U, re), so(J, X, Q, ve, U, T), R.pendingRootTasks--, R.pendingRootTasks === 0 && Ja(R), R.allPendingTasks--, R.allPendingTasks === 0 && ra(R);
                }
              }
            }
          } else if (R = void 0, J = E, J.status === 0) {
            J.status = 6, gr(g.context);
            var Pe = J.children.length, oe = J.chunks.length;
            try {
              Zo(T, g), Vr(J.chunks, T.renderState, J.lastPushedText, J.textEmbedded), g.abortSet.delete(g), J.status = 1, Sr(T, g.blockedBoundary, g.row, J);
            } catch (Te) {
              no(), J.children.length = Pe, J.chunks.length = oe;
              var ce = Te === yt ? Vo() : T.status === 12 ? T.fatalError : Te;
              if (T.status === 12 && T.trackedPostpones !== null) {
                var ne = T.trackedPostpones, lt = br(g.componentStack);
                g.abortSet.delete(g), Ke(T, ce, lt), ea(T, ne, g, J), Sr(T, g.blockedBoundary, g.row, J);
              } else if (typeof ce == "object" && ce !== null && typeof ce.then == "function") {
                J.status = 0, g.thenableState = Te === yt ? yn() : null;
                var ae = g.ping;
                ce.then(ae, ae);
              } else {
                var bt = br(g.componentStack);
                g.abortSet.delete(g), J.status = 4;
                var fe = g.blockedBoundary, Me = g.row;
                if (Me !== null && --Me.pendingTasks === 0 && Ee(T, Me), T.allPendingTasks--, R = Ke(T, ce, bt), fe === null) rt(T, ce);
                else if (fe.pendingTasks--, fe.status !== 4) {
                  fe.status = 4, fe.errorDigest = R, ao(T, fe);
                  var He = fe.row;
                  He !== null && --He.pendingTasks === 0 && Ee(T, He), fe.parentFlushed && T.clientRenderedBoundaries.push(fe), T.pendingRootTasks === 0 && T.trackedPostpones === null && fe.contentPreamble !== null && Kr(T);
                }
                T.allPendingTasks === 0 && ra(T);
              }
            }
          }
        }
        h.splice(0, v), r.destination !== null && xn(r, r.destination);
      } catch (Te) {
        Ke(r, Te, {}), rt(r, Te);
      } finally {
        Yo = p, S.H = a, S.A = i, a === ai && gr(n), Oe = u;
      }
    }
  }
  __name(vn, "vn");
  function Tn(r, n, a) {
    n.preambleChildren.length && a.push(n.preambleChildren);
    for (var i = false, u = 0; u < n.children.length; u++) i = na(r, n.children[u], a) || i;
    return i;
  }
  __name(Tn, "Tn");
  function na(r, n, a) {
    var i = n.boundary;
    if (i === null) return Tn(r, n, a);
    var u = i.contentPreamble, p = i.fallbackPreamble;
    if (u === null || p === null) return false;
    switch (i.status) {
      case 1:
        if (Do(r.renderState, u), r.byteSize += i.byteSize, n = i.completedSegments[0], !n) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
        return Tn(r, n, a);
      case 5:
        if (r.trackedPostpones !== null) return true;
      case 4:
        if (n.status === 1) return Do(r.renderState, p), Tn(r, n, a);
      default:
        return true;
    }
  }
  __name(na, "na");
  function Kr(r) {
    if (r.completedRootSegment && r.completedPreambleSegments === null) {
      var n = [], a = r.byteSize, i = na(r, r.completedRootSegment, n), u = r.renderState.preamble;
      i === false || u.headChunks && u.bodyChunks ? r.completedPreambleSegments = n : r.byteSize = a;
    }
  }
  __name(Kr, "Kr");
  function Cn(r, n, a, i) {
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
          u = lo(r, n, u, i);
        }
        for (; h < p.length - 1; h++) n.push(p[h]);
        return h < p.length && (u = n.push(p[h])), u;
      case 3:
        return true;
      default:
        throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
    }
  }
  __name(Cn, "Cn");
  var Yr = 0;
  function lo(r, n, a, i) {
    var u = a.boundary;
    if (u === null) return Cn(r, n, a, i);
    if (u.parentFlushed = true, u.status === 4) {
      var p = u.row;
      return p !== null && --p.pendingTasks === 0 && Ee(r, p), r.renderState.generateStaticMarkup || (u = u.errorDigest, n.push("<!--$!-->"), n.push("<template"), u && (n.push(' data-dgst="'), u = H(u), n.push(u), n.push('"')), n.push("></template>")), Cn(r, n, a, i), r = r.renderState.generateStaticMarkup ? true : n.push("<!--/$-->"), r;
    }
    if (u.status !== 1) return u.status === 0 && (u.rootSegmentID = r.nextSegmentId++), 0 < u.completedSegments.length && r.partialBoundaries.push(u), Ct(n, r.renderState, u.rootSegmentID), i && Qt(i, u.fallbackState), Cn(r, n, a, i), n.push("<!--/$-->");
    if (!oa && Sn(r, u) && Yr + u.byteSize > r.progressiveChunkSize) return u.rootSegmentID = r.nextSegmentId++, r.completedBoundaries.push(u), Ct(n, r.renderState, u.rootSegmentID), Cn(r, n, a, i), n.push("<!--/$-->");
    if (Yr += u.byteSize, i && Qt(i, u.contentState), a = u.row, a !== null && Sn(r, u) && --a.pendingTasks === 0 && Ee(r, a), r.renderState.generateStaticMarkup || n.push("<!--$-->"), a = u.completedSegments, a.length !== 1) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
    return lo(r, n, a[0], i), r = r.renderState.generateStaticMarkup ? true : n.push("<!--/$-->"), r;
  }
  __name(lo, "lo");
  function Xa(r, n, a, i) {
    return Ls(n, r.renderState, a.parentFormatContext, a.id), lo(r, n, a, i), Hs(n, a.parentFormatContext);
  }
  __name(Xa, "Xa");
  function Gr(r, n, a) {
    Yr = a.byteSize;
    for (var i = a.completedSegments, u = 0; u < i.length; u++) Qa(r, n, a, i[u]);
    i.length = 0, i = a.row, i !== null && Sn(r, a) && --i.pendingTasks === 0 && Ee(r, i), Mo(n, a.contentState, r.renderState), i = r.resumableState, r = r.renderState, u = a.rootSegmentID, a = a.contentState;
    var p = r.stylesToHoist;
    return r.stylesToHoist = false, n.push(r.startInlineScript), n.push(">"), p ? ((i.instructions & 4) === 0 && (i.instructions |= 4, n.push('$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};')), (i.instructions & 2) === 0 && (i.instructions |= 2, n.push(`$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`)), (i.instructions & 8) === 0 ? (i.instructions |= 8, n.push(`$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=e[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&$RM.set(b.getAttribute("href"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement("link");a.href=d;a.rel=
"stylesheet";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute("media");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=
"$~";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,"CSS failed to load"))};$RR("`)) : n.push('$RR("')) : ((i.instructions & 2) === 0 && (i.instructions |= 2, n.push(`$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`)), n.push('$RC("')), i = u.toString(16), n.push(r.boundaryPrefix), n.push(i), n.push('","'), n.push(r.segmentPrefix), n.push(i), p ? (n.push('",'), me(n, a)) : n.push('"'), a = n.push(")<\/script>"), Yn(n, r) && a;
  }
  __name(Gr, "Gr");
  function Qa(r, n, a, i) {
    if (i.status === 2) return true;
    var u = a.contentState, p = i.id;
    if (p === -1) {
      if ((i.id = a.rootSegmentID) === -1) throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
      return Xa(r, n, i, u);
    }
    return p === a.rootSegmentID ? Xa(r, n, i, u) : (Xa(r, n, i, u), a = r.resumableState, r = r.renderState, n.push(r.startInlineScript), n.push(">"), (a.instructions & 1) === 0 ? (a.instructions |= 1, n.push('$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')) : n.push('$RS("'), n.push(r.segmentPrefix), p = p.toString(16), n.push(p), n.push('","'), n.push(r.placeholderPrefix), n.push(p), n = n.push('")<\/script>'), n);
  }
  __name(Qa, "Qa");
  var oa = false;
  function xn(r, n) {
    try {
      if (!(0 < r.pendingRootTasks)) {
        var a, i = r.completedRootSegment;
        if (i !== null) {
          if (i.status === 5) return;
          var u = r.completedPreambleSegments;
          if (u === null) return;
          Yr = r.byteSize;
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
          $.length = 0, h.preconnects.forEach(be, n), h.preconnects.clear();
          var B = h.viewportChunks;
          for (E = 0; E < B.length; E++) n.push(B[E]);
          B.length = 0, h.fontPreloads.forEach(be, n), h.fontPreloads.clear(), h.highImagePreloads.forEach(be, n), h.highImagePreloads.clear(), ee = h, h.styles.forEach(_a, n), ee = null;
          var re = h.importMapChunks;
          for (E = 0; E < re.length; E++) n.push(re[E]);
          re.length = 0, h.bootstrapScripts.forEach(be, n), h.scripts.forEach(be, n), h.scripts.clear(), h.bulkPreloads.forEach(be, n), h.bulkPreloads.clear(), p.instructions |= 32;
          var J = h.hoistableChunks;
          for (E = 0; E < J.length; E++) n.push(J[E]);
          for (p = J.length = 0; p < u.length; p++) {
            var X = u[p];
            for (h = 0; h < X.length; h++) lo(r, n, X[h], null);
          }
          var U = r.renderState.preamble, Q = U.headChunks;
          if (U.htmlChunks || Q) {
            var ve = hr("head");
            n.push(ve);
          }
          var Pe = U.bodyChunks;
          if (Pe) for (u = 0; u < Pe.length; u++) n.push(Pe[u]);
          lo(r, n, i, null), r.completedRootSegment = null;
          var oe = r.renderState;
          if (r.allPendingTasks !== 0 || r.clientRenderedBoundaries.length !== 0 || r.completedBoundaries.length !== 0 || r.trackedPostpones !== null && (r.trackedPostpones.rootNodes.length !== 0 || r.trackedPostpones.rootSlots !== null)) {
            var ce = r.resumableState;
            if ((ce.instructions & 64) === 0) {
              if (ce.instructions |= 64, n.push(oe.startInlineScript), (ce.instructions & 32) === 0) {
                ce.instructions |= 32;
                var ne = "_" + ce.idPrefix + "R_";
                n.push(' id="');
                var lt = H(ne);
                n.push(lt), n.push('"');
              }
              n.push(">"), n.push("requestAnimationFrame(function(){$RT=performance.now()});"), n.push("<\/script>");
            }
          }
          Yn(n, oe);
        }
        var ae = r.renderState;
        i = 0;
        var bt = ae.viewportChunks;
        for (i = 0; i < bt.length; i++) n.push(bt[i]);
        bt.length = 0, ae.preconnects.forEach(be, n), ae.preconnects.clear(), ae.fontPreloads.forEach(be, n), ae.fontPreloads.clear(), ae.highImagePreloads.forEach(be, n), ae.highImagePreloads.clear(), ae.styles.forEach(Ws, n), ae.scripts.forEach(be, n), ae.scripts.clear(), ae.bulkPreloads.forEach(be, n), ae.bulkPreloads.clear();
        var fe = ae.hoistableChunks;
        for (i = 0; i < fe.length; i++) n.push(fe[i]);
        fe.length = 0;
        var Me = r.clientRenderedBoundaries;
        for (a = 0; a < Me.length; a++) {
          var He = Me[a];
          ae = n;
          var Te = r.resumableState, nt = r.renderState, Xr = He.rootSegmentID, St = He.errorDigest;
          ae.push(nt.startInlineScript), ae.push(">"), (Te.instructions & 4) === 0 ? (Te.instructions |= 4, ae.push('$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("')) : ae.push('$RX("'), ae.push(nt.boundaryPrefix);
          var uo = Xr.toString(16);
          if (ae.push(uo), ae.push('"'), St) {
            ae.push(",");
            var wn = Bs(St || "");
            ae.push(wn);
          }
          var Qe = ae.push(")<\/script>");
          if (!Qe) {
            r.destination = null, a++, Me.splice(0, a);
            return;
          }
        }
        Me.splice(0, a);
        var wt = r.completedBoundaries;
        for (a = 0; a < wt.length; a++) if (!Gr(r, n, wt[a])) {
          r.destination = null, a++, wt.splice(0, a);
          return;
        }
        wt.splice(0, a), oa = true;
        var Ot = r.partialBoundaries;
        for (a = 0; a < Ot.length; a++) {
          var Nt = Ot[a];
          e: {
            Me = r, He = n, Yr = Nt.byteSize;
            var tr = Nt.completedSegments;
            for (Qe = 0; Qe < tr.length; Qe++) if (!Qa(Me, He, Nt, tr[Qe])) {
              Qe++, tr.splice(0, Qe);
              var kr = false;
              break e;
            }
            tr.splice(0, Qe);
            var Ue = Nt.row;
            Ue !== null && Ue.together && Nt.pendingTasks === 1 && (Ue.pendingTasks === 1 ? Va(Me, Ue, Ue.hoistables) : Ue.pendingTasks--), kr = Mo(He, Nt.contentState, Me.renderState);
          }
          if (!kr) {
            r.destination = null, a++, Ot.splice(0, a);
            return;
          }
        }
        Ot.splice(0, a), oa = false;
        var Qr = r.completedBoundaries;
        for (a = 0; a < Qr.length; a++) if (!Gr(r, n, Qr[a])) {
          r.destination = null, a++, Qr.splice(0, a);
          return;
        }
        Qr.splice(0, a);
      }
    } finally {
      oa = false, r.allPendingTasks === 0 && r.clientRenderedBoundaries.length === 0 && r.completedBoundaries.length === 0 && (r.flushScheduled = false, a = r.resumableState, a.hasBody && (Ot = hr("body"), n.push(Ot)), a.hasHtml && (a = hr("html"), n.push(a)), r.status = 14, n.push(null), r.destination = null);
    }
  }
  __name(xn, "xn");
  function Jr(r) {
    if (r.flushScheduled === false && r.pingedTasks.length === 0 && r.destination !== null) {
      r.flushScheduled = true;
      var n = r.destination;
      n ? xn(r, n) : r.flushScheduled = false;
    }
  }
  __name(Jr, "Jr");
  function aa(r, n) {
    if (r.status === 13) r.status = 14, n.destroy(r.fatalError);
    else if (r.status !== 14 && r.destination === null) {
      r.destination = n;
      try {
        xn(r, n);
      } catch (a) {
        Ke(r, a, {}), rt(r, a);
      }
    }
  }
  __name(aa, "aa");
  function hi(r, n) {
    (r.status === 11 || r.status === 10) && (r.status = 12);
    try {
      var a = r.abortableTasks;
      if (0 < a.size) {
        var i = n === void 0 ? Error("The render was aborted by the server without a reason.") : typeof n == "object" && n !== null && typeof n.then == "function" ? Error("The render was aborted by the server with a promise.") : n;
        r.fatalError = i, a.forEach(function(u) {
          return Ya(u, r, i);
        }), a.clear();
      }
      r.destination !== null && xn(r, r.destination);
    } catch (u) {
      Ke(r, u, {}), rt(r, u);
    }
  }
  __name(hi, "hi");
  function Bt(r, n, a) {
    if (n === null) a.rootNodes.push(r);
    else {
      var i = a.workingMap, u = i.get(n);
      u === void 0 && (u = [n[1], n[2], [], null], i.set(n, u), Bt(u, n[0], a)), u[2].push(r);
    }
  }
  __name(Bt, "Bt");
  function sa() {
  }
  __name(sa, "sa");
  function Za(r, n, a, i) {
    var u = false, p = null, h = "", v = false;
    if (n = Je(n ? n.identifierPrefix : void 0), r = Ji(r, n, $a(n, a), Le(0, null, 0, null), 1 / 0, sa, void 0, function() {
      v = true;
    }, void 0, void 0, void 0), r.flushScheduled = r.destination !== null, vn(r), r.status === 10 && (r.status = 11), r.trackedPostpones === null && Ga(r, r.pendingRootTasks === 0), hi(r, i), aa(r, { push: /* @__PURE__ */ __name(function(g) {
      return g !== null && (h += g), true;
    }, "push"), destroy: /* @__PURE__ */ __name(function(g) {
      u = true, p = g;
    }, "destroy") }), u && p !== i) throw p;
    if (!v) throw Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
    return h;
  }
  __name(Za, "Za");
  return Fs.renderToStaticMarkup = function(r, n) {
    return Za(r, n, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server');
  }, Fs.renderToString = function(r, n) {
    return Za(r, n, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server');
  }, Fs.version = "19.2.4", Fs;
}
__name(ju, "ju");
var ur = {};
var nu;
function Du() {
  if (nu) return ur;
  nu = 1;
  var O = Eu, M = Pu, N = _u, F = Pi(), V = pu(), D = Iu, xe = /* @__PURE__ */ Symbol.for("react.transitional.element"), qe = /* @__PURE__ */ Symbol.for("react.portal"), q = /* @__PURE__ */ Symbol.for("react.fragment"), _ = /* @__PURE__ */ Symbol.for("react.strict_mode"), ue = /* @__PURE__ */ Symbol.for("react.profiler"), at = /* @__PURE__ */ Symbol.for("react.consumer"), Tt = /* @__PURE__ */ Symbol.for("react.context"), At = /* @__PURE__ */ Symbol.for("react.forward_ref"), Nr = /* @__PURE__ */ Symbol.for("react.suspense"), jr = /* @__PURE__ */ Symbol.for("react.suspense_list"), cn = /* @__PURE__ */ Symbol.for("react.memo"), $t = /* @__PURE__ */ Symbol.for("react.lazy"), Io = /* @__PURE__ */ Symbol.for("react.scope"), Dr = /* @__PURE__ */ Symbol.for("react.activity"), pn = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Mr = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), dn = /* @__PURE__ */ Symbol.for("react.view_transition"), Y = Symbol.iterator;
  function ge(e) {
    return e === null || typeof e != "object" ? null : (e = Y && e[Y] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  __name(ge, "ge");
  var cr = Array.isArray, Un = queueMicrotask;
  function Lr(e) {
    typeof e.flush == "function" && e.flush();
  }
  __name(Lr, "Lr");
  var ye = null, de = 0, Mt = true;
  function w(e, t) {
    if (typeof t == "string") {
      if (t.length !== 0) if (2048 < 3 * t.length) 0 < de && (H(e, ye.subarray(0, de)), ye = new Uint8Array(2048), de = 0), H(e, t);
      else {
        var o = ye;
        0 < de && (o = ye.subarray(de)), o = pr.encodeInto(t, o);
        var s = o.read;
        de += o.written, s < t.length && (H(e, ye.subarray(0, de)), ye = new Uint8Array(2048), de = pr.encodeInto(t.slice(s), ye).written), de === 2048 && (H(e, ye), ye = new Uint8Array(2048), de = 0);
      }
    } else t.byteLength !== 0 && (2048 < t.byteLength ? (0 < de && (H(e, ye.subarray(0, de)), ye = new Uint8Array(2048), de = 0), H(e, t)) : (o = ye.length - de, o < t.byteLength && (o === 0 ? H(e, ye) : (ye.set(t.subarray(0, o), de), de += o, H(e, ye), t = t.subarray(o)), ye = new Uint8Array(2048), de = 0), ye.set(t, de), de += t.byteLength, de === 2048 && (H(e, ye), ye = new Uint8Array(2048), de = 0)));
  }
  __name(w, "w");
  function H(e, t) {
    e = e.write(t), Mt = Mt && e;
  }
  __name(H, "H");
  function ie(e, t) {
    return w(e, t), Mt;
  }
  __name(ie, "ie");
  function zn(e) {
    ye && 0 < de && e.write(ye.subarray(0, de)), ye = null, de = 0, Mt = true;
  }
  __name(zn, "zn");
  var pr = new O.TextEncoder();
  function x(e) {
    return pr.encode(e);
  }
  __name(x, "x");
  function S(e) {
    return typeof e == "string" ? Buffer.byteLength(e, "utf8") : e.byteLength;
  }
  __name(S, "S");
  var P = Object.assign, j = Object.prototype.hasOwnProperty, L = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), W = {}, ee = {};
  function pe(e) {
    return j.call(ee, e) ? true : j.call(W, e) ? false : L.test(e) ? ee[e] = true : (W[e] = true, false);
  }
  __name(pe, "pe");
  var mt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Je = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), Le = /["'&<>]/;
  function G(e) {
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
  __name(G, "G");
  var Ns = /([A-Z])/g, Ca = /^ms-/, Ao = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function hn(e) {
    return Ao.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  __name(hn, "hn");
  var Hr = F.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $o = V.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Xe = { pending: false, data: null, method: null, action: null }, Lt = $o.d;
  $o.d = { f: Lt.f, r: Lt.r, D: so, C: Ya, L: Ga, m: Ja, X: io, S: ra, M: Sr };
  var st = [], Br = null;
  x('"></template>');
  var js = x("<script"), Kn = x("<\/script>"), he = x('<script src="'), ft = x('<script type="module" src="'), Ds = x(' nonce="'), xa = x(' integrity="'), ze = x(' crossorigin="'), wa = x(' async=""><\/script>'), Ms = x("<style"), dr = /(<\/|<)(s)(cript)/gi;
  function Fo(e, t, o, s) {
    return "" + t + (o === "s" ? "\\u0073" : "\\u0053") + s;
  }
  __name(Fo, "Fo");
  var Oo = x('<script type="importmap">'), Ra = x("<\/script>");
  function Ft(e, t, o, s, l, c) {
    o = typeof t == "string" ? t : t && t.script;
    var d = o === void 0 ? js : x('<script nonce="' + G(o) + '"'), y = typeof t == "string" ? void 0 : t && t.style, f = y === void 0 ? Ms : x('<style nonce="' + G(y) + '"'), b = e.idPrefix, k = [], C = e.bootstrapScriptContent, I = e.bootstrapScripts, A = e.bootstrapModules;
    if (C !== void 0 && (k.push(d), kn(k, e), k.push(Re, ("" + C).replace(dr, Fo), Kn)), C = [], s !== void 0 && (C.push(Oo), C.push(("" + JSON.stringify(s)).replace(dr, Fo)), C.push(Ra)), s = l ? { preconnects: "", fontPreloads: "", highImagePreloads: "", remainingCapacity: 2 + (typeof c == "number" ? c : 2e3) } : null, l = { placeholderPrefix: x(b + "P:"), segmentPrefix: x(b + "S:"), boundaryPrefix: x(b + "B:"), startInlineScript: d, startInlineStyle: f, preamble: mn(), externalRuntimeScript: null, bootstrapChunks: k, importMapChunks: C, onHeaders: l, headers: s, resets: { font: {}, dns: {}, connect: { default: {}, anonymous: {}, credentials: {} }, image: {}, style: {} }, charsetChunks: [], viewportChunks: [], hoistableChunks: [], preconnects: /* @__PURE__ */ new Set(), fontPreloads: /* @__PURE__ */ new Set(), highImagePreloads: /* @__PURE__ */ new Set(), styles: /* @__PURE__ */ new Map(), bootstrapScripts: /* @__PURE__ */ new Set(), scripts: /* @__PURE__ */ new Set(), bulkPreloads: /* @__PURE__ */ new Set(), preloads: { images: /* @__PURE__ */ new Map(), stylesheets: /* @__PURE__ */ new Map(), scripts: /* @__PURE__ */ new Map(), moduleScripts: /* @__PURE__ */ new Map() }, nonce: { script: o, style: y }, hoistableState: null, stylesToHoist: false }, I !== void 0) for (s = 0; s < I.length; s++) b = I[s], y = d = void 0, f = { rel: "preload", as: "script", fetchPriority: "low", nonce: t }, typeof b == "string" ? f.href = c = b : (f.href = c = b.src, f.integrity = y = typeof b.integrity == "string" ? b.integrity : void 0, f.crossOrigin = d = typeof b == "string" || b.crossOrigin == null ? void 0 : b.crossOrigin === "use-credentials" ? "use-credentials" : ""), b = e, C = c, b.scriptResources[C] = null, b.moduleScriptResources[C] = null, b = [], De(b, f), l.bootstrapScripts.add(b), k.push(he, G(c), we), o && k.push(Ds, G(o), we), typeof y == "string" && k.push(xa, G(y), we), typeof d == "string" && k.push(ze, G(d), we), kn(k, e), k.push(wa);
    if (A !== void 0) for (t = 0; t < A.length; t++) y = A[t], c = s = void 0, d = { rel: "modulepreload", fetchPriority: "low", nonce: o }, typeof y == "string" ? d.href = I = y : (d.href = I = y.src, d.integrity = c = typeof y.integrity == "string" ? y.integrity : void 0, d.crossOrigin = s = typeof y == "string" || y.crossOrigin == null ? void 0 : y.crossOrigin === "use-credentials" ? "use-credentials" : ""), y = e, f = I, y.scriptResources[f] = null, y.moduleScriptResources[f] = null, y = [], De(y, d), l.bootstrapScripts.add(y), k.push(ft, G(I), we), o && k.push(Ds, G(o), we), typeof c == "string" && k.push(xa, G(c), we), typeof s == "string" && k.push(ze, G(s), we), kn(k, e), k.push(wa);
    return l;
  }
  __name(Ft, "Ft");
  function No(e, t, o, s, l) {
    return { idPrefix: e === void 0 ? "" : e, nextFormID: 0, streamingFormat: 0, bootstrapScriptContent: o, bootstrapScripts: s, bootstrapModules: l, instructions: 0, hasBody: false, hasHtml: false, unknownResources: {}, dnsResources: {}, connectResources: { default: {}, anonymous: {}, credentials: {} }, imageResources: {}, styleResources: {}, scriptResources: {}, moduleUnknownResources: {}, moduleScriptResources: {} };
  }
  __name(No, "No");
  function mn() {
    return { htmlChunks: null, headChunks: null, bodyChunks: null };
  }
  __name(mn, "mn");
  function te(e, t, o, s) {
    return { insertionMode: e, selectedValue: t, tagScope: o, viewTransition: s };
  }
  __name(te, "te");
  function jo(e) {
    return te(e === "http://www.w3.org/2000/svg" ? 4 : e === "http://www.w3.org/1998/Math/MathML" ? 5 : 0, null, 0, null);
  }
  __name(jo, "jo");
  function Ea(e, t, o) {
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
  __name(Ea, "Ea");
  function hr(e) {
    return e === null ? null : { update: e.update, enter: "none", exit: "none", share: e.update, name: e.autoName, autoName: e.autoName, nameIdx: 0 };
  }
  __name(hr, "hr");
  function Do(e, t) {
    return t.tagScope & 32 && (e.instructions |= 128), te(t.insertionMode, t.selectedValue, t.tagScope | 12, hr(t.viewTransition));
  }
  __name(Do, "Do");
  function Yn(e, t) {
    e = hr(t.viewTransition);
    var o = t.tagScope | 16;
    return e !== null && e.share !== "none" && (o |= 64), te(t.insertionMode, t.selectedValue, o, e);
  }
  __name(Yn, "Yn");
  var Ct = x("<!-- -->");
  function Ls(e, t, o, s) {
    return t === "" ? s : (s && e.push(Ct), e.push(G(t)), true);
  }
  __name(Ls, "Ls");
  var Hs = /* @__PURE__ */ new Map(), _i = x(' style="'), Bs = x(":"), Ii = x(";");
  function fn(e, t) {
    if (typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    var o = true, s;
    for (s in t) if (j.call(t, s)) {
      var l = t[s];
      if (l != null && typeof l != "boolean" && l !== "") {
        if (s.indexOf("--") === 0) {
          var c = G(s);
          l = G(("" + l).trim());
        } else c = Hs.get(s), c === void 0 && (c = x(G(s.replace(Ns, "-$1").toLowerCase().replace(Ca, "-ms-"))), Hs.set(s, c)), l = typeof l == "number" ? l === 0 || mt.has(s) ? "" + l : l + "px" : G(("" + l).trim());
        o ? (o = false, e.push(_i, c, Bs, l)) : e.push(Ii, c, Bs, l);
      }
    }
    o || e.push(we);
  }
  __name(fn, "fn");
  var Ve = x(" "), it = x('="'), we = x('"'), Pa = x('=""');
  function Mo(e, t, o) {
    o && typeof o != "function" && typeof o != "symbol" && e.push(Ve, t, Pa);
  }
  __name(Mo, "Mo");
  function be(e, t, o) {
    typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && e.push(Ve, t, it, G(o), we);
  }
  __name(be, "be");
  var Xt = x(G("javascript:throw new Error('React form unexpectedly submitted.')")), qs = x('<input type="hidden"');
  function _a(e, t) {
    this.push(qs), Vs(e), be(this, "name", t), be(this, "value", e), this.push(qr);
  }
  __name(_a, "_a");
  function Vs(e) {
    if (typeof e != "string") throw Error("File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration.");
  }
  __name(Vs, "Vs");
  function Ws(e, t) {
    if (typeof t.$$FORM_ACTION == "function") {
      var o = e.nextFormID++;
      e = e.idPrefix + o;
      try {
        var s = t.$$FORM_ACTION(e);
        if (s) {
          var l = s.data;
          l?.forEach(Vs);
        }
        return s;
      } catch (c) {
        if (typeof c == "object" && c !== null && typeof c.then == "function") throw c;
      }
    }
    return null;
  }
  __name(Ws, "Ws");
  function Gn(e, t, o, s, l, c, d, y) {
    var f = null;
    if (typeof s == "function") {
      var b = Ws(t, s);
      b !== null ? (y = b.name, s = b.action || "", l = b.encType, c = b.method, d = b.target, f = b.data) : (e.push(Ve, "formAction", it, Xt, we), d = c = l = s = y = null, zs(t, o));
    }
    return y != null && me(e, "name", y), s != null && me(e, "formAction", s), l != null && me(e, "formEncType", l), c != null && me(e, "formMethod", c), d != null && me(e, "formTarget", d), f;
  }
  __name(Gn, "Gn");
  function me(e, t, o) {
    switch (t) {
      case "className":
        be(e, "class", o);
        break;
      case "tabIndex":
        be(e, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        be(e, t, o);
        break;
      case "style":
        fn(e, o);
        break;
      case "src":
      case "href":
        if (o === "") break;
      case "action":
      case "formAction":
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") break;
        o = hn("" + o), e.push(Ve, t, it, G(o), we);
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
        Mo(e, t.toLowerCase(), o);
        break;
      case "xlinkHref":
        if (typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") break;
        o = hn("" + o), e.push(Ve, "xlink:href", it, G(o), we);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        typeof o != "function" && typeof o != "symbol" && e.push(Ve, t, it, G(o), we);
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
        o && typeof o != "function" && typeof o != "symbol" && e.push(Ve, t, Pa);
        break;
      case "capture":
      case "download":
        o === true ? e.push(Ve, t, Pa) : o !== false && typeof o != "function" && typeof o != "symbol" && e.push(Ve, t, it, G(o), we);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o && e.push(Ve, t, it, G(o), we);
        break;
      case "rowSpan":
      case "start":
        typeof o == "function" || typeof o == "symbol" || isNaN(o) || e.push(Ve, t, it, G(o), we);
        break;
      case "xlinkActuate":
        be(e, "xlink:actuate", o);
        break;
      case "xlinkArcrole":
        be(e, "xlink:arcrole", o);
        break;
      case "xlinkRole":
        be(e, "xlink:role", o);
        break;
      case "xlinkShow":
        be(e, "xlink:show", o);
        break;
      case "xlinkTitle":
        be(e, "xlink:title", o);
        break;
      case "xlinkType":
        be(e, "xlink:type", o);
        break;
      case "xmlBase":
        be(e, "xml:base", o);
        break;
      case "xmlLang":
        be(e, "xml:lang", o);
        break;
      case "xmlSpace":
        be(e, "xml:space", o);
        break;
      default:
        if ((!(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (t = Je.get(t) || t, pe(t))) {
          switch (typeof o) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              var s = t.toLowerCase().slice(0, 5);
              if (s !== "data-" && s !== "aria-") return;
          }
          e.push(Ve, t, it, G(o), we);
        }
    }
  }
  __name(me, "me");
  var Re = x(">"), qr = x("/>");
  function gt(e, t, o) {
    if (t != null) {
      if (o != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
      if (typeof t != "object" || !("__html" in t)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
      t = t.__html, t != null && e.push("" + t);
    }
  }
  __name(gt, "gt");
  function Ai(e) {
    var t = "";
    return F.Children.forEach(e, function(o) {
      o != null && (t += o);
    }), t;
  }
  __name(Ai, "Ai");
  var Ia = x(' selected=""'), Us = x(`addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`);
  function zs(e, t) {
    if ((e.instructions & 16) === 0) {
      e.instructions |= 16;
      var o = t.preamble, s = t.bootstrapChunks;
      (o.htmlChunks || o.headChunks) && s.length === 0 ? (s.push(t.startInlineScript), kn(s, e), s.push(Re, Us, Kn)) : s.unshift(t.startInlineScript, Re, Us, Kn);
    }
  }
  __name(zs, "zs");
  var $i = x("<!--F!-->"), Fi = x("<!--F-->");
  function De(e, t) {
    e.push(Ie("link"));
    for (var o in t) if (j.call(t, o)) {
      var s = t[o];
      if (s != null) switch (o) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error("link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        default:
          me(e, o, s);
      }
    }
    return e.push(qr), null;
  }
  __name(De, "De");
  var Jn = /(<\/|<)(s)(tyle)/gi;
  function Lo(e, t, o, s) {
    return "" + t + (o === "s" ? "\\73 " : "\\53 ") + s;
  }
  __name(Lo, "Lo");
  function mr(e, t, o) {
    e.push(Ie(o));
    for (var s in t) if (j.call(t, s)) {
      var l = t[s];
      if (l != null) switch (s) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(o + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        default:
          me(e, s, l);
      }
    }
    return e.push(qr), null;
  }
  __name(mr, "mr");
  function Ho(e, t) {
    e.push(Ie("title"));
    var o = null, s = null, l;
    for (l in t) if (j.call(t, l)) {
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
    return e.push(Re), t = Array.isArray(o) ? 2 > o.length ? o[0] : null : o, typeof t != "function" && typeof t != "symbol" && t !== null && t !== void 0 && e.push(G("" + t)), gt(e, s, o), e.push(fr("title")), null;
  }
  __name(Ho, "Ho");
  var Aa = x("<!--head-->"), Oi = x("<!--body-->"), Ni = x("<!--html-->");
  function Qt(e, t) {
    e.push(Ie("script"));
    var o = null, s = null, l;
    for (l in t) if (j.call(t, l)) {
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
    return e.push(Re), gt(e, s, o), typeof o == "string" && e.push(("" + o).replace(dr, Fo)), e.push(fr("script")), null;
  }
  __name(Qt, "Qt");
  function $a(e, t, o) {
    e.push(Ie(o));
    var s = o = null, l;
    for (l in t) if (j.call(t, l)) {
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
    return e.push(Re), gt(e, s, o), o;
  }
  __name($a, "$a");
  function Xn(e, t, o) {
    e.push(Ie(o));
    var s = o = null, l;
    for (l in t) if (j.call(t, l)) {
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
    return e.push(Re), gt(e, s, o), typeof o == "string" ? (e.push(G(o)), null) : o;
  }
  __name(Xn, "Xn");
  var Vr = x(`
`), ji = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Ks = /* @__PURE__ */ new Map();
  function Ie(e) {
    var t = Ks.get(e);
    if (t === void 0) {
      if (!ji.test(e)) throw Error("Invalid tag: " + e);
      t = x("<" + e), Ks.set(e, t);
    }
    return t;
  }
  __name(Ie, "Ie");
  var Ys = x("<!DOCTYPE html>");
  function Wr(e, t, o, s, l, c, d, y, f) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
        break;
      case "a":
        e.push(Ie("a"));
        var b = null, k = null, C;
        for (C in o) if (j.call(o, C)) {
          var I = o[C];
          if (I != null) switch (C) {
            case "children":
              b = I;
              break;
            case "dangerouslySetInnerHTML":
              k = I;
              break;
            case "href":
              I === "" ? be(e, "href", "") : me(e, C, I);
              break;
            default:
              me(e, C, I);
          }
        }
        if (e.push(Re), gt(e, k, b), typeof b == "string") {
          e.push(G(b));
          var A = null;
        } else A = b;
        return A;
      case "g":
      case "p":
      case "li":
        break;
      case "select":
        e.push(Ie("select"));
        var le = null, Z = null, se;
        for (se in o) if (j.call(o, se)) {
          var je = o[se];
          if (je != null) switch (se) {
            case "children":
              le = je;
              break;
            case "dangerouslySetInnerHTML":
              Z = je;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              me(e, se, je);
          }
        }
        return e.push(Re), gt(e, Z, le), le;
      case "option":
        var Ce = y.selectedValue;
        e.push(Ie("option"));
        var vt = null, Dt = null, Ar = null, z = null, ar;
        for (ar in o) if (j.call(o, ar)) {
          var Gt = o[ar];
          if (Gt != null) switch (ar) {
            case "children":
              vt = Gt;
              break;
            case "selected":
              Ar = Gt;
              break;
            case "dangerouslySetInnerHTML":
              z = Gt;
              break;
            case "value":
              Dt = Gt;
            default:
              me(e, ar, Gt);
          }
        }
        if (Ce != null) {
          var Pt = Dt !== null ? "" + Dt : Ai(vt);
          if (cr(Ce)) {
            for (var sr = 0; sr < Ce.length; sr++) if ("" + Ce[sr] === Pt) {
              e.push(Ia);
              break;
            }
          } else "" + Ce === Pt && e.push(Ia);
        } else Ar && e.push(Ia);
        return e.push(Re), gt(e, z, vt), vt;
      case "textarea":
        e.push(Ie("textarea"));
        var Ae = null, $r = null, Jt = null, Ge;
        for (Ge in o) if (j.call(o, Ge)) {
          var _t = o[Ge];
          if (_t != null) switch (Ge) {
            case "children":
              Jt = _t;
              break;
            case "value":
              Ae = _t;
              break;
            case "defaultValue":
              $r = _t;
              break;
            case "dangerouslySetInnerHTML":
              throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
            default:
              me(e, Ge, _t);
          }
        }
        if (Ae === null && $r !== null && (Ae = $r), e.push(Re), Jt != null) {
          if (Ae != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (cr(Jt)) {
            if (1 < Jt.length) throw Error("<textarea> can only have at most one child.");
            Ae = "" + Jt[0];
          }
          Ae = "" + Jt;
        }
        return typeof Ae == "string" && Ae[0] === `
` && e.push(Vr), Ae !== null && e.push(G("" + Ae)), null;
      case "input":
        e.push(Ie("input"));
        var ko = null, vo = null, sn = null, To = null, hs = null, Fr = null, Bn = null, Qi = null, Zi = null, ms;
        for (ms in o) if (j.call(o, ms)) {
          var ir = o[ms];
          if (ir != null) switch (ms) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            case "name":
              ko = ir;
              break;
            case "formAction":
              vo = ir;
              break;
            case "formEncType":
              sn = ir;
              break;
            case "formMethod":
              To = ir;
              break;
            case "formTarget":
              hs = ir;
              break;
            case "defaultChecked":
              Zi = ir;
              break;
            case "defaultValue":
              Bn = ir;
              break;
            case "checked":
              Qi = ir;
              break;
            case "value":
              Fr = ir;
              break;
            default:
              me(e, ms, ir);
          }
        }
        var yl = Gn(e, s, l, vo, sn, To, hs, ko);
        return Qi !== null ? Mo(e, "checked", Qi) : Zi !== null && Mo(e, "checked", Zi), Fr !== null ? me(e, "value", Fr) : Bn !== null && me(e, "value", Bn), e.push(qr), yl?.forEach(_a, e), null;
      case "button":
        e.push(Ie("button"));
        var fs = null, bl = null, Sl = null, kl = null, vl = null, Tl = null, Cl = null, gs;
        for (gs in o) if (j.call(o, gs)) {
          var ln = o[gs];
          if (ln != null) switch (gs) {
            case "children":
              fs = ln;
              break;
            case "dangerouslySetInnerHTML":
              bl = ln;
              break;
            case "name":
              Sl = ln;
              break;
            case "formAction":
              kl = ln;
              break;
            case "formEncType":
              vl = ln;
              break;
            case "formMethod":
              Tl = ln;
              break;
            case "formTarget":
              Cl = ln;
              break;
            default:
              me(e, gs, ln);
          }
        }
        var xl = Gn(e, s, l, kl, vl, Tl, Cl, Sl);
        if (e.push(Re), xl?.forEach(_a, e), gt(e, bl, fs), typeof fs == "string") {
          e.push(G(fs));
          var wl = null;
        } else wl = fs;
        return wl;
      case "form":
        e.push(Ie("form"));
        var ys = null, Rl = null, Co = null, bs = null, Ss = null, ks = null, vs;
        for (vs in o) if (j.call(o, vs)) {
          var qn = o[vs];
          if (qn != null) switch (vs) {
            case "children":
              ys = qn;
              break;
            case "dangerouslySetInnerHTML":
              Rl = qn;
              break;
            case "action":
              Co = qn;
              break;
            case "encType":
              bs = qn;
              break;
            case "method":
              Ss = qn;
              break;
            case "target":
              ks = qn;
              break;
            default:
              me(e, vs, qn);
          }
        }
        var el = null, tl = null;
        if (typeof Co == "function") {
          var xo = Ws(s, Co);
          xo !== null ? (Co = xo.action || "", bs = xo.encType, Ss = xo.method, ks = xo.target, el = xo.data, tl = xo.name) : (e.push(Ve, "action", it, Xt, we), ks = Ss = bs = Co = null, zs(s, l));
        }
        if (Co != null && me(e, "action", Co), bs != null && me(e, "encType", bs), Ss != null && me(e, "method", Ss), ks != null && me(e, "target", ks), e.push(Re), tl !== null && (e.push(qs), be(e, "name", tl), e.push(qr), el?.forEach(_a, e)), gt(e, Rl, ys), typeof ys == "string") {
          e.push(G(ys));
          var El = null;
        } else El = ys;
        return El;
      case "menuitem":
        e.push(Ie("menuitem"));
        for (var gi in o) if (j.call(o, gi)) {
          var Pl = o[gi];
          if (Pl != null) switch (gi) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
            default:
              me(e, gi, Pl);
          }
        }
        return e.push(Re), null;
      case "object":
        e.push(Ie("object"));
        var Ts = null, _l = null, Cs;
        for (Cs in o) if (j.call(o, Cs)) {
          var xs = o[Cs];
          if (xs != null) switch (Cs) {
            case "children":
              Ts = xs;
              break;
            case "dangerouslySetInnerHTML":
              _l = xs;
              break;
            case "data":
              var Il = hn("" + xs);
              if (Il === "") break;
              e.push(Ve, "data", it, G(Il), we);
              break;
            default:
              me(e, Cs, xs);
          }
        }
        if (e.push(Re), gt(e, _l, Ts), typeof Ts == "string") {
          e.push(G(Ts));
          var Al = null;
        } else Al = Ts;
        return Al;
      case "title":
        var gu = y.tagScope & 1, yu = y.tagScope & 4;
        if (y.insertionMode === 4 || gu || o.itemProp != null) var rl = Ho(e, o);
        else yu ? rl = null : (Ho(l.hoistableChunks, o), rl = void 0);
        return rl;
      case "link":
        var bu = y.tagScope & 1, Su = y.tagScope & 4, ku = o.rel, Vn = o.href, yi = o.precedence;
        if (y.insertionMode === 4 || bu || o.itemProp != null || typeof ku != "string" || typeof Vn != "string" || Vn === "") {
          De(e, o);
          var ws = null;
        } else if (o.rel === "stylesheet") if (typeof yi != "string" || o.disabled != null || o.onLoad || o.onError) ws = De(e, o);
        else {
          var ya = l.styles.get(yi), bi = s.styleResources.hasOwnProperty(Vn) ? s.styleResources[Vn] : void 0;
          if (bi !== null) {
            s.styleResources[Vn] = null, ya || (ya = { precedence: G(yi), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, l.styles.set(yi, ya));
            var Si = { state: 0, props: P({}, o, { "data-precedence": o.precedence, precedence: null }) };
            if (bi) {
              bi.length === 2 && vn(Si.props, bi);
              var nl = l.preloads.stylesheets.get(Vn);
              nl && 0 < nl.length ? nl.length = 0 : Si.state = 1;
            }
            ya.sheets.set(Vn, Si), d && d.stylesheets.add(Si);
          } else if (ya) {
            var $l = ya.sheets.get(Vn);
            $l && d && d.stylesheets.add($l);
          }
          f && e.push(Ct), ws = null;
        }
        else o.onLoad || o.onError ? ws = De(e, o) : (f && e.push(Ct), ws = Su ? null : De(l.hoistableChunks, o));
        return ws;
      case "script":
        var vu = y.tagScope & 1, ol = o.async;
        if (typeof o.src != "string" || !o.src || !ol || typeof ol == "function" || typeof ol == "symbol" || o.onLoad || o.onError || y.insertionMode === 4 || vu || o.itemProp != null) var Fl = Qt(e, o);
        else {
          var ki = o.src;
          if (o.type === "module") var vi = s.moduleScriptResources, Ol = l.preloads.moduleScripts;
          else vi = s.scriptResources, Ol = l.preloads.scripts;
          var Ti = vi.hasOwnProperty(ki) ? vi[ki] : void 0;
          if (Ti !== null) {
            vi[ki] = null;
            var al = o;
            if (Ti) {
              Ti.length === 2 && (al = P({}, o), vn(al, Ti));
              var Nl = Ol.get(ki);
              Nl && (Nl.length = 0);
            }
            var jl = [];
            l.scripts.add(jl), Qt(jl, al);
          }
          f && e.push(Ct), Fl = null;
        }
        return Fl;
      case "style":
        var Tu = y.tagScope & 1, Ci = o.precedence, ba = o.href, Cu = o.nonce;
        if (y.insertionMode === 4 || Tu || o.itemProp != null || typeof Ci != "string" || typeof ba != "string" || ba === "") {
          e.push(Ie("style"));
          var Sa = null, Dl = null, Rs;
          for (Rs in o) if (j.call(o, Rs)) {
            var xi = o[Rs];
            if (xi != null) switch (Rs) {
              case "children":
                Sa = xi;
                break;
              case "dangerouslySetInnerHTML":
                Dl = xi;
                break;
              default:
                me(e, Rs, xi);
            }
          }
          e.push(Re);
          var Es = Array.isArray(Sa) ? 2 > Sa.length ? Sa[0] : null : Sa;
          typeof Es != "function" && typeof Es != "symbol" && Es !== null && Es !== void 0 && e.push(("" + Es).replace(Jn, Lo)), gt(e, Dl, Sa), e.push(fr("style"));
          var Ml = null;
        } else {
          var wo = l.styles.get(Ci);
          if ((s.styleResources.hasOwnProperty(ba) ? s.styleResources[ba] : void 0) !== null) {
            s.styleResources[ba] = null, wo || (wo = { precedence: G(Ci), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, l.styles.set(Ci, wo));
            var Ll = l.nonce.style;
            if (!Ll || Ll === Cu) {
              wo.hrefs.push(G(ba));
              var Hl = wo.rules, ka = null, Bl = null, wi;
              for (wi in o) if (j.call(o, wi)) {
                var sl = o[wi];
                if (sl != null) switch (wi) {
                  case "children":
                    ka = sl;
                    break;
                  case "dangerouslySetInnerHTML":
                    Bl = sl;
                }
              }
              var Ps = Array.isArray(ka) ? 2 > ka.length ? ka[0] : null : ka;
              typeof Ps != "function" && typeof Ps != "symbol" && Ps !== null && Ps !== void 0 && Hl.push(("" + Ps).replace(Jn, Lo)), gt(Hl, Bl, ka);
            }
          }
          wo && d && d.styles.add(wo), f && e.push(Ct), Ml = void 0;
        }
        return Ml;
      case "meta":
        var xu = y.tagScope & 1, wu = y.tagScope & 4;
        if (y.insertionMode === 4 || xu || o.itemProp != null) var ql = mr(e, o, "meta");
        else f && e.push(Ct), ql = wu ? null : typeof o.charSet == "string" ? mr(l.charsetChunks, o, "meta") : o.name === "viewport" ? mr(l.viewportChunks, o, "meta") : mr(l.hoistableChunks, o, "meta");
        return ql;
      case "listing":
      case "pre":
        e.push(Ie(t));
        var _s = null, Is = null, As;
        for (As in o) if (j.call(o, As)) {
          var Ri = o[As];
          if (Ri != null) switch (As) {
            case "children":
              _s = Ri;
              break;
            case "dangerouslySetInnerHTML":
              Is = Ri;
              break;
            default:
              me(e, As, Ri);
          }
        }
        if (e.push(Re), Is != null) {
          if (_s != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof Is != "object" || !("__html" in Is)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
          var Ro = Is.__html;
          Ro != null && (typeof Ro == "string" && 0 < Ro.length && Ro[0] === `
` ? e.push(Vr, Ro) : e.push("" + Ro));
        }
        return typeof _s == "string" && _s[0] === `
` && e.push(Vr), _s;
      case "img":
        var Ru = y.tagScope & 3, ct = o.src, ot = o.srcSet;
        if (!(o.loading === "lazy" || !ct && !ot || typeof ct != "string" && ct != null || typeof ot != "string" && ot != null || o.fetchPriority === "low" || Ru) && (typeof ct != "string" || ct[4] !== ":" || ct[0] !== "d" && ct[0] !== "D" || ct[1] !== "a" && ct[1] !== "A" || ct[2] !== "t" && ct[2] !== "T" || ct[3] !== "a" && ct[3] !== "A") && (typeof ot != "string" || ot[4] !== ":" || ot[0] !== "d" && ot[0] !== "D" || ot[1] !== "a" && ot[1] !== "A" || ot[2] !== "t" && ot[2] !== "T" || ot[3] !== "a" && ot[3] !== "A")) {
          d !== null && y.tagScope & 64 && (d.suspenseyImages = true);
          var Vl = typeof o.sizes == "string" ? o.sizes : void 0, va = ot ? ot + `
` + (Vl || "") : ct, il = l.preloads.images, Eo = il.get(va);
          if (Eo) (o.fetchPriority === "high" || 10 > l.highImagePreloads.size) && (il.delete(va), l.highImagePreloads.add(Eo));
          else if (!s.imageResources.hasOwnProperty(va)) {
            s.imageResources[va] = st;
            var ll = o.crossOrigin, Wl = typeof ll == "string" ? ll === "use-credentials" ? ll : "" : void 0, Po = l.headers, ul;
            Po && 0 < Po.remainingCapacity && typeof o.srcSet != "string" && (o.fetchPriority === "high" || 500 > Po.highImagePreloads.length) && (ul = Tn(ct, "image", { imageSrcSet: o.srcSet, imageSizes: o.sizes, crossOrigin: Wl, integrity: o.integrity, nonce: o.nonce, type: o.type, fetchPriority: o.fetchPriority, referrerPolicy: o.refererPolicy }), 0 <= (Po.remainingCapacity -= ul.length + 2)) ? (l.resets.image[va] = st, Po.highImagePreloads && (Po.highImagePreloads += ", "), Po.highImagePreloads += ul) : (Eo = [], De(Eo, { rel: "preload", as: "image", href: ot ? void 0 : ct, imageSrcSet: ot, imageSizes: Vl, crossOrigin: Wl, integrity: o.integrity, type: o.type, fetchPriority: o.fetchPriority, referrerPolicy: o.referrerPolicy }), o.fetchPriority === "high" || 10 > l.highImagePreloads.size ? l.highImagePreloads.add(Eo) : (l.bulkPreloads.add(Eo), il.set(va, Eo)));
          }
        }
        return mr(e, o, "img");
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
        return mr(e, o, t);
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
          var cl = c || l.preamble;
          if (cl.headChunks) throw Error("The `<head>` tag may only be rendered once.");
          c !== null && e.push(Aa), cl.headChunks = [];
          var Ul = $a(cl.headChunks, o, "head");
        } else Ul = Xn(e, o, "head");
        return Ul;
      case "body":
        if (2 > y.insertionMode) {
          var pl = c || l.preamble;
          if (pl.bodyChunks) throw Error("The `<body>` tag may only be rendered once.");
          c !== null && e.push(Oi), pl.bodyChunks = [];
          var zl = $a(pl.bodyChunks, o, "body");
        } else zl = Xn(e, o, "body");
        return zl;
      case "html":
        if (y.insertionMode === 0) {
          var dl = c || l.preamble;
          if (dl.htmlChunks) throw Error("The `<html>` tag may only be rendered once.");
          c !== null && e.push(Ni), dl.htmlChunks = [Ys];
          var Kl = $a(dl.htmlChunks, o, "html");
        } else Kl = Xn(e, o, "html");
        return Kl;
      default:
        if (t.indexOf("-") !== -1) {
          e.push(Ie(t));
          var hl = null, Yl = null, Ta;
          for (Ta in o) if (j.call(o, Ta)) {
            var lr = o[Ta];
            if (lr != null) {
              var Gl = Ta;
              switch (Ta) {
                case "children":
                  hl = lr;
                  break;
                case "dangerouslySetInnerHTML":
                  Yl = lr;
                  break;
                case "style":
                  fn(e, lr);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "ref":
                  break;
                case "className":
                  Gl = "class";
                default:
                  if (pe(Ta) && typeof lr != "function" && typeof lr != "symbol" && lr !== false) {
                    if (lr === true) lr = "";
                    else if (typeof lr == "object") continue;
                    e.push(Ve, Gl, it, G(lr), we);
                  }
              }
            }
          }
          return e.push(Re), gt(e, Yl, hl), hl;
        }
    }
    return Xn(e, o, t);
  }
  __name(Wr, "Wr");
  var Qn = /* @__PURE__ */ new Map();
  function fr(e) {
    var t = Qn.get(e);
    return t === void 0 && (t = x("</" + e + ">"), Qn.set(e, t)), t;
  }
  __name(fr, "fr");
  function Fa(e, t) {
    e = e.preamble, e.htmlChunks === null && t.htmlChunks && (e.htmlChunks = t.htmlChunks), e.headChunks === null && t.headChunks && (e.headChunks = t.headChunks), e.bodyChunks === null && t.bodyChunks && (e.bodyChunks = t.bodyChunks);
  }
  __name(Fa, "Fa");
  function Oa(e, t) {
    t = t.bootstrapChunks;
    for (var o = 0; o < t.length - 1; o++) w(e, t[o]);
    return o < t.length ? (o = t[o], t.length = 0, ie(e, o)) : true;
  }
  __name(Oa, "Oa");
  var Gs = x("requestAnimationFrame(function(){$RT=performance.now()});"), gr = x('<template id="'), Js = x('"></template>'), Di = x("<!--&-->"), Ur = x("<!--/&-->"), Bo = x("<!--$-->"), Mi = x('<!--$?--><template id="'), Li = x('"></template>'), Hi = x("<!--$!-->"), tt = x("<!--/$-->"), yt = x("<template"), Bi = x('"'), qo = x(' data-dgst="');
  x(' data-msg="'), x(' data-stck="'), x(' data-cstck="');
  var Vo = x("></template>");
  function Xs(e, t, o) {
    if (w(e, Mi), o === null) throw Error("An ID must have been assigned before we can complete the boundary.");
    return w(e, t.boundaryPrefix), w(e, o.toString(16)), ie(e, Li);
  }
  __name(Xs, "Xs");
  var qi = x('<div hidden id="'), Zt = x('">'), Na = x("</div>"), ja = x('<svg aria-hidden="true" style="display:none" id="'), Da = x('">'), Wo = x("</svg>"), Se = x('<math aria-hidden="true" style="display:none" id="'), Zn = x('">'), Uo = x("</math>"), eo = x('<table hidden id="'), to = x('">'), ro = x("</table>"), zo = x('<table hidden><tbody id="'), gn = x('">'), yr = x("</tbody></table>"), Ko = x('<table hidden><tr id="'), er = x('">'), Qs = x("</tr></table>"), Ma = x('<table hidden><colgroup id="'), yn = x('">'), no = x("</colgroup></table>");
  function Zs(e, t, o, s) {
    switch (o.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return w(e, qi), w(e, t.segmentPrefix), w(e, s.toString(16)), ie(e, Zt);
      case 4:
        return w(e, ja), w(e, t.segmentPrefix), w(e, s.toString(16)), ie(e, Da);
      case 5:
        return w(e, Se), w(e, t.segmentPrefix), w(e, s.toString(16)), ie(e, Zn);
      case 6:
        return w(e, eo), w(e, t.segmentPrefix), w(e, s.toString(16)), ie(e, to);
      case 7:
        return w(e, zo), w(e, t.segmentPrefix), w(e, s.toString(16)), ie(e, gn);
      case 8:
        return w(e, Ko), w(e, t.segmentPrefix), w(e, s.toString(16)), ie(e, er);
      case 9:
        return w(e, Ma), w(e, t.segmentPrefix), w(e, s.toString(16)), ie(e, yn);
      default:
        throw Error("Unknown insertion mode. This is a bug in React.");
    }
  }
  __name(Zs, "Zs");
  function ei(e, t) {
    switch (t.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return ie(e, Na);
      case 4:
        return ie(e, Wo);
      case 5:
        return ie(e, Uo);
      case 6:
        return ie(e, ro);
      case 7:
        return ie(e, yr);
      case 8:
        return ie(e, Qs);
      case 9:
        return ie(e, no);
      default:
        throw Error("Unknown insertion mode. This is a bug in React.");
    }
  }
  __name(ei, "ei");
  var ti = x('$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), Vi = x('$RS("'), Wi = x('","'), Ui = x('")<\/script>');
  x('<template data-rsi="" data-sid="'), x('" data-pid="');
  var ri = x(`$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`), ni = x('$RC("'), oi = x(`$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=e[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&$RM.set(b.getAttribute("href"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement("link");a.href=d;a.rel=
"stylesheet";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute("media");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=
"$~";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,"CSS failed to load"))};$RR("`), zi = x('$RR("'), ai = x('","'), Yo = x('",'), Ki = x('"'), La = x(")<\/script>");
  x('<template data-rci="" data-bid="'), x('<template data-rri="" data-bid="'), x('" data-sid="'), x('" data-sty="');
  var si = x('$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};'), bn = x('$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'), Ha = x('$RX("'), Go = x('"'), ii = x(","), Sn = x(")<\/script>");
  x('<template data-rxi="" data-bid="'), x('" data-dgst="'), x('" data-msg="'), x('" data-stck="'), x('" data-cstck="');
  var Yi = /[<\u2028\u2029]/g;
  function Gi(e) {
    return JSON.stringify(e).replace(Yi, function(t) {
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
  __name(Gi, "Gi");
  var Ji = /[&><\u2028\u2029]/g;
  function Oe(e) {
    return JSON.stringify(e).replace(Ji, function(t) {
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
  __name(Oe, "Oe");
  var li = x(' media="not all" data-precedence="'), Ba = x('" data-href="'), Jo = x('">'), ui = x("</style>"), Ht = false, zr = true;
  function qa(e) {
    var t = e.rules, o = e.hrefs, s = 0;
    if (o.length) {
      for (w(this, Br.startInlineStyle), w(this, li), w(this, e.precedence), w(this, Ba); s < o.length - 1; s++) w(this, o[s]), w(this, Ua);
      for (w(this, o[s]), w(this, Jo), s = 0; s < t.length; s++) w(this, t[s]);
      zr = ie(this, ui), Ht = true, t.length = 0, o.length = 0;
    }
  }
  __name(qa, "qa");
  function br(e) {
    return e.state !== 2 ? Ht = true : false;
  }
  __name(br, "br");
  function Ke(e, t, o) {
    return Ht = false, zr = true, Br = o, t.styles.forEach(qa, e), Br = null, t.stylesheets.forEach(br), Ht && (o.stylesToHoist = true), zr;
  }
  __name(Ke, "Ke");
  function rt(e) {
    for (var t = 0; t < e.length; t++) w(this, e[t]);
    e.length = 0;
  }
  __name(rt, "rt");
  var Ee = [];
  function Va(e) {
    De(Ee, e.props);
    for (var t = 0; t < Ee.length; t++) w(this, Ee[t]);
    Ee.length = 0, e.state = 2;
  }
  __name(Va, "Va");
  var Wa = x(' data-precedence="'), oo = x('" data-href="'), Ua = x(" "), ci = x('">'), pi = x("</style>");
  function Xo(e) {
    var t = 0 < e.sheets.size;
    e.sheets.forEach(Va, this), e.sheets.clear();
    var o = e.rules, s = e.hrefs;
    if (!t || s.length) {
      if (w(this, Br.startInlineStyle), w(this, Wa), w(this, e.precedence), e = 0, s.length) {
        for (w(this, oo); e < s.length - 1; e++) w(this, s[e]), w(this, Ua);
        w(this, s[e]);
      }
      for (w(this, ci), e = 0; e < o.length; e++) w(this, o[e]);
      w(this, pi), o.length = 0, s.length = 0;
    }
  }
  __name(Xo, "Xo");
  function Qo(e) {
    if (e.state === 0) {
      e.state = 1;
      var t = e.props;
      for (De(Ee, { rel: "preload", as: "style", href: e.props.href, crossOrigin: t.crossOrigin, fetchPriority: t.fetchPriority, integrity: t.integrity, media: t.media, hrefLang: t.hrefLang, referrerPolicy: t.referrerPolicy }), e = 0; e < Ee.length; e++) w(this, Ee[e]);
      Ee.length = 0;
    }
  }
  __name(Qo, "Qo");
  function xt(e) {
    e.sheets.forEach(Qo, this), e.sheets.clear();
  }
  __name(xt, "xt");
  x('<link rel="expect" href="#'), x('" blocking="render"/>');
  var Zo = x(' id="');
  function kn(e, t) {
    (t.instructions & 32) === 0 && (t.instructions |= 32, e.push(Zo, G("_" + t.idPrefix + "R_"), we));
  }
  __name(kn, "kn");
  var za = x("["), ea = x(",["), ao = x(","), ta = x("]");
  function di(e, t) {
    w(e, za);
    var o = za;
    t.stylesheets.forEach(function(s) {
      if (s.state !== 2) if (s.state === 3) w(e, o), w(e, Oe("" + s.props.href)), w(e, ta), o = ea;
      else {
        w(e, o);
        var l = s.props["data-precedence"], c = s.props, d = hn("" + s.props.href);
        w(e, Oe(d)), l = "" + l, w(e, ao), w(e, Oe(l));
        for (var y in c) if (j.call(c, y) && (l = c[y], l != null)) switch (y) {
          case "href":
          case "rel":
          case "precedence":
          case "data-precedence":
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error("link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
          default:
            We(e, y, l);
        }
        w(e, ta), o = ea, s.state = 3;
      }
    }), w(e, ta);
  }
  __name(di, "di");
  function We(e, t, o) {
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
        o = hn(o), t = "" + o;
        break;
      default:
        if (2 < t.length && (t[0] === "o" || t[0] === "O") && (t[1] === "n" || t[1] === "N") || !pe(t)) return;
        t = "" + o;
    }
    w(e, ao), w(e, Oe(s)), w(e, ao), w(e, Oe(t));
  }
  __name(We, "We");
  function Ka() {
    return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set(), suspenseyImages: false };
  }
  __name(Ka, "Ka");
  function so(e) {
    var t = Kt();
    if (t) {
      var o = t.resumableState, s = t.renderState;
      if (typeof e == "string" && e) {
        if (!o.dnsResources.hasOwnProperty(e)) {
          o.dnsResources[e] = null, o = s.headers;
          var l, c;
          (c = o && 0 < o.remainingCapacity) && (c = (l = "<" + ("" + e).replace(na, Kr) + ">; rel=dns-prefetch", 0 <= (o.remainingCapacity -= l.length + 2))), c ? (s.resets.dns[e] = null, o.preconnects && (o.preconnects += ", "), o.preconnects += l) : (l = [], De(l, { href: e, rel: "dns-prefetch" }), s.preconnects.add(l));
        }
        Er(t);
      }
    } else Lt.D(e);
  }
  __name(so, "so");
  function Ya(e, t) {
    var o = Kt();
    if (o) {
      var s = o.resumableState, l = o.renderState;
      if (typeof e == "string" && e) {
        var c = t === "use-credentials" ? "credentials" : typeof t == "string" ? "anonymous" : "default";
        if (!s.connectResources[c].hasOwnProperty(e)) {
          s.connectResources[c][e] = null, s = l.headers;
          var d, y;
          if (y = s && 0 < s.remainingCapacity) {
            if (y = "<" + ("" + e).replace(na, Kr) + ">; rel=preconnect", typeof t == "string") {
              var f = ("" + t).replace(Cn, Yr);
              y += '; crossorigin="' + f + '"';
            }
            y = (d = y, 0 <= (s.remainingCapacity -= d.length + 2));
          }
          y ? (l.resets.connect[c][e] = null, s.preconnects && (s.preconnects += ", "), s.preconnects += d) : (c = [], De(c, { rel: "preconnect", href: e, crossOrigin: t }), l.preconnects.add(c));
        }
        Er(o);
      }
    } else Lt.C(e, t);
  }
  __name(Ya, "Ya");
  function Ga(e, t, o) {
    var s = Kt();
    if (s) {
      var l = s.resumableState, c = s.renderState;
      if (t && e) {
        switch (t) {
          case "image":
            if (o) var d = o.imageSrcSet, y = o.imageSizes, f = o.fetchPriority;
            var b = d ? d + `
` + (y || "") : e;
            if (l.imageResources.hasOwnProperty(b)) return;
            l.imageResources[b] = st, l = c.headers;
            var k;
            l && 0 < l.remainingCapacity && typeof d != "string" && f === "high" && (k = Tn(e, t, o), 0 <= (l.remainingCapacity -= k.length + 2)) ? (c.resets.image[b] = st, l.highImagePreloads && (l.highImagePreloads += ", "), l.highImagePreloads += k) : (l = [], De(l, P({ rel: "preload", href: d ? void 0 : e, as: t }, o)), f === "high" ? c.highImagePreloads.add(l) : (c.bulkPreloads.add(l), c.preloads.images.set(b, l)));
            break;
          case "style":
            if (l.styleResources.hasOwnProperty(e)) return;
            d = [], De(d, P({ rel: "preload", href: e, as: t }, o)), l.styleResources[e] = !o || typeof o.crossOrigin != "string" && typeof o.integrity != "string" ? st : [o.crossOrigin, o.integrity], c.preloads.stylesheets.set(e, d), c.bulkPreloads.add(d);
            break;
          case "script":
            if (l.scriptResources.hasOwnProperty(e)) return;
            d = [], c.preloads.scripts.set(e, d), c.bulkPreloads.add(d), De(d, P({ rel: "preload", href: e, as: t }, o)), l.scriptResources[e] = !o || typeof o.crossOrigin != "string" && typeof o.integrity != "string" ? st : [o.crossOrigin, o.integrity];
            break;
          default:
            if (l.unknownResources.hasOwnProperty(t)) {
              if (d = l.unknownResources[t], d.hasOwnProperty(e)) return;
            } else d = {}, l.unknownResources[t] = d;
            d[e] = st, (l = c.headers) && 0 < l.remainingCapacity && t === "font" && (b = Tn(e, t, o), 0 <= (l.remainingCapacity -= b.length + 2)) ? (c.resets.font[e] = st, l.fontPreloads && (l.fontPreloads += ", "), l.fontPreloads += b) : (l = [], e = P({ rel: "preload", href: e, as: t }, o), De(l, e), t) === "font" ? c.fontPreloads.add(l) : c.bulkPreloads.add(l);
        }
        Er(s);
      }
    } else Lt.L(e, t, o);
  }
  __name(Ga, "Ga");
  function Ja(e, t) {
    var o = Kt();
    if (o) {
      var s = o.resumableState, l = o.renderState;
      if (e) {
        var c = t && typeof t.as == "string" ? t.as : "script";
        switch (c) {
          case "script":
            if (s.moduleScriptResources.hasOwnProperty(e)) return;
            c = [], s.moduleScriptResources[e] = !t || typeof t.crossOrigin != "string" && typeof t.integrity != "string" ? st : [t.crossOrigin, t.integrity], l.preloads.moduleScripts.set(e, c);
            break;
          default:
            if (s.moduleUnknownResources.hasOwnProperty(c)) {
              var d = s.unknownResources[c];
              if (d.hasOwnProperty(e)) return;
            } else d = {}, s.moduleUnknownResources[c] = d;
            c = [], d[e] = st;
        }
        De(c, P({ rel: "modulepreload", href: e }, t)), l.bulkPreloads.add(c), Er(o);
      }
    } else Lt.m(e, t);
  }
  __name(Ja, "Ja");
  function ra(e, t, o) {
    var s = Kt();
    if (s) {
      var l = s.resumableState, c = s.renderState;
      if (e) {
        t = t || "default";
        var d = c.styles.get(t), y = l.styleResources.hasOwnProperty(e) ? l.styleResources[e] : void 0;
        y !== null && (l.styleResources[e] = null, d || (d = { precedence: G(t), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, c.styles.set(t, d)), t = { state: 0, props: P({ rel: "stylesheet", href: e, "data-precedence": t }, o) }, y && (y.length === 2 && vn(t.props, y), (c = c.preloads.stylesheets.get(e)) && 0 < c.length ? c.length = 0 : t.state = 1), d.sheets.set(e, t), Er(s));
      }
    } else Lt.S(e, t, o);
  }
  __name(ra, "ra");
  function io(e, t) {
    var o = Kt();
    if (o) {
      var s = o.resumableState, l = o.renderState;
      if (e) {
        var c = s.scriptResources.hasOwnProperty(e) ? s.scriptResources[e] : void 0;
        c !== null && (s.scriptResources[e] = null, t = P({ src: e, async: true }, t), c && (c.length === 2 && vn(t, c), e = l.preloads.scripts.get(e)) && (e.length = 0), e = [], l.scripts.add(e), Qt(e, t), Er(o));
      }
    } else Lt.X(e, t);
  }
  __name(io, "io");
  function Sr(e, t) {
    var o = Kt();
    if (o) {
      var s = o.resumableState, l = o.renderState;
      if (e) {
        var c = s.moduleScriptResources.hasOwnProperty(e) ? s.moduleScriptResources[e] : void 0;
        c !== null && (s.moduleScriptResources[e] = null, t = P({ src: e, type: "module", async: true }, t), c && (c.length === 2 && vn(t, c), e = l.preloads.moduleScripts.get(e)) && (e.length = 0), e = [], l.scripts.add(e), Qt(e, t), Er(o));
      }
    } else Lt.M(e, t);
  }
  __name(Sr, "Sr");
  function vn(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t[0]), e.integrity == null && (e.integrity = t[1]);
  }
  __name(vn, "vn");
  function Tn(e, t, o) {
    e = ("" + e).replace(na, Kr), t = ("" + t).replace(Cn, Yr), t = "<" + e + '>; rel=preload; as="' + t + '"';
    for (var s in o) j.call(o, s) && (e = o[s], typeof e == "string" && (t += "; " + s.toLowerCase() + '="' + ("" + e).replace(Cn, Yr) + '"'));
    return t;
  }
  __name(Tn, "Tn");
  var na = /[<>\r\n]/g;
  function Kr(e) {
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
  __name(Kr, "Kr");
  var Cn = /["';,\r\n]/g;
  function Yr(e) {
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
  __name(Yr, "Yr");
  function lo(e) {
    this.styles.add(e);
  }
  __name(lo, "lo");
  function Xa(e) {
    this.stylesheets.add(e);
  }
  __name(Xa, "Xa");
  function Gr(e, t) {
    t.styles.forEach(lo, e), t.stylesheets.forEach(Xa, e), t.suspenseyImages && (e.suspenseyImages = true);
  }
  __name(Gr, "Gr");
  function Qa(e) {
    return 0 < e.stylesheets.size || e.suspenseyImages;
  }
  __name(Qa, "Qa");
  var oa = Function.prototype.bind, xn = new N.AsyncLocalStorage(), Jr = /* @__PURE__ */ Symbol.for("react.client.reference");
  function aa(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.$$typeof === Jr ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case q:
        return "Fragment";
      case ue:
        return "Profiler";
      case _:
        return "StrictMode";
      case Nr:
        return "Suspense";
      case jr:
        return "SuspenseList";
      case Dr:
        return "Activity";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case qe:
        return "Portal";
      case Tt:
        return e.displayName || "Context";
      case at:
        return (e._context.displayName || "Context") + ".Consumer";
      case At:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case cn:
        return t = e.displayName || null, t !== null ? t : aa(e.type) || "Memo";
      case $t:
        t = e._payload, e = e._init;
        try {
          return aa(e(t));
        } catch {
        }
    }
    return null;
  }
  __name(aa, "aa");
  var hi = {}, Bt = null;
  function sa(e, t) {
    if (e !== t) {
      e.context._currentValue = e.parentValue, e = e.parent;
      var o = t.parent;
      if (e === null) {
        if (o !== null) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
      } else {
        if (o === null) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        sa(e, o);
      }
      t.context._currentValue = t.value;
    }
  }
  __name(sa, "sa");
  function Za(e) {
    e.context._currentValue = e.parentValue, e = e.parent, e !== null && Za(e);
  }
  __name(Za, "Za");
  function r(e) {
    var t = e.parent;
    t !== null && r(t), e.context._currentValue = e.value;
  }
  __name(r, "r");
  function n(e, t) {
    if (e.context._currentValue = e.parentValue, e = e.parent, e === null) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    e.depth === t.depth ? sa(e, t) : n(e, t);
  }
  __name(n, "n");
  function a(e, t) {
    var o = t.parent;
    if (o === null) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    e.depth === o.depth ? sa(e, o) : a(e, o), t.context._currentValue = t.value;
  }
  __name(a, "a");
  function i(e) {
    var t = Bt;
    t !== e && (t === null ? r(e) : e === null ? Za(t) : t.depth === e.depth ? sa(t, e) : t.depth > e.depth ? n(t, e) : a(t, e), Bt = e);
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
  function B(e, t, o) {
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
  __name(B, "B");
  var re = null;
  function J() {
    if (re === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
    var e = re;
    return re = null, e;
  }
  __name(J, "J");
  function X(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  __name(X, "X");
  var U = typeof Object.is == "function" ? Object.is : X, Q = null, ve = null, Pe = null, oe = null, ce = null, ne = null, lt = false, ae = false, bt = 0, fe = 0, Me = -1, He = 0, Te = null, nt = null, Xr = 0;
  function St() {
    if (Q === null) throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    return Q;
  }
  __name(St, "St");
  function uo() {
    if (0 < Xr) throw Error("Rendered more hooks than during the previous render");
    return { memoizedState: null, queue: null, next: null };
  }
  __name(uo, "uo");
  function wn() {
    return ne === null ? ce === null ? (lt = false, ce = ne = uo()) : (lt = true, ne = ce) : ne.next === null ? (lt = false, ne = ne.next = uo()) : (lt = true, ne = ne.next), ne;
  }
  __name(wn, "wn");
  function Qe() {
    var e = Te;
    return Te = null, e;
  }
  __name(Qe, "Qe");
  function wt() {
    oe = Pe = ve = Q = null, ae = false, ce = null, Xr = 0, ne = nt = null;
  }
  __name(wt, "wt");
  function Ot(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  __name(Ot, "Ot");
  function Nt(e, t, o) {
    if (Q = St(), ne = wn(), lt) {
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
    return e = e === Ot ? typeof t == "function" ? t() : t : o !== void 0 ? o(t) : t, ne.memoizedState = e, e = ne.queue = { last: null, dispatch: null }, e = e.dispatch = kr.bind(null, Q, e), [ne.memoizedState, e];
  }
  __name(Nt, "Nt");
  function tr(e, t) {
    if (Q = St(), ne = wn(), t = t === void 0 ? null : t, ne !== null) {
      var o = ne.memoizedState;
      if (o !== null && t !== null) {
        var s = o[1];
        e: if (s === null) s = false;
        else {
          for (var l = 0; l < s.length && l < t.length; l++) if (!U(t[l], s[l])) {
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
  __name(tr, "tr");
  function kr(e, t, o) {
    if (25 <= Xr) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
    if (e === Q) if (ae = true, e = { action: o, next: null }, nt === null && (nt = /* @__PURE__ */ new Map()), o = nt.get(t), o === void 0) nt.set(t, e);
    else {
      for (t = o; t.next !== null; ) t = t.next;
      t.next = e;
    }
  }
  __name(kr, "kr");
  function Ue() {
    throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
  }
  __name(Ue, "Ue");
  function Qr() {
    throw Error("startTransition cannot be called during server rendering.");
  }
  __name(Qr, "Qr");
  function co() {
    throw Error("Cannot update optimistic state while rendering.");
  }
  __name(co, "co");
  function es(e, t, o) {
    return e !== void 0 ? "p" + e : (e = JSON.stringify([t, null, o]), t = M.createHash("md5"), t.update(e), "k" + t.digest("hex"));
  }
  __name(es, "es");
  function ts(e, t, o) {
    St();
    var s = fe++, l = Pe;
    if (typeof e.$$FORM_ACTION == "function") {
      var c = null, d = oe;
      l = l.formState;
      var y = e.$$IS_SIGNATURE_EQUAL;
      if (l !== null && typeof y == "function") {
        var f = l[1];
        y.call(e, l[2], l[3]) && (c = es(o, d, s), f === c && (Me = s, t = l[0]));
      }
      var b = e.bind(null, t);
      return e = /* @__PURE__ */ __name(function(C) {
        b(C);
      }, "e"), typeof b.$$FORM_ACTION == "function" && (e.$$FORM_ACTION = function(C) {
        C = b.$$FORM_ACTION(C), o !== void 0 && (o += "", C.action = o);
        var I = C.data;
        return I && (c === null && (c = es(o, d, s)), I.append("$ACTION_KEY", c)), C;
      }), [t, e, false];
    }
    var k = e.bind(null, t);
    return [t, function(C) {
      k(C);
    }, false];
  }
  __name(ts, "ts");
  function rs(e) {
    var t = He;
    return He += 1, Te === null && (Te = []), B(Te, e, t);
  }
  __name(rs, "rs");
  function mi() {
    throw Error("Cache cannot be refreshed during server rendering.");
  }
  __name(mi, "mi");
  var ns = { readContext: /* @__PURE__ */ __name(function(e) {
    return e._currentValue;
  }, "readContext"), use: /* @__PURE__ */ __name(function(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return rs(e);
      if (e.$$typeof === Tt) return e._currentValue;
    }
    throw Error("An unsupported type was passed to use(): " + String(e));
  }, "use"), useContext: /* @__PURE__ */ __name(function(e) {
    return St(), e._currentValue;
  }, "useContext"), useMemo: tr, useReducer: Nt, useRef: /* @__PURE__ */ __name(function(e) {
    Q = St(), ne = wn();
    var t = ne.memoizedState;
    return t === null ? (e = { current: e }, ne.memoizedState = e) : t;
  }, "useRef"), useState: /* @__PURE__ */ __name(function(e) {
    return Nt(Ot, e);
  }, "useState"), useInsertionEffect: R, useLayoutEffect: R, useCallback: /* @__PURE__ */ __name(function(e, t) {
    return tr(function() {
      return e;
    }, t);
  }, "useCallback"), useImperativeHandle: R, useEffect: R, useDebugValue: R, useDeferredValue: /* @__PURE__ */ __name(function(e, t) {
    return St(), t !== void 0 ? t : e;
  }, "useDeferredValue"), useTransition: /* @__PURE__ */ __name(function() {
    return St(), [false, Qr];
  }, "useTransition"), useId: /* @__PURE__ */ __name(function() {
    var e = ve.treeContext, t = e.overflow;
    e = e.id, e = (e & ~(1 << 32 - v(e) - 1)).toString(32) + t;
    var o = po;
    if (o === null) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
    return t = bt++, e = "_" + o.idPrefix + "R_" + e, 0 < t && (e += "H" + t.toString(32)), e + "_";
  }, "useId"), useSyncExternalStore: /* @__PURE__ */ __name(function(e, t, o) {
    if (o === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
    return o();
  }, "useSyncExternalStore"), useOptimistic: /* @__PURE__ */ __name(function(e) {
    return St(), [e, co];
  }, "useOptimistic"), useActionState: ts, useFormState: ts, useHostTransitionStatus: /* @__PURE__ */ __name(function() {
    return St(), Xe;
  }, "useHostTransitionStatus"), useMemoCache: /* @__PURE__ */ __name(function(e) {
    for (var t = Array(e), o = 0; o < e; o++) t[o] = Mr;
    return t;
  }, "useMemoCache"), useCacheRefresh: /* @__PURE__ */ __name(function() {
    return mi;
  }, "useCacheRefresh"), useEffectEvent: /* @__PURE__ */ __name(function() {
    return Ue;
  }, "useEffectEvent") }, po = null, ho = { getCacheForType: /* @__PURE__ */ __name(function() {
    throw Error("Not implemented.");
  }, "getCacheForType"), cacheSignal: /* @__PURE__ */ __name(function() {
    throw Error("Not implemented.");
  }, "cacheSignal") };
  function qt(e, t) {
    e = (e.name || "Error") + ": " + (e.message || "");
    for (var o = 0; o < t.length; o++) e += `
    at ` + t[o].toString();
    return e;
  }
  __name(qt, "qt");
  var ia, os;
  function Vt(e) {
    if (ia === void 0) try {
      throw Error();
    } catch (o) {
      var t = o.stack.trim().match(/\n( *(at )?)/);
      ia = t && t[1] || "", os = -1 < o.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < o.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + ia + e + os;
  }
  __name(Vt, "Vt");
  var la = false;
  function Wt(e, t) {
    if (!e || la) return "";
    la = true;
    var o = Error.prepareStackTrace;
    Error.prepareStackTrace = qt;
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
        var f = d.split(`
`), b = y.split(`
`);
        for (l = s = 0; s < f.length && !f[s].includes("DetermineComponentFrameRoot"); ) s++;
        for (; l < b.length && !b[l].includes("DetermineComponentFrameRoot"); ) l++;
        if (s === f.length || l === b.length) for (s = f.length - 1, l = b.length - 1; 1 <= s && 0 <= l && f[s] !== b[l]; ) l--;
        for (; 1 <= s && 0 <= l; s--, l--) if (f[s] !== b[l]) {
          if (s !== 1 || l !== 1) do
            if (s--, l--, 0 > l || f[s] !== b[l]) {
              var k = `
` + f[s].replace(" at new ", " at ");
              return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), k;
            }
          while (1 <= s && 0 <= l);
          break;
        }
      }
    } finally {
      la = false, Error.prepareStackTrace = o;
    }
    return (o = e ? e.displayName || e.name : "") ? Vt(o) : "";
  }
  __name(Wt, "Wt");
  function Rn(e) {
    if (typeof e == "string") return Vt(e);
    if (typeof e == "function") return e.prototype && e.prototype.isReactComponent ? Wt(e, true) : Wt(e, false);
    if (typeof e == "object" && e !== null) {
      switch (e.$$typeof) {
        case At:
          return Wt(e.render, false);
        case cn:
          return Wt(e.type, false);
        case $t:
          var t = e, o = t._payload;
          t = t._init;
          try {
            e = t(o);
          } catch {
            return Vt("Lazy");
          }
          return Rn(e);
      }
      if (typeof e.name == "string") {
        e: {
          o = e.name, t = e.env;
          var s = e.debugLocation;
          if (s != null && (e = Error.prepareStackTrace, Error.prepareStackTrace = qt, s = s.stack, Error.prepareStackTrace = e, s.startsWith(`Error: react-stack-top-frame
`) && (s = s.slice(29)), e = s.indexOf(`
`), e !== -1 && (s = s.slice(e + 1)), e = s.indexOf("react_stack_bottom_frame"), e !== -1 && (e = s.lastIndexOf(`
`, e)), e = e !== -1 ? s = s.slice(0, e) : "", s = e.lastIndexOf(`
`), e = s === -1 ? e : e.slice(s + 1), e.indexOf(o) !== -1)) {
            o = `
` + e;
            break e;
          }
          o = Vt(o + (t ? " [" + t + "]" : ""));
        }
        return o;
      }
    }
    switch (e) {
      case jr:
        return Vt("SuspenseList");
      case Nr:
        return Vt("Suspense");
    }
    return "";
  }
  __name(Rn, "Rn");
  function Ut(e, t) {
    return (500 < t.byteSize || Qa(t.contentState)) && t.contentPreamble === null;
  }
  __name(Ut, "Ut");
  function mo(e) {
    if (typeof e == "object" && e !== null && typeof e.environmentName == "string") {
      var t = e.environmentName;
      e = [e].slice(0), typeof e[0] == "string" ? e.splice(0, 1, "\x1B[0m\x1B[7m%c%s\x1B[0m%c " + e[0], "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", " " + t + " ", "") : e.splice(0, 0, "\x1B[0m\x1B[7m%c%s\x1B[0m%c", "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", " " + t + " ", ""), e.unshift(console), t = oa.apply(console.error, e), t();
    } else console.error(e);
    return null;
  }
  __name(mo, "mo");
  function En(e, t, o, s, l, c, d, y, f, b, k) {
    var C = /* @__PURE__ */ new Set();
    this.destination = null, this.flushScheduled = false, this.resumableState = e, this.renderState = t, this.rootFormatContext = o, this.progressiveChunkSize = s === void 0 ? 12800 : s, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.byteSize = 0, this.abortableTasks = C, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = l === void 0 ? mo : l, this.onPostpone = b === void 0 ? R : b, this.onAllReady = c === void 0 ? R : c, this.onShellReady = d === void 0 ? R : d, this.onShellError = y === void 0 ? R : y, this.onFatalError = f === void 0 ? R : f, this.formState = k === void 0 ? null : k;
  }
  __name(En, "En");
  function zt(e, t, o, s, l, c, d, y, f, b, k, C) {
    return t = new En(t, o, s, l, c, d, y, f, b, k, C), o = Rt(t, 0, null, s, false, false), o.parentFlushed = true, e = _n(t, null, e, -1, null, o, null, null, t.abortableTasks, null, s, null, p, null, null), Tr(e), t.pingedTasks.push(e), t;
  }
  __name(zt, "zt");
  function ua(e, t, o, s, l, c, d, y, f, b, k) {
    return e = zt(e, t, o, s, l, c, d, y, f, b, k, void 0), e.trackedPostpones = { workingMap: /* @__PURE__ */ new Map(), rootNodes: [], rootSlots: null }, e;
  }
  __name(ua, "ua");
  function fo(e, t, o, s, l, c, d, y, f) {
    return o = new En(t.resumableState, o, t.rootFormatContext, t.progressiveChunkSize, s, l, c, d, y, f, null), o.nextSegmentId = t.nextSegmentId, typeof t.replaySlots == "number" ? (s = Rt(o, 0, null, t.rootFormatContext, false, false), s.parentFlushed = true, e = _n(o, null, e, -1, null, s, null, null, o.abortableTasks, null, t.rootFormatContext, null, p, null, null), Tr(e), o.pingedTasks.push(e), o) : (e = Zr(o, null, { nodes: t.replayNodes, slots: t.replaySlots, pendingTasks: 0 }, e, -1, null, null, o.abortableTasks, null, t.rootFormatContext, null, p, null, null), Tr(e), o.pingedTasks.push(e), o);
  }
  __name(fo, "fo");
  function vr(e, t, o, s, l, c, d, y, f) {
    return e = fo(e, t, o, s, l, c, d, y, f), e.trackedPostpones = { workingMap: /* @__PURE__ */ new Map(), rootNodes: [], rootSlots: null }, e;
  }
  __name(vr, "vr");
  var Pn = null;
  function Kt() {
    if (Pn) return Pn;
    var e = xn.getStore();
    return e || null;
  }
  __name(Kt, "Kt");
  function as(e, t) {
    e.pingedTasks.push(t), e.pingedTasks.length === 1 && (e.flushScheduled = e.destination !== null, e.trackedPostpones !== null || e.status === 10 ? Un(function() {
      return on2(e);
    }) : setImmediate(function() {
      return on2(e);
    }));
  }
  __name(as, "as");
  function rr(e, t, o, s, l) {
    return o = { status: 0, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, row: t, completedSegments: [], byteSize: 0, fallbackAbortableTasks: o, errorDigest: null, contentState: Ka(), fallbackState: Ka(), contentPreamble: s, fallbackPreamble: l, trackedContentKeyPath: null, trackedFallbackNode: null }, t !== null && (t.pendingTasks++, s = t.boundaries, s !== null && (e.allPendingTasks++, o.pendingTasks++, s.push(o)), e = t.inheritedHoistables, e !== null && Gr(o.contentState, e)), o;
  }
  __name(rr, "rr");
  function _n(e, t, o, s, l, c, d, y, f, b, k, C, I, A, le) {
    e.allPendingTasks++, l === null ? e.pendingRootTasks++ : l.pendingTasks++, A !== null && A.pendingTasks++;
    var Z = { replay: null, node: o, childIndex: s, ping: /* @__PURE__ */ __name(function() {
      return as(e, Z);
    }, "ping"), blockedBoundary: l, blockedSegment: c, blockedPreamble: d, hoistableState: y, abortSet: f, keyPath: b, formatContext: k, context: C, treeContext: I, row: A, componentStack: le, thenableState: t };
    return f.add(Z), Z;
  }
  __name(_n, "_n");
  function Zr(e, t, o, s, l, c, d, y, f, b, k, C, I, A) {
    e.allPendingTasks++, c === null ? e.pendingRootTasks++ : c.pendingTasks++, I !== null && I.pendingTasks++, o.pendingTasks++;
    var le = { replay: o, node: s, childIndex: l, ping: /* @__PURE__ */ __name(function() {
      return as(e, le);
    }, "ping"), blockedBoundary: c, blockedSegment: null, blockedPreamble: null, hoistableState: d, abortSet: y, keyPath: f, formatContext: b, context: k, treeContext: C, row: I, componentStack: A, thenableState: t };
    return y.add(le), le;
  }
  __name(Zr, "Zr");
  function Rt(e, t, o, s, l, c) {
    return { status: 0, parentFlushed: false, id: -1, index: t, chunks: [], children: [], preambleChildren: [], parentFormatContext: s, boundary: o, lastPushedText: l, textEmbedded: c };
  }
  __name(Rt, "Rt");
  function Tr(e) {
    var t = e.node;
    typeof t == "object" && t !== null && t.$$typeof === xe && (e.componentStack = { parent: e.componentStack, type: t.type });
  }
  __name(Tr, "Tr");
  function ca(e) {
    return e === null ? null : { parent: e.parent, type: "Suspense Fallback" };
  }
  __name(ca, "ca");
  function Cr(e) {
    var t = {};
    return e && Object.defineProperty(t, "componentStack", { configurable: true, enumerable: true, get: /* @__PURE__ */ __name(function() {
      try {
        var o = "", s = e;
        do
          o += Rn(s.type), s = s.parent;
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
  __name(Cr, "Cr");
  function Ze(e, t, o) {
    if (e = e.onError, t = e(t, o), t == null || typeof t == "string") return t;
  }
  __name(Ze, "Ze");
  function en(e, t) {
    var o = e.onShellError, s = e.onFatalError;
    o(t), s(t), e.destination !== null ? (e.status = 14, e.destination.destroy(t)) : (e.status = 13, e.fatalError = t);
  }
  __name(en, "en");
  function et(e, t) {
    ss(e, t.next, t.hoistables);
  }
  __name(et, "et");
  function ss(e, t, o) {
    for (; t !== null; ) {
      o !== null && (Gr(t.hoistables, o), t.inheritedHoistables = o);
      var s = t.boundaries;
      if (s !== null) {
        t.boundaries = null;
        for (var l = 0; l < s.length; l++) {
          var c = s[l];
          o !== null && Gr(c.contentState, o), or(e, c, null, null);
        }
      }
      if (t.pendingTasks--, 0 < t.pendingTasks) break;
      o = t.hoistables, t = t.next;
    }
  }
  __name(ss, "ss");
  function is(e, t) {
    var o = t.boundaries;
    if (o !== null && t.pendingTasks === o.length) {
      for (var s = true, l = 0; l < o.length; l++) {
        var c = o[l];
        if (c.pendingTasks !== 1 || c.parentFlushed || Ut(e, c)) {
          s = false;
          break;
        }
      }
      s && ss(e, t, t.hoistables);
    }
  }
  __name(is, "is");
  function Et(e) {
    var t = { pendingTasks: 1, boundaries: null, hoistables: Ka(), inheritedHoistables: null, together: false, next: null };
    return e !== null && 0 < e.pendingTasks && (t.pendingTasks++, t.boundaries = [], e.next = t), t;
  }
  __name(Et, "Et");
  function go(e, t, o, s, l) {
    var c = t.keyPath, d = t.treeContext, y = t.row;
    t.keyPath = o, o = s.length;
    var f = null;
    if (t.replay !== null) {
      var b = t.replay.slots;
      if (b !== null && typeof b == "object") for (var k = 0; k < o; k++) {
        var C = l !== "backwards" && l !== "unstable_legacy-backwards" ? k : o - 1 - k, I = s[C];
        t.row = f = Et(f), t.treeContext = h(d, o, C);
        var A = b[C];
        typeof A == "number" ? (nn(e, t, A, I, C), delete b[C]) : Ne(e, t, I, C), --f.pendingTasks === 0 && et(e, f);
      }
      else for (b = 0; b < o; b++) k = l !== "backwards" && l !== "unstable_legacy-backwards" ? b : o - 1 - b, C = s[k], t.row = f = Et(f), t.treeContext = h(d, o, k), Ne(e, t, C, k), --f.pendingTasks === 0 && et(e, f);
    } else if (l !== "backwards" && l !== "unstable_legacy-backwards") for (l = 0; l < o; l++) b = s[l], t.row = f = Et(f), t.treeContext = h(d, o, l), Ne(e, t, b, l), --f.pendingTasks === 0 && et(e, f);
    else {
      for (l = t.blockedSegment, b = l.children.length, k = l.chunks.length, C = o - 1; 0 <= C; C--) {
        I = s[C], t.row = f = Et(f), t.treeContext = h(d, o, C), A = Rt(e, k, null, t.formatContext, C === 0 ? l.lastPushedText : true, true), l.children.splice(b, 0, A), t.blockedSegment = A;
        try {
          Ne(e, t, I, C), A.lastPushedText && A.textEmbedded && A.chunks.push(Ct), A.status = 1, jt(e, t.blockedBoundary, A), --f.pendingTasks === 0 && et(e, f);
        } catch (le) {
          throw A.status = e.status === 12 ? 3 : 4, le;
        }
      }
      t.blockedSegment = l, l.lastPushedText = false;
    }
    y !== null && f !== null && 0 < f.pendingTasks && (y.pendingTasks++, f.next = y), t.treeContext = d, t.row = y, t.keyPath = c;
  }
  __name(go, "go");
  function In(e, t, o, s, l, c) {
    var d = t.thenableState;
    for (t.thenableState = null, Q = {}, ve = t, Pe = e, oe = o, fe = bt = 0, Me = -1, He = 0, Te = d, e = s(l, c); ae; ) ae = false, fe = bt = 0, Me = -1, He = 0, Xr += 1, ne = null, e = s(l, c);
    return wt(), e;
  }
  __name(In, "In");
  function tn(e, t, o, s, l, c, d) {
    var y = false;
    if (c !== 0 && e.formState !== null) {
      var f = t.blockedSegment;
      if (f !== null) {
        y = true, f = f.chunks;
        for (var b = 0; b < c; b++) b === d ? f.push($i) : f.push(Fi);
      }
    }
    c = t.keyPath, t.keyPath = o, l ? (o = t.treeContext, t.treeContext = h(o, 1, 0), Ne(e, t, s, -1), t.treeContext = o) : y ? Ne(e, t, s, -1) : ut(e, t, s, -1), t.keyPath = c;
  }
  __name(tn, "tn");
  function rn(e, t, o, s, l, c) {
    if (typeof s == "function") if (s.prototype && s.prototype.isReactComponent) {
      var d = l;
      if ("ref" in l) {
        d = {};
        for (var y in l) y !== "ref" && (d[y] = l[y]);
      }
      var f = s.defaultProps;
      if (f) {
        d === l && (d = P({}, d, l));
        for (var b in f) d[b] === void 0 && (d[b] = f[b]);
      }
      l = d, d = hi, f = s.contextType, typeof f == "object" && f !== null && (d = f._currentValue), d = new s(l, d);
      var k = d.state !== void 0 ? d.state : null;
      if (d.updater = u, d.props = l, d.state = k, f = { queue: [], replace: false }, d._reactInternals = f, c = s.contextType, d.context = typeof c == "object" && c !== null ? c._currentValue : hi, c = s.getDerivedStateFromProps, typeof c == "function" && (c = c(l, k), k = c == null ? k : P({}, k, c), d.state = k), typeof s.getDerivedStateFromProps != "function" && typeof d.getSnapshotBeforeUpdate != "function" && (typeof d.UNSAFE_componentWillMount == "function" || typeof d.componentWillMount == "function")) if (s = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), s !== d.state && u.enqueueReplaceState(d, d.state, null), f.queue !== null && 0 < f.queue.length) if (s = f.queue, c = f.replace, f.queue = null, f.replace = false, c && s.length === 1) d.state = s[0];
      else {
        for (f = c ? s[0] : d.state, k = true, c = c ? 1 : 0; c < s.length; c++) b = s[c], b = typeof b == "function" ? b.call(d, f, l, void 0) : b, b != null && (k ? (k = false, f = P({}, f, b)) : P(f, b));
        d.state = f;
      }
      else f.queue = null;
      if (s = d.render(), e.status === 12) throw null;
      l = t.keyPath, t.keyPath = o, ut(e, t, s, -1), t.keyPath = l;
    } else {
      if (s = In(e, t, o, s, l, void 0), e.status === 12) throw null;
      tn(e, t, o, s, bt !== 0, fe, Me);
    }
    else if (typeof s == "string") if (d = t.blockedSegment, d === null) d = l.children, f = t.formatContext, k = t.keyPath, t.formatContext = Ea(f, s, l), t.keyPath = o, Ne(e, t, d, -1), t.formatContext = f, t.keyPath = k;
    else {
      if (k = Wr(d.chunks, s, l, e.resumableState, e.renderState, t.blockedPreamble, t.hoistableState, t.formatContext, d.lastPushedText), d.lastPushedText = false, f = t.formatContext, c = t.keyPath, t.keyPath = o, (t.formatContext = Ea(f, s, l)).insertionMode === 3) {
        o = Rt(e, 0, null, t.formatContext, false, false), d.preambleChildren.push(o), t.blockedSegment = o;
        try {
          o.status = 6, Ne(e, t, k, -1), o.lastPushedText && o.textEmbedded && o.chunks.push(Ct), o.status = 1, jt(e, t.blockedBoundary, o);
        } finally {
          t.blockedSegment = d;
        }
      } else Ne(e, t, k, -1);
      t.formatContext = f, t.keyPath = c;
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
            if (1 >= f.insertionMode) {
              e.hasBody = true;
              break e;
            }
            break;
          case "html":
            if (f.insertionMode === 0) {
              e.hasHtml = true;
              break e;
            }
            break;
          case "head":
            if (1 >= f.insertionMode) break e;
        }
        t.push(fr(s));
      }
      d.lastPushedText = false;
    }
    else {
      switch (s) {
        case pn:
        case _:
        case ue:
        case q:
          s = t.keyPath, t.keyPath = o, ut(e, t, l.children, -1), t.keyPath = s;
          return;
        case Dr:
          s = t.blockedSegment, s === null ? l.mode !== "hidden" && (s = t.keyPath, t.keyPath = o, Ne(e, t, l.children, -1), t.keyPath = s) : l.mode !== "hidden" && (s.chunks.push(Di), s.lastPushedText = false, d = t.keyPath, t.keyPath = o, Ne(e, t, l.children, -1), t.keyPath = d, s.chunks.push(Ur), s.lastPushedText = false);
          return;
        case jr:
          e: {
            if (s = l.children, l = l.revealOrder, l === "forwards" || l === "backwards" || l === "unstable_legacy-backwards") {
              if (cr(s)) {
                go(e, t, o, s, l);
                break e;
              }
              if ((d = ge(s)) && (d = d.call(s))) {
                if (f = d.next(), !f.done) {
                  do
                    f = d.next();
                  while (!f.done);
                  go(e, t, o, s, l);
                }
                break e;
              }
            }
            l === "together" ? (l = t.keyPath, d = t.row, f = t.row = Et(null), f.boundaries = [], f.together = true, t.keyPath = o, ut(e, t, s, -1), --f.pendingTasks === 0 && et(e, f), t.keyPath = l, t.row = d, d !== null && 0 < f.pendingTasks && (d.pendingTasks++, f.next = d)) : (l = t.keyPath, t.keyPath = o, ut(e, t, s, -1), t.keyPath = l);
          }
          return;
        case dn:
        case Io:
          throw Error("ReactDOMServer does not yet support scope components.");
        case Nr:
          e: if (t.replay !== null) {
            s = t.keyPath, d = t.formatContext, f = t.row, t.keyPath = o, t.formatContext = Yn(e.resumableState, d), t.row = null, o = l.children;
            try {
              Ne(e, t, o, -1);
            } finally {
              t.keyPath = s, t.formatContext = d, t.row = f;
            }
          } else {
            s = t.keyPath, c = t.formatContext;
            var C = t.row;
            b = t.blockedBoundary, y = t.blockedPreamble;
            var I = t.hoistableState, A = t.blockedSegment, le = l.fallback;
            l = l.children;
            var Z = /* @__PURE__ */ new Set(), se = 2 > t.formatContext.insertionMode ? rr(e, t.row, Z, mn(), mn()) : rr(e, t.row, Z, null, null);
            e.trackedPostpones !== null && (se.trackedContentKeyPath = o);
            var je = Rt(e, A.chunks.length, se, t.formatContext, false, false);
            A.children.push(je), A.lastPushedText = false;
            var Ce = Rt(e, 0, null, t.formatContext, false, false);
            if (Ce.parentFlushed = true, e.trackedPostpones !== null) {
              d = t.componentStack, f = [o[0], "Suspense Fallback", o[2]], k = [f[1], f[2], [], null], e.trackedPostpones.workingMap.set(f, k), se.trackedFallbackNode = k, t.blockedSegment = je, t.blockedPreamble = se.fallbackPreamble, t.keyPath = f, t.formatContext = Do(e.resumableState, c), t.componentStack = ca(d), je.status = 6;
              try {
                Ne(e, t, le, -1), je.lastPushedText && je.textEmbedded && je.chunks.push(Ct), je.status = 1, jt(e, b, je);
              } catch (vt) {
                throw je.status = e.status === 12 ? 3 : 4, vt;
              } finally {
                t.blockedSegment = A, t.blockedPreamble = y, t.keyPath = s, t.formatContext = c;
              }
              t = _n(e, null, l, -1, se, Ce, se.contentPreamble, se.contentState, t.abortSet, o, Yn(e.resumableState, t.formatContext), t.context, t.treeContext, null, d), Tr(t), e.pingedTasks.push(t);
            } else {
              t.blockedBoundary = se, t.blockedPreamble = se.contentPreamble, t.hoistableState = se.contentState, t.blockedSegment = Ce, t.keyPath = o, t.formatContext = Yn(e.resumableState, c), t.row = null, Ce.status = 6;
              try {
                if (Ne(e, t, l, -1), Ce.lastPushedText && Ce.textEmbedded && Ce.chunks.push(Ct), Ce.status = 1, jt(e, se, Ce), bo(se, Ce), se.pendingTasks === 0 && se.status === 0) {
                  if (se.status = 1, !Ut(e, se)) {
                    C !== null && --C.pendingTasks === 0 && et(e, C), e.pendingRootTasks === 0 && t.blockedPreamble && jn(e);
                    break e;
                  }
                } else C !== null && C.together && is(e, C);
              } catch (vt) {
                se.status = 4, e.status === 12 ? (Ce.status = 3, d = e.fatalError) : (Ce.status = 4, d = vt), f = Cr(t.componentStack), k = Ze(e, d, f), se.errorDigest = k, An(e, se);
              } finally {
                t.blockedBoundary = b, t.blockedPreamble = y, t.hoistableState = I, t.blockedSegment = A, t.keyPath = s, t.formatContext = c, t.row = C;
              }
              t = _n(e, null, le, -1, b, je, se.fallbackPreamble, se.fallbackState, Z, [o[0], "Suspense Fallback", o[2]], Do(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, ca(t.componentStack)), Tr(t), e.pingedTasks.push(t);
            }
          }
          return;
      }
      if (typeof s == "object" && s !== null) switch (s.$$typeof) {
        case At:
          if ("ref" in l) for (A in d = {}, l) A !== "ref" && (d[A] = l[A]);
          else d = l;
          s = In(e, t, o, s.render, d, c), tn(e, t, o, s, bt !== 0, fe, Me);
          return;
        case cn:
          rn(e, t, o, s.type, l, c);
          return;
        case Tt:
          if (f = l.children, d = t.keyPath, l = l.value, k = s._currentValue, s._currentValue = l, c = Bt, Bt = s = { parent: c, depth: c === null ? 0 : c.depth + 1, context: s, parentValue: k, value: l }, t.context = s, t.keyPath = o, ut(e, t, f, -1), e = Bt, e === null) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
          e.context._currentValue = e.parentValue, e = Bt = e.parent, t.context = e, t.keyPath = d;
          return;
        case at:
          l = l.children, s = l(s._context._currentValue), l = t.keyPath, t.keyPath = o, ut(e, t, s, -1), t.keyPath = l;
          return;
        case $t:
          if (d = s._init, s = d(s._payload), e.status === 12) throw null;
          rn(e, t, o, s, l, c);
          return;
      }
      throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((s == null ? s : typeof s) + "."));
    }
  }
  __name(rn, "rn");
  function nn(e, t, o, s, l) {
    var c = t.replay, d = t.blockedBoundary, y = Rt(e, 0, null, t.formatContext, false, false);
    y.id = o, y.parentFlushed = true;
    try {
      t.replay = null, t.blockedSegment = y, Ne(e, t, s, l), y.status = 1, jt(e, d, y), d === null ? e.completedRootSegment = y : (bo(d, y), d.parentFlushed && e.partialBoundaries.push(d));
    } finally {
      t.replay = c, t.blockedSegment = null;
    }
  }
  __name(nn, "nn");
  function ut(e, t, o, s) {
    t.replay !== null && typeof t.replay.slots == "number" ? nn(e, t, t.replay.slots, o, s) : (t.node = o, t.childIndex = s, o = t.componentStack, Tr(t), pa(e, t), t.componentStack = o);
  }
  __name(ut, "ut");
  function pa(e, t) {
    var o = t.node, s = t.childIndex;
    if (o !== null) {
      if (typeof o == "object") {
        switch (o.$$typeof) {
          case xe:
            var l = o.type, c = o.key, d = o.props;
            o = d.ref;
            var y = o !== void 0 ? o : null, f = aa(l), b = c ?? (s === -1 ? 0 : s);
            if (c = [t.keyPath, f, b], t.replay !== null) e: {
              var k = t.replay;
              for (s = k.nodes, o = 0; o < s.length; o++) {
                var C = s[o];
                if (b === C[1]) {
                  if (C.length === 4) {
                    if (f !== null && f !== C[0]) throw Error("Expected the resume to render <" + C[0] + "> in this slot but instead it rendered <" + f + ">. The tree doesn't match so React will fallback to client rendering.");
                    var I = C[2];
                    f = C[3], b = t.node, t.replay = { nodes: I, slots: f, pendingTasks: 1 };
                    try {
                      if (rn(e, t, c, l, d, y), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                      t.replay.pendingTasks--;
                    } catch (z) {
                      if (typeof z == "object" && z !== null && (z === $ || typeof z.then == "function")) throw t.node === b ? t.replay = k : s.splice(o, 1), z;
                      t.replay.pendingTasks--, d = Cr(t.componentStack), c = e, e = t.blockedBoundary, l = z, d = Ze(c, l, d), $n(c, e, I, f, l, d);
                    }
                    t.replay = k;
                  } else {
                    if (l !== Nr) throw Error("Expected the resume to render <Suspense> in this slot but instead it rendered <" + (aa(l) || "Unknown") + ">. The tree doesn't match so React will fallback to client rendering.");
                    t: {
                      k = void 0, l = C[5], y = C[2], f = C[3], b = C[4] === null ? [] : C[4][2], C = C[4] === null ? null : C[4][3];
                      var A = t.keyPath, le = t.formatContext, Z = t.row, se = t.replay, je = t.blockedBoundary, Ce = t.hoistableState, vt = d.children, Dt = d.fallback, Ar = /* @__PURE__ */ new Set();
                      d = 2 > t.formatContext.insertionMode ? rr(e, t.row, Ar, mn(), mn()) : rr(e, t.row, Ar, null, null), d.parentFlushed = true, d.rootSegmentID = l, t.blockedBoundary = d, t.hoistableState = d.contentState, t.keyPath = c, t.formatContext = Yn(e.resumableState, le), t.row = null, t.replay = { nodes: y, slots: f, pendingTasks: 1 };
                      try {
                        if (Ne(e, t, vt, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                        if (t.replay.pendingTasks--, d.pendingTasks === 0 && d.status === 0) {
                          d.status = 1, e.completedBoundaries.push(d);
                          break t;
                        }
                      } catch (z) {
                        d.status = 4, I = Cr(t.componentStack), k = Ze(e, z, I), d.errorDigest = k, t.replay.pendingTasks--, e.clientRenderedBoundaries.push(d);
                      } finally {
                        t.blockedBoundary = je, t.hoistableState = Ce, t.replay = se, t.keyPath = A, t.formatContext = le, t.row = Z;
                      }
                      I = Zr(e, null, { nodes: b, slots: C, pendingTasks: 0 }, Dt, -1, je, d.fallbackState, Ar, [c[0], "Suspense Fallback", c[2]], Do(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, ca(t.componentStack)), Tr(I), e.pingedTasks.push(I);
                    }
                  }
                  s.splice(o, 1);
                  break e;
                }
              }
            }
            else rn(e, t, c, l, d, y);
            return;
          case qe:
            throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
          case $t:
            if (I = o._init, o = I(o._payload), e.status === 12) throw null;
            ut(e, t, o, s);
            return;
        }
        if (cr(o)) {
          ls(e, t, o, s);
          return;
        }
        if ((I = ge(o)) && (I = I.call(o))) {
          if (o = I.next(), !o.done) {
            d = [];
            do
              d.push(o.value), o = I.next();
            while (!o.done);
            ls(e, t, d, s);
          }
          return;
        }
        if (typeof o.then == "function") return t.thenableState = null, ut(e, t, rs(o), s);
        if (o.$$typeof === Tt) return ut(e, t, o._currentValue, s);
        throw s = Object.prototype.toString.call(o), Error("Objects are not valid as a React child (found: " + (s === "[object Object]" ? "object with keys {" + Object.keys(o).join(", ") + "}" : s) + "). If you meant to render a collection of children, use an array instead.");
      }
      typeof o == "string" ? (s = t.blockedSegment, s !== null && (s.lastPushedText = Ls(s.chunks, o, e.renderState, s.lastPushedText))) : (typeof o == "number" || typeof o == "bigint") && (s = t.blockedSegment, s !== null && (s.lastPushedText = Ls(s.chunks, "" + o, e.renderState, s.lastPushedText)));
    }
  }
  __name(pa, "pa");
  function ls(e, t, o, s) {
    var l = t.keyPath;
    if (s !== -1 && (t.keyPath = [t.keyPath, "Fragment", s], t.replay !== null)) {
      for (var c = t.replay, d = c.nodes, y = 0; y < d.length; y++) {
        var f = d[y];
        if (f[1] === s) {
          s = f[2], f = f[3], t.replay = { nodes: s, slots: f, pendingTasks: 1 };
          try {
            if (ls(e, t, o, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
            t.replay.pendingTasks--;
          } catch (C) {
            if (typeof C == "object" && C !== null && (C === $ || typeof C.then == "function")) throw C;
            t.replay.pendingTasks--, o = Cr(t.componentStack);
            var b = t.blockedBoundary, k = C;
            o = Ze(e, k, o), $n(e, b, s, f, k, o);
          }
          t.replay = c, d.splice(y, 1);
          break;
        }
      }
      t.keyPath = l;
      return;
    }
    if (c = t.treeContext, d = o.length, t.replay !== null && (y = t.replay.slots, y !== null && typeof y == "object")) {
      for (s = 0; s < d; s++) f = o[s], t.treeContext = h(c, d, s), b = y[s], typeof b == "number" ? (nn(e, t, b, f, s), delete y[s]) : Ne(e, t, f, s);
      t.treeContext = c, t.keyPath = l;
      return;
    }
    for (y = 0; y < d; y++) s = o[y], t.treeContext = h(c, d, y), Ne(e, t, s, y);
    t.treeContext = c, t.keyPath = l;
  }
  __name(ls, "ls");
  function da(e, t, o) {
    if (o.status = 5, o.rootSegmentID = e.nextSegmentId++, e = o.trackedContentKeyPath, e === null) throw Error("It should not be possible to postpone at the root. This is a bug in React.");
    var s = o.trackedFallbackNode, l = [], c = t.workingMap.get(e);
    return c === void 0 ? (o = [e[1], e[2], l, null, s, o.rootSegmentID], t.workingMap.set(e, o), Pr(o, e[0], t), o) : (c[4] = s, c[5] = o.rootSegmentID, c);
  }
  __name(da, "da");
  function ha(e, t, o, s) {
    s.status = 5;
    var l = o.keyPath, c = o.blockedBoundary;
    if (c === null) s.id = e.nextSegmentId++, t.rootSlots = s.id, e.completedRootSegment !== null && (e.completedRootSegment.status = 5);
    else {
      if (c !== null && c.status === 0) {
        var d = da(e, t, c);
        if (c.trackedContentKeyPath === l && o.childIndex === -1) {
          s.id === -1 && (s.id = s.parentFlushed ? c.rootSegmentID : e.nextSegmentId++), d[3] = s.id;
          return;
        }
      }
      if (s.id === -1 && (s.id = s.parentFlushed && c !== null ? c.rootSegmentID : e.nextSegmentId++), o.childIndex === -1) l === null ? t.rootSlots = s.id : (o = t.workingMap.get(l), o === void 0 ? (o = [l[1], l[2], [], s.id], Pr(o, l[0], t)) : o[3] = s.id);
      else {
        if (l === null) {
          if (e = t.rootSlots, e === null) e = t.rootSlots = {};
          else if (typeof e == "number") throw Error("It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React.");
        } else if (c = t.workingMap, d = c.get(l), d === void 0) e = {}, d = [l[1], l[2], [], e], c.set(l, d), Pr(d, l[0], t);
        else if (e = d[3], e === null) e = d[3] = {};
        else if (typeof e == "number") throw Error("It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React.");
        e[o.childIndex] = s.id;
      }
    }
  }
  __name(ha, "ha");
  function An(e, t) {
    e = e.trackedPostpones, e !== null && (t = t.trackedContentKeyPath, t !== null && (t = e.workingMap.get(t), t !== void 0 && (t.length = 4, t[2] = [], t[3] = null)));
  }
  __name(An, "An");
  function yo(e, t, o) {
    return Zr(e, o, t.replay, t.node, t.childIndex, t.blockedBoundary, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
  }
  __name(yo, "yo");
  function us(e, t, o) {
    var s = t.blockedSegment, l = Rt(e, s.chunks.length, null, t.formatContext, s.lastPushedText, true);
    return s.children.push(l), s.lastPushedText = false, _n(e, o, t.node, t.childIndex, t.blockedBoundary, l, t.blockedPreamble, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
  }
  __name(us, "us");
  function Ne(e, t, o, s) {
    var l = t.formatContext, c = t.context, d = t.keyPath, y = t.treeContext, f = t.componentStack, b = t.blockedSegment;
    if (b === null) {
      b = t.replay;
      try {
        return ut(e, t, o, s);
      } catch (I) {
        if (wt(), o = I === $ ? J() : I, e.status !== 12 && typeof o == "object" && o !== null) {
          if (typeof o.then == "function") {
            s = I === $ ? Qe() : null, e = yo(e, t, s).ping, o.then(e, e), t.formatContext = l, t.context = c, t.keyPath = d, t.treeContext = y, t.componentStack = f, t.replay = b, i(c);
            return;
          }
          if (o.message === "Maximum call stack size exceeded") {
            o = I === $ ? Qe() : null, o = yo(e, t, o), e.pingedTasks.push(o), t.formatContext = l, t.context = c, t.keyPath = d, t.treeContext = y, t.componentStack = f, t.replay = b, i(c);
            return;
          }
        }
      }
    } else {
      var k = b.children.length, C = b.chunks.length;
      try {
        return ut(e, t, o, s);
      } catch (I) {
        if (wt(), b.children.length = k, b.chunks.length = C, o = I === $ ? J() : I, e.status !== 12 && typeof o == "object" && o !== null) {
          if (typeof o.then == "function") {
            b = o, o = I === $ ? Qe() : null, e = us(e, t, o).ping, b.then(e, e), t.formatContext = l, t.context = c, t.keyPath = d, t.treeContext = y, t.componentStack = f, i(c);
            return;
          }
          if (o.message === "Maximum call stack size exceeded") {
            b = I === $ ? Qe() : null, b = us(e, t, b), e.pingedTasks.push(b), t.formatContext = l, t.context = c, t.keyPath = d, t.treeContext = y, t.componentStack = f, i(c);
            return;
          }
        }
      }
    }
    throw t.formatContext = l, t.context = c, t.keyPath = d, t.treeContext = y, i(c), o;
  }
  __name(Ne, "Ne");
  function cs(e) {
    var t = e.blockedBoundary, o = e.blockedSegment;
    o !== null && (o.status = 3, or(this, t, e.row, o));
  }
  __name(cs, "cs");
  function $n(e, t, o, s, l, c) {
    for (var d = 0; d < o.length; d++) {
      var y = o[d];
      if (y.length === 4) $n(e, t, y[2], y[3], l, c);
      else {
        y = y[5];
        var f = e, b = c, k = rr(f, null, /* @__PURE__ */ new Set(), null, null);
        k.parentFlushed = true, k.rootSegmentID = y, k.status = 4, k.errorDigest = b, k.parentFlushed && f.clientRenderedBoundaries.push(k);
      }
    }
    if (o.length = 0, s !== null) {
      if (t === null) throw Error("We should not have any resumable nodes in the shell. This is a bug in React.");
      if (t.status !== 4 && (t.status = 4, t.errorDigest = c, t.parentFlushed && e.clientRenderedBoundaries.push(t)), typeof s == "object") for (var C in s) delete s[C];
    }
  }
  __name($n, "$n");
  function ma(e, t, o) {
    var s = e.blockedBoundary, l = e.blockedSegment;
    if (l !== null) {
      if (l.status === 6) return;
      l.status = 3;
    }
    var c = Cr(e.componentStack);
    if (s === null) {
      if (t.status !== 13 && t.status !== 14) {
        if (s = e.replay, s === null) {
          t.trackedPostpones !== null && l !== null ? (s = t.trackedPostpones, Ze(t, o, c), ha(t, s, e, l), or(t, null, e.row, l)) : (Ze(t, o, c), en(t, o));
          return;
        }
        s.pendingTasks--, s.pendingTasks === 0 && 0 < s.nodes.length && (l = Ze(t, o, c), $n(t, null, s.nodes, s.slots, o, l)), t.pendingRootTasks--, t.pendingRootTasks === 0 && Fn(t);
      }
    } else {
      var d = t.trackedPostpones;
      if (s.status !== 4) {
        if (d !== null && l !== null) return Ze(t, o, c), ha(t, d, e, l), s.fallbackAbortableTasks.forEach(function(y) {
          return ma(y, t, o);
        }), s.fallbackAbortableTasks.clear(), or(t, s, e.row, l);
        s.status = 4, l = Ze(t, o, c), s.status = 4, s.errorDigest = l, An(t, s), s.parentFlushed && t.clientRenderedBoundaries.push(s);
      }
      s.pendingTasks--, l = s.row, l !== null && --l.pendingTasks === 0 && et(t, l), s.fallbackAbortableTasks.forEach(function(y) {
        return ma(y, t, o);
      }), s.fallbackAbortableTasks.clear();
    }
    e = e.row, e !== null && --e.pendingTasks === 0 && et(t, e), t.allPendingTasks--, t.allPendingTasks === 0 && nr(t);
  }
  __name(ma, "ma");
  function fa(e, t) {
    try {
      var o = e.renderState, s = o.onHeaders;
      if (s) {
        var l = o.headers;
        if (l) {
          o.headers = null;
          var c = l.preconnects;
          if (l.fontPreloads && (c && (c += ", "), c += l.fontPreloads), l.highImagePreloads && (c && (c += ", "), c += l.highImagePreloads), !t) {
            var d = o.styles.values(), y = d.next();
            e: for (; 0 < l.remainingCapacity && !y.done; y = d.next()) for (var f = y.value.sheets.values(), b = f.next(); 0 < l.remainingCapacity && !b.done; b = f.next()) {
              var k = b.value, C = k.props, I = C.href, A = k.props, le = Tn(A.href, "style", { crossOrigin: A.crossOrigin, integrity: A.integrity, nonce: A.nonce, type: A.type, fetchPriority: A.fetchPriority, referrerPolicy: A.referrerPolicy, media: A.media });
              if (0 <= (l.remainingCapacity -= le.length + 2)) o.resets.style[I] = st, c && (c += ", "), c += le, o.resets.style[I] = typeof C.crossOrigin == "string" || typeof C.integrity == "string" ? [C.crossOrigin, C.integrity] : st;
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
  __name(fa, "fa");
  function Fn(e) {
    e.trackedPostpones === null && fa(e, true), e.trackedPostpones === null && jn(e), e.onShellError = R, e = e.onShellReady, e();
  }
  __name(Fn, "Fn");
  function nr(e) {
    fa(e, e.trackedPostpones === null ? true : e.completedRootSegment === null || e.completedRootSegment.status !== 5), jn(e), e = e.onAllReady, e();
  }
  __name(nr, "nr");
  function bo(e, t) {
    if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null && t.children[0].id === -1) {
      var o = t.children[0];
      o.id = t.id, o.parentFlushed = true, o.status !== 1 && o.status !== 3 && o.status !== 4 || bo(e, o);
    } else e.completedSegments.push(t);
  }
  __name(bo, "bo");
  function jt(e, t, o) {
    if (S !== null) {
      o = o.chunks;
      for (var s = 0, l = 0; l < o.length; l++) s += S(o[l]);
      t === null ? e.byteSize += s : t.byteSize += s;
    }
  }
  __name(jt, "jt");
  function or(e, t, o, s) {
    if (o !== null && (--o.pendingTasks === 0 ? et(e, o) : o.together && is(e, o)), e.allPendingTasks--, t === null) {
      if (s !== null && s.parentFlushed) {
        if (e.completedRootSegment !== null) throw Error("There can only be one root segment. This is a bug in React.");
        e.completedRootSegment = s;
      }
      e.pendingRootTasks--, e.pendingRootTasks === 0 && Fn(e);
    } else if (t.pendingTasks--, t.status !== 4) if (t.pendingTasks === 0) {
      if (t.status === 0 && (t.status = 1), s !== null && s.parentFlushed && (s.status === 1 || s.status === 3) && bo(t, s), t.parentFlushed && e.completedBoundaries.push(t), t.status === 1) o = t.row, o !== null && Gr(o.hoistables, t.contentState), Ut(e, t) || (t.fallbackAbortableTasks.forEach(cs, e), t.fallbackAbortableTasks.clear(), o !== null && --o.pendingTasks === 0 && et(e, o)), e.pendingRootTasks === 0 && e.trackedPostpones === null && t.contentPreamble !== null && jn(e);
      else if (t.status === 5 && (t = t.row, t !== null)) {
        if (e.trackedPostpones !== null) {
          o = e.trackedPostpones;
          var l = t.next;
          if (l !== null && (s = l.boundaries, s !== null)) for (l.boundaries = null, l = 0; l < s.length; l++) {
            var c = s[l];
            da(e, o, c), or(e, c, null, null);
          }
        }
        --t.pendingTasks === 0 && et(e, t);
      }
    } else s === null || !s.parentFlushed || s.status !== 1 && s.status !== 3 || (bo(t, s), t.completedSegments.length === 1 && t.parentFlushed && e.partialBoundaries.push(t)), t = t.row, t !== null && t.together && is(e, t);
    e.allPendingTasks === 0 && nr(e);
  }
  __name(or, "or");
  function on2(e) {
    if (e.status !== 14 && e.status !== 13) {
      var t = Bt, o = Hr.H;
      Hr.H = ns;
      var s = Hr.A;
      Hr.A = ho;
      var l = Pn;
      Pn = e;
      var c = po;
      po = e.resumableState;
      try {
        var d = e.pingedTasks, y;
        for (y = 0; y < d.length; y++) {
          var f = d[y], b = e, k = f.blockedSegment;
          if (k === null) {
            var C = b;
            if (f.replay.pendingTasks !== 0) {
              i(f.context);
              try {
                if (typeof f.replay.slots == "number" ? nn(C, f, f.replay.slots, f.node, f.childIndex) : pa(C, f), f.replay.pendingTasks === 1 && 0 < f.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                f.replay.pendingTasks--, f.abortSet.delete(f), or(C, f.blockedBoundary, f.row, null);
              } catch (Ge) {
                wt();
                var I = Ge === $ ? J() : Ge;
                if (typeof I == "object" && I !== null && typeof I.then == "function") {
                  var A = f.ping;
                  I.then(A, A), f.thenableState = Ge === $ ? Qe() : null;
                } else {
                  f.replay.pendingTasks--, f.abortSet.delete(f);
                  var le = Cr(f.componentStack);
                  b = void 0;
                  var Z = C, se = f.blockedBoundary, je = C.status === 12 ? C.fatalError : I, Ce = f.replay.nodes, vt = f.replay.slots;
                  b = Ze(Z, je, le), $n(Z, se, Ce, vt, je, b), C.pendingRootTasks--, C.pendingRootTasks === 0 && Fn(C), C.allPendingTasks--, C.allPendingTasks === 0 && nr(C);
                }
              }
            }
          } else if (C = void 0, Z = k, Z.status === 0) {
            Z.status = 6, i(f.context);
            var Dt = Z.children.length, Ar = Z.chunks.length;
            try {
              pa(b, f), Z.lastPushedText && Z.textEmbedded && Z.chunks.push(Ct), f.abortSet.delete(f), Z.status = 1, jt(b, f.blockedBoundary, Z), or(b, f.blockedBoundary, f.row, Z);
            } catch (Ge) {
              wt(), Z.children.length = Dt, Z.chunks.length = Ar;
              var z = Ge === $ ? J() : b.status === 12 ? b.fatalError : Ge;
              if (b.status === 12 && b.trackedPostpones !== null) {
                var ar = b.trackedPostpones, Gt = Cr(f.componentStack);
                f.abortSet.delete(f), Ze(b, z, Gt), ha(b, ar, f, Z), or(b, f.blockedBoundary, f.row, Z);
              } else if (typeof z == "object" && z !== null && typeof z.then == "function") {
                Z.status = 0, f.thenableState = Ge === $ ? Qe() : null;
                var Pt = f.ping;
                z.then(Pt, Pt);
              } else {
                var sr = Cr(f.componentStack);
                f.abortSet.delete(f), Z.status = 4;
                var Ae = f.blockedBoundary, $r = f.row;
                if ($r !== null && --$r.pendingTasks === 0 && et(b, $r), b.allPendingTasks--, C = Ze(b, z, sr), Ae === null) en(b, z);
                else if (Ae.pendingTasks--, Ae.status !== 4) {
                  Ae.status = 4, Ae.errorDigest = C, An(b, Ae);
                  var Jt = Ae.row;
                  Jt !== null && --Jt.pendingTasks === 0 && et(b, Jt), Ae.parentFlushed && b.clientRenderedBoundaries.push(Ae), b.pendingRootTasks === 0 && b.trackedPostpones === null && Ae.contentPreamble !== null && jn(b);
                }
                b.allPendingTasks === 0 && nr(b);
              }
            }
          }
        }
        d.splice(0, y), e.destination !== null && wr(e, e.destination);
      } catch (Ge) {
        Ze(e, Ge, {}), en(e, Ge);
      } finally {
        po = c, Hr.H = o, Hr.A = s, o === ns && i(t), Pn = l;
      }
    }
  }
  __name(on2, "on");
  function On(e, t, o) {
    t.preambleChildren.length && o.push(t.preambleChildren);
    for (var s = false, l = 0; l < t.children.length; l++) s = Nn(e, t.children[l], o) || s;
    return s;
  }
  __name(On, "On");
  function Nn(e, t, o) {
    var s = t.boundary;
    if (s === null) return On(e, t, o);
    var l = s.contentPreamble, c = s.fallbackPreamble;
    if (l === null || c === null) return false;
    switch (s.status) {
      case 1:
        if (Fa(e.renderState, l), e.byteSize += s.byteSize, t = s.completedSegments[0], !t) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
        return On(e, t, o);
      case 5:
        if (e.trackedPostpones !== null) return true;
      case 4:
        if (t.status === 1) return Fa(e.renderState, c), On(e, t, o);
      default:
        return true;
    }
  }
  __name(Nn, "Nn");
  function jn(e) {
    if (e.completedRootSegment && e.completedPreambleSegments === null) {
      var t = [], o = e.byteSize, s = Nn(e, e.completedRootSegment, t), l = e.renderState.preamble;
      s === false || l.headChunks && l.bodyChunks ? e.completedPreambleSegments = t : e.byteSize = o;
    }
  }
  __name(jn, "jn");
  function Yt(e, t, o, s) {
    switch (o.parentFlushed = true, o.status) {
      case 0:
        o.id = e.nextSegmentId++;
      case 5:
        return s = o.id, o.lastPushedText = false, o.textEmbedded = false, e = e.renderState, w(t, gr), w(t, e.placeholderPrefix), e = s.toString(16), w(t, e), ie(t, Js);
      case 1:
        o.status = 2;
        var l = true, c = o.chunks, d = 0;
        o = o.children;
        for (var y = 0; y < o.length; y++) {
          for (l = o[y]; d < l.index; d++) w(t, c[d]);
          l = Mn(e, t, l, s);
        }
        for (; d < c.length - 1; d++) w(t, c[d]);
        return d < c.length && (l = ie(t, c[d])), l;
      case 3:
        return true;
      default:
        throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
    }
  }
  __name(Yt, "Yt");
  var Dn = 0;
  function Mn(e, t, o, s) {
    var l = o.boundary;
    if (l === null) return Yt(e, t, o, s);
    if (l.parentFlushed = true, l.status === 4) {
      var c = l.row;
      c !== null && --c.pendingTasks === 0 && et(e, c), l = l.errorDigest, ie(t, Hi), w(t, yt), l && (w(t, qo), w(t, G(l)), w(t, Bi)), ie(t, Vo), Yt(e, t, o, s);
    } else if (l.status !== 1) l.status === 0 && (l.rootSegmentID = e.nextSegmentId++), 0 < l.completedSegments.length && e.partialBoundaries.push(l), Xs(t, e.renderState, l.rootSegmentID), s && Gr(s, l.fallbackState), Yt(e, t, o, s);
    else if (!Ln && Ut(e, l) && (Dn + l.byteSize > e.progressiveChunkSize || Qa(l.contentState))) l.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(l), Xs(t, e.renderState, l.rootSegmentID), Yt(e, t, o, s);
    else {
      if (Dn += l.byteSize, s && Gr(s, l.contentState), o = l.row, o !== null && Ut(e, l) && --o.pendingTasks === 0 && et(e, o), ie(t, Bo), o = l.completedSegments, o.length !== 1) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
      Mn(e, t, o[0], s);
    }
    return ie(t, tt);
  }
  __name(Mn, "Mn");
  function xr(e, t, o, s) {
    return Zs(t, e.renderState, o.parentFormatContext, o.id), Mn(e, t, o, s), ei(t, o.parentFormatContext);
  }
  __name(xr, "xr");
  function ps(e, t, o) {
    Dn = o.byteSize;
    for (var s = o.completedSegments, l = 0; l < s.length; l++) So(e, t, o, s[l]);
    s.length = 0, s = o.row, s !== null && Ut(e, o) && --s.pendingTasks === 0 && et(e, s), Ke(t, o.contentState, e.renderState), s = e.resumableState, e = e.renderState, l = o.rootSegmentID, o = o.contentState;
    var c = e.stylesToHoist;
    return e.stylesToHoist = false, w(t, e.startInlineScript), w(t, Re), c ? ((s.instructions & 4) === 0 && (s.instructions |= 4, w(t, si)), (s.instructions & 2) === 0 && (s.instructions |= 2, w(t, ri)), (s.instructions & 8) === 0 ? (s.instructions |= 8, w(t, oi)) : w(t, zi)) : ((s.instructions & 2) === 0 && (s.instructions |= 2, w(t, ri)), w(t, ni)), s = l.toString(16), w(t, e.boundaryPrefix), w(t, s), w(t, ai), w(t, e.segmentPrefix), w(t, s), c ? (w(t, Yo), di(t, o)) : w(t, Ki), o = ie(t, La), Oa(t, e) && o;
  }
  __name(ps, "ps");
  function So(e, t, o, s) {
    if (s.status === 2) return true;
    var l = o.contentState, c = s.id;
    if (c === -1) {
      if ((s.id = o.rootSegmentID) === -1) throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
      return xr(e, t, s, l);
    }
    return c === o.rootSegmentID ? xr(e, t, s, l) : (xr(e, t, s, l), o = e.resumableState, e = e.renderState, w(t, e.startInlineScript), w(t, Re), (o.instructions & 1) === 0 ? (o.instructions |= 1, w(t, ti)) : w(t, Vi), w(t, e.segmentPrefix), c = c.toString(16), w(t, c), w(t, Wi), w(t, e.placeholderPrefix), w(t, c), t = ie(t, Ui), t);
  }
  __name(So, "So");
  var Ln = false;
  function wr(e, t) {
    ye = new Uint8Array(2048), de = 0, Mt = true;
    try {
      if (!(0 < e.pendingRootTasks)) {
        var o, s = e.completedRootSegment;
        if (s !== null) {
          if (s.status === 5) return;
          var l = e.completedPreambleSegments;
          if (l === null) return;
          Dn = e.byteSize;
          var c = e.resumableState, d = e.renderState, y = d.preamble, f = y.htmlChunks, b = y.headChunks, k;
          if (f) {
            for (k = 0; k < f.length; k++) w(t, f[k]);
            if (b) for (k = 0; k < b.length; k++) w(t, b[k]);
            else w(t, Ie("head")), w(t, Re);
          } else if (b) for (k = 0; k < b.length; k++) w(t, b[k]);
          var C = d.charsetChunks;
          for (k = 0; k < C.length; k++) w(t, C[k]);
          C.length = 0, d.preconnects.forEach(rt, t), d.preconnects.clear();
          var I = d.viewportChunks;
          for (k = 0; k < I.length; k++) w(t, I[k]);
          I.length = 0, d.fontPreloads.forEach(rt, t), d.fontPreloads.clear(), d.highImagePreloads.forEach(rt, t), d.highImagePreloads.clear(), Br = d, d.styles.forEach(Xo, t), Br = null;
          var A = d.importMapChunks;
          for (k = 0; k < A.length; k++) w(t, A[k]);
          A.length = 0, d.bootstrapScripts.forEach(rt, t), d.scripts.forEach(rt, t), d.scripts.clear(), d.bulkPreloads.forEach(rt, t), d.bulkPreloads.clear(), f || b || (c.instructions |= 32);
          var le = d.hoistableChunks;
          for (k = 0; k < le.length; k++) w(t, le[k]);
          for (c = le.length = 0; c < l.length; c++) {
            var Z = l[c];
            for (d = 0; d < Z.length; d++) Mn(e, t, Z[d], null);
          }
          var se = e.renderState.preamble, je = se.headChunks;
          (se.htmlChunks || je) && w(t, fr("head"));
          var Ce = se.bodyChunks;
          if (Ce) for (l = 0; l < Ce.length; l++) w(t, Ce[l]);
          Mn(e, t, s, null), e.completedRootSegment = null;
          var vt = e.renderState;
          if (e.allPendingTasks !== 0 || e.clientRenderedBoundaries.length !== 0 || e.completedBoundaries.length !== 0 || e.trackedPostpones !== null && (e.trackedPostpones.rootNodes.length !== 0 || e.trackedPostpones.rootSlots !== null)) {
            var Dt = e.resumableState;
            if ((Dt.instructions & 64) === 0) {
              if (Dt.instructions |= 64, w(t, vt.startInlineScript), (Dt.instructions & 32) === 0) {
                Dt.instructions |= 32;
                var Ar = "_" + Dt.idPrefix + "R_";
                w(t, Zo), w(t, G(Ar)), w(t, we);
              }
              w(t, Re), w(t, Gs), ie(t, Kn);
            }
          }
          Oa(t, vt);
        }
        var z = e.renderState;
        s = 0;
        var ar = z.viewportChunks;
        for (s = 0; s < ar.length; s++) w(t, ar[s]);
        ar.length = 0, z.preconnects.forEach(rt, t), z.preconnects.clear(), z.fontPreloads.forEach(rt, t), z.fontPreloads.clear(), z.highImagePreloads.forEach(rt, t), z.highImagePreloads.clear(), z.styles.forEach(xt, t), z.scripts.forEach(rt, t), z.scripts.clear(), z.bulkPreloads.forEach(rt, t), z.bulkPreloads.clear();
        var Gt = z.hoistableChunks;
        for (s = 0; s < Gt.length; s++) w(t, Gt[s]);
        Gt.length = 0;
        var Pt = e.clientRenderedBoundaries;
        for (o = 0; o < Pt.length; o++) {
          var sr = Pt[o];
          z = t;
          var Ae = e.resumableState, $r = e.renderState, Jt = sr.rootSegmentID, Ge = sr.errorDigest;
          w(z, $r.startInlineScript), w(z, Re), (Ae.instructions & 4) === 0 ? (Ae.instructions |= 4, w(z, bn)) : w(z, Ha), w(z, $r.boundaryPrefix), w(z, Jt.toString(16)), w(z, Go), Ge && (w(z, ii), w(z, Gi(Ge || "")));
          var _t = ie(z, Sn);
          if (!_t) {
            e.destination = null, o++, Pt.splice(0, o);
            return;
          }
        }
        Pt.splice(0, o);
        var ko = e.completedBoundaries;
        for (o = 0; o < ko.length; o++) if (!ps(e, t, ko[o])) {
          e.destination = null, o++, ko.splice(0, o);
          return;
        }
        ko.splice(0, o), zn(t), ye = new Uint8Array(2048), de = 0, Ln = Mt = true;
        var vo = e.partialBoundaries;
        for (o = 0; o < vo.length; o++) {
          var sn = vo[o];
          e: {
            Pt = e, sr = t, Dn = sn.byteSize;
            var To = sn.completedSegments;
            for (_t = 0; _t < To.length; _t++) if (!So(Pt, sr, sn, To[_t])) {
              _t++, To.splice(0, _t);
              var hs = false;
              break e;
            }
            To.splice(0, _t);
            var Fr = sn.row;
            Fr !== null && Fr.together && sn.pendingTasks === 1 && (Fr.pendingTasks === 1 ? ss(Pt, Fr, Fr.hoistables) : Fr.pendingTasks--), hs = Ke(sr, sn.contentState, Pt.renderState);
          }
          if (!hs) {
            e.destination = null, o++, vo.splice(0, o);
            return;
          }
        }
        vo.splice(0, o), Ln = false;
        var Bn = e.completedBoundaries;
        for (o = 0; o < Bn.length; o++) if (!ps(e, t, Bn[o])) {
          e.destination = null, o++, Bn.splice(0, o);
          return;
        }
        Bn.splice(0, o);
      }
    } finally {
      Ln = false, e.allPendingTasks === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 ? (e.flushScheduled = false, o = e.resumableState, o.hasBody && w(t, fr("body")), o.hasHtml && w(t, fr("html")), zn(t), Lr(t), e.status = 14, t.end(), e.destination = null) : (zn(t), Lr(t));
    }
  }
  __name(wr, "wr");
  function Rr(e) {
    e.flushScheduled = e.destination !== null, Un(function() {
      return xn.run(e, on2, e);
    }), setImmediate(function() {
      e.status === 10 && (e.status = 11), e.trackedPostpones === null && xn.run(e, Xi, e);
    });
  }
  __name(Rr, "Rr");
  function Xi(e) {
    fa(e, e.pendingRootTasks === 0);
  }
  __name(Xi, "Xi");
  function Er(e) {
    e.flushScheduled === false && e.pingedTasks.length === 0 && e.destination !== null && (e.flushScheduled = true, setImmediate(function() {
      var t = e.destination;
      t ? wr(e, t) : e.flushScheduled = false;
    }));
  }
  __name(Er, "Er");
  function kt(e, t) {
    if (e.status === 13) e.status = 14, t.destroy(e.fatalError);
    else if (e.status !== 14 && e.destination === null) {
      e.destination = t;
      try {
        wr(e, t);
      } catch (o) {
        Ze(e, o, {}), en(e, o);
      }
    }
  }
  __name(kt, "kt");
  function _e(e, t) {
    (e.status === 11 || e.status === 10) && (e.status = 12);
    try {
      var o = e.abortableTasks;
      if (0 < o.size) {
        var s = t === void 0 ? Error("The render was aborted by the server without a reason.") : typeof t == "object" && t !== null && typeof t.then == "function" ? Error("The render was aborted by the server with a promise.") : t;
        e.fatalError = s, o.forEach(function(l) {
          return ma(l, e, s);
        }), o.clear();
      }
      e.destination !== null && wr(e, e.destination);
    } catch (l) {
      Ze(e, l, {}), en(e, l);
    }
  }
  __name(_e, "_e");
  function Pr(e, t, o) {
    if (t === null) o.rootNodes.push(e);
    else {
      var s = o.workingMap, l = s.get(t);
      l === void 0 && (l = [t[1], t[2], [], null], s.set(t, l), Pr(l, t[0], o)), l[2].push(e);
    }
  }
  __name(Pr, "Pr");
  function an(e) {
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
  __name(an, "an");
  function _r() {
    var e = F.version;
    if (e !== "19.2.4") throw Error(`Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      ` + (e + `
  - react-dom:  19.2.4
Learn more: https://react.dev/warnings/version-mismatch`));
  }
  __name(_r, "_r");
  _r();
  function fi(e, t) {
    return function() {
      return kt(t, e);
    };
  }
  __name(fi, "fi");
  function Be(e, t) {
    return function() {
      e.destination = null, _e(e, Error(t));
    };
  }
  __name(Be, "Be");
  function Ye(e, t) {
    var o = No(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0);
    return zt(e, o, Ft(o, t ? t.nonce : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, t ? t.onHeaders : void 0, t ? t.maxHeadersLength : void 0), jo(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, t ? t.onAllReady : void 0, t ? t.onShellReady : void 0, t ? t.onShellError : void 0, void 0, t ? t.onPostpone : void 0, t ? t.formState : void 0);
  }
  __name(Ye, "Ye");
  function ds(e) {
    return { write: /* @__PURE__ */ __name(function(t) {
      return typeof t == "string" && (t = pr.encode(t)), e.enqueue(t), true;
    }, "write"), end: /* @__PURE__ */ __name(function() {
      e.close();
    }, "end"), destroy: /* @__PURE__ */ __name(function(t) {
      typeof e.error == "function" ? e.error(t) : e.close();
    }, "destroy") };
  }
  __name(ds, "ds");
  function Hn(e, t, o) {
    return fo(e, t, Ft(t.resumableState, o ? o.nonce : void 0, void 0, void 0, void 0, void 0), o ? o.onError : void 0, o ? o.onAllReady : void 0, o ? o.onShellReady : void 0, o ? o.onShellError : void 0, void 0, o ? o.onPostpone : void 0);
  }
  __name(Hn, "Hn");
  _r();
  function ga(e) {
    return { write: /* @__PURE__ */ __name(function(t) {
      return typeof t == "string" && (t = pr.encode(t)), e.enqueue(t), true;
    }, "write"), end: /* @__PURE__ */ __name(function() {
      e.close();
    }, "end"), destroy: /* @__PURE__ */ __name(function(t) {
      typeof e.error == "function" ? e.error(t) : e.close();
    }, "destroy") };
  }
  __name(ga, "ga");
  function Ir(e) {
    return { write: /* @__PURE__ */ __name(function(t) {
      return e.push(t);
    }, "write"), end: /* @__PURE__ */ __name(function() {
      e.push(null);
    }, "end"), destroy: /* @__PURE__ */ __name(function(t) {
      e.destroy(t);
    }, "destroy") };
  }
  __name(Ir, "Ir");
  return ur.prerender = function(e, t) {
    return new Promise(function(o, s) {
      var l = t ? t.onHeaders : void 0, c;
      l && (c = /* @__PURE__ */ __name(function(k) {
        l(new Headers(k));
      }, "c"));
      var d = No(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), y = ua(e, d, Ft(d, void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, c, t ? t.maxHeadersLength : void 0), jo(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, function() {
        var k, C = new ReadableStream({ type: "bytes", start: /* @__PURE__ */ __name(function(I) {
          k = ga(I);
        }, "start"), pull: /* @__PURE__ */ __name(function() {
          kt(y, k);
        }, "pull"), cancel: /* @__PURE__ */ __name(function(I) {
          y.destination = null, _e(y, I);
        }, "cancel") }, { highWaterMark: 0 });
        C = { postponed: an(y), prelude: C }, o(C);
      }, void 0, void 0, s, t ? t.onPostpone : void 0);
      if (t && t.signal) {
        var f = t.signal;
        if (f.aborted) _e(y, f.reason);
        else {
          var b = /* @__PURE__ */ __name(function() {
            _e(y, f.reason), f.removeEventListener("abort", b);
          }, "b");
          f.addEventListener("abort", b);
        }
      }
      Rr(y);
    });
  }, ur.prerenderToNodeStream = function(e, t) {
    return new Promise(function(o, s) {
      var l = No(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), c = ua(e, l, Ft(l, void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, t ? t.onHeaders : void 0, t ? t.maxHeadersLength : void 0), jo(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, function() {
        var f = new D.Readable({ read: /* @__PURE__ */ __name(function() {
          kt(c, b);
        }, "read") }), b = Ir(f);
        f = { postponed: an(c), prelude: f }, o(f);
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
      Rr(c);
    });
  }, ur.renderToPipeableStream = function(e, t) {
    var o = Ye(e, t), s = false;
    return Rr(o), { pipe: /* @__PURE__ */ __name(function(l) {
      if (s) throw Error("React currently only supports piping to one writable stream.");
      return s = true, fa(o, o.trackedPostpones === null || o.completedRootSegment === null ? o.pendingRootTasks === 0 : o.completedRootSegment.status !== 5), kt(o, l), l.on("drain", fi(l, o)), l.on("error", Be(o, "The destination stream errored while writing data.")), l.on("close", Be(o, "The destination stream closed early.")), l;
    }, "pipe"), abort: /* @__PURE__ */ __name(function(l) {
      _e(o, l);
    }, "abort") };
  }, ur.renderToReadableStream = function(e, t) {
    return new Promise(function(o, s) {
      var l, c, d = new Promise(function(A, le) {
        c = A, l = le;
      }), y = t ? t.onHeaders : void 0, f;
      y && (f = /* @__PURE__ */ __name(function(A) {
        y(new Headers(A));
      }, "f"));
      var b = No(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), k = zt(e, b, Ft(b, t ? t.nonce : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, f, t ? t.maxHeadersLength : void 0), jo(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, c, function() {
        var A, le = new ReadableStream({ type: "bytes", start: /* @__PURE__ */ __name(function(Z) {
          A = ds(Z);
        }, "start"), pull: /* @__PURE__ */ __name(function() {
          kt(k, A);
        }, "pull"), cancel: /* @__PURE__ */ __name(function(Z) {
          k.destination = null, _e(k, Z);
        }, "cancel") }, { highWaterMark: 0 });
        le.allReady = d, o(le);
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
      Rr(k);
    });
  }, ur.resume = function(e, t, o) {
    return new Promise(function(s, l) {
      var c, d, y = new Promise(function(C, I) {
        d = C, c = I;
      }), f = fo(e, t, Ft(t.resumableState, o ? o.nonce : void 0, void 0, void 0, void 0, void 0), o ? o.onError : void 0, d, function() {
        var C, I = new ReadableStream({ type: "bytes", start: /* @__PURE__ */ __name(function(A) {
          C = ds(A);
        }, "start"), pull: /* @__PURE__ */ __name(function() {
          kt(f, C);
        }, "pull"), cancel: /* @__PURE__ */ __name(function(A) {
          f.destination = null, _e(f, A);
        }, "cancel") }, { highWaterMark: 0 });
        I.allReady = y, s(I);
      }, function(C) {
        y.catch(function() {
        }), l(C);
      }, c, o ? o.onPostpone : void 0);
      if (o && o.signal) {
        var b = o.signal;
        if (b.aborted) _e(f, b.reason);
        else {
          var k = /* @__PURE__ */ __name(function() {
            _e(f, b.reason), b.removeEventListener("abort", k);
          }, "k");
          b.addEventListener("abort", k);
        }
      }
      Rr(f);
    });
  }, ur.resumeAndPrerender = function(e, t, o) {
    return new Promise(function(s, l) {
      var c = vr(e, t, Ft(t.resumableState, void 0, void 0, void 0, void 0, void 0), o ? o.onError : void 0, function() {
        var f, b = new ReadableStream({ type: "bytes", start: /* @__PURE__ */ __name(function(k) {
          f = ga(k);
        }, "start"), pull: /* @__PURE__ */ __name(function() {
          kt(c, f);
        }, "pull"), cancel: /* @__PURE__ */ __name(function(k) {
          c.destination = null, _e(c, k);
        }, "cancel") }, { highWaterMark: 0 });
        b = { postponed: an(c), prelude: b }, s(b);
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
      Rr(c);
    });
  }, ur.resumeAndPrerenderToNodeStream = function(e, t, o) {
    return new Promise(function(s, l) {
      var c = vr(e, t, Ft(t.resumableState, void 0, void 0, void 0, void 0, void 0), o ? o.onError : void 0, function() {
        var f = new D.Readable({ read: /* @__PURE__ */ __name(function() {
          kt(c, b);
        }, "read") }), b = Ir(f);
        f = { postponed: an(c), prelude: f }, s(f);
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
      Rr(c);
    });
  }, ur.resumeToPipeableStream = function(e, t, o) {
    var s = Hn(e, t, o), l = false;
    return Rr(s), { pipe: /* @__PURE__ */ __name(function(c) {
      if (l) throw Error("React currently only supports piping to one writable stream.");
      return l = true, kt(s, c), c.on("drain", fi(c, s)), c.on("error", Be(s, "The destination stream errored while writing data.")), c.on("close", Be(s, "The destination stream closed early.")), c;
    }, "pipe"), abort: /* @__PURE__ */ __name(function(c) {
      _e(s, c);
    }, "abort") };
  }, ur.version = "19.2.4", ur;
}
__name(Du, "Du");
var ou;
function Mu() {
  if (ou) return un;
  ou = 1;
  var O, M;
  return O = ju(), M = Du(), un.version = O.version, un.renderToString = O.renderToString, un.renderToStaticMarkup = O.renderToStaticMarkup, un.renderToPipeableStream = M.renderToPipeableStream, un.renderToReadableStream = M.renderToReadableStream, un.resumeToPipeableStream = M.resumeToPipeableStream, un.resume = M.resume, un;
}
__name(Mu, "Mu");
var Lu = Mu();
var Fe = Pi();
var Hu = /* @__PURE__ */ new Set(["initial", "animate", "exit", "transition", "variants", "whileHover", "whileTap", "whileFocus", "whileDrag", "whileInView", "drag", "dragConstraints", "dragElastic", "dragMomentum", "onDragStart", "onDrag", "onDragEnd", "layout", "layoutId", "onAnimationStart", "onAnimationComplete"]);
function Bu(O) {
  let M = {};
  for (let N in O) Hu.has(N) || (M[N] = O[N]);
  return M;
}
__name(Bu, "Bu");
var qu = { get(O, M) {
  return Fe.forwardRef((N, F) => Fe.createElement(M, { ...Bu(N), ref: F }));
} };
var ke = new Proxy({}, qu);
function du({ children: O }) {
  return O;
}
__name(du, "du");
var hu = Fe.createContext(false);
function Vu({ children: O, isSSR: M = false }) {
  return m.jsx(hu.Provider, { value: M, children: O });
}
__name(Vu, "Vu");
function _o() {
  return Fe.useContext(hu);
}
__name(_o, "_o");
function au() {
  let [O, M] = Fe.useState("dark");
  Fe.useEffect(() => {
    M(document.documentElement.dataset.theme || "dark");
  }, []);
  let N = /* @__PURE__ */ __name(() => {
    let F = O === "dark" ? "light" : "dark";
    M(F), document.documentElement.dataset.theme = F, localStorage.setItem("theme", F);
  }, "N");
  return m.jsx("button", { onClick: N, "aria-label": `Switch to ${O === "dark" ? "light" : "dark"} mode`, className: "p-2 rounded-lg text-[var(--text-body)] hover:text-[var(--text-heading)] hover:bg-[var(--hover-bg)] transition-all duration-300 cursor-pointer", children: O === "dark" ? m.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: m.jsx("path", { d: "M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" }) }) : m.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: m.jsx("path", { fillRule: "evenodd", d: "M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z", clipRule: "evenodd" }) }) });
}
__name(au, "au");
var Or = { name: "Joshwa", email: "joshwa@example.com", location: "India", title: "Full Stack Developer" };
var su = [{ label: "About", href: "#about" }, { label: "Skills", href: "#skills" }, { label: "Projects", href: "#projects" }, { label: "Experience", href: "#experience" }, { label: "Contact", href: "#contact" }];
var It = { opacity: 0, y: 30 };
var dt = { opacity: 1, y: 0 };
var Wu = { opacity: 0, y: 40 };
var Wn = { duration: 0.6 };
var Ei = { duration: 0.5 };
var Os = /* @__PURE__ */ __name((O, M = 0.08) => O * M, "Os");
var $e = { sectionPadding: "py-28 md:py-36 relative", sectionLabel: "font-mono text-sm text-orange-400 tracking-wider", sectionHeading: "font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mt-3 mb-4", sectionLine: "section-line", glassCard: "glass rounded-2xl glow-card gradient-border-animated", primaryBtn: "text-sm font-semibold text-white rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30", ghostBtn: "text-sm font-medium text-[var(--text-subtle)] rounded-full glass hover:bg-[var(--surface-bg)] hover:text-[var(--text-heading)] hover:border-orange-500/25 transition-all duration-300" };
var iu = [{ label: "LinkedIn", href: "#", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z", viewBox: "0 0 24 24" }, { label: "GitHub", href: "#", icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z", viewBox: "0 0 24 24" }, { label: "Email", href: "mailto:joshwa@example.com", icon: "M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Zm16 4.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z", viewBox: "0 0 20 20" }];
function Uu() {
  let O = _o(), [M, N] = Fe.useState(false), [F, V] = Fe.useState(false);
  return Fe.useEffect(() => {
    let D = /* @__PURE__ */ __name(() => N(window.scrollY > 20), "D");
    return window.addEventListener("scroll", D, { passive: true }), () => window.removeEventListener("scroll", D);
  }, []), Fe.useEffect(() => (document.body.style.overflow = F ? "hidden" : "", () => {
    document.body.style.overflow = "";
  }), [F]), m.jsxs(m.Fragment, { children: [m.jsx(ke.nav, { initial: O ? false : { y: -80 }, animate: { y: 0 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }, className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${M ? "py-3" : "py-5"}`, children: m.jsxs("div", { className: "container-main flex items-center justify-between", children: [m.jsxs("a", { href: "#home", className: "font-heading text-2xl font-bold text-[var(--text-heading)] relative z-50", children: ["J", m.jsx("span", { className: "gradient-text text-3xl font-extrabold", children: "." })] }), m.jsx("div", { className: `hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 ${M ? "glass-strong shadow-lg shadow-black/20" : "glass"}`, children: su.map((D) => m.jsx("a", { href: D.href, className: "relative text-sm text-[var(--text-body)] hover:text-[var(--text-heading)] px-4 py-2 rounded-full hover:bg-[var(--surface-bg)] transition-all duration-300", children: D.label }, D.href)) }), m.jsxs("div", { className: "hidden md:flex items-center gap-3", children: [m.jsx(au, {}), m.jsx("a", { href: "#contact", className: "relative text-sm font-semibold text-white px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition-all duration-300 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105", children: "Let's Talk" })] }), m.jsx("button", { onClick: /* @__PURE__ */ __name(() => V(!F), "onClick"), className: "md:hidden p-2 cursor-pointer relative z-50", "aria-label": "Menu", children: m.jsxs("div", { className: "space-y-1.5", children: [m.jsx("span", { className: `block w-6 h-0.5 bg-[var(--text-subtle)] transition-all duration-300 origin-center ${F ? "rotate-45 translate-y-2" : ""}` }), m.jsx("span", { className: `block w-6 h-0.5 bg-[var(--text-subtle)] transition-all duration-300 ${F ? "opacity-0 scale-0" : ""}` }), m.jsx("span", { className: `block w-6 h-0.5 bg-[var(--text-subtle)] transition-all duration-300 origin-center ${F ? "-rotate-45 -translate-y-2" : ""}` })] }) })] }) }), m.jsx(du, { children: F && m.jsxs(ke.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, className: "fixed inset-0 z-40 md:hidden", children: [m.jsx("div", { className: "absolute inset-0 bg-[var(--bg-body)]/95 backdrop-blur-2xl" }), m.jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center h-full gap-2", children: [su.map((D, xe) => m.jsx(ke.a, { href: D.href, onClick: /* @__PURE__ */ __name(() => V(false), "onClick"), initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { duration: 0.4, delay: xe * 0.08 }, className: "text-4xl font-heading font-bold text-[var(--text-heading)] hover:text-orange-400 transition-colors py-3", children: D.label }, D.href)), m.jsxs(ke.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.45 }, className: "flex items-center gap-4 mt-8", children: [m.jsx(au, {}), m.jsx("a", { href: "#contact", onClick: /* @__PURE__ */ __name(() => V(false), "onClick"), className: "text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 rounded-full", children: "Let's Talk" })] })] })] }) })] });
}
__name(Uu, "Uu");
var lu = ["React & Remix", "JavaScript (ES6+)", "REST API Integration", "NLQ & AI", "Pixel-Perfect UI"];
function zu() {
  let O = _o(), [M, N] = Fe.useState(""), [F, V] = Fe.useState(0), [D, xe] = Fe.useState(false);
  return Fe.useEffect(() => {
    let qe = lu[F], q = setTimeout(() => {
      D ? (N(qe.substring(0, M.length - 1)), M === "" && (xe(false), V((_) => (_ + 1) % lu.length))) : (N(qe.substring(0, M.length + 1)), M === qe && setTimeout(() => xe(true), 2e3));
    }, D ? 40 : 80);
    return () => clearTimeout(q);
  }, [M, D, F]), m.jsxs("section", { id: "home", className: "relative min-h-screen flex items-center overflow-hidden", children: [m.jsx("div", { className: "absolute inset-0 grid-pattern opacity-50" }), m.jsx("div", { className: "absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/[0.04] rounded-full blur-[180px] pointer-events-none" }), m.jsx("div", { className: "absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[150px] pointer-events-none" }), m.jsxs("div", { className: "container-main relative", children: [m.jsxs("div", { className: "flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-8", children: [m.jsx(ke.div, { initial: O ? false : { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.7, delay: 0.1 }, className: "flex lg:hidden justify-center pt-4", children: m.jsxs("div", { className: "relative", children: [m.jsx("div", { className: "absolute -inset-3 rounded-full bg-gradient-to-br from-orange-500/20 via-pink-500/15 to-purple-500/20 blur-xl" }), m.jsx("div", { className: "absolute -inset-[2px] rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 opacity-50" }), m.jsx("div", { className: "relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden", children: m.jsx("img", { src: "/profile.jpg", alt: Or.name, className: "w-full h-full object-cover", style: { objectPosition: "60% 15%" }, width: 144, height: 144, fetchPriority: "high" }) })] }) }), m.jsxs("div", { className: "max-w-3xl flex-1 text-center lg:text-left pt-0 lg:pt-16", children: [m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: { duration: 0.7, delay: 0.2 }, children: [m.jsx("p", { className: "text-lg sm:text-xl md:text-2xl text-[var(--text-body)] mb-3 font-light", children: "Hey, I'm" }), m.jsxs("h1", { className: "font-heading text-5xl sm:text-7xl md:text-[9rem] lg:text-[10rem] font-bold leading-[0.9] tracking-tight mb-2", children: [m.jsx("span", { className: "gradient-text", style: { filter: "drop-shadow(0 0 40px rgba(249,115,22,0.2))" }, children: Or.name }), m.jsx("span", { className: "gradient-text", children: "." })] })] }), m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: { duration: 0.7, delay: 0.35 }, className: "flex items-center justify-center lg:justify-start gap-3 sm:gap-5 mt-6 mb-4", children: [m.jsx("div", { className: "w-8 sm:w-12 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shrink-0" }), m.jsxs("p", { className: "text-sm sm:text-lg md:text-xl text-[var(--text-subtle)] font-light tracking-wide", children: [Or.title, " | Currently focused on Frontend"] })] }), m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: { duration: 0.7, delay: 0.45 }, className: "mb-12", children: [m.jsxs("span", { className: "font-mono text-sm sm:text-base text-orange-400/70", children: ["> ", M] }), m.jsx("span", { className: "typing-cursor" })] }), m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: { duration: 0.7, delay: 0.55 }, className: "flex flex-wrap justify-center lg:justify-start gap-4", children: [m.jsxs("a", { href: "#projects", className: `group flex items-center gap-3 px-8 py-4 hover:scale-105 ${$e.primaryBtn}`, children: ["View Projects", m.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-4 h-4 group-hover:translate-x-1 transition-transform", children: m.jsx("path", { fillRule: "evenodd", d: "M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z", clipRule: "evenodd" }) })] }), m.jsx("a", { href: "#contact", className: `px-8 py-4 hover:scale-105 ${$e.ghostBtn}`, children: "Contact Me" })] })] }), m.jsx(ke.div, { initial: O ? false : { opacity: 0, scale: 0.85, rotate: -3 }, animate: { opacity: 1, scale: 1, rotate: 0 }, transition: { duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }, className: "hidden lg:flex flex-shrink-0 mt-12", children: m.jsxs("div", { className: "relative", children: [m.jsx("div", { className: "absolute -inset-6 rounded-3xl bg-gradient-to-br from-orange-500/20 via-pink-500/15 to-purple-500/20 blur-2xl" }), m.jsx("div", { className: "absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 opacity-50" }), m.jsxs("div", { className: "relative w-72 h-[22rem] xl:w-80 xl:h-[25rem] rounded-3xl overflow-hidden", children: [m.jsx("img", { src: "/profile.jpg", alt: Or.name, className: "w-full h-full object-cover", style: { objectPosition: "60% 15%" }, width: 320, height: 400, fetchPriority: "high" }), m.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" })] }), m.jsx("div", { className: "absolute -top-3 -right-3 w-6 h-6 rounded-full border border-orange-500/40 bg-orange-500/10 backdrop-blur-sm" }), m.jsx("div", { className: "absolute -bottom-3 -left-3 w-4 h-4 rounded-full border border-pink-500/40 bg-pink-500/10 backdrop-blur-sm" }), m.jsx("div", { className: "absolute top-1/2 -right-5 w-3 h-3 rounded-full bg-purple-500/30" })] }) })] }), m.jsxs(ke.div, { initial: O ? false : { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1, delay: 1.2 }, className: "absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 scroll-indicator", children: [m.jsx("span", { className: "text-[10px] text-[var(--text-muted)] tracking-[0.3em] uppercase font-mono", children: "Scroll" }), m.jsx("div", { className: "w-[1px] h-8 bg-gradient-to-b from-orange-500/50 to-transparent" })] })] })] });
}
__name(zu, "zu");
var Ku = [{ title: "MCA Graduate", desc: "Master of Computer Application from Ayya Nadar Janaki Ammal College, MKU.", icon: m.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-6 h-6", children: m.jsx("path", { d: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }), color: "orange" }, { title: "React & Remix", desc: "Building production apps with React Vite & Remix at Skillmine Technology.", icon: m.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-6 h-6", children: [m.jsx("circle", { cx: "12", cy: "12", r: "2.5" }), m.jsx("ellipse", { cx: "12", cy: "12", rx: "10", ry: "4" }), m.jsx("ellipse", { cx: "12", cy: "12", rx: "10", ry: "4", transform: "rotate(60 12 12)" }), m.jsx("ellipse", { cx: "12", cy: "12", rx: "10", ry: "4", transform: "rotate(120 12 12)" })] }), color: "pink" }, { title: "Backend Dev", desc: "Building server-side applications and APIs with Node.js, Express.js & Python.", icon: m.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-6 h-6", children: m.jsx("path", { d: "M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z", strokeLinecap: "round", strokeLinejoin: "round" }) }), color: "purple" }, { title: "Production Lead", desc: "Leading production bug fixes and feature development in Agile sprints.", icon: m.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-6 h-6", children: m.jsx("path", { d: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z", strokeLinecap: "round", strokeLinejoin: "round" }) }), color: "orange" }];
var Yu = { orange: { iconBg: "from-orange-500/15 to-orange-500/5", iconText: "text-orange-400", ring: "ring-orange-500/15", hoverBorder: "group-hover:border-orange-500/30" }, pink: { iconBg: "from-pink-500/15 to-pink-500/5", iconText: "text-pink-400", ring: "ring-pink-500/15", hoverBorder: "group-hover:border-pink-500/30" }, purple: { iconBg: "from-purple-500/15 to-purple-500/5", iconText: "text-purple-400", ring: "ring-purple-500/15", hoverBorder: "group-hover:border-purple-500/30" } };
function Gu() {
  let O = _o(), M = Fe.useRef(null);
  return m.jsx("section", { id: "about", className: $e.sectionPadding, children: m.jsxs("div", { className: "container-main", ref: M, children: [m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: Wn, className: "mb-16", children: [m.jsx("span", { className: $e.sectionLabel, children: "// about" }), m.jsxs("h2", { className: $e.sectionHeading, children: ["A bit about", m.jsx("br", {}), m.jsx("span", { className: "gradient-text", children: "me" }), "."] }), m.jsx("div", { className: $e.sectionLine })] }), m.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4", children: [m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: { ...Ei, delay: 0.1 }, className: `md:col-span-2 ${$e.glassCard} rounded-2xl p-8`, children: [m.jsxs("p", { className: "text-[var(--text-body)] text-lg leading-relaxed", children: ["I'm a ", Or.title, " currently focused on frontend at Skillmine Technology, with 2+ years of professional experience building modern, responsive applications with React, Remix & Vite. I lead production bug fixes, feature development, and collaborate with design teams for pixel-perfect interfaces."] }), m.jsxs("div", { className: "flex items-center gap-4 mt-6", children: [m.jsx("div", { className: "w-8 h-[1px] bg-gradient-to-r from-orange-500 to-transparent" }), m.jsxs("span", { className: "text-sm text-[var(--text-muted)] font-mono", children: ["Based in ", Or.location] })] })] }), m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: { ...Ei, delay: 0.2 }, className: "glass rounded-2xl p-8 flex flex-col justify-center items-center text-center glow-card", children: [m.jsx("span", { className: "text-5xl sm:text-6xl font-heading font-bold gradient-text leading-none", children: "2+" }), m.jsx("span", { className: "text-sm text-[var(--text-body)] mt-3", children: "Years of" }), m.jsx("span", { className: "text-sm text-[var(--text-heading)] font-medium", children: "Experience" }), m.jsx("div", { className: "w-12 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent mt-4 mb-4" }), m.jsx("span", { className: "text-3xl sm:text-4xl font-heading font-bold gradient-text leading-none", children: "10+" }), m.jsx("span", { className: "text-sm text-[var(--text-body)] mt-2", children: "Projects Built" })] })] }), m.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: Ku.map((N, F) => {
    let V = Yu[N.color];
    return m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: { ...Ei, delay: 0.3 + Os(F) }, className: `${$e.glassCard} rounded-2xl p-6 group cursor-default ${V.hoverBorder}`, children: [m.jsx("div", { className: `w-11 h-11 rounded-xl bg-gradient-to-br ${V.iconBg} ring-1 ${V.ring} flex items-center justify-center ${V.iconText} mb-4 group-hover:scale-110 transition-transform duration-300`, children: N.icon }), m.jsx("h3", { className: "font-semibold text-[var(--text-heading)] mb-1.5", children: N.title }), m.jsx("p", { className: "text-sm text-[var(--text-body)] leading-relaxed", children: N.desc })] }, N.title);
  }) })] }) });
}
__name(Gu, "Gu");
var uu = [{ label: "Frontend", skills: ["React.js", "Remix", "JavaScript (ES6+)", "HTML5 & CSS3", "Tailwind CSS", "Vite"], color: "orange" }, { label: "Backend", skills: ["Node.js", "Express.js", "Python", "REST APIs", "Postman"], color: "purple" }, { label: "AI Tools", skills: ["ChatGPT", "GitHub Copilot", "Claude AI", "Cursor", "Gemini", "Midjourney"], color: "pink" }, { label: "Automation", skills: ["N8N", "Flowise", "Git / GitLab", "Agile / Scrum"], color: "orange" }];
var Ju = { orange: "text-orange-300/90 bg-orange-500/[0.07] border-orange-500/[0.12] hover:bg-orange-500/15 hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.12)]", pink: "text-pink-300/90 bg-pink-500/[0.07] border-pink-500/[0.12] hover:bg-pink-500/15 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.12)]", purple: "text-purple-300/90 bg-purple-500/[0.07] border-purple-500/[0.12] hover:bg-purple-500/15 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]" };
var Xu = { orange: "bg-orange-500", pink: "bg-pink-500", purple: "bg-purple-500" };
function Qu() {
  let O = _o(), M = Fe.useRef(null);
  return m.jsxs("section", { id: "skills", className: `${$e.sectionPadding} overflow-hidden`, children: [m.jsx("div", { className: "absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500/[0.03] blur-[130px] pointer-events-none" }), m.jsxs("div", { className: "container-main", ref: M, children: [m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: Wn, className: "mb-16", children: [m.jsx("span", { className: $e.sectionLabel, children: "// skills" }), m.jsxs("h2", { className: $e.sectionHeading, children: ["Tech I", m.jsx("br", {}), m.jsx("span", { className: "gradient-text", children: "use" }), "."] }), m.jsx("div", { className: $e.sectionLine })] }), m.jsx("div", { children: uu.map((N, F) => m.jsx(ke.div, { initial: O ? false : { opacity: 0, y: 20 }, animate: dt, transition: { duration: 0.5, delay: Os(F) }, className: "group", children: m.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-7 md:py-9 border-b border-[var(--border-subtle)] -mx-3 md:-mx-5 px-3 md:px-5 rounded-xl hover:bg-[var(--hover-bg)] transition-all duration-500", children: [m.jsxs("div", { className: "md:col-span-3 flex items-center gap-3", children: [m.jsx("div", { className: `w-2 h-2 rounded-full ${Xu[N.color]} shrink-0 opacity-70` }), m.jsx("span", { className: "font-heading font-bold text-lg md:text-xl text-[var(--text-heading)] group-hover:text-orange-300 transition-colors duration-300", children: N.label })] }), m.jsx("div", { className: "md:col-span-9 flex flex-wrap gap-2.5 items-center", children: N.skills.map((V, D) => m.jsx(ke.span, { initial: O ? false : { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.35, delay: Os(F) + D * 0.04 }, className: `text-sm font-medium px-4 py-2 rounded-full border backdrop-blur-sm cursor-default transition-all duration-300 hover:scale-105 ${Ju[N.color]}`, children: V }, V)) })] }) }, N.label)) }), m.jsxs(ke.div, { initial: O ? false : { opacity: 0 }, animate: { opacity: 1 }, transition: { ...Wn, delay: 0.6 }, className: "flex items-center gap-3 mt-8", children: [m.jsx("div", { className: "w-8 h-[1px] bg-gradient-to-r from-orange-500/40 to-transparent" }), m.jsxs("span", { className: "text-xs font-mono text-[var(--text-muted)]", children: [uu.reduce((N, F) => N + F.skills.length, 0), "+ technologies & growing"] })] })] })] });
}
__name(Qu, "Qu");
var Zu = [{ title: "FCS Admin UI", description: "Web-based admin dashboard for a US-based debt collection agency. Manages debtors, creditors, payments, workflows, and communications with role-based access control and real-time analytics.", tech: ["React Remix", "RBAC", "Analytics", "REST API"], image: "/project-fcs.jpg", accent: "orange" }, { title: "DataVUI", description: "Data visualization platform where users connect to databases, create interactive charts, organize customizable drag-and-drop dashboards, and set up alerts for data conditions.", tech: ["React", "Data Viz", "Drag & Drop", "Charts"], image: "/project-datavui.jpg", accent: "pink" }, { title: "CKYC Platform", description: "Centralized KYC registry for financial institutions to securely store, validate, and retrieve customer identity records with compliance management and API integrations.", tech: ["React", "KYC", "Compliance", "API"], image: "/project-ckyc.jpg", accent: "purple" }, { title: "E-Commerce Platforms", description: "Scalable e-commerce apps (Meditech & Marketplace Coffee) with product listing, filtering, cart/wishlist, checkout workflows, and secure REST API integrations.", tech: ["React", "E-Commerce", "State Mgmt", "REST API"], image: "/project-ecommerce.jpg", accent: "orange" }];
var ec = { orange: { badge: "bg-orange-500/10 text-orange-300 border border-orange-500/15", num: "text-white/[0.08]", dot: "bg-orange-500", overlay: "from-orange-950/60 via-transparent to-transparent" }, pink: { badge: "bg-pink-500/10 text-pink-300 border border-pink-500/15", num: "text-white/[0.08]", dot: "bg-pink-500", overlay: "from-pink-950/60 via-transparent to-transparent" }, purple: { badge: "bg-purple-500/10 text-purple-300 border border-purple-500/15", num: "text-white/[0.08]", dot: "bg-purple-500", overlay: "from-purple-950/60 via-transparent to-transparent" } };
var tc = "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z";
function rc() {
  let O = _o(), M = Fe.useRef(null);
  return m.jsx("section", { id: "projects", className: $e.sectionPadding, children: m.jsxs("div", { className: "container-main", ref: M, children: [m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: Wn, className: "mb-16", children: [m.jsx("span", { className: $e.sectionLabel, children: "// projects" }), m.jsxs("h2", { className: $e.sectionHeading, children: ["What I've", m.jsx("br", {}), m.jsx("span", { className: "gradient-text", children: "built" }), "."] }), m.jsx("div", { className: $e.sectionLine })] }), m.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: Zu.map((N, F) => {
    let V = ec[N.accent], D = String(F + 1).padStart(2, "0");
    return m.jsxs(ke.div, { initial: O ? false : Wu, animate: dt, transition: { ...Wn, delay: Os(F, 0.12) }, whileHover: { y: -8 }, className: `${$e.glassCard} overflow-hidden group`, children: [m.jsxs("div", { className: "relative h-52 overflow-hidden", children: [m.jsx("img", { src: N.image, alt: N.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110", loading: "lazy", decoding: "async", width: 600, height: 208 }), m.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" }), m.jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${V.overlay} opacity-60` }), m.jsx("span", { className: `absolute bottom-3 right-4 sm:right-5 text-6xl sm:text-8xl font-heading font-bold ${V.num} select-none`, children: D }), m.jsxs("div", { className: "absolute top-4 left-5 flex items-center gap-2", children: [m.jsx("div", { className: `w-2 h-2 rounded-full ${V.dot}` }), m.jsxs("span", { className: "text-xs font-mono text-white/50 uppercase tracking-wider", children: ["Project ", D] })] })] }), m.jsxs("div", { className: "p-5 sm:p-7", children: [m.jsx("h3", { className: "font-heading font-bold text-xl text-[var(--text-heading)] mb-3 group-hover:text-orange-300 transition-colors duration-300", children: N.title }), m.jsx("p", { className: "text-sm text-[var(--text-body)] leading-relaxed mb-6", children: N.description }), m.jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: N.tech.map((xe) => m.jsx("span", { className: `text-xs font-medium px-3 py-1.5 rounded-full ${V.badge}`, children: xe }, xe)) }), m.jsxs("div", { className: "flex gap-3", children: [m.jsxs("a", { href: "#", className: "flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/80 to-pink-500/80 hover:from-orange-500 hover:to-pink-500 transition-all hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer", children: [m.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-4 h-4", children: m.jsx("path", { d: tc }) }), "GitHub"] }), m.jsxs("a", { href: "#", className: "flex items-center gap-2 text-sm font-medium text-[var(--text-subtle)] px-5 py-2.5 rounded-full border border-[var(--border-subtle)] hover:text-[var(--text-heading)] hover:bg-[var(--hover-bg)] hover:border-orange-500/25 transition-all cursor-pointer", children: [m.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-4 h-4", children: [m.jsx("path", { fillRule: "evenodd", d: "M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.47-.53a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06Z", clipRule: "evenodd" }), m.jsx("path", { fillRule: "evenodd", d: "M13 3.75A.75.75 0 0 1 13.75 3h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V4.5h-3.75A.75.75 0 0 1 13 3.75Z", clipRule: "evenodd" })] }), "Live Demo"] })] })] })] }, N.title);
  }) })] }) });
}
__name(rc, "rc");
var nc = [{ year: "2026", role: "Frontend Developer", title: "Skillmine Technology", desc: "Leading production bug fixes and implementing new features using React Remix. Collaborating with design teams for pixel-perfect interfaces and managing GitLab repositories.", tags: ["React", "Remix", "Production", "GitLab"] }, { year: "2024", role: "Trainee", title: "Skillmine Technology", desc: "Developed core frontend modules using React Vite. Created reusable UI components reducing development time by 15%. Participated in Agile sprint planning.", tags: ["React Vite", "Agile", "API", "Postman"] }, { year: "2022", role: "Student", title: "Master of Computer Application", desc: "Ayya Nadar Janaki Ammal College (Autonomous), affiliated to Madurai Kamaraj University. CGPA: 7.1", tags: ["MCA", "Computer Science"] }, { year: "2022", role: "Graduate", title: "Bachelor of Computer Application", desc: "Ayya Nadar Janaki Ammal College (Autonomous), affiliated to Madurai Kamaraj University. CGPA: 7.2", tags: ["BCA", "Foundations"] }];
function oc() {
  let O = _o(), M = Fe.useRef(null);
  return m.jsx("section", { id: "experience", className: $e.sectionPadding, children: m.jsxs("div", { className: "container-main", ref: M, children: [m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: Wn, className: "mb-16", children: [m.jsx("span", { className: $e.sectionLabel, children: "// experience" }), m.jsxs("h2", { className: $e.sectionHeading, children: ["My", m.jsx("br", {}), m.jsx("span", { className: "gradient-text", children: "journey" }), "."] }), m.jsx("div", { className: $e.sectionLine })] }), m.jsx("div", { className: "max-w-4xl", children: nc.map((N, F) => m.jsx(ke.div, { initial: O ? false : It, animate: dt, transition: { ...Ei, delay: Os(F, 0.1) }, className: "group", children: m.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-[var(--border-subtle)] hover:bg-[var(--hover-bg)] transition-all duration-500 -mx-4 md:-mx-6 px-4 md:px-6 rounded-xl", children: [m.jsx("div", { className: "md:col-span-3 flex items-start", children: m.jsx("span", { className: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-heading)] opacity-15 group-hover:opacity-30 group-hover:text-orange-400 transition-all duration-500 leading-none select-none", children: N.year }) }), m.jsxs("div", { className: "md:col-span-9", children: [m.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [m.jsx("div", { className: "w-2 h-2 rounded-full bg-orange-500 pulse-dot" }), m.jsx("h3", { className: "font-heading font-bold text-xl text-[var(--text-heading)] group-hover:text-orange-300 transition-colors duration-300", children: N.title })] }), m.jsx("p", { className: "text-sm text-orange-400/60 font-mono ml-5 mb-3", children: N.role }), m.jsx("p", { className: "text-[var(--text-body)] leading-relaxed mb-4 ml-5", children: N.desc }), m.jsx("div", { className: "flex flex-wrap gap-2 ml-5", children: N.tags.map((V) => m.jsx("span", { className: "text-xs font-mono px-3 py-1 rounded-full bg-orange-500/8 text-orange-400/70 border border-orange-500/10", children: V }, V)) })] })] }) }, F)) })] }) });
}
__name(oc, "oc");
function cu({ path: O, viewBox: M = "0 0 24 24", size: N = "w-5 h-5" }) {
  return m.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: M, fill: "currentColor", className: N, children: m.jsx("path", { d: O }) });
}
__name(cu, "cu");
function ac() {
  let O = _o(), M = Fe.useRef(null), [N, F] = Fe.useState(false), V = /* @__PURE__ */ __name((D) => {
    D.preventDefault(), F(true), setTimeout(() => F(false), 3e3);
  }, "V");
  return m.jsx("section", { id: "contact", className: $e.sectionPadding, children: m.jsxs("div", { className: "container-main", ref: M, children: [m.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 max-w-5xl", children: [m.jsxs(ke.div, { initial: O ? false : It, animate: dt, transition: Wn, children: [m.jsx("span", { className: $e.sectionLabel, children: "// contact" }), m.jsxs("h2", { className: "font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--text-heading)] mt-3 leading-[0.95]", children: ["Let's", m.jsx("br", {}), m.jsx("span", { className: "gradient-text", children: "Talk" }), "."] }), m.jsx("p", { className: "text-[var(--text-body)] text-lg mt-8 max-w-md leading-relaxed", children: "Have a project in mind? I'd love to hear about it. Let's build something amazing together." }), m.jsxs("div", { className: "mt-10 space-y-4", children: [m.jsxs("a", { href: `mailto:${Or.email}`, className: "flex items-center gap-3 text-[var(--text-body)] hover:text-orange-400 transition-colors group", children: [m.jsx("div", { className: "w-10 h-10 rounded-full glass flex items-center justify-center group-hover:border-orange-500/30 transition-all", children: m.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-4 h-4", children: [m.jsx("path", { d: "M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" }), m.jsx("path", { d: "m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" })] }) }), m.jsx("span", { className: "text-sm", children: Or.email })] }), m.jsxs("div", { className: "flex items-center gap-3 text-[var(--text-body)]", children: [m.jsx("div", { className: "w-10 h-10 rounded-full glass flex items-center justify-center", children: m.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-4 h-4", children: m.jsx("path", { fillRule: "evenodd", d: "m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z", clipRule: "evenodd" }) }) }), m.jsx("span", { className: "text-sm", children: Or.location })] })] }), m.jsxs("div", { className: "mt-10", children: [m.jsx("p", { className: "text-xs font-mono text-[var(--text-muted)] tracking-wider uppercase mb-4", children: "Follow me" }), m.jsx("div", { className: "flex gap-3", children: iu.map((D) => m.jsx("a", { href: D.href, "aria-label": D.label, className: "w-11 h-11 rounded-full glass flex items-center justify-center text-[var(--text-body)] hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/10", children: m.jsx(cu, { path: D.icon, viewBox: D.viewBox }) }, D.label)) })] })] }), m.jsx(ke.div, { initial: O ? false : It, animate: dt, transition: { ...Wn, delay: 0.15 }, children: m.jsxs("form", { onSubmit: V, className: "space-y-2", children: [m.jsxs("div", { className: "relative group", children: [m.jsx("input", { type: "text", required: true, placeholder: "Your Name", className: "input-underline text-lg" }), m.jsx("div", { className: "absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 group-focus-within:w-full transition-all duration-500" })] }), m.jsxs("div", { className: "relative group", children: [m.jsx("input", { type: "email", required: true, placeholder: "Your Email", className: "input-underline text-lg" }), m.jsx("div", { className: "absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 group-focus-within:w-full transition-all duration-500" })] }), m.jsxs("div", { className: "relative group", children: [m.jsx("textarea", { required: true, rows: 4, placeholder: "Your Message", className: "input-underline text-lg resize-none" }), m.jsx("div", { className: "absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 group-focus-within:w-full transition-all duration-500" })] }), m.jsx("div", { className: "pt-6", children: m.jsx(ke.button, { type: "submit", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: `w-full py-4 cursor-pointer transition-all duration-500 rounded-full ${N ? "bg-green-600 shadow-lg shadow-green-500/25 text-sm font-semibold text-white" : $e.primaryBtn + " px-8 py-4"}`, children: N ? "Message Sent!" : "Send Message" }) })] }) })] }), m.jsx("div", { className: "mt-32 pt-8 border-t border-[var(--border-subtle)]", children: m.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6", children: [m.jsxs("a", { href: "#home", className: "font-heading text-xl font-bold text-[var(--text-heading)]", children: ["J", m.jsx("span", { className: "gradient-text text-2xl font-extrabold", children: "." })] }), m.jsxs("p", { className: "text-sm text-[var(--text-muted)]", children: ["\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " ", Or.name, ". All rights reserved."] }), m.jsx("div", { className: "flex gap-3", children: iu.map((D) => m.jsx("a", { href: D.href, "aria-label": D.label, className: "w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-orange-400 hover:bg-orange-500/5 transition-all", children: m.jsx(cu, { path: D.icon, viewBox: D.viewBox, size: "w-4 h-4" }) }, D.label)) })] }) })] }) });
}
__name(ac, "ac");
function sc() {
  let O = Fe.useRef(null), [M, N] = Fe.useState(false);
  return Fe.useEffect(() => {
    let F = O.current;
    if (!F) return;
    let V = /* @__PURE__ */ __name((D) => {
      F.style.transform = `translate(${D.clientX - 200}px, ${D.clientY - 200}px)`;
    }, "V");
    return window.addEventListener("mousemove", V, { passive: true }), () => window.removeEventListener("mousemove", V);
  }, []), Fe.useEffect(() => {
    let F = /* @__PURE__ */ __name(() => N(window.scrollY > 500), "F");
    return window.addEventListener("scroll", F, { passive: true }), () => window.removeEventListener("scroll", F);
  }, []), m.jsxs(m.Fragment, { children: [m.jsx("div", { className: "gradient-bg" }), m.jsx("div", { className: "noise-overlay" }), m.jsx("div", { ref: O, className: "fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 hidden md:block will-change-transform", style: { background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, rgba(236,72,153,0.03) 40%, transparent 70%)" } }), m.jsxs("div", { className: "fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block", children: [m.jsx("div", { className: "absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-orange-500/[0.03] blur-[150px]" }), m.jsx("div", { className: "absolute top-[50%] left-[-5%] w-[500px] h-[500px] rounded-full bg-pink-500/[0.03] blur-[150px]" }), m.jsx("div", { className: "absolute bottom-[5%] right-[15%] w-[500px] h-[500px] rounded-full bg-purple-500/[0.02] blur-[150px]" })] }), m.jsx(Uu, {}), m.jsxs("main", { className: "relative z-10", children: [m.jsx(zu, {}), m.jsx(Gu, {}), m.jsx(Qu, {}), m.jsx(rc, {}), m.jsx(oc, {}), m.jsx(ac, {})] }), m.jsx(du, { children: M && m.jsx(ke.button, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: /* @__PURE__ */ __name(() => window.scrollTo({ top: 0, behavior: "smooth" }), "onClick"), className: "fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center cursor-pointer hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/20 transition-all group", children: m.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-4 h-4 text-[var(--text-body)] group-hover:text-orange-400 transition-colors", children: m.jsx("path", { fillRule: "evenodd", d: "M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z", clipRule: "evenodd" }) }) }) })] });
}
__name(sc, "sc");
function mu() {
  return Lu.renderToString(m.jsx(Vu, { isSSR: true, children: m.jsx(sc, {}) }));
}
__name(mu, "mu");
var ht = { title: "Joshwa | Full Stack Developer", description: "Full Stack Developer specializing in React.js, JavaScript, API integration, and AI-powered applications. Building modern web experiences with clean code and intuitive design.", url: "https://joshwa.in", image: "https://joshwa.in/profile.jpg", author: "Joshwa", keywords: "Joshwa, Full Stack Developer, React Developer, JavaScript, API Integration, AI, NLQ, Web Developer, Frontend Developer, Portfolio", github: "https://github.com/Joshwa1722", linkedin: "https://www.linkedin.com/in/joshwa-m" };
function fu() {
  return `
    <meta name="description" content="${ht.description}" />
    <meta name="keywords" content="${ht.keywords}" />
    <meta name="author" content="${ht.author}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${ht.url}/" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${ht.url}/" />
    <meta property="og:title" content="${ht.title}" />
    <meta property="og:description" content="${ht.description}" />
    <meta property="og:image" content="${ht.image}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${ht.url}/" />
    <meta name="twitter:title" content="${ht.title}" />
    <meta name="twitter:description" content="${ht.description}" />
    <meta name="twitter:image" content="${ht.image}" />

    <!-- JSON-LD -->
    <script type="application/ld+json">
    ${JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Joshwa", url: ht.url, image: ht.image, jobTitle: "Full Stack Developer", knowsAbout: ["React.js", "JavaScript", "API Integration", "AI & NLQ", "CRM Development", "Web Development"], sameAs: [ht.github, ht.linkedin] })}
    <\/script>
  `;
}
__name(fu, "fu");
var ic = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Joshwa | Full Stack Developer</title>
    <script>
      const t = localStorage.getItem('theme') ||
        (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      document.documentElement.dataset.theme = t;
    <\/script>
    <style>
      body{margin:0;background:#000}
      [data-theme="light"] body{background:#f8fafc}
      #root{min-height:100vh}
    </style>
    <!--seo-head-->
    <link rel="preload" as="image" href="/profile.jpg" fetchpriority="high" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@700&family=JetBrains+Mono:wght@400;500&display=swap" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
    <script type="module" crossorigin src="/assets/index-Dp_MvIeD.js"><\/script>
    <style>@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-border-style:solid;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-orange-300:oklch(83.7% .128 66.29);--color-orange-400:oklch(75% .183 55.934);--color-orange-500:oklch(70.5% .213 47.604);--color-orange-950:oklch(26.6% .079 36.259);--color-green-500:oklch(72.3% .219 149.579);--color-green-600:oklch(62.7% .194 149.214);--color-purple-300:oklch(82.7% .119 306.383);--color-purple-400:oklch(71.4% .203 305.504);--color-purple-500:oklch(62.7% .265 303.9);--color-purple-950:oklch(29.1% .149 302.717);--color-pink-300:oklch(82.3% .12 346.018);--color-pink-400:oklch(71.8% .202 349.761);--color-pink-500:oklch(65.6% .241 354.308);--color-pink-950:oklch(28.4% .109 3.907);--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-md:28rem;--container-3xl:48rem;--container-4xl:56rem;--container-5xl:64rem;--text-xs:.75rem;--text-xs--line-height:calc(1/.75);--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-base:1rem;--text-base--line-height: 1.5 ;--text-lg:1.125rem;--text-lg--line-height:calc(1.75/1.125);--text-xl:1.25rem;--text-xl--line-height:calc(1.75/1.25);--text-2xl:1.5rem;--text-2xl--line-height:calc(2/1.5);--text-3xl:1.875rem;--text-3xl--line-height: 1.2 ;--text-4xl:2.25rem;--text-4xl--line-height:calc(2.5/2.25);--text-5xl:3rem;--text-5xl--line-height:1;--text-6xl:3.75rem;--text-6xl--line-height:1;--text-7xl:4.5rem;--text-7xl--line-height:1;--text-8xl:6rem;--text-8xl--line-height:1;--font-weight-light:300;--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--font-weight-extrabold:800;--tracking-tight:-.025em;--tracking-wide:.025em;--tracking-wider:.05em;--leading-relaxed:1.625;--radius-lg:.5rem;--radius-xl:.75rem;--radius-2xl:1rem;--radius-3xl:1.5rem;--blur-sm:8px;--blur-xl:24px;--blur-2xl:40px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}:root{--bg-primary:#000;--bg-secondary:#0f172a;--bg-card:#0f172ae6;--text-primary:#e2e8f0;--text-secondary:#94a3b8;--accent-orange:#f97316;--accent-pink:#ec4899;--accent-purple:#a855f7;--bg-body:#000;--glass-bg:#0f172a80;--glass-strong-bg:#0f172ad9;--glass-border:#f973161f;--glass-strong-border:#f9731640;--text-heading:#fff;--text-body:#94a3b8;--text-muted:#64748b;--text-subtle:#cbd5e1;--border-subtle:#ffffff0f;--hover-bg:#ffffff0a;--surface-bg:#ffffff0f;--surface-hover-bg:#ffffff1a;--scrollbar-track:#000;--gradient-bg:linear-gradient(135deg,#0f172a 0%,#1a0a1f 50%,#1e0a14 100%);--gradient-radial-orange:#f973161a;--gradient-radial-pink:#ec489914;--gradient-radial-purple:#a855f70f;--glow-shadow-ambient:#00000080;--glow-shadow-orange:#f9731626;--glow-shadow-pink:#ec489914;--cursor-glow:#f9731699}[data-theme=light]{--bg-body:#f8fafc;--bg-secondary:#f1f5f9;--text-primary:#0f172a;--glass-bg:#ffffffa6;--glass-strong-bg:#ffffffe0;--glass-border:#f973162e;--glass-strong-border:#f973164d;--text-heading:#0f172a;--text-body:#475569;--text-muted:#94a3b8;--text-subtle:#334155;--border-subtle:#0000000f;--hover-bg:#00000008;--surface-bg:#0000000d;--surface-hover-bg:#00000014;--scrollbar-track:#f8fafc;--gradient-bg:linear-gradient(135deg,#f8fafc 0%,#fef2f2 50%,#fdf4ff 100%);--gradient-radial-orange:#f973160f;--gradient-radial-pink:#ec48990d;--gradient-radial-purple:#a855f70d;--glow-shadow-ambient:#00000014;--glow-shadow-orange:#f973161f;--glow-shadow-pink:#ec48990f;--cursor-glow:#f9731666}html{scroll-behavior:smooth}body{background:var(--bg-body);color:var(--text-primary);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:Inter,system-ui,-apple-system,sans-serif;overflow-x:hidden}::selection{color:#fff;background:#f973164d}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--scrollbar-track)}::-webkit-scrollbar-thumb{background:#f973164d;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#f9731680}}@layer components{.font-heading{font-family:Space Grotesk,Inter,sans-serif}.font-mono{font-family:JetBrains Mono,monospace}.container-main{width:100%;max-width:1200px;margin:0 auto;padding:0 1.5rem}@media(min-width:768px){.container-main{padding:0 2rem}}.gradient-text{-webkit-text-fill-color:transparent;background:linear-gradient(135deg,#f97316,#ec4899,#a855f7);-webkit-background-clip:text;background-clip:text}.gradient-text-hover{-webkit-text-fill-color:transparent;background:linear-gradient(135deg,#fb923c,#f472b6,#c084fc);-webkit-background-clip:text;background-clip:text}.glass{background:var(--glass-bg);-webkit-backdrop-filter:blur(16px);border:1px solid var(--glass-border)}.glass-strong{background:var(--glass-strong-bg);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-strong-border)}.glow-card{transition:all .5s cubic-bezier(.4,0,.2,1)}.glow-card:hover{box-shadow:0 25px 60px var(--glow-shadow-ambient),0 0 40px var(--glow-shadow-orange),0 0 80px var(--glow-shadow-pink),inset 0 1px #ffffff0f;border-color:#f9731659}.gradient-bg{z-index:-1;background:var(--gradient-bg);position:fixed;inset:0;overflow:hidden}.gradient-bg:before{content:"";background:radial-gradient(circle at 20% 30%,var(--gradient-radial-orange)0%,transparent 50%),radial-gradient(circle at 80% 20%,var(--gradient-radial-pink)0%,transparent 50%),radial-gradient(circle at 50% 80%,var(--gradient-radial-purple)0%,transparent 50%);width:200%;height:200%;animation:25s ease-in-out infinite gradientDrift;position:absolute;top:-50%;left:-50%}@keyframes gradientDrift{0%,to{transform:translate(0)scale(1)}33%{transform:translate(50px,-50px)scale(1.05)}66%{transform:translate(-30px,30px)scale(.96)}}.typing-cursor{vertical-align:text-bottom;width:3px;height:1.15em;box-shadow:0 0 8px var(--cursor-glow);background:#f97316;border-radius:2px;margin-left:2px;animation:1s step-end infinite cursorBlink;display:inline-block}@keyframes cursorBlink{50%{opacity:0}}.section-line{background:linear-gradient(90deg,#f97316,#ec4899);border-radius:2px;width:60px;height:3px}.neon-glow{box-shadow:0 10px 40px #f9731666,0 0 60px #ec48994d,0 0 80px #a855f733}@keyframes marquee{0%{transform:translate(0)}to{transform:translate(-50%)}}@keyframes marquee-reverse{0%{transform:translate(-50%)}to{transform:translate(0)}}.animate-marquee{animation:40s linear infinite marquee}.animate-marquee-reverse{animation:40s linear infinite marquee-reverse}.marquee-wrapper:hover .animate-marquee,.marquee-wrapper:hover .animate-marquee-reverse{animation-play-state:paused}@keyframes scrollBounce{0%,to{opacity:1;transform:translateY(0)}50%{opacity:.3;transform:translateY(10px)}}.scroll-indicator{animation:2s ease-in-out infinite scrollBounce}.noise-overlay{z-index:1;pointer-events:none;opacity:.02;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-repeat:repeat;background-size:200px 200px;position:fixed;inset:0}.grid-pattern{background-image:linear-gradient(#ffffff08 1px,#0000 1px),linear-gradient(90deg,#ffffff08 1px,#0000 1px);background-size:60px 60px}[data-theme=light] .grid-pattern{background-image:linear-gradient(#00000008 1px,#0000 1px),linear-gradient(90deg,#00000008 1px,#0000 1px)}.gradient-border-animated{position:relative}.gradient-border-animated:before{content:"";border-radius:inherit;opacity:0;pointer-events:none;background:linear-gradient(45deg,#f97316,#ec4899,#a855f7,#f97316,#ec4899,#a855f7) 0 0/300% 300%;padding:1px;transition:opacity .5s;animation:4s linear infinite gradientShift;position:absolute;inset:-1px;-webkit-mask-image:linear-gradient(#fff 0 0),linear-gradient(#fff 0 0);-webkit-mask-position:0 0,0 0;-webkit-mask-size:auto,auto;-webkit-mask-repeat:repeat,repeat;-webkit-mask-clip:content-box,border-box;-webkit-mask-origin:content-box,border-box;-webkit-mask-composite:xor;mask-composite:exclude;-webkit-mask-source-type:auto,auto;mask-mode:match-source,match-source}.gradient-border-animated:hover:before{opacity:1}@keyframes gradientShift{0%{background-position:0%}50%{background-position:100%}to{background-position:0%}}@keyframes orbit{0%{transform:rotate(0)translate(var(--orbit-radius))rotate(0)}to{transform:rotate(360deg)translate(var(--orbit-radius))rotate(-360deg)}}.input-underline{border:none;border-bottom:1px solid var(--border-subtle);width:100%;color:var(--text-heading);background:0 0;border-radius:0;outline:none;padding:1rem 0;font-size:1rem;transition:border-color .3s}.input-underline::placeholder{color:var(--text-muted)}.input-underline:focus{border-bottom-color:#f97316;box-shadow:0 1px #f97316}@keyframes pulseDot{0%,to{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.2)}}.pulse-dot{animation:2s ease-in-out infinite pulseDot}@media(prefers-reduced-motion:reduce){*,:before,:after{transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}.scroll-indicator,.pulse-dot,.typing-cursor,.gradient-bg:before{animation:none!important}}@media(max-width:767px){.gradient-bg:before{animation:none}.glow-card:hover{box-shadow:none}.gradient-border-animated:before{display:none}}}@layer utilities{.pointer-events-none{pointer-events:none}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.-inset-3{inset:calc(var(--spacing)*-3)}.-inset-6{inset:calc(var(--spacing)*-6)}.-inset-\\[2px\\]{inset:-2px}.inset-0{inset:calc(var(--spacing)*0)}.-top-3{top:calc(var(--spacing)*-3)}.top-0{top:calc(var(--spacing)*0)}.top-1\\/2{top:50%}.top-1\\/4{top:25%}.top-4{top:calc(var(--spacing)*4)}.top-\\[10\\%\\]{top:10%}.top-\\[50\\%\\]{top:50%}.-right-3{right:calc(var(--spacing)*-3)}.-right-5{right:calc(var(--spacing)*-5)}.right-0{right:calc(var(--spacing)*0)}.right-1\\/4{right:25%}.right-4{right:calc(var(--spacing)*4)}.right-8{right:calc(var(--spacing)*8)}.right-\\[5\\%\\]{right:5%}.right-\\[15\\%\\]{right:15%}.-bottom-3{bottom:calc(var(--spacing)*-3)}.bottom-0{bottom:calc(var(--spacing)*0)}.bottom-1\\/4{bottom:25%}.bottom-3{bottom:calc(var(--spacing)*3)}.bottom-8{bottom:calc(var(--spacing)*8)}.bottom-10{bottom:calc(var(--spacing)*10)}.bottom-\\[5\\%\\]{bottom:5%}.-left-3{left:calc(var(--spacing)*-3)}.-left-32{left:calc(var(--spacing)*-32)}.left-0{left:calc(var(--spacing)*0)}.left-1\\/2{left:50%}.left-1\\/4{left:25%}.left-5{left:calc(var(--spacing)*5)}.left-\\[-5\\%\\]{left:-5%}.z-0{z-index:0}.z-10{z-index:10}.z-40{z-index:40}.z-50{z-index:50}.-mx-3{margin-inline:calc(var(--spacing)*-3)}.-mx-4{margin-inline:calc(var(--spacing)*-4)}.mt-2{margin-top:calc(var(--spacing)*2)}.mt-3{margin-top:calc(var(--spacing)*3)}.mt-4{margin-top:calc(var(--spacing)*4)}.mt-6{margin-top:calc(var(--spacing)*6)}.mt-8{margin-top:calc(var(--spacing)*8)}.mt-10{margin-top:calc(var(--spacing)*10)}.mt-12{margin-top:calc(var(--spacing)*12)}.mt-32{margin-top:calc(var(--spacing)*32)}.mb-1{margin-bottom:calc(var(--spacing)*1)}.mb-1\\.5{margin-bottom:calc(var(--spacing)*1.5)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.mb-3{margin-bottom:calc(var(--spacing)*3)}.mb-4{margin-bottom:calc(var(--spacing)*4)}.mb-6{margin-bottom:calc(var(--spacing)*6)}.mb-12{margin-bottom:calc(var(--spacing)*12)}.mb-16{margin-bottom:calc(var(--spacing)*16)}.ml-5{margin-left:calc(var(--spacing)*5)}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.table{display:table}.h-0\\.5{height:calc(var(--spacing)*.5)}.h-2{height:calc(var(--spacing)*2)}.h-3{height:calc(var(--spacing)*3)}.h-4{height:calc(var(--spacing)*4)}.h-5{height:calc(var(--spacing)*5)}.h-6{height:calc(var(--spacing)*6)}.h-8{height:calc(var(--spacing)*8)}.h-9{height:calc(var(--spacing)*9)}.h-10{height:calc(var(--spacing)*10)}.h-11{height:calc(var(--spacing)*11)}.h-12{height:calc(var(--spacing)*12)}.h-28{height:calc(var(--spacing)*28)}.h-52{height:calc(var(--spacing)*52)}.h-\\[1px\\]{height:1px}.h-\\[2px\\]{height:2px}.h-\\[22rem\\]{height:22rem}.h-\\[400px\\]{height:400px}.h-\\[500px\\]{height:500px}.h-\\[600px\\]{height:600px}.h-full{height:100%}.min-h-screen{min-height:100vh}.w-0{width:calc(var(--spacing)*0)}.w-2{width:calc(var(--spacing)*2)}.w-3{width:calc(var(--spacing)*3)}.w-4{width:calc(var(--spacing)*4)}.w-5{width:calc(var(--spacing)*5)}.w-6{width:calc(var(--spacing)*6)}.w-8{width:calc(var(--spacing)*8)}.w-9{width:calc(var(--spacing)*9)}.w-10{width:calc(var(--spacing)*10)}.w-11{width:calc(var(--spacing)*11)}.w-12{width:calc(var(--spacing)*12)}.w-28{width:calc(var(--spacing)*28)}.w-72{width:calc(var(--spacing)*72)}.w-\\[1px\\]{width:1px}.w-\\[400px\\]{width:400px}.w-\\[500px\\]{width:500px}.w-\\[600px\\]{width:600px}.w-full{width:100%}.max-w-3xl{max-width:var(--container-3xl)}.max-w-4xl{max-width:var(--container-4xl)}.max-w-5xl{max-width:var(--container-5xl)}.max-w-md{max-width:var(--container-md)}.flex-1{flex:1}.flex-shrink-0,.shrink-0{flex-shrink:0}.origin-center{transform-origin:50%}.-translate-x-1\\/2{--tw-translate-x: -50% ;translate:var(--tw-translate-x)var(--tw-translate-y)}.-translate-y-2{--tw-translate-y:calc(var(--spacing)*-2);translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-y-2{--tw-translate-y:calc(var(--spacing)*2);translate:var(--tw-translate-x)var(--tw-translate-y)}.scale-0{--tw-scale-x:0%;--tw-scale-y:0%;--tw-scale-z:0%;scale:var(--tw-scale-x)var(--tw-scale-y)}.-rotate-45{rotate:-45deg}.rotate-45{rotate:45deg}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.cursor-default{cursor:default}.cursor-pointer{cursor:pointer}.resize-none{resize:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.items-start{align-items:flex-start}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:calc(var(--spacing)*1)}.gap-2{gap:calc(var(--spacing)*2)}.gap-2\\.5{gap:calc(var(--spacing)*2.5)}.gap-3{gap:calc(var(--spacing)*3)}.gap-4{gap:calc(var(--spacing)*4)}.gap-6{gap:calc(var(--spacing)*6)}.gap-10{gap:calc(var(--spacing)*10)}.gap-16{gap:calc(var(--spacing)*16)}:where(.space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*1.5)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*1.5)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*2)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*2)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*4)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*4)*calc(1 - var(--tw-space-y-reverse)))}.overflow-hidden{overflow:hidden}.rounded-2xl{border-radius:var(--radius-2xl)}.rounded-3xl{border-radius:var(--radius-3xl)}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-\\[var\\(--border-subtle\\)\\]{border-color:var(--border-subtle)}.border-orange-500\\/10{border-color:#fe6e001a}@supports (color:color-mix(in lab,red,red)){.border-orange-500\\/10{border-color:color-mix(in oklab,var(--color-orange-500)10%,transparent)}}.border-orange-500\\/15{border-color:#fe6e0026}@supports (color:color-mix(in lab,red,red)){.border-orange-500\\/15{border-color:color-mix(in oklab,var(--color-orange-500)15%,transparent)}}.border-orange-500\\/40{border-color:#fe6e0066}@supports (color:color-mix(in lab,red,red)){.border-orange-500\\/40{border-color:color-mix(in oklab,var(--color-orange-500)40%,transparent)}}.border-orange-500\\/\\[0\\.12\\]{border-color:#fe6e001f}@supports (color:color-mix(in lab,red,red)){.border-orange-500\\/\\[0\\.12\\]{border-color:color-mix(in oklab,var(--color-orange-500)12%,transparent)}}.border-pink-500\\/15{border-color:#f6339a26}@supports (color:color-mix(in lab,red,red)){.border-pink-500\\/15{border-color:color-mix(in oklab,var(--color-pink-500)15%,transparent)}}.border-pink-500\\/40{border-color:#f6339a66}@supports (color:color-mix(in lab,red,red)){.border-pink-500\\/40{border-color:color-mix(in oklab,var(--color-pink-500)40%,transparent)}}.border-pink-500\\/\\[0\\.12\\]{border-color:#f6339a1f}@supports (color:color-mix(in lab,red,red)){.border-pink-500\\/\\[0\\.12\\]{border-color:color-mix(in oklab,var(--color-pink-500)12%,transparent)}}.border-purple-500\\/15{border-color:#ac4bff26}@supports (color:color-mix(in lab,red,red)){.border-purple-500\\/15{border-color:color-mix(in oklab,var(--color-purple-500)15%,transparent)}}.border-purple-500\\/\\[0\\.12\\]{border-color:#ac4bff1f}@supports (color:color-mix(in lab,red,red)){.border-purple-500\\/\\[0\\.12\\]{border-color:color-mix(in oklab,var(--color-purple-500)12%,transparent)}}.bg-\\[var\\(--bg-body\\)\\]\\/95{background-color:var(--bg-body)}@supports (color:color-mix(in lab,red,red)){.bg-\\[var\\(--bg-body\\)\\]\\/95{background-color:color-mix(in oklab,var(--bg-body)95%,transparent)}}.bg-\\[var\\(--text-subtle\\)\\]{background-color:var(--text-subtle)}.bg-green-600{background-color:var(--color-green-600)}.bg-orange-500{background-color:var(--color-orange-500)}.bg-orange-500\\/8{background-color:#fe6e0014}@supports (color:color-mix(in lab,red,red)){.bg-orange-500\\/8{background-color:color-mix(in oklab,var(--color-orange-500)8%,transparent)}}.bg-orange-500\\/10{background-color:#fe6e001a}@supports (color:color-mix(in lab,red,red)){.bg-orange-500\\/10{background-color:color-mix(in oklab,var(--color-orange-500)10%,transparent)}}.bg-orange-500\\/\\[0\\.03\\]{background-color:#fe6e0008}@supports (color:color-mix(in lab,red,red)){.bg-orange-500\\/\\[0\\.03\\]{background-color:color-mix(in oklab,var(--color-orange-500)3%,transparent)}}.bg-orange-500\\/\\[0\\.04\\]{background-color:#fe6e000a}@supports (color:color-mix(in lab,red,red)){.bg-orange-500\\/\\[0\\.04\\]{background-color:color-mix(in oklab,var(--color-orange-500)4%,transparent)}}.bg-orange-500\\/\\[0\\.07\\]{background-color:#fe6e0012}@supports (color:color-mix(in lab,red,red)){.bg-orange-500\\/\\[0\\.07\\]{background-color:color-mix(in oklab,var(--color-orange-500)7%,transparent)}}.bg-pink-500{background-color:var(--color-pink-500)}.bg-pink-500\\/10{background-color:#f6339a1a}@supports (color:color-mix(in lab,red,red)){.bg-pink-500\\/10{background-color:color-mix(in oklab,var(--color-pink-500)10%,transparent)}}.bg-pink-500\\/\\[0\\.03\\]{background-color:#f6339a08}@supports (color:color-mix(in lab,red,red)){.bg-pink-500\\/\\[0\\.03\\]{background-color:color-mix(in oklab,var(--color-pink-500)3%,transparent)}}.bg-pink-500\\/\\[0\\.07\\]{background-color:#f6339a12}@supports (color:color-mix(in lab,red,red)){.bg-pink-500\\/\\[0\\.07\\]{background-color:color-mix(in oklab,var(--color-pink-500)7%,transparent)}}.bg-purple-500{background-color:var(--color-purple-500)}.bg-purple-500\\/10{background-color:#ac4bff1a}@supports (color:color-mix(in lab,red,red)){.bg-purple-500\\/10{background-color:color-mix(in oklab,var(--color-purple-500)10%,transparent)}}.bg-purple-500\\/30{background-color:#ac4bff4d}@supports (color:color-mix(in lab,red,red)){.bg-purple-500\\/30{background-color:color-mix(in oklab,var(--color-purple-500)30%,transparent)}}.bg-purple-500\\/\\[0\\.02\\]{background-color:#ac4bff05}@supports (color:color-mix(in lab,red,red)){.bg-purple-500\\/\\[0\\.02\\]{background-color:color-mix(in oklab,var(--color-purple-500)2%,transparent)}}.bg-purple-500\\/\\[0\\.04\\]{background-color:#ac4bff0a}@supports (color:color-mix(in lab,red,red)){.bg-purple-500\\/\\[0\\.04\\]{background-color:color-mix(in oklab,var(--color-purple-500)4%,transparent)}}.bg-purple-500\\/\\[0\\.07\\]{background-color:#ac4bff12}@supports (color:color-mix(in lab,red,red)){.bg-purple-500\\/\\[0\\.07\\]{background-color:color-mix(in oklab,var(--color-purple-500)7%,transparent)}}.bg-gradient-to-b{--tw-gradient-position:to bottom in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.bg-gradient-to-br{--tw-gradient-position:to bottom right in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.bg-gradient-to-r{--tw-gradient-position:to right in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.bg-gradient-to-t{--tw-gradient-position:to top in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.from-black\\/30{--tw-gradient-from:#0000004d}@supports (color:color-mix(in lab,red,red)){.from-black\\/30{--tw-gradient-from:color-mix(in oklab,var(--color-black)30%,transparent)}}.from-black\\/30{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-black\\/70{--tw-gradient-from:#000000b3}@supports (color:color-mix(in lab,red,red)){.from-black\\/70{--tw-gradient-from:color-mix(in oklab,var(--color-black)70%,transparent)}}.from-black\\/70{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-orange-500{--tw-gradient-from:var(--color-orange-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-orange-500\\/15{--tw-gradient-from:#fe6e0026}@supports (color:color-mix(in lab,red,red)){.from-orange-500\\/15{--tw-gradient-from:color-mix(in oklab,var(--color-orange-500)15%,transparent)}}.from-orange-500\\/15{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-orange-500\\/20{--tw-gradient-from:#fe6e0033}@supports (color:color-mix(in lab,red,red)){.from-orange-500\\/20{--tw-gradient-from:color-mix(in oklab,var(--color-orange-500)20%,transparent)}}.from-orange-500\\/20{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-orange-500\\/40{--tw-gradient-from:#fe6e0066}@supports (color:color-mix(in lab,red,red)){.from-orange-500\\/40{--tw-gradient-from:color-mix(in oklab,var(--color-orange-500)40%,transparent)}}.from-orange-500\\/40{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-orange-500\\/50{--tw-gradient-from:#fe6e0080}@supports (color:color-mix(in lab,red,red)){.from-orange-500\\/50{--tw-gradient-from:color-mix(in oklab,var(--color-orange-500)50%,transparent)}}.from-orange-500\\/50{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-orange-500\\/80{--tw-gradient-from:#fe6e00cc}@supports (color:color-mix(in lab,red,red)){.from-orange-500\\/80{--tw-gradient-from:color-mix(in oklab,var(--color-orange-500)80%,transparent)}}.from-orange-500\\/80{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-orange-950\\/60{--tw-gradient-from:#44130699}@supports (color:color-mix(in lab,red,red)){.from-orange-950\\/60{--tw-gradient-from:color-mix(in oklab,var(--color-orange-950)60%,transparent)}}.from-orange-950\\/60{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-pink-500\\/15{--tw-gradient-from:#f6339a26}@supports (color:color-mix(in lab,red,red)){.from-pink-500\\/15{--tw-gradient-from:color-mix(in oklab,var(--color-pink-500)15%,transparent)}}.from-pink-500\\/15{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-pink-950\\/60{--tw-gradient-from:#51042499}@supports (color:color-mix(in lab,red,red)){.from-pink-950\\/60{--tw-gradient-from:color-mix(in oklab,var(--color-pink-950)60%,transparent)}}.from-pink-950\\/60{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-purple-500\\/15{--tw-gradient-from:#ac4bff26}@supports (color:color-mix(in lab,red,red)){.from-purple-500\\/15{--tw-gradient-from:color-mix(in oklab,var(--color-purple-500)15%,transparent)}}.from-purple-500\\/15{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-purple-950\\/60{--tw-gradient-from:#3c036699}@supports (color:color-mix(in lab,red,red)){.from-purple-950\\/60{--tw-gradient-from:color-mix(in oklab,var(--color-purple-950)60%,transparent)}}.from-purple-950\\/60{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-transparent{--tw-gradient-from:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.via-black\\/20{--tw-gradient-via:#0003}@supports (color:color-mix(in lab,red,red)){.via-black\\/20{--tw-gradient-via:color-mix(in oklab,var(--color-black)20%,transparent)}}.via-black\\/20{--tw-gradient-via-stops:var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-via)var(--tw-gradient-via-position),var(--tw-gradient-to)var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-via-stops)}.via-orange-500\\/40{--tw-gradient-via:#fe6e0066}@supports (color:color-mix(in lab,red,red)){.via-orange-500\\/40{--tw-gradient-via:color-mix(in oklab,var(--color-orange-500)40%,transparent)}}.via-orange-500\\/40{--tw-gradient-via-stops:var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-via)var(--tw-gradient-via-position),var(--tw-gradient-to)var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-via-stops)}.via-pink-500{--tw-gradient-via:var(--color-pink-500);--tw-gradient-via-stops:var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-via)var(--tw-gradient-via-position),var(--tw-gradient-to)var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-via-stops)}.via-pink-500\\/15{--tw-gradient-via:#f6339a26}@supports (color:color-mix(in lab,red,red)){.via-pink-500\\/15{--tw-gradient-via:color-mix(in oklab,var(--color-pink-500)15%,transparent)}}.via-pink-500\\/15{--tw-gradient-via-stops:var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-via)var(--tw-gradient-via-position),var(--tw-gradient-to)var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-via-stops)}.via-transparent{--tw-gradient-via:transparent;--tw-gradient-via-stops:var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-via)var(--tw-gradient-via-position),var(--tw-gradient-to)var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-via-stops)}.to-black\\/10{--tw-gradient-to:#0000001a}@supports (color:color-mix(in lab,red,red)){.to-black\\/10{--tw-gradient-to:color-mix(in oklab,var(--color-black)10%,transparent)}}.to-black\\/10{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-orange-500\\/5{--tw-gradient-to:#fe6e000d}@supports (color:color-mix(in lab,red,red)){.to-orange-500\\/5{--tw-gradient-to:color-mix(in oklab,var(--color-orange-500)5%,transparent)}}.to-orange-500\\/5{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-pink-500{--tw-gradient-to:var(--color-pink-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-pink-500\\/5{--tw-gradient-to:#f6339a0d}@supports (color:color-mix(in lab,red,red)){.to-pink-500\\/5{--tw-gradient-to:color-mix(in oklab,var(--color-pink-500)5%,transparent)}}.to-pink-500\\/5{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-pink-500\\/80{--tw-gradient-to:#f6339acc}@supports (color:color-mix(in lab,red,red)){.to-pink-500\\/80{--tw-gradient-to:color-mix(in oklab,var(--color-pink-500)80%,transparent)}}.to-pink-500\\/80{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-purple-500{--tw-gradient-to:var(--color-purple-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-purple-500\\/5{--tw-gradient-to:#ac4bff0d}@supports (color:color-mix(in lab,red,red)){.to-purple-500\\/5{--tw-gradient-to:color-mix(in oklab,var(--color-purple-500)5%,transparent)}}.to-purple-500\\/5{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-purple-500\\/20{--tw-gradient-to:#ac4bff33}@supports (color:color-mix(in lab,red,red)){.to-purple-500\\/20{--tw-gradient-to:color-mix(in oklab,var(--color-purple-500)20%,transparent)}}.to-purple-500\\/20{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-transparent{--tw-gradient-to:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.object-cover{object-fit:cover}.p-2{padding:calc(var(--spacing)*2)}.p-5{padding:calc(var(--spacing)*5)}.p-6{padding:calc(var(--spacing)*6)}.p-8{padding:calc(var(--spacing)*8)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-3{padding-inline:calc(var(--spacing)*3)}.px-4{padding-inline:calc(var(--spacing)*4)}.px-5{padding-inline:calc(var(--spacing)*5)}.px-6{padding-inline:calc(var(--spacing)*6)}.px-8{padding-inline:calc(var(--spacing)*8)}.py-1{padding-block:calc(var(--spacing)*1)}.py-1\\.5{padding-block:calc(var(--spacing)*1.5)}.py-2{padding-block:calc(var(--spacing)*2)}.py-2\\.5{padding-block:calc(var(--spacing)*2.5)}.py-3{padding-block:calc(var(--spacing)*3)}.py-4{padding-block:calc(var(--spacing)*4)}.py-5{padding-block:calc(var(--spacing)*5)}.py-7{padding-block:calc(var(--spacing)*7)}.py-8{padding-block:calc(var(--spacing)*8)}.py-28{padding-block:calc(var(--spacing)*28)}.pt-0{padding-top:calc(var(--spacing)*0)}.pt-4{padding-top:calc(var(--spacing)*4)}.pt-6{padding-top:calc(var(--spacing)*6)}.pt-8{padding-top:calc(var(--spacing)*8)}.text-center{text-align:center}.font-mono{font-family:var(--font-mono)}.text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.text-4xl{font-size:var(--text-4xl);line-height:var(--tw-leading,var(--text-4xl--line-height))}.text-5xl{font-size:var(--text-5xl);line-height:var(--tw-leading,var(--text-5xl--line-height))}.text-6xl{font-size:var(--text-6xl);line-height:var(--tw-leading,var(--text-6xl--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[10px\\]{font-size:10px}.leading-\\[0\\.9\\]{--tw-leading:.9;line-height:.9}.leading-\\[0\\.95\\]{--tw-leading:.95;line-height:.95}.leading-none{--tw-leading:1;line-height:1}.leading-relaxed{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-extrabold{--tw-font-weight:var(--font-weight-extrabold);font-weight:var(--font-weight-extrabold)}.font-light{--tw-font-weight:var(--font-weight-light);font-weight:var(--font-weight-light)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-\\[0\\.3em\\]{--tw-tracking:.3em;letter-spacing:.3em}.tracking-tight{--tw-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.tracking-wider{--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider)}.text-\\[var\\(--text-body\\)\\]{color:var(--text-body)}.text-\\[var\\(--text-heading\\)\\]{color:var(--text-heading)}.text-\\[var\\(--text-muted\\)\\]{color:var(--text-muted)}.text-\\[var\\(--text-subtle\\)\\]{color:var(--text-subtle)}.text-orange-300{color:var(--color-orange-300)}.text-orange-300\\/90{color:#ffb96de6}@supports (color:color-mix(in lab,red,red)){.text-orange-300\\/90{color:color-mix(in oklab,var(--color-orange-300)90%,transparent)}}.text-orange-400{color:var(--color-orange-400)}.text-orange-400\\/60{color:#ff8b1a99}@supports (color:color-mix(in lab,red,red)){.text-orange-400\\/60{color:color-mix(in oklab,var(--color-orange-400)60%,transparent)}}.text-orange-400\\/70{color:#ff8b1ab3}@supports (color:color-mix(in lab,red,red)){.text-orange-400\\/70{color:color-mix(in oklab,var(--color-orange-400)70%,transparent)}}.text-pink-300{color:var(--color-pink-300)}.text-pink-300\\/90{color:#fda5d5e6}@supports (color:color-mix(in lab,red,red)){.text-pink-300\\/90{color:color-mix(in oklab,var(--color-pink-300)90%,transparent)}}.text-pink-400{color:var(--color-pink-400)}.text-purple-300{color:var(--color-purple-300)}.text-purple-300\\/90{color:#d9b3ffe6}@supports (color:color-mix(in lab,red,red)){.text-purple-300\\/90{color:color-mix(in oklab,var(--color-purple-300)90%,transparent)}}.text-purple-400{color:var(--color-purple-400)}.text-white{color:var(--color-white)}.text-white\\/50{color:#ffffff80}@supports (color:color-mix(in lab,red,red)){.text-white\\/50{color:color-mix(in oklab,var(--color-white)50%,transparent)}}.text-white\\/\\[0\\.08\\]{color:#ffffff14}@supports (color:color-mix(in lab,red,red)){.text-white\\/\\[0\\.08\\]{color:color-mix(in oklab,var(--color-white)8%,transparent)}}.uppercase{text-transform:uppercase}.opacity-0{opacity:0}.opacity-15{opacity:.15}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.opacity-70{opacity:.7}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring,.ring-1{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-black\\/20{--tw-shadow-color:#0003}@supports (color:color-mix(in lab,red,red)){.shadow-black\\/20{--tw-shadow-color:color-mix(in oklab,color-mix(in oklab,var(--color-black)20%,transparent)var(--tw-shadow-alpha),transparent)}}.shadow-green-500\\/25{--tw-shadow-color:#00c75840}@supports (color:color-mix(in lab,red,red)){.shadow-green-500\\/25{--tw-shadow-color:color-mix(in oklab,color-mix(in oklab,var(--color-green-500)25%,transparent)var(--tw-shadow-alpha),transparent)}}.shadow-orange-500\\/20{--tw-shadow-color:#fe6e0033}@supports (color:color-mix(in lab,red,red)){.shadow-orange-500\\/20{--tw-shadow-color:color-mix(in oklab,color-mix(in oklab,var(--color-orange-500)20%,transparent)var(--tw-shadow-alpha),transparent)}}.ring-orange-500\\/15{--tw-ring-color:#fe6e0026}@supports (color:color-mix(in lab,red,red)){.ring-orange-500\\/15{--tw-ring-color:color-mix(in oklab,var(--color-orange-500)15%,transparent)}}.ring-pink-500\\/15{--tw-ring-color:#f6339a26}@supports (color:color-mix(in lab,red,red)){.ring-pink-500\\/15{--tw-ring-color:color-mix(in oklab,var(--color-pink-500)15%,transparent)}}.ring-purple-500\\/15{--tw-ring-color:#ac4bff26}@supports (color:color-mix(in lab,red,red)){.ring-purple-500\\/15{--tw-ring-color:color-mix(in oklab,var(--color-purple-500)15%,transparent)}}.blur-2xl{--tw-blur:blur(var(--blur-2xl));filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.blur-\\[130px\\]{--tw-blur:blur(130px);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.blur-\\[150px\\]{--tw-blur:blur(150px);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.blur-\\[180px\\]{--tw-blur:blur(180px);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.blur-xl{--tw-blur:blur(var(--blur-xl));filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.backdrop-blur-2xl{--tw-backdrop-blur:blur(var(--blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.backdrop-blur-sm{--tw-backdrop-blur:blur(var(--blur-sm));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-300{--tw-duration:.3s;transition-duration:.3s}.duration-500{--tw-duration:.5s;transition-duration:.5s}.duration-700{--tw-duration:.7s;transition-duration:.7s}.will-change-transform{will-change:transform}.select-none{-webkit-user-select:none;user-select:none}.group-focus-within\\:w-full:is(:where(.group):focus-within *){width:100%}@media(hover:hover){.group-hover\\:translate-x-1:is(:where(.group):hover *){--tw-translate-x:calc(var(--spacing)*1);translate:var(--tw-translate-x)var(--tw-translate-y)}.group-hover\\:scale-110:is(:where(.group):hover *){--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x)var(--tw-scale-y)}.group-hover\\:border-orange-500\\/30:is(:where(.group):hover *){border-color:#fe6e004d}@supports (color:color-mix(in lab,red,red)){.group-hover\\:border-orange-500\\/30:is(:where(.group):hover *){border-color:color-mix(in oklab,var(--color-orange-500)30%,transparent)}}.group-hover\\:border-pink-500\\/30:is(:where(.group):hover *){border-color:#f6339a4d}@supports (color:color-mix(in lab,red,red)){.group-hover\\:border-pink-500\\/30:is(:where(.group):hover *){border-color:color-mix(in oklab,var(--color-pink-500)30%,transparent)}}.group-hover\\:border-purple-500\\/30:is(:where(.group):hover *){border-color:#ac4bff4d}@supports (color:color-mix(in lab,red,red)){.group-hover\\:border-purple-500\\/30:is(:where(.group):hover *){border-color:color-mix(in oklab,var(--color-purple-500)30%,transparent)}}.group-hover\\:text-orange-300:is(:where(.group):hover *){color:var(--color-orange-300)}.group-hover\\:text-orange-400:is(:where(.group):hover *){color:var(--color-orange-400)}.group-hover\\:opacity-30:is(:where(.group):hover *){opacity:.3}.hover\\:scale-105:hover{--tw-scale-x:105%;--tw-scale-y:105%;--tw-scale-z:105%;scale:var(--tw-scale-x)var(--tw-scale-y)}.hover\\:scale-110:hover{--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x)var(--tw-scale-y)}.hover\\:border-orange-500\\/25:hover{border-color:#fe6e0040}@supports (color:color-mix(in lab,red,red)){.hover\\:border-orange-500\\/25:hover{border-color:color-mix(in oklab,var(--color-orange-500)25%,transparent)}}.hover\\:border-orange-500\\/30:hover{border-color:#fe6e004d}@supports (color:color-mix(in lab,red,red)){.hover\\:border-orange-500\\/30:hover{border-color:color-mix(in oklab,var(--color-orange-500)30%,transparent)}}.hover\\:border-orange-500\\/40:hover{border-color:#fe6e0066}@supports (color:color-mix(in lab,red,red)){.hover\\:border-orange-500\\/40:hover{border-color:color-mix(in oklab,var(--color-orange-500)40%,transparent)}}.hover\\:border-pink-500\\/30:hover{border-color:#f6339a4d}@supports (color:color-mix(in lab,red,red)){.hover\\:border-pink-500\\/30:hover{border-color:color-mix(in oklab,var(--color-pink-500)30%,transparent)}}.hover\\:border-purple-500\\/30:hover{border-color:#ac4bff4d}@supports (color:color-mix(in lab,red,red)){.hover\\:border-purple-500\\/30:hover{border-color:color-mix(in oklab,var(--color-purple-500)30%,transparent)}}.hover\\:bg-\\[var\\(--hover-bg\\)\\]:hover{background-color:var(--hover-bg)}.hover\\:bg-\\[var\\(--surface-bg\\)\\]:hover{background-color:var(--surface-bg)}.hover\\:bg-orange-500\\/5:hover{background-color:#fe6e000d}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-orange-500\\/5:hover{background-color:color-mix(in oklab,var(--color-orange-500)5%,transparent)}}.hover\\:bg-orange-500\\/15:hover{background-color:#fe6e0026}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-orange-500\\/15:hover{background-color:color-mix(in oklab,var(--color-orange-500)15%,transparent)}}.hover\\:bg-pink-500\\/15:hover{background-color:#f6339a26}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-pink-500\\/15:hover{background-color:color-mix(in oklab,var(--color-pink-500)15%,transparent)}}.hover\\:bg-purple-500\\/15:hover{background-color:#ac4bff26}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-purple-500\\/15:hover{background-color:color-mix(in oklab,var(--color-purple-500)15%,transparent)}}.hover\\:from-orange-400:hover{--tw-gradient-from:var(--color-orange-400);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.hover\\:from-orange-500:hover{--tw-gradient-from:var(--color-orange-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.hover\\:to-pink-400:hover{--tw-gradient-to:var(--color-pink-400);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.hover\\:to-pink-500:hover{--tw-gradient-to:var(--color-pink-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.hover\\:text-\\[var\\(--text-heading\\)\\]:hover{color:var(--text-heading)}.hover\\:text-orange-400:hover{color:var(--color-orange-400)}.hover\\:shadow-\\[0_0_20px_rgba\\(168\\,85\\,247\\,0\\.12\\)\\]:hover{--tw-shadow:0 0 20px var(--tw-shadow-color,#a855f71f);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-\\[0_0_20px_rgba\\(236\\,72\\,153\\,0\\.12\\)\\]:hover{--tw-shadow:0 0 20px var(--tw-shadow-color,#ec48991f);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-\\[0_0_20px_rgba\\(249\\,115\\,22\\,0\\.12\\)\\]:hover{--tw-shadow:0 0 20px var(--tw-shadow-color,#f973161f);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-xl:hover{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a),0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-orange-500\\/10:hover{--tw-shadow-color:#fe6e001a}@supports (color:color-mix(in lab,red,red)){.hover\\:shadow-orange-500\\/10:hover{--tw-shadow-color:color-mix(in oklab,color-mix(in oklab,var(--color-orange-500)10%,transparent)var(--tw-shadow-alpha),transparent)}}.hover\\:shadow-orange-500\\/20:hover{--tw-shadow-color:#fe6e0033}@supports (color:color-mix(in lab,red,red)){.hover\\:shadow-orange-500\\/20:hover{--tw-shadow-color:color-mix(in oklab,color-mix(in oklab,var(--color-orange-500)20%,transparent)var(--tw-shadow-alpha),transparent)}}.hover\\:shadow-orange-500\\/30:hover{--tw-shadow-color:#fe6e004d}@supports (color:color-mix(in lab,red,red)){.hover\\:shadow-orange-500\\/30:hover{--tw-shadow-color:color-mix(in oklab,color-mix(in oklab,var(--color-orange-500)30%,transparent)var(--tw-shadow-alpha),transparent)}}}@media(min-width:40rem){.sm\\:right-5{right:calc(var(--spacing)*5)}.sm\\:h-36{height:calc(var(--spacing)*36)}.sm\\:w-12{width:calc(var(--spacing)*12)}.sm\\:w-36{width:calc(var(--spacing)*36)}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:gap-5{gap:calc(var(--spacing)*5)}.sm\\:p-7{padding:calc(var(--spacing)*7)}.sm\\:text-4xl{font-size:var(--text-4xl);line-height:var(--tw-leading,var(--text-4xl--line-height))}.sm\\:text-5xl{font-size:var(--text-5xl);line-height:var(--tw-leading,var(--text-5xl--line-height))}.sm\\:text-6xl{font-size:var(--text-6xl);line-height:var(--tw-leading,var(--text-6xl--line-height))}.sm\\:text-7xl{font-size:var(--text-7xl);line-height:var(--tw-leading,var(--text-7xl--line-height))}.sm\\:text-8xl{font-size:var(--text-8xl);line-height:var(--tw-leading,var(--text-8xl--line-height))}.sm\\:text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.sm\\:text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.sm\\:text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}}@media(min-width:48rem){.md\\:col-span-2{grid-column:span 2/span 2}.md\\:col-span-3{grid-column:span 3/span 3}.md\\:col-span-9{grid-column:span 9/span 9}.md\\:-mx-5{margin-inline:calc(var(--spacing)*-5)}.md\\:-mx-6{margin-inline:calc(var(--spacing)*-6)}.md\\:block{display:block}.md\\:flex{display:flex}.md\\:hidden{display:none}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr))}.md\\:flex-row{flex-direction:row}.md\\:gap-6{gap:calc(var(--spacing)*6)}.md\\:gap-8{gap:calc(var(--spacing)*8)}.md\\:px-5{padding-inline:calc(var(--spacing)*5)}.md\\:px-6{padding-inline:calc(var(--spacing)*6)}.md\\:py-9{padding-block:calc(var(--spacing)*9)}.md\\:py-10{padding-block:calc(var(--spacing)*10)}.md\\:py-36{padding-block:calc(var(--spacing)*36)}.md\\:text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.md\\:text-5xl{font-size:var(--text-5xl);line-height:var(--tw-leading,var(--text-5xl--line-height))}.md\\:text-6xl{font-size:var(--text-6xl);line-height:var(--tw-leading,var(--text-6xl--line-height))}.md\\:text-7xl{font-size:var(--text-7xl);line-height:var(--tw-leading,var(--text-7xl--line-height))}.md\\:text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.md\\:text-\\[9rem\\]{font-size:9rem}}@media(min-width:64rem){.lg\\:flex{display:flex}.lg\\:hidden{display:none}.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\\:flex-row{flex-direction:row}.lg\\:items-start{align-items:flex-start}.lg\\:justify-start{justify-content:flex-start}.lg\\:gap-8{gap:calc(var(--spacing)*8)}.lg\\:gap-20{gap:calc(var(--spacing)*20)}.lg\\:pt-16{padding-top:calc(var(--spacing)*16)}.lg\\:text-left{text-align:left}.lg\\:text-6xl{font-size:var(--text-6xl);line-height:var(--tw-leading,var(--text-6xl--line-height))}.lg\\:text-7xl{font-size:var(--text-7xl);line-height:var(--tw-leading,var(--text-7xl--line-height))}.lg\\:text-8xl{font-size:var(--text-8xl);line-height:var(--tw-leading,var(--text-8xl--line-height))}.lg\\:text-\\[10rem\\]{font-size:10rem}}@media(min-width:80rem){.xl\\:h-\\[25rem\\]{height:25rem}.xl\\:w-80{width:calc(var(--spacing)*80)}}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}
</style>
  </head>
  <body>
    <div id="root"><!--ssr-outlet--></div>
  </body>
</html>
`;
var gc = { async fetch(O, M) {
  let N = new URL(O.url);
  if (N.pathname !== "/" && N.pathname !== "/index.html") return M.ASSETS.fetch(O);
  try {
    let F = ic, V = fu();
    F = F.replace("<!--seo-head-->", V);
    try {
      let D = mu();
      F = F.replace("<!--ssr-outlet-->", D);
    } catch (D) {
      console.error("SSR render failed:", D);
    }
    return new Response(F, { headers: { "content-type": "text/html;charset=UTF-8", "cache-control": "public, max-age=300, s-maxage=3600" } });
  } catch (F) {
    return console.error("Worker error:", F), M.ASSETS.fetch(O);
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
var middleware_insertion_facade_default = gc;

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
