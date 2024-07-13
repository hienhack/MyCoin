import React from "react";

const WalletContext = React.createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = React.useState(
    JSON.parse(localStorage.getItem("wallet")) || {
      wallet: {
        publicKey: "",
        privateKey: "",
        balance: 0,
      },
    }
  );

  function handleSetWallet(wallet) {
    setWallet(wallet);
    localStorage.setItem("wallet", JSON.stringify(wallet));
  }

  return (
    <WalletContext.Provider value={{ wallet, setWallet: handleSetWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
