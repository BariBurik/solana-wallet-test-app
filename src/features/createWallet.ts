import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import wallet from '@/store/wallet';

export default async function createWallet(seedPhrase: string) {

    const { setBalance, setPrivateKey, setWalletAddress, setSeedPhrase } = wallet;
    // Генерация новой ключевой пары
    setSeedPhrase(seedPhrase);
    const newPair = Keypair.fromSeed(new Uint8Array(Buffer.from(seedPhrase)));

    // Адрес публичного ключа
    const publicKey = newPair.publicKey.toString();
    setWalletAddress(publicKey);

    // Закрытый ключ (сериализованный в формате base58)
    const secretKey = Buffer.from(newPair.secretKey).toString('base64');
    setPrivateKey(secretKey);

    // Баланс (проверка баланса новосозданного кошелька)
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const balance = await connection.getBalance(newPair.publicKey);
    setBalance(balance / LAMPORTS_PER_SOL);

    return { publicKey, secretKey };
}