import { PermissionsResponse } from '../../entities/PermissionsResponse';
import { Query } from './Query';
export declare class GetObjectPermissions extends Query<PermissionsResponse> {
    ENDPOINT: string;
    permissionNameToUse: string;
    objectNameToUse: string;
    limit: number | null;
    offset: number | null;
    constructor(permissionName: string, objectName: string, limit?: number, offset?: number);
    getData(): {
        permission_name: string;
        object_name: string;
        limit: number | null;
        offset: number | null;
    };
}
//# sourceMappingURL=GetObjectPermissions.d.ts.map