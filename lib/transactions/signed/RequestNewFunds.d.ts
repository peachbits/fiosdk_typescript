import { SignedTransaction } from './SignedTransaction';
export declare class RequestNewFunds extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    payerFioAddress: string;
    payerFioPublicKey: string;
    payeeFioAddress: string;
    chainCode: string;
    tokenCode: string;
    maxFee: number;
    content: any;
    technologyProviderId: string;
    encryptPrivateKey: string | null;
    constructor({ amount, chainCode, encryptPrivateKey, hash, maxFee, memo, offlineUrl, payeeFioAddress, payeeTokenPublicAddress, payerFioAddress, payerFioPublicKey, technologyProviderId, tokenCode, }: {
        amount: number;
        chainCode: string;
        encryptPrivateKey: string | null;
        hash?: string | null;
        maxFee: number;
        memo: string | null;
        offlineUrl: string | null;
        payeeFioAddress: string;
        payeeTokenPublicAddress: string;
        payerFioAddress: string;
        payerFioPublicKey: string;
        technologyProviderId: string;
        tokenCode: string;
    });
    getData(): any;
}
//# sourceMappingURL=RequestNewFunds.d.ts.map