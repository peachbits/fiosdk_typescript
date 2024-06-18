import { Transactions } from '../Transactions';
export declare abstract class SignedTransaction extends Transactions {
    static prepareResponse(result: {
        transaction_id: string;
        processed: {
            block_num: number;
            action_traces: Array<{
                receipt: {
                    response: string;
                };
            }>;
        };
    } | any, includeTrxId?: boolean): any;
    static parseProcessedResult(processed: {
        action_traces: Array<{
            receipt: {
                response: string;
            };
        }>;
    }): any;
    abstract ENDPOINT: string;
    abstract ACTION: string;
    abstract ACCOUNT: string;
    abstract getData(): any;
    static authPermission: string | undefined;
    static signingAccount: string | undefined;
    static expirationOffset: number;
    execute(privateKey: string, publicKey: string, dryRun?: boolean, expirationOffset?: number): Promise<any>;
    prepareResponse(result: {
        processed: {
            action_traces: Array<{
                receipt: {
                    response: string;
                };
            }>;
        };
    } | any): any;
    getAction(): string;
    getAccount(): string;
    getAuthPermission(): string | undefined;
    getSigningAccount(): string | undefined;
    getEndPoint(): string;
}
//# sourceMappingURL=SignedTransaction.d.ts.map