import { GetObtDataResponse } from '../../entities/GetObtDataResponse';
import { GetEncryptKeyResponse } from '../../entities/GetEncryptKeyResponse';
import { Query } from './Query';
export declare class GetObtData extends Query<GetObtDataResponse> {
    ENDPOINT: string;
    fio_public_key: string;
    limit: number | undefined;
    offset: number | undefined;
    tokenCode: string;
    includeEncrypted: boolean;
    encryptKeys: Map<string, {
        privateKey: string;
        publicKey: string;
    }[]> | undefined;
    isEncrypted: boolean;
    getEncryptKey: (fioAddress: string) => Promise<GetEncryptKeyResponse>;
    constructor({ fioPublicKey, limit, offset, tokenCode, includeEncrypted, encryptKeys, getEncryptKey }: {
        fioPublicKey: string;
        limit?: number;
        offset?: number;
        tokenCode?: string;
        includeEncrypted: boolean;
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
    decrypt(result: GetObtDataResponse): Promise<GetObtDataResponse>;
}
//# sourceMappingURL=GetObtData.d.ts.map