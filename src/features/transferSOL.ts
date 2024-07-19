import wallet from '@/store/wallet';
import * as web3 from '@solana/web3.js';

export default async function transferSOL(toWallet: web3.PublicKey, howManySOL: number) {

  const {privateKey, setBalance} = wallet  

  // Создание клиента Solana
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

  // Создание ключевой пары 
  const fromWallet = web3.Keypair.fromSecretKey(new Uint8Array(Buffer.from(privateKey, 'base64')));

  //Получение blockhash
  const blockhash = await connection.getRecentBlockhash();

  // Создание транзакции
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: fromWallet.publicKey,
      toPubkey: toWallet,
      lamports: howManySOL * web3.LAMPORTS_PER_SOL
    })
  );
  
  transaction.recentBlockhash = blockhash.blockhash;

  // Подписывание транзакции отправителем
  transaction.sign(fromWallet);

  try {
    // Отправка транзакции на сеть
  const signature = await connection.sendRawTransaction(transaction.serialize());

  // Ожидание подтверждения транзакции
  await connection.confirmTransaction(signature, 'finalized');

  const fromBalance = await connection.getBalance(fromWallet.publicKey);
  
  setBalance(fromBalance / web3.LAMPORTS_PER_SOL);
  } catch (error) {
    alert('Недостаточно средств для перевода');
  }
  return false
}