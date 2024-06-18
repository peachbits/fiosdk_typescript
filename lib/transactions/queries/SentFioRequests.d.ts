import { SentFioRequestResponse } from '../../entities/SentFioRequestsResponse';
import { GetEncryptKeyResponse } from '../../entities/GetEncryptKeyResponse';
import { Query } from './Query';
export declare class SentFioRequests extends Query<SentFioRequestResponse> {
    ENDPOINT: string;
    fioPublicKey: string;
    limit: number | null;
    offset: number | null;
    includeEncrypted: boolean;
    isEncrypted: boolean;
    encryptKeys: Map<string, {
        privateKey: string;
        publicKey: string;
    }[]> | undefined;
    getEncryptKey: (fioAddress: string) => Promise<GetEncryptKeyResponse>;
    constructor({ fioPublicKey, limit, offset, includeEncrypted, encryptKeys, getEncryptKey }: {
        fioPublicKey: string;
        limit?: number | null;
        offset?: number | null;
        includeEncrypted?: boolean;
        encryptKeys?: Map<string, {
            privateKey: string;
            publicKey: string;
        }[]>;
        getEncryptKey: (fioAddress: string) => Promise<GetEncryptKeyResponse>;
    });
    getData(): {
        fio_public_key: string;
        limit: number | null;
        offset: number | null;
    };
    decrypt(result: SentFioRequestResponse): Promise<SentFioRequestResponse | undefined>;
}
//# sourceMappingURL=SentFioRequests.d.ts.map