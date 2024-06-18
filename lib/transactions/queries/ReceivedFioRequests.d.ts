import { ReceivedFioRequestsResponse } from '../../entities/ReceivedFioRequestsResponse';
import { GetEncryptKeyResponse } from '../../entities/GetEncryptKeyResponse';
import { Query } from './Query';
export declare class ReceivedFioRequests extends Query<ReceivedFioRequestsResponse> {
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
    constructor({ fioPublicKey, limit, offset, includeEncrypted, encryptKeys, getEncryptKey, }: {
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
    decrypt(result: ReceivedFioRequestsResponse): Promise<ReceivedFioRequestsResponse | undefined>;
}
//# sourceMappingURL=ReceivedFioRequests.d.ts.map