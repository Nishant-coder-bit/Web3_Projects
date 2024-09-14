import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { useState } from "react";

export default function SolanaWallet({ mnemonic }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<any>([]);
  
  const seed = mnemonicToSeedSync(mnemonic); // Converts mnemonic to seed

  // Copy public key to clipboard
  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    alert('Copied to clipboard');
  };

  return (
    <div className="wallet-keys">
      <button 
        className="wallet-button"
        onClick={() => {
          // Derivation path for Solana
          const path = `m/44'/501'/${currentIndex}'/0'`; 
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          const publicKey = keypair.publicKey;

          // Increment index and add the new public key
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, publicKey]);
        }}>
        Add Sol Wallet
      </button>

      {/* Display the generated public keys */}
      {publicKeys.map((key: any, index: number) => (
        <div key={index} className="public-key-box">
          <span>{key.toBase58()}</span>
          <button 
            className="copy-button" 
            onClick={() => copyToClipboard(key.toBase58())}
          >
            Copy
          </button>
        </div>
      ))}
    </div>
  );
}
