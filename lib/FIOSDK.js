"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fiojs_1 = require("fiojs");
const queries = require("./transactions/queries");
const SignedTransactions = require("./transactions/signed");
const MockRegisterFioName_1 = require("./transactions/signed/MockRegisterFioName");
const Transactions_1 = require("./transactions/Transactions");
const constants_1 = require("./utils/constants");
/**
 * @ignore
 */
const { Ecc } = require('fiojs');
class FIOSDK {
    /**
     * @param privateKey the fio private key of the client sending requests to FIO API.
     * @param publicKey the fio public key of the client sending requests to FIO API.
     * @param baseUrl the url to the FIO API.
     * @param fetchjson
     * @param registerMockUrl the url to the mock server
     */
    constructor(privateKey, publicKey, baseUrl, fetchjson, registerMockUrl = '') {
        this.transactions = new Transactions_1.Transactions();
        Transactions_1.Transactions.baseUrl = baseUrl;
        Transactions_1.Transactions.FioProvider = fiojs_1.Fio;
        Transactions_1.Transactions.fetchJson = fetchjson;
        this.registerMockUrl = registerMockUrl;
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        for (const accountName of constants_1.Constants.rawAbiAccountName) {
            this.getAbi(accountName)
                .then((response) => {
                Transactions_1.Transactions.abiMap.set(response.account_name, response);
            })
                .catch((error) => {
                throw error;
            });
        }
    }
    /**
     * @ignore
     */
    static createPrivateKey(entropy) {
        return __awaiter(this, void 0, void 0, function* () {
            const bip39 = require('bip39');
            const mnemonic = bip39.entropyToMnemonic(entropy);
            return yield FIOSDK.createPrivateKeyMnemonic(mnemonic);
        });
    }
    /**
     * Create a FIO private key.
     *
     * @param mnemonic mnemonic used to generate a random unique private key.
     * @example real flame win provide layer trigger soda erode upset rate beef wrist fame design merit
     *
     * @returns New FIO private key
     */
    static createPrivateKeyMnemonic(mnemonic) {
        return __awaiter(this, void 0, void 0, function* () {
            const hdkey = require('hdkey');
            const wif = require('wif');
            const bip39 = require('bip39');
            const seedBytes = yield bip39.mnemonicToSeed(mnemonic);
            const seed = yield seedBytes.toString('hex');
            const master = hdkey.fromMasterSeed(new Buffer(seed, 'hex'));
            const node = master.derive('m/44\'/235\'/0\'/0/0');
            const fioKey = wif.encode(128, node._privateKey, false);
            return { fioKey, mnemonic };
        });
    }
    /**
     * Create a FIO public key.
     *
     * @param fioPrivateKey FIO private key.
     *
     * @returns FIO public key derived from the FIO private key.
     */
    static derivedPublicKey(fioPrivateKey) {
        const publicKey = Ecc.privateToPublic(fioPrivateKey);
        return { publicKey };
    }
    /**
     * Retrieves the FIO public key assigned to the FIOSDK instance.
     */
    getFioPublicKey() {
        return this.publicKey;
    }
    /**
     * Registers a FIO Address on the FIO blockchain.  The owner will be the public key associated with the FIO SDK instance.
     *
     * @param fioAddress FIO Address to register.
     * @param maxFee Maximum amount of SUFs the user is willing to pay for fee. Should be preceded by @ [getFee] for correct value.
     * @param walletFioAddress FIO Address of the wallet which generates this transaction.
     */
    registerFioAddress(fioAddress, maxFee, walletFioAddress = '') {
        const registerFioAddress = new SignedTransactions.RegisterFioAddress(fioAddress, maxFee, walletFioAddress);
        return registerFioAddress.execute(this.privateKey, this.publicKey);
    }
    /**
     * Registers a FIO Domain on the FIO blockchain.
     *
     * @param fioDomain FIO Domain to register. The owner will be the public key associated with the FIO SDK instance.
     * @param maxFee Maximum amount of SUFs the user is willing to pay for fee. Should be preceded by @ [getFee] for correct value.
     * @param walletFioAddress FIO Address of the wallet which generates this transaction.
     */
    registerFioDomain(fioDomain, maxFee, walletFioAddress = '') {
        const registerFioDomain = new SignedTransactions.RegisterFioDomain(fioDomain, maxFee, walletFioAddress);
        return registerFioDomain.execute(this.privateKey, this.publicKey);
    }
    /**
     * Renew a FIO Address on the FIO blockchain.
     *
     * @param fioAddress FIO Address to renew.
     * @param maxFee Maximum amount of SUFs the user is willing to pay for fee. Should be preceded by @ [getFee] for correct value.
     * @param walletFioAddress FIO Address of the wallet which generates this transaction.
     */
    renewFioAddress(fioAddress, maxFee, walletFioAddress = '') {
        const renewFioAddress = new SignedTransactions.RenewFioAddress(fioAddress, maxFee, walletFioAddress);
        return renewFioAddress.execute(this.privateKey, this.publicKey);
    }
    /**
     * Renew a FIO Domain on the FIO blockchain.
     *
     * @param fioDomain FIO Domain to renew.
     * @param maxFee Maximum amount of SUFs the user is willing to pay for fee. Should be preceded by @ [getFee] for correct value.
     * @param walletFioAddress FIO Address of the wallet which generates this transaction.
     */
    renewFioDomain(fioDomain, maxFee, walletFioAddress = '') {
        const renewFioDomain = new SignedTransactions.RenewFioDomain(fioDomain, maxFee, walletFioAddress);
        return renewFioDomain.execute(this.privateKey, this.publicKey);
    }
    /**
     * This call allows a public address of the specific blockchain type to be added to the FIO Address.
     *
     * @param fioAddress FIO Address which will be mapped to public address.
     * @param tokenCode Token code to be used with that public address.
     * @param publicAddress The public address to be added to the FIO Address for the specified token.
     * @param maxFee Maximum amount of SUFs the user is willing to pay for fee. Should be preceded by /get_fee for correct value.
     * @param walletFioAddress FIO Address of the wallet which generates this transaction.
     */
    addPublicAddress(fioAddress, tokenCode, publicAddress, maxFee, walletFioAddress = '') {
        const addPublicAddress = new SignedTransactions.AddPublicAddress(fioAddress, tokenCode, publicAddress, maxFee, walletFioAddress);
        return addPublicAddress.execute(this.privateKey, this.publicKey);
    }
    /**
     * By default all FIO Domains are non-public, meaning only the owner can register FIO Addresses on that domain. Setting them to public allows anyone to register a FIO Address on that domain.
     *
     * @param fioDomain FIO Domain to change visibility.
     * @param isPublic 1 - allows anyone to register FIO Address, 0 - only owner of domain can register FIO Address.
     * @param maxFee Maximum amount of SUFs the user is willing to pay for fee. Should be preceded by /get_fee for correct value.
     * @param walletFioAddress FIO Address of the wallet which generates this transaction.
     */
    setFioDomainVisibility(fioDomain, isPublic, maxFee, walletFioAddress = '') {
        const SetFioDomainVisibility = new SignedTransactions.SetFioDomainVisibility(fioDomain, isPublic, maxFee, walletFioAddress);
        return SetFioDomainVisibility.execute(this.privateKey, this.publicKey);
    }
    /**
     *
     * Records information on the FIO blockchain about a transaction that occurred on other blockchain, i.e. 1 BTC was sent on Bitcoin Blockchain, and both
     * sender and receiver have FIO Addresses. OBT stands for Other Blockchain Transaction
     *
     * @param fioRequestId ID of funds request, if this Record Send transaction is in response to a previously received funds request.  Send empty if no FIO Request ID
     * @param payerFIOAddress FIO Address of the payer. This address initiated payment.
     * @param payeeFIOAddress FIO Address of the payee. This address is receiving payment.
     * @param payerTokenPublicAddress Public address on other blockchain of user sending funds.
     * @param payeeTokenPublicAddress Public address on other blockchain of user receiving funds.
     * @param amount Amount sent.
     * @param tokenCode Code of the token represented in Amount requested, i.e. BTC.
     * @param status Status of this OBT. Allowed statuses are: sent_to_blockchain.
     * @param obtId Other Blockchain Transaction ID (OBT ID), i.e Bitcoin transaction ID.
     * @param maxFee Maximum amount of SUFs the user is willing to pay for fee. Should be preceded by /get_fee for correct value.
     * @param walletFioAddress FIO Address of the wallet which generates this transaction.
     * @param payeeFioPublicKey Public address on other blockchain of user receiving funds.
     * @param memo
     * @param hash
     * @param offlineUrl
     */
    recordSend(fioRequestId, payerFIOAddress, payeeFIOAddress, payerTokenPublicAddress, payeeTokenPublicAddress, amount, tokenCode, status, obtId, maxFee, walletFioAddress = '', payeeFioPublicKey = null, memo = null, hash = null, offLineUrl = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let payeeKey = { public_address: '' };
            if (!payeeFioPublicKey && typeof payeeFioPublicKey !== 'string') {
                payeeKey = yield this.getPublicAddress(payeeFIOAddress, 'FIO');
            }
            else {
                payeeKey.public_address = payeeFioPublicKey;
            }
            const recordSend = new SignedTransactions.RecordSend(fioRequestId, payerFIOAddress, payeeFIOAddress, payerTokenPublicAddress, payeeTokenPublicAddress, amount, tokenCode, obtId, maxFee, status, walletFioAddress, payeeKey.public_address, memo, hash, offLineUrl);
            return recordSend.execute(this.privateKey, this.publicKey);
        });
    }
    /**
     * Reject funds request.
     *
     * @param fioRequestId Existing funds request Id
     * @param maxFee Maximum amount of SUFs the user is willing to pay for fee. Should be preceded by [getFee] for correct value.
     * @param walletFioAddress FIO Address of the wallet which generates this transaction.
     */
    rejectFundsRequest(fioRequestId, maxFee, walletFioAddress = '') {
        const rejectFundsRequest = new SignedTransactions.RejectFundsRequest(fioRequestId, maxFee, walletFioAddress);
        return rejectFundsRequest.execute(this.privateKey, this.publicKey);
    }
    /**
     * Create a new funds request on the FIO chain.
     *
     * @param payerFioAddress FIO Address of the payer. This address will receive the request and will initiate payment.
     * @param payeeFioAddress FIO Address of the payee. This address is sending the request and will receive payment.
     * @param payeePublicAddress Payee's public address where they want funds sent.
     * @param amount Amount requested.
     * @param tokenCode Code of the token represented in amount requested.
     * @param memo
     * @param maxFee Maximum amount of SUFs the user is willing to pay for fee. Should be preceded by [getFee] for correct value.
     * @param payerFioPublicKey Public address on other blockchain of user sending funds.
     * @param walletFioAddress FIO Address of the wallet which generates this transaction.
     * @param hash
     * @param offlineUrl
     */
    requestFunds(payerFioAddress, payeeFioAddress, payeePublicAddress, amount, tokenCode, memo, maxFee, payerFioPublicKey = null, walletFioAddress = '', hash, offlineUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let payerKey = { public_address: '' };
            if (!payerFioPublicKey && typeof payerFioPublicKey !== 'string') {
                payerKey = yield this.getPublicAddress(payerFioAddress, 'FIO');
            }
            else {
                payerKey.public_address = payerFioPublicKey;
            }
            const requestNewFunds = new SignedTransactions.RequestNewFunds(payerFioAddress, payerKey.public_address, payeeFioAddress, walletFioAddress, maxFee, payeePublicAddress, amount, tokenCode, memo, hash, offlineUrl);
            return requestNewFunds.execute(this.privateKey, this.publicKey);
        });
    }
    /**
     * Checks if a FIO Address or FIO Domain is available for registration.
     *
     * @param fioName FIO Address or FIO Domain to check.
     */
    isAvailable(fioName) {
        const availabilityCheck = new queries.AvailabilityCheck(fioName);
        return availabilityCheck.execute(this.publicKey);
    }
    /**
     * Retrieves balance of FIO tokens
     *
     * @param fioPublicKey FIO public key.
     */
    getFioBalance(fioPublicKey) {
        const getFioBalance = new queries.GetFioBalance(fioPublicKey);
        return getFioBalance.execute(this.publicKey);
    }
    /**
     * Returns FIO Addresses and FIO Domains owned by this public key.
     *
     * @param fioPublicKey FIO public key of owner.
     */
    getFioNames(fioPublicKey) {
        const getNames = new queries.GetNames(fioPublicKey);
        return getNames.execute(this.publicKey);
    }
    /**
     * Polls for any pending requests sent to public key associated with the FIO SDK instance.
     *
     * @param limit Number of request to return. If omitted, all requests will be returned.
     * @param offset First request from list to return. If omitted, 0 is assumed.
     */
    getPendingFioRequests(limit, offset) {
        const pendingFioRequests = new queries.PendingFioRequests(this.publicKey, limit, offset);
        return pendingFioRequests.execute(this.publicKey, this.privateKey);
    }
    /**
     * Polls for any sent requests sent by public key associated with the FIO SDK instance.
     *
     * @param limit Number of request to return. If omitted, all requests will be returned.
     * @param offset First request from list to return. If omitted, 0 is assumed.
     */
    getSentFioRequests(limit, offset) {
        const sentFioRequest = new queries.SentFioRequests(this.publicKey, limit, offset);
        return sentFioRequest.execute(this.publicKey, this.privateKey);
    }
    /**
     * Returns a token public address for specified token code and FIO Address.
     *
     * @param fioAddress FIO Address for which the token public address is to be returned.
     * @param tokenCode Token code for which public address is to be returned.
     */
    getPublicAddress(fioAddress, tokenCode) {
        const publicAddressLookUp = new queries.PublicAddressLookUp(fioAddress, tokenCode);
        return publicAddressLookUp.execute(this.publicKey);
    }
    /**
     * Returns the FIO token public address for specified FIO Address.
     *
     * @param fioAddress FIO Address for which fio token public address is to be returned.
     */
    getFioPublicAddress(fioAddress) {
        const publicAddressLookUp = new queries.PublicAddressLookUp(fioAddress, 'FIO');
        return publicAddressLookUp.execute(this.publicKey);
    }
    /**
     *
     * Transfers FIO tokens from public key associated with the FIO SDK instance to
     * the payeePublicKey.
     *
     * @param payeeFioPublicKey FIO public Address of the one receiving the tokens.
     * @param amount Amount sent in SUFs.
     * @param maxFee Maximum amount of SUFs the user is willing to pay for fee. Should be preceded by /get_fee for correct value.
     * @param walletFioAddress FIO Address of the wallet which generates this transaction.
     */
    transferTokens(payeeFioPublicKey, amount, maxFee, walletFioAddress = '') {
        const transferTokens = new SignedTransactions.TransferTokens(payeeFioPublicKey, amount, maxFee, walletFioAddress);
        return transferTokens.execute(this.privateKey, this.publicKey);
    }
    /**
     * Compute and return fee amount for specific call and specific user
     *
     * @param endPoint Name of API call end point, e.g. add_pub_address.
     * @param fioAddress
     *        if endPointName is RenewFioAddress, FIO Address incurring the fee and owned by signer.
     *        if endPointName is RenewFioDomain, FIO Domain incurring the fee and owned by signer.
     *        if endPointName is RecordSend, Payee FIO Address incurring the fee and owned by signer.
     */
    getFee(endPoint, fioAddress = '') {
        const fioFee = new queries.GetFee(endPoint, fioAddress);
        return fioFee.execute(this.publicKey);
    }
    /**
     * @ignore
     */
    registerFioNameOnBehalfOfUser(fioName, publicKey) {
        const server = this.registerMockUrl; // "mock.dapix.io/mockd/DEV2"
        const mockRegisterFioName = new MockRegisterFioName_1.MockRegisterFioName(fioName, publicKey, server);
        return mockRegisterFioName.execute();
    }
    /**
     * @ignore
     */
    getMultiplier() {
        return constants_1.Constants.multiplier;
    }
    /**
     * @ignore
     */
    genericAction(action, params) {
        switch (action) {
            case 'getFioPublicKey':
                return this.getFioPublicKey();
            case 'registerFioAddress':
                return this.registerFioAddress(params.fioAddress, params.maxFee, params.walletFioAddress || '');
            case 'registerFioDomain':
                return this.registerFioDomain(params.fioDomain, params.maxFee, params.walletFioAddress || '');
            case 'renewFioDomain':
                return this.renewFioDomain(params.fioDomain, params.maxFee, params.walletFioAddress || '');
            case 'renewFioAddress':
                return this.renewFioAddress(params.fioAddress, params.maxFee, params.walletFioAddress || '');
            case 'addPublicAddress':
                return this.addPublicAddress(params.fioAddress, params.tokenCode, params.publicAddress, params.maxFee, params.walletFioAddress);
            case 'setFioDomainVisibility':
                return this.setFioDomainVisibility(params.fioDomain, params.isPublic, params.maxFee, params.walletFioAddress);
            case 'recordSend':
                return this.recordSend(params.fioRequestId, params.payerFIOAddress, params.payeeFIOAddress, params.payerTokenPublicAddress, params.payeeTokenPublicAddress, params.amount, params.tokenCode, params.status, params.obtId, params.maxFee, params.walletFioAddress || '', params.payerFioPublicKey, params.memo, params.hash, params.offLineUrl);
            case 'rejectFundsRequest':
                return this.rejectFundsRequest(params.fioRequestId, params.maxFee, params.walletFioAddress || '');
            case 'requestFunds':
                return this.requestFunds(params.payerFioAddress, params.payeeFioAddress, params.payeePublicAddress, params.amount, params.tokenCode, params.memo, params.maxFee, params.payerFioPublicKey, params.walletFioAddress || '', params.hash, params.offlineUrl);
            case 'isAvailable':
                return this.isAvailable(params.fioName);
            case 'getFioBalance':
                if (params) {
                    return this.getFioBalance(params.fioPublicKey);
                }
                else {
                    return this.getFioBalance();
                }
            case 'getFioNames':
                return this.getFioNames(params.fioPublicKey);
            case 'getPendingFioRequests':
                return this.getPendingFioRequests(params.limit, params.offset);
            case 'getSentFioRequests':
                return this.getSentFioRequests(params.limit, params.offset);
            case 'getPublicAddress':
                return this.getPublicAddress(params.fioAddress, params.tokenCode);
            case 'transferTokens':
                return this.transferTokens(params.payeeFioPublicKey, params.amount, params.maxFee, params.walletFioAddress || '');
            case 'getAbi':
                return this.getAbi(params.accountName);
            case 'getFee':
                return this.getFee(params.endPoint, params.fioAddress);
            case 'getMultiplier':
                return this.getMultiplier();
        }
    }
    /**
     * @ignore
     */
    getAbi(accountName) {
        const abi = new queries.GetAbi(accountName);
        return abi.execute(this.publicKey);
    }
}
exports.FIOSDK = FIOSDK;