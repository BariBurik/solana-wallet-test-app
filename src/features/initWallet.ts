import wallet from '@/store/wallet';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js';


// Функция для полученияя публичного ключа из закрытого ключа

function getKeypairFromSecretKey(secretKeyBase64: string): Keypair {
    const secretKey = Buffer.from(secretKeyBase64, 'base64');
    return Keypair.fromSecretKey(secretKey);
}

export default async function getWalletData(secretKeyBase64: string) {

    // Публичный ключ
    const { setBalance, setWalletAddress, setPrivateKey } = wallet

    try {
        const keypair = getKeypairFromSecretKey(secretKeyBase64);
        const publicKey = keypair.publicKey;

        setWalletAddress(publicKey.toString());
        setPrivateKey(secretKeyBase64);

        // Подключение к devnet
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

        // Получение баланса
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
        alert('Неподходящий ключ или неправильный ключ. Попробуйте ещё раз.');
    }

    
}
