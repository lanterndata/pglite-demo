/** Based on https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/emscripten/index.d.ts */
/** Other WebAssembly declarations, for compatibility with older versions of Typescript */
declare namespace WebAssembly {
  interface Module {}
}

declare namespace Emscripten {
  interface FileSystemType {}
  type EnvironmentType = "WEB" | "NODE" | "SHELL" | "WORKER";

  type JSType = "number" | "string" | "array" | "boolean";
  type TypeCompatibleWithC = number | string | any[] | boolean;

  type CIntType = "i8" | "i16" | "i32" | "i64";
  type CFloatType = "float" | "double";
  type CPointerType =
    | "i8*"
    | "i16*"
    | "i32*"
    | "i64*"
    | "float*"
    | "double*"
    | "*";
  type CType = CIntType | CFloatType | CPointerType;

  type WebAssemblyImports = Array<{
    name: string;
    kind: string;
  }>;

  type WebAssemblyExports = Array<{
    module: string;
    name: string;
    kind: string;
  }>;

  interface CCallOpts {
    async?: boolean | undefined;
  }
}

interface EmscriptenModule {
  print(str: string): void;
  printErr(str: string): void;
  arguments: string[];
  environment: Emscripten.EnvironmentType;
  preInit: Array<{ (mod: EmscriptenModule): void }>;
  preRun: Array<{ (mod: EmscriptenModule): void }>;
  postRun: Array<{ (mod: EmscriptenModule): void }>;
  onAbort: { (what: any): void };
  onRuntimeInitialized: { (): void };
  preinitializedWebGLContext: WebGLRenderingContext;
  noInitialRun: boolean;
  noExitRuntime: boolean;
  logReadFiles: boolean;
  filePackagePrefixURL: string;
  wasmBinary: ArrayBuffer;

  destroy(object: object): void;
  getPreloadedPackage(
    remotePackageName: string,
    remotePackageSize: number
  ): ArrayBuffer;
  instantiateWasm(
    imports: Emscripten.WebAssemblyImports,
    successCallback: (module: WebAssembly.Module) => void
  ): Emscripten.WebAssemblyExports;
  locateFile(url: string, scriptDirectory: string): string;
  onCustomMessage(event: MessageEvent): void;

  // USE_TYPED_ARRAYS == 1
  HEAP: Int32Array;
  IHEAP: Int32Array;
  FHEAP: Float64Array;

  // USE_TYPED_ARRAYS == 2
  HEAP8: Int8Array;
  HEAP16: Int16Array;
  HEAP32: Int32Array;
  HEAPU8: Uint8Array;
  HEAPU16: Uint16Array;
  HEAPU32: Uint32Array;
  HEAPF32: Float32Array;
  HEAPF64: Float64Array;
  HEAP64: BigInt64Array;
  HEAPU64: BigUint64Array;

  TOTAL_STACK: number;
  TOTAL_MEMORY: number;
  FAST_MEMORY: number;

  addOnPreRun(cb: () => any): void;
  addOnInit(cb: () => any): void;
  addOnPreMain(cb: () => any): void;
  addOnExit(cb: () => any): void;
  addOnPostRun(cb: () => any): void;

  preloadedImages: any;
  preloadedAudios: any;

  _malloc(size: number): number;
  _free(ptr: number): void;
}

interface FS {
  Lookup: {
    path: string;
    node: FSNode;
  };

  FSStream: {};
  FSNode: {};
  ErrnoError: {};

  ignorePermissions: boolean;
  trackingDelegate: any;
  tracking: any;
  genericErrors: any;

  filesystems: {
    NODEFS: Emscripten.FileSystemType;
    MEMFS: Emscripten.FileSystemType;
    IDBFS: Emscripten.FileSystemType;
  };

  //
  // paths
  //
  lookupPath(path: string, opts: any): Lookup;
  getPath(node: FSNode): string;

  //
  // nodes
  //
  isFile(mode: number): boolean;
  isDir(mode: number): boolean;
  isLink(mode: number): boolean;
  isChrdev(mode: number): boolean;
  isBlkdev(mode: number): boolean;
  isFIFO(mode: number): boolean;
  isSocket(mode: number): boolean;

  //
  // devices
  //
  major(dev: number): number;
  minor(dev: number): number;
  makedev(ma: number, mi: number): number;
  registerDevice(dev: number, ops: any): void;

  //
  // core
  //
  syncfs(populate: boolean, callback: (e: any) => any): void;
  syncfs(callback: (e: any) => any, populate?: boolean): void;
  mount(type: Emscripten.FileSystemType, opts: any, mountpoint: string): any;
  unmount(mountpoint: string): void;

  mkdir(path: string, mode?: number): any;
  mkdev(path: string, mode?: number, dev?: number): any;
  symlink(oldpath: string, newpath: string): any;
  rename(old_path: string, new_path: string): void;
  rmdir(path: string): void;
  readdir(path: string): any;
  unlink(path: string): void;
  readlink(path: string): string;
  stat(path: string, dontFollow?: boolean): any;
  lstat(path: string): any;
  chmod(path: string, mode: number, dontFollow?: boolean): void;
  lchmod(path: string, mode: number): void;
  fchmod(fd: number, mode: number): void;
  chown(path: string, uid: number, gid: number, dontFollow?: boolean): void;
  lchown(path: string, uid: number, gid: number): void;
  fchown(fd: number, uid: number, gid: number): void;
  truncate(path: string, len: number): void;
  ftruncate(fd: number, len: number): void;
  utime(path: string, atime: number, mtime: number): void;
  open(
    path: string,
    flags: string,
    mode?: number,
    fd_start?: number,
    fd_end?: number
  ): FSStream;
  close(stream: FSStream): void;
  llseek(stream: FSStream, offset: number, whence: number): any;
  read(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position?: number
  ): number;
  write(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position?: number,
    canOwn?: boolean
  ): number;
  allocate(stream: FSStream, offset: number, length: number): void;
  mmap(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position: number,
    prot: number,
    flags: number
  ): any;
  ioctl(stream: FSStream, cmd: any, arg: any): any;
  readFile(
    path: string,
    opts: { encoding: "binary"; flags?: string | undefined }
  ): Uint8Array;
  readFile(
    path: string,
    opts: { encoding: "utf8"; flags?: string | undefined }
  ): string;
  readFile(path: string, opts?: { flags?: string | undefined }): Uint8Array;
  writeFile(
    path: string,
    data: string | ArrayBufferView,
    opts?: { flags?: string | undefined }
  ): void;

  //
  // module-level FS code
  //
  cwd(): string;
  chdir(path: string): void;
  init(
    input: null | (() => number | null),
    output: null | ((c: number) => any),
    error: null | ((c: number) => any)
  ): void;

  createLazyFile(
    parent: string | FSNode,
    name: string,
    url: string,
    canRead: boolean,
    canWrite: boolean
  ): FSNode;
  createPreloadedFile(
    parent: string | FSNode,
    name: string,
    url: string,
    canRead: boolean,
    canWrite: boolean,
    onload?: () => void,
    onerror?: () => void,
    dontCreateFile?: boolean,
    canOwn?: boolean
  ): void;
  createDataFile(
    parent: string | FSNode,
    name: string,
    data: ArrayBufferView,
    canRead: boolean,
    canWrite: boolean,
    canOwn: boolean
  ): FSNode;
}

interface EmPostgres extends EmscriptenModule {
  FS: FS;
  eventTarget: EventTarget;
  Event: typeof CustomEvent;
  onRuntimeInitialized: (Module: EmPostgres) => Promise<void>;
}

interface Filesystem {
    /**
     * Returns true if the filesystem was initialized and this is the fun run.
     */
    init(debug?: DebugLevel): Promise<boolean>;
    /**
     * Returns the options to pass to the emscripten module.
     */
    emscriptenOpts(opts: Partial<EmPostgres>): Promise<Partial<EmPostgres>>;
    /**
     * Sync the filesystem to the emscripten filesystem.
     */
    syncToFs(mod: FS): Promise<void>;
    /**
     * Sync the emscripten filesystem to the filesystem.
     */
    initialSyncFs(mod: FS): Promise<void>;
}

declare type Mode = 'text' | 'binary';
declare type MessageName = 'parseComplete' | 'bindComplete' | 'closeComplete' | 'noData' | 'portalSuspended' | 'replicationStart' | 'emptyQuery' | 'copyDone' | 'copyData' | 'rowDescription' | 'parameterDescription' | 'parameterStatus' | 'backendKeyData' | 'notification' | 'readyForQuery' | 'commandComplete' | 'dataRow' | 'copyInResponse' | 'copyOutResponse' | 'authenticationOk' | 'authenticationMD5Password' | 'authenticationCleartextPassword' | 'authenticationSASL' | 'authenticationSASLContinue' | 'authenticationSASLFinal' | 'error' | 'notice';
interface BackendMessage {
    name: MessageName;
    length: number;
}
declare const parseComplete: BackendMessage;
declare const bindComplete: BackendMessage;
declare const closeComplete: BackendMessage;
declare const noData: BackendMessage;
declare const portalSuspended: BackendMessage;
declare const replicationStart: BackendMessage;
declare const emptyQuery: BackendMessage;
declare const copyDone: BackendMessage;
interface NoticeOrError {
    message: string | undefined;
    severity: string | undefined;
    code: string | undefined;
    detail: string | undefined;
    hint: string | undefined;
    position: string | undefined;
    internalPosition: string | undefined;
    internalQuery: string | undefined;
    where: string | undefined;
    schema: string | undefined;
    table: string | undefined;
    column: string | undefined;
    dataType: string | undefined;
    constraint: string | undefined;
    file: string | undefined;
    line: string | undefined;
    routine: string | undefined;
}
declare class DatabaseError extends Error implements NoticeOrError {
    readonly length: number;
    readonly name: MessageName;
    severity: string | undefined;
    code: string | undefined;
    detail: string | undefined;
    hint: string | undefined;
    position: string | undefined;
    internalPosition: string | undefined;
    internalQuery: string | undefined;
    where: string | undefined;
    schema: string | undefined;
    table: string | undefined;
    column: string | undefined;
    dataType: string | undefined;
    constraint: string | undefined;
    file: string | undefined;
    line: string | undefined;
    routine: string | undefined;
    constructor(message: string, length: number, name: MessageName);
}
declare class CopyDataMessage {
    readonly length: number;
    readonly chunk: Buffer;
    readonly name = "copyData";
    constructor(length: number, chunk: Buffer);
}
declare class CopyResponse {
    readonly length: number;
    readonly name: MessageName;
    readonly binary: boolean;
    readonly columnTypes: number[];
    constructor(length: number, name: MessageName, binary: boolean, columnCount: number);
}
declare class Field {
    readonly name: string;
    readonly tableID: number;
    readonly columnID: number;
    readonly dataTypeID: number;
    readonly dataTypeSize: number;
    readonly dataTypeModifier: number;
    readonly format: Mode;
    constructor(name: string, tableID: number, columnID: number, dataTypeID: number, dataTypeSize: number, dataTypeModifier: number, format: Mode);
}
declare class RowDescriptionMessage {
    readonly length: number;
    readonly fieldCount: number;
    readonly name: MessageName;
    readonly fields: Field[];
    constructor(length: number, fieldCount: number);
}
declare class ParameterDescriptionMessage {
    readonly length: number;
    readonly parameterCount: number;
    readonly name: MessageName;
    readonly dataTypeIDs: number[];
    constructor(length: number, parameterCount: number);
}
declare class ParameterStatusMessage {
    readonly length: number;
    readonly parameterName: string;
    readonly parameterValue: string;
    readonly name: MessageName;
    constructor(length: number, parameterName: string, parameterValue: string);
}
declare class AuthenticationMD5Password implements BackendMessage {
    readonly length: number;
    readonly salt: Buffer;
    readonly name: MessageName;
    constructor(length: number, salt: Buffer);
}
declare class BackendKeyDataMessage {
    readonly length: number;
    readonly processID: number;
    readonly secretKey: number;
    readonly name: MessageName;
    constructor(length: number, processID: number, secretKey: number);
}
declare class NotificationResponseMessage {
    readonly length: number;
    readonly processId: number;
    readonly channel: string;
    readonly payload: string;
    readonly name: MessageName;
    constructor(length: number, processId: number, channel: string, payload: string);
}
declare class ReadyForQueryMessage {
    readonly length: number;
    readonly status: string;
    readonly name: MessageName;
    constructor(length: number, status: string);
}
declare class CommandCompleteMessage {
    readonly length: number;
    readonly text: string;
    readonly name: MessageName;
    constructor(length: number, text: string);
}
declare class DataRowMessage {
    length: number;
    fields: any[];
    readonly fieldCount: number;
    readonly name: MessageName;
    constructor(length: number, fields: any[]);
}
declare class NoticeMessage implements BackendMessage, NoticeOrError {
    readonly length: number;
    readonly message: string | undefined;
    constructor(length: number, message: string | undefined);
    readonly name = "notice";
    severity: string | undefined;
    code: string | undefined;
    detail: string | undefined;
    hint: string | undefined;
    position: string | undefined;
    internalPosition: string | undefined;
    internalQuery: string | undefined;
    where: string | undefined;
    schema: string | undefined;
    table: string | undefined;
    column: string | undefined;
    dataType: string | undefined;
    constraint: string | undefined;
    file: string | undefined;
    line: string | undefined;
    routine: string | undefined;
}

type messages_AuthenticationMD5Password = AuthenticationMD5Password;
declare const messages_AuthenticationMD5Password: typeof AuthenticationMD5Password;
type messages_BackendKeyDataMessage = BackendKeyDataMessage;
declare const messages_BackendKeyDataMessage: typeof BackendKeyDataMessage;
type messages_BackendMessage = BackendMessage;
type messages_CommandCompleteMessage = CommandCompleteMessage;
declare const messages_CommandCompleteMessage: typeof CommandCompleteMessage;
type messages_CopyDataMessage = CopyDataMessage;
declare const messages_CopyDataMessage: typeof CopyDataMessage;
type messages_CopyResponse = CopyResponse;
declare const messages_CopyResponse: typeof CopyResponse;
type messages_DataRowMessage = DataRowMessage;
declare const messages_DataRowMessage: typeof DataRowMessage;
type messages_DatabaseError = DatabaseError;
declare const messages_DatabaseError: typeof DatabaseError;
type messages_Field = Field;
declare const messages_Field: typeof Field;
type messages_MessageName = MessageName;
type messages_Mode = Mode;
type messages_NoticeMessage = NoticeMessage;
declare const messages_NoticeMessage: typeof NoticeMessage;
type messages_NotificationResponseMessage = NotificationResponseMessage;
declare const messages_NotificationResponseMessage: typeof NotificationResponseMessage;
type messages_ParameterDescriptionMessage = ParameterDescriptionMessage;
declare const messages_ParameterDescriptionMessage: typeof ParameterDescriptionMessage;
type messages_ParameterStatusMessage = ParameterStatusMessage;
declare const messages_ParameterStatusMessage: typeof ParameterStatusMessage;
type messages_ReadyForQueryMessage = ReadyForQueryMessage;
declare const messages_ReadyForQueryMessage: typeof ReadyForQueryMessage;
type messages_RowDescriptionMessage = RowDescriptionMessage;
declare const messages_RowDescriptionMessage: typeof RowDescriptionMessage;
declare const messages_bindComplete: typeof bindComplete;
declare const messages_closeComplete: typeof closeComplete;
declare const messages_copyDone: typeof copyDone;
declare const messages_emptyQuery: typeof emptyQuery;
declare const messages_noData: typeof noData;
declare const messages_parseComplete: typeof parseComplete;
declare const messages_portalSuspended: typeof portalSuspended;
declare const messages_replicationStart: typeof replicationStart;
declare namespace messages {
  export { messages_AuthenticationMD5Password as AuthenticationMD5Password, messages_BackendKeyDataMessage as BackendKeyDataMessage, type messages_BackendMessage as BackendMessage, messages_CommandCompleteMessage as CommandCompleteMessage, messages_CopyDataMessage as CopyDataMessage, messages_CopyResponse as CopyResponse, messages_DataRowMessage as DataRowMessage, messages_DatabaseError as DatabaseError, messages_Field as Field, type messages_MessageName as MessageName, type messages_Mode as Mode, messages_NoticeMessage as NoticeMessage, messages_NotificationResponseMessage as NotificationResponseMessage, messages_ParameterDescriptionMessage as ParameterDescriptionMessage, messages_ParameterStatusMessage as ParameterStatusMessage, messages_ReadyForQueryMessage as ReadyForQueryMessage, messages_RowDescriptionMessage as RowDescriptionMessage, messages_bindComplete as bindComplete, messages_closeComplete as closeComplete, messages_copyDone as copyDone, messages_emptyQuery as emptyQuery, messages_noData as noData, messages_parseComplete as parseComplete, messages_portalSuspended as portalSuspended, messages_replicationStart as replicationStart };
}

type FilesystemType = "nodefs" | "idbfs" | "memoryfs";
type DebugLevel = 0 | 1 | 2 | 3 | 4 | 5;
type RowMode = "array" | "object";
interface ParserOptions {
    [pgType: number]: (value: string) => any;
}
interface QueryOptions {
    rowMode?: RowMode;
    parsers?: ParserOptions;
    blob?: Blob | File;
}
interface ExecProtocolOptions {
    syncToFs?: boolean;
}
interface ExtensionSetupResult {
    emscriptenOpts?: any;
    namespaceObj?: any;
    init?: () => Promise<void>;
    close?: () => Promise<void>;
}
type ExtensionSetup = (pg: PGliteInterface, emscriptenOpts: any) => Promise<ExtensionSetupResult>;
interface Extension {
    name?: string;
    setup: ExtensionSetup;
    pathOrUrl?: string;
}
type Extensions = {
    [namespace: string]: Extension;
};
interface PGliteOptions {
    dataDir?: string;
    fs?: Filesystem;
    debug?: DebugLevel;
    relaxedDurability?: boolean;
    extensions?: Extensions;
}
type PGliteInterface = {
    readonly waitReady: Promise<void>;
    readonly debug: DebugLevel;
    readonly ready: boolean;
    readonly closed: boolean;
    close(): Promise<void>;
    query<T>(query: string, params?: any[], options?: QueryOptions): Promise<Results<T>>;
    exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
    transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T | undefined>;
    execProtocol(message: Uint8Array, options?: ExecProtocolOptions): Promise<Array<[BackendMessage, Uint8Array]>>;
    listen(channel: string, callback: (payload: string) => void): Promise<() => Promise<void>>;
    unlisten(channel: string, callback?: (payload: string) => void): Promise<void>;
    onNotification(callback: (channel: string, payload: string) => void): () => void;
    offNotification(callback: (channel: string, payload: string) => void): void;
};
type PGliteInterfaceExtensions<E> = E extends Extensions ? {
    [K in keyof E]: Awaited<ReturnType<E[K]["setup"]>>["namespaceObj"] extends infer N ? N extends undefined | null | void ? never : N : never;
} : {};
type Row<T = {
    [key: string]: any;
}> = T;
type Results<T = {
    [key: string]: any;
}> = {
    rows: Row<T>[];
    affectedRows?: number;
    fields: {
        name: string;
        dataTypeID: number;
    }[];
    blob?: Blob;
};
interface Transaction {
    query<T>(query: string, params?: any[], options?: QueryOptions): Promise<Results<T>>;
    exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
    rollback(): Promise<void>;
    get closed(): boolean;
}

export { type BackendMessage as B, type DebugLevel as D, type Extension as E, type Filesystem as F, type PGliteInterface as P, type QueryOptions as Q, type Results as R, type Transaction as T, type PGliteOptions as a, type ExecProtocolOptions as b, type PGliteInterfaceExtensions as c, type ParserOptions as d, type FilesystemType as e, type RowMode as f, type ExtensionSetupResult as g, type ExtensionSetup as h, type Extensions as i, type Row as j, messages as m };
