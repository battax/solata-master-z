import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import wallet from "../wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const toKeygen = Keypair.generate()
const to = toKeygen.publicKey;
const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async() => {
  try {

  const mint = new PublicKey("DTSvsCU4FwMeDY6bS4e3Zcjw51DRXwm9Wk2QvVwfmAnW")

  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey)

  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    to)

    const trx = await transfer(
      connection,
      keypair,
      fromTokenAccount.address,
      toTokenAccount.address,
      keypair,
      25e6,
    )

    console.log(trx)
    
  } catch (error) {
    console.log(error)
  }
})();