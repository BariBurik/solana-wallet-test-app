import wallet from '@/store/wallet';
import * as web3 from '@solana/web3.js';
import { Keypair } from '@solana/web3.js';

function getKeypairFromSecretKey(secretKeyBase64: string): Keypair {
    const secretKey = Buffer.from(secretKeyBase64, 'base64');
    return Keypair.fromSecretKey(secretKey);
}

export default async function requestAirdrop() {
    // Создание клиента Solana для Devnet
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
  
    const { privateKey, setBalance } = wallet;
    let keypair: Keypair;
  
    try {
      keypair = getKeypairFromSecretKey(privateKey);
    } catch (error) {
      console.error('Invalid secret key, generating new keypair');
      keypair = Keypair.generate();
    }
  
    try {
      // Запрос Airdrop
      const airdropSignature = await connection.requestAirdrop(
        keypair.publicKey,
        10 * web3.LAMPORTS_PER_SOL 
      );
  
      // Ожидание подтверждения Airdrop
      await connection.confirmTransaction(airdropSignature);
  
      const balance = await connection.getBalance(keypair.publicKey);
      console.log(`Airdrop successful. Balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);
      setBalance(balance / web3.LAMPORTS_PER_SOL);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('429')) {
              console.error('Error requesting airdrop: Too Many Requests. Please try again later.');
            } else {
              console.error('Error requesting airdrop:', error.message);
            }
          } else {
            console.error('Unknown error occurred:', error);
        }
    }
    return false
  }