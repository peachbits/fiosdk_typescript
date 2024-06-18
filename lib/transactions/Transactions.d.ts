import { Api as FioJsApi } from '@fioprotocol/fiojs';
import { AbiProvider, AuthorityProvider } from '@fioprotocol/fiojs/dist/chain-api-interfaces';
import { PushTransactionArgs } from '@fioprotocol/fiojs/dist/chain-rpc-interfaces';
import { AbortSignal } from 'abort-controller';
import { AbiResponse } from '../entities/AbiResponse';
import { RawTransaction } from '../entities/RawTransaction';
declare type FetchJson = (uri: string, opts?: object) => any;
interface SignedTxArgs {
    compression: number;
    packed_context_free_data: string;
    packed_trx: string;
    signatures: string[];
}
export declare const signAllAuthorityProvider: AuthorityProvider;
export declare const fioApiErrorCodes: number[];
export declare const FIO_CHAIN_INFO_ERROR_CODE = 800;
export declare const FIO_BLOCK_NUMBER_ERROR_CODE = 801;
export declare class FioError extends Error {
    list: {
        field: string;
        message: string;
    }[];
    labelCode: string;
    errorCode: number;
    json: any;
    constructor(message: string, code?: number, labelCode?: string, json?: any);
}
export declare class Transactions {
    static baseUrls: string[];
    static abiMap: Map<string, AbiResponse>;
    static FioProvider: {
        prepareTransaction(param: any): Promise<any>;
        accountHash(pubKey: string): string;
    };
    static fetchJson: FetchJson;
    publicKey: string;
    privateKey: string;
    serilizeEndpoint: string;
    validationData: object;
    validationRules: any | null;
    expirationOffset: number;
    authPermission: string | undefined;
    signingAccount: string | undefined;
    getActor(publicKey?: string): string;
    getChainInfo(): Promise<any>;
    getBlock(chain: any): Promise<any>;
    getChainDataForTx(): Promise<{
        chain_id: number;
        ref_block_num: number;
        ref_block_prefix: number;
        expiration: string;
    }>;
    setRawTransactionExp(rawTransaction: RawTransaction, chainData: {
        ref_block_num: number;
        ref_block_prefix: number;
        expiration: string;
    }): void;
    generateApiProvider(abiMap: Map<string, any>): AbiProvider;
    initFioJsApi({ chainId, abiMap, textDecoder, textEncoder, privateKeys, }: {
        chainId: string;
        abiMap: Map<string, any>;
        privateKeys: string[];
        textDecoder?: TextDecoder;
        textEncoder?: TextEncoder;
    }): FioJsApi;
    createRawTransaction({ account, action, authPermission, data, publicKey, chainData, signingAccount }: {
        account: string;
        action: string;
        authPermission?: string;
        data: any;
        publicKey?: string;
        chainData?: {
            ref_block_num: number;
            ref_block_prefix: number;
            expiration: string;
        };
        signingAccount?: string;
    }): Promise<RawTransaction>;
    serialize({ chainId, abiMap, transaction, textDecoder, textEncoder, }: {
        transaction: RawTransaction;
        chainId: string;
        abiMap?: Map<string, any>;
        textDecoder?: TextDecoder;
        textEncoder?: TextEncoder;
    }): Promise<PushTransactionArgs>;
    deserialize({ chainId, abiMap, serializedTransaction, textDecoder, textEncoder, }: {
        serializedTransaction: Uint8Array;
        chainId: string;
        abiMap?: Map<string, any>;
        textDecoder?: TextDecoder;
        textEncoder?: TextEncoder;
    }): Promise<RawTransaction>;
    sign({ abiMap, chainId, privateKeys, transaction, serializedTransaction, serializedContextFreeData, }: {
        abiMap?: Map<string, any>;
        chainId: string;
        privateKeys: string[];
        transaction: RawTransaction;
        serializedTransaction: any;
        serializedContextFreeData: any;
    }): Promise<SignedTxArgs>;
    pushToServer(transaction: RawTransaction, endpoint: string, dryRun: boolean): Promise<any>;
    executeCall({ baseUrl, endPoint, body, fetchOptions, signal }: {
        baseUrl: string;
        endPoint: string;
        body?: string | null;
        fetchOptions?: any;
        signal: AbortSignal;
    }): Promise<any>;
    multicastServers({ endpoint, body, fetchOptions, requestTimeout }: {
        endpoint: string;
        body?: string | null;
        fetchOptions?: any;
        requestTimeout?: number;
    }): Promise<any>;
    getCipherContent(contentType: string, content: any, privateKey: string, publicKey: string): string;
    getUnCipherContent(contentType: string, content: any, privateKey: string, publicKey: string): any;
    validate(): void;
}
export {};
//# sourceMappingURL=Transactions.d.ts.map