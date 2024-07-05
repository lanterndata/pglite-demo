/// <reference types="node" />
import { P as PGliteInterface, F as Filesystem, D as DebugLevel, a as PGliteOptions, E as Extension, Q as QueryOptions, R as Results, T as Transaction, b as ExecProtocolOptions, B as BackendMessage$1, c as PGliteInterfaceExtensions, d as ParserOptions } from './interface--Ghv4_X7.js';
export { h as ExtensionSetup, g as ExtensionSetupResult, i as Extensions, e as FilesystemType, j as Row, f as RowMode, m as messages } from './interface--Ghv4_X7.js';

declare class PGlite implements PGliteInterface {
    #private;
    fs?: Filesystem;
    protected emp?: any;
    readonly waitReady: Promise<void>;
    readonly debug: DebugLevel;
    /**
     * Create a new PGlite instance
     * @param dataDir The directory to store the database files
     *                Prefix with idb:// to use indexeddb filesystem in the browser
     *                Use memory:// to use in-memory filesystem
     * @param options Optional options
     */
    constructor(dataDir?: string, options?: PGliteOptions);
    /**
     * Create a new PGlite instance
     * @param options PGlite options including the data directory
     */
    constructor(options?: PGliteOptions);
    addExtension(extName: string, extension: Extension): Promise<void>;
    /**
     * The ready state of the database
     */
    get ready(): boolean;
    /**
     * The closed state of the database
     */
    get closed(): boolean;
    /**
     * Close the database
     * @returns A promise that resolves when the database is closed
     */
    close(): Promise<void>;
    /**
     * Execute a single SQL statement
     * This uses the "Extended Query" postgres wire protocol message.
     * @param query The query to execute
     * @param params Optional parameters for the query
     * @returns The result of the query
     */
    query<T>(query: string, params?: any[], options?: QueryOptions): Promise<Results<T>>;
    /**
     * Execute a SQL query, this can have multiple statements.
     * This uses the "Simple Query" postgres wire protocol message.
     * @param query The query to execute
     * @returns The result of the query
     */
    exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
    /**
     * Execute a transaction
     * @param callback A callback function that takes a transaction object
     * @returns The result of the transaction
     */
    transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T | undefined>;
    /**
     * Execute a postgres wire protocol message
     * @param message The postgres wire protocol message to execute
     * @returns The result of the query
     */
    execProtocol(message: Uint8Array, { syncToFs }?: ExecProtocolOptions): Promise<Array<[BackendMessage$1, Uint8Array]>>;
    /**
     * Listen for a notification
     * @param channel The channel to listen on
     * @param callback The callback to call when a notification is received
     */
    listen(channel: string, callback: (payload: string) => void): Promise<() => Promise<void>>;
    /**
     * Stop listening for a notification
     * @param channel The channel to stop listening on
     * @param callback The callback to remove
     */
    unlisten(channel: string, callback?: (payload: string) => void): Promise<void>;
    /**
     * Listen to notifications
     * @param callback The callback to call when a notification is received
     */
    onNotification(callback: (channel: string, payload: string) => void): () => void;
    /**
     * Stop listening to notifications
     * @param callback The callback to remove
     */
    offNotification(callback: (channel: string, payload: string) => void): void;
    /**
     * Create a new PGlite instance with extensions on the Typescript interface
     * (The main constructor does enable extensions, however due to the limitations
     * of Typescript, the extensions are not available on the instance interface)
     * @param dataDir The directory to store the database files
     *                Prefix with idb:// to use indexeddb filesystem in the browser
     *                Use memory:// to use in-memory filesystem
     * @param options Optional options
     * @returns A new PGlite instance with extensions
     */
    static withExtensions<O extends PGliteOptions>(options?: O): PGlite & PGliteInterfaceExtensions<O["extensions"]>;
}

declare const BOOL = 16;
declare const BYTEA = 17;
declare const CHAR = 18;
declare const INT8 = 20;
declare const INT2 = 21;
declare const INT4 = 23;
declare const REGPROC = 24;
declare const TEXT = 25;
declare const OID = 26;
declare const TID = 27;
declare const XID = 28;
declare const CID = 29;
declare const JSON = 114;
declare const XML = 142;
declare const PG_NODE_TREE = 194;
declare const SMGR = 210;
declare const PATH = 602;
declare const POLYGON = 604;
declare const CIDR = 650;
declare const FLOAT4 = 700;
declare const FLOAT8 = 701;
declare const ABSTIME = 702;
declare const RELTIME = 703;
declare const TINTERVAL = 704;
declare const CIRCLE = 718;
declare const MACADDR8 = 774;
declare const MONEY = 790;
declare const MACADDR = 829;
declare const INET = 869;
declare const ACLITEM = 1033;
declare const BPCHAR = 1042;
declare const VARCHAR = 1043;
declare const DATE = 1082;
declare const TIME = 1083;
declare const TIMESTAMP = 1114;
declare const TIMESTAMPTZ = 1184;
declare const INTERVAL = 1186;
declare const TIMETZ = 1266;
declare const BIT = 1560;
declare const VARBIT = 1562;
declare const NUMERIC = 1700;
declare const REFCURSOR = 1790;
declare const REGPROCEDURE = 2202;
declare const REGOPER = 2203;
declare const REGOPERATOR = 2204;
declare const REGCLASS = 2205;
declare const REGTYPE = 2206;
declare const UUID = 2950;
declare const TXID_SNAPSHOT = 2970;
declare const PG_LSN = 3220;
declare const PG_NDISTINCT = 3361;
declare const PG_DEPENDENCIES = 3402;
declare const TSVECTOR = 3614;
declare const TSQUERY = 3615;
declare const GTSVECTOR = 3642;
declare const REGCONFIG = 3734;
declare const REGDICTIONARY = 3769;
declare const JSONB = 3802;
declare const REGNAMESPACE = 4089;
declare const REGROLE = 4096;
declare const arrayTypes: {
    1001: number;
    1002: number;
    1016: number;
    1005: number;
    1007: number;
    1009: number;
    1028: number;
    199: number;
    1021: number;
    1022: number;
    1015: number;
    3807: number;
    1182: number;
    1115: number;
    1116: number;
};
declare const types: {
    string: {
        to: number;
        from: number[];
        serialize: (x: string) => string;
        parse: (x: string) => string;
    };
    number: {
        to: number;
        from: number[];
        serialize: (x: number) => string;
        parse: (x: string) => number;
    };
    bigint: {
        to: number;
        from: number[];
        js: BigIntConstructor[];
        serialize: (x: BigInt) => string;
        parse: (x: string) => number | bigint;
    };
    json: {
        to: number;
        from: number[];
        serialize: (x: any) => string;
        parse: (x: string) => any;
    };
    boolean: {
        to: number;
        from: number[];
        serialize: (x: boolean) => "t" | "f";
        parse: (x: string) => boolean;
    };
    date: {
        to: number;
        from: number[];
        js: DateConstructor[];
        serialize: (x: Date | string | number) => string;
        parse: (x: string | number) => Date;
    };
    bytea: {
        to: number;
        from: number[];
        js: (Uint8ArrayConstructor | BufferConstructor)[];
        serialize: (x: Uint8Array) => string;
        parse: (x: string) => Uint8Array;
    };
    array: {
        to: number;
        from: number[];
        serialize: (x: any[]) => string;
        parse: (x: string, typeId?: number) => any;
    };
};
type TypeHandler = {
    to: number;
    from: number | number[];
    js?: any;
    serialize: (x: any) => string;
    parse: (x: string, typeId?: number) => any;
};
type TypeHandlers = {
    [key: string]: TypeHandler;
};
declare const parsers: {
    [key: string]: (x: string, typeId?: number) => any;
    [key: number]: (x: string, typeId?: number) => any;
};
declare const serializers: {
    [key: string]: Serializer;
    [key: number]: Serializer;
};
declare const serializerInstanceof: [any, Serializer][];
type Serializer = (x: any) => [string, number];
declare function serializerFor(x: any): Serializer;
declare function serializeType(x: any): [string | null, number];
declare function parseArray(value: string, parser?: (s: string) => any): any;
declare function parseType(x: string, type: number, parsers?: ParserOptions): any;

declare const types$1_ABSTIME: typeof ABSTIME;
declare const types$1_ACLITEM: typeof ACLITEM;
declare const types$1_BIT: typeof BIT;
declare const types$1_BOOL: typeof BOOL;
declare const types$1_BPCHAR: typeof BPCHAR;
declare const types$1_BYTEA: typeof BYTEA;
declare const types$1_CHAR: typeof CHAR;
declare const types$1_CID: typeof CID;
declare const types$1_CIDR: typeof CIDR;
declare const types$1_CIRCLE: typeof CIRCLE;
declare const types$1_DATE: typeof DATE;
declare const types$1_FLOAT4: typeof FLOAT4;
declare const types$1_FLOAT8: typeof FLOAT8;
declare const types$1_GTSVECTOR: typeof GTSVECTOR;
declare const types$1_INET: typeof INET;
declare const types$1_INT2: typeof INT2;
declare const types$1_INT4: typeof INT4;
declare const types$1_INT8: typeof INT8;
declare const types$1_INTERVAL: typeof INTERVAL;
declare const types$1_JSON: typeof JSON;
declare const types$1_JSONB: typeof JSONB;
declare const types$1_MACADDR: typeof MACADDR;
declare const types$1_MACADDR8: typeof MACADDR8;
declare const types$1_MONEY: typeof MONEY;
declare const types$1_NUMERIC: typeof NUMERIC;
declare const types$1_OID: typeof OID;
declare const types$1_PATH: typeof PATH;
declare const types$1_PG_DEPENDENCIES: typeof PG_DEPENDENCIES;
declare const types$1_PG_LSN: typeof PG_LSN;
declare const types$1_PG_NDISTINCT: typeof PG_NDISTINCT;
declare const types$1_PG_NODE_TREE: typeof PG_NODE_TREE;
declare const types$1_POLYGON: typeof POLYGON;
declare const types$1_REFCURSOR: typeof REFCURSOR;
declare const types$1_REGCLASS: typeof REGCLASS;
declare const types$1_REGCONFIG: typeof REGCONFIG;
declare const types$1_REGDICTIONARY: typeof REGDICTIONARY;
declare const types$1_REGNAMESPACE: typeof REGNAMESPACE;
declare const types$1_REGOPER: typeof REGOPER;
declare const types$1_REGOPERATOR: typeof REGOPERATOR;
declare const types$1_REGPROC: typeof REGPROC;
declare const types$1_REGPROCEDURE: typeof REGPROCEDURE;
declare const types$1_REGROLE: typeof REGROLE;
declare const types$1_REGTYPE: typeof REGTYPE;
declare const types$1_RELTIME: typeof RELTIME;
declare const types$1_SMGR: typeof SMGR;
type types$1_Serializer = Serializer;
declare const types$1_TEXT: typeof TEXT;
declare const types$1_TID: typeof TID;
declare const types$1_TIME: typeof TIME;
declare const types$1_TIMESTAMP: typeof TIMESTAMP;
declare const types$1_TIMESTAMPTZ: typeof TIMESTAMPTZ;
declare const types$1_TIMETZ: typeof TIMETZ;
declare const types$1_TINTERVAL: typeof TINTERVAL;
declare const types$1_TSQUERY: typeof TSQUERY;
declare const types$1_TSVECTOR: typeof TSVECTOR;
declare const types$1_TXID_SNAPSHOT: typeof TXID_SNAPSHOT;
type types$1_TypeHandler = TypeHandler;
type types$1_TypeHandlers = TypeHandlers;
declare const types$1_UUID: typeof UUID;
declare const types$1_VARBIT: typeof VARBIT;
declare const types$1_VARCHAR: typeof VARCHAR;
declare const types$1_XID: typeof XID;
declare const types$1_XML: typeof XML;
declare const types$1_arrayTypes: typeof arrayTypes;
declare const types$1_parseArray: typeof parseArray;
declare const types$1_parseType: typeof parseType;
declare const types$1_parsers: typeof parsers;
declare const types$1_serializeType: typeof serializeType;
declare const types$1_serializerFor: typeof serializerFor;
declare const types$1_serializerInstanceof: typeof serializerInstanceof;
declare const types$1_serializers: typeof serializers;
declare const types$1_types: typeof types;
declare namespace types$1 {
  export { types$1_ABSTIME as ABSTIME, types$1_ACLITEM as ACLITEM, types$1_BIT as BIT, types$1_BOOL as BOOL, types$1_BPCHAR as BPCHAR, types$1_BYTEA as BYTEA, types$1_CHAR as CHAR, types$1_CID as CID, types$1_CIDR as CIDR, types$1_CIRCLE as CIRCLE, types$1_DATE as DATE, types$1_FLOAT4 as FLOAT4, types$1_FLOAT8 as FLOAT8, types$1_GTSVECTOR as GTSVECTOR, types$1_INET as INET, types$1_INT2 as INT2, types$1_INT4 as INT4, types$1_INT8 as INT8, types$1_INTERVAL as INTERVAL, types$1_JSON as JSON, types$1_JSONB as JSONB, types$1_MACADDR as MACADDR, types$1_MACADDR8 as MACADDR8, types$1_MONEY as MONEY, types$1_NUMERIC as NUMERIC, types$1_OID as OID, types$1_PATH as PATH, types$1_PG_DEPENDENCIES as PG_DEPENDENCIES, types$1_PG_LSN as PG_LSN, types$1_PG_NDISTINCT as PG_NDISTINCT, types$1_PG_NODE_TREE as PG_NODE_TREE, types$1_POLYGON as POLYGON, types$1_REFCURSOR as REFCURSOR, types$1_REGCLASS as REGCLASS, types$1_REGCONFIG as REGCONFIG, types$1_REGDICTIONARY as REGDICTIONARY, types$1_REGNAMESPACE as REGNAMESPACE, types$1_REGOPER as REGOPER, types$1_REGOPERATOR as REGOPERATOR, types$1_REGPROC as REGPROC, types$1_REGPROCEDURE as REGPROCEDURE, types$1_REGROLE as REGROLE, types$1_REGTYPE as REGTYPE, types$1_RELTIME as RELTIME, types$1_SMGR as SMGR, type types$1_Serializer as Serializer, types$1_TEXT as TEXT, types$1_TID as TID, types$1_TIME as TIME, types$1_TIMESTAMP as TIMESTAMP, types$1_TIMESTAMPTZ as TIMESTAMPTZ, types$1_TIMETZ as TIMETZ, types$1_TINTERVAL as TINTERVAL, types$1_TSQUERY as TSQUERY, types$1_TSVECTOR as TSVECTOR, types$1_TXID_SNAPSHOT as TXID_SNAPSHOT, type types$1_TypeHandler as TypeHandler, type types$1_TypeHandlers as TypeHandlers, types$1_UUID as UUID, types$1_VARBIT as VARBIT, types$1_VARCHAR as VARCHAR, types$1_XID as XID, types$1_XML as XML, types$1_arrayTypes as arrayTypes, types$1_parseArray as parseArray, types$1_parseType as parseType, types$1_parsers as parsers, types$1_serializeType as serializeType, types$1_serializerFor as serializerFor, types$1_serializerInstanceof as serializerInstanceof, types$1_serializers as serializers, types$1_types as types };
}

/**
 * This function is used to parse the results of either a simple or extended query.
 * https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-SIMPLE-QUERY
 */
declare function parseResults(messages: Array<BackendMessage$1>, options?: QueryOptions, blob?: Blob): Array<Results>;

declare const parse$1_parseResults: typeof parseResults;
declare namespace parse$1 {
  export { parse$1_parseResults as parseResults };
}

declare type MessageName = 'parseComplete' | 'bindComplete' | 'closeComplete' | 'noData' | 'portalSuspended' | 'replicationStart' | 'emptyQuery' | 'copyDone' | 'copyData' | 'rowDescription' | 'parameterDescription' | 'parameterStatus' | 'backendKeyData' | 'notification' | 'readyForQuery' | 'commandComplete' | 'dataRow' | 'copyInResponse' | 'copyOutResponse' | 'authenticationOk' | 'authenticationMD5Password' | 'authenticationCleartextPassword' | 'authenticationSASL' | 'authenticationSASLContinue' | 'authenticationSASLFinal' | 'error' | 'notice';
interface BackendMessage {
    name: MessageName;
    length: number;
}
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

declare type ParseOpts = {
    name?: string;
    types?: number[];
    text: string;
};
declare type ValueMapper = (param: any, index: number) => any;
declare type BindOpts = {
    portal?: string;
    binary?: boolean;
    statement?: string;
    values?: any[];
    valueMapper?: ValueMapper;
};
declare type ExecOpts = {
    portal?: string;
    rows?: number;
};
declare type PortalOpts = {
    type: 'S' | 'P';
    name?: string;
};
declare const serialize: {
    startup: (opts: Record<string, string>) => Buffer;
    password: (password: string) => Buffer;
    requestSsl: () => Buffer;
    sendSASLInitialResponseMessage: (mechanism: string, initialResponse: string) => Buffer;
    sendSCRAMClientFinalMessage: (additionalData: string) => Buffer;
    query: (text: string) => Buffer;
    parse: (query: ParseOpts) => Buffer;
    bind: (config?: BindOpts) => Buffer;
    execute: (config?: ExecOpts | undefined) => Buffer;
    describe: (msg: PortalOpts) => Buffer;
    close: (msg: PortalOpts) => Buffer;
    flush: () => Buffer;
    sync: () => Buffer;
    end: () => Buffer;
    copyData: (chunk: Buffer) => Buffer;
    copyDone: () => Buffer;
    copyFail: (message: string) => Buffer;
    cancel: (processID: number, secretKey: number) => Buffer;
};

declare type MessageCallback = (msg: BackendMessage) => void;

declare function parse(stream: NodeJS.ReadableStream, callback: MessageCallback): Promise<void>;

type index_DatabaseError = DatabaseError;
declare const index_DatabaseError: typeof DatabaseError;
declare const index_parse: typeof parse;
declare const index_serialize: typeof serialize;
declare namespace index {
  export { index_DatabaseError as DatabaseError, index_parse as parse, index_serialize as serialize };
}

interface MutexInterface {
    acquire(): Promise<MutexInterface.Releaser>;
    runExclusive<T>(callback: MutexInterface.Worker<T>): Promise<T>;
    waitForUnlock(): Promise<void>;
    isLocked(): boolean;
    release(): void;
    cancel(): void;
}
declare namespace MutexInterface {
    interface Releaser {
        (): void;
    }
    interface Worker<T> {
        (): Promise<T> | T;
    }
}

declare class Mutex implements MutexInterface {
    constructor(cancelError?: Error);
    acquire(): Promise<MutexInterface.Releaser>;
    runExclusive<T>(callback: MutexInterface.Worker<T>): Promise<T>;
    isLocked(): boolean;
    waitForUnlock(): Promise<void>;
    release(): void;
    cancel(): void;
    private _semaphore;
}

export { DebugLevel, ExecProtocolOptions, Extension, Mutex, PGlite, PGliteInterface, PGliteInterfaceExtensions, PGliteOptions, ParserOptions, QueryOptions, Results, Transaction, parse$1 as parse, index as protocol, types$1 as types };
