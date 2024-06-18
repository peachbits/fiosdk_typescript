import { PendingFioRequestsResponse } from '../../entities/PendingFioRequestsResponse';
import { GetEncryptKeyResponse } from '../../entities/GetEncryptKeyResponse';
import { Query } from './Query';
export declare class PendingFioRequests extends Query<PendingFioRequestsResponse> {
    ENDPOINT: string;
    fioPublicKey: string;
    limit: number | null;
    offset: number | null;
    isEncrypted: boolean;
    encryptKeys: Map<string, {
        privateKey: string;
        publicKey: string;
    }[]> | undefined;
    getEncryptKey: (fioAddress: string) => Promise<GetEncryptKeyResponse>;
    constructor({ fioPublicKey, limit, offset, encryptKeys, getEncryptKey }: {
        fioPublicKey: string;
        limit?: number | null;
        offset?: number | null;
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
    decrypt(result: PendingFioRequestsResponse): Promise<PendingFioRequestsResponse | undefined>;
}
//# sourceMappingURL=PendingFioRequests.d.ts.map