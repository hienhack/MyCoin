import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import CreateWallet from "./pages/CreateWallet";
import AccessWallet from "./pages/AccessWallet";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="create-wallet" element={<CreateWallet />} />
          <Route path="access-wallet" element={<AccessWallet />} />
        </Route>
        <Route path="/wallet" element={<WalletPage />} />
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
