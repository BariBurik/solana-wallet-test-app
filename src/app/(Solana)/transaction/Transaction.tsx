'use client'
import Navbar from "@/components/Navbar/Navbar";
import styles from "../Solana.module.scss";
import { useRouter } from "next/navigation";
import wallet from "@/store/wallet";
import { useState } from "react";
import transferSOL from "@/features/transferSOL";
import { PublicKey } from "@solana/web3.js";
import { observer } from "mobx-react-lite";
import LoadingPage from "@/app/Loading";

export default observer(function Transaction() {

    const {back} = useRouter()

    const {balance, privateKey, walletAddress} = wallet

    const [inputHowMany, setInputHowMany] = useState<string>('');
    const [inputTo, setInputTo] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const handleTransfer = async () => {
        setIsLoading(true)
        setIsLoading(await transferSOL(new PublicKey(inputTo), Number(inputHowMany)));
    }

    if (!isLoading) {
        return (
            <div>
                <Navbar />
                <header>
                    <div className={styles.header}>
                        <button className={styles.btn} onClick={back}>Назад</button>
                        {balance !== null && <h1 className={styles.title}>Ваш баланс: {balance} SOL</h1>}
                    </div>
                </header>
                {privateKey && walletAddress && 
                <div>
                    <div className={styles.body}>
                        <input value={inputHowMany} onChange={(e) => setInputHowMany(e.target.value)} className={styles.input} type="text" placeholder="Введите количество Sol"/>
                        <input value={inputTo} onChange={(e) => setInputTo(e.target.value)} className={styles.input} type="text" placeholder="Введите адрес кошелёка"/>
                        <button onClick={() => handleTransfer()} className={styles.btn}>Отправить</button>
                    </div>
                </div>}
            </div>
        );
    }

    return <LoadingPage />
  })