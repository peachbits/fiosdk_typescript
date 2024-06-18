import { GetAccountPubKeyResponse } from '../../entities/GetAccountPubKeyResponse';
import { Query } from './Query';
export declare class GetAccountPubKey extends Query<GetAccountPubKeyResponse> {
    ENDPOINT: string;
    account: string;
    constructor(account: string);
    getData(): {
        account: string;
    };
}
//# sourceMappingURL=GetAccountPubKey.d.ts.map