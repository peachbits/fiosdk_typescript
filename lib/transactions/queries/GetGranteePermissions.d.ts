import { PermissionsResponse } from '../../entities/PermissionsResponse';
import { Query } from './Query';
export declare class GetGranteePermissions extends Query<PermissionsResponse> {
    ENDPOINT: string;
    accountToUse: string;
    limit: number | null;
    offset: number | null;
    constructor(account: string, limit?: number, offset?: number);
    getData(): {
        grantee_account: string;
        limit: number | null;
        offset: number | null;
    };
}
//# sourceMappingURL=GetGranteePermissions.d.ts.map