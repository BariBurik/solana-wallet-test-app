'use client'
import Navbar from "@/components/Navbar/Navbar";
import styles from "../Solana.module.scss";
import createWallet from "@/features/createWallet";
import wallet from "@/store/wallet";
import {observer} from "mobx-react-lite";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import getWalletData from "@/features/initWallet";
import validSeedPhrase from "@/features/validator";
import requestAirdrop from "@/features/airdrop";
import LoadingPage from "@/app/Loading";

export default observer(function Wallet() {

    const {balance, privateKey, walletAddress} = wallet

    const [isHiddenInit, setIsHiddenInit] = useState<boolean>(true)
    const [isHiddenCreate, setIsHiddenCreate] = useState<boolean>(true)
    const [secretKeyValue, setSecretKeyValue] = useState<string>('');
    const [secretWordsValue, setSecretWordsValue] = useState<string>('');
    const [error, setError] = useState<string | true>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Функция для инициализации кошелька и сокрытия модального окна
    const initWallet = async (secretKeyValue: string) => {
        setIsHiddenInit(true)
        await getWalletData(secretKeyValue);
        setSecretKeyValue('');
    }


    // Функция для проверки валидности ключевых слов и создания кошелька, в случае если ключевые слова валидны
    const handleCreateModal = async (seedPhrase: string) => {
        if (validSeedPhrase(seedPhrase) !== true) {
            setError(validSeedPhrase(seedPhrase))
        } else {
            setError('')
            await createWallet(seedPhrase)
            setIsHiddenCreate(true)
            setSecretWordsValue('')
        }
    }

    const handleCreateAirdrop = () => {
        setIsLoading(true)
        requestAirdrop().then(() => setIsLoading(false))
    }

    if (!isLoading) {
        return (
            <div>
                <Navbar />
                <header>
                    <div className={styles.header}>
                        <button onClick={() => setIsHiddenCreate(false)} className={styles.btn}>Создать кошелёк</button>
                        <Modal isHidden={isHiddenCreate} setIsHidden={setIsHiddenCreate}>
                            <input value={secretWordsValue} onChange={(event) => setSecretWordsValue(event.target.value)} className={styles.input} type="text" placeholder='Введите ключевые слова' />
                            {error && <p className={styles.error}>{error}</p>}
                            <button onClick={() => handleCreateModal(secretWordsValue)} className={styles.btn_modal}>Подтвердить</button>
                        </Modal>
                        <button onClick={() => setIsHiddenInit(false)} className={styles.btn}>Инициализировать кошелёк</button>
                        <Modal isHidden={isHiddenInit} setIsHidden={setIsHiddenInit}>
                            <input value={secretKeyValue} onChange={(event) => setSecretKeyValue(event.target.value)} className={styles.input} type="text" placeholder='Введите private key' />
                            <button onClick={() => initWallet(secretKeyValue)} className={styles.btn_modal}>Подтвердить</button>
                        </Modal>
                        {balance !== null ? <h1 className={styles.text}>Баланс: {balance} SOL</h1> : null}
                    </div>
                </header>
                {privateKey && walletAddress && 
                <div>
                    <div className={styles.body}>
                        <h1 className={styles.text}>Адрес кошелька: </h1> <h2 className={styles.key}>{walletAddress}</h2>
                        <h1 className={styles.text}>Private key: </h1> <h2 className={styles.key}>{privateKey}</h2>
                        <button className={styles.btn} onClick={handleCreateAirdrop}>Получить 10 SOL</button>
                    </div>
                </div>}
            </div>
        );
    }

    return <LoadingPage />
})