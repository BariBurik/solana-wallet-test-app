import {makeAutoObservable} from 'mobx'

class Wallet {
    _balance: number | null = null;
    _privateKey: string = '';
    _walletAddress: string = '';
    _seedPhrase: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setBalance = (newBalance: number) => {
        this._balance = newBalance;
    }

    setPrivateKey = (newPrivateKey: string) => {
        this._privateKey = newPrivateKey;
    }

    setWalletAddress = (newWalletAddress: string) => {
        this._walletAddress = newWalletAddress;
    }

    setSeedPhrase = (newSeedPhrase: string) => {
        this._seedPhrase = newSeedPhrase;
    }

    get balance() {
        return this._balance
    }        

    get privateKey() {
        return this._privateKey
    }

    get walletAddress() {
        return this._walletAddress
    }   

    get seedPhrase() {
        return this._seedPhrase
    }
}

export default new Wallet()