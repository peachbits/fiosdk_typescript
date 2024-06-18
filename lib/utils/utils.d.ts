import { AbortSignal } from 'abort-controller';
import { GetEncryptKeyResponse } from '../entities/GetEncryptKeyResponse';
export declare function asyncWaterfall({ asyncFuncs, requestTimeout, }: {
    asyncFuncs: Array<(signal: AbortSignal) => Promise<any>>;
    requestTimeout?: number;
}): Promise<any>;
export declare function getEncryptKeyForUnCipherContent({ getEncryptKey, method, fioAddress, }: {
    getEncryptKey: (fioAddress: string) => Promise<GetEncryptKeyResponse>;
    method?: string;
    fioAddress: string;
}): Promise<string | null>;
//# sourceMappingURL=utils.d.ts.map