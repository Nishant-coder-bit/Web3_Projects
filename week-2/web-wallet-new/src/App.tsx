import { useState } from 'react';
import './App.css';
import { generateMnemonic } from 'bip39';
import SolanaWallet from './SolanaWallet';

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header with Dark/Light Mode Toggle */}
      <div className="header">
        <button 
          className="toggle-mode" 
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Mnemonic Phrase Input Field */}
      <div className="mnemonic-container">
        <h2>Your Seed Phrase</h2>
        <div className="mnemonic-grid">
          {mnemonic
            .split(' ')
            .map((word, index) => (
              <div key={index} className="mnemonic-box">
                <span>{index + 1}.</span>
                <input type="text" value={word} readOnly />
              </div>
            ))}
        </div>
        <button
          className="generate-seed-button"
          onClick={() => {
            const newMnemonic = generateMnemonic();
            setMnemonic(newMnemonic);
          }}
        >
          Create Seed Phrase
        </button>
      </div>

      {/* Solana Wallet Component */}
      <SolanaWallet mnemonic={mnemonic} />
    </div>
  );
}

export default App;
