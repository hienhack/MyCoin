import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import CreateWallet from "./pages/CreateWallet";
import AccessWallet from "./pages/AccessWallet";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "./layouts/DefaultLayout";
import MakeTransactionPage from "./pages/MakeTransactionPage";
import TransactionHistory from "./pages/TransactionHistory";
import { useContext } from "react";
import WalletContext from "./context/WalletContext";
import socket from "./socket";

const PRIVATE_ROUTES = ["/wallet", "/make-transaction", "/transaction-history"];

function App() {
  const { wallet, setWallet } = useContext(WalletContext);
  const { pathname } = useLocation();

  if (PRIVATE_ROUTES.includes(pathname) && !wallet.privateKey) {
    return <Navigate to="/" />;
  }

  socket.on("newBlock", (block) => {
    let change = 0;
    console.log(block);
    for (let tx of block.data) {
      console.log(tx);
      if (tx.to === wallet.publicKey) {
        change += tx.amount;
      }

      if (tx.from === wallet.publicKey) {
        change -= tx.amount;
      }
    }

    setWallet({
      ...wallet,
      balance: wallet.balance + change,
    });
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="create-wallet" element={<CreateWallet />} />
          <Route path="access-wallet" element={<AccessWallet />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/make-transaction" element={<MakeTransactionPage />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3500}
        hideProgressBar
        theme="colored"
        position="bottom-left"
        style={{ zIndex: 999999999 }}
      />
    </>
  );
}

export default App;
