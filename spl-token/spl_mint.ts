import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import wallet from '../wallet.json'

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async () =>{
  const mint = new PublicKey("DTSvsCU4FwMeDY6bS4e3Zcjw51DRXwm9Wk2QvVwfmAnW")
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey)

    await mintTo(
      connection,
      keypair, 
      mint,
      tokenAccount.address,
      keypair,
      25e6
    )

  console.log(`Minted 25 token to ${tokenAccount.address.toBase58()}`)
})()