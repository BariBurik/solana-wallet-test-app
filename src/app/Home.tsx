'use client'
import Navbar from "@/components/Navbar/Navbar";
import styles from "./Home.module.scss";

export default function Home() {
    return (
        <div>
            <Navbar />
            <h1 className={styles.title}>Добро пожаловать! Здесь вы можете создать кошелёк Solana и выволнять транзакции</h1>
        </div>
    );
  }
  