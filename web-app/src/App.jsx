import { Routes, Route } from "react-router-dom";
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

function App() {
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
