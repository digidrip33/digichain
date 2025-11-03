import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [clicks, setClicks] = useState(0);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
    }
  };

  const handleClick = () => {
    setClicks(clicks + 1);
    console.log('Clicked! +1 DGC');
  };

  return (
    <div className="App">
      <h1>DIGIMINE: INFINITE VAULT</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected: {account.slice(0,6)}...{account.slice(-4)}</p>
      )}
      <p>Balance: {balance} DGC</p>
      <p>Clicks: {clicks}</p>
      <button onClick={handleClick}>CLICK TO MINE (+1 DGC)</button>
      <p>Mining: ON (CPU)</p>
    </div>
  );
}

export default App;
