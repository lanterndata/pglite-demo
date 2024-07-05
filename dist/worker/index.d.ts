import { P as PGliteInterface, e as FilesystemType, D as DebugLevel, a as PGliteOptions, Q as QueryOptions, R as Results, B as BackendMessage } from '../interface--Ghv4_X7.js';

declare class PGliteWorker implements PGliteInterface {
    #private;
    readonly dataDir?: string;
    readonly fsType: FilesystemType;
    readonly waitReady: Promise<void>;
    readonly debug: DebugLevel;
    constructor(dataDir: string, options?: PGliteOptions);
    get ready(): boolean;
    get closed(): boolean;
    close(): Promise<void>;
    query<T>(query: string, params?: any[], options?: QueryOptions): Promise<Results<T>>;
    exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
    transaction<T>(callback: (tx: any) => Promise<T>): Promise<any>;
    execProtocol(message: Uint8Array): Promise<Array<[BackendMessage, Uint8Array]>>;
    listen(channel: string, callback: (payload: string) => void): Promise<() => Promise<void>>;
    unlisten(channel: string, callback?: (payload: string) => void): Promise<void>;
    onNotification(callback: (channel: string, payload: string) => void): () => void;
    offNotification(callback: (channel: string, payload: string) => void): void;
    receiveNotification(channel: string, payload: string): void;
}

export { PGliteWorker };
