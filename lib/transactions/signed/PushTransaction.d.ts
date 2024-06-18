import { SignedTransaction } from './SignedTransaction';
export interface EncryptOptions {
    publicKey?: string;
    privateKey?: string;
    contentType?: string;
}
export declare class PushTransaction extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    data: any;
    encryptOptions: EncryptOptions;
    authPermission: string | undefined;
    signingAccount: string | undefined;
    constructor({ action, account, authPermission, data, encryptOptions, signingAccount, }: {
        action: string;
        account: string;
        authPermission: string | undefined;
        data: any;
        encryptOptions: EncryptOptions;
        signingAccount: string | undefined;
    });
    getData(): any;
}
//# sourceMappingURL=PushTransaction.d.ts.map