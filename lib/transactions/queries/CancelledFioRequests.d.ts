import { CancelledFioRequestResponse } from '../../entities/CancelledFioRequestResponse';
import { GetEncryptKeyResponse } from '../../entities/GetEncryptKeyResponse';
import { Query } from './Query';
export declare class CancelledFioRequests extends Query<CancelledFioRequestResponse> {
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
    decrypt(result: CancelledFioRequestResponse): Promise<CancelledFioRequestResponse | undefined>;
}
//# sourceMappingURL=CancelledFioRequests.d.ts.map