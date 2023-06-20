import { PendingFioRequestsResponse } from '../../entities/PendingFioRequestsResponse'
import { GetEncryptKeyResponse } from '../../entities/GetEncryptKeyResponse'
import { FioRequestsItem } from '../../entities/FioRequestsItem'
import { getEncryptKeyForUnCipherContent } from '../../utils/utils'

import { Query } from './Query'

export class PendingFioRequests extends Query<PendingFioRequestsResponse> {
  public ENDPOINT: string = 'chain/get_pending_fio_requests'
  public fioPublicKey: string
  public limit: number | null
  public offset: number | null
  public isEncrypted = true
  public encryptKeys: Map<string, { privateKey: string, publicKey: string }[]> | undefined

  public getEncryptKey: (fioAddress: string) => Promise<GetEncryptKeyResponse>

  constructor({
    fioPublicKey,
    limit = null,
    offset = null,
    encryptKeys,
    getEncryptKey
  }: {
    fioPublicKey: string,
    limit?: number | null,
    offset?: number | null,
    encryptKeys?: Map<string, { privateKey: string, publicKey: string }[]>,
    getEncryptKey: (fioAddress: string) => Promise<GetEncryptKeyResponse>
  }) {
    super()
    this.fioPublicKey = fioPublicKey
    this.limit = limit
    this.offset = offset
    this.encryptKeys = encryptKeys
    this.getEncryptKey = getEncryptKey
  }

  public getData() {
    const data = { fio_public_key: this.fioPublicKey, limit: this.limit || null, offset: this.offset || null }

    return data
  }

  public async decrypt(result: PendingFioRequestsResponse): Promise<PendingFioRequestsResponse | undefined> {
    return new Promise(async (resolve, reject) => {
      if (result.requests.length > 0) {
        try {
          const requests = await Promise.allSettled(result.requests.map(async (value: FioRequestsItem) => {
            let encryptKeysArray: { publicKey: string, privateKey?: string }[] = [];

            const { payee_fio_address, payee_fio_public_key } = value || {};

            try {
              const uncipherEncryptKey = await getEncryptKeyForUnCipherContent({
                getEncryptKey: this.getEncryptKey,
                method: 'PendingFioRequests',
                fioAddress: payee_fio_address,
              });

              if (uncipherEncryptKey) {
                encryptKeysArray.push({ publicKey: uncipherEncryptKey })
              }
            } catch (error) {
              console.error(error);
            }

            const account = this.getActor();

            if (this.encryptKeys) {
              const accountEncryptKeys = this.encryptKeys.get(account);
              if (accountEncryptKeys && accountEncryptKeys.length > 0) {
                encryptKeysArray = encryptKeysArray.concat(accountEncryptKeys);
              }
            }

            if (payee_fio_public_key) {
              encryptKeysArray.push({ publicKey: payee_fio_public_key });
            }

            encryptKeysArray.push({ publicKey: this.publicKey });

            let content = null;

            try {
              for (let i = 0; i < encryptKeysArray.length; i++) {
                const { publicKey, privateKey } = encryptKeysArray[i];

                let result = null;

                try {
                  result = this.getUnCipherContent(
                    'new_funds_content',
                    value.content,
                    privateKey || this.privateKey,
                    publicKey
                  );
                } catch (error) { }

                // Check if the result is successful
                if (result !== null) {
                  content = result;
                  break; // Exit the loop if a successful result is obtained
                }
              }

              if (content === null) {
                throw new Error(`PendingFioRequests: Get UnCipher Content for account ${account} failed.`); // Throw an error if all keys failed
              } else {
                value.content = content;
              }
            } catch (error) {
              console.error(error);
              throw error;
            }

            return value;
          }));

          const fulfilledRequests: FioRequestsItem[] = [];

          requests
            .forEach(result => result.status === 'fulfilled' && fulfilledRequests.push(result.value))

          resolve({ requests: fulfilledRequests, more: result.more });
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(undefined);
      }
    });
  }
}
