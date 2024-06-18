import { SignedTransaction } from './SignedTransaction';
export declare type RecordObtDataOptions = {
    amount: number;
    chainCode: string;
    encryptPrivateKey: string | null;
    fioRequestId: number | null;
    hash: string | null;
    maxFee: number;
    memo: string | null;
    obtId: string;
    offLineUrl: string | null;
    payeeFioAddress: string;
    payeeFioPublicKey: string;
    payeeTokenPublicAddress: string;
    payerFioAddress: string;
    payerTokenPublicAddress: string;
    status: string;
    technologyProviderId: string | null;
    tokenCode: string;
};
export declare class RecordObtData extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    payerFioAddress: string;
    payeeFioPublicKey: string;
    payeeFioAddress: string;
    fioRequestId: number | null;
    maxFee: number;
    technologyProviderId: string;
    payerPublicAddress: string;
    payeePublicAddress: string;
    encryptPrivateKey: string | null;
    defaultStatus: string;
    content: any;
    constructor({ amount, chainCode, encryptPrivateKey, fioRequestId, hash, maxFee, memo, obtId, offLineUrl, payeeFioAddress, payeeFioPublicKey, payeePublicAddress, payerFioAddress, payerPublicAddress, status, technologyProviderId, tokenCode, }: {
        amount: number;
        chainCode: string;
        encryptPrivateKey: string | null;
        fioRequestId: number | null;
        hash: string | null;
        maxFee: number;
        memo: string | null;
        obtId: string;
        offLineUrl: string | null;
        payeeFioAddress: string;
        payeeFioPublicKey: string;
        payeePublicAddress: string;
        payerFioAddress: string;
        payerPublicAddress: string;
        status: string;
        technologyProviderId: string;
        tokenCode: string;
    });
    getData(): any;
}
//# sourceMappingURL=RecordObtData.d.ts.map