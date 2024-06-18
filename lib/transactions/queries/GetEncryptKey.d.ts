import { GetEncryptKeyResponse } from '../../entities/GetEncryptKeyResponse';
import { Query } from './Query';
export declare class GetEncryptKey extends Query<GetEncryptKeyResponse> {
    ENDPOINT: string;
    fioAddress: string;
    constructor(fioAddress: string);
    getData(): {
        fio_address: string;
    };
}
//# sourceMappingURL=GetEncryptKey.d.ts.map