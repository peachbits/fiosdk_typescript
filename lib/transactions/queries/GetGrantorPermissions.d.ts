import { PermissionsResponse } from '../../entities/PermissionsResponse';
import { Query } from './Query';
export declare class GetGrantorPermissions extends Query<PermissionsResponse> {
    ENDPOINT: string;
    accountToUse: string;
    limit: number | null;
    offset: number | null;
    constructor(account: string, limit?: number, offset?: number);
    getData(): {
        grantor_account: string;
        limit: number | null;
        offset: number | null;
    };
}
//# sourceMappingURL=GetGrantorPermissions.d.ts.map