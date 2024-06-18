import { SignedTransaction } from './SignedTransaction';
export declare type RegisterFioDomainAddressOptions = {
    fioAddress: string;
    maxFee: number;
    isPublic?: boolean;
    ownerPublicKey?: string | null;
    technologyProviderId?: string | null;
};
export declare class RegisterFioDomainAddress extends SignedTransaction {
    options: RegisterFioDomainAddressOptions;
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    constructor(options: RegisterFioDomainAddressOptions);
    getData(): any;
}
//# sourceMappingURL=RegisterFioDomainAddress.d.ts.map