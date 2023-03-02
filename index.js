// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmRawTransaction,
    sendAndConfirmTransaction
} = require("@solana/web3.js");


const DEMO_FROM_SECRET_KEY = new Uint8Array(
    [
        37, 211, 241, 182, 213, 160, 211, 111, 135,  33,  31,
        87, 244, 169, 205,  45,  30,  60,  43,  42, 103,  23,
         7, 222, 174,  55, 185, 199,   1,  10, 209,  37, 148,
       233,   6, 117, 219, 199, 128,  93,  60, 132, 175, 199,
       103,  84,  36, 136, 109, 151, 203,  63, 253,  81, 191,
       230, 127, 209, 143, 223, 139,  45, 165, 147
      ]            
);

const secondChallenge = async() => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Get Keypair from Secret Key
    var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

    // Generate another Keypair (account we'll be sending to)
    const to = Keypair.generate();
    
    let walletFromBalance = await connection.getBalance(
        from.publicKey
    );
    let walletToBalance = await connection.getBalance(
        to.publicKey
    );
    console.log(`Now FROM address is ${from.publicKey} balance is ${parseInt(walletFromBalance) / LAMPORTS_PER_SOL} SOL`)
    console.log(`Now TO address is ${to.publicKey} balance is ${parseInt(walletToBalance) / LAMPORTS_PER_SOL} SOL`)

    // Send money from "from" wallet and into "to" wallet
    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: walletFromBalance / 2
        })
    );

    // Sign transaction
    var signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );
    console.log('Signature is', signature);
    
    walletFromBalance = await connection.getBalance(
        from.publicKey
    );
    walletToBalance = await connection.getBalance(
        to.publicKey
    );
    console.log(`Now FROM address is ${from.publicKey} balance is ${parseInt(walletFromBalance) / LAMPORTS_PER_SOL} SOL`)
    console.log(`Now TO address is ${to.publicKey} balance is ${parseInt(walletToBalance) / LAMPORTS_PER_SOL} SOL`)
}

secondChallenge();